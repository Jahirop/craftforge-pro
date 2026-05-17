import { useRef, useEffect } from "react";

type Cleanup = () => void;
type AnimFn = (canvas: HTMLCanvasElement) => Cleanup;

// ─────────────────────────────────────────────────────────────────
// 1. Brief to Prompt — prompt typing + brand card build
// ─────────────────────────────────────────────────────────────────
const anim1: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#7C3AED";
  const CYCLE_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];
  const prompt = "Design skincare brand for Gen Z";
  const outputs = [
    { label: "Brand Name",   val: "ZEN G"          },
    { label: "Color Story",  val: "Lilac + Sage"   },
    { label: "Logo Concept", val: "Geometric leaf" },
    { label: "Typography",   val: "Modern serif"   },
    { label: "Tone",         val: "Clean, honest"  },
  ];
  const brandPalette = ["#A78BFA", "#C4B5FD", "#EC4899", "#34D399", "#F9A8D4"];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    t += 0.048;
    const small = w < 320;

    const CYCLE = 10;
    const tc = t % CYCLE;
    const promptDone = tc > 2.2;
    const charCount = Math.min(prompt.length, Math.round(tc * (prompt.length / 2.2)));
    const splitX = w * 0.52;

    // Prompt box
    const bh = small ? 34 : 44;
    const bx = 12, by = 12, bw = w - 24;
    ctx.fillStyle = "rgba(124,58,237,0.09)";
    ctx.strokeStyle = promptDone ? "rgba(124,58,237,0.55)" : "rgba(124,58,237,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill(); ctx.stroke();

    ctx.fillStyle = "rgba(167,139,250,0.5)";
    ctx.font = `${small ? 7 : 9}px sans-serif`;
    ctx.fillText("PROMPT", bx + 10, by + (small ? 10 : 13));

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `${small ? 9 : 12}px "Courier New", monospace`;
    ctx.fillText(prompt.slice(0, charCount), bx + 10, by + (small ? 26 : 32));

    if (!promptDone && Math.sin(t * 5) > 0) {
      const tw = ctx.measureText(prompt.slice(0, charCount)).width;
      ctx.fillStyle = COL;
      ctx.fillRect(bx + 10 + tw, by + 20, 2, 13);
    }

    if (promptDone) {
      const tx2 = bx + bw - 18, ty2 = by + bh / 2;
      ctx.fillStyle = "rgba(16,185,129,0.18)";
      ctx.strokeStyle = "#10B981"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(tx2, ty2, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#10B981"; ctx.lineWidth = 1.6; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx2 - 4, ty2); ctx.lineTo(tx2 - 1, ty2 + 3.5); ctx.lineTo(tx2 + 4.5, ty2 - 4);
      ctx.stroke();
    }

    // Left panel: output items — fill available height exactly so nothing crops
    const iGap = small ? 2 : 3;
    const listTop = by + bh + (small ? 6 : 10);
    const bottomPad = small ? 6 : 10;
    const availH = Math.max(0, h - listTop - bottomPad);
    const ih = Math.max(10, Math.floor((availH + iGap) / outputs.length) - iGap);
    const iw = splitX - 34;

    const cycleIdx = Math.floor(t / 1.8);
    outputs.forEach((out, i) => {
      const itemAge = Math.max(0, tc - 2.4 - i * 0.35);
      if (itemAge <= 0) return;
      const alpha = Math.min(1, itemAge * 3);
      const iy = listTop + i * (ih + iGap);
      const col = CYCLE_COLORS[(cycleIdx + i) % CYCLE_COLORS.length];

      // Typewriter on value
      const typeAge = Math.max(0, itemAge - 0.1);
      const charCount2 = Math.min(out.val.length, Math.round(typeAge * out.val.length / 0.7));
      const stillTyping = charCount2 < out.val.length;

      ctx.save(); ctx.globalAlpha = alpha;
      ctx.fillStyle = col + "18"; ctx.strokeStyle = col + "55"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(bx, iy, iw, ih, 5); ctx.fill(); ctx.stroke();

      // Label + value — font sizes scale with ih so content never crops
      const labelFs = Math.max(6, Math.round(ih * 0.28));
      const valFs   = Math.max(7, Math.round(ih * 0.38));
      ctx.fillStyle = col + "cc";
      ctx.font = `${labelFs}px sans-serif`;
      ctx.fillText(out.label.toUpperCase(), bx + 10, iy + ih * 0.34);

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = `bold ${valFs}px "Courier New", monospace`;
      ctx.fillText(out.val.slice(0, charCount2), bx + 10, iy + ih * 0.76);

      // Cursor blink
      if (stillTyping && Math.sin(t * 5) > 0) {
        const tw2 = ctx.measureText(out.val.slice(0, charCount2)).width;
        ctx.fillStyle = col;
        ctx.fillRect(bx + 10 + tw2 + 1, iy + ih * 0.62, 2, valFs * 1.1);
      }
      ctx.restore();
    });

    // Right panel: brand card
    const rx = splitX + 8, ry = listTop, rw = w - rx - 12;
    const rh = outputs.length * (ih + iGap) - iGap;
    const brandAge = Math.max(0, tc - 2.0);
    const brandAlpha = Math.min(1, brandAge * 1.5);
    ctx.save(); ctx.globalAlpha = brandAlpha;

    const bgGrd = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh);
    bgGrd.addColorStop(0, "#1a0d2e"); bgGrd.addColorStop(1, "#0d1a1f");
    ctx.fillStyle = bgGrd; ctx.strokeStyle = "rgba(167,139,250,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(rx, ry, rw, rh, 12); ctx.fill(); ctx.stroke();

    const lx = rx + rw / 2, ly = ry + rh * 0.22;
    const logoAge = Math.max(0, brandAge - 0.3);
    const logoScale = Math.min(1, logoAge * 2);
    const ds = Math.min(rw, rh) * (small ? 0.10 : 0.13);
    ctx.save(); ctx.translate(lx, ly); ctx.scale(logoScale, logoScale); ctx.rotate(t * 0.3);
    ctx.fillStyle = "#A78BFA"; ctx.globalAlpha = brandAlpha * 0.9;
    ctx.beginPath(); ctx.moveTo(0, -ds); ctx.lineTo(ds * 0.67, 0); ctx.lineTo(0, ds); ctx.lineTo(-ds * 0.67, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#EC4899"; ctx.globalAlpha = brandAlpha * 0.6;
    ctx.beginPath(); ctx.moveTo(0, -ds * 0.67); ctx.lineTo(ds * 0.44, 0); ctx.lineTo(0, ds * 0.67); ctx.lineTo(-ds * 0.44, 0); ctx.closePath(); ctx.fill();
    ctx.restore();

    const nameAge = Math.max(0, brandAge - 0.6);
    ctx.globalAlpha = brandAlpha * Math.min(1, nameAge * 2);
    // Brand name — ZEN G with letter spacing
    ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.round(rw * (small ? 0.13 : 0.15))}px sans-serif`;
    ctx.textAlign = "center";
    (ctx as any).letterSpacing = "4px";
    ctx.fillText("ZEN G", lx, ly + rh * 0.26);

    // Subtitle
    ctx.fillStyle = "rgba(167,139,250,0.65)"; ctx.font = `${Math.round(rw * (small ? 0.065 : 0.075))}px sans-serif`;
    (ctx as any).letterSpacing = "3px";
    ctx.fillText("SKINCARE", lx, ly + rh * 0.38);
    (ctx as any).letterSpacing = "0px";

    // Swatches
    const swatchAge = Math.max(0, brandAge - 0.9);
    ctx.globalAlpha = brandAlpha * Math.min(1, swatchAge * 2);
    const sw = Math.round(rw * (small ? 0.09 : 0.11)), sGap2 = small ? 3 : 5;
    const totalSw = brandPalette.length * (sw + sGap2) - sGap2;
    let sx = lx - totalSw / 2;
    brandPalette.forEach((col) => {
      ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(sx, ly + rh * 0.48, sw, small ? 5 : 7, 3); ctx.fill();
      sx += sw + sGap2;
    });

    // Tagline
    const tagAge = Math.max(0, brandAge - 1.2);
    ctx.globalAlpha = brandAlpha * Math.min(1, tagAge * 2) * 0.5;
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${Math.round(rw * (small ? 0.055 : 0.065))}px sans-serif`;
    (ctx as any).letterSpacing = "1px";
    ctx.fillText("Clean. Honest. Gen Z.", lx, ly + rh * 0.65);
    (ctx as any).letterSpacing = "0px";
    ctx.textAlign = "left"; ctx.restore();

    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 2. AI Systems Activate — 4 oscilloscope lanes running in parallel
