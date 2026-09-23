/**
 * G2-358 — Synonyms (nt10-E; family key `synonyms`, G2, letters, CCSS L.2.5
 * parent; synonyms are only NAMED at L.4.5.c).
 * Design: docs/worksheet-gen/b5-designs/G2-358-synonyms.md §2 + §5; rulings
 * _work/G2-358-critic.md; build record _work/G2-358-build.md.
 *
 * "Linked Words: eight twin cards". Eight identical cream cards in a 2 x 4
 * grid; each card is topped by a tealSoft BAND carrying the joined-rings mark
 * and ONE big target word, and under it a 2 x 2 square of four identical white
 * word TAGS. The child circles the one tag that means the same. No pictures,
 * no lines, no bank; the four tags are the same width (the grid cell), so no
 * colour, order, size or length marks the answer.
 *
 * THEME AXIS OFF (`coordinate.theme:''`); no unitAxis. build() reads ONLY its
 * bank (lib/b5-common.js bank('synonyms', loc): a missing locale block THROWS)
 * and the opposites bank (lib/b3-common.js bank('opposites', loc)) for the
 * antonym ban; every word is a whole panel-signed literal, nothing inflects.
 * Never image-vocabulary.js / objForms / approved-words at render.
 *
 * THE RULE THAT LOCKS THE TYPE (§1): a card is single-answer because exactly
 * one tag shares the target's group; no tag is an antonym of the target or the
 * answer (opposites pairs a<->b + alt, the G2-320 prefix items, and the
 * locale-neutral CONCEPTS[].opp link — the opposites bank alone would pass a
 * `gloomy` foil on a `happy` card); no tag's GROUP holds a word `near` a word
 * of the target's group; no two tags share a group; every tag has the target's
 * part of speech; at most `sameDomainMax` tags share the target's domain.
 *
 * COMPOSER (locale-neutral over CONCEPT ids): a seeded permutation of CONCEPTS;
 * the first posMix[0] adj + posMix[1] verb concepts the locale signed at a
 * configured tier become the targets (card order = draw order); per card a
 * seeded member is the target and another the answer; distractor GROUPS are
 * never a target group of the page, the words all distinct on the page. Answer
 * slots = a shuffle of the balanced multiset (each slot exactly cards/chips
 * times) re-drawn until no slot repeats on three consecutive cards.
 *
 * Ladder (resolved config; every guard keys on these keys, never the level index):
 *   d1  6 cards 2x3 · 3 tags STACKED ('3x1') · tiers [1] · 6 adj · 0 same-domain foils
 *       · target 26 / tag 20 px x 38 · rows minmax(210) (deviation: the design's 1x3
 *       row of 91.5 px tags left a 48 px blank band at the 814 chrome — SPARSE)
 *   d2  8 cards 2x4 · 4 tags 2x2 · tiers [1,2] · 5 adj + 3 verb · <= 1 same-domain foil
 *       · target 24 / tag 18 px x 36 · rows minmax(158) · row gap 10 (design 12: 4 x 158 + 3 x 12
 *       = 668 > the MEASURED 667 fi body; 4 x 158 + 3 x 10 = 662)          (ships)
 *   d3  as d2, tiers [2] · 4 adj + 4 verb · exactly 1 same-domain foil
 *
 * STAMPS: root data-lcs-type / -family / -face="base" / -cfg / -lex (the page's
 * lexicon slice: its groups, the near pairs, each printed word's antonyms, the
 * prefix items, the concept links) so verify() re-derives everything in the page;
 * card data-lcs-target="<groupId>:<word>" data-lcs-concept data-lcs-domain; tag
 * data-lcs-tag data-lcs-group data-lcs-slot. NO data-lcs-answer anywhere.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const { bank: loadB3 } = require('../../lib/b3-common.js');
const C5 = require('../../templates/components-b5.js');
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const DATA = require('../../data/b5/synonyms.js');

const ID = 'G2-358';
const KEY = 'synonyms';
const FACE_MODES = ['pictures', 'pairs', 'shades', 'say', 'fields'];
const PAGE_TRIES = 300;
const SLOT_TRIES = 400;
const SPARSE_MAX = 40;
const BODY_MIN = 667;   // measured: the longest fi chrome (4-line title + 3-line instruction) leaves 667, not the ruled 677

/** Case-folded, NFC. */
function norm(s) { return String(s).normalize('NFC').toLowerCase(); }

