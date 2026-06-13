import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   AcuerdosApp — Card Prototype v1
   Deep Dark Emerald aesthetic with 3D flip cards
   ═══════════════════════════════════════════════════════════ */

// Theme system: each agreement status maps to a visual theme
const THEMES = {
  active: {
    glow: "rgba(16,185,129,0.35)",
    glowIntense: "rgba(16,185,129,0.6)",
    border: "rgba(52,211,153,0.4)",
    text: "#6ee7b7",
    textDim: "#34d399",
    barBg: "#6ee7b7",
    barShadow: "rgba(16,185,129,0.8)",
    dot: "#10b981",
    aura: "rgba(16,185,129,0.25)",
    label: "ACTIVO",
    ringColor: "rgba(52,211,153,0.5)",
  },
  pending: {
    glow: "rgba(245,158,11,0.3)",
    glowIntense: "rgba(245,158,11,0.5)",
    border: "rgba(251,191,36,0.4)",
    text: "#fcd34d",
    textDim: "#f59e0b",
    barBg: "#fbbf24",
    barShadow: "rgba(245,158,11,0.8)",
    dot: "#f59e0b",
    aura: "rgba(245,158,11,0.2)",
    label: "PENDIENTE",
    ringColor: "rgba(251,191,36,0.5)",
  },
  completed: {
    glow: "rgba(34,197,94,0.35)",
    glowIntense: "rgba(34,197,94,0.6)",
    border: "rgba(74,222,128,0.5)",
    text: "#86efac",
    textDim: "#22c55e",
    barBg: "#86efac",
    barShadow: "rgba(34,197,94,0.8)",
    dot: "#22c55e",
    aura: "rgba(34,197,94,0.25)",
    label: "COMPLETADO",
    ringColor: "rgba(74,222,128,0.5)",
  },
  disputed: {
    glow: "rgba(249,115,22,0.3)",
    glowIntense: "rgba(249,115,22,0.5)",
    border: "rgba(251,146,60,0.4)",
    text: "#fdba74",
    textDim: "#f97316",
    barBg: "#fb923c",
    barShadow: "rgba(249,115,22,0.8)",
    dot: "#f97316",
    aura: "rgba(249,115,22,0.2)",
    label: "EN DISPUTA",
    ringColor: "rgba(251,146,60,0.5)",
  },
};

const TYPE_LABELS = {
  compromiso: { label: "COMPROMISO", icon: "shield" },
  acuerdo: { label: "ACUERDO", icon: "handshake" },
};

// SVG icons to avoid external deps
function ShieldIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function MessageIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  );
}

function ArrowLeftIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}

function SendIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  );
}

function HandshakeIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88"/><path d="m16 16 1.5 1.5a1 1 0 1 0 3-3L16.5 10.5"/><path d="m7 10 2 2"/><path d="M4.97 5.97A3 3 0 0 0 4 8c0 .78.3 1.53.84 2.1L9 14"/><path d="M12 6c-1.55 0-3.04.57-4.19 1.6L6 9.4"/><path d="M19.03 5.97A3 3 0 0 1 20 8c0 .78-.3 1.53-.84 2.1L15 14"/>
    </svg>
  );
}

