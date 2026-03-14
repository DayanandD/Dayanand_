import { useState, useEffect } from "react";

// Layout
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

// Sections
import Hero       from "./components/sections/Hero.jsx";
import About      from "./components/sections/About.jsx";
import TechStack  from "./components/sections/TechStack.jsx";
import Projects   from "./components/sections/Projects.jsx";
import Experience from "./components/sections/Experience.jsx";
import Skills     from "./components/sections/Skills.jsx";
import GitHub     from "./components/sections/GitHub.jsx";
import Contact    from "./components/sections/Contact.jsx";

export default function App() {
  // Respect system preference on first load
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [dark, setDark] = useState(prefersDark);

  // Apply theme to <html> data attribute
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const toggleTheme = () => setDark((v) => !v);

  return (
    <>
      <Navbar dark={dark} onToggleTheme={toggleTheme} />

      <main>
        <Hero       dark={dark} />
        <About      />
        <TechStack  />
        <Projects   />
        <Experience />
        <Skills     />
        <GitHub     />
        <Contact    />
      </main>

      <Footer />

      {/* Back to top button */}
      <BackToTop />
    </>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 40,
        height: 40,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        background: "var(--card-bg)",
        color: "var(--text-muted)",
        fontSize: 16,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        backdropFilter: "blur(8px)",
        transition: "border-color 0.2s, color 0.2s, transform 0.2s",
        animation: "fadeInUp 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      ↑
    </button>
  );
}
