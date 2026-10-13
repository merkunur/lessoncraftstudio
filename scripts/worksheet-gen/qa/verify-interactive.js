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

/** tap-paint (Color by Number 2026-10-04): pick a crayon, tap a part; the oracle recomputes every part's crayon from the design. */
async function playPaint(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      crs: [...document.querySelectorAll('.lcs-crayon')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      parts: document.querySelectorAll('.lcs-paint-art path[data-lcs-region]').length,
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !B.ctx || !B.ctx.paint || info.crs.length < 2) { fails.push(`${w}px: ${info.crs.length} crayons`); return fails; }
    if (info.parts !== B.items.length) fails.push(`${w}px: ${info.parts} tappable parts for ${B.items.length} numbered parts`);
    info.crs.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: crayon ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: crayon ${i + 1} outside the viewport`);
    });
    if (w !== 768) continue;
    const right = oracle(B.items.map((it) => ({ meta: it.meta })), locale, B.ctx || {});
    const cols = B.ctx.paint.crayons.map((c) => c.colour);
    const colour = (i, c) => page.evaluate(({ k, r }) => { document.querySelectorAll('.lcs-crayon')[k].click(); document.querySelector('.lcs-paint-art path[data-lcs-region="' + r + '"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); }, { k: cols.indexOf(c), r: B.items[i].region });
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-paint-art path[data-state]')].map((p) => p.getAttribute('data-state')),
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    let st = await state();
    if (!st.checkDisabled) fails.push('Check enabled with nothing coloured');
    for (let i = 0; i < right.length; i++) { if (cols.indexOf(right[i]) < 0) { fails.push('the oracle colour ' + right[i] + ' is not a crayon'); return fails; } await colour(i, right[i]); }
    st = await state();
    if (st.checkDisabled) fails.push('Check still disabled after every part is coloured');
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (!st.celebrate) fails.push('the right colours did not reach the celebration');
    if (st.states.length !== right.length || st.states.some((s) => s !== 'right')) fails.push('the right colours left parts not green: ' + st.states.filter((s) => s !== 'right').length);
    await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
    for (let i = 0; i < right.length; i++) await colour(i, i === 0 ? cols[(cols.indexOf(right[0]) + 1) % cols.length] : right[i]);
    await page.click('#lcs-check');
    await new Promise((r) => setTimeout(r, 600));
    st = await state();
    if (st.celebrate) fails.push('a WRONG colour reached the celebration');
    if (!st.states.includes('wrong')) fails.push('a wrong colour marked nothing red');
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
    if (B.ctx && B.ctx.countGroups) {
      // count groups (Fractions shading): ANY parts of the right number are right — colour the LAST parts of each
      // shape instead; then one shape with one part too many must fail
      const reset = () => page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-reset').click(); });
      const groups = {};
      B.items.forEach((it, i) => { const g = it.meta['data-lcs-group']; (groups[g] = groups[g] || []).push(i); });
      const want = (g) => right.filter((x, i) => x && B.items[i].meta['data-lcs-group'] === g).length;
      await reset();
      for (const g of Object.keys(groups)) for (const i of groups[g].slice(-want(g))) await tap(i);
      await page.click('#lcs-check');
      await new Promise((r) => setTimeout(r, 600));
      st = await state();
      if (!st.celebrate) fails.push('colouring OTHER parts of the right number did not reach the celebration');
      await reset();
      const g0 = Object.keys(groups)[0];
      for (const g of Object.keys(groups)) for (const i of groups[g].slice(0, want(g) + (g === g0 ? 1 : 0))) await tap(i);
      await page.click('#lcs-check');
      await new Promise((r) => setTimeout(r, 600));
      st = await state();
      if (st.celebrate) fails.push('a shape with one part too many reached the celebration');
      if (st.states[groups[g0][0]] !== 'wrong') fails.push('the over-coloured shape was not marked red');
      continue;
    }
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

/**
 * type-word (Number Words 2026-10-13): the child WRITES each word. The oracle recomputes every box's word from the
 * stamped number (never the answer map). The robot taps each box and presses the REAL letter-pad keys; then checks:
 * every pad key ≥ 44 px, the pad can type every answer, Check disabled while a box is empty · right words → all green
 * + celebration · one misspelt word → exactly that box red, no celebration · Try again keeps the right words and
 * empties the wrong one · the physical keyboard (capital letters too) reaches the celebration.
 */
async function playTypeWord(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      boxes: [...document.querySelectorAll('.lcs-wr')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      keys: [...document.querySelectorAll('#lcs-pad .lcs-key')].map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent, w: r.width, h: r.height, r: r.right, l: r.left }; }),
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.boxes.length < 2 || info.boxes.length !== B.items.length) { fails.push(`${w}px: ${info.boxes.length} write boxes for ${B && B.items ? B.items.length : 0} items`); return fails; }
    info.boxes.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: box ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: box ${i + 1} outside the viewport`);
    });
    if (info.keys.length < 22) fails.push(`${w}px: the letter pad has only ${info.keys.length} keys`);
    info.keys.forEach((k) => { if (k.w < TAP_MIN || k.h < TAP_MIN) fails.push(`${w}px: pad key ${k.t} is ${Math.round(k.w)}x${Math.round(k.h)}`); if (k.l < -1 || k.r > info.vw + 1) fails.push(`${w}px: pad key ${k.t} outside the viewport`); });
    if (w !== 768) continue;
    let right;
    try { right = oracle(B.items.map((it) => ({ label: it.label, meta: it.meta })), locale, B.ctx || {}); } catch (e) { fails.push('oracle: ' + e.message); return fails; }
    if (right.length !== B.items.length || right.some((v) => typeof v !== 'string' || !v)) { fails.push('the oracle gives no word for every box'); return fails; }
    const SPACE = String.fromCharCode(0x2423);
    const tapBox = (i) => page.evaluate((k) => document.querySelectorAll('.lcs-wr')[k].click(), i);
    const pressPad = (c) => page.evaluate((t) => { const k = [...document.querySelectorAll('#lcs-pad .lcs-key')].find((b) => b.textContent === t); if (!k) return false; k.click(); return true; }, c === ' ' ? SPACE : c);
    const writeBox = async (i, word) => { await tapBox(i); for (const c of [...word.toLocaleLowerCase(locale)]) if (!(await pressPad(c))) fails.push('no pad key ' + c); };
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-wr')].map((b) => b.getAttribute('data-state') || ''),
      vals: [...document.querySelectorAll('.lcs-wr')].map((b) => b.textContent),
      checkDisabled: document.getElementById('lcs-check').disabled,
      over: [...document.querySelectorAll('.lcs-wr')].filter((b) => b.scrollWidth > b.clientWidth + 1).length,
    }));
    const press = (id) => page.evaluate((x) => { const e = document.getElementById(x); if (!e || e.hidden || e.disabled) return false; e.click(); return true; }, id);
    const check = async () => { if (!(await press('lcs-check'))) fails.push('Check could not be pressed'); await new Promise((r) => setTimeout(r, 600)); return state(); };
    for (let i = 0; i < right.length - 1; i++) await writeBox(i, right[i]);
    let st = await state();
    if (!st.checkDisabled) fails.push('Check enabled with an empty box');
    if (st.over) fails.push(st.over + ' typed words spill out of their boxes');
    for (let i = 0; i < right.length - 1; i++) if (st.vals[i] !== right[i].toLocaleLowerCase(locale)) { fails.push(`box ${i + 1} shows "${st.vals[i]}" after typing ${right[i]}`); break; }
    // the last box: one misspelt word first (its last letter doubled)
    const last = right[right.length - 1], wrongW = last + [...last].pop();
    await writeBox(right.length - 1, wrongW);
    st = await check();
    if (st.celebrate) fails.push('a MISSPELT word reached the celebration');
    const reds = st.states.map((s, i) => (s === 'wrong' ? i : -1)).filter((i) => i >= 0);
    if (reds.length !== 1 || reds[0] !== right.length - 1) fails.push('one misspelt word marked boxes ' + JSON.stringify(reds) + ' red');
    if (st.states.filter((s) => s === 'right').length !== right.length - 1) fails.push('the right words were not all marked green');
    if (!(await press('lcs-reset'))) fails.push('no Try again after a misspelt word');
    st = await state();
    if (st.vals[right.length - 1] !== '') fails.push('Try again kept the misspelt word');
    if (st.vals.slice(0, -1).some((v, i) => v !== right[i].toLocaleLowerCase(locale))) fails.push('Try again erased right words');
    await writeBox(right.length - 1, last);
    st = await check();
    if (!st.celebrate) fails.push('the right words did not reach the celebration');
    if (st.states.some((s) => s !== 'right')) fails.push('the right words left non-green boxes');
    // the keyboard: start over, type each word with CAPITALS (Check is case-blind) and Enter to go on
    if (!(await press('lcs-cele-close'))) fails.push('no Try again on the celebration');
    st = await state();
    if (st.vals.some((v) => v !== '')) { fails.push('starting over kept words'); return fails; }
    await tapBox(0);
    for (let i = 0; i < right.length; i++) {
      // Puppeteer types a character outside its US layout WITHOUT a keydown (sendCharacter) — a real keyboard sends one
      // (key: 'Ê'), so those letters are dispatched as the keydown a keyboard would send
      for (const c of [...right[i]]) { const k = c === ' ' ? ' ' : c.toLocaleUpperCase(locale); if (/^[ -~]$/.test(k)) await page.keyboard.type(k); else await page.evaluate((key) => document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })), k); }
      if (i < right.length - 1) await page.keyboard.press('Enter');
    }
    st = await check();
    if (!st.celebrate) fails.push('the keyboard path did not reach the celebration (' + JSON.stringify(st.vals) + ')');
  }
  return fails;
}

