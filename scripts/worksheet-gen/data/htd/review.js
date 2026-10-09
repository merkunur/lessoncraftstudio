/**
 * data/htd/review.js — the HUMAN record of the How-to-Draw lessons (nt2-G / b7). tools/htd-build.js reads it:
 *   REFUSED[slug]   = reason  — the drawing is never used (its lesson does not read as a drawing lesson)
 *   OVERRIDES[slug] = { steps: 4|5, foldFloor?: 0.08 }  — the step request that satisfies the step rule
 *     (K-396 final §2: outline ≥ 0.25, every inner step ≥ 0.08, 4–5 steps; foldFloor folds a thinner step into its
 *     same-class neighbour). Measured 2026-10-09 on the 4/5 matrix (scratch K-396 matrix; lib/htd-steps.js 17:30).
 * Written while reading the contact sheets (tools/htd-sheets.js, %TEMP%\spl\htd-sheets-v4), one drawing at a time.
 */
'use strict';
const REFUSED = {
  'animals-bw-5-bird': 'a 4 % step at every count (the garden bird): refused as a unit (K-396 final §3 F8)',
  'farm-bw-horse': 'a 5 % step at every count (K-396 final §2 alternates)',
  'farm-animals-bw-unicorn': 'a 2 % step at every count (K-396 final §2 alternates)',
  'animals-bw-2-cat': 'a 1 % step at every count (K-396 final §2 alternates)',
  'animals-bw-3-cat': 'a 1 % step at every count (K-396 final §2 alternates)',
};
const OVERRIDES = {
  'animals-bw-3-cat-2': { steps: 5, foldFloor: 0.08 },   // 53/11/22/15 (the 2 % tail line folds into the body step)
  'animals-bw-2-dog': { steps: 4 },                      // 44/30/9/18
  'animals-bw-4-rabbit-2': { steps: 4 },                 // 37/42/9/12
  'farm-animals-bw-pony': { steps: 4 },                  // 48/17/15/21
  'animals-bw-3-dinosaur': { steps: 4 },                 // 39/25/18/18
  'animals-bw-3-fish-2': { steps: 4 },                   // 34/32/14/20
  'animals-bw-3-frog-2': { steps: 4 },                   // 42/30/12/15
  'animals-bw-5-owl': { steps: 5 },                      // 32/29/13/17/10 (G1: the largest passing count)
  'birds-bw-hummingbird': { steps: 4 },                  // 45/18/15/23 (5 = 45/18/12/12/14 is the recorded alternate)
  'zoo-animals-bw-bear-2': { steps: 4 },                 // 37/21/19/23
  'easter-bw-butterfly': { steps: 4 },                   // 63/14/12/11
};
module.exports = { REFUSED, OVERRIDES };
