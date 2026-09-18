import React from 'react';
import { ClassifiedTarget } from '../types';

interface TargetModalProps {
  target: ClassifiedTarget | null;
  onClose: () => void;
}

export const TargetModal: React.FC<TargetModalProps> = ({ target, onClose }) => {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e131f] border border-[#242a36] rounded-xl shadow-2xl p-6 flex flex-col gap-4 font-mono text-[#dde2f3] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a202c] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase tracking-wider">
              {target.id} // TARGET RETICLE TELEMETRY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#242a36] text-[#b9cacb] hover:text-[#dbfcff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Classification & Confidence Banner */}
        <div className="p-3 bg-[#161c28] rounded-lg border border-[#242a36] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#b9cacb] block uppercase">CLASSIFICATION</span>
            <span className="text-base font-bold text-[#00f0ff]">{target.type}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#b9cacb] block uppercase">DETECTION CONFIDENCE</span>
            <span className="text-lg font-bold text-[#7df4ff]">{target.confidence}%</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 bg-[#161c28] rounded border border-[#242a36]">
            <span className="text-[#b9cacb] block">ESTIMATED LENGTH:</span>
            <span className="text-[#dbfcff] font-semibold text-sm">{target.lengthMeters} Meters</span>
          </div>
          <div className="p-2.5 bg-[#161c28] rounded border border-[#242a36]">
            <span className="text-[#b9cacb] block">DOPPLER VELOCITY:</span>
            <span className="text-[#7bd0ff] font-semibold text-sm">
              {target.speedKnots > 0 ? `${target.speedKnots} Knots` : 'Static / Stationary'}
            </span>
          </div>
          <div className="p-2.5 bg-[#161c28] rounded border border-[#242a36]">
            <span className="text-[#b9cacb] block">GEODETIC COORDINATES:</span>
            <span className="text-[#dbfcff] font-semibold">{target.coords || "24°52'05\"N 56°08'44\"E"}</span>
          </div>
          <div className="p-2.5 bg-[#161c28] rounded border border-[#242a36]">
            <span className="text-[#b9cacb] block">TRACKING STATUS:</span>
            <span className="text-[#00f0ff] font-semibold">{target.status}</span>
          </div>
        </div>

        {/* Sensor Correlation Note */}
        <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] text-xs leading-relaxed text-[#b9cacb]">
          <span className="text-[#7df4ff] font-semibold block mb-1">
            [CROSS-SENSOR SYNTHESIS]
          </span>
          {target.details ||
            'Polarimetric cross-backscatter confirms high-dielectric metal super-structure. Optical high-resolution cloud mask bypassed. Verified against AIS transponder telemetry.'}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1a202c]">
          <span className="text-[10px] text-[#849495]">ISRO SIH-26167 GEO-INTEL KERNEL</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(target, null, 2));
              }}
              className="px-3 py-1.5 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#dbfcff] text-xs flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              Copy JSON
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-[#00f0ff] text-[#00363a] font-bold text-xs hover:bg-[#7df4ff] transition-colors"
            >
              Acknowledge Reticle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
