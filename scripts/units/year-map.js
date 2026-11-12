#!/usr/bin/env node
/**
 * The year map of a language (Daily Teaching System, Part 12.1): per grade and subject, what the country's
 * curriculum asks for in the year, what the units teach of it today, how many weeks that fills once every teaching
 * point has its days, and what is still to be made. It is the measured answer to "how far is a whole school year?",
 * and the list the new content of Part 12.2 to 12.4 is built from.
 *
 *   reads   frontend/content/units/units.<loc>.json                 the live units and plans (Part 4)
 *           frontend/content/curriculum-pages/pages.<loc>.json      each objective: taught, near, open (Part 6)
 *           frontend/content/curricula/<reg>/{framework,crosswalk}.json   for a grade and subject without a checklist page
 *           frontend/content/teaching-graph/points.json             the teaching points and whether a page exists
 *           scripts/units/year/answers.<loc>.json                   AUTHORED: what answers each open objective
 *   writes  docs/daily-teaching-system/year/year-map.<loc>.json     GENERATED
 *           docs/daily-teaching-system/year/YEAR-MAP.<loc>.md       GENERATED, the same for reading
 *
 *   node scripts/units/year-map.js --loc=en [--check]
 *
 * THE YEAR AND THE DAYS OF A LESSON are the teacher-reviewer's, not mine (scripts/units/year/answers.<loc>.json
 * `pacing`, from reviews/<loc>.review-1.json). My first rule was 32 teaching weeks and 3 days for every teaching
 * point; she ruled that a flat third day is padding (a ten-minute screen task and a five-minute check-up page are the
 * end of day 2, not a day). English, 2026-11-12: 28 of 36 weeks are teaching weeks (26 in Grade 3, which loses two to
 * the state test); a lesson carries 2 days in Kindergarten and 2.5 on average in Grades 1 to 3 (teach; practise at
 * levels and check; a third day to respond only for the lessons that earn it); a unit ends with three days (review,
 * check, respond). So: weeks = (lessons x days per lesson + units x 3) / 5.
 * MORE THAN ONE LESSON. She also named the standards a class needs several lessons for in a year (facts, story
 * problems, regrouping …), `moreLessons`. For each the map counts the lessons that teach it today: the difference is
 * where the empty weeks are filled from, before any new objective is added.
 * Literacy has not had its own review: it is counted with the mathematics rule until it has.
 * THE FIVE ANSWERS for an objective nothing teaches yet (PLAN.md 12.1): a new worksheet type ("worksheet"); a reading
 * text or a book ("text", Part 8); a lesson the teacher leads without a page ("teacher-led"); a screen activity
 * ("activity", built in Part 10); or "not on paper or screen", said openly on the checklist ("none").
 * A default follows from the strand; scripts/units/year/answers.<loc>.json overrides it line by line, with the reason.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const C = path.join(REPO, 'frontend', 'content');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const loc = arg('loc', 'en');
const YEAR_WEEKS = 36;
const GRADES = ['K', '1', '2', '3'];
const GRADE_NAME = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
// which checklist page of the language is the measure of a grade and subject (the national framework, not a state's)
const MEASURE = { en: { math: 'ccss-math', literacy: 'ccss-ela' } };
const SUBJECT_OF_FRAMEWORK = { math: 'math', literacy: 'ela' };
// the default answer by the part of the document an objective stands in
const DEFAULT_ANSWER = {
  en: [
    [/^(K|[1-3])\.(CC|OA|NBT|NF|MD|G)\./, 'worksheet', 'a mathematics objective is practised on a page; the new worksheet type is named when the batch is designed'],
    [/^RL\./, 'text', 'reading literature needs stories to read: the readers and story texts of Part 8, with questions'],
    [/^RI\./, 'text', 'reading informational text needs information texts to read: the theme readers of Part 8, with questions'],
    [/^RF\./, 'worksheet', 'a foundational reading skill (print, sounds, phonics, fluency) is practised on a page and in the decodable readers'],
    [/^W\./, 'worksheet', 'writing is done on a writing page for the kind of text (opinion, information, story), with a rubric (Part 7)'],
    [/^SL\./, 'teacher-led', 'speaking and listening is a lesson the teacher leads: a routine, a classroom tool, what to listen for'],
    [/^L\./, 'worksheet', 'a language objective (grammar, conventions, vocabulary) is practised on a page'],
  ],
};
const natural = (a, b) => { const x = a.split(/[.\-]/), y = b.split(/[.\-]/); for (let i = 0; i < Math.max(x.length, y.length); i++) { const p = x[i] || '', q = y[i] || ''; if (p === q) continue; const m = parseInt(p, 10), n = parseInt(q, 10); if (!isNaN(m) && !isNaN(n) && m !== n) return m - n; return p < q ? -1 : 1; } return 0; };

function build() {
  const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'));
  const live = unitsFile.units.filter((u) => u.status === 'live');
  const pages = fs.existsSync(path.join(C, 'curriculum-pages', 'pages.' + loc + '.json')) ? readJson(path.join(C, 'curriculum-pages', 'pages.' + loc + '.json')).pages : [];
  const points = readJson(path.join(C, 'teaching-graph', 'points.json'));
  const pointList = Array.isArray(points) ? points : (points.points || Object.values(points));
  const answersFile = path.join(__dirname, 'year', 'answers.' + loc + '.json');
  const ruled = fs.existsSync(answersFile) ? readJson(answersFile) : {};
  const answers = ruled.answers || {};
  if (!ruled.pacing) throw new Error('no pacing rule for ' + loc + ' (scripts/units/year/answers.' + loc + '.json): the weeks cannot be counted');
  const PACE = ruled.pacing, MORE = ruled.moreLessons || {};
  const fw = readJson(path.join(C, 'curricula', loc, 'framework.json'));
  const cw = readJson(path.join(C, 'curricula', loc, 'crosswalk.json')).points;
  const taughtPoints = new Set(live.flatMap((u) => u.lessons.map((l) => l.point)));
  const problems = [];
  const out = { locale: loc, yearWeeks: YEAR_WEEKS, pacing: { daysPerLesson: PACE.daysPerLesson, unitEndDays: PACE.unitEndDays, teachingWeeks: PACE.teachingWeeks, rule: PACE.rule }, cells: [] };

  for (const grade of GRADES) for (const subject of ['math', 'literacy']) {
    const mine = live.filter((u) => u.grade === grade && u.subject === subject);
    const plan = unitsFile.plans.find((p) => p.status === 'live' && p.grade === grade && p.subject === subject) || null;
    const lessons = mine.reduce((n, u) => n + u.lessons.length, 0);
    const pointsTaught = new Set(mine.flatMap((u) => u.lessons.map((l) => l.point))).size;
    const DAYS = PACE.daysPerLesson[grade], TEACHING_WEEKS = PACE.teachingWeeks[grade];
    // the units carry their counted class days since Part 4.8 (scripts/units/pacing.js: 2 or 3 days by what each lesson
    // holds, 3 at the end of a unit); the average of the ruling is used only for a unit that has no count yet, and for
    // the lessons still to be written (lessonsToFill below)
    const countedDays = mine.reduce((n, u) => n + (u.days != null ? u.days : u.lessons.length * DAYS + PACE.unitEndDays), 0);
    const pacedWeeks = Math.round((countedDays / 5) * 10) / 10;
    // the objectives of the national framework for this grade and subject
    const fkey = (MEASURE[loc] || {})[subject];
    const page = pages.find((p) => p.framework === fkey && p.grade === grade && p.status === 'live');
    let objectives = [];
    if (page) objectives = page.groups.flatMap((g) => g.items.map((o) => ({ code: o.code, group: g.title, state: o.state, lessons: (o.lessons || []).filter((l) => String(l.unitGrade) === grade).length, lessonsAnyGrade: (o.lessons || []).length })).concat((g.open || []).map((o) => ({ code: typeof o === 'string' ? o : o.code, group: g.title, state: 'open', lessons: 0 }))));
    else if (fkey) {
      // no checklist page (too few lessons for one): the same three states from the registry itself
      const nodes = fw.nodes.filter((n) => n.f === fkey && n.grade === grade);
      const parents = new Set(nodes.filter((n) => n.kind === 'component').map((n) => n.parent));
      const leaves = nodes.filter((n) => n.kind === 'component' || (n.kind === 'standard' && !parents.has(n.id)));
      const rowsOf = new Map();
      for (const [pid, v] of Object.entries(cw)) for (const r of (v.rows || [])) { if (!rowsOf.has(r.id)) rowsOf.set(r.id, []); rowsOf.get(r.id).push({ point: pid, rel: r.rel }); }
      const group = (n) => { let p = n; for (let i = 0; i < 4 && p; i++) { const up = nodes.find((x) => x.id === p.parent); if (!up) break; p = up; if (p.kind === 'strand' || p.kind === 'domain') break; } return p && p !== n ? p.text : ''; };
      objectives = leaves.map((n) => { const rows = rowsOf.get(n.id) || []; const taught = rows.some((r) => r.rel === 'teaches' && taughtPoints.has(r.point)); const near = !taught && rows.length > 0; return { code: n.label || n.id, group: group(n), state: taught ? 'taught' : near ? 'near' : 'open', lessons: 0 }; }).sort((a, b) => natural(a.code, b.code));
    }
    const open = objectives.filter((o) => o.state !== 'taught').map((o) => {
      const a = answers[o.code];
      const rule = ((DEFAULT_ANSWER[loc] || []).find(([re]) => re.test(o.code)) || []);
      if (!a && !rule.length) problems.push(GRADE_NAME[grade] + ' ' + subject + ': ' + o.code + ' has no answer and no default');
      return { code: o.code, group: o.group, state: o.state, answer: a ? a.answer : rule[1] || '?', why: a ? a.why : rule[2] || '', by: a ? 'ruled' : 'default', unit: a && a.unit ? a.unit : null };
    });
    for (const o of open) if (!['worksheet', 'text', 'teacher-led', 'activity', 'none'].includes(o.answer)) problems.push(GRADE_NAME[grade] + ' ' + subject + ': ' + o.code + ' has the answer "' + o.answer + '", which is none of the five');
    // teaching points of this grade and subject that no unit teaches (pages may exist already)
    const idle = pointList.filter((p) => p.grade === grade && (subject === 'math' ? p.subject === 'math' : (p.subject === 'literacy' || p.subject === 'ela')) && !taughtPoints.has(p.id)).length;
    const gapWeeks = Math.max(0, Math.round((TEACHING_WEEKS - pacedWeeks) * 10) / 10);
    // the standards the reviewer says need several lessons a year, against the lessons of THIS grade that teach them
    const more = objectives.filter((o) => MORE[o.code]).map((o) => ({ code: o.code, deserves: MORE[o.code].lessons, has: o.lessons, missing: Math.max(0, MORE[o.code].lessons - o.lessons), why: MORE[o.code].why })).filter((x) => x.missing > 0);
    const moreLessons = more.reduce((n, x) => n + x.missing, 0);
    const lessonsToFill = Math.ceil((gapWeeks * 5) / (DAYS + PACE.unitEndDays / 6));
    out.cells.push({
      grade, subject,
      today: { units: mine.length, lessons, teachingPoints: pointsTaught, planWeeks: plan ? plan.weeks : null, pacedWeeks },
      objectives: { framework: fkey || null, fromPage: !!page, total: objectives.length, taught: objectives.filter((o) => o.state === 'taught').length, near: objectives.filter((o) => o.state === 'near').length, open: objectives.filter((o) => o.state === 'open').length },
      teachingWeeks: TEACHING_WEEKS,
      gap: { weeks: gapWeeks, lessonsNeeded: lessonsToFill, idleTeachingPoints: idle, fromStandardsThatNeedMore: moreLessons, fromOpenObjectives: open.filter((o) => o.answer !== 'none').length },
      more,
      answers: ['worksheet', 'text', 'teacher-led', 'activity', 'none'].reduce((m, k) => { m[k] = open.filter((o) => o.answer === k).length; return m; }, {}),
      open,
    });
  }
  return { out, problems };
}

function markdown(m) {
  const L = [];
  L.push('# The year map, language `' + m.locale + '`', '', 'GENERATED by `scripts/units/year-map.js` from the live units, the checklist pages and the curriculum registry. Do not edit by hand; the rulings are in `scripts/units/year/answers.' + m.locale + '.json`.', '');
  L.push('A school year is ' + m.yearWeeks + ' weeks. By the ruling of a US teacher-reviewer (2026-11-12) ' + m.pacing.teachingWeeks.K + ' of them are teaching weeks (' + m.pacing.teachingWeeks['3'] + ' in Grade 3): the rest goes to the first weeks of school, the benchmark windows, report-card weeks, lost days and the last week. A lesson carries ' + m.pacing.daysPerLesson.K + ' days in Kindergarten and ' + m.pacing.daysPerLesson['1'] + ' on average in Grades 1 to 3; a unit ends with ' + m.pacing.unitEndDays + ' days (review, check, respond). Literacy is counted with the same rule until it has had its own review.', '', '> ' + m.pacing.rule, '');
  L.push('## 1. How far each year is', '', '| Grade | Subject | Units | Lessons | Weeks the plan says today | Weeks with each lesson given its days | Teaching weeks of the year | Weeks still empty | Lessons still needed | Objectives: taught / near / open of all |', '|---|---|---|---|---|---|---|---|---|---|');
  for (const c of m.cells) L.push('| ' + GRADE_NAME[c.grade] + ' | ' + c.subject + ' | ' + c.today.units + ' | ' + c.today.lessons + ' | ' + (c.today.planWeeks == null ? 'no plan' : c.today.planWeeks) + ' | ' + c.today.pacedWeeks + ' | ' + c.teachingWeeks + ' | **' + c.gap.weeks + '** | about ' + c.gap.lessonsNeeded + ' | ' + c.objectives.taught + ' / ' + c.objectives.near + ' / ' + c.objectives.open + ' of ' + c.objectives.total + (c.objectives.fromPage ? '' : ' (no checklist page; counted from the registry)') + ' |');
  const sum = (f) => m.cells.reduce((n, c) => n + f(c), 0);
  L.push('', '**All eight years together:** ' + sum((c) => c.today.pacedWeeks).toFixed(1) + ' of ' + sum((c) => c.teachingWeeks) + ' teaching weeks are filled; about ' + sum((c) => c.gap.lessonsNeeded) + ' lessons are still needed. ' + sum((c) => c.gap.idleTeachingPoints) + ' teaching points exist already and stand in no unit.', '');
  L.push('## 1b. Where the missing mathematics lessons come from', '', 'Two sources, in this order: the standards a class needs several lessons for in a year (the reviewer named them; the table counts the lessons of the grade that teach each today), then the objectives nothing teaches yet (section 3).', '', '| Grade | Lessons still needed | From standards that need more lessons | From objectives nothing teaches yet | Standards that need more (has → deserves) |', '|---|---|---|---|---|');
  for (const c of m.cells.filter((x) => x.subject === 'math')) L.push('| ' + GRADE_NAME[c.grade] + ' | about ' + c.gap.lessonsNeeded + ' | ' + c.gap.fromStandardsThatNeedMore + ' | ' + c.gap.fromOpenObjectives + ' | ' + c.more.map((x) => '`' + x.code + '` ' + x.has + ' → ' + x.deserves).join(', ') + ' |');
  L.push('');
  L.push('## 2. What answers the objectives nothing teaches yet', '', '| Grade | Subject | A new worksheet type | A text or a book | A teacher-led lesson | A screen activity | Not on paper or screen |', '|---|---|---|---|---|---|---|');
  for (const c of m.cells) L.push('| ' + GRADE_NAME[c.grade] + ' | ' + c.subject + ' | ' + c.answers.worksheet + ' | ' + c.answers.text + ' | ' + c.answers['teacher-led'] + ' | ' + c.answers.activity + ' | ' + c.answers.none + ' |');
  L.push('| **all** | | **' + sum((c) => c.answers.worksheet) + '** | **' + sum((c) => c.answers.text) + '** | **' + sum((c) => c.answers['teacher-led']) + '** | **' + sum((c) => c.answers.activity) + '** | **' + sum((c) => c.answers.none) + '** |', '');
  L.push('An objective counts once here even when several objectives will share one new worksheet type or one book; the number of types and books is set when each batch is designed (Part 12.2 to 12.4).', '');
  L.push('## 3. The open objectives, line by line', '');
  for (const c of m.cells) {
    if (!c.open.length) continue;
    L.push('### ' + GRADE_NAME[c.grade] + ', ' + c.subject, '');
    let g = null;
    for (const o of c.open) { if (o.group !== g) { g = o.group; L.push('', '**' + (g || 'other') + '**', ''); } L.push('- `' + o.code + '` (' + (o.state === 'near' ? 'only prepared today' : 'nothing today') + '): **' + o.answer + '**' + (o.unit ? ', in the unit "' + o.unit + '"' : '') + (o.by === 'ruled' ? '. ' + o.why : '')); }
    L.push('');
  }
  return L.join('\n') + '\n';
}

if (require.main === module) {
  const { out, problems } = build();
  for (const p of problems) console.log('PROBLEM  ' + p);
  const dir = path.join(REPO, 'docs', 'daily-teaching-system', 'year');
  const jf = path.join(dir, 'year-map.' + loc + '.json'), mf = path.join(dir, 'YEAR-MAP.' + loc + '.md');
  const json = JSON.stringify(out, null, 1) + '\n', md = markdown(out);
  if (process.argv.includes('--check')) {
    const same = fs.existsSync(jf) && fs.readFileSync(jf, 'utf8').replace(/\r\n/g, '\n') === json && fs.existsSync(mf) && fs.readFileSync(mf, 'utf8').replace(/\r\n/g, '\n') === md;
    if (!same || problems.length) { console.log('year map ' + loc + ': the committed files are not what the script writes today'); process.exit(1); }
    console.log('year map ' + loc + ': current');
  } else {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(jf, json); fs.writeFileSync(mf, md);
    for (const c of out.cells) console.log(GRADE_NAME[c.grade].padEnd(13) + c.subject.padEnd(9) + ' units ' + String(c.today.units).padStart(2) + '  lessons ' + String(c.today.lessons).padStart(2) + '  paced weeks ' + String(c.today.pacedWeeks).padStart(5) + ' of ' + c.teachingWeeks + '  empty ' + String(c.gap.weeks).padStart(5) + '  lessons needed ' + String(c.gap.lessonsNeeded).padStart(3) + ' (more-lessons ' + c.gap.fromStandardsThatNeedMore + ', open ' + c.gap.fromOpenObjectives + ')  objectives ' + c.objectives.taught + '/' + c.objectives.near + '/' + c.objectives.open + ' of ' + c.objectives.total + '  answers ' + JSON.stringify(c.answers));
    if (problems.length) process.exit(1);
  }
}
module.exports = { build };
