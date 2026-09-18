import React, { useState } from 'react';
import { motion } from 'motion/react';
import earthImage from '../assets/images/earth_space_globe_1789732403242.jpg';
import { Radio, Compass, Orbit, Sparkles } from 'lucide-react';

interface AnimatedEarthProps {
  className?: string;
  onExplore?: () => void;
}

export const AnimatedEarth: React.FC<AnimatedEarthProps> = ({
  className = 'w-72 h-72 md:w-84 md:h-84',
  onExplore,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deep Space Background Atmosphere Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-600/30 via-cyan-400/20 to-transparent blur-2xl scale-125 pointer-events-none" />

      {/* Atmospheric Luminous Blue Outer Glow Ring */}
      <motion.div
        animate={{
          scale: isHovered ? [1.02, 1.06, 1.02] : [1, 1.04, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-12px] rounded-full border border-sky-400/40 shadow-[0_0_50px_rgba(56,189,248,0.45)] pointer-events-none"
      />

      {/* Outer Orbit Path with Animated Dash Line */}
      <svg className="absolute inset-[-32px] w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none">
        {/* Inclined Polar Orbit Ellipse */}
        <ellipse
          cx="50%"
          cy="50%"
          rx="48%"
          ry="36%"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeOpacity="0.4"
          transform="rotate(-24 160 160)"
        />
        {/* Secondary Equatorial Orbit */}
        <ellipse
          cx="50%"
          cy="50%"
          rx="51%"
          ry="20%"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="2 8"
          strokeOpacity="0.3"
          transform="rotate(18 160 160)"
        />
      </svg>

      {/* Revolving Satellite 1 (Polar Orbit - Sentinel-2) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-28px] pointer-events-none z-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Satellite Micro Craft with Solar Wings */}
          <div className="relative group/sat cursor-pointer pointer-events-auto">
            <div className="flex items-center gap-0.5 scale-90">
              {/* Solar array left */}
              <div className="w-3.5 h-2 bg-sky-950 border border-sky-400 rounded-xs shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              {/* Central bus */}
              <div className="w-2.5 h-2.5 bg-slate-200 rounded-xs shadow-md border border-white" />
              {/* Solar array right */}
              <div className="w-3.5 h-2 bg-sky-950 border border-sky-400 rounded-xs shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
            </div>

            {/* Radar Beam Pulse Cone downward toward Earth */}
            <motion.div
              animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-sky-400/50 to-transparent pointer-events-none origin-top clip-path-triangle"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Revolving Satellite 2 (SAR Radar - Sentinel-1) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-38px] pointer-events-none z-20"
      >
        <div className="absolute bottom-2 left-8 flex items-center gap-1.5">
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_10px_#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* The Central Photorealistic Earth Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.35)] border border-sky-400/30 group cursor-pointer">
        {/* High-Resolution Earth Globe Photo with Smooth Continuous Axial Drift/Rotation */}
        <motion.div
          animate={{
            x: ['0%', '-30%', '0%'],
            scale: isHovered ? 1.08 : 1.03,
          }}
          transition={{
            x: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 260, damping: 20 },
          }}
          className="absolute -inset-6 w-[160%] h-full flex"
        >
          <img
            src={earthImage}
            alt="Planet Earth in orbit"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
        </motion.div>

        {/* Realistic Night-Side Shadow Gradient (Spherical lighting terminator) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent pointer-events-none mix-blend-multiply" />

        {/* Atmospheric Blue Specular Limb Glow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.2)_0%,rgba(56,189,248,0.25)_30%,rgba(2,132,199,0.5)_70%,transparent_100%)] pointer-events-none" />

        {/* Radial Edge Rim Vignette */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.85)] pointer-events-none" />

        {/* Animated Radar Sweep Overlay */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(56,189,248,0.3) 0deg, rgba(56,189,248,0) 60deg, transparent 360deg)',
          }}
        />

        {/* Center Hover HUD details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={onExplore}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400 text-sky-300 flex items-center justify-center mb-1.5 shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            <Orbit className="w-4 h-4 animate-spin" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">EARTH OBSERVATION</span>
          <span className="text-[10px] text-sky-300 font-mono mt-0.5">ALT: 786 KM • SSO ORBIT</span>
          <span className="text-[10px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Constellation
          </span>
        </motion.div>
      </div>

      {/* Floating Orbital Sensor Telemetry Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 350, damping: 20 }}
        className="absolute -bottom-3 -right-2 bg-[#091526]/90 border border-[#1e3b63] shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(56,189,248,0.25)] rounded-xl px-2.5 py-1.5 flex items-center gap-2 backdrop-blur-md z-30"
      >
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-sky-400" /> Sentinel-2A Live
          </span>
          <span className="text-[11px] font-mono font-bold text-sky-200">10m Ground Res</span>
        </div>
      </motion.div>

      {/* Coordinates / Heading badge on top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 350, damping: 20 }}
        className="absolute -top-2 -left-2 bg-[#091526]/90 border border-[#1e3b63] shadow-[0_8px_20px_rgba(0,0,0,0.6)] rounded-xl px-2 py-1 flex items-center gap-1.5 backdrop-blur-md z-30"
      >
        <Compass className="w-3 h-3 text-sky-400" />
        <span className="text-[10px] font-mono text-slate-300">98.6° INCLINATION</span>
      </motion.div>
    </div>
  );
};
