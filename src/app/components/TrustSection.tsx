import React from 'react';
import { Lock, UserCheck, ShieldCheck } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="py-24 bg-[#1F2F2D] border-t border-[#225C4B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F2F2D] border border-[#225C4B]/20 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C86B52]/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#225C4B]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center mb-12 relative">
              {/* Trust meter visual */}
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2F2D" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#225C4B" strokeWidth="10" strokeDasharray="283" strokeDashoffset="56" className="text-[#225C4B]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-['Inter'] font-bold text-white mb-1">85%</span>
                <span className="text-[10px] text-[#D7C7A9] font-['Poppins'] uppercase tracking-widest font-medium">Confianza</span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-['Inter'] font-bold text-white mb-6 leading-tight">
              Tu reputación es <br className="hidden sm:block" /> tu mejor garantía
            </h2>
            <p className="text-[#D7C7A9] font-['Poppins'] max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
              Validamos la identidad de cada usuario. Todos los acuerdos se almacenan de forma segura, privada e inmutable.
            </p>
            
            <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5">
                <div className="bg-[#225C4B]/10 p-4 rounded-2xl border border-[#225C4B]/20 flex-shrink-0">
                  <UserCheck className="h-6 w-6 text-[#FF9B6F]" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-white font-['Inter'] font-bold mb-2 text-lg">Identidad verificada</h4>
                  <p className="text-[#D7C7A9] text-sm font-['Poppins'] leading-relaxed">Sabes exactamente con quién estás acordando, sin cuentas falsas.</p>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5">
                <div className="bg-[#225C4B]/10 p-4 rounded-2xl border border-[#225C4B]/20 flex-shrink-0">
                  <Lock className="h-6 w-6 text-[#FF9B6F]" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-white font-['Inter'] font-bold mb-2 text-lg">Privacidad total</h4>
                  <p className="text-[#D7C7A9] text-sm font-['Poppins'] leading-relaxed">Tus acuerdos son encriptados y visibles solo para los involucrados.</p>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5">
                <div className="bg-[#225C4B]/10 p-4 rounded-2xl border border-[#225C4B]/20 flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-[#FF9B6F]" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-white font-['Inter'] font-bold mb-2 text-lg">Registro inmutable</h4>
                  <p className="text-[#D7C7A9] text-sm font-['Poppins'] leading-relaxed">Una vez aceptado, ninguna parte puede alterar el acuerdo unilateralmente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
