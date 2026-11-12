#!/usr/bin/env node
/**
 * Checks a YEAR DESIGN (Daily Teaching System, Part 12.1): the teacher-reviewer's order of the units through the year
 * with every missing lesson placed (scripts/units/year/design.<loc>.<subject>.json). A design is the specification
 * the new lessons of Part 12.2 are built from, so nothing in it is taken on trust:
 *
 *   D1  every live lesson of the grade stands in the design exactly once, or is named in leftOut
 *   D2  the class days are RECOUNTED (existing lessons by the units file, new ones by the design, 3 per unit) and
 *       fill 95% to 100% of the grade's class days (teaching weeks of the pacing rule × 5); the design's own
 *       totalDays must be the recount
 *   D3  a new lesson has a title, an objective that starts with "Children", a standard of the framework for that
 *       grade (or a grade below, for review), 2 or 3 days (Kindergarten 2), a known source; `new` and `teacher-led`
 *       describe their page
 *   D4  a tool is one the site has, by its exact name; a `point:` source is a teaching point that exists and stands
 *       in no unit; a `reuse:` source names a page a live lesson hands out
 *   D5  no two lessons of a grade share a title; every unit has at least 4 lessons; a new unit has a kebab id
 *   D6  the non-teaching weeks are whole school weeks, do not overlap, and together with the teaching weeks make 36
 *
 *   node scripts/units/year/check-design.js --loc=en [--subject=math] [--file=<path>] [--poison]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en'), subject = arg('subject', 'math');
const file = arg('file', path.join(__dirname, 'design.' + loc + '.' + subject + '.json'));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const C = path.join(REPO, 'frontend', 'content');
const CHILDREN = { en: /^Children\b/, de: /^Die Kinder\b/, sv: /^Eleverna\b/ };
const MATH_FRAMEWORKS = { de: ['kmk-mathematik'], sv: ['lgr22-matematik', 'lgr22-forskoleklass'] };

function load() {
  const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
  const pts = readJson(path.join(C, 'teaching-graph', 'points.json'));
  const pointList = Array.isArray(pts) ? pts : (pts.points || Object.values(pts));
  const fw = readJson(path.join(C, 'curricula', loc, 'framework.json'));
  // the standards of the framework by their own codes (a node's id); a domain or a cluster ("1.OA", "1.OA.A") is no
  // standard a lesson can teach. A curriculum without codes (German, Swedish): the id of a line of the curriculum, or
  // the heading of the area a live lesson already stands under.
  const codes = loc === 'en'
    ? new Set(fw.nodes.map((n) => String(n.id)).filter((id) => /^(K|\d)\.[A-Z]+\.[A-Z]\.\d+(\.[a-z])?$/.test(id)))
    : new Set([...fw.nodes.filter((n) => (MATH_FRAMEWORKS[loc] || []).includes(n.f) && (n.kind === 'standard' || n.kind === 'content')).map((n) => String(n.id)), ...unitsFile.units.flatMap((u) => u.lessons.flatMap((l) => l.standards.map((x) => x.title).filter(Boolean)))]);
  if (codes.size < 50) throw new Error('the framework of ' + loc + ' gave only ' + codes.size + ' standard codes: the design cannot be checked against it');
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'manipulatives.ts'), 'utf8');
  const tools = new Set(); const re = /id:\s*"([a-z0-9-]+)"/g; let m;
  while ((m = re.exec(src))) { const b = /title:\s*\{([\s\S]*?)\}/.exec(src.slice(m.index, m.index + 4000)); if (!b) continue; const t = new RegExp('\\b' + loc + ':\\s*"([^"]+)"').exec(b[1]) || /\ben:\s*"([^"]+)"/.exec(b[1]); if (t) tools.add(t[1]); }
  const design = readJson(file);
  const answersFile = path.join(__dirname, 'answers.' + loc + '.json');
  // the pacing: the design's own where the teacher of the country ruled it there, else the rulings file of the language
  const pacing = design.pacing || (fs.existsSync(answersFile) ? readJson(answersFile).pacing : null);
  if (!pacing || !pacing.teachingWeeks) throw new Error('no pacing for ' + loc + ': neither in the design nor in ' + path.relative(REPO, answersFile));
  const assetsFile = path.join(C, 'teaching-graph', 'assets', loc + '.json');
  const assets = fs.existsSync(assetsFile) ? readJson(assetsFile) : null;
  const published = (p) => !assets || !assets.types || (p.types || []).some((t) => assets.types[t] && assets.types[t].p.some(Boolean));
  return { unitsFile, pointList, codes, tools, pacing, design, published, yearWeeks: pacing.yearWeeks || 36 };
}

function run(d) {
  const fails = []; const fail = (g, t) => fails.push(g + '  ' + t);
  const live = d.unitsFile.units.filter((u) => u.status === 'live' && u.subject === subject);
  const taught = new Set(d.unitsFile.units.filter((u) => u.status === 'live').flatMap((u) => u.lessons.map((l) => l.point)));
  const allIds = new Set(d.unitsFile.units.map((u) => u.id));
  const pageTitles = new Set(d.unitsFile.units.flatMap((u) => u.lessons.flatMap((l) => l.paper.map((p) => p.title))));
  for (const grade of Object.keys(d.pacing.teachingWeeks)) {
    const g = d.design[grade]; const w = 'grade ' + grade;
    if (!g) { fail('D1', w + ': not in the design'); continue; }
    const mine = live.filter((u) => String(u.grade) === grade);
    const have = new Map(); for (const u of mine) for (const l of u.lessons) have.set(u.id + '#' + l.n, l);
    const seen = new Map(); const titles = new Map(); let days = 0;
    const leftOut = (g.leftOut || []).map((x) => String(x.what));
    if (!Array.isArray(g.units) || !g.units.length) { fail('D1', w + ': no units'); continue; }
    const unitIds = new Set();
    for (const u of g.units) {
      const uw = w + ' unit ' + u.id;
      if (!u.id || !u.title) fail('D5', uw + ': id or title missing');
      if (unitIds.has(u.id)) fail('D5', uw + ': the unit stands twice'); unitIds.add(u.id);
      const isNew = /^new:/.test(u.id || '');
      if (isNew) { if (!/^new:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(u.id)) fail('D5', uw + ': not a kebab id'); }
      else if (!mine.some((x) => x.id === u.id)) fail('D5', uw + ': no live ' + subject + ' unit of this grade has that id');
      if ((u.lessons || []).length < 4) { fail('D5', uw + ': a unit of ' + (u.lessons || []).length + ' lessons (a unit has at least 4, or it cannot be published)'); if (!(u.lessons || []).length) continue; }
      days += 3;
      for (const [i, l] of u.lessons.entries()) {
        const lw = uw + ' lesson ' + (i + 1);
        if (l.existing) {
          const x = have.get(l.existing);
          if (!x) { fail('D1', lw + ': "' + l.existing + '" is no live lesson of this grade'); continue; }
          if (seen.has(l.existing)) fail('D1', lw + ': ' + l.existing + ' stands twice'); seen.set(l.existing, true);
          days += x.days || 2;
          const t = x.title.toLowerCase(); if (titles.has(t)) fail('D5', lw + ': the title "' + x.title + '" stands twice'); titles.set(t, true);
          continue;
        }
        if (!l.new) { fail('D3', lw + ': neither existing nor new'); continue; }
        if (!l.title || l.title.length < 4) fail('D3', lw + ': no title');
        else { const t = l.title.toLowerCase(); if (titles.has(t)) fail('D5', lw + ': the title "' + l.title + '" stands twice'); titles.set(t, true); }
        if (!(CHILDREN[loc] || CHILDREN.en).test(l.objective || '') || (l.objective || '').length < 40) fail('D3', lw + ' "' + l.title + '": the objective does not start with the children (' + (CHILDREN[loc] || CHILDREN.en).source + ') or is too short to say what they do');
        if (!d.codes.has(l.standard)) fail('D3', lw + ' "' + l.title + '": ' + l.standard + ' is no code of the framework');
        else if (loc === 'en') { const cg = /^(K|\d)\./.exec(l.standard); const order = ['K', '1', '2', '3', '4', '5']; if (cg && order.indexOf(cg[1]) > order.indexOf(grade)) fail('D3', lw + ' "' + l.title + '": ' + l.standard + ' is a standard of a later grade'); }
        if (![2, 3].includes(l.days) || (grade === 'K' && l.days !== 2)) fail('D3', lw + ' "' + l.title + '": ' + l.days + ' days');
        days += [2, 3].includes(l.days) ? l.days : 2;
        if (l.tool != null && !d.tools.has(l.tool)) fail('D4', lw + ' "' + l.title + '": the site has no tool named "' + l.tool + '"');
        const s = String(l.source || '');
        if (s.startsWith('point:')) { const p = d.pointList.find((x) => x.id === s.slice(6)); if (!p) fail('D4', lw + ' "' + l.title + '": ' + s + ' is no teaching point'); else if (taught.has(p.id)) fail('D4', lw + ' "' + l.title + '": ' + s + ' is taught by a live lesson already'); else if (!d.published(p)) fail('D4', lw + ' "' + l.title + '": ' + s + ' has no published page in this language (it is a new page to make, not ready material)'); }
        else if (s.startsWith('reuse:')) { if (!pageTitles.has(s.slice(6))) fail('D4', lw + ' "' + l.title + '": no live lesson hands out a page named "' + s.slice(6) + '"'); }
        else if (s === 'new' || s === 'teacher-led') { if (!l.page || l.page.length < 60) fail('D3', lw + ' "' + l.title + '": a ' + s + ' lesson must describe its page or routine (at least 60 characters)'); }
        else fail('D3', lw + ' "' + l.title + '": source "' + s + '"');
      }
    }
    for (const [key, x] of have) if (!seen.has(key) && !leftOut.some((t) => t.includes(key) || t.toLowerCase().includes(x.title.toLowerCase()))) fail('D1', w + ': the live lesson ' + key + ' "' + x.title + '" is neither in the design nor in leftOut');
    // class days = teaching weeks × the sessions of mathematics in a week (5; the Swedish förskoleklass has 3)
    const total = d.pacing.teachingWeeks[grade] * ((d.pacing.daysPerWeek || {})[grade] || 5);
    if (days < Math.ceil(total * 0.95) || days > total) fail('D2', w + ': ' + days + ' class days counted; the year has ' + total + ' (95% to 100%: ' + Math.ceil(total * 0.95) + ' to ' + total + ')');
    if (g.totalDays !== days) fail('D2', w + ': the design says ' + g.totalDays + ' days, the recount is ' + days);
    // D6
    const used = new Set(); let nonTeaching = 0;
    for (const n of g.nonTeachingWeeks || []) {
      const m = /^(\d+)(?:-(\d+))?$/.exec(String(n.weeks || ''));
      if (!m || !n.what) { fail('D6', w + ': non-teaching weeks "' + n.weeks + '"'); continue; }
      for (let k = +m[1]; k <= +(m[2] || m[1]); k++) { if (k < 1 || k > d.yearWeeks) fail('D6', w + ': week ' + k + ' is outside the year'); if (used.has(k)) fail('D6', w + ': week ' + k + ' is named twice'); used.add(k); nonTeaching++; }
    }
    if (nonTeaching + d.pacing.teachingWeeks[grade] !== d.yearWeeks) fail('D6', w + ': ' + nonTeaching + ' non-teaching weeks and ' + d.pacing.teachingWeeks[grade] + ' teaching weeks do not make ' + d.yearWeeks);
  }
  return fails;
}

const clone = (o) => JSON.parse(JSON.stringify(o));
const gradesOf = (design) => Object.entries(design).filter(([k]) => k !== 'pacing').map(([, v]) => v);
const firstNew = (d) => { for (const g of gradesOf(d.design)) for (const u of g.units || []) for (const l of u.lessons || []) if (l.new) return { g, u, l }; return null; };
const POISONS = [
  ['a live lesson dropped from the design', 'D1', (d) => { const g = gradesOf(d.design)[0]; const u = g.units.find((x) => x.lessons.some((l) => l.existing)); u.lessons.splice(u.lessons.findIndex((l) => l.existing), 1); g.totalDays -= 2; }],
  ['a live lesson placed twice', 'D1', (d) => { const g = gradesOf(d.design)[0]; const u = g.units.find((x) => x.lessons.some((l) => l.existing)); u.lessons.push(clone(u.lessons.find((l) => l.existing))); }],
  ['a year of too few days', 'D2', (d) => { const g = gradesOf(d.design)[0]; g.units = g.units.slice(0, 2); }],
  ['a total the recount does not confirm', 'D2', (d) => { gradesOf(d.design)[0].totalDays += 1; }],
  ['a new lesson without what children do', 'D3', (d) => { firstNew(d).l.objective = 'Adding.'; }],
  ['a new lesson on a code that does not exist', 'D3', (d) => { firstNew(d).l.standard = 'K.ZZ.A.9'; }],
  ['a teaching point with no published page in the language', 'D4', (d) => { const p = d.pointList.find((x) => !new Set(d.unitsFile.units.flatMap((u) => u.lessons.map((l) => l.point))).has(x.id)); firstNew(d).l.source = 'point:' + p.id; d.published = () => false; }],
  ['a new page nobody described', 'D3', (d) => { for (const g of gradesOf(d.design)) for (const u of g.units) for (const l of u.lessons) if (l.new && l.source === 'new') { l.page = 'A page.'; return; } throw new Error('no new-page lesson to spoil'); }],
  ['a tool the site does not have', 'D4', (d) => { firstNew(d).l.tool = 'Magic Abacus'; }],
  ['a teaching point that does not exist', 'D4', (d) => { firstNew(d).l.source = 'point:K:nothing'; }],
  ['a unit of three lessons', 'D5', (d) => { const u = gradesOf(d.design)[0].units[0]; u.lessons.length = 3; }],
  ['two lessons with one title', 'D5', (d) => { const { u, l } = firstNew(d); const c = clone(l); u.lessons.push(c); }],
  ['a week that is not in the year', 'D6', (d) => { gradesOf(d.design)[0].nonTeachingWeeks[0].weeks = '99'; }],
];

if (!fs.existsSync(file)) { console.error('no design at ' + path.relative(REPO, file)); process.exit(1); }
if (process.argv.includes('--poison')) {
  const real = run(load()); let bad = real.length ? 1 : 0;
  if (real.length) console.log('FAIL  the real design does not pass: ' + real[0]);
  for (const [name, gate, spoil] of POISONS) { const d = load(); spoil(d); if (!run(d).some((f) => f.startsWith(gate))) { bad++; console.log('FAIL  poison not caught by ' + gate + ': ' + name); } }
  console.log(bad ? bad + ' poison problem(s)' : 'all ' + POISONS.length + ' poisons caught, the real design passes');
  process.exit(bad ? 1 : 0);
}
const d = load(); const fails = run(d);
for (const f of fails) console.log('FAIL  ' + f);
if (!fails.length) {
  for (const [grade, g] of Object.entries(d.design).filter(([k]) => k !== 'pacing')) { const n = g.units.reduce((a, u) => a + u.lessons.filter((l) => l.new).length, 0), e = g.units.reduce((a, u) => a + u.lessons.filter((l) => l.existing).length, 0); console.log('grade ' + grade + ': ' + g.units.length + ' units, ' + e + ' lessons of today, ' + n + ' new, ' + g.totalDays + ' of ' + d.pacing.teachingWeeks[grade] * ((d.pacing.daysPerWeek || {})[grade] || 5) + ' class days'); }
  console.log('year design ' + loc + ' ' + subject + ': passes');
} else console.log(fails.length + ' problem(s)');
process.exit(fails.length ? 1 : 0);
