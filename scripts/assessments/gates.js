#!/usr/bin/env node
/**
 * Gates of the unit checks (Daily Teaching System, Part 7; design: docs/daily-teaching-system/PART-7-DESIGN.md).
 * Reads committed files only (the server runs it in deploy.sh): content/assessments/{checks,ui}.<loc>.json and the
 * units of the language.
 *
 *   node scripts/assessments/gates.js            every language that has a checks file
 *   node scripts/assessments/gates.js --poison   also proves that each gate catches its fault
 *
 *   T1  blueprint   a check has at least 3 parts; every part has a task; forms A and B have the same parts with the
 *                   same number of tasks
 *   T2  two forms   no task of form A is a task of form B (compared by the fingerprint of what the task asks)
 *   T3  the unit    the check belongs to a live unit; every part belongs to a lesson of it, a lesson has at most one
 *                   part, and parts and "not in the check" together are exactly the unit's lessons
 *   T6  wording     no string says free, percentile, mastery, diagnos…, or "standardized" outside "not a standardized
 *                   test"; the section and the teacher pages both say what the check is NOT
 *   T7  position    over all single-choice parts of a language, the right option does not sit in the same place in
 *                   form A and form B in more than half of them
 *   T9  same level  card by card, form B asks the kind of task form A asks, at about the same size; the boxes of a
 *                   part do not share a total
 *   T8  strings     a language has every string the English file has
 *   T10 writing     (Wave 4) a writing unit (a literacy unit that hands out a type with a checkWrite hook) has a check
 *                   with a writing part built from its rubric (scripts/assessments/rubrics/<loc>.json); every rubric has a
 *                   content and a conventions point, three levels per point that do not show the same, an example per
 *                   level, three "next" lines, two different tasks its type's checkWrite holds, and no word diagnos…
 *                   (each case has a fault that must fire and a control that must pass: --poison runs both)
 *   (Stage C-2) THE CHECKS OF THE YEAR (content/assessments/year.<loc>.json; blueprint scripts/assessments/year/<loc>.json;
 *   the unit checks' box prints scripts/assessments/year/unit-tasks.<loc>.json):
 *   T11 year forms  forms A and B as the unit rules require (T1, T2, T9); the parts are the blueprint's; every part is a
 *                   lesson of a live unit, named as the unit names it today; a beginning part comes from the year before
 *                   (Kindergarten: from its own plan)
 *   T12 end         the END check holds a part from every unit of its plan, or a ruling of the blueprint names why not
 *   T13 middle      a MIDDLE part comes only from a unit whose last class day lies in the first half of the plan's class
 *                   days (counted here, as scripts/sub-plans/position.js counts them)
 *   T14 own boxes   no box of a year form is a box of a unit check's form: not the same text, pictures and answer (a
 *                   drawing only: the same type and fingerprint — lib/task-print.js), and not the same worksheet type
 *                   with the same fingerprint of what the card asks (the same story, the same fact of one type); the
 *                   list of the unit checks' boxes is the one of the committed unit checks
 *   T15 pages       the page of each grade and subject has a title of at most 65 characters and a description of 120 to
 *                   160; the Kindergarten entry check says that it checks what a child already knows, not what was
 *                   taught; the honest sentences say it is not a standardized test
 *   (Stage C-3) THE PLACEMENT CHECKS (content/assessments/placement.<loc>.json; blueprint scripts/assessments/placement/<loc>.json):
 *   T16 ladder      the steps stand in grade order and never two of one lesson; every step is a lesson of a live unit,
 *                   named as the unit names it today (its "start at" link), the blueprint's step or one of its alternates;
 *                   forms A and B as the unit rules require; the writing part (sentence writing) is built from its rubric
 *   T17 own boxes   no box of a placement form is a box of a unit check or of a check of the year (the same text, pictures
 *                   and answer — lib/task-print.js — or the same worksheet type and fingerprint)
 *   T18 pages       the stop rule stands on the teacher pages and the page; the honest sentences say it is not a
 *                   standardized test; each page has a title of at most 65 characters and a description of 120 to 160
 *   (fix round 2026-11-23) THE NO-REPEAT RULE:
 *   T19 related     no box repeats between the three checks of the year of one grade and subject, between the end check
 *                   of a grade and the beginning check of the next (the same subject), nor between a check of the year
 *                   and a placement check: not the same print (text, pictures, answer), not the same task of the same
 *                   worksheet type (its fingerprint), not the same word answer of the same type, not the same text read
 *                   (the last two: forms.<A|B>.more, hashed, written by build-checks.js)
 *   (T8: the strings of the checks of the year — keys year…, tpYear… — are ENGLISH FIRST: a language without checks of
 *    the year does not need them; a language with them needs every one)
 *   (T1 counts the writing part as a part: two cut parts and a writing part are three)
 *   (T6 also binds the hub: its own honest sentence says that a unit check is not a standardized test)
 *
 * PC only, before a deploy (it reads what build-checks.js built): node scripts/assessments/assemble.js --loc=<loc> --check
 * Measured in the build itself (build-checks.js stops on them): every card carries its answer (T1 of the design), no
 * section leaves its page (T4).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = path.join(__dirname, '..', '..', 'frontend', 'content');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const BANNED = {
  en: /\b(free|percentile\w*|mastery|diagnos\w*|norm-referenced|grade equivalent)\b/i,
  // German: no "kostenlos / gratis", no rank or diagnosis words, and none of the names of the official tests
  // (VERA, Vergleichsarbeiten, Lernstandserhebung, Kompetenztest): a check of ours is a classroom check
  de: /(?<!\p{L})(kostenlos\p{L}*|gratis|prozentrang\p{L}*|diagnos\p{L}*|vera|vergleichsarbeit\p{L}*|lernstandserhebung\p{L}*|kompetenztest\p{L}*)(?!\p{L})/iu,
};
// Swedish: also the names of Skolverket's own materials, and "avstämning": "Avstämning A / B / C" are the points of
// Skolverket's bedömningsstöd in reading and writing, so a page of ours with that name reads as a part of it (review
// sv.review-1; the check is called "kunskapskoll")
BANNED.sv = /(?<!\p{L})(gratis|kostnadsfri\p{L}*|percentil\p{L}*|diagnos\p{L}*|nationell\p{L}* prov\p{L}*|bedömningsstöd\p{L}*|kartläggning\p{L}*|avstämning\p{L}*)(?!\p{L})/iu;
const NOT_STANDARDIZED = { en: /\bnot a standardized test\b/i, de: /(?<!\p{L})kein standardisierter Test(?!\p{L})/i, sv: /(?<!\p{L})inget standardiserat test(?!\p{L})/i };
const STANDARDIZED = { en: /\bstandardi[sz]ed\b/gi, de: /standardisiert\p{L}*/giu, sv: /standardisera\p{L}*/giu };

function load() {
  const d = {};
  for (const f of fs.readdirSync(path.join(C, 'assessments')).filter((x) => /^checks\.[a-z]{2}\.json$/.test(x))) {
    const loc = f.split('.')[1];
    d[loc] = { checks: readJson(path.join(C, 'assessments', f)).checks, ui: readJson(path.join(C, 'assessments', 'ui.' + loc + '.json')), units: readJson(path.join(C, 'units', 'units.' + loc + '.json')).units };
    // (Wave 4) the rubrics of the writing parts (scripts/assessments/rubrics/<loc>.json; committed, read here, never served)
    const rf = path.join(__dirname, 'rubrics', loc + '.json');
    d[loc].rubrics = fs.existsSync(rf) ? readJson(rf) : {};
  }
  d._en = readJson(path.join(C, 'assessments', 'ui.en.json'));
  // (Stage C-2) the checks of the year of a language, their blueprint and the prints of its unit checks' boxes
  for (const loc of Object.keys(d).filter((k) => k !== '_en')) {
    const yf = path.join(C, 'assessments', 'year.' + loc + '.json');
    if (!fs.existsSync(yf)) continue;
    d[loc].year = readJson(yf).checks;
    d[loc].plans = readJson(path.join(C, 'units', 'units.' + loc + '.json')).plans || [];
    const bp = path.join(__dirname, 'year', loc + '.json'), ut = path.join(__dirname, 'year', 'unit-tasks.' + loc + '.json');
    d[loc].blueprint = fs.existsSync(bp) ? readJson(bp) : { checks: [], rulings: {} };
    d[loc].unitTasks = fs.existsSync(ut) ? readJson(ut).units : null;
  }
  // (Stage C-3) the placement checks of a language and their blueprint
  for (const loc of Object.keys(d).filter((k) => k !== '_en')) {
    const pf = path.join(C, 'assessments', 'placement.' + loc + '.json');
    if (!fs.existsSync(pf)) continue;
    d[loc].placement = readJson(pf).checks;
    d[loc].plans = d[loc].plans || readJson(path.join(C, 'units', 'units.' + loc + '.json')).plans || [];
    const bp = path.join(__dirname, 'placement', loc + '.json'), ut = path.join(__dirname, 'year', 'unit-tasks.' + loc + '.json');
    d[loc].placeBlueprint = fs.existsSync(bp) ? readJson(bp) : { checks: [] };
    if (d[loc].unitTasks === undefined) d[loc].unitTasks = fs.existsSync(ut) ? readJson(ut).units : null;
  }
  return d;
}

