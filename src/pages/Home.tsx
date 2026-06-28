import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://craftforge.studio/#organization",
      "name": "Craftforge",
      "url": "https://craftforge.studio",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://craftforge.studio/#logo",
        "url": "https://craftforge.studio/favicon.svg",
        "caption": "Craftforge Logo"
      },
      "sameAs": [
        "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/",
        "https://www.instagram.com/craftforge.studio/"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://craftforge.studio/#localbusiness",
      "name": "Craftforge",
      "url": "https://craftforge.studio",
      "logo": "https://craftforge.studio/favicon.svg",
      "image": "https://craftforge.studio/super-pro-profile.webp",
      "description": "Craftforge is a founder-led creative studio and branding agency in India. We combine global craft standards with AI-native execution, forging premium brands, luxury packaging design, and high-performance digital products.",
      "telephone": "+919641547271",
      "email": "hello.craftforge.studio@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Co-Work Space, Sector 44",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122003",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4595,
        "longitude": 77.0266
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  ]
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124,58,237";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

const HERO_SERVICES = [
  { name: "FORGE / BRAND & IDENTITY", color: "#7C3AED", desc: "Brand strategy, visual identity systems, typography, naming, verbal identity, and guidelines designed to command a unique premium." },
  { name: "FORM / PACKAGING & PRODUCT", color: "#F97316", desc: "Luxury packaging design, fragrance packaging (e.g. flagship Midnight Queen Pure Parfum), beauty & cosmetics, and premium D2C packaging systems." },
  { name: "FIELD / WEB & DIGITAL", color: "#3B82F6", desc: "High performance React & Tailwind websites, custom Shopify ecommerce storefronts, and premium interactive digital products." },
  { name: "FORECAST / AI & MARKETING", color: "#10B981", desc: "Bespoke prompt engineering libraries, n8n/Make automation, and GEO (Generative Engine Optimization) aligned campaigns." },
];

const SERVICES = [
  { icon: Palette, title: "Forge / Brand & Identity", desc: "Cohesive brand systems, logos, typography, visual guidelines, and strategy designed to command a unique premium. We build the strategic foundation of your identity.", color: "#7C3AED", glow: "rgba(124,58,237,0.3)", canvasIdx: 0 },
  { icon: ShoppingBag, title: "Form / Packaging & Product", desc: "Flagship D2C beauty, fragrance (like Midnight Queen Pure Parfum), and food & beverage packaging designed to stand out on retail shelves and unboxing videos alike.", color: "#F97316", glow: "rgba(249,115,22,0.3)", canvasIdx: 4 },
  { icon: Globe, title: "Field / Web & Digital", desc: "High performance React & Tailwind websites, Webflow pages, custom Shopify setups, and premium digital products designed to convert visitors into loyal clients.", color: "#3B82F6", glow: "rgba(59,130,246,0.3)", canvasIdx: 2 },
  { icon: Cpu, title: "Forecast / AI & Marketing", desc: "Bespoke prompt engineering libraries, n8n/Make automation, and GEO aligned marketing systems that let you scale output up to 9x without increasing headcount.", color: "#10B981", glow: "rgba(16,185,129,0.3)", canvasIdx: 3 },
];

const STATS = [
  { end: "9×",    label: "Faster content production via AI",   color: "#7C3AED" },
  { end: "999+",  label: "AI powered assets delivered",         color: "#06B6D4" },
  { end: "67%",   label: "Less manual workload via automation", color: "#EC4899" },
  { end: "7+",    label: "Marketplaces scaled end to end",      color: "#10B981" },
];


