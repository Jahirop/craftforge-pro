import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isTransitioning: boolean;
  transitionProgress: number;        // 0 → 1 over 7 seconds
  transitionDir: "to-light" | "to-dark" | null;
}

const TRANSITION_MS = 3000;

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  isTransitioning: false,
  transitionProgress: 0,
  transitionDir: null,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem("cf-theme");
      return stored ? stored === "dark" : true;
    } catch {
      return true;
    }
  });

  const [isTransitioning, setIsTransitioning]     = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionDir, setTransitionDir]           = useState<"to-light" | "to-dark" | null>(null);

  const rafRef         = useRef(0);
  const startRef       = useRef(0);
  const hasSwitchedRef = useRef(false);
  const transRef       = useRef(false);   // shadow of isTransitioning for callback closure

  useEffect(() => {
    try { localStorage.setItem("cf-theme", isDark ? "dark" : "light"); } catch {}
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    if (transRef.current) return;          // locked during transition

    const dir: "to-light" | "to-dark" = isDark ? "to-light" : "to-dark";
    transRef.current = true;
    hasSwitchedRef.current = false;
    startRef.current = performance.now();

    setTransitionDir(dir);
    setIsTransitioning(true);
    setTransitionProgress(0);

    const animate = (now: number) => {
      const progress = Math.min((now - startRef.current) / TRANSITION_MS, 1);
      setTransitionProgress(progress);

      // Flip the actual theme at 82 % — the overlay is fully opaque then
      if (progress >= 0.82 && !hasSwitchedRef.current) {
        hasSwitchedRef.current = true;
        setIsDark((p) => !p);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        transRef.current = false;
        setIsTransitioning(false);
        setTransitionProgress(0);
        setTransitionDir(null);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [isDark]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isTransitioning, transitionProgress, transitionDir }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
