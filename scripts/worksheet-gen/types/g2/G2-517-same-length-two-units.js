/** G2-517 — Same Length, Two Units (measure-units factory, mode two-units; Year pages X, 2026-11-14) */
'use strict';
const { makeMeasureUnitsType } = require('../_shared/measure-units.js');
const type = makeMeasureUnitsType({
  id: 'G2-517', slug: 'same-length-two-units', mode: 'two-units', gradeBand: 'G2',
  i18n: { en: { title: "Same Length, Two Units", instruction: "Each ribbon was measured twice, with two different units. Write how many of each unit it took. Then fill in the circle for the unit it took more of." } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (review
 * en-3checks-f1116 of g2-measurement-time-money, part 2: "the right circle is the bottom one in both forms"). The page's
 * own rows, from as many pages of the level as it takes to have eight different ones, each a card of its own. On the
 * page the key fills the round mark of the unit the ribbon took more of; a check could not see WHICH of the two lines
 * that is (the mark is the first thing of either line), so every card looked like every other and form B could not
 * be told to put its right circle elsewhere. Here the line itself carries the mark of the key and the name of its unit
 * (data-lcs-label: clip, cube, stick): top or bottom is where the answer sits, and the unit is the answer.
 */
type.checkPage = function checkPage(args, ctx) {
  const { checkGrid } = require('../../lib/check-page.js');
  const cards = [], seen = new Set();
  for (let t = 0; t < 30 && cards.length < 8; t++) {
    const body = this.build(args, ctx).bodyHtml;
    for (const m of body.matchAll(/<section class="ws-card" data-lcs-card="\d+"><span class="ws-card-badge">\d+<\/span>([\s\S]*?)<\/section>/g)) {
      const sig = (/data-lcs-twounits="([^"]+)"/.exec(m[1]) || [])[1];
      // (2026-11-19, review en-1119-math: form B's first ribbon was form A's second, and both of B's were 4 clips long) a
      // ribbon of 4 or 6 clips is measured with craft sticks, one of 2, 3 or 5 with cubes: two rows of a part, one of each
      // unit, never share their number of clips (the ruling keyAttr two keeps form B off form A's rows)
      const [nClips, unit2] = sig.split('|');
      if (unit2 === 'stick' ? !['4', '6'].includes(nClips) : !['2', '3', '5'].includes(nClips)) continue;
      if (!sig || seen.has(sig) || cards.length >= 8) continue;
      seen.add(sig);
      let lines = 0;
      const inner = m[1].replace(/<span style="display:inline-flex;align-items:center;gap:7px"><span data-lcs-bubble="(\w+)"( data-lcs-correct)?/g, (s, tag, right) => { lines++; return `<span style="display:inline-flex;align-items:center;gap:7px" data-lcs-label="${tag}"${right || ''}><span data-lcs-bubble="${tag}"`; });
      if (lines !== 2) throw new Error(this.id + ' checkPage: a row with ' + lines + ' unit lines');
      cards.push(inner);
    }
  }
  if (cards.length < 5) throw new Error(this.id + ' checkPage: ' + cards.length + ' rows');
  return { bodyHtml: checkGrid(cards), meta: {} };
};

module.exports = type;
