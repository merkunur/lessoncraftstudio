/* =====================================================================
   kiko.js — Kiko the chameleon, wsv-1 companion (debut:
   kiko-paints-the-rainbow). 512×640 source canvas, feet at (256,620);
   poses neutral/happy + idle ×6, no clips.

   Look per cast-bible: leaf-green body, big curled spiral tail, a coral
   back-crest of rounded bumps, huge wondering eyes.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX - 24, bodyCy = 470, bodyRx = 120, bodyRy = 104;
  const headCx = FX - 10, headCy = 280, headR = 108;

  /* ---- the curled spiral tail (behind, right) ---- */
  const tx = bodyCx + bodyRx + 10, ty = bodyCy + 26;
  const tail =
    S.stroke(`M ${tx - 20} ${ty + 40} Q ${tx + 96} ${ty + 44} ${tx + 98} ${ty - 44} Q ${tx + 96} ${ty - 104} ${tx + 38} ${ty - 100} Q ${tx - 8} ${ty - 94} ${tx - 4} ${ty - 52} Q ${tx} ${ty - 22} ${tx + 32} ${ty - 26} Q ${tx + 52} ${ty - 32} ${tx + 50} ${ty - 54}`, 'outline', 42) +
    S.stroke(`M ${tx - 20} ${ty + 40} Q ${tx + 96} ${ty + 44} ${tx + 98} ${ty - 44} Q ${tx + 96} ${ty - 104} ${tx + 38} ${ty - 100} Q ${tx - 8} ${ty - 94} ${tx - 4} ${ty - 52} Q ${tx} ${ty - 22} ${tx + 32} ${ty - 26} Q ${tx + 52} ${ty - 32} ${tx + 50} ${ty - 54}`, 'leaf', 28);

  /* ---- legs ---- */
  const leg = (x) =>
    S.rrect(x - 24, bodyCy + bodyRy - 48, 48, FY - (bodyCy + bodyRy - 48), 22, 'leaf', { outlined: true });
  const legs = leg(FX - 78) + leg(FX + 16);

  /* ---- coral back-crest (rounded bumps along head top + back) ---- */
  const crest =
    S.pathShape(
      `M ${headCx - 40} ${headCy - headR + 10}
       Q ${headCx - 16} ${headCy - headR - 42} ${headCx + 12} ${headCy - headR + 2}
       Q ${headCx + 40} ${headCy - headR - 34} ${headCx + 64} ${headCy - headR + 12}
       Q ${headCx + 86} ${headCy - headR - 22} ${headCx + 98} ${headCy - headR + 26} Z`,
      'coral', { outlined: true, sw: 8 });

  /* ---- body + belly ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'leaf', { outlined: true }) +
    S.ellipse(bodyCx - 6, bodyCy + 26, bodyRx * 0.58, bodyRy * 0.55, 'mint');

  /* ---- arms (tiny mitts, raised when happy) ---- */
  function arm(side, up) {
    const a = ((up ? 138 : 26) * Math.PI) / 180;
    const sx = bodyCx + side * (bodyRx - 18), sy = bodyCy - 26;
    const ex = sx + side * Math.sin(a) * 70, ey = sy + Math.cos(a) * 70;
    return (
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('outline')}" stroke-width="38" stroke-linecap="round"/>` +
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('leaf')}" stroke-width="23" stroke-linecap="round"/>` +
      S.circle(ex, ey, 19, 'mint', { outlined: true, sw: 7 })
    );
  }
  const arms = arm(-1, p.happy) + arm(1, p.happy);

  /* ---- head (rounded with a soft casque) ---- */
  const head =
    S.ellipse(headCx, headCy, headR + 8, headR, 'leaf', { outlined: true }) +
    S.ellipse(headCx, headCy + 46, 70, 48, 'mint');

  /* ---- huge wondering eyes (turret style) ---- */
  const eyeY = headCy - 22;
  function eye(offX) {
    const base = S.circle(headCx + offX, eyeY, 34, 'leaf', { outlined: true, sw: 8 }) +
      S.circle(headCx + offX, eyeY, 24, 'white', { outlined: true, sw: 5 });
    return p.happy
      ? base + S.eyeArc(headCx + offX, eyeY, 11)
      : base + S.eyeDot(headCx + offX, eyeY, 10);
  }
  const eyes = eye(-52) + eye(52);
  const mouth = p.happy
    ? S.stroke(`M ${headCx - 34} ${headCy + 52} Q ${headCx} ${headCy + 78} ${headCx + 34} ${headCy + 52}`, 'inkSoft', 9)
    : S.stroke(`M ${headCx - 22} ${headCy + 56} Q ${headCx} ${headCy + 66} ${headCx + 22} ${headCy + 56}`, 'inkSoft', 8);
  const blushes = S.blush(headCx - 88, headCy + 32, 15) + S.blush(headCx + 88, headCy + 32, 15);

  const sx2 = 1 + p.squash * 0.6, sy2 = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx2} ${sy2}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, arms, crest, head, blushes, eyes, mouth]
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
