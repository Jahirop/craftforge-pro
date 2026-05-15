/**
 * HeroLightning — Fixed-background 3D lightning bolt with charge / discharge cycle.
 *
 * Phase loop (auto-repeating):
 *   IDLE (2.5 s)  ──►  CHARGING (5.5 s)  ──►  DISCHARGE (0.75 s)  ──►  RECOVERY (2 s)
 *
 * Canvas (CW × CH = 600 × 800) is larger than the bolt (255 × 520) so ring bursts
 * can expand outward.  Bolt is drawn at offset (OX = 172, OY = 140) inside the canvas.
 */
import { useEffect, useRef } from "react";

/* ─── Bolt shape (255 × 520 viewBox) ─────────────────────────── */
const PTS: [number, number][] = [
  [90,   0  ],
  [215,  0  ],
  [125, 265 ],
  [210, 265 ],
  [80,  515 ],
  [0,   265 ],
];

const SPARK_SEEDS = [0, 0.12, 0.24, 0.37, 0.50, 0.63, 0.76, 0.89];

type Phase = "idle" | "charging" | "discharge" | "recovery";
const PHASE_ORDER: Phase[] = ["idle", "charging", "discharge", "recovery"];
const PHASE_DUR: Record<Phase, number> = {
  idle:      2500,
  charging:  5500,
  discharge: 750,
  recovery:  2000,
};

/* Canvas vs bolt dimensions */
const W  = 255, H  = 520;   // bolt viewBox
const CW = 600, CH = 800;   // canvas (bigger for rings)
const OX = (CW - W) / 2;    // 172.5
const OY = (CH - H) / 2;    // 140

