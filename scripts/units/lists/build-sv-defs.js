#!/usr/bin/env node
/**
 * The Swedish unit list (Daily Teaching System, Part 4.6), written once into frontend/content/units/defs/sv.json,
 * which is the hand-kept source from then on (refuses to run when the file exists unless --force is given).
 *
 * Source: scripts/units/lists/sv-placement.txt, the answer of a Swedish lågstadielärare to the placement sheet
 * (scripts/units/placement-sheet.js --loc=sv): for each of the 200 English lessons its Swedish school year
 * (F = förskoleklass, 1, 2, 3, X = not taught in F–3 or no Swedish page), its place in a Swedish arbetsområde, and
 * the Swedish name of each arbetsområde. Lgr22 gives central content for the band 1–3 only, so the year comes from
 * Swedish classroom practice: 0–20 in åk 1, 0–100 in åk 2, 0–1000 in åk 3, multiplication from åk 2, formal reading
 * and written arithmetic from åk 1 (förskoleklass is oral and play-based).
 *
 * A remark that names the one worksheet that stays ("only “…” stays") narrows the lesson to that page (`types`).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'units', 'defs', 'sv.json');
if (fs.existsSync(OUT) && !process.argv.includes('--force')) { console.error('defs/sv.json exists: it is the source now (use --force to rebuild it from the placement)'); process.exit(1); }
const en = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'defs', 'en.json'), 'utf8'));
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.sv.json'), 'utf8'));
const assets = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'assets', 'sv.json'), 'utf8'));
const enLesson = new Map();
for (const u of en.units) for (const l of u.lessons) enLesson.set(l.point, l);
const lines = fs.readFileSync(path.join(__dirname, 'sv-placement.txt'), 'utf8').replace(/\r\n/g, '\n').split('\n').map((x) => x.trim()).filter(Boolean);
const lessons = [], unitRows = [];
for (const line of lines) {
  const f = line.split('|').map((x) => x.trim());   // a line without a remark ends in a bare bar
  if (line.startsWith('`')) lessons.push({ point: f[0].replace(/`/g, ''), year: f[1], order: +f[2] || 0, key: f[3], remark: f.slice(4).join(' | ') });
  else if (/^[F123]-(ma|sv)-/.test(f[0])) unitRows.push({ key: f[0], year: f[1], subject: f[2] === 'ma' ? 'math' : 'literacy', position: +f[3], title: f[4] });
}
if (lessons.length !== 200) throw new Error(lessons.length + ' lesson lines (200 expected)');
const fold = (s) => s.toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/é/g, 'e').replace(/([0-9]):([a-z])/g, '$1$2').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const GRADE = { F: 'K', 1: '1', 2: '2', 3: '3' };
const YEAR = { F: 'förskoleklass', 1: 'åk 1', 2: 'åk 2', 3: 'åk 3' };
const SUBJ = { math: 'Matematik', literacy: 'Svenska' };
// pages whose printed number range the placement sheet did not show (read from the generator): the published
// "Dagens tal" (G1-243) works with 21-49, the range of åk 2, so the åk 1 lesson keeps the 11-20 page only
const TYPES = { '1:number-of-the-day': ['G1-255'] };
// a page made per animal carries a placeholder in its printed title; the lesson names the page itself
const TITLES = { '2:animal-fact-file': { 'G2-339': 'Faktablad om ett djur: ringa in rätt fakta', 'G2-340': 'Faktablad om ett djur med ordbank' } };
// the English unit names an activity that has no Swedish version yet: the lesson practises on its own page instead
// …or whose activity works in a number range of a later Swedish year (to 100 or 120 in åk 1, within 1000 in åk 2,
// "make 10" in a förskoleklass lesson that stays with 5)
const NO_ACTIVITY = new Set(['2:cloze-context', '1:count-on-back-hops', '1:number-line-placement', '2:number-line-not-from-zero', 'K:number-bonds-k',
  // the Swedish reviewers: the activity practises something else than the lesson (5-, 10- and 100-hopp in a lesson on 3- and
  // 4-hopp; regrouping in a lesson without it; addition stories in a multiplication lesson; possessives in a han/hon/de lesson)
  '2:skip-count-3-4', '2:column-method', '3:muldiv-word-problems', '1:pronouns', '3:estimate-by-rounding', '3:division-repeated-subtraction',
  // in the manifests, not yet published in Swedish (the Swedish activity batch is deployed when it is complete):
  // check-live.js answered 404 for both on 2026-11-11; they come back when that batch is live
  '2:plural-nouns', '2:read-jugs']);
// the activity of the point that stays within 100 (the first one of the point adds within 1000, the range of åk 3)
const ACTIVITY = { '2:add-with-blocks': 'place-value-regroup.add-compose-ten.1-nbt-c-4' };
// one worksheet and nothing else in Swedish (the clock activities of these points are not built in Swedish yet): a
// lesson needs two real assets, so these wait for the activity (recorded in docs/daily-teaching-system/units/GAPS.sv.md)
const WAITS = new Set(['3:elapsed-duration', '3:add-subtract-time']);
const WEEKS = { 1: 'en vecka', 2: 'två veckor', 3: 'tre veckor' };
const SUBJ_LC = { math: 'matematik', literacy: 'svenska' };
const units = [];
const narrowed = [], dropped = [];
unitRows.sort((a, b) => 'F123'.indexOf(a.year) - 'F123'.indexOf(b.year) || (a.subject === b.subject ? a.position - b.position : a.subject === 'math' ? -1 : 1));
for (const r of unitRows) {
  const own = lessons.filter((l) => l.key === r.key).sort((a, b) => a.order - b.order);
  const ls = [];
  for (const l of own) {
    const e = enLesson.get(l.point);
    if (!e) throw new Error('no English lesson ' + l.point);
    let types = e.types.filter((t) => strings[t] && assets.types[t]);
    // the one worksheet a remark keeps: only “<title>” stays / “<title>” stays
    const keep = /only “([^”]+)”|“([^”]+)”(?: and “([^”]+)”)? stays?/.exec(l.remark);
    if (keep) {
      const names = [keep[1], keep[2], keep[3]].filter(Boolean);
      const hit = types.filter((t) => names.includes(strings[t].title));
      if (hit.length) { types = hit; narrowed.push(l.point + ' → ' + hit.join(', ')); }
    }
    if (TYPES[l.point]) { types = types.filter((t) => TYPES[l.point].includes(t)); narrowed.push(l.point + ' → ' + types.join(', ')); }
    if (!types.length) { dropped.push(l.point + ' (no Swedish page)'); continue; }
    if (WAITS.has(l.point)) { dropped.push(l.point + ' (one asset in Swedish; waits for its activity)'); continue; }
    const x = { point: l.point, types };
    if (NO_ACTIVITY.has(l.point)) x.activity = null;
    else if (ACTIVITY[l.point]) x.activity = ACTIVITY[l.point];
    else if ('activity' in e) x.activity = e.activity;
    if (TITLES[l.point]) x.titles = TITLES[l.point];
    ls.push(x);
  }
  if (ls.length < 4) { dropped.push(...ls.map((x) => x.point + ' (unit ' + r.key + ' has fewer than four lessons)')); continue; }
  const lead = SUBJ[r.subject] + ' ' + YEAR[r.year] + ': ' + r.title.replace(': ', ' – ');
  const metaTitle = (lead + ' | Lektionsplanering').length <= 70 ? lead + ' | Lektionsplanering' : lead;
  const weeks = Math.max(1, Math.round(ls.length / 4));
  const head = 'Lektionsplanering i ' + SUBJ_LC[r.subject] + ' för ' + YEAR[r.year] + ', arbetsområdet ”' + r.title + '”: ' + ls.length + ' lektioner med lärarkommentar och arbetsblad till varje lektion';
  const metaDescription = (head + ', cirka ' + WEEKS[weeks] + '.').length <= 170 ? head + ', cirka ' + WEEKS[weeks] + '.' : head + '.';
  units.push({ id: 'sv-' + r.key.toLowerCase(), slug: fold(r.title) + '-' + fold(YEAR[r.year]), status: 'pilot', grade: GRADE[r.year], subject: r.subject, title: r.title, metaTitle, metaDescription, weeks, lessons: ls });
}
const used = new Set();
for (const u of units) for (const l of u.lessons) { if (used.has(l.point)) throw new Error(l.point + ' is in two units'); used.add(l.point); }
// plans: one per school year and subject that has at least three arbetsområden; a plan names its weeks, never the year
const plans = [];
for (const y of ['F', '1', '2', '3']) for (const subject of ['math', 'literacy']) {
  const own = units.filter((u) => u.grade === GRADE[y] && u.subject === subject);
  if (own.length < 3) continue;
  const name = SUBJ[subject] + ' ' + YEAR[y];
  plans.push({ id: 'plan-' + GRADE[y].toLowerCase() + '-' + subject, slug: 'planering-' + fold(SUBJ_LC[subject]) + '-' + fold(YEAR[y]), grade: GRADE[y], subject,
    title: name + ': planering för {weeks} veckor', metaTitle: name + ': planering för {weeks} veckor ({units} arbetsområden)',
    metaDescription: '{units} arbetsområden i ' + SUBJ_LC[subject] + ' för ' + YEAR[y] + ' i undervisningsordning, cirka {weeks} veckor (inte ett helt läsår), med lektionerna i varje arbetsområde.',
    units: own.map((u) => u.id) });
}
fs.writeFileSync(OUT, JSON.stringify({ $comment: 'The Swedish units (Part 4.6). Hand-kept source; first written by scripts/units/lists/build-sv-defs.js from a Swedish teacher\'s placement of every lesson (lists/sv-placement.txt).', units, plans }, null, 1) + '\n');
console.log('sv: ' + units.length + ' units, ' + units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons → ' + path.relative(REPO, OUT));
console.log('year X: ' + lessons.filter((l) => l.year === 'X').map((l) => l.point).join(', '));
console.log('narrowed to one page: ' + narrowed.join('; '));
if (dropped.length) console.log('left out: ' + dropped.join('; '));
for (const u of units) { if (u.metaTitle.length > 70) console.log('TOO LONG ' + u.metaTitle.length + ' ' + u.metaTitle); if (u.metaDescription.length < 110 || u.metaDescription.length > 170) console.log('DESCRIPTION ' + u.metaDescription.length + ' ' + u.id); }
console.log(plans.length + ' plans: ' + plans.map((p) => p.slug + ' (' + p.units.length + ')').join(', '));
