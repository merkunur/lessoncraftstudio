/**
 * G2-316 — Compound Words: Picture + Picture (nt20-C; family key
 * `compound-words`, G2, en L.2.4.d — the national framework NAME elsewhere).
 * Design: docs/worksheet-gen/b3-designs/G2-316-compound-words.md §2/§5.
 *
 * "Two pictures make one word." Full-width cream rows read left to right as an
 * equation: [picture A] + [cue B] = [school-line lane]; the child names both
 * parts, decides the join and WRITES the new word. No text on the page but the
 * teal `+` and `=` (and, at d1, the part word under each picture + the bank of
 * the wholes). One apparatus, three locale SHAPES from data: compound (cue B =
 * the second part's picture), family (es fr: cue B = an affix chip), alterati
 * (it pt: A scaled 0.55 / 1.35 + a chip). Owned skill: meaning SYNTHESIS of a
 * compound (the boundary: K-231 letter tiles, G1-305 syllables, singular-
 * plural, G1-307 F5 prefixes, G2-315 spelling rules are NOT here; an opaque
 * compound — bluebell, buttercup — never reaches this page).
 *
 * THEMELESS (`themeAxis:{applicable:false}`; measured: the best single theme
 * holds 4–6 both-pictured pairs, pairs are cross-theme by nature) — pictures
 * come through lib/b3-picture-index.js (a bank `pic` pin wins; every pin and
 * every unpinned candidate was OPENED, the gate's OPENED record is the lock).
 * The fan lever is the curated pair SET via `unitAxis` (README ruling): a
 * unit = a bank set id; with no unit the bank's `exemplar` set ships.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   rows        equation rows (G2 page rule 8..16; d1 6 is the scaffold level,
 *               design ladder — the verify() floor is rows >= 6)
 *   pic         picture size (>= the G2 element floor 36)
 *   laneW/laneH/glyphH   the writing-row (glyphH >= 24)
 *   partWords   the part word printed under each picture (d1)
 *   bank        the bank of the wholes across the top, collation order (d1)
 *   minLinked   rows whose link is non-empty, where the locale has links
 *   maxLetters  whole word length cap (lane capacity: 0.75·glyphH per glyph)
 *   distinctParts   no part key twice on the page
 *   badges / padY / gap / wordPx   chrome
 * A locale / set / difficulty the pool cannot fill THROWS (refusal — never a
 * filler, never a silent substitution). build() reads ONLY
 * data/b3/compound-words.js (lib/b3-common.js bank) + the picture index;
 * never image-vocabulary.js.
 *
 * Answer hiding: each row stamps data-lcs-a / -b (vocab keys), -a-word /
 * -b-word / -a-stem (bank literals), -link, -whole (display form), -cut; the
 * root stamps data-lcs-face="base" data-lcs-set. verify() re-derives every
 * whole from the stamps (casing(aStem||aWord) + link + bWord, case-folded
 * after letter 1 — de keeps the capital, an inner capital fails), asserts the
 * whole is printed NOWHERE (the d1 bank excepted, which must be exactly the
 * set of wholes and never in row order), two cues + `+` then `=` + one empty
 * writing-row per row, no part key twice, every picture a colour picture,
 * every svg inside its row.
 *
 * PHASE 2 (2026-09-14) — the ADDITIVE `mode` knob (design §3): the five faces
 * are rows in tools/b3var-rows/compound-words.js that set `mode` in the
 * difficulty config ('link' G2-329 · 'cut' G2-330 · 'match' G2-331 · 'detect'
 * G2-332 · 'web' G2-333); _buildWith dispatches to _buildFace ONLY when the
 * resolved config carries `mode`, so the base's own three configs (no `mode`)
 * keep their path byte-identical (tools/b3-baseline.js is the proof). The root
 * is stamped data-lcs-mode + data-lcs-face="<mode>" only then, and verify()
 * hands such a page to _verifyFace.
 *   'link'   F1 — the JOINT is the decision: 8 rows [picture of the whole]
 *            [tile a][dashed box linkBoxW][tile b][writing row] (rows, not the
 *            design's 2×4 cards — a card's 302 px lane cannot hold a 14-letter
 *            whole under the school-hand model; the row lane is 340-400); the
 *            child writes the joint (or nothing) and the whole. REFUSED where
 *            bank.refuse.F1 (en it pt: no joint = no decision); needs
 *            >= minLinked linked + >= minEmpty empty cards; graded stems
 *            (aStem) never on this face (a stem cannot be "written in the box").
 *   'cut'    F2 — ANALYSIS: the whole printed in equal letter cells beside its
 *            own picture; the child draws ONE line where the second word
 *            starts. Pool = the set ∪ opaque ∪ onePart (whole pictured).
 *   'match'  F3 — pair 6 first-part pictures with 6 second-part pictures by
 *            MEANING (right column a derangement), write the compound on the
 *            lane of the first picture. The page never holds a cross pair
 *            a_i + link + b_j (i ≠ j) that is a bank whole or a crossWords
 *            entry. REFUSED where bank.refuse.F3.
 *   'detect' F4 — RECOGNITION with foils: a bank of `compounds` real compounds
 *            + `foils` look-alikes (shuffled, mixed), `compounds` lanes of two
 *            rulings round a `+`; the child circles the compounds and writes
 *            their parts. Opaque compounds allowed (analysis of FORM).
 *   'web'    F5 — PRODUCTIVITY of one head: `webs` hubs, each `lanes` (or the
 *            bank's `webLanes` ruling) satellites cued by the compound's own
 *            picture + a ghost of the hub in its true position. REFUSED below
 *            the floor (fewer hubs with >= lanes usable satellites than webs)
 *            or where bank.refuse.F5. Non-compound shapes (family / alterati)
 *            render the design's SIZE rows instead (the base noun's picture at
 *            0.55 / 1.35 as the only cue) from `sizePairs` >= 8, else REFUSE.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { candidates, pictureFor } = require('../../lib/b3-picture-index.js');
const { fileUri, displayWord } = require('../../lib/b2-common.js');
const { compare } = require('../../data/b2/collation.js');
const { wordBank } = require('../../templates/components-b2.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { compoundRow, compoundLinkRow, compoundCutRow, compoundMatchRow, compoundDetectBank, compoundDetectLane, compoundWebBlock, compoundSizeRow } = require('../../templates/components-b3.js');

const ID = 'G2-316';
const BANK = 'compound-words';
const WORD_RE = /^\p{L}+$/u;
const LANE_PAD_X = 14;                                   // inline .ws-lane padding override (design §2)
const ROW_INNER = 675 - 2 * LANE_PAD_X - 4;              // 643: body column 675 − padding − 2 px border each side
const OP = 28;                                           // opGlyph box
const GAP = 10;                                          // flex gap inside a row
const LANE_LEAD = 12;                                    // gap 10 + margin-left 2 before the lane
const HAND_PER_GLYPH = 0.75;                             // lane capacity: px per glyph ≈ 0.75·glyphH (measured on the
                                                         // platform's own letter-strokes model: 18–21 px at glyphH 28)
const MIN_WRITABLE = 60;                                 // design §5 rule 10
const FLOOR_ROWS = 8;                                    // a set below 8 disjoint items is REFUSED (design §2)

/** Nunito 800 part-word estimate (measured 7.4–8.1 px/char at 18 px → 0.45; 0.5 is the guard). */
function partWordEstimate(word, px) { return 0.5 * px * [...word].length; }

/** The picture a part renders: the bank's pin (must be a colour-index candidate) or the index's pick. */
function resolvePart(rng, p, loc, who) {
  if (!p || !p.vocabKey) throw new Error(`${who}: part without a vocabKey cannot be pictured — refuse the item`);
  if (p.pic) {
    const ok = candidates(p.vocabKey, loc).some((c) => c.theme === p.pic.theme && c.noun === p.pic.noun);
    if (!ok) throw new Error(`${who}: pinned picture ${p.pic.theme}/${p.pic.noun} is not a colour-index candidate for "${p.vocabKey}" in ${loc} (BW, blocked, excluded or uncached) — refuse`);
    return { theme: p.pic.theme, noun: p.pic.noun, src: fileUri(p.pic.theme, p.pic.noun) };
  }
  return pictureFor(rng, p.vocabKey, loc);
}

/** casing(aStem||a.word) + link + b: the bank literal is the truth; this only CHECKS it (design §2, §5 rule 1). */
function expectedWhole(it, casing) {
  const stem = it.aStem || it.a.word;
  const tail = it.b.affix != null ? String(it.b.affix).replace(/^-/, '') : it.b.word;
  const raw = stem + (it.link || '') + tail;
  const first = casing === 'keep-first' ? raw.charAt(0) : raw.charAt(0).toLowerCase();
  return first + raw.slice(1).toLowerCase();
}

/** Greedy sample-or-throw over a set: `n` items with no part key twice (distinctParts). */
function sampleDisjoint(rng, pool, n, distinct, who) {
  const order = rng.shuffle(pool);
  const taken = [];
  const used = new Set();
  for (const it of order) {
    if (taken.length === n) break;
    const keys = [it.a.vocabKey, it.b.vocabKey].filter(Boolean);
    if (distinct && keys.some((k) => used.has(k))) continue;
    keys.forEach((k) => used.add(k));
    taken.push(it);
  }
  if (taken.length < n) throw new Error(`${who}: only ${taken.length} items with distinct parts, need ${n} (refuse)`);
  return taken;
}

/** Sets that reach the base floor (8 items, every part distinct) — the unit list of the fan. */
function shippableSets(bank) {
  return (bank.units || []).filter((u) => Array.isArray(u.items) && u.items.length >= FLOOR_ROWS).map((u) => u.id);
}

/* ------------------------------------------------------------- Phase 2 helpers */
const FACES = ['link', 'cut', 'match', 'detect', 'web'];
const TILE_PAD = 24;                                     // .ws-tile padding 12 + 12
const TILE_PER_CHAR = 0.62;                              // Nunito 800 estimate (design §2)

/** A derangement of 0..n-1 (no fixed point; the lit-vocab-match idiom). */
function derange(rng, n) {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  let order;
  do { order = rng.shuffle(Array.from({ length: n }, (_, i) => i)); } while (order.some((v, i) => v === i));
  return order;
}

/** The base's per-item literal checks for a FACE pool (the same refusal messages); returns false when the item is skipped by length. */
function faceItemOk(it, bank, links, maxLetters, tag) {
  if (!it.a || !WORD_RE.test(it.a.word || '')) throw new Error(tag('a needs a word'));
  if (!it.whole || !WORD_RE.test(it.whole.word || '')) throw new Error(tag('whole is not letters'));
  const isChip = it.b && it.b.affix != null;
  if (!isChip && (!it.b || !WORD_RE.test(it.b.word || ''))) throw new Error(tag('b needs a word (or an affix)'));
  if (isChip && !/^-\p{L}+$/u.test(it.b.affix)) throw new Error(tag(`affix "${it.b.affix}" must start with "-"`));
  if (!links.includes(it.link || '')) throw new Error(tag(`link "${it.link}" not in ${JSON.stringify(links)}`));
  const exp = expectedWhole(it, bank.casing);
  if (it.whole.word !== exp) throw new Error(tag(`whole ≠ ${exp} (casing(aStem||a) + link + b)`));
  if (it.picOpened !== true) throw new Error(tag('picOpened is not true — refuse'));
  return [...it.whole.word].length <= maxLetters;
}

/** Every item of the bank with where it lives. */
function allItems(bank) {
  const out = [];
  (bank.units || []).forEach((u) => (u.items || []).forEach((it) => out.push({ it, where: 'set ' + u.id })));
  (bank.opaque || []).forEach((it) => out.push({ it, where: 'opaque' }));
  (bank.onePart || []).forEach((it) => out.push({ it, where: 'onePart' }));
  return out;
}

