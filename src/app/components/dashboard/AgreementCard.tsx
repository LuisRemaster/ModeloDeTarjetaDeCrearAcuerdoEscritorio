import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareText, MoreHorizontal, MessageSquarePlus, CornerDownLeft, CircleDot } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../Button';

interface AgreementCardProps {
  title: string;
  type: 'COMPROMISO' | 'ACUERDO';
  status: 'ACTIVO' | 'PENDIENTE' | 'COMPLETADO' | 'EN DISPUTA';
  participants: { name: string; initial: string; color: string }[];
  progress: number;
  timeAgo: string;
  isMyTurn?: boolean;
  hasPendingInvite?: boolean;
}

export function AgreementCard({
  title,
  type,
  status,
  participants,
  progress,
  timeAgo,
  isMyTurn,
  hasPendingInvite
}: AgreementCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Colores de los badges según estado
  const statusColors = {
    ACTIVO: 'bg-[#225C4B]/20 text-[#225C4B] border-[#225C4B]/40',
    PENDIENTE: 'bg-[#FF9B6F]/20 text-[#FF9B6F] border-[#FF9B6F]/40',
    COMPLETADO: 'bg-[#D7C7A9]/20 text-[#D7C7A9] border-[#D7C7A9]/40',
    'EN DISPUTA': 'bg-[#C86B52]/20 text-[#C86B52] border-[#C86B52]/40',
  };

  // Colores de los badges según tipo
  const typeColors = {
    COMPROMISO: 'bg-[#FF9B6F] text-[#1F2F2D] border-none shadow-[0_2px_10px_rgba(255,155,111,0.2)]',
    ACUERDO: 'bg-[#225C4B] text-white border-none shadow-[0_2px_10px_rgba(34,92,75,0.2)]',
  };

  const getBorderColor = () => {
    if (isMyTurn) return 'border-[#225C4B]/60 shadow-[0_0_15px_rgba(34,92,75,0.4)] animate-pulse';
    if (hasPendingInvite) return 'border-[#FF9B6F]/60 shadow-[0_0_15px_rgba(255,155,111,0.4)] animate-pulse';
    return 'border-[#225C4B]/20 hover:border-[#225C4B]/40';
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative perspective-1000 w-full"
    >
      <div 
        className={cn(
          "w-full relative transition-transform duration-700 preserve-3d",
          isFlipped ? 'rotate-y-180' : ''
        )}
        style={{ minHeight: isFlipped ? '400px' : '180px' }}
      >
        
        {/* ANVERSO */}
        <div className={cn(
          "absolute inset-0 w-full h-full backface-hidden bg-[#253835] rounded-3xl p-5 flex flex-col transition-colors",
          getBorderColor(),
          "border shadow-lg"
        )}>
          <div className="flex justify-between items-center mb-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-['Inter'] font-bold uppercase tracking-widest",
              typeColors[type]
            )}>
              {type}
            </span>
            <span className="text-xs text-[#D7C7A9] font-['Poppins'] opacity-70">
              {timeAgo}
            </span>
          </div>

          <h3 className="text-xl font-['Inter'] font-bold text-white mb-auto leading-tight line-clamp-2 pr-4">
            {title}
          </h3>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-end gap-4">
              <div className="flex -space-x-3">
                {participants.map((p, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-['Inter'] font-bold text-sm border-2 border-[#253835] shadow-sm z-10",
                      p.color
                    )}
                    style={{ zIndex: participants.length - i }}
                    title={p.name}
                  >
                    {p.initial}
                  </div>
                ))}
              </div>
              
              {status !== 'PENDIENTE' && (
                <div className="flex flex-col items-end gap-1.5 flex-1 max-w-[50%] mr-10">
                  <span className="text-xs text-white font-['Inter'] font-bold">{progress}%</span>
                  <div className="h-1.5 w-full bg-[#1F2F2D] rounded-full overflow-hidden border border-[#225C4B]/20">
                    <div 
                      className="h-full bg-[#FF9B6F] transition-all duration-500 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="absolute bottom-5 right-5 p-2.5 rounded-full bg-[#225C4B]/20 hover:bg-[#225C4B]/40 text-[#FF9B6F] hover:text-white transition-colors cursor-pointer"
            aria-label="Ver detalles"
          >
            <MessageSquareText className="w-4 h-4" />
          </button>
        </div>

        {/* REVERSO */}
        <div className={cn(
          "absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#1F2F2D] rounded-2xl flex flex-col border",
          getBorderColor()
        )}>
          {/* Header del Chat */}
          <div className="px-5 py-4 border-b border-[#225C4B]/20 flex items-center justify-between bg-[#225C4B]/5 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFlipped(false)}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-[#225C4B]/20 text-[#D7C7A9] transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
              <div>
                <h4 className="text-sm font-['Inter'] font-bold text-white truncate max-w-[200px]">{title}</h4>
                <span className="text-[10px] text-[#D7C7A9] font-['Poppins']">2 participantes</span>
              </div>
            </div>
            <button className="p-1.5 text-[#D7C7A9] hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A100E]/20">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C86B52] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-md">Z</div>
              <div className="group relative max-w-[85%]">
                <div className="bg-[#1F2F2D] border border-[#225C4B]/20 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-white text-xs font-['Poppins'] leading-relaxed">
                    Oye, no voy a poder lavar los platos hoy en la noche. ¿Podemos cambiar el turno?
                  </p>
                </div>
                {/* Botón azul para formalizar modificación */}
                <button 
                  className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-[#4A90E2] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
                  title="Purificar texto en modificación formal"
                >
                  <MessageSquarePlus className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <div className="group relative max-w-[85%]">
                {/* Botón azul para formalizar modificación */}
                <button 
                  className="absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 bg-[#4A90E2] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
                  title="Purificar texto en modificación formal"
                >
                  <MessageSquarePlus className="w-3 h-3" />
                </button>
                <div className="bg-[#225C4B]/20 border border-[#225C4B]/30 p-3 rounded-2xl rounded-tr-none shadow-sm">
                  <p className="text-white text-xs font-['Poppins'] leading-relaxed">
                    Está bien, yo lo hago hoy y tú mañana.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#225C4B] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-md">L</div>
            </div>

            <div className="flex justify-center pt-2">
              <div className="bg-[#225C4B]/10 text-[#225C4B] text-[10px] font-['Poppins'] px-3 py-1 rounded-full border border-[#225C4B]/20 font-medium flex items-center gap-1.5">
                <CircleDot className="w-3 h-3" /> Modificación formal registrada
              </div>
            </div>
          </div>

          {/* Input del Chat */}
          <div className="p-3 border-t border-[#225C4B]/20 bg-[#1F2F2D] rounded-b-2xl">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                className="w-full bg-[#0A100E]/50 border border-[#225C4B]/30 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white font-['Poppins'] focus:outline-none focus:border-[#FF9B6F]/50 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#FF9B6F] text-[#1F2F2D] rounded-lg hover:bg-[#ff8552] transition-colors cursor-pointer">
                <MessageSquarePlus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
