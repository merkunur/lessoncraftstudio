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
  const rng = makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.seedVariant || o.variant, unit }));

  // unit axis: {U}/{L}/{UNIT} resolve HERE (the sheet prints strings.title) —
  // the same object comes back for every type without the axis.
  const strings = resolveUnitTokens((o.strings) || (type.i18n && type.i18n[locale]) || type.i18n.en, type, unit, locale);
  const built = await type.build({ theme, difficulty, locale, unit }, { rng, variant: o.variant || 1, ...(o.seedVariant ? { seedVariant: o.seedVariant } : {}), ...(o.buildExtra || {}) });
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
    const again = (extra) => type.build({ theme, difficulty, locale, unit }, { rng: makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.seedVariant || o.variant, unit })), variant: o.variant || 1, ...(o.seedVariant ? { seedVariant: o.seedVariant } : {}), ...(o.buildExtra || {}), ...extra });
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
    await load(buildPage({ title: strings.title, instruction: o.interactiveInstruction, bodyHtml: screenBuilt.bodyHtml, locale, pageSize, pageHeight: spec.screenHeight || null }), '.screen');
    const screenLints = await runLints(page, { gradeBand: type.gradeBand });
    // LANES mode (tap-edit): the lanes are drawn LIVE by the runtime; the page image is only the
    // header (title, instruction, checklist), cropped just below it. Items travel as DATA.
    if (spec.lanes) {
      const got = await page.evaluate((sp) => {
        const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        const heads = [...document.querySelectorAll('[data-lcs-title], [data-lcs-instruction], [data-lcs-fixchip]')];
        const bottom = Math.max(...heads.map((h) => h.getBoundingClientRect().bottom));
        const clip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: Math.min(full.height, bottom - full.top + 18) };
        const root = document.querySelector('[data-lcs-marks]');
        const items = [...document.querySelectorAll(sp.item)].map((el) => ({
          canonical: el.getAttribute('data-lcs-canonical'), broken: el.getAttribute('data-lcs-broken-text'),
          icon: el.getAttribute('data-lcs-icon'), split: el.hasAttribute('data-lcs-split'),
        }));
        return { clip, items, marks: root ? root.getAttribute('data-lcs-marks') : '.' };
      }, { item: spec.item });
      const sharp = require('sharp');
      const items = [];
      for (const it of got.items) {
        const words = it.broken.split(' ').filter((w) => w && w !== '/');
        const answer = type.fixAnswers ? type.fixAnswers(it.canonical) : null;
        if (!answer || answer.length !== words.length) throw new Error(`render-instance: ${type.id} lane "${it.broken}" has ${words.length} words but its answer has ${answer ? answer.length : 0}`);
        answer.forEach((a, k) => { if (a.word.toLocaleLowerCase(locale) !== words[k]) throw new Error(`render-instance: ${type.id} word ${k + 1} "${words[k]}" != answer "${a.word}"`); });
        // the split marker sits after the word whose mark ends the first sentence
        const splitAfter = it.split ? it.broken.split(' ').filter(Boolean).indexOf('/') - 1 : -1;
        const iconPath = require('url').fileURLToPath(it.icon);
        const icon = 'data:image/png;base64,' + (await sharp(iconPath).resize(96, 96, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer()).toString('base64');
        items.push({ words, answer: answer.map((a) => ({ cap: a.cap, mark: a.mark })), splitAfter, icon, meta: { 'data-lcs-canonical': it.canonical } });
      }
      const screenPng = base + '.screen.png';
      await page.screenshot({ path: screenPng, clip: got.clip });
      const keyBuilt = await again({ answerKey: true });
      sameAs(keyBuilt, 'answer-key');
      await load(buildPage({ title: strings.title + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      interactive = { kind: spec.kind, items, marks: got.marks, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive };
    }
    // the screen picture is CROPPED just below the lowest item (no empty half page on a phone);
    // every rectangle is measured against that crop
    const geo = await page.evaluate((sp) => {
      const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      const lowest = Math.max(...[...document.querySelectorAll(sp.item)].map((el) => el.getBoundingClientRect().bottom));
      const pg = { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
      window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: pg.height };
      const pct = (v, base, size) => ((v - base) / size) * 100;
      const box = (r) => ({ x: pct(r.left, pg.left, pg.width), y: pct(r.top, pg.top, pg.height), w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100 });
      return [...document.querySelectorAll(sp.item)].map((el) => {
        const r = el.getBoundingClientRect();
        if (sp.spell) {
          // tap-spell: the item's letter tiles + its empty slots; the answer is the word (the page's own stamp)
          const meta = {};
          (sp.metaAttrs || []).forEach((a) => { meta[a] = el.getAttribute(a); });
          return {
            ...box(r), answer: el.getAttribute(sp.answerAttr) || '', label: el.getAttribute(sp.labelAttr) || '', meta,
            tiles: [...el.querySelectorAll(sp.tile)].map((t) => ({ ...box(t.getBoundingClientRect()), label: t.getAttribute('data-lcs-label') || t.textContent.trim() })),
            slots: [...el.querySelectorAll(sp.slot)].map((t) => box(t.getBoundingClientRect())),
          };
        }
        if (sp.select) {
          // tap-select: the item itself is the target; its answer is true / false (the page's own mark)
          const meta = {};
          (sp.metaAttrs || []).forEach((a) => { meta[a] = el.getAttribute(a); });
          return { ...box(r), answer: el.hasAttribute(sp.answerAttr), label: el.getAttribute(sp.labelAttr) || el.textContent.trim(), meta };
        }
        if (sp.option) {
          // tap-choice: one answer per item = the index of the option the page marks correct
          const opts = [...el.querySelectorAll(sp.option)];
          const meta = {};
          (sp.metaAttrs || []).forEach((a) => { meta[a] = el.getAttribute(a); });
          return {
            ...box(r), options: opts.map((o) => ({ ...box(o.getBoundingClientRect()), label: o.getAttribute('data-lcs-label') || o.textContent.trim() })),
            answer: opts.findIndex((o) => o.hasAttribute('data-lcs-correct')), label: el.getAttribute('data-lcs-word') || '', meta,
          };
        }
        const slotEl = el.querySelector(sp.slot);
        const s = slotEl ? slotEl.getBoundingClientRect() : null;
        return {
          x: pct(r.left, pg.left, pg.width), y: pct(r.top, pg.top, pg.height), w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100,
          sx: s ? pct(s.left, pg.left, pg.width) : NaN, sy: s ? pct(s.top, pg.top, pg.height) : NaN, sw: s ? (s.width / pg.width) * 100 : NaN, sh: s ? (s.height / pg.height) * 100 : NaN,
          answer: Number(el.getAttribute(sp.answerAttr)), label: el.getAttribute(sp.labelAttr) || '',
        };
      });
    }, { item: spec.item, slot: spec.slot, option: spec.option, select: spec.kind === 'tap-select', spell: spec.kind === 'tap-spell', tile: spec.tile, metaAttrs: spec.metaAttrs, answerAttr: spec.answerAttr, labelAttr: spec.labelAttr });
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