/** The set a face draws from: the unit, else the exemplar; below the floor = refused (as the base). */
function faceSet(bank, unit, loc, who) {
  const setId = unit || bank.exemplar;
  const set = (bank.units || []).find((u) => u.id === setId);
  if (!set) throw new Error(`${who}: set "${setId}" is not a ${loc} unit — refuse`);
  if (!Array.isArray(set.items) || set.items.length < FLOOR_ROWS) throw new Error(`${who}: ${loc} set ${setId} has ${(set.items || []).length} items < ${FLOOR_ROWS} — REFUSED, never filled`);
  return { setId, set };
}

/** The part key an item's part contributes to page-uniqueness: the vocab key, or the word when unpictured. */
function partId(p, loc) { return p.vocabKey ? 'k:' + p.vocabKey : 'w:' + String(p.word).toLocaleLowerCase(loc); }

/** Greedy sample-or-throw: `n` items with no part twice (keys or words), `accept(it)` optional. */
function sampleFaceRows(rng, pool, n, loc, who, accept) {
  const order = rng.shuffle(pool);
  const taken = [], used = new Set();
  for (const it of order) {
    if (taken.length === n) break;
    const ids = [it.a, it.b].filter((p) => p && p.affix == null).map((p) => partId(p, loc));
    if (ids.some((k) => used.has(k))) continue;
    if (accept && !accept(it, taken)) continue;
    ids.forEach((k) => used.add(k));
    taken.push(it);
  }
  if (taken.length < n) throw new Error(`${who}: only ${taken.length} items with distinct parts, need ${n} (refuse)`);
  return taken;
}

/** The picture a whole / hub renders: a pin on any bank part with that key wins, else the index's pick. */
function resolveKey(rng, bank, key, loc, who) {
  for (const { it } of allItems(bank)) for (const p of [it.a, it.b]) if (p && p.vocabKey === key && p.pic) return resolvePart(rng, p, loc, who);
  for (const sp of bank.sizePairs || []) if (sp.base && sp.base.vocabKey === key && sp.base.pic) return resolvePart(rng, sp.base, loc, who);
  return pictureFor(rng, key, loc);
}

function stampsOf(it) {
  const stem = it.aStem || it.a.word;
  return {
    a: it.a.vocabKey || it.a.word, aWord: it.a.word, aStem: it.aStem || '',
    b: it.b.affix != null ? it.b.affix : (it.b.vocabKey || it.b.word), bWord: it.b.affix != null ? '' : it.b.word,
    link: it.link || '', whole: it.whole.word, cut: [...stem].length + [...(it.link || '')].length,
  };
}

