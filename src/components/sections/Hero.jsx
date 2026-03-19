import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "../../hooks/index.js";
import { ROLES, CONTACT } from "../../data/index.js";

/* ── Counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!start) return;
    const isFloat = String(target).includes(".");
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const suffix = String(target).replace(/[0-9.]/g, "");
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;
      setVal(isFloat ? current.toFixed(3) : Math.floor(current));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setVal(isFloat ? numericTarget.toFixed(3) : numericTarget);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration]);

  return val;
}

const RAW_STATS = [
  { raw: "4",     suffix: "+", label: "Years Experience",   dur: 1200 },
  { raw: "60", suffix: "+",label: "Projects Built",       dur: 2000 },
  { raw: "20",     suffix: "+", label: "Technologies Used",     dur: 1400  },
  { raw: "20",  suffix: "+", label: "Clients Served",             dur: 1400 },
];



function StatBox({ stat, i, counting }) {
  const val = useCounter(stat.raw, stat.dur, counting);
  return (
    <div style={{
      padding: "18px 14px", textAlign: "center",
      background: "var(--card)",
      borderRight: i < 3 ? "1px solid var(--border)" : "none",
      position: "relative", overflow: "hidden",
    }}>
      {/* Shimmer on count */}
      {counting && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.04) 50%, transparent 100%)",
          animation: "shimmerStat .8s ease forwards",
          pointerEvents: "none",
        }} />
      )}
      <p style={{
        fontSize: "clamp(15px,2vw,22px)", fontWeight: 900,
        color: "var(--accent)", margin: 0, letterSpacing: "-0.04em",
        fontFamily: "'JetBrains Mono', monospace",
        transition: "color .2s",
      }}>
        {val}{stat.suffix}
      </p>
      <p style={{
        fontSize: 9, color: "var(--text3)", margin: "4px 0 0",
        fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        {stat.label}
      </p>
    </div>
  );
}

