/**
 * story-sequencing-screen.js — Level Set 2026-10-01 (Story Sequencing, PDF + interactive): the SCREEN version of a built
 * K-379 page (base or face) and the robot's INDEPENDENT oracle. New pages only — the published pages never reach this file.
 *
 *   base / first-next-last-cut   tap-spell with PICTURE tiles: each story is one item; its pictures (in the printed
 *                                page's scrambled order) each carry a sign (● ▲ ■ ◆ ★, by position, never by rank);
 *                                a tap puts the picture's sign in the next empty box under 1 2 3 … (or First / Next /
 *                                Last). The answer is the signs in story order.
 *   what-happens-next            tap-choice: the three pictures + the ? frame; the options are the printed tray.
 *   beginning-middle-end         tap-choice: the beginning, a ? frame, the end; three options — the middle, the end
 *                                again, and another story's middle.
 *   sequencing-sentences         tap-choice: one item per sentence; the options are the printed pictures.
 * The oracle recomputes every answer from the story bank (data/b6/story-sequencing.js), never from the page: the order
 * of a story's pictures is the order of their RANKS in the bank's panel list, and a sentence's picture is the panel
 * the bank's sentence list puts at that sentence's place (found by the sentence TEXT).
 */
'use strict';
const SP = require('../primitives/story-panel.js');
const { COMMON } = require('../data/b6/story-sequencing.js');
const { bank } = require('./b6-common.js');

