#!/usr/bin/env node
/**
 * build-blend-bank.js — data/literacy/blends.json, the item bank of G1-493 Blends (Phonics & Sounds maker 2026-11-02,
 * NEW-TEMPLATES §38 T2; RF.1.3 consonant blends): pictures whose name starts with two consonant letters that are BOTH
 * heard (fr-og, st-ar — two letters, two sounds; a digraph is two letters, one sound, and has its own family).
 *
 *   - each language's own blend list (BLENDS): the clusters its school teaches at the start of a word (es "sílabas
 *     trabadas", de "Konsonantenhäufungen" incl. Sp / St, Nordic s-clusters); fi has no native initial clusters (refused)
 *   - the word's third letter is a vowel letter (CCV: fr-og), so no three-consonant start and no digraph hides in it
 *   - a pair that is NOT two sounds before some vowels is left out there: Nordic sk + i e y ä ö ø æ (said sj), it sc + i e
 *     (said sh) and gl + i (said lj), en sc + e i (scissors)
 *   - a picture of a thing (the vocabulary's noun tell), one word met once, at most 9 letters; a blend with fewer than 4
 *     pictures is left out of the language (a page needs other words of it)
 *   - pictures: the key's reviewed picture where one exists (letter chart, K-228), else its first colour picture; every
 *     picture a child names with another word is refused (lib/picture-name-refusals.js, by noun)
 *
 *   node tools/build-blend-bank.js [--check] [--dump]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'data', 'literacy', 'blends.json');
const { vocab, displayWord } = require('../lib/b2-common.js');
const { manifest, labelSafeNouns } = require('../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../lib/picture-name-refusals.js');
const LP = require('../data/alphabet/letter-pictures.json').letters;
const SORT = require('../data/literacy/sort-by-beginning-sound.json');
const LK = require('../data/literacy/letter-knowledge.json');
// chart pictures a child names otherwise when no word stands beside them (a narwhal is "Wal", a hen "chicken" / "kip")
const UNAIDED_KEYS = new Set(['narwhal', 'hen']);
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));

const BLENDS = {
  en: 'bl br cl cr dr fl fr gl gr pl pr sk sl sm sn sp st sw tr tw',
  de: 'bl br dr fl fr gl gr kl kn kr pl pr tr zw',   // not Sp / St: said schp / scht, a spelling rule of its own (review)
  fr: 'bl br cl cr dr fl fr gl gr pl pr tr vr',
  es: 'bl br cl cr dr fl fr gl gr pl pr tr',
  pt: 'bl br cl cr dr fl fr gl gr pl pr tr',
  it: 'bl br cl cr dr fl fr gl gr pl pr sp st tr',
  nl: 'bl br dr fl fr gl gr kl kn kr pl pr sl sm sn sp st tr zw',
  sv: 'bl br dr fl fr gl gr kl kn kr pl pr sk sl sm sn sp st sv tr',
  da: 'bl br dr fl fr gl gr kl kn kr pl pr sk sl sm sn sp st sv tr',
  no: 'bl br dr fl fr gl gr kl kn kr pl pr sk sl sm sn sp st sv tr',
};
// a pair that is one sound before these vowels
const NOT_TWO = { sv: { sk: /[ieyäö]/ }, da: { sk: /[ieyæø]/ }, no: { sk: /[ieyøæ]/ }, it: { sc: /[ie]/, gl: /i/ }, en: { sc: /[ei]/ } };
// words a review refused (2026-11-02): en is American English (pants); a picture named otherwise (Trauben → Weintrauben,
// Truthahn → Pute, clôture → barrière, placard → armoire, floresta → mata, skåpbil → bil, klippa → berg, flicka → tjej) or a
// word a 6-year-old does not know (cruche, bretzel, pretzel, trailer, stetoskop)
const REJECT = {
  en: ['trousers'], de: ['Trauben', 'Truthahn'], fr: ['clôture', 'placard', 'cruche', 'bretzel'], pt: ['pretzel', 'trailer', 'floresta'],
  sv: ['skåpbil', 'klippa', 'stetoskop', 'flicka'], da: ['klippe', 'stetoskop'], no: ['stetoskop'],
};

function pictureIndex() {
  const refused = (t, n) => nameRefused(t, n) || REFUSED_NOUNS.has(n);
  const first = new Map();
  for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) {
    for (const n of labelSafeNouns(theme)) { const k = n.vocabKey || n.noun; if (!first.has(k) && !refused(theme, n.noun)) first.set(k, { theme, noun: n.noun }); }
  }
  const reviewed = new Map();
  for (const by of Object.values(LP)) for (const list of Object.values(by)) for (const e of list) if (!reviewed.has(e.key) && !refused(e.theme, e.noun) && !UNAIDED_KEYS.has(e.key)) reviewed.set(e.key, { theme: e.theme, noun: e.noun });
  for (const list of Object.values(SORT.itemsByLocale || {})) for (const e of list) { const k = e.key || e.noun; if (e.theme && e.noun && !reviewed.has(k) && !refused(e.theme, e.noun)) reviewed.set(k, { theme: e.theme, noun: e.noun }); }
  return (key) => reviewed.get(key) || first.get(key) || null;
}

function build() {
  const pic = pictureIndex(), V = vocab();
  // table: every blend of the language (a K-1 option chip needs no picture); blends: those with 4+ pictures (the answers)
  const out = { _note: 'tools/build-blend-bank.js — pictures whose name starts with a two-consonant blend of the language (CCV). fi refused. Do not edit.', table: {}, blends: {}, items: {}, refused: ['fi'] };
  for (const [loc, list] of Object.entries(BLENDS)) {
    const blends = list.split(' '), vw = LK.vowels[loc] || 'aeiou';
    const isV = (ch) => vw.includes(ch) || vw.includes(ch.normalize('NFD')[0]);
    const by = new Map(), seen = new Set();
    for (const key of Object.keys(V).sort()) {
      const v = V[key];
      if (!v[loc] || !(v.de && v.de[2])) continue;
      // a plural picture beside its singular is the same word twice (crayon / crayons, pretzel / pretzels)
      if (key.endsWith('s') && V[key.slice(0, -1)]) continue;
      const word = displayWord(v[loc][0], loc), low = word.toLocaleLowerCase(loc);
      if (!/^\p{L}+$/u.test(word) || [...word].length > 9 || seen.has(low) || (REJECT[loc] || []).includes(word)) continue;
      const b = low.slice(0, 2), third = [...low][2];
      if (!blends.includes(b) || !third || !isV(third)) continue;
      const nt = (NOT_TWO[loc] || {})[b];
      if (nt && nt.test(third)) continue;
      const p = pic(key);
      if (!p) continue;
      seen.add(low);
      if (!by.has(b)) by.set(b, []);
      by.get(b).push({ theme: p.theme, noun: p.noun, key, word, blend: b });
    }
    const keep = [...by].filter(([, a]) => a.length >= 4).sort(([a], [b]) => a.localeCompare(b));
    out.table[loc] = blends;
    out.blends[loc] = keep.map(([b]) => b);
    out.items[loc] = keep.flatMap(([, a]) => a.sort((x, y) => [...x.word].length - [...y.word].length).slice(0, 10));
  }
  return out;
}

const b = build();
if (process.argv.includes('--dump')) {
  for (const [loc, list] of Object.entries(b.items)) {
    const g = {};
    for (const x of list) (g[x.blend] = g[x.blend] || []).push(x.word);
    console.log(`${loc} (${list.length}, ${b.blends[loc].length} blends): ` + Object.entries(g).map(([k, w]) => `${k}: ${w.join(' ')}`).join(' | '));
  }
  process.exit(0);
}
const text = JSON.stringify(b, null, 1) + '\n';
if (process.argv.includes('--check')) { if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf8') !== text) { console.error('blends.json is STALE'); process.exit(1); } console.log('blends: current'); }
else { fs.writeFileSync(OUT, text); console.log('blends.json', Object.entries(b.items).map(([l, a]) => `${l} ${a.length}/${b.blends[l].length}`).join(' · ')); }
