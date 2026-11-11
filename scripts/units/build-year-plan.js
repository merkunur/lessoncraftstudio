#!/usr/bin/env node
/**
 * Builds the PRINTABLE YEAR PLAN (scope and sequence) of every plan of a language as a PDF (Daily Teaching System,
 * Part 4.4): a Teacher-only file.
 *
 * Generated from the same data as the plan's page (frontend/content/units/units.<loc>.json `plans` and
 * ui.<loc>.json): the units in teaching order with their weeks, lessons and standards, a column for the teacher's own
 * dates and a box to check when a unit is taught. No sentence in it is written for the PDF alone.
 *
 *   node scripts/units/build-year-plan.js --loc=en [--plan=<id>]
 *     → out/teacher-files/<loc>/units/<plan id>/scope-and-sequence.pdf   (uploaded by scripts/units/upload-teacher-files.sh;
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
const only = arg('plan', '');
const U = path.join(REPO, 'frontend', 'content', 'units');
const plans = (JSON.parse(fs.readFileSync(path.join(U, 'units.' + loc + '.json'), 'utf8')).plans || []).filter((p) => !only || p.id === only);
const ui = JSON.parse(fs.readFileSync(path.join(U, 'ui.' + loc + '.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', loc + '.json'), 'utf8'));
const LEVEL_KEY = { P: 'preschool', K: 'kindergarten', 1: 'grade_1', 2: 'grade_2', 3: 'grade_3', 4: 'grade_4', 5: 'grade_5' };
const PAPER = loc === 'en' || loc === 'es' ? 'Letter' : 'A4';
const HOST = 'https://www.lessoncraftstudio.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));

function html(plan) {
  const grade = messages.seo.educational_level[LEVEL_KEY[plan.grade]] || plan.grade;
  const subject = ui['subject_' + plan.subject] || plan.subject;
  const lessons = plan.units.reduce((n, r) => n + r.lessons.length, 0);
  const weeksOf = (r) => (r.from === r.to ? fill(ui.planWeekOne, { n: r.from }) : fill(ui.planWeeksRange, { from: r.from, to: r.to }));
  // the standards column is printed only when a unit of the plan names a standard (a framework without codes names
  // none in a plan row: an empty column under a heading reads as something left out)
  const withStandards = plan.units.some((r) => r.standards.length);
  const rows = plan.units.map((r, i) => '<tr><td class="w">' + esc(weeksOf(r)) + '</td>'
    + '<td class="u"><b>' + (i + 1) + '. ' + esc(r.title) + '</b><ol>' + r.lessons.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ol></td>'
    + (withStandards ? '<td class="s">' + esc(r.standards.join(', ')) + '</td>' : '') + '<td class="d"></td><td class="t"><i></i></td></tr>').join('');
  return '<!doctype html><html lang="' + loc + '"><head><meta charset="utf-8"><title>' + esc(plan.title) + '</title>'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>' + CSS + '</style></head><body>'
    + '<header><p class="brand">LessonCraftStudio</p><p class="eyebrow">' + esc([grade, subject, ui.planEyebrow].join(' · ')) + '</p><h1>' + esc(plan.title) + '</h1>'
    + '<p class="lead">' + esc(fill(ui.planLead, { units: plan.units.length, lessons, weeks: plan.weeks })) + ' ' + esc(ui.planHonest) + '</p></header>'
    + '<table><thead><tr><th>' + esc(ui.planColWeeks) + '</th><th>' + esc(ui.planColUnit) + ' · ' + esc(ui.planColLessons) + '</th>' + (withStandards ? '<th>' + esc([ui.planColStandards, plan.framework].filter(Boolean).join(', ')) + '</th>' : '') + '<th>' + esc(ui.planPdfColDates) + '</th><th>' + esc(ui.planPdfColDone) + '</th></tr></thead><tbody>' + rows + '</tbody></table>'
    + '<p class="where">' + esc(HOST.replace('https://', '') + '/' + loc + '/units/' + plan.slug) + '</p></body></html>';
}

const CSS = `
@page { size: ${PAPER}; margin: 14mm 15mm 14mm 15mm; }
* { box-sizing: border-box; }
html { font-family: Nunito, system-ui, sans-serif; color: #14332d; font-size: 10.5pt; line-height: 1.4; }
body { margin: 0; }
h1, .brand { font-family: 'Baloo 2', system-ui, sans-serif; line-height: 1.15; margin: 0; }
p, ol { margin: 0; }
.brand { font-size: 12pt; color: #146b5e; font-weight: 700; }
.eyebrow { margin-top: 5mm; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #146b5e; font-size: 9.5pt; }
h1 { font-size: 25pt; margin-top: 1.5mm; }
.lead { margin-top: 2.5mm; max-width: 165mm; }
table { border-collapse: collapse; width: 100%; margin-top: 6mm; }
thead { display: table-header-group; }
th { text-align: left; font-size: 8.5pt; letter-spacing: 0.05em; text-transform: uppercase; color: #46625b; padding: 0 3mm 1.5mm 0; border-bottom: 1.5pt solid #14332d; }
td { padding: 3mm 3mm 3mm 0; border-bottom: 0.5pt solid #8fa39e; vertical-align: top; }
tr { break-inside: avoid; }
td.w { width: 24mm; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #146b5e; white-space: nowrap; }
td.u b { font-family: 'Baloo 2', sans-serif; font-size: 12.5pt; }
td.u ol { margin-top: 1mm; padding-left: 5mm; font-size: 9.5pt; }
td.s { width: 40mm; font-size: 8.5pt; color: #46625b; }
td.d { width: 30mm; border-left: 0.5pt solid #8fa39e; }
td.t { width: 14mm; border-left: 0.5pt solid #8fa39e; padding-left: 4mm; }
td.t i { display: block; width: 6mm; height: 6mm; border: 0.9pt solid #14332d; border-radius: 1mm; }
th:nth-child(4), th:nth-child(5) { padding-left: 2mm; }
.where { margin-top: 5mm; font-size: 9pt; color: #46625b; }
`;

(async () => {
  if (!plans.length) { console.log(loc + ': no year plan'); return; }
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const plan of plans) {
    const page = await browser.newPage();
    await page.setContent(html(plan), { waitUntil: 'networkidle0', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const dir = path.join(REPO, 'out', 'teacher-files', loc, 'units', plan.id);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'scope-and-sequence.pdf');
    const buf = await page.pdf({ path: file, format: PAPER, printBackground: true, preferCSSPageSize: true });
    const pages = (Buffer.from(buf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    // a plan is a table to hang beside the desk: more than three sheets means a row has broken the layout
    const ok = pages >= 1 && pages <= 3;
    console.log((ok ? 'ok    ' : 'FAIL  ') + plan.id + ': ' + pages + ' page(s), ' + Math.round(buf.length / 1024) + ' KB → ' + path.relative(REPO, file));
    if (!ok) process.exitCode = 1;
    // --shot=<folder>: a picture of the sheet as the browser lays it out, to READ the plan (never committed)
    const shot = arg('shot', '');
    if (shot) { await page.setViewport({ width: PAPER === 'Letter' ? 816 : 794, height: 1056 }); await page.emulateMediaType('print'); await page.screenshot({ path: path.join(shot, plan.id + '.png'), fullPage: true }); }
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
