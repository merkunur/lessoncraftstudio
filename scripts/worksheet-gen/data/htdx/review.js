/**
 * data/htdx/review.js — the HUMAN record of the How-to-Draw LEVEL SET lessons (data/htdx, built by tools/htd-build.js --set=htdx
 * with the interior engine of lib/htd-steps.js). Written while reading every contact sheet (tools/htd-sheets.js --set=htdx), 2026-10-11.
 * REFUSED[slug] = reason (never used on a page) · OVERRIDES[slug] = { steps } (the count that reads as a lesson).
 * The published faces read data/htd/review.js, never this file.
 */
'use strict';
const REFUSED = {
  "sea-life-bw-2-hermit-crab": "the art is a crab in a helmet-like cap, not a crab in a shell: the word does not match the picture (visual review 2026-10-11)",
  "animals-bw-4-turtle": "double (thick) outline: step 2 redraws the outline inside itself",
  "animals-bw-5-crab": "double (thick) outline on every part",
  "animals-bw-5-hedgehog": "thick outline: step 2 redraws the spikes' inner edge",
  "beach-bw-2-inflatable-ring": "steps are tick marks round a thick rim — no lesson",
  "beach-bw-2-lounger": "double-line frame split into slivers",
  "beach-bw-2-surfboard": "double-line rim: step 2 redraws the outline",
  "christmas-bw-2-gingerbread-house": "step 3 = 40 % of tiny icing marks; outline only 24 % — not a K-2 lesson",
  "christmas-bw-2-sleigh": "steps are the inner parallels of a double-line rim",
  "dessert-bw-donut": "the hole is drawn in pieces across steps 2-4",
  "easter-bw-butterfly": "2 steps under the Level Set engine: outline + everything (the step rule wants 3-6)",
  "fruits-bw-apple": "thick outline: step 3 redraws its inner edge",
  "fruits-bw-cherry": "thick outline: step 3 inner edges",
  "home-bw-teapot": "step 4 = the inner edge of the thick body outline",
  "nature-bw-ladybug": "step 3 = the inner edge of the thick outline",
  "sea-life-bw-clown-fish": "thick outline; step 3 = 55 % of everything",
  "sea-life-bw-stingray": "2 steps under the Level Set engine: outline + everything (the step rule wants 3-6)",
  "sea-life-bw-turtle": "shell plates drawn in pieces; double rim",
  "sea-life-bw-walrus": "the picture is a SEAL / sea lion (no tusks): the word does not match the picture",
  "sea-life-bw-whale": "2 steps under the Level Set engine: outline + everything (the step rule wants 3-6)",
  "space-bw-telescope": "thick double lines: steps are inner edges",
  "space-bw-ufo": "2 steps under the Level Set engine: outline + everything (the step rule wants 3-6)",
  "toys-bw-2-dice": "step 3 = inner edges of thick lines",
  "toys-bw-2-kite": "frame drawn as double lines: steps 2-3 redraw parallels",
  "toys-bw-2-pinwheel": "steps are slivers of the centre ring",
  "toys-bw-2-telephone": "thick lines, rotary phone (unfamiliar), sliver steps",
  "toys-bw-2-xylophone": "steps are slivers of bar edges",
  "toys-bw-spinning-top": "step 2 = 55 % stripes + thick inner edge",
  "toys-bw-ufo": "2 steps under the Level Set engine: outline + everything (the step rule wants 3-6)",
  "travel-and-holiday-bw-tent": "thin double canvas lines, step 3 = 43 % slivers",
  "vehicles-bw-2-taxi": "steps 2-4 = fragments of the checker trim",
  "vehicles-bw-3-motorcycle": "thin-line slivers in steps 2-4",
  "vehicles-bw-car": "sports car: thin slivers, too detailed for K-2",
  "vehicles-bw-race-car": "thin slivers, too detailed for K-2",
  "farm-bw-nest": "the picture is a HEN sitting on a nest: the word does not name what the child draws",
  "christmas-bw-2-ice-skates": "a pair (plural noun, no title form with an article) and 294 parts — too complex",
  // flagged on the first read, retried at 4 steps, still not a lesson:
  "animals-bw-3-elephant-2": "one eye in step 2, the other in step 3 (try 4/6); still split at 4 steps (read 2026-10-11)",
  "animals-bw-3-ladybug": "one pupil in step 2 (try 4/6); still split at 4 steps (read 2026-10-11)",
  "animals-bw-5-owl": "eye rings split again in x3 (step 2 one ring); still split at 4 steps (read 2026-10-11)",
  "animals-bw-elephant": "one eye step 3, other step 4; still split at 4 steps (read 2026-10-11)",
  "beach-bw-sailboat": "the double-line mast splits across steps 2 and 4; still split at 4 steps (read 2026-10-11)",
  "beach-bw-beach-ball": "stripes drawn in half-pieces (steps 2,3); still split at 4 steps (read 2026-10-11)",
  "beach-bw-umbrella": "ribs split across steps 2 and 4; still split at 4 steps (read 2026-10-11)",
  "birds-bw-owl": "one eye ring alone in step 2 (reads as a wink); still split at 4 steps (read 2026-10-11)",
  "farm-bw-tractor": "step 4 (49 %) = thick tyre treads; steps 2-3 good; still split at 4 steps (read 2026-10-11)",
  "vegetables-bw-pumpkin": "ribs drawn half in step 2, half in step 3; still split at 4 steps (read 2026-10-11)",
  "vehicles-bw-2-airplane-2": "step 2 = scattered bits of lines; still split at 4 steps (read 2026-10-11)",
  "vehicles-bw-train": "thick lines: step 3 = chimney inner edges; still split at 4 steps (read 2026-10-11)",
};
const OVERRIDES = {
  "vehicles-bw-bus": { steps: 4 },   // 3 steps: outline, windows + door, wheels + details (the 5-step build put fragments in step 2)
};
module.exports = { REFUSED, OVERRIDES };
