type AuthBackgroundProps = {
  isDark: boolean
}

export default function AuthBackground({ isDark }: AuthBackgroundProps) {
  if (!isDark) return <LightBackground />
  return <DarkBackground />
}

function LightBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f0f4ff]">
      {/* Soft orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-300/30 blur-[120px] animate-pulse" />
      <div
        className="absolute top-1/2 -right-60 h-[600px] w-[600px] rounded-full bg-indigo-300/25 blur-[140px]"
        style={{ animation: 'pulse 6s ease-in-out infinite 2s' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-sky-300/20 blur-[100px]"
        style={{ animation: 'pulse 8s ease-in-out infinite 1s' }}
      />

      {/* Dot grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid-light" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#93c5fd" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-light)" />
      </svg>

      {/* Animated chart lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ll-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="ll-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="ll-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <style>{`polyline { stroke-dasharray: 3000; }`}</style>
        </defs>

        <polyline
          points="0,700 120,660 240,680 360,600 480,540 600,510 720,470 840,420 960,380 1080,330 1200,290 1320,240 1440,200"
          fill="none"
          stroke="url(#ll-line-1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          <animate attributeName="stroke-dashoffset" from="3000" to="0" dur="4s" fill="freeze" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
        </polyline>

        <polygon
          points="0,700 120,660 240,680 360,600 480,540 600,510 720,470 840,420 960,380 1080,330 1200,290 1320,240 1440,200 1440,900 0,900"
          fill="url(#ll-fill-1)"
        >
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
        </polygon>

        <polyline
          points="0,820 180,780 300,810 420,750 540,790 660,720 780,760 900,690 1020,730 1140,660 1260,700 1440,640"
          fill="none"
          stroke="url(#ll-line-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        >
          <animate attributeName="stroke-dashoffset" from="3000" to="0" dur="5s" fill="freeze" begin="0.5s" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 8; 0 0" dur="10s" repeatCount="indefinite" />
        </polyline>

        {([
          [360, 600], [600, 510], [840, 420], [1080, 330], [1320, 240],
        ] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill="#3b82f6" opacity="0.6">
              <animate attributeName="r" values="4;6;4" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="10" fill="#3b82f6" opacity="0.1">
              <animate attributeName="r" values="10;16;10" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        <text x="100" y="200" fill="#1d4ed8" fontSize="11" fontFamily="monospace" opacity="0.25">
          +2.4%
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.08;0" dur="12s" repeatCount="indefinite" />
        </text>
        <text x="900" y="160" fill="#1d4ed8" fontSize="11" fontFamily="monospace" opacity="0.25">
          R$ 4.820
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="10s" begin="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.08;0" dur="10s" begin="3s" repeatCount="indefinite" />
        </text>
        <text x="500" y="260" fill="#1d4ed8" fontSize="11" fontFamily="monospace" opacity="0.25">
          +12.7%
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="14s" begin="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.08;0" dur="14s" begin="6s" repeatCount="indefinite" />
        </text>
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/40" />
    </div>
  )
}

function DarkBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0f1e]">
      {/* Gradient orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
      <div
        className="absolute top-1/2 -right-60 h-[600px] w-[600px] rounded-full bg-indigo-500/15 blur-[140px]"
        style={{ animation: 'pulse 6s ease-in-out infinite 2s' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
        style={{ animation: 'pulse 8s ease-in-out infinite 1s' }}
      />

      {/* Dot grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid-dark" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-dark)" />
      </svg>

      {/* Animated chart lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dl-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dl-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dl-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <style>{`polyline { stroke-dasharray: 3000; }`}</style>
        </defs>

        <polyline
          points="0,700 120,660 240,680 360,600 480,540 600,510 720,470 840,420 960,380 1080,330 1200,290 1320,240 1440,200"
          fill="none"
          stroke="url(#dl-line-1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        >
          <animate attributeName="stroke-dashoffset" from="3000" to="0" dur="4s" fill="freeze" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
        </polyline>

        <polygon
          points="0,700 120,660 240,680 360,600 480,540 600,510 720,470 840,420 960,380 1080,330 1200,290 1320,240 1440,200 1440,900 0,900"
          fill="url(#dl-fill-1)"
          opacity="0.1"
        >
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
        </polygon>

        <polyline
          points="0,820 180,780 300,810 420,750 540,790 660,720 780,760 900,690 1020,730 1140,660 1260,700 1440,640"
          fill="none"
          stroke="url(#dl-line-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        >
          <animate attributeName="stroke-dashoffset" from="3000" to="0" dur="5s" fill="freeze" begin="0.5s" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 8; 0 0" dur="10s" repeatCount="indefinite" />
        </polyline>

        {([
          [360, 600], [600, 510], [840, 420], [1080, 330], [1320, 240],
        ] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill="#3b82f6" opacity="0.7">
              <animate attributeName="r" values="4;6;4" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="10" fill="#3b82f6" opacity="0.15">
              <animate attributeName="r" values="10;16;10" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="8s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        <text x="100" y="200" fill="white" fontSize="11" fontFamily="monospace" opacity="0.15">
          +2.4%
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0" dur="12s" repeatCount="indefinite" />
        </text>
        <text x="900" y="160" fill="white" fontSize="11" fontFamily="monospace" opacity="0.15">
          R$ 4.820
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="10s" begin="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0" dur="10s" begin="3s" repeatCount="indefinite" />
        </text>
        <text x="500" y="260" fill="white" fontSize="11" fontFamily="monospace" opacity="0.15">
          +12.7%
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -30;0 -30" dur="14s" begin="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0" dur="14s" begin="6s" repeatCount="indefinite" />
        </text>
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e]/60" />
    </div>
  )
}
