import React, { useState } from 'react';
import { Page } from '../types';
import { SegmentedLandCoverImage } from './SatelliteVisuals';
import { ArrowLeft, Plus, CheckCircle, Sparkles, Maximize2, Paperclip, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CrossModalPageProps {
  onNavigate: (page: Page) => void;
  onOpenFullImage: (src: string, title: string) => void;
}

export const CrossModalPage: React.FC<CrossModalPageProps> = ({ onNavigate, onOpenFullImage }) => {
  const [followUpText, setFollowUpText] = useState('');
  const [additionalChat, setAdditionalChat] = useState<string[]>([]);

  const handleSend = () => {
    if (!followUpText.trim()) return;
    const text = followUpText.trim();
    setFollowUpText('');
    setAdditionalChat((prev) => [
      ...prev,
      `Cross-modal alignment verified for "${text}". Polarimetric VV/VH backscatter ratio confirms specular metallic structural response congruent with optical spectral reflectance (10m grid).`,
    ]);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#070e1b] px-4 sm:px-8 md:px-12 py-8 flex flex-col justify-between max-w-5xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-[#16253c] pb-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Cross-Modal Analysis
            </h1>
          </button>

          <span className="text-xs font-medium text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full">
            Optical + SAR Co-Registration
          </span>
        </div>

        {/* Top Paired Sensor Containers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="bg-[#0d1829] border border-[#1d314d] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
            {/* Left Card: Optical Sentinel-2 (5 cols) */}
            <motion.div
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="sm:col-span-5 flex flex-col gap-2"
            >
              <span className="text-xs font-semibold text-white">Optical (Sentinel-2)</span>
              <div
                onClick={() =>
                  onOpenFullImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                    'Optical Band (Sentinel-2 Multi-Spectral)'
                  )
                }
                className="aspect-[16/10] w-full rounded-xl overflow-hidden relative cursor-pointer group border border-[#213757] hover:border-sky-400/60 bg-black/40 shadow-md transition-colors"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG"
                  alt="Optical Sentinel-2 imagery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-sky-300 font-mono">
                  B4-B3-B2 (10m)
                </div>
              </div>
            </motion.div>

            {/* Center Plus Icon with Pulsing Spring (1 col) */}
            <div className="sm:col-span-1 flex items-center justify-center py-2 sm:py-0">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-9 h-9 rounded-full bg-[#12223a] border border-[#213b63] flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Right Card: SAR Sentinel-1 (5 cols) */}
            <motion.div
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="sm:col-span-5 flex flex-col gap-2"
            >
              <span className="text-xs font-semibold text-white">SAR (Sentinel-1)</span>
              <div
                onClick={() =>
                  onOpenFullImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT',
                    'SAR Backscatter (Sentinel-1 C-Band)'
                  )
                }
                className="aspect-[16/10] w-full rounded-xl overflow-hidden relative cursor-pointer group border border-[#213757] hover:border-sky-400/60 bg-black/40 shadow-md transition-colors"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT"
                  alt="SAR Sentinel-1 radar backscatter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-emerald-400 font-mono">
                  VV/VH DUAL-POL
                </div>
              </div>
            </motion.div>
          </div>

          {/* Centered Green Badge: Same location detected with Spring Pop-In */}
          <div className="flex items-center justify-center pt-2">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 18, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-xs font-medium text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Same location detected</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom AI Response Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.15 }}
          className="bg-[#0d1829] border border-[#1d314d] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-[#091222] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </div>
              <span className="text-xs font-semibold text-white">SatQuery AI</span>
            </div>
            <motion.span
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-[11px] font-medium text-sky-300 bg-sky-950/70 border border-sky-400/40 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.2)]"
            >
              Confidence: 91%
            </motion.span>
          </div>

          {/* Body Text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Using optical and SAR data, I identified built-up regions that are consistent across both
            images.
          </p>

          {/* Segmented Image Preview with Red Highlight & Built-up Area Tag */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#091222] p-3 rounded-xl border border-[#1c3252] shadow-inner"
          >
            <div
              onClick={() =>
                onOpenFullImage(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                  'Cross-Modal Built-Up Mask'
                )
              }
              className="w-48 aspect-[16/9] rounded-lg overflow-hidden relative cursor-pointer group shrink-0"
            >
              <SegmentedLandCoverImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" showOverlay={true} />
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200">Built-up area</span>
            </div>
          </motion.div>

          {/* View Evidence Action Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                onOpenFullImage(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG',
                  'Cross-Modal Co-Registration Evidence'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111f36] hover:bg-[#1a2e4f] border border-[#1f3559] hover:border-sky-400/60 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
              <span>View evidence</span>
            </motion.button>
          </div>

          {/* Follow-up responses if any */}
          {additionalChat.map((chat, idx) => (
            <div key={idx} className="p-3 bg-[#0a1324] border border-[#182942] rounded-xl text-xs text-slate-300 mt-2">
              {chat}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Follow-up Input Bar */}
      <div className="pt-6">
        <div className="flex items-center gap-2 bg-[#0e192c] border border-[#1d3356] rounded-full p-1.5 pl-4 pr-1.5 shadow-lg focus-within:border-sky-400 focus-within:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
          <button
            onClick={() => alert('Attached radar backscatter matrix.')}
            className="text-slate-400 hover:text-sky-300 p-1 rounded-full cursor-pointer transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none min-w-0"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md"
            title="Send follow-up"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
