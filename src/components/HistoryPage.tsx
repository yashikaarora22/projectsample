import React from 'react';
import { Page, HistoryItem } from '../types';
import { SegmentedLandCoverImage, BeforeSatelliteImage, AfterSatelliteImage } from './SatelliteVisuals';
import { ArrowLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryPageProps {
  onNavigate: (page: Page, prompt?: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const historyItems: HistoryItem[] = [
    {
      id: 'h-1',
      title: 'Land cover analysis',
      category: 'Single image • VQA',
      time: 'Today, 10:24 AM',
      thumbnail: 'land-cover',
      pageTarget: 'analyze',
      sensor: 'Optical (Sentinel-2)',
      query: 'What type of land cover is visible in this image?',
    },
    {
      id: 'h-2',
      title: 'Change detection',
      category: 'Bi-temporal • Change map',
      time: 'Yesterday, 4:12 PM',
      thumbnail: 'change-detection',
      pageTarget: 'compare',
      sensor: 'Optical Pair (2024-2026)',
      query: 'Detect urban expansion and built-up changes.',
    },
    {
      id: 'h-3',
      title: 'Optical + SAR analysis',
      category: 'Cross-modal • Information extraction',
      time: '16 Sep, 2026',
      thumbnail: 'sar-fusion',
      pageTarget: 'cross-modal',
      sensor: 'Sentinel-2 + Sentinel-1',
      query: 'Using optical and SAR data, verify consistent built-up areas.',
    },
    {
      id: 'h-4',
      title: 'Water body detection',
      category: 'Single image • Grounding',
      time: '14 Sep, 2026',
      thumbnail: 'water-body',
      pageTarget: 'analyze',
      sensor: 'Multispectral (NDWI)',
      query: 'Highlight water bodies and river course delineation.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#070e1b] px-4 sm:px-8 md:px-12 py-8 flex flex-col justify-between max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#16253c] pb-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Analysis History
            </h1>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {historyItems.length} Archived Sessions
          </span>
        </div>

        {/* History Cards List matching Page 5 */}
        <div className="flex flex-col gap-3">
          {historyItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24, delay: idx * 0.07 }}
              whileHover={{ scale: 1.015, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.pageTarget, item.query)}
              className="bg-[#0d1829] hover:bg-[#122238] border border-[#1d314d] hover:border-sky-500/50 rounded-2xl p-4 sm:p-4.5 flex items-center justify-between gap-4 transition-all cursor-pointer shadow-md group"
            >
              {/* Left side: Thumbnail + Title & Subtitle */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail with Spring Zoom */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#233b5c] bg-black/50 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all duration-200">
                  {item.thumbnail === 'land-cover' && (
                    <SegmentedLandCoverImage className="w-full h-full object-cover" showOverlay={true} />
                  )}
                  {item.thumbnail === 'change-detection' && (
                    <AfterSatelliteImage className="w-full h-full object-cover" />
                  )}
                  {item.thumbnail === 'sar-fusion' && (
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT"
                      alt="SAR Radar Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {item.thumbnail === 'water-body' && (
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG"
                      alt="Water Body Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Text Block */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="truncate">{item.category}</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side: Chevron */}
              <div className="w-8 h-8 rounded-full bg-[#13233c] group-hover:bg-sky-500/20 text-slate-400 group-hover:text-sky-400 flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Link: View all analyses */}
      <div className="pt-8 pb-4 flex items-center justify-center">
        <button
          onClick={() => alert('All 24 historical satellite analysis sessions loaded.')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
        >
          <Clock className="w-4 h-4" />
          <span>View all analyses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
