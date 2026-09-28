# Ad Set Reel — recreación en Remotion

Recreación en español de un reel de Instagram (@nathan.perdriau) sobre cuántos
anuncios poner por ad set en Meta Ads. Reproduce la estructura visual del
original: 6 escenas de motion graphics kinético (cubo isométrico, barras,
línea numérica, cuenta regresiva y declaración final).

## Uso

```bash
cd remotion
npm install
npm run dev       # abre Remotion Studio para previsualizar/editar
npm run render     # exporta out/ad-set-reel-es.mp4 (1080x1920, 30fps, ~38.4s)
```

## Estructura

- `src/script.ts` — todas las líneas de texto en español y su timing en
  frames (relativo al inicio de cada escena). **Este es el archivo a editar**
  cuando llegue el audio real.
- `src/scenes/Scene1Cube.tsx` … `Scene6Statement.tsx` — una escena por acto.
- `src/Video.tsx` — ensambla las escenas en orden con `<Series>`.
- `src/theme.ts` — paleta de colores extraída del video original.
- `src/fonts.ts` — tipografías autohospedadas (Inter Bold/ExtraBold para
  titulares, Caveat para el acento tipo marcador). Se descargaron como
  `.woff2` a `public/fonts/` para no depender de Google Fonts en tiempo de
  render (el navegador headless de Remotion no confía en el proxy saliente
  de este entorno).

## Cuando tengas el audio de narración en español

1. Copia el archivo a `public/voiceover-es.mp3` (o `.wav`).
2. En `src/Video.tsx`, agrega `<Audio src={staticFile("voiceover-es.mp3")} />`
   dentro de `<AdSetReel>`.
3. Ajusta `SCENE_DURATIONS` en `src/script.ts` y el `startFrame`/
   `durationInFrames` de cada línea en `cubeLines`, `underFiveLines`, etc.,
   para que coincidan con los tiempos reales de tu narración (usa Remotion
   Studio con scrubbing para verificar cuadro a cuadro).
4. Vuelve a renderizar con `npm run render`.

## Notas de fidelidad

Reconstruido a partir de los frames y el audio del reel original (no hay
acceso a los archivos fuente del creador), así que las animaciones son una
recreación fiel del estilo — cubo wireframe isométrico con "ADS" en la cara
superior, barras de progreso, texto en revelado "karaoke" (palabra oscura ya
dicha / palabra gris clara por venir), línea numérica con marcador que
cuenta, y anillo de cuenta regresiva en pantalla oscura — no un clon pixel a
pixel.
