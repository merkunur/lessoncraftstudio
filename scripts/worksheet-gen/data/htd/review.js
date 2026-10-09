/**
 * data/htd/review.js — the HUMAN record of the How-to-Draw lessons (nt2-G / b7). tools/htd-build.js reads it:
 *   REFUSED[slug]   = reason  — the drawing is never used (its lesson does not read as a drawing lesson)
 *   OVERRIDES[slug] = { steps: 4|5|6 }  — the step count that reads best for this drawing (default 5)
 * Written while reading the contact sheets (tools/htd-sheets.js, %TEMP%\spl\htd-sheets-v4), one drawing at a time.
 */
'use strict';
const REFUSED = {
};
const OVERRIDES = {
};
module.exports = { REFUSED, OVERRIDES };
