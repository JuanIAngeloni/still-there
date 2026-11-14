# Still There

Recorrido 3D (three.js) por el hardware que NASA dejó en la Luna, Marte y el espacio profundo, contado en primera persona por las propias máquinas. Proyecto para NASA Space Apps Córdoba 2026, desafío «Abandoned but not Forgotten».

## Correr

```
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ (sitio estático)
```

## Qué hay

- `src/world.js`: Tierra, Luna y Marte con imágenes de NASA, atmósfera, nubes y estrellas.
- `src/models.js`: modelos 3D de Opportunity, el módulo Eagle y Pioneer 10, y el suelo de Marte y la Luna.
- `src/data.js`: misiones, historias y piezas, en español e inglés, cada dato con su fuente de NASA.
- `src/main.js`: cámara, navegación, línea de tiempo e interfaz.

## Datos y licencias

- Fechas, cifras y coordenadas: NSSDCA Master Catalog y páginas de misión de NASA (enlazadas en la app, sección Fuentes).
- Texturas: NASA Blue Marble y Black Marble, NASA SVS CGI Moon Kit, mosaico Viking MDIM 2.1 de NASA/JPL/USGS (dominio público).
- Las frases en primera persona son recreadas a partir de datos de NASA; no son citas reales.
- Tamaños, distancias y trayectorias están comprimidos o son ilustrativos. Júpiter, Saturno y Venus están dibujados.
- Tipografía: Space Grotesk (SIL OFL). Motor 3D: three.js (MIT).

## Uso de IA

El código, los textos y los modelos 3D se hicieron con ayuda de un asistente de IA (Devin, de Cognition) y fueron revisados por el equipo.

## Real trajectories, official models and sound

- **Trajectories:** `python3 scripts/horizons.py` queries NASA/JPL Horizons once and writes `src/trajectories.json` (heliocentric ecliptic positions, AU) for the 10 spacecraft Horizons has: Pioneer 10, NEAR Shoemaker, Mars Pathfinder, Spirit, Opportunity, Phoenix, Dawn, Kepler, InSight and Mars 2020 (Ingenuity's ride). The site only reads that file. Surveyor 1, Apollo 11/15/17 and Viking 1 are not in Horizons. The flights in the main 3D scene are still illustrative; the real paths are shown in the "Real trajectory" view.
- **Official models:** `public/models/*.glb` come unmodified from [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) (Viking Lander, InSight, Ingenuity, NEAR Shoemaker, Dawn, Kepler). Opportunity, Eagle and Pioneer 10 use simplified models built in code.
- **Sound:** `public/audio/` holds two NASA recordings: Apollo 11 "The Eagle has landed" and the first sound recorded on Mars by Perseverance (2021). Scene narration uses the browser's speech synthesis.
