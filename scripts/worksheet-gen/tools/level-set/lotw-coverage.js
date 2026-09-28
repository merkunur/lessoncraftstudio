#!/usr/bin/env node
/**
 * lotw-coverage.js — Level Set 2026-09-28 (Letter of the Week, whole alphabet): for every letter of every
 * locale's alphabet, the pages that exist (published or in the waves) or the reason there are none.
 *
 *   node tools/level-set/lotw-coverage.js [--strict]
 *
 * A letter is COVERED when it has at least one page (any face, any level). An uncovered letter must be a panel
 * refusal (with its reason); --strict exits 1 on any letter that is neither.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { alphabets } = require('../../data/literacy/letter-knowledge.json');
const { bank } = require('../../lib/b3-common.js');

const ROOT = path.join(__dirname, '..', '..');
const LS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'b3', 'letter-of-the-week-levelset.json'), 'utf8'));
const FACES = ['K-317', 'K-325', 'K-326', 'K-327', 'K-328'];
const FACE_FILES = { 'K-317': 'k/K-317-letter-of-the-week', 'K-325': 'k/K-325-letter-of-the-week-words-with', 'K-326': 'k/K-326-letter-of-the-week-beginning-middle-end', 'K-327': 'k/K-327-letter-of-the-week-circle-and-count', 'K-328': 'k/K-328-letter-of-the-week-m-or-n' };
const { makeRng } = require('../../lib/rng.js');
let bad = 0;
for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const wave = JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', `wave-lotw-${loc}.json`), 'utf8'));
  const pages = {};   // letter → ["K-317 L1", …]
  const add = (L, s) => (pages[L] = pages[L] || []).push(s);
  const pub = bank('letter-of-the-week', loc);
  for (const f of FACES) add(pub.exemplar, `${f} L2*`);   // the published page (the exemplar letter, core level)
  for (const f of FACES) for (const [lv, list] of Object.entries((wave.levels || {})[f] || {})) for (const c of list) add(c.unit, `${f} L${lv}`);
  const refused = new Map(((LS[loc] || {}).refused || []).map((r) => [r.L, r.why]));
  const letters = [...alphabets[loc]];
  const lines = [];
  let covered = 0;
  for (const L of letters) {
    if (pages[L]) { covered++; lines.push(`  ${L}: ${pages[L].length} pages${pages[L].some((p) => p.startsWith('K-317')) ? '' : ' (no main page)'}`); continue; }
    if (refused.has(L)) { lines.push(`  ${L}: REFUSED — ${refused.get(L)}`); continue; }
    // not refused: every face must be below its floor for this letter — the builder's own refusal is the reason;
    // a face that BUILDS but is missing from the waves is a real gap
    const why = [];
    for (const [id, f] of Object.entries(FACE_FILES)) for (const d of [1, 2, 3]) {
      const t = require('../../types/' + f + '.js');
      if (!t.difficulty[d]) continue;
      try { t.build({ theme: null, difficulty: d, locale: loc, unit: L }, { rng: makeRng('cov-' + L), variant: 2 }); why.push(id + ' L' + d + ' BUILDS'); }
      catch (e) { if (id === 'K-317' && d === 2) why.unshift(e.message.replace(/^K-317: /, '')); }
    }
    const builds = why.filter((w) => / BUILDS$/.test(w));
    if (builds.length) { bad++; lines.push(`  ${L}: NO PAGE in the waves but ${builds.join(', ')}`); }
    else lines.push(`  ${L}: every page below its floor — ${why[0]}`);
  }
  console.log(`${loc}: ${covered}/${letters.length} letters have pages, ${[...refused.keys()].length} refused`);
  if (process.argv.includes('--verbose')) console.log(lines.join('\n'));
  else for (const l of lines) if (/REFUSED|NO PAGE|below its floor/.test(l)) console.log(l);
}
console.log(bad ? `\n${bad} letter(s) with no page and no refusal` : '\nevery letter has pages or a recorded refusal');
if (process.argv.includes('--strict') && bad) process.exit(1);
