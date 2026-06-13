#!/usr/bin/env node
/**
 * gen-lit-fan.js — fan the picture-based literacy data to the 10 non-EN locales
 * from each locale's gated approved-words-<locale>.json pool (the safety SoT).
 *
 *   node scripts/worksheet-gen/tools/gen-lit-fan.js
 *
 * AUGMENTS each data file with per-locale entries (preserves existing EN):
 *   sound-match (beginning/ending/middle), syllable-count  → items.<loc>
 *   word↔picture                                            → pairs.<loc>
 *   sort-by-beginning-sound, syllable-sort                  → binsByLocale/itemsByLocale.<loc>
 *   CVC-missing, build-the-word                             → items.<loc>
 *
 * Words are pulled ONLY from the locale pool (never EN-swapped). Images are
 * locale-neutral (shared). Graphemes are single-letter (NOT rendered — the
 * write-box is blank — so they are metadata for verify()); sort-by-first BIN
 * labels are first letters (rendered, correct: Katze→K). category-vocab + the
 * letter-knowledge vc/string layer are localized by the native ensemble, NOT here.
 * Per-locale drops (noun not in a pool) are filtered + logged.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'data', 'literacy');
const POOLDIR = path.join(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output');
const CACHE = require(path.join(__dirname, '..', 'cache', 'manifest.json'));
const LOCALES = ['de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const VOWELS = require(path.join(DIR, 'letter-knowledge.json')).vowels;

// Skip non-concrete-noun source themes (color swatches, emotion faces) so the
// picture-types surface concrete picturable nouns, not adjectives.
const BLOCK_THEMES = new Set(['colors', 'emotions']);
// Explicit non-concrete keys (gerunds / abstractions / abbreviations) to exclude.
const BLOCK_KEYS = new Set(['reading', 'biking', 'hiking', 'dancing', 'baking', 'swimming', 'painting', 'us', 'tv', 'gray', 'grey', 'angry', 'happy', 'sad', 'scared', 'surprised', 'blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'toilet', 'ottoman', 'yacht', 'phlox']);
const themeOf = {};
for (const [t, v] of Object.entries(CACHE.themes)) { if (/ bw$/.test(t) || BLOCK_THEMES.has(t)) continue; for (const n of Object.keys(v.nouns || {})) if (!themeOf[n]) themeOf[n] = t; }

function pool(loc) { return new Map(JSON.parse(fs.readFileSync(path.join(POOLDIR, 'approved-words-' + loc + '.json'), 'utf8')).entries.map((e) => [e.key, e])); }
function cachedApproved(loc, p) {
  // single-alpha noun, approved in this locale, cached image
  return [...p.entries()].filter(([k]) => themeOf[k] && /^[a-z]+$/.test(k) && !BLOCK_KEYS.has(k)).map(([k, e]) => ({ noun: k, theme: themeOf[k], word: String(e.word).toLowerCase(), count: e.count }));
}
function isV(loc, ch) { return (VOWELS[loc] || VOWELS.en).includes(ch); }
function firstLetter(w) { return w[0].toUpperCase(); }
function lastLetter(w) { return w[w.length - 1].toUpperCase(); }
function firstVowel(loc, w) { for (const ch of w) if (isV(loc, ch)) return ch; return w[0]; }
function readJ(f) { return JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); }
function writeJ(f, o) { fs.writeFileSync(path.join(DIR, f), JSON.stringify(o, null, 2) + '\n'); }

// Peripheral themes hold less-common K vocab (flowers/dinosaurs/instruments…);
// deprioritize them so common concrete nouns surface (cat/apple/ball over
// phlox/ottoman/yacht), which matters because the child must RECOGNIZE the
// pictured word to name its sound.
const PERIPHERAL = new Set(['flowers', 'dinosaurs', 'music', 'space', 'post office', 'occupations', '4th of July', 'christmas', 'easter', 'thanksgivinng', 'reptiles and Amphibians', 'Things That Fly', 'tools', 'birds 2', 'miscellaneous', 'hospital', 'spring', 'summer', 'winter', 'autumn', 'activities']);
const peri = (c) => (PERIPHERAL.has(c.theme) ? 1 : 0);
// rank = core-theme common word first → fewest syllables → shortest → stable.
const rank = (a, b) => peri(a) - peri(b) || a.count - b.count || a.word.length - b.word.length || a.noun.localeCompare(b.noun);

// pick up to n items with DISTINCT key from keyFn, simplest words first
function pickDistinct(cands, keyFn, n) {
  const seen = new Set(), out = [];
  for (const c of cands.slice().sort(rank)) {
    const k = keyFn(c); if (k == null || seen.has(k)) continue; seen.add(k); out.push(c); if (out.length >= n) break;
  }
  return out;
}

const log = [];
function fan(file, kind) {
  const data = readJ(file);
  for (const loc of LOCALES) {
    let p; try { p = pool(loc); } catch (e) { log.push(file + '/' + loc + ': NO POOL'); continue; }
    const cands = cachedApproved(loc, p);
    if (kind === 'beginning' || kind === 'ending' || kind === 'middle') {
      // beginning/ending dedupe by grapheme (varied sounds); middle takes the
      // 8 simplest words (medial vowel repeats are fine — only 5 vowels exist).
      let picks;
      if (kind === 'middle') picks = cands.slice().sort(rank).slice(0, 8);
      else picks = pickDistinct(cands, kind === 'beginning' ? (c) => firstLetter(c.word) : (c) => lastLetter(c.word), 10);
      data.items[loc] = picks.map((c) => ({ theme: c.theme, noun: c.noun, answer: kind === 'middle' ? firstVowel(loc, c.word) : (kind === 'ending' ? lastLetter(c.word) : firstLetter(c.word)) }));
      log.push(file + '/' + loc + ': ' + data.items[loc].length + ' items');
    } else if (kind === 'wordpicture') {
      const picks = cands.slice().sort(rank).slice(0, 10);
      data.pairs[loc] = picks.map((c) => ({ theme: c.theme, noun: c.noun, word: c.word }));
      log.push(file + '/' + loc + ': ' + data.pairs[loc].length + ' pairs');
    } else if (kind === 'syllable-count') {
      // pick 8 spanning the 3 most-populated counts
      const byCount = {}; for (const c of cands) (byCount[c.count] = byCount[c.count] || []).push(c);
      const top = Object.keys(byCount).map(Number).filter((n) => n >= 1 && n <= 4).sort((a, b) => byCount[b].length - byCount[a].length).slice(0, 3).sort((a, b) => a - b);
      const items = [];
      for (const cnt of top) for (const c of byCount[cnt].slice().sort(rank).slice(0, 3)) items.push({ theme: c.theme, noun: c.noun, answer: String(cnt) });
      data.items[loc] = items;
      log.push(file + '/' + loc + ': ' + items.length + ' items (counts ' + top.join('/') + ')');
    } else if (kind === 'sort-first' || kind === 'sort-syllable') {
      data.binsByLocale = data.binsByLocale || {}; data.itemsByLocale = data.itemsByLocale || {};
      if (kind === 'sort-first') {
        const byInit = {}; for (const c of cands) (byInit[firstLetter(c.word)] = byInit[firstLetter(c.word)] || []).push(c);
        const groups = Object.keys(byInit).filter((k) => byInit[k].length >= 3).sort((a, b) => byInit[b].length - byInit[a].length).slice(0, 3).sort();
        data.binsByLocale[loc] = groups.map((g) => ({ key: g, label: { [loc]: g } }));
        const items = []; for (const g of groups) for (const c of byInit[g].slice().sort(rank).slice(0, 3)) items.push({ theme: c.theme, noun: c.noun, bin: g });
        data.itemsByLocale[loc] = items;
        log.push(file + '/' + loc + ': bins ' + groups.join(',') + ' (' + items.length + ' items)');
      } else {
        const byCount = {}; for (const c of cands) (byCount[c.count] = byCount[c.count] || []).push(c);
        const top = Object.keys(byCount).map(Number).filter((n) => n >= 1 && n <= 4 && byCount[n].length >= 3).sort((a, b) => byCount[b].length - byCount[a].length).slice(0, 3).sort((a, b) => a - b);
        data.binsByLocale[loc] = top.map((c) => ({ key: String(c), label: { [loc]: String(c) } }));
        const items = []; for (const cnt of top) for (const c of byCount[cnt].slice().sort(rank).slice(0, 3)) items.push({ theme: c.theme, noun: c.noun, bin: String(cnt) });
        data.itemsByLocale[loc] = items;
        log.push(file + '/' + loc + ': syl-bins ' + top.join(',') + ' (' + items.length + ' items)');
      }
    } else if (kind === 'cvc' || kind === 'build') {
      const shorts = cands.filter((c) => c.word.length >= 3 && c.word.length <= 5 && /^[a-zäöüåæøñ]+$/.test(c.word)).slice().sort(rank).slice(0, 10);
      data.items[loc] = shorts.map((c) => {
        const o = { theme: c.theme, noun: c.noun, word: c.word };
        if (kind === 'cvc') { let bi = 1; for (let i = 0; i < c.word.length; i++) if (isV(loc, c.word[i])) { bi = i; break; } o.blank = bi; }
        return o;
      });
      log.push(file + '/' + loc + ': ' + data.items[loc].length + ' words');
    }
  }
  // ensure *ByLocale.en exists for the sort types (lit-sort fallback)
  if ((kind === 'sort-first' || kind === 'sort-syllable')) {
    data.binsByLocale = data.binsByLocale || {}; data.itemsByLocale = data.itemsByLocale || {};
    if (!data.binsByLocale.en && data.bins) data.binsByLocale.en = data.bins;
    if (!data.itemsByLocale.en && data.items) data.itemsByLocale.en = data.items;
  }
  writeJ(file, data);
}

fan('beginning-sounds.json', 'beginning');
fan('ending-sounds.json', 'ending');
fan('middle-sounds.json', 'middle');
fan('syllable-count.json', 'syllable-count');
fan('vocab-match.json', 'wordpicture');
fan('sort-by-beginning-sound.json', 'sort-first');
fan('syllable-sort.json', 'sort-syllable');
fan('word-build.json', 'cvc');
fan('build-word.json', 'build');

console.log(log.join('\n'));
console.log('\nDONE — fanned picture data for ' + LOCALES.length + ' non-EN locales.');
