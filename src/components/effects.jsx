/* effects.jsx — generative-UI primitives (v2) */
import React, { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";

export function useInView(opts) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.16, rootMargin: "0px 0px -7% 0px", ...(opts || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

export function Reveal({ children, delay = 0, className = "", as = "div", style }) {
  const [ref, inView] = useInView();
  const Tag = as;
  const dcls = delay ? " d" + Math.min(5, Math.round(delay)) : "";
  return (
    <Tag ref={ref} className={"reveal" + dcls + (inView ? " in" : "") + (className ? " " + className : "")} style={style}>
      {children}
    </Tag>
  );
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>$*+=:";
export function DecodeText({ text, className = "", as = "span", play = true, speed = 34 }) {
  const [out, setOut] = useState(play ? "" : text);
  const [ref, inView] = useInView({ threshold: 0.5 });
  const Tag = as;
  useEffect(() => {
    if (!play || !inView) return;
    let frame = 0; const total = text.length;
    const id = setInterval(() => {
      frame++; const revealed = Math.floor(frame / 2); let s = "";
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") { s += ch; continue; }
        s += i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (revealed >= total) { clearInterval(id); setOut(text); }
    }, speed);
    return () => clearInterval(id);
  }, [inView, play, text]);
  return <Tag ref={ref} className={className}>{out || (play ? " " : text)}</Tag>;
}

export function useTypewriter(str, { speed = 38, start = true, startDelay = 0 } = {}) {
  const [shown, setShown] = useState(""); const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start) return;
    let i = 0, id, to;
    to = setTimeout(() => {
      id = setInterval(() => { i++; setShown(str.slice(0, i)); if (i >= str.length) { clearInterval(id); setDone(true); } }, speed);
    }, startDelay);
    return () => { clearTimeout(to); clearInterval(id); };
  }, [str, start]);
  return [shown, done];
}

export function Counter({ value, dur = 1500, prefix = "", suffix = "", className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step); else setN(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className={className}>{prefix}{Math.round(n).toLocaleString("en-US")}{suffix}</span>;
}

/* Module heading — eyebrow + ghost numeral + decoding title */
export function Mod({ no, tag, title, thai, tagTh, titleTh }) {
  const { lang } = useLang();
  const displayTag = lang === "th" && tagTh ? tagTh : tag;
  const displayTitle = lang === "th" && titleTh ? titleTh : title;
  return (
    <div className="mod">
      {no ? <span className="mod-ghost" aria-hidden="true">{no}</span> : null}
      <div className="mod-inner">
        <Reveal><span className="mod-tag">{displayTag}</span></Reveal>
        <Reveal delay={1}><DecodeText key={lang + displayTitle} as="h2" className="mod-title" text={displayTitle} /></Reveal>
        {lang === "en" && thai ? <Reveal delay={2}><p className="mod-th thai">{thai}</p></Reveal> : null}
      </div>
    </div>
  );
}
