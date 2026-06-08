/* sponsor.jsx — interactive sponsor packages (v2, the sell) */
import React from "react";
import { Mod, Reveal, Counter } from "./effects.jsx";
import { useLang } from "../i18n.jsx";

const TIERS = {
  gold: { key: "gold", name: "Gold", nameTh: "ทอง", price: 50000, var: "var(--gold)", spots: "2 spots", spotsTh: "2 ที่นั่ง",
    blurb: "Headline partner. Your brand leads the program and owns a named bounty track.",
    blurbTh: "พาร์ทเนอร์หลัก แบรนด์คุณนำโปรแกรมและเป็นเจ้าของ named bounty track",
    metrics: { builders: 500, impressions: 80000, expo: 10000, cvs: 500 } },
  silver: { key: "silver", name: "Silver", nameTh: "เงิน", price: 25000, var: "var(--silver)", spots: "4 spots", spotsTh: "4 ที่นั่ง",
    blurb: "Growth partner. Strong visibility across workshops plus direct talent access.",
    blurbTh: "พาร์ทเนอร์การเติบโต มองเห็นได้ชัดในทุกเวิร์กช็อป พร้อมเข้าถึงทาเลนต์โดยตรง",
    metrics: { builders: 500, impressions: 35000, expo: 4000, cvs: 250 } },
  bronze: { key: "bronze", name: "Bronze", nameTh: "บรอนซ์", price: 10000, var: "var(--bronze)", spots: "open", spotsTh: "เปิด",
    blurb: "Community partner. Get your logo in front of every builder in the room.",
    blurbTh: "พาร์ทเนอร์ชุมชน โลโก้คุณอยู่ต่อหน้าทุกคนในงาน",
    metrics: { builders: 500, impressions: 12000, expo: 1000, cvs: 0 } },
};
const BENEFITS = [
  { en: "Logo on all event materials", th: "โลโก้บนสื่อประชาสัมพันธ์ทั้งหมด", av: { gold: 1, silver: 1, bronze: 1 } },
  { en: "Co-branded participant certificate", th: "ใบประกาศร่วมแบรนด์", av: { gold: 1, silver: 1, bronze: 1 } },
  { en: "Prize-pool contribution credit", th: "เครดิตการสนับสนุนกองรางวัล", av: { gold: 1, silver: 1, bronze: 1 } },
  { en: "Media coverage", th: "การนำเสนอในสื่อ", av: { gold: 1, silver: 1, bronze: 0 } },
  { en: "Workshop branding", th: "แบรนด์ในเวิร์กช็อป", av: { gold: 1, silver: 1, bronze: 0 } },
  { en: "Participant CV & talent access", th: "CV ผู้เข้าร่วมและเข้าถึงทาเลนต์", av: { gold: 1, silver: 1, bronze: 0 } },
  { en: "Post-event insights report", th: "รายงานข้อมูลเชิงลึกหลังงาน", av: { gold: 1, silver: 1, bronze: 0 } },
  { en: "Named sponsor bounty track", th: "Named sponsor bounty track", av: { gold: 1, silver: 0, bronze: 0 } },
  { en: "Judging panel seat", th: "ที่นั่งกรรมการตัดสิน", av: { gold: 1, silver: 0, bronze: 0 } },
  { en: "On-stage recognition at AI Expo", th: "ประกาศเกียรติคุณบนเวที AI Expo", av: { gold: 1, silver: 0, bronze: 0 } },
];
const BRIEF_FALLBACK = {
  gold: "Put your brand at the center of Thailand's next AI builders — own a bounty track, judge the finals, and headline the Expo stage.",
  silver: "Stay visible through every workshop and walk away with direct access to 500 cross-functional AI builders.",
  bronze: "Get your logo in front of every team in the room and back Thailand's emerging AI talent.",
};

function IStat({ k, value, suffix, c }) {
  return <div className="istat"><span className="v" style={{ color: c }}><Counter value={value} suffix={suffix} /></span><span className="k">{k}</span></div>;
}

