/* hero.jsx — cinematic "prompted into existence" intro (v2) */
import React from "react";
import { useTypewriter } from "./effects.jsx";

const BRIEF = "design Thailand’s first hackathon where anyone — dev or business — ships a real AI product, then pitches it on a real stage.";

function Letters({ word }) {
  return (
    <span>
      {word.split("").map((ch, i) => (
        <span key={i} className="hero-letter" style={{ animationDelay: (0.25 + i * 0.05) + "s" }}>{ch}</span>
      ))}
    </span>
  );
}

export function Hero() {
  const [phase, setPhase] = React.useState(0); // 0 typing · 1 generating · 2 done
  const [typed, typedDone] = useTypewriter(BRIEF, { speed: 15, start: true, startDelay: 350 });

  React.useEffect(() => {
    if (typedDone && phase === 0) { const t = setTimeout(() => setPhase(1), 420); return () => clearTimeout(t); }
  }, [typedDone, phase]);
  React.useEffect(() => {
    if (phase === 1) { const t = setTimeout(() => setPhase(2), 850); return () => clearTimeout(t); }
  }, [phase]);

  // Safety net: the assembled hero must NEVER stay blank or stall.
  React.useEffect(() => {
    const force = () => setPhase(p => (p < 2 ? 2 : p));
    const t = setTimeout(force, 3200);
    const onVis = () => { if (document.hidden) force(); };
    document.addEventListener("visibilitychange", onVis);
    if (document.hidden) force();
    return () => { clearTimeout(t); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  const assembled = phase >= 2;

  return (
    <header className="hero" data-screen-label="Hero">
      <div className="wrap">
        <div className={"console" + (assembled ? " done" : "")}>
          <div className="con-bar">
            <span className="con-dot" /><span className="con-dot" /><span className="con-dot" />
            <span className="con-title">tubc://generate — ai-hackathon</span>
            <span className={"con-status" + (phase >= 1 ? " ok" : "")}>
              {phase === 0 ? "● input" : phase === 1 ? "◐ generating" : "✓ ready"}
            </span>
          </div>
          <div className="con-body">
            <span className="con-caret">brief&nbsp;❯</span>
            <span>{typed}{!typedDone && <span className="cursor">█</span>}</span>
          </div>
          {phase === 1 && <div className="con-gen">generating interface<span className="ell" /></div>}
        </div>

        <div className={"hero-body" + (assembled ? " in" : "")}>
          <div className="hero-kicker">
            <span>TUBC</span><span className="sep">//</span><span>AI HACKATHON</span>
            <span className="sep">//</span><span className="on">2026</span>
          </div>

          <h1 className={"hero-title" + (assembled ? " in" : "")}>
            <span className="l1"><Letters word="AI" /></span>
            <span className="l2"><Letters word="HACKATHON" /></span>
          </h1>

          <div className="hero-lead">
            <p className="hero-th thai">
              แฮกกาธอนที่ <b>ทุกคน</b> ไม่ว่าจะสาย dev หรือ business สร้างผลิตภัณฑ์ AI ได้จริง แล้วขึ้น pitch บนเวทีจริง
              <span className="en">Anyone can build a real AI product — and pitch it on a real stage.</span>
            </p>
            <div className="hero-cta">
              <div className="row">
                <a href="#sponsor" className="btn btn-primary">Become a Sponsor <span className="dot" /></a>
                <a href="#program" className="btn">The program</a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="n">฿65K</div><div className="k">prize pool</div></div>
                <div className="hero-stat"><div className="n">2-in-1</div><div className="k">dev × business</div></div>
                <div className="hero-stat"><div className="n">Oct</div><div className="k">AI Expo stage</div></div>
              </div>
            </div>
          </div>

          <div className="hero-scroll"><span className="ln" /> scroll to generate</div>
        </div>
      </div>
    </header>
  );
}
