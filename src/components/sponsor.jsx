/* sponsor.jsx — interactive sponsor packages (v2, the sell) */
import React from "react";
import { Mod, Reveal, Counter } from "./effects.jsx";

const TIERS = {
  gold: { key: "gold", name: "Gold", price: 50000, var: "var(--gold)", spots: "2 spots",
    blurb: "Headline partner. Your brand leads the program and owns a named bounty track.",
    metrics: { builders: 500, impressions: 80000, expo: 10000, cvs: 500 } },
  silver: { key: "silver", name: "Silver", price: 25000, var: "var(--silver)", spots: "4 spots",
    blurb: "Growth partner. Strong visibility across workshops plus direct talent access.",
    metrics: { builders: 500, impressions: 35000, expo: 4000, cvs: 250 } },
  bronze: { key: "bronze", name: "Bronze", price: 10000, var: "var(--bronze)", spots: "open",
    blurb: "Community partner. Get your logo in front of every builder in the room.",
    metrics: { builders: 500, impressions: 12000, expo: 1000, cvs: 0 } },
};
const BENEFITS = [
  ["Logo on all event materials", { gold: 1, silver: 1, bronze: 1 }],
  ["Co-branded participant certificate", { gold: 1, silver: 1, bronze: 1 }],
  ["Prize-pool contribution credit", { gold: 1, silver: 1, bronze: 1 }],
  ["Media coverage", { gold: 1, silver: 1, bronze: 0 }],
  ["Workshop branding", { gold: 1, silver: 1, bronze: 0 }],
  ["Participant CV & talent access", { gold: 1, silver: 1, bronze: 0 }],
  ["Post-event insights report", { gold: 1, silver: 1, bronze: 0 }],
  ["Named sponsor bounty track", { gold: 1, silver: 0, bronze: 0 }],
  ["Judging panel seat", { gold: 1, silver: 0, bronze: 0 }],
  ["On-stage recognition at AI Expo", { gold: 1, silver: 0, bronze: 0 }],
];
const BRIEF_FALLBACK = {
  gold: "Put your brand at the center of Thailand’s next AI builders — own a bounty track, judge the finals, and headline the Expo stage.",
  silver: "Stay visible through every workshop and walk away with direct access to 500 cross-functional AI builders.",
  bronze: "Get your logo in front of every team in the room and back Thailand’s emerging AI talent.",
};

function IStat({ k, value, suffix, c }) {
  return <div className="istat"><span className="v" style={{ color: c }}><Counter value={value} suffix={suffix} /></span><span className="k">{k}</span></div>;
}

export function Sponsors() {
  const [sel, setSel] = React.useState("gold");
  const [brief, setBrief] = React.useState("");
  const [bl, setBl] = React.useState(false);
  const t = TIERS[sel];
  React.useEffect(() => { setBrief(""); }, [sel]);
  async function genBrief() {
    setBl(true); setBrief(""); let out = "";
    try {
      const p = `Write ONE punchy value-proposition sentence (max 24 words, no quotes) selling a ${t.name} sponsorship of TUBC AI Hackathon — a Thai university hackathon where mixed dev+business teams ship real AI products and pitch at the Thailand AI Expo. Audience: a corporate marketing/CSR sponsor.`;
      out = (await window.claude.complete({ messages: [{ role: "user", content: p }] })).trim().replace(/^["']|["']$/g, "");
    } catch (e) { out = ""; }
    if (!out) out = BRIEF_FALLBACK[sel];
    setBrief(out); setBl(false);
  }
  return (
    <section className="section sponsor-sec" id="sponsor" data-screen-label="Sponsor Packages">
      <div className="wrap">
        <Mod no="06" tag="Sponsor Packages" title="Back the builders. Own the stage." thai="ร่วมเป็นผู้สนับสนุน เข้าถึงทาเลนต์และเวที Thailand AI Expo" />

        <div className="tiers">
          {Object.values(TIERS).map(tr => {
            const active = sel === tr.key;
            return (
              <button key={tr.key} className={"tier card" + (active ? " active" : "") + (tr.key === "gold" ? " feat" : "")}
                onClick={() => setSel(tr.key)} style={{ "--tier": tr.var }}>
                {tr.key === "gold" && <span className="tier-flag">most visible</span>}
                <div className="tier-head"><span className="tier-name" style={{ color: tr.var }}>{tr.name}</span><span className="tier-spots">{tr.spots}</span></div>
                <div className="tier-price"><span className="tier-num">{tr.price.toLocaleString()}</span><span className="tier-cur">THB</span></div>
                <p className="tier-blurb">{tr.blurb}</p>
                <span className={"tier-pick" + (active ? " on" : "")}>{active ? "✓ selected" : "select tier"}</span>
              </button>
            );
          })}
        </div>

        <Reveal delay={1}>
          <div className="impact card" style={{ "--tier": t.var }}>
            <div className="impact-bar"><span>impact-estimate ❯ <b style={{ color: t.var }}>{t.name}</b></span><span className="mute">est. reach · editable</span></div>
            <div className="impact-grid">
              <IStat k="builders reached" value={t.metrics.builders} suffix="+" c={t.var} />
              <IStat k="brand impressions" value={t.metrics.impressions} suffix="+" c={t.var} />
              <IStat k="expo audience" value={t.metrics.expo} suffix="+" c={t.var} />
              <IStat k="talent CVs" value={t.metrics.cvs} suffix={t.metrics.cvs ? "+" : ""} c={t.var} />
            </div>
            <div className="brief">
              {brief ? <p>{brief}</p> : <p className="ph">{bl ? <span>drafting your pitch<span className="ell" /></span> : <span>generate a tailored one-line pitch for a {t.name} sponsor →</span>}</p>}
              <button className="btn" onClick={genBrief} disabled={bl}>{brief ? "Regenerate pitch" : "Generate sponsor pitch"} <span className="dot" /></button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="matrix">
            <div className="mx-row mx-head">
              <span className="mx-c mx-feat">what you get</span>
              {Object.values(TIERS).map(tr => <span key={tr.key} className={"mx-c mx-t" + (sel === tr.key ? " on" : "")} style={{ color: tr.var }} onClick={() => setSel(tr.key)}>{tr.name}</span>)}
            </div>
            {BENEFITS.map(([label, av], i) => (
              <div className="mx-row" key={i}>
                <span className="mx-c mx-feat">{label}</span>
                {["gold", "silver", "bronze"].map(k => (
                  <span key={k} className={"mx-c mx-m" + (sel === k ? " on" : "")}>{av[k] ? <span style={{ color: TIERS[k].var }}>✓</span> : <span className="no">—</span>}</span>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="sponsor-cta">
            <a href="#contact" className="btn btn-primary">Sponsor as {t.name} <span className="dot" /></a>
            <span className="note">flexible packages · custom tiers on request</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
