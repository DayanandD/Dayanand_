/**
 * Wraps children in a fade-up animation.
 * `visible` should come from useIntersect — animation fires once on entry.
 */
export default function FadeIn({ children, delay = 0, visible, direction = "up" }) {
  const transforms = {
    up:    "translateY(24px)",
    left:  "translateX(-20px)",
    right: "translateX(20px)",
    none:  "none",
  };

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
