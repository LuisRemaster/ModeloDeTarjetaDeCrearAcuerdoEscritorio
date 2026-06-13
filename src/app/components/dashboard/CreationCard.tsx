import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserPlus, Calendar, ChevronLeft, Check } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '../../../lib/utils';

interface CreationCardProps {
  onCreated?: () => void;
  className?: string;
}

export function CreationCard({ onCreated, className }: CreationCardProps) {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    // Simular tiempo de IA
    setTimeout(() => {
      setIsAnalyzing(false);
      setPhase(2);
    }, 1500);
  };

  const handleCreate = () => {
    if (onCreated) onCreated();
  };

  return (
    <div className={cn(
      "w-full max-w-2xl mx-auto bg-[#253835] border border-[#225C4B]/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500",
      className
    )}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#225C4B]/5 blur-3xl rounded-full pointer-events-none"></div>

      {phase === 1 ? (
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6">
            <h2 className="text-2xl font-['Inter'] font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF9B6F]" />
              Nuevo Acuerdo
            </h2>
            <p className="text-[#D7C7A9] font-['Poppins'] text-sm">
              Describe el acuerdo en tus propias palabras. La IA se encargará de extraer las cláusulas y obligaciones.
            </p>
          </div>

          <div className="mb-6">
            <textarea
              className="w-full h-40 bg-[#1F2F2D] border border-[#225C4B]/30 rounded-2xl p-4 text-white font-['Poppins'] placeholder:text-[#D7C7A9]/40 focus:outline-none focus:border-[#FF9B6F]/50 focus:ring-1 focus:ring-[#FF9B6F]/50 transition-all resize-none"
              placeholder="Ej: Yo lavo los platos todos los días después de cenar y Zandra se encarga de tender la ropa los fines de semana..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !text.trim()}
              className="group"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analizando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Analizar con IA
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6 border-b border-[#225C4B]/20 pb-4">
            <button 
              onClick={() => setPhase(1)}
              className="p-2 -ml-2 rounded-full hover:bg-[#225C4B]/20 text-[#D7C7A9] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-['Inter'] font-bold text-white">Revisión del Acuerdo</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-['Inter'] font-medium uppercase tracking-widest bg-[#225C4B]/20 text-[#225C4B] border border-[#225C4B]/40">
                  Acuerdo
                </span>
              </div>
              <p className="text-[#D7C7A9] text-xs font-['Poppins'] mt-1">
                La IA ha extraído las siguientes obligaciones.
              </p>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Título del Acuerdo</label>
              <input 
                type="text"
                defaultValue="División de Tareas del Hogar"
                className="w-full bg-[#1F2F2D] border border-[#225C4B]/30 rounded-xl p-3 text-white font-['Poppins'] focus:outline-none focus:border-[#FF9B6F]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Cláusulas Extraídas</label>
              <div className="bg-[#1F2F2D] border border-[#225C4B]/20 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-[#225C4B]/10 rounded-full border border-[#225C4B]/30">
                    <Check className="w-3 h-3 text-[#225C4B]" />
                  </div>
                  <div>
                    <p className="text-sm font-['Poppins'] text-white">Lavar los platos todos los días después de cenar.</p>
                    <p className="text-xs font-['Inter'] text-[#FF9B6F] mt-0.5">Responsable: Tú</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-[#225C4B]/10 rounded-full border border-[#225C4B]/30">
                    <Check className="w-3 h-3 text-[#225C4B]" />
                  </div>
                  <div>
                    <p className="text-sm font-['Poppins'] text-white">Tender la ropa los fines de semana.</p>
                    <p className="text-xs font-['Inter'] text-[#D7C7A9] mt-0.5">Responsable: Zandra</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Invitar a</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7C7A9]" />
                  <input 
                    type="text"
                    placeholder="Usuario o email..."
                    defaultValue="zandra.v"
                    className="w-full bg-[#1F2F2D] border border-[#225C4B]/30 rounded-xl pl-9 p-3 text-sm text-white font-['Poppins'] focus:outline-none focus:border-[#FF9B6F]/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D7C7A9] font-['Inter'] font-semibold">Fecha Límite</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7C7A9]" />
                  <input 
                    type="text"
                    placeholder="Seleccionar..."
                    defaultValue="Sin fecha límite"
                    className="w-full bg-[#1F2F2D] border border-[#225C4B]/30 rounded-xl pl-9 p-3 text-sm text-white font-['Poppins'] focus:outline-none focus:border-[#FF9B6F]/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-[#225C4B]/20">
            <Button variant="ghost" onClick={() => setPhase(1)}>Cancelar</Button>
            <Button variant="primary" onClick={handleCreate}>Crear Acuerdo</Button>
          </div>
        </div>
      )}
    </div>
  );
}
