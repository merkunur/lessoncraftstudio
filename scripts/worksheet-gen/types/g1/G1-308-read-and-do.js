/**
 * G1-308 — Read and Do: Follow the Instructions (nt20-C; `read-and-do`, G1,
 * RF.1.4). Design: docs/worksheet-gen/b3-designs/G1-308-read-and-do.md §2/§5.
 *
 * ONE ordered strip, SIX (d3: seven) instructions. A cream panel holds N colour
 * theme pictures on white tiles, a coral start flag + arrow above (the direction
 * cue) and a dotted mark band below. Under it a numbered list of full
 * imperatives, each with a dashed "done" box. The child reads a line, finds the
 * picture(s) on the strip and DOES it: rings the tile (circle), crosses it
 * (cross), underlines / ticks in the band (underline / mark), joins two band
 * dots (line) or writes a count in the row's box (write). Six verbs on three
 * zones; mark targets are DISJOINT across rows (composer + verify).
 *
 * THEMED (§1): pools = entriesFor(theme, loc).filter(countable), then only the
 * nouns the locale bank carries a reviewed `objForms` entry for; a theme with
 * < 8 usable nouns, a BW-marked theme, a verb with no legal sentence over the
 * pool (fi `write` on a theme without partitives) or a strip the composer cannot
 * fill in 200 tries THROW (refusal, never a filler).
 *
 * Every sentence is a WHOLE literal assembled by lib/b3-instructions.js
 * fillSlots from the bank's per-verb frame + per-noun object literals + the
 * noun-free `fixed` position phrases (data/b3/instructions.js — the slot-name →
 * form rule is in its header). The code never inflects, capitalises or
 * shortens: a sentence over the 96-char cap is the panel's to rewrite (the
 * validator + the gate catch it), never trimmed here.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (pics / tile /
 * pic / gap / rows / rowMin / rowGap / fontPx / verbs / minVerbs / cues /
 * ordMax / ordWindow / nounsMin / nounsMax / maxCount / maxPerVerb / maxPerCue), never on the level
 * index. F1 + F3 are PARAM faces over these keys; F2 / F4 / F5 add a
 * `steps` / `mode` knob + a verify() branch (Phase 2, 2026-09-14 — the five
 * faces G1-338..G1-342 are rows in tools/b3var-rows/read-and-do.js):
 *   F1 G1-338  PARAM  verbs ['circle'], cues unique+all, 6 nouns, `maxPerPair`
 *              6 (the ADDITIVE per-page cap on one (action, cue-kind) pair —
 *              default 1 = the base's "distinct pairs" rule; a one-verb face
 *              cannot exist under it) → 8 rings over 8 tiles.
 *   F2 G1-339  CODE   `steps:2` — every row is TWO clauses from the base's own
 *              candidate list joined by the bank's `and` literal (clause 1 minus
 *              its full stop + " and " + clause 2 with its first letter lowered
 *              — or the verb's optional panel-authored `frame2`), two DIFFERENT
 *              verbs, different nouns, targets disjoint within and across rows,
 *              the joined sentence ≤ 96 chars (a longer pair is SKIPPED, never
 *              trimmed). Rows 4 (the design's 5 = ten single-target steps over
 *              eight tiles composed 0/60 — _work/G1-308-faces.md), items = rows ×
 *              steps = 8, maxPerCue 3. `maxPerNoun` (default 2) is the additive
 *              per-page noun cap, stamped only when declared.
 *   F3 G1-340  PARAM  cues ordinal/first/last/between/rightof, tile verbs only
 *              (`line` needs the `unique` cue and `write` has no position →
 *              both would REFUSE at build).
 *   F4 G1-341  CODE   `mode:'truth'` — six DECLARATIVE statements from
 *              bank.truth.frames (count with rel eq/gt/lt, first/last, ordinal
 *              k, rightof/leftof), exactly `truePerPage` true; a false one is
 *              false by count or by position and names a noun ON the strip;
 *              truthChips replace the done box; statement cap `statementCap` 80.
 *   F5 G1-342  CODE   `mode:'draw'` — no strip, no picture: `cards` sentence +
 *              drawBox cards from bank.draw, n ∈ [nMin, nMax] as the bank's
 *              number WORD when `numbers` exists; open-ended (structure only).
 *   The base path is byte-identical: every knob is read only when the resolved
 *   config carries it and stamped only then (tools/b3-baseline.js is the proof).
 *
 * Answer hiding: the strip order is the only truth (`data-lcs-strip`); no tile
 * carries a numeral, word, alt, rotation, opacity or size difference. Row stamps
 * data-lcs-action / -cue / -noun / -noun2 / -targets / -text (+ -k); a `write`
 * row's answerBox carries data-lcs-answer. verify(page) re-derives every target
 * from strip + cue + noun and must equal the stamp.
 *
 * Chrome budget (README ruling + K-320's measured floor): the worst LEGAL
 * chrome leaves 710 px of body (a 3-line title + a 3-line instruction reached
 * through long-word wrapping), so every stack budgets 710: strip panel 146
 * (d1 162) + gap 12 + rows `repeat(N, minmax(rowMin, 1fr))` in a flex-grown
 * grid — the slack of a taller body opens in the rows, never in the strip.
 * d1 162 + 12 + 6×82 + 40 = 706 · d2 146 + 12 + 6×85 + 40 = 708 ·
 * d3 146 + 12 + 7×73 + 36 = 705.
 */
'use strict';
const { entriesFor, countable } = require('../../lib/b2-common.js');
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fillSlots, slotsIn } = require('../../lib/b3-instructions.js');
const C3 = require('../../templates/components-b3.js');

const pictureStrip = C3.lineUpStrip;   // K-320 shipped the design's `pictureStrip` contract under this name (one owner)
const { lineUpPanel, instructionList, drawCards } = C3;

const BANK = 'instructions';
const LANE_INNER = 647;   // .ws-lane with the inline padding:10px 12px override (675 − 24 − 4)
const LANE_PAD_BORDER = 24;
const GRID_GAP = 12;
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;   // the localized B&W theme marker (§20.5)
const VERB_IDS = ['circle', 'cross', 'underline', 'line', 'mark', 'write'];
const TILE_VERBS = ['circle', 'cross', 'underline', 'mark'];   // one object slot, mark one or more tiles
const OBJ_SLOTS = { obj: 'unique', all: 'unique', allDef: 'def', def: 'def', dat: 'dat', gen: 'gen' };   // slot → objForms key under the `unique` cue
const SECOND_SLOTS = { obj2: 'unique', dat2: 'dat', def2: 'def', a2: 'a2' };   // the `line` frame's second noun
const COUNT_SLOTS = { pl: 'pl', part: 'part' };   // the `write` frame's noun
const MAX_TRIES = 200;
const MAX_STRIPS = 40;
const STATEMENT_CAP = 80;      // F4 statements (design §3: 648 <= 2 x 363)
const SENTENCE_CAP = 96;       // F2 joined sentences (the base's cap covers the whole sentence)
const TRUTH_RELS = { eq: (c, n) => c === n, gt: (c, n) => c > n, lt: (c, n) => c < n };
const N_MAX = 5;               // the largest numeral a truth/draw frame prints

/**
 * Same-strip lookalike ban (picture-level, locale-neutral; every fan-theme picture
 * was opened 2026-09-14): two nouns of one group never share a strip, or "circle
 * the cheetah" beside a leopard and a jaguar is a visual-discrimination task,
 * not a reading task.
 */
const LOOKALIKES = [
  ['leopard', 'jaguar', 'cheetah'], ['chimpanzee', 'gorilla', 'orangutan', 'monkey'], ['antelope', 'gazelle'],
  ['duck', 'duckling', 'goose', 'swan', 'chick'], ['hen', 'chicken', 'rooster', 'turkey', 'chick'],
  ['cow', 'bull', 'calf', 'ox'], ['horse', 'foal', 'donkey'], ['wolf', 'dog'], ['cat', 'tiger'],
  ['apricot', 'clementine', 'orange', 'persimmon', 'nectarine', 'peach', 'mango'],
  ['apple', 'plum', 'cherry', 'cranberry', 'pomegranate'], ['lemon', 'lime'], ['blackberry', 'blueberry', 'raspberry'],
  ['boat', 'sailboat', 'ship', 'ferry', 'yacht', 'canoe'], ['car', 'jeep', 'taxi', 'van'], ['airplane', 'jet'],
  ['truck', 'van', 'ambulance'], ['crane', 'excavator', 'bulldozer', 'forklift', 'tractor'], ['scooter', 'motorcycle'],
  ['subway', 'train', 'bus'],
];
const LOOK_GROUP = new Map();
LOOKALIKES.forEach((g, i) => g.forEach((n) => { (LOOK_GROUP.get(n) || LOOK_GROUP.set(n, []).get(n)).push(i); }));
function lookalike(a, b) {
  const ga = LOOK_GROUP.get(a), gb = LOOK_GROUP.get(b);
  return !!(ga && gb && ga.some((i) => gb.includes(i)));
}

function cueKind(cue) { return String(cue).split(':')[0]; }

/** The frame's slot plan: {obj, second, count}; throws on a frame outside the contract. */
function slotPlan(verb) {
  const slots = slotsIn(verb.frame);
  const plan = { obj: null, second: null, count: null };
  for (const s of slots) {
    if (s in OBJ_SLOTS) { if (plan.obj) throw new Error(`G1-308: frame "${verb.frame}" has two object slots`); plan.obj = s; }
    else if (s in SECOND_SLOTS) { if (plan.second) throw new Error(`G1-308: frame "${verb.frame}" has two second slots`); plan.second = s; }
    else if (s in COUNT_SLOTS) { if (plan.count) throw new Error(`G1-308: frame "${verb.frame}" has two count slots`); plan.count = s; }
    else throw new Error(`G1-308: frame "${verb.frame}" carries an unknown slot {${s}}`);
  }
  if (verb.id === 'write') { if (!plan.count || plan.obj || plan.second) throw new Error(`G1-308: write frame "${verb.frame}" must carry exactly {pl} or {part}`); }
  else if (verb.id === 'line') { if (!plan.obj || !plan.second || plan.count) throw new Error(`G1-308: line frame "${verb.frame}" must carry one object + one second slot`); }
  else if (!plan.obj || plan.second || plan.count) throw new Error(`G1-308: frame "${verb.frame}" must carry exactly one object slot`);
  return plan;
}

/** A noun's form under a cue for an object slot; null = the noun is dropped from this (verb, cue). */
function objectForm(bankLoc, slot, cue, k, noun) {
  const f = bankLoc.objForms[noun];
  if (!f || !f.reviewed) return null;
  const kind = cueKind(cue);
  if (kind === 'unique') return f[OBJ_SLOTS[slot]] || null;
  if (kind === 'all') return (slot === 'allDef' ? f.allDef : f.all) || null;
  if (kind === 'ordinal') return (f.ord && f.ord[k]) || null;
  return null;
}
function fixedForm(bankLoc, cue, nounA, nounB) {
  const fx = bankLoc.fixed || {};
  const ep = bankLoc.endpointForm || 'unique';
  const A = nounA && bankLoc.objForms[nounA] && bankLoc.objForms[nounA][ep];
  const B = nounB && bankLoc.objForms[nounB] && bankLoc.objForms[nounB][ep];
  if (cue === 'first' || cue === 'last') return fx[cue] || null;
  if (cue === 'between') return fx.between && A && B ? fillSlots(fx.between, { A, B }) : null;
  if (cue === 'rightof' || cue === 'leftof') return fx[cue] && A ? fillSlots(fx[cue], { A }) : null;
  return null;
}

