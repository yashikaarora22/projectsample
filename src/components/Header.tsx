import React, { useState, useEffect } from 'react';
import { NavigationTab, SensorMode } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeSensor: SensorMode;
  onSelectSensor: (mode: SensorMode) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  activeSensor,
  onSelectSensor,
  onOpenSettings,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [epochSec, setEpochSec] = useState<number>(763198.42);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`);
      setEpochSec((prev) => +(prev + 1.0).toFixed(2));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems: { key: NavigationTab; label: string }[] = [
    { key: 'orbital-explorer', label: 'Orbital Explorer' },
    { key: 'multimodal-query', label: 'Multimodal Query' },
    { key: 'sar-spectral-analytics', label: 'SAR & Spectral Analytics' },
    { key: 'constellation-feeds', label: 'Constellation Feeds' },
    { key: 'mission-logs', label: 'Mission Logs' },
  ];

  const sensorModes: SensorMode[] = ['SAR', 'OPTICAL', 'THERMAL', 'HYPER'];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#080e1a]/95 backdrop-blur-xl border-b border-[#1a202c] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Primary Navigation Row */}
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Mission Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('orbital-explorer')}
            className="flex items-center gap-3 focus:outline-none text-left cursor-pointer group"
          >
            <img
              alt="SatQuery AI Logo"
              className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7aF6RA2Fsct1haPexXyhMkR639HtFrP4iAWIAHF9_eY2Vbkyckcnew9WIfqxERJRWZJHNxiMU6s-KSTa7sJ8LjXZIBHCzptTrrla2X9tT8PBYbja8hm3e1SGSVzMzlMNAruhtBE2RLEPIgQtjYBUMCtRWgZYXtqPPC8JINlB-7f4QfkPcy6Qdd69jg92LyGTiPbmHxKbNmLi9XHll0BG9t7M4QMnpbIaD3by3eKB2OjsEODM1lPT_"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#dbfcff] uppercase tracking-wider">
                  SatQuery AI
                </span>
                <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#7df4ff] font-['Space_Grotesk'] text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5 border border-[#3b494b]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                  ORBIT SYS: ONLINE | LEO 540KM
                </span>
              </div>
              <span className="font-['Space_Grotesk'] text-[11px] text-[#b9cacb] uppercase tracking-wide">
                Orbital Telemetry &amp; Earth Observation Suite
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`px-3.5 py-1.5 rounded-lg transition-all font-['Space_Grotesk'] text-[12px] font-semibold uppercase tracking-wider cursor-pointer ${
                  isActive
                    ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'text-[#b9cacb] hover:bg-[#242a36] hover:text-[#dde2f3]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Cluster */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Sensor Quick Switcher */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-[#161c28] border border-[#242a36]">
            <span className="font-['Space_Grotesk'] text-[10px] text-[#7df4ff] uppercase font-semibold px-1">
              SENSOR:
            </span>
            {sensorModes.map((mode) => (
              <button
                key={mode}
                onClick={() => onSelectSensor(mode)}
                className={`px-2 py-0.5 rounded text-[10px] font-['Space_Grotesk'] font-semibold transition-colors uppercase ${
                  activeSensor === mode
                    ? 'bg-[#00f0ff] text-[#00363a]'
                    : 'text-[#b9cacb] hover:text-[#dbfcff] hover:bg-[#242a36]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Time & Sync Telemetry */}
          <div className="hidden lg:flex flex-col text-right font-mono">
            <span className="text-[11px] text-[#dde2f3] tracking-tight">{utcTime}</span>
            <span className="text-[10px] text-[#00dbe9] flex items-center justify-end gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
              SATELLITE SYNC: 99.8%
            </span>
          </div>

          {/* User Profile / Settings CTA */}
          <button
            onClick={onOpenSettings}
            title="System Settings &amp; ISRO SIH Configuration"
            className="w-8 h-8 rounded-full bg-[#00f0ff] hover:bg-[#7df4ff] transition-all flex items-center justify-center text-[#00363a] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Keplerian Orbital Telemetry Strip */}
      <div className="w-full bg-[#080e1a]/95 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[#b9cacb] font-mono text-[10px] border-t border-[#1a202c] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-6 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="text-[#7df4ff] font-semibold">EPOCH:</span> J2000.0 (SEC {epochSec})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#7df4ff] font-semibold">KEPLER:</span> INC 97.42° | ECC 0.00114 | RAAN 142.18°
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#7df4ff] font-semibold">NADIR COORD:</span> 42°18&apos;24&quot;N 071°04&apos;12&quot;W
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#7df4ff] font-semibold">GS LINK:</span> SVALBARD SGS-04 [LOCKED]
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 shrink-0 pl-4">
          <span className="text-[#7bd0ff] flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            S-BAND: 48 dBm
          </span>
          <span className="text-[#b9cacb]">BITRATE: 850 Mbps</span>
        </div>
      </div>

      {/* Mobile nav drawer items for small screens */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-1.5 bg-[#0e131f] border-t border-[#1a202c] overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`px-2.5 py-1 rounded text-[11px] font-['Space_Grotesk'] font-semibold whitespace-nowrap uppercase ${
                isActive ? 'bg-[#00f0ff] text-[#00363a]' : 'text-[#b9cacb] hover:text-[#dde2f3]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
