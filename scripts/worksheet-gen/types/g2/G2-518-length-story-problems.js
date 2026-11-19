/** G2-518 — Length Story Problems (length-stories factory; Year pages AB, 2026-11-14; 2.MD.B.5) */
'use strict';
const { makeLengthStoriesType } = require('../_shared/length-stories.js');
const type = makeLengthStoriesType({
  id: 'G2-518', slug: 'length-story-problems', gradeBand: 'G2',
  i18n: { en: { title: "Length Story Problems", instruction: "Read each story. In the bar model, write the two lengths you know and a question mark for the length you need to find. The longest length goes in the top bar. Write an equation. Then write the answer." } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (review
 * en-3checks-f1116 of g2-measurement-time-money, part 4: "the key's bar model shows the number where the child writes
 * '?'"). The page's own stories, from as many pages of the level as it takes to have eight different ones, each a card
 * of its own (the key keeps "?" in the bar, as the worksheet's own key does since 2026-11-19).
 * 2026-11-19 (review en-1119-math, part 4: form B told form A's ribbon story again with other numbers, and needed no
 * regrouping where form A did): the check compared two stories by the shape of their sentences, so form B could only take
 * form A's sentence. The sentence is marked as a box without an answer of its own (data-lcs-answer="": the cutter reads
 * no shape from it, the key writes nothing into it), so two stories are one kind of task by what they ask: the card says
 * how (data-lcs-regroup: put together, take apart or compare, with or without a new ten or a ten taken apart), and form
 * B takes the story that shares the fewest words with form A's (lists otherWords).
 */
type.checkPage = function checkPage(args, ctx) {
  const { checkGrid } = require('../../lib/check-page.js');
  const cards = [], seen = new Set();
  for (let t = 0; t < 8 && cards.length < 8; t++) {
    const body = this.build(args, ctx).bodyHtml;
    const pieces = body.split('<div class="ws-card-stage"').slice(1);
    pieces.forEach((p, i) => {
      let card = '<div class="ws-card-stage"' + (i === pieces.length - 1 ? p.replace(/<\/div>\s*$/, '') : p);
      const sig = (/data-lcs-story="([^"]+)"/.exec(card) || [])[1];
      if (!sig || /data-lcs-example/.test(card) || seen.has(sig) || cards.length >= 8) return;
      seen.add(sig);
      const [kind, n1, n2, n3] = sig.split('|'), a = +n1, b = n2 === '' ? NaN : +n2, c = n3 === '' ? NaN : +n3;
      const put = kind === 'add' || kind === 'cmpMore';
      const [x, y] = kind === 'subChange' ? [a, c] : put ? [a, b] : [Math.max(a, b), Math.min(a, b)];
      const regroup = put ? (x % 10) + (y % 10) >= 10 : x % 10 < y % 10;
      const how = put ? 'join' : kind === 'cmpDiff' ? 'compare' : 'apart';
      card = card.replace('<div class="ws-card-stage"', `<div class="ws-card-stage" data-lcs-regroup="${how}${regroup ? '-new' : ''}"`)
        .replace(/<p ([^>]*)data-lcs-sentence>/, '<p $1data-lcs-sentence data-lcs-answer="">');
      if (!/data-lcs-sentence data-lcs-answer=""/.test(card)) throw new Error(this.id + ' checkPage: the story sentence changed its shape');
      // (second read of review en-1119-math: the key's note gave the addition of ANOTHER story) in English the key says under
      // a take-away or compare story which addition fits its bar, with the story's own numbers: 28 + 47 = 75 for 75 − 28
      // (the line has its height on the child's page too, empty there, so that the key's card is as tall as the page's)
      if (!put && String(args.locale || 'en').slice(0, 2) === 'en') {
        card = card.replace(/<\/div>\s*$/, '') + `<p style="margin:2px 0 0;height:20px;font-family:'Nunito';font-weight:700;font-size:14px;line-height:20px;color:#C9552E" data-lcs-keyalt>${ctx && ctx.answerKey ? `Also right: ${y} + ${x - y} = ${x}` : ''}</p></div>`;
      }
      cards.push(card);
    });
  }
  if (cards.length < 6) throw new Error(this.id + ' checkPage: ' + cards.length + ' stories');
  return { bodyHtml: checkGrid(cards), meta: {} };
};

module.exports = type;
