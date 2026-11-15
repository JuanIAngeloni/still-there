# Uso de inteligencia artificial

Las reglas de NASA Space Apps piden contar cómo usamos IA. Esta es la cuenta completa (versión en inglés: `AI_USE.md`). El sitio repite la versión corta en el botón «Créditos», para que se vea sin abrir el repositorio.

## Herramientas

- **Claude (Anthropic), en Claude Code.** Se usó para la mayor parte del trabajo que se detalla abajo.
- **Devin (Cognition).** Lo usó Juan Ignacio Angeloni, del equipo, en su propia versión del proyecto (github.com/JuanIAngeloni/still-there). De esa versión este sitio toma la selección de fotos de NASA con sus epígrafes, dos audios y la elección de los modelos de Viking 1 e Ingenuity.

Ninguna imagen, video, audio ni modelo 3D del sitio fue generado por IA. Las fotos, los audios, los videos, los mapas y los modelos 3D oficiales son de NASA. Los modelos que no son de NASA están escritos como código (ver abajo).

## Qué hizo la IA

- **Código.** Escribió la mayor parte del código del sitio (la Tierra, la portada, el lanzamiento en 3D, el viaje por el espacio, las superficies, el modo de exploración) y las herramientas de `tools/`, siguiendo las decisiones de diseño del equipo. Cada versión se probó en el navegador.
- **Búsqueda y verificación de datos.** Buscó y comparó fuentes oficiales (NSSDCA, NASA Science, JPL, LROC, HiRISE, informes de prensa y de vuelo) para fechas, coordenadas, distancias, últimos contactos, secuencias de lanzamiento y el destino de cada etapa de los cohetes. Una pasada buscó y otra, independiente, intentó refutar cada dato. Cada dato tiene su enlace en `FUENTES.md` o al lado, en el sitio. Las diferencias entre fuentes y lo que no se pudo confirmar están anotados en `docs/etapas/*.md` y `docs/verificacion_ciencia.md`.
- **Trayectorias.** Escribió el script que baja las tablas de JPL Horizons. Las trayectorias que se ven son las de Horizons, no inventadas, salvo las que dicen «reconstruida».
- **Textos.** Redactó los textos para chicos en español e inglés a partir de esos datos, incluidas las preguntas, las tarjetas de «qué aprendimos» y las frases en primera persona de la portada. Esas frases no son citas reales; el sitio lo dice.
- **Modelos escritos como código.** Los modelos simplificados de Surveyor 1, Phoenix, Mars Pathfinder y Sojourner, la cápsula de crucero a Marte, los experimentos de Apollo 11 y los cohetes Saturn V, Titan IIIE-Centaur y Atlas-Centaur los programó la IA a partir de medidas publicadas. No son modelos de NASA y no llevan emblemas de NASA.
- **Adaptación de modelos de NASA.** Escribió el código que separa en piezas los modelos de NASA del Delta II y del Atlas V, repite el propulsor del Delta II hasta llegar a nueve, le quita un propulsor al Atlas V 551, tapa los emblemas pintados en los tres cohetes y apoya en el suelo los instrumentos de InSight. Cada cambio está en `FUENTES.md`.

## Qué hizo el equipo

- La idea, el concepto, la elección de las catorce máquinas y todas las decisiones de diseño.
- Revisar cada versión, descartar lo que no funcionaba y pedir cambios: el zoom continuo, el sistema solar como primera vista, los videos reales de lanzamiento, la portada, el lanzamiento en 3D con el destino de cada etapa y la exigencia de cohetes y naves realistas.
- Elegir las fotos de NASA, los epígrafes y los audios (Juan Ignacio Angeloni).
- Aprobar cada descarga de material de NASA y revisar el resultado en pantalla.