const SCR_W = 660, TEAL = '#146B5E', CORAL = '#F2784B';
const SIGNS = ['●', '▲', '■', '◆', '★'];
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const byId = (id) => {
  const s = COMMON.stories.find((x) => x.id === id);
  if (!s) throw new Error('story-sequencing screen: no story ' + id);
  return s;
};
// a small deterministic hash (option order on the screen; never Math.random)
function hash(str) { let h = 2166136261; for (const c of String(str)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }

function card(attrs, inner) {
  return `<div data-lcs-item data-ws-content ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
}
const row = (html, gap = 10) => `<div style="display:flex;gap:${gap}px;justify-content:center;align-items:flex-start;flex-wrap:wrap;max-width:640px">${html}</div>`;
const pic = (s, rank, w, uid) => SP.storyPanel({ story: s, rank, w, frame: true, uid }).svg;
const queryBox = (w) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${w}px;height:${Math.round(w * 0.75)}px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:10px;background:#FFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:${Math.round(w * 0.4)}px;color:${CORAL}">?</span>`;

/** One story as a tap-spell item: the printed scrambled pictures with their signs, and one box per place. */
function orderItem(s, ranks, perm, under, i) {
  const n = ranks.length;
  // one row that fits the 640 px card: each tile adds 8 px padding + 5 px border, 14 px between tiles
  const tw = Math.min(180, Math.floor((636 - (n - 1) * 14) / n) - 13);
  const tiles = perm.map((seq, j) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${SIGNS[j]}" data-lcs-tile-rank="${ranks[seq - 1]}" style="position:relative;display:block;width:${tw}px;padding:4px;box-sizing:content-box;border-radius:12px;background:#FFF">` +
    pic(s, ranks[seq - 1], tw, 'scr' + i + 't' + j) +
    `<span aria-hidden="true" style="position:absolute;left:-6px;top:-6px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${TEAL};color:#FFF;font-size:${SIGNS[j] === '●' ? 30 : 22}px;line-height:1">${SIGNS[j]}</span></span>`).join('');
  const sw = Math.min(110, Math.floor((620 - (n - 1) * 12) / n));
  const slots = Array.from({ length: n }, (_, k) => `<span style="display:flex;flex-direction:column;align-items:center;gap:6px">` +
    `<span data-lcs-slot style="display:block;width:${sw}px;height:70px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:12px;background:#FFF"></span>` +
    `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${under[k].length > 9 ? 18 : 22}px;color:${TEAL};white-space:nowrap">${esc(under[k])}</span></span>`).join('');
  const answer = Array.from({ length: n }, (_, k) => SIGNS[perm.indexOf(k + 1)]).join('');
  return card(`data-lcs-answer="${answer}" data-lcs-story="${esc(s.id)}" data-lcs-ranks="${ranks.join(',')}" data-lcs-tiles="${perm.map((seq) => ranks[seq - 1]).join(',')}"`,
    row(tiles, 14) + row(slots, 12));
}

/** One tap-choice item: a top row (already html) + options [{ s, rank, correct }]. */
function choiceItem(attrs, top, opts, cap, i) {
  // one row that fits the 640 px card: each option adds 10 px padding + 5 px border, 14 px between options
  // (eight options — the mixed sentence list — sit in two rows of four)
  const per = opts.length > 4 ? Math.ceil(opts.length / 2) : opts.length;
  const w = Math.min(cap, Math.floor((636 - (per - 1) * 14) / per) - 15);
  const o = opts.map((op, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(op.s.id + '#' + op.rank)}"${op.correct ? ' data-lcs-correct="1"' : ''} style="display:block;width:${w}px;padding:5px;box-sizing:content-box;border-radius:12px;background:#FFF">${pic(op.s, op.rank, w, 'scr' + i + 'o' + j)}</span>`).join('');
  return card(attrs, top + row(o, 14));
}

// a FAIR seeded shuffle (2026-10-06: sorting by an FNV hash of "key|k" is not a fair permutation)
function order(arr, key) { return require('./answer-slots.js').seededShuffle(arr, key); }

/** screen(built, d, loc) — the screen body of a built page (d = the level config, loc = the locale). */
function screen(built, d, loc) {
  const m = built.meta;
  const SALT = require('./answer-slots.js').pageSalt(built);
  const ids = String(m.stories || '').split(',').filter(Boolean);
  let items = [];
  if (d.mode === 'base' || d.mode === 'first-next-last-cut') {
    const perms = String(m.perms).split(',').map((p) => p.split('').map(Number));
    const block = bank('story-sequencing', loc);
    items = ids.map((id, i) => {
      const s = byId(id), ranks = s[d.sub];
      const under = d.mode === 'base' ? ranks.map((_, k) => String(k + 1)) : d.panels === 4 ? block.openers4.map((w) => String(w).replace(/[\s,;:.]+$/u, '')) : block.words3;
      return orderItem(s, ranks, perms[i], under, i);
    });
  } else if (d.mode === 'what-happens-next') {
    const trays = JSON.parse(m.trays);
    items = ids.map((id, i) => {
      const s = byId(id);
      const top = row([1, 2, 3].map((r) => `<span style="display:block;width:132px">${pic(s, r, 132, 'scr' + i + 'g' + r)}</span>`).join('') + queryBox(132), 10);
      const opts = trays[i].map((x) => ({ s: byId(x.story), rank: x.rank, correct: x.story === id && x.rank === 4 }));
      return choiceItem(`data-lcs-story="${esc(id)}" data-lcs-face="next"`, top, opts, 150, i);
    });
  } else if (d.mode === 'beginning-middle-end') {
    const pool = COMMON.stories.filter((x) => Array.isArray(x.sub3) && (x.pools || []).includes('beginning-middle-end') && !ids.includes(x.id));
    items = ids.map((id, i) => {
      const s = byId(id), last = s.panels.length, mid = s.sub3[1];
      const others = pool.filter((o) => o.setKind !== s.setKind && !o.objects.some((x) => s.objects.includes(x)));
      const o = others[hash(id + '|' + m.stories) % others.length];
      const top = row(`<span style="display:block;width:170px">${pic(s, 1, 170, 'scr' + i + 'b')}</span>` + queryBox(170) + `<span style="display:block;width:170px">${pic(s, last, 170, 'scr' + i + 'e')}</span>`, 12);
      // one story on the page (level 1) gets the beginning again as a fourth choice
      const opts = order([{ s, rank: mid, correct: true }, { s, rank: last }, { s: o, rank: o.sub3[1] }, ...(ids.length === 1 ? [{ s, rank: 1 }] : [])], id + '|bme');
      return choiceItem(`data-lcs-story="${esc(id)}" data-lcs-face="middle"`, top, opts, ids.length === 1 ? 136 : 170, i);
    });
  } else if (d.mode === 'sequencing-sentences') {
    const block = bank('story-sequencing', loc);
    let pics, sens;
    if (m.mixed) {
      const dec = (str) => str.match(/[ab]\d/g).map((t) => ({ id: ids[t[0] === 'a' ? 0 : 1], seq: +t[1] }));
      pics = dec(m.pics); sens = dec(m.sens);
    } else {
      const perms = String(m.perms).split(',').map((p) => p.split('').map(Number));
      const sperms = String(m.sperms).split(',').map((p) => p.split('').map(Number));
      pics = []; sens = [];
      ids.forEach((id, i) => { perms[i].forEach((seq) => pics.push({ id, seq, group: i })); sperms[i].forEach((seq) => sens.push({ id, seq, group: i })); });
    }
    const w = m.mixed ? 126 : 140;
    items = sens.map((x, k) => {
      // each card's pictures in an order of their own (2026-10-06: the page's strip order on every card made the answers
      // a ROTATION — the sentences are scrambled against the pictures by a fixed offset so none sits straight across)
      const opts = order(pics.filter((p) => m.mixed || p.group === x.group).map((p) => { const s = byId(p.id); return { s, rank: s.sub4[p.seq - 1], correct: p.id === x.id && p.seq === x.seq }; }), SALT + x.id + '|' + x.seq + '|' + k);
      const text = block.stories[x.id].sentences[x.seq - 1];
      const top = `<div data-lcs-sentence-screen style="max-width:600px;text-align:center;font-family:'Nunito',sans-serif;font-weight:800;font-size:28px;line-height:1.3;color:#1F2B2A">${esc(text)}</div>`;
      return choiceItem(`data-lcs-face="match" data-lcs-sentence="${esc(text)}" data-lcs-stories="${esc(ids.join(','))}"`, top, opts, w, k);
    });
  } else {
    throw new Error('story-sequencing screen: no screen for ' + d.mode);
  }
  return { bodyHtml: `<div data-ws-content data-lcs-type="story-sequencing" data-lcs-screen="${esc(d.mode)}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`, meta: built.meta };
}

/* ------------------------------------------------------------------ the oracle (independent of the page's answers) */
const parseOpt = (label) => { const [id, r] = String(label).split('#'); return { id, rank: Number(r) }; };

function oracle(kind, items, l) {
  const loc = (l || 'en').slice(0, 2);
  return items.map((it) => {
    const m = it.meta || {};
    if (kind === 'order') {
      // the tiles' ranks are the bank's ranks of the pictures drawn; the story order is the bank's panel order
      const s = byId(m['data-lcs-story']);
      const tileRanks = String(m['data-lcs-tiles']).split(',').map(Number);
      if (tileRanks.length !== it.tiles.length) throw new Error('story-sequencing oracle: tiles / ranks mismatch');
      for (const r of tileRanks) if (!s.panels.some((p) => p.rank === r)) throw new Error(`story-sequencing oracle: ${s.id} has no panel ${r}`);
      return tileRanks.map((r, j) => ({ r, sign: it.tiles[j] })).sort((a, b) => a.r - b.r).map((x) => x.sign);
    }
    const opts = it.options.map(parseOpt);
    let hit;
    if (kind === 'next') {
      const s = byId(m['data-lcs-story']);
      hit = opts.map((o, i) => (o.id === s.id && o.rank === s.panels[s.panels.length - 1].rank ? i : -1)).filter((i) => i >= 0);
    } else if (kind === 'middle') {
      const s = byId(m['data-lcs-story']);
      const first = s.panels[0].rank, last = s.panels[s.panels.length - 1].rank;
      hit = opts.map((o, i) => (o.id === s.id && o.rank > first && o.rank < last ? i : -1)).filter((i) => i >= 0);
    } else {
      // the sentence's story + place come from the BANK text, then its picture is that place's panel
      const block = bank('story-sequencing', loc);
      const text = m['data-lcs-sentence'];
      const found = String(m['data-lcs-stories']).split(',').map((id) => ({ id, k: (block.stories[id] && block.stories[id].sentences || []).indexOf(text) })).filter((x) => x.k >= 0);
      if (found.length !== 1) throw new Error(`story-sequencing oracle: "${text}" is in ${found.length} stories`);
      const s = byId(found[0].id);
      hit = opts.map((o, i) => (o.id === s.id && o.rank === s.sub4[found[0].k] ? i : -1)).filter((i) => i >= 0);
    }
    if (hit.length !== 1) throw new Error(`story-sequencing oracle: ${hit.length} right options (${kind})`);
    return hit[0];
  });
}

function interactiveFor(face) {
  if (face === 'order') {
    return {
      kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
      answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-story', metaAttrs: ['data-lcs-story', 'data-lcs-tiles', 'data-lcs-ranks'],
      instructionKey: 'order', screenHeight: 6400,
      oracle: (items, l) => oracle('order', items, l),
    };
  }
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
    metaAttrs: ['data-lcs-story', 'data-lcs-face', 'data-lcs-sentence', 'data-lcs-stories'], instructionKey: face, screenHeight: 6400,
    oracle: (items, l) => oracle(face, items, l),
  };
}

module.exports = { screen, oracle, interactiveFor, SIGNS };
