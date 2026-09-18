import React, { useState } from 'react';

export const SarSpectralAnalyticsView: React.FC = () => {
  const [sarThreshold, setSarThreshold] = useState<number>(-21.5);
  const [ndviCutoff, setNdviCutoff] = useState<number>(0.45);
  const [activeBandCombo, setActiveBandCombo] = useState<'NATURAL' | 'INFRARED_FALSE' | 'SWIR_GEOLOGY' | 'PAULI_SAR'>('PAULI_SAR');
  const [polarization, setPolarization] = useState<'VV' | 'VH' | 'DUAL_RATIO' | 'QUAD_PAULI'>('DUAL_RATIO');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#1a202c] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs uppercase font-bold">
            REMOTE SENSING PHYSICS LAB
          </span>
          <span className="text-[#b9cacb] text-xs font-mono">POLARIMETRY &amp; SPECTRAL INDICES</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-[#dbfcff] uppercase">
          SAR Polarimetric &amp; Multi-Spectral Analytics
        </h1>
        <p className="text-sm text-[#b9cacb]">
          Decompose synthetic aperture radar scatter matrices and derive optical vegetation/water/urban indices in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Control Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-[#161c28] border border-[#242a36] rounded-xl p-5 shadow-xl font-mono text-xs">
          <span className="text-sm font-bold text-[#dbfcff] font-['Space_Grotesk'] uppercase border-b border-[#242a36] pb-2">
            Sensor Parameters &amp; Band Math
          </span>

          {/* SAR Polarization Mode */}
          <div className="flex flex-col gap-2">
            <span className="text-[#b9cacb] uppercase text-[11px]">Radar Polarization Matrix:</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'VV', label: 'VV (Co-Pol)' },
                { id: 'VH', label: 'VH (Cross-Pol)' },
                { id: 'DUAL_RATIO', label: 'VV/VH Ratio' },
                { id: 'QUAD_PAULI', label: 'Pauli (RGB)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPolarization(item.id as any)}
                  className={`p-2 rounded text-center font-semibold transition-colors cursor-pointer ${
                    polarization === item.id
                      ? 'bg-[#00f0ff] text-[#00363a]'
                      : 'bg-[#242a36] text-[#dde2f3] hover:bg-[#2f3542]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Water Backscatter Threshold Slider */}
          <div className="flex flex-col gap-2 p-3 bg-[#080e1a] rounded-lg border border-[#1a202c]">
            <div className="flex justify-between items-center">
              <span className="text-[#7df4ff]">Water Threshold (dB):</span>
              <span className="text-[#00f0ff] font-bold">{sarThreshold} dB</span>
            </div>
            <input
              type="range"
              min={-30}
              max={-10}
              step={0.5}
              value={sarThreshold}
              onChange={(e) => setSarThreshold(parseFloat(e.target.value))}
              className="accent-[#00f0ff] cursor-pointer"
            />
            <span className="text-[10px] text-[#849495]">
              Specular reflectance of open water produces deep backscatter attenuation below -20 dB.
            </span>
          </div>

          {/* Optical Band Combination */}
          <div className="flex flex-col gap-2">
            <span className="text-[#b9cacb] uppercase text-[11px]">Spectral Band Combination:</span>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'PAULI_SAR', label: 'Pauli SAR Double-Bounce Fusion' },
                { id: 'NATURAL', label: 'Natural Color RGB (B4-B3-B2)' },
                { id: 'INFRARED_FALSE', label: 'Color Infrared CIR (B8-B4-B3)' },
                { id: 'SWIR_GEOLOGY', label: 'Shortwave IR Mineral (B12-B8A-B4)' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBandCombo(b.id as any)}
                  className={`px-3 py-2 rounded text-left transition-colors cursor-pointer ${
                    activeBandCombo === b.id
                      ? 'bg-[#00a6e0] text-[#001e2c] font-bold'
                      : 'bg-[#242a36] text-[#dde2f3] hover:bg-[#2f3542]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* NDVI Cutoff Slider */}
          <div className="flex flex-col gap-2 p-3 bg-[#080e1a] rounded-lg border border-[#1a202c]">
            <div className="flex justify-between items-center">
              <span className="text-[#7df4ff]">Vegetation NDVI Cutoff:</span>
              <span className="text-[#00f0ff] font-bold">{ndviCutoff}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.05}
              value={ndviCutoff}
              onChange={(e) => setNdviCutoff(parseFloat(e.target.value))}
              className="accent-[#00f0ff] cursor-pointer"
            />
            <span className="text-[10px] text-[#849495]">
              Dense forest canopy corresponds to NDVI &gt; 0.6; healthy crops range 0.4 - 0.7.
            </span>
          </div>
        </div>

        {/* Right Dual Visual Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* View 1: Polarimetric SAR */}
            <div className="flex flex-col bg-[#161c28] rounded-xl overflow-hidden border border-[#242a36] shadow-lg">
              <div className="px-4 py-2.5 bg-[#1a202c] border-b border-[#242a36] flex items-center justify-between text-xs font-mono">
                <span className="text-[#dbfcff] font-bold">CALIBRATED SAR BACKSCATTER</span>
                <span className="text-[#00f0ff]">{polarization} CHANNEL</span>
              </div>
              <div className="relative aspect-square w-full bg-[#080e1a]">
                <img
                  alt="Synthetic aperture radar high contrast image"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT"
                />
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/80 font-mono text-[10px] text-[#7df4ff]">
                  INCIDENCE: 39.4° | C-BAND
                </div>
              </div>
              <div className="p-3 bg-[#161c28] text-[11px] font-mono text-[#b9cacb] flex justify-between">
                <span>Mean Backscatter: -18.2 dB</span>
                <span>Water Mask: {sarThreshold} dB Cutoff</span>
              </div>
            </div>

            {/* View 2: Fused Segmented Representation */}
            <div className="flex flex-col bg-[#161c28] rounded-xl overflow-hidden border border-[#242a36] shadow-lg">
              <div className="px-4 py-2.5 bg-[#1a202c] border-b border-[#242a36] flex items-center justify-between text-xs font-mono">
                <span className="text-[#00f0ff] font-bold">SPECTRAL CLASSIFICATION MASK</span>
                <span className="text-[#c4e7ff]">FUSED MULTI-INDEX</span>
              </div>
              <div className="relative aspect-square w-full bg-[#080e1a]">
                <img
                  alt="Segmented false color infrared analysis"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWclNmMhqjNd0b9r3rOG1mRdSRtROYY6weDStFTavsSGtJvpi-McG-M7Yf66CCh5vba7TmCyI0whwsQjMf_tHdwGnrRvBIfuIh5M1_R4cPNcJXexLz77dDd7XfzyhX9Oz2E0DTGLLg5sk8UZrolu-bUoSCQIXYmsjJ8Guk1csdyuvMZgW8Jct7dd4iaDTHGHTAwBkY1j1of_wRNpliKOHBnGCdZBLprRGETgBXm5ZapymTpJVDBhfG"
                />
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/80 font-mono text-[10px] text-[#00f0ff]">
                  {activeBandCombo}
                </div>
              </div>
              <div className="p-3 bg-[#161c28] text-[11px] font-mono text-[#b9cacb] flex justify-between">
                <span>Vegetation Health: 0.72 (Nominal)</span>
                <span>NDVI Threshold: {ndviCutoff}</span>
              </div>
            </div>
          </div>

          {/* Mathematical Equations Card */}
          <div className="p-4 bg-[#161c28] border border-[#242a36] rounded-xl font-mono text-xs text-[#dde2f3] flex flex-col gap-2">
            <span className="text-xs font-bold text-[#7df4ff] uppercase font-['Space_Grotesk']">
              Standard Remote Sensing Formulations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#b9cacb]">
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#00f0ff] font-semibold block mb-1">NDVI Index</span>
                <code>(NIR - Red) / (NIR + Red)</code>
              </div>
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#00f0ff] font-semibold block mb-1">NDWI Water Index</span>
                <code>(Green - NIR) / (Green + NIR)</code>
              </div>
              <div className="p-2.5 bg-[#080e1a] rounded border border-[#1a202c]">
                <span className="text-[#00f0ff] font-semibold block mb-1">Pauli RGB</span>
                <code>R: |HH-VV| | G: 2|HV| | B: |HH+VV|</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
