#!/usr/bin/env node
/**
 * The BLUEPRINT of the checks of the year (Daily Teaching System, Part 7.7, Stage C-2): for every grade and subject a
 * check of the beginning, the middle and the end of the year, each a list of parts that are lessons of the year's
 * units. Written from the plans and the live unit checks; the result may then be hand-ruled (below).
 *
 *   node scripts/assessments/year/draft.js --loc=en [--check]
 *     → scripts/assessments/year/<loc>.json      (read by build-checks.js --year)
 *
 * Read: frontend/content/units/units.<loc>.json (plans[]: grade, subject, weeks, units[] with from/to; units[] with
 * their lessons and class days) and frontend/content/assessments/checks.<loc>.json (each unit check's parts).
 *
 *   END        one part per unit of the plan: the unit's central lesson, i.e. the part with the most tasks in its unit
 *              check (a tie: the earlier part)
 *   MIDDLE     one part from each unit whose last class day falls within the first half of the plan's class days (days
 *              as scripts/sub-plans/position.js counts them: a lesson its `days`, else 2, and 3 more at the end of each
 *              unit); topped up to at least MIDDLE_MIN parts with the second-best parts of those same units
 *   BEGINNING  Grades 1-3: the previous grade's END list for the same subject (what should be secure on arrival), at the
 *              level that grade hands out, at most BEGIN_MAX parts (approved plan C-2: 6-8; the parts of the units
 *              taught LAST in the previous grade go first: after the summer they are the least secure). Kindergarten:
 *              an entry check of what a child may already know, from the units that start in the first third of the
 *              plan's weeks, the lessons of counting, numerals and shapes (math) or letters and beginning sounds
 *              (literacy), at the EASY level (1).
 *   A year check takes no writing part: a lesson whose unit-check part is the writing part of a rubric is skipped.
 *   ALTERNATES: every part (but those of the Kindergarten entry check) lists the other parts of its unit's check, best
 *   first; build-checks.js --year cuts the first of them that gives a part when the part's own lesson cannot (its
 *   worksheet has few tasks, and the unit check already prints them all). The part stays one part of its unit.
 *
 * A lesson is named by its key (l.id || l.point: lesson numbers move) and its unit; `n` and `title` are what it is
 * today, for a reader. HAND RULINGS stand in `rulings` of the JSON and survive a new draft: per check id, `drop` (a part
 * named by unit and lesson, with its reason) and `add` (a part named by unit and lesson, with its reason); every ruling
 * carries a `reason`. A part the units file no longer holds makes --check fail.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const OUT = path.join(__dirname, loc + '.json');
const C = (...p) => path.join(REPO, 'frontend', 'content', ...p);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const unitsFile = readJson(C('units', 'units.' + loc + '.json'));
const checks = readJson(C('assessments', 'checks.' + loc + '.json')).checks;
const rubrics = (() => { const f = path.join(__dirname, '..', 'rubrics', loc + '.json'); return fs.existsSync(f) ? readJson(f) : {}; })();
const before = fs.existsSync(OUT) ? readJson(OUT) : null;

const BUILD_ORDER = ['end', 'middle', 'beginning'];
const GRADES = ['K', '1', '2', '3'];
const SUBJECTS = ['math', 'literacy'];
const MIDDLE_MIN = 6;
const BEGIN_MAX = 8;
const UNIT_END = 3;                                   // class days at the end of each unit (position.js)
// the lessons of a Kindergarten entry check, by teaching point (what a child may already know when school starts)
const ENTRY_POINTS = {
  math: ['K:numeral-formation', 'K:count-how-many', 'K:count-out-n', 'K:shape-naming'],
  literacy: ['K:letter-identification', 'K:letter-case', 'K:beginning-sounds'],
};
const SLUG_GRADE = { K: 'kindergarten', 1: 'grade-1', 2: 'grade-2', 3: 'grade-3' };
const SLUG_SUBJECT = { math: 'math', literacy: 'ela' };

const units = new Map(unitsFile.units.map((u) => [u.id, u]));
const checkOf = new Map(checks.map((c) => [c.unit, c]));
const keyOf = (l) => l.id || l.point;
const planOf = (g, s) => (unitsFile.plans || []).find((p) => String(p.grade) === g && p.subject === s);

/** the parts of a unit's check, best first: most tasks, then the earlier part; the writing part of a rubric never */
function ranked(unitId) {
  const c = checkOf.get(unitId); if (!c) return [];
  const R = rubrics[unitId];
  return c.parts.filter((p) => !(R && R.type === p.type)).slice().sort((x, y) => (y.tasks - x.tasks) || (x.part - y.part));
}
/** a part of the blueprint: the unit, the lesson's key, what it is today */
function partOf(unitId, p, rank, extra) {
  const u = units.get(unitId), l = u.lessons.find((x) => x.n === p.lesson);
  return Object.assign({ unit: unitId, lesson: keyOf(l), n: l.n, title: l.title, type: p.type, rank }, extra || {});
}
/** the units of a plan with the class day on which each ends, and the plan's class days */
function days(plan) {
  let day = 0;
  const rows = [];
  for (const r of plan.units) {
    const u = units.get(r.id); if (!u) continue;
    for (const l of u.lessons) day += l.days || 2;
    day += UNIT_END;
    rows.push({ unit: r.id, from: r.from, to: r.to, last: day });
  }
  return { rows, of: day };
}
const order = (plan) => (a, b) => (plan.units.findIndex((r) => r.id === a.unit) - plan.units.findIndex((r) => r.id === b.unit)) || (a.n - b.n);

