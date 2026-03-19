import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead } from "../ui/index.jsx";
import { SKILL_CATS } from "../../data/index.js";

/* ── Per-tech info for tooltip ── */
const TECH_DESC = {
  ".NET 8 / Core":      { desc: "Cross-platform framework powering PinChecks with Clean Architecture. Achieved 0.187ms API response.", use: "PinChecks · Locker · EventTracking" },
  "ASP.NET Web API":    { desc: "HTTP service framework for high-performance REST APIs with Global Error Handling and Serilog.", use: "All IMS Global projects" },
  "C#":                 { desc: "Primary language — OOP, LINQ, async/await, generics, records, and pattern matching.", use: "All backend projects" },
  "Clean Architecture": { desc: "Domain → Application → Infrastructure → Presentation. Reduces maintenance effort by 30%.", use: "PinChecks · Locker · FuelDelivery" },
  "Dapper":             { desc: "Lightweight micro-ORM for raw SQL — key to sub-millisecond API performance in production.", use: "PinChecks · Locker Management" },
  "Entity Framework":   { desc: "Code-first ORM with migrations and LINQ queries for complex relational data.", use: "Internal projects" },
  "JWT + RBAC":         { desc: "Stateless token auth + role-based access control. Zero unauthorized incidents in production.", use: "PinChecks · FuelDelivery · QAsist" },
  "SignalR":            { desc: "Real-time bidirectional communication for live notifications and event tracking.", use: "EventTracking Platform" },
  "Hangfire":           { desc: "Persistent background job framework for subscription expiry alerts and automated tasks.", use: "PinChecks" },
  "AutoMapper":         { desc: "Object-to-object mapping reducing DTO boilerplate between Clean Architecture layers.", use: "All .NET projects" },
  "Serilog":            { desc: "Structured logging with sink config — cuts debugging time by 25%.", use: "All .NET projects" },
  "React":              { desc: "Component-based UI library powering all current production interfaces at IMS Global.", use: "PinChecks · EventTracking · QAsist" },
  "Redux Toolkit":      { desc: "Predictable state management for complex admin dashboards with async data flows.", use: "PinChecks" },
  "Vite":               { desc: "Lightning-fast build tool with HMR under 50ms. Used across all React projects.", use: "All React projects" },
  "JavaScript":         { desc: "ES6+ — async/await, modules, destructuring, optional chaining, closures.", use: "All frontend projects" },
  "TypeScript":         { desc: "Typed JavaScript improving DX and catching bugs at compile time.", use: "QAsist · Gemini Clone" },
  "HTML5":              { desc: "Semantic, accessible markup — proper heading hierarchy, ARIA, and SEO structure.", use: "All web projects" },
  "CSS3 / SCSS":        { desc: "Advanced CSS — Grid, Flexbox, custom properties, keyframes, SCSS mixins.", use: "All frontend projects" },
  "Tailwind CSS":       { desc: "Utility-first CSS with JIT compilation and consistent design tokens.", use: "FuelDelivery · QAsist" },
  "Material UI":        { desc: "Rich component library used in PinChecks for data grids, charts, and theming.", use: "PinChecks" },
  "Bootstrap":          { desc: "Responsive CSS framework for consistent layouts in client websites.", use: "Client sites · Locker" },
  "PostgreSQL":         { desc: "Advanced RDBMS with UUID schemas. Improved data retrieval speed by 35% in production.", use: "PinChecks · Locker · FuelDelivery" },
  "SQL Server":         { desc: "Enterprise RDBMS for complex T-SQL joins, stored procedures, and reporting.", use: "PinChecks · IMS Global" },
  "MySQL":              { desc: "Relational database used in web projects for reliable structured data storage.", use: "Client projects" },
  "Redis":              { desc: "In-memory store for caching, session management, and pub/sub messaging.", use: "FuelDelivery · QAsist" },
  "Supabase":           { desc: "Open-source Firebase alternative — used for rapid prototyping with auth and storage.", use: "Personal projects" },
  "Firebase":           { desc: "Google BaaS — used for auth and realtime features in quick prototypes.", use: "Personal projects" },
  "Git":                { desc: "Distributed VCS — branching strategies, PRs, Bitbucket and GitHub workflows daily.", use: "All projects" },
  "GitHub":             { desc: "Code hosting, PR reviews, issue tracking, and GitHub Actions CI/CD.", use: "Personal & open-source" },
  "Postman":            { desc: "HTTP client for API development and testing — validates all REST endpoints.", use: "All API projects" },
  "Figma":              { desc: "Collaborative UI/UX design for wireframing and prototyping client mock-ups.", use: "Client projects" },
  "VS Code":            { desc: "Primary editor with .NET, React, ESLint, Prettier, and database extensions.", use: "Daily driver" },
  "Visual Studio":      { desc: "Full IDE for enterprise .NET development, debugging, profiling and IIS integration.", use: ".NET projects" },
  "AWS Amplify":        { desc: "Cloud hosting and deployment for frontend apps with CI/CD from GitHub.", use: "Client deployments" },
  "Jira":               { desc: "Agile project tracking — sprint planning, backlog grooming, and bug tracking.", use: "IMS Global" },
  "IIS Server":         { desc: "Microsoft web server for .NET apps in production — 99.9% uptime across all deployments.", use: "PinChecks · Locker · EventTracking" },
};

