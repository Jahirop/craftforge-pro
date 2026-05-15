import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Linkedin, Instagram, ExternalLink, MessageCircle,
  Zap, Target, Rocket, Brain,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";

const SKILLS = [
  "AI Graphic Design", "Prompt Engineering", "AI Video & Motion",
  "n8n Automation", "Make (Integromat)", "Vibe Code", "React + Tailwind",
  "Ecommerce Creative", "Brand Strategy", "Generative AI Systems",
  "Adobe Suite", "Figma", "Midjourney", "Stable Diffusion",
];

const TOOLS = [
  { name: "Midjourney", category: "AI Design" },
  { name: "Runway ML", category: "AI Video" },
  { name: "n8n", category: "Automation" },
  { name: "Make", category: "Automation" },
  { name: "Gemini", category: "AI LLM" },
  { name: "GPT-4o", category: "AI LLM" },
  { name: "React + Vite", category: "Vibe Code" },
  { name: "Tailwind CSS", category: "Vibe Code" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Adobe Firefly", category: "AI Design" },
  { name: "Figma", category: "Design" },
  { name: "Adobe Suite", category: "Design" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Speed Without Compromise",
    desc: "AI doesn't just make us faster — it lets us explore more ideas in the same time, so the final output is better, not just quicker.",
    color: "#7C3AED",
  },
  {
    icon: Target,
    title: "Results Over Aesthetics",
    desc: "Beautiful work is table stakes. Every creative decision is anchored to conversion, clarity, and the brand's actual goals.",
    color: "#F97316",
  },
  {
    icon: Brain,
    title: "Systems, Not One-Offs",
    desc: "We build reusable AI systems, not just single deliverables — so your brand's creative engine keeps running long after the project ends.",
    color: "#10B981",
  },
  {
    icon: Rocket,
    title: "AI-First, Always",
    desc: "Every workflow, every tool, every process starts with the question: how can AI make this better? We don't bolt AI on — it's the foundation.",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[70px]"
    >
      {/* Hero */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-brand-purple/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
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

              {/* Inner glow */}
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-indigo/20 flex items-center justify-center overflow-hidden border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-[#1A0A2E] to-[#0D0D1A] flex items-center justify-center">
                  {/* Initials fallback */}
                  <div className="text-6xl font-poppins font-bold text-gradient select-none">JS</div>
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: ["#7C3AED", "#F97316", "#10B981", "#3B82F6"][i],
                    animation: `particle-orbit ${8 + i * 1.5}s linear infinite`,
                    animationDelay: `-${i * 2}s`,
                    marginTop: "-6px",
                    marginLeft: "-6px",
                    boxShadow: `0 0 10px ${["#7C3AED", "#F97316", "#10B981", "#3B82F6"][i]}`,
                  }}
                />
              ))}

              {/* Badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 glass-card rounded-full border border-brand-purple/30 text-xs font-bold text-brand-purple whitespace-nowrap"
              >
                AI Creative Strategist
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-brand-purple/15 border border-brand-purple/25 rounded-full text-brand-purple text-[11px] font-bold uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                The Founder
              </motion.div>
              <RevealText
                text="Jahiruddin Sekh"
                className="text-white font-poppins font-bold text-4xl md:text-5xl mb-2"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-purple font-semibold text-lg"
              >
                AI Creative Strategist · Prompt Engineer · Vibe Code Builder
              </motion.p>
            </div>

            <div className="flex flex-col gap-4 text-brand-grey text-sm md:text-base leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I build AI-powered creative systems for brands that want to move faster than their competition.
                At Craftforge Pro, I've merged design thinking with cutting-edge AI tooling to deliver everything from
                complete brand visual systems to fully autonomous content pipelines.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                With <span className="text-white font-medium">1000+ AI-powered digital assets</span> delivered across
                6+ major marketplaces, I've seen firsthand how the right AI system can reduce creative workloads by
                67% while improving output quality — not just quantity.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                My approach is always <span className="text-brand-purple font-medium">systems over one-offs</span>.
                Every project I build becomes a repeatable asset your team can use long after we finish together.
              </motion.p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {SKILLS.slice(0, 8).map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-3 py-1.5 glass-card rounded-full text-xs font-medium text-white/80 border border-white/10"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-shadow"
              >
                <MessageCircle size={16} /> Work With Me
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 rounded-full font-bold text-white/80 hover:border-brand-purple/40 hover:text-white hover:bg-brand-purple/10 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Craftforge */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Why Craftforge"
            title="The Values We Build On"
            subtext="Four principles that shape every project, every pipeline, and every pixel we produce."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card glass-card-hover rounded-3xl p-8 flex gap-5 items-start relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15"
                  style={{ background: color }}
                />
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-poppins font-bold text-lg text-white mb-2"
                  >
                    {title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-brand-grey text-sm leading-relaxed"
                  >
                    {desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="The Stack"
            title="Tools We Use Daily"
            subtext="The AI-first toolkit powering every Craftforge project."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOOLS.map(({ name, category }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="glass-card glass-card-hover rounded-2xl p-4 text-center flex flex-col gap-1.5"
              >
                <span className="font-poppins font-semibold text-sm text-white">{name}</span>
                <span className="text-[10px] text-brand-purple font-medium">{category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            badge="Connect"
            title="Find Me Online"
            subtext="Follow the work, connect for collabs, or just say hi."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SOCIALS.map(({ Icon, label, handle, href, color }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 border border-white/07 hover:border-white/15 transition-colors group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white">{label}</p>
                  <p className="text-brand-grey text-xs truncate">{handle}</p>
                </div>
                <ExternalLink size={14} className="text-brand-grey group-hover:text-white transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-card rounded-3xl p-8 text-center border border-brand-green/20"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
              <span className="font-poppins font-bold text-brand-green">Open to New Projects</span>
            </div>
            <p className="text-brand-grey text-sm mb-6">
              Currently accepting new clients. Let's build something intelligent together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3 bg-brand-green text-white rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={16} /> WhatsApp Now
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center px-7 py-3 border border-white/20 rounded-full font-bold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
