---
name: illustrated-scroll-site
description: Build source-based editorial websites with generated illustrations and a scroll-controlled video journey. Use for village portraits, destination stories, or similar illustrated landing pages, including mobile fallbacks and optional static publication.
---

# Illustrated Scroll Site

Create a useful website whose content and navigation work independently of its generated camera journey. This workflow was developed while building Heglau; adapt its visual language and chapter structure to each new brief.

## Establish the story

Read the user's source pages, then verify time-sensitive details against the original businesses or institutions. Record source URLs, retrieval dates, dated statistics, and attribution obligations in project documentation. Do not turn an old event announcement into an upcoming event. Generated buildings and landscapes must be described as illustrations when they are not faithful reconstructions.

Choose a small set of narrative beats supported by the content. Heglau used village, history, pottery, cabbage tradition, and visiting; other subjects need their own sequence. Keep practical details, sources, and contact links accessible below or outside the animated section.

## Create and prepare media

Read [media.md](references/media.md) before generation or encoding. Establish palette, materials, light, framing, landmarks, and negative constraints once, then reuse them across supporting images and video.

Use the built-in image tool when available. Only report a specific model when the tool actually exposes or confirms it. An unavailable model selector must not silently become a claim that the requested model was used.

When video is requested and an authorized account is available, Grok Imagine Agent can generate it through the supported browser tools. Confirm the selected result visually before exporting through the browser's supported media mechanism. Keep the accepted source locally and serve optimized files from the website. Do not make generation services a runtime dependency.

For a no-purchase brief, use available account allowances. A purchase or upgrade screen is a stopping point for that generation path; continue with a static illustrated camera fallback or another already-authorized route. Included generation usage is not the same as unlimited free generation.

## Build the journey

Prefer a static HTML/CSS/JavaScript implementation when the brief does not need an application framework. Use local fonts and media with relative paths so the site also works under a subdirectory.

Map normalized chapter scroll progress to paused video time, clamped just below the duration. Keep only the latest requested seek while the decoder is busy. Show the actual first-frame poster until a decoded frame paints; a loading or decoding failure should leave a readable illustrated page.

Do not hide the video with `display: none` while waiting solely for `requestVideoFrameCallback` to reveal it. A rendering path may withhold the callback for a hidden video. Use decoded-frame readiness with a scheduled paint as a fallback, and verify operation when that callback never arrives.

For modest compressed movies, fetching a Blob before assigning the video source avoids reliance on repeated remote range seeks. Account for the full download and memory cost; choose a lighter phone encode or direct streaming for larger media. Preserve Blob URLs across back/forward-cache restores and revoke them only when the document is actually discarded.

Read the system reduced-motion setting before fetching media. Reduced motion should skip the initial movie download, retain navigation and copy, and show a static view. A manual motion toggle should override the system setting for the current visit. For mobile playback use muted, inline video and interaction priming where needed; do not claim iPhone compatibility from Chrome viewport emulation alone.

Make an initially paused state visible immediately, with a play icon, a direct action such as “Animation einschalten,” and a brief explanation when the system preference caused it. A hidden control or pause icon in this state can make the site appear broken.

Reserve space for the tallest chapter copy before fitting media on phones. Contain the full landscape frame unless a separately generated portrait composition exists. Tiny landscape screens may need ordinary vertical flow. Use safe-area offsets and stable viewport units; toolbar-only height changes should not remap an in-progress camera journey.

## Verify and deliver

Run meaningful checks for chapter/asset targets, timeline bounds and reverse motion, then build the production output. Inspect the actual page at desktop, tablet, phone, small phone, and short landscape sizes. Check chapter jumps, dialogs and focus restoration, mobile navigation, overflow, video failure, reduced motion, and forward/reverse seeking. Report which browsers were actually exercised.

Publish only when requested or already authorized. For static hosting with GitHub Pages, read [publication.md](references/publication.md). Finish with the concrete files or verified live URL and state any material remaining limitation. Preserve license notices for reused software while using the project's own branding.
