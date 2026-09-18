import React from 'react';

// Detailed SVG representation of the Earth Orbiting Satellite
export const SatelliteIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow */}
      <circle cx="100" cy="100" r="70" fill="url(#satGlow)" opacity="0.4" />
      
      {/* Central Satellite Body */}
      <g transform="rotate(35 100 100)">
        {/* Left Solar Wing */}
        <g>
          <rect x="25" y="86" width="45" height="28" rx="3" fill="#0f2b48" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="40" y1="86" x2="40" y2="114" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          <line x1="55" y1="86" x2="55" y2="114" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          <line x1="25" y1="100" x2="70" y2="100" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          {/* Connector */}
          <rect x="70" y="98" width="8" height="4" fill="#64748b" />
        </g>

        {/* Bus Body */}
        <rect x="78" y="80" width="44" height="40" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="83" y="85" width="34" height="30" rx="2" fill="#334155" />
        {/* Gold Thermal Multi-layer Insulation patch */}
        <rect x="86" y="88" width="16" height="14" rx="1" fill="#eab308" opacity="0.85" />
        <circle cx="110" cy="95" r="4" fill="#38bdf8" />
        <circle cx="110" cy="95" r="2" fill="#ffffff" />
        
        {/* Right Solar Wing */}
        <g>
          <rect x="122" y="98" width="8" height="4" fill="#64748b" />
          <rect x="130" y="86" width="45" height="28" rx="3" fill="#0f2b48" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="145" y1="86" x2="145" y2="114" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          <line x1="160" y1="86" x2="160" y2="114" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          <line x1="130" y1="100" x2="175" y2="100" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* High Gain Parabolic Dish Antenna */}
        <path d="M100 120 L100 132" stroke="#94a3b8" strokeWidth="2" />
        <path d="M85 136 Q100 128 115 136" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <circle cx="100" cy="130" r="1.5" fill="#38bdf8" />

        {/* Emitted Radar Pulse Waves (Animated in CSS/SVG) */}
        <path d="M80 148 Q100 138 120 148" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" strokeDasharray="3 3">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="strokeWidth" values="1;2;1" dur="2.4s" repeatCount="indefinite" />
        </path>
        <path d="M72 160 Q100 146 128 160" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.4" strokeDasharray="4 4">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
        </path>
      </g>

      <defs>
        <radialGradient id="satGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(70)">
          <stop stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// 3D Isometric Prism for the Explore Earth card
