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

const TOOL_ICONS: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  "Adobe After Effects": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Adobe After Effects</title><path d="M8.54 10.73c-.1-.31-.19-.61-.29-.92s-.19-.6-.27-.89c-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.13.51-.29.98-.44 1.4h2.54c-.06-.21-.14-.46-.23-.72-.09-.27-.18-.56-.27-.86zm8.58-.29c-.55-.03-1.07.26-1.33.76-.12.23-.19.47-.22.72h2.109c.26 0 .45 0 .57-.01.08-.01.16-.03.23-.08v-.1c0-.13-.021-.25-.061-.37-.178-.56-.708-.94-1.298-.92zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.04 16.511h-2.09c-.07.01-.14-.041-.16-.11l-.82-2.4H5.92l-.76 2.36c-.02.09-.1.15-.19.14H3.09c-.11 0-.14-.06-.11-.18L6.2 7.39c.03-.1.06-.19.1-.31.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.07 0 .12.03.13.08l3.65 10.25c.03.11.001.161-.1.161zm7.851-3.991c-.021.189-.031.33-.041.42-.01.07-.069.13-.14.13-.06 0-.17.01-.33.021-.159.02-.35.029-.579.029-.23 0-.471-.04-.73-.04h-3.17c.039.31.14.62.31.89.181.271.431.48.729.601.4.17.841.26 1.281.25.35-.011.699-.04 1.039-.11.311-.039.61-.119.891-.23.05-.039.08-.02.08.08v1.531c0 .039-.01.08-.021.119-.021.03-.04.051-.069.07-.32.14-.65.24-1 .3-.471.09-.94.13-1.42.12-.761 0-1.4-.12-1.92-.35-.49-.211-.921-.541-1.261-.95-.319-.39-.55-.83-.69-1.31-.14-.471-.209-.961-.209-1.461 0-.539.08-1.07.25-1.59.16-.5.41-.96.75-1.37.33-.4.739-.72 1.209-.95.471-.23 1.03-.31 1.67-.31.531-.01 1.06.09 1.55.31.41.18.77.45 1.05.8.26.34.47.72.601 1.14.129.4.189.81.189 1.22 0 .24-.01.45-.019.64z"/>
    </svg>
  ),
  "Adobe Express": (props) => (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M40,0H8C3.6,0,0,3.6,0,8v32c0,4.4,3.6,8,8,8h32c4.4,0,8-3.6,8-8V8C48,3.6,44.4,0,40,0z M34.1,37c-1.3,0-2.8-0.6-3.6-2.4l-5.7-13.4c-0.3-0.7-1.3-0.7-1.6,0L20.4,28c-0.2,0.6,0.2,1.2,0.8,1.2c0,0,1.4,0,1.5,0c2.2,0,3.9,1.8,3.9,3.9S24.9,37,22.7,37h-8.8 c-2.8,0-4.7-2.8-3.6-5.4l7.9-18.8c1-2.3,3.3-3.8,5.8-3.8s4.8,1.5,5.8,3.8l0,0l8,18.8C38.8,34.2,36.9,37,34.1,37z" />
    </svg>
  ),
  "Adobe Illustrator": (props) => (
    <svg viewBox="0 123.306 595.279 595.279" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <radialGradient id="ai-grad" cx="-183.69" cy="328.972" r=".76" gradientTransform="matrix(545.6736 0 0 528.3113 100439.305 -173525.125)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#423325" stopOpacity=".98"/>
        <stop offset="1" stopColor="#1c0a00"/>
      </radialGradient>
      <path d="M24.803 155.549h545.674v530.792H24.803V155.549z" fill="url(#ai-grad)"/>
      <path d="M24.803 155.549h545.674v530.792H24.803V155.549zM0 711.145h595.28V130.746H0v580.399zm389.908-373.539c0-1.984.744-2.977 2.977-2.977h38.941c1.983 0 2.976.744 2.976 2.977v195.699c0 1.983-.496 2.976-2.976 2.976h-38.445c-2.48 0-3.225-1.24-3.225-3.224V337.606h-.248zm-2.728-56.304c0-15.874 11.161-25.299 25.3-25.299 15.13 0 25.299 10.169 25.299 25.299 0 16.37-10.665 25.299-25.795 25.299-14.387.001-24.804-8.929-24.804-25.299zM275.565 419.209c-6.944-27.532-23.314-87.556-29.516-116.576h-.496c-5.209 29.02-18.354 78.13-28.771 116.576h58.783zm-68.953 40.182l-19.595 74.41c-.496 1.983-1.24 2.479-3.72 2.479h-36.461c-2.48 0-2.977-.744-2.48-3.72l70.441-246.546c1.24-4.464 1.984-8.433 2.48-20.586 0-1.736.744-2.48 1.984-2.48h52.087c1.736 0 2.48.496 2.977 2.48l78.874 267.628c.496 1.983 0 3.224-1.984 3.224h-41.174c-1.984 0-3.225-.496-3.72-2.231l-20.339-74.658h-79.37z" fill="#ff7f18"/>
    </svg>
  ),
  "Adobe InDesign": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Adobe InDesign</title><path d="M4.25.3C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm11.31 5.13h2.03c.05-.01.09.03.1.07v9.54c0 .18.01.38.02.6.02.21.03.41.04.58 0 .07-.03.13-.1.16-.52.22-1.07.38-1.63.48-.5.09-1.02.14-1.54.14-.74.01-1.48-.14-2.15-.45-.63-.29-1.15-.77-1.51-1.36-.37-.61-.55-1.37-.55-2.28-.01-.74.18-1.47.55-2.11.38-.65.93-1.19 1.59-1.55.7-.39 1.54-.58 2.53-.58.05 0 .12 0 .21.01s.19.01.31.02V5.54c0-.07.03-.11.1-.11zm-8.93.86h1.95c.06-.01.12.03.13.1.01.01.01.02.01.03v10.26c0 .11-.05.16-.14.16H6.62c-.09 0-.13-.05-.13-.16V6.42c0-.09.05-.13.14-.13zm8.23 4.24c-.39 0-.78.08-1.13.26-.34.17-.63.42-.85.74-.22.32-.33.75-.33 1.27-.01.35.05.7.17 1.03.1.27.25.51.45.71.19.18.42.32.68.4.27.09.55.13.83.13.15 0 .29-.01.42-.02.13.01.25-.01.36-.05v-4.4c-.09-.02-.18-.04-.27-.05-.11-.01-.22-.02-.33-.02z"/>
    </svg>
  ),
  "Adobe Photoshop": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Adobe Photoshop</title><path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.46-.7-.57zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.899c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.391 11.65c-.399.56-.959.98-1.609 1.22-.68.25-1.43.34-2.25.34-.24 0-.4 0-.5-.01s-.24-.01-.43-.01v3.209c.01.07-.04.131-.11.141H5.52c-.08 0-.12-.041-.12-.131V6.42c0-.07.03-.11.1-.11.17 0 .33 0 .56-.01.24-.01.49-.01.76-.02s.56-.01.87-.02c.31-.01.61-.01.91-.01.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.149.42.229.85.229 1.3.001.86-.199 1.57-.6 2.13zm7.091 3.89c-.28.4-.671.709-1.12.891-.49.209-1.09.318-1.811.318-.459 0-.91-.039-1.359-.129-.35-.061-.7-.17-1.02-.32-.07-.039-.121-.109-.111-.189v-1.74c0-.029.011-.07.041-.09.029-.02.06-.01.09.01.39.23.8.391 1.24.49.379.1.779.15 1.18.15.38 0 .65-.051.83-.141.16-.07.27-.24.27-.42 0-.141-.08-.27-.24-.4-.16-.129-.489-.279-.979-.471-.51-.18-.979-.42-1.42-.719-.31-.221-.569-.51-.761-.85-.159-.32-.239-.67-.229-1.021 0-.43.12-.84.341-1.21.25-.4.619-.72 1.049-.92.469-.239 1.059-.349 1.769-.349.41 0 .83.03 1.24.09.3.04.59.12.86.23.039.01.08.05.1.09.01.04.02.08.02.12v1.63c0 .04-.02.08-.05.1-.09.02-.14.02-.18 0-.3-.16-.62-.27-.96-.34-.37-.08-.74-.13-1.12-.13-.2-.01-.41.02-.601.07-.129.03-.24.1-.31.2-.05.08-.08.18-.08.27s.04.18.101.26c.09.11.209.2.34.27.229.12.47.23.709.33.541.18 1.061.43 1.541.73.33.209.6.49.789.83.16.318.24.67.23 1.029.011.471-.129.94-.389 1.331z"/>
    </svg>
  ),
  "Adobe Premiere Pro": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Adobe Premiere Pro</title><path d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z"/>
    </svg>
  ),
  "Amazon Seller Central": (props) => (
    <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
    </svg>
  ),
  "Canva": (props) => (
    <svg viewBox="0 0 64 64" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <circle fill="#24BECA" cx="32" cy="32" r="32"/>
      <path fill="#FFFFFF" d="M45.6,43.1c-1.7,2.3-3.9,4.7-6.8,6.5c-2.8,1.8-6,3.2-9.8,3.2c-3.5,0-6.4-1.8-8-3.3c-2.4-2.3-3.7-5.6-4.1-8.7c-1.2-9.6,4.7-22.3,13.8-27.8c2.1-1.3,4.4-1.9,6.6-1.9c4.4,0,7.7,3.1,8.1,6.9c0.4,3.4-0.9,6.3-4.7,8.2c-1.9,1-2.9,0.9-3.2,0.5c-0.2-0.3-0.1-0.8,0.3-1.1c3.5-2.9,3.6-5.3,3.2-8.7c-0.3-2.2-1.7-3.6-3.3-3.6c-6.9,0-16.9,15.5-15.5,26.7c0.5,4.4,3.2,9.5,8.8,9.5c1.8,0,3.8-0.5,5.5-1.4c3.9-2,5.6-3.4,7.9-6.6c0.3-0.4,0.6-0.9,0.9-1.3c0.2-0.4,0.6-0.5,0.9-0.5c0.3,0,0.7,0.3,0.7,0.8c0,0.3-0.1,0.9-0.5,1.4C46.3,42.1,46,42.7,45.6,43.1L45.6,43.1z"/>
    </svg>
  ),
  "ChatGPT API": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  "Claude API": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Anthropic</title><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
    </svg>
  ),
  "Claude Code": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Anthropic</title><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
    </svg>
  ),
  "CorelDRAW": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>CorelDRAW</title><path d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536.072 4.145 3.847 11.191 6.397 13.455 0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0Zm2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013 2.547-2.264 6.324-9.31 6.396-13.455-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0Zm-1.38.019a1.088 1.088 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984.268-4.677-.688-7.674-2.219-8.501a1.088 1.088 0 0 0-.555-.144ZM7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2.503.457-5.777-6.548-6.386-12.699-.291-2.323.39-4.9 2.986-6.66Zm9.966 0c2.595 1.76 3.276 4.337 2.985 6.66-.608 6.151-6.888 13.156-6.386 12.699 1.398-1.205 6.103-6.88 6.987-12.2.888-5.316-3.586-7.159-3.586-7.159Zm-6.815 20.78L10.647 24h2.599l.488-2.154h-3.566Z"/>
    </svg>
  ),
  "DALL-E 3": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  "DaVinci Resolve": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>DaVinci Resolve</title><path d="M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"/>
    </svg>
  ),
  "Etsy": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M8.559 2.445c0-.325.033-.52.59-.52h7.465c1.3 0 2.02 1.11 2.54 3.193l.42 1.666h1.27c.23-4.728.43-6.784.43-6.784s-3.196.36-5.09.36H6.635L1.521.196v1.37l1.725.326c1.21.24 1.5.496 1.6 1.606 0 0 .11 3.27.11 8.64 0 5.385-.09 8.61-.09 8.61 0 .973-.39 1.333-1.59 1.573l-1.722.33V24l5.13-.165h8.55c1.935 0 6.39.165 6.39.165.105-1.17.75-6.48.855-7.064h-1.2l-1.284 2.91c-1.005 2.28-2.476 2.445-4.11 2.445h-4.906c-1.63 0-2.415-.64-2.415-2.05V12.8s3.62 0 4.79.096c.912.064 1.463.325 1.76 1.598l.39 1.695h1.41l-.09-4.278.192-4.305h-1.391l-.45 1.89c-.283 1.244-.48 1.47-1.754 1.6-1.666.17-4.815.14-4.815.14V2.45h-.05z"/>
    </svg>
  ),
  "Facebook": (props) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M21.164 5.074c-1.984 0-2.548.88-2.548 2.82v3.202h5.277l-.52 5.187h-4.758V32H12.3V16.282H8.04v-5.187h4.262V7.983C12.302 2.75 14.4 0 20.285 0c1.263 0 2.774.1 3.676.226v4.87" fill="#3c5a99"/>
    </svg>
  ),
  "Figma": (props) => (
    <svg viewBox="0 0 7.678 7.68" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M2.56 7.68A1.28 1.28 0 0 0 3.84 6.4V5.12H2.56a1.28 1.28 0 0 0 0 2.56z" fill="#0acf83"/><path d="M1.28 3.84a1.28 1.28 0 0 1 1.28-1.28h1.28v2.56H2.56a1.28 1.28 0 0 1-1.28-1.28z" fill="#a259ff"/><path d="M1.28 1.28A1.28 1.28 0 0 1 2.559 0h1.28v2.56H2.56a1.28 1.28 0 0 1-1.28-1.28z" fill="#f24e1e"/><path d="M3.84 0h1.28a1.28 1.28 0 0 1 0 2.56H3.84z" fill="#ff7262"/><path d="M6.4 3.84a1.28 1.28 0 0 1-2.56 0 1.28 1.28 0 0 1 2.56 0z" fill="#1abcfe"/>
    </svg>
  ),
  "Filmora": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Wondershare Filmora</title><path d="M5.475 0A5.463 5.463 0 0 0 0 5.475v13.05A5.463 5.463 0 0 0 5.475 24h13.05A5.463 5.463 0 0 0 24 18.525V5.475A5.463 5.463 0 0 0 18.525 0H5.475Zm4.552 3.6 4.026 4.029-4.617 4.623-.022-.023a1.088 1.088 0 0 0-.158-1.339L5.999 7.63l4.028-4.03ZM14.528 8l4.027 4.03-8.528 8.536L6 16.536 14.528 8Z"/>
    </svg>
  ),
  "Flipkart": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Flipkart</title><path d="M3.833 1.333a.993.993 0 0 0-.333.061V1c0-.551.449-1 1-1h14.667c.551 0 1 .449 1 1v.333H3.833zm17.334 2.334H2.833c-.551 0-1 .449-1 1V23c0 .551.449 1 1 1h7.3l1.098-5.645h-2.24c-.051 0-5.158-.241-5.158-.241l4.639-.327-.078-.366-1.978-.285 1.882-.158-.124-.449-3.075-.467s3.341-.373 3.392-.373h3.232l.247-1.331c.289-1.616.945-2.807 1.973-3.693 1.033-.892 2.344-1.332 3.937-1.332.643 0 1.053.151 1.231.463.118.186.201.516.279.859.074.352.14.671.095.903-.057.345-.461.465-1.197.465h-.253c-1.327 0-2.134.763-2.405 2.31l-.243 1.355h1.54c.574 0 .781.402.622 1.306-.17.941-.539 1.36-1.111 1.36H14.9L13.804 24h7.362c.551 0 1-.449 1-1V4.667a1 1 0 0 0-.999-1zM20.5 2.333A.334.334 0 0 0 20.167 2H3.833a.334.334 0 0 0-.333.333V3h17v-.667z"/>
    </svg>
  ),
  "Gemini API": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Google Gemini</title><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
    </svg>
  ),
  "Google AI Studio": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M40.728 20.488l2.05.035 5.57-5.57.27-2.36C44.2 8.657 38.367 6.26 31.993 6.26c-11.54 0-21.28 7.852-24.163 18.488.608-.424 1.908-.106 1.908-.106l11.13-1.83s.572-.947.862-.9A13.88 13.88 0 0 1 32 17.375c3.3.007 6.34 1.173 8.728 3.102z" fill="#ea4335"/><path d="M56.17 24.77c-1.293-4.77-3.958-8.982-7.555-12.177l-7.887 7.887c3.16 2.55 5.187 6.452 5.187 10.82v1.392c3.837 0 6.954 3.124 6.954 6.954 0 3.837-3.124 6.954-6.954 6.954H32.007L30.615 48v8.346l1.392 1.385h13.908A18.11 18.11 0 0 0 64 39.647c-.007-6.155-3.1-11.6-7.83-14.876z" fill="#4285f4"/><path d="M18.085 57.74h13.9V46.6h-13.9a6.89 6.89 0 0 1-2.862-.622l-2.007.615-5.57 5.57-.488 1.88a18 18 0 0 0 10.926 3.689z" fill="#34a853"/><path d="M18.085 21.57A18.11 18.11 0 0 0 0 39.654c0 5.873 2.813 11.095 7.166 14.403l8.064-8.064a6.96 6.96 0 0 1-4.099-6.339c0-3.837 3.124-6.954 6.954-6.954 2.82 0 5.244 1.7 6.34 4.1l8.064-8.064c-3.307-4.353-8.53-7.166-14.403-7.166z" fill="#fbbc05"/>
    </svg>
  ),
  "Instagram": (props) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <linearGradient id="insta-grad" x1="0%" y1="100%" y2="0%">
        <stop offset="0" stopColor="#ffd520"/>
        <stop offset=".497" stopColor="#f50000"/>
        <stop offset="1" stopColor="#b900b4"/>
      </linearGradient>
      <path d="m12 3c-2.445 0-2.75.011-3.71.054-.959.045-1.611.196-2.185.419a4.396 4.396 0 0 0 -1.594 1.037c-.5.5-.81 1.001-1.038 1.594-.223.574-.375 1.226-.419 2.185-.045.961-.054 1.266-.054 3.711s.011 2.75.054 3.71c.045.959.196 1.612.419 2.185.229.592.537 1.095 1.038 1.594.5.5 1.001.81 1.594 1.038.574.223 1.226.375 2.185.419.96.045 1.265.054 3.71.054s2.75-.011 3.71-.054c.959-.045 1.612-.196 2.185-.419a4.396 4.396 0 0 0 1.594-1.038c.5-.5.81-1.001 1.038-1.594.223-.574.375-1.226.419-2.185.045-.96.054-1.265.054-3.71s-.011-2.75-.054-3.71c-.045-.959-.196-1.612-.419-2.185a4.396 4.396 0 0 0 -1.038-1.594c-.5-.5-1.001-.81-1.594-1.038-.574-.223-1.226-.375-2.185-.419-.96-.045-1.265-.054-3.71-.054zm0 1.62c2.403 0 2.689.011 3.637.054.878.04 1.354.187 1.67.31.422.164.72.358 1.036.673.315.315.51.614.672 1.035.124.317.27.793.311 1.67.043.95.053 1.235.053 3.638s-.011 2.689-.056 3.637c-.045.878-.192 1.354-.315 1.67-.17.422-.36.72-.675 1.036-.315.315-.62.51-1.035.672-.315.124-.8.27-1.677.311-.956.043-1.237.053-3.645.053-2.407 0-2.688-.011-3.645-.056-.877-.045-1.36-.192-1.676-.315a2.801 2.801 0 0 1 -1.035-.675 2.753 2.753 0 0 1 -.675-1.035c-.124-.315-.27-.8-.315-1.677-.034-.945-.045-1.237-.045-3.633 0-2.397.011-2.69.045-3.645.045-.878.191-1.362.315-1.677.158-.427.36-.72.675-1.035a2.668 2.668 0 0 1 1.035-.675c.315-.123.788-.27 1.665-.315.956-.033 1.238-.045 3.645-.045zm0 2.758a4.621 4.621 0 1 0 0 9.243 4.621 4.621 0 0 0 0-9.242zm0 7.622a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.884-7.804a1.08 1.08 0 1 1 -2.16 0 1.08 1.08 0 0 1 2.16 0z" fill="url(#insta-grad)"/>
    </svg>
  ),
  "LinkedIn": (props) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z" fill="#0177b5"/><path d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z" fill="#fff"/>
    </svg>
  ),
  "Make": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Make</title><path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z"/>
    </svg>
  ),
  "Meesho": (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M18.9,32.4c-0.3,0.6-0.9,1-1.6,1c-1,0-1.9-0.9-1.9-1.9v-1.2c0-1.1,0.9-1.9,1.9-1.9c1,0,1.8,0.8,1.9,1.9v0.7h-3.8"/>
      <path d="M25,32.4c-0.3,0.6-0.9,1-1.6,1c-1,0-1.9-0.9-1.9-1.9v-1.2c0-1.1,0.8-1.9,1.9-1.9s1.9,0.8,1.9,1.9c0,0,0,0.1,0,0.1v0.7h-3.8"/>
      <path d="M27.8,32.9c0.4,0.3,1,0.4,1.5,0.4h0.4c0.7,0,1.2-0.5,1.3-1.2c0-0.7-0.5-1.2-1.2-1.3c0,0,0,0,0,0h-0.9c-0.7,0-1.2-0.5-1.3-1.2c0-0.7,0.5-1.2,1.2-1.3c0,0,0,0,0,0h0.4c0.9,0,1.2,0.1,1.5,0.4"/>
      <line x1="33.3" y1="25.7" x2="33.3" y2="33.3"/>
      <path d="M33.3,30.2c0-1,0.9-1.9,1.9-1.9l0,0c1,0,1.9,0.9,1.9,1.9v3.1"/>
      <path d="M41.3,33.3c-1,0-1.9-0.9-1.9-1.9v-1.2c0-1.1,0.8-1.9,1.9-1.9c1,0,1.9,0.8,1.9,1.9c0,0,0,0.1,0,0.1v1.2C43.2,32.5,42.4,33.3,41.3,33.3z"/>
      <path d="M8.8,39.3c0.3,1.2,1.4,2,2.6,2h25.2c1.2,0,2.3-0.8,2.6-2 M43.4,23.8c0.4-1.6-0.5-3.2-2.1-3.6C41,20.1,40.8,20,40.5,20H33L25.6,7.7c-0.5-0.9-1.7-1.3-2.6-0.7c-0.3,0.2-0.6,0.4-0.7,0.7L14.9,20H7.5c-1.6,0-3,1.3-3,3c0,0.3,0,0.5,0.1,0.8 M24,12.4l4.5,7.6h-9.1L24,12.4z"/>
      <path d="M5.5,30.2c0-1.1,0.9-1.9,1.9-1.9l0,0c1.1,0,1.9,0.9,1.9,1.9v3.1"/>
      <line x1="5.5" y1="28.3" x2="5.5" y2="33.4"/>
      <path d="M9.3,30.2c0-1.1,0.9-1.9,1.9-1.9l0,0c1.1,0,1.9,0.9,1.9,1.9v3.1"/>
    </svg>
  ),
  "n8n": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>n8n</title><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/>
    </svg>
  ),
  "NotebookLM": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>NotebookLM</title><path d="M11.999 3.201C5.372 3.201 0 8.528 0 15.101V20.8h2.212v-.568c0-2.666 2.178-4.827 4.866-4.827 2.688 0 4.866 2.16 4.866 4.827v.568h2.212v-.568c0-3.877-3.17-7.019-7.078-7.019A7.075 7.075 0 0 0 2.992 14.5a7.355 7.355 0 0 1 6.568-4.016c4.057 0 7.347 3.264 7.347 7.287V20.8h2.212V17.77c0-5.235-4.28-9.481-9.56-9.481a9.563 9.563 0 0 0-6.217 2.28A9.795 9.795 0 0 1 12 5.393c5.406 0 9.788 4.346 9.788 9.707V20.8H24V15.1c-.001-6.573-5.373-11.9-12.001-11.9Z"/>
    </svg>
  ),
  "Notion": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Notion</title><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  ),
  "Perplexity AI": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Perplexity</title><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
    </svg>
  ),
  "Pinterest": (props) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M16.132 0a16 16 0 0 0-5.771 30.952c-.13-1.312-.262-3.148 0-4.6l1.836-8a5.771 5.771 0 0 1-.525-2.361c0-2.23 1.312-3.935 2.885-3.935s1.967 1.05 1.967 2.23-.918 3.4-1.312 5.377.787 2.885 2.36 2.885 4.984-3.016 4.984-7.344-2.754-6.558-6.69-6.558-7.082 3.54-7.082 7.082c0 1.312.525 2.885 1.18 3.672a.525.525 0 0 1 .131.393l-.393 1.836c-.13.262-.262.393-.525.262-1.967-.918-3.28-3.803-3.28-6.164 0-4.984 3.672-9.705 10.623-9.705s9.836 3.935 9.836 9.18-3.54 9.968-8.263 9.968c-1.574 0-3.148-.787-3.672-1.836l-1.05 3.803c-.393 1.443-1.312 3.148-1.967 4.197A16 16 0 1 0 16.132 0z" fill="#bd081c"/>
    </svg>
  ),
  "Redbubble": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Redbubble</title><path d="M16.633 16.324h-3.199a.321.321 0 0 1-.32-.322V7.974a.32.32 0 0 1 .32-.32H16.4c2.226 0 2.693 1.31 2.693 2.408 0 .636-.169 1.14-.504 1.511.816.337 1.256 1.096 1.256 2.194 0 1.601-1.201 2.557-3.212 2.557m-4.644 0H5.345a.32.32 0 0 1-.32-.322V7.974a.32.32 0 0 1 .32-.32h3.103c1.939 0 3.096 1.043 3.096 2.791 0 1.163-.585 2.077-1.527 2.448l2.21 2.897a.322.322 0 0 1-.24.533M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12S18.63 0 12.001 0"/>
    </svg>
  ),
  "Shopify": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"/>
    </svg>
  ),
  "Teepublic": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>TeePublic</title><path d="M6.998.488s-.57.33-.68.982c-.097.584.138 1.114.19 1.22-.408.255-.797.539-1.165.849.506-.577.561-1.384.038-2.147 0 0-.516.41-.53 1.07-.013.6.306 1.096.365 1.183-.338.294-.657.613-.956.95.356-.63.27-1.396-.335-2.043 0 0-.448.483-.363 1.138.074.568.433.999.527 1.103-.222.263-.432.537-.628.823-.1.148-.196.298-.289.45.39-.726.232-1.569-.53-2.179 0 0-.375.543-.196 1.179.175.62.68 1.016.705 1.035-.277.456-.517.93-.718 1.42.226-.78-.098-1.562-.955-2.006 0 0-.26.605.04 1.194.28.551.821.84.89.874-.18.445-.329.902-.444 1.368.063-.763-.372-1.445-1.247-1.747 0 0-.17.636.21 1.175.346.487.894.696.997.732-.097.418-.167.843-.211 1.273-.11-.69-.63-1.226-1.476-1.382 0 0-.073.655.385 1.131.382.396.9.534 1.062.569a10.67 10.67 0 0 0-.01 1.342C1.48 11.351.881 10.872 0 10.839c0 0 .022.659.544 1.064.45.349 1.004.402 1.149.41.039.466.11.928.21 1.382-.308-.657-.984-1.032-1.864-.911 0 0 .135.645.72.953.503.265 1.059.223 1.203.205.111.448.251.887.42 1.316-.396-.623-1.128-.905-1.992-.655 0 0 .227.618.85.838.549.195 1.105.062 1.228.028.17.403.366.796.585 1.176-.487-.514-1.23-.66-2.019-.296 0 0 .318.578.966.703.554.106 1.067-.091 1.205-.151a10.27 10.27 0 0 0 .895 1.231c-.566-.568-1.4-.667-2.201-.145 0 0 .397.526 1.057.556.635.029 1.163-.318 1.202-.344.358.417.748.802 1.165 1.155-.675-.49-1.54-.44-2.245.249 0 0 .493.438 1.146.337.643-.098 1.1-.56 1.114-.574.388.327.8.625 1.231.892-.724-.35-1.545-.164-2.127.598 0 0 .551.362 1.183.169.592-.181.97-.665 1.015-.724.38.23.776.437 1.183.617-.705-.135-1.4.187-1.824.958 0 0 .599.276 1.195-.009.51-.245.806-.712.88-.84.436.179.885.329 1.344.447-.751-.069-1.43.349-1.75 1.205 0 0 .633.186 1.18-.182.494-.332.718-.872.757-.977l.153.035.081.018c.704.155 1.325.32 1.864.497-.82.315-1.6.74-1.958 1.293a.097.097 0 0 0 .081.15.098.098 0 0 0 .081-.045c.31-.478 1.012-.912 2.093-1.296 1.082.384 1.783.818 2.093 1.296.019.028.05.044.082.044a.097.097 0 0 0 .081-.15c-.359-.552-1.138-.977-1.958-1.292a19.34 19.34 0 0 1 1.863-.497l.082-.018c.05-.01.101-.023.152-.035.04.105.263.645.757.977.548.368 1.18.182 1.18.182-.32-.856-.998-1.274-1.75-1.205a10.27 10.27 0 0 0 1.345-.448c.074.129.369.596.88.841.595.285 1.195.01 1.195.01-.424-.772-1.12-1.094-1.825-.959.407-.18.802-.386 1.183-.617.046.06.424.543 1.015.724.632.193 1.183-.17 1.183-.17-.582-.761-1.402-.946-2.127-.598.431-.266.843-.564 1.232-.891.013.014.47.476 1.113.574.653.1 1.146-.337 1.146-.337-.704-.688-1.57-.739-2.245-.25.417-.352.807-.737 1.166-1.154.04.028.568.373 1.202.344.66-.03 1.057-.556 1.057-.556-.802-.521-1.635-.423-2.2.144l.13-.156c.277-.342.532-.702.763-1.074.139.06.651.257 1.205.15.649-.124.966-.702.966-.702-.79-.363-1.53-.218-2.019.295.22-.38.415-.772.585-1.175.123.034.68.167 1.229-.028.622-.22.85-.838.85-.838-.865-.25-1.596.032-1.993.655.168-.429.309-.868.42-1.316.144.018.7.06 1.203-.205.585-.308.72-.953.72-.953-.88-.121-1.556.254-1.864.912.1-.455.171-.916.21-1.383.146-.008.7-.062 1.15-.41.522-.405.543-1.064.543-1.064-.88.033-1.479.511-1.674 1.203a10.609 10.609 0 0 0-.01-1.34c.162-.036.68-.173 1.062-.569.458-.476.385-1.131.385-1.131-.846.156-1.364.693-1.476 1.381-.044-.43-.114-.854-.21-1.272.103-.036.65-.245.996-.732.38-.539.21-1.175.21-1.175-.875.302-1.31.984-1.246 1.748a10.218 10.218 0 0 0-.443-1.37c.067-.034.608-.322.89-.873.3-.589.038-1.194.038-1.194-.857.444-1.18 1.227-.954 2.006a10.36 10.36 0 0 0-.719-1.42c.025-.02.53-.415.706-1.035.178-.636-.196-1.179-.196-1.179-.763.61-.922 1.453-.532 2.178-.092-.151-.187-.301-.288-.449a10.29 10.29 0 0 0-.628-.823c.094-.104.454-.535.527-1.103.086-.655-.363-1.138-.363-1.138-.604.647-.69 1.413-.334 2.043-.3-.338-.619-.656-.957-.95.06-.087.378-.584.365-1.183-.013-.66-.53-1.07-.53-1.07-.523.763-.467 1.57.038 2.147-.368-.31-.756-.594-1.164-.85.05-.105.287-.635.19-1.219-.11-.651-.68-.982-.68-.982-.403.822-.239 1.605.33 2.103a10.37 10.37 0 0 0-1.2-.619c-.504-.813-1.318-1.082-2.1-.795 0 0 .317.603.93.892.413.193.823.127 1.049.062.401.173.787.368 1.156.585-.57-.164-1.168.043-1.588.639 0 0 .475.288 1 .104.435-.15.721-.493.808-.609.377.236.736.493 1.075.772-.54-.246-1.163-.128-1.667.401 0 0 .43.354.976.249.45-.087.782-.383.886-.485.358.31.692.644 1.001.998-.507-.376-1.175-.374-1.78.097 0 0 .371.413.927.39.482-.018.87-.287.965-.358.28.332.537.681.77 1.046-.443-.378-1.065-.44-1.691-.085 0 0 .307.463.86.522.444.046.84-.13.979-.202.227.376.43.766.607 1.17-.363-.441-.952-.615-1.624-.392 0 0 .21.513.742.68.427.132.85.036 1-.007.163.404.3.82.41 1.245-.29-.512-.858-.783-1.572-.657 0 0 .135.539.637.78.412.197.854.158.999.137.108.469.183.949.224 1.437-.172-.626-.718-1.039-1.5-1.02 0 0 .052.553.512.866.412.28.9.287 1 .286a10.758 10.758 0 0 1 .004 1.392c-.101-.615-.574-1.077-1.327-1.168 0 0-.028.554.382.931.35.32.805.406.93.424-.04.472-.112.934-.216 1.389-.004-.613-.39-1.138-1.105-1.355 0 0-.123.542.215.983.287.374.716.537.84.579-.107.427-.242.845-.402 1.251.06-.587-.248-1.138-.906-1.448 0 0-.2.518.071 1.004.221.397.602.619.735.687-.178.418-.382.823-.612 1.212.167-.583-.051-1.192-.668-1.605 0 0-.276.482-.08 1.003.163.434.517.713.63.794-.218.352-.458.69-.716 1.012.188-.525.043-1.11-.472-1.576 0 0-.343.437-.225.981.092.42.363.73.484.852-.27.314-.56.613-.866.893.263-.473.226-1.057-.177-1.6 0 0-.422.362-.412.918.007.43.214.788.308.93-.318.27-.653.522-1.003.753.36-.434.423-1.037.092-1.654 0 0-.47.297-.54.85-.057.436.106.83.175.977-.395.242-.809.458-1.239.644.505-.365.706-.995.45-1.71 0 0-.508.223-.66.758-.132.46-.002.909.038 1.026a9.93 9.93 0 0 1-1.256.423c.513-.3.776-.88.632-1.596 0 0-.536.148-.764.655-.188.416-.137.856-.114 1.002l-.15.035-.08.018c-.427.093-1.27.279-2.12.577a18.04 18.04 0 0 0-2.12-.577l-.08-.018-.15-.035c.024-.146.074-.586-.113-1.002-.228-.507-.764-.655-.764-.655-.144.717.119 1.296.632 1.596a9.966 9.966 0 0 1-1.256-.423c.039-.118.17-.566.038-1.026-.152-.535-.66-.758-.66-.758-.257.715-.055 1.345.45 1.71a9.992 9.992 0 0 1-1.24-.644c.07-.146.232-.54.176-.978-.07-.552-.54-.849-.54-.849-.332.617-.269 1.22.092 1.654-.35-.23-.685-.482-1.004-.753.094-.142.301-.5.308-.93.01-.556-.412-.918-.412-.918-.403.543-.44 1.127-.177 1.6-.306-.28-.595-.579-.865-.893.12-.122.392-.433.484-.852.118-.544-.225-.98-.225-.98-.515.465-.66 1.05-.473 1.575a10.23 10.23 0 0 1-.716-1.012c.114-.08.468-.36.63-.794.196-.52-.08-1.003-.08-1.003-.617.413-.834 1.022-.667 1.605-.23-.389-.435-.794-.612-1.212.133-.068.513-.29.734-.687.272-.486.071-1.004.071-1.004-.658.31-.965.861-.905 1.448-.16-.406-.296-.824-.403-1.251.125-.042.554-.205.84-.579.34-.441.216-.983.216-.983-.716.217-1.101.742-1.106 1.354a10.103 10.103 0 0 1-.217-1.388c.127-.018.582-.104.932-.424.41-.377.382-.931.382-.931-.753.091-1.226.553-1.328 1.167a9.665 9.665 0 0 1 .005-1.391c.1.002.588-.005.999-.286.46-.313.512-.866.512-.866-.781-.019-1.327.393-1.5 1.019.042-.488.116-.967.225-1.436.145.021.587.06 1-.137.5-.241.635-.78.635-.78-.713-.126-1.281.146-1.571.657.11-.426.247-.841.41-1.245.15.043.573.14 1 .006.53-.166.742-.68.742-.68-.673-.222-1.261-.048-1.624.393.176-.404.38-.795.607-1.17.139.072.534.248.978.202.553-.059.86-.522.86-.522-.625-.355-1.247-.293-1.691.085.234-.364.49-.714.77-1.046.096.071.483.34.965.359.556.022.927-.391.927-.391-.604-.47-1.272-.473-1.78-.097a10 10 0 0 1 1.002-.998c.103.102.436.398.886.485.546.105.975-.249.975-.249-.503-.529-1.127-.647-1.667-.4.34-.28.699-.537 1.076-.773.086.116.373.459.807.61.526.183 1-.105 1-.105-.42-.596-1.018-.803-1.588-.639.37-.217.756-.412 1.157-.585.226.065.636.13 1.048-.062.614-.289.932-.892.932-.892-.784-.287-1.597-.018-2.102.795a10.37 10.37 0 0 0-1.2.62c.57-.499.734-1.282.331-2.104zm3.935 5.19c-.045-.005-.225.052-.412.088-.187.036-.696.062-.874.102-.178.04-.607.188-.727.21-.121.023-.496.245-.79.335-.295.089-.67.308-.95.392-.282.085-.697.246-.88.304-.183.058-.504.214-.518.245-.013.032.184.545.318.834.134.29.347.763.4.91.055.148.113.282.162.295.049.013.45.098.562.116.111.018.473.023.593.014.12-.01.38 0 .487.053 0 0 .035.527.035.571 0 .045-.009.848-.026.946-.018.099-.08.946-.117 1.34-.035.392-.089 1.49-.089 1.632 0 .143-.053 1.214-.053 1.41v.955c0 .17.044.572.062.607.018.036 2.178.188 2.802.26.625.07 1.419.142 2.08.124.66-.018 1.66-.107 2.133-.107.473 0 .803 0 .839-.036.035-.035-.036-.874-.036-1.151 0-.276-.036-1.58-.036-1.91 0-.33-.027-1.196-.027-1.321s-.035-1.526-.062-1.999c-.027-.473-.098-1.285-.08-1.339.017-.053.268-.107.365-.09.099.019.572.09.679.09.107 0 .41.027.473-.017.062-.045.607-1.071.67-1.214.062-.143.303-.714.303-.759 0-.044-.813-.401-1.045-.526-.231-.125-.87-.442-1.088-.513-.219-.072-.505-.143-.643-.21s-.607-.192-.861-.25c-.254-.058-.608-.194-.738-.207-.129-.014-.343-.045-.38-.05-.035-.004-.173-.116-.209-.093-.035.022-.392.354-.642.408-.25.054-.86.075-1.164-.041-.303-.116-.472-.404-.516-.408z"/>
    </svg>
  ),
  "TikTok": (props) => (
    <svg viewBox="0 0 128 128" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path fill="#ff004f" d="M91.95 46.205c8.264 5.905 18.389 9.38 29.324 9.38V34.553c-2.07 0-4.134-.216-6.158-.644v16.555a50.3 50.3 0 0 1-29.325-9.38v42.92c0 21.471-17.415 38.876-38.895 38.876a38.72 38.72 0 0 1-21.653-6.576C32.306 123.522 42.156 128 53.053 128c21.482 0 38.897-17.404 38.897-38.876zm7.596-21.218A29.3 29.3 0 0 1 91.95 7.825V5.12h-5.836c1.47 8.375 6.48 15.53 13.433 19.867M38.83 99.828a17.7 17.7 0 0 1-3.63-10.765c0-9.82 7.966-17.782 17.793-17.782 1.83 0 3.651.28 5.397.833V50.612a39 39 0 0 0-6.156-.354v16.736a17.8 17.8 0 0 0-5.4-.833c-9.827 0-17.792 7.961-17.792 17.782 0 6.945 3.982 12.957 9.788 15.885" style={{ strokeWidth: ".439289" }}/>
    <path d="M85.79 41.084a50.3 50.3 0 0 0 29.326 9.38V33.907a29.44 29.44 0 0 1-15.57-8.921C92.592 20.65 87.582 13.495 86.113 5.12h-15.33v84.003c-.034 9.793-7.986 17.723-17.791 17.723-5.779 0-10.912-2.753-14.164-7.018-5.805-2.928-9.786-8.94-9.786-15.884 0-9.82 7.964-17.783 17.791-17.783 1.883 0 3.698.293 5.4.833V50.258c-21.103.436-38.075 17.67-38.075 38.866 0 10.58 4.226 20.172 11.086 27.18a38.73 38.73 0 0 0 21.652 6.576c21.481 0 38.895-17.405 38.895-38.875v-42.92Z" style={{ strokeWidth: ".439289" }}/>
    <path fill="#00f2ea" d="M115.116 33.908v-4.476a29.33 29.33 0 0 1-15.57-4.446 29.4 29.4 0 0 0 15.57 8.922M86.113 5.12q-.21-1.2-.322-2.415V0H64.625v84.004c-.034 9.792-7.985 17.722-17.792 17.722-2.879 0-5.597-.683-8.005-1.897 3.252 4.264 8.385 7.017 14.164 7.017 9.805 0 17.757-7.93 17.792-17.722V5.12Zm-33.88 45.138v-4.765a39 39 0 0 0-5.336-.362C25.414 45.13 8 62.535 8 84.004c0 13.46 6.844 25.322 17.244 32.3-6.86-7.008-11.086-16.6-11.086-27.18 0-21.196 16.972-38.43 38.076-38.866" style={{ strokeWidth: ".439289" }}/>
    </svg>
  ),
  "YouTube": (props) => (
    <svg viewBox="0 0 64 64" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M62.603 16.596a8.06 8.06 0 0 0-5.669-5.669C51.964 9.57 31.96 9.57 31.96 9.57s-20.005.04-24.976 1.397a8.06 8.06 0 0 0-5.669 5.669C0 21.607 0 32 0 32s0 10.393 1.356 15.404a8.06 8.06 0 0 0 5.669 5.669C11.995 54.43 32 54.43 32 54.43s20.005 0 24.976-1.356a8.06 8.06 0 0 0 5.669-5.669C64 42.434 64 32 64 32s-.04-10.393-1.397-15.404z" fill="red"/>
      <path d="M25.592 41.612L42.187 32l-16.596-9.612z" fill="#fff"/>
    </svg>
  ),
  "Zapier": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M63.207 26.418H44.432l13.193-13.193c-1.015-1.522-2.03-2.537-3.045-4.06a29.025 29.025 0 0 1-4.059-3.552L37.33 18.807V.54a17.252 17.252 0 0 0-5.074-.507A15.629 15.629 0 0 0 27.18.54v18.775l-13.7-13.7A13.7 13.7 0 0 0 9.42 9.166c-1.015 1.522-2.537 2.537-3.552 4.06L19.06 26.418H.794l-.507 5.074a15.629 15.629 0 0 0 .507 5.074H19.57l-13.7 13.7a27.198 27.198 0 0 0 7.611 7.611l13.193-13.193V63.46a17.252 17.252 0 0 0 5.074.507 15.629 15.629 0 0 0 5.074-.507V44.686L50.014 57.88a13.7 13.7 0 0 0 4.059-3.552 29.025 29.025 0 0 0 3.552-4.059L44.432 37.074h18.775A17.252 17.252 0 0 0 63.715 32a19.028 19.028 0 0 0-.507-5.582zm-23.342 5.074a25.726 25.726 0 0 1-1.015 6.597 15.223 15.223 0 0 1-6.597 1.015 25.726 25.726 0 0 1-6.597-1.015 15.223 15.223 0 0 1-1.015-6.597 25.726 25.726 0 0 1 1.015-6.597 15.223 15.223 0 0 1 6.597-1.015 25.726 25.726 0 0 1 6.597 1.015 29.684 29.684 0 0 1 1.015 6.597z" fill="#ff4a00"/>
    </svg>
  ),
};