function Particle({ style }) {
  return <div style={style} />;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const statsRef = useRef(null);
  const [counting, setCounting] = useState(false);

  /* Fire counters once stats grid enters viewport */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCounting(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const particles = Array.from({ length: 28 }, (_, i) => {
    const size = 2 + Math.random() * 4;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur = 14 + Math.random() * 18;
    const opacity = 0.08 + Math.random() * 0.22;
    const isLine = i % 5 === 0;
    return {
      position: "absolute", left: `${left}%`, bottom: "-20px",
      width: isLine ? `${1 + Math.random()}px` : `${size}px`,
      height: isLine ? `${40 + Math.random() * 60}px` : `${size}px`,
      borderRadius: isLine ? "1px" : "50%",
      background: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--purple)" : "var(--green)",
      opacity, animation: `floatUp ${dur}s ${delay}s linear infinite`,
      pointerEvents: "none",
    };
  });

  const gridLines = Array.from({ length: 6 }, (_, i) => ({
    position: "absolute", left: `${(i + 1) * 16.6}%`, top: 0, bottom: 0,
    width: "1px",
    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 70%, transparent)",
    pointerEvents: "none",
  }));

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "90px clamp(20px,6vw,80px) 60px",
      position: "relative", overflow: "hidden",
    }}>

      <style>{`
        @keyframes floatUp {
          0%   { transform:translateY(0) scale(1);   opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-110vh) scale(0.3); opacity:0; }
        }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseGlow  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.08)} }
        @keyframes driftX     { 0%,100%{transform:translateX(0)} 50%{transform:translateX(40px)} }
        @keyframes scanLine   { 0%{top:-2px} 100%{top:100%} }
        @keyframes shimmerStat{ 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes countPop   { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
      `}</style>

      {/* Grid lines */}
      {gridLines.map((s, i) => <div key={i} aria-hidden style={s} />)}
      {/* Particles */}
      {particles.map((s, i) => <Particle key={i} style={s} />)}

      {/* Glow orbs */}
      <div aria-hidden style={{
        position:"absolute", top:"-5%", right:"-10%", zIndex:0,
        width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(0,200,255,0.10) 0%, rgba(0,200,255,0.04) 40%, transparent 70%)",
        animation:"pulseGlow 6s ease-in-out infinite", pointerEvents:"none",
      }} />
      <div aria-hidden style={{
        position:"absolute", bottom:"-8%", left:"-12%", zIndex:0,
        width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(124,111,255,0.10) 0%, rgba(124,111,255,0.04) 40%, transparent 70%)",
        animation:"pulseGlow 8s ease-in-out 2s infinite, driftX 12s ease-in-out infinite", pointerEvents:"none",
      }} />

      {/* Rotating rings */}
      <div aria-hidden style={{
        position:"absolute", top:"12%", right:"8%", zIndex:0,
        width:320, height:320, border:"1px solid rgba(0,200,255,0.07)",
        borderRadius:"50%", animation:"rotateSlow 40s linear infinite", pointerEvents:"none",
      }}>
        <div style={{
          position:"absolute", top:-4, left:"50%", marginLeft:-4,
          width:8, height:8, borderRadius:"50%",
          background:"var(--accent)", opacity:0.6, boxShadow:"0 0 12px var(--accent)",
        }} />
      </div>
      <div aria-hidden style={{
        position:"absolute", top:"12%", right:"8%", zIndex:0,
        width:200, height:200, marginTop:60, marginRight:60,
        border:"1px solid rgba(124,111,255,0.08)", borderRadius:"50%",
        animation:"rotateSlow 25s linear reverse infinite", pointerEvents:"none",
      }}>
        <div style={{
          position:"absolute", bottom:-4, left:"50%", marginLeft:-4,
          width:6, height:6, borderRadius:"50%",
          background:"var(--purple)", opacity:0.7, boxShadow:"0 0 10px var(--purple)",
        }} />
      </div>

      {/* Dot grid */}
      <div aria-hidden style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize:"36px 36px", pointerEvents:"none",
      }} />

      {/* Scan line */}
      <div aria-hidden style={{
        position:"absolute", left:0, right:0, height:"2px",
        background:"linear-gradient(90deg, transparent, rgba(0,200,255,0.08) 30%, rgba(0,200,255,0.15) 50%, rgba(0,200,255,0.08) 70%, transparent)",
        animation:"scanLine 8s linear infinite", zIndex:0, pointerEvents:"none",
      }} />

      {/* ── Content ── */}
      <div style={{ position:"relative", zIndex:1, maxWidth:860 }}>

        {/* Badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:9,
          padding:"6px 16px", borderRadius:99,
          background:"rgba(0,229,160,0.08)", border:"1px solid rgba(0,229,160,0.25)",
          marginBottom:38, fontSize:12, fontWeight:700,
          color:"#00e5a0", letterSpacing:"0.05em",
          animation:"fadeUp .6s ease both",
        }}>
          <span style={{
            width:7, height:7, borderRadius:"50%",
            background:"#00e5a0", display:"inline-block",
            animation:"pulseDot 2s ease-in-out infinite",
          }} />
          Open to new opportunities
        </div>

        <p style={{ fontSize:15, color:"var(--text2)", marginBottom:6, fontFamily:"'JetBrains Mono', monospace", animation:"fadeUp .6s ease .05s both" }}>
          Hi there, I'm
        </p>

        <h1 style={{
          fontSize:"clamp(52px,8.5vw,96px)", fontWeight:900,
          letterSpacing:"-0.05em", color:"var(--text)", lineHeight:0.97,
          margin:"0 0 20px", animation:"fadeUp .6s ease .1s both",
        }}>
          Dayanand<br /><span className="grad">Dongare</span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontSize:"clamp(17px,2.4vw,24px)", fontWeight:600, color:"var(--text2)",
          marginBottom:26, minHeight:34, display:"flex", alignItems:"center",
          animation:"fadeUp .6s ease .18s both",
        }}>
          <span style={{ color:"var(--accent)", marginRight:10, fontFamily:"'JetBrains Mono', monospace" }}>&gt;</span>
          {typed}
          <span style={{
            display:"inline-block", width:2, height:"1em",
            background:"var(--accent)", marginLeft:3, verticalAlign:"middle",
            animation:"blink 1s step-end infinite",
          }} />
        </div>

        <p style={{
          fontSize:"clamp(14px,1.6vw,17px)", color:"var(--text2)", lineHeight:1.85,
          maxWidth:580, marginBottom:46, animation:"fadeUp .6s ease .25s both",
        }}>
          Building enterprise-grade applications with{" "}
          <strong style={{ color:"var(--text)", fontWeight:700 }}>.NET 8 & Clean Architecture</strong> on the backend and{" "}
          <strong style={{ color:"var(--text)", fontWeight:700 }}>React</strong> on the frontend.{" "}
          <span style={{ color:"var(--accent)", fontWeight:700 }}>2× Employee of the Month</span> at IMS Global.
        </p>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:70, animation:"fadeUp .6s ease .32s both" }}>
          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}} className="btn btn-solid">View Projects →</a>
          <a href="#contact"  onClick={e=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}}  className="btn btn-ghost">Get in Touch</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub ↗</a>
        </div>

        {/* Stats grid — counters fire on intersection */}
        <div
          ref={statsRef}
          style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            maxWidth:540, border:"1px solid var(--border)",
            borderRadius:14, overflow:"hidden",
            animation:"fadeUp .6s ease .4s both",
          }}
        >
          {RAW_STATS.map((s, i) => (
            <StatBox key={s.label} stat={s} i={i} counting={counting} />
          ))}
        </div>
      </div>
    </section>
  );
}
