/* =====================================================================
   milo.js — Milo the penguin, wsv-1 companion (debut: milos-mitten-match).
   512×640 source canvas, feet at (256,620); poses neutral/happy + idle ×6,
   no clips.

   Look per cast-bible: night-navy body, cream belly + face patch,
   sunshine beak and webbed feet, little flipper wings.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const cx = FX, topY = 128, botY = 596;
  const midY = (topY + botY) / 2;

  /* ---- webbed feet ---- */
  const foot = (side) =>
    S.pathShape(`M ${cx + side * 88 - 40} ${FY} Q ${cx + side * 88} ${FY - 34} ${cx + side * 88 + 40} ${FY} Q ${cx + side * 88} ${FY - 8} ${cx + side * 88 - 40} ${FY} Z`, 'sunshine', { outlined: true, sw: 8 });
  const feet = foot(-1) + foot(1);

  /* ---- the one big penguin form ---- */
  const body =
    S.pathShape(
      `M ${cx} ${topY}
       C ${cx + 150} ${topY + 10} ${cx + 190} ${midY + 40} ${cx + 168} ${botY - 60}
       Q ${cx + 150} ${botY} ${cx} ${botY}
       Q ${cx - 150} ${botY} ${cx - 168} ${botY - 60}
       C ${cx - 190} ${midY + 40} ${cx - 150} ${topY + 10} ${cx} ${topY} Z`,
      'night', { outlined: true }) +
    /* cream belly */
    S.ellipse(cx, midY + 118, 118, 152, 'cream') +
    /* cream face patch (two lobes) */
    S.pathShape(
      `M ${cx - 92} ${topY + 108}
       Q ${cx - 96} ${topY + 28} ${cx - 30} ${topY + 46}
       Q ${cx} ${topY + 64} ${cx + 30} ${topY + 46}
       Q ${cx + 96} ${topY + 28} ${cx + 92} ${topY + 108}
       Q ${cx + 60} ${topY + 150} ${cx} ${topY + 150}
       Q ${cx - 60} ${topY + 150} ${cx - 92} ${topY + 108} Z`,
      'cream');

  /* ---- flippers (raised when happy) ---- */
  function flipper(side, up) {
    const sx = cx + side * 158, sy = midY - 30;
    if (up) {
      return S.pathShape(
        `M ${sx - side * 16} ${sy + 26} Q ${sx + side * 78} ${sy - 30} ${sx + side * 58} ${sy - 122}
         Q ${sx + side * 18} ${sy - 60} ${sx - side * 28} ${sy - 8} Z`,
        'night', { outlined: true });
    }
    return S.pathShape(
      `M ${sx - side * 22} ${sy - 26} Q ${sx + side * 62} ${sy + 6} ${sx + side * 34} ${sy + 130}
       Q ${sx + side * 2} ${sy + 130} ${sx - side * 26} ${sy + 60} Z`,
      'night', { outlined: true });
  }
  const flippers = flipper(-1, p.happy) + flipper(1, p.happy);

  /* ---- face ---- */
  const eyeY = topY + 92;
  const eyes = p.happy
    ? S.eyeArc(cx - 48, eyeY, 17) + S.eyeArc(cx + 48, eyeY, 17)
    : S.eyeDot(cx - 48, eyeY, 16) + S.eyeDot(cx + 48, eyeY, 16);
  const beak = S.pathShape(`M ${cx - 24} ${eyeY + 26} L ${cx + 24} ${eyeY + 26} Q ${cx} ${eyeY + 64} ${cx - 24} ${eyeY + 26} Z`, 'sunshine', { outlined: true, sw: 7 });
  const blushes = S.blush(cx - 82, eyeY + 26, 15) + S.blush(cx + 82, eyeY + 26, 15);

  const sx2 = 1 + p.squash * 0.6, sy2 = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx2} ${sy2}) translate(${-FX} ${-FY})"`,
    [feet, body, flippers, blushes, eyes, beak]
  );
  return S.doc(W, H, [rig]);
}

const spec = {
  poses: {
    neutral: { happy: false },
    happy: { happy: true },
  },
  idle: (i, n) => ({ happy: false, squash: Math.sin((i / n) * Math.PI * 2) * 0.016 }),
};

module.exports = { render, spec, W, H };
