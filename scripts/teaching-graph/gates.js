#!/usr/bin/env node
/**
 * The content graph's gates (Daily Teaching System, Part 1 step 3).
 *
 *   node scripts/teaching-graph/gates.js             every check; exit 1 on a failure
 *   node scripts/teaching-graph/gates.js --poison    plants one fault per check and requires each to be caught
 *   node scripts/teaching-graph/gates.js --warn      prints failures and exits 0 (how deploy.sh runs it at first)
 *
 * The checks read only committed files, so they run on the server too (the published-catalogue table decks.tsv
 * lives on the PC; `build-assets.js --check` is the PC-side check that the committed index is its build):
 *
 *   G1  points.json is exactly what build-points.js produces (order, prerequisites and type lists are not
 *       hand-edited); the builder's own checks pass (unknown ids, a prerequisite of a higher grade or later in the
 *       order, a cycle, a type under two points, a point without a type)
 *   G2  every worksheet type of the registry sits under a teaching point
 *   G3  tools.json lists every live tool and nothing else; every point it names exists; a classroom tool has none
 *   G4  every activity a point names exists in the activity manifests
 *   G5  each language's asset index names only types, tools and activities that exist, landings that exist in that
 *       language's landing file, and tool / activity slugs equal to the live ones
 *   G6  every teaching point has at least one printable type (the graph's promise to the unit builder)
 *   G7  (warning) a printable family has at least as many landing pages per language as its batch recorded
 *       (docs/worksheet-gen/b*-designs/hub-expectations.json)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const DIR = path.join(REPO, 'frontend', 'content', 'teaching-graph');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const clone = (x) => JSON.parse(JSON.stringify(x));
const { build, fileText } = require('./build-points.js');

function load() {
  const { loadAllTypes } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'load-types.js'));
  const loaded = loadAllTypes();
  const types = new Map((Array.isArray(loaded) ? loaded : Object.values(loaded)).map((t) => [t.id, t]));
  const ts = fs.readFileSync(path.join(REPO, 'frontend', 'config', 'live-tool-slugs.ts'), 'utf8');
  const m = /TOOL_KEYS[^=]*=\s*\[([\s\S]*?)\]/.exec(ts);
  const toolKeys = m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
  const manifests = new Map();
  for (const f of fs.readdirSync(path.join(REPO, 'mini tools')).filter((x) => x.endsWith('-activities.json'))) {
    const j = readJson(path.join(REPO, 'mini tools', f));
    for (const e of (Array.isArray(j) ? j : j.activities || [])) manifests.set(e.id, e);
  }
  const assets = {}, landings = {}, toolContent = {};
  for (const loc of LOCALES) {
    const f = path.join(DIR, 'assets', loc + '.json');
    assets[loc] = fs.existsSync(f) ? readJson(f) : null;
    const l = readJson(path.join(REPO, 'frontend', 'content', 'seo-landing', loc + '.json'));
    landings[loc] = new Map((Array.isArray(l) ? l : (l.landings || Object.values(l))).filter((x) => x && x.slug).map((x) => [x.slug, x]));
    toolContent[loc] = readJson(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'));
  }
  const expectations = [];
  const wg = path.join(REPO, 'docs', 'worksheet-gen');
  for (const d of fs.readdirSync(wg).filter((x) => /^b\d+-designs$/.test(x))) { const f = path.join(wg, d, 'hub-expectations.json'); if (fs.existsSync(f)) expectations.push([d, readJson(f)]); }
  return {
    types, toolKeys, manifests, assets, landings, toolContent, expectations,
    committedPoints: fs.readFileSync(path.join(DIR, 'points.json'), 'utf8').replace(/\r\n/g, '\n'),
    tools: readJson(path.join(DIR, 'tools.json')).tools,
    prereq: readJson(path.join(DIR, 'prerequisites.json')).points,
    authored: readJson(path.join(DIR, 'order.json')).subjects,
    additions: readJson(path.join(DIR, 'type-additions.json')).types,
  };
}

/** every check over one set of inputs → { fails: [[gate, message]], warns: [...] } */
function run(d) {
  const fails = [], warns = [];
  const fail = (g, m) => fails.push([g, m]);
  const b = build({ prereq: d.prereq, authored: d.authored, additions: d.additions });
  for (const m of b.problems) fail('G1', m);
  const text = fileText(b.points);
  if (!b.problems.length && text !== d.committedPoints) fail('G1', 'points.json is not what build-points.js produces: run it and commit');
  for (const line of b.unmapped) fail('G2', 'worksheet type ' + line.split('\t')[0] + ' sits under no teaching point (add it to type-additions.json)');
  const ids = new Set(b.points.map((p) => p.id));

  for (const k of d.toolKeys) if (!d.tools[k]) fail('G3', 'tool ' + k + ' is live and not in tools.json');
  for (const [k, t] of Object.entries(d.tools)) {
    if (!d.toolKeys.includes(k)) fail('G3', 'tools.json lists ' + k + ', which is not a live tool');
    for (const p of t.points || []) if (!ids.has(p)) fail('G3', 'tools.json: ' + k + ' names an unknown point ' + p);
    if (t.kind === 'classroom' && (t.points || []).length) fail('G3', 'tools.json: ' + k + ' is a classroom tool and names points');
    if (!t.kind && !(t.points || []).length && !t.note) fail('G3', 'tools.json: ' + k + ' names no point and says why nowhere');
  }

  for (const p of b.points) for (const a of p.activities) if (!d.manifests.has(a)) fail('G4', p.id + ' names an activity that is in no manifest: ' + a);

  for (const loc of LOCALES) {
    const a = d.assets[loc];
    if (!a) { fail('G5', 'assets/' + loc + '.json is missing: run build-assets.js'); continue; }
    for (const [id, t] of Object.entries(a.types)) {
      if (!d.types.has(id)) fail('G5', loc + ': the index names a type that does not exist: ' + id);
      if (t.landing && !d.landings[loc].has(t.landing)) fail('G5', loc + ': ' + id + ' names a landing page that does not exist: ' + t.landing);
      if (t.landing && !t.base) fail('G5', loc + ': ' + id + ' has a landing and no indexable page');
      if (t.s.some((n, i) => n > t.p[i])) fail('G5', loc + ': ' + id + ' has more pages with a screen than pages');
    }
    for (const [k, slug] of Object.entries(a.tools)) {
      if (!d.tools[k]) fail('G5', loc + ': the index names an unknown tool ' + k);
      else if (!d.toolContent[loc][k] || d.toolContent[loc][k].slug !== slug) fail('G5', loc + ': the slug of tool ' + k + ' is not the live one');
    }
    for (const [id, slug] of Object.entries(a.activities)) {
      const e = d.manifests.get(id);
      if (!e) fail('G5', loc + ': the index names an unknown activity ' + id);
      else if ((e.slug && typeof e.slug === 'object' ? e.slug[loc] : e.slug) !== slug) fail('G5', loc + ': the slug of activity ' + id + ' is not the live one');
    }
  }

  // (a point marked `led` is taught by the teacher without a page: a routine with real objects, a number talk)
  for (const p of b.points) if (!p.types.length && !p.led) fail('G6', p.id + ' has no printable type');

  for (const [batch, e] of d.expectations) {
    for (const [family, by] of Object.entries(e.keys || {})) for (const loc of LOCALES) {
      const want = by[loc];
      const a = d.assets[loc];
      if (!want || !a) continue;
      const have = Object.entries(a.types).filter(([id, t]) => t.landing && d.types.has(id) && d.types.get(id).exerciseType === family).length;
      if (have < want) warns.push(['G7', loc + ': ' + family + ' has ' + have + ' landing pages in the index, ' + batch + ' recorded ' + want]);
    }
  }
  return { fails, warns, points: b.points };
}

