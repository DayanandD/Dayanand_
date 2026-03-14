/** Main section heading — uses Syne display font */
export default function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        color: "var(--text-primary)",
        margin: "0 0 48px",
        lineHeight: 1.15,
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {children}
    </h2>
  );
}
