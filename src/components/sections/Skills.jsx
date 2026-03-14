import { useIntersect } from "../../hooks/useIntersect.js";
import FadeIn from "../ui/FadeIn.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import SkillBar from "../ui/SkillBar.jsx";
import { ENGINEERING_SKILLS } from "../../data/skills.js";

export default function Skills() {
  const [ref, visible] = useIntersect(0.1);

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        <FadeIn visible={visible}>
          <SectionLabel>Proficiency</SectionLabel>
          <SectionTitle>Engineering Skills</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "8px 64px",
          }}
        >
          {ENGINEERING_SKILLS.map((skill, i) => (
            <FadeIn key={skill.label} delay={i * 70} visible={visible}>
              <SkillBar
                label={skill.label}
                pct={skill.pct}
                color={skill.color}
                animate={visible}
              />
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={600} visible={visible}>
          <p
            style={{
              marginTop: 40,
              fontSize: 12,
              color: "var(--text-subtle)",
              fontStyle: "italic",
            }}
          >
            * Percentages reflect self-assessed proficiency based on daily professional usage.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
