import { useState, useEffect } from "react";
import { motion } from "motion/react";

const COLORS = [
  "#7C3AED",
  "#4F46E5",
  "#3B82F6",
  "#F97316",
  "#10B981",
  "#06B6D4",
  "#EC4899",
  "#F59E0B",
];

interface Props {
  label: string;
  className?: string;
  animate?: boolean; // use whileInView (sections) vs animate (hero)
}

export default function CyclingBadge({ label, className = "", animate = true }: Props) {
  const [idx, setIdx] = useState(0);
  const color = COLORS[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % COLORS.length), 1800);
    return () => clearInterval(t);
  }, []);

  const motionProps = animate
    ? { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } };

  return (
    <motion.div
      {...motionProps}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${className}`}
      style={{
        background: `${color}22`,
        border: `1px solid ${color}50`,
        color,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: `0 0 18px ${color}30`,
        transition: "background 0.8s ease, border-color 0.8s ease, color 0.8s ease, box-shadow 0.8s ease",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
        style={{ background: color, transition: "background 0.8s ease" }}
      />
      {label}
    </motion.div>
  );
}
