import React, { useState } from 'react';
import { SensorMode, QueryAnalysisResult, ClassifiedTarget } from '../types';
import { MISSION_PRESETS } from '../data/mockData';

interface MultimodalQueryViewProps {
  queryResult: QueryAnalysisResult;
  onExecuteQuery: (prompt: string, sensorMode: SensorMode) => Promise<void>;
  isLoading: boolean;
  onSelectTarget: (target: ClassifiedTarget) => void;
  onOpenExport: () => void;
}

export const MultimodalQueryView: React.FC<MultimodalQueryViewProps> = ({
  queryResult,
  onExecuteQuery,
  isLoading,
  onSelectTarget,
  onOpenExport,
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedSensor, setSelectedSensor] = useState<SensorMode>('SAR');
  const [selectedAOI, setSelectedAOI] = useState("26°34'N 56°15'E (Hormuz Channel)");
  const [selectedFusion, setSelectedFusion] = useState('Sentinel-1D SAR + Landsat-9 TIR');
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; text: string; time: string; telemetry?: any }[]
  >([
    {
      role: 'assistant',
      text: 'SatQuery AI Vision-Language Assistant online. Ready for zero-shot natural language queries across co-registered Sentinel-1 SAR, Sentinel-2 Optical, and Landsat-9 Thermal Infrared swaths (ISRO SIH-26167).',
      time: '18:40:02 UTC',
    },
    {
      role: 'user',
      text: 'Detect unauthorized maritime vessels along the Strait of Hormuz using Sentinel-1 SAR and verify thermal signatures with Landsat-9 TIR.',
      time: '18:42:09 UTC',
    },
    {
      role: 'assistant',
      text: queryResult.executiveSummary,
      time: '18:42:10 UTC',
      telemetry: queryResult.telemetry,
    },
  ]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const userMsg = inputText.trim();
    setInputText('');

    const now = new Date().toISOString().substring(11, 19) + ' UTC';
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg, time: now }]);

    await onExecuteQuery(userMsg, selectedSensor);

    setChatMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        text: `Analysis complete for ${selectedAOI}. ${queryResult.executiveSummary}`,
        time: new Date().toISOString().substring(11, 19) + ' UTC',
        telemetry: queryResult.telemetry,
      },
    ]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Screen Title */}
      <div className="flex flex-col gap-1 border-b border-[#1a202c] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs uppercase font-bold">
            INTERACTIVE CONSOLE
          </span>
          <span className="text-[#b9cacb] text-xs font-mono">ISRO SIH 26167 VQA PIPELINE</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-[#dbfcff] uppercase">
          Multimodal Remote Sensing Vision-Language Console
        </h1>
        <p className="text-sm text-[#b9cacb]">
          Submit complex multi-sensor queries combining radar backscatter, optical reflectance, and thermal infrared flux in plain English.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Chat & Input Engine (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-[#161c28] border border-[#242a36] rounded-xl p-5 shadow-xl">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#242a36]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#b9cacb] font-mono">SENSOR:</span>
              {(['SAR', 'OPTICAL', 'THERMAL', 'HYPER'] as SensorMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedSensor(mode)}
                  className={`px-2.5 py-1 rounded text-xs font-['Space_Grotesk'] font-semibold transition-colors uppercase ${
                    selectedSensor === mode
                      ? 'bg-[#00f0ff] text-[#00363a]'
                      : 'bg-[#242a36] text-[#dde2f3] hover:bg-[#2f3542]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              NEURAL STREAM READY
            </div>
          </div>

          {/* Chat History Container */}
          <div className="flex flex-col gap-3 min-h-[360px] max-h-[460px] overflow-y-auto p-2 bg-[#080e1a] rounded-lg border border-[#1a202c]">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col p-3 rounded-lg max-w-[90%] font-mono text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'ml-auto bg-[#242a36] text-[#dbfcff] border border-[#3b494b]'
                    : 'mr-auto bg-[#161c28] text-[#dde2f3] border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.05)]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-[#b9cacb]">
                  <span className="font-bold uppercase text-[#00f0ff]">
                    {msg.role === 'user' ? 'OPERATOR COMMAND' : 'SATQUERY-LLaVA-GEO'}
                  </span>
                  <span>{msg.time}</span>
                </div>
                <p className="font-['Inter'] text-sm">{msg.text}</p>
                {msg.telemetry && (
                  <div className="mt-2 pt-2 border-t border-[#242a36] grid grid-cols-2 gap-2 text-[10px] text-[#7df4ff]">
                    <div>NADIR: {msg.telemetry.nadir}</div>
                    <div>VECTORS: {msg.telemetry.vectorCount} TARGETS</div>
                    <div>THERMAL: {msg.telemetry.thermalDelta}</div>
                    <div>CLOUD COVER: {msg.telemetry.cloudCover}</div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#161c28] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs animate-pulse">
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                Cross-attending SAR backscatter and optical spectral bands...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-[#080e1a] rounded-lg p-2 border border-[#242a36]">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about water bodies, crop NDVI, ship coordinates, thermal wakes, or urban boundaries..."
                rows={2}
                className="flex-1 bg-transparent text-[#dbfcff] text-sm focus:outline-none resize-none placeholder-[#849495]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2 rounded bg-[#00f0ff] text-[#00363a] hover:bg-[#7df4ff] transition-colors font-['Space_Grotesk'] text-xs font-bold uppercase flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-[14px]">send</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-[#b9cacb] font-mono uppercase">Quick Prompts:</span>
              {MISSION_PRESETS.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setInputText(p.query);
                    setSelectedSensor(p.sensorMode);
                  }}
                  className="px-2 py-0.5 rounded bg-[#242a36] hover:bg-[#2f3542] text-[10px] text-[#dbfcff] font-mono transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Swath Detections & Co-Registration View (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Target List Card */}
          <div className="bg-[#161c28] border border-[#242a36] rounded-xl p-5 shadow-xl flex flex-col gap-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-[#242a36]">
              <span className="text-xs font-bold text-[#dbfcff] uppercase flex items-center gap-1.5 font-['Space_Grotesk']">
                <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">radar</span>
                Identified Targets ({queryResult.classifiedTargets.length})
              </span>
              <button
                onClick={onOpenExport}
                className="text-[11px] text-[#00f0ff] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px]">download</span>
                GeoJSON
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {queryResult.classifiedTargets.map((target) => (
                <div
                  key={target.id}
                  onClick={() => onSelectTarget(target)}
                  className="p-3 bg-[#080e1a] rounded border border-[#1a202c] hover:border-[#00f0ff] transition-all cursor-pointer flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00f0ff] group-hover:text-[#7df4ff]">
                      {target.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#7df4ff] font-semibold">
                      {target.confidence}%
                    </span>
                  </div>
                  <span className="text-xs text-[#dde2f3] font-sans font-medium">{target.type}</span>
                  <div className="flex items-center justify-between text-[10px] text-[#b9cacb] pt-1">
                    <span>Length: {target.lengthMeters}m</span>
                    <span>Speed: {target.speedKnots} kts</span>
                    <span className="text-[#00dbe9]">{target.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multimodal Decomposition Preview */}
          <div className="bg-[#161c28] border border-[#242a36] rounded-xl p-5 shadow-xl flex flex-col gap-3 font-mono">
            <span className="text-xs font-bold text-[#c4e7ff] uppercase font-['Space_Grotesk']">
              Multi-Sensor Fusion Matrix
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#00f0ff] block font-semibold">Sentinel-1D SAR</span>
                <span className="text-[11px] text-[#b9cacb]">5.405 GHz C-Band (Penetrates Clouds)</span>
              </div>
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#7df4ff] block font-semibold">Landsat-9 TIR</span>
                <span className="text-[11px] text-[#b9cacb]">10.8 μm Thermal IR Radiant Flux</span>
              </div>
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#00a6e0] block font-semibold">Sentinel-2C MSI</span>
                <span className="text-[11px] text-[#b9cacb]">13 Bands (RGB + RedEdge + SWIR)</span>
              </div>
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#c0c1ff] block font-semibold">ISRO EOS-04</span>
                <span className="text-[11px] text-[#b9cacb]">Quad-Pol Radar Interferometry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
