/** Small uppercase eyebrow label above section titles */
export default function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}