/**
 * The sentence for (verb, cue, k, nounA, nounB) from the bank, or null when a
 * needed form is missing. PURE — the gate re-implements it from the bank and
 * diffs the rendered text (the "hand-edited noun" poison).
 */
function sentenceFor(bankLoc, verb, cue, k, nounA, nounB) {
  const plan = slotPlan(verb);
  const slots = {};
  if (verb.id === 'write') {
    const f = bankLoc.objForms[nounA];
    const v = f && f.reviewed ? f[COUNT_SLOTS[plan.count]] : null;
    if (!v) return null;
    slots[plan.count] = v;
  } else {
    const kind = cueKind(cue);
    const v = ['unique', 'all', 'ordinal'].includes(kind) ? objectForm(bankLoc, plan.obj, cue, k, nounA) : fixedForm(bankLoc, cue, nounA, nounB);
    if (!v) return null;
    slots[plan.obj] = v;
    if (plan.second) {
      const f2 = bankLoc.objForms[nounB];
      const v2 = f2 && f2.reviewed ? f2[SECOND_SLOTS[plan.second]] : null;
      if (!v2) return null;
      slots[plan.second] = v2;
    }
  }
  return fillSlots(verb.frame, slots);
}

/** Positions of every noun on the strip. */
function occurrences(strip) {
  const m = new Map();
  strip.forEach((n, i) => { (m.get(n) || m.set(n, []).get(n)).push(i); });
  return m;
}

/** Every legal (verb, cue, noun[, noun2]) sentence over a strip under the resolved config. */
function candidates(bankLoc, strip, d) {
  const occ = occurrences(strip);
  const nouns = [...occ.keys()];
  const n = strip.length;
  const out = [];
  const verbs = bankLoc.verbs.filter((v) => d.verbs.includes(v.id));
  const push = (verb, cue, k, nounA, nounB, targets, answer) => {
    const text = sentenceFor(bankLoc, verb, cue, k, nounA, nounB);
    if (!text) return;
    out.push({ action: verb.id, cue, k, noun: nounA || '', noun2: nounB || '', targets, answer, text });
  };
  for (const verb of verbs) {
    if (verb.id === 'write') {
      for (const a of nouns) { const c = occ.get(a).length; if (c >= 1 && c <= 4 && nouns.length >= 2) push(verb, 'count', null, a, null, [], c); }
      continue;
    }
    if (verb.id === 'line') {
      if (!d.cues.includes('unique')) continue;
      const uniq = nouns.filter((x) => occ.get(x).length === 1);
      for (const a of uniq) for (const b of uniq) if (a !== b) push(verb, 'unique', null, a, b, [occ.get(a)[0], occ.get(b)[0]].sort((x, y) => x - y), null);
      continue;
    }
    if (!TILE_VERBS.includes(verb.id)) continue;
    for (const cue of d.cues) {
      if (cue === 'unique') for (const a of nouns) if (occ.get(a).length === 1) push(verb, 'unique', null, a, null, occ.get(a), null);
      if (cue === 'all') for (const a of nouns) if (occ.get(a).length >= 2 && nouns.length >= 2) push(verb, 'all', null, a, null, occ.get(a).slice(), null);
      if (cue === 'ordinal') for (const a of nouns) {
        const o = occ.get(a);
        if (o.length < 2 || o.some((i) => i >= d.ordWindow)) continue;
        for (let k = 2; k <= Math.min(d.ordMax, o.length); k++) push(verb, 'ordinal:' + k, k, a, null, [o[k - 1]], null);
      }
      if (cue === 'first') push(verb, 'first', null, null, null, [0], null);
      if (cue === 'last') push(verb, 'last', null, null, null, [n - 1], null);
      if (cue === 'between') {
        const uniq = nouns.filter((x) => occ.get(x).length === 1);
        for (const a of uniq) for (const b of uniq) {
          const i = occ.get(a)[0], j = occ.get(b)[0];
          if (a !== b && j - i === 2) push(verb, 'between', null, a, b, [i + 1], null);
        }
      }
      if (cue === 'rightof' || cue === 'leftof') for (const a of nouns) {
        const o = occ.get(a);
        if (o.length !== 1 || o[0] === 0 || o[0] === n - 1) continue;
        push(verb, cue, null, a, null, [cue === 'rightof' ? o[0] + 1 : o[0] - 1], null);
      }
    }
  }
  return out;
}

/** Pick `d.rows` compatible sentences: disjoint targets, distinct (action, cue kind), a verb on <= maxPerVerb rows, a cue kind on <= maxPerCue rows, a noun named by <= 2 rows, distinct texts, >= minVerbs verbs. */
function select(rng, cands, d) {
  const maxPerPair = d.maxPerPair || 1;      // F1: a one-verb page needs the same (action, cue kind) on several rows
  const maxPerNoun = d.maxPerNoun || 2;
  for (let t = 0; t < MAX_TRIES; t++) {
    const used = new Set(), pairs = {}, nounUse = {}, texts = new Set(), verbs = new Set(), verbUse = {}, cueUse = {};
    const rows = [];
    for (const c of rng.shuffle(cands)) {
      if (rows.length === d.rows) break;
      if (c.targets.some((i) => used.has(i))) continue;
      const pk = c.action + '|' + cueKind(c.cue);
      if ((pairs[pk] || 0) >= maxPerPair) continue;
      if ((verbUse[c.action] || 0) >= d.maxPerVerb) continue;
      if ((cueUse[cueKind(c.cue)] || 0) >= d.maxPerCue) continue;
      const names = [c.noun, c.noun2].filter(Boolean);
      if (names.some((x) => (nounUse[x] || 0) >= maxPerNoun)) continue;
      if (texts.has(c.text)) continue;
      rows.push(c);
      c.targets.forEach((i) => used.add(i));
      pairs[pk] = (pairs[pk] || 0) + 1;
      names.forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; });
      texts.add(c.text);
      verbs.add(c.action);
      verbUse[c.action] = (verbUse[c.action] || 0) + 1;
      cueUse[cueKind(c.cue)] = (cueUse[cueKind(c.cue)] || 0) + 1;
    }
    if (rows.length === d.rows && verbs.size >= d.minVerbs) return rows;
  }
  return null;
}

/** A strip: nounsMin..nounsMax distinct nouns (no lookalike pair), multiplicities >= 1 and <= maxCount summing to pics, shuffled. */
function sampleStrip(rng, pool, d) {
  const nNouns = rng.int(d.nounsMin, d.nounsMax);
  if (nNouns > d.pics) throw new Error(`G1-308: ${nNouns} nouns > ${d.pics} pictures`);
  for (let t = 0; t < 100; t++) {
    const picked = rng.sample(pool, nNouns);
    if (picked.some((a, i) => picked.some((b, j) => j > i && lookalike(a.vocabKey, b.vocabKey)))) continue;
    const counts = picked.map(() => 1);
    let rest = d.pics - nNouns;
    let guard = 0;
    while (rest > 0 && guard++ < 1000) { const i = rng.int(0, nNouns - 1); if (counts[i] < d.maxCount) { counts[i]++; rest--; } }
    if (rest > 0) continue;
    const items = [];
    picked.forEach((e, i) => { for (let c = 0; c < counts[i]; c++) items.push(e); });
    return rng.shuffle(items);
  }
  throw new Error(`G1-308: could not sample ${nNouns} non-lookalike nouns from a pool of ${pool.length}`);
}

/* ------------------------------------------------------------ verify helpers for the faces (page-side; injected by SOURCE — page.evaluate cannot close over Node scope) */
/** The strip + panel checks every strip-bearing face shares with the base (tiles, no leak, flag, band, order, text-free panel). Returns {occ, nouns}. */
function STRIP_CHECKS(root, fails) {
  const strip = (root.dataset.lcsStrip || '').split(',').filter(Boolean);
  const n = +root.dataset.lcsN;
  const theme = root.dataset.lcsTheme || '';
  if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(theme)) fails.push(`theme "${theme}" carries a B&W marker`);
  if (!(n >= 4) || strip.length !== n) fails.push(`strip has ${strip.length} nouns, n=${n}`);
  const occ = {};
  strip.forEach((x, i) => { (occ[x] = occ[x] || []).push(i); });
  const nouns = Object.keys(occ);
  if (nouns.length < 2) fails.push('fewer than 2 distinct nouns on the strip');
  const tiles = [...root.querySelectorAll('[data-lcs-idx]')];
  if (tiles.length !== n) fails.push(`${tiles.length} tiles, n=${n}`);
  const sizes = new Set();
  tiles.forEach((t) => {
    const idx = +t.dataset.lcsIdx;
    const img = t.querySelector('img');
    if (!img) { fails.push(`tile ${idx}: no picture`); return; }
    if (t.textContent.trim()) fails.push(`tile ${idx} carries text "${t.textContent.trim().slice(0, 12)}"`);
    if (t.querySelector('text')) fails.push(`tile ${idx} carries SVG text`);
    if (img.hasAttribute('alt')) fails.push(`tile ${idx} img carries alt`);
    if (!img.complete || img.naturalWidth === 0) fails.push(`tile ${idx} picture broken`);
    if (/(^|\s|%20)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%2F)/i.test(decodeURIComponent(img.getAttribute('src') || ''))) fails.push(`tile ${idx}: a B&W picture path`);
    const cs = getComputedStyle(img);
    if (cs.opacity !== '1') fails.push(`tile ${idx}: opacity leak`);
    if (cs.transform !== 'none') fails.push(`tile ${idx}: transform leak`);
    sizes.add(img.style.width + 'x' + img.style.height);
  });
  if (sizes.size > 1) fails.push('tile pictures differ in size (target leak)');
  const ordered = tiles.slice().sort((a, b) => +a.dataset.lcsIdx - +b.dataset.lcsIdx);
  ordered.forEach((t, i) => {
    if (+t.dataset.lcsIdx !== i) fails.push(`tile indices are not 0..${n - 1}`);
    if (i && t.getBoundingClientRect().left <= ordered[i - 1].getBoundingClientRect().left) fails.push(`tile ${i} is not to the right of tile ${i - 1}`);
  });
  if (!root.querySelector('[data-lcs-flag]')) fails.push('no start flag');
  if (!root.querySelector('[data-lcs-band]')) fails.push('no mark band');
  const panel = root.querySelector('[data-lcs-panel]');
  if (panel && panel.textContent.trim()) fails.push(`the strip panel carries text "${panel.textContent.trim().slice(0, 16)}"`);
  return { occ, nouns, strip, n };
}

