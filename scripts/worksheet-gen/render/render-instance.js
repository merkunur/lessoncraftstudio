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

/**
 * @param {object} o { type, theme, difficulty, locale, variant, pageSize, outDir, baseName, page (puppeteer Page) }
 * @returns {object} { html, qa: {lints, verify}, pdfPath, pngPath, meta }
 */
async function renderInstance(o) {
  const { type, theme, difficulty, locale, page } = o;
  const pageSize = o.pageSize || (locale === 'en' ? 'letter' : 'a4');
  const rng = makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.variant }));

  const strings = (o.strings) || (type.i18n && type.i18n[locale]) || type.i18n.en;
  const built = await type.build({ theme, difficulty, locale }, { rng });
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

  return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed };
}

module.exports = { renderInstance };
