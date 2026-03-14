import { useEffect, useRef, useState, useCallback } from "react";

export const NAV_IDS = ["hero","about","skills","projects","experience","contact"];

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

export function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const handler = () => {
      for (let i = NAV_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_IDS[i]);
        if (el && el.getBoundingClientRect().top <= 100) { setActive(NAV_IDS[i]); return; }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

export function useTypewriter(words, typeMs = 70, deleteMs = 38, pauseMs = 1900) {
  const [text, setText] = useState("");
  const wi = useRef(0), ci = useRef(0), dir = useRef(1);
  useEffect(() => {
    let t;
    const tick = () => {
      const w = words[wi.current];
      if (dir.current === 1) {
        ci.current++;
        setText(w.slice(0, ci.current));
        if (ci.current === w.length) { dir.current = -1; t = setTimeout(tick, pauseMs); return; }
      } else {
        ci.current--;
        setText(w.slice(0, ci.current));
        if (ci.current === 0) {
          dir.current = 1;
          wi.current = (wi.current + 1) % words.length;
          t = setTimeout(tick, 280); return;
        }
      }
      t = setTimeout(tick, dir.current === 1 ? typeMs : deleteMs);
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return text;
}
