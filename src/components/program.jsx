/* program.jsx — Format/Tracks, Journey timeline, Idea Generator (v2) */
import React from "react";
import { Mod, Reveal, DecodeText, useInView } from "./effects.jsx";

export function Format() {
  const methods = ["Vibe Coding", "AI-assisted tools", "Rapid prototyping"];
  const tracks = [
    { k: "Dev Track", role: "builds the product", glyph: "</>", items: ["Vibe coding with AI", "AI-assisted tooling", "Rapid prototyping"] },
    { k: "Business Track", role: "makes it real", glyph: "$_", items: ["Product design", "Market validation", "User & market research"] },
  ];
  return (
    <section className="section" id="program" data-screen-label="Program Format">
      <div className="wrap">
        <Mod no="03" tag="Program Format" title="Two tracks. One team." thai="สองสายงาน รวมเป็นทีมเดียว" />
        <Reveal delay={1}>
          <div className="method">
            <span className="lab">methodology ❯</span>
            {methods.map(m => <span key={m} className="chip">{m}</span>)}
          </div>
        </Reveal>
        <div className="tracks">
          {tracks.map((t, i) => (
            <Reveal key={t.k} delay={i + 1}>
              <div className="track card card-h">
                <div className="track-glyph">{t.glyph}</div>
                <h3>{t.k}</h3>
                <span className="role">{t.role}</span>
                <ul>{t.items.map(it => <li key={it}>{it}</li>)}</ul>
              </div>
            </Reveal>
          ))}
          <span className="merge">＝ 1 TEAM</span>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const steps = ["Team Formation", "Workshop Series", "Build Phase", "Final Pitch"];
  const tl = [
    { m: "MAY", t: "Applications & Team Matching", th: "เปิดรับสมัครและจับคู่ทีม" },
    { m: "JUN", t: "Workshop Series", th: "เวิร์กช็อปเข้มข้น" },
    { m: "JUL", t: "Build Phase → Pitch", th: "ลงมือสร้างและพรีเซนต์" },
    { m: "OCT", t: "Thailand AI Expo Stage", th: "ขึ้นเวที Thailand AI Expo", star: true },
  ];
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section className="section" data-screen-label="Journey & Timeline">
      <div className="wrap">
        <Mod no="04" tag="Program Journey" title="From zero to a real stage" />
        <Reveal delay={1}>
          <div className="flow">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <span className="step"><span className="n">{String(i + 1).padStart(2, "0")}</span>{s}</span>
                {i < steps.length - 1 && <span className="arr">→</span>}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
        <div className={"timeline" + (inView ? " in" : "")} ref={ref}>
          <div className="tl-line" />
          {tl.map((p, i) => (
            <div className={"tl-node" + (p.star ? " star" : "")} key={p.m} style={{ transitionDelay: (i * 0.12) + "s" }}>
              <span className="tl-dot" />
              <div className="tl-m">{p.m}</div>
              <div className="tl-t">{p.t}{p.star && <span style={{ color: "var(--gold)" }}> ★</span>}</div>
              <div className="tl-th thai">{p.th}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FALLBACK_IDEAS = [
  { name: "SoiEats", pitch: "AI that turns a street-food vendor’s phone photos into a delivery menu in 60 seconds.", stack: "Vision + LLM menu writer", by: "Dev × Business" },
  { name: "KlongClear", pitch: "Citizens snap a flooded canal; AI routes the report to the right district office automatically.", stack: "Image triage + gov API", by: "Dev × Business" },
  { name: "TutorBaht", pitch: "Generates personalized exam drills for Thai students from any textbook photo.", stack: "OCR + adaptive quizzing", by: "Dev × Business" },
  { name: "FarmForecast", pitch: "Voice-first crop advice for farmers in Isan dialect, powered by local weather data.", stack: "Speech + agronomy LLM", by: "Dev × Business" },
  { name: "PitchPilot", pitch: "Records a founder’s rough idea and returns an investor-ready deck outline.", stack: "Transcribe + deck gen", by: "Dev × Business" },
];

export function IdeaGenerator() {
  const [idea, setIdea] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);
  async function generate() {
    setLoading(true); setIdea(null); let result = null;
    try {
      const prompt = `You are seeding ideas for a Thai university AI hackathon where mixed dev+business teams ship real AI products for the Thai market. Invent ONE fresh, specific, locally-relevant product idea. Reply ONLY with compact JSON: {"name":"short product name","pitch":"one vivid sentence, max 22 words","stack":"3-5 word tech approach","by":"Dev × Business"}`;
      const raw = await window.claude.complete({ messages: [{ role: "user", content: prompt }] });
      const m = raw.match(/\{[\s\S]*\}/); if (m) result = JSON.parse(m[0]);
    } catch (e) { result = null; }
    if (!result || !result.name) result = FALLBACK_IDEAS[count % FALLBACK_IDEAS.length];
    setCount(c => c + 1); setIdea(result); setLoading(false);
  }
  return (
    <section className="section" data-screen-label="Idea Generator">
      <div className="wrap">
        <Mod no="05" tag="Proof of concept" title="What will teams actually build?" thai="ลองกดให้ AI สร้างไอเดียโปรดักต์ขึ้นมาสด ๆ — เหมือนที่ผู้เข้าแข่งทำ" />
        <Reveal delay={1}>
          <div className="gen card">
            <div className="gen-bar">
              <span className="con-dot" /><span className="con-dot" /><span className="con-dot" />
              <span style={{ marginLeft: 6 }}>idea-engine.ai</span>
              <span className={"gen-led" + (loading ? " busy" : idea ? " ok" : "")}>{loading ? "◐ generating" : idea ? "✓ generated" : "● idle"}</span>
            </div>
            <div className={"gen-body" + (loading ? " scan gen" : "")}>
              {!idea && !loading && <div className="gen-empty"><span className="hl">{">"}</span> press generate to watch the premise in action</div>}
              {loading && <div className="gen-empty loading"><span className="hl">{">"}</span> synthesizing a Thai-market AI product<span className="ell" /></div>}
              {idea && (
                <div className="gen-out">
                  <div className="gen-name"><DecodeText text={idea.name} speed={26} /><span className="gen-by">{idea.by || "Dev × Business"}</span></div>
                  <p className="gen-pitch">{idea.pitch}</p>
                  <div className="gen-stack"><span className="mute">stack ❯</span> {idea.stack}</div>
                </div>
              )}
            </div>
            <div className="gen-foot">
              <button className="btn btn-primary" onClick={generate} disabled={loading}>{idea ? "Generate another" : "Generate an idea"} <span className="dot" /></button>
              <span className="gen-note">live · powered by AI, same as the teams</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
