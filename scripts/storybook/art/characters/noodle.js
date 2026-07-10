/* =====================================================================
   noodle.js — Noodle the dachshund, wsv-1 companion (debut:
   noodles-long-walk). 512×640 source canvas, feet at (256,620); poses
   neutral/happy + idle ×6, no clips. The library's first PROFILE
   quadruped rig — a looong low body facing right; he IS the long/short
   lesson.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyY = 452, bodyH = 132;
  const headCx = 402, headCy = 360;

  /* ---- the thin waggy tail (left end; up when happy) ---- */
  const tail = p.happy
    ? S.stroke('M 74 448 Q 28 396 40 332', 'outline', 26) + S.stroke('M 74 448 Q 28 396 40 332', 'orangeDeep', 14)
    : S.stroke('M 74 470 Q 22 470 14 428', 'outline', 26) + S.stroke('M 74 470 Q 22 470 14 428', 'orangeDeep', 14);

  /* ---- stubby legs (4) ---- */
  const leg = (x) =>
    S.rrect(x - 21, 522, 42, FY - 522, 19, 'orangeDeep', { outlined: true });
  const legs = leg(112) + leg(184) + leg(300) + leg(368);

  /* ---- the looong body ---- */
  const body =
    S.rrect(58, bodyY - bodyH / 2, 330, bodyH, 66, 'orangeDeep', { outlined: true }) +
    S.rrect(84, bodyY + 14, 280, 44, 22, 'creamDeep');

  /* ---- head + snout (profile, facing right) ---- */
  const head =
    S.circle(headCx, headCy, 76, 'orangeDeep', { outlined: true }) +
    S.ellipse(headCx + 62, headCy + 24, 46, 32, 'orangeDeep', { outlined: true, sw: 8 }) +
    S.ellipse(headCx + 58, headCy + 30, 34, 20, 'creamDeep') +
    S.circle(headCx + 102, headCy + 16, 12, 'inkSoft');

  /* ---- floppy ear (sandDeep drop, ON TOP of the head, draping past its edge) ---- */
  const ear = S.pathShape(
    `M ${headCx - 22} ${headCy - 68} Q ${headCx - 96} ${headCy - 52} ${headCx - 94} ${headCy + 30}
     Q ${headCx - 88} ${headCy + 74} ${headCx - 56} ${headCy + 58}
     Q ${headCx - 66} ${headCy + 2} ${headCx - 12} ${headCy - 50} Z`,
    'sandDeep', { outlined: true, sw: 8 });

  /* ---- face ---- */
  const eye = p.happy ? S.eyeArc(headCx + 18, headCy - 14, 15) : S.eyeDot(headCx + 16, headCy - 14, 14);
  const mouth = p.happy
    ? S.stroke(`M ${headCx + 46} ${headCy + 44} Q ${headCx + 62} ${headCy + 58} ${headCx + 82} ${headCy + 46}`, 'inkSoft', 8)
    : S.stroke(`M ${headCx + 52} ${headCy + 46} Q ${headCx + 66} ${headCy + 54} ${headCx + 80} ${headCy + 46}`, 'inkSoft', 7);
  const blushCheek = S.blush(headCx + 30, headCy + 26, 14);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, head, ear, blushCheek, eye, mouth]
  );
  return S.doc(W, H, [rig]);
}

const spec = {
  poses: {
    neutral: { happy: false },
    happy: { happy: true },
  },
  idle: (i, n) => ({ happy: false, squash: Math.sin((i / n) * Math.PI * 2) * 0.015 }),
};

module.exports = { render, spec, W, H };