function stringsFor(block, mode, loc) {
  const s = block && block.strings && block.strings[mode];
  if (!s || typeof s.title !== 'string' || !s.title.trim() || typeof s.instruction !== 'string' || !s.instruction.trim()) throw new Error(`${ID}: the ${loc} bank has no strings.${mode} — refuse`);
  return s;
}

/** Antonym lookup over the opposites bank of `loc` (pairs a<->b with alt, prefix items). THROWS without the bank. */
function antonymTable(loc) {
  const ob = loadB3('opposites', loc);
  const ant = new Map();
  const add = (w, xs) => { const k = norm(w); if (!ant.has(k)) ant.set(k, new Set()); for (const x of xs) ant.get(k).add(norm(x)); };
  for (const p of ob.pairs || []) {
    const A = [p.a, ...((p.alt && p.alt.a) || [])], B = [p.b, ...((p.alt && p.alt.b) || [])];
    for (const w of A) add(w, B);
    for (const w of B) add(w, A);
  }
  const prefix = new Set(((ob.prefix && ob.prefix.items) || []).map((x) => norm(x.expected)));
  return { antonymsOf: (w) => [...(ant.get(norm(w)) || [])], prefix };
}

/** The locale's groups by concept, with the neutral concept row joined; refuses a malformed group. */
function groupsByConcept(block, loc) {
  const m = new Map();
  for (const g of block.groups || []) {
    if (!g || !g.id || !g.concept || !Array.isArray(g.words) || g.words.length < 2) throw new Error(`${ID}: the ${loc} group ${g && g.id} is malformed — refuse`);
    if (m.has(g.concept)) throw new Error(`${ID}: the ${loc} bank signs concept "${g.concept}" twice — refuse`);
    m.set(g.concept, g);
  }
  return m;
}

function nearSet(block) {
  const s = new Set();
  for (const n of block.near || []) { s.add(norm(n.a) + '|' + norm(n.b)); s.add(norm(n.b) + '|' + norm(n.a)); }
  return s;
}

function slotOrder(cfg, rng) {
  const per = cfg.cards / cfg.chips;
  const base = [];
  for (let s = 0; s < cfg.chips; s++) for (let k = 0; k < per; k++) base.push(s);
  for (let t = 0; t < SLOT_TRIES; t++) {
    const o = rng.shuffle(base);
    if (!o.some((v, i) => i >= 2 && o[i - 1] === v && o[i - 2] === v)) return o;
  }
  throw new Error(`${ID}: no slot order without a 3-in-a-row in ${SLOT_TRIES} tries`);
}

/**
 * One page draw. Returns { cards:[{target, answer, group, distractors:[{word, group}]}] } or null (retry).
 * Pure over (block, cfg, rng, lookups); no locale literal is inferred.
 */
function drawPage(block, cfg, rng, L) {
  const byConcept = L.byConcept;
  const perm = rng.shuffle(DATA.CONCEPTS.map((c) => c.id));
  const need = { adj: cfg.posMix[0], verb: cfg.posMix[1] };
  const picked = [];
  for (const cid of perm) {
    const g = byConcept.get(cid);
    if (!g || !cfg.tiers.includes(g.tier)) continue;
    if (need[g.pos] > 0) { need[g.pos]--; picked.push(g); }
  }
  if (need.adj > 0 || need.verb > 0) throw new Error(`${ID}: the ${L.loc} bank signs too few tier-${cfg.tiers.join('/')} groups for ${cfg.posMix[0]} adj + ${cfg.posMix[1]} verb targets — refuse`);
  const used = new Set();
  const cards = picked.map((g) => {
    const words = g.words.filter((w) => !L.banned.has(norm(w)));
    const ti = Math.floor(rng.next() * words.length);
    const target = words[ti];
    const rest = words.filter((_, i) => i !== ti);
    const answer = rest[Math.floor(rng.next() * rest.length)];
    used.add(norm(target)); used.add(norm(answer));
    return { g, target, answer, distractors: [] };
  });
  const targetIds = new Set(picked.map((g) => g.id));
  const conceptOpp = (a, b) => (L.opp.get(a) || []).includes(b) || (L.opp.get(b) || []).includes(a);
  const groupNear = (g1, g2) => g1.words.some((a) => g2.words.some((b) => L.near.has(norm(a) + '|' + norm(b))));
  const groupAnt = (g1, g2) => g1.words.some((a) => { const an = L.antonymsOf(a); return g2.words.some((b) => an.includes(norm(b))); });
  for (const c of cards) {
    const cands = (block.groups || []).filter((h) => h.pos === c.g.pos && !targetIds.has(h.id) && !conceptOpp(h.concept, c.g.concept) && !groupNear(h, c.g) && !groupAnt(h, c.g));
    const same = rng.shuffle(cands.filter((h) => h.domain === c.g.domain));
    const other = rng.shuffle(cands.filter((h) => h.domain !== c.g.domain));
    const nD = cfg.chips - 1;
    let wantSame = 0;
    if (cfg.sameDomainMin > 0) wantSame = cfg.sameDomainMin;
    else if (cfg.sameDomainMax > 0) wantSame = rng.next() < 0.5 ? 1 : 0;
    const order = [...same.slice(0, wantSame), ...other];
    if (wantSame === 0 && cfg.sameDomainMax > 0) order.push(...same.slice(0, cfg.sameDomainMax));   // a same-domain foil only as a fallback
    const chosen = [];
    for (const h of order) {
      if (chosen.length === nD) break;
      if (chosen.some((x) => x.group.id === h.id)) continue;
      const nSame = chosen.filter((x) => x.group.domain === c.g.domain).length;
      if (h.domain === c.g.domain && nSame >= cfg.sameDomainMax) continue;
      const free = h.words.filter((w) => !used.has(norm(w)) && !L.banned.has(norm(w)) && !L.prefix.has(norm(w)));
      if (!free.length) continue;
      const w = free[Math.floor(rng.next() * free.length)];
      chosen.push({ word: w, group: h });
      used.add(norm(w));
    }
    if (chosen.length < nD) return null;
    const nSame = chosen.filter((x) => x.group.domain === c.g.domain).length;
    if (nSame < cfg.sameDomainMin) return null;
    c.distractors = chosen;
  }
  return { cards };
}