export function Sponsors() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  const [sel, setSel] = React.useState("gold");
  const [brief, setBrief] = React.useState("");
  const [bl, setBl] = React.useState(false);
  const tr = TIERS[sel];
  React.useEffect(() => { setBrief(""); }, [sel]);
  async function genBrief() {
    setBl(true); setBrief(""); let out = "";
    try {
      const p = `Write ONE punchy value-proposition sentence (max 24 words, no quotes) selling a ${tr.name} sponsorship of TUBC AI Hackathon — a Thai university hackathon where mixed dev+business teams ship real AI products and pitch at the Thailand AI Expo. Audience: a corporate marketing/CSR sponsor.`;
      out = (await window.claude.complete({ messages: [{ role: "user", content: p }] })).trim().replace(/^["']|["']$/g, "");
    } catch (e) { out = ""; }
    if (!out) out = BRIEF_FALLBACK[sel];
    setBrief(out); setBl(false);
  }
  return (
    <section className="section sponsor-sec" id="sponsor" data-screen-label="Sponsor Packages">
      <div className="wrap">
        <Mod
          no="06"
          tag="Sponsor Packages"
          tagTh="แพ็กเกจสปอนเซอร์"
          title="Back the builders. Own the stage."
          titleTh="สนับสนุนผู้สร้าง ครองเวที"
          thai="ร่วมเป็นผู้สนับสนุน เข้าถึงทาเลนต์และเวที Thailand AI Expo"
        />

        <div className="tiers">
          {Object.values(TIERS).map(tier => {
            const active = sel === tier.key;
            return (
              <button key={tier.key} className={"tier card" + (active ? " active" : "") + (tier.key === "gold" ? " feat" : "")}
                onClick={() => setSel(tier.key)} style={{ "--tier": tier.var }}>
                {tier.key === "gold" && <span className="tier-flag">{t("most visible", "โดดเด่นที่สุด")}</span>}
                <div className="tier-head">
                  <span className="tier-name" style={{ color: tier.var }}>{t(tier.name, tier.nameTh)}</span>
                  <span className="tier-spots">{t(tier.spots, tier.spotsTh)}</span>
                </div>
                <div className="tier-price"><span className="tier-num">{tier.price.toLocaleString()}</span><span className="tier-cur">THB</span></div>
                <p className="tier-blurb">{t(tier.blurb, tier.blurbTh)}</p>
                <span className={"tier-pick" + (active ? " on" : "")}>{active ? t("✓ selected", "✓ เลือกแล้ว") : t("select tier", "เลือก tier")}</span>
              </button>
            );
          })}
        </div>

        <Reveal delay={1}>
          <div className="impact card" style={{ "--tier": tr.var }}>
            <div className="impact-bar">
              <span>{t("impact-estimate ❯", "ประมาณการผลกระทบ ❯")} <b style={{ color: tr.var }}>{t(tr.name, tr.nameTh)}</b></span>
              <span className="mute">{t("est. reach · editable", "ประมาณการ · แก้ไขได้")}</span>
            </div>
            <div className="impact-grid">
              <IStat k={t("builders reached", "ผู้สร้างที่เข้าถึง")} value={tr.metrics.builders} suffix="+" c={tr.var} />
              <IStat k={t("brand impressions", "การรับรู้แบรนด์")} value={tr.metrics.impressions} suffix="+" c={tr.var} />
              <IStat k={t("expo audience", "ผู้ชม Expo")} value={tr.metrics.expo} suffix="+" c={tr.var} />
              <IStat k={t("talent CVs", "CV ทาเลนต์")} value={tr.metrics.cvs} suffix={tr.metrics.cvs ? "+" : ""} c={tr.var} />
            </div>
            <div className="brief">
              {brief ? <p>{brief}</p> : (
                <p className="ph">
                  {bl
                    ? <span>{t("drafting your pitch", "กำลังร่าง pitch")}<span className="ell" /></span>
                    : <span>{t(`generate a tailored one-line pitch for a ${tr.name} sponsor →`, `สร้าง pitch หนึ่งบรรทัดสำหรับผู้สนับสนุน ${t(tr.name, tr.nameTh)} →`)}</span>
                  }
                </p>
              )}
              <button className="btn" onClick={genBrief} disabled={bl}>
                {brief ? t("Regenerate pitch", "สร้าง pitch ใหม่") : t("Generate sponsor pitch", "สร้าง sponsor pitch")} <span className="dot" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="matrix">
            <div className="mx-row mx-head">
              <span className="mx-c mx-feat">{t("what you get", "สิ่งที่คุณได้รับ")}</span>
              {Object.values(TIERS).map(tier => (
                <span key={tier.key} className={"mx-c mx-t" + (sel === tier.key ? " on" : "")} style={{ color: tier.var }} onClick={() => setSel(tier.key)}>
                  {t(tier.name, tier.nameTh)}
                </span>
              ))}
            </div>
            {BENEFITS.map((b, i) => (
              <div className="mx-row" key={i}>
                <span className="mx-c mx-feat">{t(b.en, b.th)}</span>
                {["gold", "silver", "bronze"].map(k => (
                  <span key={k} className={"mx-c mx-m" + (sel === k ? " on" : "")}>
                    {b.av[k] ? <span style={{ color: TIERS[k].var }}>✓</span> : <span className="no">—</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="sponsor-cta">
            <a href="#contact" className="btn btn-primary">
              {t(`Sponsor as ${tr.name}`, `สนับสนุนในฐานะ${t(tr.name, tr.nameTh)}`)} <span className="dot" />
            </a>
            <span className="note">{t("flexible packages · custom tiers on request", "แพ็กเกจยืดหยุ่น · ปรับแต่งได้ตามต้องการ")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
