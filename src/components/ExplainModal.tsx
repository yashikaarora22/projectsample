import React from 'react';
import { X, Cpu, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ExplainModalProps {
  onClose: () => void;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="bg-[#0c182b] border border-[#1e3456] rounded-2xl max-w-xl w-full p-6 flex flex-col gap-5 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1c3252] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">How Was This Answered?</h2>
              <span className="text-[11px] text-slate-400">Vision-Language Model Inference Pipeline</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#182a46] hover:bg-[#233a60] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Breakdown Steps */}
        <div className="flex flex-col gap-3.5 text-xs text-slate-300">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-3 bg-[#08101d] rounded-xl border border-[#162740] flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                1. Multi-Spectral Band Alignment
              </span>
              <span className="text-[10px] font-mono text-sky-400">Sentinel-2 L2A</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Ingested visible RGB (B4, B3, B2) plus Near-Infrared (B8 at 842nm) to calculate
              chlorophyll reflectance gradients across agricultural crop boundaries.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-3 bg-[#08101d] rounded-xl border border-[#162740] flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                2. Spectral Index Segmentation
              </span>
              <span className="text-[10px] font-mono text-emerald-400">NDVI &amp; NDWI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Water pixels isolated using NDWI = (B3 - B8) / (B3 + B8) &gt; 0.12. Healthy vegetation
              isolated using NDVI = (B8 - B4) / (B8 + B4) &gt; 0.45.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-3 bg-[#08101d] rounded-xl border border-[#162740] flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                3. Spatial Token Cross-Attention
              </span>
              <span className="text-[10px] font-mono text-amber-300">Confidence 92%</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The SatQuery-LLaVA-GEO multi-modal transformer parsed the natural language question,
              localized the river in the eastern sector, and segmented built-up town clusters.
            </p>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-[#182942]">
          <span>Processing Latency: 124ms</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer shadow-md"
          >
            Got it
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
