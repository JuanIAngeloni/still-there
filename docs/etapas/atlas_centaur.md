# Atlas-Centaur launch sequences: research notes

Missions: `surveyor1` (rocket key `atlasCentaur`, flight AC-10), `pioneer10` and `pioneer11` (rocket key `atlasCentaurTE`, flights AC-27 and AC-30).
Data file: `docs/etapas/atlas_centaur.json`. Researched 15 Nov 2026. Wikipedia was not used as a source.

Conventions used in the JSON
- `t` is seconds after liftoff (2-inch motion). Surveyor 1 times are the flown values from the NASA flight report. Pioneer times are the observed "mark event" GMT minus the observed liftoff GMT (JPL tracking reports).
- One `src` per item (the shape allows one URL). Where a text also uses a detail from a second NASA document, that second URL is listed here.
- `where:"unknown"` is used whenever no document I read states where the piece ended, even when physics leaves little doubt (see "Not verified").
- Numbers converted by me: ft to m (x 0.3048), lb to kg (x 0.45359237), n mi to km (x 1.852), statute mi to km (x 1.609344), ft/s and m/s to km/h.

## Sources (all NASA)

| Tag | Document | URL |
|---|---|---|
| TND | NASA TN D-4580, "Atlas-Centaur Flight Performance for Surveyor Mission A", Lewis Research Center, May 1968 (post-flight report of AC-10) | https://ntrs.nasa.gov/api/citations/19680014866/downloads/19680014866.pdf (record: https://ntrs.nasa.gov/citations/19680014866) |
| PK66 | NASA News Release 66-127, "First Surveyor Test Mission Set for May 30" (Surveyor A press kit), 26 May 1966 | https://ntrs.nasa.gov/api/citations/19660022877/downloads/19660022877.pdf |
| JPL1 | JPL Technical Memorandum 33-584 Vol. I, "Tracking and Data System Support for the Pioneer Project: Pioneer 10, prelaunch planning through second trajectory correction", 1 Apr 1973 | https://ntrs.nasa.gov/api/citations/19730011461/downloads/19730011461.pdf |
| JPL2 | JPL Technical Memorandum 33-584 Vol. II, same series for Pioneer 11, 15 Mar 1975 | https://ntrs.nasa.gov/api/citations/19750013263/downloads/19750013263.pdf |
| KSC | KSC TR-1230 (NASA TM X-69267), "Atlas/Centaur Pioneer G Operations Summary", 2 Apr 1973 (pre-launch plan for AC-30) | https://ntrs.nasa.gov/api/citations/19730017158/downloads/19730017158.pdf |
| AMES | NASA TM X-69125, "Pioneer F and G mission to Jupiter" (Ames brochure, 1973) | https://ntrs.nasa.gov/api/citations/19730012132/downloads/19730012132.pdf |
| REL72 | NASA News Release 72-25, "Pioneer F Mission to Jupiter", 20 Feb 1972 (only the 7-page general release is on NTRS) | https://ntrs.nasa.gov/api/citations/19720011181/downloads/19720011181.pdf |
| NSSDCA-S1 | NSSDCA master catalog, Surveyor 1 | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A |
| NSSDCA-P10 | NSSDCA master catalog, Pioneer 10 | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A |
| JPLNEWS | JPL release "Surveyor I Mission", 28 Jul 1966 | https://www.jpl.nasa.gov/news/surveyor-i-mission/ |
| SCI-S1 | science.nasa.gov, Surveyor 1 | https://science.nasa.gov/mission/surveyor-1/ |
| SCI-P10 | science.nasa.gov, Pioneer 10 | https://science.nasa.gov/mission/pioneer-10/ |
| SCI-P11 | science.nasa.gov, Pioneer 11 | https://science.nasa.gov/mission/pioneer-11/ |
| HIST-P10 | nasa.gov history, "50 Years Ago: Pioneer 10 Launches to Explore Jupiter" | https://www.nasa.gov/history/50-years-ago-pioneer-10-launches-to-explore-jupiter/ |

How the PDFs were read: text layer extracted with pdftotext; tables that the OCR scrambled were rendered as page images and read by eye (TND fig. IV-1; PK66 p. 23, 24 and 38; JPL1 Table 4, Table 18, Table 20; JPL2 Table 17, Table 19; KSC p. 1, 2, 7 to 12).

## Hints from the task: verified or corrected

- "Atlas stage and a half: the booster section with two engines is jettisoned, the sustainer keeps burning". Verified. TND: two booster engines, one sustainer and two verniers "were ignited simultaneously on the ground"; booster engines "were jettisoned 3.1 seconds after booster engine cutoff"; sustainer and verniers "continued to burn".
- "Surveyor 1 flew a direct-ascent trajectory". Verified. TND summary: "injected into its lunar intercept trajectory in a single burn (direct ascent) mission". PK66 says the same.
- "Surveyor 1 dropped its main retro-rocket and its altitude marking radar". Verified (PK66, NSSDCA-S1, JPLNEWS). Where they ended: on the Moon by inference only, location not stated anywhere I read.
- "Pioneer third stage and Centaur: did they leave the solar system?" The Centaur did NOT even leave Earth on either flight: tracking after its retro manoeuvre gives negative C3 (bound, elliptical Earth orbit). The TE-M-364-4 third stage left Earth on the same hyperbolic escape path as the spacecraft; nothing I read from NASA says what happened to it afterwards.
- "Atlas SLV-3C / Centaur D-1A for both Pioneers". Partly wrong for AC-30: KSC states "The ATLAS stage (S/N 5011D) for the AC-30 mission is the SLV-3D" and calls its Centaur "the new CENTAUR D-1A". See Conflicts.

## ROCKETS_INFO

### atlasCentaur (Atlas LV-3C / Centaur D, AC-10)
- Height: "The composite vehicle was 113 feet in length and weighed 302 248 pounds at lift-off" (TND, section III). PK66 fact sheet p. 23: "Liftoff Height: 113 feet", "Liftoff Weight: 303,000 lbs". 113 ft = 34.44 m, used 34.4. 302,248 lb = 137,097 kg, used "about 137 tons".
- Model names: "an LV-3C Atlas booster combined with a Centaur second stage" (PK66, launch vehicle section); "Atlas Centaur (AC-10 / Atlas D no. 290 / Centaur D)" (SCI-S1).
- First flight of the family: Centaur "was first flight tested, unsuccessfully, on May 8, 1962"; first success "AC-2 on November 27, 1963" (TND, Introduction). `firstYear` = 1962 (first flight, a failure). If the site wants the first successful flight, use 1963.
- First operational flight: AC-10 "was the first operational Atlas-Centaur vehicle" (TND); "making its first operational flight" (PK66).
- Blurb: Centaur "initiated ... in 1958 as the nation's first high-energy rocket vehicle. Using liquid hydrogen with a liquid oxygen oxidizer, Centaur provides about a 40 per cent increase in performance over vehicles using conventional kerosene-type fuels" (PK66 p. 22). Also "The RL-10 was the first high-energy engine developed for the space program and the first to be flown successfully in space" (PK66, launch vehicle section).
- `src` in JSON: PK66 (height, model, blurb). First-flight year comes from TND.

