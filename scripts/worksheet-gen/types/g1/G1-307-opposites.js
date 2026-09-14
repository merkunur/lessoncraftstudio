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
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { fileUri } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { wordBank } = require('../../templates/components-b2.js');
const { oppositeCard } = require('../../templates/components-b3.js');

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

  async verify(page) {
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
