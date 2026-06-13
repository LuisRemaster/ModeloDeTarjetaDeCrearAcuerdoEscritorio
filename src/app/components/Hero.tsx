import React from 'react';
import { Button } from './Button';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-[#225C4B]/20 rounded-full mb-8 border border-[#225C4B]/30">
            <ShieldCheck className="h-8 w-8 text-[#C86B52]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] font-bold text-white mb-6 leading-tight">
            Guardando Acuerdos <br className="hidden md:block" /> de <span className="text-[#FF9B6F]">Confianza</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#D7C7A9] font-['Poppins'] mb-10 max-w-2xl mx-auto leading-relaxed">
            Crea acuerdos verificables con las personas que importan. 
            La IA organiza, tú cumples.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full shadow-lg shadow-[#FF9B6F]/20">
                Crear mi primer acuerdo
              </Button>
            </Link>
          </div>
        </div>

        {/* Mockup visual element (CSS Card) */}
        <div className="mt-20 relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2F2D] via-transparent to-transparent z-10 h-full w-full pointer-events-none" style={{ top: '50%' }}></div>
          <div className="bg-[#1F2F2D] border border-[#225C4B]/30 rounded-2xl shadow-2xl p-6 relative z-0 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
            <div className="flex items-center justify-between border-b border-[#225C4B]/20 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#C86B52] rounded-full flex items-center justify-center">
                  <span className="text-white font-['Inter'] font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-white font-['Inter'] font-bold text-sm sm:text-base">Acuerdo de Convivencia</h3>
                  <p className="text-[#D7C7A9] text-xs font-['Poppins']">Turno de: Ana</p>
                </div>
              </div>
              <div className="bg-[#225C4B]/20 text-[#225C4B] px-3 py-1 rounded-full text-xs font-['Poppins'] font-medium border border-[#225C4B]/30">
                Activo
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#1F2F2D] border border-[#225C4B]/10 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#FF9B6F] flex-shrink-0 mt-0.5" />
                <p className="text-[#D7C7A9] text-sm font-['Poppins']">
                  Limpiar áreas comunes cada domingo por la mañana.
                </p>
              </div>
              <div className="bg-[#1F2F2D] border border-[#225C4B]/10 p-4 rounded-xl flex items-start gap-3 opacity-80">
                <div className="h-5 w-5 rounded-full border-2 border-[#D7C7A9]/30 flex-shrink-0 mt-0.5" />
                <p className="text-[#D7C7A9] text-sm font-['Poppins']">
                  Pagar los servicios compartidos antes del día 5 de cada mes.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end pb-8">
              <Button variant="secondary" size="sm">Cumplir tarea</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
