/**
 * G1-307 — Opposites: Write the Opposite Word (nt20-C; family key `opposites`,
 * G1, en L.1.5 umbrella — the skill is L.K.5.b antonymy; the national
 * framework NAME elsewhere). Design: docs/worksheet-gen/b3-designs/
 * G1-307-opposites.md §2/§5.
 *
 * "Read the word, write its opposite." A shuffled bank of the answers across
 * the top; cream cards in a 2-column grid, each printing ONE member of an
 * antonym pair (Baloo 2 700) beside a small teal two-way arrow, over an empty
 * school-line lane where the child WRITES the other member. The direction is
 * random per card (big → small here, small → big there), so neither member is
 * "the answer word"; the written word appears ONLY in the bank, never on its
 * card. Owned skill: PRODUCING the antonym in writing (the LEXICAL boundary:
 * no picture-size comparison, no bin sort, no class sort — those belong to
 * big-small / K-032..037 / the science banks / G2-275).
 *
 * THEMELESS (`themeAxis:{applicable:false}`; measured: no theme backs more
 * than 2 pairs): the fan lever is the pair SET re-sampled per seed. d1 cues
 * up to 3 cards with a `pairCard` picture of the relation (both states, from
 * lib/b3-picture-index.js — every picture pinned in the bank was OPENED); d2
 * is uniform text cards; d3 drops the bank (from memory).
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   cards/cols/rows  cards on the page (verify: 6 <= cards <= 12, the G1 rule)
 *   bank             the answer bank across the top (true/false)
 *   cue / maxCue     'pic' = pairCard cue on up to maxCue pictured cards
 *   tiers            bank tiers the page may draw
 *   wordPx / glyphH / laneH   the printed word size; the writing lane rule
 *   maxLetters       both members <= maxLetters glyphs (the card is 302 wide)
 *   minPerDir        each direction (ab / ba) at least this often
 * A locale / difficulty the pool cannot fill THROWS (refusal — never a filler,
 * never a silent substitution). build() reads ONLY data/b3/opposites.js
 * (lib/b3-common.js bank) + the picture index; never image-vocabulary.js.
 *
 * Answer hiding: the card stamps data-lcs-pair / -a / -b / -dir ("ab" = a is
 * printed) and data-lcs-given; verify() re-derives given === (dir==='ab'?a:b),
 * the bank set === the answers, every pair once, every word in one role, both
 * directions >= minPerDir, one empty writing-row per card, the cue key === the
 * pair, every literal inside its card.
 *
 * PHASE 2 (2026-09-14) — the ADDITIVE `layout` knob (design §3): the five
 * faces are rows in tools/b3var-rows/opposites.js that set `layout` in the
 * difficulty config ('match' K-351 · 'frames' G1-335 · 'pairup' G1-336 ·
 * 'choice' G1-337 · 'prefix' G2-320); _buildWith dispatches to _buildFace
 * ONLY when the resolved config carries it, so the base path is byte-identical
 * (tools/b3-baseline.js). The root is stamped data-lcs-layout only then, and
 * verify() branches on that stamp (never data-lcs-face — the base record's
 * item 3). Face doc per builder below.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { fileUri } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { wordBank } = require('../../templates/components-b2.js');
const { oppositeCard, oppositeMatch, oppositeFrameRow, oppositeChipRow, oppositePairLane, oppositeChoiceRow, oppositePrefixChips, oppositePrefixRow } = require('../../templates/components-b3.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const tokens = require('../../primitives/_tokens.js');

const BANK = 'opposites';
const WORD_RE = /^[\p{L}\- ]+$/u;
const CARD_INNER = 302;          // (675 - 14) / 2 = 330.5 card - 2 × (12 padding + 2 border)
const LINE_INNER = CARD_INNER - 20;   // line 1 carries margin-left 20 (badge clearance, see oppositeCard)
const BANK_INNER = 651;          // .ws-bank padding 8 12 inside the 675 body column
const ARROW_W = 36 + 8;          // oppositeArrow + the line gap
/**
 * Nunito 800 pill estimate for the bank guard: border 4 + padding 28 + text + the 10 px flex gap. The design's
 * 0.62·px per glyph over-estimates by ~15 % (measured in the real render 2026-09-14: en pills at 18 px = 32 +
 * 8.9…10.1 px per glyph, i.e. 0.50…0.56·px), which would refuse a legal fi/de bank; 0.57 sits just above the
 * widest measured glyph. verify() asserts <= 2 rows on the REAL render, so this guard only refuses a bank
 * that cannot fit — it never lets a 3-row bank ship.
 */
function pillEstimate(word, px) { return 32 + 0.57 * px * [...word].length + 10; }
/** Baloo 2 700 glyph estimate for the build guard (measured 0.45…0.56·px per glyph); verify() measures the real span. */
function wordEstimate(word, px) { return 0.56 * px * [...word].length; }

/** The pinned picture of a pair member: must be a colour-index candidate for the key (BW dirs + BLOCKED skipped). */
function resolvePic(p, loc, who) {
  const key = p.key || p.noun;
  const ok = candidates(key, loc).some((c) => c.theme === p.theme && c.noun === p.noun);
  if (!ok) throw new Error(`${who}: picture ${p.theme}/${p.noun} is not a colour-index candidate for "${key}" in ${loc} (BW, blocked, excluded or uncached) — refuse`);
  return { theme: p.theme, noun: p.noun, src: fileUri(p.theme, p.noun) };
}

/** The pairCard box for a cue size: scale = size + the 44 floor, two = 2 × round(size·0.72); + gap 10 + padding 16 + border 4 (pairCard's own default). */
function cueGeometry(size) {
  const two = Math.round(size * 0.72);
  return { scaleW: size + Math.max(44, Math.round(size * 0.55)) + 30, twoW: two * 2 + 30, h: size + 12 };
}

/** Greedy sample-or-throw over the pair pool honouring exclusiveWith (no two mutually excluded pairs on one page). */
function samplePairs(rng, pool, n, who) {
  const order = rng.shuffle(pool);
  const taken = [];
  for (const p of order) {
    if (taken.length === n) break;
    const clash = taken.some((t) => (t.exclusiveWith || []).includes(p.id) || (p.exclusiveWith || []).includes(t.id));
    if (!clash) taken.push(p);
  }
  if (taken.length < n) throw new Error(`${who}: only ${taken.length} compatible pairs, need ${n} (refuse)`);
  return taken;
}

