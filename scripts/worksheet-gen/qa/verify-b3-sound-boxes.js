#!/usr/bin/env node
/**
 * verify-b3-sound-boxes.js — the K-318 `sound-boxes` gate (design §5) + its five
 * faces (design §3: K-329 Count · K-330 First Sound Given · G1-312 Sound Strip ·
 * G1-313 Syllables and Sounds · G1-314 Blend).
 *
 *   node qa/verify-b3-sound-boxes.js [--quick] [--verbose] [--locales=en] [--themes=a,b] [--seeds=N]
 *
 * Own ground truth: the gate reads approved-words-<loc>.json and
 * data/b3/sound-boxes.js DIRECTLY (never the spec's helpers) and re-derives
 * every segmentation itself; the render section renders through the REAL
 * pipeline (render/render-instance.js, file:// fonts) and diffs the page
 * stamps against that derivation — "diff, not trust".
 *
 * Sections
 *   A  bank data: key approved · flat join === word (case-folded) · rows === count ·
 *      rows[s] === split[s] unless the key is in remergeAcrossSyllable (and then it
 *      MUST straddle — a listed key that does not is a dead flag) · every multigraph
 *      whitelisted · exclude keys approved and not banked · da strict pool (no
 *      policy_managed on a banked key) · no localized BW marker · `texBoundary`
 *      EQUALS the gate's own derivation (multi-syllable ∧ 'TeX' agreed ∧ not
 *      remerged) in BOTH directions (a listed rule-only/remerged key, an omitted
 *      TeX-agreed key — the Tiers face prints that boundary).
 *   B  pools: for every wave theme the base d2 pool after segmentation (>= 8 or the
 *      cell is REFUSED, never filled — a §1 wave theme below 8 is a FAIL) and the
 *      d1/d3 pools (recorded); then EVERY FACE's d2 pool per theme (>= 8 or the
 *      cell is recorded REFUSED — the design's ceilings were letter-count upper
 *      bounds; a face with NO renderable wave theme in the locale is a FAIL).
 *   C  renders: wave themes × d1-d3 (d1/d3 refusals recorded), the worst LEGAL
 *      chrome (3-line title + 3-line instruction) × d1-d3, the nl-style dots
 *      stack at d2 under the same chrome, and a seed sweep on the exemplar theme;
 *      then every face × its renderable wave themes (quick: exemplar only) + the
 *      worst legal chrome + a refusal render on a below-floor theme.
 *      Each render: lints clean · verify() empty · picture >= 56 px (K) / 44 (G1)
 *      · every box >= 44 px · box row <= the stamped inner · nothing past its card
 *      · every card's data-lcs-chunks equals the re-derived segmentation (Tiers:
 *      the syllable sizes too; Count: the answer; Blend: the printed graphemes and
 *      the ONE matching picture) · non-vacuity (0 cards checked = FAIL).
 *   D  poisons (each must FAIL; the correct bank is the control): P1 unapproved
 *      key · P2 join != word (horse -> hors) · P3 multigraph off the whitelist ·
 *      P4 seam merged outside remergeAcrossSyllable · P5 dead remerge flag ·
 *      P6 excluded key also banked · P7 da strict pool violated · P8 pool below
 *      the floor renders instead of refusing · P9 chunks stamp != word · P10 wide
 *      flag flipped · P11 the word printed on its card · P12 duplicate word ·
 *      P13 a box removed · P14 boxes squashed below 44 · P15 box row wider than
 *      the card · P16 blank page (non-vacuity).
 *      Face poisons (design §5 items 3-4-6 + the deferred §3 verifies):
 *      F1 Count answer != sounds · F2 Count digit printed in the answer box ·
 *      F3 Count lane carries a tick · F4 Starter prints the wrong first sound ·
 *      F5 Starter prints two boxes · F6 Strip carries a wide box · F7 Strip of 5 ·
 *      F8 a 7-sound word on the 6-strip · F9 Tiers arc removed · F10 Tiers arcs
 *      shifted off their boxes · F11 Tiers rule-only key listed in texBoundary ·
 *      F12 Tiers TeX-agreed key omitted from texBoundary · F13 Tiers remerged key
 *      listed · F14 Tiers renders a below-floor theme instead of refusing ·
 *      F15 Blend no picture matches · F16 Blend two pictures match · F17 Blend
 *      prints a word that is not the target · F18 Blend the same picture twice
 *      on the page · F19 Blend the answer always in column 1 · F20 Blend ragged
 *      picture columns · F21 a face whose stamp says "base" (knob undeclared).
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { entriesFor, displayWord, fileUri } = require('../lib/b2-common.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'k318-gate');
const APPROVED_DIR = path.resolve(ROOT, '..', 'v2-data', 'verify-syllable-boundaries', 'output');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'sound-boxes.js');

const WAVE_THEMES = { en: ['animals', 'around the house', 'forest creatures', 'toys', 'zoo animals', 'farm animals', 'vehicles', 'clothing'] };
const EXEMPLAR = { en: 'animals' };
const FLOOR = 8;
const CARD_INNER = 302;
const ROW_INNER = 647, ROW_BADGE = 20, ROW_GAP = 16, CHOICE_GAP = 12;   // the spec's row geometry (types/k/K-318-sound-boxes.js)
const BOX_FLOOR = 44;
const PIC_FLOOR = { K: 56, G1: 44, G2: 36, G3: 36 };
// the five faces: id → the knob the face must declare (design §3)
const FACES = [
  { id: 'K-329', face: 'count', knob: (d) => d.countMode === true },
  { id: 'K-330', face: 'starter', knob: (d) => d.starter === true },
  { id: 'G1-312', face: 'strip', knob: (d) => d.strip === 6 },
  { id: 'G1-313', face: 'tiers', knob: (d) => d.tiers === true },
  { id: 'G1-314', face: 'blend', knob: (d) => d.mode === 'blend' },
];
// the EN grapheme whitelist (data/b3/sound-boxes.js header); other locales get theirs with their block
const WHITELIST = {
  en: new Set('sh ch th ck ng qu wh ph tch dge ee oo ea ai ay oa ou ow oi oy ie ei ey igh aw au ar or er ir ur ll ss ff zz tt pp bb dd gg mm nn rr cc se ce'.split(' ')),
};
const BW_MARKERS = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;
// worst legal chrome: 70-char title (3 lines at ~24 chars/line) + 150-char instruction (3 lines)
const LONG_CHROME = {
  title: 'Sound Boxes for Beginning Readers: Say Every Sound Out Loud Slowly',
  instruction: 'Say the picture word slowly, sound by sound. Write one sound in each box. A wide box with a curve under it holds two letters that make one sound together.',
};

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');
const VERBOSE = flags.has('--verbose');   // print WHICH fault killed each poison (a poison killed by an unrelated fault is not a kill)

function approvedMap(loc) {
  const j = JSON.parse(fs.readFileSync(path.join(APPROVED_DIR, 'approved-words-' + loc + '.json'), 'utf8'));
  const m = new Map();
  for (const e of j.entries) if (!m.has(e.key)) m.set(e.key, e);
  return m;
}
function loadBank() {
  delete require.cache[require.resolve(BANK_FILE)];
  const mod = require(BANK_FILE);
  return mod[Object.keys(mod)[0]];
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- A. bank data (pure node) ---------------- */
/** The gate's OWN derivation of the arcs-printable set: multi-syllable ∧ TeX-agreed ∧ not remerged. */
function deriveTexBoundary(cfg, ap) {
  const remerge = new Set(cfg.remergeAcrossSyllable || []);
  const out = new Set();
  for (const [key, syl] of Object.entries(cfg.bank || {})) {
    const a = ap.get(key);
    if (!a || !Array.isArray(syl) || syl.length < 2) continue;
    if (Array.isArray(a.sources_agreed) && a.sources_agreed.includes('TeX') && !remerge.has(key)) out.add(key);
  }
  return out;
}
function checkBank(cfg, loc, ap) {
  const fails = [];
  const wl = WHITELIST[loc] || new Set();
  const remerge = new Set(cfg.remergeAcrossSyllable || []);
  const exclude = new Set(cfg.exclude || []);
  let rows = 0;
  for (const [key, syl] of Object.entries(cfg.bank || {})) {
    rows++;
    const a = ap.get(key);
    if (!a) { fails.push(`A: "${key}" is not in approved-words-${loc}.json`); continue; }
    if (cfg.strictPool === 'policy_managed_absent' && a.policy_managed !== undefined) fails.push(`A: "${key}" carries policy_managed:${a.policy_managed} (strict pool)`);
    if (!Array.isArray(syl) || !syl.length || syl.some((r) => !Array.isArray(r) || !r.length)) { fails.push(`A: "${key}" rows malformed`); continue; }
    const flat = syl.flat();
    if (flat.some((g) => typeof g !== 'string' || !g.length)) fails.push(`A: "${key}" has an empty grapheme`);
    if (flat.join('') !== a.word.toLocaleLowerCase(loc)) fails.push(`A: "${key}" joins to "${flat.join('')}" != "${a.word}"`);
    if (syl.length !== a.count) fails.push(`A: "${key}" has ${syl.length} rows, approved count ${a.count}`);
    const straddles = syl.some((r, s) => r.join('') !== (a.split[s] || ''));
    if (remerge.has(key)) { if (!straddles) fails.push(`A: "${key}" listed in remergeAcrossSyllable but its rows match the split (dead flag)`); }
    else if (straddles) fails.push(`A: "${key}" merges across an approved seam (${a.split.join('-')}) without remergeAcrossSyllable`);
    for (const g of flat) if ([...g].length >= 2 && wl.size && !wl.has(g)) fails.push(`A: "${key}" multigraph "${g}" is not whitelisted`);
    if (exclude.has(key)) fails.push(`A: "${key}" is both excluded and banked`);
  }
  for (const key of exclude) if (!ap.has(key)) fails.push(`A: exclude "${key}" is not an approved word`);
  if (!rows) fails.push('A: the bank is empty');
  // texBoundary: the Tiers face PRINTS these boundaries — the list must equal the derivation both ways
  const want = deriveTexBoundary(cfg, ap);
  const listed = new Set(cfg.texBoundary || []);
  for (const key of listed) {
    if (!want.has(key)) {
      const a = ap.get(key);
      const why = !cfg.bank || !cfg.bank[key] ? 'not banked' : !a ? 'not approved' : cfg.bank[key].length < 2 ? 'one syllable'
        : remerge.has(key) ? 'its bank rows re-seat the seam (remergeAcrossSyllable)' : 'its boundary is rule-only (no TeX agreement)';
      fails.push(`A: texBoundary lists "${key}" but ${why} — an arc would print a boundary the pipeline did not verify`);
    }
  }
  for (const key of want) if (!listed.has(key)) fails.push(`A: texBoundary omits "${key}" (TeX-agreed, not remerged) — the Tiers pool is silently smaller`);
  return fails;
}

