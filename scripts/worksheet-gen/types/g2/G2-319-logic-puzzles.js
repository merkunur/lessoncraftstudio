/**
 * G2-319 — Logic Grid Puzzles: Three Clues, One Answer (nt20-C; family key
 * `logic-puzzles`, G2, no honest CCSS code — a readiness class, `teaches`
 * "Logical reasoning: deduction from clues"). Design:
 * docs/worksheet-gen/b3-designs/G2-319-logic-puzzles.md §2/§5.
 *
 * DEDUCTION FROM SENTENCE CLUES. Two CASE FILES per page: three named
 * children × three pictures, numbered clue sentences at left (the PICTURE
 * stands in for every noun, so no locale prints a noun phrase), the
 * ELIMINATION GRID at right (name tiles down, pictures across, nine empty
 * white cells the child marks ✓ / ✗), and an ANSWER STRIP under both where
 * the child CIRCLES each child's picture. A wordless `markKey` at the top
 * shows ✓, ✗ and the crossing rule. Never a Latin square, a matrix, a Venn
 * ring or a line-up (the visual-logic family, untouched).
 *
 * THEMED (`themeAxis:{applicable:true, minNouns:6, excludeBw:true}`): the real
 * gate is the curated allowlist `SETS.distinct[theme]` in
 * data/b3/logic-puzzles.js (every picture OPENED; >= 6 pairwise-distinct at
 * 36 px greyscale); a theme without an allowlist REFUSES (throws). `unitAxis`
 * OFF (grid size is the F2 face). build() reads ONLY the bank
 * (lib/b3-common.js `bank`) + `entriesFor` / `fileUri` for the picture file +
 * its vocab-singular alt; never image-vocabulary.js.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED config, never the
 * level index:
 *   size            children × pictures per case (3 on the base; 4 = the F2 face,
 *                   read by this render path: 8 names, no answer strip)
 *   clues           [min, max] necessary clues per case after stripping
 *   kinds           the frame kinds a clue may take: neg | pos | either |
 *                   holderNot (holderNot = the neg CONSTRAINT with an inverted
 *                   frame, stamped k:'neg' f:'holderNot'); cross / crossNot and
 *                   `mode` are the F4 / F3 / F5 faces — the base REFUSES them
 *   maxPos / minEither / minHolderNot / maxHolderNot   quotas per case
 *   cell / headW / hdrH / namePx / picPx   the grid geometry (cell >= 36, the G2 floor)
 *   inlinePic / bankPic   the clue-sentence and answer-strip picture px (>= 36)
 *   answer          'circle' (the strip) | 'none' (size 4); 'box' is the
 *                   design's unbuilt data fallback → refused
 *   cases           2
 *
 * Generation (design §5, measured by the pedagogy's solver): pick a random
 * solution (never the identity permutation — a diagonal leaks), seed the
 * quota kinds first, add TRUE clues (kinds within `kinds`, quotas honoured)
 * until the exhaustive solution count is 1, strip every redundant clue, then
 * re-roll when the count leaves `clues`, a quota is missed, or row/column
 * propagation does not reach the full solution. Names (2·size of 8) and
 * pictures (2·size of the allowlist, no `confusable` pair inside a case) are
 * disjoint across the two cases.
 *
 * Answer hiding: nothing on the page prints a solution — the grid cells are
 * EMPTY rects, the strip lists every picture in COLUMN order. Ground truth
 * rides on the case root (data-lcs-solution / -clues / -names / -pics /
 * -forms, indices only); verify(page) re-derives it: exhaustive permutation
 * count = 1 and equal to the stamp, every clue necessary, propagation-
 * solvable, every rendered clue carries the stamped name literal and the
 * stamped pictures (by src), pictures in the theme allowlist with no
 * confusable pair, names / pictures disjoint across cases, kinds + counts +
 * quotas within the stamped config, cells empty, strip unmarked, layout
 * (rows <= 66, clue column <= grid height, tile text <= 104, nothing below
 * the footer).
 *
 * Chrome budget (README 722; measured worst legal chromes 733 / 710 / 700):
 * markKey 36 + 12 + band + 20 + band; band = grid (hdrH + 3·cell) + 8 + 48.
 * d2/d3 cell 60 → 244 + 56 = 300 → 668; d1 cell 64 (the design's 66 → 318
 * bands → 704 > the measured 700 of a 4-line fi title) → 256 + 56 = 312 → 692.
 * Slack goes to the band gaps (`justify-content:space-evenly`), never the grid.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fillSlots } = require('../../lib/b3-instructions.js');
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { logicGrid, markKey } = require('../../primitives/logic-grid.js');
const { clueRow, answerBank } = require('../../templates/components-b3.js');
const { esc: escBase } = require('../../primitives/_svg.js');
const esc = (v) => escBase(v).replace(/'/g, '&#39;');   // the JSON stamps sit in single-quoted attributes

const ID = 'G2-319';
const KEY = 'logic-puzzles';
const BODY_W = 675;
const COL_GAP = 20;
const BAND_GAP = 20;
const KEY_GAP = 12;
const STRIP_GAP = 8;
const STRIP_H = 48;
const G2_FLOOR = 36;
const BASE_KINDS = new Set(['neg', 'pos', 'either', 'holderNot']);
const CASE_ATTEMPTS = 400;
const PAGE_ATTEMPTS = 60;

/* ------------------------------------------------------------------ solver (node side; verify() carries its own copy) */
function permutations(n) {
  const out = [];
  const rec = (rest, acc) => { if (!rest.length) { out.push(acc); return; } rest.forEach((x, i) => rec(rest.filter((_, j) => j !== i), acc.concat(x))); };
  rec([...Array(n).keys()], []);
  return out;
}
function holds(c, sol) {
  if (c.k === 'neg') return sol[c.a] !== c.v;
  if (c.k === 'pos') return sol[c.a] === c.v;
  if (c.k === 'either') return c.v.includes(sol[c.a]);
  throw new Error(ID + ': unknown constraint kind ' + c.k);
}
function solutionsOf(clues, n) { return permutations(n).filter((s) => clues.every((c) => holds(c, s))); }
/** Row/column single-open propagation: returns the full solution or null. */
function propagate(clues, n) {
  const open = [...Array(n)].map(() => Array(n).fill(true));
  for (const c of clues) {
    if (c.k === 'neg') open[c.a][c.v] = false;
    else if (c.k === 'pos') { for (let w = 0; w < n; w++) if (w !== c.v) open[c.a][w] = false; for (let b = 0; b < n; b++) if (b !== c.a) open[b][c.v] = false; }
    else if (c.k === 'either') { for (let w = 0; w < n; w++) if (!c.v.includes(w)) open[c.a][w] = false; }
  }
  const fixed = Array(n).fill(-1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let a = 0; a < n; a++) {
      if (fixed[a] >= 0) continue;
      const cand = []; for (let w = 0; w < n; w++) if (open[a][w]) cand.push(w);
      if (cand.length === 0) return null;
      if (cand.length === 1) { fixed[a] = cand[0]; for (let b = 0; b < n; b++) if (b !== a) open[b][cand[0]] = false; changed = true; }
    }
    for (let w = 0; w < n; w++) {
      const cand = []; for (let a = 0; a < n; a++) if (open[a][w]) cand.push(a);
      if (cand.length === 0) return null;
      if (cand.length === 1 && fixed[cand[0]] < 0) { fixed[cand[0]] = w; for (let x = 0; x < n; x++) if (x !== w) open[cand[0]][x] = false; changed = true; }
    }
  }
  return fixed.every((x) => x >= 0) ? fixed : null;
}
function isIdentity(sol) { return sol.every((v, i) => v === i); }
function quotaFaults(clues, d) {
  const by = {}; for (const c of clues) by[c.f] = (by[c.f] || 0) + 1;
  const F = [];
  if (d.maxPos != null && (by.pos || 0) > d.maxPos) F.push('pos > maxPos');
  if (d.minEither != null && (by.either || 0) < d.minEither) F.push('either < minEither');
  if (d.minHolderNot != null && (by.holderNot || 0) < d.minHolderNot) F.push('holderNot < minHolderNot');
  if (d.maxHolderNot != null && (by.holderNot || 0) > d.maxHolderNot) F.push('holderNot > maxHolderNot');
  return F;
}
function constraintKey(c) { return c.k + ':' + c.a + ':' + (Array.isArray(c.v) ? c.v.slice().sort().join('|') : c.v); }

