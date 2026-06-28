import { useTheme } from "../context/ThemeContext";

/* ── Colour keyframes ───────────────────────────────────────────────
   Each entry: [progress_0_to_1, [r, g, b]]
   The overlay stays fully opaque from 6 % → 86 %, then fades out.
   ─────────────────────────────────────────────────────────────────── */

const TO_LIGHT_KEYS: [number, [number, number, number]][] = [
  [0.00, [3,   4,   22]],    // deep night
  [0.06, [5,   8,   35]],    // midnight blue (overlay now opaque)
  [0.15, [18,  8,   45]],    // pre-dawn purple
  [0.30, [60,  15,  40]],    // dawn crimson
  [0.45, [180, 70,  15]],    // sunrise orange
  [0.60, [220, 150, 30]],    // golden hour
  [0.75, [200, 220, 255]],   // pale sky blue
  [0.86, [240, 245, 255]],   // near-white daylight (overlay starts fading)
  [1.00, [248, 249, 255]],
];

const TO_DARK_KEYS: [number, [number, number, number]][] = [
  [0.00, [248, 249, 255]],   // daylight
  [0.06, [230, 200, 150]],   // golden afternoon (now opaque)
  [0.20, [210, 120, 50]],    // sunset orange
  [0.35, [150, 50,  30]],    // deep red dusk
  [0.50, [80,  30,  80]],    // dusk purple
  [0.65, [20,  15,  50]],    // twilight
  [0.78, [5,   8,   30]],    // deep blue
  [0.86, [3,   4,   22]],    // full night (overlay starts fading)
  [1.00, [3,   4,   22]],
];

/* ── Linear interpolation helpers ──────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function sampleColor(
  keys: [number, [number, number, number]][],
  p: number,
): [number, number, number] {
  if (p <= keys[0][0]) return keys[0][1];
  if (p >= keys[keys.length - 1][0]) return keys[keys.length - 1][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, c0] = keys[i - 1];
      const [p1, c1] = keys[i];
      const t = (p - p0) / (p1 - p0);
      return [
        lerp(c0[0], c1[0], t),
        lerp(c0[1], c1[1], t),
        lerp(c0[2], c1[2], t),
      ];
    }
  }
  return keys[keys.length - 1][1];
}

function getAlpha(progress: number): number {
  if (progress < 0.06) return progress / 0.06;                     // 0 → 1  (ramp up)
  if (progress <= 0.86) return 1;                                   // hold opaque
  return 1 - (progress - 0.86) / 0.14;                             // 1 → 0  (fade out)
}

/* ── Component ─────────────────────────────────────────────────── */
export default function ThemeTransitionOverlay() {
  const { isTransitioning, transitionProgress, transitionDir } = useTheme();

  if (!isTransitioning) return null;

  const keys = transitionDir === "to-light" ? TO_LIGHT_KEYS : TO_DARK_KEYS;
  const [r, g, b] = sampleColor(keys, transitionProgress);
  const alpha      = getAlpha(transitionProgress);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45,                   // above content (z-10), below navbar (z-50)
        background: `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`,
        pointerEvents: "none",
        transition: "background 0.08s linear",
      }}
    />
  );
}
