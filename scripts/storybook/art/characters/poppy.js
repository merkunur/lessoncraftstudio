/* =====================================================================
   poppy.js — Poppy the hedgehog, wsv-1 companion (debut:
   poppys-big-harvest). 512×640 source canvas, feet at (256,620); poses
   neutral/happy + idle ×6, no clips.

   Look per cast-bible: sandDeep/orangeDeep spike crown (soft rounded
   bumps, never sharp — wsv rounded-geometry rule) over a creamDeep face
   and belly, tiny dark nose, stubby limbs. Gentle gardener.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX, bodyCy = 420, bodyR = 180;

  /* ---- spike crown: a dome of soft rounded bumps (back + top) ---- */
  const crown =
    S.circle(bodyCx, bodyCy, bodyR, 'orangeDeep', { outlined: true }) +
    S.pathShape(`M ${bodyCx - bodyR} ${bodyCy} ${Array.from({ length: 6 }, (_, i) => {
      const a0 = Math.PI - (i / 6) * Math.PI;
      const a1 = Math.PI - ((i + 0.5) / 6) * Math.PI;
      const a2 = Math.PI - ((i + 1) / 6) * Math.PI;
      const px = bodyCx + Math.cos(a1) * (bodyR + 44), py = bodyCy - Math.sin(a1) * (bodyR + 44);
      const ex = bodyCx + Math.cos(a2) * bodyR, ey = bodyCy - Math.sin(a2) * bodyR;
      return `Q ${px.toFixed(0)} ${py.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}`;
    }).join(' ')} Z`, 'sandDeep', { outlined: true });

  /* ---- stubby legs ---- */
  const leg = (x) =>
    S.rrect(x - 24, bodyCy + bodyR - 68, 48, FY - (bodyCy + bodyR - 68), 22, 'sandDeep', { outlined: true });
  const legs = leg(FX - 60) + leg(FX + 60);

  /* ---- face + belly (front) ---- */
  const face =
    S.ellipse(bodyCx, bodyCy + 48, 128, 132, 'creamDeep', { outlined: true });

  /* ---- arms ---- */
  function arm(side, up) {
    const a = ((up ? 140 : 30) * Math.PI) / 180;
    const sx = bodyCx + side * 148, sy = bodyCy + 96;
    const ex = sx + side * Math.sin(a) * 74, ey = sy + Math.cos(a) * 74;
    return (
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('outline')}" stroke-width="40" stroke-linecap="round"/>` +
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('creamDeep')}" stroke-width="25" stroke-linecap="round"/>` +
      S.circle(ex, ey, 21, 'sandDeep', { outlined: true, sw: 7 })
    );
  }
  const arms = arm(-1, p.happy) + arm(1, p.happy);

  /* ---- face details ---- */
  const eyeY = bodyCy + 18;
  const eyes = p.happy
    ? S.eyeArc(FX - 52, eyeY, 19) + S.eyeArc(FX + 52, eyeY, 19)
    : S.eyeDot(FX - 52, eyeY, 18) + S.eyeDot(FX + 52, eyeY, 18);
  const snout = S.ellipse(FX, bodyCy + 84, 44, 34, 'cream') + S.ellipse(FX, bodyCy + 72, 16, 12, 'inkSoft');
  const mouth = p.happy
    ? S.stroke(`M ${FX - 28} ${bodyCy + 102} Q ${FX} ${bodyCy + 124} ${FX + 28} ${bodyCy + 102}`, 'inkSoft', 8)
    : S.stroke(`M ${FX - 16} ${bodyCy + 106} Q ${FX} ${bodyCy + 116} ${FX + 16} ${bodyCy + 106}`, 'inkSoft', 7);
  const blushes = S.blush(FX - 92, bodyCy + 62, 17) + S.blush(FX + 92, bodyCy + 62, 17);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [legs, crown, face, arms, blushes, eyes, snout, mouth]
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
