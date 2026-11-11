#!/usr/bin/env node
/**
 * Drafts unit definitions from a unit list (Daily Teaching System, Part 4.1). The unit LIST is authored (which
 * teaching points make a unit, in which order, under which title); this tool fills each lesson's worksheet types from
 * the content graph and writes the facts a truthful page description needs. It never overwrites a unit that is already
 * in frontend/content/units/defs/<loc>.json: the definitions are hand-kept from then on.
 *
 *   node scripts/units/draft-defs.js --loc=en --list=frontend/content/units/lists/en-math.json            report only
 *   node scripts/units/draft-defs.js --loc=en --list=… --write                                            add the new units
 *
 * The list: { units: [{ id, title, grade, points: [<point id> | { point, types: [<type id>, …] }…], metaTitle?, metaDescription? }] }.
 * --types also prints the worksheet types each lesson takes. --only=<id prefix> drafts only the units whose id starts so.
 * A lesson takes up to two worksheet types of its point: first those whose pages form a Level Set with all three
 * levels, then other Level Sets, then by number of pages; among equals, a type with a screen version first.
 * A point with no published page is refused (a lesson needs something to hand out).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const WRITE = process.argv.includes('--write');
const C = path.join(REPO, 'frontend', 'content');
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const list = read(path.resolve(REPO, arg('list', 'frontend/content/units/lists/' + loc + '-math.json'))).units;
const points = new Map(read(path.join(C, 'teaching-graph', 'points.json')).points.map((p) => [p.id, p]));
const assets = read(path.join(C, 'teaching-graph', 'assets', loc + '.json'));
const toolPoints = read(path.join(C, 'teaching-graph', 'tools.json')).tools;
const toolContent = read(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'));
const ONLY = arg('only', null);
const defsFile = path.join(C, 'units', 'defs', loc + '.json');
const defs = read(defsFile);
const have = new Set(defs.units.map((u) => u.id));
const usedPoints = new Map();
for (const u of defs.units) for (const l of u.lessons) usedPoints.set(l.point, u.id);

const GRADE_WORD = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
const slugify = (s) => s.toLowerCase().replace(/([0-9]),([0-9])/g, '$1$2').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const score = (t) => { const a = assets.types[t]; const n = a.p.reduce((x, y) => x + y, 0); return (a.set && a.p.every((x) => x > 0) ? 4000 : a.set ? 2000 : 0) + (a.s.some((x) => x > 0) ? 500 : 0) + Math.min(n, 400); };

let problems = 0;
const out = [];
const gaps = [];
for (const u of list) {
  if (ONLY && !u.id.startsWith(ONLY)) continue;
  if (have.has(u.id)) { console.log('kept   ' + u.id + ' (already defined)'); continue; }
  const lessons = [];
  for (const entry of u.points) {
    // a list entry is a point id, or { point, types } where the unit chooses its pages by hand
    const pid = typeof entry === 'string' ? entry : entry.point;
    const chosen = typeof entry === 'string' ? null : entry.types;
    const p = points.get(pid);
    if (!p) { problems++; console.log('ERROR  ' + u.id + ': no teaching point ' + pid); continue; }
    if (p.grade !== String(u.grade)) console.log('note   ' + u.id + ': ' + pid + ' is a grade ' + p.grade + ' point in a grade ' + u.grade + ' unit');
    if (usedPoints.has(pid)) { problems++; console.log('ERROR  ' + u.id + ': ' + pid + ' is already a lesson of ' + usedPoints.get(pid)); continue; }
    usedPoints.set(pid, u.id);
    const published = p.types.filter((t) => assets.types[t] && assets.types[t].p.some((n) => n > 0));
    if (chosen) for (const t of chosen) if (!published.includes(t)) { problems++; console.log('ERROR  ' + u.id + ': ' + t + ' is not a published type of ' + pid); }
    const types = chosen ? chosen.filter((t) => published.includes(t)) : published.sort((a, b) => score(b) - score(a) || (a < b ? -1 : 1)).slice(0, 2);
    if (!types.length) { problems++; console.log('ERROR  ' + u.id + ': ' + pid + ' has no published page in ' + loc); continue; }
    // the unit gate asks for two real assets in a lesson (worksheet types, a tool, a live activity): a point with one
    // type and neither a tool nor an activity is left out and reported, never padded
    const hasTool = Object.keys(toolPoints).some((k) => (toolPoints[k].points || []).includes(pid) && toolContent[k] && toolContent[k].slug && toolContent[k].name);
    const hasAct = (p.activities || []).some((a) => assets.activities[a]);
    if (types.length + (hasTool ? 1 : 0) + (hasAct ? 1 : 0) < 2) { gaps.push(u.id + ': ' + pid + ' has one worksheet type and no tool or activity in ' + loc + ' (' + types.join(' ') + ')'); usedPoints.delete(pid); continue; }
    lessons.push({ point: pid, types });
  }
  const three = lessons.filter((l) => l.types.some((t) => assets.types[t].p.every((n) => n > 0))).length;
  const screen = lessons.filter((l) => l.types.some((t) => assets.types[t].s.some((n) => n > 0)) || (points.get(l.point).activities || []).some((a) => assets.activities[a])).length;
  const weeks = Math.max(1, Math.round(lessons.length / 4));
  const def = {
    id: u.id, slug: u.slug || slugify(u.title) + '-' + slugify(GRADE_WORD[u.grade]) + '-unit', status: 'pilot', grade: String(u.grade), subject: u.subject || 'math', title: u.title,
    metaTitle: u.metaTitle || u.title + ': ' + GRADE_WORD[u.grade] + ' Unit Plan',
    metaDescription: u.metaDescription || '',
    weeks, lessons,
  };
  out.push(def);
  if (process.argv.includes('--types')) for (const l of lessons) console.log('         ' + l.point.padEnd(34) + l.types.join(' '));
  console.log('new    ' + u.id.padEnd(34) + lessons.length + ' lessons, ' + weeks + ' week(s); three levels in ' + three + ', on screen in ' + screen + '; title ' + def.metaTitle.length + ' ch, description ' + def.metaDescription.length + ' ch  /' + def.slug);
}
if (gaps.length) { console.log(''); console.log('UNIT GAPS (left out; a tool or an activity for the point would bring the lesson in):'); for (const g of gaps) console.log('  ' + g); }
if (problems) { console.log(problems + ' problem(s); nothing written'); process.exit(1); }
if (WRITE && out.length) {
  defs.units.push(...out);
  fs.writeFileSync(defsFile, JSON.stringify(defs, null, 1) + '\n');
  console.log('written: ' + out.length + ' unit(s) added to ' + path.relative(REPO, defsFile));
} else console.log(out.length + ' new unit(s)' + (WRITE ? '' : ' (report only; --write adds them)'));
