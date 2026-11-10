#!/usr/bin/env node
/**
 * flagship/picks.js: does every picture a flagship template OFFERS build when a teacher picks it? (flagship visual check
 * 2026-11-08: the Dot to Dot picker offered pictures whose numbers had no room, and "Dot-to-Dot, Then Write the Word"
 * offered pictures with a two-word name; a pick of one was refused.) For each template of the maker, each level and each
 * language, it builds the page with every picture of that template's pool (out/flagship-check/pools.json, the pictures the
 * picker lists) as the teacher's pick, exactly as the maker does (overrides.art), and reports every build that throws, and
 * every build whose page does not show the picked picture (a pick silently replaced).
 *   node scripts/makers/flagship/picks.js --maker=how-to-draw [--t=K-396] [--locales=en,de] [--library]
 * --library: only the image library's pictures (the new drawings are tested after they are installed)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = require('../gates/lib/maker-pages.js');
const a = P.args();
const maker = a.maker;
const LOC = String(a.locales || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const pools = JSON.parse(fs.readFileSync(path.join(P.REPO, 'out', 'flagship-check', 'pools.json'), 'utf8'))[maker];
const IDX = JSON.parse(fs.readFileSync(path.join(P.REPO, 'scripts', 'worksheet-gen', 'data', 'fl', 'index.json'), 'utf8')).pictures;
const { tj } = P.builtMakers(maker)[0];
const all = (Array.isArray(tj.templates) ? tj.templates : tj).filter((t) => !a.t || t.id === a.t);
let n = 0, bad = 0, swapped = 0;
const by = {};
for (const t of all) {
  const tp = pools[t.id]; if (!tp) continue;
  let type; try { type = P.loadType(t); } catch (e) { console.log('no type', t.id); continue; }
  let tn = 0, tb = 0;
  for (const lv of [1, 2, 3]) {
    const pool = ((tp[lv] && tp[lv].pool) || []).filter((k) => !a.library || !(IDX[k] && IDX[k].n === 1));
    for (const loc of LOC) for (const key of pool) {
      n++; tn++;
      try {
        const r = P.buildShown(t, type, tj, loc, { difficulty: lv, theme: null, unit: null, variant: 1 }, { overrides: { art: [key] } });
        const shown = r && r.slots && r.slots.art && r.slots.art.values;
        if (shown && shown.length && !shown.includes(key)) { swapped++; const k = t.id + ' pick replaced'; by[k] = (by[k] || 0) + 1; if (by[k] <= 2) console.log(`${t.id} ${loc} L${lv} ${key}: page shows ${shown.join(',')}`); }
      } catch (e) {
        bad++; tb++;
        const k = t.id + ' ' + String(e.message).replace(/[a-z0-9-]+-bw[a-z0-9-]*/g, '<pic>').slice(0, 80);
        by[k] = (by[k] || 0) + 1;
        if (by[k] <= 2) console.log(`${t.id} ${loc} L${lv} ${key}: ${String(e.message).slice(0, 160)}`);
      }
    }
  }
  console.log(`  ${t.id}: ${tn} picks, ${tb} failed`);
}
console.log(`SUMMARY ${maker}: ${n} picks, ${bad} failed, ${swapped} replaced`);
for (const [k, v] of Object.entries(by).sort((x, y) => y[1] - x[1])) console.log(' ', v, k);
process.exit(bad || swapped ? 1 : 0);
