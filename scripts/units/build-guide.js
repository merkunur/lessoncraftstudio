#!/usr/bin/env node
/**
 * Builds a unit's TEACHER GUIDE as a PDF (Daily Teaching System, Parts 3 and 4): a Teacher-only file.
 *
 * The guide is generated from the same data as the unit's page (frontend/content/units/units.<loc>.json and
 * ui.<loc>.json): a cover with the unit at a glance, one page per lesson (objective, standard, what to hand out, the
 * teacher note, lines for the teacher's own notes) and a class record to fill in by hand. No sentence in it is written
 * for the guide alone.
 *
 *   node scripts/units/build-guide.js --loc=en [--unit=<id>]
 *     → out/teacher-files/<loc>/units/<id>/teacher-guide.pdf   (uploaded by scripts/units/upload-teacher-files.sh;
 *       never committed, never inside a folder the web server serves)
 *
 * Paper: US Letter for en and es (the United States and Mexico), A4 for the other languages.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const only = arg('unit', '');
const U = path.join(REPO, 'frontend', 'content', 'units');
const units = JSON.parse(fs.readFileSync(path.join(U, 'units.' + loc + '.json'), 'utf8')).units.filter((u) => !only || u.id === only);
const ui = JSON.parse(fs.readFileSync(path.join(U, 'ui.' + loc + '.json'), 'utf8'));
// the units that have a live unit check (Part 7): only their guide names "the unit check" as the end of the unit
const checksFile = path.join(REPO, 'frontend', 'content', 'assessments', 'checks.' + loc + '.json');
const liveChecks = new Set(fs.existsSync(checksFile) ? JSON.parse(fs.readFileSync(checksFile, 'utf8')).checks.filter((c) => c.status === 'live').map((c) => c.unit) : []);
const hasCheck = (id) => liveChecks.has(id);
const messages = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', loc + '.json'), 'utf8'));
const LEVEL_KEY = { P: 'preschool', K: 'kindergarten', 1: 'grade_1', 2: 'grade_2', 3: 'grade_3', 4: 'grade_4', 5: 'grade_5' };
const PAPER = loc === 'en' || loc === 'es' ? 'Letter' : 'A4';
// the height of a sheet inside its margins (14 mm top and bottom), one millimetre short so that rounding never spills a line onto a new sheet
const PAGE_H = (PAPER === 'Letter' ? 279.4 : 297) - 28 - 1;
const HOST = 'https://www.lessoncraftstudio.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
const thumb = (slug) => HOST + '/' + loc + '/decks/' + slug + '/thumbnail.png';

function html(unit) {
  const grade = messages.seo.educational_level[LEVEL_KEY[unit.grade]] || unit.grade;
  const subject = ui['subject_' + unit.subject] || unit.subject;
  // (the table at a glance lists a lesson's OWN standards; what it reviews or reaches ahead to is on the lesson's page)
  // (a framework without codes, such as the German Bildungsstandards, is named by the heading the objective stands under)
  const std = (l) => [...new Set(l.standards.filter((s) => s.rel === 'teaches').map((s) => (s.code ? [s.framework, s.code].join(' ') : (s.title || s.framework))).filter(Boolean))];
  const glance = unit.lessons.map((l) => '<tr><td class="n">' + l.n + '</td><td><b>' + esc(l.title) + '</b></td><td>' + esc(l.led ? ui.guideNoPage : l.paper.map((p) => p.title).join(', ')) + '</td><td class="s' + (l.standards.some((x) => x.rel === 'teaches' && x.code) ? '' : ' w') + '">' + esc(std(l).join(', ')) + '</td></tr>').join('');
  const cover = '<section class="page cover"><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc([grade, subject, ui.unitWord].join(' · ')) + '</p><h1>' + esc(unit.title) + '</h1><p class="kind">' + esc(ui.guideTitle) + '</p>'
    + '<p class="facts">' + esc(fill(ui.factLessons, { n: unit.lessons.length })) + ' · ' + esc(unit.weeks === 1 ? ui.factWeek : fill(ui.factWeeks, { n: unit.weeks })) + '</p>'
    + ((hasCheck(unit.id) ? ui.unitEnd : ui.unitEndOwn) ? '<p class="facts">' + esc(hasCheck(unit.id) ? ui.unitEnd : ui.unitEndOwn) + '</p>' : '')
    + '<h2>' + esc(ui.guideGlance) + '</h2><table class="glance"><thead><tr><th></th><th>' + esc(ui.guideColLesson) + '</th><th>' + esc(ui.guideColPages) + '</th><th>' + esc(ui.standardTeaches) + '</th></tr></thead><tbody>' + glance + '</tbody></table>'
    + '<p class="where">' + esc(HOST.replace('https://', '') + '/' + loc + '/units/' + unit.slug) + '</p></section>';
  const lessons = unit.lessons.map((l) => {
    const need = [];
    if (l.tool) need.push('<li><b>' + esc(ui.slotTool) + ':</b> ' + esc(fill(ui.slotToolText, { name: l.tool.name })) + '</li>');
    if (l.led && l.routine) need.push('<li><b>' + esc(ui.slotRoutine) + ':</b> ' + esc(l.routine) + '</li>');
    for (const p of l.paper) need.push('<li><b>' + esc(ui.slotPaper) + ':</b> ' + esc(p.title) + ' <span class="lv">(' + esc([ui.levelCore, p.easy ? ui.levelEasy : null, p.hard ? ui.levelHard : null].filter(Boolean).join(', ')) + ')</span></li>');
    if (l.screen) need.push('<li><b>' + esc(ui.slotScreen) + ':</b> ' + esc(l.screen.kind === 'activity' ? l.screen.title : fill(ui.slotScreenPage, { title: l.screen.title })) + '</li>');
    if (l.exit) need.push('<li><b>' + esc(ui.slotExit) + ':</b> ' + esc(fill(ui.slotExitText, { title: l.exit.title })) + '</li>');
    if (l.maker) need.push('<li><b>' + esc(ui.slotMaker) + ':</b> ' + esc(fill(ui.slotMakerText, { name: l.maker.name })) + '</li>');
    const pics = l.paper.map((p) => '<figure><img src="' + thumb(p.core) + '" alt=""><figcaption>' + esc(p.title) + '</figcaption></figure>').join('');
    const rel = { teaches: ui.standardTeaches, reviews: ui.standardReviews, ahead: ui.standardAhead, prepares: ui.standardPrepares, extends: ui.standardExtends };
    const stds = l.standards.map((s) => '<span class="std"><i>' + esc(rel[s.rel]) + '</i> <b>' + esc([s.framework, s.code].filter(Boolean).join(' ')) + '</b>' + (s.title ? ' ' + esc(s.title) : '') + '</span>').join('');
    return '<section class="page lesson"><header><p class="no">' + esc(fill(ui.lessonWord, { n: l.n }) + (l.days && ui.lessonDays ? ' · ' + fill(ui.lessonDays, { n: l.days }) : '')) + '</p><h2>' + esc(l.title) + '</h2><p class="obj">' + esc(l.objective) + '</p><p class="stds">' + stds + '</p></header>'
      + '<div class="cols' + (pics ? '' : ' one') + '"><div><h3>' + esc(ui.guideNeed) + '</h3><ul class="need">' + need.join('') + '</ul></div><div class="pics">' + pics + '</div></div>'
      + '<div class="note"><h3>' + esc(ui.noteTitle) + '</h3><dl><dt>' + esc(ui.noteMistake) + '</dt><dd>' + esc(l.note.mistake) + '</dd><dt>' + esc(ui.noteWords) + '</dt><dd>' + esc(l.note.words) + '</dd><dt>' + esc(ui.noteWatch) + '</dt><dd>' + esc(l.note.watch) + '</dd></dl></div>'
      + '<div class="mine"><h3>' + esc(ui.guideMyNotes) + '</h3><div class="rules"><i></i><i></i><i></i><i></i></div></div>'
      + '<footer>' + esc(unit.title) + ' · ' + esc(ui.guideTitle) + '</footer></section>';
  }).join('');
  const rows = Array.from({ length: 28 }, () => '<tr><td class="name"></td>' + unit.lessons.map(() => '<td></td>').join('') + '</tr>').join('');
  const record = '<section class="page record"><h2>' + esc(ui.guideRecord) + '</h2><p class="lead">' + esc(ui.guideRecordLead) + '</p><table><thead><tr><th class="name">' + esc(ui.guideRecordName) + '</th>' + unit.lessons.map((l) => '<th>' + l.n + '</th>').join('') + '</tr></thead><tbody>' + rows + '</tbody></table><footer>' + esc(unit.title) + ' · ' + esc(ui.guideTitle) + '</footer></section>';
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(unit.title + ' — ' + ui.guideTitle) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + '</style></head><body>' + cover + lessons + record + '</body></html>';
}

const CSS = `
@page { size: ${PAPER}; margin: 14mm 15mm 14mm 15mm; }
* { box-sizing: border-box; }
html { font-family: Nunito, system-ui, sans-serif; color: #14332d; font-size: 11.5pt; line-height: 1.45; }
body { margin: 0; }
h1, h2, h3, .no, .brand, .kind { font-family: 'Baloo 2', system-ui, sans-serif; line-height: 1.15; margin: 0; }
p { margin: 0; }
ul, dl, dd { margin: 0; padding: 0; }
.page { break-after: page; position: relative; height: ${PAGE_H}mm; display: flex; flex-direction: column; }
.page:last-child { break-after: auto; }
.brand { font-size: 12pt; color: #146b5e; font-weight: 700; }
.cover .eyebrow { margin-top: 26mm; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #146b5e; font-size: 10pt; }
.cover h1 { font-size: 34pt; margin-top: 3mm; max-width: 150mm; }
.cover .kind { font-size: 18pt; color: #c9552e; margin-top: 3mm; }
.cover .facts { margin-top: 3mm; font-weight: 600; }
.cover h2 { font-size: 15pt; margin-top: 16mm; }
table { border-collapse: collapse; width: 100%; }
.glance { margin-top: 4mm; font-size: 10.5pt; }
.glance th { text-align: left; font-size: 8.5pt; letter-spacing: 0.05em; text-transform: uppercase; color: #46625b; padding: 0 3mm 1.5mm 0; border-bottom: 1.5pt solid #14332d; }
.glance td { padding: 2.2mm 3mm 2.2mm 0; border-bottom: 0.5pt solid #b9c7c3; vertical-align: top; }
.glance td.n { font-family: 'Baloo 2', sans-serif; font-weight: 700; width: 8mm; color: #146b5e; }
.glance td.s { font-size: 9.5pt; width: 62mm; }
.glance td.s.w { width: 50mm; }
.glance th:nth-child(2) { width: 52mm; }
/* a cover whose table would run under the address line (many lessons, long titles) is set tighter */
.cover.tight .eyebrow { margin-top: 8mm; }
.cover.tight h1 { font-size: 28pt; }
.cover.tight h2 { margin-top: 8mm; }
.cover.tight .glance { font-size: 9.5pt; }
.cover.tight .glance td { padding: 1.3mm 3mm 1.3mm 0; }
.cover.tight .glance td.s { font-size: 8.5pt; }
.cover .where { position: absolute; bottom: 0; left: 0; font-size: 9pt; color: #46625b; }
/* a lesson sheet that would run past its foot: tighter first, then without the box for own notes */
.lesson.tight .obj { margin-top: 1.5mm; font-size: 11.5pt; }
.lesson.tight .stds { margin-top: 2mm; gap: 1mm; }
.lesson.tight .std { font-size: 8.5pt; padding: 0.3mm 2mm; }
.lesson.tight .cols { margin-top: 4mm; }
.lesson.tight .need li { padding-top: 1.1mm; padding-bottom: 1.1mm; }
.lesson.tight .note { margin-top: 4mm; }
.lesson.tight .mine { margin-top: 4mm; }
.lesson.nomine .mine { display: none; }
.lesson .no { font-size: 11pt; font-weight: 700; color: #146b5e; letter-spacing: 0.04em; text-transform: uppercase; }
.lesson h2 { font-size: 24pt; margin-top: 1mm; }
.lesson .obj { margin-top: 2.5mm; font-size: 12.5pt; max-width: 160mm; }
.stds { margin-top: 3mm; display: flex; flex-wrap: wrap; gap: 2mm; }
.std { border: 0.6pt solid #8fa39e; border-radius: 2mm; padding: 0.6mm 2.4mm; font-size: 9.5pt; }
.std i { font-style: normal; color: #46625b; }
.cols { display: grid; grid-template-columns: 1fr 62mm; gap: 8mm; margin-top: 7mm; align-items: start; }
h3 { font-size: 13pt; }
/* a lesson without a page has no pictures beside its list: the list takes the sheet's width */
.cols.one { grid-template-columns: 1fr; }
.cols.one .pics { display: none; }
.cols.one .need { max-width: 165mm; }
.need { list-style: none; margin-top: 2mm; }
.need li { padding: 1.6mm 0 1.6mm 6mm; border-bottom: 0.5pt solid #d5ddd9; position: relative; }
.need li::before { content: ''; position: absolute; left: 0; top: 2.6mm; width: 3.2mm; height: 3.2mm; border: 0.8pt solid #14332d; border-radius: 0.6mm; }
.need .lv { color: #46625b; }
.pics { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.pics figure { margin: 0; }
.pics img { display: block; width: 100%; aspect-ratio: 120 / 155; object-fit: cover; object-position: top; border: 0.5pt solid #8fa39e; }
.pics figcaption { font-size: 8pt; margin-top: 1mm; line-height: 1.25; color: #46625b; }
.note { margin-top: 7mm; padding: 4mm 5mm; background: #fff3c9; border-left: 2mm solid #f2cf5b; break-inside: avoid; }
.note dt { margin-top: 2.2mm; font-weight: 700; font-size: 9.5pt; }
/* the box for own notes takes the room that is left: a line is 7 mm or it is not drawn (the lines that do not fit are
   cut off, never squeezed and never run into the footer); the box is at least its heading and ONE line */
.mine { margin-top: 7mm; flex: 1 1 auto; min-height: 23mm; display: flex; flex-direction: column; padding-bottom: 12mm; overflow: hidden; }
.rules { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; max-height: 44mm; overflow: hidden; }
.rules i { flex: 1 0 7mm; min-height: 7mm; border-bottom: 0.5pt solid #8fa39e; }
footer { position: absolute; bottom: 0; left: 0; right: 0; font-size: 8.5pt; color: #46625b; border-top: 0.5pt solid #b9c7c3; padding-top: 1.5mm; }
.record h2 { font-size: 20pt; }
.record .lead { margin-top: 2mm; max-width: 165mm; }
.record table { margin-top: 5mm; font-size: 10pt; }
.record th { border: 0.6pt solid #14332d; padding: 1.5mm; font-family: 'Baloo 2', sans-serif; }
.record td { border: 0.6pt solid #8fa39e; height: ${PAPER === 'Letter' ? 6.6 : 7.2}mm; }
.record .name { width: 62mm; text-align: left; }
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const unit of units) {
    const page = await browser.newPage();
    // MEASURE WHAT IS PRINTED: the fit check below runs in the browser's layout, so that layout must be the sheet's
    // own (print media, the width between the page margins). At the default 800 px window a line holds more words
    // than on paper: a sheet "fitted", and in the PDF its note lines ran onto the next sheet, through its title.
    await page.setViewport({ width: Math.round(((PAPER === 'Letter' ? 215.9 : 210) - 30) / 25.4 * 96), height: 1100 });
    await page.emulateMediaType('print');
    await page.setContent(html(unit), { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
    if (broken.length) { console.log('FAIL  ' + unit.id + ': ' + broken.length + ' picture(s) did not load: ' + broken.slice(0, 3).join(', ')); process.exitCode = 1; await page.close(); continue; }
    // every section must fit on ONE sheet, MEASURED: the last thing in the flow of a sheet ends above the line at its
    // foot (the address on the cover, the footer of a lesson). The cover is set tighter first where it needs it.
    const runsOver = () => page.evaluate(() => [...document.querySelectorAll('section.page')].map((sec, i) => {
      // the cover: its table ends above the address line. A lesson sheet and the class record: nothing in the flow
      // ends below the sheet (the box for the teacher's own notes stretches to the foot by design, so the sheet's
      // own scroll height is the measure there).
      const where = sec.querySelector(':scope > .where');
      if (where) { const limit = where.getBoundingClientRect().top; const end = Math.max(...[...sec.children].filter((c) => c !== where).map((c) => c.getBoundingClientRect().bottom)); return end > limit + 0.5 ? { sheet: i + 1, by: Math.round(end - limit) } : null; }
      return sec.scrollHeight > sec.clientHeight + 1 ? { sheet: i + 1, by: sec.scrollHeight - sec.clientHeight } : null;
    }).filter(Boolean));
    let over = await runsOver();
    if (over.some((o) => o.sheet === 1)) { await page.evaluate(() => document.querySelector('section.cover').classList.add('tight')); over = await runsOver(); }
    for (const cls of ['tight', 'nomine']) {
      const sheets = over.filter((o) => o.sheet > 1).map((o) => o.sheet);
      if (!sheets.length) break;
      await page.evaluate((list, c) => { const all = [...document.querySelectorAll('section.page')]; for (const n of list) if (all[n - 1].classList.contains('lesson')) all[n - 1].classList.add(c); }, sheets, cls);
      over = await runsOver();
    }
    if (over.length) { console.log('FAIL  ' + unit.id + ': ' + over.map((o) => 'sheet ' + o.sheet + ' runs ' + o.by + ' px past its foot').join('; ')); process.exitCode = 1; await page.close(); continue; }
    const dir = path.join(REPO, 'out', 'teacher-files', loc, 'units', unit.id);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'teacher-guide.pdf');
    const buf = await page.pdf({ path: file, format: PAPER, printBackground: true, preferCSSPageSize: true });
    const pages = (Buffer.from(buf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    const want = unit.lessons.length + 2;
    console.log((pages === want ? 'ok    ' : 'FAIL  ') + unit.id + ': ' + pages + ' pages (' + want + ' expected: cover, ' + unit.lessons.length + ' lessons, class record), ' + Math.round(buf.length / 1024) + ' KB → ' + path.relative(REPO, file));
    if (pages !== want) process.exitCode = 1;
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
