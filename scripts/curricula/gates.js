#!/usr/bin/env node
/**
 * The national curriculum registry's gates (Daily Teaching System, Part 2). They read only committed files, for
 * every language that has a registry under frontend/content/curricula/<loc>/.
 *
 *   node scripts/curricula/gates.js             exit 1 on a failure
 *   node scripts/curricula/gates.js --poison    plants one fault per check; each must be caught
 *   node scripts/curricula/gates.js --warn      prints failures, exits 0
 *
 *   C1  every framework names its title, its publisher, its year, the official document, where its wording was read
 *       from, the date it was read and how it is cited: nothing in a registry is without a source
 *   C2  every node has an id found once, a framework that exists, a grade or band, a kind and its wording; a parent
 *       it names exists
 *   C3  the crosswalk holds every teaching point of the content graph and no other
 *   C4  a crosswalk row names a node that exists (or a whole area, marked so), has one of the three relations and
 *       carries the node's own grade; a point without rows says why
 *   C5  a row that came from review says so, and its file of overrides names only points and nodes that exist
 *   C6  display.json says, for every framework of every registry, how it is shown (code, label or area); a framework
 *       shown by label has labelled nodes; nothing stands in display.json that is not a registry
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const ROOT = path.join(REPO, 'frontend', 'content', 'curricula');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const clone = (x) => JSON.parse(JSON.stringify(x));
const RELS = ['teaches', 'prepares', 'extends'];

function load() {
  const points = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json')).points.map((p) => p.id);
  const locales = {};
  if (fs.existsSync(ROOT)) for (const loc of fs.readdirSync(ROOT)) {
    const d = path.join(ROOT, loc);
    if (!fs.statSync(d).isDirectory() || !fs.existsSync(path.join(d, 'framework.json'))) continue;
    locales[loc] = {
      framework: readJson(path.join(d, 'framework.json')),
      crosswalk: fs.existsSync(path.join(d, 'crosswalk.json')) ? readJson(path.join(d, 'crosswalk.json')) : null,
      overrides: fs.existsSync(path.join(d, 'crosswalk-overrides.json')) ? readJson(path.join(d, 'crosswalk-overrides.json')) : null,
    };
  }
  const display = fs.existsSync(path.join(ROOT, 'display.json')) ? readJson(path.join(ROOT, 'display.json')) : null;
  return { points, locales, display };
}

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push([g, m]);
  const pointSet = new Set(d.points);
  for (const [loc, L] of Object.entries(d.locales)) {
    const fw = L.framework;
    const keys = new Set();
    for (const f of fw.frameworks || []) {
      keys.add(f.key);
      for (const k of ['key', 'title', 'publisher', 'year', 'accessed', 'citation']) if (!f[k]) fail('C1', loc + ': framework ' + (f.key || '?') + ' has no ' + k);
      if (!f.officialDocument) fail('C1', loc + ': framework ' + f.key + ' names no official document');
      if (!f.readFrom) fail('C1', loc + ': framework ' + f.key + ' does not say where its wording was read from');
      if (f.accessed && !/^\d{4}-\d{2}-\d{2}$/.test(f.accessed)) fail('C1', loc + ': framework ' + f.key + ' has the access date "' + f.accessed + '"');
    }
    if (!(fw.frameworks || []).length) fail('C1', loc + ': no framework is named');
    const ids = new Map();
    for (const n of fw.nodes || []) {
      if (!n.id) { fail('C2', loc + ': a node has no id'); continue; }
      if (ids.has(n.id)) fail('C2', loc + ': two nodes share the id ' + n.id);
      ids.set(n.id, n);
      if (!keys.has(n.f)) fail('C2', loc + ': node ' + n.id + ' belongs to a framework that is not named (' + n.f + ')');
      if (!n.grade) fail('C2', loc + ': node ' + n.id + ' has no grade');
      if (!n.kind) fail('C2', loc + ': node ' + n.id + ' has no kind');
      if (typeof n.text !== 'string' || n.text.trim().length < 3) fail('C2', loc + ': node ' + n.id + ' has no wording');
    }
    for (const n of fw.nodes || []) if (n.parent && !ids.has(n.parent)) fail('C2', loc + ': node ' + n.id + ' names a parent that does not exist (' + n.parent + ')');

    const cw = L.crosswalk;
    if (!cw) { fail('C3', loc + ': no crosswalk.json'); continue; }
    for (const id of d.points) if (!cw.points[id]) fail('C3', loc + ': teaching point ' + id + ' is not in the crosswalk');
    for (const id of Object.keys(cw.points)) if (!pointSet.has(id)) fail('C3', loc + ': the crosswalk holds a point that does not exist (' + id + ')');
    for (const [id, e] of Object.entries(cw.points)) {
      const rows = e.rows || [];
      if (!rows.length && !e.none) fail('C4', loc + ': ' + id + ' has no row and does not say why');
      if (rows.length && e.none) fail('C4', loc + ': ' + id + ' has rows AND says it has no counterpart');
      for (const r of rows) {
        const n = ids.get(r.id);
        if (!n && !r.area) fail('C4', loc + ': ' + id + ' names ' + r.id + ', which is not a node');
        if (!RELS.includes(r.rel)) fail('C4', loc + ': ' + id + ' → ' + r.id + ' has the relation "' + r.rel + '"');
        if (!r.grade) fail('C4', loc + ': ' + id + ' → ' + r.id + ' has no grade');
        if (n && r.grade !== n.grade) fail('C4', loc + ': ' + id + ' → ' + r.id + ' carries grade ' + r.grade + ', the node is of grade ' + n.grade);
      }
      if (!['code', 'review', 'authored'].includes(e.by)) fail('C5', loc + ': ' + id + ' does not say where its rows come from');
    }
    if (L.overrides) for (const [id, o] of Object.entries(L.overrides.points || {})) {
      if (!pointSet.has(id)) fail('C5', loc + ': the overrides hold a point that does not exist (' + id + ')');
      for (const r of o.rows || []) if (!ids.has(r.id)) fail('C5', loc + ': the overrides of ' + id + ' name ' + r.id + ', which is not a node');
      if (cw.points[id] && cw.points[id].by !== 'review') fail('C5', loc + ': ' + id + ' has an override that the crosswalk does not carry (rebuild)');
    }
  }
  // C6: how each framework is shown
  const disp = d.display;
  if (!disp) fail('C6', 'no display.json');
  else {
    for (const [loc, L] of Object.entries(d.locales)) {
      const R = disp.registries[loc];
      if (!R) { fail('C6', loc + ': not in display.json'); continue; }
      if (!R.name) fail('C6', loc + ': no name in display.json');
      for (const f of L.framework.frameworks || []) {
        const e = (R.frameworks || {})[f.key];
        if (!e) { fail('C6', loc + ': framework ' + f.key + ' is not in display.json'); continue; }
        if (!['code', 'label', 'area'].includes(e.show)) fail('C6', loc + ': framework ' + f.key + ' is shown as "' + e.show + '"');
        if (e.show === 'label' && !(L.framework.nodes || []).some((n) => n.f === f.key && n.label)) fail('C6', loc + ': framework ' + f.key + ' is shown by label, but none of its nodes has one');
      }
      for (const k of Object.keys(R.frameworks || {})) if (!(L.framework.frameworks || []).some((f) => f.key === k)) fail('C6', loc + ': display.json names a framework that does not exist (' + k + ')');
    }
    for (const loc of Object.keys(disp.registries)) if (!d.locales[loc]) fail('C6', 'display.json names a registry that does not exist (' + loc + ')');
  }
  return fails;
}

const first = (d) => Object.keys(d.locales).find((l) => d.locales[l].crosswalk) || Object.keys(d.locales)[0];
const POISONS = [
  ['a framework without a source', 'C1', (d) => { const f = d.locales[first(d)].framework.frameworks[0]; delete f.officialDocument; delete f.readFrom; }],
  ['a framework without an access date', 'C1', (d) => { d.locales[first(d)].framework.frameworks[0].accessed = ''; }],
  ['a node without wording', 'C2', (d) => { d.locales[first(d)].framework.nodes[5].text = ''; }],
  ['two nodes with one id', 'C2', (d) => { const n = d.locales[first(d)].framework.nodes; n.push(clone(n[3])); }],
  ['a node whose parent is gone', 'C2', (d) => { const n = d.locales[first(d)].framework.nodes.find((x) => x.parent); n.parent = 'NO.SUCH.NODE'; }],
  ['a teaching point missing from the crosswalk', 'C3', (d) => { delete d.locales[first(d)].crosswalk.points[d.points[0]]; }],
  ['a crosswalk row to a node that does not exist', 'C4', (d) => { const e = Object.values(d.locales[first(d)].crosswalk.points).find((x) => (x.rows || []).length); e.rows[0] = { id: 'NO.SUCH.NODE', rel: 'teaches', grade: 'K' }; }],
  ['a relation that is not one of the three', 'C4', (d) => { const e = Object.values(d.locales[first(d)].crosswalk.points).find((x) => (x.rows || []).length); e.rows[0].rel = 'covers'; }],
  ['a row with another grade than its node', 'C4', (d) => { const e = Object.values(d.locales[first(d)].crosswalk.points).find((x) => (x.rows || []).length && !x.rows[0].area); e.rows[0].grade = '9'; }],
  ['a point with no row and no reason', 'C4', (d) => { const e = Object.values(d.locales[first(d)].crosswalk.points).find((x) => x.none); delete e.none; }],
  ['a row that does not say where it comes from', 'C5', (d) => { Object.values(d.locales[first(d)].crosswalk.points)[0].by = ''; }],
  ['a framework that display.json does not hold', 'C6', (d) => { const R = d.display.registries[first(d)]; delete R.frameworks[Object.keys(R.frameworks)[0]]; }],
  ['a framework shown in a way that does not exist', 'C6', (d) => { const R = d.display.registries[first(d)]; Object.values(R.frameworks)[0].show = 'wording'; }],
  ['a registry in display.json that does not exist', 'C6', (d) => { d.display.registries['xx'] = { name: 'x', frameworks: {} }; }],
];

if (require.main === module) {
  const d = load();
  const locs = Object.keys(d.locales);
  if (!locs.length) { console.log('curricula: no registry yet'); process.exit(0); }
  if (process.argv.includes('--poison')) {
    if (run(d).length) { console.log('the gates do not pass on the real files: fix that before poisoning'); process.exit(1); }
    let missed = 0;
    for (const [name, gate, breakIt] of POISONS) {
      const c = clone(d);
      breakIt(c);
      const caught = run(c).some((f) => f[0] === gate);
      if (!caught) missed++;
      console.log((caught ? 'caught  ' : 'MISSED  ') + gate + '  ' + name);
    }
    console.log(missed ? missed + ' planted fault(s) NOT caught' : POISONS.length + ' planted faults, all caught');
    process.exit(missed ? 1 : 0);
  }
  const fails = run(d);
  for (const [g, m] of fails.slice(0, 60)) console.log('FAIL  ' + g + '  ' + m);
  const sum = locs.map((l) => l + ' ' + d.locales[l].framework.nodes.length + ' nodes').join(', ');
  console.log(fails.length ? fails.length + ' failure(s)' : 'curricula: ' + sum + '; ' + d.points.length + ' teaching points crossed in each — every gate passes');
  process.exit(fails.length && !process.argv.includes('--warn') ? 1 : 0);
}
module.exports = { run, load, POISONS };
