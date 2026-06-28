import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LogoSvg = ({ col, colNext, size = 32 }: { col: string; colNext: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="nav-lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={col} />
        <stop offset="100%" stopColor={colNext} />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#nav-lg)" />
    <path d="M11 4 L22 4 L16 14 L21 14 L10 28 L13 17 L8 17 Z" fill="white" opacity="0.95" />
  </svg>
);

const LOGO_WORDS = ["Craftforge", "AI Native Studio", "Branding, Forged", "Premium by Craft", "Craftforge Studio"];
const CYCLE_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];

function Logo() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [pause, setPause] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    const ct = setInterval(() => setColorIdx((i) => (i + 1) % CYCLE_COLORS.length), 1800);
    return () => clearInterval(ct);
  }, []);

  useEffect(() => {
    if (pause) return;
    if (subIndex === LOGO_WORDS[index].length + 1 && !reverse) {
      setPause(true);
      setTimeout(() => { setReverse(true); setPause(false); }, 1500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((p) => (p + 1) % LOGO_WORDS.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((p) => p + (reverse ? -1 : 1)),
      reverse ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, pause]);

  const col = CYCLE_COLORS[colorIdx];
  const colNext = CYCLE_COLORS[(colorIdx + 1) % CYCLE_COLORS.length];

  return (
    <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
      <div style={{ filter: `drop-shadow(0 0 8px ${col}88)`, transition: "filter 0.8s ease" }}>
        <LogoSvg col={col} colNext={colNext} size={32} />
      </div>
      <span className="font-poppins font-bold text-xl tracking-tight" style={{ color: col, transition: "color 0.8s ease" }}>
        {LOGO_WORDS[index].substring(0, subIndex)}
        <span style={{ color: col, opacity: 0.7 }}>|</span>
      </span>
    </Link>
  );
}

const RING_R = 13;
const RING_C = 2 * Math.PI * RING_R;

function ThemeToggleIcon() {
  const { isDark, toggleTheme, isTransitioning, transitionProgress } = useTheme();

  const secsLeft = isTransitioning ? Math.max(0, Math.ceil((1 - transitionProgress) * 3)) : null;
  const ringOffset = isTransitioning ? RING_C * transitionProgress : RING_C;

  return (
    <motion.button
      onClick={isTransitioning ? undefined : toggleTheme}
      whileHover={isTransitioning ? {} : { scale: 1.12 }}
      whileTap={isTransitioning ? {} : { scale: 0.90 }}
      aria-label={isTransitioning ? "Theme transition in progress" : isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-all duration-300"
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(124,58,237,0.10)",
        border: isDark ? "1.5px solid rgba(255,255,255,0.15)" : "1.5px solid rgba(124,58,237,0.30)",
        boxShadow: isDark ? "0 0 10px rgba(255,255,255,0.08)" : "0 0 10px rgba(124,58,237,0.18)",
        color: isDark ? "#e2e8f0" : "#7C3AED",
        cursor: isTransitioning ? "not-allowed" : "pointer",
      }}
    >
      {isTransitioning ? (
        <>
          <svg width="36" height="36" viewBox="0 0 36 36"
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle cx="18" cy="18" r={RING_R} fill="none"
              stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(124,58,237,0.15)"}
              strokeWidth="2.5" />
            <circle cx="18" cy="18" r={RING_R} fill="none"
              stroke={isDark ? "#e2e8f0" : "#7C3AED"}
              strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={RING_C} strokeDashoffset={ringOffset}
              style={{ transition: "stroke-dashoffset 0.1s linear" }} />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: isDark ? "#e2e8f0" : "#7C3AED", lineHeight: 1, zIndex: 1 }}>
            {secsLeft}
          </span>
        </>
      ) : (
        isDark ? <Sun size={15} /> : <Moon size={15} />
      )}
    </motion.button>
  );
}

const NAV_LINKS = [
  { to: "/",          label: "HOME"      },
  { to: "/services",  label: "SERVICES"  },
  { to: "/portfolio", label: "PORTFOLIO" },
  { to: "/about",     label: "ABOUT"     },
  { to: "/contact",   label: "CONTACT"   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg     = isDark ? `rgba(7,7,15,${scrolled ? 0.92 : 0.55})`  : `rgba(248,249,255,${scrolled ? 0.97 : 0.85})`;
  const navBorder = isDark ? "rgba(255,255,255,0.10)"                    : "rgba(124,58,237,0.15)";
  const navShadow = isDark
    ? "0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset"
    : "0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset";
  const linkClr   = isDark ? { active: "#7C3AED", def: "rgba(255,255,255,0.70)" }
                           : { active: "#7C3AED", def: "#475569" };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">

      {/* ── Nav pill ── */}
      <div className="w-full flex justify-center px-4 pt-2">
        <nav
          className="relative flex items-center justify-between px-4 sm:px-5 md:px-6 h-[58px] rounded-2xl border w-full max-w-[960px]"
          style={{
            backgroundColor: navBg,
            borderColor: navBorder,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: navShadow,
            transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Left: Logo */}
          <Logo />

          {/* Right: page links + controls */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Desktop page links on RIGHT */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className="relative px-3 py-1.5 text-[12px] font-semibold tracking-wide transition-colors group rounded-lg"
                  style={({ isActive }) => ({
                    color: isActive ? linkClr.active : linkClr.def,
                    background: isActive
                      ? isDark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)"
                      : "transparent",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-brand-purple rounded-full transition-all duration-300 ${isActive ? "w-4" : "w-0 group-hover:w-4"}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-5 flex-shrink-0"
              style={{ background: navBorder }} />

            {/* Theme toggle */}
            <ThemeToggleIcon />

            {/* CTA */}
            <motion.a
              href="https://wa.me/919641547271"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-brand-gradient rounded-full text-sm font-bold text-white flex-shrink-0"
              style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.30)" }}
            >
              <Zap size={14} /> LET'S FORGE
            </motion.a>

            {/* Mobile: hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isDark ? "#e2e8f0" : "#0F172A" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl border flex flex-col md:hidden overflow-hidden"
                style={{
                  background: isDark ? "rgba(7,7,15,0.97)" : "rgba(248,249,255,0.98)",
                  borderColor: navBorder,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.12)",
                }}
              >
                {/* Nav links */}
                <div className="px-6 pt-5 pb-2 flex flex-col gap-1">
                  {NAV_LINKS.map(({ to, label }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink
                        to={to}
                        end={to === "/"}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold transition-all"
                        style={({ isActive }) => ({
                          color: isActive ? "#7C3AED" : linkClr.def,
                          background: isActive
                            ? isDark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)"
                            : "transparent",
                        })}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#7C3AED", opacity: 0.5 }} />
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 pt-3" style={{ borderTop: `1px solid ${navBorder}` }}>
                  <a
                    href="https://wa.me/919641547271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-brand-gradient rounded-full font-bold text-center text-white flex items-center justify-center gap-2"
                  >
                    <Zap size={14} /> LET'S FORGE
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
}
