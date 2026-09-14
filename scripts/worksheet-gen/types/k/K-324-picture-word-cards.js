/**
 * K-324 — Picture Word Cards (nt20-C; family key `picture-word-cards`, K,
 * readiness — no CCSS code on the base; `default_subject: letters`).
 * Design: docs/worksheet-gen/b3-designs/K-324-picture-word-cards.md §2/§5.
 *
 * A MATERIALS SHEET, not an exercise: eight white cards edge to edge, picture
 * above word, separated only by dashed cut lines drawn ONCE as an overlay.
 * The child cuts (one straight stroke per line); the teacher laminates and
 * runs the routine (name it, read it, pocket chart, word wall). Nothing is
 * answered in pencil, so verify() is STRUCTURAL: it re-derives every card's
 * word / picture / case / line count / font tier from the stamps and checks
 * the overlay against the grid — never an answer.
 *
 * Block = strip 30 (scissors, x 0) + sheet 674 x 692 = 722 = the body under
 * three-line chrome (README ruling); `flex:0 0 auto; margin:auto 0` so the
 * 92 px of slack under one-line chrome splits above and below and nothing
 * stretches (the overlay is fixed px, both derive from the same cellW/cellH).
 *
 * Difficulty is a CONFIG; guards key on `kind` / `cols`, never the level:
 *   kind    'word' | 'twin'    picture-over-word cards | 8 picture cards + 8 word cards (F2's twin)
 *   cards   4 | 8             entries drawn (twin: 8 pictures + the same 8 words, deranged)
 *   cols/rows                 the grid; cellW = 674/cols, cellH = 692/rows
 *   pad                       the card's inner padding = the 3 mm cut margin (d1 16, d2 12, twin 10)
 *   pic / pic2                picture px (pic2 = the two-line label case, d2 only: 84)
 *   cap / lineCap / maxLines  label rule: <= cap glyphs one line; multi-token 21..28 wraps to
 *                             <= maxLines lines of <= lineCap; a single token > cap is REFUSED
 *   bigPx / bigCap            d1: <= bigCap glyphs print at bigPx (32), else the base 26
 *   tiers                     twin word tiers [[maxGlyphsOfLongestLine, px], …] (26 / 22 / 20 / 18)
 * Pool, in order: entriesFor(theme, loc) (B2_EXCLUDE applied) → the case rule
 * on the display label (`e.gender` present → displayWord(w, loc), the de noun
 * capital; null → displayWord(w, loc, 'lower') — de `Wütend` → `wütend`; the
 * bank's `cardCase:'upper'` → toLocaleUpperCase) → bank `exclude` →
 * distinctByWord → labelLines (null = refuse) → sampleEntries (throws below
 * `cards`; refusals are recorded, never filled). A BW theme (localized marker)
 * is REFUSED by the spec itself (`themeAxis.excludeBw`).
 *
 * THE FACES (Phase 2, 2026-09-14; design §3). Additive kinds read by
 * _buildWith + a verify() branch each; the word/twin path above is untouched
 * (tools/b3-baseline.js --check is the proof). Every face keeps the sheet
 * (674 x 692 + strip 30), the overlay cut lines and the 12 px cut margin:
 *   'article'   K-348  [dot][chip word] plates — the article is a LITERAL from
 *               ARTICLES[loc].chips[keyFor(e)] (K-288's selection verbatim:
 *               countable, refuseKeys, keyFor null = refused; fr elision refused
 *               unless the bank prints elisionChip); cap 18 glyphs one line at
 *               26, else two lines at 24 over an 84 picture; dots + legend only
 *               when the bank declares articleStyle.dots; fi REFUSES
 *   'plural'    K-349  each ROW = one picture + singular | three pictures +
 *               plural, EQUAL picture sizes (80): countable entries only
 *   'bilingual' K-350  host word (Baloo 2 26) over the PARTNER's word (Nunito
 *               20, T.teal); the partner = instance.unit (unitAxis on the
 *               handwritten K-350; a unit-less build takes the bank's
 *               partnerExemplar); partner label from vocab[key][unit][0] under
 *               the partner locale's own case rule; host one line, partner
 *               <= partnerCap glyphs one line, else the entry is refused
 *   'syllable'  G1-324 the approved split PRINTED: syllableWord letter cells +
 *               printed arcs (mark 'arc') or a hyphenated plate (mark
 *               'hyphen'); pool = approved entries whose boundary TeX agreed on
 *               (README texPool rule), count 2..4, <= 10 letters, da strict;
 *               bank syllable.exclude drops a wrong approved boundary
 * build() now passes `unit` through (null on the base — byte-identical).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { entriesFor, displayWord, distinctByWord, sampleEntries, fileUri, countable, vocab, KEEP_CASE } = require('../../lib/b2-common.js');
const { approvedByKey, texAgreed, daStrict } = require('../../lib/b3-common.js');
const { ARTICLES } = require('../../data/b2/articles.js');
const { esc } = require('../../primitives/_svg.js');
const C3 = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');

const BANK = 'picture-word-cards';
const SHEET_W = 674;
const SHEET_H = 692;
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const CARD_CASES = ['lower', 'keep', 'upper'];
const KINDS = ['word', 'twin', 'article', 'plural', 'bilingual', 'syllable'];
const CELLS_PER = { word: 1, twin: 2, article: 1, plural: 2, bilingual: 1, syllable: 1 };
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// data/b2/articles.js:61 refuses every vowel/h/y-initial fr noun. Under the bank's
// `elision:'print'` only the VOWEL-initial ones take l': h aspiré vs h muet (le hibou /
// l'hôtel) and y (le yaourt / l'yeuse) are undecidable from the vocab, so those stay
// refused — measured 2026-09-14: the first print render put "l'hibou" on a card.
const FR_ELISION = /^[aeiouéèêàâîïôûù]/i;
const LETTERS_ONLY = /^\p{L}+$/u;
const glyphs = (s) => [...String(s)].length;

/** The display label for an entry under the locale's case rule + the bank's cardCase. */
function labelFor(e, loc, cardCase) {
  return labelForForm(e.singular, e, loc, cardCase);
}

