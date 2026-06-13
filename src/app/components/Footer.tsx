import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1F2F2D] border-t border-[#225C4B]/20 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="col-span-1 md:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="h-8 w-8 text-[#C86B52]" />
              <span className="font-['Inter'] font-bold text-2xl text-white">AcuerdosApp</span>
            </div>
            <p className="text-[#D7C7A9] font-['Poppins'] text-sm md:text-base max-w-sm leading-relaxed opacity-80">
              Plataforma inteligente para crear compromisos y acuerdos verificables entre personas de confianza.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-['Inter'] font-bold text-white mb-6 text-lg tracking-wide">Producto</h4>
            <ul className="space-y-4">
              <li><a href="#como-funciona" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Cómo Funciona</a></li>
              <li><a href="#tipos" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Tipos de Acuerdo</a></li>
              <li><a href="#caracteristicas" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Características</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4">
            <h4 className="font-['Inter'] font-bold text-white mb-6 text-lg tracking-wide">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-[#D7C7A9] hover:text-white text-sm font-['Poppins'] transition-colors">Contacto y Soporte</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#225C4B]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#D7C7A9] text-sm font-['Poppins'] opacity-70">
            AcuerdosApp © {new Date().getFullYear()}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm font-['Poppins'] text-[#D7C7A9] opacity-70 italic">
            <span>"Guardando Acuerdos de Confianza"</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
