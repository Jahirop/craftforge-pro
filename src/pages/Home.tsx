import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Palette, Film, Globe, ShoppingBag, Settings, Cpu,
  Zap, ChevronDown, MessageCircle, ArrowRight,
} from "lucide-react";
import CountUp from "../components/CountUp";
import RevealText from "../components/RevealText";
import ProcessSection from "../components/ProcessSection";
import ServiceCanvas from "../components/ServiceCanvas";
import CyclingBadge from "../components/CyclingBadge";

// Utility: hex color to rgb components string "r,g,b"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124,58,237";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

const HERO_SERVICES = [
  { name: "AI GRAPHIC DESIGN",       color: "#7C3AED", desc: "Brand visuals, product graphics & campaign creatives generated from single prompts at production scale." },
  { name: "AI VIDEO & MOTION",       color: "#4F46E5", desc: "Short form video, motion content & visual storytelling pipelines built to publish at speed." },
  { name: "SOCIAL MEDIA MANAGEMENT", color: "#3B82F6", desc: "Strategy, copy, scheduling & analytics fully AI assisted across every platform." },
  { name: "ECOMMERCE CREATIVE",      color: "#F97316", desc: "High converting product visuals & marketplace content for Amazon, Shopify, Flipkart & beyond." },
  { name: "AI AGENT DEVELOPMENT",    color: "#10B981", desc: "Autonomous pipelines using n8n, Make & AI agents that eliminate repetitive work permanently." },
  { name: "PROMPT ENGINEERING",      color: "#06B6D4", desc: "Precision prompt libraries & reusable AI systems that scale your entire creative operation." },
  { name: "VIBE CODE WEBSITES",      color: "#EC4899", desc: "Conversion focused websites built with AI assisted development live in days, not months." },
  { name: "UI / UX DESIGN",          color: "#F59E0B", desc: "Clean, intuitive interfaces designed for clarity, engagement & conversion powered by AI workflows." },
];

const SERVICES = [
  {
    icon: Palette,
    title: "AI Graphic Design",
    desc: "Brand visuals, product graphics, and campaign creatives generated from single prompts at production scale.",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: Film,
    title: "AI Video & Motion",
    desc: "Short form video, motion content, and visual storytelling pipelines built to publish at speed.",
    color: "#4F46E5",
    glow: "rgba(79,70,229,0.3)",
  },
  {
    icon: Globe,
    title: "Vibe Code Websites",
    desc: "Intelligent, conversion focused websites built with AI assisted development live in days, not months.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Creative",
    desc: "High converting product visuals and marketplace content for Amazon, Shopify, Flipkart, and beyond.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.3)",
  },
  {
    icon: Settings,
    title: "AI Automation",
    desc: "Autonomous pipelines using n8n, Make, and AI agents that eliminate repetitive work permanently.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Cpu,
    title: "Generative AI Systems",
    desc: "Prompt libraries, reusable AI pipelines, and production systems built to scale your entire creative operation.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
  },
];

const STATS = [
  { end: "9x",    label: "Faster creative production",  color: "#7C3AED" },
  { end: "1000+", label: "AI powered assets delivered", color: "#06B6D4" },
  { end: "67%",   label: "Manual workload reduction",   color: "#EC4899" },
  { end: "6+",    label: "Major marketplaces scaled",   color: "#10B981" },
];

