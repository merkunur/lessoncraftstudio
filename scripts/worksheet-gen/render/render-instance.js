/**
 * Render one worksheet instance: build HTML → Puppeteer → QA lints +
 * type verify → PDF (vector) + screenshot (thumbnail/design review).
 */
'use strict';
const path = require('path');
const { measureKeyPage, judgeKey } = require('../qa/key-text-measure.js');   // every answer key is measured before it ships
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
  let strings = resolveUnitTokens((o.strings) || (type.i18n && type.i18n[locale]) || type.i18n.en, type, unit, locale);
  const built = await type.build({ theme, difficulty, locale, unit }, { rng, variant: o.variant || 1, ...(o.seedVariant ? { seedVariant: o.seedVariant } : {}), ...(o.buildExtra || {}) });
  // instance tokens (b8 F13, 2026-10-12): a build may name values only it knows — the letter a hop run ends on — as
  // { LAST: 'R' }; they fill {LAST} in the instruction on every page (print, screen, key) and in the deck (r.strings).
  // An unfilled token is refused: a child must never read '{LAST}'.
  if (built.tokens) strings = { ...strings, instruction: String(strings.instruction).replace(/{([A-Z]+)}/g, (m0, k) => (built.tokens[k] != null ? built.tokens[k] : m0)) };
  if (/{[A-Z]+}/.test(strings.instruction || '')) throw new Error('render-instance: ' + type.id + ' instruction keeps an unfilled token: ' + strings.instruction);
  // the heading PRINTED on every page (a corrected printTitle when the face has one; the search title stays strings.title)
  const head = strings.printTitle || strings.title;
  const html = buildPage({
    title: head,
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
    await load(buildPage({ title: head, instruction: o.interactiveInstruction, bodyHtml: screenBuilt.bodyHtml, locale, pageSize, pageHeight: spec.screenHeight || null }), '.screen');
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
      await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      const keyLints = judgeKey(await measureKeyPage(page), 'answer key');   // every key is MEASURED (qa/key-text-measure.js)
      interactive = { kind: spec.kind, items, marks: got.marks, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
    }
    // PAINT mode (tap-paint, Color by Number 2026-10-04): the page's own line drawing is laid exactly over the screen
    // render (the parts are irregular shapes, not boxes); the crayons of the key are the palette. Items = the coloured
    // parts, each with its colour (the runtime's answer map; the robot's oracle recomputes it from the design data).
    if (spec.kind === 'tap-paint') {
      const got = await page.evaluate(() => {
        const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: full.height };
        const pct = (r) => ({ x: (r.left - full.left) / full.width * 100, y: (r.top - full.top) / full.height * 100, w: r.width / full.width * 100, h: r.height / full.height * 100 });
        const svg = document.querySelector('svg[data-lcs-prim="cbn-art"]');
        if (!svg) return null;
        const items = [...svg.querySelectorAll('path[data-lcs-region]')].filter((p) => p.getAttribute('data-lcs-colour') !== 'none')
          .map((p) => ({ region: +p.getAttribute('data-lcs-region'), answer: p.getAttribute('data-lcs-colour') }));
        const crayons = [...document.querySelectorAll('[data-lcs-crayon]')].map((c) => ({ ...pct(c.getBoundingClientRect()), colour: c.getAttribute('data-lcs-crayon'), label: c.getAttribute('data-lcs-label') || '' }));
        const clone = svg.cloneNode(true);
        clone.removeAttribute('width'); clone.removeAttribute('height');
        clone.querySelectorAll('[data-lcs-colour]').forEach((p) => p.removeAttribute('data-lcs-colour'));
        // the page's frame clips the picture to a rounded corner (overflow:hidden); the overlay must carry the same clip or
        // its square corners cover the frame's curve. Inner radius = border-radius − border width, as % of the SVG box.
        const sb = svg.getBoundingClientRect(), fs = getComputedStyle(svg.parentElement);
        const inner = Math.max(0, parseFloat(fs.borderTopLeftRadius) - parseFloat(fs.borderTopWidth));
        const clip = inner > 0 ? { rx: +(inner / sb.width * 100).toFixed(3), ry: +(inner / sb.height * 100).toFixed(3) } : {};
        return { art: { ...pct(sb), ...clip, svg: clone.outerHTML }, items, crayons };
      });
      if (!got) throw new Error(`render-instance: ${type.id} is tap-paint but the screen has no cbn-art picture`);
      const screenPng = base + '.screen.png';
      await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
      const keyBuilt = await again({ answerKey: true });
      sameAs(keyBuilt, 'answer-key');
      await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      const keyLints = judgeKey(await measureKeyPage(page), 'answer key');
      const { PALETTE } = require('../lib/cbn-render.js');
      interactive = { kind: spec.kind, items: got.items.map((it) => ({ ...it, meta: { 'data-lcs-region': String(it.region) } })), paint: { art: got.art, crayons: got.crayons, hex: PALETTE },
        pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
    }
    // TRACE mode (trace-path, Handmade Mazes b8 2026-10-11): the maze graph the page DECLARES (data-lcs-hm-graph on
    // the scene SVG, body px) is converted to % of the screen crop; the two mouths become edges to virtual start / goal
    // nodes (the start disc, the goal flag) so the child's ink begins at the disc and must reach the flag.
    if (spec.kind === 'trace-path') {
      const got = await page.evaluate(() => {
        const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        const svg = document.querySelector('svg[data-lcs-prim="hm-scene"]');
        if (!svg) return null;
        const r = svg.getBoundingClientRect(), vbw = svg.viewBox.baseVal.width, k = r.width / vbw;
        const h = Math.min(full.height, r.bottom - full.top + 24);
        window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: h };
        const G = JSON.parse(svg.getAttribute('data-lcs-hm-graph'));
        const P = (p) => [+(((r.left - full.left) + p[0] * k) / full.width * 100).toFixed(3), +(((r.top - full.top) + p[1] * k) / h * 100).toFixed(3)];
        const nodes = G.nodes.map(P);
        const edges = G.edges.map((e) => ({ a: e.a, b: e.b, pts: e.pts.map(P) }));
        // every route gets its own virtual start (its disc) and goal (its flag); one route on every face but F7
        const RTs = G.routes || [{ route: G.route, s: G.s, g: G.g, start: G.mouths.start, goal: G.mouths.goal }];
        const routes = RTs.map((rt) => {
          const vS = nodes.length; nodes.push(P(rt.start[rt.start.length - 1])); edges.push({ a: vS, b: rt.s, pts: rt.start.slice().reverse().map(P) });
          // an open-ended route (F13: the run stops on its last cell, no flag) has no virtual goal
          if (!rt.goal) return { start: vS, goal: rt.g, path: [vS].concat(rt.route) };
          const vG = nodes.length; nodes.push(P(rt.goal[rt.goal.length - 1])); edges.push({ a: rt.g, b: vG, pts: rt.goal.map(P) });
          return { start: vS, goal: vG, path: [vS].concat(rt.route, [vG]) };
        });
        const path = routes[0].path;
        // looped label faces: the labels and the rule travel with the graph (the robot recomputes the one valid path from
        // them); every face carries its answer path (the runtime compares the drawn path with it: on a looped page the goal
        // is reachable along wrong routes, so reaching it is not enough)
        const labels = G.labels ? G.labels.concat(nodes.slice(G.labels.length).map(() => null)) : null;
        return { trace: { nodes, edges, routes, aspect: full.width / h, pageW: full.width / k, w: G.W, hint: G.hint || null, ...(labels ? { labels, rule: G.rule } : {}) }, route: path };
      });
      if (!got) throw new Error(`render-instance: ${type.id} is trace-path but the screen has no maze scene`);
      // the family's runtime words (Go back, Keep going …) in the page's language — a locale without them refuses
      if (spec.chrome) got.trace.chrome = spec.chrome(locale, unit);
      const screenPng = base + '.screen.png';
      await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
      const keyBuilt = await again({ answerKey: true });
      sameAs(keyBuilt, 'answer-key');
      await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      if (o.keyPng) await page.screenshot({ path: base + '.key.png', fullPage: true });
      const keyLints = judgeKey(await measureKeyPage(page), 'answer key');
      interactive = { kind: spec.kind, items: got.trace.routes.map((_r, i) => ({ label: 'route ' + (i + 1), meta: { 'data-lcs-hm-route': String(i) }, answer: got.trace.routes[i].path.join('-') })),
        trace: got.trace, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
    }
    // SET-CLOCK (Telling Time Level Set 2026-10-14): each card's empty clock face — its centre and its face radius (the
    // card stamps the face's radius / size, data-lcs-rf) in % of the crop; the child drags the hands onto it
    if (spec.kind === 'set-clock') {
      const got = await page.evaluate((sel) => {
        const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        const els = [...document.querySelectorAll(sel)];
        const lowest = Math.max(...els.map((el) => el.getBoundingClientRect().bottom));
        const pg = { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
        window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: pg.height };
        const items = els.map((el) => {
          const svg = el.querySelector('svg[data-lcs-prim="clock"]'), r = svg.getBoundingClientRect(), rf = +el.getAttribute('data-lcs-rf');
          return { cx: ((r.left + r.width / 2 - pg.left) / pg.width) * 100, cy: ((r.top + r.height / 2 - pg.top) / pg.height) * 100, r: (rf * r.width / pg.width) * 100,
            answer: el.getAttribute('data-lcs-tq'), label: el.getAttribute('data-lcs-tq'), meta: { 'data-lcs-tq': el.getAttribute('data-lcs-tq'), 'data-lcs-step': el.getAttribute('data-lcs-step') } };
        });
        return { items, aspect: pg.width / pg.height };
      }, spec.item);
      if (!got.items.length || got.items.some((it) => !(it.r > 0))) throw new Error(`render-instance: ${type.id} set-clock screen without measurable clock faces`);
      const screenPng = base + '.screen.png';
      await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
      const keyBuilt = await again({ answerKey: true });
      sameAs(keyBuilt, 'answer-key');
      await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      const keyLints = judgeKey(await measureKeyPage(page), 'answer key')
        .concat((await runLints(page, { gradeBand: type.gradeBand })).filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l));
      interactive = { kind: spec.kind, items: got.items, clock: { aspect: got.aspect, names: spec.clockNames(locale) }, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
    }
    // MARK-GRID (Logic Grid Puzzles Level Set 2026-10-15): every empty cell of every printed grid, measured against the crop;
    // graded rows = the child rows of each grid (a two-attribute page also has a picture × picture body: marks, not graded).
    // The clue stamps travel in ctx so the robot's oracle can solve each case itself.
    if (spec.kind === 'mark-grid') {
      const got = await page.evaluate(() => {
        const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        const grids = [...document.querySelectorAll('[data-lcs-grid]')];
        const lowest = Math.max(...grids.map((g) => g.getBoundingClientRect().bottom));
        const pg = { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
        window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: pg.height };
        const box = (r) => ({ x: ((r.left - pg.left) / pg.width) * 100, y: ((r.top - pg.top) / pg.height) * 100, w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100 });
        const cells = [], items = [], cases = [];
        for (const sec of document.querySelectorAll('section[data-lcs-puzzle]')) {
          const p = sec.getAttribute('data-lcs-puzzle'), n = +sec.getAttribute('data-lcs-size');
          const clues = JSON.parse(sec.getAttribute('data-lcs-clues'));
          const sol = sec.getAttribute('data-lcs-solution');
          const names = JSON.parse(sec.getAttribute('data-lcs-forms')).map((f) => f.nom);
          const grid = sec.querySelector('[data-lcs-grid]');
          const two = grid.hasAttribute('data-lcs-lgrid');
          const alt = (sel) => { const im = grid.querySelector(sel); return im ? im.getAttribute('alt') || '' : ''; };
          cases.push(two ? { g: 'two', mode: 'two', n, clues } : { g: p, mode: 'one', n, clues });
          const answers = {};
          if (two) sol.split(';').forEach((part) => { const [g, v] = part.split(':'); answers[g] = v.split(',').map(Number); });
          else answers[p] = sol.split(',').map(Number);
          for (const rect of grid.querySelectorAll('rect[data-lcs-cell]')) {
            const id = rect.getAttribute('data-lcs-cell').split(':');
            const g = id[0], r = +id[1], c = +id[2];
            const rowLabel = g === 'pc' ? alt('[data-lcs-rowpic="' + r + '"]') : names[r];
            const colLabel = alt('[data-lcs-col="' + (g === 'nc' ? n + c : c) + '"]');
            cells.push({ ...box(rect.getBoundingClientRect()), g, r, c, label: rowLabel + ' — ' + colLabel });
          }
          for (const g of Object.keys(answers)) answers[g].forEach((col, r) => items.push({ label: names[r], meta: { 'data-lcs-row': g + ':' + r }, answer: col }));
        }
        return { cells, items, cases };
      });
      if (!got.cells.length || !got.items.length) throw new Error(`render-instance: ${type.id} mark-grid screen without grid cells`);
      const screenPng = base + '.screen.png';
      await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
      const keyBuilt = await again({ answerKey: true });
      sameAs(keyBuilt, 'answer-key');
      await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
      const keyPdf = base + '.key.pdf';
      await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
      if (o.keyPng) await page.screenshot({ path: base + '.key.png', fullPage: true });
      const keyLints = judgeKey(await measureKeyPage(page), 'answer key')
        .concat((await runLints(page, { gradeBand: type.gradeBand })).filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l));
      interactive = { kind: spec.kind, items: got.items, grid: { cells: got.cells, cases: got.cases }, pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
      return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
    }
    // the screen picture is CROPPED just below the lowest item (no empty half page on a phone);
    // every rectangle is measured against that crop
    const geo = await page.evaluate((sp) => {
      const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      // the crop also keeps [data-lcs-keep] rows: printed parts of the task BELOW the last tappable item (Days and Months
      // 2026-10-06: a printed "1 Sunday" under the last card was cut off the live screen)
      const lowest = Math.max(...[...document.querySelectorAll(sp.item + ', [data-lcs-keep]')].map((el) => el.getBoundingClientRect().bottom));
      const pg = { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
      window.__lcsClip = { x: full.left + window.scrollX, y: full.top + window.scrollY, width: full.width, height: pg.height };
      window.__lcsPg = pg;
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
        if (sp.typeNum || sp.typeWord) {
          // type-number (Number Walls 2026-10-13): the item IS the empty box on the page; the child writes its number
          const meta = {};
          (sp.metaAttrs || []).forEach((a) => { meta[a] = el.getAttribute(a); });
          // type-word (Number Words 2026-10-13): the same write box, its answer the WORD
          return { ...box(r), answer: sp.typeWord ? (el.getAttribute(sp.answerAttr) || '') : Number(el.getAttribute(sp.answerAttr)), label: el.getAttribute(sp.labelAttr) || '', meta };
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
    }, { item: spec.item, slot: spec.slot, option: spec.option, select: spec.kind === 'tap-select', spell: spec.kind === 'tap-spell', typeNum: spec.kind === 'type-number', typeWord: spec.kind === 'type-word', tile: spec.tile, metaAttrs: spec.metaAttrs, answerAttr: spec.answerAttr, labelAttr: spec.labelAttr });
    // spec.picks (Odd and Even 2026-10-14, type-number): printed choices to TAP as well as the write boxes (circle odd or
    // even) — one group per choice, its options measured against the same crop; the page's data-lcs-correct is the answer
    const picks = spec.picks ? await page.evaluate((sp) => {
      const pg = window.__lcsPg;
      const box = (r) => ({ x: ((r.left - pg.left) / pg.width) * 100, y: ((r.top - pg.top) / pg.height) * 100, w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100 });
      return [...document.querySelectorAll(sp.group)].map((g) => {
        const opts = [...g.querySelectorAll(sp.option)];
        const meta = {}; (sp.metaAttrs || []).forEach((a) => { meta[a] = g.getAttribute(a); });
        return { options: opts.map((o) => ({ ...box(o.getBoundingClientRect()), label: o.getAttribute('data-lcs-label') || o.textContent.trim() })), answer: opts.findIndex((o) => o.hasAttribute('data-lcs-correct')), meta };
      });
    }, spec.picks) : null;
    const screenPng = base + '.screen.png';
    await page.screenshot({ path: screenPng, clip: await page.evaluate(() => window.__lcsClip) });
    // answer key: the printed page with every answer written in (a PDF for the teacher)
    const keyBuilt = await again({ answerKey: true });
    sameAs(keyBuilt, 'answer-key');
    await load(buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize }), '.key');
    const keyPdf = base + '.key.pdf';
    await page.pdf({ path: keyPdf, printBackground: true, preferCSSPageSize: true });
    // o.keyPng (reading sheets only, 2026-10-10): the key page as an image too
    if (o.keyPng) await page.screenshot({ path: base + '.key.png', fullPage: true });
    // Every answer key is MEASURED (operator ruling 2026-09-28 — a repeating mistake): an answer on a writing row
    // must sit on the base rule with its x-height at the dashed midline, a gap-box answer must be centered, and no
    // ::after text may sit over a row. A failure fails the deck, so a misaligned key can never be published.
    // the key is a printed page too: it must not run into the footer (2026-10-13, Number Words: the key's longer title —
    // "… — Answer key" — wrapped and pushed four-word cards onto the footer, which every page gate had passed)
    const keyLints = judgeKey(await measureKeyPage(page), 'answer key')
      .concat((await runLints(page, { gradeBand: type.gradeBand })).filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l));
    interactive = { kind: spec.kind, items: geo, ...(picks ? { picks } : {}), pngPath: screenPng, keyPdfPath: keyPdf, lints: screenLints.concat(keyLints) };
  }

  return { html, qa: { lints, verify }, pdfPath, pngPath, meta: built.meta, pageSize, seed: rng.seed, interactive, strings };
}

module.exports = { renderInstance };
