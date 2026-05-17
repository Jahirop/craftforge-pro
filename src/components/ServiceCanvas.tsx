import { useRef, useEffect } from "react";

type Cleanup = () => void;
type AnimFn = (canvas: HTMLCanvasElement) => Cleanup;

// ─────────────────────────────────────────────────────────────────
// 1. AI Graphic Design — orbiting shapes + palette swatches
// ─────────────────────────────────────────────────────────────────
const anim1: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const pal = ["#8B5CF6","#A78BFA","#EC4899","#F472B6","#6366F1","#C084FC","#F9A8D4","#7C3AED"];
  const shapes = Array.from({ length: 14 }, (_, i) => ({
    angle: (i / 14) * Math.PI * 2,
    radius: 30 + Math.random() * 55,
    speed: (0.003 + Math.random() * 0.005) * (Math.random() < 0.5 ? 1 : -1),
    color: pal[i % pal.length],
    size: 4 + Math.random() * 10,
    type: i % 3,
    phase: Math.random() * Math.PI * 2,
  }));

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    t += 0.080;

    const g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 80);
    g.addColorStop(0, "rgba(139,92,246,0.18)"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w/2, h/2, 80, 0, Math.PI*2); ctx.fill();

    let sx = (w - pal.length * 32) / 2;
    pal.forEach((col, i) => {
      ctx.save(); ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 1.5 + i * 0.5);
      ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(sx, h - 36, 28, 18, 4); ctx.fill();
      ctx.restore(); sx += 32;
    });

    shapes.forEach(s => {
      s.angle += s.speed;
      const x = w/2 + Math.cos(s.angle + s.phase) * s.radius;
      const y = h/2 + Math.sin(s.angle + s.phase * 0.7) * s.radius * 0.55;
      const sz = s.size * (1 + 0.2 * Math.sin(t * 2 + s.phase));
      ctx.save(); ctx.globalAlpha = 0.72; ctx.fillStyle = s.color;
      ctx.translate(x, y); ctx.rotate(t * 0.4 + s.phase); ctx.beginPath();
      if (s.type === 0) { ctx.arc(0, 0, sz/2, 0, Math.PI*2); }
      else if (s.type === 1) { ctx.rect(-sz/2, -sz/2, sz, sz); }
      else { ctx.moveTo(0, -sz/2); ctx.lineTo(sz/2, sz/2); ctx.lineTo(-sz/2, sz/2); ctx.closePath(); }
      ctx.fill(); ctx.restore();
    });

    ctx.save(); ctx.globalAlpha = 0.5; ctx.strokeStyle = "#8B5CF6"; ctx.lineWidth = 2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(w/2, h/2-16); ctx.lineTo(w/2, h/2+16);
    ctx.moveTo(w/2-16, h/2); ctx.lineTo(w/2+16, h/2); ctx.stroke(); ctx.restore();
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 2. AI Video & Motion — film strip + waveform
// ─────────────────────────────────────────────────────────────────
const anim2: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0, filmOffset = 0;
  const COL = "#3B82F6";
  const scenes = [
    { bg:"#1e3a5f", fg:"#3B82F6" }, { bg:"#1a2e5c", fg:"#60A5FA" },
    { bg:"#162040", fg:"#93C5FD" }, { bg:"#0f172a", fg:"#1D4ED8" },
    { bg:"#1e3a6e", fg:"#2563EB" }, { bg:"#0c1a3a", fg:"#3B82F6" },
  ];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h); t += 0.080; filmOffset = (filmOffset + 2.5) % (w * 0.2);

    const stripH = 52, frameW = w * 0.18, frameH = 38, frameY = (stripH - frameH) / 2;
    ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, w, stripH);

    for (let x = -filmOffset; x < w; x += frameW * 0.35) {
      ctx.fillStyle = "#1e3a5f"; ctx.beginPath(); ctx.roundRect(x+4, 4, 10, 10, 2); ctx.fill();
      ctx.fillStyle = "#000"; ctx.beginPath(); ctx.roundRect(x+6, 6, 6, 6, 1); ctx.fill();
    }
    for (let i = -1; i < Math.ceil(w / frameW) + 1; i++) {
      const fx = i * frameW - (filmOffset % frameW);
      const si = ((i + Math.floor(filmOffset / frameW)) % scenes.length + scenes.length) % scenes.length;
      const sc = scenes[si];
      ctx.fillStyle = sc.bg; ctx.fillRect(fx+4, frameY, frameW-8, frameH);
      ctx.fillStyle = sc.fg; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(fx + frameW/2, frameY + frameH/2, frameH*0.3, 0, Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = "#334155"; ctx.lineWidth = 1;
      ctx.strokeRect(fx+4, frameY, frameW-8, frameH);
    }

    ctx.strokeStyle = "rgba(239,68,68,0.9)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w/2, 0); ctx.lineTo(w/2, stripH); ctx.stroke();
    ctx.fillStyle = "#EF4444"; ctx.beginPath();
    ctx.moveTo(w/2-6, 0); ctx.lineTo(w/2+6, 0); ctx.lineTo(w/2, 10); ctx.fill();

    const wY = stripH + 20, wH = h - stripH - 40, bars = 60, bW = (w - 40) / bars;
    for (let i = 0; i < bars; i++) {
      const x = 20 + i * bW;
      const amp = (0.3 + 0.7 * Math.abs(Math.sin(i * 0.4 + t * 2))) * wH * 0.5;
      const env = 1 - Math.abs(i - bars/2) / (bars/2) * 0.4;
      ctx.save(); ctx.globalAlpha = 0.7 * env;
      const gr = ctx.createLinearGradient(x, wY+wH/2-amp*env, x, wY+wH/2+amp*env);
      gr.addColorStop(0, "#60A5FA"); gr.addColorStop(0.5, COL); gr.addColorStop(1, "#1D4ED8");
      ctx.fillStyle = gr; ctx.fillRect(x, wY+wH/2-amp*env, bW*0.6, amp*env*2); ctx.restore();
    }

    const prog = (t * 0.04) % 1;
    ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.beginPath(); ctx.roundRect(20, h-14, w-40, 4, 2); ctx.fill();
    ctx.fillStyle = COL; ctx.beginPath(); ctx.roundRect(20, h-14, (w-40)*prog, 4, 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(20+(w-40)*prog, h-12, 5, 0, Math.PI*2); ctx.fill();
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 3. Vibe Code Websites — typing code + wireframe building
// ─────────────────────────────────────────────────────────────────
const anim3: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0, charPos = 0;
  const COL = "#06B6D4";
  const lines = [
    { text: '<div className="hero">', color: "#67E8F9" },
    { text: "  <h1>Land. Convert.",  color: "#fff" },
    { text: '  <Button ai="true">',  color: "#34D399" },
    { text: "    Get Started \u2192", color: "#F9A8D4" },
    { text: "  </Button>",            color: "#34D399" },
    { text: "</div>",                 color: "#67E8F9" },
    { text: 'const speed = "days"',  color: "#FCD34D" },
  ];
  const totalChars = lines.reduce((s, l) => s + l.text.length, 0);

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h); t += 0.080;
    const GAP = 40;
    charPos = (charPos + 3.5) % (totalChars + GAP);
    const cycleAlpha3 = charPos >= totalChars
      ? Math.max(0, 1 - (charPos - totalChars) / GAP)
      : Math.min(1, charPos / 5);
    ctx.save(); ctx.globalAlpha = cycleAlpha3;

    const codeW = w * 0.54, previewW = w - codeW - 8;
    ctx.fillStyle = "rgba(12,20,38,0.85)"; ctx.beginPath();
    ctx.roundRect(0, 0, codeW, h, [12, 0, 0, 12]); ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(0, 0, codeW, 28);
    ["#EF4444","#F59E0B","#10B981"].forEach((c, i) => {
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(14 + i*16, 14, 4, 0, Math.PI*2); ctx.fill();
    });
    ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.font = "10px monospace"; ctx.fillText("index.jsx", codeW/2-22, 18);

    ctx.font = '11px "Courier New",monospace';
    let cy = 28;
    lines.forEach((line, li) => {
      cy += 18;
      ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillText(li + 1, 8, cy);
      const startC = lines.slice(0, li).reduce((s, l) => s + l.text.length, 0);
      const show = Math.max(0, Math.min(line.text.length, charPos - startC));
      ctx.fillStyle = line.color; ctx.fillText(line.text.slice(0, show), 30, cy);
      if (charPos >= startC && charPos < startC + line.text.length && Math.sin(t*4) > 0) {
        const tw = ctx.measureText(line.text.slice(0, show)).width;
        ctx.fillStyle = COL; ctx.fillRect(30 + tw, cy - 12, 2, 14);
      }
    });

    ctx.fillStyle = "rgba(255,255,255,0.025)"; ctx.beginPath();
    ctx.roundRect(codeW+8, 0, previewW-8, h, [0, 12, 12, 0]); ctx.fill();

    const buildProg = Math.min(1, charPos / totalChars);
    const px2 = codeW + 12, pw = previewW - 16;
    ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(px2, 4, pw, 22);
    ctx.fillStyle = COL; ctx.beginPath(); ctx.arc(px2+10, 15, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "9px monospace"; ctx.fillText("craftai.studio", px2+22, 19);

    const sections = [
      { y:.12, h:.22, col:COL,      label:"Hero"     },
      { y:.38, h:.14, col:"#8B5CF6", label:"Features" },
      { y:.56, h:.14, col:"#06B6D4", label:"Pricing"  },
      { y:.74, h:.10, col:"#10B981", label:"CTA"      },
    ];
    sections.forEach(s => {
      if (buildProg > s.y - 0.1) {
        const a = Math.min(1, (buildProg - (s.y - 0.1)) / 0.12);
        ctx.save(); ctx.globalAlpha = a * 0.6; ctx.fillStyle = s.col;
        const sy2 = 30 + s.y * (h - 36), sh = s.h * (h - 36);
        ctx.fillRect(px2+4, sy2, pw-8, sh);
        ctx.globalAlpha = a; ctx.fillStyle = "#fff"; ctx.font = "9px sans-serif";
        ctx.fillText(s.label, px2+8, sy2+sh/2+3); ctx.restore();
      }
    });
    ctx.restore(); // cycleAlpha3
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 4. AI Automation — n8n-style node graph
// ─────────────────────────────────────────────────────────────────
const anim4: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#10B981";

  const edges: [number,number][] = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]];
  const particles = [
    ...edges.map((e, i) => ({ edge: e, progress: (i*0.25)%1, speed: 0.005+Math.random()*0.003 })),
    ...Array.from({length:6},(_,i)=>({ edge: edges[i%edges.length], progress: Math.random(), speed: 0.004+Math.random()*0.004 })),
  ];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h); t += 0.080;

    // ── Responsive node size ──
    const nodeR  = Math.min(w, h) * 0.082;  // slightly larger
    const partR  = Math.max(4, nodeR * 0.42);

    // ── Center the graph in canvas with padding ──
    const padX = nodeR + 4, padY = nodeR + 4;
    const gw = w - padX * 2, gh = h - padY * 2;

    // Node positions relative to centered graph area
    const nodes = [
      { x: padX + gw*0.08,  y: padY + gh*0.50, label: "Trigger",    color: "#10B981" },
      { x: padX + gw*0.35,  y: padY + gh*0.22, label: "AI Agent",   color: "#8B5CF6" },
      { x: padX + gw*0.35,  y: padY + gh*0.78, label: "Filter",     color: "#F59E0B" },
      { x: padX + gw*0.65,  y: padY + gh*0.22, label: "Notion",     color: "#06B6D4" },
      { x: padX + gw*0.65,  y: padY + gh*0.78, label: "Slack",      color: "#EC4899" },
      { x: padX + gw*0.92,  y: padY + gh*0.50, label: "Done \u2713", color: "#10B981" },
    ];

    // ── Edges ──
    edges.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b], mx = (na.x + nb.x) / 2;
      ctx.beginPath(); ctx.moveTo(na.x, na.y);
      ctx.quadraticCurveTo(mx, na.y, nb.x, nb.y);
      ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 1.5; ctx.stroke();
    });

    // ── Particles ──
    particles.forEach(p => {
      p.progress = (p.progress + p.speed) % 1;
      const [a, b] = p.edge, na = nodes[a], nb = nodes[b], mx = (na.x + nb.x) / 2;
      const t2 = p.progress;
      const px = (1-t2)*(1-t2)*na.x + 2*(1-t2)*t2*mx + t2*t2*nb.x;
      const py = (1-t2)*(1-t2)*na.y + 2*(1-t2)*t2*na.y + t2*t2*nb.y;
      const gr = ctx.createRadialGradient(px, py, 0, px, py, partR);
      gr.addColorStop(0, COL); gr.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(px, py, partR, 0, Math.PI*2); ctx.fill();
    });

    // ── Nodes ──
    nodes.forEach((n, i) => {
      const r   = nodeR * (1 + 0.06 * Math.sin(t*2 + i));
      const nw  = r * 2, nh = r * 1.3;

      // Glow
      const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2);
      gr.addColorStop(0, n.color + "40"); gr.addColorStop(1, "transparent");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(n.x, n.y, r*2, 0, Math.PI*2); ctx.fill();

      // Box
      ctx.fillStyle = "#0D1B2A"; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(n.x - r, n.y - nh/2, nw, nh, 8);
      ctx.fill(); ctx.stroke();

      // Label
      const fontSize = Math.max(7, Math.round(r * 0.40));
      ctx.fillStyle = "#fff"; ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(n.label, n.x, n.y);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    });

    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 5. Ecommerce Creative — product cards + bar chart
