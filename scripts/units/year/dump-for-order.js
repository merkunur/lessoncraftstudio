#!/usr/bin/env node
/**
 * The dump a teacher-reviewer needs to set the TEACHING ORDER of a year and to place every missing lesson
 * (Daily Teaching System, Part 12.1, second round). The first round gave her two units by name, and her order came
 * back with "(not named in the dump)" in it; this dump names every unit, every lesson with its class days and its
 * standards, the teaching points that have worksheets in the language and stand in no unit, and what the national
 * curriculum asks that nothing teaches yet.
 *
 * Two shapes of curriculum:
 *   - by grade with codes (English, Common Core): the year map of the language (docs/…/year/year-map.<loc>.json)
 *     gives, per grade, the standards that need more lessons (has → deserves) and the open objectives with rulings;
 *   - by band without codes (German Bildungsstandards for Klasse 1 to 4, Swedish Lgr22 for förskoleklass and
 *     årskurs 1 to 3): there is no year map; the dump lists once per subject every line of the curriculum that no
 *     live lesson teaches, under its area, and the reviewer places them in a grade herself.
 *
 *   node scripts/units/year/dump-for-order.js --loc=en [--subject=math]   → out/year/<loc>.<subject>.order-dump.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en'), subject = arg('subject', 'math');
const C = path.join(REPO, 'frontend', 'content');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const units = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
const mapFile = path.join(REPO, 'docs', 'daily-teaching-system', 'year', 'year-map.' + loc + '.json');
const map = fs.existsSync(mapFile) ? readJson(mapFile) : null;
const pts = readJson(path.join(C, 'teaching-graph', 'points.json'));
const pointList = Array.isArray(pts) ? pts : (pts.points || Object.values(pts));
const assetsFile = path.join(C, 'teaching-graph', 'assets', loc + '.json');
const assets = fs.existsSync(assetsFile) ? readJson(assetsFile) : null;
const live = units.units.filter((u) => u.status === 'live');
const taught = new Set(live.flatMap((u) => u.lessons.map((l) => l.point)));
const isSubject = (p) => (subject === 'math' ? p.subject === 'math' : (p.subject === 'literacy' || p.subject === 'ela'));
const GRADE = { en: { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' }, de: { 1: 'Klasse 1', 2: 'Klasse 2', 3: 'Klasse 3' }, sv: { K: 'Förskoleklass', 1: 'Årskurs 1', 2: 'Årskurs 2', 3: 'Årskurs 3' } }[loc] || {};
// the frameworks that are the measure of a subject in a language with a band curriculum
const BAND = { de: { math: ['kmk-mathematik'], literacy: ['kmk-deutsch'] }, sv: { math: ['lgr22-matematik', 'lgr22-forskoleklass'], literacy: ['lgr22-svenska', 'lgr22-forskoleklass'] } };
// a teaching point has pages in the language when the asset file of the language lists a published page for it
function pagesIn(p) {
  if (!assets || !assets.types) return (p.types || []).length;
  // assets.types[<type id>].p = the published pages of the type in the language at the three levels
  return (p.types || []).filter((t) => assets.types[t] && assets.types[t].p.some(Boolean)).length;
}

const L = [];
const grades = ['K', '1', '2', '3'].filter((g) => GRADE[g]).filter((g) => live.some((u) => String(u.grade) === g && u.subject === subject));
for (const g of grades) {
  const cell = map ? map.cells.find((c) => c.grade === g && c.subject === subject) : null;
  const mine = live.filter((u) => String(u.grade) === g && u.subject === subject);
  const plan = units.plans.find((p) => p.status === 'live' && String(p.grade) === g && p.subject === subject);
  const inPlan = plan ? plan.units.map((r) => r.id) : [];
  const ordered = [...mine].sort((a, b) => (inPlan.indexOf(a.id) < 0 ? 99 : inPlan.indexOf(a.id)) - (inPlan.indexOf(b.id) < 0 ? 99 : inPlan.indexOf(b.id)));
  const days = mine.reduce((n, u) => n + u.days, 0);
  L.push('# ' + GRADE[g] + ' ' + subject, '');
  if (cell) L.push('Teaching weeks in the year: ' + cell.teachingWeeks + ' of 36. Filled today: ' + cell.today.pacedWeeks + ' weeks (' + cell.today.units + ' units, ' + cell.today.lessons + ' lessons). Empty: ' + cell.gap.weeks + ' weeks, about ' + cell.gap.lessonsNeeded + ' lessons.', '');
  else L.push('Today: ' + mine.length + ' units, ' + mine.reduce((n, u) => n + u.lessons.length, 0) + ' lessons, ' + days + ' class days.', '');
  L.push('## Units today, in the order of the plan' + (plan ? '' : ' (no plan: no order set)'), '');
  for (const u of ordered) {
    L.push('### ' + u.id + ' · "' + u.title + '" · ' + u.lessons.length + ' lessons, ' + u.days + ' class days, about ' + u.weeks + ' weeks' + (inPlan.includes(u.id) ? '' : ' · NOT in the plan'));
    for (const l of u.lessons) L.push('  ' + l.n + '. ' + l.title + ' (' + l.days + ' days' + (l.tool ? ', tool: ' + l.tool.name : ', no tool') + ') [' + [...new Set(l.standards.filter((s) => s.rel === 'teaches').map((s) => s.code || s.title).filter(Boolean))].join(', ') + '] pages: ' + l.paper.map((p) => p.title).join('; '));
    L.push('');
  }
  if (cell) {
    L.push('## Standards you said need more lessons (has today → deserves in a year)', '');
    for (const m of cell.more) L.push('- ' + m.code + ': ' + m.has + ' → ' + m.deserves + '. ' + m.why);
    L.push('');
  }
  const idle = pointList.filter((p) => p.grade === g && isSubject(p) && !taught.has(p.id) && pagesIn(p) > 0);
  L.push('## Teaching points that have worksheets in this language today and stand in no unit (ready material for a lesson)', '');
  for (const p of idle) L.push('- ' + p.id + ' [' + (p.code || 'no code') + '] ' + p.skill + ' (' + pagesIn(p) + ' worksheet types' + ((p.activities || []).length ? ', ' + p.activities.length + ' screen activities' : '') + ')');
  if (!idle.length) L.push('- none');
  L.push('');
  if (cell) {
    L.push('## Objectives nothing teaches yet, with the ruling', '');
    for (const o of cell.open) L.push('- ' + o.code + ' (' + o.state + '): ' + o.answer + (o.unit ? ', unit: ' + o.unit : '') + '. ' + (o.why || ''));
    L.push('');
  }
}
if (!map && BAND[loc] && BAND[loc][subject]) {
  const fw = readJson(path.join(C, 'curricula', loc, 'framework.json'));
  const cw = readJson(path.join(C, 'curricula', loc, 'crosswalk.json')).points;
  const rowsOf = new Map();
  for (const [pid, v] of Object.entries(cw)) for (const r of (v.rows || [])) { if (!rowsOf.has(r.id)) rowsOf.set(r.id, []); rowsOf.get(r.id).push({ point: pid, rel: r.rel }); }
  const byId = new Map(fw.nodes.map((n) => [n.id, n]));
  const area = (n) => { const chain = []; let p = byId.get(n.parent); while (p) { chain.unshift(p.text); p = byId.get(p.parent); } return chain.join(' › '); };
  for (const f of BAND[loc][subject]) {
    const info = fw.frameworks.find((x) => x.key === f);
    const leaves = fw.nodes.filter((n) => n.f === f && (n.kind === 'standard' || n.kind === 'content'));
    const bands = [...new Set(leaves.map((n) => n.grade))].filter((b) => !/^[4-9]/.test(b)); // a band above the grades we teach is not ours
    for (const band of bands) {
      const mine = leaves.filter((n) => n.grade === band);
      const open = mine.filter((n) => !(rowsOf.get(n.id) || []).some((r) => r.rel === 'teaches' && taught.has(r.point)));
      L.push('# ' + (info ? info.title : f) + ', band ' + band + ': ' + open.length + ' of ' + mine.length + ' lines that no live lesson teaches', '');
      let last = '';
      for (const n of open) { const a = area(n); if (a !== last) { L.push('', '## ' + a, ''); last = a; } const near = (rowsOf.get(n.id) || []).length ? ' (a lesson leads up to it or goes beyond it)' : ''; L.push('- ' + n.id + ': ' + n.text + near); }
      L.push('');
    }
  }
}
// the projector tools of the site, by their names in the language
{
  const s = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'manipulatives.ts'), 'utf8');
  const names = []; const re = /id:\s*"([a-z0-9-]+)"/g; let m;
  const pick = (block, key) => { const b = new RegExp(key + ':\\s*\\{([\\s\\S]*?)\\}').exec(block); if (!b) return null; const v = new RegExp('\\b' + loc + ':\\s*"([^"]+)"').exec(b[1]) || /\ben:\s*"([^"]+)"/.exec(b[1]); return v ? v[1] : null; };
  while ((m = re.exec(s))) { const block = s.slice(m.index, m.index + 4000); const t = pick(block, 'title'), g = pick(block, 'tagline'); if (t) names.push(t + (g ? ' (' + g + ')' : '')); }
  L.push('# Classroom tools the site has (for the projector)', '', ...names.map((n) => '- ' + n), '');
}
const out = path.join(REPO, 'out', 'year');
fs.mkdirSync(out, { recursive: true });
const file = path.join(out, loc + '.' + subject + '.order-dump.md');
fs.writeFileSync(file, L.join('\n'));
console.log(path.relative(REPO, file) + ': ' + L.length + ' lines, ' + L.join('\n').length + ' characters');
