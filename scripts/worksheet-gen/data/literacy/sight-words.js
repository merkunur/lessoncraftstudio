/**
 * High-frequency word lists for K-239 (see-trace-write lanes). Native-
 * per-locale by construction: en = Dolch-style pre-primer/primer core;
 * the 10 non-EN columns are authored by each locale's native ensemble at
 * the fan (de Grundwortschatz Bundesland-INTERSECTION, fr mots-outils,
 * nl flitswoorden, da the 120-ord register, fi reframed as FLUENCY words
 * — lukusujuvuus — since transparent-orthography Finnish has no sight-word
 * memorization genre). Keep words ≤ 8 letters (lane width) and lowercase
 * (the reading form).
 */
'use strict';

const SIGHT_WORDS = {
  en: ['the', 'and', 'you', 'see', 'can', 'play', 'look', 'said', 'here', 'come', 'little', 'down'],
};

module.exports = { SIGHT_WORDS };
