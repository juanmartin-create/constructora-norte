// Contacto / agendar visita — formulario stepper + opciones de cita.

const VISIT_TYPES = [
  { id: "showroom", name: "Showroom", desc: "Recorrida por unidad modelo en Av. Libertador 4820, planta 12.", time: "60 min" },
  { id: "obra",     name: "Visita a obra", desc: "Casco abierto. Te llevamos por la torre en construcción con casco y arnés.", time: "90 min" },
  { id: "virtual",  name: "Reunión virtual", desc: "Videollamada con el equipo de arquitectura. Mostramos planos y renders.", time: "45 min" },
];

const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

const Contact = () => {
  const [step, setStep] = React.useState(1);
  const [type, setType] = React.useState("showroom");
  const [day, setDay] = React.useState(2);
  const [slot, setSlot] = React.useState("10:30");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today.getTime() + i * 86400000);
    return {
      idx: i,
      day: d.getDate(),
      label: ["dom","lun","mar","mié","jue","vie","sáb"][d.getDay()],
      month: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][d.getMonth()],
    };
  });

  const selectedDay = days[day];
  const selectedType = VISIT_TYPES.find((t) => t.id === type);

  const canNext = step === 1 ? (type && slot && day != null) : (name && phone && email);

  return (
    <section id="contacto" className="section section--light" style={{ background: "var(--paper)" }}>
      <SectionHead
        num={9}
        eyebrow="Agendar"
        title={<>Visitanos<br/><em style={{ color: "#9a7438" }}>esta semana.</em></>}
        lede="Tres formatos: showroom, visita a obra o reunión virtual. Confirmás en 2 minutos."
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 480px",
        gap: 4,
        background: "var(--ink)",
        color: "var(--paper)",
      }} className="contact-grid">

        {/* Left: agenda / form */}
        <div style={{ padding: 36 }}>
          {done ? (
            <div style={{ minHeight: 480, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--brass)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, color: "var(--ink)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
              <h3 className="t-serif" style={{ fontSize: 48, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 12 }}>
                Confirmado, {name.split(" ")[0] || "gracias"}.
              </h3>
              <p style={{ fontSize: 16, color: "var(--paper-2)", maxWidth: "44ch", marginBottom: 16 }}>
                Te esperamos el <strong>{selectedDay.label} {selectedDay.day} de {selectedDay.month}</strong> a las <strong>{slot} hs</strong> para una {selectedType.name.toLowerCase()}.
                Te enviamos los datos por WhatsApp a {phone}.
              </p>
              <button
                onClick={() => { setDone(false); setStep(1); setName(""); setPhone(""); setEmail(""); }}
                className="btn btn--ghost" style={{ alignSelf: "flex-start" }}
              >
                Agendar otra <span className="btn__arrow"></span>
              </button>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                {[1, 2].map((n) => (
                  <div key={n} style={{ flex: 1, height: 2, background: step >= n ? "var(--brass)" : "rgba(244,239,230,0.2)", transition: "background 0.4s" }} />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65, marginBottom: 16 }}>
                    Paso 01 · ¿Qué tipo de encuentro?
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
                    {VISIT_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        style={{
                          textAlign: "left",
                          padding: 16,
                          background: type === t.id ? "var(--ink-3)" : "transparent",
                          border: "1px solid var(--line-strong)",
                          borderLeft: `3px solid ${type === t.id ? "var(--brass)" : "transparent"}`,
                          color: "var(--paper)",
                          cursor: "pointer",
                          transition: "all 0.25s",
                          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                        }}
                      >
                        <div>
                          <div className="t-serif" style={{ fontSize: 22, marginBottom: 4 }}>{t.name}</div>
                          <div style={{ fontSize: 12, color: "var(--paper-3)", lineHeight: 1.5 }}>{t.desc}</div>
                        </div>
                        <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, flexShrink: 0 }}>
                          {t.time}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Day picker */}
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65, marginBottom: 12 }}>
                    Día
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 28 }}>
                    {days.map((d) => (
                      <button
                        key={d.idx}
                        onClick={() => setDay(d.idx)}
                        style={{
                          padding: "10px 4px",
                          background: day === d.idx ? "var(--brass)" : "transparent",
                          color: day === d.idx ? "var(--ink)" : "var(--paper)",
                          border: "1px solid " + (day === d.idx ? "var(--brass)" : "var(--line-strong)"),
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.75 }}>{d.label}</div>
                        <div className="t-serif" style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{d.day}</div>
                      </button>
                    ))}
                  </div>

                  {/* Slot picker */}
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65, marginBottom: 12 }}>
                    Horario
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className="t-mono"
                        style={{
                          padding: "10px 14px",
                          fontSize: 11, letterSpacing: "0.1em",
                          background: slot === s ? "var(--paper)" : "transparent",
                          color: slot === s ? "var(--ink)" : "var(--paper)",
                          border: "1px solid " + (slot === s ? "var(--paper)" : "var(--line-strong)"),
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65, marginBottom: 16 }}>
                    Paso 02 · Tus datos
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[
                      { label: "Nombre y apellido", val: name, setter: setName, type: "text", placeholder: "Martín Fernández" },
                      { label: "Teléfono / WhatsApp", val: phone, setter: setPhone, type: "tel", placeholder: "+54 9 11 5555 0000" },
                      { label: "Email", val: email, setter: setEmail, type: "email", placeholder: "martin@empresa.com" },
                    ].map((f) => (
                      <label key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6 }}>
                          {f.label}
                        </span>
                        <input
                          type={f.type}
                          value={f.val}
                          onChange={(e) => f.setter(e.target.value)}
                          placeholder={f.placeholder}
                          style={{
                            background: "transparent",
                            border: "none",
                            borderBottom: "1px solid var(--line-strong)",
                            color: "var(--paper)",
                            padding: "10px 0",
                            fontFamily: "var(--serif)",
                            fontSize: 22,
                            outline: "none",
                          }}
                          onFocus={(e) => e.target.style.borderBottomColor = "var(--brass)"}
                          onBlur={(e) => e.target.style.borderBottomColor = "var(--line-strong)"}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, gap: 12 }}>
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="btn btn--ghost" style={{ borderColor: "var(--line-strong)" }}>
                    Volver
                  </button>
                ) : <div />}
                <button
                  disabled={!canNext}
                  onClick={() => {
                    if (step === 2) { setDone(true); }
                    else setStep(step + 1);
                  }}
                  className="btn btn--solid"
                  style={{ opacity: canNext ? 1 : 0.4, pointerEvents: canNext ? "auto" : "none" }}
                >
                  {step === 2 ? "Confirmar visita" : "Siguiente"} <span className="btn__arrow"></span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: summary card / contact info */}
        <div style={{
          padding: 36,
          background: "var(--ink-2)",
          display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24,
        }}>
          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 18 }}>
              Tu reserva
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>Modalidad</div>
                <div className="t-serif" style={{ fontSize: 28, letterSpacing: "-0.015em" }}>{selectedType.name}</div>
              </div>
              <div>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>Fecha</div>
                <div className="t-serif" style={{ fontSize: 28, letterSpacing: "-0.015em" }}>
                  {selectedDay.label} {selectedDay.day} {selectedDay.month}
                </div>
              </div>
              <div>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>Horario</div>
                <div className="t-serif" style={{ fontSize: 28, letterSpacing: "-0.015em" }}>{slot} hs · {selectedType.time}</div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--paper-3)", marginBottom: 14 }}>
              Contacto directo
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <a href="#" style={{ color: "var(--paper)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, display: "inline-flex" }}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M3 6 L3 19 L21 19 L21 6 L12 13 Z" stroke="currentColor" strokeWidth="1.4"/></svg>
                </span>
                hola@constructoranorte.com.ar
              </a>
              <a href="#" style={{ color: "var(--paper)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, display: "inline-flex" }}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 4 L9 4 L11 9 L8 11 C9 14 10 15 13 16 L15 13 L20 15 L20 19 C20 19 13 21 8 16 C3 11 5 4 5 4 Z" stroke="currentColor" strokeWidth="1.4"/></svg>
                </span>
                +54 11 4892 0420
              </a>
              <a href="#" style={{ color: "var(--paper)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, display: "inline-flex" }}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 22 C12 22 19 15 19 10 C19 6 16 3 12 3 C8 3 5 6 5 10 C5 15 12 22 12 22 Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4"/></svg>
                </span>
                Av. Libertador 4820, Buenos Aires
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

const Footer = () => (
  <footer style={{
    padding: "60px clamp(24px,5vw,80px) 36px",
    background: "var(--ink)",
    color: "var(--paper)",
    borderTop: "1px solid var(--line)",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
      <div className="t-serif" style={{ fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.025em" }}>
        Construyamos<br/><em style={{ color: "var(--brass-bright)" }}>algo grande.</em>
      </div>
      <a href="#contacto" className="btn btn--solid">Empezar conversación <span className="btn__arrow"></span></a>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
      <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.55 }}>
        © 2026 Constructora Norte SRL · CUIT 30-71234567-8 · Mat. CPAU 14209
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Instagram", "LinkedIn", "Pinterest", "Newsletter"].map((s) => (
          <a key={s} href="#" className="t-mono" style={{ color: "var(--paper-3)", textDecoration: "none", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {s} ↗
          </a>
        ))}
      </div>
    </div>
  </footer>
);

Object.assign(window, { Contact, Footer });
