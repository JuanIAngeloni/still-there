/* Videos reales de lanzamientos, de la NASA Image and Video Library (images.nasa.gov).
   Recortes hechos con ffmpeg alrededor del despegue; el original está en images.nasa.gov/details/<nasa_id>.
   Para las otras nueve misiones la biblioteca no tiene video del despegue (ver docs/videos_lanzamiento.md). */
var VIDEOS_DATA={
  apollo11:{f:'assets/video/apollo11.mp4',nasa_id:'KSC_69-71212-sRGB',credit:'NASA/MSFC',
    cap:{es:'Despegue del Saturn V con Apollo 11, el 16 de julio de 1969, filmado en película de 70 mm. La película no tiene sonido.',
         en:'Liftoff of the Saturn V carrying Apollo 11, 16 July 1969, shot on 70 mm film. The film has no sound.'}},
  phoenix:{f:'assets/video/phoenix.mp4',nasa_id:'ksc_080407_phx_launch',credit:'NASA',
    cap:{es:'Despegue del Delta II con Phoenix desde Cabo Cañaveral, de madrugada, el 4 de agosto de 2007. Habla el relator de NASA, en inglés.',
         en:'Liftoff of the Delta II carrying Phoenix from Cape Canaveral, before dawn on 4 August 2007, with NASA\'s launch commentator.'}},
  dawn:{f:'assets/video/dawn.mp4',nasa_id:'ksc_092707_dawn_launch',credit:'NASA',
    cap:{es:'Despegue del Delta II Heavy con Dawn, el 27 de septiembre de 2007. Habla el relator de NASA, en inglés.',
         en:'Liftoff of the Delta II Heavy carrying Dawn, 27 September 2007, with NASA\'s launch commentator.'}},
  kepler:{f:'assets/video/kepler.mp4',nasa_id:'ksc_030609_kep_launch',credit:'NASA',
    cap:{es:'Despegue del Delta II con Kepler, la noche del 6 de marzo de 2009 (hora de Florida). Habla el relator de NASA, en inglés.',
         en:'Liftoff of the Delta II carrying Kepler, on the night of 6 March 2009 (Florida time), with NASA\'s launch commentator.'}},
  ingenuity:{f:'assets/video/ingenuity.mp4',nasa_id:'JPL-20200730-M2020f-0003-NASA’s Perseverance Rover Launches',credit:'NASA/JPL-Caltech',
    cap:{es:'Despegue del Atlas V con el rover Perseverance, que llevaba a Ingenuity debajo, el 30 de julio de 2020. Le sacamos el sonido porque el video original tiene música agregada.',
         en:'Liftoff of the Atlas V carrying the Perseverance rover, with Ingenuity tucked underneath, 30 July 2020. We removed the sound because the original video has added music.'}}
};
