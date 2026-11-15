# Launch stages research: heavy rockets (Apollo 11 / Saturn V, Viking 1 / Titan IIIE-Centaur)

Research notes for `docs/etapas/heavy.json`. Written 15 Nov 2026. Every number in the JSON comes from one of the sources below. Where a source gave feet, nautical miles or ft/s, the conversion is shown here (1 n mi = 1.852 km, 1 ft/s = 1.09728 km/h).

How the sources were read: NASA web pages were fetched as HTML and the quoted sentences were checked in the raw text. The two NTRS PDFs are scans; their OCR text layer was extracted and the key table (TC-4 Table 4-1) was also read from the page image. Wikipedia was not used as a source.

## Sources

| key | what | URL |
|---|---|---|
| SP4029-SUM | NASA SP-4029 "Apollo by the Numbers", Apollo 11 Summary | https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11a_Summary.htm |
| SP4029-ASC | same, Apollo 11 Ascent Phase table | https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11d_Ascent_Phase.htm |
| SP4029-TL | same, Apollo 11 Timeline | https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11i_Timeline.htm |
| SATV | NASA "What Was the Saturn V? (Grades 5-8)" | https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/ |
| SP350 | NASA SP-350 "Apollo Expeditions to the Moon", ch. 4.5 | https://www.nasa.gov/wp-content/uploads/static/history/SP-350/ch-4-5.html |
| A11-OVW | NASA "Apollo 11 Mission Overview" | https://www.nasa.gov/missions/apollo/apollo-11-mission-overview/ |
| NSSDCA-A11 | NSSDCA, Apollo 11 CSM | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059A |
| NSSDCA-SIVB | NSSDCA, Apollo 11 S-IVB | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059B |
| NSSDCA-LM | NSSDCA, Apollo 11 Lunar Module / EASEP | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C |
| NSSDCA-LRRR | NSSDCA, Apollo 11 Laser Ranging Retroreflector | https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04 |
| MOONCAT | NASA History Program Office, "Catalogue of Manmade Material on the Moon" (dated 7-05-12) | https://www.nasa.gov/wp-content/uploads/2024/02/final-catalogue-of-manmade-material-on-the-moon.pdf |
| VK-PK | NASA "Viking Press Kit", Release 75-183 (1975), NTRS 19750018961 | https://ntrs.nasa.gov/api/citations/19750018961/downloads/19750018961.pdf |
| TC4 | NASA TM X-73475, "Titan/Centaur D-1T TC-4 Viking A Flight Data Report", Lewis Research Center, July 1976, NTRS 19760021170 | https://ntrs.nasa.gov/api/citations/19760021170/downloads/19760021170.pdf |
| CENTAUR-HIST | NASA History, "Centaur Launched a Generation of Interplanetary Missions" | https://www.nasa.gov/history/centaur-launched-a-generation-of-interplanetary-missions |
| SP4212 | NASA SP-4212 "On Mars", ch. 8-2, 8-7, 10-5, 11-3 | https://www.nasa.gov/wp-content/uploads/static/history/SP-4212/ch11-3.html (and ch8-2.html, ch8-7.html, ch10-5.html in the same folder) |
| NSSDCA-VO1 | NSSDCA, Viking 1 Orbiter | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075A |
| NSSDCA-VL1 | NSSDCA, Viking 1 Lander | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C |
| NSSDCA-VO2 | NSSDCA, Viking 2 Orbiter (only for the bioshield remark) | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-083A |
| PIA01881 | JPL Photojournal PIA01881, "Viking Lander 1 (Thomas A. Mutch Memorial Station) Imaged from Orbit" | https://science.nasa.gov/photojournal/viking-lander-1-thomas-a-mutch-memorial-station-imaged-from-orbit |

The JSON shape allows one `src` per entry. Where an entry uses facts from two sources, the JSON cites the one that carries the main claim and the second one is named in this file.

## ROCKETS_INFO

### saturnV
- Height: "The Saturn V rocket was 111 meters (363 feet) tall" [SATV]. JSON uses 111. Note 363 ft converts to 110.6 m; NASA rounds to 111.
- First flight: "The first Saturn V was launched in 1967. It was called Apollo 4." [SATV]. `family` is set to "Saturn V" and `firstYear` is the first flight of the Saturn V itself, not of the earlier Saturn I and IB (the wider Saturn family; its first-flight year was not sourced).
- Blurb: "It was the most powerful rocket that had ever flown successfully." and "The Saturn V rockets used for the Apollo missions had three stages." and "a rocket NASA built to send people to the moon" [SATV].
- Apollo 11's vehicle was "a Saturn V, designated SA-506" [SP4029-SUM].

### titan3e
- Height: "It has an over all height of 48.8 m (160 ft.)"; table "Liftoff height 48.8 m (160 ft.)" [VK-PK, Launch Vehicle section].
- Make-up: "The Titan Centaur launch vehicle combines a Titan III-E booster and Centaur D-1T third stage"; "two-stage liquid propellant core vehicle and two strap-on solid rocket motors, each 3 m (10 ft.) in diameter and 25.9 m (85 ft.) long"; Centaur propellants "Liquid hydrogen and liquid oxygen" [VK-PK].
- First flight year 1974: the press kit says the Viking launches "are the second and third operational launches for the Titan Centaur vehicle (TC-3 and TC-4). Its first operational launch of a Helios spacecraft last December 10 was an unqualified success" [VK-PK], that is 10 Dec 1974. NASA History adds that the first Titan-Centaur of all was lost in February 1974: "the loss of the first Titan-Centaur in February 1974" [CENTAUR-HIST]. Both are 1974. `family` is set to "Titan IIIE-Centaur" and `firstYear` is the first flight of that exact vehicle; the wider Titan III family flew earlier, but its first-flight year was not sourced, so it is not used.
- Why it existed (not in the blurb, useful context): NASA "planned even more complex missions for the mid-1970s that would require an even larger booster than the Atlas. The Air Force's three-stage Titan 3E was selected, and General Dynamics altered the Centaur D-1A to serve as the Titan's fourth stage. The most significant modification was the use of an entirely new shroud, which was wider than both the Centaur and Titan." [CENTAUR-HIST].
- Stage naming differs by source: the press kit calls the solids "Stage 0" and the Centaur the "third stage"; NASA History counts the Centaur as the "fourth stage". The JSON follows the spec ids (`srbGround`, `stage1`, `stage2`, `stage3` = Centaur).

