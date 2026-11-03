#!/usr/bin/env node
/**
 * build-letter-picture-candidates.js — the CANDIDATES of the letter-picture chart (makers 2026-11-02; ENGINES
 * [alphabet-Q1]): for every letter of each locale's school alphabet, the pictures whose name starts with that letter's
 * SOUND, ranked for review. Not a page source: a person opens every picture (contact sheets) and a native reviewer reads
 * every word before data/alphabet/letter-pictures.json lists a picture for a letter.
 *
 *   node tools/build-letter-picture-candidates.js [--per=5] > <out.json>
 *
 * Words: the phonics pipeline's approved words (scripts/v2-data/.../approved-words-<loc>.json — gated words only, never a
 * raw vocabulary word), joined on `key` to a COLOUR library picture (label-safe, not refused). A word counts for a letter
 * when it starts with the letter (accents folded where the locale's alphabet has no accented letter of its own: é is E
 * in French, ä is its own letter in German) and its onset is not one the deny list names (a digraph or a silent / soft
 * letter that makes another sound: en kn- wr- ph- c+e/i, de sch- st- sp- ei-, fr ch- h- nasal an-/on-, es h- ch- ll-,
 * sv sj- k+e/i …). Shorter words first (a K child names a short picture faster), then fewer syllables.
 */
'use strict';
const path = require('path');
const { manifest, labelSafeNouns } = require('../image-cache/resolve.js');
const { refusedPicture } = require('../lib/picture-refusals.js');
const { letterUnits } = require('../types/k/K-238-letter-tracing.js');
const { WORD_EXCLUDE, isNonNoun } = require('../lib/picture-word-review.js');

const PER = +((process.argv.find((a) => a.startsWith('--per=')) || '--per=5').slice(6));
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const AW = (l) => require(path.join(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output', `approved-words-${l}.json`)).entries;
// onsets that do not make the letter's own sound (a digraph, a silent or soft letter, a nasal vowel, a diphthong)
const DENY = {
  en: /^(kn|wr|ps|pn|gn|ph|wh|ch|sh|th|c[eiy]|g[eiy]|ou|oa|oi|ai|au|ay|ea|ee|ei|ie|eye|ear|eu|uni|use|one|once|x)/,
  de: /^(sch|sp|st|ch|ei|eu|äu|au|ie|qu|pf|ph|chr)/,
  fr: /^(ch|ph|h|ou|oi|au|eau|ai|ei|eu|œ|gn|qu|c[eiy]|g[eiy]|(an|en|in|on|un|am|em|im|om|um)(?![aeiouyhnm]))/,
  es: /^(h|ch|ll|qu|gu[eiéí]|c[eiéí]|g[eiéí]|x)/,
  pt: /^(h|ch|lh|nh|qu|gu[eiéí]|c[eiéíê]|g[eiéíê])/,
  it: /^(h|gn|gli|sc[ei]|c[ei]|g[ei]|ch|gh|qu)/,
  nl: /^(ch|sch|ij|ui|eu|ou|au|ie|oe|ei)/,
  sv: /^(sj|skj|stj|sch|sk[eiyäö]|kj|tj|k[eiyäö]|hj|dj|gj|lj|g[eiyäö])/,
  da: /^(hv|hj|sj|sch|ch)/,
  no: /^(hj|kj|skj|sj|gj|hv|sch|k[iy]|g[iy]|kei|gei|sk[iy]|skei)/,
  fi: /^(sh|ch|sch)/,
};
// letters that are their own letter in the locale (never folded onto their base)
const OWN = { de: 'äöü', sv: 'åäö', da: 'æøå', no: 'æøå', fi: 'äöå', es: 'ñ' };
const fold = (s, loc) => [...s].map((c) => ((OWN[loc] || '').includes(c) ? c : c.normalize('NFD').replace(/\p{M}/gu, ''))).join('');

// vocabKey -> its colour pictures (label-safe, not refused)
const pics = new Map();
for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) {
  for (const n of labelSafeNouns(theme)) {
    if (refusedPicture(theme, n.noun)) continue;
    const k = n.vocabKey || n.noun;
    if (!pics.has(k)) pics.set(k, []);
    pics.get(k).push({ theme, noun: n.noun });
  }
}

const out = {};
for (const loc of LOCS) {
  out[loc] = {};
  // a picture word a child names from the drawing: a plain noun (no feeling, colour or action), not on the review's exclusions
  const words = AW(loc).filter((e) => pics.has(e.key) && /^\p{L}+$/u.test(e.word) && !isNonNoun(e.key) && !(WORD_EXCLUDE.all || []).includes(e.key) && !((WORD_EXCLUDE[loc] || []).includes(e.key)) && !pics.get(e.key).every((q) => /emotion|color|activit/i.test(q.theme)));
  const units = letterUnits(loc);
  // the accented letters that are pages of their own here (fr É È Ê): their words never stand on the plain letter's page
  const accentedUnits = units.map((u) => u.toLocaleLowerCase(loc)).filter((u) => u.normalize('NFD') !== u && !(OWN[loc] || '').includes(u));
  for (const unit of units) {
    const L = unit.toLocaleLowerCase(loc);
    if (L === 'ß') continue;
    const hits = words.filter((e) => {
      const w = e.word.toLocaleLowerCase(loc);
      // an accented letter that is a page of its own (fr É È Ê, pt Ç …) wants words that start with exactly that letter
      const accented = L.normalize('NFD') !== L && !(OWN[loc] || '').includes(L);
      if (accented ? !w.startsWith(L) : !fold(w, loc).startsWith(fold(L, loc))) return false;
      if (!accented && accentedUnits.some((u) => w.startsWith(u))) return false;
      if (DENY[loc] && DENY[loc].test(w)) return false;
      // where the pipeline split the word into sounds (an array per syllable), the first sound must be the letter
      if (Array.isArray(e.chunks) && Array.isArray(e.chunks[0]) && fold(e.chunks[0][0], loc) !== fold(L, loc)) return false;
      return true;
    }).sort((a, b) => [...a.word].length - [...b.word].length || a.count - b.count || a.word.localeCompare(b.word));
    out[loc][unit] = hits.slice(0, PER).map((e) => ({ key: e.key, word: e.word, pics: pics.get(e.key).slice(0, 2) }));
  }
}
process.stdout.write(JSON.stringify(out, null, 1) + '\n');
