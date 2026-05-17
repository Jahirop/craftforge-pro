import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { Menu, X, Zap } from "lucide-react";

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
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LOGO_WORDS = ["Craftforge", "Pro Studio", "AI Creative", "Craftforge"];
const CYCLE_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];

const Logo = () => {
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
      setTimeout(() => {
        setReverse(true);
        setPause(false);
      }, 1500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((p) => (p + 1) % LOGO_WORDS.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((p) => p + (reverse ? -1 : 1)),
      reverse ? 40 : 80
    );
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, pause]);

  const col = CYCLE_COLORS[colorIdx];
  const colNext = CYCLE_COLORS[(colorIdx + 1) % CYCLE_COLORS.length];

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div style={{ filter: `drop-shadow(0 0 8px ${col}88)`, transition: "filter 0.8s ease" }}>
        <LogoSvg col={col} colNext={colNext} size={32} />
      </div>
      <span
        className="font-poppins font-bold text-xl tracking-tight"
        style={{ color: col, transition: "color 0.8s ease" }}
      >
        {LOGO_WORDS[index].substring(0, subIndex)}
        <span style={{ color: col, opacity: 0.7 }}>|</span>
      </span>
    </Link>
  );
};

const NAV_LINKS = [
  { to: "/", label: "HOME" },
  { to: "/services", label: "SERVICES" },
  { to: "/portfolio", label: "PORTFOLIO" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0.55, 0.92]);
  const backgroundColor = useMotionTemplate`rgba(7, 7, 15, ${bgOpacity})`;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        className="relative flex items-center justify-between px-5 md:px-7 h-[58px] rounded-2xl border border-white/10 w-full max-w-[900px]"
        style={{
          backgroundColor,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        <Logo />

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors group ${
                  isActive ? "text-brand-purple" : "text-white/70 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-brand-purple rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <motion.a
          href="https://wa.me/919641547271"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 bg-brand-gradient rounded-full text-sm font-bold text-white shadow-lg shadow-brand-purple/25"
        >
          <Zap size={14} /> LET'S BUILD
        </motion.a>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl border border-white/10 p-6 flex flex-col gap-5 md:hidden"
              style={{
                background: "rgba(7,7,15,0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive ? "text-brand-purple" : "hover:text-brand-purple"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="https://wa.me/919641547271"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-gradient rounded-full font-bold text-center"
              >
                LET'S BUILD
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
