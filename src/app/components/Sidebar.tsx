import React from 'react';
import { Menu, Home, CheckSquare, Scale, Settings, FileText, Bell, Search } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside 
      className={`${
        isOpen ? 'w-72' : 'w-[72px]'
      } transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-gradient-to-b from-[#0f1117]/95 to-[#0c0e14]/95 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col relative z-20 shrink-0 h-full shadow-[4px_0_64px_-12px_rgba(0,0,0,0.5)]`}
    >
      {/* Subtle right edge glow */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none" />
      
      <div className="h-20 flex items-center px-5 justify-between border-b border-white/[0.08] shrink-0">
        <div className={`flex items-center overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center mr-4 shrink-0 shadow-[0_8px_24px_rgba(52,211,153,0.3)] border border-emerald-400/20 relative z-10">
               <span className="font-bold text-[#0a0a0f] text-[16px]">N</span>
            </div>
            {/* Logo glow */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl" />
          </div>
          <span className="font-['Playfair_Display',serif] font-semibold text-[22px] tracking-tight text-white whitespace-nowrap">Nexus</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 ${!isOpen ? 'mx-auto' : ''} border border-transparent hover:border-white/10`}
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex-1 py-8 flex flex-col gap-1.5 overflow-y-auto no-scrollbar px-4">
        {isOpen && (
          <div className="px-1 mb-8">
             <div className="bg-[#14161f]/70 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-3 flex items-center gap-3 text-gray-400 focus-within:border-emerald-500/30 focus-within:bg-[#14161f] transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
               <Search size={18} className="shrink-0" />
               <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-[14px] w-full placeholder:text-gray-500 text-gray-100" />
             </div>
          </div>
        )}

        <NavItem icon={<Home size={20} />} label="Inicio" isOpen={isOpen} />
        <NavItem icon={<FileText size={20} />} label="Mis Acuerdos" isOpen={isOpen} active />
        <NavItem icon={<CheckSquare size={20} />} label="Acuerdos comerciales" isOpen={isOpen} />
        <NavItem icon={<Bell size={20} />} label="Notificaciones" isOpen={isOpen} badge="3" />
        <NavItem icon={<Scale size={20} />} label="Menú Juez" isOpen={isOpen} />
      </div>

      <div className="p-4 border-t border-white/[0.08] shrink-0 mb-5">
        <NavItem icon={<Settings size={20} />} label="Configuración" isOpen={isOpen} />
        
        <div className={`mt-4 flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-[#14161f]/80 to-[#11131a]/60 backdrop-blur-sm border border-white/[0.08] cursor-pointer hover:bg-[#14161f] hover:border-white/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.2)]' : 'justify-center cursor-pointer hover:bg-white/5 rounded-2xl'}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-violet-500 to-blue-500 shrink-0 border border-white/20 shadow-[0_4px_16px_rgba(139,92,246,0.3)] flex items-center justify-center text-white font-bold text-[13px] relative z-10">
              LR
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-[2.5px] border-[#0f1117] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
            </div>
            {/* Avatar glow */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg" />
          </div>
          {isOpen && (
            <div className="flex flex-col overflow-hidden flex-1">
              <span className="text-[14px] font-semibold text-gray-100 truncate leading-tight">Luis Remaster</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-emerald-300 font-medium truncate uppercase tracking-wider">Plan Pro</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, isOpen, active = false, badge }: { icon: React.ReactNode, label: string, isOpen: boolean, active?: boolean, badge?: string }) => {
  return (
    <button 
      className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all w-full group mb-1
        ${active 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' 
          : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
        }
      `}
      title={!isOpen ? label : undefined}
    >
      <div className="flex items-center gap-3.5">
        <div className={`${active ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-200'} shrink-0 transition-colors`}>
          {icon}
        </div>
        <span className={`text-[14px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
          {label}
        </span>
      </div>
      
      {isOpen && badge && (
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold shadow-[0_0_8px_rgba(16,185,129,0.2)]">
          {badge}
        </span>
      )}
      {!isOpen && badge && !active && (
        <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
      )}
    </button>
  );
}