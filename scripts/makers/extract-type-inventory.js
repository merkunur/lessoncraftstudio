#!/usr/bin/env node
/**
 * Maker inventory, step 1: one row per worksheet type.
 *
 * Reads every scripts/worksheet-gen/types/{k,g1,g2,g3}/*.js by require() (so a
 * variation that spreads its base carries the base's fields), records what a
 * maker needs to know about it, joins the teaching point + strand from the
 * activity coverage map, and marks the science types the makers leave out
 * (operator ruling 2026-10-31).
 *
 * Read-only apart from its one output: docs/makers/inventory/types.json.
 *   node scripts/makers/extract-type-inventory.js [--print-summary]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TYPES = path.join(ROOT, 'scripts', 'worksheet-gen', 'types');
const COVERAGE = path.join(ROOT, 'docs', 'activities-rebuild', 'coverage', 'coverage-map.json');
const OUT = path.join(ROOT, 'docs', 'makers', 'inventory', 'types.json');

// Science = the excluded strands. Health, road safety, social studies, SEL stay in.
const SCIENCE_STRAND = /science/i;
const SCIENCE_EXCEPTIONS = new Set(['Social Studies / Science']); // transport / things that fly: social studies
// The families the operator named (2026-10-31), whatever strand their types carry.
const SCIENCE_FAMILIES = new Set([
  'seasons', 'weather-symbols', 'human-body', 'five-senses', 'plants', 'habitats',
  'recycling', 'sink-or-float', 'earth-and-space', 'animal-life-cycles', 'water-cycle',
]);

function tpByType() {
  const map = new Map();
  for (const p of JSON.parse(fs.readFileSync(COVERAGE, 'utf8')).points) {
    for (const id of p.worksheets) map.set(id, { tp: p.tp, skill: p.skill, strand: p.strand || '', code: p.code || '' });
  }
  return map;
}

function requiresOf(src) {
  const out = [];
  const re = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(src))) out.push(m[1].replace(/^(\.\.\/)+/, ''));
  return out;
}

function main() {
  const tps = tpByType();
  const rows = [];
  const failures = [];
  for (const band of ['k', 'g1', 'g2', 'g3']) {
    const dir = path.join(TYPES, band);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
      const file = path.join(dir, f);
      const src = fs.readFileSync(file, 'utf8');
      let mod;
      try { mod = require(file); } catch (e) { failures.push(`${f}: ${e.message.split('\n')[0]}`); continue; }
      const id = mod.id || f.slice(0, f.indexOf('-', f.indexOf('-') + 1));
      const tp = tps.get(id) || null;
      const family = mod.exerciseType || null;
      const baseReq = (src.match(/const base = require\('\.\/([^']+)'\)/) || [])[1] || null;
      const en = (mod.i18n && mod.i18n.en) || {};
      const science = !!((family && SCIENCE_FAMILIES.has(family)) ||
        (tp && SCIENCE_STRAND.test(tp.strand) && !SCIENCE_EXCEPTIONS.has(tp.strand)));
      rows.push({
        id,
        file: path.relative(ROOT, file).replace(/\\/g, '/'),
        grade: mod.gradeBand || band.toUpperCase(),
        slug: mod.slug || null,
        family,
        variationOf: baseReq ? baseReq.split('-').slice(0, 2).join('-') : null,
        title: en.title || null,
        instruction: en.instruction || null,
        assetClass: mod.assetClass || null,
        themed: !!(mod.themeAxis && mod.themeAxis.applicable),
        levels: mod.difficulty ? Object.keys(mod.difficulty).length : 0,
        params: mod.difficulty && mod.difficulty[2] ? Object.keys(mod.difficulty[2]) : [],
        interactive: !!mod.interactive,
        uses: requiresOf(src),
        teachingPoint: tp ? tp.tp : null,
        skill: tp ? tp.skill : null,
        strand: tp ? tp.strand : null,
        science,
      });
    }
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), count: rows.length, failures, rows }, null, 1));

  const sci = rows.filter((r) => r.science).length;
  const noTp = rows.filter((r) => !r.teachingPoint).map((r) => r.id);
  const fam = new Map();
  for (const r of rows.filter((x) => !x.science)) fam.set(r.family || '?', (fam.get(r.family || '?') || 0) + 1);
  console.log(`types ${rows.length} · science ${sci} · in scope ${rows.length - sci} · load failures ${failures.length}`);
  console.log(`families in scope ${fam.size} · no teaching point ${noTp.length}${noTp.length ? ' (' + noTp.slice(0, 20).join(' ') + ')' : ''}`);
  if (failures.length) console.log(failures.join('\n'));
  if (process.argv.includes('--print-summary')) {
    console.log([...fam.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v}\t${k}`).join('\n'));
  }
}

main();
