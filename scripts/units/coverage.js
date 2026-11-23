#!/usr/bin/env node
/**
 * The coverage report of one language (Daily Teaching System, item 2 of the programme; PLAN.md §13): is the school year
 * covered, per grade and subject? The operator's measure (2026-11-12, verbatim "the whole year, exhaustive"): no empty
 * week, no unit without a check, no week without a sub day; on top the checks of the year and the placement checks.
 *
 *   node scripts/units/coverage.js --loc=en            → docs/daily-teaching-system/units/COVERAGE.<loc>.md
 *   node scripts/units/coverage.js --loc=en --check    exit 1 when the committed report is not today's
 *   node scripts/units/coverage.js --loc=en --gate     the RATCHET (deploy.sh): every gap must be listed in
 *                                                     scripts/units/coverage-known.<loc>.json, and every listed gap
 *                                                     must still be a gap (a closed gap is taken off the list, so the
 *                                                     list only shrinks). --poison proves both directions.
 *   node scripts/units/coverage.js --loc=en --freeze   writes the list from today's gaps (once, when the gate is made)
 *
 * Gaps, each with a stable id:
 *   weeks:<plan>            the plan covers fewer than TARGET_WEEKS teaching weeks (about 28 of a school year of 36)
 *   hole:<plan>:<w>         week w inside the plan that no unit covers
 *   check:<unit>            a unit of a plan without a live unit check
 *   year:<grade>-<subject>:<time>   no live check of the year (beginning, middle, end)
 *   placement:<path>        no live placement check of the skill path
 *   subday:<grade>:<w>      week w of the grade (1 to its longest plan) without a sub day for that week
 * Reads only committed files: units.<loc>.json, assessments/checks.<loc>.json, assessments/year.<loc>.json and
 * placement.<loc>.json (when they exist), sub-plans/packs.<loc>.json (a pack with a `week` covers that week).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const has = (k) => process.argv.includes('--' + k);
const loc = arg('loc', 'en');
const TARGET_WEEKS = 28;
// A content area (science, social studies, health; Stage D) is measured against the teaching weeks its own year design
// gives the grade (scripts/units/year/design.<loc>.<subject>.json pacing.teachingWeeks: 28, and 26 in Grade 3); the daily
// subjects keep 28.
const targetWeeks = (subject, grade) => {
  const f = path.join(__dirname, 'year', 'design.' + loc + '.' + subject + '.json');
  if (['math', 'literacy'].includes(subject) || !fs.existsSync(f)) return TARGET_WEEKS;
  const tw = (JSON.parse(fs.readFileSync(f, 'utf8')).pacing || {}).teachingWeeks || {};
  return tw[String(grade)] || TARGET_WEEKS;
};
const TIMES = ['beginning', 'middle', 'end'];
const PATHS = ['counting-number-sense', 'addition-subtraction-facts', 'place-value', 'multiplication-facts', 'letters-sounds', 'blending-decoding', 'sight-words', 'spelling-patterns', 'sentence-writing'];
const PATH_WORDS = { 'counting-number-sense': 'Counting and number sense', 'addition-subtraction-facts': 'Addition and subtraction facts', 'place-value': 'Place value', 'multiplication-facts': 'Multiplication facts', 'letters-sounds': 'Letters and sounds', 'blending-decoding': 'Blending and decoding', 'sight-words': 'Sight words', 'spelling-patterns': 'Spelling patterns', 'sentence-writing': 'Sentence writing' };
const GRADE_WORDS = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const C = (...p) => path.join(REPO, 'frontend', 'content', ...p);
const REPORT = path.join(REPO, 'docs', 'daily-teaching-system', 'units', 'COVERAGE.' + loc + '.md');
const KNOWN = path.join(__dirname, 'coverage-known.' + loc + '.json');

/** the gaps of the language, from its committed files (or from the files a poison case hands in) */
function measure(F) {
  const units = new Map(F.units.units.map((u) => [u.id, u]));
  const liveCheck = new Set((F.checks.checks || F.checks || []).filter((c) => c.status === 'live').map((c) => c.unit));
  const year = new Set((F.year.checks || []).filter((c) => c.status === 'live').map((c) => c.grade + '-' + c.subject + ':' + c.time));
  const placement = new Set((F.placement.checks || []).filter((c) => c.status === 'live').map((c) => c.path));
  const subWeeks = new Map();   // grade → set of weeks with a live sub day
  for (const p of F.packs.packs || []) if (p.status === 'live' && p.week) { if (!subWeeks.has(String(p.grade))) subWeeks.set(String(p.grade), new Set()); subWeeks.get(String(p.grade)).add(p.week); }
  const rows = [], gaps = [];
  const longest = new Map();    // grade → its longest plan in weeks
  for (const plan of F.units.plans || []) {
    const g = String(plan.grade);
    const weeks = new Set();
    for (const r of plan.units) for (let w = r.from; w <= r.to; w++) weeks.add(w);
    const holes = []; for (let w = 1; w <= plan.weeks; w++) if (!weeks.has(w)) holes.push(w);
    const noCheck = plan.units.filter((r) => units.has(r.id) && !liveCheck.has(r.id)).map((r) => r.id);
    const yearMissing = TIMES.filter((t) => !year.has(g + '-' + plan.subject + ':' + t));
    if (plan.weeks < targetWeeks(plan.subject, g)) gaps.push('weeks:' + plan.id);
    holes.forEach((w) => gaps.push('hole:' + plan.id + ':' + w));
    noCheck.forEach((u) => gaps.push('check:' + u));
    yearMissing.forEach((t) => gaps.push('year:' + g + '-' + plan.subject + ':' + t));
    longest.set(g, Math.max(longest.get(g) || 0, plan.weeks));
    rows.push({ plan: plan.id, grade: g, subject: plan.subject, target: targetWeeks(plan.subject, g), weeks: plan.weeks, units: plan.units.length, holes, noCheck, yearMissing });
  }
  const subRows = [];
  for (const [g, n] of longest) {
    const have = subWeeks.get(g) || new Set();
    const missing = []; for (let w = 1; w <= n; w++) if (!have.has(w)) missing.push(w);
    missing.forEach((w) => gaps.push('subday:' + g + ':' + w));
    subRows.push({ grade: g, weeks: n, have: n - missing.length, missing });
  }
  const placeMissing = PATHS.filter((p) => !placement.has(p));
  placeMissing.forEach((p) => gaps.push('placement:' + p));
  return { rows, subRows, placeMissing, gaps: gaps.sort() };
}

