#!/usr/bin/env node
/**
 * verify-b4-tangram.js — the K-353 `tangram` gate (design file §5; brief
 * deliverable 4). The base is a MATERIALS + MODEL page with no answer, so
 * this is a STRUCTURAL gate over the DOM the REAL pipeline renders
 * (render/render-instance.js, file:// fonts) plus the data gate.
 *
 *   node qa/verify-b4-tangram.js [--quick] [--seeds=N] [--locales=en]
 *
 * A  DATA — tools/gate-tangram-figures.js `check()` over the real bank (rules
 *    1-12 incl. the concave-capable tiler); data/b4/tangram.js en strings:
 *    the base pair === spec.i18n.en (one source), the five face MODE keys
 *    present, every title <= 70 without a worksheet-word / "printable" /
 *    "with answers" / a free-claim, unique in the block and the base title
 *    unique in the K band (loadAllTypes), every instruction <= 150 ending in
 *    a mark, no `{` / em-dash / soft hyphen, NFC; the per-locale bans
 *    (validateStrings(block, loc): the answers phrase + the true-size phrase
 *    x11, es "ficha" beside "tangram", sv "grupp") poison-tested BOTH ways.
 * C  RENDERS — d1/d2/d3 en; the LONG chrome (3-line title + 2-line
 *    instruction, body 733), the WORST (3-line title + 3-line instruction,
 *    710), the 4-LINE fi title (700) and the 677 COMBINATION x d2/d3 (d1
 *    REPORTED at 677: its stack is 698 and it declares bodyMin 700); a seed
 *    sweep at d2 + d3 (20 seeds; --quick 12): >= half the seeds distinct
 *    pairs, every pool figure appears, `square` never. Every drawing is
 *    RE-DERIVED from the bank in node (tan polygons + the outline / shadow
 *    path === the stored placement at the stamped scale). Each render: lints clean · verify()
 *    empty · the gate's OWN audit (the floors MEASURED from the rendered
 *    polygon points — smallest tan edge >= 56 on the set AND on every
 *    seamed figure; a shadow's scale stamp >= 159 (an outline EDGE may be
 *    shorter than a tan edge, so the floor law is the tan / the scale), every
 *    svg unscaled and inside the body above the footer, the template block
 *    left-aligned and <= 675, the legend beside it with 5 distinct codeColors
 *    swatches whose glyph widths are RELATIVE (L = 2 x S), the figure row
 *    centred, seams 3 / 2 + outline 3 / shadow fill === stroke, no text, no
 *    picture, no answer stamp, non-vacuity: 7 tans + >= 1 figure) · the
 *    chrome probe's body height (vacuity guard).
 * D  POISONS (each must FAIL for its OWN reason; the correct bank + page is
 *    the control):
 *      P14  a figure re-drawn at S 150                    → the measured floor (53 < 56)
 *      P20  pool ['square','tree'] / figure A stamped square → refuse / verify pool rule
 *      R2   a d3 shadow with a cream fill (seams visible) → verify fill !== stroke
 *      a figure with six tans · the set with L2 moved onto L1 (overlap) ·
 *      a figure's scale stamp 200 · a CSS-scaled figure · a legend swatch
 *      off-palette · a duplicated legend row · no scissors · a <text> in a
 *      figure · a data-lcs-answer on the page · the flat stack under the 677
 *      chrome (footer overlap) · a blank page · config: S 150 (floor) ·
 *      figures 3 · pool with an unknown key · mode 'zzz' · mode 'compose'
 *      (Phase 2 refuses on the base) · locale xx (no block) · a block without
 *      strings · strings: P21 a title "… with answers" · P22 a fr instruction
 *      with "taille réelle" · a 71-char title · a worksheet-word title · the
 *      bare head as a face title · a visible free claim
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType, loadAllTypes } = require('../lib/load-types.js');
const tokens = require('../primitives/_tokens.js');
const gate = require('../tools/gate-tangram-figures.js');
const TG = require('../primitives/tangram.js');
const freeClaim = require('../../lib/free-claim.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'k353-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b4', 'tangram-figures.js');
const STRINGS_FILE = path.join(ROOT, 'data', 'b4', 'tangram.js');
const ID = 'K-353';
const K_FLOOR = tokens.density.K.minElement;
const CODE_HEX = new Set(Object.values(tokens.codeColors).map((c) => c.toUpperCase()));
const FACE_MODES = ['compose', 'silhouette', 'missing', 'match', 'count'];

// the worst LEGAL chromes, measured in the real pipeline (verify-b3-logic-puzzles.js, 2026-09-14):
// a 68-char en title wraps to THREE lines + a 148-char instruction to TWO -> body 733; a 3-line fi
// instruction under a 3-line title -> 710; a 68-char fi title of long compounds wraps to FOUR
// lines -> 700; the four-line title + the three-line instruction -> 677 (the README's fi case).
const LONG_CHROME = { title: 'Logic Grid Puzzles for Second Grade: Three Clues and One Answer Each', instruction: 'Read the three clues of each case. Cross out on the grid every picture that cannot be true, tick the one that must be true, then circle each answer.' };
const FI_INSTRUCTION = 'Jokaisessa satataulunpalasessa näkyy yksi luku. Kirjoita puuttuvat luvut: oikealle yksi enemmän, vasemmalle yksi vähemmän, alapuolelle kymmenen lisää.';
const WORST_CHROME = { title: 'Logicals: drei Hinweise, eine Lösung für die zweite Klasse gedacht', instruction: FI_INSTRUCTION };
const FI4_CHROME = { title: 'Loogisen päättelyn ruudukkotehtävät alakoululaisille: kolme vihjettä', instruction: 'Lue kolme vihjettä. Yliviivaa päättelyruudukosta vaihtoehdot, jotka eivät voi pitää paikkaansa, ja ympyröi lopuksi jokaisen lapsen kuva.' };
const COMBO_CHROME = { title: FI4_CHROME.title, instruction: FI_INSTRUCTION };
const BODY_EXPECT = new Map([[LONG_CHROME, 733], [WORST_CHROME, 710], [FI4_CHROME, 700], [COMBO_CHROME, 677]]);

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function loadBankModule() { delete require.cache[require.resolve(BANK_FILE)]; return require(BANK_FILE).TANGRAM_FIGURES; }
function loadStrings() { delete require.cache[require.resolve(STRINGS_FILE)]; return require(STRINGS_FILE).TANGRAM; }
const clone = (o) => JSON.parse(JSON.stringify(o));
const glyphs = (s) => [...String(s)].length;

/* ---------------- A. the strings validator (per locale; the panel drafts run through it too) ---------------- */
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_BAN = /with answers|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/iu;
const TRUE_SIZE_BAN = /taille réelle|originalgröße|10x10|10 x 10|tamaño real|tamanho real|ware grootte|naturlig storlek|naturlig størrelse|luonnollinen koko|true size|actual size/iu;
const PRINTABLE_WORD = /(?<!\p{L})(printable|pdf|ausdrucken|imprimible|imprimir|imprimer|stampabile|printen|afdrukken|skriva ut|udskriv|skrive ut|tulostettava)(?!\p{L})/iu;
function validateStrings(block, loc, opts = {}) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!block || typeof block !== 'object' || !block.strings || typeof block.strings !== 'object') { push('no strings block'); return f; }
  const S = block.strings;
  const want = [ID, ...FACE_MODES];
  for (const k of want) if (!S[k]) push(`strings.${k} missing`);
  for (const k of Object.keys(S)) if (!want.includes(k)) push(`strings.${k} is not the base id or a face mode`);
  const titles = new Map();
  for (const [k, v] of Object.entries(S)) {
    const title = String((v && v.title) || ''), ins = String((v && v.instruction) || '');
    if (!title.trim()) push(`${k}: empty title`);
    if (glyphs(title) > 70) push(`${k}: title ${glyphs(title)} > 70`);
    if (WORKSHEET_WORD.test(title)) push(`${k}: title carries a worksheet-word`);
    if (PRINTABLE_WORD.test(title)) push(`${k}: title carries the locale's printable / pdf word (meta only)`);
    if (ANSWERS_BAN.test(title) || ANSWERS_BAN.test(ins)) push(`${k}: promises an answer key (printable decks ship none)`);
    if (TRUE_SIZE_BAN.test(title) || TRUE_SIZE_BAN.test(ins)) push(`${k}: claims true size (the d2 set is 57 mm)`);
    if (loc === 'es' && /(?<!\p{L})fichas?(?!\p{L})(?:\s+\S+){0,3}\s+tangram|tangram(?:\s+\S+){0,3}\s+fichas?(?!\p{L})/iu.test(title + ' ' + ins)) push(`${k}: es "ficha" within three words of "tangram" (it is the worksheet word)`);
    if (loc === 'sv' && /(?<!\p{L})grupp/iu.test(title + ' ' + ins)) push(`${k}: sv "grupp" is the counting word`);
    if (freeClaim.hit(title)) push(`${k}: title claims free ("${freeClaim.hit(title)}")`);
    if (freeClaim.hit(ins)) push(`${k}: instruction claims free ("${freeClaim.hit(ins)}")`);
    if (!ins.trim()) push(`${k}: empty instruction`);
    if (glyphs(ins) > 150) push(`${k}: instruction ${glyphs(ins)} > 150`);
    if (ins && !/[.!?…]$/u.test(ins.trim())) push(`${k}: instruction does not end in a mark`);
    if (/[{}]/.test(title + ins)) push(`${k}: a slot brace in a wordless family`);
    if (/—/.test(title + ins)) push(`${k}: em-dash`);
    if (/­/.test(title + ins)) push(`${k}: soft hyphen`);
    if ((title + ins).normalize('NFC') !== title + ins) push(`${k}: not NFC`);
    const key = title.trim().toLowerCase();
    if (titles.has(key)) push(`${k}: title repeats ${titles.get(key)}`); else titles.set(key, k);
  }
  // the bare head may be the base's head only; a face adds an element
  const head = String((S[ID] && S[ID].title) || '').split(/[:：]/)[0].trim().toLowerCase();
  for (const k of FACE_MODES) if (S[k] && String(S[k].title).trim().toLowerCase() === head) push(`${k}: title is the bare head`);
  if (opts.spec && loc === 'en') {
    if (!S[ID] || S[ID].title !== opts.spec.i18n.en.title || S[ID].instruction !== opts.spec.i18n.en.instruction) push(`strings.${ID} != spec.i18n.en (two sources)`);
  }
  if (opts.bandTitles && S[ID]) { const clash = opts.bandTitles.get(String(S[ID].title).toLowerCase()); if (clash && clash !== ID) push(`base title repeats ${clash} in the K band`); }
  return f;
}

