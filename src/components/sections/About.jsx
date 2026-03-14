import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import Tag from "../ui/Tag.jsx";

const CAPABILITY_CARDS = [
  { icon: "⬡", label: "Backend",   desc: ".NET Core & Clean Architecture" },
  { icon: "◈", label: "Frontend",  desc: "React & Modern CSS"             },
  { icon: "◉", label: "Database",  desc: "SQL Server & EF Core"           },
  { icon: "◎", label: "Real-time", desc: "SignalR & WebSockets"           },
];

const TRAITS = [
  "Clean Architecture",
  "SOLID Principles",
  "Agile / Zoho Sprints",
  "TDD",
  "REST API Design",
  "JWT + RBAC",
  "IIS Deployment",
  "Mentoring",
];

export default function About() {
  const [ref, visible] = useIntersect(0.1);

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <FadeIn visible={visible}>
          <SectionLabel>About Me</SectionLabel>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Text column */}
          <FadeIn delay={80} visible={visible}>
            <SectionTitle>
              Building software that
              <br />
              <span style={{ color: "var(--accent)" }}>actually scales</span>
            </SectionTitle>

            <p
              style={{
                fontSize: 15,
                color: "var(--text-muted)",
                lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              I'm a Full Stack Developer with 4+ years of experience designing scalable and
              reliable web applications using{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                C#, ASP.NET, and .NET 8
              </strong>{" "}
              on the backend, with{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                React JS
              </strong>{" "}
              on the frontend. Capable of turning wireframes and design mock-ups into
              responsive, high-quality, production-grade solutions.
            </p>

            <p
              style={{
                fontSize: 15,
                color: "var(--text-muted)",
                lineHeight: 1.85,
                marginBottom: 32,
              }}
            >
              Currently leading full-stack development at IMS Global — mentoring interns,
              architecting Clean Architecture backends, and delivering enterprise projects
              ahead of schedule with 99.9% uptime. Committed to contributing full-stack
              expertise to teams and driving exceptional results.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TRAITS.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </FadeIn>

          {/* Cards column */}
          <FadeIn delay={200} visible={visible}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {CAPABILITY_CARDS.map((c, i) => (
                <div
                  key={c.label}
                  style={{
                    padding: "20px 18px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    background: "var(--card-bg)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${280 + i * 80}ms, transform 0.5s ease ${280 + i * 80}ms`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      marginBottom: 10,
                      color: "var(--accent)",
                    }}
                  >
                    {c.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: "0 0 5px",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}