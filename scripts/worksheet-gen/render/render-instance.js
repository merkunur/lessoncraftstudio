/**
 * Render one worksheet instance: build HTML → Puppeteer → QA lints +
 * type verify → PDF (vector) + screenshot (thumbnail/design review).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { buildPage } = require('../page/shell.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { runLints } = require('../qa/lints.js');
const { resolveUnitTokens } = require('../lib/unit-axis.js');

/**
 * @param {object} o { type, theme, difficulty, locale, variant, pageSize, outDir, baseName, page (puppeteer Page) }
 * @returns {object} { html, qa: {lints, verify}, pdfPath, pngPath, meta }
 */
async function renderInstance(o) {
  const { type, theme, difficulty, locale, page } = o;
  const pageSize = o.pageSize || (locale === 'en' ? 'letter' : 'a4');
  const unit = o.unit || null;
  const rng = makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.variant, unit }));

  // unit axis: {U}/{L}/{UNIT} resolve HERE (the sheet prints strings.title) —
  // the same object comes back for every type without the axis.
  const strings = resolveUnitTokens((o.strings) || (type.i18n && type.i18n[locale]) || type.i18n.en, type, unit, locale);
  const built = await type.build({ theme, difficulty, locale, unit }, { rng, variant: o.variant || 1 });
  const html = buildPage({
    title: strings.title,
    instruction: strings.instruction,
    bodyHtml: built.bodyHtml,
    locale,
    pageSize,
  });

  // file:// subresources (fonts, images) are blocked from about:blank pages,
  // so write the doc to disk and navigate to it.
  fs.mkdirSync(o.outDir, { recursive: true });
  const htmlPath = path.join(o.outDir, o.baseName + '.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  // QA
  const lints = await runLints(page, { gradeBand: type.gradeBand });
  const verify = type.verify ? await type.verify(page) : [];

  // artifacts
  const base = path.join(o.outDir, o.baseName);
  const pdfPath = base + '.pdf';
  const pngPath = base + '.png';
  await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true });
  const el = await page.$('[data-lcs-page]');
  await el.screenshot({ path: pngPath });

  // Level Set 2026-09-27 — the SCREEN version + the ANSWER KEY, only when asked (o.interactive)
  // and only for a type that declares `interactive`. Both rebuild the SAME instance from a fresh
  // rng on the same seed, so the words and their order are identical to the printed page (asserted).
  let interactive = null;
  if (o.interactive && type.interactive) {
    const spec = type.interactive;
    const again = (extra) => type.build({ theme, difficulty, locale, unit }, { rng: makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.variant, unit })), variant: o.variant || 1, ...extra });
    const sameAs = (b2, what) => {
      if (JSON.stringify(b2.meta) !== JSON.stringify(built.meta)) throw new Error(`render-instance: the ${what} render drew different content than the printed page (${type.id})`);
    };
    const load = async (h, name) => {
      const p = path.join(o.outDir, o.baseName + name + '.html');
      fs.writeFileSync(p, h, 'utf8');
      await page.goto(require('url').pathToFileURL(p).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
    };
    // screen: no writing lines, the tap instruction (native-authored ×11)
    if (!o.interactiveInstruction) throw new Error('render-instance: ' + type.id + ' is interactive but no interactiveInstruction was given for ' + locale);
    const screenBuilt = await again({ interactive: true });
    sameAs(screenBuilt, 'screen');
    await load(buildPage({ title: strings.title, instruction: o.interactiveInstruction, bodyHtml: screenBuilt.bodyHtml, locale, pageSize }), '.screen');
    const screenLints = await runLints(page, { gradeBand: type.gradeBand });
    // the screen picture is CROPPED just below the lowest item (no empty half page on a phone);
    // every rectangle is measured against that crop
    const geo = await page.evaluate((sp) => {
      const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      const lowest = Math.max(...[...document.querySelectorAll(sp.item)].map((el) => el.getBoundingClientRect().bottom));
      const pg = { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
      window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: pg.height };
      const pct = (v, base, size) => ((v - base) / size) * 100;
      return [...document.querySelectorAll(sp.item)].map((el) => {
        const r = el.getBoundingClientRect(), slotEl = el.querySelector(sp.slot);
        const s = slotEl ? slotEl.getBoundingClientRect() : null;
        return {
          x: pct(r.left, pg.left, pg.width), y: pct(r.top, pg.top, pg.height), w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100,
          sx: s ? pct(s.left, pg.left, pg.width) : NaN, sy: s ? pct(s.top, pg.top, pg.height) : NaN, sw: s ? (s.width / pg.width) * 100 : NaN, sh: s ? (s.height / pg.height) * 100 : NaN,
          answer: Number(el.getAttribute(sp.answerAttr)), label: el.getAttribute(sp.labelAttr) || '',
        };
      });
    }, { item: spec.item, slot: spec.slot, answerAttr: spec.answerAttr, labelAttr: spec.labelAttr });
    const screenPng = base + '.screen.png';
    await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
    // answer key: the printed page with every answer written in (a PDF for the teacher)
    const keyBuilt = await again({ answerKey: true });
    sameAs(keyBuilt, 'answer-key');
    await load(buildPage({ title: strings.title + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
    const keyPdf = base + '.key.pdf';
    await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
    interactive = { kind: spec.kind, items: geo, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints };
  }

  return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive };
}

module.exports = { renderInstance };