## Apollo 11 (Saturn V SA-506)

Launch: "launched from Kennedy Space Center Launch Complex 39, Pad A" [SP4029-SUM]; liftoff 13:32:00 GMT, 16 Jul 1969 [SP4029-TL].

Time reference: `t` is ground elapsed time (GET) in seconds from range zero, as in SP-4029. In that table "Liftoff (umbilical disconnected)" is at GET 000:00:00.63; the JSON puts the liftoff step at `t: 0`.

### Event times [SP4029-TL], altitude and speed [SP4029-ASC]

| event | GET | seconds | altitude | space-fixed velocity | used in step |
|---|---|---|---|---|---|
| Liftoff | 000:00:00.63 | 0 | | | liftoff |
| S-IC center engine cutoff | 000:02:15.2 | 135.2 | | | (not used) |
| S-IC outboard engine cutoff | 000:02:41.63 | 161.63 | 35.701 n mi | 9,068.6 ft/s | (not used) |
| S-IC/S-II separation command | 000:02:42.30 | 162.3 | 36.029 n mi = 66.7 km | 9,100.6 ft/s = 9,986 km/h | stage1 |
| S-II ignition | 000:02:44.0 | 164.0 | | | stage1 (ignite) |
| S-II aft interstage jettisoned | 000:03:12.3 | 192.3 | not given | not given | interstage |
| Launch escape tower jettisoned | 000:03:17.9 | 197.9 | not given | not given | les |
| S-II outboard engine cutoff | 000:09:08.22 | 548.22 | | | (not used) |
| S-II/S-IVB separation command | 000:09:09.00 | 549.0 | 101.175 n mi = 187.4 km | 22,699.6 ft/s = 24,908 km/h | stage2 |
| S-IVB 1st burn ignition | 000:09:12.20 | 552.2 | | | stage2 (ignite) |
| S-IVB 1st burn cutoff | 000:11:39.33 | 699.33 | | | (not used) |
| Earth orbit insertion | 000:11:49.33 | 709.33 | 103.176 n mi = 191.1 km | 25,567.9 ft/s = 28,055 km/h | orbit |
| S-IVB 2nd burn ignition | 002:44:16.2 | 9856.2 | | | tli |
| S-IVB 2nd burn cutoff | 002:50:03.03 | 10203.03 | | | (text: "almost 6 minutes") |
| Translunar injection | 002:50:13.03 | 10213.03 | | 35,545.6 ft/s = 39,003 km/h [SP4029-SUM] | tli (text only) |
| CSM separated from S-IVB | 003:15:23.0 | 12923.0 | | | separation (text) |
| CSM docked with LM/S-IVB | 003:24:03.7 | 13443.7 | | | separation (text) |
| CSM/LM ejected from S-IVB | 004:17:03.0 | 15423.0 | | | separation |

- Speed frame: SP-4029 gives both Earth-fixed and space-fixed velocity. The JSON uses the **space-fixed** column everywhere (it is the one that gives the familiar 28,000 km/h in orbit). Earth-fixed values for reference: 7,882.9 ft/s (8,650 km/h) at S-IC separation, 21,377.0 ft/s (23,457 km/h) at S-II separation, 24,243.9 ft/s (26,602 km/h) at orbit insertion.
- "Only the commanded time is available" for the two stage separations (footnote in SP4029-ASC).
- TLI burn: "the 346.83-second translunar injection maneuver ... after 1.5 Earth orbits lasting 2 hours 38 minutes 23.73 seconds, at a velocity of 35,545.6 ft/sec" and "After in-flight systems checks" [SP4029-SUM]. The `tli` step has `t` = ignition, so no `speed_kmh` key there (the 39,000 km/h in the text is the speed at the end of the burn).
- Parking orbit: "apogee and perigee of 100.4 by 98.9 n mi ... a velocity of 25,567.8 ft/sec" [SP4029-SUM].
- Transposition: "the CSM was separated from the S-IVB stage and transposed and docked with the LM at 003:24:03.7. The docked spacecraft were ejected from the S-IVB at 004:17:03.0" [SP4029-SUM]; "turned around and docked with the LM" [NSSDCA-A11].
- Escape tower purpose: "If things go wrong, the manned command module must be pulled away to a safe distance by the launch-escape rocket" and "the escape system was never needed during any of the Apollo launches" [SP350]. The `les` step cites SP4029-TL (time); this is the second source.

### Fates of the rocket parts

