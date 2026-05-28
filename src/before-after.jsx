// Antes / Después con deslizador. Soporta drag + cambio de obra.

const BA_PROJECTS = [
  {
    id: "casa-pilar",
    name: "Casa en Pilar",
    type: "Residencia particular",
    location: "Pilar · Buenos Aires",
    year: "2023 — 2024",
    before: IMG.baBeforeLot,
    after: IMG.baAfter,
    beforeLabel: "Lote · Ago 2023",
    afterLabel: "Entrega · Jul 2024",
    surface: "640 m²",
    units: "1 vivienda",
  },
];

const BeforeAfter = () => {
  const [idx, setIdx] = React.useState(0);
  const [pos, setPos] = React.useState(0.42);
  const [dragging, setDragging] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const wrapRef = React.useRef(null);
  const project = BA_PROJECTS[idx];

  const setFromEvent = React.useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    setPos(Math.max(0, Math.min(1, x / r.width)));
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const move = (e) => { setFromEvent(e); e.preventDefault?.(); };
    const up = () => setDragging(false);
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
  }, [dragging, setFromEvent]);

  // Gentle auto-pulse if not interacting
  React.useEffect(() => {
    if (dragging || hover) return;
    let raf, t0;
    const loop = (t) => {
      if (t0 == null) t0 = t;
      const elapsed = (t - t0) / 1000;
      setPos(0.5 + Math.sin(elapsed * 0.6) * 0.22);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dragging, hover]);

  return (
    <section id="obra" className="section" style={{ paddingTop: "calc(120px * var(--density))" }}>
      <SectionHead
        num={1}
        eyebrow="Antes · Después"
        title={<>Del lote vacío<br/><em style={{ color: "var(--brass-bright)" }}>al cierre de obra.</em></>}
        lede="Arrastrá el deslizador para ver cómo transformamos un terreno en una obra terminada. Cada proyecto, documentado de pala a llave."
      />

      {/* Tabs para cambiar de proyecto (ocultos si hay 1 solo) */}
      <div style={{ display: BA_PROJECTS.length > 1 ? "flex" : "none", gap: 4, marginBottom: 32, borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
        {BA_PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIdx(i)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${idx === i ? "var(--brass)" : "transparent"}`,
              color: idx === i ? "var(--paper)" : "var(--paper-3)",
              padding: "16px 4px",
              marginRight: 32,
              cursor: "pointer",
              transition: "color 0.3s, border-color 0.3s",
              textAlign: "left",
            }}
          >
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.65, marginBottom: 4 }}>
              Caso {String(i + 1).padStart(2, "0")}
            </div>
            <div className="t-serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{p.name}</div>
          </button>
        ))}
      </div>

      {/* Slider wrap */}
      <div
        ref={wrapRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={(e) => { setDragging(true); setFromEvent(e); }}
        onTouchStart={(e) => { setDragging(true); setFromEvent(e); }}
        onMouseMove={(e) => { if (hover && !dragging) setFromEvent(e); }}
        className="ba-stage"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          aspectRatio: "16 / 9",
          maxHeight: "72vh",
          overflow: "hidden",
          background: "var(--ink-2)",
          cursor: dragging ? "grabbing" : "ew-resize",
          userSelect: "none",
        }}
      >
        {/* After (full) */}
        <img
          src={project.after}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom" }}
        />
        {/* Before (clipped) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--ink)",
          clipPath: `polygon(0 0, ${pos * 100}% 0, ${pos * 100}% 100%, 0 100%)`,
          transition: dragging ? "none" : "clip-path 0.05s linear",
        }}>
          <img
            src={project.before}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom", filter: "grayscale(0.15) contrast(1.05)" }}
          />
          {/* Tint the "antes" side */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,12,13,0.0) 60%, rgba(12,12,13,0.55))" }} />
        </div>

        {/* Captions */}
        <div className="t-mono ba-cap-antes" style={{
          position: "absolute", top: 24, left: 24,
          background: "rgba(12,12,13,0.6)", backdropFilter: "blur(8px)",
          padding: "8px 14px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--paper)", zIndex: 2, opacity: pos > 0.04 ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <span className="ba-cap-full">◄ Antes · {project.beforeLabel}</span>
          <span className="ba-cap-short">◄ Antes</span>
        </div>
        <div className="t-mono ba-cap-despues" style={{
          position: "absolute", top: 24, right: 24,
          background: "rgba(12,12,13,0.6)", backdropFilter: "blur(8px)",
          padding: "8px 14px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--paper)", zIndex: 2, opacity: pos < 0.96 ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <span className="ba-cap-full">{project.afterLabel} · Después ►</span>
          <span className="ba-cap-short">Después ►</span>
        </div>

        {/* Slider handle */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: `${pos * 100}%`,
          width: 2, background: "var(--paper)", transform: "translateX(-50%)",
          boxShadow: "0 0 24px rgba(255,255,255,0.15)", zIndex: 3,
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--paper)", color: "var(--ink)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            cursor: "grab",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 6 L3 12 L8 18" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M16 6 L21 12 L16 18" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
          </div>
        </div>

        {/* Project meta bottom-left */}
        <div className="ba-meta" style={{
          position: "absolute", left: 24, bottom: 24, right: 24,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          color: "var(--paper)", zIndex: 2, pointerEvents: "none",
        }}>
          <div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7, marginBottom: 8 }}>
              {project.type} · {project.location}
            </div>
            <div className="t-serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", letterSpacing: "-0.015em", lineHeight: 1 }}>
              {project.name}
            </div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div>
              <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.7, textTransform: "uppercase" }}>Superficie</div>
              <div className="t-serif" style={{ fontSize: 22 }}>{project.surface}</div>
            </div>
            <div>
              <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", opacity: 0.7, textTransform: "uppercase" }}>Unidades</div>
              <div className="t-serif" style={{ fontSize: 22 }}>{project.units}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper */}
      <div className="ba-helper" style={{ display: "flex", justifyContent: "space-between", marginTop: 16, color: "var(--paper-3)", gap: 12, flexWrap: "wrap" }}>
        <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          ↔ Arrastrar · Click para fijar
        </div>
        <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Posición: {Math.round(pos * 100)}%
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { BeforeAfter });
