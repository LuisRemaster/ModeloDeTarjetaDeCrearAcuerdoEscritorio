import React from 'react';
import { MessageSquareText, Send, Award } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquareText className="h-8 w-8 text-[#FF9B6F]" />,
      title: "Escríbelo como quieras",
      description: "Describe tu acuerdo en tus palabras. La IA extrae las obligaciones y las organiza en cláusulas claras."
    },
    {
      icon: <Send className="h-8 w-8 text-[#225C4B]" />,
      title: "Envíalo y espera respuesta",
      description: "La otra persona revisa, acepta o propone cambios. Todo queda registrado y documentado."
    },
    {
      icon: <Award className="h-8 w-8 text-[#FF9B6F]" />,
      title: "Cumple y construye confianza",
      description: "Marca tareas completadas. Tu perfil de confiabilidad crece con cada acuerdo cumplido."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#1F2F2D] border-t border-[#225C4B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-['Inter'] font-bold text-white mb-6">
            Cómo Funciona
          </h2>
          <p className="text-[#D7C7A9] font-['Poppins'] max-w-2xl mx-auto text-lg">
            Tres pasos simples para formalizar lo que importa.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#225C4B]/10 via-[#225C4B]/40 to-[#225C4B]/10 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="bg-[#1F2F2D] border border-[#225C4B]/20 p-8 rounded-2xl relative z-10 hover:border-[#225C4B]/40 transition-colors">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#1F2F2D] border border-[#225C4B]/30 rounded-full flex items-center justify-center text-[#D7C7A9] font-['Inter'] font-bold">
                {index + 1}
              </div>
              <div className="mb-8 inline-flex p-4 bg-[#225C4B]/10 rounded-xl border border-[#225C4B]/20">
                {step.icon}
              </div>
              <h3 className="text-xl font-['Inter'] font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-[#D7C7A9] font-['Poppins'] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
