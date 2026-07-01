import { useState, useEffect, type ReactElement, type CSSProperties } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  Linkedin, Instagram, Youtube, Facebook, Phone,
  Briefcase, GraduationCap, Award, Languages,
  MapPin, CheckCircle2, BookOpen, Sparkles, ChevronRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import RevealText from "../components/RevealText";
import { trackHubClick, trackHubView, type HubLinkGroup } from "../lib/hubAnalytics";

/* ── Brand icons lucide doesn't ship (fill = currentColor, colored by parent) ── */
type IconProps = { size?: number };
const Svg = ({ size = 18, d }: { size?: number; d: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);
const Behance = (p: IconProps) => <Svg {...p} d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.481 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />;
const Dribbble = (p: IconProps) => <Svg {...p} d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm7.917 5.534A10.18 10.18 0 0122.27 11.9c-.327-.067-3.605-.733-6.905-.318-.073-.18-.146-.36-.226-.54-.2-.474-.42-.94-.654-1.394 3.638-1.48 5.29-3.616 5.432-3.794zM12 1.74c2.605 0 4.99.977 6.8 2.583-.12.17-1.61 2.16-5.13 3.48C11.99 4.86 10.05 2.36 9.75 1.98A10.2 10.2 0 0112 1.74zM7.84 2.66c.285.388 2.19 2.9 3.69 5.85-4.66 1.24-8.78 1.22-9.22 1.21A10.29 10.29 0 017.84 2.66zM1.74 12.02v-.31c.43.01 5.27.07 10.24-1.42.286.557.556 1.124.806 1.7l-.39.112C7.2 13.86 4.382 18.58 4.146 18.98A10.2 10.2 0 011.74 12.02zm10.26 10.24c-2.36 0-4.535-.81-6.26-2.16.185-.378 2.28-4.42 8.124-6.46l.067-.022c1.43 3.71 2.02 6.823 2.17 7.715a10.18 10.18 0 01-4.1.927zm5.77-1.85c-.104-.624-.647-3.6-1.976-7.26 3.11-.497 5.83.32 6.168.43a10.21 10.21 0 01-4.192 6.83z" />;
const Pinterest = (p: IconProps) => <Svg {...p} d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />;
const XLogo = (p: IconProps) => <Svg {...p} d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />;
const WhatsApp = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 346 346" fill="currentColor" aria-hidden="true">
    <path d="M173,0C77.45,0,0,77.45,0,173c0,31.43,8.38,60.91,23.04,86.31L0,346l89.87-21.25c24.67,13.54,53,21.25,83.13,21.25,95.55,0,173-77.45,173-173S268.55,0,173,0ZM173,315.01c-28.91,0-55.81-8.64-78.24-23.48l-53.1,13.52,14.89-50.75c-16.11-23.03-25.56-51.06-25.56-81.3,0-78.43,63.58-142.01,142.01-142.01s142.01,63.58,142.01,142.01-63.58,142.01-142.01,142.01Z" />
    <path d="M213.54,195.84l41.86,19.73c1.92.91,3.15,2.85,2.98,4.97-.45,5.51-2.66,16.55-12.56,26.44-27.93,27.93-78.09-3.67-80.13-4.89-12.34-6.63-24.06-15.49-35.17-26.61-11.11-11.11-19.98-22.84-26.61-35.17-1.22-2.04-32.82-52.19-4.89-80.13,9.9-9.9,20.93-12.1,26.44-12.56,2.12-.17,4.07,1.06,4.97,2.98l19.73,41.86c.93,1.98.52,4.33-1.02,5.88l-14.71,14.71c-3.18,3.18-4.12,8.13-1.92,12.06,5.37,9.63,12.59,18.9,20.95,27.43,8.53,8.36,17.8,15.58,27.43,20.95,3.93,2.19,8.88,1.26,12.06-1.92l14.71-14.71c1.55-1.55,3.9-1.96,5.88-1.02Z" />
  </svg>
);

/* ── Data ── */
type Item = { platform: string; name: string; url: string; color: string; Icon: (p: IconProps) => ReactElement };

const CALL = "tel:+919641547271";

