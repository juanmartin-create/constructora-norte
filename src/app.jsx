// Main App — composición de secciones (producción, sin panel de tweaks).
// Respeta prefers-reduced-motion del sistema operativo.

const App = () => {
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--density", "1");

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyAnim = () => {
      const intensity = mq.matches ? 0 : 2;
      r.style.setProperty("--anim", String(intensity));
      r.dataset.anim = String(intensity);
    };
    applyAnim();
    mq.addEventListener("change", applyAnim);
    return () => mq.removeEventListener("change", applyAnim);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <BeforeAfter />
      <Projects />
      <Timeline />
      <Floorplan />
      <Materials />
      <Tour />
      <Calculator />
      <Services />
      <CredentialsStrip />
      <Contact />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
