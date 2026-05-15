import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w: number, h: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      prevZ: 0,
    }));

    const animate = () => {
      ctx.fillStyle = "#07070F";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;

      stars.forEach((s) => {
        s.prevZ = s.z;
        s.z -= 3;
        if (s.z <= 0) {
          s.z = s.prevZ = 2000;
          s.x = (Math.random() - 0.5) * 2000;
          s.y = (Math.random() - 0.5) * 2000;
        }
        const x = cx + (s.x / s.z) * 1000;
        const y = cy + (s.y / s.z) * 1000;
        const px = cx + (s.x / s.prevZ) * 1000;
        const py = cy + (s.y / s.prevZ) * 1000;

        const opacity = Math.min(1, (2000 - s.z) / 1500);
        const t = opacity;
        const r = Math.round(180 * t + 100 * (1 - t));
        const g = Math.round(150 * t + 80 * (1 - t));
        const bv = Math.round(255 * t + 200 * (1 - t));
        ctx.strokeStyle = `rgba(${r},${g},${bv},${opacity})`;
        ctx.lineWidth = opacity > 0.7 ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}