/* ---------------- C. the gate's own in-page audit ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadStrings()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { locale: o.locale }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: null, difficulty: job.difficulty, locale: job.locale, unit: null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const m = await page.evaluate(({ ID, K_FLOOR, CODE_HEX }) => {
    const res = { fails: [], figures: [], tans: 0 };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const root = document.querySelector(`[data-lcs-type="${ID}"]`);
    if (!root) { F.push('audit: no root'); return res; }
    let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { F.push('audit: cfg unreadable'); return res; }
    res.cfg = cfg;
    const S = +cfg.S;
    const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
    const pathPts = (el) => { const d = el.getAttribute('d') || ''; const m = d.match(/-?\d+(?:\.\d+)?\s-?\d+(?:\.\d+)?/g) || []; return m.map((s) => s.split(' ').map(Number)); };
    const minEdge = (p) => Math.min(...p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])));
    const rectIn = (r, what) => { if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > foot + 0.6) F.push(`size: ${what} outside the body / into the footer`); };
    const sets = [...root.querySelectorAll('svg[data-lcs-set]')];
    const figs = [...root.querySelectorAll('svg[data-lcs-figure]:not([data-lcs-set])')];
    if (sets.length !== 1) F.push(`audit: ${sets.length} cut-out sets`);
    // floors MEASURED on the rendered polygon points (the svg is asserted unscaled below)
    const measureTans = (svg, what) => {
      const polys = [...svg.querySelectorAll('polygon[data-lcs-tan]')];
      res.tans += polys.length;
      let edge = Infinity;
      const geom = { tans: {}, path: null };
      polys.forEach((p) => { const q = pts(p); geom.tans[p.dataset.lcsTan] = q; edge = Math.min(edge, minEdge(q)); });
      const pathEl = svg.querySelector('path[data-lcs-outline], path[data-lcs-silhouette]');
      if (pathEl) geom.path = pathPts(pathEl);
      res.geom = res.geom || []; res.geom.push({ what, key: svg.dataset.lcsFigure, mode: svg.dataset.lcsMode, S: +svg.dataset.lcsScale, ...geom });
      if (polys.length && edge < K_FLOOR - 0.5) F.push(`size: ${what} smallest tan edge ${edge.toFixed(1)} < ${K_FLOOR}`);
      const r = svg.getBoundingClientRect();
      if (Math.abs(r.width - +svg.getAttribute('width')) > 0.6 || Math.abs(r.height - +svg.getAttribute('height')) > 0.6) F.push(`size: ${what} is CSS-scaled`);
      rectIn(r, what);
      if (svg.querySelector('text, image, foreignObject')) F.push(`audit: ${what} carries text / an image`);
      return { polys: polys.length, edge, rect: r };
    };
    let setRect = null;
    if (sets[0]) {
      const m2 = measureTans(sets[0], 'set');
      setRect = m2.rect;
      if (m2.polys !== 7) F.push(`audit: set has ${m2.polys} tans`);
      [...sets[0].querySelectorAll('polygon[data-lcs-tan]')].forEach((p) => { if (Math.abs(parseFloat(p.getAttribute('stroke-width')) - 3) > 0.01) F.push('audit: set cut line is not 3 px'); });
      if (Math.abs(m2.rect.left - body.left) > 1) F.push(`size: the set is not left-aligned (${m2.rect.left.toFixed(0)} vs body ${body.left.toFixed(0)})`);
      if (+sets[0].dataset.lcsScale < 159) F.push(`size: set scale ${sets[0].dataset.lcsScale} < 159`);
    }
    figs.forEach((svg, i) => {
      const what = `figure ${i + 1} (${svg.dataset.lcsFigure})`;
      const mode = svg.dataset.lcsMode;
      res.figures.push({ key: svg.dataset.lcsFigure, mode });
      const m2 = measureTans(svg, what);
      if (+svg.dataset.lcsScale < 159) F.push(`size: ${what} scale ${svg.dataset.lcsScale} < 159`);
      if (mode === 'solution') {
        if (m2.polys !== 7) F.push(`audit: ${what} has ${m2.polys} tans`);
        [...svg.querySelectorAll('polygon[data-lcs-tan]')].forEach((p) => { if (Math.abs(parseFloat(p.getAttribute('stroke-width')) - 2) > 0.01) F.push(`audit: ${what} seam is not 2 px`); });
        const o = svg.querySelector('path[data-lcs-outline]');
        if (!o || Math.abs(parseFloat(o.getAttribute('stroke-width')) - 3) > 0.01 || o.getAttribute('fill') !== 'none') F.push(`audit: ${what} outline is not a 3 px unfilled path`);
      } else if (mode === 'silhouette') {
        if (m2.polys) F.push(`audit: ${what} shows tans on a shadow`);
        const p = svg.querySelector('path[data-lcs-silhouette]');
        if (!p) F.push(`audit: ${what} has no silhouette path`);
        else {
          const fill = (p.getAttribute('fill') || '').toUpperCase(), stroke = (p.getAttribute('stroke') || '').toUpperCase();
          if (fill !== stroke) F.push(`audit: ${what} shadow fill ${fill} != stroke ${stroke} (seams would show)`);
        }
      } else F.push(`audit: ${what} mode ${mode}`);
      if (setRect && m2.rect.top < setRect.bottom + (+cfg.gap || 16) - 0.6) F.push(`size: ${what} rises into the template block (gap ${cfg.gap || 16})`);
    });
    if (!figs.length) F.push('non-vacuity: 0 figures');
    // figure row centred inside 675
    const row = root.querySelector('[data-lcs-figure-row]');
    if (row) { const r = row.getBoundingClientRect(); const c = (r.left + r.right) / 2, bc = (body.left + body.right) / 2; if (Math.abs(c - bc) > 1.5) F.push(`size: figure row centre ${c.toFixed(0)} != body centre ${bc.toFixed(0)}`); if (r.width > 675.6) F.push('size: figure row > 675'); }
    else F.push('audit: no figure row');
    // legend beside the template: 5 rows, distinct codeColors, RELATIVE glyph widths
    const rows = [...root.querySelectorAll('[data-lcs-legend]')];
    if (cfg.legend) {
      if (rows.length !== 5) F.push(`audit: ${rows.length} legend rows`);
      const fills = rows.map((r) => ((r.querySelector('[data-lcs-swatch]') || { getAttribute: () => '' }).getAttribute('fill') || '').toUpperCase());
      fills.forEach((fl, i) => { if (!CODE_HEX.includes(fl)) F.push(`audit: legend row ${i + 1} swatch ${fl} is not a codeColors hex`); });
      if (new Set(fills).size !== fills.length) F.push('audit: legend swatch colours repeat');
      const gw = {};
      rows.forEach((r) => { const g = r.querySelector('svg[data-lcs-glyph]'); if (g) gw[g.dataset.lcsGlyph] = g.getBoundingClientRect().width; const rr = r.getBoundingClientRect(); rectIn(rr, `legend ${r.dataset.lcsLegend}`); if (setRect && rr.left < setRect.right + 20) F.push('size: legend runs into the template'); if ((r.textContent || '').trim()) F.push('audit: legend carries text'); });
      if (gw.L && gw.S && Math.abs(gw.L - 2 * gw.S) > 4) F.push(`audit: legend L glyph ${gw.L.toFixed(0)} is not twice the S glyph ${gw.S.toFixed(0)} (sizes must be relative)`);
      if (gw.L && gw.M && !(gw.L > gw.M && gw.M > gw.S)) F.push('audit: legend glyphs are not ordered L > M > S');
    } else if (rows.length) F.push('audit: a legend on a legend:false config');
    const sc = root.querySelectorAll('[data-lcs-scissors]');
    if (sc.length !== 1) F.push(`audit: ${sc.length} scissors`);
    else if (setRect) { const r = sc[0].getBoundingClientRect(); if (r.bottom > setRect.top + 0.6 || Math.abs(r.left - setRect.left) > 2) F.push('size: the scissors are not above the set at x 0'); }
    const tb = root.querySelector('[data-lcs-template-block]');
    if (tb) { const r = tb.getBoundingClientRect(); if (r.width > 675.6) F.push('size: template block > 675'); if (r.top < body.top - 0.6) F.push('size: template block above the body'); }
    if (root.querySelector('img, [data-lcs-answer], .ws-answerbox, text')) F.push('audit: a picture / an answer / text on the base page');
    if ((root.textContent || '').trim()) F.push(`audit: text on the body "${root.textContent.trim().slice(0, 20)}"`);
    return res;
  }, { ID, K_FLOOR, CODE_HEX: [...CODE_HEX] });
  fails.push(...m.fails);
  // re-derive every drawing from the BANK in node (never from the DOM): tan polygons + the outline /
  // silhouette path must equal the stored placements at the stamped scale (the html prints 2 decimals)
  const near = (a, b) => Math.abs(a[0] - b[0]) < 0.02 && Math.abs(a[1] - b[1]) < 0.02;
  const sameSet = (got, want) => got.length === want.length && want.every((w) => got.some((g) => near(g, w)));
  const B = loadBankModule();
  for (const g of m.geom || []) {
    const fig = B.FIGURES[g.key];
    if (!fig) { fails.push(`bank: ${g.what} key "${g.key}" is not a stored figure`); continue; }
    const placed = TG.placeTans(fig, g.S);
    if (g.mode === 'template' || g.mode === 'solution') {
      for (const t of placed.tans) { const got = g.tans[t.id]; if (!got || !sameSet(got, t.pts)) fails.push(`bank: ${g.what} ${t.id} polygon != the stored placement at S ${g.S}`); }
    }
    const loop = TG.silhouetteOf(fig.map(TG.placeUnit))[0].map(placed.toPx);
    if (g.mode === 'solution' || g.mode === 'silhouette') { if (!g.path || !sameSet(g.path, loop)) fails.push(`bank: ${g.what} ${g.mode} path != the stored silhouette at S ${g.S}`); }
  }
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  if (cfg && m.figures.length && m.figures.length !== cfg.figures) fails.push(`count: ${m.figures.length} figures, config says ${cfg.figures}`);
  const expect = BODY_EXPECT.get(job.strings);
  if (expect != null && Math.abs(m.body - expect) > 1) fails.push(`chrome: body measured ${m.body}, the probe expects ${expect} (vacuous or shifted chrome)`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.insLines} instruction lines, not 3 (vacuous)`);
  if ((job.strings === LONG_CHROME || job.strings === WORST_CHROME) && m.titleLines < 3) fails.push(`chrome: the probe title wrapped to ${m.titleLines} lines, not 3 (vacuous)`);
  if ((job.strings === FI4_CHROME || job.strings === COMBO_CHROME) && m.titleLines < 4) fails.push(`chrome: the fi probe title wrapped to ${m.titleLines} lines, not 4 (vacuous)`);
  if (!m.tans) fails.push('non-vacuity: 0 tan polygons measured (the set alone carries 7)');
  return { fails, figures: m.figures, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath, cfg: m.cfg };
}

/* ---------------- poison helpers (html post-processing on the REAL page; every needle throws when absent) ---------------- */
const FIG_RE = () => /(<svg[^>]*data-lcs-figure="([a-z]+)" data-lcs-mode="(solution|silhouette)"[^>]*>)([\s\S]*?)(<\/svg>)/g;
function nthFigure(html, n) {
  const re = FIG_RE();
  let m, i = 0;
  while ((m = re.exec(html))) { if (i === n) return { m, idx: m.index }; i++; }
  throw new Error(`NEEDLE MATCHED NOTHING (figure ${n})`);
}
function editFigure(html, n, fn) {
  const { m } = nthFigure(html, n);
  const out = fn(m[1], m[4], m[5], m[2]);
  return html.slice(0, m.index) + out + html.slice(m.index + m[0].length);
}
function scaleNumbers(s, k) { return s.replace(/-?\d+(?:\.\d+)?/g, (v) => (Math.round(+v * k * 100) / 100).toString()); }
function setAttr(open, name, value) { const re = new RegExp(`${name}="[^"]*"`); if (!re.test(open)) throw new Error(`NEEDLE MATCHED NOTHING (${name})`); return open.replace(re, `${name}="${value}"`); }