// ---- (Stage C-2) T11: the checks of the year ----
// keys of the strings of the checks of the year: English first (T8 asks them of a language only once it has such checks)
const ENGLISH_FIRST = (k) => /^(year|tpYear|place|tpPlace)/.test(k);
const crypto = require('crypto');
const formsHash = (c) => crypto.createHash('sha1').update(JSON.stringify([c.forms.A.cards, c.forms.B.cards])).digest('hex').slice(0, 16);
const fillS = (s, v) => String(s || '').replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
/** the class day on which each unit of a plan ends, and the plan's class days (a lesson its days, else 2; 3 more a unit) */
function planDays(plan, units) {
  let day = 0; const last = new Map();
  for (const r of plan.units) { const u = units.find((x) => x.id === r.id); if (!u) continue; for (const l of u.lessons) day += l.days || 2; day += 3; last.set(r.id, day); }
  return { last, of: day };
}
// ---- (second fix round) the ITEMS of a form: the item with its answer, the picture with its answer, a sentence, a frame ----
function formItems(c, k) {
  const m = new Map();
  ((c.forms[k] || {}).more || []).forEach((ps, i) => (ps || []).forEach((ks, j) => (ks || []).forEach((x) => { if (/^(wa|pa|se|fr):/.test(x) && !m.has(x)) m.set(x, 'part ' + (i + 1) + ' box ' + (j + 1)); })));
  return m;
}
/** form A and form B of one check never ask one item (log lock / lock log with the same picture; rock read in both forms) */
function itemFails(code, w, c, fail) { const a = formItems(c, 'A'); for (const [x, where] of formItems(c, 'B')) if (a.has(x)) fail(code, w + ': form B ' + where + ' asks the item of form A ' + a.get(x) + ' (' + (x.startsWith('pa:') ? 'the same picture and answer' : x.startsWith('se:') ? 'the same sentence' : x.startsWith('fr:') ? 'the same sentence frame' : 'the same item and answer') + ')'); }
// ---- (fix round 2026-11-23) T19: the no-repeat rule between related checks ----
const YEAR_ID = /^year-(k|\d)-([a-z]+)-(beginning|middle|end)$/;
/** two checks of the year the rule keeps apart: one grade and subject; or the end of a grade and the beginning of the next */
function relatedYear(a, b) {
  const x = YEAR_ID.exec(a), y = YEAR_ID.exec(b), G = ['k', '1', '2', '3'];
  if (!x || !y || x[2] !== y[2] || a === b) return false;
  if (x[1] === y[1]) return true;
  const nx = G.indexOf(x[1]), ny = G.indexOf(y[1]);
  // (second fix round) the beginning check of a grade: kept apart from the end AND the middle check of the grade before
  return (ny === nx + 1 && x[3] !== 'beginning' && y[3] === 'beginning') || (nx === ny + 1 && y[3] !== 'beginning' && x[3] === 'beginning');
}
function relatedFails(loc, L, fail) {
  const what = (x) => (x.startsWith('pa:') ? 'the same picture and answer' : x.startsWith('se:') ? 'the same sentence' : x.startsWith('wa:') ? 'the same word answer of its worksheet type' : x.startsWith('tx:') ? 'the same text read' : x.startsWith('ts:') ? 'the same task of its worksheet type' : 'the same box');
  const keysOf = (c, parts) => {
    const m = new Map();
    for (const k of ['A', 'B']) parts.forEach((q, i) => {
      const add = (x, j) => { if (x && !m.has(x)) m.set(x, 'form ' + k + ' part ' + (i + 1) + ' box ' + (j + 1)); };
      (c.forms[k].tasks[i] || []).forEach(add);
      (c.forms[k].cards[i] || []).forEach((sig, j) => add('ts:' + q.type + '|' + sig, j));
      ((c.forms[k].more || [])[i] || []).forEach((ks, j) => (ks || []).forEach((x) => { if (!x.startsWith('fr:')) add(x, j); }));
    });
    return m;
  };
  const Y = L.year || [], P = L.placement || [];
  for (const c of Y.concat(P)) for (const k of ['A', 'B']) if (!Array.isArray(c.forms[k].more) || c.forms[k].more.length !== c.forms[k].tasks.length) fail('T19', loc + ' ' + c.id + ' form ' + k + ': no fingerprints of the no-repeat rule (rebuild the check)');
  const pairs = [];
  for (let i = 0; i < Y.length; i++) for (let j = i + 1; j < Y.length; j++) if (relatedYear(Y[i].id, Y[j].id)) pairs.push([Y[i], Y[i].parts, Y[j], Y[j].parts]);
  for (const y of Y) for (const q of P) pairs.push([y, y.parts, q, q.steps]);
  for (const [a, ap, b, bp] of pairs) {
    const ka = keysOf(a, ap);
    for (const [x, w] of keysOf(b, bp)) if (ka.has(x)) fail('T19', loc + ' ' + b.id + ' ' + w + ': repeats ' + a.id + ' ' + ka.get(x) + ' (' + what(x) + ')');
  }
}
// ---- (Stage C-3) T16-T18: the placement checks ----
function placementFails(loc, L, fail) {
  const w0 = loc + ' placement', ui = L.ui, G = ['K', '1', '2', '3'];
  if (!/stop after the first step/i.test(ui.placeStop || '') || !/two tasks/i.test(ui.placeStop || '')) fail('T18', w0 + ': ui.placeStop does not give the stop rule (stop after the first step in which the child misses two tasks)');
  for (const k of ['placeHonest', 'tpPlaceHonest']) if (!NOT_STANDARDIZED[loc].test(ui[k] || '')) fail('T18', w0 + ': ui.' + k + ' does not say that the check is not a standardized test');
  // the boxes of the unit checks (prints, typed fingerprints) and of the checks of the year
  const unitPrints = new Set(), unitTyped = new Set(), yearPrints = new Set(), yearTyped = new Set();
  for (const c of L.checks) {
    const t = (L.unitTasks || {})[c.unit];
    if (!t || t.of !== formsHash(c)) fail('T17', w0 + ': the list of the unit checks\' boxes is not of the unit check ' + c.unit + ' (run assemble.js --loc=' + loc + ' --unit-tasks)');
    else for (const k of ['A', 'B']) for (const x of t[k].flat()) unitPrints.add(x);
    for (const k of ['A', 'B']) c.parts.forEach((q, i) => (c.forms[k].cards[i] || []).forEach((sig) => unitTyped.add(q.type + '|' + sig)));
  }
  for (const c of L.year || []) for (const k of ['A', 'B']) { for (const x of c.forms[k].tasks.flat()) yearPrints.add(x); c.parts.forEach((q, i) => (c.forms[k].cards[i] || []).forEach((sig) => yearTyped.add(q.type + '|' + sig))); }
  const slugs = new Set();
  for (const c of L.placement) {
    const w = w0 + ' ' + c.id;
    if (c.id !== 'placement-' + c.path) fail('T16', w + ': its id is not placement-<path>');
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.slug || '') || slugs.has(c.slug)) fail('T18', w + ': not a plain slug of its own'); slugs.add(c.slug);
    const title = ui['placeMetaTitle_' + c.path] || '', desc = ui['placeMeta_' + c.path] || '';
    if (!title || title.length > 65) fail('T18', w + ': the title "' + title + '" is missing or longer than 65 characters');
    if (desc.length < 120 || desc.length > 160) fail('T18', w + ': the description has ' + desc.length + ' characters (120 to 160)');
    const bc = (L.placeBlueprint.checks || []).find((x) => x.id === c.id);
    if (!bc) { fail('T16', w + ': not in the blueprint'); continue; }
    const slots = bc.parts.map((q) => new Set([q.unit + '|' + q.lesson].concat((q.alts || []).map((a) => q.unit + '|' + a.lesson))));
    const seenSlot = new Set(), seenLesson = new Set();
    for (const q of c.steps.concat(c.notBuilt || [])) { const sl = slots[(q.slot || 0) - 1]; if (!sl || !sl.has(q.unit + '|' + q.key) || seenSlot.has(q.slot)) fail('T16', w + ': step ' + (q.step || '(not built)') + ' (' + q.unit + ' ' + q.key + ') is not the step ' + q.slot + ' of the blueprint (rebuild the check)'); seenSlot.add(q.slot); }
    if (seenSlot.size !== bc.parts.length) fail('T16', w + ': its steps are not the steps of the blueprint (rebuild the check)');
    if (c.steps.length + (c.writing ? 1 : 0) < 3) fail('T16', w + ': fewer than three steps');
    c.steps.forEach((q, i) => {
      if (i && G.indexOf(q.grade) < G.indexOf(c.steps[i - 1].grade)) fail('T16', w + ' step ' + q.step + ': grade ' + q.grade + ' after grade ' + c.steps[i - 1].grade + ' (the steps stand in grade order)');
      if (seenLesson.has(q.unit + '|' + q.lesson)) fail('T16', w + ' step ' + q.step + ': lesson ' + q.lesson + ' of ' + q.unit + ' is a step twice'); seenLesson.add(q.unit + '|' + q.lesson);
      const u = L.units.find((x) => x.id === q.unit), l = u && u.lessons.find((x) => x.n === q.lesson);
      if (!u || u.status !== 'live' || !l || (l.id || l.point) !== q.key || l.title !== q.title || u.slug !== q.unitSlug || String(u.grade) !== q.grade) fail('T16', w + ' step ' + q.step + ': its "start at" is not lesson ' + q.lesson + ' "' + q.title + '" of the live unit ' + q.unit + ' (rebuild the check)');
      // (fix round 2026-11-23) a step whose start-at is another lesson: a lesson of a live unit, as the unit names it, of the step's grade or below
      if (q.startAt) { const su = L.units.find((x) => x.id === q.startAt.unit), sl = su && su.lessons.find((x) => x.n === q.startAt.lesson);
        if (!su || su.status !== 'live' || !sl || (sl.id || sl.point) !== q.startAt.key || sl.title !== q.startAt.title || su.slug !== q.startAt.unitSlug || String(su.grade) !== q.startAt.grade || G.indexOf(q.startAt.grade) > G.indexOf(q.grade)) fail('T16', w + ' step ' + q.step + ': its own start-at is not lesson ' + q.startAt.lesson + ' "' + q.startAt.title + '" of the live unit ' + q.startAt.unit + ' (of its grade or below)'); }
      const A = c.forms.A, B = c.forms.B;
      if (!(q.tasks >= 1) || (A.cards[i] || []).length !== q.tasks || (B.cards[i] || []).length !== q.tasks || (A.tasks[i] || []).length !== q.tasks || (B.tasks[i] || []).length !== q.tasks) fail('T16', w + ' step ' + q.step + ': forms A and B do not have ' + q.tasks + ' task(s) each');
      (A.kinds[i] || []).forEach((k, j) => { if (k !== (B.kinds[i] || [])[j]) fail('T16', w + ' step ' + q.step + ' box ' + (j + 1) + ': form B asks another kind of task than form A'); const ma = (A.sizes[i] || [])[j], mb = (B.sizes[i] || [])[j]; if (Math.abs(ma - mb) > Math.max(2, Math.round(ma * 0.2))) fail('T16', w + ' step ' + q.step + ' box ' + (j + 1) + ': sizes ' + ma + ' and ' + mb + ' are not the same level'); });
      for (const k of ['A', 'B']) { (c.forms[k].tasks[i] || []).forEach((pr, j) => { if (unitPrints.has(pr)) fail('T17', w + ' form ' + k + ' step ' + q.step + ' box ' + (j + 1) + ': a box of a unit check'); if (yearPrints.has(pr)) fail('T17', w + ' form ' + k + ' step ' + q.step + ' box ' + (j + 1) + ': a box of a check of the year'); });
        (c.forms[k].cards[i] || []).forEach((sig, j) => { if (unitTyped.has(q.type + '|' + sig)) fail('T17', w + ' form ' + k + ' step ' + q.step + ' box ' + (j + 1) + ': the same task of ' + q.type + ' as a box of a unit check'); if (yearTyped.has(q.type + '|' + sig)) fail('T17', w + ' form ' + k + ' step ' + q.step + ' box ' + (j + 1) + ': the same task of ' + q.type + ' as a box of a check of the year'); }); }
    });
    const inA = new Set(c.forms.A.cards.flat());
    if (c.forms.B.cards.flat().some((x) => inA.has(x))) fail('T16', w + ': a task of form A is a task of form B');
    itemFails('T16', w, c, fail);
    const printA = new Set(c.forms.A.tasks.flat());
    if (c.forms.B.tasks.flat().some((x) => printA.has(x))) fail('T16', w + ': a box of form B prints as a box of form A (the same words, pictures and answer)');
    // the writing part of the sentence-writing ladder: built from its rubric
    const R = (L.rubrics || {})[c.id];
    if (bc.writing && (!R || !c.writing)) fail('T16', w + ': the blueprint names a writing part and the check has none (or no rubric)');
    else if (c.writing && (c.writing.taskA !== R.taskA || c.writing.taskB !== R.taskB)) fail('T16', w + ': the writing part was not built from its rubric (rebuild the check)');
  }
}
function yearFails(loc, L, fail) {
  const w0 = loc + ' year';
  const ui = L.ui;
  for (const k of ['yearHonest', 'tpYearHonest']) if (!NOT_STANDARDIZED[loc].test(ui[k] || '')) fail('T15', w0 + ': ui.' + k + ' does not say that the check is not a standardized test');
  // the Kindergarten entry check: what a child already knows, not what was taught (its teacher page and its page)
  for (const k of ['tpYearHow_entry', 'yearLeadEntry_math', 'yearLeadEntry_literacy']) if (!/already knows/i.test(ui[k] || '') || !/not what was taught/i.test(ui[k] || '')) fail('T15', w0 + ': ui.' + k + ' does not say that the entry check is about what a child already knows, not what was taught');
  // every box print of every committed unit check, from a list made of THESE unit checks
  const unitPrints = new Map();
  if (!L.unitTasks) fail('T14', w0 + ': no scripts/assessments/year/unit-tasks.' + loc + '.json (assemble.js --unit-tasks)');
  else for (const c of L.checks) {
    const t = L.unitTasks[c.unit];
    if (!t || t.of !== formsHash(c)) { fail('T14', w0 + ': the list of the unit checks\' boxes is not of the unit check ' + c.unit + ' (run assemble.js --loc=' + loc + ' --unit-tasks)'); continue; }
    for (const k of ['A', 'B']) for (const p of t[k].flat()) unitPrints.set(p, c.unit + ' form ' + k);
  }
  const unitTyped = new Map();
  for (const c of L.checks) for (const k of ['A', 'B']) c.parts.forEach((p, i) => (c.forms[k].cards[i] || []).forEach((sig) => unitTyped.set(p.type + '|' + sig, c.unit + ' form ' + k)));
  const seenIds = new Set(), slugOf = new Map();
  for (const c of L.year) {
    const w = w0 + ' ' + c.id;
    if (seenIds.has(c.id)) fail('T11', w + ': two checks with one id'); seenIds.add(c.id);
    if (!['beginning', 'middle', 'end'].includes(c.time) || c.id !== 'year-' + String(c.grade).toLowerCase() + '-' + c.subject + '-' + c.time) fail('T11', w + ': its id is not year-<grade>-<subject>-<time>');
    const gs = c.grade + '-' + c.subject;
    if (slugOf.has(gs) && slugOf.get(gs) !== c.slug) fail('T11', w + ': the checks of one grade and subject name two pages'); slugOf.set(gs, c.slug);
    const plan = L.plans.find((p) => String(p.grade) === String(c.grade) && p.subject === c.subject);
    if (!plan) { fail('T11', w + ': no plan of its grade and subject'); continue; }
    // the blueprint names this check and these parts (a part the build could not make stands in notBuilt)
    const bc = (L.blueprint.checks || []).find((x) => x.id === c.id);
    if (!bc) fail('T11', w + ': not in the blueprint');
    else {
      // each part fills a place (slot) of the blueprint with its lesson or one of the place's alternates (the other parts of
      // the same unit's check); a place that could not be built stands in notBuilt; every place is filled once
      const slots = bc.parts.map((p) => new Set([p.unit + '|' + p.lesson].concat((p.alts || []).map((a) => p.unit + '|' + a.lesson))));
      const seen = new Set();
      for (const p of c.parts.concat(c.notBuilt || [])) { const s = slots[(p.slot || 0) - 1]; if (!s || !s.has(p.unit + '|' + p.key) || seen.has(p.slot)) fail('T11', w + ': part ' + (p.part || '(not built)') + ' (' + p.unit + ' ' + p.key + ') is not the part ' + p.slot + ' of the blueprint' + ' (rebuild the check)'); seen.add(p.slot); }
      if (seen.size !== bc.parts.length) fail('T11', w + ': its parts are not the parts of the blueprint (rebuild the check)');
    }
    // T1: at least three parts, each with a task; forms A and B have the parts with the same number of tasks
    if (c.parts.length < 3) fail('T11', w + ': ' + c.parts.length + ' part(s)');
    const A = c.forms.A.cards, B = c.forms.B.cards;
    if (A.length !== c.parts.length || B.length !== c.parts.length || c.forms.A.tasks.length !== c.parts.length || c.forms.B.tasks.length !== c.parts.length) { fail('T11', w + ': a form does not have the parts of the blueprint'); continue; }
    c.parts.forEach((p, i) => {
      if (!(p.tasks >= 1)) fail('T11', w + ' part ' + p.part + ': no task');
      if (A[i].length !== p.tasks || B[i].length !== p.tasks || c.forms.A.tasks[i].length !== p.tasks || c.forms.B.tasks[i].length !== p.tasks) fail('T11', w + ' part ' + p.part + ': forms A and B do not have ' + p.tasks + ' task(s) each');
      // the part is a lesson of a live unit, named as the unit names it today
      const u = L.units.find((x) => x.id === p.unit), l = u && u.lessons.find((x) => x.n === p.lesson);
      if (!u || (c.status === 'live' && u.status !== 'live')) fail('T11', w + ' part ' + p.part + ': ' + p.unit + ' is not a live unit');
      else if (!l || (l.id || l.point) !== p.key || l.title !== p.title || u.slug !== p.unitSlug) fail('T11', w + ' part ' + p.part + ': lesson ' + p.lesson + ' of ' + p.unit + ' is not "' + p.title + '" (rebuild the check)');
      // T9: card by card the same kind at about the same size; no shared total in a part
      const ka = c.forms.A.kinds[i] || [], kb = c.forms.B.kinds[i] || [], ma = c.forms.A.sizes[i] || [], mb = c.forms.B.sizes[i] || [];
      if (ka.length !== p.tasks || kb.length !== p.tasks) fail('T11', w + ' part ' + p.part + ': the kinds of its tasks are not recorded');
      ka.forEach((k, j) => { if (k !== kb[j]) fail('T11', w + ' part ' + p.part + ' box ' + (j + 1) + ': form B asks another kind of task than form A'); if (Math.abs(ma[j] - mb[j]) > Math.max(2, Math.round(ma[j] * 0.2))) fail('T11', w + ' part ' + p.part + ' box ' + (j + 1) + ': sizes ' + ma[j] + ' and ' + mb[j] + ' are not the same level'); });
      for (const m of [ma, mb]) { const pos = m.filter((x) => x > 0); if (new Set(pos).size !== pos.length) fail('T11', w + ' part ' + p.part + ': two boxes share a total'); }
    });
    // T2: no task of form A is a task of form B, and none twice in a form
    const inA = new Set(A.flat());
    if (B.flat().some((h) => inA.has(h))) fail('T11', w + ': a task of form A is a task of form B');
    if (new Set(A.flat()).size !== A.flat().length || new Set(B.flat()).size !== B.flat().length) fail('T11', w + ': a form asks one task twice');
    // (second fix round) and none asks the ITEM of a box of form A (its picture and answer, its item and answer, a sentence, a frame)
    itemFails('T11', w, c, fail);
    // (Stage C-3) and none prints as a box of form B: the same words, pictures and answer (lib/task-print.js) under another fingerprint
    { const pa = new Set(c.forms.A.tasks.flat()); if (c.forms.B.tasks.flat().some((x) => pa.has(x))) fail('T11', w + ': a box of form B prints as a box of form A (the same words, pictures and answer)'); }
    // no box of a year form is a box of a unit check (the checks of the year keep clear of each other where the pool allows:
    // build-checks.js; that is a preference, not a rule)
    for (const k of ['A', 'B']) for (const pr of c.forms[k].tasks.flat()) {
      if (unitPrints.has(pr)) fail('T14', w + ' form ' + k + ': a box is a box of the unit check ' + unitPrints.get(pr));
    }
    // … nor a box of the same worksheet type with the same fingerprint (the same story in a part of the same kind, the same
    // fact of one type)
    for (const k of ['A', 'B']) c.parts.forEach((p, i) => (c.forms[k].cards[i] || []).forEach((sig, j) => { const t = unitTyped.get(p.type + '|' + sig); if (t) fail('T14', w + ' form ' + k + ' part ' + p.part + ' box ' + (j + 1) + ': the same task of ' + p.type + ' as a box of the unit check ' + t); }));
    // END: a part from every unit of the plan, or a ruling of the blueprint that names why not
    if (c.time === 'end') {
      const ruled = new Set([...(((L.blueprint.rulings || {})[c.id] || {}).drop || []).filter((r) => r.reason).map((r) => r.unit), ...((bc && bc.left) || []).filter((r) => r.reason).map((r) => r.unit)]);
      for (const r of plan.units) if (!c.parts.some((p) => p.unit === r.id) && !ruled.has(r.id)) fail('T12', w + ': no part of the unit ' + r.id + ', and no ruling says why');
      for (const p of c.parts) if (!plan.units.some((r) => r.id === p.unit)) fail('T12', w + ' part ' + p.part + ': ' + p.unit + ' is not a unit of the year');
    }
    // MIDDLE: only units whose last class day lies in the first half of the plan's class days
    if (c.time === 'middle') {
      // (second fix round) six parts at least, as its blueprint asks, unless a ruling records why the check cannot have them
      const ruled = ((L.blueprint || {}).rulings || {})[c.id] || {};
      if (c.parts.length < 6 && !(typeof ruled.impossible === 'string' && ruled.impossible.trim())) fail('T13', w + ': ' + c.parts.length + ' parts (a middle check has six at least, or a ruling "impossible" that says why)');
      const d = planDays(plan, L.units);
      for (const p of c.parts) { const last = d.last.get(p.unit); if (last == null || last > d.of / 2) fail('T13', w + ' part ' + p.part + ': ' + p.unit + ' is not taught by the middle of the year (it ends on class day ' + last + ' of ' + d.of + ')'); }
    }
    // BEGINNING: Grades 1-3 from the year before (the same subject); Kindergarten from its own plan
    if (c.time === 'beginning') {
      const G = ['K', '1', '2', '3'], g = String(c.grade);
      const from = g === 'K' ? plan : L.plans.find((p) => String(p.grade) === G[G.indexOf(g) - 1] && p.subject === c.subject);
      for (const p of c.parts) if (!from || !from.units.some((r) => r.id === p.unit)) fail('T11', w + ' part ' + p.part + ': ' + p.unit + ' is not a unit of ' + (g === 'K' ? 'its own plan' : 'the year before'));
    }
  }
  // the page of each grade and subject: its title and its description (what a search engine shows)
  for (const [gs, slug] of slugOf) {
    const [g, s] = gs.split('-');
    const title = fillS(ui.yearPageMetaTitle, { grade: ui['yearGrade_' + g], subject: ui['yearSubject_' + s] }), desc = ui['yearMeta_' + g + '_' + s] || '';
    if (/\{\w+\}/.test(title) || title.length > 65) fail('T15', w0 + ' page ' + slug + ': the title "' + title + '" is longer than 65 characters or has an unfilled name');
    if (desc.length < 120 || desc.length > 160) fail('T15', w0 + ' page ' + slug + ': the description has ' + desc.length + ' characters (120 to 160)');
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('T15', w0 + ' page ' + slug + ': not a plain slug');
  }
}

