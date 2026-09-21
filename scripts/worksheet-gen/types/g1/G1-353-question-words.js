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
 * PHASE 2 — the five faces (design §3; tools/b4var-rows/question-words.js;
 * record _work/G1-353-faces.md): ONE additive `mode` knob (`match` / `fill` /
 * `sort` / `write` / `ask`) dispatched in `_buildWith` BEFORE the base path
 * consumes the RNG (the base's default output stays byte-identical; the release
 * baseline proves it). Each face has its own resolver (guards on the CONFIG),
 * a builder over `dealFace` (the base deal with hooks: an explicit ask list,
 * the who-frame kinds, a per-row question filter, portraits at >= their minPx)
 * and a `VERIFY_FACE` branch keyed on data-lcs-mode with a SPARSE assertion:
 *   match  G1-373  5 questions left (no picture) + 5 deranged short answers right with their picture (portrait /
 *                  thing / place / 88 px clock / thing + count badge); items grow 100..120, bands <= 44 (the G1-368 rule)
 *   fill   G1-374  a 5-pill bank (deranged) + 6 lanes: the question with a UNIFORM gap box (gapW from the bank's
 *                  measured bankWidths) over the marked answer + portrait; the lanes stretch to the body bottom
 *   sort   G1-375  9 word tiles (3 names / 3 bare things / 3 place phrases under the 112 tile guard) on a two-row
 *                  shelf + 3 ruled bins Who? What? Where? in a FIXED 677 stack (bins 491, 8 lines at 55)
 *   write  G2-356  8 lane-less rows: portrait 48 + the marked answer over a 575 x 48 ruling; the canonical question
 *                  is a stamp only (need = glyphs x 18 + 16 <= 575); the rows stretch
 *   ask    G2-357  one four-tile scene (portrait · thing · place · 120 px clock) + six 72 px starter rulings
 *                  (Who What Where When Why How, the starter font from the measured metrics); open-ended
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { bank: loadB3 } = require('../../lib/b3-common.js');
const { fileUri, vocab, displayWord } = require('../../lib/b2-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { fillSlots, slotsIn } = require('../../lib/b3-instructions.js');
const { numberWord } = require('../../lib/number-words.js');
const { answerRow, qaMatch, questionFrame, qwBins, writeRow, askScene, starterLines } = require('../../templates/components-b4.js');
const { wordBank } = require('../../templates/components-b2.js');

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
    // deal the non-who asks FIRST (each needs a frame of ITS kind), then the who asks, which mark the
    // SUBJECT and may take any frame: an on-chip kind first, else a kind absent from the page (its own
    // constituent is unmarked, so it never leaks) — reviewer ruling 2026-09-21: a 3-chip d2 page has 6
    // on-chip frames for 7 rows and the who rows must not starve what/where.
    const dealOrder = [...askOrder.filter((a) => a !== 'who'), ...askOrder.filter((a) => a === 'who')];
    for (const ask of dealOrder) {
      const wantKind = ask === 'who' ? null : ASK_KIND[ask];
      const f = wantKind
        ? frames.find((x) => !used.has(x.id) && x.kind === wantKind)
        : (frames.find((x) => !used.has(x.id) && cfg.chips.includes(KIND_ASK[x.kind]))
           || frames.find((x) => !used.has(x.id) && !cfg.chips.includes(KIND_ASK[x.kind])));
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

/* ------------------------------------------------------------------ Phase 2: the five faces (design §3; tools/b4var-rows/question-words.js) ------------------------------------------------------------------ */

const FACES = ['match', 'fill', 'sort', 'write', 'ask'];
const GAP_MIN = 110, GAP_MAX = 220;      // the F2 gap box (design §3 F2)
const CLOCK_FLOOR = 74;                  // clock.js numerals round(size x 0.115) >= 9 (qa/lints.js:86)
const TILE_GUARD = 112, PX_PER_GLYPH_18 = 10.2;   // the F3 tile guard (design §3 F3): textW18(literal) <= 112, estimated at 10.2 px/glyph
const SHELF_INNER = 632;                 // the F3 shelf: .ws-card 660 - padding 24 - border 4
const TILE_CHROME = 28;                  // a .ws-tile--word: padding 24 + border 4 around its text
const TILE_MAX_W = TILE_GUARD + TILE_CHROME;   // the widest tile the guard admits (140)
const SHELF_TWO_ROWS = 122;              // MEASURED (the base gate's qwBins smoke): 2 rows of 44 px tiles at gap 10, padding 10, border 4
const SORT_HEAD = 40, SORT_GAP = 18, SORT_HEAD_GAP = 6;   // MEASURED: the .ws-pill head is 40 (not the design's 26); the shelf -> bins gap 18; head -> bin 6
const SORT_STACK = 677;                  // the F3 stack is FIXED at the fi four-line budget (SPARSE rule: the bins fill the page)
const LINE_GAP_MAX = 58;                 // K-288 gapY ceiling
const SCENE_GAP = 12;                    // F5: scene lane -> starters lane
const ASK_LANE_PAD = 24;                 // F5 starters lane: padding 10 x 2 + border 4
const HAND_PX = 18;                      // the pencil width per glyph on a 48/24 ruling (design §3 F4)
const PAGE_INNER = 675;                  // .ws-page inner width (the F4 rows are LANE-LESS, so they span the page, not a lane's 639)
const F4_GRID = 30 + 10 + 12;            // the writeRow grid gaps + badge; the ruling w = 675 - 52 - picPx (575 at 48)

function wordRe(w, flags = 'u') { return new RegExp('(?<!\\p{L})' + String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', flags); }
function hasWordCi(text, word) { return wordRe(nfd(word), 'iu').test(nfd(text)); }
function need(answer) { return glyphs(answer) * HAND_PX + 16; }
function tileEst(text) { return Math.round(glyphs(text) * PX_PER_GLYPH_18); }

/** A bank word's width at Nunito 800 18 for the F2 gap-box formula: the bank's MEASURED bankWidths[label], else the Baloo-20 chip proxy (chipW - 29). */
function bankW(bank, label) {
  const t = bank && bank.bankWidths;
  return t && typeof t[label] === 'number' && t[label] > 0 ? t[label] : chipW(bank, label) - 29;
}
/** The F2 gap box width: clamp(round(1.6 x widestBankWord18 + 24), gapMin, gapMax) — UNIFORM per page (a per-row width would leak the word length). */
function gapWidthOf(bank, kinds, gapMin = GAP_MIN, gapMax = GAP_MAX) {
  const widest = Math.max(...kinds.map((k) => bankW(bank, bank.qwords[k])));
  return Math.min(gapMax, Math.max(gapMin, Math.round(1.6 * widest + 24)));
}
/** The F3 tile text of a thing under the locale's ONE policy: 'bare' = displayWord of the vocab singular; 'unique' = objForms.unique. null = no form. */
function tileTextOf(th, loc, bank) {
  const policy = bank.sortThingForm || 'bare';
  if (policy === 'unique') return th.forms && typeof th.forms.unique === 'string' ? th.forms.unique : null;
  const V = vocab();
  const e = V[th.key] && V[th.key][loc];
  if (!Array.isArray(e) || typeof e[0] !== 'string' || !e[0]) return null;
  return displayWord(e[0], loc);
}
/** Greedy flex-wrap over the estimated tile widths: the row count the shelf will take (the composer keeps it at 2). */
function shelfRowsEst(texts) {
  let rows = 1, x = 0;
  for (const t of texts) {
    const w = tileEst(t) + TILE_CHROME;
    if (x && x + 10 + w > SHELF_INNER) { rows++; x = w; } else x = x ? x + 10 + w : w;
  }
  return rows;
}
function derange(rng, n) {
  for (let t = 0; t < 200; t++) { const o = rng.shuffle([...Array(n).keys()]); if (o.every((x, i) => x !== i)) return o; }
  throw new Error(`${ID}: no derangement of ${n} found`);
}
function shuffleAway(rng, items, fixed) {
  for (let t = 0; t < 200; t++) { const o = rng.shuffle(items); if (o.join('|') !== fixed.join('|')) return o; }
  throw new Error(`${ID}: cannot shuffle ${items.length} items away from the fixed order`);
}
function askListOf(kinds, chips) {
  const asks = [];
  for (const k of chips) for (let i = 0; i < (kinds[k] || 0); i++) asks.push(k);
  return asks;
}
function kindsGuard(kinds, bank, label) {
  for (const [k, n] of Object.entries(kinds)) {
    if (!KIND_ORDER.includes(k)) throw new Error(`${ID} ${label}: kinds.${k} is not a question-word kind`);
    if (!Number.isInteger(n) || n < 1) throw new Error(`${ID} ${label}: kinds.${k} = ${n} (>= 1)`);
    if (!bank.qwords || typeof bank.qwords[k] !== 'string' || !bank.qwords[k]) throw new Error(`${ID} ${label}: the bank has no qwords.${k} — REFUSED`);
  }
}

/** F1 config: the match page (design §3 F1). */
function resolveMatch(d, bank) {
  if (d.whole) throw new Error(`${ID} match: the whole-sentence twin-stem match (d3) is not built`);
  const cfg = { pairs: d.pairs, kinds: (d.kinds || []).slice(), picPx: d.picPx, itemH: d.itemH, itemMax: d.itemMax == null ? d.itemH + 20 : d.itemMax, leftW: d.leftW || 252, rightW: d.rightW || 248, fontPx: d.fontPx || 18, maxChars: d.maxChars, maxThings: d.maxThings || 4 };
  if (!Number.isInteger(cfg.pairs) || cfg.pairs < 3 || cfg.pairs > 7) throw new Error(`${ID} match: ${cfg.pairs} pairs (3..7)`);
  if (cfg.kinds.length !== cfg.pairs) throw new Error(`${ID} match: ${cfg.kinds.length} kinds for ${cfg.pairs} pairs (one question per kind)`);
  if (new Set(cfg.kinds).size !== cfg.kinds.length) throw new Error(`${ID} match: a kind twice (two questions of one kind would share their answer's shape)`);
  const idx = cfg.kinds.map((k) => KIND_ORDER.indexOf(k));
  if (idx.some((i) => i < 0)) throw new Error(`${ID} match: kinds "${cfg.kinds.join(',')}" outside ${KIND_ORDER.join(' · ')}`);
  for (const k of cfg.kinds) if (!bank.qwords || typeof bank.qwords[k] !== 'string' || !bank.qwords[k]) throw new Error(`${ID} match: the bank has no qwords.${k} — REFUSED`);
  if (!(cfg.picPx >= 44)) throw new Error(`${ID} match: picPx ${cfg.picPx} < 44`);
  if (cfg.kinds.includes('when') && !(cfg.picPx >= CLOCK_FLOOR)) throw new Error(`${ID} match: picPx ${cfg.picPx} < the clock floor ${CLOCK_FLOOR} (a when answer draws a clock)`);
  if (!(cfg.itemH >= 88) || !(cfg.itemH >= cfg.picPx + 12)) throw new Error(`${ID} match: itemH ${cfg.itemH} (>= 88 and >= picPx + 12)`);
  if (!(cfg.itemMax >= cfg.itemH) || cfg.itemMax > cfg.itemH + 44) throw new Error(`${ID} match: itemMax ${cfg.itemMax} outside [itemH, itemH + 44]`);
  // the SPARSE budget: at the fi four-line chrome (677) the items must fit; at the tallest en body the bands stay under 44
  if (cfg.pairs * cfg.itemH + 12 * (cfg.pairs - 1) + 12 > 677) throw new Error(`${ID} match: ${cfg.pairs} x ${cfg.itemH} does not fit the 677 chrome`);
  if (!(cfg.fontPx >= 16) || !(cfg.maxChars >= 20)) throw new Error(`${ID} match: fontPx ${cfg.fontPx} / maxChars ${cfg.maxChars}`);
  return cfg;
}
/** F2 config: the fill page (design §3 F2). */
function resolveFill(d, bank) {
  if (d.bank === false) throw new Error(`${ID} fill: the bank-less d3 shape is not built`);
  const cfg = { rows: d.rows, kinds: { ...(d.kinds || {}) }, picPx: d.picPx, gapH: d.gapH || 40, gapMin: d.gapMin || GAP_MIN, gapMax: d.gapMax || GAP_MAX, fontPx: d.fontPx || 18, maxRest: d.maxRest, maxChars: d.maxChars || 40, maxPerKind: d.maxPerKind || 2, maxThings: d.maxThings || 4, rowMin: d.rowMin || 84, rowGap: d.rowGap || 8 };
  if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 12) throw new Error(`${ID} fill: ${cfg.rows} rows outside the G1 window [6, 12]`);
  kindsGuard(cfg.kinds, bank, 'fill');
  const sum = Object.values(cfg.kinds).reduce((s, x) => s + x, 0);
  if (sum > cfg.rows) throw new Error(`${ID} fill: kinds sum ${sum} > rows ${cfg.rows}`);
  cfg.chips = KIND_ORDER.filter((k) => bank.qwords && bank.qwords[k]);
  if (cfg.chips.length !== 5) throw new Error(`${ID} fill: the bank is the WHOLE qwords table (5), got ${cfg.chips.length} — REFUSED`);
  for (const k of Object.keys(cfg.kinds)) if (!cfg.chips.includes(k)) throw new Error(`${ID} fill: kinds.${k} is not a bank word`);
  if (!(cfg.picPx >= 44) || !(cfg.gapH >= 36)) throw new Error(`${ID} fill: picPx ${cfg.picPx} / gapH ${cfg.gapH} below the G1 floors`);
  if (!(cfg.gapMin >= GAP_MIN) || !(cfg.gapMax <= GAP_MAX) || cfg.gapMin > cfg.gapMax) throw new Error(`${ID} fill: gap bounds ${cfg.gapMin}..${cfg.gapMax} outside ${GAP_MIN}..${GAP_MAX}`);
  if (!(cfg.maxRest >= 10) || !(cfg.fontPx >= 16)) throw new Error(`${ID} fill: maxRest ${cfg.maxRest} / fontPx ${cfg.fontPx}`);
  cfg.gapW = gapWidthOf(bank, cfg.chips, cfg.gapMin, cfg.gapMax);
  // the question line guard (design §3 F2): restChars x 9.6 + gapW + 8 <= 531 at the widest legal box
  if (cfg.maxRest * 9.6 + cfg.gapW + 8 > SENTENCE_COL) throw new Error(`${ID} fill: maxRest ${cfg.maxRest} x 9.6 + gapW ${cfg.gapW} + 8 > ${SENTENCE_COL}`);
  return cfg;
}
/** F3 config: the sort page (design §3 F3 + the SPARSE rule: a FIXED 677 stack whose bins carry the ruled lines that fill them). */
function resolveSort(d, bank) {
  const cfg = { bins: (d.bins || []).slice(), perBin: d.perBin, tileGuard: d.tileGuard || TILE_GUARD, lineMin: d.lineMin || 5, stack: d.stack || SORT_STACK };
  if (cfg.bins.length < 2 || cfg.bins.length > 4) throw new Error(`${ID} sort: ${cfg.bins.length} bins (2..4)`);
  const idx = cfg.bins.map((k) => KIND_ORDER.indexOf(k));
  if (idx.some((i) => i < 0 || i > 3) || idx.some((i, j) => j && i <= idx[j - 1])) throw new Error(`${ID} sort: bins "${cfg.bins.join(',')}" must be who|what|where|when in the fixed order`);
  if (cfg.bins.includes('when')) throw new Error(`${ID} sort: a when bin needs the panel's short time forms (d3, unpublished) — not built`);
  if (!Number.isInteger(cfg.perBin) || cfg.perBin < 2 || cfg.perBin > 4) throw new Error(`${ID} sort: perBin ${cfg.perBin} (2..4)`);
  cfg.tiles = cfg.perBin * cfg.bins.length;
  if (Number.isInteger(d.tiles) && d.tiles !== cfg.tiles) throw new Error(`${ID} sort: tiles ${d.tiles} != perBin ${cfg.perBin} x ${cfg.bins.length} bins`);
  if (cfg.tiles < 6 || cfg.tiles > 12) throw new Error(`${ID} sort: ${cfg.tiles} tiles outside the G1 window [6, 12]`);
  cfg.heads = cfg.bins.map((k) => { const l = bank.bins && bank.bins[k]; if (typeof l !== 'string' || !l.endsWith('?')) throw new Error(`${ID} sort: the bank has no bins.${k} head ending with "?" — REFUSED`); return { kind: k, label: l }; });
  cfg.binW = d.binW || (Math.floor(640 / cfg.bins.length) - 12);
  if (!(cfg.binW >= 140)) throw new Error(`${ID} sort: binW ${cfg.binW} < 140`);
  if (!(cfg.tileGuard >= 60) || !(cfg.lineMin >= 4)) throw new Error(`${ID} sort: tileGuard ${cfg.tileGuard} / lineMin ${cfg.lineMin}`);
  if (!(cfg.stack >= 660) || cfg.stack > SORT_STACK) throw new Error(`${ID} sort: stack ${cfg.stack} outside [660, ${SORT_STACK}]`);
  cfg.shelfH = SHELF_TWO_ROWS;
  cfg.binH = cfg.stack - cfg.shelfH - SORT_GAP - SORT_HEAD - SORT_HEAD_GAP;   // 677 - 122 - 18 - 40 - 6 = 491
  cfg.lineCount = Math.max(cfg.lineMin, cfg.perBin, Math.round((cfg.binH - 10) / LINE_GAP_MAX));
  cfg.gapY = Math.min(LINE_GAP_MAX, Math.floor((cfg.binH - 20) / (cfg.lineCount + 0.5)));
  if (cfg.gapY < 34) throw new Error(`${ID} sort: ${cfg.lineCount} lines in a ${cfg.binH} bin give gapY ${cfg.gapY} < 34 (a G1 hand)`);
  return cfg;
}
/** F4 config: the write page (design §3 F4; G2). */
function resolveWrite(d, bank) {
  if (d.starter) throw new Error(`${ID} write: the starter-given d1 shape is not built`);
  if (d.twoAsks) throw new Error(`${ID} write: the two-mark d3 shape is not built`);
  if (d.bank) throw new Error(`${ID} write: a bank on the write face (the answer is retrieved, never copied) — REFUSED`);
  if (d.ruling === false) throw new Error(`${ID} write: ruling:false`);
  const cfg = { rows: d.rows, kinds: { ...(d.kinds || {}) }, h: d.h || 48, glyphH: d.glyphH || 24, picPx: d.picPx || 48, fontPx: d.fontPx || 18, maxChars: d.maxChars, sentenceMax: d.sentenceMax || 40, maxThings: d.maxThings || 4, rowMin: d.rowMin || 78, rowGap: d.rowGap || 6 };
  if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 16) throw new Error(`${ID} write: ${cfg.rows} rows outside [6, 16]`);
  kindsGuard(cfg.kinds, bank, 'write');
  const sum = Object.values(cfg.kinds).reduce((s, x) => s + x, 0);
  if (sum !== cfg.rows) throw new Error(`${ID} write: kinds sum ${sum} != rows ${cfg.rows}`);
  if (!(cfg.glyphH >= 24) || !(cfg.h >= cfg.glyphH + 20)) throw new Error(`${ID} write: glyphH ${cfg.glyphH} / h ${cfg.h} below the G2 writing floor (glyphH >= 24, h >= glyphH + 20)`);
  if (!(cfg.picPx >= 36) || !(cfg.fontPx >= 16) || !(cfg.maxChars >= 20)) throw new Error(`${ID} write: picPx ${cfg.picPx} / fontPx ${cfg.fontPx} / maxChars ${cfg.maxChars}`);
  cfg.w = PAGE_INNER - F4_GRID - cfg.picPx;   // 575 at picPx 48
  if (need('x'.repeat(cfg.maxChars)) > cfg.w) throw new Error(`${ID} write: maxChars ${cfg.maxChars} needs ${need('x'.repeat(cfg.maxChars))} px > the ${cfg.w} ruling`);
  return cfg;
}
/** F5 config: the ask page (design §3 F5; G2, open-ended). */
function resolveAsk(d, bank) {
  if (d.bank) throw new Error(`${ID} ask: the bank-and-bare-rulings d3 shape is not built`);
  const cfg = { starters: (d.starters || []).slice(), rows: d.rows, h: d.h || 56, glyphH: d.glyphH || 26, gap: d.gap || 8, tile: (d.scene && d.scene.tile) || 120 };
  if (cfg.starters.length < 4 || cfg.starters.length > 6) throw new Error(`${ID} ask: ${cfg.starters.length} starters (4..6)`);
  if (cfg.rows !== cfg.starters.length) throw new Error(`${ID} ask: rows ${cfg.rows} != starters ${cfg.starters.length}`);
  const st = Array.isArray(bank.starters) ? bank.starters : [];
  if (st.length !== 6) throw new Error(`${ID} ask: the bank has ${st.length} starters (want 6) — REFUSED`);
  cfg.labels = cfg.starters.map((k, i) => {
    const j = ['who', 'what', 'where', 'when', 'why', 'how'].indexOf(k);
    if (j < 0) throw new Error(`${ID} ask: starter "${k}"`);
    if (j !== i) throw new Error(`${ID} ask: starters must run who · what · where · when · why · how in order (got "${k}" at ${i})`);
    if (j < 4 && st[j] !== bank.qwords[k]) throw new Error(`${ID} ask: bank starters[${j}] "${st[j]}" != qwords.${k} "${bank.qwords[k]}"`);
    return st[j];
  });
  if (new Set(cfg.labels.map(nfd)).size !== cfg.labels.length) throw new Error(`${ID} ask: a starter twice`);
  if (!(cfg.glyphH >= 24) || !(cfg.h >= cfg.glyphH + 20)) throw new Error(`${ID} ask: glyphH ${cfg.glyphH} / h ${cfg.h} below the G2 writing floor`);
  if (!(cfg.tile >= 100) || !(cfg.tile >= CLOCK_FLOOR)) throw new Error(`${ID} ask: tile ${cfg.tile} < 100`);
  return cfg;
}

/**
 * The face deal (the base composer's shape with hooks): `asks` is the explicit ask list; who rows take a frame
 * of `whoKinds` (F1: thing | place) or the base fallback (an on-page kind first, else off-page); every row's
 * filled sentence <= maxChars; `rowFilter(row, ctx)` runs on every candidate thing (thing / count rows) and on
 * the final fill (all rows) — a row that fails is re-dealt, never squeezed. null = no deal.
 */
function dealFace(rng, bank, opts, loc, data) {
  const { pool, names, places, times } = data;
  // a portrait is drawn only at >= its minPx (the pronouns bank's per-picture floor: the 56-class full figures never at 48)
  const people = data.people.filter((p) => (p.minPx || 44) <= (opts.picPx || 56));
  const numbers = bank.numbers || [2, 3, 4, 5];
  const twinOf = new Map();
  (bank.twins || []).forEach((g, i) => g.forEach((k) => twinOf.set(k, i)));
  const onPage = new Set(opts.asks);
  const filter = opts.rowFilter || (() => true);
  for (let t = 0; t < MAX_TRIES; t++) {
    const askOrder = rng.shuffle(opts.asks);
    const frames = rng.shuffle(bank.frames);
    const used = new Set();
    const rows = [];
    let ok = true;
    const dealOrder = [...askOrder.filter((a) => a !== 'who'), ...askOrder.filter((a) => a === 'who')];
    for (const ask of dealOrder) {
      const wantKind = ask === 'who' ? null : ASK_KIND[ask];
      let f;
      if (wantKind) f = frames.find((x) => !used.has(x.id) && x.kind === wantKind);
      else if (opts.whoKinds) f = frames.find((x) => !used.has(x.id) && opts.whoKinds.includes(x.kind));
      else f = frames.find((x) => !used.has(x.id) && onPage.has(KIND_ASK[x.kind])) || frames.find((x) => !used.has(x.id) && !onPage.has(KIND_ASK[x.kind]));
      if (!f) { ok = false; break; }
      used.add(f.id);
      rows.push({ frame: f, kind: f.kind, ask });
    }
    if (!ok) continue;
    const thingRows = rows.filter((r) => r.kind === 'thing' || r.kind === 'count');
    if (thingRows.length > (opts.maxThings || 4)) continue;
    if (names.length < rows.length) return null;
    const nm = rng.sample(names, rows.length);
    rows.forEach((r, i) => { r.name = nm[i]; });
    const byG = { m: rng.shuffle(people.filter((p) => p.depicted === 'm')), f: rng.shuffle(people.filter((p) => p.depicted === 'f')) };
    for (const r of rows) { const p = byG[r.name.gender] && byG[r.name.gender].pop(); if (!p) { ok = false; break; } r.person = p; }
    if (!ok) continue;
    const shuffledPool = rng.shuffle(pool);
    const usedThings = new Set();
    for (const r of thingRows) {
      const n = r.kind === 'count' ? rng.pick(numbers) : null;
      let hit = null;
      for (const th of shuffledPool) {
        if (usedThings.has(th.key)) continue;
        if (bank.genderFilter && bank.genderFilter.count && r.kind === 'count' && th.gender !== bank.genderFilter.count) continue;
        const ctx = { name: r.name, thing: th, n, loc };
        let text;
        try { text = fillFrame(r.frame, ctx); } catch (e) { continue; }
        if (glyphs(text) > opts.maxChars) continue;
        if (!filter({ ...r, thing: th, n }, ctx)) continue;
        hit = { th, n, text };
        break;
      }
      if (!hit) { ok = false; break; }
      usedThings.add(hit.th.key);
      r.thing = hit.th; r.n = hit.n;
    }
    if (!ok) continue;
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
    const timeRows = rows.filter((r) => r.kind === 'time');
    if (timeRows.length > times.length) return null;
    const tm = rng.sample(times, timeRows.length);
    timeRows.forEach((r, i) => { r.time = tm[i]; });
    for (const r of rows) {
      const ctx = { name: r.name, thing: r.thing, place: r.place, time: r.time, n: r.n, loc };
      try { r.text = fillFrame(r.frame, ctx); r.span = markOf(r.frame, r.ask, ctx); r.slots = slotValues(ctx); r.question = questionOf(r.frame, r.ask, ctx); } catch (e) { ok = false; break; }
      if (glyphs(r.text) > opts.maxChars || !filter(r, ctx)) { ok = false; break; }
      r.ctx = ctx;
    }
    if (!ok) continue;
    return rng.shuffle(rows);
  }
  return null;
}

/** The answer LITERAL of a row (F1 / F3 short answers): the constituent itself, never a sentence. */
function answerLiteralOf(r) {
  if (r.ask === 'who') return r.name.name;
  return r.span;
}
function rowKey(r) { return r.thing ? r.thing.key : (r.place ? r.place.key : (r.time ? String(r.time.h) : '')); }
function faceData(bank, loc, pron, objForms) {
  const pool = thingPool(loc, bank, objForms);
  const places = (bank.places || []).filter((p) => typeof p.text === 'string' && p.text);
  const times = (bank.times || []).filter((t) => t && typeof t.text === 'string' && Number.isInteger(t.h));
  if (pool.length < 4) throw new Error(`${ID}: the ${loc} thing pool has ${pool.length} keys (< 4) — REFUSED`);
  return { pool, places, times, names: pron.names, people: pron.people };
}
function rootStyle(gap) { return `flex:1 1 auto;display:flex;flex-direction:column;min-height:0${gap ? ';gap:' + gap + 'px' : ''}`; }
function rootAttrs(bank, mode) { return `data-lcs-qw data-lcs-mode="${mode}" data-lcs-qwords='${JSON.stringify(bank.qwords).replace(/'/g, '&#39;')}' data-lcs-qprefix="${bank.qPrefix || ''}"`; }

/* F1 — match */
function buildMatch(bank, d, loc, rng, data) {
  const cfg = resolveMatch(d, bank);
  if (cfg.kinds.includes('where') && data.places.length < 2) throw new Error(`${ID} match: the ${loc} bank has ${data.places.length} place literals (< 2) — REFUSED`);
  if (cfg.kinds.includes('when') && data.times.length < 2) throw new Error(`${ID} match: the ${loc} bank has ${data.times.length} time literals (< 2) — REFUSED`);
  const opts = { asks: cfg.kinds, whoKinds: ['thing', 'place'], maxChars: 40, maxThings: cfg.maxThings, picPx: cfg.picPx, rowFilter: (r, ctx) => glyphs(questionOf(r.frame, r.ask, ctx)) <= cfg.maxChars };
  for (let t = 0; t < 60; t++) {
    const rows = dealFace(rng, bank, opts, loc, data);
    if (!rows) break;
    const answers = rows.map(answerLiteralOf);
    // no question carries any row's answer literal (word-bounded, NFD, ci) — uniqueness beyond the construction
    if (rows.some((r) => answers.some((a) => hasWordCi(r.question, a)))) continue;
    if (new Set(answers.map(nfd)).size !== answers.length) continue;
    const order = derange(rng, rows.length);
    const left = rows.map((r) => ({ frame: r.frame.id, ask: r.ask, text: r.question, name: r.name.name, slots: { ...r.slots, key: rowKey(r) } }));
    const right = rows.map((r, i) => {
      const base = { kind: r.ask, literal: answers[i] };
      if (r.ask === 'who') return { ...base, src: portraitSrc(r.person), pic: `${r.person.pic.theme}/${r.person.pic.noun}`, picKind: 'person', depicted: r.person.depicted };
      if (r.ask === 'what') return { ...base, src: fileUri(r.thing.pic.theme, r.thing.pic.noun), pic: `${r.thing.pic.theme}/${r.thing.pic.noun}`, picKind: 'thing' };
      if (r.ask === 'howmany') return { ...base, src: fileUri(r.thing.pic.theme, r.thing.pic.noun), pic: `${r.thing.pic.theme}/${r.thing.pic.noun}`, picKind: 'thing', badge: r.n };
      if (r.ask === 'where') return { ...base, src: fileUri(r.place.pic.theme, r.place.pic.noun), pic: `${r.place.pic.theme}/${r.place.pic.noun}`, picKind: 'place' };
      if (r.ask === 'when') return { ...base, clock: { h: r.time.h } };
      throw new Error(`${ID} match: ask "${r.ask}"`);
    });
    const html = qaMatch({ left, right, order, leftW: cfg.leftW, rightW: cfg.rightW, itemH: cfg.itemH, itemMax: cfg.itemMax, picPx: cfg.picPx, fontPx: cfg.fontPx });
    const bodyHtml = `<div ${rootAttrs(bank, 'match')} data-lcs-pairs="${cfg.pairs}" data-lcs-kinds="${cfg.kinds.join(',')}" data-lcs-picpx="${cfg.picPx}" data-lcs-itemh="${cfg.itemH}" data-lcs-itemmax="${cfg.itemMax}" style="${rootStyle()}">${html}</div>`;
    return { bodyHtml, meta: { face: 'match', order, rows: rows.map((r, i) => ({ frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name, person: r.person.key, thing: r.thing ? r.thing.key : null, place: r.place ? r.place.key : null, time: r.time ? r.time.h : null, n: r.n == null ? null : r.n, question: r.question, answer: answers[i] })) } };
  }
  throw new Error(`${ID} match: ${loc} cannot deal ${cfg.pairs} questions of distinct kinds (${cfg.kinds.join(',')}) with answer-free questions — REFUSED`);
}

/* F2 — fill */
function buildFill(bank, d, loc, rng, data) {
  const cfg = resolveFill(d, bank);
  if (cfg.kinds.where && data.places.length < 2) throw new Error(`${ID} fill: the ${loc} bank has ${data.places.length} place literals — REFUSED`);
  if (cfg.kinds.when && data.times.length < 2) throw new Error(`${ID} fill: the ${loc} bank has ${data.times.length} time literals — REFUSED`);
  const asks = askListOf(cfg.kinds, cfg.chips);
  const count = { ...cfg.kinds };
  while (asks.length < cfg.rows) {
    const open = cfg.chips.filter((k) => (count[k] || 0) < cfg.maxPerKind);
    if (!open.length) throw new Error(`${ID} fill: ${cfg.rows} rows exceed ${cfg.maxPerKind} per kind over ${cfg.chips.length} kinds`);
    const k = rng.pick(open); count[k] = (count[k] || 0) + 1; asks.push(k);
  }
  const rows = dealFace(rng, bank, { asks, whoKinds: null, maxChars: cfg.maxChars, maxThings: cfg.maxThings, picPx: cfg.picPx, rowFilter: (r, ctx) => glyphs(gapOf(bank, questionOf(r.frame, r.ask, ctx), r.ask)) <= cfg.maxRest }, loc, data);
  if (!rows) throw new Error(`${ID} fill: ${loc} cannot deal ${cfg.rows} rows (${JSON.stringify(cfg.kinds)}; rest <= ${cfg.maxRest}) — REFUSED`);
  const fixed = cfg.chips.map((k) => bank.qwords[k]);
  const order = shuffleAway(rng, fixed, fixed);
  const bankHtml = wordBank({ words: order.map((w) => ({ word: w })), wordPx: cfg.fontPx });
  const lanes = rows.map((r, i) => questionFrame({
    n: i + 1, src: portraitSrc(r.person), depicted: r.person.depicted, frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name,
    slots: { ...r.slots, pic: `${r.person.pic.theme}/${r.person.pic.noun}`, key: rowKey(r) },
    question: r.question, qPrefix: bank.qPrefix || '', rest: gapOf(bank, r.question, r.ask), text: r.text, span: r.span, gapW: cfg.gapW, gapH: cfg.gapH, fontPx: cfg.fontPx, answer: bank.qwords[r.ask], picPx: cfg.picPx,
  })).join('');
  const bodyHtml = `<div ${rootAttrs(bank, 'fill')} data-lcs-rows="${cfg.rows}" data-lcs-kinds="${cfg.chips.join(',')}" data-lcs-gapw="${cfg.gapW}" data-lcs-botmax="0.35" data-lcs-maxperkind="${cfg.maxPerKind}" style="${rootStyle()}">` +
    bankHtml + `<div data-lcs-lanes style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.rows},minmax(${cfg.rowMin}px,1fr));gap:${cfg.rowGap}px;min-height:0">${lanes}</div></div>`;
  return { bodyHtml, meta: { face: 'fill', bankOrder: order, gapW: cfg.gapW, rows: rows.map((r) => ({ frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name, person: r.person.key, thing: r.thing ? r.thing.key : null, place: r.place ? r.place.key : null, time: r.time ? r.time.h : null, n: r.n == null ? null : r.n, text: r.text, span: r.span, question: r.question })) } };
}

/* F3 — sort */
function buildSort(bank, d, loc, rng, data) {
  const cfg = resolveSort(d, bank);
  const { pool, places, names } = data;
  const heads = cfg.heads;
  const qLits = new Set(KIND_ORDER.map((k) => bank.qwords[k]).filter(Boolean).map(nfd));
  const okText = (t) => typeof t === 'string' && t.trim() && tileEst(t) <= cfg.tileGuard && !qLits.has(nfd(t)) && !heads.some((h) => nfd(h.label) === nfd(t) || nfd(h.label) === nfd(t) + '?');
  const placeOk = places.filter((p) => okText(p.text));
  if (cfg.bins.includes('where') && placeOk.length < cfg.perBin) throw new Error(`${ID} sort: ${loc} has ${placeOk.length} place literals under the tile guard (want ${cfg.perBin}) — REFUSED`);
  const twinOf = new Map();
  (bank.twins || []).forEach((g, i) => g.forEach((k) => twinOf.set(k, i)));
  for (let t = 0; t < MAX_TRIES; t++) {
    const tiles = [];
    let ok = true;
    for (let b = 0; b < cfg.bins.length && ok; b++) {
      const kind = cfg.bins[b];
      if (kind === 'who') {
        const nm = rng.sample(names, cfg.perBin);
        if (nm.length < cfg.perBin || nm.some((x) => !okText(x.name))) { ok = false; break; }
        nm.forEach((x) => tiles.push({ text: x.name, key: b, kind: 'who', item: x.name }));
      } else if (kind === 'what') {
        const seen = new Set();
        for (const th of rng.shuffle(pool)) {
          if (tiles.filter((x) => x.kind === 'what').length >= cfg.perBin) break;
          const txt = tileTextOf(th, loc, bank);
          if (!okText(txt) || seen.has(nfd(txt))) continue;
          seen.add(nfd(txt));
          tiles.push({ text: txt, key: b, kind: 'what', item: th.key });
        }
        if (tiles.filter((x) => x.kind === 'what').length < cfg.perBin) { ok = false; break; }
      } else if (kind === 'where') {
        const usedGroups = new Set();
        for (const p of rng.shuffle(placeOk)) {
          if (tiles.filter((x) => x.kind === 'where').length >= cfg.perBin) break;
          if (twinOf.has(p.key) && usedGroups.has(twinOf.get(p.key))) continue;
          if (twinOf.has(p.key)) usedGroups.add(twinOf.get(p.key));
          tiles.push({ text: p.text, key: b, kind: 'where', item: p.key });
        }
        if (tiles.filter((x) => x.kind === 'where').length < cfg.perBin) { ok = false; break; }
      } else { ok = false; break; }
    }
    if (!ok) continue;
    if (new Set(tiles.map((x) => nfd(x.text))).size !== tiles.length) continue;
    if (shelfRowsEst(tiles.map((x) => x.text)) > 2) continue;          // the shelf is TWO rows (the fixed 677 stack keys on it)
    const shuffled = rng.shuffle(tiles);
    const html = qwBins({ tiles: shuffled.map((x) => ({ text: x.text, key: x.key, kind: x.kind, frame: x.item })), heads, lineCount: cfg.lineCount, binW: cfg.binW, binH: cfg.binH });
    const bodyHtml = `<div ${rootAttrs(bank, 'sort')} data-lcs-tiles="${cfg.tiles}" data-lcs-perbin="${cfg.perBin}" data-lcs-kinds="${cfg.bins.join(',')}" data-lcs-heads='${JSON.stringify(heads.map((h) => h.label)).replace(/'/g, '&#39;')}' data-lcs-binw="${cfg.binW}" data-lcs-binh="${cfg.binH}" data-lcs-lines="${cfg.lineCount}" data-lcs-stack="${cfg.stack}" data-lcs-tileguard="${cfg.tileGuard}" style="${rootStyle()}">${html}</div>`;
    return { bodyHtml, meta: { face: 'sort', tiles: shuffled.map((x) => ({ text: x.text, key: x.key, kind: x.kind, item: x.item })), lineCount: cfg.lineCount, binH: cfg.binH } };
  }
  throw new Error(`${ID} sort: ${loc} cannot deal ${cfg.tiles} tiles on a two-row shelf — REFUSED`);
}

/* F4 — write */
function buildWrite(bank, d, loc, rng, data) {
  const cfg = resolveWrite(d, bank);
  if (cfg.kinds.where && data.places.length < 2) throw new Error(`${ID} write: the ${loc} bank has ${data.places.length} place literals — REFUSED`);
  if (cfg.kinds.when && data.times.length < 2) throw new Error(`${ID} write: the ${loc} bank has ${data.times.length} time literals — REFUSED`);
  const asks = askListOf(cfg.kinds, KIND_ORDER);
  const rows = dealFace(rng, bank, { asks, whoKinds: null, maxChars: cfg.sentenceMax, maxThings: cfg.maxThings, picPx: cfg.picPx, rowFilter: (r, ctx) => { const q = questionOf(r.frame, r.ask, ctx); return glyphs(q) <= cfg.maxChars && need(q) <= cfg.w; } }, loc, data);
  if (!rows) throw new Error(`${ID} write: ${loc} cannot deal ${cfg.rows} rows (${JSON.stringify(cfg.kinds)}; question <= ${cfg.maxChars}) — REFUSED`);
  const html = rows.map((r, i) => writeRow({
    n: i + 1, src: portraitSrc(r.person), depicted: r.person.depicted, frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name,
    slots: { ...r.slots, pic: `${r.person.pic.theme}/${r.person.pic.noun}`, key: rowKey(r) },
    text: r.text, span: r.span, answer: r.question, w: cfg.w, h: cfg.h, glyphH: cfg.glyphH, fontPx: cfg.fontPx, picPx: cfg.picPx,
  })).join('');
  const bodyHtml = `<div ${rootAttrs(bank, 'write')} data-lcs-rows="${cfg.rows}" data-lcs-kinds="${KIND_ORDER.filter((k) => cfg.kinds[k]).join(',')}" data-lcs-glyphh="${cfg.glyphH}" data-lcs-w="${cfg.w}" data-lcs-picpx="${cfg.picPx}" data-lcs-botmax="0.35" style="${rootStyle()}">` +
    `<div data-lcs-lanes style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.rows},minmax(${cfg.rowMin}px,1fr));gap:${cfg.rowGap}px;min-height:0">${html}</div></div>`;
  return { bodyHtml, meta: { face: 'write', rows: rows.map((r) => ({ frame: r.frame.id, kind: r.kind, ask: r.ask, name: r.name.name, person: r.person.key, thing: r.thing ? r.thing.key : null, place: r.place ? r.place.key : null, time: r.time ? r.time.h : null, n: r.n == null ? null : r.n, text: r.text, span: r.span, answer: r.question })) } };
}

/* F5 — ask (open-ended) */
function buildAsk(bank, d, loc, rng, data) {
  const cfg = resolveAsk(d, bank);
  const { pool, places, times, names, people } = data;
  if (!places.length || !times.length || !pool.length || !names.length) throw new Error(`${ID} ask: the ${loc} bank lacks a place / time / thing / name — REFUSED`);
  const name = rng.pick(names);
  const person = rng.pick(people.filter((p) => p.depicted === name.gender && (p.minPx || 44) <= cfg.tile));
  if (!person) throw new Error(`${ID} ask: no ${name.gender} portrait for "${name.name}"`);
  const thing = rng.pick(pool);
  const place = rng.pick(places);
  const time = rng.pick(times);
  const scene = askScene({
    portrait: { src: portraitSrc(person), pic: `${person.pic.theme}/${person.pic.noun}` },
    thing: { src: fileUri(thing.pic.theme, thing.pic.noun), pic: `${thing.pic.theme}/${thing.pic.noun}` },
    place: { src: fileUri(place.pic.theme, place.pic.noun), pic: `${place.pic.theme}/${place.pic.noun}` },
    time: { h: time.h }, tile: cfg.tile,
  });
  const lines = starterLines({ starters: cfg.labels, h: cfg.h, glyphH: cfg.glyphH, gap: cfg.gap });
  const bodyHtml = `<div ${rootAttrs(bank, 'ask')} data-lcs-rows="${cfg.rows}" data-lcs-kinds="${cfg.starters.join(',')}" data-lcs-glyphh="${cfg.glyphH}" data-lcs-h="${cfg.h}" data-lcs-tile="${cfg.tile}" data-lcs-time="${time.h}" data-lcs-name="${name.name}" data-lcs-person="${person.key}" data-lcs-thing="${thing.key}" data-lcs-place="${place.key}" style="${rootStyle(SCENE_GAP)}">${scene}${lines}</div>`;
  return { bodyHtml, meta: { face: 'ask', name: name.name, person: person.key, thing: thing.key, place: place.key, time: time.h, starters: cfg.labels } };
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

/**
 * The face branches (one per data-lcs-mode). Self-contained (page.evaluate); the node cross-check in
 * qa/verify-b4-question-words.js re-derives every stamp from the banks. SPARSE is asserted per face:
 * the stretch faces (match / fill / write) end within 3 px of the body bottom with their items owning
 * their band (blank inside an item <= 24, F1 <= 32 = the 88 px picture in a 148 px item at the tallest
 * en body); the fixed stacks (sort 677 / ask >= 660) leave <= 180 px under them.
 */
function VERIFY_FACE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-qw]');
  if (!root) return ['no question-words root'];
  const mode = root.dataset.lcsMode;
  const r = (el) => el.getBoundingClientRect();
  const body = r(document.querySelector('[data-lcs-body]'));
  const foot = r(document.querySelector('.ws-foot')).top;
  const rr = r(root);
  const BODY_FILL_TOL = 3, LANE_BLANK_MAX = 24, ITEM_BLANK_MAX = 32, SLACK_MAX = 180, G1 = 44, G2 = 36, CLOCK_FLOOR = 74;
  let qwords = {};
  try { qwords = JSON.parse(root.dataset.lcsQwords || '{}'); } catch (e) { fails.push('qwords stamp is not json'); }
  const qPrefix = root.dataset.lcsQprefix || '';
  const ORDER = ['who', 'what', 'where', 'when', 'howmany'];
  const nfd = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordRe = (w, f = 'u') => new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})', f);
  const hasWordCi = (t, w) => wordRe(nfd(w), 'iu').test(nfd(t));
  const glyphs = (s) => [...String(s || '')].length;
  const text = (el) => (el ? el.textContent.replace(/[ \t\r\n]+/g, ' ').trim() : '');   // ASCII whitespace only: fr's NBSP before "?" is a literal
  const fontOf = (el) => parseFloat(getComputedStyle(el).fontSize);
  const srcs = new Set(), names = new Set(), frames = new Set();
  const pred = { person: 'who', thing: 'what', place: 'where', clock: 'when' };
  // common: top-anchored; nothing under the footer
  if (rr.top > body.top + 8) fails.push(`stage top ${Math.round(rr.top - body.top)} px under the body top: the stage floats (top-anchor it)`);
  let lowest = 0;
  root.querySelectorAll('*').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
  if (lowest > foot + 0.6) fails.push(`ink ${Math.round(lowest)} reaches under the footer ${Math.round(foot)}`);
  /** the ONE mark of a sentence, as on the base */
  const checkSentence = (row, L, ask, name, kind) => {
    const ps = [...row.querySelectorAll('[data-lcs-sentence]')];
    if (ps.length !== 1) { fails.push(`${L}: ${ps.length} sentences`); return null; }
    const p = ps[0];
    const t = text(p);
    const marks = [...p.querySelectorAll('[data-lcs-mark]')];
    if (marks.length !== 1) fails.push(`${L}: ${marks.length} marks in the sentence`);
    const span = marks[0] ? marks[0].textContent.trim() : '';
    if (r(p).height > 26.6) fails.push(`${L}: the sentence wraps (${r(p).height.toFixed(1)} px > 26)`);
    if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`${L}: the sentence overflows its column`);
    if (fontOf(p) < 16) fails.push(`${L}: sentence font ${fontOf(p)} < 16`);
    if (!t.startsWith(name)) fails.push(`${L}: the sentence "${t}" does not open with the name "${name}"`);
    if (!span) fails.push(`${L}: empty mark`);
    else if (span === t) fails.push(`${L}: the mark is the whole sentence`);
    else if ((t.match(wordRe(span, 'gu')) || []).length !== 1) fails.push(`${L}: the mark "${span}" is not a single word-bounded span of "${t}"`);
    if (ask === 'who' && span !== name) fails.push(`${L}: a who row marks "${span}", not the name "${name}"`);
    if (ask !== 'who' && span === name) fails.push(`${L}: a ${ask} row marks the name`);
    if (kind === 'count' && ask !== 'who' && /\s/.test(span)) fails.push(`${L}: a count mark "${span}" spans more than the number word`);
    for (const k of ORDER) if (qwords[k] && hasWordCi(t, qwords[k])) fails.push(`${L}: the question word "${qwords[k]}" is printed in the sentence`);
    return { p, t, span };
  };
  const checkPortrait = (row, L, floor) => {
    const imgs = [...row.querySelectorAll('img[data-lcs-pic]')];
    if (imgs.length !== 1) { fails.push(`${L}: ${imgs.length} pictures`); return null; }
    const img = imgs[0];
    if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture ${img.dataset.lcsPic}`);
    if (r(img).width < floor - 0.6) fails.push(`${L}: picture ${r(img).width.toFixed(1)} px < ${floor}`);
    if (img.dataset.lcsPickind !== 'person') fails.push(`${L}: the picture is a ${img.dataset.lcsPickind}, not the subject's portrait`);
    if (!['m', 'f'].includes(img.dataset.lcsDepicted)) fails.push(`${L}: a portrait without a depicted tag`);
    if (srcs.has(img.src)) fails.push(`${L}: picture src twice on the page`);
    srcs.add(img.src);
    return img;
  };
  const uniq = (row, L, needContent = true) => {
    const name = row.dataset.lcsName, frame = row.dataset.lcsFrame;
    if (!name) fails.push(`${L}: no name stamp`);
    if (names.has(nfd(name))) fails.push(`${L}: name "${name}" twice`); names.add(nfd(name));
    if (frames.has(frame)) fails.push(`${L}: frame "${frame}" twice`); frames.add(frame);
    if (needContent && !row.hasAttribute('data-ws-content')) fails.push(`${L}: no data-ws-content`);
  };
  /** the stretch faces: the lane grid fills the body; rows own their band */
  const laneGrid = (sel, L, contentOf, gapMax) => {
    const grid = root.querySelector('[data-lcs-lanes]');
    if (!grid) { fails.push('no lane grid'); return []; }
    const lanes = [...grid.querySelectorAll(sel)];
    const lastBottom = lanes.length ? Math.max(...lanes.map((ln) => r(ln).bottom)) : r(grid).top;
    if (body.bottom - lastBottom > BODY_FILL_TOL) fails.push(`the rows end ${Math.round(body.bottom - lastBottom)} px above the body bottom (sparse: rows must stretch)`);
    if (lastBottom > body.bottom + 0.6) fails.push(`the rows end ${Math.round(lastBottom - body.bottom)} px under the body bottom`);
    lanes.forEach((ln, i) => {
      const b = r(ln);
      const c = contentOf(ln);
      if (c) {
        const cs = getComputedStyle(ln);
        const pt = parseFloat(cs.paddingTop) || 0, pb = parseFloat(cs.paddingBottom) || 0, bt = parseFloat(cs.borderTopWidth) || 0, bb = parseFloat(cs.borderBottomWidth) || 0;
        const above = c.top - (b.top + pt + bt), below = (b.bottom - pb - bb) - c.bottom;
        if (above > LANE_BLANK_MAX + 0.6 || below > LANE_BLANK_MAX + 0.6) fails.push(`${L} ${i + 1}: blank ${Math.round(above)} above / ${Math.round(below)} below its content (> ${LANE_BLANK_MAX}: sparse)`);
        if (c.bottom > b.bottom + 0.6 || c.top < b.top - 0.6) fails.push(`${L} ${i + 1}: content spills out of its row`);
      }
      if (ln.scrollHeight > ln.clientHeight + 0.6) fails.push(`${L} ${i + 1}: overflow ${(ln.scrollHeight - ln.clientHeight).toFixed(1)} px`);
      if (i) { const gap = b.top - r(lanes[i - 1]).bottom; if (gap > gapMax + 0.6) fails.push(`${L} ${i + 1}: ${Math.round(gap)} px above it (> ${gapMax}: sparse)`); }
    });
    return lanes;
  };
  const contentBox = (el, sel) => { const kids = [...el.querySelectorAll(sel)].filter((k) => r(k).height); if (!kids.length) return null; return { top: Math.min(...kids.map((k) => r(k).top)), bottom: Math.max(...kids.map((k) => r(k).bottom)) }; };
  const botOf = (rows) => (rows.length ? rows.filter((x) => pred[x.picKind] === x.ask).length / rows.length : 0);

  if (mode === 'match') {
    const pairs = +root.dataset.lcsPairs, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean), picPx = +root.dataset.lcsPicpx, itemH = +root.dataset.lcsItemh, itemMax = +root.dataset.lcsItemmax;
    const match = root.querySelector('[data-lcs-match]');
    if (!match) return ['no match block'];
    if (!match.hasAttribute('data-ws-content')) fails.push('the match block lacks data-ws-content');
    const qs = [...match.querySelectorAll('[data-lcs-q]')], as = [...match.querySelectorAll('[data-lcs-a]')];
    if (qs.length !== pairs || as.length !== pairs) fails.push(`${qs.length} questions / ${as.length} answers, config says ${pairs}`);
    if (pairs < 3 || pairs > 7) fails.push(`${pairs} pairs outside [3, 7]`);
    const asks = qs.map((q) => q.dataset.lcsAsk);
    if (new Set(asks).size !== asks.length) fails.push(`a kind asked twice: ${asks.join(',')} (two questions of one kind share an answer shape)`);
    if (asks.slice().sort().join(',') !== kinds.slice().sort().join(',')) fails.push(`asks ${asks.join(',')} != the page kinds ${kinds.join(',')}`);
    const rightKinds = as.map((a) => a.dataset.lcsKind);
    if (rightKinds.slice().sort().join(',') !== asks.slice().sort().join(',')) fails.push(`right kinds ${rightKinds.join(',')} != the left asks`);
    const literals = as.map((a) => a.dataset.lcsLiteral);
    if (new Set(literals.map(nfd)).size !== literals.length) fails.push('an answer literal twice');
    // the left column: question text, no picture, no answer literal anywhere
    qs.forEach((q, i) => {
      const L = `question ${i + 1}`;
      uniq(q, L, false);
      const t = text(q.querySelector('[data-lcs-match-text]'));
      const ask = q.dataset.lcsAsk;
      if (!qwords[ask]) fails.push(`${L}: ask "${ask}" is not in the qwords table`);
      else if (!t.startsWith(qPrefix + qwords[ask])) fails.push(`${L}: "${t}" does not open with "${qPrefix}${qwords[ask]}"`);
      if (!/\?$/.test(t)) fails.push(`${L}: "${t}" does not end with "?"`);
      for (const lit of literals) if (hasWordCi(t, lit)) fails.push(`${L}: "${t}" carries the answer literal "${lit}"`);
      if (q.querySelector('img, svg')) fails.push(`${L}: a picture on the question side (the picture-less left is the load-bearing act)`);
      const tp = q.querySelector('[data-lcs-match-text]');
      if (!tp) fails.push(`${L}: no text`);
      else { if (fontOf(tp) < 18) fails.push(`${L}: font ${fontOf(tp)} < 18`); if (r(tp).height > 2 * 1.3 * fontOf(tp) + 1) fails.push(`${L}: text wraps past 2 lines (${r(tp).height.toFixed(1)})`); }
      if (!q.querySelector('.ws-match-dot')) fails.push(`${L}: no dot`);
      if (r(q).width < 200) fails.push(`${L}: item ${r(q).width.toFixed(0)} wide`);
    });
    // the right column: rendered in a derangement; each picture matches its kind
    as.forEach((a, p) => {
      const L = `answer ${p + 1}`;
      const j = +a.dataset.lcsA;
      if (j === p) fails.push(`${L}: sits at its own question's position (not deranged)`);
      const kind = a.dataset.lcsKind;
      const img = a.querySelector('img'), clk = a.querySelector('[data-lcs-prim="clock"]');
      if (kind === 'when') { if (!clk) fails.push(`${L}: a when answer without a clock`); if (img) fails.push(`${L}: a when answer with a picture`); }
      else {
        if (!img) fails.push(`${L}: no picture`);
        else {
          if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`);
          const want = { who: 'person', what: 'thing', howmany: 'thing', where: 'place' }[kind];
          if (img.dataset.lcsPickind !== want) fails.push(`${L}: a ${img.dataset.lcsPickind} picture on a ${kind} answer (want ${want})`);
          if (kind === 'who' && !['m', 'f'].includes(img.dataset.lcsDepicted)) fails.push(`${L}: a portrait without a depicted tag`);
          if (r(img).width < Math.max(G1, picPx) - 0.6) fails.push(`${L}: picture ${r(img).width.toFixed(1)} < ${Math.max(G1, picPx)}`);
          if (srcs.has(img.src)) fails.push(`${L}: picture src twice`); srcs.add(img.src);
        }
        if (clk) fails.push(`${L}: a clock on a ${kind} answer`);
      }
      if (clk) { if (r(clk).width < CLOCK_FLOOR - 0.6) fails.push(`${L}: clock ${r(clk).width.toFixed(0)} < ${CLOCK_FLOOR}`); clk.querySelectorAll('text').forEach((tx) => { if (fontOf(tx) < 9) fails.push(`${L}: clock numerals ${fontOf(tx)} px`); }); }
      const badge = a.querySelector('[data-lcs-count-badge]');
      if (kind === 'howmany' && !badge) fails.push(`${L}: a howmany answer without its count badge`);
      if (kind !== 'howmany' && badge) fails.push(`${L}: a count badge on a ${kind} answer`);
      const tp = a.querySelector('[data-lcs-match-text]');
      if (!tp) fails.push(`${L}: no text`);
      else { if (text(tp) !== a.dataset.lcsLiteral) fails.push(`${L}: prints "${text(tp)}" not its literal`); if (fontOf(tp) < 20) fails.push(`${L}: font ${fontOf(tp)} < 20`); if (r(tp).height > 2 * 1.15 * fontOf(tp) + 2) fails.push(`${L}: literal wraps past 2 lines`); }
      if (!a.querySelector('.ws-match-dot')) fails.push(`${L}: no dot`);
    });
    const order = (match.dataset.lcsOrder || '').split(',').map(Number);
    if (order.join(',') !== as.map((a) => +a.dataset.lcsA).join(',')) fails.push('the order stamp differs from the rendered order');
    // no line pre-drawn: the only svg on the block is a clock or a count badge
    match.querySelectorAll('svg').forEach((s) => { if (s.dataset.lcsPrim !== 'clock' && !s.hasAttribute('data-lcs-count-badge')) fails.push('an svg on the match block that is neither a clock nor a badge (a line pre-drawn?)'); });
    // SPARSE (the G1-368 match precedent): items grow to itemMax, the band between consecutive items <= 44 (the G1 element
    // floor, tokens.density.G1.minElement), the slack under the last item <= 50 (44 + the block's 6 px padding)
    for (const [side, items] of [['question', qs], ['answer', as]]) {
      const last = Math.max(...items.map((it) => r(it).bottom));
      if (body.bottom - last > G1 + 6 + 0.6) fails.push(`${Math.round(body.bottom - last)} px of slack under the last ${side} item (> ${G1 + 6}: sparse)`);
      if (last > body.bottom + 0.6) fails.push(`the ${side} column ends under the body bottom`);
      items.forEach((it, i) => {
        const b = r(it);
        if (b.height < itemH - 0.6) fails.push(`${side} ${i + 1}: item ${b.height.toFixed(1)} < ${itemH}`);
        if (itemMax && b.height > itemMax + 0.6) fails.push(`${side} ${i + 1}: item ${b.height.toFixed(1)} > itemMax ${itemMax}`);
        const c = contentBox(it, 'img, svg[data-lcs-prim="clock"], [data-lcs-match-text]');
        if (c && (c.bottom > b.bottom + 0.6 || c.top < b.top - 0.6)) fails.push(`${side} ${i + 1}: content spills out of its item`);
        const tp = it.querySelector('[data-lcs-match-text]');
        if (tp && (r(tp).right > b.right - 6 + 0.6 || r(tp).left < b.left + 6 - 0.6)) fails.push(`${side} ${i + 1}: text past the item's edge`);
        if (i) { const band = b.top - r(items[i - 1]).bottom; if (band > G1 + 0.6) fails.push(`${Math.round(band)} px between ${side} items ${i} and ${i + 1} (> ${G1}: sparse)`); }
      });
      if (items.length && r(items[0]).top - rr.top > G1 + 6 + 0.6) fails.push(`the first ${side} item sits ${Math.round(r(items[0]).top - rr.top)} px under the stage top (sparse)`);
    }
    if (!qs.length) fails.push('non-vacuity: 0 questions');
    return fails;
  }

  if (mode === 'fill') {
    const nRows = +root.dataset.lcsRows, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean), gapW = +root.dataset.lcsGapw, botMax = parseFloat(root.dataset.lcsBotmax), maxPer = +(root.dataset.lcsMaxperkind || 2);
    const banner = root.querySelector('[data-lcs-bank-banner]');
    if (!banner) fails.push('no bank banner (the face is bank:true)');
    const bankWords = banner ? [...banner.querySelectorAll('[data-lcs-bank-word]')] : [];
    const bankSet = bankWords.map((w) => w.dataset.lcsBankWord);
    if (bankSet.slice().sort().join('|') !== kinds.map((k) => qwords[k]).sort().join('|')) fails.push(`bank words ${bankSet.join('|')} != the qwords table ${kinds.map((k) => qwords[k]).join('|')}`);
    if (bankSet.join('|') === kinds.map((k) => qwords[k]).join('|')) fails.push('the bank is in the fixed qwords order (position leak)');
    if (new Set(bankWords.map((w) => Math.round(r(w).top))).size > 1) fails.push('the bank wraps to two rows');
    bankWords.forEach((w) => { if (fontOf(w) < 16) fails.push(`bank word "${w.dataset.lcsBankWord}" font ${fontOf(w)} < 16`); if (text(w) !== w.dataset.lcsBankWord) fails.push(`bank word prints "${text(w)}" not "${w.dataset.lcsBankWord}"`); });
    if (banner && r(banner).top - rr.top > 8) fails.push('the bank does not sit at the stage top');
    const lanes = laneGrid('[data-lcs-row]', 'lane', (ln) => contentBox(ln, 'p, img'), 8);
    if (lanes.length !== nRows) fails.push(`${lanes.length} lanes, config says ${nRows}`);
    if (nRows < 6 || nRows > 12) fails.push(`${nRows} rows outside [6, 12]`);
    const hist = {}, botRows = [];
    lanes.forEach((row, i) => {
      const L = `lane ${i + 1}`;
      const ask = row.dataset.lcsAsk, name = row.dataset.lcsName, kind = row.dataset.lcsKind, answer = row.dataset.lcsAnswer;
      uniq(row, L);
      if (!kinds.includes(ask)) fails.push(`${L}: ask "${ask}" is not a bank kind`);
      if (answer !== qwords[ask]) fails.push(`${L}: answer stamp "${answer}" != qwords.${ask} "${qwords[ask]}"`);
      if (!bankSet.includes(answer)) fails.push(`${L}: the answer "${answer}" is not in the bank`);
      // line 1: prefix + ONE empty box + the rest; the answer literal nowhere in the lane
      const q = row.querySelector('[data-lcs-question]');
      if (!q) fails.push(`${L}: no question line`);
      else {
        const boxes = [...q.querySelectorAll('[data-lcs-gapbox]')];
        if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} gap boxes`);
        const box = boxes[0];
        if (box) {
          if (text(box)) fails.push(`${L}: the gap box is not empty ("${text(box)}")`);
          if (Math.abs(r(box).width - gapW) > 1) fails.push(`${L}: gap box ${r(box).width.toFixed(1)} != the page gapW ${gapW}`);
          if (r(box).width < 110 - 0.6 || r(box).height < 36 - 0.6) fails.push(`${L}: gap box ${r(box).width.toFixed(0)} x ${r(box).height.toFixed(0)} under the 110 x 36 floor`);
          const before = q.textContent.slice(0, q.textContent.indexOf(box.textContent) ).trim();
          // the prefix is everything before the box: exactly qPrefix
          const nodesBefore = []; for (const n of q.childNodes) { if (n === box) break; nodesBefore.push(n.textContent); }
          if (nodesBefore.join('').trim() !== qPrefix.trim()) fails.push(`${L}: text before the box "${nodesBefore.join('')}" != the prefix "${qPrefix}"`);
          void before;
        }
        const rest = text(q).replace(qPrefix, '').trim();
        if (!rest || !/\?$/.test(rest)) fails.push(`${L}: the rest "${rest}" does not end with "?"`);
        if (hasWordCi(rest, answer) || nfd(rest).startsWith(nfd(answer))) fails.push(`${L}: the answer "${answer}" is printed in the question line`);
        if (r(q).height > 42.6) fails.push(`${L}: the question line wraps (${r(q).height.toFixed(1)} px)`);
        if (q.scrollWidth > q.clientWidth + 0.6) fails.push(`${L}: the question line overflows its column (${q.scrollWidth} > ${q.clientWidth})`);
        if (fontOf(q) < 16) fails.push(`${L}: question font ${fontOf(q)} < 16`);
      }
      const s = checkSentence(row, L, ask, name, kind);
      if (s && hasWordCi(s.t, answer)) fails.push(`${L}: the answer "${answer}" is printed in the sentence`);
      if (row.querySelector('[data-lcs-chip]')) fails.push(`${L}: a chip on the fill face`);
      const img = checkPortrait(row, L, G1);
      if (img) botRows.push({ picKind: img.dataset.lcsPickind, ask });
      hist[ask] = (hist[ask] || 0) + 1;
    });
    for (const k of kinds) { if (!(hist[k] >= 1)) fails.push(`kind "${k}" never asked (every bank word must be an answer once)`); if (hist[k] > maxPer) fails.push(`kind "${k}" asked ${hist[k]} > ${maxPer} times`); }
    const bot = botOf(botRows);
    if (bot > botMax + 1e-9) fails.push(`pictureBot ${bot.toFixed(2)} > ${botMax}`);
    if (!lanes.length) fails.push('non-vacuity: 0 lanes');
    return fails;
  }

  if (mode === 'sort') {
    const nTiles = +root.dataset.lcsTiles, perBin = +root.dataset.lcsPerbin, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean), binW = +root.dataset.lcsBinw, binH = +root.dataset.lcsBinh, stackWant = +root.dataset.lcsStack, guard = +root.dataset.lcsTileguard;
    let heads = [];
    try { heads = JSON.parse(root.dataset.lcsHeads || '[]'); } catch (e) { fails.push('heads stamp is not json'); }
    const sort = root.querySelector('[data-lcs-sort]');
    if (!sort) return ['no sort block'];
    if (!sort.hasAttribute('data-ws-content')) fails.push('the sort block lacks data-ws-content');
    const shelf = sort.querySelector('[data-lcs-shelf]');
    const tiles = [...sort.querySelectorAll('[data-lcs-sortword]')], bins = [...sort.querySelectorAll('[data-lcs-sortbin]')];
    if (tiles.length !== nTiles) fails.push(`${tiles.length} tiles, config says ${nTiles}`);
    if (nTiles < 6 || nTiles > 12) fails.push(`${nTiles} tiles outside [6, 12]`);
    if (bins.length !== kinds.length || bins.length !== heads.length) fails.push(`${bins.length} bins for ${kinds.length} kinds / ${heads.length} heads`);
    if (bins.length < 2) fails.push('< 2 bins');
    bins.forEach((b, i) => {
      const L = `bin ${i + 1}`;
      if (+b.dataset.lcsSortbin !== i) fails.push(`${L}: stamped ${b.dataset.lcsSortbin}`);
      const head = b.querySelector('[data-lcs-sorthead]');
      if (!head) fails.push(`${L}: no head`);
      else {
        if (text(head) !== heads[i]) fails.push(`${L}: head "${text(head)}" != "${heads[i]}"`);
        if (!/\?$/.test(text(head))) fails.push(`${L}: head "${text(head)}" does not end with "?"`);
        if (kinds[i] && qwords[kinds[i]] && !hasWordCi(text(head), qwords[kinds[i]]) && !b.dataset.lcsAlias) { /* a nominative alias (fi Mikä?) is declared on the bank; the node check reads it */ }
        if (fontOf(head) < 16) fails.push(`${L}: head font ${fontOf(head)}`);
      }
      const bin = b.querySelector('.ws-bin');
      if (!bin) fails.push(`${L}: no bin box`);
      else {
        if (Math.abs(r(bin).width - binW) > 1) fails.push(`${L}: bin ${r(bin).width.toFixed(1)} wide != ${binW}`);
        if (Math.abs(r(bin).height - binH) > 1) fails.push(`${L}: bin ${r(bin).height.toFixed(1)} high != ${binH}`);
        if (bin.querySelector('[data-lcs-sortword]')) fails.push(`${L}: a tile pre-placed in the bin`);
        if (text(bin)) fails.push(`${L}: text in the bin ("${text(bin)}")`);
        const lines = [...bin.querySelectorAll('line')];
        const load = tiles.filter((t) => +t.dataset.lcsKey === i).length;
        if (load !== perBin) fails.push(`${L}: receives ${load} tiles, want ${perBin}`);
        if (lines.length < load) fails.push(`${L}: ${lines.length} ruled lines < ${load} tiles`);
        const gapY = +b.dataset.lcsGapy;
        if (!(gapY >= 34)) fails.push(`${L}: gapY ${gapY} < 34`);
        const lastY = lines.length ? Math.max(...lines.map((ln) => +ln.getAttribute('y1'))) : 0;
        if (r(bin).height - lastY > 64) fails.push(`${L}: the last line sits ${Math.round(r(bin).height - lastY)} px above the bin bottom (sparse: the lines must fill the bin)`);
      }
    });
    if (new Set(heads.map(nfd)).size !== heads.length) fails.push('two heads coincide');
    const headSet = new Set(heads.map((h) => nfd(h).replace(/[?¿]/g, '').trim()));
    const qLits = new Set(ORDER.map((k) => qwords[k]).filter(Boolean).map(nfd));
    const seen = new Set();
    const tops = new Set();
    tiles.forEach((t, i) => {
      const L = `tile ${i + 1}`;
      const w = t.dataset.lcsSortword;
      if (text(t) !== w) fails.push(`${L}: prints "${text(t)}" not its stamp "${w}"`);
      if (seen.has(nfd(w))) fails.push(`${L}: "${w}" twice`); seen.add(nfd(w));
      if (headSet.has(nfd(w).replace(/[?¿]/g, '').trim()) || qLits.has(nfd(w).replace(/[?¿]/g, '').trim())) fails.push(`${L}: "${w}" equals a head / a question word`);
      const k = +t.dataset.lcsKey;
      if (!(k >= 0 && k < bins.length)) fails.push(`${L}: key ${t.dataset.lcsKey} out of range`);
      if (r(t).height < G1 - 0.6) fails.push(`${L}: ${r(t).height.toFixed(1)} high < ${G1}`);
      if (fontOf(t) < 16) fails.push(`${L}: font ${fontOf(t)}`);
      const textW = r(t).width - 28;
      if (textW > guard + 12 + 0.6) fails.push(`${L}: "${w}" text ${textW.toFixed(0)} px > ${guard + 12} (the tile guard)`);
      if (!shelf || !shelf.contains(t)) fails.push(`${L}: not on the shelf`);
      tops.add(Math.round(r(t).top));
    });
    if (tops.size > 2) fails.push(`the shelf wraps to ${tops.size} rows (the fixed stack keys on 2)`);
    if (sort.querySelector('img')) fails.push('a picture on the sort face (the constituent alone decides)');
    if (sort.querySelector('[data-lcs-chip], [data-lcs-sentence]')) fails.push('a chip / sentence on the sort face');
    // SPARSE: the fixed stack fills the 677 budget; one line of slack at most
    if (shelf && bins.length) {
      const stackTop = r(shelf).top, stackBottom = Math.max(...bins.map((b) => r(b).bottom));
      const stack = stackBottom - stackTop;
      if (Math.abs(stack - stackWant) > 4) fails.push(`stack ${Math.round(stack)} != the fixed ${stackWant}`);
      if (stack < 660) fails.push(`stack ${Math.round(stack)} < 660 (sparse)`);
      if (body.bottom - stackBottom > SLACK_MAX) fails.push(`slack ${Math.round(body.bottom - stackBottom)} px under the bins (> ${SLACK_MAX}: sparse)`);
      if (stackBottom > body.bottom + 0.6) fails.push(`the bins end ${Math.round(stackBottom - body.bottom)} px under the body bottom`);
      if (stackTop - rr.top > 8) fails.push('the shelf does not sit at the stage top');
    }
    if (!tiles.length) fails.push('non-vacuity: 0 tiles');
    return fails;
  }

  if (mode === 'write') {
    const nRows = +root.dataset.lcsRows, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean), glyphH = +root.dataset.lcsGlyphh, w = +root.dataset.lcsW, picPx = +root.dataset.lcsPicpx, botMax = parseFloat(root.dataset.lcsBotmax);
    const rows = laneGrid('[data-lcs-row]', 'row', (ln) => contentBox(ln, 'p, img, svg'), 6);
    if (rows.length !== nRows) fails.push(`${rows.length} rows, config says ${nRows}`);
    if (nRows < 6 || nRows > 16) fails.push(`${nRows} rows outside [6, 16]`);
    if (root.querySelector('[data-lcs-bank-banner]')) fails.push('a bank on the write face');
    if (root.querySelector('[data-lcs-chip]')) fails.push('a chip on the write face');
    if (root.querySelector('[data-lcs-starter]')) fails.push('a starter on the ruling (the question is the child\'s)');
    if (!(glyphH >= 24)) fails.push(`glyphH ${glyphH} < 24`);
    const pageText = nfd(root.textContent);
    const hist = {}, botRows = [];
    rows.forEach((row, i) => {
      const L = `row ${i + 1}`;
      const ask = row.dataset.lcsAsk, name = row.dataset.lcsName, answer = row.dataset.lcsAnswer, frame = row.dataset.lcsFrame;
      uniq(row, L);
      if (!kinds.includes(ask)) fails.push(`${L}: ask "${ask}" is not a page kind`);
      if (!answer) fails.push(`${L}: no answer stamp`);
      else {
        if (!answer.startsWith(qPrefix + (qwords[ask] || '\u0000'))) fails.push(`${L}: the answer "${answer}" does not open with "${qPrefix}${qwords[ask]}"`);
        if (!/\?$/.test(answer)) fails.push(`${L}: the answer "${answer}" does not end with "?"`);
        if (pageText.includes(nfd(answer))) fails.push(`${L}: the canonical question "${answer}" is printed on the page`);
        if (glyphs(answer) * 18 + 16 > w + 0.6) fails.push(`${L}: "${answer}" needs ${glyphs(answer) * 18 + 16} px > the ${w} ruling`);
      }
      checkSentence(row, L, ask, name, row.dataset.lcsKind);
      const cells = [...row.querySelectorAll('[data-lcs-ruling-cell]')];
      if (cells.length !== 1) fails.push(`${L}: ${cells.length} ruling cells`);
      const svgs = row.querySelectorAll('svg[data-lcs-prim="writing-row"]');
      if (svgs.length !== 1) fails.push(`${L}: ${svgs.length} writing rows`);
      const svg = svgs[0];
      if (svg) {
        if (svg.querySelector('text')) fails.push(`${L}: text printed on the ruling`);
        if (r(svg).width < w - 0.6) fails.push(`${L}: ruling ${r(svg).width.toFixed(0)} < ${w}`);
        if (r(svg).height < glyphH + 20 - 0.6) fails.push(`${L}: ruling ${r(svg).height.toFixed(0)} high < glyphH + 20`);
        if (svg.querySelectorAll('line').length < 3) fails.push(`${L}: fewer than 3 school lines`);
      }
      const img = checkPortrait(row, L, Math.max(G2, picPx));
      if (img) botRows.push({ picKind: img.dataset.lcsPickind, ask });
      void frame;
      hist[ask] = (hist[ask] || 0) + 1;
    });
    for (const k of kinds) if (!(hist[k] >= 1)) fails.push(`kind "${k}" never asked`);
    if (Object.keys(hist).length < 2) fails.push('only one question word is ever the answer');
    const bot = botOf(botRows);
    if (bot > botMax + 1e-9) fails.push(`pictureBot ${bot.toFixed(2)} > ${botMax}`);
    if (!rows.length) fails.push('non-vacuity: 0 rows');
    return fails;
  }

  if (mode === 'ask') {
    const nRows = +root.dataset.lcsRows, kinds = (root.dataset.lcsKinds || '').split(',').filter(Boolean), glyphH = +root.dataset.lcsGlyphh, h = +root.dataset.lcsH, tile = +root.dataset.lcsTile, time = +root.dataset.lcsTime;
    const scene = root.querySelector('[data-lcs-ask-scene]'), lane = root.querySelector('[data-lcs-starters]');
    if (!scene) fails.push('no scene'); if (!lane) fails.push('no starter lane');
    if (scene) {
      if (!scene.hasAttribute('data-ws-content')) fails.push('the scene lacks data-ws-content');
      const tilesEl = [...scene.querySelectorAll('[data-lcs-scene-tile]')];
      if (tilesEl.length !== 4) fails.push(`${tilesEl.length} scene tiles (want 4)`);
      if (tilesEl.map((t) => t.dataset.lcsSceneTile).join(',') !== 'person,thing,place,clock') fails.push(`scene tiles ${tilesEl.map((t) => t.dataset.lcsSceneTile).join(',')}`);
      tilesEl.forEach((t) => {
        const L = `tile ${t.dataset.lcsSceneTile}`;
        if (r(t).width < 100 + 12 - 0.6) fails.push(`${L}: ${r(t).width.toFixed(0)} wide < 112`);
        const img = t.querySelector('img'), clk = t.querySelector('[data-lcs-prim="clock"]');
        if (t.dataset.lcsSceneTile === 'clock') {
          if (!clk) fails.push(`${L}: no clock`);
          else { if (+clk.dataset.lcsH !== time) fails.push(`${L}: clock shows ${clk.dataset.lcsH}, the scene stamps ${time}`); if (+clk.dataset.lcsM !== 0) fails.push(`${L}: minutes ${clk.dataset.lcsM}`); if (r(clk).width < CLOCK_FLOOR - 0.6) fails.push(`${L}: clock ${r(clk).width.toFixed(0)} < ${CLOCK_FLOOR}`); clk.querySelectorAll('text').forEach((tx) => { if (fontOf(tx) < 9) fails.push(`${L}: numerals ${fontOf(tx)} px`); }); }
        } else {
          if (!img) fails.push(`${L}: no picture`);
          else { if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`); if (r(img).width < tile - 0.6) fails.push(`${L}: picture ${r(img).width.toFixed(0)} < ${tile}`); if (img.dataset.lcsPickind !== t.dataset.lcsSceneTile) fails.push(`${L}: a ${img.dataset.lcsPickind} picture`); if (srcs.has(img.src)) fails.push(`${L}: src twice`); srcs.add(img.src); }
        }
        const outside = [...t.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (outside || (t.dataset.lcsSceneTile !== 'clock' && text(t))) fails.push(`${L}: text printed on the scene ("${outside || text(t)}")`);
      });
      if (r(scene).top - rr.top > 8) fails.push('the scene does not sit at the stage top');
    }
    if (lane) {
      if (!lane.hasAttribute('data-ws-content')) fails.push('the starter lane lacks data-ws-content');
      const rowsEl = [...lane.querySelectorAll('[data-lcs-ruling-row]')];
      if (rowsEl.length !== nRows || rowsEl.length !== kinds.length) fails.push(`${rowsEl.length} ruling rows, config says ${nRows} / ${kinds.length} starters`);
      const starters = (lane.dataset.lcsStarters || '').split(',');
      if (starters.length !== kinds.length) fails.push(`starter stamp ${starters.join(',')} vs kinds ${kinds.join(',')}`);
      if (new Set(starters.map(nfd)).size !== starters.length) fails.push('a starter twice');
      kinds.forEach((k, i) => { if (i < 4 && qwords[k] !== starters[i]) fails.push(`starter ${i + 1} "${starters[i]}" != qwords.${k} "${qwords[k]}"`); if (i >= 4 && ORDER.some((q) => nfd(qwords[q]) === nfd(starters[i]))) fails.push(`starter ${i + 1} "${starters[i]}" is a question word of the table (why / how only)`); });
      if (!(glyphH >= 24)) fails.push(`glyphH ${glyphH} < 24`);
      rowsEl.forEach((row, i) => {
        const L = `ruling ${i + 1}`;
        const svg = row.querySelector('svg[data-lcs-prim="writing-row"]');
        if (!svg) { fails.push(`${L}: no writing row`); return; }
        const st = [...svg.querySelectorAll('text')];
        if (st.length !== 1 || !st[0].hasAttribute('data-lcs-starter')) fails.push(`${L}: ${st.length} text nodes (want exactly the starter)`);
        else { if (text(st[0]) !== starters[i]) fails.push(`${L}: prints "${text(st[0])}", starter "${starters[i]}"`); if (fontOf(st[0]) < 16) fails.push(`${L}: starter font ${fontOf(st[0])}`); }
        if (Math.abs(r(svg).height - h) > 0.6) fails.push(`${L}: row ${r(svg).height.toFixed(0)} != h ${h}`);
        if (r(svg).width < 600) fails.push(`${L}: row ${r(svg).width.toFixed(0)} wide < 600`);
        if (i) { const gap = r(row).top - r(rowsEl[i - 1]).bottom; if (gap > 8.6) fails.push(`${L}: ${Math.round(gap)} px above it`); }
      });
    }
    if (root.querySelector('[data-lcs-sentence], [data-lcs-chip], [data-lcs-bank-banner], [data-lcs-mark]')) fails.push('a sentence / chip / bank / mark on the open face');
    if (scene && lane) {
      const stack = r(lane).bottom - r(scene).top;
      if (stack < 660) fails.push(`stack ${Math.round(stack)} < 660 (sparse: the six rows must fill the 677 budget)`);
      if (body.bottom - r(lane).bottom > SLACK_MAX) fails.push(`slack ${Math.round(body.bottom - r(lane).bottom)} px under the rulings (> ${SLACK_MAX}: sparse)`);
      if (r(lane).bottom > body.bottom + 0.6) fails.push('the rulings end under the body bottom');
      if (r(lane).top - r(scene).bottom > 12.6) fails.push(`${Math.round(r(lane).top - r(scene).bottom)} px between the scene and the rulings`);
    }
    return fails;
  }
  return [`mode "${mode}" has no verify branch`];
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
    2: { mode: 'base', rows: 7, chips: ['who', 'what', 'where'], kinds: { who: 2, what: 3, where: 2 }, picOf: 'subject', picPx: 56, maxChars: 40, chipPx: 20, chipH: 44, chipPad: 12, rowMin: 88, maxThings: 3, botMax: 0.35 },
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
  FACES, bankW, gapWidthOf, tileTextOf, tileEst, shelfRowsEst, need, resolveMatch, resolveFill, resolveSort, resolveWrite, resolveAsk, dealFace, faceData, TILE_GUARD, SORT_STACK,

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
    if (d.mode && d.mode !== 'base') return this._buildFace(bank, d, { locale: loc, pron, objForms }, ctx);
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

  /**
   * The five faces (design §3; tools/b4var-rows/question-words.js) on the additive `mode` knob —
   * dispatched before the base path touches the RNG:
   *   match   5 printed questions left, 5 deranged short answers with their picture right: draw the line (G1)
   *   fill    a 5-pill bank + 6 lanes: the question with a dashed box at its head over the marked answer: write the word (G1)
   *   sort    9 word tiles on a shelf + 3 ruled bins Who? What? Where?: write each tile under its question (G1)
   *   write   8 lane-less rows: the marked answer over a school-line ruling: write the whole question (G2)
   *   ask     one four-tile scene + six starter rulings incl. why / how: finish the questions (G2, open)
   * Guards key on the CONFIG (d.pairs / d.kinds / d.bank / d.bins / d.ruling / d.starters …), never the level.
   */
  _buildFace(bank, d, { locale, pron, objForms }, ctx) {
    if (!FACES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}" (${FACES.join(' | ')})`);
    if (!ctx || !ctx.rng) throw new Error(`${ID}: no rng in ctx`);
    const loc = (locale || 'en').slice(0, 2);
    const data = faceData(bank, loc, pron, objForms);
    const fn = { match: buildMatch, fill: buildFill, sort: buildSort, write: buildWrite, ask: buildAsk }[d.mode];
    return fn(bank, d, loc, ctx.rng, data);
  },

  /** The base branch re-derives the rows from the stamps; a face root (data-lcs-mode != base) is handed to VERIFY_FACE. */
  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-qw]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode && mode !== 'base') return page.evaluate(VERIFY_FACE);
    return page.evaluate(VERIFY_BASE);
  },
};