// ─────────────────────────────────────────────────────────────────
const anim5: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#F97316";
  const CARD_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];
  const products = [
    { label:"Cream", color:"#F9A8D4", price:"\u20B91,299" },
    { label:"Serum", color:"#93C5FD", price:"\u20B92,499" },
    { label:"Oil",   color:"#FCD34D", price:"\u20B9899"   },
  ];
  const barData = [
    { label:"Views",  val:0.55, col:"#F97316" },
    { label:"Clicks", val:0.38, col:"#FB923C" },
    { label:"Sales",  val:0.72, col:"#EA580C" },
    { label:"ROAS",   val:0.88, col:"#C2410C" },
  ];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h); t += 0.080;

    const small = w < 340;
    const fs = small ? 8 : 9;

    // ── Bottom: only bar labels now (platform badges move to top-right) ──
    const labelRowH = 14;
    const bottomPad = 6;
    const labelRowY = h - bottomPad - labelRowH;

    // ── Layout ──
    const cardAreaW  = w * (small ? 0.47 : 0.52);
    const chartAreaW = w - cardAreaW - (small ? 6 : 10);
    const cardW      = cardAreaW * (small ? 0.90 : 0.82);
    const dotRowH    = small ? 14 : 18;
    const cardH      = (labelRowY - 14 - dotRowH - 4) * 0.88;
    const dotRowY    = 10 + cardH + (small ? 5 : 7);
    const startX     = small ? 8 : 14;
    const cardTopY   = 10;

    // ── Card cycles every 2.7 s ──
    const frontIdx   = Math.floor(t / 2.7) % products.length;

    // ── Color cycle ──
    const cycleIdx   = Math.floor(t / 1.8) % CARD_COLORS.length;
    const cycleColor = CARD_COLORS[cycleIdx];
    const glowAlpha  = 0.55 + 0.35 * Math.sin(t * 2);

    // ── Single front card (no stack / no overlap) ──
    const p  = products[frontIdx];
    const cx = startX, cy = cardTopY;

    // Glow halo
    ctx.save();
    ctx.shadowColor = cycleColor;
    ctx.shadowBlur  = 28 * glowAlpha;
    ctx.globalAlpha = glowAlpha * 0.45;
    ctx.fillStyle   = cycleColor + "18";
    ctx.beginPath(); ctx.roundRect(cx - 4, cy - 4, cardW + 8, cardH + 8, 16); ctx.fill();
    ctx.restore();

    // Card body
    ctx.fillStyle   = "#111827";
    ctx.strokeStyle = cycleColor + "90";
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = cycleColor; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.roundRect(cx, cy, cardW, cardH, 12); ctx.fill(); ctx.stroke();
    ctx.shadowBlur  = 0;

    // Image area
    ctx.fillStyle = cycleColor + "22";
    ctx.beginPath(); ctx.roundRect(cx + 10, cy + 10, cardW - 20, cardH * 0.50, 8); ctx.fill();

    // BESTSELLER badge
    const badgeFontSize = small ? 6.5 : 8;
    ctx.font = `bold ${badgeFontSize}px sans-serif`;
    const badgeText = "BESTSELLER";
    const badgePadX = 6, badgeH = small ? 14 : 17;
    const badgeW = ctx.measureText(badgeText).width + badgePadX * 2;
    ctx.fillStyle = COL;
    ctx.beginPath(); ctx.roundRect(cx + 10, cy + 12, badgeW, badgeH, 4); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.fillText(badgeText, cx + 10 + badgeW / 2, cy + 12 + badgeH * 0.72);

    ctx.textAlign = "left";
    ctx.fillStyle = "#fff"; ctx.font = `bold ${small ? 11 : 14}px sans-serif`;
    ctx.fillText(p.price, cx + 10, cy + cardH * 0.68);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${small ? 7 : 9}px sans-serif`;
    ctx.fillText(p.label + " \u00B7 Flipkart \u00B7 Amazon", cx + 10, cy + cardH * 0.79);
    ctx.fillStyle = "#FCD34D"; ctx.font = `${small ? 8 : 10}px sans-serif`;
    ctx.fillText("\u2605\u2605\u2605\u2605\u2605", cx + 10, cy + cardH * 0.90);

    // ── Carousel dots (inside frame, below cards) ──
    const dotR = small ? 3 : 4;
    const dotSpacing = small ? 10 : 13;
    const totalDotW = products.length * dotR * 2 + (products.length - 1) * (dotSpacing - dotR * 2);
    const dotStartX = startX + cardW / 2 - totalDotW / 2;
    products.forEach((_, di) => {
      const isActive = di === frontIdx;
      ctx.fillStyle = isActive ? cycleColor : "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.arc(dotStartX + di * dotSpacing, dotRowY + dotR, isActive ? dotR + 1 : dotR, 0, Math.PI * 2);
      ctx.fill();
      if (isActive) {
        ctx.save();
        ctx.shadowColor = cycleColor; ctx.shadowBlur = 6;
        ctx.fillStyle = cycleColor;
        ctx.beginPath(); ctx.arc(dotStartX + di * dotSpacing, dotRowY + dotR, dotR + 1, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    });

    // ── Right column: platform badges at top, bar chart centered below ──
    const chartX   = cardAreaW + (small ? 6 : 10);
    const plats    = ["AMZ","SHY","FLK","MNT"];
    const platBadH = small ? 14 : 18;
    const platGap  = small ? 3 : 4;
    const platTopY = 8;
    const plW2     = (chartAreaW - platGap * (plats.length - 1)) / plats.length;

    // Platform badges — top of right column
    plats.forEach((pl, i) => {
      const px = chartX + i * (plW2 + platGap);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath(); ctx.roundRect(px, platTopY, plW2, platBadH, 4); ctx.fill();
      ctx.fillStyle = "rgba(249,115,22,0.9)"; ctx.font = `bold ${fs}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(pl, px + plW2 / 2, platTopY + platBadH * 0.72);
    });
    ctx.textAlign = "left";

    // Bar chart — vertically centered in remaining right-column space
    const barAreaTop    = platTopY + platBadH + (small ? 5 : 8);
    const barAreaBottom = labelRowY - 4;
    const barAreaH      = barAreaBottom - barAreaTop;
    const bPad          = small ? 4 : 6;
    const bW            = Math.max(4, (chartAreaW - bPad * (barData.length + 1)) / barData.length);
    const maxBarH       = barAreaH * 0.80;
    // Centre: total used bar height vs available
    const usedH         = maxBarH + (small ? 14 : 18); // bars + % label space
    const barBaseY      = barAreaTop + (barAreaH - usedH) / 2 + usedH - (small ? 2 : 4);

    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.beginPath(); ctx.roundRect(chartX - 3, barAreaTop - 3, chartAreaW + 3, barAreaH + 6, 6); ctx.fill();

    barData.forEach((b, i) => {
      const animH = (b.val + 0.05 * Math.sin(t * 1.5 + i)) * maxBarH;
      const bx = chartX + bPad + i * (bW + bPad), by = barBaseY - animH;
      const gr = ctx.createLinearGradient(bx, by, bx, barBaseY);
      gr.addColorStop(0, b.col); gr.addColorStop(1, b.col + "44");
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.roundRect(bx, by, bW, animH, [3, 3, 0, 0]); ctx.fill();
      // % label above bar
      ctx.fillStyle = "#fff"; ctx.font = `bold ${fs}px sans-serif`; ctx.textAlign = "center";
      ctx.fillText(Math.round(b.val * 100) + "%", bx + bW / 2, by - 2);
      // bar label at bottom row
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = `${fs}px sans-serif`;
      ctx.fillText(b.label, bx + bW / 2, labelRowY + labelRowH - 2);
    });
    ctx.textAlign = "left";
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 6. Generative AI Systems — neural net + prompt ticker
// ─────────────────────────────────────────────────────────────────
const anim6: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#EC4899";

  type Node = { x: number; y: number; layer: number; node: number };
  const getNet = (w: number, h: number): Node[][] =>
    [[.12],[.28,.28,.28],[.48,.48,.48,.48],[.68,.68,.68],[.85]]
    .map((xs, li) => xs.map((x, ni) => ({
      x: x * w, y: h * (0.15 + (ni+0.5) * (0.7/xs.length)), layer: li, node: ni,
    })));

  type Particle = { from: Node; to: Node; progress: number; speed: number };
  const particles: Particle[] = [];

  const spawnParticle = (net: Node[][]) => {
    const fl = Math.floor(Math.random() * (net.length - 1));
    if (!net[fl] || !net[fl+1]) return;
    const fn = net[fl][Math.floor(Math.random() * net[fl].length)];
    const tn = net[fl+1][Math.floor(Math.random() * net[fl+1].length)];
    particles.push({ from: fn, to: tn, progress: 0, speed: 0.015 + Math.random()*0.01 });
  };

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h); t += 0.080;

    const small   = w < 340;
    const fs      = small ? 8 : 10;
    const nodeR   = Math.min(w, h) * (small ? 0.032 : 0.038);
    const partR   = Math.max(3, nodeR * 0.55);

    // ── Reserved zones ──
    const promptH  = small ? 28 : 34;   // prompt bar height at bottom
    const padTop   = 10;
    const padSide  = small ? 14 : 20;   // horizontal padding for edge labels

    // ── Net area (centered) ──
    const netX1   = padSide + nodeR;
    const netX2   = w - padSide - nodeR;
    const netY1   = padTop + nodeR;
    const netY2   = h - promptH - 10 - nodeR;
    const netW    = netX2 - netX1;
    const netH    = netY2 - netY1;

    // Layer x positions (5 layers)
    const layerXs = [0, 0.25, 0.5, 0.75, 1].map(f => netX1 + f * netW);
    // Node counts per layer
    const layerCounts = [1, 3, 4, 3, 1];

    const getNetCentered = (): Node[][] =>
      layerCounts.map((count, li) =>
        Array.from({ length: count }, (_, ni) => ({
          x: layerXs[li],
          y: netY1 + (ni + 0.5) * (netH / count),
          layer: li,
          node: ni,
        }))
      );

    const net = getNetCentered();
    if (Math.random() < 0.12) spawnParticle(net);

    // ── Connections ──
    for (let l = 0; l < net.length - 1; l++) {
      net[l].forEach(a => net[l+1].forEach(b => {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(236,72,153,${0.06+0.04*Math.sin(t+a.node+b.node)})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }));
    }

    // ── Particles ──
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]; p.progress += p.speed;
      if (p.progress >= 1) { particles.splice(i, 1); continue; }
      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;
      const gr = ctx.createRadialGradient(px, py, 0, px, py, partR);
      gr.addColorStop(0, COL); gr.addColorStop(1, "rgba(236,72,153,0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(px, py, partR, 0, Math.PI*2); ctx.fill();
    }

    // ── Nodes ──
    net.forEach((layer, li) => layer.forEach((n, ni) => {
      const r       = nodeR * (1 + 0.08 * Math.sin(t*1.8 + li*1.2 + ni*0.7));
      const isEdge  = li === 0 || li === net.length - 1;
      const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r*2.2);
      gr.addColorStop(0, "rgba(236,72,153,0.2)"); gr.addColorStop(1, "transparent");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(n.x, n.y, r*2.2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a0a14";
      ctx.strokeStyle = isEdge ? COL : "rgba(236,72,153,0.5)";
      ctx.lineWidth = isEdge ? 2 : 1;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = isEdge ? COL : "rgba(236,72,153,0.4)";
      ctx.beginPath(); ctx.arc(n.x, n.y, r*0.35, 0, Math.PI*2); ctx.fill();
    }));

    // ── Edge labels — centered above their node ──
    net.forEach((layer, li) => {
      if (li === 0 || li === net.length - 1) {
        const n     = layer[0];
        const label = li === 0 ? "Prompt In" : "Output";
        ctx.fillStyle = li === 0 ? "rgba(236,72,153,0.9)" : "rgba(16,185,129,0.9)";
        ctx.font      = `bold ${fs}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(label, n.x, n.y - nodeR - 5);
      }
    });
    ctx.textAlign = "left";

    // ── Prompt ticker — centered, anchored to bottom ──
    const prompts = ["Generate brand visuals...","Create motion graphics...","Build AI pipeline...","Scale production..."];
    const pidx    = Math.floor(t / 3) % prompts.length;
    const ci      = Math.floor((t % 3) / 3 * prompts[pidx].length * 1.3);
    const barX    = padSide, barW = w - padSide * 2;
    const barY    = h - promptH + 4, barH = promptH - 8;

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 6); ctx.fill();

    // Pink left accent line
    ctx.fillStyle = COL;
    ctx.beginPath(); ctx.roundRect(barX, barY, 3, barH, [3,0,0,3]); ctx.fill();

    const textX = barX + 10, textY = barY + barH * 0.65;
    ctx.fillStyle = "rgba(236,72,153,0.75)"; ctx.font = `${fs}px monospace`;
    const snippet = "> " + prompts[pidx].slice(0, ci);
    ctx.fillText(snippet, textX, textY);

    if (Math.sin(t * 3) > 0) {
      const tw = ctx.measureText(snippet).width;
      ctx.fillStyle = COL;
      ctx.fillRect(textX + tw + 1, barY + 4, Math.max(2, fs * 0.55), barH - 8);
    }

    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────
const ANIMS: AnimFn[] = [anim1, anim2, anim3, anim4, anim5, anim6];

export default function ServiceCanvas({ index }: { index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return ANIMS[index]?.(c);
  }, [index]);
  return <canvas ref={ref} className="w-full h-full block" />;
}
