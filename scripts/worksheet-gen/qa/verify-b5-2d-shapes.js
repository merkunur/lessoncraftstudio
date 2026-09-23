#!/usr/bin/env node
/**
 * verify-b5-2d-shapes.js — the K-368 `2d-shapes` family gate (design
 * docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §5; the nt10-E build brief
 * deliverable 4). The base page (sections 0-4 below) AND, since Phase E
 * (2026-09-23), the five faces G1-381 K-371 G1-382 G1-383 K-372 (section 5:
 * qa/b5-2d-shapes-faces.js — sweeps, renders at 814 / 722 / 677, SPARSE +
 * FILL + OVERLAP + answer-tell + apparatus gates, the face poisons PR2 PR6
 * PR8 PR9 PR10 PR12 and their both-ways controls).
 *
 *   node scripts/worksheet-gen/qa/verify-b5-2d-shapes.js [--quick]
 *
 * 0. PRIMITIVE — qa/verify-flat-shape.js (node pass + its 5 poisons; the
 *    Chromium render pass unless --quick) must PASS.
 * 1. BANK — validateBank(block, loc) (exported; tools/b5-probe-child.js calls
 *    it for every panel draft), the design's rules 1-10:
 *      1 names: the 4 core kinds, non-empty, pairwise distinct (locale case-
 *        fold), each === displayWord(vocab singular) unless overrides[kind]
 *        has a reason; hexagon iff inventory.hexagon
 *      2 no name equals / contains the locale's geometry type name or the
 *        `shapes` theme name
 *      3 every riddle 1-2 sentences, <= 90 chars, free of every name and
 *        every listed inflection (NFC, case-fold, (?<!\p{L})…(?!\p{L}))
 *      4 clue tags circle round · triangle three · square equal · rectangle
 *        longShort (hexagon six); exactly 2 riddles per kind
 *      5 no name / override is the locale's oval / diamond / star / heart /
 *        moon vocab singular
 *      6 instructions <= 150, one sentence (fi: two only with a recorded
 *        reason); around-us names both the circle and the rectangle literal;
 *        en: write-name names the line and the box, dot-draw the dots, no
 *        "tick" / "letter boxes" / "line to"; no string promises answers
 *      7 titles <= 70, no worksheet-word, no visible free-claim, never the
 *        `shapes` theme name / slug, unique across the 6 and pairwise
 *        differing by a token; da never "Former og figurer"; it never starts
 *        "Forme geometriche"; de base carries the naming verb
 *      8 objects: picOpened, cache file present, never a bw theme, a vocab
 *        entry for the locale not excluded, shapes exactly {circle,
 *        rectangle}, >= 4 each, none of the design's rejected pictures, no
 *        repeat
 *      9 inventory.hexagon false => no hexagon name / riddle
 *     10 strings keys === the 6 modes
 *    The EN bank is the control; synthetic blocks (vocab names in the EN
 *    shape) for the ten other locales pass the name rules.
 * 2. RENDER through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en, then d2 under the 722 chrome (a 3-line de
 *    title + 3-line instruction) and the 677 chrome (a 4-line fi title) with
 *    a synthetic fi bank (suorakulmio, the widest name in 11 locales).
 *    Asserts verify() empty, qa/lints.js clean, and — ITSELF, from the
 *    rendered markup with its OWN classify() (never data-lcs-kind): exactly
 *    one tag names each drawn shape; no square card carries a rectangle tag;
 *    min caliper >= 30 and extent >= 72 per figure; turned / 45° square /
 *    skinny counts and the size spread; lens clearance; tags >= 48 high at
 *    the configured px in Baloo 2, unclipped; every tag text === the bank
 *    literal; the card grid fills the body; nothing below the footer.
 * 3. SWEEP — 20 seeds (seedEpoch 1..20, the shipped seed is epoch 1) x d1-d3
 *    through the same node checks on bodyHtml; the answer-slot share over the
 *    20 d2 pages <= 60 % per slot; the de synthetic bank draws the SAME
 *    figures + tag order as en (the seed carries no locale); an unauthored
 *    locale REFUSES. (--quick: 5 seeds, no d2 renders.)
 * 4. POISON — each must FAIL for its OWN reason (no fail = SILENT, a wrong
 *    reason = WRONG REASON; either exits 1); the correct EN bank is the
 *    control. Design §5: P1-P12 (bank) · PR1 a square card with a rectangle
 *    tag · PR3 two data-lcs-kind stamps swapped → the gate STAYS GREEN · PR4
 *    A's old obtuse (2.9,1) at R 60 → "min caliper 25.5 < 30" · PR5 tags 110
 *    wide → fi suorakulmio overflows · PR7 every answer in slot 0 → slot
 *    spread · PR11 a face config at difficulty 2 → the config guard fires
 *    before render. Base additions: PX a 40 px tag (spec guard + render
 *    floor) · PT the 45° square drawn level → turned-square count · PW a tag
 *    text ≠ the bank literal. The face poisons PR2 PR6 PR8 PR9 PR10 PR12 are
 *    Phase E (F1-F5 are not built).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const T = require('../primitives/_tokens.js');
const FS = require('../primitives/flat-shape.js');
const FSG = require('./verify-flat-shape.js');
const { vocab, excluded, displayWord } = require('../lib/b2-common.js');
const freeClaim = require('../../lib/free-claim.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const bankMod = require('../data/b5/2d-shapes.js');

const ROOT = path.join(__dirname, '..', '..', '..');
const TAX = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cache', 'manifest.json'), 'utf8'));
const CACHE = path.join(__dirname, '..', 'cache', 'themes');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CORE = bankMod.KINDS;
const MODES = bankMod.MODES;
const CLUE_OF = bankMod.CLUE_OF;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const QUICK = process.argv.includes('--quick');
const TYPE = require('../types/k/K-368-2d-shapes.js');
const TEAL = T.color.teal.toUpperCase();

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const clone = (o) => JSON.parse(JSON.stringify(o));
const fold = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc || 'en');
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, word, loc) => new RegExp('(?<!\\p{L})' + escRe(fold(word, loc)) + '(?!\\p{L})', 'u').test(fold(text, loc));
const sentences = (s) => (String(s).trim().match(/[^.!?…]+[.!?…]+(?=\s|$)|[^.!?…]+$/gu) || []).filter((x) => x.trim()).length;

/** Apparatus words (en) and the modes whose page carries that apparatus (rule 6, Phase E). */
const APPARATUS = [
  ['row', /(?<!\p{L})rows?(?!\p{L})/iu, ['real-or-not']],
  ['picture', /(?<!\p{L})pictures?(?!\p{L})/iu, ['around-us']],
  ['tile', /(?<!\p{L})tiles?(?!\p{L})/iu, ['around-us']],
  ['line', /(?<!\p{L})lines?(?!\p{L})/iu, ['write-name', 'dot-draw']],
  ['box', /(?<!\p{L})box(es)?(?!\p{L})/iu, ['write-name']],
  ['dot', /(?<!\p{L})dots?(?!\p{L})/iu, ['dot-draw']],
  ['riddle', /(?<!\p{L})riddles?(?!\p{L})/iu, ['riddles']],
  ['bubble', /(?<!\p{L})bubbles?(?!\p{L})/iu, ['riddles']],
  ['grid', /(?<!\p{L})(grid|lattice)s?(?!\p{L})/iu, ['dot-draw']],
  ['tag', /(?<!\p{L})tags?(?!\p{L})/iu, []],
];
const APPARATUS_NEED = {
  'real-or-not': ['row', /(?<!\p{L})rows?(?!\p{L})/iu], 'around-us': ['picture', /(?<!\p{L})pictures?(?!\p{L})/iu],
  'write-name': ['line', /(?<!\p{L})line(?!\p{L})/iu], riddles: ['riddle', /(?<!\p{L})riddles?(?!\p{L})/iu], 'dot-draw': ['dots', /(?<!\p{L})dots?(?!\p{L})/iu],
};

