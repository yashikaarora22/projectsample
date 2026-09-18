import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0e131f] border border-[#242a36] rounded-xl shadow-2xl p-6 flex flex-col gap-4 font-mono text-[#dde2f3] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#1a202c] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[22px]">settings</span>
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase tracking-wider">
              SatQuery AI // System Profile &amp; ISRO SIH Core
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#242a36] text-[#b9cacb] hover:text-[#dbfcff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Hackathon Header */}
        <div className="p-3 bg-[#161c28] border border-[#242a36] rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#7df4ff] block uppercase font-bold">SMART INDIA HACKATHON 2026</span>
            <span className="text-sm font-bold text-[#dbfcff]">PROBLEM STATEMENT ID: 26167</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] text-[10px] font-bold uppercase">
            ISRO / DOS
          </span>
        </div>

        <div className="text-xs text-[#b9cacb] leading-relaxed space-y-2">
          <p>
            <strong className="text-[#dbfcff]">Title:</strong> SatQuery AI - An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries.
          </p>
          <p>
            <strong className="text-[#dbfcff]">Organization:</strong> Indian Space Research Organisation (ISRO) / Department of Space.
          </p>
          <p>
            <strong className="text-[#dbfcff]">Theme:</strong> Space Technology | Multimodal Optical, Multispectral, and Synthetic Aperture Radar (SAR) Fusion.
          </p>
        </div>

        {/* Benchmark Datasets */}
        <div className="space-y-2">
          <span className="text-[11px] text-[#7df4ff] font-bold uppercase block">
            TRAINING &amp; EVALUATION BENCHMARKS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
              <span className="text-[#00f0ff] font-semibold block">BigEarthNet-MM</span>
              <span className="text-[#b9cacb] text-[11px]">
                Co-registered Sentinel-1 SAR &amp; Sentinel-2 MSI with diverse multi-label land cover annotations.
              </span>
            </div>
            <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
              <span className="text-[#00f0ff] font-semibold block">VRSBench</span>
              <span className="text-[#b9cacb] text-[11px]">
                Visual Question Answering &amp; Referring Expression Segmentation for remote-sensing earth observation.
              </span>
            </div>
          </div>
        </div>

        {/* Inference Stack */}
        <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] space-y-1.5 text-xs">
          <span className="text-[#7df4ff] font-semibold block">INFERENCE ENGINE SPECIFICATIONS:</span>
          <div className="flex justify-between text-[#b9cacb]">
            <span>Model Pipeline:</span>
            <span className="text-[#dbfcff]">SatQuery-LLaVA-GEO 70B / Gemini 3.8 Flash</span>
          </div>
          <div className="flex justify-between text-[#b9cacb]">
            <span>Ground Resolution:</span>
            <span className="text-[#dbfcff]">0.31m - 10m Multi-Scale Pyramid</span>
          </div>
          <div className="flex justify-between text-[#b9cacb]">
            <span>Radar Polarizations:</span>
            <span className="text-[#dbfcff]">VV, VH, HH, HV (C/L/X-Band)</span>
          </div>
          <div className="flex justify-between text-[#b9cacb]">
            <span>Orbital Propagator:</span>
            <span className="text-[#dbfcff]">SGP4 / Keplerian J2000.0</span>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#1a202c]">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00f0ff] text-[#00363a] font-bold text-xs hover:bg-[#7df4ff] transition-colors cursor-pointer"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
