import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport.
 * @param {number} threshold - 0–1, fraction of element visible before trigger
 * @param {string} rootMargin - CSS margin string for the observer root
 */
export function useIntersect(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
