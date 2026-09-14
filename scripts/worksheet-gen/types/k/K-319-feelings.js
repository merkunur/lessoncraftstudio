/**
 * K-319 — Feelings: Match the Face to the Word (nt20-C; family key `feelings`
 * — ruled 2026-09-14: the THEME axis owns `emotions`, which stays the name of
 * the picture directory the faces come from; K; L.K.5).
 * Design: docs/worksheet-gen/b3-designs/K-319-emotions.md §2/§5 (read every
 * `emotions` family key there as `feelings`).
 *
 * The child READS A FEELING off a yellow face and connects it to the feeling
 * WORD: six faces down the left on WHITE tiles, six feeling words down the
 * right on cream tiles in a deranged order, a coral dot each side; one pencil
 * line per face. No numerals, no bank, no scene, no printed ring. The picture
 * is read first (K reads pictures before words); the word is the only text
 * decoded. Faces = `emotions/<noun>` via fileUri; words = the panel's
 * citation literals from data/b3/feelings.js (never image-vocabulary.js at
 * render — the vocab is a spelling cross-check in the gate).
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the faces ARE the theme; the
 * enumerator emits one instance per (type, difficulty, locale). Fan lever =
 * the FEELING SET + the derangement per seed.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   pairs        rows on the page (verify: 4 <= pairs <= 8)
 *   pool         feeling ids the page may draw (null = every `matchable` id);
 *                d1 keeps the two O-mouth faces (scared / surprised) apart
 *   picPx        face size (type floor 72 >= the K token floor 56)
 *   tileL/tileR  tile widths; itemH the tile height (6 × 108 + 5 × 12 = 708
 *                fits the 710 px .ws-match inner height at the 722 body floor)
 *   wordPx       the word size (Baloo 2 700)
 *   shuffleLeft  d3 shuffles the face column too (recorded as not a distinct move)
 * A locale whose bank has fewer `matchable` words than `pairs` THROWS (refusal).
 *
 * Answer hiding: tiles carry the feeling ID (data-lcs-face / data-lcs-word),
 * never the text on the face side; each word text appears once; verify()
 * re-derives the derangement and the id sets from the stamps.
 *
 * PHASE 2 (2026-09-14) — the ADDITIVE `layout` knob (design §3; the faces are
 * rows in tools/b3var-rows/feelings.js that set it in the difficulty config;
 * the base's own configs carry no `layout`, so the base path below is
 * byte-identical — tools/b3-baseline.js is the proof). Stamped on the root as
 * data-lcs-layout ONLY when declared (the base record's item 3: never reuse
 * data-lcs-face, which the base's LEFT tiles already carry):
 *   'scene'   F1 K-331 — INFER a feeling from a pictured situation, ring one
 *             of `choices` faces. cards / choices / minFeelings / maxPerFeeling
 *             / objPx / tilePx / facePx. Scenes = bank.scenes minus bank.veto;
 *             the page needs >= minFeelings distinct correct feelings, none on
 *             more than maxPerFeeling cards, >= 4 cards (else REFUSE); a
 *             capacity below `cards` (a veto) shrinks the page and an odd
 *             count centres the last card (feelingSceneGrid). Decoys = accepted
 *             faces minus the feeling minus alsoPlausible. The correct tile
 *             takes >= 2 distinct positions over the page.
 *   'draw'    F2 K-332 — OPEN-ENDED: the feeling WORD over an empty circle;
 *             cards / pool / wordPx / d. verify() = structure only.
 *   'choice'  F4 K-334 — RECEPTIVE identification, one word + `choices`
 *             faces per row, every row independent (no elimination);
 *             rows / choices / confusable / wordPx / wordW / tilePx / facePx.
 *             confusable:false keeps the bank's near pairs (scared <->
 *             surprised) out of one row; the correct tile takes every
 *             position at least once over the page.
 *   'checkin' F5 K-335 — OPEN-ENDED self-report: today literal + `faces`
 *             labelled tiles / draw literal + blank face / `rows` ruling rows
 *             with the `because` starter; labelPx from bank.checkin.labelPx
 *             (18, or 17 where a panel's word overflows the 94 px tile).
 *             verify() = structure only.
 * F3 (K-333, feels good / feels bad) is a makeScienceCategorySort instance in
 * its own handwritten spec (types/k/K-333-feelings-feels-good-or-bad.js).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const C3 = require('../../templates/components-b3.js');
const { feelingMatch } = C3;

const BANK = 'feelings';
/** The six faces a K child can read without the word (design §1 / §4; the gate asserts the bank agrees). */
const ACCEPTED = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];