| part | where | evidence |
|---|---|---|
| stage1 (S-IC) | ocean | "The S-IC stage impacted the Atlantic Ocean at 000:09:03.70 at latitude 30.212° north and longitude 74.038° west, 357.1 n mi from the launch site." [SP4029-SUM]. 357.1 n mi = 661 km. The timeline labels it "S-IC impact (theoretical)" [SP4029-TL], so the JSON says "the impact point NASA calculated". |
| interstage | unknown | Only the jettison time is given (000:03:12.3) [SP4029-TL]. No source read states where it fell. It was dropped 30 s after staging, long before orbital speed, so it fell back; general statement only: "The first two stages fell into the ocean after separation" [SATV]. |
| les | unknown | Only the jettison time is given (000:03:17.9) [SP4029-TL]. Same reasoning as the interstage. |
| stage2 (S-II) | ocean | "The S-II stage impacted the Atlantic Ocean at 000:20:13.7 at latitude 31.535° north and longitude 34.844° west, 2,371.8 n mi from the launch site." [SP4029-SUM]. 2,371.8 n mi = 4,393 km. Also "(theoretical)" in the timeline. |
| stage3 (S-IVB) | sunOrbit | "A ground command for propulsive venting of residual propellants targeted the S-IVB to go past the Moon and into solar orbit. ... The point of closest approach to the lunar surface was 1,825 n mi. ... a solar orbit with an aphelion and perihelion of 82.000 million by 72.520 million n mi ... and a period of 342 days." Closest approach "at 20:14 GMT on 19 July at 078:42" [SP4029-SUM]. 1,825 n mi = 3,380 km. Confirmed by "The SIVB stage was left on a ballistic trajectory to fly by the Moon on 19 July and entered solar orbit." [NSSDCA-SIVB]. The hint was right: Apollo 11's S-IVB did not hit the Moon. |

The four spacecraft-LM adapter (SLA) panels were also released on Apollo 11: "After transposition and jettisoning of the SLA panels on the S-IVB stage, the CSM docked with the LM" [A11-OVW]. The spec folds the panels into `stage3`, so they have no entry; no source read gives their fate.

### `left` (what the spacecraft left behind)

| item | where | evidence |
|---|---|---|
| Eagle descent stage | onMoon | "The descent stage served as a platform for launching the ascent stage and was left behind on the Moon."; plaque "mounted on a strut behind the ladder" [NSSDCA-LM]. MOONCAT: "LM Descent Stage (plaque attached) 0.67408° N, 23.47297° E". |
| Eagle ascent stage | unknown | "the LM was jettisoned into lunar orbit at 00:01:01 UT on 22 July. The fate of the LM is not known, but it is assumed that it crashed into the lunar surface sometime within the following 1 to 4 months." [NSSDCA-LM]. MOONCAT lists "Ascent Stage [1]" with location "UNKNOWN". See conflicts below. |
| Laser ranging retroreflector | onMoon | "The laser ranging retroreflector (LRRR), which was left on the lunar surface by the Apollo 11 crew ... Laser ranging beams from earth were reflected back to their point of origin for precise measurement of earth-moon distance" [NSSDCA-LRRR]. MOONCAT: "Lunar Retro-Ranging Reflector Experiment [1] 0.67337° N, 23.47293° E". |
| Seismometer (Passive Seismic Experiment) | onMoon | "The passive seismic experiment package and laser ranging retroreflector were deployed south of the LM. Excellent PSEP data were obtained, including detection of the crew walking on the surface" [SP4029-SUM]. "a passive seismometer, designed to measure seismic activity"; EASEP experiments "to be deployed and left on the lunar surface" [NSSDCA-LM]. MOONCAT: "Passive Seismic Experiment". It stopped accepting commands on 27 Aug 1969 [NSSDCA-LM]. |
| United States flag | onMoon | "the pair erected a three-by-five-foot United States flag on an eight-foot aluminum staff" [SP4029-SUM]. MOONCAT: "Flag Kit [1]". |
| Mementos | onMoon | MOONCAT: "Gold Olive Branch [1]", "Apollo 1 Patch (Honoring deceased astronauts Grissom, White, Chaffee) [1]", "Cosmonaut Medals (Honoring deceased cosmonauts Gagarin, Komarov) [2]", "Moon Memorial Disc [1]". |
| Backpacks, overshoes, TV camera | onMoon | MOONCAT: "Portable Life Support System (PLSS) [2]", "Overshoes, Lunar [2]", "TV subsystem, Lunar [1]", "Camera, Lunar TV [1]" and about 40 more small items. "LM equipment jettisoned" at GET 114:05, before LM liftoff at 124:22 [SP4029-TL]. |

Not listed in `left` because they are not "still out there": the service module (separated before re-entry: "The CM separated from the SM at 16:21:13 UT on 24 July" [NSSDCA-A11]; no source read states its fate) and the command module Columbia (returned to Earth).

## Viking 1 (Titan IIIE-Centaur TC-4)

Launch: "Titan/Centaur TC-4 was launched from the Eastern Test Range, Complex 41, at 05:22 PM EDT on Wednesday, August 20, 1975" [TC4 abstract]; SRM ignition (T = 0) at 21:22:00.155 GMT [TC4 Table 4-1].

### Event times [TC4 Table 4-1, page 25, "ACTUAL" column, read from the page image]

