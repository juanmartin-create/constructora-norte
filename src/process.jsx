// Process section is not separate — the Timeline is the "proceso constructivo".
// This file exposes an empty placeholder + a credentials strip used near the footer.

const CredentialsStrip = () => {
  const items = [
    "Cámara Argentina de la Construcción",
    "ISO 9001:2015",
    "Premio Vitruvio 2022",
    "Norma sismorresistente CIRSOC 103",
    "Garantía decenal — Sancor",
    "Premio Konex 2024",
  ];
  // Duplicate items for the marquee
  const loop = [...items, ...items];

  return (
    <div style={{
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
      padding: "22px 0",
      background: "var(--ink)",
    }}>
      <div style={{
        display: "flex",
        gap: 64,
        whiteSpace: "nowrap",
        animation: "marquee 36s linear infinite",
        width: "max-content",
      }}>
        {loop.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 64 }}>
            <span className="t-mono" style={{
              fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--paper-3)",
            }}>
              {t}
            </span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass)", flexShrink: 0 }}></span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

Object.assign(window, { CredentialsStrip });
