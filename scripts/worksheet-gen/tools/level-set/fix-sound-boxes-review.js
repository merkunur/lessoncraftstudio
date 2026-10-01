#!/usr/bin/env node
/**
 * fix-sound-boxes-review.js [--apply] — the Sound Boxes native review (Level Set 2026-10-01), applied at the source:
 * data/b3/locales/sound-boxes.<loc>.json (the generated locale block the type reads) AND its draft
 * i18n/.draft-b3-<loc>.json banks['sound-boxes'] (kept identical, so a later apply-b3-locale cannot undo it).
 *
 * Box-level rules (one box = one SOUND, the locale's K-1 convention):
 *   de, nl  a doubled consonant is ONE sound (Kamm = K·a·mm), as en / sv / no / da already write it
 *   de      st / sp not at the start of the word are two sounds (Wurst = W·u·r·s·t); nk is two (Schrank = …·n·k)
 *   pt      a nasal vowel coda is one sound (anjo = an·j·o, trem = t·r·em); BR ou is one sound (touro = t·ou·r·o)
 *   no      the diphthongs ei, au, ai, øy are one sound (sau = s·au)
 *   nl      the klankgroepen aai, eeuw and sj are one sound (kraai = k·r·aai, sjaal = sj·aa·l)
 * A merge inside one syllable row keeps the row equal to the approved split; a merge across a seam moves the
 * doubled letter into the later syllable and lists the key in remergeAcrossSyllable (the validator's escape).
 * Syllable splits the reviewer disputed, and every re-seated word, leave texBoundary (no arc prints them).
 * Words the reviewer refused join `exclude`. Prints every change; writes only with --apply.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..', '..');
const APPLY = process.argv.includes('--apply');

const EXCLUDE = {
  de: ['lighthouse', 'nightstand', 'paramedic', 'bookcase', 'bookshelf', 'motorcycle', 'plunger', 'forget-me-not', 'zinnia', 'florist', 'petunia', 'barber', 'medal', 'donut', 'doughnut', 'bagel', 'tablet', 'muffin', 'badge', 'hawk', 'lily'],
  es: ['beige', 'scooter', 'muffin', 'sweatpants', 'pizza', 'gopher', 'aster', 'stretcher'],
  fr: ['muffin', 'badger'],
  it: ['aster', 'mistletoe', 'chipmunk', 'merry', 'confused', 'lemur', 'venus', 'uranus', 'neptune', 'jupiter', 'mars'],
  pt: ['macaron', 'muffin', 'trillium', 'jasmine', 'bacon', 'bagel', 'tablet', 'skateboard', 'aster', 'zinnia', 'venus', 'uranus', 'neptune', 'jupiter', 'mars'],
  nl: ['medal', 'muffin', 'parallelogram', 'oar', 'watch', 'yacht', 'trillium', 'aster'],
  sv: ['gopher', 'garland', 'lemur', 'manatee', 'mistletoe', 'aster'],
  da: ['bird', 'kingfisher', 'peacock', 'snail', 'oven', 'toad', 'crow', 'kite', 'quail', 'heron', 'phlox', 'ottoman'],
  no: ['galaxy', 'mercury', 'neptune', 'jupiter', 'forsythia', 'phlox', 'aster', 'manatee', 'weasel', 'badge'],
  fi: ['bagel'],
};
// disputed printed syllable splits: never drawn as arcs
const NO_ARCS = {
  en: ['baby', 'balloon', 'bucket', 'jacket', 'rocket', 'leggings', 'mitten', 'rabbit', 'raccoon', 'slippers', 'robot', 'sofa'],
  de: ['cat', 'beanie', 'puddle', 'cheeks', 'finger', 'singer', 'cap'],
  es: ['ray'],
  fr: ['apple', 'ball', 'beanie', 'boots', 'dresser', 'cushion', 'hedgehog', 'shovel', 'sausage', 'pizza'],
  it: ['ribbon'],
  sv: ['balloon', 'crab', 'mosquito', 'otter', 'pen', 'pinecone', 'rock', 'shelf', 'toad', 'water', 'lettuce', 'coat', 'flower'],
  da: ['cabin'],
  no: ['balloon'],
};
const VOW = 'aeiouyäöüåæøáéíóúâêôãõàèìòùî';
const isV = (s) => [...s].every((c) => VOW.includes(c.toLowerCase()));
const isCons1 = (s) => [...s].length === 1 && /\p{L}/u.test(s) && !VOW.includes(s.toLowerCase());

function fixRows(loc, key, rows) {
  // flatten with a row index, rewrite, regroup
  let flat = [];
  rows.forEach((r, ri) => r.forEach((g) => flat.push({ g, ri })));
  let crossed = false;
  const merge = (i, g, ri) => { flat.splice(i, 2, { g, ri }); };
  for (let i = 0; i < flat.length - 1; i++) {
    const a = flat[i], b = flat[i + 1];
    if ((loc === 'de' || loc === 'nl') && isCons1(a.g) && a.g.toLowerCase() === b.g.toLowerCase()) {
      if (a.ri !== b.ri) crossed = true;
      merge(i, a.g + b.g, b.ri); continue;   // the doubled letter rides in the later syllable (en rab|bit -> r,a | bb,i,t)
    }
    if (loc === 'no' && a.ri === b.ri && ['ei', 'au', 'ai', 'øy'].includes((a.g + b.g).toLowerCase()) && [...a.g].length === 1 && [...b.g].length === 1) { merge(i, a.g + b.g, a.ri); continue; }
    if (loc === 'nl' && a.ri === b.ri && (a.g + b.g).toLowerCase() === 'aai' && a.g.toLowerCase() === 'aa') { merge(i, a.g + b.g, a.ri); continue; }
    if (loc === 'nl' && a.g.toLowerCase() === 's' && b.g.toLowerCase() === 'j') { if (a.ri !== b.ri) crossed = true; merge(i, a.g + b.g, b.ri); continue; }   // jas|je -> ja | sje
    if (loc === 'pt' && a.ri === b.ri && a.g.toLowerCase() === 'o' && b.g.toLowerCase() === 'u') { merge(i, a.g + b.g, a.ri); continue; }
  }
  if (loc === 'nl') for (let i = 0; i < flat.length - 2; i++) {
    const [a, b, c] = flat.slice(i, i + 3);
    if (a.ri === b.ri && b.ri === c.ri && a.g.toLowerCase() === 'ee' && b.g.toLowerCase() === 'u' && c.g.toLowerCase() === 'w') flat.splice(i, 3, { g: a.g + b.g + c.g, ri: a.ri });
  }
  if (loc === 'pt') {
    // nasal coda: a vowel followed by n / m that closes its syllable row
    for (let i = 0; i < flat.length - 1; i++) {
      const a = flat[i], b = flat[i + 1];
      const lastInRow = !flat[i + 2] || flat[i + 2].ri !== b.ri;
      if (a.ri === b.ri && isV(a.g) && [...a.g].length === 1 && /^[nm]$/i.test(b.g) && lastInRow) merge(i, a.g + b.g, a.ri);
    }
  }
  if (loc === 'de') {
    const out = [];
    flat.forEach((x, i) => {
      // st / sp that START a syllable are the /ʃt/ /ʃp/ sound (Blei·stift, Gabel·stapler) — only a syllable-final one splits
      const firstInRow = i === 0 || flat[i - 1].ri !== x.ri;
      if (!firstInRow && (x.g.toLowerCase() === 'st' || x.g.toLowerCase() === 'sp')) { out.push({ g: x.g[0], ri: x.ri }, { g: x.g.slice(1), ri: x.ri }); return; }
      if (x.g.toLowerCase() === 'nk') { out.push({ g: x.g[0], ri: x.ri }, { g: x.g.slice(1), ri: x.ri }); return; }
      out.push(x);
    });
    flat = out;
  }
  const nr = [];
  for (const x of flat) { (nr[x.ri] = nr[x.ri] || []).push(x.g); }
  return { rows: nr.filter(Boolean), crossed };
}

const LOCS = ['de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
let changed = 0;
for (const loc of LOCS) {
  const dataP = path.join(WG, 'data', 'b3', 'locales', `sound-boxes.${loc}.json`);
  const draftP = path.join(WG, 'i18n', `.draft-b3-${loc}.json`);
  const raw = fs.readFileSync(dataP, 'utf8');
  const blk = JSON.parse(raw);
  const draftRaw = fs.readFileSync(draftP, 'utf8');
  const draft = JSON.parse(draftRaw);
  if (JSON.stringify(draft.banks['sound-boxes'].bank) !== JSON.stringify(blk.bank)) throw new Error(loc + ': draft and data blocks differ — reconcile first');
  const remerge = new Set(blk.remergeAcrossSyllable || []);
  const tex = new Set(blk.texBoundary || []);
  for (const [key, rows] of Object.entries(blk.bank)) {
    const { rows: nr, crossed } = fixRows(loc, key, rows);
    if (JSON.stringify(nr) !== JSON.stringify(rows)) {
      console.log(`${loc} ${key}: ${rows.map((r) => r.join('·')).join(' | ')}  ->  ${nr.map((r) => r.join('·')).join(' | ')}${crossed ? '  (re-seated)' : ''}`);
      blk.bank[key] = nr; changed++;
      if (crossed || nr.length !== rows.length) { remerge.add(key); tex.delete(key); }
    }
  }
  for (const k of NO_ARCS[loc] || []) tex.delete(k);
  const ex = new Set(blk.exclude || []);
  for (const k of EXCLUDE[loc] || []) { if (!ex.has(k)) console.log(`${loc} exclude ${k}${blk.bank[k] ? '' : ' (not in bank)'}`); ex.add(k); }
  blk.exclude = [...ex].sort();
  blk.remergeAcrossSyllable = [...remerge].sort();
  blk.texBoundary = (blk.texBoundary || []).filter((k) => tex.has(k));
  if (APPLY) {
    const nl = raw.endsWith('\n') ? '\n' : '';
    fs.writeFileSync(dataP, JSON.stringify(blk, null, 2) + nl);
    const sb = draft.banks['sound-boxes'];
    for (const f of ['bank', 'exclude', 'remergeAcrossSyllable', 'texBoundary']) sb[f] = blk[f];
    const dnl = draftRaw.endsWith('\n') ? '\n' : '';
    const indent = /^\{\n( +)"/.exec(draftRaw);
    fs.writeFileSync(draftP, JSON.stringify(draft, null, indent ? indent[1].length : 2) + dnl);
  }
}
// en: the hand-authored block in data/b3/sound-boxes.js — only its texBoundary (arcs) changes
console.log(`${changed} rows changed${APPLY ? ' (written)' : ' (dry run)'}`);
