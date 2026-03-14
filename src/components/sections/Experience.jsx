import { useState } from "react";
import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import Tag from "../ui/Tag.jsx";
import { EXPERIENCE, FREELANCE } from "../../data/experience.js";

const TYPE_COLORS = {
  "Full-time":  { bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.3)",  text: "#6366f1" },
  "Internship": { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  text: "#10b981" },
  "Contract":   { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  text: "#f59e0b" },
};

function MetricPill({ value, label, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "8px 14px",
        borderRadius: 10,
        border: `1px solid ${hov ? accent + "50" : "var(--border)"}`,
        background: hov ? accent + "0c" : "var(--card-bg)",
        textAlign: "center",
        cursor: "default",
        transition: "border-color .2s, background .2s, transform .2s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        minWidth: 72,
      }}
    >
      <p style={{
        fontSize: 17,
        fontWeight: 800,
        color: hov ? accent : "var(--text-primary)",
        margin: 0,
        letterSpacing: "-0.03em",
        fontFamily: "'Syne', sans-serif",
        lineHeight: 1,
        transition: "color .2s",
      }}>{value}</p>
      <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "4px 0 0", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

function PointItem({ point, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <li
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 13.5,
        color: hov ? "var(--text-primary)" : "var(--text-muted)",
        lineHeight: 1.72,
        marginBottom: 6,
        display: "flex",
        gap: 11,
        alignItems: "flex-start",
        padding: "5px 8px",
        borderRadius: 8,
        background: hov ? accent + "06" : "transparent",
        transition: "color .2s, background .2s",
        cursor: "default",
      }}
    >
      <span style={{
        color: hov ? accent : "var(--text-subtle, var(--text-muted))",
        marginTop: 4,
        flexShrink: 0,
        fontSize: 8,
        transition: "color .2s, transform .2s",
        transform: hov ? "translateX(2px)" : "translateX(0)",
        display: "inline-block",
      }}>▶</span>
      {point}
    </li>
  );
}

