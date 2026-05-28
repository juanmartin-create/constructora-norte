// Comparador de materiales — cuatro materiales aplicados al mismo ambiente.
// El "ambiente" se renderiza con SVG + clipping del material por superficie.

const MATERIALS = [
  { id: "roble",       name: "Roble francés",     code: "R-04", img: IMG.matWood,       desc: "Listón ancho · acabado natural aceitado." },
  { id: "marmol",      name: "Mármol Calacatta",  code: "M-12", img: IMG.matMarble,     desc: "Italiano · veteado dorado · pulido brillante." },
  { id: "hormigon",    name: "Hormigón pulido",   code: "H-02", img: IMG.matConcrete,   desc: "Llaneado a máquina · sellador epoxi mate." },
  { id: "travertino",  name: "Travertino",        code: "T-08", img: IMG.matTravertine, desc: "Romano · veta cruzada · acabado rústico." },
];

const Materials = () => {
  const [mat, setMat] = React.useState(MATERIALS[0]);

  return (
    <section id="materiales" className="section">
      <SectionHead
        num={5}
        eyebrow="Comparador de materiales"
        title={<>Tocá los pisos<br/><em style={{ color: "var(--brass-bright)" }}>antes de elegir.</em></>}
        lede="Cuatro terminaciones disponibles. Cliqueá para previsualizar cada material aplicado a un ambiente tipo."
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: 4,
      }} className="mat-grid">

        {/* Stage: foto del ambiente con el piso aplicado */}
        <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--ink-2)" }}>
          <img
            key={mat.id}
            src={mat.img}
            alt={mat.name}
            loading="lazy"
            decoding="async"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              animation: "matSwap 0.5s ease",
            }}
          />
          {/* Vignette sutil para integrar con el resto del sitio */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(12,12,13,0.18) 0%, rgba(12,12,13,0) 30%, rgba(12,12,13,0.55) 100%)",
            pointerEvents: "none",
          }} />

          {/* Caption */}
          <div className="t-mono" style={{
            position: "absolute", top: 24, left: 24,
            color: "var(--paper)",
            fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7,
          }}>
            Ambiente tipo · 4.20 × 5.80 m
          </div>

          {/* Material badge */}
          <div style={{
            position: "absolute", bottom: 28, right: 28,
            background: "rgba(12,12,13,0.55)", backdropFilter: "blur(10px)",
            padding: "12px 18px",
            color: "var(--paper)",
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
          }}>
            <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7 }}>
              REF · {mat.code}
            </div>
            <div className="t-serif" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>
              {mat.name}
            </div>
          </div>
        </div>

        {/* Picker */}
        <div style={{ background: "var(--ink-2)", display: "flex", flexDirection: "column" }}>
          {MATERIALS.map((m) => {
            const active = mat.id === m.id;
            return (
              <button
                key={m.id}
                onMouseEnter={() => setMat(m)}
                onClick={() => setMat(m)}
                style={{
                  flex: 1,
                  display: "flex", alignItems: "center", gap: 18,
                  padding: 20,
                  background: active ? "var(--ink-3)" : "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--line)",
                  borderLeft: `3px solid ${active ? "var(--brass)" : "transparent"}`,
                  color: "var(--paper)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  backgroundImage: `url(${m.img})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  border: "1px solid var(--line-strong)",
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>
                    {m.code}
                  </div>
                  <div className="t-serif" style={{ fontSize: 20, lineHeight: 1.1, marginBottom: 4 }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--paper-3)", lineHeight: 1.4 }}>
                    {m.desc}
                  </div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `1px solid ${active ? "var(--brass)" : "var(--line-strong)"}`,
                  background: active ? "var(--brass)" : "transparent",
                  flexShrink: 0,
                }} />
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes matSwap { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 920px) { .mat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

Object.assign(window, { Materials });
