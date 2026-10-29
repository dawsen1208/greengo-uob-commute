# GreenGo

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
