import React, { useState } from 'react';
import { CosmicShader } from './CosmicShader';
import { SensorMode, QueryAnalysisResult, ClassifiedTarget, SatelliteNode } from '../types';
import { MISSION_PRESETS, SATELLITE_CONSTELLATION } from '../data/mockData';

interface OrbitalExplorerProps {
  activeSensor: SensorMode;
  onSelectSensor: (mode: SensorMode) => void;
  queryResult: QueryAnalysisResult;
  onExecuteQuery: (prompt: string, sensorMode: SensorMode) => Promise<void>;
  isLoading: boolean;
  onSelectTarget: (target: ClassifiedTarget) => void;
  onOpenExport: () => void;
  selectedSatellite: SatelliteNode;
  onSelectSatellite: (sat: SatelliteNode) => void;
}

export const OrbitalExplorer: React.FC<OrbitalExplorerProps> = ({
  activeSensor,
  onSelectSensor,
  queryResult,
  onExecuteQuery,
  isLoading,
  onSelectTarget,
  onOpenExport,
  selectedSatellite,
  onSelectSatellite,
}) => {
  const [promptText, setPromptText] = useState(
    'Detect unauthorized maritime vessels along the Strait of Hormuz using Sentinel-1 SAR and verify thermal signatures with Landsat-9 TIR...'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [polarizationMode, setPolarizationMode] = useState<'VV+VH' | 'HH+HV' | 'PAULI'>('VV+VH');
  const [showMasksOnly, setShowMasksOnly] = useState(true);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeAOI, setActiveAOI] = useState("26°34'N 56°15'E (Hormuz Channel)");
  const [activeFusion, setActiveFusion] = useState('Sentinel-1D SAR + Landsat-9 TIR');

  const sensorButtons: { mode: SensorMode; label: string; icon: string }[] = [
    { mode: 'SAR', label: 'SAR (C/L-Band)', icon: 'radar' },
    { mode: 'OPTICAL', label: 'Multispectral (RGB+NIR)', icon: 'photo_camera' },
    { mode: 'THERMAL', label: 'Thermal IR (TIR)', icon: 'thermostat' },
    { mode: 'HYPER', label: 'Hyperspectral (400-2500nm)', icon: 'waves' },
    { mode: 'LIDAR', label: 'LiDAR Elevation', icon: 'vertical_align_bottom' },
  ];

  const handlePresetClick = (preset: (typeof MISSION_PRESETS)[0]) => {
    setPromptText(preset.query);
    onSelectSensor(preset.sensorMode);
    setActiveAOI(preset.aoi);
    setActiveFusion(preset.fusion || '');
    onExecuteQuery(preset.query, preset.sensorMode);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setPromptText(
          'Identify localized thermal plumes along coastal refinery outlets with co-registered C-band SAR backscatter...'
        );
      }, 3000);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(queryResult.executiveSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const tankerTarget = queryResult.classifiedTargets.find((t) => t.id.includes('09') || t.id.includes('01')) || {
    id: 'VESSEL #09',
    type: 'VLCC TANKER',
    confidence: 98.4,
    lengthMeters: 332,
    speedKnots: 15.1,
    status: 'Cruising Throttle',
    coords: "24°52'05\"N 56°08'44\"E",
    details: 'Thermal radiant plume wake delta +4.2°C detected on Landsat-9 Band 10 TIR co-registration.',
  };

  const thermalAnomalyTarget: ClassifiedTarget = {
    id: 'ANOMALY-TIR-04',
    type: 'THERMAL PLUME ANOMALY',
    confidence: 96.7,
    lengthMeters: 1420,
    speedKnots: 0,
    status: '+4.2°C DELTA (Landsat-9 TIR)',
    coords: "24°54'10\"N 56°11'05\"E",
    details: 'Thermal radiant discharge signature with +4.2°C surface temperature differential over background ocean.',
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Orbital Hero Command Section */}
      <section className="relative w-full overflow-hidden bg-[#080e1a] px-4 py-8 md:px-8 md:py-10 border-b border-[#1a202c]">
        {/* Procedural Space WebGL Shader Canvas */}
        <CosmicShader className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

        {/* Vector HUD Grid Accent Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00f0ff]/10 via-[#080e1a]/70 to-[#080e1a]" />

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col gap-6">
          {/* Top Tactical HUD Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#161c28]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#242a36] shadow-sm">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-['Space_Grotesk'] text-xs text-[#dbfcff] uppercase tracking-wider font-semibold">
                  Vision-Language Engine v4.2
                </span>
              </div>
              <span className="text-[#3b494b] font-mono text-xs">/</span>
              <span className="font-['Space_Grotesk'] text-xs text-[#b9cacb] flex items-center gap-1.5 uppercase font-medium">
                <span className="material-symbols-outlined text-[#00dbe9] text-[16px]">satellite_alt</span>
                TASKED PLATFORMS: 18 ACTIVE LEO NODES
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#b9cacb] uppercase text-[11px]">INFERENCE LATENCY:</span>
              <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#dbfcff] font-semibold">138ms</span>
              <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#c4e7ff] font-semibold">
                FP8 TENSOR-PARALLEL
              </span>
            </div>
          </div>

          {/* Main Headline & Narrative */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase border border-[#00f0ff]/30">
                Multimodal Earth Observation Core
              </span>
              <span className="text-[#b9cacb] font-['Space_Grotesk'] text-xs uppercase font-medium">
                GEO-INTEL CONSOLE
              </span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#dbfcff] tracking-tight uppercase leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Zero-Shot Vision-Language Satellite Intelligence
            </h1>
            <p className="font-['Inter'] text-base text-[#b9cacb] max-w-3xl leading-relaxed">
              Direct neural interrogation of orbital sensor suites. Query terabytes of SAR, Hyperspectral, and
              Optical constellations in real time with natural language context.
            </p>
          </div>

          {/* Interactive Multimodal Query Console */}
          <div className="w-full rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-4 sm:p-5 border border-[#242a36] shadow-2xl flex flex-col gap-4">
            {/* Sensor Selection Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#242a36]/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-['Space_Grotesk'] text-xs text-[#b9cacb] uppercase font-semibold mr-1">
                  Sensor Mode:
                </span>
                {sensorButtons.map((btn) => {
                  const isSelected = activeSensor === btn.mode;
                  return (
                    <button
                      key={btn.mode}
                      onClick={() => onSelectSensor(btn.mode)}
                      className={`px-3 py-1.5 rounded text-xs font-['Space_Grotesk'] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                          : 'bg-[#242a36] text-[#dde2f3] hover:bg-[#2f3542]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">{btn.icon}</span>
                      {btn.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#7df4ff] animate-pulse" />
                <span className="text-xs text-[#b9cacb] uppercase">Ground Resolution:</span>
                <span className="text-xs text-[#00f0ff] font-bold">0.3m/px Sub-Metre</span>
              </div>
            </div>

            {/* Central Multimodal Prompt Input Box */}
            <div className="relative flex flex-col md:flex-row items-stretch gap-3 bg-[#080e1a]/95 rounded-lg p-3 border border-[#242a36] shadow-inner">
              <div className="flex items-start pt-2 pl-2 text-[#00dbe9]">
                <span className="material-symbols-outlined text-[24px]">terminal</span>
              </div>
              <div className="flex-1 flex flex-col">
                <textarea
                  id="neuralQueryInput"
                  rows={2}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="E.g., Detect unauthorized maritime vessels along the Strait of Hormuz using Sentinel-1 SAR and verify thermal signatures with Landsat-9 TIR..."
                  className="w-full bg-transparent text-[#dbfcff] font-['Inter'] text-sm placeholder-[#849495] focus:outline-none resize-none leading-relaxed"
                />
                {/* Context Indicators & Metadata Anchors */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1a202c]">
                  <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#b9cacb] text-[11px] font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#7df4ff]">public</span>
                    AOI: {activeAOI}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#b9cacb] text-[11px] font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#00a6e0]">layers</span>
                    Fusion: {activeFusion}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#b9cacb] text-[11px] font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#ffb4ab]">cloud</span>
                    Cloud Mask: Bypassed via SAR
                  </span>
                </div>
              </div>

              {/* Command CTA cluster */}
              <div className="flex flex-row md:flex-col justify-between items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVoiceToggle}
                    title="Voice Audio Query Waveform"
                    className={`p-2 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center justify-center cursor-pointer ${
                      isRecording ? 'bg-red-500/20 text-red-400 border border-red-500 animate-pulse' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isRecording ? 'graphic_eq' : 'mic'}
                    </span>
                  </button>
                  <label
                    title="Upload GeoTIFF / Raster Patch"
                    className="p-2 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#b9cacb] hover:text-[#00f0ff] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".tif,.tiff,.geojson,.png,.jpg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPromptText(`Analyze uploaded raster ${file.name} for surface anomalies and SAR backscatter change detection.`);
                        }
                      }}
                    />
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  </label>
                </div>

                <button
                  id="runQueryBtn"
                  onClick={() => onExecuteQuery(promptText, activeSensor)}
                  disabled={isLoading}
                  className="w-full md:w-auto px-5 py-2.5 rounded bg-[#00f0ff] text-[#00363a] hover:bg-[#7df4ff] transition-all font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Execute Analysis</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Query Presets */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 overflow-x-auto pt-1">
              <span className="font-['Space_Grotesk'] text-xs text-[#b9cacb] uppercase font-semibold shrink-0">
                Mission Presets:
              </span>
              <div className="flex items-center gap-2 flex-nowrap overflow-x-auto py-1">
                {MISSION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className="px-2.5 py-1 rounded bg-[#242a36]/70 hover:bg-[#242a36] text-[#dde2f3] hover:text-[#00f0ff] text-xs font-['Space_Grotesk'] whitespace-nowrap transition-colors border border-[#3b494b]/30 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Satellite Swath Observation Deck */}
      <section className="w-full px-4 md:px-8 py-6 bg-[#0e131f]">
        <div className="mx-auto max-w-7xl flex flex-col gap-4">
          {/* Viewport Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase tracking-wide">
                  Active Target Swath: {selectedSatellite.name.toUpperCase()} // SWATH-AZ-942
                </span>
                <span className="font-['Space_Grotesk'] text-xs text-[#b9cacb] uppercase">
                  Synthetic Aperture Radar Ground Projection &amp; Reticle Lock
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#161c28] px-3 py-1.5 rounded-lg border border-[#242a36] font-mono text-xs">
              <span className="text-[#b9cacb]">DOWNLINK:</span>
              <span className="text-[#00dbe9] font-semibold">{selectedSatellite.downlinkMbps} Mbps X-BAND</span>
              <span className="text-[#3b494b]">|</span>
              <span className="text-[#c4e7ff] font-semibold">
                FRAME: {selectedSatellite.orbitRev} / REV 84
              </span>
            </div>
          </div>

          {/* Main High-Resolution Orbital Canvas */}
          <div className="relative w-full aspect-[16/9] min-h-[440px] lg:min-h-[600px] rounded-xl overflow-hidden bg-[#080e1a] border border-[#242a36] shadow-2xl flex items-center justify-center group">
            {/* High-res NASA/ESA orbital satellite imagery rendering */}
            <img
              alt="Orbital earth observation from satellite with radar telemetry swaths and HUD coordinates"
              className="absolute inset-0 w-full h-full object-cover select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUYnuKGDXkaX81eB40SXonEDhrkQKPtKyF4StPeuWabgNSfE9qrFi_bxMFEWvNTk9OdVKsmytnThu3h4NZUJszd4kaHEwnRVeZ6Z5OclWKJtUC0LRSfkkd6Gz9M0q4Izar3XsN0_ODk36tlwartQi76-zRl6ZPtblhxyNzm7m4NlY1FpYG3FX7AjIyiJhKVeBl-L5S7Jt0JCDm7jFIGU047bVtH-TH1rcNC-i1cQdeyuW9DUmG0PJU"
            />

            {/* Dark Contrast Scrim for HUD Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a] via-transparent to-[#080e1a]/70 pointer-events-none" />
            <div className="absolute inset-0 bg-[#00f0ff]/5 pointer-events-none" />

            {/* Animated Swath Radar Scanning Beam */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-75 shadow-[0_0_15px_#00f0ff] animate-[bounce_6s_infinite]" />
            </div>

            {/* Upper Right Mission Telemetry Block */}
            <div className="absolute top-4 right-4 p-3.5 bg-[#080e1a]/85 backdrop-blur-md rounded-lg border border-[#242a36] shadow-lg flex flex-col gap-1 text-right font-mono">
              <div className="font-['Space_Grotesk'] text-sm font-bold text-[#dbfcff] uppercase">
                MISSION: {selectedSatellite.name.toUpperCase()}
              </div>
              <div className="text-[11px] text-[#dde2f3] flex justify-between gap-4">
                <span className="text-[#b9cacb]">ORBIT:</span>
                <span className="text-[#7df4ff] font-semibold">{selectedSatellite.orbitRev} LEO</span>
              </div>
              <div className="text-[11px] text-[#dde2f3] flex justify-between gap-4">
                <span className="text-[#b9cacb]">UTC:</span>
                <span className="text-[#7df4ff] font-semibold">22:47:55.10</span>
              </div>
              <div className="text-[11px] text-[#dde2f3] flex justify-between gap-4">
                <span className="text-[#b9cacb]">POS:</span>
                <span className="text-[#7df4ff] font-semibold">42.1° N, 005.8° W</span>
              </div>
              <div className="text-[11px] text-[#dde2f3] flex justify-between gap-4">
                <span className="text-[#b9cacb]">AZ / EL:</span>
                <span className="text-[#7df4ff] font-semibold">94.2° / 16.8°</span>
              </div>
              <div className="text-[11px] text-[#dde2f3] flex justify-between gap-4">
                <span className="text-[#b9cacb]">VELOCITY:</span>
                <span className="text-[#7bd0ff] font-semibold">7.42 KM/S</span>
              </div>
            </div>

            {/* Upper Left Reticle & Coordinate Display */}
            <div className="absolute top-4 left-4 p-3.5 bg-[#080e1a]/85 backdrop-blur-md rounded-lg border border-[#242a36] shadow-lg flex flex-col gap-1 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#dbfcff] uppercase">
                  RADAR LOCK: ACTIVE SWATH
                </span>
              </div>
              <div className="text-[11px] text-[#b9cacb]">
                POLARIZATION: <span className="text-[#dbfcff] font-semibold">{polarizationMode}</span>
              </div>
              <div className="text-[11px] text-[#b9cacb]">
                INCIDENCE ANGLE: <span className="text-[#dbfcff] font-semibold">39.4°</span>
              </div>
              <div className="text-[11px] text-[#b9cacb]">
                GROUND SAMPLE: <span className="text-[#dbfcff] font-semibold">0.3m/pixel GSD</span>
              </div>
            </div>

            {/* Target Lock Reticle #1 (Maritime Tanker) */}
            <div
              onClick={() => onSelectTarget(tankerTarget)}
              className="absolute top-[42%] left-[48%] flex flex-col items-start cursor-pointer group/target z-20"
              title="Click to inspect Target VESSEL #09"
            >
              <div className="w-16 h-16 rounded bg-[#00f0ff]/10 relative flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover/target:bg-[#00f0ff]/25 transition-all border border-[#00f0ff]/60">
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00f0ff]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00f0ff]" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00f0ff]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00f0ff]" />
                <span className="material-symbols-outlined text-[#00f0ff] text-[20px] animate-spin">
                  file_download_done
                </span>
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-[#080e1a]/95 backdrop-blur-md shadow-lg text-[10px] font-semibold text-[#00f0ff] flex items-center gap-1.5 font-mono border border-[#00f0ff]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                TARGET: VESSEL #09 [VLCC TANKER] (98.4%)
              </div>
            </div>

            {/* Target Lock Reticle #2 (Thermal Plume / Sub-Surface) */}
            <div
              onClick={() => onSelectTarget(thermalAnomalyTarget)}
              className="absolute top-[58%] left-[62%] flex flex-col items-start cursor-pointer group/target z-20"
              title="Click to inspect Thermal Anomaly"
            >
              <div className="w-20 h-12 rounded bg-[#ffb4ab]/15 relative flex items-center justify-center shadow-[0_0_12px_rgba(255,180,171,0.4)] group-hover/target:bg-[#ffb4ab]/30 transition-all border border-[#ffb4ab]/60">
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#ffb4ab]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ffb4ab]" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#ffb4ab]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#ffb4ab]" />
                <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">emergency</span>
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-[#080e1a]/95 backdrop-blur-md shadow-lg text-[10px] font-semibold text-[#ffb4ab] flex items-center gap-1 font-mono border border-[#ffb4ab]/40">
                THERMAL ANOMALY: +4.2°C DELTA (Landsat-9 TIR)
              </div>
            </div>

            {/* Bottom Center Live Coordinate Strip */}
            <div className="absolute bottom-4 inset-x-4 mx-auto max-w-4xl bg-[#080e1a]/90 backdrop-blur-lg px-4 py-2.5 rounded-xl border border-[#242a36] shadow-2xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs z-20">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#b9cacb]">NADIR COORD</span>
                  <span className="text-[#dbfcff] font-semibold">24.892° N, 55.321° E</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#b9cacb]">ALTITUDE</span>
                  <span className="text-[#dbfcff] font-semibold">{selectedSatellite.altitudeKm} KM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#b9cacb]">SWATH SPAN</span>
                  <span className="text-[#dbfcff] font-semibold">{selectedSatellite.swathWidthKm} KM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#b9cacb]">CLOUD FRACTION</span>
                  <span className="text-[#c4e7ff] font-semibold">3.2% (CLEAR)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPolarizationMode((prev) =>
                      prev === 'VV+VH' ? 'HH+HV' : prev === 'HH+HV' ? 'PAULI' : 'VV+VH'
                    )
                  }
                  className="px-3 py-1.5 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#dbfcff] text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">tune</span>
                  Pol: {polarizationMode}
                </button>
                <button
                  onClick={onOpenExport}
                  className="px-3 py-1.5 rounded bg-[#00f0ff] text-[#00363a] font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#7df4ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  Export GeoTIFF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Multimodal Vision-Language Reasoning & Analytics Split */}
      <section className="w-full px-4 md:px-8 py-10 bg-[#080e1a] border-t border-[#1a202c]">
        <div className="mx-auto max-w-7xl flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <span className="px-2.5 py-0.5 w-fit rounded bg-[#00f0ff]/15 text-[#00f0ff] font-['Space_Grotesk'] text-xs uppercase tracking-wider font-bold border border-[#00f0ff]/20">
                Inference Chain &amp; Decomposition
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#dbfcff] uppercase">
                Cross-Attention Multi-Sensor Segmentation
              </h2>
              <p className="font-['Inter'] text-sm text-[#b9cacb] leading-relaxed">
                Co-registered SAR backscatter amplitude fused with optical RGB and thermal infrared radiant flux
                for automated zero-shot object bounding.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#1a202c] px-3 py-1.5 rounded-lg border border-[#242a36] font-mono text-xs">
              <span className="text-[#b9cacb]">MODEL:</span>
              <span className="text-[#00f0ff] font-semibold">{queryResult.source || 'SatQuery-LLaVA-GEO 70B'}</span>
            </div>
          </div>

          {/* Split Card Comparison: Raw Acquisition vs Segmented Inference */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Image Tile Cards (8 cols) */}
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-4">
              {/* Card A: Raw Remote Sensing Acquisition */}
              <div className="flex-1 flex flex-col bg-[#161c28] rounded-xl overflow-hidden border border-[#242a36] shadow-lg">
                <div className="px-4 py-2.5 bg-[#1a202c] border-b border-[#242a36] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#c4e7ff] text-[18px]">satellite</span>
                    <span className="font-['Space_Grotesk'] text-xs font-bold text-[#dde2f3] uppercase">
                      Raw Radar / SAR (VV Polarization)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#242a36] font-mono text-[10px] text-[#b9cacb]">
                    BAND C-SAR
                  </span>
                </div>
                <div className="relative aspect-square w-full bg-[#2f3542] overflow-hidden group">
                  <img
                    alt="High-resolution synthetic aperture radar black and white satellite imagery of coastal waterway"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#080e1a]/85 text-[11px] font-mono text-[#dde2f3] border border-[#242a36]">
                    RESOLVED: 24.89°N 56.12°E
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 font-mono text-xs border-t border-[#242a36]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#b9cacb]">Speckle Noise Level:</span>
                    <span className="text-[#dde2f3] font-semibold">0.14 dB (Filtered)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#b9cacb]">Radiometric Calibration:</span>
                    <span className="text-[#00f0ff] font-semibold">Gamma0 Nominal</span>
                  </div>
                </div>
              </div>

              {/* Card B: Vision-Language Segmentation Mask & Heatmap */}
              <div className="flex-1 flex flex-col bg-[#161c28] rounded-xl overflow-hidden border border-[#242a36] shadow-lg">
                <div className="px-4 py-2.5 bg-[#1a202c] border-b border-[#242a36] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">auto_awesome</span>
                    <span className="font-['Space_Grotesk'] text-xs font-bold text-[#00f0ff] uppercase">
                      SatQuery AI Mask &amp; Heatmap
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#00f0ff]/20 font-mono text-[10px] text-[#00f0ff] font-semibold">
                    CONFIDENCE: {queryResult.confidence}%
                  </span>
                </div>
                <div className="relative aspect-square w-full bg-[#2f3542] overflow-hidden group">
                  <img
                    alt="Deep blue false-color infrared satellite observation with bright neon cyan heat maps"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG"
                  />

                  {/* Dynamic Bounding Box Overlays */}
                  {showMasksOnly && (
                    <>
                      {/* Bounding Box Annotation #1 */}
                      <div
                        onClick={() =>
                          onSelectTarget(
                            queryResult.classifiedTargets[0] || {
                              id: 'VESSEL-01',
                              type: 'Cargo Vessel',
                              confidence: 99.1,
                              lengthMeters: 332,
                              speedKnots: 14.8,
                              status: 'Underway',
                            }
                          )
                        }
                        className="absolute top-[35%] left-[40%] w-24 h-16 rounded bg-[#00f0ff]/25 p-1 flex flex-col justify-between border-2 border-[#00f0ff] cursor-pointer hover:bg-[#00f0ff]/40 transition-colors"
                      >
                        <span className="text-[9px] font-mono font-bold text-[#00363a] bg-[#00f0ff] px-1 py-0.5 rounded w-fit">
                          VESSEL-01 (99%)
                        </span>
                        <span className="text-[8px] font-mono text-[#00f0ff] text-right font-bold drop-shadow">
                          L: 332m | W: 60m
                        </span>
                      </div>

                      {/* Bounding Box Annotation #2 */}
                      <div
                        onClick={() =>
                          onSelectTarget(
                            queryResult.classifiedTargets[1] || {
                              id: 'VESSEL-02',
                              type: 'Container Vessel',
                              confidence: 94.7,
                              lengthMeters: 280,
                              speedKnots: 18.2,
                              status: 'Underway',
                            }
                          )
                        }
                        className="absolute bottom-[25%] right-[25%] w-20 h-14 rounded bg-[#00a6e0]/25 p-1 flex flex-col justify-between border-2 border-[#00a6e0] cursor-pointer hover:bg-[#00a6e0]/40 transition-colors"
                      >
                        <span className="text-[9px] font-mono font-bold text-[#00374d] bg-[#00a6e0] px-1 py-0.5 rounded w-fit">
                          VESSEL-02 (94%)
                        </span>
                        <span className="text-[8px] font-mono text-[#c4e7ff] text-right font-bold drop-shadow">
                          L: 180m | W: 32m
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#080e1a]/85 text-[11px] font-mono text-[#00f0ff] border border-[#242a36]">
                    {queryResult.classifiedTargets.length > 0
                      ? `${queryResult.telemetry.vectorCount} MARITIME TARGETS CLASSIFIED`
                      : 'SCAN COMPLETE'}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 font-mono text-xs border-t border-[#242a36]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#b9cacb]">Classified Vessel Types:</span>
                    <span className="text-[#00f0ff] font-semibold">11 Cargo / 3 Tankers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#b9cacb]">Cross-Attention IoU:</span>
                    <span className="text-[#c4e7ff] font-semibold">0.892 (High Fidelity)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Vision-Language Reasoning Terminal & Synthesis (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Terminal Panel */}
              <div className="rounded-xl bg-[#1a202c] p-4 border border-[#242a36] shadow-lg flex flex-col gap-3 font-mono">
                <div className="flex items-center justify-between pb-2 bg-[#242a36] px-3 py-1.5 rounded">
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#00f0ff] uppercase flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    NEURAL REASONING STEPS
                  </span>
                  <span className="text-[11px] text-[#b9cacb]">STREAM 100%</span>
                </div>
                <div className="flex flex-col gap-2 text-xs text-[#b9cacb] max-h-72 overflow-y-auto pr-1">
                  {queryResult.reasoningSteps.map((step, idx) => {
                    const isComplete = step.includes('[Complete]');
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 p-2 rounded border ${
                          isComplete
                            ? 'bg-[#00f0ff]/10 border-[#00f0ff]/40 text-[#dbfcff]'
                            : 'bg-[#161c28] border-[#242a36]'
                        }`}
                      >
                        <span className="text-[#00dbe9] shrink-0 font-bold">
                          {isComplete ? '[Done]' : `[Step ${idx + 1}]`}
                        </span>
                        <span className="leading-relaxed">{step.replace(/^\[Step \d+\]\s*|^\[Complete\]\s*/, '')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Natural Language Executive Summary */}
              <div className="rounded-xl bg-[#161c28] p-4 border border-[#242a36] shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#c4e7ff] uppercase">
                    Autonomous Intelligence Brief
                  </span>
                  <button
                    onClick={handleCopySummary}
                    className="p-1 rounded hover:bg-[#242a36] text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
                    title="Copy Brief to Clipboard"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedSummary ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <p className="font-['Inter'] text-sm text-[#dde2f3] leading-relaxed">
                  &ldquo;{queryResult.executiveSummary}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#242a36]">
                  <span className="font-mono text-[11px] text-[#b9cacb]">
                    Vector Payload: {queryResult.telemetry.vectorCount} Polygons
                  </span>
                  <button
                    onClick={onOpenExport}
                    className="px-3 py-1.5 rounded bg-[#242a36] hover:bg-[#2f3542] text-[#00f0ff] font-['Space_Grotesk'] text-xs font-semibold uppercase flex items-center gap-1 transition-colors cursor-pointer border border-[#3b494b]/50"
                  >
                    <span className="material-symbols-outlined text-[15px]">file_download</span>
                    Download GeoJSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constellation Live Status & Downlink Telemetry Bar */}
      <section className="w-full px-4 md:px-8 py-8 bg-[#0e131f] border-t border-[#1a202c]">
        <div className="mx-auto max-w-7xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase">
                Tasked Orbital Constellation Telemetry
              </span>
            </div>
            <span className="font-mono text-xs text-[#b9cacb]">GLOBAL REVISIT TIME: 3.4 HRS</span>
          </div>

          {/* Orbital Node Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SATELLITE_CONSTELLATION.slice(0, 5).map((sat) => {
              const isSelected = selectedSatellite.id === sat.id;
              return (
                <button
                  key={sat.id}
                  onClick={() => onSelectSatellite(sat)}
                  className={`p-4 rounded-xl shadow flex flex-col gap-2 transition-all text-left cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1a202c] border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-[#161c28] border-[#242a36] hover:bg-[#1a202c]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#dbfcff] uppercase">
                      {sat.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        sat.status === 'ONLINE' ? 'bg-[#00f0ff]' : 'bg-[#7df4ff]'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-[#b9cacb]">{sat.sensor}</span>
                  <div className="flex flex-col gap-1 pt-2 font-mono text-xs border-t border-[#242a36]/60">
                    <div className="flex justify-between text-[#dde2f3]">
                      <span>Alt:</span>
                      <span className="text-[#7df4ff] font-semibold">{sat.altitudeKm} km</span>
                    </div>
                    <div className="flex justify-between text-[#dde2f3]">
                      <span>Battery:</span>
                      <span className="text-[#c4e7ff] font-semibold">{sat.batteryPercent}%</span>
                    </div>
                    <div className="flex justify-between text-[#dde2f3]">
                      <span>Downlink:</span>
                      <span className="text-[#7df4ff] font-semibold">{sat.downlinkMbps} Mbps</span>
                    </div>
                    <div className="flex justify-between text-[#b9cacb]">
                      <span>Next Pass:</span>
                      <span className="text-[#dbfcff]">{sat.nextPass}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
