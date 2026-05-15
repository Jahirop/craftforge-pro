import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "Brief to Prompt",
    desc: "Share your goal, niche, and vision. We translate it into a precision AI production plan.",
    icon: "💡",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.5)",
  },
  {
    num: "02",
    title: "AI Systems Activate",
    desc: "Specialized AI agents begin generating — design, copy, motion, and code in parallel.",
    icon: "⚡",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.5)",
  },
  {
    num: "03",
    title: "Refine & Iterate",
    desc: "We review, refine, and iterate with AI until every asset meets production standard.",
    icon: "🔄",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.5)",
  },
  {
    num: "04",
    title: "Launch Ready",
    desc: "You receive complete, production-ready assets, systems, or a live website — fast.",
    icon: "🚀",
    color: "#10B981",
    glow: "rgba(16,185,129,0.5)",
  },
];

const CYCLE_DURATION = 7000; // 7 seconds total
const STEP_DURATION = CYCLE_DURATION / STEPS.length; // 1750ms per step

// Utility: hex color to rgb components string "r,g,b"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124,58,237";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [activeStep, setActiveStep] = useState(-1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    setActiveStep(0);
    let step = 0;

    intervalRef.current = setInterval(() => {
      step = (step + 1) % STEPS.length;
      setActiveStep(step);

      // After last step, pause briefly then restart
      if (step === STEPS.length - 1) {
        clearInterval(intervalRef.current!);
        cycleRef.current = setTimeout(() => {
          setActiveStep(-1);
          setTimeout(startCycle, 400);
        }, STEP_DURATION);
      }
    }, STEP_DURATION);
  };

  useEffect(() => {
    if (isInView) {
      const delay = setTimeout(startCycle, 600);
      return () => {
        clearTimeout(delay);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (cycleRef.current) clearTimeout(cycleRef.current);
      };
    } else {
      setActiveStep(-1);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cycleRef.current) clearTimeout(cycleRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const stepProgress = activeStep >= 0 ? ((activeStep + 1) / STEPS.length) * 100 : 0;

  return (
    <section ref={ref} className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
          How It Works
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-poppins font-bold"
        >
          From Brief to Launch{" "}
          <span className="text-gradient">in Days</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brand-grey mt-4 max-w-xl mx-auto"
        >
          Four stages. One seamless flow. AI working at every step.
        </motion.p>
      </div>

      {/* Progress bar (desktop) */}
      <div className="hidden md:block relative mb-12">
        <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #7C3AED, #06B6D4, #EC4899, #10B981)",
              boxShadow: "0 0 12px rgba(124,58,237,0.6)",
            }}
            animate={{ width: isInView ? `${stepProgress}%` : "0%" }}
            transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: "easeInOut" }}
          />
        </div>
        {/* Particle traveling along progress */}
        {activeStep >= 0 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: STEPS[activeStep].color,
              boxShadow: `0 0 12px ${STEPS[activeStep].glow}, 0 0 24px ${STEPS[activeStep].glow}`,
            }}
            animate={{ left: `${stepProgress}%` }}
            transition={{ duration: (STEP_DURATION / 1000) * 0.9, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
        {/* Desktop connecting lines */}
        <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px] pointer-events-none" style={{ zIndex: 0 }}>
          {STEPS.slice(0, -1).map((step, i) => {
            const isActive = i <= activeStep;
            return (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{
                  left: `${(i + 1) * 25 - 12.5}%`,
                  width: "25%",
                  background: isActive
                    ? `linear-gradient(90deg, ${step.color}, ${STEPS[i + 1].color})`
                    : "rgba(255,255,255,0.05)",
                  boxShadow: isActive ? `0 0 8px ${step.glow}` : "none",
                  transition: "background 0.5s ease, box-shadow 0.5s ease",
                }}
              />
            );
          })}
          {/* Traveling energy dots */}
          {activeStep >= 0 && activeStep < STEPS.length - 1 && (
            <motion.div
              key={`dot-${activeStep}`}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: STEPS[activeStep].color,
                boxShadow: `0 0 8px ${STEPS[activeStep].glow}`,
              }}
              initial={{ left: `${activeStep * 25 + 12.5}%`, opacity: 0 }}
              animate={{ left: `${(activeStep + 1) * 25 + 12.5}%`, opacity: [0, 1, 1, 0] }}
              transition={{ duration: (STEP_DURATION / 1000) * 0.85, ease: "easeInOut" }}
            />
          )}
        </div>

        {STEPS.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          const isHovered = hoveredStep === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative z-10 group cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: isCurrent ? 1.03 : isHovered ? 1.02 : 1,
                  borderColor: isActive ? step.color + "60" : "rgba(255,255,255,0.07)",
                  boxShadow: isCurrent
                    ? `0 0 30px ${step.glow}, 0 0 60px ${step.glow.replace("0.5", "0.15")}, inset 0 0 20px ${step.glow.replace("0.5", "0.05")}`
                    : isHovered
                    ? `0 0 20px ${step.glow}`
                    : "none",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative p-6 rounded-2xl border overflow-hidden h-full"
                style={{
                  background: isActive
                    ? `rgba(${hexToRgb(step.color)}, 0.06)`
                    : "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(10px)",
                  borderColor: isActive ? step.color + "50" : "rgba(255,255,255,0.07)",
                }}
              >
                {/* Glassmorphism inner highlight */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
                  }}
                />

                {/* Step number */}
                <motion.div
                  animate={{
                    color: isActive ? step.color : "rgba(255,255,255,0.2)",
                    textShadow: isCurrent
                      ? `0 0 20px ${step.glow}, 0 0 40px ${step.glow}`
                      : isHovered ? `0 0 15px ${step.glow}` : "none",
                  }}
                  transition={{ duration: 0.4 }}
                  className="font-poppins font-bold text-5xl md:text-6xl mb-4 leading-none"
                >
                  {step.num}
                </motion.div>

                {/* Icon with pulse on active */}
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: isCurrent ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                  className="text-3xl mb-4"
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className="font-poppins font-bold text-lg md:text-xl mb-3 transition-colors duration-300"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{ color: isActive ? "#94A3B8" : "rgba(148,163,184,0.5)" }}
                >
                  {step.desc}
                </p>

                {/* Active indicator bar */}
                <motion.div
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />

                {/* Hover energy ring */}
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.5, 2] : 1,
                    opacity: isHovered ? [0.3, 0.1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                  }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `1px solid ${step.color}` }}
                />
              </motion.div>

              {/* Mobile connector line */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center my-2 relative h-12">
                  <motion.div
                    animate={{
                      height: isActive ? "100%" : "20%",
                      backgroundColor: isActive ? step.color : "rgba(255,255,255,0.1)",
                      boxShadow: isActive ? `0 0 8px ${step.glow}` : "none",
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-[2px] rounded-full origin-top"
                  />
                  {/* Traveling dot on mobile */}
                  {isCurrent && (
                    <motion.div
                      key={`mob-dot-${i}`}
                      className="absolute w-2 h-2 rounded-full left-1/2 -translate-x-1/2"
                      style={{ background: step.color, boxShadow: `0 0 8px ${step.glow}` }}
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: (STEP_DURATION / 1000) * 0.8, ease: "easeInOut" }}
                    />
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
