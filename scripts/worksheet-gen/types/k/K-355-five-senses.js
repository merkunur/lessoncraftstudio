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
 * (NOT built in this commission — it refuses by name). `coordinate.mode` on
 * the landing side is the face's mode string (base = 'base').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const C4 = require('../../templates/components-b4.js');
const GLOBAL = require('../../data/science/five-senses.json');

const BANK = 'five-senses';
const SENSES = ['hear', 'see', 'smell', 'taste', 'touch'];
const ORGAN_OF = { hear: 'ear', see: 'eye', smell: 'nose', taste: 'tongue', touch: 'hand' };
const ORGAN_THEME = 'body parts';
const POOLS = ['strong', 'strong+signed'];
const FACES = ['sort', 'which', 'odd', 'label', 'write'];
const STACK_CEILING = 677;     // the fi four-line-title body (README ruling)
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

  /* ------------------------------------------------------------ Phase 2 faces (NOT built in this commission) */
  _buildFace(bankData, d) {
    if (!FACES.includes(d.layout)) throw new Error(`K-355: unknown layout "${d.layout}"`);
    throw new Error(`K-355: face layout "${d.layout}" is Phase 2 — not built (the base carries the knob; see design §3)`);
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require). */
  async verify(page) {
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