/* =================================================================== 1. BANK */
function validateBank(block, loc) {
  const f = [];
  const E = (m) => f.push(m);
  const l = String(loc).slice(0, 2);
  const V = vocab();
  if (!block || typeof block !== 'object') return ['no block (rule 10)'];
  const names = block.names || {};
  const overrides = block.overrides || {};
  const inv = block.inventory || {};
  const kinds = inv.hexagon ? [...CORE, 'hexagon'] : CORE.slice();
  // rule 1
  for (const k of CORE) if (typeof names[k] !== 'string' || !names[k].trim()) E(`names.${k} missing or empty (rule 1)`);
  const seen = new Map();
  for (const k of Object.keys(names)) {
    if (typeof names[k] !== 'string') continue;
    const key = fold(names[k], l);
    if (seen.has(key)) E(`names.${k} "${names[k]}" equals names.${seen.get(key)} (rule 1: pairwise distinct)`);
    seen.set(key, k);
    const v = V[k] && V[k][l];
    const want = v && v[0] ? displayWord(v[0], l) : null;
    if (names[k] !== want) {
      const o = overrides[k];
      if (!o || typeof o.reason !== 'string' || !o.reason.trim() || o.word !== names[k]) E(`names.${k} "${names[k]}" ≠ the vocab singular "${want}" and no overrides.${k} {word, reason} (rule 1)`);
    }
  }
  if (inv.hexagon && !names.hexagon) E('inventory.hexagon is true but names.hexagon is missing (rule 1)');
  if (!inv.hexagon && names.hexagon) E('names.hexagon present but inventory.hexagon is false (rule 9)');
  // rule 2
  const geo = TAX.axes['exercise-type'].geometry.name[l], themeName = TAX.axes.theme.shapes.name[l], themeSlug = TAX.axes.theme.shapes.slug[l];
  for (const [k, w] of Object.entries(names)) for (const bad of [geo, themeName]) if (bad && typeof w === 'string' && fold(w, l).includes(fold(bad, l))) E(`names.${k} "${w}" contains "${bad}" (the geometry type / shapes theme name) (rule 2)`);
  // rule 5
  for (const [k, w] of Object.entries({ ...names, ...Object.fromEntries(Object.entries(overrides).map(([kk, o]) => ['override:' + kk, o && o.word])) })) {
    for (const bad of ['oval', 'diamond', 'rhombus', 'star', 'heart', 'moon']) {
      const v = V[bad] && V[bad][l];
      if (v && v[0] && typeof w === 'string' && fold(w, l) === fold(v[0], l)) E(`${k} "${w}" is the ${bad} vocab singular (rule 5)`);
    }
  }
  // rules 3 + 4 + 9
  const riddles = block.riddles || {};
  const leakWords = [...Object.values(names), ...Object.values(block.inflections || {}).flat(), ...Object.values(overrides).map((o) => o && o.word)].filter((w) => typeof w === 'string' && w.trim());
  for (const k of kinds) {
    const rs = riddles[k];
    if (!Array.isArray(rs) || rs.length !== 2) { E(`riddles.${k}: ${Array.isArray(rs) ? rs.length : 0} riddles ≠ 2 (rule 4)`); continue; }
    rs.forEach((r, i) => {
      const t = r && r.text;
      if (typeof t !== 'string' || !t.trim()) { E(`riddles.${k}[${i}] empty (rule 3)`); return; }
      if ([...t].length > 90) E(`riddles.${k}[${i}] is ${[...t].length} chars > 90 (rule 3)`);
      const n = sentences(t);
      if (n < 1 || n > 2) E(`riddles.${k}[${i}] has ${n} sentences (1-2) (rule 3)`);
      for (const w of leakWords) if (hasWord(t, w, l)) E(`riddles.${k}[${i}] "${t}" contains the name / inflection "${w}" (rule 3)`);
      if (r.clue !== CLUE_OF[k]) E(`riddles.${k}[${i}] clue "${r.clue}" ≠ "${CLUE_OF[k]}" (rule 4)`);
    });
  }
  for (const k of Object.keys(riddles)) if (!kinds.includes(k)) E(`riddles.${k}: not a kind of this inventory${k === 'hexagon' ? ' (rule 9: inventory.hexagon is false)' : ' (rule 4)'}`);
  // rule 10
  const strings = block.strings || {};
  const have = Object.keys(strings);
  const miss = MODES.filter((m) => !have.includes(m)), extra = have.filter((m) => !MODES.includes(m));
  if (miss.length || extra.length) E(`strings keys: missing [${miss.join(', ')}] extra [${extra.join(', ')}] (rule 10)`);
  // rule 6
  for (const m of MODES) {
    const s = strings[m];
    if (!s) continue;
    const ins = s.instruction || '';
    if (!ins.trim()) E(`strings.${m}.instruction empty (rule 6)`);
    if ([...ins].length > 150) E(`strings.${m}.instruction ${[...ins].length} chars > 150 (rule 6)`);
    const ns = sentences(ins);
    const twoOk = l === 'fi' && block.twoSentenceReason && typeof block.twoSentenceReason[m] === 'string' && block.twoSentenceReason[m].trim();
    if (ns !== 1 && !(ns === 2 && twoOk)) E(`strings.${m}.instruction has ${ns} sentences (one; fi two only with a recorded reason) (rule 6)`);
    for (const x of [s.title, ins]) if (/answer\s*key|with\s+answers|solutions?\b/i.test(x || '') && l === 'en') E(`strings.${m} promises an answer key: "${x}" (rule 6: printable decks ship none)`);
    if (l === 'en') {
      if (/(?<!\p{L})tick(?!\p{L})|letter boxes|line to(?!\p{L})/iu.test(ins)) E(`strings.${m}.instruction "${ins}" asks for a tick / letter boxes / a line to (rule 6)`);
      if (m === 'write-name' && !(/(?<!\p{L})line(?!\p{L})/i.test(ins) && /(?<!\p{L})box(?!\p{L})/i.test(ins))) E('strings.write-name.instruction does not name the line and the box (rule 6)');
      if (m === 'dot-draw' && !/(?<!\p{L})dots?(?!\p{L})/i.test(ins)) E('strings.dot-draw.instruction does not name the dots (rule 6)');
    }
    if (m === 'around-us') for (const k of ['circle', 'rectangle']) if (names[k] && !hasWord(ins, names[k], l)) E(`strings.around-us.instruction does not contain the ${k} literal "${names[k]}" (rule 6)`);
    // rule 6 (Phase E): the instruction names ONLY apparatus present on this face's page, and names its own
    // (the K-369 "stop or go" over "wait / walk" cards lesson). en only: the panels carry their own lexicon.
    if (l === 'en') {
      for (const [word, re, modes] of APPARATUS) if (re.test(ins) && !modes.includes(m)) E(`strings.${m}.instruction names "${word}", which is not on the ${m} page (rule 6: apparatus)`);
      const need = APPARATUS_NEED[m];
      if (need && !need[1].test(ins)) E(`strings.${m}.instruction does not name its own apparatus (${need[0]}) (rule 6: apparatus)`);
    }
  }
  // rule 7
  const titles = MODES.map((m) => strings[m] && strings[m].title).filter((x) => typeof x === 'string');
  const tokens = (s) => new Set(fold(s, l).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  MODES.forEach((m) => {
    const t = strings[m] && strings[m].title;
    if (typeof t !== 'string') return;
    if (!t.trim()) E(`strings.${m}.title empty (rule 7)`);
    if ([...t].length > 70) E(`strings.${m}.title ${[...t].length} chars > 70 (rule 7)`);
    if (WORKSHEET_WORD.test(t)) E(`strings.${m}.title "${t}" carries a worksheet-word (rule 7)`);
    const fc = freeClaim.hit(t) || freeClaim.hit(strings[m].instruction || '');
    if (fc) E(`strings.${m} claims free ("${fc}") (rule 7)`);
    if ([themeName, themeSlug].some((x) => x && fold(t, l).trim() === fold(x, l))) E(`strings.${m}.title "${t}" is the shapes theme name / slug (rule 7)`);
    if (l === 'da' && /former\s+og\s+figurer/i.test(t)) E(`strings.${m}.title "${t}" is the da "Former og figurer" near-duplicate of the geometry name (rule 7)`);
    if (l === 'it' && /^\s*forme\s+geometriche/i.test(t)) E(`strings.${m}.title "${t}" starts with "Forme geometriche", the it geometry type name (rule 7)`);
  });
  if (l === 'de' && strings.base && !/benenn|nenn|namen/i.test(strings.base.title || '')) E(`strings.base.title "${strings.base && strings.base.title}" lacks the naming verb (the de geometry K landing owns the bare head) (rule 7)`);
  for (let i = 0; i < titles.length; i++) for (let j = i + 1; j < titles.length; j++) {
    const a = tokens(titles[i]), b = tokens(titles[j]);
    const diff = [...a].filter((x) => !b.has(x)).length + [...b].filter((x) => !a.has(x)).length;
    if (fold(titles[i], l) === fold(titles[j], l) || diff === 0) E(`titles "${titles[i]}" and "${titles[j]}" do not differ by a token (rule 7)`);
  }
  // rule 8 (objects are locale-neutral but the vocab / exclusion part is per locale)
  const objects = block.objects || bankMod.OBJECTS;
  const byShape = { circle: 0, rectangle: 0 };
  const seenObj = new Set();
  for (const o of objects) {
    const id = `${o.theme}/${o.noun}`;
    if (o.picOpened !== true) E(`object ${id} is not picOpened:true (rule 8)`);
    if (bankMod.REJECTED.includes(id)) E(`object ${id} was OPENED and REJECTED by the design (rule 8)`);
    if (seenObj.has(id)) E(`object ${id} twice (rule 8)`);
    seenObj.add(id);
    if (!fs.existsSync(path.join(CACHE, o.theme, o.noun + '@3x.webp'))) E(`object ${id}: cache/themes/${id}@3x.webp absent (rule 8)`);
    if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s*\d*)$/i.test(o.theme)) E(`object ${id}: a black-and-white theme (rule 8)`);
    const t = MANIFEST.themes[o.theme], vk = t && t.nouns[o.noun] && t.nouns[o.noun].vocabKey;
    if (!vk || !V[vk] || !V[vk][l] || !V[vk][l][0]) E(`object ${id}: no ${l} vocab entry (rule 8)`);
    else if (excluded(vk, l)) E(`object ${id}: B2_EXCLUDE'd in ${l} (rule 8)`);
    if (!['circle', 'rectangle'].includes(o.shape)) E(`object ${id}: shape "${o.shape}" is not circle / rectangle (rule 8)`);
    else byShape[o.shape]++;
  }
  for (const s of ['circle', 'rectangle']) if (byShape[s] < 4) E(`objects: ${byShape[s]} ${s} objects < 4 (rule 8)`);
  return f;
}

