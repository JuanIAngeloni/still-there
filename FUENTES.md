# Fuentes

Todo lo que usa el proyecto y no escribimos nosotros, con su origen. Datos verificados el 13 y 14 de noviembre de 2026.

## Mapas e imágenes

| Archivo | Qué es | Origen | Uso |
|---|---|---|---|
| `assets/textures/earth_day_2048.jpg` | Tierra de día (Blue Marble, diciembre de 2004) | NASA Earth Observatory, `assets.science.nasa.gov/.../world.topo.bathy.200412.3x5400x2700.jpg` | Imagen de NASA, uso libre con crédito |
| `assets/textures/earth_night_2048.jpg` | Luces nocturnas de la Tierra | Ejemplo de `three-globe` 2.31.0 (unpkg), basado en NASA Black Marble | MIT (three-globe); imagen de NASA |
| `assets/textures/mars.jpg` | Mapa de Marte | NASA 3D Resources, `github.com/nasa/NASA-3D-Resources` (Images and Textures/Mars) | NASA, uso libre con crédito |
| `assets/textures/jupiter.jpg` | Mapa de Júpiter | NASA 3D Resources (Images and Textures/Jupiter) | NASA |
| `assets/textures/stars_hipparcos.jpg` | Mapa de estrellas Hipparcos | NASA 3D Resources (Images and Textures/Hipparcos Star Map) | NASA |
| `assets/textures/moon_lroc_color_2k.jpg` | Color de la Luna (LRO) | NASA Scientific Visualization Studio, CGI Moon Kit, `svs.gsfc.nasa.gov/4720` | NASA SVS, uso libre con crédito |
| `assets/textures/moon_ldem_3_8bit.jpg` | Relieve de la Luna (LOLA) | NASA SVS, CGI Moon Kit | NASA SVS |

## Modelos 3D

De NASA 3D Resources (`github.com/nasa/NASA-3D-Resources`, carpeta 3D Models): Pioneer 10, NEAR Shoemaker, Dawn, Kepler (A), Módulo Lunar Apollo, Viking Lander, Ingenuity e InSight (archivo «InSight Cruise Lander», configuración desplegada). Venían comprimidos con Draco; `tools/decode.html` los descomprime y `tools/build.py` los pasa a glTF `.json`.

De science.nasa.gov (recursos 3D de NASA, uso libre con crédito según las pautas de uso de imágenes y medios de NASA), bajados el 15 nov 2026. `tools/pack_model.py` les achica las texturas y no toca la geometría:

| Archivo del sitio | Modelo | Origen | Crédito | Cambios nuestros |
|---|---|---|---|---|
| `mer_hd` | Mars Exploration Rover (Spirit y Opportunity) | `science.nasa.gov/resource/mars-exploration-rovers-3d-model/` (`MER_static.glb`) | NASA/JPL-Caltech | Texturas a JPEG de 1024 px. A Opportunity se le suma un tono de polvo. |
| `delta2c` | Cohete Delta II | `science.nasa.gov/resource/delta-ii-3d-model/` (`Delta_II.glb`) | NASA VTAD | El modelo trae 3 propulsores y cofia de 10 pies. Repetimos el propulsor hasta 9 (6 que se encienden en tierra y 3 en vuelo), los agrandamos para el 7925H y agregamos una tercera etapa Star 48B hecha a mano (`src/js/63-nasa-rockets.js`). |
| `atlas401c` | Cohete Atlas V 401 | `science.nasa.gov/resource/atlas-v-401-3d-model/` (`Atlas_V_401.glb`) | NASA VTAD | Sin cambios de forma. |
| `atlas551c` | Cohete Atlas V 551 | `science.nasa.gov/resource/atlas-v-501-3d-model/` (`Atlas_V_551.glb`) | NASA VTAD | NASA no publica el 541: usamos el 551 y le quitamos un propulsor. |

Emblemas: los tres modelos traían pintados la insignia de NASA, la bandera, logos de empresas y el parche de una misión concreta (OCO-2 en el Delta II, MAVEN en el Atlas V 401, Juno en el 551). El sitio usa esos cohetes para otras misiones y Space Apps pide no usar la insignia de NASA ni logos de misiones, así que `tools/clean_decals.py` los tapa en la textura con el color del propio cohete. La forma no cambia.

InSight: en el modelo de NASA el sismómetro, su cúpula y la sonda de calor vienen sobre la cubierta; el sitio los apoya en el suelo, delante del módulo, que es como quedaron trabajando (`insightDeploy` en `src/js/48-extra.js`). Las distancias son aproximadas.

Los cohetes Saturn V, Titan IIIE-Centaur y Atlas-Centaur no tienen un modelo oficial separable por etapas: están programados con ayuda de IA (`src/js/62-rockets.js`), con las medidas y las fuentes anotadas al principio de ese archivo. No llevan emblemas ni letras.

## Lanzamientos y destino de cada etapa

Los pasos de cada lanzamiento, los tiempos T+ y qué pasó con cada parte del cohete y con el resto del equipo descartado están en `src/js/66-stages-data.js`, que se genera con `tools/merge_stages.py` a partir de `docs/etapas/*.json`. Cada dato lleva su enlace en el campo `src` y en el sitio aparece como «Fuente». El detalle de la búsqueda y de la verificación, con lo que no se pudo confirmar, está en `docs/etapas/*.md` (en inglés). Donde no encontramos el tiempo real de un paso, el sitio no muestra el reloj T+. La curva de subida (altura e inclinación) es ilustrativa, no la telemetría del vuelo.

Surveyor, Phoenix, Mars Pathfinder con Sojourner, la cápsula de entrada con su etapa de crucero, el orbitador de Viking con su cápsula (como viajó hasta Marte), el paracaídas y los airbags son modelos simplificados, programados con ayuda de IA (Claude) a partir de piezas simples (`src/js/30-surface.js`), con medidas aproximadas. No son modelos de NASA.

## Trayectorias

JPL Horizons (`ssd.jpl.nasa.gov/api/horizons.api`), vectores de posición y velocidad en la eclíptica J2000, bajados con `tools/horizons.py`:

- Naves: Mars Pathfinder (-530), Spirit (-254), Opportunity (-253), Phoenix (-84), NEAR Shoemaker (-93), Dawn (-203), Pioneer 10 (-23), Pioneer 11 (-24), Kepler (-227).
- Cuerpos: Tierra, Luna, Marte, Júpiter, Saturno, Eros, Vesta y Ceres.
- Horizons advierte que las trayectorias de las Pioneer sirven "para fines históricos generales"; sus posiciones de 2026 son una extrapolación de Horizons.
- «Ahora mismo» (`src/js/55-live.js`): distancias, velocidad de alejamiento, tiempo de la señal y si es de día o de noche en cada lugar, calculados para el segundo actual con las mismas tablas (13 de noviembre de 2026 a 1 de marzo de 2027) y el reloj de la computadora. Pasado ese rango se usa el último dato y se avisa en pantalla.
- Explorar (`src/js/60-explore.js`): posiciones de hoy, 13 de noviembre de 2026 a 1 de marzo de 2027, para la Tierra, la Luna, Marte, Júpiter, Saturno, Eros, Ceres, Vesta, Kepler y las dos Pioneer (`now_*` en `tools/horizons.py`). Dawn se dibuja cerca de Ceres, a 1.500 km, porque su órbita de hoy no está calculada; NEAR, sobre Eros en un punto aproximado.
- Surveyor 1 no está en Horizons: su trayectoria es una elipse reconstruida (`lunarConic` en `src/js/10-astro.js`) que sale a 185 km de altura y llega al lugar real del alunizaje a la hora real. Se indica en pantalla.
- La entrada en Marte (de 125 km al suelo) y los descensos son animaciones aproximadas, no datos.
- Orientación de Marte y Júpiter: modelo de rotación de la IAU (Archinal et al.).

## Datos de cada misión

Lanzamientos, cohetes y plataformas: ver `FUENTES_misiones.md`.

