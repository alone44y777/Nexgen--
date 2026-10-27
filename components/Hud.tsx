export default function Hud() {
  return (
    <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-[300px] md:max-w-[380px]" role="img" aria-label="Decorative HUD">
      <g fill="none" stroke="rgb(var(--accent))" strokeWidth="1">
        <circle cx="150" cy="150" r="140" opacity=".35" />
        <circle cx="150" cy="150" r="110" strokeDasharray="4 10" style={{ transformOrigin: "150px 150px", animation: "spin 40s linear infinite" }} />
        <circle cx="150" cy="150" r="80" strokeDasharray="60 20" strokeWidth="2" style={{ transformOrigin: "150px 150px", animation: "spin 24s linear infinite reverse" }} />
        <circle cx="150" cy="150" r="48" opacity=".6" />
        <path d="M150 10v40M150 250v40M10 150h40M250 150h40" opacity=".7" />
        <path d="M150 120l25 15v30l-25 15-25-15v-30z" fill="rgb(var(--accent)/.15)" />
      </g>
      <g fontFamily="monospace" fontSize="8" fill="rgb(var(--muted))"><text x="12" y="14">LAT 30.3753 N</text><text x="205" y="292">LON 69.3451 E</text></g>
    </svg>
  );
          }
