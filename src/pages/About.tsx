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


      {/* Why Craftforge */}
      <section className="pt-10 pb-24 px-6 md:px-12 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="What We Believe"
            title="THE PRINCIPLES WE FORGE ON"
            subtext="Four principles forged for ambitious founders who demand global craft standards. Shaping every project, pipeline, and pixel we produce."
          />
          
          <div className="flex justify-center mb-12">
            <Link to="/hub"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow text-xs sm:text-sm uppercase tracking-wider"
            >
              Visit HUB
            </Link>
          </div>

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
            title="FIND US ONLINE"
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
