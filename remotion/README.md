# Remotion — "La Estrategia del Enjambre" (réplica del Reel en español)

Réplica en Remotion del Reel de Instagram (`instagram.com/reel/DdwmZBqtSje`), con textos en español, lista para sincronizar con narración real.

## Qué es esto

El video original usa personajes de **Family Guy** (con copyright de Fox), que no se pueden reproducir. Este proyecto recrea el **mismo sistema visual** (tarjetas tipo mockup de UI, subtítulos estilo karaoke, fondos de color por sección, dos personajes a los lados) con:

- Dos avatares **originales** (ilustración flat-design propia) en vez de los personajes con copyright.
- Las mismas ~28 "tarjetas" (checklist, scorecard, comparación, calendario semanal, formulario, etc.) que aparecen en el video original, con el contenido traducido/adaptado al español.
- Subtítulos con resaltado progresivo palabra por palabra (estilo karaoke), igual que el original.

## Estructura

```
remotion/
  src/
    data/script.ts        ← guion completo: 28 "shots", cada uno con sus líneas de texto y tiempos
    components/
      Primitives.tsx       ← Card, Pill, StatBox, Avatar (personajes), TopLabel
      Captions.tsx          ← subtítulos karaoke
      Shots.tsx              ← las 28 tarjetas/escenas visuales
    Video.tsx               ← arma la línea de tiempo completa a partir de script.ts
    Root.tsx                ← composición Remotion (1080x1920, 30fps)
GUION-NARRACION-ES.md      ← guion listo para pegar en tu herramienta de audio (ElevenLabs, etc.)
```

## Cómo correrlo

```bash
cd remotion
bun install
bun run dev      # abre el Remotion Studio (preview interactivo, arrastra el playhead)
bun run render   # renderiza out/video.mp4
```

> Nota: en este contenedor se usó un Chromium headless preinstalado (`/opt/pw-browsers/...`), configurado en `remotion.config.ts`. En tu máquina local probablemente no necesites esa línea — Remotion descarga su propio Chrome automáticamente.

## Cómo sincronizar con tu audio real

Todo el timing vive en **`src/data/script.ts`**. Cada "shot" tiene:

```ts
{
  id: 1,
  start: 0.0,       // segundo en que empieza esta tarjeta
  end: 3.9,          // segundo en que termina
  bg: BG.cream,
  topLabel: "...",
  visual: "TestLog", // qué componente de Shots.tsx se muestra
  lines: [
    { text: "...", start: 0.0, end: 3.9, speaker: "peter" },
  ],
}
```

Pasos para resincronizar cuando tengas la narración real:

1. Sube tu archivo de audio a `public/narracion.mp3` (crea la carpeta `public/` si no existe).
2. Agrega `<Audio src={staticFile("narracion.mp3")} />` dentro de `SwarmVideo` en `Video.tsx` (import `Audio` y `staticFile` de `remotion`).
3. Escucha el audio y anota en qué segundo empieza/termina cada línea (Descript, Adobe Audition o incluso Remotion Studio con el audio ya cargado te muestran la forma de onda).
4. Actualiza los `start`/`end` de cada shot y de cada línea dentro de `lines` en `script.ts` con esos tiempos reales. La duración total del video se ajusta sola (`TOTAL_SECONDS` se calcula del último shot).
5. Vuelve a correr `bun run render`.

No hace falta tocar nada de `Shots.tsx` ni `Video.tsx` para resincronizar — solo los números en `script.ts`.

## Si quieres personajes más parecidos al original

Los avatares actuales (`Avatar` en `Primitives.tsx`) son ilustraciones SVG originales y genéricas, a propósito, para no infringir el copyright de Family Guy. Si tienes tus propios personajes (ilustrados, comprados con licencia, o generados por ti) en PNG/SVG, puedo reemplazar el componente `Avatar` para usarlos — solo súbelos a `public/` y dime.
