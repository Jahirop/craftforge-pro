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
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" className="after-effects-40-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M34.4678 0H7.53225C3.3723 0 0 3.3723 0 7.53225V34.4678C0 38.6277 3.3723 42 7.53225 42H34.4678C38.6277 42 42 38.6277 42 34.4678V7.53225C42 3.3723 38.6277 0 34.4678 0Z" fill="#00005B" />
<path id="Vector_2" d="M10.7343 11.1486H16.9182L23.8534 30.5093H18.1896L17.236 27.5618H9.98297L9.02936 30.5093H3.5968L10.7343 11.1486ZM15.7334 22.9673L13.624 16.4655L11.5145 22.9673H15.7334Z" fill="#9999FF" />
<path id="Vector_3" d="M38.4033 22.5338C38.4033 23.2274 38.3455 23.9787 38.2588 24.5566H28.8096C29.3875 26.0015 30.7746 26.6949 32.9419 26.6949C34.5022 26.6949 35.8604 26.406 37.2185 25.7703L37.2764 29.7869C35.8026 30.5382 34.2134 30.7983 32.1616 30.7983C27.1047 30.7983 23.7239 27.9953 23.7239 22.9095C23.7239 18.2571 26.9603 15.1652 31.2369 15.1652C35.6293 15.1652 38.4033 17.9971 38.4033 22.5338ZM28.6363 21.2624H33.6931C33.5776 19.9042 32.7396 18.9507 31.2658 18.9507C29.8499 18.9507 28.9541 19.702 28.6363 21.2624Z" fill="#9999FF" />
<defs>
<clipPath id="clip0_2136_6820">
<rect width="42" height="42" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Adobe Express": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="55.385" height="54" viewBox="0 0 55.385 54" className="w-4 h-4 mr-1.5 inline-block" {...props}>
  <defs>
    <clipPath id="clip-path">
      <path id="Path_366947" data-name="Path 366947" d="M33.711,15.492a6.483,6.483,0,0,0-11.943.011L13.583,35A4.039,4.039,0,0,0,17.3,40.6h9.115a4.062,4.062,0,0,0-.011-8.123l-1.558.011A.921.921,0,0,1,24,31.212l2.905-6.924a.9.9,0,0,1,1.667,0L34.5,38.144A3.925,3.925,0,0,0,38.229,40.6a4.038,4.038,0,0,0,3.72-5.615L33.711,15.492Z" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_223768" data-name="Rectangle 223768" width="31.313" height="31.373" transform="translate(12.111 10.385)" fill="none"/>
    </clipPath>
  </defs>
  <g id="Adobe_Express" data-name="Adobe Express" transform="translate(27.692 27)">
    <g id="Group_313379" data-name="Group 313379" transform="translate(-27.692 -27)">
      <rect id="Background_Tile" data-name="Background Tile" width="55.385" height="54" rx="9.808" fill="#000b1d"/>
      <g id="Adobe_A" data-name="Adobe A">
        <g id="Group_313378" data-name="Group 313378" clipPath="url(#clip-path)">
          <g id="Group_313377" data-name="Group 313377">
            <g id="Group_313376" data-name="Group 313376" clipPath="url(#clip-path-2)">
              <image id="Adobe_A_Gradient_Mesh_Rasterized_Image_" data-name="Adobe A Gradient Mesh Rasterized Image " width="31.127" height="31.458" transform="translate(12.221 10.375)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAEdCAYAAADTtqgCAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABGqADAAQAAAABAAABHQAAAAD5Ly1kAABAAElEQVR4Aey9fdBly1Xed96ZewU4GGMbMMSKCRiQCoKDbYzBYBgl5sNgIWFSTsV/kIqr4qqkyk7KlSL/GK5GfATKOOA4RclgBwSI7yIhJHaR2GGuJCSEMBKSEJ8BjHFkCwQYC2R0Z+Zk/Z61nt5r99nnnZl75+OdmdPQZ631rGet7t27u0/vfd65OttH2Z3KYzsCN65eXV379Ze9bGXfifFEi7381FN3EnriPtojcHZ22mge7Tvcr86byvWXrTeX3e7eftdcunJlRz278hm7S59xpXfppD8eI3DaaB7l+3zj6st1ecvGcmxDOYbfxdE5W3I98dTLZJxOPcuYPOLaaaN51G4wm8vNa0+rHp5Ujm0ox/C7ODpto5mz8sh1+UufmuGT/eiMwGmjeRTu5c2nn97duPplubkcvHKbN5HZ9ggcw+1/jvLYRtNwHqt4xDptOs9xrC9e+GmjuXj35PZ7xOZC5eSybBOhLYZ864wrZ3Mdwxvl2aptM1mlmPFmP/GlL9udfcbpnc5qvB5e47TRPIz37sbLvzw3mNXpxZvNrTYarnhrU9nC7sLotM1jlW0Ln7GwOeVc/pKnTi+RV4P30BmnjeZhumW5wXx5dLk2hc2Nhivqm83WBnK72F0YnXnzcMoZn214DdOGE+9xLn36FWc4yYdnBE4bzcNwr268/Ct2bDK7sbG0jWJgXMkFO9W0jWI1zjN+B/Y44Zw2nNWQXnDjtNFc5Bu0f/o1u2f+48+OLm5tLMZCWi0lzUN8fa0jqMFbWHPfiTpvHo6d8dmGN2PdLv2JL4lfqv7mU856khd7BM4uXez+PZ69Y4O5/uc+Z/dM1CxtpTV1+AY2lHCFjimo4xl1Tz+PNTfjs02nZqzbTb/+5S/bPfNZL9rdfPU1ok7lgo/A6S+DL9gNuvFlXxmPSV9ZveKEEVUHDX0kPh6XjFlCT71/KmjEZIp2DDJQsuWaPLdttg1hFTPjd2J37qTz3ubJH/yhVVMn40KNwOnR6SLdjuuf+bm7m3GaOdhcxibhTSCkVNtcRekNT8SckFbHRR8AS57BuQOlbwBz2OybbfgzZtvyFhw2m0t/9gqsU7lYI3B6dLoI92P/6tfu3vs+HxCbzGurO7GytLhqhZ1NNs7u7xdRIQtkoGJsLoS7o52X9zyfW+8cdNuW8Ga92+F+5rNftLvxlVdhnsoFG4HTo9MDviHXP/MvxHsGTjEUnzp80uh2YeN0c4SvPKRKfv9MV+VReNMdd3jsGZ4DZVroB36ALc6MnWfbZ7mV076SepT6Rz+02Z0T+EBG4HSieSDDXo1e/6wX726+5ofDaitFqu3mMofTTS8rsxmlNqRHpe6TEqRBHMoh38iKb3BDbqWasfNs+yxpouvdbvj+Ndd2733/sx3yVC7GCJx+dXoA92H/6h/eXf+sz4+TDJtMFC0Sr5SQqNpQChuby61sZasP5yFdxXX3lg7tGNW+Y/453xZvxs6z7bMk/6zbtoTS9Gc+90WnzWa+Lw/IPj063eeB1ybz2Z+vVvXndeNRKB5j9CTjx5luFybulr8uoueqFpbLi9YcevB4NBwL/YDTXLdS22If1Fth3W/dkiS3ofdNZvAj7sl/+EO7s0+7MrpyUu77CJwene7nkO/jMen657w0msxVw0njbJxcAgMeq6VsdTD5GVY6hlTbI60i8qP5cK/No7yt2EY+X91qY8awO3ZMd0u38pNui1PYM58XL4m/6qqzneQDGIHTieY+Dfr+Na/bXf9sNhlOD1F1iMiTxMHJhj4dPb2sY+dcmzb5VKq91rY91aHFbPwJ3Db7Qu+MGT/P7j7rluTserPP22R6DD99P/F//FDv3Um/PyNwOtHcj3HWJvM5X1ALhdUStS0aqWO1lEO2SSGtTrHqv3wmFBdzhS9XOlKbc4S3RBzRVvETxz7Dt2N3Lrr6VWDXy6eUHbc+y+LffO213fUXv6gSnsT9HIHTy+B7PNraZP78X4xWmP1RtQisyxCesO3qVIJlQGv+oReGaO5hbGGirhxJP5Zj6UFqB7xGmH23sgmF49L1Lazyida51mdJjoax2dz46qvOfJL3aQROj073cKD3r3n97vqf/8JogWeVqIhNXQ75ksLngi1vcQvrj1XjDe8W3+2VFMW8xLoFsrSb1qFtfEN6QePquqkd6/p5/s4rXWIDH23ehu/JH4gXxJ96xS2f5L0dgdOj070aX20yn/uf1IJj5keV6Dqtg5cvdLwLr/lR01tCzFWsKKI530AylpBxEhLRGTvx2enVHQV3PZsZXX9W/sqh7jufEsWH29qSW1jFP/P58dP3D19zlpO8xyNwOtHcowF+5gOeX4cBzgxRdXTw+QEbvargte7/sszqNLM6vQR/2FxExUtVwsIQk52dyZDSzSiQLK0s3gYui7yDXtxgXb8de+Y4PqTVRWn5h3MDs2+W1daT33862TAU97ic/lHlvRjg65/3n8Yfir0uUscC1Rrloxbr2GCAjIeUu+zaGNabjQgthp4TV7jzW874bJs3JPmqGxNmNBnnfHoxQzmmO7z7z+MHb1CtWPa48zD7LKe45/2qx9CdO8m7PAKnR6e7PKC7m1/1dbv9a38kVgezOqoei0qnMeMrHZ4ACBWDJrD50r08/izcIpEkS4XaVCow9WegB4oom+gBuABzUG+760RscTundA+bzB5j7p1gbtdyynH9C16E51Tu4QicfnW6i4PLBnMjNpqxmrSp0EDM7M0NpqhefVoAfLiilb7yQQmgY0UrsNosXogFl9Hiy56E06mJybcyZ0K3Z/08m6ThhzKGrTCEiuO77Pp5PHydi172zdfFL1FfcxXGqdyjETi9o7mLA/vMB35kZPMx3I81ZevRBR2cRpFld0zOximeQg58lac4WJW85U50G8+sw2eq2hnGUMaj3EAmxQsZ+DZ0UTqvx3V8Sz8Pux2fOU0++X3xvubPXKEXp3J3R+D0juZujef1F//leGR6Q6Rjk2gLeGwmuMCrmtMxOnOOnSHOIXKmW+XsbRcHMTaP7m+6OP4wbtsy8ZXXC9WUI7bgIz6Hjs3JPEsIW/ox7BjuhvCbY1ltPO8dq6tzxEk+txE4vaN5buOX0Te/+u/udj/8xkoVM7ef/VePTFBqlnvo9QhUmNzWzQtZOUR1vFrDJyU/Ri4lqqaKoxyNW5RVfHeT96BmY24m+9OC3JRDm71qx3kdatsSHJ0yY7bP82fkOkfP1WMn7vUvfJGRk7yLI3B6dLoLg3n9D75gOYnEsSMfMeKbMY8g0YJ1f1ti0zAf6CWlN1xq9y062ir/yFPxvW21U/iqjYahropaWCFpbOBeuGafZ3ffrXT7Lclv3XILux2fORvyye+NR6hPuULmU7k7I3B6dHqu43jjJV9Uj0yRqW0Y+6Gv8Vzz3jCab/DLp/VsXkjbg0fPY0sbduOIrIDWp+Tzmcm635ic9VH+DmUnEvECXfnD6HjX4XW76/Z1zLrlFmfGZq79SAr+mWPbsnjP+5Wt68d5Ks9iBHx+fxahp5D4y9I3qu40jDFT/UwRs5n//MPyixGzuKo5SLBuG5tx2Qx452Nn+JKjgJGz27B7of0o1Y00mq0c3Z70EVDKVh5zuq/r+Gfb2Czh9eI4411u+Yw5R7dbrIfu5tdeNfMk78IInB6dnsMg3njpfxEbTbwA1pcfH1F1wkC9WZn7qQOocYbeY0sX1bpjzKs8LR6PcjdMELaw5l/ZHc+I5TOzpt31QLw4F/Ki2WdpT7etW8KxbrmF3Y7PnNuV1Y7oLeaJ745HqE++gvdUntsInE40z3b8bv6tr8/TDKtj8yQSf6JUuE43/qo03zHHcPO0+uY2otdtQdCOTV0PhvJiyRjCfTK8BK4yKM3BR6VaYhpj9vV09kGf9TvF3KTznCed+xay34LRv8h743Sq8Wg/Z3k60TzLIbz+IX8sIuNb3ieYcXKoEwR5V+9PfCKol8Uyi3vAK+4mHr6Ojz5UTNj53kYdyD6qb70/5VvlMR9Jcb60Du3CWei9dPtW+p36t/jGLOmLdaT1GS9bbnO6LP2J7zydahiq51hOJ5pnM4A3v+YVMYH5o+qYjfPXIfiWr/F0/sD212fzLfkWt/q4xXGO4RMzUkQLI70V58OuIld8iGxwS7ZNx+ksoVtHutxKt9+xxM16x47xzbF0jlvIMWTHeJXvxt+5inYqz3EETieaZzGA1z/0T0RUO1mMkwEwi7JV2TTS+E2HuYrp8V0fMZVr2NXWzK28nJ+yP1M7+OccxlayeMKmDxapS9e3MPtnCfdOMHO34uzrsulWD9qzA2m95X/iO+JU86evgJzKsxuB04nmTsft5td8Q4TUjPTXoiV4122rkfL12NA1ryud8vZ460jnMtbtodPQSFYha3vpnzpV9OAoL+HoJYtyIFrK3tzQz/OTDD/FPMtE1/4tHvw6UB7kcK6SHi7kAde5u7Te+Df+p6ugp/IcRuB0ornDwbv+YX8qInyKINi6Tw4hx+kCt3G48UuUbUvg0JeTx5Rv8DquIALj//l1y21gW8+8iw+t+7d4zjtLuBuFxehyTMdvn+UWdjs+c5DWj+SSu/PO4zuHOZbGQz7xqtOphuF4luV0ormTgbv5t78xJrhnb0h/XfL1utL7e5rS5bfeZebxL1NnuiX2tzbcrtuRHb1f2Y3Pha18YRa0VgDN7bLwEEkoIW7o0cWMW9zDDmjo8CldOkfHzOk+6903t2tOSV1y51u3hGfdcsox/A2/8XevCj59PLsROJ1o7mDcrv/hTwk2pxKC6u9kzjlBLKeLOhGI20418wlDfnLnaWPfTyujHedqJ5mVL/ztb3jWfXDsxgmKZvPCQhTPdvVHFC9UjK7fyu7cLd0Y0nrP2XH7LQmx3mXX51zYFDjm2T4in/wZjwuEU7mDETidaG53sPavf1NMZr5OOW3EzBw6dn3NIq0zezX7mcX2V5x44MURr2KVO3G15xwNV59t9xwrrlhqQguJ5qSkGOGLs/lpv8yzWFxDD4xiO63zbXPvonTfuxx9ejbt9Gs6J/7m/3zVV3ySdzgCpxPNbQ7Yzb/013f71/94fdvHiaCfIvRF52+7fmKJ5INHQ80nvE4lIx6l6ogLO/R9jzUH2Xnd7qehjjtWcfQp2+PTulTzFFs+FqFL18G63XX7tjD7LDtn1sMWZBzZdXJQOtb12XeePftaW0++PUcKyqnc9gjo6/e22Y8zcf8jPxGX7xPLJZ1uDk44OlH4ZDKfYmK2+sSDvLTkyhOS/TWr/XXNyuH/bXeZDpxZZ9v4LAcvLknN5d/dQMtchYdQER5alzi63fUt3xZ2i5jsT3Wpc2toj7Zvv9u8U9nbmvSbX3+VbKdyhyPALTmVW4zA/mtfGYzaGMaiZei84VyO9Wk/smanuGWvMPubT/HgDWMljRxuq2KHrziyI3y4HVuA8oB1TugUY1L3Mle4H586l5hud935jsm4xNGmOVw2cHy4AjAsB1y3NUvnmuVWDjgzbnuWzhf4zR+7RquncocjcHp0uo0Bu/Hhfy5Y+Ygxfk6eHj3kb48xq0cr2mi+1P3YRF70KJ0zPyoN3/L4pccpPdpU39zHgS3cuX+yB2+OV2fC23H1MD9YeC5dB+u29UmykVDILpWPiXNgE3A7vFvl6f6ez/lnOfPD/8T/Ej91f+IVmKdyeyOg74vboz6mrP3XfWtM8Jhto8bX2ji9gJc9Tjxpr044x04pPYZVNNpgdrudLTwx2jj3kepYjt7Oph7N00QKybXRHU3vAaVvpXcufNZvKWM4bsm5k3wz97z83Irgq4a+/7GnozOncicjcDrR3GK0bv5nX7zL9zPx/ctXMB+rF61AOFqV7dNExuh00ON6zNA52ZC/5Zrbc263N7g3I+ycuAN+4/Z+iZd9PugHi7OXbm/pxmZJjhmzfZ7PnPPkeT7n7pyu2z9JbYjGiv/Emxi/U7nNETidaM4bqP0b3rrbv+FtsSj4upu+1nSSuZw+6TED/RXtr76G5z+krBysMnFmSTsTJps4V/zbec4utdhVnm3+0gfntmx56GfPGyapGQ5J2/da3kl7t8M9j1M+38aD6w3/zW+4GgNwKrc7AgzpqRwbgdholgUeQ3XuYmcoG2dsTMb5ZYfaOOjaEIzFatWvUSE3N6KOEzPZ0eb4C2NtDi3vikvcHJ9dWTaP4JDDmwyScpDHHHxVxduwO971Sj3inWeW0eWxwaHj79K642zP0n7L8s9DMnKb1+TNb3hZNH4qtzsCp0enc0bqxke9JLxxRO6PJOPRBdc5jx8rX+dZj0edObceW2jPj1AljQ9+4CN/18ndbdqgdMztFz5yGr+VVMJc5JVdC77gtZ6ty+VFOvPAXax32eOMw7fe5TF9Kz/c4ksci+242wWLevkV8VL4T1wBPZXzR0BfqedTHlPv/u9+V0wmvuqi6qtu1mOm+dudWWfOHDPwmp2OCfwsci+nnMo3cjln4cTJ1+yRa8I4FdVJJCmTX30iXeHiZnqayDrHdHvijH4FTnGOgVfsbPf2GV7iZulcXZrTMevHfMaRUd008pZtOtZtlLz5969G8KnczgicTjRHRunGx3xhOzXEN/M4QWzpcWKYTwaDTwN8s3OqKN7MhYI/8Hyh23noUUc+2m/+kWvChFfs4NAPtZI5wV3nnBDt4+9ophzaFMQpHouPspLZ3iFevBVXrHX88FcebGPQrXfZ9YnDpkImbS6TD/NoPnI6r3llX/7606mGIblFOXviFoTH0/2jb4/r5muvLbAzFi0zNaRmakjNWoYouGwE5nuB4tIGgvTXInkq70qS42YtgkvhCY7amuOIByMHehRNeuKd1zgYhLKLe6bcuVLkBu8rSde3eOQ2xXAtNDUwVm5Lo7GAFAGDW37bs3QblsNfCjkHBqlKx7qOO2xBfHS9fIhVTpELq5gDjmPCv3/T06fHJw3Q+R+nE83G+Oy/6OXxa9NPxhKJBToWbxCl16KdTwCDF4uh61rprE5wYjf0geFbc7ThKLb5eh7Hrvq6zpFtV7veDMe1JL66Vi224o/8ZSsuummOZNgU5U5VfnzwzZljVniLQ2Uvpcwct2HcHOyoA7ZSOLTh7D7jx7COW+8xgT3xWsbmVM4ZAb1QOMf/GLp+9Kd2+6gcLfIdCu9R+Bk7ZpRqrACG7VL7aZtVofce58gDTovXbSCWNiqHVg1t8y6nt904o0+BDY65swyKf0FSHCELx3/4d3arX73IEV2kuaP5+jufrveYA7xyitN07FUNY7RPH9LvS1lxzevxYK7gxzjd1zk9tvLe/KarkehUzhsBhu1U2gjs38gmE8OyqvOmM/ubzczVrO9YzEhjXgmapODBA7M9/GACJf2ztfhapPjd1oY+8phjWXlHjrIjl/8O53DRmmNZuUa/uQT78nLWdvjmjSUgcdwPcqFv8mqIwp3NxP0IZTSpXG43ZHTPlz/keZh9luTr+i3s/ZuvRcCpnDcCp0enaXRufuwXBRJH4f7403XxF//yH6eqxxU/WoxHjsBHfNc5bruCO76kfFv85o+8+92N1t/ua/r0OLa06/aR8Ck9Djs54xGORTf6ja+KH2kwvfDhiQ9YXNvm217FkSP5bCYqW1JYa2OLQzC4fWwgFNuWxmwjXe2z7JzCLn9dvBT+hCtYp3I4AqeXwX1M9l//v8XkipnIxqCJzmRvVTjQ4mch5GbT48hKXCzafeDK1fWWUwvbsx+cYn/TyUG7mv1sLll4vMt/XIlNntowdB2lC6+cLBLlsY84ysbqUT/W3kFTiJIFy/3KNLk5FKa0MEKpzUMZawcZXHiZLmX5R4zyFIcEww6FvLbts90l+mybj6TM/jlmixPYzVde3V0+bTSMzmY5/erUh+WNPxsTjcVaixLZNpXEw+2NQ7G8Q6FkTC66soHMZcO5VPm8GYxZDZHC4nf7TVcOON4c1px8h8O/dWoxI1dgWrQh1UzE6he0kOLTLgUcwozLuXyMhYiS/TYkG0NAfEjCyceckWTgExdcfTCOFDnxUsewiR8cAOnZH5BDTmEjptmdb33mddx6Sai7t1zj81SOjEDMqlPRCLzxZ+Jf5f5cqCy4qprAMY002ZHgZQ8OWLzYrTheHC//qtr8kLxk7blHLjhzdVsVt+K6fXNs14vj3j+97yB3cccf8hW2evHrPgTXuN+ZDEl/8LvN0o1Zqr243HCr7Qjb1iuP4oqz0o1Vnp6XnCOvdfpjvUn6Ye4s1cfwm9PjZ1+zPaRI595/y9UwTmVrBE7vaGpU9n/lf9zt3/jTYfGtGFWPF7MOecZsc5pAp3B6QAejcM4x1vGK8fsZ4qUXrnzwHTP5e5zaKu6+3ttUfJ6yek760m230eWGn0U1+tT0GV+dSiKn/ME3Tih5wF2B7DdfbRVH/tLl73k3OOfGTvye2/oxGW2refcR2fTL/xdjeCrTCPBVeSqMgE4zPlnwFXWg83N0nVy63zz9BF5xw09MzMKo/ql8nC5GXGsLTKeJjmX8cpqyL/DBhQNe3Ak/+GcOo23nrnjifCqR3nL2/G4HqbaQrjGYwskZOjhSFb1s4c0efnMrNrqQeRo+uJVLNvzGUX+OxU54j5tzla9f/riejbj9t12N5Kcyj8DpHU2MyP4V/zAmM5sI3/R8U/KtFHXoHjZ/W5Vf35rmcQKoHMzKcaJhNpoff/mr1WDbL3LNIUfoTHbFw6MgyzckOBiFePsrhmuQykf6l7bjfY76SCz+qD5NjP5Vbnj4NRbwo3MenzIRo7CRjHGDWx5J2sHmo3Tbwy+l2iiu+4ar3IsMAP8BfjuxcKL02NJ12eld+4/wlSNi92+9FupTjjzJGoHTo1MMxM1P+G/iMyarFhQLzDqS0qQ2gP6TcnEdY9kfTbpuv2S0pXz1L7nBVlz3xbL73Yfm02YDhz4Zn+Xi0yOV2xubB/5eHV+YFmLzexMgZuSoMTO3Fu+ymcGFE2XElz5wnLQTBcy87l/pjesYy61Y+ywrF/ukN43RR3OOSceU/9JXxU/dH38F61RyBE4/b+//3g/GxOrf2syaWFzM23nh6JuahRcnFxbo8AdZvnCNhVt5vFgkSdrqaIO5bTwo0T4WaBafWIBCVxvVZxF6bOj9VyVfGzzFoWTsGdc5Vla9R8K9Kq1tcC9a+ubuCV8FpWG/JH0kpssKBBMHP1i3S9dJiRT2ocONQheVG7nhJ7bHFR0xwsi1ytds4+dJ9aFi3vb0bnfaaGIwlvLYn2j2/+Urdvt/+vMxP2OCanmzyVhHUkKuMOz1C9ex0Yg7+YSxQfW8vR37CtNiRPdJp/mdQ5tG4dLJvcEzf/bNMbQ5rtHtVn/Vn54fPYpxSYDAuy4bnILviARe+bDdRvlsi+tc9pXEN9opbGwO8Zc8Qxex2px5Gzb0W8Xib5zL31/9J/ZUVk+ij99w/NNfiE3mF+O64+uIoVDlBe6kr/zdV1z8/rdP4jYceyt+YDE71d4ss538qdw/XbvtSY4XtxM+rmPKzYpYtRlxwsCz+p888M8SrI9x8Uvj4jpm9bP3MZ9e0kYbehnM0KBn8wuGXTg++Zvt3I4LlxY50v0N3+oSFeNcG1KxDbd9Kzn6F7GNu//OqwGcikfgsT7R7L/hn+x2f+8fx3cg3z5Rxzc6epwOmDgdW/H6aYLhrByS+KKO2OIOjn0dL50YfXuTD14/HS38/OM828jSx0nF/emcyjn66DaCM9p0nLmRWj7naf6KyfEzL/zg0OTv0jpOSnEZZwWEsC5ZNnmG7djFxx4yCrrt0X5hwivX4IzIjFvF91wbPCDze77SL39f62sLfwzVx/wdzTf8UEwU/rI3JkQt8LHpaAYxKZksrY6NIGaTNyPNnMYhFnPEQgCgsGAptpFgfDWGPmIKY9KOzSN0xfnXK2wec4ilRAxf4+JHIO9q+Itk5ScRxXaTcrkfycrP4HixjrjyO11c65k49LfAWPn7EQdcHGH5NkrXIXp8IKXXmHjnCL5UfTA2c9thcyKiuL2ZY5vLpfRc9nXZdfGJQYmyJcE63vT9T17bnX3cFSIf+/L4/rz9jddigsTs86lDE5V/kRMTet50tHCZKzGLiqeFounDzGKBzBUniw/cxTox+ChgtnsO+8qtPrTNoeVtSzfzkW4U2mHDCKFr7RsC+apPq/wjOOMwlZPxivief+i04etjHMNhH7h0PvyupJyOYQMQVDmkg7VYcYs34qqvd7SBVF5fl9ryNZbs2Hl690359t9z9bTRMCZRHtuNZv+NT8flrxeHFt04scSC0OKLM44n8dgcInQfM0w4C5fFMVUmoNaMPsKgWA+58jd85On8akv9Kdz/xT+fNOLkosVdfcyTGXFtMxm/RjkH7baNyProA/2EY16oyleb1fCRLwrX5GK9bw74Bh46abGF0VY5h40PA18IPsgnHTsKuu0upceH2t/grfJO/jDPz9v8vc0eF/j+p67t9m+/tjv72Ct4HuvyeG40P/7P4qbzwpaZXnU62STOLOIxBU48ougxpPheQOEZOZyLBQtXkxA+SsVBlx4Yk12bRy32wbE9SacRT4kqnrbgUthYSB3t6f+NE4wv7LH5TPkJxO+ixWi7taFrAydnlabqutR+dGAs6Oq8ePGBv+sYHlP5cAaHQg750IUcwezrvMJyWFo8eOUlp/MWPGzjnXMn+k89vdudNpq4fflfw2Z4H5uy/69etdtps4nF4g3Gk1qrkwnuOnNYYLUAQuZ/oiHsOv0scS1eI+u4SY6NxnxLeBNXG1jHOoe4sN0PLUzbGTP6Ck8LKPF1O8RELsVXzqGXPcam8/BFgTv45C+MGLVpP46mKwbuBh/qwMsvG0fkoCg30u2cgw0ugcHf3IR6/Dk6KUZfFl1NFH7pVdVHuI9neUxfBr/pV2JyxOzS408tBk3YmBCrRRazYnCYLFRmjycOj1dhYtc3dz6yeAEf8mEveYJHnHNIwRAQkrZ6/4Dg80tUXx3wi0fIyBOq7MyTfaVNYukpkrguiXGb6Mkd+eGSiA1NuYOjEkZf5MKKiy5uxGmcsNs1SifeeOlcR40rKdJfCt3SdcKtXMRD6v0QlnD2YdYbHy6pkD0uzIF1n3HL8Cmsc6Kf+++LdzV/8SlYj215/E40f/91u33UnFEsKGZW1NXJprCBN56mSo/pPz87rvMXLDchbPub9ElE/QG3z/yyfQJiMVnfjJnilC9yaIPAt/avTjvDVzwt5GpfumOdJ9JpcdsO2XnSi6Pc+MNG73Lm2Qe1+7yQjY088CBHwWd9bErg8qac83SfckxcTOUKaS6q8+DveuNeemX05/Etj9+JZv8P3hCTgRnAjY9Z4QWuSQsWdWw6UGqCCAtbccWzr28Kylf5mXRjM+BlLYuV4t+J4IGF1GytxQxFhXbKj61NgphIzKlD+XE0zuhfx5pOjDhgGNmH/AeXgcXYjKdpXR88Cm2mlp/ERf/gjHFI2mDBHy/N4W34IQvnWkNxLp9kLIcvODStts0nQeXHhUlB9iqwMHR8yhWKrgOwCj5Kl+hQjdlvu0t0V3g/fW23e+EVtMeyPF4vg/sm481kXuDgenRg4lNConoBaFEDVEWolK3J1nRscViwtThDy63GwcUX2h+L7K9Y5Qps9CUA9T+kNjQ6QozbQhJEu6WzyYrbcftDRu6zs+qDxoF/Ye5+OHelDaH0SAopVehjqd4oZMeHcdxjcRsnrgjyoRuj7Sh0leI8SOnmypt5nH/TX3Ejvtk0NeEe5lW71dTMHbbazVz7/z0en04bjUfs0Zb7N/1/cYHMVCYvs6kqwotJODMkFqY2o9C9WMQpn2MJ1cxiIZMIf8uNPWZp51gPuvhIfuFKyeeywNPic+l3w4THh64j8urEFlK/kuE05r6DURSwSF07/coNxxtU9olxqz8O1AYUJiWda32cGMkVZZMTbbuf5pgnGR/aKDCqn4wjpu9Rl+BykrdU3zfbUCi2FdPsySf3rbiOsTR/svc/e03NAj+O5fE50bDJvOkdMcniZ21NXBYiE5iJyexgUYQO5JmoiVwcOdBrIY5Y+Aoqab3yDR88ivNZF1i49ZR+wMJabzrkprittNRtIPUbLHhazL4+4mol6JrhYFNyI1n74RsPNWKSXVgYowdu0+kkbRAbVexQ0G17MwAQrgsIvUlx8Qcm3fHGAKsnzkcXKbgcg9L7Wb4civINbosr3iqXebPcarfi9z8Qp5oXP0WvHrvy2LwM3v+1H4iNJjYbbxCamEzOqHqUKH3gLDJ8IZicmxycxRMRnbKFmzdLuK74oqo9v2Te4icvN5+KUT8691b6lH9cY+XTgqzrkO58gXVbp5vZFz1zPJIxH3aND7Yxrt+6Fi528DpmnfDhK063u1+5Ggef2ooUisEncJ0TaIWX3bGZg33OJoObnJdeEdf2+JXH6GXwm/5V3N6YCWPCcsOjahEwg9pi0WYEVhNesmz0XjGHHZyRv+dEt22+7Z4PX+FM2tV7F3wU+pklXy5z7vEMB8fv9rDR8RtnDELXYxUYNn0Ifaw++IHVO5qMNVZc8pJa8dCJx45iV7OJSj/vgEyIMHOaX/1Qn4iBQF+KCO6YLosnscJJHAVMOB+Rg8uhDBw9DLfbfYqbuRCi2NfzGbcPWfr+/4xTzec9BeOxKo/Ho9M3vSludC0UJhnVJxtNLLCYCT61DIy5UHzNFBam7S1Jms7p8ehRCBs5QtUEdIx9hTPxzZcOjwDXnN16xFIe4rFaHJA2meCKQw6vilAHBs8lOMLhmR8d0bi0PsARLz78vkW28ZKEDhyuLkqxgvVhDIMAYq2HdAwO9O4b/KldwimDm2bmBq8KPOtglBkfOdM9/B3ves8B/vPX4uMp0MeqPBYbzf6b3hI3lUXDZK6qiVv62HS4942DOdvierEFV5MKm0IsADa+poOPn3rLDzYWELEUy1B7HwdPpJbbbRQebfNTdT5WVS4o9Ent1+ahvnlMILiCYRJLP80HBCse8agqwVmdfgK0r+iiCYscIxbdXAeUnwD71JcwRKEP9gE4n+Pshw8m9lqqffMqF7TO7bp9xzBwKimtd64xKLHRnLHZfNSVsB6f8uhvNG/eeGTyxqKZwWRkhkRFGNMcKHxgMWO0oOQsLjozqXPBbOMu3TTc+LG1mMtGKE5K6uYoR+HaJNgEKOTuhQD/epU/U4/Hk1UcMcSShxiqNww1mjb+cRqEZj7cihfdsSF9TU4jCTcUdF+L+pNwfBYOIbjeDBRLHJhYENPGNEazFNvWbSNd7bPsnNvFnKvHug+3yLH/R/H49NeuwHpsyiO/0ey/6W0xwWIG9M1FE52J3yqqJr4x5gCLyrYlM8uLSUGNYz6cDd0LSzM+Yr3ggp18561ZLH7o2iki35jIvS/EFn/0a23rnUj4+OvfPO0QQ6GPjbu1iSgnfZ24xCq0+owuAOHrWCD53FSjOiSlcwVRG4uSpj5iyjfbY2MKP/ea0ApPHaNwx678gFEc133GLbtv5m9xjNX92//CtdE1XI9DebQ3mje/c7d786/FfeRfarNQaoFq0+H2lq0JiM6sgUfpduN5w2Jin/tOxzmIbbomaesLLmG9bXQvuhavBUwA8fxM32PAzS0X0Ci5ycBR13Ud0YbahkTOWgnaROwIXCofVPcrdOEBgWl8LTtGn+Diq/45blNWfv0HrYI/OKWMHNjlRx28rgc4+IV3XkCK69is2z7GxW/OMcklURp3/4NxqvnspxJ/DD4f7Z+3v/ntu/03/2TMRyZ4X9zYVErp3kBsS27FzNhsR76+qR20az6y6VoQ9GUD14ZWP0crd4sbOfDP+Jyr+fmHmaOf8Yd4tK9/rFkc7OYf/VI/K6/7bN7wEVvXMjiTzfiufJONT/64rANeYIovnxY4/MaFssLLdk75I0YyPsQtqbYbtslpfrULKcoqz2TbX5xLX1Ptgz/a5dH+eXv/zfxP3NY3qe4pH3OtO+wJopnCQqLwVRT8sVE1zBN98J2X2IoTh8S1eNW2bXKFrolvjBwU26jGwKtfuKX7q9Jttjgoo0QOxQDAxWBcbNe/w+I/Ol5tL/8pzuL301TXSaFHPBTaqYbGdeGvaxg+uFHcJ/xDNx6AsPKtYrf4FUcMXO6ZdedXPucPSREn1aHPmHldeujnnHNs9896PELtPvIKWR/58ug+OnmT0eL2xAxpG3lwiuF+w2FGsMCKPxYNdsPDSi7S3KaLi82sJK6KFk3HaC9snQyMIymR1xM0geVz8A3VpqD2wAj0tZQKrELeald9C92LOWL4kTxfIq/xzsnckcxx2oDqOgeG39fUroWmKZK0Yb3k2JyKtLLhEMOYo7e6ZffHMLgu1nv8jMG1n+asW3a/dcueq2Eemv0/jsenv3oFzyNfHtmNZv/Kn4tJwQRndkTVnCzdmCaqMe61dSSzpG8q5UPA0yQqTEY92qziguTHik2cJOQKOf7gTQ0kTlPqk5Ttj4PNhpze1EIqN1hUzXDr3sjglo6L2Bo3thuVWhn6+5zSR16NoXn0PXSZJcvV8zjtSppHvh5PYN9QcKq7NU70x31QLMHksCS+1VBX7c62uPHR2wSjeMicD2zWO+Y4aDMP+xevZf2IK2E82uXR3Gh+4tfjrjErmIxVddNLX51kuMGNt9IJYiE2vycwYWMTwU8xF90xTR+x8Ar3RoFP/uYzJ8nbn+O6UKhseF4RBQHrUaLh6p/taFNthz36UNek/qmRcCGJ4Z0OXDhp5+INf1JD4q9rOeBF2OBZj1zCKkdf6DjMv1T9irCB4bN/S1/5MNzWRtyKG37KVk7js6x4DVWPM2/O/4tP73aPwUbzSL4M3v+NH41fm94Vt5ZJGXW1sRRmX5dajMyImePTinFzWEjG0Ju92oQK1yQzz9yQWlTmNHzkA5vqiJnwOUb9gMM1mEufbaMHDm+Vs67Z8ZbiVkxcu/6DWfIF5nhk13u7wu0vKT59s40e5Sg3eBp3c0qKbz2k8mFPutoDo9BmCFegzsdmL3WRL4yZ3/CDTab5lMaxhZ99GdfzSJdH9GXwm38z7hqzoyakJ6x+vek3lDvtScuE8w1vmPzwmPwsRuLt7zoO86Y8mnkVo3h9VJ7KIajiRj+cH1llzOJajMZX0nkA0UneVwuxtrmm0rVhwHVFLV0yeJgai1D0/+UHlspH6vmoFe07h/qSPnN6U5m7+B6DSqccramMb9cpXnwQp/Y28oxc1QfbJPNwGCPHQR8qDv7glYrdsHFdMzbFinft6m535Sk8j2x59E403/ILu/0rfyFuGJMw6uo0wwIrXLd04mhSgHWe+VuyeJqQ9vfTT8szOMZCjlNCtSmOczbe6A/YLerIETz9B6yO8d1PeNH+6ItPOuAVu8ppDFn9pk/ikKflclzkyX8SMfOIN7+k4guXLyjGlA/ehj9oCw8DThTFohCHXRiQ7/fAAaMIR1ZMw8aeaY59tnuujm3xGnb2VPUX7NErj96JZv/KX4rb1O6wJ6U2HHBu6FTNCc+YoDOn2+Kz0PganHKRwhuDZiU8ihcZ+jSplK/hzc73IkS4veD5MgjpRZfdcsvmw7XImN6A5SK3OZxaIof+XRQYdvnHyafyqE/B0XU6Be13LPMmBT3dai6uavlly3Eh53wVNrroHErW8mVTifYY8QPwuJp3wKmE8tOf6krnOVZOUXS50rrv4ITUuHM+XP/s2m734VfQHsnyaL0M/pZfipsefzHrv9jVguauMnmZODl5xkaA7QU3fHCIYXGFfixOHPuLO3JEqHT8zDgv5JBj8+mzDdwxKXODIQ6fZy02RBY/vChIXYMxc3BUNdc28hJ/WczpxZyS2LSn6waDYo7HBo4xJHzajQLu2CHhVCwYJiW4y788rzjlzQ3ITUDNDYmYqoDqK/kc2zD5k7K0V3YA+t+9qlzqGTqly1kv/uDZvxU3c7c4xoK7f0381H3aaDS0F/5j/xP/JvoYd03/FT0mfkyhcZKh+4X1k4gWA1ONSqkF0znC7S+u4iauF5Zmq30hx2YTC9LtiNvbo9/8MwFmaLThhau2pw+fMMQlrjYGrnWsTvK40m6ZqVV+4gJYxRVmnvpSBlxvmlrclVebYTh9/epDUCV7nwpTtxhH26XTmRqXs/G/qQ1H/18faRMqLrkoylkyRN+YRLEfrrstrDY78M5R0ISt4giIYp51287VbXMszcH+5WtZ/8gVrEeuPDonmp/4rd2OOmYR94pJ7kmMzZ0Ne3Xiwe9qDptEYZoo3Y/uTYSZF7baMOaZFb6xIeALXDbxFOJSQ8lvdgC41JrVg2PuJMfGEjHVnSXvzG12z1tNpTfyjJw4mg0+TlfhGtdXuHLCb3HKVe26TaRwjwHxpZvv+7aKaXmUgzyFIRom2L4uG0eRs895LGf/bJs3y86zD+w8/Jef3u1OGw2jdYHLW2KT0QSPCRv/nwXFBpK7HFI3274uiYqFMlYs9uzHpoTUYsB2TKheIIrzgiupvF6ImUddUUzLQfqRB4NCe+SZC/nIUj5UL9ZBpa3iqMEy5Sdv861ON4HLh3R++gkfTAlCWjde7Qlv136pHtV8bcpN++QhR+j9EoWna2nriF0pVjxjltW9Fcd9WXHof5S5/dne4iiwYt3ezLM9+feve9nu7NOecoZHSvbb+lBf2P5b4r8HrFkalzQmOJfXK3cWm/cT1O7Dtt+ckCywY9XxPKqpEtdyOG7wKpc4Ncv0mFcx6nfoWtQlleNyXNLcX3JVu+R3W5I9tvs6jr5h8++dRo7yCzMfWUM34puPRx5wS7jUSJvtWcIDt7QetrjwwErOOnav8MzdkvbPPue13zm3eOaac0zOucybc3bb+uuuxoU8euXReHT6VjYZ302+jarq26q+nYzpHppDTHxD61tcjvqwf5bFV1ucJKDD4VveXLAom49J8JhR4VYsHxEnHV+V8S1Lziir60hIQfr5mmByOg8xYSsnuv2hUvy4w2aiQlxxeszwc504olqO/MD0G5/zmNds/Gwo4oWgYK7iMIlBxofHoMJgp69JY5arOAKrD847eChR3JbuXdkDR4my1f4WvoX12Fv5i7v/lWvR5FOwH6nySGw0+2/9lzEhauGwaWjiIClewDPOnQULqUld+ohtfPvHhjRzyUE7HSc/izSEcGTylhe+3YceRYu5+qycXJf7Yn/ldt7ehnQSVVE+GyGHP3LKF/kHBg/cEiWqeJNuDOmxH5uOufQ7UygnsPIh3Q7xpSuXfZDNCVWxJetWrzDC4HTebHfO4LU2ur/rgwsYpduzbts8bGNdHsP/xbXd7leiPv9KBD465eHfaN7y7rgbbTFqAcTk0SIMOf5H1Bpm37iP3HX8LPDQvbEMXsUKhwsvMNm1KYw+hK0+gHtFgKHzqxKPO/jISSEPUh8hK86m/IkB5d/ThKY2nJ/wnq/h4Vp81skUnNFGxyu38kOYbOEBU8xx28438Ir3Y5Rz6ZqK7DFFFn1IKR4f2nMNReGzr8Zg8OhkFNvWLTvesa5vcbq/63Btz3LL13M3//4NV3dnz7+iVI/Kx0O/0ey/Nf4remORM9Go3LXSNZFrAnbc/iF9p82NFAclOF5UiqtNYeQI29/uio1clTbFHB+kVT7zK6+CWn8Id59iMTdPoI5t6Ij3poKvNiG1C4GkXRZ3jNvsx3YO+jn5lct9Sbfyg492AqcEpIKUH4tYuM5RJHHgUbkOpH3NHj7Hl3S84hRducjTbPtnvjn2WxqvIRm5Zr95c97OM4dTzSNWHu6N5i2/vdu95XdionCXY0KNxybuEpNvq+KjcFe73xiLp+OlewLL59iS44SCTXwUVHFRw1jF4ycvJeTgGoNfi5h88idbn7LrP80ZekbxSS7PeGzy2MZM5ppnvHjkhqe46sPYIOQMX6Ze9QuM0rnaMMLhdh3nQLVTgf5X2eYoT/W3KKt2O6Z21fq6b1sc53eM2xlcrp3rmPKZX/Amp8fcDs85e5zb/tGru90nPeUsD71ss/AhvJbYZPJ9R90xT2xdiu8Yksuc6xG/Flhwkb3O8StfPA4NP49G2RZ9069FZYvjOPO7T49VtEvfKs/KX32aYvkPjitGcb4uc8NWm5NkpYzxKm7nyd/ymis58f1oJFlDoW60NswhPsJVxbFeuPIHhq/zrFt2P9hsuy/g9llf2bGxrOLDaZ7xFb/61Tlzn2Zfj7+dnMHf/9jLoqFHpzzUJ5r9t74r5gR3jm8+KiXukr5BbTf/OPGYX5KJoHgU4vkmnzjOr9z4KS03C0QcfH4XYywgf6uv8gR+YMNtcVAwVehTGNp8CgqxFx87/INru/ro9i1XXOLIS3BJ6Y4lVxTFNj/0wS992PDobxR4rrIxqk1sTjNAijVe0jnKrSG3rpgMA1q34ZzyHPe5XyNXi7Nvzt3tmWNfNbvqE8NJcVtdn/Ng/9jV3e4Tn4L10JeHd6P5Nv57M7yn4NzAvw7mzsQkUe0696hsTdp6HBhc/I5DUtoG0n2k0aNR82tTAs+SJ6zwqy140Z42BtoFL+k8B3Ylol21Z7sMbQDkwA/W2zA3pNt3n9UHrq/3reWAJ67bRcIPcGxAtFUxYK6D41jCmn/EN0yNFV9c2nJcteG2PBYRrjAkxXZaadNFijnWdS2F2+d4S7iUbh/T4fW24FFmacx57Dc+S/MC37/jWqR7CsZDXx7ajWb/ln8bN7Umvn5ZYqJyl5BUiu9q94Fv2Y4LyaTUT9kNG3mrTWxP3uEDw89GUHXYxh0flBFfm8+w8RUWqsqBDRobrfCk5OW6z9GOLj8+PAwjv/tOX6Lgx9c3BMAtW9djPm3QXnE7320pN5RSkKqB8Q+SDk4zgVNGXJr65HGIUiI59DvhlVQ8fYvS/bPebd3TDLn9mMrf81h329jGzpMz7x3Xdjvqh12JBA93eTg3mre8J14Cx0aju8diY0JV1dzijtUkk7SNpLKI8YeO6dgulRMehMpt2dsjvHCtJeUmhkWIJAclcoy2AlttQOEeOdHhU4j1hiGg+SLj4IVv6LRDfykBaiMy1jeG0NUnS7gk6dJ88hWuTaLxRkxxcZlrqRj6gC+KwuODfp7nU3xxFDfnULaWt/yrduD0uMY54M35wt7izNhsk+ZWWDWVY1EGMa5A6O94+pHYaB7K//DV/ovfERtNbDYqMXGi5OMTGnZiWGvbPkv7LY13yWLHjjI2A2zj8dA2FvaCjQWuSQ5uX0gvfmPDjrxDh8e/Dao44ejUwKPN5T+jWbg4xFScFrL1LosD33lpy/Fud8jr2e6cT/Etr23npK/CfF22e7vo9peUHbriG6axxO4+9MKEh+n4bgecixhu6YqzjiRXFTiUwW26fcf8W/iM2bbcaqd8Z3+l9Qvs4Ss+Bz9kPX/re6PDfBNzd1LuV7Z99m/ZYK6+y43P0Khu/fpTvPCfaQj9q9MGV9/4rZ0tvn5hqlj6pHaJAaO2fnHNgel6lavz8WG7H+4nEp/lHIMbn2VxwRQS/P4rTpjiy2dOl6WLB7c2gmGDRcXuWNeJWdkVQ5zydbvy0Mc5xjbSVTnKtt7lHIPPsVs++53DnBnvfnOOSXO5B2++Gh14uMvDd6J51b/e7b/tX8eoe5cvGe9UeDXM/y0+bo7thQ8vZ3p8m6rwH1rqvIWb8QtvfMtGDubCcuKY4+ubWm0RH/7xTW+dGPNmTsfxYadcnWRGTvw+XcCzjow6eKUPrk8r5iCjqj1zKx/4gW+DK172dbRL+736ejTu+GpMjtn6O5s2buIzfmCuYSq+7OEDryps0sNMP/mq5M1d4kZ8+O2DuoUbM8/yGJ/Nxr6VrMAQZ/854/nQlofvP+W5/zb+41bcGSYFlZvBxMpt5vCP9sJdnHzE8V0n1nlgVJ7Itd6szCcNMRRvMtnu2Gzoh6vCsJkg0c6IDYcWfcBwdZKA1/E0MxbcMzEilJfYKMoJYA55XMiNTdsds11+5UanjS7DJF6xSNqoqvbQ4fBRUn7rSBxRulRMwhr+4Ys2KPYPvGONM3O3+OZYOne3rVs6T7fnOPuQFMeYZzn7jtk93pwxrgBR/tXTu90f+ozUH8LPZQY/DJ1/lTcZ30m6j75I/Scw9fgQuCSPN/zhHJx4pGjc1MEdn7n42xzVkaceRaot/XslYpTT7VeeanPJOfFGP9yXalsTi1zryiNSntXYSO2rGPWb/OCUkEOFg6+4cEbfum6OpX0k6rHgVQtOG1rg47EFDl2xRK9UI65sc4xLsqkRExK7V/O38gmrGMWTo8V3rOu9beuO67yOmee+2Wf8duLmGMdKhtP+kvu3XI2LeXjLQ/Wr0/4tz8QNiJGP+ZR3AoU7sch8V4M/l+fiT4zPBSO2H0mdC0rq+Zjl/MSGrpMCOoWZYQyeK/FRxAULWycZ9Dzl5OkEHa5r5KvQAEOHX0V9Cn2F4acPURQX9pAVa77zIlccYuAGqM3IerPxz1WPP3CohE9S+QKnyF8SW+98aCeKfdLJ4fZD6tIKE178HjfiHdty4qOIs9Ve+QYHpYrzWgL3fJ1n38yd+Vv2CgtjZVeb77y2273z6d3uQz7DrT5U8uHZaHgBrJfA7UZo3vDBnbHM8c97ZbzfE2OWtVF4g1CgfcR1HZN2XGuTUgzcVoS13NpksHOTyU1Hq6gmFgFRx2MVJpjbsE7btTnptIIdBTdlSPcRsDhI/GMhY0QffE1I6YWZqw0kjJUkjwghS9+U4XMZ/lDUVjiEQTBWfV35q9/mFB0x4pXHsQ03Z1w7QBT4FLff7dvBzUFSzsvT/SIX37hkJDjWB/PYbB7SjaZmOldywQunGX29tTuqic+i4CZxKYtvedzg0SOqHxvMlay44SOH8yDb443j5G8cteu4ksKIrXhiR1xwup9fiAav5el5t3Rj/oWJ/MZWbVXbo/81RuYaxz6KVUwb3zHWcsXHUUr5uDRxatMYfPxRfenqT3FHjO2KNe4Y2+ScMfkibuawkZmrvjSOccfM0u0ortq03uUcF1SNgfOLGx863ZWvx6NTSu7fdjXth/CTS34oyv5V8a+0x2z2HZzuyrxoZAcHGbG5+fidR7/b1i3bBuGcY1aac0R6sa5mlLn0BZ2+hFS/0l50cLCq0t2fjnVe+A9iml+bUcuhza381R/3SxJM1x3doEivcTS+wrY45odPCylsvcdBglUNc9xW5fQGQPwGjzjj58lzfW1TES9spGPchrEuu69fw6z3GOudw7VubTDOvyXh/+TLo6MPX3k4Hp3YZLgxMR9yNkhpOnfSGByKsRlPL/x8uZo27BGjx4fEB2aTvMNP7laFz7YDA1cj+KccwvmoxySFwKlHJHBxcBA/FbXLzIxint8HYesnafIFx330RqENr/qsTQedXMZom1hq5ffGYTvg4TM2ZCjWD3g4oh354VVbYPo5e8oLkf7DpyiupOxb+MXhuqI4drSf8IIXx1zL3nbHjBs7JtVukW83hk4pLkbr166F+qVkf6jKQ7HR7L+9/rlBvzF6k1qTZgw5hGMYePdbT6lNJyYx1lLMASldCxWbE0IsDLUXuRVIG4V5QcvPwgXPBbz++dx4uCnKEx+bmwz+uj7xzEcaMEafvLGQryoNDL38igXP/uVibjznsdS1hF+bFP2PgtkrqdQWglzYUQYHrMZNGDpKx4o/4spn+4CLP2rHO9c6zUif8qkf9p0jR3xwtnTl3oifx8E8unyQJ4ADLHi/9vRu96tRP/gzqoGHQ1z8jeat/EGZR7wNqqGDDWc4Ko67OBc4DXdItJPnHHz2l64JDJGF5fjabBRfC66fEMQ1x7GRz4shMuWlVVvKYx7OyOlNAKI3AlzHivjhVBuQ3F4FjLbByz84YGw+1S5+Lw7/40fiheOzrkQL133u8c4zsIilCA9QsvINvOdHh3eMo2zhJye6Y22DRZEP2fMUPnwQo9zK1mZ6Dq/nOI874lxrNwAAQABJREFU2ill2JW729Gp/U+/fHf2wf+E7A9NufAbzf5V/seTW2Mad4AJoxK6/sX1EZ42DrjctS6tE5f6wWajG+04Zgw8F9uW+KhsPIUpvmz1t/wsnBUnTG0uxEVRXKqp9xzhVPwxGTm0mEgCxwkbX1D5xREp8wourmABmUvJ7EOSKMoG5RCDH9c/uDVeK4xkE8f8rXY6NnQCeo40s13ajOKcSEqX9qVn7QOrW7SKAZ9zgAH2fJ0jt4GkAh3mqRz43vU0nw9V8XBd3E6/jT9x50bQVeSsGwvphbfiOA5pvcWsMPvzV6rxS9UBp3LpG9Z5K3b0wZzuz1/Almswx/0JWy9qm03bOsmYi4xTkjHxOTXNtfjqe4/tODGTrRNNjaWuLyjujqVCpkU8uMRuxAiLD2Jn/+hC5NTJCVldW21AM04fCnPOHkeu3p58xFTuwXVb1bceY+6WdJvHZKTLU1jl3eQFuIlHzOhfENwny595OdkfmkK3L2759t+NvnEjWj24K1yCR7/rx+4eeOfbLsxt1WzMPwB03s7pWOiKm7FzbG8UYzZtcX0N3TdvDsWhfY8VOXv+sRk5T+TwL0+DW3lHnkyXwx25dX1gtFNSGL7IS+rqwpBubvy64o1h2gBGHLmijlzHeBv4iOn9IF/Y9vnxb/Src0sf3GYbcy7bluD2DRmKr3vmdQ66bfMsx/gWx9yQ+5/9sgAfnsIlXdiy/3b+dqaNLvoY/NLVezjj7rQYY112vXL3nCPPwstXxNhRxwKu2NG/8iseXvf3OPS2WQyeOcR1f+AjZ+kHG0fjmDv62nINjDbcnnMGRt49T9OOKd7BuBODrwSqqaMrbCrgyHjkuxT1MhuEN4mSTjW48LfyHsFHXMS4bTDpxFSc27HsbRiz7D7r+I75O+5f5IxZOs+QoaAf85Nn00dcxT5Em82FfUfDJsMC514clpg88jCJiqH3M6HjctkODi+8moCjhZbTuS1jc0kv70hIiuUKZL2k7MDNKXv5tanetUAZxTkCGPF2Bl/XycwzL3Rf3ywVZh5G6L2PI3/nwONfZ0cyVfKjB9zzyyZf4efKYzzjtH8kj/qc7lVbQH0BFuWAM/cLnjHrxyS8Yz7j5qzsAI0jrZsjWaB9B7L57RvxARgLuf/1p8P8ErwXvlzYjWb3tlzUNRVjQNEYZcs+toHppIGc8DWw5BDPZOds0i6lw2Cb4B9bwqEklunpa5URx2rwBoGfUwI2epHG5gFEXnwVhxwbQsCjPTiYmaP1GDCrfNVP0eaf7UlQpbpiU+O7570Y/aAPQWBsR7+rDdpSO8hoi8pphfFplHznEnDHpJu3EVPXtsTAcQ7HlW28t2uMdqq4q+SsbEuf4Jirvjlowmee7Ars8ebNGI3MWLd93Y63NN65+H7j6d3u11+92/2BT8e60OVibjRvjf/Y+Fv5dmXs4iNOH14qHuucLrYsj401U8ucrm/xmcjmzv78+RuU/6LfSKlFSRy5ayMQicUKxokIP7YLOAW+edGuFjS4/egU56Vv9AMZcSEWJpz0Z84wyysOLtlh1SaWG2f0LnxntK1NxZtibTj678tEKONyUMGj6pHIeZGFS5btdyT20Rfr1Z+0C48Uix8dPAJW3OKIG37J+CAvBbri0kzbo5L+zt3UK48ytLyZvHLcinPUT3wlRTg/fHVWyoLbXzH7n/+y3dkn/d9FurjiQm40N7/D72amQY6Juc9/8jxG1OOeU8cWsibdYN6GonDHHpG6wWwb/XRDW94IvGmAbVU1EhPH/Qtbm4tz1GYkzHr1PWIUVSlWV2RsSOcPKQwbnU1kKcpYMXuduvzACkj7VOu1kWmxA0c+3r1oIZMb3dXtVbg4FUM6VT6Iw46PwSl/iIHB03CY3zkQoygP7aauW+Xcagcj4/EVM+MqRjm29BmDSDrjlsZkN479s1QnA3ScbXiUgae52pSAONU8BOVCbjT7tzIFeD/jqdBGm8nYSrcWV8Y32rbqtLqbPdMGfXDty9PN6KMf3dTnyKWNYuFqwXgz0mL3aaEWL31QG9i1wdSiyCzZXpIgmu82Zsn1UMlFf0p2XQMGh7Lw97snIjs2mwb9jM3JpxrSENdPMGw2qoHjU15ibRPTK3jlGXhglGFjmAceDuUrDu4VFyAKtBXe4pIx4qDBV8urmMRNVzvFTV2Rmce4pZM6n5NUyJIrgBVWhjHnk5x85mhMgvD/fvlu90f/plu6kPLCbTT774i/BGYg4+4ff1xiani0l3H1YefQs3DO16phd8Dy3IThXG0qbqEvbDBvIPQdvR5PcFF6G1qogPzvVZEnivwsXhTX7jNnkNc5gXNJSRsfY/FGv3Qaydx5riE//Zw2G1HgR9XjUOnKtaHTLjGkc9dDTb18I2fh8gO2WAI6T5zil2udHzDixbNOgtZmWAyp5g4uF+tdSo8PY3Ctzz7sla8Se3NYxZrYY7Yw54BX/hD7X/zy3dkF32hqptYFXABx8zuY1DF67YYwVXK6MLjUPmONLTI3qFvzMtcSd2CrDz3PRru64eAsSGRUnR7M5f2Mc+DrevF7rHOE1B8Meiwavm7DOZoc7Tdsjh929HtPDa5q6DpxPRH9LixOOOJ89AvCF/dHj0vtxOLTzYEMDtzLSBZ3q4PLkBkPXZwaSnRfwuo2YUTpGDZcjW/zges+Num/b2nxDlvlbP7EA+iY2nPeyQePMvj4J478Rey8jf4t7c95KudvvFrNXdSPC3Wi2b+NNwaMeH7qLmGqhI/5GHqIkNbSu3iwxwONWGsffjIwS5BT0YzLFtzSIS/a1jel+2AZOYXHwlLBRiFfYNKrXZ2C0AOUTgy6SKmrj6EqEL/7Baeq+I6L67bt68NVkUovKwCVfOezHsvo082oTPYbsdldYgN97+7s8z53d/bEu3f7X3pT+GKz0SYQ/UEerRE6+2iXDgm3JAeOksMHFkV8ZPjFMX/xjctWHnCUQ16A1Vb4la/sEWc/xCjg8sG33mQ6t32Kg1uxoaoIb1jnQbCd7HX8kdj9L33F7uz3f7ojLpy8UBtNnmYYo9wolu0iMW6AlwZTzvMErybVuEN4s3jjyrunqPLE8ppvqIM2JeSKr4YzvHAZ5pAguKODbBJsKkiXbhPHyceFWHQjjredvLXl2JItPscMNm2kHLnjFLPnlBLPDrnhsIlE8Pi7pNBvxjubj/qY3e6j/+hu9/+8KjcabTbRLzZJv59BakMtXI9iAdEXxsI1zMQmKRweuCVgFGF8NByTgmQ4UTzmYPIbK7nagBoWcdAje8VZwgGMguw6hm37V7L5xSuyY4bcwgOzf865Zf/mq3c76gd+Ot4LV3R7LkKvdJqJE01f/dx616WPy+jz7T2erZlAqsHUZIJXmO6Y/ci4bGIrv3iaqRVj/sAYphYvP1jhw3a8fSxssLDVp8L1aGMcTtb5kSvbtJ9rLb1ktr+0tbY5iVDxl84jkvWV5PuG/60oHpei8tfBqsGPmDM2GGqUs8/8S5Ey3qO5Xq7TjTaVuH/qjmUE6BEJWZWNYDw2cb+pJDbeY4yZh+08xKQ+hlN5wEKRHh/wGXvJipHPehiykVu1eD3eORU3+ct3Rh8cY77tEef23JeQ6jt4w6z7upxP/W3t/+ZrwriYhS5fiJKPTdWVccOXruWmwDeOR92+ZcOIaRil/M6B3XX7m1xyOnfPEUM04j1TLHvurbbhVbxmnXXyx6YRecdGpP6YHws87NyAkpubUPXLfadf6JLkznjH5c/V5FrXPaeYsbHgIw5ZG8zwPRkDHrU2mSDsdv/RXw46m0tUNhskm83YPDjhtI1BG0mz1UXsyKXNJeTgWy+fLzcvK3jgVQvzEGgM5Gc8yFNSumMm37G8q5jWJrgb3OSQP2rk3f4CpF/OB9e6JYB1S3iuYF1fc/a//BUBXMzCZV+IcuM7OHZ702BDocyDip2+w80h+eDEZg2yCnKuOBZslc83s/nbDFni4A3OmEGFzfbCzT5iwyle5bIvNwn7LdcbhjeQ3DR88gmuNpzcQBZf/q9bZt7KoxNOxIXUi1/1xb7cZPax0Zz9hT8b/WzlIz8umo6/dWLD8SOUXhCzgVCDO+QRXZuLfRGjS6zY4cNf1UOANDYNofDulx4k8Urq3pIj7HF6wIedYpU/YPEGF3vqg3OB2ydJ3s7Frmqe/MY7Fx285cTApiCdS3pubhd1s+FyH3i58Z0xwcYI0p0cTdCsOZJjM+gDW3qNPMFRBhjx1mcZlz5uVPhC14tUaKuYbjNcniGWBJTufLbJAyY7OLTR9NFOPQqpr3Uqka/peUpZTkE+DeUvU7S/1MENLNvLTadzcpOqmGonTzqBaQPidPPk7tKLp00mWjq78kWRqh6fLofUicYnGQhx15Q6JJev2nQ2klWl+xXjDWq5nJajcuHz0Cp3fAgDxGdZfGHr2OQ3/4gntiqby9bJaOQzN/KQCpwiia90ydnGF5jz1zWt2h7xxMKtfH3TC2hpL+bXL38lyIUrPJw/8HLjO2OSMpZ88BJSJXSVtI0i86VluUPIp/j0Lp7UttGZdRtcdymoi4oWLQgoPXsUmO28vlz0oaswa+LVrH5xAsCmlF+bD3rgyo2OYl6osvlbm7nAcztsbmFzlld/4hRScUiYiy9i9pFPL4dz1M5e/Ekw1uXD//hu9xH/4W73yz8WKbj2iPOJRr0Bcw3f0MkJHkIVG91YSWHgrc5Yt61b6qLC4HrJTaIDmfDozxw72xo7wCgjf5pKL4x2FkzaVpwCZl7YnYvb9shpBR+EKMGpUVyw33rNbvcBh18QGfBgPvusfSA9uMkL4CpofsGrZ1zhY0TDQs+BXaJE0sfx04umUy64ypFRmW+5Q9icAjoeOjfcN10+hi25kvLNMT2P+RWjE0RtANo4yq886I4NvWH59y3hi79zWR6Jkr9+P0M8tT0SjdNRPRrpnUz446XveAFcmP9TEWcveH4O08bnGZuNfm3yJlMbSj+pzBsIti41pH3jJFNDOg3jfCts1xDm+CgmPizpr/N03Zj6YA5xUX2yKDNvy6Fv5A2X9fxfRyVHphKudiFFQajNUNRWYeDyFR5m5izbfmJUZ39tMhNv/88v3qnmgZ9oeGzKhZ2fjHWONpuOtxNGMou02oUOvWwoiS4RxC1WemlrwSr1SugAsEK64T7n/U8P+XqPrAespphpgdUJRqebcZqBgx8GCxbN/Uu5nIbYKIJTpbWSSNBH72r8OudMFxZtxcll/P2O9Bux6dBW4meBXfr8T3Qzh/JT/+pu9/pXVI5ogQ1D7SGhl/SGIrs4xuL6zyIu75n5EZqXnDlHXHUhfKy5wTH3AIPovhRfXHDs8LkIB7PPDrDSD2QCh30p4oofxsp2zokLyTwoSo4sfvPXEkin/ZLxz31/67X6ynDURZA5ux9gT278ZI4Vg8ry79tNjjCj55HU9D2APWVy8JOfuY5dmNtZ8uYkC1uTrefo3MTVgeLlyYFhtC90TRBs9PTpuoRjm1N6XXduPsl3bOaPXJUzx6ePlXOkzA3JJ5qUyqWvVJ9yKp6/BC4838vUaadOOWcv+NDwHy9nbDYs2H6y0QklNiv9NTCbFos9pHC4S2WTwT8OW750DR2+aHtgxAWk+MC7b3AK7z7GTf6QM44PbIWnPW7V8IUy3o2EDr6qYA0Pt/x8wKMMGQq5Bha6Y4U1G5p8ocR1MMc1zxumvNih2Lf/lf+BTBemnO2jPKjeXP+u/e66XgRnDxiqUapbYHRw5StSYofd3+ISwvI6P1cllnDeJpXYtvvUbH1LYieWJzJ03nsYT5nvZqwnR3GxKJdv+FigIxY9PMqT+lm8S9EJiPZ0Ogp8+NHhJTf1bI+47GP5xcs+6D8VETGXX/Kxu0sv+Q+Cd37Zf93HZzvkYHx8nSt96h/c2JzyP9+QfSIObfSfPL2GV5uMrhUi/lkqQ8U1n/JgRxn9Kl2g9cq5WvQ5UqKpvQoIPR+ZnMA5iq+Fv3ClrfJGArrrnJJlDGxt55dVzzn5pzYvf9JvFfmBizqvP6B+PKPHpqVxxr2mCndRVXboA1/owhh817xrtluuitGNGvy1321bjhngyaGbyI1dqtqtftLfzM/X5/wVu7b165Y4gY+8qeeJxNfunL4mS3PrBFJHgjz9rE8zek9z1J/vevxOhl+i8qfuy7e1yWhY/70/qU0jTypsNmwiMYrjlBO6NiGwpY5Nhk2ghscnHNttqH0wzPHiFlTM4NhGHuiMZ+CjYs8Y/sDauxrzdYuckxyh6w/y0Fc1jDmH4gIfeYuzFTewNSffW4K5vbU/0PgCwhlFnJwnN//FVyV2AT4f2DuaZ+I0k4ssBilUCsNDKVNjZg7SOJw4iiFWpSN+B5MYn9yBhbH2kya3iWzUzLp5uFWcJ4xYIOnNfq0/w2JxVclHOmYcJ5uBlp4AeG4yLNbiakbD97c9OeFz6klOrio4WWDq2jTxkosne0P/o+oy4kQhZWQPH5FnOs0Qczvl7JP/693+f319dIOkUXwKITfNY0tvEq54BERpMXQbZsam9BoamP0HMoKVqyQBap88oY8+ERjFiQcHTJ6SxKc9+uWwwTOh4sqva1D7APgm3mgbXxTb0oXoQxuI23I+uyMm2wnAbYR02/t3v9bMBy4f2EZzM97NMCAeH0ZCSzdAj2sOmIdtPVa5g6cPj2PMwuP5I29vKHy1dEXP2HbTKsk6pzJWQ6kXUtlq64pGwd2j3FgS8da08hPdGsq/i2FbiI0kNquxoWhSsblEdG1E5ozNpvLk41RQW8m2+SRnbijJIyg3sOF7wQe1yFuof/iTdmfP/1O7/TveEP3iyuhfCPRuN3z8F+9mjvofvQucTOTR+lM+A/KkQ/nBowyOdQD6YAkeOibFsbILRLiKVDZ64GLpA7uUYXcSehQHmCOsGagzx3a4PAajLcXnx/BhVudyZCKBckT8v3mt6tnv/TSxHuQHM/e+F14A33hbNsvg5ABVN2KQVrZGLTeBA275GFkWj2uOdNjkcq12nAOuizHs3vaI1QQNvifXql2i0id+64eOvLLrcSbis136BpaSjSIfe9Lv6xhScQt/jfeY4ug6Cq82c8NyO4fSfTh74QftLr3wD3JRt1+eH5tNLFxVnVZi41o9LoU9HqXQY5TFiya4DaqBsfiZkQxn+JcNqbpibnEyLsBu84hie0gSuh1LMNfAzIVHOeCDFai4zjFOYBTHoqBThJVhvbcvjhziMpfGy+dVPPc1ilJ1fuirfgUv7Bvv+GrYD7w8kBONTjOMEXOrhkCDVzrjtbKFL6DPDEW3d5hLbGZ3G0lYvCxYiv3yhJGM/Fx81jKL4vStWDdeUXAirqjObxuH2yA+N5tqbZUrZr1ssqV/eVzCjgb6qYYTiWx8UdV+YKNkvzJX6ulC5xGKfsE/2z3xko8eUbetfOJf3+1+/O8Enba9QdCXKGHrBTbXg08YOEpiqRcGj4Lf1YBygIfDPHzKVZhi+CC3ZZHkm/LLhSNKiZVu7ECeE0Mi3I6x7cQDN6eAEnlan3zEhj97H0pxgbf42qiCtP/tH4bywAv7+H0v7/2uapKBc229YDBdga1r8BhgTbRQhl55ILvgqzLaCEynjIjXzVF8xcq3tFXJo20WYdacuEFU+3DtK935o135Vjlpkw3EMZXTueMrdZw6fNoJ38JvsVOO3LD6KYXc3c4/3DPG1/eBXv/e6dIL/4CH7c7kn4zNhtkUXR5Vp5YYCTaYqnmSiTvaeZu6OSHJq1NQyx0qYzPaFCfsg1yFjb5hV1WOOWezN3M5vvOMlVRbFay2qiHrcvUY5zKG3fWYT2HnnAVf+AuW/JzrLTaoN/7lgz/V3Peft9/73fGfUaqNhuVwrPQvLDiM7bGy7Vvn3uaQMXn40QZvKA2DrtJyj44aKxn4choJTLz06fQw/PWNL3by8nThGN6pcGIhNvSRhxOIOfha1Yto/I5bfDnmxHGS6T9z73fP+4IP3z35kn8/4p5l+QcfsVwn/ezVfRVGfvyWs16xuDf5U5zziF8x0iOPZHyMPAmNG+1YLeziK0aO6iPxc9yWPzF9IRZdG4byDWDK5cThD1Ubh6kAYLZF1UdithMKLJTSFcLmVLHP+4R3OcuDkDpv39eGf/e7vbAYwDHtx4C4Mz6FDDsUBs3VONLYWpLbo5763F7y4RS3vjX07TFil/xuc9xQp5/7EHi2FXnRuw1XEyC/YnNitfbVbpw4xKl+jxOOTyLgEV95fDpRmyM3fvNT8vW/cNF90kn5nDYZBuff/dPRZoyqTh8htbiR4aOOUwkcMEvrjSt+xTne/Mij/+rowOGFkUO6tAc2OOhVZ97BT889rveh5QhVuUPkZtJjGk/++pj74wTkij7kXKh8wc15g10YSvy/eL6W8iUWPIqx0vHdfPeDfYRiyO9b4SVwTKWsGrAaNI1M8xWHjo2FqsELoGTHyTlK5wWYi6/nCcK4SejNJ/7IlLFuEF/j+sfh3FDw1cRARoz6BN99GPGLXzHiEmt8rd/sm8zgxG0LPf6RwOhjXmffSOxPjFW43mTW9uUX/v7lwp+t9sf/2+hXXLFqJBkLOjA2mRiPZXMB6zZ6xYy4wsYGU/cg4ORGADEU5Y4PxSKjglmiu6LE+I2Xreiq5tiepf3I8o38ndv85oV7xIy2lhjm1uLP6xy2+ouf+URM6vGpmBjJLNVWzoXyFXb9nX/LrAci7+vL4H/LaYbrj+rBkc6H0XDInDgwHIPeC2O56atEzueYNTd/lgZLXvYRrvOmD29G6jNMbqhzr67MYHiT67hwsGhGS7QSRblSXfTYCMRtP3Frs6DVm9pksj/kiypu6WrV15H8tBZ/vgCmo2g3d8976R+pDjwH8aGfvNt9WNR3xt/VuE/0q1fSy0bBh6yi7pgPVn6PzwEXToC69lRHPuXigxwOLF1m5a4UiMEz3XJwAjA2pBVlyBwTdJi3EULlDo28oUTPml2GeK2NULU5LYEtLvPz5UUhHy+Fb/7263aX/p0/I+x+f9y3jeZ6nGauvz0ujwHTSOYylVpXrWWrAV1Q5tBirYcnh/G4HzacY/Hyuz9q1xFIL1R0F04b62xpVU/kc4shw7ZfsmjukTFNNJoIf/KzvdT5iubdTEo8qeMlf0i1m3ZmCFRtkRkGhv15FlNcoHguvfADdpej3pXCRvOrr8s+uV/IUasV2ej4SiLQW6XX6e8SQsUpFlIUxTXfwOQNf5El4qPMRaq1iefYWTo4cOeDgu52sF3MaWFwdW8GFsqGXr0aefsGs4zPCKx7z1yl8cTh3YjN5kFtNMze+1LYZLhYVa49qm13YLFzcMAZrF41bo6ffOYNDvGuxR0+53Ab5g2Z3yzu7023FQnmnG43lzX9zZucvNLBIrde0YZ+UxywxJXDbast++DymIPNKWf9yJM/a9fFtIuDG1tIxjSpf2ZQtv1P3K1NJlrc/bG/EWnjSr2xWF89OuEPLhy6aQknuz3uebukioEfVXE5N7SwD4eg+OGIsV5qxW/yixcUtWG5incuONaRGeNTRNrdv3AU53cyijOP+bro8JSvtbPYOc+UK2JyDhZfthJHPs/Hs90z7/waruiBFG7XfSnvqccmLpySAxBKjMeyUAuXn4VFXRfFyd+5qZs5OJWbNlyGLwDr+KSbh2zVPDaJ5NWNtS1ZGJOj7NxM2FwSWzYXt73ecMRTPA8zwYk+LBsQ+cmzVb2hpE/t1GbiDcorON/T8PL3crSR8n1e+mHR2l0sH+/NJnIyjt5kLL0JaYxjtCxr02H8hFnKDxZK12uzyTYmHzz85lgqB9ytShtup/uNW4q09CXgJd+st5jRJgFRbJeem4g88o1xoDltTBUTncwNifkROnnUcc8ZsPTRRuZJ3jO/+mA2m/vy8/Z7vme3e8/3aGji6msgSyxvOTxUzR9chvCwLEm2/UvErfxinkuqtjY5W756KGExRfEjCt/a1pH8XUna8KJO9vIzduUZfsYktqGwczAX6RjlJ2eUnGbe6hIjTn91G3ne76UftHvfl36IuHf147ti83IftcFU28LomG1aDT3GVwi4x3pwJi6bBkW8mlc9ZujmWPY8xm5D0lDPGSEqWuDWkbnAD3zpEqxEkYuNYEnqa69G8IsdSkF1lRWXseJMfvhrbhKcj3bf/2Pfoez38ePsvryjeebteZl9YHT5AYDlUHhw8/KFxUeLHLw+QOnvSOgxmp4D+q9guIGJdtRc8TE2Wllxlkw5gbBZ4hHXeJoAsXiQq4zB6faSg0vJ9uUfvEuRgTNPldYGiL7lqhXiznS6yRYyjgDiL++eeOH7h7wH5Q99SryriZ9UtXFE2+rjLKNdxsP9R1qnS9ZrDGR3jvx8OG+PKd05whyTwtiQOTbr9giIMjhl2JbT/gCNe+IVfTjsF16GxNZcWPzeNMifvSz+HCv/YZxiok91hZoVN37n9bvLvyfuz30s/m64Z00+E+9mnuk/a1dLXDgTTBW9arnLZlHyf4v/mO44SS3mitUNOCfefejyoL28UYd9XnDe4eg9TsyI0Ue1nUt7foxacuEnJmRMCNWV3t7rjNzEXNK7m8EnJuoNcoh3KLNf1VbEP/HC36O6Gru7ZXzcfxdrLFrUe5eQ0iM5MsZFG0z4tMnI7r7Qx6MOeLfDGHz7ClNM6Ej97Azea/EDWucgpvHCvfgbPuI6hk5AFLWFtF4+r7LC85plTNef9+YgPvL68cix+rJq7WhDKp59igGrvqW92/3ur/5tkPta7vmJ5nfikUmDw2XVHNOF12UyDDmIeX/SF5+dVFwgxnYuYBv0mbbYW0kWb2oHnO1WxrVFVNedTv2qXO6jrzc5Hh9PCKOVIWKJ63nKI+FHT7fNJNOYhtc9NpJ4ZsPHY9M9Kx8cP6N+SNR3vbZuWrTLtdCwi/UuVzqGrjxzDF/hw66Eww5l6G4sJBuBi9Tsk6DuAzB1JcOwPfIsgBeyXcktPyJqbgjJkI6KL7qSYxMGdnx4rHIEwq4Na9hJ47Pl5S5nkfRGIyhzXn/P63fX41TzxH081dzzjea9caLRuHGhoeji48MY9qLLqyExiG/NSbc/7bf9rKUTuTObicLJN3KUpafcvMVa9XXKlRtMbCwkCN+YaNhhrSZW8yeemZeWMgdf3zm1yIs3P5eml/4ZQ9L2ky98v9DuYWGj+Y3YaKpPvqdHZf/mp1ttXBVDx8dF5FVg58iEotNSEUokPxjdzoDAtri0AV6kHhfoiJHOh0sQ4YpfQSXEmBb86E8otLTEohcWqjcmcTqXGBXuL0qL8XUFmrkXn3jBv98bzT19Gfzb37vb/XacaHIYJDSeqZWd7g4dcFbOyej3cnLd2qxgd2Ez1waYSzlu4vBlhtmu27zeiGIxFHuZYNLA8cSnFljqN8diy6hcfKsMMV76jWrEMa2ya5mDnJ5qKfe793/p79v93pfchb8GvsUo778//pMTdMZjNaSvpxKIM2PdDv2cPEq76W/5UUVEabm9MO2zhEZR3gZKjY8GQRsn1YGvOWqx2jrQnSxC1pvLYqsNPoLruZZX4bvb+hAst5GcOe5s94Ev+OeA96Por8DuWUPv/l4WTaTX4OWFc9GuNIy/12PczrGu+JbPeSWnvI5ZySk2l+u6Pz0n/vH3NP2aYvLk+5l8n+KYfOfC9eZWcCNilEN5Mgb7RvnzPQ+TBl/VroOJm1LbBznjNua7mvyZW+9vJt6M3Y9NJi5td/bC/z4XZPRzee8SI4S9qltY5wQZPmUlE+e+rvFb2Cx4qt7NFNfYpoRTMZKzjW/Gwqb0uDDzEQtylOFDt485M/nCSVzWnFO6/ys8c+a8KG6kWewWF7ne866vpZX7Uu7Zo9O74zSjwfJlxBgwDBv/BU4zJIlh7G+nMLluk7qdLoJXfdxmCdVEDi1PHaFUwz1+4eBMjz6rndTT5zjHsIEMj/hMFDXdPmg9QOFk6ASeO7J3oM7Pf0A7UUUK/4CX/L6W8x6rL/ji3e7n4j9T4K4irdO09Y53fcUpsk95IzaU+H9fs3OOeTR4JIsiO9gmzP7BwbHFc4BzzXYlaPA47eCiA+VTn6sfXYclO4ieB3kHC4/4xS4OAcKJ5r7brsbC1EaFjPre9/zI7h4/PEcrWe7ZRvO7P3U46dVkXTNCA1GDk0b16g6Ew88N8TirwWDaDtWQ40e+4nS/rijwjimuYY4Xp+OaTDkmxOTk8SaAXQ1WR3h88kTKFsMviltQlvgAT+46A/7Mb9z9fp8Xvi/O+1c+6FN3u1+vfz1MZ9yhLrtOz2x33ZjHqm849jW+F6iGqOGZOwIcI9nszu3B5svfDMdrZsx5ikef4waMPkWOfs+t5z2qjQMObUUfJDPFsBNLn+ZKNbVwEzCPTOhw6QcbzTNRn3y/+Gcj97j49dtdbYYXwL8blYsZNVrIi8ymrMuPr7jc16E33JglPFdhcKNSzBkSrONlbz4qRV49wgRn+COahW+cXPmYs3C5eeJXPG1jD17lSzu56Q99cNGrRr6cEEyKnBiy1U7jhY9HL9d8tIpHqXhO6Y9Z1p8Xm8z7vuB9ojf3r5x9THt8imuN7i6VGThvGPgpLE5xkdbBXY1PEgL8IWtOBOK5ohz/f3vvAnRtWlUHnr/B/C1o/90g3QJ2i0FQA43cRBG0JndJKUkqJKnEiGDESSZkkplMLo6OU6macaKSWEk0aqViYmISNRfNtUxmUqkkRkXAAF6IInhBwcYg3Y3i39jNP3vttdd+1vO87/ku/6VpDQ+c8+zL2mvv5/q953xfd4feOMhqCEXLnOKhyTlZh/m7xrApNt14Y27F62KRngCPAZ4JsmaIWn/uZeaQzL2uvVJ7J3OWrfiwv3I/BSH4fuk9+Dcj3vh2Q55oHngLJiWnMPscBueajiPjAgRxapg8NRPT5Lg0FGBjF4H3Z8Xmk8IITO6I9RyyCQUd9L2hc0HDmnHpYTwWvJjEkX0RcSOKrXIiPBvtjBtPPnTzz/OE1K+2yXDl8LA/zaCQx8UTzePrqQZFahzdQ4jRtI6gaKnHG3q8MKnoV2zaCgM32mRT3LBrbyWssSVIFw8uAG+upyve+P9a0QALE3ZeGE5g/hDTn7iB5f4JY/qzywtCeq59JF1x4wLLWWJg45wf+y8eCC5/f2FubHdDLpr7/gmnlpPBAWDKUufc0QhDOdpPT5pLzM653O7yyrEhYQURMoqYeMusC8C5EQJs40snpiIqHk8qyKFfe2s2Mnb3gkGgOLgBiqo4aGP28MT/iSYKT0R4KKAGH68XSl1xVvW4l96gvwRO9uNvFx7/4sOVe+3jE6AoWEXrYGKG2+Z+lwvQT0LSA6PWvjJMnFJqRodaucMgW/amNz8Et7usnBlMpcfHnGnMvUA3nzK4YrBo1XRxQKcN+6pismNerHnHVF35fWi4PW7Fwfe+X/yrh49+3J8i6Q16v+6/3r4/Lpn7/8lcbc6LZiFcNU/ZwyzdoxSDSdWecX/KFYiO9M5mCStQlgpLqxatILRJKaDisp9s8kT+yR4EoevCYpy0sp/iFx9HpksITOIJOTjwb6tBY3peadRDjp3G7QfslcPjX/qYw8e89LGJ/1C8Xfl/67+uoAVF0Sx89Fk8x5S+9kMoe2LwFu0oB90bfvEpFgD+nwHydy8BuVwu/jU4IF1l4aHTVpdB0cgGil6pksE+4kI2LhScvuYRb692RJdNuetSU57kt7xPfurbYLpR7fr/evveuGj8f6hck5KHJwe3TKIwa19Y/C0JYscL+siCw8b/gVf/GzkQh5/6I358d6LFRO/fqSS2bOmr+MQoR/H2dyyoX7aFj3EjL/X6fgYxsTFgy1+Bx6bAP0oAmf343iZ/FR4+fNZ2mTWAgzzZF06/+v5QXjIxtMOFp9p3NfndDIzxchl61M3XMRn+it3rp19ZrzhxVyC6aHmQkRfEUw+TbC6XLbGyR4+WNHgz3uSAL50jX6j5NKM+g+e4ccnE5RHx3MfiiT9pSG5dMrKLlzHYD3nJZB7sw9LLfv97/1rWe6PerutHp8vx3Qzmaf4VNo4pG6YAg8X/sw1XGdQNhyRcHwoTatMHQHhhpTt2Yysw7PJhMdWGPSTDwp94w+KyGLFwROXpx8KSnRtH2sBzI9BOJDYJJEsw5cS/tpy/Fs/3wArZfSRH5sd+0nVd6qjiKtpt8T0NCtMLFKvstHmAylAD4rwgrgyYn5BTK1NGyA9FdvSSU2As8VzLdK+xNCZsim+u+p1K68gzKZlXtbMPf0NKyA6rxZb7QXL4FJd98KPXC2S0y0ZO+sNXKcSZWMQU7+XLP3C4Tv/qs6p47q7r7uPTTCSI4nNcMRoMqMbIiYj31iVYTTJxIuiQ7FwWMomOnRxQknyfBdaxGGukLgvaM0dwKReskrVw4lp9Wx0bhPzkwBNJSM1PP2v32cFTDdg4LHxMggQ0e3hCCgxgT3jpw/UXE5l2/w0XDb4Yvvd7WJSGs/aKhr18OTfCwS+5Buj+dMkvrB38sTa6oAocHWdv4ReHkjZ3CC0jhgrewTOeRIrAsTBFMPcLVy3HkOZZ1+UAVz7RoM8XcaphwskfOXXiFBOu2usjz6/8ymsPuGxuvvkFcF/3dl0vmsvxtzNT84ldXBPuDMpZwhPTObcRstTyZFbYxsbjAqYjF2guTPzigVc2ydw4gycXOZ9KYENxurRQBZnwGJt2kITIx1zI9K9xQmsDgQl/mFfh1SOWF89HPf0jHhlPNKjoE/784cobz3DRcDi2NmEoGwfIuUmbXSLQ0+NwszVJceUslayLYrYhWwGEg74rZ2XhaycNk16+6DgC6exha3thpNMXq91238mMyz1h/nzCjmLBnvEQQiMXZNjJefnyax/5F817/6kOUFaeA5jecoCTZV/hrO76NMF1/gamJlZLJIeoNMlpL2XvctmzNVfnoEVY5YBV9eUiIg9suaQhWHzGlC6sLg3gxcMNEYjkwubIyHgPQ9oyhYnw0OFz9JhHwscmlno43Hrk45P8Ni4eWIy/jBsf5zVD5VMfRq0Rp2ThaBwPnVIIi1iDMFEbkNEBO3oTwodGPFeQOWHKQx5e2mecfLDCv/c043war+KyzxwVXyNKLsnhRwP2Pe/9+sOtt/5JGq7ze324vHbWvGiyYExIvYqWA+NgYXJ9ldcvbZvLJmzFzF8GF79qiH7CR/7Uqw75JptqrFj4+JOB4xJWtvQjX3G3P0475KP/jFNsRn5RS37y4KMTPxYlDzDgTe7xJfGDYdcXxf7HepTjn85NP79MftLnPbx/oBelntguPMW+FI75yT1fPdcbP2HxCt+JX+zOsXV2gi8C8YJBcqltU9KyZ66OidBoe7aOR1w25YBCmR+ZTA7etDk/bCoYXIXhZUIfLwrukY09QtIWcfnFbvFljPmoYw+BE/tI3CFXTO638r/n3q8L1PVv1+XX278YTzO4aLxh7tDU5yhdT+/Jbx1rMP1Uh0n+zCylsHM1gwDx+VM/8MKoByo318Ih/j2cbOgRy57WlBdOUKOGgYWlbOi7ruJoHRuDo2cORoU7G3r+OhsqY9Hf9bm/4XBnvB5p7cr3xH9614pnxWUwe2MwANldjsOSbc+XuGP+fXtaN5z1nNg51tjQ24c1pKJDD5/Gl2tXdUlmz4sg5bwAGNMcEXPMp3jQav8obvTwRstamAvq8Iet6vykp+C3Ote1XZ9/leev/FcOMEuLUWOaMfiphXHXPoFKWYP9c0BA5Fa/Ukz2ip1swSAdk4smnVrp5qOfi+F4jwdm/JEe5MGb8cWXP1VSHhdH/kSrushZG2+6XPh0gyhy46+AWU3SxQbFcCEz+sLhlqc/KhGPtLcLHx/f1fzMV+U4suKam6xT8ubA58A4FGGgmay5a1v7Ym5anmOIpRPx/AdRLU3YcCDRBgf1ziMhzfFWbmPpNct9Eo7cEwFsPchbPmrPKgyHfcY4JJ3iowbqw656Bm7E69J5/+XXHR5z86cRep3er/nL4F+JL4Df/xY82KOtExwmjOiMTWuDwwr5LKG7mJpgZ3AcZG5IFjb5VETVLCx6LFfq8HUOZtEGFxf0xgZcOj4OoREXjHYRasPkR0HF++brSwdx/DiFmurnbdYHeujob3vaow6XHqEXzeFS/KXwha/OecR8ZMEpQMaoVls5MTC1wHWTqB6OlOOtbFyjchhOsORS7oRVHU016mL4ERLnKJ7krjcd6NwfhuVHcebgfin5lLg9Pu491ic55zS4pGNe9JGKNvguHO659+sPn/Cxf6eyXp/umi+a//adPHwsR0Ox4nKssfHDteMN4LBKQohkY9qIieFcLj6vabgc7/x7dtnQ65V1Vb70h08XB7Loow3kNT5tEZubaeKIzdQXSMQlBjaygCe/q0lO2qeLKDYGtiPgumCg49+795TP/QiQPDLbLS86XLj0osOV99U/loAq7dDVgEbtNWf2SNEXSGIbGcDCYg5TDN5uJjYOAoGEOQaWKZ6XONeX8swtrgxMF7C6DLiWWKGxr+RLW4RPehSWuYT3OSof45zziFzjEN+4ZDxH/IOWl19/+OV4qnnsdXyqueaL5v3/NcrWwpSogeQs55thhnFXAtX0B3/iNvTKD52w5YKxWMWoT7rwS1cPOw85fWAcn7kzKmOAUYzwukRkTy7jg78vjam2WOh6shGGXLVhMhfHxrzA16WVVfAjFCjxn1G5EE7Itz3tun3XH2w3oN0ZH59+9Hdr8ZgAhaNlH2+TThdsOcfTBVA+dYjzQ2lU88VhAcoVCchPH8w4/PX/3g9prxpGaEsZw/VivbmmxT1dJhEy6ZUPNegpF5Wkbj7Y+IXuiIeNON87JaeP9aEWDKg5a64U+74HXv/IuWjmp5msO8vvN1RdDeJYAlmP9AVUuMfJpsg8fgFY7cMvKTB1mFds6gsHbNokYCeGlaQPtBWTvlDXS6RxxtWYskVXtcei15MNfkuFWGHZV275UFPK+K1D/HIm/7kmlBT/C/1TXvLI/G4G41W7EE81uSmi3mx5aDHyMMgWGsaZTb3792wAy549lVynHXtjJVgMTBmXlFijrCTM+zK8uhwQx9f2QG8OemILlzktBrlAHC35+lKgnRcYfCyOGOrMj8iFr8Y1X3AD8657v+HwsZf+OAKvS7umH3m/8J35N6w1maxnDCx0DIZjT6d8e71Gs+eTbUwoefufgYpgYbxvfNSgjzWy4XDqhRplR7zssg39SvzzRfiV9fh30wAz/CWH7SG8LEfjCp//HJNhqPNX1nikdb+4fjX49MKvr8cr7PFr4F8Nm/yf9JJrfliN6m58u/Bx8W/gwyHQ4UEf4/RX3pxhzw2Fvv04GBXbNsCABQf6eFXXPGXPvRIyD9uI6cMXpvYBl5B425WRirVkbtTVL9bCMQ679hdw+WcOQZ099I5lXsTm0wtyRAL4c08JV7kHhjjVICz9ip8xPDuwkfud930DhnJd2lXvxl+Oj0w58VFdzn+Ug0LRoEuGDpww0Pca8Ctm4uigYR1S5VsJKqaeR2qjjNo8Hsldx+WBJlv2haEN4+dCCYcY+PKQKNZ4c2OFrt6x4EDLSyt7cotTdjz1TPGBVR03hQ8fm+74xEjya6Td9OQ/d3jwnV8zLz7Kj7mdWqicd/MJkn0pjQthkQcffa1XrpU/9YLi8GXLjh9Nc/+HHSauOTG5rmnTQebBhj3XLiK0R8DJvMWvPMBaXc2ZsYOXnEMn31bPC6ZzMScvIcgDn3KUAt77HnjD4UkgvA7tqi+ad+tLYM1PFRN7fWyIsMGNoq+mIQ7xfG7aMnChad/moCXfa+KAFI6xuoIGt+Mh4xCrQceBV0N0bsDi16XAOOZKvgjQxloxujTECV0Y9PKPHj/ZyK2e3Kgk/he+Z37OVS+rynhYe1w2H7TLptc1xsIdUOWkTpkYjre8E3S6qGq+EmAcM8YdSDv0XMNQMb+Q4cp1LxlPF2jpQx8AyHyVPNkYPzCmF/fwKR4Z+KQx8WaeYQdK/pSDj09HI8fADJtitE+R6/74Uvj++K7mlovPR8g1tavakXiawWu3cc7b1agW2rURAPFwHmSDmdPpJrluOu0T+OTPPjh0vbTdeJEtYxJHTZtKiyB/YxFT+O7dBmA0+HRhJEfY/LJITNnWCwd4Yfd9GMSVw5Oe+mvriQZjvvDR8dunC/ZUg6FoJ9S8popJkC97zinQbGEsO3Qc+FZNAE07tFFgg7Fxsw4z1q8BJXMdQ0kdK4AXLweguea6eNTPOO2ZJkFgtiKtXLl3wi5+5ZrsO3WMi4axoGbs4EL94pMPcT9z3zcdnnn7tV80V/WXwfd815XDu78Lw2PD2UarMVJZ3k/yzbG6BhaCRa2UOTlMTIvsgqdekwib2Fc7fYwaC8/Jx48w4PPVCxJ6D6p+osinHjEmg12XBey9QQoDX2IMJ/ypfcXgu50H4/WB+M7mA/EN3AdCxvc36PN7n/KPf0SBdcCHHPg+6GWfzfE+8654OorXw9EefOvvjV91f29vop7bqKmNKVc1LYcQ/8/1TBd1iFxjAvkeRhOYowxmB0YqDnXKZaBMJX8AlT3lzM+3+akGtWiP2F4KW++rqhe4sc+G35+auG+EmzGaB/TrBaNcqHDNQ9uwe+xn3fWDcF9Li1+GRjsvw5tfge3IVvOcq9qynNaf7GMJxwqB3eOF682YS5MljIwR0Li0Usv3Ipv8hT9ui41iGOUGHvK8cMxN+yIHdr1gxLHakS9tlVe66vAeOOi4ZPglMS6YcdHgS2L4dBHhn5OCjhisZvYmQ1du9M+463C4+64Lhy+IXxTdiHbll7738Ktx2fRC+5NG1KJ18Y80jY2CMP+uQ9EaISa8o5XiH4sT0aASWkdoIBQHNpfDy/rcPmrK9Y2AnM/EjsuB+wY//ljvMezmooliiGUeycIx14KJ8oBDU56hE+sXjPb0x1/6Hw9PufQlDLy69/NfND8fTzL3+NNMJ14Ws+21JhqR2Wsp0rLrtomZwkrR04l8vbHaT4Hcge7NoYioYLHhgKGpHvTC5CJWTWkvHzEM3NgLkwvvsSH3xpM9evxDkcjneB561i87etiRTz0uDvzmKS+buGR4qYzfROmS4YVTv9lCzsoHnrx8rGbmZg7lfNadh8Oz7rpweEX8F2+vZ/vAG+8gXZ1ozXsadcqhRJ0Yd5/2EtsWfjS/fNLkHABIL3zzEQzEbKq1gZG5CPE8XUO4Uo4c6Pmyy6bsmFM0Hepc3+JXnPZE5kms+Eac+NFPl0WMRdzyMR/etz7ncfm33PV6Blzd+/kvmp/4qocOv4TvZ+L/vT6VfNVV055dNgzmWDvZt1NAECmm+0xEbbbtY4HJVxXYMbD7pgm/YymHcdc+DqoOj3JwY5FbBxm+PODBlX71ZW9/1kSMLom8ZALPPi6duHB4sfDJRZeN/lWh8iFeTzae0+tIGTlVX/Sfetfh8Ow7Lxy+6IWhXGN76J7XHB76+df0xc4NFoVV09xNBz3dxLgfIdTDVxSElgIADZDY2lXCjl+HHQEpF9Tt6atLLNc5ErFnDOqSvvcEkvNfMZzzEa+8ivdLBDLw+Iwy7dWqlTGDCzomgfmqtsRu5U+49KrDU6/+qeZ8Fw0umLfGRaNWc0w1qp50gaI/ZjfIrsiJMBcmMZfIbCU6FvLYdBVTRQjXvdkVlz044oX94vq0gO5LuRax7ChNmwqLmZsAxmiUA1/YXOyQcREoX24y2ALfuNCFdU5g10sGH53ApwskZegxqAeDEzpiPA9szWuybJ4bNaVe9X3RCy8c/ug1XjgPvPljOenBqYY82EWYl2yhTwd7xw9cYsKXbrxTKA5XwpSqPZXXRZE8dmmIJGuJGK/DP4plXJByvphL64qYIWMOXeee4LzqEnA/cjLv4FDMijtJl085Vs7QY9zKcdvF5x1ecPs3YlhX08530eCSeV9cNssSzXpUtvqvpjKQYJBzo2Vrx6QMJPzC6K9t5ZXd+WXj4SdSB1s+WOX3BRBus6GqfsQDQz97zNBqh45Djn7kGZcEbLpwAsLLIXpx68kEvT4+ZQziihc9X+MPAhUHO/Co86Te6wMu9apD8hd/5oXDq67yP3744D1/+fDgL7yGxH7AIxeadh/Gve601aaDb3cGY4xr9sFdTtBjnToPRqd1c0zVFCbVlqHxhvy6MGADw3iRy/++xX2Mw3pUzuphR3bxoj7GjVzwocnuvJDpr/yJ07gQo3zb+E+Pi+bxF58L6vO28100b/ii+DkYlc7TzJxuc/m8FQmPCZkbLfmOBBAqkWMhc3MwGk9A8mtR6CEFZOEztvSOWfw8XL4wjAc+N4XVlHyhp2/qCdJBFU5PHqiHGyl6yKWjdwxzMj8uDH0J3BcKakIM4it2umjKJ87EVQzyZ17ESo5+rU21ey2q/Zt+/4XD8z4ugs7RPvjL33v4wE/+vojgHGdo1OCHWBd908aBRv5uge/4kPs5Je1wzfiNXxur8oIbobq4mKs4ilP1ERu+sI9LQvVjLzIOfsicq7IhR75on+OZn37iNMZcn+IVX9AUF3rnd3nldB9l8SEvLpkX3n5Vfy189n8fzTv/Wf3ZXE0sBpItKoAJhVzPNvhM8twlD29N7GSnl4s6aoTuDah8hV18HiMfYiDjAKYN+iTXRnJbYXIzpD0W0P0l6yKALxfX7IrtvjD6aYh/JEK/rs7YqjO5hFWtdci6ftmjz1Z5pxrDMeGhBw7N7dKzD/+r/vEhL5q/+TJYztZueuxnHi489kWHh94fv+rOncU45mNS1lZyoVDH/DSCGqvI6pIv5MQWN2TCGlRpedCgaKxA9IWScGHKXhSck+USyWCtPePmi4TBY/0Ks1kvz8nLjDHi5Pi6zqyZ9bEu7F/noCyfX0prfe9+4L8E29W1+BR/tvZzcdGojaLCEvOTC2/9mCwNmpEed5Kc8ckXB7d4/XDDr1fyLBjGM9bjGmvxyRPxwGUcfCWvPumqvXEWL5ueEqDriULx8LnNnyQUJ8zaix+bBXyIzd9KhKzxCaM6eTAxvtr8ESNbYxQf/aYBD6P6AqTNZHCi0c4N/LqfjS+M4z/v/Proz9o+4vY/E9A6ADgUeTCkg18yfXlw6vCkTzHqE1/YlrHOtDUffMlTTxQhYy7ph83sJcOXBzJw9MfH0rDhlWuEeHFWrxjhxZsxxYfv0bTGM475YOs8GcN9MLCjHvFnDHiVo+JyX5ZNMri5N4Qn31vu/1tnXcYJd6a/o8Elg1ftoyZYdTk2dlS8MQq97blR+Q5vS8HR8hIGe/oSQ5Sw6av8KSN24RJG/ukgGpY4LgIWpXGBSR0LtOTKg18c2HTEWWzw4MJAXC509eJuW9oj3vzTJRV2XUzA5CVUMYkz/6pPnFGPau7csmHMeAUXeuC8H3Jt1PLD/vz4GPXN+FR0hvbLP/pxXM/AYs688eDKMuZblrykLMT/jXl66kE9bAVsfAjxf/o5hsRZDfLBnnL4Bh9sXCP6ax6wLwqPHqcp9YqVjTHcB7zgmIOxg6Pjk9P2FHJXHnElT4yJF4z4OGDwTrhQGD9y5Xya/WV34mnzXO1s/6XK+38sysHk1wJw0Cp47pF+4z8lLjfzFIePIMyXG7lyawJX/oxvDGMTW7ap7saxTsXqoG0OWOATE/WoFuniVWzXHFgdch1o5cFFAHz6IZeeNsnCRN/xsSFzo6ie6POLXMM6l2qcYgqrulVvz2dxw6/mPtlyL4TiPPANPh2ispXvB37ucHjFPz0cXhf9ae0jnvC/Bl/w1AEnN3XI+T0LDmnUyhqRs/yypR921Fq+kHlIqfOpA5h65RzUXBff+mQBLOe6OMCftrBHnnwaCd2fULgezJH5l3pYE2vLNVMO8RYfOB8sGTjmGHG5v9quPSPcGJfvD3DwFfstZOYf8zTXfjhczUeoU59ocMm85atR/l2XXu8AAEAASURBVGi2D4cxJP2jCG4ENjeGGxeZVwONia8EHudyIg0jX/KEfegjEWw6QO0v7J4+NjDjMr7osJmkr7jcMMYLPxZq9FhI00vGDAvTFxdiIxeaLijk7csnZMemvfx5kUVo/r1M4RA7XXLpL1vFwS+c1wk+jdkxiY1Y1c6+5sdigIs9zLGH+C3xZPOCJ8N4vN3/ljvLiQNNkTxUUg5S+YgoX3YVVB0KUB0te/qaa1waaOQteRcHo8baSfKgIo9ejQmb1lM+XnCal+LKWMq5BpGDPThdpo46Zx7wjbqRK/el8Sp/mNoHmfa5DrejjifEl8K/9fa/DvNZ2+lPNLhoVNSpPQasV5QAOTelbLt9sIZdL04aB4xRKGfKFQ9ODFgvYJRHC6LefSmDE/HgEkfp4pv4PVfIfeAQLx96l6se2PYuEM+jCyHjxVO9LglgxK9fRyeH7OhrLBNfbUrFOo/n80sMc+Iv5QlzNowZDRi07MM29XAUDmI2YUp9eTzZ4AnnpHYRTzX5k181BUle8nEQ0o6eDHnQhM1c9MHPQxgHFHLFY1yKyR8cYedYieMPk7JhHuFPftjGK58AFBucfCLAegwM1yaeGhLndsjE6qJAL4716QKcsqnPutKu3OTHesw1KO9sVy7nVk2MJy9w2Cfo3xVfCt9zzi+GT/0y+B3/PH7blIvFxY5cuakwkNxcMFSTLfuI8Tb5wkF9e4lhkMKmnJsjJsdqkD/7sNNX/56WiOeGYq+4iQuYeE0Hr+KAhy/7kjH+YY8FEyZw6TO8akIvHh3kXDhxiXsXx3wap9eqtfAaIPdYQmbuqrP0jquao+t5bnnBKqb9FiNf9+3zn4Yjh8aSfeX5I3HZvPaEy+ZRj3lh1FgHJw855rQukMwHma++gOBvDOW+JNInDsSVHHauzU3kT33gML+8CHTQeeDISxwPJXjKF33bosb8ARC8Oqzy8QCTF7I+FkHO/ZMxQ6YtuHFp4ZX5lEu9+KiTC1i9WOPWzriBG3jYHP/zD7wxMp+9nfjRCZcMXmox36PFjpn04Wk7NpVjoLMNSRb0WHhvjnIZGG3wlPPIjHhhuy/e1iMIm4excxww4t6XsXkHBrMz8Ny88uemiDypBw4bAzI37uixCdEcr00Ebtj7IgGubNmXvOL2noYcLw7xjsuw+INXtWZdkbfHqZxVi3DZx4o3zmMgmx5i698a/yzlpx/5GPW+d/zBw6++/7WA52YCBwTkYOOcppw2OhIX843GGEihx/9dl4wLSw2XSrbGKgft5AaP7EOGTxcdOITBQaUPNjb5FMN5HpzQ0RSLNUMM7Iqlf+juE6/yHvOBQxjxrrHM42O4cHjlnf8R5rO0kz86/QyeZoIGLzTJ2WPQeplvxXFwzmFPMYqPnpO45DBez6lD0vVYvPJlv2cPGw4XYpMHGMh6ub6RuciIy4OJ+kJWbapLfR7iwOgwK6d65FwxyY2fVMiNPPUSp+ydt2rI+lEL4mozCiufj1E1ZL+MA7bNC9xlB0/GlU16+g0nfMA3zbGf/53Hn2w+8vH/S89vHgJc1njlwa2Nj5xl0xipc12F1RxC1xyljPmOCmkDP+aeGGHZYz3iJztemuPoXU6OioV9PMEMfuXxnOJFjUNmLtQCG+LGUwXHNutjXHs5aPM6XJ5jNSau4cjt+X7w/r+9WddjhqNPNPfFdzM/9DWYpvwhsBsfczI111GgN24JblC3Q16xk16kboOcevt4eSVX2IRV7/aMLYz8OrSJA7f5hxyTXfnyYIWMHm3FgLc3teH2nmhyswlTPQ6J28WVfWCwKsi5YpgXm9IuKKtl5UG8LsGVS/o0Fsur/PKj1+FOubAtn6CHK9fs7a+GtG3/7cc/gcYYFw48Gnj1q+pVV87euRZHbHGwA1GtZRjKlvyhsGcu8aIGyIDSxqCUY+1kQ4959JoVCx8a5hGHVzHE04eLgXZyOJ/jnNNl5XYOxQkHnePgHDgWMhpt8rMm2b/kzv+QmFPejj/R/PS/iH8NN36NFC/+80I4zDzQcwEjBQtiYXif/ye7Cl/6GG1u3uoh5yvonVeHLbHhGxO3gw8O4YHLF2zilF8+9OV3rDhQh+TkCKyeSNzeHMqVOC4QfM0jvurzKQlYs2tOnL/HbvzE2SUDDuNZa5Ivawmcz7HLqjdtVbv8EZZrhB5N9j0s6pM/waGryf6HvkuWuX/M4/905MH8xQs8kPtAg3foPJzU86kkcPrp3D/lg4PjwuGpA5ScNWdpK1/Y+XTDC2H8ROf3KYrPJ47ORc6BHbFYW2HB+2D8F7hU18DPNat++XN/eI3gDJ0vl7d1KFeuf3Eozm2SR86aj8gFn/K984zf1ew+0eBp5k2vwddS+63tsUP6nxNJKLbMaLPGmxNet2PjeHOf7LIJ2zoAGb+9AGEHTq9Vd67EFB6UrmtDigdxmGj0wkFH00HoQw1b4fQ0g5j0i0d6Y7GxyS2ek546sh4chopHv/nNlHIY7+5lJtzSq2bNgepzu48vcZVLclD2WsiWPeyBRYP+GfFdzbf9nlSnt3e/9Tfm5SIj5pprj7i4WMqRfcyHuAGSLyHhQ6OtcGna2sGfeQqvPB2bfpax+nI9Ms5qqbpw2FWT41yGn69a20V3DsdKxkUAGU088klnvhXHMQvjMeQiXrU+6eJzDr/39q/NPCe87T/R3PvjoFeB7J2kk8dE8z9jomeXwGLy65ULZXpuUNMTt+Rx7pQdH1gNUFzQZXO8bCsOetoqTrrj0xZ+Pq1wYjWmxIED8dUjr18G/Ikz/JunHo+vesjFJxLnhr3nCXLkcl0/bYHjT8sxPsdJ7pqNK/NhPPaa8iCnXooDVnL0aCuGVr63DzjFVQwQ8n9f/Bbqa18Hy9zyqSZM/TSTHOOnLOLzsqtLlwdRF3D0sMdLP6H5k518ktkDR65hx9yQSxjtDej8TZEw/qRTMZUbOGFzrZITmFGXnhRGT17pXCMd9rkm+IBDjq6z5VEfMPDjchTfwN/UTyuskZyqkXt78L/jjE80u/9y8p/656DrHxgpYyH3GvYYNs6xdixOG6vjcuO0RqF4G2sY8aqPOevNiuCMWW2ma7PvYeVbOaRjcYBRn3YsXNl0AN0vG7C5uBYvPX1WY274Bd825YJfsjh3bMqx12u8mMNs0XNMYx5hly3lwtLGja/Y7IXf4RJP9saTvPH2tT/AJ5sX2n/r4zd85KfnJUPMyJdPHJVDPvHgUpLsTza4cLzpaYR76EgM1hdBmWvOr/EoR+ICiLnm3BJPHO2gkq54HfzVnjyVX1heFGDhoV/tK4fyKW71aw7Es+qM93Ggfurff/+3HD7jli8E5Gjb/B3NT/2L+ruZnFBNxuhXplHYwLhtxedGDyMwUScXYieXcNkXjhNeBzzC8/Dmd0jDBt48eBEjfF4AnsNkxypX9snDTdH2iMsbXdwrT8T42HWAs06vq+Izt+zW46elPwWlHn71XXP+pOQ4Jy7VtfbBofow99kM0+MMh2oWPnthw9/2PZv8q2/RVQO40LoP3F9Znmpw0eRlU5t7frJB7Dhw+dMZc1M29hhT2NKOOXN/+dLmPsp8Apgxyse9ggMHPv/pj1hxDXl9IlAMn1iIH/Lgc5xqJ455Yes6e2wev+/fq7Hnq+v3WNaoSwZr9p/v+7vxfnLbXDTv/XGkZsuDEosedXfrDRaW3hglr76NXlziXf1I0rbAHsOtdlSMuD6A4gkOHcDkFaf5O1/Ftw7sHk726nOhavOiLh3QtRdX16N4xCBP9R6X2MXeONSr18pVdUe3HYOwikVfNtWY86vY1ef49NVPOciOdRlci449pXzhTjn7suMj1Pe9E5bRPuq2/znGPF8WfuBTzssEc8O6OLchhx35aF8Op/nGIQOmcMk5YmDHhcGDTfuQwxf4/sK3cONSmPF+ObjMHMDykIsfPT8acSyskZiBZW3iY62Odxmx81i4r5i791jOxTFbXDb3n3zZTB+d8N3MvfFFsLdYd24CCNZSDSg26XnbnGFsMvBgQ6oJl33YJx3YesUcZJOuTQ2j26RnX3zp35WxOed4YLlxaecBrQ1sNejgjp6bCzriUW8uoPU8JINffq9P8eyDE/HFgVo9BnaPTTlST70w67gK1xzwF1Y9eJBvN4fxrv4I4ZOsYtMw22BC3Mvit1A/9z9BY7sYTzXMHwmiJTcmk2rrsMM47yWuEzyY6+yjg0x8moavcNwDhZeN0IxrrvKpPtZGoHLAhstgz8e5HD7FrHaPZ928KMjp8WNse/lkQx5cNGjzWKDPHMTMNtX505ffdHjRLUDst+mJ5ifxK+3A6YUQyepFk3otsGx7eMWd2GPB9Vpy5kSHT5t66vPX76wRdmGVq3Vwy4+++DLGZG2qnDyLaTxswqsvvuSHTfYjveKZq8ZtNcl/Gg/8GqdixCmfetk3feR1m+YjzH1IM4dyRZ++9q8b2/iAKZzqzFhxlX+1pY63aIj7y8tHqFviqQb2/EmOJ5Hg00/ycQh5CWMdE5c9+KhnTD7FDD9++j9Uv2rOJ4F8iqk8kY9PB8DP+aC3r2qRDfbx5S/4R7zXdUxu3innyE9+1SjuWQdmfo2nHcZzDiBzbIifOVQfMcIxTtifeuDNh59+4E0Rud+mi+YX44kGi6jmG2S1yXdVPTYbFqX6oxzH/GbX5OSBAWcU2nzArXrZEmd+1MIJZV0Tb3Hs2bjR5xhyyRYLktw15uCSLj7oWWfhXMdPmxzb1POAOw/ik884TtKbE7wVO81V2VecY8A/+TWOndgwzVgYonl86mllTbH3D6+J/8rH99pHqFtvezXXKXONzZ6XSF4OmO9h1yEZazt843CZTRx58HQ5wD8OaM5rHeDkjVry41LZVl7XIeujCmXqqhM+Xk4rDuvLeoARnv2+PvKOWMcPv8ZP/oERL8YOWTrnY+j0/Yf7/l4g9ltfNG//lwiLhgVcX2H2DXaSDIr0rxyuCxM9sm74hDVfiFlX1gclWj55hAGfvzE54EHr+iHrBc6Qc3IWfh5s/nT0je9yH+qIHRyccOByHOjBjTzV+5e6isu+MJRt4Sxe+FxkcHtM4VRj1mc2YLsuyKWrdy7g0JxLuOzhFHfLYTCbYoV3HSGr7raUgYEQLfvihv6a5anm1se9OjA197nuXPt+YikO7QnOReBzn2AeETsfKtQ3/OulohjWxniuR34XU7UM+7gQdJng8uB3K8yd8x91qg6ssbDoB9btqgP8w668bss9k3VprAPPPEMftYx6yIlY2jS3AyveMY8/GU81x1p/R/P2+Ni0tpj7bFiE8zZsFoRp83i821Zu+aa+8rst5bCj71dsJGUcNmaGjsOI1j7IEZN6+DCJkoXThZG+ykdbTHTpihEv7LkgE575gdmLcxtisRo6nOLLw2DxsmdfOfcwmRN8R15eKzBoE1bcsKdcl3Ii57eMC4w3jWPiDozrwEvHxpGM3p9ogPvIm18Q8/s3BibXnTH84QOUOFgrda41ZBykzFHrTz9iBkYycJA3mKrTceJ12zGZfMyHw888Yxzw577LfuRXDvjQZn7qilt9jidm5KUP7+t4VQdroH/Oo5h/f//fO/zmW74A6tTyiea99ZEpJ97c88BBPNqez21AjolgrPtz8/VC7fgj3jGauOwRV7GyS8fEciFiAg3Dg+w++DnJOrBZ3yYmxhE2YbwHHvndNsmoBbErZi9uwaB2jxv6XHPzR7wwmmfNjfMIr7nJ3sY82cFZr+h6PmXrfi9eseVDPFrGmA06Wvawl6+5y4ePUGq4aG6OV651rGGOr9Yda48nk/6tT/r1Uxdzyj2Qe6RitWfkk47DLxty9EeaqDFzhJ9PB46jjB8U8u3J4oWPTy+OBy9/2ADHOkZ+1KLa5Bu5GCt+zc3qVzz9Y140duZgDTN2jBk1jjwY9+Hw7+771njftrxo3mZPM+sCryEg0+Zwn2weDz/waG0/YTOditmJjXWYNicOEjZr9uHExPlHK/lQV76AN1k2HUjhsjbwYiy9uSsX4svX8YkTfqcXPricO3k6D+Oau2NYcx9K2BXjtRiedY84rzPlqle1ZL9jw8bqvO4PWW0TG47VBixsaNlHrZMue/VfbRcNYj7mtj9RY+Yaczyx2XPMfvAxh67XwTWcDiFxfrjGgc5xR15+vBqHbcQM23owhWHPAwmMLi7Uzpha7/CpJh1m+WVXjOtcR411cMGOuUV+8rCGFa/LbWCcizLrmblZC/mR4+07H6HyovnFt45/VkiLHXVlg+4vGF2XLLv63IyxmJE3Fx/9tEGdp3zYJLuYI3YdLk2kYqXnREZs6yZn3eCNOqa8ZZM/fahVsboYyiaceFTTwDO/7OrTb/m7VuVBXaqt+tyo5d9894N6Gjfmca1f+b33MXTd4Kv60p/8YVja8A08ILILPuUov3C5NwoIHJriUYP8/9m+FH7MzZ+2uUD8IOtQ8dBgLuvQYP7yBwUO3XzA/YBB5kvrEHrEKWb0xOVaZQ7LtdGHz+NZ2+xT/exnn2obOVWr1+c2r1Fjni8RHzt49+sbdXh9rB984Y+F+//u+/shze2mt8WXwNoEMS9c1Oi3m6xs8p3Qg6c3SuVDEWhuzxwLds+P2D272/pACav6oLscemLDlhNj+fvwFUZ5ZQdPxhSn4tWjnowRrnrNpXi6tzxuSx7FLhj36bJx/pwTxUbveORIP+q3l9uzfvMNvvHklZxVV/Os3KGj7fndrr0im3qMKfdjdOBA+5rlqeYJt/6J9OXFkZcH5n8coPExIGzBpwsm16txwtdBaXvhcbnUBTO4FcNDi0M6nk7EMw60H1rI4pGdH53GJUH/4HbdZV2E4tQF5D3H6jnHBaQ6tOZDH+PbzhW4ii8WBhcLXxETiwaOt15+8+Fty1PNo9/jfwmM1bQW8zs1LfhkPEFZ8dBly41UsbJBTTnyyrbpF58OWePKDz1fpie/6YrNid6xT/HhxyTKppipR07xxOQBq0OsPm1dGzYxeLe45i2/ePPAWB7p6oFb+ZrL85Q81dW119xZHo07+7DHVIxWsnyoAc11yW23ePhkz97i6SHX99gTDex33PrHD++67xsqT61NrRHqY07axaM1xABUE/O7HnLGDxvinU+y7IMXuBHHy24/NtcpeYlfuZSD/eDI9bS44fe8Aw8/GuMGhnOATzNuI9ZtV4pAY8HyiAto8bMOcv3E5R86PPXis0gW7zfpb2cIGkEiOIvdMS5PHFg4e7nPZR0U8IwJZawfisyTm4E17+ngVUu+wIMzeRc548PHDUbO+fDWYlRc1ym9YpNf3NFPeWG3ly4Z5dR4J47mjZ8WxafcXh/y9OEyXI4LOcFTr+QpDMKEaTmErEE+bERxwuZyYZo/fGjKJSyt+7mEz964PUby+l0NLhscctbLORpPLmZPDHS9MEbJCy5qGE8Le08AjAMGTyN6mhlPEornU8rIo3kdMV67uDQW1SAdWD29KA6YPf7ZNsbg8Xqiav5YrMwR/UOxgP2kknk5R1jXkVPjmW3A/MQDP6Qly/7RMNbeaAdsZ20nYmvTOJfjJ7mKgE12bFK01qn2wXC7sJi0tFduyPkqrqQIWTjEOUbyeqhh37UVv/umnwbKr77y4TAoV/dVl7iyl015ou/axQmbj8OwzQ3biln1FZP+2GB7uMohzlCTP/s9n9mE8T7lygMZDbWruSwb+o+6+GmB+6aqMQiijTGPOdYTzPAPH9Yr7Zl/HKi2hxMHMDHxNq/vzDNyn4zDIZ95mEPjJA9r2c9LPPfCqG1gZ37U77VpPvC0opzgwh/br3U1FuTRyDP4ZEtn+d8aTzTe8stgBopg7gXexWB8O6/cfGFHDNqx2MYVVriMWWw5obDp5byFdQwXYMbDhkMz+cRTHFmD+BKLCY3XZOOYdADVA8OfJMwDrs6XPsu95i1+cKApHziymV+8qlX5p/EVXj7WNnjbDnJxh5iciw1qN8cuMjCKR6/WtsCjyee9xiv/5Msovv2lN5gS4kff/PzDY+Olg8T5xwHVhcH1y7kJm546pCcu6tr+4R3jB37E6qmAvvnpRXj0nkNPD4pRfcAoRnjpngd458C/mY85VOfg8XiX8zuUmGj0eGLJp5bIT27OEzm5T1mj8g6c1451Qt3sUYteh8Nb7anm0VjgWv+Ab1suON4WUNq38Lbs+WFDPjXHSIa/ZeALrLjWYQ+sBglVscDkq3K5Ljt6xKJNccXJg8hF7DxVW8aWrAOrfuIXfuKMvDuxOQ6zS2fPOhAnu2qArhfGIb964bKuwu6N1+tuniNzM2FXTOjZaizKC0406Giya1+5Xf4E1pvi3Sb5ybf+scO997wqOHFYxE0ZGNlxCDwPObcxwgOrGMYNLOzkHvkw57RxvUauEQdurpfbWGOuWRB4fnBAR5PfazqGVW58/BEGHOQbnNKHj3UNHdLgGPha0PQlJLmJZR481Tzt4t3pPPWJJomDUwnUk3p+lw89musp7/BMmPJ7LOZYm6yxZdPEb7jL33jUUtywcaHLVva0hawei5P8ZXOuvYuCvBEzcQSf4qNPjujRUM/INevKi59gwil/zkfZxadecdkHRj38kLtuxOOlmkp2PP3jwAgb0M26elz6nbe49+J6LDucwKNl3pozWg6Hr1qeam65yCeaHGOu2zjM4ye02+Knef4myZ9S6OcTwHg6cE4+YWAuhR24+elDGPHPuDWHdPLqCUKx6sk5j0djqnwxWfgohMsFTysPhq5asZ4+lqEPXtUxfLh0BofidTagjznhvnDMj09PNLV6y1pqTbtHcmDQH2sbX2044eWf+krstpb3fMYJXGLLlrrLSGy6DtoeTgeJGC6g20CFSZRNvTj9OxfYhN3ta6OijvRbn7VJX3nKjhjnXfOppuQvDtnUo37l1liCdjO+yQY/DBGLlrUek/f8GTU4kqtwcElPuXgho7mPlvn94y79scNP3/dNrCkKzNoybvyExkFKnvp16ngyGMmEYfw+j/s4h4x3WZie4yyXfLCN3BjbyDPb3SeM+vBFEo9FTjRdBPLRCru/WPNqEwd5GEnMyOs+bIZjMT9m39PkE40C56Re1EhIaehTTNSemzb63tABnTDShQ3dFyOLLh+yTLFhly1jCseF28kZ/l0f4sRdHK1r0QujcXQ+xVWvetTr0Ha/4DOP6lpzlB2xyJu1e28yeKaawifu9AG74HdrUhz4TNYmzVp8DOKEbcKHATZ7xVRmkw0KZNizl259+ioOUDRhqR0O/2n5NTfsH3/pS6bvLPiTXD/x+Vue/G2UPclwjDwowOO3PqpV4+f+EQ/mfPyE59MFfUPWEwifTICHj6/xZDN4xE1e5B855bO8AfDfBhE7/MrDvOTCUwdfzMHcs23EiYs97AMv2XvmGHVQx/whTk81N42J3S4oFnD1uw5/NmycnU2F5Ggek5vzyEYDLmqb8YgvfvjBuYdDHFrncp4TZPEld2zCnLDC+8HrQ4sc4c+47hknu8dl7RWTtXUMaxWv47ymHk9wKCdrHXMhzG5c5FMDDq1zQY6X8yZXxIizYywuxM06+bqlP972OIQDxv1ZU+Vd41d9/Xsa+Z9Slw0PB8alAxGy1rZtvAh4wOZLAXHbg0kuflSgzPotR8cx9zi8xPDX4LpsxkEXTrXoYHf9MTn88la50Pv4pA+b6hQnesRsx0Vb5+oxOCdrxniZd+yb3DtWiy4Y2X/s8g+H93Dof3o7tXgD2aYtG2DjD4PHuYyE2OtpMx5h1AMkGX3LCC5917b4M7a4xNO92f0ywH+IrCewMO5vWT7UIy71YWuOkoVRPPvIpZilhz05qmc88bBDV69xrrrs6DuPyW5Tfd13jvrJrvrK3vMIPtjqpbU7qi+4UEcs5MjjDTxrc5vLjrv15ucdPnjf3wzu8Tjf/+BsAGVXj1jVrAMiffjGE4/yErP/9CNu8cz6iMHBHphRG+c1fOEcfu5P6KxrP3bFEzu4GT14xYWclNWPBVFOYXCaZSOafB7vsrD5WycFeI9UArl9zya/+1KuekeRg7OxgZGMvuWKbb18fig2GxyY4hNX62XPhWxMTNpid7/LwKVuOajXJSVO4aoPeI5Jsd2XXwdfverpfEd4HQ9O6ehdz3kwjs28VH0TDjbFrHLp0bE5DpZVDxO4ZYeYOgS0wKtN9jCuOnB7NsXfdvF5h1vjV93vufyGqN8Pow7qsDHx+KvY+eCPw4R8q0916BLJ+Y6BAMsXB+U6eeAfOPGCj/sifAHci3Psmn8PrzwDy9zQ0UbMsMOG5j1GsuZO0IKjbcwbdOWAvHmigRHNk9Fy/H2Drc0ju/O5jM086aFkTNgV233ZoDtGunOlzfEl52KmXIu9sQf3XtyeDXWEXQcbOXXYm2MvDjE1hhyHyT2Wq7BFSM6LOFv3GmCM1vWVPNtibjzG5Z1Yz5c8wEColnJxwARdfuRBk05tq0+YihF27T/x0qsOv/DAD1aeWucA6bDoADInyLaXEHzCgx+64mBHFDG0j/VkPui6Qfd84qAv8rOYyuO5XB5jATtrGn7XmX9gUMvwI5pNY6r0iYFH9oKZXRZihsZc0sUH/S3x0el3X4qLxo0CHuuPYdNuG8Bxu3JgZfdeGxz53Y6Vhd6vyuW65Ix1vMm5QzTpZl83fHJZDnCiqT75tRmle69Lp/uMrwUP7txk1iNW2M6jGpf+NNzGb7WPjT/GM2ysL+BTy3GFpeuavPO6AIumGK2dbOmEP8aEJjy1E/QF/z3vOhxe/ERFjf5xF5+bX7zCogODHNNaaQ9UGHCcg/lAejyg4oC8xqxzqHE5B2R8R9K+mATFzdzOv5UVzzrIpzzi88vFcW4HD6YVPTnH+iuHenLUIjSegmOIwzs5cdGg9W+dUtt5A4le7pYtk0T+SV9i0geMXubvuOJAjsm2cGuza0KlTzHiqFgs4nhVHYEBhw5l8h2rQXzVMyYWZa2tOLsW4dGrFsUc6XtcGWsbP/BoyI3WOYpnjuPYhNkbo2yJyY8ZlUt1IUfJmbDexCmf68K5DTJa2yDbGNJp/l3dapJ/7zdP8j390hfnZaMvPv3LVu4DzM/YE/yilIc+90T7Bk5fpiKOfOrXL1PnmLWGzBsT8BBeUfCog/L456aGb4vjl7Mr9xiHuAeH8vRfBEd+/0thyoGPhRqvGaO/0YE/P+IBG2MYa8s55SWM/cQ9hXXJj04AnqU1rjYKYtpWBK6v8qorJzYefPKnvGxG2SacxckPTskaqPOfW574grtyzgfVc+5gMoYbedRWMcHfiyVu5JQcvfxTb3Zxwq+LKNY452G3To0JG6Fw4si+/aNG4cKVPwYdl7Z4cxvwaLChndYTNXCpLxy7GBmt/+RbvvjwI/d9s9Vjc1+bn/XU5RqxvVdSxpzv+5DmmI8HjGPgXHAAlOs3N6EoF7jgcz6X4UODTWuvWPrEz1rzAsgI6hCB42trS2i9iY+9YhwxZGFlUYzrq233o5NAGIbkGOvUZFfvzrZFjOS1B943Y/uXmLSXDfKKk23l0oKMBWJs44tro0eujlFet2WcbULDZG3SA4eWtup1WDtnYTG3eUmsOPNnjLiP2LVGuFx6DCtn6P7HhaovzFnrWtuUFxjVUPiMMxt01SHu7gOH1jrVfpc9DcXZzhImzOo0/ZMv/dHpspkP8HrobD2jeOQYL9d54JFmj49zPvDAQNMFhKcG8cKHJp39fKGMNRxxjS+umYO4YVt1eDT/wzds8qGf/agWub25Lhlxe62/DE7gglEwAl1e9dWHXG6DLD37yuM22Y/ZZM/cxQ+b4lRT2uw3Dho37cSfJPfiRo6WKw8OWW4wyy/M2veBLJ5+sjgWW3bh1KNWcPflIZxqsl415PgsJsQaS2wey39u2XIhB5o4qNn8luEknMdIXveO7OKRflr/hPiu5oMHPNXMhxdxnKdxkDRfOlzU6XfZ4/Zi/PJpGROUOVWH86YraxTfNofiNLcRH2Cvi/zigm8eGzzCS/Z+yKM22NAQp4aRuE6Z4wPGfYpRv/n19knglayxtXlFqr79Zag574Lkz7443OabuO2GW+Nygt0fch++0+xn9RsnDj+a6lz7kZsL6JfHisVY9Jo2m9dlmE38Ti2ojQeXTsXIjj5zVo7ULV/i7G2KR+yC3XBVLHBqwKi5nDarQxj0Kw76i5/kiK18+8XnHD4mLpuff+C/RPw4QHsyosHJ1z4Wa9KXBya18W4Hx4hfn2BGjhm3zUs/cqJ13gAOjpHHbcBLpzzXOvy2KBUzfJDQRuzQyJ/uevN8bnf51L8MFtjJWo46tNlWHDBowmqzub394HEs5NUW+nRQETxhYuJdLxmwM9mBA3gnbuS1xS1c+yz3uGC4SVqvHJsYxS69cOoxjuQSrvg2c4dxRBv2Kxk328rvXCF7OzpvAXIfYjKXxedcLri2FR5x2RBXdZQlO9Uvm+uftfMbJ+HU333pi/KQ6stU/0IXhxdzOV7QZXNZX7zKRsyWc6w1OPFlL7kVp1xDF8fIKw59mUts/uscYvAn8ykf1gL7lLGYM42R8sgvu3rVo1jZNe/0c63l8xjhlF861mP+6ATLkYagbEc2hNzqGx8GbUr4ZM/euKC3r+yrrniP5aBGjuSxeOU+qx0TCKwOt/qcfPGqL2zWIzl8aJ13R89agImX8rktZcuRfIV32XNMMRErXuHxbzTChk7duDd5AzBxSc/I8pWtTBMeNsSjob4TW9WxYhTv9j2b+/fkO+KpBpdLjicAvVcWGbHEbLGcx61d9ez6wwk75ttzw4YGm/tgcz3lSiB+YAbXOhbGA4NWoY2nrdZ+8o8FEjewauKhrnhYJY9csGB+0fhO6Rk3PzNtu18GpyfeRNkJg6Hl8jtWMvrEVUbFdL9jFx69XslTOTsW/o6vhTRMH76Vx/QJU7G5CcSjHgVEyw0qm3rYJUfPjcXauTmGvy+rwuX41ljT/UB4bNYy4ZhX8+X9hM0xpKUu0DFvsKL1WFZ50YHVTlI+6XDBhnZqH+NYm2LcvmvbifUYl5996ZWHN9z3d9IELr44/tMOsR/+aU2Sh0VMnKFwH8wXzMDwQoAOHCbSfcgxfnOEWvmUIgwivA7aVw6g0IYdGrBoihlymvMN3GtT3LCPcQ/b4IcNMWL6lLpodv+OhsWQJuWI0kYUkQo4hlUm+bsHVxXjvfO23bDtjy96OYk1kYZRjRkPe/lyQwkXPTfD8AOPejsv9GiInzebYQrfF0HhlXvdcFkDMM275VK93ge863KOtqtu6+VDny18aDnOknys0xjSP95Ui6KlD65Rn9u0/oPJpKpHFtUiHf1R2xLrMXvyc255ZXJh7vR3Jnjcl8x14jpjrfmS3+2wyc4LgLEVEwUP/xw34YKDe4ofjxSDevIjUvlVh8eyZsRv+cd4xhiAwzzOeK89fLGg+Yr8A6sYjx82zZPWaK9X7kifbfdffJUeLKhexE6LL3K4cvMVVnbvE4O3wMCOtvGXT3ZhpTPHuKXT7jEur/zhQxNXKo7fkXX4Mk7+6HMCS0+eeHOb4lAvWtYNQRyw1auxZoMPTZjsi6s5xKW+8FpcxaCfchgeH6X4P2Sz1nZ5WQnfDRei8sAKGc1xbpNv7YWBHc3jabE8NQ9n+X5GseifE081PNzjolAe2NcDnIe+7LwIRhzmWAet44JMMfIRt8ZhLOOgU8ZBD0680rce+IGXnz3wIyZl8cSmgz74g7N9YYe/XmHmnIcADBT9MV73xQU+vsKwsck3etQJSrTx0akWUQ66+e62jXwkbsLVBgeb7N1bPGxpL7x0/ANyivW44Wfcrl5cOfHGy4WIOLdJVo+Jkly919GHWJiqn3VosVnbJp9ixKu+ODyPyz1+z2Wxwq694mSXfiUvlmX+xB28jgcWNybeM978CdSb1dN5zAdRdplXvTGVQzj0n3XKb5wcC/lJF5/dhxJ5+BrjwOFBwxrpcBzDyZ7ric1RcTqA8kvnuhMnn2zQ8aUxejT5FQtdWPcPOWIDtGLSX7UJy36bC3Y+UaiKMeGydIGBbBuiBhQku+0ZF/UdzSlgJ55ki5vsla5tgZO86YtD9gwtPGxpvw6XDHlYWPJaXuXpC0V5/UCVTbHodcmod19zaSyWD1Ucy7lyJDZicyMVB85Ex4OrdGHhS3npZUt/cQlbUO63Vig0pmNgoQJJL6AT6/XAGC3t6IsjjfUm38Z2RqzHHZNx0Twxvhj+2QfeeOaLxA87apwvIB7wrR1j5WGmb+iozfHJFwZeEsQJA5xee3kdB1mY2T4mEFzyqUedklMIHRZhaeP7ng2efAIq4Mg2G5558zPS0L91KvepiTJpsXoBe7JvLPiFkb31Sq5DIzuuTMXJ5phJBn/U1XiXK3dymL3mOrPPcZXXsO0vLgQlX/WS3Q5ZLf3iqx4+xaE/9hJu8i8c4kls+DYxi02X18QZQa0Xf+ukHLyWX7kwn6pj7S18g5EvY6rOySal+i977mI4g/qCS194+Jl3v2mML4odY5ufPv2ymGWMDx87OE4/4Hqq2OfkoHSp+N/XJF/UrzgMhTLrm3gr74oRftghkQeZ4UdDLjRwrk0YTb90/6EiLmEG85DaNwgy1fjotGYuXfjsm2UQy69w6Tj0arJBl1227gMPuXXbCM2zYGQ/qU9Oi1OOqS8/eLSx9p5UsE5H+cKXm+IkTPKPcXYNyr/GrnrFo040xae8hw1bNvmglEzHeNe6DItJxaN8+PbGN2AijRdeNPUpG8fGB0P5IaJ5LC3X9v7keKrB9y1IBG6+xgXjl4b7JzkUXRbjgmDhWztyeC7mPOmS0UUwctbTShhoG3wYiXCoXfroiU1HvQnvGPdDxjh8KRCjJlk9n4HkZS8ftD986x9s5/RbJ4DWF5C5CSu7/GnHW7W2B06btm2BSXnhkA34PSxsaI2jSpvFuP8schKs8chjNmCcq3UI0eDDiniveG3mxB3DLPbExps259i4VQd8qi96+JU/a8hYw8IfLcdAsXVTJ7+wnafiHZ9y1sHrBrriJHufcuDdpnrbVn7p7s/A6/T2GZde0b8Z4pe3nEccVMwnXvyCF7psJUdRXBPqAyc75oExqH/ES8ZvlRbOykksfbgMpWeOzMucqpG9bOIccXNujAm+eWy+z5yXtRMPO/Rjr9P8iFObfuskI/okx4ayTaJAJRY+7cABr9hytn6EB7CMd3x9ZJJPNbjevIj3vC7Dp5fb9+S01U8M+dV7DtmqD9dO/ZZX+Y1DMV2b+4I3m/iVD5hybfodjNYCIZ3HceKH3+RK0bnE4xzCoM9aIv5Y09ptal5ixX+MR/Yve56k8/efecvLo97xVEBZB1UHdz6QeQijuHH45ddhVJx4iNV4dPn4x61xsFHLHIc8eTEgZ0zefGlIL0xMAblkl+49fbi0Rk1ct2MXxeC0vRO51njoxzjg+8O3/oF4Z8t/BEEK+iTDxqnNI3JhoKu1rzZq6wUQdu3hTlvFSc94+yqbOslSrrhJrjqJmt+1yWFVzDG5N+AyFsThY5QmVPHqdUjF3zwBkA9zOfzkS128i1/YzgFBmLWHLxpi1jVTDvkTA6Wa54FJeOHkl77G8ZlmfrJpHvBFrdK9p/V876rlvL/aXrN85qWX1+HlYcWh5tMJ11gHm4c9DmkMYtgQAx1Yt4/Y7cURvuYYh12c3Fd24cRAgR955lzMTRsx5NT+FB/4fS/Kr3nc9qrB4yQP3+Advj3uu+tLYM3/Tbc/jbshE0OszQEAbN5cbznwkr2HjI2GFzhX355t/TX2GpM6+NRKzlxhy3zod2SFrN+9wJ41ohfoBFvnKqxilFvjkt74moPGWz7YsFib2J15az7go23ymC390CFYE4eZUhROPepRyxjTZScGlw1Z19jWO+D8gjg+O/75Jryupd158VPziYEfJ3RZeF8HOyaWlxDXRhcDR6nLxn1uI9/4LxcQh1jy4JB67PBvLyrnHfHYL3jpshHvXOfKy7qE5UWkS4TY9dJQHo6be2nFOI/ku+svgqPEbDc94Wk39WUAixOepOehWA6C8NnXphSffNB1oGYbAxwvXMZYXGIqt/C7By5iJrvXO8Vz4T2feE+zTWNAvvUVeabFUl71hQfPhCsdfH05Vgxq2rQdG8berWTwebzPj8YKiMYB2VvGm8F1yrp0yAHoyuUx8htliopx7Gef8+9nVk7oHx8XzV3x0oEcPeY/DmJMCP94rvSw4TDPFxPHpAOrdZv04OGhm7EYj/Duh8wnH/m5J30eZjx4AxMAf2GypefHtRzPwOXYgIk68Bq1UHYbfI6TLMxJ+ufbx6agOdz0jN/F74MVBKMabGrtx4aN154vbfD5pi4Cj1ds2zBhgdMLIeA4psvevWHTVnryGC98aM49/9vyK6fV7zHb2Fqcytf/QimLz4QnvQlbHJjbk1qPOUDrPPvYVTe4PEbcskk/1juPMB2r2uVQn/a9SAGqPzLWY5FX82vtJWOqn50fn7B2vEA4njqMgWi9ZdjGHtWFQhx5aMMTRuixMDrA7BkrG7kcM19uyiW88g29ckYBso1aVCtyes3ENg6x8RqXUmCj7nxlHOORGzzqVTttmiv2qAX868emMPGf3n5CfHx691sBGU2a+siVJAMxdGG08YFpWwWkbhzQiYmBmD1jV72xjBFeHOozVcWmLWQ0ycKhR5OesuVsu7jUrzEIjNZ4k9OmuOjRYEPbw9PDd8Um1mI9Pn3xttrIMHLI7/hdm2oVQeVVnMzeO4/ssrHH040RBUj+FX9Ml/1aPzKJB/1TLj6rDg4PLGx54NBHvahxvM6u52GsAfLQnR6buIjhQfa8rCVr26snYlQjfvJXWsA38vBxLYae8O3bAtC5lnms6MgrGzDPWr6fQYJ8nHnmSx6VyQDSCwYRY6+0fATjxYhDMdkbh/w5QapQvDs4ceeilF8c8qlet0tG/e23eP0NNXDuL7XH3P49nuLTHxd6rPKr1zyqZvTJrZrsDxS7nhAyXrnVKxH8Zks++MoGsfOY3Tlh9pa+MDQX5OBz3fGQ22d5V8y16Nfy26a9vP/DpS/ow82PSvypjT3G176Oca5+2uLQhdByLABk6vNFMuLDHoBjl8yI9ZyKIff6ZAFuz0sZtbAe92/5mUfx3YegJ5+2WZ7V9gXLx6aA8qLBF8J4qlFTYG7WZYPBpybZNzp8bYeMeONobgy8UsqmOHGkbhjYp2a+5LA8wu1xw6dca5zjj8qVR37xTVxVW85hFbOLr1rgQ3MMLdt3YYVfEeJQL5zWwePX2FVfsc1pc7/GnEnX/JwBfD2+BF7T/NZb/gjnOiZFh1BjW3VcBLwc+OXrnh8HcbpAIqF04BXPS6V0y+1+z8earMYwML/ZIhdw4CAeMv3sh13+tY/Qbqtv0kPpj1wRAR+aMC/fuWTg7z/Yu9ueauDAAVEw1KPysuE8sTgQjzY4YhIsTjHCC+cHI21W0+pDrJr7jtu52MotfueA7FyqK+1483qOYBWjPIp1HTa0tom3xiQ7+j25YysOerfiaF3CMbv81msOzNR1wOY17emKE+6sunDX+2lGvL/lFjzV6ELg4fRDThkHlmPUBTNisIfoZy/5OBdi977HGZeHcqEf/FlDvCkfdL9YWCPxjqGdnFt8kGT9qPssL+DZkrfIPcfLb/39gkx9XzR4qslfdWMDLhsWRGqTfNJmNZ8KaY7yrVwrDvg9m3i8F845PX7PnvE7Y8XBUiyleNd4DC9O/Vq+Y3YxNZYjPM1VCaHrta5HQsRTONhWDtlkd13cu71xI0ZNWNclZ38kDj6vYYo5RcHfzVzP72c83W+/9Pl10eiA8vCe9dLAmPLSCSH70nUhtT8P8cDwC9exvo5HDF+8tJojhPUCwVgGlnjZVA/9it27TBAhnpP79VLquEiCJ7ovPPI0A1xfNFDu/l2PqsKhsaFQNcn5E842VdsLqJ+Asnu8DqV86PWacbS3LfIJt/Z9CRTY/YpH3/bljwLTt8e/ZxPPEZ/yHOOUH7WkHDzZ1IciX3msblrkz/FYHfCmr7iEcx7JU2+5ZU9uKUuvi3gxn12tmj1gr1bYvvwa/hLY+Y/Jv/1SfYQKwPaCwXyOA496gNGTQfYxGeMCOH5haT5Xvq0+cvRlETmO4fbsnktj8vEPv52JAJzfrrqwgS7ERbP/NIPc00Vz+ydeONxR39UoKUCTbJtysgMYTZcMNcamHW91wBWXPWtMeNvXHIt+0sXih0C1dJ7MMt46X5mgq7ks225vtcGvOPUZYxjY5ZM89YXVOOQTd8YGJvtTuDJ3YYSX7WhvtQLj+fdixHusF8de7Gm2G/HdzJrzd9pTDcagS4QyLxUeeL9Q4uNPLJB+je1YyHzNFxQvBMTIj37G8BJzW8jIs9Qlfoxl5HMZHOTZw8CGth+7b3d8Bi/xX3jb8UsG+OmigeG3/clHZwGQVUjLOgTla7uwO5u0MctvVGRXj1zePDfsrdchk64DeSw2cR5jdShWXJmnsLjM2i5b1ZG4SqgFBRfwipsxBAvj/S4ujMqdnKWTpfIsNuTdNNUEh/k7f5iVZxO7GFTHYj5V3cR5TadE3+inGaV/9R1f1fOAevcOvA579jGBxHH+xhON5pN+YPgqPZQRt8WoHvQj1mUsIuLm2Bk/+/Z55gv1GEb2md/rgedweHb8OvsVJzzNALO5aGB8VnwxjCRq2JjaqJNdAOvln3p7kgFUPnC2LDtyWcvcpu+J4MhX8bm8h4fN865jE59wwqqW7o+Rg7/G0bFrTo+1eRC+3ZqPHT7Nn2KyN5zszbVXw4JHjF4Zp/xL7B534k9524tbbdBxydyo72bWEj/x4t2Hp958dz3N8KD6Uwxk1JQHPBaW8t6FVJjGzzp5EM+nFPHs9X3gmmvUtYfn5TNqi7Cu82Q86xnxs86LbXA5r+RXnvI0A9yRi+am6SMUgGgoWG0jx4aU7ViP2NUnG+w4nNkbTn70aO5f8fIRuX3nZM41KAa9Du4UaTVN9lIyLmTncZs4J1vhQSE75GNNGPV7OPe57Nhjdse4DPx5Yzx+lXX5un3lh44L5suv4l9u5bznlf/U7X8pxuofU8bB1vcc/JsXPQ3wBtYlJIzmjP04+PwbG9OjwIFZ7aUHABhdOsQr/3686hGWPfjmF1hnzFYfGMby0mFt8uGSefbNvwnqiW33okHE74iPUDgk+VooUKBaynUYYZOve3uaaRuA6wHmunV8ci28exsVuGwVLxm58uV5LIe4vKZVFgcT7CyE+Dx3gZ1LNTkP5BXTF6fXrCDrFdcmy7/xVZ49e8efIBg1URtDBVfN0JRLfSE23TH/w/WRaS3oT9/x//THJhzY8QQSchSLevniYYMfTR+dFONxiY83YQYHbcSKFz25eTFRXzHIOS4Oj3UZC8WX53QZPCc1YYUZOmvER6ZXnvKRSbFHLxoA8rKJfiSgrOA8rCdtMIwzGuLVUrYY2J1fuvCrLmwfSsQXX/s8uOReQPNNtXitLiu+bBY+1Z1c4VQPnGTvc852fTsJ9nBWG3j1CrHzQVZTbunoFeN9+tcSQt+Ldy7xrTboK92K2fP/2899+D4yrfU8PT5CPT0+Qvm8pBxvwzYumWFb/ePJiJdPXR6RkDHQVxt8q4066hy5RqwuIPWIx6yvPHO8c50sIw5NualJv3D460/8P2U6tT/xorkjfgv1qfWHfGBCQjXJx3qMWQNGjHC0i6X62nGNAT7jR5z0JXKrFhccikles3sNU84t2zTJwArPnqRtqxy6TLKG4hSmbV5PYdQJ2714BUC/E79j8oiUvTZ3IpdeboesOk6S15iz6M4L/MP5vcyx+v7M7V9pl00c2ihS86L9POu8DGhzGXGIp80vgxFP7v2PXZ5XMldY8RiDZH9icrv85+k1N4pZddi/7hyXDOJPvGgA+NTPie9r4sIBuVrKMWbZ1MvPgzy2vfy+yWHzl2LTNkLTrHhh1kPmPC43PgS3t2x5YFPb+G2sHBuRwkFT/NQX/2QLrNKm3bihT1jzIYeaMNLVT3aPLXnyK2inPytuJ/SqTfhe5nr909lXXUQF/tm4bD7p5medeskAjrnia7lkYrP7x629J43dOPDl5bTwxa4ZuZBZeSHFAlcT5jRdOPRrk0926cJ+fVwyzznD9zKKR3/qRQPQ58T3NR8blw1aJrNNrOTtS4xh4YgmnPq21RzBvvpat3yKE94vL/jWlrj6nih9xtUcFUTsyjDqEh6Izlv1b6NGnO2DhE08FXgaH2LQ1O/KVssxXJLozfAyqfd42c7az7SnM+GS+TfxkemR1F56yx/KueZTzHzI9WRz/CmFeIwHGDxtsOf6YUZW3ubKS8ZxwoKNdvWc2ZFrnWnXmTMpNm/HfHt2PMmc95JBwjNdNADissGTjR+adSDA6S9/IU/Ndp/HTZhQ+sCVwwfr8hq3p695jsZHbY5NXNlkz77G4LbEWq0Qj9kwd+nb4VHcSf1pc49YNNVHbVoymc7dO6fLTlTDctOp8iPxkkHRnxz/hri/cMdX9lrmuoVdl4zmYNjHuvvHLT7JjGkgfr24yOt/ADh454tk2ME5fCMDJeDUXGYMVmp9Wf3h9RjlxJPMc8/5JKMaznzRIOAl9WTjRcAu3S+JtgFQTTaoKcdY0btdvrbX7nVd8qY3vlELCYD1turuq5RtElb56CBKWOUTtoNDkE29+65ZVgGVZ80BfbWdNed5486Lf6ReMpofXDZfesf/3XvULxnNq383krbYCPIJD77VNnT4RszAwjbswsu/XjLwqx2TPUZ86rcXz8gN3r9xDZcM4s910SDgJa9+9OGJy3c2sOcFybecVJg0YB1Ct+3KdmjgRxsTMXRK8b6Db18JazzMqktY1/fwwnUfeRWj/ky+Bo14M6XYfMvYvK7GRIRk9c6XNucpeQ/rcSl73MZ5dQanfKRfMhrhp8Rl82V52YyDh/njJbBn45oQs8oDL/7ua1EG94htTAs+k8TBpZyCFWWqurTkW3vFeq/L51ovGeQ690WDIFw2z/2c8S/LwoHHQNA0OPVpNHtj5rlKmAapGL9I0rcTs4dVjqzBYiZ+szeHCRlruovy6QJt3UEln4iJGo7FHrN7CmHcBhk5j/oKDP8xTEJOdBbJGbppmosTl8x3P8K+kzlpKLhsvvyO/yvni/M2LgzqmMuwhTLpQQp9r+3hhm0bJ55j50x+5XJdMfKdtQfHNzzxK67645LnuXAlmhvOI7/rJ64c/tXXPTh9LyOy7munQW8bZLMjZ/rrgDTO9LSV3l+cuT9k8fS/zBu89c82ZcyCB+dqV6z6xCjv1NcXfJMt+I7pWUt9ObhgMBd6BD9LPGpiDPvUMRbxll+41S9dFxJ0/rCodbB4uIRPuXLI3n3YWw4hOWkKuZyhf/fnHQ7X+p9MKdoPSfcX7/nyw49c/pGeE+7F+ZLBZGrORn+CLUDCrbEYJHxo7MlDi2zbnv4ZCwJxKT77WJ6xQvQ8L76LedVtL7sul0wwXrimiwYl4bJ5w7/5YPYaxNTHCFxPec8WXL7xHQc5XxW3kddYw/W/MPwIxi8aHVTwS5Z/7nnJ9GEvbmAQJ6x4pGfv3FUnc82cnX8ay5gHca01KGfOUdWVNpNXX+qVJ2DTXLcOIZrWKOW0EJ/iwlHu4Ltw+Kz4LxjgX2D1a/mS0Xi+475vP3zHvd+W86QfEHqaAQbj7TmuoMal3zAAto121yWzjwmOViGb3n26sDKgHIpr2yqQ/oBL5hvjSeY6tmu/aFQMLps3fDe2PyciB7Wz8fbssGEDo6WMvmITL7vZ3D/JU2wc3hNi/LAij7Bpr7jVJl9unMAMnbU3fvVJ9zyyZR+bM/qso8ZwjBu49BnXGrvOo7hW+54etF1LytAhREOe7CFT7B4/Fje2wPzvz7sQrwL/Oul+5PIPH/6Pe74PhymeAAAE9UlEQVQix6tLhnO5vWTWi2fChTLmbMRimojjhOmpcGBln3tq5KEcPAqS4YT+G5/0FXnRnAC5Gtf1u2iQHU83r48L553R+4aErydt2YyaAx2Uxhau/eAw21G5cDyI4/Bm/ojXAd2LxyXhfj+ckMclwoVs3XNWjQ+pVnGqn3g4L+SZn2hQn+dE/con3zSmyuc1T/6qMW2QV73iYUfT/KQMHUI02LNnN+zQi6NchxfHUwwumV8PTzEa09p/Wzzd/MP3fnvt73FR9HwtTzc572ZDoGzgpjx62jjp8FHf7zdPMQHbu2TEU0uZZF8SH5PwUekGtet70ahIXDZ4aUDe721UtwGbL9vQGV+b2P2rvDlkWFCPK3nChS115N2TZVOfuPlS0AXQfWBajjjUKd1l2dDr0dpte1i3TbLy1Djgy9cp9hUXYYwrHtdTDj7ZNn3lgv1ff96v7wsGY1T74fjO5h/c++2HH4oeewmN88qLZ+hc59YDpPnXJTF0+ojlpMNHfa8fuRqjAMIzV4ndPe8jf9MBlww+Lt3AdmMuGhWMy+Z1deHkmG0jag7Qby6aBeexia+YVZ4ukMSMnzA6wMrnsee9aPS9jzj3enGe5OuLLcY7fRSL2tc41HuSTRfqdg7AXRu65nUzBzlXvrEHPlx2GEIODtk2ffi+NJ5gvvTX2cckjvj0d1w0fz8unDdHz7kZ+4/7bejpD6PbGUPbkDnhwMm27edLJv0KCMVEuLI9TBeM0t3Yi0ZZcNn8QLz0aK2BZ2+bH3jYdGgc5xt8xcC3f5jGwuqQnhargyq+jrMcexfNsTjF7/XKwfrH90kTl/LaPIkLY2m5/IrNcdZceh63t2xzHmJfLD7nbY88kr3/C8//7/eC4YyMd1w433rvdxzeFP00xzgA0doWAmQ9zUBqH5T6iAVJdsno0db4ttFR/oTm28N8wSjxw3PRKNvPve1KXjg/Gz1aTp5t3NThqENTc9W4PR22PmzgrFg9IYhT9tQbM/ATT/h1OMXdfeaYPzrxoiDX0TjlVG91k3tcNF5L57U4H4v807gKO9lsbtyesvlC3J1vt0vG5fLi+JsYfBfz4bY/A7hw/m68/AthIHPe40122dRzXWIho0FG2+/H04z8ArYesfh4hNeHqD28F40P8rX/FkfycPj+6DUh6FO2gwJM2s026Ufsp100uhD2Dq0Ob2KKv22pn3LRBEb8cxwvRfHOmHHRdAzGLi7VUTbMgXDTfByxK2dijcP1MHOuzS+b+j8fl8uL4mL58OWCGTl7w9PNmy7/6OGN0eOl31TpqQXrgKb12LPLP/pxybStiJ4b373gexc8wdzg71+Q+rT2obto1sp04XwfLp44VGiafBwo6bkQdej2ZB1e/aGeYzaHDTmMSwd30xuOPl4KyrXBL5zKu9sHt3Oi3uarvIpLn9WisakOH8t6QTmv4rIHX3FG1xsdNjxZ/tm4WND+3POz+/DbdZqBb7n3H/X+/tvvpZxzHvxcF86725CaPkjzJdO/MQpAy4A9Mtoj56LZm493xEesd7wd/6H40STrUMHTNih9yJeFomoLVXGNR3At5B72DLisw3C7OnIYJnO2PjbPBlNxicdbNPADh+Zz4Hnla7/hZRPmf/s0SB9uH8oZ+Oa4gNjGXlA9vl6wffGtH7KPQirprH1eNGcFfxj34Rn48Ax8eAauagb+f1HnsYiwlVgaAAAAAElFTkSuQmCC" style={{ isolation: 'isolate' }}/>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

  ),
  "Adobe Firefly": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none" className="firefly-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M196.959 0H43.0414C19.2703 0 0 19.2703 0 43.0414V196.959C0 220.73 19.2703 240 43.0414 240H196.959C220.73 240 240 220.73 240 196.959V43.0414C240 19.2703 220.73 0 196.959 0Z" fill="#EB1000" />
