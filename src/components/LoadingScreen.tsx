/**
 * LoadingScreen — Full-viewport loading overlay.
 *
 * Uses the same canvas robot drawing as CuteRobotBackground.
 * Robot color cycles through a rainbow arc (one full animation cycle)
 * synchronized with loading progress 0→1.
 * Once progress hits 1, a final pulse plays then the screen fades out.
 */
import { useEffect, useRef, useState } from "react";

/* ─── Maths helpers ─────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpC(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  return [lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t)];
}
function rgb(c: [number,number,number], a = 1) {
  return `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
}
function hslToRgb(h: number, s: number, l: number): [number,number,number] {
  h = h % 360;
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l-1)) * s;
  const x = c * (1 - Math.abs((h/60)%2 - 1));
  const m = l - c/2;
  let r=0,g=0,b=0;
  if      (h<60)  { r=c;g=x;b=0; }
  else if (h<120) { r=x;g=c;b=0; }
  else if (h<180) { r=0;g=c;b=x; }
  else if (h<240) { r=0;g=x;b=c; }
  else if (h<300) { r=x;g=0;b=c; }
  else            { r=c;g=0;b=x; }
  return [Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)];
}

function withGlow(ctx: CanvasRenderingContext2D, S: number, blur: number, color: string, draw: () => void) {
  ctx.save();
  ctx.shadowBlur  = blur * S;
  ctx.shadowColor = color;
  draw();
  ctx.restore();
}

function drawEar(
  ctx: CanvasRenderingContext2D,
  outer: [number,number][],
  inner: [number,number][],
  color: [number,number,number],
  twitch: number,
  isLeft: boolean,
  S: number,
) {
  const tx = (isLeft ? -1 : 1) * twitch * 6;
  const ty = -twitch * 8;
  ctx.save(); ctx.translate(tx, ty);
  ctx.beginPath();
  ctx.moveTo(outer[0][0], outer[0][1]);
  for (let i = 1; i < outer.length; i++) ctx.lineTo(outer[i][0], outer[i][1]);
  ctx.closePath();
  const eg = ctx.createLinearGradient(outer[0][0], outer[0][1], outer[1][0], outer[1][1]);
  eg.addColorStop(0,   "rgba(225,232,242,0.95)");
  eg.addColorStop(0.5, "rgba(175,185,200,0.92)");
  eg.addColorStop(1,   "rgba(100,112,130,0.88)");
  ctx.fillStyle = eg; ctx.fill();
  ctx.strokeStyle = "rgba(28,30,44,0.72)"; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(inner[0][0], inner[0][1]);
  for (let i = 1; i < inner.length; i++) ctx.lineTo(inner[i][0], inner[i][1]);
  ctx.closePath();
  ctx.fillStyle   = rgb(color, 0.88);
  ctx.shadowBlur  = 18 * S; ctx.shadowColor = rgb(color, 0.95);
  ctx.fill(); ctx.shadowBlur = 0;
  ctx.strokeStyle = rgb(color, 0.55); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore();
}

function drawHead(ctx: CanvasRenderingContext2D, R: number, color: [number,number,number], S: number) {
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2);
  const hg = ctx.createRadialGradient(-55, -55, 18, 0, 0, R);
  hg.addColorStop(0,    "rgba(230,236,244,0.97)");
  hg.addColorStop(0.25, "rgba(200,212,226,0.95)");
  hg.addColorStop(0.55, "rgba(158,172,192,0.92)");
  hg.addColorStop(0.82, "rgba(115,128,148,0.90)");
  hg.addColorStop(1,    "rgba(74,86,108,0.88)");
  ctx.fillStyle = hg; ctx.fill();
  ctx.strokeStyle = "rgba(28,30,44,0.72)"; ctx.lineWidth = 3; ctx.stroke();
  const spec = ctx.createRadialGradient(-55, -60, 0, -18, -28, R * 0.7);
  spec.addColorStop(0,   "rgba(255,255,255,0.28)");
  spec.addColorStop(0.4, "rgba(255,255,255,0.08)");
  spec.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = spec; ctx.fill();
  const tint = ctx.createRadialGradient(0, 0, R * 0.6, 0, 0, R);
  tint.addColorStop(0, rgb(color, 0)); tint.addColorStop(1, rgb(color, 0.12));
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = tint; ctx.fill();
}

function drawPanels(ctx: CanvasRenderingContext2D, R: number) {
  [{ x: -R+12, y: 20, w: 28, h: 55, r: 6 }, { x: R-40, y: 20, w: 28, h: 55, r: 6 }].forEach(({ x, y, w, h, r }) => {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle = "rgba(48,54,72,0.78)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.beginPath(); ctx.roundRect(-32, R-45, 64, 22, 4);
  ctx.fillStyle = "rgba(38,44,60,0.82)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.09)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = "rgba(200,212,228,0.42)";
  ctx.font = `bold 9px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("CRAFT·AI", 0, R - 34);
}

function drawGrille(ctx: CanvasRenderingContext2D, R: number, color: [number,number,number], ts: number, S: number) {
  [-20, 0, 20].forEach((ox, i) => {
    const p = Math.sin(ts * 0.002 + i * 1.2) * 0.5 + 0.5;
    const y = R - 20;
    ctx.beginPath(); ctx.arc(ox, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = rgb(color, 0.12 + p * 0.1); ctx.fill();
    ctx.strokeStyle = rgb(color, 0.55 + p * 0.3); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = rgb(color, 0.72 + p * 0.28);
    ctx.shadowBlur = 8 * S; ctx.shadowColor = rgb(color, 0.9);
    ctx.fill(); ctx.shadowBlur = 0;
  });
}

function drawVisor(ctx: CanvasRenderingContext2D, ts: number) {
  const vx = 0, vy = -10, vrx = 128, vry = 112;
  ctx.save();
  ctx.beginPath(); ctx.ellipse(vx, vy, vrx, vry, 0, 0, Math.PI * 2);
  const vg = ctx.createRadialGradient(vx-30, vy-30, 10, vx, vy, vrx);
  vg.addColorStop(0,   "rgba(50,60,50,0.82)");
  vg.addColorStop(0.5, "rgba(22,28,22,0.90)");
  vg.addColorStop(1,   "rgba(8,10,8,0.95)");
  ctx.fillStyle = vg; ctx.fill();
  ctx.strokeStyle = "rgba(55,62,78,0.80)"; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(vx, vy, vrx, vry, 0, 0, Math.PI * 2); ctx.clip();
  const shimmer = Math.sin(ts * 0.0004) * 0.5 + 0.5;
  const rg = ctx.createLinearGradient(vx-vrx, vy-vry*0.7, vx-vrx*0.3, vy-vry*0.1);
  rg.addColorStop(0,    "rgba(255,255,255,0)");
  rg.addColorStop(0.4,  `rgba(255,255,255,${0.07 + shimmer * 0.1})`);
  rg.addColorStop(0.65, `rgba(200,230,255,${0.04 + shimmer * 0.05})`);
  rg.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = rg; ctx.fillRect(vx-vrx, vy-vry, vrx*2, vry*2);
  ctx.restore();
}

function drawVisorRing(ctx: CanvasRenderingContext2D, color: [number,number,number], S: number) {
  ctx.beginPath(); ctx.ellipse(0, -10, 128, 112, 0, 0, Math.PI * 2);
  ctx.strokeStyle = rgb(color, 0.35); ctx.lineWidth = 6;
  ctx.shadowBlur = 24 * S; ctx.shadowColor = rgb(color, 0.7);
  ctx.stroke(); ctx.shadowBlur = 0;
}

function drawAccents(ctx: CanvasRenderingContext2D, color: [number,number,number], ts: number, S: number) {
  const dots = [[-136,-30],[-136,30],[136,-30],[136,30]] as [number,number][];
  dots.forEach(([x, y], i) => {
    const p = Math.sin(ts * 0.0018 + i * 1.1) * 0.5 + 0.5;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = rgb(color, 0.72 + p * 0.28);
    ctx.shadowBlur = 14 * S; ctx.shadowColor = rgb(color, 0.85);
    ctx.fill(); ctx.shadowBlur = 0;
  });
}

// Excited eyes (high-energy loading state)
function drawExcitedEyes(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const spin = ts * 0.001;
  const star = (x: number, y: number) => {
    for (let i = 0; i < 4; i++) {
      const a = spin + (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a)*14, y + Math.sin(a)*14);
      ctx.lineTo(x + Math.cos(a + Math.PI/4)*6, y + Math.sin(a + Math.PI/4)*6);
      ctx.closePath(); ctx.fillStyle = rgb(c, 0.9); ctx.fill();
    }
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
  };
  ctx.save();
  ctx.beginPath(); ctx.ellipse(0, -10, 128, 112, 0, 0, Math.PI * 2); ctx.clip();
  withGlow(ctx, S, 22, rgb(c, 0.9), () => { star(-40,-15); star(40,-15); });
  star(-40,-15); star(40,-15);
  ctx.restore();
}

// Love eyes (complete state)
function drawLoveEyes(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const beat = 1 + Math.sin(ts * 0.004) * 0.06;
  const heart = (x: number, y: number) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(beat, beat);
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.bezierCurveTo(-16,-8, -22,10, 0, 22);
    ctx.bezierCurveTo( 22,10,  16,-8, 0,  5);
    ctx.fillStyle = rgb(c, 0.95); ctx.fill();
    ctx.restore();
  };
  ctx.save();
  ctx.beginPath(); ctx.ellipse(0, -10, 128, 112, 0, 0, Math.PI * 2); ctx.clip();
  withGlow(ctx, S, 22, rgb(c, 0.9), () => { heart(-40,-25); heart(40,-25); });
  heart(-40,-25); heart(40,-25);
  ctx.restore();
}

function drawRobot(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  ts: number,
  color: [number,number,number],
  floatY: number,
  done: boolean,
) {
  const cx = W / 2;
  const cy = H / 2 + floatY;
  const R  = Math.min(W, H) * 0.30;
  const S  = R / 168;

  // Atmospheric glow
  const halo = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, Math.max(W, H) * 0.8);
  halo.addColorStop(0,    rgb(color, 0));
  halo.addColorStop(0.18, rgb(color, 0.14));
  halo.addColorStop(0.45, rgb(color, 0.07));
  halo.addColorStop(0.75, rgb(color, 0.03));
  halo.addColorStop(1,    rgb(color, 0));
  ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);

  const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
  mid.addColorStop(0,   rgb(color, 0));
  mid.addColorStop(0.5, rgb(color, 0.10));
  mid.addColorStop(1,   rgb(color, 0));
  ctx.fillStyle = mid; ctx.fillRect(0, 0, W, H);

  // Drop shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx + 9*S, cy + 14*S, R, R * 0.96, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,10,0.5)";
  ctx.filter = `blur(${18 * S}px)`; ctx.fill(); ctx.filter = "none";
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(S, S);

  drawEar(ctx, [[-120,-143],[-85,-240],[-40,-163]], [[-112,-156],[-90,-218],[-55,-166]], color, 0, true, S);
  drawEar(ctx, [[40,-163],[85,-240],[120,-143]],    [[55,-166],[90,-218],[112,-156]],   color, 0, false, S);
  drawHead(ctx, 168, color, S);
  drawPanels(ctx, 168);
  drawVisor(ctx, ts);
  if (done) {
    drawLoveEyes(ctx, color, ts, S);
  } else {
    drawExcitedEyes(ctx, color, ts, S);
  }
  drawGrille(ctx, 168, color, ts, S);
  drawAccents(ctx, color, ts, S);
  drawVisorRing(ctx, color, S);

  ctx.restore();
}

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const animRef     = useRef(0);
  const progressRef = useRef(0);        // 0 → 1 simulated load progress
  const colorRef    = useRef<[number,number,number]>(hslToRgb(270, 85, 60)); // start purple
  const fadeRef     = useRef(1);        // overlay opacity
  const doneRef     = useRef(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTs = 0;
    let phaseDone = false;  // has progress hit 1?
    let holdTimer = 0;      // how long we've held at 100%

    const loop = (ts: number) => {
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;

      // ── Progress: simulate real load, accelerate at end
      if (!phaseDone) {
        // Ease curve: fast at start, slow in middle, snap at end
        const speed = progressRef.current < 0.7
          ? 0.00045        // fast early
          : progressRef.current < 0.92
          ? 0.00018        // slow mid
          : 0.0009;        // snap to finish
        progressRef.current = Math.min(1, progressRef.current + dt * speed);
        if (progressRef.current >= 1) { phaseDone = true; doneRef.current = true; }
      }

      // ── Color: hue cycles from 270° (purple) → 630° (back to purple) = one full rainbow
      const hue = 270 + progressRef.current * 360;
      const targetColor = hslToRgb(hue, 90, 62);
      colorRef.current = lerpC(colorRef.current, targetColor, Math.min(dt * 0.008, 1));

      // ── After hitting 100%: hold 600ms then fade out
      if (phaseDone) {
        holdTimer += dt;
        if (holdTimer > 600) {
          fadeRef.current = Math.max(0, fadeRef.current - dt * 0.003);
          if (fadeRef.current <= 0) {
            setVisible(false);
            onDone();
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            return;
          }
        }
      }

      const W = window.innerWidth;
      const H = window.innerHeight;
      const floatY = Math.sin(ts * 0.0007) * 14;

      ctx.clearRect(0, 0, W, H);
      drawRobot(ctx, W, H, ts, colorRef.current, floatY, phaseDone);

      // ── Progress bar
      const barW = W * 0.35;
      const barH = 4;
      const barX = (W - barW) / 2;
      const barY = H / 2 + Math.min(W, H) * 0.38;

      ctx.save();
      // Track
      ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 2);
      ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
      // Fill
      const fillW = barW * progressRef.current;
      if (fillW > 0) {
        ctx.beginPath(); ctx.roundRect(barX, barY, fillW, barH, 2);
        const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        grad.addColorStop(0,   rgb(colorRef.current, 0.6));
        grad.addColorStop(0.5, rgb(colorRef.current, 1));
        grad.addColorStop(1,   rgb(colorRef.current, 0.8));
        ctx.fillStyle = grad;
        ctx.shadowBlur = 12; ctx.shadowColor = rgb(colorRef.current, 0.8);
        ctx.fill(); ctx.shadowBlur = 0;
      }
      // Percentage label
      ctx.fillStyle = rgb(colorRef.current, 0.9);
      ctx.font = `bold ${Math.round(Math.min(W,H)*0.018)}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(`${Math.round(progressRef.current * 100)}%`, W/2, barY + barH + 10);
      ctx.restore();

      // ── Fade overlay
      if (fadeRef.current < 1) {
        ctx.fillStyle = `rgba(10,8,20,${1 - fadeRef.current})`;
        ctx.fillRect(0, 0, W, H);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0a0814]"
      style={{ pointerEvents: "all" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
