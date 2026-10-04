# Remotion — "La Estrategia del Enjambre" (réplica del Reel en español)

Réplica en Remotion del Reel de Instagram (`instagram.com/reel/DdwmZBqtSje`), con textos en español y narración real generada con ElevenLabs.

## Audio / voces

`public/narracion.mp3` es la narración final (180.9s), generada con el conector de ElevenLabs:

- **Peter** (fundador): voz "Juan - Friendly & Effortless" (`VvYiNBPylZtUh8Bf6u8l`) — joven, acento latinoamericano genérico (no de un país puntual), cercana y natural.
- **Coach**: voz "Luján" (`GcbypXUfJn5DbptRc2U7`) — descrita explícitamente como "acento neutro latino", cálida, segura, tono medio-grave.
- Modelo: `eleven_multilingual_v2`.
- Iteraciones previas descartadas por pedido del usuario: "carlos" + "OscarLopez - Fresh Paisa" (muy regionales) y "Enzo" + "Manu Arias" (acento de España, no latino).

Se generó en 14 "turnos" (parlamentos continuos de un mismo personaje, no línea por línea) para que la prosodia sonara natural, con 0.3s de silencio entre turnos. `src/data/script.ts` ya tiene los tiempos (`start`/`end`) resincronizados a la duración real de cada clip — ver `remotion/src/data/script.ts`'s encabezado y el script de resync usado (`resync.py`, en el scratchpad de la sesión que lo generó) si necesitas regenerar la narración.

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

## Cómo resincronizar si regrabas el audio

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

`Video.tsx` ya incluye `<Audio src={staticFile("narracion.mp3")} />`. Pasos para resincronizar si reemplazas el audio:

1. Reemplaza `public/narracion.mp3` por tu nuevo archivo (mismo nombre, o actualiza la ruta en `Video.tsx`).
2. Escucha el audio y anota en qué segundo empieza/termina cada línea (Descript, Adobe Audition o incluso Remotion Studio con el audio ya cargado te muestran la forma de onda).
3. Actualiza los `start`/`end` de cada shot y de cada línea dentro de `lines` en `script.ts` con esos tiempos reales. La duración total del video se ajusta sola (`TOTAL_SECONDS` se calcula del último shot).
4. Vuelve a correr `bun run render`.

No hace falta tocar nada de `Shots.tsx` ni `Video.tsx` para resincronizar — solo los números en `script.ts`.

## Si quieres personajes más parecidos al original

Los avatares actuales (`Avatar` en `Primitives.tsx`) son ilustraciones SVG originales y genéricas, a propósito, para no infringir el copyright de Family Guy. Si tienes tus propios personajes (ilustrados, comprados con licencia, o generados por ti) en PNG/SVG, puedo reemplazar el componente `Avatar` para usarlos — solo súbelos a `public/` y dime.