| event | predicted (s) | actual (s) | used in step |
|---|---|---|---|
| SRM ignition | 0 | 0 | liftoff |
| Stage I ignition | 110.67 | 110.4 | stage1Ignition |
| SRM jettison | 122.0 | 121.7 | srbGround |
| Stage I cutoff | 256.3 | 259.4 | (text) |
| Stage I jettison | 257.1 | 260.1 | stage1 |
| Stage II ignition | 257.1 | 260.1 | stage1 (ignite) |
| Centaur shroud jettison | 268.0 | 270.3 | fairing |
| Stage II cutoff | 459.6 | 467.7 | (not used) |
| Stage II jettison | 465.6 | 473.8 | stage2 |
| Centaur MES 1 | 476.1 | 484.3 | stage2 (ignite; text says "lights up") |
| Centaur MECO 1 | 602.8 | 611.3 | stage2 (text: "two minutes later ... in orbit") |
| Centaur MES 2 | 1523.0 | 1530.1 | tmi |
| Centaur MECO 2 | 1842.1 | 1846.1 | tmi (text: 316 s burn, "a little over 5 minutes") |
| Spacecraft separation | 2062.1 | 2066.1 | separation |
| Solar panel deploy complete | 2182.1 | 2201.9 | separation (text) |
| Begin Centaur blowdown | 2917.1 | 2921.7 | separation (text: "one last manoeuvre") |
| End Centaur blowdown | 3167.1 | 3171.7 | |

The same actual times appear in the report's narrative (section IV): "Stage I engine ignition occurring at 110.4 seconds into flight and SRM jettison occurring at 121.7 seconds"; "the Centaur Standard Shroud was jettisoned at 270.3 seconds"; "The Centaur was separated from the Titan at 473.8 seconds"; "MECO-1 occurred at 611.3 seconds"; "After coasting for 15.3 minutes"; "MES-2 occurred at 1530.1 seconds into flight and MECO-2 occurred at 1846.1 seconds"; "Spacecraft separation occurred by Centaur DCU command 220 seconds after Centaur Main Engine Cutoff (MECO-2)".

Other facts used in the step texts:
- Only the solids fire at liftoff: "Liftoff occurs approximately two-tenths of a second after ignition of the solid rocket motors"; "Stage I ignition of the Titan occurs when acceleration from the large solid motors reduces to 1.5 g. Approximately 12 seconds later, the solids are jettisoned" [VK-PK]. "Propellant depletion of the Stage 0 engines activated the Titan Step 0 staging timer ... which initiated Titan Stage I engine start" [TC4].
- Stage I to Stage II: "Titan Step I jettison/Stage II ignition was initiated by Stage I propellant depletion" [TC4].
- Shroud: "the 'nose cone' that protected the orbiter and lander during ascent through Earth atmosphere" [SP4212 ch8-7]; "Four compressed springs force the two halves to separate" [VK-PK].
- Stage II: "retro-rockets on the Titan Stage II slow the spent stage" [VK-PK].
- Parking orbit: "90 n.mi. circular parking orbit" (166.7 km) prescribed [TC4]; actual perigee x apogee 160.01 x 166.27 km (CIF), 162.98 x 172.23 km (Antigua), 158.17 x 165.47 km (GSFC) [TC4 Table 4-2]; press kit plan "167 km (104 mi.)" [VK-PK]. The JSON text says "about 165 km" and gives no `alt_km` key because no source gives the altitude at a single event.
- No altitude or speed at the staging events was found in a legible form, so no Viking step has `alt_km` or `speed_kmh`.
- After separation: "The Orbiter's four solar panels will be unfolded" [VK-PK]; "the spacecraft separated from the launch vehicle, and the solar panels deployed" [SP4212 ch10-5].

### Fates of the rocket parts

| part | where | evidence |
|---|---|---|
| srbGround | unknown | Jettison time only (121.7 s) [TC4]. Neither TC4 nor VK-PK states where they fell. General knowledge only: dropped far below orbital speed on an eastward launch from Cape Canaveral, so they fell back toward the Atlantic. |
| stage1 | unknown | Jettison time only (260.1 s) [TC4]. Same as above. |
| fairingA, fairingB | unknown | Jettison time only (270.3 s) [TC4]. Same as above. The press kit adds that "The cone-shaped bottom section of the shroud is bolted to the inter-stage adapter and is jettisoned later with the Titan stage" [VK-PK]. |
| stage2 | unknown | Jettison time only (473.8 s) [TC4]. Dropped before the Centaur's first burn reached orbit, and slowed by retro-rockets [VK-PK], so it fell back. No impact location in the sources read. |
| stage3 (Centaur D-1T) | sunOrbit (derived) | "Centaur then executed a reorientation and retromaneuver to satisfy planetary quarantine constraints" and "The Centaur completed the launch vehicle mission by performing a deflection maneuver after spacecraft separation to further enhance the Centaur's missing the planet" [TC4]. "At TMI plus 18 minutes, the Centaur will be deflected from a Mars flight path to one that bypasses the planet" [VK-PK]. TC4 Table 4-5 gives the Centaur's orbit after the deflection as hyperbolic relative to Earth (eccentricity 1.32 to 1.34, C3 about +20 km²/s²), that is, it escaped Earth. An object that escapes Earth and misses Mars stays in orbit around the Sun. **No source read uses the words "solar orbit" for this Centaur**; `sunOrbit` is a derivation from the flight data. |

### `left` (what the spacecraft left behind)

