import { useState } from "react";
import { Zap, Sprout, ArrowRight } from "lucide-react";
import { SmaguiLeaf } from "./SmaguiMark";

/* ── Paleta AcuerdosApp (sin cambios) ──────────── */
const C = {
  deep: "#1A2D2A",
  card: "#243330",
  ficus: "#2D6D58",
  sand: "#D7C7A9",
  sunset: "#FF9B6F",
  terra: "#C86B52",
};

const serif = { fontFamily: "'Playfair Display', serif" };
const body = { fontFamily: "'Poppins', sans-serif" };

/* ── Caminos Rush / Guiado (variante minimal) ──── */
function Paths({ subtle = false }: { subtle?: boolean }) {
  const [path, setPath] = useState<"rush" | "guiado">("guiado");
  const opts = [
    { id: "rush" as const, icon: Zap, label: "Rush", desc: "Captura rápida" },
    { id: "guiado" as const, icon: Sprout, label: "Guiado", desc: "Forja más profunda" },
  ];
  return (
    <div className="flex items-center gap-2">
      {opts.map((o) => {
        const active = path === o.id;
        const Icon = o.icon;
        return (
          <button
            key={o.id}
            onClick={() => setPath(o.id)}
            style={{
              ...body,
              borderColor: active ? "rgba(255,155,111,0.7)" : "rgba(215,199,169,0.16)",
              background: active ? "rgba(255,155,111,0.10)" : "transparent",
            }}
            className="group flex items-center gap-2.5 rounded-full border px-4 py-2.5 transition-colors"
          >
            <Icon size={15} color={active ? C.sunset : "rgba(215,199,169,0.6)"} strokeWidth={2} />
            <span className="text-left leading-tight">
              <span className="block" style={{ color: active ? C.sand : "rgba(215,199,169,0.7)", fontSize: 13, fontWeight: 500 }}>
                {o.label}
              </span>
              {!subtle && (
                <span className="block" style={{ color: "rgba(215,199,169,0.45)", fontSize: 11 }}>{o.desc}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CTA({ ghost = false }: { ghost?: boolean }) {
  return (
    <button
      style={{
        ...body,
        background: ghost ? "transparent" : C.terra,
        color: ghost ? C.sand : "#1A2D2A",
        border: ghost ? "1px solid rgba(200,107,82,0.6)" : "none",
        fontWeight: 500,
      }}
      className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 transition-transform hover:scale-[1.02]"
    >
      Dar forma a mi acuerdo
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

/* Bloque de "materia prima": superficie facetada, sutil, sin fuego ni metal literal */
function RawMatter({ height = 200, hint }: { height?: number; hint: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        height,
        background: "linear-gradient(155deg, rgba(45,109,88,0.14), rgba(36,51,48,0.65) 60%, rgba(26,45,42,0.9))",
        border: "1px solid rgba(215,199,169,0.12)",
      }}
    >
      {/* arista de luz, sugiere superficie sin pulir */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,155,111,0.06) 50%, transparent 60%)" }}
      />
      <div className="absolute left-7 top-6">
        <p style={{ ...serif, color: "rgba(215,199,169,0.32)", fontSize: 22, lineHeight: 1.5 }} className="italic">
          {hint}
        </p>
      </div>
      {/* cursor latente */}
      <span
        className="absolute left-7 bottom-6 inline-block h-5 w-px"
        style={{ background: C.sunset, opacity: 0.7 }}
      />
    </div>
  );
}

function Frame({ label, tag, children }: { label: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="shrink-0">
      <div className="mb-4 flex items-baseline gap-3 px-1">
        <span style={{ ...body, color: C.sand, fontWeight: 600, letterSpacing: "0.16em" }} className="text-xs uppercase">
          {label}
        </span>
        <span style={{ ...body, color: "rgba(215,199,169,0.45)" }} className="text-xs">{tag}</span>
      </div>
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{ width: 1500, height: 844, background: C.deep, border: "1px solid rgba(215,199,169,0.12)" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   FORJA A — La intención domina. 90% escritura.
   Transformación implícita. "todo empieza aquí".
═══════════════════════════════════════════════════ */
function ForgeA() {
  return (
    <div className="flex h-full w-full flex-col px-24 py-20">
      <div className="flex items-end justify-between">
        <div>
          <h1 style={{ ...serif, color: C.sand, fontSize: 40, lineHeight: 1.1, fontWeight: 500 }}>
            ¿Qué quieres lograr?
          </h1>
          <p style={{ ...body, color: "rgba(215,199,169,0.55)" }} className="mt-3">
            Descríbelo con tus propias palabras. Smaguer le dará forma.
          </p>
        </div>
        <Paths />
      </div>

      {/* El área de escritura ocupa el resto: foco absoluto */}
      <div className="relative mt-10 flex-1 overflow-hidden rounded-3xl"
        style={{ background: "rgba(36,51,48,0.4)", border: "1px solid rgba(215,199,169,0.10)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 12% 0%, rgba(45,109,88,0.10), transparent 45%)" }}
        />
        <div className="px-12 py-11">
          <p style={{ ...serif, color: "rgba(215,199,169,0.3)", fontSize: 30, lineHeight: 1.5 }} className="italic">
            Tu intención, todavía en bruto…
          </p>
          <span className="mt-3 inline-block h-7 w-px align-middle" style={{ background: C.sunset, opacity: 0.7 }} />
        </div>
        {/* transformación implícita: línea de horizonte tenue al fondo */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(180deg, transparent, rgba(45,109,88,0.10))" }} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span style={{ ...body, color: "rgba(215,199,169,0.4)", letterSpacing: "0.28em" }} className="text-xs uppercase">
          Todo empieza aquí
        </span>
        <CTA />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   FORJA B — Sensación de proceso.
   Intención ↓ Smaguer ↓ Acuerdo. Sugerencias visuales.
═══════════════════════════════════════════════════ */
function ForgeB() {
  return (
    <div className="grid h-full w-full grid-cols-[1.4fr_0.9fr]">
      <div className="flex flex-col justify-center px-20">
        <h1 style={{ ...serif, color: C.sand, fontSize: 42, lineHeight: 1.1, fontWeight: 500 }}>
          ¿Qué quieres lograr?
        </h1>
        <p style={{ ...body, color: "rgba(215,199,169,0.55)" }} className="mt-3 max-w-lg">
          Descríbelo con tus propias palabras. Smaguer le dará forma.
        </p>
        <div className="mt-9 max-w-2xl">
          <RawMatter height={210} hint="Yo lavo los platos todos los días después de cenar…" />
        </div>
        <div className="mt-8 flex items-center gap-6">
          <Paths />
          <div className="ml-auto"><CTA /></div>
        </div>
      </div>

      {/* Columna de proceso: tres estados, materia que se aclara */}
      <div className="relative flex flex-col items-center justify-center gap-0 px-12"
        style={{ background: "linear-gradient(180deg, rgba(26,45,42,1), rgba(36,51,48,0.7))" }}>
        {[
          { label: "Intención", note: "tu palabra en bruto", op: 0.35, ring: "rgba(215,199,169,0.25)" },
          { label: "Smaguer", note: "le da forma", op: 0.6, ring: "rgba(45,109,88,0.8)" },
          { label: "Acuerdo", note: "pieza terminada", op: 1, ring: "rgba(255,155,111,0.8)" },
        ].map((s, i) => (
          <div key={s.label} className="flex flex-col items-center">
            <div
              className="grid h-20 w-20 place-items-center rounded-2xl"
              style={{
                background: `rgba(45,109,88,${0.08 + i * 0.10})`,
                border: `1px solid ${s.ring}`,
                opacity: s.op,
                transform: i === 2 ? "rotate(0deg)" : `rotate(${i === 0 ? -6 : -3}deg)`,
              }}
            >
              {i === 2 ? <SmaguiLeaf className="h-9 w-7" /> : <div className="h-7 w-7 rounded-md" style={{ background: "rgba(215,199,169,0.18)" }} />}
            </div>
            <p style={{ ...body, color: C.sand, fontSize: 14, fontWeight: 500 }} className="mt-3">{s.label}</p>
            <p style={{ ...body, color: "rgba(215,199,169,0.45)", fontSize: 12 }}>{s.note}</p>
            {i < 2 && (
              <span className="my-3 block h-8 w-px" style={{ background: "linear-gradient(180deg, rgba(215,199,169,0.4), transparent)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   FORJA C — Lujo silencioso. Atelier privado.
   Espacio negativo extremo. Muy pocas palabras.
═══════════════════════════════════════════════════ */
function ForgeC() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-24 top-20">
        <SmaguiLeaf className="h-8 w-6 opacity-50" />
      </div>
      <div className="absolute right-24 top-20">
        <Paths subtle />
      </div>

      {/* Centro: pregunta como pieza editorial, mínimo soporte */}
      <div className="flex h-full w-full flex-col items-center justify-center px-32">
        <h1 style={{ ...serif, color: C.sand, fontSize: 60, lineHeight: 1.05, fontWeight: 400 }} className="text-center">
          ¿Qué quieres lograr?
        </h1>
        <p style={{ ...body, color: "rgba(215,199,169,0.5)" }} className="mt-6 text-center">
          Descríbelo con tus propias palabras. Smaguer le dará forma.
        </p>

        {/* línea de escritura: un solo trazo, no una caja */}
        <div className="mt-16 w-full max-w-[680px]">
          <p style={{ ...serif, color: "rgba(215,199,169,0.28)", fontSize: 22 }} className="text-center italic">
            Comienza a escribir…
          </p>
          <div className="mx-auto mt-6 h-px w-full" style={{ background: "rgba(215,199,169,0.2)" }} />
        </div>

        <div className="mt-16">
          <CTA ghost />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   FORJA D — Emocional. "Tu palabra tiene valor".
   Solo composición: la materia centrada, reverenciada.
═══════════════════════════════════════════════════ */
function ForgeD() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ background: `radial-gradient(circle at 50% 42%, rgba(45,109,88,0.20), transparent 55%), ${C.deep}` }}
    >
      {/* halo de valor alrededor de la materia */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-[460px] w-[460px] rounded-full"
          style={{ border: "1px solid rgba(255,155,111,0.12)" }} />
      </div>
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-[620px] w-[620px] rounded-full"
          style={{ border: "1px solid rgba(215,199,169,0.06)" }} />
      </div>

      <div className="relative flex flex-col items-center px-24">
        <h1 style={{ ...serif, color: C.sand, fontSize: 38, lineHeight: 1.1, fontWeight: 500 }} className="text-center">
          ¿Qué quieres lograr?
        </h1>
        <p style={{ ...body, color: "rgba(215,199,169,0.5)" }} className="mt-3 text-center">
          Descríbelo con tus propias palabras. Smaguer le dará forma.
        </p>

        {/* La materia prima, elevada y centrada como algo preciado */}
        <div className="relative mt-10 w-[620px]">
          <div
            className="rounded-2xl px-9 py-8"
            style={{
              background: "linear-gradient(160deg, rgba(45,109,88,0.18), rgba(36,51,48,0.7))",
              border: "1px solid rgba(255,155,111,0.22)",
              boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), 0 0 60px rgba(200,107,82,0.08) inset",
            }}
          >
            <p style={{ ...serif, color: "rgba(215,199,169,0.34)", fontSize: 24, lineHeight: 1.5 }} className="italic">
              Tu intención merece ser trabajada…
            </p>
            <span className="mt-4 inline-block h-6 w-px" style={{ background: C.sunset, opacity: 0.7 }} />
          </div>
          {/* base / pedestal sutil */}
          <div className="mx-auto mt-2 h-2 w-2/3 rounded-full"
            style={{ background: "rgba(0,0,0,0.4)", filter: "blur(8px)" }} />
        </div>

        <div className="mt-12 flex items-center gap-6">
          <Paths />
          <CTA />
        </div>
      </div>
    </div>
  );
}

/* ── Galería de evoluciones de LA FORJA ────────── */
export function ForgeVariants() {
  return (
    <div className="min-h-screen w-full" style={{ background: "#0F1A18" }}>
      <header className="px-12 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <SmaguiLeaf className="h-9 w-7" />
          <div>
            <p style={{ ...body, color: C.sand, fontWeight: 600, letterSpacing: "0.04em" }}>
              AcuerdosApp · TEN — La Forja
            </p>
            <p style={{ ...body, color: "rgba(215,199,169,0.5)", fontSize: 13 }}>
              Cuatro evoluciones de una misma idea. Tu intención es materia prima. Desplázate horizontalmente.
            </p>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto px-12 pb-16">
        <div className="flex items-start gap-12" style={{ width: "max-content" }}>
          <Frame label="Forja A" tag="La intención domina"><ForgeA /></Frame>
          <Frame label="Forja B" tag="Algo toma forma"><ForgeB /></Frame>
          <Frame label="Forja C" tag="Lujo silencioso"><ForgeC /></Frame>
          <Frame label="Forja D" tag="Tu palabra tiene valor"><ForgeD /></Frame>
        </div>
      </div>
    </div>
  );
}
