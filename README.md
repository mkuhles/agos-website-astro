# AGOS Website (Astro)

This repo contains the website for Aikido Gemeinschaft Oder-Spree built with Astro.

## Quickstart

Install and run locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure (high level)

Important folders:

```
public/                 # static assets (images, icons, manifest)
src/
	components/           # reusable components
		DojoGallery/        # DojoGallery component (Astro + JS + styles)
	pages/                 # routes (e.g. src/pages/dojos/[dojo].astro)
	layouts/               # layout components (Header, Footer, BaseLayout)
	scss/                  # global styles and variables
	scripts/               # shared client scripts
content/                 # markdown/frontmatter content for dojos, trainer, etc.
```

## DojoGallery component

- Location: `src/components/DojoGallery/`
- Files:
	- `DojoGallery.astro` — Astro component, accepts props `images` (array of URLs) and `dojoName`.
	- `dojo-gallery.js` — per-instance client script that initializes slider + lightbox for each `[data-dojo-gallery]` container.
	- `DojoGallery.scss` (optional) or `styles.js` — component styles (this project currently uses the JS styles module).

Usage (example in `src/pages/dojos/[dojo].astro`):

```astro
import DojoGallery from '../../components/DojoGallery/DojoGallery.astro';

<DojoGallery images={dojoImages} dojoName={dojo.data.name} />
```

Notes:
- Images for a dojo are read from `public/assets/dojos/<slug>/` and passed to the component server-side.
- The client script is loaded once in `src/layouts/BaseLayout.astro` as an ESM module.

## Development notes

- Styling: the project uses SCSS for global styles (`src/scss/`). Component styles may be inlined or placed alongside components.
- Scripts: client modules live under `src/components/...` for component-scoped behaviour and are imported from `BaseLayout`.
- Content: Dojo pages are generated from `src/content/dojos/*.md` files (frontmatter provides metadata).

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Build production site |
| `npm run preview` | Preview the build locally |

## If something breaks

- Run `npm run build` to see build-time errors.
- Check the console in the browser for client-side errors (scripts/styles).
- Ask me to run checks or tidy up component locations/styles.

---
If you want, I can also:
- convert the component styles to `DojoGallery.scss` and import them, or
- add a short `src/components/README.md` listing available components.

