import { clamp, cameraAt, videoTime } from "./timeline.js";

const journey = document.querySelector(".journey");
const chapters = [...document.querySelectorAll(".chapter")];
const camera = document.querySelector(".world-camera");
const video = document.querySelector(".world-video");
const caption = document.querySelector(".world-caption");
const rail = document.querySelector(".journey-rail");
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const railLinks = [...rail.querySelectorAll("a")];
const motionButton = document.querySelector(".motion-toggle");
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.add("js-world");
let paused = motionQuery.matches;
let explicitPause = null;
let desiredProgress = 0;
let displayedProgress = 0;
let active = -1;
let frame = 0;
let width = innerWidth;
let chapterOffsets = [];
let journeyTop = 0;
let end = 1;
let latestVideoTime = 0;
let blobUrl;
let controller;
let videoReady = false;
let videoLoaded = false;
let interacted = false;

function setMotion(value) {
  paused = value;
  document.documentElement.classList.toggle("no-motion", paused);
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.querySelector(".motion-label").textContent = paused
    ? "Animation einschalten"
    : "Animation pausieren";
  motionButton.toggleAttribute(
    "data-system-paused",
    paused && explicitPause === null && motionQuery.matches,
  );
  motionButton
    .querySelector("svg path")
    .setAttribute("d", paused ? "M6 3l10 7-10 7Z" : "M7 4v12M13 4v12");
  motionButton.title = paused ? "Animation einschalten" : "Animation pausieren";
  motionButton.setAttribute("aria-label", motionButton.title);
  if (paused) {
    video.pause();
    controller?.abort();
  } else loadVideo();
  readScroll();
}

function measure() {
  journey.classList.remove("is-expanded");
  const shortLandscape = matchMedia(
    "(max-height: 560px) and (orientation: landscape)",
  ).matches;
  // Reserve room for the tallest chapter before fitting the complete landscape
  // illustration into the phone's remaining space. This never crops the village.
  if (innerWidth <= 760 || shortLandscape) {
    const copyBottom = Math.max(
      ...chapters.map((chapter) => {
        const copy = chapter.querySelector(".chapter-copy");
        return copy.offsetTop + copy.offsetHeight;
      }),
    );
    journey.style.setProperty("--mobile-world-top", `${copyBottom + 18}px`);
    // Let short screens scroll through the text and scene at their readable sizes.
    const stageHeight = shortLandscape
      ? Math.max(680, copyBottom + 100)
      : Math.ceil(copyBottom + 18 + Math.min((innerWidth * 9) / 16, 240) + 60);
    const expanded =
      shortLandscape || (innerHeight > 560 && stageHeight > innerHeight);
    journey.classList.toggle("is-expanded", expanded);
    journey.style.setProperty("--journey-height", `${stageHeight}px`);
  }
  journeyTop = journey.getBoundingClientRect().top + scrollY;
  chapterOffsets = chapters.map(
    (chapter) => chapter.getBoundingClientRect().top + scrollY,
  );
  end = Math.max(1, chapterOffsets.at(-1) - journeyTop);
  readScroll();
}

