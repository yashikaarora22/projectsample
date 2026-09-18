import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080e1a] border-t border-[#1a202c] py-8 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="font-['Space_Grotesk'] text-sm font-bold text-[#dbfcff] uppercase tracking-wide">
            SatQuery AI Global Constellation Core
          </span>
          <span className="text-[11px] text-[#b9cacb] font-sans">
            Active Platforms: 24 LEO Sats | Spectral Ingestion Rate: 1.4 TB/min | Orbital Trajectory Model: SGP4-Rev8
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-[#b9cacb] text-[11px]">
          <span className="flex items-center gap-1">
            <span className="text-[#7df4ff] font-semibold">API LATENCY:</span> 14ms
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
            SYSTEM STATUS: NOMINAL
          </span>
          <span className="text-[#849495]">© 2026 SatQuery AI Remote Sensing (ISRO SIH-26167)</span>
        </div>
      </div>
    </footer>
  );
};
