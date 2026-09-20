#!/usr/bin/env node
/**
 * verify-ruling-starters.js [--locales=en,de,…] [--quick] [--poison] [--types=A,B]
 *
 * The MEASURED gate for every pre-printed sentence starter that sits on a
 * school-line writing frame (rulingBlock starters — K-319/K-335 feelings
 * check-in, G2-278/299/300 picture writing, G2-318 frames + compare faces,
 * G1-309 d1 — and the G2-318 base factLane). Bought 2026-09-20: every one of
 * them shipped in 11 locales with its caps ON the dashed midline, because the
 * starter was sized by a guessed factor of glyphH and no verify() ever
 * compared the rendered text with the rules it sits on.
 *
 * Discovery (node, no browser): build() every spec on disk at d1-3 (en) and
 * keep the coordinates whose body carries `[data-lcs-starter]` — the gate
 * finds its own consumers, so a new starter surface is covered the day it is
 * written. Non-vacuity: the four surfaces the report named MUST be in the
 * discovered set, and K-327 (stroke-path words, a different primitive) must
 * NOT be.
 *
 * Measurement (Chromium, per starter, per locale) — all in PAGE pixels:
 *   rules   the three `line`s of the writing-row svg the starter sits on
 *           (top solid / mid dashed / base solid), mapped to page y
 *   base    the starter's rendered baseline (svg text: its y attr mapped
 *           through the svg's CTM; html span: a zero-size inline-block probe
 *           at vertical-align:baseline)
 *   ink     canvas TextMetrics of the starter's OWN computed font in the
 *           same document (document.fonts.check must be true — a fallback
 *           font failing this gate is the gate working)
 * and asserts:
 *   A  baseline == base rule            (± 1 px)
 *   B  baseline − xHeightInk == mid rule (± 1 px)   small letters fill the x band
 *   C  ascender ink ≤ (base − top) + 1  and ≥ 0.75·(base − top)   never over the top line, never dwarfed
 *   D  starter width ≤ 0.5 · row width  (the child needs the rest of the line)
 *   E  the starter starts at the row's left inset (svg: x ≈ 8)
 *
 * --poison  re-runs the measurement on the SAME rendered pages after
 *   mutating the html the way the old code emitted it — P1 font-size back to
 *   0.78·glyphH (must FAIL B and C), P2 y back to yBase−2 (must FAIL A) — and
 *   on a control page WITHOUT starters (G1-249), which must report "no
 *   starters", never PASS. Any poison that does not fire fails the run.
 * --quick   en only.  Exit 1 on any failure.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { loadAllTypes } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { resolveStrings } = require('../i18n/strings.js');
const { renderInstance } = require('../render/render-instance.js');

const WG = path.resolve(__dirname, '..');
const OUT_DIR = path.join(WG, 'out', 'dev', 'ruling-starters');
const ALL_LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MUST_HAVE = ['K-335', 'G2-278', 'G2-341', 'G2-318'];
const MUST_NOT = ['K-327'];
const CONTROL = { id: 'G1-249', theme: 'animals', difficulty: 2 };

const argv = process.argv.slice(2);
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const QUICK = argv.includes('--quick');
const POISON = argv.includes('--poison');
const LOCALES = QUICK ? ['en'] : String(arg('locales', ALL_LOCALES.join(','))).split(',').filter(Boolean);
const ONLY = arg('types', null) ? new Set(arg('types').split(',')) : null;

async function discover() {
  const specs = loadAllTypes().filter((s) => s.id && (!ONLY || ONLY.has(s.id)));
  const found = [];
  const errors = [];
  for (const type of specs) {
    const ax = type.themeAxis || {};
    const themes = ax.applicable ? (ax.bwOnly ? ['animals bw'] : ['animals', 'forest creatures']) : [null];
    for (const difficulty of [1, 2, 3]) {
      if (!type.difficulty || !type.difficulty[difficulty]) continue;
      let hit = null;
      for (const theme of themes) {
        try {
          const rng = makeRng(instanceSeed({ typeId: type.id, theme, difficulty, seedEpoch: 1 }));
          const built = await type.build({ theme, difficulty, locale: 'en', unit: null }, { rng });
          // only starters ON a writing row: rulingBlock's svg <text> and factLane's span (K-330's
          // data-lcs-starter is a STAGE stamp for a grapheme printed inside a sound box — not a frame)
          const n = (String(built.bodyHtml).match(/<text[^>]*data-lcs-starter="1"|<span data-lcs-starter(?![-\w])/g) || []).length;
          if (n) hit = { id: type.id, theme, difficulty, expect: n, type };
          break;   // built on this theme (with or without starters) — the answer for this (id, d)
        } catch (e) { errors.push(`${type.id} d${difficulty} ${theme}: ${String(e.message).slice(0, 90)}`); }
      }
      if (hit) found.push(hit);
    }
  }
  return { found, errors };
}

/** In-page measurement of every starter on the current page. */
async function measure(page) {
  return page.evaluate(() => {
    const out = { starters: [], fontOk: true };
    const cv = document.createElement('canvas').getContext('2d');
    const inkOf = (fontSpec) => {
      cv.font = fontSpec;
      return { x: cv.measureText('x').actualBoundingBoxAscent, b: cv.measureText('b').actualBoundingBoxAscent };
    };
    const rulesOf = (svg) => {
      const r = svg.getBoundingClientRect();
      const lines = [...svg.querySelectorAll('line')].filter((l) => l.getAttribute('y1') === l.getAttribute('y2'));
      const ys = lines.map((l) => {
        const p = svg.createSVGPoint(); p.x = 0; p.y = +l.getAttribute('y1');
        const q = p.matrixTransform(l.getScreenCTM());
        return { y: q.y, dashed: !!(l.getAttribute('stroke-dasharray') || l.getAttribute('dash')) };
      }).sort((a, b) => a.y - b.y);
      if (ys.length !== 3) return { error: `${ys.length} rules (want 3)`, box: r };
      return { top: ys[0].y, mid: ys[1].y, base: ys[2].y, midDashed: ys[1].dashed, box: r };
    };
    document.querySelectorAll('svg[data-lcs-prim="writing-row"] text[data-lcs-starter], [data-lcs-factlane] span[data-lcs-starter]').forEach((el, i) => {
      const rec = { i, text: el.textContent.trim(), kind: el instanceof SVGElement ? 'svg' : 'html' };
      const cs = getComputedStyle(el);
      const px = parseFloat(cs.fontSize);
      const spec = `${cs.fontWeight} ${px}px ${cs.fontFamily}`;
      if (!document.fonts.check(spec, 'xb')) out.fontOk = false;
      const ink = inkOf(spec);
      rec.px = px; rec.xInk = ink.x; rec.bInk = ink.b;
      let rules, baseline, left, rowW;
      if (rec.kind === 'svg') {
        const svg = el.ownerSVGElement;
        rules = rulesOf(svg);
        const p = svg.createSVGPoint(); p.x = +el.getAttribute('x'); p.y = +el.getAttribute('y');
        const q = p.matrixTransform(el.getScreenCTM());
        baseline = q.y; left = q.x - rules.box.left; rowW = rules.box.width;
      } else {
        const lane = el.closest('[data-lcs-factlane]');
        const svg = lane && lane.querySelector('svg');
        rules = svg ? rulesOf(svg) : { error: 'no writing-row svg beside the starter' };
        const probe = document.createElement('span');
        probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
        el.appendChild(probe);
        baseline = probe.getBoundingClientRect().top;
        probe.remove();
        const lr = lane.getBoundingClientRect();
        left = el.getBoundingClientRect().left - lr.left; rowW = lr.width;
      }
      rec.rules = rules; rec.baseline = baseline; rec.left = left; rec.rowW = rowW;
      rec.width = el.getBoundingClientRect().width;
      out.starters.push(rec);
    });
    return out;
  });
}

function judge(m, expectN, tag) {
  const fails = [];
  if (!m.fontOk) fails.push(`${tag}: the starter font is not loaded (fallback font measured)`);
  if (m.starters.length !== expectN) fails.push(`${tag}: ${m.starters.length} starters rendered, ${expectN} in the source`);
  for (const s of m.starters) {
    const t = `${tag} "${s.text}"`;
    if (s.rules.error) { fails.push(`${t}: ${s.rules.error}`); continue; }
    const { top, mid, base } = s.rules;
    if (!s.rules.midDashed) fails.push(`${t}: the middle rule is not the dashed one`);
    if (Math.abs(s.baseline - base) > 1) fails.push(`${t}: baseline ${s.baseline.toFixed(1)} vs base rule ${base.toFixed(1)} (A)`);
    const xTop = s.baseline - s.xInk;
    if (Math.abs(xTop - mid) > 1) fails.push(`${t}: x-height top ${xTop.toFixed(1)} vs mid rule ${mid.toFixed(1)} (B)`);
    const span = base - top;
    if (s.bInk > span + 1) fails.push(`${t}: ascender ${s.bInk.toFixed(1)} over the top rule (span ${span.toFixed(1)}) (C)`);
    if (s.bInk < 0.75 * span) fails.push(`${t}: ascender ${s.bInk.toFixed(1)} < 0.75 of the frame ${span.toFixed(1)} (C)`);
    if (s.width > 0.5 * s.rowW) fails.push(`${t}: starter ${s.width.toFixed(0)} px takes more than half of the ${s.rowW.toFixed(0)} px row (D)`);
    if (s.kind === 'svg' && Math.abs(s.left - 8) > 1) fails.push(`${t}: starts at x ${s.left.toFixed(1)} (want 8) (E)`);
  }
  return fails;
}

