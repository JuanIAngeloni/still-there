/* ---------- contenido rescatado del repositorio de Juan Ignacio Angeloni ----------
   Origen: github.com/JuanIAngeloni/still-there (src/data.js), escrito con ayuda de Devin (Cognition).
   Reorganizado por máquina, con los mismos ids que usa este sitio, el 15 de noviembre de 2026.
   Los textos son los de Juan, copiados sin cambios. La voz en primera persona está recreada para el sitio
   a partir de datos de NASA: no son citas reales.

   Por máquina (solo lo que existe en el repositorio de Juan; pioneer11 queda vacío):
     hook    {text:{es,en}}: la frase de presentación en primera persona (solo las tres historias).
     voice   [{title:{es,en} o null, say:{es,en}, person}]: person 1 = escena de una historia de cinco escenas,
             en primera persona; person 3 = la frase de la ficha, en tercera persona y sin título.
     scale   [{text:{es,en}, fig:{es,en}, nasa, src}]: text es la comparación con algo conocido, fig el dato
             de NASA; nasa:true cuando la comparación misma es de NASA.
     sources [{label, url}]: las páginas de NASA que Juan cita para esa máquina, sin repetir. Las etiquetas
             que empiezan con NSSDCA Master Catalog se armaron con el número de catálogo de la dirección.
     quiz    [{q:{es,en}, o:[{es,en}], a, x:{es,en}, src}]: x es la explicación de la respuesta.
     facts   [{h:{es,en}, text:{es,en}, scene, src}]: datos de las historias que este sitio todavía no dice
             (h es el título del dato, scene la escena a la que pertenece).
     parts   [{name, what, found, src}]: piezas que la tarjeta de este sitio todavía no tiene.
   conflict: el dato no coincide con lo que dice este sitio o con sus notas de verificación; revisar antes
   de usarlo (ver docs/comparacion_repos.md, sección c). note: observación sobre la fuente.
   En esas notas, A es este repositorio y B el de Juan.
   Archivo generado leyendo src/data.js como texto; no editar a mano los textos. */
