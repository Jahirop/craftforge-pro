import { useEffect, useRef } from "react";

interface FluidOrbProps {
  size?: number;
  className?: string;
  scrollY?: number;
}

export default function FluidOrb({ size = 500, className = "", scrollY = 0 }: FluidOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const s = size;
    canvas.width = s * dpr;
    canvas.height = s * dpr;
    canvas.style.width = `${s}px`;
    canvas.style.height = `${s}px`;
    ctx.scale(dpr, dpr);

    const cx = s / 2;
    const cy = s / 2;

    // Color palette: purple, cyan, pink
    const colors = [
      { r: 124, g: 58,  b: 237 },  // purple
      { r: 6,   g: 182, b: 212 },  // cyan
      { r: 236, g: 72,  b: 153 },  // pink
      { r: 79,  g: 70,  b: 229 },  // indigo
    ];

    function lerpColor(a: {r:number,g:number,b:number}, b: {r:number,g:number,b:number}, t: number) {
      return {
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
      };
    }

    function getOrbColor(t: number) {
      const total = colors.length;
      const idx = (t * total) % total;
      const i = Math.floor(idx);
      const frac = idx - i;
      return lerpColor(colors[i % total], colors[(i + 1) % total], frac);
    }

    function drawOrb(time: number, scrollOffset: number) {
      ctx.clearRect(0, 0, s, s);

      const t = time * 0.0004;
      const scrollFactor = scrollOffset * 0.0002;

      // Morph radius using multiple sine waves
      const baseRadius = s * 0.32;
      const numPoints = 120;
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;

        // Multiple overlapping waves for organic feel
        const r1 = Math.sin(angle * 2 + t * 1.1 + scrollFactor) * 0.06;
        const r2 = Math.sin(angle * 3 - t * 0.7 + scrollFactor * 0.5) * 0.04;
        const r3 = Math.sin(angle * 5 + t * 1.5) * 0.025;
        const r4 = Math.cos(angle * 4 - t * 0.9 + scrollFactor * 1.5) * 0.03;
        const r5 = Math.cos(angle * 7 + t * 2.1) * 0.015;
        const r6 = Math.sin(angle * 1.5 + t * 0.5 + scrollFactor * 0.8) * 0.05;

        const radius = baseRadius * (1 + r1 + r2 + r3 + r4 + r5 + r6);

        points.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        });
      }

      // === Layer 1: Outer glow halos ===
      const color1 = getOrbColor(t * 0.15);
      const color2 = getOrbColor(t * 0.15 + 0.33);
      const color3 = getOrbColor(t * 0.15 + 0.66);

      // Far glow
      const farGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.6);
      farGlow.addColorStop(0, `rgba(${color1.r},${color1.g},${color1.b},0)`);
      farGlow.addColorStop(0.5, `rgba(${color2.r},${color2.g},${color2.b},0.06)`);
      farGlow.addColorStop(1, `rgba(${color3.r},${color3.g},${color3.b},0)`);
      ctx.fillStyle = farGlow;
      ctx.fillRect(0, 0, s, s);

      // Mid glow
      const midGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.45);
      midGlow.addColorStop(0, `rgba(${color1.r},${color1.g},${color1.b},0)`);
      midGlow.addColorStop(0.6, `rgba(${color1.r},${color1.g},${color1.b},0.12)`);
      midGlow.addColorStop(1, `rgba(${color1.r},${color1.g},${color1.b},0)`);
      ctx.fillStyle = midGlow;
      ctx.fillRect(0, 0, s, s);

      // === Layer 2: The blob body ===
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints; i++) {
        const curr = points[i];
        const next = points[(i + 1) % numPoints];
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
      }
      ctx.closePath();

      // Rotating gradient fill
      const angle = t * 0.8;
      const gx1 = cx + Math.cos(angle) * baseRadius * 0.5;
      const gy1 = cy + Math.sin(angle) * baseRadius * 0.5;
      const gx2 = cx + Math.cos(angle + Math.PI) * baseRadius * 0.5;
      const gy2 = cy + Math.sin(angle + Math.PI) * baseRadius * 0.5;

      const bodyGrad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
      bodyGrad.addColorStop(0,   `rgba(${color1.r},${color1.g},${color1.b},0.75)`);
      bodyGrad.addColorStop(0.5, `rgba(${color2.r},${color2.g},${color2.b},0.65)`);
      bodyGrad.addColorStop(1,   `rgba(${color3.r},${color3.g},${color3.b},0.7)`);

      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // === Layer 3: Glass highlight ===
      ctx.save();
      ctx.clip(); // clip to blob shape (re-clip from above path)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints; i++) {
        const curr = points[i];
        const next = points[(i + 1) % numPoints];
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
      }
      ctx.closePath();
      ctx.clip();

      // Top-left highlight for glass effect
      const highlightGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.35,
        0,
        cx,
        cy,
        baseRadius
      );
      highlightGrad.addColorStop(0,   "rgba(255,255,255,0.35)");
      highlightGrad.addColorStop(0.3, "rgba(255,255,255,0.08)");
      highlightGrad.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = highlightGrad;
      ctx.fillRect(0, 0, s, s);

      // Inner reflection ring
      const reflectAngle = t * 0.3;
      const innerHighlight = ctx.createRadialGradient(
        cx + Math.cos(reflectAngle) * baseRadius * 0.2,
        cy + Math.sin(reflectAngle) * baseRadius * 0.2,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius * 0.8
      );
      innerHighlight.addColorStop(0,   "rgba(255,255,255,0)");
      innerHighlight.addColorStop(0.7, `rgba(${color2.r},${color2.g},${color2.b},0.15)`);
      innerHighlight.addColorStop(1,   "rgba(255,255,255,0.05)");
      ctx.fillStyle = innerHighlight;
      ctx.fillRect(0, 0, s, s);

      ctx.restore();

      // === Layer 4: Subtle inner swirling particles ===
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints; i++) {
        const curr = points[i];
        const next = points[(i + 1) % numPoints];
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
      }
      ctx.closePath();
      ctx.clip();

      for (let p = 0; p < 6; p++) {
        const pt = t * (0.5 + p * 0.13) + p * 1.1;
        const pr = baseRadius * (0.2 + 0.5 * Math.sin(p * 2.3));
        const px = cx + Math.cos(pt) * pr;
        const py = cy + Math.sin(pt * 1.3) * pr;
        const pColor = getOrbColor(t * 0.1 + p * 0.17);
        const pg = ctx.createRadialGradient(px, py, 0, px, py, baseRadius * 0.15);
        pg.addColorStop(0, `rgba(${pColor.r},${pColor.g},${pColor.b},0.5)`);
        pg.addColorStop(1, `rgba(${pColor.r},${pColor.g},${pColor.b},0)`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, baseRadius * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // === Layer 5: Edge glow ring ===
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints; i++) {
        const curr = points[i];
        const next = points[(i + 1) % numPoints];
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
      }
      ctx.closePath();

      const edgeColor = getOrbColor(t * 0.2 + 0.5);
      ctx.strokeStyle = `rgba(${edgeColor.r},${edgeColor.g},${edgeColor.b},0.6)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    let lastScroll = scrollY;
    const loop = (timestamp: number) => {
      timeRef.current = timestamp;
      drawOrb(timestamp, lastScroll);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    // Update scroll reactivity
    const handleScroll = () => { lastScroll = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [size]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Canvas orb */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Glass overlay */}
      <div
        className="absolute inset-[15%] rounded-full pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          backdropFilter: "blur(2px)",
        }}
      />
      {/* Outer atmospheric glow */}
      <div
        className="absolute -inset-[20%] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)",
          animation: "orb-breathe 6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
