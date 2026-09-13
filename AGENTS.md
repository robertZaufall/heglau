# Heglau maintenance guide

## Scope and architecture

Heglau is a static German-language village website. Keep the README focused on the project and visitor experience; maintain technical instructions in this file. The reusable production workflow is in [skills/illustrated-scroll-site/SKILL.md](skills/illustrated-scroll-site/SKILL.md).

The site uses plain HTML, CSS, and JavaScript. GitHub Pages hosts the static build, available at `https://glaubi.net/heglau/`. Domain routing is maintained in the separate local project `../heglau-proxy`.

| Path | Responsibility |
| --- | --- |
| `index.html` | German content, chapter structure, navigation, and dialogs |
| `src/styles.css` | Visual design, responsive layouts, and motion states |
| `src/main.js` | Scroll state, media loading, video controls, and interactions |
| `src/timeline.js` | Camera interpolation and bounded video time mapping |
| `public/` | Optimized media, fonts, favicon, and license notices |
| `scripts/build.mjs` | Static output and source URL versioning |
| `scripts/server.mjs` | Local development and production preview server |
| `scripts/encode-video.sh` | Heglau-specific video encoding and color correction |
| `tests/` | Site assets, local resource boundaries, and timeline behavior |
| `docs/` | Content sources, design decisions, prompts, and verification records |

## Development and validation

Use Node.js 20 or later; the Pages workflow runs Node.js 22. No dependency installation is required for development, tests, or the site build.

```sh
npm run dev
npm test
npm run build
npm run preview
```

Both servers bind to `127.0.0.1:4173`. Run one at a time, or use `PORT=4174 npm run preview` for a separate production preview. Inspect existing listeners before starting another process. Stop task-created servers when checks are complete unless the user asks to keep one running.

Run `npm test`, `npm run build`, and `git diff --check` for application changes. For documentation-only edits, check Markdown links, command accuracy, and whitespace. Do not add dependencies or tests solely to validate prose.

For visual or interaction changes, inspect desktop and phone layouts, a small phone, and a short landscape viewport. Check chapter navigation, forward and reverse scrolling, dialog focus, overflow, media failure, and reduced motion. Distinguish browser emulation from actual Windows or iPhone testing in verification notes.

## Build boundaries

`scripts/build.mjs` copies only the page, `src/`, and `public/` into `dist/`, and adds `.nojekyll`. It gives JavaScript, relative module imports, and stylesheet URLs a shared source revision to avoid mixed cached versions.

Keep runtime asset paths relative so the same build works under `/heglau/`. Do not publish the repository root. Documentation, media masters, environment files, and local deployment configuration must stay outside the public build. `dist/` is generated and ignored by Git.

## Video and accessibility

- Map normalized scroll progress to paused video time, bounded below the film's duration. Keep only the latest requested seek while the decoder is busy.
- Retain the exact first-frame poster while loading. Reveal video after decoded-frame readiness; do not depend exclusively on `requestVideoFrameCallback` or hide a video with `display: none` while waiting for that callback.
- Read the system reduced-motion preference before fetching the movie. An initially paused state must show the play icon, explanation, and **Animation einschalten** control immediately. The manual choice overrides the system preference for the current visit.
- Keep a readable illustrated fallback when media cannot load. Preserve Blob URLs across back/forward-cache restores and release them when the document is discarded.
- Fit the complete landscape frame on phones and reserve space for the tallest chapter copy. Short viewports expand the journey height and scroll through the text and scene. Recalculate chapter offsets after applying that layout, and preserve safe-area handling and stable viewport measurements.

## Media and content

Optimized delivery media belongs in `public/assets/`. Keep the accepted PNG originals in ignored `output/imagegen/` and the source movie in `output/video/` for media regeneration. Remove temporary browser captures, build output, and tooling caches after use.

To regenerate the desktop video, smaller mobile encode, and first-frame WebP poster, install FFmpeg and cwebp, then run:

```sh
bash scripts/encode-video.sh /path/to/source.mp4
```

Without an argument, the wrapper uses `output/video/heglau-grok-refined.mp4`. Its color correction is specific to that accepted source. Reassess the correction for replacement footage rather than applying it blindly. The shared helper is in `skills/illustrated-scroll-site/scripts/encode-journey.sh`.

Keep visitor-facing copy in German. Verify changing business information against primary sources, retain dates on population figures, and record source updates in [docs/content-sources.md](docs/content-sources.md). Generated scenes are illustrations, not surveyed reconstructions. Preserve the existing text attribution and software/font license notices.

## GitHub Pages

The repository is `robertZaufall/heglau`, with deployment from `master`. The [Pages workflow](.github/workflows/static.yml) tests, builds, and uploads only `dist/` on pushes to `master` or manual dispatch. Pages must use GitHub Actions as its build source.

When publication is requested or already authorized, stage only intended changes, commit, pull with rebase, and push. Wait for the workflow for that commit to succeed and verify local HEAD, `origin/master`, and the remote branch agree. Check the public page and compare changed assets with the local build.
