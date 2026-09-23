/**
 * K-379 — Story Sequencing: Number the Pictures (nt5-F; family key
 * `story-sequencing`; K; letters; en CCSS RL.K.2 as a support — the landing
 * carries the alignment, the sheet never does). Design:
 * docs/worksheet-gen/b6-designs/K-379-story-sequencing.md §2 (base) + §5
 * (data + gates), under _BUILD-BRIEF.md; every ruling and why in
 * _work/K-379-critic.md; the build record in _work/K-379-build.md.
 *
 * "The story washing line." Two teal cords sag across the page; each carries
 * ONE drawn story's cards (primitives/story-panel.js) in a scrambled order, a
 * dashed tag dangling under every card. The child writes 1, 2, 3, 4 on the
 * tags. Inside every card the stage stands still and only the outlined prop
 * changes, so the child justifies the order by pointing at what changed.
 *
 * THEMELESS, 0 library pictures. No unitAxis. The story is the content axis,
 * drawn by the seed from the locale-neutral bank (COMMON.stories), so all 11
 * locales print the same stories in the same scrambles (the locale only
 * chooses the chrome strings and may EXCLUDE a story: es / pt drop `snowman`
 * by default; block.excludeStories).
 *
 * THE SCRAMBLE LAW (design §2; a derangement is itself a leak): per row, reading
 * left to right, not the identity, not the reverse, forward chain <= 1, backward
 * chain <= 1, fixed points <= 1. n = 4 draws from COMMON.SCRAMBLE4 (weights that
 * put rank 1 and rank 4 in every slot with probability 0.25); n = 3 uniform over
 * COMMON.SCRAMBLE3 (the middle slot then holds rank 1 with p = 0.5, recorded);
 * n = 5 over the 56 law permutations (§2 says 74; the stated law gives 56, re-measured: n = 3 -> 4 and n = 4 -> 12 match §2 exactly), IPF-weighted like SCRAMBLE4 (see LAW5_W). The two rows never share a
 * permutation and their rank-1 slots differ; the two stories differ in setKind
 * and their objects are disjoint.
 *
 * Answer-hiding: nothing printed says which card is first. Stamps: card
 * `data-lcs-seq` (its position in the shown sequence, 1..n) + the panel svg's
 * `data-lcs-rank` (its rank in the story); tag `data-lcs-slot` + an EMPTY
 * `data-lcs-answer`. verify() re-derives each tag's numeral from the card above.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on the
 * level index (poison PR11):
 *   mode     'base' (a Phase-E face carries its own mode; none is built yet -> refuse)
 *   stories  2 / 2 / 2          panels 3 / 4 / 5 (sub3 / sub4 / n5)
 *   panelW   176 / 144 / 120    gap 40 / 20 / 9     tag 64x60 / 64x60 / 60x56
 * Stack (the design's 677 budget = the fi four-line title): d1 2 x 228 + 36 = 492,
 * d2 2 x 204 + 36 = 444, d3 2 x 182 + 36 = 400 (DEVIATION: the design's d3
 * is ONE row = 182 px on a 722 body, 540 px of air; the n5 pool is exactly the
 * two stories sandwich + hopscotch, whose stages and objects already differ, so
 * d3 hangs both); width d1 608 / d2 636 / d3
 * 636 <= 639 (the .ws-lane inner width).
 *
 * Refusals (throw, never a filler): an unauthored locale (lib/b6-common.js
 * bank()); a pool below its floor after the locale's exclusions; a config that
 * is not the base; no composition in TRIES draws.
 */
'use strict';
const { bank } = require('../../lib/b6-common.js');
const { COMMON } = require('../../data/b6/story-sequencing.js');
const SP = require('../../primitives/story-panel.js');
const C6 = require('../../templates/components-b6.js');
const B2 = require('../../templates/components-b2.js');
const fmt = (n) => (Math.round(n * 100) / 100).toString();

const TRIES = 400;
const ROW_W = 639;   // the .ws-lane inner width (lead review 2026-09-23: the cards take all of it)

/** The scramble law on a permutation (array of seq numbers per slot, left to right). */
function scrambleLaw(perm) {
  const n = perm.length;
  const pos = []; perm.forEach((r, i) => { pos[r] = i; });
  if (perm.every((r, i) => r === i + 1)) return 'identity';
  if (perm.every((r, i) => r === n - i)) return 'reverse';
  let fwd = 0, back = 0, fixed = 0;
  for (let k = 1; k < n; k++) { if (pos[k + 1] === pos[k] + 1) fwd++; if (pos[k + 1] === pos[k] - 1) back++; }
  perm.forEach((r, i) => { if (r === i + 1) fixed++; });
  if (fwd > 1) return `forward chain ${fwd}`;
  if (back > 1) return `backward chain ${back}`;
  if (fixed > 1) return `${fixed} fixed points`;
  return null;
}
function allPerms(n) {
  const out = [];
  const rec = (a, rest) => { if (!rest.length) out.push(a); else rest.forEach((x, i) => rec([...a, x], rest.filter((_, j) => j !== i))); };
  rec([], Array.from({ length: n }, (_, i) => i + 1));
  return out;
}
const LAW5 = allPerms(5).filter((p) => !scrambleLaw(p));
/**
 * n = 5 weights (DEVIATION from §2 "uniform over the 74" (56 measured)): measured uniform, rank 1 lands in slot 1
 * only 7 % of the time (the law forbids most perms that start with 1: the inverted leak §2 warns of).
 * Iterative proportional fitting over the 56 law permutations (§2 says 74; the stated law gives 56, re-measured: n = 3 -> 4 and n = 4 -> 12 match §2 exactly) makes rank 1 AND rank 5 land in every
 * slot with probability 0.2 (the SCRAMBLE4 method, computed here, deterministic).
 */
const LAW5_W = (() => {
  const w = LAW5.map(() => 1);
  for (let it = 0; it < 500; it++) for (const r of [1, 5]) {
    const m = [0, 0, 0, 0, 0]; let tot = 0;
    LAW5.forEach((p, i) => { m[p.indexOf(r)] += w[i]; tot += w[i]; });
    LAW5.forEach((p, i) => { w[i] *= (tot / 5) / m[p.indexOf(r)]; });
  }
  const t = w.reduce((a, b) => a + b, 0);
  return w.map((x) => x / t);
})();

function drawPerm(n, rng) {
  if (n === 4) {
    const entries = Object.entries(COMMON.SCRAMBLE4);
    const tot = entries.reduce((a, [, w]) => a + w, 0);
    let u = rng.next() * tot;
    for (const [k, w] of entries) { u -= w; if (u < 0) return k.split('').map(Number); }
    return entries[entries.length - 1][0].split('').map(Number);
  }
  if (n === 3) return rng.pick(COMMON.SCRAMBLE3).split('').map(Number);
  if (n === 5) {
    let u = rng.next();
    for (let i = 0; i < LAW5.length; i++) { u -= LAW5_W[i]; if (u < 0) return LAW5[i].slice(); }
    return LAW5[LAW5.length - 1].slice();
  }
  throw new Error(`K-379: no scramble table for ${n} panels`);
}

