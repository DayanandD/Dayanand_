import { useState } from "react";

/**
 * Premium animated skill bar with hover glow and label highlight.
 * Set `animate` to true once the parent section is visible.
 */
export default function SkillBar({ label, pct, color, animate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ marginBottom: 22, cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Labels row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: hovered ? color : "var(--text-primary)",
            transition: "color .25s",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            color: hovered ? color : "var(--text-muted)",
            transition: "color .25s",
            background: hovered ? color + "12" : "transparent",
            padding: "2px 7px",
            borderRadius: 99,
            border: `1px solid ${hovered ? color + "30" : "transparent"}`,
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: hovered ? 6 : 4,
          borderRadius: 99,
          background: "var(--border)",
          overflow: "hidden",
          transition: "height .25s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: color,
            width: animate ? `${pct}%` : "0%",
            transition: "width 1.4s cubic-bezier(.16,1,.3,1)",
            filter: hovered ? "brightness(1.2)" : "brightness(1)",
          }}
        />
      </div>

      {/* Subtle tick marks at 25/50/75 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3px 0 0",
          opacity: hovered ? 0.4 : 0,
          transition: "opacity .25s",
        }}
      >
        {[25, 50, 75, 100].map(tick => (
          <span
            key={tick}
            style={{
              fontSize: 9,
              color: "var(--text-subtle, var(--text-muted))",
              fontFamily: "'JetBrains Mono', monospace",
              width: "25%",
              textAlign: tick === 25 ? "left" : tick === 100 ? "right" : "center",
            }}
          >
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
