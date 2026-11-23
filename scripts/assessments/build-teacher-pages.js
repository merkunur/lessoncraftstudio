#!/usr/bin/env node
/**
 * Builds the TEACHER PAGES of every unit check of a language as a PDF (Daily Teaching System, Part 7.1): how to use
 * the check, the parts and their points, a class record, and what to do next for each part. A Teacher-only file.
 *
 * Generated from what build-checks.js built (out/assessments/<loc>/checks.json) and from the unit's own data
 * (frontend/content/units/units.<loc>.json: the lesson a part belongs to, its worksheet at three levels, its practice
 * on screen). The only sentences are the strings of frontend/content/assessments/ui.<loc>.json.
 *
 *   node scripts/assessments/build-teacher-pages.js --loc=en
 *     → out/teacher-files/<loc>/checks/<unit id>/teacher-pages.pdf
 *
 * (Stage C-2, 2026-11-22) --year: the teacher pages of the checks of the year (out/assessments/<loc>/year/checks.json):
 * per part the unit and lesson it comes from and what to re-teach when a child misses it, with the unit's page
 * (lib/year-pages.js). Three to five pages, like a unit check's.
 *   node scripts/assessments/build-teacher-pages.js --loc=en --year
 *     → out/teacher-files/<loc>/checks/<year check id>/teacher-pages.pdf
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { splitShared } = require('./lib/reads');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const PAPER = loc === 'en' || loc === 'es' ? 'Letter' : 'A4';
const HOST = 'www.lessoncraftstudio.com';
const ROWS = 26;                                 // lines of the class record
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
const YEAR = process.argv.includes('--year');
// (Stage C-3) --placement: the teacher pages of the placement checks (lib/placement-pages.js): the stop rule, the steps,
// where to start per step, the writing guide of the sentence-writing check, a class record
const PLACEMENT = process.argv.includes('--placement');
const checks = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'assessments', loc, ...(YEAR ? ['year'] : PLACEMENT ? ['placement'] : []), 'checks.json'), 'utf8')).checks;
const { yearHtml } = require('./lib/year-pages');
const { placementHtml } = require('./lib/placement-pages');
const units = new Map(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json'), 'utf8')).units.map((u) => [u.id, u]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));

/** (2026-11-19) the texts the teacher reads aloud before a part: a card of a reading part may carry
 *  data-lcs-teacher-reads (the story or fact text a Kindergarten or Grade 1 child listens to). The words never stand on
 *  the child's form; they stand on the key (build-checks.js) and here, per part and per form. No such part: nothing. */
function readAloud(c) {
  const parts = c.sections.filter((s) => (s.readsA || []).length || (s.readsB || []).length);
  if (!parts.length) return '';
  // a story the cards share is printed once, then each card's own question (lib/reads.js, 2026-11-19: the K story part
  // printed the whole story before every question and the teacher pages ran to five pages)
  const cell = (list) => { const sp = splitShared(list || []);
    if (sp.shared) return '<p class="read">' + esc(sp.shared) + '</p>' + sp.rest.map((t, i) => '<p class="read"><b>' + (i + 1) + '.</b> ' + esc(t) + '</p>').join('');
    return (list || []).map((t, i) => '<p class="read">' + ((list.length > 1) ? '<b>' + (i + 1) + '.</b> ' : '') + esc(t) + '</p>').join(''); };
  return '<section class="reads-page"><h2>' + esc(ui.tpReadTitle) + '</h2><p class="lead">' + esc(ui.tpReadLead) + '</p><table class="score reads"><thead><tr><th>'
    + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpReadA) + '</th><th>' + esc(ui.tpReadB) + '</th></tr></thead><tbody>'
    + parts.map((s) => '<tr><td class="p">' + s.part + '</td><td>' + cell(s.readsA) + '</td><td>' + cell(s.readsB) + '</td></tr>').join('')
    + '</tbody></table></section>';
}