| item | where | evidence |
|---|---|---|
| Viking 1 Orbiter | unknown (last known: Mars orbit) | "On 7 August 1980 Viking 1 Orbiter was running low on attitude control gas and its orbit was raised from 357 x 33943 km to 320 x 56000 km to prevent impact with Mars and possible contamination until the year 2019. Operations were terminated on 17 August 1980 after 1485 orbits." [NSSDCA-VO1]. No source read says whether it is still in orbit today. The hint ("left in Mars orbit, shut down 1980") is confirmed. |
| Bioshield cap | unknown | Pre-launch plan only: "The Lander's bioshield cap will be jettisoned shortly after the Orbiter's star sensor has acquired the star Canopus" [VK-PK]; "After the spacecraft separates from the launch vehicle, the orbiter commands the lander computer to separate the bioshield cap" [SP4212 ch8-2]. SP4212 ch10-5 confirms Canopus was acquired "on the first try" but does not mention the cap. Nothing read says where the cap went. |
| Bioshield base and lander adapter | unknown (plan: Mars orbit) | Pre-launch plan only: "Several hours later the bioshield base and Lander adapter are jettisoned from the Orbiter; they will remain in Mars orbit." [VK-PK]. Indirect support: for Viking 2, "Normal operations called for the structure connecting the orbiter and lander (the bioshield) to be ejected after separation, but because of problems with the separation the bioshield was left attached to the orbiter." [NSSDCA-VO2], which implies Viking 1 followed normal operations, but no source read states it for Viking 1. |
| Aeroshell (heat shield) | onMars | "At 6 km altitude at about 250 m/s the 16 m diameter lander parachutes were deployed. Seven seconds later the aeroshell was jettisoned" [NSSDCA-VL1]. "the remaining lift in the lightened aeroshell permitted it to drift well away from the landing site" [SP4212 ch11-3]. "likely locations have been found for the heat shield, back shell, and parachute attached to the back shell" in a HiRISE image from Mars Reconnaissance Orbiter [PIA01881, page dated 5 Dec 2006]. Note the word "likely": the JSON says "probably". |
| Base cover and parachute | onMars | "At 1.5 km altitude, retro-rockets were ignited" [NSSDCA-VL1]; "The three terminal descent engines (TDE) will then be ignited and the parachute and base cover will be jettisoned" at "about 1.4 km (4,600 ft.)"; parachute "16 m (53 ft.) in diameter" [VK-PK]. HiRISE likely location as above [PIA01881]. |

The Viking 1 lander itself is the "machine" of the site, so it is not in `left`.

## Conflicts between sources

1. **Eagle ascent stage, jettison time.** SP4029-TL: "LM ascent stage jettisoned" at GET 130:09:31.2 = 23:41:31 GMT, 21 Jul 1969. NSSDCA-LM and NSSDCA-A11: "jettisoned into lunar orbit at 00:01:01 UT on 22 July". They differ by about 20 minutes. The JSON gives no clock time.
2. **Eagle ascent stage, fate.** SP4029-SUM: "The ascent stage would remain in lunar orbit for an indefinite period." A11-OVW: "the LM jettisoned and remained in lunar orbit". NSSDCA-LM: fate "not known", "assumed that it crashed into the lunar surface sometime within the following 1 to 4 months". MOONCAT: location "UNKNOWN". JSON: `where: "unknown"`.
3. **Apollo 11 launch vehicle number.** NSSDCA-A11 says "Saturn V SA-504"; SP4029-SUM says "SA-506". SA-506 is the correct one (it matches the spec); the NSSDCA page appears to be in error.
4. **TLI burn length.** NSSDCA-A11: "5 minutes, 48 seconds"; SP4029-SUM: 346.83 s (5 min 47 s). JSON text: "almost 6 minutes".
5. **When the S-IVB was sent to solar orbit.** A11-OVW: "The S-IVB stage separated and injected into heliocentric orbit four hours, 40 minutes into the flight". SP4029-TL: spacecraft ejected at 004:17:03, CSM evasive burn at 004:40:01, S-IVB slingshot venting and APS burn from 004:51 to 005:42. The JSON uses 004:17:03 for the separation.
6. **Saturn V height.** 111 m vs 363 ft (= 110.6 m), both in the same sentence of SATV.
7. **Viking predicted vs actual times.** Press kit (pre-launch): solids "begin to shut down 109 seconds after launch", first stage shuts down "258 seconds after launch", Stage I depletion "approximately T plus 260 seconds", Stage II depletion "approximately 467 seconds". TC4 actuals: 110.4, 259.4, 467.7. The JSON uses the actuals.
8. **Viking shroud jettison in the press kit.** One paragraph says "Approximately 60 seconds after Titan Stage II ignition", another says "approximately 10 seconds after Stage II ignition". Actual: 270.3 s, 10.2 s after Stage I jettison [TC4].
9. **Viking parking orbit altitude.** 167 km planned [VK-PK]; 90 n mi (166.7 km) prescribed, 158 to 172 km measured depending on the tracking station [TC4].
10. **T = 0 for TC-4.** Table 4-1: 21:22:00.155 GMT; Tables 7-8 and 8-21 headers: 21:22:00.115. Not relevant at the precision used.
11. **Viking 1 landing time (not used in the JSON).** NSSDCA-VO1 says 11:56:06 UT, NSSDCA-VL1 says 11:53:06 UT.
12. **Viking descent altitudes.** Parachute at 6 km [NSSDCA-VL1], "about 5.8 km (19,000 ft.)" [VK-PK], 5.9 km [SP4212 ch11-3]. Parachute and base cover release at 1.5 km [NSSDCA-VL1, SP4212 ch8-2] or 1.4 km [VK-PK]. The JSON says "about 6 km" and "about 1.5 km".
13. **"Viking A".** The TC-4 report calls its payload "Viking A"; NSSDCA lists "Viking-B" as an alternate name of the Viking 1 Orbiter. SP4212 ch10-5 explains that the two spacecraft were swapped on the pad before launch. Not used in the JSON.

## Could not verify (left out, or marked unknown)