// Inner ring — three segments (core platforms).
const CORE: Item[] = [
  { platform: "behance",   name: "Behance",   url: "https://www.behance.net/Designer_Pro_Plus", color: "#1769FF", Icon: Behance },
  { platform: "pinterest", name: "Pinterest", url: "https://in.pinterest.com/DesignerPro_Plus",  color: "#E60023", Icon: Pinterest },
  { platform: "linkedin",  name: "LinkedIn",  url: "https://www.linkedin.com/in/jahiruddin-sekh-5535b023b/", color: "#0A66C2", Icon: Linkedin as unknown as (p: IconProps) => ReactElement },
];

// Outer ring — the rest of the social web (smaller).
const SOCIAL: Item[] = [
  { platform: "instagram", name: "Instagram", url: "https://www.instagram.com/designerpro_plus/", color: "#E4405F", Icon: Instagram as unknown as (p: IconProps) => ReactElement },
  { platform: "youtube",   name: "YouTube",   url: "https://youtube.com/@designerpro_plus/",       color: "#FF0000", Icon: Youtube as unknown as (p: IconProps) => ReactElement },
  { platform: "dribbble",  name: "Dribbble",  url: "https://dribbble.com/Designer_Pro_Plus",       color: "#EA4C89", Icon: Dribbble },
  { platform: "facebook",  name: "Facebook",  url: "https://www.facebook.com/DesignerPro.Plus/",   color: "#1877F2", Icon: Facebook as unknown as (p: IconProps) => ReactElement },
  { platform: "x",         name: "X (Twitter)", url: "https://x.com/DesignerPro_X",                color: "#9CA3AF", Icon: XLogo },
  { platform: "whatsapp",  name: "WhatsApp",  url: "https://wa.me/919641547271",                   color: "#25D366", Icon: WhatsApp },
];

const COLORS = ["#7C3AED", "#4F46E5", "#3B82F6", "#F97316", "#10B981", "#06B6D4", "#EC4899", "#F59E0B"];

/* ── Geometry helpers ── */
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function donutSeg(c: number, ri: number, ro: number, a0: number, a1: number) {
  const o0 = polar(c, c, ro, a0), o1 = polar(c, c, ro, a1);
  const i1 = polar(c, c, ri, a1), i0 = polar(c, c, ri, a0);
  const large = (a1 - a0) % 360 > 180 ? 1 : 0;
  return `M ${o0.x.toFixed(2)} ${o0.y.toFixed(2)} A ${ro} ${ro} 0 ${large} 1 ${o1.x.toFixed(2)} ${o1.y.toFixed(2)} ` +
         `L ${i1.x.toFixed(2)} ${i1.y.toFixed(2)} A ${ri} ${ri} 0 ${large} 0 ${i0.x.toFixed(2)} ${i0.y.toFixed(2)} Z`;
}

