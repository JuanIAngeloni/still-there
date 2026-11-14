// Mission data. Every date and figure below was checked against the NASA page listed in `src`.
// Dates follow each NASA mission page; they can differ by one day depending on the time zone used.
const N = id => 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=' + id;

export const SITES = {
  cape: { lat: 28.5, lon: -80.6, es: 'Cabo Cañaveral, Florida', en: 'Cape Canaveral, Florida' },
  vand: { lat: 34.7, lon: -120.6, es: 'Vandenberg, California', en: 'Vandenberg, California' }
};

export const TYPES = {
  lander: { es: 'Módulo de aterrizaje', en: 'Lander' }, crew: { es: 'Módulo con astronautas', en: 'Crewed lander' },
  rover: { es: 'Rover', en: 'Rover' }, heli: { es: 'Helicóptero', en: 'Helicopter' }, probe: { es: 'Sonda', en: 'Probe' }, scope: { es: 'Telescopio espacial', en: 'Space telescope' }
};

export const MISSIONS = [
  { id: 'surveyor1', name: 'Surveyor 1', dest: 'moon', type: 'lander', launch: '1966-05-30', arrive: '1966-06-02', site: 'cape', rocket: 'Atlas-Centaur', lat: -2.4745, lon: -43.3398,
    place: { es: 'Oceanus Procellarum', en: 'Oceanus Procellarum' }, src: N('1966-045A'),
    line: { es: 'El primer aterrizaje suave de Estados Unidos en la Luna. Mandó 10.338 fotos antes de su primera noche lunar.', en: 'The first US soft landing on the Moon. It returned 10,338 photos before its first lunar night.' } },
  { id: 'apollo11', name: 'Eagle · Apollo 11', short: 'Eagle', dest: 'moon', type: 'crew', launch: '1969-07-16', arrive: '1969-07-20', site: 'cape', rocket: 'Saturn V', lat: 0.67416, lon: 23.47314, story: 'eagle', end: '1969-07-21', endLabel: { es: 'Quedó sola en la Luna', en: 'Left alone on the Moon' },
    place: { es: 'Mar de la Tranquilidad', en: 'Sea of Tranquility' }, src: N('1969-059C'),
    line: { es: 'El primer vehículo con tripulación que se posó en la Luna. Su mitad de abajo sigue ahí.', en: 'The first crewed vehicle to land on the Moon. Its lower half is still there.' } },
  { id: 'apollo15', name: 'Falcon y rover lunar · Apollo 15', short: 'Apollo 15', dest: 'moon', type: 'crew', launch: '1971-07-26', arrive: '1971-07-30', site: 'cape', rocket: 'Saturn V', lat: 26.13239, lon: 3.6333,
    place: { es: 'Hadley-Apeninos', en: 'Hadley-Apennine' }, src: N('1971-063C'),
    line: { es: 'Llevó el primer auto lunar, que exploró hasta 5 km alrededor del módulo.', en: 'It carried the first lunar rover, which explored up to 5 km around the lander.' } },
  { id: 'apollo17', name: 'Challenger · Apollo 17', short: 'Apollo 17', dest: 'moon', type: 'crew', launch: '1972-12-07', arrive: '1972-12-11', site: 'cape', rocket: 'Saturn V', lat: 20.1911, lon: 30.7723,
    place: { es: 'Taurus-Littrow', en: 'Taurus-Littrow' }, src: N('1972-096C'),
    line: { es: 'El último módulo Apolo en la Luna. Dejó su etapa de descenso y una estación de instrumentos.', en: 'The last Apollo lander on the Moon. It left its descent stage and a station of instruments.' } },
  { id: 'pioneer10', name: 'Pioneer 10', dest: 'deep', anchor: 'beyond', type: 'probe', launch: '1972-03-02', arrive: '1973-12-04', end: '2003-01-23', site: 'cape', rocket: 'Atlas-Centaur', story: 'pioneer',
    place: { es: 'Rumbo a la estrella Aldebarán', en: 'Heading toward the star Aldebaran' }, src: 'https://science.nasa.gov/mission/pioneer-10/', arriveLabel: { es: 'Pasó por Júpiter', en: 'Flew past Jupiter' },
    line: { es: 'La primera nave que cruzó el cinturón de asteroides y visitó Júpiter. Sigue alejándose.', en: 'The first spacecraft to cross the asteroid belt and visit Jupiter. It is still moving away.' } },
  { id: 'viking1', name: 'Viking 1', dest: 'mars', type: 'lander', launch: '1975-08-20', arrive: '1976-07-20', end: '1982-11-13', site: 'cape', rocket: 'Titan IIIE-Centaur', lat: 22.27, lon: -47.95,
    place: { es: 'Chryse Planitia', en: 'Chryse Planitia' }, src: N('1975-075C'),
    line: { es: 'Empezó a transmitir su primera foto del suelo de Marte 25 segundos después de aterrizar. Funcionó hasta 1982.', en: 'It began sending its first picture of the Martian surface 25 seconds after landing. It worked until 1982.' } },
  { id: 'near', name: 'NEAR Shoemaker', dest: 'deep', anchor: 'eros', type: 'probe', launch: '1996-02-17', arrive: '2001-02-12', end: '2001-02-28', site: 'cape', rocket: 'Delta II',
    place: { es: 'Sobre el asteroide Eros', en: 'On asteroid Eros' }, src: N('1996-008A'), arriveLabel: { es: 'Se posó en Eros', en: 'Touched down on Eros' },
    line: { es: 'La primera nave en orbitar un asteroide y en posarse sobre uno.', en: 'The first spacecraft to orbit an asteroid and to touch down on one.' } },
  { id: 'pathfinder', name: 'Mars Pathfinder y Sojourner', short: 'Sojourner', dest: 'mars', type: 'rover', launch: '1996-12-04', arrive: '1997-07-04', end: '1997-09-27', site: 'cape', rocket: 'Delta II', lat: 19.33, lon: -33.55,
    place: { es: 'Ares Vallis', en: 'Ares Vallis' }, src: N('1996-068A'),
    line: { es: 'Un módulo y un rover pequeño, Sojourner. Tomaron imágenes e hicieron experimentos hasta que se perdió la comunicación.', en: 'A lander and a small rover, Sojourner. They took images and ran experiments until communications were lost.' } },
  { id: 'spirit', name: 'Spirit', dest: 'mars', type: 'rover', launch: '2003-06-10', arrive: '2004-01-04', end: '2010-03-22', site: 'cape', rocket: 'Delta II', lat: -14.572, lon: 175.478,
    place: { es: 'Cráter Gusev', en: 'Gusev crater' }, src: N('2003-027A'),
    line: { es: 'El gemelo de Opportunity. Aterrizó del otro lado de Marte y transmitió por última vez en 2010.', en: "Opportunity's twin. It landed on the other side of Mars and last transmitted in 2010." } },
  { id: 'opportunity', name: 'Opportunity', dest: 'mars', type: 'rover', launch: '2003-07-07', arrive: '2004-01-24', end: '2018-06-10', site: 'cape', rocket: 'Delta II', lat: -1.946, lon: -5.527, story: 'opportunity',
    place: { es: 'Meridiani Planum', en: 'Meridiani Planum' }, src: 'https://science.nasa.gov/mission/mer-opportunity/',
    line: { es: 'Pensado para 90 días marcianos. Recorrió más de 45 km y encontró señales de agua antigua.', en: 'Built for 90 Martian days. It drove more than 45 km and found signs of ancient water.' } },
  { id: 'phoenix', name: 'Phoenix', dest: 'mars', type: 'lander', launch: '2007-08-04', arrive: '2008-05-25', end: '2008-11-02', site: 'cape', rocket: 'Delta II', lat: 68.15, lon: -125.9,
    place: { es: 'Llanura polar norte', en: 'Northern polar plains' }, src: N('2007-034A'),
    line: { es: 'Aterrizó cerca del polo norte de Marte, en una zona elegida por la cantidad de hielo en el suelo.', en: 'It landed near the north pole of Mars, at a site chosen for the amount of ice in the ground.' } },
  { id: 'dawn', name: 'Dawn', dest: 'deep', anchor: 'ceres', type: 'probe', launch: '2007-09-27', arrive: '2015-03-06', end: '2018-10-31', site: 'cape', rocket: 'Delta II',
    place: { es: 'En órbita de Ceres', en: 'In orbit around Ceres' }, src: N('2007-043A'), arriveLabel: { es: 'Llegó a Ceres', en: 'Reached Ceres' },
    line: { es: 'Orbitó dos mundos del cinturón de asteroides: Vesta y Ceres. Sigue dando vueltas alrededor de Ceres.', en: 'It orbited two worlds of the asteroid belt: Vesta and Ceres. It is still circling Ceres.' } },
  { id: 'kepler', name: 'Kepler', dest: 'deep', anchor: 'kepler', type: 'scope', launch: '2009-03-07', arrive: '2009-03-07', end: '2018-10-30', site: 'cape', rocket: 'Delta II',
    place: { es: 'En órbita alrededor del Sol, detrás de la Tierra', en: 'In orbit around the Sun, trailing Earth' }, src: 'https://science.nasa.gov/mission/kepler/', arriveLabel: { es: 'Entró en órbita solar', en: 'Entered solar orbit' },
    line: { es: 'Un telescopio que encontró más de 2.600 planetas alrededor de otras estrellas, hasta quedarse sin combustible.', en: 'A telescope that found more than 2,600 planets around other stars, until it ran out of fuel.' } },
  { id: 'insight', name: 'InSight', dest: 'mars', type: 'lander', launch: '2018-05-05', arrive: '2018-11-26', end: '2022-12-15', site: 'vand', rocket: 'Atlas V', lat: 4.5, lon: 135.6,
    place: { es: 'Elysium Planitia', en: 'Elysium Planitia' }, src: N('2018-042A'),
    line: { es: 'Llevó un sismómetro y un medidor de calor para estudiar el interior de Marte.', en: 'It carried a seismometer and a heat probe to study the interior of Mars.' } },
  { id: 'ingenuity', name: 'Ingenuity', dest: 'mars', type: 'heli', launch: '2020-07-30', arrive: '2021-02-18', end: '2024-01-18', site: 'cape', rocket: 'Atlas V', lat: 18.44, lon: 77.45,
    place: { es: 'Cráter Jezero', en: 'Jezero crater' }, src: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/', endLabel: { es: 'Último vuelo', en: 'Final flight' },
    line: { es: 'El primer vuelo con motor en otro planeta. Iba a hacer 5 vuelos de prueba; hizo 72.', en: 'The first powered flight on another planet. Planned for 5 test flights; it made 72.' } }
];

