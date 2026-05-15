import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Palette, Film, Globe, ShoppingBag, Settings, Cpu,
  ArrowRight, Zap, ChevronDown, MessageCircle,
} from "lucide-react";
import CountUp from "../components/CountUp";
import RevealText from "../components/RevealText";
import ProcessSection from "../components/ProcessSection";

// Utility: hex color to rgb components string "r,g,b"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124,58,237";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

const HERO_WORDS = [
  "AI Graphic Design",
  "Ecommerce Creative",
  "AI Video & Motion",
  "AI Automation",
  "Vibe Code Websites",
  "Generative AI Systems",
];

const SERVICES = [
  {
    icon: Palette,
    title: "AI Graphic Design",
    desc: "Brand visuals, product graphics, and campaign creatives generated from single prompts — at production scale.",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: Film,
    title: "AI Video & Motion",
    desc: "Short-form video, motion content, and visual storytelling pipelines built to publish at speed.",
    color: "#4F46E5",
    glow: "rgba(79,70,229,0.3)",
  },
  {
    icon: Globe,
    title: "Vibe Code Websites",
    desc: "Intelligent, conversion-focused websites built with AI-assisted development — live in days, not months.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Creative",
    desc: "High-converting product visuals and marketplace content for Amazon, Shopify, Flipkart, and beyond.",
    color: "#F97316",
    glow: "rgba(249,115,22,0.3)",
  },
  {
    icon: Settings,
    title: "AI Automation",
    desc: "Autonomous pipelines using n8n, Make, and AI agents that eliminate repetitive work — permanently.",
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
  { end: "9x", label: "Faster creative production" },
  { end: "1000+", label: "AI-powered assets delivered" },
  { end: "67%", label: "Manual workload reduction" },
  { end: "6+", label: "Major marketplaces scaled" },
];

function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    if (subIndex === HERO_WORDS[index].length + 1 && !reverse) {
      setPause(true);
      setTimeout(() => { setReverse(true); setPause(false); }, 1600);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((p) => (p + 1) % HERO_WORDS.length);
      return;
    }
    const t = setTimeout(() => setSubIndex((p) => p + (reverse ? -1 : 1)), reverse ? 35 : 75);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, pause]);

  return (
    <span className="text-brand-purple font-poppins font-semibold">
      {HERO_WORDS[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
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
        <div className="relative z-10 max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-purple/15 border border-brand-purple/30 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              AI-Powered Creative Studio
            </motion.div>

            <RevealText
              text="We Build Intelligent Brands With AI"
              className="text-white font-poppins font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight justify-center md:justify-start"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl min-h-[2rem]"
            >
              <HeroTypewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-brand-grey text-base md:text-lg max-w-lg leading-relaxed"
            >
              From one prompt to a complete brand system — faster, smarter, and at scale.
              We merge AI with creative strategy to build brands that perform.
            </motion.p>

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
                  See Our Work
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </span>
              <span className="btn-lightning-wrap btn-secondary btn-green">
                <a
                  href="https://wa.me/919641547271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 px-8 py-4 border border-brand-green/40 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-all overflow-hidden"
                >
                  <MessageCircle size={16} />
                  Let's Talk
                </a>
              </span>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-4"
            >
              {["9x Faster", "1000+ Assets", "6+ Marketplaces"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-brand-grey">
                  <Zap size={12} className="text-brand-purple" />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side — lightning fills this space absolutely */}
          <div className="hidden md:block" />
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* Floating particle background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
                background: ["#7C3AED", "#06B6D4", "#EC4899", "#10B981", "#4F46E5", "#F97316", "#3B82F6", "#7C3AED"][i],
                opacity: 0.15,
                animation: `float-particle ${5 + i * 0.7}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
            What We Build
          </motion.div>
          <RevealText
            text="Six Ways We Accelerate Your Brand"
            className="text-white font-poppins font-bold text-3xl md:text-5xl leading-tight justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-grey mt-4 max-w-xl mx-auto"
          >
            End-to-end AI creative systems for brands that want to move fast, look sharp, and scale smart.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative p-6 rounded-2xl border overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at center, ${s.glow.replace("0.3", "0.08")} 0%, transparent 70%)` }}
              />

              {/* Icon with glow halo */}
              <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: s.glow, filter: "blur(12px)", opacity: 0.7 }}
                />
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `rgba(${hexToRgb(s.color)},0.15)`,
                    border: `1px solid rgba(${hexToRgb(s.color)},0.3)`,
                  }}
                >
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
              </div>

              <h3 className="font-poppins font-bold text-lg mb-2 group-hover:text-white transition-colors text-white/90">
                {s.title}
              </h3>
              <p className="text-brand-grey text-sm leading-relaxed">{s.desc}</p>

              <Link
                to="/services"
                className="mt-4 flex items-center gap-1.5 text-xs font-bold transition-colors"
                style={{ color: s.color }}
              >
                Learn more <ArrowRight size={13} />
              </Link>

              {/* Active corner accent */}
              <div
                className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(circle at top right, ${s.glow}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION — animated 01→04 energy flow */}
      <section className="py-4 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <ProcessSection />
      </section>

      {/* STATS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient opacity-10" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.15))" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <div className="glass-card rounded-3xl p-12 border border-brand-purple/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {STATS.map(({ end, label }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <CountUp end={end} label={label} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-brand-purple/20"
            style={{ backdropFilter: "blur(10px)" }}
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                Ready When You Are
              </motion.div>

              <RevealText
                text="Ready to Build Something Intelligent?"
                className="text-white font-poppins font-bold text-3xl md:text-5xl leading-tight justify-center mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-grey text-base md:text-lg mb-10 max-w-xl mx-auto"
              >
                Let's create your AI-powered brand system together. Fast, smart, and built to scale.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <span className="btn-lightning-wrap">
                  <Link
                    to="/contact"
                    className="btn-electric relative flex items-center gap-2 px-10 py-4 bg-brand-gradient rounded-full font-bold text-white overflow-hidden"
                  >
                    <Zap size={16} />
                    Start a Project
                  </Link>
                </span>
                <span className="btn-lightning-wrap btn-secondary btn-green">
                  <a
                    href="https://wa.me/919641547271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 px-10 py-4 border border-brand-green/40 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-colors overflow-hidden"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
