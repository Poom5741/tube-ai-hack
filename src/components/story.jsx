/* story.jsx — Nav, About (problem→solution), Objective (v2) */
import React from "react";
import { Mod, Reveal } from "./effects.jsx";
import { useLang } from "../i18n.jsx";

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const { lang, setLang } = useLang();
  React.useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = lang === "th"
    ? [["เกี่ยวกับ", "#about"], ["โปรแกรม", "#program"], ["สนับสนุน", "#sponsor"], ["รางวัล", "#prizes"], ["ติดต่อ", "#contact"]]
    : [["About", "#about"], ["Program", "#program"], ["Sponsor", "#sponsor"], ["Prizes", "#prizes"], ["Contact", "#contact"]];
  const ctaLabel = lang === "th" ? "สนับสนุน" : "Sponsor";
  const ctaFullLabel = lang === "th" ? "เป็นผู้สนับสนุน" : "Become a Sponsor";
  return (
    <nav className={"nav" + (solid ? " solid" : "") + (open ? " open" : "")}>
      <div className="wrap nav-in">
        <a href="#top" className="nav-logo"><span className="nav-mark" /> TUBC <span className="sep">//</span> <b>AI&nbsp;HACK</b></a>
        <div className="nav-links">{links.map(([t, h]) => <a key={t} href={h} className="nav-link">{t}</a>)}</div>
        <div className="nav-right">
          <button className="lang-toggle" onClick={() => setLang(l => l === "en" ? "th" : "en")} aria-label="Toggle language">
            <span className={lang === "en" ? "active" : ""}>EN</span>
            <span className="sep">/</span>
            <span className={lang === "th" ? "active" : ""}>TH</span>
          </button>
          <a href="#sponsor" className="btn btn-primary nav-cta">{ctaLabel} <span className="dot" /></a>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="menu"><span /><span /><span /></button>
        </div>
      </div>
      <div className="nav-sheet">
        {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a href="#sponsor" className="btn btn-primary" onClick={() => setOpen(false)}>{ctaFullLabel}</a>
      </div>
    </nav>
  );
}

export function About() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  const problems = [
    { code: "dev.business_sense = null", en: "Developers can build, but lack business thinking.", th: "เดฟสร้างได้ แต่ขาดมุมมองธุรกิจ" },
    { code: "biz.execution = blocked", en: "Business students have ideas, but can't execute.", th: "สายธุรกิจมีไอเดีย แต่ลงมือทำเองไม่ได้" },
    { code: "market.demand = hybrid", en: "The market needs hybrid talent.", th: "ตลาดต้องการคนที่ข้ามสายได้" },
  ];
  const solutions = {
    en: ["Combine Dev + Business into one team", "Build real AI products — not just ideas", "End with a real investor pitch"],
    th: ["รวม Dev + Business เป็นทีมเดียว", "สร้างผลิตภัณฑ์ AI จริง — ไม่ใช่แค่ไอเดีย", "จบด้วยการ pitch นักลงทุนจริง"],
  };
  return (
    <section className="section" id="about" data-screen-label="About / Problem">
      <div className="wrap">
        <Mod no="01" tag="About Us" tagTh="เกี่ยวกับเรา" title="The gap we close" titleTh="ช่องว่างที่เราปิด" thai="ช่องว่างของตลาดที่เราเข้ามาปิด" />
        <div className="about-grid">
          <div>
            <span className="prob-label">{t("// diagnostic", "// วินิจฉัย")}</span>
            {problems.map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <div className="prob card card-h">
                  <code>{p.code}</code>
                  <div className={lang === "th" ? "th thai" : "en"}>{lang === "th" ? p.th : p.en}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={1}>
            <div className="sol card">
              <span className="sol-tag">{t("output ❯ what we do differently", "output ❯ สิ่งที่เราทำต่างออกไป")}</span>
              <ul className="sol-list">
                {(lang === "th" ? solutions.th : solutions.en).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
              <div className="sol-foot thai">
                {t(
                  "One team with both dev and business — building real products, ending with an investor pitch.",
                  "ทีมเดียวที่มีทั้ง dev และ business ลงมือสร้างของจริง แล้วจบด้วยการ pitch ต่อนักลงทุน"
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Objective() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  const pillars = [
    {
      k: t("Innovation", "นวัตกรรม"),
      desc: t(
        "Open real problem-solving to everyone — AI lowers the coding barrier.",
        "เปิดโอกาสให้ทุกคนสร้าง solution บน problem จริง โดยลดข้อจำกัดด้าน coding skill ด้วย AI"
      ),
      ico: "✳",
    },
    {
      k: t("Skill Building", "พัฒนาทักษะ"),
      desc: t(
        "Level up participants through real hands-on experience.",
        "ยกระดับทักษะผู้เข้าร่วมผ่านการลงมือทำจริง (hands-on)"
      ),
      ico: "▲",
    },
    {
      k: t("Community & Ecosystem", "ชุมชนและระบบนิเวศ"),
      desc: t(
        "Build connections between the Thai Tech Community and global AI companies (Alibaba Cloud, ByteDance).",
        "สร้าง connection ระหว่าง Thai Tech Community และ Global AI Companies (Alibaba Cloud, ByteDance)"
      ),
      ico: "◇",
    },
  ];
  return (
    <section className="section" data-screen-label="Objective">
      <div className="wrap">
        <Mod no="02" tag="Objective" tagTh="วัตถุประสงค์" title="What we set out to prove" titleTh="สิ่งที่เราต้องการพิสูจน์" />
        <Reveal delay={1}>
          <blockquote className="obj-quote">
            {lang === "th" ? (
              <>
                <span className="mk">"</span>ทุกคน — <span className="hl">ไม่ว่า</span>จะเป็น developer หรือมีพื้นฐานด้านธุรกิจ — สามารถสร้าง<span className="hl">ผลิตภัณฑ์จริง</span>ด้วย AI ได้
              </>
            ) : (
              <>
                <span className="mk">"</span>Anyone — <span className="hl">regardless</span> of being a developer or having a business background — can build <span className="hl">real products</span> using AI.
              </>
            )}
          </blockquote>
        </Reveal>
        <Reveal delay={2}>
          <p className="obj-th thai">
            {t(
              "Lowering the barrier for anyone to build real solutions — AI removes the coding bottleneck.",
              "เปิดโอกาสให้ทุกคนสร้าง solution บน problem จริง โดยลดข้อจำกัดด้าน coding skill ด้วย AI"
            )}
          </p>
        </Reveal>
        <div className="pillars">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="pillar card card-h">
                <div className="pillar-top"><span className="pillar-ico">{p.ico}</span><span className="pillar-no">P{i + 1}</span></div>
                <h3>{p.k}</h3>
                <p className={lang === "th" ? "th thai" : ""}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