/** The same case rule applied to any stored form of the entry (the plural on the plural face, the partner's singular on the bilingual face). */
function labelForForm(form, e, loc, cardCase) {
  // gender-null entries (adjectives / verbs / colours) are ALWAYS lower, whatever the locale keeps
  let w = e.gender ? displayWord(form, loc) : displayWord(form, loc, 'lower');
  if (cardCase === 'upper') w = w.toLocaleUpperCase(loc);
  else if (cardCase === 'lower') w = displayWord(w, loc, 'lower');
  return w;
}

/**
 * Plate geometry for a resolved label: {px, lineH, pic}. Exported so the gate
 * re-derives the tier from the word and compares it with the stamped px.
 */
function plateFor(lines, d) {
  const longest = Math.max(...lines.map(glyphs));
  if (d.kind === 'twin') {
    const tier = d.tiers.find(([max]) => longest <= max);
    if (!tier) throw new Error(`K-324: no twin tier for ${longest} glyphs`);
    return { px: tier[1], lineH: tier[1] + 4, pic: d.pic };
  }
  if (d.kind === 'plural') {
    // the picture never moves on the plural face (80 + 6 + 58 = 144 <= 149): number is the only difference
    return lines.length === 2 ? { px: 24, lineH: 26, pic: d.pic } : { px: 26, lineH: 30, pic: d.pic };
  }
  if (d.kind === 'bilingual') return { px: d.hostPx, lineH: d.hostPx + 4, pic: d.pic };   // host one line only
  if (d.kind === 'syllable') return { px: 26, lineH: 30, pic: d.hyphenPic || d.pic };      // hyphen plate, one line
  if (lines.length === 2) {
    // d2: two lines at 24 (plate 58) and the picture drops to 84 (84 + 6 + 58 = 148 <= 149);
    // d1: two lines at 26 (plate 66) inside a 314 inner (220 + 6 + 66 = 292)
    return d.pic2 ? { px: 24, lineH: 26, pic: d.pic2 } : { px: 26, lineH: 30, pic: d.pic };
  }
  if (d.bigPx && longest <= d.bigCap) return { px: d.bigPx, lineH: d.bigPx + 6, pic: d.pic };
  return { px: 26, lineH: 30, pic: d.pic };
}