/** The stories a (locale, sub-list) page may draw. */
function storyPool(block, loc, subKey) {
  const ex = new Set(block.excludeStories || []);
  return COMMON.stories.filter((s) => Array.isArray(s[subKey]) && !ex.has(s.id) && !(s.excludeLocales || []).includes(loc));
}

/* ================================================================== Phase E: the five CODE faces
 * One additive knob `mode` (design §3). `mode: 'base'` is the base path, untouched (byte-identical: the
 * scratch snapshot + tools/b3-baseline.js). Each face builder returns {bodyHtml, meta}; each root stamps
 * data-lcs-mode and every face's verify() branch re-derives from the stamps. Guards key on the resolved
 * config (answer / show / sentences …), never on the level index.
 */
const TOKENS = require('../../primitives/_tokens.js');
/** The CSS card background: the stage's sky token (data/b6 COMMON.SKY: pavement asphalt, snow sky), else white. */
const SKY = (s) => { const t = (COMMON.SKY || {})[s.setKind]; return t ? TOKENS.color[t] : '#FFFFFF'; };
const MARKERS = ['dot', 'triangle'];   // F1: strip k and story line k carry the same teal marker (fr panel, fix round 1)
const TRAY_PERMS = ['021', '102', '120', '201'];   // F2 correct-choice slots over the three blocks: never 012 / 210
function facePanel(s, rank, w, vh, extra = {}) {
  const r = SP.storyPanel({ story: s, rank, w, vh, frame: false, uid: extra.uid || '' });
  return { r, box: (attrs, grow = true) => C6.ssCardBox({ svg: r.svg, w: r.width, minH: r.height, anchor: s.anchor, sky: SKY(s), grow, attrs }) };
}
function pickPair(pool, rng, n, tries = 400) {
  for (let t = 0; t < tries; t++) {
    const picks = rng.sample(pool, n);
    let okp = true;
    for (let i = 0; i < picks.length && okp; i++) for (let j = i + 1; j < picks.length; j++) {
      if (n === 2 && picks[i].setKind === picks[j].setKind) okp = false;
      if (picks[i].objects.some((o) => picks[j].objects.includes(o))) okp = false;
    }
    if (okp) return picks;
  }
  return null;
}
function lawPerms(n, rng, count) {
  const out = [];
  for (let t = 0; t < 400 && out.length < count; t++) {
    const p = drawPerm(n, rng);
    if (out.some((q) => q.join('') === p.join('') || q.indexOf(1) === p.indexOf(1))) continue;
    out.push(p);
  }
  if (out.length < count) throw new Error('K-379: no scramble for the page (refuse)');
  return out;
}
/**
 * F4 (fix round 2): the SENTENCE column of each block — a scramble-law permutation (SCRAMBLE4 weights) that
 * puts no sentence on the row of its own picture (row j: sentence rank !== picture seq), the two blocks'
 * sentence columns differing in permutation and in the slot of "First".
 */
function sentencePerms(picPerms, rng) {
  const out = [];
  for (const P of picPerms) {
    let S = null;
    for (let t = 0; t < 400 && !S; t++) {
      const c = drawPerm(4, rng);
      if (c.some((r, j) => r === P[j])) continue;
      if (out.some((q) => q.join('') === c.join('') || q.indexOf(1) === c.indexOf(1))) continue;
      S = c;
    }
    if (!S) throw new Error('K-379 F4: no sentence column for the page (refuse)');
    out.push(S);
  }
  return out;
}
function faceRoot(mode, inner, stamps = {}, style = '') {
  const attrs = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`).join('');
  return `<div class="ws-lane ss-page" data-ws-content data-lcs-story-sequencing data-lcs-mode="${mode}"${attrs} style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:10px;min-height:0${style}">${inner}</div>`;
}

