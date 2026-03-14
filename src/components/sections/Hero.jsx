
import { useTypewriter } from "../../hooks/useTypewriter.js";

const ROLES = [
  "Full Stack Developer",
  ".NET 8 + React Engineer",
  "Clean Architecture Advocate",
  "Software Developer",
];

const STATS = [
  { n: "4+",  label: "Years Experience"   },
   { n: "15+", label: "Projects Delivered" },
  { n: "0.187ms", label: "Avg API Response" },
  { n: "40%", label: "Backend Efficiency Gain" },
];

export default function Hero({ dark }) {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(20px, 6vw, 80px) 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-left orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>

        {/* Availability badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border)",
            background: "var(--card-bg)",
            marginBottom: 36,
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Available for new opportunities
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(44px, 7.5vw, 84px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            color: "var(--text-primary)",
            lineHeight: 1.02,
            margin: "0 0 20px",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Dayanand
          <br />
          <span style={{ color: "var(--accent)" }}>Dongare</span>
        </h1>

        {/* Typewriter role */}
        <div
          style={{
            fontSize: "clamp(18px, 2.8vw, 28px)",
            fontWeight: 500,
            color: "var(--text-muted)",
            marginBottom: 22,
            fontFamily: "'Syne', sans-serif",
            minHeight: 38,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {typed}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.1em",
              background: "var(--accent)",
              marginLeft: 3,
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(14px, 1.8vw, 16px)",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 600,
            margin: "0 0 44px",
          }}
        >
          4+ years designing scalable and reliable web applications using{" "}
          <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            C#, ASP.NET &amp; .NET 8
          </strong>{" "}
          with Clean Architecture on the backend and{" "}
          <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            React JS
          </strong>{" "}
          on the frontend. Turning wireframes into high-performance, production-grade solutions.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-md)",
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Projects →
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "border-color 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get in Touch
          </a>

          <a
            href="https://www.linkedin.com/in/dayanand-dongare-337a29252/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 24px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              color: "var(--text-muted)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0a66c2";
              e.currentTarget.style.color = "#0a66c2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 60,
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: 0,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {s.n}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  margin: "3px 0 0",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}