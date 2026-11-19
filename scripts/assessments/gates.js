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
  return d;
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
    for (const k of Object.keys(d._en)) if (!L.ui[k]) fail('T8', loc + ' ui.' + k + ' is missing');
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
  console.log('unit checks: ' + n + ' check(s), ' + live + ' live; all gates pass');
}
module.exports = { run, load };
