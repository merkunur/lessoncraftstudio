/**
 * G1-309 — Rhyming Words: Rhyme and Write (nt20-C; family key `rhyming-words`,
 * G1 in en de es pt fr it nl fi, the K level key in sv da no; en RF.K.2.a +
 * L.1.2.d, the national framework NAME elsewhere). Design:
 * docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md §2/§5.
 *
 * "Say the picture. Circle the picture that rhymes. Write its word." Six
 * numbered cream rows; each reads left to right: a framed ANCHOR picture, a
 * small teal sound mark, three round CHOICE pictures on dashed rings (one
 * rhymes — it is a member of the anchor's rhyme CLASS — two come from OTHER
 * classes), then a school-line lane where the child writes the name of the
 * picture she circled. No word is printed; the written word is a picture's
 * name, so the answer never appears. Owned skill: rhyme recognition by SOUND
 * plus production of the rhyme word in writing. Boundary: K-232 draws a line
 * between pairs (nothing is joined here); K-226 asks the final letter; G1-244
 * writes the picture's OWN name; G1-306 R prints the rime.
 *
 * THEMELESS (`themeAxis:{applicable:false}`): a rhyme class is cross-theme
 * (cat/hat = animals/accessories); every bank member pins ONE opened picture
 * `pic:{theme,noun}` resolved through fileUri. The fan lever is the class SET
 * via `unitAxis` (README ruling): `unit` = a class id that must anchor one row;
 * with no unit the page ships the bank's `exemplar` set (d2 = the six exemplar
 * classes; d1 the first five; d3 the six + one sampled). Rows are shuffled.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   rows / choices / numbered      rows on the page; rings per row; the card badge
 *   anchorTile / anchorPx          the framed anchor box and its picture
 *   choiceTile / choicePx          the dashed ring and its picture
 *   laneW / laneH / glyphH         the writing lane (writingRow, x-height lines)
 *   starter                        d1: the first glyph of the answer printed on the lane
 *   nearMiss                       d3: one distractor per row is a `nearMiss` foil of the
 *                                  anchor's class (shares onset + vowel, does not rhyme)
 *   maxLetters                     anchor + partner words fit the lane by hand
 *   sameSpellingOnly               the rhyming PAIR is drawn from `sameSpelling:true`
 *                                  members (the base is a WRITE face; design §4 en)
 * `BAND_SHAPE.K` (sv da no — the K level key) is merged last: no badge, fewer
 * rows, K floors (pictures >= 56, glyphH 40). A locale / difficulty / unit the
 * pool cannot fill THROWS (refusal — never a filler, never a substitution).
 * build() reads ONLY data/b3/rhyming-words.js (lib/b3-common.js bank) +
 * fileUri; never image-vocabulary.js, rhyming-pairs.json or approved-words.
 *
 * Answer hiding: the row stage stamps data-lcs-anchor / -class; every ring
 * data-lcs-choice / -class / -word / -rhyme (+ -foil at d3); the lane carries
 * nothing. verify() re-derives: per row exactly one ring of the anchor's class
 * and it is rhyme="1"; the other rings' classes differ from the anchor's and
 * from each other; no vocabKey twice on the page; every picture loads, none
 * from a B&W directory; one empty lane per row (d1: only the starter glyph);
 * pictures >= the band floor; the row inside its card (`.ws-card` is
 * overflow:hidden — a clipped row would otherwise pass every lint); the rhyme
 * position not constant; no text node equals a stamped word. The node-side
 * cross-check (qa/verify-b3-rhyming-words.js) asserts every stamped (key,
 * class, word, picture) is a bank member VERBATIM, foils in the anchor's
 * nearMiss, and the pair sameSpelling:true — verify() cannot see the bank.
 *
 * FACES (Phase 2, design §3; tools/b3var-rows/rhyming-words.js; record
 * _work/G1-309-faces.md). One ADDITIVE knob on the resolved difficulty:
 *   mode: 'judge' | 'sort' | 'couplet' | 'string' | 'open'
 * read by _buildWith BEFORE the base path (a config without `mode` runs the
 * shipped base code verbatim — tools/b3-baseline.js is the proof); the root
 * stamps data-lcs-mode ONLY when declared, and verify() dispatches on it.
 * Each face = _planFace (the sampling, refuses like the base) + _renderFace
 * (the markup over an explicit plan — the gate's poison seam):
 *   judge   K-352  K in all 11 — 8 pair cards, 4 rhyme / 4 do not, tick or
 *                  cross (recognition only; no writing). Non-pairs draw from
 *                  classes off the rhyming set, differ in class AND sound, and
 *                  are never each other's near-miss at d2.
 *   sort    G1-343 base band (K in sv/da/no) — a numbered picture bank of 6
 *                  over 3 bins headed by a picture; the child writes each
 *                  bank word under its rhyme head (3 classes x 3 writable).
 *   couplet G1-344 G1 in all 11 — 6 two-line verses, line 1 ending in the
 *                  printed rhyme partner, line 2 with ONE blank and the
 *                  answer's picture as the cue; unitAxis OFF (the pool is the
 *                  bank's couplet list, >= 8 else the face refuses).
 *   string  G1-345 base band (K in sv/da/no) — a 12-word bank (8 answers + 4
 *                  foils from OFF-page classes) over 4 pictured anchors, two
 *                  empty lanes each; the one face where the child READS the
 *                  bank and rejects words.
 *   open    G1-346 G1 in all 11 — 6 cards: a picture + its PRINTED word over
 *                  two rulings; the child invents two rhymes (open-ended:
 *                  layout lints only; the answer key prints the class
 *                  members + extra as examples).
 * Face band: judge K / couplet + open G1 everywhere; sort + string follow the
 * locale (bandFor) and merge FACE_K_SHAPE last (rows fewer, K floors). The
 * gate's `band` override renders any K shape on the en bank.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { rhymeRow, pairCardRhyme, rhymeBank, rhymeBins, coupletCard, stringBank, stringLane, ownRhymeCard } = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');

const BANK = 'rhyming-words';
const WHO = 'G1-309';
const WORD_RE = /^[\p{L}\-']+$/u;
const CARD_INNER = 647;            // 675 card − 2 × (12 padding + 2 border)
const MARK_W = 20;
const K_LOCALES = new Set(['sv', 'da', 'no']);   // design §1: the K level key
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;

/** The K shape (design §2 "K shape"; d1/d3 derived from the same 647 budget — see the build record). */
const BAND_SHAPE = {
  K: {
    1: { rows: 4, choices: 2, numbered: false, anchorTile: 120, anchorPx: 100, choiceTile: 96, choicePx: 80, laneW: 271, laneH: 88, glyphH: 44, starter: true, nearMiss: false, maxLetters: 6 },
    2: { rows: 5, choices: 3, numbered: false, anchorTile: 100, anchorPx: 84, choiceTile: 80, choicePx: 64, laneW: 233, laneH: 80, glyphH: 40, starter: false, nearMiss: false, maxLetters: 7 },
    3: { rows: 6, choices: 4, numbered: false, anchorTile: 76, anchorPx: 62, choiceTile: 64, choicePx: 56, laneW: 227, laneH: 72, glyphH: 40, starter: false, nearMiss: true, maxLetters: 6 },
  },
};

function bandFor(loc) { return K_LOCALES.has(loc) ? 'K' : 'G1'; }

/* ------------------------------------------------------------------ faces */
const FACE_MODES = ['judge', 'sort', 'couplet', 'string', 'open'];
/** The band a face ships in (design §1): judge K x11; couplet + open G1 x11; sort + string = the base band. */
const FACE_BAND = { judge: () => 'K', sort: bandFor, string: bandFor, couplet: () => 'G1', open: () => 'G1' };
/** Merged last when a face renders in the K band (sv da no): K handwriting floor 40, fewer anchors on the string face. */
const FACE_K_SHAPE = {
  judge: {},
  sort: { laneH: 80, glyphH: 40, maxLetters: 6 },
  string: { anchors: 3, per: 2, foils: 2, laneW: 250, laneH: 80, glyphH: 40, maxLetters: 7 },
  couplet: {},
  open: {},
};
const LANE_INNER = 639;            // .ws-lane inline padding 8 16 inside the 675 column
const BANK_INNER = 651;            // .ws-bank padding 8 12 inside the 675 column (G1-307 measured)
const BIN_COL_W = 215;             // 3 x 215 + 2 x 15 = 675
const OPEN_CARD_INNER = 302;       // (675 - 14) / 2 - 2 x (12 + 2)
/** Nunito 800 pill estimate (G1-307's measured guard: 32 + 0.57·px per glyph + the 10 px flex gap). */
function pillEstimate(word, px) { return 32 + 0.57 * px * glyphs(word) + 10; }
/** Baloo 2 700 advance estimate (G1-307: 0.45…0.56·px per glyph; 0.6 over-estimates, never under). */
function wordEstimate(word, px) { return 0.6 * px * glyphs(word); }
function faceOf(d) { return d && FACE_MODES.includes(d.mode) ? d.mode : null; }
function glyphs(w) { return [...String(w)].length; }
/** Members a WRITE face may pair (design §4: where orthography is not trusted, sameSpelling:true only). */
function writable(cls, bank, d, loc) {
  return cls.members.filter((m) => (!d.sameSpellingOnly || bank.orthographyTrusted || m.sameSpelling === true))
    .filter((m) => WORD_RE.test(m.word) && glyphs(m.word) <= d.maxLetters);
}
/** The resolved config for (difficulty, band): the band shape is merged LAST (design §2 ladder). */
function resolveConfig(spec, difficulty, band) {
  const base = spec.difficulty[difficulty];
  if (!base) throw new Error(`${WHO}: no difficulty ${difficulty}`);
  const shape = BAND_SHAPE[band] && BAND_SHAPE[band][difficulty];
  return Object.assign({}, base, shape || {}, { band });
}
function rowWidth(d) {
  const badge = d.numbered === false ? 0 : 20;
  return badge + d.anchorTile + 10 + MARK_W + 10 + d.choices * d.choiceTile + (d.choices - 1) * 10 + 14 + d.laneW;
}

module.exports = {
  id: 'G1-309',
  slug: 'rhyming-words-rhyme-and-write',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'rhyming-words',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    // every class that can anchor a d2 row (>= 2 writable members) in bank order; the wave's first N ship
    units: (loc) => {
      const l = (loc || 'en').slice(0, 2);
      const bank = loadBank(BANK, l);
      const d = resolveConfig(module.exports, 2, bandFor(l));
      return bank.classes.filter((c) => writable(c, bank, d, l).length >= 2).map((c) => c.id);
    },
    exemplar: (loc) => loadBank(BANK, (loc || 'en').slice(0, 2)).exemplar[0],
    tokens: (unit, loc) => {
      const l = (loc || 'en').slice(0, 2);
      const cls = loadBank(BANK, l).classes.find((c) => c.id === unit);
      const label = cls ? cls.rime : String(unit);
      return { U: label, L: label.toLocaleLowerCase(l), UNIT: label };
    },
  },
  difficulty: {
    // rows / choices · anchor tile/pic · ring tile/pic · lane w/h/glyphH · starter · nearMiss · maxLetters (design §2 ladder)
    1: { rows: 5, choices: 2, numbered: true, anchorTile: 100, anchorPx: 84, choiceTile: 88, choicePx: 72, laneW: 287, laneH: 72, glyphH: 32, starter: true, nearMiss: false, maxLetters: 9, sameSpellingOnly: true },
    2: { rows: 6, choices: 3, numbered: true, anchorTile: 76, anchorPx: 64, choiceTile: 76, choicePx: 60, laneW: 240, laneH: 64, glyphH: 28, starter: false, nearMiss: false, maxLetters: 10, sameSpellingOnly: true },
    3: { rows: 7, choices: 4, numbered: true, anchorTile: 60, anchorPx: 50, choiceTile: 56, choicePx: 46, laneW: 245, laneH: 56, glyphH: 26, starter: false, nearMiss: true, maxLetters: 11, sameSpellingOnly: true },
  },
  i18n: {
    en: {
      title: 'Rhyming Words: Rhyme and Write',
      instruction: 'Say the first picture. Circle the picture that rhymes with it, then write its word on the line.',
    },
  },

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. `band` overrides the locale's band (the gate renders the K shape on the en bank). */
  _buildWith(bank, { difficulty, locale, unit, band }, ctx) {
    // Phase 2 faces: a resolved config that declares `mode` leaves here; the base path below is untouched
    const face = faceOf(this.difficulty[difficulty]);
    if (face) return this._buildFace(face, bank, this.difficulty[difficulty], { locale, unit, band }, ctx);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const who = WHO;
    const B = band || bandFor(loc);
    const d = resolveConfig(this, difficulty, B);
    const floor = tokens.density[B].minElement;
    // guards on the RESOLVED config
    if (!(d.rows >= 4 && d.rows <= 12)) throw new Error(`${who}: rows ${d.rows} outside 4..12`);
    if (!(d.choices >= 2 && d.choices <= 4)) throw new Error(`${who}: choices ${d.choices} outside 2..4`);
    if (d.rows < d.choices) throw new Error(`${who}: rows ${d.rows} < choices ${d.choices} — the rhyme position cannot cover every slot`);
    if (d.choicePx < floor || d.anchorPx < floor) throw new Error(`${who}: picture ${Math.min(d.choicePx, d.anchorPx)} px below the ${B} floor ${floor}`);
    if (d.glyphH < (B === 'K' ? 40 : 26)) throw new Error(`${who}: glyphH ${d.glyphH} below the ${B} handwriting floor`);
    const rw = rowWidth(d);
    if (rw > CARD_INNER) throw new Error(`${who}: row budget ${rw} px > the ${CARD_INNER} px card`);
    const posMax = Math.ceil(d.rows / d.choices) + 1;

    // the bank shape
    const classes = Array.isArray(bank.classes) ? bank.classes : [];
    if (!classes.length) throw new Error(`${who}: ${loc} bank has no classes`);
    const byId = new Map(classes.map((c) => [c.id, c]));
    const owner = new Map();          // vocabKey → class id (a word in exactly one class)
    for (const c of classes) for (const m of c.members) {
      if (owner.has(m.vocabKey) && owner.get(m.vocabKey) !== c.id) throw new Error(`${who}: "${m.vocabKey}" is a member of two classes (${owner.get(m.vocabKey)}, ${c.id})`);
      owner.set(m.vocabKey, c.id);
    }
    const pic = (m) => {
      if (!m.pic || !m.pic.theme || !m.pic.noun) throw new Error(`${who}: "${m.vocabKey}" has no picture — refuse`);
      if (BW_MARKER.test(m.pic.theme)) throw new Error(`${who}: "${m.vocabKey}" pins a B&W directory ${m.pic.theme} — refuse`);
      if (m.picOpened !== true) throw new Error(`${who}: "${m.vocabKey}" pins a picture that was never opened (picOpened) — refuse`);
      return fileUri(m.pic.theme, m.pic.noun);   // throws when the file is not cached
    };

    // every bank picture must exist BEFORE any draw: a member without a cached colour picture refuses the whole
    // locale page (never a silent gap on a row it happened not to reach — the P2 `lynx` poison was SILENT while
    // the picture was resolved lazily on the rows that drew it)
    for (const c of classes) for (const m of [...(c.members || []), ...(c.nearMiss || [])]) pic(m);
    // eligible anchor classes: >= 2 writable members (+ >= 1 near-miss foil at d3)
    const eligible = classes.filter((c) => writable(c, bank, d, loc).length >= 2 && (!d.nearMiss || (c.nearMiss || []).length >= 1));
    const elig = new Set(eligible.map((c) => c.id));
    if (eligible.length < d.rows) throw new Error(`${who}: ${loc} has ${eligible.length} classes that can anchor a row at this difficulty, need ${d.rows} (refuse)`);
    let set;
    if (unit) {
      if (!byId.has(unit)) throw new Error(`${who}: unit "${unit}" is not a ${loc} class`);
      if (!elig.has(unit)) throw new Error(`${who}: unit "${unit}" cannot anchor a row at this difficulty (refuse)`);
      set = [unit, ...rng.sample(eligible.filter((c) => c.id !== unit).map((c) => c.id), d.rows - 1)];
    } else {
      const ex = Array.isArray(bank.exemplar) ? bank.exemplar : [];
      for (const id of ex) if (!byId.has(id)) throw new Error(`${who}: exemplar class "${id}" is not a ${loc} class`);
      if (d.rows <= ex.length) {
        set = ex.slice(0, d.rows);
        for (const id of set) if (!elig.has(id)) throw new Error(`${who}: exemplar class "${id}" cannot anchor a row at this difficulty (refuse)`);
      } else {
        for (const id of ex) if (!elig.has(id)) throw new Error(`${who}: exemplar class "${id}" cannot anchor a row at this difficulty (refuse)`);
        set = [...ex, ...rng.sample(eligible.filter((c) => !ex.includes(c.id)).map((c) => c.id), d.rows - ex.length)];
      }
    }
    if (new Set(set).size !== set.length) throw new Error(`${who}: a class twice on the page (${set.join(',')})`);
    const allMembers = [];
    for (const c of classes) for (const m of c.members) allMembers.push({ m, cls: c.id });
    const fixed = unit ? [unit] : set.slice(0, Math.min(d.rows, (bank.exemplar || []).length));
    const extraPool = eligible.filter((c) => !fixed.includes(c.id)).map((c) => c.id);

    /**
     * One assignment attempt over the class set: the rhyming pair per row from the writable members, then (d3)
     * the near-miss foil per row (a foil that is also a member of another class may already be spent as a pair
     * member — measured: `cart`, the only -ar foil, was taken by a sampled -art pair), then the distractors
     * (every word once per page, distinct classes). Returns null when the draw cannot be completed; the caller
     * re-samples the non-fixed classes and the picks (deterministic under the seed) and REFUSES after the try
     * budget — never a filler.
     */
    const attempt = (classIds) => {
      const order = rng.shuffle(classIds);
      const used = new Set();
      const rows = order.map((id) => ({ cls: byId.get(id) }));
      for (const r of rows) {
        const w = writable(r.cls, bank, d, loc).filter((m) => !used.has(m.vocabKey));
        if (w.length < 2) return null;
        [r.anchor, r.partner] = rng.sample(w, 2);
        used.add(r.anchor.vocabKey); used.add(r.partner.vocabKey);
      }
      if (d.nearMiss) {
        // the foil: a near-miss of the class, preferring one that shares the ANCHOR's onset (cat → cap, not cat →
        // can-of-another-member); when only the partner's onset matches, the pair swaps roles so the anchor is the
        // word the foil is nearest to
        const first = (w) => [...String(w)][0].toLocaleLowerCase(loc);
        for (const r of rows) {
          const foils = rng.shuffle((r.cls.nearMiss || []).filter((x) => !used.has(x.vocabKey)));
          if (!foils.length) return null;
          let f = foils.find((x) => first(x.word) === first(r.anchor.word));
          if (!f) {
            const g = foils.find((x) => first(x.word) === first(r.partner.word));
            if (g) { f = g; [r.anchor, r.partner] = [r.partner, r.anchor]; } else f = foils[0];
          }
          r.foil = { m: f, cls: owner.get(f.vocabKey) || '', foil: true };
          used.add(f.vocabKey);
        }
      }
      for (const r of rows) {
        const nm = new Set((r.cls.nearMiss || []).map((x) => x.vocabKey));
        const needRegular = d.choices - 1 - (d.nearMiss ? 1 : 0);
        const cands = rng.shuffle(allMembers.filter((x) => x.cls !== r.cls.id && !used.has(x.m.vocabKey) && !nm.has(x.m.vocabKey)));
        const taken = r.foil ? [r.foil] : [];
        const takenCls = new Set(r.foil && r.foil.cls ? [r.foil.cls] : []);
        let regular = 0;
        for (const x of cands) {
          if (regular === needRegular) break;
          if (takenCls.has(x.cls)) continue;
          taken.push({ m: x.m, cls: x.cls, foil: false }); takenCls.add(x.cls); used.add(x.m.vocabKey); regular++;
        }
        if (regular < needRegular) return null;
        r.distractors = rng.shuffle(taken);
      }
      return rows;
    };
    let rows = null;
    let classIds = set;
    for (let tries = 0; tries < 40 && !rows; tries++) {
      if (tries > 0) classIds = [...fixed, ...rng.sample(extraPool, d.rows - fixed.length)];
      rows = attempt(classIds);
    }
    if (!rows) throw new Error(`${who}: ${loc} cannot fill ${d.rows} rows × ${d.choices} choices from the ${fixed.length} fixed class(es) [${fixed.join(',')}] + ${extraPool.length} others at this difficulty (refuse)`);
    const order = rows.map((r) => r.cls.id);
    // the rhyme position: each slot >= 1 and <= posMax over the page (re-roll)
    let positions;
    for (let tries = 0; ; tries++) {
      positions = rows.map(() => rng.int(0, d.choices - 1));
      const counts = new Array(d.choices).fill(0);
      positions.forEach((p) => counts[p]++);
      if (counts.every((n) => n >= 1 && n <= posMax)) break;
      if (tries > 500) throw new Error(`${who}: could not balance the rhyme position`);
    }
    rows.forEach((r, i) => { r.pos = positions[i]; });

    // the rows
    const cards = rows.map((r) => {
      const choices = [];
      const ds = r.distractors.slice();
      for (let k = 0; k < d.choices; k++) {
        if (k === r.pos) choices.push({ src: pic(r.partner), vocabKey: r.partner.vocabKey, cls: r.cls.id, word: r.partner.word, rhyme: true, foil: false });
        else { const x = ds.shift(); choices.push({ src: pic(x.m), vocabKey: x.m.vocabKey, cls: x.cls, word: x.m.word, rhyme: false, foil: x.foil }); }
      }
      return rhymeRow({
        anchor: { src: pic(r.anchor), vocabKey: r.anchor.vocabKey, cls: r.cls.id, word: r.anchor.word },
        choices,
        lane: { w: d.laneW, h: d.laneH, glyphH: d.glyphH, starter: d.starter ? [...r.partner.word][0] : null },
        anchorTile: d.anchorTile, anchorPx: d.anchorPx, choiceTile: d.choiceTile, choicePx: d.choicePx,
        badgeGap: d.numbered === false ? 0 : 20,
      });
    });
    const bodyHtml = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-rhyming ` +
      `data-lcs-rows="${d.rows}" data-lcs-choices="${d.choices}" data-lcs-min-icon="${floor}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" ` +
      `data-lcs-glyph-h="${d.glyphH}" data-lcs-starter="${d.starter ? 1 : 0}" data-lcs-near-miss="${d.nearMiss ? 1 : 0}" data-lcs-pos-max="${posMax}" data-lcs-band="${B}"` +
      (unit ? ` data-lcs-unit="${unit}"` : '') + `>` +
      cardGrid({ cards, cols: 1, rows: d.rows, numbered: d.numbered !== false }) + `</div>`;
    return {
      bodyHtml,
      meta: {
        band: B, unit: unit || null, classes: order, positions,
        rows: rows.map((r) => ({ cls: r.cls.id, anchor: r.anchor.vocabKey, partner: r.partner.vocabKey, pos: r.pos, distractors: r.distractors.map((x) => ({ key: x.m.vocabKey, cls: x.cls, foil: x.foil })) })),
        answers: rows.map((r) => r.partner.word),
      },
    };
  },

  /** A face: resolve its config for the band, plan (sample) it, render it. */
  _buildFace(face, bank, raw, { locale, unit, band }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const B = band || FACE_BAND[face](loc);
    const d = Object.assign({}, raw, B === 'K' ? FACE_K_SHAPE[face] : {}, { band: B });
    const plan = this._planFace(face, bank, d, { locale: loc, unit }, ctx.rng);
    return this._renderFace(face, plan, d, B);
  },

  /**
   * The sampling of a face over the bank (refuses like the base: never a filler). Returns a PLAN — plain data
   * the renderer consumes and the gate can hand-build for its poisons. `unit` = a class id that must be on the
   * page in the face's own sense (judge: a rhyming pair; sort: a bin; string: an anchor; open: an anchor's
   * class); the couplet face carries no unit axis.
   */
  _planFace(face, bank, d, { locale, unit }, rng) {
    const loc = (locale || 'en').slice(0, 2);
    const who = `${WHO}/${face}`;
    const B = d.band || 'G1';
    const floor = tokens.density[B].minElement;
    const classes = Array.isArray(bank.classes) ? bank.classes : [];
    if (!classes.length) throw new Error(`${who}: ${loc} bank has no classes`);
    const byId = new Map(classes.map((c) => [c.id, c]));
    const owner = new Map();
    for (const c of classes) for (const m of c.members) {
      if (owner.has(m.vocabKey) && owner.get(m.vocabKey) !== c.id) throw new Error(`${who}: "${m.vocabKey}" is a member of two classes (${owner.get(m.vocabKey)}, ${c.id})`);
      owner.set(m.vocabKey, c.id);
    }
    const pic = (m) => {
      if (!m.pic || !m.pic.theme || !m.pic.noun) throw new Error(`${who}: "${m.vocabKey}" has no picture — refuse`);
      if (BW_MARKER.test(m.pic.theme)) throw new Error(`${who}: "${m.vocabKey}" pins a B&W directory ${m.pic.theme} — refuse`);
      if (m.picOpened !== true) throw new Error(`${who}: "${m.vocabKey}" pins a picture that was never opened (picOpened) — refuse`);
      return fileUri(m.pic.theme, m.pic.noun);
    };
    for (const c of classes) for (const m of [...(c.members || []), ...(c.nearMiss || [])]) pic(m);
    const nmOf = (cls) => new Set((cls.nearMiss || []).map((x) => x.vocabKey));
    const ex = Array.isArray(bank.exemplar) ? bank.exemplar : [];
    for (const id of ex) if (!byId.has(id)) throw new Error(`${who}: exemplar class "${id}" is not a ${loc} class`);
    /** The page's class set: the unit first (must qualify), else the exemplar classes that qualify in order, then sampled. */
    const chooseClasses = (eligible, n) => {
      const elig = new Set(eligible.map((c) => c.id));
      if (eligible.length < n) throw new Error(`${who}: ${loc} has ${eligible.length} classes that qualify for this face, need ${n} (refuse)`);
      if (unit) {
        if (!byId.has(unit)) throw new Error(`${who}: unit "${unit}" is not a ${loc} class`);
        if (!elig.has(unit)) throw new Error(`${who}: unit "${unit}" cannot carry this face (refuse)`);
        return [unit, ...rng.sample(eligible.filter((c) => c.id !== unit).map((c) => c.id), n - 1)];
      }
      const fixed = ex.filter((id) => elig.has(id)).slice(0, n);
      return [...fixed, ...rng.sample(eligible.filter((c) => !fixed.includes(c.id)).map((c) => c.id), n - fixed.length)];
    };
    const entry = (m, cls) => ({ vocabKey: m.vocabKey, word: m.word, cls, src: pic(m), pic: m.pic });

    if (face === 'judge') {
      if (!(d.cards >= 4 && d.cards <= 8 && d.cards % 2 === 0)) throw new Error(`${who}: cards ${d.cards} outside 4..8 (even)`);
      if (!(d.yes >= 2 && d.yes <= d.cards - 2)) throw new Error(`${who}: yes ${d.yes} must leave >= 2 non-rhyming cards`);
      if (d.picPx < floor) throw new Error(`${who}: picture ${d.picPx} px below the ${B} floor ${floor}`);
      if (!(d.chipPx >= 56)) throw new Error(`${who}: chip ${d.chipPx} px below the 56 px K tap floor`);
      const eligible = classes.filter((c) => (c.members || []).length >= 2);
      const pairIds = chooseClasses(eligible, d.yes);
      const used = new Set();
      const pairs = pairIds.map((id) => {
        const c = byId.get(id);
        const [a, b] = rng.sample(c.members, 2);
        used.add(a.vocabKey); used.add(b.vocabKey);
        return { a: entry(a, id), b: entry(b, id), rhyme: true, cls: id };
      });
      const pairSounds = new Set(pairIds.map((id) => byId.get(id).sound));
      const pool = [];
      for (const c of classes) if (!pairIds.includes(c.id)) for (const m of c.members) pool.push({ m, c });
      const need = d.cards - d.yes;
      const draw = (strict) => {
        const out = [];
        const usedW = new Set(used);
        const usedC = new Set();
        const seenPair = new Set();
        const cands = rng.shuffle(pool);
        for (let i = 0; i < cands.length && out.length < need; i++) {
          const A = cands[i];
          if (usedW.has(A.m.vocabKey) || (strict && usedC.has(A.c.id))) continue;
          const Bc = cands.find((x, j) => j !== i && !usedW.has(x.m.vocabKey) && x.c.id !== A.c.id && x.c.sound !== A.c.sound &&
            !(strict && usedC.has(x.c.id)) && !nmOf(A.c).has(x.m.vocabKey) && !nmOf(x.c).has(A.m.vocabKey) &&
            !seenPair.has([A.c.id, x.c.id].sort().join('|')) && !pairSounds.has(x.c.sound) && !pairSounds.has(A.c.sound));
          if (!Bc) continue;
          usedW.add(A.m.vocabKey); usedW.add(Bc.m.vocabKey); usedC.add(A.c.id); usedC.add(Bc.c.id);
          seenPair.add([A.c.id, Bc.c.id].sort().join('|'));
          out.push({ a: entry(A.m, A.c.id), b: entry(Bc.m, Bc.c.id), rhyme: false, cls: null });
        }
        return out.length === need ? out : null;
      };
      let nons = null;
      for (let t = 0; t < 20 && !nons; t++) nons = draw(true);
      for (let t = 0; t < 20 && !nons; t++) nons = draw(false);
      if (!nons) throw new Error(`${who}: ${loc} cannot draw ${need} non-rhyming pairs from the classes off the rhyming set (refuse)`);
      // reading order: yes in both columns, never 4 equal verdicts in a row
      let cards;
      for (let t = 0; ; t++) {
        cards = rng.shuffle([...pairs, ...nons]);
        const cols = [new Set(), new Set()];
        cards.forEach((c, i) => cols[i % 2].add(c.rhyme));
        let run = 1, bad = false;
        for (let i = 1; i < cards.length; i++) { run = cards[i].rhyme === cards[i - 1].rhyme ? run + 1 : 1; if (run >= 4) bad = true; }
        if (!bad && cols[0].has(true) && cols[1].has(true) && cols[0].has(false) && cols[1].has(false)) break;
        if (t > 500) throw new Error(`${who}: could not balance the yes/no layout`);
      }
      return { face, band: B, unit: unit || null, cards, pairIds };
    }

    if (face === 'sort') {
      if (!(d.bins >= 2 && d.bins <= 3)) throw new Error(`${who}: bins ${d.bins} outside 2..3`);
      if (!(d.perBin >= 2 && d.perBin <= 3)) throw new Error(`${who}: perBin ${d.perBin} outside 2..3`);
      if (d.bankPx < floor || d.headPx < floor) throw new Error(`${who}: picture ${Math.min(d.bankPx, d.headPx)} px below the ${B} floor ${floor}`);
      if (d.glyphH < (B === 'K' ? 40 : 26)) throw new Error(`${who}: glyphH ${d.glyphH} below the ${B} handwriting floor`);
      // the head is a PICTURE the child never writes (any member with a picture); the perBin bank members are
      // written under it, so they alone must be writable — a class like -ee (bee tree + key) heads with key
      const headable = (c) => (c.members || []).filter((m) => WORD_RE.test(m.word));
      const eligible = classes.filter((c) => writable(c, bank, d, loc).length >= d.perBin && headable(c).length >= d.perBin + 1);
      const ids = chooseClasses(eligible, d.bins);
      const bins = rng.shuffle(ids).map((id) => {
        const c = byId.get(id);
        const members = rng.sample(writable(c, bank, d, loc), d.perBin);
        const taken = new Set(members.map((m) => m.vocabKey));
        const head = rng.pick(headable(c).filter((m) => !taken.has(m.vocabKey)));
        return { cls: id, head: entry(head, id), members: members.map((m) => entry(m, id)) };
      });
      let bankItems;
      for (let t = 0; ; t++) {
        bankItems = rng.shuffle(bins.flatMap((b) => b.members));
        if (!bankItems.some((x, i) => i > 0 && x.cls === bankItems[i - 1].cls)) break;
        if (t > 300) throw new Error(`${who}: could not order the bank without an adjacent pair`);
      }
      return { face, band: B, unit: unit || null, bins, bankItems };
    }

    if (face === 'couplet') {
      if (!(d.rows >= 4 && d.rows <= 7)) throw new Error(`${who}: rows ${d.rows} outside 4..7`);
      if (d.picPx < floor) throw new Error(`${who}: picture ${d.picPx} px below the ${B} floor ${floor}`);
      if (d.glyphH < 26) throw new Error(`${who}: glyphH ${d.glyphH} below the G1 handwriting floor`);
      if (!(d.fontPx >= 16)) throw new Error(`${who}: verse font ${d.fontPx} px below 16`);
      const all = Array.isArray(bank.couplets) ? bank.couplets : [];
      if (all.length < 8) throw new Error(`${who}: ${loc} has ${all.length} couplets < 8 — F3 refused`);
      const lower = (x) => String(x).toLocaleLowerCase(loc);
      const wordRe = (w) => new RegExp('(?<!\\p{L})' + String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');
      const usable = all.map((cp) => {
        const key = cp.answer && cp.answer.vocabKey;
        const cid = owner.get(key);
        const c = cid && byId.get(cid);
        const m = c && c.members.find((x) => x.vocabKey === key);
        if (!m || !Array.isArray(cp.lines) || cp.lines.length !== 2) return null;
        const [l1, l2] = cp.lines;
        if ((l2.match(/___/g) || []).length !== 1 || l1.includes('___')) return null;
        if (wordRe(m.word).test(lower(l1)) || wordRe(m.word).test(lower(l2))) return null;
        const poolW = new Set([...c.members.map((x) => lower(x.word)), ...(c.extra || []).map(lower)]);
        if (!poolW.has(lower(cp.rhymeWith || '')) || !wordRe(cp.rhymeWith).test(lower(l1))) return null;
        const [pre, post] = l2.split('___');
        if (glyphs(l1) > 45 || glyphs(pre) + glyphs(post) > 40) return null;
        if (glyphs(m.word) > d.maxLetters) return null;
        if (!bank.orthographyTrusted && d.sameSpellingOnly && m.sameSpelling !== true) return null;
        return { id: cp.id, line1: l1, pre, post: post || '', rhymeWith: cp.rhymeWith, answer: entry(m, cid), cls: cid };
      }).filter(Boolean);
      const pickRows = (strict) => {
        const out = [];
        const seenA = new Set(), seenR = new Set(), seenC = new Set();
        for (const cp of rng.shuffle(usable)) {
          if (out.length === d.rows) break;
          if (seenA.has(cp.answer.vocabKey) || seenR.has(lower(cp.rhymeWith)) || (strict && seenC.has(cp.cls))) continue;
          seenA.add(cp.answer.vocabKey); seenR.add(lower(cp.rhymeWith)); seenC.add(cp.cls);
          out.push(cp);
        }
        return out.length === d.rows ? out : null;
      };
      const rows = pickRows(true) || pickRows(false);
      if (!rows) throw new Error(`${who}: ${loc} has ${usable.length} usable couplets (distinct answers + partners), need ${d.rows} (refuse)`);
      return { face, band: B, unit: null, rows };
    }

    if (face === 'string') {
      if (!(d.anchors >= 3 && d.anchors <= 4)) throw new Error(`${who}: anchors ${d.anchors} outside 3..4`);
      if (!(d.per >= 2 && d.per <= 3)) throw new Error(`${who}: per ${d.per} outside 2..3`);
      if (!(d.foils >= 2)) throw new Error(`${who}: foils ${d.foils} < 2 — a bank with nothing to reject is the base`);
      if (d.picPx < floor) throw new Error(`${who}: picture ${d.picPx} px below the ${B} floor ${floor}`);
      if (d.glyphH < (B === 'K' ? 40 : 26)) throw new Error(`${who}: glyphH ${d.glyphH} below the ${B} handwriting floor`);
      const anchorable = (c) => (c.members || []).filter((m) => WORD_RE.test(m.word));
      const eligible = classes.filter((c) => writable(c, bank, d, loc).length >= d.per && anchorable(c).length >= d.per + 1);
      const ids = chooseClasses(eligible, d.anchors);
      const pageSounds = new Set(ids.map((id) => byId.get(id).sound));
      const pageNm = new Set(ids.flatMap((id) => [...nmOf(byId.get(id))]));
      const anchors = rng.shuffle(ids).map((id) => {
        const c = byId.get(id);
        const answers = rng.sample(writable(c, bank, d, loc), d.per);
        const taken = new Set(answers.map((m) => m.vocabKey));
        const anchor = rng.pick(anchorable(c).filter((m) => !taken.has(m.vocabKey)));
        return { cls: id, anchor: entry(anchor, id), answers: answers.map((m) => entry(m, id)) };
      });
      const foilPool = [];
      for (const c of classes) if (!ids.includes(c.id) && !pageSounds.has(c.sound)) for (const m of c.members) if (!pageNm.has(m.vocabKey) && WORD_RE.test(m.word) && glyphs(m.word) <= d.maxLetters) foilPool.push({ m, c });
      const foils = [];
      const usedC = new Set();
      for (const x of rng.shuffle(foilPool)) { if (foils.length === d.foils) break; if (usedC.has(x.c.id)) continue; usedC.add(x.c.id); foils.push(Object.assign(entry(x.m, x.c.id), { foil: true })); }
      if (foils.length < d.foils) throw new Error(`${who}: ${loc} has ${foils.length} foil words from distinct classes off the page, need ${d.foils} (refuse)`);
      const words = [...anchors.flatMap((a) => a.answers.map((w) => Object.assign({}, w, { foil: false }))), ...foils];
      const est = words.reduce((sum, w) => sum + pillEstimate(w.word, d.wordPx), 0);
      if (est > 2 * BANK_INNER) throw new Error(`${who}: bank of ${words.length} words estimates ${Math.round(est)} px > two rows (${2 * BANK_INNER}) — refuse, never a 3rd row`);
      let bankItems;
      for (let t = 0; ; t++) {
        bankItems = rng.shuffle(words);
        if (!bankItems.some((x, i) => i > 0 && !x.foil && !bankItems[i - 1].foil && x.cls === bankItems[i - 1].cls)) break;
        if (t > 300) throw new Error(`${who}: could not order the bank without an adjacent answer pair`);
      }
      return { face, band: B, unit: unit || null, anchors, foils, bankItems };
    }

    if (face === 'open') {
      if (!(d.cards >= 4 && d.cards <= 6)) throw new Error(`${who}: cards ${d.cards} outside 4..6`);
      if (!(d.lines >= 1 && d.lines <= 3)) throw new Error(`${who}: lines ${d.lines} outside 1..3`);
      if (d.picPx < floor) throw new Error(`${who}: picture ${d.picPx} px below the ${B} floor ${floor}`);
      if (d.glyphH < 26) throw new Error(`${who}: glyphH ${d.glyphH} below the G1 handwriting floor`);
      const wordMax = OPEN_CARD_INNER - 20 - d.picPx - 10;
      const productive = (c) => (c.members || []).filter((m) => m.productive === true && (!d.sameSpellingOnly || bank.orthographyTrusted || m.sameSpelling === true) && WORD_RE.test(m.word) && wordEstimate(m.word, d.wordPx) <= wordMax);
      const eligible = classes.filter((c) => (c.members || []).length >= 2 && productive(c).length >= 1);
      const ids = chooseClasses(eligible, d.cards);
      const cards = rng.shuffle(ids).map((id) => {
        const c = byId.get(id);
        const m = rng.pick(productive(c));
        const examples = [...c.members.filter((x) => x.vocabKey !== m.vocabKey).map((x) => x.word), ...(c.extra || [])];
        return { cls: id, anchor: entry(m, id), examples };
      });
      return { face, band: B, unit: unit || null, cards };
    }
    throw new Error(`${WHO}: unknown face "${face}"`);
  },

  /** The markup of a face over a PLAN (no sampling here — the gate hands this explicit plans as poisons). */
  _renderFace(face, plan, d, band) {
    const B = band || plan.band || 'G1';
    const floor = tokens.density[B].minElement;
    const stamp = (extra) => `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-rhyming data-lcs-mode="${face}" data-lcs-min-icon="${floor}" data-lcs-band="${B}"` +
      (plan.unit ? ` data-lcs-unit="${plan.unit}"` : '') + extra + '>';
    if (face === 'judge') {
      const cards = plan.cards.map((c) => pairCardRhyme({ a: c.a, b: c.b, px: d.picPx, rhyme: c.rhyme, chipPx: d.chipPx, markPx: 24 }));
      const rows = Math.ceil(cards.length / 2);
      return {
        bodyHtml: stamp(` data-lcs-cards="${cards.length}" data-lcs-yes="${plan.cards.filter((c) => c.rhyme).length}" data-lcs-chip-px="${d.chipPx}"`) +
          cardGrid({ cards, cols: 2, rows, numbered: true }) + '</div>',
        meta: { mode: face, band: B, unit: plan.unit, cards: plan.cards.map((c) => ({ a: c.a.vocabKey, b: c.b.vocabKey, clsA: c.a.cls, clsB: c.b.cls, rhyme: c.rhyme })), answers: plan.cards.map((c) => (c.rhyme ? 'yes' : 'no')) },
      };
    }
    if (face === 'sort') {
      const bankHtml = rhymeBank({ items: plan.bankItems, iconPx: d.bankPx });
      const bins = rhymeBins({
        bins: plan.bins.map((b) => ({ cls: b.cls, anchor: b.head, n: d.perBin })),
        colW: BIN_COL_W, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, headTile: d.headTile, headPx: d.headPx,
      });
      return {
        bodyHtml: stamp(` data-lcs-bins="${plan.bins.length}" data-lcs-per-bin="${d.perBin}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" data-lcs-glyph-h="${d.glyphH}"`) +
          bankHtml + `<div style="height:14px;flex:0 0 auto"></div>` + bins + '</div>',
        meta: { mode: face, band: B, unit: plan.unit, bins: plan.bins.map((b) => ({ cls: b.cls, head: b.head.vocabKey, members: b.members.map((m) => m.vocabKey) })), bank: plan.bankItems.map((x) => x.vocabKey), answers: plan.bins.map((b) => b.members.map((m) => m.word)) },
      };
    }
    if (face === 'couplet') {
      const rows = plan.rows.map((r) => coupletCard({
        pic: r.cueFree ? null : r.answer, line1: r.line1, pre: r.pre, post: r.post, rhymeWith: r.rhymeWith,
        answer: { vocabKey: r.answer.vocabKey, word: r.answer.word, cls: r.cls },
        laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, fontPx: d.fontPx, tile: d.picTile, px: d.picPx, textW: LANE_INNER - d.picTile - 12,
      }));
      const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(0,1fr));gap:8px;min-height:0" data-lcs-couplet-grid="${rows.length}">${rows.join('')}</div>`;
      return {
        bodyHtml: stamp(` data-lcs-rows="${rows.length}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-font-px="${d.fontPx}" data-lcs-cue-free="${plan.rows.filter((r) => r.cueFree).length}" data-lcs-text-w="${LANE_INNER - d.picTile - 12}"`) + grid + '</div>',
        meta: { mode: face, band: B, unit: null, couplets: plan.rows.map((r) => r.id), answers: plan.rows.map((r) => r.answer.word) },
      };
    }
    if (face === 'string') {
      const bankHtml = stringBank({ words: plan.bankItems, wordPx: d.wordPx });
      const rows = plan.anchors.map((a) => stringLane({ anchor: a.anchor, n: d.per, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, tile: d.picTile, px: d.picPx, answers: a.answers.map((w) => w.word) }));
      const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(0,1fr));gap:10px;min-height:0" data-lcs-string-grid="${rows.length}">${rows.join('')}</div>`;
      return {
        bodyHtml: stamp(` data-lcs-anchors="${rows.length}" data-lcs-per="${d.per}" data-lcs-foils="${plan.foils.length}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-bank-size="${plan.bankItems.length}"`) +
          bankHtml + `<div style="height:14px;flex:0 0 auto"></div>` + grid + '</div>',
        meta: { mode: face, band: B, unit: plan.unit, anchors: plan.anchors.map((a) => ({ cls: a.cls, anchor: a.anchor.vocabKey, answers: a.answers.map((w) => w.vocabKey) })), foils: plan.foils.map((f) => f.vocabKey), bank: plan.bankItems.map((x) => x.word), answers: plan.anchors.map((a) => a.answers.map((w) => w.word)) },
      };
    }
    if (face === 'open') {
      const cards = plan.cards.map((c) => ownRhymeCard({ pic: c.anchor, word: c.anchor.word, vocabKey: c.anchor.vocabKey, cls: c.cls, wordPx: d.wordPx, px: d.picPx, lines: d.lines, laneW: OPEN_CARD_INNER, laneH: d.laneH, glyphH: d.glyphH }));
      return {
        bodyHtml: stamp(` data-lcs-cards="${cards.length}" data-lcs-lines="${d.lines}" data-lcs-lane-w="${OPEN_CARD_INNER}" data-lcs-lane-h="${d.laneH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-word-px="${d.wordPx}"`) +
          cardGrid({ cards, cols: 2, rows: Math.ceil(cards.length / 2), numbered: true }) + '</div>',
        meta: { mode: face, band: B, unit: plan.unit, cards: plan.cards.map((c) => ({ cls: c.cls, anchor: c.anchor.vocabKey, word: c.anchor.word })), answers: plan.cards.map((c) => c.examples) },
      };
    }
    throw new Error(`${WHO}: unknown face "${face}"`);
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-lcs-rhyming]');
      if (!root) return ['no rhyming root'];
      if (root.dataset.lcsMode) return verifyFace(root, root.dataset.lcsMode, lang, BW);
      const cfg = {
        rows: +root.dataset.lcsRows, choices: +root.dataset.lcsChoices, minIcon: +root.dataset.lcsMinIcon, laneW: +root.dataset.lcsLaneW,
        laneH: +root.dataset.lcsLaneH, starter: root.dataset.lcsStarter === '1', nearMiss: root.dataset.lcsNearMiss === '1', posMax: +root.dataset.lcsPosMax,
      };
      const cards = [...root.querySelectorAll('.ws-card')];
      if (cards.length !== cfg.rows) fails.push(`${cards.length} rows ≠ stamp ${cfg.rows}`);
      if (cfg.rows < 4 || cfg.rows > 12) fails.push(`${cfg.rows} rows outside 4..12`);
      const lower = (s) => String(s).toLocaleLowerCase(lang);
      const keysSeen = new Map();
      const words = new Set();
      const posCounts = new Array(cfg.choices).fill(0);
      cards.forEach((card, i) => {
        const tag = (m) => fails.push(`row ${i + 1}: ${m}`);
        const st = card.querySelector('.ws-card-stage[data-ws-content][data-lcs-anchor]');
        if (!st) { tag('no stamped stage'); return; }
        const anchor = st.dataset.lcsAnchor, cls = st.dataset.lcsClass;
        if (!anchor || !cls) tag('anchor / class stamp missing');
        if (keysSeen.has(anchor)) tag(`"${anchor}" already on the page (row ${keysSeen.get(anchor)})`); keysSeen.set(anchor, i + 1);
        if (st.dataset.lcsAnchorWord) words.add(lower(st.dataset.lcsAnchorWord));
        const rings = [...st.querySelectorAll('[data-lcs-choice]')];
        if (rings.length !== cfg.choices) tag(`${rings.length} rings ≠ ${cfg.choices}`);
        const sameClass = rings.filter((r) => r.dataset.lcsClass === cls);
        if (sameClass.length !== 1) tag(`${sameClass.length} rings of the anchor's class "${cls}" (two right answers / no right answer)`);
        rings.forEach((r, k) => {
          const key = r.dataset.lcsChoice, rc = r.dataset.lcsClass, rh = r.dataset.lcsRhyme, w = r.dataset.lcsWord;
          if (!key || !w) tag(`ring ${k + 1}: choice / word stamp missing`);
          if (rh !== '1' && rh !== '0') tag(`ring ${k + 1}: rhyme stamp "${rh}"`);
          if ((rc === cls) !== (rh === '1')) tag(`ring ${k + 1} "${key}": class ${rc === cls ? '===' : '!=='} the anchor's but rhyme="${rh}"`);
          if (key === anchor) tag(`ring ${k + 1} repeats the anchor "${anchor}"`);
          if (keysSeen.has(key)) tag(`"${key}" already on the page (row ${keysSeen.get(key)})`); keysSeen.set(key, i + 1);
          if (rh === '1') posCounts[k]++;
          if (rh === '1' && r.dataset.lcsFoil) tag(`ring ${k + 1}: the rhyme is stamped as a foil`);
          words.add(lower(w));
          const img = r.querySelector('img.ws-icon');
          if (!img) tag(`ring ${k + 1}: no picture`);
          else {
            if (!img.complete || img.naturalWidth === 0) tag(`ring ${k + 1}: picture broken`);
            if (img.getAttribute('alt')) tag(`ring ${k + 1}: picture carries alt text`);
            const dir = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
            if (BW.test(dir)) tag(`ring ${k + 1}: picture from a B&W directory "${dir}"`);
            const b = img.getBoundingClientRect();
            if (Math.min(b.width, b.height) < cfg.minIcon - 0.6) tag(`ring ${k + 1}: picture ${Math.round(Math.min(b.width, b.height))} px < floor ${cfg.minIcon}`);
          }
        });
        // the non-rhyming rings come from distinct classes ('' = a class-less foil, unique by construction)
        const others = rings.filter((r) => r.dataset.lcsRhyme === '0').map((r) => r.dataset.lcsClass);
        const named = others.filter((c) => c !== '');
        if (new Set(named).size !== named.length) tag(`two distractors share a class (${others.join(',')}) — they read as a pair`);
        const foils = rings.filter((r) => r.dataset.lcsFoil === '1');
        if (cfg.nearMiss ? foils.length !== 1 : foils.length !== 0) tag(`${foils.length} near-miss foils (nearMiss ${cfg.nearMiss ? 'on' : 'off'})`);
        // the anchor picture
        const aimg = st.querySelector('[data-lcs-anchor-tile] img.ws-icon');
        if (!aimg) tag('no anchor picture');
        else {
          if (!aimg.complete || aimg.naturalWidth === 0) tag('anchor picture broken');
          const dir = decodeURIComponent(aimg.src).split('/').slice(-2, -1)[0] || '';
          if (BW.test(dir)) tag(`anchor picture from a B&W directory "${dir}"`);
          const b = aimg.getBoundingClientRect();
          if (Math.min(b.width, b.height) < cfg.minIcon - 0.6) tag(`anchor picture ${Math.round(Math.min(b.width, b.height))} px < floor ${cfg.minIcon}`);
        }
        if (!st.querySelector('[data-lcs-rhyme-mark]')) tag('no sound mark');
        // one lane, empty (d1: exactly the starter glyph = the first glyph of the rhyming word)
        const lanes = st.querySelectorAll('[data-lcs-prim="writing-row"]');
        if (lanes.length !== 1) tag(`${lanes.length} writing rows`);
        else {
          const lane = lanes[0];
          const texts = [...lane.querySelectorAll('text, path')];
          const starters = texts.filter((t) => t.hasAttribute('data-lcs-starter'));
          if (texts.length !== starters.length) tag('the writing row is not empty');
          if (cfg.starter) {
            const partner = rings.find((r) => r.dataset.lcsRhyme === '1');
            const want = partner ? [...partner.dataset.lcsWord][0] : '';
            if (starters.length !== 1) tag(`${starters.length} starter glyphs (want 1)`);
            else if (starters[0].textContent !== want) tag(`starter "${starters[0].textContent}" ≠ the first glyph of "${partner && partner.dataset.lcsWord}"`);
            else if ([...starters[0].textContent].length !== 1) tag('starter is more than one glyph');
          } else if (starters.length) tag('a starter glyph on a no-starter page');
          const lr = lane.getBoundingClientRect();
          if (lr.width > cfg.laneW + 0.6) tag(`lane ${Math.round(lr.width)} px > ${cfg.laneW}`);
          if (+lane.getAttribute('height') !== cfg.laneH) tag(`lane ${lane.getAttribute('height')} px high ≠ ${cfg.laneH}`);
        }
        // everything inside the card's content box (.ws-card is overflow:hidden — a clipped row passes every lint)
        const cr = card.getBoundingClientRect();
        const inner = { left: cr.left + 14, right: cr.right - 14, top: cr.top + 14, bottom: cr.bottom - 14 };
        st.querySelectorAll('[data-lcs-slot], [data-lcs-choice], [data-lcs-anchor-tile], svg').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.left < inner.left - 0.6 || r.right > inner.right + 0.6 || r.top < inner.top - 0.6 || r.bottom > inner.bottom + 0.6) {
            tag(`<${el.tagName.toLowerCase()} ${el.dataset.lcsSlot || el.dataset.lcsChoice || ''}> outside the card box (${Math.round(r.left)}..${Math.round(r.right)} × ${Math.round(r.top)}..${Math.round(r.bottom)} vs ${Math.round(inner.left)}..${Math.round(inner.right)} × ${Math.round(inner.top)}..${Math.round(inner.bottom)})`);
          }
        });
        // the badge never under the anchor's ink
        const badge = card.querySelector('.ws-card-badge');
        const at = st.querySelector('[data-lcs-anchor-tile]');
        if (badge && at) {
          const b = badge.getBoundingClientRect(), a = at.getBoundingClientRect();
          if (a.left < b.right - 0.6 && a.top < b.bottom - 0.6) tag('anchor tile under the card badge');
        }
      });
      if (cards.length >= cfg.choices) {
        posCounts.forEach((n, k) => { if (n < 1 || n > cfg.posMax) fails.push(`rhyme position ${k + 1} used ${n} times (want 1..${cfg.posMax})`); });
      }
      // no text node on the page equals a stamped word (case-folded, whole word)
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const t = lower(node.textContent.trim());
        if (t && words.has(t)) fails.push(`the word "${t}" is printed on the page`);
      }
      return fails;

      /* ------------------------------------------------------------ the faces (design §3) */
      function verifyFace(root, mode, lang, BW) {
        const fails = [];
        const lower = (s) => String(s).toLocaleLowerCase(lang);
        const minIcon = +root.dataset.lcsMinIcon;
        const band = root.dataset.lcsBand;
        const glyphFloor = band === 'K' ? 40 : 26;
        const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
        const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
        const rect = (el) => el.getBoundingClientRect();
        const inside = (r, box, pad, tag, what) => {
          if (r.width === 0 || r.height === 0) return;
          if (r.left < box.left + pad - 0.6 || r.right > box.right - pad + 0.6 || r.top < box.top + pad - 0.6 || r.bottom > box.bottom - pad + 0.6) tag(`${what} outside its box (${Math.round(r.left)}..${Math.round(r.right)} × ${Math.round(r.top)}..${Math.round(r.bottom)} vs ${Math.round(box.left + pad)}..${Math.round(box.right - pad)} × ${Math.round(box.top + pad)}..${Math.round(box.bottom - pad)})`);
        };
        const picOk = (img, tag, what) => {
          if (!img) { tag(`${what}: no picture`); return; }
          if (!img.complete || img.naturalWidth === 0) tag(`${what}: picture broken`);
          if (img.getAttribute('alt')) tag(`${what}: picture carries alt text`);
          const dir = decodeURIComponent(img.src).split('/').slice(-2, -1)[0] || '';
          if (BW.test(dir)) tag(`${what}: picture from a B&W directory "${dir}"`);
          const b = rect(img);
          if (Math.min(b.width, b.height) < minIcon - 0.6) tag(`${what}: picture ${Math.round(Math.min(b.width, b.height))} px < floor ${minIcon}`);
        };
        const laneEmpty = (lane, tag, what, laneW, laneH) => {
          if (!lane) { tag(`${what}: no writing row`); return; }
          if (lane.querySelector('text, path')) tag(`${what}: the writing row is not empty`);
          const r = rect(lane);
          if (laneW && r.width > laneW + 0.6) tag(`${what}: lane ${Math.round(r.width)} px > ${laneW}`);
          if (laneH && +lane.getAttribute('height') !== laneH) tag(`${what}: lane ${lane.getAttribute('height')} px high ≠ ${laneH}`);
          if (r.bottom > foot + 0.6) tag(`${what}: lane reaches into the footer band`);
        };
        const textNodes = (el) => { const out = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (t) out.push(t); } return out; };
        const wordIn = (word, text) => new RegExp('(?<!\\p{L})' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u').test(text);
        const seen = new Map();
        const once = (key, where, tag) => { if (seen.has(key)) tag(`"${key}" already on the page (${seen.get(key)})`); seen.set(key, where); };
        if (root.dataset.lcsRows !== undefined && mode !== 'couplet') fails.push('a face root carries the base rows stamp');

        if (mode === 'judge') {
          const want = +root.dataset.lcsCards, wantYes = +root.dataset.lcsYes, chipPx = +root.dataset.lcsChipPx;
          const cards = [...root.querySelectorAll('.ws-card')];
          if (cards.length !== want) fails.push(`${cards.length} cards ≠ stamp ${want}`);
          if (want < 4 || want > 8) fails.push(`${want} cards outside K 4..8`);
          if (band !== 'K') fails.push(`judge band "${band}" is not K`);
          const verdicts = [];
          const words = new Set();
          cards.forEach((card, i) => {
            const tag = (m) => fails.push(`card ${i + 1}: ${m}`);
            const st = card.querySelector('.ws-card-stage[data-ws-content][data-lcs-pair]');
            if (!st) { tag('no stamped pair stage'); return; }
            const a = st.dataset.lcsA, b = st.dataset.lcsB, ca = st.dataset.lcsClassA, cb = st.dataset.lcsClassB, rh = st.dataset.lcsRhyme;
            if (!a || !b || !ca || !cb) tag('vocab / class stamps missing');
            if (a === b) tag('the two pictures are one word');
            if (rh !== '1' && rh !== '0') tag(`rhyme stamp "${rh}"`);
            if ((ca === cb) !== (rh === '1')) tag(`classes ${ca === cb ? '===' : '!=='} but rhyme="${rh}" (${a}/${b})`);
            once(a, 'card ' + (i + 1), tag); once(b, 'card ' + (i + 1), tag);
            words.add(lower(st.dataset.lcsWordA)); words.add(lower(st.dataset.lcsWordB));
            verdicts.push(rh === '1');
            const imgs = [...st.querySelectorAll('[data-lcs-slot="pair"] img.ws-icon')];
            if (imgs.length !== 2) tag(`${imgs.length} pictures ≠ 2`);
            imgs.forEach((img, k) => picOk(img, tag, 'picture ' + (k + 1)));
            if (!st.querySelector('[data-lcs-rhyme-mark]')) tag('no sound mark');
            const chips = [...st.querySelectorAll('[data-lcs-chip]')];
            const kinds = chips.map((c) => c.dataset.lcsChip).sort().join(',');
            if (kinds !== 'no,yes') tag(`chips [${kinds}] ≠ yes + no`);
            chips.forEach((c) => {
              if (c.textContent.trim()) tag(`chip "${c.dataset.lcsChip}" carries text "${c.textContent.trim()}"`);
              if (!c.querySelector('svg path')) tag(`chip "${c.dataset.lcsChip}" has no mark`);
              const r = rect(c);
              if (Math.min(r.width, r.height) < chipPx - 0.6) tag(`chip ${Math.round(Math.min(r.width, r.height))} px < ${chipPx}`);
              const stroke = (c.querySelector('svg path').getAttribute('stroke') || '').toUpperCase();
              if (stroke !== '#146B5E') tag(`chip "${c.dataset.lcsChip}" mark is ${stroke}, not teal (a coloured verdict)`);
            });
            const cr = rect(card);
            st.querySelectorAll('[data-lcs-slot], [data-lcs-chip]').forEach((el) => inside(rect(el), cr, 14, tag, '<' + (el.dataset.lcsSlot || el.dataset.lcsChip) + '>'));
            if (cr.bottom > foot + 0.6) tag('card reaches into the footer band');
            const badge = card.querySelector('.ws-card-badge');
            const pair = st.querySelector('[data-lcs-slot="pair"]');
            if (badge && pair) { const bb = rect(badge), pr = rect(pair); if (pr.left < bb.right - 0.6 && pr.top < bb.bottom - 0.6) tag('pictures under the card badge'); }
          });
          const yes = verdicts.filter(Boolean).length;
          if (yes !== wantYes) fails.push(`${yes} rhyming cards ≠ stamp ${wantYes}`);
          if (cards.length && (yes < 2 || cards.length - yes < 2)) fails.push(`${yes} yes / ${cards.length - yes} no — one verdict is (nearly) constant`);
          const cols = [new Set(), new Set()];
          verdicts.forEach((v, i) => cols[i % 2].add(v));
          if (!(cols[0].has(true) && cols[1].has(true))) fails.push('the rhyming pairs sit in one column');
          let run = 1;
          for (let i = 1; i < verdicts.length; i++) { run = verdicts[i] === verdicts[i - 1] ? run + 1 : 1; if (run >= 4) { fails.push('four equal verdicts in a row'); break; } }
          for (const t of textNodes(root)) if (words.has(lower(t))) fails.push(`the word "${t}" is printed on the page`);
          return fails;
        }

        if (mode === 'sort') {
          const wantBins = +root.dataset.lcsBins, per = +root.dataset.lcsPerBin, laneW = +root.dataset.lcsLaneW, laneH = +root.dataset.lcsLaneH, glyphH = +root.dataset.lcsGlyphH;
          if (glyphH < glyphFloor) fails.push(`glyphH ${glyphH} < the ${band} floor ${glyphFloor}`);
          const bank = root.querySelector('[data-lcs-numbered-bank]');
          const items = bank ? [...bank.querySelectorAll('[data-lcs-bank-index]')] : [];
          const bins = [...root.querySelectorAll('.ws-lane[data-ws-content][data-lcs-bin]')];
          if (bins.length !== wantBins) fails.push(`${bins.length} bins ≠ stamp ${wantBins}`);
          if (!bank) fails.push('no picture bank');
          if (items.length !== wantBins * per) fails.push(`${items.length} bank pictures ≠ ${wantBins} × ${per}`);
          const binCls = bins.map((b) => b.dataset.lcsClass);
          if (new Set(binCls).size !== binCls.length) fails.push(`two bins share a class (${binCls.join(',')})`);
          const words = new Set();
          const heads = new Set();
          bins.forEach((bin, i) => {
            const tag = (m) => fails.push(`bin ${i + 1}: ${m}`);
            if (!bin.dataset.lcsClass || !bin.dataset.lcsAnchor) tag('class / anchor stamp missing');
            once(bin.dataset.lcsAnchor, 'bin ' + (i + 1), tag); heads.add(bin.dataset.lcsAnchor);
            words.add(lower(bin.dataset.lcsAnchorWord || ''));
            picOk(bin.querySelector('[data-lcs-slot="head"] img.ws-icon'), tag, 'head');
            const lanes = [...bin.querySelectorAll('[data-lcs-prim="writing-row"]')];
            if (lanes.length !== per) tag(`${lanes.length} writing rows ≠ ${per}`);
            lanes.forEach((l, k) => laneEmpty(l, tag, 'lane ' + (k + 1), laneW, laneH));
            const br = rect(bin);
            bin.querySelectorAll('[data-lcs-slot="head"], [data-lcs-prim="writing-row"]').forEach((el) => inside(rect(el), br, 4, tag, '<' + (el.dataset.lcsSlot || 'lane') + '>'));
            if (br.bottom > foot + 0.6) tag('bin reaches into the footer band');
            if (br.left < body.left - 0.6 || br.right > body.right + 0.6) tag('bin outside the body column');
            const mine = items.filter((it) => it.dataset.lcsClass === bin.dataset.lcsClass);
            if (mine.length !== per) tag(`${mine.length} bank pictures of class "${bin.dataset.lcsClass}" ≠ ${per}`);
          });
          items.forEach((it, i) => {
            const tag = (m) => fails.push(`bank ${i + 1}: ${m}`);
            if (+it.dataset.lcsBankIndex !== i + 1) tag(`index ${it.dataset.lcsBankIndex} ≠ ${i + 1}`);
            if (!it.dataset.lcsVocab || !it.dataset.lcsClass || !it.dataset.lcsWord) tag('vocab / class / word stamp missing');
            if (!binCls.includes(it.dataset.lcsClass)) tag(`class "${it.dataset.lcsClass}" is no bin's class`);
            if (heads.has(it.dataset.lcsVocab)) tag(`"${it.dataset.lcsVocab}" is also a bin head`);
            once(it.dataset.lcsVocab, 'bank ' + (i + 1), tag);
            words.add(lower(it.dataset.lcsWord));
            picOk(it.querySelector('img.ws-icon'), tag, 'picture');
            if (i > 0 && items[i - 1].dataset.lcsClass === it.dataset.lcsClass) tag(`adjacent to a picture of the same class "${it.dataset.lcsClass}"`);
            inside(rect(it), rect(bank), 2, tag, 'bank item');
          });
          for (const t of textNodes(root)) if (words.has(lower(t))) fails.push(`the word "${t}" is printed on the page`);
          return fails;
        }

        if (mode === 'couplet') {
          const want = +root.dataset.lcsRows, laneW = +root.dataset.lcsLaneW, laneH = +root.dataset.lcsLaneH, glyphH = +root.dataset.lcsGlyphH, fontPx = +root.dataset.lcsFontPx, textW = +root.dataset.lcsTextW, cueFree = +root.dataset.lcsCueFree;
          if (glyphH < 26) fails.push(`glyphH ${glyphH} < 26`);
          if (fontPx < 16) fails.push(`verse font ${fontPx} < 16`);
          const rows = [...root.querySelectorAll('.ws-lane[data-ws-content][data-lcs-couplet]')];
          if (rows.length !== want) fails.push(`${rows.length} couplets ≠ stamp ${want}`);
          if (rows.filter((r) => r.dataset.lcsCueFree).length !== cueFree) fails.push('cue-free count ≠ stamp');
          const answers = new Set(), partners = new Set();
          rows.forEach((row, i) => {
            const tag = (m) => fails.push(`couplet ${i + 1}: ${m}`);
            const ans = row.dataset.lcsAnswerWord, key = row.dataset.lcsAnswer, rw = row.dataset.lcsRhymeWith;
            if (!ans || !key || !row.dataset.lcsClass || !rw) tag('answer / class / rhyme-with stamp missing');
            if (answers.has(key)) tag(`answer "${key}" repeats`); answers.add(key);
            if (partners.has(lower(rw))) tag(`partner "${rw}" repeats`); partners.add(lower(rw));
            const v1 = row.querySelector('[data-lcs-verse="1"]'), v2 = row.querySelector('[data-lcs-verse="2"]');
            if (!v1 || !v2) { tag('two verse lines required'); return; }
            const t1 = lower(v1.textContent.trim()), t2 = lower(v2.textContent.trim());
            if (!t1) tag('line 1 is empty');
            if (!wordIn(lower(rw), t1)) tag(`line 1 "${t1}" does not end in / carry the partner "${rw}"`);
            if (wordIn(lower(ans), t1) || wordIn(lower(ans), t2)) tag(`the answer "${ans}" is printed in the verse`);
            if (t1.includes('___') || t2.includes('___')) tag('a literal ___ is printed (the blank is a writing row)');
            const lanes = [...row.querySelectorAll('[data-lcs-prim="writing-row"]')];
            if (lanes.length !== 1) tag(`${lanes.length} writing rows ≠ 1`);
            lanes.forEach((l) => laneEmpty(l, tag, 'lane', laneW, laneH));
            if (lanes[0] && !v2.contains(lanes[0])) tag('the writing row is not inside line 2');
            [v1, v2].forEach((v, k) => {
              const spans = [...v.querySelectorAll('[data-lcs-verse-text]')];
              spans.forEach((sp) => { const fs = parseFloat(getComputedStyle(sp).fontSize); if (fs < fontPx - 0.6) tag(`line ${k + 1} text ${fs} px < ${fontPx}`); });
              const col = rect(row.querySelector('[data-lcs-slot="text"]'));
              const ink = spans.length ? Math.max(...spans.map((s) => rect(s).right)) - Math.min(...spans.map((s) => rect(s).left)) : 0;
              const inkRight = spans.length ? Math.max(...spans.map((s) => rect(s).right)) : 0;
              if (k === 1 && lanes[0]) { const lr = rect(lanes[0]); if (lr.right > col.right + 0.6) tag('line 2 lane runs past the text column'); }
              if (inkRight > col.right + 0.6) tag(`line ${k + 1} spans ${Math.round(ink)} px of ink past the ${Math.round(col.width)} px column`);
              if (inkRight > body.right + 0.6) tag(`line ${k + 1} runs past the body column`);
              if (spans.length && Math.max(...spans.map((s) => rect(s).height - parseFloat(getComputedStyle(s).paddingBottom))) > fontPx + 6 + 4) tag(`line ${k + 1} wraps`);
            });
            // the line-2 text sits on the lane's base line (the child continues the sentence on the same line)
            if (lanes[0]) {
              const lr = rect(lanes[0]);
              const base = lr.top + Math.max(...[...lanes[0].querySelectorAll('line')].map((l) => +l.getAttribute('y1')));
              [...v2.querySelectorAll('[data-lcs-verse-text]')].forEach((sp) => {
                const probe = document.createElement('span'); probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
                sp.appendChild(probe); const bl = rect(probe).top; probe.remove();
                if (Math.abs(bl - base) > 1.5) tag(`line 2 text baseline ${Math.round(bl)} is ${Math.round(bl - base)} px off the lane's base line ${Math.round(base)}`);
              });
            }
            if (!row.dataset.lcsCueFree) picOk(row.querySelector('[data-lcs-slot="cue"] img.ws-icon'), tag, 'cue');
            else if (row.querySelector('[data-lcs-slot="cue"] img')) tag('a cue-free row carries a picture');
            const rr = rect(row);
            row.querySelectorAll('[data-lcs-slot], [data-lcs-verse]').forEach((el) => inside(rect(el), rr, 4, tag, '<' + (el.dataset.lcsSlot || 'verse') + '>'));
            if (rr.bottom > foot + 0.6) tag('row reaches into the footer band');
            if (rr.left < body.left - 0.6 || rr.right > body.right + 0.6) tag('row outside the body column');
          });
          for (const row of rows) for (const t of textNodes(root)) if (wordIn(lower(row.dataset.lcsAnswerWord), lower(t))) { fails.push(`the answer "${row.dataset.lcsAnswerWord}" is printed on the page`); break; }
          return fails;
        }

        if (mode === 'string') {
          const wantA = +root.dataset.lcsAnchors, per = +root.dataset.lcsPer, wantF = +root.dataset.lcsFoils, laneW = +root.dataset.lcsLaneW, laneH = +root.dataset.lcsLaneH, glyphH = +root.dataset.lcsGlyphH, bankSize = +root.dataset.lcsBankSize;
          if (glyphH < glyphFloor) fails.push(`glyphH ${glyphH} < the ${band} floor ${glyphFloor}`);
          const bank = root.querySelector('[data-lcs-bank-banner]');
          const pills = bank ? [...bank.querySelectorAll('[data-lcs-bank-word]')] : [];
          const rows = [...root.querySelectorAll('.ws-lane[data-ws-content][data-lcs-string]')];
          if (!bank) fails.push('no word bank');
          if (rows.length !== wantA) fails.push(`${rows.length} anchors ≠ stamp ${wantA}`);
          if (pills.length !== bankSize || bankSize !== wantA * per + wantF) fails.push(`bank of ${pills.length} ≠ ${wantA} × ${per} + ${wantF}`);
          if (wantF < 2) fails.push('fewer than 2 foils — nothing to reject');
          const bankWords = pills.map((p) => lower(p.dataset.lcsBankWord));
          if (new Set(bankWords).size !== bankWords.length) fails.push('a bank word twice');
          pills.forEach((p, i) => {
            const tag = (m) => fails.push(`bank ${i + 1}: ${m}`);
            if (p.textContent.trim() !== p.dataset.lcsBankWord) tag(`prints "${p.textContent.trim()}" ≠ stamp "${p.dataset.lcsBankWord}"`);
            if (!p.dataset.lcsBank || !p.dataset.lcsClass || !['answer', 'foil'].includes(p.dataset.lcsRole)) tag('vocab / class / role stamp missing');
            const fs = parseFloat(getComputedStyle(p).fontSize);
            if (fs < 16) tag(`pill text ${fs} px < 16`);
            inside(rect(p), rect(bank), 2, tag, 'pill');
          });
          const tops = [...new Set(pills.map((p) => Math.round(rect(p).top)))];
          if (tops.length > 2) fails.push(`the bank wraps to ${tops.length} rows (max 2)`);
          const anchorCls = rows.map((r) => r.dataset.lcsClass);
          if (new Set(anchorCls).size !== anchorCls.length) fails.push(`two anchors share a class (${anchorCls.join(',')})`);
          const claimed = new Set();
          rows.forEach((row, i) => {
            const tag = (m) => fails.push(`anchor ${i + 1}: ${m}`);
            const key = row.dataset.lcsAnchor, cls = row.dataset.lcsClass, aw = row.dataset.lcsAnchorWord;
            if (!key || !cls || !aw) tag('anchor / class / word stamp missing');
            once(key, 'anchor ' + (i + 1), tag);
            const ans = (row.dataset.lcsAnswers || '').split('|').filter(Boolean);
            if (ans.length !== per) tag(`${ans.length} answers ≠ ${per}`);
            const idx = ans.map((w) => pills.findIndex((p) => p.dataset.lcsBankWord === w));
            ans.forEach((w, k) => {
              if (idx[k] < 0) { tag(`answer "${w}" is not in the bank`); return; }
              const p = pills[idx[k]];
              if (p.dataset.lcsClass !== cls) tag(`bank "${w}" class "${p.dataset.lcsClass}" ≠ the anchor's "${cls}"`);
              if (p.dataset.lcsRole !== 'answer') tag(`bank "${w}" is stamped "${p.dataset.lcsRole}"`);
              if (p.dataset.lcsBank === key) tag(`the anchor's own word "${w}" is in the bank`);
              claimed.add(idx[k]);
            });
            for (let a = 0; a < idx.length; a++) for (let b = a + 1; b < idx.length; b++) if (idx[a] >= 0 && idx[b] >= 0 && Math.abs(idx[a] - idx[b]) === 1) tag(`its answers "${ans[a]}" and "${ans[b]}" are adjacent in the bank`);
            if (bankWords.includes(lower(aw))) tag(`the anchor word "${aw}" is printed in the bank`);
            picOk(row.querySelector('[data-lcs-slot="anchor"] img.ws-icon'), tag, 'anchor');
            const lanes = [...row.querySelectorAll('[data-lcs-prim="writing-row"]')];
            if (lanes.length !== per) tag(`${lanes.length} writing rows ≠ ${per}`);
            lanes.forEach((l, k) => laneEmpty(l, tag, 'lane ' + (k + 1), laneW, laneH));
            const rr = rect(row);
            row.querySelectorAll('[data-lcs-slot], [data-lcs-prim="writing-row"]').forEach((el) => inside(rect(el), rr, 4, tag, '<' + (el.dataset.lcsSlot || 'lane') + '>'));
            if (rr.bottom > foot + 0.6) tag('row reaches into the footer band');
            if (rr.left < body.left - 0.6 || rr.right > body.right + 0.6) tag('row outside the body column');
          });
          pills.forEach((p, i) => {
            if (p.dataset.lcsRole === 'foil') {
              if (anchorCls.includes(p.dataset.lcsClass)) fails.push(`bank ${i + 1}: foil "${p.dataset.lcsBankWord}" is from an anchor's class "${p.dataset.lcsClass}" — it rhymes`);
              if (claimed.has(i)) fails.push(`bank ${i + 1}: "${p.dataset.lcsBankWord}" is both a foil and an answer`);
            } else if (!claimed.has(i)) fails.push(`bank ${i + 1}: "${p.dataset.lcsBankWord}" is stamped answer but no anchor claims it`);
          });
          const anchorWords = new Set(rows.map((r) => lower(r.dataset.lcsAnchorWord)));
          for (const t of textNodes(root)) { const lt = lower(t); if (anchorWords.has(lt)) fails.push(`the anchor word "${t}" is printed on the page`); else if (!/^\d+$/.test(lt) && !bankWords.includes(lt)) fails.push(`stray text "${t}" (not a bank word)`); }
          return fails;
        }

        if (mode === 'open') {
          const want = +root.dataset.lcsCards, lines = +root.dataset.lcsLines, laneW = +root.dataset.lcsLaneW, laneH = +root.dataset.lcsLaneH, glyphH = +root.dataset.lcsGlyphH, wordPx = +root.dataset.lcsWordPx;
          if (glyphH < 26) fails.push(`glyphH ${glyphH} < 26`);
          const cards = [...root.querySelectorAll('.ws-card')];
          if (cards.length !== want) fails.push(`${cards.length} cards ≠ stamp ${want}`);
          if (want < 4 || want > 12) fails.push(`${want} cards outside 4..12`);
          const clsSeen = new Set();
          cards.forEach((card, i) => {
            const tag = (m) => fails.push(`card ${i + 1}: ${m}`);
            const st = card.querySelector('.ws-card-stage[data-ws-content][data-lcs-open]');
            if (!st) { tag('no stamped stage'); return; }
            const key = st.dataset.lcsAnchor, cls = st.dataset.lcsClass, word = st.dataset.lcsWord;
            if (!key || !cls || !word) tag('anchor / class / word stamp missing');
            once(key, 'card ' + (i + 1), tag);
            if (clsSeen.has(cls)) tag(`class "${cls}" already on the page`); clsSeen.add(cls);
            picOk(st.querySelector('[data-lcs-slot="head"] img.ws-icon'), tag, 'picture');
            const print = st.querySelector('[data-lcs-word-print]');
            if (!print) tag('the word is not printed');
            else {
              if (print.textContent.trim() !== word) tag(`prints "${print.textContent.trim()}" ≠ stamp "${word}"`);
              const fs = parseFloat(getComputedStyle(print).fontSize);
              if (fs < wordPx - 0.6) tag(`word ${fs} px < ${wordPx}`);
              if (rect(print).height > wordPx + 4 + 6) tag('the word wraps');
            }
            const texts = textNodes(st);
            if (texts.length !== 1 || texts[0] !== word) tag(`card text [${texts.join(' | ')}] ≠ the one printed word`);
            const lanes = [...st.querySelectorAll('[data-lcs-prim="writing-row"]')];
            if (lanes.length !== lines) tag(`${lanes.length} rulings ≠ ${lines}`);
            lanes.forEach((l, k) => laneEmpty(l, tag, 'ruling ' + (k + 1), laneW, laneH));
            const cr = rect(card);
            st.querySelectorAll('[data-lcs-slot], [data-lcs-prim="writing-row"]').forEach((el) => inside(rect(el), cr, 14, tag, '<' + (el.dataset.lcsSlot || 'ruling') + '>'));
            if (cr.bottom > foot + 0.6) tag('card reaches into the footer band');
            const badge = card.querySelector('.ws-card-badge'), head = st.querySelector('[data-lcs-slot="head"] img');
            if (badge && head) { const bb = rect(badge), hr = rect(head); if (hr.left < bb.right - 0.6 && hr.top < bb.bottom - 0.6) tag('picture under the card badge'); }
          });
          return fails;
        }
        return ['unknown face mode "' + mode + '"'];
      }
    });
  },
};
