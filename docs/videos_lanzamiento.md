# Launch videos for 14 missions: NASA Image and Video Library

Checked 15 Nov 2026 against `images-api.nasa.gov` (`/search`, `/asset`, `/metadata`). No video file was downloaded.
- Sizes are `Content-Length` values from HTTP HEAD requests on `images-assets.nasa.gov`.
- Liftoff offsets come from each item's caption file (`.vtt`/`.srt`, plain text).
- For the Apollo 70 mm clip, the offset was estimated from its five JPEG thumbnail frames.

## Summary

**Verified real launch footage: 5 of 14.** Apollo 11, Phoenix, Dawn, Kepler and Mars 2020.

**No match found in the library: 9 of 14.** Surveyor 1, Pioneer 10, Pioneer 11, Viking 1, NEAR Shoemaker, Mars Pathfinder, Spirit (MER-A), Opportunity (MER-B) and InSight.

## Table

| Mission | nasa_id | Exact title | date_created | Center | Real or animation | Duration | Liftoff offset | Smallest MP4 (bytes) | Other small renditions (bytes) |
|---|---|---|---|---|---|---|---|---|---|
| Surveyor 1 (1966) | none found | - | - | - | - | - | - | - | - |
| **Apollo 11 (1969), primary** | `KSC_69-71212-sRGB` | KSC_69-71212-sRGB | 2020-02-06 (upload date) | MSFC | **Real**: 70 mm film transfer, square 1812x1812, 24 fps, no audio track (TrackVolume 0%) | 1:24 (metadata) | Not stated. Estimated from thumbnails: on the pad at about 0:42, ignition at about 0:56, clearing the tower at about 1:10. Verify after download. | `~mobile.mp4` **3,125,507** | `~preview.mp4` 6,221,065; `~small.mp4` 15,526,635; `~medium.mp4` 22,990,743 |
| Apollo 11, alternate | `Apollo_11_Intro_720p` | Apollo_11_Intro_720p | 2017-08-03 | HQ | **Real** 1969 footage, edited as a mission montage with a music bed. Only about the first 28 s are launch. | 2:17 (metadata) | Countdown "T-minus 15" at 0:05.7, "3, 2, 1, 0" at 0:17.6–0:21.7, "We have a lift-off" at 0:23.6–0:28.4. The montage cuts to landing audio at about 0:28. | `~mobile.mp4` **6,013,451** | `~preview.mp4` 11,285,436; `~small.mp4` 26,818,375 |
| Pioneer 10 (1972) | none found | - | - | - | - | - | - | - | - |
| Pioneer 11 (1973) | none found | - | - | - | - | - | - | - | - |
| Viking 1 (1975) | none found | - | - | - | - | - | - | - | - |
| NEAR Shoemaker (1996) | none found | - | - | - | - | - | - | - | - |
| Mars Pathfinder (1996) | none found | - | - | - | - | - | - | - | - |
| Spirit / MER-A (2003) | none found | - | - | - | - | - | - | - | - |
| Opportunity / MER-B (2003) | none found | - | - | - | - | - | - | - | - |
| **Phoenix (2007)** | `ksc_080407_phx_launch` | KSC-07-S-00067 | 2007-08-04 | KSC | **Real** launch footage with NASA commentary (George Diller) | about 1:30 (from captions) | Count from 0:00. Caption "...two, one, zero and liftoff" falls in the 0:08–0:15 cue. A clip of about 0:00–0:35 works. | `~orig.mp4` **1,679,592** (the original is smaller than the mobile file; there is no `~small`) | `~mobile.mp4` 3,998,351; `~preview.mp4` 4,648,512 |
| **Dawn (2007)** | `ksc_092707_dawn_launch` | KSC-07-S-00092 | 2007-09-27 | KSC | **Real** launch footage with NASA commentary | about 1:41 (from captions) | "Ten, nine..." at 0:04. "Zero and liftoff of the Delta II rocket with Dawn" in the 0:12–0:19 cue, so liftoff is at about 0:12–0:14. A clip of about 0:02–0:40 works. | `~mobile.mp4` **4,338,893** | `~preview.mp4` 8,139,602; `~orig.mp4` 13,993,592; `~small.mp4` 19,507,007 |
| **Kepler (2009)** | `ksc_030609_kep_launch` | KSC-09-S-00026 | 2009-03-07 | KSC | **Real** launch footage with NASA commentary | about 1:30 (from captions) | "T-10" at 0:01, "Engine start" at 0:09, "zero" at 0:12, "and liftoff of the Delta II rocket" at 0:12–0:14. A clip of about 0:00–0:40 works. | `~mobile.mp4` **3,864,279** | `~preview.mp4` 7,238,459; `~orig.mp4` 12,275,107; `~small.mp4` 17,322,683 |
| InSight (2018) | none found | - | - | - | - | - | - | - | - |
| **Mars 2020 (2020), primary** | `JPL-20200730-M2020f-0003-NASA’s Perseverance Rover Launches` (curly apostrophe and spaces; URL-encode it) | NASA's Perseverance Rover Launches to Mars | 2020-07-30 | JPL | **Real** launch footage in an edited highlight package (announcer, "dramatic music", control-room audio). It is not one continuous shot, and the later part (separation, signal acquisition) may not be launch imagery. | 1:11 (metadata) | Announcer "And lift off" at 0:10.8–0:12.9; "rocket engine roaring" with music at 0:20.4–0:25.2. A clip of about 0:00–0:30 works. | `~mobile.mp4` **3,039,877** | `~preview.mp4` 5,644,482; `~small.mp4` 13,135,484; `~medium.mp4` 19,496,272 |
| Mars 2020, alternate | `KSC-20200730-VP-MMS01-0001-Mars_2020_Live_Launch_Coverage_ISO_Broll_String-3254502` | Mars 2020 Live Launch Coverage - ISO B-roll String | 2020-07-30 | KSC | **Real** isolated-camera launch B-roll from the broadcast, no music package. Long. | not stated (no captions) | not stated | `~mobile.mp4` **66,296,460** | `~preview.mp4` 124,822,944; `~small.mp4` 299,301,359 |

