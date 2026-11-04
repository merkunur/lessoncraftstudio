#!/usr/bin/env node
/**
 * build-sound-position-banks.js — the item banks of K-221 Beginning Sounds, K-226 Ending Sounds and K-227 Middle Sounds
 * (data/literacy/{beginning,ending,middle}-sounds.json), built from the platform's REVIEWED sound data instead of a word
 * list read by eye (2026-11-02, the Phonics & Sounds maker). The old banks asked for a word's first / last / middle
 * LETTER and called it a sound: a silent letter (comb → b, fr lit → t, nez → z, loup → p, de Kuh → h), a letter that is
 * not a vowel in a "write the vowel" task (fr dé → d, pt pé → p), a first letter whose sound is another (en iron, ear,
 * xylophone; sv/da xylofon) — none of which a child can hear.
 *
 *   beginning  the letter-picture chart (data/alphabet/letter-pictures.json): up to three pictures per letter whose name
 *              starts with that letter's SOUND, every picture opened, every word read by a native + pedagogy review
 *   ending     the sound-boxes segmentations (data/b3/sound-boxes.js + data/b3/locales/sound-boxes.<loc>.json, one box
 *              per SOUND, a silent letter merged into its neighbour's box): a word whose last box is ONE letter that the
 *              locale pronounces as itself at the end of a word (END_OK below — de/nl final b d g are said p t k, pt
 *              final o e are said u i, da final stops are unaspirated …)
 *   middle     the same segmentations: a one-syllable word of exactly three sounds, consonant – ONE vowel letter –
 *              consonant (fr/es/it/pt/fi have too few such words with a picture: the template is refused there)
 *
 * A picture is the key's reviewed picture where one exists (the letter chart, the K-228 sort bank), else its first colour
 * library picture; refused pictures (lib/picture-name-refusals.js) are never used. Words a review refused are listed
 * in REJECT below.
 *
 *   node tools/build-sound-position-banks.js [--check] [--dump]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data', 'literacy');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const { bank } = require('../lib/b3-common.js');
const { vocab, displayWord } = require('../lib/b2-common.js');
const { manifest, labelSafeNouns } = require('../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../lib/picture-name-refusals.js');
// a drawing refused in one theme is the same drawing in the others: a name task refuses the NOUN
// chart pictures a child names otherwise when no word stands beside them (a narwhal is "Wal", a hen "chicken" / "kip")
// ONE list, the chart's own (2026-11-03: this file kept a copy that missed wolf and goose)
const { UNAIDED_KEYS, SOUND_NAME_RISK } = require('../types/_shared/alphabet-more.js');
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const refusedPic = (theme, noun) => nameRefused(theme, noun) || REFUSED_NOUNS.has(noun);
const LP = require('../data/alphabet/letter-pictures.json').letters;
const SORT = require('../data/literacy/sort-by-beginning-sound.json');
const LK = require('../data/literacy/letter-knowledge.json');

// the last box may be one of these letters: a letter the locale says as itself at the end of a word, for a K child
const END_OK = {
  en: 'bdfgklmnpstz',            // a vowel letter at the end is never its short sound (pizza, kiwi …); x is two sounds
  de: 'fklmnpstzaeiou',          // b d g are said p t k (Auslautverhärtung); r is vocalised
  nl: 'fklmnprstaeiou',          // b d g are said p t x; -en is said -e (the n rule below)
  fr: 'cfklprstaiouéè',          // the segmentation merges silent final letters, so a final box letter is said (coq: /k/, not q)
  es: 'aeiolnrs',                // d (red) and z (pez, said s) and j (reloj) and y (rey) are not their letter's sound
  it: 'aeiolnr',
  pt: 'aiu',                     // final o / e are said u / i (gato, leite), l is said u, m nasalises, s / r / z vary
  sv: 'bdfklmnprstvaeiouyåäö',   // g after l / r is said j (älg, berg): g is left out
  no: 'bfklmnprstvaeiouyæøå',    // d and g are often silent (bord, deig)
  da: 'flmnsaeiouyæøå',          // final p t k b d g r v are not said as themselves (kop, kat, ræv, hav)
  fi: 'aeiouyäönstlr',
};
// middle: these locales have too few one-syllable C-V-C words with a picture for a page (the template is refused)
const MIDDLE_REFUSED = new Set(['fr', 'es', 'it', 'pt', 'fi']);
// words a review refused, per bank (filled from the review)
const REJECT = {
  beginning: {},
  // the native + pedagogy review of the rebuilt banks (2026-11-02): an ng-final loan (Ballon), a picture named with
  // another word (Elf → Elfe, Henne → Huhn, sofa → canapé, bote → barco in Mexico, jasje → jas, eendje → eend, kon), a
  // word a child does not use (pajar), a duplicate (elvisp / visp)
  ending: { de: ['Ballon', 'Elf', 'Henne'], fr: ['sofa'], es: ['pajar', 'bote'], nl: ['jasje', 'eendje'], sv: ['kon', 'elvisp'], da: ['ballon'] },
  // a hen a child calls chicken / kip; long ä heard as e; Danish short o = å and short e = æ by ear
  middle: { en: ['hen'], de: ['Bär'], nl: ['hen'], sv: ['kon'], da: ['kop', 'sok', 'pen', 'sæk'], no: ['tog'] },
};
/** sv / no: a short o (before a double consonant) is said å, a short ä (before ng, ck or a double) is said e: a listening
 * child writes another vowel, so those middles are left out (review 2026-11-02: boll kopp mopp säng säck, no kopp vott) */
