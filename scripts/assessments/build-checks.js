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
const CARD_MAX = 460;                         // a taller card is most of a page: not a task of a short check
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
.tc-key [data-lcs-key-ring],.tc-key [data-lcs-keyring]{outline:3px solid #C9552E;outline-offset:2px;border-radius:50%}
.tc-key .tc-ans{color:#C9552E;font-family:'Baloo 2',cursive;font-weight:800}
</style>`;
const sectionHtml = (s, n, key) => `<section class="tc-section" data-tc-part="${n}"><p class="tc-instr"><span class="tc-part">${n}</span><span>${esc(s.instruction)}</span></p>` +
  `<div class="tc-cards" style="grid-template-columns:repeat(${s.perRow},${s.w}px);grid-auto-rows:${s.h}px">${s.cards.map((c, i) => renumber(key && c.keyHtml ? c.keyHtml : c.html, i + 1)).join('')}</div></section>`;
const renumber = (html, n) => html.replace(/(<span class="ws-card-badge">)\d+(<\/span>)/, '$1' + n + '$2').replace(/data-lcs-card="\d+"/, 'data-lcs-card="' + n + '"');
const pageHtml = (title, sections, first, opts) => buildPage({
  title, instruction: ui.pageInstruction, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4', ...(opts || {}),
  bodyHtml: STYLE + `<div class="tc-wrap${opts && opts.keyLabel ? ' tc-key' : ''}">` + sections.map((s, i) => sectionHtml(s, first + i, !!(opts && opts.keyLabel))).join('') + '</div>',
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


// ---- the cut pages are kept (out/assessments/_cut-cache): building 16 worksheet pages per lesson takes minutes, and a
// change of the CHOICE below needs none of them again. An entry is good while the type's file, the cutter, the
// strings and the page shell are the files it was made from (their time stamps are part of its name).
const CACHE = path.join(REPO, 'out', 'assessments', '_cut-cache');
const stamp = (f) => { try { return String(fs.statSync(f).mtimeMs); } catch (e) { return '0'; } };
const SHARED = [path.join(__dirname, 'lib', 'cut-cards.js'), path.join(WG, 'i18n', 'strings.' + loc + '.json'), path.join(WG, 'page', 'shell.js'), path.join(WG, 'page', 'page.css')].map(stamp).join('|');
async function cached(o, make) {
  if (has('no-cache')) return make(o.seed);
  const name = crypto.createHash('sha1').update([loc, o.typeId, o.seed, o.theme, stamp(o.file), SHARED].join('|')).digest('hex').slice(0, 24) + '.json';
  const at = path.join(CACHE, name);
  if (fs.existsSync(at)) return JSON.parse(fs.readFileSync(at, 'utf8'));
  const r = await make(o.seed);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(at, JSON.stringify(r));
  return r;
}

// ---- which cards of a worksheet type a section takes (what two readers of the checks ruled, reviews/) ----
/** a FACT: the numbers of a task in any order. A fact stands once in a form, in whatever part, and in one form only. */
const fact = (c) => (c.key.startsWith('n:') ? c.key : null);
/** a card that hides a number inside the task ("? + 3 = 7") and not at its end */
const inside = (c) => (/\?/.test(c.kind) && !/\?\s*$/.test(c.kind) ? 1 : 0);
/** the larger numbers of a task that are its own (not furniture): two cards of one part do not share one */
const own = (plan, c) => c.nums.filter((n) => n >= 11 && !plan.furniture.has(n));
const shares = (plan, c, chosen) => { const seen = new Set(chosen.flatMap((x) => own(plan, x))); return own(plan, c).some((n) => seen.has(n)); };
/** a task whose numbers lie ten or more apart (72 and 97) is not the task of two numbers in one ten (94 and 97) */
/** … and two equal numbers (65 and 65) are a third case: form B has it only where form A has it */
const wide = (c) => (c.nums.length < 2 ? 'one' : c.nums[c.nums.length - 1] === c.nums[0] ? 'equal' : c.nums[c.nums.length - 1] - c.nums[0] >= 10 ? 'far' : 'close');
/** where in the range of the type's sizes the cards of a section are taken: not all from the top (10 would be the
 *  answer everywhere), and both forms get the same spread because B follows A card by card */
const SPREAD = { 1: [0.6], 2: [0.75, 0.4], 3: [0.8, 0.55, 0.3] };
function chooseA(plan, usedA) {
  let cands = plan.a.cards.filter((c) => !c.inOrder && !plan.avoid.includes(c.mag) && !(fact(c) && usedA.has(fact(c))));
  if (new Set(cands.map(inside)).size > 1) cands = cands.filter(inside);       // a page that hides a number is about that
  const mags = [...new Set(cands.map((c) => c.mag))].sort((x, y) => x - y);
  const out = [];
  for (const t of SPREAD[plan.take] || SPREAD[3]) {
    const want = mags[Math.round(t * (mags.length - 1))];
    const ok = cands.filter((c) => !out.some((x) => x.key === c.key || x.ans === c.ans || (x.pos != null && x.pos === c.pos) || (c.mag > 0 && x.mag === c.mag)) && !shares(plan, c, out));
    ok.sort((x, y) => (y.plain - x.plain) || (Math.abs(x.mag - want) - Math.abs(y.mag - want)));
    if (ok[0]) out.push(ok[0]);
  }
  return out;
}
/** for each card of A a card of the SAME KIND (the unknown in the same place, the same sign) and of the same size,
 *  that is no fact of form A or of form B so far, shares no total and no larger number with the part's other cards,
 *  and whose right option, if it is a choice, does not sit where A has it when the pool offers that */
function chooseB(plan, cardsA, usedA, usedB) {
  // (two apart at least: doubles and other tasks whose sizes go in steps of two have no neighbour one apart)
  const near = (x, y) => Math.abs(x.mag - y.mag) <= Math.max(2, Math.round(y.mag * 0.2));
  const out = [];
  for (const ca of cardsA) {
    const ok = plan.b.cards.filter((c) => c.kind === ca.kind && !c.inOrder && near(c, ca) && wide(c) === wide(ca) && !plan.avoid.includes(c.mag)
      && !(fact(c) && (usedA.has(fact(c)) || usedB.has(fact(c)))) && !cardsA.some((x) => x.key === c.key)
      && !out.some((x) => x.key === c.key || x.ans === c.ans || (c.mag > 0 && x.mag === c.mag)) && !shares(plan, c, out.concat(cardsA)));
    const asked = new Set(cardsA.map((x) => x.ans));
    ok.sort((x, y) => (asked.has(x.ans) - asked.has(y.ans)) || ((ca.pos != null && x.pos === ca.pos) - (ca.pos != null && y.pos === ca.pos)) || (y.plain - x.plain) || (Math.abs(x.mag - ca.mag) - Math.abs(y.mag - ca.mag))
      // two candidates equally far from A's size: the larger one for the first box, the smaller for the second, so that
      // form B is not the easier form as a whole
      || (out.length % 2 === 0 ? y.mag - x.mag : x.mag - y.mag));
    if (ok[0]) out.push(ok[0]);
  }
  return out;
}

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
    const sections = { A: [], B: [] }, left = [], plans = [];
    const usedA = new Set(), usedB = new Set();          // the facts a form has asked (a fact stands once in a form, and in one form only)
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
            const r = await cached({ file, typeId: type.id, seed: 'check|' + u.id + '|' + form + (k > 1 ? k : ''), theme: THEMES[form] }, (seed) => cutCards(page, { type, strings: strings[p.type], locale: loc, seed, theme: THEMES[form], outDir: dir }));
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
        if (new Set(a.cards.concat(b.cards).map((c) => c.key)).size <= 1) for (const c of a.cards.concat(b.cards)) c.key = 'v:' + c.look + '|' + c.ans;
        // how many cards a section takes: one row of a page of columns; of a one-column page two cards when two fit
        // in SECTION_MAX, else one (a check is two or three pages, not six)
        const take = a.cols === 1 ? (a.cards[0].h * 2 + 14 <= SECTION_MAX ? 2 : 1) : a.cols;
        // a card that fills most of a worksheet page (a page of two big cards) is not a task of a short check
        if (Math.max(...a.cards.concat(b.cards).map((c) => c.h)) > CARD_MAX) { why.push(p.type + ': its cards are taller than ' + CARD_MAX + ' px'); continue; }
        // numbers every card of the type prints (the labels of a number line) are furniture, not the task's numbers
        const every = a.cards.concat(b.cards);
        const furniture = new Set(every.length >= 4 ? every[0].nums.filter((n) => every.every((c) => c.nums.includes(n))) : []);
        const plan = { lesson: l.n, lessonTitle: l.title, point: l.point, type: p.type, typeTitle: a.title, instruction: rules.instruction[p.type] || a.instruction, perRow: a.cols === 1 ? 1 : a.cols, cols: a.cols, take, a, b, furniture, avoid: rules.avoid && rules.avoid[p.type] ? rules.avoid[p.type] : [] };
        const cardsA = chooseA(plan, usedA);
        if (!cardsA.length || chooseB(plan, cardsA, new Set([...usedA, ...cardsA.map(fact).filter(Boolean)]), usedB).length < cardsA.length) { why.push(p.type + ': the two forms cannot both be filled (the same kind and size, no task twice)'); continue; }
        for (const c of cardsA) if (fact(c)) usedA.add(fact(c));
        plan.cardsA = cardsA;
        found = plan;
        plans.push(plan);
        break;
      }
      if (!found) { left.push(l.n); if (has('debug')) console.log('      lesson ' + l.n + ' „' + l.title + '“ has no section: ' + (why.join('; ') || 'no worksheet type')); }
    }
    // FORM B is chosen when every task of form A is known: no fact of A, of whatever part, is a task of B
    for (const plan of plans) {
      const cardsB = chooseB(plan, plan.cardsA, usedA, usedB);
      if (cardsB.length < plan.cardsA.length) { left.push(plan.lesson); left.sort((x, y) => x - y); if (has('debug')) console.log('      lesson ' + plan.lesson + ' has no section: form B cannot be filled once every task of form A is known'); continue; }
      for (const c of cardsB) if (fact(c)) usedB.add(fact(c));
      const meta = { lesson: plan.lesson, lessonTitle: plan.lessonTitle, point: plan.point, type: plan.type, typeTitle: plan.typeTitle, instruction: plan.instruction, perRow: plan.perRow, cols: plan.cols };
      sections.A.push(Object.assign({}, meta, { cards: plan.cardsA, w: plan.cardsA[0].w, h: Math.max(...plan.cardsA.map((c) => c.h)) }));
      sections.B.push(Object.assign({}, meta, { cards: cardsB, w: cardsB[0].w, h: Math.max(...cardsB.map((c) => c.h)) }));
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
      entry.forms[form] = { pages: pages.length, cards: sections[form].reduce((k, s) => k + s.cards.length, 0), sigs: sections[form].map((s) => s.cards.map((c) => crypto.createHash('sha1').update(c.key.startsWith('n:') ? c.key : s.type + '|' + c.key).digest('hex').slice(0, 16))), kinds: sections[form].map((s) => s.cards.map((c) => c.kind)), mags: sections[form].map((s) => s.cards.map((c) => c.mag)), pos: sections[form].map((s) => s.cards.map((c) => c.pos)) };
    }
    built.push(entry);
    console.log('ok    ' + u.id + ': ' + entry.sections.length + ' parts of ' + u.lessons.length + ' lessons, ' + entry.forms.A.cards + ' cards, ' + entry.forms.A.pages + ' + ' + entry.forms.B.pages + ' page(s)' + (left.length ? '; not in the check: lesson ' + left.join(', ') : ''));
  }
  await browser.close();
  // a run over some units (a grade, one unit) keeps what earlier runs built for the others; a unit of this run that no
  // longer gets a check is taken out; the list stands in the order of the units file
  const listFile = path.join(outRoot, 'checks.json');
  const ran = new Set(units.map((u) => u.id));
  const kept = fs.existsSync(listFile) ? JSON.parse(fs.readFileSync(listFile, 'utf8')).checks.filter((c) => !ran.has(c.unit)) : [];
  const orderOf = new Map(unitsFile.units.map((u, i) => [u.id, i]));
  const all = kept.concat(built).sort((x, y) => orderOf.get(x.unit) - orderOf.get(y.unit));
  fs.writeFileSync(listFile, JSON.stringify({ locale: loc, checks: all }, null, 1) + '\n');
  console.log(loc + ': ' + built.length + ' check(s) of ' + units.length + ' unit(s) → ' + path.relative(REPO, outRoot));
})().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