- Where the Apollo 11 **launch escape tower** and **S-II aft interstage ring** fell. Only jettison times were found. Marked `unknown` with general wording. The Saturn V AS-506 flight evaluation report (not read) might have it.
- Where the TC-4 **solid rocket motors, Titan Stage I, shroud halves and Titan Stage II** fell. The TC-4 flight data report and the Viking press kit give times only. Marked `unknown` with general wording. They certainly did not reach orbit.
- The words "solar orbit" for the **TC-4 Centaur**: derived, see above.
- Whether the **bioshield cap** and **bioshield base** were actually released on Viking 1 as planned, and where they are. Only the pre-launch plan was found. Marked `unknown`.
- Whether the **Viking 1 Orbiter** is still in Mars orbit in 2026. NSSDCA only gives the 2019 design date. Marked `unknown`.
- The **Apollo 11 F-1 engine parts recovered from the Atlantic in 2013**: no nasa.gov page was found that confirms the Apollo 11 identification, so it is not in the JSON.
- "Five engines" on each of the first two Saturn V stages: not stated in the pages read, so the texts just say "the first stage engines".
- The retroreflector being "still in use": the NASA page that says so returned 404, so the JSON only says what it is for.
- The date of the HiRISE image (22 Nov 2006) comes from a search snippet of the HiRISE site; the JSON only says "in 2006", which the JPL page date (5 Dec 2006) supports.
- Fate of the Apollo 11 service module and SLA panels: not found, not in the JSON.

## Notes for whoever merges this into `wip/66-stages-data.js`

- **`where` has no Mars-orbit value.** The Viking 1 Orbiter and the bioshield base were last known (or planned) to be in Mars orbit. The enum has `moonOrbit` but no `marsOrbit`, so both are `unknown` with the orbit explained in the fate text. If a `marsOrbit` value is added, the orbiter is the natural candidate (with "as of 1980").
- **`site: "kennedy"`** for Apollo 11 (the spec example only shows `"cape"`). Change it if the site map uses another key.
- Five Viking parts and two Apollo parts are `unknown` only because no source read names the impact place for that flight. If the site prefers to show "fell back toward the Atlantic (general)" for these, the fate texts already say so.
- Viking liftoff: `ignite` is `["srbGround"]` only. The core engine (`stage1`) lights in flight in the next step, at 110.4 s. This is a real feature of the Titan IIIE and a nice thing to show.
- On Apollo 11 the last step drops `stage3` at CSM/LM ejection (4 h 17 min), not at the earlier CSM separation (3 h 15 min).
- Validation run: JSON parses; 9 steps per mission; every `drop`/`ignite`/`part` id is canonical; every dropped part has a fate in drop order; `where` values are in the enum; titles 2 to 5 words; step texts at most 220 characters; no em or en dashes, no exclamation marks; Spanish numbers use the decimal comma and thousands dot.

## Verification

Independent fact-check, 15 Nov 2026. The goal was to refute the notes above, not to trust them. `heavy.json` was rewritten in place with the corrections listed here. Where this section disagrees with the notes above, this section wins.

How it was checked: every cited NASA and NSSDCA web page was downloaded again and read as raw text (not through a summariser; a summariser misread one SP-4029 row during this check, the raw page was right). The OCR text layer of the NTRS PDFs was extracted with `pdftotext`. TC-4 Tables 4-1, 4-2 and 4-5 were also read from the page images (PDF pages 29, 30 and 34, printed pages 25, 26 and 30). Three sources that the first pass did not use were added (V1 to V3 below). Wikipedia was not used.

### Extra sources opened in this check

| key | what | URL |
|---|---|---|
| V1 | NASA CR-145148, "Viking 75 Project: Viking Lander System Primary Mission Performance Report", Martin Marietta, April 1977, NTRS 19770022101 | https://ntrs.nasa.gov/api/citations/19770022101/downloads/19770022101.pdf |
| V2 | "The Deep Space Network Progress Report 42-46, May and June 1978", JPL, 15 Aug 1978 (NASA-CR-157608), NTRS 19780024194, section "Viking Operations" | https://ntrs.nasa.gov/api/citations/19780024194/downloads/19780024194.pdf |
| V3 | NASA Science, "Viking 1" mission page (text from Siddiqi, Beyond Earth, NASA History Program Office, 2018) | https://science.nasa.gov/mission/viking-1/ |

### Confirmed (source says exactly this, for this flight)

