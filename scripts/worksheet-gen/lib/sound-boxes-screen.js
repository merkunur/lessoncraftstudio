/**
 * sound-boxes-screen.js — Level Set 2026-10-01 (Sound Boxes, PDF + interactive): the SCREEN version of a built
 * K-318 page (any face) and the robot's INDEPENDENT oracle. New pages only — the published pages never reach this file.
 *
 *   base / strip / tiers  tap-spell with SOUND tiles: one slot per sound, one tile per grapheme (a letter team such as
 *                         "sh" is ONE tile, exactly as it is one box on paper); tiers groups the slots by syllable.
 *                         The Sound Strip's hidden count lives on paper only (the runtime pairs tiles and slots).
 *   starter               the first sound printed in a teal box before the slots; the tiles are the other sounds.
 *   count                 tap-choice: the picture and the numbers 1-6; the answer is the number of sounds.
 *   blend                 tap-choice: the sounds printed in boxes and the page's three pictures; tap the one they make.
 * The oracle recomputes every answer from the locale's sound bank (lib/sound-boxes.js segment), never from the
 * page's stamps: the sounds of the vocab key, how many there are, and which picture's word they spell.
 * The answer key is the printed page with every box filled (K-318 ctx.keyFill), not built here.
 */
'use strict';
const { fileUri, vocab, displayWord } = require('./b2-common.js');
const { bank } = require('./b3-common.js');
const { segment } = require('./sound-boxes.js');
const { tileOrder } = require('./singular-plural-screen.js');