### atlasCentaurTE (Atlas-Centaur plus TE-M-364-4 third stage, AC-27 and AC-30)
- Height: "An Atlas-Centaur vehicle for a Pioneer mission is about 130 feet high and 10 feet in diameter" (AMES, Launch Vehicle page). 130 ft = 39.6 m. Approximate figure; no exact overall height found. Stage lengths for AC-27 (JPL1 Table 4, p. 60): SLV-3C booster 22.9 m (75 ft) including interstage adapter; Centaur 14.6 m (48 ft) with payload fairing; TE-M-364-4 2.1 m (6.75 ft). They overlap, so they cannot simply be added. AC-27 fairing: cylinder 5.74 m plus cone 4.94 m (JPL1 p. 44).
- Blurb: "The third stage, used with the Atlas/Centaur/TE 364 launch vehicle for the first time, made Pioneer 10 the speediest spacecraft. Its peak velocity was 51,800 km/h (32,000 mph)" (JPL1 p. 25-26). The blurb therefore says "flew for the first time with a TE-M-364-4 third stage", not "first Atlas-Centaur with any third stage". Spin: "a spin rate of about 60 rpm was imparted to the third stage by small solid propellant rockets for spin stabilization" (JPL1 p. 44).
- `firstYear` = 1962 is the first flight of the Atlas-Centaur family (TND). The three-stage version first flew in 1972 (JPL1), which the blurb says.
- `src` in JSON: JPL1 (blurb). Height comes from AMES.
- Name: kept generic ("Atlas-Centaur with TE-M-364-4 third stage") because the two flights did not use the same Atlas model (see Conflicts).
- Third stage facts (KSC p. 3): "The TE-M-364-4 rocket motor is an elongated version of the third stage DELTA rocket motor. Its average thrust is nominally 14,900 pounds over its burn time of approximately 44 seconds". JPL1 Table 4: 1142 kg, 65,860 N, "Solid chemical fuel TP-H 3062".

## Surveyor 1 / AC-10 (launched 30 May 1966, LC-36A)

Liftoff: "0941:00.99 hours eastern standard time" on May 30, 1966 (TND) = 14:41:00.99 UT. Complex 36A, flight azimuth 102.285 deg, liftoff "within 1 second after the launch window opened". Thrust to weight 1.28.

Flown sequence (TND, section IV narrative and fig. IV-1). Table A-III in the text layer has shifted columns, so the narrative and the figure were used.

| Event | T + s (flown) | Source text |
|---|---|---|
| Booster engine cutoff | 142.04 | at 5.68 g |
| Booster section jettison | 145.04 | "the staging command was given ... and the booster engine separated" (table A-III prints 145.14) |
| Insulation panels jettison | 175.84 | four panels, shaped charge, "cleared the vehicle within 0.2 second" |
| Nose fairing | 202.26 unlatch, 202.76 thrustor bottles | "rotated the fairing halves clear of the vehicle within 0.28 second" |
| Sustainer and vernier cutoff | 239.4 (239.38) | "gradual thrust decay due to depletion of usable liquid oxygen"; "Earth referenced velocity of 11 428 feet per second" = 12,540 km/h |
| Atlas-Centaur separation | 241.3 (241.31) | "the shaped charge fired severing the two vehicles. Eight retrorockets on the Atlas then fired and pushed the Atlas stage clear of the Centaur" |
| Centaur main engine start | 250.9 | two RL-10 engines, liquid hydrogen and liquid oxygen |
| Centaur main engine cutoff | 689.2 (689.21) | "The injection velocity was 34 496 feet per second" = 37,852 km/h; "approximately 1700 nautical miles southeast of Cape Kennedy" |
| Spacecraft separation | 756.9 | after a 68 s coast; Centaur commanded the legs and omni antennas out; "spring loaded mechanism"; "all three springs" |
| Centaur turnaround | 761.9 start, done at 860 | |
| Centaur lateral thrust | 801.9 for 20 s | two 50 lb hydrogen peroxide engines |
| Centaur retrothrust (propellant blowdown) | 996.9 to 1246.9 | after 5 hours the Centaur was 1054 km from the spacecraft |

Interstage: the retrorocket system backed "the Atlas and the interstage adapter away from the Centaur" (TND section III), so `stage1` and `interstage` are dropped together.

Pre-launch nominal table (PK66 p. 24, "Figures used are approximate but typical"). Not used in the JSON, kept here in case the 3D scene needs altitudes:

| Event | s | Altitude, statute mi (km) | Range, mi | Velocity, mph |
|---|---|---|---|---|
| Booster engine cutoff | 142 | 36 (58) | 49 | 5560 |
| Booster engine jettison | 145 | 39 (63) | 54 | 5630 |
| Jettison insulation panels | 176 | 58 (93) | 100 | 6150 |
| Jettison nose fairing | 203 | 74 (119) | 144 | 6700 |
| Sustainer engine cutoff | 240 | 97 (156) | 212 | 7600 |
| Atlas-Centaur separation | 242 | 98 (158) | 215 | 7600 |
| Centaur engine start | 251 | 104 (167) | 234 | 7600 |
| Centaur engine cutoff | 685 | 144 (232) | 1740 | 23,500 |
| Spacecraft separation | 757 | 111 (179) | 2200 | 23,500 |
| Centaur reorientation | 762 | 109 (175) | 2200 | 23,500 |
| Centaur retrothrust | 997 | 207 (333) | 3700 | 23,500 |

