// Servicios — grilla minimal con hover reveal y números grandes.

const SERVICES = [
  {
    n: "01",
    title: "Diseño & arquitectura",
    desc: "Estudio interno. Anteproyecto, documentación ejecutiva y dirección de obra bajo una sola firma.",
    tags: ["Anteproyecto", "Plan municipal", "BIM", "Renders"],
  },
  {
    n: "02",
    title: "Construcción llave en mano",
    desc: "Del pozo al cierre. Gerenciamos subcontratos, cronograma, calidad y certificaciones.",
    tags: ["Movimiento de suelos", "Hormigón armado", "Albañilería", "Terminaciones"],
  },
  {
    n: "03",
    title: "Reformas integrales",
    desc: "Casas, oficinas y locales. Intervenciones de alto estándar con plazos garantizados por contrato.",
    tags: ["Demolición selectiva", "Refuerzos estructurales", "Reconfiguración", "Re-equipamiento"],
  },
  {
    n: "04",
    title: "Gerenciamiento de obra",
    desc: "Tu obra, nuestra metodología. Curva S, tablero ejecutivo, reportes semanales en PDF.",
    tags: ["Costing", "Cronograma", "QA/QC", "Cierre"],
  },
  {
    n: "05",
    title: "Desarrollo inmobiliario",
    desc: "Estructuramos fideicomisos al costo. Captación, escrituración y entrega bajo el mismo paraguas legal.",
    tags: ["Fideicomiso", "Permisos", "Escrituración", "Comercialización"],
  },
  {
    n: "06",
    title: "Post-venta · 5 años",
    desc: "Garantía estructural decenal y de instalaciones por 5 años. Un solo número de WhatsApp para resolver.",
    tags: ["Garantía decenal", "Service técnico", "Mantenimiento", "Soporte 24h"],
  },
];

const Services = () => {
  const [active, setActive] = React.useState(null);

  return (
    <section className="section">
      <SectionHead
        num={8}
        eyebrow="Servicios"
        title={<>Una sola firma,<br/><em style={{ color: "var(--brass-bright)" }}>seis especialidades.</em></>}
        lede="Diseño, ejecución, gerenciamiento y post-venta. Internalizamos lo crítico — y tercerizamos lo que sabemos elegir."
      />

      <div style={{ borderTop: "1px solid var(--line)" }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.n}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: "relative",
              borderBottom: "1px solid var(--line)",
              padding: "32px 0",
              cursor: "default",
              transition: "padding 0.4s",
            }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: "80px 1.4fr 1.4fr 80px",
              gap: 32,
              alignItems: "center",
            }} className="svc-row">
              <div className="t-mono" style={{ fontSize: 12, letterSpacing: "0.18em", color: active === i ? "var(--brass)" : "var(--paper-3)", transition: "color 0.3s" }}>
                {s.n}
              </div>
              <h3 className="t-serif" style={{
                fontSize: "clamp(28px, 3.6vw, 52px)",
                letterSpacing: "-0.015em",
                lineHeight: 1,
                fontStyle: active === i ? "italic" : "normal",
                color: active === i ? "var(--brass-bright)" : "var(--paper)",
                transition: "all 0.4s",
              }}>
                {s.title}
              </h3>
              <div style={{
                display: "flex", flexDirection: "column", gap: 12,
                opacity: active === i ? 1 : 0.55,
                transition: "opacity 0.4s",
              }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--paper-2)", lineHeight: 1.5, maxWidth: "44ch" }}>
                  {s.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((t) => (
                    <span key={t} className="t-mono" style={{
                      fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "4px 8px", border: "1px solid var(--line-strong)",
                      color: "var(--paper-3)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "1px solid var(--paper-3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: active === i ? "var(--ink)" : "var(--paper)",
                background: active === i ? "var(--brass)" : "transparent",
                borderColor: active === i ? "var(--brass)" : "var(--paper-3)",
                transition: "all 0.3s",
                justifySelf: "end",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17 L17 7 M9 7 L17 7 L17 15" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              </div>
            </div>

            <style>{`
              @media (max-width: 920px) {
                .svc-row { grid-template-columns: 60px 1fr !important; }
                .svc-row > div:nth-child(3) { grid-column: 2 / 3 !important; }
                .svc-row > div:nth-child(4) { display: none !important; }
              }
            `}</style>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { Services });