function HeroTypewriter({ isDark }: { isDark: boolean }) {
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
        timer = setTimeout(() => { setIdx((i) => (i + 1) % HERO_SERVICES.length); setPhase("type"); }, 350);
      }
    }
    return () => clearTimeout(timer);
  }, [phase, charCount, service.name.length]);

  const descColor = isDark ? "rgba(255,255,255,0.55)" : "#64748B";
  const counterColor = isDark ? "rgba(255,255,255,0.30)" : "#94A3B8";
  const dotInactive = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative inline-flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `${service.color}${isDark ? "12" : "0E"}`,
            border: `1px solid ${service.color}${isDark ? "45" : "35"}`,
            boxShadow: `0 0 24px ${service.color}${isDark ? "30" : "20"}, 0 0 56px ${service.color}12`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "0.5rem 0",
            margin: "-0.5rem 0",
            opacity: charCount > 0 ? 1 : 0,
          }}
        />
        <div className="relative flex items-center gap-3 px-6 py-2">
          <span className="font-poppins font-bold text-xl md:text-2xl tracking-wide" style={{ color: service.color }}>
            {displayed}
            <span className="inline-block w-[2px] h-5 ml-0.5 rounded-sm align-middle"
              style={{ background: service.color, animation: "cur-blink 0.65s step-end infinite" }} />
          </span>
        </div>
      </div>

      <p className="text-sm md:text-base max-w-lg text-center leading-relaxed transition-opacity duration-500"
        style={{ color: descColor, opacity: showMeta ? 1 : 0 }}>
        {service.desc}
      </p>

      <p className="text-[11px] font-mono tracking-widest transition-opacity duration-500"
        style={{ color: counterColor, opacity: showMeta ? 1 : 0 }}>
        {String(idx + 1).padStart(2, "0")} / {String(HERO_SERVICES.length).padStart(2, "0")}
      </p>

      <div className="flex gap-1.5">
        {HERO_SERVICES.map((s, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{ width: i === idx ? "18px" : "6px", height: "6px", background: i === idx ? s.color : dotInactive }} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { isDark } = useTheme();

  // Horizontal scroll pin
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

  const { scrollYProgress: hScrollProgress } = useScroll({
    target: hScrollOuter,
    offset: ["start start", "end end"],
  });
  const hX = useTransform(hScrollProgress, [0, 1], [0, -xRange]);

  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "rgba(255,255,255,0.45)" : "#64748B";
  const cardBg      = (rgb: string, alpha: number) =>
    isDark ? `rgba(${rgb},${alpha})` : `rgba(255,255,255,${alpha + 0.5 > 1 ? 1 : alpha + 0.5})`;
  const cardBorder  = (hex: string) =>
    isDark ? hex + "44" : hex + "28";
  const cardShadow  = (hex: string) =>
    isDark ? `0 0 36px ${hex}18, inset 0 0 24px ${hex}08`
           : `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${hex}20`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="Craftforge | Branding Agency India & Luxury Packaging Design Studio"
        description="Founder-led premium boutique and AI-native creative studio in India. We combine global craft standards with AI-native execution to design premium brands, luxury packaging, and high-performance websites."
        schema={homeSchema}
      />
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-9 pb-10 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: isDark ? "rgba(124,58,237,0.10)" : "rgba(124,58,237,0.06)" }} />

        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-6 items-center text-center">
          <CyclingBadge label="AI Powered Creative Studio" animate={false} />

          <RevealText
            text="BRANDS FORGED BY INTENT ✦ BUILT WITH AI"
            className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-wide md:tracking-widest justify-center"
            style={{ color: textPrimary }}
            once={false}
          />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-full">
            <HeroTypewriter isDark={isDark} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: textMuted }}
          >
            Craftforge is a founder led, premium boutique <strong>branding agency in India</strong>. We combine global craft standards with <strong>AI native execution</strong> ✦ delivering high end <strong>luxury packaging design</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <span className="btn-lightning-wrap">
              <Link to="/portfolio"
                className="btn-electric group relative flex items-center gap-2 px-8 py-4 bg-brand-gradient rounded-full font-bold text-white transition-all overflow-hidden">
                SEE OUR WORK
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </span>
            <span className="btn-lightning-wrap btn-secondary btn-green">
              <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-8 py-4 border border-brand-green/40 rounded-full font-bold text-brand-green hover:bg-brand-green/10 transition-all overflow-hidden"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 0 20px rgba(16,185,129,0.18)",
                }}>
                <MessageCircle size={16} />
                LET'S TALK
              </a>
            </span>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: isDark ? "rgba(255,255,255,0.30)" : "#94A3B8" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* SERVICES — PINNED HORIZONTAL SCROLL */}
      <div ref={hScrollOuter} style={{ height: `${SERVICES.length * 100 + 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          {/* Section header */}
          <div className="text-center mb-8 px-6 flex-shrink-0">
            <CyclingBadge label="What We Build" className="mb-3" />
            <RevealText
              text="FOUR PILLARS OF PREMIUM CRAFT"
              className="font-poppins font-bold text-xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center"
              style={{ color: textPrimary }}
              once={false}
            />
            <p className="mt-2 max-w-xl mx-auto text-sm" style={{ color: textMuted }}>
              Cohesive brand strategy, luxury D2C packaging design, high performance web engineering, and generative AI operations designed to command your unique premium.
            </p>
          </div>

          {/* Horizontal track */}
          <div className="overflow-hidden flex-shrink-0">
            <motion.div
              ref={hScrollTrack}
              style={{ x: hX }}
              className="flex gap-6 pl-6 md:pl-12"
            >
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col rounded-[20px] overflow-hidden border transition-all duration-300"
                  style={{
                    width: "min(500px, 85vw)",
                    background: isDark ? `rgba(${hexToRgb(s.color)},0.07)` : "rgba(255,255,255,0.88)",
                    borderColor: cardBorder(s.color),
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: cardShadow(s.color),
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ background: `rgba(${hexToRgb(s.color)},${isDark ? "0.18" : "0.12"})`, color: s.color }}>
                        <s.icon size={22} />
                      </div>
                      <h3 className="font-poppins font-bold text-[19px] tracking-tight uppercase leading-tight"
                        style={{ color: textPrimary }}>{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{s.desc}</p>
                  </div>
                  <div className="mx-8" style={{ height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                  <div className="min-h-[200px] sm:min-h-[220px] relative overflow-hidden">
                    <ServiceCanvas index={s.canvasIdx} />
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

      {/* PROCESS */}
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
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)",
                  borderColor: color + "33",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isDark ? "none" : `0 4px 20px rgba(0,0,0,0.06)`,
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
            className="relative rounded-3xl p-7 sm:p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: isDark ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.90)",
              border: isDark ? "1px solid rgba(124,58,237,0.20)" : "1px solid rgba(124,58,237,0.18)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: isDark
                ? "0 0 40px rgba(124,58,237,0.12), inset 0 0 24px rgba(124,58,237,0.05)"
                : "0 8px 48px rgba(124,58,237,0.10), 0 0 0 1px rgba(124,58,237,0.10)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: isDark ? "rgba(124,58,237,0.20)" : "rgba(124,58,237,0.08)" }} />

            <div className="relative z-10">
              <RevealText
                text="READY TO COMMAND YOUR UNIQUE PREMIUM?"
                className="font-poppins font-bold text-2xl sm:text-3xl md:text-5xl leading-tight tracking-wide md:tracking-widest justify-center mb-4"
                style={{ color: textPrimary }}
                once={false}
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg mb-10 max-w-xl mx-auto"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                Let's forge your premium brand identity, luxury packaging, and high performance digital systems. High end craft meets AI native execution, built to scale.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative w-full sm:w-auto">
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-5 rounded-full"
                    style={{ background: "radial-gradient(ellipse,rgba(124,58,237,0.7) 0%,rgba(6,182,212,0.35) 50%,transparent 80%)", filter: "blur(8px)", animation: "btn-under-bloom 2.4s ease-in-out infinite" }} />
                  <Link to="/contact"
                    className="btn-electric relative flex items-center justify-center gap-3 px-10 py-4 bg-brand-gradient rounded-full font-bold text-white text-base overflow-hidden shadow-lg w-full sm:w-auto"
                    style={{ boxShadow: "0 0 28px rgba(124,58,237,0.45), 0 0 60px rgba(124,58,237,0.15)" }}>
                    <span className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: "linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.18) 55%,transparent 100%)", animation: "btn-sweep 4s ease-in-out infinite" }} />
                    <Zap size={17} />
                    START A NEW PROJECT
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative w-full sm:w-auto">
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-5 rounded-full"
                    style={{ background: "radial-gradient(ellipse,rgba(37,211,102,0.7) 0%,rgba(37,211,102,0.25) 50%,transparent 80%)", filter: "blur(8px)", animation: "btn-under-bloom 2.4s ease-in-out infinite" }} />
                  <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-white text-base overflow-hidden shadow-lg w-full sm:w-auto"
                    style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 0 28px rgba(37,211,102,0.45), 0 0 60px rgba(37,211,102,0.15)" }}>
                    <span className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: "linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.18) 55%,transparent 100%)", animation: "btn-sweep 4s ease-in-out infinite" }} />
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