export const PrismIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => {
  return (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="60,10 105,35 60,60 15,35" fill="#1b2a4a" stroke="#38bdf8" strokeWidth="1.2" />
      <polygon points="60,60 105,35 105,48 60,68" fill="#132038" stroke="#1d4ed8" strokeWidth="1" />
      <polygon points="60,60 15,35 15,48 60,68" fill="#0f192d" stroke="#1d4ed8" strokeWidth="1" />
      <circle cx="60" cy="35" r="6" fill="#38bdf8" opacity="0.8" />
      <line x1="60" y1="10" x2="60" y2="35" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
};

// SVG Land Cover segmented imagery (Agricultural fields, river, built up areas)
export const SegmentedLandCoverImage: React.FC<{
  className?: string;
  showOverlay?: boolean;
}> = ({ className = 'w-full h-auto', showOverlay = true }) => {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base Satellite Imagery Background: Fields, Greens, Dirt */}
      <rect width="400" height="260" fill="#1e3a29" />
      
      {/* Field Parcels */}
      <polygon points="10,10 80,15 75,70 12,65" fill="#2d5a37" stroke="#1b3922" strokeWidth="1" />
      <polygon points="85,15 160,10 155,75 80,72" fill="#386b42" stroke="#1b3922" strokeWidth="1" />
      <polygon points="12,70 75,75 70,140 10,135" fill="#477348" stroke="#1b3922" strokeWidth="1" />
      <polygon points="80,78 150,78 145,145 75,142" fill="#2d5233" stroke="#1b3922" strokeWidth="1" />
      <polygon points="155,12 240,15 235,90 160,85" fill="#527c4d" stroke="#1b3922" strokeWidth="1" />
      <polygon points="152,90 230,95 225,160 150,155" fill="#3b653c" stroke="#1b3922" strokeWidth="1" />
      <polygon points="10,140 70,145 65,220 8,215" fill="#234227" stroke="#1b3922" strokeWidth="1" />
      <polygon points="75,148 145,150 140,230 70,225" fill="#386b42" stroke="#1b3922" strokeWidth="1" />
      <polygon points="150,160 220,165 215,245 145,240" fill="#4d7044" stroke="#1b3922" strokeWidth="1" />
      <polygon points="225,170 310,175 305,250 220,248" fill="#2d5a37" stroke="#1b3922" strokeWidth="1" />

      {/* Eastern River (Curving through from top-right to bottom-center-right) */}
      <path
        d="M340,-10 C320,40 330,90 300,130 C270,170 290,220 280,270"
        stroke="#0c3c60"
        strokeWidth="32"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M340,-10 C320,40 330,90 300,130 C270,170 290,220 280,270"
        stroke="#1d6394"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M340,-10 C320,40 330,90 300,130 C270,170 290,220 280,270"
        stroke="#38bdf8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Western/Eastern Vegetation fringes */}
      <circle cx="360" cy="50" r="30" fill="#1b4d2e" />
      <circle cx="370" cy="110" r="25" fill="#225b36" />
      <circle cx="350" cy="180" r="35" fill="#1e4e2c" />

      {/* Towns / Built-up Areas (Red or Orange-Red highlights as shown in reference) */}
      {showOverlay && (
        <g>
          {/* Dense urban core cluster with red overlay */}
          <path
            d="M90,85 Q115,70 145,80 Q175,90 190,110 Q200,140 180,165 Q150,185 120,180 Q85,170 80,140 Q75,105 90,85 Z"
            fill="#ef4444"
            fillOpacity="0.45"
            stroke="#ef4444"
            strokeWidth="2"
          />
          {/* Urban road grid lines */}
          <path d="M100,95 L170,155 M115,165 L160,95 M88,130 L185,130" stroke="#fca5a5" strokeWidth="1.2" opacity="0.9" />
          
          {/* Northern secondary village cluster */}
          <path
            d="M170,30 Q190,20 215,30 Q225,45 215,60 Q195,70 180,60 Z"
            fill="#ef4444"
            fillOpacity="0.45"
            stroke="#ef4444"
            strokeWidth="1.5"
          />

          {/* Southern settlement */}
          <path
            d="M85,190 Q110,185 125,200 Q120,220 100,225 Q80,220 85,190 Z"
            fill="#ef4444"
            fillOpacity="0.45"
            stroke="#ef4444"
            strokeWidth="1.5"
          />

          {/* Agricultural classification overlay (Subtle green tint boundaries) */}
          <rect x="15" y="15" width="60" height="50" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="230" y="20" width="70" height="60" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="150" y="165" width="65" height="70" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      )}

      {/* Clean frame border */}
      <rect x="0.5" y="0.5" width="399" height="259" fill="none" stroke="#2a4365" strokeWidth="1" />
    </svg>
  );
};

