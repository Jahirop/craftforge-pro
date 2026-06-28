import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, Linkedin, Instagram, ExternalLink, MessageCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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

const COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];

const SOCIALS = [
  { Icon: Linkedin,    href: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/", label: "LinkedIn" },
  { Icon: Instagram,   href: "https://www.instagram.com/designerpro_plus/",            label: "Instagram" },
  { Icon: Instagram,   href: "https://www.instagram.com/craftforge.studio/",           label: "Craftforge IG" },
  { Icon: ExternalLink,href: "https://www.behance.net/Designer_Pro_Plus/",             label: "Behance" },
];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % COLORS.length), 1800);
    return () => clearInterval(t);
  }, []);

  const borderTop = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const footerBg  = isDark ? "rgba(7,7,15,0.80)"      : "rgba(241,245,249,0.95)";
  const descColor = isDark ? "#94A3B8"                 : "#64748B";
  const divider   = isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.06)";

  return (
    <footer
      className="backdrop-blur-xl"
      style={{ borderTop: `1px solid ${borderTop}`, background: footerBg, transition: "background 0.3s ease" }}
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-14 sm:py-16 flex flex-col items-center gap-8 text-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div style={{ filter: `drop-shadow(0 0 8px ${COLORS[idx]}88)`, transition: "filter 0.8s ease" }}>
            <LogoSvg col={COLORS[idx]} colNext={COLORS[(idx + 1) % COLORS.length]} size={32} />
          </div>
          <span className="font-poppins font-bold text-xl" style={{ color: COLORS[idx], transition: "color 0.8s ease" }}>
            Craftforge Pro
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: descColor }}>
          AI powered creative studio building intelligent brands at scale. From prompt to production faster, smarter, better.
        </p>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
          {[
            { to: "/",             label: "Home"           },
            { to: "/services",     label: "Services"       },
            { to: "/portfolio",    label: "Portfolio"      },
            { to: "/about",        label: "About"          },
            { to: "/contact",      label: "Contact"        },
            { to: "/privacy-policy", label: "Privacy Policy" },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="text-xs font-medium transition-colors hover:text-brand-purple"
              style={{ color: descColor }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Socials */}
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
                  background: isDark ? `${color}14` : `${color}10`,
                  boxShadow: isDark ? `0 0 14px ${color}22` : `0 2px 10px ${color}18`,
                  transition: "border-color 0.8s ease, background 0.8s ease, box-shadow 0.8s ease",
                }}
              >
                <Icon size={16} className="relative z-10 transition-colors duration-200" style={{ color, transition: "color 0.8s ease" }} />
              </motion.a>
            );
          })}
        </div>


      </div>
    </footer>
  );
}
