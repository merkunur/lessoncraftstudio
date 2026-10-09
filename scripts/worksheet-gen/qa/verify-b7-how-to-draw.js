#!/usr/bin/env node
/**
 * verify-b7-how-to-draw.js — the K-396 `how-to-draw` family gate
 * (design docs/worksheet-gen/b7-designs/K-396-how-to-draw.md §5; nt2-G / b7).
 *
 *   node scripts/worksheet-gen/qa/verify-b7-how-to-draw.js [--quick] [--locale=xx]
 *
 * Exports (tools/b7-probe-child.js calls validateBank(block, loc) for every panel draft):
 *   validateBank(block, loc)  = data/b7/how-to-draw.js validateBank (rules 1-16 + the engine data)
 *
 * main():
 *   1. the EN block validates clean (the control) + bank poisons P1-P18, each judged on its OWN rule
 *   2. build: the order face's scramble census at 400 seeds (every (step, slot) cell 20 % ± 6; every drawn
 *      permutation obeys the law) + the census poison (uniform sampling over the 56 law-passing permutations
 *      puts step 1 in slot 1 on ~7 % of pages and FAILS the band); the level-index guard poison PR9
 *   3. render (render/render-instance.js, file:// fonts): base d1/d2/d3 + the ten faces at d2 (EN, each
 *      pinned unit; --locale renders a locale's block instead) + the order face × 12 more seeds (skipped
 *      by --quick); the chrome stress 814 / 722 / 677 on the base; verify() empty, qa/lints.js clean, the
 *      floors measured HERE (cards ≥ 150 inner on a K ladder / 140 on a K strip / 118 at G1-G2; nothing
 *      under the footer; every box inside the lane); the GREYSCALE law per card (rasterised at 150 px:
 *      the new lines' mean luma ∈ [135, 170], the earlier lines' < 80)
 *   4. render poisons PR1-PR8, PR10-PR12 (each must FAIL for its own reason)
 */
'use strict';
const path = require('path');
const fs = require('fs');
const B = require('../data/b7/how-to-draw.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');

const validateBank = (block, loc) => B.validateBank(block, loc);
const clone = (x) => JSON.parse(JSON.stringify(x));
const TYPES = { base: 'k/K-396-how-to-draw.js' };
const FACE_ROWS = require('../tools/b7var-rows/how-to-draw.js').ROWS;
for (const r of FACE_ROWS) TYPES[r[5].mode] = r[0] + '/' + r[1] + '-' + r[2] + '.js';

