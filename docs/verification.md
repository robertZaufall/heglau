# Verification

## Automated checks

The website suite contains five tests covering local assets and anchor targets, external resource boundaries, camera continuity in both directions, overscroll bounds, and safe video times. Run `npm test` and `npm run build` for application changes.

The production build contains the page, source modules, stylesheet, optimized media, fonts, license notices, and `.nojekyll`. JavaScript and stylesheet URLs share a source revision.

## Browser review — September 13, 2026

The typography and responsive layout were checked in Chrome at 1440×900, 1600×1000, 1024×768, 768×1024, 390×844, 375×667, 320×568, 844×390, and 667×375. The checks found no horizontal document overflow or header overlap. Short viewports reserve enough height for the chapter copy and complete landscape frame.

- Navigation, chapter jumps, and the mobile menu reach the intended sections.
- Forward and reverse scrolling seek the same continuous video.
- The history and sources dialogs fit phone viewports, support Escape, and return focus to their triggers.
- Smaller captions use at least 12px, secondary text 14px, and body copy 16px. The map caption sits below the map with room for its enlarged labels.
- The video retains its poster while loading and displays decoded frames when `requestVideoFrameCallback` is unavailable.
- Emulated reduced motion keeps the movie source unset on initial load. **Animation einschalten** enables it through an explicit visitor choice.
- The published page was checked at 320px, 390px, and 1440px widths with its video and poster loaded.

These checks used Chrome, including viewport and reduced-motion emulation. The reported Windows session was not inspected remotely, and no physical iPhone/Safari validation is recorded.

## Media

The desktop film is silent H.264 at 1280×720 with a duration of 12.041667 seconds. The 960×540 phone encode retains the complete frame. The WebP poster comes from the delivered film's first frame.

The accepted source is a single continuous camera take. Its backdrop is normalized for blending with the page's ivory background. The source movie and two PNG originals remain local for regeneration; the reproducible encoding command is in [AGENTS.md](../AGENTS.md).

## Publication

The `master` branch of `robertZaufall/heglau` deploys through GitHub Actions to [the public website](https://glaubi.net/heglau/). After the repository was recreated, the workflow branch and Pages build source were corrected; delivered assets were compared with the local build at both the Pages origin and public address. Video range requests returned the requested bytes with status 206.

The typography release at `ab0cc2725e7b4b3bbc96ce94db9e0902defd3938` passed Pages run `34785229759`. Local preview processes and the task's browser session were stopped after review.