/** A synthetic locale block: vocab names in the EN shape (what a panel's default would be). */
function syntheticBlock(loc) {
  const b = clone(bankMod.SHAPES_2D.en);
  const V = vocab();
  for (const k of [...CORE, 'hexagon']) {
    const v = V[k][loc];
    b.names[k] = displayWord(v[0], loc);
    b.inflections[k] = [displayWord(v[1] || v[0], loc)];
  }
  return b;
}

/* =================================================================== geometry: the GATE's own classify (parses the drawn markup) */
function classifySvg(svgHtml) {
  const s = FSG.parseSvg(svgHtml);
  if (!s.fig) return { kind: 'none' };
  const tag = s.fig.tag;
  const box = s.w;
  const c = [box / 2, box / 2];
  const lensR = s.lens ? +(/\sr="([^"]+)"/.exec(s.lens.src)[1]) : 0;
  const textInside = /<text\b/.test(svgHtml);
  if (tag === 'circle') {
    const r = +(/\sr="([^"]+)"/.exec(s.fig.src)[1]);
    return { kind: 'circle', R: r, minW: 2 * r, ext: 2 * r, turned: false, turnedSq: false, skinny: false, lensR, textInside, fill: /fill="none"/.test(s.fig.src) };
  }
  if (tag !== 'path') return { kind: tag };
  const p = FSG.parsePath(/\sd="([^"]+)"/.exec(s.fig.src)[1]);
  if (!p.closed || p.segs.some((x) => x.cmd !== 'L')) return { kind: 'variant' };
  const P = p.segs.map((x) => x.from);
  const n = P.length;
  const sides = P.map((a, i) => Math.hypot(P[(i + 1) % n][0] - a[0], P[(i + 1) % n][1] - a[1]));
  const ang = P.map((v, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; const u = [a[0] - v[0], a[1] - v[1]], w = [b[0] - v[0], b[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))))) * 180 / Math.PI; });
  let kind = 'polygon-' + n;
  if (n === 3) kind = 'triangle';
  else if (n === 4 && ang.every((a) => Math.abs(a - 90) <= 1)) kind = Math.max(...sides) / Math.min(...sides) <= 1.01 ? 'square' : 'rectangle';
  else if (n === 6 && Math.max(...sides) / Math.min(...sides) <= 1.01 && ang.every((a) => Math.abs(a - 120) <= 1)) kind = 'hexagon';
  const lev = (a, b) => { let t = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; t = ((t % 180) + 180) % 180; return Math.min(t, 180 - t); };
  const cal = FSG.caliper(P);
  return {
    kind, R: Math.max(...P.map((v) => Math.hypot(v[0] - c[0], v[1] - c[1]))), minW: cal.minWidth, ext: cal.maxExtent,
    turned: P.every((a, i) => lev(a, P[(i + 1) % n]) >= 15 - 1e-6),
    turnedSq: kind === 'square' && Math.abs(lev(P[0], P[1]) - 45) <= 1,
    skinny: (kind === 'triangle' && Math.min(...sides) / Math.max(...sides) <= 0.35 + 1e-6) || (kind === 'rectangle' && Math.max(...sides) / Math.min(...sides) >= 2.2 - 1e-6),
    lensR, textInside, fill: /fill="none"/.test(s.fig.src),
  };
}