function endOf(plan) {
  const parts = [], left = [];
  for (const r of plan.units) {
    const best = ranked(r.id)[0];
    if (best) parts.push(partOf(r.id, best, 1)); else left.push({ unit: r.id, reason: 'the unit has no unit check with a part' });
  }
  return { parts, left };
}
function middleOf(plan) {
  const d = days(plan), half = d.of / 2;
  const taught = d.rows.filter((r) => r.last <= half);
  const parts = taught.map((r) => ranked(r.unit)[0] && partOf(r.unit, ranked(r.unit)[0], 1)).filter(Boolean);
  // topped up in the order of the units with each unit's second-best part
  for (const r of taught) { if (parts.length >= MIDDLE_MIN) break; const p = ranked(r.unit)[1]; if (p) parts.push(partOf(r.unit, p, 2)); }
  return { parts: parts.sort(order(plan)), half, of: d.of, units: taught.map((r) => ({ unit: r.unit, lastDay: r.last })) };
}
function beginningOf(g, s) {
  if (g === 'K') {
    const plan = planOf('K', s), third = Math.ceil(plan.weeks / 3);
    const parts = [];
    for (const r of plan.units.filter((x) => x.from <= third)) {
      for (const p of ranked(r.id)) {
        const l = units.get(r.id).lessons.find((x) => x.n === p.lesson);
        if (ENTRY_POINTS[s].includes(l.point) && !l.id) parts.push(partOf(r.id, p, null, { level: 1 }));
      }
    }
    return { parts: parts.sort(order(plan)), from: 'entry', weeks: third };
  }
  const prev = GRADES[GRADES.indexOf(g) - 1];
  const plan = planOf(prev, s);
  const all = endOf(plan).parts;
  const cut = all.length > BEGIN_MAX ? all.slice(BEGIN_MAX) : [];
  return { parts: all.slice(0, BEGIN_MAX), from: 'end-of-' + prev, cut: cut.map((p) => ({ unit: p.unit, lesson: p.lesson, reason: 'a check of the beginning has at most ' + BEGIN_MAX + ' parts (plan C-2); the units taught last in Grade ' + prev + ' go first' })) };
}

