import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Linkedin, Instagram, ExternalLink, MessageCircle,
  Zap, Target, Rocket, Brain, ChevronDown,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jahiruddin Sekh",
  "jobTitle": "Founder & AI Creative Strategist",
  "worksFor": {
    "@type": "ProfessionalService",
    "name": "Craftforge",
    "url": "https://craftforge.studio"
  },
  "url": "https://craftforge.studio/about",
  "image": "https://craftforge.studio/super-pro-profile.webp",
  "sameAs": [
    "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/",
    "https://www.instagram.com/designerpro_plus/",
    "https://www.instagram.com/craftforge.studio/",
    "https://www.behance.net/Designer_Pro_Plus/"
  ]
};

const SKILLS = [
  "Brand Systems", "AI Prompt Libraries", "Luxury Packaging",
  "AI Content Strategy", "n8n Automation", "Vibe Coding",
  "Ecommerce Systems", "GEO Optimization", "Visual Identity",
  "Claude API", "Midjourney v7", "Adobe Suite",
];

const TOOL_COLOR: Record<string, string> = {
  "AI Image":    "#EC4899",
  "AI Video":    "#4F46E5",
  "Automation":  "#10B981",
  "AI LLM":      "#06B6D4",
  "Vibe Code":   "#3B82F6",
  "Commerce":    "#F59E0B",
  "Design":      "#7C3AED",
};

const TOOLS = [
  { name: "Midjourney v7",  category: "AI Image" },
  { name: "Adobe Firefly",  category: "AI Image" },
  { name: "Ideogram",       category: "AI Image" },
  { name: "Runway Gen-3",   category: "AI Video" },
  { name: "Kling",          category: "AI Video" },
  { name: "Veo",            category: "AI Video" },
  { name: "n8n",            category: "Automation" },
  { name: "Claude API",     category: "Automation" },
  { name: "Make",           category: "Automation" },
  { name: "Gemini API",     category: "AI LLM" },
  { name: "ChatGPT API",    category: "AI LLM" },
  { name: "React + Vite",   category: "Vibe Code" },
  { name: "Tailwind CSS",   category: "Vibe Code" },
  { name: "Shopify",        category: "Commerce" },
  { name: "Figma",          category: "Design" },
  { name: "Adobe Suite",    category: "Design" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Good Work Is a System, Not a One Off",
    desc: "Every deliverable we build is designed to be reusable, repeatable, and parseable. A logo without a prompt library is a decoration. A brand without a system is a one off.",
    color: "#7C3AED",
  },
  {
    icon: Target,
    title: "AI Removes Everything Between Taste and Output",
    desc: "AI doesn't replace human judgment ✦ it removes the production bottleneck between what you see in your head and what gets made. The taste stays yours. The grind gets automated.",
    color: "#F97316",
  },
  {
    icon: Brain,
    title: "Premium Is the Absence of Compromise",
    desc: "We say no to work we can't make genuinely premium. Not because we're precious, but because that refusal is the reason the yes work stays good.",
    color: "#10B981",
  },
  {
    icon: Rocket,
    title: "Consistency at Scale Is the Hardest Thing in Branding",
    desc: "So that's what we engineer ✦ not mood board consistency, but system level coherence across every touchpoint, codified in prompt libraries and automation pipelines.",
    color: "#3B82F6",
  },
];

const SOCIALS = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    handle: "Jahiruddin Sekh",
    href: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/",
    color: "#0A66C2",
  },
  {
    Icon: Instagram,
    label: "Instagram (Personal)",
    handle: "@designerpro_plus",
    href: "https://www.instagram.com/designerpro_plus/",
    color: "#E1306C",
  },
  {
    Icon: Instagram,
    label: "Craftforge Studio",
    handle: "@craftforge.studio",
    href: "https://www.instagram.com/craftforge.studio/",
    color: "#833AB4",
  },
  {
    Icon: ExternalLink,
    label: "Behance Portfolio",
    handle: "Designer_Pro_Plus",
    href: "https://www.behance.net/Designer_Pro_Plus/",
    color: "#1769FF",
  },
];

