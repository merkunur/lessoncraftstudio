/* =====================================================================
   gigi.js — Gigi the giraffe, wsv-1 companion (debut: gigis-tall-lookout,
   library story #13). 512×640 source canvas, feet at (256,620); poses
   neutral/happy + idle ×6, no clips.

   Look per cast-bible: sunshine body and long neck, sandDeep patches,
   ossicone tips and hooves, creamDeep muzzle and belly, short mane.
   FRONT-FACING and canvas-TALL — she IS the tall/short lesson (the
   vertical sibling of Noodle's length rig).
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCy = 460, bodyRx = 118, bodyRy = 96;
  const headCy = 120;

  /* ---- legs (two outer hind + two inner front), hooves sandDeep ---- */
  function leg(x, wd) {
    return S.rrect(x - wd / 2, bodyCy + 40, wd, FY - bodyCy - 40, wd / 2 - 4, 'sunshine', { outlined: true, sw: 7 }) +
      S.rrect(x - wd / 2 - 2, FY - 30, wd + 4, 30, 10, 'sandDeep', { outlined: true, sw: 6 });
  }
  const legs = leg(FX - 88, 40) + leg(FX + 88, 40) + leg(FX - 40, 44) + leg(FX + 40, 44);

  /* ---- body ---- */
  const body = S.ellipse(FX, bodyCy, bodyRx, bodyRy, 'sunshine', { outlined: true });
  const belly = S.ellipse(FX, bodyCy + 26, 72, 54, 'creamDeep');
  const bodyPatches =
    S.ellipse(FX - 74, bodyCy - 34, 26, 20, 'sandDeep') +
    S.ellipse(FX + 70, bodyCy - 18, 24, 19, 'sandDeep') +
    S.ellipse(FX + 44, bodyCy + 52, 20, 16, 'sandDeep');

  /* ---- the long neck (the tall lesson itself) ---- */
  const neck = S.pathShape(
    `M ${FX - 44} ${bodyCy - 60}
     Q ${FX - 40} ${headCy + 130} ${FX - 34} ${headCy + 46}
     L ${FX + 34} ${headCy + 46}
     Q ${FX + 40} ${headCy + 130} ${FX + 44} ${bodyCy - 60}
     Q ${FX} ${bodyCy - 96} ${FX - 44} ${bodyCy - 60} Z`,
    'sunshine', { outlined: true });
  const neckPatches =
    S.ellipse(FX - 12, headCy + 130, 18, 15, 'sandDeep') +
    S.ellipse(FX + 14, headCy + 210, 17, 14, 'sandDeep') +
    S.ellipse(FX - 10, headCy + 285, 18, 15, 'sandDeep');

  /* ---- head ---- */
  const ossicone = (side) =>
    S.stroke(`M ${FX + side * 34} ${headCy - 58} L ${FX + side * 40} ${headCy - 92}`, 'sunshine', 12) +
    S.circle(FX + side * 42, headCy - 98, 13, 'sandDeep', { outlined: true, sw: 6 });
  const ear = (side) =>
    S.ellipse(FX + side * 86, headCy - 24, 30, 18, 'sunshine', { outlined: true, sw: 7 });
  const head = S.ellipse(FX, headCy, 78, 66, 'sunshine', { outlined: true });
  const muzzle = S.ellipse(FX, headCy + 30, 46, 30, 'creamDeep', { outlined: true, sw: 6 });
  const nostrils = S.eyeDot(FX - 16, headCy + 26, 5) + S.eyeDot(FX + 16, headCy + 26, 5);
  const mouth = p.happy
    ? S.stroke(`M ${FX - 14} ${headCy + 42} Q ${FX} ${headCy + 54} ${FX + 14} ${headCy + 42}`, 'outline', 6)
    : S.stroke(`M ${FX - 10} ${headCy + 44} Q ${FX} ${headCy + 50} ${FX + 10} ${headCy + 44}`, 'outline', 5);
  const eyes = p.happy
    ? S.eyeArc(FX - 34, headCy - 12, 14) + S.eyeArc(FX + 34, headCy - 12, 14)
    : S.eyeDot(FX - 34, headCy - 12, 11) + S.eyeDot(FX + 34, headCy - 12, 11);
  const blushes = S.blush(FX - 62, headCy + 10, 13) + S.blush(FX + 62, headCy + 10, 13);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [legs, body, belly, bodyPatches, neck, neckPatches, ossicone(-1), ossicone(1), ear(-1), ear(1), head, muzzle, nostrils, mouth, blushes, eyes]
  );
  return S.doc(W, H, [rig]);
}

const spec = {
  poses: {
    neutral: { happy: false },
    happy: { happy: true },
  },
  idle: (i, n) => ({ happy: false, squash: Math.sin((i / n) * Math.PI * 2) * 0.012 }),
};

module.exports = { render, spec, W, H };