### Full URLs of the smallest renditions

- **Apollo 11, primary:** https://images-assets.nasa.gov/video/KSC_69-71212-sRGB/KSC_69-71212-sRGB~mobile.mp4 (3,125,507)
- **Apollo 11, alternate:** https://images-assets.nasa.gov/video/Apollo_11_Intro_720p/Apollo_11_Intro_720p~mobile.mp4 (6,013,451)
  - `Apollo_11_Introduction_720p` is a byte-identical duplicate: every rendition has the same size.
- **Phoenix:**
  - https://images-assets.nasa.gov/video/ksc_080407_phx_launch/ksc_080407_phx_launch~orig.mp4 (1,679,592)
  - https://images-assets.nasa.gov/video/ksc_080407_phx_launch/ksc_080407_phx_launch~mobile.mp4 (3,998,351)
- **Dawn:** https://images-assets.nasa.gov/video/ksc_092707_dawn_launch/ksc_092707_dawn_launch~mobile.mp4 (4,338,893)
- **Kepler:** https://images-assets.nasa.gov/video/ksc_030609_kep_launch/ksc_030609_kep_launch~mobile.mp4 (3,864,279)
- **Mars 2020, primary:** each URL is percent-encoded and was HEAD-checked (200, video/mp4).
  - https://images-assets.nasa.gov/video/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches~mobile.mp4 (3,039,877)
  - https://images-assets.nasa.gov/video/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches~preview.mp4 (5,644,482)
  - https://images-assets.nasa.gov/video/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches/JPL-20200730-M2020f-0003-NASA%E2%80%99s%20Perseverance%20Rover%20Launches~small.mp4 (13,135,484)
