/**
 * G1-353 — Question Words: Who, What, Where (nt10-D; family key
 * `question-words`; G1 in en; the national framework NAME + band elsewhere;
 * en L.K.1.d on the base). Design:
 * docs/worksheet-gen/b4-designs/G1-353-question-words.md §2/§5 (critic record
 * _work/G1-353-critic.md; build record _work/G1-353-build.md).
 *
 * "Seven portraits down the left, seven single lines each carrying one warm
 * highlight, twenty-eight identical white chips in seven neat rows." Seven
 * numbered cream lanes; each opens with the SUBJECT's portrait (56 px, the
 * pronouns bank's OPENED people), then ONE answer sentence (Nunito 800 18) in
 * which the asked constituent is highlighted (coralSoft bar + 3 px coral
 * underline, `markedSpan`), and under it the same four question-word chips in
 * the same order on every row (Who · What · Where · When). The child reads the
 * sentence, looks at the highlighted words and circles the chip that ASKS for
 * them: a name → Who, a thing → What, a place → Where, a clock time → When.
 * The answer is never printed.
 *
 * THEMELESS (design §1): things are the MECHANICAL pool — every objForms key
 * (bank('instructions', loc)) with a colour picture in one of the six
 * G1-308-opened themes (en 133); persons = the pronouns bank's 12 tagged names
 * + 32 portraits (read, never copied); places = the bank's 15 OPENED literals;
 * times = 6 o'clock literals. No unit axis.
 *
 * THE RULE THAT LOCKS THE TYPE (design §1): every item is a FRAME instance —
 * `{name}` FIRST + verb + exactly ONE complement slot of a declared kind
 * (thing | place | time | count) — so `who` is always the SUBJECT and the
 * complement decides the second kind. The composer chooses the row's `ask ∈
 * {who, kindAsk}`; the marked span = the substituted literal of the asked slot
 * (`count` → the number word ONLY); the answer is `chips.indexOf(ask)`,
 * re-derived from the stamps. The code substitutes and marks; it never
 * inflects, capitalises, strips or shortens a literal.
 *
 * RULED (critic #1): the picture is the SUBJECT's portrait on EVERY row, never
 * the marked constituent's own picture — a constituent picture gives every
 * row's kind away without reading (person → Who, clock → When: 7 of 7); a
 * portrait on every row is constant-kind and scores only the `who` rows
 * (2 of 7 = 0.29 <= 0.35, `pictureBot`, asserted by verify() and the gate).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (never the
 * level index). resolveBase(d, bank):
 *   rows            6..12 (G1 window)
 *   chips           the page's chip kinds, a prefix-ordered subset of the fixed
 *                   who · what · where · when · howmany table (never shuffled)
 *   kinds           rows per ask (sum === rows; every key ∈ chips; each >= 1)
 *   picOf / picPx   'subject' (the portrait, base d2 / d3) | 'referent' (d1, the
 *                   unpublished scaffold: the marked constituent's own picture at
 *                   64 — a clock is refused at 64: round(64 x 0.115) = 7 px)
 *   maxChars        the FILLED sentence cap per row (a thing that overflows is
 *                   skipped, never squeezed); the strip guard: sum(chipW) +
 *                   12 x (n - 1) <= 531, chipW = the bank's MEASURED chipWidths
 *                   [label] else the estimate 24 + 12.4 x glyphs + 5, else the
 *                   page REFUSES that kind set
 *   chipPx / chipH / chipPad / rowMin / maxThings / botMax
 * build() reads ONLY data/b4/question-words.js (lib/b4-common.js bank) +
 * bank('pronouns') + bank('instructions').objForms (b3) + lib/b3-picture-index
 * candidates (pinned, deterministic) + fileUri + numberWord; never
 * image-vocabulary.js for any inflected form (the vocab is read ONLY for the
 * sv / da / no definite-clash exclusion, §5 rule 10), never pictureFor, never
 * SENTENCES frames, never approved-words.
 *
 * Chrome budget (design §2; the G1-352 gate MEASURED the README's "722" at 710
 * for a 3-line title + a 3-line instruction): row = max(56, 24 + 6 + 44) + 10
 * + 4 = 88; `repeat(7, minmax(88px, 1fr))` gap 8 = 664 <= 677 (a four-line fi
 * title) <= 710; slack opens inside the lanes.
 *
 * Answer hiding + stamps: root `[data-lcs-qw]` data-lcs-mode="base"
 * data-lcs-rows data-lcs-kinds data-lcs-botmax data-lcs-picof data-lcs-mixfloor;
 * lane `.ws-lane[data-ws-content][data-lcs-row]` data-lcs-frame data-lcs-kind
 * data-lcs-ask data-lcs-name data-lcs-slots (json of the filled literals);
 * `<p data-lcs-sentence>` with exactly one `<span data-lcs-mark>`; portrait
 * `img[data-lcs-pic="<theme>/<noun>"][data-lcs-pickind][data-lcs-depicted]`;
 * chips `[data-lcs-chip=<kind>][data-lcs-idx][data-lcs-label]` — no chip
 * carries a correct marker and all chips share one style string.
 *
 * PHASE 2 — the five faces (design §3): ONE additive `mode` knob (`match` /
 * `fill` / `sort` / `write` / `ask`) dispatched in `_buildWith` BEFORE the base
 * path consumes the RNG (the base's default output stays byte-identical). NOT
 * BUILT in this phase: a non-base `mode` throws "Phase 2".
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { bank: loadB3 } = require('../../lib/b3-common.js');
const { fileUri, vocab } = require('../../lib/b2-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { fillSlots, slotsIn } = require('../../lib/b3-instructions.js');
const { numberWord } = require('../../lib/number-words.js');
const { answerRow } = require('../../templates/components-b4.js');

const KEY = 'question-words';
const ID = 'G1-353';
const MAX_TRIES = 400;
const KIND_ORDER = ['who', 'what', 'where', 'when', 'howmany'];             // the fixed chip order (design §1 table B)
const KIND_ASK = { thing: 'what', place: 'where', time: 'when', count: 'howmany' };
const ASK_KIND = { what: 'thing', where: 'place', when: 'time', howmany: 'count' };
const THING_SLOTS = ['thing', 'part', 'dat'];
const SENTENCE_COL = 531;                                                   // 639 - 30 - 10 - 56 - 12 (design §2)
const CHIP_GAP = 12;
const CLASH_LOCALES = new Set(['sv', 'da', 'no']);                          // §5 rule 10: `unique` IS the definite form
const BW_MARKER = /(^|[\s_])(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;

function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function glyphs(s) { return [...String(s || '')].length; }

/* ------------------------------------------------------------------ pure helpers (the gate imports them) ------------------------------------------------------------------ */

