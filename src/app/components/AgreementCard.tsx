import { useState, useRef, useEffect } from "react";
import { MessageCircle, ArrowLeft, Send, ShieldCheck, Bug, Circle } from "lucide-react";

export type ThemeType = "purple" | "cyan" | "red";

export interface Message {
  id: string;
  sender: "creator" | "counterpart" | "system";
  text: string;
  timestamp: string;
}

export interface Agreement {
  id: string;
  category: string;
  title: string;
  theme: ThemeType;
  creator: { name: string; avatar: string };
  counterpart: { name: string; avatar: string; emptyInitials?: string };
  percentage: number;
  timeAgo: string;
  turnText: string;
  narrativeText: string;
  messages: Message[];
}

const THEMES = {
  purple: {
    glow: "rgba(168,85,247,0.3)",
    glowIntense: "rgba(168,85,247,0.6)",
    border: "rgba(168,85,247,0.4)",
    text: "#d8b4fe",
    textDim: "#a855f7",
    barBg: "#d8b4fe",
    barShadow: "rgba(168,85,247,0.8)",
    dot: "#a855f7",
    aura: "rgba(168,85,247,0.25)",
    ringColor: "rgba(168,85,247,0.5)",
    label: "EMITTER",
    emblemBg: "#1a0f2e",
    emblemBorder: "rgba(168,85,247,0.5)",
    emblemGlow: "rgba(168,85,247,0.4)",
    emblemIcon: "⚡",
  },
  red: {
    glow: "rgba(239,68,68,0.3)",
    glowIntense: "rgba(239,68,68,0.6)",
    border: "rgba(239,68,68,0.4)",
    text: "#fca5a5",
    textDim: "#ef4444",
    barBg: "#fca5a5",
    barShadow: "rgba(239,68,68,0.8)",
    dot: "#ef4444",
    aura: "rgba(239,68,68,0.25)",
    ringColor: "rgba(239,68,68,0.5)",
    label: "SPECIALIST",
    emblemBg: "#1a0f0f",
    emblemBorder: "rgba(239,68,68,0.5)",
    emblemGlow: "rgba(239,68,68,0.5)",
    emblemIcon: "🕷",
  },
  cyan: {
    glow: "rgba(6,182,212,0.3)",
    glowIntense: "rgba(6,182,212,0.6)",
    border: "rgba(6,182,212,0.4)",
    text: "#67e8f9",
    textDim: "#06b6d4",
    barBg: "#67e8f9",
    barShadow: "rgba(6,182,212,0.8)",
    dot: "#06b6d4",
    aura: "rgba(6,182,212,0.25)",
    ringColor: "rgba(6,182,212,0.5)",
    label: "TRANSMUTER",
    emblemBg: "#0a1a1f",
    emblemBorder: "rgba(6,182,212,0.5)",
    emblemGlow: "rgba(6,182,212,0.4)",
    emblemIcon: "◈",
  },
};

const GLOBAL_STYLES = `
  @keyframes borderPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
  @keyframes aura-breathe { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.8;transform:scale(1.08)} }
`;

function AvatarWithAura({
  src,
  name,
  initials,
  size = 58,
  borderColor,
  shadowColor,
}: {
  src: string;
  name: string;
  initials?: string;
  size?: number;
  borderColor: string;
  shadowColor: string;
}) {
  const fallback = initials || name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const base: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2.5px solid ${borderColor}`,
    boxShadow: `0 0 14px ${shadowColor}`,
    objectFit: "cover",
    flexShrink: 0,
  };

  if (src) return <img src={src} alt={name} style={base} />;
  return (
    <div
      style={{
        ...base,
        background: "rgba(100,116,139,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontWeight: 700,
        color: "#e2e8f0",
        letterSpacing: "0.5px",
      }}
    >
      {fallback}
    </div>
  );
}

export function AgreementCard({ agreement }: { agreement: Agreement }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(agreement.messages);
  const messagesRef = useRef<HTMLDivElement>(null);
  const theme = THEMES[agreement.theme];

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, isFlipped]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, sender: "creator", text: newMessage.trim(), timestamp: "Ahora" },
    ]);
    setNewMessage("");
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ width: "100%", perspective: "1200px" }}>
        <div
          style={{
            width: "100%",
            minHeight: isFlipped ? 440 : 310,
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1), min-height 0.5s ease",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ════════ FRONT ════════ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: 22,
              overflow: "hidden",
              background: "linear-gradient(165deg, rgba(12,20,24,0.98) 0%, rgba(8,14,18,1) 100%)",
              border: `1.5px solid ${theme.border}`,
              boxShadow: `0 0 28px ${theme.glow}, 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)`,
              display: "flex",
              flexDirection: "column",
              animation: "borderPulse 3s ease-in-out infinite",
            }}
          >
            {/* Ambient glow */}
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.aura} 0%, transparent 70%)`,
                filter: "blur(50px)",
                pointerEvents: "none",
                animation: "aura-breathe 5s ease-in-out infinite",
              }}
            />

            {/* Texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.03,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />

            {/* ── TOP BAR ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 20 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  padding: "8px 18px",
                  borderBottomRightRadius: 14,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: theme.text, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {agreement.category}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 0 0" }}>
                {/* Type badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    border: `1px solid rgba(59,130,246,0.3)`,
                    background: "rgba(59,130,246,0.08)",
                    color: "#60a5fa",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  <ShieldCheck size={12} />
                  COMPROMISO
                </div>

                {/* Status badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    border: `1px solid ${theme.border}`,
                    background: theme.glow.replace("0.3", "0.08"),
                    color: theme.text,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: theme.dot,
                      display: "inline-block",
                      animation: "borderPulse 2s ease-in-out infinite",
                    }}
                  />
                  ACTIVO
                </div>

                <span style={{ color: "#64748b", fontSize: 12 }}>{agreement.timeAgo}</span>
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, display: "flex", padding: "8px 20px 18px", position: "relative", zIndex: 10, gap: 4 }}>
              {/* Left: Avatars with aura rings */}
              <div style={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "relative", width: 150, height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Background glow */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${theme.aura} 0%, transparent 70%)`,
                      filter: "blur(22px)",
                    }}
                  />
                  {/* Outer ring */}
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: `1.5px solid ${theme.ringColor}`,
                      animation: "spin-slow 18s linear infinite",
                      opacity: 0.6,
                    }}
                  />
                  {/* Inner dashed ring */}
                  <div
                    style={{
                      position: "absolute",
                      width: "82%",
                      height: "82%",
                      borderRadius: "50%",
                      border: `1px dashed ${theme.ringColor}`,
                      animation: "spin-reverse 25s linear infinite",
                      opacity: 0.35,
                    }}
                  />

                  {/* Emblem */}
                  <div
                    style={{
                      position: "absolute",
                      top: -6,
                      zIndex: 30,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: theme.emblemBg,
                      border: `1.5px solid ${theme.emblemBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 14px ${theme.emblemGlow}`,
                      fontSize: 16,
                    }}
                  >
                    {agreement.theme === "red" ? (
                      <Bug size={18} style={{ color: theme.dot }} />
                    ) : (
                      <span style={{ color: theme.text, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                        {agreement.theme === "purple" ? "E" : "T"}
                      </span>
                    )}
                  </div>

                  {/* Avatars */}
                  <div style={{ position: "relative", zIndex: 20, display: "flex", alignItems: "flex-end", justifyContent: "center", marginTop: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: -8 }}>
                      <AvatarWithAura
                        src={agreement.creator.avatar}
                        name={agreement.creator.name}
                        size={58}
                        borderColor={theme.text + "cc"}
                        shadowColor={theme.glow}
                      />
                      <span style={{ color: "#e2e8f0", fontSize: 11, marginTop: 4, fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
                        {agreement.creator.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: -8 }}>
                      <AvatarWithAura
                        src={agreement.counterpart.avatar}
                        name={agreement.counterpart.name}
                        initials={agreement.counterpart.emptyInitials}
                        size={58}
                        borderColor={theme.text + "cc"}
                        shadowColor={theme.glow}
                      />
                      <span style={{ color: "#e2e8f0", fontSize: 11, marginTop: 4, fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
                        {agreement.counterpart.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div style={{ width: "70%", paddingLeft: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2
                  style={{
                    color: "#f1f5f9",
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.3,
                    margin: "0 0 6px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {agreement.title}
                </h2>

                {/* Giant percentage */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "0 0 4px 0" }}>
                  <span
                    style={{
                      fontSize: 52,
                      fontWeight: 800,
                      color: theme.text,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      textShadow: `0 0 22px ${theme.glowIntense}`,
                    }}
                  >
                    {agreement.percentage}%
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 600, color: theme.textDim, opacity: 0.85 }}>completado</span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    position: "relative",
                    margin: "2px 0 14px 0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: `${agreement.percentage}%`,
                      background: theme.barBg,
                      borderRadius: 4,
                      boxShadow: `0 0 10px ${theme.barShadow}`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>

                {/* Narrative */}
                <div style={{ paddingRight: 40 }}>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Tu turno: </span>
                    {agreement.turnText}
                  </p>
                  <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.4, margin: "4px 0 0 0" }}>{agreement.narrativeText}</p>
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
                width: 42,
                height: 42,
                borderRadius: 13,
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.text;
                e.currentTarget.style.background = theme.glow.replace("0.3", "0.12");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.background = "rgba(30,41,59,0.5)";
              }}
            >
              <MessageCircle size={20} />
              {messages.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 12,
                    height: 12,
                    background: theme.dot,
                    borderRadius: "50%",
                    border: "2.5px solid #0c1418",
                  }}
                />
              )}
            </button>
          </div>

          {/* ════════ BACK (CHAT) ════════ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 22,
              overflow: "hidden",
              background: "linear-gradient(165deg, rgba(10,17,20,0.99) 0%, rgba(6,12,15,1) 100%)",
              border: `1.5px solid ${theme.border}`,
              boxShadow: `0 0 30px ${theme.glow}, 0 12px 40px rgba(0,0,0,0.5)`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "rgba(18,27,33,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
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
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <ArrowLeft size={18} />
                </button>
                <h3
                  style={{
                    color: theme.text,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Playfair Display', serif",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    textShadow: `0 0 12px ${theme.glowIntense}`,
                  }}
                >
                  <MessageCircle size={16} />
                  {agreement.title}
                </h3>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: theme.textDim,
                  border: `1px solid ${theme.border}`,
                  background: theme.glow.replace("0.3", "0.08"),
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                {theme.label}
              </span>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "system" ? "center" : msg.sender === "creator" ? "flex-end" : "flex-start",
                    width: "100%",
                  }}
                >
                  {msg.sender === "system" ? (
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 14px",
                        borderRadius: 20,
                        color: theme.textDim,
                        background: theme.glow.replace("0.3", "0.1"),
                        border: `1px solid ${theme.border.replace("0.4", "0.2")}`,
                      }}
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      style={{
                        maxWidth: "78%",
                        padding: "10px 14px",
                        borderRadius: msg.sender === "creator" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: "#e2e8f0",
                        background: msg.sender === "creator" ? "rgba(30,41,59,0.85)" : "rgba(15,23,42,0.85)",
                        border: `1px solid ${msg.sender === "creator" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {msg.text}
                      <div style={{ fontSize: 10, color: "#64748b", marginTop: 4, textAlign: "right", fontWeight: 500 }}>{msg.timestamp}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(18,27,33,0.9)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
                  onFocus={(e) => (e.target.style.borderColor = theme.border)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
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
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