/** Cards out of a bodyHtml string: [{svg, tags:[{kind, text}]}] (node side; the render side collects the same from the DOM). */
function cardsFromHtml(html) {
  return html.split('<section class="ws-card"').slice(1).map((chunk) => ({
    svg: (/<svg[\s\S]*?<\/svg>/.exec(chunk) || [''])[0],
    tags: [...chunk.matchAll(/<span class="s2d-tag" data-lcs-tag="([^"]+)"[^>]*><span data-lcs-tag-text[^>]*>([^<]*)<\/span><\/span>/g)].map((m) => ({ kind: m[1], text: m[2].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>') })),
  }));
}
const cfgFromHtml = (html) => JSON.parse(/data-lcs-cfg="([^"]+)"/.exec(html)[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));

/** The gate's own card checks (the same on the node sweep and on the render). Returns {findings, slots, answers}. */
function checkCards(name, cards, cfg, block) {
  const f = [];
  const answers = [], slots = [], Rs = [];
  let turned = 0, turnedSq = 0, skinny = 0;
  if (cards.length !== cfg.cards) f.push(`${name}: ${cards.length} cards ≠ ${cfg.cards}`);
  cards.forEach((c, i) => {
    const tag = `${name} card ${i + 1}`;
    const g = classifySvg(c.svg);
    if (!['circle', 'square', 'rectangle', 'triangle', 'hexagon'].includes(g.kind)) { f.push(`${tag}: the drawn figure classifies as "${g.kind}"`); return; }
    if (g.textInside) f.push(`${tag}: text inside the shape svg`);
    if (!g.fill) f.push(`${tag}: the figure is filled`);
    answers.push(g.kind);
    Rs.push(g.R);
    if (g.turned) turned++;
    if (g.turnedSq) turnedSq++;
    if (g.skinny) skinny++;
    if (g.minW < cfg.floorW - 0.3 || g.ext < cfg.floorE - 0.3) f.push(`${tag}: ${g.kind} min caliper ${g.minW.toFixed(1)} < ${cfg.floorW} or extent ${g.ext.toFixed(1)} < ${cfg.floorE}`);
    if (g.R + 1.5 > g.lensR - cfg.lensClear + 0.05) f.push(`${tag}: ${g.kind} R ${g.R.toFixed(1)} leaves < ${cfg.lensClear} px inside the lens r ${g.lensR}`);
    const kinds = c.tags.map((t) => t.kind);
    if (kinds.length !== cfg.tags) f.push(`${tag}: ${kinds.length} tags ≠ ${cfg.tags}`);
    const hits = kinds.filter((k) => k === g.kind).length;
    if (hits !== 1) f.push(`${tag}: ${hits} tags name the drawn ${g.kind}`);
    slots.push(kinds.indexOf(g.kind));
    if (g.kind === 'square' && kinds.includes('rectangle')) f.push(`${tag}: a square card carries a rectangle tag (square / rectangle rule)`);
    if (new Set(kinds).size !== kinds.length) f.push(`${tag}: a tag repeats`);
    for (const t of c.tags) if (block && t.text !== block.names[t.kind]) f.push(`${tag}: tag ${t.kind} prints "${t.text}" ≠ the bank literal "${block.names[t.kind]}"`);
  });
  if (answers.length) {
    if (turned < cfg.turnedMin) f.push(`${name}: ${turned} turned figures < turnedMin ${cfg.turnedMin}`);
    if (turnedSq < cfg.turnedSquare) f.push(`${name}: ${turnedSq} squares at 45° < turnedSquare ${cfg.turnedSquare}`);
    if (skinny < cfg.skinnyMin) f.push(`${name}: ${skinny} skinny figures < skinnyMin ${cfg.skinnyMin}`);
    if (Math.max(...Rs) / Math.min(...Rs) < cfg.sizeSpread - 1e-3) f.push(`${name}: size spread ${(Math.max(...Rs) / Math.min(...Rs)).toFixed(3)} < ${cfg.sizeSpread}`);
    for (const k of CORE) if (!answers.includes(k)) f.push(`${name}: no ${k} drawn`);
    if (cfg.hexagon !== answers.includes('hexagon')) f.push(`${name}: hexagon ${answers.includes('hexagon') ? 'drawn' : 'missing'} against config ${cfg.hexagon}`);
    for (const k of new Set(answers)) if (answers.filter((x) => x === k).length > 2) f.push(`${name}: ${k} drawn more than twice`);
    const counts = {}; for (const s of slots) counts[s] = (counts[s] || 0) + 1;
    if (Object.keys(counts).length < Math.min(cfg.tags, slots.length)) f.push(`${name}: slot spread — answers use only slots ${Object.keys(counts).map((x) => +x + 1).join(',')} of ${cfg.tags}`);
    if (Math.max(...Object.values(counts)) > Math.floor(cfg.slotMaxShare * slots.length + 1e-9)) f.push(`${name}: slot spread — ${JSON.stringify(counts)} exceeds ${cfg.slotMaxShare * 100} % in one slot`);
  }
  return { findings: f, slots, answers };
}

