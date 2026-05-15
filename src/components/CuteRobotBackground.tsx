/**
 * CuteRobotBackground — Full-viewport canvas mascot robot.
 *
 * Canvas fills the entire viewport (like BackgroundOrb).
 * Robot radius = 30 % of the smaller viewport dimension, so on
 * 1920 × 1080 the robot is ~648 px tall and the atmospheric glow
 * bleeds across the whole screen.
 *
 * All helper functions draw in LOCAL space (origin = robot centre,
 * scale 1 ≡ original design R = 168 px).  drawRobot() applies
 * ctx.translate(cx, cy) + ctx.scale(S, S) before calling them.
 * Blur / shadow values that live outside the transform are
 * multiplied by S so they stay proportional.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ─── Route accent colours ──────────────────────────────────── */
const ROUTE_COLOR: Record<string, [number, number, number]> = {
  "/":          [124, 58,  237],
  "/services":  [59,  130, 246],
  "/portfolio": [236, 72,  153],
  "/about":     [139, 92,  246],
  "/contact":   [6,   182, 212],
};

/* ─── Emotions ──────────────────────────────────────────────── */
type Emotion = "happy" | "curious" | "excited" | "sleepy" | "surprised" | "wink" | "love" | "think";
const ALL_EMOTIONS: Emotion[] = ["happy","curious","excited","sleepy","surprised","wink","love","think"];
const EMOTION_TINT: Partial<Record<Emotion,[number,number,number]>> = {
  love:    [255, 80,  160],
  excited: [255, 195, 40 ],
  sleepy:  [90,  150, 255],
};

/* ─── Maths helpers ─────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpC(
  a: [number,number,number], b: [number,number,number], t: number,
): [number,number,number] {
  return [lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t)];
}
function rgb(c: [number,number,number], a = 1) {
  return `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
}

/* ═══════════════════════════════════════════════════════════════
   LOCAL-SPACE DRAW HELPERS  (origin = robot centre, R_design = 168)
   ═══════════════════════════════════════════════════════════════ */

/** Set shadow for a draw call, scaled by S */
function withGlow(
  ctx: CanvasRenderingContext2D,
  S: number,
  blur: number,
  color: string,
  draw: () => void,
) {
  ctx.save();
  ctx.shadowBlur  = blur * S;
  ctx.shadowColor = color;
  draw();
  ctx.restore();
}

/* ─── Ear ──────────────────────────────────────────────────── */
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
  ctx.save();
  ctx.translate(tx, ty);

  ctx.beginPath();
  ctx.moveTo(outer[0][0], outer[0][1]);
  for (let i = 1; i < outer.length; i++) ctx.lineTo(outer[i][0], outer[i][1]);
  ctx.closePath();
  const eg = ctx.createLinearGradient(outer[0][0], outer[0][1], outer[1][0], outer[1][1]);
  eg.addColorStop(0,   "rgba(225,232,242,0.95)");
  eg.addColorStop(0.5, "rgba(175,185,200,0.92)");
  eg.addColorStop(1,   "rgba(100,112,130,0.88)");
  ctx.fillStyle   = eg;
  ctx.fill();
  ctx.strokeStyle = "rgba(28,30,44,0.72)";
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Inner glowing triangle
  ctx.beginPath();
  ctx.moveTo(inner[0][0], inner[0][1]);
  for (let i = 1; i < inner.length; i++) ctx.lineTo(inner[i][0], inner[i][1]);
  ctx.closePath();
  ctx.fillStyle   = rgb(color, 0.88);
  ctx.shadowBlur  = 18 * S;
  ctx.shadowColor = rgb(color, 0.95);
  ctx.fill();
  ctx.shadowBlur  = 0;
  ctx.strokeStyle = rgb(color, 0.55);
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  ctx.restore();
}

/* ─── Head + specular ───────────────────────────────────────── */
function drawHead(ctx: CanvasRenderingContext2D, R: number, color: [number,number,number], S: number) {
  const R0 = R; // local R (= 168 when S=1)

  // Shadow (drawn in canvas space BEFORE scale/translate — done in drawRobot)
  // Head body
  ctx.beginPath();
  ctx.arc(0, 0, R0, 0, Math.PI * 2);
  const hg = ctx.createRadialGradient(-55, -55, 18, 0, 0, R0);
  hg.addColorStop(0,    "rgba(230,236,244,0.97)");
  hg.addColorStop(0.25, "rgba(200,212,226,0.95)");
  hg.addColorStop(0.55, "rgba(158,172,192,0.92)");
  hg.addColorStop(0.82, "rgba(115,128,148,0.90)");
  hg.addColorStop(1,    "rgba(74,86,108,0.88)");
  ctx.fillStyle   = hg;
  ctx.fill();
  ctx.strokeStyle = "rgba(28,30,44,0.72)";
  ctx.lineWidth   = 3;
  ctx.stroke();

  // Specular highlight
  const spec = ctx.createRadialGradient(-55, -60, 0, -18, -28, R0 * 0.7);
  spec.addColorStop(0,   "rgba(255,255,255,0.28)");
  spec.addColorStop(0.4, "rgba(255,255,255,0.08)");
  spec.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.beginPath(); ctx.arc(0, 0, R0, 0, Math.PI * 2);
  ctx.fillStyle = spec; ctx.fill();

  // Subtle colour tint from current accent
  const tint = ctx.createRadialGradient(0, 0, R0 * 0.6, 0, 0, R0);
  tint.addColorStop(0, rgb(color, 0));
  tint.addColorStop(1, rgb(color, 0.06));
  ctx.beginPath(); ctx.arc(0, 0, R0, 0, Math.PI * 2);
  ctx.fillStyle = tint; ctx.fill();
}