const nordicMiddleOk = (flat, loc) => {
  if (!['sv', 'no'].includes(loc)) return true;
  const [, v, c2] = flat, dbl = [...c2].length === 2 && (c2[0] === c2[1] || c2 === 'ck' || c2 === 'ng');
  return !(dbl && (v === 'o' || v === 'ä'));
};

const lower = (s, loc) => s.toLocaleLowerCase(loc);
const vowelsOf = (loc) => new Set([...(LK.vowels[loc] || 'aeiou')]);

/** en middle letters that are not their short sound in this frame (ball, car, saw, for, bull, put, wash …) */
function enMiddleOk(flat) {
  const [c1, v, c2] = flat;
  if (v === 'a' && /^(ll|l|lk|r|w|wn)$/.test(c2)) return false;
  if (v === 'a' && /^(w|wh|qu)$/.test(c1)) return false;
  if (v === 'o' && /^(r|w|wn|ll)$/.test(c2)) return false;
  if (v === 'u' && /^(b|p|f|sh)$/.test(c1) && /^(ll|sh|t|sh)$/.test(c2)) return false;
  if (/^(r|w)$/.test(c2)) return false;
  return true;
}

function pictureIndex() {
  const first = new Map();
  for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) {
    for (const n of labelSafeNouns(theme)) {
      const k = n.vocabKey || n.noun;
      if (!first.has(k) && !refusedPic(theme, n.noun)) first.set(k, { theme, noun: n.noun });
    }
  }
  // reviewed pictures win: the letter chart, then the K-228 bank
  const reviewed = new Map();
  for (const by of Object.values(LP)) for (const list of Object.values(by)) for (const e of list) if (!reviewed.has(e.key) && !refusedPic(e.theme, e.noun) && !UNAIDED_KEYS.has(e.key)) reviewed.set(e.key, { theme: e.theme, noun: e.noun });
  for (const list of Object.values(SORT.itemsByLocale || {})) for (const e of list) {
    const k = e.key || e.noun;
    if (e.theme && e.noun && !reviewed.has(k) && !refusedPic(e.theme, e.noun)) reviewed.set(k, { theme: e.theme, noun: e.noun });
  }
  return (key) => (reviewed.has(key) ? { ...reviewed.get(key), reviewed: true } : first.get(key) || null);
}