function HeroTypewriter() {
  const [idx, setIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  const service = HERO_SERVICES[idx];
  const displayed = service.name.slice(0, charCount);
  const showMeta = phase === "hold";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (charCount < service.name.length) {
        timer = setTimeout(() => setCharCount((c) => c + 1), 62);
      } else {
        timer = setTimeout(() => setPhase("hold"), 200);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("erase"), 2800);
    } else {
      if (charCount > 0) {
        timer = setTimeout(() => setCharCount((c) => c - 1), 28);
      } else {
        timer = setTimeout(() => {
          setIdx((i) => (i + 1) % HERO_SERVICES.length);
          setPhase("type");
        }, 350);
      }
    }
    return () => clearTimeout(timer);
  }, [phase, charCount, service.name.length]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Typing row */}
      <div className="relative inline-flex items-center justify-center">
        {/* Color-synced glowing frame */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `${service.color}12`,
            border: `1px solid ${service.color}45`,
            boxShadow: `0 0 24px ${service.color}30, 0 0 56px ${service.color}12`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "0.5rem 0",
            margin: "-0.5rem 0",
            opacity: charCount > 0 ? 1 : 0,
          }}
        />
        <div className="relative flex items-center gap-3 px-6 py-2">
          {/* Typed text + cursor */}
          <span
            className="font-poppins font-bold text-xl md:text-2xl tracking-wide"
            style={{ color: service.color }}
          >
            {displayed}
            <span
              className="inline-block w-[2px] h-5 ml-0.5 rounded-sm align-middle"
              style={{
                background: service.color,
                animation: "cur-blink 0.65s step-end infinite",
              }}
            />
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-brand-grey text-sm md:text-base max-w-lg text-center leading-relaxed transition-opacity duration-500"
        style={{ opacity: showMeta ? 1 : 0 }}
      >
        {service.desc}
      </p>

      {/* Counter */}
      <p
        className="text-[11px] font-mono text-white/30 tracking-widest transition-opacity duration-500"
        style={{ opacity: showMeta ? 1 : 0 }}
      >
        {String(idx + 1).padStart(2, "0")} / {String(HERO_SERVICES.length).padStart(2, "0")}
      </p>

      {/* Dots */}
      <div className="flex gap-1.5">
        {HERO_SERVICES.map((s, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? "18px" : "6px",
              height: "6px",
              background: i === idx ? s.color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}


export default function Home() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        {/* Purple glow blob */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />


        {/* Hero content */}
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-6 items-center text-center">
            <CyclingBadge label="AI-Powered Creative Studio" animate={false} />

            <RevealText
              text="WE BUILD INTELLIGENT BRANDS WITH AI"
              className="text-white font-poppins font-bold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-wide md:tracking-widest justify-center"
              once={false}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <HeroTypewriter />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <span className="btn-lightning-wrap">
                <Link
                  to="/portfolio"
                  className="btn-electric group relative flex items-center gap-2 px-8 py-4 bg-brand-gradient rounded-full font-bold text-white transition-all overflow-hidden"
                >
                  SEE OUR WORK
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </span>
              <span className="btn-lightning-wrap btn-secondary btn-green">
                <a
                  href="https://wa.me/919641547271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 px-8 py-4 border border-brand-green/40 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-all overflow-hidden"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow: "0 0 20px rgba(16,185,129,0.18)",
                  }}
                >
                  <MessageCircle size={16} />
                  LET'S TALK
                </a>
              </span>
            </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 px-6 md:px-12">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <CyclingBadge label="What We Build" className="mb-3" />
            <RevealText
              text="SIX WAYS WE ACCELERATE YOUR BRAND"
              className="text-white font-poppins font-bold text-xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center"
              once={false}
            />
            <p className="text-brand-grey mt-2 max-w-xl mx-auto text-sm">
              End-to-end AI creative systems for brands that want to move fast, look sharp, and scale smart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col rounded-[20px] overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `rgba(${hexToRgb(s.color)},0.07)`,
                  borderColor: s.color + "44",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: `0 0 36px ${s.color}18, inset 0 0 24px ${s.color}08`,
                }}
              >
                {/* Card top */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: `rgba(${hexToRgb(s.color)},0.18)`, color: s.color }}
                    >
                      <s.icon size={22} />
                    </div>
                    <h3 className="font-poppins font-bold text-[19px] text-white tracking-tight uppercase leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                </div>
                {/* Divider */}
                <div className="mx-8" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                {/* Canvas animation */}
                <div className="min-h-[200px] sm:min-h-[240px] relative overflow-hidden">
                  <ServiceCanvas index={i === 3 ? 4 : i === 4 ? 3 : i} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS HSCROLL */}
      <ProcessSection />

      {/* STATS */}
      <section className="py-10 px-6 md:px-12">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ end, label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center rounded-[20px] border py-10 px-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: `${color}33`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <CountUp end={end} label={label} color={color} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 md:px-12">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-7 sm:p-12 md:p-16 text-center overflow-hidden border border-brand-purple/20"
            style={{
              background: "rgba(124,58,237,0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(124,58,237,0.12), inset 0 0 24px rgba(124,58,237,0.05)",
            }}
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <RevealText
                text="READY TO BUILD SOMETHING INTELLIGENT?"
                className="text-white font-poppins font-bold text-2xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center mb-4"
                once={false}
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-grey text-base md:text-lg mb-10 max-w-xl mx-auto"
              >
                Let's create your AI powered brand system together. Fast, smart, and built to scale.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                {/* Start a New Project */}
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative w-full sm:w-auto"
                >
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-5 rounded-full"
                    style={{
                      background: "radial-gradient(ellipse,rgba(124,58,237,0.7) 0%,rgba(6,182,212,0.35) 50%,transparent 80%)",
                      filter: "blur(8px)",
                      animation: "btn-under-bloom 2.4s ease-in-out infinite",
                    }}
                  />
                  <Link
                    to="/contact"
                    className="btn-electric relative flex items-center justify-center gap-3 px-10 py-4 bg-brand-gradient rounded-full font-bold text-white text-base overflow-hidden shadow-lg w-full sm:w-auto"
                    style={{
                      boxShadow: "0 0 28px rgba(124,58,237,0.45), 0 0 60px rgba(124,58,237,0.15)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.18) 55%,transparent 100%)",
                        animation: "btn-sweep 4s ease-in-out infinite",
                      }}
                    />
                    <Zap size={17} />
                    START A NEW PROJECT
                  </Link>
                </motion.div>

                {/* Chat on WhatsApp */}
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative w-full sm:w-auto"
                >
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-5 rounded-full"
                    style={{
                      background: "radial-gradient(ellipse,rgba(37,211,102,0.7) 0%,rgba(37,211,102,0.25) 50%,transparent 80%)",
                      filter: "blur(8px)",
                      animation: "btn-under-bloom 2.4s ease-in-out infinite",
                    }}
                  />
                  <a
                    href="https://wa.me/919641547271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-white text-base overflow-hidden shadow-lg w-full sm:w-auto"
                    style={{
                      background: "linear-gradient(135deg,#25D366,#128C7E)",
                      boxShadow: "0 0 28px rgba(37,211,102,0.45), 0 0 60px rgba(37,211,102,0.15)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.18) 55%,transparent 100%)",
                        animation: "btn-sweep 4s ease-in-out infinite",
                      }}
                    />
                    <MessageCircle size={17} />
                    CHAT ON WHATSAPP
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
