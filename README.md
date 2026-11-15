# Still There (Siguen ahí)

NASA Space Apps Challenge 2026, Salta (Argentina). Challenge: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*.

**Still There: NASA's missions across time.** Fourteen machines that NASA left on the Moon, on Mars and beyond, each told as a mission you can fly through in 3D. All fourteen show the launch and where the machine is today; ten also show the journey in between.

**Live site:** https://ginomoretta-creator.github.io/siguen-ahi/ (the language follows your browser; add `?lang=en` or `?lang=es` to force one).

Mirror: https://claude.ai/artifact/KrPXM6Gs7519FPneE5Ftce

Spanish version of this file: [README.es.md](README.es.md).

## What you can do

- **Start page.** Fourteen cards with a real NASA photo and one line in the machine's own voice, plus a timeline where each row is a life: the trip, the working years and the silence.
- **Launch in 3D.** Each mission starts on its pad with its own rocket. Every step waits for the reader: liftoff, booster separation, staging, fairing, final burn, spacecraft separation. You can turn the scene and zoom at any moment. A panel tells **what happened to each discarded part**: which ones fell into the ocean, which burned up, which are still in orbit around the Sun, which hit the Moon or Mars. Every fact has its source link.
- **Journey.** The spacecraft follows its real trajectory (JPL Horizons vectors) through a solar system drawn at true scale.
- **Arrival and today.** Before showing the machine, the site asks one question about what it discovered. Then you can tap its parts on the model, see real NASA photos, listen to real audio, watch the real launch video and read what else the mission left behind (cruise stage, heat shield, parachute).
- **Explore.** A single continuous space, from the whole solar system down to the ground next to each machine, with every machine in its place today.
- **Live numbers.** How far each machine is right now and how long a radio signal takes to reach it, computed from Horizons tables and your clock.

Spanish and English. The language follows the browser; `?lang=en` or `?lang=es` in the address forces one.

## How real it is

- **Rockets.** Delta II and Atlas V are NASA's own 3D models (NASA VTAD, science.nasa.gov), already split into stages, fairing halves and boosters. Saturn V, Titan IIIE-Centaur and Atlas-Centaur have no official model that separates by stage, so they are built in code with real dimensions.
- **Spacecraft.** NASA 3D models for the Spirit and Opportunity rovers, InSight, Viking 1, Ingenuity, the Apollo lunar module, Pioneer 10 and 11, NEAR Shoemaker, Dawn and Kepler. Surveyor 1, Phoenix and Mars Pathfinder with Sojourner are simplified models built in code.
- **Times and fates.** T+ times and the fate of every stage come from NASA and manufacturer press kits and flight reports. Where we could not find the real time of a step, the clock is not shown.
- **What is missing.** Apollo 11, Viking 1, InSight and Ingenuity show the launch and the machine today, with no journey in between.
- **What is illustrative.** The climb profile of the launch (height and pitch), the Mars entry and the descents are animations, not flight telemetry. The site says so on screen.

Every adaptation we made to a NASA model is listed in [SOURCES.md](SOURCES.md). The NASA rocket models came with the NASA insignia, a flag and another mission's patch painted on them; we covered those.

## Run it

Python 3 only, no extra packages.

```bash
python -I tools/build.py
python -I tools/devserver.py
```

Then open `http://localhost:5188/dist/preview.html`.

Other tools:

- `tools/horizons.py`: downloads JPL Horizons tables into `data/horizons/` (only needed to add missions).
- `tools/decode.html`: decodes Draco-compressed NASA models (open it with the dev server running).
- `tools/pack_model.py`: shrinks the textures of a NASA `.glb` and stores it for the build (needs Pillow).
- `tools/merge_stages.py`: merges the launch research in `docs/etapas/*.json` into `src/js/66-stages-data.js` and checks it against the 3D parts.

## Structure

The site is plain JavaScript with three.js r128, no bundler. `tools/build.py` joins `src/js/*.js` in file-name order into `src/page.html`.

| File | What it holds |
|---|---|
| `src/page.html` | Page shell, Earth globe, mission list |
| `src/js/10-astro.js` | Time, reference frames, Horizons interpolation |
| `src/js/20-space.js` | Space scene at true scale (1 unit = 1,000 km, floating origin) |
| `src/js/30-surface.js` | Surfaces (Moon, Mars, Eros) and hand-built models |
| `src/js/40-journey.js` | The mission journey: chapters, camera, data panel |
| `src/js/45-learn-data.js`, `47-extra-data.js` | Question, discovery and parts of each machine (ES and EN) |
| `src/js/50-learn.js` | The "today" card, part markers, credits |
| `src/js/55-live.js`, `56-video.js` | Live distances; real launch videos |
| `src/js/60-explore.js` | Continuous-zoom exploration |
| `src/js/62-rockets.js` | Rockets built in code (Saturn V, Titan IIIE, Atlas-Centaur) |
| `src/js/63-nasa-rockets.js` | Delta II and Atlas V from NASA models, split into parts |
| `src/js/65-launch.js` | The 3D launch scene: staging, exhaust, smoke, sky, fates panel |
| `src/js/66-stages-data.js` | Launch steps and the fate of every part (generated) |
| `src/js/69-home-data.js`, `70-home.js` | Start page: cards and timeline |
| `assets/` | NASA maps, models, photos, audio and video |
| `data/horizons/` | JPL Horizons tables |
| `docs/etapas/` | Research notes and sources for every launch |

## Sources, AI use and license

- Data, maps, models, photos, audio and video: [SOURCES.md](SOURCES.md) (Spanish original: `FUENTES.md`).
- Use of artificial intelligence: [AI_USE.md](AI_USE.md). The site gives the short version in its Credits dialog.
- Code: Apache License 2.0, see [LICENSE](LICENSE). NASA material keeps NASA's own usage terms and is credited on the site and in SOURCES.md.

This project was made at the NASA Space Apps hackathon. NASA does not sponsor or endorse it.
