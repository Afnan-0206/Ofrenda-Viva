import React from 'react';

/**
 * CempasuchilDecorations — Botanical vector graphics for the Marigold Arch (Arco),
 * floor petal pathways (Camino de Cempasúchil), and frame garlands.
 * Eliminates all raw text emoji characters and replaces them with realistic Mexican flora.
 */

// A single realistic miniature marigold blossom for decorative borders
export function MiniMarigold({ size = 20, color = '#ff8c00', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={`mini-marigold ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`miniCore-${color.replace('#','')}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#c1121f" />
        </radialGradient>
      </defs>
      {/* Outer petal ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="20"
          rx="6"
          ry="14"
          transform={`rotate(${deg} 20 20)`}
          fill={color}
          opacity="0.9"
        />
      ))}
      {/* Mid petal ring */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="20"
          rx="5"
          ry="11"
          transform={`rotate(${deg} 20 20)`}
          fill="#ffb703"
        />
      ))}
      {/* Golden center */}
      <circle cx="20" cy="20" r="5" fill={`url(#miniCore-${color.replace('#','')})`} />
    </svg>
  );
}

// Natural Botanical Arch of Marigolds (Arco de Cempasúchil)
export function BotanicalMarigoldArch({ title = 'MICTLÁN • ETERNO RECUERDO' }) {
  return (
    <div className="botanical-arch-wrapper" aria-hidden="true">
      <svg
        className="botanical-arch-svg"
        viewBox="0 0 1000 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vineStem" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1b4332" />
            <stop offset="50%" stopColor="#2d6a4f" />
            <stop offset="100%" stopColor="#1b4332" />
          </linearGradient>
          <filter id="archGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ff8c00" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Thick curved woven willow / palm branch base */}
        <path
          d="M 50 120 Q 500 -20 950 120"
          stroke="url(#vineStem)"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#archGlow)"
        />
        <path
          d="M 60 125 Q 500 -10 940 125"
          stroke="#40916c"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="12 16"
        />
      </svg>

      {/* Cluster of dense, lush marigold blooms along the arch */}
      <div className="arch-blooms-garland">
        <div className="arch-garland-side left">
          <MiniMarigold size={36} color="#e85d04" />
          <MiniMarigold size={30} color="#ffb703" />
          <MiniMarigold size={38} color="#ff8c00" />
          <MiniMarigold size={32} color="#f48c06" />
          <MiniMarigold size={36} color="#e85d04" />
          <MiniMarigold size={28} color="#ffb703" />
        </div>

        {/* Central Arch Medallion */}
        <div className="arch-center-medallion">
          <div className="medallion-crest-flower">
            <MiniMarigold size={40} color="#ff8c00" />
          </div>
          <span className="medallion-title">{title}</span>
          <div className="medallion-crest-flower">
            <MiniMarigold size={40} color="#ff8c00" />
          </div>
        </div>

        <div className="arch-garland-side right">
          <MiniMarigold size={28} color="#ffb703" />
          <MiniMarigold size={36} color="#e85d04" />
          <MiniMarigold size={32} color="#f48c06" />
          <MiniMarigold size={38} color="#ff8c00" />
          <MiniMarigold size={30} color="#ffb703" />
          <MiniMarigold size={36} color="#e85d04" />
        </div>
      </div>
    </div>
  );
}

// Scattered Marigold Petal Pathway on Floor (Camino de Cempasúchil)
export function BotanicalPetalFloorPath({ onClick, label }) {
  // Pre-computed organic petal positions and rotations
  const petals = [
    { x: 4, y: 35, rot: 25, s: 1.1, c: '#ff8c00' },
    { x: 10, y: 15, rot: -40, s: 0.9, c: '#ffb703' },
    { x: 16, y: 45, rot: 80, s: 1.2, c: '#e85d04' },
    { x: 22, y: 20, rot: -15, s: 0.85, c: '#ffa500' },
    { x: 28, y: 40, rot: 45, s: 1.0, c: '#ff8c00' },
    { x: 35, y: 18, rot: 110, s: 1.15, c: '#e85d04' },
    { x: 42, y: 38, rot: -60, s: 0.95, c: '#ffb703' },
    { x: 49, y: 22, rot: 30, s: 1.2, c: '#ff8c00' },
    { x: 56, y: 44, rot: -20, s: 0.9, c: '#ffa500' },
    { x: 63, y: 16, rot: 75, s: 1.1, c: '#e85d04' },
    { x: 70, y: 38, rot: -50, s: 1.0, c: '#ffb703' },
    { x: 77, y: 20, rot: 15, s: 1.25, c: '#ff8c00' },
    { x: 84, y: 42, rot: 60, s: 0.85, c: '#e85d04' },
    { x: 91, y: 22, rot: -35, s: 1.1, c: '#ffa500' },
    { x: 96, y: 36, rot: 40, s: 0.95, c: '#ff8c00' }
  ];

  return (
    <div
      className="botanical-petal-floor-path"
      onClick={onClick}
      role="button"
      tabIndex={0}
      title="Camino sagrado de cempasúchil • Haz clic para esparcir más pétalos"
    >
      <svg
        className="floor-path-svg"
        viewBox="0 0 1000 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1a0800" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Organic marigold petals strewn across the stone/wood floor */}
        {petals.map((p, i) => (
          <g
            key={i}
            transform={`translate(${p.x * 10}, ${p.y}) rotate(${p.rot}) scale(${p.s})`}
            filter="url(#petalShadow)"
          >
            {/* Curved organic petal shape */}
            <path
              d="M 0 -10 C 6 -6 6 6 0 10 C -6 6 -6 -6 0 -10 Z"
              fill={p.c}
              opacity="0.92"
            />
            {/* Center petal vein */}
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffffff" strokeWidth="0.6" opacity="0.3" />
          </g>
        ))}

        {/* Scattered natural pollen dust particles */}
        <circle cx="120" cy="50" r="1.5" fill="#ffd700" opacity="0.7" />
        <circle cx="280" cy="25" r="1.5" fill="#ffd700" opacity="0.7" />
        <circle cx="450" cy="55" r="1.5" fill="#ffd700" opacity="0.7" />
        <circle cx="680" cy="30" r="1.5" fill="#ffd700" opacity="0.7" />
        <circle cx="850" cy="52" r="1.5" fill="#ffd700" opacity="0.7" />
      </svg>

      <div className="floor-path-label-row">
        <MiniMarigold size={18} color="#ff8c00" />
        <span className="floor-path-caption">{label}</span>
        <MiniMarigold size={18} color="#ff8c00" />
      </div>
    </div>
  );
}

// Frame top marigold garland for AncestorCard
export function FrameMarigoldGarland() {
  return (
    <div className="frame-marigolds-botanical" aria-hidden="true">
      <MiniMarigold size={18} color="#e85d04" />
      <MiniMarigold size={24} color="#ff8c00" className="center-flower" />
      <MiniMarigold size={18} color="#ffb703" />
    </div>
  );
}
