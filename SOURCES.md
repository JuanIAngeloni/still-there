# Sources

English translation of FUENTES.md, the team's working source list.

Everything the project uses that we did not write ourselves, with its origin. Data verified on 13 and 14 November 2026.

## Maps and images

| File | What it is | Origin | Use |
|---|---|---|---|
| `assets/textures/earth_day_2048.jpg` | Earth by day (Blue Marble, December 2004) | NASA Earth Observatory, `assets.science.nasa.gov/.../world.topo.bathy.200412.3x5400x2700.jpg` | NASA image, free to use with credit |
| `assets/textures/earth_night_2048.jpg` | Earth's night lights | Example from `three-globe` 2.31.0 (unpkg), based on NASA Black Marble | MIT (three-globe); NASA image |
| `assets/textures/mars.jpg` | Map of Mars | NASA 3D Resources, `github.com/nasa/NASA-3D-Resources` (Images and Textures/Mars) | NASA, free to use with credit |
| `assets/textures/jupiter.jpg` | Map of Jupiter | NASA 3D Resources (Images and Textures/Jupiter) | NASA |
| `assets/textures/stars_hipparcos.jpg` | Hipparcos star map | NASA 3D Resources (Images and Textures/Hipparcos Star Map) | NASA |
| `assets/textures/moon_lroc_color_2k.jpg` | Colour of the Moon (LRO) | NASA Scientific Visualization Studio, CGI Moon Kit, `svs.gsfc.nasa.gov/4720` | NASA SVS, free to use with credit |
| `assets/textures/moon_ldem_3_8bit.jpg` | Relief of the Moon (LOLA) | NASA SVS, CGI Moon Kit | NASA SVS |

## 3D models

From NASA 3D Resources (`github.com/nasa/NASA-3D-Resources`, 3D Models folder): Pioneer 10, NEAR Shoemaker, Dawn, Kepler (A), Apollo Lunar Module, Viking Lander, Ingenuity and InSight ("InSight Cruise Lander" file, deployed configuration). They came compressed with Draco; `tools/decode.html` decompresses them and `tools/build.py` converts them to glTF `.json`.

