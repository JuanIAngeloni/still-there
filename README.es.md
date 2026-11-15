# Siguen ahí

NASA Space Apps Challenge 2026, Salta. Desafío: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*.

**Siguen ahí: las misiones de NASA a través del tiempo.** Catorce máquinas que NASA dejó en la Luna, en Marte y más lejos, cada una contada como una misión que se recorre en 3D. Las catorce muestran el despegue y dónde está la máquina hoy; diez muestran también el viaje y la llegada.

**Sitio:** https://ginomoretta-creator.github.io/siguen-ahi/ (copia: https://claude.ai/artifact/KrPXM6Gs7519FPneE5Ftce).

Versión en inglés: [README.md](README.md).

## Qué se puede hacer

- **Portada.** Catorce tarjetas con una foto real de NASA y una frase en la voz de la máquina, y una línea de tiempo donde cada fila es una vida: el viaje, los años de trabajo y el silencio.
- **Lanzamiento en 3D.** Cada misión arranca en su plataforma con su cohete. Cada paso espera al lector: despegue, separación de propulsores, etapas, cofia, impulso final, separación de la nave. Se puede girar y acercar en cualquier momento. Un panel cuenta **qué pasó con cada parte descartada**: cuáles cayeron al mar, cuáles se quemaron, cuáles siguen en órbita del Sol, cuáles chocaron contra la Luna o Marte. Cada dato tiene su enlace a la fuente.
- **Viaje.** La nave sigue su trayectoria real (vectores de JPL Horizons) por un sistema solar a escala real.
- **Llegada y hoy.** Antes de mostrar la máquina, el sitio hace una pregunta sobre lo que descubrió. Después se pueden tocar sus piezas sobre el modelo, ver fotos reales de NASA, escuchar audio real, ver el video real del lanzamiento y leer qué más dejó la misión (etapa de crucero, escudo térmico, paracaídas).
- **Explorar.** Un solo espacio continuo, desde el sistema solar entero hasta el suelo junto a cada máquina, con todas en su lugar de hoy.
- **Datos de ahora.** A qué distancia está cada máquina en este momento y cuánto tarda en llegarle una señal de radio.

Español e inglés. El idioma se elige según el navegador; con `?lang=en` o `?lang=es` en la dirección se fuerza uno.

## Qué tan real es

- **Cohetes.** El Delta II y el Atlas V son los modelos 3D de NASA (NASA VTAD), que ya vienen separados por etapa, con la cofia en dos mitades y los propulsores sueltos. El Saturn V, el Titan IIIE-Centaur y el Atlas-Centaur no tienen un modelo oficial separable por etapas: están armados en código con medidas reales.
- **Naves.** Modelos 3D de NASA para Spirit y Opportunity, InSight, Viking 1, Ingenuity, el módulo lunar de Apollo, Pioneer 10 y 11, NEAR Shoemaker, Dawn y Kepler. Surveyor 1, Phoenix y Mars Pathfinder con Sojourner son modelos simplificados armados en código.
- **Tiempos y destinos.** Los tiempos T+ y el destino de cada etapa salen de informes de prensa y de vuelo de NASA y de los fabricantes. Donde no encontramos el tiempo real de un paso, el reloj no se muestra.
- **Qué falta.** Apollo 11, Viking 1, InSight e Ingenuity muestran el despegue y la máquina hoy, sin el viaje en el medio.
- **Qué es ilustrativo.** La curva de subida del lanzamiento, la entrada en Marte y los descensos son animaciones, no telemetría. El sitio lo dice en pantalla.

## Cómo se arma

Necesita Python 3 (sin paquetes extra).

```bash
python -I tools/build.py
python -I tools/devserver.py
```

Después abrir `http://localhost:5188/dist/preview.html`.

## Licencia y fuentes

Código bajo Apache 2.0 (`LICENSE`). Fuentes de datos, mapas y modelos en `FUENTES.md` (inglés: `SOURCES.md`). Uso de IA en `USO_DE_IA.md` (inglés: `AI_USE.md`).

Proyecto hecho en la hackatón NASA Space Apps. NASA no lo patrocina ni lo avala.