function load() {
  return {
    units: readJson(C('units', 'units.' + loc + '.json'), { units: [], plans: [] }),
    checks: readJson(C('assessments', 'checks.' + loc + '.json'), { checks: [] }),
    year: readJson(C('assessments', 'year.' + loc + '.json'), { checks: [] }),
    placement: readJson(C('assessments', 'placement.' + loc + '.json'), { checks: [] }),
    packs: readJson(C('sub-plans', 'packs.' + loc + '.json'), { packs: [] }),
  };
}

const runs = (a) => { const out = []; for (const w of a) { const last = out[out.length - 1]; if (last && w === last[1] + 1) last[1] = w; else out.push([w, w]); } return out.map(([a1, b]) => (a1 === b ? String(a1) : a1 + '–' + b)).join(', '); };

function report(m) {
  const L = [];
  L.push('# Coverage of the school year: ' + loc);
  L.push('');
  L.push('Generated by `scripts/units/coverage.js --loc=' + loc + '` from the committed content files. The measure (PLAN.md §13, operator 2026-11-12): no empty week, no unit without a check, no week without a sub day, and the checks of the year and the placement checks. A plan of fewer than ' + TARGET_WEEKS + ' teaching weeks is a gap of content, not of pacing.');
  L.push('');
  L.push('## Plans');
  L.push('');
  L.push('| Grade | Subject | Weeks (of ' + TARGET_WEEKS + ') | Units | Weeks no unit covers | Units without a check | Checks of the year missing | Complete |');
  L.push('|---|---|---|---|---|---|---|---|');
  for (const r of m.rows) {
    const done = r.weeks >= r.target && !r.holes.length && !r.noCheck.length && !r.yearMissing.length;
    L.push('| ' + GRADE_WORDS[r.grade] + ' | ' + r.subject + ' | ' + r.weeks + ' | ' + r.units + ' | ' + (r.holes.length ? runs(r.holes) : 'none') + ' | ' + (r.noCheck.length ? r.noCheck.join(', ') : 'none') + ' | ' + (r.yearMissing.length ? r.yearMissing.join(', ') : 'none') + ' | ' + (done ? 'yes' : 'no') + ' |');
  }
  L.push('');
  L.push('## Sub days, one for every week of the grade\'s longest plan');
  L.push('');
  L.push('| Grade | Weeks | With a sub day | Weeks without one |');
  L.push('|---|---|---|---|');
  for (const s of m.subRows) L.push('| ' + GRADE_WORDS[s.grade] + ' | ' + s.weeks + ' | ' + s.have + ' | ' + (s.missing.length ? runs(s.missing) : 'none') + ' |');
  L.push('');
  L.push('## Placement checks (one per skill path, across grades)');
  L.push('');
  for (const p of PATHS) L.push('- ' + PATH_WORDS[p] + ': ' + (m.placeMissing.includes(p) ? 'missing' : 'live'));
  L.push('');
  L.push('## In numbers');
  L.push('');
  L.push(m.gaps.length + ' gaps: ' + Object.entries(m.gaps.reduce((o, g) => { const k = g.split(':')[0]; o[k] = (o[k] || 0) + 1; return o; }, {})).map(([k, n]) => k + ' ' + n).join(', ') + '.');
  L.push('');
  return L.join('\n');
}

