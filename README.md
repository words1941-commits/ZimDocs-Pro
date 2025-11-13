ZimDocs-Pro (Legacy Technology Edition) — v3
-------------------------------------------

This package includes:
 - /docs  : prebuilt static site (upload to GitHub Pages as /docs)
 - /src   : React + Vite source skeleton (for future development)
 - manifest.json, service-worker.js, icons

How to deploy to GitHub Pages quickly:
 1. Upload the contents of the `/docs` folder to your repository's `/docs` directory (or copy the whole repo and set Pages source to `/docs`).
 2. In repository Settings -> Pages set "Source" to `main` branch and folder `/docs`.
 3. Wait a short moment and visit: https://<your-username>.github.io/ZimDocs-Pro/

Notes:
 - The /docs app is fully offline-capable using a service worker.
 - Resumes, photos, signatures, and generated files are stored in the browser's localStorage.