| Dato | Valor | Fuente |
|---|---|---|
| Surveyor 1, alunizaje | 2 jun 1966 06:17:36 UT; 2,4745° S, 43,3398° O; 11.240 imágenes | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A |
| Surveyor 1, foto de LRO | 2009 | https://lroc.im-ldi.com/posts/13 |
| Mars Pathfinder, aterrizaje | 4 jul 1997 16:56:55 UT; 19,17° N, 33,21° O (marco USGS) | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A , https://science.nasa.gov/photojournal/mars-pathfinder-landing-site/ |
| Sojourner | unos 100 m (330 ft), nunca a más de 12 m (39 ft) del módulo | https://www.nasa.gov/history/25-years-ago-mars-pathfinder-launches-to-mars-to-deploy-sojourner-the-first-planetary-rover/ |
| Pathfinder visto por HiRISE | 21 dic 2006 | https://www.jpl.nasa.gov/news/new-nasa-orbiter-sees-details-of-1997-pathfinder-site/ |
| Spirit | 14,5692° S, 175,4729° E; 7,73 km; encajado el 1 may 2009; última transmisión 22 mar 2010 | https://science.nasa.gov/mission/mer-spirit/ , https://www.jpl.nasa.gov/news/nasa-concludes-attempts-to-contact-mars-rover-spirit/ |
| Opportunity | 1,9483° S, 354,47417° E; 45,16 km; última comunicación 10 jun 2018 | https://science.nasa.gov/mission/mer-opportunity/ , https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/ |
| Phoenix | 68,22° N, 125,75° O; última señal 2 nov 2008; panel caído en la foto de 2010 | https://science.nasa.gov/mission/phoenix/ , https://www.jpl.nasa.gov/news/phoenix-mars-lander-is-silent-new-image-shows-damage/ |
| NEAR Shoemaker | se posó en Eros el 12 feb 2001; Eros 34,4 × 11,2 × 11,2 km | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A , https://arcnav.psi.edu/urn:nasa:pds:context:target:asteroid.433_eros |
| Dawn | Vesta 2011-2012; Ceres desde el 6 mar 2015; sin combustible el 31 oct 2018; órbita de al menos 20 años | https://www.nasa.gov/news-release/nasas-dawn-mission-to-asteroid-belt-comes-to-end/ |
| Pioneer 10 y 11 | 142,2 y 118,2 UA del Sol el 14 nov 2026 (JPL Horizons); Pioneer 10 hacia Aldebarán | https://science.nasa.gov/mission/pioneer-10/ , https://science.nasa.gov/mission/pioneer-11/ |
| Kepler | últimas órdenes 15 nov 2018, a 94 millones de millas (151 millones de km) de la Tierra | https://www.jpl.nasa.gov/news/kepler-telescope-bids-goodnight-with-final-commands/ |
| Apollo 11 | 0,67416° N, 23,47314° E; el retrorreflector láser se sigue usando | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C , https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html |

Diferencias entre fuentes que encontramos: la posición de Pathfinder (NSSDCA da 19,33° N, 33,55° O; usamos la del marco USGS, que coincide con la foto de HiRISE); la hora de Phoenix (23:38:38 UT en la nave, 23:53:44 UT al llegar la señal a la Tierra); el fin de Surveyor 1 (13 jul 1966 fin de misión, 7 ene 1967 último contacto).

## Preguntas, descubrimientos y piezas (`src/js/45-learn-data.js`)

Verificados el 15 de noviembre de 2026. Las notas completas, con las diferencias entre fuentes, están en `docs/verificacion_ciencia.md`.