function ExperienceCard({ exp, idx, visible }) {
  const [expanded, setExpanded] = useState(idx === 0);
  const [cardHov, setCardHov] = useState(false);
  const typeColor = TYPE_COLORS[exp.type] || TYPE_COLORS["Full-time"];
  const accent = exp.current ? "#6366f1" : idx === 1 ? "#0ea5e9" : "#10b981";

  return (
    <FadeIn delay={idx * 100} visible={visible}>
      <div
        onMouseEnter={() => setCardHov(true)}
        onMouseLeave={() => setCardHov(false)}
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
        }}
      >
        {/* Left timeline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 36, flexShrink: 0, paddingTop: 20 }}>
          {/* Dot */}
          <div style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: exp.current ? accent : "var(--border-strong, var(--border))",
            boxShadow: exp.current ? `0 0 0 4px ${accent}20` : "none",
            border: exp.current ? `2px solid ${accent}` : "2px solid var(--border)",
            transition: "box-shadow .3s",
            flexShrink: 0,
            zIndex: 1,
          }} />
          {/* Line */}
          <div style={{
            width: 1,
            flex: 1,
            marginTop: 6,
            background: `linear-gradient(to bottom, ${accent}40, transparent)`,
            minHeight: 40,
          }} />
        </div>

        {/* Card */}
        <div
          style={{
            flex: 1,
            marginLeft: 12,
            background: "var(--card-bg)",
            border: `1px solid ${cardHov ? accent + "35" : "var(--border)"}`,
            borderRadius: 16,
            overflow: "hidden",
            transition: "border-color .25s, box-shadow .25s",
            boxShadow: cardHov ? `0 8px 32px -8px ${accent}18` : "none",
          }}
        >
          {/* Card top bar */}
          <div style={{
            height: 3,
            background: exp.current
              ? `linear-gradient(90deg, ${accent}, ${accent}60)`
              : `linear-gradient(90deg, ${accent}40, transparent)`,
            transition: "opacity .3s",
            opacity: cardHov || exp.current ? 1 : 0.4,
          }} />

          {/* Header — clickable to expand */}
          <div
            onClick={() => setExpanded(v => !v)}
            style={{
              padding: "18px 22px 16px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              {/* Left: company + role */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                  <h3 style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    fontFamily: "'Syne', sans-serif",
                  }}>
                    {exp.company}
                  </h3>

                  {/* Type badge */}
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: typeColor.bg,
                    border: `1px solid ${typeColor.border}`,
                    color: typeColor.text,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {exp.type}
                  </span>

                  {exp.current && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 99,
                      background: `${accent}15`,
                      border: `1px solid ${accent}40`,
                      color: accent,
                      letterSpacing: "0.06em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: accent,
                        display: "inline-block",
                        animation: "pulse 2s ease-in-out infinite",
                      }} />
                      Current
                    </span>
                  )}

                  {exp.promotion && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 9px",
                      borderRadius: 99,
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
                      letterSpacing: "0.05em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}>
                      ↑ Promoted: {exp.promotion.from} → {exp.promotion.to} ({exp.promotion.when})
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 13, color: accent, fontWeight: 600, margin: 0, letterSpacing: "0.01em" }}>
                  {exp.role}
                </p>
              </div>

              {/* Right: period + location + chevron */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", margin: 0 }}>{exp.period}</p>
                  <p style={{ fontSize: 11, color: "var(--text-subtle, var(--text-muted))", margin: "2px 0 0", opacity: 0.7 }}>{exp.location}</p>
                </div>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "var(--text-muted)",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
                  flexShrink: 0,
                }}>
                  ▼
                </div>
              </div>
            </div>

            {/* Stack tags — always visible */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
              {exp.stack.map(s => (
                <span key={s} style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: accent + "0e",
                  border: `1px solid ${accent}22`,
                  color: accent,
                  letterSpacing: "0.03em",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable body */}
          <div style={{
            maxHeight: expanded ? 900 : 0,
            overflow: "hidden",
            transition: "max-height .45s cubic-bezier(.4,0,.2,1)",
          }}>
            <div style={{ padding: "0 22px 20px", borderTop: "1px solid var(--border)" }}>

              {/* Metrics row */}
              {exp.metrics && (
                <div style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  padding: "16px 0 18px",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: 16,
                }}>
                  {exp.metrics.map(m => (
                    <MetricPill key={m.label} value={m.value} label={m.label} accent={accent} />
                  ))}
                </div>
              )}

              {/* Bullet points */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 4px" }}>
                {exp.points.map((point, i) => (
                  <PointItem key={i} point={point} accent={accent} />
                ))}
              </ul>

              {/* Awards array */}
              {exp.awards && exp.awards.length > 0 && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.awards.map((award, i) => (
                    <div key={i} style={{
                      padding: "11px 15px",
                      borderRadius: 10,
                      background: "rgba(245,158,11,0.07)",
                      border: "1px solid rgba(245,158,11,0.22)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}>
                      <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1.4 }}>🏆</span>
                      <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.65 }}>
                        <strong style={{ color: "#f59e0b", fontWeight: 700 }}>Award: </strong>
                        {award}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {/* Legacy single award fallback */}
              {exp.award && !exp.awards && (
                <div style={{
                  marginTop: 14, padding: "11px 15px", borderRadius: 10,
                  background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)",
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}>
                  <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1.4 }}>🏆</span>
                  <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.65 }}>
                    <strong style={{ color: "#f59e0b", fontWeight: 700 }}>Award: </strong>
                    {exp.award}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Experience() {
  const [ref, visible] = useIntersect(0.05);
  const [showFreelance, setShowFreelance] = useState(false);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "var(--section-py) var(--section-px)",
        background: "var(--section-alt)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <FadeIn visible={visible}>
          <SectionLabel>Work History</SectionLabel>
          <SectionTitle>Professional Experience</SectionTitle>
        </FadeIn>

        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} idx={i} visible={visible} />
        ))}

        {/* Freelance toggle */}
        <FadeIn delay={380} visible={visible}>
          <button
            onClick={() => setShowFreelance(v => !v)}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-muted)",
              fontFamily: "inherit",
              transition: "border-color .2s, color .2s, background .2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.background = "var(--accent-subtle)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "none";
            }}
          >
            <span style={{
              display: "inline-block",
              transform: showFreelance ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
            }}>▾</span>
            Freelance Projects ({FREELANCE.length})
          </button>

          <div style={{
            maxHeight: showFreelance ? 600 : 0,
            overflow: "hidden",
            transition: "max-height .45s cubic-bezier(.4,0,.2,1)",
          }}>
            <div style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 14,
              paddingBottom: 4,
            }}>
              {FREELANCE.map((f, i) => (
                <FreelanceCard key={f.company} f={f} delay={i * 60} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FreelanceCard({ f, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "18px 20px",
        borderRadius: 14,
        border: `1px solid ${hov ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
        background: hov ? "rgba(99,102,241,0.04)" : "var(--card-bg)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color .22s, background .22s, transform .22s, box-shadow .22s",
        boxShadow: hov ? "0 6px 24px -8px rgba(99,102,241,0.15)" : "none",
      }}
    >
      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px", fontFamily: "'Syne', sans-serif" }}>
        {f.company}
      </p>
      <p style={{ fontSize: 12, color: "#6366f1", fontWeight: 600, margin: "0 0 2px" }}>{f.role}</p>
      <p style={{ fontSize: 11, color: "var(--text-subtle, var(--text-muted))", margin: "0 0 10px", opacity: 0.7 }}>{f.period}</p>
      <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "0 0 12px", lineHeight: 1.6 }}>{f.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {f.stack.map(s => <Tag key={s}>{s}</Tag>)}
      </div>
    </div>
  );
}