/* ================================================================================================
 * E. THE FIVE FACES (Phase 2, 2026-09-21) — design §3 / §5, _work/K-353-faces.md
 *
 * FACES = the five emitted specs (tools/b4var-rows/tangram.js → gen-b4var-specs.js). Each is
 * rendered through the REAL pipeline at d2 en (default chrome), under the LONG / WORST / FI4 / COMBO
 * chromes (F4 also under a ONE-LINE chrome: the sparse rule's "slack under the stage <= 180"), and
 * over a seed sweep. Every render: lints clean · the face's own verify() empty · the gate's OWN audit
 * (faceRenderCheck): every drawing re-derived from the BANK under the stamped transform (an
 * independent re-derivation, not the spec's), the band floor MEASURED on the polygon points, every
 * svg unscaled + inside its card / box + above the footer, the sparse rule (the grid fills the body /
 * the F4 stage top-anchored, band === gap, stage >= 660), non-vacuity, and per face: F1 outlines
 * white with no seam polygon + glyph strip === the mini's classes; F2 four pairwise NON-CONGRUENT
 * shadows (tree ≡ arrow, measured) in the two-height grid; F3 six tans + a coral dashed hole, three
 * true-size chips of distinct classes, exactly one correct and congruent to the hole by rotation, the
 * triangle-size rule, the P flip rule, the shape cap; F4 exactly one correct (t id), every distractor
 * outside the group of the shadow AS DRAWN + a different shadow, the P flip tell on mirrors; F5 box
 * answers === the bank's class counts, the page rule.
 * Poisons (each must FAIL for its own reason; the correct face render is the control): P5 (square in
 * the F4 pool → refuse) · P6 (an F4 distractor redrawn INSIDE the shadow's group: rectangle rot180)
 * · P7 (data-lcs-correct moved to a turned candidate) · P8 (an S/M hole whose other-size triangle
 * chip is swapped for a Q) · P9 (a P hole's correct chip in the other flip) · P10 (a chip drawn at
 * Sg 80) · P11 (an F5 pool whose triangle counts take two values → refuse) · P14 (S 150 on a K
 * face) · P15 (a data-lcs-tan polygon inside an F1 outline) · P17 (an F4 distractor redrawn as the
 * OTHER figure in the pose that casts the SAME shadow: arrow for tree) · P18 (F2 cards at padding
 * 12: the tree overflows) · P19 (an M chip in the upright pose: the column overflows under 677) ·
 * R1 (a row equal to the base's d2 config → the distinctness check rejects) · R3 (two correct
 * candidates) · SPARSE: F4 rows 3 (stack 504 → refuse) / the stage centred / a cardGrid face's grid
 * pinned to 500 px · config: mix 0+4, items 5, S 120 on G1, an L hole, F4 S 100, box 150 (the cat),
 * F2 rowH 300, F2 pool without boat/cat (three shapes), F5 boxes with a third box · a face's EN
 * strings ≠ the bank's (two sources).
 * ================================================================================================ */
const { cardInner, fitTransforms, drawnSize, FACE_BAND, BAND_FLOOR } = require('../types/k/K-353-tangram.js');
const C4 = require('../templates/components-b4.js');
const FACES = [
  { id: 'K-358', mode: 'compose', band: 'K' },
  { id: 'G1-354', mode: 'silhouette', band: 'G1' },
  { id: 'G1-355', mode: 'missing', band: 'G1' },
  { id: 'G2-347', mode: 'match', band: 'G2' },
  { id: 'K-359', mode: 'count', band: 'K' },
];
const ONE_LINE_CHROME = { title: 'Tangram Shadows', instruction: 'Circle the matching solution.' };
const STAGE_SLACK_MAX = 180;
const distinctFromBase = (ft, base) => JSON.stringify(ft.difficulty[2]) !== JSON.stringify(base.difficulty[2]);
const oneSource = (ft, en, mode) => { const s = en.strings[mode]; return !!s && ft.i18n.en.title === s.title && ft.i18n.en.instruction === s.instruction; };
const shapeKey5 = (tans) => { const loop = TG.silhouette(tans)[0]; const xs = loop.map((p) => p[0]), ys = loop.map((p) => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys); return loop.map((p) => [(p[0] - x0 + 0).toFixed(5), (p[1] - y0 + 0).toFixed(5)].join(',')).sort().join('|'); };
const congruent = (a, b) => { const ka = shapeKey5(a); return TG.TRANSFORM_NAMES.some((t) => shapeKey5(TG.transformTiling(b, t)) === ka); };