module.exports = {
  id: ID,
  slug: 'compound-words-picture-plus-picture',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'compound-words',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => shippableSets(loadBank(BANK, (loc || 'en').slice(0, 2))),
    exemplar: (loc) => loadBank(BANK, (loc || 'en').slice(0, 2)).exemplar,
  },
  difficulty: {
    1: { rows: 6, pic: 64, laneW: 400, laneH: 76, glyphH: 34, partWords: true, bank: true, minLinked: 0, maxLetters: 12, distinctParts: true, badges: true, padY: 6, gap: 8, wordPx: 18 },
    2: { rows: 8, pic: 64, laneW: 410, laneH: 64, glyphH: 28, partWords: false, bank: false, minLinked: 2, maxLetters: 14, distinctParts: true, badges: true, padY: 6, gap: 8, wordPx: 18 },
    3: { rows: 10, pic: 48, laneW: 426, laneH: 50, glyphH: 24, partWords: false, bank: false, minLinked: 4, maxLetters: 14, distinctParts: true, badges: false, padY: 4, gap: 8, wordPx: 18 },
  },
  i18n: {
    en: {
      title: 'Compound Words: Picture + Picture',
      instruction: 'Name the two pictures, join the two words and write the new word on the line.',
    },
  },

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const who = ID;
    if (d.mode) return this._buildFace(bank, d, loc, ctx, unit || null);   // Phase 2 faces (their own guards); the base path below is untouched
    if (!(d.rows >= 6 && d.rows <= 16)) throw new Error(`${who}: rows ${d.rows} outside the page rule 6..16`);
    if (d.pic < 36) throw new Error(`${who}: pic ${d.pic} below the G2 element floor 36`);
    if (d.glyphH < 24) throw new Error(`${who}: glyphH ${d.glyphH} below the G2 handwriting floor 24`);
    if (d.laneH < d.glyphH + 6) throw new Error(`${who}: laneH ${d.laneH} cannot hold glyphH ${d.glyphH}`);
    if (!['compound', 'family', 'alterati'].includes(bank.shape)) throw new Error(`${who}: ${loc} bank shape "${bank.shape}"`);
    if (!['keep-first', 'lower'].includes(bank.casing)) throw new Error(`${who}: ${loc} bank casing "${bank.casing}"`);
    const links = Array.isArray(bank.links) ? bank.links : [];
    if (!links.includes('')) throw new Error(`${who}: ${loc} links must include ''`);

    // the set (unit) — the exemplar when the wave configured none; must reach the floor
    const setId = unit || bank.exemplar;
    const set = (bank.units || []).find((u) => u.id === setId);
    if (!set) throw new Error(`${who}: set "${setId}" is not a ${loc} unit — refuse`);
    const items = Array.isArray(set.items) ? set.items : [];
    if (items.length < FLOOR_ROWS) throw new Error(`${who}: ${loc} set ${setId} has ${items.length} items < ${FLOOR_ROWS} — REFUSED, never filled`);

    // the pool: transparent items, legal literals, whole === casing(stem)+link+b (the bank is the truth; a
    // mismatch is a data defect, refused), both cues resolvable, length cap, link in the locale set
    const pool = [];
    for (const it of items) {
      const tag = (m) => `${who}: ${loc} set ${setId} item "${it.whole && it.whole.word}": ${m}`;
      if (it.opaque) continue;                                   // meaning synthesis only (design §2 risks)
      if (!it.a || !it.a.vocabKey || !WORD_RE.test(it.a.word || '')) throw new Error(tag('a needs a pictured vocabKey + a word'));
      if (!it.whole || !WORD_RE.test(it.whole.word || '')) throw new Error(tag('whole is not letters'));
      const isChip = it.b && it.b.affix != null;
      if (!isChip && (!it.b || !it.b.vocabKey || !WORD_RE.test(it.b.word || ''))) throw new Error(tag('b needs a pictured vocabKey + a word (or an affix)'));
      if (isChip && !/^-\p{L}+$/u.test(it.b.affix)) throw new Error(tag(`affix "${it.b.affix}" must start with "-"`));
      if (isChip === (bank.shape === 'compound')) throw new Error(tag(`cue B (${isChip ? 'chip' : 'picture'}) does not match the ${bank.shape} shape`));
      if (!links.includes(it.link || '')) throw new Error(tag(`link "${it.link}" not in ${JSON.stringify(links)}`));
      const exp = expectedWhole(it, bank.casing);
      if (it.whole.word !== exp) throw new Error(tag(`whole ≠ ${exp} (casing(aStem||a) + link + b)`));
      if (it.picOpened !== true) throw new Error(tag('picOpened is not true — refuse'));
      if ([...it.whole.word].length > d.maxLetters) continue;
      pool.push(it);
    }
    // lane capacity on the RESOLVED config (the design's ~21 px/glyph at glyphH 28 = 0.75·glyphH)
    if (d.maxLetters * HAND_PER_GLYPH * d.glyphH > d.laneW - 16) throw new Error(`${who}: lane ${d.laneW} cannot hold ${d.maxLetters} glyphs at glyphH ${d.glyphH} (${Math.round(d.maxLetters * HAND_PER_GLYPH * d.glyphH)} px)`);
    const minLinked = links.some((l) => l) ? d.minLinked : 0;   // "where the locale has links, else 0"
    if (pool.length < d.rows) throw new Error(`${who}: ${loc} set ${setId} has ${pool.length} transparent items <= ${d.maxLetters} letters, need ${d.rows} (refuse)`);

    // sample with distinct parts, then enforce minLinked by re-rolling (the pool decides, never a filler)
    let chosen;
    for (let tries = 0; ; tries++) {
      chosen = sampleDisjoint(rng, pool, d.rows, d.distinctParts, who);
      const linked = chosen.filter((it) => it.link).length;
      if (linked >= minLinked) break;
      if (tries > 60) throw new Error(`${who}: ${loc} set ${setId} cannot place ${minLinked} linked items on ${d.rows} rows (refuse)`);
    }

    // cues resolved through the index (a pin must be a candidate); the part word (d1) rides under the picture
    const rows = chosen.map((it) => {
      const picA = resolvePart(rng, it.a, loc, who);
      const wordA = d.partWords ? displayWord(it.a.word, loc) : null;
      let cueB, picB = null;
      if (it.b.affix != null) cueB = { chip: it.b.affix, fontPx: 20, tileH: 40 };
      else {
        picB = resolvePart(rng, it.b, loc, who);
        cueB = { src: picB.src, px: d.pic, key: it.b.vocabKey, word: d.partWords ? displayWord(it.b.word, loc) : null };
      }
      const scale = it.whole.scale && it.whole.scale !== 1 ? it.whole.scale : 1;
      const cueA = { src: picA.src, px: Math.round(d.pic * scale), key: it.a.vocabKey, word: wordA };
      if (cueA.px < 36) throw new Error(`${who}: scaled picture ${cueA.px} px below the G2 floor 36`);
      return { it, cueA, cueB, picA, picB };
    });

    // the lane width: the row must hold both columns + two ops inside 643; a wide part word (d1) narrows the lane,
    // never below the capacity the cap needs (verify measures the real spans)
    const colW = (c) => Math.max(c.px || 0, c.chip ? 24 + 0.62 * 20 * [...c.chip].length : 0, c.word ? partWordEstimate(c.word, d.wordPx) : 0);
    let laneW = d.laneW;
    for (const r of rows) {
      const used = colW(r.cueA) + GAP + OP + GAP + colW(r.cueB) + GAP + OP + LANE_LEAD;
      laneW = Math.min(laneW, Math.floor(ROW_INNER - used));
    }
    const need = Math.max(MIN_WRITABLE, Math.ceil(d.maxLetters * HAND_PER_GLYPH * d.glyphH) + 16);
    if (laneW < need) throw new Error(`${who}: lane shrinks to ${laneW} px < ${need} needed for ${d.maxLetters} glyphs (refuse the set at this difficulty)`);

    // the bank (d1): the wholes in the locale's collation order; the rows never in that order
    let order = rows.map((_, i) => i);
    let bankHtml = '';
    if (d.bank) {
      const wholes = rows.map((r) => r.it.whole.word);
      const sorted = wholes.slice().sort((x, y) => compare(x, y, loc));
      for (let tries = 0; wholes.join('|') === sorted.join('|'); tries++) {
        order = rng.shuffle(order);
        for (let i = 0; i < rows.length; i++) wholes[i] = rows[order[i]].it.whole.word;
        if (tries > 50) throw new Error(`${who}: rows cannot be ordered away from the bank order`);
      }
      bankHtml = wordBank({ words: sorted.map((w) => ({ word: w })), wordPx: 18 });
    }
    const ordered = order.map((i) => rows[i]);

    const lane = { w: laneW, h: d.laneH, glyphH: d.glyphH };
    const rowHtml = ordered.map((r, i) => {
      const it = r.it;
      const stem = it.aStem || it.a.word;
      const cut = [...stem].length + [...(it.link || '')].length;
      return compoundRow({
        index: i + 1, cueA: r.cueA, cueB: r.cueB, lane, wordPx: d.wordPx, badge: d.badges,
        pad: `${d.padY}px ${LANE_PAD_X}px`, gap: GAP,
        stamps: { a: it.a.vocabKey, aWord: it.a.word, aStem: it.aStem || '', b: it.b.affix != null ? it.b.affix : it.b.vocabKey, bWord: it.b.affix != null ? '' : it.b.word, link: it.link || '', whole: it.whole.word, cut },
      });
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${ordered.length},minmax(0,1fr));gap:${d.gap}px;min-height:0">${rowHtml.join('')}</div>`;
    const bodyHtml = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-compound data-lcs-face="base" ` +
      `data-lcs-set="${setId}" data-lcs-shape="${bank.shape}" data-lcs-casing="${bank.casing}" data-lcs-rows="${ordered.length}" data-lcs-lane-w="${laneW}" ` +
      `data-lcs-pic="${d.pic}" data-lcs-min-linked="${minLinked}" data-lcs-distinct-parts="${d.distinctParts ? 1 : 0}" data-lcs-part-words="${d.partWords ? 1 : 0}"` +
      (d.bank ? ' data-lcs-has-bank="1"' : '') + '>' + bankHtml + grid + '</div>';
    return {
      bodyHtml,
      meta: {
        set: setId, wholes: ordered.map((r) => r.it.whole.word), parts: ordered.map((r) => [r.it.a.vocabKey, r.it.b.affix != null ? r.it.b.affix : r.it.b.vocabKey]),
        links: ordered.map((r) => r.it.link || ''), pictures: ordered.map((r) => [r.picA.theme + '/' + r.picA.noun, r.picB ? r.picB.theme + '/' + r.picB.noun : null]),
        laneW, minLinked, pool: pool.length,
      },
    };
  },

  /* ------------------------------------------------------------ Phase 2: the faces */
  _buildFace(bank, d, loc, ctx, unit) {
    if (!FACES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}"`);
    if (!['compound', 'family', 'alterati'].includes(bank.shape)) throw new Error(`${ID}: ${loc} bank shape "${bank.shape}"`);
    if (!['keep-first', 'lower'].includes(bank.casing)) throw new Error(`${ID}: ${loc} bank casing "${bank.casing}"`);
    if (!Array.isArray(bank.links) || !bank.links.includes('')) throw new Error(`${ID}: ${loc} links must include ''`);
    switch (d.mode) {
      case 'link': return this._buildLink(bank, d, loc, ctx, unit);
      case 'cut': return this._buildCut(bank, d, loc, ctx, unit);
      case 'match': return this._buildMatch(bank, d, loc, ctx, unit);
      case 'detect': return this._buildDetect(bank, d, loc, ctx, unit);
      default: return this._buildWeb(bank, d, loc, ctx, unit);
    }
  },

  _faceRoot(mode, attrs, inner, bank) {
    return `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-compound data-lcs-mode="${mode}" data-lcs-face="${mode}" ` +
      `data-lcs-shape="${bank.shape}" data-lcs-casing="${bank.casing}"${attrs}>${inner}</div>`;
  },

  /** F1 — What Goes in the Middle? (`mode:'link'`): the joint is the decision. */
  _buildLink(bank, d, loc, ctx, unit) {
    const who = ID, rng = ctx.rng;
    if (bank.refuse && bank.refuse.F1) throw new Error(`${who}: ${loc} REFUSES the link face (refuse.F1 — the joint is no decision / has no joint here)`);
    if (!(d.cards >= 6 && d.cards <= 10)) throw new Error(`${who}: link cards ${d.cards} must be 6..10`);
    if (!(d.linkBoxW >= 24)) throw new Error(`${who}: linkBoxW ${d.linkBoxW}`);
    if (d.glyphH < 24) throw new Error(`${who}: glyphH ${d.glyphH} below the G2 handwriting floor 24`);
    const links = bank.links;
    const { setId, set } = faceSet(bank, unit, loc, who);
    const tileW = (w) => TILE_PAD + TILE_PER_CHAR * d.tileFont * [...w].length;
    const usedBy = (it) => d.wholePic + 2 + 8 + tileW(it.a.word) + 8 + d.linkBoxW + 8 + tileW(it.b.word) + 8 + 4;
    // the lane budget: the gate's school-hand model measures ~1.1·glyphH per written glyph × 1.5 margin; laneNeedPerGlyph
    // carries that budget into the build (the base's 0.75 is the design's estimate, kept for the base path)
    const need = Math.max(MIN_WRITABLE, Math.ceil(d.maxLetters * (d.laneNeedPerGlyph || HAND_PER_GLYPH) * d.glyphH) + 16);
    const pool = [];
    let dropped = 0;
    for (const { it, where } of [...set.items.map((it) => ({ it, where: 'set ' + setId })), ...(bank.onePart || []).map((it) => ({ it, where: 'onePart' }))]) {
      const tag = (m) => `${who}: ${loc} ${where} item "${it.whole && it.whole.word}": ${m}`;
      if (it.opaque) continue;                                        // the child SYNTHESISES the whole: transparent only
      if (it.aStem) { dropped++; continue; }                          // a graded stem cannot be "written in the box" (design OPEN 3)
      if (it.b && it.b.affix != null) { dropped++; continue; }        // family / alterati: no joint to write
      if (!faceItemOk(it, bank, links, d.maxLetters, tag)) { dropped++; continue; }
      if (!it.whole.vocabKey || !candidates(it.whole.vocabKey, loc).length) throw new Error(tag('whole needs a colour picture (the clue)'));
      if (ROW_INNER - usedBy(it) < need) { dropped++; continue; }    // its tiles would leave the page lane below the hand budget
      pool.push(it);
    }
    const linkedN = pool.filter((it) => it.link).length, emptyN = pool.length - linkedN;
    if (linkedN < d.minLinked || emptyN < d.minEmpty) throw new Error(`${who}: ${loc} link pool has ${linkedN} linked / ${emptyN} empty usable items (need ${d.minLinked} / ${d.minEmpty}) — REFUSED`);
    if (pool.length < d.cards) throw new Error(`${who}: ${loc} link pool ${pool.length} < ${d.cards} cards (refuse)`);
    let chosen;
    for (let tries = 0; ; tries++) {
      chosen = sampleFaceRows(rng, pool, d.cards, loc, who);
      const l = chosen.filter((it) => it.link).length;
      if (l >= d.minLinked && chosen.length - l >= d.minEmpty) break;
      if (tries > 60) throw new Error(`${who}: ${loc} cannot seat ${d.minLinked} linked + ${d.minEmpty} empty joints on ${d.cards} cards (refuse)`);
    }
    // the lane: the widest tile line on the page narrows every lane (one width per page, as the base); never below the need
    let laneW = d.laneW, lineW = 0;
    for (const it of chosen) { laneW = Math.min(laneW, Math.floor(ROW_INNER - usedBy(it))); lineW = Math.max(lineW, Math.ceil(tileW(it.a.word) + 8 + d.linkBoxW + 8 + tileW(it.b.word))); }
    if (laneW < need) throw new Error(`${who}: link lane shrinks to ${laneW} px < ${need} needed for ${d.maxLetters} glyphs (refuse the page)`);
    const lane = { w: laneW, h: d.laneH, glyphH: d.glyphH };
    const rowsHtml = chosen.map((it, i) => {
      const wp = resolveKey(rng, bank, it.whole.vocabKey, loc, who);
      return compoundLinkRow({
        index: i + 1, tileA: it.a.word, tileB: it.b.word, linkBoxW: d.linkBoxW, tileFont: d.tileFont, tileH: d.tileH,
        wholePic: { src: wp.src, key: it.whole.vocabKey, px: d.wholePic }, lane, stamps: stampsOf(it), pad: `${d.padY}px ${LANE_PAD_X}px`, badge: d.badges, lineW,
      });
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:${d.gap}px;min-height:0">${rowsHtml.join('')}</div>`;
    const bodyHtml = this._faceRoot('link', ` data-lcs-set="${setId}" data-lcs-cards="${chosen.length}" data-lcs-linkbox-w="${d.linkBoxW}" data-lcs-min-linked="${d.minLinked}" data-lcs-min-empty="${d.minEmpty}" data-lcs-pic="${d.wholePic}" data-lcs-tile-font="${d.tileFont}" data-lcs-lane-w="${laneW}"`, grid, bank);
    return { bodyHtml, meta: { set: setId, wholes: chosen.map((it) => it.whole.word), links: chosen.map((it) => it.link || ''), laneW, pool: pool.length, dropped } };
  },

  /** F2 — Split the Compound (`mode:'cut'`): the whole in letter cells, one line at the seam. */
  _buildCut(bank, d, loc, ctx, unit) {
    const who = ID, rng = ctx.rng;
    if (!(d.rows >= 6 && d.rows <= 16)) throw new Error(`${who}: rows ${d.rows} outside the page rule 6..16`);
    if (!(d.cell >= 24) || !(d.cellFont >= 18) || d.cellFont > d.cell) throw new Error(`${who}: cut cell ${d.cell} / font ${d.cellFont}`);
    if (d.cutPic < 36) throw new Error(`${who}: cut picture ${d.cutPic} below the G2 element floor 36`);
    if (d.seam != null) throw new Error(`${who}: a seam tick is never printed on the shipped cut face (d1 only)`);
    const links = bank.links;
    const { setId, set } = faceSet(bank, unit, loc, who);
    const pool = [];
    for (const { it, where } of [...set.items.map((it) => ({ it, where: 'set ' + setId })), ...(bank.opaque || []).map((it) => ({ it, where: 'opaque' })), ...(bank.onePart || []).map((it) => ({ it, where: 'onePart' }))]) {
      const tag = (m) => `${who}: ${loc} ${where} item "${it.whole && it.whole.word}": ${m}`;
      if (!faceItemOk(it, bank, links, d.maxLetters, tag)) continue;
      if (!it.whole.vocabKey || !candidates(it.whole.vocabKey, loc).length) {
        if (bank.shape === 'compound') throw new Error(tag('whole needs a colour picture'));
        continue;                                                   // family / alterati wholes may be unpictured (design: the root's picture is the d-fallback, Phase 4)
      }
      if (d.cutPic + 12 + [...it.whole.word].length * d.cell > ROW_INNER) continue;
      pool.push(it);
    }
    if (pool.length < d.rows) throw new Error(`${who}: ${loc} cut pool has ${pool.length} pictured wholes <= ${d.maxLetters} letters, need ${d.rows} (refuse)`);
    const chosen = sampleFaceRows(rng, pool, d.rows, loc, who);
    const rowsHtml = chosen.map((it, i) => {
      const wp = resolveKey(rng, bank, it.whole.vocabKey, loc, who);
      return compoundCutRow({ index: i + 1, wholePic: { src: wp.src, key: it.whole.vocabKey, px: d.cutPic }, word: it.whole.word, cell: d.cell, fontPx: d.cellFont, stamps: stampsOf(it), pad: `${d.padY}px ${LANE_PAD_X}px`, badge: d.badges })
        .replace('data-lcs-row=', `data-lcs-whole-key="${it.whole.vocabKey}" data-lcs-row=`);
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:${d.gap}px;min-height:0">${rowsHtml.join('')}</div>`;
    const bodyHtml = this._faceRoot('cut', ` data-lcs-set="${setId}" data-lcs-rows="${chosen.length}" data-lcs-cell="${d.cell}" data-lcs-cell-font="${d.cellFont}" data-lcs-pic="${d.cutPic}"`, grid, bank);
    return { bodyHtml, meta: { set: setId, wholes: chosen.map((it) => it.whole.word), cuts: chosen.map((it) => stampsOf(it).cut), pool: pool.length } };
  },

  /** F3 — Match the Halves (`mode:'match'`): 6 first-part pictures ↔ 6 second-part pictures, deranged. */
  _buildMatch(bank, d, loc, ctx, unit) {
    const who = ID, rng = ctx.rng;
    if (bank.refuse && bank.refuse.F3) throw new Error(`${who}: ${loc} REFUSES the match face (refuse.F3)`);
    if (!(d.pairs >= 4 && d.pairs <= 8)) throw new Error(`${who}: match pairs ${d.pairs} outside 4..8`);
    if (d.pic < 36) throw new Error(`${who}: match picture ${d.pic} below the G2 element floor 36`);
    if (bank.shape === 'alterati') throw new Error(`${who}: ${loc} alterati shape has no halves to match — REFUSED`);
    const links = bank.links;
    const { setId, set } = faceSet(bank, unit, loc, who);
    const pool = [];
    for (const it of set.items) {
      const tag = (m) => `${who}: ${loc} set ${setId} item "${it.whole && it.whole.word}": ${m}`;
      if (it.opaque) continue;
      if (!faceItemOk(it, bank, links, d.maxLetters, tag)) continue;
      if (!it.a.vocabKey || !(it.b && it.b.vocabKey)) continue;   // both halves must be pictured
      pool.push(it);
    }
    if (pool.length < d.pairs) throw new Error(`${who}: ${loc} set ${setId} has ${pool.length} both-pictured pairs <= ${d.maxLetters} letters, need ${d.pairs} (refuse)`);
    // the cross-product guard: no a_i + link + b_j (i ≠ j) may be a bank whole or a crossWords entry
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const wholes = new Set(allItems(bank).map(({ it }) => lower(it.whole.word)));
    const cross = new Set((bank.crossWords || []).map((p) => lower(p[0]) + '|' + lower(p[1])));
    const crossHit = (rows) => {
      for (const i of rows) for (const j of rows) {
        if (i === j) continue;
        if (cross.has(lower(i.a.word) + '|' + lower(j.b.word))) return `${i.a.word}+${j.b.word} (crossWords)`;
        for (const l of links) if (wholes.has(lower(i.a.word + l + j.b.word))) return `${i.a.word}+${l ? l + '+' : ''}${j.b.word} (a bank whole)`;
      }
      return null;
    };
    let chosen, hit;
    for (let tries = 0; ; tries++) {
      chosen = sampleFaceRows(rng, pool, d.pairs, loc, who);
      hit = crossHit(chosen);
      if (!hit) break;
      if (tries > 60) throw new Error(`${who}: ${loc} set ${setId} cannot seat ${d.pairs} pairs without a cross pair (${hit}) — refuse`);
    }
    const perm = d.derange === false ? chosen.map((_, i) => i) : derange(rng, chosen.length);
    const lane = { w: d.laneW, h: d.laneH, glyphH: d.glyphH };
    const need = Math.max(MIN_WRITABLE, Math.ceil(d.maxLetters * (d.laneNeedPerGlyph || HAND_PER_GLYPH) * d.glyphH) + 16);
    if (lane.w < need) throw new Error(`${who}: match lane ${lane.w} < ${need} needed for ${d.maxLetters} glyphs`);
    const rowW = lane.w + 12 + (d.pic + 12) + 12 + d.matchGap + 12 + (d.pic + 12);
    if (rowW > 675) throw new Error(`${who}: match row ${rowW} px > the body column 675`);
    const rowsHtml = chosen.map((it, i) => {
      const partner = chosen[perm[i]];
      const pa = resolvePart(rng, it.a, loc, who), pb = resolvePart(rng, partner.b, loc, who);
      return compoundMatchRow({
        index: i + 1, lane, pic: d.pic, gap: d.matchGap,
        left: { src: pa.src, key: it.a.vocabKey, px: d.pic, word: it.a.word },
        right: { src: pb.src, key: partner.b.vocabKey, px: d.pic, word: partner.b.word },
        stamps: stampsOf(it),
      });
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:${d.gap}px;min-height:0;padding:0 ${Math.floor((675 - rowW) / 2)}px">${rowsHtml.join('')}</div>`;
    const bodyHtml = this._faceRoot('match', ` data-lcs-set="${setId}" data-lcs-pairs="${chosen.length}" data-lcs-pic="${d.pic}" data-lcs-lane-w="${lane.w}" data-lcs-deranged="${d.derange === false ? 0 : 1}"`, grid, bank);
    return { bodyHtml, meta: { set: setId, wholes: chosen.map((it) => it.whole.word), order: perm, pool: pool.length } };
  },

  /** F4 — Compound Detective (`mode:'detect'`): a bank of compounds + look-alike foils, lanes for the parts. */
  _buildDetect(bank, d, loc, ctx, unit) {
    const who = ID, rng = ctx.rng;
    if (!(d.compounds >= 4 && d.compounds <= 8) || !(d.foils >= 4 && d.foils <= 8)) throw new Error(`${who}: detect compounds ${d.compounds} / foils ${d.foils} outside 4..8`);
    if (d.iconPx < 36) throw new Error(`${who}: detect icon ${d.iconPx} below the G2 element floor 36`);
    if (d.glyphH < 24 || d.laneH < d.glyphH + 6) throw new Error(`${who}: detect lane ${d.laneW}×${d.laneH}/${d.glyphH}`);
    const links = bank.links;
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const { setId, set } = faceSet(bank, unit, loc, who);
    const pool = [];
    for (const { it, where } of [...set.items.map((it) => ({ it, where: 'set ' + setId })), ...(bank.opaque || []).map((it) => ({ it, where: 'opaque' })), ...(bank.onePart || []).map((it) => ({ it, where: 'onePart' }))]) {
      const tag = (m) => `${who}: ${loc} ${where} item "${it.whole && it.whole.word}": ${m}`;
      if (!faceItemOk(it, bank, links, d.maxLetters, tag)) continue;
      if (!it.whole.vocabKey || !candidates(it.whole.vocabKey, loc).length) { if (bank.shape === 'compound') throw new Error(tag('whole needs a colour picture')); continue; }
      pool.push(it);
    }
    const foils = (bank.foils || []).filter((fo) => fo.vocabKey && WORD_RE.test(fo.word || '') && candidates(fo.vocabKey, loc).length);
    if (pool.length < d.compounds) throw new Error(`${who}: ${loc} detect pool ${pool.length} < ${d.compounds} compounds (refuse)`);
    if (foils.length < d.foils) throw new Error(`${who}: ${loc} has ${foils.length} pictured foils < ${d.foils} — REFUSED`);
    const chosen = sampleFaceRows(rng, pool, d.compounds, loc, who);
    const wholesOnPage = chosen.map((it) => lower(it.whole.word));
    const foilPool = foils.filter((fo) => !wholesOnPage.some((w) => lower(fo.word) === w || lower(fo.word).includes(w)));
    if (foilPool.length < d.foils) throw new Error(`${who}: ${loc} has ${foilPool.length} foils clear of the page's wholes < ${d.foils} — refuse`);
    const pickedFoils = rng.sample(foilPool, d.foils);
    const chips = [
      ...chosen.map((it) => ({ kind: 'c', it })),
      ...pickedFoils.map((fo) => ({ kind: 'f', fo })),
    ];
    let order;
    for (let tries = 0; ; tries++) {
      order = rng.shuffle(chips);
      const half = Math.floor(order.length / 2);
      const firstF = order.slice(0, half).filter((c) => c.kind === 'f').length;
      const firstC = half - firstF;
      if (firstF >= 2 && firstC >= 2) break;                         // MIXED: neither kind sits in one half of the bank
      if (tries > 60) throw new Error(`${who}: cannot mix the detect bank (refuse)`);
    }
    const rendered = order.map((c) => {
      if (c.kind === 'f') { const p = resolveKey(rng, bank, c.fo.vocabKey, loc, who); return { word: c.fo.word, key: c.fo.vocabKey, src: p.src, foil: true }; }
      const it = c.it, st = stampsOf(it);
      const p = resolveKey(rng, bank, it.whole.vocabKey, loc, who);
      return { word: it.whole.word, key: it.whole.vocabKey, src: p.src, parts: [st.aStem || st.aWord, st.link, st.bWord || st.b.replace(/^-/, '')] };
    });
    const bankHtml = compoundDetectBank({ chips: rendered, iconPx: d.iconPx, wordPx: d.wordPx });
    const lanes = chosen.map((_, i) => compoundDetectLane({ n: i + 1, w: d.laneW, h: d.laneH, glyphH: d.glyphH, pad: '2px 14px' }));
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${lanes.length},minmax(0,1fr));gap:${d.laneGap}px;min-height:0;margin-top:10px;padding-bottom:4px">${lanes.join('')}</div>`;
    const bodyHtml = this._faceRoot('detect', ` data-lcs-set="${setId}" data-lcs-bank="${rendered.length}" data-lcs-compounds="${chosen.length}" data-lcs-foils="${pickedFoils.length}" data-lcs-icon="${d.iconPx}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}"`, bankHtml + grid, bank);
    return { bodyHtml, meta: { set: setId, wholes: chosen.map((it) => it.whole.word), foils: pickedFoils.map((f) => f.word), order: order.map((c) => c.kind).join(''), pool: pool.length, foilPool: foilPool.length } };
  },

  /** F5 — One Head, Many Words (`mode:'web'`): `webs` hubs × `lanes` satellites; size rows for family / alterati. */
  _buildWeb(bank, d, loc, ctx, unit) {
    const who = ID, rng = ctx.rng;
    if (bank.refuse && bank.refuse.F5) throw new Error(`${who}: ${loc} REFUSES the web face (refuse.F5)`);
    if (bank.shape !== 'compound') return this._buildSize(bank, d, loc, ctx, unit);
    if (!(d.webs >= 1 && d.webs <= 2)) throw new Error(`${who}: webs ${d.webs} outside 1..2`);
    if (bank.webLanes != null && ![3, 4].includes(bank.webLanes)) throw new Error(`${who}: ${loc} bank.webLanes ${bank.webLanes} must be 3 or 4`);
    const lanes = bank.webLanes != null ? bank.webLanes : d.lanes;
    if (!(lanes >= 3 && lanes <= 5)) throw new Error(`${who}: lanes ${lanes} outside 3..5`);
    if (d.pic < 36 || d.hubPx < 36) throw new Error(`${who}: web pictures ${d.pic} / ${d.hubPx} below the G2 element floor 36`);
    if (!(d.ghost > 0.3 && d.ghost < 0.8)) throw new Error(`${who}: ghost opacity ${d.ghost} must sit in (0.3, 0.8)`);
    if (d.glyphH < 24) throw new Error(`${who}: glyphH ${d.glyphH} below the G2 handwriting floor 24`);
    const links = bank.links;
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const foldAfterFirst = (s) => s.charAt(0) + s.slice(1).toLocaleLowerCase(loc);
    const byWhole = new Map();
    for (const { it, where } of allItems(bank)) byWhole.set(lower(it.whole.word), { it, where });
    const lane = { w: d.laneW, h: d.laneH, glyphH: d.glyphH };
    const need = Math.max(MIN_WRITABLE, Math.ceil(d.maxLetters * HAND_PER_GLYPH * d.glyphH) + 16);
    if (lane.w < need) throw new Error(`${who}: web lane ${lane.w} < ${need} needed for ${d.maxLetters} glyphs`);
    const hubs = [];
    for (const h of bank.hubs || []) {
      if (!h.hub || !h.hub.vocabKey || !WORD_RE.test(h.hub.word || '') || !['a', 'b'].includes(h.side)) throw new Error(`${who}: ${loc} hub ${JSON.stringify(h.hub)} is malformed`);
      if (!candidates(h.hub.vocabKey, loc).length) throw new Error(`${who}: ${loc} hub "${h.hub.word}" has no colour picture`);
      const sats = [];
      for (const s of h.satellites || []) {
        const e = byWhole.get(lower(s));
        if (!e) throw new Error(`${who}: ${loc} hub "${h.hub.word}": satellite "${s}" is not a bank whole`);
        const it = e.it;
        const tag = (m) => `${who}: ${loc} ${e.where} item "${it.whole.word}": ${m}`;
        if (it.opaque) continue;                                       // synthesis: transparent only
        if (!faceItemOk(it, bank, links, d.maxLetters, tag)) continue;
        if (!it.whole.vocabKey || !candidates(it.whole.vocabKey, loc).length) continue;
        const hw = foldAfterFirst(h.hub.word), ww = foldAfterFirst(it.whole.word);
        const shares = h.side === 'a' ? ww.startsWith(hw) : lower(ww).endsWith(lower(hw));
        if (!shares || lower(ww) === lower(hw)) throw new Error(tag(`does not carry the hub "${h.hub.word}" on side ${h.side}`));
        sats.push(it);
      }
      hubs.push({ h, sats });
    }
    const eligible = hubs.filter((x) => x.sats.length >= lanes);
    if (eligible.length < d.webs) throw new Error(`${who}: ${loc} has ${eligible.length} hub(s) with >= ${lanes} usable satellites, need ${d.webs} webs of ${lanes} (the design floor) — REFUSED (the panel may rule bank.webLanes:3 or refuse.F5)`);
    const picked = rng.shuffle(eligible).slice(0, d.webs);
    if (new Set(picked.map((x) => x.h.hub.vocabKey)).size !== picked.length) throw new Error(`${who}: two webs share a hub key`);
    const usedWholes = new Set();
    const blocks = picked.map((x) => {
      const hp = resolveKey(rng, bank, x.h.hub.vocabKey, loc, who);
      const free = x.sats.filter((it) => !usedWholes.has(lower(it.whole.word)));
      if (free.length < lanes) throw new Error(`${who}: hub "${x.h.hub.word}" shares its satellites with another web (refuse)`);
      const sats = rng.sample(free, lanes);
      sats.forEach((it) => usedWholes.add(lower(it.whole.word)));
      const rows = sats.map((it) => {
        const wp = resolveKey(rng, bank, it.whole.vocabKey, loc, who);
        // The hub-side part of a onePart satellite may carry no vocabKey of its own (fi
        // kuppikakku: kuppi pictured, kakku = the hub) — stampsOf then falls back to the
        // WORD and the verify's "stamp = hub key" check fails on a correct page (fi
        // G2-333 QA-FAIL, 2026-09-14). On the web the hub side IS the hub, whose key the
        // hub block already carries: stamp that key.
        const stamps = stampsOf(it);
        const hubPart = it[x.h.side];
        if (hubPart && !hubPart.vocabKey && lower(hubPart.word) === lower(x.h.hub.word)) stamps[x.h.side] = x.h.hub.vocabKey;
        return { whole: { src: wp.src, key: it.whole.vocabKey, px: d.pic }, ghost: { src: hp.src, key: x.h.hub.vocabKey, px: d.pic, opacity: d.ghost }, lane, stamps };
      });
      return compoundWebBlock({ hub: { src: hp.src, key: x.h.hub.vocabKey, word: x.h.hub.word }, side: x.h.side, lanes: rows, hubPx: d.hubPx, hubWordPx: d.hubWordPx, laneGap: lanes === 3 ? d.webLaneGap * 3 : d.webLaneGap, pad: '8px 6px' });
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${blocks.length},minmax(0,1fr));gap:${d.gap + 4}px;min-height:0">${blocks.join('')}</div>`;
    const bodyHtml = this._faceRoot('web', ` data-lcs-webs="${blocks.length}" data-lcs-lanes="${lanes}" data-lcs-pic="${d.pic}" data-lcs-hub-px="${d.hubPx}" data-lcs-ghost="${d.ghost}" data-lcs-lane-w="${lane.w}"`, grid, bank);
    return { bodyHtml, meta: { hubs: picked.map((x) => x.h.hub.word), wholes: [...usedWholes], lanes, eligible: eligible.length } };
  },

  /** F5 size rows (family / alterati): the base noun's picture at 0.55 / 1.35 is the ONLY cue; the child writes the ending. */
  _buildSize(bank, d, loc, ctx) {
    const who = ID, rng = ctx.rng;
    const pairs = Array.isArray(bank.sizePairs) ? bank.sizePairs : [];
    if (pairs.length < 8) throw new Error(`${who}: ${loc} (${bank.shape}) has ${pairs.length} sizePairs < 8 — the size face is REFUSED (fr default; the panel authors >= 8 regular pairs)`);
    const rowsN = d.sizeRows || d.rows;
    if (!(rowsN >= 6 && rowsN <= 16)) throw new Error(`${who}: size rows ${rowsN} outside the page rule 6..16`);
    if (Math.round(d.sizePic * 0.55) < 36) throw new Error(`${who}: sizePic ${d.sizePic} × 0.55 falls below the G2 element floor 36`);
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const pool = [];
    for (const sp of pairs) {
      const tag = (m) => `${who}: ${loc} sizePair "${sp.base && sp.base.word}": ${m}`;
      if (!sp.base || !sp.base.vocabKey || !WORD_RE.test(sp.base.word || '')) throw new Error(tag('base needs {vocabKey, word}'));
      if (!candidates(sp.base.vocabKey, loc).length) throw new Error(tag('base has no colour picture'));
      const stem = lower(sp.base.word).replace(/[aeiou]$/u, '');
      for (const k of ['small', 'big']) {
        if (!sp[k]) continue;
        if (!WORD_RE.test(sp[k]) || !lower(sp[k]).startsWith(stem) || lower(sp[k]) === lower(sp.base.word)) throw new Error(tag(`${k} "${sp[k]}" does not derive from the base`));
        if ([...sp[k]].length <= d.maxLetters) pool.push({ sp, size: k, whole: sp[k] });
      }
    }
    let chosen;
    for (let tries = 0; ; tries++) {
      const order = rng.shuffle(pool);
      chosen = [];
      const bases = new Set();
      for (const c of order) { if (chosen.length === rowsN) break; if (bases.has(c.sp.base.vocabKey)) continue; bases.add(c.sp.base.vocabKey); chosen.push(c); }
      const small = chosen.filter((c) => c.size === 'small').length;
      if (chosen.length === rowsN && small >= d.minEach && chosen.length - small >= d.minEach) break;
      if (tries > 60) throw new Error(`${who}: ${loc} cannot seat ${rowsN} size rows with >= ${d.minEach} small and big from ${pairs.length} pairs (refuse)`);
    }
    const lane = { w: d.sizeLaneW || d.laneW, h: d.laneH, glyphH: d.glyphH };
    const rowsHtml = chosen.map((c, i) => {
      const scale = c.size === 'small' ? 0.55 : 1.35;
      const p = resolveKey(rng, bank, c.sp.base.vocabKey, loc, who);
      return compoundSizeRow({
        index: i + 1, lane, badge: d.badges, pad: `4px ${LANE_PAD_X}px`,
        cue: { src: p.src, key: c.sp.base.vocabKey, px: Math.round(d.sizePic * scale), scale, boxPx: Math.round(d.sizePic * 1.35) },
        stamps: { size: c.size, base: c.sp.base.vocabKey, baseWord: c.sp.base.word, whole: c.whole },
      });
    });
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:${d.gap}px;min-height:0">${rowsHtml.join('')}</div>`;
    const bodyHtml = this._faceRoot('web', ` data-lcs-size-rows="${chosen.length}" data-lcs-size-pic="${d.sizePic}" data-lcs-lane-w="${lane.w}" data-lcs-min-each="${d.minEach}"`, grid, bank);
    return { bodyHtml, meta: { wholes: chosen.map((c) => c.whole), sizes: chosen.map((c) => c.size), pool: pool.length } };
  },

  /** verify() for a face page — branches on the root's data-lcs-mode; re-derives everything from the stamps. */
  async _verifyFace(page, mode) {
    return page.evaluate((mode) => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const lower = (s) => String(s).toLocaleLowerCase(lang);
      const foldAfterFirst = (s) => s.charAt(0) + lower(s.slice(1));
      const rect = (el) => el.getBoundingClientRect();
      const root = document.querySelector('[data-lcs-compound]');
      if (!root) return ['no compound root'];
      if (root.dataset.lcsFace !== mode) fails.push(`face "${root.dataset.lcsFace}" ≠ mode "${mode}"`);
      const casing = root.dataset.lcsCasing;
      const body = rect(document.querySelector('[data-lcs-body]'));
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const inside = (el, box, what) => {
        const r = rect(el), c = box;
        if (r.left < c.left - 0.6 || r.right > c.right + 0.6 || r.top < c.top - 0.6 || r.bottom > c.bottom + 0.6) fails.push(`${what} outside its box`);
      };
      const inBody = (el, what) => {
        const r = rect(el);
        if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > body.bottom + 0.6) fails.push(`${what} outside the body column`);
        if (r.bottom > foot + 0.6) fails.push(`${what} reaches into the footer (${Math.round(r.bottom)} vs ${Math.round(foot)})`);
      };
      const picOk = (img, what, floor, key) => {
        if (!img) { fails.push(`${what}: no picture`); return null; }
        if (!img.complete || img.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (img.getAttribute('alt')) fails.push(`${what}: picture carries alt text`);
        const dir = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        if (key != null && img.dataset.lcsPic !== key) fails.push(`${what}: picture key "${img.dataset.lcsPic}" ≠ "${key}"`);
        const r = rect(img), side = Math.min(r.width, r.height);
        if (side < 36 - 0.6) fails.push(`${what}: picture ${Math.round(side)} px < the G2 floor 36`);
        if (floor && side < floor - 0.6) fails.push(`${what}: picture ${Math.round(side)} px < ${floor}`);
        return r;
      };
      const emptyLanes = (el, n, what, minW) => {
        const lanes = [...el.querySelectorAll('[data-lcs-prim="writing-row"]')];
        if (lanes.length !== n) fails.push(`${what}: ${lanes.length} writing rows (want ${n})`);
        lanes.forEach((ln, i) => {
          if (ln.querySelectorAll('text, path').length) fails.push(`${what}: writing row ${i + 1} is not empty`);
          if (+ln.getAttribute('height') < 50) fails.push(`${what}: writing row ${i + 1} ${ln.getAttribute('height')} px high (< 50)`);
          const r = rect(ln);
          if (r.width < (minW || 60)) fails.push(`${what}: writing row ${i + 1} ${Math.round(r.width)} px < ${minW || 60} writable`);
          inside(ln, rect(el), `${what}: writing row ${i + 1}`);
          if (r.bottom > foot - 4) fails.push(`${what}: writing row ${i + 1} within 4 px of the footer`);
        });
        return lanes;
      };
      /** re-derive the whole from a row's stamps (the base rule) and return {whole, cut} or null. */
      const derive = (el, what) => {
        const { lcsA: a, lcsB: b, lcsAWord: aWord, lcsBWord: bWord, lcsAStem: aStem, lcsLink: link, lcsWhole: whole, lcsCut: cut } = el.dataset;
        if (!a || !b || !whole) { fails.push(`${what}: a / b / whole stamp missing`); return null; }
        if (!/^\p{L}+$/u.test(whole)) fails.push(`${what}: whole "${whole}" is not letters`);
        const stem = aStem || aWord;
        const tail = b.startsWith('-') ? b.slice(1) : bWord;
        if (!stem || !tail) { fails.push(`${what}: cannot re-derive the whole`); return null; }
        const raw = stem + (link || '') + tail;
        if (lower(whole) !== lower(raw)) fails.push(`${what}: whole "${whole}" ≠ ${stem}+${link || ''}+${tail}`);
        const first = casing === 'keep-first' ? raw.charAt(0) : lower(raw.charAt(0));
        if (whole.charAt(0) !== first) fails.push(`${what}: whole "${whole}" casing`);
        if (whole.slice(1) !== lower(whole.slice(1))) fails.push(`${what}: whole "${whole}" carries a capital inside the join`);
        const expCut = [...stem].length + [...(link || '')].length;
        if (+cut !== expCut) fails.push(`${what}: cut ${cut} ≠ ${expCut}`);
        return { a, b, aWord, bWord, aStem: aStem || '', link: link || '', whole, cut: +cut };
      };
      const textNodes = (el) => { const out = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (tw.nextNode()) { const s = tw.currentNode.textContent.trim(); if (s) out.push(s); } return out; };
      const onlyText = (el, allowed, what) => { for (const s of textNodes(el)) if (!allowed.has(lower(s))) fails.push(`${what}: prints "${s}"`); };
      const wholeNowhere = (wholes, except) => {
        const set = new Set(wholes.map(lower));
        const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (tw.nextNode()) {
          const t = tw.currentNode;
          if (except && except(t)) continue;
          const s = lower(t.textContent.trim());
          if (s && set.has(s)) fails.push(`the whole "${s}" is printed on the page`);
        }
      };
      const partsOnce = (list) => { const seen = new Map(); list.forEach(([k, where]) => { if (k.startsWith('-')) return; if (seen.has(k)) fails.push(`part "${k}" is on ${seen.get(k)} and ${where}`); else seen.set(k, where); }); };

      /* ---------------- F1 link ---------------- */
      if (mode === 'link') {
        const n = +root.dataset.lcsCards, boxW = +root.dataset.lcsLinkboxW, minLinked = +root.dataset.lcsMinLinked, minEmpty = +root.dataset.lcsMinEmpty, picPx = +root.dataset.lcsPic, tileFont = +root.dataset.lcsTileFont, laneWMax = +root.dataset.lcsLaneW;
        const cards = [...root.querySelectorAll('[data-lcs-link-card]')];
        if (cards.length !== n) fails.push(`${cards.length} rows ≠ stamp ${n}`);
        if (n < 6 || n > 10) fails.push(`${n} rows outside 6..10`);
        const wholes = [], parts = [];
        let linked = 0, empty = 0;
        cards.forEach((card, i) => {
          const what = `card ${i + 1}`;
          const st = derive(card, what);
          if (!st) return;
          if (st.aStem) fails.push(`${what}: a graded stem "${st.aStem}" on the link face`);
          if (st.b.startsWith('-')) fails.push(`${what}: an affix on the link face`);
          if (st.link) linked++; else empty++;
          wholes.push(st.whole);
          parts.push([st.a, what], [st.b, what]);
          const tA = card.querySelector('[data-lcs-tile="a"] .ws-tile'), tB = card.querySelector('[data-lcs-tile="b"] .ws-tile');
          if (!tA || !tB) { fails.push(`${what}: two part tiles expected`); return; }
          if (tA.textContent.trim() !== st.aWord) fails.push(`${what}: tile a prints "${tA.textContent.trim()}" ≠ "${st.aWord}"`);
          if (tB.textContent.trim() !== st.bWord) fails.push(`${what}: tile b prints "${tB.textContent.trim()}" ≠ "${st.bWord}"`);
          for (const [t, r] of [[tA, 'a'], [tB, 'b']]) {
            if (parseFloat(getComputedStyle(t).fontSize) < tileFont - 0.6) fails.push(`${what}: tile ${r} font < ${tileFont}`);
            if (t.scrollWidth > t.clientWidth + 0.6) fails.push(`${what}: tile ${r} clipped`);
            if (rect(t).height < 36 - 0.6) fails.push(`${what}: tile ${r} ${Math.round(rect(t).height)} px high (< 36)`);
          }
          const boxes = [...card.querySelectorAll('[data-lcs-linkbox]')];
          if (boxes.length !== 1) fails.push(`${what}: ${boxes.length} joint boxes`);
          else { const bw = rect(boxes[0]).width; if (Math.abs(bw - boxW) > 0.6) fails.push(`${what}: joint box ${Math.round(bw)} px ≠ ${boxW} (the width must never follow the answer)`); }
          const rA = rect(tA), rB = rect(tB), rBox = boxes[0] ? rect(boxes[0]) : null;
          if (rBox && !(rA.right <= rBox.left + 0.6 && rBox.right <= rB.left + 0.6)) fails.push(`${what}: reading order tile a · box · tile b broken`);
          picOk(card.querySelector('[data-lcs-cue="whole"] img'), `${what}: whole clue`, picPx, null);
          const lanes = emptyLanes(card, 1, what);
          if (lanes[0] && rect(lanes[0]).width > laneWMax + 0.6) fails.push(`${what}: lane ${Math.round(rect(lanes[0]).width)} > ${laneWMax}`);
          const line = card.querySelector('[data-lcs-link-line]');
          if (line && lanes[0] && !(rect(line).right <= rect(lanes[0]).left + 0.6)) fails.push(`${what}: the tile line overlaps the lane`);
          if (!card.hasAttribute('data-ws-content')) fails.push(`${what}: no data-ws-content stamp`);
          card.querySelectorAll('svg, img, .ws-tile').forEach((el) => { const r = rect(el); if (r.width && r.height && !el.classList.contains('ws-countbadge')) inside(el, rect(card), `${what}: <${el.tagName.toLowerCase()}>`); });
          inBody(card, what);
          onlyText(card, new Set([lower(st.aWord), lower(st.bWord), String(i + 1)]), what);
        });
        const hs = cards.map((c) => Math.round(rect(c).height));
        if (hs.length && Math.max(...hs) - Math.min(...hs) > 1) fails.push(`rows differ in height ${JSON.stringify(hs)}`);
        if (linked < minLinked) fails.push(`${linked} linked cards < minLinked ${minLinked}`);
        if (empty < minEmpty) fails.push(`${empty} empty-joint cards < minEmpty ${minEmpty}`);
        partsOnce(parts);
        if (new Set(wholes.map(lower)).size !== wholes.length) fails.push('a whole appears twice');
        wholeNowhere(wholes);
        return fails;
      }

      /* ---------------- F2 cut ---------------- */
      if (mode === 'cut') {
        const n = +root.dataset.lcsRows, cell = +root.dataset.lcsCell, picPx = +root.dataset.lcsPic;
        const rows = [...root.querySelectorAll('[data-lcs-row]')];
        if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
        if (n < 6 || n > 16) fails.push(`${n} rows outside 6..16`);
        if (root.querySelector('[data-lcs-seam]')) fails.push('a seam tick is printed (the cut face never marks the seam)');
        const wholes = [], parts = [];
        rows.forEach((row, i) => {
          const what = `row ${i + 1}`;
          if (!row.hasAttribute('data-ws-content')) fails.push(`${what}: no data-ws-content stamp`);
          const st = derive(row, what);
          if (!st) return;
          wholes.push(st.whole);
          parts.push([st.a, what], [st.b, what]);
          picOk(row.querySelector('[data-lcs-cue="whole"] img'), `${what}: whole picture`, picPx, row.dataset.lcsWholeKey || null);
          const wrap = row.querySelector('[data-lcs-cells-wrap]');
          const svg = wrap && wrap.querySelector('svg');
          if (!svg) { fails.push(`${what}: no letter cells`); return; }
          const letters = [...svg.querySelectorAll('[data-lcs-letter]')];
          const chars = [...st.whole];
          if (letters.length !== chars.length || +wrap.dataset.lcsCells !== chars.length || +svg.dataset.lcsCells !== chars.length) fails.push(`${what}: ${letters.length} cells for ${chars.length} letters`);
          if (letters.map((l) => l.textContent).join('') !== st.whole) fails.push(`${what}: cells print "${letters.map((l) => l.textContent).join('')}" ≠ "${st.whole}"`);
          if (+wrap.dataset.lcsCell !== cell) fails.push(`${what}: cell ${wrap.dataset.lcsCell} ≠ ${cell}`);
          if (svg.querySelector('path')) fails.push(`${what}: a <path> in the cells (nothing may mark the seam)`);
          if (!svg.querySelector('[data-lcs-rail]')) fails.push(`${what}: no rail under the letters`);
          letters.forEach((l, k) => {
            const bw = l.getBBox ? l.getBBox().width : rect(l).width;
            if (bw > cell - 2 + 0.6) fails.push(`${what}: letter "${l.textContent}" advance ${bw.toFixed(1)} > cell − 2 (${cell - 2})`);
          });
          // the vertical geometry is G1-305's measured contract (letterY centres the Baloo 2 ink in the cell + 12 box): assert the box, not the font's line box
          if (+svg.getAttribute('height') < cell + 12 - 0.6) fails.push(`${what}: cells ${svg.getAttribute('height')} px high (< cell + 12)`);
          if (rect(svg).width > 643 + 0.6) fails.push(`${what}: cells ${Math.round(rect(svg).width)} px > 643`);
          // no text node prints the whole with a separator, and no node prints the whole
          for (const s of textNodes(row)) {
            if (/^\p{L}+[\s\-|·/]\p{L}+$/u.test(s) && lower(s.replace(/[\s\-|·/]/gu, '')) === lower(st.whole)) fails.push(`${what}: prints the split "${s}"`);
            if (lower(s) === lower(st.whole)) fails.push(`${what}: prints the whole "${s}"`);
          }
          onlyText(row, new Set([...chars.map(lower), String(i + 1)]), what);
          row.querySelectorAll('svg, img').forEach((el) => { const r = rect(el); if (r.width && r.height && !el.classList.contains('ws-countbadge')) inside(el, rect(row), `${what}: <${el.tagName.toLowerCase()}>`); });
          inBody(row, what);
        });
        partsOnce(parts);
        if (new Set(wholes.map(lower)).size !== wholes.length) fails.push('a whole appears twice');
        const hs = rows.map((r) => Math.round(rect(r).height));
        if (hs.length && Math.max(...hs) - Math.min(...hs) > 1) fails.push(`rows differ in height ${JSON.stringify(hs)}`);
        return fails;
      }

      /* ---------------- F3 match ---------------- */
      if (mode === 'match') {
        const n = +root.dataset.lcsPairs, picPx = +root.dataset.lcsPic, laneWMax = +root.dataset.lcsLaneW, deranged = root.dataset.lcsDeranged === '1';
        const rows = [...root.querySelectorAll('[data-lcs-match-row]')];
        if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
        if (n < 4 || n > 8) fails.push(`${n} pairs outside 4..8`);
        const wholes = [], parts = [], bKeys = [], rightKeys = [], leftX = [], rightX = [];
        rows.forEach((row, i) => {
          const what = `row ${i + 1}`;
          if (!row.hasAttribute('data-ws-content')) fails.push(`${what}: no data-ws-content stamp`);
          const st = derive(row, what);
          if (!st) return;
          if (st.b.startsWith('-')) fails.push(`${what}: an affix on the match face`);
          wholes.push(st.whole); bKeys.push(st.b);
          const L = row.querySelector('[data-lcs-left]'), R = row.querySelector('[data-lcs-right]');
          if (!L || !R) { fails.push(`${what}: two match items expected`); return; }
          if (L.dataset.lcsLeft !== st.a) fails.push(`${what}: left item "${L.dataset.lcsLeft}" ≠ a "${st.a}"`);
          rightKeys.push(R.dataset.lcsRight);
          if (deranged && R.dataset.lcsRight === st.b) fails.push(`${what}: the right item is this row's own partner (not deranged)`);
          parts.push([L.dataset.lcsLeft, what + ' left'], [R.dataset.lcsRight, what + ' right']);
          picOk(L.querySelector('img'), `${what}: left picture`, picPx, L.dataset.lcsLeft);
          picOk(R.querySelector('img'), `${what}: right picture`, picPx, R.dataset.lcsRight);
          if (!L.querySelector('.ws-match-dot') || !R.querySelector('.ws-match-dot')) fails.push(`${what}: a match item has no dot`);
          const lanes = emptyLanes(row, 1, what);
          if (lanes[0] && rect(lanes[0]).width > laneWMax + 0.6) fails.push(`${what}: lane ${Math.round(rect(lanes[0]).width)} > ${laneWMax}`);
          const rl = rect(L), rr = rect(R), rlane = lanes[0] ? rect(lanes[0]) : null;
          if (rlane && !(rlane.right <= rl.left + 0.6 && rl.right <= rr.left - 40)) fails.push(`${what}: reading order lane · left · gap · right broken`);
          leftX.push(Math.round(rl.left)); rightX.push(Math.round(rr.left));
          onlyText(row, new Set(), what);
          inBody(row, what);
        });
        if ([...bKeys].sort().join('|') !== [...rightKeys].sort().join('|')) fails.push(`right keys ${JSON.stringify(rightKeys)} ≠ the rows' b keys ${JSON.stringify(bKeys)} (no bijection)`);
        if (deranged && rightKeys.join('|') === bKeys.join('|')) fails.push('the right column is the identity order');
        partsOnce(parts);
        if (new Set(leftX).size > 1 || new Set(rightX).size > 1) fails.push('the match columns are not aligned');
        if (new Set(wholes.map(lower)).size !== wholes.length) fails.push('a whole appears twice');
        wholeNowhere(wholes);
        return fails;
      }

      /* ---------------- F4 detect ---------------- */
      if (mode === 'detect') {
        const nBank = +root.dataset.lcsBank, nC = +root.dataset.lcsCompounds, nF = +root.dataset.lcsFoils, iconPx = +root.dataset.lcsIcon, laneH = +root.dataset.lcsLaneH;
        const bank = root.querySelector('[data-lcs-detect-bank]');
        if (!bank) return ['no detect bank'];
        const chips = [...bank.querySelectorAll('[data-lcs-detect-word]')];
        if (chips.length !== nBank || nC + nF !== nBank) fails.push(`${chips.length} chips ≠ stamp ${nBank} (${nC} + ${nF})`);
        const foilChips = chips.filter((c) => c.dataset.lcsFoil === '1'), compChips = chips.filter((c) => c.dataset.lcsCompound != null);
        if (foilChips.length !== nF) fails.push(`${foilChips.length} foil chips ≠ ${nF}`);
        if (compChips.length !== nC) fails.push(`${compChips.length} compound chips ≠ ${nC}`);
        const words = chips.map((c) => lower(c.dataset.lcsDetectWord));
        if (new Set(words).size !== words.length) fails.push('a bank word appears twice');
        const compWords = compChips.map((c) => lower(c.dataset.lcsDetectWord));
        const parts = [];
        chips.forEach((c, i) => {
          const what = `chip ${i + 1} "${c.dataset.lcsDetectWord}"`;
          const w = c.dataset.lcsDetectWord;
          if (!/^\p{L}+$/u.test(w)) fails.push(`${what}: not letters`);
          const txt = c.querySelector('span:last-child');
          if (!txt || txt.textContent.trim() !== w) fails.push(`${what}: prints "${txt && txt.textContent.trim()}" ≠ its stamp`);
          if (txt && parseFloat(getComputedStyle(txt).fontSize) < 18 - 0.6) fails.push(`${what}: font < 18`);
          if (txt && txt.scrollWidth > txt.clientWidth + 0.6) fails.push(`${what}: clipped`);
          picOk(c.querySelector('img'), what, iconPx, c.dataset.lcsDetectKey);
          inside(c, rect(bank), what);
          if (c.dataset.lcsCompound != null) {
            const [a, link, b] = c.dataset.lcsCompound.split('|');
            if (!a || !b || lower(a + (link || '') + b) !== lower(w)) fails.push(`${what}: parts "${c.dataset.lcsCompound}" do not join to the word`);
            parts.push([lower(a), what], [lower(b), what]);
          } else if (c.dataset.lcsFoil === '1') {
            for (const cw of compWords) if (w !== cw && lower(w).includes(cw)) fails.push(`${what}: a foil contains the compound "${cw}"`);
          } else fails.push(`${what}: neither a foil nor a compound`);
        });
        partsOnce(parts);
        const half = Math.floor(chips.length / 2);
        const firstF = chips.slice(0, half).filter((c) => c.dataset.lcsFoil === '1').length;
        if (firstF === 0 || firstF === half) fails.push('the bank is not mixed (one kind fills the first half)');
        const tops = new Set(chips.map((c) => Math.round(rect(c).top)));
        if (tops.size > 3) fails.push(`bank wraps to ${tops.size} rows`);
        inBody(bank, 'bank');
        const lanes = [...root.querySelectorAll('[data-lcs-detect-lane]')];
        if (lanes.length !== nC) fails.push(`${lanes.length} lanes ≠ ${nC} compounds`);
        lanes.forEach((ln, i) => {
          const what = `lane ${i + 1}`;
          const rows = emptyLanes(ln, 2, what);
          rows.forEach((r) => { if (+r.getAttribute('height') < laneH - 0.6) fails.push(`${what}: ruling ${r.getAttribute('height')} < ${laneH}`); });
          const ops = [...ln.querySelectorAll('[data-lcs-op]')];
          if (ops.length !== 1 || ops[0].dataset.lcsOp !== '+') fails.push(`${what}: ops ${ops.map((o) => o.dataset.lcsOp).join('')} ≠ +`);
          if (rows.length === 2 && ops.length === 1 && !(rect(rows[0]).right <= rect(ops[0]).left + 0.6 && rect(ops[0]).right <= rect(rows[1]).left + 0.6)) fails.push(`${what}: reading order ruling + ruling broken`);
          if (rect(ln).top < rect(bank).bottom - 0.6) fails.push(`${what}: above the bank`);
          onlyText(ln, new Set(['+', String(i + 1)]), what);
          inBody(ln, what);
        });
        wholeNowhere(compWords, (t) => bank.contains(t));
        return fails;
      }

      /* ---------------- F5 web / size ---------------- */
      if (mode === 'web') {
        if (root.dataset.lcsSizeRows != null) {
          const n = +root.dataset.lcsSizeRows, sizePic = +root.dataset.lcsSizePic, minEach = +root.dataset.lcsMinEach || 1;
          const rows = [...root.querySelectorAll('[data-lcs-row]')];
          if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
          if (n < 6 || n > 16) fails.push(`${n} rows outside 6..16`);
          if (root.querySelector('.ws-tile')) fails.push('a chip on the size face');
          const wholes = [], bases = [];
          let small = 0;
          rows.forEach((row, i) => {
            const what = `row ${i + 1}`;
            const { lcsSize: size, lcsScale: scale, lcsBase: base, lcsBaseWord: baseWord, lcsWhole: whole } = row.dataset;
            if (!['small', 'big'].includes(size)) fails.push(`${what}: size "${size}"`);
            const sc = +scale;
            if (!((size === 'small' && sc === 0.55) || (size === 'big' && sc === 1.35))) fails.push(`${what}: scale ${scale} ≠ ${size === 'small' ? 0.55 : 1.35}`);
            if (!whole || !baseWord || !/^\p{L}+$/u.test(whole)) { fails.push(`${what}: stamps missing`); return; }
            const stem = lower(baseWord).replace(/[aeiou]$/u, '');
            if (!lower(whole).startsWith(stem) || lower(whole) === lower(baseWord)) fails.push(`${what}: "${whole}" does not derive from "${baseWord}"`);
            wholes.push(whole); bases.push(base);
            if (size === 'small') small++;
            const r = picOk(row.querySelector('[data-lcs-cue="a"] img'), `${what}: base picture`, 36, base);
            if (r && Math.abs(Math.min(r.width, r.height) - Math.round(sizePic * sc)) > 0.6) fails.push(`${what}: picture ${Math.round(r.width)} px ≠ ${Math.round(sizePic * sc)} (sizePic × scale)`);
            const ops = [...row.querySelectorAll('[data-lcs-op]')];
            if (ops.length !== 1 || ops[0].dataset.lcsOp !== '=') fails.push(`${what}: ops ≠ =`);
            emptyLanes(row, 1, what);
            onlyText(row, new Set(['=', String(i + 1)]), what);
            inBody(row, what);
          });
          if (small < minEach || rows.length - small < minEach) fails.push(`${small} small / ${rows.length - small} big rows, want >= ${minEach} each`);
          if (new Set(bases).size !== bases.length) fails.push('a base noun appears twice');
          if (new Set(wholes.map(lower)).size !== wholes.length) fails.push('a whole appears twice');
          wholeNowhere(wholes);
          return fails;
        }
        const nWebs = +root.dataset.lcsWebs, nLanes = +root.dataset.lcsLanes, picPx = +root.dataset.lcsPic, hubPx = +root.dataset.lcsHubPx, ghost = +root.dataset.lcsGhost, laneWMax = +root.dataset.lcsLaneW;
        const webs = [...root.querySelectorAll('[data-lcs-web]')];
        if (webs.length !== nWebs) fails.push(`${webs.length} webs ≠ stamp ${nWebs}`);
        if (nWebs < 1 || nWebs > 2 || nLanes < 3 || nLanes > 5) fails.push(`${nWebs} webs × ${nLanes} lanes outside the face's shape`);
        const wholes = [], hubWords = [], hubKeys = [];
        webs.forEach((web, wi) => {
          const what = `web ${wi + 1}`;
          if (!web.hasAttribute('data-ws-content')) fails.push(`${what}: no data-ws-content stamp`);
          const hubKey = web.dataset.lcsHub, hubWord = web.dataset.lcsHubWord, side = web.dataset.lcsHubSide;
          if (!hubKey || !hubWord || !['a', 'b'].includes(side)) { fails.push(`${what}: hub stamps missing`); return; }
          hubWords.push(lower(hubWord)); hubKeys.push(hubKey);
          const labels = [...web.querySelectorAll('[data-lcs-hub-label]')];
          if (labels.length !== 1) fails.push(`${what}: ${labels.length} hub labels (want exactly 1)`);
          else {
            if (labels[0].textContent.trim() !== hubWord) fails.push(`${what}: hub label prints "${labels[0].textContent.trim()}" ≠ "${hubWord}"`);
            if (parseFloat(getComputedStyle(labels[0]).fontSize) < 24 - 0.6) fails.push(`${what}: hub label < 24 px`);
            if (labels[0].scrollWidth > labels[0].clientWidth + 0.6) fails.push(`${what}: hub label clipped`);
          }
          picOk(web.querySelector('[data-lcs-hub-col] img'), `${what}: hub picture`, hubPx, hubKey);
          if (!web.querySelector('[data-lcs-bracket]')) fails.push(`${what}: no bracket`);
          const lanes = [...web.querySelectorAll('[data-lcs-web-lane]')];
          if (lanes.length !== nLanes || +web.dataset.lcsLanes !== nLanes) fails.push(`${what}: ${lanes.length} lanes ≠ ${nLanes}`);
          lanes.forEach((ln, i) => {
            const lw = `${what} lane ${i + 1}`;
            const st = derive(ln, lw);
            if (!st) return;
            wholes.push(st.whole);
            const hw = foldAfterFirst(hubWord), ww = foldAfterFirst(st.whole);
            const shares = side === 'a' ? ww.startsWith(hw) : lower(ww).endsWith(lower(hw));
            if (!shares || lower(ww) === lower(hw)) fails.push(`${lw}: "${st.whole}" does not carry the hub "${hubWord}" on side ${side}`);
            if ((side === 'a' ? st.a : st.b) !== hubKey) fails.push(`${lw}: the ${side}-part stamp "${side === 'a' ? st.a : st.b}" ≠ the hub key "${hubKey}"`);
            const wholeImg = ln.querySelector('[data-lcs-cue="whole"] img'), ghostImg = ln.querySelector('[data-lcs-cue="ghost"] img');
            const rw = picOk(wholeImg, `${lw}: whole picture`, picPx, ln.dataset.lcsWholeKey);
            const rg = picOk(ghostImg, `${lw}: ghost`, picPx, hubKey);
            if (ghostImg) {
              if (ghostImg.dataset.lcsGhost !== '1') fails.push(`${lw}: ghost not stamped`);
              const op = parseFloat(getComputedStyle(ghostImg).opacity);
              if (Math.abs(op - ghost) > 0.01) fails.push(`${lw}: ghost opacity ${op} ≠ ${ghost}`);
            }
            if (wholeImg && parseFloat(getComputedStyle(wholeImg).opacity) < 0.99) fails.push(`${lw}: the whole picture is faded`);
            const ops = [...ln.querySelectorAll('[data-lcs-op]')];
            if (ops.length !== 2 || ops[0].dataset.lcsOp !== '+' || ops[1].dataset.lcsOp !== '=') fails.push(`${lw}: ops ${ops.map((o) => o.dataset.lcsOp).join('')} ≠ +=`);
            const lanesEl = emptyLanes(ln, 1, lw);
            if (lanesEl[0] && rect(lanesEl[0]).width > laneWMax + 0.6) fails.push(`${lw}: lane > ${laneWMax}`);
            if (rw && rg && ops.length === 2 && lanesEl[0]) {
              const first = side === 'b' ? rw : rg, second = side === 'b' ? rg : rw;
              const o1 = rect(ops[0]), o2 = rect(ops[1]), rl = rect(lanesEl[0]);
              if (!(first.right <= o1.left + 0.6 && o1.right <= second.left + 0.6 && second.right <= o2.left + 0.6 && o2.right <= rl.left + 0.6)) fails.push(`${lw}: the ghost is not in the hub's true position (side ${side})`);
            }
            onlyText(ln, new Set(['+', '=']), lw);
            inside(ln, rect(web), lw);
          });
          inBody(web, what);
        });
        if (new Set(hubKeys).size !== hubKeys.length) fails.push('two webs share a hub');
        if (new Set(wholes.map(lower)).size !== wholes.length) fails.push('a satellite appears twice');
        for (const h of hubWords) if (wholes.some((w) => lower(w) === h)) fails.push(`the hub word "${h}" is also a whole`);
        wholeNowhere(wholes);
        // the hub word is printed exactly once per web and nowhere else
        const all = textNodes(root).map(lower);
        for (const h of hubWords) { const k = all.filter((s) => s === h).length; if (k !== 1) fails.push(`the hub word "${h}" is printed ${k} times (want 1)`); }
        return fails;
      }
      return [`unknown mode "${mode}"`];
    }, mode);
  },

  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-compound]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode) return this._verifyFace(page, mode);
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-lcs-compound]');
      if (!root) return ['no compound root'];
      if (root.dataset.lcsFace !== 'base') fails.push(`face "${root.dataset.lcsFace}" ≠ base`);
      const rows = [...root.querySelectorAll('[data-lcs-row]')];
      const n = rows.length;
      if (+root.dataset.lcsRows !== n) fails.push(`rows stamp ${root.dataset.lcsRows} ≠ ${n} rows`);
      if (n < 6 || n > 16) fails.push(`${n} rows outside the page rule 6..16`);
      const laneWMax = +root.dataset.lcsLaneW || 0;
      const picPx = +root.dataset.lcsPic || 36;
      const casing = root.dataset.lcsCasing;
      const partWords = root.dataset.lcsPartWords === '1';
      const distinct = root.dataset.lcsDistinctParts === '1';
      const minLinked = +root.dataset.lcsMinLinked || 0;
      const lower = (s) => String(s).toLocaleLowerCase(lang);
      const rect = (el) => el.getBoundingClientRect();
      const body = rect(document.querySelector('[data-lcs-body]'));
      const bankEl = root.querySelector('[data-lcs-bank-banner]');
      const wholes = [];
      const partKeys = new Map();
      let linked = 0;
      rows.forEach((row, i) => {
        const tag = (m) => fails.push(`row ${i + 1}: ${m}`);
        if (!row.hasAttribute('data-ws-content')) tag('no data-ws-content stamp');
        const { lcsA: a, lcsB: b, lcsAWord: aWord, lcsBWord: bWord, lcsAStem: aStem, lcsLink: link, lcsWhole: whole, lcsCut: cut } = row.dataset;
        if (!a || !b || !whole) { tag('a / b / whole stamp missing'); return; }
        if (!/^\p{L}+$/u.test(whole)) tag(`whole "${whole}" is not letters`);
        // re-derive the whole from the stamps: casing(aStem||aWord) + link + (bWord | affix)
        const stem = aStem || aWord;
        const tail = b.startsWith('-') ? b.slice(1) : bWord;
        if (!stem || !tail) tag('cannot re-derive the whole (no a-word / b-word)');
        else {
          const raw = stem + (link || '') + tail;
          if (lower(whole) !== lower(raw)) tag(`whole "${whole}" ≠ ${stem}+${link || ''}+${tail}`);
          const first = casing === 'keep-first' ? raw.charAt(0) : raw.charAt(0).toLocaleLowerCase(lang);
          if (whole.charAt(0) !== first) tag(`whole "${whole}" casing (expected "${first}…")`);
          if (whole.slice(1) !== lower(whole.slice(1))) tag(`whole "${whole}" carries a capital inside the join`);
          const expCut = [...stem].length + [...(link || '')].length;
          if (+cut !== expCut) tag(`cut ${cut} ≠ ${expCut}`);
        }
        if (link) linked++;
        wholes.push(lower(whole));
        for (const k of [a, b]) {
          if (k.startsWith('-')) continue;
          if (partKeys.has(k)) { if (distinct) tag(`part "${k}" is also on row ${partKeys.get(k)}`); } else partKeys.set(k, i + 1);
        }
        // the cues: A always a picture; B a picture or one chip; then + and = in reading order; one empty lane
        const rr = rect(row);
        const cueA = row.querySelector('[data-lcs-cue="a"]');
        const cueB = row.querySelector('[data-lcs-cue="b"]');
        if (!cueA || !cueB) { tag('two cues expected'); return; }
        const checkPic = (cue, role, key) => {
          const img = cue.querySelector('img');
          if (!img) { tag(`cue ${role} has no picture`); return null; }
          if (!img.complete || img.naturalWidth === 0) tag(`cue ${role} picture broken`);
          if (img.getAttribute('alt')) tag(`cue ${role} picture carries alt text`);
          if (img.dataset.lcsPic !== key) tag(`cue ${role} picture key "${img.dataset.lcsPic}" ≠ "${key}"`);
          const dirName = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
          if (BW.test(dirName)) tag(`cue ${role} picture from a B&W directory "${dirName}"`);
          const r = rect(img);
          if (Math.min(r.width, r.height) < 36 - 0.6) tag(`cue ${role} picture ${Math.round(Math.min(r.width, r.height))} px < the G2 floor 36`);
          if (role === 'b' && Math.min(r.width, r.height) < picPx - 0.6) tag(`cue b picture ${Math.round(r.width)} px < ${picPx}`);
          const pw = cue.querySelector('[data-lcs-part-word]');
          if (partWords && !pw) tag(`cue ${role} has no part word on a part-words page`);
          if (!partWords && pw) tag(`cue ${role} prints a part word on a no-part-words page`);
          if (pw) {
            const expect = role === 'a' ? aWord : bWord;
            if (pw.textContent.trim() !== pw.dataset.lcsPartWord) tag(`part word prints "${pw.textContent.trim()}" ≠ its stamp`);
            if (lower(pw.textContent.trim()) !== lower(expect)) tag(`part word "${pw.textContent.trim()}" ≠ ${role}-word "${expect}"`);
            if (parseFloat(getComputedStyle(pw).fontSize) < 18 - 0.6) tag(`part word ${getComputedStyle(pw).fontSize} < 18 px`);
            if (pw.scrollWidth > pw.clientWidth + 0.6) tag(`part word "${expect}" clipped`);
          }
          return r;
        };
        const rA = checkPic(cueA, 'a', a);
        let rB;
        if (cueB.dataset.lcsCueKind === 'chip') {
          const tiles = cueB.querySelectorAll('.ws-tile');
          if (tiles.length !== 1) tag(`${tiles.length} chips on cue b`);
          else if (tiles[0].textContent.trim() !== b) tag(`chip "${tiles[0].textContent.trim()}" ≠ affix "${b}"`);
          rB = rect(cueB);
        } else rB = checkPic(cueB, 'b', b);
        const ops = [...row.querySelectorAll('[data-lcs-op]')];
        if (ops.length !== 2 || ops[0].dataset.lcsOp !== '+' || ops[1].dataset.lcsOp !== '=') tag(`ops ${ops.map((o) => o.dataset.lcsOp).join('')} ≠ +=`);
        const lanes = row.querySelectorAll('[data-lcs-prim="writing-row"]');
        if (lanes.length !== 1) tag(`${lanes.length} writing rows`);
        else {
          const lane = lanes[0];
          if (lane.querySelectorAll('text, path').length) tag('the writing row is not empty');
          const lr = rect(lane);
          if (lr.width > laneWMax + 0.6) tag(`lane ${Math.round(lr.width)} px > ${laneWMax}`);
          if (lr.width < 60) tag(`lane ${Math.round(lr.width)} px < 60 writable`);
          if (lr.left < rr.left - 0.6 || lr.right > rr.right + 0.6 || lr.top < rr.top - 0.6 || lr.bottom > rr.bottom + 0.6) tag('lane outside its row');
          if (+lane.getAttribute('height') < 50) tag(`lane ${lane.getAttribute('height')} px high (< 50)`);
          if (ops.length === 2 && rA && rB) {
            const o1 = rect(ops[0]), o2 = rect(ops[1]);
            if (!(rA.right <= o1.left + 0.6 && o1.right <= rB.left + 0.6 && rB.right <= o2.left + 0.6 && o2.right <= lr.left + 0.6)) tag('reading order A + B = lane broken');
          }
        }
        // everything inside the row, the row inside the body column
        row.querySelectorAll('svg, img, .ws-tile').forEach((el) => {
          const r = rect(el);
          if (r.width === 0 || r.height === 0 || el.classList.contains('ws-countbadge')) return;
          if (r.left < rr.left - 0.6 || r.right > rr.right + 0.6 || r.top < rr.top - 0.6 || r.bottom > rr.bottom + 0.6) tag(`<${el.tagName.toLowerCase()}> outside its row`);
          if (r.width > 643 + 0.6) tag(`<${el.tagName.toLowerCase()}> ${Math.round(r.width)} px > 643`);
        });
        if (rr.left < body.left - 0.6 || rr.right > body.right + 0.6 || rr.bottom > body.bottom + 0.6) tag('row outside the body column');
        // no text on the row but the ops, the badge numeral and the part words (each text NODE checked)
        const allowed = new Set(['+', '=', String(i + 1)]);
        if (partWords) { allowed.add(lower(aWord)); if (bWord) allowed.add(lower(bWord)); }
        if (cueB.dataset.lcsCueKind === 'chip') allowed.add(lower(b));
        const tw = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
        while (tw.nextNode()) { const s = lower(tw.currentNode.textContent.trim()); if (s && !allowed.has(s)) tag(`prints "${s}"`); }
      });
      if (linked < minLinked) fails.push(`${linked} linked rows < minLinked ${minLinked}`);
      // the whole is printed nowhere outside the bank
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const wholeSet = new Set(wholes);
      while (walker.nextNode()) {
        const t = walker.currentNode;
        if (bankEl && bankEl.contains(t)) continue;
        const s = lower(t.textContent.trim());
        if (s && wholeSet.has(s)) fails.push(`the whole "${s}" is printed on the page`);
      }
      if (new Set(wholes).size !== wholes.length) fails.push('a whole appears twice');
      // the bank (d1): exactly the wholes, never in row order, <= 2 rows, inside the body
      if (root.dataset.lcsHasBank) {
        if (!bankEl) fails.push('bank missing');
        else {
          const pills = [...bankEl.querySelectorAll('[data-lcs-bank-word]')];
          const bw = pills.map((e) => lower(e.dataset.lcsBankWord));
          const bt = pills.map((e) => lower(e.textContent.trim()));
          if (bw.join('|') !== bt.join('|')) fails.push('a bank pill prints a word other than its stamp');
          if ([...bw].sort().join('|') !== [...wholes].sort().join('|')) fails.push(`bank ${JSON.stringify(bw)} ≠ the wholes ${JSON.stringify(wholes)}`);
          if (bw.join('|') === wholes.join('|')) fails.push('bank is in row order');
          const rowsSeen = new Set(pills.map((e) => Math.round(rect(e).top)));
          if (rowsSeen.size > 2) fails.push(`bank wraps to ${rowsSeen.size} rows`);
          const br = rect(bankEl);
          pills.forEach((e, i) => { const r = rect(e); if (r.right > br.right + 0.6 || r.bottom > br.bottom + 0.6) fails.push(`bank pill ${i + 1} outside the bank`); });
        }
      } else if (bankEl) fails.push('a bank on a no-bank page');
      return fails;
    });
  },
};
