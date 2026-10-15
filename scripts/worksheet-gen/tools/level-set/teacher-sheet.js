#!/usr/bin/env node
/**
 * teacher-sheet.js — render the per-set TEACHER SHEET (Level Sets v2 phase 2, 2026-10-15).
 *
 * One page per face ladder, in the worksheet-gen page shell (title bar · instruction line · attribution
 * footer; en letter, others A4), with:
 *   1. THE SET — one row per rung present: ① <level word> · N pages (▶ "on screen" when the rung has screens)
 *   2. PLACING THE CHILDREN — the printed rule: start on the core page; most right → the harder page next;
 *      several wrong → the easier page, then back; tick the level reached + the date.
 *      (The set's OWN pages are the check — no new items; operator decision 2026-10-15.)
 *   3. THE CLASS GRID — Name | one column per rung (checkbox + date line) | Notes; rows sized to FILL the body.
 *
 * Input: ladders-<locale>.json from tools/level-set/export-ladders.js (run on Hetzner; the same ladder model
 * as the deck strip and the set page). Output: out/teacher-sheets/<locale>/<code>-teacher-sheet.pdf (+ .png).
 * RUNS ON THE PC (puppeteer; no Chrome on Hetzner). Strings: frontend/messages/<locale>.json `levelSetSheet.*`
 * + `levelSets.core` / `levelSets.pages` / `levelSets.interactiveCount` + the taxonomy level words.
 *
 * QA per sheet (fail = no PDF): shell lints (qa/lints.js: footer overlap, page box), body fill ≥ 0.55 and no
 * empty band > 0.20 (lib/page-fill.js), the title on ≤ 2 lines (else the title font steps down), no text
 * outside the page. `--check` renders without writing PDFs and reports.
 *
 * Usage:
 *   node scripts/worksheet-gen/tools/level-set/teacher-sheet.js --ladders=<dir> [--locales=all|en,de]
 *        [--codes=k243,g1245] [--limit=N] [--out=<dir>] [--check] [--lanes=N]
 */
'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { buildPage, CHROME } = require('../../page/shell.js');
const { runLints } = require('../../qa/lints.js');
const { pageFill } = require('../../lib/page-fill.js');

const WG = path.resolve(__dirname, '..', '..');
const ROOT = path.resolve(WG, '..', '..');
const MESSAGES_DIR = path.join(ROOT, 'frontend', 'messages');
const TAXONOMY = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const RUNGS = ['easy', 'core', 'hard'];

const argv = process.argv.slice(2);
const arg = (k) => { const a = argv.find((x) => x.startsWith(k + '=')); return a ? a.slice(k.length + 1) : null; };
const LADDERS_DIR = arg('--ladders') || path.join(WG, 'out', 'ladders');
const OUT_DIR = arg('--out') || path.join(WG, 'out', 'teacher-sheets');
const CHECK = argv.includes('--check');
const LIMIT = Number(arg('--limit') || Infinity);
const CODES = arg('--codes') ? new Set(arg('--codes').split(',')) : null;
const locArg = arg('--locales') || 'all';
const locales = locArg === 'all' ? LOCALES : locArg.split(',').map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------------------
// strings
// ---------------------------------------------------------------------------
const _msgs = new Map();
function msgs(locale) {
  if (!_msgs.has(locale)) _msgs.set(locale, JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, locale + '.json'), 'utf8')));
  return _msgs.get(locale);
}
/** Minimal ICU: `{count, plural, one {…} other {…}}` with `#`; plain `{n}` fill. */
function icu(str, vars) {
  let s = String(str).replace(/\{(\w+),\s*plural,\s*one\s*\{([^}]*)\}\s*other\s*\{([^}]*)\}\}/g, (m, k, one, other) => {
    const n = Number(vars[k]);
    return (n === 1 ? one : other).replace(/#/g, String(n));
  });
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function rungWord(rung, locale) {
  if (rung === 'core') return msgs(locale).levelSets.core;
  const e = TAXONOMY.axes['exercise-mode'][rung];
  return (e && e.name && (e.name[locale] || e.name.en)) || rung;
}
function typeName(type, locale) {
  const e = TAXONOMY.axes['exercise-type'][type];
  return (e && e.name && (e.name[locale] || e.name.en)) || type;
}
/** Landing level SLUG → the locale's level name without its "(ages …)" parenthetical. */
function levelName(levelSlug, locale) {
  if (!levelSlug) return null;
  const ax = TAXONOMY.axes['educational-level'];
  for (const k of Object.keys(ax)) {
    const e = ax[k];
    if (e.slug && e.slug[locale] === levelSlug) return String((e.name && (e.name[locale] || e.name.en)) || k).replace(/\s*\(.*\)\s*$/, '');
  }
  return null;
}