/* ---------------- B. pools (own re-derivation) ---------------- */
function derive(cfg, key) {
  if ((cfg.exclude || []).includes(key)) return null;
  const rows = cfg.bank && cfg.bank[key];
  return rows ? rows.flat() : null;
}
function fitBox(n, wideCount, box, gap, inner = CARD_INNER) {
  const b = Math.min(box, Math.floor((inner - gap * (n - 1) - 2) / (n + 0.5 * wideCount)));
  return b < BOX_FLOOR ? null : b;
}
function blendSlot(d) { return (d.maxG - d.maxWide) * d.box + d.maxWide * Math.round(d.box * 1.5) + d.gap * (d.maxG - 1) + 2; }
/** The pool of a resolved difficulty (base or face); `face` = null for the base. `tex` = the gate's own texBoundary set. */
function poolFor(cfg, loc, theme, d, face, tex) {
  const seen = new Set(); const out = [];
  const inner = !face || face === 'count' || face === 'starter' ? CARD_INNER
    : face === 'blend' ? blendSlot(d) : ROW_INNER - ROW_BADGE - d.pic - ROW_GAP;
  for (const e of entriesFor(theme, loc)) {
    const word = displayWord(e.singular, loc);
    if (!/^\p{L}+$/u.test(word)) continue;
    const rows = (cfg.exclude || []).includes(e.vocabKey) ? null : cfg.bank && cfg.bank[e.vocabKey];
    const flat = rows ? rows.flat() : null;
    if (!flat || flat.join('') !== word.toLocaleLowerCase(loc)) continue;
    const n = flat.length, wide = flat.filter((g) => [...g].length >= 2).length;
    if (n < d.minG || n > d.maxG || wide > d.maxWide) continue;
    if (face === 'tiers') {
      if (rows.length < d.minSyl || rows.length > d.maxSyl) continue;
      if (!tex.has(e.vocabKey)) continue;
    }
    const extra = face === 'tiers' ? (rows.length - 1) * ((d.interGap || 22) - d.gap) : 0;
    if (!fitBox(n, face === 'strip' ? 0 : wide, d.box, d.gap, inner - extra)) continue;
    if (seen.has(word)) continue; seen.add(word);
    out.push({ key: e.vocabKey, noun: e.noun, word, flat, rows, wide });
  }
  return out;
}

