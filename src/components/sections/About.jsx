import { useState } from "react";
import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead } from "../ui/index.jsx";
import { backendImg, databaseImg, responsiveImg, toolsImg } from "../../assets/index.js";

/* ── About capability cards ── */
const CARDS = [
  {
    img:   backendImg,
    color: "#7c6fff",
    title: "Backend",
    sub:   ".NET 8 · Clean Architecture · REST APIs",
    desc:  "Enterprise .NET 8 APIs with Clean Architecture, Dapper, and JWT security. 0.187ms average response in production.",
  },
  {
    img:   responsiveImg,
    color: "#00c8ff",
    title: "Frontend",
    sub:   "React · Redux Toolkit · Material UI",
    desc:  "High-performance UIs with React, Redux Toolkit, and Material UI. Mobile-first responsive design on every project.",
  },
  {
    img:   databaseImg,
    color: "#00e5a0",
    title: "Database",
    sub:   "PostgreSQL · SQL Server · Dapper",
    desc:  "Optimised PostgreSQL and SQL Server schemas with UUID identifiers — 35% faster data retrieval in production.",
  },
  {
    img:   toolsImg,
    color: "#ffb547",
    title: "Tools & DevOps",
    sub:   "IIS · Git · Zoho Sprints · Postman",
    desc:  "Full deployment lifecycle on IIS with Git workflows, Agile delivery via Zoho Sprints, and API testing in Postman.",
  },
];

const BADGES = [
  "Clean Architecture", "SOLID Principles", "TDD", "Agile",
  "JWT + RBAC", "IIS Deployment", "Mentoring", "Code Reviews",
];

function AboutCard({ c, delay, vis }) {
  const [hov, setHov] = useState(false);

  return (
    <Fade vis={vis} delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "22px 20px",
          background: hov ? c.color + "08" : "var(--card)",
          border: `1px solid ${hov ? c.color + "45" : "var(--border)"}`,
          borderRadius: 16,
          cursor: "default",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov ? `0 16px 48px -12px ${c.color}22` : "none",
          transition: "border-color .25s, background .25s, transform .28s, box-shadow .28s",
        }}
      >
        {/* Image — imported via Vite so path is always correct */}
        <div style={{ marginBottom: 14 }}>
          <img
            src={c.img}
            alt={c.title}
            style={{
              width: 56,
              height: 56,
              objectFit: "contain",
              transform: hov ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
              transition: "transform .35s cubic-bezier(.34,1.56,.64,1)",
              filter: `drop-shadow(0 0 10px ${c.color}50)`,
            }}
          />
        </div>

        <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          {c.title}
        </p>
        <p style={{ fontSize: 11, color: c.color, fontWeight: 700, margin: "0 0 10px", letterSpacing: "0.03em" }}>
          {c.sub}
        </p>
        <p style={{ fontSize: 12, color: "var(--text3)", margin: 0, lineHeight: 1.6 }}>
          {c.desc}
        </p>
      </div>
    </Fade>
  );
}

export default function About() {
  const [ref, vis] = useInView(0.1);

  return (
    <section id="about" ref={ref} className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="About Me"
          title={<>Engineering software that<br /><span className="grad">ships reliably</span></>}
          vis={vis}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
          gap: 64, alignItems: "center",
        }}>
          {/* Text column */}
          <Fade vis={vis} delay={80}>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 18 }}>
              I'm a <strong style={{ color: "var(--text)" }}>Software Engineer</strong> with 4+ years building scalable enterprise applications. Currently at{" "}
              <strong style={{ color: "var(--accent)" }}>IMS Global, Ahmedabad</strong>, leading full-stack development and mentoring a team of 3 interns.
            </p>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 18 }}>
              My stack is <strong style={{ color: "var(--text)" }}>.NET 8 with Clean Architecture</strong> on the backend and{" "}
              <strong style={{ color: "var(--text)" }}>React + Redux</strong> on the frontend. I consistently deliver systems with sub-millisecond API responses and 99.9% production uptime.
            </p>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 32 }}>
              Promoted from <em>Jr. Software Engineer</em> to <em>Software Engineer</em> in 2025. Twice awarded{" "}
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Employee of the Month</span> for delivering critical production systems ahead of schedule.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  fontSize: 11, fontWeight: 600, padding: "5px 13px",
                  borderRadius: 99, border: "1px solid var(--border2)",
                  background: "var(--card)", color: "var(--text2)",
                  letterSpacing: "0.02em",
                }}>{b}</span>
              ))}
            </div>
          </Fade>

          {/* Cards — 2×2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {CARDS.map((c, i) => (
              <AboutCard key={c.title} c={c} delay={200 + i * 90} vis={vis} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
