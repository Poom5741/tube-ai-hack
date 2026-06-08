# TUBC AI Hackathon — Sponsor Pitch Site

Vite + React 18 implementation of the TUBC AI Hackathon sponsor pitch deck, deploy-ready for Cloudflare Pages.

Source design: `tubc-ai-hackathon/project/TUBC AI Hackathon.html` (handoff bundle from claude.ai/design).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs dist/
npm run preview  # preview the production build locally
```

## Deploy to Cloudflare Pages

**Option A — Direct upload via wrangler:**

```bash
npm install -g wrangler   # if not already installed
wrangler login
npm run build
wrangler pages deploy dist --project-name tubc-ai-hackathon
```

**Option B — Git-connected Pages project:**

1. Push this repo to GitHub/GitLab.
2. In the Cloudflare dashboard → Pages → "Create a project" → "Connect to Git".
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. Subsequent pushes auto-deploy.

`wrangler.toml` already declares `pages_build_output_dir = "dist"` so either path Just Works.

## Project structure

```
index.html                        # entry HTML — inlines all CSS + canvas constellation script
src/main.jsx                      # React entry point
src/App.jsx                       # composes all sections
src/components/
  effects.jsx                     # Reveal, DecodeText, Counter, Mod, useInView, useTypewriter
  hero.jsx                        # Hero (cinematic intro)
  story.jsx                       # Nav, About, Objective
  program.jsx                     # Format, Journey, IdeaGenerator
  sponsor.jsx                     # Sponsors
  closing.jsx                     # Prizes, Advisors, Contact
vite.config.js
wrangler.toml                     # Cloudflare Pages config
tubc-ai-hackathon/                # original handoff bundle (gitignored, kept for reference)
```

## Notes

- The `IdeaGenerator` and sponsor "generate pitch" buttons call `window.claude.complete()` which only exists inside Claude's design canvas. On Cloudflare Pages these calls throw and fall back to the bundled `FALLBACK_IDEAS` / `BRIEF_FALLBACK` lists — the buttons still work, they just cycle through pre-written content.
- Bracket placeholders (`[Advisor Name]`, `[hello@tubc.example]`, `[@tubc-aihack]`, `[Academic Partner]`, `[Gold Sponsor 1/2] Bounty Track`, `[Silver Sponsor] Prize`) are intentional design signals and ship verbatim. Replace by editing the corresponding component files.
- The 15MB PDF in `tubc-ai-hackathon/project/uploads/` is not bundled — it is gitignored along with the rest of the handoff.
