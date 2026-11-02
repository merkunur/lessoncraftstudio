#!/usr/bin/env node
/**
 * Gate: answer keys (runtime.js KEY_CSS + the templates' key examples, 2026-10-31).
 *
 * For every template of every built maker, 3 levels × 2 copies × en + fi (the long-word language):
 *   - a template either has a key, or is in NO_KEY below with the reason (a new template without a key fails until it
 *     gets one or a reason — no maker ships a page whose answers nobody can check)
 *   - the key shows EVERY answer the page carries: an empty write-in box / answer cell shows its answer (its ::after
 *     content), a right choice is ringed, a ring / badge mark is drawn; at least one mark per page
 *   - the key passes the page's layout checks (overflow, footer band, broken images) — a written-in answer must fit
 *   - the key shows the same content as the page (runtime.js throws otherwise) — built here, so that holds too
 * Poisoned on every run: a key layer without the ring rule must fail.
 *
 *   node scripts/makers/gates/answer-keys.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const runtime = require('../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const { runLints } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'qa', 'lints.js'));

/** templates with no answer key, and why (a key would mark nothing that is right or wrong) */
const NO_KEY = {
  'K-012': 'one-to-one: any pairing is right',
  'K-239': 'tracing and writing the word',
  'K-388': 'the word of the day: trace and write',
  'K-389': 'fill-in sentences — the key needs the word seated on the writing line (lib/key-on-row.js): OPEN',
  'K-390': 'sentence steps — the key needs text seated on writing lines: OPEN',
  'K-391': 'tracing sentences',
  'K-433': 'read, trace, write',
  'K-434': 'tracing',
  'K-435': 'draw what the sentence says (open)',
  'K-439': 'rainbow writing',
  'K-440': 'a reading game',
  'K-441': 'flash cards',
  'K-453': 'flash cards to cut',
  'K-455': 'desk number lines to cut out (material)',
  'G1-441': 'fact triangle cards to cut out (material)',
  'G1-452': 'doubles memory cards to cut out (material)',
  'G2-402': 'place-value chart and digit cards to cut out (material)',
  'G2-406': 'fraction strips to cut out (material)',
  'G3-411': 'times table keyring cards to cut out (material)',
  'G1-473': 'classroom store price tags and play money to cut out (material)',
  'K-462': 'a clock face and two hands to cut out and fasten (material)',
  'G2-475': 'four rulers to cut out at their real size (material)',
  'G1-481': 'the class survey graph: the data come from the class, there is no right answer (material)',
  'G2-478': 'a net to cut out, fold and glue into a die, a box or a pyramid (material)',
  'K-372': 'draw the named shapes on dot paper: any triangle, square or rectangle drawn on the dots is right (drawing)',
  'K-468': 'trace the number words: the word to trace is printed on the page (handwriting)',
  // number tracing (2026-11-02): every number to trace or write is printed on its own row — the page is its own key
  'K-237': 'number tracing: each row prints the number it traces', 'K-249': 'number tracing 0-4: the numbers are printed on the page',
  'K-250': 'number tracing 5-9: the numbers are printed on the page', 'K-251': 'trace and write: each row prints the number the child writes',
  'K-252': 'number tracing 1-10: the numbers are printed on the page', 'K-253': 'teen numbers: the numbers are printed on the page',
  'K-466': 'make your own pattern: an empty train and pictures to cut out — the child invents the pattern (material)',
};

