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
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { rhymeRow } = require('../../templates/components-b3.js');
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

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-lcs-rhyming]');
      if (!root) return ['no rhyming root'];
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
    });
  },
};