// ---- (Wave 4, 2026-11-19) T10: the writing part of a writing unit and its rubric ----
// A WRITING UNIT is a literacy unit one of whose lessons hands out a worksheet type with a checkWrite hook (the child's own
// writing page of the unit). Its check has a writing part, and the rubric of that part (rubrics/<loc>.json) is whole:
// at least one content and one conventions point; each point has three levels whose "shows" are not the same or nearly
// the same, each with an example; three "next" lines; two different tasks that the type's checkWrite holds at the
// rubric's level; and no word diagnos… anywhere.
const WG = path.join(__dirname, '..', 'worksheet-gen');
let TYPE_FILES = null;
const TYPES = new Map();
const typeOf = (id) => {
  if (!TYPE_FILES) { TYPE_FILES = new Map(); for (const g of fs.readdirSync(path.join(WG, 'types'))) { if (g.startsWith('_')) continue; for (const f of fs.readdirSync(path.join(WG, 'types', g))) { const m = /^((?:K|G\d)-\d{3})/.exec(f); if (m) TYPE_FILES.set(m[1], path.join(WG, 'types', g, f)); } } }
  if (!TYPES.has(id)) { let t = null; try { const f = TYPE_FILES.get(id); t = f ? require(f) : null; } catch (e) { t = null; } TYPES.set(id, t); }
  return TYPES.get(id);
};
const writes = (id) => { const t = typeOf(id); return !!t && typeof t.checkWrite === 'function'; };
const isWritingUnit = (u) => u.subject === 'literacy' && u.lessons.some((l) => (l.paper || []).some((p) => writes(p.type)));
const LEVELS3 = ['notYet', 'nearly', 'secure'];
const wordSet = (s) => new Set(String(s || '').toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu, ' ').split(/\s+/).filter(Boolean));
/** two "shows" a teacher cannot tell apart: the same words, or nearly (at least 80 % of their words in common) */
const nearlySame = (a, b) => { const A = wordSet(a), B = wordSet(b); if (!A.size || !B.size) return false; let k = 0; for (const x of A) if (B.has(x)) k++; return k / (A.size + B.size - k) >= 0.8; };
function rubricFails(loc, unit, R, fail) {
  const w = loc + ' rubric ' + unit;
  if (/diagnos/i.test(JSON.stringify(R))) fail('T10', w + ': uses the word diagnos…');
  const pts = Array.isArray(R.points) ? R.points : [];
  if (!pts.some((p) => p.kind === 'content') || !pts.some((p) => p.kind === 'conventions')) fail('T10', w + ': needs at least one content point and one conventions point');
  for (const p of pts) {
    for (const l of LEVELS3) {
      if (!p[l] || !String(p[l].shows || '').trim()) fail('T10', w + ' point ' + p.id + ': level ' + l + ' does not say what the work shows');
      if (!p[l] || !String(p[l].example || '').trim()) fail('T10', w + ' point ' + p.id + ': level ' + l + ' has no example');
    }
    for (const [a, b] of [['notYet', 'nearly'], ['nearly', 'secure'], ['notYet', 'secure']]) if (p[a] && p[b] && nearlySame(p[a].shows, p[b].shows)) fail('T10', w + ' point ' + p.id + ': ' + a + ' and ' + b + ' show the same or nearly the same');
    if (!p.next || LEVELS3.some((l) => !String(p.next[l] || '').trim())) fail('T10', w + ' point ' + p.id + ': a "next" line is missing');
  }
  if (R.taskA === R.taskB) fail('T10', w + ': form A and form B have the same task');
  const t = typeOf(R.type);
  if (!t || typeof t.checkWrite !== 'function') { fail('T10', w + ': ' + R.type + ' has no checkWrite'); return; }
  let ids = [];
  try { ids = ((t.checkWrite({ theme: null, difficulty: R.level, locale: loc, unit: null }, { check: true }) || {}).tasks || []).map((x) => x.id); } catch (e) { fail('T10', w + ': the checkWrite of ' + R.type + ' fails (' + e.message.split('\n')[0] + ')'); return; }
  for (const id of [R.taskA, R.taskB]) if (!ids.includes(id)) fail('T10', w + ': task ' + id + ' is not a task of ' + R.type + ' at level ' + R.level);
}

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  for (const [loc, L] of Object.entries(d)) {
    if (loc === '_en') continue;
    for (const k of Object.keys(d._en)) if (!L.ui[k] && !(ENGLISH_FIRST(k) && !L.year && !L.placement)) fail('T8', loc + ' ui.' + k + ' is missing');
    // (Stage C-2) T11: the checks of the year of a language that has them
    if (L.year) yearFails(loc, L, fail);
    // (Stage C-3) T16-T18: the placement checks of a language that has them
    if (L.placement) placementFails(loc, L, fail);
    // (fix round 2026-11-23) T19: the no-repeat rule between related checks
    if (L.year) relatedFails(loc, L, fail);
    for (const [k, v] of Object.entries(L.ui)) {
      if (BANNED[loc] && BANNED[loc].test(v)) fail('T6', loc + ' ui.' + k + ' uses a word a check must not use');
      if (STANDARDIZED[loc]) { const all = (v.match(STANDARDIZED[loc]) || []).length; const neg = NOT_STANDARDIZED[loc].test(v) ? 1 : 0; if (all > neg) fail('T6', loc + ' ui.' + k + ' says standardized outside "not a standardized test"'); }
    }
    for (const k of ['sectionHonest', 'tpHonest', 'hubHonest']) if (NOT_STANDARDIZED[loc] && !NOT_STANDARDIZED[loc].test(L.ui[k] || '')) fail('T6', loc + ' ui.' + k + ' does not say that the check is not a standardized test');
    // (Wave 4) T10: every rubric of the language is whole (its file's notes too: no word diagnos…)
    for (const [unit, R] of Object.entries(L.rubrics || {})) { if (unit.startsWith('$')) { if (/diagnos/i.test(String(R))) fail('T10', loc + ' rubrics ' + unit + ' uses the word diagnos…'); continue; } rubricFails(loc, unit, R, fail); }
    let choice = 0, same = 0;
    const seenUnits = new Set();
    for (const c of L.checks) {
      const w = loc + ' check ' + c.unit;
      if (seenUnits.has(c.unit)) fail('T3', w + ': two checks of one unit'); seenUnits.add(c.unit);
      const u = L.units.find((x) => x.id === c.unit);
      if (!u) { fail('T3', w + ': no such unit'); continue; }
      if (c.status === 'live' && u.status !== 'live') fail('T3', w + ': a live check of a unit that is not live');
      if (c.slug !== u.slug) fail('T3', w + ': the slug is not the unit\'s');
      // (Wave 4) the writing part of a writing unit counts as a part
      if (c.parts.length + (c.writing ? 1 : 0) < 3) fail('T1', w + ': ' + c.parts.length + ' part(s)' + (c.writing ? ' and a writing part' : ''));
      // (Wave 4) T10: a writing unit's check has its writing part, built from its rubric
      { const R = (L.rubrics || {})[c.unit];
        if ((isWritingUnit(u) || c.writing) && (!R || !c.writing)) fail('T10', w + ': a writing unit check without its rubric and its writing part');
        else if (c.writing && (c.writing.taskA !== R.taskA || c.writing.taskB !== R.taskB || (c.writing.points || []).map((p) => p.id + ':' + p.kind + ':' + p.max).join() !== (R.points || []).map((p) => p.id + ':' + p.kind + ':2').join())) fail('T10', w + ': the writing part was not built from its rubric (rebuild the check)'); }
      const lessons = new Set(u.lessons.map((l) => l.n));
      const used = new Set();
      for (const p of c.parts) {
        if (!lessons.has(p.lesson)) fail('T3', w + ' part ' + p.part + ': lesson ' + p.lesson + ' is no lesson of the unit');
        if (used.has(p.lesson)) fail('T3', w + ': lesson ' + p.lesson + ' has two parts'); used.add(p.lesson);
        // the part names its lesson by number AND title: after a lesson is put in or moved, a check that was not rebuilt
        // points at another lesson (the count of lessons alone does not show a reordered unit)
        const ofPart = u.lessons.find((l) => l.n === p.lesson);
        if (ofPart && ofPart.title !== p.title) fail('T3', w + ' part ' + p.part + ': lesson ' + p.lesson + ' of the unit is "' + ofPart.title + '", the check says "' + p.title + '" (rebuild the check)');
        if (!(p.tasks >= 1)) fail('T1', w + ' part ' + p.part + ': no task');
      }
      for (const n of c.notCovered) { if (used.has(n)) fail('T3', w + ': lesson ' + n + ' is in the check and in "not in the check"'); used.add(n); }
      if (used.size !== lessons.size || [...lessons].some((n) => !used.has(n))) fail('T3', w + ': parts and "not in the check" are not exactly the unit\'s lessons');
      const A = c.forms.A.cards, B = c.forms.B.cards;
      if (A.length !== c.parts.length || B.length !== c.parts.length) fail('T1', w + ': a form does not have the parts of the blueprint');
      else c.parts.forEach((p, i) => { if (A[i].length !== p.tasks || B[i].length !== p.tasks) fail('T1', w + ' part ' + p.part + ': forms A and B do not have ' + p.tasks + ' task(s) each'); });
      const inA = new Set(A.flat());
      for (const h of B.flat()) if (inA.has(h)) fail('T2', w + ': a task of form A is a task of form B');
      if (new Set(A.flat()).size !== A.flat().length || new Set(B.flat()).size !== B.flat().length) fail('T2', w + ': a form asks one task twice');
      // T9: card by card, form B asks the kind of task form A asks, at about the same size; the boxes of a part do not share a total
      c.parts.forEach((p, i) => {
        const ka = (c.forms.A.kinds || [])[i] || [], kb = (c.forms.B.kinds || [])[i] || [], ma = (c.forms.A.sizes || [])[i] || [], mb = (c.forms.B.sizes || [])[i] || [];
        if (ka.length !== p.tasks || kb.length !== p.tasks) { fail('T9', w + ' part ' + p.part + ': the kinds of its tasks are not recorded'); return; }
        ka.forEach((k, j) => { if (k !== kb[j]) fail('T9', w + ' part ' + p.part + ' box ' + (j + 1) + ': form B asks another kind of task than form A'); if (Math.abs(ma[j] - mb[j]) > Math.max(2, Math.round(ma[j] * 0.2))) fail('T9', w + ' part ' + p.part + ' box ' + (j + 1) + ': sizes ' + ma[j] + ' and ' + mb[j] + ' are not the same level'); });
        for (const m of [ma, mb]) { const pos = m.filter((x) => x > 0); if (new Set(pos).size !== pos.length) fail('T9', w + ' part ' + p.part + ': two boxes share a total'); }
      });
      (c.forms.A.pos || []).forEach((ps, i) => { const pb = (c.forms.B.pos || [])[i] || []; if (ps.length === 1 && ps[0] != null && pb[0] != null) { choice++; if (ps[0] === pb[0]) same++; } });
    }
    if (choice >= 2 && same * 2 > choice) fail('T7', loc + ': in ' + same + ' of ' + choice + ' single-choice parts the right option sits in the same place in both forms');
  }
  return fails;
}

