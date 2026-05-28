// Calculadora de cuotas / financiación.

const fmtUSD = (n) => "USD " + Math.round(n).toLocaleString("es-AR");

const Calculator = () => {
  const [valor, setValor] = React.useState(285000);
  const [anticipoPct, setAnticipoPct] = React.useState(35);
  const [cuotas, setCuotas] = React.useState(60);
  const [tasa, setTasa] = React.useState(0.6); // % mensual

  const anticipo = valor * (anticipoPct / 100);
  const financiar = valor - anticipo;
  const r = tasa / 100;
  // sistema francés
  const cuotaMensual = r === 0 ? financiar / cuotas : (financiar * r * Math.pow(1 + r, cuotas)) / (Math.pow(1 + r, cuotas) - 1);
  const totalPagado = anticipo + cuotaMensual * cuotas;
  const interesTotal = totalPagado - valor;

  return (
    <section id="financiacion" className="section section--light" style={{ background: "var(--paper)" }}>
      <SectionHead
        num={7}
        eyebrow="Financiación"
        title={<>Cuotas pensadas<br/><em style={{ color: "#9a7438" }}>para cómo cobrás.</em></>}
        lede="Hasta 120 cuotas en pesos ajustadas por CAC o dólar billete. Movés las perillas y la cuota se actualiza."
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 4,
        background: "var(--ink)",
        color: "var(--paper)",
      }} className="calc-grid">

        {/* Controles */}
        <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            { label: "Valor de la unidad", min: 80000, max: 1200000, step: 5000, val: valor, setter: setValor, fmt: fmtUSD, hint: "USD" },
            { label: "Anticipo", min: 10, max: 70, step: 1, val: anticipoPct, setter: setAnticipoPct, fmt: (v) => v + "%", hint: fmtUSD(anticipo) },
            { label: "Cuotas", min: 12, max: 120, step: 6, val: cuotas, setter: setCuotas, fmt: (v) => v + " meses", hint: Math.round(cuotas / 12) + " años" },
            { label: "Tasa mensual estimada", min: 0, max: 1.5, step: 0.05, val: tasa, setter: setTasa, fmt: (v) => v.toFixed(2) + "%", hint: "ajustable" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65 }}>
                  {s.label}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="t-serif" style={{ fontSize: 22 }}>{s.fmt(s.val)}</div>
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.15em", opacity: 0.55, textTransform: "uppercase" }}>{s.hint}</div>
                </div>
              </div>
              <input
                type="range" min={s.min} max={s.max} step={s.step}
                value={s.val}
                onChange={(e) => s.setter(+e.target.value)}
                className="calc-range"
              />
            </div>
          ))}
        </div>

        {/* Resultados */}
        <div style={{
          padding: 36,
          background: "var(--paper)",
          color: "var(--ink)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          gap: 24,
        }}>
          {/* Cuota grande */}
          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(12,12,13,0.55)", marginBottom: 12 }}>
              Cuota mensual estimada
            </div>
            <div className="t-serif" style={{ fontSize: "clamp(72px, 9vw, 128px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
              {fmtUSD(cuotaMensual)}
            </div>
            <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(12,12,13,0.65)", textTransform: "uppercase", marginTop: 8 }}>
              durante {cuotas} meses
            </div>
          </div>

          {/* Desglose */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, paddingTop: 24, borderTop: "1px solid var(--line-ink)" }}>
            {[
              ["Anticipo", fmtUSD(anticipo)],
              ["A financiar", fmtUSD(financiar)],
              ["Total pagado", fmtUSD(totalPagado)],
              ["Costo financiero", fmtUSD(interesTotal)],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55, marginBottom: 4 }}>{k}</div>
                <div className="t-serif" style={{ fontSize: 22 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Visual barra */}
          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55, marginBottom: 8 }}>
              Composición
            </div>
            <div style={{ display: "flex", height: 12, overflow: "hidden", border: "1px solid var(--ink)" }}>
              <div style={{ flex: anticipo, background: "var(--ink)" }} title="Anticipo" />
              <div style={{ flex: financiar - interesTotal, background: "var(--brass)" }} title="Capital financiado" />
              <div style={{ flex: interesTotal, background: "var(--paper-3)" }} title="Intereses" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, gap: 12, flexWrap: "wrap" }}>
              {[
                ["Anticipo", "var(--ink)"],
                ["Capital", "var(--brass)"],
                ["Intereses", "var(--paper-3)"],
              ].map(([k, c]) => (
                <div key={k} className="t-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: c }}></span>{k}
                </div>
              ))}
            </div>
          </div>

          <a href="#contacto" className="btn btn--solid" style={{ alignSelf: "flex-start" }}>
            Reservar esta unidad <span className="btn__arrow"></span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) { .calc-grid { grid-template-columns: 1fr !important; } }
        .calc-range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 2px; background: rgba(244,239,230,0.25); outline: none;
        }
        .calc-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--brass); cursor: pointer;
          box-shadow: 0 0 0 4px rgba(196,162,106,0.18);
        }
        .calc-range::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--brass); cursor: pointer; border: none;
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Calculator });
