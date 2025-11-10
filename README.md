# ZimDocs Pro Premium v2.1

Offline resume & document studio PWA with enhanced gradient glass UI, real open-source fonts, Tailwind CSS build process, and full offline caching.

## Features
- Resume builder, PDF/DOCX export
- Passport photo tool
- Signature tool
- File manager & offline storage
- English + Shona language toggle
- Enhanced gradient glass UI with animations
- Fully offline PWA (service worker + IndexedDB)
- Tailwind CSS v3.4 build included
- GitHub Actions auto-deploy to Pages

## Setup
1. Replace placeholder fonts in `src/assets/fonts` with real `.woff2` files for Inter, Poppins, and Noto Sans Shona.
2. `npm install`
3. `npm run dev` (local development)
4. `npm run build` (production build)
5. Push to `main` branch of repo `ZimDocs-Pro` for GitHub Pages deployment

## Notes
- Tailwind CSS is configured with glass gradient cards and neon-glow shadows.
- Offline caching and service worker are pre-configured.
