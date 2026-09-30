#!/usr/bin/env node
/**
 * qa/verify-interactive.js — the ROBOT-SOLVE gate for worksheet-gen interactive decks
 * (Level Set programme 2026-09-27). It opens every interactive deck.html in a staging
 * folder in a real browser and PLAYS it:
 *
 *   1. the right order — computed INDEPENDENTLY by the type's `interactive.oracle` from
 *      the item labels (the locale collation), never read back from the page's answer
 *      map — must end in the celebration, every item green;
 *   2. a wrong order (first two swapped) must end with ≥1 red item and NO celebration;
 *   3. tapping an item twice must take its number back;
 *   4. every tap target ≥ 44 px at 360 / 768 / 1024 wide, inside the viewport width.
 *
 *   node qa/verify-interactive.js <staging-folder> [--poison]
 *
 * --poison proves the gate can fail: it re-runs one deck three times with (a) a wrong
 * answer map, (b) no tap targets, (c) a runtime that marks everything right — each must FAIL.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const AdmZip = require('adm-zip');
const { loadType } = require('../lib/load-types.js');

const WIDTHS = [360, 768, 1024];
const TAP_MIN = 44;

/** tap-edit: tools + word buttons; the oracle recomputes each word's capital and mark from the canonical sentence. */
async function playEdit(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      targets: [...document.querySelectorAll('.lcs-tok, .lcs-tool')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      vw: document.documentElement.clientWidth, bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.targets.length < 4) { fails.push(`${w}px: ${info.targets.length} tap targets`); return fails; }
    info.targets.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: target ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: target ${i + 1} outside the viewport`);
    });
    if (w !== 768) continue;
    const right = oracle(B.items.map((it) => ({ meta: it.meta, words: it.words })), locale, B.ctx || {});
    const tool = (t) => page.evaluate((x) => document.querySelector('.lcs-tool[data-tool="' + x + '"]').click(), t);
    const word = (i, k) => page.evaluate((a, b) => document.querySelectorAll('.lcs-lane')[a].querySelectorAll('.lcs-tok')[b].click(), i, k);
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-lane')].map((l) => l.getAttribute('data-state')),
      first: document.querySelector('.lcs-tok').textContent,
    }));
    const solve = async (skipFirstCap) => {
      await tool('cap');
      for (let i = 0; i < right.length; i++) {
        let skipped = false;
        for (let k = 0; k < right[i].length; k++) {
          if (!right[i][k].cap) continue;
          if (skipFirstCap && i === 0 && !skipped) { skipped = true; continue; }
          await word(i, k);
        }
      }
      for (let i = 0; i < right.length; i++) for (let k = 0; k < right[i].length; k++) {
        if (right[i][k].mark) { await tool(right[i][k].mark); await word(i, k); }
      }
    };
    // take-back: Aa on the first word twice leaves it as it was
    const before = (await state()).first;
    await tool('cap'); await word(0, 0); await word(0, 0);
    if ((await state()).first !== before) fails.push('tapping a word twice with Aa did not undo the capital');
    await solve(false);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    let st = await state();
    if (!st.celebrate) fails.push('the right edits did not reach the celebration');
    if (st.states.some((x) => x !== 'right')) fails.push('the right edits left red sentences: ' + st.states.join(','));
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    await solve(true);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a MISSING capital reached the celebration');
    if (st.states[0] !== 'wrong') fails.push('a missing capital did not turn its sentence red');
  }
  return fails;
}

/** tap-choice: one option per item; the oracle recomputes each item's correct option from its data. */
async function playChoice(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      opts: [...document.querySelectorAll('.lcs-opt')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.opts.length < 4) { fails.push(`${w}px: ${info.opts.length} tap targets`); return fails; }
    info.opts.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: option ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: option ${i + 1} outside the viewport`);
    });
    if (w !== 768) continue;
    const items = B.items.map((it) => ({ label: it.label, meta: it.meta, options: it.options.map((o) => o.label) }));
    const right = oracle(items, locale, B.ctx || {});
    const base = []; let n = 0; B.items.forEach((it) => { base.push(n); n += it.options.length; });
    const tap = (i, j) => page.evaluate((k) => document.querySelectorAll('.lcs-opt')[k].click(), base[i] + j);
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-opt')].map((b) => b.getAttribute('data-state')).filter(Boolean),
      pressed: [...document.querySelectorAll('.lcs-opt')].filter((b) => b.getAttribute('aria-pressed') === 'true').length,
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    // take-back: the same option twice clears the choice
    await tap(0, 0); await tap(0, 0);
    let st = await state();
    if (st.pressed) fails.push('tapping an option twice did not clear it');
    if (!st.checkDisabled) fails.push('Check enabled with nothing chosen');
    // the right answers
    for (let i = 0; i < right.length; i++) await tap(i, right[i]);
    st = await state();
    if (st.checkDisabled) fails.push('Check still disabled after every item has a choice');
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (!st.celebrate) fails.push('the right answers did not reach the celebration');
    if (st.states.length !== right.length || st.states.some((s) => s !== 'right')) fails.push('the right answers left non-green choices: ' + st.states.join(','));
    // one wrong answer
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    for (let i = 0; i < right.length; i++) await tap(i, i === 0 ? (right[0] + 1) % B.items[0].options.length : right[i]);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a WRONG answer reached the celebration');
    if (!st.states.includes('wrong')) fails.push('a wrong answer marked nothing red');
  }
  return fails;
}

