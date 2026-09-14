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
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { candidates, pictureFor } = require('../../lib/b3-picture-index.js');
const { fileUri, displayWord } = require('../../lib/b2-common.js');
const { compare } = require('../../data/b2/collation.js');
const { wordBank } = require('../../templates/components-b2.js');
const { compoundRow } = require('../../templates/components-b3.js');

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

  async verify(page) {
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
