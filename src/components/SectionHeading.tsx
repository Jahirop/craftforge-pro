import { motion } from "motion/react";
import RevealText from "./RevealText";

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest ${centered ? "mx-auto" : ""}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
          {badge}
        </motion.div>
      )}
      <RevealText
        text={title}
        className={`text-3xl md:text-5xl font-poppins font-bold leading-tight ${centered ? "justify-center" : "justify-start"}`}
      />
      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-brand-grey text-base md:text-lg max-w-2xl mt-4 leading-relaxed ${centered ? "mx-auto" : ""}`}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}