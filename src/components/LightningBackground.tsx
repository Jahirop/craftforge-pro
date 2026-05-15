/**
 * LightningBackground — Fixed full-viewport thunderstorm canvas.
 *
 * Phases (repeats every 5-7 s):
 *   IDLE      → ambient minor bolts only
 *   CHARGING  → 600 ms radial energy build-up at strike origin
 *   STRIKE    → main bolt + branches fires (instant flash)
 *   DISCHARGE → 800 ms radial energy-blast ring expands
 *   FADE      → bolt fades out
 *
 * Route-change: triggers an immediate mini-strike.
 */

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ─── types ─────────────────────────────────────────────────── */

interface Segment { x: number; y: number }

interface Bolt {
  main:     Segment[];
  branches: Segment[][];
  alpha:    number;
  width:    number;
  baseColor: string;   // "r,g,b"
  isMajor:  boolean;
  birth:    number;    // performance.now() timestamp
  life:     number;    // total duration ms
}

/* ─── bolt generation ───────────────────────────────────────── */

function zigzag(
  x1: number, y1: number,
  x2: number, y2: number,
  roughness: number,
  depth: number
): Segment[] {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness * 0.35;
  return [
    ...zigzag(x1, y1, mx, my, roughness * 0.62, depth - 1),
    ...zigzag(mx, my, x2, y2, roughness * 0.62, depth - 1).slice(1),
  ];
}

function spawnBranch(
  origin: Segment,
  angle: number,
  length: number,
  roughness: number,
  depth: number
): Segment[] {
  const ex = origin.x + Math.cos(angle) * length;
  const ey = origin.y + Math.sin(angle) * length;
  return zigzag(origin.x, origin.y, ex, ey, roughness, depth);
}

/* ─── route color themes ────────────────────────────────────── */

const ROUTE_COLORS: Record<string, string> = {
  "/":          "160,100,255",
  "/services":  "100,140,255",
  "/portfolio": "255,80,200",
  "/about":     "140,60,255",
  "/contact":   "60,210,255",
};

/* ─── main component ────────────────────────────────────────── */

type MainPhase = "idle" | "charging" | "strike" | "discharge";