const FACE_BUILD = {
  /** F1 (K): two lines of three EMPTY glue frames under First / Next / Last + two cut strips of scrambled tiles. */
  'first-next-last-cut'(block, d, loc, rng, seam) {
    if (d.answer !== 'glue' || d.panels !== 3 || d.sub !== 'sub3') throw new Error('K-379 F1: config is not the cut-and-paste face');
    const words = block.words3;
    if (!Array.isArray(words) || words.length !== 3 || words.some((x) => !String(x || '').trim())) throw new Error(`K-379 ${loc}: words3 missing (refuse)`);
    const pool = storyPool(block, loc, 'sub3').filter((s) => (s.pools || []).includes('first-next-last-cut'));
    if (pool.length < 3) throw new Error(`K-379 ${loc}: F1 pool ${pool.length} (< 3; refuse)`);
    const stories = seam.plan ? seam.plan.stories.map((id) => COMMON.stories.find((x) => x.id === id)) : pickPair(pool, rng, 2);
    if (!stories) throw new Error(`K-379 ${loc}: no F1 pair (refuse)`);
    // fix round 2 (nl): each strip from COMMON.STRIP3 (never the identity, never a rotation), the two strips different
    const perms = seam.plan ? seam.plan.perms : rng.sample(COMMON.STRIP3, 2).map((p) => p.split('').map(Number));
    const lines = stories.map((s, i) => C6.ssLine({
      items: [0, 1, 2].map((k) => ({ w: d.frame, html: C6.ssGlueFrame({ w: d.frame, minH: d.frameH, k }), under: C6.ssWordTag({ text: words[k], k }) })),
      gap: d.gap, minH: d.frameH + 12 + 36, grow: d.grow, stamps: { story: s.id, line: i, marker: MARKERS[i] }, marker: MARKERS[i],
    }));
    const strips = stories.map((s, i) => C6.ssCutStrip({
      story: s.id, marker: MARKERS[i], cellW: d.tile + 4, cellH: d.tile * 0.75 + 4,
      tiles: perms[i].map((seq) => ({ seq, rank: s.sub3[seq - 1], svg: SP.storyPanel({ story: s, rank: s.sub3[seq - 1], w: d.tile, frame: false }).svg })),
    }));
    const bodyHtml = faceRoot('first-next-last-cut', lines.join('') + `<div data-ss-block data-lcs-strips style="display:flex;flex-direction:column;gap:10px;flex:0 0 auto">${strips.join('')}</div>`,
      { stories: 2, frame: d.frame, tile: d.tile, words3: JSON.stringify(words) });
    return { bodyHtml, meta: { mode: d.mode, stories: stories.map((s) => s.id).join(','), perms: perms.map((p) => p.join('')).join(','), answers: perms.map((p) => p.join('')).join('|') } };
  },

  /** F2 (G1): three stories hang IN ORDER, ranks 1-3 + a "?" frame; a tray of three: rank 4 · rank 1 again · another story's ending. */
  'what-happens-next'(block, d, loc, rng, seam) {
    if (d.answer !== 'choice' || d.choices !== 3 || d.shown !== 3) throw new Error('K-379 F2: config is not the what-happens-next face');
    const pool = storyPool(block, loc, 'sub4').filter((s) => s.sub4.join('') === '1234' && (s.pools || []).includes('what-happens-next'));
    if (pool.length < d.stories + 2) throw new Error(`K-379 ${loc}: F2 pool ${pool.length} (refuse)`);
    let plan = seam.plan || null;
    for (let t = 0; t < 400 && !plan; t++) {
      const stories = rng.sample(pool, d.stories);
      if (new Set(stories.map((s) => s.setKind)).size < 2) continue;
      const all = COMMON.stories.filter((s) => !(s.excludeLocales || []).includes(loc) && !(block.excludeStories || []).includes(s.id));
      const others = [];
      for (const s of stories) {
        const cand = all.filter((o) => !stories.includes(o) && !others.includes(o) && o.setKind !== s.setKind && !o.objects.some((x) => s.objects.includes(x)) && !(COMMON.TRAY_ILLEGIBLE || []).includes(o.id));
        if (!cand.length) break;
        others.push(rng.pick(cand));
      }
      if (others.length !== stories.length) continue;
      const slots = rng.pick(TRAY_PERMS).split('').map(Number);
      plan = { stories: stories.map((s) => s.id), others: others.map((s) => s.id), slots, foilOrder: stories.map(() => (rng.next() < 0.5 ? ['regress', 'other'] : ['other', 'regress'])) };
    }
    if (!plan) throw new Error(`K-379 ${loc}: no F2 composition (refuse)`);
    const byId = (id) => COMMON.stories.find((x) => x.id === id);
    const blocks = plan.stories.map((id, i) => {
      const s = byId(id), o = byId(plan.others[i]);
      const given = [1, 2, 3].map((rank) => ({ w: d.panelW, html: facePanel(s, rank, d.panelW, 120).box(`data-lcs-given data-lcs-story="${s.id}" data-lcs-rank="${rank}"`) }));
      given.push({ w: d.panelW, html: C6.ssQueryFrame({ w: d.panelW, h: d.panelW * 0.75 }) });
      const line = C6.ssLine({ items: given, gap: 12, minH: d.panelW * 0.75, grow: d.grow, stamps: { story: s.id } });
      const kinds = [];
      kinds[plan.slots[i]] = 'correct';
      const rest = [0, 1, 2].filter((k) => k !== plan.slots[i]);
      kinds[rest[0]] = plan.foilOrder[i][0]; kinds[rest[1]] = plan.foilOrder[i][1];
      const cards = kinds.map((k, j) => {
        const [st, rank] = k === 'correct' ? [s, 4] : k === 'regress' ? [s, 1] : [o, o.panels.length];
        return facePanel(st, rank, d.panelW, 120, { uid: 'c' + j }).box(`data-lcs-choice data-lcs-slot="${j}" data-lcs-choice-story="${st.id}" data-lcs-choice-rank="${rank}" data-lcs-choice-setkind="${st.setKind}" data-lcs-choice-objects="${st.objects.join(',')}"`, false);
      });
      return `<div data-lcs-next-block data-lcs-story="${s.id}" data-lcs-setkind="${s.setKind}" data-lcs-objects="${s.objects.join(',')}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;gap:8px;min-height:${fmt(24 + d.panelW * 0.75 + 8 + d.panelW * 0.75 + 14)}px">${line}<div data-ss-block style="flex:1 1 auto;display:flex;min-height:${fmt(d.panelW * 0.75 + 14)}px">${C6.ssChoiceTray({ cards })}</div></div>`;
    });
    const bodyHtml = faceRoot('what-happens-next', blocks.join(''), { stories: d.stories, 'panel-w': d.panelW, 'tray-illegible': (COMMON.TRAY_ILLEGIBLE || []).join(',') });
    return { bodyHtml, meta: { mode: d.mode, stories: plan.stories.join(','), others: plan.others.join(','), slots: plan.slots.join(''), answers: plan.slots.join('') } };
  },

  /** F3 (G1): the first and last pictures at the ends of the line, an EMPTY middle frame to draw in, Beginning / Middle / End. */
  'beginning-middle-end'(block, d, loc, rng, seam) {
    if (d.answer !== 'draw' || d.show !== 'ends') throw new Error('K-379 F3: config is not the beginning-middle-end face');
    const bme = block.bme;
    if (!Array.isArray(bme) || bme.length !== 3 || bme.some((x) => !String(x || '').trim())) throw new Error(`K-379 ${loc}: bme missing (refuse)`);
    const pool = storyPool(block, loc, 'sub3').filter((s) => (s.pools || []).includes('beginning-middle-end'));
    const stories = seam.plan ? seam.plan.stories.map((id) => COMMON.stories.find((x) => x.id === id)) : pickPair(pool, rng, d.stories);
    if (!stories) throw new Error(`K-379 ${loc}: no F3 pair (refuse)`);
    const midH = d.endW * d.endVh / 160;
    const lines = stories.map((s, i) => {
      const first = facePanel(s, 1, d.endW, d.endVh).box(`data-lcs-end="first" data-lcs-story="${s.id}" data-lcs-rank="1"`);
      const last = facePanel(s, s.panels.length, d.endW, d.endVh).box(`data-lcs-end="last" data-lcs-story="${s.id}" data-lcs-rank="${s.panels.length}"`);
      const items = [
        { w: d.endW, html: first, under: C6.ssStageLabel({ text: bme[0], k: 0 }) },
        { w: d.midW, html: C6.ssDrawCard({ w: d.midW, minH: midH }), under: C6.ssStageLabel({ text: bme[1], k: 1 }) },
        { w: d.endW, html: last, under: C6.ssStageLabel({ text: bme[2], k: 2 }) },
      ];
      return C6.ssLine({ items, gap: 22, minH: midH + 12 + 32, grow: d.grow, stamps: { story: s.id, setkind: s.setKind, line: i, panels: s.panels.length } });
    });
    const bodyHtml = faceRoot('beginning-middle-end', lines.join(''), { stories: d.stories, 'mid-w': d.midW });
    return { bodyHtml, meta: { mode: d.mode, stories: stories.map((s) => s.id).join(','), answers: '' } };
  },

  /** F4 (G1): each story told in four sentences (each with its opener), printed SCRAMBLED with an order box to number; the four pictures SCRAMBLED too, never across from their own sentence; draw lines. */
  'sequencing-sentences'(block, d, loc, rng, seam) {
    if (d.answer !== 'line' || d.sentences !== true || d.order !== 'scrambled') throw new Error('K-379 F4: config is not the sentences face');
    const ex = new Set(block.excludeStories || []);
    const pool = storyPool(block, loc, 'sub4').filter((s) => COMMON.SENTENCE_POOL.includes(s.id) && !ex.has(s.id) && block.stories && block.stories[s.id]);
    if (pool.length < 3) throw new Error(`K-379 ${loc}: F4 has ${pool.length} signed sentence stories (< 3; refuse)`);
    const stories = seam.plan ? seam.plan.stories.map((id) => COMMON.stories.find((x) => x.id === id)) : pickPair(pool, rng, 2);
    if (!stories) throw new Error(`K-379 ${loc}: no F4 pair (refuse)`);
    // fix round 2 (en / fr / de panels: the sentences printed IN story order made the page matching, not
    // sequencing; 2 of 8 pictures sat straight across from their own sentence). Now BOTH columns are scrambled:
    // the sentences (scramble law, each with an EMPTY order box the child numbers) and the pictures (scramble
    // law) — and no picture sits on the row of its own sentence (a row-wise derangement of the two columns).
    const perms = seam.plan ? seam.plan.perms : lawPerms(4, rng, 2);
    const sperms = seam.plan && seam.plan.sperms ? seam.plan.sperms : sentencePerms(perms, rng);
    const blocks = stories.map((s, i) => {
      const sen = block.stories[s.id].sentences;
      if (!Array.isArray(sen) || sen.length !== 4) throw new Error(`K-379 ${loc}: ${s.id} sentences (refuse)`);
      const pics = perms[i].map((seq, j) => facePanel(s, s.sub4[seq - 1], d.panelW, 120).box(`data-lcs-pic data-lcs-seq="${seq}" data-lcs-slot="${j}" data-lcs-story="${s.id}"`));
      return C6.ssSentenceMatch({ pics, sentences: sperms[i].map((rank) => ({ text: sen[rank - 1], rank })), orderBox: true, picW: d.panelW, rowMinH: d.panelW * 0.75, gap: 4, textW: d.textW, textPx: 16, stamps: { story: s.id, setkind: s.setKind, objects: s.objects.join(',') } });
    });
    const bodyHtml = faceRoot('sequencing-sentences', blocks.join(''), { stories: 2, openers4: JSON.stringify(block.openers4) }, ';gap:14px;justify-content:space-between');
    return { bodyHtml, meta: { mode: d.mode, stories: stories.map((s) => s.id).join(','), perms: perms.map((p) => p.join('')).join(','), sperms: sperms.map((p) => p.join('')).join(','), answers: sperms.map((p) => p.join('')).join('|') + '#' + perms.map((p) => p.join('')).join('|') } };
  },

  /** F5 (G2): one story IN ORDER down a vertical line, each picture with two school-ruled rows opening with its starter; a word bank on top. */
  'retell-with-starters'(block, d, loc, rng, seam) {
    if (d.answer !== 'write' || d.order !== 'given') throw new Error('K-379 F5: config is not the retell face');
    const starters = block.starters4;
    if (d.starters !== false && (!Array.isArray(starters) || starters.length !== 4)) throw new Error(`K-379 ${loc}: starters4 missing (refuse)`);
    const ex = new Set(block.excludeStories || []);
    const pool = storyPool(block, loc, 'sub4').filter((s) => COMMON.SENTENCE_POOL.includes(s.id) && !ex.has(s.id) && block.stories && block.stories[s.id]);
    if (pool.length < 3) throw new Error(`K-379 ${loc}: F5 has ${pool.length} signed stories (< 3; refuse)`);
    const s = seam.plan ? COMMON.stories.find((x) => x.id === seam.plan.stories[0]) : rng.pick(pool);
    const help = block.stories[s.id].helpWords;
    if (!Array.isArray(help) || help.length < 4 || help.length > 6) throw new Error(`K-379 ${loc}: ${s.id} helpWords (refuse)`);
    const bank = `<div data-ss-block data-lcs-help style="flex:0 0 auto;width:100%">${B2.wordBank({ words: help.map((word) => ({ word })), wordPx: 17 })}</div>`;
    const cardH = d.cardW * d.cardVh / 160;
    const rows = s.sub4.map((rank, k) => {
      const card = facePanel(s, rank, d.cardW, d.cardVh).box(`data-lcs-story="${s.id}" data-lcs-rank="${rank}" data-lcs-seq="${k + 1}"`, false);
      const peg = `<span aria-hidden="true" style="position:absolute;left:-1px;top:calc(50% - 4px);width:16px;height:8px;box-sizing:border-box;background:${'#FFFFFF'};border:2px solid ${'#146B5E'};border-radius:2px"></span>`;
      return `<div style="position:relative;flex:1 1 ${fmt(cardH)}px;min-height:${fmt(cardH)}px;max-height:${fmt(cardH + d.grow)}px;display:flex">${peg}` +
        C6.ssRetellRow({ card, starter: d.starters === false ? null : starters[k], rank, rulingW: d.rulingW, rows: d.rows, h: d.lineH, glyphH: d.glyphH }).replace('data-lcs-retell', `data-lcs-retell data-lcs-seq="${k + 1}" data-lcs-glyph-h="${d.glyphH}"`) + '</div>';
    });
    const cord = `<div aria-hidden="true" data-lcs-vcord style="position:absolute;left:7px;top:4px;bottom:4px;width:2.5px;background:#146B5E;border-radius:2px"></div>`;
    const bodyHtml = faceRoot('retell-with-starters', bank + `<div data-lcs-retell-rows style="position:relative;flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;width:100%;min-height:0">${cord}${rows.join('')}</div>`,
      { story: s.id, starters4: JSON.stringify(d.starters === false ? [] : starters), help: JSON.stringify(help) });
    return { bodyHtml, meta: { mode: d.mode, stories: s.id, answers: '' } };
  },
};

