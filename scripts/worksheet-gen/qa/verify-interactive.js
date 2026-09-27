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
    const d = decks[0];
    // wrong answer map: every answer moved to a DIFFERENT valid value (a reversal can leave a map unchanged)
    const shiftAnswers = (html) => html.replace(/window\.DECK_BUNDLE=(\{.*?\});<\/script>/, (m0, j) => {
      const B = JSON.parse(j);
      B.answers = B.kind === 'tap-choice' ? B.answers.map((a, i) => (a + 1) % B.items[i].options.length) : B.answers.map((a) => (a % B.answers.length) + 1);
      return 'window.DECK_BUNDLE=' + JSON.stringify(B) + ';</script>';
    });
    const cases = [
      ['wrong answer map', shiftAnswers(d.html)],
      ['no tap targets', d.html.replace('ov.appendChild(el);', '')],
      ['a runtime that marks everything right', d.html.replace('var right=B.answers[i]===order.indexOf(i)+1;', 'var right=true;').replace('var right=B.answers[i]===pick[i];', 'var right=true;')],
    ];
    let killed = 0;
    for (const [name, html] of cases) {
      if (html === d.html) { console.log('POISON NOT APPLIED: ' + name); continue; }
      const fails = await (d.kind === 'tap-choice' ? playChoice : play)(page, html, d.oracle, d.locale);
      console.log((fails.length ? '  ✓ killed: ' : '  ✗ SURVIVED: ') + name + (fails.length ? ' (' + fails[0] + ')' : ''));
      if (fails.length) killed++;
    }
    await browser.close();
    console.log(killed === cases.length ? 'all poisons killed' : 'POISON SURVIVED');
    process.exit(killed === cases.length ? 0 : 1);
  }
  for (const d of decks) {
    const fails = await (d.kind === 'tap-choice' ? playChoice : play)(page, d.html, d.oracle, d.locale);
    checked++;
    if (fails.length) { bad++; console.log('FAIL ' + d.f + ': ' + fails.join('; ')); }
  }
  await browser.close();
  console.log(`${checked} interactive decks played, ${bad} failed`);
  process.exit(bad ? 1 : 0);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