| Misión | Qué se usa | Fuentes |
|---|---|---|
| Surveyor 1 | Las patas se hundieron unos pocos centímetros (JPL: unos 5 cm; NASA 2001: menos de una pulgada); el suelo podía sostener al módulo de Apolo; cámara de 11.240 fotos; panel de 792 celdas y antena plana | https://www.jpl.nasa.gov/news/fifty-years-of-moon-dust-surveyor-1-was-a-pathfinder-for-apollo/ , https://ntrs.nasa.gov/citations/19670024848 , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A , https://science.nasa.gov/mission/surveyor-1/ |
| Mars Pathfinder | Piedritas redondeadas que sugieren agua que corría; APXS de Sojourner, más de 15 análisis, rocas con mucha sílice; cámara IMP, más de 16.500 fotos; pétalos solares | https://mars.nasa.gov/internal_resources/815/ , https://mars.nasa.gov/internal_resources/816/ , https://science.nasa.gov/resource/sojourners-apxs-wedge/ |
| Spirit | La rueda delantera derecha rota dejó a la vista suelo con un 90 % de sílice (anunciado el 21 may 2007): aguas termales o vapor volcánico con agua | https://www.jpl.nasa.gov/news/mars-rover-spirit-unearths-surprise-evidence-of-wetter-past/ , https://science.nasa.gov/resource/rovers-wheel-churns-up-bright-martian-soil/ , https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments/ |
| Opportunity | Los «arándanos»: las tres ideas de 2004 y la hematita depositada en agua; la veta de yeso «Homestake» (7 dic 2011) | https://www.jpl.nasa.gov/news/opportunity-rover-finds-strong-evidence-meridiani-planum-was-wet/ , https://science.nasa.gov/photojournal/discovery-served-up-in-a-bowl/ , https://www.jpl.nasa.gov/news/nasa-mars-rover-finds-mineral-vein-deposited-by-water/ |
| Phoenix | Trozos blancos que desaparecieron entre el sol 20 y el 24: hielo; perclorato y suelo no ácido; «Tenemos agua» (31 jul 2008); brazo de 2,35 m, cámaras a unos 2 m, mástil del clima | https://www.jpl.nasa.gov/news/bright-chunks-at-phoenix-landers-mars-site-must-have-been-ice/ , https://www.jpl.nasa.gov/news/nasa-phoenix-results-point-to-martian-climate-cycles/ , https://nssdc.gsfc.nasa.gov/planetary/text/phoenix_pr_20080731.txt , https://www.jpl.nasa.gov/news/press_kits/phoenix-landing.pdf |
| Pioneer 10 | Radiación de Júpiter: órdenes falsas, fotos de Ío perdidas, datos usados para Voyager y Galileo; la anomalía de las Pioneer explicada por el calor (JPL, 2012); antena de 2,74 m, magnetómetro a 6,6 m | https://science.nasa.gov/mission/pioneer-10/ , https://www.mdscc.nasa.gov/index.php/en/past-missions/pioneer10_eng/ , https://www.jpl.nasa.gov/news/study-finds-heat-is-source-of-pioneer-anomaly/ , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A |
| Pioneer 11 | Anillo F descubierto con un telescopio de 2,5 cm; ruta probada para la Voyager 2; eje magnético de Saturno alineado a menos de 1 grado | https://www.giss.nasa.gov/pubs/abs/ge06000k.html , https://www.nasa.gov/history/45-years-ago-pioneer-11-launched-to-study-jupiter-and-saturn/ , https://ntrs.nasa.gov/citations/19800034947 , https://pwg.gsfc.nasa.gov/Education/wotherms.html , https://ntrs.nasa.gov/api/citations/19790021039/downloads/19790021039.pdf |
| NEAR Shoemaker | Eros sin campo magnético; espectrómetro de rayos gamma en el suelo, a unos 10 cm; Eros parecido a las condritas ordinarias L y LL; cuatro paneles de 1,8 × 1,2 m | https://science.nasa.gov/mission/near-shoemaker/ , https://nssdc.gsfc.nasa.gov/planetary/text/near_pr_20010228.txt , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A , Peplowski et al. 2015, doi:10.1111/maps.12434 |
| Dawn | Manchas de Occator: carbonato de sodio, la mayor concentración de carbonatos fuera de la Tierra; agua salada a unos 40 km de profundidad; alas de 8,3 m; antena de 1,52 m | https://jpl.nasa.gov/news/news.php?feature=6547 , https://www.jpl.nasa.gov/news/mystery-solved-bright-areas-on-ceres-come-from-salty-water-below/ , https://science.nasa.gov/mission/dawn/technology/spacecraft/ |
| Kepler | 84 partes por millón; cámara de 42 CCD; más de 2.600 planetas; más planetas que estrellas; el tamaño más común entre la Tierra y Neptuno; paneles de hasta 1.100 W | https://ntrs.nasa.gov/api/citations/20100002027/downloads/20100002027.pdf , https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/ , https://science.nasa.gov/mission/kepler/ |

