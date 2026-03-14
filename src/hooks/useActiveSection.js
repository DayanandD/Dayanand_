import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/nav.js";

/**
 * Returns the id of the section currently visible in the viewport.
 * Uses scroll position — marks section active when its top edge
 * is at or above 120px from the top of the viewport.
 */
export function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = NAV_LINKS.map((n) => n.id);

    const handler = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          return;
        }
      }
      setActive("hero");
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler(); // run on mount
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}
