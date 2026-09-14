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
 *
 * Phase-2 faces (2026-09-14; design §3, record _work/G2-319-faces.md). Three
 * ADDITIVE knobs, every one read only when declared, so a config without them
 * renders BYTE-IDENTICAL html (tools/b3-baseline.js is the proof):
 *   mode        'picture' (F3 G1-349: the clue is a name tile + a ringed or
 *               crossed-out picture, no sentence; stacked 44 px answer chips)
 *               | 'two-attr' (F4 G3-379: ONE case, 3 names × 3 theme pictures
 *               × 3 pictures of a SECOND theme `attr2`, three linked grids
 *               `np|nc|pc` in one L-frame, 4-6 clues incl. >= 1 linking
 *               `cross` clue, no strip) | 'read' (F5 G2-345: two SOLVED grids,
 *               five statements each with a ✓ / ✗ glyph pair the child circles).
 *               Dispatched by _buildWith BEFORE the base path; stamped
 *               `data-lcs-face` + `data-lcs-mode` = the mode; verify(page)
 *               branches on the stamp.
 *   pageMin     {kind: n} — a PAGE-level quota across both cases (F1 G2-344:
 *               {pos:1, either:1} so every page carries a yes AND an either-or
 *               clue; per-case quotas stay minEither / maxPos).
 *   maxEither   a per-case cap (F2 G3-378: 2 — the second EN `either` shape
 *               wraps to two lines in F2's 277 px column; rows measure 36 / 60,
 *               so 2 two-liners + 4 one-liners = 284 <= the 4×4 grid's 304).
 * F4's second attribute is a PICTURE theme, not the design's `colors`: the six
 * colour drops measure luma 88-182 with one silhouette (invisible on a mono
 * laser; the base record's open item), while every theme allowlist was opened
 * at 36 px grey. `attr2` = the first listed theme that is not the fan theme
 * (['fruits','pets']: fruits for five fans, pets for the fruits fan); the two
 * allowlists are disjoint by construction (asserted).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fillSlots } = require('../../lib/b3-instructions.js');
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { logicGrid, markKey, lGrid } = require('../../primitives/logic-grid.js');
const { clueRow, answerBank, pictureClue, statementRow } = require('../../templates/components-b3.js');
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
  if (d.maxEither != null && (by.either || 0) > d.maxEither) F.push('either > maxEither');
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
      if (c.f === 'either' && d.maxEither != null && (by.either || 0) >= d.maxEither) continue;
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

/* ================================================================== Phase-2 faces (2026-09-14; design §3)
 * Three CODE faces on the additive `mode` knob, dispatched by _buildWith BEFORE the base path.
 * Shared: the picture door (every allowlisted picture resolves before a draw), the name / picture
 * sampling with the confusable rule, the case stamps (indices only). Each face has its own
 * composer + html; verifyFaceInPage (browser, stamps only) carries its own solvers.
 */
const G1_FLOOR = 44;
const TWO_ATTR_KINDS = new Set(['neg', 'pos', 'either', 'holderNot', 'cross', 'crossNot']);
const TRUTH_KINDS = new Set(['has', 'hasNot', 'holderIs', 'either', 'nobody']);

function pageMinFaults(cluesPerCase, pageMin) {
  const tally = {};
  for (const clues of cluesPerCase) for (const c of clues) tally[c.f] = (tally[c.f] || 0) + 1;
  return Object.entries(pageMin).filter(([k, min]) => (tally[k] || 0) < min).map(([k, min]) => `${k} ${tally[k] || 0} < pageMin ${min}`);
}

/** Every allowlisted picture of `theme` resolved in `loc` (a dead picture refuses the whole page). */
function resolveAllow(theme, loc, sets, min, what) {
  const allow = sets.distinct && sets.distinct[theme];
  if (!Array.isArray(allow)) throw new Error(`${ID}: ${what} "${theme}" has no curated allowlist (SETS.distinct) — REFUSED, never padded`);
  if (allow.length < min) throw new Error(`${ID}: ${what} "${theme}" allowlist has ${allow.length} pictures < ${min} — REFUSED`);
  const entries = new Map(entriesFor(theme, loc).map((e) => [e.vocabKey, e]));
  const picOf = {};
  for (const key of allow) {
    const e = entries.get(key);
    if (!e || !e.singular) throw new Error(`${ID}: "${key}" of ${what} "${theme}" has no vocab entry / is excluded in ${loc} — REFUSED`);
    picOf[key] = { key, noun: e.noun, src: fileUri(theme, e.noun), alt: e.singular };
  }
  return { allow, picOf };
}
function commonGuards(d, floor) {
  if (!Array.isArray(d.clues) && d.mode !== 'read') throw new Error(`${ID} ${d.mode}: clues must be [min,max]`);
  if (!(d.cell >= floor)) throw new Error(`${ID} ${d.mode}: cell ${d.cell} < the floor ${floor}`);
  if (!(d.picPx >= floor)) throw new Error(`${ID} ${d.mode}: picPx ${d.picPx} < the floor ${floor}`);
  if (!(d.picPx <= d.cell && d.picPx <= d.hdrH)) throw new Error(`${ID} ${d.mode}: picPx ${d.picPx} does not fit the header cell`);
  if (d.answer === 'box') throw new Error(`${ID} ${d.mode}: answer:'box' (draw-or-write) is the design's unbuilt data fallback — refused`);
}
function caseStamps(p, n, kindsLabel, cs, forms) {
  return `data-lcs-puzzle="${p}" data-lcs-size="${n}" data-lcs-kinds="${esc(kindsLabel)}" data-lcs-names="${cs.nameIdx.join(',')}" ` +
    `data-lcs-pics="${esc(cs.keys.join(','))}" data-lcs-nouns="${esc(cs.pics.map((x) => x.noun).join(','))}" data-lcs-forms='${esc(JSON.stringify(forms.map((f) => (f.ade ? { nom: f.nom, ade: f.ade } : { nom: f.nom }))))}'`;
}
function rootHtml(d, theme, cfg, inner, extraAttrs) {
  return `<div data-ws-content data-lcs-type="${ID}" data-lcs-face="${esc(d.mode)}" data-lcs-mode="${esc(d.mode)}" data-lcs-theme="${esc(theme)}" ${extraAttrs || ''}data-lcs-cfg='${esc(JSON.stringify(cfg))}' ` +
    `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;gap:${KEY_GAP}px">${inner}</div>`;
}

function buildFace(bankLoc, d, { theme, locale }, ctx, sets) {
  const B = { picture: buildPicture, 'two-attr': buildTwoAttr, read: buildRead }[d.mode];
  if (!B) throw new Error(`${ID}: unknown mode "${d.mode}" (picture | two-attr | read)`);
  return B(bankLoc, d, { theme, locale }, ctx, sets);
}

/* ---------------- F3 mode:'picture' (G1-349) ---------------- */
function buildPicture(bankLoc, d, { theme, locale }, ctx, sets) {
  const rng = ctx.rng;
  const loc = (locale || 'en').slice(0, 2);
  const n = d.size;
  if (n !== 3) throw new Error(`${ID} picture: size must be 3, got ${n}`);
  if (d.cases !== 2) throw new Error(`${ID} picture: the page carries exactly 2 cases (cases:${d.cases})`);
  if (!Array.isArray(d.kinds) || !d.kinds.length || d.kinds.some((k) => k !== 'neg' && k !== 'pos')) throw new Error(`${ID} picture: kinds must be within neg|pos (a picture clue is "has" or "does not have"), got ${JSON.stringify(d.kinds)}`);
  commonGuards(d, G1_FLOOR);
  if (!(d.ring >= G1_FLOOR && d.bankPic >= G1_FLOOR)) throw new Error(`${ID} picture: ring ${d.ring} / bankPic ${d.bankPic} below the G1 floor ${G1_FLOOR}`);
  if (d.answer !== 'circle') throw new Error(`${ID} picture: answer must be circle (the stacked strip), got ${d.answer}`);
  if (!theme) throw new Error(`${ID}: a theme is required (themeAxis applicable)`);
  const names = Array.isArray(bankLoc.names) ? bankLoc.names : [];
  if (names.length < 2 * n) throw new Error(`${ID}: ${loc} bank has ${names.length} names < ${2 * n} — REFUSED`);
  const { allow, picOf } = resolveAllow(theme, loc, sets, Math.max(6, 2 * n), 'theme');
  const bad = confusableSet(sets);
  let cases = null;
  for (let attempt = 0; attempt < PAGE_ATTEMPTS && !cases; attempt++) {
    const nameIdx = rng.sample([...Array(names.length).keys()], 2 * n);
    const picKeys = rng.sample(allow, 2 * n);
    const parts = [];
    let ok = true;
    for (let p = 0; p < 2; p++) {
      const keys = picKeys.slice(p * n, (p + 1) * n);
      if (hasConfusable(keys, bad)) { ok = false; break; }
      const puzzle = composeCase(rng, d);
      if (!puzzle) { ok = false; break; }
      parts.push({ nameIdx: nameIdx.slice(p * n, (p + 1) * n), keys, pics: keys.map((k) => picOf[k]), sol: puzzle.sol, clues: puzzle.clues });
    }
    if (ok && d.pageMin && pageMinFaults(parts.map((x) => x.clues), d.pageMin).length) ok = false;   // every page shows both pictograms (pos = the ringed picture)
    if (ok) cases = parts;
  }
  if (!cases) throw new Error(`${ID} picture: no page for ${JSON.stringify(d.kinds)} clues ${d.clues} on "${theme}" — REFUSED`);
  const gridW = d.headW + n * d.cell, gridH = d.hdrH + n * d.cell;
  const clueW = BODY_W - gridW - COL_GAP;
  const bankW = d.bankW || 488;
  const bands = cases.map((cs, p) => {
    const forms = cs.nameIdx.map((i) => names[i]);
    const rows = cs.clues.map((c, i) => pictureClue({ n: i + 1, name: forms[c.a].nom, src: cs.pics[c.v].src, alt: cs.pics[c.v].alt, not: c.k === 'neg', pic: d.ring, col: c.v }));
    const clueCol = `<div data-lcs-cluecol style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;width:${clueW}px">${rows.join('')}</div>`;
    const grid = logicGrid({ rows: forms.map((f) => ({ label: f.nom })), cols: cs.pics.map((x) => ({ src: x.src, alt: x.alt })), cell: d.cell, headW: d.headW, hdrH: d.hdrH, namePx: bankLoc.namePx || d.namePx, picPx: d.picPx, puzzle: p });
    const bankHtml = `<div style="display:flex;justify-content:center;width:${BODY_W}px">` +
      answerBank({ rows: forms.map((f) => ({ name: f.nom, pics: cs.pics.map((x) => ({ src: x.src, alt: x.alt })) })), pic: d.bankPic, w: bankW, stack: true }) + '</div>';
    const stamps = caseStamps(p, n, d.kinds.join(','), cs, forms) + ` data-lcs-clues='${esc(JSON.stringify(cs.clues))}' data-lcs-solution="${cs.sol.join(',')}"`;
    return `<section data-ws-content ${stamps} style="display:flex;flex-direction:column;gap:${STRIP_GAP}px;width:${BODY_W}px;flex:0 0 auto">` +
      `<div style="display:grid;grid-template-columns:${clueW}px ${gridW}px;gap:${COL_GAP}px;align-items:start">${clueCol}${grid.html}</div>${bankHtml}</section>`;
  });
  const cfg = { mode: 'picture', size: n, clues: d.clues, kinds: d.kinds, maxPos: d.maxPos ?? null, pageMin: d.pageMin || null, cell: d.cell, headW: d.headW, hdrH: d.hdrH, picPx: d.picPx, ring: d.ring, bankPic: d.bankPic, bankW, answer: 'circle', tileInner: d.headW - 20, floor: G1_FLOOR };
  const bodyHtml = rootHtml(d, theme, cfg, markKey() + `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${BAND_GAP}px;min-height:0">${bands.join('')}</div>`);
  const meta = { mode: 'picture', theme, cases: cases.map((cs) => ({ names: cs.nameIdx.map((i) => names[i].nom), pics: cs.keys, solution: cs.sol, clues: cs.clues })), stack: 36 + KEY_GAP + 2 * (gridH + STRIP_GAP + 72) + BAND_GAP };
  return { bodyHtml, meta };
}

/* ---------------- F4 mode:'two-attr' (G3-379): the two-attribute solver ---------------- */
/** A state = {np, nc}: np[a] = the attr-1 picture of child a, nc[a] = the attr-2 picture; pc is derived. */
function holds2(c, S) {
  if (c.g === 'np' || c.g === 'nc') { const v = S[c.g][c.a]; return c.k === 'neg' ? v !== c.v : c.k === 'either' ? (Array.isArray(c.v) && c.v.includes(v)) : v === c.v; }
  if (c.g === 'pc') { const a = S.np.indexOf(c.a); const has = S.nc[a] === c.v; return c.k === 'neg' ? !has : has; }
  throw new Error(ID + ': unknown clue grid ' + c.g);
}
function states2(n) { const P = permutations(n); const out = []; for (const np of P) for (const nc of P) out.push({ np, nc }); return out; }
function solutions2(clues, n) { return states2(n).filter((S) => clues.every((c) => holds2(c, S))); }
/** Row / column single-open propagation over the three grids + the copy rule (a ✓ in one grid copies a row into another). */
function propagate2(clues, n) {
  const mk = () => [...Array(n)].map(() => Array(n).fill(true));
  const O = { np: mk(), nc: mk(), pc: mk() };
  const close = (g, r, c) => { if (O[g][r][c]) { O[g][r][c] = false; return true; } return false; };
  const fix = (g, r, c) => { let ch = false; for (let j = 0; j < n; j++) if (j !== c) ch = close(g, r, j) || ch; for (let i = 0; i < n; i++) if (i !== r) ch = close(g, i, c) || ch; return ch; };
  for (const c of clues) {
    if (c.k === 'neg') close(c.g, c.a, c.v);
    else if (c.k === 'pos') fix(c.g, c.a, c.v);
    else if (c.k === 'either') { for (let j = 0; j < n; j++) if (!c.v.includes(j)) close(c.g, c.a, j); }
  }
  const single = (g) => { const F = Array(n).fill(-1); for (let r = 0; r < n; r++) { const js = []; for (let j = 0; j < n; j++) if (O[g][r][j]) js.push(j); if (js.length === 1) F[r] = js[0]; } return F; };
  let changed = true, guard = 0;
  while (changed && guard++ < 200) {
    changed = false;
    for (const g of ['np', 'nc', 'pc']) {
      for (let r = 0; r < n; r++) { const js = []; for (let j = 0; j < n; j++) if (O[g][r][j]) js.push(j); if (!js.length) return null; if (js.length === 1) changed = fix(g, r, js[0]) || changed; }
      for (let j = 0; j < n; j++) { const is = []; for (let r = 0; r < n; r++) if (O[g][r][j]) is.push(r); if (!is.length) return null; if (is.length === 1) changed = fix(g, is[0], j) || changed; }
    }
    // the copy rule: np[a]=p ✓ → row a of nc ≡ row p of pc; nc[a]=c ✓ → column a of np ≡ column c of pc (by picture); pc[p]=c ✓ → np column p ≡ nc column c (by child)
    const Fnp = single('np'), Fnc = single('nc'), Fpc = single('pc');
    for (let a = 0; a < n; a++) if (Fnp[a] >= 0) { const p = Fnp[a]; for (let c = 0; c < n; c++) { if (!O.nc[a][c]) changed = close('pc', p, c) || changed; if (!O.pc[p][c]) changed = close('nc', a, c) || changed; } }
    for (let a = 0; a < n; a++) if (Fnc[a] >= 0) { const c = Fnc[a]; for (let p = 0; p < n; p++) { if (!O.np[a][p]) changed = close('pc', p, c) || changed; if (!O.pc[p][c]) changed = close('np', a, p) || changed; } }
    for (let p = 0; p < n; p++) if (Fpc[p] >= 0) { const c = Fpc[p]; for (let a = 0; a < n; a++) { if (!O.np[a][p]) changed = close('nc', a, c) || changed; if (!O.nc[a][c]) changed = close('np', a, p) || changed; } }
  }
  const np = single('np'), nc = single('nc');
  return np.every((x) => x >= 0) && nc.every((x) => x >= 0) ? { np, nc } : null;
}
function quotaFaults2(clues, d) {
  const F = quotaFaults(clues, d);
  const by = {}; for (const c of clues) by[c.f] = (by[c.f] || 0) + 1;
  if (d.minCross != null && (by.cross || 0) < d.minCross) F.push('cross < minCross');
  if (d.maxCross != null && (by.cross || 0) > d.maxCross) F.push('cross > maxCross');
  return F;
}
function trueClues2(rng, S, n, kinds) {
  const out = [];
  for (const g of ['np', 'nc']) for (let a = 0; a < n; a++) for (let v = 0; v < n; v++) {
    if (v !== S[g][a]) {
      if (kinds.includes('neg')) out.push({ k: 'neg', f: 'neg', g, a, v });
      if (kinds.includes('holderNot')) out.push({ k: 'neg', f: 'holderNot', g, a, v });
      if (kinds.includes('either')) out.push({ k: 'either', f: 'either', g, a, v: rng.shuffle([S[g][a], v]) });
    } else if (kinds.includes('pos')) out.push({ k: 'pos', f: 'pos', g, a, v });
  }
  for (let p = 0; p < n; p++) {
    const a = S.np.indexOf(p), c = S.nc[a];
    for (let v = 0; v < n; v++) {
      if (v === c) { if (kinds.includes('cross')) out.push({ k: 'pos', f: 'cross', g: 'pc', a: p, v, rev: rng.next() < 0.5 ? 1 : 0 }); }
      else if (kinds.includes('crossNot')) out.push({ k: 'neg', f: 'crossNot', g: 'pc', a: p, v, rev: rng.next() < 0.5 ? 1 : 0 });
    }
  }
  return out;
}
function key2(c) { return c.g + ':' + c.k + ':' + c.a + ':' + (Array.isArray(c.v) ? c.v.slice().sort().join('|') : c.v); }
/** One two-attribute case: {np, nc, clues} under the resolved config, or null. */
function composeCase2(rng, d) {
  const n = d.size;
  const kinds = d.kinds;
  for (let attempt = 0; attempt < CASE_ATTEMPTS; attempt++) {
    const np = rng.shuffle([...Array(n).keys()]);
    const nc = rng.shuffle([...Array(n).keys()]);
    const pc = np.map((p, a) => [p, nc[a]]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
    if (isIdentity(np) || isIdentity(nc) || isIdentity(pc)) continue;
    const S = { np, nc };
    const pool = rng.shuffle(trueClues2(rng, S, n, kinds));
    const seedOf = (f, want) => pool.filter((c) => c.f === f).slice(0, want || 0);
    const chosen = [], keys = new Set(), by = {};
    const push = (c) => { chosen.push(c); keys.add(key2(c)); by[c.f] = (by[c.f] || 0) + 1; };
    for (const c of [...seedOf('cross', d.minCross), ...seedOf('either', d.minEither), ...seedOf('holderNot', d.minHolderNot)]) push(c);
    let count = solutions2(chosen, n).length;
    for (const c of pool) {
      if (count === 1) break;
      if (keys.has(key2(c))) continue;
      if (c.f === 'pos' && d.maxPos != null && (by.pos || 0) >= d.maxPos) continue;
      if (c.f === 'holderNot' && d.maxHolderNot != null && (by.holderNot || 0) >= d.maxHolderNot) continue;
      if (c.f === 'either' && d.maxEither != null && (by.either || 0) >= d.maxEither) continue;
      if (c.f === 'cross' && d.maxCross != null && (by.cross || 0) >= d.maxCross) continue;
      push(c);
      count = solutions2(chosen, n).length;
    }
    if (count !== 1) continue;
    let kept = rng.shuffle(chosen);
    for (let i = 0; i < kept.length; i++) {
      const without = kept.filter((_, j) => j !== i);
      if (solutions2(without, n).length === 1) { kept = without; i--; }
    }
    if (kept.length < d.clues[0] || kept.length > d.clues[1]) continue;
    if (quotaFaults2(kept, d).length) continue;
    if (!kept.every((c) => kinds.includes(c.f))) continue;
    const prop = propagate2(kept, n);
    if (!prop || prop.np.join() !== np.join() || prop.nc.join() !== nc.join()) continue;
    return { np, nc, clues: rng.shuffle(kept) };
  }
  return null;
}
function clueHtml2(bankLoc, rng, c, forms, pics1, pics2, n, px) {
  const frames = bankLoc.frames[c.f];
  if (!Array.isArray(frames) || !frames.length) throw new Error(`${ID}: the bank has no ${c.f} frame (a refusal of this kind — drop it from d.kinds)`);
  const frame = rng.pick(frames);
  let slots;
  if (c.g === 'pc') {
    const one = inlinePic(pics1[c.a], c.a, px), two = inlinePic(pics2[c.v], n + c.v, px);
    slots = c.rev ? { pic: two, pic2: one } : { pic: one, pic2: two };
  } else {
    const src = c.g === 'np' ? pics1 : pics2, off = c.g === 'np' ? 0 : n;
    const picIdx = Array.isArray(c.v) ? c.v : [c.v];
    slots = { name: forms[c.a].nom, pic: picIdx.map((j) => inlinePic(src[j], off + j, px)) };
    if (forms[c.a].ade) slots.nameAde = forms[c.a].ade;
  }
  return fillSlots(esc(frame), slots).replace(/(<img[^>]*)margin:0 3px("[^>]*>)(?=[.,;:!?])/g, '$1margin:0 0 0 3px$2');
}
function buildTwoAttr(bankLoc, d, { theme, locale }, ctx, sets) {
  const rng = ctx.rng;
  const loc = (locale || 'en').slice(0, 2);
  const n = d.size;
  if (n !== 3) throw new Error(`${ID} two-attr: size must be 3, got ${n}`);
  if (d.cases !== 1) throw new Error(`${ID} two-attr: the page carries exactly 1 case (cases:${d.cases})`);
  if (!Array.isArray(d.kinds) || !d.kinds.length) throw new Error(`${ID} two-attr: kinds must be a non-empty array`);
  for (const k of d.kinds) if (!TWO_ATTR_KINDS.has(k)) throw new Error(`${ID} two-attr: unknown clue kind "${k}"`);
  if (!d.kinds.includes('cross') && !d.kinds.includes('crossNot')) throw new Error(`${ID} two-attr: kinds must include a linking kind (cross | crossNot) — three grids without a link are three separate puzzles`);
  if (!(d.minCross >= 1) && !(d.minCross == null && d.kinds.length === 1)) throw new Error(`${ID} two-attr: minCross >= 1 is required (every page links the grids)`);
  commonGuards(d, G2_FLOOR);
  if (!(d.inlinePic >= G2_FLOOR)) throw new Error(`${ID} two-attr: inlinePic ${d.inlinePic} < the G2 floor`);
  if (d.answer !== 'none') throw new Error(`${ID} two-attr: the grid IS the answer (answer:'none'), got ${d.answer}`);
  if (!Array.isArray(d.attr2) || !d.attr2.length) throw new Error(`${ID} two-attr: attr2 must list the second-attribute themes in preference order`);
  if (!theme) throw new Error(`${ID}: a theme is required (themeAxis applicable)`);
  const attr2 = d.attr2.find((t) => t !== theme);
  if (!attr2) throw new Error(`${ID} two-attr: no second attribute for theme "${theme}" (attr2 ${JSON.stringify(d.attr2)}) — REFUSED`);
  const names = Array.isArray(bankLoc.names) ? bankLoc.names : [];
  if (names.length < n) throw new Error(`${ID}: ${loc} bank has ${names.length} names < ${n} — REFUSED`);
  for (const k of d.kinds) if (!Array.isArray(bankLoc.frames && bankLoc.frames[k]) || !bankLoc.frames[k].length) throw new Error(`${ID}: ${loc} bank refuses the ${k} frame kind (empty) — drop it from kinds or refuse the face`);
  const A1 = resolveAllow(theme, loc, sets, 6, 'theme');
  const A2 = resolveAllow(attr2, loc, sets, 6, 'second attribute');
  const overlap = A1.allow.filter((k) => A2.allow.includes(k));
  if (overlap.length) throw new Error(`${ID} two-attr: theme "${theme}" and attribute "${attr2}" share pictures (${overlap.join(', ')}) — REFUSED`);
  const bad = confusableSet(sets);
  let cs = null;
  for (let attempt = 0; attempt < PAGE_ATTEMPTS && !cs; attempt++) {
    const nameIdx = rng.sample([...Array(names.length).keys()], n);
    const keys1 = rng.sample(A1.allow, n), keys2 = rng.sample(A2.allow, n);
    if (hasConfusable(keys1.concat(keys2), bad)) continue;
    const puzzle = composeCase2(rng, d);
    if (!puzzle) continue;
    cs = { nameIdx, keys: keys1, keys2, pics: keys1.map((k) => A1.picOf[k]), pics2: keys2.map((k) => A2.picOf[k]), np: puzzle.np, nc: puzzle.nc, clues: puzzle.clues };
  }
  if (!cs) throw new Error(`${ID} two-attr: no page for ${JSON.stringify(d.kinds)} clues ${d.clues} on "${theme}" × "${attr2}" — REFUSED`);
  const forms = cs.nameIdx.map((i) => names[i]);
  const colW = Math.floor((BODY_W - 17) / 2);   // 329
  const rows = cs.clues.map((c, i) => clueRow({ n: i + 1, html: clueHtml2(bankLoc, rng, c, forms, cs.pics, cs.pics2, n, d.inlinePic) }));
  const clueBlock = `<div data-lcs-cluecol style="display:grid;grid-template-columns:${colW}px ${colW}px;column-gap:${BODY_W - 2 * colW}px;row-gap:4px;align-content:start;width:${BODY_W}px">${rows.join('')}</div>`;
  const grid = lGrid({ names: forms.map((f) => ({ label: f.nom })), pics: cs.pics.map((x) => ({ src: x.src, alt: x.alt })), pics2: cs.pics2.map((x) => ({ src: x.src, alt: x.alt })), cell: d.cell, headW: d.headW, hdrH: d.hdrH, namePx: bankLoc.namePx || d.namePx, picPx: d.picPx, puzzle: 0 });
  const stamps = caseStamps(0, n, d.kinds.join(','), cs, forms) + ` data-lcs-pics2="${esc(cs.keys2.join(','))}" data-lcs-nouns2="${esc(cs.pics2.map((x) => x.noun).join(','))}" ` +
    `data-lcs-attr2="${esc(attr2)}" data-lcs-clues='${esc(JSON.stringify(cs.clues))}' data-lcs-solution="np:${cs.np.join(',')};nc:${cs.nc.join(',')}"`;
  const band = `<section data-ws-content ${stamps} style="display:flex;flex-direction:column;gap:${BAND_GAP}px;width:${BODY_W}px;flex:0 0 auto">${clueBlock}` +
    `<div style="display:flex;justify-content:center;width:${BODY_W}px">${grid.html}</div></section>`;
  const cfg = { mode: 'two-attr', size: n, cases: 1, clues: d.clues, kinds: d.kinds, maxPos: d.maxPos ?? null, minCross: d.minCross ?? null, maxCross: d.maxCross ?? null, minEither: d.minEither ?? null, maxEither: d.maxEither ?? null, minHolderNot: d.minHolderNot ?? null, maxHolderNot: d.maxHolderNot ?? null, cell: d.cell, headW: d.headW, hdrH: d.hdrH, picPx: d.picPx, inlinePic: d.inlinePic, answer: 'none', tileInner: d.headW - 20, attr2, colW, floor: G2_FLOOR };
  const bodyHtml = rootHtml(d, theme, cfg, markKey() + `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:${BAND_GAP}px;min-height:0">${band}</div>`, `data-lcs-attr2="${esc(attr2)}" `);
  const meta = { mode: 'two-attr', theme, attr2, cases: [{ names: forms.map((f) => f.nom), pics: cs.keys, pics2: cs.keys2, np: cs.np, nc: cs.nc, clues: cs.clues }], stack: 36 + KEY_GAP + (Math.ceil(cs.clues.length / 2) * 40 + 4 * (Math.ceil(cs.clues.length / 2) - 1)) + BAND_GAP + grid.height };
  return { bodyHtml, meta };
}

/* ---------------- F5 mode:'read' (G2-345) ---------------- */
function truthOf(st, sol) {
  if (st.k === 'has' || st.k === 'holderIs') return sol[st.a] === st.v;
  if (st.k === 'hasNot') return sol[st.a] !== st.v;
  if (st.k === 'either') return Array.isArray(st.v) && st.v.includes(sol[st.a]);
  if (st.k === 'nobody') return false;   // a bijection: every picture belongs to someone
  throw new Error(ID + ': unknown statement kind ' + st.k);
}
/** One read case: {sol, stmts, truth} — `statements` distinct (a,v) pairs, true count within trueRange. */
function composeRead(rng, d) {
  const n = d.size;
  const kinds = d.stmtKinds;
  for (let attempt = 0; attempt < CASE_ATTEMPTS; attempt++) {
    const sol = rng.shuffle([...Array(n).keys()]);
    if (isIdentity(sol)) continue;
    const pairs = [];
    for (let a = 0; a < n; a++) for (let v = 0; v < n; v++) pairs.push([a, v]);
    const pick = rng.shuffle(pairs).slice(0, d.statements);
    let nobody = 0;
    const stmts = pick.map(([a, v]) => {
      const k = rng.pick(kinds);
      if (k === 'nobody') { nobody++; return { k, a: -1, v }; }
      if (k === 'either') { const o = rng.pick([...Array(n).keys()].filter((x) => x !== v)); return { k, a, v: rng.shuffle([v, o]) }; }
      return { k, a, v };
    });
    if (d.maxNobody != null && nobody > d.maxNobody) continue;
    const seen = new Set(stmts.map((s) => s.k));
    if (seen.size < Math.min(2, kinds.length)) continue;
    const truth = stmts.map((s) => (truthOf(s, sol) ? 1 : 0));
    const t = truth.reduce((x, y) => x + y, 0);
    if (t < d.trueRange[0] || t > d.trueRange[1]) continue;
    return { sol, stmts, truth };
  }
  return null;
}
function stmtHtml(bankLoc, rng, st, forms, pics, px) {
  const frames = bankLoc.truth && bankLoc.truth[st.k];
  if (!Array.isArray(frames) || !frames.length) throw new Error(`${ID}: the bank refuses the ${st.k} truth frame (empty) — refuse the read face`);
  const frame = rng.pick(frames);
  const picIdx = Array.isArray(st.v) ? st.v : [st.v];
  const slots = { pic: picIdx.map((j) => inlinePic(pics[j], j, px)) };
  if (st.a >= 0) { slots.name = forms[st.a].nom; if (forms[st.a].ade) slots.nameAde = forms[st.a].ade; }
  return fillSlots(esc(frame), slots).replace(/(<img[^>]*)margin:0 3px("[^>]*>)(?=[.,;:!?])/g, '$1margin:0 0 0 3px$2');
}
function buildRead(bankLoc, d, { theme, locale }, ctx, sets) {
  const rng = ctx.rng;
  const loc = (locale || 'en').slice(0, 2);
  const n = d.size;
  if (n !== 3) throw new Error(`${ID} read: size must be 3, got ${n}`);
  if (d.cases !== 2) throw new Error(`${ID} read: the page carries exactly 2 cases (cases:${d.cases})`);
  if (!(d.statements >= 3 && d.statements <= n * n)) throw new Error(`${ID} read: statements must be 3..${n * n}, got ${d.statements}`);
  if (!Array.isArray(d.stmtKinds) || !d.stmtKinds.length || d.stmtKinds.some((k) => !TRUTH_KINDS.has(k))) throw new Error(`${ID} read: stmtKinds must be within has|hasNot|holderIs|either|nobody`);
  if (!Array.isArray(d.trueRange) || d.trueRange.length !== 2 || !(d.trueRange[0] >= 1 && d.trueRange[1] < d.statements && d.trueRange[1] >= d.trueRange[0])) throw new Error(`${ID} read: trueRange must leave at least one true and one false statement, got ${JSON.stringify(d.trueRange)}`);
  commonGuards(d, G2_FLOOR);
  if (!(d.inlinePic >= G2_FLOOR && d.glyph >= G2_FLOOR)) throw new Error(`${ID} read: inlinePic / glyph below the G2 floor ${G2_FLOOR}`);
  if (d.answer !== 'none') throw new Error(`${ID} read: the glyph pair is the answer (answer:'none'), got ${d.answer}`);
  if (!theme) throw new Error(`${ID}: a theme is required (themeAxis applicable)`);
  const names = Array.isArray(bankLoc.names) ? bankLoc.names : [];
  if (names.length < 2 * n) throw new Error(`${ID}: ${loc} bank has ${names.length} names < ${2 * n} — REFUSED`);
  for (const k of d.stmtKinds) if (!Array.isArray(bankLoc.truth && bankLoc.truth[k]) || !bankLoc.truth[k].length) throw new Error(`${ID}: ${loc} bank refuses the ${k} truth frame (empty) — refuse the read face`);
  const { allow, picOf } = resolveAllow(theme, loc, sets, Math.max(6, 2 * n), 'theme');
  const bad = confusableSet(sets);
  let cases = null;
  for (let attempt = 0; attempt < PAGE_ATTEMPTS && !cases; attempt++) {
    const nameIdx = rng.sample([...Array(names.length).keys()], 2 * n);
    const picKeys = rng.sample(allow, 2 * n);
    const parts = [];
    let ok = true;
    for (let p = 0; p < 2; p++) {
      const keys = picKeys.slice(p * n, (p + 1) * n);
      if (hasConfusable(keys, bad)) { ok = false; break; }
      const r = composeRead(rng, d);
      if (!r) { ok = false; break; }
      parts.push({ nameIdx: nameIdx.slice(p * n, (p + 1) * n), keys, pics: keys.map((k) => picOf[k]), sol: r.sol, stmts: r.stmts, truth: r.truth });
    }
    if (ok) { const seen = new Set(parts.flatMap((x) => x.stmts.map((s) => s.k))); if (!d.stmtKinds.every((k) => seen.has(k))) ok = false; }   // every configured kind appears on the page
    if (ok) cases = parts;
  }
  if (!cases) throw new Error(`${ID} read: no page for ${JSON.stringify(d.stmtKinds)} on "${theme}" — REFUSED`);
  const gridW = d.headW + n * d.cell, gridH = d.hdrH + n * d.cell;
  const stmtW = BODY_W - gridW - COL_GAP;
  const bands = cases.map((cs, p) => {
    const forms = cs.nameIdx.map((i) => names[i]);
    const rows = cs.stmts.map((st, i) => statementRow({ n: i + 1, html: stmtHtml(bankLoc, rng, st, forms, cs.pics, d.inlinePic), glyph: d.glyph }));
    const col = `<div data-lcs-stmtcol style="display:flex;flex-direction:column;gap:6px;width:${stmtW}px">${rows.join('')}</div>`;
    const grid = logicGrid({ rows: forms.map((f) => ({ label: f.nom })), cols: cs.pics.map((x) => ({ src: x.src, alt: x.alt })), cell: d.cell, headW: d.headW, hdrH: d.hdrH, namePx: bankLoc.namePx || d.namePx, picPx: d.picPx, mode: 'solved', solved: cs.sol, puzzle: p });
    const stamps = caseStamps(p, n, d.stmtKinds.join(','), cs, forms) + ` data-lcs-solved="${cs.sol.join(',')}" data-lcs-stmts='${esc(JSON.stringify(cs.stmts))}' data-lcs-truth="${cs.truth.join(',')}"`;
    return `<section data-ws-content ${stamps} style="display:grid;grid-template-columns:${stmtW}px ${gridW}px;gap:${COL_GAP}px;align-items:start;width:${BODY_W}px;flex:0 0 auto">${col}${grid.html}</section>`;
  });
  const cfg = { mode: 'read', size: n, statements: d.statements, stmtKinds: d.stmtKinds, trueRange: d.trueRange, maxNobody: d.maxNobody ?? null, cell: d.cell, headW: d.headW, hdrH: d.hdrH, picPx: d.picPx, inlinePic: d.inlinePic, glyph: d.glyph, answer: 'none', tileInner: d.headW - 20, bandMax: d.statements * 63 + 6 * (d.statements - 1), floor: G2_FLOOR };
  // no markKey: the child circles a glyph beside each statement and marks no cell; the legend's crossing rule does not apply,
  // and its 36 + 12 px would push the all-two-line worst case (2 × 337 + 20 = 694) past the 700 chrome (measured, _work/G2-319-faces.md)
  const bodyHtml = rootHtml(d, theme, cfg, `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${BAND_GAP}px;min-height:0">${bands.join('')}</div>`);
  const meta = { mode: 'read', theme, cases: cases.map((cs) => ({ names: cs.nameIdx.map((i) => names[i].nom), pics: cs.keys, solution: cs.sol, stmts: cs.stmts, truth: cs.truth })), stack: 2 * Math.max(gridH, d.statements * 40 + 6 * (d.statements - 1)) + BAND_GAP };
  return { bodyHtml, meta };
}

/* ---------------- verify (browser) for the three faces: stamps only, own solvers ---------------- */
function verifyFaceInPage(SETS) {
  const fails = [];
  const root = document.querySelector('[data-lcs-type="G2-319"]');
  if (!root) return ['no G2-319 root'];
  const mode = root.dataset.lcsMode;
  if (root.dataset.lcsFace !== mode) fails.push(`data-lcs-face "${root.dataset.lcsFace}" ≠ data-lcs-mode "${mode}"`);
  let cfg;
  try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['cfg stamp does not parse']; }
  if (cfg.mode !== mode) fails.push(`cfg.mode ${cfg.mode} ≠ the stamped mode ${mode}`);
  const theme = root.dataset.lcsTheme;
  const allow = SETS.distinct[theme];
  if (!Array.isArray(allow)) fails.push(`theme "${theme}" has no allowlist`);
  const bad = new Set((SETS.confusable || []).map(([a, b]) => [a, b].sort().join('|')));
  const footTop = (document.querySelector('.ws-foot') || { getBoundingClientRect: () => ({ top: Infinity }) }).getBoundingClientRect().top;
  const floor = cfg.floor || 36;
  const perms = (n) => { const out = []; const rec = (rest, acc) => { if (!rest.length) { out.push(acc); return; } rest.forEach((x, i) => rec(rest.filter((_, j) => j !== i), acc.concat(x))); }; rec([...Array(n).keys()], []); return out; };
  const isId = (s) => s.every((v, i) => v === i);
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
  // two-attribute: own copies
  const holds2 = (c, S) => { if (c.g === 'np' || c.g === 'nc') { const v = S[c.g][c.a]; return c.k === 'neg' ? v !== c.v : c.k === 'either' ? (Array.isArray(c.v) && c.v.includes(v)) : v === c.v; } if (c.g === 'pc') { const a = S.np.indexOf(c.a); const has = S.nc[a] === c.v; return c.k === 'neg' ? !has : has; } fails.push('unknown clue grid ' + c.g); return false; };
  const sols2 = (clues, n) => { const P = perms(n); const out = []; for (const np of P) for (const nc of P) if (clues.every((c) => holds2(c, { np, nc }))) out.push({ np, nc }); return out; };
  const propagate2 = (clues, n) => {
    const mk = () => [...Array(n)].map(() => Array(n).fill(true));
    const O = { np: mk(), nc: mk(), pc: mk() };
    const close = (g, r, c) => { if (O[g][r][c]) { O[g][r][c] = false; return true; } return false; };
    const fix = (g, r, c) => { let ch = false; for (let j = 0; j < n; j++) if (j !== c) ch = close(g, r, j) || ch; for (let i = 0; i < n; i++) if (i !== r) ch = close(g, i, c) || ch; return ch; };
    for (const c of clues) { if (c.k === 'neg') close(c.g, c.a, c.v); else if (c.k === 'pos') fix(c.g, c.a, c.v); else if (c.k === 'either') { for (let j = 0; j < n; j++) if (!c.v.includes(j)) close(c.g, c.a, j); } }
    const single = (g) => { const F = Array(n).fill(-1); for (let r = 0; r < n; r++) { const js = []; for (let j = 0; j < n; j++) if (O[g][r][j]) js.push(j); if (js.length === 1) F[r] = js[0]; } return F; };
    let changed = true, guard = 0;
    while (changed && guard++ < 200) {
      changed = false;
      for (const g of ['np', 'nc', 'pc']) {
        for (let r = 0; r < n; r++) { const js = []; for (let j = 0; j < n; j++) if (O[g][r][j]) js.push(j); if (!js.length) return null; if (js.length === 1) changed = fix(g, r, js[0]) || changed; }
        for (let j = 0; j < n; j++) { const is = []; for (let r = 0; r < n; r++) if (O[g][r][j]) is.push(r); if (!is.length) return null; if (is.length === 1) changed = fix(g, is[0], j) || changed; }
      }
      const Fnp = single('np'), Fnc = single('nc'), Fpc = single('pc');
      for (let a = 0; a < n; a++) if (Fnp[a] >= 0) { const p = Fnp[a]; for (let c = 0; c < n; c++) { if (!O.nc[a][c]) changed = close('pc', p, c) || changed; if (!O.pc[p][c]) changed = close('nc', a, c) || changed; } }
      for (let a = 0; a < n; a++) if (Fnc[a] >= 0) { const c = Fnc[a]; for (let p = 0; p < n; p++) { if (!O.np[a][p]) changed = close('pc', p, c) || changed; if (!O.pc[p][c]) changed = close('np', a, p) || changed; } }
      for (let p = 0; p < n; p++) if (Fpc[p] >= 0) { const c = Fpc[p]; for (let a = 0; a < n; a++) { if (!O.np[a][p]) changed = close('nc', a, c) || changed; if (!O.nc[a][c]) changed = close('np', a, p) || changed; } }
    }
    const np = single('np'), nc = single('nc');
    return np.every((x) => x >= 0) && nc.every((x) => x >= 0) ? { np, nc } : null;
  };
  const truthOf = (st, sol) => (st.k === 'has' || st.k === 'holderIs') ? sol[st.a] === st.v : st.k === 'hasNot' ? sol[st.a] !== st.v : st.k === 'either' ? (Array.isArray(st.v) && st.v.includes(sol[st.a])) : st.k === 'nobody' ? false : (fails.push('unknown statement kind ' + st.k), false);

  const key = root.querySelector('.ws-logic-markkey');
  if (mode === 'read') { if (key) fails.push('read: a markKey on a face that marks no cell (the budget has no room for it)'); }
  else if (!key) fails.push('no markKey');
  else if (key.querySelector('[data-lcs-cell],[data-lcs-solution],[data-lcs-clues],[data-lcs-answer],[data-lcs-mark]')) fails.push('the markKey carries ground truth');

  const cases = [...root.querySelectorAll('section[data-lcs-puzzle]')];
  const wantCases = mode === 'two-attr' ? 1 : 2;
  if (cases.length !== wantCases) fails.push(`${cases.length} cases, want ${wantCases}`);
  const seenNames = new Set(), seenPics = new Set();

  // shared per-case checks: stamps, names / pictures, the grid apparatus (header pictures + tiles), empty cells
  const readCase = (sec, p) => {
    const P = `case ${p + 1}`;
    const n = +sec.dataset.lcsSize;
    if (n !== cfg.size) fails.push(`${P}: size ${n} ≠ cfg ${cfg.size}`);
    const nameIdx = (sec.dataset.lcsNames || '').split(',').filter(Boolean).map(Number);
    const pics = (sec.dataset.lcsPics || '').split(',').filter(Boolean);
    const nouns = (sec.dataset.lcsNouns || '').split(',').filter(Boolean);
    let forms = [];
    try { forms = JSON.parse(sec.dataset.lcsForms); } catch (e) { fails.push(`${P}: forms stamp does not parse`); }
    if (nameIdx.length !== n || new Set(nameIdx).size !== n) fails.push(`${P}: names stamp is not ${n} distinct indices`);
    if (pics.length !== n || new Set(pics).size !== n) fails.push(`${P}: pics stamp is not ${n} distinct keys`);
    if (forms.length !== n) fails.push(`${P}: ${forms.length} name forms for ${n} rows`);
    nameIdx.forEach((i) => { if (seenNames.has(i)) fails.push(`${P}: name ${i} is shared by both cases`); seenNames.add(i); });
    pics.forEach((k) => { if (seenPics.has(k)) fails.push(`${P}: picture ${k} is shared by both cases`); seenPics.add(k); });
    if (Array.isArray(allow)) pics.forEach((k) => { if (!allow.includes(k)) fails.push(`${P}: picture "${k}" is not in the ${theme} allowlist`); });
    for (let i = 0; i < pics.length; i++) for (let j = i + 1; j < pics.length; j++) if (bad.has([pics[i], pics[j]].sort().join('|'))) fails.push(`${P}: confusable pair ${pics[i]} / ${pics[j]} in one case`);
    const grid = sec.querySelector('[data-lcs-grid]');
    if (!grid) { fails.push(`${P}: no grid`); return null; }
    const cells = [...grid.querySelectorAll('[data-lcs-cell]')];
    cells.forEach((c) => {
      if (c.children.length || c.textContent.trim() || c.getAttribute('class') || c.hasAttribute('data-lcs-mark')) fails.push(`${P}: cell ${c.dataset.lcsCell} is not empty (answer printed)`);
      const r = c.getBoundingClientRect();
      if (r.width < cfg.cell - 0.6 || r.height < cfg.cell - 0.6) fails.push(`${P}: cell ${c.dataset.lcsCell} renders ${r.width.toFixed(1)}×${r.height.toFixed(1)} < ${cfg.cell}`);
      if (r.width < floor || r.height < floor) fails.push(`${P}: cell below the floor ${floor}`);
    });
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
    const headSrc = [];
    const gb = grid.getBoundingClientRect();
    heads.forEach((im) => {
      const j = +im.dataset.lcsCol;
      headSrc[j] = im.src;
      if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: header picture ${j} broken`);
      const r = im.getBoundingClientRect();
      if (r.width < cfg.picPx - 0.6 || r.height < cfg.picPx - 0.6) fails.push(`${P}: header picture ${j} ${r.width.toFixed(0)} < ${cfg.picPx}`);
      if (r.left < gb.left - 0.6 || r.right > gb.right + 0.6 || r.top < gb.top - 0.6 || r.bottom > gb.bottom + 0.6) fails.push(`${P}: header picture ${j} outside the grid box`);
      if (j < n && nouns[j]) { const base = decodeURIComponent(im.src.split('/').pop()); if (!base.startsWith(nouns[j] + '@') && base !== nouns[j] + '.webp') fails.push(`${P}: header picture ${j} file "${base}" ≠ stamped noun "${nouns[j]}"`); }
    });
    if (gb.bottom > footTop + 0.6) fails.push(`${P}: grid below the footer`);
    const sb = sec.getBoundingClientRect();
    if (sb.bottom > footTop + 0.6) fails.push(`${P}: band below the footer`);
    if (sb.width > 675.6) fails.push(`${P}: band ${sb.width.toFixed(0)} wider than 675`);
    return { P, n, nameIdx, pics, nouns, forms, grid, cells, headSrc, gb, sb };
  };

  cases.forEach((sec, p) => {
    const C = readCase(sec, p);
    if (!C) return;
    const { P, n, forms, grid, cells, headSrc, gb } = C;

    /* ---- F3 picture ---- */
    if (mode === 'picture') {
      let clues = [];
      try { clues = JSON.parse(sec.dataset.lcsClues); } catch (e) { fails.push(`${P}: clues stamp does not parse`); return; }
      const sol = (sec.dataset.lcsSolution || '').split(',').filter(Boolean).map(Number);
      if (sol.length !== n || new Set(sol).size !== n) fails.push(`${P}: solution is not a permutation of ${n}`);
      if (sol.length === n && isId(sol)) fails.push(`${P}: the solution is the identity (a diagonal leak)`);
      if (grid.dataset.lcsMode !== 'blank') fails.push(`${P}: grid mode ${grid.dataset.lcsMode} (picture = blank)`);
      if (cells.length !== n * n) fails.push(`${P}: ${cells.length} cells, want ${n * n}`);
      if (grid.querySelector('[data-lcs-mark]')) fails.push(`${P}: a mark is printed on the grid`);
      if (!clues.length) fails.push(`${P}: no clues`);
      if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) fails.push(`${P}: ${clues.length} clues outside ${cfg.clues[0]}..${cfg.clues[1]}`);
      const by = {};
      clues.forEach((c, i) => {
        by[c.f] = (by[c.f] || 0) + 1;
        if (!cfg.kinds.includes(c.f)) fails.push(`${P}: clue ${i + 1} kind "${c.f}" outside cfg kinds`);
        if (c.f !== 'neg' && c.f !== 'pos') fails.push(`${P}: clue ${i + 1} kind "${c.f}" is not a picture-clue kind (neg | pos)`);
        if (c.k !== c.f) fails.push(`${P}: clue ${i + 1} frame ${c.f} carries constraint ${c.k}`);
        if (!(c.a >= 0 && c.a < n && c.v >= 0 && c.v < n)) fails.push(`${P}: clue ${i + 1} out of range`);
        if (sol.length === n && !holds(c, sol)) fails.push(`${P}: clue ${i + 1} is FALSE for the stamped solution`);
      });
      if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) fails.push(`${P}: ${by.pos} pos clues > maxPos ${cfg.maxPos}`);
      const all = sols(clues, n);
      if (all.length !== 1) fails.push(`${P}: ${all.length} solutions satisfy the clues (want exactly one)`);
      else if (all[0].join(',') !== sol.join(',')) fails.push(`${P}: the unique solution ${all[0]} ≠ the stamp ${sol}`);
      clues.forEach((_, i) => { if (sols(clues.filter((__, j) => j !== i), n).length < 2) fails.push(`${P}: clue ${i + 1} is redundant`); });
      const prop = propagate(clues, n);
      if (!prop || prop.join(',') !== sol.join(',')) fails.push(`${P}: row/column propagation does not reach the solution`);
      // the clue block: name tiles + rings, NO sentence
      const col = sec.querySelector('[data-lcs-cluecol]');
      if (!col) { fails.push(`${P}: no clue block`); return; }
      if (col.querySelector('p, [data-lcs-clue-text], span[style*="font-size:18px"]')) fails.push(`${P}: a sentence element in the picture-clue block`);
      const names = new Set(forms.map((f) => f.nom));
      const walker = document.createTreeWalker(col, NodeFilter.SHOW_TEXT);
      let tn; while ((tn = walker.nextNode())) { const t = tn.textContent.trim(); if (t && !names.has(t)) fails.push(`${P}: text "${t.slice(0, 30)}" in the picture-clue block is not a case name (no sentence, no noun)`); }
      const rows = [...col.querySelectorAll('[data-lcs-clue]')];
      if (rows.length !== clues.length) fails.push(`${P}: ${rows.length} clue rows for ${clues.length} stamped clues`);
      let hasN = 0;
      rows.forEach((row) => {
        const i = +row.dataset.lcsClue;
        const c = clues[i];
        if (!c) { fails.push(`${P}: row ${i} has no stamped clue`); return; }
        const not = row.hasAttribute('data-lcs-not'), has = row.hasAttribute('data-lcs-has');
        if (not === has) fails.push(`${P}: row ${i + 1} must carry exactly one of data-lcs-not / data-lcs-has`);
        if ((c.k === 'neg') !== not) fails.push(`${P}: row ${i + 1} pictogram ${not ? 'not' : 'has'} ≠ the stamped ${c.k}`);
        if (has) hasN++;
        const tile = row.querySelector('[data-lcs-nametile]');
        if (!tile || tile.textContent.trim() !== forms[c.a].nom) fails.push(`${P}: row ${i + 1} name tile "${tile && tile.textContent}" ≠ "${forms[c.a].nom}"`);
        const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
        if (imgs.length !== 1) fails.push(`${P}: row ${i + 1} shows ${imgs.length} pictures, want 1`);
        imgs.forEach((im) => {
          if (+im.dataset.lcsPic !== c.v) fails.push(`${P}: row ${i + 1} picture is column ${im.dataset.lcsPic}, stamped ${c.v}`);
          if (headSrc[c.v] !== undefined && im.src !== headSrc[c.v]) fails.push(`${P}: row ${i + 1} picture src ≠ the header picture of column ${c.v}`);
          if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: row ${i + 1} picture broken`);
          const r = im.getBoundingClientRect();
          if (r.width < floor) fails.push(`${P}: row ${i + 1} picture ${r.width.toFixed(0)} < the G1 floor ${floor}`);
        });
        const ring = row.querySelector('[data-lcs-ring]');
        const rb = ring && ring.getBoundingClientRect();
        if (!ring || rb.width < cfg.ring - 0.6) fails.push(`${P}: row ${i + 1} ring ${rb ? rb.width.toFixed(0) : 'missing'} < ${cfg.ring}`);
        if (not && !row.querySelector('[data-lcs-notmark]')) fails.push(`${P}: row ${i + 1} is a not-clue without the crossed-out mark`);
        if (!not && row.querySelector('[data-lcs-notmark]')) fails.push(`${P}: row ${i + 1} is a has-clue with a crossed-out mark`);
        const rr = row.getBoundingClientRect();
        if (rr.height > 66) fails.push(`${P}: row ${i + 1} ${rr.height.toFixed(0)} px > 66`);
        if (rr.bottom > footTop + 0.6) fails.push(`${P}: row ${i + 1} below the footer`);
      });
      if (hasN > 1) fails.push(`${P}: ${hasN} has-clues (> 1)`);
      if (col.scrollHeight > gb.height + 0.6) fails.push(`${P}: clue block ${col.scrollHeight} taller than the grid ${gb.height.toFixed(0)}`);
      // the stacked answer strip
      const slots = [...sec.querySelectorAll('[data-lcs-answer-slot]')];
      if (slots.length !== n) fails.push(`${P}: ${slots.length} answer chips, want ${n}`);
      slots.forEach((ch) => {
        const r = +ch.dataset.lcsAnswerSlot;
        if (ch.hasAttribute('data-lcs-answer') || ch.querySelector('[data-lcs-answer],[data-lcs-mark],svg,circle')) fails.push(`${P}: answer chip ${r} carries a mark / ring / answer`);
        const nameEl = ch.querySelector('span');
        if (!nameEl || nameEl.textContent.trim() !== (forms[r] && forms[r].nom)) fails.push(`${P}: answer chip ${r} name ≠ "${forms[r] && forms[r].nom}"`);
        const imgs = [...ch.querySelectorAll('img')];
        if (imgs.length !== n) fails.push(`${P}: answer chip ${r} shows ${imgs.length} pictures, want ${n}`);
        imgs.forEach((im, j) => {
          if (headSrc[j] !== undefined && im.src !== headSrc[j]) fails.push(`${P}: answer chip ${r} picture ${j} is not column ${j} (order leaks or a wrong picture)`);
          if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: answer chip ${r} picture ${j} broken`);
          const b = im.getBoundingClientRect();
          if (b.width < cfg.bankPic - 0.6 || b.width < floor) fails.push(`${P}: answer chip picture ${b.width.toFixed(0)} < ${Math.max(cfg.bankPic, floor)}`);
        });
        const cb = ch.getBoundingClientRect();
        [...ch.querySelectorAll('img,span')].forEach((el) => { const b = el.getBoundingClientRect(); if (b.width && (b.left < cb.left - 0.6 || b.right > cb.right + 0.6 || b.top < cb.top - 0.6 || b.bottom > cb.bottom + 0.6)) fails.push(`${P}: answer chip ${r} content outside the chip`); });
        if (cb.bottom > footTop + 0.6) fails.push(`${P}: answer strip below the footer`);
      });
    }

    /* ---- F4 two-attr ---- */
    if (mode === 'two-attr') {
      let clues = [];
      try { clues = JSON.parse(sec.dataset.lcsClues); } catch (e) { fails.push(`${P}: clues stamp does not parse`); return; }
      const attr2 = sec.dataset.lcsAttr2;
      if (attr2 !== cfg.attr2 || root.dataset.lcsAttr2 !== attr2) fails.push(`${P}: attr2 stamps disagree (${attr2} / ${cfg.attr2} / ${root.dataset.lcsAttr2})`);
      if (attr2 === theme) fails.push(`${P}: the second attribute equals the theme`);
      const allow2 = SETS.distinct[attr2];
      if (!Array.isArray(allow2)) fails.push(`${P}: attribute "${attr2}" has no allowlist`);
      const pics2 = (sec.dataset.lcsPics2 || '').split(',').filter(Boolean);
      const nouns2 = (sec.dataset.lcsNouns2 || '').split(',').filter(Boolean);
      if (pics2.length !== n || new Set(pics2).size !== n) fails.push(`${P}: pics2 stamp is not ${n} distinct keys`);
      if (Array.isArray(allow2)) pics2.forEach((k) => { if (!allow2.includes(k)) fails.push(`${P}: picture "${k}" is not in the ${attr2} allowlist`); });
      const all6 = C.pics.concat(pics2);
      if (new Set(all6).size !== all6.length) fails.push(`${P}: a picture appears in both attributes`);
      for (let i = 0; i < all6.length; i++) for (let j = i + 1; j < all6.length; j++) if (bad.has([all6[i], all6[j]].sort().join('|'))) fails.push(`${P}: confusable pair ${all6[i]} / ${all6[j]} on one page`);
      const m = /^np:([\d,]+);nc:([\d,]+)$/.exec(sec.dataset.lcsSolution || '');
      if (!m) { fails.push(`${P}: solution stamp "${sec.dataset.lcsSolution}" is not np:…;nc:…`); return; }
      const S = { np: m[1].split(',').map(Number), nc: m[2].split(',').map(Number) };
      for (const g of ['np', 'nc']) { if (S[g].length !== n || new Set(S[g]).size !== n) fails.push(`${P}: ${g} is not a permutation of ${n}`); if (S[g].length === n && isId(S[g])) fails.push(`${P}: ${g} is the identity (a diagonal leak)`); }
      const pc = S.np.map((p, a) => [p, S.nc[a]]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
      if (pc.length === n && isId(pc)) fails.push(`${P}: the derived pc grid is the identity (a diagonal leak)`);
      if (grid.dataset.lcsMode !== 'blank') fails.push(`${P}: grid mode ${grid.dataset.lcsMode}`);
      if (grid.dataset.lcsLgrid !== 'np,nc,pc') fails.push(`${P}: the grid is not the three-body lGrid`);
      if (cells.length !== 3 * n * n) fails.push(`${P}: ${cells.length} cells, want ${3 * n * n}`);
      for (const g of ['np', 'nc', 'pc']) { const k = cells.filter((c) => c.dataset.lcsBody === g).length; if (k !== n * n) fails.push(`${P}: body ${g} has ${k} cells`); }
      if (grid.querySelector('[data-lcs-mark]')) fails.push(`${P}: a mark is printed on the grid`);
      // header pictures: n attr-1 + n attr-2 across the top, the same n attr-2 down the pc rows (same order)
      if (Object.keys(headSrc).length !== 2 * n) fails.push(`${P}: ${Object.keys(headSrc).length} header pictures, want ${2 * n}`);
      const rowPics = [...grid.querySelectorAll('img[data-lcs-rowpic]')];
      if (rowPics.length !== n) fails.push(`${P}: ${rowPics.length} pc row pictures, want ${n}`);
      rowPics.forEach((im) => {
        const k = +im.dataset.lcsRowpic;
        if (im.src !== headSrc[n + k]) fails.push(`${P}: pc row picture ${k} ≠ the attr-2 header picture ${k}`);
        if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: pc row picture ${k} broken`);
        const r = im.getBoundingClientRect(); if (r.width < cfg.picPx - 0.6) fails.push(`${P}: pc row picture ${k} ${r.width.toFixed(0)} < ${cfg.picPx}`);
      });
      for (let j = 0; j < n; j++) { const base = headSrc[n + j] ? decodeURIComponent(headSrc[n + j].split('/').pop()) : ''; if (nouns2[j] && !base.startsWith(nouns2[j] + '@') && base !== nouns2[j] + '.webp') fails.push(`${P}: attr-2 header ${j} file "${base}" ≠ stamped noun "${nouns2[j]}"`); }
      // the logic
      if (!clues.length) fails.push(`${P}: no clues`);
      if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) fails.push(`${P}: ${clues.length} clues outside ${cfg.clues[0]}..${cfg.clues[1]}`);
      const by = {};
      clues.forEach((c, i) => {
        by[c.f] = (by[c.f] || 0) + 1;
        if (!cfg.kinds.includes(c.f)) fails.push(`${P}: clue ${i + 1} kind "${c.f}" outside cfg kinds`);
        const kOf = { neg: 'neg', holderNot: 'neg', pos: 'pos', either: 'either', cross: 'pos', crossNot: 'neg' }[c.f];
        if (kOf !== c.k) fails.push(`${P}: clue ${i + 1} frame ${c.f} carries constraint ${c.k}`);
        if (!['np', 'nc', 'pc'].includes(c.g)) fails.push(`${P}: clue ${i + 1} grid "${c.g}"`);
        if ((c.f === 'cross' || c.f === 'crossNot') !== (c.g === 'pc')) fails.push(`${P}: clue ${i + 1} ${c.f} on grid ${c.g}`);
        const vs = Array.isArray(c.v) ? c.v : [c.v];
        if (!(c.a >= 0 && c.a < n) || vs.some((v) => !(v >= 0 && v < n))) fails.push(`${P}: clue ${i + 1} out of range`);
        if (!holds2(c, S)) fails.push(`${P}: clue ${i + 1} is FALSE for the stamped solution`);
      });
      if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) fails.push(`${P}: ${by.pos} pos clues > maxPos ${cfg.maxPos}`);
      if (cfg.minCross != null && (by.cross || 0) < cfg.minCross) fails.push(`${P}: ${by.cross || 0} cross clues < minCross ${cfg.minCross}`);
      if (cfg.maxCross != null && (by.cross || 0) > cfg.maxCross) fails.push(`${P}: cross > maxCross`);
      if (cfg.minEither != null && (by.either || 0) < cfg.minEither) fails.push(`${P}: either < minEither`);
      if (cfg.maxEither != null && (by.either || 0) > cfg.maxEither) fails.push(`${P}: either > maxEither`);
      if (cfg.minHolderNot != null && (by.holderNot || 0) < cfg.minHolderNot) fails.push(`${P}: holderNot < minHolderNot`);
      if (cfg.maxHolderNot != null && (by.holderNot || 0) > cfg.maxHolderNot) fails.push(`${P}: holderNot > maxHolderNot`);
      if (!clues.some((c) => c.g === 'pc')) fails.push(`${P}: no linking clue (g:'pc') — the grids are not connected`);
      const all = sols2(clues, n);
      if (all.length !== 1) fails.push(`${P}: ${all.length} states satisfy the clues (want exactly one)`);
      else if (all[0].np.join() !== S.np.join() || all[0].nc.join() !== S.nc.join()) fails.push(`${P}: the unique state ≠ the stamp`);
      clues.forEach((_, i) => { if (sols2(clues.filter((__, j) => j !== i), n).length < 2) fails.push(`${P}: clue ${i + 1} is redundant`); });
      const prop = propagate2(clues, n);
      if (!prop || prop.np.join() !== S.np.join() || prop.nc.join() !== S.nc.join()) fails.push(`${P}: propagation with the copy rule does not reach the solution (unique only by case-splitting)`);
      // the rendered clues (two columns)
      const rows = [...sec.querySelectorAll('[data-lcs-clue]')];
      if (rows.length !== clues.length) fails.push(`${P}: ${rows.length} clue rows for ${clues.length} stamped clues`);
      rows.forEach((row) => {
        const i = +row.dataset.lcsClue; const c = clues[i];
        if (!c) { fails.push(`${P}: row ${i} has no stamped clue`); return; }
        const txt = row.textContent.replace(/\s+/g, ' ');
        if (c.g !== 'pc') { const f = forms[c.a] || {}; const lit = c.f === 'holderNot' ? f.nom : (f.ade || f.nom); if (!lit || !txt.includes(lit)) fails.push(`${P}: clue ${i + 1} lacks the stamped name literal "${lit}"`); }
        else forms.forEach((f) => { if (txt.includes(f.nom)) fails.push(`${P}: linking clue ${i + 1} names a child ("${f.nom}") — a cross clue links two pictures only`); });
        const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
        let want;
        if (c.g === 'pc') want = c.rev ? [n + c.v, c.a] : [c.a, n + c.v];
        else want = (Array.isArray(c.v) ? c.v : [c.v]).map((v) => (c.g === 'np' ? v : n + v));
        if (imgs.length !== want.length) fails.push(`${P}: clue ${i + 1} shows ${imgs.length} pictures, the stamp names ${want.length}`);
        imgs.forEach((im, q) => {
          const j = +im.dataset.lcsPic;
          if (j !== want[q]) fails.push(`${P}: clue ${i + 1} picture ${q} is column ${j}, stamped ${want[q]}`);
          if (headSrc[j] !== undefined && im.src !== headSrc[j]) fails.push(`${P}: clue ${i + 1} picture ${q} src ≠ the header picture of column ${j}`);
          if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: clue ${i + 1} picture broken`);
          const r = im.getBoundingClientRect(); if (r.width < cfg.inlinePic - 0.6) fails.push(`${P}: clue ${i + 1} picture ${r.width.toFixed(0)} < ${cfg.inlinePic}`);
        });
        const rr = row.getBoundingClientRect();
        if (rr.height > 66) fails.push(`${P}: clue ${i + 1} row ${rr.height.toFixed(0)} px > 66`);
        if (rr.width > cfg.colW + 0.6) fails.push(`${P}: clue ${i + 1} wider than its column ${cfg.colW}`);
        [...row.querySelectorAll('img, span')].forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > rr.right + 0.6 || r.left < rr.left - 0.6)) fails.push(`${P}: clue ${i + 1} content outside the row`); });
      });
      const col = sec.querySelector('[data-lcs-cluecol]');
      if (col) { const cb = col.getBoundingClientRect(); if (cb.height > 196.6) fails.push(`${P}: clue block ${cb.height.toFixed(0)} > 196 (three rows of two lines)`); if (col.scrollWidth > col.clientWidth + 1) fails.push(`${P}: clue block wider than the body`); }
      if (sec.querySelector('[data-lcs-answer-slot]')) fails.push(`${P}: answer chips on a grid-is-the-answer page`);
    }

    /* ---- F5 read ---- */
    if (mode === 'read') {
      let stmts = [];
      try { stmts = JSON.parse(sec.dataset.lcsStmts); } catch (e) { fails.push(`${P}: statements stamp does not parse`); return; }
      const sol = (sec.dataset.lcsSolved || '').split(',').filter(Boolean).map(Number);
      const truth = (sec.dataset.lcsTruth || '').split(',').filter(Boolean).map(Number);
      if (sol.length !== n || new Set(sol).size !== n || sol.some((v) => !(v >= 0 && v < n))) fails.push(`${P}: solved stamp is not a permutation of ${n}`);
      if (sol.length === n && isId(sol)) fails.push(`${P}: the solved grid is the identity (a diagonal)`);
      if (grid.dataset.lcsMode !== 'solved') fails.push(`${P}: grid mode ${grid.dataset.lcsMode} (read = solved)`);
      if (cells.length !== n * n) fails.push(`${P}: ${cells.length} cells, want ${n * n}`);
      // the printed marks form exactly the solved permutation
      const marks = [...grid.querySelectorAll('[data-lcs-mark]')];
      if (marks.length !== n * n) fails.push(`${P}: ${marks.length} marks, want ${n * n}`);
      const seenCell = new Set();
      marks.forEach((mk) => {
        const m = /^(\d+):(\d+):(\d+)$/.exec(mk.dataset.lcsMarkCell || '');
        if (!m || +m[1] !== p) { fails.push(`${P}: mark cell stamp ${mk.dataset.lcsMarkCell} malformed`); return; }
        const r = +m[2], c = +m[3];
        if (seenCell.has(r + ':' + c)) fails.push(`${P}: two marks in cell ${r}:${c}`); seenCell.add(r + ':' + c);
        const want = sol[r] === c ? '1' : '0';
        if (mk.dataset.lcsMark !== want) fails.push(`${P}: cell ${r}:${c} prints ${mk.dataset.lcsMark === '1' ? '✓' : '✗'}, the solved grid says ${want === '1' ? '✓' : '✗'}`);
        const path = mk.querySelector('path');
        if (!path) fails.push(`${P}: mark ${r}:${c} has no path`);
        else { const st = (path.getAttribute('stroke') || '').toUpperCase(); if (want === '1' ? st !== '#146B5E' : st !== '#F2784B') fails.push(`${P}: mark ${r}:${c} colour ${st} ≠ its meaning`); }
      });
      // the statements
      if (stmts.length !== cfg.statements) fails.push(`${P}: ${stmts.length} statements, want ${cfg.statements}`);
      if (truth.length !== stmts.length) fails.push(`${P}: truth stamp has ${truth.length} entries for ${stmts.length} statements`);
      const keys = new Set(), pairs = new Set();
      let nobody = 0;
      stmts.forEach((st, i) => {
        if (!cfg.stmtKinds.includes(st.k)) fails.push(`${P}: statement ${i + 1} kind "${st.k}" outside cfg`);
        if (st.k === 'nobody') nobody++;
        const vs = Array.isArray(st.v) ? st.v : [st.v];
        if ((st.k !== 'nobody' && !(st.a >= 0 && st.a < n)) || vs.some((v) => !(v >= 0 && v < n))) fails.push(`${P}: statement ${i + 1} out of range`);
        const key = st.k + ':' + st.a + ':' + vs.slice().sort().join('|');
        if (keys.has(key)) fails.push(`${P}: statement ${i + 1} repeats an earlier statement`); keys.add(key);
        if (st.k !== 'nobody' && st.k !== 'either') { const pr = st.a + ':' + st.v; if (pairs.has(pr)) fails.push(`${P}: statement ${i + 1} re-uses the (child, picture) pair ${pr}`); pairs.add(pr); }
        if (sol.length === n && truth[i] !== undefined && (truthOf(st, sol) ? 1 : 0) !== truth[i]) fails.push(`${P}: statement ${i + 1} stamped ${truth[i] ? 'true' : 'false'} but re-evaluates ${truthOf(st, sol) ? 'true' : 'false'}`);
      });
      const t = truth.reduce((x, y) => x + y, 0);
      if (t < cfg.trueRange[0] || t > cfg.trueRange[1]) fails.push(`${P}: ${t} true statements outside ${cfg.trueRange[0]}..${cfg.trueRange[1]}`);
      if (cfg.maxNobody != null && nobody > cfg.maxNobody) fails.push(`${P}: ${nobody} nobody statements > ${cfg.maxNobody}`);
      const rows = [...sec.querySelectorAll('[data-lcs-stmt]')];
      if (rows.length !== stmts.length) fails.push(`${P}: ${rows.length} statement rows for ${stmts.length} stamped`);
      rows.forEach((row) => {
        const i = +row.dataset.lcsStmt; const st = stmts[i];
        if (!st) { fails.push(`${P}: row ${i} has no stamped statement`); return; }
        const txt = row.textContent.replace(/\s+/g, ' ');
        if (st.a >= 0) { const f = forms[st.a] || {}; const lit = st.k === 'holderIs' ? f.nom : (f.ade || f.nom); if (!lit || !txt.includes(lit)) fails.push(`${P}: statement ${i + 1} lacks the stamped name literal "${lit}"`); }
        const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
        const want = Array.isArray(st.v) ? st.v : [st.v];
        if (imgs.length !== want.length) fails.push(`${P}: statement ${i + 1} shows ${imgs.length} pictures, the stamp names ${want.length}`);
        imgs.forEach((im, q) => {
          const j = +im.dataset.lcsPic;
          if (j !== want[q]) fails.push(`${P}: statement ${i + 1} picture ${q} is column ${j}, stamped ${want[q]}`);
          if (headSrc[j] !== undefined && im.src !== headSrc[j]) fails.push(`${P}: statement ${i + 1} picture src ≠ the header picture of column ${j}`);
          if (!im.complete || im.naturalWidth === 0) fails.push(`${P}: statement ${i + 1} picture broken`);
          const r = im.getBoundingClientRect(); if (r.width < cfg.inlinePic - 0.6) fails.push(`${P}: statement ${i + 1} picture ${r.width.toFixed(0)} < ${cfg.inlinePic}`);
        });
        const glyphs = [...row.querySelectorAll('[data-lcs-glyph]')];
        if (glyphs.length !== 2 || glyphs[0].dataset.lcsGlyph !== 'yes' || glyphs[1].dataset.lcsGlyph !== 'no') fails.push(`${P}: statement ${i + 1} must end with a ✓ chip then a ✗ chip`);
        glyphs.forEach((g) => {
          if (g.hasAttribute('data-lcs-answer') || g.querySelector('[data-lcs-answer],circle,[data-lcs-mark]')) fails.push(`${P}: statement ${i + 1} glyph ${g.dataset.lcsGlyph} carries an answer / ring`);
          const cs = getComputedStyle(g);
          if (cs.backgroundColor !== 'rgb(255, 255, 255)') fails.push(`${P}: statement ${i + 1} glyph ${g.dataset.lcsGlyph} is filled (${cs.backgroundColor}) — an answer hint`);
          const r = g.getBoundingClientRect(); if (r.width < cfg.glyph - 0.6 || r.width < floor) fails.push(`${P}: glyph chip ${r.width.toFixed(0)} < ${cfg.glyph}`);
          const mk = g.querySelector('[data-lcs-glyphmark]'); if (!mk || mk.dataset.lcsGlyphmark !== g.dataset.lcsGlyph) fails.push(`${P}: glyph chip ${g.dataset.lcsGlyph} draws the wrong mark`);
        });
        const rr = row.getBoundingClientRect();
        if (rr.height > 66) fails.push(`${P}: statement ${i + 1} row ${rr.height.toFixed(0)} px > 66`);
        if (rr.bottom > footTop + 0.6) fails.push(`${P}: statement ${i + 1} below the footer`);
        [...row.querySelectorAll('img, span')].forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > rr.right + 0.6 || r.left < rr.left - 0.6)) fails.push(`${P}: statement ${i + 1} content outside the row`); });
      });
      const col = sec.querySelector('[data-lcs-stmtcol]');
      if (col && col.scrollWidth > col.clientWidth + 1) fails.push(`${P}: statement column content wider than the column`);
      if (C.sb.height > cfg.bandMax + 0.6) fails.push(`${P}: band ${C.sb.height.toFixed(0)} > ${cfg.bandMax}`);
      if (sec.querySelector('[data-lcs-answer-slot],[data-lcs-clue]')) fails.push(`${P}: answer chips / clue rows on a read page`);
    }
  });
  if (cfg.pageMin) {
    const tally = {};
    cases.forEach((sec) => { try { JSON.parse(sec.dataset.lcsClues).forEach((c) => { tally[c.f] = (tally[c.f] || 0) + 1; }); } catch (e) { /* reported above */ } });
    for (const [k, min] of Object.entries(cfg.pageMin)) if ((tally[k] || 0) < min) fails.push(`page carries ${tally[k] || 0} ${k} clue(s) < pageMin ${min}`);
  }
  // no ground truth outside a case root; no data-lcs-answer anywhere
  if (root.querySelector('[data-lcs-answer]')) fails.push('a data-lcs-answer attribute on the page');
  root.querySelectorAll('[data-lcs-solution],[data-lcs-clues],[data-lcs-solved],[data-lcs-truth],[data-lcs-stmts]').forEach((el) => { if (!el.hasAttribute('data-lcs-puzzle')) fails.push('ground truth outside a case root'); });
  if (!cases.length) fails.push('non-vacuity: no case rendered');
  return fails;
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
  _solver2: { holds2, states2, solutions2, propagate2, composeCase2, composeRead, pageMinFaults },   // the Phase-2 faces' node-side solvers (gate diffing only)

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
    if (d.mode) return buildFace(bankLoc, d, { theme, locale: loc }, ctx, sets);   // Phase-2 faces (picture | two-attr | read); the base path below is untouched
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
      if (ok && d.pageMin && pageMinFaults(parts.map((x) => x.clues), d.pageMin).length) ok = false;   // F1: a page-level quota (declared only by a face)
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
    const cfg = { size: n, clues: d.clues, kinds: d.kinds, maxPos: d.maxPos ?? null, minEither: d.minEither ?? null, minHolderNot: d.minHolderNot ?? null, maxHolderNot: d.maxHolderNot ?? null, cell: d.cell, headW: d.headW, hdrH: d.hdrH, picPx: d.picPx, inlinePic: d.inlinePic, bankPic: d.bankPic, answer: strip ? 'circle' : 'none', tileInner: d.headW - 20, ...(d.maxEither != null ? { maxEither: d.maxEither } : {}), ...(d.pageMin ? { pageMin: d.pageMin } : {}) };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-face="base" data-lcs-theme="${esc(theme)}" data-lcs-cfg='${esc(JSON.stringify(cfg))}' ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;gap:${KEY_GAP}px">` +
      markKey() +
      `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${BAND_GAP}px;min-height:0">${bands.join('')}</div></div>`;
    const meta = { theme, cases: cases.map((cs) => ({ names: cs.nameIdx.map((i) => names[i].nom), pics: cs.keys, solution: cs.sol, clues: cs.clues })), stack: 36 + KEY_GAP + 2 * (gridH + (strip ? STRIP_GAP + STRIP_H : 0)) + BAND_GAP };
    return { bodyHtml, meta };
  },

  async verify(page) {
    const { SETS } = require('../../data/b3/logic-puzzles.js');
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="G2-319"]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode) return page.evaluate(verifyFaceInPage, SETS);   // Phase-2 faces (the stamp is written only by a face)
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
      if (cfg.pageMin) {
        const tally = {};
        cases.forEach((sec) => { try { JSON.parse(sec.dataset.lcsClues).forEach((c) => { tally[c.f] = (tally[c.f] || 0) + 1; }); } catch (e) { /* reported above */ } });
        for (const [k, min] of Object.entries(cfg.pageMin)) if ((tally[k] || 0) < min) fails.push(`page carries ${tally[k] || 0} ${k} clue(s) < pageMin ${min}`);
      }
      // no ground truth outside a case root; no data-lcs-answer anywhere
      if (root.querySelector('[data-lcs-answer]')) fails.push('a data-lcs-answer attribute on the page (nothing on this sheet is an open box)');
      root.querySelectorAll('[data-lcs-solution],[data-lcs-clues]').forEach((el) => { if (!el.hasAttribute('data-lcs-puzzle')) fails.push('ground truth outside a case root'); });
      return fails;
    }, SETS);
  },
};