module.exports = {
  id: 'K-324',
  slug: 'picture-word-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-word-cards',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { kind: 'word', cards: 4, cols: 2, rows: 2, pad: 16, pic: 220, cap: 20, lineCap: 16, maxLines: 2, bigPx: 32, bigCap: 15 },
    2: { kind: 'word', cards: 8, cols: 2, rows: 4, pad: 12, pic: 104, pic2: 84, cap: 20, lineCap: 16, maxLines: 2 },
    3: { kind: 'twin', cards: 8, cols: 4, rows: 4, pad: 10, pic: 120, cap: 13, lineCap: 13, maxLines: 2, tiers: [[8, 26], [10, 22], [12, 20], [13, 18]] },
  },
  i18n: {
    en: {
      title: 'Picture Word Cards',
      instruction: 'Cut along the dotted lines to make the cards. Say the name of each picture, then read its word.',
    },
  },

  plateFor,
  labelFor,
  labelForForm,
  SHEET_W,
  SHEET_H,
  KINDS,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc, unit: unit || null }, ctx);
  },

  /** The whole build over an INJECTED bank — the gate's poison seam; build() passes the real one. */
  _buildWith(bank, { theme, difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-324: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!theme) throw new Error('K-324: a theme is required (themed cut-out cards)');
    if (BW_MARKER.test(String(theme))) throw new Error(`K-324: theme "${theme}" is a BW directory (excludeBw) — refuse`);
    if (!bank || typeof bank !== 'object') throw new Error(`K-324: no ${loc} bank block`);
    const cardCase = bank.cardCase || 'lower';
    if (!CARD_CASES.includes(cardCase)) throw new Error(`K-324: ${loc} cardCase "${cardCase}" not in ${CARD_CASES.join('|')}`);
    if (cardCase === 'keep' && loc !== 'de') throw new Error(`K-324: cardCase 'keep' is de only (${loc})`);
    if (!KINDS.includes(d.kind)) throw new Error(`K-324: unknown kind ${d.kind}`);
    if (d.cols * d.rows !== d.cards * CELLS_PER[d.kind]) throw new Error(`K-324: ${d.cols}x${d.rows} grid ≠ ${d.cards} cards (${d.kind})`);
    const band = tokens.density[this.gradeBand] || tokens.density.K;
    if (d.pic < band.minElement || (d.pic2 && d.pic2 < band.minElement)) throw new Error(`K-324: picture ${d.pic}/${d.pic2} < the K element floor ${band.minElement}`);
    const exclude = new Set(Array.isArray(bank.exclude) ? bank.exclude : []);
    const cellW = SHEET_W / d.cols, cellH = SHEET_H / d.rows;
    const innerW = cellW - 2 * d.pad;
    const stamps = ` data-lcs-case="${cardCase}" data-lcs-cellw="${cellW}" data-lcs-cellh="${cellH}" data-lcs-pad="${d.pad}"`;
    const geo = { d, theme, loc, rng, cardCase, exclude, cellW, cellH, innerW, stamps };
    if (d.kind === 'article') return this._buildArticle(bank, geo);
    if (d.kind === 'plural') return this._buildPlural(bank, geo);
    if (d.kind === 'bilingual') return this._buildBilingual(bank, geo, unit);
    if (d.kind === 'syllable') return this._buildSyllable(bank, geo);

    // pool, in order
    let pool = entriesFor(theme, loc)
      .filter((e) => !exclude.has(e.vocabKey))
      .map((e) => ({ ...e, word: labelFor(e, loc, cardCase), noun_: !!e.gender }));
    pool = distinctByWord(pool, (e) => e.word);
    const refused = [];
    pool = pool.map((e) => ({ ...e, lines: C3.labelLines(e.word, { cap: d.cap, lineCap: d.lineCap, maxLines: d.maxLines }) }))
      .filter((e) => { if (!e.lines) { refused.push(e.word); return false; } return true; });
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc} (${d.kind}, ${refused.length} refused by the label rule)`);

    let bodyHtml, meta;
    if (d.kind === 'word') {
      const cards = picks.map((e) => {
        const p = plateFor(e.lines, d);
        return C3.wordCard({
          src: fileUri(theme, e.noun), vocabKey: e.vocabKey, word: e.word, lines: e.lines,
          pic: p.pic, px: p.px, lineH: p.lineH, pad: d.pad, innerW, kind: 'word',
          extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
        });
      });
      bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'word', extra: stamps });
      meta = { kind: 'word', theme, words: picks.map((e) => e.word), vocab: picks.map((e) => e.vocabKey), refused };
    } else {
      // twin: rows 1-2 the pictures in draw order; rows 3-4 the words DERANGED
      // (types/_shared/lit-vocab-match.js:45-46 idiom): word slot i never names picture slot i
      let order;
      do { order = rng.shuffle(picks.map((_, i) => i)); }
      while (picks.length > 1 && order.some((v, i) => v === i));
      const pictures = picks.map((e) => ({ src: fileUri(theme, e.noun), vocabKey: e.vocabKey }));
      const words = order.map((k) => { const e = picks[k]; const p = plateFor(e.lines, d); return { vocabKey: e.vocabKey, word: e.word, lines: e.lines, px: p.px, lineH: p.lineH }; });
      bodyHtml = C3.twinSheet({ pictures, words, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, pic: d.pic, pad: d.pad, innerW, extra: stamps });
      meta = { kind: 'twin', theme, words: picks.map((e) => e.word), vocab: picks.map((e) => e.vocabKey), order, refused };
    }
    return { bodyHtml, meta };
  },

  /** The eligible article entries of (theme, loc) under the bank's articleStyle — PURE (the gate re-derives from it). */
  _articlePool(bank, theme, loc, cardCase, exclude) {
    const a = bank.articleStyle || {};
    if (a.enabled === false) throw new Error(`K-324: article cards REFUSED for ${loc} (articleStyle.enabled:false)`);
    const A = ARTICLES[loc];
    if (!A || A.mode !== 'article' || A.refuse) throw new Error(`K-324: article cards REFUSED for ${loc} (no article contract)`);
    const level = a.level === 3 ? 3 : 2;
    const chips = level === 3 && A.chipsD3 ? A.chipsD3 : A.chips;
    const dots = Array.isArray(a.dots) ? a.dots : null;
    if (dots && dots.length !== chips.length) throw new Error(`K-324: ${loc} articleStyle.dots (${dots.length}) ≠ chips (${chips.length})`);
    if (dots && !a.legend) throw new Error(`K-324: ${loc} articleStyle.dots without a legend`);
    const refuse = new Set((A.refuseKeys || []).map((k) => String(k).toLowerCase()));
    const printElision = loc === 'fr' && a.elision === 'print' && !!a.elisionChip;
    const pool = entriesFor(theme, loc)
      .filter(countable)
      .filter((e) => !exclude.has(e.vocabKey) && !refuse.has(String(e.vocabKey).toLowerCase()))
      .map((e) => {
        let key = A.keyFor({ ...e, key: e.vocabKey }, { level });
        let chip;
        if (key == null) {
          if (printElision && FR_ELISION.test(e.singular)) { chip = a.elisionChip; key = -1; }
          else return null;
        } else chip = chips[key];
        const base = labelFor(e, loc, cardCase);
        const word = chip.endsWith("'") ? chip + base : chip + ' ' + base;
        return { ...e, key, chip, base, word, noun_: !!e.gender };
      })
      .filter(Boolean);
    return { pool: distinctByWord(pool, (e) => e.word), chips, dots, level, legend: dots ? a.legend : null };
  },

  _buildArticle(bank, { d, theme, loc, rng, cardCase, exclude, innerW, stamps }) {
    const { pool: raw, chips, dots, level, legend } = this._articlePool(bank, theme, loc, cardCase, exclude);
    const refused = [];
    const pool = raw.map((e) => ({ ...e, lines: C3.labelLines(e.word, { cap: d.cap, lineCap: d.lineCap, maxLines: d.maxLines }) }))
      .filter((e) => { if (!e.lines) { refused.push(e.word); return false; } return true; });
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc} (article, ${refused.length} refused by the label rule)`);
    const cards = picks.map((e) => {
      const p = plateFor(e.lines, d);
      return C3.articleCard({
        src: fileUri(theme, e.noun), vocabKey: e.vocabKey, chip: e.chip, base: e.base, word: e.word, lines: e.lines,
        pic: p.pic, px: p.px, lineH: p.lineH, pad: d.pad, innerW,
        dot: dots && e.key >= 0 ? dots[e.key] : null, extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
      });
    });
    const legendHtml = dots ? C3.legendDots({ legend, chips, dots }) : null;
    const bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'article', legend: legendHtml,
      extra: stamps + ` data-lcs-level="${level}" data-lcs-dots="${dots ? 1 : 0}"` });
    return { bodyHtml, meta: { kind: 'article', theme, level, words: picks.map((e) => e.word), chips: picks.map((e) => e.chip), vocab: picks.map((e) => e.vocabKey), refused } };
  },

  /** The eligible plural entries — countable, both forms under the label rule — PURE. */
  _pluralPool(bank, d, theme, loc, cardCase, exclude) {
    const refused = [];
    let pool = entriesFor(theme, loc)
      .filter(countable)
      .filter((e) => !exclude.has(e.vocabKey))
      .map((e) => ({ ...e, word: labelFor(e, loc, cardCase), plural_: labelForForm(e.plural, e, loc, cardCase), noun_: !!e.gender }));
    pool = distinctByWord(pool, (e) => e.word);
    pool = distinctByWord(pool, (e) => e.plural_);
    pool = pool.map((e) => ({ ...e, sLines: C3.labelLines(e.word, { cap: d.cap, lineCap: d.lineCap, maxLines: d.maxLines }), pLines: C3.labelLines(e.plural_, { cap: d.cap, lineCap: d.lineCap, maxLines: d.maxLines }) }))
      .filter((e) => { if (!e.sLines || !e.pLines) { refused.push(e.word + '/' + e.plural_); return false; } return true; });
    return { pool, refused };
  },

  _buildPlural(bank, { d, theme, loc, rng, cardCase, exclude, innerW, stamps }) {
    const clones = d.clones || (bank.plural && bank.plural.clones) || 3;
    if (clones < 2) throw new Error(`K-324: plural clones ${clones} < 2 (one and MANY)`);
    const { pool, refused } = this._pluralPool(bank, d, theme, loc, cardCase, exclude);
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc} (plural, ${refused.length} refused by the label rule)`);
    const cards = [];
    for (const e of picks) {
      const sp = plateFor(e.sLines, d), pp = plateFor(e.pLines, d);
      cards.push(...C3.pluralPair({
        src: fileUri(theme, e.noun), vocabKey: e.vocabKey, singular: e.word, plural: e.plural_, sLines: e.sLines, pLines: e.pLines,
        sPx: sp.px, sLineH: sp.lineH, pPx: pp.px, pLineH: pp.lineH, pic: d.pic, clones, pad: d.pad, innerW, rng, extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
      }));
    }
    const bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'plural', extra: stamps + ` data-lcs-clones="${clones}"` });
    return { bodyHtml, meta: { kind: 'plural', theme, clones, words: picks.map((e) => e.word), plurals: picks.map((e) => e.plural_), vocab: picks.map((e) => e.vocabKey), refused } };
  },

  /** The partner locale a bilingual build prints: the configured unit, else the spec's unitAxis exemplar, else the bank's. */
  _partnerFor(bank, loc, unit) {
    const b = bank.bilingual || {};
    const u = unit || (this.unitAxis && this.unitAxis.applicable ? this.unitAxis.exemplar(loc) : null) || b.partnerExemplar;
    if (!u || !LOCALES.includes(u)) throw new Error(`K-324: partner "${u}" is not one of the 11 locales`);
    if (u === loc) throw new Error(`K-324: partner ${u} is the host language`);
    if (!b.partnerNames || typeof b.partnerNames[u] !== 'string' || !b.partnerNames[u].trim()) throw new Error(`K-324: the ${loc} bank names no partner ${u} (bilingual.partnerNames.${u})`);
    if (typeof b.hostName !== 'string' || !b.hostName.trim()) throw new Error(`K-324: the ${loc} bank has no bilingual.hostName`);
    return { unit: u, hostName: b.hostName, partnerName: b.partnerNames[u], sep: b.legendSep || ' · ' };
  },

  /** The partner label of an entry: vocab[key][unit][0] under the PARTNER locale's case rule (de keeps its noun capital). */
  _partnerLabel(e, unit) {
    const p = vocab()[e.vocabKey] && vocab()[e.vocabKey][unit];
    if (!p || !p[0]) return null;
    return labelForForm(p[0], { gender: p[2] || null }, unit, KEEP_CASE.has(unit) ? 'keep' : 'lower');
  },

  _bilingualPool(bank, d, theme, loc, cardCase, exclude, unit) {
    const refused = [];
    let pool = entriesFor(theme, loc)
      .filter((e) => !exclude.has(e.vocabKey))
      .map((e) => ({ ...e, word: labelFor(e, loc, cardCase), partner: this._partnerLabel(e, unit), noun_: !!e.gender }))
      .filter((e) => e.partner);
    pool = distinctByWord(pool, (e) => e.word);
    pool = distinctByWord(pool, (e) => e.partner);
    pool = pool.map((e) => ({ ...e, lines: C3.labelLines(e.word, { cap: d.cap, lineCap: d.cap, maxLines: 1 }), pLines: C3.labelLines(e.partner, { cap: d.partnerCap, lineCap: d.partnerCap, maxLines: 1 }) }))
      .filter((e) => { if (!e.lines || !e.pLines) { refused.push(e.word + '/' + e.partner); return false; } return true; });
    return { pool, refused };
  },

  _buildBilingual(bank, { d, theme, loc, rng, cardCase, exclude, innerW, stamps }, unit) {
    const P = this._partnerFor(bank, loc, unit);
    const { pool, refused } = this._bilingualPool(bank, d, theme, loc, cardCase, exclude, P.unit);
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc}+${P.unit} (bilingual, ${refused.length} refused by the label rule)`);
    const cards = picks.map((e) => C3.bilingualCard({
      src: fileUri(theme, e.noun), vocabKey: e.vocabKey, host: e.word, partner: e.partner, pic: d.pic, hostPx: d.hostPx, partnerPx: d.partnerPx,
      pad: d.pad, innerW, gap: d.gap, extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
    }));
    const legend = `<span data-lcs-legend-host>${esc(P.hostName)}</span><span aria-hidden="true">${esc(P.sep.trim())}</span><span data-lcs-legend-partner>${esc(P.partnerName)}</span>`;
    const bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'bilingual', legend, extra: stamps + ` data-lcs-partner="${P.unit}"` });
    return { bodyHtml, meta: { kind: 'bilingual', theme, unit: P.unit, words: picks.map((e) => e.word), partners: picks.map((e) => e.partner), vocab: picks.map((e) => e.vocabKey), refused } };
  },

  /**
   * The eligible syllable entries — PURE (G1-305's order): entriesFor → the
   * case rule → letters only → approved by vocabKey with word === display word
   * (case-insensitive) and split joined === word → count/letters in range →
   * texPool when the face prints the boundary → da strict → bank excludes.
   */
  _syllablePool(bank, d, theme, loc, cardCase, exclude) {
    const s = bank.syllable || {};
    if (s.enabled === false) throw new Error(`K-324: syllable cards REFUSED for ${loc} (syllable.enabled:false)`);
    const mark = s.mark || 'arc';
    if (!['arc', 'hyphen'].includes(mark)) throw new Error(`K-324: syllable mark "${mark}" is not built (arc | hyphen)`);
    const ap = approvedByKey(loc);
    const sexcl = new Set(Array.isArray(s.exclude) ? s.exclude : []);
    const lower = (w) => w.toLocaleLowerCase(loc);
    let pool = entriesFor(theme, loc)
      .filter((e) => !exclude.has(e.vocabKey) && !sexcl.has(e.vocabKey))
      .map((e) => {
        const word = labelFor(e, loc, cardCase);
        if (!LETTERS_ONLY.test(word)) return null;
        const a = ap.get(e.vocabKey);
        if (!a || !Array.isArray(a.split) || lower(a.word) !== lower(word)) return null;
        const split = a.split.map(lower);
        if (split.join('') !== lower(word) || split.length !== a.count) return null;
        return { ...e, word, split, count: a.count, approved: a, noun_: !!e.gender };
      })
      .filter(Boolean)
      .filter((e) => e.count >= d.minCount && e.count <= d.maxCount && glyphs(e.word) <= d.maxLetters);
    if (d.pool === 'tex') pool = pool.filter((e) => texAgreed(e.approved));
    if (loc === 'da' || s.strictPool === true) pool = pool.filter((e) => daStrict(e.approved));
    return { pool: distinctByWord(pool, (e) => e.word), mark, hyphen: s.hyphen || '-' };
  },

  _buildSyllable(bank, { d, theme, loc, rng, cardCase, exclude, innerW, stamps }) {
    const { pool, mark, hyphen } = this._syllablePool(bank, d, theme, loc, cardCase, exclude);
    const picks = sampleEntries(rng, pool, d.cards, `K-324 ${theme}/${loc} (syllable, pool ${d.pool}, count ${d.minCount}-${d.maxCount}, <= ${d.maxLetters} letters)`);
    const p = plateFor([''], d);
    const cards = picks.map((e) => C3.syllableCard({
      src: fileUri(theme, e.noun), vocabKey: e.vocabKey, word: e.word, split: e.split, pic: mark === 'hyphen' ? (d.hyphenPic || d.pic) : d.pic,
      mark, cell: d.cell, fontPx: d.fontPx, arcH: d.arcH, hyphen, px: p.px, lineH: p.lineH, pad: d.pad, innerW, extra: `data-lcs-noun="${e.noun_ ? 1 : 0}"`,
    }));
    const bodyHtml = C3.cardSheet({ cards, cols: d.cols, rows: d.rows, w: SHEET_W, h: SHEET_H, kind: 'syllable', extra: stamps + ` data-lcs-mark="${mark}" data-lcs-pool="${d.pool}"` });
    return { bodyHtml, meta: { kind: 'syllable', theme, mark, words: picks.map((e) => e.word), splits: picks.map((e) => e.split), vocab: picks.map((e) => e.vocabKey) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const f = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%20|$)/i;
      const sheets = document.querySelectorAll('[data-lcs-sheet]');
      if (sheets.length !== 1) { f.push(`${sheets.length} sheets`); return f; }
      const sheet = sheets[0];
      const kind = sheet.dataset.lcsSheet;
      const cols = +sheet.dataset.lcsCols, rows = +sheet.dataset.lcsRows;
      const cardCase = sheet.dataset.lcsCase || 'lower';
      const pad = +sheet.dataset.lcsPad;
      const grid = sheet.querySelector('[data-lcs-grid]');
      if (!grid) { f.push('no grid'); return f; }
      const gr = grid.getBoundingClientRect();
      const cells = [...grid.querySelectorAll('[data-lcs-card]')];
      if (cells.length !== cols * rows) f.push(`${cells.length} cards ≠ ${cols}x${rows}`);
      if (document.querySelectorAll('[data-lcs-scissors]').length !== 1) f.push('scissors glyph count ≠ 1');
      // overlay
      const ov = grid.querySelectorAll('[data-lcs-cutlines]');
      if (ov.length !== 1) f.push(`${ov.length} cut overlays`);
      else {
        const o = ov[0].getBoundingClientRect();
        if (Math.abs(o.width - gr.width) > 0.6 || Math.abs(o.height - gr.height) > 0.6) f.push(`overlay ${o.width}x${o.height} ≠ sheet ${gr.width}x${gr.height}`);
        if (!ov[0].querySelector('[data-lcs-cut-frame]')) f.push('no cut frame');
        const vs = [...ov[0].querySelectorAll('[data-lcs-cut-v]')], hs = [...ov[0].querySelectorAll('[data-lcs-cut-h]')];
        if (vs.length !== cols - 1) f.push(`${vs.length} vertical cuts ≠ ${cols - 1}`);
        if (hs.length !== rows - 1) f.push(`${hs.length} horizontal cuts ≠ ${rows - 1}`);
        vs.forEach((l) => {
          const k = +l.dataset.lcsCutV, x = +l.getAttribute('x1');
          if (Math.abs(x - (k * gr.width) / cols) > 1 || +l.getAttribute('x2') !== x) f.push(`cut v${k} at ${x}`);
          if (+l.getAttribute('y1') !== 0 || Math.abs(+l.getAttribute('y2') - gr.height) > 0.6) f.push(`cut v${k} does not span the sheet`);
          if (!l.getAttribute('stroke-dasharray')) f.push(`cut v${k} not dashed`);
        });
        hs.forEach((l) => {
          const k = +l.dataset.lcsCutH, y = +l.getAttribute('y1');
          if (Math.abs(y - (k * gr.height) / rows) > 1 || +l.getAttribute('y2') !== y) f.push(`cut h${k} at ${y}`);
          if (+l.getAttribute('x1') !== 0 || Math.abs(+l.getAttribute('x2') - gr.width) > 0.6) f.push(`cut h${k} does not span the sheet`);
          if (!l.getAttribute('stroke-dasharray')) f.push(`cut h${k} not dashed`);
        });
      }
      // cards: geometry, background, no border, content inside the cut margin
      const cellW = gr.width / cols, cellH = gr.height / rows;
      const rects = cells.map((c) => c.getBoundingClientRect());
      cells.forEach((c, i) => {
        const r = rects[i];
        if (r.left < gr.left - 0.6 || r.right > gr.right + 0.6 || r.top < gr.top - 0.6 || r.bottom > gr.bottom + 0.6) f.push(`card ${i + 1} outside the sheet`);
        if (Math.abs(r.width - cellW) > 1 || Math.abs(r.height - cellH) > 1) f.push(`card ${i + 1} ${Math.round(r.width)}x${Math.round(r.height)} ≠ cell ${Math.round(cellW)}x${Math.round(cellH)}`);
        const cs = getComputedStyle(c);
        if (cs.backgroundColor !== 'rgb(255, 255, 255)') f.push(`card ${i + 1} background ${cs.backgroundColor} (must be white)`);
        if (parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0) f.push(`card ${i + 1} has a border (the cut line is the overlay)`);
        if (Math.abs(parseFloat(cs.paddingTop) - pad) > 0.6) f.push(`card ${i + 1} padding ${cs.paddingTop} ≠ ${pad}`);
        for (let j = 0; j < i; j++) {
          const q = rects[j];
          if (r.left < q.right - 0.6 && q.left < r.right - 0.6 && r.top < q.bottom - 0.6 && q.top < r.bottom - 0.6) f.push(`cards ${j + 1} and ${i + 1} overlap`);
        }
        [...c.querySelectorAll('img, .ws-wordplate, [data-lcs-syllable-stack]')].forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.left < r.left + 10 - 0.6 || b.right > r.right - 10 + 0.6 || b.top < r.top + 10 - 0.6 || b.bottom > r.bottom - 10 + 0.6) f.push(`card ${i + 1}: content inside the 10 px cut margin`);
        });
      });
      const checkImg = (c, i, n) => {
        const imgs = c.querySelectorAll('img');
        if (imgs.length !== n) { f.push(`card ${i + 1}: ${imgs.length} pictures ≠ ${n}`); return; }
        if (n > 1 && new Set([...imgs].map((img) => img.src)).size !== 1) f.push(`card ${i + 1}: the ${n} pictures are not the same picture`);
        imgs.forEach((img) => {
          if (!img.complete || img.naturalWidth === 0) f.push(`card ${i + 1}: picture broken`);
          const dir = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
          if (BW.test(dir + '/')) f.push(`card ${i + 1}: BW directory "${dir}"`);
          if (img.dataset.lcsPic !== c.dataset.lcsVocab) f.push(`card ${i + 1}: picture ${img.dataset.lcsPic} ≠ vocab ${c.dataset.lcsVocab}`);
        });
      };
      const checkPlate = (c, i) => {
        const plates = c.querySelectorAll('.ws-wordplate');
        if (plates.length !== 1) { f.push(`card ${i + 1}: ${plates.length} plates`); return; }
        const p = plates[0];
        const lines = [...p.querySelectorAll('[data-lcs-line]')];
        const word = c.dataset.lcsWord;
        if (lines.map((l) => l.textContent).join(' ') !== word) f.push(`card ${i + 1}: plate text "${lines.map((l) => l.textContent).join(' ')}" ≠ word "${word}"`);
        if (+p.dataset.lcsLines !== lines.length) f.push(`card ${i + 1}: ${lines.length} lines ≠ stamp ${p.dataset.lcsLines}`);
        if (lines.length > 2) f.push(`card ${i + 1}: ${lines.length} lines`);
        const px = parseFloat(getComputedStyle(p).fontSize);
        if (Math.abs(px - +p.dataset.lcsPx) > 0.1) f.push(`card ${i + 1}: font ${px} ≠ stamp ${p.dataset.lcsPx}`);
        [p, ...lines].forEach((el) => { if (el.scrollWidth > el.clientWidth + 0.5) f.push(`card ${i + 1}: "${word}" overflows its plate (${el.scrollWidth} > ${el.clientWidth})`); });
        if (p.getBoundingClientRect().right > c.getBoundingClientRect().right - pad + 0.6) f.push(`card ${i + 1}: plate wider than the inner cell`);
        // case rule — on the bare noun (data-lcs-base) where the label carries an article
        const caseWord = c.dataset.lcsBase || word;
        const first = [...caseWord][0];
        const noun = c.dataset.lcsNoun;
        const isUpper = first !== first.toLocaleLowerCase(lang);
        if (cardCase === 'upper') {
          if ([...caseWord].some((ch) => ch.toLocaleLowerCase(lang) === ch && ch.toLocaleUpperCase(lang) !== ch)) f.push(`card ${i + 1}: "${caseWord}" is not all capitals`);
        } else if (lang === 'de' && cardCase === 'keep') {
          if (noun === '0' && isUpper) f.push(`card ${i + 1}: de non-noun "${caseWord}" capitalised`);
          if (noun === '1' && !isUpper) f.push(`card ${i + 1}: de noun "${caseWord}" lower-cased`);
        } else {
          if (cardCase === 'keep') f.push(`card ${i + 1}: cardCase keep outside de`);
          if (isUpper) f.push(`card ${i + 1}: "${caseWord}" capitalised under cardCase lower`);
        }
      };
      const checkStamped = (c, i) => {
        if (!c.dataset.lcsWord || !c.dataset.lcsVocab) f.push(`card ${i + 1}: unstamped`);
        if (seenW.has(c.dataset.lcsWord)) f.push(`card ${i + 1}: duplicate word "${c.dataset.lcsWord}"`); seenW.add(c.dataset.lcsWord);
        if (seenK.has(c.dataset.lcsVocab)) f.push(`card ${i + 1}: duplicate vocab ${c.dataset.lcsVocab}`); seenK.add(c.dataset.lcsVocab);
      };
      const seenW = new Set(), seenK = new Set();
      if (kind === 'word') {
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'word') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          if (!c.dataset.lcsWord || !c.dataset.lcsVocab) f.push(`card ${i + 1}: unstamped`);
          if (seenW.has(c.dataset.lcsWord)) f.push(`card ${i + 1}: duplicate word "${c.dataset.lcsWord}"`); seenW.add(c.dataset.lcsWord);
          if (seenK.has(c.dataset.lcsVocab)) f.push(`card ${i + 1}: duplicate vocab ${c.dataset.lcsVocab}`); seenK.add(c.dataset.lcsVocab);
          checkImg(c, i, 1);
          checkPlate(c, i);
        });
      } else if (kind === 'twin') {
        const pics = cells.filter((c) => /^p\d+$/.test(c.dataset.lcsTwin || ''));
        const words = cells.filter((c) => /^w\d+$/.test(c.dataset.lcsTwin || ''));
        if (pics.length * 2 !== cells.length || words.length !== pics.length) f.push(`twin: ${pics.length} picture cards / ${words.length} word cards`);
        const half = cells.length / 2;
        cells.forEach((c, i) => {
          const want = i < half ? 'p' + i : 'w' + (i - half);
          if (c.dataset.lcsTwin !== want) f.push(`card ${i + 1}: twin stamp ${c.dataset.lcsTwin} ≠ ${want}`);
        });
        pics.forEach((c, i) => { checkImg(c, i, 1); if (c.querySelector('.ws-wordplate') || c.dataset.lcsWord) f.push(`picture card ${i + 1} carries a word`); });
        words.forEach((c, i) => {
          checkImg(c, half + i, 0);
          if (seenW.has(c.dataset.lcsWord)) f.push(`word card ${i + 1}: duplicate word`); seenW.add(c.dataset.lcsWord);
          checkPlate(c, half + i);
        });
        const pk = pics.map((c) => c.dataset.lcsVocab), wk = words.map((c) => c.dataset.lcsVocab);
        if (new Set(pk).size !== pk.length) f.push('twin: duplicate picture vocab');
        if (pk.slice().sort().join('|') !== wk.slice().sort().join('|')) f.push('twin: word vocab multiset ≠ picture vocab multiset');
        wk.forEach((k, i) => { if (k === pk[i]) f.push(`twin: word slot ${i} names picture slot ${i} (identity)`); });
      } else if (kind === 'article') {
        const dots = sheet.dataset.lcsDots === '1';
        const legend = sheet.querySelector('[data-lcs-legend]');
        if (dots && !legend) f.push('article: dots without a legend');
        if (!dots && legend) f.push('article: a legend without dots');
        if (dots && legend && legend.querySelectorAll('[data-lcs-legend-dot]').length < 2) f.push('article: legend carries no colour dots');
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'article') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          checkStamped(c, i);
          const chip = c.dataset.lcsChip, base = c.dataset.lcsBase, word = c.dataset.lcsWord;
          if (!chip || !base) f.push(`card ${i + 1}: no article stamp`);
          else {
            const want = chip.endsWith("'") ? chip + base : chip + ' ' + base;
            if (chip.endsWith("'") && word.startsWith(chip + ' ')) f.push(`card ${i + 1}: elided article "${chip}" printed with a space ("${word}")`);
            else if (word !== want) f.push(`card ${i + 1}: label "${word}" ≠ chip + base "${want}"`);
          }
          const dot = c.querySelector('.ws-wordplate [data-lcs-dot]');
          if (dots && !dot && !chip.endsWith("'")) f.push(`card ${i + 1}: no colour dot under dots`);
          if (!dots && dot) f.push(`card ${i + 1}: a colour dot without dots`);
          checkImg(c, i, 1);
          checkPlate(c, i);
        });
      } else if (kind === 'plural') {
        const clones = +sheet.dataset.lcsClones;
        if (!(clones >= 2)) f.push(`plural: clones stamp ${sheet.dataset.lcsClones}`);
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'plural') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          const role = c.dataset.lcsRole, want = i % 2 === 0 ? 'one' : 'many';
          if (role !== want) f.push(`card ${i + 1}: role ${role} ≠ ${want}`);
          if (!c.dataset.lcsWord || !c.dataset.lcsVocab) f.push(`card ${i + 1}: unstamped`);
          if (seenW.has(c.dataset.lcsWord)) f.push(`card ${i + 1}: duplicate word "${c.dataset.lcsWord}"`); seenW.add(c.dataset.lcsWord);
          if (role === 'one') { if (seenK.has(c.dataset.lcsVocab)) f.push(`card ${i + 1}: duplicate vocab ${c.dataset.lcsVocab}`); seenK.add(c.dataset.lcsVocab); }
          else if (cells[i - 1] && cells[i - 1].dataset.lcsVocab !== c.dataset.lcsVocab) f.push(`card ${i + 1}: many-card vocab ${c.dataset.lcsVocab} ≠ its one-card ${cells[i - 1].dataset.lcsVocab}`);
          checkImg(c, i, role === 'many' ? clones : 1);
          if (role === 'many') {
            const row = c.querySelector('[data-lcs-clones]');
            if (!row || +row.dataset.lcsClones !== clones) f.push(`card ${i + 1}: clone row stamp ≠ ${clones}`);
          }
          checkPlate(c, i);
        });
      } else if (kind === 'bilingual') {
        const partner = sheet.dataset.lcsPartner;
        if (!partner || partner === lang) f.push(`bilingual: partner "${partner}" (host ${lang})`);
        const legend = sheet.querySelector('[data-lcs-legend]');
        if (!legend || !legend.querySelector('[data-lcs-legend-host]') || !legend.querySelector('[data-lcs-legend-partner]')) f.push('bilingual: no host · partner legend');
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'bilingual') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          checkStamped(c, i);
          checkImg(c, i, 1);
          checkPlate(c, i);
          const pl = c.querySelector('[data-lcs-partner-line]');
          const pw = c.dataset.lcsPartnerWord;
          if (!pl || !pw) f.push(`card ${i + 1}: no partner line`);
          else {
            if (pl.textContent !== pw) f.push(`card ${i + 1}: partner line "${pl.textContent}" ≠ stamp "${pw}"`);
            if (!/nunito/i.test(getComputedStyle(pl).fontFamily)) f.push(`card ${i + 1}: partner line not in Nunito`);
            if (pl.scrollWidth > pl.clientWidth + 0.5) f.push(`card ${i + 1}: partner "${pw}" overflows its plate`);
            const lines = c.querySelectorAll('[data-lcs-line]');
            if (lines.length !== 1) f.push(`card ${i + 1}: host on ${lines.length} lines (one only)`);
          }
        });
      } else if (kind === 'syllable') {
        const mark = sheet.dataset.lcsMark;
        cells.forEach((c, i) => {
          if (c.dataset.lcsCard !== 'syllable') f.push(`card ${i + 1}: kind ${c.dataset.lcsCard}`);
          checkStamped(c, i);
          checkImg(c, i, 1);
          const word = c.dataset.lcsWord || '';
          const split = (c.dataset.lcsSplit || '').split('|');
          if (split.join('').toLocaleLowerCase(lang) !== word.toLocaleLowerCase(lang)) f.push(`card ${i + 1}: split "${split.join('-')}" does not join to "${word}"`);
          if (+c.dataset.lcsCount !== split.length) f.push(`card ${i + 1}: count ${c.dataset.lcsCount} ≠ ${split.length} syllables`);
          if (split.length < 2) f.push(`card ${i + 1}: "${word}" has one syllable`);
          if (c.dataset.lcsMark !== mark) f.push(`card ${i + 1}: mark ${c.dataset.lcsMark} ≠ sheet ${mark}`);
          if (mark === 'arc') {
            if (c.querySelector('.ws-wordplate')) f.push(`card ${i + 1}: a plate on an arc card`);
            const sw = c.querySelector('[data-lcs-prim="syllable-word"]');
            const arcs = c.querySelector('[data-lcs-arcs]');
            if (!sw) f.push(`card ${i + 1}: no letter cells`);
            else {
              const letters = [...sw.querySelectorAll('[data-lcs-letter]')].map((t) => t.textContent).join('');
              if (letters !== word) f.push(`card ${i + 1}: letter cells "${letters}" ≠ word "${word}"`);
              if (+sw.dataset.lcsCells !== [...word].length) f.push(`card ${i + 1}: ${sw.dataset.lcsCells} cells ≠ ${[...word].length} letters`);
              const cell = +sw.dataset.lcsCell;
              if (!arcs) f.push(`card ${i + 1}: no arcs`);
              else {
                if (+arcs.dataset.lcsArcs !== split.length) f.push(`card ${i + 1}: ${arcs.dataset.lcsArcs} arcs ≠ ${split.length} syllables`);
                if (arcs.dataset.lcsArcmode !== 'printed') f.push(`card ${i + 1}: arcs are ${arcs.dataset.lcsArcmode}, not printed`);
                // each arc spans exactly its syllable's letter cells
                let at = 0;
                [...arcs.querySelectorAll('[data-lcs-arc]')].forEach((p, k) => {
                  const m = /^M ([\d.]+),3 Q [\d.]+,[\d.]+ ([\d.]+),3$/.exec(p.getAttribute('d') || '');
                  const len = [...(split[k] || '')].length;
                  if (!m) f.push(`card ${i + 1}: arc ${k + 1} path unreadable`);
                  else if (Math.abs(+m[1] - (at * cell + 4)) > 0.6 || Math.abs(+m[2] - ((at + len) * cell - 4)) > 0.6) f.push(`card ${i + 1}: arc ${k + 1} spans ${m[1]}..${m[2]}, syllable "${split[k]}" is cells ${at}..${at + len}`);
                  at += len;
                });
                if (sw.getBoundingClientRect().width > c.getBoundingClientRect().width - 2 * pad + 0.6) f.push(`card ${i + 1}: letter cells wider than the inner cell`);
              }
            }
          } else {
            const p = c.querySelector('.ws-wordplate');
            const text = p ? [...p.querySelectorAll('[data-lcs-line]')].map((l) => l.textContent).join(' ') : '';
            if (!p) f.push(`card ${i + 1}: no hyphen plate`);
            else {
              if (text.split(/[^\p{L}]+/u).join('|') !== split.join('|')) f.push(`card ${i + 1}: plate "${text}" ≠ the split ${split.join('-')}`);
              if (+p.dataset.lcsLines !== 1) f.push(`card ${i + 1}: hyphen plate on ${p.dataset.lcsLines} lines`);
              [p, ...p.querySelectorAll('[data-lcs-line]')].forEach((el) => { if (el.scrollWidth > el.clientWidth + 0.5) f.push(`card ${i + 1}: "${text}" overflows its plate`); });
              if (p.getBoundingClientRect().right > c.getBoundingClientRect().right - pad + 0.6) f.push(`card ${i + 1}: plate wider than the inner cell`);
            }
          }
        });
      } else f.push(`unknown sheet kind ${kind}`);
      // pictures at the K floor
      document.querySelectorAll('[data-lcs-card] img').forEach((img, i) => {
        const b = img.getBoundingClientRect();
        if (Math.min(b.width, b.height) < 56) f.push(`picture ${i + 1} ${Math.round(b.width)} px < 56`);
      });
      return f;
    });
  },
};
