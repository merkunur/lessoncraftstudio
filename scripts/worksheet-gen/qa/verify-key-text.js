#!/usr/bin/env node
/**
 * verify-key-text.js [--locales=en,de,fi] [--types=A,B] [--poison] [--contract-only]
 *
 * The MEASURED gate for every answer an ANSWER KEY writes onto a school-line writing frame (operator report
 * 2026-09-28: ABC Order, Opposites and Personal Pronouns keys had their words sitting under / over the lines,
 * because each key placed its text with a guessed CSS offset — `bottom:6px`, `::after … bottom:14px`).
 * The worksheets' own starters were fixed the same way on 2026-09-21 (qa/verify-ruling-starters.js); this is the
 * same measurement pointed at the keys.
 *
 * Discovery: every spec on disk that declares `interactive` (the Level Set types) — its answer key
 * (ctx.answerKey) at levels 1-3, copy 2, per locale, rendered through the REAL pipeline (render-instance, the key
 * body in the printed shell). Per page, in page px:
 *   rows   every svg[data-lcs-prim="writing-row"]: its three rules (top / dashed mid / base)
 *   texts  every <text> inside a row, and every HTML text laid over a row (a span positioned onto it)
 *   A  baseline == base rule (±1)      B  baseline − x-height ink == mid rule (±1.5)
 *   C  ink never over the top rule, never past the row's right end
 *   P  no ::after with text content over a writing row (a guessed offset cannot be measured — never allowed)
 *   G  a [data-lcs-gapbox] ::after answer is centered in its box (absolute, inset 0, flex, centered)
 * --poison  on the first measured page: a seated answer shifted 6 px (must fail A) and re-sized by 0.78·glyphH
 *           (must fail B); a control key with no writing rows must report "no answers on rows", never PASS.
 * --contract-only  the static half, no browser: no key CSS positions ::after text into a writing row.
 * Exit 1 on any failure.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'out', 'dev', 'key-text');
const argv = process.argv.slice(2);
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const LOCALES = String(arg('locales', 'en,de,fi')).split(',').filter(Boolean);
const ONLY = arg('types', null) ? new Set(arg('types').split(',')) : null;
const POISON = argv.includes('--poison');

function specs() { return loadAllTypes().filter((s) => s.id && s.interactive && (!ONLY || ONLY.has(s.id))); }

/* the static half: a key's CSS must never write text into a writing row with ::after */
function contract() {
  const fails = [];
  const { makeRng, instanceSeed } = require('../lib/rng.js');
  for (const t of specs()) for (const d of [1, 2, 3]) {
    if (!t.difficulty || !t.difficulty[d]) continue;
    let html;
    try { html = String(t.build({ theme: null, difficulty: d, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: d, seedEpoch: 1, variant: 2 })), variant: 2, answerKey: true }).bodyHtml); } catch (e) { continue; }
    const css = (html.match(/<style data-lcs-key>([\s\S]*?)<\/style>/) || [])[1] || '';
    for (const rule of css.split('}')) {
      if (!/::after\s*\{[^]*content:\s*"[^"]/.test(rule + '}')) continue;
      if (/ruling-row|writing-row|data-lcs-answer-line|data-lcs-frame-line|data-lcs-pair=|data-lcs-prefix-slot/.test(rule)) fails.push(`${t.id} d${d}: key CSS writes ::after text onto a writing row: ${rule.trim().slice(0, 110)}`);
    }
  }
  return fails;
}

const { measureKeyPage: measure, judgeKey: judge } = require('./key-text-measure.js');

