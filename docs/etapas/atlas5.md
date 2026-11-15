# Atlas V launch sequences: InSight (atlasV401) and Mars 2020 / Ingenuity (atlasV541)

Research notes for `docs/etapas/atlas5.json`. Read on 15 Nov 2026. Every fact below has the URL where it was read. "Summary" means the page was read through the fetch tool's summariser (short quotes are exact, the rest is paraphrase). "PDF text" means the PDF was converted to text locally with `pdftotext` and read directly. "Snippet" means a search-result snippet only.

## 0. Sources used

| Tag | What | URL | How read |
|---|---|---|---|
| IK-M | JPL InSight Launch Press Kit, Mission overview | https://www.jpl.nasa.gov/news/press_kits/insight/launch/mission/ | summary |
| IK-F | JPL InSight Launch Press Kit, Launch Facts | https://www.jpl.nasa.gov/news/press_kits/insight/launch/facts/ | summary |
| IK-S | JPL InSight Launch Press Kit, Spacecraft (planetary protection) | https://www.jpl.nasa.gov/news/press_kits/insight/launch/mission/spacecraft/ | summary |
| IL-M | JPL InSight Landing Press Kit, Mission | https://www.jpl.nasa.gov/news/press_kits/insight/landing/mission/ | summary |
| IL-S | JPL InSight Landing Press Kit, Spacecraft | https://www.jpl.nasa.gov/news/press_kits/insight/landing/mission/spacecraft/ | summary |
| JN-0406 | JPL news, 6 Apr 2018, "Bound for Mars: Countdown to First Interplanetary Launch from California" | https://www.jpl.nasa.gov/news/bound-for-mars-countdown-to-first-interplanetary-launch-from-california/ | summary |
| JN-0523 | JPL news, 23 May 2018, "InSight Steers Toward Mars" | https://www.jpl.nasa.gov/news/insight-steers-toward-mars/ | summary |
| NB-I | NASA InSight launch blog, 5 May 2018 (index of posts) | https://science.nasa.gov/blogs/insight/2018/05 | summary |
| NB-I-L | NASA blog post "Liftoff! Atlas V Clears the Launch Pad with NASA's InSight Spacecraft" | https://science.nasa.gov/blogs/insight/2018/05/05/liftoff-atlas-v-clears-the-launch-pad-with-nasas-insight-spacecraft/ | summary of index |
| ULA-I | ULA Atlas V InSight mission booklet (not NASA-hosted) | https://www.ulalaunch.com/docs/default-source/launch-booklets/mob_insightfinal.pdf | PDF text |
| NSSDCA-I | NSSDCA InSight, 2018-042A | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A | summary |
| ODQN-22-3 | NASA Orbital Debris Quarterly News vol. 22 issue 3 (Sep 2018), International Space Missions table | https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv22i3.pdf | PDF text |
| JN-HiRISE-I | JPL news, 13 Dec 2018, "Mars InSight Lander Seen in First Images from Space" | https://www.jpl.nasa.gov/news/mars-insight-lander-seen-in-first-images-from-space/ | summary |
| PIA22875 | JPL image "InSight on Mars, As Seen by HiRISE" | https://www.jpl.nasa.gov/images/pia22875-insight-on-mars-as-seen-by-hirise/ | summary |
| JN-MarCO | JPL news, 5 Feb 2019 (updated 27 Feb 2020), "The MarCO Mission Comes to an End" | https://www.jpl.nasa.gov/news/the-marco-mission-comes-to-an-end/ | summary |
| NS-MarCO | NASA Science mission page, MarCO | https://science.nasa.gov/mission/marco/ | summary |
| MK-M | JPL Mars 2020 Perseverance Launch Press Kit, Mission overview | https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/ | summary |
| MK-Q | JPL Mars 2020 Launch Press Kit, Quick Facts | https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/quick_facts/ | summary |
| MK-G | JPL Mars 2020 Launch Press Kit, Getting to Mars | https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/spacecraft/getting_to_mars/ | summary |
| MK-B | JPL Mars 2020 Launch Press Kit, Biological Cleanliness | https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/spacecraft/biological_cleanliness/ | summary (full sentences quoted) |
| ML-M | JPL Mars 2020 Landing Press Kit, Mission | https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/ | summary |
| ULA-M | ULA Atlas V Mars 2020 mission booklet, dated 17 Jul 2020 (not NASA-hosted) | https://www.ulalaunch.com/docs/default-source/launch-booklets/mars2020_mobrochure_200717.pdf | PDF text |
| NR-M | NASA news release 20-077, 30 Jul 2020, "NASA, ULA Launch Mars 2020 Perseverance Rover Mission to Red Planet" | https://www.nasa.gov/news-release/nasa-ula-launch-mars-2020-perseverance-rover-mission-to-red-planet/ | summary |
| NB-M | NASA Perseverance launch blog, 30 Jul 2020 | https://science.nasa.gov/blogs/perseverance-mars-rover/2020/07/30/ | summary |
| NTRS-M | NTRS 20220000775, Abilleira et al., "Mars 2020 Perseverance trajectory reconstruction and performance from launch through landing" (abstract only, no download) | https://ntrs.nasa.gov/citations/20220000775 | summary |
| NSSDCA-M | NSSDCA Mars 2020, 2020-052A | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052A | summary |
| ODQN-24-4 | NASA Orbital Debris Quarterly News vol. 24 issue 4 (Nov 2020), International Space Missions table | https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv24i4.pdf | PDF text |
| SEIS | NASA, Supplemental Environmental Impact Statement for the Mars 2020 Mission, public draft (2019) | https://www.nasa.gov/sites/default/files/atoms/files/mars_2020_public_draft_seis.pdf | PDF text |
| MSL-K | JPL Mars Science Laboratory Launch Press Kit (Nov 2011): same rocket type (Atlas V 541) and same pad, a DIFFERENT flight | https://www.jpl.nasa.gov/news/press_kits/MSLLaunch.pdf | PDF text |
| PIA24333 | JPL image "Perseverance and Mars 2020 Spacecraft Components on the Surface" | https://www.jpl.nasa.gov/images/pia24333-perseverance-and-mars-2020-spacecraft-components-on-the-surface/ | summary |
| JN-F26 | JPL news, 27 Apr 2022, "NASA's Mars Helicopter Spots Gear That Helped Perseverance Rover Land" | https://www.jpl.nasa.gov/news/nasas-mars-helicopter-spots-gear-that-helped-perseverance-rover-land/ | summary |
| PIA24448 | JPL image "Perseverance Rover Drops its Debris Shield" | https://www.jpl.nasa.gov/images/pia24448-perseverance-rover-drops-its-debris-shield/ | summary |
| NI-CS | NASA image feature "Perseverance Rover's Cruise Stage Separates" | https://www.nasa.gov/image-feature/jpl/perseverance-rover-s-cruise-stage-separates | summary |
| NS-Pers | NASA Science mission page, Mars 2020 Perseverance (page updated 14 Oct 2026) | https://science.nasa.gov/mission/mars-2020-perseverance/ | summary |
| JN-Ing | JPL news, 25 Jan 2024, "After Three Years on Mars, NASA's Ingenuity Helicopter Mission Ends" | https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/ | summary |
| LSP | NASAfacts, Launch Services Program (KSC) | https://public.ksc.nasa.gov/lsplaunch/wp-content/uploads/sites/18/2023/03/LSP-Facts.pdf | PDF text |
| BSF-14 | NASA Science, Basics of Space Flight, Chapter 14: Launch | https://science.nasa.gov/learn/basics-of-space-flight/chapter14-1/ | summary |
| SFN-M | Spaceflight Now, 29 Jul 2020, Atlas 5 launch timeline for Mars 2020 (not NASA; cross-check only) | https://spaceflightnow.com/2020/07/29/atlas-5s-launch-timeline-on-the-mars-2020-mission/ | summary |

