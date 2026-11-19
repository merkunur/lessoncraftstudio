/** K-637 — Draw the Number on Two Ten-Frames (Year pages E, 2026-11-13; K.NBT.A.1): the number is printed, the child
 *  draws it into two empty ten-frames (K-448 is the other direction: the frames are filled, the child writes the
 *  number). Level 1 11 to 15, level 2 11 to 20, level 3 five numbers from 11 to 20. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');
const type = makeFrameMoreType({
  id: 'K-637', slug: 'draw-the-number-two-ten-frames', mode: 'double-frame',
  levels: { 1: { lo: 11, hi: 15, cards: 4, draw: true }, 2: { lo: 11, hi: 20, cards: 4, draw: true }, 3: { lo: 11, hi: 20, cards: 5, draw: true } },
  i18n: { en: { title: 'Draw the Number on Two Ten-Frames', instruction: 'Read the number. Draw that many dots in the two ten-frames. Fill the first ten-frame before you start the second.' } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (unit
 * k-teen-numbers-and-counting-to-100): the page is a card grid, but its cards carry no answer a cutter can read — the
 * answer is the dots the child draws, which only the key draws. Here the level's own cards (its numbers, eight of them,
 * no number twice), each a card of its own in a check grid; the key build of the same seed draws the dots into the
 * frames, and a key card that differs from its page card is how the check knows the card has an answer.
 */
type.checkPage = function checkPage(args, ctx) {
  const { checkGrid } = require('../../lib/check-page.js');
  const d = this.difficulty[args.difficulty] || this.difficulty[2];
  const self = Object.assign(Object.create(this), { difficulty: { check: { ...d, cards: Math.min(8, d.hi - d.lo + 1) } } });
  const body = this.build.call(self, { ...args, difficulty: 'check' }, ctx).bodyHtml;
  const cards = [...body.matchAll(/<section class="ws-card" data-lcs-card="\d+"><span class="ws-card-badge">\d+<\/span>([\s\S]*?)<\/section>/g)].map((m) => m[1]);
  if (cards.length < 5) throw new Error(this.id + ' checkPage: ' + cards.length + ' cards');
  return { bodyHtml: checkGrid(cards), meta: {} };
};

module.exports = type;