/** Fraction t → [x,y] along bolt perimeter (bolt-local coords) */
function boltPointAt(t: number): [number, number] {
  const total = PTS.reduce((s, p, i) => {
    const b = PTS[(i + 1) % PTS.length];
    return s + Math.hypot(b[0] - p[0], b[1] - p[1]);
  }, 0);
  let target = ((t % 1) + 1) % 1 * total;
  for (let i = 0; i < PTS.length; i++) {
    const a = PTS[i], b = PTS[(i + 1) % PTS.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (target <= len) {
      const r = target / len;
      return [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
    }
    target -= len;
  }
  return PTS[0];
}

/** Clip context to bolt outline in canvas-space coords */
function boltClip(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(PTS[0][0] + OX, PTS[0][1] + OY);
  for (let i = 1; i < PTS.length; i++) ctx.lineTo(PTS[i][0] + OX, PTS[i][1] + OY);
  ctx.closePath();
}

interface Props { className?: string }

export default function HeroLightning({ className = "" }: Props) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const animRef       = useRef(0);
  const phaseRef      = useRef<Phase>("idle");
  const phaseStartRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = CW * dpr;
    canvas.height = CH * dpr;
    ctx.scale(dpr, dpr);

    const loop = (ts: number) => {
      /* ── Phase clock ── */
      if (phaseStartRef.current === 0) phaseStartRef.current = ts;
      const elapsed = ts - phaseStartRef.current;
      const dur     = PHASE_DUR[phaseRef.current];
      if (elapsed >= dur) {
        phaseStartRef.current = ts;
        const next = (PHASE_ORDER.indexOf(phaseRef.current) + 1) % PHASE_ORDER.length;
        phaseRef.current = PHASE_ORDER[next];
      }

      const pp    = Math.min(elapsed / dur, 1);   // 0 → 1 within phase
      const phase = phaseRef.current;
      const pulse = Math.sin(ts * 0.0018) * 0.5 + 0.5; // slow ambient pulse

      /* ── Per-phase intensity scalars ── */
      let charge    = 0;   // 0-1 how "charged" the bolt looks
      let discharge = 0;   // 0-1 flash / blast intensity
      let recovery  = 0;   // 0-1 post-discharge residue

      switch (phase) {
        case "idle":
          charge = 0;
          break;
        case "charging":
          // ease-in: slow build then accelerates near end
          charge = Math.pow(pp, 1.4);
          break;
        case "discharge":
          charge    = 1;
          // sharp peak at 15 %, then falls — sin arch
          discharge = Math.pow(Math.sin(pp * Math.PI), 0.55) * (1 - pp * 0.15);
          break;
        case "recovery":
          charge   = 1 - Math.pow(pp, 0.7) * 0.92;
          recovery = 1 - pp;
          break;
      }

      ctx.clearRect(0, 0, CW, CH);

      /* ═══════════════════════════════════════════════════════
         UNCLIPPED — discharge ring bursts (draw before clip)
         ═══════════════════════════════════════════════════════ */
      if (phase === "discharge" && discharge > 0.04) {
        const cx = 125 + OX, cy = 265 + OY;

        /* Ring 1 — fast, violet */
        const r1 = 15 + pp * 500;
        const rg1 = ctx.createRadialGradient(cx, cy, r1 * 0.72, cx, cy, r1 * 1.28);
        rg1.addColorStop(0,   "rgba(200,140,255,0)");
        rg1.addColorStop(0.5, `rgba(200,140,255,${discharge * 0.55})`);
        rg1.addColorStop(1,   "rgba(200,140,255,0)");
        ctx.fillStyle = rg1;
        ctx.fillRect(0, 0, CW, CH);

        /* Ring 2 — slower, cyan */
        const r2 = 10 + pp * 300;
        const rg2 = ctx.createRadialGradient(cx, cy, r2 * 0.78, cx, cy, r2 * 1.22);
        rg2.addColorStop(0,   "rgba(100,220,255,0)");
        rg2.addColorStop(0.5, `rgba(100,220,255,${discharge * 0.48})`);
        rg2.addColorStop(1,   "rgba(100,220,255,0)");
        ctx.fillStyle = rg2;
        ctx.fillRect(0, 0, CW, CH);

        /* White core bloom */
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80 + discharge * 250);
        bloom.addColorStop(0,   `rgba(255,255,255,${discharge * 0.55})`);
        bloom.addColorStop(0.25,`rgba(200,160,255,${discharge * 0.35})`);
        bloom.addColorStop(0.7, `rgba(79,70,229,${discharge * 0.1})`);
        bloom.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, CW, CH);

        /* Arc tendrils from bolt tips (deterministic flicker via sin) */
        if (discharge > 0.3) {
          const drawArcs = (sx: number, sy: number, count: number) => {
            for (let a = 0; a < count; a++) {
              const baseAng = (a / count) * Math.PI * 2;
              const ang     = baseAng + Math.sin(ts * 0.004 + a * 1.7) * 0.7;
              const len     = 20 + Math.abs(Math.sin(ts * 0.006 + a * 2.3)) * 55 * discharge;
              ctx.beginPath();
              ctx.moveTo(sx + OX, sy + OY);
              // 3-point zigzag arc
              for (let step = 1; step <= 3; step++) {
                const t2 = step / 3;
                const jitter = Math.sin(ts * 0.01 + a * 4.1 + step * 3) * 10 * discharge;
                ctx.lineTo(
                  (sx + OX) + Math.cos(ang) * len * t2 + jitter,
                  (sy + OY) + Math.sin(ang) * len * t2 + jitter,
                );
              }
              ctx.strokeStyle = `rgba(220,180,255,${discharge * 0.7 * Math.abs(Math.sin(ts * 0.008 + a))})`;
              ctx.lineWidth = 0.8 + Math.abs(Math.sin(ts * 0.009 + a)) * 1.5;
              ctx.stroke();
            }
          };
          drawArcs(152, 8,   7);   // top tip
          drawArcs(40,  510, 5);   // bottom tip
          drawArcs(0,   265, 4);   // left notch
        }
      }

      /* Residual bloom on recovery */
      if (recovery > 0.08) {
        const cx = 125 + OX, cy = 265 + OY;
        const rBloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160 + recovery * 80);
        rBloom.addColorStop(0,   `rgba(255,255,255,${recovery * 0.22})`);
        rBloom.addColorStop(0.4, `rgba(180,130,255,${recovery * 0.15})`);
        rBloom.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = rBloom;
        ctx.fillRect(0, 0, CW, CH);
      }

      /* ═══════════════════════════════════════════════════════
         CLIPPED — all bolt-interior rendering
         ═══════════════════════════════════════════════════════ */
      ctx.save();
      boltClip(ctx);
      ctx.clip();

      /* Translate so remaining draw calls use bolt-local (0,0)=(top-left of bolt) */
      ctx.save();
      ctx.translate(OX, OY);
      const fx = -OX, fy = -OY; // fullscreen fill origin in translated coords

      /* ── Base gradient fill ── */
      const gm   = 1 + charge * 0.75 + recovery * 0.35;
      const fill = ctx.createLinearGradient(0, 0, W, H);
      fill.addColorStop(0,    `rgba(180,120,255,${(0.25 + pulse * 0.1) * gm})`);
      fill.addColorStop(0.35, `rgba(255,255,255,${(0.50 + pulse * 0.2 + charge * 0.28) * gm})`);
      fill.addColorStop(0.6,  `rgba(120,200,255,${(0.55 + pulse * 0.15) * gm})`);
      fill.addColorStop(1,    `rgba(6,182,212,${(0.3 + pulse * 0.1) * gm})`);
      ctx.fillStyle = fill;
      ctx.fillRect(fx, fy, CW, CH);

      /* ── Charge coronas at bolt tips ── */
      if (charge > 0.04) {
        const co = charge * 0.65;

        // Top tip corona (grows as charge builds)
        const topR = 35 + charge * 230;
        const topC = ctx.createRadialGradient(152, 8, 0, 152, 8, topR);
        topC.addColorStop(0,    `rgba(255,255,255,${co * 0.9})`);
        topC.addColorStop(0.18, `rgba(220,160,255,${co * 0.7})`);
        topC.addColorStop(0.5,  `rgba(120,180,255,${co * 0.35})`);
        topC.addColorStop(1,    "rgba(6,182,212,0)");
        ctx.fillStyle = topC;
        ctx.fillRect(fx, fy, CW, CH);

        // Bottom tip corona
        const botR = 28 + charge * 160;
        const botC = ctx.createRadialGradient(40, 510, 0, 40, 510, botR);
        botC.addColorStop(0,    `rgba(100,220,255,${co * 0.88})`);
        botC.addColorStop(0.35, `rgba(79,70,229,${co * 0.5})`);
        botC.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = botC;
        ctx.fillRect(fx, fy, CW, CH);

        // Notch joint corona
        const midC = ctx.createRadialGradient(125, 265, 0, 125, 265, 18 + charge * 90);
        midC.addColorStop(0,  `rgba(200,155,255,${co * 0.72})`);
        midC.addColorStop(1,  "rgba(0,0,0,0)");
        ctx.fillStyle = midC;
        ctx.fillRect(fx, fy, CW, CH);
      }

      /* ── Flowing energy bands (accelerate with charge) ── */
      const bSpd  = 0.12 * (1 + charge * 6.5);
      const bOp   = 0.42 + charge * 0.38 + pulse * 0.1;

      const band1Y = ((ts * bSpd) % (H + 140)) - 70;
      const bg1    = ctx.createLinearGradient(80, band1Y - 90, 175, band1Y + 90);
      bg1.addColorStop(0,   "rgba(255,255,255,0)");
      bg1.addColorStop(0.5, `rgba(220,240,255,${bOp})`);
      bg1.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = bg1;
      ctx.fillRect(fx, band1Y - 90, CW, 180);

      const band2Y = ((ts * 0.07 + H * 0.6) % (H + 140)) - 70;
      const bg2    = ctx.createLinearGradient(60, band2Y - 60, 185, band2Y + 60);
      bg2.addColorStop(0,   "rgba(100,200,255,0)");
      bg2.addColorStop(0.5, `rgba(100,200,255,${0.3 + charge * 0.32 + pulse * 0.1})`);
      bg2.addColorStop(1,   "rgba(100,200,255,0)");
      ctx.fillStyle = bg2;
      ctx.fillRect(fx, band2Y - 60, CW, 120);

      if (charge > 0.2) {
        const band3Y = ((ts * 0.22 + H * 0.3) % (H + 140)) - 70;
        const bg3    = ctx.createLinearGradient(70, band3Y - 70, 180, band3Y + 70);
        bg3.addColorStop(0,   "rgba(200,150,255,0)");
        bg3.addColorStop(0.5, `rgba(200,150,255,${(charge - 0.2) * 0.95})`);
        bg3.addColorStop(1,   "rgba(200,150,255,0)");
        ctx.fillStyle = bg3;
        ctx.fillRect(fx, band3Y - 70, CW, 140);
      }

      /* ── Face / bevel highlights ── */
      const topHL = ctx.createLinearGradient(90, 0, 140, 265);
      topHL.addColorStop(0,    `rgba(255,255,255,${0.55 + pulse * 0.15 + charge * 0.22})`);
      topHL.addColorStop(0.25, `rgba(220,200,255,${0.25 + pulse * 0.1})`);
      topHL.addColorStop(1,    "rgba(255,255,255,0)");
      ctx.fillStyle = topHL;
      ctx.fillRect(fx, fy, CW, CH);

      const rightHL = ctx.createLinearGradient(W * 0.65, 0, W, H);
      rightHL.addColorStop(0,   "rgba(255,255,255,0)");
      rightHL.addColorStop(0.7, `rgba(180,230,255,${0.18 + pulse * 0.07})`);
      rightHL.addColorStop(1,   `rgba(100,220,255,${0.25 + pulse * 0.1})`);
      ctx.fillStyle = rightHL;
      ctx.fillRect(fx, fy, CW, CH);

      /* ── Discharge interior white-out ── */
      if (discharge > 0.04) {
        ctx.fillStyle = `rgba(255,255,255,${discharge * 0.88})`;
        ctx.fillRect(fx, fy, CW, CH);
      }
      if (recovery > 0.1) {
        const rf = ctx.createLinearGradient(0, 0, W, H);
        rf.addColorStop(0, `rgba(255,255,255,${recovery * 0.3})`);
        rf.addColorStop(1, `rgba(100,200,255,${recovery * 0.18})`);
        ctx.fillStyle = rf;
        ctx.fillRect(fx, fy, CW, CH);
      }

      /* ── Spark particles along edge ── */
      const activeSparks = 6 + Math.floor(charge * 8);
      for (let s = 0; s < Math.min(activeSparks, SPARK_SEEDS.length); s++) {
        const seed = SPARK_SEEDS[s];
        const spd  = (0.00006 + s * 0.000015) * (1 + charge * 5.5);
        const prog = ((ts * spd + seed) % 1);
        const [px, py] = boltPointAt(prog);
        const sAlpha   = (0.5 + charge * 0.45) * Math.sin(prog * Math.PI);
        const sRad     = 8 + charge * 11;

        const sg = ctx.createRadialGradient(px, py, 0, px, py, sRad);
        sg.addColorStop(0, `rgba(200,240,255,${sAlpha})`);
        sg.addColorStop(1, "rgba(200,240,255,0)");
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(px, py, sRad, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.arc(px, py, 2 + charge * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${sAlpha * 1.2})`;
        ctx.fill();
      }

      /* ── Inner core centerlines ── */
      const cOp = 0.5 + pulse * 0.25 + charge * 0.45;
      ctx.lineCap = "round";

      // Upper blade
      ctx.beginPath(); ctx.moveTo(152, 8); ctx.lineTo(62, 258);
      ctx.strokeStyle = `rgba(255,255,255,${cOp})`;
      ctx.lineWidth = 2.5 + charge * 2.5; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(152, 8); ctx.lineTo(62, 258);
      ctx.strokeStyle = `rgba(180,220,255,${0.25 + pulse * 0.12 + charge * 0.38})`;
      ctx.lineWidth = 10 + charge * 20; ctx.stroke();

      // Lower blade
      ctx.beginPath(); ctx.moveTo(144, 270); ctx.lineTo(40, 510);
      ctx.strokeStyle = `rgba(255,255,255,${0.4 + pulse * 0.2 + charge * 0.4})`;
      ctx.lineWidth = 2 + charge * 2.5; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(144, 270); ctx.lineTo(40, 510);
      ctx.strokeStyle = `rgba(100,220,255,${0.2 + pulse * 0.1 + charge * 0.3})`;
      ctx.lineWidth = 8 + charge * 16; ctx.stroke();

      /* ── High-charge crackle flicker ── */
      if (charge > 0.62) {
        const cracklePow  = (charge - 0.62) / 0.38;
        const flickerWave = Math.sin(ts * 0.07 + charge * 15) * 0.5 + 0.5;
        if (flickerWave > 0.68) {
          ctx.fillStyle = `rgba(255,255,255,${cracklePow * 0.28 * flickerWave})`;
          ctx.fillRect(fx, fy, CW, CH);
        }
        // Additional vertical streak flicker
        const streakX = W * 0.5 + Math.sin(ts * 0.04) * 20;
        ctx.beginPath(); ctx.moveTo(streakX, 0); ctx.lineTo(streakX - 10, H);
        ctx.strokeStyle = `rgba(255,255,255,${cracklePow * 0.35 * flickerWave})`;
        ctx.lineWidth = 1.5 + cracklePow * 3; ctx.stroke();
      }

      ctx.restore(); // undo translate(OX, OY)
      ctx.restore(); // undo clip

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const boltD = "M 90,0 L 215,0 L 125,265 L 210,265 L 80,515 L 0,265 Z";

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: "255px", height: "520px" }}
    >
      {/* ── Atmospheric CSS glow layers ── */}
      <div className="absolute pointer-events-none" style={{
        inset: "-45%",
        background:
          "radial-gradient(ellipse 75% 75% at 48% 50%, rgba(124,58,237,0.38) 0%, rgba(79,70,229,0.22) 35%, rgba(6,182,212,0.1) 60%, transparent 80%)",
        filter: "blur(34px)",
      }} />
      <div className="absolute pointer-events-none" style={{
        inset: "-24%",
        background:
          "radial-gradient(ellipse 62% 62% at 48% 50%, rgba(100,60,220,0.25) 0%, transparent 70%)",
        filter: "blur(20px)",
      }} />

      {/* ── SVG structural layers (static 3-D look) ── */}
      <svg
        viewBox="0 0 255 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="hl-body" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%"   stopColor="#1E0840" />
            <stop offset="18%"  stopColor="#4C1D95" />
            <stop offset="40%"  stopColor="#7C3AED" />
            <stop offset="62%"  stopColor="#4F46E5" />
            <stop offset="82%"  stopColor="#0E7490" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </linearGradient>
          <linearGradient id="hl-face" x1="0.55" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#A78BFA" stopOpacity="0"    />
            <stop offset="50%"  stopColor="#C4B5FD" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="hl-tophl" x1="0.35" y1="0" x2="0.5" y2="0.55">
            <stop offset="0%"   stopColor="white"   stopOpacity="0.65" />
            <stop offset="40%"  stopColor="#DDD6FE" stopOpacity="0.3"  />
            <stop offset="100%" stopColor="white"   stopOpacity="0"    />
          </linearGradient>
          <linearGradient id="hl-edge" x1="0.35" y1="0" x2="0.65" y2="1">
            <stop offset="0%"   stopColor="#C4B5FD" />
            <stop offset="45%"  stopColor="#818CF8" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          <filter id="hl-glow" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hl-core" x="-20%" y="-5%" width="140%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* L0: Far atmospheric bloom */}
        <path d={boltD} fill="url(#hl-body)" filter="url(#hl-glow)" opacity="0.62"
          transform="translate(0,6) scale(1.05) translate(-6,-6)" />

        {/* L1: 3-D shadow offset — gives depth */}
        <path d={boltD} fill="#060015" opacity="0.88" transform="translate(12,16)" />

        {/* L2: Main body */}
        <path d={boltD} fill="url(#hl-body)" />

        {/* L3: Right-face lit surface */}
        <path d={boltD} fill="url(#hl-face)" />

        {/* L4: Top-left specular face */}
        <path d={boltD} fill="url(#hl-tophl)" />

        {/* L5: Thin edge glow outline */}
        <path d={boltD} fill="none" stroke="url(#hl-edge)" strokeWidth="1.8" opacity="0.88" />

        {/* L6: Thick blurred outer glow stroke */}
        <path d={boltD} fill="none" stroke="rgba(167,139,250,0.5)"
          strokeWidth="7" filter="url(#hl-glow)" />

        {/* L7: Left dark bevel (shadow face) */}
        <path d="M 90,0 L 0,265 M 0,265 L 80,515"
          stroke="rgba(10,4,32,0.75)" strokeWidth="4.5" strokeLinecap="round" />

        {/* L8: Right bright bevel (lit face) */}
        <path d="M 215,0 L 125,265 M 210,265 L 80,515"
          stroke="rgba(200,180,255,0.65)" strokeWidth="2.4" strokeLinecap="round"
          filter="url(#hl-core)" />

        {/* L9: Notch edge highlight */}
        <path d="M 125,265 L 210,265"
          stroke="rgba(180,215,255,0.6)" strokeWidth="2.8" strokeLinecap="round" />

        {/* L10: Inner core white streak */}
        <path d="M 155,8 L 65,255 M 150,272 L 44,508"
          stroke="rgba(255,255,255,0.62)" strokeWidth="3.5" strokeLinecap="round"
          filter="url(#hl-core)" />

        {/* L11: Secondary micro-streak */}
        <path d="M 149,11 L 69,252 M 149,275 L 47,505"
          stroke="rgba(200,225,255,0.32)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* ── Canvas energy overlay (larger than bolt for ring effects) ── */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          width:        `${CW}px`,
          height:       `${CH}px`,
          left:         `${-OX}px`,
          top:          `${-OY}px`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