/* =================================================================== 2. RENDER */
async function renderWith(page, type, { difficulty, baseName, strings, seedEpoch, locale }) {
  const { renderInstance } = require('../render/render-instance.js');
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="K-368"]');
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      grid: root ? rect(root.querySelector('.ws-cardgrid')) : null,
      imgs: document.querySelectorAll('.ws-page img').length,
      cards: root ? [...root.querySelectorAll('[data-lcs-card]')].map((card) => ({
        rect: rect(card), svg: card.querySelector('svg') ? card.querySelector('svg').outerHTML : '', svgRect: card.querySelector('svg') ? rect(card.querySelector('svg')) : null,
        tags: [...card.querySelectorAll('[data-lcs-tag]')].map((t) => { const cs = getComputedStyle(t), inner = t.querySelector('[data-lcs-tag-text]'); return { kind: t.dataset.lcsTag, text: t.textContent, ...rect(t), scrollW: t.scrollWidth, clientW: t.clientWidth, innerW: inner ? inner.getBoundingClientRect().width : 0, px: parseFloat(cs.fontSize), font: cs.fontFamily, weight: cs.fontWeight }; }),
      })) : [],
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

function assertRender(name, r, cfg, block) {
  const f = [];
  const F = (c, msg) => { assertions++; if (!c) f.push(msg); };
  F(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  F(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  F(r.m.imgs === 0, `${name}: ${r.m.imgs} <img> on the base`);
  const cc = checkCards(name, r.m.cards.map((c) => ({ svg: c.svg, tags: c.tags })), cfg, block);
  for (const x of cc.findings) F(false, x);
  for (const [i, c] of r.m.cards.entries()) {
    for (const t of c.tags) {
      F(t.h >= 48 - 0.5 && Math.abs(t.h - cfg.tagH) < 1, `${name} card ${i + 1}: tag "${t.text}" ${t.h.toFixed(1)} px high (want ${cfg.tagH}, floor 48)`);
      F(t.px >= cfg.tagPx - 0.01, `${name} card ${i + 1}: tag "${t.text}" at ${t.px} px < ${cfg.tagPx}`);
      F(/baloo/i.test(t.font) && +t.weight >= 700, `${name} card ${i + 1}: tag font ${t.font} ${t.weight} (Baloo 2 700)`);
      F(t.scrollW <= t.clientW + 0.5 && t.innerW <= t.clientW - 16 + 0.5, `${name} card ${i + 1}: tag "${t.text}" overflows (text ${t.innerW.toFixed(1)} in a ${t.clientW - 16} px pill interior)`);
      F(t.left >= c.rect.left - 0.5 && t.right <= c.rect.right + 0.5 && t.top >= c.rect.top - 0.5 && t.bottom <= c.rect.bottom + 0.5, `${name} card ${i + 1}: tag "${t.text}" leaves its card`);
    }
    if (c.svgRect) F(c.svgRect.left >= c.rect.left - 0.5 && c.svgRect.right <= c.rect.right + 0.5 && c.svgRect.top >= c.rect.top - 0.5 && c.svgRect.bottom <= c.rect.bottom + 0.5, `${name} card ${i + 1}: the lens leaves its card`);
    F(c.rect.bottom <= r.m.foot + 0.6, `${name} card ${i + 1}: reaches ${Math.round(c.rect.bottom)} past the footer at ${Math.round(r.m.foot)}`);
  }
  // not sparse: the card grid fills the body (it is the whole body)
  F(!!r.m.grid && r.m.grid.h >= r.m.body.h - 2 && Math.abs(r.m.grid.w - r.m.body.w) < 2, `${name}: the card grid ${r.m.grid && Math.round(r.m.grid.w)}×${r.m.grid && Math.round(r.m.grid.h)} does not fill the ${Math.round(r.m.body.w)}×${Math.round(r.m.body.h)} body`);
  return f;
}

/* chrome fixtures (README ruling): 722 = a 3-line title + a 3-line instruction; 677 = a 4-line fi title (the widest name suorakulmio rides with it). */
const LONG = {
  de: { title: 'Geometrische Formen benennen: gedrehte und schmale Figuren erkennen', instruction: 'Schau dir jede Form genau an, auch die gedrehten und die ganz schmalen Formen, und kreise danach bei jeder Form ihren richtigen Namen deutlich mit dem Stift ein.', body: 722 },
  fi: { title: 'Tasokuviot: nimeä käännetyt, kapeat, pienet ja suuret tasokuviot oikein', instruction: 'Katso jokaista kuviota tarkasti, myös käännettyjä, kapeita ja pieniä kuvioita, ja ympyröi sitten jokaisen kuvion vierestä sen oikea nimi selvästi kynällä, yksi nimi jokaiselle kuviolle.', body: 677 },
};

/* =================================================================== poison helpers */
const poisonLog = [];
let killed = 0, total = 0;
function judge(name, findings, re, expectGreen) {
  total++;
  let verdict;
  if (expectGreen) verdict = findings.length === 0 ? 'KILLED (stays green)' : 'RED — a gate that reads data-lcs-kind';
  else verdict = findings.some((x) => re.test(x)) ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  if (/^KILLED/.test(verdict)) killed++;
  poisonLog.push(`  ${name}: ${verdict}${/^KILLED/.test(verdict) ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
}
/** A type whose bodyHtml is the real build over `block` + `cfg`, rewritten by `fn` (past the spec's own guards). */
function rewired(block, fn, cfgPatch) {
  return Object.assign(Object.create(TYPE), { build(args, ctx) {
    const cfg = { ...TYPE.difficulty[args.difficulty], ...(cfgPatch || {}) };
    const out = TYPE._buildWith(block, cfg, { locale: args.locale }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
/** Split a bodyHtml into its card sections (for the render poisons). */
function mapCards(html, fn) {
  const parts = html.split('<section class="ws-card"');
  return parts[0] + parts.slice(1).map((p, i) => '<section class="ws-card"' + fn(p, i)).join('');
}
const kindOfChunk = (chunk) => (/data-lcs-kind="([^"]+)"/.exec(chunk) || [])[1];

/* =================================================================== main */
async function main() {
  const en = bankMod.SHAPES_2D.en;
  // 0. the primitive gate
  {
    let outp = '', code = 0;
    try { outp = execFileSync(process.execPath, [path.join(__dirname, 'verify-flat-shape.js'), ...(QUICK ? ['--no-render'] : [])], { encoding: 'utf8' }); } catch (e) { outp = (e.stdout || '') + (e.stderr || ''); code = e.status || 1; }
    const line = outp.trim().split('\n').pop();
    ok(code === 0 && /^PASS/.test(line), `qa/verify-flat-shape.js: ${line}`);
    console.log('flat-shape gate: ' + line);
  }
  // 1. banks
  {
    const f = validateBank(en, 'en');
    ok(f.length === 0, `EN bank: ${f.length} findings\n    ` + f.join('\n    '));
    console.log(`bank en: ${Object.keys(en.names).length} names, ${Object.values(en.riddles).flat().length} riddles, ${Object.keys(en.strings).length} strings, ${bankMod.OBJECTS.length} objects — ${f.length} findings`);
    for (const loc of LOCALES.filter((l) => l !== 'en')) {
      const sf = validateBank(syntheticBlock(loc), loc).filter((x) => /\(rule (1|2|5|8|9)\b/.test(x));
      ok(sf.length === 0, `synthetic ${loc} block (vocab names): ${sf.length} name / object findings\n    ` + sf.join('\n    '));
    }
    ok(en.strings.base.title === TYPE.i18n.en.title && en.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank strings.base ≠ the spec i18n.en');
    const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'))['K-368'];
    ok(!!strEn && strEn.title === en.strings.base.title && strEn.instruction === en.strings.base.instruction, `i18n/strings.en.json K-368 ${JSON.stringify(strEn)} ≠ the bank strings.base (run node i18n/build-en.js)`);
  }
  // 1b. bank poisons (each against its OWN rule; the EN / synthetic block is the control)
  {
    const P = (name, block, loc, re) => judge(name, validateBank(block, loc), re);
    let b;
    b = clone(en); b.names.square = b.names.rectangle; P('P1 names.square === names.rectangle', b, 'en', /names\.\w+ "rectangle" equals names\.\w+ \(rule 1/);
    b = syntheticBlock('it'); b.strings.base.title = 'Forme geometriche piane: i nomi'; P('P2 it title "Forme geometriche piane: i nomi"', b, 'it', /starts with "Forme geometriche".*\(rule 7\)/);
    b = clone(en); b.riddles.triangle[0].text = 'I am a triangle with 3 sides.'; P('P3 riddle "I am a triangle with 3 sides."', b, 'en', /riddles\.triangle\[0\].*contains the name .*"triangle" \(rule 3\)/);
    b = syntheticBlock('sv'); b.inflections.square = ['kvadrater', 'kvadraten']; b.riddles.square[0].text = 'Alla sidor på kvadraten är lika långa. Vad är jag?'; P('P4 sv square riddle with "kvadraten"', b, 'sv', /riddles\.square\[0\].*"kvadraten" \(rule 3\)/);
    b = clone(en); b.riddles.square[1].clue = 'longShort'; P('P5 square riddle tagged longShort', b, 'en', /riddles\.square\[1\] clue "longShort" ≠ "equal" \(rule 4\)/);
    b = syntheticBlock('da'); b.strings.base.title = 'Former og figurer'; P('P6 da title "Former og figurer"', b, 'da', /"Former og figurer" near-duplicate .*\(rule 7\)/);
    b = clone(en); b.objects = [...bankMod.OBJECTS, { theme: 'around the house', noun: 'window', shape: 'rectangle', picOpened: false }]; P('P7 around the house/window picOpened:false', b, 'en', /object around the house\/window is not picOpened:true \(rule 8\)/);
    b = clone(en); b.objects = [...bankMod.OBJECTS, { theme: 'classroom', noun: 'notebook', shape: 'rectangle' }]; P('P8 classroom/notebook re-added', b, 'en', /object classroom\/notebook (is not picOpened|was OPENED and REJECTED)/);
    b = clone(en); b.strings.base.instruction = 'Tick the right name.'; P('P9 base instruction "Tick the right name."', b, 'en', /strings\.base\.instruction .* tick .*\(rule 6\)/);
    b = syntheticBlock('pt'); b.strings.base.title = 'Formas'; P('P10 pt title "Formas"', b, 'pt', /title "Formas" is the shapes theme name \/ slug \(rule 7\)/);
    b = clone(en); b.inventory.hexagon = false; delete b.names.hexagon; P('P11 inventory.hexagon false with a hexagon riddle', b, 'en', /riddles\.hexagon: .*\(rule 9/);
    b = syntheticBlock('de'); b.strings.base.title = 'Geometrische Formen benennen kostenlos'; P('P12 de title with "kostenlos"', b, 'de', /claims free \("kostenlos"\) \(rule 7\)/);
    // the controls: the EN block and the de synthetic block with a correct de base title are clean on the poisoned rules
    b = syntheticBlock('de'); b.strings.base.title = 'Geometrische Formen benennen';
    ok(validateBank(b, 'de').filter((x) => /rule 7/.test(x)).length === 0, `control de: ${JSON.stringify(validateBank(b, 'de').filter((x) => /rule 7/.test(x)))}`);
  }

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  const fiBlock = syntheticBlock('fi');
  try {
    // 2. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-368-gate-d${d}-en` });
      const f = assertRender(`d${d}`, r, cfgFromHtml(r.html), en);
      fails.push(...f);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.w)}×${Math.round(r.m.body.h)} cards ${r.m.cards.map((c) => classifySvg(c.svg).kind[0] + '@' + c.tags.map((t) => t.kind[0]).join('')).join(' ')} — ${f.length} findings`);
    }
    for (const k of Object.keys(LONG)) {
      const type = k === 'fi' ? rewired(fiBlock, null) : TYPE;
      const r = await renderWith(page, type, { difficulty: 2, baseName: `K-368-gate-d2-${k}-longchrome`, strings: LONG[k], locale: k === 'fi' ? 'fi' : 'en' });
      const f = assertRender(`d2 long chrome ${k}`, r, cfgFromHtml(r.html), k === 'fi' ? fiBlock : en);
      fails.push(...f);
      ok(r.m.body.h <= LONG[k].body + 0.5, `d2 long chrome ${k}: body ${Math.round(r.m.body.h)} — the fixture did not squeeze the body to <= ${LONG[k].body}`);
      const widest = Math.max(...r.m.cards.flatMap((c) => c.tags.map((t) => t.innerW)));
      pngs.push(r.png);
      console.log(`render d2 long chrome ${k}: body ${Math.round(r.m.body.h)} px (target <= ${LONG[k].body}), card ${Math.round(r.m.cards[0].rect.w)}×${Math.round(r.m.cards[0].rect.h)}, widest tag text ${widest.toFixed(1)} px in a ${r.m.cards[0].tags[0].clientW - 16} px interior — ${f.length} findings`);
    }

    // 3. sweep
    const SEEDS = QUICK ? 5 : 20;
    const pooled = {};
    let sweepN = 0;
    for (const d of [1, 2, 3]) for (let e = 1; e <= SEEDS; e++) {
      const rng = makeRng(instanceSeed({ typeId: 'K-368', theme: null, difficulty: d, seedEpoch: e }));
      let out;
      try { out = TYPE._buildWith(en, TYPE.difficulty[d], { locale: 'en' }, { rng }); } catch (err) { ok(false, `sweep d${d} seed ${e}: threw ${err.message}`); continue; }
      const cc = checkCards(`sweep d${d} seed ${e}`, cardsFromHtml(out.bodyHtml), cfgFromHtml(out.bodyHtml), en);
      for (const x of cc.findings) ok(false, x);
      assertions++;
      sweepN++;
      if (d === 2) for (const s of cc.slots) pooled[s] = (pooled[s] || 0) + 1;
      // locale-neutral: the de synthetic bank draws the same page
      if (d === 2) {
        const outDe = TYPE._buildWith(syntheticBlock('de'), TYPE.difficulty[d], { locale: 'de' }, { rng: makeRng(instanceSeed({ typeId: 'K-368', theme: null, difficulty: d, seedEpoch: e })) });
        const sig = (h) => [...h.matchAll(/data-lcs-verts="([^"]+)"|data-lcs-tag="([^"]+)"/g)].map((m) => m[1] || m[2]).join('|');
        ok(sig(outDe.bodyHtml) === sig(out.bodyHtml), `sweep d2 seed ${e}: the de page draws different figures / tag order than en (the seed must carry no locale)`);
      }
    }
    const tot = Object.values(pooled).reduce((a, b) => a + b, 0);
    const share = Object.fromEntries(Object.entries(pooled).map(([k, v]) => [k, +(v / tot).toFixed(3)]));
    ok(Math.max(...Object.values(share)) <= 0.6, `pooled answer-slot share over ${SEEDS} d2 pages ${JSON.stringify(share)} — a slot > 60 %`);
    console.log(`sweep: ${sweepN} pages (d1-d3 x ${SEEDS} seeds, shipped seed = epoch 1) — pooled d2 answer-slot share ${JSON.stringify(share)}`);
    if (!QUICK) {
      for (let e = 2; e <= SEEDS; e++) {
        const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `K-368-gate-sweep-s${e}`, seedEpoch: e });
        const f = assertRender(`render sweep d2 seed ${e}`, r, cfgFromHtml(r.html), en);
        fails.push(...f);
        assertions++;
      }
      console.log(`render sweep: d2 seeds 2..${SEEDS} rendered + verified`);
    }
    {
      const deFile = path.join(__dirname, '..', 'data', 'b5', 'locales', '2d-shapes.de.json');
      if (fs.existsSync(deFile)) console.log('refusal check skipped: data/b5/locales/2d-shapes.de.json exists');
      else { let m = null; try { TYPE.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(!!m && /has no de block/.test(m), `an unauthored locale must REFUSE: ${m || 'built'}`); }
    }

    // 4. render poisons
    const gateOf = async (type, name, opts = {}) => {
      const r = await renderWith(page, type, { difficulty: opts.d || 2, baseName: `K-368-poison-${name}`, strings: opts.strings, locale: opts.locale });
      return [...r.verify.map((x) => 'verify: ' + x), ...r.lints.map((x) => 'lint: ' + x), ...assertRender(name, r, cfgFromHtml(r.html), opts.block || en).filter((x) => !/verify\(\)|lints/.test(x))];
    };
    // PR1 — a square card carrying a rectangle tag
    {
      let done = false;
      const t = rewired(en, (h) => mapCards(h, (chunk) => {
        if (done || kindOfChunk(chunk) !== 'square') return chunk;
        done = true;
        return chunk.replace(/data-lcs-tag="circle"([^>]*>)<span data-lcs-tag-text([^>]*)>circle</, 'data-lcs-tag="rectangle"$1<span data-lcs-tag-text$2>rectangle<');
      }));
      judge('PR1 a square card with a rectangle tag', await gateOf(t, 'PR1'), /a square card carries a rectangle tag/);
    }
    // PR3 — swap two data-lcs-kind stamps: the gate never reads them, so it must stay GREEN
    {
      const t = rewired(en, (h) => { const ks = [...h.matchAll(/data-lcs-kind="([^"]+)"/g)].map((m) => m[1]); let i = 0; const sw = [ks[1], ks[0], ...ks.slice(2)]; return h.replace(/data-lcs-kind="[^"]+"/g, () => `data-lcs-kind="${sw[i++]}"`); });
      judge('PR3 two data-lcs-kind stamps swapped', await gateOf(t, 'PR3'), null, true);
    }
    // PR4 — A's old obtuse (2.9,1) at R 60 in place of the triangle card
    {
      let done = false;
      const old = FS.flatShape({ kind: 'triangle', sub: 'obtuse', _unit: [[0, 0], [2, 0], [2.9, 1]], R: 60, lens: 78 - 60 - 3 }).svg;
      const t = rewired(en, (h) => mapCards(h, (chunk) => { if (done || kindOfChunk(chunk) !== 'triangle') return chunk; done = true; return chunk.replace(/<svg[\s\S]*?<\/svg>/, old); }));
      judge('PR4 old obtuse (2.9,1) at R 60', await gateOf(t, 'PR4'), /min caliper 25\.5 /);
    }
    // PR5 — tags 110 wide under the fi bank: suorakulmio overflows
    judge('PR5 tag width 110 (fi suorakulmio)', await gateOf(rewired(fiBlock, null, { tagW: 110 }), 'PR5', { block: fiBlock, locale: 'fi' }), /"suorakulmio" overflows/);
    // PR7 — every answer forced to slot 0
    {
      const t = rewired(en, (h) => mapCards(h, (chunk) => {
        const k = kindOfChunk(chunk);
        const tags = [...chunk.matchAll(/<span class="s2d-tag"[\s\S]*?<\/span><\/span>/g)].map((m) => m[0]);
        const right = tags.find((x) => x.includes(`data-lcs-tag="${k}"`));
        const rest = tags.filter((x) => x !== right);
        let i = 0; const order = [right, ...rest];
        return chunk.replace(/<span class="s2d-tag"[\s\S]*?<\/span><\/span>/g, () => order[i++]);
      }));
      judge('PR7 every answer in slot 0', await gateOf(t, 'PR7'), /slot spread/);
    }
    // PR11 — a face config at difficulty 2: the config guard fires before render
    {
      let m = null;
      // a face mode laid over the BASE level-2 entry (rows: 3 is a grid count, not F1's list of kinds): the
      // face's CONFIG guard fires before anything renders (guards key on the resolved keys, never difficulty === 2)
      try { TYPE._buildWith(en, { ...TYPE.difficulty[2], mode: 'real-or-not' }, { locale: 'en' }, { rng: makeRng('pr11') }); } catch (e) { m = e.message; }
      judge('PR11 a face mode over the base d2 config', m ? [m] : [], /real-or-not: rows must be a list of 1-4 distinct core kinds/);
    }
    // PX — a 40 px tag: the spec guard, and the render floor past it
    {
      let m = null;
      try { TYPE._buildWith(en, { ...TYPE.difficulty[2], tagH: 40 }, { locale: 'en' }, { rng: makeRng('px') }); } catch (e) { m = e.message; }
      judge('PX tagH 40 (spec guard)', m ? [m] : [], /tag height 40 < the K ring target 48/);
      const t = rewired(en, (h) => h.replace(/height:48px;padding:0 8px/g, 'height:40px;padding:0 8px'));
      judge('PX tag 40 px high (render floor past the guard)', await gateOf(t, 'PX'), /40\.0 px high/);
    }
    // PT — the 45° square drawn level (turnedSquare)
    {
      const t = rewired(en, (h) => mapCards(h, (chunk) => (/data-lcs-rot="45"/.test(chunk) && kindOfChunk(chunk) === 'square'
        ? chunk.replace(/<svg[\s\S]*?<\/svg>/, FS.flatShape({ kind: 'square', rot: 0, R: +(/data-lcs-R="([\d.]+)"/.exec(chunk)[1]), lens: 78 - +(/data-lcs-R="([\d.]+)"/.exec(chunk)[1]) - 3 }).svg) : chunk)));
      judge('PT the 45° square drawn level', await gateOf(t, 'PT'), /squares at 45° < turnedSquare 1/);
    }
    // PW — a tag text ≠ the bank literal (the node cross-check + verify's stamp check)
    {
      let done = false;
      const t = rewired(en, (h) => h.replace(/(<span data-lcs-tag-text[^>]*>)triangle</, (m0, a) => { if (done) return m0; done = true; return a + 'triangel<'; }));
      judge('PW a tag text ≠ the bank literal', await gateOf(t, 'PW'), /prints "triangel" ≠ the bank literal "triangle"/);
    }
    // the control: the untouched d2 page renders clean through the same collector
    { const ctl = await gateOf(TYPE, 'control'); ok(ctl.length === 0, `poison control (untouched d2): ${JSON.stringify(ctl.slice(0, 3))}`); }

    // 5. THE FIVE FACES (Phase E): bank-string parity, sweeps, renders at 814 / 722 / 677, face poisons (PR2 PR6
    // PR8 PR9 PR10 PR12 + SPARSE / OVERLAP / answer-tell / apparatus per face) — qa/b5-2d-shapes-faces.js
    await require('./b5-2d-shapes-faces.js').faceGate({ page, ok, judge, fails, pngs, validateBank, syntheticBlock, classifySvg, QUICK, OUT });
  } finally { await browser.close(); }

  console.log('poison:\n' + poisonLog.join('\n'));
  console.log('renders:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  ') + (fails.length > 40 ? `\n  … ${fails.length - 40} more` : ''));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, syntheticBlock, classifySvg, checkCards, cardsFromHtml };