/**
 * type-number (Number Walls 2026-10-13): the child WRITES each number. The oracle recomputes every box's number from
 * the data the page stamps (never the answer map). The robot taps each box and presses the REAL number-pad buttons;
 * then checks: Check disabled while a box is empty · right numbers → all green + celebration · one wrong number →
 * exactly that box red, no celebration · Try again keeps the right numbers and empties the wrong one · the keyboard
 * path (digits + Enter to the next box) also reaches the celebration. Every box ≥ 44 px and on screen at every width.
 */
async function playType(page, html, oracle, locale) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      boxes: [...document.querySelectorAll('.lcs-wr')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right }; }),
      keys: [...document.querySelectorAll('#lcs-pad .lcs-key')].map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent, w: r.width, h: r.height }; }),
      vw: document.documentElement.clientWidth,
      bundle: window.DECK_BUNDLE,
    }));
    const B = info.bundle;
    if (!B || !Array.isArray(B.items) || info.boxes.length < 2 || info.boxes.length !== B.items.length) { fails.push(`${w}px: ${info.boxes.length} write boxes for ${B && B.items ? B.items.length : 0} items`); return fails; }
    info.boxes.forEach((o, i) => {
      if (o.w < TAP_MIN || o.h < TAP_MIN) fails.push(`${w}px: box ${i + 1} is ${Math.round(o.w)}x${Math.round(o.h)} < ${TAP_MIN}`);
      if (o.l < -1 || o.r > info.vw + 1) fails.push(`${w}px: box ${i + 1} outside the viewport`);
    });
    const digits = info.keys.filter((k) => /^[0-9]$/.test(k.t)).map((k) => k.t).sort().join('');
    if (digits !== '0123456789') fails.push(`${w}px: the number pad has digits "${digits}"`);
    info.keys.forEach((k) => { if (k.w < TAP_MIN || k.h < TAP_MIN) fails.push(`${w}px: pad key ${k.t} is ${Math.round(k.w)}x${Math.round(k.h)}`); });
    if (w !== 768) continue;
    let right;
    try { right = oracle(B.items.map((it) => ({ label: it.label, meta: it.meta })), locale, B.ctx || {}); } catch (e) { fails.push('oracle: ' + e.message); return fails; }
    if (right.length !== B.items.length || right.some((v) => !Number.isInteger(v))) { fails.push('the oracle gives no whole number for every box'); return fails; }
    const tapBox = (i) => page.evaluate((k) => document.querySelectorAll('.lcs-wr')[k].click(), i);
    const pressPad = (d) => page.evaluate((t) => { const k = [...document.querySelectorAll('#lcs-pad .lcs-key')].find((b) => b.textContent === t); if (!k) return false; k.click(); return true; }, d);
    const writeBox = async (i, n) => { await tapBox(i); for (const d of String(n)) if (!(await pressPad(d))) fails.push('no pad key ' + d); };
    const state = () => page.evaluate(() => ({
      celebrate: !document.getElementById('lcs-celebration').hidden,
      states: [...document.querySelectorAll('.lcs-wr')].map((b) => b.getAttribute('data-state') || ''),
      vals: [...document.querySelectorAll('.lcs-wr')].map((b) => b.textContent),
      checkDisabled: document.getElementById('lcs-check').disabled,
    }));
    const press = (id) => page.evaluate((x) => { const e = document.getElementById(x); if (!e || e.hidden || e.disabled) return false; e.click(); return true; }, id);
    const check = async () => { if (!(await press('lcs-check'))) fails.push('Check could not be pressed'); await new Promise((r) => setTimeout(r, 600)); return state(); };
    // all but the last box → Check stays disabled
    for (let i = 0; i < right.length - 1; i++) await writeBox(i, right[i]);
    let st = await state();
    if (!st.checkDisabled) fails.push('Check enabled with an empty box');
    for (let i = 0; i < right.length - 1; i++) if (st.vals[i] !== String(right[i])) { fails.push(`box ${i + 1} shows "${st.vals[i]}" after typing ${right[i]}`); break; }
    // the last box: one WRONG number first
    const last = right[right.length - 1], wrongN = last > 1 ? last - 1 : last + 1;   // stays within the page's digit cap
    await writeBox(right.length - 1, wrongN);
    st = await check();
    if (st.celebrate) fails.push('a WRONG number reached the celebration');
    const reds = st.states.map((s, i) => (s === 'wrong' ? i : -1)).filter((i) => i >= 0);
    if (reds.length !== 1 || reds[0] !== right.length - 1) fails.push('one wrong number marked boxes ' + JSON.stringify(reds) + ' red');
    if (st.states.filter((s) => s === 'right').length !== right.length - 1) fails.push('the right numbers were not all marked green');
    // Try again: the right numbers stay, the wrong one empties
    if (!(await press('lcs-reset'))) fails.push('no Try again after a wrong number');
    st = await state();
    if (st.vals[right.length - 1] !== '') fails.push('Try again kept the wrong number');
    if (st.vals.slice(0, -1).some((v, i) => v !== String(right[i]))) fails.push('Try again erased right numbers');
    await writeBox(right.length - 1, right[right.length - 1]);
    st = await check();
    if (!st.celebrate) fails.push('the right numbers did not reach the celebration');
    if (st.states.some((s) => s !== 'right')) fails.push('the right numbers left non-green boxes');
    // the keyboard: start over, type each number and press Enter to go on
    if (!(await press('lcs-cele-close'))) await page.evaluate(() => { document.getElementById('lcs-celebration').hidden = true; document.getElementById('lcs-cele-close').click(); });
    await tapBox(0);
    for (let i = 0; i < right.length; i++) { await page.keyboard.type(String(right[i])); await page.keyboard.press('Enter'); }
    st = await check();
    if (!st.celebrate) fails.push('the keyboard path did not reach the celebration (' + st.vals.join(',') + ')');
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
    // three picture tiles are a whole task (Story Sequencing level 1: one story of three pictures); the no-target poison still fails at 0
    if (!B || !Array.isArray(B.items) || info.tiles.length < 3) { fails.push(`${w}px: ${info.tiles.length} tap targets`); return fails; }
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

