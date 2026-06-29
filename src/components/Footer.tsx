import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div style={{ filter: `drop-shadow(0 0 8px ${COLORS[idx]}88)`, transition: "filter 0.8s ease" }}>
            <LogoSvg col={COLORS[idx]} colNext={COLORS[(idx + 1) % COLORS.length]} size={24} />
          </div>
          <span className="font-poppins font-bold text-base" style={{ color: COLORS[idx], transition: "color 0.8s ease" }}>
            Craftforge Pro
          </span>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center">
          {[
            { to: "/",             label: "Home"           },
            { to: "/services",     label: "Services"       },
            { to: "/portfolio",    label: "Portfolio"      },
            { to: "/about",        label: "About"          },
            { to: "/contact",      label: "Contact"        },
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/hub",            label: "Hub"            },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="text-xs font-medium transition-colors hover:text-brand-purple"
              style={{ color: descColor }}>
              {label}
            </Link>
          ))}
        </div>




      </div>
    </footer>
  );
}
