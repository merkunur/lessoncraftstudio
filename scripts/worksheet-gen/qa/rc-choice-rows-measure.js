#!/usr/bin/env node
/**
 * Reading comprehension (G2-254, G2-269 … G2-273): MEASURE, for every pool story, level and multiple-choice question,
 * which orders of its three choices keep the choice row no taller than the authored order (2026-11-18). The authored
 * page is the one rc-fit-tiers.js measured to fit; a copy that prints the choices in another order (placeAnswers, the
 * copy's own answer letters) may only take an order measured here, so its page and its answer key are never taller than
 * the authored ones: the chips wrap with flex-wrap, and an order that breaks a line elsewhere can add a line (fr G2-273
 * level 3 copy 13 ran onto the footer).
 *
 * Writes data/literacy/rc-levels/choice-fit.json:
 *   { "<loc>|<story id>|<level>": [ [m0, m1, m2, m3] | null, … one per question in page order ] }
 *   m<tier> = a 6-bit mask over PERMS (bit i set = order PERMS[i] fits at that size tier), measured on A4 AND letter
 *   (both kept: an order is allowed only where it fits on both); a write-in question is null.
 *
 *   node qa/rc-choice-rows-measure.js [locs]      (default all eleven; at most 4 pages at a time)
 *
 * How: the authored page is rendered at its own tier; in each question card a hidden copy of the choice row, laid out
 * at the row's width for each tier (the tiers differ only in the card's side padding), takes the chips in each of the
 * six orders and its height is read. The hidden copy of the authored order must measure the real row's height, else the
 * tool stops (the measurement would not be the page's).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { buildPage } = require('../page/shell.js');
const { resolveStrings, withLevelInstruction } = require('../i18n/strings.js');
const { poolOf } = require('../data/literacy/reading-passages-levels.js');

const PERMS = ['012', '021', '102', '120', '201', '210'];
const PAD_X = [18, 18, 16, 14];   // the question card's side padding at each tier (G2-254 _buildLevel cardPad)
const LOCS = (process.argv[2] || 'en,de,sv,fr,no,nl,fi,da,it,es,pt').split(',');
const TYPES = {
  'G2-254': 'g2/G2-254-reading-comprehension.js', 'G2-269': 'g2/G2-269-reading-comprehension-story-2.js', 'G2-270': 'g2/G2-270-reading-comprehension-story-3.js',
  'G2-271': 'g2/G2-271-reading-comprehension-story-4.js', 'G2-272': 'g2/G2-272-reading-comprehension-story-5.js', 'G2-273': 'g2/G2-273-reading-comprehension-story-6.js',
};
const OUT = path.join(__dirname, '..', 'data', 'literacy', 'rc-levels', 'choice-fit.json');

async function measure(page, html, tmp) {
  fs.writeFileSync(tmp, html, 'utf8');
  await page.goto(require('url').pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate((PERMS, PAD_X) => {
    const out = [];
    for (const card of document.querySelectorAll('[data-lcs-q]')) {
      if (card.hasAttribute('data-lcs-write')) { out.push(null); continue; }
      const row = card.lastElementChild;
      const chips = [...row.children];
      if (chips.length !== 3) return { error: `a question with ${chips.length} choices` };
      const cs = getComputedStyle(row), ccs = getComputedStyle(card);
      const rowW = row.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const padNow = parseFloat(ccs.paddingLeft);
      const realH = row.getBoundingClientRect().height;
      const test = row.cloneNode(false);
      test.style.position = 'absolute'; test.style.visibility = 'hidden'; test.style.left = '0'; test.style.top = '0';
      test.style.paddingLeft = '0'; test.style.boxSizing = 'content-box';
      card.appendChild(test);
      const heightOf = (perm, w) => {
        test.style.width = w + 'px';
        test.replaceChildren(...[...perm].map((k) => chips[+k].cloneNode(true)));
        return test.getBoundingClientRect().height;
      };
      // the hidden copy measures the real row (same width, the authored order)
      const check = heightOf('012', rowW);
      if (Math.abs(check - realH) > 0.5) return { error: `the hidden row measures ${check}, the real row ${realH}` };
      const masks = PAD_X.map((p) => {
        const w = rowW + 2 * (padNow - p);
        const base = heightOf('012', w);
        let m = 0;
        PERMS.forEach((perm, i) => { if (heightOf(perm, w) <= base + 0.5) m |= 1 << i; });
        return m;
      });
      test.remove();
      out.push(masks);
    }
    return { masks: out };
  }, PERMS, PAD_X);
}

(async () => {
  const t0 = Date.now();
  const jobs = [];
  for (const loc of LOCS) for (const [id, f] of Object.entries(TYPES)) {
    const spec = require('../types/' + f);
    const n = poolOf(id, loc).length;
    for (const lv of [1, 2, 3]) {
      const svs = lv === 2 ? Array.from({ length: n - 1 }, (_, i) => i + 1) : Array.from({ length: n }, (_, i) => i + 1);
      for (const sv of svs) jobs.push({ loc, id, spec, lv, sv });
    }
  }
  const fit = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const browser = await puppeteer.launch({ headless: 'new' });
  const errors = [];
  let done = 0;
  const worker = async (w) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1300, deviceScaleFactor: 1 });
    const tmp = path.join(os.tmpdir(), `rc-choice-rows-${process.pid}-${w}.html`);
    for (;;) {
      const j = jobs.shift();
      if (!j) break;
      const story = j.spec._storyFor(j.lv, j.loc, j.sv);
      const built = j.spec._buildLevel(j.lv, j.loc, j.sv, undefined, null);   // the authored order, at the page's own tier
      const s0 = withLevelInstruction(resolveStrings(j.id, j.loc, j.spec), j.id, j.lv, j.loc);
      const strings = j.spec.copyStrings(s0, { locale: j.loc, difficulty: j.lv, seedVariant: j.sv });
      const per = [];
      for (const pageSize of ['a4', 'letter']) {
        const r = await measure(page, buildPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: built.bodyHtml, locale: j.loc, pageSize }), tmp);
        if (r.error) { errors.push(`${j.loc} ${j.id} L${j.lv} story ${story.id} ${pageSize}: ${r.error}`); break; }
        per.push(r.masks);
      }
      if (per.length === 2) fit[`${j.loc}|${story.id}|${j.lv}`] = per[0].map((m, q) => (m == null ? null : m.map((x, t) => x & per[1][q][t])));
      if (++done % 100 === 0) process.stdout.write(`  ${done} pages measured\n`);
    }
    await page.close();
    try { fs.unlinkSync(tmp); } catch (e) { /* gone */ }
  };
  const total = jobs.length;
  await Promise.all([0, 1, 2, 3].map(worker));
  await browser.close();
  if (errors.length) { errors.slice(0, 20).forEach((e) => console.log('ERROR ' + e)); console.log(`${errors.length} page(s) could not be measured; nothing written`); process.exit(1); }
  const sorted = {};
  for (const k of Object.keys(fit).sort()) sorted[k] = fit[k];
  fs.writeFileSync(OUT, JSON.stringify(sorted) .replace(/\],"/g, '],\n"').replace(/^\{/, '{\n').replace(/\}$/, '\n}') + '\n');
  // a summary: how many questions keep every order, and how many keep only some, at each tier
  const hist = [0, 1, 2, 3].map(() => ({ all: 0, some: 0, authoredOnly: 0 }));
  for (const qs of Object.values(sorted)) for (const m of qs) if (m) m.forEach((x, t) => { if (x === 63) hist[t].all++; else if (x === 1) hist[t].authoredOnly++; else hist[t].some++; });
  console.log(`${total} pages (x2 page sizes) measured in ${((Date.now() - t0) / 1000).toFixed(0)} s -> ${path.relative(process.cwd(), OUT)}`);
  hist.forEach((h, t) => console.log(`  tier ${t}: questions with every order ${h.all}, some orders ${h.some}, the authored order only ${h.authoredOnly}`));
})().catch((e) => { console.error(e); process.exit(1); });
