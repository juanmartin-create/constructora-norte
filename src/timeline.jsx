// Timeline scrubeable mes a mes — usa una secuencia de imágenes + cross-fade.

const PHASES = [
  { month: 0,  label: "Mes 00", title: "Terreno", desc: "Lote crudo. Topografía, geotecnia y permisos municipales.",       img: IMG.t01 },
  { month: 3,  label: "Mes 03", title: "Excavación", desc: "Movimiento de suelos. Pilotes y submuración perimetral.",       img: IMG.t02 },
  { month: 6,  label: "Mes 06", title: "Estructura", desc: "Hormigón armado. Loseado planta baja y subsuelo.",              img: IMG.t03 },
  { month: 9,  label: "Mes 09", title: "Ascenso", desc: "Crece a razón de una losa cada 22 días. Encofrado trepante.",       img: IMG.t04 },
  { month: 12, label: "Mes 12", title: "Cerramiento", desc: "Mampostería + carpinterías. La obra empieza a tener piel.",     img: IMG.t05 },
  { month: 16, label: "Mes 16", title: "Instalaciones", desc: "Termomecánica, electricidad, sanitaria, datos. En paralelo.", img: IMG.t06 },
  { month: 20, label: "Mes 20", title: "Terminaciones", desc: "Pisos, revestimientos, equipamiento. Calidad europea.",       img: IMG.t07 },
  { month: 24, label: "Mes 24", title: "Entrega", desc: "Pre-entrega + apertura. Posesión simultánea para todos los propietarios.", img: IMG.t08 },
];

const Timeline = () => {
  const [pos, setPos] = React.useState(0); // 0..1 along the track
  const [playing, setPlaying] = React.useState(false);
  const trackRef = React.useRef(null);
  const draggingRef = React.useRef(false);

  // Find current phase
  const phaseFloat = pos * (PHASES.length - 1);
  const phaseIdx = Math.round(phaseFloat);
  const phase = PHASES[phaseIdx];

  // Auto-play
  React.useEffect(() => {
    if (!playing) return;
    let raf, t0;
    const loop = (t) => {
      if (t0 == null) t0 = t;
      const elapsed = (t - t0) / 1000;
      const p = (elapsed / 8) % 1;
      setPos(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const setFromX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setPos(p);
  };

  React.useEffect(() => {
    const move = (e) => { if (!draggingRef.current) return; setFromX(e.touches ? e.touches[0].clientX : e.clientX); };
    const up = () => { draggingRef.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <section id="proceso" className="section section--light" style={{ background: "var(--paper)" }}>
      <SectionHead
        num={3}
        eyebrow="Proceso constructivo"
        title={<>24 meses<br/><em style={{ color: "#9a7438" }}>de pala a llave.</em></>}
        lede="Movés el deslizador y ves la obra avanzar. Cronograma típico de una torre de 18 plantas: hitos, plazos y entrega."
      />

      {/* Image stage */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/8",
        overflow: "hidden",
        background: "var(--ink)",
        marginBottom: 32,
      }}>
        {PHASES.map((ph, i) => {
          const dist = Math.abs(phaseFloat - i);
          const opacity = Math.max(0, 1 - dist);
          return (
            <img
              key={i}
              src={ph.img}
              alt={ph.title}
              loading="lazy"
              decoding="async"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                opacity,
                transition: "opacity 0.25s ease",
              }}
            />
          );
        })}
        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(12,12,13,0.4))" }} />

        {/* Overlay info */}
        <div style={{
          position: "absolute", top: 28, left: 28,
          color: "var(--paper)",
          background: "rgba(12,12,13,0.55)", backdropFilter: "blur(10px)",
          padding: "18px 22px",
          borderLeft: "2px solid var(--brass)",
          maxWidth: 400,
        }}>
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>
            {phase.label} · Hito {String(phaseIdx + 1).padStart(2, "0")} de {String(PHASES.length).padStart(2, "0")}
          </div>
          <div className="t-serif" style={{ fontSize: 32, letterSpacing: "-0.015em", marginBottom: 8 }}>
            {phase.title}
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.5 }}>{phase.desc}</div>
        </div>

        {/* Right counter */}
        <div style={{
          position: "absolute", top: 28, right: 28,
          color: "var(--paper)",
          textAlign: "right",
        }}>
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: 4 }}>
            Avance de obra
          </div>
          <div className="t-serif" style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {Math.round(pos * 100)}<span style={{ fontSize: 32, opacity: 0.7 }}>%</span>
          </div>
        </div>
      </div>

      {/* Timeline track */}
      <div style={{ position: "relative", padding: "20px 0 60px" }}>
        {/* Play btn */}
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar" : "Reproducir"}
          style={{
            position: "absolute", left: -60, top: 18,
            width: 44, height: 44, borderRadius: "50%",
            background: "var(--ink)", color: "var(--paper)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
          className="tl-play"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="2" width="3" height="10" fill="currentColor"/><rect x="8" y="2" width="3" height="10" fill="currentColor"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="3,2 12,7 3,12" fill="currentColor"/></svg>
          )}
        </button>

        <div
          ref={trackRef}
          onMouseDown={(e) => { draggingRef.current = true; setPlaying(false); setFromX(e.clientX); }}
          onTouchStart={(e) => { draggingRef.current = true; setPlaying(false); setFromX(e.touches[0].clientX); }}
          style={{
            position: "relative",
            height: 80,
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {/* Base line */}
          <div style={{ position: "absolute", top: 40, left: 0, right: 0, height: 1, background: "var(--line-ink)" }} />
          {/* Filled line */}
          <div style={{ position: "absolute", top: 40, left: 0, height: 1, background: "var(--ink)", width: `${pos * 100}%` }} />

          {/* Phase ticks */}
          {PHASES.map((ph, i) => {
            const x = i / (PHASES.length - 1);
            const active = i <= phaseFloat + 0.001;
            return (
              <div key={i} style={{
                position: "absolute", left: `${x * 100}%`, top: 0, height: "100%",
                transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
                pointerEvents: "none",
              }}>
                <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: active ? "var(--ink)" : "rgba(12,12,13,0.4)", whiteSpace: "nowrap" }}>
                  {ph.label}
                </div>
                <div style={{
                  width: i === phaseIdx ? 12 : 8, height: i === phaseIdx ? 12 : 8,
                  borderRadius: "50%",
                  background: active ? "var(--ink)" : "transparent",
                  border: "1px solid var(--ink)",
                  marginTop: 32, transition: "all 0.2s",
                }} />
                <div className="t-mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(12,12,13,0.5)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {ph.title}
                </div>
              </div>
            );
          })}

          {/* Scrubber knob */}
          <div style={{
            position: "absolute", left: `${pos * 100}%`, top: 40,
            transform: "translate(-50%, -50%)",
            width: 28, height: 28, borderRadius: "50%",
            background: "var(--brass)", border: "3px solid var(--paper)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
            pointerEvents: "none", zIndex: 2,
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .tl-play { display: none !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Timeline });
