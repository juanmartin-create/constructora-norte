// Portfolio de proyectos — grilla magnética con hover reveal.

const PROJECTS = [
  { id: "p1", name: "Torre Libertador 4820", year: "2025", type: "Residencial", units: "84 deptos", img: IMG.p1, color: "#1a2128" },
  { id: "p2", name: "Plaza Mitre Lofts", year: "2024", type: "Mixed-use", units: "62 lofts · retail", img: IMG.p2, color: "#221a14" },
  { id: "p3", name: "Casa O. — Tigre", year: "2024", type: "Residencia particular", units: "640 m²", img: IMG.p3, color: "#1f1f1c" },
  { id: "p4", name: "Quintas del Pilar", year: "2024", type: "Barrio cerrado", units: "42 lotes", img: IMG.p4, color: "#231b13" },
  { id: "p5", name: "Edificio Bulnes", year: "2023", type: "Residencial", units: "36 deptos", img: IMG.p5, color: "#1a1a20" },
  { id: "p6", name: "Polo Norte Office", year: "2023", type: "Corporativo", units: "4.200 m²", img: IMG.p6, color: "#181c1a" },
];

const ProjectCard = ({ p, large }) => {
  const ref = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const [mp, setMp] = React.useState({ x: 0.5, y: 0.5 });

  return (
    <a
      ref={ref}
      href="#contacto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setMp({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      style={{
        position: "relative",
        display: "block",
        aspectRatio: large ? "16/10" : "4/5",
        background: p.color,
        overflow: "hidden",
        color: "var(--paper)",
        textDecoration: "none",
        gridColumn: large ? "span 2" : "span 1",
      }}
    >
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transform: hover ? `scale(1.06) translate(${(mp.x - 0.5) * -8}px, ${(mp.y - 0.5) * -8}px)` : "scale(1)",
          transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
          filter: hover ? "brightness(0.7)" : "brightness(0.85)",
        }}
      />
      {/* Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(0deg, rgba(12,12,13,0.85) 0%, rgba(12,12,13,0) 50%)",
      }} />

      {/* Top tag */}
      <div className="t-mono" style={{
        position: "absolute", top: 18, left: 18,
        fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        opacity: 0.85,
      }}>
        {p.year} · {p.type}
      </div>

      {/* Name */}
      <div style={{
        position: "absolute", bottom: 24, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12,
      }}>
        <h3 className="t-serif" style={{ fontSize: large ? "clamp(28px,3vw,40px)" : 24, lineHeight: 1, letterSpacing: "-0.015em" }}>
          {p.name}
        </h3>
        <div className="t-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.75, textAlign: "right", whiteSpace: "nowrap" }}>
          {p.units}
        </div>
      </div>

      {/* Magnetic cursor — appears on hover */}
      <div style={{
        position: "absolute",
        left: `${mp.x * 100}%`,
        top: `${mp.y * 100}%`,
        transform: `translate(-50%, -50%) scale(${hover ? 1 : 0})`,
        width: 88, height: 88, borderRadius: "50%",
        background: "var(--brass)", color: "var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
        transition: "transform 0.5s cubic-bezier(.2,.7,.2,1)",
        pointerEvents: "none", zIndex: 2,
      }}>
        Ver caso
      </div>
    </a>
  );
};

const Projects = () => {
  const [filter, setFilter] = React.useState("Todos");
  const filtered = filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);
  const types = ["Todos", ...Array.from(new Set(PROJECTS.map((p) => p.type)))];

  return (
    <section id="proyectos" className="section">
      <SectionHead
        num={2}
        eyebrow="Portfolio"
        title={<>142 proyectos.<br/><em style={{ color: "var(--brass-bright)" }}>Ningún cliente repetido</em> por equivocación.</>}
        lede="Una selección de los últimos cinco años. Residencial, comercial y residencias particulares — siempre con la misma firma."
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 36, flexWrap: "wrap" }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="t-mono"
            style={{
              background: filter === t ? "var(--paper)" : "transparent",
              color: filter === t ? "var(--ink)" : "var(--paper)",
              border: "1px solid " + (filter === t ? "var(--paper)" : "var(--line-strong)"),
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="proj-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 4,
      }}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} p={p} large={i === 0} />
        ))}
      </div>

      <style>{`
        @media (max-width: 920px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-grid > a { grid-column: span 1 !important; aspect-ratio: 4/5 !important; }
        }
        @media (max-width: 540px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Projects });
