import { useState } from "react";
import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import Tag from "../ui/Tag.jsx";
import { PROJECTS } from "../../data/projects.js";

function ProjectCard({ project, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay} visible={visible}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "28px 28px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 24px 64px -16px ${project.accent}28`
            : "0 2px 12px 0 rgba(0,0,0,0.04)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          borderColor: hovered ? `${project.accent}40` : "var(--border)",
        }}
      >
        {/* Card header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${project.accent}14`,
              border: `1px solid ${project.accent}28`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
              color: project.accent,
              flexShrink: 0,
            }}
          >
            {project.title.charAt(0)}
          </div>

          {/* Action links */}
          <div style={{ display: "flex", gap: 8 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: 13,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = project.accent;
                  e.currentTarget.style.color = project.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                title="Live demo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: `1px solid ${project.accent}40`,
                  background: `${project.accent}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: project.accent,
                  fontSize: 13,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${project.accent}20`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = `${project.accent}12`)}
              >
                ↗
              </a>
            )}
          </div>
        </div>

        {/* Title & subtitle */}
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            margin: "0 0 4px",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: project.accent,
            fontWeight: 600,
            margin: "0 0 14px",
            letterSpacing: "0.02em",
          }}
        >
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 13.5,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            margin: "0 0 20px",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        <div style={{ marginBottom: 20 }}>
          {project.highlights.map((h) => (
            <div
              key={h}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 7,
                fontSize: 12.5,
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: project.accent,
                  flexShrink: 0,
                }}
              />
              {h}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((t) => (
            <Tag key={t} accent={project.accent}>
              {t}
            </Tag>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export default function Projects() {
  const [ref, visible] = useIntersect(0.05);

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div style={{ maxWidth: "var(--max-wide)", margin: "0 auto" }}>
        <FadeIn visible={visible}>
          <SectionLabel>Featured Work</SectionLabel>
          <SectionTitle>Projects I've Built</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
            gap: 22,
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 100}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
