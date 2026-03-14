import { useState, useEffect } from "react";
import { useScrollY } from "../../hooks/index.js";

/* Fade-in wrapper driven by a `vis` boolean */
export function Fade({ children, vis, delay = 0, dir = "up" }) {
  const transforms = { up: "translateY(28px)", left: "translateX(-20px)", right: "translateX(20px)", none: "none" };
  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translate(0)" : transforms[dir],
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

/* Section heading block */
export function SectionHead({ eyebrow, title, sub, vis }) {
  return (
    <Fade vis={vis}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, marginBottom: 14, letterSpacing: "-0.03em" }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, marginBottom: 56, maxWidth: 540 }}>{sub}</p>}
    </Fade>
  );
}

/* Pill tag */
export function Tag({ children, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600,
      padding: "3px 9px", borderRadius: 99,
      background: color ? color + "12" : "transparent",
      border: `1px solid ${color ? color + "30" : "var(--border2)"}`,
      color: color || "var(--text3)",
      letterSpacing: "0.03em", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

/* Back to top */
export function BackToTop() {
  const y = useScrollY();
  if (y < 500) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 90,
        width: 44, height: 44, borderRadius: 11,
        border: "1px solid var(--border2)", background: "var(--card)",
        color: "var(--text2)", fontSize: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(10px)",
        transition: "border-color .2s, color .2s, transform .2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >↑</button>
  );
}