/** tap-select: every item toggles; the oracle recomputes which items are to be chosen. */
async function playSelect(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      els: [...document.querySelectorAll('.lcs-opt')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right, t: r.top, b: r.bottom }; }),
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.els.length < 4 || info.els.length !== B.items.length) { fails.push(`${w}px: ${info.els.length} tap targets`); return fails; }
    info.els.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: item ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: item ${i + 1} outside the viewport`);
      info.els.forEach((p, j) => { if (j > i && o.l < p.r - 1 && p.l < o.r - 1 && o.t < p.b - 1 && p.t < o.b - 1) fails.push(`${w}px: items ${i + 1} and ${j + 1} overlap`); });
    });
    if (w !== 768) continue;
    const right = oracle(B.items.map((it) => ({ label: it.label, meta: it.meta })), locale, B.ctx || {});
    if (!right.some((x) => x) || right.every((x) => x)) fails.push('the oracle finds no mix of items to choose and to leave');
    const tap = (k) => page.evaluate((k) => document.querySelectorAll('.lcs-opt')[k].click(), k);
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-opt')].map((b) => b.getAttribute('data-state')),
      pressed: [...document.querySelectorAll('.lcs-opt')].filter((b) => b.getAttribute('aria-pressed') === 'true').length,
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    await tap(0); await tap(0);
    let st = await state();
    if (st.pressed) fails.push('tapping an item twice did not clear it');
    if (!st.checkDisabled) fails.push('Check enabled with nothing chosen');
    for (let i = 0; i < right.length; i++) if (right[i]) await tap(i);
    st = await state();
    if (st.checkDisabled) fails.push('Check still disabled with items chosen');
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (!st.celebrate) fails.push('the right choice did not reach the celebration');
    if (st.states.some((s, i) => (right[i] ? s !== 'right' : s))) fails.push('the right choice left wrong marks: ' + st.states.join(','));
    // wrong: one item to leave is chosen as well, one item to choose is missed
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    const leave = right.indexOf(false), miss = right.indexOf(true);
    for (let i = 0; i < right.length; i++) if ((right[i] && i !== miss) || i === leave) await tap(i);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a WRONG choice reached the celebration');
    if (st.states[leave] !== 'wrong') fails.push('a wrongly chosen item was not marked red');
    if (st.states[miss] !== 'missed') fails.push('a missed item was not marked');
  }
  return fails;
}

async function play(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => {
      const items = [...document.querySelectorAll('.lcs-item')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right, label: b.getAttribute('aria-label') }; });
      return { items, vw: document.documentElement.clientWidth };
    });
    if (info.items.length < 2) { fails.push(`${w}px: ${info.items.length} tap targets`); return fails; }
    info.items.forEach((it, i) => {
      if (it.w < TAP_MIN || it.h < TAP_MIN) fails.push(`${w}px: item ${i + 1} is ${Math.round(it.w)}x${Math.round(it.h)} < ${TAP_MIN}`);
      if (it.l < -1 || it.r > info.vw + 1) fails.push(`${w}px: item ${i + 1} outside the viewport`);
    });
    if (w !== 768) continue;   // the plays below once, at the tablet width
    const labels = info.items.map((it) => it.label);
    const right = oracle(labels, locale);
    const tapAll = async (order) => { for (const i of order) await page.evaluate((k) => document.querySelectorAll('.lcs-item')[k].click(), i); };
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-item')].map((b) => b.getAttribute('data-state')),
      badges: [...document.querySelectorAll('.lcs-badge')].map((b) => b.textContent),
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    // 3. take-back
    await tapAll([0, 0]);
    const tb = await state();
    if (tb.badges.some((b) => b)) fails.push('tapping an item twice did not take its number back');
    if (!tb.checkDisabled) fails.push('Check enabled with no numbers');
    // 1. the right order
    await tapAll(right);
    let st = await state();
    if (st.checkDisabled) fails.push('Check still disabled after every item has a number');
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (!st.celebrate) fails.push('the right order did not reach the celebration');
    if (st.states.some((s) => s !== 'right')) fails.push('the right order left non-green items: ' + st.states.join(','));
    // 2. a wrong order
    // back to the start through Try again (visible after every Check), whatever the outcome was
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    const wrong = right.slice(); [wrong[0], wrong[1]] = [wrong[1], wrong[0]];
    await tapAll(wrong);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a WRONG order reached the celebration');
    if (!st.states.some((s) => s === 'wrong')) fails.push('a wrong order marked nothing red');
  }
  return fails;
}

/**
 * tap-spell (Level Set 2026-09-28): each item's letter tiles fill its slots; the oracle recomputes each item's
 * WORD from the type's bank (never the page's answer), the robot taps the tiles spelling it, a take-back empties
 * a slot, one swapped pair of letters must end red and never celebrate.
 */
async function playSpell(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      tiles: [...document.querySelectorAll('.lcs-tile')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.tiles.length < 4) { fails.push(`${w}px: ${info.tiles.length} tap targets`); return fails; }
    info.tiles.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: tile ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: tile ${i + 1} outside the viewport`);
    });
    if (w !== 768) continue;
    const words = oracle(B.items.map((it) => ({ label: it.label, meta: it.meta, tiles: it.tiles.map((t) => t.label) })), locale, B.ctx || {});
    const base = []; let n = 0; B.items.forEach((it) => { base.push(n); n += it.tiles.length; });
    // the tile indices that spell a word (an unused tile with that letter each time)
    const spell = (i, word) => {
      const used = new Set(), seq = [];
      for (const ch of (Array.isArray(word) ? word.map((x) => String(x).normalize('NFC')) : [...String(word).normalize('NFC')])) {
        let j = B.items[i].tiles.findIndex((t, k) => !used.has(k) && t.label === ch);
        if (j < 0) j = B.items[i].tiles.findIndex((t, k) => !used.has(k) && t.label.toLocaleLowerCase(locale) === ch.toLocaleLowerCase(locale));
        if (j < 0) return null;
        used.add(j); seq.push(j);
      }
      return seq;
    };
    const tapTile = (i, j) => page.evaluate((k) => document.querySelectorAll('.lcs-tile')[k].click(), base[i] + j);
    const slotBase = []; let m = 0; B.items.forEach((it) => { slotBase.push(m); m += it.slots.length; });
    const tapSlot = (i, k) => page.evaluate((q) => document.querySelectorAll('.lcs-slot')[q].click(), slotBase[i] + k);
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-slot')].map((b) => b.getAttribute('data-state')),
      filled: [...document.querySelectorAll('.lcs-slot')].filter((b) => b.textContent).length,
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    // take-back: a tile fills a slot, a tap on that slot empties it
    await tapTile(0, 0); await tapSlot(0, 0);
    let st = await state();
    if (st.filled) fails.push('tapping a filled slot did not give the letter back');
    if (!st.checkDisabled) fails.push('Check enabled with nothing spelled');
    const seqs = words.map((wd, i) => spell(i, wd));
    if (seqs.some((q) => !q)) { fails.push('the tiles cannot spell the oracle word: ' + words.filter((_, i) => !seqs[i]).join(',')); return fails; }
    for (let i = 0; i < seqs.length; i++) for (const j of seqs[i]) await tapTile(i, j);
    st = await state();
    if (st.checkDisabled) fails.push('Check still disabled after every word is spelled');
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (!st.celebrate) fails.push('the right spellings did not reach the celebration');
    if (st.states.some((x) => x !== 'right')) fails.push('the right spellings left non-green slots');
    // one wrong spelling: the first two DIFFERENT letters of one word swapped
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    const wi = seqs.findIndex((q, i) => { const L = B.items[i].tiles; return q.length > 1 && L[q[0]].label.toLocaleLowerCase(locale) !== L[q[1]].label.toLocaleLowerCase(locale); });
    if (wi < 0) { fails.push('no word with two different first letters to test a wrong spelling'); return fails; }
    for (let i = 0; i < seqs.length; i++) { const q = seqs[i].slice(); if (i === wi) [q[0], q[1]] = [q[1], q[0]]; for (const j of q) await tapTile(i, j); }
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a WRONG spelling reached the celebration');
    if (!st.states.includes('wrong')) fails.push('a wrong spelling marked nothing red');
  }
  return fails;
}

