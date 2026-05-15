/**
 * BackgroundOrb — fixed full-viewport canvas morphing blob.
 * Persists across all route changes. Reacts to scroll speed.
 * Per-route color / speed personality.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_CONFIGS: Record<string, {
  colors: { r: number; g: number; b: number }[];
  speed: number;
  morphScale: number;
  opacity: number;
}> = {
  "/": {
    colors: [
      { r: 124, g: 58,  b: 237 },
      { r: 6,   g: 182, b: 212 },
      { r: 236, g: 72,  b: 153 },
      { r: 79,  g: 70,  b: 229 },
    ],
    speed: 1.0, morphScale: 1.0, opacity: 0.72,
  },
  "/services": {
    colors: [
      { r: 79,  g: 70,  b: 229 },
      { r: 59,  g: 130, b: 246 },
      { r: 124, g: 58,  b: 237 },
      { r: 6,   g: 182, b: 212 },
    ],
    speed: 1.3, morphScale: 1.15, opacity: 0.65,
  },
  "/portfolio": {
    colors: [
      { r: 236, g: 72,  b: 153 },
      { r: 244, g: 63,  b: 94  },
      { r: 124, g: 58,  b: 237 },
      { r: 251, g: 146, b: 60  },
    ],
    speed: 1.7, morphScale: 1.2, opacity: 0.62,
  },
  "/about": {
    colors: [
      { r: 124, g: 58,  b: 237 },
      { r: 109, g: 40,  b: 217 },
      { r: 167, g: 139, b: 250 },
      { r: 79,  g: 70,  b: 229 },
    ],
    speed: 0.65, morphScale: 0.88, opacity: 0.68,
  },
  "/contact": {
    colors: [
      { r: 6,   g: 182, b: 212 },
      { r: 20,  g: 184, b: 166 },
      { r: 79,  g: 70,  b: 229 },
      { r: 124, g: 58,  b: 237 },
    ],
    speed: 0.9, morphScale: 0.92, opacity: 0.63,
  },
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpC(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) { return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) }; }

function getColor(colors: { r: number; g: number; b: number }[], t: number) {
  const n   = colors.length;
  const idx = ((t % n) + n) % n;
  const i   = Math.floor(idx);
  return lerpC(colors[i % n], colors[(i + 1) % n], idx - i);
}

export default function BackgroundOrb() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const location    = useLocation();
  const routeRef    = useRef(location.pathname);
  const scrollRef   = useRef(0);
  const animRef     = useRef(0);
  const transRef    = useRef(1);

  /* current blended config — mutated in-place each frame */
  const curRef = useRef({ ...ROUTE_CONFIGS["/"] });

  useEffect(() => {
    routeRef.current = location.pathname;
    transRef.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (ts: number) => {
      const W  = window.innerWidth;
      const H  = window.innerHeight;
      const cx = W / 2;
      const cy = H / 2;

      /* smooth config blend */
      const target = ROUTE_CONFIGS[routeRef.current] ?? ROUTE_CONFIGS["/"];
      const tt  = Math.min((transRef.current += 0.012), 1);
      const cur = curRef.current;
      cur.speed      = lerp(cur.speed,      target.speed,      tt);
      cur.morphScale = lerp(cur.morphScale, target.morphScale, tt);
      cur.opacity    = lerp(cur.opacity,    target.opacity,    tt);
      for (let i = 0; i < cur.colors.length; i++) {
        cur.colors[i] = lerpC(cur.colors[i], target.colors[i], tt);
      }

      /* scroll multiplier: up to 4× speed */
      const smul = Math.min(1 + scrollRef.current * 0.0006, 4);
      const t    = ts * 0.00028 * cur.speed * smul;
      const baseR = Math.min(W, H) * 0.38 * cur.morphScale;
      const op   = cur.opacity;

      ctx.clearRect(0, 0, W, H);

      /* ── blob points ── */
      const N   = 120;
      const pts: { x: number; y: number }[] = [];
      const stb = scrollRef.current * 0.00015;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const r = baseR * (
          1
          + Math.sin(a * 2 + t * 1.1)  * 0.058
          + Math.sin(a * 3 - t * 0.75) * 0.042
          + Math.sin(a * 5 + t * 1.55) * 0.024
          + Math.cos(a * 4 - t * 0.88) * 0.032
          + Math.cos(a * 7 + t * 2.15) * 0.014
          + Math.sin(a * 1.5 + t * 0.52) * 0.048
          + Math.sin(a * 2 + t * 3.1 + scrollRef.current * 0.003) * stb
        );
        pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
      }

      const c0 = getColor(cur.colors, t * 0.14);
      const c1 = getColor(cur.colors, t * 0.14 + 0.33);
      const c2 = getColor(cur.colors, t * 0.14 + 0.66);

      /* ── outer halo ── */
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 2.2);
      halo.addColorStop(0,    `rgba(${c0.r},${c0.g},${c0.b},0)`);
      halo.addColorStop(0.35, `rgba(${c1.r},${c1.g},${c1.b},${0.07 * op})`);
      halo.addColorStop(0.65, `rgba(${c2.r},${c2.g},${c2.b},${0.04 * op})`);
      halo.addColorStop(1,    `rgba(0,0,0,0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);

      /* ── mid glow ── */
      const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.4);
      mid.addColorStop(0,    `rgba(${c0.r},${c0.g},${c0.b},0)`);
      mid.addColorStop(0.55, `rgba(${c0.r},${c0.g},${c0.b},${0.11 * op})`);
      mid.addColorStop(1,    `rgba(0,0,0,0)`);
      ctx.fillStyle = mid;
      ctx.fillRect(0, 0, W, H);

      /* ── blob path util ── */
      const drawBlob = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < N; i++) {
          const c = pts[i], n = pts[(i + 1) % N];
          ctx.quadraticCurveTo(c.x, c.y, (c.x + n.x) / 2, (c.y + n.y) / 2);
        }
        ctx.closePath();
      };

      /* ── blob body ── */
      drawBlob();
      const ga   = t * 0.55;
      const body = ctx.createLinearGradient(
        cx + Math.cos(ga) * baseR * 0.6,   cy + Math.sin(ga) * baseR * 0.6,
        cx + Math.cos(ga + Math.PI) * baseR * 0.6, cy + Math.sin(ga + Math.PI) * baseR * 0.6
      );
      body.addColorStop(0,   `rgba(${c0.r},${c0.g},${c0.b},${0.52 * op})`);
      body.addColorStop(0.5, `rgba(${c1.r},${c1.g},${c1.b},${0.42 * op})`);
      body.addColorStop(1,   `rgba(${c2.r},${c2.g},${c2.b},${0.48 * op})`);
      ctx.fillStyle = body;
      ctx.fill();

      /* ── glass highlight + inner particles (clipped) ── */
      ctx.save();
      drawBlob();
      ctx.clip();

      const hl = ctx.createRadialGradient(cx - baseR * 0.28, cy - baseR * 0.32, 0, cx, cy, baseR);
      hl.addColorStop(0,   "rgba(255,255,255,0.28)");
      hl.addColorStop(0.3, "rgba(255,255,255,0.07)");
      hl.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = hl;
      ctx.fillRect(0, 0, W, H);

      for (let p = 0; p < 7; p++) {
        const pt2 = t * (0.48 + p * 0.13) + p * 1.15;
        const pr  = baseR * (0.18 + 0.52 * Math.sin(p * 2.37));
        const px  = cx + Math.cos(pt2) * pr;
        const py  = cy + Math.sin(pt2 * 1.35) * pr;
        const pc  = getColor(cur.colors, t * 0.09 + p * 0.19);
        const pg  = ctx.createRadialGradient(px, py, 0, px, py, baseR * 0.16);
        pg.addColorStop(0, `rgba(${pc.r},${pc.g},${pc.b},0.42)`);
        pg.addColorStop(1, `rgba(${pc.r},${pc.g},${pc.b},0)`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, baseR * 0.16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      /* ── edge ring ── */
      drawBlob();
      const ec = getColor(cur.colors, t * 0.18 + 0.5);
      ctx.strokeStyle = `rgba(${ec.r},${ec.g},${ec.b},${0.45 * op})`;
      ctx.lineWidth   = 1.8;
      ctx.stroke();

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
