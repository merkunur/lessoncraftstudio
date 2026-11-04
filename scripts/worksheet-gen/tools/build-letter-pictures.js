#!/usr/bin/env node
/**
 * build-letter-pictures.js — data/alphabet/letter-pictures.json: for every letter of each locale's school alphabet, up to
 * three pictures whose name starts with that letter's sound (makers 2026-11-02; ENGINES [alphabet-Q1]). The candidates
 * come from tools/build-letter-picture-candidates.js (the phonics pipeline's approved words, the deny-onset rules); every
 * candidate picture was OPENED on a contact sheet and the ones a child would name otherwise are refused below (REJECT);
 * the words were then read by a native + pedagogy reviewer (WORD_REJECT: a word whose first sound is not the letter's for
 * a K child, or not the word a child gives the picture). A letter with no picture left stays empty — a page prints the
 * letter alone, never a wrong-sound picture.
 *
 *   node tools/build-letter-pictures.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const OUT = path.join(__dirname, '..', 'data', 'alphabet', 'letter-pictures.json');
const REJECT = require('../lib/picture-name-refusals.js').REFUSED;
// words the native + pedagogy review refused (2026-11-02): the first sound is not the letter's for a K child (en arm, acorn,
// iron, owl, oval; fr ovale = "un rond" to a child (2nd review 2026-11-02); pt es- said [is]; nl jam /ʒ/; da ind- said [en]; x said /s/ or [ks]/[ʃ]), a row with two sounds (nl
// camper /k/ beside cirkel /s/), or a picture a child names with another word — often one of ANOTHER row on the same page
// (en sack → bag, jug → pitcher; de Arzt → Doktor, Clownfisch → Fisch; nl hen → kip; it sofà → divano …)
const WORD_REJECT = {
  en: ['arm', 'acorn', 'iron', 'owl', 'oval', 'sack', 'jug'],
  de: ['Elf', 'Arzt', 'Clownfisch', 'Dachs'],
  fr: ['élan', 'pic', 'excavatrice', 'ovale', 'clou'],   // clou (11-04 review): C beside clé would show two /kl/ blends — C + a vowel (cœur) teaches the letter's sound
  es: ['bote', 'alce'],
  pt: ['aipo', 'alce', 'doce', 'escada', 'escadas', 'escova', 'elfo', 'xilofone'],   // escadas: the stairs' word since 11-03 (es- said [is], as escada)
  it: ['bagel', 'sofà', 'infermiera', 'viso', 'alce'],
  nl: ['jam', 'camper', 'gier', 'hen', 'das', 'duif'],
  sv: ['elvisp', 'isglass', 'gam', 'kon', 'xylofon', 'bo', 'narval'],
  da: ['indkøbsvogn', 'xylofon'],
  no: [],
  fi: ['brownie', 'bageli', 'greippi'],
};
// the review's own suggestions (vocab key per letter), each picture already opened on the contact sheets
const EXTRA = {
  en: { A: ['apple'], O: ['octopus'], S: ['sock', 'seal'] },
  de: { A: ['apple'], I: ['hedgehog', 'igloo'], S: ['sun', 'sofa'] },
  fr: { E: ['snail'], I: ['igloo', 'iguana'], 'É': ['star'] },
  es: { A: ['bee', 'airplane'], B: ['boat'], J: ['jug'] },
  pt: { A: ['bee', 'airplane'], E: ['elephant'] },
  nl: { H: ['hand'], J: ['dress'], K: ['chicken'] },   // J jurk: on the sheets since 11-02; "juf" (the teacher, refused picture) took its place in the window 11-04
  sv: { E: ['squirrel', 'elephant'], I: ['hedgehog', 'igloo'], N: ['nose', 'key'], 'Å': ['donkey'] },
  da: { I: ['igloo'], 'Æ': ['donkey'], N: ['nose'] },
};

function build() {
  const c = JSON.parse(execFileSync(process.execPath, [path.join(__dirname, 'build-letter-picture-candidates.js'), '--per=5'], { encoding: 'utf8', maxBuffer: 64 << 20 }));
  const { manifest, labelSafeNouns } = require('../image-cache/resolve.js');
  const { vocab, displayWord } = require('../lib/b2-common.js');
  // a vocab key's first colour picture, as the candidates (and so the contact sheets) took it
  const firstPic = new Map();
  for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) for (const n of labelSafeNouns(theme)) { const k = n.vocabKey || n.noun; if (!firstPic.has(k)) firstPic.set(k, { theme, noun: n.noun }); }
  const AW = (l) => Object.fromEntries(require(path.join(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output', `approved-words-${l}.json`)).entries.map((e) => [e.key, e.word]));
  const out = { _note: 'tools/build-letter-pictures.js — up to three pictures per letter whose name starts with the letter\'s sound; every picture opened, every word reviewed. An empty letter prints alone.', letters: {} };
  for (const [loc, by] of Object.entries(c)) {
    out.letters[loc] = {};
    for (const [unit, list] of Object.entries(by)) {
      // only the first four distinct words of each letter were put on the contact sheets (their first picture): never
      // list a picture nobody opened
      const seen = new Set(), keep = [];
      for (const x of list) {
        const w = x.word.toLocaleLowerCase(loc);
        if (seen.has(w)) continue;
        seen.add(w);
        if (seen.size > 4) break;
        const p = x.pics[0];
        if (REJECT.has(p.theme + '/' + p.noun) || (WORD_REJECT[loc] || []).includes(x.word)) continue;
        keep.push({ theme: p.theme, noun: p.noun, key: x.key, word: x.word });
        if (keep.length === 3) break;
      }
      for (const key of ((EXTRA[loc] || {})[unit] || [])) {
        if (keep.length === 3 || keep.some((k) => k.key === key)) continue;
        const p = firstPic.get(key), word = AW(loc)[key] || (vocab()[key] && displayWord(vocab()[key][loc][0], loc));
        if (!p || REJECT.has(p.theme + '/' + p.noun)) throw new Error(`letter-pictures: no reviewed picture for ${key}`);
        if (!word || !word.toLocaleLowerCase(loc).normalize('NFD').startsWith(unit.toLocaleLowerCase(loc).normalize('NFD'))) throw new Error(`letter-pictures: ${loc} ${key} = "${word}" does not start with ${unit}`);
        keep.push({ theme: p.theme, noun: p.noun, key, word });
      }
      out.letters[loc][unit] = keep;
    }
  }
  return JSON.stringify(out, null, 1) + '\n';
}

const text = build();
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('letter-pictures.json is STALE'); process.exit(1); } console.log('letter-pictures: current'); }
else { fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, text); const L = JSON.parse(text).letters; for (const [l, by] of Object.entries(L)) console.log(l, Object.entries(by).filter(([, a]) => !a.length).map(([u]) => u).join('') || '-', 'empty'); }