export default function LightningBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const location     = useLocation();
  const locationRef  = useRef(location.pathname);

  /* Live state in refs — zero re-renders */
  const boltsRef       = useRef<Bolt[]>([]);
  const mainPhase      = useRef<MainPhase>("idle");
  const phaseStart     = useRef(0);
  const idleDuration   = useRef(5000);
  const chargeOrigin   = useRef({ x: 0.5, y: 0 }); // normalised 0-1

  const nextMinor      = useRef(0);
  const animRef        = useRef(0);

  /* Keep locationRef current */
  useEffect(() => {
    locationRef.current = location.pathname;
    /* Route change → immediately queue a mini-burst */
    mainPhase.current  = "charging";
    phaseStart.current = performance.now();
    chargeOrigin.current = { x: 0.3 + Math.random() * 0.4, y: 0 };
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── helper: draw one bolt (multiple glow layers) ── */
    function drawBolt(bolt: Bolt, ctx: CanvasRenderingContext2D) {
      const { main, branches, alpha, width, baseColor, isMajor } = bolt;
      if (main.length < 2 || alpha <= 0.01) return;

      const layers = isMajor
        ? [
            { w: width * 20, a: 0.04, col: baseColor },
            { w: width * 10, a: 0.09, col: baseColor },
            { w: width * 5,  a: 0.22, col: baseColor },
            { w: width * 2,  a: 0.65, col: baseColor },
            { w: width,      a: 1.0,  col: "255,255,255" },
          ]
        : [
            { w: width * 8,  a: 0.06, col: baseColor },
            { w: width * 3,  a: 0.22, col: baseColor },
            { w: width,      a: 0.75, col: "230,230,255" },
          ];

      const path = (segs: Segment[]) => {
        ctx.beginPath();
        ctx.moveTo(segs[0].x, segs[0].y);
        for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
      };

      for (const l of layers) {
        path(main);
        ctx.strokeStyle = `rgba(${l.col},${l.a * alpha})`;
        ctx.lineWidth   = l.w;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.stroke();
      }

      /* Branches */
      for (const br of branches) {
        if (br.length < 2) continue;
        path(br);
        ctx.strokeStyle = `rgba(${baseColor},${alpha * 0.55})`;
        ctx.lineWidth   = width * 0.65;
        ctx.lineCap     = "round";
        ctx.stroke();

        path(br);
        ctx.strokeStyle = `rgba(${baseColor},${alpha * 0.12})`;
        ctx.lineWidth   = width * 3;
        ctx.stroke();
      }
    }

    /* ── helper: spawn major bolt ── */
    function spawnMajor(W: number, H: number, ts: number) {
      const ox = chargeOrigin.current.x;
      const x1 = W * ox;
      const x2 = W * (0.25 + Math.random() * 0.5);
      const y2 = H * (0.3  + Math.random() * 0.45);

      const main = zigzag(x1, -10, x2, y2, W * 0.10, 7);

      const branches: Segment[][] = [];
      const branchCount = 3 + Math.floor(Math.random() * 5);
      for (let b = 0; b < branchCount; b++) {
        const idx = Math.floor(main.length * (0.15 + Math.random() * 0.65));
        if (idx >= main.length) continue;
        const origin = main[idx];
        const baseAngle = Math.atan2(y2 - (-10), x2 - x1);
        const angle = baseAngle + (Math.random() - 0.5) * 1.4;
        const len   = 50 + Math.random() * 140;
        branches.push(spawnBranch(origin, angle, len, W * 0.04, 4));
      }

      const col = ROUTE_COLORS[locationRef.current] ?? ROUTE_COLORS["/"];
      boltsRef.current.push({
        main, branches,
        alpha: 0, width: 2.5 + Math.random() * 1.5,
        baseColor: col, isMajor: true,
        birth: ts, life: 1400 + Math.random() * 500,
      });
    }

    /* ── helper: spawn minor bolt ── */
    function spawnMinor(W: number, H: number, ts: number) {
      const mode = Math.floor(Math.random() * 3);
      let x1: number, y1: number, x2: number, y2: number;

      if (mode === 0) {        // top-down short
        x1 = Math.random() * W;
        y1 = Math.random() * H * 0.15;
        x2 = x1 + (Math.random() - 0.5) * 180;
        y2 = y1 + 70 + Math.random() * 200;
      } else if (mode === 1) { // side-to-side
        const fromLeft = Math.random() > 0.5;
        x1 = fromLeft ? 0 : W;
        y1 = H * (0.1 + Math.random() * 0.8);
        x2 = fromLeft
          ? 60 + Math.random() * 250
          : W - 60 - Math.random() * 250;
        y2 = y1 + (Math.random() - 0.5) * 200;
      } else {                  // random float anywhere
        x1 = W * (0.05 + Math.random() * 0.9);
        y1 = H * Math.random() * 0.6;
        x2 = x1 + (Math.random() - 0.5) * 130;
        y2 = y1 + 50 + Math.random() * 180;
      }

      const main = zigzag(x1, y1, x2, y2, 55, 4);
      const col  = ROUTE_COLORS[locationRef.current] ?? ROUTE_COLORS["/"];
      boltsRef.current.push({
        main, branches: [],
        alpha: 0, width: 0.7 + Math.random() * 1.1,
        baseColor: col, isMajor: false,
        birth: ts, life: 280 + Math.random() * 380,
      });
    }

    /* ── main loop ── */
    const loop = (ts: number) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      const elapsed = ts - phaseStart.current;

      /* ── Phase state machine ── */
      switch (mainPhase.current) {

        case "idle": {
          if (elapsed >= idleDuration.current) {
            mainPhase.current   = "charging";
            phaseStart.current  = ts;
            chargeOrigin.current = { x: 0.2 + Math.random() * 0.6, y: 0 };
          }
          break;
        }

        case "charging": {
          /* Radial build-up glow at strike point */
          const prog  = Math.min(elapsed / 600, 1);
          const cx    = W * chargeOrigin.current.x;
          const cy    = -10;
          const r     = prog * 110;
          const alpha = prog * 0.85;

          const col   = ROUTE_COLORS[locationRef.current] ?? ROUTE_COLORS["/"];
          const grad  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(0,   `rgba(${col},${alpha})`);
          grad.addColorStop(0.45,`rgba(${col},${alpha * 0.55})`);
          grad.addColorStop(1,   `rgba(${col},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);

          /* Charge "corona" ring */
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${prog * 0.35})`;
          ctx.lineWidth   = 1.5;
          ctx.stroke();

          if (elapsed >= 600) {
            spawnMajor(W, H, ts);
            mainPhase.current  = "strike";
            phaseStart.current = ts;
          }
          break;
        }

        case "strike": {
          if (elapsed >= 200) {
            mainPhase.current  = "discharge";
            phaseStart.current = ts;
          }
          break;
        }

        case "discharge": {
          /* Expanding energy-blast ring */
          const prog  = Math.min(elapsed / 800, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          const cx    = W * chargeOrigin.current.x;
          const cy    = H * 0.5;
          const r     = eased * Math.min(W, H) * 0.7;
          const alpha = (1 - eased) * 0.22;

          const col  = ROUTE_COLORS[locationRef.current] ?? ROUTE_COLORS["/"];
          const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r);
          grad.addColorStop(0,   `rgba(${col},0)`);
          grad.addColorStop(0.5, `rgba(${col},${alpha})`);
          grad.addColorStop(0.8, `rgba(255,255,255,${alpha * 0.4})`);
          grad.addColorStop(1,   `rgba(${col},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);

          /* Screen-wide flash at moment of discharge */
          if (elapsed < 120) {
            const flashA = (1 - elapsed / 120) * 0.08;
            ctx.fillStyle = `rgba(200,180,255,${flashA})`;
            ctx.fillRect(0, 0, W, H);
          }

          if (elapsed >= 800) {
            mainPhase.current  = "idle";
            phaseStart.current = ts;
            idleDuration.current = 4500 + Math.random() * 2500;
          }
          break;
        }
      }

      /* ── Continuous minor bolts ── */
      if (ts > nextMinor.current) {
        spawnMinor(W, H, ts);
        nextMinor.current = ts + 180 + Math.random() * 900;
      }

      /* ── Update + draw all bolts ── */
      boltsRef.current = boltsRef.current.filter((bolt) => {
        const age  = ts - bolt.birth;
        const prog = age / bolt.life;
        if (prog >= 1) return false;

        /* Alpha envelope: 0→1 in first 8%, hold to 55%, 1→0 rest */
        bolt.alpha =
          prog < 0.08 ? prog / 0.08 :
          prog < 0.55 ? 1 :
          1 - (prog - 0.55) / 0.45;

        /* Major bolts: discharge-point bloom while still visible */
        if (bolt.isMajor && prog > 0.25 && prog < 0.6) {
          const fp    = (prog - 0.25) / 0.35;
          const bloom = Math.sin(fp * Math.PI) * 0.18;
          const tip   = bolt.main[bolt.main.length - 1];
          const grad  = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 180);
          const col   = bolt.baseColor;
          grad.addColorStop(0, `rgba(255,255,255,${bloom})`);
          grad.addColorStop(0.4,`rgba(${col},${bloom * 0.7})`);
          grad.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);
        }

        drawBolt(bolt, ctx);
        return true;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    /* Kick off */
    phaseStart.current    = performance.now();
    mainPhase.current     = "idle";
    idleDuration.current  = 1200; // fire quickly on mount
    nextMinor.current     = performance.now() + 100;

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -2 }}
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