/**
 * trace-path (Handmade Mazes, b8 2026-10-11): REAL pointer drags along the corridor samples. The oracle returns each
 * route's node list computed from the declared graph (never the page's answer map). Per width: the oracle's route
 * must end in the celebration; a straight drag start → goal across the walls and a drag into a dead end must not.
 */
async function playTrace(page, html, oracle) {
  const fails = [];
  const file = path.join(os.tmpdir(), 'lcs-verify-interactive-' + process.pid + '.html');
  fs.writeFileSync(file, html, 'utf8');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 1100, deviceScaleFactor: 1 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load' });
    // the layout must SETTLE before the stage is measured (2026-10-11: the web font loaded mid-run, the header grew 18 px,
    // and every drag point after it missed its corridor)
    // (bounded: a lazy / offscreen image may never fire load)
    await page.evaluate(async () => { await document.fonts.ready; await Promise.race([Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))), new Promise((r) => setTimeout(r, 3000))]); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); });
    const B = await page.evaluate(() => window.DECK_BUNDLE);
    if (!B || !B.ctx || !B.ctx.trace) { fails.push(`${w}px: no trace bundle`); return fails; }
    const T = B.ctx.trace;
    let routes; try { routes = oracle(B); } catch (e) { fails.push(w + 'px: oracle: ' + e.message); return fails; }
    const box = async () => page.evaluate(() => { const r = document.getElementById('lcs-stage').getBoundingClientRect(); return { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height }; });
    const scr = (p, b) => [b.x + p[0] * b.w / 100, b.y + p[1] * b.h / 100 - (0)];
    const edgeOf = (a, c) => T.edges.find((e) => (e.a === a && e.b === c) || (e.a === c && e.b === a));
    // one pointer sample per animation frame, as a finger produces them (a robot faster than the frame rate gets its moves
    // merged by the browser into one far jump, which the runtime rightly refuses: ink never jumps across a wall)
    const frame = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));
    const drag = async (seq) => {
      await page.evaluate(() => window.scrollTo(0, 0)); const b = await box();
      const s = scr(T.nodes[seq[0]], b); await page.mouse.move(s[0], s[1]); await page.mouse.down();
      for (let i = 1; i < seq.length; i++) { const e = edgeOf(seq[i - 1], seq[i]); if (!e) { await page.mouse.up(); return false; }
        const pts = e.a === seq[i - 1] ? e.pts : e.pts.slice().reverse(); for (const p of pts.slice(1)) { const q = scr(p, b); await page.mouse.move(q[0], q[1], { steps: 2 }); await frame(); } }
      await page.mouse.up(); return true;
    };
    const check = async () => { await page.evaluate(() => { const c = document.getElementById('lcs-check'); if (c && !c.disabled && !c.hidden) c.click(); }); await new Promise((r) => setTimeout(r, 650));
      return page.evaluate(() => ({ celebrate: !document.getElementById('lcs-celebration').hidden })); };
    const reset = () => page.evaluate(() => { document.getElementById('lcs-cele-close').click(); });
    // 0. the controls are real targets (measured BEFORE play: Check hides itself once used)
    const btn = await page.evaluate(() => { const c = document.getElementById('lcs-check').getBoundingClientRect(); return [c.width, c.height]; });
    if (btn[1] < TAP_MIN) fails.push(`${w}px: the Check button is ${Math.round(btn[1])} px tall`);
    // 1. the oracle's route(s)
    for (const r of routes) if (!(await drag(r))) fails.push(`${w}px: the oracle route uses an undeclared edge`);
    let st = await check();
    if (!st.celebrate) { const dbg = await page.evaluate(() => { const t = window.__lcsTrace; return t ? { stack: t.R()[0].stack.join('-'), path: (t.T.routes[0].path || []).join('-') } : null; }); fails.push(`${w}px: the correct route did not reach the celebration` + (dbg ? ` (drawn ${dbg.stack} | answer ${dbg.path})` : '')); }
    // 2. a straight drag start → goal across the walls
    await reset();
    { const b = await box(); const s = scr(T.nodes[T.routes[0].start], b), g = scr(T.nodes[T.routes[0].goal], b); await page.mouse.move(s[0], s[1]); await page.mouse.down(); await page.mouse.move(g[0], g[1], { steps: 40 }); await page.mouse.up(); }
    st = await check(); if (st.celebrate) fails.push(`${w}px: a straight drag across the walls reached the celebration`);
    // 3. into a dead end (the first branch off the oracle route that is not its next node)
    await reset();
    const r0 = routes[0]; let dead = null;
    for (let i = 1; i < r0.length - 1 && !dead; i++) { const off = T.edges.filter((e) => e.a === r0[i] || e.b === r0[i]).map((e) => (e.a === r0[i] ? e.b : e.a)).find((k) => k !== r0[i - 1] && k !== r0[i + 1]); if (off !== undefined) dead = r0.slice(0, i + 1).concat([off]); }
    if (dead) { await drag(dead); st = await check(); if (st.celebrate) fails.push(`${w}px: a dead end reached the celebration`); }
    // 4. several routes (F7 babies, F8 strings): only the FIRST route drawn must not celebrate — every route counts.
    //    A string page has no walls and no dead ends, so without this a grader that passes everything survived (2026-10-12)
    if (routes.length > 1) { await reset(); await drag(routes[0]); st = await check(); if (st.celebrate) fails.push(`${w}px: one route of ${routes.length} reached the celebration`); }
  }
  return fails;
}

