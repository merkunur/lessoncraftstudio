#!/usr/bin/env node
/**
 * Applies a reviewer's corrections to the guest teacher scripts (Daily Teaching System, Part 5): they are fixed at the
 * source, the text files of scripts/sub-plans/texts/, which are written back in the same shape.
 *
 *   node scripts/sub-plans/apply-review.js --loc=en <corrections.json>
 *   then: node scripts/sub-plans/apply-texts.js && node scripts/sub-plans/assemble.js --loc=<loc>
 *
 * corrections.json: { "<point id> / <worksheet type>": { "say"?, "first"?, "stuck"? }, … } (the ids of
 * scripts/sub-plans/dump-for-review.js). A correction goes to the point's own script when the packs of the language
 * use the point with that worksheet type only; when the point is used with several types, or its script lives in the
 * scripts file of the first pilot pack, the correction is true of that type and goes under `byType`.
 * Refused, with nothing written: an id that is no point and type of a pack, a part other than the three, a "say"
 * without quotation marks.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const src = process.argv.slice(2).find((x) => !x.startsWith('--'));
if (!src) { console.error('usage: apply-review.js --loc=<loc> <corrections.json>'); process.exit(1); }
const DIR = path.join(__dirname, 'texts');
const KEYS = ['say', 'first', 'stuck'];
const patch = JSON.parse(fs.readFileSync(path.resolve(src), 'utf8'));
const packs = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'packs.' + loc + '.json'), 'utf8')).packs;
const typesOf = new Map();
for (const p of packs) for (const b of p.blocks) { if (!typesOf.has(b.point)) typesOf.set(b.point, new Set()); typesOf.get(b.point).add(b.type); }
const files = fs.readdirSync(DIR).filter((x) => x.startsWith(loc + '-') && x.endsWith('.js')).sort().map((f) => { const file = path.join(DIR, f); return { f, file, head: fs.readFileSync(file, 'utf8').split('module.exports')[0], mod: require(file), dirty: false }; });
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const problems = [];
let n = 0;
for (const [id, c] of Object.entries(patch)) {
  const [point, type] = id.split(' / ');
  if (!typesOf.has(point) || !typesOf.get(point).has(type)) { problems.push(id + ': no pack uses this point with this worksheet type'); continue; }
  for (const [k, v] of Object.entries(c)) {
    if (!KEYS.includes(k) || typeof v !== 'string' || !v.trim()) problems.push(id + ': ' + k + ' is not a part of a script');
    else if (k === 'say' && !/["“”]/.test(v)) problems.push(id + ': the new "say" gives nothing in quotation marks');
  }
}
if (problems.length) { for (const p of problems) console.log('ERROR  ' + p); console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }
for (const [id, c] of Object.entries(patch)) {
  const [point, type] = id.split(' / ');
  let m = files.find((x) => x.mod.points[point]);
  // a point of the first pilot pack has its script in the scripts file: its corrections join the text file of its grade
  if (!m) { m = files.find((x) => x.f === loc + '-' + (point.startsWith('K:') ? 'k' : point[0]) + '.js') || files[files.length - 1]; m.mod.points[point] = {}; }
  const p = m.mod.points[point];
  const own = p.say && typesOf.get(point).size === 1 && !(p.byType && p.byType[type]);
  for (const [k, v] of Object.entries(c)) {
    if (own) p[k] = v; else { p.byType = p.byType || {}; p.byType[type] = p.byType[type] || {}; p.byType[type][k] = v; }
    n++;
  }
  m.dirty = true;
}
for (const m of files.filter((x) => x.dirty)) {
  let out = m.head + 'module.exports = {\n  loc: ' + q(m.mod.loc) + ',\n  points: {\n';
  for (const [id, p] of Object.entries(m.mod.points)) {
    out += '    ' + q(id) + ': {\n';
    for (const k of KEYS) if (p[k]) out += '      ' + k + ': ' + q(p[k]) + ',\n';
    if (p.byType && Object.keys(p.byType).length) {
      out += '      byType: {\n';
      for (const [t, o] of Object.entries(p.byType)) { out += '        ' + q(t) + ': {\n'; for (const k of KEYS) if (o[k]) out += '          ' + k + ': ' + q(o[k]) + ',\n'; out += '        },\n'; }
      out += '      },\n';
    }
    out += '    },\n';
  }
  fs.writeFileSync(m.file, out + '  },\n};\n');
  console.log('rewritten  ' + m.f);
}
console.log(n + ' text(s) corrected in ' + Object.keys(patch).length + ' script(s)');
