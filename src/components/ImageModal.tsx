import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { SegmentedLandCoverImage } from './SatelliteVisuals';

interface ImageModalProps {
  src: string;
  title: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="bg-[#0b1526] border border-[#1e3456] rounded-2xl max-w-4xl w-full overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1c3252] flex items-center justify-between bg-[#0e1a2f]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">{title}</span>
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

        {/* Image Display */}
        <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
          {src.startsWith('http') ? (
            <img src={src} alt={title} className="w-full h-full object-contain" />
          ) : (
            <SegmentedLandCoverImage className="w-full h-full object-contain" showOverlay={true} />
          )}
        </div>

        {/* Metadata Bar */}
        <div className="px-5 py-3 bg-[#0a1324] border-t border-[#182942] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>Resolution: <strong className="text-slate-200">10m / GSD</strong></span>
            <span>Projection: <strong className="text-slate-200">WGS84 UTM 33N</strong></span>
            <span>Sensor: <strong className="text-sky-400">Sentinel-2A MSI</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('GeoTIFF download triggered with geo-referencing header.')}
              className="px-3 py-1.5 rounded-lg bg-[#142642] hover:bg-[#1d355c] border border-[#233f6b] text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download GeoTIFF</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
