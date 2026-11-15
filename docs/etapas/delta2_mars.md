# Delta II launches to Mars: Pathfinder, Spirit, Opportunity, Phoenix

Research notes for `docs/etapas/delta2_mars.json` (15 Nov 2026). Rocket keys: `delta7925` (Pathfinder, Spirit, Phoenix) and `delta7925H` (Opportunity).

All press kits were read as PDF text (pdftotext), not through a summariser. News pages were read through WebFetch (a summarising fetch), so their quotes are short fragments. Spaceflight Now and CelesTrak are not NASA; where they are the only source for a value, that is said below and in the "Not verified" section.

## Sources

| Tag | Document | URL |
|---|---|---|
| MERKIT | Mars Exploration Rover Launches, press kit, June 2003 (NASA/JPL) | https://www.jpl.nasa.gov/news/press_kits/merlaunch.pdf |
| MERLAND | Mars Exploration Rover Landings, press kit, Jan 2004 (NASA/JPL) | https://www.jpl.nasa.gov/news/press_kits/merlandings.pdf |
| PHXKIT | Phoenix Launch, press kit, Aug 2007 (NASA/JPL) | https://www.jpl.nasa.gov/news/press_kits/phoenix-launch-presskit.pdf |
| PHXLAND | Phoenix Landing, press kit, May 2008 (NASA/JPL) | https://www.jpl.nasa.gov/news/press_kits/phoenix-landing.pdf |
| M96KIT | 1996 Mars Missions, press kit, Nov 1996 (NASA; MGS and Pathfinder launches) | https://www.jpl.nasa.gov/news/press_kits/m96pkt.pdf |
| MPFLAND | Mars Pathfinder Landing, press kit, July 1997 (NASA/JPL) | https://www.jpl.nasa.gov/news/press_kits/mpfland.pdf |
| GRAILKIT | GRAIL Launch, press kit, Aug 2011 (NASA/JPL), Delta II 7920H from SLC-17B | https://www.jpl.nasa.gov/news/press_kits/graiLaunch.pdf |
| DS1KIT | Deep Space 1 Launch, press kit, Oct 1998 (NASA/JPL), Delta II 7326 from LC-17A | https://www.jpl.nasa.gov/news/press_kits/ds1launch.pdf |
| DAWNKIT | Dawn Launch, press kit, Sept 2007 (NASA/JPL). The kit prints "Delta 2925H" and "Delta II Heavy 2925H-9.5", not 7925H. It has no booster jettison times | https://www.jpl.nasa.gov/news/press_kits/dawn-launch.pdf |
| SPIRIT_REL | JPL news, "NASA's 'Spirit' Rises on its Way to Mars", 10 Jun 2003 | https://www.jpl.nasa.gov/news/nasas-spirit-rises-on-its-way-to-mars/ |
| OPPY_REL | JPL news, "Newly Launched 'Opportunity' Follows Mars-Bound 'Spirit'", 8 Jul 2003 | https://www.jpl.nasa.gov/news/newly-launched-opportunity-follows-mars-bound-spirit/ |
| PHX_REL | JPL news, "NASA Spacecraft Heads for Polar Region of Mars", 4 Aug 2007 | https://www.jpl.nasa.gov/news/nasa-spacecraft-heads-for-polar-region-of-mars/ |
| PDS_MISSION | PDS, Mars Pathfinder Mission Description | https://pds.nasa.gov/data/mpfl-m-imp-2-edr-v1.0/mpim_0002/document/mission.htm |
| PDS_HOST | PDS, Mars Pathfinder Lander Description | https://pds.nasa.gov/data/mpfl-m-imp-2-edr-v1.0/mpim_0001/document/insthost.htm |
| NSSDCA_MPF | NSSDCA, Mars Pathfinder | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A |
| NSSDCA_SOJ | NSSDCA, Mars Pathfinder Rover (Sojourner) | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=MESURPR |
| PIA09105 | NASA Photojournal, "Mars Pathfinder Landing Site and Surroundings" (HiRISE, taken 21 Dec 2006) | https://science.nasa.gov/photojournal/mars-pathfinder-landing-site-and-surroundings |
| PIA01879 | NASA Photojournal, "Mars Exploration Rover Landing Site at Gusev Crater" (HiRISE, 2006) | https://science.nasa.gov/photojournal/mars-exploration-rover-landing-site-at-gusev-crater/ |
| PIA09364 | NASA Photojournal, "Mars Exploration Rover Landing Site at Meridiani Planum" (HiRISE, taken 14 Nov 2006) | https://science.nasa.gov/photojournal/mars-exploration-rover-landing-site-at-meridiani-planum/ |
| PIA10710 | NASA Photojournal, "Connecting the Dots: Lander, Heat Shield, Parachute" (HiRISE, added 27 May 2008) | https://science.nasa.gov/photojournal/connecting-the-dots-lander-heat-shield-parachute/ |
| OPPY_IMG | NASA Science, "Opportunity Rover Delta II Launch" (image caption) | https://science.nasa.gov/resource/opportunity-rover-delta-ii-launch |
| NSC | NASA, "National Space Club Honors NASA, ULA Delta II Program Team" | https://www.nasa.gov/missions/mars-pathfinder/national-space-club-honors-nasa-ula-delta-ii-program-team/ |
| ICESAT2 | NASA blog, "ICESat-2 Successfully Launched on Final Flight of Delta II Rocket" | https://science.nasa.gov/blogs/icesat-2/2018/09/15/icesat-2-successfully-launched-on-final-flight-of-delta-ii-rocket |
| CAPE | Not NASA. Mark C. Cleary, 45 Space Wing History Office, "The Cape", ch. 3 sec. 3 (USAF history) | https://spp.fas.org/military/program/cape/cape3-3.htm |
| SATCAT | Not NASA. CelesTrak SATCAT (mirror of the U.S. Space Force satellite catalog) | https://celestrak.org/satcat/table-satcat.php?INTDES=2003-027 (also 1996-068, 2003-032, 2007-034) |
| SFN | Not NASA. Spaceflight Now launch timelines (Boeing / ULA data) and status logs | links in each section |

## The rocket (ROCKETS_INFO)

