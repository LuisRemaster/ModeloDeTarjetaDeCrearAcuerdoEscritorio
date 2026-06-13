import React from 'react';
import { Button } from './Button';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export function CTASection() {
  return (
    <section className="py-32 bg-[#1F2F2D] border-t border-[#225C4B]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#225C4B]/10 z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-[#1F2F2D] border border-[#225C4B]/30 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
            <ShieldCheck className="h-10 w-10 text-[#C86B52]" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-['Inter'] font-bold text-white mb-8 leading-tight">
          Comienza a formalizar <br className="hidden sm:block" /> tus compromisos
        </h2>
        <p className="text-xl md:text-2xl text-[#D7C7A9] font-['Poppins'] mb-12 italic opacity-80 max-w-2xl mx-auto leading-relaxed">
          "Tu palabra tiene valor. Deja que el Guardián la cuide."
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="px-12 py-5 text-lg shadow-xl shadow-[#FF9B6F]/20 hover:scale-105 transition-transform duration-300">
            Crear mi primer acuerdo
          </Button>
        </Link>
      </div>
    </section>
  );
}
