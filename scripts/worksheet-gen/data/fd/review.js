/**
 * data/fd/review.js — the HUMAN record of the Find-the-Differences scenes (nt2-G / b7). The type and the composer read it:
 *   REFUSED[sceneId]        = reason — the scene (plain or -rich) is never used
 *   REFUSED_OPS[sceneId]    = [candidate index…] — a candidate whose change reads wrong on the sheet (a bird in the pond)
 * Written while reading the contact sheets (tools/fd-sheets.js, %TEMP%\spl\fd-sheets\{line,colour}).
 */
'use strict';
const REFUSED = {
};
const REFUSED_OPS = {
};
module.exports = { REFUSED, REFUSED_OPS };