Pages that could not be read: `hdl.handle.net/2014/52267` (the full text of NTRS-M, which promises actual vs predicted launch vehicle events: HTTP 500), `web.archive.org` (blocked), the old `mars.nasa.gov/.../launch-vehicle/` and `/launch-sequence/` pages (now redirect to generic pages), the Mars 2020 launch press kit PDF and NTRS 20190003901 (over the 10 MB fetch limit), `sma.nasa.gov/LaunchVehicle/atlas.html` (HTTP 500), the Springer page of Fernando et al. 2022 (login redirect).

## 1. Hints from the task: verified or corrected

| Hint | Result |
|---|---|
| Atlas V first stage = Common Core Booster with RD-180 | Verified. IK-M: "main booster is 107 feet (32.5 meters) long", throttleable RD-180, "Thermally stable kerosene fuel (type RP-1) and liquid oxygen". ULA-I and ULA-M: "RD-180 engine system (a single engine with two thrust chambers)". |
| Centaur upper stage | Verified. IK-M: Centaur 12.7 m long, 3.1 m diameter, restartable RL-10C, liquid hydrogen and liquid oxygen. ULA-M: RL10C-1, 12.6 m long. |
| 4 solid boosters on the 541 | Verified. MK-M: "a 5-meter (17-foot) short payload fairing, four solid-rocket boosters, and a one-engine Centaur upper stage". |
| The 5 m fairing of the 541 is jettisoned while the first stage still burns | Verified. ULA-M: PLF Jettison 00:03:27.6, BECO 00:04:22.1. Same order in MSL-K for the Curiosity flight ("During that burn, at about 3 minutes and 25 seconds after liftoff, the payload fairing ... is jettisoned"). On the 401 the order is the opposite: fairing jettison comes 8 s after Centaur ignition (IK-M). |
| InSight first stage in the Pacific | Verified as a pre-launch plan. IK-M: about six seconds after BECO the first stage is jettisoned, "It will fall into the Pacific Ocean." No post-flight confirmation found. |
| Mars 2020 boosters and first stage in the Atlantic | NOT stated for this flight in any source read (press kit HTML, launch blog, news release, NSSDCA, ULA booklet, Spaceflight Now timeline). In the JSON: `where:"unknown"`. General evidence in section 5. |
| Centaur into solar orbit after separation | No page read uses the words "solar orbit" or "heliocentric" for either Centaur. It follows from several NASA statements (section 5). In the JSON: `where:"sunOrbit"`, flagged as deduced. |
| InSight cruise stage, heat shield, backshell and parachute on Mars, photographed by HiRISE | Heat shield and parachute: verified (JN-HiRISE-I, PIA22875). Back shell: NASA's caption names only "its heat shield and its parachute"; the back shell is inferred to be with the parachute (IL-M: "the lander separates from the back shell and parachute"). Cruise stage: NOT photographed; NASA only said it was "expected to impact Mars" (IK-S, IL-S). |
| MarCO CubeSats in solar orbit | Verified. JN-MarCO: "The MarCOs are in orbit around the Sun". ODQN-22-3 lists MARCO-A and MARCO-B as HELIOCENTRIC. |
| Mars 2020 backshell and parachute photographed by Ingenuity in 2022 | Verified. JN-F26: "10 aerial color images taken April 19 during Ingenuity's Flight 26". |
| Sky crane flew away and crashed | Verified. PIA24333: "The descent stage flew off to crash at a safe distance", "a V-shaped debris pattern that points back toward the rover". |
| Perseverance still working | Verified as of the NASA page updated 14 Oct 2026 (NS-Pers): "Active Mission", "still operational and moving across the surface"; odometer 45.22 km on 11 Oct 2026. |
| Flight numbers AV-078 and AV-088 | AV-088 verified (NTRS-M abstract: "Atlas V 541 (AV-088)"). AV-078 was NOT found in any NASA page read; it is not used in the JSON. |

## 2. ROCKETS_INFO

### atlasV401
- Height 57.3 m: IK-F "Height with payload: 188 feet (57.3 meters)"; IK-M "approximately 188 feet (57.3 meters) tall". ULA-I says "approximately 189 ft" (conflict of 1 ft, about 0.3 m). JSON uses 57.3.
- Digit code: IK-M "The three numbers in the 401 designation signify a payload fairing -- or nose cone -- that is about 13 feet (4 meters) in diameter; zero solid-rocket boosters supplementing the main booster, and one engine on the upper stage."
- Family options: LSP "multiple configurations of the Atlas V rocket to carry payloads ranging from four- to five-meter-diameter fairing in size ... Up to five solid rocket boosters can be added". BSF-14: "adding between one and five strap-on solid rocket boosters".
- First flight of the family, 2002: BSF-14 "the first Atlas-V launch in August 2002". ULA-I (401 configuration): "First Launch: Aug. 21, 2002", "Launches to date: 37".
- Dimensions (IK-M): first stage 32.5 m x 3.8 m; Centaur 12.7 m x 3.1 m; fairing 12.2 m long, 4.2 m at the widest; RD-180 "up to about 850,000 pounds (3.8 million newtons)"; RL-10C "up to about 22,890 pounds (101,820 newtons)".
- IK-F: "InSight is the first interplanetary launch from the West Coast."