async function main() {
  const folder = process.argv[2];
  const poison = process.argv.includes('--poison');
  if (!folder) throw new Error('usage: verify-interactive.js <staging-folder> [--poison]');
  let zips = fs.readdirSync(folder).filter((f) => f.endsWith('.zip')).sort();
  // --sample=N (2026-10-06, the answer-position republish of ~15,700 decks): play N decks evenly spaced over the
  // folder instead of all (a full play is ~25 s a deck); never used for a NEW type — new types play every deck
  const sampleArg = (process.argv.find((a) => a.startsWith('--sample=')) || '').slice(9);
  if (sampleArg && !poison) { const n = +sampleArg; if (n > 0 && zips.length > n) { const step = zips.length / n; zips = Array.from({ length: n }, (_, i) => zips[Math.floor(i * step)]); } }
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
        : B.kind === 'tap-select' && B.ctx && B.ctx.countGroups ? (B.items.forEach((it) => { const w = +it.meta['data-lcs-want']; it.meta['data-lcs-want'] = String(w > 1 ? w - 1 : w + 1); }), B.answers)
        : B.kind === 'tap-select' ? B.answers.map((a) => !a)
        : B.kind === 'trace-path' ? (() => { const T = B.ctx.trace; const leaf = T.nodes.map((_, i) => i).find((i) => i !== T.routes[0].start && i !== T.routes[0].goal && T.edges.filter((e) => e.a === i || e.b === i).length === 1); const alt = leaf !== undefined ? leaf : (() => { const p0 = T.routes[0].path || [], prev = p0[p0.length - 2]; return T.edges.filter((e) => e.a === prev || e.b === prev).map((e) => (e.a === prev ? e.b : e.a)).find((q) => !p0.includes(q)); })(); /* a graph with no leaf (F13 honeycomb): the last step goes to another touching cell */ T.routes[0].goal = alt; const leaf2 = alt; if (T.routes[0].path) T.routes[0].path = T.routes[0].path.slice(0, -1).concat([leaf2]); return B.answers; })()
        : B.kind === 'tap-paint' ? (() => { const cs = B.ctx.paint.crayons.map((c) => c.colour); return B.answers.map((a) => cs[(cs.indexOf(a) + 1) % cs.length]); })()
        : B.kind === 'type-number' ? B.answers.map((a) => a + 1)
        : B.kind === 'type-word' ? B.answers.map((a) => a + [...a].pop())
        : B.kind === 'tap-spell' ? B.answers.map((a) => { const g = [...a]; const k = g.findIndex((c, i) => i > 0 && c.toLowerCase() !== g[0].toLowerCase()); if (k > 0) [g[0], g[k]] = [g[k], g[0]]; return g.join(''); })
        : B.answers.map((a) => (a % B.answers.length) + 1);
      return 'window.DECK_BUNDLE=' + JSON.stringify(B) + ';</script>';
    });
    const cases = [
      ['wrong answer map', shiftAnswers(d.html)],
      ['no tap targets', d.html.replace('st.addEventListener("pointerdown"', 'st.addEventListener("xpointerdown"').replace('ov.appendChild(el);', '').replace('host.appendChild(el);', '').replace('ov.appendChild(t);', '')],
      ['a runtime that marks everything right', d.html.replace('var right=B.answers[i]===order.indexOf(i)+1;', 'var right=true;').replace('var right=B.answers[i]===R(order.indexOf(i));', 'var right=true;').replace('var right=B.answers[i]===pick[i];', 'var right=true;').replace('var right=B.answers[i]===sel[i];', 'var right=true;').replace('right=gr.n===gr.w;', 'right=true;').replace('var right=fold(w)===fold(B.answers[i]);', 'var right=true;').replace('var right=parseInt(val[i],10)===B.answers[i];', 'var right=true;').replace('var right=fold(val[i])===fold(B.answers[i]);', 'var right=true;').replace('right=fill[it.region]===B.answers[i];', 'right=true;').replace('var rt=T.routes[k],done=rt.path?r.stack.join("-")===rt.path.join("-"):r.stack[r.stack.length-1]===rt.goal;', 'var rt=T.routes[k],done=true;').replace('L.el.setAttribute("data-state",right?"right":"wrong");if(right)ok++', 'right=true;L.el.setAttribute("data-state","right");ok++')],
    ];
    let killed = 0;
    for (const [name, html] of cases) {
      if (html === d.html) { console.log('POISON NOT APPLIED: ' + name); continue; }
      const fails = await ({ 'type-number': playType, 'type-word': playTypeWord, 'tap-choice': playChoice, 'tap-edit': playEdit, 'tap-select': playSelect, 'tap-spell': playSpell, 'tap-paint': playPaint, 'trace-path': playTrace }[d.kind] || play)(page, html, d.oracle, d.locale);
      console.log((fails.length ? '  ✓ killed: ' : '  ✗ SURVIVED: ') + name + (fails.length ? ' (' + fails[0] + ')' : ''));
      if (fails.length) killed++;
    }
    await browser.close();
    console.log(killed === cases.length ? 'all poisons killed' : 'POISON SURVIVED');
    process.exit(killed === cases.length ? 0 : 1);
  }
  for (const d of decks) {
    const fails = await ({ 'type-number': playType, 'type-word': playTypeWord, 'tap-choice': playChoice, 'tap-edit': playEdit, 'tap-select': playSelect, 'tap-spell': playSpell, 'tap-paint': playPaint, 'trace-path': playTrace }[d.kind] || play)(page, d.html, d.oracle, d.locale);
    checked++;
    if (fails.length) { bad++; console.log('FAIL ' + d.f + ': ' + fails.join('; ')); }
  }
  await browser.close();
  console.log(`${checked} interactive decks played, ${bad} failed`);
  process.exit(bad ? 1 : 0);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