// Avatar component with fallback initials
function Avatar({ src, name, size = 56, borderColor, shadowColor }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2.5px solid ${borderColor}`,
    boxShadow: `0 0 12px ${shadowColor}`,
    objectFit: "cover",
    flexShrink: 0,
  };

  if (src) {
    return <img src={src} alt={name} style={style} />;
  }
  return (
    <div style={{
      ...style,
      background: "rgba(100,116,139,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.32,
      fontWeight: 700,
      color: "#e2e8f0",
      letterSpacing: "0.5px",
    }}>
      {initials}
    </div>
  );
}

// Single Agreement Card with 3D flip
function AgreementCard({ agreement }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(agreement.messages);
  const messagesRef = useRef(null);
  const theme = THEMES[agreement.status] || THEMES.active;
  const typeInfo = TYPE_LABELS[agreement.type] || TYPE_LABELS.acuerdo;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isFlipped]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`,
      sender: "creator",
      text: newMessage.trim(),
      timestamp: "Ahora",
    }]);
    setNewMessage("");
  };

  // Animated glow keyframes injected once
  const glowAnimation = `
    @keyframes borderPulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
  `;

  return (
    <>
      <style>{glowAnimation}</style>
      <div style={{
        width: "100%",
        maxWidth: 580,
        perspective: "1200px",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}>
        <div style={{
          width: "100%",
          minHeight: isFlipped ? "max(420px, 55vh)" : 300,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1), min-height 0.5s ease",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "default",
        }}>

          {/* ══════════ FRONT FACE ══════════ */}
          <div style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(165deg, rgba(12,20,24,0.98) 0%, rgba(8,14,18,1) 100%)",
            border: `1.5px solid ${theme.border}`,
            boxShadow: `0 0 25px ${theme.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
            display: "flex",
            flexDirection: "column",
            animation: agreement.status === "active" ? "borderPulse 3s ease-in-out infinite" : "none",
          }}>
            {/* Ambient glow */}
            <div style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.aura} 0%, transparent 70%)`,
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />

            {/* Texture overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }} />

            {/* ── TOP BAR ── */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 20,
            }}>
              {/* Category tab */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderBottomRightRadius: 14,
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{
                  color: "#94a3b8",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>{agreement.category}</span>
              </div>

              {/* Badges + time */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px 0 0",
              }}>
                {/* Type badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  border: "1px solid rgba(16,185,129,0.3)",
                  background: "rgba(16,185,129,0.08)",
                  color: "#6ee7b7",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}>
                  {typeInfo.icon === "shield" ? <ShieldIcon size={12} /> : <HandshakeIcon size={12} />}
                  {typeInfo.label}
                </div>

                {/* Status badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  border: `1px solid ${theme.border}`,
                  background: `${theme.glow}`.replace("0.35", "0.08").replace("0.3", "0.08"),
                  color: theme.text,
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: theme.dot,
                    display: "inline-block",
                    animation: "borderPulse 2s ease-in-out infinite",
                  }} />
                  {theme.label}
                </div>

                <span style={{ color: "#64748b", fontSize: 12 }}>{agreement.timeAgo}</span>
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{
              flex: 1,
              display: "flex",
              padding: "8px 20px 16px",
              position: "relative",
              zIndex: 10,
              gap: 4,
            }}>
              {/* Left: Avatars with aura */}
              <div style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                {/* Aura rings */}
                <div style={{
                  position: "relative",
                  width: 140,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* Background glow */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${theme.aura} 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }} />
                  {/* Outer ring */}
                  <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `1.5px solid ${theme.ringColor}`,
                    animation: "spin-slow 18s linear infinite",
                    opacity: 0.6,
                  }} />
                  {/* Inner ring dashed */}
                  <div style={{
                    position: "absolute",
                    width: "82%",
                    height: "82%",
                    borderRadius: "50%",
                    border: `1px dashed ${theme.ringColor}`,
                    animation: "spin-reverse 25s linear infinite",
                    opacity: 0.35,
                  }} />

                  {/* Avatars */}
                  <div style={{
                    position: "relative",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: 0,
                    marginTop: 12,
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: -8 }}>
                      <Avatar
                        src={agreement.creator.avatar}
                        name={agreement.creator.name}
                        size={52}
                        borderColor={theme.text + "cc"}
                        shadowColor={theme.glow}
                      />
                      <span style={{
                        color: "#e2e8f0",
                        fontSize: 11,
                        marginTop: 4,
                        fontWeight: 500,
                        textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                      }}>{agreement.creator.name}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: -8 }}>
                      <Avatar
                        src={agreement.counterpart.avatar}
                        name={agreement.counterpart.name}
                        size={52}
                        borderColor={theme.text + "cc"}
                        shadowColor={theme.glow}
                      />
                      <span style={{
                        color: "#e2e8f0",
                        fontSize: 11,
                        marginTop: 4,
                        fontWeight: 500,
                        textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                      }}>{agreement.counterpart.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div style={{
                width: "70%",
                paddingLeft: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                {/* Title */}
                <h2 style={{
                  color: "#f1f5f9",
                  fontSize: 17,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: "0 0 6px 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>{agreement.title}</h2>

                {/* Giant percentage */}
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  margin: "0 0 4px 0",
                }}>
                  <span style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: theme.text,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 20px ${theme.glowIntense}`,
                  }}>{agreement.percentage}%</span>
                  <span style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.textDim,
                    opacity: 0.85,
                  }}>completado</span>
                </div>

                {/* Progress bar */}
                <div style={{
                  width: "100%",
                  height: 3,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  position: "relative",
                  margin: "2px 0 12px 0",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${agreement.percentage}%`,
                    background: theme.barBg,
                    borderRadius: 4,
                    boxShadow: `0 0 10px ${theme.barShadow}`,
                    transition: "width 1s ease",
                  }} />
                </div>

                {/* Narrative */}
                <div style={{ paddingRight: 40 }}>
                  <p style={{
                    color: "#94a3b8",
                    fontSize: 13,
                    lineHeight: 1.45,
                    margin: 0,
                  }}>
                    <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Tu turno: </span>
                    {agreement.turnText}
                  </p>
                  <p style={{
                    color: "#64748b",
                    fontSize: 12,
                    lineHeight: 1.4,
                    margin: "4px 0 0 0",
                  }}>{agreement.narrativeText}</p>
                </div>
              </div>
            </div>

            {/* Chat button */}
            <button
              onClick={() => setIsFlipped(true)}
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(30,41,59,0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#94a3b8",
                zIndex: 30,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#6ee7b7"; e.currentTarget.style.background = "rgba(16,185,129,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(30,41,59,0.5)"; }}
            >
              <MessageIcon size={20} />
              {messages.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  width: 12,
                  height: 12,
                  background: "#10b981",
                  borderRadius: "50%",
                  border: "2.5px solid #0c1418",
                }} />
              )}
            </button>
          </div>

          {/* ══════════ BACK FACE (CHAT) ══════════ */}
          <div style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(165deg, rgba(10,17,20,0.99) 0%, rgba(6,12,15,1) 100%)",
            border: `1.5px solid ${theme.border}`,
            boxShadow: `0 0 30px ${theme.glow}, 0 12px 40px rgba(0,0,0,0.5)`,
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Header */}
            <div style={{
              background: "rgba(18,27,33,0.85)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => setIsFlipped(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: 6,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = theme.text}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  <ArrowLeftIcon size={18} />
                </button>
                <h3 style={{
                  color: theme.text,
                  fontSize: 14,
                  fontWeight: 600,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textShadow: `0 0 12px ${theme.glowIntense}`,
                }}>
                  <MessageIcon size={16} />
                  {agreement.title}
                </h3>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 0,
              }}
            >
              {messages.map(msg => (
                <div key={msg.id} style={{
                  display: "flex",
                  justifyContent: msg.sender === "system" ? "center" : msg.sender === "creator" ? "flex-end" : "flex-start",
                  width: "100%",
                }}>
                  {msg.sender === "system" ? (
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 14px",
                      borderRadius: 20,
                      color: theme.textDim,
                      background: `${theme.glow}`.replace(/[\d.]+\)$/, "0.1)"),
                      border: `1px solid ${theme.border}`.replace(/[\d.]+\)$/, "0.2)"),
                    }}>{msg.text}</div>
                  ) : (
                    <div style={{
                      maxWidth: "78%",
                      padding: "10px 14px",
                      borderRadius: msg.sender === "creator" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "#e2e8f0",
                      background: msg.sender === "creator"
                        ? "rgba(30,41,59,0.85)"
                        : "rgba(15,23,42,0.85)",
                      border: `1px solid ${msg.sender === "creator" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}>
                      {msg.text}
                      <div style={{
                        fontSize: 10,
                        color: "#64748b",
                        marginTop: 4,
                        textAlign: "right",
                        fontWeight: 500,
                      }}>{msg.timestamp}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 16px",
              background: "rgba(18,27,33,0.9)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Escribe un mensaje..."
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 24,
                    padding: "10px 18px",
                    fontSize: 13,
                    color: "#e2e8f0",
                    outline: "none",
                    transition: "border-color 0.2s",
                    fontFamily: "inherit",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button
                  onClick={handleSend}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: theme.barBg,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0f172a",
                    flexShrink: 0,
                    boxShadow: `0 0 12px ${theme.barShadow}`,
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <SendIcon size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════
// DEMO DATA
// ═══════════════════════════════════════════════════════

const DEMO_AGREEMENTS = [
  {
    id: "1",
    category: "PERSONAL",
    type: "acuerdo",
    status: "active",
    title: "Turnos de limpieza semanal",
    creator: { name: "Luis", avatar: "" },
    counterpart: { name: "Maria", avatar: "" },
    percentage: 72,
    timeAgo: "Hace 3 dias",
    turnText: "Confirma el turno del miercoles antes de las 18:00.",
    narrativeText: "Maria completo su turno del lunes. Esperando tu confirmacion.",
    messages: [
      { id: "m1", sender: "system", text: "Acuerdo creado", timestamp: "Lun 09:00" },
      { id: "m2", sender: "counterpart", text: "Ya limpie la cocina y el bano.", timestamp: "Lun 18:30" },
      { id: "m3", sender: "creator", text: "Perfecto, manana me toca a mi.", timestamp: "Lun 19:00" },
      { id: "m4", sender: "system", text: "Clausula 1 completada por Maria", timestamp: "Mar 10:00" },
    ],
  },
  {
    id: "2",
    category: "PERSONAL",
    type: "compromiso",
    status: "pending",
    title: "Prestamo de capital y plan de pagos",
    creator: { name: "Luis", avatar: "" },
    counterpart: { name: "Carlos", avatar: "" },
    percentage: 0,
    timeAgo: "Hace 1 dia",
    turnText: "Carlos debe aceptar los terminos del prestamo.",
    narrativeText: "Enviado. Esperando firma de la contraparte.",
    messages: [
      { id: "m1", sender: "system", text: "Acuerdo enviado a Carlos", timestamp: "Ayer 14:00" },
      { id: "m2", sender: "creator", text: "Te envie el acuerdo, revisalo cuando puedas.", timestamp: "Ayer 14:05" },
    ],
  },
  {
    id: "3",
    category: "PERSONAL",
    type: "acuerdo",
    status: "completed",
    title: "Division de gastos vacaciones Vina",
    creator: { name: "Luis", avatar: "" },
    counterpart: { name: "Andrea", avatar: "" },
    percentage: 100,
    timeAgo: "Hace 5 dias",
    turnText: "Acuerdo completado exitosamente.",
    narrativeText: "Ambas partes cumplieron todas las clausulas. Cerrado.",
    messages: [
      { id: "m1", sender: "system", text: "Acuerdo completado", timestamp: "Vie 16:00" },
      { id: "m2", sender: "counterpart", text: "Transferencia recibida. Todo en orden.", timestamp: "Vie 16:30" },
      { id: "m3", sender: "system", text: "Ambas partes confirmaron cumplimiento", timestamp: "Vie 17:00" },
    ],
  },
  {
    id: "4",
    category: "PERSONAL",
    type: "acuerdo",
    status: "disputed",
    title: "Acuerdo de cuidado de mascota",
    creator: { name: "Luis", avatar: "" },
    counterpart: { name: "Sofia", avatar: "" },
    percentage: 45,
    timeAgo: "Hace 6 dias",
    turnText: "Disputa abierta: Sofia reporto incumplimiento.",
    narrativeText: "Se requiere mediacion. Escalado al sistema de juez.",
    messages: [
      { id: "m1", sender: "system", text: "Disputa iniciada por Sofia", timestamp: "Sab 11:00" },
      { id: "m2", sender: "counterpart", text: "No se cumplio el horario acordado.", timestamp: "Sab 11:05" },
      { id: "m3", sender: "creator", text: "Tuve una emergencia, puedo explicar.", timestamp: "Sab 12:00" },
      { id: "m4", sender: "system", text: "Escalado a mediacion", timestamp: "Dom 09:00" },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #060c0f 0%, #0a1114 40%, #050a0d 100%)",
      padding: "32px 16px",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid rgba(16,185,129,0.3)",
          background: "rgba(16,185,129,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(16,185,129,0.1)",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          </svg>
        </div>
        <div>
          <h1 style={{
            color: "#f1f5f9",
            fontSize: 24,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "0.02em",
          }}>MIS ACUERDOS</h1>
          <p style={{
            color: "#475569",
            fontSize: 12,
            margin: 0,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}>Historial completo</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 540px), 1fr))",
        gap: "28px",
        alignItems: "start",
      }}>
        {DEMO_AGREEMENTS.map(agreement => (
          <AgreementCard key={agreement.id} agreement={agreement} />
        ))}
      </div>
    </div>
  );
}