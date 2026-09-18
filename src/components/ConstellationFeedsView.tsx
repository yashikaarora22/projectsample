import React, { useState } from 'react';
import { SatelliteNode } from '../types';
import { SATELLITE_CONSTELLATION } from '../data/mockData';

interface ConstellationFeedsViewProps {
  selectedSatellite: SatelliteNode;
  onSelectSatellite: (sat: SatelliteNode) => void;
}

export const ConstellationFeedsView: React.FC<ConstellationFeedsViewProps> = ({
  selectedSatellite,
  onSelectSatellite,
}) => {
  const [filterAgency, setFilterAgency] = useState<string>('ALL');

  const filteredSats =
    filterAgency === 'ALL'
      ? SATELLITE_CONSTELLATION
      : SATELLITE_CONSTELLATION.filter((s) => s.agency.includes(filterAgency));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#1a202c] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs uppercase font-bold">
            ORBITAL DYNAMICS &amp; GROUND TRACK
          </span>
          <span className="text-[#b9cacb] text-xs font-mono">18 TASKED LEO PLATFORMS</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-[#dbfcff] uppercase">
          Constellation Live Telemetry &amp; Downlink Feeds
        </h1>
        <p className="text-sm text-[#b9cacb]">
          Real-time tracking of spaceborne SAR and multispectral assets from ESA Copernicus, NASA/USGS Landsat, and ISRO EOS series.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap font-['Space_Grotesk'] text-xs uppercase font-semibold">
        <span className="text-[#b9cacb] font-mono mr-2">SPACE AGENCY:</span>
        {['ALL', 'ESA', 'ISRO', 'NASA', 'Planet', 'Maxar'].map((agency) => (
          <button
            key={agency}
            onClick={() => setFilterAgency(agency)}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              filterAgency === agency
                ? 'bg-[#00f0ff] text-[#00363a]'
                : 'bg-[#161c28] text-[#b9cacb] hover:bg-[#242a36]'
            }`}
          >
            {agency}
          </button>
        ))}
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSats.map((sat) => {
          const isSelected = selectedSatellite.id === sat.id;
          return (
            <div
              key={sat.id}
              onClick={() => onSelectSatellite(sat)}
              className={`p-5 rounded-xl border flex flex-col gap-4 font-mono text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#161c28] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'bg-[#161c28] border-[#242a36] hover:border-[#3b494b]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse" />
                  <span className="text-base font-bold text-[#dbfcff] font-['Space_Grotesk'] uppercase">
                    {sat.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#080e1a] text-[10px] text-[#7df4ff] border border-[#242a36]">
                  {sat.agency}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-[11px] text-[#b9cacb] bg-[#080e1a] p-3 rounded-lg border border-[#1a202c]">
                <div className="flex justify-between">
                  <span>SENSOR:</span>
                  <span className="text-[#dbfcff] font-semibold">{sat.sensor}</span>
                </div>
                <div className="flex justify-between">
                  <span>TYPE:</span>
                  <span className="text-[#00f0ff] font-semibold">{sat.sensorType}</span>
                </div>
                <div className="flex justify-between">
                  <span>SWATH WIDTH:</span>
                  <span className="text-[#dbfcff]">{sat.swathWidthKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span>RESOLUTION:</span>
                  <span className="text-[#dbfcff]">{sat.resolutionMeters}m / pixel</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-[#0e131f] rounded border border-[#1a202c]">
                  <span className="text-[#849495] block">ALTITUDE</span>
                  <span className="text-[#00dbe9] font-bold">{sat.altitudeKm} KM</span>
                </div>
                <div className="p-2 bg-[#0e131f] rounded border border-[#1a202c]">
                  <span className="text-[#849495] block">DOWNLINK</span>
                  <span className="text-[#c4e7ff] font-bold">{sat.downlinkMbps} Mbps</span>
                </div>
                <div className="p-2 bg-[#0e131f] rounded border border-[#1a202c]">
                  <span className="text-[#849495] block">BATTERY</span>
                  <span className="text-[#7df4ff] font-bold">{sat.batteryPercent}%</span>
                </div>
                <div className="p-2 bg-[#0e131f] rounded border border-[#1a202c]">
                  <span className="text-[#849495] block">NEXT PASS</span>
                  <span className="text-[#dbfcff] font-bold">{sat.nextPass}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#242a36]">
                <span className="text-[10px] text-[#849495]">ORBIT #{sat.orbitRev}</span>
                <span
                  className={`text-[10px] uppercase font-bold ${
                    isSelected ? 'text-[#00f0ff]' : 'text-[#b9cacb]'
                  }`}
                >
                  {isSelected ? '✓ ACTIVE SELECTION' : 'SELECT PLATFORM →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