// ---------------------------------------------------------------------------
// the sheet body
// ---------------------------------------------------------------------------
const CSS = `
.ts { display:flex; flex-direction:column; gap:14px; flex:1 1 auto; min-height:0; font-family:'Nunito',sans-serif; color:#3A3530; }
.ts h2 { font-family:'Baloo 2',cursive; font-weight:700; font-size:17px; color:#146B5E; margin:0 0 6px; }
.ts-set { display:flex; flex-wrap:wrap; gap:8px; }
.ts-rung { display:inline-flex; align-items:center; gap:8px; min-height:34px; padding:0 14px 0 5px; border:2px solid #146B5E; border-radius:999px; font-weight:700; font-size:14px; color:#146B5E; background:#FFF; }
.ts-rung b { display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; background:#146B5E; color:#FBF3E4; font-size:13px; }
.ts-rung i { font-style:normal; font-weight:600; color:#6B6358; }
.ts-rung .scr { font-size:12px; color:#9A4521; font-weight:700; }
.ts-rule { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:5px; font-size:13.5px; line-height:1.35; }
.ts-rule li { display:flex; gap:10px; align-items:flex-start; }
.ts-rule li b { flex:0 0 22px; width:22px; height:22px; display:inline-grid; place-items:center; border-radius:50%; background:#F2784B; color:#FFF; font-size:12px; margin-top:1px; }
.ts-grid { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
.ts-grid table { width:100%; border-collapse:collapse; table-layout:fixed; font-size:13px; }
.ts-grid th { text-align:left; font-size:12px; color:#146B5E; border-bottom:2px solid #146B5E; padding:0 6px 5px; vertical-align:bottom; }
.ts-grid th .lv { display:inline-flex; align-items:center; gap:5px; }
.ts-grid th .lv b { display:inline-grid; place-items:center; width:18px; height:18px; border-radius:50%; background:#146B5E; color:#FBF3E4; font-size:11px; }
.ts-grid td { border-bottom:1px solid #D8CFC0; padding:0 6px; height:var(--row); vertical-align:middle; }
.ts-grid td.num { width:26px; color:#8A8276; font-size:11px; text-align:right; padding-right:4px; }
.ts-grid td.lv { width:112px; }
.ts-grid td.lv span { display:inline-flex; align-items:center; gap:6px; }
.ts-grid td.lv span::before { content:''; width:16px; height:16px; border:2px solid #146B5E; border-radius:4px; flex:0 0 auto; }
.ts-grid td.lv span::after { content:''; flex:1 1 auto; width:60px; border-bottom:1.5px solid #C8BFAE; margin-bottom:-4px; }
.ts-grid td.notes { width:150px; }
`;

