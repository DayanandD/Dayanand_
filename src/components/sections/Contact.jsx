import { useState } from "react";
import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";

const CONTACT_INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "dayananddongare@hotmail.com",
    href: "mailto:dayananddongare@hotmail.com",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+91 9270041056",
    href: "tel:+919270041056",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "Dayanand Dongare",
    href: "https://www.linkedin.com/in/dayanand-dongare-337a29252/",
  },
  {
    icon: "gh",
    label: "GitHub",
    value: "DayanandD",
    href: "https://github.com/DayanandD",
  },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [ref, visible] = useIntersect(0.05);
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.location.href = `mailto:dayananddongare@outlook.com?subject=${encodeURIComponent(form.subject || "Portfolio Inquiry")}&body=${body}`;
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text-primary)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-muted)",
    marginBottom: 6,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <FadeIn visible={visible}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>
            Let's build something
            <br />
            <span style={{ color: "var(--accent)" }}>together</span>
          </SectionTitle>
          <p
            style={{
              fontSize: 15,
              color: "var(--text-muted)",
              lineHeight: 1.85,
              marginBottom: 52,
              maxWidth: 560,
            }}
          >
            Available for full-time roles and freelance projects. Whether you need a
            full-stack application, a clean API, or a polished frontend — I'd love to
            hear about your project.
          </p>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          {/* Contact info */}
          <FadeIn delay={100} visible={visible}>
            <div>
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 22,
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: "var(--radius-md)",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border)",
                      background: "var(--card-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: c.icon.length > 1 ? 10 : 15,
                      fontWeight: 700,
                      color: "var(--accent)",
                      flexShrink: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--text-subtle)",
                        margin: 0,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {c.label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-primary)",
                        margin: "3px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Location note */}
              <div
                style={{
                  marginTop: 12,
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--section-alt)",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                📍 Based in <strong style={{ color: "var(--text-primary)" }}>Ahmedabad, India</strong>
                <br />
                Open to remote and relocation opportunities.
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={200} visible={visible}>
            <div>
              {/* Name + Email row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label style={labelStyle} htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.message}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (form.name && form.email && form.message) {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = form.name && form.email && form.message ? "1" : "0.5";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Send Message →
              </button>

              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-subtle)",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Opens your default email client
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}