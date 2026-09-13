export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smoothstep = (n) => {
  n = clamp(n);
  return n * n * (3 - 2 * n);
};

// A continuous camera track across ONE world. No independent still crossfades.
export const keyframes = [
  { at: 0, x: 0, y: 0, scale: 1 },
  { at: 0.24, x: -3, y: 8, scale: 1.18 },
  { at: 0.5, x: 19, y: -5, scale: 1.43 },
  { at: 0.76, x: -19, y: -7, scale: 1.4 },
  { at: 1, x: 0, y: 0, scale: 1.02 },
];
export function cameraAt(progress) {
  const p = clamp(progress);
  const i = keyframes.findIndex(
    (frame, index) =>
      index < keyframes.length - 1 && p <= keyframes[index + 1].at,
  );
  const a = keyframes[Math.max(0, i)],
    b = keyframes[Math.max(0, i) + 1];
  const t = smoothstep((p - a.at) / (b.at - a.at));
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    scale: a.scale + (b.scale - a.scale) * t,
  };
}
export function videoTime(progress, duration) {
  return Number.isFinite(duration) && duration > 0
    ? clamp(progress) * Math.max(0, duration - 0.045)
    : 0;
}