module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { mode: 'base', cards: 6, rows: 3, chips: 3, grid: '3x1', tiers: [1], posMix: [6, 0], sameDomainMax: 0, sameDomainMin: 0,
      targetPx: 26, chipPx: 20, chipH: 38, rowMin: 210, rowGap: 10, maxGlyphs: 13 },
    2: { mode: 'base', cards: 8, rows: 4, chips: 4, grid: '2x2', tiers: [1, 2], posMix: [5, 3], sameDomainMax: 1, sameDomainMin: 0,
      targetPx: 24, chipPx: 18, chipH: 36, rowMin: 158, rowGap: 10, maxGlyphs: 13 },
    3: { mode: 'base', cards: 8, rows: 4, chips: 4, grid: '2x2', tiers: [2], posMix: [4, 4], sameDomainMax: 1, sameDomainMin: 1,
      targetPx: 24, chipPx: 18, chipH: 36, rowMin: 158, rowGap: 10, maxGlyphs: 13 },
  },
  i18n: {
    en: {
      title: 'Synonyms: Circle the Word That Means the Same',
      instruction: 'Read the big word on each card and circle the word under it that means the same.',
    },
  },
  FACE_MODES,
  SPARSE_MAX,
  stringsFor, antonymTable, drawPage,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== 'base') {
      if (FACE_MODES.includes(d.mode)) throw new Error(`${ID}: mode "${d.mode}" is a face (Phase E) — the base composer refuses a face config rather than read it`);
      throw new Error(`${ID}: unknown mode "${d.mode}"`);
    }
    stringsFor(block, 'base', loc);
    const cfg = { ...d };
    // guards on the RESOLVED config
    if (!(cfg.grid === '2x2' && cfg.chips === 4) && !(cfg.grid === '3x1' && cfg.chips === 3)) throw new Error(`${ID}: grid ${cfg.grid} with ${cfg.chips} chips`);
    if (cfg.cards !== cfg.rows * 2) throw new Error(`${ID}: ${cfg.cards} cards in ${cfg.rows} rows x 2`);
    if (cfg.cards % cfg.chips !== 0) throw new Error(`${ID}: ${cfg.cards} cards cannot balance ${cfg.chips} slots exactly`);
    if (cfg.posMix[0] + cfg.posMix[1] !== cfg.cards) throw new Error(`${ID}: posMix ${cfg.posMix} ≠ ${cfg.cards} cards`);
    if (cfg.chipH < 36) throw new Error(`${ID}: tag height ${cfg.chipH} below the G2 floor 36`);
    if (cfg.chipPx < 16) throw new Error(`${ID}: tag text ${cfg.chipPx} px < 16`);
    if (cfg.sameDomainMin > cfg.sameDomainMax) throw new Error(`${ID}: sameDomainMin ${cfg.sameDomainMin} > max ${cfg.sameDomainMax}`);
    const bodyH = cfg.grid === '2x2' ? 40 + 8 + 2 * cfg.chipH + 10 : 40 + 8 + 3 * cfg.chipH + 2 * 10;
    if (bodyH + 28 > cfg.rowMin) throw new Error(`${ID}: a card needs ${bodyH + 28} px > rowMin ${cfg.rowMin}`);
    // the ruled 677 is not what the longest fi chrome leaves: measured 667 (a 4-line title + 3-line instruction; the plants build measured the same)
    if (cfg.rows * cfg.rowMin + (cfg.rows - 1) * cfg.rowGap > BODY_MIN) throw new Error(`${ID}: the stack ${cfg.rows * cfg.rowMin + (cfg.rows - 1) * cfg.rowGap} px > the measured ${BODY_MIN} px fi chrome`);

    const { antonymsOf, prefix } = antonymTable(loc);
    const L = {
      loc, byConcept: groupsByConcept(block, loc), near: nearSet(block), antonymsOf, prefix,
      banned: new Set((block.ban || []).map(norm)),
      opp: new Map(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])),
    };
    const rng = ctx.rng;
    let page = null;
    for (let t = 0; t < PAGE_TRIES && !page; t++) page = drawPage(block, cfg, rng, L);
    if (!page) throw new Error(`${ID}: no ${loc} page in ${PAGE_TRIES} draws (the distractor pool is too thin) — refuse`);
    const slots = cfg._forceSlots || slotOrder(cfg, rng);
    const conceptDomain = new Map(DATA.CONCEPTS.map((c) => [c.id, c.domain]));
    const cards = [];
    const meta = [];
    page.cards.forEach((c, i) => {
      const dis = rng.shuffle(c.distractors);
      const tags = [];
      let k = 0;
      for (let s = 0; s < cfg.chips; s++) tags.push(s === slots[i] ? { word: c.answer, groupId: c.g.id } : { word: dis[k].word, groupId: dis[k++].group.id });
      cards.push(C5.synTwinCard({ target: c.target, groupId: c.g.id, domain: c.g.domain, concept: c.g.concept, tags, answerSlot: slots[i],
        targetPx: cfg.targetPx, chipPx: cfg.chipPx, chipH: cfg.chipH, grid: cfg.grid, maxGlyphs: cfg.maxGlyphs }));
      meta.push({ concept: c.g.concept, pos: c.g.pos, target: c.target, answer: c.answer, slot: slots[i], tags: tags.map((x) => x.word), foilDomains: c.distractors.map((x) => x.group.domain), domain: c.g.domain });
    });
    // the page's lexicon slice (verify re-derives in the page; it cannot require)
    const onPage = new Map();
    for (const c of page.cards) { onPage.set(c.g.id, c.g); for (const x of c.distractors) onPage.set(x.group.id, x.group); }
    const printed = [...new Set(page.cards.flatMap((c) => [c.target, c.answer, ...c.distractors.map((x) => x.word)]))];
    const lex = {
      groups: Object.fromEntries([...onPage.values()].map((g) => [g.id, { concept: g.concept, pos: g.pos, domain: g.domain, words: g.words }])),
      near: (block.near || []).map((n) => [n.a, n.b]),
      ant: Object.fromEntries(printed.map((w) => [w, antonymsOf(w)])),
      prefix: [...prefix],
      opp: Object.fromEntries(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])),
      domainOf: Object.fromEntries([...onPage.values()].map((g) => [g.concept, conceptDomain.get(g.concept) || g.domain])),
    };
    const stamp = { mode: 'base', cards: cfg.cards, chips: cfg.chips, grid: cfg.grid, tiers: cfg.tiers, posMix: cfg.posMix, sameDomainMax: cfg.sameDomainMax, sameDomainMin: cfg.sameDomainMin,
      targetPx: cfg.targetPx, chipPx: cfg.chipPx, chipH: cfg.chipH, rowMin: cfg.rowMin, maxGlyphs: cfg.maxGlyphs, sparseMax: SPARSE_MAX };
    const grid = C5.synTwinGrid({ cards, rows: cfg.rows, rowMin: cfg.rowMin, rowGap: cfg.rowGap });
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-face="base" data-lcs-cfg="${esc(JSON.stringify(stamp))}" data-lcs-lex="${esc(JSON.stringify(lex))}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${grid}</div>`;
    return { bodyHtml, meta: { cards: meta, cfg: stamp, slots } };
  },

  async verify(page) {
    return page.evaluate(({ ID, TEAL }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg, lex;
      try { cfg = JSON.parse(root.dataset.lcsCfg); lex = JSON.parse(root.dataset.lcsLex); } catch (e) { return ['unreadable cfg / lex stamp']; }
      const n = (s) => String(s).normalize('NFC').toLowerCase();
      const near = new Set(lex.near.flatMap(([a, b]) => [n(a) + '|' + n(b), n(b) + '|' + n(a)]));
      const prefix = new Set(lex.prefix.map(n));
      const antOf = (w) => (lex.ant[w] || []).map(n);
      if (document.querySelector('.ws-page img')) f.push('an <img> on the base page');
      if ([...document.querySelectorAll('[data-lcs-answer]')].length) f.push('a data-lcs-answer stamp on the base page (the answer is derived, never stamped)');
      if (root.getAttribute('data-lcs-face') !== 'base') f.push('the root is not face=base');
      const cards = [...root.querySelectorAll('section.ws-card[data-lcs-card]')];
      if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
      const seen = new Map();
      const see = (w, where) => { const k = n(w); if (seen.has(k)) f.push(`"${w}" printed twice on the page (${seen.get(k)} and ${where})`); else seen.set(k, where); };
      const targetGroups = new Set();
      const slots = [];
      let styleRef = null;
      let sparse = 0;
      cards.forEach((card, ci) => {
        const tag = `card ${ci + 1}`;
        const twin = card.querySelector('[data-lcs-twin]');
        if (!twin) { f.push(`${tag}: no twin stamp`); return; }
        const [tgid, ...tw] = twin.dataset.lcsTarget.split(':');
        const tword = tw.join(':');
        const G = lex.groups[tgid];
        if (!G) { f.push(`${tag}: the target group ${tgid} is not in the page lexicon`); return; }
        if (!G.words.includes(tword)) f.push(`${tag}: target "${tword}" is not a word of ${tgid}`);
        const shown = card.querySelector('[data-lcs-target-word]');
        if (!shown || shown.textContent !== tword) f.push(`${tag}: the band prints "${shown && shown.textContent}" ≠ the stamped target "${tword}"`);
        if (targetGroups.has(tgid)) f.push(`${tag}: group ${tgid} is a target twice`);
        targetGroups.add(tgid);
        see(tword, tag + ' target');
        const band = card.querySelector('[data-lcs-band]');
        if (!band || !band.querySelector('svg[data-lcs-same-link]')) f.push(`${tag}: no joined-rings mark in the band`);
        if (band && band.scrollWidth > band.clientWidth + 0.5) f.push(`${tag}: the target overflows the band`);
        const tags = [...card.querySelectorAll('[data-lcs-tag]')];
        if (tags.length !== cfg.chips) f.push(`${tag}: ${tags.length} tags ≠ ${cfg.chips}`);
        const hits = tags.filter((t) => t.dataset.lcsGroup === tgid);
        if (hits.length !== 1) { f.push(`${tag}: ${hits.length} tags share the target's group (want exactly 1)`); return; }
        const answer = hits[0].textContent;
        if (n(answer) === n(tword)) f.push(`${tag}: the answer repeats the target`);
        slots.push(+hits[0].dataset.lcsSlot);
        const bad = new Set([...antOf(tword), ...antOf(answer)]);
        const groupsOnCard = new Set();
        let sameDom = 0;
        for (const t of tags) {
          const w = t.textContent, gid = t.dataset.lcsGroup, H = lex.groups[gid];
          see(w, tag);
          if (!H) { f.push(`${tag}: tag "${w}" group ${gid} not in the lexicon`); continue; }
          if (!H.words.includes(w)) f.push(`${tag}: tag "${w}" is not a word of ${gid}`);
          if (groupsOnCard.has(gid)) f.push(`${tag}: two tags share group ${gid}`);
          groupsOnCard.add(gid);
          if (H.pos !== G.pos) f.push(`${tag}: tag "${w}" is a ${H.pos}, the target a ${G.pos}`);
          if (gid === tgid) continue;
          if (bad.has(n(w))) f.push(`${tag}: tag "${w}" is an antonym of the target or the answer`);
          if (prefix.has(n(w))) f.push(`${tag}: tag "${w}" is a prefix antonym (G2-320 owns it)`);
          for (const a of [tword, answer]) if (near.has(n(a) + '|' + n(w))) f.push(`${tag}: tag "${w}" is near "${a}"`);
          if (H.words.some((x) => G.words.some((y) => near.has(n(x) + '|' + n(y))))) f.push(`${tag}: tag "${w}"'s group ${gid} holds a word near the target's group`);
          if ((lex.opp[G.concept] || []).includes(H.concept) || (lex.opp[H.concept] || []).includes(G.concept)) f.push(`${tag}: tag "${w}" names the opposite concept of "${tword}"`);
          if (H.domain === G.domain) sameDom++;
        }
        if (sameDom > cfg.sameDomainMax) f.push(`${tag}: ${sameDom} tags share the target's domain (max ${cfg.sameDomainMax})`);
        if (sameDom < cfg.sameDomainMin) f.push(`${tag}: ${sameDom} same-domain foils (min ${cfg.sameDomainMin})`);
        // rendered floors
        if (card.scrollHeight > card.clientHeight + 0.5) f.push(`${tag}: the card clips (scrollHeight ${card.scrollHeight} > ${card.clientHeight})`);
        for (const t of tags) {
          const r = t.getBoundingClientRect(), cs = getComputedStyle(t);
          if (r.height < Math.max(36, cfg.chipH) - 0.5) f.push(`${tag}: tag "${t.textContent}" ${r.height.toFixed(1)} px high < ${cfg.chipH}`);
          if (parseFloat(cs.fontSize) < cfg.chipPx - 0.01) f.push(`${tag}: tag text ${cs.fontSize} < ${cfg.chipPx}`);
          if (t.scrollWidth > t.clientWidth + 0.5) f.push(`${tag}: tag "${t.textContent}" overflows its ${t.clientWidth} px tag`);
          const sig = [cs.backgroundColor, cs.borderTopColor, cs.borderTopWidth, cs.fontWeight, cs.fontSize, Math.round(r.width), Math.round(r.height)].join('/');
          if (styleRef === null) styleRef = sig; else if (sig !== styleRef) f.push(`${tag}: tag "${t.textContent}" looks different from the others (${sig} ≠ ${styleRef})`);
          const cr = card.getBoundingClientRect();
          if (r.left < cr.left - 0.5 || r.right > cr.right + 0.5 || r.bottom > cr.bottom + 0.5) f.push(`${tag}: tag "${t.textContent}" leaves its card`);
        }
        // SPARSE: every blank band inside the card (content top -> band, band -> square, square -> content bottom)
        const cs = getComputedStyle(card), cr = card.getBoundingClientRect();
        const top = cr.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop), bottom = cr.bottom - parseFloat(cs.borderBottomWidth) - parseFloat(cs.paddingBottom);
        const sq = card.querySelector('[data-lcs-square]');
        if (band && sq) {
          const b = band.getBoundingClientRect(), s = sq.getBoundingClientRect();
          const gaps = [b.top - top, s.top - b.bottom, bottom - s.bottom];
          sparse = Math.max(sparse, ...gaps);
        }
      });
      if (sparse > cfg.sparseMax + 0.5) f.push(`SPARSE — ${sparse.toFixed(0)} px blank band inside a card (> ${cfg.sparseMax})`);
      // grid gaps
      const rows = [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().top)))].sort((a, b) => a - b);
      for (let i = 1; i < rows.length; i++) {
        const prevBottom = Math.max(...cards.filter((c) => Math.round(c.getBoundingClientRect().top) === rows[i - 1]).map((c) => c.getBoundingClientRect().bottom));
        if (rows[i] - prevBottom > cfg.sparseMax) f.push(`SPARSE — ${(rows[i] - prevBottom).toFixed(0)} px between card rows`);
      }
      // slots: exact balance, no 3-in-a-row
      const per = cfg.cards / cfg.chips, counts = {};
      for (const s of slots) counts[s] = (counts[s] || 0) + 1;
      for (let s = 0; s < cfg.chips; s++) if ((counts[s] || 0) !== per) f.push(`slot balance: slot ${s + 1} holds ${counts[s] || 0} answers ≠ ${per} (${JSON.stringify(counts)})`);
      for (let i = 2; i < slots.length; i++) if (slots[i] === slots[i - 1] && slots[i] === slots[i - 2]) f.push(`slot ${slots[i] + 1} answers cards ${i - 1}..${i + 1} in a row`);
      void TEAL;
      return f;
    }, { ID, TEAL: tokens.color.teal });
  },
};
