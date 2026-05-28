// Plano interactivo — SVG técnico estilo arquitectónico.
// Unidad tipo B · 3 ambientes · 92 m² cubiertos + 14 m² balcón.

const HOTSPOTS = [
  { id: "h1", x: 23, y: 30, label: "Living",          info: "32 m² · ventanal piso-techo orientación N · piso de roble francés · acceso directo al balcón." },
  { id: "h2", x: 50, y: 32, label: "Cocina",          info: "Isla central de mármol Calacatta · electrodomésticos Miele · alacena oculta · 12 m²." },
  { id: "h3", x: 77, y: 32, label: "Comedor",         info: "Mesa para 8 cubiertos · ventilación cruzada · acceso a balcón perimetral." },
  { id: "h4", x: 22, y: 70, label: "Suite principal", info: "Vestidor walk-in · baño en suite con bañera exenta · 18 m² más 6 m² de servicios." },
  { id: "h5", x: 55, y: 70, label: "Dormitorio 2",    info: "Placard piso a techo · vista al patio interno · 14 m²." },
  { id: "h6", x: 82, y: 70, label: "Baño & toilette", info: "Baño completo + toilette de cortesía · revestimiento travertino · grifería Hansgrohe." },
];

const Floorplan = () => {
  const [activeId, setActiveId] = React.useState("h2");
  const active = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  // Estilos comunes
  const wallStroke = "var(--paper-3)";
  const wallFill   = "rgba(241,236,226,0.10)";
  const lineFurn   = "var(--paper-3)";
  const tintFurn   = "rgba(196,162,106,0.45)";
  const dimColor   = "var(--paper-3)";

  return (
    <section id="plano" className="section">
      <SectionHead
        num={4}
        eyebrow="Plano interactivo"
        title={<>Cada metro,<br/><em style={{ color: "var(--brass-bright)" }}>pensado.</em></>}
        lede="Pasá el cursor por los puntos del plano para conocer cada ambiente. Unidad tipo 'B' — 3 ambientes, 92 m² cubiertos + 14 m² balcón."
      />

      <div className="plan-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: 32,
        alignItems: "stretch",
      }}>

        {/* ─── Plano técnico SVG ─── */}
        <div style={{
          position: "relative",
          aspectRatio: "16/10",
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          padding: 24,
        }}>
          <svg viewBox="0 0 200 130" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Hatching pattern para paredes */}
              <pattern id="wall-hatch" patternUnits="userSpaceOnUse" width="2" height="2" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="2" stroke="var(--paper-3)" strokeWidth="0.4" opacity="0.5" />
              </pattern>
              {/* Marker para flechas de cotas */}
              <marker id="dim-tick" viewBox="-3 -3 6 6" markerWidth="6" markerHeight="6" orient="auto">
                <line x1="-2" y1="-2" x2="2" y2="2" stroke={dimColor} strokeWidth="0.4" />
              </marker>
            </defs>

            {/* ── Cotas exteriores ── */}
            {/* Cota arriba (ancho total) */}
            <g stroke={dimColor} strokeWidth="0.3" fill="none">
              <line x1="14" y1="6" x2="186" y2="6" markerStart="url(#dim-tick)" markerEnd="url(#dim-tick)" opacity="0.7" />
              <line x1="14" y1="4" x2="14" y2="14" opacity="0.4" />
              <line x1="186" y1="4" x2="186" y2="14" opacity="0.4" />
            </g>
            <text x="100" y="4.5" fill={dimColor} fontSize="3" fontFamily="var(--mono)" textAnchor="middle" opacity="0.75">12.40 m</text>
            {/* Cota izquierda (alto total) */}
            <g stroke={dimColor} strokeWidth="0.3" fill="none">
              <line x1="6" y1="14" x2="6" y2="118" markerStart="url(#dim-tick)" markerEnd="url(#dim-tick)" opacity="0.7" />
              <line x1="4" y1="14" x2="14" y2="14" opacity="0.4" />
              <line x1="4" y1="118" x2="14" y2="118" opacity="0.4" />
            </g>
            <text x="3.5" y="66" fill={dimColor} fontSize="3" fontFamily="var(--mono)" textAnchor="middle" opacity="0.75" transform="rotate(-90 3.5 66)">7.60 m</text>

            {/* ── Balcón norte (perimetral N) ── */}
            <rect x="14" y="14" width="172" height="8" fill="none" stroke={wallStroke} strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.55" />
            <text x="100" y="19.5" fill={dimColor} fontSize="2.4" fontFamily="var(--mono)" textAnchor="middle" opacity="0.6" letterSpacing="0.3">B A L C Ó N   P E R I M E T R A L · 14 m²</text>

            {/* ── Paredes exteriores (gruesas) ── */}
            <g>
              {/* Norte (con aberturas para balcón) */}
              <rect x="14" y="22" width="44" height="1.6" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
              <rect x="64" y="22" width="60" height="1.6" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
              <rect x="130" y="22" width="56" height="1.6" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
              {/* Ventanales norte (símbolo de cristal) */}
              <line x1="58" y1="22" x2="58" y2="23.6" stroke={wallStroke} strokeWidth="0.4" />
              <line x1="64" y1="22" x2="64" y2="23.6" stroke={wallStroke} strokeWidth="0.4" />
              <line x1="58" y1="22.8" x2="64" y2="22.8" stroke={wallStroke} strokeWidth="0.25" opacity="0.7" />
              <line x1="124" y1="22" x2="124" y2="23.6" stroke={wallStroke} strokeWidth="0.4" />
              <line x1="130" y1="22" x2="130" y2="23.6" stroke={wallStroke} strokeWidth="0.4" />
              <line x1="124" y1="22.8" x2="130" y2="22.8" stroke={wallStroke} strokeWidth="0.25" opacity="0.7" />

              {/* Sur */}
              <rect x="14" y="116" width="172" height="1.6" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
              {/* Este */}
              <rect x="184" y="22" width="1.6" height="96" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
              {/* Oeste */}
              <rect x="14" y="22" width="1.6" height="96" fill="url(#wall-hatch)" stroke={wallStroke} strokeWidth="0.4" />
            </g>

            {/* ── Paredes interiores ── */}
            <g stroke={wallStroke} strokeWidth="0.5" fill="none">
              {/* Eje horizontal central (separa zona día de zona noche) */}
              <line x1="15.6" y1="74" x2="78" y2="74" />
              <line x1="92" y1="74" x2="184" y2="74" />
              {/* gap 78-92 = entrada al pasillo desde living-comedor */}

              {/* Verticales zona día (top) */}
              <line x1="64" y1="23.6" x2="64" y2="64" />          {/* living / cocina */}
              <line x1="64" y1="68" x2="64" y2="74" />            {/* puerta cocina */}
              <line x1="124" y1="23.6" x2="124" y2="62" />        {/* cocina / comedor */}
              <line x1="124" y1="68" x2="124" y2="74" />          {/* puerta comedor */}

              {/* Verticales zona noche (bottom) */}
              <line x1="74" y1="74" x2="74" y2="116" />           {/* suite / dorm2 (sep con baño suite) */}
              <line x1="132" y1="74" x2="132" y2="116" />         {/* dorm2 / baño */}
              {/* Sub-división suite: vestidor + baño */}
              <line x1="15.6" y1="92" x2="36" y2="92" />          {/* tabique suite-vestidor */}
              <line x1="40" y1="92" x2="60" y2="92" />            {/* sigue: gap = puerta */}
              <line x1="60" y1="74" x2="60" y2="116" />           {/* baño suite | dormitorio */}
              <line x1="60" y1="100" x2="74" y2="100" />          {/* WC suite tabique */}

              {/* Toilette divide */}
              <line x1="160" y1="74" x2="160" y2="116" />         {/* baño / toilette */}
            </g>

            {/* ── Puertas con arco de batido ── */}
            <g stroke={wallStroke} strokeWidth="0.35" fill="none" opacity="0.85">
              {/* Living → Cocina */}
              <path d="M 64 64 A 4 4 0 0 1 60 68" />
              <line x1="64" y1="64" x2="60" y2="68" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
              {/* Cocina → Comedor */}
              <path d="M 124 62 A 6 6 0 0 1 118 68" />
              {/* Living → Suite (pasillo abajo) */}
              <path d="M 78 74 A 7 7 0 0 1 85 81" />
              <line x1="78" y1="74" x2="85" y2="81" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
              {/* Pasillo → Dormitorio 2 */}
              <path d="M 95 74 A 5 5 0 0 1 100 79" />
              {/* Suite → Vestidor (gap en línea horizontal y=92) */}
              <path d="M 36 92 A 4 4 0 0 1 40 96" />
              {/* Suite → Baño suite */}
              <path d="M 60 100 A 3 3 0 0 1 63 103" />
            </g>

            {/* ── MUEBLES ── */}
            {/* LIVING: sofá en L + mesa ratona */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none" opacity="0.85">
              <rect x="22" y="34" width="26" height="6" fill={tintFurn} />
              <rect x="22" y="40" width="6" height="20" fill={tintFurn} />
              <rect x="32" y="46" width="14" height="8" rx="1" />
              {/* cojines */}
              <line x1="29" y1="34" x2="29" y2="40" />
              <line x1="36" y1="34" x2="36" y2="40" />
              <line x1="42" y1="34" x2="42" y2="40" />
              <line x1="22" y1="46" x2="28" y2="46" />
              <line x1="22" y1="52" x2="28" y2="52" />
              {/* TV mueble bajo */}
              <rect x="20" y="62" width="40" height="2" />
            </g>

            {/* COCINA: bajo-mesada en U + isla */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              {/* bajo-mesada perimetral */}
              <rect x="66" y="24" width="56" height="5" fill={tintFurn} opacity="0.55" />
              <rect x="66" y="24" width="5" height="22" fill={tintFurn} opacity="0.55" />
              <rect x="117" y="24" width="5" height="22" fill={tintFurn} opacity="0.55" />
              {/* anafe (círculos) */}
              <circle cx="78" cy="26.5" r="0.9" /><circle cx="82" cy="26.5" r="0.9" /><circle cx="78" cy="29" r="0.9" /><circle cx="82" cy="29" r="0.9" />
              {/* bacha */}
              <rect x="100" y="25" width="8" height="3.5" rx="0.5" />
              <line x1="104" y1="25" x2="104" y2="28.5" />
              {/* ISLA central con mármol */}
              <rect x="80" y="50" width="30" height="10" fill={tintFurn} stroke={wallStroke} strokeWidth="0.5" />
              <text x="95" y="56" fill={dimColor} fontSize="2.2" fontFamily="var(--mono)" textAnchor="middle" opacity="0.65" letterSpacing="0.15">ISLA</text>
              {/* banquetas */}
              <circle cx="84" cy="64" r="1.2" /><circle cx="89" cy="64" r="1.2" /><circle cx="101" cy="64" r="1.2" /><circle cx="106" cy="64" r="1.2" />
            </g>

            {/* COMEDOR: mesa rectangular + sillas */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              <rect x="142" y="38" width="22" height="32" rx="1" fill="none" stroke={lineFurn} strokeWidth="0.4" />
              {/* sillas */}
              {[42, 50, 58, 66].map(y => (
                <React.Fragment key={"l"+y}>
                  <rect x="138" y={y-1.5} width="3.5" height="3" rx="0.4" />
                  <rect x="164.5" y={y-1.5} width="3.5" height="3" rx="0.4" />
                </React.Fragment>
              ))}
              {/* aparador */}
              <rect x="170" y="38" width="12" height="3" fill={tintFurn} opacity="0.55" />
            </g>

            {/* SUITE PRINCIPAL: cama + mesas de luz + walk-in */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              <rect x="22" y="78" width="18" height="12" rx="0.8" fill={tintFurn} opacity="0.35" />
              {/* almohadas */}
              <rect x="23" y="78.6" width="7.5" height="2.4" rx="0.3" />
              <rect x="31.5" y="78.6" width="7.5" height="2.4" rx="0.3" />
              {/* mesas luz */}
              <rect x="18" y="78" width="3.5" height="4" />
              <rect x="40.5" y="78" width="3.5" height="4" />
              {/* Walk-in vestidor (subdivision dentro suite) */}
              <text x="48" y="84" fill={dimColor} fontSize="2.4" fontFamily="var(--mono)" textAnchor="middle" opacity="0.55" letterSpacing="0.2">VESTIDOR</text>
              <line x1="42" y1="86" x2="58" y2="86" strokeWidth="0.25" opacity="0.6" />
              {/* Baño suite — bañera + WC + bacha */}
              <rect x="62" y="78" width="10" height="5" rx="1" fill={tintFurn} opacity="0.4" />
              <text x="67" y="81.6" fill={dimColor} fontSize="1.8" fontFamily="var(--mono)" textAnchor="middle" opacity="0.55">BAÑERA</text>
              <rect x="62" y="85" width="5" height="4" rx="0.6" />
              <ellipse cx="64.5" cy="87" rx="1.6" ry="1.2" />
              <rect x="68" y="85" width="5" height="3.5" rx="0.3" />
              <circle cx="70.5" cy="86.6" r="1.1" />
              {/* WC suite */}
              <rect x="62" y="103" width="4" height="5" rx="0.5" />
              <ellipse cx="64" cy="105.5" rx="1.4" ry="1.6" />
            </g>

            {/* DORMITORIO 2 */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              <rect x="84" y="86" width="14" height="11" rx="0.8" fill={tintFurn} opacity="0.35" />
              <rect x="85" y="86.6" width="5.5" height="2.4" rx="0.3" />
              <rect x="91.5" y="86.6" width="5.5" height="2.4" rx="0.3" />
              <rect x="80" y="86" width="3" height="4" />
              <rect x="99" y="86" width="3" height="4" />
              {/* Placard */}
              <rect x="105" y="76" width="24" height="4" fill={tintFurn} opacity="0.4" />
              <line x1="113" y1="76" x2="113" y2="80" strokeWidth="0.25" />
              <line x1="121" y1="76" x2="121" y2="80" strokeWidth="0.25" />
              {/* escritorio */}
              <rect x="105" y="106" width="18" height="4" />
            </g>

            {/* BAÑO PRINCIPAL */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              {/* ducha */}
              <rect x="135" y="78" width="10" height="10" rx="0.4" fill={tintFurn} opacity="0.25" />
              <line x1="135" y1="78" x2="145" y2="88" strokeWidth="0.2" opacity="0.4" />
              <line x1="135" y1="88" x2="145" y2="78" strokeWidth="0.2" opacity="0.4" />
              <text x="140" y="84.5" fill={dimColor} fontSize="1.8" fontFamily="var(--mono)" textAnchor="middle" opacity="0.55">DUCHA</text>
              {/* WC */}
              <rect x="147" y="78" width="4" height="5" rx="0.5" />
              <ellipse cx="149" cy="80.5" rx="1.3" ry="1.5" />
              {/* bacha doble */}
              <rect x="135" y="100" width="22" height="5" fill={tintFurn} opacity="0.4" />
              <circle cx="141" cy="102.5" r="1.4" />
              <circle cx="151" cy="102.5" r="1.4" />
            </g>

            {/* TOILETTE */}
            <g stroke={lineFurn} strokeWidth="0.3" fill="none">
              <rect x="164" y="78" width="4" height="5" rx="0.5" />
              <ellipse cx="166" cy="80.5" rx="1.3" ry="1.5" />
              <rect x="170" y="78" width="12" height="3.5" fill={tintFurn} opacity="0.4" />
              <circle cx="176" cy="80" r="1.1" />
            </g>

            {/* ── Etiquetas de ambiente (sutiles) ── */}
            <g fill={dimColor} fontSize="3" fontFamily="var(--mono)" opacity="0.5" letterSpacing="0.25">
              <text x="38"  y="55"  textAnchor="middle">L I V I N G</text>
              <text x="95"  y="42"  textAnchor="middle">C O C I N A</text>
              <text x="153" y="32"  textAnchor="middle">C O M E D O R</text>
              <text x="32"  y="108" textAnchor="middle">S U I T E</text>
              <text x="93"  y="108" textAnchor="middle">D O R M.</text>
              <text x="173" y="108" textAnchor="middle">B A Ñ O   ·   T O I L E T T E</text>
            </g>

            {/* ── Indicador Norte ── */}
            <g transform="translate(178, 32)">
              <circle r="5.5" fill="none" stroke={dimColor} strokeWidth="0.35" opacity="0.7" />
              <path d="M 0 -5.5 L 1.6 0 L 0 -1.2 L -1.6 0 Z" fill="var(--brass)" />
              <text x="0" y="4" fill={dimColor} fontSize="3" fontFamily="var(--mono)" textAnchor="middle" opacity="0.8">N</text>
            </g>

            {/* ── Escala gráfica ── */}
            <g transform="translate(14, 124)">
              <line x1="0" y1="0" x2="20" y2="0" stroke={dimColor} strokeWidth="0.4" />
              <line x1="0" y1="-0.8" x2="0" y2="0.8" stroke={dimColor} strokeWidth="0.4" />
              <line x1="10" y1="-0.6" x2="10" y2="0.6" stroke={dimColor} strokeWidth="0.4" />
              <line x1="20" y1="-0.8" x2="20" y2="0.8" stroke={dimColor} strokeWidth="0.4" />
              <text x="22" y="1.5" fill={dimColor} fontSize="2.4" fontFamily="var(--mono)" opacity="0.7">0     1     2 m   ·   esc. 1:75</text>
            </g>
          </svg>

          {/* Hotspots interactivos */}
          {HOTSPOTS.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <button
                key={h.id}
                onMouseEnter={() => setActiveId(h.id)}
                onClick={() => setActiveId(h.id)}
                aria-label={h.label}
                style={{
                  position: "absolute",
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: 28, height: 28, borderRadius: "50%",
                  background: isActive ? "var(--brass)" : "rgba(196,162,106,0.22)",
                  border: "1px solid var(--brass)",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isActive ? "var(--ink)" : "var(--brass)",
                  transition: "all 0.25s",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  padding: 0,
                  boxShadow: isActive ? "0 6px 18px rgba(196,162,106,0.35)" : "none",
                }}
              >
                <span style={{
                  position: "absolute",
                  inset: -6, borderRadius: "50%",
                  border: "1px solid var(--brass)",
                  opacity: isActive ? 1 : 0,
                  animation: isActive ? "pulse 1.6s ease-out infinite" : "none",
                  pointerEvents: "none",
                }} />
                <span style={{ position: "relative", fontWeight: 600 }}>{i + 1}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Info side ─── */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 32,
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
        }}>
          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 16 }}>
              Punto {HOTSPOTS.indexOf(active) + 1} · {HOTSPOTS.length}
            </div>
            <h3 className="t-serif" style={{ fontSize: "clamp(40px,4vw,56px)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 16 }}>
              {active.label}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--paper-2)", margin: 0, maxWidth: 36 + "ch" }}>
              {active.info}
            </p>
          </div>

          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--paper-3)", marginBottom: 16 }}>
              Especificación general
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                ["Sup. cubierta", "92 m²"],
                ["Balcón", "14 m²"],
                ["Ambientes", "3"],
                ["Orientación", "NE"],
                ["Altura libre", "2.60 m"],
                ["Cochera", "Incluida"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>{k}</div>
                  <div className="t-serif" style={{ fontSize: 22 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 920px) { .plan-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

Object.assign(window, { Floorplan });
