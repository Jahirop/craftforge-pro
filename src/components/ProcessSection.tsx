import { motion } from "motion/react";
import RevealText from "./RevealText";
import ProcessCanvas from "./ProcessCanvas";
import CyclingBadge from "./CyclingBadge";

const STEPS = [
  {
    num: "01",
    title: "Brief to Prompt",
    desc: "Share your goal, niche, and vision. We translate it into a precision AI production plan.",
    icon: "\uD83D\uDCA1",
    color: "#7C3AED",
  },
  {
    num: "02",
    title: "AI Systems Activate",
    desc: "Specialized AI agents begin generating design, copy, motion, and code in parallel.",
    icon: "\u26A1",
    color: "#06B6D4",
  },
  {
    num: "03",
    title: "Refine & Iterate",
    desc: "We review, refine, and iterate with AI until every asset meets production standard.",
    icon: "\uD83D\uDD04",
    color: "#EC4899",
  },
  {
    num: "04",
    title: "Launch Ready",
    desc: "You receive complete, production ready assets, systems, or a live website fast.",
    icon: "\uD83D\uDE80",
    color: "#10B981",
  },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return "124,58,237";
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
}

export default function ProcessSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <CyclingBadge label="How It Works" className="mb-3" />
          <RevealText
            text="FROM BRIEF TO LAUNCH IN DAYS"
            className="text-white font-poppins font-bold text-xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center"
            once={false}
          />
          <p className="text-brand-grey mt-2 text-sm md:text-base max-w-xl mx-auto">
            Four stages. One seamless flow. AI working at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col rounded-[20px] overflow-hidden border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: `rgba(${hexToRgb(step.color)},0.2)`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Card top */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl leading-none">{step.icon}</span>
                  <span
                    className="font-poppins font-bold text-5xl md:text-6xl leading-none"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-poppins font-bold text-[19px] text-white mb-2 tracking-tight uppercase">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {step.desc}
                </p>
              </div>
              {/* Divider */}
              <div
                className="mx-8"
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, rgba(${hexToRgb(step.color)},0.27), transparent)`,
                }}
              />
              {/* Canvas animation */}
              <div className="h-[220px] sm:h-[260px] relative overflow-hidden">
                <ProcessCanvas index={i} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
