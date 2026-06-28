import { motion } from "motion/react";
import RevealText from "./RevealText";
import CyclingBadge from "./CyclingBadge";

interface Props {
  title: string;
  subtext?: string;
  centered?: boolean;
  badge?: string;
}

export default function SectionHeading({ title, subtext, centered = true, badge }: Props) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      {badge && (
        <CyclingBadge label={badge} className={`mb-4 ${centered ? "mx-auto" : ""}`} />
      )}
      <RevealText
        text={title}
        className={`text-3xl md:text-5xl font-poppins font-bold leading-tight ${centered ? "justify-center" : "justify-start"}`}
        style={{ color: "var(--th-text)" }}
      />
      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-base md:text-lg max-w-2xl mt-4 leading-relaxed ${centered ? "mx-auto" : ""}`}
          style={{ color: "var(--th-text-muted)" }}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}
