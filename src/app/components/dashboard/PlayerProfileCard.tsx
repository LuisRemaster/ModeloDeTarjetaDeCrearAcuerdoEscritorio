import React, { useState } from 'react';
import { X, Settings, LogOut, Shield, ShieldAlert, Award, ChevronLeft } from 'lucide-react';
import { Button } from '../Button';

interface PlayerProfileCardProps {
  onClose: () => void;
}

export function PlayerProfileCard({ onClose }: PlayerProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A100E]/80 backdrop-blur-md">
      {/* Botón para cerrar fijo en el fondo oscuro */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-[#1F2F2D] border border-[#225C4B]/50 rounded-full text-[#D7C7A9] hover:text-white hover:bg-[#225C4B]/40 transition-colors shadow-lg z-50 cursor-pointer"
        aria-label="Cerrar perfil"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contenedor 3D de la tarjeta */}
      <div className="w-full max-w-sm h-[500px] perspective-1000">
        <div className={`w-full h-full relative transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* ANVERSO */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-[#1F2F2D] border border-[#225C4B]/30 rounded-3xl shadow-[0_0_40px_rgba(34,92,75,0.2)] overflow-hidden flex flex-col">
            <div className="h-32 bg-gradient-to-br from-[#225C4B]/80 to-[#1F2F2D] relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-[#1F2F2D] bg-[#C86B52] flex items-center justify-center shadow-xl">
                <span className="text-white text-3xl font-['Inter'] font-bold">Z</span>
              </div>
            </div>
            
            <div className="flex-1 px-6 pt-14 pb-6 flex flex-col">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-['Inter'] font-bold text-white">Zandra V.</h2>
                <p className="text-[#D7C7A9] text-sm font-['Poppins']">Guardián de Acuerdos</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#225C4B]/20 border border-[#225C4B]/40 text-[#225C4B] font-['Inter'] font-medium text-xs">
                  <Shield className="w-3 h-3" /> Nivel de Confianza: 92%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-auto">
                <div className="bg-[#0A100E]/50 p-3 rounded-2xl border border-[#225C4B]/20 text-center">
                  <span className="block text-2xl font-bold text-white font-['Inter']">14</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#D7C7A9] font-['Poppins']">Acuerdos Activos</span>
                </div>
                <div className="bg-[#0A100E]/50 p-3 rounded-2xl border border-[#225C4B]/20 text-center">
                  <span className="block text-2xl font-bold text-white font-['Inter']">128</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#D7C7A9] font-['Poppins']">Compromisos Cumplidos</span>
                </div>
              </div>
              
              {/* Trigger para voltear la tarjeta (NO en el avatar) */}
              <button 
                onClick={() => setIsFlipped(true)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-[#225C4B]/10 hover:bg-[#225C4B]/20 border border-[#225C4B]/30 rounded-xl text-white font-['Inter'] text-sm transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#D7C7A9]" />
                Opciones y Configuración
              </button>
            </div>
          </div>
          
          {/* REVERSO */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#1F2F2D] border border-[#FF9B6F]/20 rounded-3xl shadow-[0_0_40px_rgba(255,155,111,0.1)] overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[#225C4B]/20 flex items-center gap-3">
              <button 
                onClick={() => setIsFlipped(false)}
                className="p-2 -ml-2 rounded-full hover:bg-[#225C4B]/20 text-[#D7C7A9] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-['Inter'] font-bold text-white">Configuración</h3>
            </div>
            
            <div className="flex-1 px-6 py-6 flex flex-col gap-6 overflow-y-auto">
              
              {/* Tokens de usuario */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Tus Tokens de Confianza</h4>
                <div className="bg-[#225C4B]/10 border border-[#225C4B]/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#FF9B6F]" />
                    <div>
                      <span className="block text-white font-bold font-['Inter'] text-xl">450</span>
                      <span className="text-xs text-[#D7C7A9]">Tokens Disponibles</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs border-[#225C4B]/50 px-3 py-1.5 h-auto">
                    Canjear
                  </Button>
                </div>
              </div>
              
              {/* Opciones separadas */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Opciones de Cuenta</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-xl bg-[#0A100E]/40 hover:bg-[#0A100E]/80 border border-transparent hover:border-[#225C4B]/30 text-white font-['Poppins'] text-sm transition-colors cursor-pointer">
                    Privacidad de Perfil
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl bg-[#0A100E]/40 hover:bg-[#0A100E]/80 border border-transparent hover:border-[#225C4B]/30 text-white font-['Poppins'] text-sm transition-colors cursor-pointer">
                    Notificaciones
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl bg-[#0A100E]/40 hover:bg-[#0A100E]/80 border border-transparent hover:border-[#225C4B]/30 text-white font-['Poppins'] text-sm transition-colors cursor-pointer">
                    Métodos de Verificación
                  </button>
                </div>
              </div>

              {/* Botones de sistema */}
              <div className="mt-auto space-y-3 pt-6 border-t border-[#225C4B]/20">
                <h4 className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Sistema</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0A100E]/60 border border-[#225C4B]/20 text-[#D7C7A9] hover:text-white hover:bg-[#225C4B]/20 transition-colors text-sm font-['Poppins'] cursor-pointer">
                    <ShieldAlert className="w-4 h-4" /> Soporte
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#C86B52]/10 border border-[#C86B52]/20 text-[#C86B52] hover:bg-[#C86B52]/20 transition-colors text-sm font-['Poppins'] cursor-pointer">
                    <LogOut className="w-4 h-4" /> Salir
                  </button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