function build() {
  const pic = pictureIndex();
  const V = vocab();
  const out = {
    beginning: { _note: 'tools/build-sound-position-banks.js — the reviewed letter-picture chart: every picture starts with its letter\'s SOUND. Do not edit.', items: {} },
    ending: { _note: 'tools/build-sound-position-banks.js — the reviewed sound-box segmentations: the last SOUND is one letter said as itself. Do not edit.', items: {} },
    middle: { _note: 'tools/build-sound-position-banks.js — one-syllable consonant-vowel-consonant words (sound-box segmentations); fr es it pt fi refused (too few). Do not edit.', items: {}, refused: [...MIDDLE_REFUSED] },
  };
  for (const loc of LOCS) {
    // beginning: the letter chart, letters in school order
    out.beginning.items[loc] = [];
    // a child writes the letter of the name it GIVES the picture: the chart's unaided-safe pictures only (no hen → chicken)
    for (const [letter, list] of Object.entries(require('../types/_shared/alphabet-more.js').unaidedChart(loc))) for (const e of list) {
      if ((REJECT.beginning[loc] || []).includes(e.word)) continue;
      out.beginning.items[loc].push({ theme: e.theme, noun: e.noun, key: e.key, word: e.word, answer: letter });
    }
    // ending + middle: the segmentations
    const cfg = bank('sound-boxes', loc), vw = vowelsOf(loc);
    const isV = (g) => [...g].length === 1 && (vw.has(g) || vw.has(g.normalize('NFD')[0]));
    const end = [], mid = [], seenE = new Set(), seenM = new Set();
    for (const [key, rows] of Object.entries(cfg.bank || {}).sort(([a], [b]) => a.localeCompare(b))) {
      if ((cfg.exclude || []).includes(key) || !V[key] || !V[key][loc]) continue;
      const p = pic(key);
      if (!p) continue;
      const word = displayWord(V[key][loc][0], loc), flat = rows.flat();
      if (!/^\p{L}+$/u.test(word) || flat.join('') !== lower(word, loc)) continue;
      // a picture of a THING (the vocabulary's noun tell: a de gender), not a colour, a feeling or a season
      if (!(V[key].de && V[key].de[2])) continue;
      const last = flat[flat.length - 1];
      const endOk = [...last].length === 1 && END_OK[loc].includes(last) && !(loc === 'nl' && last === 'n' && flat[flat.length - 2] === 'e')
        && !(loc === 'sv' && last === 'g')
        // en s is said z after a voiced sound (cards, jeans, stairs): only -us and s after a voiceless t k p f are kept
        && !(loc === 'en' && last === 's' && !/^(u|t|k|ck|p|f|ff)$/.test(flat[flat.length - 2] || ''));
      // a K word: one or two syllables, met once
      // a picture a child names with another word that ends / sounds otherwise (data/literacy/sound-name-risk.json)
      const riskE = ((SOUND_NAME_RISK.ending || {})[loc] || {})[key] != null, riskM = ((SOUND_NAME_RISK.middle || {})[loc] || {})[key] != null || UNAIDED_KEYS.has(key);
      if (endOk && !riskE && !UNAIDED_KEYS.has(key) && rows.length <= 2 && !seenE.has(word) && !(REJECT.ending[loc] || []).includes(word) && seenE.add(word)) end.push({ theme: p.theme, noun: p.noun, key, word, answer: last, reviewed: !!p.reviewed });
      const cvc = rows.length === 1 && flat.length === 3 && isV(flat[1]) && !isV(flat[0]) && !isV(flat[2]) && (loc !== 'en' || enMiddleOk(flat)) && nordicMiddleOk(flat, loc);
      if (cvc && !riskM && !MIDDLE_REFUSED.has(loc) && !seenM.has(word) && !(REJECT.middle[loc] || []).includes(word) && seenM.add(word)) mid.push({ theme: p.theme, noun: p.noun, key, word, answer: flat[1] });
    }
    // at most 8 words per ending letter — a reviewed picture first, then the shorter word (a bank a reviewer reads whole)
    const byEnd = new Map();
    for (const x of end) { if (!byEnd.has(x.answer)) byEnd.set(x.answer, []); byEnd.get(x.answer).push(x); }
    out.ending.items[loc] = [...byEnd.values()].flatMap((list) => list.sort((a, b) => (b.reviewed - a.reviewed) || ([...a.word].length - [...b.word].length) || a.word.localeCompare(b.word, loc)).slice(0, 8))
      .map(({ reviewed, ...x }) => x);
    if (!MIDDLE_REFUSED.has(loc)) out.middle.items[loc] = mid;
  }
  return out;
}

const banks = build();
const files = { beginning: 'beginning-sounds.json', ending: 'ending-sounds.json', middle: 'middle-sounds.json' };
if (process.argv.includes('--dump')) {
  for (const [b, o] of Object.entries(banks)) for (const [loc, list] of Object.entries(o.items)) console.log(`${b} ${loc} (${list.length}): ${list.map((e) => e.word + '→' + e.answer).join('  ')}`);
  process.exit(0);
}
let stale = 0;
for (const [b, f] of Object.entries(files)) {
  const text = JSON.stringify(banks[b], null, 1) + '\n', p = path.join(DATA, f);
  if (process.argv.includes('--check')) { if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== text) { console.error(f + ' is STALE'); stale++; } }
  else { fs.writeFileSync(p, text); console.log(f, Object.entries(banks[b].items).map(([l, a]) => l + ' ' + a.length).join(' · ')); }
}
if (stale) process.exit(1);
