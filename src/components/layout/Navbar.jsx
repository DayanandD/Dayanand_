import { useState } from "react";
import { NAV_LINKS } from "../../data/nav.js";
import { useActiveSection } from "../../hooks/useActiveSection.js";

export default function Navbar({ dark, onToggleTheme }) {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          padding: "0 clamp(20px, 6vw, 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "'Syne', sans-serif",
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
            padding: 0,
          }}
        >
          DD<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: active === n.id ? 700 : 500,
                color: active === n.id ? "var(--accent)" : "var(--text-muted)",
                padding: "6px 11px",
                borderRadius: "var(--radius-sm)",
                transition: "color 0.2s, background 0.2s",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (active !== n.id) e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                if (active !== n.id) e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {n.label}
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              marginLeft: 8,
              width: 34,
              height: 34,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              color: "var(--text-muted)",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            {dark ? "☀" : "◑"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-mobile-toggle"
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            width: 36,
            height: 36,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-primary)",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "var(--card-bg)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 24px 20px",
            animation: "fadeInUp 0.2s ease",
          }}
        >
          {NAV_LINKS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: active === n.id ? 700 : 500,
                color: active === n.id ? "var(--accent)" : "var(--text-muted)",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                fontFamily: "inherit",
              }}
            >
              {n.label}
            </button>
          ))}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {dark ? "Dark mode" : "Light mode"}
            </span>
            <button
              onClick={onToggleTheme}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--tag-bg)",
                cursor: "pointer",
                fontSize: 13,
                color: "var(--text-muted)",
                fontFamily: "inherit",
              }}
            >
              {dark ? "☀ Light" : "◑ Dark"}
            </button>
          </div>
        </div>
      )}

      {/* Responsive styles injected inline for nav */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
