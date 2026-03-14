const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dayanand-dongare-337a29252/" },
  { label: "GitHub",   href: "https://github.com/DayanandD" },
  { label: "Email",    href: "mailto:dayananddongare@hotmail.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "28px clamp(20px, 6vw, 80px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 14,
      }}
    >
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
        © {new Date().getFullYear()}{" "}
        <strong
          style={{
            color: "var(--text-primary)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
          }}
        >
          Dayanand Dongare
        </strong>{" "}
        — Full Stack Developer (.NET + React)
      </p>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-muted)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}