// ─────────────────────────────────────────────────────────────────
const anim2: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const CC2 = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];

  const systems = [
    { label: "DESIGN AI",  freq: 1.8, amp: 0.55, phase: 0.0 },
    { label: "COPY AI",    freq: 2.4, amp: 0.45, phase: 0.8 },
    { label: "MOTION AI",  freq: 1.2, amp: 0.70, phase: 1.5 },
    { label: "CODE AI",    freq: 3.1, amp: 0.38, phase: 2.3 },
  ];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    t += 0.048;

    const laneH = h / systems.length;
    const labelW = w * 0.28;
    const waveX = labelW + 6;
    const waveW = w - waveX - 14;

    systems.forEach((sys, i) => {
      const age = Math.max(0, t - i * 0.5);
      const alpha = Math.min(1, age * 1.8);
      if (alpha <= 0.01) return;
      const ly = i * laneH;
      ctx.save(); ctx.globalAlpha = alpha;

      if (i > 0) {
        ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(w, ly); ctx.stroke();
      }
      const col2 = CC2[(Math.floor(t / 1.8) + i) % CC2.length];
      ctx.fillStyle = col2 + "0a"; ctx.fillRect(0, ly, w, laneH);

      // Uppercase label — centered in left panel with brand color cycle
      const midY = ly + laneH * 0.5;
      const lfs = Math.max(9, Math.round(laneH * 0.22));
      ctx.fillStyle = col2;
      ctx.font = `bold ${lfs}px sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.shadowColor = col2; ctx.shadowBlur = 10;
      ctx.fillText(sys.label, labelW / 2, midY);
      ctx.shadowBlur = 0; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";

      // Pulsing dot
      ctx.fillStyle = col2; ctx.globalAlpha = alpha * (0.5 + 0.5 * Math.sin(t * 3 + i));
      ctx.beginPath(); ctx.arc(labelW - 8, midY, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = alpha;

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.roundRect(waveX, ly + laneH * 0.12, waveW, laneH * 0.76, 4); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(waveX, ly + laneH * 0.5); ctx.lineTo(waveX + waveW, ly + laneH * 0.5); ctx.stroke();

      const cyW = ly + laneH * 0.5;
      const ampPx = laneH * 0.3 * sys.amp * Math.min(1, age);
      const pts = 80;

      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (let p = 0; p <= pts; p++) {
          const px = waveX + (p / pts) * waveW;
          const wave = Math.sin((p / pts) * Math.PI * 6 * sys.freq + t * 4 + sys.phase);
          const env = Math.sin((p / pts) * Math.PI);
          const py = cyW + wave * ampPx * env;
          p === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        if (pass === 0) { ctx.strokeStyle = col2 + "44"; ctx.lineWidth = 6; ctx.lineCap = "round"; }
        else { ctx.strokeStyle = col2; ctx.lineWidth = 1.8; }
        ctx.stroke();
      }

      const playX = waveX + ((t * 55) % waveW);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.globalAlpha = alpha * 0.35;
      ctx.beginPath(); ctx.moveTo(playX, ly + laneH * 0.12); ctx.lineTo(playX, ly + laneH * 0.88); ctx.stroke();
      ctx.restore();
    });

    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(labelW, 0, 1, h);
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 3. Refine & Iterate — version cycling + quality score arc
// ─────────────────────────────────────────────────────────────────
const anim3: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#EC4899";

  const versions = [
    { label: "v1 Draft",    score: 42, notes: ["Inconsistent spacing", "Weak CTA", "Off-brand colors"] },
    { label: "v2 Revised",  score: 71, notes: ["Better hierarchy", "CTA improved", "Color adjusted"]   },
    { label: "v3 Polished", score: 94, notes: ["Production ready", "All checks pass", "\u2713 Approved"] },
  ];

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    t += 0.048;
    const small = w < 320;

    const cycleT = 2.5;
    const vi = Math.floor((t / cycleT) % versions.length);
    const vProgress = (t / cycleT) % 1;
    const ver = versions[vi];
    const transAlpha = vProgress > 0.85 ? (vProgress - 0.85) / 0.15 : 0;

    const cardX = 20, cardY = 16, cardW = w * 0.44, cardH = h - 32;
    ctx.save(); ctx.globalAlpha = 1 - transAlpha * 0.6;

    const scoreColor = ver.score < 60 ? "#F59E0B" : ver.score < 85 ? COL : "#10B981";
    ctx.fillStyle = "rgba(20,10,16,0.9)"; ctx.strokeStyle = scoreColor + "55"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(cardX, cardY, cardW, cardH, 12); ctx.fill(); ctx.stroke();

    // Preview band
    const prevBandH = cardH * 0.38;
    const prevBandY = cardY + 8;
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath(); ctx.roundRect(cardX + 8, prevBandY, cardW - 16, prevBandH, 6); ctx.fill();

    const shapes = vi === 0 ? 3 : vi === 1 ? 5 : 7;
    const shW = Math.max(10, (cardW - 28) / shapes - 4);
    const shH = prevBandH * (small ? 0.38 : 0.44);
    const midY = prevBandY + prevBandH / 2;
    for (let s = 0; s < shapes; s++) {
      const sx = cardX + 12 + (s + 0.5) * ((cardW - 24) / shapes);
      const sy = midY + Math.sin(s * 1.3 + vi * 0.8) * (prevBandH * 0.18);
      ctx.fillStyle = [COL, "#8B5CF6", "#06B6D4", "#F59E0B", "#10B981", "#EC4899", "#7C3AED"][s % 7];
      ctx.globalAlpha = (1 - transAlpha * 0.6) * (0.55 + 0.45 * (vi / 2));
      ctx.beginPath(); ctx.roundRect(sx - shW / 2, sy - shH / 2, shW, shH, 4); ctx.fill();
    }
    ctx.globalAlpha = 1 - transAlpha * 0.6;

    const textStartY = prevBandY + prevBandH + (small ? 10 : 14);
    ctx.fillStyle = scoreColor; ctx.font = `bold ${small ? 9 : 11}px sans-serif`;
    ctx.fillText(ver.label, cardX + 10, textStartY);

    const noteLineH = small ? 14 : 18;
    ver.notes.forEach((note, ni) => {
      const isGood = note.startsWith("\u2713") || ["pass","ready","improved","adjusted"].some(w => note.includes(w));
      ctx.fillStyle = isGood ? "#10B981" : "rgba(255,255,255,0.38)";
      ctx.font = `${small ? 8 : 10}px sans-serif`;
      ctx.fillText((isGood ? "\u2713 " : "\u2717 ") + note, cardX + 10, textStartY + (small ? 13 : 16) + ni * noteLineH);
    });
    ctx.restore();

    // Score circle
    const meterX = cardX + cardW + (small ? 10 : 16), meterW = w - meterX - (small ? 8 : 16);
    const arcStroke = small ? 6 : 8;
    const circleX = meterX + meterW / 2, circleY = h * 0.32;
    const circleR = Math.min(meterW * 0.46, h * 0.22);

    ctx.beginPath(); ctx.arc(circleX, circleY, circleR, Math.PI * 0.75, Math.PI * 2.25);
    ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = arcStroke; ctx.lineCap = "round"; ctx.stroke();

    const prevScore = versions[Math.max(0, vi - 1)].score;
    const displayScore = ver.score - (ver.score - prevScore) * (1 - Math.min(1, vProgress * 3));
    ctx.beginPath(); ctx.arc(circleX, circleY, circleR, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * (displayScore / 100));
    ctx.strokeStyle = scoreColor; ctx.lineWidth = arcStroke; ctx.stroke();

    ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.round(circleR * 0.6)}px sans-serif`;
    ctx.textAlign = "center"; ctx.fillText(String(Math.round(displayScore)), circleX, circleY + 5);
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = `${small ? 8 : 10}px sans-serif`;
    ctx.fillText("QUALITY", circleX, circleY + circleR * 0.5);

    const tabH = small ? 18 : 22, tabGap = small ? 2 : 4;
    const tabsY = Math.min(circleY + circleR + (small ? 10 : 18), h - tabH - (small ? 16 : 22));
    versions.forEach((v, i) => {
      const isActive = i === vi;
      const tabW = (meterW - tabGap * 2) / 3;
      const px = meterX + i * (tabW + tabGap), py = tabsY;
      const pc = v.score < 60 ? "#F59E0B" : v.score < 85 ? COL : "#10B981";
      ctx.fillStyle = isActive ? pc + "33" : "rgba(255,255,255,0.04)";
      ctx.strokeStyle = isActive ? pc : "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(px, py, tabW, tabH, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = isActive ? pc : "rgba(255,255,255,0.25)";
      ctx.font = (isActive ? "bold " : "") + `${small ? 7 : 9}px sans-serif`; ctx.textAlign = "center";
      ctx.fillText("v" + (i + 1) + " \u00b7 " + v.score + "%", px + tabW / 2, py + tabH * 0.65);
    });

    ctx.fillStyle = "rgba(236,72,153,0.4)"; ctx.font = `${small ? 7 : 9}px sans-serif`; ctx.textAlign = "center";
    ctx.fillText("\uD83D\uDD04 Iteration " + (vi + 1) + " of 3", circleX, h - (small ? 8 : 14));
    ctx.textAlign = "left";

    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement!); draw();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
};

