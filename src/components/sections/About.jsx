import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead } from "../ui/index.jsx";

const CARDS = [
  { icon: "⬡", c: "#7c6fff", t: "Backend",    s: ".NET 8 · Clean Architecture · REST APIs" },
  { icon: "◈", c: "#00c8ff", t: "Frontend",   s: "React · Redux Toolkit · Material UI"     },
  { icon: "◉", c: "#00e5a0", t: "Database",   s: "PostgreSQL · SQL Server · Dapper"        },
  { icon: "◎", c: "#ffb547", t: "DevOps",     s: "IIS · Git · Zoho Sprints · Postman"     },
];

const BADGES = ["Clean Architecture", "SOLID Principles", "TDD", "Agile", "JWT + RBAC", "IIS Deployment", "Mentoring", "Code Reviews"];

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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 64, alignItems: "center" }}>

          {/* Text */}
          <Fade vis={vis} delay={80}>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 18 }}>
              I'm a <strong style={{ color: "var(--text)" }}>Software Engineer</strong> with 4+ years building scalable enterprise applications. Currently at <strong style={{ color: "var(--accent)" }}>IMS Global, Ahmedabad</strong>, leading full-stack development and mentoring a team of 3 interns.
            </p>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 18 }}>
              My stack is <strong style={{ color: "var(--text)" }}>.NET 8 with Clean Architecture</strong> on the backend and <strong style={{ color: "var(--text)" }}>React + Redux</strong> on the frontend. I consistently deliver systems with sub-millisecond API responses and 99.9% production uptime.
            </p>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9, marginBottom: 32 }}>
              Promoted from <em>Jr. Software Engineer</em> to <em>Software Engineer</em> in 2025. Twice awarded <span style={{ color: "var(--accent)", fontWeight: 700 }}>Employee of the Month</span> for delivering critical production systems ahead of schedule.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  fontSize: 11, fontWeight: 600, padding: "4px 12px",
                  borderRadius: 99, border: "1px solid var(--border2)",
                  background: "var(--card)", color: "var(--text2)",
                }}>{b}</span>
              ))}
            </div>
          </Fade>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {CARDS.map((c, i) => (
              <Fade key={c.t} vis={vis} delay={200 + i * 90}>
                <AboutCard c={c} />
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCard({ c }) {
  return (
    <div className="card" style={{ padding: "22px 18px" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = c.c + "40"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ fontSize: 26, marginBottom: 12, color: c.c }}>{c.icon}</div>
      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{c.t}</p>
      <p style={{ fontSize: 11.5, color: "var(--text3)", margin: 0, lineHeight: 1.6 }}>{c.s}</p>
    </div>
  );
}
