import React, { useState, useRef } from 'react';
import { SensorType } from '../types';
import earthCinematic from '../assets/images/earth_cinematic_orbit_1789733445391.jpg';
import sampleAgri from '../assets/images/satellite_agriculture_1789732427161.jpg';
import sampleCoastal from '../assets/images/satellite_coastal_1789732449183.jpg';
import {
  UploadCloud,
  ArrowRight,
  Image as ImageIcon,
  Radio,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onStartAnalysis: (prompt: string, sensor: SensorType, uploadedImage?: string) => void;
  onSelectSensor: (sensor: SensorType) => void;
  selectedSensor: SensorType;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAnalysis,
  onSelectSensor,
  selectedSensor,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleQuestions = [
    'What land cover is visible?',
    'Highlight water bodies',
    'Detect urban expansion',
    'What changed between seasons?',
  ];

  const exampleCards = [
    {
      title: 'Land cover analysis',
      category: 'Agriculture • Optical',
      image: sampleAgri,
      prompt: 'What land cover is visible and segment crop irrigation fields?',
      sensor: 'optical' as SensorType,
    },
    {
      title: 'Coastal port & waterways',
      category: 'Urban • Sentinel-2',
      image: sampleCoastal,
      prompt: 'Detect coastline water turbidity and shipping corridors.',
      sensor: 'optical' as SensorType,
    },
    {
      title: 'SAR radar backscatter',
      category: 'Terrain • Sentinel-1',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT',
      prompt: 'Identify metallic structures and moisture gradients in SAR radar.',
      sensor: 'sar' as SensorType,
    },
  ];

  const handleSubmit = (text?: string, customImage?: string) => {
    const q = text || promptInput.trim() || 'Analyze this satellite imagery';
    onStartAnalysis(q, selectedSensor, customImage);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onStartAnalysis(
          'What type of land cover and geographic features are visible in this image?',
          selectedSensor,
          reader.result as string
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const currentExample = exampleCards[activeExampleIndex];

  return (
    <div className="relative min-h-[calc(100vh-60px)] w-full overflow-hidden bg-[#030712] text-slate-100 flex flex-col justify-between select-none">
      {/* Hidden file input for upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,.tif,.tiff"
        className="hidden"
      />

      {/* ========================================================================= */}
      {/* RIGHT SIDE: ANIMATED EARTH WITH SUBTLE MOTION THROUGH TIME                */}
      {/* ========================================================================= */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] pointer-events-none overflow-hidden z-0">
        {/* Continuous Natural Breathing/Floating Motion on Earth */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.014, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full flex items-center justify-end"
        >
          {/* Earth Curvature Image */}
          <div className="relative w-full h-full max-w-none lg:w-[130%] lg:h-[130%] -right-10 lg:-right-24 top-0 flex items-center justify-center">
            <img
              src={earthCinematic}
              alt="Planet Earth from Orbit"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-left-center opacity-95"
            />

            {/* Atmospheric Blue Rim & Sunrise Horizon Flare Glow */}
            <motion.div
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_45%_35%,rgba(56,189,248,0.22)_0%,rgba(14,165,233,0.1)_40%,transparent_75%)]"
            />

            {/* Left Vignette Shadow to seamlessly melt into dark space */}
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030712] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent" />
          </div>

          {/* Curved Satellite Orbit Arc SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <path
              d="M -100,220 C 300,60 650,120 1100,320"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Orbiting Satellite with Solar Wings along the Trajectory */}
          <motion.div
            animate={{
              x: [0, 8, 0],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[18%] left-[28%] lg:left-[22%] z-10 flex items-center gap-1 scale-90 sm:scale-100"
          >
            {/* Left Solar Panel */}
            <div className="w-5 h-2.5 bg-[#091b2c] border border-sky-400/80 rounded-xs shadow-[0_0_8px_rgba(56,189,248,0.7)] flex items-center justify-center">
              <div className="w-[1px] h-full bg-sky-400/40" />
            </div>
            {/* Satellite Body */}
            <div className="w-3.5 h-3.5 bg-slate-200 rounded-xs shadow-lg border border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
            </div>
            {/* Right Solar Panel */}
            <div className="w-5 h-2.5 bg-[#091b2c] border border-sky-400/80 rounded-xs shadow-[0_0_8px_rgba(56,189,248,0.7)] flex items-center justify-center">
              <div className="w-[1px] h-full bg-sky-400/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* LEFT SIDE CONTENT: STATIC TYPOGRAPHY, SEARCH CARD & SENSORS               */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-10 sm:pt-14 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 max-w-2xl">
            {/* 1. Static Label (no animation, exact font/spacing) */}
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-slate-400 font-medium font-['Plus_Jakarta_Sans',sans-serif]">
              SATELLITE IMAGERY <span className="text-slate-600 mx-1.5">×</span> AI{' '}
              <span className="text-slate-600 mx-1.5">×</span> NATURAL LANGUAGE
            </div>

            {/* 2. Static Title (no animation, exact pairing: serif italic Earth & through conversation) */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-normal leading-[1.08] text-white tracking-tight select-none">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-normal">Understand </span>
              <span className="font-['Newsreader',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#5eead4] via-[#34d399] to-[#2dd4bf]">
                Earth
              </span>
              <br />
              <span className="font-['Newsreader',serif] italic font-normal text-[#dbeafe]">
                through conversation.
              </span>
            </h1>

            {/* 3. Static Subtitle (no animation) */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal max-w-xl">
              Ask questions in natural language, get pixel-level visual evidence, and explore
              high-resolution satellite observation datasets with conversational{' '}
              <span className="text-[#2dd4bf] font-medium">multi-modal AI.</span>
            </p>

            {/* 4. Translucent Search / Upload Card */}
            <div className="w-full bg-[#081220]/80 border border-[#162740] rounded-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Top Input Row */}
              <div className="flex items-center gap-3">
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload satellite image"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0f1d32] hover:bg-[#172b47] border border-[#1e3454] flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <UploadCloud className="w-5 h-5" />
                </button>

                {/* Question Input */}
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Upload a satellite image or ask a question..."
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none min-w-0"
                />

                {/* Ask AI Button */}
                <button
                  onClick={() => handleSubmit()}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#34d399] hover:from-[#29c4b1] hover:to-[#2ec58d] text-[#051e18] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-[0_0_20px_rgba(45,212,191,0.25)]"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Ask AI</span>
                </button>
              </div>

              {/* "Try asking:" Question Chips */}
              <div className="mt-4 pt-3 border-t border-[#132238] flex flex-col gap-2">
                <span className="text-xs text-slate-400 font-normal">Try asking:</span>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSubmit(q)}
                      className="px-3 py-1.5 rounded-full bg-[#0c182a] hover:bg-[#12233c] border border-[#1a2c47] text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Sensor Switcher Tabs */}
            <div className="flex items-center gap-4 sm:gap-6 pt-1">
              {[
                { id: 'optical', label: 'Optical (RGB)', icon: ImageIcon },
                { id: 'sar', label: 'SAR (Radar)', icon: Radio },
                { id: 'multispectral', label: 'Multispectral', icon: Layers },
              ].map((sensor) => {
                const Icon = sensor.icon;
                const isSelected = selectedSensor === sensor.id;
                return (
                  <button
                    key={sensor.id}
                    onClick={() => onSelectSensor(sensor.id as SensorType)}
                    className={`relative flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer py-1 ${
                      isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#2dd4bf]' : 'text-slate-400'}`} />
                    <span>{sensor.label}</span>

                    {/* Active highlight glow underneath tab */}
                    {isSelected && (
                      <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#2dd4bf] rounded-full shadow-[0_0_8px_#2dd4bf]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Floating Example Satellite Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-end justify-end mt-4 lg:mt-32 pointer-events-auto">
            <div className="w-full max-w-sm flex flex-col gap-2">
              {/* Floating Example Satellite Card */}
              <div
                onClick={() => handleSubmit(currentExample.prompt, currentExample.image)}
                className="group/card w-full bg-[#081322]/85 hover:bg-[#0c1a2d]/90 border border-[#182b45] hover:border-[#2dd4bf]/60 rounded-2xl p-3 flex items-center gap-3.5 shadow-2xl backdrop-blur-xl transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-18 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-[#1d3556]">
                  <img
                    src={currentExample.image}
                    alt={currentExample.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="self-start px-2 py-0.5 rounded bg-[#102035] border border-[#1b3457] text-[10px] font-semibold text-[#2dd4bf] uppercase tracking-wider mb-1">
                    EXAMPLE
                  </div>
                  <h3 className="text-sm font-semibold text-white truncate">
                    {currentExample.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{currentExample.category}</p>
                </div>

                {/* Arrow Action Button */}
                <div className="w-8 h-8 rounded-full bg-[#102035] group-hover/card:bg-[#2dd4bf] text-slate-300 group-hover/card:text-[#051e18] flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 py-1">
                {exampleCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveExampleIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeExampleIndex === idx
                        ? 'w-4 bg-[#2dd4bf] shadow-[0_0_6px_#2dd4bf]'
                        : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER & EMERALD WAVE WITH SERIF QUOTE                             */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#0e1c2e]">
        {/* Left Footer Details */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {/* Planet icon */}
          <div className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                transform="rotate(-25 12 12)"
              />
            </svg>
          </div>
          <span>
            Powered by remote sensing <span className="mx-1.5">•</span> Fine-tuned on BigEarthNet{' '}
            <span className="mx-1.5">•</span> Built for a sustainable tomorrow
          </span>
        </div>

        {/* Right Corner: Quote in Serif Italic */}
        <div className="hidden md:flex flex-col items-end text-right font-['Newsreader',serif] italic text-slate-400 text-sm leading-tight">
          <span className="text-slate-400">Better insights.</span>
          <span className="text-slate-300">A healthier planet.</span>
        </div>
      </div>

      {/* Bottom Right Emerald Aurora Gradient Subtle Wave */}
      <div className="absolute bottom-0 right-0 w-96 h-40 bg-gradient-to-t from-emerald-950/20 via-teal-950/10 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
