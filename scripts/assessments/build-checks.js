#!/usr/bin/env node
/**
 * Builds the UNIT CHECKS of a language (Daily Teaching System, Part 7.1; design: docs/daily-teaching-system/
 * PART-7-DESIGN.md): per unit two forms (A before the unit, B after it) from one blueprint, and their keys.
 *
 * The blueprint is the unit itself: for each lesson, in order, the cards of the first worksheet type the lesson hands
 * out that is built of cards carrying their answers (lib/cut-cards.js). A section is the cards of one lesson under the
 * worksheet's own instruction line. Form B is the same blueprint with another seed and another picture theme; no
 * card of B asks what a card of A asks. The key is the form's own markup with the answers shown.
 *
 *   node scripts/assessments/build-checks.js --loc=en [--subject=math] [--grades=K,1] [--unit=<id>] [--png]
 *     → out/assessments/<loc>/<unit id>/{check-a,check-b,key-a,key-b}.pdf   (+ page pictures with --png)
 *     → out/assessments/<loc>/checks.json   what was built (read by the next steps: the teacher pages, the unit page)
 *
 * A unit gets a check when at least MIN_SECTIONS of its lessons have such a type; the others are named in checks.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const REPO = path.join(__dirname, '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
const { cutCards } = require('./lib/cut-cards.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const loc = arg('loc', 'en');
const MIN_SECTIONS = 3;
const SECTION_MAX = 330;                      // the cards of a section are at most this tall together
const GAP = 12;                               // between two sections of a page
const THEMES = { A: 'animals', B: 'fruits' };  // the picture theme of a form's themed cards
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : '{' + k + '}'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// the worksheet types by id, and their printed strings in the language
const typeFiles = new Map();
for (const g of fs.readdirSync(path.join(WG, 'types'))) { if (g.startsWith('_')) continue; for (const f of fs.readdirSync(path.join(WG, 'types', g))) { const m = /^((?:K|G\d)-\d{3})/.exec(f); if (m) typeFiles.set(m[1], path.join(WG, 'types', g, f)); } }
const strings = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', 'strings.' + loc + '.json'), 'utf8'));

const STYLE = `<style>
.tc-wrap{display:flex;flex-direction:column;gap:${GAP}px;width:100%}
.tc-instr{display:flex;gap:10px;align-items:center;margin:0 0 8px;font-family:'Nunito',sans-serif;font-weight:700;font-size:15px;line-height:1.25;color:#3A3530}
.tc-part{flex:0 0 auto;min-width:28px;height:28px;padding:0 8px;border-radius:14px;background:#3A3530;color:#fff;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;display:inline-flex;align-items:center;justify-content:center}
.tc-cards{display:grid;gap:14px;justify-content:start}
.tc-key [data-lcs-correct]{outline:3px solid #C9552E;outline-offset:2px;border-radius:8px}
.tc-key .tc-ans{color:#C9552E;font-family:'Baloo 2',cursive;font-weight:800}
</style>`;
const sectionHtml = (s, n) => `<section class="tc-section" data-tc-part="${n}"><p class="tc-instr"><span class="tc-part">${n}</span><span>${esc(s.instruction)}</span></p>` +
  `<div class="tc-cards" style="grid-template-columns:repeat(${s.perRow},${s.w}px);grid-auto-rows:${s.h}px">${s.cards.map((c) => c.html).join('')}</div></section>`;
const pageHtml = (title, sections, first, opts) => buildPage({
  title, instruction: ui.pageInstruction, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4', ...(opts || {}),
  bodyHtml: STYLE + `<div class="tc-wrap${opts && opts.keyLabel ? ' tc-key' : ''}">` + sections.map((s, i) => sectionHtml(s, first + i)).join('') + '</div>',
});
// the key: every answer the cards carry, written where the child writes it
const showAnswers = () => {
  document.querySelectorAll('[data-lcs-answer]').forEach((el) => {
    if ((el.textContent || '').trim()) return;
    el.textContent = el.dataset.lcsAnswer;
    el.classList.add('tc-ans');
    el.style.display = 'inline-flex'; el.style.alignItems = 'center'; el.style.justifyContent = 'center';
    el.style.fontSize = Math.max(14, Math.min(28, Math.floor(el.getBoundingClientRect().height * 0.55))) + 'px';
  });
};

(async () => {
  const unitsFile = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json'), 'utf8'));
  const grades = arg('grades', '') ? arg('grades', '').split(',') : null;
  const subject = arg('subject', '');
  const only = arg('unit', '');
  const units = unitsFile.units.filter((u) => u.status === 'live' && (!only || u.id === only) && (!subject || u.subject === subject) && (!grades || grades.includes(String(u.grade))));
  const outRoot = path.join(REPO, 'out', 'assessments', loc);
  fs.mkdirSync(outRoot, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const built = [];
  const load = async (file, html) => { fs.writeFileSync(file, html, 'utf8'); await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 }); await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready); };

  for (const u of units) {
    const dir = path.join(outRoot, u.id);
    fs.mkdirSync(dir, { recursive: true });
    // ---- the blueprint: one section per lesson that has a type of answer-carrying cards ----
    const sections = { A: [], B: [] }, left = [];
    for (const l of u.lessons) {
      let found = null;
      const why = [];
      for (const p of l.paper || []) {
        const file = typeFiles.get(p.type);
        if (!file || !strings[p.type]) continue;
        const type = require(file);
        const a = await cutCards(page, { type, strings: strings[p.type], locale: loc, seed: 'check|' + u.id + '|A', theme: THEMES.A, outDir: dir });
        if (a.refused) { why.push(p.type + ': ' + a.refused); continue; }
        const b = await cutCards(page, { type, strings: strings[p.type], locale: loc, seed: 'check|' + u.id + '|B', theme: THEMES.B, outDir: dir });
        if (b.refused || b.cols !== a.cols) { why.push(p.type + ': form B ' + (b.refused || 'has other columns')); continue; }
        // how many cards a section takes: one row of a page of columns; of a one-column page two cards when two fit
        // in SECTION_MAX, else one (a check is two or three pages, not six)
        const take = a.cols === 1 ? (a.cards[0].h * 2 + 14 <= SECTION_MAX ? 2 : 1) : a.cols;
        // the cards of a section do not ask the same thing twice: each next card has another answer than the ones taken
        const pick = (cards, not) => { const out = [], seen = new Set(not); for (const c of cards) { if (out.length === take) break; if (seen.has(c.sig) || seen.has('ans:' + c.ans)) continue; out.push(c); seen.add(c.sig); seen.add('ans:' + c.ans); } return out; };
        const cardsA = pick(a.cards, []);
        let cardsB = pick(b.cards, cardsA.map((c) => c.sig));
        // where the answer sits: a choice card of form B does not have its right option where form A has it, when the
        // generator's page offers such a card (a child who met form A must not find the answer by its place)
        cardsB = cardsB.map((c, i) => { const pa = cardsA[i] && cardsA[i].pos; if (pa == null || c.pos !== pa) return c; const other = b.cards.find((x) => x.pos != null && x.pos !== pa && !cardsA.some((y) => y.sig === x.sig) && !cardsB.includes(x)); return other || c; });
        if (cardsA.length < take || cardsB.length < take) { why.push(p.type + ': too few different cards'); continue; }
        found = { lesson: l.n, lessonTitle: l.title, point: l.point, type: p.type, typeTitle: a.title, instruction: a.instruction, perRow: a.cols === 1 ? 1 : a.cols, cols: a.cols };
        sections.A.push(Object.assign({}, found, { cards: cardsA, w: cardsA[0].w, h: Math.max(...cardsA.map((c) => c.h)) }));
        sections.B.push(Object.assign({}, found, { cards: cardsB, w: cardsB[0].w, h: Math.max(...cardsB.map((c) => c.h)) }));
        break;
      }
      if (!found) { left.push(l.n); if (has('debug')) console.log('      lesson ' + l.n + ' „' + l.title + '“ has no section: ' + (why.join('; ') || 'no worksheet type')); }
    }
    if (sections.A.length < MIN_SECTIONS) { console.log('--    ' + u.id + ': ' + sections.A.length + ' lesson(s) with cards; no check'); fs.rmSync(dir, { recursive: true, force: true }); continue; }

    // ---- the pages: ONE packing for both forms (a part has the same number and the same page in A and in B) ----
    // how much a page holds (with the longer of the two titles) and how tall each section is in either form
    const measure = async (form) => {
      const title = fill(ui.formTitle, { unit: u.title, form });
      await load(path.join(dir, '_probe.html'), pageHtml(title, [], 1));
      const cap = await page.evaluate(() => document.querySelector('[data-lcs-body]').clientHeight);
      await load(path.join(dir, '_probe.html'), pageHtml(title, sections[form], 1, { pageHeight: 9000 }));
      return { cap, heights: await page.evaluate(() => [...document.querySelectorAll('.tc-section')].map((s) => Math.ceil(s.getBoundingClientRect().height))) };
    };
    const mA = await measure('A'), mB = await measure('B');
    const cap = Math.min(mA.cap, mB.cap);
    const heights = mA.heights.map((h, i) => Math.max(h, mB.heights[i]));
    if (has('debug')) console.log('      a page holds ' + cap + ' px; sections ' + heights.join(', '));
    if (heights.some((x) => x > cap)) throw new Error(u.id + ': a section is taller than a page');
    // the tallest sections first, each on the first page that still holds it (fewest pages); on a page and between
    // pages the order of the lessons is kept as far as the packing allows
    const bins = [];
    for (const i of heights.map((_, k) => k).sort((x, y) => heights[y] - heights[x] || x - y)) {
      let b = bins.find((x) => x.h + GAP + heights[i] <= cap);
      if (!b) { b = { h: -GAP, idx: [] }; bins.push(b); }
      b.idx.push(i); b.h += GAP + heights[i];
    }
    for (const b of bins) b.idx.sort((x, y) => x - y);
    bins.sort((x, y) => x.idx[0] - y.idx[0]);
    const order = bins.flatMap((b) => b.idx);
    for (const form of ['A', 'B']) sections[form] = order.map((i) => sections[form][i]);
    let at = 0;
    const pages = bins.map((b) => { const p = b.idx.map(() => at++); return p; });

    const entry = { unit: u.id, slug: u.slug, title: u.title, grade: String(u.grade), subject: u.subject, sections: sections.A.map((s, i) => ({ part: i + 1, lesson: s.lesson, lessonTitle: s.lessonTitle, point: s.point, type: s.type, typeTitle: s.typeTitle, cards: s.cards.length, answersA: s.cards.reduce((k, c) => k + c.answers, 0), answersB: sections.B[i].cards.reduce((k, c) => k + c.answers, 0) })), notCovered: left, forms: {} };
    for (const form of ['A', 'B']) {
      const title = fill(ui.formTitle, { unit: u.title, form });
      for (const kind of ['check', 'key']) {
        const doc = await PDFDocument.create();
        for (let pi = 0; pi < pages.length; pi++) {
          const secs = pages[pi].map((i) => sections[form][i]);
          await load(path.join(dir, '_page.html'), pageHtml(title, secs, pages[pi][0] + 1, kind === 'key' ? { keyLabel: ui.keyLabel } : null));
          if (kind === 'key') await page.evaluate(showAnswers);
          // T4: nothing leaves its card, no card leaves the page (measured)
          const over = await page.evaluate(() => { const b = document.querySelector('[data-lcs-body]').getBoundingClientRect(); const out = []; document.querySelectorAll('.tc-section').forEach((s) => { const r = s.getBoundingClientRect(); if (r.bottom > b.bottom + 1 || r.right > b.right + 1) out.push('part ' + s.dataset.tcPart + ' leaves the page'); }); return out; });
          if (over.length) throw new Error(u.id + ' form ' + form + ' page ' + (pi + 1) + ': ' + over.join('; '));
          const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
          const src = await PDFDocument.load(pdf);
          for (const p of await doc.copyPages(src, src.getPageIndices())) doc.addPage(p);
          if (has('png')) await (await page.$('[data-lcs-page]')).screenshot({ path: path.join(dir, kind + '-' + form.toLowerCase() + '-' + (pi + 1) + '.png') });
        }
        const bytes = await doc.save();
        fs.writeFileSync(path.join(dir, kind + '-' + form.toLowerCase() + '.pdf'), bytes);
        // where the site reads them from (uploaded by scripts/units/upload-teacher-files.sh; outside every served folder)
        const tf = path.join(REPO, 'out', 'teacher-files', loc, 'checks', u.id);
        fs.mkdirSync(tf, { recursive: true });
        fs.writeFileSync(path.join(tf, kind + '-' + form.toLowerCase() + '.pdf'), bytes);
      }
      for (const f of ['_probe.html', '_page.html']) fs.rmSync(path.join(dir, f), { force: true });
      entry.forms[form] = { pages: pages.length, cards: sections[form].reduce((k, s) => k + s.cards.length, 0), sigs: sections[form].map((s) => s.cards.map((c) => crypto.createHash('sha1').update(c.sig).digest('hex').slice(0, 16))), pos: sections[form].map((s) => s.cards.map((c) => c.pos)) };
    }
    built.push(entry);
    console.log('ok    ' + u.id + ': ' + entry.sections.length + ' parts of ' + u.lessons.length + ' lessons, ' + entry.forms.A.cards + ' cards, ' + entry.forms.A.pages + ' + ' + entry.forms.B.pages + ' page(s)' + (left.length ? '; not in the check: lesson ' + left.join(', ') : ''));
  }
  await browser.close();
  fs.writeFileSync(path.join(outRoot, 'checks.json'), JSON.stringify({ locale: loc, checks: built }, null, 1) + '\n');
  console.log(loc + ': ' + built.length + ' check(s) of ' + units.length + ' unit(s) → ' + path.relative(REPO, outRoot));
})().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
