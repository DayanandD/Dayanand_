import { useState } from "react";
import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead, Tag } from "../ui/index.jsx";
import { PROJECTS } from "../../data/index.js";

/* Mock browser window — simulates the project screenshot panel from ref image 3 */
function BrowserMock({ project }) {
  return (
    <div style={{
      background: "var(--bg3)",
      border: "1px solid var(--border2)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 24px 64px -16px rgba(0,0,0,0.5)",
      width: "100%",
    }}>
      {/* Browser chrome bar */}
      <div style={{
        padding: "10px 16px",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* Fake URL bar */}
        <div style={{
          flex: 1, height: 22, borderRadius: 5,
          background: "var(--bg)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", paddingLeft: 10,
        }}>
          <span style={{ fontSize: 9, color: "var(--text3)", fontFamily: "monospace" }}>
            {project.live || `ims-global.com/${project.title.toLowerCase().replace(/\s/g, "-")}`}
          </span>
        </div>
      </div>

      {/* Mock content */}
      <div style={{
        padding: "28px 24px",
        minHeight: 200,
        background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 60%)`,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* Fake nav */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 28,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 900, color: "var(--text2)", letterSpacing: "-0.02em",
            fontFamily: "monospace",
          }}>{project.title}</div>
          <div style={{
            padding: "5px 14px", borderRadius: 6,
            background: project.accent, fontSize: 10, fontWeight: 700, color: "#000",
          }}>Dashboard</div>
        </div>

        {/* Fake hero text */}
        <div style={{
          height: 12, width: "60%", borderRadius: 4,
          background: "var(--text)", opacity: 0.15, marginBottom: 10,
        }} />
        <div style={{
          height: 8, width: "80%", borderRadius: 4,
          background: project.accent, opacity: 0.25, marginBottom: 6,
        }} />
        <div style={{
          height: 8, width: "50%", borderRadius: 4,
          background: "var(--text2)", opacity: 0.1, marginBottom: 22,
        }} />

        {/* Fake stats row */}
        <div style={{ display: "flex", gap: 10 }}>
          {["Efficiency ↑40%","0.187ms API","99.9% Uptime"].map((t, i) => (
            <div key={t} style={{
              flex: 1, padding: "10px 8px", borderRadius: 8,
              background: i === 0 ? project.accent + "20" : "var(--bg)",
              border: `1px solid ${i === 0 ? project.accent + "40" : "var(--border)"}`,
              textAlign: "center",
            }}>
              <div style={{ height: 6, width: "60%", margin: "0 auto 6px", borderRadius: 3, background: project.accent, opacity: 0.5 }} />
              <div style={{ fontSize: 7, color: "var(--text3)", fontFamily: "monospace" }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Featured project — left text, right browser mock (like ref image 3) */
function FeaturedCard({ p, idx, vis }) {
  const [hov, setHov] = useState(false);
  const even = idx % 2 === 0;

  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity .6s ease ${idx * 120}ms, transform .6s ease ${idx * 120}ms`,
      marginBottom: 64,
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 48, alignItems: "center",
      }}>
        {/* Text side */}
        <div style={{ order: even ? 0 : 1 }}>
          {/* Number tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, fontFamily: "monospace",
              color: p.accent, letterSpacing: "0.1em",
            }}>0{idx + 1} —</span>
            {p.award && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 99,
                background: "rgba(255,181,71,0.1)", border: "1px solid rgba(255,181,71,0.25)",
                color: "#ffb547",
              }}>{p.award}</span>
            )}
          </div>

          <h3 style={{
            fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900,
            color: "var(--text)", margin: "0 0 6px", letterSpacing: "-0.03em",
          }}>{p.title}</h3>

          <p style={{ fontSize: 12, color: p.accent, fontWeight: 700, margin: "0 0 16px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {p.subtitle}
          </p>

          <p style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.82, margin: "0 0 22px" }}>
            {p.desc}
          </p>

          {/* Metrics */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {p.metrics.map(m => (
              <span key={m} style={{
                fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 99,
                background: p.accent + "12", border: `1px solid ${p.accent}30`,
                color: p.accent, letterSpacing: "0.03em",
              }}>{m}</span>
            ))}
          </div>

          {/* Tech tags with logos — like ref image 3 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            {p.stack.map(s => {
              const techData = [...(Object.values({}).flatMap ? [] : [])];
              const logo = getTechLogo(s);
              return (
                <div key={s} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 11px", borderRadius: 8,
                  border: "1px solid var(--border2)", background: "var(--card)",
                  fontSize: 11, fontWeight: 600, color: "var(--text2)",
                }}>
                  {logo && <img src={logo} alt={s} style={{ width: 14, height: 14, objectFit: "contain" }} onError={e => e.target.style.display = "none"} />}
                  {s}
                </div>
              );
            })}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 12 }}>
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer"
                className="btn btn-ghost"
                style={{ padding: "9px 20px", fontSize: 13 }}
              >GitHub ↗</a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer"
                className="btn btn-solid"
                style={{ padding: "9px 20px", fontSize: 13 }}
              >Live Demo ↗</a>
            )}
            {!p.github && !p.live && (
              <div style={{
                padding: "9px 20px", borderRadius: 10,
                border: "1px solid var(--border)", fontSize: 13,
                color: "var(--text3)", fontWeight: 600,
              }}>🔒 Enterprise — Private</div>
            )}
          </div>
        </div>

        {/* Browser mock side */}
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            order: even ? 1 : 0,
            transform: hov ? "translateY(-6px) rotate(0.5deg)" : "translateY(0) rotate(0deg)",
            transition: "transform .35s ease",
          }}
        >
          <BrowserMock project={p} />
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${p.accent}20, transparent)`,
        marginTop: 64,
      }} />
    </div>
  );
}

/* Regular project card */
function ProjectCard({ p, delay, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hov ? p.accent + "50" : "var(--border)"}`,
        borderRadius: 18, padding: "24px",
        display: "flex", flexDirection: "column", height: "100%",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(24px)",
        boxShadow: hov ? `0 20px 56px -16px ${p.accent}22` : "none",
        transition: [
          `opacity .5s ease ${delay}ms`,
          `transform ${hov ? ".28s ease" : `.5s ease ${delay}ms`}`,
          "border-color .22s", "box-shadow .28s",
        ].join(", "),
      }}
    >
      <div style={{
        height: 3, borderRadius: 99, marginBottom: 22,
        background: hov ? `linear-gradient(90deg, ${p.accent}, ${p.accent}50)` : `linear-gradient(90deg, ${p.accent}40, transparent)`,
        transition: "all .3s",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          background: p.accent + "15", border: `1px solid ${p.accent}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 900, color: p.accent,
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
        }}>{p.title.charAt(0)}</div>

        <div style={{ display: "flex", gap: 7 }}>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" style={{
              width: 30, height: 30, borderRadius: 8,
              border: "1px solid var(--border2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: "var(--text3)", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.color = p.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text3)"; }}
            >↗</a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" style={{
              width: 30, height: 30, borderRadius: 8,
              border: `1px solid ${p.accent}40`, background: p.accent + "12",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: p.accent, transition: "background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = p.accent + "25"}
            onMouseLeave={e => e.currentTarget.style.background = p.accent + "12"}
            >↗</a>
          )}
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", margin: "0 0 3px", letterSpacing: "-0.025em" }}>{p.title}</h3>
      <p style={{ fontSize: 9, color: p.accent, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.07em", textTransform: "uppercase" }}>{p.subtitle}</p>
      <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.75, margin: "0 0 14px", flex: 1 }}>{p.desc}</p>

      {p.award && (
        <div style={{
          padding: "7px 11px", borderRadius: 8, marginBottom: 12,
          background: "rgba(255,181,71,0.07)", border: "1px solid rgba(255,181,71,0.2)",
          fontSize: 11, color: "#ffb547", fontWeight: 600,
        }}>{p.award}</div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {p.metrics.map(m => (
          <span key={m} style={{
            fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
            background: p.accent + "0f", border: `1px solid ${p.accent}28`, color: p.accent,
          }}>{m}</span>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {p.stack.slice(0, 5).map(s => (
          <div key={s} style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 7,
            border: "1px solid var(--border2)", color: "var(--text3)", background: "var(--card2)",
          }}>
            {getTechLogo(s) && <img src={getTechLogo(s)} alt={s} style={{ width: 12, height: 12, objectFit: "contain" }} onError={e => e.target.style.display = "none"} />}
            {s}
          </div>
        ))}
        {p.stack.length > 5 && <span style={{ fontSize: 10, color: "var(--text3)", padding: "2px 6px" }}>+{p.stack.length - 5}</span>}
      </div>

      <p style={{ fontSize: 9, color: "var(--text3)", margin: "12px 0 0", fontFamily: "monospace" }}>{p.period}</p>
    </div>
  );
}

/* Logo map helper */
function getTechLogo(name) {
  const map = {
    "React":        "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    "JavaScript":   "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "TypeScript":   "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "PostgreSQL":   "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    "MongoDB":      "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    "Redux":        "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    "Git":          "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    "Vite":         "https://vitejs.dev/logo.svg",
    "Figma":        "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
    "Firebase":     "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  };
  return map[name] || null;
}

export default function Projects() {
  const [ref, vis] = useInView(0.04);
  const featured = PROJECTS.filter(p => p.featured);
  const rest     = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="My Work"
          title={<>Featured <span className="grad">Projects</span></>}
          sub="Enterprise applications, internal tools, and personal projects I've designed and shipped."
          vis={vis}
        />

        {/* Featured — alternating layout like ref image 3 */}
        {featured.map((p, i) => (
          <FeaturedCard key={p.id} p={p} idx={i} vis={vis} />
        ))}

        {/* Rest — grid cards */}
        <Fade vis={vis} delay={300}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              More Projects
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,300px),1fr))", gap: 16 }}>
          {rest.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={350 + i * 70} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}