const SKILL_GROUPS = [
  {
    category: "Design",
    subtitle: "Graphic · Brand · Visual",
    color: "#7C3AED",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "CorelDRAW", "Figma", "Canva", "Adobe Express"]
  },
  {
    category: "AI Image",
    subtitle: "Generation · Editing",
    color: "#EC4899",
    skills: ["Midjourney", "DALL-E 3", "Ideogram", "Adobe Firefly", "Stable Diffusion", "Nano Banana Pro", "Kontext"]
  },
  {
    category: "Video Editing",
    subtitle: "Post-Production · Color",
    color: "#06B6D4",
    skills: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "CapCut", "Filmora", "Descript"]
  },
  {
    category: "AI Video",
    subtitle: "Generation · Motion",
    color: "#3B82F6",
    skills: ["RunwayML Gen 3", "Kling AI", "Pika Labs", "Hailuoai", "Veo", "Seedance", "Sora"]
  },
  {
    category: "Prompt Engineering",
    subtitle: "LLM · Image · Video",
    color: "#F59E0B",
    skills: ["Structured Libraries", "Chain of Thought", "Few Shot Templates", "Prompt Style Anchoring"]
  },
  {
    category: "AI Automation",
    subtitle: "Workflow · Agents",
    color: "#10B981",
    skills: ["n8n", "Claude API", "Claude Code", "ChatGPT API", "Gemini API", "Zapier", "Make", "Google AI Studio"]
  },
  {
    category: "Research",
    subtitle: "Creative · AI · Market",
    color: "#6366F1",
    skills: ["NotebookLM", "Google AI Studio", "LMArena", "CometAPI", "Perplexity AI"]
  },
  {
    category: "E-Commerce",
    subtitle: "Strategy · Design",
    color: "#EF4444",
    skills: ["Amazon Seller Central", "Etsy", "Flipkart", "Meesho", "Redbubble", "Teepublic", "Shopify"]
  },
  {
    category: "Managed",
    subtitle: "E-Commerce · Social Media · Team Lead",
    color: "#8B5CF6",
    skills: ["Instagram", "YouTube", "TikTok", "LinkedIn", "Facebook", "Pinterest", "Notion"]
  }
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
                  <div className="flex items-start gap-2 mb-3.5 pb-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                    <div>
                      <h5 className="font-poppins font-bold text-sm tracking-wider uppercase" style={{ color: textPrimary }}>
                        {group.category}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-semibold block mt-0.5" style={{ color: textMuted }}>
                        {group.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {group.skills.map((skill, sIdx) => {
                      const IconComponent = TOOL_ICONS[skill];
                      return (
                        <span
                          key={sIdx}
                          className="skill-tag px-2.5 py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-300 flex items-center gap-1.5 group/tag"
                          style={{
                            ["--sg"]: group.color,
                            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
                            color: textMuted,
                          } as CSSProperties}
                        >
                          {IconComponent && (
                            <IconComponent 
                              className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover/tag:scale-110" 
                            />
                          )}
                          <span>{skill}</span>
                        </span>
                      );
                    })}
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
