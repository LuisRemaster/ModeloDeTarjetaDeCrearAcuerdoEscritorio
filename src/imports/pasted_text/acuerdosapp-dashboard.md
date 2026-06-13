# PROMPT PARA FIGMA — Página Principal de AcuerdosApp (Dashboard)

## Referencia Visual Obligatoria
Usa la imagen adjunta (brand identity sheet) como fuente de verdad para logotipo, paleta, tipografía y tono visual.

---

## Qué estás diseñando

La **pantalla principal de la aplicación** — lo que el usuario ve al abrir AcuerdosApp después de iniciar sesión. NO es una landing page de marketing. Es la interfaz funcional donde el usuario gestiona sus acuerdos.

Esta pantalla tiene **DOS estados** que debes diseñar:

---

## ESTADO 1: Sin acuerdos (usuario nuevo o vacío)

Cuando el usuario no tiene ningún acuerdo, la pantalla muestra **automáticamente la tarjeta de creación desplegada**, como si hubiera presionado el botón "+". No hay un estado vacío con mensaje "no tienes acuerdos" — el formulario de creación ES el estado vacío.

### Tarjeta de Creación de Acuerdo
Es una tarjeta centrada en la pantalla con las siguientes fases:

**Fase 1 — Composición (lo que se ve primero):**
- Un campo de texto grande donde el usuario escribe su acuerdo en lenguaje natural
- Placeholder inspirador: algo como "Describe tu acuerdo como lo dirías en persona..."
- El usuario escribe de forma libre, por ejemplo: "Yo lavo los platos y Zandra tiende la ropa"
- Botón de acción: "Analizar con IA" o similar
- La IA procesa el texto y extrae automáticamente las cláusulas

**Fase 2 — Revisión (después del análisis de IA):**
- La IA devuelve las cláusulas estructuradas en una lista limpia
- Cada cláusula muestra: qué se hace, quién es responsable
- Badge automático: "COMPROMISO" (una persona con obligaciones) o "ACUERDO" (dos o más personas con obligaciones) — esto lo detecta la IA, el usuario nunca lo elige
- Campo para título del acuerdo
- Selector de fecha límite
- Campo para invitar a la contraparte (por nombre de usuario)
- Botones: "Crear" (primario) y "Volver" (secundario)

### Elementos visuales de la tarjeta:
- Fondo de tarjeta: oscuro pero ligeramente más claro que el fondo principal (crear profundidad)
- Bordes suaves redondeados (border-radius ~20px)
- Sin glow excesivo — sutil borde con opacidad baja
- El badge de tipo (Compromiso/Acuerdo) usa Sunset Orange para Compromiso y Ficus Green para Acuerdo

---

## ESTADO 2: Con acuerdos (usuario activo)

Cuando el usuario tiene acuerdos, la pantalla muestra:

### Barra superior
- Logo pequeño de AcuerdosApp (dragón + nombre) a la izquierda
- Avatar del usuario con su nombre a la derecha
- Icono de configuración/perfil

### Sección de Invitaciones Pendientes (si las hay)
- Banner o sección colapsable que muestra acuerdos donde el usuario fue invitado pero no ha respondido
- Cada invitación muestra: título, quién invitó, botones Aceptar/Rechazar
- Color de acento: Sunset Orange para llamar atención

### Grid de Tarjetas de Acuerdos (el corazón de la app)
Las tarjetas son **flip cards** — tienen un anverso y un reverso.

**ANVERSO (vista por defecto):**
- Encabezado: avatares de los participantes (dos círculos con iniciales, por ejemplo "L" y "Z")
- Título del acuerdo truncado (1 línea)
- Badges: tipo (COMPROMISO o ACUERDO) + estado (ACTIVO, PENDIENTE, etc.)
- Barra de progreso mostrando porcentaje de cumplimiento
- Indicador de "hace X días" (antigüedad)
- Icono de chat en esquina inferior derecha (para voltear la tarjeta)
- **Borde pulsante:** Si es el turno del usuario → borde emerald pulsante suave. Si hay invitación pendiente → borde amber pulsante.