function ratchet(m, known) {
  const now = new Set(m.gaps), list = new Set(known);
  const fresh = m.gaps.filter((g) => !list.has(g));
  const closed = known.filter((g) => !now.has(g));
  return { fresh, closed };
}

if (has('freeze')) {
  const m = measure(load());
  fs.writeFileSync(KNOWN, JSON.stringify({ $comment: 'The coverage gaps of ' + loc + ' frozen by scripts/units/coverage.js --freeze. This list may only SHRINK: a gap that is closed is taken off it (the gate fails until it is), and no new gap may be added to make a build pass.', gaps: m.gaps }, null, 1) + '\n');
  console.log('[coverage] froze ' + m.gaps.length + ' gaps → ' + path.relative(REPO, KNOWN));
} else if (has('gate')) {
  const known = readJson(KNOWN, null);
  if (!known) { console.error('[coverage] no ' + path.relative(REPO, KNOWN)); process.exit(1); }
  let bad = 0;
  const F = load();
  const m = measure(F);
  const r = ratchet(m, known.gaps);
  if (r.fresh.length) { bad++; console.error('[coverage] NEW gaps (fix them; never add them to the list): ' + r.fresh.slice(0, 10).join(', ') + (r.fresh.length > 10 ? ' …' : '')); }
  if (r.closed.length) { bad++; console.error('[coverage] gaps closed but still listed (take them off ' + path.relative(REPO, KNOWN) + '): ' + r.closed.slice(0, 10).join(', ') + (r.closed.length > 10 ? ' …' : '')); }
  if (has('poison')) {
    // P1: a unit of a plan loses its live check → a new gap
    const F1 = JSON.parse(JSON.stringify(F));
    const unitWithCheck = F1.units.plans.flatMap((p) => p.units.map((u) => u.id)).find((id) => (F1.checks.checks || []).some((c) => c.unit === id && c.status === 'live'));
    (F1.checks.checks || []).forEach((c) => { if (c.unit === unitWithCheck) c.status = 'pilot'; });
    const p1 = ratchet(measure(F1), known.gaps);
    // P2: a listed gap closes (here: a week of a grade gets a sub day) while the list still names it
    const F2 = JSON.parse(JSON.stringify(F));
    const sub = known.gaps.find((g) => g.startsWith('subday:')) || known.gaps.find((g) => g.startsWith('year:'));
    if (sub && sub.startsWith('subday:')) { const [, g, w] = sub.split(':'); F2.packs.packs = (F2.packs.packs || []).concat([{ status: 'live', grade: g, week: +w }]); }
    else if (sub) { const [, gs, t] = sub.split(':'); const [g, s] = gs.split('-'); F2.year.checks = (F2.year.checks || []).concat([{ status: 'live', grade: g, subject: s, time: t }]); }
    const p2 = sub ? ratchet(measure(F2), known.gaps) : { closed: [] };
    const ok1 = p1.fresh.includes('check:' + unitWithCheck), ok2 = !sub || p2.closed.includes(sub);
    console.log('[coverage --poison] a check removed: ' + (ok1 ? 'caught' : 'MISSED') + '; a listed gap closed: ' + (ok2 ? 'caught' : 'MISSED'));
    if (!ok1 || !ok2) bad++;
  }
  if (bad) process.exit(1);
  console.log('[coverage] ' + loc + ': ' + m.gaps.length + ' gaps, every one of them listed and still open');
} else {
  const m = measure(load());
  const text = report(m);
  if (has('check')) {
    const old = fs.existsSync(REPORT) ? fs.readFileSync(REPORT, 'utf8').replace(/\r\n/g, '\n') : '';
    if (old !== text) { console.error('[coverage] ' + path.relative(REPO, REPORT) + ' is not today\'s report: node scripts/units/coverage.js --loc=' + loc); process.exit(1); }
    console.log('[coverage] ' + loc + ': the report is current');
  } else {
    fs.writeFileSync(REPORT, text);
    console.log('[coverage] ' + path.relative(REPO, REPORT) + ': ' + m.gaps.length + ' gaps');
  }
}