### atlasV541
- Height 60 m: MK-M "It stands at 197 feet (60 meters) tall."; ULA-M "approximately 60 m (197 ft)". A search snippet of the old mars.nasa.gov launch vehicle page gives "191 feet (58 meters)" (conflict; that page now redirects and could not be read). JSON uses 60.
- Digit code: MK-M (quoted above).
- The 5 m fairing covers the Centaur too: ULA-M "The bisector (two-piece shell) PLF encapsulates both the Centaur and the satellite."
- Boosters: ULA-M "Four solid rocket boosters (SRBs) generate the additional power required at liftoff, each providing 1.55 mega-Newtons (348,500 lbs) of thrust." RD-180: 3.83 MN at sea level.
- `firstYear`: JSON uses 2002 (first flight of the Atlas V family, as the task asks). The 541 configuration itself first flew on 26 Nov 2011 with Curiosity (ULA-M: "an Atlas V 541 rocket launched NASA's Curiosity rover", "First Launch: Nov. 26, 2011", "Launches to date: 6"). If the merged data wants the variant year, use 2011.

## 3. InSight ascent (rocket atlasV401, Vandenberg SLC-3E, 5 May 2018)

Liftoff: NB-I-L "Booster ignition and liftoff of the United Launch Alliance Atlas V rocket at 7:05 a.m. EDT (4:05 a.m. PDT)"; NSSDCA-I "5 May 2018 at 11:05 UT". Pad: IK-F says "Space Launch Complex 3"; the "E" comes from the project spec table.

All times are PLANNED values counted from T-zero. IK-M: "The launch time, called 'T Zero,' is when the engine is ready and 1.1 seconds before liftoff." ULA-I likewise puts "Liftoff (Thrust to Weight > 1)" at 0:00:01.1 and RD-180 ignition at -0:00:02.7. I did not subtract the 1.1 s. No as-flown event times were found; the NASA blog (NB-I) only confirms that each event happened ("following on-time booster engine cutoff and Atlas/Centaur separation", "The payload fairing has been jettisoned", "We have spacecraft separation").

| Event | JPL (used in JSON) | ULA-I (corroboration) |
|---|---|---|
| Booster engine cutoff | IK-M "about 244 seconds after T Zero" | 0:04:04.3 (244.3 s) |
| Atlas/Centaur separation | IK-M six seconds later, 250 s | 0:04:10.3 |
| Centaur first start (MES-1) | IK-M "Approximately 10 seconds after separation", 260 s | 0:04:20.3 |
| Fairing jettison | IK-M "eight seconds later", 268 s | 0:04:28.3 |
| First cutoff (MECO-1), parking orbit | JN-0406 "13 minutes and 16 seconds after launch", 796 s; IK-M "nearly circular at an altitude of 115 miles (185 kilometers)" | 0:13:16.2 |
| Second start (MES-2) | JN-0406 "at one hour and 19 minutes after launch", 4740 s; IK-M burn "about five minutes as the stack passes close to the North Pole" | 1:18:56.9 (4736.9 s) |
| MECO-2 | not timed by JPL | 1:24:19.8 |
| InSight separation | JN-0406 "about 93 minutes after liftoff", 5580 s; IK-M nine minutes after MECO-2, by "actuators and push-off springs" | 1:33:19.8 (5599.8 s) |
| MarCO-A separation | IK-M order only: "MarCO-A will be released by its CubeSat dispenser, the Centaur will roll 180 degrees, MarCO-B will be released" | 1:33:53.8 |
| MarCO-B separation | | 1:34:41.8 |
| Start blowdown / end of mission | | 1:59:39.8 / 2:41:19.8 |

Other ULA-I values: Begin pitch/yaw 0:00:17.1, Mach 1 0:01:17.8, max dynamic pressure 0:01:26.9; orbit at separation C3 8.19 km2/s2, flight azimuth 63.4 deg (sic), DLA -40.83 deg.
Other JN-0406 values: vertical climb for the first 17 seconds, then "a southerly trajectory"; first stage shuts down "at an altitude of about 66 miles (106 kilometers)"; coast "59 to 66 minutes"; separation "approximately over the Alaska-Yukon region". Not used in the JSON texts except the coast ("about an hour").
MarCO launch position: NB-I "have launched from dispensers mounted on the aft bulkhead carrier of the Atlas V Centaur second stage". IK-F: each MarCO 36.6 x 24.3 x 11.8 cm, 13.5 kg; "MarCO is the first mission to test CubeSats in deep space."

## 4. Mars 2020 ascent (rocket atlasV541, Cape Canaveral SLC-41, 30 Jul 2020)

Liftoff: NR-M 7:50 a.m. EDT from "Space Launch Complex 41 at Cape Canaveral Air Force Station"; NTRS-M "11:50:00 UTC (T-Zero time) on July 30, 2020", vehicle "Atlas V 541 (AV-088)".

NASA pages give NO event times for this ascent: MK-M only says separation comes "Approximately 50 to 60 minutes after launch"; NB-M only "Main Engine Cutoff (MECO), Payload Fairing Jettison (PLF), and Booster Engine Cutoff (BECO) all are complete", "Main engine start (MES) #2 is complete"; NR-M "placed the Mars 2020 spacecraft into a parking orbit around Earth. The engine fired for a second time and the spacecraft separated from the Centaur as expected."

So the JSON times come from the ULA booklet (ULA-M, footnote "All Values Approximate"; PLANNED, counted from T-zero; liftoff itself is at 00:00:01.1). The event/time pairing was checked twice (layout and raw text order of the PDF). The same values appear in Spaceflight Now's timeline of 29 Jul 2020 (SFN-M), so they belong to the 30 July launch date.

| # | Event | ULA-M time | seconds |
|---|---|---|---|
| 1 | Liftoff (Thrust to Weight > 1) | 00:00:01.1 | 1.1 |
| 2 | SRB Jettison | 00:01:49.3 | 109.3 |
| 3 | PLF Jettison | 00:03:27.6 | 207.6 |
| 4 | Atlas Booster Engine Cutoff (BECO) | 00:04:22.1 | 262.1 |
| 5 | Atlas Centaur Separation | 00:04:28.1 | 268.1 |
| 6 | Main Engine Start (MES1) | 00:04:38.1 | 278.1 |
| 7 | Main Engine Cutoff (MECO1) | 00:11:27.9 | 687.9 |
| 8 | Main Engine Start (MES2) | 00:44:59.5 | 2699.5 |
| 9 | Main Engine Cutoff (MECO2) | 00:52:50.1 | 3170.1 |
| 10 | Mars 2020 Separation | 00:57:32.8 | 3452.8 |
| 11 | Start Blowdown | 01:23:52.8 | |
| 12 | End of Mission | 01:57:12.8 | |

