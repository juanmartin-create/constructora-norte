// Sticky nav with current section indicator + scroll progress.

const NAV_ITEMS = [
  { id: "obra", label: "Antes / Después" },
  { id: "proyectos", label: "Proyectos" },
  { id: "proceso", label: "Proceso" },
  { id: "plano", label: "Plano" },
  { id: "materiales", label: "Materiales" },
  { id: "tour", label: "Tour 360°" },
  { id: "financiacion", label: "Financiación" },
  { id: "contacto", label: "Contacto" },
];

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px clamp(20px, 4vw, 56px)",
        background: scrolled ? "rgba(12,12,13,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s",
        color: "var(--paper)",
      }}
    >
      {/* Logo */}
      <a href="#top" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M2 19 L11 3 L20 19 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
          <path d="M6.5 12 L15.5 12" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
        <span className="t-mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Constructora Norte
        </span>
      </a>

      {/* Section links — only show on wider screens */}
      <div className="nav-links" style={{ display: "flex", gap: 24 }}>
        {NAV_ITEMS.slice(0, 5).map((it) => (
          <a key={it.id} href={"#" + it.id}
             className="t-mono"
             style={{ color: "inherit", textDecoration: "none", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>
            {it.label}
          </a>
        ))}
      </div>

      {/* Right side: CTA + progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", opacity: 0.55 }}>
          BA · AR
        </div>
        <a href="#contacto" className="btn btn--solid" style={{ padding: "10px 16px 10px 18px", fontSize: 11 }}>
          Agendar visita <span className="btn__arrow"></span>
        </a>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: 1, background: "var(--brass)",
        width: (progress * 100).toFixed(2) + "%", transition: "width 0.1s linear",
      }} />

      <style>{`
        @media (max-width: 920px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
};

Object.assign(window, { Nav });
