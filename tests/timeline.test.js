import test from "node:test";
import assert from "node:assert/strict";
import { cameraAt, keyframes, videoTime } from "../src/timeline.js";

test("camera movement is continuous in both directions across every chapter boundary", () => {
  for (const key of keyframes.slice(1, -1)) {
    const before = cameraAt(key.at - 0.00001);
    const after = cameraAt(key.at + 0.00001);
    for (const axis of ["x", "y", "scale"])
      assert.ok(
        Math.abs(after[axis] - before[axis]) < 0.001,
        `discontinuity in ${axis}`,
      );
  }
});
test("overscroll stays at the first or last camera position", () => {
  assert.deepEqual(cameraAt(-0.5), cameraAt(0));
  assert.deepEqual(cameraAt(1.5), cameraAt(1));
});
test("video seeking is bounded and never targets the unpaintable end of a film", () => {
  assert.equal(videoTime(-1, 20), 0);
  assert.ok(videoTime(1, 20) < 20);
  assert.equal(videoTime(2, 20), videoTime(1, 20));
  assert.equal(videoTime(0.5, Number.NaN), 0);
  assert.equal(videoTime(0.5, Infinity), 0);
});