/** (Wave 4, 2026-11-19) the writing part of a writing unit's check (checks.json `writing`, rubrics/<loc>.json): its rows in
 *  "Parts and points" (the part, then one row per point of the rubric, 2 points each), its columns in the class record
 *  (one pair A, B per point, 0 to 2), and the section "How to score the writing": per point a table of Not yet / Nearly /
 *  Secure with what the work shows, the example (printed as the child wrote it, spelling and all) and what to do next.
 *  A check without a writing part prints exactly as before. */
const RUBRICS = (() => { const f = path.join(__dirname, 'rubrics', loc + '.json'); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}; })();
const shortTask = (p) => String(p).split(/\. (?:Facts|Notes): /)[0];
const pointRef = (i) => fill(ui.tpWrPointRef, { n: i + 1 });
function writingRows(W) {
  return '<tr class="wr"><td class="p">' + W.part + '</td><td><b>' + esc(ui.tpWrPart) + '</b></td><td>' + esc(fill(ui.tpWrTasks, { a: shortTask(W.promptA), b: shortTask(W.promptB) })) + '</td><td class="n">' + W.max + '</td></tr>'
    + W.points.map((p, i) => '<tr class="wp"><td></td><td><b>' + esc(pointRef(i)) + '</b> ' + esc(p.name) + '</td><td>' + esc(ui[p.kind === 'conventions' ? 'wrConventions' : 'wrContent']) + '</td><td class="n">' + p.max + '</td></tr>').join('');
}
function rubricSection(W, R) {
  const LV = [['notYet', 'wrNotYet', 0], ['nearly', 'wrNearly', 1], ['secure', 'wrSecure', 2]];
  const point = (p, i) => '<div class="wpoint"><h3><span class="ref">' + esc(pointRef(i)) + '</span> ' + esc(p.name) + ' <small>' + esc(ui[p.kind === 'conventions' ? 'wrConventions' : 'wrContent']) + ' · /2</small></h3>'
    + '<table class="rub"><thead><tr><th></th>' + LV.map(([, k, v]) => '<th>' + esc(ui[k]) + ' · ' + v + '</th>').join('') + '</tr></thead><tbody>'
    + '<tr><th>' + esc(ui.tpWrShows) + '</th>' + LV.map(([l]) => '<td>' + esc(p[l].shows) + '</td>').join('') + '</tr>'
    + '<tr><th>' + esc(ui.tpWrExample) + '</th>' + LV.map(([l]) => '<td class="ex">' + esc(p[l].example) + '</td>').join('') + '</tr>'
    + '<tr><th>' + esc(ui.tpWrNext) + '</th>' + LV.map(([l]) => '<td>' + esc(p.next[l]) + '</td>').join('') + '</tr>'
    + '</tbody></table></div>';
  return '<section class="newpage"><h2>' + esc(ui.wrScoreTitle) + '</h2><p class="lead">' + esc(ui.tpWrLead) + '</p>' + (R.teacherNote ? '<p class="lead">' + esc(R.teacherNote) + '</p>' : '') + '<p class="lead tasks">' + esc(fill(ui.tpWrTasks, { a: shortTask(W.promptA), b: shortTask(W.promptB) })) + '</p>'
    + R.points.map(point).join('') + '</section>';
}

