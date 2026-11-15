# Launch stages research: Delta II, the non-Mars flights (NEAR, Dawn, Kepler)

Research notes for `docs/etapas/delta2_other.json`. Written 15 Nov 2026. Rocket keys: `delta7925` (NEAR, a 7925-8), `delta7925H` (Dawn, a 7925H-9.5), `delta7925_10L` (Kepler). Every number in the JSON comes from one of the sources below. Conversions used: 1 n mi = 1.852 km.

How the sources were read: PDFs were fetched and their text layer extracted with `pdftotext`; the quoted sentences were read in that raw text. Web pages (JPL blog, JPL news, NSSDCA, govinfo, science.nasa.gov) were read through a fetch tool that returns short verbatim quotes, so those quotes are short fragments. Wikipedia was not used as a source.

The JSON shape allows one `src` per entry. Where an entry uses facts from two sources, the JSON cites the one that carries the main claim and the second one is named here.

## Sources

| key | what | URL | NASA-hosted |
|---|---|---|---|
| DAWN-PK | JPL "Dawn Launch: Mission to Vesta and Ceres", press kit, September 2007 | https://www.jpl.nasa.gov/news/press_kits/dawn-launch.pdf | yes |
| DAWN-DJ | JPL Dawn Journal by Marc Rayman, 12 Sep 2007 (written before launch, planned values) | https://www.jpl.nasa.gov/blog/2007/9/september-12-2007 | yes |
| DAWN-DJ2 | JPL Dawn Journal, 30 Sep 2007 (after launch) | https://www.jpl.nasa.gov/blog/2007/9/september-30-2007 | yes |
| DAWN-REL | JPL news release "Dawn Spacecraft Successfully Launched", 27 Sep 2007 | https://www.jpl.nasa.gov/news/dawn-spacecraft-successfully-launched/ | yes |
| DAWN-ULA | ULA "Dawn" mission booklet (Delta II 7925H), 2007 | https://www.ulalaunch.com/docs/default-source/news-items/dii_dawn_mob.pdf | no (ulalaunch.com) |
| KEP-PK | NASA "Kepler: NASA's First Mission Capable of Finding Earth-Size Planets", press kit, February 2009 | https://www.jpl.nasa.gov/news/press_kits/Kepler-presskit-2-19-smfile.pdf | yes |
| KEP-ULA | ULA "Kepler Mission Overview, Delta II 7925-10L", 2009 | https://www.ulalaunch.com/docs/default-source/news-items/dii_kepler_mob.pdf | no (ulalaunch.com) |
| KEP-REL | JPL news release "NASA's Kepler Mission Rockets to Space in Search of Other Earths", 6 Mar 2009 | https://www.jpl.nasa.gov/news/nasas-kepler-mission-rockets-to-space-in-search-of-other-earths | yes |
| KEP-COVER | JPL news release 2009-065 "Dust Cover Jettisoned From NASA's Kepler Telescope", 7 Apr 2009 | https://www.jpl.nasa.gov/news/dust-cover-jettisoned-from-nasas-kepler-telescope/ | yes |
| NEAR-TRAJ | NSSDCA, "NEAR Trajectory" | https://nssdc.gsfc.nasa.gov/planetary/mission/near/near_traj.html | yes |
| NEAR-NMC | NSSDCA master catalog, NEAR Shoemaker (1996-008A) | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A | yes |
| NEAR-FR | NASA Notice 96-001, "National Environmental Policy Act; Near Earth Asteroid Rendezvous Mission", Federal Register vol. 61 no. 16, 24 Jan 1996, pp. 1950-1951 (finding of no significant impact, written by NASA) | https://www.govinfo.gov/content/pkg/FR-1996-01-24/html/96-917.htm | NASA text, hosted by govinfo.gov |
| NEAR-APL | Dunham, McAdams, Farquhar, "NEAR Mission Design", Johns Hopkins APL Technical Digest 23(1), 2002, p. 19 and Fig. 2 | https://secwww.jhuapl.edu/techdigest/Content/techdigest/pdf/V23-N01/23-01-Dunham.pdf | no (JHU/APL, the mission operator; technical journal) |
| FEIS | NASA, "Final Environmental Impact Statement for the Mars Exploration Rover-2003 Project", December 2002, sections 2.1.5, 2.1.6, 4.1.2.7 | https://www.nasa.gov/wp-content/uploads/2018/04/mer_feis_dec_2002_0.pdf | yes |
| MER-PK | NASA "Mars Exploration Rover Launches" press kit, June 2003, p. 23 | https://www.jpl.nasa.gov/news/press_kits/merlaunch.pdf | yes |
| OCO2 | JPL, OCO-2 "Launch Vehicle" page (Delta II history) | https://ocov2.jpl.nasa.gov/observatory/launch-vehicle/ | yes |
| OCO2-BLOG | NASA Science blog, "Delta II to Give OCO-2 a Lift to Orbit", 1 Jul 2014 | https://science.nasa.gov/blogs/oco-2/2014/07/01/delta-ii-to-give-oco-2-a-lift-to-orbit/ | yes |
| OPP | NASA Science resource, "Opportunity Rover Delta II Launch" | https://science.nasa.gov/resource/opportunity-rover-delta-ii-launch | yes |
| SATCAT | CelesTrak SATCAT (public mirror of the U.S. Space Force satellite catalogue), queried 15 Nov 2026 | https://celestrak.org/satcat/table-satcat.php?INTDES=1996-008 , ...?INTDES=2007-043 , ...?INTDES=2009-011 (orbit fields: https://celestrak.org/satcat/records.php?INTDES=2009-011&FORMAT=json) | no |
| PPG | ULA/Boeing "Delta II Payload Planners Guide", December 2006 (text extracted from a copy another agent of this workflow fetched; the public URL is believed to be https://www.ulalaunch.com/docs/default-source/rockets/deltaiipayloadplannersguide2007.pdf, not re-fetched by me) | see left | no |

The NEAR launch press kit (NASA, February 1996) was NOT found. NSSDCA used to link an FTP copy at NASA Headquarters; NTRS has no record; near.jhuapl.edu timed out; web.archive.org cannot be fetched from this environment. All NEAR per-event times are therefore `null` except two minute-resolution values from NEAR-APL.

## ROCKETS_INFO

### Common to the three keys
- `family`: "Delta II". `firstYear`: 1989 for all three, the first flight of the Delta II family: "First entering service in 1989, the vehicle completed 155 flights over nearly three decades" [OCO2]. The same page credits it with "100 consecutive successful launches" and says "The Delta II flew its final mission, ICESat-2, on September 15, 2018".
- The task asked for "first flight year of that family". If the integrator prefers the first flight of each variant (the sibling file `heavy.json` did that for Titan IIIE): 7925H = 2003 [OPP: Opportunity "was the first NASA mission lifted on what is referred to as a Delta II 'heavy' rocket" and "the first use of a Delta II 'Heavy' launch vehicle with an upper stage"; date given as July 8, 2003]. For the plain 7925 (commonly given as 1990) and for the -10L fairing (commonly given as 2002) I found NO NASA source; do not use those years without one.

### delta7925 (shared with the Mars flights)
- Height: "The Delta II 7925 stands more than 38 m (125 ft) in height at launch" [FEIS 2.1.5]. JSON uses 38.
- CONFLICT: MER-PK p. 23 says of the 7925 and 7925H "With their payloads on top, each launch vehicle stands 39.6 meters (130 feet) tall." The agent that covers the Mars flights may have used 39.6. The PPG Figure 1-2 scale puts the 9.5-ft-fairing vehicle at about 38 m (scale top 38.1 m / 125 ft), which agrees with the FEIS, so 38 was kept. The integrator must pick one value for the shared key.
- NEAR's vehicle was specifically a "Delta 7925-8 (a Delta II Lite launch vehicle with nine strap-on solid-rocket boosters and a Star 48 (PAM-D) third stage)" [NEAR-NMC]; "A Delta 7925-8 rocket was used to launch NEAR" [NEAR-APL]. No source gives a height for the 8-ft-fairing version.
- Blurb: 155 flights, 1989, 100 consecutive successes, last flight 2018 [OCO2]. Nine solid motors on the first stage and a Star 48B third stage that "would provide the final acceleration needed to inject the spacecraft onto the proper interplanetary trajectory"; "The Star 48B is about 2 m (6.7 ft) in length" [FEIS 2.1.5, 2.1.5.7].

### delta7925H (Dawn; shared with Opportunity)
- Height: JSON uses 38, same as the 7925, because "The first, second and third stages, the payload fairing ... of the Delta II 7925H ... would be essentially the same as those elements described in Section 2.1.5 for the Delta II 7925" [FEIS 2.1.6]. Same conflict with MER-PK (39.6 m).
- Blurb: Opportunity "was the first NASA mission lifted on what is referred to as a Delta II 'heavy' rocket. It is a more powerful vehicle that uses larger strap-on solid rocket motors developed for the Delta III launch vehicle" [OPP]. Supporting numbers not used in the blurb: boosters 1,168 mm (46 in) across instead of 1,016 mm (40 in), "about 25 percent more thrust" [MER-PK]; each large motor holds 16,865 kg of propellant against 11,740 kg [FEIS 2.1.6].
- NAMING CONFLICT: DAWN-PK calls Dawn's vehicle "Delta II Heavy 2925H-9.5" and "Delta 2925H"; DAWN-ULA and DAWN-DJ2 call it "Delta II 7925H" / "Delta II 7925H-9.5". The JSON key `delta7925H` follows ULA and the Dawn Journal.

### delta7925_10L (Kepler)
- Blurb: "A stretched 10-foot diameter (three meter) payload fairing encloses the second stage, third stage, and payload during first stage flight and the early portion of second stage flight" and "The spacecraft and photometer, with its sunshade, must fit inside a standard Delta II launch vehicle" [KEP-PK].
- Height: NOT VERIFIED for this variant, so the JSON has `heightM: null`. No NASA page gives the height of a 7925-10L. A defensible estimate is about 39 m, built from: NASA's "128 feet tall and eight feet in diameter, with a 10-foot payload fairing" (= 39.0 m) for the Delta II 7320-10C of OCO-2 [OCO2-BLOG]; the -10L fairing is "3.0-m (10-ft)-dia x 9.2-m (30.4-ft)-long" [PPG] against "about 8.5 m (28 ft) tall" for the 9.5-ft fairing [FEIS], so about 0.7 m more than the ">38 m" vehicle. Third-party launch databases (not sources) give 38.9 to 39.3 m. Other NASA blogs give 127 ft (SMAP) and 132 ft (ICESat-2) for other 10-ft-fairing Delta IIs, so NASA's own figures scatter by about 1.5 m.

## Dawn (27 Sep 2007, 11:34 UTC, SLC-17B)

Actual launch: "Thursday at 7:34 a.m. Eastern Time", "launch complex 17B at the Cape Canaveral Air Force Station", "The Delta 2 rocket, fitted with nine strap-on solid-fuel boosters" [DAWN-REL]; "Dawn's voyage began at 7:34:00.372 am EDT"; "Following separation from the third stage at 8:36 am" [DAWN-DJ2] (8:36 - 7:34 = 62 min, matches the plan).

All step times are PLANNED values, published for the 26 Sep launch date (the ULA tables are labelled "For 26 Sep - 9 Oct 2007 Launch"). No as-flown timeline was found.

| step | t (s) | where each number comes from |
|---|---|---|
| liftoff | 0 | "At the moment of liftoff, the Delta II's first-stage main engine ignites, along with six of its nine solid-fuel boosters" [DAWN-PK] |
| srbGround | 80.5 | "The solid motors burn out at about L + 77 seconds when the rocket is at an altitude of about 24 kilometers (15 miles)"; "Three of the spent motors separate at L + 80.5 seconds", the other three one second later [DAWN-DJ]. ULA table: burnout 1:17.1, air-lit ignition 1:19.0, jettison 1:20.5 and 1:21.5, at 13.83 and 14.09 n mi (25.6 and 26.1 km) [DAWN-ULA]. No `alt_km` in the JSON because the journal's 24 km is the burnout altitude, not the jettison altitude. |
| srbAir | 159.5 | "The remaining 3 motors burn for 77 seconds, and when they are released at L + 2 minutes 39.5 seconds" the rocket is "nearly 73 kilometers" high and about ten times the speed of sound [DAWN-DJ]. ULA: 2:39.5, 39.25 n mi = 72.7 km. NOTE: the journal page gives "(117 miles)" next to 73 km, which is an arithmetic slip in the journal (73 km = 45 miles); only the km value was used. |
| stage1 | 271 | Main engine "continues to burn for 4 minutes, 23 seconds"; "Eight seconds later, the Delta's first stage falls away, and approximately 5 seconds later the second stage is ignited" [DAWN-PK]. "After 8.5 seconds of the coast, having lofted Dawn to 130 kilometers (81 miles), the first stage separates" [DAWN-DJ]. ULA: MECO 4:22.5, separation 4:31.0, stage II ignition 4:36.5. |
| fairing | 281 | "jettisoned approximately 4 minutes, 41 seconds into flight" [DAWN-PK]; "At an altitude of 135 kilometers (84 miles), the shroud ... is ejected" [DAWN-DJ]. ULA: 4:41.0, 73.06 n mi = 135.3 km. |
| parking | 538 | "At launch plus 8 minutes, 58 seconds, the Delta's second stage shuts down and the rocket coasts for 42 minutes, 37 seconds before the engine restarts" [DAWN-PK]; "reaches the altitude and velocity to be in a low orbit" [DAWN-DJ]. ULA: SECO-1 8:58.3 at 102.00 n mi (188.9 km). No `alt_km` in the JSON: DAWN-PK only gives "an orbit 184 kilometers (115 miles) above Earth" for the moment of the SECOND cutoff (ULA: 99.58 n mi = 184.4 km at SECO-2). |
| stage2 | 3308 | Restart at L + 51 min 35 s at 179 km, burn of 2 min 39 s, "The second stage separates at L + 55 minutes 8 seconds" [DAWN-DJ]. "the Dawn spacecraft and its Star 48 upper stage are spun up to about 50 rpm, after which the second stage separates. Thirty-seven seconds later -- at launch plus 55 minutes, 45 seconds -- the Star 48 upper stage is ignited and burns for about 86 seconds" [DAWN-PK]. ULA: restart 51:35.0, SECO-2 54:14.5, spin rockets 55:04.5, separation 55:07.7, stage III ignition 55:44.7, burnout 57:10.7. The step text only says the second stage stays behind in Earth orbit ("the Dawn spacecraft and the Delta's second and third stages are in an orbit ... above Earth" [DAWN-PK]); the 2009 re-entry is only in the fates entry. |
| separation | 3721 | "Only 62 minutes 1 second after liftoff, while 1021 kilometers (635 miles) above their home world" [DAWN-DJ]. "About 4.7 minutes after the third stage burns out, a yo-yo despin system is used to decrease the spin rate ... from about 50 rpm to zero ... A few seconds later, pyrotechnic actuators and push-off springs will separate the Dawn spacecraft" [DAWN-PK]. ULA: 1:02:00.8, 551.46 n mi = 1,021.3 km. The yo-yo is "two cables, each 12.15 meters (39 feet 10 inches) long" [DAWN-DJ]. |

`speed_kmh` was left out everywhere: the ULA profile gives inertial velocity (VI), not ground speed, and the journal only gives a few rounded speeds.

Fates:
- Boosters, first stage, interstage, fairing: `unknown`, with the general NASA statement. Flight-specific fate is not written anywhere I read. General statement (same vehicle family, same launch complex): "The jettisoned GEM casings, the first stage, and the PLF components would fall into the ocean" [FEIS 2.1.5.7]; "The solid rocket motor casings, the first stage, and the payload fairing (PLF) of each Delta II launch vehicle would be jettisoned and land in deep ocean areas where the metal parts would eventually corrode" [FEIS 4.1.2.7]. Circumstantial for Dawn: the DAWN-ULA flight profile draws two "SRM Impact" points, and DAWN-DJ2 says the count was held because "a ship was discovered to have entered a restricted zone in the waters east of the launch site". If the integrator accepts a vehicle-level NASA statement as enough, these six entries (and the same six for NEAR and Kepler) can be switched to `ocean` with the same `src`.
- Interstage: it leaves attached to the first stage: "The first-stage subassemblies include the RS-27A engine section, liquid oxygen (LO2) tank, centerbody, fuel tank, and the interstage" [PPG 1.2.1]. Not stated in any NASA-hosted page I read.
- stage2: `burned`. SATCAT 2007-043C "DELTA 2 R/B(1)": decay date 2009-09-18, last orbit 121 x 228 km, 26.54 deg. Not a NASA source. NASA's general statement for this vehicle: "The second stage would remain in orbit and would reenter the atmosphere within about two to three months (USAF 1996); the depleted second stage would typically burn up upon reentry" [FEIS]; for Dawn it took about two years. DAWN-ULA adds "A second-stage depletion burn sequence follows the primary mission to safe the stage" (depletion ignition 1:16:40.5, SECO-3 1:17:03.9).
- stage3: `sunOrbit`. "The third stage, its raison d'etre fulfilled and having no further purpose, continues on its own through the vast emptiness of the solar system"; of the yo-yo cables: "With their weights still attached, they enter independent orbits around the Sun" [DAWN-DJ, written before launch]. Confirmed as flown by SATCAT 2007-043B "DELTA 2 R/B(2)": orbit centre SU (Sun), no decay date.
- `left`: empty. No NASA source describes anything the Dawn spacecraft itself discarded. (The yo-yo cables belong to the rocket's third stage.)

## Kepler (7 Mar 2009, 03:49 UTC = 6 Mar 10:49 p.m. EST, SLC-17B)

Actual launch: "aboard a United Launch Alliance Delta II at 10:49 p.m. EST (7:49 p.m. PST), Friday, March 6"; "Engineers acquired a signal from Kepler at 12:11 a.m. Saturday EST ... after it separated from its spent third-stage rocket and entered its final sun-centered orbit, trailing about 1,529 kilometers (950 miles) behind Earth" [KEP-REL].

All step times are PLANNED values. KEP-ULA: "All times and dates in this book are based on an initial launch opportunity of March 5, 2009"; the launch slipped one day. Two daily windows existed, with azimuths 93 and 99 degrees [KEP-PK]; the tables used here are the 93-degree (first window) ones, and 10:49 p.m. EST is the first window (the booklet lists 22:48:43 EST for the first window of 5 March and 23:16:34 for the second). That the 6 March launch used the first window is my reading of the times, not a quoted statement.

Date note: the kid text says "night of 6 March 2009" and "10:49 p.m. Florida time" [KEP-REL]; the site table lists the same instant as 7 Mar 2009 03:49 UTC. Both are right; pick one convention when merging.

| step | t (s) | where each number comes from |
|---|---|---|
| liftoff | 0 | "At the moment of liftoff, the Delta-II's first stage's main engine and six of the nine strap-on solid rocket motors are ignited" [KEP-PK] |
| srbGround | 66 | "Following the burnout of the first six solids at 63.1 seconds, the remaining three solids are ignited at 65.5 seconds. The spent casings are then jettisoned in sets of three" [KEP-PK]. Jettison times 0:01:06.0 and 0:01:07.0, altitude 9.8 / 10.1 n mi = 18.1 / 18.7 km: ONLY in KEP-ULA. |
| srbAir | 131.5 | "The last set of three is jettisoned at 131.5 seconds after launch" [KEP-PK]. Altitude 30.8 n mi = 57.0 km: only in KEP-ULA. |
| stage1 | 271.3 | "The first stage engine continues to burn for almost 4.5 minutes until Main Engine Cutoff. The first and second stages separate, and approximately 5 seconds later the second stage is ignited" [KEP-PK]. MECO 4:23.3, separation 4:31.3, second-stage ignition 4:36.8: only in KEP-ULA. |
| fairing | 281 | "The payload fairing is jettisoned at 4.7 minutes into the flight after the free molecular heating rate has fallen to within acceptable levels" [KEP-PK] (4.7 min = 282 s). Exact 281.0 s and altitude 73.1 n mi = 135.4 km: only in KEP-ULA. |
| parking | 596 | "circular Earth orbit of 115 mile altitude (185 kilometers). The first shutdown of the second stage occurs at just under 10 minutes after launch"; "coast for approximately 43 minutes"; "roll in a barbecue-style along its longitudinal axis" [KEP-PK]. Exact 0:09:56.0: only in KEP-ULA ("100-nmi circular parking orbit at 9 minutes 56 seconds"). |
| stage2 | 3296.8 | All from KEP-ULA: restart 0:53:10.0, "Second-stage restart burn duration is 64 seconds", SECO-2 0:54:13.8 (orbit 94 x 1,180 n mi), spin-up 0:54:53.8, separation 0:54:56.8, third-stage ignition 0:55:33.8, burnout 0:57:00.1. KEP-PK: "the spin table rockets will fire, spinning the third stage up to about 70 revolutions per minute. The second and third stages will then separate." |
| separation | 3708.8 | The step text attributes the stage's solar orbit to the U.S. catalogue (SATCAT), not to the press kit. "almost 90-seconds" burn; "Approximately 5 minutes after third stage burnout, a yo-yo device will deploy and de-spin the upper stage/spacecraft stack ... A few seconds later, southeast of New Guinea, Kepler will separate from the spent third stage motor at about 1.7 meters per second" [KEP-PK]. Time 1:01:48.8 (3,708.8 s, "61.8 minutes") and altitude 389.6 n mi = 721.5 km: only in KEP-ULA. |

Conflicts inside the Kepler sources (none of these numbers is in the kid text):
- KEP-PK says the stack is spun "up to about 70 revolutions per minute" and then despun "from about 55 rpm".
- Orbital period: 371 days [KEP-PK] against 372.5 days [KEP-ULA and the old kepler.nasa.gov mission page].
- Third-stage burn: "almost 90-seconds" [KEP-PK] against 86.3 s [KEP-ULA]. The JSON says "almost 90 seconds".

Fates:
- Boosters, first stage, interstage, fairing: `unknown` with the general NASA statement [FEIS], as for Dawn. KEP-ULA's flight profile draws two "GEM Impact" points but does not say where.
- stage2: `earthOrbit`. SATCAT 2009-011C "DELTA 2 R/B(1)": no decay date, orbit 2,251 x 7,355 km, period 196.1 min, inclination 28.53 deg (queried 15 Nov 2026). Not a NASA source; no NASA page states this. This is the opposite of NASA's general statement (re-entry within months), which is why the flight-specific catalogue entry was used. KEP-ULA gives only the orbit right after the second burn (94 x 1,180 n mi = 174 x 2,185 km); the higher catalogue orbit implies a later burn that the booklet does not describe.
- stage3: `sunOrbit`. SATCAT 2009-011B "DELTA 2 R/B(2)": orbit centre SU (Sun), no decay date. Not a NASA source. Supporting, not explicit: at separation the stack is on an escape path (C3 = 0.61 km2/s2 [KEP-ULA]); "The LV will deliver the Kepler spacecraft (SC) into a solar orbit" [KEP-ULA]; general statement "The third stage would continue separately into interplanetary space" [FEIS, written for the MER flights].
- `left`: the photometer dust cover. Plan: "Dust cover jettison is planned to occur about three weeks into commissioning" [KEP-PK]. Fact: release dated April 7, 2009; "At 7:13 p.m. PDT on April 7, engineers ... " sent the command; "The telescope's oval-shaped dust cover, measuring 1.7 meters by 1.3 meters (67 inches by 52 inches)"; "The spring-loaded cover swung open on a fly-away hinge, before drifting away from the spacecraft"; "The cover is now in its own orbit around the sun, similar to Kepler's sun-centric orbit" [KEP-COVER]. Note 7:13 p.m. PDT on 7 April is 02:13 UTC on 8 April; the JSON says 7 April, as the release does.

## NEAR (17 Feb 1996, 20:43 UTC, LC-17B)

"NEAR was launched on 17 February 1996, at 20:43 UT (3:43 p.m. EST) from Pad 17-B at Cape Canaveral Air Station, FL, using a three-stage Delta II-7925 expendable launch vehicle" [NEAR-TRAJ]. "This was the first time that a rocket as small as a Delta was used for an interplanetary mission" [NEAR-APL]. NEAR-APL Fig. 2 ("NEAR launch trajectory") labels, in EST: Launch 15:43; Parking orbit insertion 15:53; Shadow entrance 15:57; Injection burn 16:05 to 16:09; Shadow exit 16:21; Canberra acquisition of signal 16:35.

| step | t (s) | where each number comes from |
|---|---|---|
| liftoff | 0 | 15:43 EST [NEAR-APL Fig. 2], 20:43 UT [NEAR-TRAJ]. Ignition of the main engine and six boosters is the standard 7925 sequence [FEIS], not a NEAR-specific statement. |
| srbGround, srbAir, fairing | null | No NEAR-specific time or statement found. Text is the general Delta II 7925 sequence: "The first stage main engine and six of the GEMs would be ignited at liftoff. After the six ground-lit GEMs burn out, the three remaining GEMs would be ignited in the air. The spent GEM casings would be jettisoned after burnout ... After separation, the second stage would be ignited and the PLF would be jettisoned" [FEIS 2.1.5.7]. NEAR had "nine strap-on solid-rocket boosters" [NEAR-NMC]. |
| stage1 | null | "The second stage would be ignited at an altitude of 122 km (76 mi.), which is in the ionosphere" [NEAR-FR, a pre-launch plan]. `alt_km` 122 is that ignition altitude. |
| parking | 600 (approx.) | 15:53 minus 15:43 = 10 min [NEAR-APL Fig. 2, minute resolution, so plus or minus 1 min]. "The Delta II parking orbit had an altitude of 100 miles (183 kilometers) and an inclination of 28.74 degrees"; "The coast period in the parking orbit was relatively short (13 minutes)" [NEAR-TRAJ]. |
| stage2 | null | Injection burn 16:05 to 16:09 EST = 22 to 26 min after launch [NEAR-APL Fig. 2, minute resolution]; the text says "about 22 minutes". `t` is null because in the Dawn and Kepler entries `t` of this step is the moment the second stage separates, and no source gives that moment for NEAR. "The injection burn, accomplished mainly by a four-minute burn of the third stage solid motor, was entirely inside Earth's shadow" [NEAR-TRAJ]. The moment the second stage separated is not given anywhere; it is placed in this step because it happens inside the injection sequence. |
| separation | null | The sentence about the stage being in solar orbit is attributed in the text to the U.S. catalogue (SATCAT), not to NSSDCA. "A yo-yo despin mechanism simultaneously released the solar panels from their stowed launch position and despun the spacecraft from a maximum of 69 rpm to a nominal rate of 0 rpm" [NEAR-TRAJ]. |

Conflicts for NEAR:
- Separation time. NEAR-TRAJ says "Approximately 22 minutes after launch, the spacecraft separated from the third stage." NEAR-APL Fig. 2 puts the injection burn itself at 22 to 26 minutes after launch, so separation cannot be at 22 minutes; 10 min to orbit plus the 13 min coast that NEAR-TRAJ itself gives is already 23 minutes. The 22 minutes is most likely the start of the injection burn. The JSON gives no separation time (`t: null`).
- "four-minute burn of the third stage solid motor" [NEAR-TRAJ] against a Star 48B burn of about 86 to 90 s in DAWN-PK, KEP-PK and KEP-ULA. The 4 minutes matches the whole injection sequence in NEAR-APL Fig. 2 (16:05 to 16:09). The kid text says the final push lasts about 4 minutes and is done mostly by the third stage; it does not say the third stage alone burned for 4 minutes.
- One third-party page gives the launch as 3:43 a.m. EST; it was 3:43 p.m. EST (20:43 UT) [NEAR-TRAJ, NEAR-APL].

Fates:
- Boosters, first stage, interstage, fairing: `unknown` with the general NASA statement [FEIS]. The NEAR environmental notice [NEAR-FR] does not say where they fall.
- stage2: `burned`, from NASA's own pre-launch statement for this mission: "Although the second stage would achieve orbit, its orbital decay time would fall below the limit NASA has set for orbital debris consideration" and "After burning its propellant to depletion, the second stage would remain in low Earth orbit until its orbit eventually decayed" [NEAR-FR]. As flown: SATCAT 1996-008B "DELTA 2 R/B(1)", decay date 1998-01-17, last orbit 119 x 183 km (not a NASA source; date not used in the JSON). "Burned" is the enum value; the sentence only says it re-entered.
- stage3: `sunOrbit`. SATCAT 1996-008C "DELTA 2 R/B(2)": orbit centre SU (Sun), no decay date. Not a NASA source; no NASA page states the fate of NEAR's third stage. Supporting: the launch energy was C3 = 26.0 km2/s2 [NEAR-APL], an escape trajectory.
- `left`: empty. Candidate NOT included: on NEAR the yo-yo despin mechanism was part of the spacecraft (it also held the solar panels [NEAR-TRAJ]), so its cables and weights were probably released by the spacecraft on the escape path; no source says so or says where they went.

## Differences with `delta2_mars.json` on the shared keys (seen 15 Nov 2026, read only)

The sibling file for the Mars flights also defines `delta7925` and `delta7925H`. The two files disagree and the integrator has to keep one entry per key:

| field | this file | `delta2_mars.json` |
|---|---|---|
| `delta7925.heightM` | 38 [FEIS: "more than 38 m (125 ft)"] | 39.6 [MER-PK: "With their payloads on top, each launch vehicle stands 39.6 meters (130 feet) tall"] |
| `delta7925H.heightM` | 38 [FEIS] | 39.6 [MER-PK] |
| `delta7925.firstYear` | 1989 (Delta II family, [OCO2]) | 1990 (first 7925; I found no NASA source for that year) |
| `delta7925H.firstYear` | 1989 (family) | 2003 (first Heavy; NASA-sourced in [OPP]) |
| booster / first stage / interstage fates | `unknown` + general statement (no flight-specific statement for NEAR, Dawn, Kepler) | `ocean` |

Both heights are NASA numbers. If the Mars file's reading of the fate rule is kept (vehicle-level NASA statement is enough), switch the 18 `unknown` entries of this file to `ocean` so the seven Delta II flights look the same.

## Not verified / to decide at merge time

1. NEAR launch press kit not found: no NEAR-specific times for booster, first-stage, fairing or second-stage separation, nor for spacecraft separation. The only NEAR times are `t` 600 for `parking` (minute-resolution reading of a figure, plus or minus 60 s) and "about 22 minutes" in the text of `stage2`.
2. Booster, first-stage, interstage and fairing fates are `unknown` for the three flights (18 entries): only a vehicle-level NASA statement says "ocean" [FEIS, written for the MER launches from the same complex]. Switch to `ocean` if that is judged enough.
3. Second- and third-stage fates rest on the U.S. satellite catalogue as mirrored by CelesTrak (not NASA): Dawn stage 2 re-entry 18 Sep 2009; Kepler stage 2 still in Earth orbit; Kepler and NEAR stage 3 heliocentric. Exceptions with a NASA/JPL statement: Dawn stage 3 [DAWN-DJ] and NEAR stage 2 [NEAR-FR].
4. All Dawn and Kepler times are planned values (Dawn for 26 Sep, flown 27 Sep; Kepler for 5 Mar, flown 6 Mar EST). Kepler's exact times, altitudes and the 64-s restart burn come from the ULA booklet, which is not NASA-hosted (steps `srbGround`, `srbAir`, `stage1`, `stage2` cite it as `src`; `fairing`, `parking`, `separation` cite the press kit but take `t` and `alt_km` from the booklet).
5. Heights: 38 m for `delta7925` and `delta7925H` (FEIS) conflicts with 39.6 m in the MER press kit; `delta7925_10L` has `heightM: null` because no NASA figure exists for that variant (estimate about 39 m, see above).
6. `firstYear` is 1989 (family) for the three keys; variant first flights are only NASA-sourced for the Heavy (2003).
7. The interstage leaving with the first stage is from the ULA Payload Planners Guide only.
8. Dawn vehicle name: press kit "2925H-9.5" against ULA / Dawn Journal "7925H-9.5".

## Verification

Independent fact-check, 15 Nov 2026. Every source below was fetched again by the checker; PDFs were text-extracted with `pdftotext -layout` and the sentences read in the raw text; web pages were read through a fetch tool that returns short verbatim quotes. Wikipedia was not used. Where this section disagrees with the notes above, this section is the current state of `delta2_other.json`.

### Confirmed (the source was opened and says what the JSON says, for this flight)

Dawn
- Launch: "Thursday at 7:34 a.m. Eastern Time", "launch complex 17B", "nine strap-on solid-fuel boosters" (https://www.jpl.nasa.gov/news/dawn-spacecraft-successfully-launched/); liftoff 7:34:00.372 am EDT and separation from the third stage at 8:36 am, 62 minutes later (https://www.jpl.nasa.gov/blog/2007/9/september-30-2007).
- Every `t`: 80.5, 159.5, 271, 281, 538, 3308, 3721. Read in the JPL press kit (https://www.jpl.nasa.gov/news/press_kits/dawn-launch.pdf: main engine 4 min 23 s, first stage falls away 8 s later, fairing 4 min 41 s, second-stage shutdown 8 min 58 s, coast 42 min 37 s, second cutoff 54 min 14 s, third-stage ignition 55 min 45 s, 37 s after second-stage separation, burn about 86 s, about 50 rpm) and in the Dawn Journal of 12 Sep 2007 (https://www.jpl.nasa.gov/blog/2007/9/september-12-2007: L + 77 s burnout at about 24 km, L + 80.5 s, L + 2 min 39.5 s at nearly 73 km and 10 times the speed of sound, 130 km, 135 km, L + 8 min 58 s, restart L + 51 min 35 s for 2 min 39 s, separation L + 55 min 8 s, 86 s, 62 min 1 s at 1021 km).
- Cross-check against the ULA booklet (https://www.ulalaunch.com/docs/default-source/news-items/dii_dawn_mob.pdf): 1:20.5 and 1:21.5, 2:39.5, 4:31.0, 4:41.0, 8:58.3, 55:07.7, 1:02:00.8; altitudes 39.25 nmi = 72.7 km, 73.06 nmi = 135.3 km, 551.46 nmi = 1,021.3 km. All agree with the JSON. The ULA tables are headed "For 26 Sep - 9 Oct 2007 Launch", so they cover the real launch day (27 Sep); they are still planned values, not as-flown.
- `alt_km` 73, 130, 135, 1021: confirmed as above.

Kepler
- Launch: "10:49 p.m. EST (7:49 p.m. PST), Friday, March 6" (https://www.jpl.nasa.gov/news/nasas-kepler-mission-rockets-to-space-in-search-of-other-earths); "On March 6, 2009 at 10:49:57 p.m. EST" from "Launch Complex 17-B" (https://www.nasa.gov/kepler/keplers-launch, new source).
- NASA press kit (https://www.jpl.nasa.gov/news/press_kits/Kepler-presskit-2-19-smfile.pdf): 7925-10L, stretched 10-foot (three meter) fairing enclosing second stage, third stage and payload, 63.1 s, 65.5 s, sets of three, 131.5 s, "almost 4.5 minutes", "approximately 5 seconds later", 4.7 minutes, 115 mile (185 kilometers) circular orbit, "just under 10 minutes", "approximately 43 minutes", barbecue roll, "almost 90-seconds", yo-yo about 5 minutes after burnout, "southeast of New Guinea", sunshade sentence. All confirmed.
- ULA booklet (https://www.ulalaunch.com/docs/default-source/news-items/dii_kepler_mob.pdf): 0:01:06.0 and 0:01:07.0 at 9.8 / 10.1 nmi, 131.5 s at 30.8 nmi, separation 0:04:31.3, fairing 281.0 s at 73.1 nmi, SECO 1 0:09:56.0, "Second-stage restart burn duration is 64 seconds", second- and third-stage separation 0:54:56.8, payload separation 3,708.8 s at 389.6 nmi. Conversions 18.1, 57, 135.4, 721.5 km are right. All `t` and `alt_km` of Kepler confirmed.
- Which window: the booklet lists the 93-degree window at 22:48:43 EST and the 99-degree one at 23:16:34 EST for 5 March. The real liftoff at 22:49:57 EST on 6 March can only be the first (93-degree) window, so the 93-degree timeline is the right one. This is an inference from the times, not a quoted sentence.
- `left`, dust cover: release dated April 7, 2009, command sent "At 7:13 p.m. PDT on April 7", "oval-shaped dust cover, measuring 1.7 meters by 1.3 meters", "The cover is now in its own orbit around the sun, similar to Kepler's sun-centric orbit" (https://www.jpl.nasa.gov/news/dust-cover-jettisoned-from-nasas-kepler-telescope/). Confirmed.

NEAR
- "NEAR was launched on 17 February 1996, at 20:43 UT" (3:43 p.m. EST), Pad 17-B, "three-stage Delta II-7925"; parking orbit "100 miles (183 kilometers)", coast "relatively short (13 minutes)"; injection "accomplished mainly by a four-minute burn of the third stage solid motor"; yo-yo despin "from a maximum of 69 rpm" releasing the solar panels (https://nssdc.gsfc.nasa.gov/planetary/mission/near/near_traj.html). Confirmed.
- Figure 2 of the APL paper: launch 15:43 EST, parking orbit insertion 15:53, injection burn 16:05 to 16:09 (https://secwww.jhuapl.edu/techdigest/Content/techdigest/pdf/V23-N01/23-01-Dunham.pdf). Confirmed.
- NEW NASA SOURCE: H. E. McCurdy, "Low-Cost Innovation in Spaceflight: The Near Earth Asteroid Rendezvous (NEAR) Shoemaker Mission", NASA SP-2005-4536, chapter 4 (https://www.nasa.gov/wp-content/uploads/2023/04/sp-4536.pdf): "The mission plan called for the rocket to place the spacecraft in a 100-nautical-mile-high parking orbit 10 minutes after launch. Thirteen minutes later, over Africa, a 4-minute blast would set the spacecraft on its path away from Earth's gravitational pull. Most of that thrust was to be provided by the Star48B third stage"; "Once released from the launch vehicle, the spacecraft would use an ingenious device to eliminate its spin ... two carefully weighted cables ... As the cables unwound and eventually flew away"; "the cables restrained the 1.8-meter-long solar panels"; spin "69 revolutions per minute". This backs `t` 600 of `parking` with a NASA statement (plan value), the 4-minute push done mostly by the third stage, the word "cables" in the `separation` text (NSSDCA does not use it) and the order separation first, despin after.
- `alt_km` 122 and the second-stage plan: "The second stage would be ignited at an altitude of 122 km (76 mi.)", "After burning its propellant to depletion, the second stage would remain in low Earth orbit until its orbit eventually decayed" (https://www.govinfo.gov/content/pkg/FR-1996-01-24/html/96-917.htm). Confirmed. It is a pre-launch plan value and it is the ignition altitude, a few seconds after the separation the step shows.
- Vehicle: "Delta 7925-8 (a Delta II Lite launch vehicle with nine strap-on solid-rocket boosters and a Star 48 (PAM-D) third stage)" (https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A). Confirmed.

Fates of the upper stages
- CelesTrak SATCAT, queried again on 15 Nov 2026 (https://celestrak.org/satcat/records.php?INTDES=1996-008&FORMAT=json, same with 2007-043 and 2009-011):
  - 1996-008B DELTA 2 R/B(1): decay 1998-01-17, last orbit 119 x 183 km. 1996-008C DELTA 2 R/B(2): orbit centre SU, no decay date.
  - 2007-043C DELTA 2 R/B(1): decay 2009-09-18, last orbit 121 x 228 km. 2007-043B DELTA 2 R/B(2): orbit centre SU.
  - 2009-011C DELTA 2 R/B(1): no decay date, 2,251 x 7,355 km, 28.53 deg, period 196.1 min, orbit centre EA. 2009-011B DELTA 2 R/B(2): orbit centre SU.
  All as the notes say. The catalogue does not say which object is which stage; reading the Earth-centred one as the second stage and the Sun-centred one as the third is an inference (a sound one: only the third stage made the escape burn).
- NEW NASA CORROBORATION: NASA Orbital Debris Quarterly News. Vol. 13 issue 2, April 2009, table "International Space Missions, 01 January - 31 March 2009": "2009-011A KEPLER USA HELIOCENTRIC", Earth Orbital Rocket Bodies 1 (https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv13i2.pdf). Vol. 11 issue 4, October 2007, table for 01 July - 30 September 2007: "2007-043A DAWN USA HELIOCENTRIC", Earth Orbital Rocket Bodies 1 (https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv11i4.pdf). So NASA itself records that each launch left exactly one rocket body in Earth orbit while the spacecraft went heliocentric. This supports `earthOrbit` for Kepler's second stage as of 2009 and "stays behind, in orbit around Earth" in Dawn's `stage2` step. It does not give Dawn's 2009 re-entry date and it does not say that Kepler's stage is still there today: those two remain catalogue-only.
- Dawn third stage and yo-yo cables in solar orbit: "With their weights still attached, they enter independent orbits around the Sun", third stage "continues on its own through the vast emptiness of the solar system" (Dawn Journal, 12 Sep 2007, written before launch). Confirmed.

General Delta II statements
- "The first stage main engine and six of the GEMs would be ignited at liftoff ... The jettisoned GEM casings, the first stage, and the PLF components would fall into the ocean ... The second stage would remain in orbit and would reenter the atmosphere within about two to three months ... The third stage would continue separately into interplanetary space" and "The solid rocket motor casings, the first stage, and the payload fairing (PLF) of each Delta II launch vehicle would be jettisoned and land in deep ocean areas" (https://www.nasa.gov/wp-content/uploads/2018/04/mer_feis_dec_2002_0.pdf, sections 2.1.5 and 4.1.2.7). Confirmed, and confirmed that it is written for the two MER launches, not for NEAR, Dawn or Kepler.
- Interstage: "The first-stage subassemblies include the RS-27A engine section, liquid oxygen (LO2) tank, centerbody, fuel tank, and the interstage" (ULA/Boeing Delta II Payload Planners Guide, December 2006, section 1.2.1; read in a text copy fetched by another agent of this workflow). Confirmed; not a NASA source.

ROCKETS_INFO
- "First entering service in 1989, the vehicle completed 155 flights over nearly three decades, including 100 consecutive successful launches"; final mission ICESat-2 on September 15, 2018 (https://ocov2.jpl.nasa.gov/observatory/launch-vehicle/). Confirmed. The page gives no height.
- Opportunity "was the first NASA mission lifted on what is referred to as a Delta II 'heavy' rocket"; "larger strap-on solid rocket motors developed for the Delta III launch vehicle"; dated July 8, 2003 (https://science.nasa.gov/resource/opportunity-rover-delta-ii-launch). Confirmed. The same caption also says the launch was the "second use" of a core Delta II Heavy and "the first use ... with an upper stage"; either way the year is 2003.
- "With their payloads on top, each launch vehicle stands 39.6 meters (130 feet) tall", said of the 7925 and the 7925H together (https://www.jpl.nasa.gov/news/press_kits/merlaunch.pdf, p. 23). Confirmed.

### Corrected

1. `delta7925.heightM` and `delta7925H.heightM`: 38 changed to 39.6. "More than 38 m (125 ft)" in the MER FEIS is a floor, not a height, and it is not stated at all for the 7925H (the notes inferred it). The MER launch press kit prints an exact figure for both models and `delta2_mars.json` already uses it, so the two files now agree. The `src` of the two entries still points to the page that backs the blurb; the height source is the MER press kit. (Third-party figures for the 9.5-ft-fairing vehicle are nearer 38.3 m; NASA's own documents disagree by about 1.5 m. If the integrator prefers the FEIS reading, write "38" and cite the FEIS.)
2. `firstYear`. `src/js/65-launch.js` prints it as "In use since {y}" beside the model name, so the family year 1989 on a variant key would be a general fact presented as specific. Now: `delta7925H` = 2003 (NASA-sourced, same as `delta2_mars.json`); `delta7925` = null and `delta7925_10L` = null (the page skips a null). No NASA page that could be opened gives the first flight of the 7925 (November 1990 per a U.S. Air Force history cited in `delta2_mars.md`; a NASA sheet at https://sma.nasa.gov/LaunchVehicle/assets/delta-7925.pdf shows "First Launch: 1990-11-26" in a search snippet but the server answered HTTP 500 on both attempts) or of the 7925-10L. The family year 1989 is still in the `delta7925` blurb, where it is said of the family.
3. NEAR `liftoff` text: the sentence "It was the first time a rocket as small as a Delta was used for an interplanetary mission" was removed. It rests on one line of the APL paper, and NASA's own record contradicts a plain reading of it: Pioneer 6 was launched on a Delta in 1965 into solar orbit to measure "interplanetary phenomena" (https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1965-105A). The text now gives only the time and the destination, both in NSSDCA; `src` changed to the NSSDCA trajectory page.
4. NEAR `stage2` text: "About 22 minutes after liftoff the final push begins" changed to "After those 13 minutes comes the final push". Three sources give three readings of the 22 minutes (NSSDCA: spacecraft separation; APL figure: start of the burn; NASA SP-2005-4536: 10 + 13 = 23 minutes), while the 13-minute coast is stated by both NSSDCA and NASA History.
5. Dawn `srbAir` text: "about ten times faster than sound" changed to "at about ten times the speed of sound", which is what the Dawn Journal says.
6. Dawn `stage2` `src` changed from the Dawn Journal to the JPL press kit: the text says "about 50" turns per minute, which is the press kit's figure (the Journal says 48 rpm), and the press kit alone also gives the restart, the 2 min 39 s burn (51:35 to 54:14) and the separation time (55:45 minus 37 s).
7. The 18 `unknown` fates (boosters, first stage, interstage, fairing halves of the three flights): the closing clause "but the sources we read do not say so for this particular flight" was replaced by "NASA says that on a Delta II ... fall into the ocean". `where` and `src` unchanged. The flight-specific first halves (times and altitudes) were all re-checked and kept.

### Removed

- The "first time a rocket as small as a Delta" claim (item 3).
- "About 22 minutes after liftoff" (item 4).
- `firstYear` 1989 on the three variant keys (item 2).
- `heightM` 38 (item 1).

Nothing else was removed: no `t`, `alt_km`, `drop`, fate or `left` entry failed its check.

### Checked and deliberately left as it was

- `where: "unknown"` for the 18 booster, first-stage, interstage and fairing fates. Searched again for a flight-specific statement (Dawn Journal of 12 and 30 Sep 2007, Dawn and Kepler press kits, NSSDCA, the NEAR Federal Register notice, NASA SP-2005-4536, NASA's Kepler launch page): none says where these pieces fell. The Dawn Journal of 30 Sep only mentions "a restricted zone in the waters east of the launch site". The only NASA statement is the vehicle-level one in the MER FEIS.
- NEAR `parking` `t` 600: now backed by NASA SP-2005-4536 ("10 minutes after launch", mission plan) and by the APL figure (15:53 minus 15:43). Minute resolution.
- NEAR `left` stays empty. NASA SP-2005-4536 confirms that the spacecraft itself released two weighted yo-yo cables after leaving the third stage and that they "flew away", but no source says where they are (physically they left Earth with the spacecraft). Candidate for the integrator, with `where` unknown or left out.
- Kepler and Dawn values that exist only in the ULA booklets were kept: they were read in the booklets and they agree with every rounder figure in the NASA press kits. The checker did not search for a NASA-hosted copy of the two booklets; the only copies opened are on ulalaunch.com.
- Step ids `stage1` and `stage2` (the sibling file uses `meco` and `injection`). No comparison on step ids was found in `src/js/65-launch.js`, so this is cosmetic.

### Still unverified, or for the integrator to decide

1. The 18 `unknown` fates. `65-launch.js` renders `unknown` as "nobody knows where it ended up" / "no se sabe dónde terminó", which overstates the doubt: what is missing is only a flight-specific sentence. `delta2_mars.json` uses `ocean` for the same parts on the strength of general NASA statements. Pick one reading for the seven Delta II flights. If the vehicle-level statement is accepted, switch all 18 (fairing halves included, the FEIS names the fairing too) to `ocean`; the fate sentences already read correctly under either label.
2. Catalogue-only facts (CelesTrak mirror of the U.S. catalogue, not NASA): Dawn second-stage re-entry on 18 Sep 2009; Kepler second stage still in Earth orbit on 15 Nov 2026; NEAR and Kepler third stages in solar orbit; NEAR second-stage re-entry date (17 Jan 1998, not in the JSON). The texts attribute them to the catalogue. `burned` renders as "burned up coming back into the air"; the catalogue records the decay, not whether everything burned up.
3. All Dawn and Kepler times are planned values. NEAR's 600 s and 122 km are plan values too.
4. NEAR has `t: null` on six steps. `lxTimes` in `65-launch.js` will invent times for them under the caption "Times are real": T+2:00, 4:00, 6:00 and 8:00 for the booster, first-stage and fairing steps (linear interpolation between 0 and 600 s) and T+11:30 and T+13:00 for `stage2` and `separation` (previous step plus 90 s). The real injection began about 23 minutes after launch (NASA SP-2005-4536: 10 + 13 minutes; APL figure: 22 minutes) and separation came after minute 26. Hide the clock on null steps, or accept an approximate value for `stage2` (about 1,380 s) knowingly.
5. `heightM` 39.6 against "more than 38 m" (item 1 of the corrections); `delta7925_10L.heightM` is null because no NASA document gives it.
6. `delta7925.firstYear` and `delta7925_10L.firstYear` are null (item 2 of the corrections).
7. The NEAR launch press kit (February 1996) was not found by the checker either: two web searches did not surface it, a guessed NSSDCA address (https://nssdc.gsfc.nasa.gov/planetary/text/near_pk.txt) answers 404 and an archived Goddard release (96-004h) came back empty. NSSDCA's NEAR page used to link an FTP copy at NASA Headquarters.
8. NEAR `liftoff` cites the NSSDCA trajectory page for the time; that the destination is the asteroid Eros was read in the APL paper (https://secwww.jhuapl.edu/techdigest/Content/techdigest/pdf/V23-N01/23-01-Dunham.pdf) and in NASA SP-2005-4536, not re-read on the NSSDCA page.
9. NEAR second stage: the step text and the fate sentence state the re-entry as a fact. NASA's notice only gives the plan; that it happened (17 Jan 1998) is catalogue-only.
10. Kepler: six `t` values (66, 271.3, 281, 596, 3296.8, 3708.8) and four `alt_km` values (18.1, 57, 135.4, 721.5) exist only in the ULA booklet on ulalaunch.com; the NASA press kit gives rounder figures that agree with them (63.1 s, 65.5 s, 131.5 s, 4.7 minutes, just under 10 minutes, 185 km).
11. Date convention: the Kepler texts say the night of 6 March 2009 (Florida time); the site table lists the same instant as 7 March 03:49 UTC.
12. Dawn's press kit calls the vehicle "Delta II Heavy 2925H-9.5"; the Dawn Journal and ULA say 7925H-9.5 (key `delta7925H` kept).
13. The interstage staying with the first stage rests on the ULA Payload Planners Guide only.
14. Not re-opened by the checker because nothing in the JSON depends on it: the OCO-2 blog used for the "about 39 m" estimate of the 7925-10L.