const S = {
  oppy: 'https://science.nasa.gov/mission/mer-opportunity/', oppyN: N('2003-032A'), berries: 'https://mars.nasa.gov/mer/mission/science/results/',
  eagle: N('1969-059C'), lrrr: 'https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04', laser: 'https://www.nasa.gov/missions/lro/laser-beams-reflected-between-earth-and-moon-boost-science/',
  p10: 'https://science.nasa.gov/mission/pioneer-10/', p10N: N('1972-012A')
};

// Five scenes per machine. `say` is a first-person voice written for this app from NASA data: it is not a quote.
export const STORIES = {
  opportunity: {
    mission: 'opportunity', model: 'opportunity', ground: 'mars', color: '#ff8a4c',
    tag: { es: 'Marte · rover', en: 'Mars · rover' },
    hook: { es: 'Me mandaron por 90 días. Trabajé más de 14 años.', en: 'They sent me for 90 days. I worked for more than 14 years.' },
    scenes: [
      { title: { es: 'Me mandaron a buscar agua', en: 'They sent me to look for water' },
        say: { es: 'Desde la órbita se veía en Marte un mineral que suele formarse en agua. Me mandaron a comprobarlo de cerca. El plan: 90 días marcianos.', en: 'From orbit, Mars showed a mineral that usually forms in water. They sent me to check it up close. The plan: 90 Martian days.' },
        facts: [
          { h: { es: '7 de julio de 2003', en: 'July 7, 2003' }, p: { es: 'Despegué de Cabo Cañaveral en un cohete Delta II.', en: 'I lifted off from Cape Canaveral on a Delta II rocket.' }, src: S.oppy },
          { h: { es: 'Una gemela: Spirit', en: 'A twin: Spirit' }, p: { es: 'Salió un mes antes, hacia el otro lado de Marte.', en: 'She left a month earlier, bound for the other side of Mars.' }, src: N('2003-027A') }] },
      { title: { es: 'Seis meses de viaje', en: 'Six months of travel' },
        say: { es: 'Crucé el espacio entre la Tierra y Marte y terminé quieto dentro de un cráter chico, de unos 20 metros de ancho.', en: 'I crossed the space between Earth and Mars and came to rest inside a small crater, about 20 metres wide.' },
        facts: [
          { h: { es: '24 de enero de 2004', en: 'January 24, 2004' }, p: { es: 'Aterricé en Meridiani Planum, cerca del ecuador de Marte.', en: 'I landed on Meridiani Planum, near the Martian equator.' }, src: S.oppy },
          { h: { es: '1,946° S · 354,473° E', en: '1.946° S · 354.473° E' }, p: { es: 'El punto exacto donde quedé al aterrizar.', en: 'The exact spot where I came to rest.' }, src: S.oppyN }] },
      { title: { es: 'Encontré la pista del agua', en: 'I found the trail of water' }, part: 'arm',
        say: { es: 'Con los instrumentos de mi brazo estudié unas bolitas de hematita, un mineral que suele formarse en agua. Acá hubo agua hace muchísimo tiempo.', en: 'With the instruments on my arm I studied tiny spheres of hematite, a mineral that usually forms in water. There was water here a very long time ago.' },
        facts: [
          { h: { es: 'Los «arándanos»', en: 'The “blueberries”' }, p: { es: 'Así apodaron a esas bolitas de mineral. Fueron la evidencia de un ambiente antiguo con agua.', en: 'That is the nickname those mineral spheres got. They were evidence of an ancient watery environment.' }, src: S.berries },
          { h: { es: 'Agua ácida', en: 'Acidic water' }, p: { es: 'El agua que empapó la zona era ácida: un lugar difícil para la vida.', en: 'The water that soaked the area was acidic: a hard place for life.' }, src: S.berries }] },
      { title: { es: 'Una tormenta tapó el Sol', en: 'A storm covered the Sun' }, fx: 'dust',
        say: { es: 'En 2018 una tormenta de polvo muy fuerte cubrió el cielo. Mis paneles solares se quedaron sin luz y dejé de responder.', en: 'In 2018 a severe dust storm covered the sky. My solar panels were left without light and I stopped answering.' },
        facts: [
          { h: { es: '10 de junio de 2018', en: 'June 10, 2018' }, p: { es: 'Mi última comunicación con la Tierra.', en: 'My last communication with Earth.' }, src: S.oppy },
          { h: { es: '13 de febrero de 2019', en: 'February 13, 2019' }, p: { es: 'NASA dio la misión por terminada. Duré 60 veces más de lo previsto.', en: 'NASA declared the mission over. I lasted 60 times longer than planned.' }, src: S.oppy }] },
      { title: { es: 'Sigo en el Valle de la Perseverancia', en: 'I am still in Perseverance Valley' }, pin: true,
        say: { es: 'Recorrí más de 45 kilómetros desde donde aterricé. Estoy quieto, cubierto de polvo, en el lugar donde me alcanzó la tormenta.', en: 'I drove more than 45 kilometres from where I landed. I am standing still, covered in dust, where the storm caught me.' },
        facts: [
          { h: { es: 'Más de 45 km', en: 'More than 45 km' }, p: { es: 'La distancia que recorrí sobre Marte.', en: 'The distance I drove on Mars.' }, src: S.oppy },
          { h: { es: 'Nadie volvió a buscarme', en: 'Nobody came back for me' }, p: { es: 'No hay forma de traerme. Soy parte del paisaje de Marte.', en: 'There is no way to bring me back. I am part of the Martian landscape.' }, src: S.oppy }] }
    ],
    parts: [
      { id: 'pancam', name: { es: 'Cámara panorámica', en: 'Panoramic camera' }, what: { es: 'Dos cámaras en lo alto de un mástil, a 1,4 m de las ruedas: mis ojos.', en: 'Two cameras on top of a mast, 1.4 m above the wheels: my eyes.' }, found: { es: 'Con ella elegía a qué roca ir y fotografiaba el paisaje.', en: 'With it I chose which rock to visit and photographed the landscape.' }, src: S.oppyN },
      { id: 'panels', name: { es: 'Paneles solares', en: 'Solar panels' }, what: { es: 'Mi única fuente de energía: luz del Sol convertida en electricidad.', en: 'My only source of power: sunlight turned into electricity.' }, found: { es: 'Me dieron energía más de 14 años, hasta la tormenta de polvo de 2018.', en: 'They powered me for more than 14 years, until the 2018 dust storm.' }, src: S.oppy },
      { id: 'arm', name: { es: 'Brazo con instrumentos', en: 'Instrument arm' }, what: { es: 'En la punta lleva una lupa, dos sensores que identifican minerales y una herramienta para raspar roca.', en: 'Its tip carries a magnifier, two sensors that identify minerals and a tool to grind rock.' }, found: { es: 'Con él estudié los «arándanos» de hematita: la pista del agua.', en: 'With it I studied the hematite “blueberries”: the trail of water.' }, src: S.berries },
      { id: 'wheels', name: { es: 'Seis ruedas', en: 'Six wheels' }, what: { es: 'Seis ruedas de metal sobre una suspensión que se adapta a las piedras.', en: 'Six metal wheels on a suspension that adapts to the rocks.' }, found: { es: 'Me llevaron más de 45 km, de cráter en cráter.', en: 'They carried me more than 45 km, from crater to crater.' }, src: S.oppy },
      { id: 'antenna', name: { es: 'Antenas', en: 'Antennas' }, what: { es: 'Con ellas recibía órdenes y mandaba fotos y datos a la Tierra.', en: 'With them I received commands and sent photos and data to Earth.' }, found: { es: 'Mi última comunicación llegó el 10 de junio de 2018.', en: 'My last communication arrived on June 10, 2018.' }, src: S.oppy }
    ]
  },
  eagle: {
    mission: 'apollo11', model: 'eagle', ground: 'moon', color: '#9d8cff',
    tag: { es: 'Luna · módulo con astronautas', en: 'Moon · crewed lander' },
    hook: { es: 'Bajé a dos personas a la Luna. Una mitad mía nunca volvió.', en: 'I took two people down to the Moon. Half of me never came back.' },
    scenes: [
      { title: { es: 'Me hicieron para bajar a la Luna', en: 'I was built to land on the Moon' },
        say: { es: 'Soy un módulo lunar: una nave en dos mitades pensada solo para el espacio. Mi trabajo era llevar a Neil Armstrong y Buzz Aldrin hasta la superficie.', en: 'I am a lunar module: a two-part ship built only for space. My job was to take Neil Armstrong and Buzz Aldrin down to the surface.' },
        facts: [
          { h: { es: '16 de julio de 1969', en: 'July 16, 1969' }, p: { es: 'Despegué de Florida en la punta de un cohete Saturno V.', en: 'I left Florida on top of a Saturn V rocket.' }, src: S.eagle },
          { h: { es: 'Sin asientos', en: 'No seats' }, p: { es: 'Adentro no había asientos: los astronautas volaban de pie.', en: 'There were no seats inside: the astronauts flew standing up.' }, src: S.eagle }] },
      { title: { es: 'Cuatro días hasta la Luna', en: 'Four days to the Moon' },
        say: { es: 'Viajé enganchado a la nave principal. Al llegar me separé y bajé hasta una llanura: el Mar de la Tranquilidad.', en: 'I travelled docked to the main ship. On arrival I separated and came down onto a plain: the Sea of Tranquility.' },
        facts: [
          { h: { es: '20 de julio de 1969', en: 'July 20, 1969' }, p: { es: 'Armstrong avisó por radio: «Houston, Tranquility Base here - the Eagle has landed».', en: 'Armstrong radioed: “Houston, Tranquility Base here - the Eagle has landed”.' }, src: S.eagle },
          { h: { es: '0,674° N · 23,473° E', en: '0.674° N · 23.473° E' }, p: { es: 'Mi lugar en la Luna, medido desde una sonda en órbita.', en: 'My spot on the Moon, measured from an orbiting probe.' }, src: S.eagle }] },
      { title: { es: 'Dejamos un espejo y un sismómetro', en: 'We left a mirror and a seismometer' }, part: 'lrrr',
        say: { es: 'Los astronautas dejaron a mi lado un panel de espejos. Desde la Tierra le apuntan un láser y miden cuánto tarda en volver: así se sabe la distancia a la Luna.', en: 'The astronauts left a panel of mirrors beside me. From Earth a laser is aimed at it and timed on its way back: that gives the distance to the Moon.' },
        facts: [
          { h: { es: 'Espejo para láser', en: 'Laser mirror' }, p: { es: 'Mide con precisión la distancia Tierra-Luna y cómo se mueve la Luna. No necesita energía.', en: 'It precisely measures the Earth-Moon distance and how the Moon moves. It needs no power.' }, src: S.lrrr },
          { h: { es: 'Sismómetro', en: 'Seismometer' }, p: { es: 'Midió temblores para estudiar la corteza y el interior de la Luna.', en: 'It measured tremors to study the crust and interior of the Moon.' }, src: S.eagle }] },
      { title: { es: 'Me partí en dos', en: 'I split in two' }, fx: 'ascent',
        say: { es: 'Después de 21 horas y 36 minutos, mi mitad de arriba despegó con los astronautas. Mi mitad de abajo le sirvió de plataforma y se quedó.', en: 'After 21 hours and 36 minutes, my upper half lifted off with the astronauts. My lower half served as its launch pad and stayed.' },
        facts: [
          { h: { es: '21 de julio de 1969', en: 'July 21, 1969' }, p: { es: 'Mi etapa de ascenso despegó de la Luna y se reunió con la nave principal.', en: 'My ascent stage lifted off the Moon and rejoined the main ship.' }, src: S.eagle },
          { h: { es: 'Destino desconocido', en: 'Fate unknown' }, p: { es: 'A esa mitad la soltaron en órbita lunar. No se sabe dónde terminó; se supone que cayó sobre la Luna.', en: 'That half was released in lunar orbit. Nobody knows where it ended up; it is assumed to have crashed on the Moon.' }, src: S.eagle }] },
      { title: { es: 'Sigo en la Base Tranquilidad', en: 'I am still at Tranquility Base' }, pin: true,
        say: { es: 'Mi etapa de descenso sigue en el mismo lugar, con el espejo a pocos metros. Los científicos todavía le apuntan láseres desde la Tierra.', en: 'My descent stage is still in the same place, with the mirror a few metres away. Scientists still aim lasers at it from Earth.' },
        facts: [
          { h: { es: 'Un experimento que sigue', en: 'An experiment still running' }, p: { es: 'Los espejos de Apolo se siguen usando para medir la distancia a la Luna.', en: 'The Apollo mirrors are still used to measure the distance to the Moon.' }, src: S.laser },
          { h: { es: '4,2 m de ancho', en: '4.2 m across' }, p: { es: 'El tamaño de la etapa que quedó, con sus cuatro patas.', en: 'The size of the stage that stayed, with its four legs.' }, src: S.eagle }] }
    ],
    parts: [
      { id: 'ascent', name: { es: 'Etapa de ascenso', en: 'Ascent stage' }, what: { es: 'La cabina de los dos astronautas, con su propio motor para volver a la órbita.', en: "The two astronauts' cabin, with its own engine to return to orbit." }, found: { es: 'Despegó el 21 de julio de 1969. No se sabe dónde terminó.', en: 'It lifted off on July 21, 1969. Nobody knows where it ended up.' }, src: S.eagle },
      { id: 'descent', name: { es: 'Etapa de descenso', en: 'Descent stage' }, what: { es: 'Un prisma de ocho lados con el motor de aterrizaje y los tanques.', en: 'An eight-sided prism holding the landing engine and tanks.' }, found: { es: 'Sirvió de plataforma de despegue y es lo que sigue en la Luna.', en: 'It served as the launch pad and is what remains on the Moon.' }, src: S.eagle },
      { id: 'legs', name: { es: 'Cuatro patas', en: 'Four legs' }, what: { es: 'Patas con platos redondos en la punta. Una tiene la escalera.', en: 'Legs with round footpads. One of them carries the ladder.' }, found: { es: 'De punta a punta miden 9,4 m. Por esa escalera bajó Armstrong.', en: 'They span 9.4 m. Armstrong climbed down that ladder.' }, src: S.eagle },
      { id: 'lrrr', name: { es: 'Espejo para láser', en: 'Laser mirror' }, what: { es: 'Un panel de cubos de vidrio que devuelve la luz hacia donde vino. En la app está más cerca del módulo que en la realidad.', en: 'A panel of glass cubes that sends light back where it came from. In this app it sits closer to the lander than in reality.' }, found: { es: 'Permite medir la distancia Tierra-Luna. Se sigue usando.', en: 'It lets scientists measure the Earth-Moon distance. It is still in use.' }, src: S.laser },
      { id: 'seismo', name: { es: 'Sismómetro', en: 'Seismometer' }, what: { es: 'Una caja de instrumentos con dos paneles solares y una antena.', en: 'A box of instruments with two solar panels and an antenna.' }, found: { es: 'Registró temblores para estudiar el interior de la Luna.', en: 'It recorded tremors to study the interior of the Moon.' }, src: S.eagle }
    ]
  },
  pioneer: {
    mission: 'pioneer10', model: 'pioneer', ground: 'space', color: '#3fe0c5',
    tag: { es: 'Espacio profundo · sonda', en: 'Deep space · probe' },
    hook: { es: 'Fui la primera en cruzar el cinturón de asteroides. Todavía sigo viaje.', en: 'I was the first to cross the asteroid belt. I am still travelling.' },
    scenes: [
      { title: { es: 'Nadie había ido tan lejos', en: 'Nobody had gone that far' },
        say: { es: 'Fui la primera misión de NASA a los planetas de afuera. Nadie sabía si una nave podía cruzar el cinturón de asteroides sin romperse.', en: "I was NASA's first mission to the outer planets. Nobody knew whether a spacecraft could cross the asteroid belt in one piece." },
        facts: [
          { h: { es: '2 de marzo de 1972', en: 'March 2, 1972' }, p: { es: 'Despegué de Cabo Cañaveral en un cohete Atlas-Centaur.', en: 'I lifted off from Cape Canaveral on an Atlas-Centaur rocket.' }, src: S.p },
          { h: { es: 'Plan: 21 meses', en: 'Plan: 21 months' }, p: { es: 'Era lo que tenía que durar mi misión.', en: 'That is how long my mission was meant to last.' }, src: S.p }] },
      { title: { es: 'Crucé el cinturón de asteroides', en: 'I crossed the asteroid belt' },
        say: { es: 'Entré al cinturón en julio de 1972 y salí siete meses después. Recibí algunos golpes, menos de los esperados. Después vino Júpiter.', en: 'I entered the belt in July 1972 and came out seven months later. I took a few hits, fewer than expected. Then came Jupiter.' },
        facts: [
          { h: { es: '15 de julio de 1972', en: 'July 15, 1972' }, p: { es: 'Entré al cinturón de asteroides. Salí en febrero de 1973.', en: 'I entered the asteroid belt. I came out in February 1973.' }, src: S.p },
          { h: { es: '4 de diciembre de 1973', en: 'December 4, 1973' }, p: { es: 'Mi punto más cercano a Júpiter: unos 200.000 km.', en: 'My closest point to Jupiter: about 200,000 km.' }, src: S.p10N }] },
      { title: { es: 'Fui la primera en estudiar Júpiter', en: 'I was the first to study Jupiter' }, part: 'mag',
        say: { es: 'Fotografié a Júpiter y a sus lunas, y medí su campo magnético y su radiación. Mi sensor magnético va en la punta de un brazo de 6,6 metros.', en: 'I photographed Jupiter and its moons, and measured its magnetic field and radiation. My magnetic sensor sits at the tip of a 6.6-metre boom.' },
        facts: [
          { h: { es: 'Quince experimentos', en: 'Fifteen experiments' }, p: { es: 'Para medir campos magnéticos, viento solar, polvo, radiación y la atmósfera de Júpiter.', en: "To measure magnetic fields, solar wind, dust, radiation and Jupiter's atmosphere." }, src: S.p10N },
          { h: { es: 'Se puede cruzar', en: 'It can be crossed' }, p: { es: 'Demostré que una nave puede atravesar el cinturón de asteroides.', en: 'I showed that a spacecraft can pass through the asteroid belt.' }, src: S.p }] },
      { title: { es: 'Mi señal se apagó', en: 'My signal faded out' }, fx: 'fade',
        say: { es: 'Mi energía viene de cuatro generadores nucleares que se gastan de a poco. Treinta años después del despegue, ya no alcanzó para mi transmisor.', en: 'My power comes from four nuclear generators that slowly run down. Thirty years after launch, it was no longer enough for my transmitter.' },
        facts: [
          { h: { es: '23 de enero de 2003', en: 'January 23, 2003' }, p: { es: 'La última vez que se detectó mi señal.', en: 'The last time my signal was detected.' }, src: S.p10N },
          { h: { es: '155 watts', en: '155 watts' }, p: { es: 'La potencia de mis generadores al despegar: menos que un secador de pelo.', en: 'The power of my generators at launch: less than a hair dryer.' }, src: S.p10N }] },
      { title: { es: 'Sigo viaje hacia Aldebarán', en: 'I am still heading for Aldebaran' }, pin: true,
        say: { es: 'Voy en dirección a la estrella roja Aldebarán, a 68 años luz. Tardaría unos dos millones de años en llegar. Llevo una placa con un mensaje.', en: 'I am heading toward the red star Aldebaran, 68 light-years away. Getting there would take about two million years. I carry a plaque with a message.' },
        facts: [
          { h: { es: 'Una placa', en: 'A plaque' }, p: { es: 'Muestra a un hombre, a una mujer y dónde están el Sol y la Tierra en la galaxia.', en: 'It shows a man, a woman and where the Sun and Earth are in the galaxy.' }, src: S.p10N },
          { h: { es: 'Fuera de alcance', en: 'Out of reach' }, p: { es: 'Ya no se me puede escuchar ni mandar órdenes.', en: 'I can no longer be heard or commanded.' }, src: S.p10N }] }
    ],
    parts: [
      { id: 'dish', name: { es: 'Antena parabólica', en: 'Dish antenna' }, what: { es: 'Un plato de 2,74 m que siempre apunta a la Tierra.', en: 'A 2.74 m dish that always points at Earth.' }, found: { es: 'Por ella llegaron las primeras fotos cercanas de Júpiter.', en: 'The first close-up pictures of Jupiter came through it.' }, src: S.p10N },
      { id: 'rtg', name: { es: 'Generadores nucleares', en: 'Nuclear generators' }, what: { es: 'Cuatro generadores a 3 m del cuerpo. Tan lejos del Sol, los paneles solares no servían.', en: 'Four generators 3 m from the body. That far from the Sun, solar panels were no use.' }, found: { es: 'Daban 155 watts al despegar. Cuando bajaron demasiado, mi señal se apagó.', en: 'They gave 155 watts at launch. When that dropped too low, my signal faded.' }, src: S.p10N },
      { id: 'mag', name: { es: 'Sensor magnético', en: 'Magnetometer' }, what: { es: 'Va en la punta de un brazo de 6,6 m, lejos de la nave, para que nada lo confunda.', en: 'It sits at the tip of a 6.6 m boom, away from the spacecraft, so nothing disturbs it.' }, found: { es: 'Midió el campo magnético de Júpiter y el del espacio entre los planetas.', en: 'It measured the magnetic field of Jupiter and of the space between planets.' }, src: S.p10N },
      { id: 'bus', name: { es: 'Cuerpo e instrumentos', en: 'Body and instruments' }, what: { es: 'Una caja de seis lados con la computadora y los experimentos.', en: 'A six-sided box holding the computer and the experiments.' }, found: { es: 'Llevaba quince experimentos, entre ellos el que tomó las fotos.', en: 'It carried fifteen experiments, including the one that took the pictures.' }, src: S.p10N },
      { id: 'plaque', name: { es: 'Placa con mensaje', en: 'Message plaque' }, what: { es: 'Una placa de metal con dibujos. El dibujo de la app es una aproximación.', en: 'A metal plaque with drawings. The drawing in this app is an approximation.' }, found: { es: 'Cuenta quién me hizo y de dónde salí, por si alguien me encuentra.', en: 'It tells who made me and where I came from, in case someone finds me.' }, src: S.p10N }
    ]
  }
};