/* ── Tech logo/letter renderer ── */
function TechIcon({ skill, size = 44, hov = false, blend = false }) {
  const [failed, setFailed] = useState(false);

  // Detect if this is a custom uploaded image (black bg) that needs blend mode
  const isCustomAsset = skill.logo && skill.logo.includes("/assets/");
  const needsBlend = false;

  if (skill.logo && !failed) {
    return (
      <img
        src={skill.logo}
        alt={skill.name}
        style={{
          width: size, height: size, objectFit: "contain",
          mixBlendMode: "normal",
          filter: needsBlend
            ? `drop-shadow(0 0 6px ${skill.color || "#7c6fff"}50)`
            : (hov ? "none" : "grayscale(15%)"),
          transform: hov ? "scale(1.12)" : "scale(1)",
          transition: "transform .3s cubic-bezier(.34,1.56,.64,1), filter .25s",
        }}
        onError={() => setFailed(true)}
      />
    );
  }

  /* Letter fallback — styled pill */
  const letter = skill.letter || skill.name.slice(0, 2).toUpperCase();
  const color  = skill.color || "#7c6fff";
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.22,
      background: color + "20",
      border: `1.5px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: letter.length > 2 ? size * 0.26 : size * 0.34,
      fontWeight: 900, color, fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: letter.length > 2 ? "-0.04em" : "0",
      transform: hov ? "scale(1.12)" : "scale(1)",
      transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
      userSelect: "none",
    }}>
      {letter}
    </div>
  );
}

/* ── Portal tooltip ── */
function TooltipPortal({ name, color, anchorRef, visible }) {
  const [pos, setPos] = useState({ top: 0, left: 0, side: "top" });
  const info = TECH_DESC[name] || { desc: "Part of the core technology stack.", use: "Multiple projects" };

  useEffect(() => {
    if (!visible || !anchorRef.current) return;
    const r    = anchorRef.current.getBoundingClientRect();
    const side = r.top > 200 ? "top" : "bottom";
    setPos({
      top:  side === "top" ? window.scrollY + r.top - 10 : window.scrollY + r.bottom + 10,
      left: window.scrollX + r.left + r.width / 2,
      side,
    });
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div style={{
      position: "absolute",
      top: pos.top, left: pos.left,
      transform: pos.side === "top" ? "translate(-50%,-100%)" : "translate(-50%,0%)",
      width: 248, zIndex: 9999, pointerEvents: "none",
    }}>
      {/* Arrow */}
      <div style={{
        position: "absolute",
        [pos.side === "top" ? "bottom" : "top"]: -5,
        left: "50%", marginLeft: -5,
        width: 10, height: 10,
        background: "#0a1120",
        border: `1px solid ${color}35`,
        transform: "rotate(45deg)",
        borderTop: pos.side === "top" ? "none" : undefined,
        borderLeft: pos.side === "top" ? "none" : undefined,
        borderBottom: pos.side === "bottom" ? "none" : undefined,
        borderRight: pos.side === "bottom" ? "none" : undefined,
      }} />
      <div style={{
        background: "#0a1120",
        border: `1px solid ${color}35`,
        borderRadius: 13, padding: "14px 16px",
        boxShadow: `0 20px 56px -8px rgba(0,0,0,0.6), 0 0 0 1px ${color}10`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
          <p style={{ fontSize: 13, fontWeight: 800, color: "#e8f0f8", margin: 0, letterSpacing: "-0.01em" }}>{name}</p>
        </div>
        <p style={{ fontSize: 11.5, color: "#8899aa", margin: "0 0 10px", lineHeight: 1.65 }}>{info.desc}</p>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 6,
          padding: "7px 10px", borderRadius: 7,
          background: color + "0a", border: `1px solid ${color}15`,
        }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: color, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 1, flexShrink: 0 }}>Used in</span>
          <span style={{ fontSize: 10.5, color: "#8899aa" }}>{info.use}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Tech grid card ── */
function TechCard({ skill, color, delay, vis }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 10, padding: "22px 12px",
        background: hov ? color + "09" : "var(--card)",
        border: `1px solid ${hov ? color + "55" : "var(--border)"}`,
        borderRadius: 14, cursor: "default", position: "relative",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(14px) scale(0.96)",
        boxShadow: hov ? `0 10px 36px -8px ${color}25, inset 0 1px 0 ${color}15` : "none",
        transition: [
          `opacity .4s ease ${delay}ms`,
          `transform .4s ease ${delay}ms`,
          "border-color .22s", "background .22s", "box-shadow .25s",
        ].join(", "),
      }}
    >
      <TechIcon skill={{ ...skill, color }} size={44} hov={hov} />

      <p style={{
        fontSize: 11.5, fontWeight: 700, textAlign: "center",
        color: hov ? "var(--text)" : "var(--text2)",
        margin: 0, lineHeight: 1.3,
        transition: "color .2s",
      }}>
        {skill.name}
      </p>

      {/* Bottom glow dot */}
      <div style={{
        position: "absolute", bottom: 8, left: "50%", marginLeft: -3,
        width: 6, height: 6, borderRadius: "50%",
        background: color, boxShadow: `0 0 8px ${color}`,
        opacity: hov ? 1 : 0,
        transform: hov ? "scale(1)" : "scale(0)",
        transition: "opacity .2s, transform .25s cubic-bezier(.34,1.56,.64,1)",
      }} />

      <TooltipPortal name={skill.name} color={color} anchorRef={ref} visible={hov} />
    </div>
  );
}

/* ── Category summary card ── */
function CatCard({ cat, delay, vis }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "28px 22px 24px",
        background: hov ? cat.color + "0c" : "var(--card)",
        border: `1px solid ${hov ? cat.color + "55" : "var(--border)"}`,
        borderRadius: 18, cursor: "default",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(22px)",
        boxShadow: hov ? `0 18px 52px -12px ${cat.color}22` : "none",
        transition: [
          `opacity .5s ease ${delay}ms`,
          `transform .5s ease ${delay}ms`,
          "border-color .25s", "background .25s", "box-shadow .3s",
        ].join(", "),
      }}
    >
      {/* Category icon */}
      <div style={{ marginBottom: 18 }}>
        {cat.img ? (
          <img
            src={cat.img}
            alt={cat.name}
            style={{
              width: 68, height: 68,
              objectFit: "contain",
              transform: hov ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
              transition: "transform .35s cubic-bezier(.34,1.56,.64,1)",
              filter: `drop-shadow(0 0 12px ${cat.color}60)`,
            }}
          />
        ) : (
          <div style={{
            width: 68, height: 68, borderRadius: 18,
            background: cat.color + "18", border: `1px solid ${cat.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28,
            transform: hov ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
            transition: "transform .35s cubic-bezier(.34,1.56,.64,1)",
          }}>{cat.icon}</div>
        )}
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", margin: "0 0 5px", letterSpacing: "-0.02em" }}>
        {cat.name}
      </h3>
      <p style={{ fontSize: 12, color: cat.color, margin: "0 0 18px", fontWeight: 600 }}>
        {cat.skills.length} technologies
      </p>

      {/* ALL logos in a grid — no truncation */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(32px, 1fr))",
        gap: 8,
      }}>
        {cat.skills.map(sk => (
          <div
            key={sk.name}
            title={sk.name}
            style={{
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 7,
              background: (sk.logo && (sk.logo.includes("assets") || sk.logo.endsWith(".png") || sk.logo.endsWith(".svg")))
                ? "transparent"
                : "var(--bg3)",
              border: (sk.logo && sk.logo.includes("assets"))
                ? "none"
                : "1px solid var(--border)",
            }}
          >
            <TechIcon
              skill={{ ...sk, color: sk.color || cat.color }}
              size={22}
              hov={false}
              blend={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, vis] = useInView(0.04);
  const allTech = SKILL_CATS.flatMap(cat =>
    cat.skills.map(sk => ({ ...sk, catColor: cat.color }))
  );

  return (
    <section id="skills" ref={ref} className="section section-dark">
      <div className="wrap">
        <SectionHead
          eyebrow="Tech Stack"
          title={<>Skills & <span className="grad">Technologies</span></>}
          sub="Technologies I use daily to architect and deliver enterprise-grade applications."
          vis={vis}
        />

        {/* ── Category cards — ALL logos shown ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 18, marginBottom: 56,
        }}>
          {SKILL_CATS.map((cat, i) => (
            <CatCard key={cat.name} cat={cat} delay={i * 80} vis={vis} />
          ))}
        </div>

        {/* ── Divider ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
          opacity: vis ? 1 : 0, transition: "opacity .5s ease 360ms",
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--text3)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ color: "var(--accent)", fontFamily: "monospace" }}>&lt;/&gt;</span>
            Technology Stack
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* ── Full icon grid — hover tooltip ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          gap: 10,
        }}>
          {allTech.map((tech, i) => (
            <TechCard
              key={`${tech.name}-${i}`}
              skill={tech}
              color={tech.catColor}
              delay={Math.floor(i / 6) * 55 + (i % 6) * 28}
              vis={vis}
            />
          ))}
        </div>

        <p style={{
          fontSize: 11, color: "var(--text3)", textAlign: "center",
          marginTop: 28, fontStyle: "italic",
          opacity: vis ? 1 : 0, transition: "opacity .5s ease 700ms",
        }}>
          Hover any technology for details and project usage
        </p>
      </div>
    </section>
  );
}