/** Re-derive one instruction's targets from strip + cue + noun (the base's §2 rules); returns {want, fails}. */
function DERIVE_WANT(occ, n, ordMax, ordWindow, s) {
  const fails = [];
  const c = (x) => (occ[x] || []).length;
  const nouns = Object.keys(occ);
  const kind = String(s.cue).split(':')[0];
  let want = null;
  if (s.action === 'write') {
    if (kind !== 'count') fails.push(`write step cue "${s.cue}"`);
    if (!(c(s.noun) >= 1 && c(s.noun) <= 4)) fails.push(`write noun "${s.noun}" occurs ${c(s.noun)}x (want 1-4)`);
    if (nouns.length < 2) fails.push('write over a one-noun strip');
    want = [];
  } else if (s.action === 'line') {
    if (kind !== 'unique') fails.push(`line step cue "${s.cue}"`);
    if (!s.noun || !s.noun2 || s.noun === s.noun2) fails.push('line needs two different nouns');
    if (c(s.noun) !== 1 || c(s.noun2) !== 1) fails.push('line nouns must be unique on the strip');
    want = c(s.noun) === 1 && c(s.noun2) === 1 ? [occ[s.noun][0], occ[s.noun2][0]].sort((a, b) => a - b) : null;
  } else if (kind === 'unique') {
    if (c(s.noun) !== 1) fails.push(`"${s.noun}" occurs ${c(s.noun)}x, cue unique`);
    if (s.noun2) fails.push('unique step names a second noun');
    want = c(s.noun) === 1 ? occ[s.noun] : null;
  } else if (kind === 'all') {
    if (c(s.noun) < 2) fails.push(`"${s.noun}" occurs ${c(s.noun)}x, cue all needs >= 2`);
    if (nouns.length < 2) fails.push('all over a one-noun strip');
    want = occ[s.noun] || null;
  } else if (kind === 'ordinal') {
    const k = +String(s.cue).split(':')[1];
    if (!(k >= 2 && k <= ordMax)) fails.push(`ordinal k ${k} outside 2..${ordMax}`);
    if (+s.k !== k) fails.push(`data-lcs-k ${s.k} != ${k}`);
    if (c(s.noun) < k) fails.push(`"${s.noun}" occurs ${c(s.noun)}x, ordinal ${k}`);
    if ((occ[s.noun] || []).some((x) => x >= ordWindow)) fails.push(`"${s.noun}" has a picture beyond tile ${ordWindow}`);
    want = c(s.noun) >= k ? [occ[s.noun][k - 1]] : null;
  } else if (kind === 'first' || kind === 'last') {
    if (s.noun || s.noun2) fails.push(`${kind} step names a noun`);
    want = [kind === 'first' ? 0 : n - 1];
  } else if (kind === 'between') {
    if (c(s.noun) !== 1 || c(s.noun2) !== 1) fails.push('between needs two unique nouns');
    const i1 = (occ[s.noun] || [])[0], i2 = (occ[s.noun2] || [])[0];
    if (i2 - i1 !== 2) fails.push(`between endpoints ${i1},${i2} are not 2 apart`);
    want = i2 - i1 === 2 ? [i1 + 1] : null;
  } else if (kind === 'rightof' || kind === 'leftof') {
    if (c(s.noun) !== 1) fails.push(`${kind} needs a unique noun`);
    const i1 = (occ[s.noun] || [])[0];
    if (i1 === 0 || i1 === n - 1) fails.push(`${kind} anchor at the edge`);
    want = c(s.noun) === 1 ? [kind === 'rightof' ? i1 + 1 : i1 - 1] : null;
  } else fails.push(`unknown cue "${s.cue}"`);
  return { want, fails };
}