Fates
- Centaur (stage2): `earthOrbit`. Purpose of the manoeuvre: "to prevent impact of Centaur on the Moon and to avoid the possibility of the Surveyor star sensor mistaking Centaur for the star Canopus" (TND). Orbit after retrothrust (TND Table A-IV, at T + 1375.9 s): apogee altitude 236,939 n mi (438,811 km), perigee altitude 91.2 n mi (169 km), eccentricity 0.971615, period 12.4 days, C3 = -1.72 km2/s2. Negative C3 means it stayed bound to Earth. The report then says the spent vehicle was left "to continue its orbit in a nonstabilized flight mode". Nothing I read says what became of it later (an orbit this high crosses the Moon's distance, so it may have changed).
- Booster section, fairing halves, Atlas with interstage, insulation panels: no document states the impact area. `where:"unknown"`. General facts used in the wording: "The launch azimuth constraint of 80 to 115 degrees is imposed by the range safety consideration of allowing the initial launch phase only over the ocean, not over land masses" (PK66 p. 30), and the Atlas shut down at 11,428 ft/s, far below orbital speed (TND).

`left` (hardware Surveyor 1 itself discarded)
- Altitude marking radar (AMR). PK66 p. 38 diagram: "MAIN RETRO START BY ALTITUDE MARKING RADAR WHICH EJECTS FROM NOZZLE ... AT 60 MI. ALTITUDE, 6,100 MPH" (pre-launch approximate figures). NSSDCA-S1: "an altitude marking radar initiated the firing of the main retrorocket"; "After firing was complete, the retrorocket and radar were jettisoned". JPLNEWS (flown): the radar "sensed the nearness of the Moon--59.35 miles altitude" and started the sequence that fired the retro 10 seconds later.
- Main retro-rocket case. JPLNEWS (flown): retro "ignited ... 46.75 miles above the Moon and traveling at a velocity of 5840 miles per hour"; "The 39-second main retro phase slowed the spacecraft to 267 miles an hour at 35,000 feet altitude. The rocket motor case was ejected at 31,000 feet." NSSDCA-S1: ignition "At an altitude of 75.3 km and a velocity of 2612 m/s", "40 second burn", "jettisoned at an altitude of roughly 11 km having slowed the spacecraft to 110 m/s". PK66 p. 39: the casing "is separated from the spacecraft on command from the programmer 12 seconds after burnout by explosive bolts and falls free". (The retro motor weight in PK66 p. 3 is illegible in the scan and was not used.)
- Both are marked `moonImpact`. This is an inference (released a few km to tens of km above the Moon and falling toward it); no source I read states the impact or its location.

## Pioneer 10 / AC-27 (launched 3 Mar 1972 GMT, LC-36A)

Vehicle: "A three-stage Atlas SLV-3C/Centaur D/TE-364-4 vehicle, designated as AC-27" (JPL1 p. 44). "The Atlas Centaur launch vehicle AC-27 had been erected on Launch Complex 36A on Dec. 22, 1971" (JPL1). First stage = "The jettisonable booster, the sustainer/propellant, and the interstage adapter sections"; MA-5 with two booster engines, a sustainer engine and two verniers. Centaur: two Pratt and Whitney RL 10A3-3 engines, liquid hydrogen and liquid oxygen. Shroud: "a fiberglass fairing ... After leaving the atmosphere, the shroud was jettisoned in halves by the firing of explosive bolts and springs".

Countdown: "After three countdowns had been initiated and scrubbed, Pioneer 10 spacecraft was successfully launched on the sixth day of the 16-day launch opportunity period ... launch on March 3 at 0149:03 GMT, 24 min into the 30-min window" (JPL1 p. 130). The storm and power outage belong to the FIRST countdown (27 Feb), not to launch day.

Observed mark events (JPL1 Table 18, p. 152-153; liftoff observed at 0149:03.575 GMT; the L+ seconds in brackets are printed in the table):

| Event | Nominal L+ s | Observed GMT (L+ s) |
|---|---|---|
| Atlas BECO | 147.5 | 0151:32.7 (149.12), Merritt Island |
| Atlas booster engine jettison | 150.6 | 0151:35.7 (152.12), Merritt Island |
| Centaur insulation panel jettison | 192.5 | 0152:17.8 (194.22) |
| Sustainer engine cutoff | 243.0 | 0153:06.5 (242.92); TEL4 0153:07.3 (243.72) |
| Atlas/Centaur separation | 244.9 | 0153:09.4 (245.82); TEL4 (247.12) |
| Centaur main engine start | 254.5 | 0153:19.8 (256.22); Bermuda (256.42) |
| Nose fairing jettison | 266.5 | 0153:30.7 (267.12); Bermuda (267.22) |
| Centaur main engine cutoff | 708.0 | 0200:48.8 (705.22); TEL4 (705.42) |
| Third-stage spin up | 778.0 | 0201:59.5 (775.92); Antigua (775.42) |
| Centaur/third-stage separation | 780.0 | 0202:00.9 (777.31); Antigua (777.21) |
| Start Centaur retro | 781.0 | 0202:02.0 (778.42) |
| TE364 ignition | 793.1 | 0202:14.3 (790.72); Antigua (790.92) |
| TE364 burnout | 837.0 | 0202:56.8 (833.22); RIA 0203:00.3 (836.72) |
| Pioneer separation | 938.0 | 0204:39.0 (935.42) |
| Yo deploy (third-stage tumble weight) | 941.0 | 0204:41.5 (937.92) |

The JSON uses the first observed column. Table footnote: "Marks 1 and 2 were verified as recorded - apparently a time code error": the TEL4 readings of BECO and booster jettison (0150:32.5 and 0150:35.7) are one minute off and were discarded; the Merritt Island values were used.

Speeds: "peak velocity was 51,800 km/h (32,000 mph)" (JPL1 p. 26), used at third-stage burnout. SCI-P10 and HIST-P10 give 32,110 or 32,114 mph (51,682 km/h). JPL1 Table 4 "Launch vehicle characteristics" (pre-flight): 2,534 m/s (5665 mph) at BECO = 9,122 km/h; 3,543 m/s (7926 mph) at SECO = 12,755 km/h; 10,262 m/s at MECO; 13,913 m/s (31,122 mph) at spacecraft separation. The BECO and SECO values are quoted in the two Atlas fate texts as "according to the flight plan"; they are not set as `speed_kmh`.

Fates
- Centaur (stage2): `earthOrbit`. Tracked orbits (JPL1 Table 19 and Table 20, p. 154-155): orbit 5, "Centaur Post Retro" from Tananarive data at 0216:40.0 GMT: eccentricity 0.8505542, C3 = -9.12244778 km2/s2 (negative = bound to Earth), Earth-fixed speed 8.17 km/s at radius 9478.5 km. Orbits 1 and 4, Centaur pre-retro: eccentricity 0.850, C3 = -9.17 and -9.12, speed 10.21 km/s. My own arithmetic from e and C3 (not in the source): perigee altitude about 152 km, apogee altitude about 74,500 km, period about 25 hours. With a perigee that low it probably re-entered later, but no NASA document I read says so; the JSON only says it "was left" in that orbit.
- Third stage (stage3): `unknown`. Tracked "TE364-4 Transfer Orbit" (orbits 2 and 3, Vanguard and Ascension data, epoch 0202:59.1): eccentricity 2.388, C3 = +84.14 and +84.27 km2/s2, i.e. hyperbolic escape from Earth, matching the spacecraft orbit 6 (C3 = +84.18). So it left Earth with Pioneer 10. After that it was not tracked. The spacecraft made corrections ("Trajectory corrections were made March 7, and March 24, 1972", JPL1 p. 25) and the stage did not, so it did not follow exactly the same path past Jupiter. I found no NASA or peer-reviewed statement on whether it stayed in solar orbit or was also ejected from the solar system. (Non-NASA web pages claim it is also escaping; not used.)
- "The major portion of the attach fitting between the third-stage motor and spacecraft remained with the motor" (JPL1 p. 44), so there is no separate adapter piece.
- Atlas pieces and fairing: `unknown`, same reasoning as Surveyor 1.

`left`: empty. Pioneer 10 discarded nothing itself.

## Pioneer 11 / AC-30 (launched 6 Apr 1973 GMT, LC-36B)

Vehicle (KSC p. 1-3): "Pioneer G will be launched on an ATLAS/CENTAUR launch vehicle (AC-30) from complex 36B"; "The ATLAS stage (S/N 5011D) for the AC-30 mission is the SLV-3D"; "The new CENTAUR D-1A astrionic system integrates many former hardware functions into airborne computer software. The Teledyne digital computer unit is an advanced, high speed computer with a 16,384 word random access memory"; Centaur engines RL10A-3-3; combined Atlas thrust 431,383 lb at liftoff; Pioneer G "will weight about 570 pounds at launch". Nose fairing: "retained around the spacecraft until after CENTAUR engine start to protect the spacecraft during flight through the atmosphere and from ATLAS retrorocket exhaust", with "a spring jettison system". Figure 1 labels "INSULATION PANELS (4)" and the interstage adapter on top of the Atlas.

Plan (KSC p. 7-12): direct ascent; booster package jettisoned 3.1 s after BECO (at 5.7 g); SECO on oxidizer depletion; shaped charge separates the Centaur and eight Atlas retrorockets back the Atlas away; fairing at MES + 12 s; at MECO + 70 s eight small solid rockets on the spin table spin the third stage and spacecraft to a nominal 60 rpm; at MECO + 72 s the Marman clamp opens and the Centaur backs away by venting helium through two nozzles; third stage ignites at MECO + 85 s and burns about 44 s; spacecraft released about 100 s after burnout by four springs at about 4.6 ft/s; the third stage then deploys a "Yo-weight" to tumble so residual thrust cannot push it into the spacecraft. Nominal times: BECO 139.1, booster jettison 142.2, panels 184.1, SECO 248.3, separation 250.2, MES 259.8, fairing 271.8, MECO 715.1, spin-up 785.1, third stage separation 787.1, ignition 800.1, burnout 843.8, spacecraft separation 945.1, tumble 947.1.

Liftoff: "successful liftoff at 0211:00.117 April 6 (GMT)" after a countdown that "continued smoothly" (JPL2 p. 68). Nominal liftoff in Table 17 is 0211:00.0.

Observed mark events (JPL2 Table 17, p. 84; L+ s computed by me as observed GMT minus 0211:00.117):

| Event | Nominal GMT | Observed GMT | L+ s |
|---|---|---|---|
| Atlas BECO | 0213:19.1 | 0213:20.5 (also 0213:20.8) | 140.4 |
| Atlas booster engine jettison | 0213:22.2 | 0213:23.6 | 143.5 |
| Centaur insulation panel jettison | 0214:04.1 | 0214:05.8 (Merritt Island) | 185.7 |
| Sustainer engine cutoff | 0215:07.9 | 0215:04.3 (TEL-4: 0215:05.2) | 244.2 |
| Atlas/Centaur separation | 0215:09.9 | 0215:07.7 | 247.6 |
| Centaur main engine start | 0215:19.4 | 0215:17.3 (Bermuda: 0215:18.7) | 257.2 |
| Nose fairing jettison | 0215:31.4 | 0215:30.6 (Bermuda: 0215:30.7) | 270.5 |
| Centaur main engine cutoff | 0222:47.4 | 0222:44.8 (TEL-4: 0222:45.0) | 704.7 |
| Third-stage spin up | 0223:57.4 | 0223:55.1 (Antigua: 0223:55.3) | 775.0 |
| Centaur/third stage separation | 0223:59.4 | 0223:57.7 (Antigua: 0223:56.9) | 777.6 |
| TE-364 ignition | 0224:12.4 | 0224:11.1 | 791.0 |
| TE-364 burnout | 0224:56.2 | 0224:53.8 | 833.7 |
| Pioneer separation | 0226:37.4 | 0226:35.0 | 934.9 |
| YO deploy | 0226:39.4 | 0226:37.2 | 937.1 |

Table footnote: the TEL-4 reading of mark 3 (panels, 0214:15.9) is "apparently a time code error"; the Merritt Island value was used.

Other flown values: "Peak velocity was 51,800 km/h" and the third stage "made Pioneer 11 match Pioneer 10 as the speediest spacecraft" (JPL2 p. 16). The ship Vanguard reported at 0226:36 GMT: inertial velocity 14.3 km/s (51,480 km/h), altitude 472 km, inertial path angle 13.8 deg (JPL2 p. 75). The report labels these "third-stage burnout parameters", but the time stamp is one second after the observed spacecraft separation (0226:35.0) and well after the observed burnout (0224:53.8), and the altitude fits that later time, so `alt_km: 472` is attached to the separation step.

Fates
- Centaur (stage2): `earthOrbit`. JPL2 p. 26: "Separation was provided by venting residual helium through canted nozzles mounted at the aft end of the Centaur tank, which would remain in an elliptical Earth orbit." Tracked (JPL2 Table 19, p. 86): Centaur postretrofire orbit from Tananarive data: eccentricity 0.889146, C3 = -6.754599 km2/s2. My arithmetic: perigee altitude about 164 km, apogee altitude about 105,000 km, period about 40 hours. Later fate not found.
- Third stage (stage3): `unknown`. Tracked transfer orbit (Vanguard data, epoch 02:24:58.6): Earth-fixed velocity 14.04 km/s, eccentricity 2.447, C3 = +87.74 km2/s2, same as the spacecraft orbits (+87.68). It left Earth with Pioneer 11. Pioneer 11 then made corrections on 10 and 26 April 1973 (JPL2 p. 15) and was later re-aimed for Saturn; the stage did none of that. No NASA statement found on where it went.
- Atlas pieces and fairing: `unknown`. KSC Figure 3 (map "Spacecraft Tracking and Trajectory") shows BECO, SECO and Centaur MES over the Atlantic off Florida, which is what the fate text refers to as "the flight plan map"; no impact point is given.

`left`: empty.

## Conflicts between sources

1. Atlas and Centaur model of the two Pioneer launches. AC-27: JPL1 says "Atlas SLV-3C/Centaur D/TE-364-4" and, two lines later, "(Atlas SLV-3C and Centaur D-IA, respectively)"; SCI-P10 says "Atlas 3C no. 5007C / Centaur D-1A"; AMES says "The booster is the Atlas SLV-3C". AC-30: KSC says the Atlas "is the SLV-3D" and calls the Centaur D-1A "new"; SCI-P11 says "Atlas 3D no. 5011D / Centaur D-1A". So the SPEC line "Atlas SLV-3C + Centaur D-1A" fits AC-27 only loosely and is wrong about the Atlas of AC-30. The JSON name avoids the model letters.
2. Pioneer 10 launch date. JPL1 and NSSDCA-P10: 3 March 1972 GMT, liftoff 0149:03.575. SCI-P10 prints "March 2, 1972 / 01:49:04 UT" and HIST-P10 "March 2, 1972" (local date in Florida). The JSON uses 3 March, 01:49 UT, as the SPEC does.
3. Pioneer 10 top speed: 51,800 km/h (32,000 mph) in JPL1 and REL72; 51,682 km/h (32,110 or 32,114 mph) in SCI-P10 and HIST-P10; KSC and AMES quote 32,400 mph (about 52,000 km/h) as the planned figure for Pioneer G. The JSON uses 51,800.
4. Surveyor 1 Centaur cutoff altitude. TND narrative: injection "at an altitude of about 90 nautical miles" (167 km). PK66 nominal table: 144 statute miles (232 km) at Centaur cutoff and 111 miles at separation. TND Table A-IV gives a perigee altitude of 91.3 n mi with the vehicle still descending toward perigee at injection, so the "about 90 n mi" looks like the perigee, not the cutoff altitude. No `alt_km` was set for that step.
5. Surveyor 1 retro-rocket case release altitude: 31,000 ft, about 9.4 km (JPLNEWS, flown); "roughly 11 km" (NSSDCA-S1; JPLNEWS puts burnout at 35,000 ft = 10.7 km); 25,000 ft planned (PK66 diagram; the PK66 text says "about 25 miles", apparently a slip). The JSON uses 31,000 ft.
6. When the altitude marking radar left: PK66 diagram says it "ejects from nozzle" at main retro start; NSSDCA-S1 says "After firing was complete, the retrorocket and radar were jettisoned". The JSON follows PK66.
7. Surveyor 1 booster jettison time: 145.04 s in the TND narrative and figure, 145.14 s in TND Table A-III. Used 145.04.
8. Atlas first stage length: 65 ft (TND) against "75 feet (including interstage adapter)" (PK66, JPL1). Both agree on 113 ft overall for AC-10.

## Not verified

- Where the Atlas booster sections, Atlas core stages with their interstage adapters, insulation panels and fairing halves came down, for all three flights. No press kit or flight report I read gives an impact area. Searched without success: TND, PK66, the Surveyor B press kit (Release 66-248), the AC-8 release (66-58), the Mariner Mars 1971 press kit (Release 71-75), NASA TM X-2525 (AC-17 flight report), JPL1, JPL2, KSC, the Centaur fact sheets on nasa.gov, plus web searches restricted to nasa.gov. They certainly fell back (speeds of 9,000 to 13,000 km/h, launch azimuth over the Atlantic), most likely into the Atlantic Ocean; the integrator may decide to show `ocean`, but that is an inference, so the JSON says `unknown` and words the Atlantic as a general rule.
- Final fate of the two TE-M-364-4 third stages (solar orbit or solar-system escape).
- What became of the three Centaurs after the documented Earth orbits (still there, re-entered, or perturbed by the Moon).
- Impact points of the Surveyor 1 retro-rocket case and altitude marking radar.
- An exact overall height for the three-stage vehicle (only "about 130 feet").
- The full Pioneer F and Pioneer G press kits were not found on NTRS (only the 7-page Release 72-25), and no Lewis flight-performance report for AC-27 or AC-30 turned up in the NTRS search. The JPL Surveyor I Mission Report (TR 32-1023, 43 MB) was not downloaded because of its size.
- https://www.nasa.gov/history/SP-480/ch9.htm returned 404 and https://solarsystem.nasa.gov/news/130/surveyor-1-lands-on-the-moon/ redirects to a generic page; neither was used.

## Step texts that combine two NASA documents

- surveyor1 `pad`: "now Cape Canaveral" comes from HIST-P10 ("Cape Kennedy Air Force Station, now Cape Canaveral Space Force Station"); everything else from TND.
- pioneer10 `pad`, pioneer11 `pad`: same remark for "now Cape Canaveral".
- pioneer11 `stage1`, `stage2Start`, `fairing`: times from JPL2; the interstage adapter, the hydrogen and oxygen propellants and the fairing's purpose from KSC.
- pioneer11 `liftoff`: "at the planned time" compares the nominal 0211:00.0 with the observed 0211:00.117 in JPL2 Table 17.
- pioneer11 fates of `boosterSection`, `stage1`, `interstage`, `fairingA`, `fairingB`: `src` is KSC (the pre-launch plan: map of the ground track, interstage on the Atlas, shaped charge, spring jettison system of the fairing); the drop times in those texts are the observed ones from JPL2. Details taken from the plan are worded as plan or design ("according to the flight plan", "designed to be released by springs"), not as flown facts.
- pioneer10 fates of `boosterSection` and `stage1`: the speeds (about 9,100 and 12,750 km/h) are the pre-flight values of JPL1 Table 4, worded "according to the flight plan".
- `ROCKETS_INFO.atlasCentaurTE`: `src` is JPL1 (blurb); `heightM` 39.6 comes from AMES ("about 130 feet"), not from JPL1.
- `ROCKETS_INFO.atlasCentaur`: `src` is PK66 (height, model, blurb); `firstYear` 1962 comes from TND.
- surveyor1 `left` altitude marking radar: ejection from the nozzle from PK66; the wording "signaled that the Moon was near" from JPLNEWS.
- surveyor1 fate of `boosterSection`: `src` is PK66 (over-ocean launch azimuth rule); the 145 s drop time is from TND.

## Verification

Independent fact-check, 15 Nov 2026. The goal was to refute the notes above, not to trust them. `atlas_centaur.json` was rewritten in place with the corrections listed here. Where this section disagrees with the notes above, this section wins.

How it was checked: the NTRS PDFs were opened again and their OCR text layer extracted with `pdftotext`; NASA TN D-4580 was fetched fresh from NTRS and its text is byte-identical to the copy the first pass used. Every table that the OCR scrambles was read from the page image, digit by digit: TN D-4580 Figure IV-1 (printed p. 16), Table A-III (p. 128) and Table A-IV (p. 132); JPL TM 33-584 Vol. I p. 44, Table 18 (p. 152 and 153) and Table 20 (p. 155); Vol. II Table 17 (p. 84) and Table 19 (p. 86); KSC TR-1230 Figure 1. The observed times were also checked against the fixed sequencer intervals (booster jettison 3.1 s after BECO; spin-up, third-stage separation and third-stage ignition 70, 72 and 85 s after Centaur cutoff): all three flights fit. Web pages (jpl.nasa.gov, science.nasa.gov, nasa.gov, NSSDCA) were fetched again. Wikipedia was not used.

### Extra sources opened in this check

| key | what | URL |
|---|---|---|
| V1 | JPL Technical Report 32-1210, "Surveyor IV Mission Report: Mission Description and Performance", 1 Jan 1968 (system description of the altitude marking radar and main retro motor, common to the Surveyor landers) | https://ntrs.nasa.gov/api/citations/19680006793/downloads/19680006793.pdf |
| V2 | NASA Science, "Surveyor 1 Lands on the Moon" (text of the 16 Jun 1966 release) | https://science.nasa.gov/solar-system/moon/surveyor-1-lands-on-the-moon/ |
| V3 | NASA History, "55 Years Ago: Surveyor 1 Makes a Soft Landing on the Moon" | https://www.nasa.gov/history/55-years-ago-surveyor-1-makes-a-soft-landing-on-the-moon/ |
| V4 | NSSDCA master catalog, Pioneer 11 | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-019A |
| V5 | P. J. Stooke, "Surveyor Retro-Rockets in LROC Images", 47th Lunar and Planetary Science Conference (2016), abstract 1025. Not NASA and not peer reviewed; read for context only, nothing in the JSON rests on it | https://www.hou.usra.edu/meetings/lpsc2016/pdf/1025.pdf |

### Confirmed (source says exactly this, for this flight)

Surveyor 1 / AC-10, NASA TN D-4580 (https://ntrs.nasa.gov/api/citations/19680014866/downloads/19680014866.pdf)
- Liftoff 0941:00.99 EST on 30 May 1966 from Complex 36A (14:41 UT; NSSDCA and science.nasa.gov agree), within 1 second of the window opening; first operational Atlas-Centaur; single-burn direct ascent.
- 113 feet long, 302,248 pounds at liftoff (34.4 m, 137 metric tons). The press kit fact sheet also gives 113 feet.
- Two booster engines, one sustainer and two verniers burning liquid oxygen and kerosene, all ignited on the ground.
- Flown times: booster cutoff 142.04 s; insulation panels 175.84 s (four panels); fairing unlatch 202.26 s and thrustor bottles 202.76 s (halves rotated clear); sustainer cutoff 239.4 s on liquid oxygen depletion at an Earth-referenced 11,428 ft/s (12,540 km/h); Atlas separation 241.3 s by shaped charge, eight retrorockets; Centaur start 250.9 s (two RL-10 engines, liquid hydrogen and liquid oxygen); Centaur cutoff 689.2 s at 34,496 ft/s (37,852 km/h); spacecraft separation 756.9 s by three springs, after the Centaur commanded the landing gear out.
- Interstage adapter: the shaped charge "cut the interstage adapter circumferentially near its forward end" and the retrorockets backed "the Atlas and the interstage adapter away from the Centaur".
- Centaur after its retromaneuver (turnaround, propellant blowdown "to avoid impact of Centaur on the Moon"): Table A-IV, apogee altitude 236,939 n mi, perigee altitude 91.2 n mi, eccentricity 0.971615, period 12.4 days, C3 -1.72 km2/s2, left "to continue its orbit in a nonstabilized flight mode". `earthOrbit` stands as the state documented right after launch.
- Press kit 66-127 (https://ntrs.nasa.gov/api/citations/19660022877/downloads/19660022877.pdf): LV-3C Atlas with a Centaur second stage; Centaur started in 1958 "as the nation's first high-energy rocket vehicle", "about a 40 per cent increase in performance over vehicles using conventional kerosene-type fuels"; the altitude marking radar "is located in the nozzle of the retro motor and is ejected when the motor ignites"; the retro casing is separated 12 seconds after burnout "and falls free".
- JPL release of 28 Jul 1966 (https://www.jpl.nasa.gov/news/surveyor-i-mission/): the radar sensed the Moon at 59.35 miles and started the sequence that fired the main retro 10 seconds later; "The rocket motor case was ejected at 31,000 feet".
- "Cape Kennedy, now Cape Canaveral": V3.

Pioneer 10 / AC-27, JPL TM 33-584 Vol. I (https://ntrs.nasa.gov/api/citations/19730011461/downloads/19730011461.pdf)
- AC-27 erected on Launch Complex 36A; three countdowns scrubbed, fourth completed with launch on 3 March at 0149:03 GMT (liftoff mark 0149:03.575).
- "The Atlas-Centaur launch vehicle also included for the first time a third stage: the ... solid-fuel TE-M-364-4 engine"; "made Pioneer 10 the speediest spacecraft. Its peak velocity was 51,800 km/h (32,000 mph)".
- First stage = jettisonable booster, sustainer and interstage adapter sections; Centaur with two RL 10A3-3 engines on liquid hydrogen and liquid oxygen; about 60 rpm spin-up by small solid rockets; fiberglass shroud "jettisoned in halves by the firing of explosive bolts and springs" after leaving the atmosphere.
- Table 18 observed marks, all read from the page image: BECO 149.12 s; booster jettison 152.12; insulation panels 194.22; sustainer cutoff 242.92; Atlas/Centaur separation 245.82; Centaur start 256.22; fairing 267.12; Centaur cutoff 705.22; spin-up 775.92; Centaur/third-stage separation 777.31; Centaur retro 778.42; TE364 ignition 790.72; burnout 833.22; Pioneer separation 935.42. The TEL4 readings of marks 1 and 2 carry the table's own time-code-error note.
- Table 19 and 20: orbit 5, "Centaur Post Retro", eccentricity 0.8505542, C3 -9.12244778 (bound to Earth); orbits 2 and 3, "TE364-4 Transfer Orbit", eccentricity 2.388, C3 +84.14 and +84.27 (escape), matching the spacecraft orbit 6 (C3 +84.18).

Pioneer 11 / AC-30
- JPL TM 33-584 Vol. II (https://ntrs.nasa.gov/api/citations/19750013263/downloads/19750013263.pdf): countdown "continued smoothly", liftoff 0211:00.117 GMT on 6 April at the opening of the window (0211); Complex 36B; Table 17 observed marks minus liftoff: BECO 140.4 s; booster jettison 143.5; insulation panels 185.7; sustainer cutoff 244.2; Atlas/Centaur separation 247.6; Centaur start 257.2; fairing 270.5; Centaur cutoff 704.7; spin-up 775.0; Centaur/third-stage separation 777.6; TE-364 ignition 791.0; burnout 833.7; Pioneer separation 934.9.
- Same report: the Centaur separated "by venting residual helium through canted nozzles ... which would remain in an elliptical Earth orbit"; Table 19 Centaur postretrofire orbit, eccentricity 0.889146, C3 -6.754599; transfer orbit (third stage), eccentricity 2.447, C3 +87.74, same as the spacecraft orbits (+87.68); "made Pioneer 11 match Pioneer 10 as the speediest spacecraft. Peak velocity was 51,800 km/h". The NASA Science page says the same (about 32,000 mph, 51,800 km/h, "equaling the speed of its predecessor"): https://science.nasa.gov/mission/pioneer-11/
- Same report, p. 21: the Pioneer 10 and Pioneer 11 launch vehicle configurations "were similar" and Vol. I is the reference for both.
- KSC TR-1230 (https://ntrs.nasa.gov/api/citations/19730017158/downloads/19730017158.pdf): AC-30 from complex 36B, Cape Kennedy; Atlas "is the SLV-3D"; "The new CENTAUR D-1A" with a digital computer unit; shaped charge separates the Centaur and eight retrorockets back the Atlas away; nose fairing with "a spring jettison system", kept on until after Centaur engine start; Figure 1 labels four insulation panels and the interstage adapter.

Structure: JSON parses (Python and Node); exact key set of the spec; 8 steps for Surveyor 1 and 9 for each Pioneer, in chronological order; only canonical part ids of `atlasCentaur` and `atlasCentaurTE`; every dropped part has a fate, in drop order; `where` values in the enum; titles 2 to 5 words; step texts at most 220 characters in both languages (longest is 219); no em or en dashes, no exclamation marks; Spanish number format; Spanish and English say the same thing.

### Corrected

1. **`ROCKETS_INFO.atlasCentaurTE.heightM`: 39.6 changed to 40.3.** The first pass used "about 130 feet" from the Ames brochure and reported that no exact height was found. The entry's own `src` has it: "Liftoff height of the over-all launch configuration was 40.3 m (132 ft); weight was 146,673 kg (323,415 lb)" (JPL Vol. I, p. 44, read from the page image). It is the AC-27 figure; Vol. II says the Pioneer 11 configuration was similar.
2. **`ROCKETS_INFO.atlasCentaurTE.firstYear`: 1962 changed to 1972.** The other files in `docs/etapas/` give the first flight of the variant (Atlas V 541: 2011; Delta II 7925H: 2003; Titan IIIE: 1974). This variant first flew with Pioneer 10 in March 1972, which is in the entry's `src` and in its blurb. `atlasCentaur.firstYear` stays 1962: TN D-4580 says Centaur "was first flight tested, unsuccessfully, on May 8, 1962" (first success 27 Nov 1963). That year is not in that entry's `src` (the press kit), it is in TN D-4580.
3. **Surveyor 1 booster jettison `t`: 145.04 changed to 145.1.** TN D-4580 gives 145.04 s in the narrative and in Figure IV-1, but 145.14 s in Table A-III ("Actual time", and equal to BECO 142.04 + the programmed 3.1 s), and "T + 145.1" in the vehicle dynamics table of section V. 145.1 is what the table and section V support; the text only says "3 seconds later".
4. **Atlantic clause cut from all 15 fates of suborbital parts** (booster section, Atlas, interstage, two fairing halves, on three flights). No document read gives an impact area for any of them. The only over-the-ocean sentence is the launch azimuth rule in the Surveyor A press kit, and for Pioneer 11 a map of the planned ground track; nothing for Pioneer 10. Same decision as in `heavy.md`. Each fate now says only: dropped at T, before orbit, fell back to Earth, place not found. `where` stays `unknown`.
5. **Pre-flight speeds removed from the Pioneer 10 Atlas fates** (about 9,100 and 12,750 km/h, JPL Vol. I Table 4). They were planned values, not flown ones.
6. **Unsourced negatives removed.** "Nobody tracked it afterward", "nobody followed it" and "it did not make the course corrections the spacecraft made later" (third stages of Pioneer 10 and 11) are not statements of any source. The texts now say what the tracking shows (it left Earth on the same escape path as the spacecraft) and that we could not find any NASA report that says where it ended up.
7. **Surveyor 1 altitude marking radar.** "Was thrown out when the motor fired" was stated as a flown fact, but the only sources are design descriptions (press kit; the same mechanism is in V1: "the gas generated by the ignitor develops sufficient pressure to eject the AMR from the nozzle"), and NSSDCA words it differently ("After firing was complete, the retrorocket and radar were jettisoned"). The text now says it "was built to be blown out when that motor fired". `src` is the press kit.
8. **Surveyor 1 retro burn time: "39 seconds" changed to "about 40 seconds".** Three NASA figures exist: 39 s (JPL release of 28 Jul 1966), 38 s (V2, release of 16 Jun 1966) and 40 s (NSSDCA). The ejection altitude of 31,000 feet is the same in both 1966 releases and was kept.
9. **"must have crashed" reworded.** Both `left` texts now say the piece kept falling toward the Moon and that we could not find where it hit. `where` stays `moonImpact` (see Still unverified, item 4).
10. **`src` moved to the document that carries the item's facts.** Pioneer 11 fates of the booster section, the Atlas and the two fairing halves now carry only the drop time, so their `src` changed from KSC TR-1230 to JPL Vol. II (where the times are). The Pioneer 11 interstage fate keeps KSC TR-1230 and is worded as the flight plan. Surveyor 1 booster section fate: `src` changed from the press kit to TN D-4580 (the drop time). Items that still draw on a second NASA document: the pad steps ("now Cape Canaveral", V3); the Surveyor 1 radar fate (`src` press kit, which gives the nozzle mounting, the ejection at ignition and the signal at about 60 miles as the design; that the radar did signal on this flight, at 59.35 miles, is in the JPL release); the Pioneer 11 `stage1`, `stage2Start` and `fairing` steps (`src` JPL Vol. II for the times; the interstage adapter, the Centaur's liquid hydrogen and liquid oxygen and the fairing's job come from KSC TR-1230, Figure 1 and text, and from Vol. I, which Vol. II names as the reference for the similar Pioneer 11 vehicle); the Pioneer 11 `stage2` step (helium venting: Vol. II and KSC); the Pioneer 11 pad step (`src` KSC; nothing else needed).
11. **Wording for children.** "The sources we read do not say where" became "we could not find where" (same wording as the other files). The fates of the suborbital parts went from up to 281 characters to at most 158. "About" was added before 51,800 km/h in the two third-stage steps.

### Removed

- The general statement that pieces dropped this early fall into the Atlantic Ocean (15 fates).
- Pioneer 10 planned speeds at booster and sustainer cutoff (two fates).
- "Nobody tracked it afterward" and "it did not make the course corrections" (two steps, two fates).
- The 439,000 km apogee from the Surveyor 1 Centaur fate text (confirmed, cut only for length; the 12.4-day period stays).
- The fairing release mechanism (springs) from the Pioneer 11 fairing fates: it is a design detail from the pre-launch plan and the item now cites the post-flight report.
- **`alt_km: 472` and "about 472 km up" from the Pioneer 11 separation step.** JPL Vol. II lists the ship Vanguard's reading (0226:36 GMT, inertial velocity 14.3 km/s, path angle 13.8 deg, altitude 472 km) under the label "third-stage burnout parameters". The first pass attached it to the separation step because the time stamp is 1 second after the observed spacecraft separation (0226:35.0) and 102 seconds after the observed burnout (0224:53.8). That reasoning is sound: coasting 97 seconds on a two-body path from the tracked transfer orbit of Table 19 (radius 6611.6 km, about 234 km up, at 02:24:58.6) gives about 460 km, 14.3 km/s and 13.5 deg, and the pre-launch text of the same report gives 230 to 361 km for the altitude at burnout. But by the source's own wording the value fits neither step (the label says burnout, the time stamp says separation), and placing it takes arithmetic that is not in the source. So it is out of the JSON. If the 3D scene needs an altitude there, this note is the place to take it from, with that caveat.

### Still unverified

1. **Where the Atlas pieces came down** (booster section, Atlas with interstage, fairing halves, insulation panels; three flights). No NASA document read gives an impact area. They fell back to Earth; the Atlantic is very likely but it is an inference. `where` is `unknown`.
2. **Third stages of Pioneer 10 and 11.** Tracking shows both left Earth on the spacecraft's escape path. No NASA or peer-reviewed source found says whether they stayed in solar orbit or left the solar system. Web pages that claim one or the other trace back to Wikipedia. `where` is `unknown`.
3. **The three Centaurs after launch day.** `earthOrbit` is the orbit documented minutes after separation (AC-10: Table A-IV; AC-27 and AC-30: tracked negative C3; AC-30 also by a sentence in the report). What became of them later was not found. The AC-10 orbit reached beyond the Moon's distance and the two Pioneer Centaurs had perigees near 150 to 165 km (my arithmetic), so none of the three is known to be in that orbit today.
4. **Surveyor 1 retro-rocket case and altitude marking radar: `moonImpact` is an inference.** NASA says the case was ejected at 31,000 feet during the descent and (press kit) "falls free"; no NASA text read says it hit the Moon or where. A piece let go a few kilometres above an airless Moon by a spacecraft that was itself coming down can only reach the surface, which is why the value was kept, but it rests on physics, not on a quoted sentence. V5 (not NASA, not peer reviewed) reports only a candidate impact spot about 300 m northwest of the lander. Whether the radar left at ignition (design) or after the burn (NSSDCA wording) is not settled by a flown account; the Surveyor I Mission Report (JPL TR 32-1023, NTRS 19690003886) is too large to fetch with the tools used here.
5. **No altitude or speed on most steps.** The only `speed_kmh` keys left are the Surveyor 1 Atlas shutdown (12,540) and Centaur cutoff (37,850), both flown values from TN D-4580, and the 51,800 km/h peak speed of the two Pioneers (JPL reports; a rounded 32,000 mph). No `alt_km` key is left in the file: the flown reports read here do not give altitudes for the events, and the pre-launch tables (press kit p. 24, JPL Vol. I Table 4) are plans.
6. **Pioneer 11 interstage.** That it left with the Atlas rests on the pre-launch description (KSC TR-1230, Figure 1 and flight plan) and on the statement that the configuration was similar to Pioneer 10's, not on a post-flight sentence. The text says "according to the flight plan".
7. **Rocket names (for the SPEC, not changed here).** The SPEC describes `atlasCentaurTE` as "Atlas SLV-3C + Centaur D-1A" for both Pioneers. AC-30 (Pioneer 11) flew an Atlas SLV-3D with the new Centaur D-1A (KSC TR-1230; science.nasa.gov). For AC-27 (Pioneer 10), JPL Vol. I says "Atlas SLV-3C/Centaur D/TE-364-4" and, in the next sentence, "Centaur D-IA"; science.nasa.gov says D-1A. The JSON name has no model letters.
8. **Small conflicts left as they were.** Pioneer 10 launch date: 3 March 1972 GMT (JPL, NSSDCA), "March 2" on science.nasa.gov (local date). Pioneer 10 top speed: 51,800 km/h (JPL) against 51,682 km/h (science.nasa.gov). Surveyor 1 retro case release: 31,000 feet (both 1966 releases) against "roughly 11 km" (NSSDCA). Third-stage burn time: 42.5 s (Pioneer 10) and 42.7 s (Pioneer 11) between the observed marks, about 44 s nominal; the texts say "about 43 seconds".
9. **Not opened:** the full Pioneer F and Pioneer G press kits, any Lewis flight report for AC-27 or AC-30, and JPL TR 32-1023.