/** one planted fault per check: [name, the gate that must catch it, how to break a copy of the inputs] */
const POISONS = [
  ['a prerequisite that does not exist', 'G1', (d) => { d.prereq['1:make-10'] = ['K:no-such-point']; }],
  ['a prerequisite of a higher grade', 'G1', (d) => { d.prereq['K:count-how-many'] = ['1:make-10']; }],
  ['a prerequisite that comes later in the order', 'G1', (d) => { const g = d.authored.math.K; d.prereq[g[0]] = [g[g.length - 1]]; }],
  ['two points that need each other', 'G1', (d) => { const g = d.authored.math['1']; d.prereq[g[3]] = [g[2]]; d.prereq[g[2]] = [g[3]]; }],
  ['a point left out of the authored order', 'G1', (d) => { d.authored.math.K = d.authored.math.K.slice(1); }],
  ['a point listed under the wrong grade', 'G1', (d) => { d.authored.literacy['1'].push(d.authored.literacy.K.pop()); }],
  ['a hand edit of points.json', 'G1', (d) => { d.committedPoints = d.committedPoints.replace('"order": 1,', '"order": 2,'); }],
  ['a new worksheet type nobody placed', 'G2', (d) => { delete d.additions[Object.keys(d.additions)[0]]; }],
  ['a type placed under a point that does not exist', 'G1', (d) => { d.additions[Object.keys(d.additions)[0]] = 'K:no-such-point'; }],
  ['a live tool missing from tools.json', 'G3', (d) => { delete d.tools[d.toolKeys[0]]; }],
  ['a tool that names an unknown point', 'G3', (d) => { d.tools['ten-frame'].points.push('K:no-such-point'); }],
  ['a tool in tools.json that is not live', 'G3', (d) => { d.tools['no-such-tool'] = { points: [] , note: 'x' }; }],
  ['an activity a teaching point names is gone from the manifests', 'G4', (d) => { d.manifests = new Map(d.manifests); d.manifests.delete('ten-frame.how-many.0-10.animals'); }],
  ['a printable family with fewer landing pages than its batch recorded', 'G7', (d) => { for (const id of Object.keys(d.assets.en.types)) if (d.types.get(id) && d.types.get(id).exerciseType === 'sound-boxes') delete d.assets.en.types[id].landing; }],
  ['an index entry for a type that does not exist', 'G5', (d) => { d.assets.en.types['K-999'] = { p: [0, 1, 0], s: [0, 0, 0] }; }],
  ['an index entry with a landing that does not exist', 'G5', (d) => { const id = Object.keys(d.assets.de.types).find((k) => d.assets.de.types[k].landing); d.assets.de.types[id].landing = 'no-such-landing-zz'; }],
  ['more screen pages than pages', 'G5', (d) => { const id = Object.keys(d.assets.fi.types)[0]; d.assets.fi.types[id].s = [9, 9, 9]; d.assets.fi.types[id].p = [1, 1, 1]; }],
  ['a tool slug that is not the live one', 'G5', (d) => { d.assets.sv.tools['ten-frame'] = 'not-the-live-slug'; }],
  ['an activity the manifests do not hold', 'G5', (d) => { d.assets.en.activities['no.such.activity'] = 'x'; }],
  ['a language without its index', 'G5', (d) => { d.assets.it = null; }],
];