Apollo 11 / Saturn V SA-506
- All nine step times against the SP-4029 timeline: range zero 13:32:00 GMT 16 Jul 1969; S-IC/S-II separation command 000:02:42.30 (162.3 s); S-II aft interstage jettisoned 000:03:12.3 (192.3 s); launch escape tower jettisoned 000:03:17.9 (197.9 s); S-II/S-IVB separation command 000:09:09.00 (549.0 s); Earth orbit insertion 000:11:49.33 (709.33 s); S-IVB second burn ignition 002:44:16.2 (9856.2 s); CSM/LM ejected from S-IVB 004:17:03.0 (15423.0 s). https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11i_Timeline.htm
- Altitude and speed at the three steps that carry them, recomputed from the ascent table (space-fixed velocity column): 36.029 n mi and 9,100.6 ft/s give 66.7 km and 9,986 km/h; 101.175 n mi and 22,699.6 ft/s give 187.4 km and 24,908 km/h; 103.176 n mi and 25,567.9 ft/s give 191.1 km and 28,055 km/h. The two separation times are commanded times (table footnote). https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11d_Ascent_Phase.htm
- Summary page: launched from Kennedy Space Center LC-39 Pad A; vehicle SA-506; S-IC impact in the Atlantic at 000:09:03.70, 357.1 n mi (661 km) from the launch site; S-II impact in the Atlantic at 000:20:13.7, 2,371.8 n mi (4,393 km); both impacts are marked theoretical in the timeline; TLI burn 346.83 s after 1.5 Earth orbits and in-flight systems checks, 35,545.6 ft/s (39,003 km/h) at injection; S-IVB sent past the Moon into solar orbit, closest approach to the lunar surface 1,825 n mi (3,380 km) at 20:14 GMT on 19 July, period 342 days; flag on an aluminum staff; seismic package and retroreflector deployed south of the LM, crew footsteps detected; plaque on the strut behind the ladder. https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11a_Summary.htm
- Classic mix-up checked: the Apollo 11 S-IVB went into solar orbit (SP-4029 and NSSDCA 1969-059B agree). It did not hit the Moon. The NASA Saturn V page covers both cases in general (the third stage either stayed in space or hit the Moon); for this flight it stayed in space. https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059B
- Escape tower purpose and the fact that the escape system was never needed on any Apollo launch. https://www.nasa.gov/wp-content/uploads/static/history/SP-350/ch-4-5.html
- NSSDCA LM page: descent stage left on the Moon as the launch platform; ascent stage jettisoned into lunar orbit, fate not known, assumed to have crashed. https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- NSSDCA retroreflector page: left on the surface, reflects laser beams from Earth back for Earth to Moon distance measurement. https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04
- NASA catalogue of material on the Moon: every item named in the three `left` entries that cite it sits under the Apollo 11 heading (flag kit, gold olive branch, Apollo 1 patch, two cosmonaut medals for Gagarin and Komarov, Moon memorial disc, two PLSS backpacks, two lunar overshoes, lunar TV camera, passive seismic experiment, retroreflector, descent stage with plaque, ascent stage with location unknown). https://www.nasa.gov/wp-content/uploads/2024/02/final-catalogue-of-manmade-material-on-the-moon.pdf
- ROCKETS_INFO.saturnV: 111 m, first launch 1967 (Apollo 4), most powerful rocket flown successfully, three stages, built to send people to the Moon. https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/

