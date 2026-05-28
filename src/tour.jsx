// Tour 360° — iframe embed de Kuula (colección con scene-switcher nativo).
// Para cambiar la colección, reemplazar el src del iframe.

const KUULA_SRC = "https://kuula.co/share/collection/7lRNF?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1";

const Tour = () => {
  return (
    <section id="tour" className="section">
      <SectionHead
        num={6}
        eyebrow="Tour 360°"
        title={<>Recorré la unidad<br/><em style={{ color: "var(--brass-bright)" }}>sin moverte.</em></>}
        lede="Arrastrá para girar la cámara. Tocá los puntos en el piso para saltar entre ambientes. Compatible con mobile y VR."
      />

      <div className="tour-stage" style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        maxHeight: "78vh",
        background: "var(--ink)",
        border: "1px solid var(--line)",
        overflow: "hidden",
      }}>
        <iframe
          src={KUULA_SRC}
          title="Tour virtual 360°"
          loading="lazy"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />

        {/* Etiqueta esquina (sobreimpresa, no interfiere con el iframe) */}
        <div className="t-mono" style={{
          position: "absolute", top: 18, left: 18,
          background: "rgba(12,12,13,0.6)", backdropFilter: "blur(10px)",
          color: "var(--paper)",
          padding: "10px 14px",
          fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.92,
          pointerEvents: "none",
        }}>
          Vista en 360° · Recorrido virtual
        </div>
      </div>

      <p className="t-mono" style={{
        marginTop: 16, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--paper-3)", opacity: 0.65,
      }}>
        Powered by Kuula · ↔ Arrastrá para mirar alrededor · ⛶ Pantalla completa en la barra inferior
      </p>
    </section>
  );
};

Object.assign(window, { Tour });
