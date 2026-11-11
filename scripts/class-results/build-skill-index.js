#!/usr/bin/env node
/**
 * The skill index of class results (Daily Teaching System, Part 9 release 2, step 9.6): for each of the fifteen
 * curriculum registries, what the teacher's "by curriculum" view needs to place a result and to offer a next step.
 *
 *   node scripts/class-results/build-skill-index.js            writes frontend/content/class-skills/<registry>.json ×15
 *   node scripts/class-results/build-skill-index.js --check    exit 1 when a committed file is not the build of today's sources
 *
 * Nothing here is written by hand. Sources (all committed):
 *   frontend/content/teaching-graph/points.json           the 306 teaching points, their worksheet types and activities
 *   frontend/content/teaching-graph/assets/<loc>.json     what exists in that language (Level Sets with a screen, activities, tools)
 *   frontend/content/teaching-graph/tools.json            tool → the points it models
 *   frontend/content/curricula/<reg>/{framework,crosswalk}.json + display.json     the national objective of a point
 *   frontend/content/units/units.<loc>.json               a unit lesson on the point (where a unit exists)
 *   frontend/messages/tool-content/<loc>.json             a tool's name in that language
 *   frontend/lib/seo/strand-names.ts (strandLabel)         the national domain name, for a point the curriculum does not name
 *
 * One file per registry:
 *   groups      [{ fw, code, titles, outside }]   the headings of the view. A heading is what scripts/curricula/show.js
 *               allows a page to show for an objective: the document's short name, the objective's own official code (or
 *               the plan's own number), and the titles of the parts it stands under. Never an id this registry invented,
 *               never the objective's wording. `outside: true` = the curriculum names no objective this point TEACHES at
 *               these grades; the heading is then the national domain name of the point's strand.
 *   points      { <point id>: { g, order, set, acts, tool, unit } }
 *               g = index into groups; set = the Level Set (type code) of this point that has screen pages in this
 *               language; acts = up to two activities of this language (their slugs); tool = the classroom tool that
 *               models the point ({ slug, name } in this language); unit = { slug, n, title, unit } a unit lesson on
 *               the point (the lesson's number and title, the unit's title).
 *   types       { <type code, lower case, as in a page address>: <point id> }
 *   activities  { <activity id>: <point id> }   (an activity that practises several points stands under the earliest)
 *
 * A point's heading is its FIRST crosswalk row with the relation "teaches" (the reviewers wrote the closest objective
 * first). Rows that only prepare for or extend an objective never make a heading: a result would then be read against
 * something the page does not teach.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const CONTENT = path.join(REPO, 'frontend', 'content');
const OUT = path.join(CONTENT, 'class-skills');
const esbuild = require(fs.existsSync(path.join(REPO, 'node_modules', 'esbuild')) ? path.join(REPO, 'node_modules', 'esbuild') : path.join(REPO, 'frontend', 'node_modules', 'esbuild'));
const { shown } = require('../curricula/show.js');
const CHECK = process.argv.includes('--check');
const read = (...p) => JSON.parse(fs.readFileSync(path.join(...p), 'utf8'));

function strandLabelFn() {
  const out = path.join(require('os').tmpdir(), 'lcs-skill-index-strand-names-' + process.pid + '.cjs'); // outside the repo: the check also runs on the server
  esbuild.buildSync({ entryPoints: [path.join(REPO, 'frontend', 'lib', 'seo', 'strand-names.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
  const fn = require(out).strandLabel;
  try { fs.unlinkSync(out); } catch (e) { /* a temp file */ }
  return fn;
}