## Máquinas sumadas del trabajo de Juan Ignacio Angeloni (`src/js/47-extra-data.js`, `src/js/48-extra.js`)

Apollo 11, Viking 1, InSight e Ingenuity aparecen solo en su lugar de hoy, sin viaje desde la Tierra. Sus datos se verificaron el 15 de noviembre de 2026; las notas con las fuentes y las diferencias están en `docs/verificacion_ciencia.md`.

- Apollo 11: 20 jul 1969 20:17:40 UT, 0,67416° N, 23,47314° E (NSSDCA). El módulo es el modelo de NASA 3D Resources; se muestra solo la etapa de descenso. El retrorreflector y el sismómetro son modelos simplificados, ubicados cerca del módulo pero no a su distancia real.
- Viking 1: 20 jul 1976 11:53:06 UT, 22,27° N, 47,95° O (NSSDCA, planetocéntrico). Modelo de NASA 3D Resources.
- InSight: 26 nov 2018, 4,502° N, 135,623° E (Golombek et al. 2020). Modelo oficial de NASA (ver «Modelos 3D»).
- Ingenuity: modelo de NASA 3D Resources. La posición usada es el lugar de aterrizaje de Perseverance (18,44° N, 77,45° E); Ingenuity quedó a unos kilómetros, en «Valinor Hills», y no encontramos sus coordenadas en una página de NASA.
- La luz de estas cuatro superficies es ilustrativa, no la del momento del aterrizaje.
- Fotos: NASA Image and Video Library, 38 imágenes elegidas por Juan con epígrafe, crédito y número (`src/js/46-photos.js`). Tres son ilustraciones de NASA y se marcan como tales.
- Audio: «The Eagle has landed» (NASA, https://www.nasa.gov/audio-and-ringtones/) y el primer sonido grabado en Marte por Perseverance (NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro, https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/).

## Videos de lanzamiento (`src/js/46-videos-data.js`, `assets/video/`)

De la NASA Image and Video Library, bajados el 15 de noviembre de 2026 y recortados con ffmpeg alrededor del despegue (de 30 a 48 segundos). Detalle y búsquedas en `docs/videos_lanzamiento.md`.

| Misión | Video original | Recorte | Crédito |
|---|---|---|---|
| Apollo 11 | https://images.nasa.gov/details/KSC_69-71212-sRGB (película de 70 mm, sin sonido) | 0:10 a 0:58 | NASA/MSFC |
| Phoenix | https://images.nasa.gov/details/ksc_080407_phx_launch | 0:00 a 0:40 | NASA |
| Dawn | https://images.nasa.gov/details/ksc_092707_dawn_launch | 0:02 a 0:40 | NASA |
| Kepler | https://images.nasa.gov/details/ksc_030609_kep_launch | 0:00 a 0:40 | NASA |
| Mars 2020 (llevó a Ingenuity) | «NASA's Perseverance Rover Launches to Mars», JPL-20200730-M2020f-0003 | 0:00 a 0:30, sin sonido (el original tiene música agregada) | NASA/JPL-Caltech |

La biblioteca no tiene video del despegue de Surveyor 1, Pioneer 10 y 11, Viking 1, NEAR Shoemaker, Mars Pathfinder, Spirit, Opportunity ni InSight; para esas queda la transmisión animada.

## Código de terceros

- three.js r128 (MIT), desde cdnjs, y su `GLTFLoader` desde jsDelivr.
- Fuentes Geist y Doto (SIL Open Font License), desde Google Fonts.