async function main() {
  if (argv.includes('--contract-only')) {
    const f = contract();
    for (const x of f) console.log('FAIL ' + x);
    console.log(f.length ? `verify-key-text --contract-only: ${f.length} failures` : 'verify-key-text --contract-only: PASS (no key writes ::after text onto a writing row)');
    process.exit(f.length ? 1 : 0);
  }
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const fails = [];
  let pages = 0, measured = 0, withRows = 0, poisonPage = null;
  for (const type of specs()) for (const d of [1, 2, 3]) {
    if (!type.difficulty || !type.difficulty[d]) continue;
    for (const loc of LOCALES) {
      // the key body in the printed shell: a wrapper whose build() is the key build
      const keyType = { ...type, interactive: undefined, verify: undefined, build: (o, ctx) => type.build(o, { ...ctx, answerKey: true }) };
      const base = `${type.id}-d${d}-${loc}`;
      let r;
      // themed types: the first theme the page accepts (a type legitimately refuses some themes)
      const themes = type.themeAxis && type.themeAxis.applicable ? ['animals', 'fruits', 'food', 'toys', 'vehicles', 'clothing'] : [null];
      let last = null;
      for (const theme of themes) {
        try { r = await renderInstance({ type: keyType, theme, difficulty: d, locale: loc, unit: null, variant: 2, seedVariant: 2, page, outDir: OUT, baseName: base }); break; }
        catch (e) { last = e; }
      }
      if (!r) { if (!/refus|REFUSED|no difficulty|cannot deal|cannot satisfy|past the \d+ shares/i.test(last.message)) fails.push(`${base}: render threw ${last.message.slice(0, 120)}`); continue; }
      pages++;
      await page.goto(require('url').pathToFileURL(path.join(OUT, base + '.html')).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const m = await measure(page);
      if (m.rows) withRows++;
      measured += m.texts.length + m.pseudo.length;
      const f = judge(m, `${type.id} L${d} ${loc}`);
      if (f.length) { fails.push(...f.slice(0, 3)); if (f.length > 3) fails.push(`${type.id} L${d} ${loc}: … ${f.length - 3} more`); }
      if (!poisonPage && m.texts.some((s) => !s.starter)) poisonPage = path.join(OUT, base + '.html');
      console.log(`${type.id} L${d} ${loc}: rows ${m.rows} · answers on rows ${m.texts.length} · ::after over rows ${m.pseudo.length} · gap boxes ${m.gap.length}${f.length ? ' — ' + f.length + ' FAIL' : ''}`);
    }
  }
  if (!pages || !withRows) fails.push(`non-vacuity: ${pages} key pages, ${withRows} with writing rows`);
  if (POISON) {
    if (!poisonPage) fails.push('poison: no page with a seated key answer to poison');
    else {
      const html = fs.readFileSync(poisonPage, 'utf8');
      const run = async (h, want, name) => {
        const p = poisonPage.replace(/\.html$/, `.poison-${name}.html`);
        fs.writeFileSync(p, h);
        await page.goto(require('url').pathToFileURL(p).href, { waitUntil: 'networkidle0' });
        await page.evaluate(() => document.fonts.ready);
        const f = judge(await measure(page), 'poison');
        const hit = f.some((x) => x.includes(`(${want})`));
        console.log(`  ${hit ? '✓ killed' : '✗ SURVIVED'}: ${name}`);
        if (!hit) fails.push(`poison ${name} survived`);
      };
      // attribute-order-agnostic: rewrite ONE attribute inside the first keytext tag (the first poisons matched
      // nothing because the attribute order differed — a vacuous poison is now a failure of its own)
      const inKeyTag = (h, attr, fn) => h.replace(/<text[^>]*data-lcs-keytext[^>]*>/, (tag) => tag.replace(new RegExp(`\\s${attr}="([\\d.]+)"`), (_, v) => ` ${attr}="${fn(+v)}"`));
      const shifted = inKeyTag(html, 'y', (y) => (y + 6).toFixed(1));
      const resized = inKeyTag(html, 'font-size', (px) => (px * 1.45).toFixed(1));
      const wrapped = html.replace(/<svg[^>]*data-lcs-prim="writing-row"[\s\S]*?<\/svg>/, (m) => `<span data-poison-row style="position:relative;display:inline-block">${m}</span>`)
        .replace('</body>', '<style>[data-poison-row]::after{content:"He runs.";position:absolute;left:8px;bottom:12px}</style></body>');
      for (const [h, name] of [[shifted, 'shift-6px'], [resized, 'resize'], [wrapped, 'after-over-row']]) if (h === html) fails.push(`poison ${name}: the mutation changed nothing (vacuous)`);
      await run(shifted, 'A', 'shift-6px');
      await run(resized, 'B', 'resize');
      await run(wrapped, 'P', 'after-over-row');
    }
  }
  await browser.close();
  for (const f of fails) console.log('FAIL ' + f);
  console.log(`verify-key-text: ${pages} key pages (${withRows} with writing rows), ${measured} answers measured — ${fails.length ? fails.length + ' failures' : 'PASS'}`);
  process.exit(fails.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