async function main() {
  const folder = process.argv[2];
  const poison = process.argv.includes('--poison');
  if (!folder) throw new Error('usage: verify-interactive.js <staging-folder> [--poison]');
  const zips = fs.readdirSync(folder).filter((f) => f.endsWith('.zip')).sort();
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let checked = 0, bad = 0;
  const decks = [];
  for (const f of zips) {
    const z = new AdmZip(path.join(folder, f));
    const m = JSON.parse(z.readAsText('manifest.json'));
    if (!m.interactive) continue;
    const spec = loadType(m.settings.worksheet_type);
    if (!spec.interactive || typeof spec.interactive.oracle !== 'function') throw new Error(f + ': type has no interactive.oracle');
    if (!z.getEntry('answer-key.pdf')) { bad++; console.log('FAIL ' + f + ': no answer-key.pdf'); }
    decks.push({ f, html: z.readAsText('deck.html'), oracle: spec.interactive.oracle, locale: m.language, kind: m.interactive.kind });
  }
  if (!decks.length) throw new Error('verify-interactive: no interactive decks in ' + folder + ' (a vacuous run is not a pass)');
  if (poison) {
    const kindArg = (process.argv.find((a) => a.startsWith('--kind=')) || '').slice(7);
    const d = kindArg ? decks.find((x) => x.kind === kindArg) : decks[0];
    if (!d) throw new Error('verify-interactive: no deck of kind ' + kindArg);
    console.log('poisoning ' + d.f + ' (' + d.kind + ')');
    // wrong answer map: every answer moved to a DIFFERENT valid value (a reversal can leave a map unchanged)
    const shiftAnswers = (html) => html.replace(/window\.DECK_BUNDLE=(\{.*?\});<\/script>/, (m0, j) => {
      const B = JSON.parse(j);
      B.answers = B.kind === 'tap-choice' ? B.answers.map((a, i) => (a + 1) % B.items[i].options.length)
        : B.kind === 'tap-edit' ? B.answers.map((lane) => lane.map((w) => ({ cap: !w.cap, mark: w.mark })))
        : B.kind === 'tap-select' ? B.answers.map((a) => !a)
        : B.kind === 'tap-spell' ? B.answers.map((a) => { const g = [...a]; const k = g.findIndex((c, i) => i > 0 && c.toLowerCase() !== g[0].toLowerCase()); if (k > 0) [g[0], g[k]] = [g[k], g[0]]; return g.join(''); })
        : B.answers.map((a) => (a % B.answers.length) + 1);
      return 'window.DECK_BUNDLE=' + JSON.stringify(B) + ';</script>';
    });
    const cases = [
      ['wrong answer map', shiftAnswers(d.html)],
      ['no tap targets', d.html.replace('ov.appendChild(el);', '').replace('host.appendChild(el);', '').replace('ov.appendChild(t);', '')],
      ['a runtime that marks everything right', d.html.replace('var right=B.answers[i]===order.indexOf(i)+1;', 'var right=true;').replace('var right=B.answers[i]===pick[i];', 'var right=true;').replace('var right=B.answers[i]===sel[i];', 'var right=true;').replace('var right=fold(w)===fold(B.answers[i]);', 'var right=true;').replace('L.el.setAttribute("data-state",right?"right":"wrong");if(right)ok++', 'right=true;L.el.setAttribute("data-state","right");ok++')],
    ];
    let killed = 0;
    for (const [name, html] of cases) {
      if (html === d.html) { console.log('POISON NOT APPLIED: ' + name); continue; }
      const fails = await ({ 'tap-choice': playChoice, 'tap-edit': playEdit, 'tap-select': playSelect, 'tap-spell': playSpell }[d.kind] || play)(page, html, d.oracle, d.locale);
      console.log((fails.length ? '  ✓ killed: ' : '  ✗ SURVIVED: ') + name + (fails.length ? ' (' + fails[0] + ')' : ''));
      if (fails.length) killed++;
    }
    await browser.close();
    console.log(killed === cases.length ? 'all poisons killed' : 'POISON SURVIVED');
    process.exit(killed === cases.length ? 0 : 1);
  }
  for (const d of decks) {
    const fails = await ({ 'tap-choice': playChoice, 'tap-edit': playEdit, 'tap-select': playSelect, 'tap-spell': playSpell }[d.kind] || play)(page, d.html, d.oracle, d.locale);
    checked++;
    if (fails.length) { bad++; console.log('FAIL ' + d.f + ': ' + fails.join('; ')); }
  }
  await browser.close();
  console.log(`${checked} interactive decks played, ${bad} failed`);
  process.exit(bad ? 1 : 0);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