/* ── One segmented rotating ring (translucent glossy segments + counter-rotating glowing logos) ── */
function SegRing({ items, ri, ro, c, spin, counter, gap, iconSize, group, reduce }: {
  items: Item[]; ri: number; ro: number; c: number; spin: string; counter: string; gap: number; iconSize: number; group: HubLinkGroup; reduce: boolean | null;
}) {
  const [hov, setHov] = useState<number | null>(null);
  const seg = 360 / items.length;
  const rmid = (ri + ro) / 2;

  return (
    <div className="pf-spin absolute inset-0 pointer-events-none" style={{ animation: reduce ? undefined : spin }}>
      <svg width={c * 2} height={c * 2} viewBox={`0 0 ${c * 2} ${c * 2}`} className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          {items.map((it, i) => (
            <linearGradient key={i} id={`grad-${group}-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={it.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor={it.color} stopOpacity="0.14" />
            </linearGradient>
          ))}
        </defs>
        {items.map((it, i) => {
          const a0 = -90 + i * seg + gap / 2;
          const a1 = -90 + (i + 1) * seg - gap / 2;
          const isHot = hov === i;
          return (
            <a key={it.platform} href={it.url} target="_blank" rel="noopener noreferrer"
              aria-label={it.name} onClick={() => trackHubClick(it.platform, it.url, group)}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer", pointerEvents: "auto" }}>
              <path
                d={donutSeg(c, ri, ro, a0, a1)}
                fill={`url(#grad-${group}-${i})`}
                stroke={`${it.color}${isHot ? "ff" : "99"}`}
                strokeWidth={isHot ? 2 : 1.25}
                style={{ filter: isHot ? `brightness(1.35) drop-shadow(0 0 16px ${it.color})` : `drop-shadow(0 0 7px ${it.color}88)`, transition: "filter 0.25s ease, stroke-width 0.25s ease" }}
              />
            </a>
          );
        })}
      </svg>

      {/* Logos — counter-rotate to stay upright, glow their own colour */}
      {items.map((it, i) => {
        const mid = -90 + i * seg + seg / 2;
        const p = polar(c, c, rmid, mid);
        const isHot = hov === i;
        return (
          <div key={it.platform} className="absolute pointer-events-none" style={{ left: p.x, top: p.y, transform: "translate(-50%,-50%)" }}>
            <span className="pf-spin block" style={{ animation: reduce ? undefined : counter }}>
              <span className="block" style={{ color: "#fff", filter: `drop-shadow(0 0 ${isHot ? 12 : 7}px ${it.color})`, transform: `scale(${isHot ? 1.18 : 1})`, transition: "transform 0.25s ease, filter 0.25s ease" }}>
                <it.Icon size={iconSize} />
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Dial({ cycle, reduce }: { cycle: string; reduce: boolean | null }) {
  const D = 380, C = 190;

  return (
    <div className="pf-dial relative" style={{ width: D, height: D }}>
      {/* Soft cycling glow behind the dial (no hard ring lines) */}
      {!reduce && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: `radial-gradient(circle, ${cycle}1f, transparent 70%)`, transition: "background 0.8s ease" }} />
      )}

      {/* Rotating brand-color-cycled text path wrapping the outer edge */}
      <div className="pf-spin absolute inset-0 pointer-events-none" style={{ animation: reduce ? undefined : "spin 80s linear infinite" }}>
        <svg width={D} height={D} viewBox={`0 0 ${D} ${D}`} style={{ overflow: "visible" }}>
          <path
            id="dial-text-path"
            fill="none"
            stroke="none"
            d={`M ${C}, ${C - 182} A 182, 182 0 1, 1 ${C - 0.1}, ${C - 182}`}
          />
          <text className="font-poppins font-bold uppercase text-[9.5px] whitespace-pre" fill={cycle} style={{ letterSpacing: "1.26px", transition: "fill 0.8s ease" }}>
            <textPath href="#dial-text-path" startOffset="0%">
              {"Hover to pause the dial   ·   tap any segment to open   ·   green core calls me directly   ·   Hover to pause the dial   ·   tap any segment to open   ·   green core calls me directly   ·   "}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Outer ring — rotates reverse */}
      <SegRing items={SOCIAL} ri={118} ro={170} c={C} spin="spin 64s linear infinite reverse" counter="spin 64s linear infinite" gap={6} iconSize={18} group="secondary" reduce={reduce} />

      {/* Inner ring — three segments, rotates forward */}
      <SegRing items={CORE} ri={50} ro={104} c={C} spin="spin 48s linear infinite" counter="spin 48s linear infinite reverse" gap={9} iconSize={26} group="primary" reduce={reduce} />

      {/* Center — Call core (static) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        {!reduce && (
          <motion.span className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "#25D366" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
        )}
        <motion.a
          href={CALL} aria-label="Call Jahir"
          onClick={() => trackHubClick("call", CALL, "cta")}
          whileHover={reduce ? {} : { scale: 1.07 }} whileTap={{ scale: 0.95 }}
          className="relative flex flex-col items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ width: 84, height: 84, background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", boxShadow: "0 8px 30px rgba(37,211,102,0.5)" }}>
          <Phone size={26} />
          <span className="font-poppins font-bold text-[9px] tracking-wide mt-0.5">Call</span>
        </motion.a>
      </div>
    </div>
  );
}

/* ── CV Data Structures ── */
const IMPACT_METRICS = [
  { value: "5x", label: "Creative Output (AI Design)" },
  { value: "3x", label: "Video Output (AI Pipeline)" },
  { value: "4x", label: "Faster Content Production" },
  { value: "45%", label: "Cost Reduction via AI Workflows" },
  { value: "40%", label: "Engagement Lift (Social)" },
  { value: "300%", label: "SKU Expansion (POD Brands)" },
  { value: "60%", label: "Workload Reduced (Automation)" },
  { value: "60%", label: "Fewer Revision Cycles" },
  { value: "39%", label: "Faster Video Editing Cycles" },
];

const EXPERIENCE = [
  {
    role: "Social Media Manager & AI Content Strategist",
    company: "Bergamot Beauté • Luxury Fragrance D2C",
    date: "Feb 2025 – Present",
    location: "Gurugram, India",
    points: [
      "Own all digital asset creation for the brand product imagery, reels, story templates, campaign creatives using AI augmented Adobe Suite and Midjourney workflows",
      "Engineer brand consistent AI prompt libraries (Midjourney, Nano Banana Pro, DALL·E) ensuring visual coherence across every touchpoint",
      "Build and maintain n8n and Claude powered automation pipelines for content scheduling, visual QA, and cross platform publishing",
      "Produce all Instagram Reels and Stories using Kling AI, Pika, and Adobe Premiere Pro full script to screen ownership",
      "Deliver 40%+ engagement growth through AI optimized storytelling and audience targeted creative formats",
      "Integrate text + image + video AI into one unified production pipeline, eliminating three separate workflows"
    ]
  },
  {
    role: "AI Content Strategist & Automation Consultant",
    company: "Secretto Agency • 360° Marketing Agency",
    date: "Feb 2025 – Present",
    location: "Gurugram, India",
    points: [
      "Design and deliver custom AI workflows, brand identity visuals, and automation SOPs for early stage startup clients",
      "Engineer reusable prompt libraries and n8n pipelines tailored to each brand's voice, output requirements, and operational scale",
      "Deliver end to end creative systems from brand guidelines to production ready AI content pipelines"
    ]
  },
  {
    role: "Operations Manager & Digital Media Strategist",
    company: "WizePrint • US Based Print on Demand Brand",
    date: "Feb 2020 – Dec 2024",
    location: "Remote",
    points: [
      "Managed and scaled WizePrint end to end design production, AI pipeline development, platform operations, and brand strategy across Teepublic, Redbubble, Etsy, Flipkart, Meesho, and Amazon",
      "Built reusable Midjourney and DALL·E prompt libraries enabling 300% SKU expansion across 3 brands (WizePrint, FEBRICAST, FebricFusion) with minimal manual design overhead",
      "Created AI to print production pipeline integrating Midjourney, Nano Banana Pro, and Adobe Suite reduced design time by 45% and eliminated outsourcing costs entirely",
      "Developed AI powered SEO content systems for Amazon, Etsy, and Teepublic listings driving measurable conversion improvements",
      "Produced all product showcase videos, social reels, and promotional content implemented AI assisted editing workflows reducing video production time by 39%",
      "Built n8n based automation for product upload, listing QA, and approval workflows reducing operational bottlenecks by 40%"
    ]
  }
];

const SKILL_GROUPS = [
  { category: "AI Image", color: "#EC4899", skills: ["Midjourney v7", "DALL·E 3", "Ideogram", "Adobe Firefly", "Nano Banana Pro", "Kontext", "Stable Diffusion"] },
  { category: "Design", color: "#7C3AED", skills: ["Adobe Photoshop", "Illustrator", "InDesign", "CorelDRAW", "Figma", "Canva", "Adobe Express"] },
  { category: "AI Video", color: "#3B82F6", skills: ["RunwayML Gen 3", "Kling AI", "Pika Labs", "Hailuoai", "Veo", "Seedance", "Sora"] },
  { category: "Video Edit", color: "#06B6D4", skills: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Filmora", "Descript"] },
  { category: "Automation", color: "#10B981", skills: ["n8n", "Claude API", "Claude Code", "ChatGPT API", "Gemini API", "Zapier", "Make", "Google AI Studio"] },
  { category: "Prompt Eng.", color: "#F59E0B", skills: ["Structured Libraries", "Chain of Thought", "Few Shot Templates", "Negative Prompting", "Style Anchoring", "LLM Validation"] },
  { category: "Research", color: "#6366F1", skills: ["NotebookLM", "Google AI Studio", "LMArena", "CometAPI", "Perplexity AI"] },
  { category: "E-Commerce", color: "#EF4444", skills: ["Amazon Seller Central", "Etsy", "Flipkart", "Meesho", "Redbubble", "Teepublic", "Shopify"] },
  { category: "Managed", color: "#8B5CF6", skills: ["Instagram", "YouTube", "TikTok", "LinkedIn", "Facebook", "Pinterest", "Notion"] }
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
                {char === " " ? " " : char}
              </motion.span>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default function Hub() {
  const { isDark } = useTheme();
  const reduce = useReducedMotion();
  const textPrimary = isDark ? "#ffffff" : "#0F172A";
  const textMuted = isDark ? "#94A3B8" : "#64748B";

  const [expOpenIdx, setExpOpenIdx] = useState<number | null>(0);
  const [cIdx, setCIdx] = useState(0);
  useEffect(() => {
    trackHubView();
    if (reduce) return;
    const t = setInterval(() => setCIdx((i) => (i + 1) % COLORS.length), 2000);
    return () => clearInterval(t);
  }, [reduce]);
  const cycle = COLORS[cIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-[76px]"
    >
      <SEO
        title="Portfolio | Jahir Sekh — Designer Pro Plus | Craftforge"
        description="Jahir Sekh (Designer Pro Plus) — Behance, LinkedIn, Pinterest, Instagram, YouTube and more, plus a direct call. One tap to every profile."
      />

      {/* Pause the spinning rings on hover + respect reduced motion */}
      <style>{`
        .pf-dial:hover .pf-spin { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .pf-spin { animation: none !important; } }
        .skill-tag:hover {
          color: var(--sg);
          border-color: color-mix(in srgb, var(--sg) 30%, transparent);
          background: color-mix(in srgb, var(--sg) 8%, transparent);
          box-shadow: 0 0 10px color-mix(in srgb, var(--sg) 12%, transparent);
        }
      `}</style>

      {/* Top Section: Profile & Dial Side-by-Side (within Glass Card) */}
      <section className="pt-10 pb-16 px-6 md:px-12 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto glass-card rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden group border"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(124,58,237,0.15)",
            boxShadow: isDark
              ? `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255,255,255,0.01)`
              : `0 8px 32px rgba(124,58,237,0.05)`,
          }}
        >
          {/* Ambient hover glow using the cycling color */}
          {!reduce && (
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700"
              style={{ background: cycle }}
            />
          )}

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10">
            {/* Left Side: Profile picture */}
            <div className="flex items-center justify-center flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]"
              >
                {/* Rotating ring */}
                <div
                  className="absolute inset-0 rounded-full p-[4px]"
                  style={{
                    background: "conic-gradient(from 0deg, #7C3AED, #4F46E5, #3B82F6, #7C3AED)",
                    animation: "profile-ring-rotate 8s linear infinite",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-brand-dark" />
                </div>

                {/* Profile image */}
                <div className="absolute inset-[8px] rounded-full overflow-hidden border border-white/10">
                  <img src="/super-pro-profile.webp" alt="Jahiruddin Sekh" className="w-full h-full object-cover" />
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
              </motion.div>
            </div>

            {/* Right Side: Circular Social Dial */}
            <div className="flex items-center justify-center flex-shrink-0">
              <div className="h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center w-full">
                <div className="origin-center scale-[0.76] sm:scale-90 md:scale-100 lg:scale-105">
                  <Dial cycle={cycle} reduce={reduce} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CV Portfolio Section */}
      <section className="pb-28 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Jahir Sekh header & RoleCycler */}
          <div className="text-center mb-16">
            <RevealText
              text="JAHIR SEKH"
              className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl mb-4 justify-center"
              style={{ color: textPrimary }}
            />
            <RoleCycler />
          </div>

          {/* 1. Professional Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 mb-12 relative overflow-hidden group border"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(124,58,237,0.15)",
              boxShadow: isDark
                ? `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255,255,255,0.01)`
                : `0 8px 32px rgba(124,58,237,0.05)`,
            }}
          >
            {/* Ambient hover glow using the cycling color */}
            {!reduce && (
              <div
                className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[100px] pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-700"
                style={{ background: cycle }}
              />
            )}
            
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(124,58,237,0.08)",
                  color: cycle 
                }}
              >
                <Sparkles size={20} />
              </div>
              <h3 className="font-poppins font-bold text-lg sm:text-xl" style={{ color: textPrimary }}>
                Professional Summary
              </h3>
            </div>
            
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textMuted }}>
              Native creative professional with <strong style={{ color: textPrimary }}>7+ years of experience</strong> spanning Graphic Design, Video Production, UI/UX & AI Driven workflow automation. Currently leading full digital output for <strong style={{ color: textPrimary }}>Bergamot Beauté</strong>, a luxury fragrance D2C, as <strong style={{ color: textPrimary }}>Team Lead</strong> and AI Content Strategist. Simultaneously delivering AI workflows, prompt systems, and automation pipelines for clients through <strong style={{ color: textPrimary }}>Secretto Agency</strong>.
              <br /><br />
              Core edge → Not just using AI tools, but engineering the systems that make creative output scale without scaling headcount.
            </p>
          </motion.div>

          {/* 2. Professional Experience (Timeline / Accordions) */}
          <div className="mb-16">
            <h4 className="font-poppins font-bold text-base tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cycle }} />
              Professional Experience
            </h4>

            <div className="flex flex-col gap-4">
              {EXPERIENCE.map((exp, idx) => {
                const isOpen = expOpenIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden border"
                    style={{
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderColor: isOpen ? cycle : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"),
                      background: isOpen
                        ? (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(124, 58, 237, 0.03)")
                        : (isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)"),
                      transition: "border-color 0.3s ease, background 0.3s ease",
                    }}
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => setExpOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-start justify-between gap-3 p-5 text-left focus:outline-none cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mt-1 flex-shrink-0"
                          style={{ 
                            background: isOpen ? cycle : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                            color: isOpen ? "#fff" : textMuted,
                            transition: "all 0.3s ease"
                          }}
                        >
                          <Briefcase size={15} />
                        </div>
                        <div className="min-w-0">
                          {/* Title */}
                          <h5 className="font-poppins font-bold text-sm sm:text-base leading-snug break-words" style={{ color: isOpen ? cycle : textPrimary, transition: "color 0.3s ease" }}>
                            {exp.role}
                          </h5>
                          {/* Subheading */}
                          <p className="font-poppins font-semibold text-xs sm:text-sm mt-1 leading-snug break-words" style={{ color: isOpen ? cycle : textMuted, transition: "color 0.3s ease" }}>
                            {exp.company}
                          </p>
                          {/* Body text */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs mt-2 font-medium" style={{ color: textMuted }}>
                            <span>{exp.date}</span>
                            <span className="opacity-50">•</span>
                            <span className="flex items-center gap-1"><MapPin size={11} className="flex-shrink-0" /> {exp.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: isOpen ? cycle : textMuted }}
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-6 pt-2">
                            <div className="h-px w-full mb-4" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }} />
                            <ul className="flex flex-col gap-3">
                              {exp.points.map((pt, pidx) => (
                                <li key={pidx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: textMuted }}>
                                  <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: cycle }} />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 3. Tools & Technologies */}
          <div className="mb-16">
            <h4 className="font-poppins font-bold text-base tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cycle }} />
              Tools & Technologies
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILL_GROUPS.map((group, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-card rounded-2xl p-5 border flex flex-col h-full"
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                    <h5 className="font-poppins font-bold text-sm tracking-wider uppercase" style={{ color: textPrimary }}>
                      {group.category}
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="skill-tag px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-300"
                        style={{
                          ["--sg"]: group.color,
                          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
                          color: textMuted,
                        } as CSSProperties}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Education & Certifications, Active Learning & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education & Certs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 border flex flex-col gap-4"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            >
              <h5 className="font-poppins font-bold text-base flex items-center gap-2 mb-2" style={{ color: textPrimary }}>
                <GraduationCap size={20} style={{ color: cycle }} />
                Education & Certifications
              </h5>
              <div className="flex flex-col gap-4">
                <div className="relative pl-4 border-l-2" style={{ borderColor: `${cycle}44` }}>
                  <h6 className="font-poppins font-bold text-xs sm:text-sm" style={{ color: textPrimary }}>Self Directed AI Creative & Automation Specialist</h6>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: cycle }}>Jan 2020 — Present</p>
                  <p className="text-xs mt-1" style={{ color: textMuted }}>7+ years of applied practice across AI image generation, video production, prompt engineering, and workflow automation. Self taught across all tools in current stack.</p>
                </div>
                
                <div className="relative pl-4 border-l-2" style={{ borderColor: `${cycle}44` }}>
                  <a href="https://www.linkedin.com/learning/certificates/82ca568ac6f2ae7ed0f531355ce8be863fb540e0746fc2331e65add3d06eb0e3" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all decoration-1">
                    <h6 className="font-poppins font-bold text-xs sm:text-sm" style={{ color: textPrimary }}>Generative AI by Microsoft and LinkedIn</h6>
                  </a>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: cycle }}>Microsoft &amp; LinkedIn • 2026</p>
                </div>

                <div className="relative pl-4 border-l-2" style={{ borderColor: `${cycle}44` }}>
                  <a href="https://www.linkedin.com/learning/certificates/b08a358ede86012a83aa5d0c9e9e183fe7f699ec8ab31517a1b1f7ce00a6f1aa" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all decoration-1">
                    <h6 className="font-poppins font-bold text-xs sm:text-sm" style={{ color: textPrimary }}>Microsoft 365 Copilot for Work</h6>
                  </a>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: cycle }}>Microsoft • 2026</p>
                </div>

                <div className="relative pl-4 border-l-2" style={{ borderColor: `${cycle}44` }}>
                  <a href="https://www.linkedin.com/learning/certificates/d42d0f435d0083d4719d9bd16ccc9d5ac55a5d070877af40d066e42b68ba039f" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all decoration-1">
                    <h6 className="font-poppins font-bold text-xs sm:text-sm" style={{ color: textPrimary }}>Ethics in Generative AI</h6>
                  </a>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: cycle }}>LinkedIn • 2026</p>
                </div>
              </div>
            </motion.div>

            {/* Active Learning & Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Active Learning Areas */}
              <div 
                className="glass-card rounded-2xl p-6 border flex flex-col gap-3 flex-1"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
              >
                <h5 className="font-poppins font-bold text-base flex items-center gap-2 mb-2" style={{ color: textPrimary }}>
                  <BookOpen size={18} style={{ color: cycle }} />
                  Active Learning Areas
                </h5>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Diffusion model ControlNet",
                    "AI compositing",
                    "RAG based prompt systems",
                    "n8n advanced pipeline design",
                    "LLM API integration"
                  ].map((area, i) => (
                    <span key={i} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/5" style={{ color: textMuted }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div 
                className="glass-card rounded-2xl p-6 border flex flex-col gap-3"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
              >
                <h5 className="font-poppins font-bold text-base flex items-center gap-2" style={{ color: textPrimary }}>
                  <Languages size={18} style={{ color: cycle }} />
                  Languages
                </h5>
                <div className="flex gap-3">
                  {["English", "Hindi", "Bengali"].map((lang) => (
                    <span key={lang} className="px-3 py-1 border rounded-full text-xs font-bold"
                      style={{ color: textPrimary, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)", borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)" }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 5. Measurable Impact Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 mt-16 relative overflow-hidden group border"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(124,58,237,0.15)",
              boxShadow: isDark
                ? `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255,255,255,0.01)`
                : `0 8px 32px rgba(124,58,237,0.05)`,
            }}
          >
            {/* Ambient hover glow using the cycling color */}
            {!reduce && (
              <div
                className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[100px] pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-700"
                style={{ background: cycle }}
              />
            )}
            
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(124,58,237,0.08)",
                  color: cycle 
                }}
              >
                <Award size={20} />
              </div>
              <h3 className="font-poppins font-bold text-lg sm:text-xl" style={{ color: textPrimary }}>
                Measurable Impact
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-10">
              {IMPACT_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center text-center p-4 border rounded-2xl transition-colors duration-300 hover:bg-[rgba(124,58,237,0.05)]"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }}
                >
                  <span 
                    className="font-poppins font-extrabold text-3xl sm:text-4xl mb-2 transition-all duration-500"
                    style={{ 
                      color: cycle,
                      textShadow: isDark ? `0 0 15px ${cycle}33` : "none"
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide leading-snug" style={{ color: textMuted }}>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-right text-[10px] mt-6 italic" style={{ color: textMuted }}>
              * Metrics are self-reported from project work across WizePrint, Bergamot Beauté, & Secretto Agency.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