async function gotoHtml(page, htmlPath) {
  await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
}

(async () => {
  const { found, errors } = await discover();
  const ids = new Set(found.map((f) => f.id));
  const fails = [];
  for (const id of MUST_HAVE) if (!ONLY && !ids.has(id)) fails.push(`discovery: ${id} carries no starter — the gate lost a consumer`);
  for (const id of MUST_NOT) if (ids.has(id)) fails.push(`discovery: ${id} is in scope but draws stroke words, not starters`);
  console.log(`discovered ${found.length} starter coordinates over ${ids.size} types: ${found.map((f) => `${f.id}/${f.theme || 'null'}/d${f.difficulty}×${f.expect}`).join(' ')}`);
  if (errors.length) console.log(`  (${errors.length} coordinates refused to build on the discovery themes — expected for theme-gated specs)`);
  if (!found.length) { console.error('FAIL: nothing discovered — the gate would be vacuous'); process.exit(1); }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let measured = 0;
  const rendered = [];   // { htmlPath, expect, tag, id, d }
  try {
    for (const f of found) for (const locale of LOCALES) {
      const tag = `${f.id} ${f.theme || 'null'} d${f.difficulty} ${locale}`;
      let strings;
      try { strings = resolveStrings(f.id, locale, f.type); } catch (e) { strings = undefined; }
      let out;
      try {
        out = await renderInstance({ type: f.type, theme: f.theme, difficulty: f.difficulty, locale, unit: null, strings, page, outDir: OUT_DIR, baseName: `${f.id}-${f.theme || 'null'}-d${f.difficulty}-${locale}` });
      } catch (e) { fails.push(`${tag}: render refused — ${String(e.message).slice(0, 120)}`); continue; }
      const m = await measure(page);
      // the locale's OWN source count (fr K-335 authors `because: null` — a recorded refusal; the
      // Nordic G1-309 d1 pools give 4 rows, not en's 5): the count check is source-vs-rendered per
      // locale, the aggregate non-vacuity below still refuses a run that measured nothing
      const expectLoc = (String(out.html).match(/<text[^>]*data-lcs-starter="1"|<span data-lcs-starter(?![-\w])/g) || []).length;
      if (expectLoc === 0) console.log(`none ${tag}: this locale authors no starter here (source 0; en has ${f.expect})`);
      const j = judge(m, expectLoc, tag);
      measured += m.starters.length;
      fails.push(...j);
      const wid = m.starters.map((s) => `${Math.round(s.width)}/${Math.round(s.rowW)}`).join(' ');
      console.log(`${j.length ? 'FAIL' : 'ok  '} ${tag}: ${m.starters.length} starters, px ${m.starters.map((s) => s.px).join('/')}, width ${wid}${j.length ? '\n    ' + j.join('\n    ') : ''}`);
      rendered.push({ htmlPath: path.join(OUT_DIR, `${f.id}-${f.theme || 'null'}-d${f.difficulty}-${locale}.html`), expect: f.expect, tag, id: f.id, d: f.difficulty });
    }
    if (!measured) fails.push('0 starters measured across every render — vacuous');

    if (POISON) {
      const one = rendered.find((r) => r.id === 'K-335') || rendered[0];
      const html = fs.readFileSync(one.htmlPath, 'utf8');
      // P1 — the old size (0.78·glyphH: K-335 glyphH 40 → 31 px) — must fail B and C
      // the emitted tag carries font-size / y BEFORE data-lcs-starter — mutate the whole starter tag
      const starterTags = (h, fn) => h.replace(/<text[^>]*data-lcs-starter="1"[^>]*>/g, fn);
      const p1 = starterTags(html, (tag) => tag.replace(/font-size="[\d.]+"/, 'font-size="31"'));
      if (p1 === html) throw new Error('P1 needle matched nothing');
      const p1Path = path.join(OUT_DIR, '_poison-size.html'); fs.writeFileSync(p1Path, p1);
      await gotoHtml(page, p1Path);
      const f1 = judge(await measure(page), one.expect, 'P1');
      const p1ok = f1.some((x) => /\(B\)/.test(x)) && f1.some((x) => /\(C\)/.test(x));
      console.log(`poison P1 (font-size 31): ${p1ok ? 'FIRED' : 'DID NOT FIRE'} — ${f1.join(' | ') || 'no failures'}`);
      // P2 — the old baseline (yBase − 2) — must fail A
      const p2 = starterTags(html, (tag) => tag.replace(/\sy="([\d.]+)"/, (m0, y) => ` y="${(parseFloat(y) - 2).toFixed(1)}"`));
      if (p2 === html) throw new Error('P2 needle matched nothing');
      const p2Path = path.join(OUT_DIR, '_poison-y.html'); fs.writeFileSync(p2Path, p2);
      await gotoHtml(page, p2Path);
      const f2 = judge(await measure(page), one.expect, 'P2');
      const p2ok = f2.some((x) => /\(A\)/.test(x));
      console.log(`poison P2 (y − 2): ${p2ok ? 'FIRED' : 'DID NOT FIRE'} — ${f2.join(' | ') || 'no failures'}`);
      // P3 — the html factLane starter with the old 20 px flex-centred span — must fail A or B
      const lane = rendered.find((r) => r.id === 'G2-318' && r.d === 2);
      let p3ok = false;
      if (lane) {
        const h3 = fs.readFileSync(lane.htmlPath, 'utf8');
        const p3 = h3.replace(/(<span data-lcs-starter[^>]*font-size:)[\d.]+px/, '$120px').replace('align-items:baseline', 'align-items:center');
        if (p3 === h3) throw new Error('P3 needle matched nothing');
        const p3Path = path.join(OUT_DIR, '_poison-factlane.html'); fs.writeFileSync(p3Path, p3);
        await gotoHtml(page, p3Path);
        const f3 = judge(await measure(page), lane.expect, 'P3');
        p3ok = f3.some((x) => /\((A|B)\)/.test(x));
        console.log(`poison P3 (factLane 20 px centred): ${p3ok ? 'FIRED' : 'DID NOT FIRE'} — ${f3.join(' | ') || 'no failures'}`);
      } else console.log('poison P3: no G2-318 d2 render in this run (use --types including G2-318 or the full run)');
      // P4 control — a page with no starters reports 0, and the judge refuses it
      const ctrlType = loadAllTypes().find((t) => t.id === CONTROL.id);
      await renderInstance({ type: ctrlType, theme: CONTROL.theme, difficulty: CONTROL.difficulty, locale: 'en', unit: null, page, outDir: OUT_DIR, baseName: '_control-G1-249' });
      const mc = await measure(page);
      const fc = judge(mc, 1, 'P4');
      const p4ok = mc.starters.length === 0 && fc.length > 0;
      console.log(`poison P4 (control without starters): ${p4ok ? 'reports 0 and refuses' : 'DID NOT BEHAVE'} — ${mc.starters.length} starters, ${fc.join(' | ')}`);
      if (!(p1ok && p2ok && (p3ok || !lane) && p4ok)) fails.push('a poison did not fire — the measurement is not trustworthy');
    }
  } finally {
    await browser.close();
  }
  console.log(`\n${fails.length ? 'FAIL' : 'PASS'}: ${measured} starters measured over ${rendered.length} renders, ${fails.length} failure(s)`);
  if (fails.length) { for (const f of fails) console.log('  ' + f); process.exit(1); }
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
