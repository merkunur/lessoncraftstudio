/**
 * data/fd/review.js - the HUMAN record of the Find-the-Differences scenes (nt2-G / b7). The type and the composer read it:
 *   REFUSED[sceneId]        = reason: the scene (plain or -rich) is never used
 *   REFUSED_OPS[sceneId]    = [candidate index...]: a candidate whose change reads wrong on the sheet (a bird in the pond)
 *   REFUSED_WORDS[vocabKey] = ['<loc>' | '*']: the vocab word is not what a child in that country calls the drawing; the
 *                             word faces (what-changed / write) drop every SCENE carrying that drawing in that locale
 *   EXCLUDE_SCENES[mode][loc] = [sceneId...]: a scene refused for one word face in one locale (derived from REFUSED_WORDS
 *                             by the panels' rulings, or ruled directly)
 * Written while reading the contact sheets (tools/fd-sheets.js, %TEMP%\spld-sheets\{line,colour}).
 */
'use strict';
const REFUSED = {
};
const REFUSED_OPS = {
};
const REFUSED_WORDS = {
};
const EXCLUDE_SCENES = { 'what-changed': {}, write: {} };
module.exports = { REFUSED, REFUSED_OPS, REFUSED_WORDS, EXCLUDE_SCENES };
