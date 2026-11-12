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
const SEEDS = 8;                              // worksheet pages built per form and type, to choose a section's cards from
const GAP = 12;                               // between two sections of a page
const THEMES = { A: 'animals', B: 'fruits' };  // the picture theme of a form's themed cards
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));
// what a reader of the checks ruled: sections left out, directions reworded for cut cards, units without a check
const rulesFile = path.join(__dirname, 'lists', loc + '.json');
const rules = fs.existsSync(rulesFile) ? JSON.parse(fs.readFileSync(rulesFile, 'utf8')) : { drop: {}, instruction: {}, noCheck: {} };
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
  `<div class="tc-cards" style="grid-template-columns:repeat(${s.perRow},${s.w}px);grid-auto-rows:${s.h}px">${s.cards.map((c, i) => renumber(c.html, i + 1)).join('')}</div></section>`;
const renumber = (html, n) => html.replace(/(<span class="ws-card-badge">)\d+(<\/span>)/, '$1' + n + '$2').replace(/data-lcs-card="\d+"/, 'data-lcs-card="' + n + '"');
const pageHtml = (title, sections, first, opts) => buildPage({
  title, instruction: ui.pageInstruction, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4', ...(opts || {}),
  bodyHtml: STYLE + `<div class="tc-wrap${opts && opts.keyLabel ? ' tc-key' : ''}">` + sections.map((s, i) => sectionHtml(s, first + i)).join('') + '</div>',
});
// the key: every answer the cards carry, written where the child writes it
const showAnswers = () => {
  const SVG = 'http://www.w3.org/2000/svg';
  let shown = 0;
  document.querySelectorAll('[data-lcs-answer]').forEach((el) => {
    const answer = el.dataset.lcsAnswer;
    if (el.namespaceURI === SVG) {
      // an answer that sits in a drawing (the empty circle of a number bond, the empty brick of a number wall): the
      // number is written into the middle of the shape; the shape itself is left as it is
      const box = el.getBBox();
      const t = document.createElementNS(SVG, 'text');
      t.setAttribute('x', box.x + box.width / 2); t.setAttribute('y', box.y + box.height / 2);
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('font-family', "'Baloo 2'"); t.setAttribute('font-weight', '800'); t.setAttribute('fill', '#C9552E');
      t.setAttribute('font-size', Math.max(12, Math.min(32, Math.floor(Math.min(box.height * 0.5, box.width / Math.max(1, answer.length) * 1.1)))));
      t.setAttribute('data-tc-shown', '1');
      t.textContent = answer;
      (el.tagName.toLowerCase() === 'g' ? el : el.parentNode).appendChild(t);
      shown++;
      return;
    }
    if ((el.textContent || '').trim()) { shown++; return; }               // the card already prints it
    const r = el.getBoundingClientRect();
    const mark = document.createElement('span');
    mark.className = 'tc-ans'; mark.setAttribute('data-tc-shown', '1');
    mark.textContent = answer;
    mark.style.cssText = 'display:block;width:100%;text-align:center;line-height:' + Math.max(16, Math.floor(r.height) - 6) + 'px;font-size:' + Math.max(13, Math.min(28, Math.floor(r.height * 0.55))) + 'px';
    el.appendChild(mark);
    shown++;
  });
  // T1: the key shows every answer the cards carry (a choice is outlined by the style sheet)
  return { answers: document.querySelectorAll('[data-lcs-answer]').length, shown, hidden: [...document.querySelectorAll('[data-tc-shown]')].filter((e) => { const b = e.getBoundingClientRect(); return !(b.width > 2 && b.height > 2); }).length };
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
    if (rules.noCheck[u.id]) { console.log('--    ' + u.id + ': no check by a ruling: ' + rules.noCheck[u.id]); continue; }
    const dir = path.join(outRoot, u.id);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    // ---- the blueprint: one section per lesson that has a type of answer-carrying cards ----
    const sections = { A: [], B: [] }, left = [];
    for (const l of u.lessons) {
      let found = null;
      const why = [];
      if ((rules.drop[u.id] || {})[l.n]) { left.push(l.n); if (has('debug')) console.log('      lesson ' + l.n + ' is left out by a ruling: ' + rules.drop[u.id][l.n]); continue; }
      for (const p of l.paper || []) {
        const file = typeFiles.get(p.type);
        if (!file || !strings[p.type]) continue;
        const type = require(file);
        // the cards a form may choose from: the worksheet page of this type built with SEEDS seeds of the form
        const pool = async (form) => {
          let cols = 0; const cards = [], seen = new Set();
          for (let k = 1; k <= SEEDS; k++) {
            const r = await cutCards(page, { type, strings: strings[p.type], locale: loc, seed: 'check|' + u.id + '|' + form + (k > 1 ? k : ''), theme: THEMES[form], outDir: dir });
            if (r.refused) return r;
            if (cols && r.cols !== cols) return { refused: 'its page changes its columns' };
            cols = r.cols;
            for (const c of r.cards) { if (seen.has(c.key + '#' + c.kind)) continue; seen.add(c.key + '#' + c.kind); cards.push(c); }
          }
          return { cols, cards, instruction: strings[p.type].instruction, title: strings[p.type].printTitle || strings[p.type].title };
        };
        const a = await pool('A');
        if (a.refused) { why.push(p.type + ': ' + a.refused); continue; }
        const b = await pool('B');
        if (b.refused || b.cols !== a.cols) { why.push(p.type + ': form B ' + (b.refused || 'has other columns')); continue; }
        // how many cards a section takes: one row of a page of columns; of a one-column page two cards when two fit
        // in SECTION_MAX, else one (a check is two or three pages, not six)
        if (new Set(a.cards.concat(b.cards).map((c) => c.key)).size <= 1) for (const c of a.cards.concat(b.cards)) c.key = 'v:' + c.look + '|' + c.ans;
        const take = a.cols === 1 ? (a.cards[0].h * 2 + 14 <= SECTION_MAX ? 2 : 1) : a.cols;
        // FORM A: the larger tasks of the type first (a check of "within 10" does not ask 1 + 1), a plain number
        // before one whose digits can be swapped unnoticed; a section never asks the same task or for the same answer
        // twice, and two choice cards of a section do not have their right option in the same place
        const cardsA = [];
        // (a type that hides a number inside the task — "? + 3 = 7" — is about that: such a card before one that asks
        // for the result at the end, which the same page also prints)
        const inside = (c) => (/\?/.test(c.kind) && !/\?\s*$/.test(c.kind) ? 1 : 0);
        const mixed = new Set(a.cards.map(inside)).size > 1;
        for (const c of a.cards.slice().sort((x, y) => (mixed ? inside(y) - inside(x) : 0) || (y.plain - x.plain) || (y.mag - x.mag))) {
          if (cardsA.length === take) break;
          if (cardsA.some((x) => x.key === c.key || x.ans === c.ans || (x.pos != null && x.pos === c.pos))) continue;
          cardsA.push(c);
        }
        // FORM B: for each card of A a card of the SAME KIND (the unknown in the same place, the same operation) and
        // of the same size, that is not a task of A (the same numbers in any order), and whose right option, if it is
        // a choice, does not sit where A has it when the pool offers that
        const near = (x, y) => Math.abs(x.mag - y.mag) <= Math.max(2, Math.round(y.mag * 0.3));
        const cardsB = [];
        for (const ca of cardsA) {
          const ok = b.cards.filter((c) => c.kind === ca.kind && near(c, ca) && !cardsA.some((x) => x.key === c.key) && !cardsB.some((x) => x.key === c.key || x.ans === c.ans));
          ok.sort((x, y) => ((ca.pos != null && x.pos === ca.pos) - (ca.pos != null && y.pos === ca.pos)) || (y.plain - x.plain) || (Math.abs(x.mag - ca.mag) - Math.abs(y.mag - ca.mag)));
          if (ok[0]) cardsB.push(ok[0]);
        }
        if (!cardsA.length || cardsB.length < cardsA.length) { why.push(p.type + ': form B has no task of the same kind and size for every task of form A'); continue; }
        found = { lesson: l.n, lessonTitle: l.title, point: l.point, type: p.type, typeTitle: a.title, instruction: rules.instruction[p.type] || a.instruction, perRow: a.cols === 1 ? 1 : a.cols, cols: a.cols };
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
    // the parts stand in the order of the lessons; a page takes sections until the next one no longer fits
    const pages = []; { let cur = [], h = -GAP; heights.forEach((x, i) => { if (cur.length && h + GAP + x > cap) { pages.push(cur); cur = []; h = -GAP; } cur.push(i); h += GAP + x; }); if (cur.length) pages.push(cur); }

    const entry = { unit: u.id, slug: u.slug, title: u.title, grade: String(u.grade), subject: u.subject, sections: sections.A.map((s, i) => ({ part: i + 1, lesson: s.lesson, lessonTitle: s.lessonTitle, point: s.point, type: s.type, typeTitle: s.typeTitle, cards: s.cards.length, answersA: s.cards.reduce((k, c) => k + c.answers, 0), answersB: sections.B[i].cards.reduce((k, c) => k + c.answers, 0) })), notCovered: left, forms: {} };
    for (const form of ['A', 'B']) {
      const title = fill(ui.formTitle, { unit: u.title, form });
      for (const kind of ['check', 'key']) {
        const doc = await PDFDocument.create();
        for (let pi = 0; pi < pages.length; pi++) {
          const secs = pages[pi].map((i) => sections[form][i]);
          await load(path.join(dir, '_page.html'), pageHtml(title, secs, pages[pi][0] + 1, kind === 'key' ? { keyLabel: ui.keyLabel } : null));
          if (kind === 'key') { const k = await page.evaluate(showAnswers); if (k.shown !== k.answers || k.hidden) throw new Error(u.id + ' key ' + form + ' page ' + (pi + 1) + ': ' + k.shown + ' of ' + k.answers + ' answers written, ' + k.hidden + ' not visible'); }
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
      entry.forms[form] = { pages: pages.length, cards: sections[form].reduce((k, s) => k + s.cards.length, 0), sigs: sections[form].map((s) => s.cards.map((c) => crypto.createHash('sha1').update(s.type + '|' + c.key).digest('hex').slice(0, 16))), kinds: sections[form].map((s) => s.cards.map((c) => c.kind)), mags: sections[form].map((s) => s.cards.map((c) => c.mag)), pos: sections[form].map((s) => s.cards.map((c) => c.pos)) };
    }
    built.push(entry);
    console.log('ok    ' + u.id + ': ' + entry.sections.length + ' parts of ' + u.lessons.length + ' lessons, ' + entry.forms.A.cards + ' cards, ' + entry.forms.A.pages + ' + ' + entry.forms.B.pages + ' page(s)' + (left.length ? '; not in the check: lesson ' + left.join(', ') : ''));
  }
  await browser.close();
  fs.writeFileSync(path.join(outRoot, 'checks.json'), JSON.stringify({ locale: loc, checks: built }, null, 1) + '\n');
  console.log(loc + ': ' + built.length + ' check(s) of ' + units.length + ' unit(s) → ' + path.relative(REPO, outRoot));
})().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
