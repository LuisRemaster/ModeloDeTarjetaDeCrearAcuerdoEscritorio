// Motivo de marca Smagui: hoja de ficus geométrica con raíces.
// Facetado y minimalista, en línea con la identidad de AcuerdosApp.

type MarkProps = {
  className?: string;
  stroke?: string;
  leaf?: string;
  accent?: string;
  showRoots?: boolean;
};

export function SmaguiLeaf({
  className,
  stroke = "#2D6D58",
  leaf = "#2D6D58",
  accent = "#FF9B6F",
  showRoots = true,
}: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hoja facetada */}
      <path d="M60 8 C30 30 18 64 60 96 C102 64 90 30 60 8 Z" fill={leaf} fillOpacity="0.18" stroke={stroke} strokeWidth="1.5" />
      <path d="M60 8 L60 96" stroke={stroke} strokeWidth="1.5" />
      <path d="M60 30 L36 46 M60 30 L84 46 M60 50 L30 66 M60 50 L90 66 M60 70 L42 84 M60 70 L78 84" stroke={stroke} strokeWidth="1.1" strokeOpacity="0.7" />
      {/* Faceta de acento */}
      <path d="M60 8 C46 24 42 44 60 60 C60 44 60 24 60 8 Z" fill={accent} fillOpacity="0.28" />
      {/* Raíces / crecimiento */}
      {showRoots && (
        <path
          d="M60 96 L60 116 M60 116 C60 128 48 132 40 142 M60 116 C60 130 72 134 82 144 M60 120 C60 134 60 146 58 154"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      )}
    </svg>
  );
}

// Semilla geométrica para la variante Jardín.
export function SmaguiSeed({ className, accent = "#FF9B6F", stroke = "#D7C7A9" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="40" cy="40" rx="20" ry="26" fill={accent} fillOpacity="0.22" stroke={stroke} strokeWidth="1.3" />
      <path d="M40 18 C30 32 30 48 40 62 C50 48 50 32 40 18 Z" stroke={stroke} strokeWidth="1.1" strokeOpacity="0.7" />
      <path d="M40 62 L40 74" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