async function main() {
  const quick = process.argv.includes('--quick');
  const locArg = (process.argv.find((a) => a.startsWith('--locale=')) || '').slice(9) || 'en';
  let assertions = 0; const fails = [];
  const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
  const plog = []; let killed = 0, poisons = 0;
  const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

  // ---------------------------------------------------------------- 1. bank: control + poisons
  const EN = B.HOW_TO_DRAW.en;
  const ctl = validateBank(EN, 'en');
  ok(!ctl.length, 'EN bank control: ' + ctl.join(' | '));
  const P = (name, mut, re) => { const b = clone(EN); mut(b); judge(name, validateBank(b, 'en'), re); };
  P('P1 a title with two tokens', (b) => { b.strings.base.title = 'How to Draw {L} and {U}'; }, /exactly one \{U\}, \{L\} or \{N\}/);
  P('P2 a title over 70 chars', (b) => { b.strings.base.title = 'How to Draw {L} Step by Step for Every Little Artist in the Whole Classroom Today'; }, /> 70 chars/);
  P('P3 a title with a worksheet-word', (b) => { b.strings.base.title = 'How to Draw {L} Worksheet'; }, /forbidden head word/);
  P('P4 an instruction that never names the unit', (b) => { b.strings.base.instruction = 'Look at the steps and draw the animal on the big paper.'; }, /does not name the unit/);
  P('P5 an instruction over 150 chars', (b) => { b.strings.base.instruction = 'Look at the four numbered steps and draw the cat on the big paper, first the outline, then every orange line of each step, slowly and carefully, one at a time.'; }, /instruction > 150/);
  P('P6 the memory instruction without the fold word', (b) => { b.strings.memory.instruction = 'Look at the butterfly, hide it, and draw it from memory on the big paper.'; }, /must contain foldWord/);
  P('P7 the order instruction without 1 and 5', (b) => { b.strings.order.instruction = 'The steps are mixed up: number them in the right order, then draw the owl.'; }, /name the numbers 1 and 5/);
  P('P8 a strings block missing a mode', (b) => { delete b.strings.grid; }, /strings keys must be exactly the 11 modes|grid: strings/);
  P('P9 a form without its stem', (b) => { delete b.forms['animals-bw-3-cat-2'].stem; }, /needs t \+ stem/);
  P('P10 a stem absent from the title form', (b) => { b.forms['animals-bw-3-cat-2'].stem = 'kitten'; }, /stem "kitten" is not in the title form/);
  P('P11 a word-face noun with an article', (b) => { b.nouns['animals-bw-3-fish-2'] = 'a fish'; }, /starts with an article/);
  P('P12 two starters', (b) => { b.starters['zoo-animals-bw-bear-2'] = ['My bear is', 'It can']; }, /needs 3 distinct starters/);
  P('P13 a starter ending in a full stop', (b) => { b.starters['zoo-animals-bw-bear-2'][0] = 'My bear is.'; }, /ends in a mark/);
  P('P14 a unit override to an unknown unit', (b) => { b.unitOverrides = { base: 'animals-bw-9-lion' }; }, /is not a face → unit/);
  P('P15 a refusal without a reason', (b) => { b.refusals = { word: 'no' }; }, /a reason ≥ 12 chars/);
  P('P16 a title promising a key', (b) => { b.strings.base.title = 'How to Draw {L} with Answer Key'; }, /promises a key or a screen/);
  P('P17 a {N} title whose form has no n', (b) => { delete b.forms['farm-animals-bw-pony'].n; }, /uses \{N\} but forms/);
  P('P18 a bare-noun form carrying an article', (b) => { b.forms['farm-animals-bw-pony'].n = 'a Horse'; }, /must be the bare noun without an article/);

  // ---------------------------------------------------------------- 2. build census (the order face) + PR9
  const load = (m) => require(path.join(__dirname, '..', 'types', TYPES[m]));
  const orderSpec = load('order');
  const tally = Array.from({ length: 5 }, () => [0, 0, 0, 0, 0]);
  let lawBreaks = 0;
  for (let v = 1; v <= 400; v++) {
    const rng = makeRng(instanceSeed({ typeId: orderSpec.id, theme: null, difficulty: 2, seedEpoch: 1, variant: v, unit: 'animals-bw-5-owl' }));
    const r = await orderSpec.build({ difficulty: 2, locale: 'en', unit: 'animals-bw-5-owl' }, { rng, variant: v });
    const perm = r.meta.order.split('').map(Number);
    if (!B.lawN(perm)) lawBreaks++;
    perm.forEach((step, slot) => { tally[step - 1][slot]++; });
  }
  ok(lawBreaks === 0, `order census: ${lawBreaks} permutations break the scramble law`);
  const cells = [];
  for (let s = 0; s < 5; s++) for (let k = 0; k < 5; k++) { const share = tally[s][k] / 400; cells.push(share); ok(Math.abs(share - 0.2) <= 0.06, `order census: step ${s + 1} in slot ${k + 1} on ${(share * 100).toFixed(1)} % of 400 pages (20 ± 6)`); }
  console.log('order census (400 seeds): cells ' + (Math.min(...cells) * 100).toFixed(1) + ' – ' + (Math.max(...cells) * 100).toFixed(1) + ' %, law breaks ' + lawBreaks);
  {
    // the census poison: uniform sampling over every law-passing permutation (what a naive composer does)
    const all = []; const perms = (a, m = []) => { if (!a.length) { all.push(m); return; } a.forEach((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)], [...m, x])); }; perms([1, 2, 3, 4, 5]);
    const lawful = all.filter((p) => B.lawN(p));
    const rng = makeRng('census-poison'); let s1 = 0;
    for (let v = 0; v < 400; v++) { const p = rng.pick(lawful); if (p[0] === 1) s1++; }
    const f = []; if (Math.abs(s1 / 400 - 0.2) > 0.06) f.push(`uniform law sampling puts step 1 in slot 1 on ${(s1 / 4).toFixed(1)} %`);
    judge('PC the census over uniform law sampling (' + lawful.length + ' permutations)', f, /slot 1 on/);
  }
  {
    // PR9: a level-index guard — the base build fed the shapes config at index 2 must produce the SHAPES face
    const base = load('base');
    const bad = { ...base, difficulty: { 1: base.difficulty[1], 2: { ...base.difficulty[2], ...FACE_ROWS[0][5] }, 3: base.difficulty[3] } };
    const r = await bad.build({ difficulty: 2, locale: 'en', unit: 'animals-bw-2-dog' }, { rng: makeRng('pr9') });
    const f = []; if (!/data-lcs-htd-mode="shapes"/.test(r.bodyHtml) || !/data-lcs-htd-guides/.test(r.bodyHtml)) f.push('the build keyed on the level index: the shapes config at index 2 rendered the base');
    judge('PR9 the shapes config fed to the base at index 2', f.length ? [] : ['config guard fired'], /config guard fired/);
  }

  // ---------------------------------------------------------------- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  const { resolveStrings } = require('../i18n/strings.js');
  const OUTD = path.join(__dirname, '..', 'out', 'dev');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const floors = async (mode, band) => page.evaluate((mode, band) => {
    const f = [];
    const foot = document.querySelector('.ws-foot').getBoundingClientRect();
    const lane = (document.querySelector('[data-lcs-page]') || document.querySelector('.ws-body') || document.body).getBoundingClientRect();
    const R = document.querySelector('[data-lcs-how-to-draw]');
    const orient = R.dataset.lcsHtdOrient;
    const cardFloor = band === 'K' ? (orient === 'strip' ? 140 : 150) : 118;
    for (const c of document.querySelectorAll('svg[data-lcs-prim="htd-step"]')) {
      const r = c.getBoundingClientRect();
      if (Math.min(r.width, r.height) < cardFloor - 0.5) f.push(`card ${Math.round(r.width)} x ${Math.round(r.height)} (< ${cardFloor} inner)`);
      if (r.bottom > foot.top) f.push('a card under the footer');
    }
    for (const b of document.querySelectorAll('[data-lcs-htd-box]')) {
      const r = b.getBoundingClientRect();
      if (r.bottom > foot.top + 0.5) f.push('a paper under the footer');
      if (r.left < lane.left - 1 || r.right > lane.right + 1) f.push('a paper outside the page');
    }
    const body = document.querySelector('.ws-body').getBoundingClientRect();
    const low = Math.max(...[...R.querySelectorAll('*')].map((e) => e.getBoundingClientRect().bottom));
    if (low > body.bottom + 0.5) f.push(`the content runs ${Math.round(low - body.bottom)} px below the body`);
    return { f, bodyH: Math.round(body.height), stack: Math.round(low - R.getBoundingClientRect().top) };
  }, mode, band);
  // the greyscale law: rasterise every step card at 150 px; the new lines' mean luma in [135,170], the earlier lines' < 80
  const luma = async () => page.evaluate(async () => {
    const f = [];
    const draw = (svgText) => new Promise((res, rej) => { const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText))); });
    const px = (img) => { const c = document.createElement('canvas'); c.width = 150; c.height = 150; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 150, 150); x.drawImage(img, 0, 0, 150, 150); return x.getImageData(0, 0, 150, 150).data; };
    const Y = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const cards = [...document.querySelectorAll('svg[data-lcs-prim="htd-step"]')];
    for (const c of cards) {
      const k = +c.dataset.lcsStep, paths = [...c.querySelectorAll('path')];
      if (paths.length < 2) continue;                                     // card 1: only the outline (no earlier lines)
      const mask = (keep) => { const s = c.cloneNode(true); s.setAttribute('width', 150); s.setAttribute('height', 150); [...s.querySelectorAll('path')].forEach((p, i) => { if (keep(i)) p.setAttribute('fill', '#000000'); else p.remove(); }); [...s.querySelectorAll('ellipse, rect')].forEach((e) => e.remove()); return new XMLSerializer().serializeToString(s); };
      const real = c.cloneNode(true); real.setAttribute('width', 150); real.setAttribute('height', 150);
      const [a, b, r] = await Promise.all([draw(mask((i) => i === paths.length - 1)), draw(mask((i) => i < paths.length - 1)), draw(new XMLSerializer().serializeToString(real))]);
      const A = px(a), Bm = px(b), Rp = px(r);
      let sa = 0, na = 0, sb = 0, nb = 0;
      for (let i = 0; i < A.length; i += 4) {
        const inA = Y(A, i) < 40, inB = Y(Bm, i) < 40;   // core pixels only: the anti-aliased rim of a 2 px line is mostly paper
        if (inA && !inB) { sa += Y(Rp, i); na++; } else if (inB && !inA) { sb += Y(Rp, i); nb++; }
      }
      const isLast = k === Math.max(...cards.map((x) => +x.dataset.lcsStep));   // the finished drawing is in ink on every face (the order face too)
      if (na < 20) { f.push(`card ${k}: the new lines cover ${na} px (measured nothing)`); continue; }
      const ma = sa / na, mb = nb ? sb / nb : 0;
      if (!isLast && (ma < 135 || ma > 170)) f.push(`card ${k}: new lines mean luma ${ma.toFixed(0)} (135-170)`);
      if (nb && mb >= 80) f.push(`card ${k}: earlier lines mean luma ${mb.toFixed(0)} (< 80)`);
    }
    return f;
  });
  const render = async (mode, d, variant, strings, tag, loc = 'en') => {
    const spec = load(mode);
    const unit = spec.difficulty[d].unit || B.unitFor(B.HOW_TO_DRAW[loc] || EN, mode);
    const out = await renderInstance({ type: spec, theme: null, difficulty: d, locale: loc, unit, variant, strings: strings || resolveStrings(spec.id, loc, spec), page, outDir: OUTD, baseName: `K-396-gate-${tag}` });
    const band = (FACE_ROWS.find((r) => r[5].mode === mode) || [, , , , , , , , { gradeBand: 'K' }])[8];
    const fl = await floors(mode, (band && band.gradeBand) || 'K');
    const lu = mode === 'memory' || mode === 'grid' || mode === 'finish' ? [] : await luma();
    return { out, fl, lu };
  };
  try {
    const shipped = [];
    for (const d of [1, 2, 3]) {
      const { out, fl, lu } = await render('base', d, 1, undefined, `base-d${d}`, locArg);
      ok(!out.qa.verify.length, `base d${d}: verify ${out.qa.verify.join(' | ')}`);
      ok(!out.qa.lints.length, `base d${d}: lints ${out.qa.lints.join(' | ')}`);
      fl.f.forEach((x) => ok(false, `base d${d}: ${x}`));
      lu.forEach((x) => ok(false, `base d${d} greyscale: ${x}`));
      shipped.push(`base d${d} stack ${fl.stack}`);
    }
    for (const r of FACE_ROWS) {
      const mode = r[5].mode;
      const { out, fl, lu } = await render(mode, 2, 1, undefined, `${mode}`, locArg);
      ok(!out.qa.verify.length, `${mode}: verify ${out.qa.verify.join(' | ')}`);
      ok(!out.qa.lints.length, `${mode}: lints ${out.qa.lints.join(' | ')}`);
      fl.f.forEach((x) => ok(false, `${mode}: ${x}`));
      lu.forEach((x) => ok(false, `${mode} greyscale: ${x}`));
      ok(fl.stack <= 740, `${mode}: the stack is ${fl.stack} px (> 740)`);
      shipped.push(`${mode} stack ${fl.stack}`);
    }
    if (!quick) for (let v = 2; v <= 13; v++) {
      const { out, fl } = await render('order', 2, v, undefined, 'order-sweep', locArg);
      ok(!out.qa.verify.length && !out.qa.lints.length && !fl.f.length, `order seed v${v}: ${[...out.qa.verify, ...out.qa.lints, ...fl.f].join(' | ')}`);
    }
    // chrome stress on the base: one-line (814) / 2-line title + 150-char instruction (733, the tallest shipped chrome)
    const ins150 = 'Look at the four numbered steps and draw the cat on the big paper: first the outline, then the orange lines of each step, slowly and carefully, one line at a time.';
    const stress = [
      ['814', { title: 'How to Draw a Cat', instruction: 'Draw the cat on the paper.' }],
      // the tallest SHIPPED chrome (measured 2026-10-10 over 242 pages): a 2-line title + a 150-char (3-line) instruction — body 733
      ['733', { title: 'How to Draw a Cat Step by Step: Four Easy Steps', instruction: ins150 }],
    ];
    for (const [name, strings] of stress) {
      const { out, fl } = await render('base', 2, 1, strings, `stress${name}`);
      ok(!out.qa.verify.length && !out.qa.lints.length && !fl.f.length, `stress ${name}: ${[...out.qa.verify, ...out.qa.lints, ...fl.f].join(' | ')}`);
      shipped.push(`${name} body ${fl.bodyH} stack ${fl.stack}`);
    }
    console.log('render: ' + shipped.join(' · ') + (quick ? ' (order sweep skipped: --quick)' : ' · order x 12 more seeds'));

    // ---------------------------------------------------------------- 4. render poisons
    const baseSpec = load('base');
    const baseHtml = (await baseSpec.build({ difficulty: 2, locale: 'en', unit: 'animals-bw-3-cat-2' }, { rng: makeRng('pr') })).bodyHtml;
    const cardRe = (k) => new RegExp('<svg[^>]*data-lcs-prim="htd-step" data-lcs-step="' + k + '"[^>]*>[\\s\\S]*?<\\/svg>');
    const swapCards = (html, a, b) => { const A = html.match(cardRe(a))[0], Bb = html.match(cardRe(b))[0]; return html.replace(A, '\u0000').replace(Bb, A).replace('\u0000', Bb); };
    const V = (html, spec = baseSpec, tag = 'pr') => verifyHtml(page, html, spec, OUTD, tag);
    judge('PR1 cards 1 and 2 swapped in the DOM', await V(swapCards(baseHtml, 1, 2), baseSpec, 'pr1'), /cards out of step order|does not extend/);
    { const last = baseHtml.match(cardRe(4))[0]; const i = last.lastIndexOf('fill="#3A3530"'); const bad = last.slice(0, i) + 'fill="#F2784B"' + last.slice(i + 'fill="#3A3530"'.length); judge('PR2 the last card carrying coral', await V(baseHtml.replace(last, bad), baseSpec, 'pr2'), /the last card carries coral/); }
    judge('PR3 a drawing inside the paper', await V(baseHtml.replace(/(data-lcs-htd-role="primary"[^>]*>)/, '$1<svg width="10" height="10"><path d="M0 0h10v10z" fill="#3A3530"/></svg>'), baseSpec, 'pr3'), /a drawing inside a paper/);
    judge('PR6 a paper stamp lying about its size', await V(baseHtml.replace('data-lcs-htd-box="449x504"', 'data-lcs-htd-box="449x600"'), baseSpec, 'pr6'), /renders \d+x\d+/);
    judge('PR7 stray text in the body', await V(baseHtml.replace(/(data-lcs-how-to-draw[^>]*>)/, '$1<svg width="40" height="20"><text x="2" y="14">cat</text></svg>'), baseSpec, 'pr7'), /stray text in the body/);
    judge('PR8 a coral fill outside a card', await V(baseHtml.replace(/(data-lcs-how-to-draw[^>]*>)/, '$1<svg width="10" height="10"><path d="M0 0h10v10z" fill="#F2784B"/></svg>'), baseSpec, 'pr8'), /a coral fill outside a step card/);
    { const b2 = baseHtml.replace(/data-lcs-htd-n="2"([^>]*>)2</, 'data-lcs-htd-n="2"$13<'); judge('PR10 a badge whose digit is not its step', await V(b2, baseSpec, 'pr10'), /badge \d text/); }
    {
      // PR11 the greyscale law: card 2's new lines in INK (nothing coral on a middle card)
      const c2 = baseHtml.match(cardRe(2))[0]; const bad = c2.replace('fill="#F2784B"', 'fill="#3A3530"');
      await verifyHtml(page, baseHtml.replace(c2, bad), baseSpec, OUTD, 'pr11');
      judge('PR11 card 2 highlighted in ink (greyscale)', await luma(), /new lines mean luma \d+ \(135-170\)/);
    }
    {
      const oSpec = load('order');
      const oHtml = (await oSpec.build({ difficulty: 2, locale: 'en', unit: 'animals-bw-5-owl' }, { rng: makeRng('pr4') })).bodyHtml;
      // PR4: the five cards put back in step order
      const blocks = [1, 2, 3, 4, 5].map((k) => oHtml.match(cardRe(k))[0]);
      const domOrder = [...oHtml.matchAll(/data-lcs-step="(\d)"/g)].map((m) => +m[1]);
      let fixed = oHtml; domOrder.forEach((k, i) => { fixed = fixed.replace(blocks[k - 1], '\u0001' + i + '\u0001'); }); domOrder.forEach((k, i) => { fixed = fixed.replace('\u0001' + i + '\u0001', blocks[i]); });
      judge('PR4 the order face with the cards in order', await V(fixed, oSpec, 'pr4'), /in order or break the scramble law/);
    }
    {
      const fSpec = load('finish');
      const fHtml = (await fSpec.build({ difficulty: 2, locale: 'en', unit: 'farm-animals-bw-pony' }, { rng: makeRng('pr5') })).bodyHtml;
      judge('PR5 the finish copy omitting the outline', await V(fHtml.replace(/data-lcs-omit="[\d,]+"/, 'data-lcs-omit="0"'), fSpec, 'pr5'), /copy omits the outline/);
    }
    {
      const wSpec = load('word');
      const wHtml = (await wSpec.build({ difficulty: 2, locale: 'en', unit: 'animals-bw-3-fish-2' }, { rng: makeRng('pr12') })).bodyHtml;
      judge('PR12 the word printed under a step card', await V(wHtml.replace(/(data-lcs-how-to-draw[^>]*>)/, '$1<svg width="40" height="20"><text x="2" y="14">fish</text></svg>'), wSpec, 'pr12'), /the noun is printed outside the lane/);
    }
  } finally { await browser.close(); }

  console.log('poison:\n' + plog.join('\n'));
  if (fails.length) console.log('findings:\n  ' + fails.join('\n  '));
  const pass = !fails.length && killed === poisons;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${poisons} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${poisons} poisons killed)`);
  return pass;
}

async function verifyHtml(page, bodyHtml, spec, outDir, tag, strings) {
  const { buildPage } = require('../page/shell.js');
  const st = strings || spec.i18n.en;
  const html = buildPage({ title: st.title, instruction: st.instruction, bodyHtml, locale: 'en', pageSize: 'letter' });
  const f = path.join(outDir, `K-396-gate-${tag}.html`);
  fs.writeFileSync(f, html);
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 1 });
  await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  return spec.verify(page);
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank };
