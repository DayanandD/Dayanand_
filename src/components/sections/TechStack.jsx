import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import { BACKEND_SKILLS, FRONTEND_SKILLS, DB_TOOLS } from "../../data/skills.js";

const SKILL_INFO = {
  ".NET Core":           { cat: "Backend",           desc: "Cross-platform framework for APIs and enterprise apps. Powers PinChecks and Locker Management System.",         tags: ["C#", "REST", "MVC"] },
  "ASP.NET Web API":     { cat: "Backend",           desc: "HTTP service framework achieving 0.187ms average response times with Dapper and Global Error Handling.",        tags: ["REST", "HTTP", "Controllers"] },
  "Clean Architecture":  { cat: "Architecture",      desc: "Layered separation of Domain, Application, Infrastructure & Presentation — reduces maintenance effort by 30%.", tags: ["SOLID", "DDD", "Layers"] },
  "Entity Framework":    { cat: "ORM",               desc: "Microsoft's ORM for .NET with code-first modelling, LINQ queries and migration management.",                     tags: ["ORM", "LINQ", "Migrations"] },
  "Dapper":              { cat: "Micro-ORM",         desc: "Lightweight micro-ORM for raw SQL — key to achieving sub-millisecond API response times in production.",        tags: ["SQL", "Performance", "Speed"] },
  "JWT Authentication":  { cat: "Security",          desc: "Stateless token-based auth with RBAC. Achieved zero unauthorized access incidents in production.",              tags: ["RBAC", "Security", "Tokens"] },
  "SignalR":             { cat: "Real-time",         desc: "ASP.NET real-time bidirectional communication — used for live notifications and chat features.",                tags: ["WebSocket", "Real-time", "Hub"] },
  "Async Programming":   { cat: "Backend",           desc: "Non-blocking I/O with async/await for high concurrency and efficient resource utilisation.",                    tags: ["async", "await", "Tasks"] },
  "Hangfire":            { cat: "Background Jobs",   desc: "Persistent background job framework for automated subscription expiry alerts and scheduled tasks.",             tags: ["Jobs", "Scheduler", "Queue"] },
  "Redis":               { cat: "Caching",           desc: "In-memory data store for caching, session management and pub/sub messaging to boost response times.",           tags: ["Cache", "Pub/Sub", "In-memory"] },

  "React":               { cat: "UI Framework",      desc: "Component-based UI library for dynamic, high-performance interfaces. Used across all current projects.",        tags: ["JSX", "Hooks", "Components"] },
  "Redux Toolkit":       { cat: "State Management",  desc: "Official Redux toolset for predictable state. Used in PinChecks admin dashboard with complex data flows.",     tags: ["State", "Actions", "Slices"] },
  "Tailwind CSS":        { cat: "Styling",           desc: "Utility-first CSS framework for rapid, consistent design. Zero runtime CSS — ships minimal bundle.",           tags: ["Utility", "Responsive", "JIT"] },
  "MUI":                 { cat: "Component Library", desc: "Material UI used in PinChecks with theming, accessibility, data grids and chart components.",                  tags: ["Components", "Theme", "A11y"] },
  "JavaScript (ES6+)":   { cat: "Language",          desc: "Core scripting language. Proficient in async/await, destructuring, ES modules and modern patterns.",           tags: ["ES6", "Async", "Modules"] },
  "HTML5":               { cat: "Markup",            desc: "Semantic HTML for accessible, SEO-friendly structure used across all web projects.",                           tags: ["Semantic", "SEO", "A11y"] },
  "CSS3 / SCSS":         { cat: "Styling",           desc: "Advanced CSS with variables, animations, grid, flexbox and SCSS preprocessing for maintainable stylesheets.", tags: ["Flexbox", "Grid", "Animations"] },
  "Bootstrap":           { cat: "UI Framework",      desc: "Responsive CSS framework used in client websites and earlier projects for rapid, consistent layouts.",         tags: ["Responsive", "Grid", "Components"] },
  "Responsive Design":   { cat: "UX Pattern",        desc: "Mobile-first design ensuring pixel-perfect experiences across all screen sizes and devices.",                  tags: ["Mobile-first", "Fluid", "A11y"] },

  "Postgress":           { cat: "Database",          desc: "Advanced open-source relational DB used in PinChecks with UUID schemas — improved data retrieval by 35%.",     tags: ["SQL", "ACID", "UUID"] },
  "MySQL":               { cat: "Database",          desc: "Popular relational database used in web projects for reliable, structured data storage.",                      tags: ["SQL", "RDBMS", "Queries"] },
  "Git":                 { cat: "Version Control",   desc: "Distributed VCS. Proficient in branching strategies, PRs, and both Bitbucket and GitHub workflows.",           tags: ["Branching", "PRs", "Bitbucket"] },
  "Postman":             { cat: "API Testing",       desc: "HTTP client for API development and testing. Used to validate all REST endpoints during development.",         tags: ["REST", "Testing", "Collections"] },
  "Figma":               { cat: "Design",            desc: "Collaborative UI/UX design tool for wireframing and prototyping. Used to review and create design mock-ups.", tags: ["Wireframes", "Prototyping", "Design"] },
  "Supabase":            { cat: "BaaS",              desc: "Open-source Firebase alternative with PostgreSQL — used for rapid prototyping with auth, realtime and storage.", tags: ["BaaS", "Auth", "Realtime"] },
  "IIS Server":          { cat: "Deployment",        desc: "Microsoft web server hosting .NET apps in production. Delivered 99.9% uptime across all deployments.",        tags: ["Hosting", "Windows", "Production"] },
};

const COLUMNS = [
  { label: "Backend",          color: "#6366f1", items: BACKEND_SKILLS  },
  { label: "Frontend",         color: "#0ea5e9", items: FRONTEND_SKILLS },
  { label: "Database & Tools", color: "#10b981", items: DB_TOOLS        },
];

// Tooltip rendered into document.body via portal — escapes all stacking contexts
function TooltipPortal({ skill, color, anchorRef, visible }) {
  const [pos, setPos] = useState({ top: 0, left: 0, side: "right" });
  const info = SKILL_INFO[skill.name] || { cat: "Tool", desc: "Part of the core tech stack.", tags: [] };

  useEffect(() => {
    if (!visible || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const tooltipW = 240;
    const spaceRight = window.innerWidth - rect.right;
    const side = spaceRight >= tooltipW + 20 ? "right" : "left";
    setPos({
      top: scrollY + rect.top + rect.height / 2,
      left: side === "right"
        ? scrollX + rect.right + 14
        : scrollX + rect.left - tooltipW - 14,
      side,
    });
  }, [visible, anchorRef]);

  if (!visible) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        transform: "translateY(-50%)",
        width: 240,
        background: "var(--card-bg, #111118)",
        border: `1px solid ${color}35`,
        borderRadius: 14,
        padding: "15px 17px",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        scale: visible ? "1" : "0.94",
        transition: "opacity .18s ease, scale .18s ease",
        boxShadow: `0 16px 48px -8px ${color}22, 0 4px 16px rgba(0,0,0,0.15)`,
      }}
    >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          [pos.side === "right" ? "left" : "right"]: -7,
          transform: "translateY(-50%) rotate(45deg)",
          width: 12,
          height: 12,
          background: "var(--card-bg, #111118)",
          border: `1px solid ${color}35`,
          borderRight: pos.side === "right" ? "none" : `1px solid ${color}35`,
          borderTop: pos.side === "right" ? "none" : `1px solid ${color}35`,
          borderLeft: pos.side === "right" ? `1px solid ${color}35` : "none",
          borderBottom: pos.side === "right" ? `1px solid ${color}35` : "none",
        }}
      />

      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary, #f0f0f5)", margin: "0 0 3px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
        {skill.name}
      </p>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color, margin: "0 0 9px" }}>
        {info.cat}
      </p>
      <p style={{ fontSize: 11.5, color: "var(--text-muted, #8b8ba0)", lineHeight: 1.65, margin: "0 0 11px" }}>
        {info.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {info.tags.map(t => (
          <span
            key={t}
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 99,
              background: color + "12",
              border: `1px solid ${color}25`,
              color: color,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>,
    document.body
  );
}

function Chip({ skill, color, colIdx, itemIdx, visible }) {
  const [hovered, setHovered] = useState(false);
  const chipRef = useRef(null);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={chipRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "9px 13px",
          borderRadius: 10,
          border: `1px solid ${hovered ? color + "45" : "var(--border)"}`,
          background: hovered ? color + "0a" : "var(--card-bg)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "default",
          userSelect: "none",
          transform: visible
            ? hovered ? "translateX(5px)" : "translateX(0)"
            : "translateX(-16px)",
          opacity: visible ? 1 : 0,
          transition: [
            `opacity 0.4s ease ${colIdx * 80 + itemIdx * 48}ms`,
            `transform ${hovered ? "0.22s" : `0.4s ease ${colIdx * 80 + itemIdx * 48}ms`}`,
            "border-color .2s",
            "background .2s",
          ].join(", "),
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
            transform: hovered ? "scale(1.8)" : "scale(1)",
            transition: "transform .28s cubic-bezier(.34,1.56,.64,1)",
          }}
        />
        {skill.name}
      </div>

      <TooltipPortal
        skill={skill}
        color={color}
        anchorRef={chipRef}
        visible={hovered}
      />
    </div>
  );
}

export default function TechStack() {
  const [ref, visible] = useIntersect(0.1);

  return (
    <section
      id="stack"
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
          <SectionLabel>Technology Stack</SectionLabel>
          <SectionTitle>Full Stack Toolkit</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {COLUMNS.map((col, colIdx) => (
            <div key={col.label}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: col.color,
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--border)",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.4s ease ${colIdx * 80}ms`,
                }}
              >
                {col.label}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {col.items.map((skill, itemIdx) => (
                  <Chip
                    key={skill.name}
                    skill={skill}
                    color={col.color}
                    colIdx={colIdx}
                    itemIdx={itemIdx}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