async function faceRenderCheck(page, faceType, inj, job, opts) {
  let t = faceType;
  if (inj) t = { ...faceType, build: (o, ctx) => faceType._buildWith(inj.bank || loadStrings()[o.locale.slice(0, 2)], inj.cfg || faceType.difficulty[o.difficulty], { locale: o.locale }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({ type: t, theme: null, difficulty: job.difficulty || 2, locale: job.locale, unit: null, strings: job.strings, pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const m = await page.evaluate((ID) => {
    const R = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
    const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
    const pathPts = (el) => { const d = el.getAttribute('d') || ''; const m = d.match(/-?\d+(?:\.\d+)?\s-?\d+(?:\.\d+)?/g) || []; return m.map((s) => s.split(' ').map(Number)); };
    const res = { fails: [] };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height); res.bodyRect = R(document.querySelector('[data-lcs-body]'));
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    res.foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const root = document.querySelector(`[data-lcs-type="${ID}"]`);
    if (!root) { res.fails.push('audit: no root'); return res; }
    res.mode = root.dataset.lcsMode || null;
    try { res.cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { res.fails.push('audit: cfg unreadable'); return res; }
    res.stamps = { ...root.dataset };
    const cards = [...root.querySelectorAll('.ws-card')];
    res.cards = cards.map((c) => { const cs = getComputedStyle(c); const r = c.getBoundingClientRect(); const e = (a, b) => parseFloat(cs[a]) + parseFloat(cs[b]); return { rect: R(c), inner: { left: r.left + e('paddingLeft', 'borderLeftWidth'), top: r.top + e('paddingTop', 'borderTopWidth'), right: r.right - e('paddingRight', 'borderRightWidth'), bottom: r.bottom - e('paddingBottom', 'borderBottomWidth') }, badge: (c.querySelector('.ws-card-badge') || {}).textContent }; });
    const grid = root.querySelector('.ws-cardgrid'); res.grid = grid ? R(grid) : null;
    const stage = root.querySelector('[data-lcs-match-stage]'); res.stage = stage ? R(stage) : null;
    const rows = [...root.querySelectorAll('[data-lcs-match-row]')];
    res.rows = rows.map((row) => ({ key: row.dataset.lcsFigure, t0: row.dataset.lcsTransform, rect: R(row), candidates: [...row.querySelectorAll('[data-lcs-candidate]')].map((c) => ({ i: +c.dataset.lcsCandidate, t: c.dataset.lcsT, correct: c.dataset.lcsCorrect === '1', rect: R(c) })) }));
    res.figures = [...root.querySelectorAll('svg[data-lcs-prim="tangram"]')].map((svg) => ({
      card: cards.indexOf(svg.closest('.ws-card')), row: rows.indexOf(svg.closest('[data-lcs-match-row]')), cand: svg.closest('[data-lcs-candidate]') ? +svg.closest('[data-lcs-candidate]').dataset.lcsCandidate : -1, isTarget: !!svg.closest('[data-lcs-target]'),
      key: svg.dataset.lcsFigure, mode: svg.dataset.lcsMode, transform: svg.dataset.lcsTransform || null, S: +svg.dataset.lcsScale, missing: svg.dataset.lcsMissing || null,
      attrW: +svg.getAttribute('width'), attrH: +svg.getAttribute('height'), rect: R(svg), foreign: !!svg.querySelector('text, image, foreignObject'),
      tans: [...svg.querySelectorAll('polygon[data-lcs-tan]')].map((p) => ({ id: p.dataset.lcsTan, pts: pts(p), fill: (p.getAttribute('fill') || '').toUpperCase(), sw: parseFloat(p.getAttribute('stroke-width')) })),
      paths: [...svg.querySelectorAll('path')].map((p) => ({ kind: p.hasAttribute('data-lcs-outline') ? 'outline' : p.hasAttribute('data-lcs-silhouette') ? 'silhouette' : p.hasAttribute('data-lcs-hole') ? 'hole' : 'other', pts: pathPts(p), fill: (p.getAttribute('fill') || '').toUpperCase(), stroke: (p.getAttribute('stroke') || '').toUpperCase(), dash: p.getAttribute('stroke-dasharray') || null })),
    }));
    res.chips = [...root.querySelectorAll('.ws-achip[data-lcs-chip]')].map((c) => { const svg = c.querySelector('svg'); const poly = svg && svg.querySelector('polygon'); return { card: cards.indexOf(c.closest('.ws-card')), cls: c.dataset.lcsChip, flip: c.dataset.lcsFlip === '1', correct: c.dataset.lcsCorrect === '1', rect: R(c), svgRect: svg ? R(svg) : null, svgS: svg ? +svg.dataset.lcsScale : null, pts: poly ? pts(poly) : [] }; });
    res.strips = [...root.querySelectorAll('[data-lcs-glyph-strip]')].map((s) => ({ card: cards.indexOf(s.closest('.ws-card')), classes: [...s.querySelectorAll('svg[data-lcs-glyph]')].map((g) => g.dataset.lcsGlyph) }));
    res.answers = [...root.querySelectorAll('[data-lcs-answer-row]')].map((r) => ({ card: cards.indexOf(r.closest('.ws-card')), boxes: [...r.querySelectorAll('.ws-answerbox')].map((b) => ({ answer: b.dataset.lcsAnswer, text: (b.textContent || '').trim(), rect: R(b) })) }));
    let txt = root.textContent || ''; root.querySelectorAll('.ws-card-badge').forEach((b) => { txt = txt.replace(b.textContent, ''); }); res.text = txt.trim();
    res.foreign = !!root.querySelector('img, text, input');
    return res;
  }, ID);
  fails.push(...m.fails.map((x) => x));
  const F = fails;
  const cfg = m.cfg || {};
  const mode = m.mode;
  const S = +cfg.S;
  const floor = BAND_FLOOR[FACE_BAND[mode]] || 56;
  const near = (a, b) => Math.abs(a[0] - b[0]) < 0.02 && Math.abs(a[1] - b[1]) < 0.02;
  const sameSet = (got, want) => got.length === want.length && want.every((w) => got.some((g) => near(g, w)));
  const minEdge = (p) => Math.min(...p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])));
  const inside = (r, box, what) => { if (r.left < box.left - 0.6 || r.right > box.right + 0.6 || r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6) F.push(`size: ${what} outside its container`); };
  const B = loadBankModule();
  let slack = null;
  if (m.cfg) {
    if (mode !== job.mode) F.push(`audit: mode stamp ${mode} ≠ ${job.mode}`);
    if (m.foreign) F.push('audit: a picture / text / input on a face page');
    if (m.text) F.push(`audit: text on the body "${m.text.slice(0, 20)}"`);
    if (!(TG.h * S >= floor - 0.5)) F.push(`size: scale ${S} < the ${FACE_BAND[mode]} floor (${(TG.h * S).toFixed(1)} < ${floor})`);
    // every drawing re-derived from the BANK (independent of verify): tans / outline / silhouette / hole
    const pad = mode === 'missing' || mode === 'match' ? cfg.pad : 2.5;
    const stored = (g) => {
      if (mode === 'compose') return B.MINIS[g.key];
      if (mode === 'count') return B.SUBS[g.key];
      return B.FIGURES[g.key];
    };
    let measuredTans = 0;
    for (const g of m.figures) {
      const what = `${g.mode} ${g.key}`;
      if (Math.abs(g.rect.width - g.attrW) > 0.6 || Math.abs(g.rect.height - g.attrH) > 0.6) F.push(`size: ${what} is CSS-scaled`);
      if (g.S !== S) F.push(`size: ${what} scale ${g.S} ≠ ${S}`);
      if (g.foreign) F.push(`audit: ${what} carries text`);
      if (g.rect.bottom > m.foot + 0.6 || g.rect.top < m.bodyRect.top - 0.6 || g.rect.left < m.bodyRect.left - 0.6 || g.rect.right > m.bodyRect.right + 0.6) F.push(`size: ${what} outside the body / into the footer`);
      if (g.card >= 0 && m.cards[g.card]) inside(g.rect, m.cards[g.card].inner, what);
      const src = stored(g);
      if (!src) { F.push(`bank: ${what} is not a stored ${mode === 'compose' ? 'mini' : mode === 'count' ? 'set' : 'figure'}`); continue; }
      if (!g.transform || !TG.TRANSFORMS[g.transform]) { F.push(`bank: ${what} has no transform stamp`); continue; }
      let tt = TG.transformTiling(src, g.transform);
      if (mode === 'match' && g.cand >= 0) { const row = m.rows[g.row]; if (!row || !TG.TRANSFORMS[row.t0]) { F.push(`bank: ${what} row without t0`); continue; } tt = TG.transformTiling(TG.transformTiling(src, row.t0), g.transform); }
      const placed = TG.placeTans(tt, S, { pad });
      const loop = TG.silhouetteOf(tt.map(TG.placeUnit))[0].map(placed.toPx);
      if (g.mode === 'solution' || g.mode === 'hole') {
        const want = g.mode === 'hole' ? placed.tans.filter((t) => g.tans.some((x) => x.id === t.id)) : placed.tans;
        const ids = g.tans.map((x) => x.id);
        if (g.mode === 'solution' && ids.length !== src.length) F.push(`bank: ${what} draws ${ids.length} tans, the stored entry has ${src.length}`);
        if (g.mode === 'hole' && ids.length !== 6) F.push(`bank: ${what} draws ${ids.length} tans (six + the hole)`);
        for (const t of want) { const got = g.tans.find((x) => x.id === t.id); if (!got) { if (g.mode !== 'hole') F.push(`bank: ${what} lacks ${t.id}`); continue; } if (!sameSet(got.pts, t.pts)) F.push(`bank: ${what} ${t.id} ≠ the stored placement under ${g.transform} at S ${S}`); measuredTans++; const e = minEdge(got.pts); if (e < floor - 0.5) F.push(`size: ${what} ${t.id} edge ${e.toFixed(1)} < ${floor}`); }
        if (g.mode === 'solution') { const o = g.paths.find((p) => p.kind === 'outline'); if (!o) F.push(`audit: ${what} has no outline path`); else if (!sameSet(o.pts, loop)) F.push(`bank: ${what} outline ≠ the stored silhouette`); }
        if (g.mode === 'hole') { const h = g.paths.find((p) => p.kind === 'hole'); const missingId = TG.TAN_IDS.find((id) => !ids.includes(id)); const want2 = placed.tans.find((t) => t.id === missingId); if (!h) F.push(`audit: ${what} has no hole path`); else { if (!want2 || !sameSet(h.pts, want2.pts)) F.push(`bank: ${what} hole ≠ the missing tan's placement`); if (h.fill !== 'NONE' || h.stroke !== tokens.color.coral.toUpperCase() || h.dash !== '8 6') F.push(`audit: ${what} hole is not an unfilled dashed coral path`); if (missingId && TG.clsOf(missingId) !== g.missing) F.push(`bank: ${what} missing stamp ${g.missing} ≠ the absent tan ${missingId}`); } }
      } else if (g.mode === 'outline' || g.mode === 'silhouette') {
        if (g.tans.length) F.push(`audit: ${what} carries ${g.tans.length} tan polygons (the seams are printed)`);
        const p = g.paths.find((x) => x.kind === g.mode);
        if (!p || g.paths.length !== 1) F.push(`audit: ${what} has ${g.paths.length} paths`);
        else { if (!sameSet(p.pts, loop)) F.push(`bank: ${what} path ≠ the stored silhouette under ${g.transform} at S ${S}`); if (g.mode === 'outline' && p.fill !== tokens.color.white.toUpperCase()) F.push(`audit: ${what} outline fill ${p.fill}`); if (g.mode === 'silhouette' && (p.fill !== p.stroke || p.fill !== tokens.color.teal.toUpperCase())) F.push(`audit: ${what} shadow fill ${p.fill} / stroke ${p.stroke}`); }
      } else F.push(`audit: ${what} unexpected mode`);
    }
    // the sparse rule + containers
    if (mode === 'match') {
      if (!m.stage) F.push('audit: no stage');
      else {
        if (m.stage.top > m.bodyRect.top + 1) F.push(`sparse: the stage starts ${(m.stage.top - m.bodyRect.top).toFixed(0)} px under the body top (not top-anchored)`);
        if (m.stage.height < 660) F.push(`sparse: stage ${m.stage.height.toFixed(0)} < 660`);
        slack = m.foot - m.stage.bottom;
        if (job.strings === ONE_LINE_CHROME && slack > STAGE_SLACK_MAX) F.push(`sparse: ${slack.toFixed(0)} px of slack under the stage at the one-line chrome > ${STAGE_SLACK_MAX}`);
      }
      m.rows.forEach((r, i) => { if (i) { const band = r.rect.top - m.rows[i - 1].rect.bottom; if (Math.abs(band - cfg.gap) > 1) F.push(`sparse: a ${band.toFixed(0)} px band between rows ${i} and ${i + 1} (gap ${cfg.gap})`); } });
      if (m.rows.length !== cfg.rows) F.push(`count: ${m.rows.length} rows ≠ ${cfg.rows}`);
      const drawn = [];
      for (const r of m.rows) {
        const src = B.FIGURES[r.key];
        if (!src || !TG.TRANSFORMS[r.t0]) { F.push(`bank: row ${r.key} / ${r.t0}`); continue; }
        const target = TG.transformTiling(src, r.t0);
        drawn.push(shapeKey5(target));
        const group = TG.symmetryGroup(target);
        const correct = r.candidates.filter((c) => c.correct);
        if (correct.length !== 1 || correct[0].t !== 'id') F.push(`answer: row ${r.key} has ${correct.length} correct candidate(s) [${correct.map((c) => c.t).join(' ')}]`);
        for (const c of r.candidates) {
          const g = m.figures.find((x) => x.row === m.rows.indexOf(r) && x.cand === c.i);
          if (g) inside(g.rect, c.rect, `row ${r.key} candidate ${c.i + 1}`);
          if (!c.correct) { if (group.includes(c.t)) F.push(`answer: row ${r.key} distractor ${c.t} is inside the group of the shadow as drawn [${group.join(' ')}]`); if (TG.TRANSFORMS[c.t] && shapeKey5(TG.transformTiling(target, c.t)) === shapeKey5(target)) F.push(`answer: row ${r.key} distractor ${c.t} casts the same shadow`); }
        }
        const sh = m.figures.find((x) => x.row === m.rows.indexOf(r) && x.isTarget);
        if (!sh) F.push(`audit: row ${r.key} has no shadow`);
      }
      if (new Set(drawn).size !== drawn.length) F.push('audit: two rows show the same shadow as drawn');
      if (!m.rows.length) F.push('non-vacuity: 0 match rows');
    } else {
      if (!m.grid) F.push('audit: no card grid');
      else { if (m.grid.top > m.bodyRect.top + 1) F.push('sparse: the grid is not top-anchored'); if (m.grid.height < m.bodyRect.height - 2) F.push(`sparse: ${(m.bodyRect.height - m.grid.height).toFixed(0)} px of blank paper under the grid`); }
      if (m.cards.length !== cfg.items) F.push(`count: ${m.cards.length} cards ≠ ${cfg.items}`);
      if (m.figures.length !== cfg.items) F.push(`count: ${m.figures.length} drawings ≠ ${cfg.items}`);
      const keys = m.figures.map((g) => g.key);
      if (new Set(keys).size !== keys.length && mode !== 'missing') F.push(`audit: drawings repeat (${keys.join(' ')})`);
    }
    if (mode === 'compose') {
      for (const g of m.figures) { const strip = m.strips.find((s) => s.card === g.card); const src = B.MINIS[g.key]; if (!strip || !src) { F.push(`audit: outline ${g.key} without a glyph strip`); continue; } if (strip.classes.slice().sort().join() !== src.map((t) => TG.clsOf(t.id)).sort().join()) F.push(`answer: glyph strip [${strip.classes.join(' ')}] ≠ mini ${g.key}`); try { B.mini(g.key); } catch (e) { F.push('bank: ' + e.message); } }
      const n2 = m.figures.map((g) => g.key).filter((k) => (cfg.pool2 || []).includes(k)).length;
      if (n2 !== cfg.mix[0]) F.push(`audit: ${n2} two-tan minis ≠ mix ${cfg.mix[0]}`);
    }
    if (mode === 'silhouette') {
      const figs = m.figures;
      for (let i = 0; i < figs.length; i++) for (let j = i + 1; j < figs.length; j++) if (B.FIGURES[figs[i].key] && B.FIGURES[figs[j].key] && congruent(B.FIGURES[figs[i].key], B.FIGURES[figs[j].key])) F.push(`audit: shadows ${figs[i].key} and ${figs[j].key} are one shape turned`);
      m.cards.forEach((c, i) => { if (i < cfg.cols && Math.abs(c.rect.height - cfg.rowH) > 1) F.push(`size: card ${i + 1} height ${c.rect.height.toFixed(0)} ≠ rowH ${cfg.rowH}`); });
    }
    if (mode === 'missing') {
      const pairs = new Set();
      for (const g of m.figures) {
        const chips = m.chips.filter((c) => c.card === g.card);
        const pk = g.key + '/' + g.missing; if (pairs.has(pk)) F.push(`audit: pair ${pk} twice`); pairs.add(pk);
        if (chips.length !== cfg.chips) F.push(`count: card ${g.card + 1} has ${chips.length} chips`);
        const correct = chips.filter((c) => c.correct);
        if (correct.length !== 1 || correct[0].cls !== g.missing) F.push(`answer: card ${g.card + 1} correct chip [${correct.map((c) => c.cls).join(' ')}] vs hole ${g.missing}`);
        if (new Set(chips.map((c) => c.cls)).size !== chips.length) F.push(`answer: card ${g.card + 1} chip classes repeat`);
        if ((g.missing === 'M' || g.missing === 'S') && !chips.some((c) => c.cls === (g.missing === 'M' ? 'S' : 'M'))) F.push(`answer: card ${g.card + 1} ${g.missing} hole without the other triangle size`);
        const src = B.FIGURES[g.key];
        const tt = src && TG.TRANSFORMS[g.transform] ? TG.transformTiling(src, g.transform) : null;
        const holeTan = tt && tt.find((t) => !g.tans.some((x) => x.id === t.id));
        for (const c of chips) {
          if (c.svgS !== S) F.push(`size: card ${g.card + 1} chip ${c.cls} drawn at ${c.svgS}, not ${S} (true-size)`);
          if (c.rect.height < 43.4) F.push(`size: card ${g.card + 1} chip ${c.cls} box ${c.rect.height.toFixed(0)} < 44`);
          if (m.cards[g.card]) inside(c.rect, m.cards[g.card].inner, `card ${g.card + 1} chip ${c.cls}`);
          if (c.svgRect) inside(c.svgRect, c.rect, `card ${g.card + 1} chip ${c.cls} glyph`);
          if (c.pts.length) { const want = TG.canonicalPose(c.cls, S, { flip: c.flip }); const e = (p) => p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])).sort((a, b) => a - b); const eg = e(c.pts), ew = e(want); if (eg.length !== ew.length || eg.some((v, i) => Math.abs(v - ew[i]) > 0.5)) F.push(`size: card ${g.card + 1} chip ${c.cls} is not true-size (ratio chip : hole ≠ 1)`); }
          if (c.correct && holeTan && c.pts.length) {
            if (c.cls === 'P' && !!holeTan.flip !== c.flip) F.push(`answer: card ${g.card + 1} correct P chip flip ≠ the hole's`);
            const hp = TG.placeUnit(holeTan); const cu = c.pts.map((p) => [p[0] / S, p[1] / S]);
            const nk = (P) => { const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys); return P.map((p) => [(p[0] - x0).toFixed(3), (p[1] - y0).toFixed(3)].join(',')).sort().join('|'); };
            if (![0, 45, 90, 135, 180, 225, 270, 315].some((d) => { const th = d * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th); return nk(cu.map(([x, y]) => [x * cs - y * sn, x * sn + y * cs])) === nk(hp); })) F.push(`answer: card ${g.card + 1} correct chip not congruent to the hole by rotation`);
          }
        }
      }
      if (!m.chips.length) F.push('non-vacuity: 0 chips');
    }
    if (mode === 'count') {
      const subs = [];
      for (const g of m.figures) {
        const src = B.SUBS[g.key]; if (!src) continue;
        subs.push(src);
        const row = m.answers.find((a) => a.card === g.card);
        if (!row || row.boxes.length !== 2) { F.push(`count: card ${g.card + 1} answer boxes`); continue; }
        const tri = src.filter((t) => 'LMS'.includes(TG.clsOf(t.id))).length, sq = src.filter((t) => TG.clsOf(t.id) === 'Q').length;
        if (+row.boxes[0].answer !== tri || +row.boxes[1].answer !== sq) F.push(`answer: card ${g.card + 1} stamps ${row.boxes[0].answer}/${row.boxes[1].answer}, the set holds ${tri}/${sq}`);
        row.boxes.forEach((b, j) => { if (b.text) F.push(`audit: card ${g.card + 1} box ${j + 1} prints "${b.text}"`); if (b.rect.height < 43.4) F.push(`size: card ${g.card + 1} box ${j + 1} < 44`); if (m.cards[g.card]) inside(b.rect, m.cards[g.card].inner, `card ${g.card + 1} box ${j + 1}`); });
        const loop = TG.silhouette(src)[0];
        if (gate.kindOf(loop) !== 'other') F.push(`bank: set ${g.key} outline is a ${gate.kindOf(loop)}`);
        // the tall-pose rule (sparse): the drawn height is the tallest fitting pose under the 677 zone
        { const inner = cardInner(cfg.rows, cfg.cols, cfg.bodyMin || 677, 12); const maxH = inner.h - 12 - 50; const hs = TG.TRANSFORM_NAMES.map((t) => drawnSize(TG.transformTiling(src, t), S, 2.5)).filter((d) => d.w <= inner.w && d.h <= maxH).map((d) => d.h); if (hs.length && g.rect.height < Math.max(...hs) - 1) F.push(`sparse: set ${g.key} drawn ${g.rect.height.toFixed(0)} tall in a flat pose (tall pose ${Math.max(...hs)})`); }
      }
      if (subs.length === cfg.items) {
        const triVals = new Set(subs.map((s) => s.filter((t) => 'LMS'.includes(TG.clsOf(t.id))).length));
        if (triVals.size < 3) F.push(`answer: triangle counts take ${triVals.size} values (< 3)`);
        const sqVals = new Set(subs.map((s) => s.filter((t) => TG.clsOf(t.id) === 'Q').length));
        if (!sqVals.has(0) || !sqVals.has(1)) F.push('answer: square counts miss 0 or 1');
        if (subs.filter((s) => s.some((t) => t.id === 'P')).length < 2) F.push('answer: P on < 2 cards');
      }
      if (!m.answers.length) F.push('non-vacuity: 0 answer rows');
    }
    if (!m.figures.length) F.push('non-vacuity: 0 drawings');
    if (mode !== 'compose' && mode !== 'silhouette' && !measuredTans) F.push('non-vacuity: 0 tan polygons measured');
  }
  const expect = BODY_EXPECT.get(job.strings);
  if (expect != null && Math.abs(m.body - expect) > 1) fails.push(`chrome: body measured ${m.body}, the probe expects ${expect} (vacuous or shifted chrome)`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push('chrome: WORST_CHROME wrapped to < 3 instruction lines (vacuous)');
  if ((job.strings === LONG_CHROME || job.strings === WORST_CHROME) && m.titleLines < 3) fails.push('chrome: the probe title wrapped to < 3 lines (vacuous)');
  if ((job.strings === FI4_CHROME || job.strings === COMBO_CHROME) && m.titleLines < 4) fails.push('chrome: the fi probe title wrapped to < 4 lines (vacuous)');
  if (job.strings === ONE_LINE_CHROME && (m.titleLines !== 1 || m.insLines !== 1)) fails.push(`chrome: the one-line probe wrapped to ${m.titleLines}/${m.insLines} lines (vacuous)`);
  return { fails, m, body: m.body, titleLines: m.titleLines, insLines: m.insLines, pngPath: out.pngPath, slack };
}