/** Every TRUE clue of the allowed frame kinds for a solution. */
function trueClues(rng, sol, n, kinds) {
  const out = [];
  for (let a = 0; a < n; a++) {
    for (let v = 0; v < n; v++) {
      if (v !== sol[a]) {
        if (kinds.includes('neg')) out.push({ k: 'neg', f: 'neg', a, v });
        if (kinds.includes('holderNot')) out.push({ k: 'neg', f: 'holderNot', a, v });
        if (kinds.includes('either')) out.push({ k: 'either', f: 'either', a, v: rng.shuffle([sol[a], v]) });
      } else if (kinds.includes('pos')) out.push({ k: 'pos', f: 'pos', a, v });
    }
  }
  return out;
}

/** One case: {sol, clues} under the resolved config, or null after CASE_ATTEMPTS. */
function composeCase(rng, d) {
  const n = d.size;
  const kinds = d.kinds;
  for (let attempt = 0; attempt < CASE_ATTEMPTS; attempt++) {
    const sol = rng.shuffle([...Array(n).keys()]);
    if (isIdentity(sol)) continue;
    const pool = rng.shuffle(trueClues(rng, sol, n, kinds));
    const seedOf = (f, want) => pool.filter((c) => c.f === f).slice(0, want || 0);
    const seeded = [...seedOf('either', d.minEither), ...seedOf('holderNot', d.minHolderNot)];
    const chosen = [];
    const keys = new Set();
    const by = {};
    const push = (c) => { chosen.push(c); keys.add(constraintKey(c)); by[c.f] = (by[c.f] || 0) + 1; };
    for (const c of seeded) push(c);
    let count = solutionsOf(chosen, n).length;
    for (const c of pool) {
      if (count === 1) break;
      if (keys.has(constraintKey(c))) continue;
      if (c.f === 'pos' && d.maxPos != null && (by.pos || 0) >= d.maxPos) continue;
      if (c.f === 'holderNot' && d.maxHolderNot != null && (by.holderNot || 0) >= d.maxHolderNot) continue;
      push(c);
      count = solutionsOf(chosen, n).length;
    }
    if (count !== 1) continue;
    // strip every redundant clue (random order); what remains is necessary
    let kept = rng.shuffle(chosen);
    for (let i = 0; i < kept.length; i++) {
      const without = kept.filter((_, j) => j !== i);
      if (solutionsOf(without, n).length === 1) { kept = without; i--; }
    }
    if (kept.length < d.clues[0] || kept.length > d.clues[1]) continue;
    if (quotaFaults(kept, d).length) continue;
    if (!kept.every((c) => kinds.includes(c.f))) continue;
    const prop = propagate(kept, n);
    if (!prop || prop.some((v, i) => v !== sol[i])) continue;
    return { sol, clues: rng.shuffle(kept) };
  }
  return null;
}

