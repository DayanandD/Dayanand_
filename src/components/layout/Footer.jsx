import { CONTACT } from "../../data/index.js";
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg2)", borderTop: "1px solid var(--border)",
      padding: "32px clamp(20px,6vw,80px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 14,
    }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 3 }}>
          Dayanand<span style={{ color: "var(--accent)" }}>.</span>
        </p>
        <p style={{ fontSize: 12, color: "var(--text3)" }}>© {new Date().getFullYear()} — Software Engineer</p>
      </div>
      <div style={{ display: "flex", gap: 22 }}>
        {[
          { l: "LinkedIn", h: CONTACT.linkedin },
          { l: "GitHub",   h: CONTACT.github   },
          { l: "Email",    h: `mailto:${CONTACT.email}` },
        ].map(s => (
          <a key={s.l} href={s.h} target="_blank" rel="noreferrer"
            style={{ fontSize: 12, color: "var(--text3)", fontWeight: 600, transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
          >{s.l}</a>
        ))}
      </div>
    </footer>
  );
}