async function faceSection({ page, base, B, strings, note, failures, seeds, poisons, addAssertions }) {
  const loc = 'en';
  const en = strings.en;
  for (const face of FACES) {
    let ft;
    try { ft = loadType(face.id); } catch (e) { note(false, `${face.id}: cannot load (${e.message})`); continue; }
    const cfg = ft.difficulty[2];
    note(cfg.mode === face.mode, `${face.id}: mode ${cfg.mode} ≠ ${face.mode}`);
    note(ft.gradeBand === face.band, `${face.id}: gradeBand ${ft.gradeBand} ≠ ${face.band}`);
    note(ft.exerciseType === 'tangram' && ft.themeAxis.applicable === false, `${face.id}: exerciseType / themeAxis`);
    note(JSON.stringify(ft.difficulty[1]) === JSON.stringify(cfg) && JSON.stringify(ft.difficulty[3]) === JSON.stringify(cfg), `${face.id}: the three levels are not one config`);
    note(distinctFromBase(ft, base), `${face.id}: resolves to the base's d2 config`);
    note(oneSource(ft, en, face.mode), `${face.id}: i18n.en ≠ data/b4/tangram.js strings.${face.mode} (two sources)`);
    const jobs = [
      { locale: loc, baseName: `${face.id}-d2-${loc}`, tag: 'level' },
      { locale: loc, strings: LONG_CHROME, pageSize: 'a4', baseName: `${face.id}-d2-${loc}-longchrome`, tag: 'long' },
      { locale: loc, strings: WORST_CHROME, pageSize: 'a4', baseName: `${face.id}-d2-${loc}-worstchrome`, tag: 'worst' },
      { locale: loc, strings: FI4_CHROME, pageSize: 'a4', baseName: `${face.id}-d2-${loc}-fi4title`, tag: 'fi4' },
      { locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${face.id}-d2-${loc}-combo677`, tag: 'combo' },
    ];
    if (face.mode === 'match') jobs.push({ locale: loc, strings: ONE_LINE_CHROME, pageSize: 'a4', baseName: `${face.id}-d2-${loc}-oneline`, tag: 'oneline' });
    for (let sd = 2; sd <= seeds; sd++) jobs.push({ locale: loc, seedEpoch: sd, baseName: `${face.id}-d2-${loc}-seed${sd}`, tag: 'seed' });
    const pages = new Map(), seen = new Set(), holeClasses = new Set(), positions = new Set(), triSets = new Set();
    for (const job of jobs) {
      job.mode = face.mode; job.difficulty = 2;
      let r;
      try { r = await faceRenderCheck(page, ft, null, job); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { console.log(`[E] ${job.baseName}: THREW ${r.thrown}`); continue; }
      addAssertions(30);
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      const m = r.m;
      const key = face.mode === 'match' ? m.rows.map((x) => x.key + ':' + x.t0 + ':' + x.candidates.map((c) => c.t).join('.')).join('+') : m.figures.map((g) => g.key + ':' + g.transform + (g.missing ? ':' + g.missing : '')).join('+');
      if (job.tag === 'seed' || job.tag === 'level') pages.set(key, (pages.get(key) || 0) + 1);
      for (const g of m.figures) { seen.add(g.key); if (g.missing) holeClasses.add(g.missing); }
      for (const row of m.rows || []) { const ci = row.candidates.findIndex((c) => c.correct); if (ci >= 0) positions.add(ci); }
      if (face.mode === 'count') triSets.add(m.figures.map((g) => { const src = B.SUBS[g.key] || []; return src.filter((t) => 'LMS'.includes(TG.clsOf(t.id))).length; }).sort().join(''));
      if (job.tag !== 'seed') console.log(`[E] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction)${r.slack != null ? ', slack under the stage ' + Math.round(r.slack) : ''} ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    const nSeeds = seeds; // level + seeds 2..N
    note(pages.size >= Math.ceil(nSeeds / 2), `${face.id} sweep: only ${pages.size} distinct pages over ${nSeeds} seeds`);
    const poolKeys = face.mode === 'compose' ? [...cfg.pool2, ...cfg.pool3] : cfg.pool;
    const missed = poolKeys.filter((k) => !seen.has(k));
    if (face.mode === 'missing') note(missed.join() === 'cat', `${face.id} sweep never drew [${missed.join(' ')}] (exactly \`cat\` is unreachable at 677: 196 > 188)`);
    else note(missed.length === 0, `${face.id} sweep never drew ${missed.join(' ')}`);
    if (face.mode === 'missing') note(holeClasses.size === 4, `${face.id} sweep: hole classes seen ${[...holeClasses].join(' ')} (all four expected)`);
    if (face.mode === 'match') note(positions.size === 3, `${face.id} sweep: the correct candidate took positions ${[...positions].map((p) => p + 1).join(' ')} (all three expected)`);
    if (face.mode === 'count') note(triSets.size >= 2, `${face.id} sweep: the triangle values were constant (${[...triSets].join(' | ')})`);
    console.log(`[E] ${face.id} sweep over ${nSeeds} seeds: ${pages.size} distinct pages; drew ${[...seen].join('/')}${face.mode === 'missing' ? '; holes ' + [...holeClasses].join('') : ''}${face.mode === 'match' ? '; correct positions ' + [...positions].map((p) => p + 1).join('') : ''}${face.mode === 'count' ? '; triangle sets ' + [...triSets].join(' ') : ''}`);
  }

  // ---- the face poisons (en, d2; the correct face render is the control)
  const facePoison = (name, faceId, post, want, job) => poisons.push({ name, run: async () => {
    const ft = loadType(faceId);
    const mode = FACES.find((f) => f.id === faceId).mode;
    const r = await faceRenderCheck(page, ft, (job && job.inj) || null, { difficulty: 2, locale: loc, mode, strings: job && job.strings, pageSize: job && job.pageSize, seedEpoch: job && job.seedEpoch, baseName: `${faceId}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, post ? { post } : null);
    return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
  } });
  const faceBuildPoison = (name, faceId, cfgEdit, want) => poisons.push({ name, run: async () => {
    const ft = loadType(faceId);
    const mode = FACES.find((f) => f.id === faceId).mode;
    const cfg = clone(ft.difficulty[2]); cfgEdit(cfg);
    try { await faceRenderCheck(page, ft, { cfg }, { difficulty: 2, locale: loc, mode, baseName: `${faceId}-poison-cfg-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 24).toLowerCase() }); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; }
  } });
  const need = (re, h, what) => { const m = re.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (' + what + ')'); return m; };
  const svgOf = (h, openRe, what) => { const m = need(openRe, h, what); const start = m.index; const end = h.indexOf('</svg>', start); if (end < 0) throw new Error('NEEDLE MATCHED NOTHING (' + what + ' close)'); return { start, end: end + 6, open: m[0], text: h.slice(start, end + 6) }; };
  const S3 = 128, S4 = 102;

  // P5 square in the F4 pool → refuse
  faceBuildPoison('P5 F4 pool with square', 'G2-347', (c) => { c.pool = ['square', 'tree', 'arrow', 'rectangle']; }, /square.*refused/);
  // P6 an F4 distractor redrawn INSIDE the shadow's group: the rectangle row, one distractor → rot180 of the target
  facePoison('P6 F4 rectangle distractor rot180 (inside its group)', 'G2-347', (h) => {
    const row = need(/<div data-lcs-match-row data-lcs-figure="rectangle" data-lcs-transform="(\w+)"[^>]*>/, h, 'rectangle row');
    const rowStart = row.index; const rowEnd = h.indexOf('<div data-lcs-match-row', rowStart + 10);
    const seg = h.slice(rowStart, rowEnd < 0 ? undefined : rowEnd);
    const cand = need(/<div data-lcs-candidate="(\d)" data-lcs-t="(\w+)" style/, seg, 'a distractor cell');   // the first NON-correct cell (correct carries data-lcs-correct before style)
    const t0 = row[1];
    const target = TG.transformTiling(B.FIGURES.rectangle, t0);
    const drawn = TG.tangramFigure({ figure: 'rectangle', tans: TG.transformTiling(target, 'rot180'), S: S4, mode: 'solution', transform: 'rot180', stroke: 3, pad: 1.5 }).html;
    const cellStart = cand.index; const svgStart = seg.indexOf('<svg', cellStart); const svgEnd = seg.indexOf('</svg>', svgStart) + 6;
    const newSeg = seg.slice(0, cellStart) + cand[0].replace(`data-lcs-t="${cand[2]}"`, 'data-lcs-t="rot180"') + seg.slice(cellStart + cand[0].length, svgStart) + drawn + seg.slice(svgEnd);
    return h.slice(0, rowStart) + newSeg + (rowEnd < 0 ? '' : h.slice(rowEnd));
  }, /inside the (symmetry )?group|INSIDE the symmetry group/);
  // P7 data-lcs-correct moved to a turned candidate
  facePoison('P7 F4 data-lcs-correct on a turned candidate', 'G2-347', (h) => {
    const c = need(/ data-lcs-t="(\w+)" data-lcs-correct="1"/, h, 'the correct cell');
    let out = h.replace(c[0], ` data-lcs-t="${c[1]}"`);
    const d = need(/<div data-lcs-candidate="(\d)" data-lcs-t="(rot90|rot270|rot180|mirX|mirY|mirD|mirA)" style/, out, 'a turned cell');
    out = out.replace(d[0], d[0].replace(' style', ' data-lcs-correct="1" style'));
    return out;
  }, /correct candidate is stamped t|does not cast the shadow|correct candidate\(s\)/);
  // R3 two correct candidates
  facePoison('R3 F4 two data-lcs-correct on one row', 'G2-347', (h) => { const d = need(/<div data-lcs-candidate="(\d)" data-lcs-t="(?!id)(\w+)" style/, h, 'a distractor cell'); return h.replace(d[0], d[0].replace(' style', ' data-lcs-correct="1" style')); }, /2 correct candidates|correct candidate\(s\)/);
  // P17 an F4 distractor redrawn as the OTHER figure (arrow for tree) in the pose that casts the SAME shadow
  facePoison('P17 F4 decoy: arrow drawn in the pose that casts the tree shadow', 'G2-347', (h) => {
    const row = need(/<div data-lcs-match-row data-lcs-figure="tree" data-lcs-transform="(\w+)"[^>]*>/, h, 'tree row');
    const rowStart = row.index; const rowEnd = h.indexOf('<div data-lcs-match-row', rowStart + 10);
    const seg = h.slice(rowStart, rowEnd < 0 ? undefined : rowEnd);
    const cand = need(/<div data-lcs-candidate="(\d)" data-lcs-t="(\w+)" style/, seg, 'a distractor cell');
    const target = TG.transformTiling(B.FIGURES.tree, row[1]);
    const want = shapeKey5(target);
    const tArrow = TG.TRANSFORM_NAMES.find((t) => shapeKey5(TG.transformTiling(B.FIGURES.arrow, t)) === want);
    if (!tArrow) throw new Error('NEEDLE MATCHED NOTHING (arrow pose casting the tree shadow)');
    const drawn = TG.tangramFigure({ figure: 'arrow', tans: TG.transformTiling(B.FIGURES.arrow, tArrow), S: S4, mode: 'solution', transform: cand[2], stroke: 3, pad: 1.5 }).html;
    const cellStart = cand.index; const svgStart = seg.indexOf('<svg', cellStart); const svgEnd = seg.indexOf('</svg>', svgStart) + 6;
    const newSeg = seg.slice(0, svgStart) + drawn + seg.slice(svgEnd);
    return h.slice(0, rowStart) + newSeg + (rowEnd < 0 ? '' : h.slice(rowEnd));
  }, /same shadow|casts the shadow|≠ transformTiling/);
  // P8 an S / M hole whose other-size triangle chip becomes a Q
  facePoison('P8 F3 a triangle hole without the other triangle size (chip swapped for Q)', 'G1-355', (h) => {
    const fig = need(/<svg[^>]*data-lcs-mode="hole"[^>]*data-lcs-missing="(M|S)"[^>]*>/, h, 'an M or S hole');
    const other = fig[1] === 'M' ? 'S' : 'M';
    const after = h.slice(fig.index);
    const chip = need(new RegExp(`<span class="ws-achip" data-lcs-chip="${other}"( data-lcs-flip="1")? style="width:104px;height:(\\d+)px;border-radius:14px">`), after, 'the other-size chip');
    const chipStart = fig.index + chip.index; const svgStart = h.indexOf('<svg', chipStart); const svgEnd = h.indexOf('</svg>', svgStart) + 6;
    const q = TG.tanChip('Q', S3).html;
    const openNew = chip[0].replace(`data-lcs-chip="${other}"`, 'data-lcs-chip="Q"');
    return h.slice(0, chipStart) + openNew + h.slice(chipStart + chip[0].length, svgStart) + q + h.slice(svgEnd);
  }, /without the other triangle size/);
  // P9 a P hole's correct chip in the other flip
  facePoison('P9 F3 a P hole whose correct chip carries the other flip', 'G1-355', (h) => {
    const fig = need(/<svg[^>]*data-lcs-mode="hole"[^>]*data-lcs-missing="P"[^>]*>/, h, 'a P hole');
    const after = h.slice(fig.index);
    const chip = need(/<span class="ws-achip" data-lcs-chip="P"( data-lcs-flip="1")? data-lcs-correct="1" style="width:104px;height:(\d+)px;border-radius:14px">/, after, 'the correct P chip');
    const flipped = !chip[1];
    const chipStart = fig.index + chip.index; const svgStart = h.indexOf('<svg', chipStart); const svgEnd = h.indexOf('</svg>', svgStart) + 6;
    const openNew = flipped ? chip[0].replace('data-lcs-chip="P"', 'data-lcs-chip="P" data-lcs-flip="1"') : chip[0].replace(' data-lcs-flip="1"', '');
    return h.slice(0, chipStart) + openNew + h.slice(chipStart + chip[0].length, svgStart) + TG.tanChip('P', S3, { flip: flipped }).html + h.slice(svgEnd);
  }, /flip ≠ the hole|not congruent to the hole/);
  // P10 the correct chip drawn at Sg 80
  facePoison('P10 F3 a chip drawn at Sg 80 (not true-size)', 'G1-355', (h) => {
    const chip = need(/<span class="ws-achip" data-lcs-chip="(M|S|Q)" data-lcs-correct="1" style="width:104px;height:(\d+)px;border-radius:14px">/, h, 'a correct M/S/Q chip');
    const svgStart = h.indexOf('<svg', chip.index); const svgEnd = h.indexOf('</svg>', svgStart) + 6;
    return h.slice(0, svgStart) + TG.tanChip(chip[1], 80).html + h.slice(svgEnd);
  }, /drawn at 80|not true-size|edges .* ≠ true-size/);
  // P19 an M chip in the UPRIGHT pose (hyp vertical, 91 tall): the column overflows the 677 card inner
  facePoison('P19 F3 an M chip in the upright pose under the 677 chrome', 'G1-355', (h) => {
    const chip = need(/<span class="ws-achip" data-lcs-chip="M"( data-lcs-correct="1")? style="width:104px;height:(\d+)px;border-radius:14px">/, h, 'an M chip');
    const svgStart = h.indexOf('<svg', chip.index); const svgEnd = h.indexOf('</svg>', svgStart) + 6;
    const pts = TG.canonicalPose('M', S3).map(([x, y]) => [y + 2, x + 2]);
    const w = Math.ceil(Math.max(...pts.map((p) => p[0])) + 2), ht = Math.ceil(Math.max(...pts.map((p) => p[1])) + 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${ht}" viewBox="0 0 ${w} ${ht}" data-lcs-prim="tangram-chip" data-lcs-chip="M" data-lcs-scale="${S3}" style="display:block;flex:0 0 auto"><polygon points="${pts.map((p) => p.map((v) => Math.round(v * 100) / 100).join(',')).join(' ')}" fill="#FBF3E4" stroke="#146B5E" stroke-width="2" stroke-linejoin="round" data-lcs-pose="M"/></svg>`;
    const openNew = chip[0].replace(`height:${chip[2]}px`, `height:${ht + 8}px`);
    return h.slice(0, chip.index) + openNew + h.slice(chip.index + chip[0].length, svgStart) + svg + h.slice(svgEnd);
  }, /chip column .* > the card inner|outside its container|overflow|footer/, { strings: COMBO_CHROME, pageSize: 'a4' });
  // P15 a data-lcs-tan polygon inside an F1 outline
  facePoison('P15 F1 an outline carrying a data-lcs-tan polygon', 'K-358', (h) => { const o = svgOf(h, /<svg[^>]*data-lcs-mode="outline"[^>]*>/, 'an outline'); const inner = o.text.replace('</svg>', '<polygon points="10,10 60,10 35,35" fill="#FBF3E4" stroke="#146B5E" stroke-width="2" data-lcs-tan="S1" data-lcs-class="S"/></svg>'); return h.slice(0, o.start) + inner + h.slice(o.end); }, /data-lcs-tan polygons on an outline|carries 1 tan polygons/);
  // P18 F2 cards at padding 12 (the tree / the square-bbox shadows overflow a 302 inner)
  facePoison('P18 F2 cards at padding 12', 'G1-354', (h) => { if (!/style="padding:6px"/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (padding 6)'); return h.replace(/style="padding:6px"/g, 'style="padding:12px"'); }, /outside its container|padding 12 ≠ cfg 6/, { strings: COMBO_CHROME, pageSize: 'a4' });
  // P14 S 150 on a K face
  faceBuildPoison('P14 F1 at S 150 (small edge 53 < 56)', 'K-358', (c) => { c.S = 150; }, /K floor/);
  faceBuildPoison('P14b F5 at S 150', 'K-359', (c) => { c.S = 150; }, /K floor/);
  faceBuildPoison('F3 at S 120 (43 < the G1 floor 44)', 'G1-355', (c) => { c.S = 120; }, /G1 floor/);
  faceBuildPoison('F4 at S 100 (35 < the G2 floor 36)', 'G2-347', (c) => { c.S = 100; }, /G2 floor/);
  // P11 an F5 pool whose triangle counts take two values → the page rule refuses
  faceBuildPoison('P11 F5 pool with two triangle values only', 'K-359', (c) => { c.pool = ['rabbit-body', 'arrow-head-q', 'cat-head', 'trap-q-2s']; }, /page rule/);
  faceBuildPoison('F5 boxes with a third box', 'K-359', (c) => { c.boxes = ['triangles', 'squares', 'pieces']; }, /draws exactly/);
  faceBuildPoison('F1 mix 0+4 (pool3 holds 3)', 'K-358', (c) => { c.mix = [0, 4]; }, /needs 0 two-tan \/ 4 three-tan/);
  faceBuildPoison('F1 items 5 in a 2 x 2 grid', 'K-358', (c) => { c.items = 5; }, /items 5 !== cols x rows/);
  faceBuildPoison('F3 with an L hole', 'G1-355', (c) => { c.holes = ['L', 'M', 'S', 'Q']; }, /L chip/);
  faceBuildPoison('F4 root pad 2.5 (the cat at 158.0 does not clear the 158 box inner — build record open item 1)', 'G2-347', (c) => { c.pad = 2.5; }, /config lies about its pool/);
  faceBuildPoison('SPARSE F4 rows 3 (stack 504 < 660)', 'G2-347', (c) => { c.rows = 3; }, /sparse/);
  faceBuildPoison('F2 rowH 300 (boat / cat fit neither row)', 'G1-354', (c) => { c.rowH = 300; }, /config lies about its pool/);
  faceBuildPoison('F2 pool without boat / cat (tree ≡ arrow: three shapes for four cards)', 'G1-354', (c) => { c.pool = ['tree', 'arrow', 'rectangle', 'square']; }, /distinct shapes < 4/);
  // SPARSE render poisons
  facePoison('SPARSE F4 the stage centred (not top-anchored)', 'G2-347', (h) => { if (!/justify-content:flex-start;align-items:center/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (flex-start)'); return h.replace('justify-content:flex-start;align-items:center', 'justify-content:center;align-items:center'); }, /not top-anchored/);
  facePoison('SPARSE F1 the grid pinned to 500 px (blank paper under the stage)', 'K-358', (h) => { if (!/<div class="ws-cardgrid" style="/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (grid)'); return h.replace('<div class="ws-cardgrid" style="', '<div class="ws-cardgrid" style="flex:0 0 auto;height:500px;'); }, /blank paper under the (stage|grid)/);
  facePoison('SPARSE F5 the grid pinned to 500 px', 'K-359', (h) => { if (!/<div class="ws-cardgrid" style="/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (grid)'); return h.replace('<div class="ws-cardgrid" style="', '<div class="ws-cardgrid" style="flex:0 0 auto;height:500px;'); }, /blank paper under the (stage|grid)/);
  // SPARSE F5: a narrow set re-drawn in its FLAT pose (rabbit-head 165 x 86 instead of 86 x 165)
  facePoison('SPARSE F5 a narrow set drawn in the flat pose', 'K-359', (h) => {
    const o = svgOf(h, /<svg[^>]*data-lcs-figure="(rabbit-head|kite-l-q-s|arrow-head-q)" data-lcs-mode="solution"[^>]*>/, 'a narrow set');
    const key = /data-lcs-figure="([a-z0-9-]+)"/.exec(o.open)[1];
    const t = /data-lcs-transform="(\w+)"/.exec(o.open)[1];
    const src = B.SUBS[key];
    const flat = TG.TRANSFORM_NAMES.find((u) => { const d = drawnSize(TG.transformTiling(src, u), 160, 2.5); const cur = drawnSize(TG.transformTiling(src, t), 160, 2.5); return d.h < cur.h - 20; });
    if (!flat) throw new Error('NEEDLE MATCHED NOTHING (a flatter pose)');
    const drawn = TG.tangramFigure({ figure: key, tans: TG.transformTiling(src, flat), S: 160, mode: 'solution', transform: flat, data: { 'data-lcs-sub': key } }).html;
    return h.slice(0, o.start) + drawn + h.slice(o.end);
  }, /flat pose/, { seedEpoch: 1 });
  // answers: an F5 box stamped one too many; an F3 hole stamped with the wrong class
  facePoison('F5 a box stamped one too many', 'K-359', (h) => { const b = need(/data-lcs-answer="(\d)"/, h, 'an answer box'); return h.replace(b[0], `data-lcs-answer="${+b[1] + 1}"`); }, /stamps .* the set holds|box 1 stamps/);
  facePoison('F3 a hole stamped with the wrong class', 'G1-355', (h) => { const m = need(/data-lcs-missing="(M|S)"/, h, 'a hole stamp'); return h.replace(m[0], `data-lcs-missing="${m[1] === 'M' ? 'S' : 'M'}"`); }, /missing stamp|not of the stamped class|correct chip/);
  // R1 a face row equal to the base's d2 config → the distinctness check rejects
  poisons.push({ name: 'R1 a face row equal to the base d2 config (the distinctness check rejects)', run: async () => { const fake = { ...loadType('K-359'), difficulty: { 1: base.difficulty[2], 2: base.difficulty[2], 3: base.difficulty[2] } }; return distinctFromBase(fake, base) ? 'silent (the base config passed as a face)' : null; } });
  poisons.push({ name: 'a face i18n.en title drifting from data/b4/tangram.js (two sources)', run: async () => { const ft = loadType('K-359'); const drift = { ...ft, i18n: { en: { title: 'Tangram Puzzles: Count the Pieces', instruction: ft.i18n.en.instruction } } }; return oneSource(drift, en, 'count') ? 'silent' : null; } });
}

async function main() {
  const locales = arg('locales', 'en').split(',');
  const seeds = +arg('seeds', QUICK ? 12 : 20);
  const type = loadType(ID);
  const B = loadBankModule();
  const strings = loadStrings();
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  fs.mkdirSync(OUT, { recursive: true });
  for (const s of [LONG_CHROME, WORST_CHROME, FI4_CHROME, COMBO_CHROME]) { note(glyphs(s.title) <= 70, 'probe title > 70: ' + s.title); note(glyphs(s.instruction) <= 150, 'probe instruction > 150'); }
  freeClaim.selfTest();

  // ---- A
  const dataFails = gate.check(B, { source: fs.readFileSync(BANK_FILE, 'utf8') });
  assertions += 60;
  failures.push(...dataFails.map((x) => 'A data: ' + x));
  console.log(`[A] bank: ${Object.keys(B.FIGURES).length} figures · ${Object.keys(B.MINIS).length} minis · ${Object.keys(B.SUBS).length} subs · ${dataFails.length} data faults`);
  const bandTitles = new Map();
  for (const spec of loadAllTypes()) if (spec.id.startsWith('K-') && spec.id !== ID) bandTitles.set(spec.i18n.en.title.toLowerCase(), spec.id);
  for (const loc of locales) {
    const block = strings[loc];
    note(!!block, `no ${loc} block in data/b4/tangram.js (refusal — the ${loc} panel has not authored it)`);
    if (!block) { console.log(`[A] ${loc}: no strings block (refused)`); continue; }
    const a = validateStrings(block, loc, { spec: type, bandTitles });
    assertions += 30;
    failures.push(...a.map((x) => 'A strings: ' + x));
    console.log(`[A] ${loc}: ${Object.keys(block.strings).length} string pairs · ${a.length} faults`);
  }
  note(type.themeAxis && type.themeAxis.applicable === false, 'themeAxis must be off');
  note(type.unitAxis && type.unitAxis.applicable === false, 'unitAxis must be off');
  note(type.exerciseType === 'tangram' && type.gradeBand === 'K', 'exerciseType / band');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const report = [];
  try {
    for (const loc of locales) {
      if (!strings[loc]) continue;
      // ---- C
      const renders = [];
      for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, baseName: `${ID}-d${d}-${loc}`, tag: 'level' });
      for (const [name, st] of [['longchrome', LONG_CHROME], ['worstchrome', WORST_CHROME], ['fi4title', FI4_CHROME]]) for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, strings: st, pageSize: 'a4', baseName: `${ID}-d${d}-${loc}-${name}`, tag: name });
      for (const d of [2, 3]) renders.push({ difficulty: d, locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${ID}-d${d}-${loc}-combo677`, tag: 'combo' });
      for (const d of [2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ difficulty: d, locale: loc, seedEpoch: s, baseName: `${ID}-d${d}-${loc}-seed${s}`, tag: 'seed' });
      const pages = { 1: new Map(), 2: new Map(), 3: new Map() };
      const seen = { 1: new Set(), 2: new Set(), 3: new Set() };
      for (const job of renders) {
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
        assertions += 40;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        for (const f of r.figures) seen[job.difficulty].add(f.key);
        if (job.tag === 'seed' || job.tag === 'level') { const key = r.figures.map((f) => f.key).join('+'); if (!pages[job.difficulty].has(key)) pages[job.difficulty].set(key, job.baseName); }
        if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction), figures [${r.figures.map((f) => f.key + ':' + f.mode).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      for (const d of [2, 3]) {
        const pool = type.difficulty[d].pool;
        // 5 figures -> 20 ordered pairs: the sweep must VARY (>= half its seeds distinct; birthday
        // collisions are certain over 20 seeds, so pairwise distinctness would fail a correct rng)
        note(pages[d].size >= Math.ceil(seeds / 2), `d${d} sweep: only ${pages[d].size} distinct pairs over ${seeds} seeds`);
        note(pool.every((k) => seen[d].has(k)), `d${d} sweep never drew ${pool.filter((k) => !seen[d].has(k)).join(' ')}`);
        note(!seen[d].has('square'), `d${d} sweep drew the square as a figure`);
        console.log(`[C] d${d} sweep over ${seeds} seeds: ${pages[d].size} distinct pairs, figures seen ${[...seen[d]].join('/')}`);
      }
      {
        let r; try { r = await renderCheck(page, type, null, { difficulty: 1, locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${ID}-d1-${loc}-combo677` }); } catch (e) { r = { thrown: e.message }; }
        const line = r.thrown ? 'THREW ' + r.thrown : `body ${r.body}: ${r.fails.length ? r.fails.join(' | ') : 'ok'}`;
        report.push(`d1 (stack 698, bodyMin 700, not shipped) under the 4-line title + 3-line instruction (677): ${line}`);
        console.log(`[C] ${ID}-d1-${loc}-combo677 (REPORTED, not asserted): ${line}`);
      }
    }

    // ---- D. poisons (en; each must FAIL for its own reason; control = the correct bank + page)
    const loc = 'en';
    const control = await renderCheck(page, type, null, { difficulty: 2, locale: loc, baseName: `${ID}-control` });
    const control3 = await renderCheck(page, type, null, { difficulty: 3, locale: loc, baseName: `${ID}-control-d3` });
    note(control.fails.length === 0 && control3.fails.length === 0 && dataFails.length === 0, 'control (correct bank + page) did not pass: ' + control.fails.concat(control3.fails).join(' | '));
    const poisons = [];
    const htmlPoison = (name, post, want, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, (job && job.inj) || null, { difficulty: (job && job.difficulty) || 2, locale: loc, strings: job && job.strings, pageSize: job && job.pageSize, baseName: `${ID}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const buildPoison = (name, run, want) => poisons.push({ name, run: async () => { try { await run(); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; } } });
    const stringsPoison = (name, block, locale, want) => poisons.push({ name, run: async () => { const f = validateStrings(block, locale); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    // the other direction: a CORRECT native string must not trip a ban (the ban-too-wide trap)
    const stringsControl = (name, block, locale, mustNotMatch) => poisons.push({ name, run: async () => { const f = validateStrings(block, locale); const hit = f.find((x) => mustNotMatch.test(x)); return hit ? 'the ban is too wide: ' + hit : null; } });
    const cfg2 = type.difficulty[2], cfg3 = type.difficulty[3];

    htmlPoison('P14 a figure re-drawn at S 150 (small edge 53)', (h) => editFigure(h, 1, (open, inner, close) => { const k = 150 / 216; let o = setAttr(open, 'data-lcs-scale', '150'); o = setAttr(o, 'width', String(Math.ceil(+/width="(\d+)"/.exec(open)[1] * k))); o = setAttr(o, 'height', String(Math.ceil(+/height="(\d+)"/.exec(open)[1] * k))); o = o.replace(/viewBox="[^"]*"/, `viewBox="0 0 ${/width="(\d+)"/.exec(o)[1]} ${/height="(\d+)"/.exec(o)[1]}"`); const inn = inner.replace(/points="([^"]*)"/g, (_, p) => `points="${scaleNumbers(p, k)}"`).replace(/ d="([^"]*)"/g, (_, p) => ` d="${scaleNumbers(p, k)}"`); return o + inn + close; }), /edge .* < 56|floor/);
    buildPoison("P20 pool ['square','tree'] on the base", () => renderCheck(page, type, { cfg: { ...cfg2, pool: ['square', 'tree'] } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-square-pool` }), /square/);
    htmlPoison('P20b figure A stamped as the square', (h) => editFigure(h, 0, (open, inner, close) => setAttr(open, 'data-lcs-figure', 'square') + inner + close), /square|not in the pool/);
    htmlPoison('R2 a d3 shadow with a cream fill (seams would show)', (h) => editFigure(h, 0, (open, inner, close) => open + inner.replace(/fill="#146B5E"/, 'fill="#FBF3E4"') + close), /fill .* != stroke|must both be teal/, { difficulty: 3 });
    htmlPoison('a figure with six tans', (h) => editFigure(h, 0, (open, inner, close) => { const m = /<polygon [^>]*data-lcs-tan="M"[^>]*\/>/.exec(inner); if (!m) throw new Error('NEEDLE MATCHED NOTHING (M)'); return open + inner.replace(m[0], '') + close; }), /not the seven|has 6 tans/);
    htmlPoison('the set with L2 moved onto L1 (overlap)', (h) => { const re = /(<svg[^>]*data-lcs-set="1"[^>]*>)([\s\S]*?)(<\/svg>)/; const m = re.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (set)'); const l1 = /<polygon points="([^"]*)"[^>]*data-lcs-tan="L1"/.exec(m[2]); const l2 = /<polygon points="([^"]*)"[^>]*data-lcs-tan="L2"/.exec(m[2]); if (!l1 || !l2) throw new Error('NEEDLE MATCHED NOTHING (L1/L2)'); const inner = m[2].replace(l2[0], l2[0].replace(`points="${l2[1]}"`, `points="${l1[1]}"`)); return h.replace(m[0], m[1] + inner + m[3]); }, /overlaps/);
    htmlPoison("a figure's scale stamp 200", (h) => editFigure(h, 0, (open, inner, close) => setAttr(open, 'data-lcs-scale', '200') + inner + close), /scale 200 ≠ 216|scale stamp/);
    htmlPoison('figure A stamped with figure B\'s key (the stamp lies about the drawing)', (h) => { const a = nthFigure(h, 0), b = nthFigure(h, 1); if (a.m[2] === b.m[2]) throw new Error('NEEDLE MATCHED NOTHING (two distinct figures)'); return editFigure(h, 0, (open, inner, close) => setAttr(open, 'data-lcs-figure', b.m[2]) + inner + close); }, /!= the stored/);
    htmlPoison('a figure with one tan nudged 3 px (the stored placement broken)', (h) => editFigure(h, 0, (open, inner, close) => { const m = /<polygon points="([^"]*)"([^>]*data-lcs-tan="Q"[^>]*\/>)/.exec(inner); if (!m) throw new Error('NEEDLE MATCHED NOTHING (Q)'); const moved = m[1].split(' ').map((pt) => { const [x, y] = pt.split(',').map(Number); return (x + 3) + ',' + y; }).join(' '); return open + inner.replace(m[0], `<polygon points="${moved}"${m[2]}`) + close; }), /!= the stored|overlaps/);
    htmlPoison('a CSS-scaled figure', (h) => editFigure(h, 0, (open, inner, close) => open.replace('style="display:block', 'style="width:160px;height:auto;display:block') + inner + close), /CSS-scaled/);
    htmlPoison('a legend swatch off the palette', (h) => { if (!/fill="#C0392B"/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (codeRed)'); return h.replace('fill="#C0392B"', 'fill="#FF0000"'); }, /off-palette|not a codeColors/);
    htmlPoison('a duplicated legend row', (h) => { const m = /<div data-lcs-legend="Q"[\s\S]*?<\/svg><\/div>/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (legend Q)'); return h.replace(m[0], m[0] + m[0]); }, /legend rows/);
    htmlPoison('no scissors', (h) => { const m = /<svg[^>]*data-lcs-scissors="1"[^>]*>[\s\S]*?<\/svg>/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (scissors)'); return h.replace(m[0], ''); }, /scissors/);
    htmlPoison('a <text> node in a figure', (h) => editFigure(h, 0, (open, inner, close) => open + inner + '<text x="20" y="20" font-size="14">cat</text>' + close), /carries text|text on the body/);
    htmlPoison('a data-lcs-answer on the page', (h) => editFigure(h, 0, (open, inner, close) => open.replace('data-lcs-mode', 'data-lcs-answer="cat" data-lcs-mode') + inner + close), /answer/);
    htmlPoison('the flat stack under the 677 chrome (row min-height 430)', (h) => { if (!/<div data-lcs-figure-row/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (row)'); return h.replace('<div data-lcs-figure-row', '<div data-lcs-figure-row-x').replace(/(<div data-lcs-figure-row-x[^>]*style=")/, '$1min-height:430px;').replace('data-lcs-figure-row-x', 'data-lcs-figure-row'); }, /footer overlap|footer|into the footer/, { strings: COMBO_CHROME, pageSize: 'a4', difficulty: 2 });
    htmlPoison('a blank page (root emptied)', (h) => { const m = /(<div data-ws-content data-lcs-type="K-353"[^>]*>)[\s\S]*(<\/div>\s*)$/.exec(h.trim()); if (!m) throw new Error('NEEDLE MATCHED NOTHING (root)'); return m[1] + '</div>'; }, /blank|no figure row|0 cut-out sets|non-vacuity/);
    buildPoison('config S 150 (below the K floor)', () => renderCheck(page, type, { cfg: { ...cfg2, S: 150 } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-s150` }), /K floor/);
    buildPoison('config figures 3', () => renderCheck(page, type, { cfg: { ...cfg2, figures: 3 } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-fig3` }), /figures 3/);
    buildPoison('config pool with an unknown key', () => renderCheck(page, type, { cfg: { ...cfg2, pool: ['tree', 'dragon'] } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-dragon` }), /unknown figure/);
    buildPoison('config pool with triangle (437 wide: does not fit two-up at 216)', () => renderCheck(page, type, { cfg: { ...cfg2, pool: ['tree', 'triangle'] } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-triangle` }), /do not fit|only \d of the pool/);
    buildPoison("config mode 'zzz'", () => renderCheck(page, type, { cfg: { ...cfg2, mode: 'zzz' } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-mode` }), /unknown mode/);
    buildPoison("config mode 'compose' on the base's own config (no face keys: refuse, never a silent base render)", () => renderCheck(page, type, { cfg: { ...cfg2, mode: 'compose' } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-compose` }), /compose: (cols|rows|items|mix)/);
    buildPoison('locale xx (no strings block)', () => renderCheck(page, type, null, { difficulty: 2, locale: 'xx', baseName: `${ID}-poison-xx` }), /no xx block/);
    buildPoison('a block without strings', () => renderCheck(page, type, { bank: { exclude: [] } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-nostrings` }), /carries no strings/);
    const en = strings.en;
    stringsPoison('P21 a title "Tangram Puzzles with Answers"', (() => { const b = clone(en); b.strings.match.title = 'Tangram Puzzles with Answers: Which Solution Matches?'; return b; })(), 'en', /answer key/);
    stringsControl('P21 control: de "Finde die Lösung" must PASS the answers ban', (() => { const b = clone(en); b.strings.match.title = 'Tangram-Figuren: Finde die Lösung zum Schattenbild'; return b; })(), 'de', /answer key/);
    stringsControl('P22 control: fr "les sept pièces" must PASS the true-size ban', (() => { const b = clone(en); b.strings[ID].instruction = 'Colorie chaque pièce comme la légende, découpe les sept pièces, puis pose-les sur les deux modèles.'; return b; })(), 'fr', /true size/);
    stringsControl('es control: "piezas" beside tangram must PASS', (() => { const b = clone(en); b.strings.compose.instruction = 'Mira las piezas de tangram sobre cada figura y dibuja las líneas.'; return b; })(), 'es', /ficha/);
    stringsControl('sv control: "bitar", no "grupp", must PASS', (() => { const b = clone(en); b.strings.count.instruction = 'Räkna trianglarna i varje bild och skriv talet i rutan.'; return b; })(), 'sv', /grupp/);
    stringsPoison('P22 a fr instruction "taille réelle"', (() => { const b = clone(en); b.strings[ID].instruction = 'Colorie chaque pièce comme la légende, découpe les sept pièces à taille réelle, puis pose-les sur les deux modèles.'; return b; })(), 'fr', /true size/);
    stringsPoison('es "fichas de tangram" in an instruction', (() => { const b = clone(en); b.strings.compose.instruction = 'Mira las fichas de tangram sobre cada figura y dibuja las líneas.'; return b; })(), 'es', /ficha/);
    stringsPoison('sv "grupp"', (() => { const b = clone(en); b.strings.count.instruction = 'Räkna trianglarna i varje grupp och skriv talet i rutan.'; return b; })(), 'sv', /grupp/);
    stringsPoison('a 71-char title', (() => { const b = clone(en); b.strings.silhouette.title = 'Tangram Puzzles: Four Shadows to Build with the Seven Pieces of the Set'; return b; })(), 'en', /> 70/);
    stringsPoison('a worksheet-word title', (() => { const b = clone(en); b.strings.missing.title = 'Tangram Worksheet: Which Piece Is Missing?'; return b; })(), 'en', /worksheet-word/);
    stringsPoison('the bare head as a face title', (() => { const b = clone(en); b.strings.count.title = 'Tangram Puzzles'; return b; })(), 'en', /bare head/);
    stringsPoison('a visible free claim', (() => { const b = clone(en); b.strings.compose.instruction = 'Free printable tangram: draw the lines inside each shape.'; return b; })(), 'en', /free/);
    stringsPoison('a face mode key missing', (() => { const b = clone(en); delete b.strings.match; return b; })(), 'en', /strings.match missing/);
    stringsPoison('a "printable" title', (() => { const b = clone(en); b.strings.silhouette.title = 'Printable Tangram Puzzles: Four Shadows to Build'; return b; })(), 'en', /printable/);

    // ---- E. the five faces (Phase 2): renders at every chrome + the gate's OWN audit + sweeps + the design's face poisons
    await faceSection({ page, base: type, B, strings, note, failures, seeds, poisons, htmlFacePoison: null, addAssertions: (n) => { assertions += n; } });

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    for (const r of report) console.log('[R] ' + r);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(verdict ? `PASS (${assertions} assertions, ${killed}/${poisons.length} poisons killed)` : `FAIL (${assertions} assertions, ${failures.length} failures, ${killed}/${poisons.length} poisons killed)`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateStrings, LONG_CHROME, WORST_CHROME, FI4_CHROME, COMBO_CHROME };