export const SOURCES = [
  { h: { es: 'Catálogo de naves', en: 'Spacecraft catalog' }, items: [
    ['NASA Space Science Data Coordinated Archive (NSSDCA) Master Catalog', 'https://nssdc.gsfc.nasa.gov/nmc/'],
    ['NASA Image and Video Library (fotos de cada máquina / photos of each machine)', 'https://images.nasa.gov/'],
    ['NASA Science · Opportunity', S.oppy], ['NASA Mars Exploration Rovers · Science results', S.berries], ['NASA Science · Pioneer 10', S.p10],
    ['NASA · Laser Beams Reflected Between Earth and Moon Boost Science', S.laser], ['NASA Science · Kepler', 'https://science.nasa.gov/mission/kepler/'],
    ['NASA Science · Ingenuity Mars Helicopter', 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/']] },
  { h: { es: 'Imágenes de los planetas', en: 'Planet imagery' }, items: [
    ['Tierra / Earth: NASA Blue Marble (Visible Earth) + NASA Black Marble 2016 (Earth Observatory)', 'https://visibleearth.nasa.gov/collection/1484/blue-marble'],
    ['Luna / Moon: NASA SVS CGI Moon Kit (LRO LROC color, LOLA elevation)', 'https://svs.gsfc.nasa.gov/4720'],
    ['Marte / Mars: Viking MDIM 2.1 colour mosaic, NASA/JPL/USGS (public domain, via Wikimedia Commons)', 'https://commons.wikimedia.org/wiki/File:Mars_Viking_MDIM21_ClrMosaic_1km.jpg']] }
];

// Three questions per story. Every answer is a fact already shown, with its NASA source, in that story.
export const QUIZ = {
  opportunity: [
    { q: { es: '¿Para cuántos días marcianos estaba planeada la misión de Opportunity?', en: 'How many Martian days was Opportunity’s mission planned for?' },
      o: [{ es: '14 días', en: '14 days' }, { es: '90 días', en: '90 days' }, { es: '5.000 días', en: '5,000 days' }], a: 1,
      why: { es: 'El plan era de 90 días marcianos. Trabajó más de 14 años.', en: 'The plan was 90 Martian days. It worked for more than 14 years.' }, src: S.oppy },
    { q: { es: '¿Qué eran los «arándanos» que encontró?', en: 'What were the “blueberries” it found?' },
      o: [{ es: 'Bolitas de hematita, un mineral que suele formarse en agua', en: 'Tiny spheres of hematite, a mineral that usually forms in water' }, { es: 'Restos de plantas', en: 'Remains of plants' }, { es: 'Pedazos de hielo', en: 'Bits of ice' }], a: 0,
      why: { es: 'Eran bolitas de hematita: la evidencia de que ahí hubo agua hace muchísimo tiempo.', en: 'They were hematite spheres: evidence that there was water there a very long time ago.' }, src: S.berries },
    { q: { es: '¿Por qué dejó de responder en 2018?', en: 'Why did it stop answering in 2018?' },
      o: [{ es: 'Se le rompieron las ruedas', en: 'Its wheels broke' }, { es: 'La apagaron desde la Tierra', en: 'It was switched off from Earth' }, { es: 'Una tormenta de polvo dejó sin luz a sus paneles solares', en: 'A dust storm left its solar panels without light' }], a: 2,
      why: { es: 'Una tormenta de polvo cubrió el cielo. Su última comunicación fue el 10 de junio de 2018.', en: 'A dust storm covered the sky. Its last communication was on June 10, 2018.' }, src: S.oppy }
  ],
  eagle: [
    { q: { es: '¿Qué parte de Eagle sigue hoy en la Luna?', en: 'Which part of Eagle is still on the Moon today?' },
      o: [{ es: 'La cabina con el motor de regreso', en: 'The cabin with the return engine' }, { es: 'Nada: volvió entera', en: 'Nothing: all of it came back' }, { es: 'La etapa de descenso, con sus cuatro patas', en: 'The descent stage, with its four legs' }], a: 2,
      why: { es: 'La mitad de abajo sirvió de plataforma de despegue y se quedó. La de arriba despegó con los astronautas.', en: 'The lower half served as a launch pad and stayed. The upper half lifted off with the astronauts.' }, src: S.eagle },
    { q: { es: '¿En qué lugar de la Luna bajó?', en: 'Where on the Moon did it land?' },
      o: [{ es: 'En el Mar de la Tranquilidad', en: 'In the Sea of Tranquility' }, { es: 'En el polo sur', en: 'At the south pole' }, { es: 'En el lado oculto', en: 'On the far side' }], a: 0,
      why: { es: 'Bajó el 20 de julio de 1969 en el Mar de la Tranquilidad. Por eso Armstrong dijo «Tranquility Base».', en: 'It landed on July 20, 1969 in the Sea of Tranquility. That is why Armstrong said “Tranquility Base”.' }, src: S.eagle },
    { q: { es: '¿Qué instrumento de Apollo 11 se sigue usando desde la Tierra?', en: 'Which Apollo 11 instrument is still used from Earth?' },
      o: [{ es: 'La cámara de televisión', en: 'The TV camera' }, { es: 'El panel de espejos para láser', en: 'The laser mirror panel' }, { es: 'La antena de radio', en: 'The radio antenna' }], a: 1,
      why: { es: 'Desde la Tierra le apuntan un láser y miden cuánto tarda en volver: así se sabe la distancia a la Luna. No necesita energía.', en: 'A laser is aimed at it from Earth and the return time is measured: that gives the distance to the Moon. It needs no power.' }, src: S.lrrr }
  ],
  pioneer: [
    { q: { es: '¿Qué hizo Pioneer 10 antes que ninguna otra nave?', en: 'What did Pioneer 10 do before any other spacecraft?' },
      o: [{ es: 'Aterrizar en Marte', en: 'Land on Mars' }, { es: 'Cruzar el cinturón de asteroides', en: 'Cross the asteroid belt' }, { es: 'Dar la vuelta a la Luna', en: 'Fly around the Moon' }], a: 1,
      why: { es: 'Entró al cinturón en julio de 1972 y salió siete meses después. Demostró que se podía cruzar.', en: 'It entered the belt in July 1972 and left seven months later. It proved the belt could be crossed.' }, src: S.p },
    { q: { es: '¿De dónde sacaba la energía?', en: 'Where did its power come from?' },
      o: [{ es: 'De cuatro generadores nucleares', en: 'From four nuclear generators' }, { es: 'De paneles solares', en: 'From solar panels' }, { es: 'De baterías que se recargaban en Júpiter', en: 'From batteries recharged at Jupiter' }], a: 0,
      why: { es: 'Tan lejos del Sol los paneles solares no servían. Sus generadores daban 155 watts al despegar.', en: 'So far from the Sun, solar panels were no use. Its generators gave 155 watts at launch.' }, src: S.p },
    { q: { es: '¿Hacia qué estrella viaja?', en: 'Which star is it heading for?' },
      o: [{ es: 'La estrella Polar', en: 'Polaris' }, { es: 'Sirio', en: 'Sirius' }, { es: 'Aldebarán', en: 'Aldebaran' }], a: 2,
      why: { es: 'Va hacia Aldebarán, a 68 años luz. Tardaría unos dos millones de años en llegar.', en: 'It is heading for Aldebaran, 68 light-years away. It would take about two million years to get there.' }, src: S.p }
  ]
};
