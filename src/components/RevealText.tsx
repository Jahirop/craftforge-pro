import { motion } from "motion/react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function RevealText({ text, className = "", delay = 0, stagger = 0.02, once = true }: Props) {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-0 ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once, margin: "-5%" }}
              transition={{
                duration: 0.5,
                delay: delay + wi * 0.08 + ci * stagger,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}