const SCR_W = 660, TILE = 100, SLOT = 76, OPT_H = 104, CORAL = '#F2784B', TEAL = '#146B5E';
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function card(attrs, inner) {
  return `<div data-lcs-item data-ws-content ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
}
const pic = (theme, noun, key, px) => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-pic="${esc(key)}" style="width:${px}px;height:${px}px;object-fit:contain">`;
const slotBox = () => `<span data-lcs-slot style="display:inline-block;width:${SLOT}px;height:${SLOT}px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:12px;background:#FFF"></span>`;
const printedBox = (t) => `<span data-lcs-printedbox style="display:inline-flex;align-items:center;justify-content:center;min-width:${SLOT}px;height:${SLOT}px;padding:0 8px;box-sizing:border-box;border:3px solid ${TEAL};border-radius:12px;background:#FFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:38px;color:${TEAL}">${esc(t)}</span>`;
const row = (html, gap = 8) => `<div style="display:flex;gap:${gap}px;justify-content:center;align-items:center;flex-wrap:wrap;max-width:640px">${html}</div>`;

function spellItem(c, theme, loc, face) {
  const given = face === 'starter' ? 1 : 0;
  const sounds = c.chunks.slice(given);
  const order = tileOrder(sounds, c.key + '|' + face + '|' + loc);
  let slots;
  if (face === 'tiers' && Array.isArray(c.rows) && c.rows.length > 1) {
    // one cluster of slots per syllable, a wide gap between clusters (the paper's arcs)
    slots = row(c.rows.map((r) => `<span data-lcs-syllable style="display:inline-flex;gap:8px;padding:6px 8px;border-top:4px solid ${TEAL};border-radius:14px 14px 0 0">${r.map(slotBox).join('')}</span>`).join(''), 24);
  } else {
    slots = row((given ? printedBox(c.chunks[0]) : '') + sounds.map(slotBox).join(''));
  }
  const tiles = row(order.map((v) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${esc(sounds[v])}" style="width:${TILE}px;height:${TILE}px;box-sizing:border-box;font-size:40px">${esc(sounds[v])}</span>`).join(''), 12);
  return card(`data-lcs-vocab="${esc(c.key)}" data-lcs-face="${face}" data-lcs-given="${given}" data-lcs-word="${esc(sounds.join(''))}"`,
    pic(theme, c.noun, c.key, 150) + slots + tiles);
}

function countItem(c, theme) {
  const w = Math.floor((SCR_W - 24 - 5 * 12) / 6);
  const opts = [1, 2, 3, 4, 5, 6].map((n, i) => `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${n}"${n === c.chunks.length ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:40px">${n}</span>`).join('');
  return card(`data-lcs-vocab="${esc(c.key)}" data-lcs-face="count"`, pic(theme, c.noun, c.key, 170) + row(opts, 12));
}

function blendItem(c, theme) {
  const boxes = row(c.chunks.map(printedBox).join(''));
  const opts = c.choices.map((ch, i) => `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(ch.key)}"${i === c.target ? ' data-lcs-correct="1"' : ''} style="width:190px;height:170px;box-sizing:border-box;padding:10px">${pic(theme, ch.noun, ch.key, 140)}</span>`).join('');
  return card(`data-lcs-face="blend" data-lcs-sounds="${esc(c.chunks.join('|'))}"`, boxes + row(opts, 14));
}

/** screen(built, ctx, loc, theme, face) — built.meta.cards (K-318 new pages). */
function screen(built, ctx, loc, theme, face) {
  const cards = built.meta.cards;
  if (!Array.isArray(cards) || !cards.length) throw new Error('sound-boxes screen: the built page carries no cards');
  const items = cards.map((c) => (face === 'count' ? countItem(c, theme) : face === 'blend' ? blendItem(c, theme) : spellItem(c, theme, loc, face))).join('');
  return { bodyHtml: `<div data-ws-content data-lcs-type="sound-boxes" data-lcs-screen="${face}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items}</div>`, meta: built.meta };
}

/** The bank's sounds for a vocab key, as the page shows them (de: the vocab capital in box 1). */
function soundsOf(key, loc, cfg) {
  const seg = segment(key, cfg);
  if (!seg) throw new Error(`sound-boxes oracle: no bank row for ${key}/${loc}`);
  if (!cfg.capitalBox1) return seg.flat;
  const e = vocab()[key] && vocab()[key][loc];
  const word = displayWord(e[0], loc);
  return [word.slice(0, [...seg.flat[0]].length), ...seg.flat.slice(1)];
}

function oracle(kind, items, l) {
  const loc = (l || 'en').slice(0, 2);
  const cfg = bank('sound-boxes', loc);
  return items.map((it) => {
    const m = it.meta || {};
    if (kind === 'count') {
      const n = segment(m['data-lcs-vocab'], cfg).flat.length;
      return it.options.findIndex((o) => Number(o) === n);
    }
    if (kind === 'blend') {
      const sounds = String(m['data-lcs-sounds'] || '').split('|').join('').toLocaleLowerCase(loc);
      const hits = it.options.map((k, i) => [i, segment(k, cfg)]).filter(([, s]) => s && s.flat.join('') === sounds);
      if (hits.length !== 1) throw new Error(`sound-boxes oracle: ${hits.length} pictures spell "${sounds}"`);
      return hits[0][0];
    }
    const sounds = soundsOf(m['data-lcs-vocab'], loc, cfg);
    return sounds.slice(Number(m['data-lcs-given'] || 0));
  });
}

/** The interactive declaration of a face: spell (base / strip), syllables (tiers), first (starter), count, blend. */
function interactiveFor(face) {
  if (face === 'count' || face === 'blend') {
    return {
      kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
      metaAttrs: ['data-lcs-vocab', 'data-lcs-face', 'data-lcs-sounds'], instructionKey: face, screenHeight: 6400,
      oracle: (items, l) => oracle(face, items, l),
    };
  }
  return {
    kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
    answerAttr: 'data-lcs-word', labelAttr: 'data-lcs-vocab', metaAttrs: ['data-lcs-vocab', 'data-lcs-face', 'data-lcs-given'],
    instructionKey: face === 'tiers' ? 'syllables' : face === 'starter' ? 'first' : 'spell', screenHeight: 6400,
    oracle: (items, l) => oracle('spell', items, l),
  };
}

module.exports = { screen, oracle, interactiveFor, soundsOf };
