# GreenGo

## Timetable-to-classroom direction

The prototype now starts with a manually entered class and links its date/time/building to commute and weather inputs. A staged arrival card includes the station/gate, building, and user-supplied floor/room notes. There is no university account integration, verified room directory or indoor turn-by-turn routing. Class entries stay in memory unless local browser storage is explicitly selected, and can be cleared. Research materials in `research/week5/` frame cross-tool fragmentation as a hypothesis to investigate, not an established finding.

## Map and weather

`dist/context.js` adds a Leaflet/OpenStreetMap map, approximate area/building points, manual or map-click origin selection, UK commute dates and hourly Open-Meteo forecasts. Map marker coordinates are illustrative and must be verified against actual building entrances. No routing or accessibility verification is implied. Weather queries send the selected coordinate to Open-Meteo only when requested; no device location is read. Forecasts cover today through six days ahead, use UNIX timestamps converted with Europe/London for DST, and are cleared when the location, date or class time changes. The planner still uses simulated journey times and timetables, explicitly labelled separately from forecast data.

## Cloudflare backend

`wrangler.jsonc` serves `dist/` plus `backend/worker.mjs` on the existing Worker. Keep the Cloudflare Git build command `npx wrangler deploy`, root `/`. Pushes to main trigger Cloudflare's Git integration separately from GitHub Pages.

Add runtime Secrets `TFWM_APP_ID` and `TFWM_APP_KEY` to the existing Worker. Never put them in build variables or static assets. `/api/health` reports configuration presence only. `/api/stops?q=Selly%20Oak` and `/api/arrivals?stopId=...` proxy the TfWM provider via HTTPS with validation, timeouts and short caching. CORS is not authentication: public endpoints consume provider quota and need production abuse monitoring/rate controls before broad use.

The bilingual bus panel queries actual provider responses independently of the illustrative journey calculator. Empty predictions are not evidence of normal operation or cancellation. Rail, weather and full multimodal routing remain unconnected.

Run `node --test backend/worker.test.mjs` to test credential redaction, validation and provider responses.

Bilingual campus sustainable travel prototype. Open `dist/versions.html` to choose Chinese or English. No build dependencies are required.

## Scope

- Walking, cycling, bus, train, taxi and combined journey scenarios.
- Departure advice based on class time, a ten-minute pre-class buffer, selected weather, simulated bus/train arrivals, delays, cancellations and connection time.
- Planned integrations: campus maps, weather and change alerts, bus/train schedules and live service status, bike stations and accessible routes.

All routes, service status, carbon values and weekly statistics are illustrative. The prototype has no live transport API, notifications, background weather monitoring, real routing or persistent user accounts. The new departure calculator uses user-entered scenario times; it does not validate geography or actual timetables.

## Local preview

Serve `dist` with any static web server, or open its HTML files locally. Regenerate English content after editing the Chinese source with `node make-english.cjs`. The shared `dist/mobility.js` detects the document language.

## CI/CD

`.github/workflows/ci.yml` checks JavaScript syntax on pushes and pull requests. `.github/workflows/deploy.yml` checks syntax and deploys `dist` to GitHub Pages on pushes to `main` or manual dispatch, using GitHub's short-lived token rather than stored credentials.

After repository creation, enable Settings → Pages → Source → GitHub Actions. Pages availability for a private repository depends on the GitHub plan. Repository creation, push, Pages settings and a successful Actions run must be verified before claiming deployment. This workflow deploys GitHub Pages; it does not update the existing ChatGPT Sites URL.