- **Mars 2020, alternate:** https://images-assets.nasa.gov/video/KSC-20200730-VP-MMS01-0001-Mars_2020_Live_Launch_Coverage_ISO_Broll_String-3254502/KSC-20200730-VP-MMS01-0001-Mars_2020_Live_Launch_Coverage_ISO_Broll_String-3254502~mobile.mp4 (66,296,460)

## Description text proving each launch

- **Apollo 11, `KSC_69-71212-sRGB`:** the description reads "Apollo 11 launch transfer from 70mm". The keywords are Apollo, 11, launch, transfer, 70mm.
  - The thumbnails show a film-leader "HEAD" card, then the Saturn V on the pad with its service structure, then ignition, then the vehicle rising past the tower.
  - The description is only one phrase. The tie to Apollo 11 rests on it and on the KSC 69- film number.
- **Apollo 11, `Apollo_11_Intro_720p`:** the montage covers the mission "from liftoff in Florida to departure from the moon". The captions read "We have a lift-off, lift-off on Apollo 11."
- **Phoenix:** "The Mars Phoenix Lander lifted off aboard a Delta II rocket." The captions read "zero and liftoff of the Delta II rocket with Phoenix".
- **Dawn:** "The Delta II Heavy rocket roars skyward carrying the Dawn spacecraft." (Delta II Heavy is the 7925H.) The captions read "liftoff of the Delta II rocket with Dawn".
- **Kepler:** "NASA's Kepler spacecraft heads for space atop a Delta II rocket to search for Earth-like planets." The captions read "liftoff of the Delta II rocket with Kepler".
- **Mars 2020, JPL clip:** "NASA's Perseverance Rover began its long journey to Mars today by successfully launching from Cape Canaveral Air Force Station on a ULA Atlas V rocket." It also notes that Ingenuity flies with it.
- **Mars 2020, KSC B-roll:** "Live coverage of the Mars 2020 Perseverance rover launch from NASA's Kennedy Space Center and Cape Canaveral Air Force Station in Florida."

## Usage and credit

NASA media is generally not subject to copyright in the US. Use of the NASA name, insignia or logos implies no endorsement. Credits as the metadata states them:

| Clip | Credit in metadata | Caveat |
|---|---|---|
| `KSC_69-71212-sRGB` | Photographer "James Bilbrey", MSFC | Archival NASA film. Credit "NASA/MSFC". |
| `Apollo_11_Intro_720p` | "NASA" (HQ) | **Music bed**: the captions mark "[ MUSIC ]" over 0:00.6–0:05.7, and it may continue under the countdown. HQ montage music can be licensed separately. Mute the clip or replace the audio. |
| Phoenix, Dawn, Kepler (KSC-07/09-S series) | "NASA or National Aeronautics and Space Administration" | KSC webcast clips with NASA commentator audio. No third-party credit stated. |
| Mars 2020 JPL clip | "Credit: NASA/JPL-Caltech" | **Music**: the captions mark "(dramatic music)" at 0:20 and 0:51. It is an edited package, and its music may be stock or licensed. Mute it or use the KSC B-roll. The Atlas V launch camera views may originate from ULA; the metadata does not say. |
| Mars 2020 KSC B-roll | "NASA/Michelle Stone" | Broadcast ISO cameras. Some views may be ULA-provided; not stated. |

## Notes

