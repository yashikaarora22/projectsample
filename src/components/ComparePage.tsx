import React, { useState } from 'react';
import { Page } from '../types';
import { BeforeSatelliteImage, AfterSatelliteImage, ChangeMapImage } from './SatelliteVisuals';
import { ArrowLeft, ArrowRight, TrendingUp, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface ComparePageProps {
  onNavigate: (page: Page) => void;
  onOpenFullImage: (src: string, title: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigate, onOpenFullImage }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#070e1b] px-4 sm:px-8 md:px-12 py-8 flex flex-col justify-between max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#16253c] pb-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Compare Images</h1>
          </button>

          <span className="text-xs font-medium text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full">
            Bi-Temporal Change Detection
          </span>
        </div>

        {/* 3 Main Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: Before (12 May 2024) - 4 cols with Spring Pop-In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            whileHover={{ scale: 1.018, y: -3 }}
            className="md:col-span-4 bg-[#0d1829] border border-[#1d314d] hover:border-sky-500/40 rounded-2xl p-4 flex flex-col gap-3 shadow-lg transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Before</span>
              <span className="text-xs text-slate-400 font-mono">12 May 2024</span>
            </div>
            <div
              onClick={() =>
                onOpenFullImage(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT',
                  'Sentinel-2 MSI Reference (12 May 2024)'
                )
              }
              className="w-full aspect-square rounded-xl overflow-hidden relative cursor-pointer group bg-black/40"
            >
              <BeforeSatelliteImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-slate-300 font-mono">
                BASE REF: 2024
              </div>
            </div>
          </motion.div>

          {/* Center Transition Indicator (Mobile / Desktop Arrow with Spring Pulse) */}
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-[#12223a] border border-[#213b63] flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Card 2: After (18 May 2026) - 4 cols with Spring Pop-In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.08 }}
            whileHover={{ scale: 1.018, y: -3 }}
            className="md:col-span-4 bg-[#0d1829] border border-[#1d314d] hover:border-sky-500/40 rounded-2xl p-4 flex flex-col gap-3 shadow-lg transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">After</span>
              <span className="text-xs text-slate-400 font-mono">18 May 2026</span>
            </div>
            <div
              onClick={() =>
                onOpenFullImage(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                  'Sentinel-2 MSI Target (18 May 2026)'
                )
              }
              className="w-full aspect-square rounded-xl overflow-hidden relative cursor-pointer group bg-black/40"
            >
              <AfterSatelliteImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-emerald-400 font-mono">
                CURRENT: 2026
              </div>
            </div>
          </motion.div>

          {/* Card 3: Change Analysis Stats & Map - 3 cols with Spring Pop-In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.16 }}
            className="md:col-span-3 bg-[#0d1829] border border-[#1d314d] rounded-2xl p-4 flex flex-col justify-between shadow-lg"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-white">Change Analysis</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Built-up area increased</span>
                {/* Metric Pop-Up Badge */}
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight"
                  >
                    +18.4%
                  </motion.span>
                  <span className="text-sm font-semibold text-emerald-400">↗</span>
                </div>
                <span className="text-[11px] text-slate-500">in the highlighted region</span>
              </div>

              {/* Change Map Visual */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-300">Change Map</span>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 rounded-lg overflow-hidden border border-[#233b5d] shrink-0 shadow-inner"
                  >
                    <ChangeMapImage className="w-full h-full object-cover" />
                  </motion.div>
                  {/* Legend */}
                  <div className="flex flex-col gap-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>New built-up</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span>No change</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Decrease</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Details Button with Spring Pop */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowDetailsModal(true)}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#13243d] hover:bg-[#1c3559] border border-[#223d66] hover:border-sky-400/60 text-xs font-medium text-sky-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.25 }}
          className="bg-[#0d1829] border border-[#1d314d] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-[#142642] border border-[#233d66] flex items-center justify-center text-sky-400 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-white">Summary</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              The built-up area increased by 18.4% between 12 May 2024 and 18 May 2026, mainly in the
              central and southern regions.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Details Modal with Spring Pop-Up */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 25 }}
            className="bg-[#0e1b2e] border border-[#233d66] rounded-2xl max-w-lg w-full p-6 flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <span className="text-base font-bold text-white">Change Analysis Metrics</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                ✕ Close
              </motion.button>
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex justify-between p-2 rounded bg-[#13233c]">
                <span>Analysis Interval:</span>
                <span className="font-semibold text-white">736 Days (2.01 Years)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#13233c]">
                <span>Net Built-up Expansion:</span>
                <span className="font-semibold text-emerald-400">+18.4% (3.42 km²)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#13233c]">
                <span>Vegetation Conversion:</span>
                <span className="font-semibold text-amber-300">-12.1% (2.25 km²)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#13233c]">
                <span>Water Surface Variation:</span>
                <span className="font-semibold text-sky-400">-0.8% (Stable Riverbed)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#13233c]">
                <span>Sensor Pair:</span>
                <span className="font-semibold text-white">Sentinel-2A &amp; Sentinel-2B (MSI 10m)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Confidence evaluation computed across bi-temporal NDVI difference and Normalized
              Difference Built-Up Index (NDBI).
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};
