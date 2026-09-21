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
    buildPoison("config mode 'compose' (a Phase-2 face on the base)", () => renderCheck(page, type, { cfg: { ...cfg2, mode: 'compose' } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-compose` }), /Phase-2 face/);
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
