/* =====================================================================
   bramble.js — Bramble the jam-making bear cub, wsv-1 companion
   (debut: the-green-berry). 512×640 source canvas, feet at (256,620);
   poses neutral/happy + idle ×6, no clips.

   Look per cast-bible: sandDeep honey-brown body, creamDeep muzzle and
   belly patch, tiny round ears, a coral neckerchief dotted with jam.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const cx = FX;
  const headCy = 210, headR = 128;
  const bodyCy = 452, bodyRx = 150, bodyRy = 168;

  /* ---- feet (round paws) ---- */
  const feet =
    S.ellipse(cx - 78, FY - 18, 52, 34, 'sandDeep', { outlined: true }) +
    S.ellipse(cx + 78, FY - 18, 52, 34, 'sandDeep', { outlined: true });

  /* ---- body + belly patch ---- */
  const body =
    S.ellipse(cx, bodyCy, bodyRx, bodyRy, 'sandDeep', { outlined: true }) +
    S.ellipse(cx, bodyCy + 26, 96, 118, 'creamDeep');

  /* ---- arms (raised when happy) ---- */
  function arm(side, up) {
    const sx = cx + side * 132, sy = bodyCy - 66;
    if (up) {
      return S.pathShape(
        `M ${sx - side * 20} ${sy + 30} Q ${sx + side * 66} ${sy - 10} ${sx + side * 52} ${sy - 108}
         Q ${sx + side * 12} ${sy - 66} ${sx - side * 30} ${sy - 6} Z`,
        'sandDeep', { outlined: true }) +
        S.circle(sx + side * 52, sy - 104, 30, 'sandDeep', { outlined: true });
    }
    return S.pathShape(
      `M ${sx - side * 24} ${sy - 18} Q ${sx + side * 54} ${sy + 12} ${sx + side * 34} ${sy + 124}
       Q ${sx + side * 2} ${sy + 122} ${sx - side * 26} ${sy + 54} Z`,
      'sandDeep', { outlined: true }) +
      S.circle(sx + side * 34, sy + 120, 30, 'sandDeep', { outlined: true });
  }
  const arms = arm(-1, p.happy) + arm(1, p.happy);

  /* ---- head: round ears + round face + creamDeep muzzle ---- */
  const ears =
    S.circle(cx - 92, headCy - 96, 44, 'sandDeep', { outlined: true }) +
    S.circle(cx - 92, headCy - 96, 22, 'creamDeep') +
    S.circle(cx + 92, headCy - 96, 44, 'sandDeep', { outlined: true }) +
    S.circle(cx + 92, headCy - 96, 22, 'creamDeep');
  const head = S.circle(cx, headCy, headR, 'sandDeep', { outlined: true });
  const muzzle = S.ellipse(cx, headCy + 52, 66, 50, 'creamDeep');

  /* ---- face ---- */
  const eyeY = headCy - 14;
  const eyes = p.happy
    ? S.eyeArc(cx - 52, eyeY, 16) + S.eyeArc(cx + 52, eyeY, 16)
    : S.eyeDot(cx - 52, eyeY, 15) + S.eyeDot(cx + 52, eyeY, 15);
  const nose = S.ellipse(cx, headCy + 34, 20, 14, 'inkSoft');
  const mouth = S.stroke(
    `M ${cx - 20} ${headCy + 66} Q ${cx} ${headCy + 82} ${cx + 20} ${headCy + 66}`,
    'inkSoft', 7);
  const blushes = S.blush(cx - 94, headCy + 26, 15) + S.blush(cx + 94, headCy + 26, 15);

  /* ---- coral neckerchief with jam dots ---- */
  const kerchY = headCy + headR - 14;
  const kerchief =
    S.pathShape(
      `M ${cx - 96} ${kerchY} Q ${cx} ${kerchY + 34} ${cx + 96} ${kerchY}
       Q ${cx} ${kerchY + 62} ${cx - 96} ${kerchY} Z`,
      'coral', { outlined: true, sw: 7 }) +
    S.pathShape(
      `M ${cx - 26} ${kerchY + 40} L ${cx + 26} ${kerchY + 40} L ${cx} ${kerchY + 106} Z`,
      'coral', { outlined: true, sw: 7 }) +
    S.circle(cx - 44, kerchY + 22, 6, 'cream') +
    S.circle(cx + 40, kerchY + 24, 6, 'cream') +
    S.circle(cx - 4, kerchY + 66, 6, 'cream');

  const sx2 = 1 + p.squash * 0.6, sy2 = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx2} ${sy2}) translate(${-FX} ${-FY})"`,
    [feet, body, arms, ears, head, muzzle, blushes, eyes, nose, mouth, kerchief]
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
