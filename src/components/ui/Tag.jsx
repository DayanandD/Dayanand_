/**
 * Technology / label badge.
 * Pass `accent` hex for colored variant, omit for neutral.
 */
export default function Tag({ children, accent }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "var(--radius-full)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        background: accent ? `${accent}18` : "var(--tag-bg)",
        color: accent || "var(--text-muted)",
        border: `1px solid ${accent ? `${accent}30` : "var(--border)"}`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