function html(c) {
  const u = units.get(c.unit);
  const lessonOf = (n) => u.lessons.find((l) => l.n === n);
  const W = c.writing || null, R = W ? RUBRICS[c.unit] : null;
  if (W && !R) throw new Error(c.unit + ': the check has a writing part and rubrics/' + loc + '.json has no entry for it');
  const total = c.sections.reduce((k, s) => k + s.cards, 0) + (W ? W.max : 0);
  const score = c.sections.map((s) => '<tr><td class="p">' + s.part + '</td><td><b>' + esc(fill(ui.lessonRef, { n: s.lesson })) + '</b> ' + esc(s.lessonTitle) + '</td><td>' + esc(s.typeTitle) + '</td><td class="n">' + s.cards + '</td></tr>').join('')
    + (W ? writingRows(W) : '') + '<tr class="sum"><td></td><td><b>' + esc(ui.tpTotal) + '</b></td><td></td><td class="n">' + total + '</td></tr>';
  // the class record: one pair of narrow columns (A, B) per part, then the totals
  const head = '<tr><th class="name" rowspan="2">' + esc(ui.tpColName) + '</th>' + c.sections.map((s) => '<th colspan="2">' + s.part + '<small> /' + s.cards + '</small></th>').join('') + (W ? W.points.map((p, i) => '<th colspan="2" class="w">' + esc(pointRef(i)) + '<small> /' + p.max + '</small></th>').join('') : '') + '<th colspan="2">' + esc(ui.tpTotal) + '<small> /' + total + '</small></th></tr>'
    + '<tr>' + c.sections.map(() => '<th class="ab">A</th><th class="ab">B</th>').join('') + (W ? W.points.map(() => '<th class="ab">A</th><th class="ab">B</th>').join('') : '') + '<th class="ab">A</th><th class="ab">B</th></tr>';
  const line = '<tr><td class="name"></td>' + c.sections.map(() => '<td></td><td class="b"></td>').join('') + (W ? W.points.map(() => '<td></td><td class="b"></td>').join('') : '') + '<td></td><td class="b"></td></tr>';
  const next = c.sections.map((s) => {
    const l = lessonOf(s.lesson);
    let p = (l.paper || []).find((x) => x.type === s.type) || (l.paper || [])[0];
    // a part blended of several worksheets names them all: “A” and “B” (the strings put the quotation marks round {title})
    const all = (s.types || []).map((id) => (l.paper || []).find((x) => x.type === id)).filter(Boolean);
    if (all.length > 1) p = Object.assign({}, p, { title: all.map((x) => x.title).join(ui.tpTitleJoin), easy: all.every((x) => x.easy) ? p.easy : null, hard: all.every((x) => x.hard) ? p.hard : null });
    const still = p ? fill(p.easy ? ui.tpStillEasier : ui.tpStill, { n: s.lesson, title: p.title }) : ui.tpNone;
    const easy = p && p.hard ? fill(ui.tpEasyHarder, { title: p.title }) : ui.tpEasyOn;
    return '<tr><td class="p">' + s.part + '</td><td><b>' + esc(fill(ui.lessonRef, { n: s.lesson })) + '</b> ' + esc(s.lessonTitle) + '</td><td>' + esc(still) + '</td><td>' + esc(easy) + '</td><td>' + esc(l.screen && l.screen.title ? l.screen.title : ui.tpNone) + '</td></tr>';
  }).join('');
  const left = c.notCovered.length ? '<p class="left">' + esc(fill(ui.tpNotCovered, { lessons: c.notCovered.map((n) => fill(ui.lessonRef, { n })).join(', ') })) + '</p>' : '';
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(fill(ui.tpTitle, { unit: c.title })) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + '</style></head><body>'
    + '<header><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc(ui.tpEyebrow) + '</p><h1>' + esc(fill(ui.tpTitle, { unit: c.title })) + '</h1></header>'
    + '<section><h2>' + esc(ui.tpHowTitle) + '</h2><ul class="how"><li>' + (W ? [ui.tpHow1, ui.tpHow2, ui.tpHow3Plain, ui.tpHow3Writing] : [ui.tpHow1, ui.tpHow2, ui.tpHow3]).map(esc).join('</li><li>') + '</li></ul><p class="honest">' + esc(ui.tpHonest) + '</p></section>'
    + '<section><h2>' + esc(ui.tpScoreTitle) + '</h2><table class="score"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpColLesson) + '</th><th>' + esc(ui.tpColFrom) + '</th><th class="n">' + esc(ui.tpColPoints) + '</th></tr></thead><tbody>' + score + '</tbody></table>' + left + '</section>'
    + readAloud(c)
    + (W ? rubricSection(W, R) : '')
    + '<section class="newpage"><h2>' + esc(ui.tpNextTitle) + '</h2><p class="lead">' + esc(ui.tpNextLead) + '</p><table class="next"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpColLesson) + '</th><th>' + esc(ui.tpColStill) + '</th><th>' + esc(ui.tpColEasy) + '</th><th>' + esc(ui.tpColScreen) + '</th></tr></thead><tbody>' + next + '</tbody></table>'
    + '<p class="where">' + esc(HOST + '/' + loc + '/units/' + c.slug) + '</p></section>'
    + '<section class="newpage"><h2>' + esc(ui.tpGridTitle) + '</h2><p class="lead">' + esc(ui.tpGridLead) + '</p>' + (W ? '<p class="lead">' + esc(fill(ui.tpWrGridKey, { list: W.points.map((p, i) => pointRef(i) + ' ' + p.name).join('; ') })) + '</p>' : '') + '<table class="grid"><thead>' + head + '</thead><tbody>' + Array.from({ length: ROWS }, () => line).join('') + '</tbody></table></section>'
    + '</body></html>';
}