/* ---------------------------------------------------------------- Phase 2 helpers (faces) */
const K_FLOOR = tokens.density.K.minElement;     // 56 — the F1 page is K
const LANE_INNER = 639;                          // .ws-lane border 2 + padding 12 16 inside the 675 body column
const wordRe = (w) => new RegExp('(?<!\\p{L})' + String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu');
/** The base's bijection check over a pair list (every word in exactly one pair, a ≠ b); returns the list. */
function checkBijection(pairs, loc, who) {
  const seenWord = new Map();
  for (const p of pairs) {
    for (const m of [p.a, p.b]) {
      const lw = String(m).toLocaleLowerCase(loc);
      if (seenWord.has(lw) && seenWord.get(lw) !== p.id) throw new Error(`${who}: "${m}" is a member of two pairs (${seenWord.get(lw)}, ${p.id}) — the bank is not a bijection`);
      seenWord.set(lw, p.id);
    }
    if (String(p.a).toLocaleLowerCase(loc) === String(p.b).toLocaleLowerCase(loc)) throw new Error(`${who}: pair ${p.id} has a === b`);
  }
  return pairs;
}
/** A permutation of 0..n-1 with no fixed point (the K-319 / lit-vocab-match idiom). */
function derange(rng, n) {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  let order;
  do { order = rng.shuffle(Array.from({ length: n }, (_, i) => i)); } while (order.some((v, i) => v === i));
  return order;
}

module.exports = {
  id: 'G1-307',
  slug: 'opposites-write-the-opposite-word',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'opposites',
  themeAxis: { applicable: false },
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, bank: true, cue: 'pic', maxCue: 3, cuePx: 64, tiers: [1], wordPx: 30, glyphH: 28, laneH: 64, maxLetters: 6, minPerDir: 2 },
    2: { cards: 8, cols: 2, rows: 4, bank: true, cue: false, maxCue: 0, cuePx: 0, tiers: [1, 2], wordPx: 28, glyphH: 28, laneH: 64, maxLetters: 12, minPerDir: 3 },
    3: { cards: 10, cols: 2, rows: 5, bank: false, cue: false, maxCue: 0, cuePx: 0, tiers: [1, 2], wordPx: 26, glyphH: 28, laneH: 64, maxLetters: 12, minPerDir: 4 },
  },
  i18n: {
    en: {
      title: 'Opposites: Write the Opposite Word',
      instruction: 'Read the word on each card. Find its opposite in the word bank and write it on the line.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('G1-307: no difficulty ' + difficulty);
    if (d.layout) return this._buildFace(bank, d, (locale || 'en').slice(0, 2), ctx);   // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const who = 'G1-307';
    if (!(d.cards >= 6 && d.cards <= 12)) throw new Error(`${who}: cards ${d.cards} outside the G1 page rule 6..12`);
    if (d.cards !== d.cols * d.rows) throw new Error(`${who}: cards ${d.cards} ≠ cols ${d.cols} × rows ${d.rows}`);
    if (d.glyphH < 26) throw new Error(`${who}: glyphH ${d.glyphH} below the G1 handwriting floor 26`);
    if (d.wordPx < 26) throw new Error(`${who}: wordPx ${d.wordPx} below the G1 fontChoice floor 26`);
    if (2 * d.minPerDir > d.cards) throw new Error(`${who}: minPerDir ${d.minPerDir} cannot be met twice on ${d.cards} cards`);

    // the pool: bank pairs of the page's tiers, both members legal words <= maxLetters, a bijection over words
    const pairs = Array.isArray(bank.pairs) ? bank.pairs : [];
    const seenWord = new Map();
    for (const p of pairs) {
      for (const m of [p.a, p.b]) {
        const lw = String(m).toLocaleLowerCase(loc);
        if (seenWord.has(lw) && seenWord.get(lw) !== p.id) throw new Error(`${who}: "${m}" is a member of two pairs (${seenWord.get(lw)}, ${p.id}) — the bank is not a bijection`);
        seenWord.set(lw, p.id);
      }
      if (String(p.a).toLocaleLowerCase(loc) === String(p.b).toLocaleLowerCase(loc)) throw new Error(`${who}: pair ${p.id} has a === b`);
    }
    const pool = pairs.filter((p) => d.tiers.includes(p.tier))
      .filter((p) => WORD_RE.test(p.a) && WORD_RE.test(p.b))
      .filter((p) => [...p.a].length <= d.maxLetters && [...p.b].length <= d.maxLetters);
    if (pool.length < d.cards) throw new Error(`${who}: ${loc} has ${pool.length} pairs of tiers ${d.tiers.join('/')} with both members <= ${d.maxLetters} letters, need ${d.cards} (refuse)`);
    const chosen = samplePairs(rng, pool, d.cards, who);

    // direction per card, re-rolled until each direction appears >= minPerDir times
    let dirs;
    for (let tries = 0; ; tries++) {
      dirs = chosen.map(() => (rng.next() < 0.5 ? 'ab' : 'ba'));
      const nAb = dirs.filter((x) => x === 'ab').length;
      if (nAb >= d.minPerDir && dirs.length - nAb >= d.minPerDir) break;
      if (tries > 200) throw new Error(`${who}: could not balance directions`);
    }
    const cards = chosen.map((p, i) => ({ pair: p, dir: dirs[i], given: dirs[i] === 'ab' ? p.a : p.b, answer: dirs[i] === 'ab' ? p.b : p.a }));

    // width guard on the RESOLVED config: arrow + the given word inside line 1 (verify measures the real span)
    for (const c of cards) {
      const est = ARROW_W + wordEstimate(c.given, d.wordPx);
      if (est > LINE_INNER) throw new Error(`${who}: "${c.given}" at ${d.wordPx} px estimates ${Math.round(est)} px > the ${LINE_INNER} px line (drop it from this difficulty)`);
    }

    // the cue (d1): a pairCard on up to maxCue pictured cards, pictures resolved through the index. The cue
    // shares line 1 with the word, so a card whose word + cue would not fit the line is left UNCUED (the cue is
    // a scaffold, never content — counted in meta.uncuedForWidth; en never triggers it: 6 letters at 30 px + the
    // widest cue (138) = 44 + 100 + 8 + 138 = 290 > 282 only for a 6-letter SCALE pair, and big/small are 3/5)
    let cued = 0, uncuedForWidth = 0;
    const cueBox = cueGeometry(d.cuePx);
    const line1H = d.cue === 'pic' ? cueBox.h : 0;
    if (d.cue === 'pic') {
      for (const c of cards) {
        const pic = c.pair.pic;
        if (!pic || cued >= d.maxCue) continue;
        if (c.pair.picOpened !== true) throw new Error(`${who}: pair ${c.pair.id} pins a picture that was never opened (picOpened) — refuse`);
        let cue;
        if (pic.kind === 'scale') {
          const one = resolvePic({ theme: pic.theme, noun: pic.noun, key: pic.key }, loc, who);
          cue = { picA: one, picB: one, transformB: 'scale', size: d.cuePx, w: cueBox.scaleW, h: cueBox.h, cueKey: c.pair.id };
        } else if (pic.kind === 'two') {
          cue = { picA: resolvePic(pic.a, loc, who), picB: resolvePic(pic.b, loc, who), transformB: 'none', size: d.cuePx, w: cueBox.twoW, h: cueBox.h, cueKey: c.pair.id };
        } else throw new Error(`${who}: pair ${c.pair.id} has an unknown pic.kind "${pic.kind}"`);
        if (ARROW_W + wordEstimate(c.given, d.wordPx) + 8 + cue.w > LINE_INNER) { uncuedForWidth++; continue; }
        c.cue = cue;
        cued++;
      }
    }

    // the bank: the answers, shuffled so that no answer sits at its own card's index (never in card order)
    let bankHtml = '';
    let bankOrder = null;
    if (d.bank) {
      const answers = cards.map((c) => c.answer);
      const idx = answers.map((_, i) => i);
      let order;
      do { order = rng.shuffle(idx); } while (order.some((v, i) => v === i));
      bankOrder = order;
      const est = answers.reduce((s, w) => s + pillEstimate(w, 18), 0);
      if (est > 2 * BANK_INNER) throw new Error(`${who}: bank of ${answers.length} words estimates ${Math.round(est)} px > two rows (${2 * BANK_INNER}) — refuse, never a 3rd row`);
      bankHtml = wordBank({ words: order.map((i) => ({ word: answers[i] })), wordPx: 18 });
    }

    const cardHtml = cards.map((c) => oppositeCard({
      given: c.given, pair: c.pair.id, a: c.pair.a, b: c.pair.b, dir: c.dir,
      wordPx: d.wordPx, laneW: CARD_INNER, laneH: d.laneH, glyphH: d.glyphH, cue: c.cue || null, line1H,
    }));
    const bodyHtml = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-opposites data-lcs-cards="${cards.length}" data-lcs-min-per-dir="${d.minPerDir}"${d.bank ? ' data-lcs-has-bank="1"' : ''}>` +
      bankHtml + cardGrid({ cards: cardHtml, cols: d.cols, rows: d.rows }) + `</div>`;
    return {
      bodyHtml,
      meta: { pairs: cards.map((c) => c.pair.id), dirs, given: cards.map((c) => c.given), answers: cards.map((c) => c.answer), bankOrder, cued, uncuedForWidth },
    };
  },

  /* ------------------------------------------------------------ Phase 2 faces (2026-09-14) */
  /**
   * The ADDITIVE `layout` knob (design §3; rows in tools/b3var-rows/opposites.js set it in the difficulty
   * config). The base's own configs carry no `layout`, so the base path in _buildWith is byte-identical
   * (tools/b3-baseline.js is the proof). Stamped on the root as data-lcs-layout ONLY when declared.
   *   'match'  F1 K-351  — RECOGNISE the relation: two columns, [picture][word] of member a on the left,
   *            the OPPOSITE picture + word b on the right in a deranged order; a line per pair. One
   *            scale pair at most (one noun at picPx / scalePx, both >= the K floor 56); every noun once.
   *   'frames' F2 G1-335 — USE the antonym in context: a bank of the answers + one negated frame per
   *            lane ("The elephant is not small. It is ___."), the blank an inline writing row.
   *   'pairup' F3 G1-336 — nothing given: `pairs` x 2 mixed chips (a pair's chips never adjacent),
   *            `pairs` numbered lanes of two writing rows round an arrow.
   *   'choice' F4 G1-337 — DISCRIMINATE the antonym from a near-synonym: target a over three pills
   *            (b, syn.a, far), the correct pill in every position over the page, no word twice.
   *   'prefix' F5 G2-320 — MORPHOLOGY: a legend of the prefixes used + `rows` lanes [base][arrow]
   *            [writing row]; the child writes prefix + base. `expected` is stamped, never printed.
   */
  _buildFace(bank, d, loc, ctx) {
    switch (d.layout) {
      case 'match': return this._buildMatch(bank, d, loc, ctx);
      case 'frames': return this._buildFrames(bank, d, loc, ctx);
      case 'pairup': return this._buildPairup(bank, d, loc, ctx);
      case 'choice': return this._buildChoice(bank, d, loc, ctx);
      case 'prefix': return this._buildPrefix(bank, d, loc, ctx);
      default: throw new Error(`${this.id}: unknown layout "${d.layout}"`);
    }
  },

  /** The bank's pairs after the bijection check, filtered to the config's tiers / word rule / maxLetters. */
  _pool(bank, d, loc, who) {
    const pairs = checkBijection(Array.isArray(bank.pairs) ? bank.pairs : [], loc, who);
    return pairs.filter((p) => d.tiers.includes(p.tier))
      .filter((p) => WORD_RE.test(p.a) && WORD_RE.test(p.b))
      .filter((p) => [...p.a].length <= d.maxLetters && [...p.b].length <= d.maxLetters);
  },

  _faceRoot(layout, attrs, inner) {
    return `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-opposites data-lcs-layout="${layout}"${attrs}>${inner}</div>`;
  },

  /** F1 — Match the Opposite Pictures (K). */
  _buildMatch(bank, d, loc, ctx) {
    const who = this.id, rng = ctx.rng;
    if (!(d.pairs >= 4 && d.pairs <= 8)) throw new Error(`${who}: pairs ${d.pairs} outside the K page rule 4..8`);
    if (d.picPx < K_FLOOR || d.scalePx < K_FLOOR) throw new Error(`${who}: picture ${Math.min(d.picPx, d.scalePx)} px below the K floor ${K_FLOOR}`);
    if (!(d.picPx / d.scalePx >= 1.3)) throw new Error(`${who}: scale ratio ${d.picPx}/${d.scalePx} < 1.3`);
    if (d.wordPx < 26) throw new Error(`${who}: wordPx ${d.wordPx} below the floor 26`);
    const inner = d.tileW - 4 - 16 - 10;   // border + padding + the picture gap
    const pool = this._pool(bank, d, loc, who).filter((p) => p.pic && p.picOpened === true);
    // greedy sample honouring exclusiveWith, one noun per page, at most maxScale scale pairs, and the tile width
    const order = rng.shuffle(pool);
    const taken = [], nouns = new Set();
    let scales = 0;
    for (const p of order) {
      if (taken.length === d.pairs) break;
      if (taken.some((t) => (t.exclusiveWith || []).includes(p.id) || (p.exclusiveWith || []).includes(t.id))) continue;
      const pn = p.pic.kind === 'scale' ? [p.pic.noun] : [p.pic.a.noun, p.pic.b.noun];
      if (pn.some((n) => nouns.has(n))) continue;
      if (p.pic.kind === 'scale' && scales >= d.maxScale) continue;
      const pxA = d.picPx, pxB = p.pic.kind === 'scale' ? d.scalePx : d.picPx;
      if (pxA + wordEstimate(p.a, d.wordPx) > inner || pxB + wordEstimate(p.b, d.wordPx) > inner) continue;   // recorded below
      taken.push(p); pn.forEach((n) => nouns.add(n)); if (p.pic.kind === 'scale') scales++;
    }
    if (taken.length < d.pairs) throw new Error(`${who}: ${loc} has ${taken.length} usable pictured pairs (one noun per page, ${d.maxScale} scale pair, tile ${d.tileW}), need ${d.pairs} (refuse)`);
    const items = taken.map((p) => {
      if (p.pic.kind === 'scale') {
        const one = resolvePic({ theme: p.pic.theme, noun: p.pic.noun, key: p.pic.key }, loc, who);
        return { pair: p, left: { pair: p.id, word: p.a, src: one.src, px: d.picPx, kind: 'scale' }, right: { pair: p.id, word: p.b, src: one.src, px: d.scalePx, kind: 'scale' } };
      }
      if (p.pic.kind !== 'two') throw new Error(`${who}: pair ${p.id} has an unknown pic.kind "${p.pic.kind}"`);
      return { pair: p, left: { pair: p.id, word: p.a, src: resolvePic(p.pic.a, loc, who).src, px: d.picPx, kind: 'two' }, right: { pair: p.id, word: p.b, src: resolvePic(p.pic.b, loc, who).src, px: d.picPx, kind: 'two' } };
    });
    const derangement = derange(rng, items.length);
    const left = items.map((i) => i.left);
    const right = derangement.map((i) => items[i].right);
    const bodyHtml = this._faceRoot('match', ` data-lcs-pairs="${items.length}" data-lcs-min-icon="${K_FLOOR}"`,
      oppositeMatch({ left, right, tileW: d.tileW, itemH: d.itemH, wordPx: d.wordPx }));
    return { bodyHtml, meta: { pairs: taken.map((p) => p.id), order: derangement, nouns: [...nouns], dropped: pool.length - taken.length } };
  },

  /** F2 — Opposites in a Sentence (G1). */
  _buildFrames(bank, d, loc, ctx) {
    const who = this.id, rng = ctx.rng;
    if (!(d.rows >= 6 && d.rows <= 8)) throw new Error(`${who}: rows ${d.rows} outside 6..8 (the G1 floor and the page)`);
    if (d.glyphH < 26) throw new Error(`${who}: glyphH ${d.glyphH} below the G1 handwriting floor 26`);
    const pairs = checkBijection(Array.isArray(bank.pairs) ? bank.pairs : [], loc, who);
    const byId = new Map(pairs.map((p) => [p.id, p]));
    const names = ((SENTENCES[loc] || {}).names) || [];
    const frames = (Array.isArray(bank.frames) ? bank.frames : []).map((fr) => {
      const p = byId.get(fr.pair);
      if (!p) throw new Error(`${who}: frame for unknown pair ${fr.pair}`);
      if (typeof fr.text !== 'string' || !fr.text.includes('___')) throw new Error(`${who}: frame ${fr.pair} has no ___ blank`);
      const hasA = wordRe(p.a).test(fr.text), hasB = wordRe(p.b).test(fr.text);
      if (hasA === hasB) throw new Error(`${who}: frame ${fr.pair} must print exactly one member`);
      const given = hasA ? p.a : p.b, other = hasA ? p.b : p.a;
      const forms = Array.isArray(p.forms) ? p.forms : [];
      if (fr.answer !== other && !forms.includes(fr.answer)) throw new Error(`${who}: frame ${fr.pair} answer "${fr.answer}" is not the other member`);
      if (wordRe(fr.answer).test(fr.text)) throw new Error(`${who}: frame ${fr.pair} prints its answer`);
      if (fr.text.includes('{name}') && bank.nameSlot !== true) throw new Error(`${who}: frame ${fr.pair} uses {name} in a nameSlot:false locale (refuse)`);
      if (/\{(?!name\})/.test(fr.text)) throw new Error(`${who}: frame ${fr.pair} carries an unknown slot`);
      return { fr, p, given, answer: fr.answer, usesName: fr.text.includes('{name}') };
    });
    // the written answer must fit the inline lane (measured ~0.75·glyphH per glyph): the page's lane is
    // laneW (200) or, when a chosen answer needs more, the widest need up to laneMax (300) — one width for
    // every row; a frame whose answer needs more than laneMax is unusable
    const laneMax = d.laneMax || d.laneW;
    const need = (f) => Math.ceil([...f.answer].length * 0.75 * d.glyphH + 16);
    const usable = frames.filter((f) => need(f) <= laneMax);
    const order = rng.shuffle(usable);
    const taken = [], seenPairs = new Set(), seenAnswers = new Set();
    for (const f of order) {
      if (taken.length === d.rows) break;
      if (seenPairs.has(f.p.id) || seenAnswers.has(f.answer.toLocaleLowerCase(loc))) continue;
      if (taken.some((t) => (t.p.exclusiveWith || []).includes(f.p.id) || (f.p.exclusiveWith || []).includes(t.p.id))) continue;
      taken.push(f); seenPairs.add(f.p.id); seenAnswers.add(f.answer.toLocaleLowerCase(loc));
    }
    if (taken.length < d.rows) throw new Error(`${who}: ${loc} has ${taken.length} usable frames (distinct pairs, distinct answers, answers <= the ${laneMax} px lane), need ${d.rows} (refuse)`);
    const laneW = Math.max(d.laneW, ...taken.map(need));
    const rows = taken.map((f) => {
      let text = f.fr.text;
      let name = null;
      if (f.usesName) {
        if (!names.length) throw new Error(`${who}: ${loc} has no SENTENCES names for {name}`);
        name = rng.pick(names);
        text = text.split('{name}').join(name);
      }
      const sents = text.split(/(?<=[.!?…])\s+/);
      const bi = sents.findIndex((s) => s.includes('___'));
      if (bi !== sents.length - 1) throw new Error(`${who}: frame ${f.p.id}: the blank must sit in the LAST sentence`);
      const line1 = sents.slice(0, bi).join(' ');
      const [pre, post] = sents[bi].split('___').map((s) => s.trim());
      if ([...line1].length > d.maxLine) throw new Error(`${who}: frame ${f.p.id} line 1 "${line1}" > ${d.maxLine} chars`);
      const est = (s) => (s ? 0.58 * d.fontPx * [...s].length + 6 : 0);
      if (est(line1) > d.textW) throw new Error(`${who}: frame ${f.p.id} line 1 estimates ${Math.round(est(line1))} px > ${d.textW}`);
      if (est(pre) + laneW + est(post) + 12 > d.textW) throw new Error(`${who}: frame ${f.p.id} line 2 "${pre} ___ ${post}" estimates ${Math.round(est(pre) + laneW + est(post) + 12)} px > ${d.textW} with a ${laneW} px lane (refuse)`);
      let pic = null;
      if (f.fr.pic) {
        const c = candidates(f.fr.pic.key || f.fr.pic.noun, loc).some((x) => x.theme === f.fr.pic.theme && x.noun === f.fr.pic.noun);
        if (!c) throw new Error(`${who}: frame ${f.p.id} picture ${f.fr.pic.theme}/${f.fr.pic.noun} is not a colour-index candidate — refuse`);
        pic = { theme: f.fr.pic.theme, noun: f.fr.pic.noun, src: fileUri(f.fr.pic.theme, f.fr.pic.noun) };
      }
      return { pair: f.p.id, a: f.p.a, b: f.p.b, given: f.given, answer: f.answer, name, text, line1, pre, post, pic };
    });
    // the bank: the answers, deranged (no answer at its own row's index); the width guard refuses a 3rd row
    let bankHtml = '', bankOrder = null;
    if (d.bank) {
      const answers = rows.map((r) => r.answer);
      bankOrder = derange(rng, answers.length);
      const est = answers.reduce((s, w) => s + pillEstimate(w, 18), 0);
      if (est > 2 * BANK_INNER) throw new Error(`${who}: bank of ${answers.length} words estimates ${Math.round(est)} px > two rows — refuse`);
      bankHtml = wordBank({ words: bankOrder.map((i) => ({ word: answers[i] })), wordPx: 18 });
    }
    const lanes = rows.map((r) => oppositeFrameRow({ ...r, picPx: d.picPx, textW: d.textW, fontPx: d.fontPx, laneW, laneH: d.laneH, glyphH: d.glyphH })).join('');
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(0,1fr));gap:${d.gap}px;min-height:0;padding-bottom:4px" data-lcs-frame-grid>${lanes}</div>`;
    const bodyHtml = this._faceRoot('frames', ` data-lcs-rows="${rows.length}"${d.bank ? ' data-lcs-has-bank="1"' : ''}`, bankHtml + grid);
    return { bodyHtml, meta: { pairs: rows.map((r) => r.pair), answers: rows.map((r) => r.answer), names: rows.map((r) => r.name), bankOrder, laneW, unusable: frames.length - usable.length } };
  },

  /** F3 — Pair Up the Opposites (G1). */
  _buildPairup(bank, d, loc, ctx) {
    const who = this.id, rng = ctx.rng;
    if (!(d.pairs >= 6 && d.pairs <= 8)) throw new Error(`${who}: pairs ${d.pairs} outside 6..8`);
    if (d.glyphH < 26) throw new Error(`${who}: glyphH ${d.glyphH} below the G1 handwriting floor 26`);
    const pool = this._pool(bank, d, loc, who);
    if (pool.length < d.pairs) throw new Error(`${who}: ${loc} has ${pool.length} pairs of tiers ${d.tiers.join('/')} with both members <= ${d.maxLetters} letters, need ${d.pairs} (refuse)`);
    const chosen = samplePairs(rng, pool, d.pairs, who);
    const chips = [];
    for (const p of chosen) chips.push({ word: p.a, pair: p.id }, { word: p.b, pair: p.id });
    let order, tries = 0;
    do {
      order = rng.shuffle(chips);
      tries++;
      if (tries > 500) throw new Error(`${who}: could not separate the chips of every pair (|i - j| >= 2)`);
    } while (order.some((c, i) => order.some((o, j) => o !== c && o.pair === c.pair && Math.abs(i - j) < 2)));
    const lanes = Array.from({ length: chosen.length }, (_, i) => oppositePairLane({ n: i + 1, w: d.laneW, h: d.laneH, glyphH: d.glyphH })).join('');
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:10px;min-height:0;margin-top:16px" data-lcs-pair-grid>${lanes}</div>`;
    const bodyHtml = this._faceRoot('pairup', ` data-lcs-pairs="${chosen.length}"`, oppositeChipRow({ chips: order, fontPx: d.fontPx, tileH: d.tileH }) + grid);
    return { bodyHtml, meta: { pairs: chosen.map((p) => p.id), chips: order.map((c) => c.word), chipPairs: order.map((c) => c.pair) } };
  },

  /** F4 — Opposite or the Same? (G1). */
  _buildChoice(bank, d, loc, ctx) {
    const who = this.id, rng = ctx.rng;
    if (!(d.rows >= 6 && d.rows <= 8)) throw new Error(`${who}: rows ${d.rows} outside 6..8`);
    if (d.chips !== 3) throw new Error(`${who}: chips ${d.chips} — the discriminating page needs the antonym, the near-synonym and a far word`);
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const all = checkBijection(Array.isArray(bank.pairs) ? bank.pairs : [], loc, who);
    const byWord = new Map();
    for (const p of all) { byWord.set(lower(p.a), p); byWord.set(lower(p.b), p); }
    const pool = this._pool(bank, d, loc, who).filter((p) => d.synonym ? (p.syn && typeof p.syn.a === 'string') : true).filter((p) => typeof p.far === 'string')
      .filter((p) => [p.a, p.b, p.syn && p.syn.a, p.far].every((w) => !w || (WORD_RE.test(w) && [...w].length <= d.maxLetters)));
    if (pool.length < d.rows) throw new Error(`${who}: ${loc} has ${pool.length} pairs with syn + far (all words <= ${d.maxLetters}), need ${d.rows} (refuse)`);
    // words on the page: target a, antonym b, syn.a, far — none twice; syn.a never a second right answer
    let taken;
    for (let attempt = 0; ; attempt++) {
      const order = rng.shuffle(pool);
      taken = [];
      const used = new Set();
      for (const p of order) {
        if (taken.length === d.rows) break;
        const words = [p.a, p.b, p.syn.a, p.far].map(lower);
        if (new Set(words).size !== 4 || words.some((w) => used.has(w))) continue;
        if (taken.some((t) => (t.exclusiveWith || []).includes(p.id) || (p.exclusiveWith || []).includes(t.id))) continue;
        const farOwner = byWord.get(lower(p.far));
        if (!farOwner || farOwner.id === p.id || farOwner.family === p.family) continue;
        if ((p.alt && (p.alt.b || []).map(lower).includes(lower(p.syn.a)))) throw new Error(`${who}: pair ${p.id} syn.a "${p.syn.a}" is an accepted answer for "${p.b}" — a second correct chip (refuse)`);
        taken.push(p); words.forEach((w) => used.add(w));
      }
      if (taken.length === d.rows) break;
      if (attempt > 100) throw new Error(`${who}: ${loc} cannot seat ${d.rows} rows with no word twice on the page (refuse)`);
    }
    // pill order per row; the correct pill takes every position over the page
    let rows;
    for (let tries = 0; ; tries++) {
      rows = taken.map((p) => {
        const pills = rng.shuffle([{ word: p.b, role: 'antonym' }, { word: p.syn.a, role: 'syn' }, { word: p.far, role: 'far' }]);
        return { pair: p.id, target: p.a, b: p.b, pills, correct: pills.findIndex((x) => x.role === 'antonym') };
      });
      if (new Set(rows.map((r) => r.correct)).size === d.chips) break;
      if (tries > 200) throw new Error(`${who}: could not spread the correct pill over ${d.chips} positions`);
    }
    for (const r of rows) {
      const est = r.pills.reduce((s, p) => s + 52 + 0.5 * d.pillPx * [...p.word].length, 0) + 2 * 12;
      if (est > LANE_INNER) throw new Error(`${who}: row ${r.pair} pills estimate ${Math.round(est)} px > the ${LANE_INNER} px lane`);
    }
    const lanes = rows.map((r) => oppositeChoiceRow({ ...r, targetPx: d.targetPx, pillPx: d.pillPx })).join('');
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(0,1fr));gap:10px;min-height:0" data-lcs-choice-grid>${lanes}</div>`;
    const bodyHtml = this._faceRoot('choice', ` data-lcs-rows="${rows.length}" data-lcs-chips="${d.chips}"`, grid);
    return { bodyHtml, meta: { pairs: rows.map((r) => r.pair), correct: rows.map((r) => r.correct), pills: rows.map((r) => r.pills.map((p) => p.word)) } };
  },

  /** F5 — Make the Opposite with a Prefix (G2). */
  _buildPrefix(bank, d, loc, ctx) {
    const who = this.id, rng = ctx.rng;
    if (!(d.rows >= 8 && d.rows <= 10)) throw new Error(`${who}: rows ${d.rows} outside 8..10 (the G2 floor and the page)`);
    if (d.glyphH < 24) throw new Error(`${who}: glyphH ${d.glyphH} below the G2 handwriting floor 24`);
    const lower = (s) => String(s).toLocaleLowerCase(loc);
    const pre = bank.prefix || {};
    const prefixes = Array.isArray(pre.prefixes) ? pre.prefixes : [];
    if (!prefixes.length) throw new Error(`${who}: ${loc} declares no prefixes (refuse)`);
    const ban = new Set((pre.ban || []).map(lower));
    const items = (Array.isArray(pre.items) ? pre.items : []).filter((it) => {
      if (!prefixes.includes(it.prefix)) throw new Error(`${who}: item ${it.base} uses a prefix "${it.prefix}" outside ${JSON.stringify(prefixes)}`);
      if (typeof it.expected !== 'string' || !it.expected.endsWith(it.base) || it.expected === it.base) throw new Error(`${who}: item ${it.base}: expected "${it.expected}" does not end with the base`);
      if (it.expected !== it.prefix + it.base && !it.literal) throw new Error(`${who}: item ${it.base}: expected "${it.expected}" ≠ ${it.prefix}+${it.base} (declare literal:true)`);
      if (ban.has(lower(it.base))) throw new Error(`${who}: item ${it.base} is BANNED (prefix.ban) — refuse`);
      if (!WORD_RE.test(it.base) || !WORD_RE.test(it.expected)) return false;
      if ([...it.expected].length > d.maxLetters) return false;                       // the written word must fit the lane
      if (wordEstimate(it.base, d.wordPx) > d.colW) return false;                      // the printed base must fit its column
      return true;
    });
    const seen = new Set();
    for (const it of items) { if (seen.has(lower(it.base))) throw new Error(`${who}: base "${it.base}" listed twice`); seen.add(lower(it.base)); }
    if (items.length < d.rows) throw new Error(`${who}: ${loc} has ${items.length} usable prefix items, need ${d.rows} (refuse)`);
    const chosen = rng.shuffle(items).slice(0, d.rows);
    const used = prefixes.filter((p) => chosen.some((it) => it.prefix === p));
    const lanes = chosen.map((it, i) => oppositePrefixRow({ n: i + 1, base: it.base, prefix: it.prefix, expected: it.expected, wordPx: d.wordPx, colW: d.colW, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH })).join('');
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${chosen.length},minmax(0,1fr));gap:6px;min-height:0" data-lcs-prefix-grid>${lanes}</div>`;
    const legend = d.showLegend ? oppositePrefixChips({ prefixes: used, px: d.legendPx }) : '';
    const bodyHtml = this._faceRoot('prefix', ` data-lcs-rows="${chosen.length}" data-lcs-legend="${used.join(',')}"`, legend + grid);
    return { bodyHtml, meta: { bases: chosen.map((it) => it.base), prefixes: used, dropped: (pre.items || []).length - items.length } };
  },

  /** verify() for a face page — branches on the root's data-lcs-layout; re-derives everything from the stamps. */
  async _verifyFace(page, layout) {
    return page.evaluate((layout) => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const lower = (s) => String(s).toLocaleLowerCase(lang);
      const rect = (el) => el.getBoundingClientRect();
      const esc = (w) => String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const wordIn = (w, s) => new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})', 'iu').test(s);
      const root = document.querySelector('[data-lcs-opposites]');
      const body = document.querySelector('[data-lcs-body]');
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const br = rect(body);
      const inside = (el, what) => {
        const r = rect(el);
        if (r.left < br.left - 0.6 || r.right > br.right + 0.6) fails.push(`${what} outside the body column`);
        if (r.bottom > foot + 0.6) fails.push(`${what} reaches into the footer (${Math.round(r.bottom)} vs ${Math.round(foot)})`);
      };
      const within = (el, box, what) => {
        const r = rect(el), c = rect(box);
        if (r.left < c.left - 0.6 || r.right > c.right + 0.6 || r.top < c.top - 0.6 || r.bottom > c.bottom + 0.6) fails.push(`${what} outside its box`);
      };
      const picOk = (im, what, floor) => {
        if (!im) { fails.push(`${what}: no picture`); return null; }
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: picture carries alt text`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts.slice(-2, -1)[0] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        const r = rect(im);
        if (Math.min(r.width, r.height) < floor - 0.6) fails.push(`${what}: picture ${Math.round(Math.min(r.width, r.height))} px < ${floor}`);
        return { dir, noun: parts.pop().replace(/@\dx\.webp$/, ''), px: Math.min(r.width, r.height) };
      };
      const emptyRows = (el, n, what, minH) => {
        const rows = [...el.querySelectorAll('[data-lcs-prim="writing-row"]')];
        if (rows.length !== n) fails.push(`${what}: ${rows.length} writing rows (want ${n})`);
        rows.forEach((row, i) => {
          if (row.querySelectorAll('text, path').length) fails.push(`${what}: writing row ${i + 1} is not empty`);
          if (+row.getAttribute('height') < minH) fails.push(`${what}: writing row ${i + 1} ${row.getAttribute('height')} px high (< ${minH})`);
          within(row, el, `${what}: writing row ${i + 1}`);
          if (rect(row).bottom > foot - 6) fails.push(`${what}: writing row ${i + 1} within 6 px of the footer`);
        });
      };
      const notClipped = (el, what) => { if (el.scrollWidth > el.clientWidth + 0.6) fails.push(`${what}: "${el.textContent.trim()}" is clipped`); };
      const fontAtLeast = (el, px, what) => { const f = parseFloat(getComputedStyle(el).fontSize); if (f < px - 0.6) fails.push(`${what}: font ${f} px < ${px}`); };

      /* ---------------- F1 match ---------------- */
      if (layout === 'match') {
        const n = +root.dataset.lcsPairs, floor = +root.dataset.lcsMinIcon || 56;
        const L = [...root.querySelectorAll('[data-lcs-left]')], R = [...root.querySelectorAll('[data-lcs-right]')];
        if (L.length !== n || R.length !== n) fails.push(`left ${L.length} / right ${R.length} ≠ stamp ${n}`);
        if (n < 4 || n > 8) fails.push(`${n} pairs outside the K rule 4..8`);
        const lk = L.map((e) => e.dataset.lcsLeft), rk = R.map((e) => e.dataset.lcsRight);
        if (new Set(lk).size !== lk.length) fails.push('a pair appears twice on the left');
        if ([...lk].sort().join('|') !== [...rk].sort().join('|')) fails.push('right keys ≠ left keys');
        lk.forEach((k, i) => { if (rk[i] === k) fails.push(`row ${i + 1}: the right item is the left item's partner (not deranged)`); });
        const nounRows = new Map();   // noun → [{key, px, side}]
        const words = new Map();
        const item = (el, side, i) => {
          const what = `${side} ${i + 1}`;
          const w = el.querySelector('[data-lcs-match-word]');
          if (!w) { fails.push(`${what}: no word`); return; }
          if (w.textContent.trim() !== el.dataset.lcsWord) fails.push(`${what}: prints "${w.textContent.trim()}" ≠ stamp "${el.dataset.lcsWord}"`);
          const text = el.textContent.replace(/\s+/g, ' ').trim();
          if (text !== el.dataset.lcsWord) fails.push(`${what}: text "${text}" is not only the word`);
          fontAtLeast(w, 26, what); notClipped(w, what); within(w, el, `${what}: word`);
          const lw = lower(el.dataset.lcsWord);
          if (words.has(lw)) fails.push(`${what}: word "${el.dataset.lcsWord}" is printed twice on the page`); words.set(lw, what);
          const p = picOk(el.querySelector('img'), what, floor);
          if (p) { within(el.querySelector('img'), el, `${what}: picture`); if (!nounRows.has(p.noun)) nounRows.set(p.noun, []); nounRows.get(p.noun).push({ key: side === 'left' ? el.dataset.lcsLeft : el.dataset.lcsRight, px: p.px, side }); }
          if (!el.querySelector('.ws-match-dot')) fails.push(`${what}: no dot`);
          inside(el, what);
        };
        L.forEach((el, i) => item(el, 'left', i)); R.forEach((el, i) => item(el, 'right', i));
        let scalePairs = 0;
        for (const [noun, uses] of nounRows) {
          const keys = new Set(uses.map((u) => u.key));
          if (keys.size > 1) fails.push(`noun "${noun}" backs two pairs on the page (${[...keys].join(', ')})`);
          else if (uses.length === 2) {
            scalePairs++;
            const l = uses.find((u) => u.side === 'left'), r = uses.find((u) => u.side === 'right');
            if (!l || !r) fails.push(`noun "${noun}" twice on one side`);
            else if (!(l.px > r.px * 1.3 - 0.6)) fails.push(`scale pair ${l.key}: ${Math.round(l.px)} / ${Math.round(r.px)} is not a >= 1.3 ratio`);
          } else if (uses.length > 2) fails.push(`noun "${noun}" printed ${uses.length} times`);
        }
        if (scalePairs > 1) fails.push(`${scalePairs} scale pairs on one page`);
        // the two columns are row-aligned (a line joins items at one height)
        L.forEach((el, i) => { if (R[i] && Math.abs(rect(el).top - rect(R[i]).top) > 1) fails.push(`row ${i + 1}: columns not aligned`); });
        return fails;
      }

      /* ---------------- F2 frames ---------------- */
      if (layout === 'frames') {
        const n = +root.dataset.lcsRows;
        const lanes = [...root.querySelectorAll('[data-lcs-frame]')];
        if (lanes.length !== n) fails.push(`${lanes.length} lanes ≠ stamp ${n}`);
        if (n < 6 || n > 8) fails.push(`${n} rows outside 6..8`);
        const answers = [], givens = new Set(), pairs = new Set();
        lanes.forEach((lane, i) => {
          const what = `lane ${i + 1}`;
          const { lcsFrame: pair, lcsA: a, lcsB: b, lcsGiven: given, lcsAnswer: answer } = lane.dataset;
          if (!pair || !a || !b || !given || !answer) fails.push(`${what}: stamps missing`);
          if (pairs.has(pair)) fails.push(`${what}: pair ${pair} twice`); pairs.add(pair);
          if (given !== a && given !== b) fails.push(`${what}: given "${given}" is neither member`);
          if (lower(answer) === lower(given)) fails.push(`${what}: answer === given`);
          const text = [...lane.querySelectorAll('[data-lcs-frame-line] span')].map((s) => s.textContent).join(' ').replace(/\s+/g, ' ').trim();
          if (!wordIn(given, text)) fails.push(`${what}: the given word "${given}" is not in the text "${text}"`);
          if (wordIn(answer, text)) fails.push(`${what}: the answer "${answer}" is printed in the text`);
          if (/[{}]|___/.test(text)) fails.push(`${what}: an unfilled slot in "${text}"`);
          lane.querySelectorAll('[data-lcs-frame-line] span').forEach((s) => { fontAtLeast(s, 16, what); notClipped(s, what); within(s, lane, `${what}: text`); });
          const l1 = lane.querySelector('[data-lcs-frame-line="1"]'), l2 = lane.querySelector('[data-lcs-frame-line="2"]');
          if (l1 && l2 && l1.textContent.trim() && rect(l1).bottom > rect(l2).top + 0.6) fails.push(`${what}: line 1 overlaps line 2`);
          emptyRows(lane, 1, what, 56);
          const im = lane.querySelector('img');
          if (im) { picOk(im, what, 44); within(im, lane, `${what}: picture`); }
          if (givens.has(lower(given))) fails.push(`${what}: given "${given}" twice`); givens.add(lower(given));
          if (answers.includes(lower(answer))) fails.push(`${what}: answer "${answer}" twice`); answers.push(lower(answer));
          inside(lane, what);
        });
        const bankEl = root.querySelector('[data-lcs-bank-banner]');
        if (root.dataset.lcsHasBank) {
          if (!bankEl) fails.push('bank missing');
          else {
            const bw = [...bankEl.querySelectorAll('[data-lcs-bank-word]')].map((e) => lower(e.textContent.trim()));
            if ([...bw].sort().join('|') !== [...answers].sort().join('|')) fails.push(`bank ${JSON.stringify(bw)} ≠ the answers ${JSON.stringify(answers)}`);
            if (bw.join('|') === answers.join('|')) fails.push('bank is in row order');
            bw.forEach((w) => { if (givens.has(w)) fails.push(`bank word "${w}" is a given word`); });
            const rows = new Set([...bankEl.querySelectorAll('[data-lcs-bank-word]')].map((e) => Math.round(rect(e).top)));
            if (rows.size > 2) fails.push(`bank wraps to ${rows.size} rows`);
          }
        } else if (bankEl) fails.push('a bank on a no-bank page');
        return fails;
      }

      /* ---------------- F3 pairup ---------------- */
      if (layout === 'pairup') {
        const n = +root.dataset.lcsPairs;
        const chips = [...root.querySelectorAll('[data-lcs-chip]')];
        const lanes = [...root.querySelectorAll('[data-lcs-pairlane]')];
        if (chips.length !== 2 * n) fails.push(`${chips.length} chips ≠ 2 × ${n}`);
        if (lanes.length !== n) fails.push(`${lanes.length} lanes ≠ stamp ${n}`);
        if (n < 6 || n > 8) fails.push(`${n} pairs outside 6..8`);
        const count = new Map(), words = new Set();
        chips.forEach((c, i) => {
          const what = `chip ${i + 1}`;
          if (c.textContent.trim() !== c.dataset.lcsChip) fails.push(`${what}: prints "${c.textContent.trim()}" ≠ stamp`);
          const lw = lower(c.dataset.lcsChip);
          if (words.has(lw)) fails.push(`${what}: word "${c.dataset.lcsChip}" twice on the page`); words.add(lw);
          count.set(c.dataset.lcsChipPair, (count.get(c.dataset.lcsChipPair) || 0) + 1);
          if (i + 1 < chips.length && chips[i + 1].dataset.lcsChipPair === c.dataset.lcsChipPair) fails.push(`chips ${i + 1} and ${i + 2} are one pair, adjacent`);
          if (rect(c).height < 44 - 0.6) fails.push(`${what}: ${Math.round(rect(c).height)} px high < 44`);
          fontAtLeast(c, 18, what); notClipped(c, what); inside(c, what);
        });
        for (const [k, v] of count) if (v !== 2) fails.push(`pair ${k} has ${v} chips`);
        const chipRows = new Set(chips.map((c) => Math.round(rect(c).top)));
        if (chipRows.size > 3) fails.push(`chips wrap to ${chipRows.size} rows`);
        lanes.forEach((lane, i) => {
          const what = `lane ${i + 1}`;
          emptyRows(lane, 2, what, 56);
          if (!lane.querySelector('[data-lcs-opp-arrow]')) fails.push(`${what}: no arrow`);
          const text = lane.textContent.replace(/\s+/g, ' ').trim();
          if (text !== String(i + 1)) fails.push(`${what}: prints "${text}" (a lane carries only its number)`);
          inside(lane, what);
          if (i && rect(lane).top < rect(lanes[i - 1]).bottom - 0.6) fails.push(`${what}: overlaps the lane above`);
        });
        if (chips.length && lanes.length && rect(lanes[0]).top < Math.max(...chips.map((c) => rect(c).bottom)) - 0.6) fails.push('the first lane overlaps the chips');
        return fails;
      }

      /* ---------------- F4 choice ---------------- */
      if (layout === 'choice') {
        const n = +root.dataset.lcsRows, k = +root.dataset.lcsChips;
        const rows = [...root.querySelectorAll('[data-lcs-choice]')];
        if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
        if (n < 6 || n > 8) fails.push(`${n} rows outside 6..8`);
        const positions = new Set(), pageWords = new Map();
        rows.forEach((row, i) => {
          const what = `row ${i + 1}`;
          const { lcsTarget: target, lcsB: b, lcsCorrect: correct } = row.dataset;
          const tw = row.querySelector('[data-lcs-target-word]');
          if (!tw) { fails.push(`${what}: no target`); return; }
          if (tw.textContent.trim() !== target) fails.push(`${what}: prints "${tw.textContent.trim()}" ≠ target "${target}"`);
          fontAtLeast(tw, 26, `${what} target`); notClipped(tw, what); within(tw, row, `${what}: target`);
          const pills = [...row.querySelectorAll('[data-lcs-pill]')];
          if (pills.length !== k) fails.push(`${what}: ${pills.length} pills ≠ ${k}`);
          const texts = pills.map((p) => p.textContent.trim());
          if (new Set(texts.map(lower)).size !== texts.length) fails.push(`${what}: two pills print one word`);
          const hits = pills.filter((p) => lower(p.textContent.trim()) === lower(b));
          if (hits.length !== 1) fails.push(`${what}: ${hits.length} pills equal the antonym "${b}"`);
          const ci = +correct;
          if (!(pills[ci] && lower(pills[ci].textContent.trim()) === lower(b))) fails.push(`${what}: data-lcs-correct ${correct} does not point at "${b}"`);
          if (!(pills[ci] && pills[ci].dataset.lcsCorrectPill === '1')) fails.push(`${what}: the correct pill is not flagged`);
          const roles = pills.map((p) => p.dataset.lcsRole).sort().join(',');
          if (roles !== 'antonym,far,syn') fails.push(`${what}: roles ${roles}`);
          pills.forEach((p, j) => {
            if (p.textContent.trim() !== p.dataset.lcsPill) fails.push(`${what}: pill ${j + 1} prints "${p.textContent.trim()}" ≠ stamp`);
            if (lower(p.textContent.trim()) === lower(target)) fails.push(`${what}: pill ${j + 1} repeats the target`);
            if (p.dataset.lcsRole === 'antonym' && j !== ci) fails.push(`${what}: the antonym pill is at ${j}, correct says ${ci}`);
            if (rect(p).height < 40 - 0.6) fails.push(`${what}: pill ${j + 1} ${Math.round(rect(p).height)} px high < 40`);
            fontAtLeast(p, 20, `${what} pill ${j + 1}`); notClipped(p, `${what} pill ${j + 1}`); within(p, row, `${what}: pill ${j + 1}`);
          });
          positions.add(ci);
          for (const w of [target, ...texts]) { const lw = lower(w); if (pageWords.has(lw)) fails.push(`${what}: "${w}" is already on the page (${pageWords.get(lw)})`); pageWords.set(lw, what); }
          inside(row, what);
        });
        if (rows.length && positions.size !== k) fails.push(`the correct pill takes ${positions.size} of ${k} positions over the page`);
        return fails;
      }

      /* ---------------- F5 prefix ---------------- */
      if (layout === 'prefix') {
        const n = +root.dataset.lcsRows;
        const legend = (root.dataset.lcsLegend || '').split(',').filter(Boolean);
        const rows = [...root.querySelectorAll('[data-lcs-prefix-row]')];
        if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
        if (n < 8 || n > 10) fails.push(`${n} rows outside 8..10`);
        const used = new Set(), bases = new Set();
        rows.forEach((row, i) => {
          const what = `row ${i + 1}`;
          const { lcsBase: base, lcsPrefix: prefix, lcsExpected: expected } = row.dataset;
          const bw = row.querySelector('[data-lcs-base-word]');
          if (!bw) { fails.push(`${what}: no base word`); return; }
          if (bw.textContent.trim() !== base) fails.push(`${what}: prints "${bw.textContent.trim()}" ≠ base "${base}"`);
          fontAtLeast(bw, 22, what); notClipped(bw, what); within(bw, row, `${what}: base`);
          if (!expected || !expected.endsWith(base) || expected === base) fails.push(`${what}: expected "${expected}" does not end with the base`);
          if (!expected.startsWith(prefix)) fails.push(`${what}: expected "${expected}" does not start with "${prefix}"`);
          if (!legend.includes(prefix)) fails.push(`${what}: prefix "${prefix}" is not in the legend ${JSON.stringify(legend)}`);
          const text = row.textContent.replace(/\s+/g, ' ').trim();
          if (text.replace(/^\d+\s*/, '') !== base) fails.push(`${what}: prints "${text}" (only the number and the base may show)`);
          if (wordIn(expected, row.textContent)) fails.push(`${what}: the answer "${expected}" is printed`);
          if (bases.has(lower(base))) fails.push(`${what}: base "${base}" twice`); bases.add(lower(base));
          used.add(prefix);
          emptyRows(row, 1, what, 56);
          if (!row.querySelector('[data-lcs-opp-arrow]')) fails.push(`${what}: no arrow`);
          inside(row, what);
        });
        const strip = root.querySelector('[data-lcs-prefix-legend]');
        if (!strip) fails.push('no legend strip');
        else {
          const chips = [...strip.querySelectorAll('[data-lcs-prefix]')];
          const shown = chips.map((c) => c.dataset.lcsPrefix);
          if ([...shown].sort().join('|') !== [...used].sort().join('|')) fails.push(`legend ${JSON.stringify(shown)} ≠ the prefixes used ${JSON.stringify([...used])}`);
          if (shown.join('|') !== legend.join('|')) fails.push(`legend chips ${JSON.stringify(shown)} ≠ stamp ${JSON.stringify(legend)}`);
          chips.forEach((c, j) => {
            if (c.textContent.trim() !== c.dataset.lcsPrefix + '-') fails.push(`legend chip ${j + 1} prints "${c.textContent.trim()}"`);
            if (rect(c).height < 44 - 0.6) fails.push(`legend chip ${j + 1} ${Math.round(rect(c).height)} px high < 44`);
            fontAtLeast(c, 20, `legend chip ${j + 1}`);
          });
          if (rows.length && rect(rows[0]).top < rect(strip).bottom - 0.6) fails.push('the first row overlaps the legend');
        }
        return fails;
      }
      return [`unknown layout "${layout}"`];
    }, layout);
  },

  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-lcs-opposites]'); return r ? (r.dataset.lcsLayout || null) : null; });
    if (layout) return this._verifyFace(page, layout);
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-lcs-opposites]');
      if (!root) return ['no opposites root'];
      const cards = [...root.querySelectorAll('.ws-card')];
      const n = cards.length;
      if (+root.dataset.lcsCards !== n) fails.push(`cards stamp ${root.dataset.lcsCards} ≠ ${n} cards`);
      if (n < 6 || n > 12) fails.push(`${n} cards outside the G1 rule 6..12`);
      const minPerDir = +root.dataset.lcsMinPerDir || 1;
      const pairs = new Set(), roles = new Map();
      const answers = [];
      let ab = 0, ba = 0;
      const lower = (s) => String(s).toLocaleLowerCase(lang);
      cards.forEach((card, i) => {
        const tag = (m) => fails.push(`card ${i + 1}: ${m}`);
        const st = card.querySelector('.ws-card-stage[data-ws-content][data-lcs-pair]');
        if (!st) { tag('no stamped stage'); return; }
        const { lcsPair: pair, lcsA: a, lcsB: b, lcsDir: dir } = st.dataset;
        if (!pair || !a || !b) tag('pair / a / b stamp missing');
        if (dir !== 'ab' && dir !== 'ba') tag(`dir "${dir}"`);
        if (pairs.has(pair)) tag(`pair ${pair} appears twice`); pairs.add(pair);
        if (lower(a) === lower(b)) tag('a === b');
        const expectGiven = dir === 'ab' ? a : b;
        const answer = dir === 'ab' ? b : a;
        if (dir === 'ab') ab++; else ba++;
        const given = st.querySelector('[data-lcs-given]');
        if (!given) { tag('no given word'); return; }
        if (given.dataset.lcsGiven !== expectGiven) tag(`given stamp "${given.dataset.lcsGiven}" ≠ ${dir === 'ab' ? 'a' : 'b'} "${expectGiven}"`);
        if (given.textContent.trim() !== expectGiven) tag(`prints "${given.textContent.trim()}" ≠ given "${expectGiven}"`);
        // the card text is the given word and nothing else (the answer is never on its card)
        const text = lower(st.textContent.replace(/\s+/g, ' ').trim());
        if (text !== lower(expectGiven)) tag(`card text "${text}" is not only the given word`);
        if (new RegExp('(?<!\\p{L})' + answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(st.textContent)) tag(`the answer "${answer}" is printed on the card`);
        for (const [w, role] of [[given.textContent.trim(), 'given'], [answer, 'answer']]) {
          const lw = lower(w);
          if (roles.has(lw)) tag(`"${w}" is in two roles (${roles.get(lw)} / ${role})`);
          roles.set(lw, role);
        }
        answers.push(lower(answer));
        // one empty writing-row, inside the card
        const lanes = st.querySelectorAll('[data-lcs-prim="writing-row"]');
        if (lanes.length !== 1) tag(`${lanes.length} writing rows`);
        else {
          const lane = lanes[0];
          if (lane.querySelectorAll('text, path').length) tag('the writing row is not empty');
          const lr = lane.getBoundingClientRect(), cr = card.getBoundingClientRect();
          if (lr.width > 302 + 0.6) tag(`lane ${Math.round(lr.width)} px > 302`);
          if (lr.left < cr.left - 0.6 || lr.right > cr.right + 0.6 || lr.bottom > cr.bottom + 0.6) tag('lane outside its card');
          if (+lane.getAttribute('height') < 56) tag(`lane ${lane.getAttribute('height')} px high (< 56)`);
        }
        // the given literal is not clipped
        const gr = given.getBoundingClientRect(), cr = card.getBoundingClientRect();
        if (given.scrollWidth > given.clientWidth + 0.6 || gr.right > cr.right + 0.6) tag(`"${expectGiven}" wider than its line`);
        if (parseFloat(getComputedStyle(given).fontSize) < 26 - 0.6) tag(`word ${getComputedStyle(given).fontSize} < 26 px`);
        if (!st.querySelector('[data-lcs-opp-arrow]')) tag('no opposite arrow');
        // the cue, when present: keyed to THIS pair, two colour pictures >= 44 px, no alt text
        const cue = st.querySelector('[data-lcs-cue-key]');
        if (cue) {
          if (cue.dataset.lcsCueKey !== pair) tag(`cue key "${cue.dataset.lcsCueKey}" ≠ pair "${pair}"`);
          const imgs = [...cue.querySelectorAll('img')];
          if (imgs.length !== 2) tag(`cue has ${imgs.length} pictures`);
          imgs.forEach((im, k) => {
            if (!im.complete || im.naturalWidth === 0) tag(`cue picture ${k + 1} broken`);
            if (im.getAttribute('alt')) tag(`cue picture ${k + 1} carries alt text`);
            const dirName = decodeURIComponent(im.src).split('/').slice(-2, -1)[0] || '';
            if (BW.test(dirName)) tag(`cue picture ${k + 1} from a B&W directory "${dirName}"`);
            const r = im.getBoundingClientRect();
            if (Math.min(r.width, r.height) < 44 - 0.6) tag(`cue picture ${k + 1} ${Math.round(Math.min(r.width, r.height))} px < 44`);
            if (r.right > cr.right + 0.6 || r.bottom > cr.bottom + 0.6) tag(`cue picture ${k + 1} outside its card`);
          });
          if (cue.dataset.lcsCueKind === 'scale') {
            const [r1, r2] = imgs.map((im) => im.getBoundingClientRect().width);
            if (!(r1 > r2 * 1.3)) tag(`scale cue ${r1} / ${r2} is not a >= 1.3 ratio`);
            const n1 = imgs.map((im) => decodeURIComponent(im.src).split('/').pop());
            if (n1[0] !== n1[1]) tag('scale cue prints two different nouns');
          }
        }
      });
      if (ab < minPerDir || ba < minPerDir) fails.push(`directions ab ${ab} / ba ${ba} below minPerDir ${minPerDir}`);
      // the bank === the answers, never in card order, no bank word equals a given
      const bankEl = root.querySelector('[data-lcs-bank-banner]');
      if (root.dataset.lcsHasBank) {
        if (!bankEl) fails.push('bank missing');
        else {
          const bw = [...bankEl.querySelectorAll('[data-lcs-bank-word]')].map((e) => lower(e.dataset.lcsBankWord));
          const bt = [...bankEl.querySelectorAll('[data-lcs-bank-word]')].map((e) => lower(e.textContent.trim()));
          if (bw.join('|') !== bt.join('|')) fails.push('a bank pill prints a word other than its stamp');
          if ([...bw].sort().join('|') !== [...answers].sort().join('|')) fails.push(`bank ${JSON.stringify(bw)} ≠ the answers ${JSON.stringify(answers)}`);
          if (bw.join('|') === answers.join('|')) fails.push('bank is in card order');
          bw.forEach((w) => { if (roles.get(w) === 'given') fails.push(`bank word "${w}" is a given word`); });
          const br = bankEl.getBoundingClientRect();
          const pills = [...bankEl.querySelectorAll('[data-lcs-bank-word]')].map((e) => e.getBoundingClientRect());
          const rowsSeen = new Set(pills.map((r) => Math.round(r.top)));
          if (rowsSeen.size > 2) fails.push(`bank wraps to ${rowsSeen.size} rows`);
          pills.forEach((r, i) => { if (r.right > br.right + 0.6 || r.bottom > br.bottom + 0.6) fails.push(`bank pill ${i + 1} outside the bank`); });
        }
      } else if (bankEl) fails.push('a bank on a no-bank page');
      return fails;
    });
  },
};
