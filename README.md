# Constructora Norte — Sitio web

Sitio one-page interactivo. Lista para servir desde **Netlify** como estático.

## Stack
- HTML estático + React 18 (UMD desde unpkg) + Babel standalone (compila JSX en el cliente).
- CSS plano con design tokens (ver `src/styles.css`).
- Sin proceso de build. Subís la carpeta tal cual.

## Subir a Netlify (3 opciones)

### 1. Drag & drop (la más rápida)
1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrá toda esta carpeta (**no comprimida**, ni el zip — la carpeta abierta).
3. Netlify te da una URL `something-random.netlify.app`.
4. En Site settings → Domain → Change site name, ponele `constructora-norte` (o lo que quieras).

### 2. Git (recomendado si vas a iterar)
```bash
cd C:\Users\juanc\constructora-norte
git init
git add .
git commit -m "initial site"
# crear repo en GitHub (vacío) — copiar la URL HTTPS
git remote add origin https://github.com/<tu-usuario>/constructora-norte.git
git branch -M main
git push -u origin main
```
Después en Netlify: **Add new site → Import from Git → seleccionar el repo**. Build command vacío, publish directory `.`.

### 3. CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

## Estructura

```
constructora-norte/
├── index.html              ← entry point
├── netlify.toml            ← config Netlify (cache, headers)
├── _redirects              ← fallback SPA
├── src/
│   ├── styles.css          ← design tokens
│   ├── common.jsx          ← bloque IMG (URLs Unsplash) + primitivos
│   ├── nav.jsx, hero.jsx, ...
│   └── app.jsx             ← composición
└── reference-finished/     ← NO se sube (excluida si usás .netlifyignore)
    ├── LEEME.md
    ├── 00-REFERENCIA-terreno-baldio.jpg
    ├── 01-torre-libertador-4820-FINALIZADA.jpg
    └── ... (5 fotos obras finalizadas para generar versiones "antes")
```

## Cómo reemplazar las fotos placeholder por reales

Todas las URLs están centralizadas en **`src/common.jsx`** dentro del objeto `IMG`. Reemplazá las URLs de Unsplash por rutas locales:

```js
// antes:
hero: _u("1545324418-cc1a3fa10c00", 1920),
// después:
hero: "/assets/hero-torre-libertador.jpg",
```

Y poné los archivos reales en `assets/`. Cualquier nombre, pero respetá las dimensiones recomendadas (hero 1920px ancho, proyectos 1400px, materiales 1200px, panorama 3000px).

## Wireado de servicios reales

El sitio es 100% estático ahora. Para que sea funcional:

| Sección | Qué hace ahora | Qué falta |
|---|---|---|
| **Contacto** (sección 10) | Setea `done: true` localmente | Hookear a HubSpot / Pipedrive / Formspree / Netlify Forms |
| **Calculadora** (sección 08) | Calcula y muestra | Botón "Reservar" debería abrir el form o WhatsApp |
| **Agendar visita** (Nav CTA) | Scroll a #contacto | Idealmente embed de Calendly |

**Netlify Forms** (más rápido): agregás `netlify` y `name="contact"` al `<form>` de `contact.jsx` y Netlify guarda los submits automáticamente en su dashboard.

## Performance / optimizaciones aplicadas

- React **production builds** (~140KB en vez de ~1MB de development).
- Imágenes con `auto=format&fm=webp` y resoluciones reducidas (hero 1920, proyectos 1400, materiales 1200).
- `loading="lazy"` + `decoding="async"` en todas las imágenes below-the-fold.
- Hero precargado con `<link rel="preload" fetchpriority="high">`.
- Fonts con `display=swap` (no FOIT).
- Panel de Tweaks (dev tool) removido.
- Respeta `prefers-reduced-motion`.

## Pendiente para producción real

1. **Precompilar JSX**: hoy Babel compila en el browser (~300KB y ~200ms blocking). Migrar a Vite o Next.js elimina eso.
2. **Self-host fuentes**: bajar los .woff2 de Instrument Serif / Inter Tight / JetBrains Mono y servir desde `/fonts/` (mejora LCP).
3. **CMS**: `PROJECTS`, `BA_PROJECTS`, `PHASES` están como const en JSX. Para que el cliente los edite solo, mover a Sanity / Payload.
4. **Reemplazar fotos**: las de Unsplash son placeholders. Ver `reference-finished/LEEME.md`.

## Fotos en `reference-finished/`

Son las 5 obras finalizadas que aparecen en el portfolio + 1 foto de referencia de "terreno baldío". El uso es: pasarlas por un generador de imágenes (Midjourney / Flux / DALL·E) con un prompt que produzca la misma vista pero del lote vacío antes de empezar la obra. Esos pares antes/después después se montan en la sección 01.

Detalles e instrucciones por foto: `reference-finished/LEEME.md`.

---

Cualquier duda con el deploy, mirá la docs de Netlify: <https://docs.netlify.com/site-deploys/overview/>
