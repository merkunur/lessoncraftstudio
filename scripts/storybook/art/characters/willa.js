/* =====================================================================
   willa.js — Willa the duck, wsv-1 companion (debut: willas-washing-day).
   512×640 source canvas, feet at (256,620); poses neutral/happy + idle ×6,
   no clips.

   Look per cast-bible: cream feathers, sunshine bill + webbed feet,
   creamDeep wing, a tiny head-feather curl. Tidy and cheerful.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX, bodyCy = 452, bodyRx = 118, bodyRy = 128;
  const headCy = 236, headR = 104;

  /* ---- legs + webbed feet ---- */
  const leg = (x) =>
    S.stroke(`M ${x} ${bodyCy + bodyRy - 40} L ${x} ${FY - 26}`, 'outline', 30) +
    S.stroke(`M ${x} ${bodyCy + bodyRy - 40} L ${x} ${FY - 26}`, 'sunshine', 17) +
    S.pathShape(`M ${x - 34} ${FY} Q ${x} ${FY - 30} ${x + 34} ${FY} Q ${x} ${FY - 8} ${x - 34} ${FY} Z`, 'sunshine', { outlined: true, sw: 8 });
  const legs = leg(FX - 46) + leg(FX + 46);

  /* ---- tail tuft (behind, left) ---- */
  const tail = S.pathShape(
    `M ${bodyCx - bodyRx + 18} ${bodyCy + 30} Q ${bodyCx - bodyRx - 52} ${bodyCy + 10} ${bodyCx - bodyRx - 38} ${bodyCy - 46}
     Q ${bodyCx - bodyRx - 6} ${bodyCy - 20} ${bodyCx - bodyRx + 26} ${bodyCy - 16} Z`,
    'cream', { outlined: true });

  /* ---- body ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'cream', { outlined: true }) +
    S.ellipse(bodyCx + 8, bodyCy + 34, bodyRx * 0.56, bodyRy * 0.52, 'creamDeep', { alpha: 0.55 });

  /* ---- wings (raised when happy) ---- */
  function wing(side, up) {
    const sx = bodyCx + side * (bodyRx - 22), sy = bodyCy - 24;
    if (up) {
      return S.pathShape(
        `M ${sx} ${sy + 30} Q ${sx + side * 96} ${sy - 40} ${sx + side * 66} ${sy - 108}
         Q ${sx + side * 30} ${sy - 60} ${sx - side * 6} ${sy - 10} Z`,
        'creamDeep', { outlined: true });
    }
    return S.pathShape(
      `M ${sx - side * 10} ${sy - 20} Q ${sx + side * 74} ${sy - 6} ${sx + side * 56} ${sy + 88}
       Q ${sx + side * 12} ${sy + 96} ${sx - side * 16} ${sy + 56} Z`,
      'creamDeep', { outlined: true });
  }
  const wings = wing(-1, p.happy) + wing(1, p.happy);

  /* ---- head ---- */
  const head =
    S.circle(FX, headCy, headR, 'cream', { outlined: true }) +
    /* the tiny feather curl */
    S.stroke(`M ${FX + 6} ${headCy - headR + 4} Q ${FX + 26} ${headCy - headR - 30} ${FX + 48} ${headCy - headR - 18}`, 'cream', 14) +
    S.stroke(`M ${FX + 6} ${headCy - headR + 4} Q ${FX + 26} ${headCy - headR - 30} ${FX + 48} ${headCy - headR - 18}`, 'outline', 4, { alpha: 0.4 });

  /* ---- bill (wide, flat, friendly) ---- */
  const billY = headCy + 34;
  const bill =
    S.pathShape(`M ${FX - 56} ${billY - 10} Q ${FX} ${billY - 34} ${FX + 56} ${billY - 10} Q ${FX} ${billY + 18} ${FX - 56} ${billY - 10} Z`, 'sunshine', { outlined: true, sw: 8 }) +
    S.pathShape(`M ${FX - 40} ${billY + 2} Q ${FX} ${billY + 26} ${FX + 40} ${billY + 2} Q ${FX} ${billY + 34} ${FX - 40} ${billY + 2} Z`, 'sunshine', { outlined: true, sw: 7 });

  /* ---- face ---- */
  const eyeY = headCy - 18;
  const eyes = p.happy
    ? S.eyeArc(FX - 44, eyeY, 17) + S.eyeArc(FX + 44, eyeY, 17)
    : S.eyeDot(FX - 44, eyeY, 16) + S.eyeDot(FX + 44, eyeY, 16);
  const blushes = S.blush(FX - 78, headCy + 12, 15) + S.blush(FX + 78, headCy + 12, 15);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, wings, head, blushes, eyes, bill]
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