function build() {
  const strandLabel = strandLabelFn();
  const points = read(CONTENT, 'teaching-graph', 'points.json').points;
  const tools = read(CONTENT, 'teaching-graph', 'tools.json').tools;
  const display = read(CONTENT, 'curricula', 'display.json').registries;
  const toolsOfPoint = new Map();
  for (const key of Object.keys(tools).sort()) for (const p of tools[key].points || []) { if (!toolsOfPoint.has(p)) toolsOfPoint.set(p, []); toolsOfPoint.get(p).push(key); }
  const files = {};
  for (const reg of Object.keys(display).sort()) {
    const d = display[reg], loc = d.locale;
    const framework = read(CONTENT, 'curricula', reg, 'framework.json');
    const crosswalk = read(CONTENT, 'curricula', reg, 'crosswalk.json').points;
    const assets = read(CONTENT, 'teaching-graph', 'assets', loc + '.json');
    const unitsFile = path.join(CONTENT, 'units', 'units.' + loc + '.json');
    const units = fs.existsSync(unitsFile) ? read(unitsFile).units : [];
    const unitOfPoint = new Map();
    for (const u of units) for (const l of u.lessons || []) if (l.point && !unitOfPoint.has(l.point)) unitOfPoint.set(l.point, { slug: u.slug, n: l.n, title: l.title, unit: u.title });
    const toolContent = read(REPO, 'frontend', 'messages', 'tool-content', loc + '.json');
    const registry = { framework, display: d };
    const nodeById = new Map(framework.nodes.map((n) => [n.id, n]));
    const groups = [], groupIndex = new Map();
    const groupOf = (g) => { const k = JSON.stringify(g); if (!groupIndex.has(k)) { groupIndex.set(k, groups.length); groups.push(g); } return groupIndex.get(k); };
    const outPoints = {}, outTypes = {}, outActs = {};
    for (const p of points) {
      const rows = ((crosswalk[p.id] || {}).rows || []).filter((r) => r.rel === 'teaches' && nodeById.has(r.id));
      let g;
      if (rows.length) { const s = shown(registry, nodeById.get(rows[0].id)); g = { fw: s.framework, code: s.code || null, titles: s.titles, outside: false }; }
      else g = { fw: null, code: null, titles: [strandLabel(p.strand, loc)], outside: true };
      // the Level Set of this point: a type whose pages form a set and can be played on screen at the core level
      let set = null;
      for (const t of p.types) { const a = assets.types[t]; if (a && a.set && a.s && a.s[1] > 0) { set = t.toLowerCase().replace('-', ''); break; } }
      const acts = p.activities.map((id) => assets.activities[id]).filter(Boolean).slice(0, 2);
      let tool = null;
      for (const k of toolsOfPoint.get(p.id) || []) if (assets.tools[k] && toolContent[k] && toolContent[k].name) { tool = { slug: assets.tools[k], name: toolContent[k].name }; break; }
      outPoints[p.id] = { g: groupOf(g), order: p.order, set, acts, tool, unit: unitOfPoint.get(p.id) || null };
      for (const t of p.types) outTypes[t.toLowerCase().replace('-', '')] = p.id;
    }
    // an activity under several points stands under the earliest in the teaching order
    for (const p of points.slice().sort((a, b) => a.order - b.order || (a.id < b.id ? -1 : 1))) for (const id of p.activities) if (!outActs[id]) outActs[id] = p.id;
    files[reg] = {
      $comment: 'GENERATED by scripts/class-results/build-skill-index.js from the content graph and the curriculum registry of ' + reg + '. Do not edit by hand.',
      registry: reg, locale: loc, name: d.name, groups, points: outPoints, types: outTypes, activities: outActs,
    };
  }
  return files;
}

const text = (j) => JSON.stringify(j) + '\n';

if (require.main === module) {
  const files = build();
  let bad = 0;
  fs.mkdirSync(OUT, { recursive: true });
  for (const reg of Object.keys(files)) {
    const f = path.join(OUT, reg + '.json'), t = text(files[reg]);
    if (CHECK) { if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') !== t) { bad++; console.log('STALE  ' + path.relative(REPO, f)); } }
    else fs.writeFileSync(f, t);
    const x = files[reg], pts = Object.values(x.points);
    if (!CHECK) console.log(reg.padEnd(6) + String(x.groups.length).padStart(4) + ' headings (' + x.groups.filter((g) => g.outside).length + ' outside the curriculum)  ' + pts.filter((p) => p.set).length + ' points with a Level Set, ' + pts.filter((p) => p.acts.length).length + ' with an activity, ' + pts.filter((p) => p.tool).length + ' with a tool, ' + pts.filter((p) => p.unit).length + ' with a unit lesson  ' + (t.length / 1024).toFixed(0) + ' KB');
  }
  if (CHECK) { console.log(bad ? bad + ' skill index file(s) are not the build of the current sources: run build-skill-index.js' : 'skill index: 15 files are the build of the current sources'); process.exit(bad ? 1 : 0); }
}
module.exports = { build };