/** The chip's estimated width at Baloo 2 700 20 / pad 12 (design §2: the measured 10.5-13.6 px/glyph + the chrome). */
function chipEst(label) { return 24 + 12.4 * glyphs(label) + 5; }

/**
 * A chip's width for the strip guard: the bank's MEASURED `chipWidths[label]` (Baloo 2 700 20 / pad 12 through the real
 * render; the gate asserts every table entry within 3 px of the rendered chip) when the panel authored one, else the
 * design's estimate. DEVIATION (measured, _work/G1-353-build.md): the estimate alone REFUSES the fi / da five-chip strips
 * the design measured at 509 / 511 <= 531 (12.4 px/glyph over-reads "Kuinka monta" 152 → 178, "Hvor mange" 137 → 153).
 */
function chipW(bank, label) {
  const t = bank && bank.chipWidths;
  return t && typeof t[label] === 'number' && t[label] > 0 ? t[label] : chipEst(label);
}

/** The build guard on a chip strip: every chip on ONE row inside the 531 px sentence column. */
function stripFits(labels, bank, gap = CHIP_GAP) {
  return labels.reduce((s, l) => s + chipW(bank, l), 0) + gap * (labels.length - 1) <= SENTENCE_COL;
}

/** The slot name a frame uses for its thing ({thing} | {part} | {dat}), or null. */
function thingSlotOf(frame) { return slotsIn(frame.text).find((s) => THING_SLOTS.includes(s)) || null; }

/**
 * The slot values of a row context: `{name}` ← ctx.name.name; `{thing}` / `{part}` /
 * `{dat}` / `{pl}` ← ctx.thing.forms; `{place}` ← ctx.place.text; `{time}` ← ctx.time.text;
 * `{n}` ← numberWord(ctx.n, loc); `{name:ade}` ← ctx.nameAde (fi option). Only present values.
 */
function slotValues(ctx) {
  const v = {};
  if (ctx.name) v.name = ctx.name.name;
  if (ctx.thing && ctx.thing.forms) for (const k of ['thing', 'part', 'dat', 'pl']) if (typeof ctx.thing.forms[k === 'thing' ? 'unique' : k] === 'string') v[k] = ctx.thing.forms[k === 'thing' ? 'unique' : k];
  if (ctx.place) v.place = ctx.place.text;
  if (ctx.time) v.time = ctx.time.text;
  if (Number.isInteger(ctx.n)) v.n = numberWord(ctx.n, ctx.loc || 'en');
  return v;
}
function preAde(text, ctx) { return ctx.nameAde ? String(text).split('{name:ade}').join(ctx.nameAde) : String(text); }

/** The filled sentence of a frame (pure; throws on an unfilled slot). */
function fillFrame(frame, ctx) { return fillSlots(preAde(frame.text, ctx), slotValues(ctx)); }

