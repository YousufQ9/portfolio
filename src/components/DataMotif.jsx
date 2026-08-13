// A restrained, hand-drawn SVG motif used behind the homepage hero in place
// of a profile photo. It's an abstract line chart + scatter of points —
// evoking "data" without being a literal, cluttered dashboard screenshot.
// Pure SVG, no external assets, so it always renders instantly and scales
// cleanly at any size.
export default function DataMotif({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abstract line chart illustration"
    >
      <title>Abstract data visualization</title>
      {/* Baseline grid — quiet, structural */}
      <g stroke="var(--color-hairline)" strokeWidth="1">
        <line x1="0" y1="60" x2="640" y2="60" />
        <line x1="0" y1="150" x2="640" y2="150" />
        <line x1="0" y1="240" x2="640" y2="240" />
        <line x1="0" y1="330" x2="640" y2="330" />
      </g>

      {/* Trend line 1 — soft, secondary series */}
      <path
        d="M0 300 C 60 280, 100 320, 160 260 S 260 180, 320 210 S 420 260, 480 190 S 580 120, 640 150"
        stroke="var(--color-hairline-strong)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Trend line 2 — the accent series, drawn on top */}
      <path
        className="data-motif__line"
        d="M0 250 C 70 260, 110 180, 170 200 S 250 100, 330 130 S 430 60, 490 90 S 580 40, 640 70"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Data points along the accent line */}
      <g fill="var(--color-accent)">
        <circle cx="170" cy="200" r="5" />
        <circle cx="330" cy="130" r="5" />
        <circle cx="490" cy="90" r="7" className="data-motif__pulse" />
        <circle cx="640" cy="70" r="5" />
      </g>

      {/* Signal accent point */}
      <circle cx="490" cy="90" r="14" fill="var(--color-signal)" opacity="0.12" />
      <circle cx="490" cy="90" r="4" fill="var(--color-signal)" />
    </svg>
  );
}