<path id="Vector_2" d="M60.7893 63.7059H141.535V89.9604H91.5024V108.95H135.756V135.204H91.5024V174.339H60.7893V63.7059Z" fill="white" />
<path id="Vector_3" d="M152.129 88.1443H181.026V174.339H152.129V88.1443Z" fill="white" />
<path id="Vector_4" d="M171.66 72.04L181.962 74.3553C186.011 75.2679 188.823 70.4175 186.002 67.3671L178.844 59.6268C177.904 58.6044 177.522 57.1933 177.827 55.8328L180.149 45.5575C181.064 41.5184 176.2 38.7129 173.142 41.5268L165.382 48.6671C164.357 49.6051 162.942 49.9853 161.579 49.6812L151.277 47.3658C147.227 46.4532 144.414 51.3035 147.235 54.354L154.394 62.0943C155.335 63.1167 155.716 64.5279 155.411 65.8883L153.09 76.1636C152.175 80.2028 157.037 83.0082 160.096 80.1943L167.856 73.054C168.881 72.116 170.296 71.7358 171.66 72.04Z" fill="white" />
<defs>
<clipPath id="clip0_2136_7462">
<rect width="240" height="240" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Adobe Illustrator": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none" className="illustrator-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M196.959 0H43.0414C19.2703 0 0 19.2703 0 43.0414V196.959C0 220.73 19.2703 240 43.0414 240H196.959C220.73 240 240 220.73 240 196.959V43.0414C240 19.2703 220.73 0 196.959 0Z" fill="#330000" />
<path id="Vector_2" d="M81.232 63.7059H116.568L156.198 174.339H123.833L118.384 157.496H76.9381L71.4894 174.339H40.4462L81.232 63.7059ZM109.798 131.241L97.7439 94.0885L85.6901 131.241H109.798Z" fill="#FF9A00" />
<path id="Vector_3" d="M160.94 70.9713C160.94 63.0454 167.049 57.9267 176.296 57.9267C185.378 57.9267 191.157 63.2107 191.157 70.9713C191.157 78.8973 185.378 84.3465 176.296 84.3465C166.719 84.3465 160.94 79.0625 160.94 70.9713ZM161.765 88.1443H190.662V174.339H161.765V88.1443Z" fill="#FF9A00" />
<defs>
<clipPath id="clip0_2136_6944">
<rect width="240" height="240" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Adobe InDesign": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" className="indesign-40-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M34.4678 0H7.53225C3.3723 0 0 3.3723 0 7.53225V34.4678C0 38.6277 3.3723 42 7.53225 42H34.4678C38.6277 42 42 38.6277 42 34.4678V7.53225C42 3.3723 38.6277 0 34.4678 0Z" fill="#49021F" />
<path id="Vector_2" d="M10.1261 11.1485H15.5009V30.5093H10.1261V11.1485Z" fill="#FF3366" />
<path id="Vector_3" d="M17.3389 23.0539C17.3389 17.7948 21.2688 15.1652 25.3432 15.1652C25.8923 15.1652 26.4703 15.223 26.817 15.2807V10.5417H31.8739V29.5268C30.6602 30.1336 28.2618 30.7693 25.6612 30.7693C21.211 30.7693 17.3389 28.2553 17.3389 23.0539ZM26.817 26.5504V19.4708C26.4703 19.3552 26.0368 19.2685 25.4589 19.2685C23.8696 19.2685 22.3958 20.1932 22.3958 22.9673C22.3958 25.5101 23.725 26.666 25.4877 26.666C25.8923 26.666 26.4414 26.6371 26.817 26.5504Z" fill="#FF3366" />
<defs>
<clipPath id="clip0_2136_7856">
<rect width="42" height="42" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Adobe Photoshop": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" className="photoshop-40-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M34.4678 0H7.53225C3.3723 0 0 3.3723 0 7.53225V34.4678C0 38.6277 3.3723 42 7.53225 42H34.4678C38.6277 42 42 38.6277 42 34.4678V7.53225C42 3.3723 38.6277 0 34.4678 0Z" fill="#001E36" />
<path id="Vector_2" d="M14.6661 11.1485C20.1565 11.1485 23.2484 13.7203 23.2484 18.0259C23.2484 23.0539 19.0584 25.0767 15.1284 25.0767H12.47V30.5093H7.09517V11.1485H14.6661ZM12.47 15.7431V20.4821H14.8395C16.4866 20.4821 17.6425 19.8175 17.6425 18.1415C17.6425 16.61 16.66 15.7431 14.9551 15.7431H12.47Z" fill="#31A8FF" />
<path id="Vector_3" d="M24.3408 29.5557L24.3698 25.0767C25.9013 26.0881 28.0396 26.7238 29.5134 26.7238C30.5247 26.7238 30.9871 26.4348 30.9871 25.9147C30.9871 25.3368 30.3514 25.1056 29.1377 24.7299C26.797 24.0364 24.2253 23.0828 24.2253 20.0198C24.2253 16.8989 26.797 15.1652 30.5247 15.1652C32.2874 15.1652 33.7323 15.4252 35.0037 15.9743L34.9748 20.251C33.9634 19.6441 31.9696 19.0951 30.6692 19.0951C29.7156 19.0951 29.34 19.3841 29.34 19.8175C29.34 20.3376 29.8023 20.4821 31.1894 20.9156C33.8768 21.7247 36.1307 22.5916 36.1307 25.7413C36.1307 28.7465 33.6745 30.7693 29.8312 30.7693C27.8084 30.7693 25.9013 30.4226 24.3408 29.5557Z" fill="#31A8FF" />
<defs>
<clipPath id="clip0_2136_8738">
<rect width="42" height="42" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Adobe Premiere Pro": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" className="premiere-pro-40-2025 w-4 h-4 mr-1.5 inline-block" {...props}>
<path id="Vector" d="M34.4678 0H7.53225C3.3723 0 0 3.3723 0 7.53225V34.4678C0 38.6277 3.3723 42 7.53225 42H34.4678C38.6277 42 42 38.6277 42 34.4678V7.53225C42 3.3723 38.6277 0 34.4678 0Z" fill="#00005B" />
<path id="Vector_2" d="M16.1965 11.1485C21.6869 11.1485 24.7788 13.7203 24.7788 18.0259C24.7788 23.0539 20.5888 25.0767 16.6588 25.0767H14.0003V30.5093H8.62561V11.1485H16.1965ZM14.0003 15.7431V20.4821H16.3699C18.017 20.4821 19.1728 19.8175 19.1728 18.1415C19.1728 16.61 18.1904 15.7431 16.4854 15.7431H14.0003Z" fill="#9999FF" />
<path id="Vector_3" d="M32.2719 15.1652C33.4566 15.1652 34.4101 15.3096 34.8436 15.4541V19.3841C34.4969 19.2974 33.8322 19.2396 33.2832 19.2396C32.214 19.2396 31.6072 19.3263 31.0582 19.5285V30.5093H26.0012V16.4366C27.8217 15.6275 29.6422 15.1652 32.2719 15.1652Z" fill="#9999FF" />
<defs>
<clipPath id="clip0_2136_9270">
<rect width="42" height="42" fill="white" />
</clipPath>
</defs>
</svg>
  ),
  "Amazon Seller Central": (props) => (
    <svg viewBox="0 0 448 512" fill="#ff9900" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
    </svg>
  ),
  "Canva": (props) => (
    <svg viewBox="0 0 508 508" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" className="w-4 h-4 mr-1.5 inline-block" {...props}><g transform="matrix(.26718 0 0 .26718 0 0)"><circle cx="950" cy="950" r="950" fill="#7d2ae7"/><circle cx="950" cy="950" r="950" fill="url(#prefix___Radial1)"/><circle cx="950" cy="950" r="950" fill="url(#prefix___Radial2)"/><circle cx="950" cy="950" r="950" fill="url(#prefix___Radial3)"/><circle cx="950" cy="950" r="950" fill="url(#prefix___Radial4)"/></g><path d="M446.744 276.845c-.665 0-1.271.43-1.584 1.33-4.011 11.446-9.43 18.254-13.891 18.254-2.563 0-3.6-2.856-3.6-7.336 0-11.21 6.71-34.982 10.095-45.82.392-1.312.646-2.485.646-3.483 0-3.15-1.722-4.696-5.987-4.696-4.598 0-9.547 1.8-14.36 10.233-1.663-7.435-6.691-10.683-13.715-10.683-8.12 0-15.965 5.224-22.421 13.696-6.456 8.471-14.048 11.25-19.76 9.88 4.108-10.057 5.634-17.57 5.634-23.145 0-8.746-4.324-14.028-11.308-14.028-10.624 0-16.747 10.134-16.747 20.797 0 8.237 3.736 16.708 11.954 20.817-6.887 15.573-16.943 29.66-20.758 29.66-4.93 0-6.379-24.123-6.105-41.38.176-9.9.998-10.408.998-13.401 0-1.722-1.115-2.896-5.595-2.896-10.448 0-13.676 8.844-14.165 18.998a50.052 50.052 0 01-1.8 11.406c-4.363 15.573-13.363 27.39-19.232 27.39-2.72 0-3.463-2.72-3.463-6.28 0-11.21 6.28-25.219 6.28-37.173 0-8.784-3.854-14.34-11.112-14.34-8.55 0-19.858 10.173-30.56 29.229 3.521-14.595 4.97-28.721-5.459-28.721a14.115 14.115 0 00-6.476 1.683 3.689 3.689 0 00-2.113 3.56c.998 15.535-12.521 55.329-25.336 55.329-2.328 0-3.463-2.524-3.463-6.593 0-11.23 6.691-34.943 10.056-45.801.43-1.409.666-2.622.666-3.678 0-2.974-1.84-4.5-6.007-4.5-4.578 0-9.547 1.741-14.34 10.174-1.683-7.435-6.711-10.683-13.735-10.683-11.523 0-24.397 12.19-30.051 28.076-7.572 21.208-22.832 41.692-43.375 41.692-18.645 0-28.486-15.515-28.486-40.03 0-35.392 25.982-64.308 45.253-64.308 9.215 0 13.617 5.869 13.617 14.869 0 10.897-6.085 15.964-6.085 20.112 0 1.272 1.057 2.524 3.15 2.524 8.374 0 18.234-9.841 18.234-23.262 0-13.422-10.897-23.243-30.168-23.243-31.851 0-63.898 32.047-63.898 73.113 0 32.673 16.121 52.374 44 52.374 19.017 0 35.628-14.79 44.588-32.047 1.018 14.302 7.513 21.776 17.413 21.776 8.804 0 15.925-5.243 21.364-14.458 2.094 9.645 7.65 14.36 14.87 14.36 8.275 0 15.201-5.243 21.794-14.986-.097 7.65 1.644 14.85 8.276 14.85 3.13 0 6.867-.725 7.533-3.464 6.984-28.877 24.24-52.453 29.523-52.453 1.565 0 1.995 1.507 1.995 3.287 0 7.846-5.537 23.928-5.537 34.2 0 11.092 4.716 18.43 14.459 18.43 10.8 0 21.775-13.227 29.092-32.556 2.29 18.058 7.24 32.633 14.987 32.633 9.508 0 26.392-20.014 36.625-41.203 4.01.509 10.036.372 15.827-3.717-2.465 6.241-3.912 13.07-3.912 19.897 0 19.663 9.39 25.18 17.47 25.18 8.785 0 15.907-5.243 21.365-14.458 1.8 8.315 6.398 14.34 14.85 14.34 13.225 0 24.71-13.519 24.71-24.612 0-2.934-1.252-4.715-2.72-4.715zm-274.51 18.547c-5.342 0-7.435-5.38-7.435-13.401 0-13.93 9.528-37.193 19.604-37.193 4.402 0 6.065 5.185 6.065 11.524 0 14.145-9.059 39.07-18.235 39.07zm182.948-41.574c-3.189-3.796-4.343-8.961-4.343-13.559 0-5.673 2.074-10.467 4.558-10.467 2.485 0 3.248 2.446 3.248 5.85 0 5.693-2.035 14.008-3.463 18.176zm41.418 41.574c-5.34 0-7.434-6.182-7.434-13.401 0-13.441 9.528-37.193 19.682-37.193 4.402 0 5.967 5.146 5.967 11.524 0 14.145-8.902 39.07-18.215 39.07z" fill="#fff" fillRule="nonzero"/><defs><radialGradient id="prefix___Radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(1469.491) rotate(-49.416 1.37 .302)"><stop offset="0" stop-color="#6420ff"/><stop offset="1" stop-color="#6420ff" stop-opacity="0"/></radialGradient><radialGradient id="prefix___Radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(54.703 42.717 594.194) scale(1657.122)"><stop offset="0" stop-color="#00c4cc"/><stop offset="1" stop-color="#00c4cc" stop-opacity="0"/></radialGradient><radialGradient id="prefix___Radial3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1023 -1030 473.711 470.491 367 1684)"><stop offset="0" stop-color="#6420ff"/><stop offset="1" stop-color="#6420ff" stop-opacity="0"/></radialGradient><radialGradient id="prefix___Radial4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(595.999 1372 -2298.41 998.431 777 256)"><stop offset="0" stop-color="#00c4cc" stop-opacity=".73"/><stop offset="0" stop-color="#00c4cc"/><stop offset="1" stop-color="#00c4cc" stop-opacity="0"/></radialGradient></defs></svg>
  ),
  "ChatGPT API": (props) => (
    <svg viewBox="0 0 24 24" fill="#10a37f" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  "Claude API": (props) => (
    <svg viewBox="0 0 24 24" fill="#cc6239" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="claude-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d97753" /><stop offset="100%" stopColor="#b25329" /></linearGradient></defs>
<title>Anthropic</title><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
    </svg>
  ),
  "Claude Code": (props) => (
    <svg viewBox="0 0 24 24" fill="#cc6239" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="claude-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d97753" /><stop offset="100%" stopColor="#b25329" /></linearGradient></defs>
<title>Anthropic</title><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
    </svg>
  ),
  "CorelDRAW": (props) => (
    <svg viewBox="0 0 24 24" fill="#00a859" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="corel-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00a859" /><stop offset="100%" stopColor="#00e5ff" /></linearGradient></defs>
<title>CorelDRAW</title><path d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536.072 4.145 3.847 11.191 6.397 13.455 0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0Zm2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013 2.547-2.264 6.324-9.31 6.396-13.455-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0Zm-1.38.019a1.088 1.088 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984.268-4.677-.688-7.674-2.219-8.501a1.088 1.088 0 0 0-.555-.144ZM7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2.503.457-5.777-6.548-6.386-12.699-.291-2.323.39-4.9 2.986-6.66Zm9.966 0c2.595 1.76 3.276 4.337 2.985 6.66-.608 6.151-6.888 13.156-6.386 12.699 1.398-1.205 6.103-6.88 6.987-12.2.888-5.316-3.586-7.159-3.586-7.159Zm-6.815 20.78L10.647 24h2.599l.488-2.154h-3.566Z"/>
    </svg>
  ),
  "DALL-E 3": (props) => (
    <svg viewBox="0 0 24 24" fill="#10a37f" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  "DaVinci Resolve": (props) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="davinci-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3b30" />
          <stop offset="50%" stopColor="#007aff" />
          <stop offset="100%" stopColor="#4cd964" />
        </linearGradient>
      </defs>
      <title>DaVinci Resolve</title>
      <path fill="url(#davinci-grad)" d="M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"/>
    </svg>
  ),
  "Etsy": (props) => (
    <svg viewBox="0 0 24 24" fill="#F56400" className="w-4 h-4 mr-1.5 inline-block" {...props}>
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
    <svg viewBox="0 0 24 24" fill="#00c2cb" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Wondershare Filmora</title><path d="M5.475 0A5.463 5.463 0 0 0 0 5.475v13.05A5.463 5.463 0 0 0 5.475 24h13.05A5.463 5.463 0 0 0 24 18.525V5.475A5.463 5.463 0 0 0 18.525 0H5.475Zm4.552 3.6 4.026 4.029-4.617 4.623-.022-.023a1.088 1.088 0 0 0-.158-1.339L5.999 7.63l4.028-4.03ZM14.528 8l4.027 4.03-8.528 8.536L6 16.536 14.528 8Z"/>
    </svg>
  ),
  "Flipkart": (props) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Flipkart</title>
      <path fill="#ffe11b" d="M3.833 1.333a.993.993 0 0 0-.333.061V1c0-.551.449-1 1-1h14.667c.551 0 1 .449 1 1v.333H3.833z" />
      <path fill="#2874f0" d="M21.167 3.667H2.833c-.551 0-1 .449-1 1V23c0 .551.449 1 1 1h7.3l1.098-5.645h-2.24c-.051 0-5.158-.241-5.158-.241l4.639-.327-.078-.366-1.978-.285 1.882-.158-.124-.449-3.075-.467s3.341-.373 3.392-.373h3.232l.247-1.331c.289-1.616.945-2.807 1.973-3.693 1.033-.892 2.344-1.332 3.937-1.332.643 0 1.053.151 1.231.463.118.186.201.516.279.859.074.352.14.671.095.903-.057.345-.461.465-1.197.465h-.253c-1.327 0-2.134.763-2.405 2.31l-.243 1.355h1.54c.574 0 .781.402.622 1.306-.17.941-.539 1.36-1.111 1.36H14.9L13.804 24h7.362c.551 0 1-.449 1-1V4.667a1 1 0 0 0-.999-1z" />
      <path fill="#ffe11b" d="M20.5 2.333A.334.334 0 0 0 20.167 2H3.833a.334.334 0 0 0-.333.333V3h17v-.667z" />
    </svg>
  ),
  "Gemini API": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Google Gemini</title><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
    </svg>
  ),
  "Google AI Studio": (props) => (
    <svg width="100%" viewBox="0 0 299 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="light-mode-shown w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a73e8" />
          <stop offset="50%" stopColor="#8a3ffc" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <path d="M125.365 32C120.691 38.5727 116.782 45.7277 113.766 53.334H64C40.4361 53.3342 21.3342 72.4361 21.334 96V245.334C21.3344 268.898 40.4362 288 64 288H213.334C236.898 288 256 268.898 256 245.334V179.93C263.778 175.739 270.945 170.561 277.334 164.563V245.334C277.334 280.68 248.68 309.334 213.334 309.334H64C28.6542 309.334 0.00038177 280.68 0 245.334V96C0.000171479 60.654 28.654 32.0002 64 32H125.365Z" fill="currentColor"></path>
      <path d="M281.333 71.5244C269.006 66.218 258.221 58.9383 248.972 49.6942C239.728 40.4502 232.448 29.6601 227.142 17.3332C225.105 12.6088 223.468 7.75264 222.213 2.77367C221.804 1.14585 220.344 0 218.666 0C216.988 0 215.529 1.14585 215.12 2.77367C213.865 7.75264 212.228 12.6043 210.191 17.3332C204.884 29.6601 197.605 40.4502 188.36 49.6942C179.116 58.9383 168.326 66.218 155.999 71.5244C151.275 73.5614 146.419 75.1984 141.44 76.4533C139.812 76.8626 138.666 78.3222 138.666 80C138.666 81.6778 139.812 83.1374 141.44 83.5467C146.419 84.8016 151.271 86.4386 155.999 88.4756C168.326 93.782 179.112 101.062 188.36 110.306C197.609 119.55 204.884 130.34 210.191 142.667C212.228 147.391 213.865 152.247 215.12 157.226C215.529 158.854 216.988 160 218.666 160C220.344 160 221.804 158.854 222.213 157.226C223.468 152.247 225.105 147.396 227.142 142.667C232.448 130.34 239.728 119.554 248.972 110.306C258.216 101.062 269.006 93.782 281.333 88.4756C286.057 86.4386 290.914 84.8016 295.893 83.5467C297.52 83.1374 298.666 81.6778 298.666 80C298.666 78.3222 297.52 76.8626 295.893 76.4533C290.914 75.1984 286.062 73.5614 281.333 71.5244Z" fill="url(#gemini-grad)"></path>
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
    <svg viewBox="0 0 24 24" fill="#ea00ff" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="make-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff007f" /><stop offset="100%" stopColor="#7f00ff" /></linearGradient></defs>
<title>Make</title><path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z"/>
    </svg>
  ),
  "Meesho": (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="#ff3f6c" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}>
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
    <svg viewBox="0 0 24 24" fill="#FF6C37" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="n8n-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff4500" /><stop offset="100%" stopColor="#ff8c00" /></linearGradient></defs>
