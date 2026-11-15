/* Datos verificados de las cuatro máquinas que se suman (fuentes en docs/verificacion_ciencia.md). */
var NEW_MACHINES = {

  apollo11: {
    land: '1969-07-20T20:17:40Z',
    site: [0.67416, 23.47314],
    silent: {
      es: 'Última señal: agosto de 1969. El sismómetro dejó de responder a las órdenes el 27 de agosto. El espejo no usa energía y se sigue usando.',
      en: "Last signal: August 1969. The seismometer stopped answering commands on August 27. The mirror needs no power and is still in use."
    },
    lastYear: 1969,
    place: { es: 'Mar de la Tranquilidad (Base Tranquilidad), Luna', en: 'Sea of Tranquility (Tranquility Base), Moon' },
    today: {
      es: [
        'Armstrong y Aldrin pasaron 21 horas y 36 minutos en la Luna.',
        'El panel de espejos tiene 100 cubos de vidrio que devuelven la luz hacia donde vino.',
        'Hoy la distancia a la Luna se mide con un error de pocos milímetros: más o menos el grosor de una cáscara de naranja.'
      ],
      en: [
        "Armstrong and Aldrin spent 21 hours and 36 minutes on the Moon.",
        "The mirror panel has 100 glass corner cubes that send light back where it came from.",
        "Today the distance to the Moon is measured to within a few millimetres: about the thickness of an orange peel."
      ]
    },
    q: {
      es: {
        s: 'Un telescopio en la Tierra dispara un pulso de láser hacia el panel de espejos que dejó Apollo 11. La luz viaja hasta la Luna, rebota en el panel y vuelve al telescopio.',
        q: '¿Cuánto tarda la luz en ir y volver?',
        o: ['Una décima de segundo', 'Unos 2,5 segundos', 'Unos 8 minutos'],
        a: 1,
        x: 'La luz es lo más rápido que existe, pero la Luna está muy lejos: el viaje de ida y vuelta tarda unos 2,5 segundos en promedio. Midiendo ese tiempo se calcula la distancia.'
      },
      en: {
        s: "A telescope on Earth fires a laser pulse at the mirror panel left by Apollo 11. The light travels to the Moon, bounces off the panel and comes back to the telescope.",
        q: "How long does the light take to go there and back?",
        o: ['A tenth of a second', 'About 2.5 seconds', 'About 8 minutes'],
        a: 1,
        x: "Light is the fastest thing there is, but the Moon is very far away: the round trip takes about 2.5 seconds on average. Timing it gives the distance."
      }
    },
    learned: {
      es: 'Gracias al panel de espejos de Apollo 11 y a otros parecidos que se dejaron después, sabemos que la Luna se aleja de la Tierra unos 3,8 cm por año y que tiene un núcleo fluido.',
      en: "Thanks to the Apollo 11 mirror panel and others like it left later, we know that the Moon moves away from Earth by about 3.8 cm a year and that it has a fluid core."
    },
    parts: [
      { where: 'The lower half of the lander: the wide base with the four legs, under the cabin. It is the only part of Eagle still on the Moon.',
        es: { t: 'Etapa de descenso', d: 'Llevaba el motor para bajar suave y después sirvió de plataforma de despegue para la cabina. Por eso se quedó en la Luna.' },
        en: { t: 'Descent stage', d: "It carried the engine for the soft landing and then served as the launch pad for the cabin. That is why it stayed on the Moon." } },
      { where: 'On the ground south of the lander, a few steps from the seismometer: a flat panel on a small stand, tilted to face Earth.',
        es: { t: 'Espejo para láser', d: 'Un panel de cubos de vidrio que devuelve la luz de un láser al mismo lugar de la Tierra de donde salió. No necesita energía.' },
        en: { t: 'Laser mirror', d: "A panel of glass cubes that sends laser light back to the same place on Earth it came from. It needs no power." } },
      { where: 'On the ground about 17 m south of the lander: a box with two flat solar panels sticking out to the sides.',
        es: { t: 'Sismómetro', d: 'Medía los temblores de la Luna y funcionaba con la luz del Sol que juntaban sus dos paneles.' },
        en: { t: 'Seismometer', d: "It measured moonquakes and ran on sunlight collected by its two panels." } }
    ],
    audio: {
      es: 'Neil Armstrong por radio a Houston, el 20 de julio de 1969, unos 18 segundos después de posarse en la Luna: «Houston, Tranquility Base here. The Eagle has landed». Está en inglés.',
      en: "Neil Armstrong radioing Houston on July 20, 1969, about 18 seconds after touching down on the Moon: “Houston, Tranquility Base here. The Eagle has landed.”"
    }
  },

  viking1: {
    land: '1976-07-20T11:53:06Z',
    site: [22.27, -47.95],
    silent: {
      es: 'Última señal: noviembre de 1982. Una orden equivocada enviada desde la Tierra cortó la comunicación.',
      en: "Last signal: November 1982. A faulty command sent from Earth cut off communication."
    },
    lastYear: 1982,
    place: { es: 'Chryse Planitia (Llanura Dorada), Marte', en: 'Chryse Planitia (Golden Plain), Mars' },
    today: {
      es: [
        'Trabajó en Marte más de 6 años, desde julio de 1976 hasta noviembre de 1982.',
        'En 1982 lo rebautizaron Estación Thomas Mutch, en honor al jefe del equipo de sus cámaras.',
        'Entre los dos módulos Viking mandaron unas 4.500 fotos de la superficie de Marte.'
      ],
      en: [
        "It worked on Mars for more than 6 years, from July 1976 to November 1982.",
        "In 1982 it was renamed the Thomas Mutch Memorial Station, after the leader of its camera team.",
        "Together, the two Viking landers sent back about 4,500 photos of the Martian surface."
      ]
    },
    q: {
      es: {
        s: '20 de julio de 1976. Viking 1 acaba de posarse en Marte. A los 25 segundos, su cámara empieza a transmitir la primera foto tomada en la superficie de Marte.',
        q: '¿Qué muestra esa primera foto?',
        o: ['El suelo justo al lado: piedras, polvo y una de sus propias patas', 'Un paisaje lejano con montañas en el horizonte', 'El cielo de Marte con el Sol'],
        a: 0,
        x: 'El centro de la foto está a unos 1,4 m de la cámara. Se ven piedras, arena y polvo, y a la derecha el plato de una de sus patas, con un poco de polvo que cayó al aterrizar.'
      },
      en: {
        s: "July 20, 1976. Viking 1 has just touched down on Mars. Just 25 seconds later, its camera starts sending the first picture ever taken on the surface of Mars.",
        q: "What does that first picture show?",
        o: ['The ground right next to it: rocks, dust and one of its own feet', 'A faraway landscape with mountains on the horizon', 'The Martian sky with the Sun'],
        a: 0,
        x: "The centre of the picture is about 1.4 m from the camera. It shows rocks, sand and dust, and on the right the footpad of one of its legs, with a little dust that fell on it during landing."
      }
    },
    learned: {
      es: 'Con su brazo, Viking 1 juntó tierra marciana y la puso en sus pequeños laboratorios. Uno buscó moléculas orgánicas, los ladrillos de los seres vivos, y no encontró; los experimentos de biología no dieron ninguna prueba clara de vida.',
      en: "With its arm, Viking 1 scooped Martian soil into its small onboard labs. One looked for organic molecules, the building blocks of living things, and found none; the biology experiments gave no clear proof of life."
    },
    parts: [
      { where: 'The long arm that sticks out from the middle of one of the long sides of the base, with a small scoop at its tip.',
        es: { t: 'Brazo con pala', d: 'Juntaba tierra con una pequeña pala y la llevaba a los laboratorios que el módulo tenía adentro.' },
        en: { t: 'Sampler arm', d: "It dug up soil with a small scoop and carried it to the labs inside the lander." } },
      { where: 'Two upright cylinders standing on top of the base, near one of its long sides.',
        es: { t: 'Dos cámaras', d: 'Giraban para fotografiar todo alrededor. Con ellas llegó la primera foto tomada en el suelo de Marte.' },
        en: { t: 'Two cameras', d: "They turned to photograph all the way around. They sent the first picture taken on the ground of Mars." } },
      { where: 'The round dish on a short pole near one edge of the base.',
        es: { t: 'Antena parabólica', d: 'Se podía orientar hacia la Tierra para mandar datos y recibir órdenes.' },
        en: { t: 'Dish antenna', d: "It could be pointed at Earth to send data and receive commands." } }
    ]
  },

  insight: {
    land: '2018-11-26T19:52:59Z',
    site: [4.502, 135.623],
    silent: {
      es: 'Última señal: 15 de diciembre de 2022. El polvo sobre sus paneles solares fue dejando sin energía a sus baterías.',
      en: "Last signal: December 15, 2022. Dust on its solar panels slowly left its batteries without power."
    },
    lastYear: 2022,
    place: { es: 'Elysium Planitia, Marte', en: 'Elysium Planitia, Mars' },
    today: {
      es: [
        'Registró 1.319 sismos en Marte.',
        'El 4 de mayo de 2022 detectó un sismo de magnitud 5: el más grande medido hasta entonces en otro planeta.',
        'Cada uno de sus dos paneles solares redondos mide 2,2 m de diámetro.'
      ],
      en: [
        "It recorded 1,319 marsquakes.",
        "On May 4, 2022 it detected a magnitude 5 quake: the largest measured on another planet up to then.",
        "Each of its two round solar panels is 2.2 m across."
      ]
    },
    q: {
      es: {
        s: 'El medidor de calor de InSight, apodado «el topo», era una punta de 40 cm que se clavaba sola en el suelo a martillazos. El plan era llegar a 5 m de profundidad para medir el calor que sale del interior de Marte.',
        q: '¿Qué pasó cuando lo intentó?',
        o: ['Llegó a los 5 m sin problemas', 'Chocó con una capa de hielo y se rompió', 'El suelo se pegaba en terrones y quedó apenas enterrado bajo la superficie'],
        a: 2,
        x: 'El suelo de ese lugar se pegaba en terrones y el topo no lograba avanzar. Quedó apenas debajo de la superficie, pero igual midió cómo el suelo guarda y conduce el calor.'
      },
      en: {
        s: "InSight's heat probe, nicknamed “the mole”, was a 40 cm spike that hammered itself into the ground. The plan was to reach 5 m deep to measure the heat coming out of the inside of Mars.",
        q: "What happened when it tried?",
        o: ['It reached 5 m with no trouble', 'It hit a layer of ice and broke', 'The soil stuck together in clumps and it ended up just under the surface'],
        a: 2,
        x: "The soil there stuck together in clumps and the mole could not move forward. It ended up just below the surface, but it still measured how the soil holds and carries heat."
      }
    },
    learned: {
      es: 'Con su sismómetro SEIS, InSight escuchó los temblores de Marte y permitió ver por primera vez su interior profundo: una corteza más delgada de lo esperado, un manto y un centro fundido.',
      en: "With its SEIS seismometer, InSight listened to marsquakes and gave the first look at the deep interior of Mars: a crust thinner than expected, a mantle and a molten core."
    },
    parts: [
      { where: 'On the ground in front of the lander, where the arm set it down. In photos it sits under a dome-shaped cover.',
        es: { t: 'Sismómetro SEIS', d: 'Un instrumento muy sensible que el brazo apoyó sobre el suelo para sentir los temblores de Marte.' },
        en: { t: 'SEIS seismometer', d: "A very sensitive instrument that the arm placed on the ground to feel the shaking of Mars." } },
      { where: 'The jointed arm mounted on the top deck, on the side facing the instruments on the ground.',
        es: { t: 'Brazo robótico', d: 'Levantó el sismómetro y el medidor de calor de la cubierta y los apoyó en el suelo marciano.' },
        en: { t: 'Robotic arm', d: "It lifted the seismometer and the heat probe off the deck and set them down on the Martian ground." } },
      { where: 'The two big round panels on opposite sides of the deck, like two wide wings.',
        es: { t: 'Paneles solares', d: 'Convertían la luz del Sol en electricidad. El polvo que se fue juntando encima terminó apagando al módulo.' },
        en: { t: 'Solar panels', d: "They turned sunlight into electricity. The dust that slowly piled up on them finally shut the lander down." } }
    ]
  },

  ingenuity: {
    land: '2021-02-18T20:55:00Z',
    site: [18.44, 77.45],
    silent: {
      es: 'Último vuelo: 18 de enero de 2024. En ese vuelo se rompieron sus palas y ya no pudo volar más.',
      en: "Last flight: January 18, 2024. Its rotor blades broke on that flight and it could never fly again."
    },
    lastYear: 2024,
    place: { es: 'Cráter Jezero, Marte (en un lugar apodado Valinor Hills)', en: 'Jezero crater, Mars (at a spot nicknamed Valinor Hills)' },
    today: {
      es: [
        'Hizo 72 vuelos, cuando estaba pensado para hasta 5 vuelos de prueba.',
        'En total voló 17 km durante más de 2 horas, y llegó hasta 24 m de altura.',
        'Su primer vuelo, el 19 de abril de 2021, duró 39,1 segundos a 3 m de altura.'
      ],
      en: [
        "It made 72 flights, when it was planned for up to 5 test flights.",
        "In total it flew 17 km for more than 2 hours, and climbed as high as 24 m.",
        "Its first flight, on April 19, 2021, lasted 39.1 seconds at 3 m high."
      ]
    },
    q: {
      es: {
        s: 'El aire de Marte es muy fino: tiene apenas el 1 % de la densidad del aire en la superficie de la Tierra. Ingenuity pesa 1,8 kg y tiene que despegar en ese aire.',
        q: '¿Qué hicieron sus constructores para que pudiera volar?',
        o: ['Le pusieron pequeños cohetes debajo para empujarlo', 'Le dieron palas largas que giran muy rápido: unas 2.400 vueltas por minuto o más', 'Le pusieron alas fijas, como a un avión, para despegar desde el rover'],
        a: 1,
        x: 'Sus dos rotores tienen palas de 1,2 m que giran en sentidos opuestos, unas 2.400 vueltas por minuto o más: muchas veces más rápido que un helicóptero de pasajeros en la Tierra.'
      },
      en: {
        s: "The air on Mars is very thin: only about 1% as dense as the air at the surface of Earth. Ingenuity weighs 1.8 kg and has to take off in that air.",
        q: "What did its builders do so it could fly?",
        o: ['They put small rockets under it to push it up', 'They gave it long blades that spin very fast: about 2,400 turns a minute or more', 'They gave it fixed wings, like an airplane, to take off from the rover'],
        a: 1,
        x: "Its two rotors have 1.2 m blades that spin in opposite directions at about 2,400 turns a minute or more: many times faster than a passenger helicopter on Earth."
      }
    },
    learned: {
      es: 'Su cámara de navegación miraba hacia abajo y se guiaba por las piedritas del suelo. En el vuelo 72, sobre ondas de arena lisas, no encontró detalles para seguir, y esa lección sirve para diseñar los próximos helicópteros marcianos.',
      en: "Its navigation camera looked down and steered by tracking pebbles on the ground. On flight 72, over smooth sand ripples, it found too few details to follow, a lesson for designing future Mars helicopters."
    },
    parts: [
      { where: 'The two pairs of long blades stacked one above the other on the central mast, between the solar panel and the body.',
        es: { t: 'Dos rotores', d: 'Cuatro palas de 1,2 m en dos rotores que giran en sentidos opuestos para levantarlo en el aire fino de Marte.' },
        en: { t: 'Two rotors', d: "Four 1.2 m blades on two rotors that spin in opposite directions to lift it in the thin Martian air." } },
      { where: 'The flat panel at the very top, above the rotors.',
        es: { t: 'Panel solar', d: 'Cargaba seis baterías con la luz del Sol, lo justo para un vuelo corto por día marciano.' },
        en: { t: 'Solar panel', d: "It charged six batteries with sunlight, enough for one short flight per Martian day." } },
      { where: 'On the underside of the small box-shaped body, looking down at the ground.',
        es: { t: 'Cámara de navegación', d: 'Una cámara en blanco y negro que miraba el suelo para que el helicóptero supiera cómo se estaba moviendo.' },
        en: { t: 'Navigation camera', d: "A black-and-white camera that watched the ground so the helicopter knew how it was moving." } }
    ]
  }
};
