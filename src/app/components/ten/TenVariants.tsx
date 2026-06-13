import { useState } from "react";
import { Zap, Sprout, ArrowRight } from "lucide-react";
import { SmaguiLeaf, SmaguiSeed } from "./SmaguiMark";

/* ── Paleta AcuerdosApp ────────────────────────── */
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

/* ── Selector de camino Rush / Guiado ──────────── */
function PathToggle({ vertical = false }: { vertical?: boolean }) {
  const [path, setPath] = useState<"rush" | "guiado">("rush");
  const opts = [
    { id: "rush" as const, icon: Zap, label: "Rush", desc: "Captura rápida" },
    { id: "guiado" as const, icon: Sprout, label: "Guiado", desc: "Forja más profunda" },
  ];
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-3`}>
      {opts.map((o) => {
        const active = path === o.id;
        const Icon = o.icon;
        return (
          <button
            key={o.id}
            onClick={() => setPath(o.id)}
            style={{
              ...body,
              borderColor: active ? C.sunset : "rgba(215,199,169,0.18)",
              background: active ? "rgba(255,155,111,0.12)" : "transparent",
            }}
            className="flex flex-1 items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-colors"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
              style={{ background: active ? C.sunset : "rgba(215,199,169,0.10)" }}
            >
              <Icon size={17} color={active ? C.deep : C.sand} strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block" style={{ color: C.sand, fontWeight: 500 }}>{o.label}</span>
              <span className="block" style={{ color: "rgba(215,199,169,0.55)", fontSize: 12 }}>{o.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CTA({ block = false }: { block?: boolean }) {
  return (
    <button
      style={{ ...body, background: C.terra, color: "#1A2D2A", fontWeight: 500 }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 transition-transform hover:scale-[1.02] ${block ? "w-full" : ""}`}
    >
      Dar forma a mi acuerdo
      <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function VariantFrame({
  label,
  tag,
  children,
}: {
  label: string;
  tag: string;
  children: React.ReactNode;
}) {
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
   VARIANTE A — EL ESCRITORIO
   Centrado. Gran área de escritura. Todo desaparece.
═══════════════════════════════════════════════════ */
function VariantDesk() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-40">
      <SmaguiLeaf className="mb-10 h-12 w-9 opacity-60" />
      <h1 style={{ ...serif, color: C.sand, fontSize: 52, lineHeight: 1.1, fontWeight: 500 }} className="text-center">
        ¿Qué quieres lograr?
      </h1>
      <p style={{ ...body, color: "rgba(215,199,169,0.6)" }} className="mt-5 text-center">
        Descríbelo con tus propias palabras. Smaguer le dará forma.
      </p>

      <div className="mt-12 w-full max-w-[760px]">
        <div
          className="rounded-3xl px-9 py-8"
          style={{ background: "rgba(36,51,48,0.5)", border: "1px solid rgba(215,199,169,0.10)" }}
        >
          <p style={{ ...serif, color: "rgba(215,199,169,0.35)", fontSize: 26, lineHeight: 1.5 }} className="italic">
            Yo lavo los platos todos los días después de cenar…
          </p>
          <div className="mt-6 h-px w-full" style={{ background: "rgba(215,199,169,0.10)" }} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <PathToggle />
          <div className="ml-8 shrink-0">
            <CTA />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANTE B — EL GUÍA
   Pantalla dividida. Izquierda pregunta, derecha Smaguer.
═══════════════════════════════════════════════════ */
function VariantGuide() {
  const steps = [
    "Escribes tu intención",
    "Smaguer la ordena",
    "La fortalecemos juntos",
    "Nace un acuerdo",
  ];
  return (
    <div className="grid h-full w-full grid-cols-[1.15fr_1fr]">
      {/* Izquierda */}
      <div className="flex flex-col justify-center px-20">
        <h1 style={{ ...serif, color: C.sand, fontSize: 46, lineHeight: 1.12, fontWeight: 500 }}>
          ¿Qué quieres<br />lograr?
        </h1>
        <p style={{ ...body, color: "rgba(215,199,169,0.6)" }} className="mt-4 max-w-md">
          Descríbelo con tus propias palabras. Smaguer le dará forma.
        </p>
        <div
          className="mt-9 rounded-3xl px-7 py-6"
          style={{ background: C.card, border: "1px solid rgba(215,199,169,0.12)" }}
        >
          <p style={{ ...body, color: "rgba(215,199,169,0.35)", lineHeight: 1.6 }}>
            Ej: Yo lavo los platos todos los días después de cenar…
          </p>
          <div className="mt-16" />
        </div>
        <div className="mt-7"><PathToggle /></div>
        <div className="mt-7"><CTA /></div>
      </div>

      {/* Derecha — Smaguer mentor */}
      <div className="relative flex flex-col justify-center px-16" style={{ background: C.card }}>
        <SmaguiLeaf className="absolute right-10 top-10 h-28 w-20 opacity-25" />
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: "rgba(255,155,111,0.14)" }}>
            <SmaguiLeaf className="h-6 w-5" />
          </span>
          <div>
            <p style={{ ...body, color: C.sand, fontWeight: 500 }}>Smaguer</p>
            <p style={{ ...body, color: "rgba(215,199,169,0.5)", fontSize: 12 }}>Tu guía silencioso</p>
          </div>
        </div>
        <p style={{ ...serif, color: C.sand, fontSize: 24, lineHeight: 1.45 }} className="mt-8 max-w-sm italic">
          Esto es lo que ocurrirá con tus palabras.
        </p>
        <ol className="mt-9 space-y-5">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
                style={{ ...body, color: C.deep, background: C.ficus, fontWeight: 600, fontSize: 13 }}
              >
                {i + 1}
              </span>
              <span style={{ ...body, color: C.sand }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANTE C — LA FORJA
   La intención como materia prima. Transformación sutil.
═══════════════════════════════════════════════════ */
function VariantForge() {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center px-32"
      style={{
        background: `radial-gradient(circle at 50% 120%, rgba(200,107,82,0.18), transparent 55%), ${C.deep}`,
      }}
    >
      <span style={{ ...body, color: "rgba(215,199,169,0.5)", letterSpacing: "0.34em" }} className="text-xs uppercase">
        Materia prima
      </span>
      <h1 style={{ ...serif, color: C.sand, fontSize: 48, lineHeight: 1.1, fontWeight: 500 }} className="mt-5 text-center">
        ¿Qué quieres lograr?
      </h1>
      <p style={{ ...body, color: "rgba(215,199,169,0.6)" }} className="mt-4 text-center">
        Descríbelo con tus propias palabras. Smaguer le dará forma.
      </p>

      {/* Lingote / bloque de intención sin pulir */}
      <div className="mt-12 w-full max-w-[820px]">
        <div
          className="relative rounded-2xl px-10 py-9"
          style={{
            background: "linear-gradient(160deg, rgba(45,109,88,0.16), rgba(36,51,48,0.7))",
            border: "1px solid rgba(255,155,111,0.25)",
            boxShadow: "0 0 80px rgba(200,107,82,0.10) inset",
          }}
        >
          {/* aristas facetadas */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ border: "1px solid rgba(215,199,169,0.06)", margin: 6 }} />
          <p style={{ ...serif, color: "rgba(215,199,169,0.38)", fontSize: 24, lineHeight: 1.5 }} className="italic">
            Tu intención en bruto… aún sin pulir.
          </p>
          <div className="mt-20" />
        </div>

        <div className="mt-10 flex items-end justify-between">
          <div className="w-[360px]"><PathToggle /></div>
          <div className="text-right">
            <p style={{ ...body, color: "rgba(215,199,169,0.55)", fontSize: 13 }} className="mb-3">
              Comienza la transformación
            </p>
            <CTA />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANTE D — EL JARDÍN
   La intención es una semilla; el acuerdo, una planta.
═══════════════════════════════════════════════════ */
function VariantGarden() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_0.8fr]">
      <div className="flex flex-col justify-center px-20">
        <div className="flex items-center gap-3">
          <SmaguiSeed className="h-8 w-8" />
          <span style={{ ...body, color: "rgba(215,199,169,0.55)", letterSpacing: "0.2em" }} className="text-xs uppercase">
            Planta una intención
          </span>
        </div>
        <h1 style={{ ...serif, color: C.sand, fontSize: 46, lineHeight: 1.12, fontWeight: 500 }} className="mt-6">
          ¿Qué quieres lograr?
        </h1>
        <p style={{ ...body, color: "rgba(215,199,169,0.6)" }} className="mt-4 max-w-md">
          Descríbelo con tus propias palabras. Smaguer le dará forma.
        </p>
        <div
          className="mt-9 max-w-xl rounded-3xl px-7 py-6"
          style={{ background: "rgba(36,51,48,0.6)", border: "1px solid rgba(45,109,88,0.4)" }}
        >
          <p style={{ ...body, color: "rgba(215,199,169,0.35)", lineHeight: 1.6 }}>
            Ej: Yo lavo los platos todos los días después de cenar…
          </p>
          <div className="mt-16" />
        </div>
        <div className="mt-7 max-w-xl"><PathToggle /></div>
        <div className="mt-7"><CTA /></div>
      </div>

      {/* Crecimiento visual */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${C.card}, ${C.deep})` }}
      >
        {/* raíces tenues */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{ background: "radial-gradient(circle at 50% 100%, rgba(45,109,88,0.22), transparent 60%)" }} />
        <div className="relative flex flex-col items-center">
          <SmaguiLeaf className="h-56 w-40" />
          <p style={{ ...serif, color: "rgba(215,199,169,0.6)", fontSize: 18 }} className="mt-8 text-center italic">
            De semilla a acuerdo.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {["Semilla", "Raíz", "Hoja"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span style={{ ...body, color: i === 0 ? C.sunset : "rgba(215,199,169,0.45)", fontSize: 12 }}>{s}</span>
                {i < 2 && <span style={{ color: "rgba(215,199,169,0.25)" }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Galería ───────────────────────────────────── */
export function TenVariants() {
  return (
    <div className="min-h-screen w-full" style={{ background: "#0F1A18" }}>
      <header className="px-12 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <SmaguiLeaf className="h-9 w-7" />
          <div>
            <p style={{ ...body, color: C.sand, fontWeight: 600, letterSpacing: "0.04em" }}>AcuerdosApp · Pantalla TEN</p>
            <p style={{ ...body, color: "rgba(215,199,169,0.5)", fontSize: 13 }}>
              Cuatro interpretaciones de descubrir la intención. Desplázate horizontalmente.
            </p>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto px-12 pb-16">
        <div className="flex items-start gap-12" style={{ width: "max-content" }}>
          <VariantFrame label="Variante A" tag="El Escritorio">
            <VariantDesk />
          </VariantFrame>
          <VariantFrame label="Variante B" tag="El Guía">
            <VariantGuide />
          </VariantFrame>
          <VariantFrame label="Variante C" tag="La Forja">
            <VariantForge />
          </VariantFrame>
          <VariantFrame label="Variante D" tag="El Jardín">
            <VariantGarden />
          </VariantFrame>
        </div>
      </div>
    </div>
  );
}
