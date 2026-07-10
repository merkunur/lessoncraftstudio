/* =====================================================================
   hazel.js — Hazel the squirrel, wsv-1 companion (debut:
   hazels-treehouse-trail). 512×640 source canvas, feet at (256,620);
   poses neutral/happy + idle ×6, no clips.

   Look per cast-bible: berry-purple body, creamDeep belly/muzzle, big
   curled tail with a cream swirl, tufted ears — deliberately distinct
   from Pip's orange fox silhouette.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX - 10, bodyCy = 472, bodyRx = 96, bodyRy = 112;
  const headCy = 268, headR = 120;

  /* ---- the big curled tail (behind, right): C-curl with a cream swirl ---- */
  const tx = bodyCx + bodyRx + 52;
  const tail =
    S.pathShape(
      `M ${bodyCx + bodyRx - 26} ${bodyCy + 72}
       C ${tx + 84} ${bodyCy + 84} ${tx + 116} ${bodyCy - 130} ${tx + 26} ${bodyCy - 190}
       C ${tx - 36} ${bodyCy - 230} ${tx - 86} ${bodyCy - 190} ${tx - 70} ${bodyCy - 140}
       C ${tx - 58} ${bodyCy - 170} ${tx - 12} ${bodyCy - 182} ${tx + 6} ${bodyCy - 148}
       C ${tx + 40} ${bodyCy - 84} ${tx + 24} ${bodyCy + 8} ${bodyCx + bodyRx - 30} ${bodyCy + 16} Z`,
      'berry', { outlined: true }) +
    S.stroke(
      `M ${tx + 10} ${bodyCy - 60} C ${tx + 26} ${bodyCy - 120} ${tx - 10} ${bodyCy - 158} ${tx - 44} ${bodyCy - 150}`,
      'cream', 22, { alpha: 0.9 });

  /* ---- legs ---- */
  const leg = (x) =>
    S.rrect(x - 24, bodyCy + bodyRy - 52, 48, FY - (bodyCy + bodyRy - 52), 22, 'berry', { outlined: true });
  const legs = leg(FX - 52) + leg(FX + 40);

  /* ---- body + belly ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'berry', { outlined: true }) +
    S.ellipse(bodyCx, bodyCy + 26, bodyRx * 0.58, bodyRy * 0.6, 'creamDeep');

  /* ---- arms ---- */
  function arm(side, up) {
    const a = ((up ? 140 : 22) * Math.PI) / 180;
    const sx = bodyCx + side * (bodyRx - 14), sy = bodyCy - 30;
    const ex = sx + side * Math.sin(a) * 82, ey = sy + Math.cos(a) * 82;
    return (
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('outline')}" stroke-width="42" stroke-linecap="round"/>` +
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('berry')}" stroke-width="26" stroke-linecap="round"/>` +
      S.circle(ex, ey, 22, 'creamDeep', { outlined: true, sw: 7 })
    );
  }
  const arms = arm(-1, p.happy) + arm(1, p.happy);

  /* ---- tufted ears ---- */
  const ear = (side) => {
    const bx = FX - 10 + side * 78, by = headCy - 84;
    return (
      S.pathShape(`M ${bx - side * 34} ${by} Q ${bx + side * 12} ${by - 92} ${bx + side * 44} ${by - 66} Q ${bx + side * 40} ${by - 18} ${bx + side * 22} ${by + 14} Z`, 'berry', { outlined: true }) +
      S.pathShape(`M ${bx - side * 8} ${by - 12} Q ${bx + side * 14} ${by - 56} ${bx + side * 28} ${by - 48} Q ${bx + side * 24} ${by - 16} ${bx + side * 12} ${by + 2} Z`, 'creamDeep') +
      S.stroke(`M ${bx + side * 18} ${by - 74} Q ${bx + side * 30} ${by - 96} ${bx + side * 26} ${by - 108}`, 'berry', 12)
    );
  };
  const ears = ear(-1) + ear(1);

  /* ---- head ---- */
  const head =
    S.ellipse(FX - 10, headCy, headR + 6, headR, 'berry', { outlined: true }) +
    S.ellipse(FX - 10, headCy + 52, 76, 56, 'creamDeep');

  /* ---- face ---- */
  const eyeY = headCy - 6;
  const eyes = p.happy
    ? S.eyeArc(FX - 62, eyeY, 20) + S.eyeArc(FX + 42, eyeY, 20)
    : S.eyeDot(FX - 62, eyeY, 19) + S.eyeDot(FX + 42, eyeY, 19);
  const nose = S.ellipse(FX - 10, headCy + 34, 15, 11, 'inkSoft');
  const mouth = p.happy
    ? S.stroke(`M ${FX - 38} ${headCy + 58} Q ${FX - 10} ${headCy + 84} ${FX + 18} ${headCy + 58}`, 'inkSoft', 9)
    : S.stroke(`M ${FX - 26} ${headCy + 62} Q ${FX - 10} ${headCy + 72} ${FX + 6} ${headCy + 62}`, 'inkSoft', 8);
  const blushes = S.blush(FX - 100, headCy + 38, 18) + S.blush(FX + 80, headCy + 38, 18);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, arms, ears, head, blushes, eyes, nose, mouth]
  );
  return S.doc(W, H, [rig]);
}

const spec = {
  poses: {
    neutral: { happy: false },
    happy: { happy: true },
  },
  idle: (i, n) => ({ happy: false, squash: Math.sin((i / n) * Math.PI * 2) * 0.018 }),
};

module.exports = { render, spec, W, H };
