#!/usr/bin/env node
/**
 * Builds a sub pack's GUEST TEACHER PAGES as a PDF (Daily Teaching System, Parts 3 and 5): a Teacher-only file.
 *
 * Generated from the same data as the pack's page (frontend/content/sub-plans/packs.<loc>.json and ui.<loc>.json):
 * the note for the guest teacher with the day at a glance, the script of every block, the form "How the day went"
 * and the class information sheets the class teacher fills in once. The worksheets themselves are not in this file:
 * the pack's page joins them to it in the teacher's browser.
 *
 *   node scripts/sub-plans/build-pack.js --loc=en [--pack=<id>]
 *     → out/teacher-files/<loc>/sub-plans/<id>/guest-teacher-pages.pdf
 *
 * Paper: US Letter for en and es, A4 for the other languages.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const only = arg('pack', '');
const S = path.join(REPO, 'frontend', 'content', 'sub-plans');
const packs = JSON.parse(fs.readFileSync(path.join(S, 'packs.' + loc + '.json'), 'utf8')).packs.filter((p) => !only || p.id === only);
const ui = JSON.parse(fs.readFileSync(path.join(S, 'ui.' + loc + '.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', loc + '.json'), 'utf8'));
const LEVEL_KEY = { P: 'preschool', K: 'kindergarten', 1: 'grade_1', 2: 'grade_2', 3: 'grade_3', 4: 'grade_4', 5: 'grade_5' };
const PAPER = loc === 'en' || loc === 'es' ? 'Letter' : 'A4';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
const lines = (n) => '<div class="lines">' + '<i></i>'.repeat(n) + '</div>';

function html(pack) {
  const grade = messages.seo.educational_level[LEVEL_KEY[pack.grade]] || pack.grade;
  const day = pack.blocks.map((b, i) => '<tr><td class="n">' + (i + 1) + '</td><td><b>' + esc(ui['block_' + b.key]) + '</b></td><td>' + esc(b.title) + '</td><td class="m">' + esc(fill(ui.minutes, { n: b.minutes })) + '</td><td class="box"></td></tr>').join('');
  const li = (keys) => '<ul>' + keys.map((k) => '<li>' + esc(ui[k]) + '</li>').join('') + '</ul>';
  const note = '<section class="sheet"><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc([grade, ui.packWord].join(' · ')) + '</p><h1>' + esc(ui.pdfTitle) + '</h1><p class="hello">' + esc(ui.pdfHello) + '</p><p class="intro">' + esc(ui.pdfIntro) + '</p>'
    + '<div class="two"><div><h3>' + esc(ui.pdfBeforeTitle) + '</h3>' + li(['pdfBefore1', 'pdfBefore2', 'pdfBefore3', 'pdfBefore4', 'pdfBefore5']) + '</div><div><h3>' + esc(ui.pdfAnyTitle) + '</h3>' + li(['pdfAny1', 'pdfAny2', 'pdfAny3', 'pdfAny4']) + '</div></div>'
    + '<h2>' + esc(ui.dayTitle) + '</h2><table class="day"><thead><tr><th></th><th>' + esc(ui.dayColBlock) + '</th><th>' + esc(ui.dayColPage) + '</th><th class="m">' + esc(ui.dayColTime) + '</th><th></th></tr></thead><tbody>' + day + '</tbody></table></section>';
  // first what to do with the class between the blocks (nothing on this list needs a copy or a screen), then the blocks
  const blocks = '<section class="flow"><article class="block fill"><header><h3>' + esc(ui.pdfFillTitle) + '</h3></header>' + li(['pdfFill1', 'pdfFill2', 'pdfFill3', 'pdfFill4', 'pdfFill5']) + '</article><h2 class="top">' + esc(ui.pdfScriptTitle) + '</h2>' + pack.blocks.map((b, i) => '<article class="block"><header><span class="n">' + (i + 1) + '</span><h3>' + esc(ui['block_' + b.key]) + '</h3><span class="m">' + esc(fill(ui.minutes, { n: b.minutes })) + '</span></header>'
    + '<dl><dt>' + esc(ui.pdfHandOut) + '</dt><dd>' + esc(fill(b.hard && b.easy ? ui.pdfHandOutText : b.easy ? ui.pdfHandOutTextEasy : b.hard ? ui.pdfHandOutTextHard : ui.pdfHandOutTextPlain, { title: b.title })) + '</dd>'
    + '<dt>' + esc(ui.pdfSay) + '</dt><dd class="say">' + (b.key === 'morning' ? esc(ui.pdfMorningSay) + ' ' : '') + esc(b.script.say) + '</dd>'
    + '<dt>' + esc(ui.pdfFirst) + '</dt><dd>' + esc(b.script.first) + (b.key === 'morning' ? ' ' + esc(ui.pdfMorningDo) : '') + '</dd>'
    + '<dt>' + esc(ui.pdfStuck) + '</dt><dd>' + esc(b.script.stuck) + '</dd>' + (b.key === 'closing' ? '<dt>' + esc(ui.pdfBellTitle) + '</dt><dd class="bell">' + esc(ui.pdfBell) + '</dd>' : '') + '</dl></article>').join('') + '</section>';
  const field = (k, n) => '<div class="field"><h3>' + esc(ui[k]) + '</h3>' + lines(n) + '</div>';
  const report = '<section class="sheet"><h1 class="small">' + esc(ui.pdfReportTitle) + '</h1><p class="intro">' + esc(ui.pdfReportLead) + '</p>' + field('pdfReportDone', 3) + field('pdfReportNot', 2) + field('pdfReportHelp', 4) + field('pdfReportGood', 2) + field('pdfReportAbsent', 2) + field('pdfReportNotes', 4) + field('pdfReportSign', 1) + '</section>';
  const sheet = (fields, lead) => '<section class="sheet"><h1 class="small">' + esc(ui.pdfClassTitle) + '</h1>' + (lead ? '<p class="intro">' + esc(ui.pdfClassLead) + '</p>' : '') + fields.map(([k, n]) => field(k, n)).join('') + '</section>';
  const klass = sheet([['pdfClassTeacher', 1], ['pdfClassList', 1], ['pdfClassAttendance', 2], ['pdfClassSchedule', 5], ['pdfClassRoutines', 3], ['pdfClassBehavior', 4]], true)
    + sheet([['pdfClassEasier', 4], ['pdfClassPullouts', 4], ['pdfClassExtra', 4], ['pdfClassHelpers', 3], ['pdfClassNeeds', 4]])
    + sheet([['pdfClassDismissal', 10], ['pdfClassPickup', 3], ['pdfClassEmergency', 5]]);
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(pack.title + ' — ' + ui.pdfFooter) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + '</style></head><body>' + note + blocks + report + klass + '</body></html>';
}

const CSS = `
@page { size: ${PAPER}; margin: 14mm 15mm 16mm 15mm; }
* { box-sizing: border-box; }
html { font-family: Nunito, system-ui, sans-serif; color: #14332d; font-size: 11.5pt; line-height: 1.45; }
body { margin: 0; }
h1, h2, h3, .brand, .n { font-family: 'Baloo 2', system-ui, sans-serif; line-height: 1.15; margin: 0; }
p, ul, dl, dd { margin: 0; padding: 0; }
.sheet { break-after: page; }
.sheet:last-child { break-after: auto; }
.flow { break-after: page; }
.brand { font-size: 12pt; color: #146b5e; font-weight: 700; }
.eyebrow { margin-top: 4mm; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #146b5e; font-size: 10pt; }
h1 { font-size: 24pt; margin-top: 1mm; }
h1.small { font-size: 22pt; margin-top: 0; }
.hello { margin-top: 2.5mm; font-size: 13pt; font-weight: 700; }
.intro { margin-top: 1.5mm; max-width: 175mm; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; margin-top: 4mm; font-size: 9.8pt; line-height: 1.35; }
h3 { font-size: 12.5pt; }
ul { list-style: none; margin-top: 1.5mm; }
li { padding: 0.8mm 0 0.8mm 4.5mm; position: relative; }
li::before { content: ''; position: absolute; left: 0; top: 2.4mm; width: 2mm; height: 2mm; border-radius: 50%; background: #146b5e; }
h2 { font-size: 15pt; margin-top: 5mm; }
h2.top { margin-top: 0; font-size: 22pt; }
table { border-collapse: collapse; width: 100%; margin-top: 2mm; font-size: 10.5pt; }
.day th { text-align: left; font-size: 8.5pt; letter-spacing: 0.05em; text-transform: uppercase; color: #46625b; padding: 0 3mm 1.5mm 0; border-bottom: 1.5pt solid #14332d; }
.day td { padding: 1.6mm 3mm 1.6mm 0; border-bottom: 0.5pt solid #b9c7c3; vertical-align: top; }
.day td.n { font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #146b5e; width: 8mm; }
.day .m { white-space: nowrap; text-align: right; }
.day td.box { width: 9mm; }
.day td.box::after { content: ''; display: block; width: 4.2mm; height: 4.2mm; margin-left: auto; border: 0.8pt solid #14332d; border-radius: 0.6mm; }
.block { break-inside: avoid; margin-top: 4.5mm; border: 0.6pt solid #8fa39e; border-radius: 3mm; padding: 3.2mm 4.5mm 3.6mm; font-size: 10.4pt; line-height: 1.38; }
.block header { display: flex; align-items: center; gap: 3mm; }
.block .n { width: 8mm; height: 8mm; border-radius: 50%; background: #146b5e; color: #fff; font-weight: 700; display: grid; place-items: center; font-size: 11pt; }
.block h3 { font-size: 15pt; flex: 1; }
.block .m { font-weight: 700; }
dt { margin-top: 2mm; font-weight: 700; font-size: 8.5pt; letter-spacing: 0.05em; text-transform: uppercase; color: #46625b; }
dd.bell { border: 0.8pt solid #14332d; border-radius: 2mm; padding: 1.6mm 3mm; margin-top: 0.8mm; font-weight: 600; }
dd.say { font-size: 11.2pt; font-weight: 600; background: #fff3c9; border-left: 1.6mm solid #f2cf5b; padding: 1.6mm 3mm; margin-top: 0.8mm; }
.field { margin-top: 6mm; break-inside: avoid; }
.lines i { display: block; height: 8.6mm; border-bottom: 0.5pt solid #8fa39e; }
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const pack of packs) {
    const page = await browser.newPage();
    await page.setContent(html(pack), { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const dir = path.join(REPO, 'out', 'teacher-files', loc, 'sub-plans', pack.id);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'guest-teacher-pages.pdf');
    const foot = '<div style="width:100%;font-family:Nunito,Arial,sans-serif;font-size:7.5pt;color:#46625b;padding:0 15mm;display:flex;justify-content:space-between"><span>' + esc(pack.title) + ' · ' + esc(ui.pdfFooter) + '</span><span class="pageNumber"></span></div>';
    const buf = await page.pdf({ path: file, format: PAPER, printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: foot });
    const pages = (Buffer.from(buf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    // the note, the report and the three class sheets are one sheet each; the scripts take as many as they need
    const ok = pages >= 6 && pages <= 5 + Math.ceil(pack.blocks.length / 2) + 1;
    console.log((ok ? 'ok    ' : 'FAIL  ') + pack.id + ': ' + pages + ' pages, ' + Math.round(buf.length / 1024) + ' KB → ' + path.relative(REPO, file));
    if (!ok) process.exitCode = 1;
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
