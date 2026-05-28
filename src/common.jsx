// Common UI primitives shared across sections.

const Eyebrow = ({ children, num }) => (
  <div className="t-eyebrow" style={{ display: "flex", gap: 12, alignItems: "center" }}>
    {num != null && <span style={{ opacity: 0.55 }}>{String(num).padStart(2, "0")}</span>}
    <span style={{ display: "inline-block", width: 24, height: 1, background: "currentColor", opacity: 0.4 }}></span>
    <span>{children}</span>
  </div>
);

const SectionHead = ({ num, eyebrow, title, lede, light }) => (
  <header className="section-head">
    <div className="section-head__num">
      <div className="t-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6 }}>
        {String(num).padStart(2, "0")} <span style={{ margin: "0 8px", opacity: 0.35 }}>/</span> {eyebrow}
      </div>
    </div>
    <div>
      <h2 className="h2 section-head__title" style={{ marginBottom: lede ? 24 : 0 }}>
        {title}
      </h2>
      {lede && <p className="lede" style={{ margin: 0 }}>{lede}</p>}
    </div>
  </header>
);

// IntersectionObserver-based reveal — with a timeout fallback so content
// never gets stuck invisible when IO doesn't fire (e.g. inside some iframes).
const Reveal = ({ children, delay = 0, as: Tag = "div", ...rest }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealTimer;
    const reveal = () => {
      clearTimeout(revealTimer);
      revealTimer = setTimeout(() => setVisible(true), delay);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    // Fallback: reveal anyway if IO never fires.
    const fallback = setTimeout(reveal, 700);
    return () => { io.disconnect(); clearTimeout(revealTimer); clearTimeout(fallback); };
  }, [delay]);
  return (
    <Tag ref={ref} className={"fade-in " + (visible ? "is-visible " : "") + (rest.className || "")} {...rest}>
      {children}
    </Tag>
  );
};

// Use requestAnimationFrame for smoother number counter
const useCounter = (target, duration = 1800, start = false) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (t0 == null) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
};

const Counter = ({ value, suffix = "", duration = 1800 }) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => setInView(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { start(); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    // Fallback in case IO never fires (some iframes don't dispatch it).
    const fb = setTimeout(start, 800);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  const val = useCounter(value, duration, inView);
  return <span ref={ref}>{val.toLocaleString("es-AR")}{suffix}</span>;
};

// Image URLs (Unsplash CDN con auto-format + WebP cuando el browser lo soporta).
// Para producción real, reemplazar por rutas locales en /assets/.
const _u = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=78&auto=format&fm=webp`;
const IMG = {
  hero:    _u("1545324418-cc1a3fa10c00", 1920),
  heroAlt: _u("1486325212027-8081e485255e", 1920),

  // Antes/Después — fotos reales del cliente
  baBeforeLot: "assets/antes.webp",
  baAfter:     "assets/despues.webp",
  baBefore:    "assets/antes.webp",
  baAfter2:    "assets/despues.webp",

  // Proyectos
  p1: _u("1545324418-cc1a3fa10c00", 1400),
  p2: _u("1600585154340-be6161a56a0c", 1400),
  p3: _u("1600210492486-724fe5c67fb0", 1400),
  p4: _u("1582268611958-ebfd161ef9cf", 1400),
  p5: _u("1564013799919-ab600027ffc6", 1400),
  p6: _u("1572120360610-d971b9d7767c", 1400),

  // Timeline (proceso constructivo — 8 fases, fotos del cliente)
  t01: "assets/timeline/0.webp",
  t02: "assets/timeline/1.webp",
  t03: "assets/timeline/2.webp",
  t04: "assets/timeline/3.webp",
  t05: "assets/timeline/4.webp",
  t06: "assets/timeline/5.webp",
  t07: "assets/timeline/6.webp",
  t08: "assets/timeline/7.webp",

  // Materiales — fotos del cliente
  matWood:       "assets/materials/roble-frances.webp",
  matMarble:     "assets/materials/marmol-calacatta.webp",
  matConcrete:   "assets/materials/hormigon-pulido.webp",
  matTravertine: "assets/materials/travertino.webp",

  // Interiores
  intLiving:  _u("1600210492486-724fe5c67fb0", 1600),
  intKitchen: _u("1600585154340-be6161a56a0c", 1600),
  intBedroom: _u("1505691938895-1758d7feb511", 1600),

  // Tour panorama
  pano: _u("1600607687939-ce8a6c25118c", 3000),
};

Object.assign(window, { Eyebrow, SectionHead, Reveal, Counter, useCounter, IMG });
