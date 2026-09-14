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
 * index. F1 + F3 are PARAM faces over these keys (Phase 2); F2 / F4 / F5 add a
 * `steps` / `mode` knob + a verify() branch (Phase 2, not emitted here).
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
const { lineUpPanel, instructionList } = C3;

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
  for (let t = 0; t < MAX_TRIES; t++) {
    const used = new Set(), pairs = new Set(), nounUse = {}, texts = new Set(), verbs = new Set(), verbUse = {}, cueUse = {};
    const rows = [];
    for (const c of rng.shuffle(cands)) {
      if (rows.length === d.rows) break;
      if (c.targets.some((i) => used.has(i))) continue;
      const pk = c.action + '|' + cueKind(c.cue);
      if (pairs.has(pk)) continue;
      if ((verbUse[c.action] || 0) >= d.maxPerVerb) continue;
      if ((cueUse[cueKind(c.cue)] || 0) >= d.maxPerCue) continue;
      const names = [c.noun, c.noun2].filter(Boolean);
      if (names.some((x) => (nounUse[x] || 0) >= 2)) continue;
      if (texts.has(c.text)) continue;
      rows.push(c);
      c.targets.forEach((i) => used.add(i));
      pairs.add(pk);
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
      `style="flex:1;display:flex;flex-direction:column;gap:${GRID_GAP}px;min-height:0">${panel}${list}</div>`;
    return { bodyHtml, meta: { strip, rows: rows.map((r) => [r.action, r.cue, r.noun, r.noun2, r.targets.join(','), r.answer]) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-rad]');
      if (!root) return ['no read-and-do root'];
      const strip = (root.dataset.lcsStrip || '').split(',').filter(Boolean);
      const n = +root.dataset.lcsN, rowsN = +root.dataset.lcsRowsn, minVerbs = +root.dataset.lcsMinverbs, maxPerVerb = +root.dataset.lcsMaxperverb, maxPerCue = +root.dataset.lcsMaxpercue;
      const ordMax = +root.dataset.lcsOrdmax, ordWindow = +root.dataset.lcsOrdwindow;
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
      const usedTargets = new Set(), pairs = new Set(), nounUse = {}, texts = new Set(), verbSet = new Set(), writeCounts = new Set(), verbUse = {}, cueUse = {};
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
        if (pairs.has(pk)) fails.push(`${R}: (${action}, ${kind}) repeats`); pairs.add(pk);
        [noun, noun2].filter(Boolean).forEach((x) => { nounUse[x] = (nounUse[x] || 0) + 1; if (nounUse[x] > 2) fails.push(`${R}: "${x}" named by more than 2 rows`); });
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
