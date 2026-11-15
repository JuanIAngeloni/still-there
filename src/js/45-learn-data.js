/* ---------- lo que se aprende con cada máquina: pregunta, descubrimiento y piezas ----------
   q: pregunta para adivinar antes de mirar (o: opciones, a: la correcta, x: la explicación).
   learned: qué aprendimos gracias a la máquina. parts: piezas que se marcan sobre el modelo:
   p = metros en los ejes del modelo (modelos propios), f = fracción de la caja del modelo,
   n = nombre de una pieza dentro del modelo de NASA. Cada dato tiene su fuente en FUENTES.md. */
var LEARN={
  pioneer10:{
    q:{es:{s:'Lejos, más allá de Saturno, los navegantes vieron que las dos Pioneer se frenaban un poquito más de lo que explica la gravedad del Sol.',q:'¿Qué las frenaba?',
           o:['Restos de combustible que se escapaban por los caños','Una física nueva que contradice a Einstein','El calor de sus propios aparatos y de sus fuentes de energía nuclear, que las empujaba muy suave'],a:2,
           x:'En 2012 un estudio de JPL calculó el calor que soltaban sus instrumentos y sus fuentes de plutonio. Ese empujoncito explicaba el freno de las dos naves.'},
       en:{s:'Far beyond Saturn, navigators saw both Pioneers slowing down a tiny bit more than the Sun\'s gravity could explain.',q:'What was slowing them down?',
           o:['Leftover fuel leaking out of the pipes','New physics that breaks Einstein\'s theory','Heat from their own instruments and nuclear power units, pushing them very gently'],a:2,
           x:'In 2012 a JPL study worked out the heat given off by the instruments and the plutonium power units. That tiny push explained the slowdown of both spacecraft.'}},
    learned:{es:'Al pasar junto a Júpiter en diciembre de 1973, sus instrumentos midieron cinturones de radiación tan fuertes que le causaron órdenes falsas y le arruinaron las fotos de la luna Ío. Esas medidas sirvieron para diseñar las naves Voyager y Galileo.',
             en:'As it flew past Jupiter in December 1973, its instruments measured radiation belts so strong that they caused false commands and spoiled its pictures of the moon Io. Those measurements were used to design the Voyager and Galileo spacecraft.'},
    parts:[
      {n:'AO_dish',es:{t:'Antena',d:'Un plato de 2,74 m que hablaba con la Tierra. Detrás está la caja con los instrumentos.'},en:{t:'Antenna',d:'A 2.74 m dish that talked to Earth. The box with the instruments sits behind it.'}},
      {n:'AO_rtg',f:[1,0.5,0.5],es:{t:'Energía nuclear',d:'Van en dos brazos, lejos del cuerpo. Hacen electricidad con el calor del plutonio, porque en Júpiter la luz del Sol es muy débil para usar paneles solares.'},en:{t:'Nuclear power',d:'The power units sit on two arms, away from the body. They make electricity from the heat of plutonium, because at Jupiter sunlight is too weak for solar panels.'}},
      {tip:'AO_dish',es:{t:'Magnetómetro',d:'En la punta del brazo más largo y fino, a 6,6 m del centro, lejos del magnetismo de la propia nave.'},en:{t:'Magnetometer',d:'At the tip of the longest, thinnest arm, 6.6 m from the centre, away from the spacecraft\'s own magnetism.'}}]},
  pioneer11:{
    q:{es:{s:'Pioneer 11 midió por primera vez el campo magnético de Saturno. El de la Tierra está inclinado unos 11 grados respecto de su eje de giro.',q:'¿Cómo está inclinado el de Saturno?',
           o:['Más o menos como el de la Tierra, unos 11 grados','Casi alineado con su eje de giro: menos de 1 grado','Acostado, casi en ángulo recto'],a:1,
           x:'Los datos de su magnetómetro dieron menos de 1 grado. Saturno es el raro: los imanes de la Tierra y de Júpiter están inclinados más o menos lo mismo.'},
       en:{s:'Pioneer 11 measured Saturn\'s magnetic field for the first time. Earth\'s field is tilted about 11 degrees from its spin axis.',q:'How is Saturn\'s tilted?',
           o:['About the same as Earth\'s, around 11 degrees','Almost lined up with its spin axis: less than 1 degree','Lying on its side, almost at a right angle'],a:1,
           x:'Its magnetometer data gave less than 1 degree. Saturn is the odd one out: Earth\'s and Jupiter\'s magnets are tilted by about the same amount.'}},
    learned:{es:'En septiembre de 1979 su pequeño telescopio, de 2,5 cm, descubrió un anillo nuevo de Saturno: el anillo F. Además pasó por afuera de los anillos para probar que ese camino era seguro, porque la Voyager 2 tenía que seguir la misma ruta hacia Urano y Neptuno.',
             en:'In September 1979 its small 2.5 cm telescope discovered a new ring around Saturn: the F ring. It also flew outside the rings to test that the path was safe, because Voyager 2 had to follow the same route on to Uranus and Neptune.'},
    parts:[
      {n:'AO_dish',es:{t:'Antena',d:'Un plato de 2,74 m que hablaba con la Tierra. Detrás está la caja con los instrumentos, entre ellos el telescopio que encontró el anillo F.'},en:{t:'Antenna',d:'A 2.74 m dish that talked to Earth. Behind it is the instrument box, including the telescope that found the F ring.'}},
      {tip:'AO_dish',es:{t:'Magnetómetro',d:'En la punta del brazo largo y fino. Con él se midió por primera vez el campo magnético de Saturno.'},en:{t:'Magnetometer',d:'At the tip of the long, thin arm. It measured Saturn\'s magnetic field for the first time.'}},
      {n:'AO_rtg',f:[1,0.5,0.5],es:{t:'Energía nuclear',d:'Dos brazos con fuentes de plutonio. En Saturno daban unos 100 W, lo que gasta una lamparita.'},en:{t:'Nuclear power',d:'Two arms with plutonium power units. At Saturn they gave about 100 W, about what a light bulb uses.'}}]},
  near:{
    q:{es:{s:'NEAR llevaba un magnetómetro y buscó un campo magnético en Eros, desde la órbita y también apoyada en el suelo.',q:'¿Qué encontró?',
           o:['Un campo magnético fuerte, como el de la Tierra','Uno débil, como el de un imán de heladera','Ningún campo magnético que pudiera medir'],a:2,
           x:'Eros no tiene campo magnético: no se detectó ni desde la órbita ni en el suelo.'},
       en:{s:'NEAR carried a magnetometer and looked for a magnetic field at Eros, from orbit and also sitting on the ground.',q:'What did it find?',
           o:['A strong magnetic field, like Earth\'s','A weak one, like a fridge magnet','No magnetic field it could detect'],a:2,
           x:'Eros has no magnetic field: none was detected from orbit or on the ground.'}},
    learned:{es:'Después de aterrizar, su espectrómetro de rayos gamma quedó a unos 10 cm del suelo y midió de qué está hecho Eros: fue el primer experimento así en la superficie de otro cuerpo. Eros resultó parecido a los meteoritos de roca más comunes que caen en la Tierra.',
             en:'After landing, its gamma-ray spectrometer sat about 10 cm above the ground and measured what Eros is made of: the first experiment of its kind on the surface of another body. Eros turned out to be like the most common stony meteorites that fall on Earth.'},
    parts:[
      {f:[0.5,0.03,0.5],es:{t:'Instrumentos',d:'En esta punta van el espectrómetro de rayos gamma, la cámara y el telémetro láser.'},en:{t:'Instruments',d:'This end holds the gamma-ray spectrometer, the camera and the laser rangefinder.'}},
      {f:[0.5,0.7,0.2],es:{t:'Paneles solares',d:'Cuatro paneles de 1,8 por 1,2 m. NEAR fue la primera nave que usó paneles solares más allá de la órbita de Marte. Probablemente quedó apoyada sobre sus puntas.'},en:{t:'Solar panels',d:'Four panels, 1.8 by 1.2 m. NEAR was the first spacecraft to rely on solar panels beyond the orbit of Mars. It probably came to rest on their tips.'}},
      {f:[0.5,0.97,0.5],es:{t:'Antena',d:'Un plato de 1,5 m en la otra punta, para hablar con la Tierra. En su centro va el magnetómetro.'},en:{t:'Antenna',d:'A 1.5 m dish on the other end, for talking to Earth. The magnetometer sits at its centre.'}}]},
  dawn:{
    q:{es:{s:'Al acercarse a Ceres, un mundo oscuro, Dawn vio unas manchas muy brillantes dentro del cráter Occator.',q:'¿Qué eran?',
           o:['Hielo fresco de un cometa que chocó ahí','Sobre todo sal, que dejó agua salada que subió desde adentro de Ceres','Metal brillante de un asteroide de hierro que chocó'],a:1,
           x:'Su espectrómetro mostró que es carbonato de sodio, una sal. Con las medidas de gravedad de su última órbita se supo que el agua salada viene de un depósito a unos 40 km de profundidad.'},
       en:{s:'As it approached Ceres, a dark world, Dawn saw very bright spots inside Occator crater.',q:'What were they?',
           o:['Fresh ice from a comet that crashed there','Mostly salt, left by salty water that rose from inside Ceres','Shiny metal from a crashed iron asteroid'],a:1,
           x:'Its spectrometer showed it is sodium carbonate, a salt. Gravity measurements from its last orbit showed the salty water comes from a reservoir about 40 km down.'}},
    learned:{es:'Su espectrómetro VIR encontró en Occator la mayor concentración de minerales de carbonato vista fuera de la Tierra. Ceres, que parecía una roca seca, tiene agua salada en un depósito profundo debajo de la superficie.',
             en:'Its VIR spectrometer found in Occator the highest concentration of carbonate minerals ever seen outside Earth. Ceres, which looked like a dry rock, has salty water in a deep reservoir below its surface.'},
    parts:[
      {f:[0.82,0.5,0.5],es:{t:'Alas solares',d:'Dos alas de 8,3 m; de punta a punta, casi 20 m. Su electricidad movía los motores iónicos, que empujan con xenón muy despacio pero durante años.'},en:{t:'Solar wings',d:'Two 8.3 m wings, almost 20 m from tip to tip. Their electricity ran the ion engines, which push with xenon very gently but for years.'}},
      {f:[0.5,0.55,0.95],es:{t:'Antena',d:'Un plato de 1,52 m para mandar a la Tierra las fotos y las medidas.'},en:{t:'Antenna',d:'A 1.52 m dish for sending pictures and measurements back to Earth.'}}]},
  kepler:{
    q:{es:{s:'Kepler buscaba estrellas que se oscurecen un poquito cuando un planeta pasa por delante.',q:'Si un planeta como la Tierra pasa delante de una estrella como el Sol, ¿cuánto se oscurece la estrella?',
           o:['Queda con la mitad de brillo','Un 10 % más oscura','Menos de una centésima del 1 %'],a:2,
           x:'Apenas 84 partes por millón, durante unas horas: como un mosquito que pasa delante del faro de un auto. Por eso Kepler miraba las mismas estrellas sin parar.'},
       en:{s:'Kepler looked for stars that dim a tiny bit when a planet passes in front of them.',q:'When an Earth-size planet crosses a Sun-like star, how much dimmer does the star get?',
           o:['Half as bright','About 10% dimmer','Less than one hundredth of 1%'],a:2,
           x:'Only 84 parts per million, for a few hours: like a mosquito crossing a car\'s headlight. That is why Kepler stared at the same stars nonstop.'}},
    learned:{es:'Con una cámara de 42 sensores, la más grande que NASA había llevado al espacio, vigiló unas 100.000 estrellas y encontró más de 2.600 planetas. Aprendimos que hay más planetas que estrellas en nuestra galaxia, y que el tamaño más común está entre el de la Tierra y el de Neptuno: un tipo de planeta que no existe en nuestro sistema solar.',
             en:'With a 42-sensor camera, the largest NASA had flown in space, it watched about 100,000 stars and found more than 2,600 planets. We learned there are more planets than stars in our galaxy, and that the most common size is between Earth and Neptune: a kind of planet our solar system does not have.'},
    parts:[
      {f:[0.5,0.92,0.5],es:{t:'Telescopio',d:'El tubo junta la luz de las estrellas. El parasol inclinado, en la boca, lo protege del Sol.'},en:{t:'Telescope',d:'The tube gathers starlight. The slanted sunshade at its mouth keeps the Sun out.'}},
      {n:'shiny_panel',es:{t:'Paneles solares',d:'Cuatro paneles fijos que daban hasta 1.100 W y además le hacían sombra al telescopio.'},en:{t:'Solar panels',d:'Four fixed panels that made up to 1,100 W and also shaded the telescope.'}},
      {n:'dish_AO',es:{t:'Antena',d:'En la base. Cada unos 30 días la nave entera giraba para apuntarla a la Tierra y mandar los datos.'},en:{t:'Antenna',d:'At the base. About every 30 days the whole spacecraft turned to point it at Earth and send its data.'}}]},
  surveyor1:{
    q:{es:{s:'Antes de 1966, algunos científicos temían que la Luna estuviera cubierta de un polvo profundo y blando. Después de alunizar, Surveyor 1 apuntó su cámara a su propia pata.',q:'¿Cuánto se había hundido la pata?',
           o:['Tanto que desapareció: la Luna está cubierta de metros de polvo','Apenas unos centímetros: el suelo aguantaba una nave','Nada: rebotó sobre roca pelada y no dejó marca'],a:1,
           x:'Las patas se hundieron apenas unos centímetros. El suelo era blando arriba y más firme debajo: el módulo de Apolo, más pesado, tampoco se iba a hundir.'},
       en:{s:'Before 1966, some scientists feared the Moon was covered in deep, fluffy dust. After landing, Surveyor 1 turned its camera on its own footpad.',q:'How deep had the footpad sunk?',
           o:['So deep it disappeared: the Moon is covered in metres of dust','Only a few centimetres: the ground could hold a spacecraft','Not at all: it bounced on bare rock and left no mark'],a:1,
           x:'The pads sank only a few centimetres. The soil was soft on top and firmer below, so the heavier Apollo lander would not sink either.'}},
    learned:{es:'Sus patas tenían amortiguadores y sensores que midieron el golpe del alunizaje, y su cámara fotografió cómo habían quedado apoyadas. Así se supo por primera vez que el suelo de la Luna podía sostener al módulo lunar de Apolo, de más de 15 toneladas.',
             en:'Its legs had shock absorbers and sensors that measured the landing, and its camera photographed how they had settled. That was the first proof that the lunar soil could hold up the Apollo lunar module, which weighed more than 15 tonnes.'},
    parts:[
      {p:[1.775,0.08,1.025],es:{t:'Plato de la pata',d:'Uno en la punta de cada una de las tres patas. Aguantaron el golpe y mostraron qué tan firme era el suelo.'},en:{t:'Footpad',d:'One at the end of each of the three legs. They took the landing shock and showed how firm the ground was.'}},
      {p:[0.6,1.95,0.45],es:{t:'Cámara',d:'Una cámara de televisión que sacó las 11.240 fotos, entre ellas las de su propia pata.'},en:{t:'Camera',d:'A television camera that took the 11,240 pictures, including views of its own footpad.'}},
      {p:[0.2,2.64,0],es:{t:'Panel y antena',d:'Arriba del mástil: un panel solar de 792 celdas y una antena plana que mandaba las fotos a la Tierra.'},en:{t:'Panel and antenna',d:'On top of the mast: a solar panel with 792 cells and a flat antenna that sent the pictures to Earth.'}}]},
  pathfinder:{
    q:{es:{s:'Las cámaras vieron piedritas redondeadas en el suelo, y rocas con piedritas metidas adentro y huecos donde antes había otras.',q:'¿Cómo se redondearon esas piedritas?',
           o:['Rodando y gastándose en agua que corría, hace mucho tiempo','Las golpearon los airbags de Pathfinder al rebotar','Las molieron las ruedas de Sojourner'],a:0,
           x:'Las piedritas también están atrapadas dentro de rocas viejas, así que ya eran redondas mucho antes de que llegara una nave. Según NASA, eso sugiere que se formaron en agua que corría, en un pasado más cálido de Marte.'},
       en:{s:'The cameras saw rounded pebbles on the ground, and rocks with pebbles stuck inside them and holes where others used to be.',q:'How did those pebbles get round?',
           o:['Rolled and worn smooth in running water, long ago','Pathfinder\'s airbags hit them while bouncing','Sojourner\'s wheels ground them down'],a:0,
           x:'The pebbles are also locked inside old rocks, so they were round long before any spacecraft arrived. NASA says this suggests they formed in running water, during a warmer past on Mars.'}},
    learned:{es:'Sojourner llevaba atrás un sensor, el APXS, que apoyó contra más de 15 rocas y suelos para medir de qué estaban hechos. Algunas rocas tenían mucha sílice y resultaron distintas de los meteoritos de Marte que conocíamos en la Tierra.',
             en:'Sojourner carried a sensor at the back, the APXS, which it held against more than 15 rocks and soils to measure what they were made of. Some rocks were rich in silica and turned out different from the Martian meteorites known on Earth.'},
    parts:[
      {p:[0,1.24,0],es:{t:'Cámara',d:'En el mástil del centro. Sacó más de 16.500 fotos en color y en 3D, y ayudaba a manejar a Sojourner.'},en:{t:'Camera',d:'On the central mast. It took more than 16,500 pictures in colour and 3D, and helped steer Sojourner.'}},
      {p:[0.38,0.14,0.66],es:{t:'Pétalos solares',d:'Tres pétalos que se abrieron como una flor. Sus celdas solares daban la energía, y Sojourner bajó por una rampa desde uno de ellos.'},en:{t:'Solar petals',d:'Three petals that opened like a flower. Their solar cells gave the power, and Sojourner rolled down a ramp from one of them.'}},
      {p:[2.4,0.42,1.6],es:{t:'Sojourner',d:'Mide 65 cm de largo. Atrás lleva el APXS, el sensor que medía la química de las rocas.'},en:{t:'Sojourner',d:'It is 65 cm long. At the back is the APXS, the sensor that measured the chemistry of the rocks.'}}]},
  spirit:{
    q:{es:{s:'A Spirit se le rompió una rueda de adelante y ya no giraba: raspaba el suelo como un arado. Detrás quedó una franja de tierra muy blanca, de justo debajo de la superficie. Spirit la tocó con el sensor químico de su brazo.',q:'¿Qué era?',
           o:['Agua congelada','Sílice casi pura, el mineral del ópalo y del vidrio','Polvo nuevo que acababa de traer el viento'],a:1,
           x:'Era casi 90 % sílice: no era hielo, y tampoco polvo nuevo, porque estaba debajo de la capa de arriba. Para hacer sílice tan pura hace falta agua: aguas termales o vapor de volcanes.'},
       en:{s:'One of Spirit\'s front wheels broke and stopped turning: it scraped the ground like a plough. Behind it lay a strip of very white soil from just below the surface. Spirit touched it with the chemistry sensor on its arm.',q:'What was it?',
           o:['Frozen water','Almost pure silica, the mineral of opal and glass','Fresh dust just blown in by the wind'],a:1,
           x:'It was about 90% silica: not ice, and not fresh dust, because it lay under the top layer. Making silica that pure takes water: hot springs or volcanic steam vents.'}},
    learned:{es:'La rueda rota fue la que dejó a la vista la sílice, en 2007. En la Tierra, los lugares donde se forma, como las aguas termales, están llenos de vida microscópica. Fue una de las mejores pruebas de que en el cráter Gusev hubo agua.',
             en:'The broken wheel is what uncovered the silica, in 2007. On Earth, the places where it forms, such as hot springs, teem with microscopic life. It was some of the best evidence that there was water in Gusev crater.'},
    parts:[
      {f:[0.48,0.28,0.06],es:{t:'Brazo',d:'En la punta: el sensor químico APXS, el que midió la sílice, un microscopio, un espectrómetro de hierro y una amoladora para rocas.'},en:{t:'Arm',d:'At its tip: the APXS chemistry sensor, the one that measured the silica, a microscope, an iron spectrometer and a rock grinder.'}},
      {f:[0.52,0.97,0.22],es:{t:'Cámaras',d:'Dos cámaras a color arriba del mástil, a unos 1,5 m del suelo, para sacar panorámicas.'},en:{t:'Cameras',d:'Two colour cameras on top of the mast, about 1.5 m above the ground, for panoramas.'}},
      {f:[0.8,0.5,0.55],es:{t:'Paneles solares',d:'Le daban la energía con la luz del Sol.'},en:{t:'Solar panels',d:'They gave it power from sunlight.'}}]},
  opportunity:{
    q:{es:{s:'En las capas de roca del cráter Eagle, las cámaras de Opportunity vieron muchas bolitas grises del tamaño de un perdigón, que llamaron «arándanos». Estaban repartidas por toda la roca, no juntas en una capa.',q:'¿Cómo se formaron?',
           o:['Gotas de roca fundida que tiró un volcán','Gotas de roca fundida que salpicó el choque de un meteorito','Minerales que crecieron despacio dentro de roca empapada de agua'],a:2,
           x:'Esas eran las tres ideas que se discutieron en 2004. Como las bolitas no estaban juntas en una capa, el volcán y el meteorito quedaron menos probables. Después sus espectrómetros mostraron que son de hematita depositada en agua.'},
       en:{s:'In the rock layers of Eagle crater, Opportunity\'s cameras saw lots of BB-sized grey balls, nicknamed "blueberries". They were spread all through the rock, not packed into one layer.',q:'How did they form?',
           o:['Drops of molten rock thrown out by a volcano','Drops of molten rock splashed out by a meteorite impact','Minerals that slowly grew inside rock soaked with water'],a:2,
           x:'Those were the three ideas scientists weighed in 2004. Because the balls were not packed into one layer, the volcano and the impact looked less likely. Later its spectrometers showed they are hematite deposited in water.'}},
    learned:{es:'En 2011, en el borde del cráter Endeavour, encontró una veta blanca del ancho de un pulgar. Su sensor químico mostró que era sulfato de calcio, probablemente yeso: lo dejó el agua al correr por grietas bajo el suelo. El investigador principal la llamó una prueba clarísima de agua.',
             en:'In 2011, on the rim of Endeavour crater, it found a white vein about as wide as a thumb. Its chemistry sensor showed it was calcium sulfate, probably gypsum, left by water flowing through cracks underground. The principal investigator called it a slam-dunk case for water.'},
    parts:[
      {f:[0.48,0.28,0.06],es:{t:'Brazo',d:'En la punta: la amoladora RAT, que raspa la roca para ver por dentro, el sensor químico, un microscopio y un espectrómetro de hierro.'},en:{t:'Arm',d:'At its tip: the RAT grinder, which scrapes rock to see inside, the chemistry sensor, a microscope and an iron spectrometer.'}},
      {f:[0.52,0.97,0.22],es:{t:'Cámaras',d:'Las cámaras a color arriba del mástil, a unos 1,5 m. Fotografiaron la veta de yeso.'},en:{t:'Cameras',d:'The colour cameras on top of the mast, about 1.5 m up. They photographed the gypsum vein.'}},
      {f:[0.8,0.5,0.55],es:{t:'Paneles solares',d:'Le daban la energía. En 2018 una tormenta de polvo tapó el Sol y no volvió a despertar.'},en:{t:'Solar panels',d:'They gave it power. In 2018 a dust storm blocked the Sun and the rover never woke up again.'}}]},
  phoenix:{
    q:{es:{s:'El brazo robótico agrandó una zanja y dejó a la vista unos trozos blancos del tamaño de un dado. Cuatro días marcianos después, la cámara volvió a mirar y varios ya no estaban.',q:'¿Qué eran?',
           o:['Cristales de sal','Hielo de agua que pasó directo a vapor','Piedritas blancas'],a:1,
           x:'La sal o las piedritas no desaparecen en unos días; el hielo sí. Al quedar expuesto al aire fino y seco de Marte, pasó de sólido a gas sin derretirse.'},
       en:{s:'The robotic arm widened a trench and uncovered some dice-sized white chunks. Four Martian days later the camera looked again, and several were gone.',q:'What were they?',
           o:['Salt crystals','Water ice that turned straight into vapour','Small white pebbles'],a:1,
           x:'Salt or pebbles would not vanish in a few days; ice would. Exposed to the thin, dry Martian air, it went from solid to gas without melting.'}},
    learned:{es:'Su brazo llevó tierra a un laboratorio de química sobre la cubierta, que la mezcló con agua. Encontró perclorato, una sal que atrapa el agua del aire, en una tierra que no era ácida. Además, su horno TEGA confirmó que había agua: «Tenemos agua», anunció el equipo en julio de 2008.',
             en:'Its arm carried soil to a chemistry lab on the deck, which mixed it with water. It found perchlorate, a salt that pulls water from the air, in soil that was not acidic. Its TEGA oven also confirmed water: "We have water," the team announced in July 2008.'},
    parts:[
      {p:[1.72,0.2,-1.62],es:{t:'Brazo con pala',d:'Mide 2,35 m. Con su pala cavó las zanjas y llevó muestras a los instrumentos de la cubierta.'},en:{t:'Arm and scoop',d:'It is 2.35 m long. Its scoop dug the trenches and carried samples to the instruments on the deck.'}},
      {p:[0.25,2.08,0.3],es:{t:'Cámaras',d:'Dos cámaras en un mástil, a unos 2 m del suelo. Sacaron las fotos de antes y después del hielo.'},en:{t:'Cameras',d:'Two cameras on a mast about 2 m above the ground. They took the before-and-after pictures of the ice.'}},
      {p:[-0.3,2.15,-0.35],es:{t:'Mástil del clima',d:'El punto más alto del módulo. De arriba cuelga una banderita: la cámara la fotografía para medir el viento.'},en:{t:'Weather mast',d:'The lander\'s highest point. A small telltale hangs from the top: the camera photographs it to measure the wind.'}}]}
};