function readScroll() {
  desiredProgress = clamp((scrollY - journeyTop) / end);
  const viewEnd = journeyTop + journey.offsetHeight - innerHeight * 0.55;
  const isJourney = scrollY < viewEnd;
  let nextActive = 0;
  for (let i = 1; i < chapterOffsets.length; i++)
    if (scrollY >= chapterOffsets[i] - innerHeight * 0.32) nextActive = i;
  rail.classList.toggle("is-hidden", !isJourney);
  rail.classList.toggle("is-hero", nextActive === 0);
  motionButton.classList.toggle(
    "is-visible",
    isJourney && (paused || scrollY > 40),
  );
  chapters.forEach((chapter, i) =>
    chapter.classList.toggle("is-active", i === nextActive && isJourney),
  );
  if (nextActive !== active) {
    active = nextActive;
    railLinks.forEach((link, i) =>
      i === active
        ? link.setAttribute("aria-current", "step")
        : link.removeAttribute("aria-current"),
    );
    navLinks.forEach((link) => {
      const current = link.hash === "#" + chapters[active].id;
      link.classList.toggle("is-current", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  if (!frame) frame = requestAnimationFrame(paint);
}

function paint() {
  frame = 0;
  displayedProgress = paused
    ? desiredProgress
    : displayedProgress + (desiredProgress - displayedProgress) * 0.16;
  if (Math.abs(desiredProgress - displayedProgress) < 0.00006)
    displayedProgress = desiredProgress;
  const pose = cameraAt(displayedProgress);
  const mobile = innerWidth <= 760;
  if (!paused) {
    // The artwork remains a continuous fallback. A verified single-shot film can
    // replace it without altering chapter layout, controls, or loading behavior.
    camera.style.transform = videoReady
      ? "none"
      : `translate(${pose.x * (mobile ? 0.42 : 1)}%, ${pose.y * (mobile ? 0.4 : 1)}%) scale(${1 + (pose.scale - 1) * (mobile ? 0.62 : 1)})`;
    if (videoReady) seek(videoTime(displayedProgress, video.duration));
  }
  caption.style.opacity = String(1 - clamp(displayedProgress * 12));
  if (displayedProgress !== desiredProgress && !paused)
    frame = requestAnimationFrame(paint);
}

// Load one continuous film; keep the poster visible while decoding and coalesce
// pending seeks so rapid scrolling does not queue obsolete camera positions.
async function loadVideo() {
  const src =
    (innerWidth <= 760 && video.dataset.srcMobile) || video.dataset.src;
  if (!src || paused || videoLoaded || controller) return;
  controller = new AbortController();
  try {
    const response = await fetch(src, { signal: controller.signal });
    if (!response.ok) throw new Error("Video unavailable");
    const blob = await response.blob();
    if (paused) return;
    blobUrl = URL.createObjectURL(blob);
    video.src = blobUrl;
    video.load();
    videoLoaded = true;
  } catch (error) {
    if (error.name !== "AbortError")
      console.info(
        "Village film unavailable; showing the illustrated journey.",
      );
  } finally {
    controller = null;
  }
}

function seek(time) {
  latestVideoTime = time;
  if (!videoReady || paused || video.seeking || video.readyState < 2) return;
  if (Math.abs(video.currentTime - time) > 0.025) video.currentTime = time;
}
video.addEventListener("loadeddata", () => {
  videoReady = true;
  // loadeddata guarantees a decoded current frame. Do not wait for a compositor
  // callback while hiding the video: some Chrome rendering paths never send it.
  requestAnimationFrame(() => {
    if (videoReady && video.readyState >= 2) video.classList.add("is-painted");
  });
  if (interacted) primeVideo();
  readScroll();
});
video.addEventListener("seeked", () => {
  seek(latestVideoTime);
});
video.addEventListener("error", () => {
  videoReady = false;
  video.classList.remove("is-painted");
  readScroll();
});
async function primeVideo() {
  if (!videoReady || paused) return;
  try {
    await video.play();
    video.pause();
    seek(latestVideoTime);
  } catch {
    /* Poster remains visible until a frame paints. */
  }
}
function firstInteraction() {
  interacted = true;
  primeVideo();
}
addEventListener("touchstart", firstInteraction, { once: true, passive: true });
addEventListener("pointerdown", firstInteraction, {
  once: true,
  passive: true,
});
addEventListener("pagehide", (event) => {
  if (!event.persisted) {
    controller?.abort();
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  }
});

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menü öffnen");
}
menuButton.addEventListener("click", () => {
  const opened = menuButton.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !opened;
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.setAttribute(
    "aria-label",
    opened ? "Menü schließen" : "Menü öffnen",
  );
});
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});

// Native dialogs provide focus trapping, Escape dismissal, and restored focus.
for (const [trigger, id] of [
  ["[data-open-history]", "history-dialog"],
  ["[data-open-sources]", "sources-dialog"],
]) {
  const dialog = document.getElementById(id);
  document.querySelectorAll(trigger).forEach((button) =>
    button.addEventListener("click", () => {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }),
  );
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
  dialog.addEventListener("click", (event) => {
    const r = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom)
    )
      dialog.close();
  });
}
motionButton.addEventListener("click", () => {
  explicitPause = !paused;
  setMotion(explicitPause);
});
motionQuery.addEventListener("change", () =>
  setMotion(explicitPause ?? motionQuery.matches),
);
addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => {
  // svh pins chapter geometry; browser toolbar-only height changes must not remap it.
  if (width !== innerWidth || !matchMedia("(pointer: coarse)").matches) {
    width = innerWidth;
    measure();
  }
});
addEventListener("orientationchange", () => requestAnimationFrame(measure));
addEventListener("pageshow", measure);
document.fonts.ready.then(measure);
setMotion(paused);
measure();
