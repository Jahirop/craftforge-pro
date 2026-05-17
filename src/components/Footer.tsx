import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Linkedin, Instagram, ExternalLink, MessageCircle } from "lucide-react";

const LogoSvg = ({ col, colNext, size = 32 }: { col: string; colNext: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="ft-lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={col} />
        <stop offset="100%" stopColor={colNext} />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#ft-lg)" />
    <path d="M11 4 L22 4 L16 14 L21 14 L10 28 L13 17 L8 17 Z" fill="white" opacity="0.95" />
  </svg>
);

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

const SOCIALS = [
  { Icon: Linkedin,    href: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/", label: "LinkedIn" },
  { Icon: Instagram,   href: "https://www.instagram.com/designerpro_plus/",            label: "Instagram" },
  { Icon: Instagram,   href: "https://www.instagram.com/craftforge.studio/",           label: "Craftforge IG" },
  { Icon: ExternalLink,href: "https://www.behance.net/Designer_Pro_Plus/",             label: "Behance" },
];

export default function Footer() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % COLORS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="border-t border-white/5 bg-brand-dark/80 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto px-6 py-14 flex flex-col items-center gap-8 text-center">

        {/* ── Logo + Brand ── */}
        <div className="flex items-center gap-2">
          <div style={{ filter: `drop-shadow(0 0 8px ${COLORS[idx]}88)`, transition: "filter 0.8s ease" }}>
            <LogoSvg col={COLORS[idx]} colNext={COLORS[(idx + 1) % COLORS.length]} size={32} />
          </div>
          <span
            className="font-poppins font-bold text-xl"
            style={{ color: COLORS[idx], transition: "color 0.8s ease" }}
          >
            Craftforge Pro
          </span>
        </div>

        {/* ── Description ── */}
        <p className="text-brand-grey text-sm leading-relaxed max-w-sm">
          AI powered creative studio building intelligent brands at scale.
          From prompt to production faster, smarter, better.
        </p>

        {/* ── Social icons ── */}
        <div className="flex gap-4 justify-center">
          {SOCIALS.map(({ Icon, href, label }, i) => {
            const color = COLORS[(idx + i * 2) % COLORS.length];
            return (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -5, scale: 1.14 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden group"
                style={{
                  border: `1px solid ${color}45`,
                  background: `${color}14`,
                  boxShadow: `0 0 14px ${color}22`,
                  transition: "border-color 0.8s ease, background 0.8s ease, box-shadow 0.8s ease",
                }}
              >
                {/* Gradient fill on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
                />
                {/* Translucent sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Ambient glow halo */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: color, filter: "blur(10px)", zIndex: -1 }}
                />
                <Icon
                  size={16}
                  className="relative z-10 transition-colors duration-200"
                  style={{ color: color, transition: "color 0.8s ease" }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* ── Divider ── */}
        <div className="w-full border-t border-white/5" />

        {/* ── Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Start a New Project */}
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative"
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
              className="btn-electric relative flex items-center gap-3 px-10 py-4 bg-brand-gradient rounded-full font-bold text-white text-base overflow-hidden shadow-lg"
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
            className="relative"
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
              className="relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-base overflow-hidden shadow-lg"
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
    </footer>
  );
}
