import React from 'react';
import { Users, Briefcase, Stethoscope, Handshake } from 'lucide-react';

export function AgreementTypes() {
  const types = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personal",
      description: "Parejas, familia, roommates y amigos.",
      available: true
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Comercial",
      description: "Compraventa, servicios, préstamos entre conocidos.",
      available: false
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Laboral",
      description: "Acuerdos freelancer y proyectos colaborativos.",
      available: false
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Resolución",
      description: "Mediación de conflictos existentes.",
      available: false
    }
  ];

  return (
    <section id="tipos" className="py-24 bg-[#1F2F2D] border-t border-[#225C4B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-['Inter'] font-bold text-white mb-6">
            Tipos de Acuerdo
          </h2>
          <p className="text-[#D7C7A9] font-['Poppins'] max-w-2xl mx-auto text-lg">
            Diseñados para adaptarse a cada relación en tu vida.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                type.available 
                  ? 'bg-[#225C4B]/10 border-[#225C4B]/30 hover:bg-[#225C4B]/20' 
                  : 'bg-[#1F2F2D] border-[#225C4B]/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${
                  type.available ? 'bg-[#FF9B6F] text-[#1F2F2D]' : 'bg-[#1F2F2D] text-[#D7C7A9] border border-[#225C4B]/20'
                }`}>
                  {type.icon}
                </div>
                {!type.available && (
                  <span className="text-xs font-['Poppins'] text-[#D7C7A9] bg-[#1F2F2D] border border-[#225C4B]/20 px-2 py-1 rounded-full">
                    Próximamente
                  </span>
                )}
              </div>
              <h3 className="text-lg font-['Inter'] font-bold text-white mb-2">
                {type.title}
              </h3>
              <p className="text-[#D7C7A9] font-['Poppins'] text-sm leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
