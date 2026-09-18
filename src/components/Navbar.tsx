import React from 'react';
import { Page } from '../types';
import { User } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onSelectPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onSelectPage }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'compare', label: 'Compare' },
    { id: 'history', label: 'History' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#040912]/80 backdrop-blur-md border-b border-[#121f33] px-6 sm:px-12 py-3.5 flex items-center justify-between">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onSelectPage('home')}
          className="flex items-center gap-2.5 cursor-pointer focus:outline-none group"
        >
          {/* Planet with Ring Logo */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#2dd4bf]">
              <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                transform="rotate(-28 12 12)"
              />
            </svg>
          </div>
          <div className="flex items-center text-lg font-semibold tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            <span className="text-white">SatQuery</span>
            <span className="ml-1.5 text-[#2dd4bf]">AI</span>
          </div>
        </button>

        {/* Delicate Connecting Path Separator */}
        <div className="hidden md:flex items-center ml-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1b2f4a]" />
          <div className="w-10 h-[1px] bg-gradient-to-r from-[#1b2f4a] to-transparent" />
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex items-center gap-8 sm:gap-10">
        {navItems.map((item) => {
          const isActive =
            currentPage === item.id ||
            (item.id === 'analyze' && currentPage === 'cross-modal');
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`relative text-sm font-medium transition-colors cursor-pointer py-1 ${
                isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}

              {/* Active illuminated teal glowing line indicator */}
              {isActive && (
                <div className="absolute -bottom-2 left-0 right-0 flex flex-col items-center">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent shadow-[0_0_12px_#2dd4bf]" />
                  <div className="w-6 h-1.5 bg-[#2dd4bf]/30 blur-sm -mt-0.5 rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Ready Status & Profile */}
      <div className="flex items-center gap-3">
        {/* Ready Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#091322] border border-[#162942] text-xs font-medium text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
          <span>Ready</span>
        </div>

        {/* User Avatar */}
        <button
          title="Account profile"
          className="w-8 h-8 rounded-full bg-[#091322] border border-[#162942] hover:border-[#2dd4bf]/60 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