Viking 1 / Titan IIIE-Centaur TC-4
- All step times against TC-4 Table 4-1, ACTUAL column, read from the page image, and against the narrative of section IV: SRM ignition T = 0 at 21:22:00.155 GMT on 20 Aug 1975; Stage I ignition 110.4 s; SRM jettison 121.7 s; Stage I jettison and Stage II ignition 260.1 s; Centaur shroud jettison 270.3 s; Stage II jettison 473.8 s; Centaur MES 1 484.3 s; MECO 1 611.3 s; MES 2 1530.1 s; MECO 2 1846.1 s; spacecraft separation 2066.1 s; solar panel deploy complete 2201.9 s; Centaur blowdown 2921.7 to 3171.7 s. Coast of 15.3 minutes, second burn 316 s, separation 220 s after MECO 2. https://ntrs.nasa.gov/api/citations/19760021170/downloads/19760021170.pdf
- Parking orbit 158 to 172 km depending on the tracking station (Table 4-2), 90 n mi prescribed; the text says about 165 km and no `alt_km` key is used. Same URL.
- The Centaur made a retromaneuver and a deflection manoeuvre after separation so as to miss Mars; Table 4-5 gives its orbit after the blowdown as hyperbolic relative to Earth (eccentricity 1.32 to 1.34, C3 20.1 to 20.8 km2/s2). Same URL.
- Press kit: height 48.8 m; Titan III-E booster plus Centaur D-1T; two solid motors called Stage 0; liftoff on the solids alone with Stage I ignition in flight; shroud split into two halves; retro-rockets slow the spent Stage II; Centaur propellants liquid hydrogen and liquid oxygen; the Viking launches were the second and third operational Titan Centaur launches after Helios on 10 Dec 1974; bioshield described as a two-piece white cocoon; parachute 16 m; parachute and base cover jettisoned when the terminal descent engines ignite. https://ntrs.nasa.gov/api/citations/19750018961/downloads/19750018961.pdf
- First Titan-Centaur lost in February 1974, so `firstYear` 1974 holds for both the first flight and the first success. https://www.nasa.gov/history/centaur-launched-a-generation-of-interplanetary-missions
- Descent hardware: parachute at about 6 km, aeroshell jettisoned 7 s later, retro-rockets at 1.5 km (NSSDCA lander page). The actual flight values in V1 agree: parachute at a computed 19,300 ft (5.9 km), aeroshell released 7 s later, engines lit at 4,787 ft (1.46 km) for Lander 1, parachute and base cover separated 2 s after that. https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C
- HiRISE image: the lander was located, and likely locations (the page's word) were found for the heat shield, the back shell and the parachute; page date 5 Dec 2006. The JSON says probably. https://science.nasa.gov/photojournal/viking-lander-1-thomas-a-mutch-memorial-station-imaged-from-orbit
- Orbiter orbit raised on 7 Aug 1980 from 357 x 33,943 km to 320 x 56,000 km to prevent impact with Mars until 2019. https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075A

Structure: JSON parses (Python and Node); exact key set of the spec; 9 steps per mission in chronological order; only canonical part ids for `saturnV` and `titan3e`; every dropped part has a fate, in drop order; `where` values in the enum; titles 2 to 5 words; step texts at most 220 characters in both languages (longest is 215); no em or en dashes, no exclamation marks; Spanish number format.

### Corrected

1. **Viking 1 Orbiter, end of mission.** Two NASA sources disagree. NSSDCA: operations terminated 17 Aug 1980 after 1485 orbits. NASA Science (V3): shut down 7 Aug 1980 on its 1,489th orbit. The JSON gave the NSSDCA values as fact. It now says August 1980 and more than 1,400 orbits, which both sources support.
2. **Bioshield cap: now a confirmed event, not a plan.** V1 reports that the bioshield cap was separated by Orbiter command about 2 hours after launch, on both flights. The fate text now says it was released about 2 hours after launch, already on the way to Mars. `src` changed to V1. `where` stays `unknown` (no source says where it is now).
3. **Bioshield base: now a confirmed event, not a plan.** V2 reports that the Viking Orbiter 1 aft-bioshield was separated shortly after lander separation in 1976 (and that Orbiter 2 kept its own until 3 Mar 1978, which matches the NSSDCA Viking 2 remark). The fate text now says the orbiter released it in 1976, shortly after the lander left, while circling Mars. `src` changed to V2. `where` stays `unknown` (the enum has no Mars-orbit value and no source says whether it is still in orbit). V2 calls the piece the aft bioshield; the press kit calls it the bioshield base.
4. **`site` for Apollo 11: `kennedy` changed to `cape`.** The site code only knows two keys: `src/js/65-launch.js` defines `LX_SITE` with `cape` and `vandenberg` and treats anything else as `cape`, and every other file in `docs/etapas/` uses those two. The step text still says Pad 39A at Kennedy Space Center.
5. **Seven suborbital parts** (Apollo 11 interstage ring and escape tower; TC-4 solid motors, Stage I, both shroud halves, Stage II). The fate texts carried a general claim that pieces dropped this early fall into the Atlantic. No source read backs that for these pieces on these flights, so the claim was cut. Each fate now says only: dropped at T, before orbit, fell back to Earth, place not found. `where` stays `unknown`.
6. **Eagle descent stage plaque.** The text said the plaque is on one of its legs. Both sources say it is on the strut behind the ladder. The text now says behind the ladder.
7. **Wording for children.** The repeated "the sources we read do not say where" became "we could not find where" (shorter, and it does not claim that nobody knows). Fate texts for the unknown parts went from up to 248 characters to at most 150.
8. **Viking separation step.** Reworded so that the solar orbit reads as a consequence of the stage having escaped Earth, which is what the flight data show (see Still unverified).
9. **Eagle ascent stage.** The text carried the NSSDCA assumption that it crashed into the Moon, while SP-4029 and the NASA mission overview say it stayed in lunar orbit. Same rule as for the Viking orbiter: keep only what all sources support. The text now says it was cast off in lunar orbit and that it is not known where it ended up (NSSDCA: fate not known; NASA catalogue: location unknown). https://www.nasa.gov/missions/apollo/apollo-11-mission-overview/

### Removed

- "17 August 1980" and "1,485 orbits" for the Viking 1 Orbiter (source conflict, see Corrected 1).
- "and lander adapter" from the name of the bioshield base item: the source for the actual event (V2) names only the aft bioshield; the adapter appears only in the pre-launch plan.
- The general "falls into the Atlantic" clauses from seven fate texts (see Corrected 5).
- "It is assumed to have crashed into the surface" for the Eagle ascent stage (one source only, contradicted by two others, see Corrected 9).
- Nothing else was deleted. No step time, altitude or speed had to be removed.

### Still unverified

- Impact places of the Apollo 11 escape tower and S-II aft interstage ring, and of the TC-4 solid motors, Titan Stage I, shroud halves and Titan Stage II. All `where: "unknown"`. That they fell back to Earth is a deduction from the flight data (orbit was reached only at 709 s on Apollo 11 and at 611 s on TC-4), not a quoted statement. The Saturn V AS-506 flight evaluation report was still not read.
- TC-4 Centaur `where: "sunOrbit"` is derived, not quoted: the flight report shows a hyperbolic Earth-escape orbit after the deflection and says the stage was steered to miss Mars. No source read uses the words solar orbit for this stage.
- Whether the Viking 1 Orbiter and its bioshield base are still in Mars orbit today, and where the bioshield cap is. All three are `unknown`. If a `marsOrbit` value is added to the enum, the orbiter and the bioshield base are the candidates, with "as of 1980" and "as of 1976".
- Eagle ascent stage: sources still conflict (SP-4029: would stay in lunar orbit indefinitely; NSSDCA: fate not known, assumed crashed; NASA catalogue: location unknown). `unknown`, no clock time given, and the text no longer picks a side.
- The piece that Viking Orbiter 1 released in 1976 is called the aft bioshield in V2; reading it as the press kit's bioshield base is this check's interpretation.
- S-IC and S-II impact points are calculated (theoretical) points; the texts say so.
- Apollo 11 `speed_kmh` uses the space-fixed column of SP-4029; other missions' files may use another frame. Check before showing speeds side by side.
- `family` and `firstYear` describe the exact vehicle (Saturn V 1967, Titan IIIE-Centaur 1974), not the wider Saturn or Titan III families.
- No `alt_km` or `speed_kmh` on any Viking step: none found in a legible source.

### Notes above that this check supersedes

- "Could not verify: whether the bioshield cap and bioshield base were actually released on Viking 1": both events are now confirmed (V1, V2). Only their present location is unknown.
- The `site: "kennedy"` merge note: resolved, the key is now `cape`.
- Add to the conflicts list: 14. Viking 1 Orbiter end of mission, 17 Aug 1980 after 1485 orbits (NSSDCA) against 7 Aug 1980 on the 1,489th orbit (NASA Science).