- Height 39.6 m (130 ft) "with their payloads on top", for both the 7925 and the 7925H: MERKIT p. 23 ("each launch vehicle stands 39.6 meters (130 feet) tall"). Same figure for Phoenix: PHXKIT quick facts ("Height with payload: 39.6 meters (130 feet)"). M96KIT gives no height. The 38.9 in SPEC.md is an example placeholder; no source I read prints it. Other kits print other figures for other fairings (GRAILKIT: "slightly more than 125 feet (38 meters)" for the 7920H-10C).
- Layout: "liquid-fueled first stage with nine strap-on solid-fuel boosters; a second-stage liquid-fueled engine; and a third stage solid-fuel rocket" (MERKIT p. 23). First stage: Rocketdyne RS-27A, RP-1 and liquid oxygen. Second stage: restartable Aerojet AJ10-118K. Third stage: Thiokol Star-48B solid motor (MERKIT, PHXKIT). M96KIT and PDS call the Pathfinder third stage "PAM-D"; NSSDCA_MPF says "Star 48 (PAM-D) third stage".
- Boosters: 7925 boosters are 1,016 mm (40 in) in diameter; the 7925H ones are 1,168 mm (46 in), "with about 25 percent more thrust" (MERKIT p. 24). PHXKIT: the nine boosters are "graphite-epoxy motors ... each about 13 meters (43 feet) tall". GRAILKIT: the Heavy uses "larger strap-on solids developed for the Delta III", each burning about 80 seconds.
- 7925 record: "a vehicle with a history of more than 40 successful launches, including those of the Mars Global Surveyor, Mars Pathfinder and Mars Odyssey missions" (MERKIT p. 23, written June 2003).
- 7925H: "a newer, slightly more powerful version called model 7925H; the H identifies the vehicle as a heavy lifter" (MERKIT p. 23). OPPY_IMG: Opportunity "was the first NASA mission lifted on what is referred to as a Delta II 'heavy' rocket".
- First flight years:
  - Delta II family: 1989. NASA only says it indirectly: NSC "Delta II launched all 48 of those [GPS] satellites from 1989 to 2009"; ICESAT2 caption "designed, built and launched the Delta II between 1989 and today". The exact date (14 Feb 1989) I found only outside NASA (Vandenberg Space Force Base fact sheet, https://www.vandenberg.spaceforce.mil/About-Us/Fact-Sheets/Display/Article/338386/delta-ii-launch-vehicle/, via a search snippet).
  - Model 7925: "made its debut in November 1990" (CAPE, a U.S. Air Force history, not NASA). JSON uses `firstYear: 1990` for `delta7925` because the page prints "In use since {y}" next to the model name. If the orchestrator wants the family year, it is 1989.
  - Model 7925H: 2003, Opportunity's launch (OPPY_IMG). Spaceflight Now also calls it "the first launch of a so-called Delta 2 Heavy" (https://spaceflightnow.com/mars/merb/030707launch.html, search snippet).
- Conflict: the same OPPY_IMG caption also says the MER-B launch was "the second use of a core Delta II 'Heavy' launch vehicle" and the "first use of a Delta II 'Heavy' launch vehicle with an upper stage". The caption was probably written when SIRTF (also a Heavy) was still expected to fly first; SIRTF launched in August 2003, after Opportunity. I did not put "first Heavy ever" in the blurb; the blurb only uses MERKIT.

## How the launch goes (common to the four flights)

From MERKIT pp. 24 to 28 and PHXKIT pp. 20 to 21 (same wording in both):

1. First-stage engine and six of the nine boosters ignite at liftoff; the other three ignite when the first six burn out. Casings are jettisoned in sets of three.
2. Main engine cutoff at about 4 min 23 s. Then first-stage separation, second-stage ignition and fairing jettison (within 20 s in MERKIT, within 40 s in PHXKIT).
3. Second-stage cutoff 1 puts the stack in a circular parking orbit 167 km above Earth.
4. Before one orbit is complete the second stage restarts (2 to 3 minutes for MER, about 2 minutes for Phoenix).
5. Small rockets spin the third stage on a turntable attached to the second stage (about 63 rpm for MER, about 70 rpm for Phoenix and Pathfinder). The third stage separates and fires for about 87 seconds.
6. "A set of yo-yo-like weights will reel out on flexible lines" to slow the spin; then the spacecraft separates from the third stage ("Springs will push the third stage away").

## Times used in the JSON, with their status

Status codes: A = printed by a NASA source for this flight; P = printed by NASA as a plan for another day of the launch period; M = printed by NASA for the same rocket model on another flight; B = upper bound read from NASA prose; D = derived by me from two NASA numbers; X = not printed by any NASA source I found.

### Spirit (Delta II 7925, SLC-17A, liftoff 10 Jun 2003 17:58:47 UTC)

MERKIT chart "Launch phases", pp. 26 to 27, labelled "Numbers approximate, for first day of Rover A launch period" (8 June). Launch happened on 10 June at the first opportunity. Ascent to the parking orbit does not depend on the day; the later events do.

| Step | t (s) | Source text | Status |
|---|---|---|---|
| liftoff | 0 | "1:58:47 p.m. Eastern Daylight Time" (SPIRIT_REL) | A |
| srbGround | 66 | "Booster Jettison (3/3) t = 1 min, 6 sec and 1 min, 7 sec; Alt = 18.0 km / 18.3 km; VI = 3,668 km/h / 3,712 km/h" | A (plan) |
| srbAir | 131.5 | "Booster Jettison (3) t = 2 min, 11.5 sec; Alt = 52.4 km; VI = 9,046 km/h" | A (plan) |
| meco | 263.4 | "Main Engine Cutoff t = 4 min, 23.4 sec; Alt = 119.3 km; VI = 22,317 km/h". Stage 2 ignition "t = 4 min, 36.9 sec; Alt = 118.9 km; VI = 22,326 km/h" | A (plan) |
| fairing | 282 | "Fairing Jettison t = 4 min, 42 sec; Alt = 121.3 km; VI = 22,377 km/h" | A (plan) |
| parking | 578.5 | "Stage 2 Cutoff #1 t = 9 min, 38.5 sec; Alt = 170.4 km; VI = 28,095 km/h". Prose: circular parking orbit 167 km | A (plan) |
| injection | 1859.4 | "Stage 3 Ignition 30 min, 59.4 sec" (also Stage 2 Restart 27 min 23.7 s; Stage 2 Cutoff #2 29 min 29.4 s, orbit 162.6 x 4,762.0 km at 28.48 deg; Stage 2-3 Separation 30 min 22.4 s; Stage 3 Burnout 32 min 26.6 s; Spacecraft Separation 37 min 14.4 s) | P (8 June plan) |
| separation | 2160 | "separated successfully from the Delta's third stage about 36 minutes after launch, while over the Indian Ocean" (SPIRIT_REL) | A (actual) |

Cross-check, not NASA: Spaceflight Now timeline for the second opportunity of 10 June (https://spaceflightnow.com/mars/mera/030609launchtimeline2.html): SRMs 1:06.0 and 2:11.5, MECO 4:23.4, stage separation 4:31.4, stage 2 ignition 4:36.9, fairing 4:42.0, SECO-1 9:39.0, restart 24:26.5, SECO-2 26:32.4, stage 2 separation 27:25.4, stage 3 ignition 27:52.4, burnout 29:29.6, yo-yo despin 34:12.4, separation 34:17.4. Its live log for the actual launch (https://spaceflightnow.com/mars/mera/status4.html) has restart scheduled at T+26:29 and "SPACECRAFT SEPARATION" logged at T+36:40. So the real third-stage ignition was close to 30 minutes, about half a minute to a minute before the 8 June plan value used in the JSON.

Conflict inside MERKIT: the prose says the second burn "begins about 14 to 19 minutes after liftoff for Rover A ... and about 59 to 67 minutes after liftoff for Rover B", but the chart puts the restart at 27 min 23.7 s and the same prose puts separation at 34 to 39 minutes. The "14 to 19" and "59 to 67" figures only fit if they count from parking-orbit insertion (9 min 38 s + 14 to 19 min = 24 to 29 min). I did not use them as times after liftoff.

### Opportunity (Delta II 7925H, SLC-17B, liftoff 8 Jul 2003 03:18:15 UTC = 7 Jul 11:18:15 p.m. EDT)

MERKIT has no chart for Rover B, only prose.

| Step | t (s) | Source text | Status |
|---|---|---|---|
| liftoff | 0 | "liftoff at 11:18:15 p.m. Eastern Daylight Time" (OPPY_REL) | A |
| srbGround | 80.5 | MERKIT only says "jettisoned in sets of three between 1 and 3 minutes after liftoff". The task brief says 80.5 s is verified from a JPL press kit; I could not find it in MERKIT, MERLAND or DAWNKIT. The step `src` is GRAILKIT, which supports "about 80 seconds" for the same 46-inch boosters: "Each solid rocket motor will burn for approximately 80 seconds." Spaceflight Now MER-B timeline (Boeing data, for a 25 June launch): "jettisoned in sets of three at T+80.5 and 81.5 seconds to fall into the Atlantic Ocean" (https://spaceflightnow.com/mars/merb/030616launchtimeline1.html) | X (exact value); M (about 80 s) |
| srbAir | 159.5 | Same situation. GRAILKIT: the last three "are ignited shortly after the initial six strap-on motors burn out" and each burns about 80 seconds, so about 160 s. Spaceflight Now: "T+02:39.5 Jettison Air-Lit SRMs" | X (exact value); M (about 160 s) |
| meco | 263 | "About 4 minutes and 23 seconds into the flight, the main engine will cut off" (MERKIT, said of each Delta II) | A (plan) |
| fairing | 283 | "Within the following 20 seconds, the first stage will separate from the second, the second stage will ignite, and the nose cone, or 'fairing,' will fall away" (MERKIT). 283 = 263 + 20. Spaceflight Now: 4:42.0 | B |
| parking | 540 | "At about 10 minutes after liftoff for Rover A and 9 minutes after liftoff for Rover B, the second-stage engine will temporarily stop firing" ... "circular parking orbit 167 kilometers (104 miles) above Earth" (MERKIT). Spaceflight Now: 8:47.8 | A (plan, rounded) |
| injection | null | Not printed anywhere by NASA, so `null` in the JSON. Estimate, NOT in the JSON: about 4605 s (76 min 45 s) = actual separation 83 min (4980 s) minus 375 s, the interval between "Stage 3 Ignition" and "Spacecraft Separation" on the Rover A chart (same third stage and yo-yo sequence). Spaceflight Now's 25 June plan has the same 375 s interval (73:50.2 to 80:05.2). The step text prints no time | D (left out) |
| separation | 4980 | "separated successfully from the Delta's third stage 83 minutes later" (OPPY_REL). MERKIT plan range: 78 to 87 minutes | A (actual) |

Coast length: MERKIT "about 59 to 67 minutes" (see the conflict above); the JSON text says "about an hour".

### Mars Pathfinder (Delta II 7925, LC-17B, liftoff 4 Dec 1996 06:58:00 UTC = 1:58 a.m. EST)

M96KIT pp. 30 to 33 (written for a 2 Dec launch), plus PDS_MISSION for what happened. The M96KIT "Mars Pathfinder launch phases" figure is an image with no text layer.

| Step | t (s) | Source text | Status |
|---|---|---|---|
| liftoff | 0 | "Launch: December 4, 1996, at 1:58 a.m. EST from Cape Canaveral Air Station, FL, on a Delta II launch vehicle" (MPFLAND quick facts); "6:58:00 UT" (NSSDCA_MPF) | A |
| srbGround | 67 | "The remaining three boosters will be fired when the first six burn out approximately 67 seconds after launch" (M96KIT) | A (plan, approximate) |
| srbAir | 131.5 | M96KIT gives only the altitude: "Those three boosters will be ejected when the spacecraft is about 54 kilometers (33 miles) above Earth's surface". 131.5 s is the MERKIT value for the same model. The step text prints the altitude, not a time | M |
| meco | 263 | M96KIT gives only "Main engine cutoff will occur next at an altitude of about 118 kilometers (73 miles)". 263 s is the 7925 value in MERKIT and PHXKIT | M |
| fairing | null | M96KIT: fairing ejection "following eight seconds later" than second-stage ignition, with no usable time, so `null` in the JSON. Estimate, NOT in the JSON: about 285 s = 4 min 36.9 s (stage 2 ignition for the same model, MERKIT) + 8 s. The step text prints only the "eight seconds" | D (left out) |
| parking | 560 | "When the spacecraft reaches an altitude of about 189 kilometers (117 miles) above Earth, its second-stage engine will be turned off for the first time, approximately 9 minutes, 20 seconds after launch" (M96KIT) | A (plan) |
| injection | 4200 | "About 70 minutes after launch, the PAM-D will fire its engine" (M96KIT; plan for the 2 Dec window). Before that: "The craft will coast for nearly an hour"; after the second burn "a highly elliptical orbit of 173 by 2,974 kilometers"; "the PAM-D upper stage will be spun up to about 70 rpm using a set of spin rockets" | P |
| separation | 4500 | "Injection occurred about one hour later after an extended coast phase. Separation occurred approximately 75 minutes after launch." (PDS_MISSION). Yo-yo: "After third stage burnout, the upper stage despun the stack using a yo-yo despin system" (PDS_MISSION); M96KIT: spin slowed "from 70 rpm to 12 rpm", separation "two to five minutes later" | A (actual, approximate) |

Conflicts in M96KIT and MPFLAND:
- M96KIT says "Second-stage ignition will take place about 2.5 minutes later" after main engine cutoff. On every other 7925 flight the gap is about 13 seconds (MERKIT: 4:23.4 to 4:36.9). I treated the sentence as wrong or garbled and did not use it.
- M96KIT says "About 70 minutes after launch, the PAM-D will fire its engine again"; the solid motor fires only once.
- MPFLAND body text says launch was at "1:58 a.m. EDT"; its quick facts and NSSDCA say EST (December, so EST is right).
- NSSDCA_MPF says "Delta II Lite" for the rocket; the press kits say Delta II 7925.

### Phoenix (Delta II 7925, SLC-17A, liftoff 4 Aug 2007 09:26 UTC = 5:26 a.m. EDT)

PHXKIT pp. 20 to 21: prose only, no chart. Its event times after the parking orbit are for the first opportunity of 3 Aug; rain delayed the launch to 4 Aug (PHXLAND p. 18).

| Step | t (s) | Source text | Status |
|---|---|---|---|
| liftoff | 0 | "On Aug. 4, 2007, at 5:26 a.m. EST [sic], a three-stage Delta II launch vehicle lofted the Phoenix spacecraft from pad SLC-17A ... into the pre-dawn eastern sky" (PHXLAND); quick facts say "5:26 a.m. Eastern Daylight Time" | A |
| srbGround | 66 | PHXKIT: "The spent casings of the first six boosters will be jettisoned about a minute after liftoff". 66 s is the MERKIT value for the same model. Spaceflight Now Phoenix timeline (ULA data): 1:06.0 (https://spaceflightnow.com/mars/phoenix/070725launchtimeline.html) | M |
| srbAir | 131.5 | PHXKIT: "The final three will be jettisoned about a minute later". 131.5 s from MERKIT. Spaceflight Now: 2:11.5 | M |
| meco | 263 | "About 4 minutes, 23 seconds into the flight, at an altitude of about 111 kilometers (69 miles), the main engine will cut off" (PHXKIT) | A (plan) |
| fairing | 303 | "During the following 40 seconds, the first stage will separate from the second, the second stage will ignite, and the fairing will fall away from the payload" (PHXKIT). 303 = 263 + 40. Spaceflight Now: 5:03.0 | B |
| parking | 560 | "At about 9 minutes, 20 seconds after liftoff, the second-stage engine will temporarily stop firing ... circular parking orbit 167 kilometers (104 miles) above Earth" (PHXKIT). Restart "ranging from 72 minutes to 85 minutes after liftoff. This interval of coasting between the two engine burns by the second stage is longer than in any previous Delta II launch" | A (plan) |
| injection | null | Not printed by NASA, so `null` in the JSON. Estimate, NOT in the JSON: about 4665 s (77 min 45 s) = 84 min separation (PHXKIT, 3 Aug) minus the 375 s interval of the MERKIT chart. Spaceflight Now (ULA data, 3 Aug plan): restart 73:47.2, SECO-2 76:02.3, stage 2 separation 77:05.5, third stage ignition 77:42.8, burnout 79:10.3, separation 84:10.3. The step text prints no time | D (left out) |
| separation | 5040 | "If Phoenix launches at the first opportunity on Aug. 3, the spacecraft will shed the burned-out Delta third stage 84 minutes after liftoff. For other launch opportunities ... ranges from 82 minutes to 96 minutes" (PHXKIT). Launch was 4 Aug | P |

No NASA page I found gives the real separation time on 4 Aug. PHX_REL only says the spacecraft made contact through Goldstone "at 7:02 a.m. Eastern Time, after separating from the third stage" (96 minutes after liftoff). Spaceflight Now's live log has "T+plus 84 minutes, 30 seconds" with Phoenix expected to have separated (https://spaceflightnow.com/mars/phoenix/status2.html, search snippet). A PDS Phoenix mission document reportedly says separation "approximately 36 minutes after launch" (search snippet, pdsatmospheres.nmsu.edu); that looks like text copied from a MER document and I ignored it.

## Where the rocket parts ended up (fates)

- **Solid boosters (`srbGround`, `srbAir`) and first stage (`stage1`): Atlantic Ocean.**
  - No NASA kit for these four flights prints the word "Atlantic". MERKIT's chart only labels "Booster Impact" twice, right after the jettison points.
  - GRAILKIT p. 12 (NASA/JPL, Delta II from the same launch complex): "The main engine will burn for approximately 263 seconds, and will then be jettisoned into the Atlantic Ocean." Used as the `src` of the first-stage fate; the fate sentence is worded as a general statement.
  - DS1KIT (Delta II 7326 from LC-17A): the vehicle "flies southeast over the Atlantic Ocean" and the solid motors are "catapulted free of the central stack" at about 16 km.
  - Not NASA: Spaceflight Now timelines for MER-A, MER-B and Phoenix say the ground-lit boosters "fall into the Atlantic Ocean", the air-lit ones are "jettisoned toward the Atlantic Ocean" and "The spent stage will fall into the Atlantic Ocean" (links above). For Pathfinder I found no per-flight statement; it rests on the general evidence.
- **Interstage:** dropped with the first stage in the JSON. The kits' diagrams show the interstage between first and second stage but no NASA text I read says which stage it stays with. It is standard Delta II design that it stays on the first stage. Not verified.
- **Fairing halves (`fairingA`, `fairingB`): `unknown`.** No source of any kind that I read says where they came down. They were released at about 121 km and 22,377 km/h (MERKIT), below orbital speed (28,095 km/h at parking orbit), so they fell back; the fate text says only that.
- **Second stage (`stage2`): re-entered Earth's atmosphere.** After the second burn it is left in an elongated Earth orbit (MERKIT chart: 162.6 x 4,762.0 km at 28.48 deg; M96KIT: 173 x 2,974 km). The re-entry dates come only from the U.S. satellite catalog as mirrored by CelesTrak (not NASA):

  | Launch | Object in Earth orbit with decay date | Decay date | Heliocentric object |
  |---|---|---|---|
  | 1996-068 Pathfinder | 1996-068B "DELTA 2 R/B(1)", cat. 24668, last orbit 138 x 175 km, 36.29 deg | 1997-11-28 | 1996-068C "DELTA 2 R/B(2)", cat. 24669, orbit centre SU |
  | 2003-027 Spirit | 2003-027C "DELTA 2 R/B(1)", cat. 27829, 125 x 194 km, 25.6 deg | 2004-01-27 | 2003-027B "DELTA 2 R/B(2)", cat. 27828, SU |
  | 2003-032 Opportunity | 2003-032C "DELTA 2 R/B(1)", cat. 27851, 114 x 185 km, 25.9 deg | 2004-07-25 | 2003-032B "DELTA 2 R/B(2)", cat. 27850, SU |
  | 2007-034 Phoenix | 2007-034C "DELTA 2 R/B(1)", cat. 32007, 127 x 198 km, 25.81 deg | 2010-06-06 | 2007-034B "DELTA 2 R/B(2)", cat. 32004, SU |

  The catalog names do not say which object is which stage. My reading: the Earth-centred object that decayed is the second stage (it never left Earth orbit) and the Sun-centred object is the third stage (it made the escape burn). CelesTrak codes: ORBIT_CENTER EA = Earth, SU = Sun; ORBIT_TYPE IMP = impact (decayed), ORB = orbit (legend at https://celestrak.org/satcat/satcat-format.php). The catalog records the decay, not whether everything burned up, so the fate says "fell back into the atmosphere" and `where` is `burned`.
- **Third stage (`stage3`): orbit around the Sun.**
  - MERKIT p. 36 and MERLAND p. 37: "When the Delta's third stage separates from the spacecraft, the two objects are traveling on nearly identical trajectories. To prevent the possibility of the Delta's third stage hitting Mars, that shared course is deliberately set so that the spacecraft would miss Mars if not for its first trajectory correction maneuver, about 10 days later."
  - PHXKIT p. 27 and PHXLAND p. 26: same text, plus "By design, the third stage is never aimed at Mars."
  - M96KIT and MPFLAND have no such paragraph, so for Pathfinder the only evidence is the catalog entry (Sun-centred orbit).
  - None of the kits uses the words "orbit around the Sun" for the third stage; that part is the catalog plus the fact that the stage left Earth with the spacecraft.

## What the spacecraft left behind (`left`)

### Mars Pathfinder
- Cruise stage: "The cruise stage was jettisoned prior to entry into the Martian atmosphere and impacted the surface" (PDS_HOST). NSSDCA_MPF: "jettisoned 30 minutes before atmospheric entry"; MPFLAND chart: "Landing - 34 min".
- Heat shield, back shell, parachute, airbags (PIA09105, HiRISE image of 21 Dec 2006): "one can discern the ramps, science deck, and portions of the airbags on the Pathfinder lander"; "The back shell and parachute are to the south, and four features that may be portions of the heat shield are identified." Airbags "deflated and were retracted" (NSSDCA_MPF, PDS_HOST).
- Sojourner: "rolled down a deployment ramp at about 05:40 UT on 6 July 1997"; operated "until 27 September 1997 when communications were lost for unknown reasons"; primary-mission work "all within about 10 meters of the lander" (NSSDCA_SOJ). PIA09105's panorama caption marks only a "proposed current location" of the rover, so the JSON does not say where exactly it sits.
- The lander itself (Carl Sagan Memorial Station, https://science.nasa.gov/mission/mars-pathfinder/) is the machine of this page, so it is not in `left`.

### Spirit and Opportunity
- Cruise stage: "Fifteen minutes before atmospheric entry, the protective aeroshell encasing the lander and rover will separate from the cruise stage, whose role will at that point be finished. Each cruise stage will ultimately impact Mars." (MERKIT p. 32; same in MERLAND). This is the plan; I found no NASA report of the impact itself, so the fate says "according to the mission plan".
- Spirit hardware (PIA01879): "The bright irregularly shaped feature in area 'a' of the image is Spirit's parachute, now lying on the Martian surface"; "Near the parachute is the cone-shaped back shell", which "appears relatively undamaged by its impact with the Martian surface"; "Wrinkles and folds in the parachute fabric are clearly visible"; "Area 'b' of the image shows Spirit's lander"; "Area 'c' of the image shows Spirit's heat shield at the edge of Bonneville Crater."
- Opportunity hardware (PIA09364): "Opportunity's parachute, now lying on the martian surface"; "Near the parachute is the cone-shaped 'backshell'"; "Area 'b' of the image shows the impact point and the broken remnants of Opportunity's heat shield"; Eagle crater is where "Opportunity's airbag-cushioned lander came to rest" and "The lander is still clearly visible on the floor of the crater."
- Extra, not used in the JSON: Opportunity later examined "its own jettisoned heat shield" (PHXKIT p. 43).
- Image dates: PIA09364 is HiRISE PSP_001414_1780 of 14 Nov 2006. For PIA01879 the fetch reported 29 Sept 2006 while the HiRISE site dates its Gusev image PSP_001513_1655 to 22 Nov 2006; the JSON says only "2006".
- Lander names (Columbia Memorial Station, Challenger Memorial Station) appeared only in search snippets; not used.

### Phoenix
- Cruise stage: "Seven minutes before it reaches the top of Mars' atmosphere, Phoenix will jettison the cruise stage" (PHXKIT p. 24); "For hardware expected to impact Mars, such as the cruise stage after lander separation, a detailed thermal analysis was conducted to make sure that plunging through Mars atmosphere gets it sufficiently hot that few to no spores survive" (PHXKIT p. 27). Plan only.
- Heat shield and back shell with parachute (PIA10710): "From top to bottom are the Phoenix lander with its solar panels deployed on the Martian surface, the heat shield and bounce mark the heat shield made on the Martian surface, and the top of the Phoenix parachute attached to the bottom of the back shell."
- Descent plan (PHXKIT p. 24): heat shield jettisoned during the first 25 seconds on the parachute; lander separates from back shell and parachute "about 900 meters (3,000 feet) above the ground", then lands on descent thrusters. No airbags.

## Not verified, or resting on a non-NASA source

1. "Atlantic Ocean" for the boosters and first stage of these four flights: general NASA statement (GRAILKIT, DS1KIT) plus Spaceflight Now timelines for three of them. Nothing flight-specific for Pathfinder.
2. Second-stage re-entry dates and the third stage's solar orbit for Pathfinder: CelesTrak SATCAT only.
3. Which catalog object is the second stage and which the third: my inference.
4. Opportunity booster times 80.5 s and 159.5 s: the exact values are not in any NASA kit I read; they come from the task brief and Spaceflight Now. GRAILKIT supports only "about 80 seconds" of burn for the same boosters.
5. Phoenix booster times 66 s and 131.5 s, Pathfinder air-lit jettison 131.5 s and main engine cutoff 263 s: same-model values from MERKIT.
6. Fairing times 283 s (Opportunity) and 303 s (Phoenix): upper bounds from prose. Pathfinder fairing: `null` (estimate about 285 s).
7. Third-stage ignition for Opportunity and Phoenix: `null` (estimates about 4605 s and 4665 s). Spirit's 1859.4 s and Pathfinder's 4200 s are plan values for a different launch day. Phoenix separation 5040 s is the 3 Aug plan; the real time on 4 Aug is not in a NASA source.
8. Interstage staying with the first stage: no NASA text.
9. Fairing landing place: unknown.
10. Cruise-stage impacts for Spirit, Opportunity and Phoenix: stated as the plan, no report of the event.
11. `firstYear` 1990 (7925) from a U.S. Air Force history; 2003 (7925H) from a NASA caption that contradicts itself in the next sentence.

## Note for the merge

- `src/js/65-launch.js` (`lxTimes`) fills any `t: null` by interpolating between neighbours and shows the result on the T+ clock, under a caption that says the times are real. Three steps are `null` here because no NASA source prints a time: `opportunity.injection` (the clock would show about T+46 min; the estimate is about 76 min 45 s), `phoenix.injection` (about T+46 min 40 s; estimate about 77 min 45 s) and `pathfinder.fairing` (about T+6 min 51 s; estimate about 4 min 45 s). Either hide the clock on `null` steps or decide whether to accept the estimates in the tables above.
- The JSON has no `shutdown` key (it is not in SPEC.md). `65-launch.js` and the dev fixture do support `shutdown: ["stage2"]`; adding it to each `parking` step would switch the second-stage flame off during the coast.
- Step ids follow the dev fixture: `pad, liftoff, srbGround, srbAir, meco, fairing, parking, injection, separation`.
- Plan values kept as numbers (NASA-printed, worded as "plan" in the text): `spirit.injection` 1859.4, `pathfinder.injection` 4200, `phoenix.separation` 5040.

## Verification

Independent fact-check pass, 15 Nov 2026. `delta2_mars.json` was rewritten; **where this section and the tables above disagree, this section is the current one** (the sections above are the first researcher's notes, left as written).

Rule applied: a time, altitude, speed or `where` stays only if a NASA document prints it for that mission (plan or report). Where two NASA documents for the same mission disagree, the later one wins. Values borrowed from another flight, built by arithmetic, or found only in Boeing, ULA or Spaceflight Now material were set to `null` / `unknown` and the text reworded.

How the sources were read: the press-kit PDFs as text plus rendered page images for the figures (pdftoppm). The copies of `m96pkt.pdf`, `merlaunch.pdf` and `phoenix-launch-presskit.pdf` that were read are byte-identical (SHA-1) to what the JPL URLs serve today. News, PDS, NSSDCA and Photojournal pages were read through WebFetch (short quotes). The catalog was read through CelesTrak's JSON endpoint. Spaceflight Now pages were not re-opened; their numbers below are the first researcher's and are used only as a cross-check, never in the JSON.

### Sources added in this pass

| Tag | Document | URL |
|---|---|---|
| FEIS | NASA, "Final Environmental Impact Statement for the Mars Exploration Rover-2003 Project", December 2002. Sections 2.1.5 to 2.1.6 (pp. 2-10 to 2-15, Figures 2-6 and 2-7) and 4.1.2.7. Written for exactly the two launches of Spirit (MER-A) and Opportunity (MER-B) | https://www.nasa.gov/wp-content/uploads/2018/04/mer_feis_dec_2002_0.pdf |
| M96KIT p. 32 | Figure "Mars Pathfinder launch phases" in the 1996 kit. It is a scanned image with no text layer, which is why the first pass missed it; read here from the rendered page | https://www.jpl.nasa.gov/news/press_kits/m96pkt.pdf |
| OCO2 | JPL, OCO-2 "Launch Vehicle" page: "First entering service in 1989, the vehicle completed 155 flights over nearly three decades" | https://ocov2.jpl.nasa.gov/observatory/launch-vehicle/ |
| SATCAT (JSON) | CelesTrak SATCAT records, not NASA | https://celestrak.org/satcat/records.php?INTDES=1996-068&FORMAT=json (also 2003-027, 2003-032, 2007-034) |
| MPF-FONSI | NASA notice, Federal Register 24 Oct 1994, Mars Pathfinder finding of no significant impact. Checked: it does not say where the spent stages fall | https://www.govinfo.gov/content/pkg/FR-1994-10-24/html/94-26270.htm |

### Confirmed (source re-opened, says what the JSON says)

- **Spirit ascent** (MERKIT chart, pp. 26 to 27, "Numbers approximate, for first day of Rover A launch period"): boosters 1 min 6 s and 1 min 7 s at 18.0 / 18.3 km and 3,668 / 3,712 km/h; 2 min 11.5 s at 52.4 km and 9,046 km/h; main engine cutoff 4 min 23.4 s at 119.3 km and 22,317 km/h; stage 2 ignition 4 min 36.9 s; fairing 4 min 42 s at 121.3 km and 22,377 km/h; stage 2 cutoff 9 min 38.5 s at 170.4 km and 28,095 km/h; stage 3 ignition 30 min 59.4 s; separation 37 min 14.4 s. FEIS Figure 2-6 prints the same booster times and altitudes (66.0 and 67.0 s, 18.0 and 18.3 km; 131.5 s, 52.4 km).
- **Spirit liftoff and separation** (SPIRIT_REL): "1:58:47 p.m. Eastern Daylight Time", "seven-month journey", "thundered aloft from Cape Canaveral Air Force Station", "separated successfully from the Delta's third stage about 36 minutes after launch, while over the Indian Ocean".
- **Opportunity liftoff and separation** (OPPY_REL): "liftoff at 11:18:15 p.m. Eastern Daylight Time" (Monday 7 July; 03:18 UTC on 8 July), "separated successfully from the Delta's third stage 83 minutes later".
- **Opportunity main engine cutoff, parking orbit** (MERKIT p. 24): "About 4 minutes and 23 seconds into the flight, the main engine will cut off"; "9 minutes after liftoff for Rover B"; "circular parking orbit 167 kilometers (104 miles)"; second burn "2 to 3 minutes"; "about 63 rotations per minute"; "about 87 seconds".
- **Phoenix** (PHXKIT pp. 18 to 21, PHXLAND p. 18): 39.6 m; boosters "each about 13 meters (43 feet) tall"; "About 4 minutes, 23 seconds into the flight, at an altitude of about 111 kilometers"; "At about 9 minutes, 20 seconds"; 167 km; restart "72 minutes to 85 minutes after liftoff ... longer than in any previous Delta II launch"; "about 2 minutes"; "about 70 rotations per minute"; "about 87 seconds"; separation "84 minutes after liftoff" for 3 Aug, "82 minutes to 96 minutes" otherwise; launch "Aug. 4, 2007, 5:26 a.m. Eastern Daylight Time", "into the pre-dawn eastern sky"; "By design, the third stage is never aimed at Mars".
- **Pathfinder liftoff, parking, separation**: "December 4, 1996, at 1:58 a.m. EST" (MPFLAND quick facts; PDS_MISSION: "6:58 am UTC (1:58 am EST) from launch complex 17B"); "approximately 9 minutes, 20 seconds after launch", "about 189 kilometers", "coast for nearly an hour", "spun up to about 70 rpm using a set of spin rockets", "About 70 minutes after launch, the PAM-D will fire" (M96KIT pp. 30 to 33); "After third stage burnout, the upper stage despun the stack using a yo-yo despin system. Separation occurred approximately 75 minutes after launch." (PDS_MISSION).
- **Second-stage decay dates and Sun-centred third stages** (SATCAT JSON, not NASA): 1996-068B decay 1997-11-28; 2003-027C decay 2004-01-27; 2003-032C decay 2004-07-25; 2007-034C decay 2010-06-06; all four "DELTA 2 R/B(1)", orbit centre EA, type IMP. The four "DELTA 2 R/B(2)" objects (1996-068C, 2003-027B, 2003-032B, 2007-034B) have orbit centre SU, type ORB, no decay date.
- **Hardware left at Mars**: PDS_HOST "The cruise stage was jettisoned prior to entry into the Martian atmosphere and impacted the surface"; "the airbags deflated and were retracted". PIA09105 (image of 21 Dec 2006): "one can discern the ramps, science deck, and portions of the airbags"; "The back shell and parachute are to the south"; "four features that may be portions of the heat shield". NSSDCA_SOJ: "rolled down a deployment ramp at about 05:40 UT on 6 July 1997"; "until 27 September 1997 when communications were lost for unknown reasons". PIA01879 (image of 29 Sept 2006 per the NASA caption): parachute, back shell that "appears relatively undamaged", "Wrinkles and folds in the parachute fabric", "Spirit's lander", "Spirit's heat shield at the edge of Bonneville Crater". PIA09364 (image of 14 Nov 2006): "the impact point and the broken remnants of Opportunity's heat shield", Eagle crater, "The lander is still clearly visible on the floor of the crater". PIA10710: "the heat shield and bounce mark", "the Phoenix parachute attached to the bottom of the back shell". MERKIT p. 32: "Fifteen minutes before atmospheric entry ... Each cruise stage will ultimately impact Mars." PHXKIT pp. 24 and 27: "Seven minutes before it reaches the top of Mars' atmosphere, Phoenix will jettison the cruise stage"; "hardware expected to impact Mars, such as the cruise stage".
- **Rocket**: 39.6 m with payload (MERKIT p. 23, PHXKIT, PHXLAND); "more than 40 successful launches"; "the H identifies the vehicle as a heavy lifter"; boosters 1,016 mm against 1,168 mm, "about 25 percent more thrust" (MERKIT pp. 23 to 24).

### Corrected

1. **Pathfinder times: taken from the mission's own figure instead of another flight.** M96KIT p. 32 prints: Solid Drop (6) 66.0/67.0 s, 18.2 km, 1,025 m/s; Solid Drop (3) 131.5 s, 54.3 km, 2,536 m/s; MECO 260.7 s, 118.3 km, 6,246 m/s; Second Stage Ignition 274.2 s; Fairing Drop 282.0 s, 130.0 km, 6,273 m/s; Second Stage Engine Cutoff 557.9 s, 188.7 km, 7,793 m/s; Restart 3945.1 s; SECO 2 4061.8 s; Stage 2/3 Separation 4114.8 s; Stage 3 Ignition 4151.8 s; Stage 3 Burnout 4239.0 s ("Hyperbolic Injection"); Spacecraft Separation 4351.8 s.

   | Step | Before | Now |
   |---|---|---|
   | srbGround | t 67 | t 66, alt 18.2 km, speed 3,690 km/h |
   | srbAir | t 131.5 (borrowed from the MER kit), alt 54 | t 131.5 (now Pathfinder's own), alt 54.3, speed 9,130 |
   | meco | t 263 (borrowed, wrong for this flight), alt 118 | t 260.7, alt 118.3, speed 22,486 |
   | fairing | t null | t 282, alt 130.0, speed 22,583 |
   | parking | t 560, alt 189 | t 557.9, alt 188.7, speed 28,055 (the text keeps the prose's "about 9 minutes 20 seconds") |
   | injection | t 4200 | t 4151.8 (the text says "in the plan, about 70 minutes") |

   Speeds are the figure's inertial velocities in m/s multiplied by 3.6 (unit conversion, rounded to 1 km/h). The figure also settles the old conflict: stage 2 lights 13.5 s after cutoff, so the prose's "about 2.5 minutes later" is wrong. New conflict inside the kit: the figure gives the orbit after the second burn as 170 by 5001 km, the prose as 173 by 2,974 km; neither number is in the JSON.
2. **Opportunity booster times 80.5 s and 159.5 s: not NASA for this flight.** The brief's "verified from JPL press kits" is wrong; those values are in the ULA booklets for Dawn and GRAIL (other flights) and in Spaceflight Now's MER-B timeline. The only NASA document that prints Opportunity's booster times is FEIS Figure 2-7 ("typical" profile for a 25 June 2003 launch): GEM Jettison (6) "T = 82.5 & 83.5 sec, Alt = 26.1 & 26.7 km"; GEM Jettison (3) "T = 161.5 sec, Alt = 68.9 km". JSON now: `srbGround` t 82.5, alt 26.1; `srbAir` t 161.5, alt 68.9; `src` FEIS; the texts say "a little over 80 seconds" and "about 2 minutes 40 seconds", which hold for both sets of numbers.
3. **Spirit and Opportunity: boosters, first stage and fairing halves are `ocean`, now with a mission-specific NASA source.** FEIS 2.1.5.7: "The jettisoned GEM casings, the first stage, and the PLF components would fall into the ocean." FEIS 4.1.2.7: "The solid rocket motor casings, the first stage, and the payload fairing (PLF) of each Delta II launch vehicle would be jettisoned and land in deep ocean areas". FEIS 2.1.6: the 7925H stages and fairing "would be essentially the same". "Atlantic": the launch vehicle "gains altitude and moves downrange over the Atlantic Ocean" (FEIS 4.1.2.4). The fairing halves were `unknown` before; the sentences "the press kit does not say where its halves came down" were removed for these two flights.
4. **Pathfinder and Phoenix: boosters, first stage and fairing halves changed from `ocean` (or kept `unknown`) to `unknown` with an "in general" sentence.** No NASA document for these two missions says where the pieces fell (kits, PDS, NSSDCA and the Pathfinder FONSI were checked; the 1996 figure only labels "Solid Impact (First Set)" and "(Second Set)"). The general statement is the FEIS one, written for the MER Delta IIs. This is the same bar `delta2_other.json` uses for NEAR, Dawn and Kepler.
5. **Interstage: `ocean` changed to `unknown` on all four flights**, and the claim that it "stayed attached to the first stage and fell with it into the Atlantic" removed. No NASA text read says which stage it stays with (the kits only label it in the rocket drawing). It is still listed in the `meco` step's `drop` so the 3D part has a step.
6. **`firstYear`: 1990 and 2003 changed to 1989 for both keys** (first flight of the Delta II family, OCO2 page), which is also what `delta2_other.json` has for the same keys. 1990 for the 7925 had no NASA source (U.S. Air Force history only).
7. **Second and third stages of Spirit and Opportunity now have NASA support** besides the catalog: FEIS 2.1.5.7, "The second stage would remain in orbit and would reenter the atmosphere within about two to three months (USAF 1996); the depleted second stage would typically burn up upon reentry" and "The third stage would continue separately into interplanetary space." The catalog dates (7.5 and 12.5 months after launch, not 2 to 3) stay in the fates with their attribution. For Pathfinder's third stage, the kit figure's "Stage 3 Burnout ... Hyperbolic Injection" before spacecraft separation supports that the stage left Earth.
8. **Texts**: Spirit and Phoenix plan values now say whose plan ("in the plan for the first possible day"); Opportunity and Phoenix third-stage steps say "more than an hour after liftoff" instead of nothing (restart is 59 to 67 min for Rover B and 72 to 85 min for Phoenix in the kits); Pathfinder's cruise stage no longer says "with solar panels" (not in the source cited; PDS_HOST says it "was responsible for controlling the vehicle during cruise"); `fairingA` is named "first half" instead of "two halves"; Spirit's parking title is "Una órbita de espera" (it does not complete a lap).

### Removed (set to null)

| Field | Was | Why |
|---|---|---|
| `phoenix.srbGround.t` | 66 | MER value. PHXKIT only says "about a minute after liftoff" |
| `phoenix.srbAir.t` | 131.5 | MER value. PHXKIT only says "about a minute later" |
| `phoenix.fairing.t` | 303 | Upper bound built from "During the following 40 seconds" |
| `opportunity.fairing.t` | 283 | Upper bound built from "Within the following 20 seconds". FEIS Figure 2-7 prints 297.0 s, which the later kit contradicts, so neither is used |

NASA's Phoenix launch-day pages (nasa.gov/mission_pages/phoenix/launch/) now return 404, so no NASA page could be found with Phoenix's own booster, fairing or real separation times.

### Still unverified, for the integrator

1. **Null times and the T+ clock.** `lxTimes` in `src/js/65-launch.js` fills nulls by interpolation and shows them under "times are real". With this file it would show: Phoenix boosters T+1:28 and T+2:55, Phoenix fairing T+6:52, Phoenix third stage T+46:40, Opportunity fairing T+6:42, Opportunity third stage T+46:00. The clock should be hidden on steps whose `t` is null. Estimates, NOT in the JSON and not NASA-printed for these flights: Opportunity third-stage ignition about 4605 s (separation at 83 min minus the 375.0 s between "Third Stage Ignition" and "Spacecraft Separation", an interval printed identically in the MERKIT chart and in FEIS Figures 2-6 and 2-7; the FEIS first-day value is 4,447.7 s, about 2.6 min too early for the real launch day); Phoenix, from ULA data on Spaceflight Now for 3 Aug: boosters 1:06.0 and 2:11.5, fairing 5:03.0, third-stage ignition 77:42.8, separation 84:10.3.
2. **Plan values for another launch day, kept as numbers and worded as plan**: `spirit.injection` 1859.4 s (chart for 8 June, launch 10 June; JPL's "about 36 minutes" for the real separation against the chart's 37 min 14 s shows the real day ran up to about a minute earlier); `phoenix.separation` 5040 s (3 Aug plan, launch 4 Aug, no NASA report of the real time); `pathfinder.injection` 4151.8 s (the figure does not say which day; the kit was written for 2 Dec, launch was 4 Dec; real separation "approximately 75 minutes" against the figure's 72.5).
3. **Opportunity boosters**: 82.5 and 161.5 s come from a December 2002 "typical" profile; Boeing's launch-week timeline (Spaceflight Now) says 80.5 / 81.5 and 159.5 s. The same FEIS profile is demonstrably older than the press kit in other places (Spirit: MECO altitude 111.7 km against 119.3 km, fairing 298.5 s against 282 s).
4. **Second-stage `burned`** for Pathfinder and Phoenix rests only on the U.S. catalog as mirrored by CelesTrak (decay recorded, not complete burn-up); that the decayed Earth-centred object is the second stage is an inference (it is the only stage left in Earth orbit).
5. **`ROCKETS_INFO` clashes with `delta2_other.json`** on `heightM`: 39.6 here (three JPL kits, "with payload") against 38 there (FEIS: "more than 38 m (125 ft)"). `firstYear` 1989 is the family year; "In use since 1989" is printed beside the model name, and the 7925H itself first flew in 2003 (NASA caption OPPY_IMG: "the first use of a Delta II 'Heavy' launch vehicle with an upper stage").
6. **Cruise-stage impacts** of Spirit, Opportunity and Phoenix are the stated plan; no NASA report of the events was found. The fates say "according to the mission plan".
7. **Shape**: no `shutdown` key (not in SPEC.md), as before.
8. **`src` fields that do not carry the whole claim** (one `src` per entry): `firstYear` 1989 is supported by the OCO2 page, while both `ROCKETS_INFO` entries keep the MER kit as `src` (it supports height and blurb). The Spirit and Opportunity step texts say "Atlantic" while the step `src` is the MER kit (times, altitudes, speeds); the support for the ocean is the FEIS, cited in the fates. Pathfinder step alt/speed come from the M96KIT figure, the "in general" ocean sentence from the FEIS.
9. **Third stage `sunOrbit` for Pathfinder and Phoenix** rests on the catalog (Sun-centred object), not on a NASA sentence that says "orbit around the Sun". NASA support is indirect: Pathfinder's figure ("Hyperbolic Injection" at stage 3 burnout) and Phoenix's kit ("By design, the third stage is never aimed at Mars"). For Spirit and Opportunity the FEIS says "interplanetary space".
