import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { CreationCard } from './CreationCard';
import { AgreementCard } from './AgreementCard';
import { Plus, X, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../Button';

export function Dashboard() {
  const [hasAgreements, setHasAgreements] = useState(true);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  // Mocks de datos
  const pendingInvites = [
    { id: 1, title: 'Acuerdo de Confidencialidad NDA', from: 'Carlos M.', role: 'ACUERDO' }
  ];

  const agreements: React.ComponentProps<typeof AgreementCard>[] = [
    {
      title: 'División de Tareas del Hogar',
      type: 'ACUERDO',
      status: 'ACTIVO',
      progress: 45,
      timeAgo: '2 días',
      isMyTurn: true,
      participants: [
        { name: 'Tú', initial: 'Z', color: 'bg-[#C86B52]' },
        { name: 'Lucas', initial: 'L', color: 'bg-[#225C4B]' }
      ]
    },
    {
      title: 'Préstamo de $500',
      type: 'COMPROMISO',
      status: 'PENDIENTE',
      progress: 0,
      timeAgo: '5 horas',
      hasPendingInvite: true,
      participants: [
        { name: 'Tú', initial: 'Z', color: 'bg-[#C86B52]' },
        { name: 'Ana', initial: 'A', color: 'bg-[#FF9B6F]' }
      ]
    },
    {
      title: 'Entrega de Proyecto Web',
      type: 'ACUERDO',
      status: 'COMPLETADO',
      progress: 100,
      timeAgo: '1 mes',
      participants: [
        { name: 'Tú', initial: 'Z', color: 'bg-[#C86B52]' },
        { name: 'Cliente X', initial: 'C', color: 'bg-[#D7C7A9]' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#1F2F2D] flex flex-col font-['Poppins']">
      {!hasAgreements ? (
        // ESTADO 1: Sin acuerdos
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-[800px] h-[800px] bg-[#225C4B]/5 rounded-full blur-[100px]"></div>
            </div>
            
            <div className="w-full relative z-10 flex flex-col items-center">
              <h1 className="text-3xl font-['Inter'] font-bold text-white mb-8 text-center opacity-80">
                Tu primer acuerdo comienza aquí
              </h1>
              <CreationCard 
                onCreated={() => setHasAgreements(true)} 
              />
            </div>
          </main>
        </div>
      ) : (
        // ESTADO 2: Con acuerdos
        <div className="flex-1 flex flex-col relative pb-24">
          <TopBar />
          
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Banner Invitaciones Pendientes */}
            {pendingInvites.length > 0 && (
              <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-[#FF9B6F]" />
                  <h2 className="text-sm uppercase tracking-wider font-['Inter'] font-bold text-[#FF9B6F]">
                    Invitaciones Pendientes
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingInvites.map(invite => (
                    <div key={invite.id} className="bg-[#1F2F2D] border-l-4 border-l-[#FF9B6F] border border-[#225C4B]/20 rounded-xl p-4 shadow-lg flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-['Inter'] font-bold uppercase text-[#D7C7A9] tracking-wider mb-1 block">
                            {invite.role}
                          </span>
                          <h3 className="text-sm font-['Inter'] font-bold text-white truncate pr-2">
                            {invite.title}
                          </h3>
                          <p className="text-xs text-[#D7C7A9] font-['Poppins'] mt-1">
                            De: <span className="text-white font-medium">{invite.from}</span>
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#FF9B6F]/20 flex items-center justify-center text-[#FF9B6F] text-xs font-bold">
                          {invite.from.charAt(0)}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="primary" size="sm" className="flex-1 h-8 text-xs bg-[#225C4B] text-white hover:bg-[#1c4b3d] border-none flex items-center justify-center gap-1.5 px-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aceptar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-[#C86B52]/40 text-[#C86B52] hover:bg-[#C86B52]/10 hover:text-[#C86B52] flex items-center justify-center gap-1.5 px-0">
                          <XCircle className="w-3.5 h-3.5" /> Rechazar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Header del Grid de Acuerdos */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <h1 className="text-3xl font-['Inter'] font-bold text-white tracking-tight">Mis Acuerdos</h1>
                <span className="text-xs font-['Poppins'] text-[#D7C7A9] font-medium bg-[#225C4B]/20 px-2.5 py-1 rounded-full border border-[#225C4B]/30">2 activos · 1 pendiente</span>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-['Inter'] font-semibold bg-white text-[#1F2F2D] transition-colors cursor-pointer">
                  Todos
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-['Inter'] font-medium bg-[#1F2F2D] border border-[#225C4B]/40 text-[#D7C7A9] hover:bg-[#225C4B]/20 hover:text-white transition-colors cursor-pointer">
                  Activos
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-['Inter'] font-medium bg-[#1F2F2D] border border-[#225C4B]/40 text-[#D7C7A9] hover:bg-[#225C4B]/20 hover:text-white transition-colors cursor-pointer relative">
                  Pendientes
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF9B6F] rounded-full"></span>
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-['Inter'] font-medium bg-[#1F2F2D] border border-[#225C4B]/40 text-[#D7C7A9] hover:bg-[#225C4B]/20 hover:text-white transition-colors cursor-pointer">
                  Completados
                </button>
              </div>
            </div>

            {/* Grid de Tarjetas de Acuerdos */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {agreements.map((agreement, idx) => (
                <AgreementCard key={idx} {...agreement} />
              ))}
            </div>

          </main>

          {/* Botón Flotante + */}
          <button 
            onClick={() => setIsCreationModalOpen(true)}
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#FF9B6F] hover:bg-[#ff8552] text-[#1F2F2D] rounded-full shadow-[0_0_20px_rgba(255,155,111,0.4)] hover:shadow-[0_0_30px_rgba(255,155,111,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 cursor-pointer"
            aria-label="Nuevo Acuerdo"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Modal de Creación */}
      <AnimatePresence>
        {isCreationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A100E]/80 backdrop-blur-md overflow-y-auto"
          >
            <div className="w-full max-w-2xl relative my-auto">
              <button 
                onClick={() => setIsCreationModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-[#D7C7A9] hover:text-white hover:bg-[#225C4B]/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <CreationCard 
                onCreated={() => setIsCreationModalOpen(false)} 
                className="shadow-2xl shadow-[#225C4B]/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón temporal de depuración para cambiar estados en vista previa */}
      <button 
        onClick={() => setHasAgreements(!hasAgreements)}
        className="fixed bottom-8 left-8 px-4 py-2 bg-[#225C4B]/20 border border-[#225C4B]/40 text-[#D7C7A9] rounded-lg text-xs hover:bg-[#225C4B]/40 transition-colors z-50"
      >
        Cambiar a {hasAgreements ? 'Estado Vacío' : 'Estado Con Acuerdos'}
      </button>

    </div>
  );
}
