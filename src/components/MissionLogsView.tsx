import React, { useState } from 'react';
import { QueryAnalysisResult } from '../types';

interface MissionLogsViewProps {
  currentResult: QueryAnalysisResult;
  onOpenExport: () => void;
}

export const MissionLogsView: React.FC<MissionLogsViewProps> = ({ currentResult, onOpenExport }) => {
  const [logs] = useState([
    {
      id: 'LOG-2025-0223-01',
      time: '2025-02-23 18:42:09 UTC',
      aoi: "26°34'N 56°15'E (Hormuz Channel)",
      sensor: 'Sentinel-1D SAR + Landsat-9 TIR',
      query: 'Detect unauthorized maritime vessels along the Strait of Hormuz using Sentinel-1 SAR and verify thermal signatures with Landsat-9 TIR...',
      targets: 14,
      confidence: 98.4,
      status: 'VERIFIED',
    },
    {
      id: 'LOG-2025-0223-02',
      time: '2025-02-23 17:15:30 UTC',
      aoi: "39°28'N 0°22'W (Valencia Basin)",
      sensor: 'Sentinel-1 C-SAR + Copernicus EMS',
      query: 'SAR Flood Extent Inundation (Valencia) with change detection against baseline and critical infrastructure vulnerability mapping.',
      targets: 3,
      confidence: 99.2,
      status: 'VERIFIED',
    },
    {
      id: 'LOG-2025-0223-03',
      time: '2025-02-23 14:02:18 UTC',
      aoi: "03°12'S 60°02'W (Amazonia Central)",
      sensor: 'Sentinel-2 MSI + Sentinel-1 SAR',
      query: 'Track Deforestation Rates (Amazon Basin) via Sentinel-2 NDVI spectral degradation and dual-pol SAR backscatter anomalies.',
      targets: 2,
      confidence: 98.7,
      status: 'VERIFIED',
    },
    {
      id: 'LOG-2025-0223-04',
      time: '2025-02-23 11:45:55 UTC',
      aoi: "23°50'S 68°15'W (Salar de Atacama)",
      sensor: 'PRISMA Hyperspectral + WorldView-3',
      query: 'Hyperspectral Mineral Mapping (Atacama Desert) targeting Lithium brine extraction ponds and evaporite crust mineralogy.',
      targets: 4,
      confidence: 98.6,
      status: 'VERIFIED',
    },
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#1a202c] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs uppercase font-bold">
            MISSION RECORDS &amp; SIH BENCHMARK
          </span>
          <span className="text-[#b9cacb] text-xs font-mono">ISRO SIH-26167 VERIFICATION LOGS</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-[#dbfcff] uppercase">
          Mission Intelligence Logs &amp; ISRO Problem Statement
        </h1>
        <p className="text-sm text-[#b9cacb] font-sans">
          Archived query payloads, vector geometries, model inference outputs, and benchmark references for Smart India Hackathon.
        </p>
      </div>

      {/* ISRO Problem Statement Official Briefing Card */}
      <div className="bg-[#161c28] border border-[#242a36] rounded-xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242a36] pb-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase">
              Smart India Hackathon 2026 // Problem Statement 26167
            </span>
          </div>
          <span className="px-3 py-1 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-bold text-xs">
            ISRO / DEPARTMENT OF SPACE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#dde2f3]">
          <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] flex flex-col gap-1">
            <span className="text-[#7df4ff] font-mono text-[10px] uppercase font-bold">ORGANIZATION</span>
            <span className="font-semibold">Indian Space Research Organisation (ISRO)</span>
            <span className="text-[#b9cacb] text-[11px]">Department of Space, Government of India</span>
          </div>
          <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] flex flex-col gap-1">
            <span className="text-[#7df4ff] font-mono text-[10px] uppercase font-bold">THEME &amp; CATEGORY</span>
            <span className="font-semibold">Space Technology | Software</span>
            <span className="text-[#b9cacb] text-[11px]">Vision-Language Remote Sensing Integration</span>
          </div>
          <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] flex flex-col gap-1">
            <span className="text-[#7df4ff] font-mono text-[10px] uppercase font-bold">EVALUATION DATASETS</span>
            <span className="font-semibold">BigEarthNet-MM &amp; VRSBench</span>
            <span className="text-[#b9cacb] text-[11px]">Co-registered Sentinel-1 SAR + Sentinel-2 MSI</span>
          </div>
        </div>

        <div className="p-3 bg-[#080e1a] rounded border border-[#1a202c] text-xs text-[#b9cacb] leading-relaxed font-sans">
          <strong className="text-[#dbfcff]">Problem Statement Description:</strong> Remote-sensing imagery is widely used for agricultural monitoring, disaster management, urban planning, forest monitoring, water-resource assessment, infrastructure mapping, and environmental analysis. However, most existing remote-sensing AI solutions are developed as isolated applications for a single predefined task. SatQuery AI resolves this by providing an interactive vision-language assistant for zero-shot natural language interrogation of paired optical and synthetic aperture radar (SAR) observations.
        </div>
      </div>

      {/* Mission Execution Logs Table */}
      <div className="bg-[#161c28] border border-[#242a36] rounded-xl p-5 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#242a36]">
          <span className="font-['Space_Grotesk'] text-sm font-bold text-[#dbfcff] uppercase">
            Archived Mission Executions ({logs.length})
          </span>
          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 rounded bg-[#00f0ff] text-[#00363a] font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#7df4ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            Export All GeoJSON
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242a36] text-[#7df4ff] text-[11px]">
                <th className="pb-2">LOG ID</th>
                <th className="pb-2">TIMESTAMP (UTC)</th>
                <th className="pb-2">AREA OF INTEREST</th>
                <th className="pb-2">SENSORS FUSED</th>
                <th className="pb-2">TARGETS</th>
                <th className="pb-2">CONFIDENCE</th>
                <th className="pb-2 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242a36]/60 text-xs">
              {logs.map((item) => (
                <tr key={item.id} className="hover:bg-[#1a202c] transition-colors">
                  <td className="py-3 text-[#00f0ff] font-bold">{item.id}</td>
                  <td className="py-3 text-[#dde2f3]">{item.time}</td>
                  <td className="py-3 text-[#c4e7ff]">{item.aoi}</td>
                  <td className="py-3 text-[#b9cacb]">{item.sensor}</td>
                  <td className="py-3 text-[#7df4ff] font-bold">{item.targets} Vectors</td>
                  <td className="py-3 text-[#dbfcff] font-bold">{item.confidence}%</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] font-bold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