const ROLES = [
  { text: "AI SYSTEMS ARCHITECT",  color: "#7C3AED" },
  { text: "BRAND STRATEGIST",      color: "#F97316" },
  { text: "PACKAGING SPECIALIST",  color: "#3B82F6" },
  { text: "DIGITAL ENGINEER",      color: "#10B981" },
];

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setIndex((p) => (p + 1) % ROLES.length);
        setVisible(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const { text, color } = ROLES[index];
  const chars = text.split("");
  const center = (chars.length - 1) / 2;
  const maxDist = center || 1;
  const expandDuration = maxDist * 0.04 + 0.3;
  const collapseDuration = maxDist * 0.03 + 0.3;

  return (
    <div className="flex justify-center lg:justify-center">
      <div className="relative inline-flex justify-center items-center">
        {/* Color-synced glowing frame */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            scaleX: { duration: visible ? expandDuration : collapseDuration, ease: "easeOut" },
            opacity: { duration: 0.2, delay: visible ? 0 : collapseDuration - 0.1 },
          }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            transformOrigin: "center",
            background: `${color}15`,
            border: `1px solid ${color}45`,
            boxShadow: `0 0 18px ${color}30, 0 0 40px ${color}12`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "0.4rem 1.2rem",
            margin: "-0.4rem -1.2rem",
          }}
        />
        <span className="relative inline-flex justify-center font-poppins font-bold px-5 py-1.5 text-sm sm:text-base tracking-wide">
          {chars.map((char, i) => {
            const dist = Math.abs(i - center);
            const xOffset = (i < center ? 8 : i > center ? -8 : 0) * (dist / maxDist);
            return (
              <motion.span
                key={`${index}-${i}`}
                initial={{ opacity: 0, x: xOffset }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
                transition={{
                  duration: 0.3,
                  delay: visible ? dist * 0.035 : (maxDist - dist) * 0.025,
                  ease: "easeOut",
                }}
                className="inline-block"
                style={{ color }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>
      </div>
    </div>
  );
}

const BIO_ITEMS = [
  {
    label: "The Beginning",
    color: "#7C3AED",
    content: (textPrimary: string, textMuted: string) => (
      <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
        I didn't come into design through an art school or a holding company. I came in through the work ✦ and stayed because of what AI made possible.
      </p>
    ),
  },
  {
    label: "The Journey",
    color: "#F97316",
    content: (textPrimary: string, textMuted: string) => (
      <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
        I started in 2020 as a junior graphic designer at <strong style={{ color: textPrimary }}>WizePrint</strong>, a US-facing print on demand brand. Over five years I grew into running its operations and creative direction, scaling design output across three sub brands and six marketplaces. Somewhere in those years the real shift happened: I stopped thinking like a designer who uses tools, and started thinking like someone who builds the system the tools run inside.
      </p>
    ),
  },
  {
    label: "Today",
    color: "#10B981",
    content: (textPrimary: string, textMuted: string) => (
      <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
        Today I lead full digital output for <strong style={{ color: textPrimary }}>Bergamot Beauté</strong> ✦ India's first pure parfum D2C brand ✦ and deliver AI creative systems for early stage founders through <strong style={{ color: textPrimary }}>Secretto Agency</strong>. Craftforge is where all of that becomes one offer: a studio that treats your brand like a system worth engineering, not a deliverable to ship and forget.
      </p>
    ),
  },
  {
    label: "Skills & Expertise",
    color: "#3B82F6",
    content: (textPrimary: string, textMuted: string, isDark?: boolean) => (
      <div className="flex flex-wrap gap-2">
        {SKILLS.slice(0, 8).map((skill) => (
          <span key={skill}
            className="px-3 py-1.5 rounded-full text-xs font-medium uppercase"
            style={{
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              background: isDark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)",
              border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(59,130,246,0.20)",
              color: isDark ? "rgba(255,255,255,0.80)" : "#1E40AF",
            }}>
            {skill}
          </span>
        ))}
      </div>
    ),
  },
];

function BioAccordion({ isDark, textPrimary, textMuted }: { isDark: boolean; textPrimary: string; textMuted: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2 w-full">
      {BIO_ITEMS.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className="rounded-2xl overflow-hidden"
            style={{
              background: isOpen
                ? isDark ? `${item.color}12` : `${item.color}08`
                : isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              border: `1px solid ${item.color}${isOpen ? (isDark ? "35" : "25") : (isDark ? "18" : "12")}`,
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            {/* Trigger */}
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: item.color, opacity: isOpen ? 1 : 0.5 }} />
                <span className="text-[11px] font-bold tracking-widest uppercase"
                  style={{ color: isOpen ? item.color : isDark ? "rgba(255,255,255,0.55)" : "#64748B", transition: "color 0.25s ease" }}>
                  {item.label}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: isOpen ? item.color : isDark ? "rgba(255,255,255,0.25)" : "#94A3B8", flexShrink: 0 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="bio-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-4 pb-4 pt-1">
                    <div className="h-px mb-3" style={{ background: `${item.color}20` }} />
                    {item.content(textPrimary, textMuted, isDark)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function About() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";
  const cardBg      = (hex: string) => isDark ? `${hex}0d` : "rgba(255,255,255,0.88)";
  const cardBorder  = (hex: string) => `${hex}${isDark ? "33" : "20"}`;
  const cardShadow  = (hex: string) => isDark ? `0 0 36px ${hex}14, inset 0 0 20px ${hex}06` : `0 4px 20px rgba(0,0,0,0.06)`;

  const [valOpenIdx, setValOpenIdx] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="About | Founder & Lead Creative Strategist | Craftforge"
        description="Meet Jahiruddin Sekh, founder of Craftforge ✦ India's premier founder led premium boutique creative studio. He combines global craft standards with AI native execution to forge premium brands, packaging, and digital products for ambitious founders."
        schema={aboutSchema}
      />
      {/* Hero */}
      <section className="pt-4 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: isDark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.05)" }} />
        <div className="max-w-7xl mx-auto">
        {/* Single glowing frame */}
        <div
          className="relative rounded-3xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.90)",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: isDark
              ? "0 0 40px rgba(124,58,237,0.12), 0 0 80px rgba(79,70,229,0.08), inset 0 0 40px rgba(124,58,237,0.04)"
              : "0 8px 48px rgba(124,58,237,0.10), 0 0 0 1px rgba(124,58,237,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Profile Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            {/* extra bottom padding so floating badge isn't clipped on mobile */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full p-[3px]"
                style={{
                  background: "conic-gradient(from 0deg, #7C3AED, #4F46E5, #3B82F6, #7C3AED)",
                  animation: "profile-ring-rotate 8s linear infinite",
                }}
              >
                <div className="w-full h-full rounded-full bg-brand-dark" />
              </div>

              {/* Profile image */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden border border-white/10">
                <img
                  src="/super-pro-profile.webp"
                  alt="Jahiruddin Sekh"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{
                    background: ["#7C3AED", "#F97316", "#10B981", "#3B82F6"][i],
                    animation: `particle-orbit ${8 + i * 1.5}s linear infinite`,
                    animationDelay: `-${i * 2}s`,
                    marginTop: "-5px",
                    marginLeft: "-5px",
                    boxShadow: `0 0 10px ${["#7C3AED", "#F97316", "#10B981", "#3B82F6"][i]}`,
                  }}
                />
              ))}

            </div>
          </motion.div>

          {/* Bio */}
          <div className="flex flex-col gap-5 text-center lg:text-left -mt-8">
            <div>
              <RevealText text="JAHIR SEKH"
                className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl mb-2 justify-center lg:justify-center"
                style={{ color: textPrimary }} />
              <RoleCycler />
            </div>

            {/* Bio accordion */}
            <BioAccordion isDark={isDark} textPrimary={textPrimary} textMuted={textMuted} />

            <div className="flex flex-col sm:flex-row gap-4 mt-1 justify-center lg:justify-start">
              <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow">
                <MessageCircle size={16} /> WORK WITH ME
              </a>
              <Link to="/contact"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold transition-all"
                style={{
                  border: isDark ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(124,58,237,0.25)",
                  color: isDark ? "rgba(255,255,255,0.80)" : "#7C3AED",
                }}>
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Why Craftforge */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="What I Believe"
            title="THE PRINCIPLES WE FORGE ON"
            subtext="Four principles forged for ambitious founders who demand global craft standards. Shaping every project, pipeline, and pixel we produce."
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {VALUES.map(({ icon: Icon, title, desc, color }, i) => {
              const isOpen = valOpenIdx === i;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: isOpen ? cardBg(color) : isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)",
                    border: `1px solid ${color}${isOpen ? (isDark ? "35" : "25") : (isDark ? "15" : "10")}`,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: isOpen ? cardShadow(color) : "none",
                    transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-opacity duration-300"
                    style={{ background: color, opacity: isOpen ? 1 : 0.35 }} />

                  {/* Trigger */}
                  <button
                    onClick={() => setValOpenIdx(isOpen ? -1 : i)}
                    className="w-full pl-6 pr-5 py-4 flex items-center gap-4 text-left focus:outline-none"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: `${color}${isOpen ? (isDark ? "22" : "15") : (isDark ? "12" : "09")}`,
                        color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className="flex-1 font-poppins font-bold text-[13px] md:text-sm tracking-tight uppercase text-left transition-colors duration-300"
                      style={{ color: isOpen ? color : textPrimary }}
                    >
                      {title}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.26 }}
                      style={{ color: isOpen ? color : isDark ? "rgba(255,255,255,0.28)" : "#94A3B8", flexShrink: 0 }}
                    >
                      <ChevronDown size={17} />
                    </motion.div>
                  </button>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="val-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pl-6 pr-6 pb-5 pt-0">
                          <div className="h-px mb-3 ml-14" style={{ background: `${color}${isDark ? "25" : "18"}` }} />
                          <p className="text-sm leading-relaxed ml-14" style={{ color: textMuted }}>{desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="The Stack"
            title="THE STACK BEHIND THE WORK"
            subtext="The AI native toolkit powering every Craftforge project."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOOLS.map(({ name, category }, i) => {
              const col = TOOL_COLOR[category] ?? "#7C3AED";
              return (
              <motion.div key={name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}
                className="glass-card-hover rounded-2xl p-4 text-center flex flex-col gap-1.5"
                style={{
                  background: cardBg(col),
                  border: `1px solid ${cardBorder(col)}`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isDark ? `0 0 20px ${col}10` : `0 2px 12px rgba(0,0,0,0.05)`,
                }}>
                <span className="font-poppins font-semibold text-sm uppercase" style={{ color: textPrimary }}>{name}</span>
                <span className="text-[10px] font-medium uppercase" style={{ color: col }}>{category}</span>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            badge="Connect"
            title="FIND ME ONLINE"
            subtext="Follow the work, connect on projects, or just reach out ✦ based in Gurugram, Delhi NCR, working globally."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SOCIALS.map(({ Icon, label, handle, href, color }, i) => (
              <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl p-5 flex items-center gap-4 transition-all group"
                style={{
                  background: cardBg(color),
                  border: `1px solid ${cardBorder(color)}`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isDark ? `0 0 24px ${color}12` : "0 2px 12px rgba(0,0,0,0.06)",
                }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm uppercase" style={{ color: textPrimary }}>{label}</p>
                  <p className="text-xs truncate uppercase" style={{ color: textMuted }}>{handle}</p>
                </div>
                <ExternalLink size={14} className="flex-shrink-0" style={{ color: textMuted }} />
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 rounded-3xl p-8 text-center"
            style={{
              background: isDark ? "rgba(37,211,102,0.06)" : "rgba(37,211,102,0.05)",
              border: "1px solid rgba(37,211,102,0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: isDark ? "0 0 36px rgba(37,211,102,0.10)" : "0 4px 20px rgba(37,211,102,0.08)",
            }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
              <span className="font-poppins font-bold text-brand-green">OPEN TO NEW PROJECTS</span>
            </div>
            <p className="text-sm mb-6" style={{ color: textMuted }}>
              Currently accepting new clients. Let's forge something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919641547271" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3 bg-brand-green text-white rounded-full font-bold hover:opacity-90 transition-opacity">
                <MessageCircle size={16} /> WHATSAPP NOW
              </a>
              <Link to="/contact"
                className="flex items-center justify-center px-7 py-3 rounded-full font-bold transition-all"
                style={{
                  border: isDark ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(0,0,0,0.12)",
                  color: isDark ? "rgba(255,255,255,0.80)" : "#334155",
                }}>
                SEND A MESSAGE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
