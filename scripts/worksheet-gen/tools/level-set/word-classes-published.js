/**
 * The published Word Classes pages: face → theme, the same in every locale (one page per face, level 2, copy 1), read
 * from the live catalog (decks.subject_tags, 2026-10-02).
 */
'use strict';
const FACES = { 'G2-275': 'toys', 'G2-285': 'animals', 'G2-286': 'fruits', 'G2-287': 'vehicles', 'G1-293': 'toys', 'G1-300': 'animals' };
const PUBLISHED = Object.fromEntries(['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'].map((l) => [l, { ...FACES }]));
module.exports = { PUBLISHED, FACES };
