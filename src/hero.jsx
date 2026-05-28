// Hero: cinematic, full-bleed image, oversized editorial display + ticker.

const Hero = () => {
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // Parallax shift
  const px = (mouse.x - 0.5) * 24;
  const py = (mouse.y - 0.5) * 24;

  return (
    <section
      id="top"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "var(--ink)",
      }}
    >
      {/* Background photo */}
      <div style={{
        position: "absolute",
        inset: "-4%",
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `translate(${px * -0.4}px, ${py * -0.4}px) scale(1.05)`,
        transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
        filter: "saturate(0.85) contrast(1.05)",
      }} />
      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(12,12,13,0.65) 0%, rgba(12,12,13,0.25) 35%, rgba(12,12,13,0.92) 100%)",
      }} />
      {/* Grain texture via SVG */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.08, mixBlendMode: "overlay", pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      }} />

      {/* Top corner labels */}
      <div className="hero-corners" style={{
        position: "absolute", top: 110, left: "clamp(24px,5vw,80px)", right: "clamp(24px,5vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        color: "var(--paper)", zIndex: 2,
      }}>
        <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.75, lineHeight: 1.8 }}>
          Edición 2026 · No. 014<br/>
          Carta de presentación
        </div>
        <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.75, textAlign: "right", lineHeight: 1.8 }}>
          34°35′ S · 58°22′ O<br/>
          Buenos Aires, Argentina
        </div>
      </div>

      {/* Main display title */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "clamp(60px,8vw,100px) clamp(24px,5vw,80px) clamp(40px,5vw,60px)",
        color: "var(--paper)",
      }}>
        <Reveal>
          <div className="t-eyebrow" style={{ marginBottom: 32, opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "currentColor", marginRight: 14, verticalAlign: "middle", opacity: 0.6 }}></span>
            Desde 1987 · 38 años construyendo
          </div>
        </Reveal>

        <h1 className="display" style={{ maxWidth: "16ch", marginBottom: 32 }}>
          <Reveal delay={120}>
            <span style={{ display: "block" }}>Edificios que</span>
          </Reveal>
          <Reveal delay={260}>
            <span style={{ display: "block", color: "var(--brass-bright)", fontStyle: "italic", fontFamily: "var(--serif)" }}>
              levantan
            </span>
          </Reveal>
          <Reveal delay={400}>
            <span style={{ display: "block" }}>una ciudad.</span>
          </Reveal>
        </h1>

        <Reveal delay={580}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-end", justifyContent: "space-between" }}>
            <p className="lede" style={{ maxWidth: "44ch", margin: 0 }}>
              Diseñamos y construimos residencias, torres y desarrollos comerciales con
              estándares europeos y obsesión argentina por el detalle. De la pala al
              cierre de obra, una sola firma.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#proyectos" className="btn btn--solid">
                Ver portfolio <span className="btn__arrow"></span>
              </a>
              <a href="#obra" className="btn btn--ghost">
                Obra en vivo <span className="btn__arrow"></span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom strip — metrics ticker */}
      <div style={{
        borderTop: "1px solid var(--line-strong)",
        borderBottom: "1px solid var(--line-strong)",
        padding: "26px clamp(24px,5vw,80px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 32,
        zIndex: 2,
        color: "var(--paper)",
        background: "rgba(12,12,13,0.55)",
        backdropFilter: "blur(8px)",
      }} className="hero-metrics">
        {[
          { v: 142, s: "", label: "Obras entregadas" },
          { v: 386, s: "K m²", label: "Construidos" },
          { v: 38, s: " años", label: "En el mercado" },
          { v: 9, s: ".7/10", label: "Satisfacción cliente" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="t-serif" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              <Counter value={m.v} suffix={m.s} />
            </div>
            <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.65 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" style={{
        position: "absolute",
        bottom: 130, right: "clamp(24px,5vw,80px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        color: "var(--paper)", opacity: 0.7, zIndex: 3,
      }}>
        <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", writingMode: "vertical-rl" }}>
          Desliz·ar
        </div>
        <div style={{ width: 1, height: 48, background: "currentColor", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 0, width: "100%", height: "30%",
            background: "var(--brass)",
            animation: "scrollDot 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(330%); }
        }
        @media (max-width: 720px) {
          .hero-metrics { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero });
