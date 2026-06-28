import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import RevealText from "./RevealText";
import ProcessCanvas from "./ProcessCanvas";
import CyclingBadge from "./CyclingBadge";
import { useTheme } from "../context/ThemeContext";

const STEPS = [
  { num: "01", title: "Brief to Prompt",      desc: "Share your goal, niche, and vision. We translate it into a precision AI production plan.", icon: "💡", color: "#7C3AED" },
  { num: "02", title: "AI Systems Activate",  desc: "Specialized AI agents begin generating design, copy, motion, and code in parallel.", icon: "⚡", color: "#06B6D4" },
  { num: "03", title: "Refine & Iterate",     desc: "We review, refine, and iterate with AI until every asset meets production standard.", icon: "🔄", color: "#EC4899" },
  { num: "04", title: "Launch Ready",         desc: "You receive complete, production ready assets, systems, or a live website fast.", icon: "🚀", color: "#10B981" },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return "124,58,237";
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
}

export default function ProcessSection() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "rgba(255,255,255,0.45)" : "#64748B";

  const hScrollOuter = useRef<HTMLDivElement>(null);
  const hScrollTrack = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (hScrollTrack.current) {
        setXRange(hScrollTrack.current.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: hScrollOuter,
    offset: ["start start", "end end"],
  });
  const hX = useTransform(scrollYProgress, [0, 1], [0, -xRange]);

  return (
    <div ref={hScrollOuter} style={{ height: `${STEPS.length * 100 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Section header */}
        <div className="text-center mb-8 px-6 flex-shrink-0">
          <CyclingBadge label="How It Works" className="mb-3" />
          <RevealText text="FROM BRIEF TO LAUNCH IN DAYS"
            className="font-poppins font-bold text-xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center"
            style={{ color: textPrimary }} once={false} />
          <p className="mt-2 text-sm md:text-base max-w-xl mx-auto" style={{ color: isDark ? "#94A3B8" : "#64748B" }}>
            Four stages. One seamless flow. Craft and AI at every step.
          </p>
        </div>

        {/* Horizontal track */}
        <div className="overflow-hidden flex-shrink-0">
          <motion.div
            ref={hScrollTrack}
            style={{ x: hX }}
            className="flex gap-6 pl-6 md:pl-12"
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col rounded-[20px] overflow-hidden border transition-all duration-300"
                style={{
                  width: "min(500px, 85vw)",
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.88)",
                  borderColor: `rgba(${hexToRgb(step.color)},${isDark ? "0.20" : "0.18"})`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isDark ? "none" : `0 4px 20px rgba(0,0,0,0.06)`,
                }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl leading-none">{step.icon}</span>
                    <span className="font-poppins font-bold text-5xl md:text-6xl leading-none" style={{ color: step.color }}>
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-[19px] mb-2 tracking-tight uppercase" style={{ color: textPrimary }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{step.desc}</p>
                </div>
                <div className="mx-8"
                  style={{ height: 1, background: `linear-gradient(90deg, rgba(${hexToRgb(step.color)},0.27), transparent)` }} />
                <div className="h-[220px] sm:h-[260px] relative overflow-hidden">
                  <ProcessCanvas index={i} />
                </div>
              </div>
            ))}
            {/* Right padding sentinel */}
            <div className="flex-shrink-0 w-6 md:w-12" />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-6 flex-shrink-0">
          <motion.div
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest select-none"
            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "#94A3B8" }}
          >
            SCROLL TO EXPLORE →
          </motion.div>
        </div>

      </div>
    </div>
  );
}
