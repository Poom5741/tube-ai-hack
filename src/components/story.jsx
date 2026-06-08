/* story.jsx — Nav, About (problem→solution), Objective (v2) */
import React from "react";
import { Mod, Reveal } from "./effects.jsx";

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["About", "#about"], ["Program", "#program"], ["Sponsor", "#sponsor"], ["Prizes", "#prizes"], ["Contact", "#contact"]];
  return (
    <nav className={"nav" + (solid ? " solid" : "") + (open ? " open" : "")}>
      <div className="wrap nav-in">
        <a href="#top" className="nav-logo"><span className="nav-mark" /> TUBC <span className="sep">//</span> <b>AI&nbsp;HACK</b></a>
        <div className="nav-links">{links.map(([t, h]) => <a key={t} href={h} className="nav-link">{t}</a>)}</div>
        <div className="nav-right">
          <a href="#sponsor" className="btn btn-primary nav-cta">Sponsor <span className="dot" /></a>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="menu"><span /><span /><span /></button>
        </div>
      </div>
      <div className="nav-sheet">
        {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a href="#sponsor" className="btn btn-primary" onClick={() => setOpen(false)}>Become a Sponsor</a>
      </div>
    </nav>
  );
}

export function About() {
  const problems = [
    { code: "dev.business_sense = null", en: "Developers can build, but lack business thinking.", th: "เดฟสร้างได้ แต่ขาดมุมมองธุรกิจ" },
    { code: "biz.execution = blocked", en: "Business students have ideas, but can’t execute.", th: "สายธุรกิจมีไอเดีย แต่ลงมือทำเองไม่ได้" },
    { code: "market.demand = hybrid", en: "The market needs hybrid talent.", th: "ตลาดต้องการคนที่ข้ามสายได้" },
  ];
  const solutions = ["Combine Dev + Business into one team", "Build real AI products — not just ideas", "End with a real investor pitch"];
  return (
    <section className="section" id="about" data-screen-label="About / Problem">
      <div className="wrap">
        <Mod no="01" tag="About Us" title="The gap we close" thai="ช่องว่างของตลาดที่เราเข้ามาปิด" />
        <div className="about-grid">
          <div>
            <span className="prob-label">// diagnostic</span>
            {problems.map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <div className="prob card card-h">
                  <code>{p.code}</code>
                  <div className="en">{p.en}</div>
                  <div className="th thai">{p.th}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={1}>
            <div className="sol card">
              <span className="sol-tag">output ❯ what we do differently</span>
              <ul className="sol-list">{solutions.map((s, i) => <li key={i}>{s}</li>)}</ul>
              <div className="sol-foot thai">ทีมเดียวที่มีทั้ง dev และ business ลงมือสร้างของจริง แล้วจบด้วยการ pitch ต่อนักลงทุน</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Objective() {
  const pillars = [
    { k: "Innovation", th: "เปิดโอกาสให้ทุกคนสร้าง solution บน problem จริง โดยลดข้อจำกัดด้าน coding skill ด้วย AI", ico: "✳" },
    { k: "Skill Building", th: "ยกระดับทักษะผู้เข้าร่วมผ่านการลงมือทำจริง (hands-on)", ico: "▲" },
    { k: "Community & Ecosystem", th: "สร้าง connection ระหว่าง Thai Tech Community และ Global AI Companies (Alibaba Cloud, ByteDance)", ico: "◇" },
  ];
  return (
    <section className="section" data-screen-label="Objective">
      <div className="wrap">
        <Mod no="02" tag="Objective" title="What we set out to prove" />
        <Reveal delay={1}>
          <blockquote className="obj-quote">
            <span className="mk">“</span>Anyone — <span className="hl">regardless</span> of being a developer or having a business background — can build <span className="hl">real products</span> using AI.
          </blockquote>
        </Reveal>
        <Reveal delay={2}>
          <p className="obj-th thai">เปิดโอกาสให้ทุกคนสร้าง solution บน problem จริง โดยลดข้อจำกัดด้าน coding skill ด้วย AI</p>
        </Reveal>
        <div className="pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.k} delay={i + 1}>
              <div className="pillar card card-h">
                <div className="pillar-top"><span className="pillar-ico">{p.ico}</span><span className="pillar-no">P{i + 1}</span></div>
                <h3>{p.k}</h3>
                <p className="th thai">{p.th}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