(async () => {
  const versions = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8'));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-keys-'));
  const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 703, height: 945 });
  let fails = 0, keys = 0;
  const fail = (s) => { fails++; if (fails <= 25) console.log('FAIL ' + s); };

  /** what a mounted key shows: answers missing from it */
  const audit = () => page.evaluate(() => {
    const miss = [];
    let marks = 0;
    for (const el of document.querySelectorAll('[data-lcs-answer]')) {
      const want = el.getAttribute('data-lcs-answer');
      if (!want) continue;
      if (el.children.length || el.textContent.trim()) { marks++; continue; }   // drawn / written by the template
      const shown = getComputedStyle(el, '::after').content.replace(/^"|"$/g, '');
      if (shown !== want) miss.push(`answer "${want}" not shown (${shown})`); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-correct]')) {
      if (getComputedStyle(el).boxShadow === 'none') miss.push('a right choice is not ringed'); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-key-ring]')) {
      if (parseFloat(getComputedStyle(el).outlineWidth) < 3) miss.push('a ring mark is not drawn'); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-key-badge]')) {
      const c = getComputedStyle(el, '::after').content.replace(/^"|"$/g, '');
      if (c !== el.getAttribute('data-lcs-key-badge')) miss.push('a badge is not drawn'); else marks++;
    }
    marks += document.querySelectorAll('[data-lcs-key-sample]').length;
    return { miss, marks };
  });
  const mount = async (html) => {
    const f = path.join(tmp, 'k.html');
    fs.writeFileSync(f, html);
    await page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
  };

  for (const [maker, v] of Object.entries(versions)) {
    const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', maker, v.current, 'templates.json'), 'utf8'));
    for (const t of tj.templates) {
      if (t.interactive) continue;   // an interactive template draws its own key (the catalogue's)
      if (!t.hasKey) { if (!NO_KEY[t.id]) fail(`${maker} ${t.id}: no answer key and no reason in NO_KEY`); continue; }
      if (NO_KEY[t.id]) fail(`${maker} ${t.id}: listed in NO_KEY but has a key — take it off the list`);
      const type = require(path.join(REPO, t.file));
      for (const loc of ['en', 'fi'].filter((l) => t.locales.includes(l))) for (const d of t.keyLevels) for (const variant of [1, 2]) {
        const s = withLevelInstruction(resolveStrings(t.id, loc, type), t.id, d, loc);
        const theme = t.themed ? t.themes[(variant - 1) % t.themes.length] : null;
        const unit = t.units && t.units[loc] && t.units[loc][0] ? t.units[loc][variant % t.units[loc].length].id : null;
        let r;
        try { r = runtime.makePage({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant, answerKey: true, answerKeySuffix: tj.answerKey[loc] }); }
        catch (e) { fail(`${t.id} ${loc} L${d} v${variant}: ${e.message}`); continue; }
        if (!r.keyHtml) { fail(`${t.id} ${loc} L${d} v${variant}: no key page (this level has a key)`); continue; }
        keys++;
        await mount(r.keyHtml);
        const a = await audit();
        if (a.miss.length) fail(`${t.id} ${loc} L${d} v${variant}: ${a.miss.slice(0, 3).join('; ')}`);
        if (!a.marks) fail(`${t.id} ${loc} L${d} v${variant}: the key marks nothing`);
        const lint = (await runLints(page, { gradeBand: type.gradeBand })).filter((x) => /overflow|footer|broken image|font too small/.test(x));
        if (lint.length) fail(`${t.id} ${loc} L${d} v${variant}: ${lint.slice(0, 2).join(' | ')}`);
      }
    }
  }
  // poison: a key without the ring rule must be caught
  const sample = runtime.makePage({ type: require(path.join(REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js')), strings: resolveStrings('K-002', 'en', {}), locale: 'en', difficulty: 2, theme: 'animals', variant: 1, answerKey: true });
  await mount(sample.keyHtml.replace(".lcs-keypage [data-lcs-correct]{box-shadow:0 0 0 4px #F2784B;border-radius:999px}", ''));
  const p = await audit();
  if (!p.miss.length) fail('poison: a key without the ring rule was not caught');
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(fails ? `answer keys: ${keys} key pages, ${fails} failing` : `answer keys: ${keys} key pages, all pass (no key by design: ${Object.keys(NO_KEY).length} templates)`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('answer keys: error — ' + e.message); process.exit(1); });
