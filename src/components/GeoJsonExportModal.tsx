import React, { useState } from 'react';
import { QueryAnalysisResult } from '../types';

interface GeoJsonExportModalProps {
  result: QueryAnalysisResult;
  onClose: () => void;
}

export const GeoJsonExportModal: React.FC<GeoJsonExportModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);

  const geoJsonData = {
    type: 'FeatureCollection',
    metadata: {
      generator: 'SatQuery AI v4.2 / ISRO SIH-26167',
      aoi: result.aoi,
      sensorMode: result.sensorMode,
      timestamp: result.timestamp,
      confidence: result.confidence,
    },
    features: result.classifiedTargets.map((target, idx) => ({
      type: 'Feature',
      id: target.id,
      geometry: {
        type: 'Point',
        coordinates: [56.12 + idx * 0.02, 24.89 + idx * 0.015],
      },
      properties: {
        id: target.id,
        classification: target.type,
        confidencePct: target.confidence,
        lengthM: target.lengthMeters,
        speedKts: target.speedKnots,
        status: target.status,
      },
    })),
  };

  const jsonString = JSON.stringify(geoJsonData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `satquery_targets_${Date.now()}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0e131f] border border-[#242a36] rounded-xl shadow-2xl p-6 flex flex-col gap-4 font-mono text-[#dde2f3] max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-[#1a202c] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">public</span>
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase tracking-wider">
              GeoJSON Vector Payload Export
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#242a36] text-[#b9cacb] hover:text-[#dbfcff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="text-xs text-[#b9cacb]">
          Standards-compliant RFC 7946 GeoJSON format with WGS-84 coordinates, bounding centroids, and remote-sensing target metadata ready for QGIS, ArcGIS, or Leaflet.
        </div>

        <div className="relative flex-1 bg-[#080e1a] border border-[#1a202c] rounded-lg p-3 overflow-y-auto text-[11px] leading-relaxed text-[#7df4ff]">
          <pre className="font-mono whitespace-pre-wrap">{jsonString}</pre>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#1a202c]">
          <span className="text-[10px] text-[#849495]">FEATURES: {result.classifiedTargets.length} VECTOR OBJECTS</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#dbfcff] text-xs flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied to Clipboard' : 'Copy GeoJSON'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded bg-[#00f0ff] text-[#00363a] font-bold text-xs hover:bg-[#7df4ff] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Download .geojson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
