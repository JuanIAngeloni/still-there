# Still There

**Las máquinas que NASA dejó en la Luna, en Marte y en el espacio profundo cuentan su propia historia.**

Still There es una experiencia web 3D hecha con three.js para **NASA Space Apps Challenge 2026**, desafío [«Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars»](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/).

Está pensada para chicos de 12 a 17 años y para cualquier curioso del espacio. Disponible en español e inglés.

## La idea

Cada misión deja algo atrás: un rover sin energía, la mitad de un módulo lunar, una sonda que ya no responde. Nadie va a ir a buscar esas máquinas, pero siguen ahí.

Still There muestra el recorrido completo de ese hardware:

1. **Sale de la Tierra:** el despegue con el cohete de cada misión.
2. **Viaja y llega:** a la Luna, a Marte o más allá.
3. **Trabaja:** qué descubrió y con qué piezas.
4. **Se apaga:** cuándo y por qué quedó fuera de servicio.
5. **Sigue ahí:** dónde está hoy.

En vez de una ficha técnica, la máquina habla en primera persona. Esa voz está escrita para la app a partir de datos de NASA; no son citas reales (ver [Qué es real y qué no](#qué-es-real-y-qué-no)).

## Funcionalidades

### Inicio
Presentación del proyecto y acceso a las tres historias, a la línea de tiempo y al visor de piezas.

### Historias
Tres relatos de cinco escenas cada uno, para **Opportunity**, **Eagle (Apollo 11)** y **Pioneer 10**:

1. Por qué me mandaron
2. Cómo llegué
3. Qué descubrí
4. Cómo terminé
5. Dónde estoy hoy

- La escena del viaje muestra el despegue completo: plataforma, encendido, llama y humo, ascenso, separación de etapa, viaje y llegada. El panel indica la fase en curso.
- Cada dato lleva el enlace a su fuente de NASA.
- Botón «Escuchar esta escena» y narración automática opcional.
- Al terminar, un quiz de tres preguntas.

### Explorar (línea de tiempo)
- Línea de tiempo de 1965 a 2026 con los 15 despegues, con reproducción y control manual.
- **Historial de eventos:** se va armando mientras avanza el tiempo, con cada despegue, llegada y última señal (41 eventos). Cada renglón abre la ficha de la máquina.
- **Fuera de servicio:** cuando el tiempo pasa la fecha de la última señal, la máquina aparece tachada y en gris en el listado, con el año, y su luz en el planeta se apaga.
- **Modo «Seguir»:** la cámara se engancha a la nave que despega y la acompaña hasta que llega; después pasa sola a la siguiente.

### Destinos
La Luna, Marte y el espacio profundo. Cada máquina está ubicada en las coordenadas de su sitio de aterrizaje. Al pasar el mouse por una luz aparece su nombre y año; con clic se abre su ficha.

### Máquinas
- **Visor 3D con piezas** para Opportunity, Eagle y Pioneer 10: cinco piezas por máquina. Al pasar el mouse la pieza se ilumina y muestra su nombre; con clic explica qué es y qué permitió descubrir.
- **Modelos oficiales de NASA** para Viking 1, InSight, Ingenuity, NEAR Shoemaker, Dawn y Kepler (se pueden girar y acercar; no tienen piezas seleccionables).
- **Catálogo «Todas las máquinas»** con las 15 fichas: tipo, fechas, cohete, lugar, estado y fuente.
- **«A escala»:** comparaciones de tamaño con cosas conocidas, solo las que tienen respaldo en una página de NASA.

### Trayectoria real
Vista 3D del sistema solar a escala con el camino real de la nave y los planetas en sus posiciones reales fecha por fecha, a partir de datos de **NASA/JPL Horizons**. Disponible para 10 de las 15 máquinas.

### Fotos
38 imágenes de la [NASA Image and Video Library](https://images.nasa.gov/), entre 2 y 4 por máquina, con epígrafe, crédito y enlace a la ficha original. 35 son fotos y 3 son ilustraciones oficiales, marcadas como tales (Pioneer 10, Dawn y Kepler).

### Pasaporte
- Un sello por cada máquina visitada y por cada historia terminada.
- Puntaje de cada quiz.
- El progreso se guarda en el navegador (`localStorage`), sin cuentas ni servidor.

### Sonido y accesibilidad
- Dos grabaciones de NASA: «The Eagle has landed» (Apollo 11) y el primer sonido grabado en Marte por Perseverance (2021).
- Narración opcional con la voz del navegador; el texto siempre queda en pantalla.
- Español e inglés (botón ES · EN).
- «Modo liviano» para equipos modestos: sin posprocesado y con menos partículas.
- Respeta la preferencia del sistema de reducir movimiento.

### Fuentes
Sección con todas las fuentes, qué es real y qué es recreado, y el uso de IA.

## Las 15 máquinas

| Máquina | Destino | Despegue | Cohete | Fuera de servicio |
|---|---|---|---|---|
| Surveyor 1 | Luna · Oceanus Procellarum | 1966 | Atlas-Centaur | sin fecha cargada |
| Eagle · Apollo 11 | Luna · Mar de la Tranquilidad | 1969 | Saturn V | 1969 |
| Falcon y rover lunar · Apollo 15 | Luna · Hadley-Apeninos | 1971 | Saturn V | sin fecha cargada |
| Challenger · Apollo 17 | Luna · Taurus-Littrow | 1972 | Saturn V | sin fecha cargada |
| Pioneer 10 | Espacio profundo | 1972 | Atlas-Centaur | 2003 |
| Viking 1 | Marte · Chryse Planitia | 1975 | Titan IIIE-Centaur | 1982 |
| NEAR Shoemaker | Asteroide Eros | 1996 | Delta II | 2001 |
| Mars Pathfinder y Sojourner | Marte · Ares Vallis | 1996 | Delta II | 1997 |
| Spirit | Marte · cráter Gusev | 2003 | Delta II | 2010 |
| Opportunity | Marte · Meridiani Planum | 2003 | Delta II | 2018 |
| Phoenix | Marte · llanura polar norte | 2007 | Delta II | 2008 |
| Dawn | Órbita de Ceres | 2007 | Delta II | 2018 |
| Kepler | Órbita alrededor del Sol | 2009 | Delta II | 2018 |
| InSight | Marte · Elysium Planitia | 2018 | Atlas V | 2022 |
| Ingenuity | Marte · cráter Jezero | 2020 | Atlas V | 2024 |

## Qué es real y qué no

**Real, con fuente de NASA**
- Fechas, cifras y coordenadas de aterrizaje (NSSDCA Master Catalog y páginas de misión).
- Fotos, audios y los seis modelos 3D oficiales.
- Las trayectorias de la vista «Trayectoria real» (JPL Horizons).
- Imágenes de la Tierra, la Luna y Marte.

**Recreado**
- La voz en primera persona de las máquinas. La única cita real es la de Armstrong al alunizar.

**Ilustrativo**
- En la escena principal, tamaños, distancias y vuelos están comprimidos para que entren en pantalla.
- Júpiter, Saturno y Venus están dibujados.
- Los modelos de Opportunity, Eagle y Pioneer 10 y los seis cohetes están armados por código y son simplificados; las medidas de los cohetes son aproximadas.

## Límites conocidos

- Horizons no tiene datos de Surveyor 1, Apollo 11, 15 y 17 ni Viking 1. De Pathfinder faltan los dos primeros meses del viaje.
- Surveyor 1, Apollo 15, Apollo 17, Pathfinder/Sojourner, Spirit y Phoenix solo tienen ficha y fotos, sin modelo 3D.
- Surveyor 1, Apollo 15 y Apollo 17 no cambian a «fuera de servicio» porque no hay una fecha de fin cargada.
- No hay fotos de los lanzamientos todavía.
- Desarrollado y probado en una máquina sin placa de video: el rendimiento en equipos reales y en celular no está medido. La narración por voz depende de las voces instaladas en cada navegador.

## Cómo correrlo

Requiere Node.js 18 o superior.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ (sitio estático)
npm run preview  # sirve dist/ en http://localhost:4173
```

Es un sitio estático, sin servidor ni llamadas a APIs externas: `dist/` se puede publicar en cualquier hosting estático.

Para regenerar las trayectorias (opcional, necesita internet):

```
python3 scripts/horizons.py   # consulta JPL Horizons y escribe src/trajectories.json
```

## Cómo está hecha

- **Vite + three.js** en JavaScript, con navegación por hash y sin framework.
- **postprocessing:** bloom, viñeta y ajuste de color ACES. Apagado en modo liviano.
- **three.quarks:** llama, estela de humo y nube de la plataforma. Fijada en 0.16 porque la 0.17 pide three 0.182 o superior.
- **gsap:** vuelo de cámara entre el espacio y una máquina, avisos, sellos y puntaje del quiz.
- **lottie-web:** animación del sello ganado; se descarga recién al ganar el primero.
- **tweakpane (solo desarrollo):** panel de ajustes en `http://localhost:5173/?debug`.

| Archivo | Contenido |
|---|---|
| `src/main.js` | Cámara, navegación, línea de tiempo, modo «Seguir», pasaporte e interfaz |
| `src/world.js` | Tierra, Luna y Marte, atmósfera, nubes y estrellas |
| `src/models.js` | Modelos de Opportunity, Eagle y Pioneer 10, suelos de Marte y la Luna |
| `src/rockets.js` | Seis cohetes: Saturn V, Atlas-Centaur, Titan IIIE, Delta II y dos Atlas V |
| `src/fx.js` | Posprocesado, partículas de los cohetes y animación del sello |
| `src/helio.js` | Vista del sistema solar con las trayectorias reales |
| `src/data.js` | Misiones, historias, piezas, quiz, comparaciones de escala y fuentes (ES/EN) |
| `src/images.js` | Fotos de NASA con epígrafe y crédito |
| `src/trajectories.json` | Posiciones precalculadas de JPL Horizons |
| `scripts/horizons.py` | Genera `src/trajectories.json` |
| `public/` | Texturas, fotos, audios, modelos glTF y decodificador Draco |

## Datos y créditos

- **Catálogo y datos de misión:** [NSSDCA Master Catalog](https://nssdc.gsfc.nasa.gov/nmc/) y páginas de misión de NASA, enlazadas dato por dato en la app.
- **Fotos:** [NASA Image and Video Library](https://images.nasa.gov/). Dos imágenes de Pioneer 10 llevan además crédito a TRW.
- **Modelos 3D:** [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources), sin modificar.
- **Trayectorias:** [NASA/JPL Horizons](https://ssd.jpl.nasa.gov/horizons/), posiciones heliocéntricas eclípticas J2000.
- **Sonido:** [NASA Audio and Ringtones](https://www.nasa.gov/audio-and-ringtones/) (Apollo 11) y [First Audio Recording of Sounds on Mars](https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/) (NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro).
- **Tierra:** NASA Blue Marble y Black Marble. **Luna:** NASA SVS CGI Moon Kit (LRO). **Marte:** mosaico Viking MDIM 2.1, NASA/JPL/USGS.
- **Tipografía:** Space Grotesk (SIL OFL).

NASA no patrocina ni avala este proyecto.

## Uso de IA

El código, los textos y los modelos 3D armados por código se hicieron con ayuda de un asistente de IA (Devin, de Cognition). Los datos se tomaron de las páginas de NASA enlazadas en la app.