/** The face verify() branches (page.evaluate: no require). Stamps-only re-derivation, per design §3. */
async function faceVerify(page, mode) {
  return page.evaluate((mode) => {
    const fails = [];
    const root = document.querySelector('[data-ws-content][data-lcs-story-sequencing]');
    const law = (perm) => {
      const n = perm.length, pos = []; perm.forEach((r, i) => { pos[r] = i; });
      if (perm.every((r, i) => r === i + 1)) return 'identity';
      if (perm.every((r, i) => r === n - i)) return 'reverse';
      let f = 0, b = 0, x = 0;
      for (let k = 1; k < n; k++) { if (pos[k + 1] === pos[k] + 1) f++; if (pos[k + 1] === pos[k] - 1) b++; }
      perm.forEach((r, i) => { if (r === i + 1) x++; });
      if (f > 1) return 'forward chain ' + f; if (b > 1) return 'backward chain ' + b; if (x > 1) return x + ' fixed points';
      return null;
    };
    const byX = (els) => els.map((el) => ({ el, r: el.getBoundingClientRect() })).sort((a, b) => a.r.left - b.r.left);
    const byY = (els) => els.map((el) => ({ el, r: el.getBoundingClientRect() })).sort((a, b) => a.r.top - b.r.top);
    const empty = (el) => !el.textContent.trim() && !el.querySelector('svg, img, text');
    if (mode === 'first-next-last-cut') {
      const words = JSON.parse(root.dataset.lcsWords3 || '[]');
      const lines = [...root.querySelectorAll('[data-lcs-story-line]')];
      if (lines.length !== 2) fails.push(`${lines.length} glue lines ≠ 2`);
      const frameR = [];
      for (const ln of lines) {
        const fr = byX([...ln.querySelectorAll('[data-lcs-glue-k]')]);
        if (fr.length !== 3) fails.push(`line ${ln.dataset.lcsLine}: ${fr.length} frames ≠ 3`);
        fr.forEach((f, k) => { if (+f.el.dataset.lcsGlueK !== k) fails.push(`line ${ln.dataset.lcsLine}: frame ${k} stamped ${f.el.dataset.lcsGlueK}`); if (!empty(f.el)) fails.push(`line ${ln.dataset.lcsLine}: frame ${k} is not empty`); frameR.push(f.r); });
        const wt = byX([...ln.querySelectorAll('[data-lcs-word-k]')]);
        wt.forEach((t, k) => { if (+t.el.dataset.lcsWordK !== k || t.el.textContent.trim() !== words[k]) fails.push(`line ${ln.dataset.lcsLine}: word ${k} "${t.el.textContent.trim()}" ≠ "${words[k]}"`); });
        if (wt.length !== 3) fails.push(`line ${ln.dataset.lcsLine}: ${wt.length} word tags ≠ 3`);
      }
      const strips = [...root.querySelectorAll('[data-lcs-strip-story]')];
      if (strips.length !== 2) fails.push(`${strips.length} cut strips ≠ 2`);
      const perms = [];
      strips.forEach((st, i) => {
        const tiles = byX([...st.querySelectorAll('[data-ss-tile]')]);
        const seqs = tiles.map((t) => +t.el.dataset.lcsSeq);
        if (seqs.slice().sort().join('') !== '123') fails.push(`strip ${i}: seq ${seqs.join('')} is not 1..3`);
        const sj = seqs.join('');
        if (sj === '123') fails.push(`strip ${i}: order ${sj} is the answer order (identity)`);
        else if (sj === '231' || sj === '312') fails.push(`strip ${i}: order ${sj} is a ROTATION of the answer order`);
        else if (!['132', '213', '321'].includes(sj)) fails.push(`strip ${i}: order ${sj} is not a legal strip`);
        const ranks = tiles.map((t, j) => [seqs[j], +t.el.dataset.lcsTileRank]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
        for (let k = 1; k < ranks.length; k++) if (!(ranks[k] > ranks[k - 1])) fails.push(`strip ${i}: tile ranks do not rise with the sequence`);
        if (lines[i] && lines[i].dataset.lcsStory !== st.dataset.lcsStripStory) fails.push(`strip ${i} is story ${st.dataset.lcsStripStory} but line ${i} is ${lines[i].dataset.lcsStory}`);
        const tr = tiles.map((t) => t.el.querySelector('svg').getBoundingClientRect());
        for (const r of tr) for (const f of frameR) if (r.width > f.width - 8 + 0.5 || r.height > f.height - 8 + 0.5) { fails.push(`strip ${i}: a tile ${Math.round(r.width)} x ${Math.round(r.height)} does not fit a frame ${Math.round(f.width)} x ${Math.round(f.height)} with 8 px slop`); break; }
        perms.push(seqs.join(''));
      });
      if (perms.length === 2 && perms[0] === perms[1]) fails.push(`both strips are scrambled ${perms[0]}`);
      // the pairing marker: strip i and line i show the SAME drawn shape; the two stories' shapes differ
      const mk = strips.map((st, i) => {
        const a = st.querySelector('[data-lcs-marker]'), b = lines[i] && lines[i].querySelector('[data-lcs-line-marker] [data-lcs-marker]');
        const shape = (el) => (el ? (el.querySelector('circle') ? 'dot' : el.querySelector('polygon') ? 'triangle' : '?') : null);
        if (!a || !b) fails.push(`strip ${i} / line ${i}: a pairing marker is missing`);
        else if (shape(a) !== shape(b)) fails.push(`strip ${i} shows a ${shape(a)} but its line shows a ${shape(b)} (the pairing marker disagrees)`);
        return shape(a);
      });
      if (mk.length === 2 && mk[0] && mk[0] === mk[1]) fails.push(`both stories carry the same pairing marker ${mk[0]}`);
      return fails;
    }
    if (mode === 'what-happens-next') {
      const blocks = byY([...root.querySelectorAll('[data-lcs-next-block]')]);
      if (blocks.length !== +root.dataset.lcsStories) fails.push(`${blocks.length} blocks ≠ ${root.dataset.lcsStories}`);
      const slots = [];
      const pageStories = blocks.map((b) => b.el.dataset.lcsStory);
      blocks.forEach(({ el: b }, i) => {
        const id = b.dataset.lcsStory, sk = b.dataset.lcsSetkind, objs = b.dataset.lcsObjects.split(',');
        const given = byX([...b.querySelectorAll('[data-lcs-given]')]);
        if (given.map((g) => g.el.dataset.lcsStory + '#' + g.el.dataset.lcsRank).join(',') !== `${id}#1,${id}#2,${id}#3`) fails.push(`block ${i}: the given panels are not ranks 1, 2, 3 of ${id} in order`);
        if (!b.querySelector('[data-lcs-query]')) fails.push(`block ${i}: no query frame`);
        const ch = byX([...b.querySelectorAll('[data-lcs-choice]')]);
        if (ch.length !== 3) fails.push(`block ${i}: ${ch.length} choices ≠ 3`);
        const correct = ch.map((c, j) => (c.el.dataset.lcsChoiceStory === id && c.el.dataset.lcsChoiceRank === '4' ? j : -1)).filter((j) => j >= 0);
        if (correct.length !== 1) fails.push(`block ${i}: ${correct.length} choices are ${id} rank 4`);
        slots.push(correct[0]);
        for (const c of ch) {
          const cs = c.el.dataset.lcsChoiceStory, cr = +c.el.dataset.lcsChoiceRank;
          if (cs === id && cr === 4) continue;
          if (cs === id) { if (cr !== 1) fails.push(`block ${i}: a same-story foil at rank ${cr} (only the regression, rank 1, is legal)`); continue; }
          if (c.el.dataset.lcsChoiceSetkind === sk) fails.push(`block ${i}: the other-story foil ${cs} shares the stage "${sk}"`);
          if (c.el.dataset.lcsChoiceObjects.split(',').some((o) => objs.includes(o))) fails.push(`block ${i}: the other-story foil ${cs} shares an object`);
          if (pageStories.includes(cs)) fails.push(`block ${i}: the other-story foil ${cs} is a story on the page`);
          if ((root.dataset.lcsTrayIllegible || '').split(',').includes(cs)) fails.push(`block ${i}: the other-story foil ${cs} ends in a panel nobody can name at tray size (COMMON.TRAY_ILLEGIBLE)`);
        }
        if (!ch.some((c) => c.el.dataset.lcsChoiceStory === id && c.el.dataset.lcsChoiceRank === '1')) fails.push(`block ${i}: no regression foil`);
        if (!ch.some((c) => c.el.dataset.lcsChoiceStory !== id)) fails.push(`block ${i}: no other-story foil`);
      });
      const sj = slots.join('');
      if (sj === '012' || sj === '210' || new Set(slots).size !== slots.length) fails.push(`the correct choices sit in slots ${sj} (a staircase / repeat)`);
      return fails;
    }
    if (mode === 'beginning-middle-end') {
      const lines = [...root.querySelectorAll('[data-lcs-story-line]')];
      if (lines.length !== +root.dataset.lcsStories) fails.push(`${lines.length} lines ≠ ${root.dataset.lcsStories}`);
      const kinds = [];
      for (const ln of lines) {
        const id = ln.dataset.lcsStory;
        const cols = byX([...ln.querySelectorAll('[data-lcs-end], [data-lcs-drawbox]')]);
        const sig = cols.map((c) => (c.el.dataset.lcsEnd || 'draw')).join(',');
        if (sig !== 'first,draw,last') fails.push(`${id}: the line reads ${sig}`);
        const f = cols[0] && cols[0].el, l = cols[2] && cols[2].el, dr = cols[1];
        if (f && (f.dataset.lcsStory !== id || f.dataset.lcsRank !== '1')) fails.push(`${id}: the first card is not rank 1`);
        const lastRank = l ? +l.querySelector('[data-lcs-story-panel]').dataset.lcsRank : 0;
        if (l && (l.dataset.lcsStory !== id || +l.dataset.lcsRank !== lastRank || lastRank !== +ln.dataset.lcsPanels)) fails.push(`${id}: the last card is not the story's last rank (${lastRank} of ${ln.dataset.lcsPanels})`);
        if (dr) { if (!empty(dr.el) || dr.el.hasAttribute('data-lcs-rank')) fails.push(`${id}: the draw card is not empty`); if (dr.r.width < 200 || dr.r.height < 150) fails.push(`${id}: the draw card ${Math.round(dr.r.width)} x ${Math.round(dr.r.height)} (< 200 x 150)`); }
        const labs = byX([...ln.querySelectorAll('[data-lcs-bme-k]')]).map((x) => +x.el.dataset.lcsBmeK).join('');
        if (labs !== '012') fails.push(`${id}: the stage labels read ${labs}`);
        kinds.push(ln.dataset.lcsSetkind);
      }
      if (kinds.length === 2 && kinds[0] === kinds[1]) fails.push(`the two stories share the stage ${kinds[0]}`);
      return fails;
    }
    if (mode === 'sequencing-sentences') {
      const blocks = [...root.querySelectorAll('[data-lcs-match-block]')];
      const openers = JSON.parse(root.dataset.lcsOpeners4 || '[]');
      if (blocks.length !== 2) fails.push(`${blocks.length} match blocks ≠ 2`);
      const perms = [], sperms = [];
      for (const b of blocks) {
        const id = b.dataset.lcsStory;
        const sen = byY([...b.querySelectorAll('[data-lcs-sentence]')]);
        const ranks = sen.map((s) => +s.el.dataset.lcsRank);
        if (ranks.slice().sort().join('') !== '1234') fails.push(`${id}: sentence ranks ${ranks.join('')} are not 1..4`);
        // fix round 2: the child orders the sentences, so the sheet must not (scramble law on the sentence column)
        const sl = law(ranks); if (sl) fails.push(`${id}: the sentence column ${ranks.join('')} breaks the scramble law (${sl})`);
        sen.forEach((s, k) => {
          const rank = +s.el.dataset.lcsRank;
          const t = s.el.querySelector('[data-lcs-sentence-text]');
          // the opener belongs to the sentence's STORY rank, not to its printed row
          if (!t.textContent.startsWith(openers[rank - 1])) fails.push(`${id}: the rank-${rank} sentence does not open with "${openers[rank - 1]}"`);
          const lh = parseFloat(getComputedStyle(t).lineHeight);
          if (t.getBoundingClientRect().height > 2 * lh + 1) fails.push(`${id}: sentence row ${k + 1} runs past 2 lines`);
          const boxes = s.el.querySelectorAll('[data-lcs-order-box]');
          if (boxes.length !== 1) fails.push(`${id}: sentence row ${k + 1} carries ${boxes.length} order boxes (≠ 1)`);
          else {
            const bx = boxes[0], br = bx.getBoundingClientRect();
            if (bx.textContent.trim() !== '' || bx.children.length) fails.push(`${id}: the order box of row ${k + 1} carries content`);
            if (br.width < 36 || br.height < 36) fails.push(`${id}: the order box of row ${k + 1} is ${Math.round(br.width)} x ${Math.round(br.height)} (< 36 x 36)`);
            if (br.right > t.getBoundingClientRect().left + 0.5) fails.push(`${id}: the order box of row ${k + 1} overlaps its sentence`);
          }
        });
        const pics = byY([...b.querySelectorAll('[data-lcs-pic]')]);
        const seqs = pics.map((p) => +p.el.dataset.lcsSeq);
        if (seqs.slice().sort().join('') !== '1234') fails.push(`${id}: pictures ${seqs.join('')} are not 1..4`);
        const lf = law(seqs); if (lf) fails.push(`${id}: the picture column ${seqs.join('')} breaks the scramble law (${lf})`);
        // fix round 2: no picture sits STRAIGHT ACROSS from its own sentence (measured: the picture whose vertical
        // centre lies inside a sentence's row)
        for (const s of sen) {
          const r = s.r;
          const across = pics.filter((p) => { const c = (p.r.top + p.r.bottom) / 2; return c > r.top && c < r.bottom; });
          if (across.length !== 1) fails.push(`${id}: the rank-${s.el.dataset.lcsRank} sentence has ${across.length} pictures across from it (≠ 1)`);
          else if (+across[0].el.dataset.lcsSeq === +s.el.dataset.lcsRank) fails.push(`${id}: the rank-${s.el.dataset.lcsRank} picture sits straight across from its own sentence`);
        }
        perms.push(seqs); sperms.push(ranks);
      }
      if (perms.length === 2 && (perms[0].join('') === perms[1].join('') || perms[0].indexOf(1) === perms[1].indexOf(1))) fails.push('the two picture columns share a permutation / first slot');
      if (sperms.length === 2 && (sperms[0].join('') === sperms[1].join('') || sperms[0].indexOf(1) === sperms[1].indexOf(1))) fails.push('the two sentence columns share a permutation / first slot');
      return fails;
    }
    if (mode === 'retell-with-starters') {
      const starters = JSON.parse(root.dataset.lcsStarters4 || '[]');
      const help = JSON.parse(root.dataset.lcsHelp || '[]');
      const rows = byY([...root.querySelectorAll('[data-lcs-retell]')]);
      if (rows.length !== 4) fails.push(`${rows.length} retell rows ≠ 4`);
      let prev = 0;
      rows.forEach(({ el: r }, k) => {
        if (+r.dataset.lcsSeq !== k + 1) fails.push(`row ${k + 1} stamps seq ${r.dataset.lcsSeq}`);
        const rank = +r.dataset.lcsRank; if (!(rank > prev)) fails.push(`row ${k + 1}: rank ${rank} does not rise`); prev = rank;
        if (+r.dataset.lcsGlyphH < 24) fails.push(`row ${k + 1}: glyphH ${r.dataset.lcsGlyphH} < 24`);
        const st = r.querySelectorAll('[data-lcs-starter]');
        if (starters.length) { if (st.length !== 1 || st[0].textContent !== starters[k]) fails.push(`row ${k + 1}: starter "${st[0] && st[0].textContent}" ≠ "${starters[k]}"`); }
        const ruling = r.querySelector('[data-lcs-ruling]');
        const txt = [...ruling.querySelectorAll('text')].filter((t) => !t.hasAttribute('data-lcs-starter'));
        if (txt.length) fails.push(`row ${k + 1}: the writing rows carry text`);
      });
      const bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((x) => x.dataset.lcsBankWord);
      if (bank.join('|') !== help.join('|') || bank.length < 4 || bank.length > 6 || new Set(bank).size !== bank.length) fails.push(`the word bank ${bank.join(',')} ≠ the story's helpWords`);
      return fails;
    }
    return [`unknown face mode "${mode}"`];
  }, mode);
}

/**
 * Lead review 2026-09-23 (SPARSE: 230 / 250 / 220 px empty bands at d2): the cards take the whole lane
 * (tight gutters) and grow to near-square (vh = the panel's view height; the stage's pale backdrop fills
 * the room above the art), the tags grow to 80 x 76, and each row may stretch by `grow` px (the card
 * absorbs it) so no band on the page exceeds 40 px at the 814 / 722 / 677 chromes (gated + poisoned).
 * Stack at the 677 body (lane inner 649): d1 2 x (24 + 187.5 + 16 + 76) + 14 = 621 · d2 2 x (24 + 189.3 +
 * 16 + 76) + 14 = 625 · d3 2 x (24 + 156 + 16 + 60) + 14 = 526.
 */
const D = {
  1: { mode: 'base', stories: 2, panels: 3, sub: 'sub3', panelW: 200, gap: 19.5, vh: 150, tagW: 80, tagH: 76, grow: 50, answer: 'numeral' },
  2: { mode: 'base', stories: 2, panels: 4, sub: 'sub4', panelW: 153, gap: 9, vh: 198, tagW: 80, tagH: 76, grow: 50, answer: 'numeral' },
  3: { mode: 'base', stories: 2, panels: 5, sub: 'n5', panelW: 120, gap: 9.75, vh: 208, tagW: 64, tagH: 60, grow: 90, answer: 'numeral' },
};

module.exports = {
  id: 'K-379',
  slug: 'story-sequencing',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'story-sequencing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Story Sequencing: Number the Pictures',
      instruction: 'Look at what changes in each story, then write the numbers in the boxes to put the pictures in order.',
    },
  },

  scrambleLaw,
  drawPerm,
  storyPool,
  LAW5,
  LAW5_W,
  FACE_BUILD,
  faceVerify,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    return this._buildWith({ block: bank('story-sequencing', loc), config: this.difficulty[difficulty] }, { locale: loc }, ctx);
  },

  /**
   * The whole build over an INJECTED {block, config}; `plan` ({stories:[ids], perms:[[..]]})
   * and `composer` ('law' | 'derange') are GATE-ONLY seams (PR1 a forced rotation, PR2 the
   * inputs' derangement rule): build() never passes them.
   */
  _buildWith({ block, config, plan: planSeam, composer = 'law' }, { locale }, ctx) {
    const d = config;
    const loc = locale;
    if (!d) throw new Error('K-379: no config (the guard needs the resolved config, never the level index)');
    // Phase E: a face config carries its own mode; 'base' (the default path below) stays byte-identical
    if (d.mode !== 'base') {
      if (!FACE_BUILD[d.mode]) throw new Error(`K-379: unknown mode "${d.mode}" (refuse)`);
      if (!block) throw new Error(`K-379 ${loc}: no locale block (refuse)`);
      if (!block.strings || !block.strings[d.mode]) throw new Error(`K-379 ${loc}: strings.${d.mode} missing (refuse)`);
      return FACE_BUILD[d.mode](block, d, loc, ctx.rng, { plan: planSeam });
    }
    if (!block) throw new Error(`K-379 ${loc}: no locale block (refuse)`);
    if (!block.strings || !block.strings.base) throw new Error(`K-379 ${loc}: strings.base missing (refuse)`);
    if (![1, 2].includes(d.stories)) throw new Error(`K-379: stories ${d.stories}`);
    if (![3, 4, 5].includes(d.panels)) throw new Error(`K-379: panels ${d.panels}`);
    if (!['sub3', 'sub4', 'n5'].includes(d.sub)) throw new Error(`K-379: sub "${d.sub}"`);
    if (!(d.vh >= 120)) throw new Error(`K-379: vh ${d.vh} < 120`);
    if (!(d.panelW >= SP.MIN_W)) throw new Error(`K-379: panelW ${d.panelW} < ${SP.MIN_W}`);
    if (d.panels * d.panelW + (d.panels - 1) * d.gap > ROW_W + 0.5) throw new Error(`K-379: ${d.panels} x ${d.panelW} + gaps overflow ${ROW_W}`);
    if (d.answer !== 'numeral') throw new Error(`K-379: answer "${d.answer}" is not the base's numeral`);

    const pool = storyPool(block, loc, d.sub);
    const floor = d.panels === 5 ? d.stories : Math.max(3, d.stories);   // n5 exists for exactly two stories (sandwich, hopscotch)
    if (pool.length < floor) throw new Error(`K-379 ${loc}: ${pool.length} stories carry ${d.sub} after exclusions (< ${floor}; refuse)`);
    const rng = ctx.rng;

    let plan = null;
    if (planSeam) plan = { stories: planSeam.stories.map((id) => COMMON.stories.find((s) => s.id === id)), perms: planSeam.perms };
    for (let t = 0; t < TRIES && !plan; t++) {
      const picks = rng.sample(pool, d.stories);
      if (d.stories === 2) {
        const [a, b] = picks;
        if (a.setKind === b.setKind) continue;
        if (a.objects.some((o) => b.objects.includes(o))) continue;
      }
      const perms = [];
      for (let i = 0; i < d.stories; i++) {
        let p = null;
        for (let u = 0; u < TRIES && !p; u++) {
          const c = composer === 'derange' ? rng.shuffle(Array.from({ length: d.panels }, (_, k) => k + 1)) : drawPerm(d.panels, rng);
          if (composer === 'derange' && c.some((r, k) => r === k + 1)) continue;
          if (perms.some((q) => q.join('') === c.join('') || q.indexOf(1) === c.indexOf(1))) continue;
          p = c;
        }
        if (!p) break;
        perms.push(p);
      }
      if (perms.length === d.stories) plan = { stories: picks, perms };
    }
    if (!plan) throw new Error(`K-379 ${loc}: no composition in ${TRIES} tries (refuse)`);

    const rows = plan.stories.map((s, i) => {
      const sub = s[d.sub];
      if (!Array.isArray(sub) || sub.length !== d.panels) throw new Error(`K-379: story ${s.id} ${d.sub} is not ${d.panels} long`);
      const perm = plan.perms[i];
      const cards = perm.map((seq) => {
        const r = SP.storyPanel({ story: s, rank: sub[seq - 1], w: d.panelW, vh: d.vh, frame: false });
        return { svg: r.svg, w: r.width, h: r.height, seq, tag: { w: d.tagW, h: d.tagH }, anchor: s.anchor, sky: SKY(s) };
      });
      return C6.ssHungRow({ cards, w: ROW_W, gap: d.gap, under: 'tag', grow: d.grow, stamps: { story: s.id, setkind: s.setKind, objects: s.objects.join(','), panels: d.panels } });
    });
    const bodyHtml = C6.ssPage({ rows, stamps: { mode: 'base', stories: d.stories, panels: d.panels, 'panel-w': d.panelW } });
    return {
      bodyHtml,
      meta: {
        mode: 'base', stories: plan.stories.map((s) => s.id).join(','), perms: plan.perms.map((p) => p.join('')).join(','),
        answers: plan.perms.map((p) => p.join('')).join('|'),
      },
    };
  },

  /** Re-derives every tag's numeral from the card above it (runs in page.evaluate: no require). */
  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-story-sequencing]'); return r ? r.dataset.lcsMode : ''; });
    if (mode && mode !== 'base') return faceVerify(page, mode);
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-story-sequencing]');
      if (!root) return ['no story-sequencing root'];
      if (root.dataset.lcsMode !== 'base') return ['FACE'];
      const N = +root.dataset.lcsPanels, S = +root.dataset.lcsStories;
      const law = (perm) => {
        const n = perm.length, pos = []; perm.forEach((r, i) => { pos[r] = i; });
        if (perm.every((r, i) => r === i + 1)) return 'identity';
        if (perm.every((r, i) => r === n - i)) return 'reverse';
        let f = 0, b = 0, x = 0;
        for (let k = 1; k < n; k++) { if (pos[k + 1] === pos[k] + 1) f++; if (pos[k + 1] === pos[k] - 1) b++; }
        perm.forEach((r, i) => { if (r === i + 1) x++; });
        if (f > 1) return 'forward chain ' + f; if (b > 1) return 'backward chain ' + b; if (x > 1) return x + ' fixed points';
        return null;
      };
      const rows = [...root.querySelectorAll('[data-lcs-story-row]')];
      if (rows.length !== S) fails.push(`${rows.length} story rows ≠ ${S}`);
      if (root.querySelector('.ws-page [data-lcs-story-panel] text')) fails.push('a <text> inside a story panel');
      const perms = [];
      for (const row of rows) {
        const id = row.dataset.lcsStory;
        const cards = [...row.querySelectorAll('[data-lcs-card]')].map((el) => ({ el, r: el.getBoundingClientRect() })).sort((a, b) => a.r.left - b.r.left);
        const tags = [...row.querySelectorAll('[data-lcs-slot].ws-blankbox')].map((el) => ({ el, r: el.getBoundingClientRect() })).sort((a, b) => a.r.left - b.r.left);
        if (cards.length !== N) fails.push(`${id}: ${cards.length} cards ≠ ${N}`);
        if (tags.length !== N) fails.push(`${id}: ${tags.length} tags ≠ ${N}`);
        const seqs = cards.map((c) => +c.el.dataset.lcsSeq);
        const sorted = seqs.slice().sort((a, b) => a - b);
        if (sorted.join(',') !== Array.from({ length: N }, (_, k) => k + 1).join(',')) fails.push(`${id}: seq ${seqs.join('')} is not 1..${N} once each`);
        // the story rank stamped by the primitive must rise with the sequence (the primitive gate proves the stamps are the drawn order)
        const ranks = cards.map((c) => { const s = c.el.querySelector('[data-lcs-story-panel]'); return s ? { story: s.dataset.lcsStory, rank: +s.dataset.lcsRank } : null; });
        if (ranks.some((q) => !q || q.story !== id)) fails.push(`${id}: a card's panel is not this row's story`);
        const bySeq = cards.map((c, i) => [seqs[i], ranks[i] && ranks[i].rank]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
        for (let k = 1; k < bySeq.length; k++) if (!(bySeq[k] > bySeq[k - 1])) fails.push(`${id}: story rank does not rise with the sequence (${bySeq.join(',')})`);
        // each tag hangs under exactly one card and is EMPTY; its expected numeral = that card's seq
        tags.forEach((t, j) => {
          if (t.el.textContent.trim() !== '' || t.el.children.length) fails.push(`${id}: tag ${j} carries content`);
          if (t.el.dataset.lcsAnswer !== '') fails.push(`${id}: tag ${j} stamps an answer "${t.el.dataset.lcsAnswer}"`);
          const cx = (t.r.left + t.r.right) / 2;
          const above = cards.filter((c) => cx > c.r.left && cx < c.r.right && t.r.top >= c.r.bottom);
          if (above.length !== 1) fails.push(`${id}: tag ${j} hangs under ${above.length} cards`);
        });
        const lawFail = law(seqs);
        if (lawFail) fails.push(`${id}: the row ${seqs.join('')} breaks the scramble law (${lawFail})`);
        perms.push({ id, seqs, setKind: row.dataset.lcsSetkind, objects: (row.dataset.lcsObjects || '').split(',') });
      }
      if (perms.length === 2) {
        const [a, b] = perms;
        if (a.id === b.id) fails.push('the two rows tell the same story');
        if (a.setKind === b.setKind) fails.push(`the two stories share the stage "${a.setKind}"`);
        if (a.objects.some((o) => b.objects.includes(o))) fails.push('the two stories share an object');
        if (a.seqs.join('') === b.seqs.join('')) fails.push(`the two rows share the permutation ${a.seqs.join('')}`);
        if (a.seqs.indexOf(1) === b.seqs.indexOf(1)) fails.push(`both rows put their first picture in slot ${a.seqs.indexOf(1) + 1}`);
      }
      return fails;
    });
  },
};