- **Animation not used.** `ksc_092707_dawn_lanim` (KSC-07-S-00090) is "an animation of the Delta II Heavy's liftoff sequence" narrated by George Diller. The real Dawn launch clip exists, so the animation is not needed.
- **Unverified leads, not substitutes.** These mention or may contain earlier launches, but none of them states that its picture shows a specific launch among the 14:
  - `ksc_071707_delta_history` (KSC-07-S-00068, Delta II family history since 1960)
  - `ksc_122104_spirit_anniv` (KSC-04-S-00404, Spirit's first year on Mars; the text describes surface operations, not the launch)
  - `ksc_020105_why_jpl` (KSC-05-S-00036, JPL history feature)
  - `ksc_112904_why_kennedy` (KSC-04-S-00378, KSC history feature)
  - `HD 049 Mercury_Gemini_Apollo_Resource Reel 1` (silent hour-long resource reel)
- **Long Apollo 11 sources, if more footage is needed.** These are real but large; the offsets come from their descriptions.
  - `KSC-19690716-MH-NAS01-0001-Apollo_11_Launch_President_Johnson_Jack_King_Narration_Press_Site-B_1372`, "Video - Apollo 11 Pre-Launch and Launch": mobile 154,521,219 bytes; liftoff offset not stated.
  - `KSC-19690716-MH-NAS01-0001-Apollo_11_Breakfast_C7Exit_Convoy_WhiteRmHatchClosing_Launch-HM_0083`, "Apollo 11 Activities": "launch count and launch" at the end; mobile 117,630,043 bytes.
  - `KSC-19690716-MH-NAS01-0001-Apollo_11_Historical_Footage_and_Broll-DVC_1560`, 25th Anniversary B-roll: "Cut 2 - Launch (08:02)" starts after the 08:03 Cut 1, so at about 8:03; mobile 102,105,235 bytes.
- **How the nine "none found" results were reached.**
  - Keyword searches, `media_type=video`:
    - surveyor, surveyor 1 launch, surveyor moon, atlas centaur, centaur, titan, titan centaur
    - pioneer, pioneer 10, pioneer 11, pioneer jupiter, pioneer saturn
    - viking, viking 1 launch, viking mars 1975
    - NEAR shoemaker, NEAR launch, near earth asteroid rendezvous launch, eros
    - mars pathfinder, pathfinder sojourner, pathfinder delta, pathfinder 1996
    - mars exploration rover(s), MER launch, MER-A launch, MER-B, spirit rover launch, spirit opportunity, opportunity launch, opportunity delta
    - insight, insight launch, mars insight, insight atlas, insight vandenberg, mars cube one, vandenberg atlas
    - delta II launch, delta, mars rover launch
  - Full-result scans of the "insight", "pathfinder", "delta" and "apollo 11" result sets, filtering each title and description for launch, liftoff, Vandenberg and mission names.
  - Year-filtered searches. These filter on `date_created`, which is often the upload date rather than the event date, so they count only as supporting evidence.
  - Patterns in what came back:
    - "Pathfinder" hits are SLS core-stage and booster pathfinders.
    - "InSight" hits are science features, plus the 2005 MRO launch (`ksc_081205_mro_launch`, which is not InSight).
    - The KSC-era webcast clips start in 2004, which explains why the 2003 MER launches are missing.
- **Quick check outside the Image and Video Library, InSight only.** No direct NASA-hosted MP4 was found.
  - "NASA Launches InSight to Mars (Part 1) - May 5, 2018" (https://mars.nasa.gov/resources/22062/nasa-launches-insight-to-mars-part-1-may-5-2018) and its Part 2 page on science.nasa.gov are recordings of the NASA TV broadcast that shows the launch. They only embed YouTube (Part 1: youtube.com/embed/O4_JNAFClFk; Part 2: youtube.com/embed/YsFJScdGRVc), so they are leads, not results.
  - "InSight Launch From Distance" (PIA22541, credit NASA/JPL-Caltech/Photo Ben Smegelsky) and "InSight Off the Pad" (credit NASA/Bill Ingalls) are still photos of the real liftoff. They could stand in for a clip.
  - The JPL InSight launch press kit points to JPL Raw Vimeo for video. That was not checked.
  - The MER, Pathfinder, NEAR, Viking, Pioneer and Surveyor launches were not searched outside the library.
- **Date reminder.** The library's `date_created` for archival Apollo items is set either to the event date (1969-07-16) or to the upload date (2020-02-06 for the 70 mm clip). Neither changes which launch is shown.