/** Shared row-text lints (page-side). */
function TEXT_LINTS(r, R, fails) {
  const text = r.dataset.lcsText || '';
  const p = r.querySelector('[data-lcs-textnode]');
  if (!p || p.textContent.trim() !== text) fails.push(`${R}: printed text != data-lcs-text`);
  if (/\{/.test(text)) fails.push(`${R}: unfilled slot`);
  if (/  /.test(text)) fails.push(`${R}: double space`);
  if (/ \./.test(text)) fails.push(`${R}: space before the full stop`);
  if (!/^\p{Lu}/u.test(text)) fails.push(`${R}: does not start with a capital`);
  if (!/\.$/.test(text)) fails.push(`${R}: does not end with a full stop`);
  return text;
}

/* F2 · steps:2 — every row = two stamped steps, different actions, targets re-derived per step, union disjoint across the page (P8) */
function VERIFY_STEPS(stripSrc, deriveSrc, textSrc) {
  const stripChecks = new Function('return ' + stripSrc)();
  const derive = new Function('return ' + deriveSrc)();
  const TEXT_LINTS_SRC = new Function('return ' + textSrc)();
  const fails = [];
  const root = document.querySelector('[data-lcs-rad]');
  if (!root) return ['no read-and-do root'];
  const steps = +root.dataset.lcsSteps;
  if (steps !== 2) fails.push(`steps ${steps} != 2`);
  const { occ, nouns, n } = stripChecks(root, fails);
  const rowsN = +root.dataset.lcsRowsn, minVerbs = +root.dataset.lcsMinverbs, maxPerVerb = +root.dataset.lcsMaxperverb, maxPerCue = +root.dataset.lcsMaxpercue, maxPerNoun = +(root.dataset.lcsMaxpernoun || 2);
  const ordMax = +root.dataset.lcsOrdmax, ordWindow = +root.dataset.lcsOrdwindow, cap = +(root.dataset.lcsCap || 96);
  const and = root.dataset.lcsAnd || '';
  const verbs = (root.dataset.lcsVerbs || '').split(',').filter(Boolean);
  const cues = (root.dataset.lcsCues || '').split(',').filter(Boolean);
  const rows = [...root.querySelectorAll('[data-lcs-row]')];
  if (rows.length !== rowsN) fails.push(`${rows.length} rows, config says ${rowsN}`);
  if (rows.length * steps < 6 || rows.length * steps > 12) fails.push(`${rows.length * steps} items outside [6,12]`);
  if (!and.trim()) fails.push('no "and" literal stamped');
  const usedTargets = new Set(), pairs = new Set(), nounUse = {}, texts = new Set(), verbSet = new Set(), verbUse = {}, cueUse = {}, writeCounts = new Set();
  rows.forEach((r, i) => {
    const R = `row ${i + 1}`;
    if (+r.dataset.lcsN !== i + 1) fails.push(`${R}: numbered ${r.dataset.lcsN}`);
    const badge = r.querySelector('[data-lcs-badge]');
    if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${R}: badge != ${i + 1}`);
    if (r.dataset.lcsAction !== 'two-step') fails.push(`${R}: row action "${r.dataset.lcsAction}" (want two-step)`);
    const text = TEXT_LINTS_SRC(r, R, fails);
    if ([...text].length > cap) fails.push(`${R}: ${[...text].length} chars > the ${cap} cap`);
    if (and && !new RegExp('\\s' + and.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s').test(text)) fails.push(`${R}: the sentence does not carry the "and" literal`);
    if (!r.querySelector('[data-lcs-done]')) fails.push(`${R}: no done box`);
    const st = [...r.querySelectorAll('[data-lcs-step]')].sort((a, b) => +a.dataset.lcsStep - +b.dataset.lcsStep);
    if (st.length !== steps) { fails.push(`${R}: ${st.length} steps, want ${steps}`); return; }
    const acts = st.map((s) => s.dataset.lcsAction);
    if (new Set(acts).size !== acts.length) fails.push(`${R}: both clauses "${acts[0]}" (two DIFFERENT verbs)`);
    const rowTargets = new Set();
    const rowNouns = [];
    let writeN = 0;
    st.forEach((s, j) => {
      const S = `${R} step ${j + 1}`;
      const sd = { action: s.dataset.lcsAction, cue: s.dataset.lcsCue || '', noun: s.dataset.lcsNoun || '', noun2: s.dataset.lcsNoun2 || '', k: s.dataset.lcsK };
      const targets = (s.dataset.lcsTargets || '').split(',').filter((x) => x !== '').map(Number);
      const kind = sd.cue.split(':')[0];
      if (!verbs.includes(sd.action)) fails.push(`${S}: action "${sd.action}" not in the config verbs`);
      if (sd.action !== 'write' && !cues.includes(kind) && !(sd.action === 'line' && kind === 'unique')) fails.push(`${S}: cue "${sd.cue}" not in the config cues`);
      const d = derive(occ, n, ordMax, ordWindow, sd);
      d.fails.forEach((f) => fails.push(`${S}: ${f}`));
      if (d.want && d.want.join(',') !== targets.join(',')) fails.push(`${S}: targets ${targets.join(',')} re-derive to ${d.want.join(',')}`);
      if (!d.want && sd.action !== 'write' && !targets.length) fails.push(`${S}: no targets`);
      targets.forEach((t) => {
        if (!(t >= 0 && t < n)) fails.push(`${S}: target ${t} off the strip`);
        if (rowTargets.has(t)) fails.push(`${S}: tile ${t} is marked twice in one row`);
        if (usedTargets.has(t)) fails.push(`${S}: tile ${t} is marked by two rows`);
        rowTargets.add(t); usedTargets.add(t);
      });
      if (sd.action === 'write') {
        writeN++;
        const c = (occ[sd.noun] || []).length;
        const box = r.querySelector('.ws-answerbox');
        if (!box) fails.push(`${S}: write step has no answer box`);
        else {
          if (+box.dataset.lcsAnswer !== c) fails.push(`${S}: answer ${box.dataset.lcsAnswer} != ${c} pictures of ${sd.noun}`);
          if (box.textContent.trim()) fails.push(`${S}: the answer is printed`);
          if (box.getBoundingClientRect().height < 26) fails.push(`${S}: answer box below the G1 answer floor 26`);
          if (writeCounts.has(c)) fails.push(`${S}: a second write step with count ${c}`);
          writeCounts.add(c);
        }
      }
      const pk = sd.action + '|' + kind;
      if (pairs.has(pk)) fails.push(`${S}: (${sd.action}, ${kind}) repeats on the page`); pairs.add(pk);
      [sd.noun, sd.noun2].filter(Boolean).forEach((x) => { rowNouns.push(x); nounUse[x] = (nounUse[x] || 0) + 1; if (nounUse[x] > maxPerNoun) fails.push(`${S}: "${x}" named by more than ${maxPerNoun} steps`); });
      verbSet.add(sd.action);
      verbUse[sd.action] = (verbUse[sd.action] || 0) + 1;
      if (verbUse[sd.action] > maxPerVerb) fails.push(`${S}: "${sd.action}" on more than ${maxPerVerb} steps`);
      cueUse[kind] = (cueUse[kind] || 0) + 1;
      if (cueUse[kind] > maxPerCue) fails.push(`${S}: cue "${kind}" on more than ${maxPerCue} steps`);
    });
    if (new Set(rowNouns).size !== rowNouns.length) fails.push(`${R}: one noun in both clauses`);
    if (!writeN && r.querySelector('.ws-answerbox')) fails.push(`${R}: a row without a write step carries an answer box`);
    const union = (r.dataset.lcsTargets || '').split(',').filter((x) => x !== '').map(Number);
    if (union.join(',') !== [...rowTargets].sort((a, b) => a - b).join(',')) fails.push(`${R}: row targets ${union.join(',')} != the union of its steps`);
    if (texts.has(text)) fails.push(`${R}: duplicate sentence`); texts.add(text);
    if (r.querySelector('[data-lcs-done]') && r.querySelector('[data-lcs-done]').textContent.trim()) fails.push(`${R}: done box carries text`);
  });
  if (verbSet.size < minVerbs) fails.push(`${verbSet.size} distinct verbs < ${minVerbs}`);
  if (!rows.length) fails.push('no rows');
  void nouns;
  return fails;
}

/* F4 · mode:'truth' — declaratives re-evaluated against the strip; exactly truePerPage true; a false statement names a noun ON the strip (P5); chips yes | no, no glyph */
function VERIFY_TRUTH(stripSrc, textSrc) {
  const stripChecks = new Function('return ' + stripSrc)();
  const TEXT_LINTS_SRC = new Function('return ' + textSrc)();
  const fails = [];
  const root = document.querySelector('[data-lcs-rad]');
  if (!root) return ['no read-and-do root'];
  const { occ, nouns, strip, n } = stripChecks(root, fails);
  const rowsN = +root.dataset.lcsRowsn, truePer = +root.dataset.lcsTrueper, maxPerCue = +root.dataset.lcsMaxpercue, maxPerNoun = +(root.dataset.lcsMaxpernoun || 2);
  const ordMax = +root.dataset.lcsOrdmax, cap = +(root.dataset.lcsCap || 80);
  const yes = root.dataset.lcsYes, no = root.dataset.lcsNo;
  const cues = (root.dataset.lcsCues || '').split(',').filter(Boolean);
  const rows = [...root.querySelectorAll('[data-lcs-row]')];
  if (rows.length !== rowsN) fails.push(`${rows.length} rows, config says ${rowsN}`);
  if (rows.length < 6 || rows.length > 12) fails.push(`${rows.length} items outside [6,12]`);
  if (!yes || !no || yes === no) fails.push('yes/no chips not stamped or equal');
  let trues = 0;
  const texts = new Set(), nounUse = {}, cueUse = {};
  const c = (x) => (occ[x] || []).length;
  rows.forEach((r, i) => {
    const R = `row ${i + 1}`;
    if (+r.dataset.lcsN !== i + 1) fails.push(`${R}: numbered ${r.dataset.lcsN}`);
    const badge = r.querySelector('[data-lcs-badge]');
    if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${R}: badge != ${i + 1}`);
    if (r.dataset.lcsAction !== 'truth') fails.push(`${R}: row action "${r.dataset.lcsAction}" (want truth)`);
    const text = TEXT_LINTS_SRC(r, R, fails);
    if ([...text].length > cap) fails.push(`${R}: statement ${[...text].length} chars > the ${cap} cap`);
    if (texts.has(text)) fails.push(`${R}: duplicate statement`); texts.add(text);
    if (r.querySelector('[data-lcs-done]')) fails.push(`${R}: a truth row carries a done box`);
    if (r.querySelector('.ws-answerbox')) fails.push(`${R}: a truth row carries an answer box`);
    if ((r.dataset.lcsTargets || '') !== '') fails.push(`${R}: a truth row stamps targets`);
    const truth = r.dataset.lcsTruth;
    if (truth !== '1' && truth !== '0') fails.push(`${R}: data-lcs-truth "${truth}"`);
    const cue = r.dataset.lcsCue || '', kind = cue.split(':')[0], noun = r.dataset.lcsNoun || '', noun2 = r.dataset.lcsNoun2 || '';
    const nval = r.dataset.lcsNval === '' ? null : +r.dataset.lcsNval, rel = r.dataset.lcsRel || '';
    if (!cues.includes(kind)) fails.push(`${R}: cue "${cue}" not in the config cues`);
    if (!noun || !nouns.includes(noun)) fails.push(`${R}: names "${noun || '(nothing)'}", which is not on the strip`);   // P5
    if (noun2 && !nouns.includes(noun2)) fails.push(`${R}: names "${noun2}", which is not on the strip`);   // P5
    let want = null;
    if (kind === 'count') {
      if (!(nval >= 1)) fails.push(`${R}: count statement without a number`);
      if (!['eq', 'gt', 'lt'].includes(rel)) fails.push(`${R}: count statement rel "${rel}"`);
      if (nouns.length < 2) fails.push(`${R}: count over a one-noun strip`);
      if (noun2) fails.push(`${R}: count statement names a second noun`);
      const cc = c(noun);
      want = rel === 'eq' ? cc === nval : rel === 'gt' ? cc > nval : rel === 'lt' ? cc < nval : null;
      if (r.dataset.lcsFalseBy && r.dataset.lcsFalseBy !== 'count') fails.push(`${R}: false-by "${r.dataset.lcsFalseBy}" on a count statement`);
    } else if (kind === 'first' || kind === 'last') {
      if (noun2) fails.push(`${R}: ${kind} statement names a second noun`);
      want = strip[kind === 'first' ? 0 : n - 1] === noun;
    } else if (kind === 'ordinal') {
      const k = +cue.split(':')[1];
      if (!(k >= 2 && k <= ordMax && k <= n)) fails.push(`${R}: ordinal k ${k} outside 2..${Math.min(ordMax, n)}`);
      if (+r.dataset.lcsK !== k) fails.push(`${R}: data-lcs-k ${r.dataset.lcsK} != ${k}`);
      if (noun2) fails.push(`${R}: ordinal statement names a second noun`);
      want = strip[k - 1] === noun;
    } else if (kind === 'rightof' || kind === 'leftof') {
      if (c(noun) !== 1) fails.push(`${R}: ${kind} needs a unique anchor noun`);
      if (!noun2) fails.push(`${R}: ${kind} names no second noun`);
      const i1 = (occ[noun] || [])[0];
      const j = kind === 'rightof' ? i1 + 1 : i1 - 1;
      if (!(j >= 0 && j < n)) fails.push(`${R}: ${kind} anchor at the edge`);
      want = strip[j] === noun2;
    } else fails.push(`${R}: unknown cue "${cue}"`);
    if (kind !== 'count' && r.dataset.lcsFalseBy && r.dataset.lcsFalseBy !== 'position') fails.push(`${R}: false-by "${r.dataset.lcsFalseBy}" on a position statement`);
    if (want != null && (want ? '1' : '0') !== truth) fails.push(`${R}: stamped ${truth === '1' ? 'true' : 'false'}, the strip says ${want ? 'true' : 'false'}`);
    if (truth === '0' && !r.dataset.lcsFalseBy) fails.push(`${R}: a false statement without false-by`);
    if (truth === '1' && r.dataset.lcsFalseBy) fails.push(`${R}: a true statement with false-by`);
    trues += truth === '1' ? 1 : 0;
    cueUse[kind] = (cueUse[kind] || 0) + 1;
    if (cueUse[kind] > maxPerCue) fails.push(`${R}: cue "${kind}" on more than ${maxPerCue} rows`);
    [noun, noun2].filter(Boolean).forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; if (nounUse[x] > maxPerNoun) fails.push(`${R}: "${x}" named by more than ${maxPerNoun} rows`); });
    // chips
    const chips = [...r.querySelectorAll('[data-lcs-truth-chip]')];
    if (chips.length !== 2) fails.push(`${R}: ${chips.length} truth chips`);
    else {
      const [a, b] = chips;
      if (a.dataset.lcsTruthChip !== 'yes' || b.dataset.lcsTruthChip !== 'no') fails.push(`${R}: chips are not yes | no in DOM order`);
      if (a.getBoundingClientRect().left >= b.getBoundingClientRect().left) fails.push(`${R}: the no chip is not to the right of the yes chip`);
      if (a.textContent.trim() !== yes || b.textContent.trim() !== no) fails.push(`${R}: chip texts "${a.textContent.trim()}"/"${b.textContent.trim()}" != "${yes}"/"${no}"`);
      chips.forEach((ch) => {
        if (ch.querySelector('svg, img')) fails.push(`${R}: a chip carries a glyph`);
        const cb = ch.getBoundingClientRect();
        if (cb.height < 44 - 0.6) fails.push(`${R}: chip ${cb.height.toFixed(1)} < 44`);
        if (ch.scrollWidth > ch.clientWidth + 0.6) fails.push(`${R}: chip text overflows`);
        const rb = r.getBoundingClientRect();
        if (cb.right > rb.right + 0.6 || cb.left < rb.left - 0.6) fails.push(`${R}: chip outside its row`);
      });
      const ring = getComputedStyle(a);
      if (ring.borderStyle !== getComputedStyle(b).borderStyle || ring.backgroundColor !== getComputedStyle(b).backgroundColor) fails.push(`${R}: the two chips are styled differently (a verdict by palette)`);
    }
  });
  if (trues !== truePer) fails.push(`${trues} true statements, config says ${truePer}`);
  if (rows.length - trues !== rowsN - truePer) fails.push(`${rows.length - trues} false statements, config says ${rowsN - truePer}`);
  if (!rows.length) fails.push('no rows');
  return fails;
}