const CSS = `
@page { size: ${PAPER}; margin: 13mm 14mm 13mm 14mm; }
* { box-sizing: border-box; }
html { font-family: Nunito, system-ui, sans-serif; color: #14332d; font-size: 10.5pt; line-height: 1.4; }
body { margin: 0; }
h1, h2, .brand { font-family: 'Baloo 2', system-ui, sans-serif; line-height: 1.15; margin: 0; }
p, ul { margin: 0; }
.brand { font-size: 12pt; color: #146b5e; font-weight: 700; }
.eyebrow { margin-top: 4mm; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #146b5e; font-size: 9.5pt; }
h1 { font-size: 22pt; margin-top: 1.5mm; }
h2 { font-size: 15pt; margin-top: 7mm; }
.newpage { break-before: page; }
.newpage h2 { margin-top: 0; }
.how { margin-top: 2.5mm; padding-left: 5mm; max-width: 170mm; }
.how li { margin-top: 1.2mm; }
.honest { margin-top: 3mm; padding: 3mm 4mm; border: 0.9pt solid #14332d; border-radius: 2mm; max-width: 170mm; font-weight: 600; }
.lead { margin-top: 2mm; max-width: 175mm; }
table { border-collapse: collapse; width: 100%; margin-top: 4mm; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
th { text-align: left; font-size: 8.5pt; letter-spacing: 0.04em; text-transform: uppercase; color: #46625b; padding: 0 3mm 1.5mm 0; border-bottom: 1.5pt solid #14332d; }
.score td, .next td { padding: 2.4mm 3mm 2.4mm 0; border-bottom: 0.5pt solid #8fa39e; vertical-align: top; }
td.p { width: 12mm; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 13pt; color: #146b5e; }
td.n, th.n { width: 18mm; text-align: right; padding-right: 0; font-weight: 700; }
tr.sum td { border-bottom: 0; border-top: 1.5pt solid #14332d; }
.left { margin-top: 3mm; color: #46625b; }
.next td { font-size: 9.5pt; }
.next td:nth-child(2) { width: 42mm; }
.where { margin-top: 4mm; font-size: 9pt; color: #46625b; }
.reads td:nth-child(2), .reads td:nth-child(3) { width: 44%; font-size: 9.5pt; }
.reads p.read + p.read { margin-top: 1.5mm; }
/* the read-aloud texts start on a page of their own: the teacher holds that sheet while reading (2026-11-19) */
section.reads-page { break-before: page; }
/* the total of Parts and points never stands alone at the top of a page (G3 opinion, 2026-11-19) */
tr.sum { break-before: avoid; page-break-before: avoid; }
.score tr { break-inside: avoid; }
.grid { margin-top: 3mm; table-layout: fixed; }
.grid th { text-align: center; padding: 0 0 1mm; border-bottom: 0; font-size: 9pt; letter-spacing: 0; }
.grid th small { font-weight: 600; color: #46625b; }
.grid th.name { text-align: left; width: 46mm; vertical-align: bottom; }
.grid th.ab { font-size: 8pt; border-bottom: 1.5pt solid #14332d; }
.grid td { height: 7.6mm; border: 0.5pt solid #8fa39e; }
.grid td.name { border-left: 0; }
.grid td.b { border-right: 1.2pt solid #14332d; }
.score tr.wp td { padding-top: 1mm; padding-bottom: 1mm; font-size: 9.5pt; border-bottom: 0.3pt dotted #8fa39e; }
.grid th.w { color: #146b5e; }
.lead.tasks { font-weight: 700; }
.wpoint { break-inside: avoid; margin-top: 4.5mm; }
.wpoint h3 { font-family: 'Baloo 2', system-ui, sans-serif; font-size: 12.5pt; margin: 0; line-height: 1.2; }
.wpoint h3 .ref { color: #146b5e; }
.wpoint h3 small { font-family: Nunito, system-ui, sans-serif; font-weight: 600; font-size: 9pt; color: #46625b; }
.rub { margin-top: 1.5mm; table-layout: fixed; }
.rub th { font-size: 8pt; }
.rub thead th { border-bottom: 1.2pt solid #14332d; }
.rub tbody th { width: 24mm; text-transform: none; letter-spacing: 0; font-size: 8.5pt; color: #46625b; vertical-align: top; padding: 1.6mm 2mm 1.6mm 0; border-bottom: 0.5pt solid #8fa39e; }
.rub td { font-size: 9pt; line-height: 1.3; padding: 1.6mm 2.5mm 1.6mm 0; border-bottom: 0.5pt solid #8fa39e; vertical-align: top; }
.rub td.ex { font-weight: 700; color: #14332d; }
`;