function derange(rng, n) {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  let order;
  do { order = rng.shuffle(Array.from({ length: n }, (_, i) => i)); }
  while (order.some((v, i) => v === i));
  return order;
}

/** Positions of the correct tile over N rows of `choices` tiles: shuffled until >= `distinct` positions appear. */
function spreadPositions(rng, n, choices, distinct) {
  const need = Math.min(distinct, choices, n);
  let pos, guard = 0;
  do { pos = Array.from({ length: n }, () => rng.int(0, choices - 1)); }
  while (new Set(pos).size < need && ++guard < 200);
  if (new Set(pos).size < need) throw new Error(`K-319: could not spread the correct tile over ${need} positions`);
  return pos;
}

module.exports = {
  id: 'K-319',
  slug: 'feelings',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'feelings',
  themeAxis: { applicable: false },
  difficulty: {
    1: { pairs: 4, pool: ['happy', 'sad', 'angry', 'tired'], picPx: 100, tileL: 180, tileR: 260, itemH: 168, wordPx: 30, shuffleLeft: false },
    2: { pairs: 6, pool: null, picPx: 80, tileL: 160, tileR: 260, itemH: 108, wordPx: 28, shuffleLeft: false },
    3: { pairs: 6, pool: null, picPx: 72, tileL: 160, tileR: 260, itemH: 108, wordPx: 26, shuffleLeft: true },
  },
  i18n: {
    en: {
      title: 'Feelings: Match the Face to the Word',
      instruction: 'Draw a line from each face to the feeling word that says how it feels.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-319: no difficulty ' + difficulty);
    if (d.layout) return this._buildFace(bank, d, (locale || 'en').slice(0, 2), ctx);   // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!(d.pairs >= 4 && d.pairs <= 8)) throw new Error(`K-319: pairs ${d.pairs} outside the K page rule 4..8`);
    if (d.picPx < 72) throw new Error(`K-319: picPx ${d.picPx} < the type floor 72`);

    // the pool: matchable faces, optionally narrowed by the config's id list
    const matchable = (bank.feelings || []).filter((f) => f.matchable === true);
    for (const f of matchable) {
      if (!ACCEPTED.includes(f.id)) throw new Error(`K-319: bank marks "${f.id}" matchable; only ${ACCEPTED.join('/')} are accepted faces`);
      if (!f.word || !f.face || !f.face.noun) throw new Error(`K-319: matchable "${f.id}" without a word or a face`);
    }
    const pool = d.pool ? matchable.filter((f) => d.pool.includes(f.id)) : matchable;
    if (pool.length < d.pairs) throw new Error(`K-319: ${loc} has ${pool.length} matchable feelings${d.pool ? ' in the pool ' + d.pool.join('/') : ''}, need ${d.pairs} (refuse)`);
    const chosen = pool.length === d.pairs ? pool.slice() : rng.sample(pool, d.pairs);
    const left = d.shuffleLeft ? rng.shuffle(chosen) : chosen;
    const seen = new Set();
    for (const f of left) {
      const w = f.word.toLocaleLowerCase(loc);
      if (seen.has(w)) throw new Error(`K-319: two feelings print the same word "${f.word}" in ${loc}`);
      seen.add(w);
    }
    const order = derange(rng, left.length);
    const right = order.map((i) => left[i]);

    const bodyHtml = feelingMatch({
      left: left.map((f) => ({ id: f.id, src: fileUri(f.face.theme, f.face.noun) })),
      right: right.map((f) => ({ id: f.id, word: f.word })),
      tileL: d.tileL, tileR: d.tileR, itemH: d.itemH, picPx: d.picPx, wordPx: d.wordPx,
    });
    return { bodyHtml, meta: { pairs: left.map((f) => f.id), order, words: right.map((f) => f.word) } };
  },

  /* ------------------------------------------------------------ Phase 2 faces */
  /** The matchable faces of a bank, guarded like the base (accepted ids, word + picture present, distinct words). */
  _matchable(bank, loc) {
    const matchable = (bank.feelings || []).filter((f) => f.matchable === true);
    const seen = new Set();
    for (const f of matchable) {
      if (!ACCEPTED.includes(f.id)) throw new Error(`K-319: bank marks "${f.id}" matchable; only ${ACCEPTED.join('/')} are accepted faces`);
      if (!f.word || !f.face || !f.face.noun) throw new Error(`K-319: matchable "${f.id}" without a word or a face`);
      const w = f.word.toLocaleLowerCase(loc);
      if (seen.has(w)) throw new Error(`K-319: two feelings print the same word "${f.word}" in ${loc}`);
      seen.add(w);
    }
    return matchable;
  },

  _buildFace(bank, d, loc, ctx) {
    const facePx = d.facePx == null ? 72 : d.facePx;
    if (facePx < 72) throw new Error(`K-319: facePx ${facePx} < the type floor 72`);
    switch (d.layout) {
      case 'scene': return this._buildScene(bank, d, loc, ctx);
      case 'draw': return this._buildDraw(bank, d, loc, ctx);
      case 'choice': return this._buildChoice(bank, d, loc, ctx);
      case 'checkin': return this._buildCheckin(bank, d, loc, ctx);
      default: throw new Error(`K-319: unknown layout "${d.layout}"`);
    }
  },

  /** F1 — How Do You Feel? Circle the Face. */
  _buildScene(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const cards = d.cards, choices = d.choices, minFeelings = d.minFeelings, maxPer = d.maxPerFeeling;
    if (!(choices >= 2 && choices <= 3)) throw new Error(`K-319 scene: choices ${choices} outside 2..3 (three 84 px tiles fill the 294 px stage)`);
    const matchable = this._matchable(bank, loc);
    const byId = Object.fromEntries(matchable.map((f) => [f.id, f]));
    const veto = new Set(bank.veto || []);
    const live = (bank.scenes || []).filter((s) => !veto.has(s.id) && ACCEPTED.includes(s.feeling) && byId[s.feeling]);
    for (const s of live) for (const o of s.objects || []) fileUri(o.theme, o.noun);   // every cue resolves, or the build throws
    // per feeling: a shuffled, OBJECT-DISJOINT run of its scenes capped at maxPer (pillow-moon and pajamas-moon
    // share space/moon — "no object twice" is a page rule, so the sampler never offers both);
    // capacity = the sum of those runs; the page is min(cards, capacity), never below 4
    const byFeeling = {};
    for (const s of live) (byFeeling[s.feeling] = byFeeling[s.feeling] || []).push(s);
    const feelings = rng.shuffle(Object.keys(byFeeling));
    if (feelings.length < minFeelings) throw new Error(`K-319 scene: ${loc} has ${feelings.length} feelings with a live scene < ${minFeelings} (refuse)`);
    const usedObj = new Set();
    const runs = {};
    for (const f of feelings) {
      runs[f] = [];
      for (const s of rng.shuffle(byFeeling[f])) {
        if (runs[f].length >= maxPer) break;
        const refs = (s.objects || []).map((o) => `${o.theme}/${o.noun}`);
        if (refs.some((r) => usedObj.has(r))) continue;
        refs.forEach((r) => usedObj.add(r));
        runs[f].push(s);
      }
    }
    const capacity = feelings.reduce((n, f) => n + runs[f].length, 0);
    const n = Math.min(cards, capacity);
    if (n < 4) throw new Error(`K-319 scene: ${loc} can fill ${capacity} cards < 4 (refuse)`);
    // round-robin over the feelings: every feeling gets a card before any gets a second (>= minFeelings by construction)
    const counts = Object.fromEntries(feelings.map((f) => [f, 0]));
    let placed = 0;
    for (let round = 0; placed < n; round++) {
      let any = false;
      for (const f of feelings) {
        if (placed >= n) break;
        if (counts[f] < runs[f].length && counts[f] === round) { counts[f]++; placed++; any = true; }
      }
      if (!any) throw new Error('K-319 scene: capacity miscount');
    }
    if (Object.values(counts).filter((k) => k > 0).length < minFeelings) throw new Error(`K-319 scene: ${loc} fills ${n} cards with fewer than ${minFeelings} feelings (refuse)`);
    let picked = [];
    for (const f of feelings) picked = picked.concat(runs[f].slice(0, counts[f]));
    picked = rng.shuffle(picked);
    const pos = spreadPositions(rng, picked.length, choices, 2);
    const seenObj = new Set();
    const cardsHtml = picked.map((s, i) => {
      const ap = new Set(s.alsoPlausible || []);
      const decoyPool = ACCEPTED.filter((id) => id !== s.feeling && !ap.has(id) && byId[id]);
      if (decoyPool.length < choices - 1) throw new Error(`K-319 scene: ${s.id} has ${decoyPool.length} decoys < ${choices - 1}`);
      const decoys = rng.sample(decoyPool, choices - 1);
      const tiles = decoys.slice();
      tiles.splice(pos[i], 0, s.feeling);
      const objects = (s.objects || []).map((o) => {
        const ref = `${o.theme}/${o.noun}`;
        if (seenObj.has(ref)) throw new Error(`K-319 scene: object ${ref} appears on two cards`);
        seenObj.add(ref);
        return { ref, src: fileUri(o.theme, o.noun) };
      });
      return C3.feelingSceneCard({
        sceneId: s.id, answer: s.feeling, correct: pos[i], objects,
        faces: tiles.map((id) => ({ id, src: fileUri(byId[id].face.theme, byId[id].face.noun) })),
        objPx: d.objPx, tilePx: d.tilePx, facePx: d.facePx,
      });
    });
    const grid = C3.feelingSceneGrid({ cards: cardsHtml, cols: 2 });
    const bodyHtml = `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="scene" ` +
      `data-lcs-cards="${picked.length}" data-lcs-choices="${choices}" data-lcs-minfeelings="${minFeelings}" data-lcs-maxper="${maxPer}">${grid}</div>`;
    return { bodyHtml, meta: { scenes: picked.map((s) => s.id), answers: picked.map((s) => s.feeling), correct: pos } };
  },

  /** F2 — Draw the Feeling Face (open-ended). */
  _buildDraw(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const matchable = this._matchable(bank, loc);
    const pool = d.pool ? matchable.filter((f) => d.pool.includes(f.id)) : matchable;
    if (pool.length < d.cards) throw new Error(`K-319 draw: ${loc} has ${pool.length} feelings in the pool, need ${d.cards} (refuse)`);
    if (d.cards < 4) throw new Error(`K-319 draw: cards ${d.cards} < 4`);
    const chosen = rng.shuffle(pool.length === d.cards ? pool.slice() : rng.sample(pool, d.cards));
    const cols = 2, rows = Math.ceil(chosen.length / cols);
    const cards = chosen.map((f) => C3.feelingDrawCard({ id: f.id, word: f.word, wordPx: d.wordPx, d: d.d }));
    const grid = C3.feelingSceneGrid({ cards, cols, rows });
    const bodyHtml = `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="draw" data-lcs-cards="${chosen.length}">${grid}</div>`;
    return { bodyHtml, meta: { words: chosen.map((f) => f.id) } };
  },

  /** F4 — Which Face Shows the Feeling? */
  _buildChoice(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const rows = d.rows, choices = d.choices;
    if (!(rows >= 4 && rows <= 6)) throw new Error(`K-319 choice: rows ${rows} outside 4..6`);
    if (!(choices >= 2 && choices <= 4)) throw new Error(`K-319 choice: choices ${choices} outside 2..4`);
    const matchable = this._matchable(bank, loc);
    if (matchable.length < rows) throw new Error(`K-319 choice: ${loc} has ${matchable.length} matchable feelings, need ${rows} (refuse)`);
    if (matchable.length < choices) throw new Error(`K-319 choice: ${loc} has ${matchable.length} matchable feelings < ${choices} tiles`);
    const byId = Object.fromEntries(matchable.map((f) => [f.id, f]));
    const targets = rng.shuffle(matchable.length === rows ? matchable.slice() : rng.sample(matchable, rows));
    const pos = spreadPositions(rng, rows, choices, choices);
    const lanes = targets.map((t, i) => {
      // confusable:false keeps the bank's near pair out of one row, read from BOTH sides (t.confusable and f.confusable)
      const avoid = new Set(d.confusable ? [] : (t.confusable || []));
      const pool = matchable.filter((f) => f.id !== t.id && !avoid.has(f.id) && (d.confusable || !(f.confusable || []).includes(t.id)));
      if (pool.length < choices - 1) throw new Error(`K-319 choice: ${t.id} has ${pool.length} distractors < ${choices - 1}`);
      const decoys = rng.sample(pool, choices - 1).map((f) => f.id);
      const tiles = decoys.slice();
      tiles.splice(pos[i], 0, t.id);
      return C3.feelingChoiceLane({
        id: t.id, word: t.word, wordPx: d.wordPx, wordW: d.wordW, correct: pos[i],
        faces: tiles.map((id) => ({ id, src: fileUri(byId[id].face.theme, byId[id].face.noun) })),
        tilePx: d.tilePx, facePx: d.facePx,
      });
    });
    const bodyHtml = `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="choice" ` +
      `data-lcs-rows="${rows}" data-lcs-choices="${choices}" data-lcs-confusable="${d.confusable ? 1 : 0}">${C3.feelingChoicePage({ lanes, minRow: d.minRow })}</div>`;
    return { bodyHtml, meta: { targets: targets.map((t) => t.id), correct: pos } };
  },

  /** F5 — How Do I Feel Today? (open-ended). */
  _buildCheckin(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const matchable = this._matchable(bank, loc);
    if (matchable.length < d.faces) throw new Error(`K-319 checkin: ${loc} has ${matchable.length} matchable feelings, need ${d.faces} (refuse)`);
    if (d.faces < 4) throw new Error(`K-319 checkin: faces ${d.faces} < 4`);
    const c = bank.checkin || {};
    if (typeof c.today !== 'string' || !c.today.trim() || c.today.includes('{')) throw new Error(`K-319 checkin: ${loc} today literal missing or carries a slot`);
    if (typeof c.draw !== 'string' || !c.draw.trim()) throw new Error(`K-319 checkin: ${loc} draw literal missing`);
    const labelPx = c.labelPx || 18;
    if (labelPx < 17 || labelPx > 18) throw new Error(`K-319 checkin: labelPx ${labelPx} outside 17..18`);
    // the six faces in bank order (a check-in is a fixed palette, not a puzzle); the seed only re-rolls nothing here
    const faces = (matchable.length === d.faces ? matchable.slice() : rng.sample(matchable, d.faces))
      .map((f) => ({ id: f.id, label: f.word, src: fileUri(f.face.theme, f.face.noun) }));
    const bodyHtml = `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="checkin" data-lcs-faces="${faces.length}" data-lcs-rows="${d.rows}">` +
      C3.feelingCheckIn({ today: c.today, draw: c.draw, because: c.because || null, faces, labelPx, facePx: d.facePx, d: d.d, rows: d.rows }) + `</div>`;
    return { bodyHtml, meta: { faces: faces.map((f) => f.id) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ACCEPTED = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
      const CONFUSABLE = { scared: ['surprised'], surprised: ['scared'] };   // the one near pair in the opened art (design §4)
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)\b/i;
      const root = document.querySelector('[data-ws-content][data-lcs-feelings]');
      if (!root) return ['no feelings root'];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const pic = (im, what) => {
        if (!im) { fails.push(`${what}: no picture`); return null; }
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt text names the answer`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts.slice(-2, -1)[0] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 72 - 0.6) fails.push(`${what}: icon ${Math.round(Math.min(r.width, r.height))} px < 72`);
        return { dir, noun: parts.pop().replace(/@3x\.webp$/, '') };
      };
      const checkTile = (t, what) => {
        const id = t.dataset.lcsChoice;
        if (!ACCEPTED.includes(id)) fails.push(`${what}: "${id}" is not an accepted feeling`);
        const p = pic(t.querySelector('img'), what);
        if (p && p.noun !== id) fails.push(`${what}: picture "${p.noun}" ≠ stamped feeling "${id}"`);
        if (p && p.dir !== 'emotions') fails.push(`${what}: face from "${p.dir}", not the emotions dir`);
        const r = t.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 84 - 0.6) fails.push(`${what}: tile ${Math.round(Math.min(r.width, r.height))} px < 84`);
        return id;
      };
      const layout = root.dataset.lcsLayout;

      /* ---------------- F1 scene ---------------- */
      if (layout === 'scene') {
        const cards = [...root.querySelectorAll('[data-lcs-scene]')];
        const n = cards.length;
        const choices = +root.dataset.lcsChoices, maxPer = +root.dataset.lcsMaxper, minF = +root.dataset.lcsMinfeelings;
        if (+root.dataset.lcsCards !== n) fails.push(`cards stamp ${root.dataset.lcsCards} ≠ ${n} scene cards`);
        if (n < 4 || n > 8) fails.push(`${n} cards outside 4..8`);
        const perFeeling = {}, positions = new Set(), objs = new Set(), sceneIds = new Set();
        cards.forEach((c, i) => {
          const what = `card ${i + 1}`;
          const ans = c.dataset.lcsAnswer, sid = c.dataset.lcsScene;
          if (sceneIds.has(sid)) fails.push(`${what}: scene "${sid}" appears twice`); sceneIds.add(sid);
          if (!ACCEPTED.includes(ans)) fails.push(`${what}: answer "${ans}" is not an accepted feeling`);
          perFeeling[ans] = (perFeeling[ans] || 0) + 1;
          if (c.textContent.trim()) fails.push(`${what}: prints text`);
          const imgs = [...c.querySelectorAll('[data-lcs-scene-obj]')];
          if (imgs.length < 1 || imgs.length > 2) fails.push(`${what}: ${imgs.length} scene objects (1..2)`);
          imgs.forEach((im, k) => {
            const ref = im.dataset.lcsSceneObj;
            if (objs.has(ref)) fails.push(`${what}: object ${ref} already on another card`); objs.add(ref);
            const p = pic(im, `${what} object ${k + 1}`);
            if (p && `${p.dir}/${p.noun}` !== ref) fails.push(`${what}: object picture ${p.dir}/${p.noun} ≠ stamp ${ref}`);
          });
          const tiles = [...c.querySelectorAll('[data-lcs-choice]')];
          if (tiles.length !== choices) fails.push(`${what}: ${tiles.length} tiles ≠ ${choices}`);
          const ids = tiles.map((t, k) => checkTile(t, `${what} tile ${k + 1}`));
          if (new Set(ids).size !== ids.length) fails.push(`${what}: a face appears twice`);
          const hits = ids.filter((x) => x === ans).length;
          if (hits !== 1) fails.push(`${what}: the answer "${ans}" is on ${hits} tiles`);
          const ci = +c.dataset.lcsCorrect;
          if (ids[ci] !== ans) fails.push(`${what}: correct stamp ${ci} points at "${ids[ci]}", not "${ans}"`);
          positions.add(ci);
        });
        for (const [f, k] of Object.entries(perFeeling)) if (k > maxPer) fails.push(`"${f}" is the answer on ${k} cards > ${maxPer}`);
        if (Object.keys(perFeeling).length < minF) fails.push(`${Object.keys(perFeeling).length} distinct answers < ${minF}`);
        if (n >= 4 && positions.size < Math.min(2, choices)) fails.push(`the correct tile sits in position ${[...positions].join()} on every card`);
        return fails;
      }

      /* ---------------- F2 draw (structure only) ---------------- */
      if (layout === 'draw') {
        const cards = [...root.querySelectorAll('[data-lcs-drawcard]')];
        if (+root.dataset.lcsCards !== cards.length) fails.push(`cards stamp ${root.dataset.lcsCards} ≠ ${cards.length}`);
        if (cards.length < 4 || cards.length > 6) fails.push(`${cards.length} draw cards outside 4..6`);
        const ids = [], texts = [];
        cards.forEach((c, i) => {
          const what = `card ${i + 1}`;
          const w = c.querySelector('[data-lcs-word]');
          if (!w || !w.textContent.trim()) fails.push(`${what}: no printed feeling word`);
          else { ids.push(w.dataset.lcsWord); texts.push(w.textContent.trim().toLocaleLowerCase(lang)); if (!ACCEPTED.includes(w.dataset.lcsWord)) fails.push(`${what}: "${w.dataset.lcsWord}" is not an accepted feeling`); if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`${what}: word clipped`); }
          const faces = c.querySelectorAll('[data-lcs-blankface]');
          if (faces.length !== 1) fails.push(`${what}: ${faces.length} blank faces`);
          else {
            const f = faces[0];
            if (f.querySelectorAll('*').length !== 1) fails.push(`${what}: the blank face is not empty (features drawn)`);
            if (+f.dataset.lcsBlankface < 140) fails.push(`${what}: blank face ${f.dataset.lcsBlankface} px < 140`);
          }
          if (c.querySelector('img')) fails.push(`${what}: a model face is printed (the child draws it)`);
        });
        if (new Set(ids).size !== ids.length) fails.push('a feeling appears on two cards');
        if (new Set(texts).size !== texts.length) fails.push('two cards print the same word');
        return fails;
      }

      /* ---------------- F4 choice ---------------- */
      if (layout === 'choice') {
        const rows = [...root.querySelectorAll('[data-lcs-row]')];
        const choices = +root.dataset.lcsChoices, conf = root.dataset.lcsConfusable === '1';
        if (+root.dataset.lcsRows !== rows.length) fails.push(`rows stamp ${root.dataset.lcsRows} ≠ ${rows.length}`);
        if (rows.length < 4 || rows.length > 6) fails.push(`${rows.length} rows outside 4..6`);
        const targets = [], positions = new Set();
        rows.forEach((r, i) => {
          const what = `row ${i + 1}`;
          const t = r.dataset.lcsTarget;
          if (!ACCEPTED.includes(t)) fails.push(`${what}: target "${t}" is not an accepted feeling`);
          targets.push(t);
          const w = r.querySelector('[data-lcs-targetword]');
          if (!w || !w.textContent.trim()) fails.push(`${what}: no printed word`);
          else if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`${what}: word "${w.textContent.trim()}" wider than its column`);
          const tiles = [...r.querySelectorAll('[data-lcs-choice]')];
          if (tiles.length !== choices) fails.push(`${what}: ${tiles.length} tiles ≠ ${choices}`);
          const ids = tiles.map((tile, k) => checkTile(tile, `${what} tile ${k + 1}`));
          if (new Set(ids).size !== ids.length) fails.push(`${what}: a face appears twice`);
          const hits = ids.filter((x) => x === t).length;
          if (hits !== 1) fails.push(`${what}: the target "${t}" is on ${hits} tiles`);
          const ci = +r.dataset.lcsCorrect;
          if (ids[ci] !== t) fails.push(`${what}: correct stamp ${ci} points at "${ids[ci]}", not "${t}"`);
          positions.add(ci);
          if (!conf) for (const id of ids) if (id !== t && (CONFUSABLE[t] || []).includes(id)) fails.push(`${what}: distractor "${id}" is confusable with "${t}"`);
          // the tiles sit inside the lane and the lane inside the body
          const lr = r.getBoundingClientRect();
          tiles.forEach((tile, k) => { const tr = tile.getBoundingClientRect(); if (tr.top < lr.top - 0.6 || tr.bottom > lr.bottom + 0.6 || tr.right > lr.right + 0.6) fails.push(`${what} tile ${k + 1}: outside its lane`); });
        });
        if (new Set(targets).size !== targets.length) fails.push('a feeling is the target of two rows');
        if (rows.length >= choices && positions.size < choices) fails.push(`the correct tile takes ${positions.size} of ${choices} positions over the page`);
        return fails;
      }

      /* ---------------- F5 check-in (structure only) ---------------- */
      if (layout === 'checkin') {
        const tiles = [...root.querySelectorAll('[data-lcs-today] [data-lcs-choice]')];
        if (+root.dataset.lcsFaces !== tiles.length) fails.push(`faces stamp ${root.dataset.lcsFaces} ≠ ${tiles.length}`);
        if (tiles.length < 4 || tiles.length > 6) fails.push(`${tiles.length} faces outside 4..6`);
        const ids = tiles.map((t, k) => checkTile(t, `face ${k + 1}`));
        if (new Set(ids).size !== ids.length) fails.push('a face appears twice');
        const labels = [];
        tiles.forEach((t, k) => {
          const l = t.querySelector('[data-lcs-label]');
          if (!l || !l.textContent.trim()) fails.push(`face ${k + 1}: no word under the face`);
          else { labels.push(l.textContent.trim().toLocaleLowerCase(lang)); if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`face ${k + 1}: label "${l.textContent.trim()}" clipped in its tile`); }
        });
        if (new Set(labels).size !== labels.length) fails.push('two faces print the same word');
        const today = root.querySelector('[data-lcs-today-literal]');
        if (!today || !today.textContent.trim()) fails.push('no today literal');
        else if (today.textContent.includes('{')) fails.push('today literal carries a slot');
        const draw = root.querySelector('[data-lcs-draw-literal]');
        if (!draw || !draw.textContent.trim()) fails.push('no draw literal');
        const faces = root.querySelectorAll('[data-lcs-blankface]');
        if (faces.length !== 1) fails.push(`${faces.length} blank faces`);
        else if (faces[0].querySelectorAll('*').length !== 1) fails.push('the blank face is not empty');
        const ruling = root.querySelectorAll('[data-lcs-ruling-row]');
        if (ruling.length !== +root.dataset.lcsRows) fails.push(`${ruling.length} ruling rows ≠ stamp ${root.dataset.lcsRows}`);
        if (ruling.length < 1) fails.push('no ruling row');
        return fails;
      }

      /* ---------------- base ---------------- */
      const faces = [...root.querySelectorAll('[data-lcs-face]')];
      const words = [...root.querySelectorAll('[data-lcs-word]')];
      const left = faces.map((e) => e.dataset.lcsFace);
      const right = words.map((e) => e.dataset.lcsWord);
      const n = left.length;
      if (+root.dataset.lcsPairs !== n) fails.push(`pairs stamp ${root.dataset.lcsPairs} ≠ ${n} face tiles`);
      if (n < 4 || n > 8) fails.push(`${n} pairs outside 4..8`);
      if (right.length !== n) fails.push(`${right.length} word tiles ≠ ${n} face tiles`);
      left.forEach((id, i) => { if (!ACCEPTED.includes(id)) fails.push(`face ${i + 1}: "${id}" is not an accepted feeling`); });
      if (new Set(left).size !== n) fails.push('a feeling appears twice on the left');
      if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of the left');
      left.forEach((id, i) => { if (right[i] === id) fails.push(`row ${i + 1}: "${id}" sits straight across from its word (fixed point)`); });
      // each word text once, never on the face side
      const texts = words.map((e) => e.textContent.trim());
      texts.forEach((t, i) => { if (!t) fails.push(`word tile ${i + 1}: empty`); });
      if (new Set(texts.map((t) => t.toLocaleLowerCase(lang))).size !== texts.length) fails.push('two word tiles print the same word');
      faces.forEach((e, i) => {
        if (e.textContent.trim()) fails.push(`face tile ${i + 1}: prints text`);
        const img = e.querySelectorAll('img');
        if (img.length !== 1) { fails.push(`face tile ${i + 1}: ${img.length} pictures`); return; }
        const im = img[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`face tile ${i + 1}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`face tile ${i + 1}: alt text names the answer`);
        const dir = decodeURIComponent(im.src).split('/').slice(-2, -1)[0] || '';
        if (BW.test(dir)) fails.push(`face tile ${i + 1}: picture from a B&W directory "${dir}"`);
        const noun = decodeURIComponent(im.src).split('/').pop().replace(/@3x\.webp$/, '');
        if (noun !== e.dataset.lcsFace) fails.push(`face tile ${i + 1}: picture "${noun}" ≠ stamped feeling "${e.dataset.lcsFace}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 72 - 0.6) fails.push(`face tile ${i + 1}: icon ${Math.round(Math.min(r.width, r.height))} px < 72`);
      });
      // every word fits its tile (no clipped literal)
      words.forEach((e, i) => {
        const span = e.querySelector('span:not(.ws-match-dot)');
        if (span && span.scrollWidth > e.clientWidth + 0.6) fails.push(`word tile ${i + 1}: "${span.textContent.trim()}" wider than its tile`);
      });
      return fails;
    });
  },
};
