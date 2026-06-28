/**
 * LightBackground — Soft animated gradient blobs for light mode.
 * Replaces the dark Starfield canvas in light theme.
 * Pure CSS — zero canvas overhead.
 */
export default function LightBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Base fill */}
      <div className="absolute inset-0" style={{ background: "#F1F5F9" }} />

      {/* Top-left purple blob */}
      <div
        className="absolute animate-blob"
        style={{
          top: "-10%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top-right indigo blob */}
      <div
        className="absolute animate-blob-delay-2"
        style={{
          top: "-5%",
          right: "-8%",
          width: "45vw",
          height: "45vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.14) 0%, rgba(79,70,229,0.08) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Bottom-center blue blob */}
      <div
        className="absolute animate-blob-delay-4"
        style={{
          bottom: "5%",
          left: "30%",
          width: "50vw",
          height: "40vw",
          maxWidth: 650,
          maxHeight: 500,
          borderRadius: "50% 50% 40% 60% / 55% 45% 55% 45%",
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.10) 0%, rgba(6,182,212,0.07) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