// ---- the draft ----
const out = [];
for (const g of GRADES) for (const s of SUBJECTS) {
  const plan = planOf(g, s);
  if (!plan) continue;
  // (the END check of a grade and subject is built first, then the middle, then the beginning: a check keeps clear of the
  // boxes of the checks built before it where the pool allows, and the end check of the year should have the first pick)
  for (const t of BUILD_ORDER) {
    const id = 'year-' + g.toLowerCase() + '-' + s + '-' + t;
    const c = { id, grade: g, subject: s, time: t, slug: SLUG_GRADE[g] + '-' + SLUG_SUBJECT[s] + '-beginning-middle-end-of-year', plan: plan.id };
    if (t === 'end') { const e = endOf(plan); c.parts = e.parts; if (e.left.length) c.left = e.left; }
    if (t === 'middle') { const m = middleOf(plan); c.parts = m.parts; c.taughtBy = { half: m.half, of: m.of, units: m.units }; }
    if (t === 'beginning') { const b = beginningOf(g, s); c.parts = b.parts; c.from = b.from; if (b.cut && b.cut.length) c.cut = b.cut; if (b.weeks) c.firstWeeks = b.weeks; }
    out.push(c);
  }
}
// ---- the hand rulings (kept from the file as it was) ----
const rulings = (before && before.rulings) || {};
const problems = [];
for (const [id, r] of Object.entries(rulings)) {
  if (id.startsWith('$')) continue;
  const c = out.find((x) => x.id === id);
  if (!c) { problems.push('a ruling names the check ' + id + ', which is not drafted'); continue; }
  for (const d of r.drop || []) {
    if (!d.reason) problems.push(id + ': a drop without a reason');
    const i = c.parts.findIndex((p) => p.unit === d.unit && p.lesson === d.lesson);
    if (i < 0) { problems.push(id + ': the ruling drops ' + d.unit + ' ' + d.lesson + ', which is not a part'); continue; }
    c.parts.splice(i, 1);
    (c.ruledOut = c.ruledOut || []).push({ unit: d.unit, lesson: d.lesson, reason: d.reason });
  }
  // (a place ruling) the part of a unit takes the first of the named lessons, and the others, in this order, as its only
  // alternates (fix round 2026-11-23: a place ruling may name the LEVEL of the lesson's worksheet its part takes)
  // alternates: an end check that must ask a core skill of the grade (division, rounding, teen numbers) names the lessons
  // of its unit that ask it
  for (const pl of r.place || []) {
    if (!pl.reason) problems.push(id + ': a place ruling without a reason');
    const i = c.parts.findIndex((p) => p.unit === pl.unit);
    if (i < 0) { problems.push(id + ': the ruling places a part of ' + pl.unit + ', which the check has no part of'); continue; }
    const u = units.get(pl.unit), ofCheck = (checkOf.get(pl.unit) || { parts: [] }).parts;
    const ls = (pl.lessons || []).map((key) => { const l = u.lessons.find((x) => keyOf(x) === key); const p = l && ofCheck.find((x) => x.lesson === l.n); return p ? { l, p } : (problems.push(id + ': the ruling places ' + pl.unit + ' ' + key + ', which has no part in its unit check'), null); }).filter(Boolean);
    if (!ls.length) continue;
    c.parts[i] = partOf(pl.unit, ls[0].p, null, Object.assign({ placed: pl.reason }, pl.level ? { level: pl.level } : c.parts[i].level ? { level: c.parts[i].level } : {}, ls.length > 1 ? { alts: ls.slice(1).map(({ l, p }) => ({ lesson: keyOf(l), n: l.n, title: l.title, type: p.type })) } : {}));
  }
  for (const a of r.add || []) {
    if (!a.reason) problems.push(id + ': an add without a reason');
    const u = units.get(a.unit), l = u && u.lessons.find((x) => keyOf(x) === a.lesson);
    const p = l && (checkOf.get(a.unit) || { parts: [] }).parts.find((x) => x.lesson === l.n);
    if (!p) { problems.push(id + ': the ruling adds ' + a.unit + ' ' + a.lesson + ', which has no part in its unit check'); continue; }
    c.parts.push(partOf(a.unit, p, null, Object.assign({ ruled: a.reason }, a.level ? { level: a.level } : {})));
    const plan = planOf(c.time === 'beginning' && c.grade !== 'K' ? GRADES[GRADES.indexOf(c.grade) - 1] : c.grade, c.subject);
    c.parts.sort(order(plan));
  }
}
// ---- a MIDDLE check below its minimum after a ruling is topped up again with the second-best parts of its taught units
// (never of a unit a ruling took out of it: what made the ruling holds for the unit's other lessons too)
for (const c of out.filter((x) => x.time === 'middle')) {
  const plan = planOf(c.grade, c.subject), ruledUnits = new Set((c.ruledOut || []).map((r) => r.unit));
  // (a unit with the fewest parts first, then in teaching order: the check spreads over its units)
  const count = (u) => c.parts.filter((q) => q.unit === u.unit).length;
  for (const u of c.taughtBy.units.slice().sort((x, y) => (count(x) - count(y)) || (c.taughtBy.units.indexOf(x) - c.taughtBy.units.indexOf(y)))) {
    if (c.parts.length >= MIDDLE_MIN) break;
    if (ruledUnits.has(u.unit)) continue;
    const next = ranked(u.unit).find((x) => !c.parts.some((q) => q.unit === u.unit && q.n === x.lesson));
    if (next) c.parts.push(partOf(u.unit, next, 2, { topUp: 'after a ruling' }));
  }
  c.parts.sort(order(plan));
}
// ---- the ALTERNATES of a part: the other parts of its unit's check, best first, not already a part of this check. The
// build takes the first that gives a part when the part's own lesson cannot (a worksheet of few tasks — ten teen numbers,
// four number bonds — whose every box the unit check already prints). The Kindergarten entry check has none: its parts
// are the entry skills themselves.
for (const c of out) {
  if (c.time === 'beginning' && c.grade === 'K') continue;
  for (const p of c.parts) {
    // (a place ruling names its alternates itself; one that is a part of the check by another ruling is not an alternate)
    if (p.ruled) continue;                              // (a part added by a ruling is that lesson, with no alternate)
    if (p.placed) { if (p.alts) { p.alts = p.alts.filter((a) => !c.parts.some((q) => q.unit === p.unit && q.lesson === a.lesson)); if (!p.alts.length) delete p.alts; } continue; }
    const alts = ranked(p.unit).filter((x) => !c.parts.some((q) => q.unit === p.unit && q.n === x.lesson));
    if (alts.length) p.alts = alts.map((x) => { const l = units.get(p.unit).lessons.find((y) => y.n === x.lesson); return { lesson: keyOf(l), n: l.n, title: l.title, type: x.type }; });
  }
}
const text = JSON.stringify({
  $comment: 'The blueprint of the checks of the year (' + loc + '). DRAFTED by scripts/assessments/year/draft.js from the plans (units.' + loc + '.json) and the live unit checks (checks.' + loc + '.json); read by scripts/assessments/build-checks.js --year. Do not edit `checks` by hand: a hand ruling goes in `rulings` (per check id: drop / add, each with a reason) and is applied on every draft.',
  locale: loc,
  rules: { end: 'one part per unit: the part with the most tasks in its unit check (tie: the earlier part)', middle: 'one part per unit whose last class day (lessons days||2, +' + UNIT_END + ' per unit) is within the first half of the plan; topped up to ' + MIDDLE_MIN + ' with second-best parts', beginning: 'Grades 1-3: the previous grade\'s end list, at most ' + BEGIN_MAX + ' parts; Kindergarten: an entry check of ' + Object.values(ENTRY_POINTS).flat().join(', ') + ' at level 1' },
  checks: out,
  rulings,
}, null, 1) + '\n';
if (problems.length) { for (const p of problems) console.log('FAIL  ' + p); process.exit(1); }
if (process.argv.includes('--check')) {
  const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (have !== text) { console.log('FAIL  ' + path.relative(REPO, OUT) + ' is not the draft of today (run draft.js)'); process.exit(1); }
  console.log(loc + ': the blueprint of the year is current');
} else {
  fs.writeFileSync(OUT, text);
  for (const c of out) console.log(c.id.padEnd(30) + c.parts.length + ' parts: ' + c.parts.map((p) => p.unit.replace(/^(k|g\d)-/, '') + ' ' + p.n).join(' · '));
}
