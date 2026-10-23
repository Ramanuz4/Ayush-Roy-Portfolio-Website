# Portfolio Website Template — Editing Guide

A static HTML/CSS/JavaScript portfolio template. The existing layout, styling, responsive behavior, and page structure have been preserved. Personal details and project-specific assets have been replaced with placeholders.

## Main folders
- `index.html` — homepage and tile layout.
- `pages/portfolio.html` — project cards.
- `pages/games/` — individual project detail pages (ProjectOne through ProjectFour).
- `assets/images/placeholders/` — neutral profile, project, and logo placeholders. Replace these with your own assets.
- `assets/resume/Ayush-Roy-Resume.pdf` — the résumé PDF displayed on the Resume page.
- `css/site.css`, `css/content.css`, `css/game.css` — styling.
- `js/site.js`, `js/game.js` — shared scripts.

## Personalize the template
1. Personal details and contact information are based on Ayush Roy’s supplied visual CV. Update project details as new work is added.
2. Update social links to your own accounts.
3. Edit the project titles, descriptions, metadata, and features in `pages/portfolio.html` and each page under `pages/games/`.
4. Replace placeholder SVGs in `assets/images/placeholders/` with your own photos, logos, and project artwork, updating the image paths if needed.
5. The Resume page currently embeds `assets/resume/Ayush-Roy-Resume.pdf` and includes open/download links. Replace that PDF to update the résumé.

## Run locally
Open `index.html` in a browser or use VS Code Live Server. This is a static website and requires no build step.
