/* =====================================================================
   luna.js — Luna the owl, wsv-1 companion (debut: lunas-starry-night,
   the Part 2 opener). 512×640 source canvas, feet at (256,620); poses
   neutral/happy + idle ×6, no clips.

   Look per cast-bible: creamDeep heart-shaped facial disc, sandDeep
   body and wing stubs, ear tufts, huge friendly night eyes.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX, bodyCy = 400, bodyRx = 150, bodyRy = 210;

  /* ---- feet ---- */
  const foot = (side) =>
    S.pathShape(`M ${FX + side * 62 - 32} ${FY} Q ${FX + side * 62} ${FY - 26} ${FX + side * 62 + 32} ${FY} Q ${FX + side * 62} ${FY - 6} ${FX + side * 62 - 32} ${FY} Z`, 'sunshine', { outlined: true, sw: 7 });
  const feet = foot(-1) + foot(1);

  /* ---- the one owl form (egg body) ---- */
  const body = S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'sandDeep', { outlined: true });

  /* ---- ear tufts ---- */
  const tuft = (side) =>
    S.pathShape(`M ${FX + side * 74} ${bodyCy - bodyRy + 42} Q ${FX + side * 112} ${bodyCy - bodyRy - 34} ${FX + side * 128} ${bodyCy - bodyRy + 14} Q ${FX + side * 96} ${bodyCy - bodyRy + 22} ${FX + side * 74} ${bodyCy - bodyRy + 42} Z`, 'sandDeep', { outlined: true, sw: 8 });
  const tufts = tuft(-1) + tuft(1);

  /* ---- wing stubs (raised when happy) ---- */
  function wing(side, up) {
    const sx = bodyCx + side * (bodyRx - 16), sy = bodyCy - 20;
    if (up) return S.pathShape(`M ${sx - side * 12} ${sy + 30} Q ${sx + side * 86} ${sy - 24} ${sx + side * 64} ${sy - 116} Q ${sx + side * 22} ${sy - 56} ${sx - side * 24} ${sy - 4} Z`, 'sandDeep', { outlined: true });
    return S.pathShape(`M ${sx - side * 18} ${sy - 24} Q ${sx + side * 64} ${sy - 4} ${sx + side * 48} ${sy + 116} Q ${sx + side * 8} ${sy + 118} ${sx - side * 22} ${sy + 58} Z`, 'sandDeep', { outlined: true });
  }
  const wings = wing(-1, p.happy) + wing(1, p.happy);

  /* ---- the heart-shaped facial disc ---- */
  const fdY = bodyCy - 92;
  const disc =
    S.pathShape(
      `M ${FX} ${fdY + 108}
       Q ${FX - 118} ${fdY + 64} ${FX - 112} ${fdY - 24}
       Q ${FX - 104} ${fdY - 92} ${FX - 40} ${fdY - 86}
       Q ${FX - 8} ${fdY - 82} ${FX} ${fdY - 62}
       Q ${FX + 8} ${fdY - 82} ${FX + 40} ${fdY - 86}
       Q ${FX + 104} ${fdY - 92} ${FX + 112} ${fdY - 24}
       Q ${FX + 118} ${fdY + 64} ${FX} ${fdY + 108} Z`,
      'creamDeep', { outlined: true, sw: 8 });

  /* ---- huge night eyes ---- */
  const eyeY = fdY - 8;
  function eye(offX) {
    const base = S.circle(FX + offX, eyeY, 40, 'cream', { outlined: true, sw: 7 });
    return p.happy ? base + S.eyeArc(FX + offX, eyeY, 16) : base + S.eyeDot(FX + offX, eyeY, 17);
  }
  const eyes = eye(-56) + eye(56);
  const beak = S.pathShape(`M ${FX - 14} ${eyeY + 34} L ${FX + 14} ${eyeY + 34} Q ${FX} ${eyeY + 66} ${FX - 14} ${eyeY + 34} Z`, 'sunshine', { outlined: true, sw: 6 });
  const blushes = S.blush(FX - 96, eyeY + 40, 14) + S.blush(FX + 96, eyeY + 40, 14);

  /* ---- belly feather marks ---- */
  const marks = S.stroke(
    `M ${FX - 44} ${bodyCy + 96} Q ${FX - 34} ${bodyCy + 110} ${FX - 24} ${bodyCy + 96}
     M ${FX + 4} ${bodyCy + 116} Q ${FX + 14} ${bodyCy + 130} ${FX + 24} ${bodyCy + 116}
     M ${FX - 20} ${bodyCy + 146} Q ${FX - 10} ${bodyCy + 160} ${FX} ${bodyCy + 146}`,
    'creamDeep', 8);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [feet, tufts, body, wings, marks, disc, blushes, eyes, beak]
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
