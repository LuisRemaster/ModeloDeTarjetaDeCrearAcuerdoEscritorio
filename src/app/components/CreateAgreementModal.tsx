import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ThumbsUp, AlertCircle, AlertTriangle, X, Loader2 } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'error' | 'warning';
  text: string;
}

interface CreateAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAgreementModal: React.FC<CreateAgreementModalProps> = ({ isOpen, onClose }) => {
  const [text, setText] = useState('Tengo que lanzar esta app para el fin de semana');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Mock analysis process
  const handleAnalyze = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setSuggestions([]); // Clear previous
    
    setTimeout(() => {
      setSuggestions([
        { id: '1', type: 'error', text: 'No se identifican las partes del acuerdo (quién desarrolla y para quién).' },
        { id: '2', type: 'error', text: 'Falta especificar qué constituye exactamente "lanzar la app".' },
        { id: '3', type: 'warning', text: '"Fin de semana" es impreciso - especificar fecha y hora exacta.' },
        { id: '4', type: 'warning', text: 'El acuerdo parece unilateral - solo una parte tiene obligaciones.' }
      ]);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  const dismissSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-[#0d1f1a] via-[#0a1812] to-[#08150f] rounded-[28px] overflow-hidden shadow-[0_32px_96px_-16px_rgba(0,0,0,0.9)] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
        
        {/* Ornate border */}
        <div className="absolute inset-0 rounded-[28px] border-4 border-double border-amber-600/40 shadow-[inset_0_0_60px_rgba(217,119,6,0.1)] pointer-events-none" />
        <div className="absolute inset-[6px] rounded-[24px] border border-amber-500/30 pointer-events-none" />
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-amber-500/60 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-amber-500/60 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-amber-500/60 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-amber-500/60 rounded-br-xl pointer-events-none" />
        
        {/* Golden glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-sm pointer-events-none" />
        
        {/* Header */}
        <div className="px-10 pt-10 pb-6 flex justify-between items-start relative z-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-[34px] font-['Playfair_Display',serif] font-semibold text-amber-100 tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Crea tu acuerdo
            </h2>
            <p className="text-[14px] text-emerald-300/80 font-light tracking-wide italic">
              Describe los términos y condiciones de tu acuerdo
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-600/30 hover:border-amber-500/50 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all duration-300 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-10 pb-10 flex flex-col gap-7 relative z-10">
          
          {/* Descriptor / Text Area Container */}
          <div className="relative flex flex-col bg-[#0f1a16]/70 backdrop-blur-sm rounded-[20px] border border-amber-600/30 overflow-hidden focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all shadow-[inset_0_2px_12px_rgba(0,0,0,0.4)]">
            
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent p-7 text-amber-100 placeholder:text-amber-600/40 outline-none resize-none min-h-[160px] text-[15px] leading-relaxed font-light"
              placeholder="Ej. Que Zandra lave los platos toda la semana..."
            />
            
            {/* Suggestions Container (Appears INSIDE the descriptor area at the bottom) */}
            {(suggestions.length > 0 || isAnalyzing) && (
              <div className="bg-[#08150f]/90 backdrop-blur-md border-t border-amber-600/30 p-5 flex flex-col gap-3.5 max-h-[280px] overflow-y-auto custom-scrollbar">
                
                {isAnalyzing && (
                  <div className="flex items-center justify-center py-8 text-amber-400 gap-3 animate-pulse">
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-[15px] font-medium tracking-wide">Analizando tu propuesta...</span>
                  </div>
                )}

                {!isAnalyzing && suggestions.map((sug, index) => (
                  <SuggestionItem 
                    key={sug.id} 
                    suggestion={sug} 
                    onDismiss={() => dismissSuggestion(sug.id)} 
                    index={index} 
                  />
                ))}

                {!isAnalyzing && suggestions.length === 0 && hasAnalyzed && (
                   <div className="flex items-center justify-center py-6 text-emerald-400 gap-2">
                     <span className="text-[14px]">¡Todas las sugerencias resueltas!</span>
                   </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-2">
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className="group relative flex items-center gap-3 bg-[#0f1a16] hover:bg-[#12201a] text-amber-400 px-6 py-3.5 rounded-2xl font-medium transition-all duration-300 border border-amber-600/30 hover:border-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(217,119,6,0.15)] overflow-hidden"
            >
              {/* Subtle shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
              {isAnalyzing ? <Loader2 size={20} className="animate-spin relative z-10" /> : <Sparkles size={20} className="group-hover:animate-pulse relative z-10" />}
              <span className="text-[15px] relative z-10">Analizar con IA</span>
            </button>
            
            <button className="group relative flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#0a1812] px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_32px_rgba(217,119,6,0.35)] hover:shadow-[0_12px_48px_rgba(217,119,6,0.5)] hover:-translate-y-0.5 active:scale-95 overflow-hidden border-2 border-amber-400/30">
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="text-[15px] relative z-10">Listo</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual suggestions
const SuggestionItem = ({ suggestion, onDismiss, index }: { suggestion: Suggestion, onDismiss: () => void, index: number }) => {
  const isError = suggestion.type === 'error';
  
  // Styling based on type - Enhanced luxury version
  const colors = isError 
    ? 'border-red-400/50 bg-gradient-to-br from-red-950/30 to-red-900/20 text-red-100' 
    : 'border-yellow-400/50 bg-gradient-to-br from-yellow-950/30 to-amber-900/20 text-yellow-100';
    
  const Icon = isError ? AlertCircle : AlertTriangle;
  const iconColor = isError ? 'text-red-400' : 'text-yellow-400';
  const glowColor = isError 
    ? 'shadow-[0_4px_20px_rgba(248,113,113,0.08)]' 
    : 'shadow-[0_4px_20px_rgba(250,204,21,0.08)]';

  return (
    <div 
      className={`group/suggestion relative flex items-start justify-between p-4 pr-3 rounded-2xl border-[1.5px] border-dashed ${colors} ${glowColor} animate-in slide-in-from-bottom-6 fade-in duration-500 fill-mode-both hover:border-solid transition-all backdrop-blur-sm overflow-hidden`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex gap-3.5 items-start pl-1 relative z-10">
        <div className="relative">
          <Icon size={19} className={`mt-0.5 shrink-0 ${iconColor} relative z-10`} />
          {/* Icon glow */}
          <div className={`absolute inset-0 ${iconColor.replace('text-', 'bg-')}/20 blur-md rounded-full`} />
        </div>
        <p className="text-[14px] leading-relaxed font-normal pt-0.5 tracking-wide">{suggestion.text}</p>
      </div>
      
      <button 
        onClick={onDismiss}
        className="relative z-10 flex flex-col items-center justify-center gap-1.5 px-3.5 py-2 ml-4 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 transition-all duration-300 shrink-0 group/btn h-full min-h-[48px] shadow-sm hover:shadow-[0_4px_16px_rgba(16,185,129,0.15)]"
        title="Marcar como resuelto"
      >
        <ThumbsUp size={17} className="text-gray-400 group-hover/btn:text-emerald-400 transition-colors group-active/btn:scale-90" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover/btn:text-emerald-400 transition-colors">
          Hecho
        </span>
      </button>
    </div>
  );
};