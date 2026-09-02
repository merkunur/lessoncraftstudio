#!/usr/bin/env node
/**
 * measure-instruction-window.js <staging-dir> [...]
 *
 * For every staged deck whose meta description does NOT carry its own
 * instruction, print the EXACT length window an instruction must land in to win
 * the slot, measured against the real engine rather than estimated.
 *
 * bandedDescription assembles `lead + ". " + middle + "." + descTail` and takes
 * the LONGEST candidate inside [120,170]. The competing candidate is the
 * family-level skill sentence, so a per-face instruction must be
 *
 *   long enough to beat the skill sentence that currently wins   (> gLen)
 *   short enough that the whole description stays <= 170          (<= 170-fixed)
 *
 * where `fixed` is everything except the middle, recovered from the shipped
 * description by subtracting the middle actually used. That makes the window
 * exact for this face in this locale, which is what the earlier "60-75 chars"
 * guidance was not: the lead carries the TITLE, so the budget is per-face.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..', '..', '..');
const WSG = path.join(ROOT, 'scripts', 'worksheet-gen');

const dirs = process.argv.slice(2);
if (!dirs.length) { console.error('usage: measure-instruction-window.js <staging-dir> [...]'); process.exit(2); }

const sCache = new Map(), kCache = new Map();
const strings = (l) => { if (!sCache.has(l)) sCache.set(l, JSON.parse(fs.readFileSync(path.join(WSG, 'i18n', `strings.${l}.json`), 'utf8'))); return sCache.get(l); };
function skills(l) {
  if (!kCache.has(l)) {
    const p = path.join(WSG, 'i18n', `skill-sentences.${l}.json`);
    kCache.set(l, fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {});
  }
  return kCache.get(l);
}
const faceId = (v) => { const m = String(v || '').match(/^(k|g\d)(\d+)$/i); return m ? `${m[1].toUpperCase()}-${m[2]}` : null; };

let rows = [], read = 0;
for (const dir of dirs) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.zip'))) {
    const z = new AdmZip(path.join(dir, f));
    const man = JSON.parse(z.getEntry('manifest.json').getData().toString('utf8'));
    const html = z.getEntry('deck.html').getData().toString('utf8');
    read++;
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    const id = faceId(man.variant_id);
    const entry = strings(man.language)[id];
    if (!desc || !id || !entry) continue;
    const stem = entry.instruction.replace(/[.!?…]+\s*$/, '').trim();
    if (desc.includes(stem)) continue;

    // recover the middle actually used: the longest skill sentence present
    const fam = man.exercise_type || (man.generator && man.generator.app);
    const cand = Object.values(skills(man.language)[fam] || {})
      .concat(Object.values((skills('en')[fam]) || {}))
      .filter((s) => typeof s === 'string' && s.trim())
      .map((s) => s.replace(/[.!?…]+\s*$/, '').trim())
      .filter((s) => desc.includes(s))
      .sort((a, b) => b.length - a.length);
    if (!cand.length) { rows.push({ loc: man.language, id, cur: stem.length, note: 'middle unrecoverable (no skill sentence matched) — measure by hand' }); continue; }
    const g = cand[0];
    const fixed = desc.length - g.length;                 // lead + ". " + "." + tail
    rows.push({ loc: man.language, id, fam, cur: stem.length, min: g.length + 1, max: 170 - fixed, gen: g });
  }
}
if (!read) { console.error('VACUOUS: no zips read'); process.exit(2); }
rows.sort((a, b) => a.loc.localeCompare(b.loc) || a.id.localeCompare(b.id));
console.log(`read ${read} staged decks; ${rows.length} need a re-fitted instruction\n`);
for (const r of rows) {
  if (r.note) { console.log(`${r.loc} ${r.id}  current ${r.cur}  ${r.note}`); continue; }
  const ok = r.max >= r.min;
  console.log(`${r.loc} ${r.id.padEnd(7)} current ${String(r.cur).padStart(3)}  ->  WINDOW ${r.min}-${r.max}${ok ? '' : '   *** IMPOSSIBLE: shorten the TITLE to open a window ***'}`);
}
const impossible = rows.filter((r) => !r.note && r.max < r.min);
console.log(`\n${rows.length} to re-fit; ${impossible.length} impossible without shortening the title`);
