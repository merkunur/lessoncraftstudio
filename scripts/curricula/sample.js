#!/usr/bin/env node
/**
 * Prints a sample of a registry's crosswalk beside the official wording, for the builder's own reading
 * (Daily Teaching System, Part 2: rule #2 asks for a reviewer AND my own reading of a sample).
 *
 *   node scripts/curricula/sample.js <registry> [--every=8] [--offset=0] [--subject=math] [--gaps] [--none]
 *     --gaps   every "teaches" row whose grade lies two or more school years from the point's grade
 *     --none   the points left without a counterpart, with the reason
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const [reg, ...flags] = process.argv.slice(2);
const flag = (k, d) => { const f = flags.find((x) => x.startsWith('--' + k + '=')); return f ? f.slice(k.length + 3) : d; };
const dir = path.join(REPO, 'frontend', 'content', 'curricula', reg);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const fw = readJson(path.join(dir, 'framework.json')), cw = readJson(path.join(dir, 'crosswalk.json')).points;
const why = ['crosswalk-authored.json', 'crosswalk-overrides.json'].map((f) => path.join(dir, f)).filter((f) => fs.existsSync(f)).map((f) => readJson(f).points).reduce((a, b) => Object.assign(a, b), {});
const N = new Map(fw.nodes.map((n) => [n.id, n]));
const points = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json')).points.filter((p) => !flag('subject') || p.subject === flag('subject'));
const year = (g) => (g === 'K' ? 0 : /^\d/.test(g) ? Number(String(g).split('-')[0]) : null);
if (flags.includes('--none')) { for (const p of points) if (cw[p.id].none) console.log(p.id + '  [' + p.subject + ']  ' + cw[p.id].none); process.exit(0); }
if (flags.includes('--gaps')) {
  for (const p of points) for (const r of cw[p.id].rows || []) { const a = year(p.grade), b = year(r.grade); if (r.rel === 'teaches' && a !== null && b !== null && Math.abs(a - b) >= 2) console.log(p.id + ' (' + p.skill.slice(0, 70) + ')  teaches ' + r.id + ' [' + r.grade + '] ' + (N.get(r.id).text || '').slice(0, 110)); }
  process.exit(0);
}
const every = Number(flag('every', 8)), offset = Number(flag('offset', 0));
points.forEach((p, i) => {
  if (i % every !== offset) return;
  console.log('\n' + p.id + '  [' + p.subject + ', grade ' + p.grade + ']  ' + p.skill);
  const e = cw[p.id];
  for (const r of e.rows || []) console.log('   ' + r.rel + ' ' + r.id + ' [' + r.grade + ']  ' + (N.get(r.id) ? N.get(r.id).text.slice(0, 190) : '(area)'));
  if (e.none) console.log('   NONE: ' + e.none);
  if (why[p.id] && why[p.id].why) console.log('   why: ' + why[p.id].why.slice(0, 230));
});
