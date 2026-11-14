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
