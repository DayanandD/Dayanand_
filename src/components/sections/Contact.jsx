import { useState } from "react";
import { useInView } from "../../hooks/index.js";
import { Fade, SectionHead } from "../ui/index.jsx";
import { CONTACT } from "../../data/index.js";

const INFO = [
  { icon: "✉", label: "Email",    value: "dayananddongare@hotmail.com", href: `mailto:${CONTACT.email}` },
  { icon: "☎", label: "Phone",    value: "+91 9270041056",              href: `tel:${CONTACT.phone}` },
  { icon: "in", label: "LinkedIn", value: "dayanand-dongare",            href: CONTACT.linkedin },
  { icon: "gh", label: "GitHub",   value: "DayanandD",                   href: CONTACT.github },
  { icon: "📍", label: "Location", value: CONTACT.location,              href: null },
];

const inp = {
  width: "100%", padding: "11px 15px",
  borderRadius: 10, border: "1px solid var(--border2)",
  background: "var(--card)", color: "var(--text)",
  fontSize: 14, outline: "none", fontFamily: "inherit",
  transition: "border-color .2s", boxSizing: "border-box",
};

export default function Contact() {
  const [ref, vis] = useInView(0.05);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }));
  const valid = form.name && form.email && form.message;

  const send = () => {
    const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(form.subject || "Portfolio Inquiry")}&body=${b}`;
  };

  const focus = e => e.target.style.borderColor = "var(--accent)";
  const blur  = e => e.target.style.borderColor = "var(--border2)";

  return (
    <section id="contact" ref={ref} className="section section-dark">
      <div className="wrap">
        <SectionHead
          eyebrow="Get in Touch"
          title={<>Let's build something <span className="grad">together</span></>}
          sub="Open to full-time roles, freelance projects, and collaborations. Drop me a message and I'll get back within 24 hours."
          vis={vis}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 56, alignItems: "start" }}>

          {/* Contact info */}
          <Fade vis={vis} delay={80}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {INFO.map(c => (
                <ContactRow key={c.label} c={c} />
              ))}
            </div>
          </Fade>

          {/* Form */}
          <Fade vis={vis} delay={200}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                {[
                  { k: "name",  lbl: "Name",  ph: "Your name",     t: "text"  },
                  { k: "email", lbl: "Email", ph: "your@email.com", t: "email" },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", display: "block", marginBottom: 6, letterSpacing: "0.07em", textTransform: "uppercase" }}>{f.lbl}</label>
                    <input type={f.t} placeholder={f.ph} value={form[f.k]} onChange={set(f.k)}
                      style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", display: "block", marginBottom: 6, letterSpacing: "0.07em", textTransform: "uppercase" }}>Subject</label>
                <input type="text" placeholder="What's this about?" value={form.subject} onChange={set("subject")}
                  style={inp} onFocus={focus} onBlur={blur} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", display: "block", marginBottom: 6, letterSpacing: "0.07em", textTransform: "uppercase" }}>Message</label>
                <textarea rows={5} placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={set("message")}
                  style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}
                  onFocus={focus} onBlur={blur} />
              </div>

              <button onClick={send} disabled={!valid} className="btn btn-solid" style={{
                width: "100%", justifyContent: "center",
                opacity: valid ? 1 : 0.45,
                cursor: valid ? "pointer" : "not-allowed",
              }}>
                Send Message →
              </button>
              <p style={{ fontSize: 11, color: "var(--text3)", textAlign: "center", marginTop: 8 }}>
                Opens your default email client
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ c }) {
  const [hov, setHov] = useState(false);
  const Inner = () => (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 14px", borderRadius: 12,
        border: `1px solid ${hov ? "var(--accent)" : "var(--border)"}`,
        background: hov ? "var(--glow)" : "var(--card)",
        transition: "border-color .2s, background .2s",
        cursor: c.href ? "pointer" : "default",
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 9,
        border: `1px solid ${hov ? "var(--accent)" : "var(--border2)"}`,
        background: hov ? "rgba(0,200,255,0.1)" : "var(--bg3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: c.icon.length > 1 ? 10 : 15,
        color: hov ? "var(--accent)" : "var(--text3)",
        fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
        flexShrink: 0, transition: "all .2s",
      }}>{c.icon}</div>
      <div>
        <p style={{ fontSize: 9, color: "var(--text3)", margin: 0, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.label}</p>
        <p style={{ fontSize: 13, color: hov ? "var(--accent)" : "var(--text2)", margin: "2px 0 0", fontWeight: 500, transition: "color .2s" }}>{c.value}</p>
      </div>
    </div>
  );

  return c.href
    ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><Inner /></a>
    : <Inner />;
}
