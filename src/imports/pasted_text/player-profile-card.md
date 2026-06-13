BRIEF: PLAYER PROFILE CARD — AcuerdosApp v1
═══════════════════════════════════════════════════════════

CONCEPTO: "Carta del Jugador" — hub de estado personal.
Es informativa, NO navegacional. Los chips del anverso 
actúan como micro-filtros: al tocarlos, cierran el modal 
y filtran el dashboard.

TRIGGER: Avatar circular (48x48px) esquina superior 
izquierda. Borde dinámico según estado:
- Emerald pulsante: es tu turno en algún acuerdo
- Ámbar pulsante: invitaciones pendientes de aceptar  
- Slate estático: sin acciones pendientes

Al hacer click: modal centrado con backdrop bg-black/60 
backdrop-blur-md. Entrada: scale(0.95)→scale(1) + opacity.
Cierre: click fuera o X sutil.

ESTÉTICA: "Deep Dark Emerald" — bg-[#0c1418], glassmorphism,
acentos emerald/teal, bordes sutiles. Cero rojo. Cero emojis.
Mobile-first. Misma familia visual que las Agreement Cards.

MECÁNICA: Flip 3D idéntico a las tarjetas de acuerdo.
perspective-[1200px], rotateY(180deg), duration-700.

DIMENSIONES: max-width 360px, height auto, rounded-[24px].

═══════════════════════════════════════════════════════════
CARA FRONTAL — "Player Status"
Responde: "¿Qué está pasando conmigo AHORA?"
Lectura completa en menos de 3 segundos.
═══════════════════════════════════════════════════════════

HEADER (centrado):
├── Avatar grande (72x72px, circular)
│   Borde emerald con glow si confiabilidad >80%
│   Borde ámbar si <80%, naranja si <60%
├── Nickname: texto 18px, blanco, font-semibold
├── Badge inline: "Verificado" (check + texto verde pequeño)
│   o "Sin verificar" (texto gris, sin check)

MÉTRICA ESTRELLA — Confiabilidad:
├── Arco semicircular o barra circular (NO barra recta)
│   Grande, protagonista visual, centrado
├── Número en el centro: "87%" (texto 36px, bold)
├── Label debajo: "Confiabilidad" (texto 12px, slate-400)
├── Color dinámico del arco:
│   >80% = emerald con glow
│   60-80% = ámbar
│   <60% = naranja
├── Lógica: clausulas_completadas_a_tiempo / total * 100

GRID 2x2 — Chips de estado (micro-filtros):
├── Cada chip es un mini-botón táctil
├── Estructura: ícono (Lucide) + número + label
├── Fondo: bg-white/[0.04], border border-white/[0.06]
├── rounded-xl, padding 12px
├── 
│   ┌────────────────────┬────────────────────┐
│   │  PlayCircle         │  Mail              │
│   │  3                  │  1                 │
│   │  Tu Turno           │  Invitaciones      │
│   │  (emerald)          │  (ámbar)           │
│   ├────────────────────┼────────────────────┤
│   │  Zap                │  CheckCircle       │
│   │  5                  │  12                │
│   │  Activos            │  Completados       │
│   │  (cyan/teal)        │  (slate)           │
│   └────────────────────┴────────────────────┘
│
├── Chip con acciones pendientes: borde del color del tema,
│   número más grande y brillante
├── Chip con 0: opacity-40, desaturado
├── Al tocar un chip: cierra modal y filtra dashboard
│   (no navega a otra página)

TOKENS (línea sutil al fondo, casi invisible):
├── "142 tokens" con ícono Coins pequeño
├── text-slate-600 text-[11px]
├── Si no aplica: omitir

═══════════════════════════════════════════════════════════
CARA TRASERA — "Legal ID & Settings"
Responde: "¿Quién soy y cómo configuro mi cuenta?"
═══════════════════════════════════════════════════════════

HEADER:
├── Botón ← flip back (ArrowLeft, slate-400 hover:emerald)
├── Título: "Mi Cuenta" (text-sm, slate-200)

DATOS DEL USUARIO (solo lectura):
├── Cada campo: label gris 11px arriba + valor blanco 14px
├── Separados por líneas sutiles border-white/[0.04]
│
│   Nombre completo: "Luis Alejandro Pérez"
│   Correo: "luis@acuerdosapp.com"
│   Miembro desde: "Marzo 2026"
│   Verificación: Badge verde "Verificado" o ámbar "Pendiente"

CONFIGURACIÓN (switches):
├── Toggle: Notificaciones push
├── Toggle: Perfil público
├── Estilo: switch track emerald, compact

ACCIONES DE SISTEMA (zona inferior):
├── "Editar perfil" — ícono Pencil + texto
│   text-slate-400 hover:text-emerald-400, discreto
├── "Cerrar sesión" — ícono LogOut + texto  
│   text-slate-600 hover:text-slate-400
│   Posición: última cosa visible, no protagonista

═══════════════════════════════════════════════════════════
LO QUE NO INCLUIR
═══════════════════════════════════════════════════════════

- RUT, dirección, teléfono (v2)
- Nen Type / gamificación (v2+)
- Botones CTA grandes (Crear acuerdo, Ver turnos)
- Historial de actividad
- Foto de portada o banner
- Barra lateral ni menús adicionales

═══════════════════════════════════════════════════════════
DATOS MOCK
═══════════════════════════════════════════════════════════

nickname: "LuisHunter"
reliability: 87
tuTurno: 3
invitaciones: 1
activos: 5
completados: 12
tokens: 142
nombreCompleto: "Luis Alejandro Pérez"
correo: "luis@acuerdosapp.com"  
miembroDesde: "Marzo 2026"
verificado: true
notificaciones: true
perfilPublico: false

═══════════════════════════════════════════════════════════
CONTEXTO VISUAL
═══════════════════════════════════════════════════════════

Esta tarjeta aparece flotando sobre un dashboard oscuro 
(#060c0f) que ya tiene tarjetas de acuerdo con la misma 
estética emerald/glassmorphism. Debe sentirse parte de 
la misma familia visual. Usar los mismos border-radius, 
mismas sombras con glow, misma tipografía.