import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1F2F2D]/95 backdrop-blur-sm border-b border-[#225C4B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <ShieldCheck className="h-8 w-8 text-[#C86B52]" />
            <span className="font-['Inter'] font-bold text-xl text-white">AcuerdosApp</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#como-funciona" className="text-[#D7C7A9] hover:text-white font-['Poppins'] text-sm transition-colors">Cómo funciona</a>
            <a href="#tipos" className="text-[#D7C7A9] hover:text-white font-['Poppins'] text-sm transition-colors">Tipos de acuerdo</a>
            <a href="#caracteristicas" className="text-[#D7C7A9] hover:text-white font-['Poppins'] text-sm transition-colors">Características</a>
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex">Iniciar sesión</Button>
            <Link to="/dashboard">
              <Button variant="primary" size="sm">Comenzar gratis</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