function sheetBody(l, locale, rows) {
  const t = msgs(locale).levelSetSheet;
  const ls = msgs(locale).levelSets;
  const chrome = CHROME[locale] || CHROME.en;
  const present = RUNGS.filter((r) => l.rungs[r] > 0);
  const screens = (r) => (l.pages && l.pages[r] ? l.pages[r].filter((p) => p.interactive).length : 0);

  const setRows = present.map((r, i) =>
    `<span class="ts-rung"><b>${i + 1}</b>${esc(rungWord(r, locale))} <i>· ${esc(icu(ls.pages, { count: l.rungs[r] }))}</i>` +
    (screens(r) ? ` <span class="scr">▶</span>` : '') + `</span>`).join('');

  // the rule needs a core level to start on (the filter in main() guarantees it) and names only the
  // levels the set has; the "otherwise" branch (another core page) is always true — every rung has copies
  const rule = [t.placementStart];
  if (l.rungs.hard > 0) rule.push(t.placementUp);
  rule.push(t.placementSame);
  if (l.rungs.easy > 0) rule.push(t.placementDown);
  rule.push(t.placementRecord);
  const ruleHtml = rule.map((s, i) => `<li><b>${i + 1}</b><span>${esc(s)}</span></li>`).join('');

  // table-layout:fixed takes column widths from the FIRST row — the header — so the widths sit on the <th>s
  const head = `<th class="num" style="width:28px"></th><th style="text-align:left">${esc(chrome.name)}</th>` +
    present.map((r, i) => `<th class="lv" style="width:112px;text-align:left"><span class="lv"><b>${i + 1}</b>${esc(rungWord(r, locale))}</span></th>`).join('') +
    `<th class="notes" style="width:150px;text-align:left">${esc(t.notes)}</th>`;
  let body = '';
  for (let i = 0; i < rows; i++) {
    body += `<tr><td class="num">${i + 1}</td><td></td>` + present.map(() => `<td class="lv"><span></span></td>`).join('') + `<td class="notes"></td></tr>`;
  }
  const screenNote = l.interactiveCount ? `<p style="font-size:12px;color:#6B6358;margin-top:4px">▶ ${esc(icu(ls.interactiveCount, { count: l.interactiveCount }))}</p>` : '';

  // data-lcs-frame / data-lcs-table / data-ws-content: what the shared page-fill and blank-page gates COUNT
  // (lib/page-fill.js, qa/lints.js) — a sheet is sections and a table, not cards and pictures.
  return `<style>${CSS}</style><div class="ts" data-lcs-sheet data-ws-content>
  <section data-lcs-frame><h2>${esc(t.setHeading)}</h2><div class="ts-set">${setRows}</div>${screenNote}</section>
  <section data-lcs-frame><h2>${esc(t.placementHeading)}</h2><ul class="ts-rule">${ruleHtml}</ul></section>
  <section class="ts-grid"><table data-lcs-table style="--row:${rows > 18 ? 26 : 29}px"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></section>
</div>`;
}

/** A landing h1 can be a whole sentence; its first clause (before ": " / " – " / " — ") is the set's name. */
function firstClause(title) {
  const m = /^(.+?)(?:\s*[:–—]\s+|\s+-\s+)(.+)$/.exec(title);
  return m && m[1].length >= 8 ? m[1] : title;
}

function sheetHtml(l, locale, rows, titleSize, shortTitle) {
  const t = msgs(locale).levelSetSheet;
  const parts = [t.teacherCopy, typeName(l.type, locale), levelName(l.level, locale)].filter(Boolean);
  const html = buildPage({
    title: `${shortTitle ? firstClause(l.title) : l.title} — ${t.titleSuffix}`,
    instruction: parts.join(' · '),
    bodyHtml: sheetBody(l, locale, rows),
    locale,
    pageSize: locale === 'en' ? 'letter' : 'a4',
  });
  return titleSize ? html.replace('</head>', `<style>.ws-title{font-size:${titleSize}px}</style></head>`) : html;
}

// ---------------------------------------------------------------------------
// render
// ---------------------------------------------------------------------------
async function measure(page) {
  return page.evaluate(() => {
    const pg = document.querySelector('[data-lcs-page]');
    const title = document.querySelector('.ws-title');
    const grid = document.querySelector('.ts-grid table');
    const foot = document.querySelector('.ws-foot');   // the attribution band the shared lint measures against
    const pr = pg.getBoundingClientRect();
    const tr = title.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const rowH = grid.querySelector('tbody tr').getBoundingClientRect().height;
    const lh = parseFloat(getComputedStyle(title).lineHeight) || parseFloat(getComputedStyle(title).fontSize) * 1.1;
    const footTop = foot ? foot.getBoundingClientRect().top : pr.bottom - 36;
    return { titleLines: Math.round(tr.height / lh), gridBottom: gr.bottom, footTop, rowH, pageBottom: pr.bottom };
  });
}

