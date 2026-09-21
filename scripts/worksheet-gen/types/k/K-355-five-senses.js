/**
 * K-355 — Five Senses: Match the Picture to the Sense (nt10-D; family key
 * `five-senses`; K; science; readiness — no CCSS code). Design:
 * docs/worksheet-gen/b4-designs/K-355-five-senses.md §2/§5 under
 * _BUILD-BRIEF.md + the README cross-type rulings; every ruling in
 * _work/K-355-critic.md.
 *
 * Two calm columns. Left, `pairs` objects with `pairs` DIFFERENT primary
 * senses (a drum, a rose, a rainbow, a lemon, a feather); right, the organ
 * pictures `body parts/{eye, ear, nose, tongue, hand}` deranged so nothing
 * sits straight across. The child draws one line per object to the body part
 * that senses it; every organ is used exactly once. No words on the body:
 * nothing is printed but the chrome (d3 alone prints the sense VERB under
 * each organ — a G1 register, unpublished).
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the items are curated
 * cross-theme `(theme, noun)` refs from the GLOBAL concept bank
 * data/science/five-senses.json (45 = 38 strong + 7 signed, every picture
 * OPENED), resolved by `fileUri`; the fan lever is the seed. No `unitAxis`.
 * The locale bank data/b4/five-senses.js (via lib/b4-common.js `bank()`)
 * carries ONLY the 10 literals a locale prints (5 verbs + 5 starters), its
 * `signedOk` admissions, the optional `organOf.taste = 'mouth'` override and
 * the strings; an unauthored locale REFUSES (never falls back to en).
 *
 * Boundary (load-bearing): object -> PRIMARY SENSE with the five FIXED organ
 * pictures as the constant answer key (`ORGAN_OF`, never a word). NOT K-211
 * hot-and-cold, NOT G1-207 food-groups, NOT K-207 clothes (their items are
 * fenced OUT of the bank at validate time, never read here), NOT K-344 /
 * K-354 (a body-part NOUN is never printed on this type), NOT K-213 pairs.
 *
 * Why not `makeSciencePairMatch.build()` (measured, critic #1): it sizes from
 * a fixed 720 and OVERFLOWS the 677 fi 4-line-title stack (body scrolls to
 * 720), its 200 px items leave a 143 px line zone, and its pairs would need
 * a hook in a shared factory (never edited). The base is its own component
 * `senseMatch` on the same `.ws-match` classes, budgeted at 722 AND 677:
 * 5 x 122 + 4 x 12 + 12 = 670 <= 677 <= 722 (slack -> space-around).
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on
 * the level index:
 *   pairs        senses sampled of the 5 (d1 = 4, d2 = 5 = all; K items [4, 8])
 *   itemH        `.ws-match-item` height (width fixed 170: the line zone is
 *                675 - 80 - 340 - 2 x 26 = 203 px, the factory's 143 widened)
 *   iconPx       the picture size (K floor 56; <= itemH - 26)
 *   pool         'strong' | 'strong+signed' (signed = this locale's signedOk)
 *   maxPerSense  objects of one sense on the page (1 here by construction;
 *                asserted anyway — the faces generalise it to 2)
 *   organWords   d3: the verb under the organ (Baloo 2 700 18 teal, one line;
 *                76 + 6 + 24 = 106 <= 118 inner)
 * Refusal (throw, never a filler): an unauthored locale, an unknown sense /
 * organ, a pool below one admitted item after the family fence, a stack over
 * 677, an organWords config without verbs, an organOf override other than
 * `{taste:'mouth'}`.
 *
 * PHASE 2 (the faces) ride ONE additive `layout` knob (design §3; the K-354
 * sibling's shape): `d.layout` undefined = this base path, byte-identical;
 * 'sort' | 'which' | 'odd' | 'label' | 'write' dispatch to `_buildFace`
 * (Phase 2, built 2026-09-21: `_buildSort / _buildWhich / _buildOdd /
 * _buildLabel / _buildWrite`, verified by `_verifyFace`; rows in
 * tools/b4var-rows/five-senses.js, record _work/K-355-faces.md).
 * `coordinate.mode` on the landing side is the face's mode string (base = 'base').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const C4 = require('../../templates/components-b4.js');
const C2 = require('../../templates/components-b2.js');   // wordBank (the F4 verb bank)
const tokens = require('../../primitives/_tokens.js');
const GLOBAL = require('../../data/science/five-senses.json');

const BANK = 'five-senses';
const SENSES = ['hear', 'see', 'smell', 'taste', 'touch'];
const ORGAN_OF = { hear: 'ear', see: 'eye', smell: 'nose', taste: 'tongue', touch: 'hand' };
const ORGAN_THEME = 'body parts';
const POOLS = ['strong', 'strong+signed'];
const FACES = ['sort', 'which', 'odd', 'label', 'write'];
const STACK_CEILING = 677;     // the fi four-line-title body (README ruling)
const G1_MIN = tokens.density.G1.minElement;   // 44: every face is a G1 id (b4var-id-allocation)
const TRIES = 400;

module.exports = {
  id: 'K-355',
  slug: 'five-senses',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'five-senses',
  themeAxis: { applicable: false },
  difficulty: {
    1: { pairs: 4, itemH: 140, iconPx: 100, pool: 'strong', maxPerSense: 1, organWords: false },
    2: { pairs: 5, itemH: 122, iconPx: 92, pool: 'strong', maxPerSense: 1, organWords: false },
    3: { pairs: 5, itemH: 122, iconPx: 76, pool: 'strong+signed', maxPerSense: 1, organWords: true },
  },
  i18n: {
    en: {
      title: 'Five Senses',
      instruction: 'Draw a line from each picture to the body part you use for it.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith({ global: GLOBAL, block: loadBank(BANK, loc) }, { difficulty, locale: loc }, ctx);
  },

  /* ------------------------------------------------------------ bank helpers (the gate's node cross-checks read these too) */
  /** The verb literal of a sense for a locale block; a missing literal THROWS (never en). */
  _verb(block, loc, sense) {
    const v = block && block.verbs && block.verbs[sense];
    if (typeof v !== 'string' || !v.trim()) throw new Error(`K-355 ${loc}: no verb for ${sense} (refuse)`);
    return v;
  },
  /** The F5 starter literal of a sense; a missing literal THROWS. */
  _starter(block, loc, sense) {
    const s = block && block.starters && block.starters[sense];
    if (typeof s !== 'string' || !s.trim()) throw new Error(`K-355 ${loc}: no starter for ${sense} (refuse)`);
    return s;
  },
  /** The organ of a sense after the locale's override (`{taste:'mouth'}` is the only one allowed). */
  _organOf(block, loc, sense) {
    if (!SENSES.includes(sense)) throw new Error(`K-355: unknown sense "${sense}"`);
    const ov = (block && block.organOf) || {};
    for (const [k, v] of Object.entries(ov)) {
      if (k !== 'taste' || v !== 'mouth') throw new Error(`K-355 ${loc}: organOf override ${k}:${v} — only {taste:'mouth'} is allowed (refuse)`);
    }
    return ov[sense] || ORGAN_OF[sense];
  },
  /** The family index of a noun (null when it belongs to none). */
  _familyOf(global, noun) {
    const fams = global.families || [];
    const i = fams.findIndex((f) => f.includes(noun));
    return i >= 0 ? i : null;
  },
  /** Items of one sense admitted by the pool: strong + (strong+signed) this locale's signedOk. */
  _itemsFor(global, block, sense, pool, loc) {
    if (!POOLS.includes(pool)) throw new Error(`K-355: pool "${pool}" is not one of ${POOLS.join(' | ')}`);
    const signedOk = new Set(Array.isArray(block && block.signedOk) ? block.signedOk : []);
    return (global.items || []).filter((it) => it.sense === sense &&
      (it.confidence === 'strong' || (pool === 'strong+signed' && it.confidence === 'signed' && signedOk.has(it.noun))));
  },

  /** The whole build over an INJECTED bank {global, block} (the gate's poison seam). */
  _buildWith(bankData, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-355: no difficulty ' + difficulty);
    const loc = (locale || 'en').slice(0, 2);
    if (d.layout) return this._buildFace(bankData, d, loc, ctx);      // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const { global, block } = bankData;
    if (!global || !Array.isArray(global.senses) || global.senses.join() !== SENSES.join()) throw new Error('K-355: the global bank must list the five senses in order');
    if (!block) throw new Error(`K-355 ${loc}: no locale block (refuse)`);
    // guards on the RESOLVED config
    if (!(d.pairs >= 4 && d.pairs <= 5)) throw new Error(`K-355: pairs ${d.pairs} outside 4..5 (five senses; K items [4, 8])`);
    if (!(d.iconPx >= 56)) throw new Error(`K-355: iconPx ${d.iconPx} < the K floor 56`);
    if (!(d.iconPx <= d.itemH - 26)) throw new Error(`K-355: iconPx ${d.iconPx} > itemH ${d.itemH} - 26`);
    const stack = d.pairs * d.itemH + (d.pairs - 1) * 12 + 12;
    if (stack > STACK_CEILING) throw new Error(`K-355: stack ${stack} > the ${STACK_CEILING} fi budget`);
    if (!(d.maxPerSense >= 1)) throw new Error('K-355: maxPerSense < 1');
    if (!POOLS.includes(d.pool)) throw new Error(`K-355: pool "${d.pool}"`);
    const organWords = d.organWords ? Object.fromEntries(SENSES.map((s) => [s, this._verb(block, loc, s)])) : null;

    // composer: `pairs` senses of the five, one admitted item each under the family fence; rows shuffled; right column deranged
    const senses = rng.sample(SENSES, d.pairs);
    const usedFamilies = new Set();
    const usedNouns = new Set();
    const perSense = {};
    const pairs = [];
    for (const s of senses) {
      const pool = this._itemsFor(global, block, s, d.pool, loc)
        .filter((it) => !usedNouns.has(it.noun))
        .filter((it) => { const f = this._familyOf(global, it.noun); return f === null || !usedFamilies.has(f); });
      if (!pool.length) throw new Error(`K-355 ${loc} ${s}: no admitted item left after the family fence (pool ${d.pool}; refuse)`);
      if ((perSense[s] || 0) + 1 > d.maxPerSense) throw new Error(`K-355: more than maxPerSense ${d.maxPerSense} items of ${s}`);
      const it = rng.pick(pool);
      usedNouns.add(it.noun);
      const f = this._familyOf(global, it.noun);
      if (f !== null) usedFamilies.add(f);
      perSense[s] = (perSense[s] || 0) + 1;
      const organ = this._organOf(block, loc, s);
      pairs.push({
        left: { theme: it.theme, noun: it.noun, sense: s, src: fileUri(it.theme, it.noun) },
        right: { organ, sense: s, src: fileUri(ORGAN_THEME, organ) },
      });
    }
    const rows = rng.shuffle(pairs);
    let order = null;
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(rows.map((_, i) => i));
      if (rows.length < 2 || !o.some((v, i) => v === i)) { order = o; break; }
    }
    if (!order) throw new Error('K-355: no derangement of the organ column in ' + TRIES + ' tries (refuse)');

    const bodyHtml = C4.senseMatch({
      pairs: rows, order, itemW: 170, itemH: d.itemH, iconPx: d.iconPx, organWords,
      stamps: { pool: d.pool, 'max-per-sense': d.maxPerSense, 'item-h': d.itemH },
    });
    return {
      bodyHtml,
      meta: {
        pairs: rows.map((p) => p.left.theme + '/' + p.left.noun + '→' + p.right.organ),
        senses: rows.map((p) => p.left.sense),
        organs: order.map((i) => rows[i].right.organ),
        order, pool: d.pool, organWords: !!organWords,
      },
    };
  },

  /* ------------------------------------------------------------ Phase 2 faces (design §3; ONE additive `layout` knob) */
  /**
   * `d.layout` dispatches here; every guard keys on the RESOLVED config (never
   * the level index — PR11). Each face changes what the child DOES:
   *   sort   ten pictures into five verb-labelled bins (2 per sense), lines
   *   which  one picture, the five organ chips in a FIXED order, circle one
   *   odd    four pictures, three share a sense, cross out the intruder
   *   label  copy the sense VERB from a bank beside the organ that does it
   *   write  open-ended: a starter on the first ruling row of each organ lane
   * Page rule on every face: `maxPerSense` objects of one sense (default 2)
   * and never two of one visual family; a pool that cannot fill REFUSES
   * (throw), never a filler.
   */
  _buildFace(bankData, d, loc, ctx) {
    if (!FACES.includes(d.layout)) throw new Error(`K-355: unknown layout "${d.layout}"`);
    const { global, block } = bankData;
    if (!global || !Array.isArray(global.senses) || global.senses.join() !== SENSES.join()) throw new Error('K-355: the global bank must list the five senses in order');
    if (!block) throw new Error(`K-355 ${loc}: no locale block (refuse)`);
    if (!ctx || !ctx.rng) throw new Error('K-355: no rng in ctx');
    if (!POOLS.includes(d.pool)) throw new Error(`K-355: pool "${d.pool}" is not one of ${POOLS.join(' | ')}`);
    if (!(d.maxPerSense >= 1)) throw new Error('K-355: maxPerSense < 1 (the guard needs the resolved config, never the level index)');
    const fn = { sort: '_buildSort', which: '_buildWhich', odd: '_buildOdd', label: '_buildLabel', write: '_buildWrite' }[d.layout];
    return this[fn](global, block, d, loc, ctx.rng);
  },

  /** Page-wide sampling state: nouns + families used so far; `maxPerSense` counted by the caller. */
  _newState() { return { nouns: new Set(), families: new Set() }; },
  /** `n` admitted items of one sense under the family fence + no-noun-twice; fewer than `n` REFUSES. */
  _sampleSense(global, block, sense, n, pool, loc, rng, state, what) {
    const cands = rng.shuffle(this._itemsFor(global, block, sense, pool, loc).filter((it) => !state.nouns.has(it.noun)));
    const out = [];
    for (const it of cands) {
      if (out.length === n) break;
      const f = this._familyOf(global, it.noun);
      if (f !== null && state.families.has(f)) continue;
      out.push(it);
      state.nouns.add(it.noun);
      if (f !== null) state.families.add(f);
    }
    if (out.length < n) throw new Error(`K-355 ${loc} ${what || sense}: ${out.length} admitted ${sense} items < ${n} after the family fence (pool ${pool}; refuse)`);
    return out.map((it) => ({ theme: it.theme, noun: it.noun, sense, src: fileUri(it.theme, it.noun) }));
  },
  _organSrc(block, loc, sense) { const o = this._organOf(block, loc, sense); return { organ: o, src: fileUri(ORGAN_THEME, o) }; },

  /* ---------------- F1 sort ---------------- */
  _buildSort(global, block, d, loc, rng) {
    if (!(d.perBin >= 1 && d.perBin <= 3)) throw new Error(`K-355 sort: perBin ${d.perBin} outside 1..3`);
    if (d.bins !== 5) throw new Error(`K-355 sort: bins ${d.bins} ≠ 5 (the five senses)`);
    if (!(d.cols >= 4 && d.cols <= 5)) throw new Error(`K-355 sort: cols ${d.cols} outside 4..5`);
    if (!(d.iconPx >= G1_MIN)) throw new Error(`K-355 sort: iconPx ${d.iconPx} < the G1 floor ${G1_MIN}`);
    if (!(d.perBin <= d.maxPerSense)) throw new Error(`K-355 sort: perBin ${d.perBin} > maxPerSense ${d.maxPerSense}`);
    if (!(d.zone >= 220 && d.zone <= 260)) throw new Error(`K-355 sort: zone ${d.zone} outside 220..260 (the K-357 ruling)`);
    if (typeof d.organInBin !== 'boolean') throw new Error('K-355 sort: organInBin must be a boolean');
    const tile = d.iconPx + 20, gap = 12, organPx = 44, binH = 185;
    const state = this._newState();
    let items = [];
    for (const s of SENSES) {
      // smell: at most one flower-family item per page, so a perBin of 3 caps at min(perBin, co-occurrable)
      const want = Math.min(d.perBin, s === 'smell' ? Math.max(1, Math.min(d.perBin, 2)) : d.perBin);
      items = items.concat(this._sampleSense(global, block, s, want, d.pool, loc, rng, state, 'sort'));
    }
    const strip = rng.shuffle(items);
    const rows = [];
    for (let i = 0; i < strip.length; i += d.cols) rows.push(strip.slice(i, i + d.cols));
    const canonical = C4.ORGANS.map((o) => o.sense).join(',');
    let order = null;
    for (let t = 0; t < TRIES; t++) { const o = rng.shuffle(SENSES); if (o.join(',') !== canonical) { order = o; break; } }
    if (!order) throw new Error('K-355 sort: no non-canonical bin order in ' + TRIES + ' tries (refuse)');
    const bins = order.map((s) => {
      const { organ, src } = this._organSrc(block, loc, s);
      return { sense: s, label: this._verb(block, loc, s), organ, src: d.organInBin ? src : null };
    });
    const stack = 14 + rows.length * tile + (rows.length - 1) * gap + d.zone + 26 + binH;
    if (stack > STACK_CEILING) throw new Error(`K-355 sort: stack ${stack} > the ${STACK_CEILING} fi budget`);
    const bodyHtml = C4.senseSortStage({
      rows, bins, tile, iconPx: d.iconPx, gap, organPx, zone: d.zone, binH,
      stamps: { pool: d.pool, 'max-per-sense': d.maxPerSense, 'per-bin': d.perBin, cols: d.cols, 'organ-in-bin': d.organInBin ? 1 : 0 },
    });
    return { bodyHtml, meta: { layout: 'sort', items: strip.map((it) => it.theme + '/' + it.noun), senses: strip.map((it) => it.sense), bins: order, stack } };
  },

  /* ---------------- F2 which ---------------- */
  _buildWhich(global, block, d, loc, rng) {
    if (!(d.items >= 6 && d.items <= 8)) throw new Error(`K-355 which: items ${d.items} outside 6..8`);
    if (!['fixed', 'shuffled'].includes(d.chipOrder)) throw new Error(`K-355 which: chipOrder "${d.chipOrder}" must be fixed | shuffled (the guard keys on the config)`);
    if (!(d.tile >= G1_MIN && d.chipPx >= G1_MIN && d.pic >= G1_MIN)) throw new Error(`K-355 which: tile ${d.tile} / chipPx ${d.chipPx} / pic ${d.pic} below the G1 floor ${G1_MIN}`);
    if (!(d.chipPx <= d.tile - 4)) throw new Error(`K-355 which: chipPx ${d.chipPx} does not fit tile ${d.tile}`);
    if (!(d.minPerSense >= 1)) throw new Error('K-355 which: minPerSense < 1 (every organ is the answer at least once)');
    const objTile = d.pic + 12;
    const rowMin = Math.max(76, objTile + 4);
    const stripW = 5 * d.tile + 4 * 10;
    if (30 + objTile + stripW + 36 + 24 > 675) throw new Error('K-355 which: the row does not fit 675');
    if (d.items * rowMin + (d.items - 1) * 8 > STACK_CEILING) throw new Error(`K-355 which: ${d.items} rows of ${rowMin} > the ${STACK_CEILING} fi budget`);
    // {2,2,2,1,1} for 8: every sense at least minPerSense, the extras spread one per sense over a shuffled order
    const extra = d.items - 5 * d.minPerSense;
    if (extra < 0 || extra > 5) throw new Error(`K-355 which: items ${d.items} cannot spread over 5 senses at minPerSense ${d.minPerSense}`);
    const spread = rng.shuffle(SENSES);
    const counts = Object.fromEntries(SENSES.map((s) => [s, d.minPerSense + (spread.indexOf(s) < extra ? 1 : 0)]));
    for (const s of SENSES) if (counts[s] > d.maxPerSense) throw new Error(`K-355 which: ${counts[s]} items of ${s} > maxPerSense ${d.maxPerSense}`);
    const state = this._newState();
    let items = [];
    for (const s of SENSES) items = items.concat(this._sampleSense(global, block, s, counts[s], d.pool, loc, rng, state, 'which'));
    const rowsItems = rng.shuffle(items);
    const srcOf = (organ) => fileUri(ORGAN_THEME, organ);
    const organsFixed = C4.ORGANS.map((o) => ({ sense: o.sense, noun: this._organOf(block, loc, o.sense) }));
    const seen = new Set();
    const rows = rowsItems.map((it, i) => {
      let order = organsFixed;
      if (d.chipOrder === 'shuffled') {
        let o = null;
        for (let t = 0; t < TRIES; t++) { const c = rng.shuffle(organsFixed); const k = c.map((x) => x.noun).join(','); if (!seen.has(k) && k !== organsFixed.map((x) => x.noun).join(',')) { o = c; seen.add(k); break; } }
        if (!o) throw new Error('K-355 which: no fresh chip permutation (refuse)');
        order = o;
      }
      const chips = C4.organChips({ order, tile: d.tile, iconPx: d.chipPx, gap: 10, chipOrder: d.chipOrder, srcOf });
      return C4.whichSenseRow({ n: i + 1, item: it, chips, tile: objTile, iconPx: d.pic });
    });
    const bodyHtml = C4.whichSenseStage({ rows, rowMin, gap: 8, stamps: { pool: d.pool, 'max-per-sense': d.maxPerSense, 'min-per-sense': d.minPerSense, 'chip-order': d.chipOrder, 'chip-px': d.chipPx, 'chip-tile': d.tile, pic: d.pic } });
    return { bodyHtml, meta: { layout: 'which', items: rowsItems.map((it) => it.theme + '/' + it.noun), senses: rowsItems.map((it) => it.sense), counts } };
  },

  /* ---------------- F3 odd ---------------- */
  _buildOdd(global, block, d, loc, rng) {
    if (!(d.rows >= 4 && d.rows <= 5)) throw new Error(`K-355 odd: rows ${d.rows} outside 4..5`);
    if (!(d.items >= 4 && d.items <= 5)) throw new Error(`K-355 odd: items ${d.items} outside 4..5`);
    if (!(d.pic >= G1_MIN && d.box >= d.pic)) throw new Error(`K-355 odd: pic ${d.pic} / box ${d.box} below the G1 floor ${G1_MIN}`);
    const mr = d.majorityRows;
    if (!mr || typeof mr !== 'object') throw new Error('K-355 odd: majorityRows missing (the guard needs the resolved config)');
    const multiset = [];
    for (const [s, n] of Object.entries(mr)) {
      if (!SENSES.includes(s)) throw new Error(`K-355 odd: majorityRows.${s} is not a sense`);
      if (!(n >= 0 && Number.isInteger(n))) throw new Error(`K-355 odd: majorityRows.${s} = ${n}`);
      for (let i = 0; i < n; i++) multiset.push(s);
    }
    if (multiset.length !== d.rows) throw new Error(`K-355 odd: majorityRows sum ${multiset.length} ≠ rows ${d.rows}`);
    const rowSenses = rng.shuffle(multiset);
    const state = this._newState();
    const oddPer = {};
    const rows = [];
    for (const s of rowSenses) {
      const majority = this._sampleSense(global, block, s, d.items - 1, d.pool, loc, rng, state, 'odd majority');
      const others = rng.shuffle(SENSES.filter((x) => x !== s && (oddPer[x] || 0) < d.maxPerSense));
      let odd = null;
      for (const x of others) {
        try { odd = this._sampleSense(global, block, x, 1, d.pool, loc, rng, state, 'odd intruder')[0]; break; } catch (e) { /* that sense is exhausted on this page — try the next */ }
      }
      if (!odd) throw new Error(`K-355 ${loc} odd: no intruder left for a ${s} row under maxPerSense ${d.maxPerSense} (refuse)`);
      oddPer[odd.sense] = (oddPer[odd.sense] || 0) + 1;
      rows.push({ sense: s, majority, odd });
    }
    // the odd column: never identical on 3 consecutive rows, never the same in more than ceil(rows/2) rows
    const cap = Math.ceil(d.rows / 2);
    let cols = null;
    for (let t = 0; t < TRIES; t++) {
      const c = rows.map(() => rng.int(0, d.items - 1));
      const counts = {};
      c.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
      const run3 = c.some((v, i) => i >= 2 && c[i - 1] === v && c[i - 2] === v);
      if (!run3 && Object.values(counts).every((n) => n <= cap)) { cols = c; break; }
    }
    if (!cols) throw new Error('K-355 odd: no odd-column vector in ' + TRIES + ' tries (refuse)');
    const cards = rows.map((r, i) => {
      const items = rng.shuffle(r.majority);
      items.splice(cols[i], 0, r.odd);
      return { sense: r.sense, html: C4.senseOddRow({ items, oddIdx: cols[i], box: d.box, iconPx: d.pic, boxMax: d.boxMax || 120 }) };
    });
    const bodyHtml = C4.senseOddGrid({ rows: cards, stamps: { pool: d.pool, 'max-per-sense': d.maxPerSense, items: d.items, box: d.box, pic: d.pic, 'box-max': d.boxMax || 120, majority: SENSES.filter((s) => mr[s]).map((s) => s + ':' + mr[s]).join(',') } });
    return { bodyHtml, meta: { layout: 'odd', rowSenses, odds: rows.map((r) => r.odd.theme + '/' + r.odd.noun), oddCols: cols, items: rows.map((r) => r.majority.map((m) => m.theme + '/' + m.noun).concat(r.odd.theme + '/' + r.odd.noun)) } };
  },

  /* ---------------- F4 label ---------------- */
  _buildLabel(global, block, d, loc, rng) {
    if (!(d.organs >= 3 && d.organs <= 5)) throw new Error(`K-355 label: organs ${d.organs} outside 3..5`);
    if (typeof d.bank !== 'boolean' || typeof d.starter !== 'boolean') throw new Error('K-355 label: bank / starter must be booleans');
    if (!(d.glyphH >= 26)) throw new Error(`K-355 label: glyphH ${d.glyphH} < 26`);
    if (!(d.laneH >= d.glyphH + 14)) throw new Error(`K-355 label: laneH ${d.laneH} too small for glyphH ${d.glyphH}`);
    if (!(d.organPx >= G1_MIN)) throw new Error(`K-355 label: organPx ${d.organPx} < the G1 floor ${G1_MIN}`);
    const organTile = d.organPx + 12;
    if (organTile + 16 + d.laneW > 647) throw new Error(`K-355 label: ${organTile} + 16 + ${d.laneW} > the 647 lane`);
    const rowMin = d.rowMin || 112, rowMax = d.rowMax || 128;
    if (70 + d.organs * rowMin + (d.organs - 1) * 10 > STACK_CEILING) throw new Error(`K-355 label: ${d.organs} rows of ${rowMin} + the bank > the ${STACK_CEILING} fi budget`);
    const senses = rng.shuffle(SENSES).slice(0, d.organs);
    const verbs = Object.fromEntries(SENSES.map((s) => [s, this._verb(block, loc, s)]));
    const rowVerbs = senses.map((s) => verbs[s]);
    let bankWords = null;
    if (d.bank) {
      const all = SENSES.map((s) => verbs[s]);
      for (let t = 0; t < TRIES; t++) {
        const b = rng.shuffle(all);
        const same = rowVerbs.filter((v, i) => b[i] === v).length;
        if (rowVerbs.length - same >= Math.min(3, rowVerbs.length)) { bankWords = b; break; }
      }
      if (!bankWords) throw new Error('K-355 label: no bank order far enough from the row order (refuse)');
    }
    const rows = senses.map((s) => {
      const { organ, src } = this._organSrc(block, loc, s);
      const starter = d.starter ? [...verbs[s]][0] : null;
      return C4.organLabelRow({ organ, src, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, organTile, organPx: d.organPx, starter });
    });
    const bank = bankWords ? C2.wordBank({ words: bankWords.map((w) => ({ word: w })), wordPx: 18 }) : '';
    const bodyHtml = C4.organLabelStage({ bank, rows, rowMin, rowMax, gap: 10, stamps: { organs: d.organs, bank: d.bank ? 1 : 0, starter: d.starter ? 1 : 0, 'glyph-h': d.glyphH, 'lane-w': d.laneW, 'lane-h': d.laneH, 'organ-px': d.organPx } });
    return { bodyHtml, meta: { layout: 'label', senses, organs: senses.map((s) => this._organOf(block, loc, s)), bank: bankWords } };
  },

  /* ---------------- F5 write (open-ended) ---------------- */
  _buildWrite(global, block, d, loc, rng) {
    void rng;   // the lanes are the five senses in the SENSES order (hear see smell taste touch = the instruction's order); nothing is sampled
    if (!(d.rowsPerSense >= 1 && d.rowsPerSense <= 3)) throw new Error(`K-355 write: rowsPerSense ${d.rowsPerSense} outside 1..3`);
    if (!(d.glyphH >= 26)) throw new Error(`K-355 write: glyphH ${d.glyphH} < 26`);
    if (!(d.rowH >= d.glyphH + 8)) throw new Error(`K-355 write: rowH ${d.rowH} too small for glyphH ${d.glyphH}`);
    if (!(d.organPx >= G1_MIN)) throw new Error(`K-355 write: organPx ${d.organPx} < the G1 floor ${G1_MIN}`);
    const organTile = d.organPx + 8;
    const drawW = d.draw ? d.draw.w + 12 : 0;
    if (organTile + 12 + d.laneW + drawW > 647) throw new Error(`K-355 write: ${organTile} + 12 + ${d.laneW}${d.draw ? ' + ' + drawW : ''} > the 647 lane`);
    const laneH = d.rowsPerSense * d.rowH + (d.rowsPerSense - 1) * 6 + 8 + 16 + 4;
    const rowMin = d.rowMin || Math.max(laneH, d.draw ? d.draw.h + 20 : 0), rowMax = d.rowMax || rowMin + 14;
    if (5 * rowMin + 4 * 8 > STACK_CEILING) throw new Error(`K-355 write: 5 lanes of ${rowMin} > the ${STACK_CEILING} fi budget`);
    const lanes = SENSES.map((s) => {
      const { organ, src } = this._organSrc(block, loc, s);
      return C4.senseLane({ organ, src, starter: this._starter(block, loc, s), rows: d.rowsPerSense, laneW: d.laneW, h: d.rowH, glyphH: d.glyphH, draw: d.draw || null, organTile, organPx: d.organPx });
    });
    const bodyHtml = C4.senseLaneStage({ lanes, rowMin, rowMax, gap: 8, stamps: { 'rows-per-sense': d.rowsPerSense, 'row-h': d.rowH, 'glyph-h': d.glyphH, 'lane-w': d.laneW, 'organ-px': d.organPx, draw: d.draw ? d.draw.w + 'x' + d.draw.h : 0 } });
    return { bodyHtml, meta: { layout: 'write', senses: SENSES.slice(), starters: SENSES.map((s) => this._starter(block, loc, s)) } };
  },

  /**
   * verify() for the five faces — re-derives everything from the stamps +
   * geometry (page.evaluate: no require, no bank; the node cross-checks that
   * need the bank — pill === verb, bank set === verbs, starter literal, the
   * family fence — live in qa/verify-b4-five-senses.js). Every face asserts:
   * the root under the body top (top-anchored, never a floating stage), the
   * content above the footer, no [data-lcs-answer], pictures complete and
   * from a colour dir, the G1 floor 44 on every picture, and a SPARSE measure
   * of its own (F1 the fixed zone + the slack under the bins; F2 the grid
   * fills the body; F3 the picture fills its card; F4 / F5 the rows inside
   * [min, max] and the slack under the last row).
   */
  async _verifyFace(page) {
    return page.evaluate(() => {
      const fails = [];
      const SENSES = ['hear', 'see', 'smell', 'taste', 'touch'];
      const ORGANS = ['eye', 'ear', 'nose', 'tongue', 'hand'];
      const ORGAN_OF = { hear: 'ear', see: 'eye', smell: 'nose', taste: 'tongue', touch: 'hand' };
      const CANON = ['eye', 'ear', 'nose', 'tongue', 'hand'];   // the fixed chip / ORGANS order (see hear smell taste touch)
      const G1 = 44, SLACK_MAX = 180;
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-five-senses]');
      if (!root) return ['no five-senses root'];
      const layout = root.dataset.lcsLayout;
      const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const rr = root.getBoundingClientRect();
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      if (rr.left < body.left - 0.6 || rr.right > body.right + 0.6) fails.push('stage outside the body column');
      if (rr.top > body.top + 8) fails.push(`stage top ${Math.round(rr.top - body.top)} px under the body top: the stage floats (top-anchor it)`);
      const organOfLoose = (s) => (s === 'taste' ? ['tongue', 'mouth'] : [ORGAN_OF[s]]);
      const isOrganOf = (o, s) => organOfLoose(s).includes(o);
      const pic = (el, what, minPx) => {
        const imgs = el.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`${what}: ${imgs.length} pictures`); return null; }
        const im = imgs[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        const r = im.getBoundingClientRect();
        const px = Math.min(r.width, r.height);
        if (px < minPx - 0.6) fails.push(`${what}: picture ${Math.round(px)} px < ${minPx}`);
        if (r.bottom > foot + 0.6) fails.push(`${what}: reaches into the footer band`);
        const st = getComputedStyle(im);
        if (+st.opacity < 1 || st.filter !== 'none') fails.push(`${what}: picture greyed / filtered at render`);
        return { dir, file, px, rect: r };
      };
      const objectPic = (el, what, minPx, nouns) => {
        const s = el.dataset.lcsItemSense || el.dataset.lcsSense || el.dataset.lcsTile;
        if (!SENSES.includes(s)) fails.push(`${what}: sense "${s}"`);
        const noun = (el.dataset.lcsItem || '').split('/').pop();
        if (!noun) fails.push(`${what}: no data-lcs-item`);
        if (nouns.has(noun)) fails.push(`${what}: noun "${noun}" appears twice on the page`);
        nouns.add(noun);
        const p = pic(el, what, minPx);
        if (p && p.file !== noun) fails.push(`${what}: picture "${p.file}" ≠ stamped noun "${noun}"`);
        if (p && p.dir === 'body parts') fails.push(`${what}: an organ picture as an object`);
        return { sense: s, noun, p };
      };
      const lowestOf = (sel) => [...root.querySelectorAll(sel)].reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0);
      const textOutside = (allowSel) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const out = [];
        let n;
        while ((n = walker.nextNode())) {
          if (!n.textContent.trim()) continue;
          if (n.parentElement.tagName === 'STYLE') continue;
          if (allowSel && n.parentElement.closest(allowSel)) continue;
          out.push(n.textContent.trim());
        }
        return out;
      };

      /* ---------------- F1 sort ---------------- */
      if (layout === 'sort') {
        const perBin = +root.dataset.lcsPerBin, maxPerSense = +root.dataset.lcsMaxPerSense, cols = +root.dataset.lcsCols;
        const minPx = Math.max(G1, +root.dataset.lcsIconPx || 0), organPx = Math.max(G1, +root.dataset.lcsOrganPx || 0);
        const zone = +root.dataset.lcsZone, binH = +root.dataset.lcsBinH, organIn = root.dataset.lcsOrganInBin === '1';
        const tiles = [...root.querySelectorAll('[data-lcs-tile]')];
        const rows = [...root.querySelectorAll('[data-lcs-strip-row]')];
        const bins = [...root.querySelectorAll('[data-lcs-bin]')];
        if (!(perBin >= 1)) fails.push('no per-bin stamp');
        const nouns = new Set(), count = {};
        tiles.forEach((t, i) => {
          const what = `tile ${i + 1}`;
          const o = objectPic(t, what, minPx, nouns);
          count[o.sense] = (count[o.sense] || 0) + 1;
          if (!t.querySelector('.fs-dot')) fails.push(`${what}: no dot`);
          if (t.textContent.trim()) fails.push(`${what}: prints text`);
        });
        for (const s of SENSES) {
          const want = s === 'smell' ? Math.min(perBin, 2) : perBin;
          if ((count[s] || 0) !== want) fails.push(`${count[s] || 0} tiles of ${s} ≠ perBin ${want}`);
          if ((count[s] || 0) > maxPerSense) fails.push(`${count[s]} tiles of ${s} > maxPerSense ${maxPerSense}`);
        }
        rows.forEach((r, i) => {
          const ts = [...r.querySelectorAll('[data-lcs-tile]')];
          if (ts.length > cols) fails.push(`strip row ${i + 1}: ${ts.length} tiles > cols ${cols}`);
          const tops = ts.map((t) => Math.round(t.getBoundingClientRect().top));
          if (new Set(tops).size !== 1) fails.push(`strip row ${i + 1} wraps (tops ${tops.join(',')})`);
        });
        const binSenses = bins.map((b) => b.dataset.lcsBin);
        if (bins.length !== 5 || [...binSenses].sort().join() !== [...SENSES].sort().join()) fails.push(`bins ${binSenses.join(',')} are not the five senses`);
        if (binSenses.join(',') === 'see,hear,smell,taste,touch') fails.push('bins in the canonical organ order (see hear smell taste touch)');
        const pillTexts = [];
        bins.forEach((b, i) => {
          const what = `bin ${i + 1} (${b.dataset.lcsBin})`;
          const pill = b.querySelector('[data-lcs-bin-label]');
          if (!pill || !pill.textContent.trim()) fails.push(`${what}: no verb pill`);
          else {
            if (pill.getClientRects().length !== 1) fails.push(`${what}: pill wraps`);
            const pr = pill.getBoundingClientRect(), br = b.getBoundingClientRect();
            if (pr.width > br.width + 0.6) fails.push(`${what}: pill ${Math.round(pr.width)} wider than the bin ${Math.round(br.width)}`);
            if (/\p{N}/u.test(pill.textContent)) fails.push(`${what}: pill carries a numeral`);
            pillTexts.push(pill.textContent.trim().toLowerCase());
          }
          const org = b.querySelector('[data-lcs-bin-organ]');
          if (organIn) {
            if (!org) fails.push(`${what}: no organ picture`);
            else {
              const p = pic(org, what + ' organ', organPx);
              if (p && (p.dir !== 'body parts' || !isOrganOf(p.file, b.dataset.lcsBin))) fails.push(`${what}: organ picture ${p && p.dir}/${p && p.file} is not the organ of ${b.dataset.lcsBin}`);
              if (org.dataset.lcsBinOrgan !== (p && p.file)) fails.push(`${what}: organ stamp ${org.dataset.lcsBinOrgan} ≠ picture`);
            }
          } else if (org) fails.push(`${what}: organ drawn but organInBin is off`);
          if (Math.abs(b.getBoundingClientRect().height - binH) > 0.6) fails.push(`${what}: bin ${Math.round(b.getBoundingClientRect().height)} ≠ binH ${binH}`);
        });
        if (new Set(pillTexts).size !== pillTexts.length) fails.push('two bins print the same word');
        for (let i = 1; i < bins.length; i++) {
          const a = bins[i - 1].querySelector('[data-lcs-bin-label]'), b = bins[i].querySelector('[data-lcs-bin-label]');
          if (a && b && a.getBoundingClientRect().right > b.getBoundingClientRect().left - 0.6) fails.push(`pills ${i} and ${i + 1} touch`);
        }
        const extra = textOutside('[data-lcs-bin-label]');
        if (extra.length) fails.push(`text outside the pills: ${JSON.stringify(extra.slice(0, 3))}`);
        // the fixed line zone (the K-357 ruling) + the SPARSE measures
        const zoneEl = root.querySelector('[data-lcs-line-zone]');
        if (!zoneEl) fails.push('no fixed line-zone block');
        else {
          const zh = zoneEl.getBoundingClientRect().height;
          if (Math.abs(zh - zone) > 0.6) fails.push(`the line zone block is ${Math.round(zh)}, not the stamped ${zone}`);
          if (!(zone >= 220 && zone <= 260)) fails.push(`zone ${zone} outside 220..260`);
        }
        const lastDot = tiles.length ? Math.max(...rows[rows.length - 1].querySelectorAll('.fs-dot').length ? [...rows[rows.length - 1].querySelectorAll('.fs-dot')].map((d) => d.getBoundingClientRect().bottom) : [0]) : 0;
        const pillTop = Math.min(...bins.map((b) => { const p = b.querySelector('[data-lcs-bin-label]'); return p ? p.getBoundingClientRect().top : Infinity; }));
        const measuredZone = pillTop - lastDot;
        if (measuredZone > 266) fails.push(`dot-to-pill zone ${Math.round(measuredZone)} px > 266: the page reads SPARSE`);
        if (measuredZone < 200) fails.push(`dot-to-pill zone ${Math.round(measuredZone)} px < 200`);
        const stageH = lowestOf('[data-lcs-bin]') - Math.min(...tiles.map((t) => t.getBoundingClientRect().top));
        if (stageH < 630) fails.push(`stage ${Math.round(stageH)} px < 630: the apparatus does not fill the page (sparse)`);
        const slack = foot - lowestOf('[data-lcs-bin]');
        if (slack > SLACK_MAX) fails.push(`${Math.round(slack)} px of slack under the bins > ${SLACK_MAX} (sparse)`);
        if (slack < -0.6) fails.push('the bins reach into the footer band');
        return fails;
      }

      /* ---------------- F2 which ---------------- */
      if (layout === 'which') {
        const rows = [...root.querySelectorAll('[data-lcs-row]')];
        const n = +root.dataset.lcsRows, maxPerSense = +root.dataset.lcsMaxPerSense, minPerSense = +root.dataset.lcsMinPerSense;
        const chipOrder = root.dataset.lcsChipOrder, chipPx = Math.max(G1, +root.dataset.lcsChipPx || 0), picPx = Math.max(G1, +root.dataset.lcsPic || 0);
        if (rows.length !== n) fails.push(`${rows.length} rows ≠ stamp ${n}`);
        if (n < 6 || n > 8) fails.push(`${n} rows outside 6..8`);
        const nouns = new Set(), count = {}, strips = [];
        rows.forEach((row, i) => {
          const what = `row ${i + 1}`;
          if (row.dataset.lcsN !== String(i + 1)) fails.push(`${what}: badge stamp ${row.dataset.lcsN}`);
          const obj = row.querySelector('.fs-object');
          if (!obj) { fails.push(`${what}: no object tile`); return; }
          // the object's stamps live on the ROW (data-lcs-item / data-lcs-sense), the picture in .fs-object
          const s = row.dataset.lcsSense;
          if (!SENSES.includes(s)) fails.push(`${what}: sense "${s}"`);
          const noun = (row.dataset.lcsItem || '').split('/').pop();
          if (!noun) fails.push(`${what}: no data-lcs-item`);
          if (nouns.has(noun)) fails.push(`${what}: noun "${noun}" appears twice on the page`);
          nouns.add(noun);
          const p = pic(obj, what + ' object', picPx);
          if (p && p.file !== noun) fails.push(`${what}: picture "${p.file}" ≠ stamped noun "${noun}"`);
          if (p && p.dir === 'body parts') fails.push(`${what}: an organ picture as the object`);
          count[s] = (count[s] || 0) + 1;
          const strip = row.querySelector('[data-lcs-chips]');
          if (!strip) { fails.push(`${what}: no chip strip`); return; }
          if (strip.dataset.lcsChipOrder !== chipOrder) fails.push(`${what}: strip order stamp ${strip.dataset.lcsChipOrder} ≠ ${chipOrder}`);
          const chips = [...strip.querySelectorAll('[data-lcs-chip]')];
          if (chips.length !== 5) fails.push(`${what}: ${chips.length} chips ≠ 5 chips`);
          const organs = chips.map((c) => c.dataset.lcsChip);
          if ([...organs].sort().join() !== [...ORGANS].sort().join() && !(organs.includes('mouth') && !organs.includes('tongue') && organs.length === 5)) fails.push(`${what}: chips ${organs.join(',')} are not the five organs each once`);
          strips.push(organs.join(','));
          const sizes = [];
          const ref = chips[0] && getComputedStyle(chips[0]);
          chips.forEach((c, k) => {
            const cw = `${what} chip ${k + 1}`;
            const p2 = pic(c, cw, chipPx);
            if (p2 && (p2.dir !== 'body parts' || p2.file !== c.dataset.lcsChip)) fails.push(`${cw}: picture ${p2 && p2.dir}/${p2 && p2.file} ≠ body parts/${c.dataset.lcsChip}`);
            const r = c.getBoundingClientRect();
            sizes.push(Math.round(r.width) + 'x' + Math.round(r.height));
            if (Math.min(r.width, r.height) < chipPx - 0.6) fails.push(`${cw}: chip ${Math.round(Math.min(r.width, r.height))} px < ${chipPx}`);
            const st = getComputedStyle(c);
            if (c.children.length !== 1 || c.querySelectorAll('svg, span, div').length) fails.push(`${cw}: chip pre-marked (an extra mark inside the chip)`);
            if (st.borderTopColor !== ref.borderTopColor || st.backgroundColor !== ref.backgroundColor || st.borderTopWidth !== ref.borderTopWidth || st.borderTopLeftRadius !== ref.borderTopLeftRadius || st.boxShadow !== ref.boxShadow || st.outlineStyle !== 'none') fails.push(`${cw}: chip pre-marked (ring / fill differs from the strip)`);
            if (c.textContent.trim()) fails.push(`${cw}: prints text`);
          });
          if (new Set(sizes).size > 1) fails.push(`${what}: chips are not equal (${sizes.join(' ')})`);
          const answers = organs.filter((o) => isOrganOf(o, s));
          if (answers.length !== 1) fails.push(`${what}: ${answers.length} chips answer ${s}`);
          if (chipOrder === 'fixed') {
            const canon = CANON.map((o) => (o === 'tongue' && organs.includes('mouth') ? 'mouth' : o)).join(',');
            if (organs.join(',') !== canon) fails.push(`${what}: strip ${organs.join(',')} is not the fixed order ${canon}`);
          }
          const badge = row.querySelector('.fs-badge');
          if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${what}: badge ≠ ${i + 1}`);
        });
        if (chipOrder === 'shuffled' && new Set(strips).size !== strips.length) fails.push('two rows share one chip permutation at shuffled');
        for (const s of SENSES) {
          if ((count[s] || 0) < minPerSense) fails.push(`${count[s] || 0} rows of ${s} < minPerSense ${minPerSense} (an organ is never the answer)`);
          if ((count[s] || 0) > maxPerSense) fails.push(`${count[s]} rows of ${s} > maxPerSense ${maxPerSense}`);
        }
        const extra = textOutside('.fs-badge');
        if (extra.length) fails.push(`text outside the badges: ${JSON.stringify(extra.slice(0, 3))}`);
        // SPARSE: the grid fills the body (rows open with the chrome) and the object tile holds most of its row
        if (Math.abs(rr.bottom - body.bottom) > 2) fails.push(`the row grid ends ${Math.round(body.bottom - rr.bottom)} px above the body bottom: the rows do not fill the page (sparse)`);
        rows.forEach((row, i) => {
          const rh = row.getBoundingClientRect().height, obj = row.querySelector('.fs-object');
          const oh = obj ? obj.getBoundingClientRect().height : 0;
          if (oh / rh < 0.7) fails.push(`row ${i + 1}: the object tile ${Math.round(oh)} in a ${Math.round(rh)} px row (< 0.7: sparse)`);
          if (row.getBoundingClientRect().bottom > foot + 0.6) fails.push(`row ${i + 1} reaches into the footer band`);
        });
        return fails;
      }

      /* ---------------- F3 odd ---------------- */
      if (layout === 'odd') {
        const cards = [...root.querySelectorAll('[data-lcs-row-sense]')];
        const n = +root.dataset.lcsRows, items = +root.dataset.lcsItems, maxPerSense = +root.dataset.lcsMaxPerSense;
        const picPx = Math.max(G1, +root.dataset.lcsPic || 0), boxPx = Math.max(G1, +root.dataset.lcsBox || 0), boxMax = +root.dataset.lcsBoxMax || boxPx;
        const majority = Object.fromEntries((root.dataset.lcsMajority || '').split(',').filter(Boolean).map((x) => { const [s, k] = x.split(':'); return [s, +k]; }));
        if (cards.length !== n) fails.push(`${cards.length} rows ≠ stamp ${n}`);
        if (n < 4 || n > 5) fails.push(`${n} rows outside 4..5`);
        const nouns = new Set(), rowSenses = {}, oddPer = {}, oddCols = [];
        cards.forEach((card, i) => {
          const what = `row ${i + 1}`;
          const s = card.dataset.lcsRowSense;
          if (!SENSES.includes(s)) fails.push(`${what}: row sense "${s}"`);
          rowSenses[s] = (rowSenses[s] || 0) + 1;
          const boxes = [...card.querySelectorAll('[data-lcs-item]')];
          if (boxes.length !== items) fails.push(`${what}: ${boxes.length} pictures ≠ ${items}`);
          const odds = boxes.filter((b) => b.dataset.lcsOdd === '1');
          if (odds.length !== 1) fails.push(`${what}: ${odds.length} intruders`);
          const stage = card.querySelector('.ws-card-stage');
          const ch = card.getBoundingClientRect().height;
          boxes.forEach((b, k) => {
            const bw = `${what} picture ${k + 1}`;
            const o = objectPic(b, bw, picPx, nouns);
            const isOdd = b.dataset.lcsOdd === '1';
            if (isOdd && o.sense === s) fails.push(`${bw}: the intruder shares the row sense ${s}`);
            if (!isOdd && o.sense !== s) fails.push(`${bw}: sense ${o.sense} ≠ the row sense ${s} (majority ∉ config)`);
            const r = b.getBoundingClientRect();
            if (Math.min(r.width, r.height) < boxPx - 0.6) fails.push(`${bw}: box ${Math.round(Math.min(r.width, r.height))} < ${boxPx}`);
            if (stage) {
              const sr = stage.getBoundingClientRect();
              if (r.top < sr.top - 0.6 || r.bottom > sr.bottom + 0.6) fails.push(`${bw}: box outside its stage`);
              // SPARSE: the box GROWS to its stage (up to boxMax) — a fixed 96 box in a 114 px stage is the design's floating-picture defect
              const want = Math.min(boxMax, sr.height);
              if (r.height < want - 1) fails.push(`${bw}: box ${Math.round(r.height)} in a ${Math.round(sr.height)} px stage does not grow to min(boxMax ${boxMax}, stage) = ${Math.round(want)} (sparse)`);
            }
            if (b.querySelectorAll('svg, span, div').length) fails.push(`${bw}: crossed out / marked at render`);
            if (o.p && o.p.px / ch < 0.5) fails.push(`${bw}: picture ${Math.round(o.p.px)} in a ${Math.round(ch)} px card (< 0.5: sparse)`);
            if (b.textContent.trim()) fails.push(`${bw}: prints text`);
          });
          if (odds[0]) { const c = boxes.indexOf(odds[0]); oddCols.push(c); oddPer[odds[0].dataset.lcsItemSense] = (oddPer[odds[0].dataset.lcsItemSense] || 0) + 1; }
          const badge = card.querySelector('.ws-card-badge');
          if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${what}: badge ≠ ${i + 1}`);
          if (card.getBoundingClientRect().bottom > foot + 0.6) fails.push(`${what} reaches into the footer band`);
        });
        const want = Object.entries(majority).map(([s, k]) => `${s}:${k}`).sort().join(',');
        const got = Object.entries(rowSenses).map(([s, k]) => `${s}:${k}`).sort().join(',');
        if (want !== got) fails.push(`row senses ${got} ≠ majorityRows ${want} (majority ∉ config)`);
        for (const [s, k] of Object.entries(oddPer)) if (k > maxPerSense) fails.push(`${k} intruders of ${s} > maxPerSense ${maxPerSense}`);
        const cap = Math.ceil(n / 2), colCount = {};
        oddCols.forEach((c) => { colCount[c] = (colCount[c] || 0) + 1; });
        for (const [c, k] of Object.entries(colCount)) if (k > cap) fails.push(`the intruder sits in column ${+c + 1} on ${k} rows > ${cap} (position leak)`);
        if (oddCols.some((c, i) => i >= 2 && oddCols[i - 1] === c && oddCols[i - 2] === c)) fails.push('the intruder column repeats on 3 consecutive rows (position leak)');
        const extra = textOutside('.ws-card-badge');
        if (extra.length) fails.push(`text outside the badges: ${JSON.stringify(extra.slice(0, 3))}`);
        if (Math.abs(rr.bottom - body.bottom) > 2) fails.push(`the card grid ends ${Math.round(body.bottom - rr.bottom)} px above the body bottom (sparse)`);
        return fails;
      }

      /* ---------------- F4 label ---------------- */
      if (layout === 'label') {
        const rows = [...root.querySelectorAll('[data-lcs-organ]')];
        const n = +root.dataset.lcsOrgans, bank = root.dataset.lcsBank === '1', starter = root.dataset.lcsStarter === '1';
        const glyphH = +root.dataset.lcsGlyphH, organPx = Math.max(G1, +root.dataset.lcsOrganPx || 0), laneW = +root.dataset.lcsLaneW;
        const rowMin = +root.dataset.lcsRowMin, rowMax = +root.dataset.lcsRowMax;
        if (rows.length !== n) fails.push(`${rows.length} organ rows ≠ stamp ${n}`);
        if (!(glyphH >= 26)) fails.push(`glyphH ${glyphH} < 26`);
        const organs = rows.map((r) => r.dataset.lcsOrgan);
        if (new Set(organs).size !== organs.length) fails.push(`organs ${organs.join(',')} repeat`);
        organs.forEach((o) => { if (!ORGANS.includes(o) && o !== 'mouth') fails.push(`organ "${o}"`); });
        if (n === 5 && !([...organs].sort().join() === [...ORGANS].sort().join() || (organs.includes('mouth') && !organs.includes('tongue')))) fails.push(`organs ${organs.join(',')} are not the five organs each once`);
        rows.forEach((row, i) => {
          const what = `row ${i + 1} (${row.dataset.lcsOrgan})`;
          const tile = row.querySelector('.fs-organ');
          if (!tile) { fails.push(`${what}: no organ tile`); return; }
          const p = pic(tile, what, organPx);
          if (p && (p.dir !== 'body parts' || p.file !== row.dataset.lcsOrgan)) fails.push(`${what}: picture ${p && p.dir}/${p && p.file} ≠ body parts/${row.dataset.lcsOrgan}`);
          const wr = row.querySelectorAll('[data-lcs-prim="writing-row"]');
          if (wr.length !== 1) fails.push(`${what}: ${wr.length} writing rows`);
          else {
            const lines = [...wr[0].querySelectorAll('line')].filter((l) => l.getAttribute('y1') === l.getAttribute('y2'));
            if (lines.length !== 3) fails.push(`${what}: ${lines.length} rules (want 3)`);
            if (Math.abs(wr[0].getBoundingClientRect().width - laneW) > 0.6) fails.push(`${what}: writing row ${Math.round(wr[0].getBoundingClientRect().width)} ≠ ${laneW}`);
          }
          const st = row.querySelectorAll('[data-lcs-starter]');
          if (starter ? st.length !== 1 : st.length) fails.push(`${what}: ${st.length} starters (starter ${starter ? 'on' : 'off'})`);
          if (starter && st[0] && [...st[0].textContent.trim()].length !== 1) fails.push(`${what}: the starter "${st[0].textContent}" is not one letter`);
          if (!starter && row.textContent.trim()) fails.push(`${what}: the lane prints text`);
          if (row.dataset.lcsVerb || row.dataset.lcsSense) fails.push(`${what}: a verb / sense stamp on the row leaks the answer`);
          const rh = row.getBoundingClientRect().height;
          if (rh < rowMin - 0.6 || rh > rowMax + 0.6) fails.push(`${what}: row ${Math.round(rh)} outside ${rowMin}..${rowMax}`);
          if (row.getBoundingClientRect().bottom > foot + 0.6) fails.push(`${what} reaches into the footer band`);
        });
        const words = [...root.querySelectorAll('[data-lcs-bank-word]')];
        if (bank) {
          if (words.length !== 5) fails.push(`${words.length} bank words ≠ 5`);
          const w = words.map((x) => x.textContent.trim());
          if (new Set(w.map((x) => x.toLowerCase())).size !== w.length) fails.push('bank words repeat');
          w.forEach((x, i) => { if (/\p{N}/u.test(x) || /[{}]/.test(x)) fails.push(`bank word ${i + 1} "${x}" carries a numeral / slot`); if (words[i].getClientRects().length !== 1) fails.push(`bank word "${x}" wraps`); });
          const banner = root.querySelector('[data-lcs-bank-banner]');
          if (banner) {
            const tops = words.map((x) => Math.round(x.getBoundingClientRect().top));
            if (new Set(tops).size !== 1) fails.push('the bank wraps to two rows');
            if (banner.getBoundingClientRect().top > body.top + 8) fails.push('the bank is not at the top of the body');
          } else fails.push('no bank banner');
        } else if (words.length) fails.push('a bank printed at bank:false');
        const extra = textOutside('[data-lcs-bank-word], [data-lcs-starter]');
        if (extra.length) fails.push(`text outside the bank: ${JSON.stringify(extra.slice(0, 3))}`);
        const slack = foot - lowestOf('[data-lcs-organ]');
        if (slack > SLACK_MAX) fails.push(`${Math.round(slack)} px of slack under the last row > ${SLACK_MAX} (sparse)`);
        return fails;
      }

      /* ---------------- F5 write (open: structure only) ---------------- */
      if (layout === 'write') {
        const lanes = [...root.querySelectorAll('[data-lcs-organ]')];
        const n = +root.dataset.lcsLanes, rps = +root.dataset.lcsRowsPerSense, glyphH = +root.dataset.lcsGlyphH, laneW = +root.dataset.lcsLaneW;
        const organPx = Math.max(G1, +root.dataset.lcsOrganPx || 0), rowMin = +root.dataset.lcsRowMin, rowMax = +root.dataset.lcsRowMax, draw = root.dataset.lcsDraw !== '0';
        if (lanes.length !== n || n !== 5) fails.push(`${lanes.length} lanes ≠ 5`);
        if (!(glyphH >= 26)) fails.push(`glyphH ${glyphH} < 26`);
        const organs = lanes.map((l) => l.dataset.lcsOrgan);
        if (!([...organs].sort().join() === [...ORGANS].sort().join() || (organs.includes('mouth') && !organs.includes('tongue') && new Set(organs).size === 5))) fails.push(`lanes ${organs.join(',')} are not the five organs each once`);
        lanes.forEach((lane, i) => {
          const what = `lane ${i + 1} (${lane.dataset.lcsOrgan})`;
          const tile = lane.querySelector('.fs-organ');
          if (!tile) { fails.push(`${what}: no organ tile`); return; }
          const p = pic(tile, what, organPx);
          if (p && (p.dir !== 'body parts' || p.file !== lane.dataset.lcsOrgan)) fails.push(`${what}: picture ${p && p.dir}/${p && p.file} ≠ body parts/${lane.dataset.lcsOrgan}`);
          const wrs = [...lane.querySelectorAll('[data-lcs-prim="writing-row"]')];
          if (wrs.length !== rps) fails.push(`${what}: ${wrs.length} ruling rows ≠ rowsPerSense ${rps}`);
          const starters = [...lane.querySelectorAll('[data-lcs-starter]')];
          if (starters.length !== 1) fails.push(`${what}: ${starters.length} starters (want exactly one, on the first row)`);
          const st = starters[0];
          if (st) {
            if (!wrs[0] || !wrs[0].contains(st)) fails.push(`${what}: the starter is not on the first row`);
            const sw = st.getBBox ? st.getBBox().width : st.getBoundingClientRect().width;
            const rw = wrs[0] ? wrs[0].getBoundingClientRect().width : laneW;
            if (sw > 0.5 * rw + 0.6) fails.push(`${what}: starter "${st.textContent}" ${Math.round(sw)} px > 0.5 x the ${Math.round(rw)} row (gate D)`);
            if (!/(\.\.\.|…|:)\s*$/.test(st.textContent)) fails.push(`${what}: starter "${st.textContent}" does not end in "..." or ":"`);
            if (/[{}]/.test(st.textContent)) fails.push(`${what}: starter carries a slot`);
            if (!st.dataset.lcsStarterPx) fails.push(`${what}: starter not sized by starterFontPx (no data-lcs-starter-px)`);
          }
          const boxes = lane.querySelectorAll('[data-lcs-drawbox]');
          if (draw ? boxes.length !== 1 : boxes.length) fails.push(`${what}: ${boxes.length} draw boxes (draw ${draw ? 'on' : 'off'})`);
          const rh = lane.getBoundingClientRect().height;
          if (rh < rowMin - 0.6 || rh > rowMax + 0.6) fails.push(`${what}: lane ${Math.round(rh)} outside ${rowMin}..${rowMax}`);
          if (lane.getBoundingClientRect().bottom > foot + 0.6) fails.push(`${what} reaches into the footer band`);
        });
        const extra = textOutside('[data-lcs-starter]');
        if (extra.length) fails.push(`text outside the starters: ${JSON.stringify(extra.slice(0, 3))}`);
        const slack = foot - lowestOf('[data-lcs-organ]');
        if (slack > SLACK_MAX) fails.push(`${Math.round(slack)} px of slack under the last lane > ${SLACK_MAX} (sparse)`);
        return fails;
      }
      return [`unknown layout "${layout}"`];
    });
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require); a face root (data-lcs-layout ≠ base) is handed to _verifyFace. */
  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-five-senses]'); return r ? (r.dataset.lcsLayout || null) : null; });
    if (layout && layout !== 'base') return this._verifyFace(page);
    return page.evaluate(() => {
      const fails = [];
      const SENSES = ['hear', 'see', 'smell', 'taste', 'touch'];
      const ORGAN_OF = { hear: 'ear', see: 'eye', smell: 'nose', taste: 'tongue', touch: 'hand' };
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-five-senses]');
      if (!root) return ['no five-senses root'];
      const layout = root.dataset.lcsLayout;
      if (layout !== 'base') return [`layout "${layout}" is not the base (the faces verify in Phase 2)`];
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      const pairs = +root.dataset.lcsPairs, minPx = Math.max(56, +root.dataset.lcsIconPx || 0), words = root.dataset.lcsOrganWords === '1';
      const maxPerSense = +root.dataset.lcsMaxPerSense || 1;
      const pic = (el, what) => {
        const imgs = el.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`${what}: ${imgs.length} pictures`); return null; }
        const im = imgs[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`${what}: icon ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
        return { dir, file };
      };
      const left = [...root.querySelectorAll('[data-lcs-col="objects"] [data-lcs-item]')];
      const right = [...root.querySelectorAll('[data-lcs-col="organs"] [data-lcs-organ]')];
      if (left.length !== pairs) fails.push(`${left.length} objects ≠ pairs stamp ${pairs}`);
      if (right.length !== left.length) fails.push(`${right.length} organs ≠ ${left.length} objects`);
      if (left.length < 4 || left.length > 8) fails.push(`${left.length} objects outside the K range 4..8`);
      // left: distinct senses, one picture each, the stamped noun === the file, no text
      const senses = [], count = {}, nouns = new Set();
      left.forEach((el, i) => {
        const what = `object ${i + 1}`;
        const s = el.dataset.lcsSense;
        if (!SENSES.includes(s)) fails.push(`${what}: sense "${s}"`);
        senses.push(s);
        count[s] = (count[s] || 0) + 1;
        const noun = (el.dataset.lcsItem || '').split('/').pop();
        if (nouns.has(noun)) fails.push(`${what}: noun "${noun}" appears twice`);
        nouns.add(noun);
        const p = pic(el, what);
        if (p && p.file !== noun) fails.push(`${what}: picture "${p.file}" ≠ stamped noun "${noun}"`);
        if (p && p.dir === 'body parts') fails.push(`${what}: an organ picture on the object side`);
        if (el.textContent.trim()) fails.push(`${what}: prints text`);
      });
      if (new Set(senses).size !== senses.length) fails.push(`senses ${senses.join(',')} are not distinct (an organ would take two lines)`);
      for (const [s, c] of Object.entries(count)) if (c > maxPerSense) fails.push(`${c} objects of ${s} > maxPerSense ${maxPerSense}`);
      // right: the organ files each once, organ === ORGAN_OF[sense] (or the taste 'mouth' override), no row straight across
      const organs = [];
      right.forEach((el, i) => {
        const what = `organ ${i + 1}`;
        const o = el.dataset.lcsOrgan, s = el.dataset.lcsSense;
        organs.push(o);
        if (!SENSES.includes(s)) fails.push(`${what}: sense "${s}"`);
        const want = ORGAN_OF[s];
        if (!(o === want || (s === 'taste' && o === 'mouth'))) fails.push(`${what}: organ "${o}" is not the organ of ${s} (${want})`);
        const p = pic(el, what);
        if (p && (p.dir !== 'body parts' || p.file !== o)) fails.push(`${what}: picture ${p.dir}/${p.file} ≠ body parts/${o}`);
        if (left[i] && left[i].dataset.lcsSense === s) fails.push(`row ${i + 1}: the ${o} sits straight across from its object`);
        const w = el.querySelectorAll('.fs-organ-word');
        if (words) { if (w.length !== 1 || !w[0].textContent.trim()) fails.push(`${what}: organWords set but no verb printed`); }
        else if (el.textContent.trim()) fails.push(`${what}: prints text`);
      });
      if (new Set(organs).size !== organs.length) fails.push(`organs ${organs.join(',')} repeat`);
      if ([...organs].sort().join() !== senses.map((s) => (s === 'taste' && organs.includes('mouth')) ? 'mouth' : ORGAN_OF[s]).sort().join()) fails.push(`organs ${organs.join(',')} are not the organs of the senses ${senses.join(',')}`);
      // a printed word can only be a d3 organ verb; the object side never prints
      const printed = [...root.querySelectorAll('.fs-organ-word')].map((e) => e.textContent.trim().toLocaleLowerCase());
      if (new Set(printed).size !== printed.length) fails.push('two organs print the same verb');
      if (!words && root.textContent.trim()) fails.push('text inside .ws-match on a wordless base');
      // dots + geometry: every object has a right-edge dot, every organ a left-edge dot; the stage sits inside the body above the footer
      left.forEach((el, i) => { if (!el.querySelector('.ws-match-dot--right')) fails.push(`object ${i + 1}: no dot`); });
      right.forEach((el, i) => { if (!el.querySelector('.ws-match-dot--left')) fails.push(`organ ${i + 1}: no dot`); });
      const body = document.querySelector('[data-lcs-body]');
      const foot = document.querySelector('.ws-foot');
      const rr = root.getBoundingClientRect();
      if (body) { const b = body.getBoundingClientRect(); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6) fails.push('stage outside the body column'); }
      if (foot) { const ft = foot.getBoundingClientRect().top; [...left, ...right].forEach((el, i) => { if (el.getBoundingClientRect().bottom > ft + 0.6) fails.push(`item ${i + 1} reaches into the footer band`); }); }
      // the line zone: the object dots and the organ dots leave a pencil zone between them
      const ld = left[0] && left[0].querySelector('.ws-match-dot--right'), rd = right[0] && right[0].querySelector('.ws-match-dot--left');
      if (ld && rd) { const zone = rd.getBoundingClientRect().left - ld.getBoundingClientRect().right; if (zone < 120) fails.push(`line zone ${Math.round(zone)} px < 120`); }
      return fails;
    });
  },
};
