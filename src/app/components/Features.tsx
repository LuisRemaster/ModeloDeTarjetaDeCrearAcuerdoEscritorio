import React from 'react';
import { Brain, Clock, Shield, MessageCircle } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-[#FF9B6F]" />,
      title: "IA que entiende tu lenguaje",
      description: "Escribe como hablas. La IA extrae las obligaciones y las estructura sin complicaciones legales."
    },
    {
      icon: <Clock className="h-6 w-6 text-[#C86B52]" />,
      title: "Sistema de turnos",
      description: "Siempre sabes quién debe actuar ahora. Sin confusiones ni esperas innecesarias."
    },
    {
      icon: <Shield className="h-6 w-6 text-[#225C4B]" />,
      title: "Perfil de confiabilidad",
      description: "Tu historial de cumplimiento visible. La confianza se gana con hechos, no se asume."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-[#D7C7A9]" />,
      title: "Chat por acuerdo",
      description: "Cada acuerdo tiene su espacio de conversación. Las modificaciones se hacen ahí mismo."
    }
  ];

  return (
    <section id="caracteristicas" className="py-24 bg-[#1F2F2D] border-t border-[#225C4B]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] font-bold text-white mb-6 leading-tight">
              Claridad total para <br />
              <span className="text-[#C86B52]">evitar malos entendidos</span>
            </h2>
            <p className="text-[#D7C7A9] font-['Poppins'] mb-12 text-lg leading-relaxed">
              Dejamos atrás las promesas en el aire. Con AcuerdosApp, cada compromiso tiene un seguimiento claro y justo.
            </p>
            
            <div className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-[#225C4B]/10 rounded-2xl flex items-center justify-center border border-[#225C4B]/20">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-['Inter'] font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#D7C7A9] font-['Poppins'] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[#225C4B]/20 blur-3xl rounded-full"></div>
            <div className="bg-[#1F2F2D] border border-[#225C4B]/30 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-3 border-b border-[#225C4B]/20 pb-4 mb-6">
                <MessageCircle className="text-[#225C4B]" />
                <span className="text-white font-['Inter'] font-bold">Chat del Acuerdo</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C86B52] flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-md">Tú</div>
                  <div className="bg-[#1F2F2D] border border-[#225C4B]/20 p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <p className="text-white text-sm font-['Poppins'] leading-relaxed">Oye, ¿podemos cambiar la fecha de pago al 15?</p>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-end">
                  <div className="bg-[#225C4B]/20 border border-[#225C4B]/30 p-4 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-white text-sm font-['Poppins'] leading-relaxed">Sí, claro. Déjame actualizarlo.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#225C4B] flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-md">A</div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <span className="bg-[#FF9B6F]/10 text-[#FF9B6F] text-xs font-['Poppins'] px-4 py-2 rounded-full border border-[#FF9B6F]/20 font-medium">
                    Acuerdo modificado por Ana
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