(async () => {
  if (!checks.length) { console.log(loc + ': no check'); return; }
  const browser = await puppeteer.launch({ headless: 'new' });
  // (fix round 2026-11-23) --unit=<id>[,<id>…]: the teacher pages of these checks only (the others are kept as they are)
  const only = arg('unit', '') ? arg('unit', '').split(',') : null;
  for (const c of checks.filter((x) => !only || only.includes(x.unit))) {
    const page = await browser.newPage();
    await page.setContent(PLACEMENT ? placementHtml(c, { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud, writingRows, rubricSection, RUBRICS }) : YEAR ? yearHtml(c, { ui, loc, esc, fill, HOST, CSS, ROWS, readAloud }) : html(c), { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const dir = path.join(REPO, 'out', 'teacher-files', loc, 'checks', c.unit);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'teacher-pages.pdf');
    const buf = await page.pdf({ path: file, format: PAPER, printBackground: true, preferCSSPageSize: true });
    const pages = (Buffer.from(buf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    // how to use + points · what next · class record (Wave 4: and one or two pages of How to score the writing)
    // a check with read-aloud parts adds its texts on a page or two of their own (Kindergarten stories, 2026-11-19)
    const reads = c.sections.some((x) => (x.readsA || []).length || (x.readsB || []).length);
    // (a check of the year: how to use and its parts, its texts to read aloud if any, what next, the class record — three
    //  to five pages; a check of ten parts may take a second page for its parts)
    // (a placement check: three to five pages; with its writing guide four to six, as a unit check with a writing part)
    const ok = PLACEMENT ? (c.writing ? pages >= 4 && pages <= 6 : pages >= 3 && pages <= 5) : YEAR ? pages >= 3 && pages <= 5 : c.writing ? pages >= 4 && pages <= 6 : reads ? pages >= 4 && pages <= 5 : pages === 3;
    console.log((ok ? 'ok    ' : 'FAIL  ') + c.unit + ': ' + pages + ' page(s) → ' + path.relative(REPO, file));
    if (!ok) process.exitCode = 1;
    const shot = arg('shot', '');
    if (shot) { await page.setViewport({ width: PAPER === 'Letter' ? 816 : 794, height: 1056 }); await page.emulateMediaType('print'); await page.screenshot({ path: path.join(shot, c.unit + '-teacher.png'), fullPage: true }); }
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
