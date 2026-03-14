import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import { GITHUB_REPOS } from "../../data/skills.js";

function RepoCard({ repo, delay, visible }) {
  return (
    <FadeIn delay={delay} visible={visible}>
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          textDecoration: "none",
          padding: "20px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          transition: "border-color 0.2s, transform 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Repo icon + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 16, color: "var(--text-muted)" }}>⌥</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--accent)",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {repo.name}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 12.5,
            color: "var(--text-muted)",
            lineHeight: 1.65,
            margin: "0 0 16px",
            flex: 1,
          }}
        >
          {repo.desc}
        </p>

        {/* Footer: language + live link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: repo.langColor,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>
              {repo.lang}
            </span>
          </div>

          {repo.live && (
            <span
              style={{
                fontSize: 11,
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Live ↗
            </span>
          )}
        </div>
      </a>
    </FadeIn>
  );
}

export default function GitHub() {
  const [ref, visible] = useIntersect(0.1);

  return (
    <section
      id="github"
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
          <SectionLabel>Open Source</SectionLabel>
          <SectionTitle>GitHub Projects</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {GITHUB_REPOS.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} delay={i * 80} visible={visible} />
          ))}
        </div>

        <FadeIn delay={400} visible={visible}>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://github.com/DayanandD"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                background: "var(--card-bg)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              View all repositories on GitHub →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