/* ------------------------------------------------------------------ pictures */
function confusableSet(sets) { return new Set((sets.confusable || []).map(([a, b]) => [a, b].sort().join('|'))); }
function hasConfusable(keys, bad) {
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) if (bad.has([keys[i], keys[j]].sort().join('|'))) return true;
  return false;
}

/* ------------------------------------------------------------------ html */
function inlinePic(p, j, px) {
  return `<img class="ws-icon" src="${esc(p.src)}" alt="${esc(p.alt)}" data-lcs-pic="${j}" style="width:${px}px;height:${px}px;vertical-align:middle;margin:0 3px">`;
}
function clueHtml(bankLoc, rng, c, forms, pics, px) {
  const frames = bankLoc.frames[c.f];
  if (!Array.isArray(frames) || !frames.length) throw new Error(`${ID}: the bank has no ${c.f} frame (a refusal of this kind — drop it from d.kinds)`);
  const frame = rng.pick(frames);
  const picIdx = Array.isArray(c.v) ? c.v : [c.v];
  const slots = { name: forms.nom, pic: picIdx.map((j) => inlinePic(pics[j], j, px)) };
  if (forms.ade) slots.nameAde = forms.ade;
  // a picture directly followed by punctuation keeps no right margin ("[pic] ." read as a gap)
  return fillSlots(esc(frame), slots).replace(/(<img[^>]*)margin:0 3px("[^>]*>)(?=[.,;:!?])/g, '$1margin:0 0 0 3px$2');
}

module.exports = {
  id: ID,
  slug: 'logic-puzzles',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  unitAxis: { applicable: false },
  difficulty: {
    1: { size: 3, cases: 2, clues: [2, 3], kinds: ['pos', 'neg'], maxPos: 1, cell: 64, headW: 124, hdrH: 64, namePx: 22, picPx: 56, inlinePic: 36, bankPic: 36, answer: 'circle' },
    2: { size: 3, cases: 2, clues: [3, 3], kinds: ['neg'], cell: 60, headW: 124, hdrH: 64, namePx: 22, picPx: 56, inlinePic: 36, bankPic: 36, answer: 'circle' },
    3: { size: 3, cases: 2, clues: [3, 3], kinds: ['neg', 'holderNot'], minHolderNot: 1, cell: 60, headW: 124, hdrH: 64, namePx: 22, picPx: 56, inlinePic: 36, bankPic: 36, answer: 'circle' },
  },
  i18n: {
    en: {
      title: 'Logic Grid Puzzles: Three Clues, One Answer',
      instruction: 'Read the clues. Cross out on the grid what cannot be true, tick what must be true, then circle the picture each child has.',
    },
  },
  // exported for the gate (own-code diffing) — never called by the render path
  _solver: { permutations, holds, solutionsOf, propagate, composeCase, quotaFaults, isIdentity },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (+ allowlists) — the gate's poison seam; build() passes the real ones. */
  _buildWith(bankLoc, d, { theme, locale }, ctx, setsIn) {
    const sets = setsIn || require('../../data/b3/logic-puzzles.js').SETS;
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!d) throw new Error(`${ID}: no difficulty config`);
    // guards on the RESOLVED config
    if (d.mode) throw new Error(`${ID}: mode "${d.mode}" is a Phase-2 face; the base renders the sentence-clue grid only`);
    if (!(d.size === 3 || d.size === 4)) throw new Error(`${ID}: size must be 3 or 4, got ${d.size}`);
    if (d.cases !== 2) throw new Error(`${ID}: the page carries exactly 2 cases (cases:${d.cases})`);
    if (!Array.isArray(d.clues) || d.clues.length !== 2 || !(d.clues[0] >= 1 && d.clues[1] >= d.clues[0])) throw new Error(`${ID}: clues must be [min,max], got ${JSON.stringify(d.clues)}`);
    if (!Array.isArray(d.kinds) || !d.kinds.length) throw new Error(`${ID}: kinds must be a non-empty array`);
    for (const k of d.kinds) if (!BASE_KINDS.has(k)) throw new Error(`${ID}: kind "${k}" is not a single-attribute clue kind (cross/crossNot are the F4 face)`);
    if (!(d.cell >= G2_FLOOR)) throw new Error(`${ID}: cell ${d.cell} < the G2 floor ${G2_FLOOR}`);
    if (!(d.picPx >= G2_FLOOR && d.inlinePic >= G2_FLOOR && d.bankPic >= G2_FLOOR)) throw new Error(`${ID}: a picture size is below the G2 floor ${G2_FLOOR}`);
    if (!(d.picPx <= d.cell && d.picPx <= d.hdrH)) throw new Error(`${ID}: picPx ${d.picPx} does not fit the header cell`);
    if (d.answer === 'box') throw new Error(`${ID}: answer:'box' (draw-or-write) is the design's unbuilt data fallback — refused`);
    if (d.answer !== 'circle' && d.answer !== 'none') throw new Error(`${ID}: answer must be circle|none, got ${d.answer}`);
    if (!theme) throw new Error(`${ID}: a theme is required (themeAxis applicable)`);
    const allow = sets.distinct && sets.distinct[theme];
    if (!Array.isArray(allow)) throw new Error(`${ID}: theme "${theme}" has no curated allowlist (SETS.distinct) — REFUSED, never padded`);
    const n = d.size;
    const need = 2 * n;
    if (allow.length < Math.max(6, need)) throw new Error(`${ID}: theme "${theme}" allowlist has ${allow.length} pictures < ${Math.max(6, need)} — REFUSED`);
    const names = Array.isArray(bankLoc.names) ? bankLoc.names : [];
    if (names.length < need) throw new Error(`${ID}: ${loc} bank has ${names.length} names < ${need} — REFUSED`);
    for (const k of d.kinds) if (!Array.isArray(bankLoc.frames && bankLoc.frames[k]) || !bankLoc.frames[k].length) throw new Error(`${ID}: ${loc} bank refuses the ${k} frame kind (empty) — drop it from kinds or refuse the face`);
    // every allowlisted picture resolves BEFORE any draw (a dead picture refuses the whole page)
    const entries = new Map(entriesFor(theme, loc).map((e) => [e.vocabKey, e]));
    const picOf = {};
    for (const key of allow) {
      const e = entries.get(key);
      if (!e || !e.singular) throw new Error(`${ID}: "${key}" of theme "${theme}" has no vocab entry / is excluded in ${loc} — REFUSED`);
      picOf[key] = { key, noun: e.noun, src: fileUri(theme, e.noun), alt: e.singular };
    }
    const bad = confusableSet(sets);

    // the page: two disjoint cases
    let cases = null;
    for (let attempt = 0; attempt < PAGE_ATTEMPTS && !cases; attempt++) {
      const nameIdx = rng.sample([...Array(names.length).keys()], need);
      const picKeys = rng.sample(allow, need);
      const parts = [];
      let ok = true;
      for (let p = 0; p < 2; p++) {
        const keys = picKeys.slice(p * n, (p + 1) * n);
        if (hasConfusable(keys, bad)) { ok = false; break; }
        const puzzle = composeCase(rng, d);
        if (!puzzle) { ok = false; break; }
        parts.push({ nameIdx: nameIdx.slice(p * n, (p + 1) * n), keys, sol: puzzle.sol, clues: puzzle.clues });
      }
      if (ok) cases = parts;
    }
    if (!cases) throw new Error(`${ID}: no page for ${JSON.stringify(d.kinds)} clues ${d.clues} on "${theme}" — REFUSED`);

    const gridW = d.headW + n * d.cell;
    const gridH = d.hdrH + n * d.cell;
    const clueW = BODY_W - gridW - COL_GAP;
    const strip = d.size === 3 && d.answer === 'circle';
    const bands = cases.map((cs, p) => {
      const forms = cs.nameIdx.map((i) => names[i]);
      const pics = cs.keys.map((k) => picOf[k]);
      const rows = cs.clues.map((c, i) => clueRow({ n: i + 1, html: clueHtml(bankLoc, rng, c, forms[c.a], pics, d.inlinePic) }));
      const clueCol = `<div data-lcs-cluecol style="display:grid;grid-template-rows:repeat(${rows.length},minmax(${d.inlinePic}px,auto));gap:4px;align-content:start;width:${clueW}px">${rows.join('')}</div>`;
      const grid = logicGrid({ rows: forms.map((f) => ({ label: f.nom })), cols: pics.map((x) => ({ src: x.src, alt: x.alt })), cell: d.cell, headW: d.headW, hdrH: d.hdrH, namePx: bankLoc.namePx || d.namePx, picPx: d.picPx, puzzle: p });
      const bankHtml = strip ? answerBank({ rows: forms.map((f) => ({ name: f.nom, pics: pics.map((x) => ({ src: x.src, alt: x.alt })) })), pic: d.bankPic, w: BODY_W }) : '';
      const stamps = `data-lcs-puzzle="${p}" data-lcs-size="${n}" data-lcs-kinds="${esc(d.kinds.join(','))}" data-lcs-names="${cs.nameIdx.join(',')}" ` +
        `data-lcs-pics="${esc(cs.keys.join(','))}" data-lcs-nouns="${esc(pics.map((x) => x.noun).join(','))}" data-lcs-forms='${esc(JSON.stringify(forms.map((f) => (f.ade ? { nom: f.nom, ade: f.ade } : { nom: f.nom }))))}' ` +
        `data-lcs-clues='${esc(JSON.stringify(cs.clues))}' data-lcs-solution="${cs.sol.join(',')}"`;
      return `<section data-ws-content ${stamps} style="display:flex;flex-direction:column;gap:${STRIP_GAP}px;width:${BODY_W}px;flex:0 0 auto">` +
        `<div style="display:grid;grid-template-columns:${clueW}px ${gridW}px;gap:${COL_GAP}px;align-items:start">${clueCol}${grid.html}</div>${bankHtml}</section>`;
    });
    const cfg = { size: n, clues: d.clues, kinds: d.kinds, maxPos: d.maxPos ?? null, minEither: d.minEither ?? null, minHolderNot: d.minHolderNot ?? null, maxHolderNot: d.maxHolderNot ?? null, cell: d.cell, headW: d.headW, hdrH: d.hdrH, picPx: d.picPx, inlinePic: d.inlinePic, bankPic: d.bankPic, answer: strip ? 'circle' : 'none', tileInner: d.headW - 20 };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-face="base" data-lcs-theme="${esc(theme)}" data-lcs-cfg='${esc(JSON.stringify(cfg))}' ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;gap:${KEY_GAP}px">` +
      markKey() +
      `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${BAND_GAP}px;min-height:0">${bands.join('')}</div></div>`;
    const meta = { theme, cases: cases.map((cs) => ({ names: cs.nameIdx.map((i) => names[i].nom), pics: cs.keys, solution: cs.sol, clues: cs.clues })), stack: 36 + KEY_GAP + 2 * (gridH + (strip ? STRIP_GAP + STRIP_H : 0)) + BAND_GAP };
    return { bodyHtml, meta };
  },

  async verify(page) {
    const { SETS } = require('../../data/b3/logic-puzzles.js');
    return page.evaluate((SETS) => {
      const fails = [];
      const root = document.querySelector('[data-lcs-type="G2-319"]');
      if (!root) return ['no G2-319 root'];
      let cfg;
      try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['cfg stamp does not parse']; }
      const theme = root.dataset.lcsTheme;
      const allow = SETS.distinct[theme];
      if (!Array.isArray(allow)) fails.push(`theme "${theme}" has no allowlist`);
      const bad = new Set((SETS.confusable || []).map(([a, b]) => [a, b].sort().join('|')));
      const footTop = (document.querySelector('.ws-foot') || { getBoundingClientRect: () => ({ top: Infinity }) }).getBoundingClientRect().top;
      const key = root.querySelector('.ws-logic-markkey');
      if (!key) fails.push('no markKey');
      else if (key.querySelector('[data-lcs-cell],[data-lcs-solution],[data-lcs-clues],[data-lcs-answer]')) fails.push('the markKey carries ground truth');

      // solver (own copy: verify cannot require)
      const perms = (n) => { const out = []; const rec = (rest, acc) => { if (!rest.length) { out.push(acc); return; } rest.forEach((x, i) => rec(rest.filter((_, j) => j !== i), acc.concat(x))); }; rec([...Array(n).keys()], []); return out; };
      const holds = (c, s) => (c.k === 'neg' ? s[c.a] !== c.v : c.k === 'pos' ? s[c.a] === c.v : c.k === 'either' ? Array.isArray(c.v) && c.v.includes(s[c.a]) : (fails.push('unknown constraint kind ' + c.k), false));
      const sols = (clues, n) => perms(n).filter((s) => clues.every((c) => holds(c, s)));
      const propagate = (clues, n) => {
        const open = [...Array(n)].map(() => Array(n).fill(true));
        for (const c of clues) {
          if (c.k === 'neg') open[c.a][c.v] = false;
          else if (c.k === 'pos') { for (let w = 0; w < n; w++) if (w !== c.v) open[c.a][w] = false; for (let b = 0; b < n; b++) if (b !== c.a) open[b][c.v] = false; }
          else if (c.k === 'either') { for (let w = 0; w < n; w++) if (!c.v.includes(w)) open[c.a][w] = false; }
        }
        const fixed = Array(n).fill(-1); let changed = true;
        while (changed) {
          changed = false;
          for (let a = 0; a < n; a++) { if (fixed[a] >= 0) continue; const cand = []; for (let w = 0; w < n; w++) if (open[a][w]) cand.push(w); if (!cand.length) return null; if (cand.length === 1) { fixed[a] = cand[0]; for (let b = 0; b < n; b++) if (b !== a) open[b][cand[0]] = false; changed = true; } }
          for (let w = 0; w < n; w++) { const cand = []; for (let a = 0; a < n; a++) if (open[a][w]) cand.push(a); if (!cand.length) return null; if (cand.length === 1 && fixed[cand[0]] < 0) { fixed[cand[0]] = w; for (let x = 0; x < n; x++) if (x !== w) open[cand[0]][x] = false; changed = true; } }
        }
        return fixed.every((x) => x >= 0) ? fixed : null;
      };

      const cases = [...root.querySelectorAll('section[data-lcs-puzzle]')];
      if (cases.length !== 2) fails.push(`${cases.length} cases, want 2`);
      const seenNames = new Set(), seenPics = new Set();
      cases.forEach((sec, p) => {
        const P = `case ${p + 1}`;
        const n = +sec.dataset.lcsSize;
        if (n !== cfg.size) fails.push(`${P}: size ${n} ≠ cfg ${cfg.size}`);
        const nameIdx = (sec.dataset.lcsNames || '').split(',').filter(Boolean).map(Number);
        const pics = (sec.dataset.lcsPics || '').split(',').filter(Boolean);
        const nouns = (sec.dataset.lcsNouns || '').split(',').filter(Boolean);
        let forms = [], clues = [];
        try { forms = JSON.parse(sec.dataset.lcsForms); clues = JSON.parse(sec.dataset.lcsClues); } catch (e) { fails.push(`${P}: forms/clues stamps do not parse`); return; }
        const sol = (sec.dataset.lcsSolution || '').split(',').filter(Boolean).map(Number);
        if (nameIdx.length !== n || new Set(nameIdx).size !== n) fails.push(`${P}: names stamp ${sec.dataset.lcsNames} is not ${n} distinct indices`);
        if (pics.length !== n || new Set(pics).size !== n) fails.push(`${P}: pics stamp is not ${n} distinct keys`);
        if (forms.length !== n) fails.push(`${P}: ${forms.length} name forms for ${n} rows`);
        if (sol.length !== n || new Set(sol).size !== n || sol.some((v) => !(v >= 0 && v < n))) fails.push(`${P}: solution ${sec.dataset.lcsSolution} is not a permutation of ${n}`);
        if (sol.length === n && sol.every((v, i) => v === i)) fails.push(`${P}: the solution is the identity (a diagonal leak)`);
        nameIdx.forEach((i) => { if (seenNames.has(i)) fails.push(`${P}: name ${i} is shared by both cases`); seenNames.add(i); });
        pics.forEach((k) => { if (seenPics.has(k)) fails.push(`${P}: picture ${k} is shared by both cases`); seenPics.add(k); });
        if (Array.isArray(allow)) pics.forEach((k) => { if (!allow.includes(k)) fails.push(`${P}: picture "${k}" is not in the ${theme} allowlist`); });
        for (let i = 0; i < pics.length; i++) for (let j = i + 1; j < pics.length; j++) if (bad.has([pics[i], pics[j]].sort().join('|'))) fails.push(`${P}: confusable pair ${pics[i]} / ${pics[j]} in one case`);
        // the logic
        if (!clues.length) fails.push(`${P}: no clues`);
        if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) fails.push(`${P}: ${clues.length} clues outside ${cfg.clues[0]}..${cfg.clues[1]}`);
        const by = {};
        clues.forEach((c, i) => {
          by[c.f] = (by[c.f] || 0) + 1;
          if (!cfg.kinds.includes(c.f)) fails.push(`${P}: clue ${i + 1} kind "${c.f}" outside cfg kinds [${cfg.kinds}]`);
          const kOf = { neg: 'neg', holderNot: 'neg', pos: 'pos', either: 'either' }[c.f];
          if (kOf !== c.k) fails.push(`${P}: clue ${i + 1} frame ${c.f} carries constraint ${c.k}`);
          if (!(c.a >= 0 && c.a < n)) fails.push(`${P}: clue ${i + 1} row ${c.a} out of range`);
          const vs = Array.isArray(c.v) ? c.v : [c.v];
          if (vs.some((v) => !(v >= 0 && v < n)) || (c.k === 'either' && (vs.length !== 2 || vs[0] === vs[1])) || (c.k !== 'either' && vs.length !== 1)) fails.push(`${P}: clue ${i + 1} value ${JSON.stringify(c.v)} malformed`);
          if (sol.length === n && !holds(c, sol)) fails.push(`${P}: clue ${i + 1} is FALSE for the stamped solution`);
        });
        if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) fails.push(`${P}: ${by.pos} pos clues > maxPos ${cfg.maxPos}`);
        if (cfg.minEither != null && (by.either || 0) < cfg.minEither) fails.push(`${P}: ${by.either || 0} either clues < minEither ${cfg.minEither}`);
        if (cfg.minHolderNot != null && (by.holderNot || 0) < cfg.minHolderNot) fails.push(`${P}: ${by.holderNot || 0} holderNot clues < minHolderNot`);
        if (cfg.maxHolderNot != null && (by.holderNot || 0) > cfg.maxHolderNot) fails.push(`${P}: ${by.holderNot} holderNot clues > maxHolderNot`);
        const all = sols(clues, n);
        if (all.length !== 1) fails.push(`${P}: ${all.length} solutions satisfy the clues (want exactly one)`);
        else if (all[0].join(',') !== sol.join(',')) fails.push(`${P}: the unique solution ${all[0]} ≠ the stamp ${sol}`);
        clues.forEach((_, i) => { if (sols(clues.filter((__, j) => j !== i), n).length < 2) fails.push(`${P}: clue ${i + 1} is redundant (dropping it keeps one solution)`); });
        const prop = propagate(clues, n);
        if (!prop || prop.join(',') !== sol.join(',')) fails.push(`${P}: row/column propagation does not reach the solution`);
        // the grid
        const grid = sec.querySelector('[data-lcs-grid]');
        if (!grid) { fails.push(`${P}: no grid`); return; }
        if (grid.dataset.lcsMode !== 'blank') fails.push(`${P}: grid mode ${grid.dataset.lcsMode} (base = blank)`);
        const cells = [...grid.querySelectorAll('[data-lcs-cell]')];
        if (cells.length !== n * n) fails.push(`${P}: ${cells.length} cells, want ${n * n}`);
        cells.forEach((c) => {
          const m = /^(\d+):(\d+):(\d+)$/.exec(c.dataset.lcsCell || '');
          if (!m || +m[1] !== p || +m[2] >= n || +m[3] >= n) fails.push(`${P}: cell stamp ${c.dataset.lcsCell} malformed`);
          if (c.children.length || c.textContent.trim() || c.getAttribute('class') || c.hasAttribute('data-lcs-mark')) fails.push(`${P}: cell ${c.dataset.lcsCell} is not empty (answer printed)`);
          const r = c.getBoundingClientRect();
          if (r.width < cfg.cell - 0.6 || r.height < cfg.cell - 0.6) fails.push(`${P}: cell ${c.dataset.lcsCell} renders ${r.width.toFixed(1)}×${r.height.toFixed(1)} < ${cfg.cell}`);
          if (r.width < 36 || r.height < 36) fails.push(`${P}: cell below the G2 floor 36`);
        });
        if (grid.querySelector('[data-lcs-mark]')) fails.push(`${P}: a mark is printed on the grid`);
        const labels = [...grid.querySelectorAll('text[data-lcs-row]')];
        if (labels.length !== n) fails.push(`${P}: ${labels.length} name tiles, want ${n}`);
        labels.forEach((t) => {
          const r = +t.dataset.lcsRow;
          const want = forms[r] && forms[r].nom;
          if (t.textContent !== want) fails.push(`${P}: tile ${r} prints "${t.textContent}", the stamped name is "${want}"`);
          const inner = +t.dataset.lcsTileInner || cfg.tileInner;
          const len = t.getComputedTextLength();
          if (len > inner + 0.5) fails.push(`${P}: tile text "${t.textContent}" ${len.toFixed(1)} > the tile inner ${inner}`);
        });
        const heads = [...grid.querySelectorAll('img[data-lcs-col]')];
        if (heads.length !== n) fails.push(`${P}: ${heads.length} header pictures, want ${n}`);
        const headSrc = [];
        heads.forEach((im) => {
          const j = +im.dataset.lcsCol;
          headSrc[j] = im.src;
          if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: header picture ${j} broken`);
          const base = decodeURIComponent(im.src.split('/').pop());
          if (nouns[j] && !base.startsWith(nouns[j] + '@') && base !== nouns[j] + '.webp') fails.push(`${P}: header picture ${j} file "${base}" ≠ stamped noun "${nouns[j]}"`);
          const r = im.getBoundingClientRect();
          if (r.width < cfg.picPx - 0.6 || r.height < cfg.picPx - 0.6) fails.push(`${P}: header picture ${j} ${r.width.toFixed(0)} < ${cfg.picPx}`);
          const g = grid.getBoundingClientRect();
          if (r.left < g.left - 0.6 || r.right > g.right + 0.6 || r.top < g.top - 0.6 || r.bottom > g.bottom + 0.6) fails.push(`${P}: header picture ${j} outside the grid box`);
        });
        // the clue rows
        const rows = [...sec.querySelectorAll('[data-lcs-clue]')];
        if (rows.length !== clues.length) fails.push(`${P}: ${rows.length} clue rows for ${clues.length} stamped clues`);
        rows.forEach((row) => {
          const i = +row.dataset.lcsClue;
          const c = clues[i];
          if (!c) { fails.push(`${P}: row ${i} has no stamped clue`); return; }
          const txt = row.textContent.replace(/\s+/g, ' ');
          const f = forms[c.a] || {};
          const lit = (c.f === 'holderNot') ? f.nom : (f.ade || f.nom);
          if (!lit || !txt.includes(lit)) fails.push(`${P}: clue ${i + 1} text "${txt}" lacks the stamped name literal "${lit}"`);
          const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
          const want = Array.isArray(c.v) ? c.v : [c.v];
          if (imgs.length !== want.length) fails.push(`${P}: clue ${i + 1} shows ${imgs.length} pictures, the stamp names ${want.length}`);
          imgs.forEach((im, q) => {
            const j = +im.dataset.lcsPic;
            if (j !== want[q]) fails.push(`${P}: clue ${i + 1} picture ${q} is column ${j}, stamped ${want[q]}`);
            if (headSrc[j] !== undefined && im.src !== headSrc[j]) fails.push(`${P}: clue ${i + 1} picture ${q} src ≠ the header picture of column ${j}`);
            if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: clue ${i + 1} picture broken`);
            const r = im.getBoundingClientRect();
            if (r.width < cfg.inlinePic - 0.6 || r.height < cfg.inlinePic - 0.6) fails.push(`${P}: clue ${i + 1} picture ${r.width.toFixed(0)} < ${cfg.inlinePic}`);
          });
          // every printed name in the row is a case name (no foreign name, no noun)
          if (row.clientHeight > 66) fails.push(`${P}: clue ${i + 1} row ${row.clientHeight} px > 66`);
          const rr = row.getBoundingClientRect();
          if (rr.bottom > footTop + 0.6) fails.push(`${P}: clue ${i + 1} below the footer`);
        });
        const col = sec.querySelector('[data-lcs-cluecol]');
        const gb = grid.getBoundingClientRect();
        if (col && col.scrollHeight > gb.height + 0.6) fails.push(`${P}: clue column ${col.scrollHeight} taller than the grid ${gb.height.toFixed(0)}`);
        if (col && col.scrollWidth > col.clientWidth + 1) fails.push(`${P}: clue column content wider than the column`);
        if (gb.bottom > footTop + 0.6) fails.push(`${P}: grid below the footer`);
        // the answer strip
        const slots = [...sec.querySelectorAll('[data-lcs-answer-slot]')];
        if (cfg.answer === 'circle') {
          if (slots.length !== n) fails.push(`${P}: ${slots.length} answer chips, want ${n}`);
          slots.forEach((ch) => {
            const r = +ch.dataset.lcsAnswerSlot;
            if (ch.hasAttribute('data-lcs-answer') || ch.querySelector('[data-lcs-answer],[data-lcs-mark],svg,circle')) fails.push(`${P}: answer chip ${r} carries a mark / ring / answer`);
            const nameEl = ch.querySelector('span');
            if (!nameEl || nameEl.textContent.trim() !== (forms[r] && forms[r].nom)) fails.push(`${P}: answer chip ${r} name "${nameEl && nameEl.textContent}" ≠ "${forms[r] && forms[r].nom}"`);
            const imgs = [...ch.querySelectorAll('img')];
            if (imgs.length !== n) fails.push(`${P}: answer chip ${r} shows ${imgs.length} pictures, want ${n}`);
            imgs.forEach((im, j) => {
              if (headSrc[j] !== undefined && im.src !== headSrc[j]) fails.push(`${P}: answer chip ${r} picture ${j} is not column ${j} (order leaks or a wrong picture)`);
              if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: answer chip ${r} picture ${j} broken`);
              const b = im.getBoundingClientRect();
              if (b.width < cfg.bankPic - 0.6 || b.height < cfg.bankPic - 0.6) fails.push(`${P}: answer chip picture ${b.width.toFixed(0)} < ${cfg.bankPic}`);
              if (b.width < 36) fails.push(`${P}: answer chip picture below the G2 floor 36`);
            });
            const cb = ch.getBoundingClientRect();
            [...ch.querySelectorAll('img,span')].forEach((el) => { const b = el.getBoundingClientRect(); if (b.width && (b.left < cb.left - 0.6 || b.right > cb.right + 0.6 || b.top < cb.top - 0.6 || b.bottom > cb.bottom + 0.6)) fails.push(`${P}: answer chip ${r} content outside the chip`); });
            if (cb.bottom > footTop + 0.6) fails.push(`${P}: answer strip below the footer`);
          });
        } else if (slots.length) fails.push(`${P}: ${slots.length} answer chips on a grid-is-the-answer page`);
        const sb = sec.getBoundingClientRect();
        if (sb.bottom > footTop + 0.6) fails.push(`${P}: band below the footer`);
        if (sb.width > 675.6) fails.push(`${P}: band ${sb.width.toFixed(0)} wider than 675`);
      });
      // no ground truth outside a case root; no data-lcs-answer anywhere
      if (root.querySelector('[data-lcs-answer]')) fails.push('a data-lcs-answer attribute on the page (nothing on this sheet is an open box)');
      root.querySelectorAll('[data-lcs-solution],[data-lcs-clues]').forEach((el) => { if (!el.hasAttribute('data-lcs-puzzle')) fails.push('ground truth outside a case root'); });
      return fails;
    }, SETS);
  },
};