/* ─── Mechanical panels ─────────────────────────────────────── */
function drawPanels(ctx: CanvasRenderingContext2D, R: number) {
  const panels = [
    { x: -R + 12, y: 20, w: 28, h: 55, r: 6 },  // left
    { x:  R - 40, y: 20, w: 28, h: 55, r: 6 },  // right
  ];
  panels.forEach(({ x, y, w, h, r }) => {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle   = "rgba(48,54,72,0.78)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 1; ctx.stroke();
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + 5, y + (h / 3) * i);
      ctx.lineTo(x + w - 5, y + (h / 3) * i);
      ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 1; ctx.stroke();
    }
  });

  // Label plate
  ctx.beginPath(); ctx.roundRect(-32, R - 45, 64, 22, 4);
  ctx.fillStyle = "rgba(38,44,60,0.82)"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.09)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = "rgba(200,212,228,0.42)";
  ctx.font = `bold ${9}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("CRAFT·AI", 0, R - 34);
}

/* ─── Grille ─────────────────────────────────────────────────── */
function drawGrille(
  ctx: CanvasRenderingContext2D,
  R: number,
  color: [number,number,number],
  ts: number,
  S: number,
) {
  [-20, 0, 20].forEach((ox, i) => {
    const p = Math.sin(ts * 0.002 + i * 1.2) * 0.5 + 0.5;
    const y = R - 20;
    ctx.beginPath(); ctx.arc(ox, y, 7, 0, Math.PI * 2);
    ctx.fillStyle   = rgb(color, 0.12 + p * 0.1); ctx.fill();
    ctx.strokeStyle = rgb(color, 0.55 + p * 0.3); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, y, 3, 0, Math.PI * 2);
    ctx.fillStyle   = rgb(color, 0.72 + p * 0.28);
    ctx.shadowBlur  = 8 * S; ctx.shadowColor = rgb(color, 0.9);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

/* ─── Visor ─────────────────────────────────────────────────── */
function drawVisor(ctx: CanvasRenderingContext2D, ts: number) {
  const vx = 0, vy = -10, vrx = 128, vry = 112;
  ctx.save();
  ctx.beginPath(); ctx.ellipse(vx, vy, vrx, vry, 0, 0, Math.PI * 2);
  const vg = ctx.createRadialGradient(vx - 30, vy - 30, 10, vx, vy, vrx);
  vg.addColorStop(0,   "rgba(50,60,50,0.82)");
  vg.addColorStop(0.5, "rgba(22,28,22,0.90)");
  vg.addColorStop(1,   "rgba(8,10,8,0.95)");
  ctx.fillStyle = vg; ctx.fill();
  ctx.strokeStyle = "rgba(55,62,78,0.80)"; ctx.lineWidth = 3; ctx.stroke();

  // Clip for reflections
  ctx.beginPath(); ctx.ellipse(vx, vy, vrx, vry, 0, 0, Math.PI * 2); ctx.clip();

  const shimmer = Math.sin(ts * 0.0004) * 0.5 + 0.5;
  const rg = ctx.createLinearGradient(vx - vrx, vy - vry * 0.7, vx - vrx * 0.3, vy - vry * 0.1);
  rg.addColorStop(0,    "rgba(255,255,255,0)");
  rg.addColorStop(0.4,  `rgba(255,255,255,${0.07 + shimmer * 0.1})`);
  rg.addColorStop(0.65, `rgba(200,230,255,${0.04 + shimmer * 0.05})`);
  rg.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = rg; ctx.fillRect(vx - vrx, vy - vry, vrx * 2, vry * 2);

  ctx.restore();
}

/* ─── Visor glow ring ───────────────────────────────────────── */
function drawVisorRing(
  ctx: CanvasRenderingContext2D,
  color: [number,number,number],
  S: number,
) {
  ctx.beginPath(); ctx.ellipse(0, -10, 128, 112, 0, 0, Math.PI * 2);
  ctx.strokeStyle = rgb(color, 0.22);
  ctx.lineWidth   = 6;
  ctx.shadowBlur  = 18 * S;
  ctx.shadowColor = rgb(color, 0.55);
  ctx.stroke();
  ctx.shadowBlur  = 0;
}

/* ─── Accent glow dots ──────────────────────────────────────── */
function drawAccents(
  ctx: CanvasRenderingContext2D,
  color: [number,number,number],
  ts: number,
  S: number,
) {
  const dots = [[-136,-30],[-136,30],[136,-30],[136,30]] as [number,number][];
  dots.forEach(([x, y], i) => {
    const p = Math.sin(ts * 0.0018 + i * 1.1) * 0.5 + 0.5;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle   = rgb(color, 0.72 + p * 0.28);
    ctx.shadowBlur  = 14 * S;
    ctx.shadowColor = rgb(color, 0.85);
    ctx.fill(); ctx.shadowBlur = 0;
  });
}

/* ═══════════════════════════════════════════════════════════════
   EYE / EMOTION DRAW FUNCTIONS  (local space)
   ═══════════════════════════════════════════════════════════════ */

function clipVisor(ctx: CanvasRenderingContext2D) {
  ctx.beginPath(); ctx.ellipse(0, -10, 128, 112, 0, 0, Math.PI * 2); ctx.clip();
}

function drawHappy(ctx: CanvasRenderingContext2D, c: [number,number,number], S: number) {
  const arc = (x: number, y: number) => {
    ctx.beginPath(); ctx.arc(x, y + 10, 14, Math.PI * 1.1, Math.PI * 1.92);
    ctx.strokeStyle = rgb(c); ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.stroke();
  };
  withGlow(ctx, S, 20, rgb(c, 0.9), () => { arc(-40,-15); arc(40,-15); });
  arc(-40,-15); arc(40,-15);
}

function drawCurious(ctx: CanvasRenderingContext2D, c: [number,number,number], S: number) {
  withGlow(ctx, S, 20, rgb(c, 0.9), () => {
    ctx.beginPath(); ctx.arc(-40,-15, 10, 0, Math.PI*2);
    ctx.fillStyle = rgb(c, 0.9); ctx.fill();
    ctx.beginPath(); ctx.arc(40,-7, 12, Math.PI*1.15, Math.PI*1.85);
    ctx.strokeStyle = rgb(c); ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.stroke();
    ctx.beginPath(); ctx.arc(62,-33, 3, 0, Math.PI*2);
    ctx.fillStyle = rgb(c, 0.65); ctx.fill();
  });
  ctx.beginPath(); ctx.arc(-40,-15, 10, 0, Math.PI*2);
  ctx.fillStyle = rgb(c, 0.9); ctx.fill();
  ctx.beginPath(); ctx.arc(40,-7, 12, Math.PI*1.15, Math.PI*1.85);
  ctx.strokeStyle = rgb(c); ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.stroke();
}

function drawExcited(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const star = (x: number, y: number) => {
    const spin = ts * 0.001;
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
  withGlow(ctx, S, 22, rgb(c, 0.9), () => { star(-40,-15); star(40,-15); });
  star(-40,-15); star(40,-15);
}

function drawSleepy(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const droop = Math.sin(ts * 0.0005) * 2 + 12;
  const halfEye = (x: number, y: number) => {
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI*2); ctx.clip();
    ctx.fillStyle = rgb(c, 0.2); ctx.fillRect(x-16, y-16, 32, 32);
    ctx.fillStyle = rgb(c, 0.9); ctx.fillRect(x-13, y-2, 26, droop);
    ctx.restore();
    ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI*2);
    ctx.strokeStyle = rgb(c, 0.45); ctx.lineWidth = 2; ctx.stroke();
  };
  withGlow(ctx, S, 18, rgb(c, 0.8), () => { halfEye(-40,-15); halfEye(40,-15); });
  halfEye(-40,-15); halfEye(40,-15);
  ctx.fillStyle = rgb(c, 0.38);
  ctx.font = `bold 13px sans-serif`;
  ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  ctx.fillText("z", 56, -30);
  ctx.font = `bold 10px sans-serif`;
  ctx.fillText("z", 66, -44);
}

function drawSurprised(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const w = Math.sin(ts * 0.005) * 2;
  const bigEye = (x: number, y: number) => {
    ctx.beginPath(); ctx.arc(x, y+w, 18, 0, Math.PI*2);
    ctx.strokeStyle = rgb(c, 0.9); ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y+w, 7, 0, Math.PI*2);
    ctx.fillStyle = rgb(c); ctx.fill();
    ctx.beginPath(); ctx.arc(x+3, y+w-3, 2.5, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
  };
  withGlow(ctx, S, 22, rgb(c, 0.9), () => { bigEye(-40,-15); bigEye(40,-15); });
  bigEye(-40,-15); bigEye(40,-15);
}

function drawWink(ctx: CanvasRenderingContext2D, c: [number,number,number], S: number) {
  withGlow(ctx, S, 20, rgb(c, 0.9), () => {
    ctx.beginPath(); ctx.arc(-40,-15, 11, 0, Math.PI*2);
    ctx.fillStyle = rgb(c, 0.9); ctx.fill();
    ctx.beginPath(); ctx.moveTo(26,-15); ctx.lineTo(54,-15);
    ctx.strokeStyle = rgb(c); ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(29,-17); ctx.quadraticCurveTo(40,-27, 51,-17);
    ctx.strokeStyle = rgb(c, 0.45); ctx.lineWidth = 2; ctx.stroke();
  });
  ctx.beginPath(); ctx.arc(-40,-15, 11, 0, Math.PI*2);
  ctx.fillStyle = rgb(c, 0.9); ctx.fill();
  ctx.beginPath(); ctx.moveTo(26,-15); ctx.lineTo(54,-15);
  ctx.strokeStyle = rgb(c); ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.stroke();
}

function drawLove(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const beat = 1 + Math.sin(ts * 0.004) * 0.06;
  const heart = (x: number, y: number) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(beat, beat);
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.bezierCurveTo(-16,-8,  -22,10, 0, 22);
    ctx.bezierCurveTo( 22,10,   16,-8, 0,  5);
    ctx.fillStyle = rgb(c, 0.95); ctx.fill();
    ctx.restore();
  };
  withGlow(ctx, S, 22, rgb(c, 0.9), () => { heart(-40,-25); heart(40,-25); });
  heart(-40,-25); heart(40,-25);
}

function drawThink(ctx: CanvasRenderingContext2D, c: [number,number,number], ts: number, S: number) {
  const thinkEye = (x: number, y: number) => {
    ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI*2);
    ctx.strokeStyle = rgb(c, 0.38); ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(x+4, y-4, 6, 0, Math.PI*2);
    ctx.fillStyle = rgb(c, 0.9); ctx.fill();
  };
  withGlow(ctx, S, 18, rgb(c, 0.8), () => { thinkEye(-40,-15); thinkEye(40,-15); });
  thinkEye(-40,-15); thinkEye(40,-15);
  [0,1,2].forEach(i => {
    const a = (Math.sin(ts * 0.003) * 0.5 + 0.5) * 0.8;
    ctx.beginPath(); ctx.arc(56 + i*12, -40 - i*5, 3+i*0.5, 0, Math.PI*2);
    ctx.fillStyle = rgb(c, a * (0.4 + ((ts*0.001+i*0.4)%1) * 0.6)); ctx.fill();
  });
}

function drawEmotion(
  ctx: CanvasRenderingContext2D,
  emotion: Emotion,
  c: [number,number,number],
  ts: number,
  blinkT: number,
  S: number,
) {
  ctx.save();
  clipVisor(ctx);

  if (blinkT > 0.05) {
    const bh = blinkT * 28;
    ctx.fillStyle = rgb(c, 0.85 * blinkT);
    ctx.fillRect(-60, -31, 40, bh);
    ctx.fillRect( 20, -31, 40, bh);
  } else {
    switch (emotion) {
      case "happy":     drawHappy(ctx, c, S);              break;
      case "curious":   drawCurious(ctx, c, S);            break;
      case "excited":   drawExcited(ctx, c, ts, S);        break;
      case "sleepy":    drawSleepy(ctx, c, ts, S);         break;
      case "surprised": drawSurprised(ctx, c, ts, S);      break;
      case "wink":      drawWink(ctx, c, S);               break;
      case "love":      drawLove(ctx, c, ts, S);           break;
      case "think":     drawThink(ctx, c, ts, S);          break;
    }
  }
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════════════
   MAIN DRAW — sets transform, calls all helpers
   ═══════════════════════════════════════════════════════════════ */
function drawRobot(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  ts: number,
  color: [number,number,number],
  emotion: Emotion,
  blinkT: number,
  floatY: number,
  lTwitch: number,
  rTwitch: number,
) {
  const cx  = W / 2;
  const cy  = H / 2 + floatY;
  const R   = Math.min(W, H) * 0.30;   // 30 % of shorter side
  const S   = R / 168;                  // scale relative to original design

  /* ── Full-screen atmospheric glow (unscaled, canvas coords) ── */
  const halo = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, Math.max(W, H) * 0.8);
  halo.addColorStop(0,    rgb(color, 0));
  halo.addColorStop(0.18, rgb(color, 0.09));
  halo.addColorStop(0.45, rgb(color, 0.05));
  halo.addColorStop(0.75, rgb(color, 0.02));
  halo.addColorStop(1,    rgb(color, 0));
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, H);

  /* Mid glow */
  const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
  mid.addColorStop(0,   rgb(color, 0));
  mid.addColorStop(0.5, rgb(color, 0.07));
  mid.addColorStop(1,   rgb(color, 0));
  ctx.fillStyle = mid; ctx.fillRect(0, 0, W, H);

  /* ── Head drop shadow (canvas coords, blurred) ── */
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx + 9*S, cy + 14*S, R, R * 0.96, 0, 0, Math.PI * 2);
  ctx.fillStyle   = "rgba(0,0,10,0.5)";
  ctx.filter      = `blur(${18 * S}px)`;
  ctx.fill();
  ctx.filter = "none";
  ctx.restore();

  /* ── Everything in local space (translate + scale) ── */
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(S, S);

  // Ears (behind head)
  drawEar(ctx,
    [[-120,-143],[-85,-240],[-40,-163]],
    [[-112,-156],[-90,-218],[-55,-166]],
    color, lTwitch, true, S,
  );
  drawEar(ctx,
    [[40,-163],[85,-240],[120,-143]],
    [[55,-166],[90,-218],[112,-156]],
    color, rTwitch, false, S,
  );

  drawHead(ctx, 168, color, S);
  drawPanels(ctx, 168);
  drawVisor(ctx, ts);
  drawEmotion(ctx, emotion, color, ts, blinkT, S);
  drawGrille(ctx, 168, color, ts, S);
  drawAccents(ctx, color, ts, S);
  drawVisorRing(ctx, color, S);

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function CuteRobotBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const animRef      = useRef(0);
  const location     = useLocation();

  const colorRef     = useRef<[number,number,number]>([124, 58, 237]);
  const targetColor  = useRef<[number,number,number]>([124, 58, 237]);
  const emotionRef   = useRef<Emotion>("happy");
  const emotionTimer = useRef(0);
  const emotionDur   = useRef(4500);
  const blinkTimer   = useRef(0);
  const blinkDur     = useRef(5000);
  const blinkPhase   = useRef(0);
  const lTwitch      = useRef(0);
  const rTwitch      = useRef(0);
  const twitchTimer  = useRef(0);
  const twitchDur    = useRef(6000);

  useEffect(() => {
    targetColor.current = ROUTE_COLOR[location.pathname] ?? ROUTE_COLOR["/"];
  }, [location.pathname]);

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

    const loop = (ts: number) => {
      const dt = ts - lastTs;
      lastTs = ts;

      /* Smooth colour lerp */
      const tint = EMOTION_TINT[emotionRef.current];
      colorRef.current = lerpC(colorRef.current, tint ?? targetColor.current, Math.min(dt * 0.0025, 1));

      /* Emotion cycling */
      emotionTimer.current += dt;
      if (emotionTimer.current > emotionDur.current) {
        emotionTimer.current = 0;
        emotionDur.current   = 3000 + Math.random() * 4000;
        const others = ALL_EMOTIONS.filter(e => e !== emotionRef.current);
        emotionRef.current   = others[Math.floor(Math.random() * others.length)];
      }

      /* Blink */
      blinkTimer.current += dt;
      if (blinkTimer.current > blinkDur.current) {
        blinkTimer.current = 0;
        blinkDur.current   = 3000 + Math.random() * 5000;
        blinkPhase.current = 1;
      }
      if (blinkPhase.current > 0) blinkPhase.current = Math.max(0, blinkPhase.current - dt * 0.008);
      const blinkAnim = Math.sin(blinkPhase.current * Math.PI);

      /* Ear twitch */
      twitchTimer.current += dt;
      if (twitchTimer.current > twitchDur.current) {
        twitchTimer.current = 0;
        twitchDur.current   = 4000 + Math.random() * 5000;
        if (Math.random() > 0.5) lTwitch.current = 1; else rTwitch.current = 1;
      }
      lTwitch.current = Math.max(0, lTwitch.current - dt * 0.005);
      rTwitch.current = Math.max(0, rTwitch.current - dt * 0.005);

      const floatY = Math.sin(ts * 0.0007) * 14;

      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.clearRect(0, 0, W, H);

      drawRobot(
        ctx, W, H, ts,
        colorRef.current,
        emotionRef.current,
        blinkAnim,
        floatY,
        lTwitch.current,
        rTwitch.current,
      );

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
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
        style={{ mixBlendMode: "screen", opacity: 0.9 }}
      />
    </div>
  );
}