async function renderOne(page, l, locale, outDir) {
  const base = path.join(outDir, `${l.code}-teacher-sheet`);
  const htmlPath = base + '.html';
  let titleSize = null;
  let shortTitle = false;
  let rows = 24;
  const fails = [];
  const render = async () => {
    fs.writeFileSync(htmlPath, sheetHtml(l, locale, rows, titleSize, shortTitle), 'utf8');
    await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    return measure(page);
  };
  // 1. the title: step the size down until it holds on ≤ 2 lines (30 → 24 → 20 px); a landing h1 can be a
  //    whole sentence (111 chars measured), so ≤ 3 lines at 20 px or ≤ 3 at 18 px is accepted — the bar grows
  //    and the grid takes fewer rows (measured below, never guessed)
  let m = await render();
  for (const size of [24, 20]) { if (m.titleLines <= 2) break; titleSize = size; m = await render(); }
  if (m.titleLines > 3) { titleSize = 18; m = await render(); }
  // still a sentence: keep the set's NAME (first clause) at 24 px — the full h1 stays on the set page
  if (m.titleLines > 3 && firstClause(l.title) !== l.title) { shortTitle = true; titleSize = 24; m = await render(); }
  // 2. the grid: fit the row count to the body (re-rendered after EVERY change, up to 5 passes)
  for (let pass = 0; pass < 5; pass++) {
    const spare = (m.footTop - 10) - m.gridBottom;   // positive = room left, negative = overflow
    const delta = spare < 0 ? -Math.ceil(-spare / m.rowH) : Math.floor(spare / m.rowH);
    if (delta === 0) break;
    rows = Math.max(8, rows + delta);
    m = await render();
  }
  if (m.gridBottom > m.footTop - 4) fails.push(`grid overflows the footer by ${Math.round(m.gridBottom - m.footTop)}px`);
  if (m.titleLines > 3) fails.push(`title wraps to ${m.titleLines} lines`);
  const fill = await page.evaluate(pageFill);
  if (fill.fails && fill.fails.length) fails.push(...fill.fails.map((f) => 'page-fill: ' + f));
  const lints = await runLints(page, { gradeBand: null });
  if (lints && lints.length) fails.push(...lints.map((x) => 'lint: ' + (typeof x === 'string' ? x : JSON.stringify(x))));
  if (fails.length) { fs.unlinkSync(htmlPath); return { ok: false, fails, rows }; }
  if (!CHECK) {
    await page.pdf({ path: base + '.pdf', printBackground: true, preferCSSPageSize: true });
    const el = await page.$('[data-lcs-page]');
    await el.screenshot({ path: base + '.png' });
  }
  fs.unlinkSync(htmlPath);
  return { ok: true, rows, titleSize };
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  let bad = 0;
  for (const locale of locales) {
    const file = path.join(LADDERS_DIR, `ladders-${locale}.json`);
    if (!fs.existsSync(file)) { console.log(`${locale}: no ${file}`); bad++; continue; }
    let ladders = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (CODES) ladders = ladders.filter((l) => CODES.has(l.code));
    // a placement rule needs at least two levels — single-rung sets (copies of one level only) get no sheet
    // … and the rule starts on the core page, so the core rung must exist (measured true for every ≥2-rung set)
    ladders = ladders.filter((l) => l.rungs.core > 0 && RUNGS.filter((r) => l.rungs[r] > 0).length >= 2).slice(0, LIMIT);
    const outDir = path.join(OUT_DIR, locale);
    fs.mkdirSync(outDir, { recursive: true });
    let ok = 0, failed = 0, rowsMin = Infinity, rowsMax = 0;
    for (const l of ladders) {
      const r = await renderOne(page, l, locale, outDir);
      if (r.ok) { ok++; rowsMin = Math.min(rowsMin, r.rows); rowsMax = Math.max(rowsMax, r.rows); }
      else { failed++; console.log(`  FAIL ${locale} ${l.code} (${l.title}): ${r.fails.join('; ')}`); }
    }
    console.log(`${locale}: ${ok} sheets${CHECK ? ' checked' : ''}, ${failed} failed, rows ${rowsMin}–${rowsMax}`);
    if (failed) bad++;
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