// Compare Before (12 May 2024)
export const BeforeSatelliteImage: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="240" height="240" fill="#1d3827" />
      {/* Parcels */}
      <polygon points="10,10 70,12 65,80 12,75" fill="#2d5a37" stroke="#162e1c" />
      <polygon points="75,12 140,10 135,80 70,78" fill="#386b42" stroke="#162e1c" />
      <polygon points="10,85 70,88 65,160 8,155" fill="#477348" stroke="#162e1c" />
      <polygon points="75,90 145,92 140,165 70,162" fill="#2d5233" stroke="#162e1c" />
      <polygon points="10,165 75,168 70,230 12,228" fill="#325a37" stroke="#162e1c" />
      <polygon points="80,170 145,172 140,232 75,230" fill="#284c2f" stroke="#162e1c" />
      {/* Water on right */}
      <path d="M190,-10 C180,50 200,120 180,180 C170,210 175,230 170,250" stroke="#1b4d75" strokeWidth="26" fill="none" />
      
      {/* 2024 Initial compact built-up area (smaller) */}
      <path
        d="M75,95 Q100,85 115,95 Q125,115 115,135 Q95,145 80,135 Q70,115 75,95 Z"
        fill="#ef4444"
        fillOpacity="0.5"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      <path d="M80,105 L110,130 M85,130 L110,105" stroke="#fca5a5" strokeWidth="1" />
      <rect x="0.5" y="0.5" width="239" height="239" fill="none" stroke="#223552" />
    </svg>
  );
};

// Compare After (18 May 2026) - Shows +18.4% expanded built up area!
export const AfterSatelliteImage: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="240" height="240" fill="#1d3827" />
      <polygon points="10,10 70,12 65,80 12,75" fill="#2d5a37" stroke="#162e1c" />
      <polygon points="75,12 140,10 135,80 70,78" fill="#386b42" stroke="#162e1c" />
      <polygon points="10,85 70,88 65,160 8,155" fill="#477348" stroke="#162e1c" />
      <polygon points="75,90 145,92 140,165 70,162" fill="#2d5233" stroke="#162e1c" />
      <polygon points="10,165 75,168 70,230 12,228" fill="#325a37" stroke="#162e1c" />
      <polygon points="80,170 145,172 140,232 75,230" fill="#284c2f" stroke="#162e1c" />
      <path d="M190,-10 C180,50 200,120 180,180 C170,210 175,230 170,250" stroke="#1b4d75" strokeWidth="26" fill="none" />
      
      {/* 2026 Expanded built-up area (+18.4% sprawl into north & south) */}
      <path
        d="M60,80 Q105,65 135,80 Q150,110 138,150 Q110,175 75,165 Q50,145 52,110 Q52,90 60,80 Z"
        fill="#ef4444"
        fillOpacity="0.6"
        stroke="#ef4444"
        strokeWidth="2"
      />
      {/* Northern development corridor */}
      <path
        d="M100,50 Q120,40 135,52 Q130,70 115,72 Z"
        fill="#ef4444"
        fillOpacity="0.65"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      {/* Southern suburban ribbon */}
      <path
        d="M65,170 Q90,165 105,185 Q95,205 75,200 Z"
        fill="#ef4444"
        fillOpacity="0.65"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      <path d="M68,95 L130,150 M75,155 L135,90 M60,120 L140,120" stroke="#fca5a5" strokeWidth="1" />
      <rect x="0.5" y="0.5" width="239" height="239" fill="none" stroke="#223552" />
    </svg>
  );
};

// Change Map Graphic
export const ChangeMapImage: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="160" height="160" fill="#111c2e" />
      {/* Baseline unchanged areas in dark gray/green */}
      <rect x="10" y="10" width="140" height="140" fill="#1e2c40" />
      
      {/* Unchanged stable town core (Yellow) */}
      <ellipse cx="75" cy="80" rx="22" ry="18" fill="#eab308" opacity="0.8" />
      
      {/* New Built-up Expansion (Bright Red) */}
      <path
        d="M50,70 Q75,55 105,65 Q115,85 105,105 Q80,118 55,108 Z"
        stroke="#ef4444"
        strokeWidth="12"
        fill="none"
        opacity="0.9"
      />
      {/* Outlying new clusters */}
      <circle cx="108" cy="52" r="7" fill="#ef4444" />
      <circle cx="58" cy="118" r="8" fill="#ef4444" />
      
      {/* River / Slight decrease in vegetation (Blue) */}
      <path d="M130,0 C120,40 135,90 120,160" stroke="#3b82f6" strokeWidth="8" fill="none" />

      <rect x="0.5" y="0.5" width="159" height="159" fill="none" stroke="#253a56" />
    </svg>
  );
};