From science.nasa.gov (NASA 3D resources, free to use with credit under NASA's image and media usage guidelines), downloaded on 15 Nov 2026. `tools/pack_model.py` shrinks their textures and does not touch the geometry:

| Site file | Model | Origin | Credit | Our changes |
|---|---|---|---|---|
| `mer_hd` | Mars Exploration Rover (Spirit and Opportunity) | `science.nasa.gov/resource/mars-exploration-rovers-3d-model/` (`MER_static.glb`) | NASA/JPL-Caltech | Textures converted to 1024 px JPEG. A dust tint is added to Opportunity. |
| `delta2` | Delta II rocket | `science.nasa.gov/resource/delta-ii-3d-model/` (`Delta_II.glb`) | NASA VTAD | The model comes with 3 boosters and a 10-foot fairing. We repeat the booster up to 9 (6 that ignite on the ground and 3 in flight), enlarge them for the 7925H and add a hand-made Star 48B third stage (`src/js/63-nasa-rockets.js`). |
| `atlas401` | Atlas V 401 rocket | `science.nasa.gov/resource/atlas-v-401-3d-model/` (`Atlas_V_401.glb`) | NASA VTAD | No changes to the shape. |
| `atlas551` | Atlas V 551 rocket | `science.nasa.gov/resource/atlas-v-501-3d-model/` (`Atlas_V_551.glb`) | NASA VTAD | NASA does not publish the 541: we use the 551 and remove one booster. Its fairing carries the emblem of another mission. |

The rocket models carry the emblems painted on the real rocket (NASA, manufacturer, mission). They are part of the NASA model: we did not add them and they do not indicate sponsorship.

InSight: in the NASA model the seismometer, its dome and the heat probe come on the deck; the site places them on the ground, in front of the lander, which is how they ended up working (`insightDeploy` in `src/js/48-extra.js`). The distances are approximate.

The Saturn V, Titan IIIE-Centaur and Atlas-Centaur rockets do not have an official model that can be separated by stage: they are coded with AI help (`src/js/62-rockets.js`), with the dimensions and the sources noted at the top of that file. They carry no emblems or lettering.

## Launches and the fate of each stage

The steps of each launch, the T+ times and what happened to each part of the rocket and to the rest of the discarded equipment are in `src/js/66-stages-data.js`, which is generated with `tools/merge_stages.py` from `docs/etapas/*.json`. Each fact carries its link in the `src` field and appears on the site as "Source". The details of the search and the verification, including what could not be confirmed, are in `docs/etapas/*.md` (in English). Where we did not find the real time of a step, the site does not show the T+ clock. The climb curve (height and pitch) is illustrative, not the flight telemetry.

Surveyor, Phoenix, Mars Pathfinder with Sojourner, the entry capsule with its cruise stage, the parachute and the airbags are simplified models, coded with AI help (Claude) from simple parts (`src/js/30-surface.js`), with approximate dimensions. They are not NASA models.

## Trajectories

JPL Horizons (`ssd.jpl.nasa.gov/api/horizons.api`), position and velocity vectors in the J2000 ecliptic, downloaded with `tools/horizons.py`:

- Spacecraft: Mars Pathfinder (-530), Spirit (-254), Opportunity (-253), Phoenix (-84), NEAR Shoemaker (-93), Dawn (-203), Pioneer 10 (-23), Pioneer 11 (-24), Kepler (-227).
- Bodies: Earth, Moon, Mars, Jupiter, Saturn, Eros, Vesta and Ceres.
- Horizons warns that the Pioneer trajectories are suitable "for general historical purposes"; their 2026 positions are a Horizons extrapolation.
- "Right now" (`src/js/55-live.js`): distances, receding speed, signal time and whether it is day or night at each place, calculated for the current second with the same tables (13 November 2026 to 1 March 2027) and the computer's clock. Past that range the last data point is used and a notice is shown on screen.
- Explore (`src/js/60-explore.js`): today's positions, 13 November 2026 to 1 March 2027, for Earth, the Moon, Mars, Jupiter, Saturn, Eros, Ceres, Vesta, Kepler and the two Pioneers (`now_*` in `tools/horizons.py`). Dawn is drawn near Ceres, at 1,500 km, because its orbit today is not calculated; NEAR, on Eros at an approximate point.
- Surveyor 1 is not in Horizons: its trajectory is a reconstructed ellipse (`lunarConic` in `src/js/10-astro.js`) that starts at a height of 185 km and reaches the real landing site at the real time. This is stated on screen.
- The Mars entry (from 125 km to the ground) and the descents are approximate animations, not data.
- Orientation of Mars and Jupiter: IAU rotation model (Archinal et al.).

## Data for each mission

Launches, rockets and pads: see `FUENTES_misiones.md`.

| Item | Value | Source |
|---|---|---|
| Surveyor 1, Moon landing | 2 Jun 1966 06:17:36 UT; 2.4745° S, 43.3398° W; 11,240 images | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A |
| Surveyor 1, LRO photo | 2009 | https://lroc.im-ldi.com/posts/13 |
| Mars Pathfinder, landing | 4 Jul 1997 16:56:55 UT; 19.17° N, 33.21° W (USGS frame) | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A , https://science.nasa.gov/photojournal/mars-pathfinder-landing-site/ |
| Sojourner | about 100 m (330 ft), never more than 12 m (39 ft) from the lander | https://www.nasa.gov/history/25-years-ago-mars-pathfinder-launches-to-mars-to-deploy-sojourner-the-first-planetary-rover/ |
| Pathfinder seen by HiRISE | 21 Dec 2006 | https://www.jpl.nasa.gov/news/new-nasa-orbiter-sees-details-of-1997-pathfinder-site/ |
| Spirit | 14.5692° S, 175.4729° E; 7.73 km; stuck on 1 May 2009; last transmission 22 Mar 2010 | https://science.nasa.gov/mission/mer-spirit/ , https://www.jpl.nasa.gov/news/nasa-concludes-attempts-to-contact-mars-rover-spirit/ |
| Opportunity | 1.9483° S, 354.47417° E; 45.16 km; last communication 10 Jun 2018 | https://science.nasa.gov/mission/mer-opportunity/ , https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/ |
| Phoenix | 68.22° N, 125.75° W; last signal 2 Nov 2008; fallen panel in the 2010 photo | https://science.nasa.gov/mission/phoenix/ , https://www.jpl.nasa.gov/news/phoenix-mars-lander-is-silent-new-image-shows-damage/ |
| NEAR Shoemaker | touched down on Eros on 12 Feb 2001; Eros 34.4 × 11.2 × 11.2 km | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A , https://arcnav.psi.edu/urn:nasa:pds:context:target:asteroid.433_eros |
| Dawn | Vesta 2011-2012; Ceres since 6 Mar 2015; out of fuel on 31 Oct 2018; orbit of at least 20 years | https://www.nasa.gov/news-release/nasas-dawn-mission-to-asteroid-belt-comes-to-end/ |
| Pioneer 10 and 11 | 142.2 and 118.2 AU from the Sun on 14 Nov 2026 (JPL Horizons); Pioneer 10 heading towards Aldebaran | https://science.nasa.gov/mission/pioneer-10/ , https://science.nasa.gov/mission/pioneer-11/ |
| Kepler | last commands 15 Nov 2018, 94 million miles (151 million km) from Earth | https://www.jpl.nasa.gov/news/kepler-telescope-bids-goodnight-with-final-commands/ |
| Apollo 11 | 0.67416° N, 23.47314° E; the laser retroreflector is still in use | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C , https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html |

Differences between sources that we found: the position of Pathfinder (NSSDCA gives 19.33° N, 33.55° W; we use the USGS frame one, which matches the HiRISE photo); the time of Phoenix (23:38:38 UT at the spacecraft, 23:53:44 UT when the signal reached Earth); the end of Surveyor 1 (13 Jul 1966 end of mission, 7 Jan 1967 last contact).

## Questions, discoveries and parts (`src/js/45-learn-data.js`)

Verified on 15 November 2026. The full notes, with the differences between sources, are in `docs/verificacion_ciencia.md`.

| Mission | What is used | Sources |
|---|---|---|
| Surveyor 1 | The legs sank a few centimetres (JPL: about 5 cm; NASA 2001: less than an inch); the ground could support the Apollo module; camera with 11,240 photos; panel with 792 cells and flat antenna | https://www.jpl.nasa.gov/news/fifty-years-of-moon-dust-surveyor-1-was-a-pathfinder-for-apollo/ , https://ntrs.nasa.gov/citations/19670024848 , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A , https://science.nasa.gov/mission/surveyor-1/ |
| Mars Pathfinder | Rounded pebbles that suggest running water; Sojourner's APXS, more than 15 analyses, rocks with a lot of silica; IMP camera, more than 16,500 photos; solar petals | https://mars.nasa.gov/internal_resources/815/ , https://mars.nasa.gov/internal_resources/816/ , https://science.nasa.gov/resource/sojourners-apxs-wedge/ |
| Spirit | The broken right front wheel exposed soil with 90% silica (announced on 21 May 2007): hot springs or volcanic steam with water | https://www.jpl.nasa.gov/news/mars-rover-spirit-unearths-surprise-evidence-of-wetter-past/ , https://science.nasa.gov/resource/rovers-wheel-churns-up-bright-martian-soil/ , https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments/ |
| Opportunity | The "blueberries": the three ideas of 2004 and the hematite deposited in water; the "Homestake" gypsum vein (7 Dec 2011) | https://www.jpl.nasa.gov/news/opportunity-rover-finds-strong-evidence-meridiani-planum-was-wet/ , https://science.nasa.gov/photojournal/discovery-served-up-in-a-bowl/ , https://www.jpl.nasa.gov/news/nasa-mars-rover-finds-mineral-vein-deposited-by-water/ |
| Phoenix | White chunks that disappeared between sol 20 and sol 24: ice; perchlorate and non-acidic soil; "We have water" (31 Jul 2008); 2.35 m arm, cameras at about 2 m, weather mast | https://www.jpl.nasa.gov/news/bright-chunks-at-phoenix-landers-mars-site-must-have-been-ice/ , https://www.jpl.nasa.gov/news/nasa-phoenix-results-point-to-martian-climate-cycles/ , https://nssdc.gsfc.nasa.gov/planetary/text/phoenix_pr_20080731.txt , https://www.jpl.nasa.gov/news/press_kits/phoenix-landing.pdf |
| Pioneer 10 | Jupiter's radiation: false commands, lost photos of Io, data used for Voyager and Galileo; the Pioneer anomaly explained by heat (JPL, 2012); 2.74 m antenna, magnetometer at 6.6 m | https://science.nasa.gov/mission/pioneer-10/ , https://www.mdscc.nasa.gov/index.php/en/past-missions/pioneer10_eng/ , https://www.jpl.nasa.gov/news/study-finds-heat-is-source-of-pioneer-anomaly/ , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A |
| Pioneer 11 | F ring discovered with a 2.5 cm telescope; route tested for Voyager 2; Saturn's magnetic axis aligned to within 1 degree | https://www.giss.nasa.gov/pubs/abs/ge06000k.html , https://www.nasa.gov/history/45-years-ago-pioneer-11-launched-to-study-jupiter-and-saturn/ , https://ntrs.nasa.gov/citations/19800034947 , https://pwg.gsfc.nasa.gov/Education/wotherms.html , https://ntrs.nasa.gov/api/citations/19790021039/downloads/19790021039.pdf |
| NEAR Shoemaker | Eros with no magnetic field; gamma-ray spectrometer on the ground, at about 10 cm; Eros similar to the L and LL ordinary chondrites; four panels of 1.8 × 1.2 m | https://science.nasa.gov/mission/near-shoemaker/ , https://nssdc.gsfc.nasa.gov/planetary/text/near_pr_20010228.txt , https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A , Peplowski et al. 2015, doi:10.1111/maps.12434 |
| Dawn | Occator spots: sodium carbonate, the highest concentration of carbonates outside Earth; salty water at a depth of about 40 km; 8.3 m wings; 1.52 m antenna | https://jpl.nasa.gov/news/news.php?feature=6547 , https://www.jpl.nasa.gov/news/mystery-solved-bright-areas-on-ceres-come-from-salty-water-below/ , https://science.nasa.gov/mission/dawn/technology/spacecraft/ |
| Kepler | 84 parts per million; camera with 42 CCDs; more than 2,600 planets; more planets than stars; the most common size, between Earth and Neptune; panels of up to 1,100 W | https://ntrs.nasa.gov/api/citations/20100002027/downloads/20100002027.pdf , https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/ , https://science.nasa.gov/mission/kepler/ |

## Machines added from the work of Juan Ignacio Angeloni (`src/js/47-extra-data.js`, `src/js/48-extra.js`)

Apollo 11, Viking 1, InSight and Ingenuity appear only at their place today, with no journey from Earth. Their data were verified on 15 November 2026; the notes with the sources and the differences are in `docs/verificacion_ciencia.md`.

- Apollo 11: 20 Jul 1969 20:17:40 UT, 0.67416° N, 23.47314° E (NSSDCA). The module is the NASA 3D Resources model; only the descent stage is shown. The retroreflector and the seismometer are simplified models, placed near the module but not at their real distance.
- Viking 1: 20 Jul 1976 11:53:06 UT, 22.27° N, 47.95° W (NSSDCA, planetocentric). NASA 3D Resources model.
- InSight: 26 Nov 2018, 4.502° N, 135.623° E (Golombek et al. 2020). Official NASA model (see "3D models").
- Ingenuity: NASA 3D Resources model. The position used is the Perseverance landing site (18.44° N, 77.45° E); Ingenuity ended up a few kilometres away, in "Valinor Hills", and we did not find its coordinates on a NASA page.
- The light on these four surfaces is illustrative, not that of the moment of landing.
- Photos: NASA Image and Video Library, 38 images chosen by Juan with caption, credit and number (`src/js/46-photos.js`). Three are NASA illustrations and are marked as such.
- Audio: "The Eagle has landed" (NASA, https://www.nasa.gov/audio-and-ringtones/) and the first sound recorded on Mars by Perseverance (NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaéro, https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/).

## Launch videos (`src/js/46-videos-data.js`, `assets/video/`)

From the NASA Image and Video Library, downloaded on 15 November 2026 and trimmed with ffmpeg around liftoff (30 to 48 seconds). Details and searches in `docs/videos_lanzamiento.md`.

| Mission | Original video | Trim | Credit |
|---|---|---|---|
| Apollo 11 | https://images.nasa.gov/details/KSC_69-71212-sRGB (70 mm film, no sound) | 0:10 to 0:58 | NASA/MSFC |
| Phoenix | https://images.nasa.gov/details/ksc_080407_phx_launch | 0:00 to 0:40 | NASA |
| Dawn | https://images.nasa.gov/details/ksc_092707_dawn_launch | 0:02 to 0:40 | NASA |
| Kepler | https://images.nasa.gov/details/ksc_030609_kep_launch | 0:00 to 0:40 | NASA |
| Mars 2020 (carried Ingenuity) | "NASA's Perseverance Rover Launches to Mars", JPL-20200730-M2020f-0003 | 0:00 to 0:30, no sound (the original has added music) | NASA/JPL-Caltech |

The library has no liftoff video of Surveyor 1, Pioneer 10 and 11, Viking 1, NEAR Shoemaker, Mars Pathfinder, Spirit, Opportunity or InSight; for those, the animated broadcast remains.

## Third-party code

- three.js r128 (MIT), from cdnjs, and its `GLTFLoader` from jsDelivr.
- Geist and Doto fonts (SIL Open Font License), from Google Fonts.

## Mission sources

### Sources for the ten missions of the mock-up (verified on 13-Nov-2026)

All the pages were opened; Wikipedia was not used. Launch and arrival dates in UTC.

- NSSDCA: `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=<ID>`
- NASA Science: `https://science.nasa.gov/mission/<slug>/`

| Mission | NSSDCA ID / slug | Launch (UTC) | Rocket | Pad | Arrival | Last contact |
|---|---|---|---|---|---|---|
| Surveyor 1 | 1966-045A / surveyor-1 | 30 May 1966, 14:41 | Atlas-Centaur (AC-10) | LC-36A | Moon landing 2 Jun 1966 | 7 Jan 1967 (NASA Science); NSSDCA gives the end of mission as 13 Jul 1966 |
| Pioneer 10 | 1972-012A / pioneer-10 | 3 Mar 1972, 01:49 (2 Mar in Florida) | Three-stage Atlas-Centaur (TE-M-364-4) | LC-36A | Jupiter 4 Dec 1973 | Last signal 23 Jan 2003 |
| Pioneer 11 | 1973-019A / pioneer-11 | 6 Apr 1973, 02:11 | Atlas-Centaur (AC-30) | LC-36B | Jupiter 3 Dec 1974 | Last contact 30 Sep 1995; last engineering data 24 Nov 1995 |
| NEAR Shoemaker | 1996-008A / near-shoemaker | 17 Feb 1996, 20:43 | Delta 7925-8 | LC-17B | Eros orbit 14 Feb 2000 | 28 Feb 2001 |
| Mars Pathfinder | 1996-068A / mars-pathfinder | 4 Dec 1996, 06:58 | Delta II 7925 | LC-17B | Landing 4 Jul 1997 | 27 Sep 1997 |
| Spirit | 2003-027A / mer-spirit | 10 Jun 2003, 17:58 | Delta II 7925 | SLC-17A | Landing 4 Jan 2004 | Last transmission 22 Mar 2010 |
| Opportunity | 2003-032A / mer-opportunity | 8 Jul 2003, 03:18 (7 Jul in Florida) | Delta II 7925H | SLC-17B | Landing 25 Jan 2004 | 10 Jun 2018 |
| Phoenix | 2007-034A / phoenix | 4 Aug 2007, 09:26 | Delta II 7925 | SLC-17A | Landing 25 May 2008 | Last signal 2 Nov 2008 |
| Dawn | 2007-043A | 27 Sep 2007, 11:34 | Delta II 7925H (the press kit calls it 2925H-9.5) | SLC-17B | Vesta orbit 16 Jul 2011 | 31 Oct 2018 |
| Kepler | 2009-011A | 7 Mar 2009, 03:49 (6 Mar 22:49 EST) | Delta II 7925-10L | SLC-17B | No destination: orbit around the Sun | Last commands 15 Nov 2018 |

#### Other sources

- Surveyor 1, local time: NASA quotes it in EST (UTC-5), "9:41 EST". NASA TN D-4580: https://ntrs.nasa.gov/api/citations/19680014866/downloads/19680014866.pdf
- Mars Pathfinder (PDS): https://pds.nasa.gov/data/mpfl-m-imp-2-edr-v1.0/mpim_0002/document/mission.htm
- MER press kit: https://www.jpl.nasa.gov/news/press_kits/merlaunch.pdf
- Phoenix press kit: https://www.jpl.nasa.gov/news/press_kits/phoenix-launch-presskit.pdf
- Dawn press kit: https://www.jpl.nasa.gov/news/press_kits/dawn-launch.pdf
- Kepler press kit: https://www.jpl.nasa.gov/news/press_kits/Kepler-presskit-2-19-smfile.pdf
- ULA, Dawn: https://www.ulalaunch.com/docs/default-source/news-items/dii_dawn_mob.pdf
- Dawn, launch and end: https://www.jpl.nasa.gov/news/dawn-spacecraft-successfully-launched/ and https://www.jpl.nasa.gov/news/nasas-dawn-mission-to-asteroid-belt-comes-to-end/
- Kepler, launch, retirement and last commands: https://www.jpl.nasa.gov/news/nasas-kepler-mission-rockets-to-space-in-search-of-other-earths/ , https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/ , https://www.jpl.nasa.gov/news/kepler-telescope-bids-goodnight-with-final-commands/
- Phoenix, end: https://www.jpl.nasa.gov/news/mars-phoenix-lander-finishes-successful-work-on-red-planet/

#### Delta II boosters (press kits)

- Nine solid boosters; six ignite on the ground and three in the air.
- 7925: the first six are released at 66 and 67 s; the last three at 131.5 s (MER press kit, Spirit).
- 7925H: they are released at 80.5 and 81.5 s; the last three at 159.5 s (ULA, Dawn).

#### Differences between official sources

- Pioneer 10: NSSDCA gives the launch as 3 Mar 1972 (UTC); NASA Science writes "March 2, 1972" with the same UT time (local date).
- Kepler: NSSDCA rounds to 03:50 UT; JPL gives 22:49 EST (03:49 UT).
- Surveyor 1: end of mission 13 Jul 1966 (NSSDCA) versus last contact 7 Jan 1967 (NASA Science).