// ─────────────────────────────────────────────────────────────────
// 4. Launch Ready — rocket launch + deployment checklist
// ─────────────────────────────────────────────────────────────────
const anim4: AnimFn = (canvas) => {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, t = 0, raf = 0;
  const COL = "#10B981";
  const CYCLE_COLORS = ["#7C3AED","#4F46E5","#3B82F6","#F97316","#10B981","#06B6D4","#EC4899","#F59E0B"];
  const checks = ["Assets packaged", "Website deployed", "SEO configured", "Analytics live", "CDN optimised"];

  type Particle = { x: number; y: number; vx: number; vy: number; life: number; size: number; col: string };
  const particles: Particle[] = [];

  const spawnParticle = (rx: number, ry: number) => {
    particles.push({
      x: rx + (Math.random() - 0.5) * 12, y: ry,
      vx: (Math.random() - 0.5) * 1.2, vy: 1.5 + Math.random() * 2,
      life: 1, size: 2 + Math.random() * 4,
      col: ["#10B981", "#34D399", "#6EE7B7", "#F59E0B"][Math.floor(Math.random() * 4)],
    });
  };

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = Math.round(r.width * devicePixelRatio);
    H = canvas.height = Math.round(r.height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = () => {
    const w = W / devicePixelRatio, h = H / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    t += 0.048;
    const small = w < 320;

    const cycle = t % 8;
    const isLaunched = cycle > 4.5;
    const countdownPhase = Math.min(1, cycle / 4.5);
    const launchPhase = isLaunched ? Math.min(1, (cycle - 4.5) / 3) : 0;
    const vsmall = w < 270;
    const rocketBaseY = h * (vsmall ? 0.64 : small ? 0.68 : 0.72);
    const rocketX = w * (vsmall ? 0.82 : small ? 0.76 : 0.76);
    const rocketY = isLaunched ? rocketBaseY - launchPhase * (h + 60) : rocketBaseY;

    // Checklist — width capped so it never overlaps rocket column
    const maxCheckRight = rocketX - w * 0.08;   // leave 8% gap before rocket
    const itemStartY = vsmall ? 8 : small ? 10 : 24;
    const completePad = vsmall ? 18 : small ? 22 : 30;
    const availItemsH = h - itemStartY - completePad;
    const itemStep = Math.max(vsmall ? 20 : small ? 24 : 36, Math.floor(availItemsH / checks.length));
    const itemH = Math.min(itemStep - 3, vsmall ? 18 : small ? 22 : 30);
    const checkX = small ? 10 : 20;
    const checkW = Math.min(w * (small ? 0.56 : 0.5), maxCheckRight - checkX);
    const circleR4 = vsmall ? 6 : small ? 7 : 9;
    const iconCX = checkX + (vsmall ? 8 : small ? 10 : 14);
    const textX = iconCX + circleR4 + (vsmall ? 5 : small ? 7 : 10);
    const cycleIdx = Math.floor(t / 1.8);
    checks.forEach((ch, i) => {
      const itemT = countdownPhase * checks.length;
      const done = itemT > i + 0.5;
      const partial = Math.max(0, Math.min(1, itemT - i));
      const iy = itemStartY + i * itemStep;
      const col = CYCLE_COLORS[(cycleIdx + i) % CYCLE_COLORS.length];
      const cy4 = iy + itemH / 2;

      // Box with cycling color
      ctx.fillStyle = done ? col + "20" : col + "0a";
      ctx.strokeStyle = done ? col + "99" : col + "33";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(checkX, iy, checkW, itemH, small ? 6 : 8); ctx.fill(); ctx.stroke();

      // Icon circle
      ctx.fillStyle = done ? col : col + "44";
      ctx.beginPath(); ctx.arc(iconCX, cy4, circleR4, 0, Math.PI * 2); ctx.fill();

      // Checkmark or pending dot
      if (done) {
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.6; ctx.lineCap = "round"; ctx.beginPath();
        ctx.moveTo(iconCX - 3.5, cy4); ctx.lineTo(iconCX - 1, cy4 + 3); ctx.lineTo(iconCX + 4, cy4 - 3.5); ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath(); ctx.arc(iconCX, cy4, circleR4 * 0.35, 0, Math.PI * 2); ctx.fill();
      }

      // Text
      ctx.fillStyle = done ? "#fff" : "rgba(255,255,255,0.55)";
      ctx.font = done ? `bold ${small ? 9 : 11}px sans-serif` : `${small ? 9 : 11}px sans-serif`;
      ctx.fillText(ch, textX, cy4 + (small ? 3.5 : 4.5));

      // Progress bar while pending
      if (!done && partial > 0) {
        ctx.fillStyle = col + "88";
        ctx.beginPath(); ctx.roundRect(textX, iy + itemH - (small ? 4 : 5), (checkW - (textX - checkX) - 8) * partial, 2, 1); ctx.fill();
      }
    });
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = `${small ? 8 : 10}px sans-serif`;
    ctx.fillText(Math.floor(countdownPhase * checks.length) + "/" + checks.length + " complete", checkX, h - Math.round(completePad * 0.3));

    // Rocket
    const rs = vsmall ? 0.56 : small ? 0.72 : 1.0;
    ctx.save(); ctx.translate(rocketX, rocketY); ctx.scale(rs, rs);
    if (isLaunched && launchPhase < 0.95 && Math.random() < 0.5) spawnParticle(0, 28);

    ctx.fillStyle = "#e2e8f0"; ctx.beginPath();
    ctx.moveTo(0, -36); ctx.bezierCurveTo(12, -36, 18, -20, 18, 0);
    ctx.lineTo(18, 24); ctx.lineTo(-18, 24); ctx.lineTo(-18, 0);
    ctx.bezierCurveTo(-18, -20, -12, -36, 0, -36); ctx.fill();

    ctx.fillStyle = "#0EA5E9"; ctx.beginPath(); ctx.arc(0, -8, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#7DD3FC"; ctx.lineWidth = 1.5; ctx.stroke();

    ([-18, 18] as number[]).forEach((fx, si) => {
      ctx.fillStyle = "#94A3B8"; ctx.beginPath();
      ctx.moveTo(fx, 12); ctx.lineTo(fx + (si === 0 ? -14 : 14), 32); ctx.lineTo(fx, 32); ctx.fill();
    });

    if (!isLaunched) {
      const fh = 10 + 8 * Math.sin(t * 8);
      const fg = ctx.createRadialGradient(0, 28, 0, 0, 28 + fh, fh);
      fg.addColorStop(0, "#FCD34D"); fg.addColorStop(0.5, "#F97316"); fg.addColorStop(1, "rgba(239,68,68,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.ellipse(0, 28 + fh / 2, 8, fh, 0, 0, Math.PI * 2); ctx.fill();
    } else {
      const fh = 28 + 10 * Math.sin(t * 12);
      const fg = ctx.createLinearGradient(0, 28, 0, 28 + fh);
      fg.addColorStop(0, "#FCD34D"); fg.addColorStop(0.5, "#F97316"); fg.addColorStop(1, "rgba(239,68,68,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.ellipse(0, 28 + fh / 2, 12, fh, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.025;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.save(); ctx.globalAlpha = p.life * 0.7; ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(rocketX + p.x, rocketY + p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = "#374151";
    ctx.beginPath(); ctx.roundRect(rocketX - 28 * rs, rocketBaseY + 26 * rs, 56 * rs, 8 * rs, 4); ctx.fill();
    ctx.fillStyle = "#1F2937";
    ctx.fillRect(rocketX - 6 * rs, rocketBaseY + 34 * rs, 12 * rs, h - rocketBaseY - 34 * rs);

    if (isLaunched) {
      const bw = vsmall ? 42 : small ? 54 : 68, bh2 = vsmall ? 16 : small ? 20 : 26, bx = rocketX - bw / 2, by = h * (vsmall ? 0.26 : small ? 0.32 : 0.38);
      ctx.save(); ctx.globalAlpha = Math.min(1, launchPhase * 3);
      ctx.fillStyle = "rgba(16,185,129,0.2)"; ctx.strokeStyle = COL; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh2, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = COL; ctx.globalAlpha *= (0.5 + 0.5 * Math.sin(t * 5));
      ctx.beginPath(); ctx.arc(bx + 10, by + bh2 / 2, small ? 3 : 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = Math.min(1, launchPhase * 3);
      ctx.fillStyle = COL; ctx.font = `bold ${small ? 9 : 11}px sans-serif`; ctx.textAlign = "center";
      ctx.fillText("LIVE", bx + bw / 2 + 4, by + bh2 / 2 + 4);
      ctx.textAlign = "left"; ctx.restore();
    }

    if (!isLaunched) {
      ctx.fillStyle = COL; ctx.font = `bold ${Math.round(h * (small ? 0.08 : 0.1))}px sans-serif`;
      ctx.textAlign = "center"; ctx.globalAlpha = 0.3;
      ctx.fillText("T-" + Math.max(0, Math.ceil(4.5 - cycle)), rocketX, h * (small ? 0.84 : 0.88));
      ctx.textAlign = "left"; ctx.globalAlpha = 1;
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
const ANIMS: AnimFn[] = [anim1, anim2, anim3, anim4];

export default function ProcessCanvas({ index }: { index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return ANIMS[index]?.(c);
  }, [index]);
  return <canvas ref={ref} className="w-full h-full block" />;
}