**REVERSO (al tocar icono de chat):**
- Chat room del acuerdo
- Mensajes entre participantes
- Cada mensaje tiene un pequeño botón azul circular para "purificar" el texto conversacional en una modificación formal al acuerdo
- Campo de entrada de mensaje abajo
- Botón para volver al anverso

### Dimensiones de tarjeta:
- Mobile: ancho completo con margen lateral
- Desktop: grid de 1-2 columnas, tarjetas con ancho fijo (~520px aproximadamente)
- Altura de tarjeta: compacta (~160px en anverso), el reverso puede ser más alto por el chat

### Botón flotante "+"
- Botón circular flotante en la esquina inferior derecha
- Color: Sunset Orange o Ficus Green (debe destacar claramente)
- Al presionar, despliega la tarjeta de creación en el flujo (idéntica a la del Estado 1 pero dentro del contexto del dashboard)

---

## Sistema Visual

### Paleta de Colores
| Color | Hex | Uso |
|-------|-----|-----|
| Terracotta | #C86B52 | Calidez, elementos de conexión personal |
| Sunset Orange | #FF9B6F | CTAs, badges activos, barra de progreso, alertas cálidas |
| Ficus Green | #225C4B | Confianza, estados verificados, badges de acuerdo |
| Sandstone | #D7C7A9 | Texto secundario, timestamps, labels neutrales |
| Midnight Ficus | #1F2F2D | Fondo principal de toda la interfaz |

### Colores de estado para badges:
- ACTIVO → Ficus Green
- PENDIENTE → Sunset Orange
- COMPLETADO → un verde más claro o badge con check
- EN DISPUTA → Terracotta
- COMPROMISO (tipo) → Sunset Orange con fondo sutil
- ACUERDO (tipo) → Ficus Green con fondo sutil

### Tipografía
- **Headers:** Inter Bold
- **Body:** Poppins Regular
- **Badges/Labels:** Inter Medium, tamaño pequeño, uppercase, tracking ancho

### Fondo
- Base: Midnight Ficus (#1F2F2D) sólido o con gradiente muy sutil hacia un tono ligeramente más oscuro
- Se permiten orbes de luz ambiente muy sutiles (blur alto, opacidad muy baja) para dar profundidad — pero NO glow agresivo
- La sensación debe ser: cueva segura, cálida, no discoteca

---

## Reglas Estrictas

1. **Mobile-first.** Diseñar para 375px primero. El desktop es la expansión.
2. **Sin emojis** en ningún elemento de la interfaz.
3. **Sin landing page elements.** No hero sections, no "cómo funciona", no marketing. Esto es la app funcional.
4. **La tarjeta de creación ES el empty state.** No diseñar un estado vacío separado con ilustración y texto "crea tu primer acuerdo".
5. **Contraste alto.** El texto debe ser perfectamente legible sobre fondos oscuros. Texto principal en blanco o Sandstone claro.
6. **Máximo 2 acciones visibles por tarjeta** en el anverso. El resto vive en el reverso o en el modal de detalle.
7. **Sin sidebar.** La navegación es mínima — barra superior con logo, avatar, y acceso a perfil/configuración.
8. **Idioma: español.** Todos los textos, labels, placeholders en español.
9. **Sin stock photos ni ilustraciones decorativas.** Solo iconografía funcional (estilo Lucide icons: líneas finas, monocromáticas).
10. **El botón "+" flotante debe ser siempre visible** cuando hay acuerdos, posicionado en esquina inferior derecha sin tapar contenido crítico.

---

## Entregable Esperado
- Diseño de alta fidelidad de la página principal en sus dos estados (vacío y con acuerdos)
- Versión mobile (375px) prioritaria + versión desktop (1440px)
- Diseño del anverso y reverso de la tarjeta de acuerdo
- Diseño de la tarjeta de creación en sus dos fases (composición y revisión)
- Componentes reutilizables (botones, badges, tarjetas, campos de texto) como inicio de un sistema de diseño
