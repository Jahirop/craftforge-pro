import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Linkedin, Instagram, ExternalLink, MessageCircle } from "lucide-react";

const SOCIALS = [
  {
    Icon: Linkedin,
    href:     "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/",
    label:    "LinkedIn",
    gradient: "linear-gradient(135deg,#0077B5,#00A0DC)",
    glow:     "rgba(0,119,181,0.6)",
  },
  {
    Icon: Instagram,
    href:     "https://www.instagram.com/designerpro_plus/",
    label:    "Instagram",
    gradient: "linear-gradient(135deg,#E1306C,#F77737)",
    glow:     "rgba(225,48,108,0.6)",
  },
  {
    Icon: Instagram,
    href:     "https://www.instagram.com/craftforge.studio/",
    label:    "Craftforge IG",
    gradient: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
    glow:     "rgba(131,58,180,0.55)",
  },
  {
    Icon: ExternalLink,
    href:     "https://www.behance.net/Designer_Pro_Plus/",
    label:    "Behance",
    gradient: "linear-gradient(135deg,#1769FF,#005FFF)",
    glow:     "rgba(23,105,255,0.55)",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-dark/80 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto px-6 py-14 flex flex-col items-center gap-8 text-center">

        {/* ── Logo + Brand ── */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-poppins font-bold text-xl text-gradient">Craftforge Pro</span>
        </div>

        {/* ── Description ── */}
        <p className="text-brand-grey text-sm leading-relaxed max-w-sm">
          AI-powered creative studio building intelligent brands at scale.
          From prompt to production — faster, smarter, better.
        </p>

        {/* ── Social icons ── */}
        <div className="flex gap-4 justify-center">
          {SOCIALS.map(({ Icon, href, label, gradient, glow }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -5, scale: 1.14 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden group"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Dark base */}
              <div className="absolute inset-0 bg-white/4" />
              {/* Gradient fill on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
              />
              {/* Translucent sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Ambient glow halo */}
              <motion.div
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient, filter: "blur(10px)", zIndex: -1 }}
              />
              <Icon
                size={16}
                className="relative z-10 text-white/55 group-hover:text-white transition-colors duration-200"
              />
            </motion.a>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="w-full border-t border-white/5" />

        {/* ── Get In Touch heading ── */}
        <p className="text-xs font-bold uppercase tracking-widest text-brand-grey">
          Get In Touch
        </p>

        {/* ── Glowing CTA button ── */}
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="relative"
        >
          {/* Under-glow bloom */}
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
            {/* Sweep shimmer */}
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.18) 55%,transparent 100%)",
                animation: "btn-sweep 4s ease-in-out infinite",
              }}
            />
            <Zap size={17} />
            Start a Project
          </Link>
        </motion.div>

        {/* ── WhatsApp secondary link ── */}
        <motion.a
          href="https://wa.me/919641547271"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, color: "#25D366" }}
          className="flex items-center gap-2 text-sm text-brand-grey transition-colors"
        >
          <MessageCircle size={14} />
          or chat on WhatsApp
        </motion.a>

      </div>
    </footer>
  );
}
