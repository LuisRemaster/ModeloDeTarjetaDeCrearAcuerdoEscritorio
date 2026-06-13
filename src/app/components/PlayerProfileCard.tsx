import React, { useState, useEffect } from 'react';
import { PlayCircle, Mail, Zap, CheckCircle, Coins, ArrowLeft, Pencil, LogOut, BadgeCheck, X, Settings } from 'lucide-react';

interface PlayerProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_PROFILE = {
  nickname: "LuisHunter",
  avatar: "https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NDY4Njg1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  reliability: 87,
  tuTurno: 3,
  invitaciones: 1,
  activos: 5,
  completados: 12,
  tokens: 142,
  nombreCompleto: "Luis Alejandro Pérez",
  correo: "luis@acuerdosapp.com",
  miembroDesde: "Marzo 2026",
  verificado: true,
  notificaciones: true,
  perfilPublico: false,
};

const ReliabilityCircle = ({ value }: { value: number }) => {
  const radius = 54;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  let colorClass = 'text-orange-500';
  let glowClass = '';
  if (value > 80) {
    colorClass = 'text-emerald-400';
    glowClass = 'drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]';
  } else if (value >= 60) {
    colorClass = 'text-amber-400';
  }

  return (
    <div className="relative flex items-center justify-center w-[120px] h-[120px] mx-auto my-6">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="rgba(255,255,255,0.06)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
          strokeLinecap="round"
          className={`${colorClass} ${glowClass}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[36px] font-bold text-white leading-none">{value}%</span>
        <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-1.5 font-medium">Confiabilidad</span>
      </div>
    </div>
  );
};

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({ isOpen, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Toggles state for the back card
  const [notificationsEnabled, setNotificationsEnabled] = useState(MOCK_PROFILE.notificaciones);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(MOCK_PROFILE.perfilPublico);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsFlipped(false);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  // Compute avatar border color
  let avatarBorder = 'border-orange-500';
  let avatarGlow = '';
  if (MOCK_PROFILE.reliability > 80) {
    avatarBorder = 'border-emerald-500';
    avatarGlow = 'shadow-[0_0_15px_rgba(16,185,129,0.4)]';
  } else if (MOCK_PROFILE.reliability >= 60) {
    avatarBorder = 'border-amber-500';
  }

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* External Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full z-[110]"
      >
        <X className="w-5 h-5" />
      </button>

      {/* 3D Flip Container */}
      <div 
        className={`relative w-full max-w-[360px] perspective-[1200px] transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
      >
        <div 
          className={`w-full relative transition-transform duration-700 ease-in-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT FACE */}
          <div 
            className="w-full bg-[#0c1418] border border-white/[0.08] rounded-[24px] shadow-2xl flex flex-col overflow-hidden relative"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-emerald-500/10 blur-[50px] pointer-events-none rounded-full" />
            
            {/* Settings Trigger Icon */}
            <button 
              onClick={() => setIsFlipped(true)}
              className="absolute top-4 left-4 text-slate-500 hover:text-emerald-400 transition-colors p-2 z-10"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex-1 px-6 py-8 flex flex-col relative z-0">
              
              {/* Header */}
              <div className="flex flex-col items-center">
                <div className={`w-[72px] h-[72px] rounded-full border-[2.5px] ${avatarBorder} ${avatarGlow} p-0.5`}>
                  <img 
                    src={MOCK_PROFILE.avatar} 
                    alt={MOCK_PROFILE.nickname} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="mt-3 flex flex-col items-center">
                  <h2 
                    className="text-[18px] text-white font-semibold tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {MOCK_PROFILE.nickname}
                  </h2>
                  {MOCK_PROFILE.verificado ? (
                    <div className="flex items-center gap-1.5 mt-1">
                      <BadgeCheck className="w-[14px] h-[14px] text-emerald-400" />
                      <span className="text-[12px] text-emerald-400 font-medium">Verificado</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[12px] text-slate-500 font-medium">Sin verificar</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reliability Metric */}
              <ReliabilityCircle value={MOCK_PROFILE.reliability} />

              {/* Grid 2x2 Micro-filters */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {/* Tu Turno */}
                <button 
                  onClick={onClose}
                  className={`flex flex-col items-start p-3.5 rounded-xl bg-white/[0.03] border transition-all duration-300 hover:bg-white/[0.06] ${
                    MOCK_PROFILE.tuTurno > 0 
                      ? 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                      : 'border-white/[0.06] opacity-60'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-2">
                    <PlayCircle className={`w-[18px] h-[18px] ${MOCK_PROFILE.tuTurno > 0 ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className={`text-[16px] font-bold ${MOCK_PROFILE.tuTurno > 0 ? 'text-emerald-300' : 'text-slate-400'}`}>
                      {MOCK_PROFILE.tuTurno}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-300 font-medium">Tu Turno</span>
                </button>

                {/* Invitaciones */}
                <button 
                  onClick={onClose}
                  className={`flex flex-col items-start p-3.5 rounded-xl bg-white/[0.03] border transition-all duration-300 hover:bg-white/[0.06] ${
                    MOCK_PROFILE.invitaciones > 0 
                      ? 'border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                      : 'border-white/[0.06] opacity-60'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-2">
                    <Mail className={`w-[18px] h-[18px] ${MOCK_PROFILE.invitaciones > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className={`text-[16px] font-bold ${MOCK_PROFILE.invitaciones > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                      {MOCK_PROFILE.invitaciones}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-300 font-medium">Invitaciones</span>
                </button>

                {/* Activos */}
                <button 
                  onClick={onClose}
                  className={`flex flex-col items-start p-3.5 rounded-xl bg-white/[0.03] border transition-all duration-300 hover:bg-white/[0.06] ${
                    MOCK_PROFILE.activos > 0 
                      ? 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                      : 'border-white/[0.06] opacity-60'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-2">
                    <Zap className={`w-[18px] h-[18px] ${MOCK_PROFILE.activos > 0 ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className={`text-[16px] font-bold ${MOCK_PROFILE.activos > 0 ? 'text-cyan-300' : 'text-slate-400'}`}>
                      {MOCK_PROFILE.activos}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-300 font-medium">Activos</span>
                </button>

                {/* Completados */}
                <button 
                  onClick={onClose}
                  className={`flex flex-col items-start p-3.5 rounded-xl bg-white/[0.03] border transition-all duration-300 hover:bg-white/[0.06] ${
                    MOCK_PROFILE.completados > 0 
                      ? 'border-slate-500/30 shadow-[0_0_15px_rgba(100,116,139,0.05)]' 
                      : 'border-white/[0.06] opacity-60'
                  }`}
                >
                  <div className="flex justify-between w-full items-center mb-2">
                    <CheckCircle className={`w-[18px] h-[18px] ${MOCK_PROFILE.completados > 0 ? 'text-slate-300' : 'text-slate-400'}`} />
                    <span className={`text-[16px] font-bold ${MOCK_PROFILE.completados > 0 ? 'text-white' : 'text-slate-400'}`}>
                      {MOCK_PROFILE.completados}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-300 font-medium">Completados</span>
                </button>
              </div>

              {/* Settings Link */}
              <div className="mt-auto pt-6 flex items-center justify-center">
                <button 
                  onClick={() => setIsFlipped(true)}
                  className="text-[12px] text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Cuenta y configuración →
                </button>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-[#0c1418] border border-white/[0.08] rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Header Back */}
            <div className="flex items-center p-6 border-b border-white/[0.04]">
              <button 
                onClick={() => setIsFlipped(false)}
                className="text-slate-400 hover:text-emerald-400 transition-colors p-1 -ml-1 mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-[15px] font-medium text-slate-200 tracking-wide">Mi Cuenta</h3>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              {/* User Data (Read-only) */}
              <div className="flex flex-col">
                <div className="py-3 border-b border-white/[0.04]">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Nombre completo</label>
                  <p className="text-[14px] text-white">{MOCK_PROFILE.nombreCompleto}</p>
                </div>
                <div className="py-3 border-b border-white/[0.04]">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Correo</label>
                  <p className="text-[14px] text-white">{MOCK_PROFILE.correo}</p>
                </div>
                <div className="py-3 border-b border-white/[0.04]">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Miembro desde</label>
                  <p className="text-[14px] text-white">{MOCK_PROFILE.miembroDesde}</p>
                </div>
                {MOCK_PROFILE.tokens > 0 && (
                  <div className="py-3 border-b border-white/[0.04]">
                    <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Tokens Disponibles</label>
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-[14px] h-[14px] text-emerald-400" />
                      <span className="text-[14px] text-white font-medium">{MOCK_PROFILE.tokens}</span>
                    </div>
                  </div>
                )}
                <div className="py-3 border-b border-white/[0.04]">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Estado de verificación</label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {MOCK_PROFILE.verificado ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[14px] text-emerald-400 font-medium">Verificado</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <span className="text-[14px] text-amber-400 font-medium">Pendiente</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings (Toggles) */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-slate-200">Notificaciones push</span>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between pb-4">
                  <span className="text-[14px] text-slate-200">Perfil público</span>
                  <button 
                    onClick={() => setPublicProfileEnabled(!publicProfileEnabled)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${publicProfileEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${publicProfileEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* System Actions */}
              <div className="mt-auto pt-4 flex flex-col gap-3 border-t border-white/[0.04]">
                <button className="flex items-center gap-3 w-full py-2 text-slate-400 hover:text-emerald-400 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-emerald-500/10 flex items-center justify-center transition-colors">
                    <Pencil className="w-[14px] h-[14px]" />
                  </div>
                  <span className="text-[14px] font-medium">Editar perfil</span>
                </button>
                <button className="flex items-center gap-3 w-full py-2 text-slate-500 hover:text-slate-300 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-white/[0.08] flex items-center justify-center transition-colors">
                    <LogOut className="w-[14px] h-[14px]" />
                  </div>
                  <span className="text-[14px] font-medium">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