<title>n8n</title><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/>
    </svg>
  ),
  "NotebookLM": (props) => (
    <svg viewBox="0 0 24 24" fill="#0f9d58" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>NotebookLM</title><path d="M11.999 3.201C5.372 3.201 0 8.528 0 15.101V20.8h2.212v-.568c0-2.666 2.178-4.827 4.866-4.827 2.688 0 4.866 2.16 4.866 4.827v.568h2.212v-.568c0-3.877-3.17-7.019-7.078-7.019A7.075 7.075 0 0 0 2.992 14.5a7.355 7.355 0 0 1 6.568-4.016c4.057 0 7.347 3.264 7.347 7.287V20.8h2.212V17.77c0-5.235-4.28-9.481-9.56-9.481a9.563 9.563 0 0 0-6.217 2.28A9.795 9.795 0 0 1 12 5.393c5.406 0 9.788 4.346 9.788 9.707V20.8H24V15.1c-.001-6.573-5.373-11.9-12.001-11.9Z"/>
    </svg>
  ),
  "Notion": (props) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="notion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5e3a" />
          <stop offset="100%" stopColor="#ffca28" />
        </linearGradient>
      </defs>
      <path fill="#ffffff" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z"/>
      <path fill="url(#notion-grad)" d="M1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  ),
  "Perplexity AI": (props) => (
    <svg viewBox="0 0 24 24" fill="#19a5a3" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="perp-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#19a5a3" /><stop offset="100%" stopColor="#00ff87" /></linearGradient></defs>
<title>Perplexity</title><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
    </svg>
  ),
  "Pinterest": (props) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M16.132 0a16 16 0 0 0-5.771 30.952c-.13-1.312-.262-3.148 0-4.6l1.836-8a5.771 5.771 0 0 1-.525-2.361c0-2.23 1.312-3.935 2.885-3.935s1.967 1.05 1.967 2.23-.918 3.4-1.312 5.377.787 2.885 2.36 2.885 4.984-3.016 4.984-7.344-2.754-6.558-6.69-6.558-7.082 3.54-7.082 7.082c0 1.312.525 2.885 1.18 3.672a.525.525 0 0 1 .131.393l-.393 1.836c-.13.262-.262.393-.525.262-1.967-.918-3.28-3.803-3.28-6.164 0-4.984 3.672-9.705 10.623-9.705s9.836 3.935 9.836 9.18-3.54 9.968-8.263 9.968c-1.574 0-3.148-.787-3.672-1.836l-1.05 3.803c-.393 1.443-1.312 3.148-1.967 4.197A16 16 0 1 0 16.132 0z" fill="#bd081c"/>
    </svg>
  ),
  "Redbubble": (props) => (
    <svg viewBox="0 0 24 24" fill="#e01a22" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>Redbubble</title><path d="M16.633 16.324h-3.199a.321.321 0 0 1-.32-.322V7.974a.32.32 0 0 1 .32-.32H16.4c2.226 0 2.693 1.31 2.693 2.408 0 .636-.169 1.14-.504 1.511.816.337 1.256 1.096 1.256 2.194 0 1.601-1.201 2.557-3.212 2.557m-4.644 0H5.345a.32.32 0 0 1-.32-.322V7.974a.32.32 0 0 1 .32-.32h3.103c1.939 0 3.096 1.043 3.096 2.791 0 1.163-.585 2.077-1.527 2.448l2.21 2.897a.322.322 0 0 1-.24.533M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12S18.63 0 12.001 0"/>
    </svg>
  ),
  "Shopify": (props) => (
    <svg viewBox="0 0 24 24" fill="#95BF47" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"/>
    </svg>
  ),
  "Teepublic": (props) => (
    <svg viewBox="0 0 24 24" fill="#1ab07e" className="w-4 h-4 mr-1.5 inline-block" {...props}>
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
  "Midjourney": (props) => (
    <svg version="1.1" viewBox="0 0 1024 1024" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="mj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mj-grad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
        <path id="waves" d="m 174,794 c 20,0 50,-42 85,-48 c 20,0 35,42 85,48 c 35,0 50,-42 85,-42 c 35,0 50,42 85,42 c 35,0 50,-42 85,-42 c 35,0 50,42 85,42 c 35,0 50,-42 85,-42 c 35,0 50,42 85,42"/>
        <path id="hull" d="M 242.4,752.2 L 219.5,708.4 L 809.5,670.4 C 763.1,712.6 703.5,746.8 643.2,774.8"/>
        <path id="front_sail" d="M 454.4,300.4 C 554.8,331.1 695.2,479.4 743,638.8 C 716.8,628.5 697.2,618 660.4,627.4 C 624.8,497.9 561.1,374.2 454.4,300.4 z"/>
        <path id="rear_sail" d="M 267.7,229.5 C 396.3,284.5 572.7,437.6 605.1,641.5 C 456.8,581.7 343.9,613.6 265.3,662.1 c 0,0 3.2,-2.7 13,-9"/>
      </g>
    </svg>
  ),
  "Ideogram": (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="ideo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4b26" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <rect x="4.8" y="2.4" width="14.4" height="19.2" rx="2" fill="#232425"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 6.6C12 6.93137 11.7314 7.2 11.4 7.2H9C8.66863 7.2 8.4 6.93137 8.4 6.6V6C8.4 5.66863 8.66863 5.4 9 5.4H11.4C11.7314 5.4 12 5.66863 12 6V6.6ZM15.6 17.4C15.6 17.7314 15.3314 18 15 18H9C8.66863 18 8.4 17.7314 8.4 17.4V16.8C8.4 16.4686 8.66863 16.2 9 16.2H15C15.3314 16.2 15.6 16.4686 15.6 16.8V17.4ZM12 11.4C12 11.7314 11.7314 12 11.4 12H9C8.66863 12 8.4 11.7314 8.4 11.4V10.8C8.4 10.4686 8.66863 10.2 9 10.2H11.4C11.7314 10.2 12 10.4686 12 10.8V11.4ZM15.6 11.4C15.6 11.7314 15.3314 12 15 12H12.6C12.2686 12 12 11.7314 12 11.4V10.8C12 10.4686 12.2686 10.2 12.6 10.2H15C15.3314 10.2 15.6 10.4686 15.6 10.8V11.4Z" fill="url(#ideo-grad)"/>
    </svg>
  ),
  "RunwayML Gen 3": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512.004" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="runway-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7928ca" />
          <stop offset="100%" stopColor="#ff0080" />
        </linearGradient>
      </defs>
      <path fill="url(#runway-grad)" d="M392.51 511.69c-62.032 5.67-113.901-67.019-153.657-103.887C218.749 552.665-.15 538.933 0 391.985c.072-61.724 0-212.549 0-272.331C0 98.16 5.899 76.515 16.965 58.16c21-35.599 61.58-58.584 102.906-58.14 62.254.079 212.177-.071 272.639 0 147.084 0 161.053 218.821 15.696 238.523l68.977 68.884c75.785 71.27 18.906 207.396-84.673 204.263zm-33.407-86.199c42.745 44.035 110.984-24.182 66.963-66.869L306.489 239.217h-66.891v66.862l103.365 103.222 16.14 16.19zM72.417 392.056c-.974 61.201 95.66 61.423 94.693 0V119.654c.817-30.525-31.464-54.778-60.613-45.375-1.268.373-2.465.746-3.59 1.197-18.306 6.787-31.013 25.522-30.49 45.074v271.506zM392.51 166.893c61.429.975 61.358-95.524 0-94.556H230.109c12.335 25.974 9.196 66.425 9.418 94.556H392.51z"/>
    </svg>
  ),
  "Kling AI": (props) => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <g clipPath="url(#prefix__clip0_9_19)"><g clipPath="url(#prefix__clip1_9_19)"><path d="M115.456 293.867a494.813 494.813 0 0142.624-95.04C225.707 81.664 324.373 12.011 378.453 43.221 256.811-27.008 98.091 20.14 23.936 148.565a285.458 285.458 0 00-22.123 48.128c-5.525 15.766 1.963 32.726 16.427 41.088l97.216 56.107v-.021z" fill="url(#prefix__paint0_radial_9_19)"/><path d="M396.544 216.832a494.717 494.717 0 01-42.645 95.04c-67.627 117.163-166.294 186.837-220.374 155.605 121.664 70.251 280.384 23.083 354.539-105.344a285.665 285.665 0 0022.123-48.106c5.525-15.744-1.963-32.726-16.427-41.067l-97.216-56.107v-.021z" fill="url(#prefix__paint1_radial_9_19)"/><path d="M353.92 311.893c67.627-117.162 78.635-237.44 24.533-268.672-54.037-31.21-152.704 38.486-220.373 155.606 44.245-76.587 123.925-113.387 178.005-82.176 54.059 31.232 62.038 118.613 17.814 195.221l.021.021z" fill="url(#prefix__paint2_linear_9_19)"/><path d="M158.08 198.827c-67.627 117.162-78.635 237.44-24.533 268.65 54.058 31.232 152.725-38.442 220.373-155.605-44.245 76.608-123.925 113.408-178.005 82.176-54.059-31.211-62.038-118.613-17.814-195.2l-.021-.021z" fill="url(#prefix__paint3_linear_9_19)"/></g></g><defs><linearGradient id="kling-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e040fb" /><stop offset="100%" stopColor="#00e5ff" /></linearGradient><radialGradient id="prefix__paint0_radial_9_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-59.132 311.591 48.195) scale(310.927 426.086)"><stop offset=".095" stop-color="#FFF959"/><stop offset=".326" stop-color="#0DF35E"/><stop offset=".64" stop-color="#0BF2F9"/><stop offset="1" stop-color="#04A6F0"/></radialGradient><radialGradient id="prefix__paint1_radial_9_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(120.868 138.475 223.808) scale(310.927 426.086)"><stop offset=".095" stop-color="#FFF959"/><stop offset=".326" stop-color="#0DF35E"/><stop offset=".64" stop-color="#0BF2F9"/><stop offset="1" stop-color="#04A6F0"/></radialGradient><linearGradient id="prefix__paint2_linear_9_19" x1="332.331" y1="38.357" x2="385.323" y2="210.368" gradientUnits="userSpaceOnUse"><stop stop-color="#003EFF"/><stop offset="1" stop-color="#0BFFE7"/></linearGradient><linearGradient id="prefix__paint3_linear_9_19" x1="179.669" y1="472.363" x2="126.677" y2="300.352" gradientUnits="userSpaceOnUse"><stop stop-color="#003EFF"/><stop offset="1" stop-color="#0BFFE7"/></linearGradient><clipPath id="prefix__clip0_9_19"><path fill="#fff" d="M0 0h512v512H0z"/></clipPath><clipPath id="prefix__clip1_9_19"><path fill="#fff" d="M0 0h512v512H0z"/></clipPath></defs>
    </svg>
  ),
  "Descript": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17.5 24" className="w-4 h-4 mr-1.5 inline-block" {...props}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 21.8372C0 23.1506 0.852709 24 2.16281 24H8.48135C12.2516 24 15.3357 22.7258 17.4299 20.4912H0V21.8372ZM8.48135 0H2.16281C0.852709 0 0 0.849442 0 2.16281V3.50885H17.4332C15.3357 1.27416 12.2516 0 8.48135 0ZM13.9962 15.4206C13.9962 16.4824 14.6888 17.1718 15.7539 17.1718H19.5404C19.9684 16.1067 20.2592 14.9371 20.3931 13.6727H15.7539C14.6888 13.6727 13.9962 14.3621 13.9962 15.4239V15.4206ZM8.74925 8.58916C8.74925 9.65097 9.44187 10.3403 10.5069 10.3403H20.3931C20.2592 9.07596 19.9717 7.90634 19.5404 6.84127H10.5069C9.44187 6.84127 8.74925 7.53063 8.74925 8.59243V8.58916ZM10.5037 15.4206C10.5037 14.3588 9.81105 13.6695 8.74598 13.6695H0V17.1685H8.74598C9.81105 17.1685 10.5037 16.4792 10.5037 15.4174V15.4206ZM5.25674 8.58916C5.25674 7.52736 4.56412 6.83801 3.49905 6.83801H0V10.3371H3.49905C4.56412 10.3371 5.25674 9.6477 5.25674 8.5859V8.58916Z" fill="#F73B3B"/>