/** The marked span for (frame, ask): the substituted literal of the asked slot; `count` → the number word ONLY. */
function markOf(frame, ask, ctx) {
  const v = slotValues(ctx);
  if (ask === 'who') return v.name;
  if (ask !== KIND_ASK[frame.kind]) throw new Error(`${ID}: ask "${ask}" is neither who nor the ${frame.kind} frame's own kind`);
  if (frame.kind === 'thing') { const s = thingSlotOf(frame); if (!s || !v[s]) throw new Error(`${ID}: frame ${frame.id} names no filled thing slot`); return v[s]; }
  if (frame.kind === 'place') return v.place;
  if (frame.kind === 'time') return v.time;
  if (frame.kind === 'count') return v.n;
  throw new Error(`${ID}: frame ${frame.id} kind "${frame.kind}"`);
}

/** The filled question literal of (frame, ask). */
function questionOf(frame, ask, ctx) {
  const q = frame.q && frame.q[ask];
  if (typeof q !== 'string') throw new Error(`${ID}: frame ${frame.id} has no q.${ask}`);
  return fillSlots(preAde(q, ctx), slotValues(ctx));
}

/** A question minus qPrefix minus its leading qwords[ask] literal (exact, case-sensitive); throws if it does not open with them. */
function gapOf(bank, q, ask) {
  const pre = bank.qPrefix || '', lit = bank.qwords[ask];
  if (!lit) throw new Error(`${ID}: no qwords.${ask}`);
  if (!q.startsWith(pre + lit)) throw new Error(`${ID}: the question "${q}" does not open with "${pre}${lit}"`);
  return q.slice(pre.length + lit.length).replace(/^\s+/, '');
}

/** The first colour candidate of a key in thingThemes order (deterministic; null when none). */
function pinThing(key, loc, bank) {
  const c = candidates(key, loc);
  for (const t of bank.thingThemes) { const hit = c.find((x) => x.theme === t); if (hit) return { theme: hit.theme, noun: hit.noun }; }
  return null;
}

/** sv / da / no: pool keys whose `unique` (the definite) equals another vocab key's singular / plural of the locale. */
function clashKeys(loc, objForms) {
  if (!CLASH_LOCALES.has(loc)) return new Set();
  const V = vocab();
  const out = new Set();
  for (const key of Object.keys(objForms)) {
    const u = nfd(objForms[key] && objForms[key].unique);
    if (!u) continue;
    for (const other of Object.keys(V)) {
      if (other === key) continue;
      const e = V[other] && V[other][loc];
      if (!e) continue;
      if (nfd(e[0]) === u || nfd(e[1]) === u) { out.add(key); break; }
    }
  }
  return out;
}

/**
 * The mechanical thing pool: objForms keys with a pinned colour picture in thingThemes, minus the clash keys +
 * excludeThings. Each entry carries the vocab GENDER CODE of the locale (a code, never an inflected form — the
 * pronouns-object precedent) so `genderFilter.count` (es / pt / it masculine plurals only) has something to read.
 */
function thingPool(loc, bank, objForms) {
  const clash = clashKeys(loc, objForms);
  const excl = new Set((bank.excludeThings || []).map(String));
  const V = vocab();
  const out = [];
  for (const key of Object.keys(objForms).sort()) {
    if (clash.has(key) || excl.has(key)) continue;
    const f = objForms[key];
    if (!f || typeof f.unique !== 'string' || !f.unique) continue;
    const pin = pinThing(key, loc, bank);
    if (!pin) continue;
    const e = V[key] && V[key][loc];
    out.push({ key, forms: f, pic: pin, gender: (Array.isArray(e) && typeof e[2] === 'string') ? e[2] : null });
  }
  return out;
}

/** The `pictureBot` of a resolved page: the share of rows whose picture kind alone predicts the ask. */
function pictureBot(rows) {
  const pred = { person: 'who', thing: 'what', place: 'where', clock: 'when' };
  if (!rows.length) return 0;
  return rows.filter((r) => pred[r.picKind] === r.ask).length / rows.length;
}

/** The resolved base config for (d, bank); guards run on the RESULT. Throws (a refusal) on a structural impossibility. */
function resolveBase(d, bank) {
  const cfg = {
    rows: d.rows, chips: (d.chips || []).slice(), kinds: { ...(d.kinds || {}) }, picOf: d.picOf || 'subject', picPx: d.picPx,
    maxChars: d.maxChars, chipPx: d.chipPx, chipH: d.chipH, chipPad: d.chipPad, rowMin: d.rowMin, maxThings: d.maxThings || 3, botMax: d.botMax == null ? 0.35 : d.botMax,
  };
  if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 12) throw new Error(`${ID}: ${cfg.rows} rows outside the G1 window [6, 12]`);
  if (cfg.chips.length < 2 || cfg.chips.length > 5) throw new Error(`${ID}: ${cfg.chips.length} chips (2..5)`);
  const idx = cfg.chips.map((k) => KIND_ORDER.indexOf(k));
  if (idx.some((i) => i < 0) || idx.some((i, j) => j && i <= idx[j - 1])) throw new Error(`${ID}: chips "${cfg.chips.join(',')}" are not in the fixed order ${KIND_ORDER.join(' · ')}`);
  for (const k of cfg.chips) if (!bank.qwords || typeof bank.qwords[k] !== 'string' || !bank.qwords[k]) throw new Error(`${ID}: the bank has no qwords.${k} — REFUSED`);
  const sum = Object.values(cfg.kinds).reduce((s, x) => s + x, 0);
  if (sum !== cfg.rows) throw new Error(`${ID}: kinds sum ${sum} != rows ${cfg.rows}`);
  for (const [k, n] of Object.entries(cfg.kinds)) { if (!cfg.chips.includes(k)) throw new Error(`${ID}: kinds.${k} is not a chip of the page`); if (!Number.isInteger(n) || n < 1) throw new Error(`${ID}: kinds.${k} = ${n} (>= 1)`); }
  for (const k of cfg.chips) if (!cfg.kinds[k]) throw new Error(`${ID}: chip ${k} never appears as an ask`);
  if (!(cfg.picPx >= 44) || !(cfg.chipH >= 44)) throw new Error(`${ID}: picPx ${cfg.picPx} / chipH ${cfg.chipH} below the G1 element floor 44`);
  if (!(cfg.chipPx >= 18) || !(cfg.maxChars >= 20)) throw new Error(`${ID}: chipPx ${cfg.chipPx} / maxChars ${cfg.maxChars} out of range`);
  if (!['subject', 'referent'].includes(cfg.picOf)) throw new Error(`${ID}: picOf "${cfg.picOf}"`);
  if (cfg.picOf === 'referent') { for (const k of ['when', 'howmany']) if (cfg.kinds[k]) throw new Error(`${ID}: picOf 'referent' cannot draw a ${k} row (a clock at ${cfg.picPx} px is refused; a number has no picture) — REFUSED`); }
  const labels = cfg.chips.map((k) => bank.qwords[k]);
  if (!stripFits(labels, bank)) throw new Error(`${ID}: the chip strip ${labels.join(' | ')} does not fit ${SENTENCE_COL} px on one row — REFUSED`);
  cfg.labels = labels;
  cfg.mixFloor = Math.min(...Object.values(cfg.kinds));
  return cfg;
}

function portraitSrc(p) {
  if (BW_MARKER.test(p.pic.theme)) throw new Error(`${ID}: "${p.key}" pins a B&W theme "${p.pic.theme}" — refuse`);
  return fileUri(p.pic.theme, p.pic.noun);
}

/* ------------------------------------------------------------------ the composer ------------------------------------------------------------------ */

/**
 * The base deal, RNG order: the ask list (shuffled) → the frames (shuffled; distinct
 * ids; non-who rows take a frame of their kind, who rows a frame whose kind's ask is
 * on the page) → the names (distinct, drawn by index) → the portraits (matched to the
 * name's gender via `depicted`, no key twice) → the things (no key twice; a filled
 * sentence over maxChars skips to the next) → the places (distinct, one per twin
 * group) → the times (distinct) → the counts → the row order. null = no deal.
 */
function compose(rng, bank, cfg, loc, data) {
  const { pool, names, people, places, times } = data;
  const numbers = bank.numbers || [2, 3, 4, 5];
  const twinOf = new Map();
  (bank.twins || []).forEach((g, i) => g.forEach((k) => twinOf.set(k, i)));
  for (let t = 0; t < MAX_TRIES; t++) {
    // 1. the ask list
    const asks = [];
    for (const k of cfg.chips) for (let i = 0; i < cfg.kinds[k]; i++) asks.push(k);
    const askOrder = rng.shuffle(asks);
    // 2. the frames — distinct ids
    const frames = rng.shuffle(bank.frames);
    const used = new Set();
    const rows = [];
    let ok = true;
    for (const ask of askOrder) {
      const wantKind = ask === 'who' ? null : ASK_KIND[ask];
      const f = frames.find((x) => !used.has(x.id) && (wantKind ? x.kind === wantKind : cfg.chips.includes(KIND_ASK[x.kind])));
      if (!f) { ok = false; break; }
      used.add(f.id);
      rows.push({ frame: f, kind: f.kind, ask });
    }
    if (!ok) continue;
    const thingRows = rows.filter((r) => r.kind === 'thing' || r.kind === 'count');
    if (thingRows.length > cfg.maxThings) continue;
    // 3. names — distinct, by index
    if (names.length < rows.length) return null;
    const nm = rng.sample(names, rows.length);
    rows.forEach((r, i) => { r.name = nm[i]; });
    // 4. portraits — matched to the name's gender, no key twice
    const byG = { m: rng.shuffle(people.filter((p) => p.depicted === 'm')), f: rng.shuffle(people.filter((p) => p.depicted === 'f')) };
    for (const r of rows) { const p = byG[r.name.gender] && byG[r.name.gender].pop(); if (!p) { ok = false; break; } r.person = p; }
    if (!ok) continue;
    // 5. things — no key twice; the filled sentence must fit maxChars (skip, never squeeze)
    const shuffledPool = rng.shuffle(pool);
    const usedThings = new Set();
    for (const r of thingRows) {
      const n = r.kind === 'count' ? rng.pick(numbers) : null;
      let hit = null;
      for (const th of shuffledPool) {
        if (usedThings.has(th.key)) continue;
        if (bank.genderFilter && bank.genderFilter.count && r.kind === 'count' && th.gender !== bank.genderFilter.count) continue;   // a key without a code is refused for a count row
        const ctx = { name: r.name, thing: th, n, loc };
        let text;
        try { text = fillFrame(r.frame, ctx); } catch (e) { continue; }
        if (glyphs(text) > cfg.maxChars) continue;
        hit = { th, n, text };
        break;
      }
      if (!hit) { ok = false; break; }
      usedThings.add(hit.th.key);
      r.thing = hit.th; r.n = hit.n;
    }
    if (!ok) continue;
    // 6. places — distinct, one per twin group
    const placeRows = rows.filter((r) => r.kind === 'place');
    const shuffledPlaces = rng.shuffle(places);
    const usedGroups = new Set(), usedPlaces = new Set();
    for (const r of placeRows) {
      const p = shuffledPlaces.find((x) => !usedPlaces.has(x.key) && !(twinOf.has(x.key) && usedGroups.has(twinOf.get(x.key))));
      if (!p) { ok = false; break; }
      usedPlaces.add(p.key); if (twinOf.has(p.key)) usedGroups.add(twinOf.get(p.key));
      r.place = p;
    }
    if (!ok) continue;
    // 7. times — distinct
    const timeRows = rows.filter((r) => r.kind === 'time');
    if (timeRows.length > times.length) return null;
    const tm = rng.sample(times, timeRows.length);
    timeRows.forEach((r, i) => { r.time = tm[i]; });
    // 8. fill + mark + cap
    for (const r of rows) {
      const ctx = { name: r.name, thing: r.thing, place: r.place, time: r.time, n: r.n, loc };
      try { r.text = fillFrame(r.frame, ctx); r.span = markOf(r.frame, r.ask, ctx); r.slots = slotValues(ctx); } catch (e) { ok = false; break; }
      if (glyphs(r.text) > cfg.maxChars) { ok = false; break; }
    }
    if (!ok) continue;
    // 9. the row order
    return rng.shuffle(rows);
  }
  return null;
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-qw]');
  if (!root) return ['no question-words root'];
  const mode = root.dataset.lcsMode;
  if (mode !== 'base') return [`mode "${mode}" has no verify branch (Phase 2)`];
  const nRows = +root.dataset.lcsRows, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean);
  const botMax = parseFloat(root.dataset.lcsBotmax), mixFloor = +(root.dataset.lcsMixfloor || 1);
  const FLOOR = 44;
  const wordRe = (w) => new RegExp('(?<!\\p{L})' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');
  const rows = [...root.querySelectorAll('[data-lcs-row]')];
  if (rows.length !== nRows) fails.push(`${rows.length} rows, config says ${nRows}`);
  if (rows.length < 6 || rows.length > 12) fails.push(`${rows.length} rows outside [6, 12]`);
  if (kinds.length < 2 || kinds.length > 5) fails.push(`${kinds.length} chip kinds`);
  let firstOrder = null, firstStyle = null;
  const hist = {}, names = new Set(), srcs = new Set(), frames = new Set();
  const botRows = [];
  const pred = { person: 'who', thing: 'what', place: 'where', clock: 'when' };
  rows.forEach((row, i) => {
    const L = `row ${i + 1}`;
    const ask = row.dataset.lcsAsk, kind = row.dataset.lcsKind, name = row.dataset.lcsName, frame = row.dataset.lcsFrame;
    if (!kinds.includes(ask)) fails.push(`${L}: ask "${ask}" is not a chip of the page`);
    if (!['thing', 'place', 'time', 'count'].includes(kind)) fails.push(`${L}: kind "${kind}"`);
    if (!name) fails.push(`${L}: no name stamp`);
    if (frames.has(frame)) fails.push(`${L}: frame "${frame}" twice`); frames.add(frame);
    if (names.has(name.toLowerCase())) fails.push(`${L}: name "${name}" twice`); names.add(name.toLowerCase());
    let slots = null;
    try { slots = JSON.parse(row.dataset.lcsSlots || '{}'); } catch (e) { fails.push(`${L}: slots stamp is not json`); }
    if (slots && slots.name !== name) fails.push(`${L}: slots.name "${slots && slots.name}" != "${name}"`);
    if (!row.hasAttribute('data-ws-content')) fails.push(`${L}: no data-ws-content`);
    // the sentence + the ONE mark
    const ps = [...row.querySelectorAll('[data-lcs-sentence]')];
    if (ps.length !== 1) fails.push(`${L}: ${ps.length} sentences`);
    const p = ps[0];
    const text = p ? p.textContent.replace(/\s+/g, ' ').trim() : '';
    const marks = p ? [...p.querySelectorAll('[data-lcs-mark]')] : [];
    if (marks.length !== 1) fails.push(`${L}: ${marks.length} marks in the sentence`);
    const span = marks[0] ? marks[0].textContent.trim() : '';
    if (p) {
      const r = p.getBoundingClientRect();
      if (r.height > 26.6) fails.push(`${L}: the sentence wraps (${r.height.toFixed(1)} px > 26)`);
      const fs = parseFloat(getComputedStyle(p).fontSize);
      if (fs < 16) fails.push(`${L}: sentence font ${fs} < 16`);
      if (!text.startsWith(name)) fails.push(`${L}: the sentence "${text}" does not open with the name "${name}"`);
      if (!span) fails.push(`${L}: empty mark`);
      else if (span === text) fails.push(`${L}: the mark is the whole sentence`);
      else if ((text.match(new RegExp(wordRe(span).source, 'gu')) || []).length !== 1) fails.push(`${L}: the mark "${span}" is not a single word-bounded span of "${text}"`);
      if (ask === 'who' && span !== name) fails.push(`${L}: a who row marks "${span}", not the name "${name}"`);
      if (ask !== 'who' && span === name) fails.push(`${L}: a ${ask} row marks the name`);
      if (kind === 'count' && ask !== 'who' && /\s/.test(span)) fails.push(`${L}: a count mark "${span}" spans more than the number word`);
    }
    // chips — fixed order, identical style, no correct marker, one row, inside the column
    const strips = [...row.querySelectorAll('[data-lcs-chips]')];
    if (strips.length !== 1) fails.push(`${L}: ${strips.length} chip strips`);
    const chips = [...row.querySelectorAll('[data-lcs-chip]')];
    if (chips.length !== kinds.length) fails.push(`${L}: ${chips.length} chips, page kinds ${kinds.length}`);
    const order = chips.map((c) => c.dataset.lcsChip).join('|');
    if (order !== kinds.join('|')) fails.push(`${L}: chip order "${order}" != "${kinds.join('|')}" (position leak)`);
    if (firstOrder == null) firstOrder = order; else if (order !== firstOrder) fails.push(`${L}: chip order differs (position leak)`);
    const styles = new Set(chips.map((c) => c.getAttribute('style')));
    if (styles.size !== 1) fails.push(`${L}: chips styled differently`);
    if (firstStyle == null) firstStyle = [...styles][0]; else if ([...styles][0] !== firstStyle) fails.push(`${L}: chip style differs from row 1`);
    const labels = chips.map((c) => c.dataset.lcsLabel);
    if (new Set(labels.map((l) => l.toLowerCase())).size !== labels.length) fails.push(`${L}: duplicate chip labels`);
    if (chips.some((c) => c.dataset.lcsCorrect || c.dataset.lcsAnswer)) fails.push(`${L}: a chip carries a correct marker`);
    if (row.querySelector('[data-lcs-chips] [data-lcs-mark]')) fails.push(`${L}: a mark inside the chip strip`);
    const tops = new Set(chips.map((c) => Math.round(c.getBoundingClientRect().top)));
    if (tops.size > 1) fails.push(`${L}: the chip strip wraps (${tops.size} rows)`);
    const cs = getComputedStyle(row);
    const laneRight = row.getBoundingClientRect().right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth);
    const laneLeft = row.getBoundingClientRect().left + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth);
    chips.forEach((c, k) => {
      const r = c.getBoundingClientRect();
      if (r.height < FLOOR - 0.6) fails.push(`${L}: chip ${k} ${r.height.toFixed(1)} high < ${FLOOR}`);
      if (r.right > laneRight + 0.6) fails.push(`${L}: chip ${k} past the lane's inner edge`);
      if (c.textContent.trim() !== c.dataset.lcsLabel) fails.push(`${L}: chip ${k} prints "${c.textContent.trim()}" not its label`);
      if (c.dataset.lcsIdx !== String(k)) fails.push(`${L}: chip ${k} stamped idx ${c.dataset.lcsIdx}`);
      if (text && wordRe(c.dataset.lcsLabel).test(text)) fails.push(`${L}: the chip label "${c.dataset.lcsLabel}" occurs in the sentence`);
      if (span && span.toLowerCase() === c.dataset.lcsLabel.toLowerCase()) fails.push(`${L}: the mark equals a chip label`);
    });
    // the picture
    const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
    if (imgs.length !== 1) fails.push(`${L}: ${imgs.length} pictures`);
    const img = imgs[0];
    if (img) {
      if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`);
      const r = img.getBoundingClientRect();
      if (r.width < FLOOR - 0.6) fails.push(`${L}: picture ${r.width.toFixed(1)} px < ${FLOOR}`);
      const pk = img.dataset.lcsPickind;
      if (!pred[pk]) fails.push(`${L}: picture kind "${pk}"`);
      if (pk === 'person' && !['m', 'f'].includes(img.dataset.lcsDepicted)) fails.push(`${L}: a portrait without a depicted tag`);
      if (srcs.has(img.src)) fails.push(`${L}: picture src twice on the page`);
      srcs.add(img.src);
      botRows.push({ picKind: pk, ask });
      // the row geometry: badge 30 + gap 10 → the picture at +40; picture + gap 12 → the sentence column (the P22 column-gap trap)
      if (Math.abs(r.left - laneLeft - 40) > 0.6) fails.push(`${L}: row geometry — the picture sits at +${(r.left - laneLeft).toFixed(1)}, want +40`);
      if (p) { const pr = p.getBoundingClientRect(); const want = 40 + r.width + 12; if (Math.abs(pr.left - laneLeft - want) > 0.6) fails.push(`${L}: row geometry — the sentence sits at +${(pr.left - laneLeft).toFixed(1)}, want +${want}`); }
    }
    // the lane holds its content
    if (row.scrollHeight > row.clientHeight + 0.6) fails.push(`${L}: lane overflow ${(row.scrollHeight - row.clientHeight).toFixed(1)} px`);
    const outside = [...row.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
    if (outside) fails.push(`${L}: stray text "${outside}"`);
    hist[ask] = (hist[ask] || 0) + 1;
  });
  for (const k of kinds) if ((hist[k] || 0) < mixFloor) fails.push(`chip "${k}" appears ${hist[k] || 0} < ${mixFloor} times as the answer`);
  if (Object.keys(hist).length < 2) fails.push('only one chip is ever correct (no discrimination)');
  const bot = botRows.length ? botRows.filter((r) => pred[r.picKind] === r.ask).length / botRows.length : 0;
  if (bot > botMax + 1e-9) fails.push(`pictureBot ${bot.toFixed(2)} > ${botMax} (the picture alone solves too many rows)`);
  if (!rows.length) fails.push('non-vacuity: 0 rows');
  return fails;
}

module.exports = {
  id: ID,
  slug: 'question-words-who-what-where',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    // d1 = the unpublished scaffold (design §2 ladder): the marked referent's OWN picture at 64 (person / thing / place;
    // no when row, since a clock at 64 is refused); pictureBot is 1.0 by design, so botMax is not the base's 0.35.
    1: { mode: 'base', rows: 6, chips: ['who', 'what', 'where'], kinds: { who: 2, what: 2, where: 2 }, picOf: 'referent', picPx: 64, maxChars: 32, chipPx: 22, chipH: 44, chipPad: 14, rowMin: 96, maxThings: 3, botMax: 1 },
    2: { mode: 'base', rows: 7, chips: ['who', 'what', 'where', 'when'], kinds: { who: 2, what: 2, where: 2, when: 1 }, picOf: 'subject', picPx: 56, maxChars: 40, chipPx: 20, chipH: 44, chipPad: 12, rowMin: 88, maxThings: 3, botMax: 0.35 },
    3: { mode: 'base', rows: 7, chips: ['who', 'what', 'where', 'when', 'howmany'], kinds: { who: 2, what: 2, where: 1, when: 1, howmany: 1 }, picOf: 'subject', picPx: 56, maxChars: 48, chipPx: 20, chipH: 44, chipPad: 12, rowMin: 88, maxThings: 4, botMax: 0.35, unpublished: true },
  },
  i18n: {
    en: {
      title: 'Question Words: Who, What, Where',
      instruction: 'Read the sentence. Look at the highlighted words. Circle the question word that asks for them.',
    },
  },
  KIND_ORDER, KIND_ASK, ASK_KIND,
  chipEst, chipW, stripFits, thingSlotOf, slotValues, fillFrame, markOf, questionOf, gapOf, pinThing, thingPool, clashKeys, pictureBot, resolveBase, compose,

  /** The real data doors: the family bank, the pronouns bank (persons), the b3 instructions objForms (things). */
  _deps(loc) {
    const bank = loadBank(KEY, loc);
    const pron = loadBank('pronouns', loc);
    const objForms = (loadB3('instructions', loc) || {}).objForms || {};
    return { bank, pron, objForms };
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const { bank, pron, objForms } = this._deps(loc);
    return this._buildWith(bank, this.difficulty[difficulty], { theme, locale: loc, pron, objForms }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (+ injected persons / objForms) — the gate's poison seam. */
  _buildWith(bank, d, { locale, pron, objForms }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !bank.qwords || !Array.isArray(bank.frames) || bank.frames.length < 4) throw new Error(`${ID}: the ${loc} bank has no qwords / frames`);
    if (!pron || !Array.isArray(pron.names) || pron.names.length < 8 || !Array.isArray(pron.people) || pron.people.length < 8) throw new Error(`${ID}: the ${loc} pronouns bank (names + people) is missing — build G1-352 first`);
    if (!objForms || !Object.keys(objForms).length) throw new Error(`${ID}: no objForms for ${loc} (bank('instructions'))`);
    // Phase 2 faces — the additive `mode` knob, dispatched BEFORE the base path touches the RNG
    if (d.mode && d.mode !== 'base') return this._buildFace(bank, d, { locale: loc }, ctx);
    const cfg = resolveBase(d, bank);
    const pool = thingPool(loc, bank, objForms);
    const places = (bank.places || []).filter((p) => typeof p.text === 'string' && p.text);
    const times = (bank.times || []).filter((t) => t && typeof t.text === 'string' && Number.isInteger(t.h));
    if (pool.length < 4) throw new Error(`${ID}: the ${loc} thing pool has ${pool.length} keys (< 4) — REFUSED`);
    if (cfg.kinds.where && places.length < 4) throw new Error(`${ID}: the ${loc} bank has ${places.length} place literals (< 4) — REFUSED`);
    if (cfg.kinds.when && times.length < 4) throw new Error(`${ID}: the ${loc} bank has ${times.length} time literals (< 4) — REFUSED`);
    const rows = compose(rng, bank, cfg, loc, { pool, names: pron.names, people: pron.people, places, times });
    if (!rows) throw new Error(`${ID}: ${loc} cannot deal ${cfg.rows} rows (${JSON.stringify(cfg.kinds)}; names ${pron.names.length}, pool ${pool.length}, places ${places.length}, times ${times.length}) — REFUSED`);
    const chips = cfg.chips.map((k) => ({ kind: k, label: bank.qwords[k] }));
    const html = rows.map((r, i) => {
      let pic;
      if (cfg.picOf === 'subject' || r.ask === 'who') pic = { src: portraitSrc(r.person), pic: `${r.person.pic.theme}/${r.person.pic.noun}`, picKind: 'person', depicted: r.person.depicted };
      else if (r.kind === 'thing') pic = { src: fileUri(r.thing.pic.theme, r.thing.pic.noun), pic: `${r.thing.pic.theme}/${r.thing.pic.noun}`, picKind: 'thing' };
      else if (r.kind === 'place') pic = { src: fileUri(r.place.pic.theme, r.place.pic.noun), pic: `${r.place.pic.theme}/${r.place.pic.noun}`, picKind: 'place' };
      else throw new Error(`${ID}: picOf 'referent' has no picture for a ${r.kind} row`);
      return answerRow({
        n: i + 1, src: pic.src, pic: pic.pic, picKind: pic.picKind, depicted: pic.depicted,
        frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name, slots: { ...r.slots, pic: pic.pic, key: r.thing ? r.thing.key : (r.place ? r.place.key : (r.time ? String(r.time.h) : '')) },
        text: r.text, span: r.span, chips, picPx: cfg.picPx, chipPx: cfg.chipPx, chipPad: cfg.chipPad, rowH: cfg.chipH,
      });
    }).join('');
    const bodyHtml = `<div data-lcs-qw data-lcs-mode="base" data-lcs-rows="${cfg.rows}" data-lcs-kinds="${cfg.chips.join(',')}" data-lcs-botmax="${cfg.botMax}" data-lcs-picof="${cfg.picOf}" data-lcs-mixfloor="${cfg.mixFloor}" ` +
      `style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.rows},minmax(${cfg.rowMin}px,1fr));gap:8px;min-height:0">${html}</div>`;
    return {
      bodyHtml,
      meta: {
        face: 'base', chips: cfg.chips, bot: pictureBot(rows.map((r) => ({ picKind: cfg.picOf === 'subject' || r.ask === 'who' ? 'person' : r.kind, ask: r.ask }))),
        rows: rows.map((r) => ({ frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name, person: r.person.key, thing: r.thing ? r.thing.key : null, place: r.place ? r.place.key : null, time: r.time ? r.time.h : null, n: r.n == null ? null : r.n, text: r.text, span: r.span })),
      },
    };
  },

  /** Phase 2 seam: the five faces (`match` / `fill` / `sort` / `write` / `ask`) are NOT built yet — refuse loudly. */
  _buildFace(bank, d) {
    throw new Error(`${ID}: mode "${d.mode}" is a Phase 2 face and is not built yet — the base renders only when d.mode is 'base'`);
  },

  async verify(page) {
    return page.evaluate(VERIFY_BASE);
  },
};
