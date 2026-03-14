import { useEffect, useRef, useState } from "react";

/**
 * Cycles through an array of strings with a typewriter effect.
 * @param {string[]} words - strings to cycle through
 * @param {number}   typeSpeed  - ms per character when typing
 * @param {number}   deleteSpeed - ms per character when deleting
 * @param {number}   pauseMs   - ms to pause at full word
 */
export function useTypewriter(
  words,
  typeSpeed = 65,
  deleteSpeed = 35,
  pauseMs = 1800
) {
  const [text, setText] = useState("");
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const direction = useRef(1); // 1 = typing, -1 = deleting

  useEffect(() => {
    let timeout;

    const tick = () => {
      const word = words[wordIdx.current];

      if (direction.current === 1) {
        charIdx.current++;
        setText(word.slice(0, charIdx.current));
        if (charIdx.current === word.length) {
          direction.current = -1;
          timeout = setTimeout(tick, pauseMs);
          return;
        }
      } else {
        charIdx.current--;
        setText(word.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          direction.current = 1;
          wordIdx.current = (wordIdx.current + 1) % words.length;
          timeout = setTimeout(tick, 200);
          return;
        }
      }

      timeout = setTimeout(tick, direction.current === 1 ? typeSpeed : deleteSpeed);
    };

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return text;
}