</svg>
  ),
  "Seedance": (props) => (
    <svg id="Layer_2" viewBox="0 0 285.11 248.78" className="w-4 h-4 mr-1.5 inline-block" {...props}>
    <g id="svg30">
      <g id="g68">
        <path id="path58" fill="#3259b4" d="M0,11.01l49.54,14.31v198.14L0,237.77V11.01Z"/>
        <path id="path60" fill="#3c8cff" d="M78.16,112.28l48.43,12.11v106.78l-48.43,9.91V112.28Z"/>
        <path id="path62" fill="#00c8d2" d="M160.72,91.37l45.13-12.11v130.99l-45.13-13.21v-105.68Z"/>
        <path id="path64" fill="#78e6dd" d="M235.57,0l49.54,14.31v222.36l-49.54,12.11V0Z"/>
      </g>
    </g>
  </svg>
  ),
  "CapCut": (props) => (
    <svg fill="#00f2ea" fill-rule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 inline-block" {...props}><title>CapCut</title><path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z"></path></svg>
  ),
  "Pika Labs": (props) => (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="pika-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="100%" stopColor="#e67e22" />
        </linearGradient>
      </defs>
      <g transform="scale(32)">
        <clipPath id="prefix__a"><path d="M0 0h16v16H0z"/></clipPath>
        <g clipPath="url(#prefix__a)">
          <path fill="url(#pika-grad)" d="M.44 13.26h5.778c-.093-.94-.763-1.97-2.4-2.672v-.07c1.908.587 2.595 1.591 2.874 2.74h7.128l-1.147-.983C13.345 10.163 16 9.165 16 9.165c-.094-1.694-.96-3.273-3.858-4.552L5.551 2c.22 2.786 1.207 4.383 3.682 4.775v.068c-1.72-.042-2.912-.81-3.517-2.392C.466 5.415-.801 9.437.44 13.26z"/>
        </g>
      </g>
    </svg>
  ),
  "LMArena": (props) => (
    <svg id="Layer_2" data-name="Layer 2" viewBox="0 0 121.75 91.97" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="arena-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a00" />
          <stop offset="100%" stopColor="#e52d27" />
        </linearGradient>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1" fill="url(#arena-grad)">
        <path d="M42.03,39.58c-3.93,0-7.12,3.24-7.12,7.24v45.14h4.53v-45.14c0-1.46,1.16-2.64,2.6-2.64s2.6,1.18,2.6,2.64v45.14h4.53v-45.14c0-4-3.19-7.24-7.12-7.24h-.02Z"/>
        <path d="M79.71,39.58c-3.93,0-7.12,3.24-7.12,7.24v45.14h4.53v-45.14c0-1.46,1.16-2.64,2.6-2.64s2.6,1.18,2.6,2.64v45.14h4.53v-45.14c0-4-3.19-7.24-7.12-7.24h-.02Z"/>
        <path d="M60.88,39.58c-3.93,0-7.12,3.24-7.12,7.24v45.14h4.53v-45.14c0-1.46,1.16-2.64,2.6-2.64s2.6,1.18,2.6,2.64v45.14h4.53v-45.14c0-4-3.19-7.24-7.12-7.24h-.02Z"/>
        <path d="M105.04,20.81l3.14-5.54h7.29l6.29-15.27H0l6.29,15.27h7.29l3.13,5.54c-6.09,2.12-11.1,7.5-11.1,15.6s5.76,14.97,14.39,14.97c1.89,0,3.64-.4,5.2-1.1v41.68h4.52v-45.36c1.42-1.96,2.26-4.4,2.32-7.16,0-.04.01-.09.01-.14,0-.04-.01-.06-.01-.1,0-.02.01-.05.01-.07,0-.04-.01-.07-.01-.12-.05-1.87-.54-3.61-1.4-5.09h60.5c-.86,1.48-1.35,3.23-1.4,5.09,0,.05-.01.09-.01.12v.17s.01.1.01.14c.06,2.76.89,5.21,2.32,7.16v45.36h4.52v-41.68c1.56.7,3.3,1.1,5.2,1.1,8.62,0,14.39-7.16,14.39-14.97s-5.03-13.49-11.12-15.6ZM9.3,10.66l-2.5-6.05h108.15l-2.5,6.05H9.3ZM102.95,15.27l-2.51,4.45H21.31l-2.51-4.45h84.15ZM101.76,46.78c-4.42,0-7.46-3.04-7.51-7.51.02-3.16,2.03-5.28,4.95-5.32h.09c1.83,0,3.32,1.53,3.32,3.14v.07c-.04.93-.77,1.66-1.69,1.66-1.25,0-2.27,1.03-2.27,2.3s1.02,2.3,2.27,2.3c3.43,0,6.24-2.83,6.24-6.34,0-.11-.02-.22-.04-.32-.18-4.12-3.51-7.41-7.89-7.41h-38.66s-.31-.01-.31-.01H22.53c-4.39.01-7.71,3.3-7.89,7.42-.01.1-.04.21-.04.32,0,3.51,2.81,6.34,6.24,6.34,1.25,0,2.27-1.03,2.27-2.3s-1.02-2.3-2.27-2.3c-.92,0-1.65-.72-1.7-1.66,0-.02.01-.05.01-.07,0-1.61,1.48-3.14,3.32-3.14h.07c2.93.04,4.94,2.15,4.96,5.32-.05,4.47-3.1,7.51-7.51,7.51-5.81,0-9.85-4.77-9.85-10.36,0-7.55,5.82-12.1,13.02-12.1h75.45c7.19,0,13.02,4.56,13.02,12.1,0,5.59-4.04,10.36-9.85,10.36Z"/>
      </g>
    </svg>
  ),
  "Hailuoai": (props) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 inline-block" {...props}><path d="M17.7391 8.67203C17.7391 3.82136 13.6642 -0.0954522 8.75784 0.16566C4.43991 0.394636 0.945391 3.88954 0.716441 8.20794C0.455357 13.1148 4.37163 17.1904 9.22176 17.1904H14.819C16.4297 17.1904 17.7351 15.8847 17.7351 14.2738V8.95526C17.7391 8.86086 17.7411 8.76643 17.7411 8.67203H17.7391ZM4.84158 13.4021C3.48595 12.2452 2.65047 10.3934 2.68863 8.50334C2.69064 8.37077 2.69868 8.23807 2.70872 8.10751V8.09947C2.90554 5.84587 4.36159 3.7449 6.40005 2.76874C8.44052 1.79259 10.9891 1.9795 12.8649 3.24087C14.7407 4.50225 15.8774 6.79199 15.7428 9.04961C15.7147 9.54372 15.6284 10.0338 15.5099 10.5139C15.4536 10.7428 15.3833 10.9799 15.1825 11.1225C15.0721 11.2008 14.9254 11.2309 14.8009 11.1766C14.5901 11.0863 14.5639 10.8413 14.5499 10.6304C14.4434 9.11592 14.0398 7.55323 13.0155 6.43044C12.2423 5.58283 11.1437 5.0446 10.001 4.93815C8.85826 4.83169 7.68338 5.15907 6.75151 5.82591C5.97227 6.38429 5.35972 7.18361 5.06249 8.09751C4.76526 9.0114 4.79739 10.0338 5.185 10.9095C5.47018 11.5542 5.94415 12.1126 6.53461 12.4983C7.57693 13.1812 9.00084 13.2795 10.0833 12.6609C11.1658 12.0423 11.8125 10.7026 11.5374 9.48741C11.2482 8.216 9.91263 7.23587 8.61725 7.47689C8.49274 7.501 8.3622 7.42661 8.33006 7.30409C8.28387 7.12733 8.48068 7.037 8.63934 7.00888C9.89656 6.78393 11.2442 7.42268 11.933 8.49726C12.6219 9.57184 12.658 11.014 12.0937 12.1609C11.5314 13.3078 10.4127 14.1453 9.17156 14.4486C7.49861 14.8563 5.98432 14.3742 4.83957 13.3961L4.84158 13.4021Z" fill="url(#paint0_linear_31_5201)"/><defs><linearGradient id="paint0_linear_31_5201" x1="1.08397" y1="0.778277" x2="20.2156" y2="19.3333" gradientUnits="userSpaceOnUse"><stop offset="0.11" stop-color="#FFD400"/><stop offset="0.22" stop-color="#FF891F"/><stop offset="0.42" stop-color="#E4659A"/><stop offset="0.56" stop-color="#DB2ED7"/><stop offset="0.75" stop-color="#7264F4"/></linearGradient></defs></svg>
  ),
  "Kontext": (props) => (
    <svg fillRule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="bfl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff87" />
          <stop offset="100%" stopColor="#60efff" />
        </linearGradient>
      </defs>
      <title>Black Forest Labs</title>
      <path fill="url(#bfl-grad)" d="M17.113 10.248H14.56l-2.553-3.616-7.963 11.27h2.558l5.405-7.654h2.552l-5.404 7.653h2.565l5.392-7.653L24 20 19.97 20v-2.091l-2.857-4.044-2.842 4.037V20H0L12.008 3l5.105 7.249z"/>
    </svg>
  ),
  "Structured Libraries": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/><path d="M6 14h10"/></svg>
  ),
  "Chain of Thought": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M5 16l4.5-8M19 16l-4.5-8M8 19h8"/></svg>
  ),
  "Few Shot Templates": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><circle cx="15" cy="15" r="2"/></svg>
  ),
  "Prompt Style Anchoring": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 inline-block" {...props}><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><line x1="9" y1="11" x2="15" y2="11"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
  ),
  "Stable Diffusion": (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512.004" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="runway-grad-sd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7928ca" />
          <stop offset="100%" stopColor="#ff0080" />
        </linearGradient>
      </defs>
      <path fill="url(#runway-grad-sd)" d="M392.51 511.69c-62.032 5.67-113.901-67.019-153.657-103.887C218.749 552.665-.15 538.933 0 391.985c.072-61.724 0-212.549 0-272.331C0 98.16 5.899 76.515 16.965 58.16c21-35.599 61.58-58.584 102.906-58.14 62.254.079 212.177-.071 272.639 0 147.084 0 161.053 218.821 15.696 238.523l68.977 68.884c75.785 71.27 18.906 207.396-84.673 204.263zm-33.407-86.199c42.745 44.035 110.984-24.182 66.963-66.869L306.489 239.217h-66.891v66.862l103.365 103.222 16.14 16.19zM72.417 392.056c-.974 61.201 95.66 61.423 94.693 0V119.654c.817-30.525-31.464-54.778-60.613-45.375-1.268.373-2.465.746-3.59 1.197-18.306 6.787-31.013 25.522-30.49 45.074v271.506zM392.51 166.893c61.429.975 61.358-95.524 0-94.556H230.109c12.335 25.974 9.196 66.425 9.418 94.556H392.51z"/>
    </svg>
  ),
  "Nano Banana Pro": (props) => (
    <svg width="100%" viewBox="0 0 299 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="light-mode-shown w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a73e8" />
          <stop offset="50%" stopColor="#8a3ffc" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <path d="M125.365 32C120.691 38.5727 116.782 45.7277 113.766 53.334H64C40.4361 53.3342 21.3342 72.4361 21.334 96V245.334C21.3344 268.898 40.4362 288 64 288H213.334C236.898 288 256 268.898 256 245.334V179.93C263.778 175.739 270.945 170.561 277.334 164.563V245.334C277.334 280.68 248.68 309.334 213.334 309.334H64C28.6542 309.334 0.00038177 280.68 0 245.334V96C0.000171479 60.654 28.654 32.0002 64 32H125.365Z" fill="currentColor"></path>
      <path d="M281.333 71.5244C269.006 66.218 258.221 58.9383 248.972 49.6942C239.728 40.4502 232.448 29.6601 227.142 17.3332C225.105 12.6088 223.468 7.75264 222.213 2.77367C221.804 1.14585 220.344 0 218.666 0C216.988 0 215.529 1.14585 215.12 2.77367C213.865 7.75264 212.228 12.6043 210.191 17.3332C204.884 29.6601 197.605 40.4502 188.36 49.6942C179.116 58.9383 168.326 66.218 155.999 71.5244C151.275 73.5614 146.419 75.1984 141.44 76.4533C139.812 76.8626 138.666 78.3222 138.666 80C138.666 81.6778 139.812 83.1374 141.44 83.5467C146.419 84.8016 151.271 86.4386 155.999 88.4756C168.326 93.782 179.112 101.062 188.36 110.306C197.609 119.55 204.884 130.34 210.191 142.667C212.228 147.391 213.865 152.247 215.12 157.226C215.529 158.854 216.988 160 218.666 160C220.344 160 221.804 158.854 222.213 157.226C223.468 152.247 225.105 147.396 227.142 142.667C232.448 130.34 239.728 119.554 248.972 110.306C258.216 101.062 269.006 93.782 281.333 88.4756C286.057 86.4386 290.914 84.8016 295.893 83.5467C297.52 83.1374 298.666 81.6778 298.666 80C298.666 78.3222 297.52 76.8626 295.893 76.4533C290.914 75.1984 286.062 73.5614 281.333 71.5244Z" fill="url(#gemini-grad)"></path>
    </svg>
  ),
  "Veo": (props) => (
    <svg width="100%" viewBox="0 0 299 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="light-mode-shown w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a73e8" />
          <stop offset="50%" stopColor="#8a3ffc" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <path d="M125.365 32C120.691 38.5727 116.782 45.7277 113.766 53.334H64C40.4361 53.3342 21.3342 72.4361 21.334 96V245.334C21.3344 268.898 40.4362 288 64 288H213.334C236.898 288 256 268.898 256 245.334V179.93C263.778 175.739 270.945 170.561 277.334 164.563V245.334C277.334 280.68 248.68 309.334 213.334 309.334H64C28.6542 309.334 0.00038177 280.68 0 245.334V96C0.000171479 60.654 28.654 32.0002 64 32H125.365Z" fill="currentColor"></path>
      <path d="M281.333 71.5244C269.006 66.218 258.221 58.9383 248.972 49.6942C239.728 40.4502 232.448 29.6601 227.142 17.3332C225.105 12.6088 223.468 7.75264 222.213 2.77367C221.804 1.14585 220.344 0 218.666 0C216.988 0 215.529 1.14585 215.12 2.77367C213.865 7.75264 212.228 12.6043 210.191 17.3332C204.884 29.6601 197.605 40.4502 188.36 49.6942C179.116 58.9383 168.326 66.218 155.999 71.5244C151.275 73.5614 146.419 75.1984 141.44 76.4533C139.812 76.8626 138.666 78.3222 138.666 80C138.666 81.6778 139.812 83.1374 141.44 83.5467C146.419 84.8016 151.271 86.4386 155.999 88.4756C168.326 93.782 179.112 101.062 188.36 110.306C197.609 119.55 204.884 130.34 210.191 142.667C212.228 147.391 213.865 152.247 215.12 157.226C215.529 158.854 216.988 160 218.666 160C220.344 160 221.804 158.854 222.213 157.226C223.468 152.247 225.105 147.396 227.142 142.667C232.448 130.34 239.728 119.554 248.972 110.306C258.216 101.062 269.006 93.782 281.333 88.4756C286.057 86.4386 290.914 84.8016 295.893 83.5467C297.52 83.1374 298.666 81.6778 298.666 80C298.666 78.3222 297.52 76.8626 295.893 76.4533C290.914 75.1984 286.062 73.5614 281.333 71.5244Z" fill="url(#gemini-grad)"></path>
    </svg>
  ),
  "Sora": (props) => (
    <svg viewBox="0 0 24 24" fill="#10a37f" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
  "CometAPI": (props) => (
    <svg viewBox="0 0 24 24" fill="#19a5a3" className="w-4 h-4 mr-1.5 inline-block" {...props}>
      <defs><linearGradient id="perp-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#19a5a3" /><stop offset="100%" stopColor="#00ff87" /></linearGradient></defs>
<title>Perplexity</title><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
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
