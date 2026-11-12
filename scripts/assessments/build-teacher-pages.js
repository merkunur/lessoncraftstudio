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
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const PAPER = loc === 'en' || loc === 'es' ? 'Letter' : 'A4';
const HOST = 'www.lessoncraftstudio.com';
const ROWS = 26;                                 // lines of the class record
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
const checks = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'assessments', loc, 'checks.json'), 'utf8')).checks;
const units = new Map(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json'), 'utf8')).units.map((u) => [u.id, u]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));

function html(c) {
  const u = units.get(c.unit);
  const lessonOf = (n) => u.lessons.find((l) => l.n === n);
  const total = c.sections.reduce((k, s) => k + s.cards, 0);
  const score = c.sections.map((s) => '<tr><td class="p">' + s.part + '</td><td><b>' + esc(fill(ui.lessonRef, { n: s.lesson })) + '</b> ' + esc(s.lessonTitle) + '</td><td>' + esc(s.typeTitle) + '</td><td class="n">' + s.cards + '</td></tr>').join('')
    + '<tr class="sum"><td></td><td><b>' + esc(ui.tpTotal) + '</b></td><td></td><td class="n">' + total + '</td></tr>';
  // the class record: one pair of narrow columns (A, B) per part, then the totals
  const head = '<tr><th class="name" rowspan="2">' + esc(ui.tpColName) + '</th>' + c.sections.map((s) => '<th colspan="2">' + s.part + '<small> /' + s.cards + '</small></th>').join('') + '<th colspan="2">' + esc(ui.tpTotal) + '<small> /' + total + '</small></th></tr>'
    + '<tr>' + c.sections.map(() => '<th class="ab">A</th><th class="ab">B</th>').join('') + '<th class="ab">A</th><th class="ab">B</th></tr>';
  const line = '<tr><td class="name"></td>' + c.sections.map(() => '<td></td><td class="b"></td>').join('') + '<td></td><td class="b"></td></tr>';
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
    + '<section><h2>' + esc(ui.tpHowTitle) + '</h2><ul class="how"><li>' + [ui.tpHow1, ui.tpHow2, ui.tpHow3].map(esc).join('</li><li>') + '</li></ul><p class="honest">' + esc(ui.tpHonest) + '</p></section>'
    + '<section><h2>' + esc(ui.tpScoreTitle) + '</h2><table class="score"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpColLesson) + '</th><th>' + esc(ui.tpColFrom) + '</th><th class="n">' + esc(ui.tpColPoints) + '</th></tr></thead><tbody>' + score + '</tbody></table>' + left + '</section>'
    + '<section class="newpage"><h2>' + esc(ui.tpNextTitle) + '</h2><p class="lead">' + esc(ui.tpNextLead) + '</p><table class="next"><thead><tr><th>' + esc(ui.tpColPart) + '</th><th>' + esc(ui.tpColLesson) + '</th><th>' + esc(ui.tpColStill) + '</th><th>' + esc(ui.tpColEasy) + '</th><th>' + esc(ui.tpColScreen) + '</th></tr></thead><tbody>' + next + '</tbody></table>'
    + '<p class="where">' + esc(HOST + '/' + loc + '/units/' + c.slug) + '</p></section>'
    + '<section class="newpage"><h2>' + esc(ui.tpGridTitle) + '</h2><p class="lead">' + esc(ui.tpGridLead) + '</p><table class="grid"><thead>' + head + '</thead><tbody>' + Array.from({ length: ROWS }, () => line).join('') + '</tbody></table></section>'
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
.grid { margin-top: 3mm; table-layout: fixed; }
.grid th { text-align: center; padding: 0 0 1mm; border-bottom: 0; font-size: 9pt; letter-spacing: 0; }
.grid th small { font-weight: 600; color: #46625b; }
.grid th.name { text-align: left; width: 46mm; vertical-align: bottom; }
.grid th.ab { font-size: 8pt; border-bottom: 1.5pt solid #14332d; }
.grid td { height: 7.6mm; border: 0.5pt solid #8fa39e; }
.grid td.name { border-left: 0; }
.grid td.b { border-right: 1.2pt solid #14332d; }
`;

(async () => {
  if (!checks.length) { console.log(loc + ': no check'); return; }
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const c of checks) {
    const page = await browser.newPage();
    await page.setContent(html(c), { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const dir = path.join(REPO, 'out', 'teacher-files', loc, 'checks', c.unit);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'teacher-pages.pdf');
    const buf = await page.pdf({ path: file, format: PAPER, printBackground: true, preferCSSPageSize: true });
    const pages = (Buffer.from(buf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    const ok = pages === 3;                                   // how to use + points · what next · class record
    console.log((ok ? 'ok    ' : 'FAIL  ') + c.unit + ': ' + pages + ' page(s) → ' + path.relative(REPO, file));
    if (!ok) process.exitCode = 1;
    const shot = arg('shot', '');
    if (shot) { await page.setViewport({ width: PAPER === 'Letter' ? 816 : 794, height: 1056 }); await page.emulateMediaType('print'); await page.screenshot({ path: path.join(shot, c.unit + '-teacher.png'), fullPage: true }); }
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