/* F5 · mode:'draw' — open-ended: structure + lints only (no picture anywhere, one EMPTY draw box per card, the count varies, no leak) */
function VERIFY_DRAW(textSrc) {
  const TEXT_LINTS_SRC = new Function('return ' + textSrc)();
  const fails = [];
  const root = document.querySelector('[data-lcs-rad]');
  if (!root) return ['no read-and-do root'];
  const cardsN = +root.dataset.lcsCards, nMin = +root.dataset.lcsNmin, nMax = +root.dataset.lcsNmax, dw = +root.dataset.lcsDraww, dh = +root.dataset.lcsDrawh, cap = +(root.dataset.lcsCap || 96);
  if (root.querySelector('img, [data-lcs-idx], [data-lcs-panel]')) fails.push('a picture / strip on the draw page (a picture removes the reading)');
  const cards = [...root.querySelectorAll('[data-lcs-drawcard]')];
  if (cards.length !== cardsN) fails.push(`${cards.length} cards, config says ${cardsN}`);
  if (cards.length < 6 || cards.length > 12) fails.push(`${cards.length} items outside [6,12]`);
  const texts = new Set(), nouns = new Set(), nvals = new Set();
  const rects = [];
  cards.forEach((c, i) => {
    const R = `card ${i + 1}`;
    if (+c.dataset.lcsN !== i + 1) fails.push(`${R}: numbered ${c.dataset.lcsN}`);
    const sec = c.closest('.ws-card');
    const badge = sec && sec.querySelector('.ws-card-badge');
    if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${R}: badge != ${i + 1}`);
    const text = TEXT_LINTS_SRC(c, R, fails);
    if ([...text].length > cap) fails.push(`${R}: ${[...text].length} chars > the ${cap} cap`);
    if (texts.has(text)) fails.push(`${R}: duplicate sentence`); texts.add(text);
    const noun = c.dataset.lcsNoun || '';
    if (!noun) fails.push(`${R}: no noun stamped`);
    if (nouns.has(noun)) fails.push(`${R}: noun "${noun}" on two cards`); nouns.add(noun);
    const nv = +c.dataset.lcsNval;
    if (!(nv >= nMin && nv <= nMax)) fails.push(`${R}: n ${nv} outside ${nMin}..${nMax}`);
    nvals.add(nv);
    const boxes = c.querySelectorAll('[data-lcs-drawbox]');
    if (boxes.length !== 1) fails.push(`${R}: ${boxes.length} draw boxes`);
    else {
      const b = boxes[0];
      if (b.textContent.trim() || b.children.length) fails.push(`${R}: the draw box is not empty`);
      const br = b.getBoundingClientRect();
      if (Math.abs(br.width - dw) > 0.6 || br.height < dh - 0.6) fails.push(`${R}: draw box ${br.width.toFixed(1)}x${br.height.toFixed(1)} (want ${dw} wide, >= ${dh} high)`);
      if (br.height < 100) fails.push(`${R}: draw box ${br.height.toFixed(1)} too short to draw in`);
      const cr = c.getBoundingClientRect();
      if (br.bottom > cr.bottom + 0.6 || br.right > cr.right + 0.6 || br.left < cr.left - 0.6) fails.push(`${R}: draw box outside its card`);
      const p = c.querySelector('[data-lcs-textnode]');
      if (p && p.getBoundingClientRect().bottom > br.top + 0.6) fails.push(`${R}: the sentence overlaps the draw box`);
      if (p && badge && p.getBoundingClientRect().left < badge.getBoundingClientRect().right - 0.6 && p.getBoundingClientRect().top < badge.getBoundingClientRect().bottom) fails.push(`${R}: the sentence runs under the card badge`);
    }
    const p = c.querySelector('[data-lcs-textnode]');
    if (p && p.clientHeight > 50) fails.push(`${R}: sentence ${p.clientHeight}px high (three lines)`);
    if (p && p.scrollWidth > p.clientWidth + 0.6) fails.push(`${R}: sentence overflows its card`);
    if (sec) rects.push(sec.getBoundingClientRect());
  });
  if (nMax > nMin && nvals.size < 2) fails.push(`the count is constant (${[...nvals].join(',')}) across the page`);
  for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
    const a = rects[i], b = rects[j];
    if (a.left < b.right - 0.6 && b.left < a.right - 0.6 && a.top < b.bottom - 0.6 && b.top < a.bottom - 0.6) fails.push(`cards ${i + 1} and ${j + 1} overlap`);
  }
  if (!cards.length) fails.push('no cards');
  return fails;
}

function panelMin(d) { return 16 + 4 + d.tile + 4 + 22 + LANE_PAD_BORDER; }   // arrow row 16 (flagScale 1) + gap + tiles + gap + band + padding/border

module.exports = {
  id: 'G1-308',
  slug: 'read-and-do',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'read-and-do',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { pics: 6, tile: 92, pic: 76, gap: 8, rows: 6, rowMin: 82, rowGap: 8, fontPx: 19, verbs: ['circle', 'cross', 'mark', 'write'], minVerbs: 3, maxPerVerb: 2, maxPerCue: 3, cues: ['unique', 'all', 'first', 'last'], ordMax: 0, ordWindow: 6, nounsMin: 5, nounsMax: 5, maxCount: 2 },
    2: { pics: 8, tile: 76, pic: 64, gap: 5, rows: 6, rowMin: 85, rowGap: 8, fontPx: 18, verbs: VERB_IDS.slice(), minVerbs: 4, maxPerVerb: 2, maxPerCue: 2, cues: ['unique', 'all', 'ordinal', 'first', 'last'], ordMax: 4, ordWindow: 6, nounsMin: 5, nounsMax: 6, maxCount: 4 },
    3: { pics: 8, tile: 76, pic: 64, gap: 5, rows: 7, rowMin: 73, rowGap: 6, fontPx: 17, verbs: VERB_IDS.slice(), minVerbs: 5, maxPerVerb: 2, maxPerCue: 2, cues: ['unique', 'all', 'ordinal', 'first', 'last', 'between', 'rightof', 'leftof'], ordMax: 4, ordWindow: 6, nounsMin: 5, nounsMax: 7, maxCount: 4 },
  },
  i18n: {
    en: {
      title: 'Read and Do: Follow the Instructions',
      instruction: 'Look at the row of pictures and start at the flag. Read each sentence and do exactly what it says with your pencil. Then check the little box.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { theme, locale }, ctx) {
    if (!d) throw new Error('G1-308: no difficulty config');
    if (d.mode === 'draw') return this._buildDraw(bankLoc, d, { theme, locale }, ctx);     // F5 (Phase 2)
    if (d.mode === 'truth') return this._buildTruth(bankLoc, d, { theme, locale }, ctx);   // F4 (Phase 2)
    if (d.steps != null && d.steps !== 1) return this._buildSteps(bankLoc, d, { theme, locale }, ctx);   // F2 (Phase 2)
    if (d.mode != null) throw new Error(`G1-308: unknown mode "${d.mode}"`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!theme) throw new Error('G1-308: a theme is required (themed type)');
    if (BW_MARK.test(theme)) throw new Error(`G1-308: theme "${theme}" is a B&W theme — colour art only, the verb set has no colour (refused)`);
    if (!bankLoc || !Array.isArray(bankLoc.verbs) || !bankLoc.objForms) throw new Error(`G1-308: the ${loc} bank has no verbs/objForms`);
    for (const id of d.verbs) if (!bankLoc.verbs.some((v) => v.id === id)) throw new Error(`G1-308: the ${loc} bank has no "${id}" frame`);
    for (const v of bankLoc.verbs) slotPlan(v);   // every frame inside the slot contract, or throw
    const stripW = d.pics * d.tile + (d.pics - 1) * d.gap;
    if (stripW > LANE_INNER) throw new Error(`G1-308: strip ${stripW} > lane inner ${LANE_INNER}`);
    if (d.rows < 6 || d.rows > 12) throw new Error(`G1-308: ${d.rows} rows outside the G1 item band [6,12]`);
    if (d.pic < 44) throw new Error(`G1-308: picture ${d.pic} < the G1 floor 44`);
    if (d.ordMax > d.maxCount) throw new Error(`G1-308: ordMax ${d.ordMax} > maxCount ${d.maxCount} (an unreachable ordinal)`);
    if (d.nounsMin + d.maxCount - 1 > d.pics) throw new Error(`G1-308: nounsMin ${d.nounsMin} + maxCount ${d.maxCount} - 1 > pics ${d.pics}`);

    // pool: countable theme nouns the bank carries a reviewed, fully-formed entry for
    const pool = entriesFor(theme, loc).filter(countable).filter((e) => {
      const f = bankLoc.objForms[e.vocabKey];
      return f && f.reviewed === true && f.unique && f.all && f.pl;
    });
    if (pool.length < 8) throw new Error(`G1-308: theme "${theme}"/${loc} has ${pool.length} usable nouns < 8 (refused — the ${loc} bank lacks reviewed forms)`);

    let rows = null, strip = null, lastCands = null;
    for (let s = 0; s < MAX_STRIPS && !rows; s++) {
      const items = sampleStrip(rng, pool, d);
      strip = items.map((e) => e.vocabKey);
      const cands = candidates(bankLoc, strip, d);
      lastCands = cands;
      const verbsSeen = new Set(cands.map((c) => c.action));
      const missing = d.verbs.filter((v) => !verbsSeen.has(v));
      if (missing.length) {
        // a verb with no legal sentence over ANY strip of this pool is a refusal (fi `write` without partitives)
        const anyStrip = candidates(bankLoc, pool.map((e) => e.vocabKey).slice(0, d.pics), d);
        for (const v of missing) if (!anyStrip.some((c) => c.action === v) && !cands.some((c) => c.action === v)) throw new Error(`G1-308: verb "${v}" has no legal sentence over theme "${theme}"/${loc} (the bank lacks the form its frame needs — refused)`);
        continue;
      }
      rows = select(rng, cands, d);
      if (rows) rows = rows.map((r, i) => ({ ...r, n: i + 1, noun: r.noun, noun2: r.noun2 }));
      else strip = null;
    }
    if (!rows) throw new Error(`G1-308: no page of ${d.rows} compatible instructions over theme "${theme}"/${loc} in ${MAX_STRIPS}×${MAX_TRIES} tries (${lastCands ? lastCands.length : 0} candidates on the last strip — refused)`);

    const stripItems = strip.map((k) => pool.find((e) => e.vocabKey === k));
    const stripHtml = pictureStrip({ theme, items: stripItems.map((e) => ({ noun: e.noun, vocabKey: e.vocabKey })), tile: d.tile, pic: d.pic, gap: d.gap, arrow: true, band: true });
    const minH = panelMin(d);
    const panel = lineUpPanel({ strip: stripHtml.html, below: '', minH, attrs: 'data-lcs-panel' });   // never a style attr here: lineUpPanel emits its own (a duplicate attribute drops the inline padding)
    const list = instructionList({ rows, rowMin: d.rowMin, rowGap: d.rowGap, fontPx: d.fontPx, doneBox: true });
    const bodyHtml = `<div data-ws-content data-lcs-rad data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-strip="${strip.join(',')}" data-lcs-n="${d.pics}" ` +
      `data-lcs-rowsn="${d.rows}" data-lcs-minverbs="${d.minVerbs}" data-lcs-maxperverb="${d.maxPerVerb}" data-lcs-maxpercue="${d.maxPerCue}" data-lcs-verbs="${d.verbs.join(',')}" data-lcs-cues="${d.cues.join(',')}" ` +
      `data-lcs-ordmax="${d.ordMax}" data-lcs-ordwindow="${d.ordWindow}" data-lcs-pic="${d.pic}" data-lcs-tile="${d.tile}" ` +
      (d.maxPerPair != null ? `data-lcs-maxperpair="${d.maxPerPair}" ` : '') + (d.maxPerNoun != null ? `data-lcs-maxpernoun="${d.maxPerNoun}" ` : '') +   // F1 / F2 knobs: stamped only when declared
      `style="flex:1;display:flex;flex-direction:column;gap:${GRID_GAP}px;min-height:0">${panel}${list}</div>`;
    return { bodyHtml, meta: { strip, rows: rows.map((r) => [r.action, r.cue, r.noun, r.noun2, r.targets.join(','), r.answer]) } };
  },

  /* ------------------------------------------------------------ faces (Phase 2; every path below is unreachable from the base configs) */
  /** The faces' shared preflight (the base's own guard sequence + pool, verbatim in effect; the base keeps its inline copy so its path is untouched). */
  _facePreflight(bankLoc, d, theme, loc, { needStrip = true } = {}) {
    if (!theme) throw new Error('G1-308: a theme is required (themed type)');
    if (BW_MARK.test(theme)) throw new Error(`G1-308: theme "${theme}" is a B&W theme — colour art only, the verb set has no colour (refused)`);
    if (!bankLoc || !Array.isArray(bankLoc.verbs) || !bankLoc.objForms) throw new Error(`G1-308: the ${loc} bank has no verbs/objForms`);
    for (const v of bankLoc.verbs) slotPlan(v);
    if (needStrip) {
      for (const id of d.verbs) if (!bankLoc.verbs.some((v) => v.id === id)) throw new Error(`G1-308: the ${loc} bank has no "${id}" frame`);
      const stripW = d.pics * d.tile + (d.pics - 1) * d.gap;
      if (stripW > LANE_INNER) throw new Error(`G1-308: strip ${stripW} > lane inner ${LANE_INNER}`);
      if (d.pic < 44) throw new Error(`G1-308: picture ${d.pic} < the G1 floor 44`);
      if (d.ordMax > d.maxCount) throw new Error(`G1-308: ordMax ${d.ordMax} > maxCount ${d.maxCount} (an unreachable ordinal)`);
      if (d.nounsMin + d.maxCount - 1 > d.pics) throw new Error(`G1-308: nounsMin ${d.nounsMin} + maxCount ${d.maxCount} - 1 > pics ${d.pics}`);
    }
    const pool = entriesFor(theme, loc).filter(countable).filter((e) => {
      const f = bankLoc.objForms[e.vocabKey];
      return f && f.reviewed === true && f.unique && f.all && f.pl;
    });
    if (pool.length < 8) throw new Error(`G1-308: theme "${theme}"/${loc} has ${pool.length} usable nouns < 8 (refused — the ${loc} bank lacks reviewed forms)`);
    return pool;
  },

  /** {n} as the bank's number word when the block carries `numbers`, else the numeral (the panel's call). */
  _numText(bankLoc, n) {
    const w = bankLoc.numbers && bankLoc.numbers[n];
    return typeof w === 'string' && w.length ? w : String(n);
  },

  /** F2: clause 1 minus its full stop + the `and` literal + clause 2 (its panel `frame2` text, else the first letter lowered). PURE — the gate re-joins from the bank. */
  _joinSteps(bankLoc, loc, c1, c2) {
    const verb2 = bankLoc.verbs.find((v) => v.id === c2.action);
    let second = c2.text;
    if (verb2 && verb2.frame2) {
      // a panel-authored second-clause frame (lowercase, same slots) — re-fill it from the same forms
      second = sentenceFor(bankLoc, { ...verb2, frame: verb2.frame2 }, c2.cue, c2.k, c2.noun || null, c2.noun2 || null);
      if (!second) return null;
    } else {
      second = second.charAt(0).toLocaleLowerCase(loc) + second.slice(1);
    }
    return c1.text.replace(/\.$/, '') + ' ' + bankLoc.and + ' ' + second;
  },

  /* ---------------------------------------------------------------- F2 · steps:2 */
  _buildSteps(bankLoc, d, { theme, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (d.steps !== 2) throw new Error(`G1-308: steps ${d.steps} unsupported (2 only)`);
    if (!bankLoc || typeof bankLoc.and !== 'string' || !bankLoc.and.trim()) throw new Error(`G1-308: the ${loc} bank has no "and" literal (F2 refused)`);
    const items = d.rows * d.steps;
    if (items < 6 || items > 12) throw new Error(`G1-308: ${items} items (rows × steps) outside the G1 item band [6,12]`);
    const pool = this._facePreflight(bankLoc, d, theme, loc);
    const maxPerNoun = d.maxPerNoun || 2;
    const cap = d.sentenceCap || SENTENCE_CAP;

    const pickRows = (cands) => {
      for (let t = 0; t < MAX_TRIES; t++) {
        const used = new Set(), pairs = new Set(), nounUse = {}, texts = new Set(), verbs = new Set(), verbUse = {}, cueUse = {};
        const rows = [];
        const order = rng.shuffle(cands);
        // fits(c, after): the page caps with the counts of `after` (the row's first clause) already applied
        const fits = (c, after) => {
          const plus = (k, v) => (after && after[k] === v ? 1 : 0);
          if (c.targets.some((i) => used.has(i))) return false;
          if (pairs.has(c.action + '|' + cueKind(c.cue))) return false;
          if (after && after.action + '|' + cueKind(after.cue) === c.action + '|' + cueKind(c.cue)) return false;
          if ((verbUse[c.action] || 0) + plus('action', c.action) >= d.maxPerVerb) return false;
          if ((cueUse[cueKind(c.cue)] || 0) + (after && cueKind(after.cue) === cueKind(c.cue) ? 1 : 0) >= d.maxPerCue) return false;
          if ([c.noun, c.noun2].filter(Boolean).some((x) => (nounUse[x] || 0) + (after && [after.noun, after.noun2].includes(x) ? 1 : 0) >= maxPerNoun)) return false;
          return !texts.has(c.text);
        };
        const take = (c) => {
          c.targets.forEach((i) => used.add(i));
          pairs.add(c.action + '|' + cueKind(c.cue));
          [c.noun, c.noun2].filter(Boolean).forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; });
          texts.add(c.text); verbs.add(c.action);
          verbUse[c.action] = (verbUse[c.action] || 0) + 1;
          cueUse[cueKind(c.cue)] = (cueUse[cueKind(c.cue)] || 0) + 1;
        };
        for (const c1 of order) {
          if (rows.length === d.rows) break;
          if (!fits(c1)) continue;
          const n1 = new Set([c1.noun, c1.noun2].filter(Boolean));
          let hit = null;
          for (const c2 of order) {
            if (c2 === c1 || c2.action === c1.action) continue;
            if (c2.targets.some((i) => c1.targets.includes(i))) continue;
            if ([c2.noun, c2.noun2].filter(Boolean).some((x) => n1.has(x))) continue;
            if (!fits(c2, c1)) continue;
            const text = this._joinSteps(bankLoc, loc, c1, c2);
            if (!text || [...text].length > cap || texts.has(text)) continue;
            hit = { c2, text };
            break;
          }
          if (!hit) continue;
          take(c1); take(hit.c2);
          const targets = [...c1.targets, ...hit.c2.targets].sort((x, y) => x - y);
          rows.push({ action: 'two-step', cue: 'steps', noun: '', noun2: '', targets, text: hit.text, answer: null, steps: [c1, hit.c2] });
        }
        if (rows.length === d.rows && verbs.size >= d.minVerbs) return rows;
      }
      return null;
    };

    let rows = null, strip = null, lastCands = null;
    for (let s = 0; s < MAX_STRIPS && !rows; s++) {
      const its = sampleStrip(rng, pool, d);
      strip = its.map((e) => e.vocabKey);
      const cands = candidates(bankLoc, strip, d);
      lastCands = cands;
      const verbsSeen = new Set(cands.map((c) => c.action));
      const missing = d.verbs.filter((v) => !verbsSeen.has(v));
      if (missing.length) {
        const anyStrip = candidates(bankLoc, pool.map((e) => e.vocabKey).slice(0, d.pics), d);
        for (const v of missing) if (!anyStrip.some((c) => c.action === v) && !cands.some((c) => c.action === v)) throw new Error(`G1-308: verb "${v}" has no legal sentence over theme "${theme}"/${loc} (the bank lacks the form its frame needs — refused)`);
        continue;
      }
      rows = pickRows(cands);
      if (rows) rows = rows.map((r, i) => ({ ...r, n: i + 1 }));
      else strip = null;
    }
    if (!rows) throw new Error(`G1-308: no page of ${d.rows} two-step instructions over theme "${theme}"/${loc} in ${MAX_STRIPS}×${MAX_TRIES} tries (${lastCands ? lastCands.length : 0} candidates on the last strip — refused)`);

    const stripItems = strip.map((k) => pool.find((e) => e.vocabKey === k));
    const stripHtml = pictureStrip({ theme, items: stripItems.map((e) => ({ noun: e.noun, vocabKey: e.vocabKey })), tile: d.tile, pic: d.pic, gap: d.gap, arrow: true, band: true });
    const panel = lineUpPanel({ strip: stripHtml.html, below: '', minH: panelMin(d), attrs: 'data-lcs-panel' });
    const list = instructionList({ rows, rowMin: d.rowMin, rowGap: d.rowGap, fontPx: d.fontPx, doneBox: true });
    const bodyHtml = `<div data-ws-content data-lcs-rad data-lcs-steps="${d.steps}" data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-strip="${strip.join(',')}" data-lcs-n="${d.pics}" ` +
      `data-lcs-rowsn="${d.rows}" data-lcs-minverbs="${d.minVerbs}" data-lcs-maxperverb="${d.maxPerVerb}" data-lcs-maxpercue="${d.maxPerCue}" data-lcs-maxpernoun="${maxPerNoun}" data-lcs-verbs="${d.verbs.join(',')}" data-lcs-cues="${d.cues.join(',')}" ` +
      `data-lcs-ordmax="${d.ordMax}" data-lcs-ordwindow="${d.ordWindow}" data-lcs-pic="${d.pic}" data-lcs-tile="${d.tile}" data-lcs-cap="${cap}" data-lcs-and="${bankLoc.and}" ` +
      `style="flex:1;display:flex;flex-direction:column;gap:${GRID_GAP}px;min-height:0">${panel}${list}</div>`;
    return { bodyHtml, meta: { strip, rows: rows.map((r) => r.steps.map((s) => [s.action, s.cue, s.noun, s.noun2, s.targets.join(','), s.answer])) } };
  },

  /* ---------------------------------------------------------------- F4 · mode:'truth' */
  /** Every evaluable statement over a strip: {cue, k, noun, noun2, nval, rel, truth, falseBy, frame, text}. PURE (the gate re-derives). */
  _truthCandidates(bankLoc, strip, d) {
    const tr = bankLoc.truth || {};
    const frames = Array.isArray(tr.frames) ? tr.frames : [];
    const occ = occurrences(strip);
    const nouns = [...occ.keys()];
    const n = strip.length;
    const out = [];
    const cap = d.statementCap || STATEMENT_CAP;
    const push = (fi, f, cue, k, nounA, nounB, nval, rel, truth, falseBy, slots) => {
      let text;
      try { text = fillSlots(f.text, slots); } catch (e) { return; }
      if ([...text].length > cap) return;
      out.push({ frame: fi, cue, k, noun: nounA || '', noun2: nounB || '', nval: nval == null ? '' : nval, rel: rel || '', truth: truth ? 1 : 0, falseBy: truth ? '' : falseBy, text });
    };
    const uniqueForm = (a) => { const f = bankLoc.objForms[a]; return f && f.reviewed ? f.unique : null; };
    frames.forEach((f, fi) => {
      const kind = f.cue;
      if (!d.cues.includes(kind)) return;
      if (kind === 'count') {
        const rel = TRUTH_RELS[f.rel] ? f.rel : null;
        if (!rel) return;
        if (nouns.length < 2) return;
        for (const a of nouns) {
          const c = occ.get(a).length;
          const pl = bankLoc.objForms[a] && bankLoc.objForms[a].reviewed ? bankLoc.objForms[a].pl : null;
          if (!pl || c > 4) continue;
          for (let v = 1; v <= N_MAX; v++) {
            const t = TRUTH_RELS[rel](c, v);
            if (rel === 'eq' && !t && v > 4) continue;        // a false "exactly five" over a 4-max strip reads as a trick
            if (rel !== 'eq' && Math.abs(c - v) > 2) continue;  // more/fewer than N stays within 2 of the count ("fewer than five" over one pig is a trick)
            push(fi, f, 'count', null, a, null, v, rel, t, 'count', { n: this._numText(bankLoc, v), pl });
          }
        }
        return;
      }
      if (kind === 'first' || kind === 'last') {
        const at = strip[kind === 'first' ? 0 : n - 1];
        for (const a of nouns) { const u = uniqueForm(a); if (u) push(fi, f, kind, null, a, null, null, null, a === at, 'position', { obj: u }); }
        return;
      }
      if (kind === 'ordinal') {
        const k = +f.k;
        if (!(k >= 2 && k <= d.ordMax && k <= n)) return;
        const at = strip[k - 1];
        for (const a of nouns) { const u = uniqueForm(a); if (u) push(fi, f, 'ordinal:' + k, k, a, null, null, null, a === at, 'position', { obj: u }); }
        return;
      }
      if (kind === 'rightof' || kind === 'leftof') {
        for (const a of nouns) {
          const o = occ.get(a);
          if (o.length !== 1) continue;
          const i = o[0];
          const j = kind === 'rightof' ? i + 1 : i - 1;
          if (j < 0 || j >= n) continue;
          const u = uniqueForm(a);
          if (!u) continue;
          for (const b of nouns) { if (b === a) continue; const u2 = uniqueForm(b); if (u2) push(fi, f, kind, null, a, b, null, null, strip[j] === b, 'position', { obj: u, obj2: u2 }); }
        }
      }
    });
    return out;
  },

  _buildTruth(bankLoc, d, { theme, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const tr = bankLoc && bankLoc.truth;
    if (!tr || !Array.isArray(tr.frames) || tr.frames.length < 8) throw new Error(`G1-308: the ${loc} bank has ${tr && tr.frames ? tr.frames.length : 0} truth frames < 8 (F4 refused)`);
    if (!tr.yes || !tr.no || tr.yes === tr.no) throw new Error(`G1-308: the ${loc} bank has no distinct truth.yes / truth.no (F4 refused)`);
    if (d.rows < 6 || d.rows > 12) throw new Error(`G1-308: ${d.rows} rows outside the G1 item band [6,12]`);
    if (!(d.truePerPage >= 1 && d.truePerPage < d.rows)) throw new Error(`G1-308: truePerPage ${d.truePerPage} outside 1..${d.rows - 1}`);
    const pool = this._facePreflight(bankLoc, d, theme, loc);
    const maxPerNoun = d.maxPerNoun || 2;

    const pick = (cands) => {
      for (let t = 0; t < MAX_TRIES; t++) {
        const rows = [], texts = new Set(), nounUse = {}, cueUse = {}, frameUse = {};
        let trues = 0;
        for (const c of rng.shuffle(cands)) {
          if (rows.length === d.rows) break;
          const kind = cueKind(c.cue);
          if (texts.has(c.text)) continue;
          if ((cueUse[kind] || 0) >= d.maxPerCue) continue;
          if ((frameUse[c.frame] || 0) >= 2) continue;
          if ([c.noun, c.noun2].filter(Boolean).some((x) => (nounUse[x] || 0) >= maxPerNoun)) continue;
          if (c.truth && trues >= d.truePerPage) continue;
          if (!c.truth && rows.length - trues >= d.rows - d.truePerPage) continue;
          rows.push(c); texts.add(c.text); trues += c.truth;
          cueUse[kind] = (cueUse[kind] || 0) + 1; frameUse[c.frame] = (frameUse[c.frame] || 0) + 1;
          [c.noun, c.noun2].filter(Boolean).forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; });
        }
        if (rows.length === d.rows && trues === d.truePerPage && new Set(rows.map((r) => cueKind(r.cue))).size >= Math.min(3, d.cues.length)) return rng.shuffle(rows);
      }
      return null;
    };

    let rows = null, strip = null;
    for (let s = 0; s < MAX_STRIPS && !rows; s++) {
      const its = sampleStrip(rng, pool, d);
      strip = its.map((e) => e.vocabKey);
      rows = pick(this._truthCandidates(bankLoc, strip, d));
      if (rows) rows = rows.map((r, i) => ({ ...r, n: i + 1 }));
      else strip = null;
    }
    if (!rows) throw new Error(`G1-308: no page of ${d.rows} true/false statements (${d.truePerPage} true) over theme "${theme}"/${loc} in ${MAX_STRIPS}×${MAX_TRIES} tries — refused`);

    const stripItems = strip.map((k) => pool.find((e) => e.vocabKey === k));
    const stripHtml = pictureStrip({ theme, items: stripItems.map((e) => ({ noun: e.noun, vocabKey: e.vocabKey })), tile: d.tile, pic: d.pic, gap: d.gap, arrow: true, band: true });
    const panel = lineUpPanel({ strip: stripHtml.html, below: '', minH: panelMin(d), attrs: 'data-lcs-panel' });
    const listRows = rows.map((r) => ({
      n: r.n, action: 'truth', cue: r.cue, k: r.k, noun: r.noun, noun2: r.noun2, targets: [], text: r.text, truth: { yes: tr.yes, no: tr.no },
      attrs: `data-lcs-truth="${r.truth}" data-lcs-false-by="${r.falseBy}" data-lcs-nval="${r.nval}" data-lcs-rel="${r.rel}" data-lcs-frame="${r.frame}"`,
    }));
    const list = instructionList({ rows: listRows, rowMin: d.rowMin, rowGap: d.rowGap, fontPx: d.fontPx, doneBox: false, chipsW: d.chipsW || 250 });
    const bodyHtml = `<div data-ws-content data-lcs-rad data-lcs-mode="truth" data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-strip="${strip.join(',')}" data-lcs-n="${d.pics}" ` +
      `data-lcs-rowsn="${d.rows}" data-lcs-trueper="${d.truePerPage}" data-lcs-maxpercue="${d.maxPerCue}" data-lcs-maxpernoun="${maxPerNoun}" data-lcs-cues="${d.cues.join(',')}" data-lcs-ordmax="${d.ordMax}" ` +
      `data-lcs-pic="${d.pic}" data-lcs-tile="${d.tile}" data-lcs-cap="${d.statementCap || STATEMENT_CAP}" data-lcs-yes="${tr.yes}" data-lcs-no="${tr.no}" ` +
      `style="flex:1;display:flex;flex-direction:column;gap:${GRID_GAP}px;min-height:0">${panel}${list}</div>`;
    return { bodyHtml, meta: { strip, rows: rows.map((r) => [r.cue, r.noun, r.noun2, r.nval, r.rel, r.truth, r.falseBy]) } };
  },

  /* ---------------------------------------------------------------- F5 · mode:'draw' */
  _buildDraw(bankLoc, d, { theme, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const frames = bankLoc && Array.isArray(bankLoc.draw) ? bankLoc.draw.filter((f) => f && typeof f.text === 'string') : [];
    for (const f of frames) {
      const sl = slotsIn(f.text);
      if (!sl.includes('n') || !(sl.includes('pl') || sl.includes('part')) || sl.some((x) => !['n', 'pl', 'part'].includes(x))) throw new Error(`G1-308: draw frame "${f.text}" must carry {n} + {pl} (fi {part}) and nothing else`);
      if (loc === 'fi' && !sl.includes('part')) throw new Error(`G1-308: fi draw frame "${f.text}" must take {part} (partitive after a numeral)`);
    }
    if (frames.length < 4) throw new Error(`G1-308: the ${loc} bank has ${frames.length} draw frames < 4 (F5 refused)`);
    const cards = d.cards;
    if (!(cards >= 6 && cards <= 12)) throw new Error(`G1-308: ${cards} cards outside the G1 item band [6,12]`);
    if (!(d.nMin >= 2 && d.nMax >= d.nMin && d.nMax <= N_MAX)) throw new Error(`G1-308: n range ${d.nMin}..${d.nMax} outside 2..${N_MAX} (the frames are PLURAL — n = 1 needs a singular frame + an indefinite-singular form per noun, unauthored)`);
    if (d.cols * d.rows !== cards) throw new Error(`G1-308: ${d.cols}×${d.rows} grid != ${cards} cards`);
    const pool = this._facePreflight(bankLoc, d, theme, loc, { needStrip: false });
    let out = null;
    for (let t = 0; t < MAX_TRIES && !out; t++) {
      const picked = rng.sample(pool, cards);
      if (picked.some((a, i) => picked.some((b, j) => j > i && lookalike(a.vocabKey, b.vocabKey)))) continue;
      const ns = picked.map(() => rng.int(d.nMin, d.nMax));
      if (d.nMax > d.nMin && new Set(ns).size < 2) continue;                       // the count varies on the page
      const fs = picked.map(() => rng.int(0, frames.length - 1));
      if (new Set(fs).size < Math.min(3, frames.length)) continue;                 // the frame varies on the page
      const texts = new Set();
      const built = [];
      for (let i = 0; i < cards; i++) {
        const f = bankLoc.objForms[picked[i].vocabKey];
        let text;
        const sl = slotsIn(frames[fs[i]].text);
        const nounForm = sl.includes('part') ? f.part : f.pl;
        if (!nounForm) { built.length = 0; break; }   // a fi noun without a partitive drops (never substituted)
        try { text = fillSlots(frames[fs[i]].text, { n: this._numText(bankLoc, ns[i]), [sl.includes('part') ? 'part' : 'pl']: nounForm }); } catch (e) { text = null; }
        if (!text || texts.has(text) || [...text].length > SENTENCE_CAP) { built.length = 0; break; }
        texts.add(text);
        built.push({ n: i + 1, noun: picked[i].vocabKey, nval: ns[i], frame: fs[i], text });
      }
      if (built.length === cards) out = built;
    }
    if (!out) throw new Error(`G1-308: no page of ${cards} draw cards over theme "${theme}"/${loc} in ${MAX_TRIES} tries — refused`);
    const grid = drawCards({ cards: out, cols: d.cols, rows: d.rows, drawW: d.drawW, drawH: d.drawH, fontPx: d.fontPx });
    const bodyHtml = `<div data-ws-content data-lcs-rad data-lcs-mode="draw" data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-cards="${cards}" ` +
      `data-lcs-nmin="${d.nMin}" data-lcs-nmax="${d.nMax}" data-lcs-draww="${d.drawW}" data-lcs-drawh="${d.drawH}" data-lcs-cap="${SENTENCE_CAP}" ` +
      `style="flex:1;display:flex;flex-direction:column;min-height:0">${grid}</div>`;
    return { bodyHtml, meta: { cards: out.map((c) => [c.noun, c.nval, c.frame]) } };
  },


  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-lcs-rad]'); return r ? { mode: r.dataset.lcsMode || '', steps: +(r.dataset.lcsSteps || 1) } : null; });
    if (face && face.mode === 'draw') return page.evaluate(VERIFY_DRAW, TEXT_LINTS.toString());
    if (face && face.mode === 'truth') return page.evaluate(VERIFY_TRUTH, STRIP_CHECKS.toString(), TEXT_LINTS.toString());
    if (face && face.steps === 2) return page.evaluate(VERIFY_STEPS, STRIP_CHECKS.toString(), DERIVE_WANT.toString(), TEXT_LINTS.toString());
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-rad]');
      if (!root) return ['no read-and-do root'];
      const strip = (root.dataset.lcsStrip || '').split(',').filter(Boolean);
      const n = +root.dataset.lcsN, rowsN = +root.dataset.lcsRowsn, minVerbs = +root.dataset.lcsMinverbs, maxPerVerb = +root.dataset.lcsMaxperverb, maxPerCue = +root.dataset.lcsMaxpercue;
      const ordMax = +root.dataset.lcsOrdmax, ordWindow = +root.dataset.lcsOrdwindow;
      const maxPerPair = +(root.dataset.lcsMaxperpair || 1), maxPerNoun = +(root.dataset.lcsMaxpernoun || 2);   // F1 / F2 knobs; absent = the base rule
      const verbs = (root.dataset.lcsVerbs || '').split(',').filter(Boolean);
      const cues = (root.dataset.lcsCues || '').split(',').filter(Boolean);
      const theme = root.dataset.lcsTheme || '';
      if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(theme)) fails.push(`theme "${theme}" carries a B&W marker`);
      if (!(n >= 4) || strip.length !== n) fails.push(`strip has ${strip.length} nouns, n=${n}`);
      const occ = {};
      strip.forEach((x, i) => { (occ[x] = occ[x] || []).push(i); });
      const nouns = Object.keys(occ);
      if (nouns.length < 2) fails.push('fewer than 2 distinct nouns on the strip');
      // tiles
      const tiles = [...root.querySelectorAll('[data-lcs-idx]')];
      if (tiles.length !== n) fails.push(`${tiles.length} tiles, n=${n}`);
      const sizes = new Set();
      tiles.forEach((t) => {
        const idx = +t.dataset.lcsIdx;
        const img = t.querySelector('img');
        if (!img) { fails.push(`tile ${idx}: no picture`); return; }
        if (t.textContent.trim()) fails.push(`tile ${idx} carries text "${t.textContent.trim().slice(0, 12)}"`);
        if (t.querySelector('text')) fails.push(`tile ${idx} carries SVG text`);
        if (img.hasAttribute('alt')) fails.push(`tile ${idx} img carries alt`);
        if (!img.complete || img.naturalWidth === 0) fails.push(`tile ${idx} picture broken`);
        if (/(^|\s|%20)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%2F)/i.test(decodeURIComponent(img.getAttribute('src') || ''))) fails.push(`tile ${idx}: a B&W picture path`);
        const cs = getComputedStyle(img);
        if (cs.opacity !== '1') fails.push(`tile ${idx}: opacity leak`);
        if (cs.transform !== 'none') fails.push(`tile ${idx}: transform leak`);
        sizes.add(img.style.width + 'x' + img.style.height);
      });
      if (sizes.size > 1) fails.push('tile pictures differ in size (target leak)');
      const ordered = tiles.slice().sort((a, b) => +a.dataset.lcsIdx - +b.dataset.lcsIdx);
      ordered.forEach((t, i) => {
        if (+t.dataset.lcsIdx !== i) fails.push(`tile indices are not 0..${n - 1}`);
        if (i && t.getBoundingClientRect().left <= ordered[i - 1].getBoundingClientRect().left) fails.push(`tile ${i} is not to the right of tile ${i - 1}`);
      });
      if (!root.querySelector('[data-lcs-flag]')) fails.push('no start flag');
      if (!root.querySelector('[data-lcs-band]')) fails.push('no mark band');
      // rows
      const rows = [...root.querySelectorAll('[data-lcs-row]')];
      if (rows.length !== rowsN) fails.push(`${rows.length} rows, config says ${rowsN}`);
      if (rows.length < 6 || rows.length > 12) fails.push(`${rows.length} items outside [6,12]`);
      const usedTargets = new Set(), pairs = {}, nounUse = {}, texts = new Set(), verbSet = new Set(), writeCounts = new Set(), verbUse = {}, cueUse = {};
      rows.forEach((r, i) => {
        const R = `row ${i + 1}`;
        const action = r.dataset.lcsAction, cue = r.dataset.lcsCue || '', noun = r.dataset.lcsNoun || '', noun2 = r.dataset.lcsNoun2 || '';
        const targets = (r.dataset.lcsTargets || '').split(',').filter((x) => x !== '').map(Number);
        const text = r.dataset.lcsText || '';
        const kind = cue.split(':')[0];
        if (+r.dataset.lcsN !== i + 1) fails.push(`${R}: numbered ${r.dataset.lcsN}`);
        const badge = r.querySelector('[data-lcs-badge]');
        if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${R}: badge != ${i + 1}`);
        if (!verbs.includes(action)) fails.push(`${R}: action "${action}" not in the config verbs`);
        const p = r.querySelector('[data-lcs-textnode]');
        if (!p || p.textContent.trim() !== text) fails.push(`${R}: printed text != data-lcs-text`);
        if (/\{/.test(text)) fails.push(`${R}: unfilled slot`);
        if (/  /.test(text)) fails.push(`${R}: double space`);
        if (/ \./.test(text)) fails.push(`${R}: space before the full stop`);
        if (!/^\p{Lu}/u.test(text)) fails.push(`${R}: does not start with a capital`);
        if (!/\.$/.test(text)) fails.push(`${R}: does not end with a full stop`);
        if (!r.querySelector('[data-lcs-done]')) fails.push(`${R}: no done box`);
        if (r.querySelector('[data-lcs-done]') && r.querySelector('[data-lcs-done]').textContent.trim()) fails.push(`${R}: done box carries text`);
        // re-derive the targets
        let want = null;
        const c = (x) => (occ[x] || []).length;
        if (action === 'write') {
          if (kind !== 'count') fails.push(`${R}: write row cue "${cue}"`);
          if (!(c(noun) >= 1 && c(noun) <= 4)) fails.push(`${R}: write noun "${noun}" occurs ${c(noun)}x (want 1-4)`);
          if (nouns.length < 2) fails.push(`${R}: write over a one-noun strip`);
          want = [];
          const box = r.querySelector('.ws-answerbox');
          if (!box) fails.push(`${R}: write row has no answer box`);
          else {
            if (+box.dataset.lcsAnswer !== c(noun)) fails.push(`${R}: answer ${box.dataset.lcsAnswer} != ${c(noun)} pictures of ${noun}`);
            if (box.textContent.trim()) fails.push(`${R}: the answer is printed`);
            if (box.getBoundingClientRect().height < 26) fails.push(`${R}: answer box below the G1 answer floor 26`);
            if (writeCounts.has(c(noun))) fails.push(`${R}: a second write row with count ${c(noun)}`);
            writeCounts.add(c(noun));
          }
        } else {
          if (r.querySelector('.ws-answerbox')) fails.push(`${R}: a non-write row carries an answer box`);
          if (!cues.includes(kind) && !(action === 'line' && kind === 'unique')) fails.push(`${R}: cue "${cue}" not in the config cues`);
          if (action === 'line') {
            if (kind !== 'unique') fails.push(`${R}: line row cue "${cue}"`);
            if (!noun || !noun2 || noun === noun2) fails.push(`${R}: line needs two different nouns`);
            if (c(noun) !== 1 || c(noun2) !== 1) fails.push(`${R}: line nouns must be unique on the strip`);
            want = c(noun) === 1 && c(noun2) === 1 ? [occ[noun][0], occ[noun2][0]].sort((a, b) => a - b) : null;
          } else if (kind === 'unique') {
            if (c(noun) !== 1) fails.push(`${R}: "${noun}" occurs ${c(noun)}x, cue unique`);
            if (noun2) fails.push(`${R}: unique row names a second noun`);
            want = c(noun) === 1 ? occ[noun] : null;
          } else if (kind === 'all') {
            if (c(noun) < 2) fails.push(`${R}: "${noun}" occurs ${c(noun)}x, cue all needs >= 2`);
            if (nouns.length < 2) fails.push(`${R}: all over a one-noun strip`);
            want = occ[noun] || null;
          } else if (kind === 'ordinal') {
            const k = +cue.split(':')[1];
            if (!(k >= 2 && k <= ordMax)) fails.push(`${R}: ordinal k ${k} outside 2..${ordMax}`);
            if (+r.dataset.lcsK !== k) fails.push(`${R}: data-lcs-k ${r.dataset.lcsK} != ${k}`);
            if (c(noun) < k) fails.push(`${R}: "${noun}" occurs ${c(noun)}x, ordinal ${k}`);
            if ((occ[noun] || []).some((x) => x >= ordWindow)) fails.push(`${R}: "${noun}" has a picture beyond tile ${ordWindow}`);
            want = c(noun) >= k ? [occ[noun][k - 1]] : null;
          } else if (kind === 'first' || kind === 'last') {
            if (noun || noun2) fails.push(`${R}: ${kind} row names a noun`);
            want = [kind === 'first' ? 0 : n - 1];
          } else if (kind === 'between') {
            if (c(noun) !== 1 || c(noun2) !== 1) fails.push(`${R}: between needs two unique nouns`);
            const i1 = (occ[noun] || [])[0], i2 = (occ[noun2] || [])[0];
            if (i2 - i1 !== 2) fails.push(`${R}: between endpoints ${i1},${i2} are not 2 apart`);
            want = i2 - i1 === 2 ? [i1 + 1] : null;
          } else if (kind === 'rightof' || kind === 'leftof') {
            if (c(noun) !== 1) fails.push(`${R}: ${kind} needs a unique noun`);
            const i1 = (occ[noun] || [])[0];
            if (i1 === 0 || i1 === n - 1) fails.push(`${R}: ${kind} anchor at the edge`);
            want = c(noun) === 1 ? [kind === 'rightof' ? i1 + 1 : i1 - 1] : null;
          } else fails.push(`${R}: unknown cue "${cue}"`);
        }
        if (want && want.join(',') !== targets.join(',')) fails.push(`${R}: targets ${targets.join(',')} re-derive to ${want.join(',')}`);
        if (!want && action !== 'write' && !targets.length) fails.push(`${R}: no targets`);
        targets.forEach((t) => { if (!(t >= 0 && t < n)) fails.push(`${R}: target ${t} off the strip`); if (usedTargets.has(t)) fails.push(`${R}: tile ${t} is marked by two rows`); usedTargets.add(t); });
        const pk = action + '|' + kind;
        pairs[pk] = (pairs[pk] || 0) + 1; if (pairs[pk] > maxPerPair) fails.push(maxPerPair === 1 ? `${R}: (${action}, ${kind}) repeats` : `${R}: (${action}, ${kind}) on more than ${maxPerPair} rows`);
        [noun, noun2].filter(Boolean).forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; if (nounUse[x] > maxPerNoun) fails.push(`${R}: "${x}" named by more than ${maxPerNoun} rows`); });
        if (texts.has(text)) fails.push(`${R}: duplicate sentence`); texts.add(text);
        verbSet.add(action);
        verbUse[action] = (verbUse[action] || 0) + 1;
        if (verbUse[action] > maxPerVerb) fails.push(`${R}: "${action}" on more than ${maxPerVerb} rows`);
        cueUse[kind] = (cueUse[kind] || 0) + 1;
        if (cueUse[kind] > maxPerCue) fails.push(`${R}: cue "${kind}" on more than ${maxPerCue} rows`);
      });
      if (verbSet.size < minVerbs) fails.push(`${verbSet.size} distinct verbs < ${minVerbs}`);
      // no stray text anywhere but rows (the strip carries none)
      const panel = root.querySelector('[data-lcs-panel]');
      if (panel && panel.textContent.trim()) fails.push(`the strip panel carries text "${panel.textContent.trim().slice(0, 16)}"`);
      return fails;
    });
  },

  // the lookalike TABLE (data, not logic) so the gate can assert it without a second copy that drifts
  _LOOKALIKES: LOOKALIKES,
};
