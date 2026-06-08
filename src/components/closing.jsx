/* closing.jsx — Prizes, Advisors, Contact (v2) */
import React from "react";
import { Mod, Reveal, Counter } from "./effects.jsx";
import { useLang } from "../i18n.jsx";

export function Prizes() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  const prizes = [
    { rank: "01", name: t("Grand Champion", "แชมป์"), amt: 20000, tone: "var(--gold)" },
    { rank: "02", name: t("1st Runner-Up", "รองแชมป์อันดับ 1"), amt: 10000, tone: "var(--silver)" },
    { rank: "03", name: t("2nd Runner-Up", "รองแชมป์อันดับ 2"), amt: 5000, tone: "var(--bronze)" },
    { rank: "B1", name: "[Gold Sponsor 1] Bounty Track", amt: 12500, tone: "var(--indigo-1)", bounty: true },
    { rank: "B2", name: "[Gold Sponsor 2] Bounty Track", amt: 12500, tone: "var(--indigo-1)", bounty: true },
    { rank: "B3", name: "[Silver Sponsor] Prize", amt: 5000, tone: "var(--violet)", bounty: true },
  ];
  const total = prizes.reduce((s, p) => s + p.amt, 0);
  return (
    <section className="section" id="prizes" data-screen-label="Prize Pool">
      <div className="wrap">
        <Mod
          no="07"
          tag="Prize Pool"
          tagTh="กองรางวัล"
          title="A pool worth pitching for"
          titleTh="รางวัลที่คุ้มค่ากับการแข่ง"
          thai="เงินรางวัลรวมที่คุ้มค่ากับการลงแข่ง"
        />
        <Reveal delay={1}>
          <div className="pool card">
            <span className="lab">{t("total prize pool ❯", "รางวัลรวมทั้งหมด ❯")}</span>
            <span className="num">฿<Counter value={total} /></span>
            <span className="sub">{t("THB · sponsor-funded · named tracks available", "บาท · สนับสนุนโดยสปอนเซอร์ · มี named tracks")}</span>
          </div>
        </Reveal>
        <div className="prizes">
          {prizes.map((p, i) => (
            <Reveal key={p.rank} delay={(i % 3) + 1}>
              <div className={"prize card card-h" + (p.bounty ? " bounty" : "")} style={{ "--tone": p.tone }}>
                <div className="prize-top"><span className="prize-rank">{p.rank}</span>{p.bounty && <span className="prize-bt">bounty</span>}</div>
                <div className="prize-amt">฿{p.amt.toLocaleString()}</div>
                <div className="prize-name">{p.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Advisors() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  const people = [
    { name: "Dom Charoenyost", role: t("Founder, Tokenine", "ผู้ก่อตั้ง, Tokenine"), real: true },
    { name: "[Advisor Name]", role: "[Role / Company]" },
    { name: "[Advisor Name]", role: "[Role / Company]" },
    { name: "[Advisor Name]", role: "[Role / Company]" },
    { name: "[Advisor Name]", role: "[Role / Company]" },
  ];
  return (
    <section className="section" data-screen-label="Advisors">
      <div className="wrap">
        <Mod
          no="08"
          tag="Advisors & Partners"
          tagTh="ที่ปรึกษาและพาร์ทเนอร์"
          title="Guided by operators"
          titleTh="นำโดยผู้ปฏิบัติงานจริง"
        />
        <div className="advs">
          {people.map((p, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <div className={"adv card card-h" + (p.real ? " real" : " ph2")}>
                <div className="adv-ph">
                  <span className="adv-init">{p.real ? "DC" : "—"}</span>
                  {!p.real && <span className="adv-slot">{t("photo", "รูปภาพ")}</span>}
                </div>
                <div className="adv-name">{p.name}</div>
                <div className="adv-role">{p.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="partners">
            <span className="lab">{t("ecosystem ❯", "ระบบนิเวศ ❯")}</span>
            {["Tokenine", "TUBC", "Alibaba Cloud*", "ByteDance*", "[Academic Partner]"].map(p => <span key={p} className="pchip">{p}</span>)}
            <span className="pnote">{t("* in conversation", "* อยู่ระหว่างพูดคุย")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const { lang } = useLang();
  const t = (en, th) => lang === "th" && th ? th : en;
  return (
    <section className="section contact-sec" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <div className="contact-card">
          <Reveal><span className="contact-eye">{t("Let's build it together", "มาสร้างด้วยกัน")}</span></Reveal>
          <Reveal delay={1}>
            <h2 className="contact-h">
              {t(
                <>{`Sponsor the next wave of`}<br /><span className="hl">Thai AI builders.</span></>,
                <>{`สนับสนุนคลื่นลูกถัดไปของ`}<br /><span className="hl">นักสร้าง AI ไทย</span></>
              )}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="contact-th thai">
              {t(
                "Interested in sponsoring or want a custom package? Reach out to the team.",
                "สนใจเป็นผู้สนับสนุน หรืออยากได้แพ็กเกจที่ออกแบบเฉพาะ ติดต่อทีมงานได้เลย"
              )}
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="contact-rows">
              <a className="crow" href="mailto:hello@tubc.example"><span className="k">{t("email ❯", "อีเมล ❯")}</span><span className="v">[hello@tubc.example]</span><span className="go">→</span></a>
              <a className="crow" href="#"><span className="k">line ❯</span><span className="v">[@tubc-aihack]</span><span className="go">→</span></a>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <a href="#sponsor" className="btn btn-primary">{t("View sponsor packages", "ดูแพ็กเกจผู้สนับสนุน")} <span className="dot" /></a>
          </Reveal>
        </div>
        <footer className="footer">
          <span>◆ TUBC // AI HACKATHON 2026</span>
          <span className="mute">{t("generative pitch · bangkok · thailand ai expo", "generative pitch · กรุงเทพฯ · thailand ai expo")}</span>
        </footer>
      </div>
    </section>
  );
}