const POISONS = [
  ['a task that stands in both forms', 'T2', (d) => { const c = d.en.checks[0]; c.forms.B.cards[0][0] = c.forms.A.cards[0][0]; }],
  ['a form with a part less', 'T1', (d) => { d.en.checks[0].forms.B.cards.pop(); }],
  ['a check of two parts', 'T1', (d) => { const c = d.en.checks[0]; c.notCovered.push(...c.parts.slice(2).map((p) => p.lesson)); c.parts = c.parts.slice(0, 2); c.forms.A.cards = c.forms.A.cards.slice(0, 2); c.forms.B.cards = c.forms.B.cards.slice(0, 2); }],
  ['a part that names another lesson of the unit (the unit was reordered)', 'T3', (d) => { const p = d.en.checks[0].parts; const t = p[0].lesson; p[0].lesson = p[1].lesson; p[1].lesson = t; }],
  ['a part of a lesson the unit does not have', 'T3', (d) => { d.en.checks[0].parts[0].lesson = 99; }],
  ['a lesson left out of both lists', 'T3', (d) => { d.en.checks[0].notCovered = []; d.en.checks[0].parts.pop(); d.en.checks[0].forms.A.cards.pop(); d.en.checks[0].forms.B.cards.pop(); }],
  ['a check of a unit that does not exist', 'T3', (d) => { d.en.checks[0].unit = 'no-such-unit'; }],
  ['the word mastery', 'T6', (d) => { d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['a claim to be standardized', 'T6', (d) => { d.en.ui.tpHow1 += ' The check is standardized.'; }],
  ['the honest sentence taken out', 'T6', (d) => { d.en.ui.sectionHonest = 'This is a classroom check of this unit\'s lessons.'; }],
  ['the answer in the same place in every form', 'T7', (d) => { for (const c of d.en.checks) { c.forms.A.pos = c.parts.map(() => [1]); c.forms.B.pos = c.parts.map(() => [1]); } }],
  ['form B asks another kind of task', 'T9', (d) => { d.en.checks[0].forms.B.kinds[0][0] += ' x'; }],
  ['form B at another level', 'T9', (d) => { const c = d.en.checks.find((x) => x.forms.A.sizes.some((m) => m[0] > 0)); const i = c.forms.A.sizes.findIndex((m) => m[0] > 0); c.forms.B.sizes[i][0] = c.forms.A.sizes[i][0] * 3 + 5; }],
  ['two boxes of a part with one total', 'T9', (d) => { const c = d.en.checks.find((x) => x.parts.some((p) => p.tasks > 1)); const i = c.parts.findIndex((p) => p.tasks > 1); c.forms.A.sizes[i] = c.forms.A.sizes[i].map(() => 7); }],
  ['a missing string', 'T8', (d) => { delete d.en.ui.tpGridLead; }],
  // German (Part 7.5): the same wording rules in German words, and a German string that is missing
  ['a German string that names an official test', 'T6', (d) => { if (d.de) d.de.ui.hubLead += ' Sie bereitet auf VERA vor.'; else d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['a German string that says kostenlos', 'T6', (d) => { if (d.de) d.de.ui.formsNote += ' Kostenlos.'; else d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['the German honest sentence taken out', 'T6', (d) => { if (d.de) d.de.ui.sectionHonest = 'Das ist eine Lernkontrolle zu den Stunden dieser Einheit.'; else d.en.ui.sectionHonest = 'x'; }],
  ['a German claim to be standardized', 'T6', (d) => { if (d.de) d.de.ui.tpHow1 += ' Die Lernkontrolle ist standardisiert.'; else d.en.ui.tpHow1 += ' The check is standardized.'; }],
  ['a missing German string', 'T8', (d) => { if (d.de) delete d.de.ui.hubCoverage; else delete d.en.ui.tpGridLead; }],
  // Swedish (Part 7.5): the same wording rules in Swedish words, the name the Swedish reader ruled out, a missing string
  ['a Swedish string that names an official material', 'T6', (d) => { if (d.sv) d.sv.ui.hubLead += ' Den förbereder för de nationella proven.'; else d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['the Swedish name of Skolverket\'s points (Avstämning A)', 'T6', (d) => { if (d.sv) d.sv.ui.formA = 'Avstämning A (PDF)'; else d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['a Swedish string that says gratis', 'T6', (d) => { if (d.sv) d.sv.ui.formsNote += ' Gratis.'; else d.en.ui.sectionLead += ' It shows mastery.'; }],
  ['the Swedish honest sentence taken out', 'T6', (d) => { if (d.sv) d.sv.ui.tpHonest = 'Det här är en kunskapskoll som hör till lektionerna i arbetsområdet.'; else d.en.ui.sectionHonest = 'x'; }],
  ['a Swedish claim to be standardized', 'T6', (d) => { if (d.sv) d.sv.ui.tpHow1 += ' Kunskapskollen är standardiserad.'; else d.en.ui.tpHow1 += ' The check is standardized.'; }],
  ['a missing Swedish string', 'T8', (d) => { if (d.sv) delete d.sv.ui.hubCoverage; else delete d.en.ui.tpGridLead; }],
  // (Wave 4) the writing part and its rubric: every case has a fault that must fire (here) and a control that must pass
  // (CONTROLS below)
  ['a writing unit check without its rubric and its writing part', 'T10', (d) => { const c = wcheck(d); delete d.en.rubrics[c.unit]; delete c.writing; }],
  ['a rubric without a conventions point', 'T10', (d) => { firstRubric(d).points.forEach((p) => { p.kind = 'content'; }); }],
  ['two levels of a point that show nearly the same', 'T10', (d) => { const p = firstRubric(d).points[0]; p.nearly.shows = p.secure.shows.replace(/\.$/, '') + ' too.'; }],
  ['a level without an example', 'T10', (d) => { delete firstRubric(d).points[0].nearly.example; }],
  ['a point without its last "next" line', 'T10', (d) => { delete firstRubric(d).points[0].next.secure; }],
  ['one task for both forms', 'T10', (d) => { const R = firstRubric(d); R.taskB = R.taskA; }],
  ['a task the type does not hold', 'T10', (d) => { firstRubric(d).taskA = 'no-such-task'; }],
  ['the word diagnostic in a rubric', 'T10', (d) => { firstRubric(d).points[0].secure.shows += ' A diagnostic sign.'; }],
  ['a check of two cut parts without its writing part', 'T1', (d) => { const c = wcheck(d); cutTo2(c); delete c.writing; }],
  // (Stage C-2) the checks of the year: every rule has a fault that must fire (here) and, where a right change could be
  // mistaken for the fault, a control that must pass (CONTROLS below)
  ['an end check without a part of one unit of its plan, and no ruling', 'T12', (d) => { dropPart(yc(d, 'end'), 0); }],
  ['a middle part from a unit taught after the middle of the year', 'T13', (d) => { const c = yc(d, 'middle'); const plan = d.en.plans.find((x) => String(x.grade) === c.grade && x.subject === c.subject); c.parts[0].unit = plan.units[plan.units.length - 1].id; }],
  ['a box of a year form that is a box of a unit check', 'T14', (d) => { const c = yc(d, 'end'); const u = Object.values(d.en.unitTasks)[0]; c.forms.A.tasks[0][0] = u.A[0][0]; }],
  ['a list of the unit checks\' boxes made from other unit checks', 'T14', (d) => { d.en.checks[0].forms.A.cards[0][0] = 'ffffffffffffffff'; }],
  ['a year box of the same worksheet type and fingerprint as a unit check box', 'T14', (d) => { const c = yc(d, 'end'); const u = d.en.checks.find((x) => x.parts.some((p) => p.type === c.parts[0].type)); const i = u.parts.findIndex((p) => p.type === c.parts[0].type); c.forms.A.cards[0][0] = u.forms.A.cards[i][0]; }],
  ['a year form B that repeats a task of form A', 'T11', (d) => { const c = yc(d, 'end'); c.forms.B.cards[0][0] = c.forms.A.cards[0][0]; }],
  ['a year form B that asks another kind of task', 'T11', (d) => { const c = yc(d, 'end'); c.forms.B.kinds[0][0] += ' x'; }],
  ['a part from a lesson that is no place of the blueprint', 'T11', (d) => { yc(d, 'end').parts[0].key = 'K:no-such-lesson'; }],
  ['a part that names another lesson of its unit', 'T11', (d) => { const c = yc(d, 'end'); c.parts[0].lesson += 1; }],
  ['a Grade 1 beginning part from a Grade 1 unit', 'T11', (d) => { const c = d.en.year.find((x) => x.time === 'beginning' && x.grade === '1'); const e = d.en.year.find((x) => x.time === 'end' && x.grade === '1' && x.subject === c.subject); const q = e.parts[0]; Object.assign(c.parts[0], { unit: q.unit, unitSlug: q.unitSlug, lesson: q.lesson, key: q.key, title: q.title }); const slot = d.en.blueprint.checks.find((x) => x.id === c.id).parts[c.parts[0].slot - 1]; slot.unit = q.unit; slot.lesson = q.key; }],
  ['a page title longer than 65 characters', 'T15', (d) => { d.en.ui.yearPageMetaTitle += ' for Teachers'; }],
  ['a page description of 119 characters', 'T15', (d) => { d.en.ui.yearMeta_K_math = 'x'.repeat(119); }],
  ['an entry check that does not say it checks what a child already knows', 'T15', (d) => { d.en.ui.tpYearHow_entry = 'Give this check when school starts.'; }],
  ['the honest sentence of the checks of the year taken out', 'T15', (d) => { d.en.ui.yearHonest = 'Each one is a classroom check of our units\u2019 lessons.'; }],
  // (Stage C-3) the placement checks
  ['a placement ladder whose last step stands first', 'T16', (d) => { const c = pc(d); const [a] = c.steps.splice(c.steps.length - 1, 1); c.steps.unshift(a); }],
  ['a lesson that is two steps of one ladder', 'T16', (d) => { const c = pc(d); Object.assign(c.steps[1], { unit: c.steps[0].unit, lesson: c.steps[0].lesson, key: c.steps[0].key, title: c.steps[0].title, unitSlug: c.steps[0].unitSlug, grade: c.steps[0].grade }); }],
  ['a step whose "start at" names another lesson', 'T16', (d) => { pc(d).steps[0].title = 'No such lesson'; }],
  ['a placement box that is a box of a unit check', 'T17', (d) => { pc(d).forms.A.tasks[0][0] = Object.values(d.en.unitTasks)[0].A[0][0]; }],
  ['a placement box that is a box of a check of the year', 'T17', (d) => { pc(d).forms.B.tasks[0][0] = d.en.year[0].forms.A.tasks[0][0]; }],
  ['a placement box of form B that prints as a box of form A', 'T16', (d) => { const c = pc(d); c.forms.B.tasks[1][0] = c.forms.A.tasks[1][0]; }],
  ['a box of form B of a check of the year that prints as a box of its form A', 'T11', (d) => { const c = d.en.year[0]; c.forms.B.tasks[0][0] = c.forms.A.tasks[0][0]; }],
  // (fix round 2026-11-23) T19, the no-repeat rule
  ['a box of the middle check that prints as a box of the end check of its grade', 'T19', (d) => { const [a, b] = yearPair(d, 'end', 'middle', 0); b.forms.A.tasks[0][0] = a.forms.A.tasks[0][0]; }],
  ['a box of a beginning check that prints as a box of the end check of the grade before', 'T19', (d) => { const [a, b] = yearPair(d, 'end', 'beginning', 1); b.forms.B.tasks[0][0] = a.forms.A.tasks[0][0]; }],
  ['the same task of one worksheet type in the end and the beginning check of one grade', 'T19', (d) => { const [a, b] = yearPair(d, 'end', 'beginning', 0); const i = b.parts.findIndex((q) => a.parts.some((x) => x.type === q.type)); if (i < 0) throw new Error('no type in both checks'); const j = a.parts.findIndex((x) => x.type === b.parts[i].type); b.forms.A.cards[i][0] = a.forms.B.cards[j][0]; }],
  ['the same word answer of one worksheet type in two related checks', 'T19', (d) => { const [a, b, i, j] = wordPair(d); b.forms.A.more[j][0] = (b.forms.A.more[j][0] || []).concat(a.forms.A.more[i].find((ks) => ks.some((x) => x.startsWith('wa:'))).filter((x) => x.startsWith('wa:'))); b.parts[j].type = a.parts[i].type; }],
  ['a placement box that reads a text a check of the year reads', 'T19', (d) => { const y = d.en.year.find((c) => c.forms.A.more.flat(2).some((x) => x.startsWith('tx:'))); if (!y) throw new Error('no text in the checks of the year'); const c = pc(d); c.forms.A.more[0][0] = (c.forms.A.more[0][0] || []).concat(y.forms.A.more.flat(2).filter((x) => x.startsWith('tx:')).slice(0, 1)); }],
  ['a check of the year built before the no-repeat rule (no fingerprints)', 'T19', (d) => { delete d.en.year[0].forms.B.more; }],
  ['a step whose own start-at names a lesson of a higher grade', 'T16', (d) => { const c = d.en.placement.find((x) => x.steps.some((q) => q.startAt)); if (!c) throw new Error('no step with its own start-at'); const q = c.steps.find((x) => x.startAt); q.startAt.grade = '3'; q.grade = '2'; }],
  ['a step whose own start-at names a lesson its unit does not have', 'T16', (d) => { const c = d.en.placement.find((x) => x.steps.some((q) => q.startAt)); const q = c.steps.find((x) => x.startAt); q.startAt.title = 'No such lesson'; }],
  // (second fix round) the item rule and the middle check of six parts
  ['form B of a check of the year asks the picture and answer of form A in another order of options', 'T11', (d) => { const c = d.en.year.find((x) => x.forms.A.more.flat(2).some((k) => k.startsWith('pa:'))); const k = c.forms.A.more.flat(2).find((x) => x.startsWith('pa:')); c.forms.B.more[0][0] = (c.forms.B.more[0][0] || []).concat([k]); }],
  ['form B of a check of the year asks a sentence frame of form A with another verb', 'T11', (d) => { const c = d.en.year.find((x) => x.forms.A.more.flat(2).some((k) => k.startsWith('fr:'))); const k = c.forms.A.more.flat(2).find((x) => x.startsWith('fr:')); c.forms.B.more[0][0] = (c.forms.B.more[0][0] || []).concat([k]); }],
  ['form B of a placement check reads the target word of form A', 'T16', (d) => { const c = d.en.placement.find((x) => x.forms.A.more.flat(2).some((k) => k.startsWith('wa:'))); const k = c.forms.A.more.flat(2).find((x) => x.startsWith('wa:')); c.forms.B.more[0][0] = (c.forms.B.more[0][0] || []).concat([k]); }],
  ['a sentence of a related check repeated inside a box of two sentences', 'T19', (d) => { const [a, b] = yearPair(d, 'end', 'middle', 0); const k = a.forms.A.more.flat(2).find((x) => x.startsWith('se:')) || 'se:poison'; a.forms.A.more[0][0] = (a.forms.A.more[0][0] || []).concat([k]); b.forms.B.more[0][0] = (b.forms.B.more[0][0] || []).concat([k]); }],
  ['the beginning check of a grade repeats a box of the middle check of the grade before', 'T19', (d) => { const [a, b] = yearPair(d, 'middle', 'beginning', 1); b.forms.A.tasks[0][0] = a.forms.A.tasks[0][0]; }],
  ['a middle check of five parts and no ruling', 'T13', (d) => { const c = yc(d, 'middle'); delete (d.en.blueprint.rulings[c.id] || {}).impossible; dropPart(c, 0); }],
  ['the stop rule taken out', 'T18', (d) => { d.en.ui.placeStop = 'Give the steps in order.'; }],
  ['the honest sentence of the placement checks taken out', 'T18', (d) => { d.en.ui.tpPlaceHonest = 'This is a classroom placement check.'; }],
  ['a German file of checks of the year without their strings', 'T8', (d) => { if (d.de) d.de.year = []; else delete d.en.ui.tpGridLead; }],
];
// (Wave 4) the control of each case of T10 (and of the writing part's count in T1): a change that is right must pass
const CONTROLS = [
  ['a writing unit with neither a check nor a rubric', 'T10', (d) => { const u = wcheck(d).unit; d.en.checks = d.en.checks.filter((x) => x.unit !== u); delete d.en.rubrics[u]; }],
  ['a rubric with one content point and the rest conventions points', 'T10', (d) => { firstRubric(d).points.forEach((p, i) => { p.kind = i === 0 ? 'content' : 'conventions'; }); syncWriting(d); }],
  ['two levels that share words but say different things', 'T10', (d) => { const p = firstRubric(d).points[0]; p.nearly.shows = 'Some sentences start with a capital, and some do not.'; p.secure.shows = 'Every sentence starts with a capital and ends with an end mark.'; }],
  ['an example with the child\'s own spelling and no capital', 'T10', (d) => { firstRubric(d).points[0].nearly.example = 'i lik tag bcuz it is fun'; }],
  ['a short "next" line', 'T10', (d) => { firstRubric(d).points[0].next.secure = 'The next writing unit.'; }],
  ['the two tasks swapped', 'T10', (d) => { const R = firstRubric(d); [R.taskA, R.taskB] = [R.taskB, R.taskA]; syncWriting(d); }],
  ['a word like diagonal in a rubric', 'T10', (d) => { firstRubric(d).points[0].secure.shows += ' The line is diagonal.'; }],
  ['two cut parts and the writing part', 'T1', (d) => { cutTo2(wcheck(d)); }],
  // (Stage C-2) the checks of the year
  ['an end check without a part of one unit, and a ruling that says why', 'T12', (d) => { const c = yc(d, 'end'); const p = c.parts[0]; dropPart(c, 0); const r = (d.en.blueprint.rulings[c.id] = d.en.blueprint.rulings[c.id] || {}); r.drop = (r.drop || []).concat([{ unit: p.unit, lesson: p.key, reason: 'control' }]); }],
  ['a part cut from an alternate of its place (the next part of its unit)', 'T11', (d) => { const c = yc(d, 'end'); const s = d.en.blueprint.checks.find((x) => x.id === c.id).parts[c.parts[0].slot - 1]; s.alts = [{ lesson: s.lesson }].concat(s.alts || []); s.lesson = 'K:another-lesson'; }],
  ['a middle part from another unit taught by the middle of the year', 'T13', (d) => { const c = yc(d, 'middle'); const other = c.parts.find((x) => x.unit !== c.parts[0].unit); c.parts[0].unit = other.unit; }],
  ['a year box that asks the fact of a unit check box of another worksheet type', 'T14', (d) => { const c = yc(d, 'end'); const u = d.en.checks.find((x) => x.parts[0].type !== c.parts[0].type); c.forms.A.cards[0][0] = u.forms.A.cards[0][0]; }],
  ['a page description of exactly 160 characters', 'T15', (d) => { d.en.ui.yearMeta_K_math = 'x'.repeat(160); }],
  ['a placement step cut from an alternate of its place', 'T16', (d) => { const c = pc(d); const s0 = d.en.placeBlueprint.checks.find((x) => x.id === c.id).parts[c.steps[0].slot - 1]; s0.alts = [{ lesson: s0.lesson }].concat(s0.alts || []); s0.lesson = 'K:another-lesson'; }],
  ['a placement box that asks the fact of a unit check box of another worksheet type', 'T17', (d) => { const c = pc(d); const u = d.en.checks.find((x) => x.parts[0].type !== c.steps[0].type); c.forms.A.cards[0][0] = u.forms.A.cards[0][0]; }],
  ['the same box in two checks of the year that are not related (the end of Grade 1, the beginning of Grade 3)', 'T19', (d) => { const a = d.en.year.find((c) => c.id === 'year-1-math-end'), b = d.en.year.find((c) => c.id === 'year-3-math-beginning'); b.forms.A.tasks[0][0] = a.forms.A.tasks[0][0]; b.forms.A.more[0][0] = (a.forms.A.more[0] || [])[0] || []; }],
  ['the same box in the middle checks of two grades', 'T19', (d) => { const a = d.en.year.find((c) => c.id === 'year-1-literacy-middle'), b = d.en.year.find((c) => c.id === 'year-2-literacy-middle'); b.forms.B.tasks[0][0] = a.forms.B.tasks[0][0]; b.forms.B.more[0][0] = (a.forms.B.more[0] || [])[0] || []; }],
  ['the same text read in form A and form B of one check (two parts may read one text)', 'T11', (d) => { const c = d.en.year.find((x) => x.forms.A.more.flat(2).some((k) => k.startsWith('tx:'))); const k = c.forms.A.more.flat(2).find((x) => x.startsWith('tx:')); c.forms.B.more[0][0] = (c.forms.B.more[0][0] || []).concat([k]); }],
  ['the same sentence frame in two related checks with another verb', 'T19', (d) => { const [a, b] = yearPair(d, 'end', 'middle', 0); a.forms.A.more[0][0] = (a.forms.A.more[0][0] || []).concat(['fr:poison']); b.forms.B.more[0][0] = (b.forms.B.more[0][0] || []).concat(['fr:poison']); }],
  ['a middle check of five parts with a ruling that says why', 'T13', (d) => { const c = yc(d, 'middle'); dropPart(c, 0); (d.en.blueprint.rulings[c.id] = d.en.blueprint.rulings[c.id] || {}).impossible = 'No other unit is taught by the middle of the year.'; }],
  ['the stop rule in other words', 'T18', (d) => { d.en.ui.placeStop = 'Give the steps in order; stop after the first step where a child misses two tasks (or the one task of a short step).'; }],
  ['a language without checks of the year and without their strings', 'T8', (d) => { if (d.de) for (const k of Object.keys(d.de.ui)) if (ENGLISH_FIRST(k)) delete d.de.ui[k]; }],
];
/** (Wave 4, poisons) the first rubric of English; the English check of its unit with its writing part (one is made from
 *  the first check when no check has a writing part yet: the faults of T10 and T1 must be provable before the writing
 *  checks are built); the writing part of that check made again from the rubric; a check cut to two parts */
function firstRubric(d) { return d.en.rubrics[Object.keys(d.en.rubrics).find((k) => !k.startsWith('$'))]; }
const writingOfRubric = (R, part) => ({ part, type: R.type, level: R.level, taskA: R.taskA, taskB: R.taskB, points: R.points.map((p) => ({ id: p.id, kind: p.kind, max: 2 })) });
function wcheck(d) {
  const unit = Object.keys(d.en.rubrics).find((k) => !k.startsWith('$'));
  let c = d.en.checks.find((x) => x.unit === unit);
  if (!c) { const u = d.en.units.find((x) => x.id === unit); c = JSON.parse(JSON.stringify(d.en.checks[0])); c.unit = unit; c.slug = u ? u.slug : unit; d.en.checks.push(c); }
  if (!c.writing) c.writing = writingOfRubric(d.en.rubrics[unit], c.parts.length + 1);
  return c;
}
/** (Stage C-2, poisons) the first English check of the year of a time; a part taken out of a check of the year */
function yc(d, time) { const c = (d.en.year || []).find((x) => x.time === time && x.parts.length >= 3); if (!c) throw new Error('no English check of the year of the ' + time + ' to poison (build them: build-checks.js --year)'); return c; }
/** (fix round 2026-11-23, poisons) two related English checks of the year: the check of the time `ta` and the check of the
 *  time `tb`, of one grade and subject (shift 0) or of the next grade (shift 1); the first such pair of the year */
function yearPair(d, ta, tb, shift) {
  const G = ['k', '1', '2', '3'];
  for (const a of d.en.year) {
    const m = YEAR_ID.exec(a.id); if (!m || m[3] !== ta) continue;
    const g = G[G.indexOf(m[1]) + shift]; if (!g) continue;
    const b = d.en.year.find((c) => c.id === 'year-' + g + '-' + m[2] + '-' + tb);
    if (b) return [a, b];
  }
  throw new Error('no pair of checks of the year ' + ta + '/' + tb);
}
/** (poisons) two related checks of the year and a part of the first whose box has a word answer */
function wordPair(d) {
  for (const a of d.en.year) for (const b of d.en.year) if (relatedYear(a.id, b.id)) {
    const i = a.forms.A.more.findIndex((ps) => ps.some((ks) => ks.some((x) => x.startsWith('wa:'))));
    if (i >= 0) return [a, b, i, 0];
  }
  throw new Error('no word answer in the checks of the year');
}
/** (Stage C-3, poisons) the first English placement check of three steps or more */
function pc(d) { const c = (d.en.placement || []).find((x) => x.steps.length >= 3); if (!c) throw new Error('no English placement check to poison (build them: build-checks.js --placement)'); return c; }
function dropPart(c, i) { c.parts.splice(i, 1); for (const k of ['A', 'B']) for (const f of ['cards', 'tasks', 'more', 'pos', 'kinds', 'sizes']) if (c.forms[k][f]) c.forms[k][f].splice(i, 1); }
function syncWriting(d) { const c = wcheck(d); c.writing = writingOfRubric(d.en.rubrics[c.unit], c.writing.part); }
function cutTo2(c) { c.notCovered.push(...c.parts.slice(2).map((p) => p.lesson)); c.parts = c.parts.slice(0, 2); for (const k of ['A', 'B']) for (const f of ['cards', 'pos', 'kinds', 'sizes']) if (c.forms[k][f]) c.forms[k][f] = c.forms[k][f].slice(0, 2); }

if (require.main === module) {
  const d = load();
  const fails = run(d);
  for (const f of fails) console.log('FAIL  ' + f);
  if (fails.length) { console.log(fails.length + ' problem(s)'); process.exit(1); }
  if (process.argv.includes('--poison')) {
    for (const [name, gate, breakIt] of POISONS) {
      const copy = load();
      breakIt(copy);
      if (!run(copy).some((f) => f.startsWith(gate + '  '))) { console.log('POISON NOT CAUGHT  ' + name + ' (' + gate + ')'); process.exit(1); }
    }
    for (const [name, gate, change] of CONTROLS) {
      const copy = load();
      change(copy);
      const got = run(copy).filter((f) => f.startsWith(gate + '  '));
      if (got.length) { console.log('CONTROL FIRES  ' + name + ' (' + gate + '): ' + got[0]); process.exit(1); }
    }
    console.log('unit checks: ' + POISONS.length + ' poisons, each caught by its gate; ' + CONTROLS.length + ' controls, none caught');
  }
  let n = 0, live = 0; for (const [loc, L] of Object.entries(d)) if (loc !== '_en') { n += L.checks.length; live += L.checks.filter((c) => c.status === 'live').length; }
  let yn = 0, ylive = 0, pn = 0; for (const [loc, L] of Object.entries(d)) if (loc !== '_en') { if (L.year) { yn += L.year.length; ylive += L.year.filter((c) => c.status === 'live').length; } if (L.placement) pn += L.placement.length; }
  console.log('unit checks: ' + n + ' check(s), ' + live + ' live' + (yn ? '; checks of the year: ' + yn + ', ' + ylive + ' live' : '') + (pn ? '; placement checks: ' + pn : '') + '; all gates pass');
}
module.exports = { run, load };
