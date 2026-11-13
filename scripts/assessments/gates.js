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
  }
  d._en = readJson(path.join(C, 'assessments', 'ui.en.json'));
  return d;
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
    let choice = 0, same = 0;
    const seenUnits = new Set();
    for (const c of L.checks) {
      const w = loc + ' check ' + c.unit;
      if (seenUnits.has(c.unit)) fail('T3', w + ': two checks of one unit'); seenUnits.add(c.unit);
      const u = L.units.find((x) => x.id === c.unit);
      if (!u) { fail('T3', w + ': no such unit'); continue; }
      if (c.status === 'live' && u.status !== 'live') fail('T3', w + ': a live check of a unit that is not live');
      if (c.slug !== u.slug) fail('T3', w + ': the slug is not the unit\'s');
      if (c.parts.length < 3) fail('T1', w + ': ' + c.parts.length + ' part(s)');
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
];

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
    console.log('unit checks: ' + POISONS.length + ' poisons, each caught by its gate');
  }
  let n = 0, live = 0; for (const [loc, L] of Object.entries(d)) if (loc !== '_en') { n += L.checks.length; live += L.checks.filter((c) => c.status === 'live').length; }
  console.log('unit checks: ' + n + ' check(s), ' + live + ' live; all gates pass');
}
module.exports = { run, load };