var RESCUE = {
 "surveyor1": {
  "voice": [
   {
    "title": null,
    "say": {"es": "El primer aterrizaje suave de Estados Unidos en la Luna. Mandó 10.338 fotos antes de su primera noche lunar.", "en": "The first US soft landing on the Moon. It returned 10,338 photos before its first lunar night."},
    "person": 3,
    "conflict": "Fotos: B da 10.338 (antes de la primera noche lunar); A da 11.240 en total (src/js/40-journey.js:8, FUENTES.md:42). Pueden ser compatibles: revisar en NSSDCA."
   }
  ],
  "scale": [
   {
    "text": {"es": "Casi la altura de un aro de básquet (3,05 m).", "en": "Almost as tall as a basketball hoop (3.05 m)."},
    "fig": {"es": "Unos 3 m de alto", "en": "About 3 m tall"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1966-045A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A"}
  ]
 },
 "apollo11": {
  "hook": {"text": {"es": "Bajé a dos personas a la Luna. Una mitad mía nunca volvió.", "en": "I took two people down to the Moon. Half of me never came back."}},
  "voice": [
   {
    "title": {"es": "Me hicieron para bajar a la Luna", "en": "I was built to land on the Moon"},
    "say": {"es": "Soy un módulo lunar: una nave en dos mitades pensada solo para el espacio. Mi trabajo era llevar a Neil Armstrong y Buzz Aldrin hasta la superficie.", "en": "I am a lunar module: a two-part ship built only for space. My job was to take Neil Armstrong and Buzz Aldrin down to the surface."},
    "person": 1
   },
   {
    "title": {"es": "Cuatro días hasta la Luna", "en": "Four days to the Moon"},
    "say": {"es": "Viajé enganchado a la nave principal. Al llegar me separé y bajé hasta una llanura: el Mar de la Tranquilidad.", "en": "I travelled docked to the main ship. On arrival I separated and came down onto a plain: the Sea of Tranquility."},
    "person": 1
   },
   {
    "title": {"es": "Dejamos un espejo y un sismómetro", "en": "We left a mirror and a seismometer"},
    "say": {"es": "Los astronautas dejaron a mi lado un panel de espejos. Desde la Tierra le apuntan un láser y miden cuánto tarda en volver: así se sabe la distancia a la Luna.", "en": "The astronauts left a panel of mirrors beside me. From Earth a laser is aimed at it and timed on its way back: that gives the distance to the Moon."},
    "person": 1,
    "conflict": "«A pocos metros»: según docs/verificacion_ciencia.md:387-388 el sismómetro quedó a unos 17 m al sur del módulo y el espejo a unos 5 m del sismómetro."
   },
   {
    "title": {"es": "Me partí en dos", "en": "I split in two"},
    "say": {"es": "Después de 21 horas y 36 minutos, mi mitad de arriba despegó con los astronautas. Mi mitad de abajo le sirvió de plataforma y se quedó.", "en": "After 21 hours and 36 minutes, my upper half lifted off with the astronauts. My lower half served as its launch pad and stayed."},
    "person": 1
   },
   {
    "title": {"es": "Sigo en la Base Tranquilidad", "en": "I am still at Tranquility Base"},
    "say": {"es": "Mi etapa de descenso sigue en el mismo lugar, con el espejo a pocos metros. Los científicos todavía le apuntan láseres desde la Tierra.", "en": "My descent stage is still in the same place, with the mirror a few metres away. Scientists still aim lasers at it from Earth."},
    "person": 1,
    "conflict": "«A pocos metros»: según docs/verificacion_ciencia.md:387-388 el sismómetro quedó a unos 17 m al sur del módulo y el espejo a unos 5 m del sismómetro."
   }
  ],
  "scale": [
   {
    "text": {"es": "Un poco más que el ancho de una cancha de vóley (9 m).", "en": "A little wider than a volleyball court (9 m)."},
    "fig": {"es": "9,4 m de pata a pata", "en": "9.4 m from leg to leg"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1969-059C", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"},
   {"label": "NSSDCA Master Catalog · 1969-059C-04", "url": "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04"},
   {"label": "NASA · Laser Beams Reflected Between Earth and Moon Boost Science", "url": "https://www.nasa.gov/missions/lro/laser-beams-reflected-between-earth-and-moon-boost-science/"}
  ],
  "quiz": [
   {
    "q": {"es": "¿Qué parte de Eagle sigue hoy en la Luna?", "en": "Which part of Eagle is still on the Moon today?"},
    "o": [
     {"es": "La cabina con el motor de regreso", "en": "The cabin with the return engine"},
     {"es": "Nada: volvió entera", "en": "Nothing: all of it came back"},
     {"es": "La etapa de descenso, con sus cuatro patas", "en": "The descent stage, with its four legs"}
    ],
    "a": 2,
    "x": {"es": "La mitad de abajo sirvió de plataforma de despegue y se quedó. La de arriba despegó con los astronautas.", "en": "The lower half served as a launch pad and stayed. The upper half lifted off with the astronauts."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "q": {"es": "¿En qué lugar de la Luna bajó?", "en": "Where on the Moon did it land?"},
    "o": [
     {"es": "En el Mar de la Tranquilidad", "en": "In the Sea of Tranquility"},
     {"es": "En el polo sur", "en": "At the south pole"},
     {"es": "En el lado oculto", "en": "On the far side"}
    ],
    "a": 0,
    "x": {"es": "Bajó el 20 de julio de 1969 en el Mar de la Tranquilidad. Por eso Armstrong dijo «Tranquility Base».", "en": "It landed on 20 July 1969 in the Sea of Tranquility. That is why Armstrong said “Tranquility Base”."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "q": {"es": "¿Qué instrumento de Apollo 11 se sigue usando desde la Tierra?", "en": "Which Apollo 11 instrument is still used from Earth?"},
    "o": [
     {"es": "La cámara de televisión", "en": "The TV camera"},
     {"es": "El panel de espejos para láser", "en": "The laser mirror panel"},
     {"es": "La antena de radio", "en": "The radio antenna"}
    ],
    "a": 1,
    "x": {"es": "Desde la Tierra le apuntan un láser y miden cuánto tarda en volver: así se sabe la distancia a la Luna. No necesita energía.", "en": "A laser is aimed at it from Earth and the return time is measured: that gives the distance to the Moon. It needs no power."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04"
   }
  ],
  "facts": [
   {
    "h": {"es": "Sin asientos", "en": "No seats"},
    "text": {"es": "Adentro no había asientos: los astronautas volaban de pie.", "en": "There were no seats inside: the astronauts flew standing up."},
    "scene": 1,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "h": {"es": "0,674° N · 23,473° E", "en": "0.674° N · 23.473° E"},
    "text": {"es": "Mi lugar en la Luna, medido desde una sonda en órbita.", "en": "My spot on the Moon, measured from an orbiting probe."},
    "scene": 2,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "h": {"es": "21 de julio de 1969", "en": "21 July 1969"},
    "text": {"es": "Mi etapa de ascenso despegó de la Luna y se reunió con la nave principal.", "en": "My ascent stage lifted off the Moon and rejoined the main ship."},
    "scene": 4,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "h": {"es": "Destino desconocido", "en": "Fate unknown"},
    "text": {"es": "A esa mitad la soltaron en órbita lunar. No se sabe dónde terminó; se supone que cayó sobre la Luna.", "en": "That half was released in lunar orbit. Nobody knows where it ended up; it is assumed to have crashed on the Moon."},
    "scene": 4,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "h": {"es": "4,2 m de ancho", "en": "4.2 m across"},
    "text": {"es": "El ancho de la etapa que quedó, sin contar sus cuatro patas.", "en": "The width of the stage that stayed, not counting its four legs."},
    "scene": 5,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   }
  ],
  "parts": [
   {
    "name": {"es": "Etapa de ascenso", "en": "Ascent stage"},
    "what": {"es": "La cabina de los dos astronautas, con su propio motor para volver a la órbita.", "en": "The two astronauts' cabin, with its own engine to return to orbit."},
    "found": {"es": "Despegó el 21 de julio de 1969. No se sabe dónde terminó.", "en": "It lifted off on 21 July 1969. Nobody knows where it ended up."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   },
   {
    "name": {"es": "Cuatro patas", "en": "Four legs"},
    "what": {"es": "Patas con platos redondos en la punta. Una tiene la escalera.", "en": "Legs with round footpads. One of them carries the ladder."},
    "found": {"es": "De punta a punta miden 9,4 m. Por esa escalera bajó Armstrong.", "en": "They span 9.4 m. Armstrong climbed down that ladder."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
   }
  ]
 },
 "apollo15": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Llevó el primer auto lunar, que exploró hasta 5 km alrededor del módulo.", "en": "It carried the first lunar rover, which explored up to 5 km around the lander."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Más que una media maratón (21,1 km), manejando sobre la Luna.", "en": "More than a half marathon (21.1 km), driving on the Moon."},
    "fig": {"es": "27,9 km recorridos con el rover lunar", "en": "27.9 km driven with the lunar rover"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1971-063C", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"}
  ]
 },
 "apollo17": {
  "voice": [
   {
    "title": null,
    "say": {"es": "El último módulo Apolo en la Luna. Dejó su etapa de descenso y una estación de instrumentos.", "en": "The last Apollo lander on the Moon. It left its descent stage and a station of instruments."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Unas tres cuartas partes de una maratón (42,2 km).", "en": "About three quarters of a marathon (42.2 km)."},
    "fig": {"es": "30 km recorridos y 110,5 kg de rocas", "en": "30 km driven and 110.5 kg of rocks"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1972-096C", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C"}
  ]
 },
 "viking1": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Empezó a transmitir su primera foto del suelo de Marte 25 segundos después de aterrizar. Funcionó hasta 1982.", "en": "It began sending its first picture of the Martian surface 25 seconds after landing. It worked until 1982."},
    "person": 3,
    "conflict": "B: la transmisión de la primera foto empezó 25 segundos después de aterrizar; A dice «Minutos después» (src/js/47-extra-data.js:85). docs/verificacion_ciencia.md:407 respalda los 25 s."
   }
  ],
  "scale": [
   {
    "text": {"es": "Más o menos lo que pesan dos autos grandes.", "en": "Roughly the weight of two large cars."},
    "fig": {"es": "3.530 kg con su orbitador y el combustible", "en": "3,530 kg with its orbiter and fuel"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1975-075C", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C"}
  ]
 },
 "pathfinder": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Un módulo y un rover pequeño, Sojourner. Tomaron imágenes e hicieron experimentos hasta que se perdió la comunicación.", "en": "A lander and a small rover, Sojourner. They took images and ran experiments until communications were lost."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Casi lo mismo que un bidón de agua de 10 litros.", "en": "About the same as a 10-litre jug of water."},
    "fig": {"es": "Sojourner pesaba 10,5 kg", "en": "Sojourner weighed 10.5 kg"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=MESURPR"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1996-068A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A"},
   {"label": "NSSDCA Master Catalog · MESURPR", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=MESURPR"}
  ]
 },
 "spirit": {
  "voice": [
   {
    "title": null,
    "say": {"es": "El gemelo de Opportunity. Aterrizó del otro lado de Marte y transmitió por última vez en 2010.", "en": "Opportunity's twin. It landed on the other side of Mars and last transmitted in 2010."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Del tamaño de un carrito de golf.", "en": "About the size of a golf cart."},
    "fig": {"es": "185 kg", "en": "185 kg"},
    "nasa": true,
    "src": "https://science.nasa.gov/mission/mer-opportunity/",
    "note": "B cita para Spirit la página de Opportunity (mer-opportunity); conviene citar la de Spirit o la de los dos rovers."
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 2003-027A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A"},
   {"label": "NASA Science · Opportunity", "url": "https://science.nasa.gov/mission/mer-opportunity/"}
  ]
 },
 "opportunity": {
  "hook": {
   "text": {"es": "Me mandaron por 90 días. Trabajé más de 14 años.", "en": "They sent me for 90 days. I worked for more than 14 years."},
   "conflict": "Duración: B «más de 14 años»; A «casi 15 años» (src/js/40-journey.js:20). Del aterrizaje a la última señal pasaron 14 años y 4 meses; hasta el fin de la misión, 15."
  },
  "voice": [
   {
    "title": {"es": "Me mandaron a buscar agua", "en": "They sent me to look for water"},
    "say": {"es": "Desde la órbita se veía en Marte un mineral que suele formarse en agua. Me mandaron a comprobarlo de cerca. El plan: 90 días marcianos.", "en": "From orbit, Mars showed a mineral that usually forms in water. They sent me to check it up close. The plan: 90 Martian days."},
    "person": 1
   },
   {
    "title": {"es": "Seis meses de viaje", "en": "Six months of travel"},
    "say": {"es": "Crucé el espacio entre la Tierra y Marte y terminé quieto dentro de un cráter chico, de unos 20 metros de ancho.", "en": "I crossed the space between Earth and Mars and came to rest inside a small crater, about 20 metres wide."},
    "person": 1
   },
   {
    "title": {"es": "Encontré la pista del agua", "en": "I found the trail of water"},
    "say": {"es": "Con los instrumentos de mi brazo estudié unas bolitas de hematita, un mineral que suele formarse en agua. Acá hubo agua hace muchísimo tiempo.", "en": "With the instruments on my arm I studied tiny spheres of hematite, a mineral that usually forms in water. There was water here a very long time ago."},
    "person": 1
   },
   {
    "title": {"es": "Una tormenta tapó el Sol", "en": "A storm covered the Sun"},
    "say": {"es": "En 2018 una tormenta de polvo muy fuerte cubrió el cielo. Mis paneles solares se quedaron sin luz y dejé de responder.", "en": "In 2018 a severe dust storm covered the sky. My solar panels were left without light and I stopped answering."},
    "person": 1
   },
   {
    "title": {"es": "Sigo en el Valle de la Perseverancia", "en": "I am still in Perseverance Valley"},
    "say": {"es": "Recorrí más de 45 kilómetros desde donde aterricé. Estoy quieto, cubierto de polvo, en el lugar donde me alcanzó la tormenta.", "en": "I drove more than 45 kilometres from where I landed. I am standing still, covered in dust, where the storm caught me."},
    "person": 1
   }
  ],
  "scale": [
   {
    "text": {"es": "Del tamaño de un carrito de golf.", "en": "About the size of a golf cart."},
    "fig": {"es": "185 kg", "en": "185 kg"},
    "nasa": true,
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   }
  ],
  "sources": [
   {"label": "NASA Science · Opportunity", "url": "https://science.nasa.gov/mission/mer-opportunity/"},
   {"label": "NASA Mars Exploration Rovers · Science results", "url": "https://mars.nasa.gov/mer/mission/science/results/"},
   {"label": "NSSDCA Master Catalog · 2003-027A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A"},
   {"label": "NSSDCA Master Catalog · 2003-032A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A"}
  ],
  "quiz": [
   {
    "q": {"es": "¿Para cuántos días marcianos estaba planeada la misión de Opportunity?", "en": "How many Martian days was Opportunity’s mission planned for?"},
    "o": [
     {"es": "14 días", "en": "14 days"},
     {"es": "90 días", "en": "90 days"},
     {"es": "5.000 días", "en": "5,000 days"}
    ],
    "a": 1,
    "x": {"es": "El plan era de 90 días marcianos. Trabajó más de 14 años.", "en": "The plan was 90 Martian days. It worked for more than 14 years."},
    "src": "https://science.nasa.gov/mission/mer-opportunity/",
    "conflict": "Duración: B «más de 14 años»; A «casi 15 años» (src/js/40-journey.js:20). Del aterrizaje a la última señal pasaron 14 años y 4 meses; hasta el fin de la misión, 15."
   },
   {
    "q": {"es": "¿Qué eran los «arándanos» que encontró?", "en": "What were the “blueberries” it found?"},
    "o": [
     {"es": "Bolitas de hematita, un mineral que suele formarse en agua", "en": "Tiny spheres of hematite, a mineral that usually forms in water"},
     {"es": "Restos de plantas", "en": "Remains of plants"},
     {"es": "Pedazos de hielo", "en": "Bits of ice"}
    ],
    "a": 0,
    "x": {"es": "Eran bolitas de hematita: la evidencia de que ahí hubo agua hace muchísimo tiempo.", "en": "They were hematite spheres: evidence that there was water there a very long time ago."},
    "src": "https://mars.nasa.gov/mer/mission/science/results/"
   },
   {
    "q": {"es": "¿Por qué dejó de responder en 2018?", "en": "Why did it stop answering in 2018?"},
    "o": [
     {"es": "Se le rompieron las ruedas", "en": "Its wheels broke"},
     {"es": "La apagaron desde la Tierra", "en": "It was switched off from Earth"},
     {"es": "Una tormenta de polvo dejó sin luz a sus paneles solares", "en": "A dust storm left its solar panels without light"}
    ],
    "a": 2,
    "x": {"es": "Una tormenta de polvo cubrió el cielo. Su última comunicación fue el 10 de junio de 2018.", "en": "A dust storm covered the sky. Its last communication was on 10 June 2018."},
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   }
  ],
  "facts": [
   {
    "h": {"es": "7 de julio de 2003", "en": "7 July 2003"},
    "text": {"es": "Despegué de Cabo Cañaveral en un cohete Delta II.", "en": "I lifted off from Cape Canaveral on a Delta II rocket."},
    "scene": 1,
    "src": "https://science.nasa.gov/mission/mer-opportunity/",
    "conflict": "Fecha de despegue: B 7 jul 2003 (fecha de Florida); A 8 jul 2003 03:18 UTC (src/page.html:516; FUENTES_misiones.md lo explica)."
   },
   {
    "h": {"es": "Una gemela: Spirit", "en": "A twin: Spirit"},
    "text": {"es": "Salió un mes antes, hacia el otro lado de Marte.", "en": "She left a month earlier, bound for the other side of Mars."},
    "scene": 1,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A"
   },
   {
    "h": {"es": "24 de enero de 2004", "en": "24 January 2004"},
    "text": {"es": "Aterricé en Meridiani Planum, cerca del ecuador de Marte.", "en": "I landed on Meridiani Planum, near the Martian equator."},
    "scene": 2,
    "src": "https://science.nasa.gov/mission/mer-opportunity/",
    "conflict": "Fecha de aterrizaje: B 24 ene 2004 (fecha local de EE. UU.); A 25 ene 2004 UTC (src/js/40-journey.js:18; FUENTES_misiones.md)."
   },
   {
    "h": {"es": "1,946° S · 354,473° E", "en": "1.946° S · 354.473° E"},
    "text": {"es": "El punto exacto donde quedé al aterrizar.", "en": "The exact spot where I came to rest."},
    "scene": 2,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
    "conflict": "Coordenadas: B 1,946° S, 354,473° E; A 1,9483° S, 354,47417° E (src/js/40-journey.js:18; FUENTES.md:48)."
   },
   {
    "h": {"es": "Agua ácida", "en": "Acidic water"},
    "text": {"es": "El agua que empapó la zona era ácida: un lugar difícil para la vida.", "en": "The water that soaked the area was acidic: a hard place for life."},
    "scene": 3,
    "src": "https://mars.nasa.gov/mer/mission/science/results/"
   },
   {
    "h": {"es": "13 de febrero de 2019", "en": "13 February 2019"},
    "text": {"es": "NASA dio la misión por terminada. Duré 60 veces más de lo previsto.", "en": "NASA declared the mission over. I lasted 60 times longer than planned."},
    "scene": 4,
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   },
   {
    "h": {"es": "Nadie volvió a buscarme", "en": "Nobody came back for me"},
    "text": {"es": "No hay forma de traerme. Soy parte del paisaje de Marte.", "en": "There is no way to bring me back. I am part of the Martian landscape."},
    "scene": 5,
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   }
  ],
  "parts": [
   {
    "name": {"es": "Seis ruedas", "en": "Six wheels"},
    "what": {"es": "Seis ruedas de metal sobre una suspensión que se adapta a las piedras.", "en": "Six metal wheels on a suspension that adapts to the rocks."},
    "found": {"es": "Me llevaron más de 45 km, de cráter en cráter.", "en": "They carried me more than 45 km, from crater to crater."},
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   },
   {
    "name": {"es": "Antenas", "en": "Antennas"},
    "what": {"es": "Con ellas recibía órdenes y mandaba fotos y datos a la Tierra.", "en": "With them I received commands and sent photos and data to Earth."},
    "found": {"es": "Mi última comunicación llegó el 10 de junio de 2018.", "en": "My last communication arrived on 10 June 2018."},
    "src": "https://science.nasa.gov/mission/mer-opportunity/"
   }
  ]
 },
 "phoenix": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Aterrizó cerca del polo norte de Marte, en una zona elegida por la cantidad de hielo en el suelo.", "en": "It landed near the north pole of Mars, at a site chosen for the amount of ice in the ground."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Más o menos lo que pesa un adolescente.", "en": "Roughly what a teenager weighs."},
    "fig": {"es": "55 kg de instrumentos científicos", "en": "55 kg of science instruments"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-034A"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 2007-034A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-034A"}
  ]
 },
 "insight": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Llevó un sismómetro y un medidor de calor para estudiar el interior de Marte.", "en": "It carried a seismometer and a heat probe to study the interior of Mars."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Más o menos el largo de una camioneta grande.", "en": "Roughly the length of a large pickup truck."},
    "fig": {"es": "Unos 6 m con los paneles abiertos", "en": "About 6 m with its panels open"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 2018-042A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A"}
  ]
 },
 "ingenuity": {
  "voice": [
   {
    "title": null,
    "say": {"es": "El primer vuelo con motor en otro planeta. Iba a hacer 5 vuelos de prueba; hizo 72.", "en": "The first powered flight on another planet. Planned for 5 test flights; it made 72."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Menos que una botella de agua de 2 litros.", "en": "Less than a 2-litre bottle of water."},
    "fig": {"es": "1,8 kg", "en": "1.8 kg"},
    "nasa": false,
    "src": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
   }
  ],
  "sources": [
   {"label": "NASA Science · Ingenuity Mars Helicopter", "url": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"}
  ]
 },
 "near": {
  "voice": [
   {
    "title": null,
    "say": {"es": "La primera nave en orbitar un asteroide y en posarse sobre uno.", "en": "The first spacecraft to orbit an asteroid and to touch down on one."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Caminando sin parar, tardarías casi 7 horas en cruzarlo.", "en": "Walking non-stop, it would take you almost 7 hours to cross it."},
    "fig": {"es": "Eros mide unos 33 km de largo", "en": "Eros is about 33 km long"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A",
    "conflict": "Largo de Eros: B 33 km (NSSDCA); A 34 km (src/js/40-journey.js:36; FUENTES.md:50 da 34,4 km). docs/verificacion_ciencia.md:266 anota la diferencia."
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 1996-008A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A"}
  ]
 },
 "dawn": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Orbitó dos mundos del cinturón de asteroides: Vesta y Ceres. Sigue dando vueltas alrededor de Ceres.", "en": "It orbited two worlds of the asteroid belt: Vesta and Ceres. It is still circling Ceres."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Un poco más que el largo de una cancha de vóley (18 m).", "en": "A little longer than a volleyball court (18 m)."},
    "fig": {"es": "19,7 m de punta a punta de sus paneles", "en": "19.7 m from tip to tip of its solar wings"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A"
   }
  ],
  "sources": [
   {"label": "NSSDCA Master Catalog · 2007-043A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A"}
  ]
 },
 "kepler": {
  "voice": [
   {
    "title": null,
    "say": {"es": "Un telescopio que encontró más de 2.600 planetas alrededor de otras estrellas, hasta quedarse sin combustible.", "en": "A telescope that found more than 2,600 planets around other stars, until it ran out of fuel."},
    "person": 3
   }
  ],
  "scale": [
   {
    "text": {"es": "Más o menos la altura de un chico de 10 años.", "en": "Roughly the height of a 10-year-old."},
    "fig": {"es": "Un espejo de 1,4 m de diámetro", "en": "A mirror 1.4 m across"},
    "nasa": false,
    "src": "https://science.nasa.gov/mission/kepler/"
   }
  ],
  "sources": [
   {"label": "NASA Science · Kepler", "url": "https://science.nasa.gov/mission/kepler/"}
  ]
 },
 "pioneer10": {
  "hook": {"text": {"es": "Fui la primera en cruzar el cinturón de asteroides. Todavía sigo viaje.", "en": "I was the first to cross the asteroid belt. I am still travelling."}},
  "voice": [
   {
    "title": {"es": "Nadie había ido tan lejos", "en": "Nobody had gone that far"},
    "say": {"es": "Fui la primera misión de NASA a los planetas de afuera. Nadie sabía si una nave podía cruzar el cinturón de asteroides sin romperse.", "en": "I was NASA's first mission to the outer planets. Nobody knew whether a spacecraft could cross the asteroid belt in one piece."},
    "person": 1
   },
   {
    "title": {"es": "Crucé el cinturón de asteroides", "en": "I crossed the asteroid belt"},
    "say": {"es": "Entré al cinturón en julio de 1972 y salí siete meses después. Recibí algunos golpes, menos de los esperados. Después vino Júpiter.", "en": "I entered the belt in July 1972 and came out seven months later. I took a few hits, fewer than expected. Then came Jupiter."},
    "person": 1
   },
   {
    "title": {"es": "Fui la primera en estudiar Júpiter", "en": "I was the first to study Jupiter"},
    "say": {"es": "Fotografié a Júpiter y a sus lunas, y medí su campo magnético y su radiación. Mi sensor magnético va en la punta de un brazo de 6,6 metros.", "en": "I photographed Jupiter and its moons, and measured its magnetic field and radiation. My magnetic sensor sits at the tip of a 6.6-metre boom."},
    "person": 1
   },
   {
    "title": {"es": "Mi señal se apagó", "en": "My signal faded out"},
    "say": {"es": "Mi energía viene de cuatro generadores nucleares que se gastan de a poco. Treinta años después del despegue, ya no alcanzó para mi transmisor.", "en": "My power comes from four nuclear generators that slowly run down. Thirty years after launch, it was no longer enough for my transmitter."},
    "person": 1
   },
   {
    "title": {"es": "Sigo viaje hacia Aldebarán", "en": "I am still heading for Aldebaran"},
    "say": {"es": "Voy en dirección a la estrella roja Aldebarán, a 68 años luz. Tardaría unos dos millones de años en llegar. Llevo una placa con un mensaje.", "en": "I am heading toward the red star Aldebaran, 68 light-years away. Getting there would take about two million years. I carry a plaque with a message."},
    "person": 1
   }
  ],
  "scale": [
   {
    "text": {"es": "Más o menos la décima parte de lo que gasta un secador de pelo.", "en": "Roughly a tenth of what a hair dryer uses."},
    "fig": {"es": "155 watts al despegar", "en": "155 watts at launch"},
    "nasa": false,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   }
  ],
  "sources": [
   {"label": "NASA Science · Pioneer 10", "url": "https://science.nasa.gov/mission/pioneer-10/"},
   {"label": "NSSDCA Master Catalog · 1972-012A", "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"}
  ],
  "quiz": [
   {
    "q": {"es": "¿Qué hizo Pioneer 10 antes que ninguna otra nave?", "en": "What did Pioneer 10 do before any other spacecraft?"},
    "o": [
     {"es": "Aterrizar en Marte", "en": "Land on Mars"},
     {"es": "Cruzar el cinturón de asteroides", "en": "Cross the asteroid belt"},
     {"es": "Dar la vuelta a la Luna", "en": "Fly around the Moon"}
    ],
    "a": 1,
    "x": {"es": "Entró al cinturón en julio de 1972 y salió siete meses después. Demostró que se podía cruzar.", "en": "It entered the belt in July 1972 and left seven months later. It proved the belt could be crossed."},
    "src": "https://science.nasa.gov/mission/pioneer-10/"
   },
   {
    "q": {"es": "¿De dónde sacaba la energía?", "en": "Where did its power come from?"},
    "o": [
     {"es": "De cuatro generadores nucleares", "en": "From four nuclear generators"},
     {"es": "De paneles solares", "en": "From solar panels"},
     {"es": "De baterías que se recargaban en Júpiter", "en": "From batteries recharged at Jupiter"}
    ],
    "a": 0,
    "x": {"es": "Tan lejos del Sol los paneles solares no servían. Sus generadores daban 155 watts al despegar.", "en": "So far from the Sun, solar panels were no use. Its generators gave 155 watts at launch."},
    "src": "https://science.nasa.gov/mission/pioneer-10/"
   },
   {
    "q": {"es": "¿Hacia qué estrella viaja?", "en": "Which star is it heading for?"},
    "o": [
     {"es": "La estrella Polar", "en": "Polaris"},
     {"es": "Sirio", "en": "Sirius"},
     {"es": "Aldebarán", "en": "Aldebaran"}
    ],
    "a": 2,
    "x": {"es": "Va hacia Aldebarán, a 68 años luz. Tardaría unos dos millones de años en llegar.", "en": "It is heading for Aldebaran, 68 light-years away. It would take about two million years to get there."},
    "src": "https://science.nasa.gov/mission/pioneer-10/"
   }
  ],
  "facts": [
   {
    "h": {"es": "2 de marzo de 1972", "en": "2 March 1972"},
    "text": {"es": "Despegué de Cabo Cañaveral en un cohete Atlas-Centaur.", "en": "I lifted off from Cape Canaveral on an Atlas-Centaur rocket."},
    "scene": 1,
    "src": "https://science.nasa.gov/mission/pioneer-10/",
    "conflict": "Fecha de despegue: B 2 mar 1972 (fecha de Florida, NASA Science); A 3 mar 1972 01:49 UTC (src/page.html:501; FUENTES_misiones.md lo explica)."
   },
   {
    "h": {"es": "Plan: 21 meses", "en": "Plan: 21 months"},
    "text": {"es": "Era lo que tenía que durar mi misión.", "en": "That is how long my mission was meant to last."},
    "scene": 1,
    "src": "https://science.nasa.gov/mission/pioneer-10/"
   },
   {
    "h": {"es": "15 de julio de 1972", "en": "15 July 1972"},
    "text": {"es": "Entré al cinturón de asteroides. Salí en febrero de 1973.", "en": "I entered the asteroid belt. I came out in February 1973."},
    "scene": 2,
    "src": "https://science.nasa.gov/mission/pioneer-10/"
   },
   {
    "h": {"es": "4 de diciembre de 1973", "en": "4 December 1973"},
    "text": {"es": "Mi punto más cercano a Júpiter: unos 200.000 km.", "en": "My closest point to Jupiter: about 200,000 km."},
    "scene": 2,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A",
    "conflict": "Distancia a Júpiter: B «unos 200.000 km» (NSSDCA, medida desde el centro del planeta); docs/verificacion_ciencia.md:213 recomienda «unos 130.000 km sobre las nubes» (NASA Science: 130.354 km)."
   },
   {
    "h": {"es": "Quince experimentos", "en": "Fifteen experiments"},
    "text": {"es": "Para medir campos magnéticos, viento solar, polvo, radiación y la atmósfera de Júpiter.", "en": "To measure magnetic fields, solar wind, dust, radiation and Jupiter's atmosphere."},
    "scene": 3,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   },
   {
    "h": {"es": "155 watts", "en": "155 watts"},
    "text": {"es": "La potencia de mis generadores al despegar: menos que un secador de pelo.", "en": "The power of my generators at launch: less than a hair dryer."},
    "scene": 4,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   },
   {
    "h": {"es": "Fuera de alcance", "en": "Out of reach"},
    "text": {"es": "Ya no se me puede escuchar ni mandar órdenes.", "en": "I can no longer be heard or commanded."},
    "scene": 5,
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   }
  ],
  "parts": [
   {
    "name": {"es": "Cuerpo e instrumentos", "en": "Body and instruments"},
    "what": {"es": "Una caja de seis lados con la computadora y los experimentos.", "en": "A six-sided box holding the computer and the experiments."},
    "found": {"es": "Llevaba quince experimentos, entre ellos el que tomó las fotos.", "en": "It carried fifteen experiments, including the one that took the pictures."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   },
   {
    "name": {"es": "Placa con mensaje", "en": "Message plaque"},
    "what": {"es": "Una placa de metal con dibujos. El dibujo de la app es una aproximación.", "en": "A metal plaque with drawings. The drawing in this app is an approximation."},
    "found": {"es": "Cuenta quién me hizo y de dónde salí, por si alguien me encuentra.", "en": "It tells who made me and where I came from, in case someone finds me."},
    "src": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A"
   }
  ]
 },
 "pioneer11": {}
};
