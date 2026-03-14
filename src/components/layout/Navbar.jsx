import { useState } from "react";
import { useActiveSection, useScrollY } from "../../hooks/index.js";
import { NAV } from "../../data/index.js";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar({ dark, onToggle }) {
  const active = useActiveSection();
  const scrolled = useScrollY() > 50;
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 66,
        padding: "0 clamp(20px,6vw,80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "background .3s, border-color .3s",
      }}>
        {/* Logo */}
        <button onClick={() => go("hero")} style={{
          fontSize: 17, fontWeight: 900, letterSpacing: "-0.05em",
          color: "var(--text)", fontFamily: "inherit",
        }}>
          D<span style={{ color: "var(--accent)" }}>D</span>
          <span style={{ color: "var(--accent)", fontSize: 22, lineHeight: 0 }}>.</span>
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="d-nav">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)} style={{
              fontSize: 13, fontWeight: active === n.id ? 700 : 500,
              color: active === n.id ? "var(--accent)" : "var(--text2)",
              padding: "6px 13px", borderRadius: 8, fontFamily: "inherit",
              transition: "color .2s",
            }}
            onMouseEnter={e => { if (active !== n.id) e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { if (active !== n.id) e.currentTarget.style.color = "var(--text2)"; }}
            >{n.label}</button>
          ))}

          <button onClick={onToggle} style={{
            marginLeft: 8, width: 36, height: 36, borderRadius: 9,
            border: "1px solid var(--border2)", background: "var(--card)",
            color: "var(--text2)", fontSize: 14, display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "border-color .2s, color .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}
          >{dark ? "☀" : "◑"}</button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(v => !v)} className="m-nav" style={{
          display: "none", width: 36, height: 36, borderRadius: 9,
          border: "1px solid var(--border2)", background: "var(--card)",
          alignItems: "center", justifyContent: "center",
          fontSize: 15, color: "var(--text)",
        }}>{open ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", top: 66, left: 0, right: 0, zIndex: 99,
        background: "var(--bg2)", borderBottom: "1px solid var(--border)",
        padding: open ? "12px 24px 22px" : "0 24px",
        maxHeight: open ? 500 : 0, overflow: "hidden",
        transition: "max-height .35s cubic-bezier(.4,0,.2,1), padding .35s",
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => { go(n.id); setOpen(false); }} style={{
            display: "block", width: "100%", textAlign: "left", fontFamily: "inherit",
            fontSize: 15, fontWeight: 600, padding: "12px 0",
            color: active === n.id ? "var(--accent)" : "var(--text2)",
            borderBottom: "1px solid var(--border)",
          }}>{n.label}</button>
        ))}
        <button onClick={onToggle} style={{
          marginTop: 14, padding: "8px 16px", borderRadius: 8,
          border: "1px solid var(--border2)", background: "var(--card)",
          fontSize: 13, color: "var(--text2)", fontFamily: "inherit",
        }}>{dark ? "☀ Light" : "◑ Dark"}</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .d-nav { display: none !important; }
          .m-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
