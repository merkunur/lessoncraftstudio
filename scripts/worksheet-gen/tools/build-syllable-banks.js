#!/usr/bin/env node
/**
 * build-syllable-banks.js — the item banks of K-233 Count the Syllables and K-234 Sort by Syllables
 * (data/literacy/syllable-count.json, data/literacy/syllable-sort.json), built from the syllable SAFETY pipeline's
 * approved words (scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json: every split agreed by
 * ≥ 3 sources or quarantined) instead of a list read by eye (2026-11-02, the Phonics & Sounds maker). The old banks
 * put one word on a page twice (fr étagère, pt abóbora, da ur — clock and watch, fi etana — slug and snail), counted
 * the silent final e of French on a sheet that asks for the syllables a child HEARS (âne 2, île 2, banane 3) and kept
 * English words whose count speakers do not agree on (iron).
 *
 *   - a picture of a thing (the vocabulary's noun tell, a de gender), one word met once, at most 9 letters
 *   - fr: no word with a syllable whose only vowel is a final unaccented e (ba-na-ne, ca-pe): spoken and written
 *     counts differ there, so only words both conventions count alike are asked
 *   - en: words whose count speakers do not agree on are left out (CONTESTED)
 *   - the bins of each locale stay those of the shipped pages (en de nl sv da no 1-3, es fr it pt fi 2-4)
 *   - a picture is the key's reviewed picture where one exists (the letter chart, the K-228 bank), else its first
 *     colour library picture; refused pictures are never used
 *
 *   node tools/build-syllable-banks.js [--check] [--dump]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data', 'literacy');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const AW = (loc) => require(path.join(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output', `approved-words-${loc}.json`)).entries;
const { vocab, displayWord } = require('../lib/b2-common.js');
const { manifest, labelSafeNouns } = require('../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../lib/picture-name-refusals.js');
// a drawing refused in one theme is the same drawing in the others: a name task refuses the NOUN
// chart pictures a child names otherwise when no word stands beside them (a narwhal is "Wal", a hen "chicken" / "kip")
const UNAIDED_KEYS = new Set(['narwhal', 'hen']);
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const refusedPic = (theme, noun) => nameRefused(theme, noun) || REFUSED_NOUNS.has(noun);
const LP = require('../data/alphabet/letter-pictures.json').letters;
const SORT = require('../data/literacy/sort-by-beginning-sound.json');
const OLD_SORT = require('../data/literacy/syllable-sort.json');

// es it pt fi have few one-syllable nouns, so their pages count 2-4; fr (without its silent-e words) has 1-3
const COUNTS = (loc) => (['es', 'it', 'pt', 'fi'].includes(loc) ? ['2', '3', '4'] : ['1', '2', '3']);
// English words whose syllable count speakers do not agree on (1 or 2: fire, hour; 2 or 3: camera, chocolate)
const CONTESTED = { en: ['iron', 'fire', 'hour', 'flour', 'tire', 'flower', 'orange', 'squirrel', 'towel', 'jewel', 'camera', 'chocolate', 'family', 'caramel', 'diamond', 'pajamas', 'library', 'every', 'poem', 'lion', 'violin', 'cereal'] };
// words a review refused: the letter-picture review's "a child names this picture with another word" (it sofà →
// divano, sv bo → fågelbo …) — a child counts the syllables of the word they SAY — plus this bank's own review
const REJECT = {
  // + the bank's own review (2026-11-02): a picture named with another word (hen → chicken / kip, Elf → Elfe, sofa →
  // canapé, ver → ver de terre, huvtröja → hoodie, hansikas → hanska), a count children and teachers disagree on (owl,
  // avion a-vi-on, apio, nl arm ar-rem, no ovn), a loan said otherwise (cupcake, submarino, saxofone, salopette), a
  // word a K child does not know (colander, tatou, carámbano, bolota, bæltedyr), a duplicate (gants, escaleras)
  en: ['sack', 'jug', 'owl', 'colander', 'hen'], de: ['Arzt', 'Clownfisch', 'Dachs', 'Elf', 'Henne'],
  fr: ['élan', 'pic', 'lion', 'gants', 'avion', 'camion', 'ver', 'tatou', 'sofa'], es: ['bote', 'alce', 'carámbano', 'escaleras', 'apio'],
  pt: ['aipo', 'alce', 'doce', 'cupcake', 'submarino', 'saxofone', 'bolota', 'ancinho'], it: ['bagel', 'sofà', 'infermiera', 'viso', 'alce', 'cupcake', 'salopette', 'gabinetto'],
  nl: ['camper', 'gier', 'hen', 'das', 'duif', 'jasje', 'eendje', 'arm', 'armband'],
  sv: ['bo', 'gam', 'kon', 'narval', 'isglass', 'elvisp', 'huvtröja'], da: ['indkøbsvogn', 'bæltedyr'], no: ['ovn', 'cupcake'], fi: ['brownie', 'bageli', 'greippi', 'hansikas', 'käsivarsi'],
};
// the safety pipeline counts a silent e inside an English compound as a syllable (brac-el-et): the review's counts win
const COUNT_FIX = { en: { bracelet: 2, notebook: 2, pinecone: 2, scarecrow: 2 } };
const PER_COUNT = 40;
// (anywhere in a compound too: fireplace, firefly, flowerpot)
const EN_HIATUS = /ire|ier|yer|our|ower|ial|iel|uel|ual|ion|ian|eon|(ia|io|eo)$|(ia|io|eo|ua)[^aeiou]/;
const FRV = 'aeiouyéèêëàâîïôûùœ';
// a written syllable whose only sounded vowel is a silent e: ne, ble, -ques, -gue (pastèque, bague)
const frMuteE = (split) => split.some((sy) => new RegExp(`^[^${FRV}]*(qu|gu)?es?$`, 'u').test(sy.toLowerCase()));

function pictureIndex() {
  const first = new Map();
  for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) {
    for (const n of labelSafeNouns(theme)) { const k = n.vocabKey || n.noun; if (!first.has(k) && !refusedPic(theme, n.noun)) first.set(k, { theme, noun: n.noun }); }
  }
  const reviewed = new Map();
  for (const by of Object.values(LP)) for (const list of Object.values(by)) for (const e of list) if (!reviewed.has(e.key) && !refusedPic(e.theme, e.noun) && !UNAIDED_KEYS.has(e.key)) reviewed.set(e.key, { theme: e.theme, noun: e.noun });
  for (const list of Object.values(SORT.itemsByLocale || {})) for (const e of list) {
    const k = e.key || e.noun;
    if (e.theme && e.noun && !reviewed.has(k) && !refusedPic(e.theme, e.noun)) reviewed.set(k, { theme: e.theme, noun: e.noun });
  }
  return (key) => (reviewed.has(key) ? { ...reviewed.get(key), reviewed: true } : first.get(key) || null);
}

function build() {
  const pic = pictureIndex(), V = vocab();
  const count = { _note: 'tools/build-syllable-banks.js — the safety pipeline\'s approved syllable counts; fr without silent-final-e words. Do not edit.', items: {} };
  const sort = { _note: 'tools/build-syllable-banks.js — pictures into syllable-count bins (the approved counts). Do not edit.', bins: OLD_SORT.bins, items: OLD_SORT.items, binsByLocale: {}, itemsByLocale: {} };
  for (const loc of LOCS) {
    const keep = new Set(COUNTS(loc)), seen = new Set(), items = [];
    for (const e of AW(loc)) {
      const v = V[e.key], p = pic(e.key);
      if (!v || !v[loc] || !(v.de && v.de[2]) || !p) continue;
      const word = displayWord(v[loc][0], loc);
      if (!/^\p{L}+$/u.test(word) || word.toLocaleLowerCase(loc) !== e.word.toLocaleLowerCase(loc) || [...word].length > 9 || seen.has(word)) continue;
      if (!keep.has(String(e.count))) continue;
      if (loc === 'fr' && frMuteE(e.split)) continue;
      if ((CONTESTED[loc] || []).includes(word.toLocaleLowerCase(loc)) || (REJECT[loc] || []).includes(word)) continue;
      // en: a vowel pair that one speaker says as one syllable and another as two (dryer, fire, hour, lion, cereal)
      if (loc === 'en' && EN_HIATUS.test(word.toLowerCase())) continue;
      seen.add(word);
      const count = ((COUNT_FIX[loc] || {})[word.toLocaleLowerCase(loc)]) || e.count;
      items.push({ theme: p.theme, noun: p.noun, key: e.key, word, answer: String(count), reviewed: !!p.reviewed });
    }
    // at most PER_COUNT words per count — a reviewed picture first, then the shorter word (a K bank a reviewer reads whole)
    const capped = [];
    for (const c of COUNTS(loc)) {
      capped.push(...items.filter((x) => x.answer === c).sort((a, b) => (b.reviewed - a.reviewed) || ([...a.word].length - [...b.word].length) || a.word.localeCompare(b.word, loc)).slice(0, PER_COUNT));
    }
    count.items[loc] = capped.map(({ reviewed, ...x }) => x);
    items.length = 0; items.push(...count.items[loc]);
    sort.binsByLocale[loc] = COUNTS(loc).map((k) => ({ key: k, label: { [loc]: k } }));
    sort.itemsByLocale[loc] = items.map((x) => ({ theme: x.theme, noun: x.noun, key: x.key, word: x.word, bin: x.answer }));
  }
  return { count, sort };
}

const b = build();
if (process.argv.includes('--dump')) {
  for (const [loc, list] of Object.entries(b.count.items)) {
    const by = {};
    for (const x of list) (by[x.answer] = by[x.answer] || []).push(x.word);
    console.log(`${loc} (${list.length}): ` + Object.entries(by).map(([c, w]) => `${c} [${w.length}]: ${w.join(' ')}`).join('  ||  '));
  }
  process.exit(0);
}
let stale = 0;
for (const [f, o] of [['syllable-count.json', b.count], ['syllable-sort.json', b.sort]]) {
  const text = JSON.stringify(o, null, 1) + '\n', p = path.join(DATA, f);
  if (process.argv.includes('--check')) { if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== text) { console.error(f + ' is STALE'); stale++; } }
  else { fs.writeFileSync(p, text); console.log(f, Object.entries(o.items && o.itemsByLocale ? o.itemsByLocale : o.items).map(([l, a]) => l + ' ' + a.length).join(' · ')); }
}
if (stale) process.exit(1);
