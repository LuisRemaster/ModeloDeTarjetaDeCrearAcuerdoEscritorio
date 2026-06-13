import React, { useState } from 'react';
import { ShieldCheck, Settings, Bell } from 'lucide-react';
import { PlayerProfileCard } from './PlayerProfileCard';

export function TopBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1F2F2D]/95 backdrop-blur-md border-b border-[#225C4B]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <ShieldCheck className="h-6 w-6 text-[#FF9B6F]" />
            <span className="font-['Inter'] font-bold text-lg text-white tracking-tight">AcuerdosApp</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 text-[#D7C7A9] hover:text-white transition-colors cursor-pointer"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF9B6F] rounded-full border border-[#1F2F2D]"></span>
            </button>
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer pl-2 border-l border-[#225C4B]/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#C86B52] border border-[#1F2F2D] flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-['Inter'] font-bold">Z</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {isProfileOpen && (
        <PlayerProfileCard onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  );
}