/* ---------------- C. renders (real pipeline) ---------------- */
async function renderCheck(page, type, cfgOrNull, job, opts) {
  const t = cfgOrNull ? { ...type, build: (o, ctx) => type._buildWith(cfgOrNull, o, ctx) } : type;
  if (opts && opts.post) { const inner = t.build; t.build = async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; }; }
  const out = await renderInstance({
    type: t, theme: job.theme, difficulty: job.difficulty, locale: job.locale, strings: job.strings,
    seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  // the gate's own measurements (qa/lints.js has no size lint)
  const band = type.difficulty[job.difficulty].band || type.gradeBand;
  const m = await page.evaluate((picFloor) => {
    const res = { cards: [], fails: [], face: null };
    const root = document.querySelector('[data-lcs-cards]');
    res.face = root ? (root.dataset.lcsFace || 'base') : null;
    const inner = root ? +root.dataset.lcsInner : 302;
    const stages = [...document.querySelectorAll('.ws-card-stage[data-lcs-word]')];
    stages.forEach((st, i) => {
      const card = st.closest('.ws-card').getBoundingClientRect();
      const imgs = [...st.querySelectorAll('img')];
      imgs.forEach((img, k) => {
        const ib = img.getBoundingClientRect();
        if (ib.height < picFloor - 0.6) res.fails.push(`card ${i + 1}: picture ${k + 1} ${ib.height.toFixed(1)} < ${picFloor}`);
        if (ib.top < card.top || ib.bottom > card.bottom || ib.right > card.right) res.fails.push(`card ${i + 1}: picture ${k + 1} outside its card`);
      });
      if (!imgs.length) res.fails.push(`card ${i + 1}: no picture`);
      const rects = [...st.querySelectorAll('rect[data-lcs-box]')];
      rects.forEach((r, j) => { const h = r.getBoundingClientRect().height; if (h < 44 - 0.6) res.fails.push(`card ${i + 1}: box ${j + 1} ${h.toFixed(1)} < 44`); });
      const svg = st.querySelector('svg[data-lcs-soundboxes]');
      if (svg) {
        const sb = svg.getBoundingClientRect();
        if (sb.width > inner + 0.6) res.fails.push(`card ${i + 1}: row ${sb.width.toFixed(1)} > ${inner}`);
        if (sb.bottom > card.bottom - 1 || sb.top < card.top + 1 || sb.right > card.right - 1) res.fails.push(`card ${i + 1}: row outside its card`);
      } else if (res.face !== 'count') res.fails.push(`card ${i + 1}: no box row`);
      const lane = st.querySelector('svg[data-lcs-soundlane]');
      const ans = st.querySelector('.ws-answerbox[data-lcs-answer]');
      if (res.face === 'count') {
        if (!lane || !ans) res.fails.push(`card ${i + 1}: lane/answer box missing`);
        else {
          const lb = lane.getBoundingClientRect(), ab = ans.getBoundingClientRect();
          if (lb.height < 44 - 0.6 || ab.height < 44 - 0.6 || ab.width < 44 - 0.6) res.fails.push(`card ${i + 1}: lane/answer box below 44`);
          if (ab.right - lb.left > inner + 0.6) res.fails.push(`card ${i + 1}: lane row ${(ab.right - lb.left).toFixed(1)} > ${inner}`);
          if (lb.bottom > card.bottom - 1 || ab.bottom > card.bottom - 1) res.fails.push(`card ${i + 1}: lane row outside its card`);
        }
      }
      const arcs = st.querySelector('svg[data-lcs-arcs]');
      res.cards.push({
        word: st.dataset.lcsWord, key: st.dataset.lcsVocab, chunks: st.dataset.lcsChunks, dots: !!st.querySelector('[data-lcs-hakdots]'),
        face: st.dataset.lcsFace, syl: st.dataset.lcsSyl || null, arcs: arcs ? +arcs.dataset.lcsArcs : null,
        answer: ans ? ans.dataset.lcsAnswer : null, starter: st.dataset.lcsStarter || null,
        printed: [...st.querySelectorAll('text[data-lcs-printed]')].map((t) => t.textContent),
        boxes: rects.length, wideBoxes: rects.filter((r) => r.dataset.lcsWide === '1').length,
        target: st.dataset.lcsTarget || null, choices: [...st.querySelectorAll('img[data-lcs-choice]')].map((c) => c.dataset.lcsChoice),
      });
    });
    return res;
  }, PIC_FLOOR[band] || 44);
  fails.push(...m.fails.map((x) => 'size: ' + x));
  // diff the stamps against the gate's own derivation
  const cfg = cfgOrNull || loadBank()[job.locale];
  const wantFace = (opts && opts.face) || 'base';
  if (m.face !== wantFace) fails.push(`face: root stamps "${m.face}", the spec is the ${wantFace} face`);
  const tex = opts && opts.ap ? deriveTexBoundary(cfg, opts.ap) : null;
  const seenPic = new Set();
  m.cards.forEach((c, i) => {
    const flat = derive(cfg, c.key);
    if (!flat) fails.push(`derive: card ${i + 1} "${c.key}" has no bank row`);
    else if (flat.join('|') !== c.chunks) fails.push(`derive: card ${i + 1} stamps "${c.chunks}", bank says "${flat.join('|')}"`);
    if (flat && flat.join('') !== c.word.toLocaleLowerCase(job.locale)) fails.push(`derive: card ${i + 1} word "${c.word}" != bank join`);
    if (c.face !== wantFace) fails.push(`derive: card ${i + 1} face stamp "${c.face}"`);
    if (!flat) return;
    if (wantFace === 'count') {
      if (+c.answer !== flat.length) fails.push(`derive: card ${i + 1} answer ${c.answer}, sounds ${flat.length}`);
      if (c.boxes) fails.push(`derive: card ${i + 1} draws ${c.boxes} boxes on a Count card`);
    } else if (wantFace === 'starter') {
      if (c.printed.length !== 1 || c.printed[0].toLocaleLowerCase(job.locale) !== flat[0] || c.starter !== c.printed[0]) fails.push(`derive: card ${i + 1} prints [${c.printed.join('|')}], first sound "${flat[0]}"`);
      if (c.boxes !== flat.length) fails.push(`derive: card ${i + 1} ${c.boxes} boxes for ${flat.length} sounds`);
    } else if (wantFace === 'strip') {
      if (c.boxes !== 6 || c.wideBoxes) fails.push(`derive: card ${i + 1} strip ${c.boxes} boxes, ${c.wideBoxes} wide`);
      if (flat.length > 6) fails.push(`derive: card ${i + 1} ${flat.length} sounds on a 6-strip`);
    } else if (wantFace === 'tiers') {
      const rows = cfg.bank[c.key];
      const sizes = rows.map((r) => r.length).join('|');
      if (c.syl !== sizes) fails.push(`derive: card ${i + 1} syl "${c.syl}", bank rows ${sizes}`);
      if (c.arcs !== rows.length) fails.push(`derive: card ${i + 1} ${c.arcs} arcs, ${rows.length} syllables`);
      if (tex && !tex.has(c.key)) fails.push(`derive: card ${i + 1} "${c.key}" prints a boundary the gate cannot verify (rule-only or remerged)`);
    } else if (wantFace === 'blend') {
      if (c.target !== c.key) fails.push(`derive: card ${i + 1} target ${c.target} != ${c.key}`);
      if (c.printed.map((x) => x.toLocaleLowerCase(job.locale)).join('|') !== flat.join('|')) fails.push(`derive: card ${i + 1} prints [${c.printed.join('|')}], bank [${flat.join('|')}]`);
      if (c.choices.filter((k) => k === c.key).length !== 1) fails.push(`derive: card ${i + 1} ${c.choices.filter((k) => k === c.key).length} pictures match the target`);
      c.choices.forEach((k) => { if (seenPic.has(k)) fails.push(`derive: card ${i + 1} picture ${k} repeats on the page`); seenPic.add(k); });
    } else if (c.boxes !== flat.length) fails.push(`derive: card ${i + 1} ${c.boxes} boxes for ${flat.length} sounds`);
  });
  if (!m.cards.length) fails.push('non-vacuity: 0 cards checked');
  return { fails, cards: m.cards, pngPath: out.pngPath };
}

async function main() {
  const locales = arg('locales', 'en').split(',');
  const themesArg = arg('themes');
  const seeds = +arg('seeds', QUICK ? 2 : 6);
  const type = loadType('K-318');
  const faceTypes = FACES.map((f) => ({ ...f, type: loadType(f.id) }));
  let assertions = 0, failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });
  // every face declares exactly its knob, in every level (the waves ship d2; the spec must not depend on the index)
  for (const f of faceTypes) for (const lvl of [1, 2, 3]) {
    const d = f.type.difficulty[lvl];
    note(!!d && f.knob(d), `${f.id} d${lvl} does not declare the ${f.face} knob`);
    note(f.type.exerciseType === 'sound-boxes' && f.type.slug !== type.slug, `${f.id}: exerciseType/slug`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const facePools = {};
  try {
    for (const loc of locales) {
      const cfg = bankAll[loc];
      note(!!cfg, `no ${loc} block in the bank`);
      if (!cfg) continue;
      const ap = approvedMap(loc);
      const tex = deriveTexBoundary(cfg, ap);
      // ---- A
      const a = checkBank(cfg, loc, ap);
      assertions += Object.keys(cfg.bank).length * 6 + (cfg.texBoundary || []).length + tex.size;
      failures.push(...a);
      console.log(`[A] ${loc}: ${Object.keys(cfg.bank).length} bank rows, texBoundary ${(cfg.texBoundary || []).length} listed / ${tex.size} derived, ${a.length} data faults`);
      // ---- B
      const themes = themesArg ? themesArg.split(',') : (WAVE_THEMES[loc] || [EXEMPLAR[loc]]);
      const pools = {};
      for (const theme of themes) {
        note(!BW_MARKERS.test(theme), `theme "${theme}" carries a BW marker`);
        const p = { 1: poolFor(cfg, loc, theme, type.difficulty[1]), 2: poolFor(cfg, loc, theme, type.difficulty[2]), 3: poolFor(cfg, loc, theme, type.difficulty[3]) };
        pools[theme] = p;
        const d3wide = p[3].filter((e) => e.wide).length;
        const refuse1 = p[1].length < type.difficulty[1].cards, refuse3 = p[3].length < type.difficulty[3].cards || d3wide < type.difficulty[3].minWideCards;
        console.log(`[B] ${loc}/${theme}: d2 pool ${p[2].length}${p[2].length < FLOOR ? ' REFUSED (< ' + FLOOR + ')' : ''} · d1 ${p[1].length}${refuse1 ? ' (refused)' : ''} · d3 ${p[3].length} (${d3wide} wide)${refuse3 ? ' (refused)' : ''}`);
        note(p[2].length >= FLOOR, `${loc}/${theme}: d2 pool ${p[2].length} < ${FLOOR} — a §1 wave theme below the floor`);
        // every eligible picture exists on disk
        for (const e of p[2]) { const uri = fileUri(theme, e.noun); note(fs.existsSync(decodeURIComponent(new URL(uri).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), `${loc}/${theme}: picture missing for ${e.key}`); }
      }
      // ---- B, the faces: per theme the face pool; < 8 = recorded REFUSED (never filled); a face with no theme = FAIL
      facePools[loc] = {};
      for (const f of faceTypes) {
        const d = f.type.difficulty[2];
        facePools[loc][f.face] = {};
        const line = [];
        for (const theme of themes) {
          const p = poolFor(cfg, loc, theme, d, f.face, tex);
          let ok = p.length >= (d.poolFloor || FLOOR);
          if (f.face === 'blend') {
            // distractors need only a picture: 12 theme nouns beyond the 6 targets
            const nouns = new Set(entriesFor(theme, loc).map((e) => displayWord(e.singular, loc).toLocaleLowerCase(loc)));
            if (nouns.size < d.cards * d.choices) ok = false;
          }
          facePools[loc][f.face][theme] = { pool: p, ok };
          line.push(`${theme} ${p.length}${ok ? '' : ' REFUSED'}`);
        }
        const live = themes.filter((t) => facePools[loc][f.face][t].ok);
        note(live.length >= 1, `${loc}: the ${f.face} face has no renderable wave theme`);
        console.log(`[B] ${loc}/${f.id} ${f.face}: ${line.join(' · ')} → ${live.length}/${themes.length} themes`);
      }
      // ---- C
      const renders = [];
      const ex = themes.includes(EXEMPLAR[loc]) ? EXEMPLAR[loc] : themes[0];   // --themes without the exemplar: the first listed theme carries the chrome + seed sweeps
      for (const theme of themes) for (const d of QUICK && theme !== ex ? [2] : [1, 2, 3]) renders.push({ theme, difficulty: d, locale: loc, baseName: `K-318-${theme}-d${d}-${loc}`, tag: 'sweep' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: LONG_CHROME, baseName: `K-318-${ex}-d${d}-${loc}-longchrome`, tag: 'long-chrome' });
      for (let s = 2; s <= seeds; s++) renders.push({ theme: ex, difficulty: 2, locale: loc, seedEpoch: s, baseName: `K-318-${ex}-d2-${loc}-seed${s}`, tag: 'seed' });
      const seen = new Map();
      for (const job of renders) {
        const p = pools[job.theme][job.difficulty];
        const d = type.difficulty[job.difficulty];
        const expectRefusal = p.length < d.cards || (d.poolFloor && p.length < d.poolFloor) || (d.minWideCards && p.filter((e) => e.wide).length < d.minWideCards);
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        if (expectRefusal) { note(!!r.thrown, `${job.baseName}: rendered although the pool is ${p.length} (should refuse)`); console.log(`[C] ${job.baseName}: REFUSED (${p.length} eligible)`); continue; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) continue;
        assertions += 8 * r.cards.length;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        if (job.tag === 'seed') { const key = r.cards.map((c) => c.key).join(','); note(!seen.has(key), `${job.baseName}: same six words as seed ${seen.get(key)}`); seen.set(key, job.seedEpoch); }
        console.log(`[C] ${job.baseName}: ${r.cards.length} cards [${r.cards.map((c) => c.word).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      // the dots stack (nl ships dots at d2) under the worst chrome, on this locale's bank
      {
        const dotCfg = clone(cfg); dotCfg.dots = true;
        const r = await renderCheck(page, type, dotCfg, { theme: ex, difficulty: 2, locale: loc, strings: LONG_CHROME, baseName: `K-318-${ex}-d2-${loc}-dots-longchrome` });
        note(r.fails.length === 0, `dots stack: ${r.fails.join(' | ')}`);
        note(r.cards.every((c) => c.dots), 'dots stack: a card without dots');
        console.log(`[C] dots stack under long chrome: ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      // ---- C, the faces: every renderable wave theme (quick: the first live theme only) + the worst chrome + one refusal
      for (const f of faceTypes) {
        const cells = facePools[loc][f.face];
        const live = themes.filter((t) => cells[t].ok);
        const fex = live.includes(ex) ? ex : live[0];
        if (!fex) continue;
        const jobs = (QUICK ? [fex] : live).map((theme) => ({ theme, difficulty: 2, locale: loc, baseName: `${f.id}-${theme}-d2-${loc}`, tag: 'face' }));
        jobs.push({ theme: fex, difficulty: 2, locale: loc, strings: LONG_CHROME, baseName: `${f.id}-${fex}-d2-${loc}-longchrome`, tag: 'face-long' });
        for (let s = 2; s <= (QUICK ? 2 : 3); s++) jobs.push({ theme: fex, difficulty: 2, locale: loc, seedEpoch: s, baseName: `${f.id}-${fex}-d2-${loc}-seed${s}`, tag: 'face-seed' });
        for (const job of jobs) {
          let r;
          try { r = await renderCheck(page, f.type, null, job, { face: f.face, ap }); } catch (e) { r = { thrown: e.message }; }
          note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
          if (r.thrown) continue;
          assertions += 8 * r.cards.length;
          note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
          console.log(`[C] ${job.baseName}: ${r.cards.length} cards [${r.cards.map((c) => c.word).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
        }
        // a below-floor theme must REFUSE, never fill
        const dead = themes.find((t) => !cells[t].ok);
        if (dead) {
          let thrown = null;
          try { await renderCheck(page, f.type, null, { theme: dead, difficulty: 2, locale: loc, baseName: `${f.id}-${dead}-d2-${loc}-refusal` }, { face: f.face, ap }); } catch (e) { thrown = e.message; }
          note(!!thrown && /refused|eligible|distractors/.test(thrown), `${f.id}/${dead}: rendered although the face pool is ${cells[dead].pool.length} (should refuse)`);
          console.log(`[C] ${f.id}-${dead}: REFUSED (${cells[dead].pool.length} eligible)${thrown ? '' : ' — RENDERED'}`);
        }
      }
    }

    // ---- D. poisons (en bank; each must FAIL; control = the correct bank)
    const loc = 'en';
    const cfg = bankAll.en; const ap = approvedMap(loc);
    const dThemes = themesArg ? themesArg.split(',') : WAVE_THEMES.en;
    const ex = dThemes.includes(EXEMPLAR.en) ? EXEMPLAR.en : dThemes[0];
    const liveTheme = (face) => (facePools.en[face][ex] || {}).ok ? ex : dThemes.find((x) => facePools.en[face][x].ok);
    const control = await renderCheck(page, type, cfg, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-318-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, ap).length === 0, 'control (correct bank) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const dataPoison = (name, mutate, want) => poisons.push({ name, run: async () => { const c = clone(cfg); mutate(c); const f = checkBank(c, loc, ap); const hit = f.find((x) => want.test(x)); if (VERBOSE) console.log('      ' + name + ' → ' + (hit || 'NO MATCHING FAULT')); return hit ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    dataPoison('P1 unapproved key', (c) => { c.bank.unicornhorn = [['u', 'n', 'i', 'c', 'or', 'n']]; }, /not in approved/);
    dataPoison('P2 join != word (horse -> hors)', (c) => { c.bank.horse = [['h', 'or', 's']]; }, /joins to "hors"/);
    dataPoison('P3 multigraph off the whitelist', (c) => { c.bank.sheep = [['sh', 'eep']]; }, /not whitelisted/);
    dataPoison('P4 seam merged outside remergeAcrossSyllable', (c) => { c.bank.tiger = [['t', 'i'], ['g', 'er']]; }, /merges across an approved seam/);
    dataPoison('P5 dead remerge flag', (c) => { c.remergeAcrossSyllable.push('tiger'); }, /dead flag/);
    dataPoison('P6 excluded key also banked', (c) => { c.exclude.push('cat'); }, /both excluded and banked/);
    poisons.push({ name: 'P7 da strict pool violated', run: async () => {
      // the design names da `hund` (vocabKey `dog`, policy_managed:true — measured); fall back to any true key
      const da = approvedMap('da');
      const e = (da.get('dog') && da.get('dog').policy_managed === true) ? da.get('dog') : [...da.values()].find((x) => x.policy_managed === true && /^\p{L}+$/u.test(x.word));
      if (!e) return 'NEEDLE MATCHED NOTHING (no policy_managed:true entry in da)';
      const f = checkBank({ mode: 'bank', strictPool: 'policy_managed_absent', bank: { [e.key]: [[...e.word.toLowerCase()]] } }, 'da', da);
      return f.some((x) => /strict pool/.test(x)) ? null : 'silent';
    } });
    poisons.push({ name: 'P8 pool below the floor renders', run: async () => {
      const c = clone(cfg); const keep = new Set(['bat', 'cat', 'dog', 'fox', 'pig']); c.bank = Object.fromEntries(Object.entries(c.bank).filter(([k]) => keep.has(k)));
      try { await renderCheck(page, type, c, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-318-poison-p8' }); return 'silent (rendered 6 cards from a 5-word pool)'; } catch (e) { return /refused|< 8/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    const htmlPoison = (name, post, want, faceId) => poisons.push({ name, run: async () => {
      const ft = faceId ? faceTypes.find((f) => f.id === faceId) : null;
      const t = ft ? ft.type : type;
      const theme = ft ? liveTheme(ft.face) : ex;
      if (!theme) return 'NEEDLE MATCHED NOTHING (no renderable theme for the ' + ft.face + ' face in the themes given)';
      const r = await renderCheck(page, t, cfg, { theme, difficulty: 2, locale: loc, baseName: (faceId || 'K-318') + '-poison-' + name.slice(0, 3).replace(/\s/g, '').toLowerCase() }, { post, face: ft ? ft.face : 'base', ap });
      const hit = r.fails.find((x) => want.test(x));
      if (VERBOSE) console.log('      ' + name + ' → ' + (hit || 'NO MATCHING FAULT; first: ' + (r.fails[0] || 'none')));
      return hit ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const once = (re, fn) => (html) => { let done = false; return html.replace(re, (m, ...g) => { if (done) return m; done = true; return fn(m, ...g); }); };
    const need = (re, fn) => (html) => { if (!re.test(html)) throw new Error('NEEDLE MATCHED NOTHING: ' + re); return fn(html); };
    htmlPoison('P9 chunks stamp != word', once(/data-lcs-chunks="([^"]+)"/, (m, v) => `data-lcs-chunks="${v}|s"`), /chunks .* != word|stamps/);
    htmlPoison('P10 wide flag flipped', once(/data-lcs-wide="0"/, () => 'data-lcs-wide="1"'), /wide=/);
    htmlPoison('P11 the word printed on its card', (html) => html.replace(/(data-lcs-word="([^"]+)"[^>]*>)/, (m, open, w) => `${open}<span style="font-size:20px">${w}</span>`), /visible text/);
    htmlPoison('P12 duplicate word', (html) => { const ws = [...html.matchAll(/data-lcs-word="([^"]+)" data-lcs-vocab="([^"]+)" data-lcs-chunks="([^"]+)"/g)]; const a = ws[0], b = ws[1]; return html.replace(b[0], a[0]); }, /duplicate/);
    htmlPoison('P13 a box removed', once(/<rect x="1" y="1"[^>]*data-lcs-box="0"[^>]*\/>/, () => ''), /boxes for|svg says/);
    htmlPoison('P14 boxes squashed below 44', once(/(<svg[^>]*) height="(\d+)"([^>]*data-lcs-soundboxes)/, (m, a, h, b) => `${a} height="30"${b}`), /< 44|squashed/);
    htmlPoison('P15 box row wider than the card', once(/(<svg[^>]*) width="(\d+)" height="(\d+)"([^>]*data-lcs-soundboxes)/, (m, a, w, h, b) => `${a} width="340" height="${h}"${b}`), /> 302|wider/);
    htmlPoison('P16 blank page (non-vacuity)', (html) => html.replace(/<section class="ws-card"[\s\S]*<\/section>/, ''), /non-vacuity|cards, want|blank/);
    // ---- the face poisons
    htmlPoison('F1 Count answer != sounds', need(/data-lcs-answer="(\d)"/, once(/data-lcs-answer="(\d)"/, (m, n) => `data-lcs-answer="${+n + 1}"`)), /answer \d, sounds|answer \d+, sounds/, 'K-329');
    htmlPoison('F2 Count digit printed in the answer box', need(/data-lcs-answer="(\d)"><\/span>/, once(/data-lcs-answer="(\d)"><\/span>/, (m, n) => `data-lcs-answer="${n}">${n}</span>`)), /prints "\d"|digit is visible|visible text/, 'K-329');
    htmlPoison('F3 Count lane carries a tick', need(/data-lcs-soundlane="1">/, once(/data-lcs-soundlane="1">/, (m) => m + '<line x1="60" y1="8" x2="60" y2="50" stroke="#146B5E" stroke-width="2"/>')), /tick or a mark/, 'K-329');
    htmlPoison('F4 Starter prints the wrong first sound', need(/data-lcs-printed="0">([^<]+)<\/text>/, once(/data-lcs-printed="0">([^<]+)<\/text>/, (m, t) => m.replace(`>${t}<`, `>${t === 'x' ? 'q' : 'x'}<`))), /box 1 prints|starter/, 'K-330');
    htmlPoison('F5 Starter prints two boxes', need(/(<text [^>]*data-lcs-printed="0"[^>]*>[^<]+<\/text>)/, once(/(<text [^>]*data-lcs-printed="0"[^>]*>[^<]+<\/text>)/, (m, t) => t + t.replace('data-lcs-printed="0"', 'data-lcs-printed="1"').replace(/ x="[\d.]+"/, ' x="120"'))), /printed boxes|beyond the starter|visible text/, 'K-330');
    htmlPoison('F6 Strip carries a wide box', need(/data-lcs-box="5" data-lcs-wide="0"/, once(/data-lcs-box="5" data-lcs-wide="0"/, () => 'data-lcs-box="5" data-lcs-wide="1"')), /wide box on the strip|wide/, 'G1-312');
    htmlPoison('F7 Strip of 5', need(/<rect [^>]*data-lcs-box="5"[^>]*\/>/, once(/<rect [^>]*data-lcs-box="5"[^>]*\/>/, () => '')), /boxes on a 6-strip|strip is not|strip 5 boxes/, 'G1-312');
    htmlPoison('F8 a 7-sound word on the 6-strip', need(/data-lcs-word="([^"]+)" data-lcs-vocab="([^"]+)" data-lcs-chunks="([^"]+)"/, once(/data-lcs-word="([^"]+)" data-lcs-vocab="([^"]+)" data-lcs-chunks="([^"]+)"/, (m, w, k, c) => `data-lcs-word="${w}stx" data-lcs-vocab="${k}" data-lcs-chunks="${c}|s|t|x"`)), /do not fit/, 'G1-312');
    htmlPoison('F9 Tiers arc removed', need(/<path [^>]*data-lcs-arc="2"[^>]*\/>/, once(/<path [^>]*data-lcs-arc="2"[^>]*\/>/, () => '')), /arcs for|not under arc|under 0 arcs|arcs !=/, 'G1-313');
    htmlPoison('F10 Tiers arcs shifted off their boxes', need(/<svg [^>]*data-lcs-arcs="\d"/, once(/<svg ([^>]*data-lcs-arcs="\d")/, (m, a) => `<svg style="margin-left:60px" ${a}`)), /not under arc|under \d arcs/, 'G1-313');
    dataPoison('F11 Tiers rule-only key listed in texBoundary', (c) => { c.texBoundary.push('tiger'); }, /rule-only/);
    dataPoison('F12 Tiers TeX-agreed key omitted from texBoundary', (c) => { c.texBoundary = c.texBoundary.filter((k) => k !== 'window'); }, /omits "window"/);
    dataPoison('F13 Tiers remerged key listed', (c) => { c.texBoundary.push('rabbit'); }, /re-seat the seam/);
    poisons.push({ name: 'F14 Tiers renders a below-floor theme instead of refusing', run: async () => {
      const ft = faceTypes.find((f) => f.id === 'G1-313');
      const dead = dThemes.find((t) => !facePools.en.tiers[t].ok);
      if (!dead) return 'NEEDLE MATCHED NOTHING (every en theme clears the Tiers floor)';
      try { await renderCheck(page, ft.type, cfg, { theme: dead, difficulty: 2, locale: loc, baseName: 'G1-313-poison-f14' }, { face: 'tiers', ap }); return 'silent (rendered ' + dead + ')'; } catch (e) { return /refused/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    htmlPoison('F15 Blend no picture matches', need(/data-lcs-target="([^"]+)"/, (html) => { const t = /data-lcs-target="([^"]+)"/.exec(html)[1]; let done = false; return html.replace(new RegExp(`data-lcs-choice="${t}"`), () => { done = true; return 'data-lcs-choice="nothing"'; }); }), /pictures match the target|match/, 'G1-314');
    htmlPoison('F16 Blend two pictures match', (html) => { const t = /data-lcs-target="([^"]+)"/.exec(html)[1]; const i = html.indexOf(`data-lcs-target="${t}"`); const seg = html.slice(i); const re = /data-lcs-choice="([^"]+)"/g; let mm; while ((mm = re.exec(seg))) { if (mm[1] !== t) return html.slice(0, i) + seg.slice(0, mm.index) + `data-lcs-choice="${t}"` + seg.slice(mm.index + mm[0].length); } throw new Error('NEEDLE MATCHED NOTHING'); }, /pictures match the target|repeats in the row/, 'G1-314');
    htmlPoison('F17 Blend prints a word that is not the target', need(/data-lcs-printed="0">([^<]+)<\/text>/, once(/data-lcs-printed="0">([^<]+)<\/text>/, (m, t) => m.replace(`>${t}<`, `>${t === 'x' ? 'q' : 'x'}<`))), /boxes print|prints "/, 'G1-314');
    htmlPoison('F18 Blend the same picture twice on the page', (html) => { const targets = new Set([...html.matchAll(/data-lcs-target="([^"]+)"/g)].map((x) => x[1])); const cs = [...html.matchAll(/data-lcs-choice="([^"]+)"/g)]; const a = cs.find((c) => !targets.has(c[1]))[1]; const donor = cs.slice(3).find((c) => c[1] !== a && !targets.has(c[1])); if (!donor) throw new Error('NEEDLE MATCHED NOTHING'); return html.slice(0, donor.index) + `data-lcs-choice="${a}"` + html.slice(donor.index + donor[0].length); }, /already on the page|repeats on the page/, 'G1-314');
    htmlPoison('F19 Blend the answer always in column 1', (html) => html.replace(/(data-lcs-target="([^"]+)"[\s\S]*?data-lcs-choices="3">)([\s\S]*?)(<\/div><\/div>)/g, (m, open, t, imgs, close) => { const list = imgs.match(/<img [^>]*>/g); const hit = list.find((x) => x.includes(`data-lcs-choice="${t}"`)); const rest = list.filter((x) => x !== hit); return open + [hit, ...rest].join('') + close; }), /always picture 1|positional/, 'G1-314');
    htmlPoison('F20 Blend ragged picture columns', need(/data-lcs-boxslot="(\d+)"/, once(/width:(\d+)px;flex:none/, (m, w) => `width:${+w - 40}px;flex:none`)), /ragged/, 'G1-314');
    htmlPoison('F21 a face whose stamp says base (knob undeclared)', (html) => html.replace(/data-lcs-face="count"/g, 'data-lcs-face="base"'), /face stamp|root stamps|the spec is the/, 'K-329');
    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`K-318 gate: ${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed → ${verdict ? 'PASS' : 'FAIL'}`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, poolFor, derive, fitBox, deriveTexBoundary, WHITELIST, FACES };
