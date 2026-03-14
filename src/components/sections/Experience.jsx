import { useState } from "react";
import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead, Tag } from "../ui/index.jsx";
import { EXPERIENCE } from "../../data/index.js";

function PointRow({ text, color }) {
  const [h, setH] = useState(false);
  return (
    <li
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontSize: 13.5, lineHeight: 1.75, marginBottom: 6,
        display: "flex", gap: 10, alignItems: "flex-start",
        padding: "5px 8px", borderRadius: 8,
        color: h ? "var(--text)" : "var(--text2)",
        background: h ? color + "07" : "transparent",
        cursor: "default", transition: "color .2s, background .2s",
      }}
    >
      <span style={{
        fontSize: 7, color: h ? color : "var(--text3)", marginTop: 6, flexShrink: 0,
        transform: h ? "translateX(3px)" : "translateX(0)",
        transition: "color .2s, transform .2s", display: "inline-block",
      }}>▶</span>
      {text}
    </li>
  );
}

function ExpCard({ exp, idx, vis }) {
  const [open, setOpen] = useState(idx === 0);
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      display: "flex", gap: 0,
      marginBottom: 16,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .5s ease ${idx * 100}ms, transform .5s ease ${idx * 100}ms`,
    }}>
      {/* Timeline */}
      <div style={{ width: 44, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
        <div style={{
          width: 13, height: 13, borderRadius: "50%",
          background: exp.current ? exp.color : "var(--bg3)",
          border: `2px solid ${exp.current ? exp.color : "var(--border2)"}`,
          boxShadow: exp.current ? `0 0 0 4px ${exp.color}20, 0 0 12px ${exp.color}30` : "none",
          zIndex: 1, transition: "box-shadow .3s",
        }} />
        <div style={{
          width: 1, flex: 1, marginTop: 7,
          background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
          minHeight: 24,
        }} />
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1, marginLeft: 14,
          background: "var(--card)",
          border: `1px solid ${hov ? exp.color + "35" : "var(--border)"}`,
          borderRadius: 16, overflow: "hidden",
          boxShadow: hov ? `0 10px 40px -12px ${exp.color}20` : "none",
          transition: "border-color .25s, box-shadow .25s",
        }}
      >
        {/* Top accent bar */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${exp.color}, ${exp.color}40)`,
          opacity: open || exp.current ? 1 : 0.3, transition: "opacity .3s",
        }} />

        {/* Header — click to expand */}
        <div onClick={() => setOpen(v => !v)} style={{ padding: "18px 22px 16px", cursor: "pointer", userSelect: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: "-0.025em" }}>
                  {exp.company}
                </h3>

                {/* Type badge */}
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                  background: exp.type === "Internship" ? "rgba(0,229,160,0.1)" : exp.color + "12",
                  border: `1px solid ${exp.type === "Internship" ? "rgba(0,229,160,0.3)" : exp.color + "30"}`,
                  color: exp.type === "Internship" ? "#00e5a0" : exp.color,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{exp.type}</span>

                {/* Current badge */}
                {exp.current && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                    background: exp.color + "15", border: `1px solid ${exp.color}40`,
                    color: exp.color, letterSpacing: "0.08em",
                    display: "inline-flex", alignItems: "center", gap: 5,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%", background: exp.color,
                      animation: "pulseDot 2s ease-in-out infinite",
                    }} />
                    Current
                  </span>
                )}

                {/* Promotion badge */}
                {exp.promoted && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "2px 9px", borderRadius: 99,
                    background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)",
                    color: "#00e5a0", letterSpacing: "0.06em",
                  }}>↑ Promoted {exp.promotedYear}</span>
                )}
              </div>

              <p style={{ fontSize: 13, color: exp.color, fontWeight: 700, margin: 0 }}>
                {exp.role}
                {exp.prev && <span style={{ color: "var(--text3)", fontWeight: 400, fontSize: 11, marginLeft: 8 }}>← {exp.prev}</span>}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", margin: 0 }}>{exp.period}</p>
                <p style={{ fontSize: 11, color: "var(--text3)", margin: "2px 0 0" }}>{exp.location}</p>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "var(--text3)", flexShrink: 0,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}>▼</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{
          maxHeight: open ? 900 : 0, overflow: "hidden",
          transition: "max-height .42s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{ padding: "0 22px 20px", borderTop: "1px solid var(--border)" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
              {exp.points.map((pt, i) => <PointRow key={i} text={pt} color={exp.color} />)}
            </ul>

            {exp.awards && exp.awards.length > 0 && (
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
                {exp.awards.map((aw, i) => (
                  <div key={i} style={{
                    padding: "9px 13px", borderRadius: 9,
                    background: "rgba(255,181,71,0.07)", border: "1px solid rgba(255,181,71,0.2)",
                    display: "flex", gap: 9, alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>
                    <p style={{ fontSize: 12.5, color: "var(--text2)", margin: 0, lineHeight: 1.6 }}>
                      <strong style={{ color: "#ffb547", fontWeight: 700 }}>Award: </strong>{aw}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, vis] = useInView(0.05);
  return (
    <section id="experience" ref={ref} className="section">
      <div className="wrap-sm">
        <SectionHead
          eyebrow="Work History"
          title={<>Professional <span className="grad">Experience</span></>}
          sub="A track record of delivering enterprise software, earning recognition, and growing into technical leadership."
          vis={vis}
        />
        {EXPERIENCE.map((exp, i) => (
          <ExpCard key={exp.company} exp={exp} idx={i} vis={vis} />
        ))}
      </div>
    </section>
  );
}