if (require.main === module) {
  const d = load();
  if (process.argv.includes('--poison')) {
    let missed = 0;
    const clean = run(d);
    if (clean.fails.length) { console.log('the gates do not pass on the real files (' + clean.fails.length + ' failures): fix that before poisoning'); process.exit(1); }
    for (const [name, gate, breakIt] of POISONS) {
      const c = Object.assign({}, d, { prereq: clone(d.prereq), authored: clone(d.authored), additions: clone(d.additions), tools: clone(d.tools), assets: clone(d.assets) });
      breakIt(c);
      const r = run(c);
      const caught = r.fails.some((f) => f[0] === gate) || (gate === 'G7' && r.warns.some((f) => f[0] === 'G7'));
      if (!caught) missed++;
      console.log((caught ? 'caught  ' : 'MISSED  ') + gate + '  ' + name + (caught ? '' : ' — failures were: ' + JSON.stringify(r.fails.slice(0, 2))));
    }
    console.log(missed ? missed + ' planted fault(s) NOT caught' : POISONS.length + ' planted faults, all caught');
    process.exit(missed ? 1 : 0);
  }
  const r = run(d);
  for (const [g, m] of r.fails.slice(0, 60)) console.log('FAIL  ' + g + '  ' + m);
  for (const [g, m] of r.warns.slice(0, 40)) console.log('warn  ' + g + '  ' + m);
  console.log(r.fails.length ? r.fails.length + ' failure(s)' + (r.warns.length ? ', ' + r.warns.length + ' warning(s)' : '') : 'teaching graph: ' + r.points.length + ' points, ' + d.types.size + ' types, ' + Object.keys(d.tools).length + ' tools, 11 language indexes — every gate passes' + (r.warns.length ? ' (' + r.warns.length + ' warning(s))' : ''));
  process.exit(r.fails.length && !process.argv.includes('--warn') ? 1 : 0);
}
module.exports = { run, load, POISONS };