Derived durations used in the texts: first Centaur burn 6 min 50 s ("almost seven minutes"), coast 33 min 32 s ("about half an hour"), second burn 7 min 51 s ("almost eight minutes"). ULA-M also gives the orbit at separation: C3 14.49 km2/s2. SFN-M adds Mach 1 at 0:00:35.2 and max-Q at 0:00:47.1 (not used). No altitude or speed is given for this flight by any source read, so no `alt_km` / `speed_kmh` keys. (MSL-K gives altitudes and speeds, but for the 2011 Curiosity flight: not used.)

## 5. Fates of the rocket parts

### InSight (AV flight of 5 May 2018)
- `stage1`: `ocean`. IK-M (pre-launch plan): the first stage is jettisoned about six seconds after BECO, "It will fall into the Pacific Ocean."
- `interstage`: `unknown`. IK-M: "Two interstage adapters connect the first stage of the Atlas with its Centaur upper stage." and "The interstage adapter attached to the Centaur encloses the aft bulkhead carrier while the stages are linked." The page does not say what happens to either adapter after separation. ULA-I shows "Interstage Adapter" and "Aft Stub Adapter" as separate items of the stack. General knowledge, NOT read in any fetched page (ULA Atlas V user's guide, 2010 edition at https://www.ulalaunch.com/docs/default-source/rockets/atlasvusersguide2010.pdf, too large to fetch): the separation plane is at the Centaur aft stub adapter, so the larger interstage adapter stays on the booster. For the 3D model the JSON staging step drops `["stage1","interstage"]` together; that grouping is NOT sourced, and the fate text only says what IK-M says.
- `fairingA`, `fairingB`: `unknown`. IK-M: "It will be jettisoned shortly after ignition of the Centaur's engine, when the vehicle has climbed high enough to have escaped most of Earth's atmosphere." and "The launch vehicle will jettison the payload fairing eight seconds later, uncovering InSight." No page says where the halves fell. (Two halves: ULA-I "a bisector (two-piece shell) fairing".) Physically they were released 18 s after the first stage, which NASA says falls into the Pacific, but no source states it.
- `stage2` (Centaur): `sunOrbit`, DEDUCED. Evidence:
  - IL-S (past tense, Nov 2018): "the two objects were traveling on nearly identical trajectories", "To prevent the possibility of the Centaur hitting Mars", "By design, the Centaur was never aimed at Mars." Same text in future tense in IK-S, plus "the shared flight path is deliberately set so that the spacecraft would miss Mars if not for its first two trajectory correction maneuvers".
  - IK-M: after releasing InSight the Centaur "will begin an avoidance maneuver" to avoid hitting either the spacecraft or Mars.
  - JN-0523: "Mars launches involve aiming the rocket just off-target so that it flies off into space."
  - ODQN-22-3 (NASA Orbital Debris Program Office): "2018-042A INSIGHT USA HELIOCENTRIC 0 0 / 2018-042B MARCO-A USA HELIOCENTRIC / 2018-042C MARCO-B USA HELIOCENTRIC"; the two numbers are "Earth Orbital Rocket Bodies" and "Other Cataloged Debris", i.e. the launch left no rocket body in Earth orbit.
  - BSF-14 (general): a craft that escapes Earth's gravity has a flight path that "will then be purely a solar orbit of some description".
  - 2016 JPL InSight mission design paper (snippet only, NTRS 20150016876): injection aimpoints biased so that the probability of the upper stage impacting Mars is less than 1.0e-4 for fifty years after launch.

### Mars 2020 (AV-088)
- `srbGround`, `fairingA`, `fairingB`, `stage1`: `unknown`. No source read says where they fell on this flight. General evidence that it was the Atlantic Ocean:
  - SEIS (NASA, for this mission and this rocket): "Phase 2 (Late Launch): A launch accident during this period would lead to impact of debris in the Atlantic Ocean."; for the suborbital phase, impacts "along the vehicle flight path over the Atlantic Ocean and southern Africa". This describes where things falling off the vehicle come down, but in the accident analysis, not the normal drops.
  - MSL-K (Curiosity, 2011, same rocket type and pad): "their spent casings are jettisoned in pairs several seconds after burnout"; "the launch vehicle's second stage Centaur separates from the first stage, which drops into the Atlantic Ocean."
  - LSP (general): "two or more rocket-powered stages, which fall away when their engine burns are completed".
- `stage2` (Centaur): `sunOrbit`, DEDUCED. Evidence:
  - MK-B: "Because only some portions of the Atlas V rocket ferrying the Mars 2020 Perseverance spacecraft into space can be cleaned as thoroughly as the spacecraft, the rocket will be initially pointed along a trajectory that does not intercept Mars. After the spacecraft separates from the launch vehicle's upper stage, Perseverance will be redirected toward landing on Mars. This technique, known as 'trajectory biasing,' is intended to ensure that the launch vehicle has less than a 1 in 10,000 chance of accidentally encountering Mars for 50 years after launch."
  - ODQN-24-4: "2020-052A MARS 2020 USA EN ROUTE TO MARS 0 0 0" (additional spacecraft 0, Earth orbital rocket bodies 0, other cataloged debris 0).
  - Non-NASA: a Sky & Telescope blog (search snippet) says Perseverance and the Centaur "were both injected directly into a heliocentric orbit".

## 6. `left`: hardware the spacecraft discarded

### InSight
- Cruise stage, `marsImpact` (NASA's expectation, not an observation). IK-M / IL-M: "InSight will jettison its cruise stage seven minutes before entry." IK-S / IL-S: "For hardware expected to impact Mars, such as the cruise stage after lander separation, a detailed thermal analysis was conducted to make sure that plunging through Mars' atmosphere gets it sufficiently hot such that few to no spores survive."
- Heat shield, `onMars`. IL-M: during the parachute descent "InSight will jettison its heat shield and extend its three legs." JN-HiRISE-I: "NASA's InSight spacecraft, its heat shield and its parachute were imaged on Dec. 6 and 11 by the HiRISE camera"; "The lander, heat shield and parachute are within 1,000 feet (several hundred meters) of one another".
- Back shell and parachute, `onMars`. IL-M: "the lander separates from the back shell and parachute, about two-thirds of a mile (1 kilometer) above the ground" (the launch kit IK-M said three-fourths of a mile, 1.2 km: conflict, JSON uses the later landing kit). HiRISE photographed the parachute (same source as above); the back shell is not named in the caption.
- MarCO-A and MarCO-B, `sunOrbit`. Not discarded by InSight: they were released by the Centaur and flew on their own. NS-MarCO: flyby 26 Nov 2018; "Dec. 29, 2018: Last contact with MarCO B"; "Jan. 4, 2019: Last contact with MarCO A". JN-MarCO: "WALL-E was last heard from on Dec. 29; EVE, on Jan. 4."; "The MarCOs are in orbit around the Sun and will only get farther away as February wears on."; "The first CubeSat mission to fly past Mars has been completed."; the team "declared the end of the mission" on 2 Feb (article first dated 5 Feb 2019, updated 27 Feb 2020, so the end-of-mission date is 2 Feb 2020; the year is my reading of the update date).
- The InSight lander itself (last transmission 15 Dec 2022, mission declared over 21 Dec 2022, NSSDCA-I) is the machine of the page, not a `left` item.

### Mars 2020
- Cruise stage, `unknown`. MK-M: "Ten minutes before the spacecraft enters the atmosphere, it sheds the cruise stage." NI-CS: "About 10 minutes before atmospheric entry, it separates from the aeroshell". No NASA page read says what became of it. (For InSight NASA expected the cruise stage to impact Mars; nothing equivalent was found for Mars 2020.)
- Heat shield, `onMars`. ML-M: "Twenty seconds after parachute deployment, the heat shield separates and drops away". PIA24333 (HiRISE image of 19 Feb 2021): annotated version "points out the locations of the parachute and back shell, the descent stage, the Perseverance rover, and the heat shield."
- Back shell and parachute, `onMars`. ML-M: the powered descent vehicle separates from the back shell "about 1.3 miles (2.1 kilometers) above the surface". JN-F26: "10 aerial color images taken April 19 during Ingenuity's Flight 26"; back shell "impacting the surface at about 78 mph (126 kph)"; parachute "70.5 feet (21.5 meters) wide, it was the biggest ever deployed on Mars".
- Descent stage (sky crane), `marsImpact`. ML-M: "pyrotechnically fired blades sever the cords, and the descent stage flies a safe distance away" "before impacting the Martian surface". PIA24333: "The descent stage flew off to crash at a safe distance", creating "a V-shaped debris pattern that points back toward the rover". No distance is given in the pages read.
- Ingenuity's debris shield, `onMars`. PIA24448: "The debris shield protects the agency's Ingenuity helicopter during landing."; it "was released on March 21, 2021, the 30th Martian day, or sol, of the mission."
- Perseverance rover, `onMars`, NOT discarded. NS-Pers (updated 14 Oct 2026): "Active Mission", "still operational and moving across the surface".
- Ingenuity, `onMars` (the machine of the page; listed last because the task asked for it). JN-Ing: "flew for the last time on Jan. 18, 2024"; "performed 72 flights"; "one or more of its rotor blades sustained damage during landing and it is no longer capable of flight"; "remains upright and in communication with ground controllers" (as of 25 Jan 2024); "at its final airfield". NSSDCA-M also gives the first flight, 19 Apr 2021, 39.1 s.
- NOT included in the JSON: the two cruise balance masses and six entry balance masses. NASA Eyes (snippet, https://eyes.nasa.gov/apps/mars2020/): "the spacecraft drops two 70 kg (154 pound) balance masses". Fernando et al. 2022, Nature Astronomy 6, 59-64, doi:10.1038/s41550-021-01502-0 (snippet): the craters of the cruise balance masses were imaged by CTX and HiRISE on 3 May 2021 near 18.9 N 76.2 E; InSight did not detect the impacts. Both are snippets only, so they were left out.

## 6b. Step texts that mix more than one source

Each step in the JSON has a single `src` (the page of its main fact or of its time). Where a text also uses a fact from another page:

| Mission, step | `src` in JSON | Other facts in the text and where they were read |
|---|---|---|
| insight, liftoff | NB-I-L (liftoff 4:05 a.m. PDT) | RD-180, kerosene (RP-1) and liquid oxygen: IK-M |
| insight, fairing | IK-M | "two halves": ULA-I ("bisector (two-piece shell) fairing") |
| insight, orbit | JN-0406 (13 min 16 s, 185 km, coast 59 to 66 min) | 185 km also in IK-M |
| insight, tmi | JN-0406 (1 h 19 min) | "about five minutes", "close to the North Pole": IK-M |
| insight, separation | JN-0406 ("about 93 minutes") | springs, MarCO release order, avoidance manoeuvre: IK-M; "circling the Sun": deduced, section 5. ULA-I planned times: InSight 1:33:19.8, MarCO-A 34 s later, MarCO-B 82 s later |
| ingenuity, pad | MK-M (541, 60 m) | pad name SLC-41: NR-M; Ingenuity "attached to the belly of the rover": ULA-M |
| ingenuity, liftoff | NR-M (7:50 a.m. EDT) | boosters at liftoff: ULA-M |
| ingenuity, srbGround | ULA-M (time) | "spent": MSL-K and SFN-M wording; flight path over the Atlantic: SEIS |
| ingenuity, fairing | ULA-M (time; fairing covers Centaur and spacecraft) | |
| ingenuity, stage1 | ULA-M (times) | Curiosity sentence: MSL-K |
| ingenuity, orbit | ULA-M (time) | "parking orbit around Earth": NR-M |
| ingenuity, separation | ULA-M (time) | aimed to miss Mars, not cleaned like the spacecraft: MK-B; "circling the Sun": deduced, section 5 |

Step ids follow the sibling file `heavy.json`: `pad`, `liftoff`, `srbGround`, `stage1`, `stage2` (Centaur ignition), `fairing`, `orbit` (parking orbit), `tmi` (second burn), `separation`. InSight has 8 steps (the two MarCO releases are folded into `separation`), Mars 2020 has 9. `payloadMount` is never dropped (it is the spacecraft).

## 7. Conflicts between sources
1. Atlas V 401 height: 188 ft / 57.3 m (IK-F, IK-M) vs "approximately 189 ft" (ULA-I).
2. Atlas V 541 height: 197 ft / 60 m (MK-M, ULA-M) vs 191 ft / 58 m (snippet of the old mars.nasa.gov page).
3. InSight spacecraft separation: "about 90 minutes after liftoff" (IK-M) vs "about 93 minutes" (JN-0406) vs 1:33:19.8 (ULA-I). JSON uses 93 minutes (5580 s).
4. InSight first-stage shutdown: JN-0406, as summarised, says Mach One at 1 min 18 s and shutdown "Two minutes and 36 seconds later" (3 min 54 s), against 244 s in IK-M and 4:04.3 in ULA-I. Possibly a typo or a misquote by the summariser. JSON uses 244 s.
5. InSight lander / back shell separation height: 1.2 km (launch kit) vs 1 km (landing kit).
6. Number of Centaur burns on InSight: a search summary of Spaceflight Now mentions three upper-stage firings; NASA's blog ("The first of two burns") and ULA-I list two main engine starts (the later "blowdown" is not a burn).
7. Mars 2020 fairing timing in the press: "about a minute and a half" or "two minutes" after booster separation (Digital Trends, Room, snippets) vs 1 min 38 s in ULA-M.
8. All times count from T-zero, which is 1.1 s before liftoff in both ULA booklets and in IK-M. The JSON keeps the published values and puts the liftoff step at `t: 0`.

## 8. Not verified
- Where the InSight fairing halves fell (no source).
- That the 401 interstage adapter stays on the first stage (general knowledge, no source fetched). The JSON still drops `interstage` together with `stage1` in the staging step so the 3D model has a place for it.
- Any as-flown event time for either ascent: all `t` values are pre-launch plans.
- Where the Mars 2020 boosters, fairing halves and first stage fell (no flight-specific source; almost certainly the Atlantic, see section 5).
- "Solar orbit" for both Centaurs (deduced from NASA statements, never stated in those words by a page read).
- The InSight first stage "will fall into the Pacific Ocean" is a plan, not a report.
- The fate of the InSight cruise stage after jettison is NASA's expectation; the fate of the Mars 2020 cruise stage is unknown.
- Flight number AV-078 (not found on a NASA page).
- Mars 2020 ascent times come only from the ULA booklet (launch provider, not NASA-hosted).
- InSight `t` values 4740 (second burn) and 5580 (separation) are minute-rounded JPL figures ("one hour and 19 minutes", "about 93 minutes"); the ULA booklet's planned values are 4736.9 s and 5599.8 s.
- Why the two Centaurs are `sunOrbit` while the dropped Mars 2020 parts are `unknown`: NASA describes the upper stage's own path (same trajectory as the spacecraft, biased away from Mars, no rocket body left in Earth orbit), but no page describes where the boosters, fairing halves or first stage of that flight came down. The Mars 2020 case is the weaker of the two (it rests on the 50-year trajectory-biasing sentence and the Orbital Debris Quarterly News row).

## 9. Notes for whoever merges the data
- New `site` value: `"vandenberg"` (InSight). Mars 2020 uses `"cape"`.
- `pad` for InSight is `"SLC-3E"` as in the project spec; NASA's kit writes "Space Launch Complex 3".
- `left` for `ingenuity` ends with two items that are NOT discarded hardware (the Perseverance rover, still active, and Ingenuity itself); they are there because the task asked for them and are worded accordingly.

## Verification

Independent check done on 15 Nov 2026. Every source below was opened again for this check. Web pages went through the fetch tool with requests for verbatim quotes (fragments of at most 125 characters, so long sentences come back in pieces); PDFs were converted locally with `pdftotext` and read as text. Where this section contradicts sections 1 to 9 above, this section wins.

### Confirmed (re-read, for these two flights)

InSight, JPL launch kit, Mission (https://www.jpl.nasa.gov/news/press_kits/insight/launch/mission/):
- "approximately 188 feet (57.3 meters) tall"; 401 = 4 m fairing, zero solid boosters, one upper-stage engine; main booster "107 feet (32.5 meters) long"; RD-180; "Thermally stable kerosene fuel (type RP-1) and liquid oxygen"; RL-10C "uses liquid hydrogen and liquid oxygen", "restartable".
- "T Zero ... 1.1 seconds before liftoff"; engine burns "until about 244 seconds after T Zero"; "About six seconds after booster engine cutoff, the first stage will be jettisoned"; "It will fall into the Pacific Ocean."; "Approximately 10 seconds after separation ... the Centaur engine will begin the first of its two burns"; "jettison the payload fairing eight seconds later"; the fairing goes "when the vehicle has climbed high enough to have escaped most of Earth's atmosphere"; parking orbit "115 miles (185 kilometers)"; coast "59 to 66 minutes"; "The second Centaur burn, continuing for about five minutes as the stack passes close to the North Pole"; "actuators and push-off springs" release InSight; MarCO-A released, Centaur rolls 180 degrees, MarCO-B released; Centaur "avoidance maneuver ... to avoid hitting either the spacecraft or Mars".
- Cruise stage jettison "Seven minutes before entry".

InSight, other pages:
- Launch Facts (https://www.jpl.nasa.gov/news/press_kits/insight/launch/facts/): "Height with payload: 188 feet (57.3 meters)"; "Space Launch Complex 3, Vandenberg Air Force Base, California"; window "opens at 4:05 a.m. PDT (7:05 a.m. EDT; 11:05 UTC)"; "InSight is the first interplanetary launch from the West Coast."
- JPL news, 6 Apr 2018 (https://www.jpl.nasa.gov/news/bound-for-mars-countdown-to-first-interplanetary-launch-from-california/): parking orbit "13 minutes and 16 seconds after launch"; re-ignition "at one hour and 19 minutes after launch"; separation "about 93 minutes after liftoff for the first May 5 launch opportunity".
- NASA launch blog (https://science.nasa.gov/blogs/insight/2018/05 and the liftoff post): "liftoff ... at 7:05 a.m. EDT (4:05 a.m. PDT)" from "Space Launch Complex 3 at Vandenberg Air Force Base"; later posts confirm that each event happened, without times.
- ULA InSight booklet, PDF text (https://www.ulalaunch.com/docs/default-source/launch-booklets/mob_insightfinal.pdf): BECO 0:04:04.3, Atlas Centaur Separation 0:04:10.3, MES-1 0:04:20.3, Payload Fairing Jettison 0:04:28.3, MECO-1 0:13:16.2, MES-2 1:18:56.9, MECO-2 1:24:19.8, InSight Separation 1:33:19.8, MarCO-A 1:33:53.8, MarCO-B 1:34:41.8; "C3: 8.19 km2/s2"; "bisector (two-piece shell) fairing"; "First Launch: Aug. 21, 2002". These agree with every JPL time used in the JSON to within the rounding JPL applied.
- Landing kit, Mission (https://www.jpl.nasa.gov/news/press_kits/insight/landing/mission/): "InSight will jettison its cruise stage seven minutes before entry."; "During the first 25 seconds of parachute descent, InSight will jettison its heat shield"; "the lander separates from the back shell and parachute, about two-thirds of a mile (1 kilometer) above the ground."
- Landing kit, Spacecraft (https://www.jpl.nasa.gov/news/press_kits/insight/landing/mission/spacecraft/): "When the Atlas launch vehicle's Centaur stage separated from the spacecraft, the two objects were traveling..."; "To prevent the possibility of the Centaur hitting Mars, the shared flight path was deliberately set..."; "By design, the Centaur was never aimed at Mars."; "For hardware expected to impact Mars, such as the cruise stage after lander separation, a detailed thermal analysis..." (the rest came back as paraphrase: the heating leaves "few to no spores").
- HiRISE (https://www.jpl.nasa.gov/news/mars-insight-lander-seen-in-first-images-from-space/, 13 Dec 2018, and https://www.jpl.nasa.gov/images/pia22875-insight-on-mars-as-seen-by-hirise/): "its heat shield and its parachute were imaged on Dec. 6 and 11 by the HiRISE camera"; "within 1,000 feet (several hundred meters) of one another". The back shell is not named.
- MarCO (https://www.jpl.nasa.gov/news/the-marco-mission-comes-to-an-end/ and https://science.nasa.gov/mission/marco/): "Nov. 26, 2018: Mars flyby"; "Dec. 29, 2018: Last contact with MarCO B"; "Jan. 4, 2019: Last contact with MarCO A"; "The MarCOs are in orbit around the Sun".
- NSSDCA (https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A): "launched on 5 May 2018 at 11:05 UT"; "Launch Vehicle: Atlas V 401".
- NASA Orbital Debris Quarterly News 22-3, PDF text (https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv22i3.pdf): INSIGHT, MARCO-A and MARCO-B are the three "USA HELIOCENTRIC" rows, with 0 Earth-orbital rocket bodies and 0 other debris. The PDF text layer puts names and data on different lines; the pairing was checked by row order.
- JPL news, 23 May 2018 (https://www.jpl.nasa.gov/news/insight-steers-toward-mars/): "Mars launches involve aiming the rocket just off-target so that it flies off into space."; "only the clean spacecraft lands on the planet, while the upper stage does not come close."

Mars 2020, ULA booklet, PDF text (https://www.ulalaunch.com/docs/default-source/launch-booklets/mars2020_mobrochure_200717.pdf): all twelve rows of the table in section 4 are exactly as the notes give them; "All Values Approximate"; "C3: 14.49 (km^2/s^2)"; "to a hyperbolic escape orbit"; "approximately 60 m (197 ft)"; "The bisector (two-piece shell) PLF encapsulates both the Centaur and the satellite."; "Four solid rocket boosters (SRBs) generate the additional power required at liftoff"; "First Launch: Nov. 26, 2011"; "Ingenuity, will ride to Mars attached to the belly of the rover". The booklet does not print the launch date. Its PDF was created on 17 Jul 2020, and Spaceflight Now's timeline of 29 Jul 2020 (https://spaceflightnow.com/2020/07/29/atlas-5s-launch-timeline-on-the-mars-2020-mission/) lists the same twelve values for a launch "Thursday during a two-hour window opening at 7:50 a.m. EDT". NASA: "The liftoff went right on time, at 7:50 a.m. EDT." So the planned table is the one for the launch as it happened.

Mars 2020, NASA and JPL pages:
- Launch kit, Mission (https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/): "It stands at 197 feet (60 meters) tall."; 541 = "5-meter (17-foot) short payload fairing, four solid-rocket boosters, and a one-engine Centaur upper stage"; separation "Approximately 50 to 60 minutes after launch"; "Ten minutes before the spacecraft enters the atmosphere, it sheds the cruise stage."; "Twenty seconds after parachute deployment, the heat shield separates and drops away."; back shell separation at "about 1.3 miles (2.1 kilometers) above the ground".
- Biological Cleanliness (https://www.jpl.nasa.gov/news/press_kits/mars_2020/launch/mission/spacecraft/biological_cleanliness/): the whole trajectory-biasing passage, word for word as quoted in section 5.
- NASA release, 30 Jul 2020 (https://www.nasa.gov/news-release/nasa-ula-launch-mars-2020-perseverance-rover-mission-to-red-planet/): launched "at 7:50 a.m. EDT (4:50 a.m. PDT) Thursday" from "Space Launch Complex 41"; "initially placed the Mars 2020 spacecraft into a parking orbit around Earth. The engine fired for a second time and the spacecraft separated from the Centaur as expected."
- NSSDCA (https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052A): "launched on 30 July 2020 at 11:50 UT on an Atlas V-541"; "it made 72 flights".
- NTRS 20230006978 (abstract only; the twin record 20220000775 was seen only in a search result): "Atlas V 541 (AV-088)", "11:50:00 UTC (T-Zero time) on July 30, 2020".
- Draft SEIS, PDF text (https://www.nasa.gov/sites/default/files/atoms/files/mars_2020_public_draft_seis.pdf): "along the vehicle flight path over the Atlantic Ocean and southern Africa" (accident analysis). The document has no sentence on where jettisoned boosters, fairing or first stage fall; it points to section 4.1.2.6 of the 2014 Final EIS, which could not be opened.
- Curiosity launch kit, PDF text (https://www.jpl.nasa.gov/news/press_kits/MSLLaunch.pdf), a DIFFERENT flight: "separates from the first stage, which drops into the Atlantic Ocean"; "The first Atlas V was launched in August 2002."; the height there is "191 feet (58 meters)".
- ODQN 24-4, PDF text (https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv24i4.pdf): "2020-052A MARS 2020 USA EN ROUTE TO MARS 0 0 0" (additional spacecraft, Earth-orbital rocket bodies, other debris).
- Landing kit, Mission (https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/): heat shield "Twenty seconds after parachute deployment"; back shell at "about 1.3 miles (2.1 kilometers) above the surface"; "pyrotechnically fired blades sever the cords, and the descent stage flies a safe distance away" "before impacting the Martian surface".
- PIA24333 (https://www.jpl.nasa.gov/images/pia24333-perseverance-and-mars-2020-spacecraft-components-on-the-surface/): "The image was taken on Feb. 19, 2021."; "The descent stage flew off to crash at a safe distance"; "a V-shaped debris pattern that points back toward the rover"; heat shield and parachute "can be seen on the surface".
- Flight 26 (https://www.jpl.nasa.gov/news/nasas-mars-helicopter-spots-gear-that-helped-perseverance-rover-land/): "10 aerial color images taken April 19 during Ingenuity's Flight 26"; "impacting the surface at about 78 mph (126 kph)".
- PIA24448 (https://www.jpl.nasa.gov/images/pia24448-perseverance-rover-drops-its-debris-shield/): "was released on March 21, 2021, the 30th Martian day"; "The debris shield protects the agency's Ingenuity helicopter during landing".
- Ingenuity (https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/): "flew for the last time on Jan. 18, 2024"; "performed 72 flights"; "one or more of its rotor blades sustained damage during landing"; "it is no longer capable of flight".
- Perseverance (https://science.nasa.gov/mission/mars-2020-perseverance/): "Active Mission"; "still operational and moving across the surface"; page date "Oct 14, 2026".
- Atlas V family (https://science.nasa.gov/learn/basics-of-space-flight/chapter14-1/): "the first Atlas-V launch in August 2002"; "between one and five strap-on solid rocket boosters".

Structure and text rules: the JSON parses, has no byte-order mark, uses only the canonical part ids of each rocket key, has 8 steps (InSight) and 9 steps (Mars 2020) in rising time order, gives every dropped part a fate, uses only legal `where` values, keeps titles to 2 to 5 words and step texts to 220 characters or fewer, and has no em dashes or exclamation marks.

### Corrected

1. `ROCKETS_INFO.atlasV541.firstYear`: 2002 changed to 2011. This is a choice of convention, not a factual error: 2002 is true for the Atlas V family (the year the research task asked for), 2011 is true for the 541 configuration. The entry is named "Atlas V 541", and that configuration first flew on 26 Nov 2011 (ULA booklet, "First Launch: Nov. 26, 2011"; the blurb already says so). 2002 stays for `atlasV401`, because a 401 flew the family's first launch (ULA, "First Launch: Aug. 21, 2002"). The spec example (`delta7925`, 1990) is a variant year, but the sibling files are split between family year and variant year, so the merger must pick one rule; to go back to the family year, set 541 to 2002.
2. InSight `interstage`: the notes said NASA's kit does not say what happens to the adapters. It does: "At the separation of the two stages, the interstage adapters will also fall away, exposing the Centaur's aft bulkhead carrier where the twin MarCO spacecraft ride". Dropping `interstage` with `stage1` is therefore sourced. The step text and the fate were rewritten to say this. `where` stays `unknown`, because the kit names the Pacific only for the first stage.
3. InSight `separation` text and Mars 2020 `separation` text: the Sun orbit is now worded as a consequence ("Never aimed at Mars, it stays circling the Sun"; "So it stays circling the Sun"), not as a reported fact. The two Centaur fates already read that way.
4. Mars 2020 `srbGround` and `fairing` step texts and the four `unknown` fates: "No source for this flight says" was a claim about every source that exists. It now reads "we could not find where", the wording the sibling files use.
5. Mars 2020 cruise stage in `left`: `unknown` changed to `marsImpact`, with a peer-reviewed source. Sokołowska, Daubar, Collins, Calef and Jones, "Probing Subsurface Properties With Mission Hardware: Lessons Learned From Artificial Impacts of Mars 2020", Geophysical Research Letters 53 (18), published online 13 Sep 2026, https://doi.org/10.1029/2026GL122337. Abstract: "During NASA's Perseverance descent, two tungsten cruise ballast mass devices (CBMD) and fragments of the cruise stage formed meter-scale craters north-west of Jezero crater, in one of the sinuous valleys that converge into the Jezero delta." and "Using high-resolution orbital images and trajectory predictions, we identify the two CBMD craters". The publisher's page returned HTTP 403; the abstract was read from the DOI's metadata records (https://api.crossref.org/works/10.1029/2026GL122337 and OpenAlex, same wording in both). The new fate text uses only what that abstract states (pieces reached the ground, craters metres across, north-west of Jezero, orbital photos). More detail exists in the same team's conference abstract, EPSC-DPS 2025 no. 1780 (https://meetingorganizer.copernicus.org/EPSC-DPS2025/EPSC-DPS2025-1780.html): "The cruise stage must have fragmented into at least 3 pieces of uncertain characteristics" "because in total 5 new co-located craters were identified", in an area "roughly 70 km to the north-west from Jezero crater". Those three numbers are NOT in the JSON, because a conference abstract is not a peer-reviewed paper.
6. InSight `separation` Spanish text shortened by a few characters to stay under 220.

### Removed

Nothing was deleted. No step time, altitude, `drop` assignment or `left` item failed the check.

### Found during the check, not used in the JSON

- NASA's launch blog timestamps are not event times. The InSight post "InSight Separates from the Centaur Upper Stage" is stamped 8:34 a.m. EDT, four minutes before the planned separation at 93 minutes (8:38 a.m.), and the Mars 2020 post stamped 7:58 a.m. already lists "Main Engine Cutoff (MECO)" as complete, before the planned first Centaur cutoff at 8:01 a.m. The posts confirm that the events happened, nothing more.
- The InSight blog says the first Centaur burn "will last nearly eight minutes"; the JPL kit says "about nine minutes"; ULA's table gives 8 min 56 s. The JSON does not state that duration.
- JPL's article of 6 Apr 2018 really does say Mach One at 1 min 18 s and first-stage shutdown "Two minutes and 36 seconds later" (3 min 54 s). The slip is in the article, not in the summariser. The kit (244 s) and ULA (4:04.3) agree with each other and are the ones used.
- The journal abstract of correction 5 also names "two tungsten cruise ballast mass devices (CBMD)" that dug craters in the same place; the conference abstract adds that the entry vehicle "ejected two cruise ballast mass devices (CBMD), 77 kg each, made of tungsten", and that two of the five craters are theirs. They are discarded hardware still on Mars and could be one more `left` item for `ingenuity`. Not added here.

### Still not verified

- Both Centaurs as `sunOrbit`: no page says "solar orbit" or "heliocentric" for the stage. It follows from three things read for each flight: NASA's statement that the stage left on the spacecraft's path and was aimed to miss Mars, ULA's positive C3 at separation (8.19 and 14.49 km2/s2, which means escape from Earth), and NASA's debris newsletter listing no rocket body left in Earth orbit.
- All `t` values are planned times counted from T-zero (liftoff is at T+1.1 s). No as-flown times exist in any source that could be opened; the paper that has them (NTRS 20220000775 / 20230006978) has no download, and the handle link tried in this check (hdl.handle.net/2014/56090) returned HTTP 500, as the first researcher reported for 2014/52267.
- Mars 2020 times come from ULA's own booklet on ulalaunch.com, which is not NASA-hosted. NASA gives only "50 to 60 minutes" for separation.
- Mars 2020 boosters, fairing halves and first stage stay `unknown`. The Atlantic is near certain, but the only NASA sentences are an accident analysis and the Curiosity kit.
- InSight fairing halves and interstage adapters stay `unknown`; the first stage's fall into the Pacific and the cruise stage's impact on Mars are NASA's pre-flight expectations.
- InSight back shell `onMars`: NASA's HiRISE captions name only the lander, heat shield and parachute.
- Mars 2020 cruise stage: only the abstract of the journal paper was read (through DOI metadata), not the paper; see correction 5.
- InSight `t` 4740 and 5580 are JPL's minute-rounded figures (ULA: 4736.9 and 5599.8).
- Flight number AV-078 (not in the JSON) was not found on a NASA page.
- Still open for the merger, as in section 9: the new `site` value `"vandenberg"`; pad `"SLC-3E"` comes from the spec while NASA writes "Space Launch Complex 3"; `left` holds items that are not hardware discarded by the spacecraft (Perseverance and Ingenuity under `ingenuity`, the two MarCO CubeSats under `insight`).
