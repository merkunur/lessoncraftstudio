/* =====================================================================
   bo.js — Bo the beaver, wsv-1 companion (debut: bos-wobbly-cart).
   512×640 source canvas, feet at (256,620); poses neutral/happy + idle ×6,
   no clips (joy reads in the pose swap).

   Look per cast-bible: sandDeep body, creamDeep belly, two big friendly
   cream front teeth, wide flat cross-hatched tail. Eager little builder.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX, bodyCy = 462, bodyRx = 108, bodyRy = 124;
  const headCy = 250, headR = 128;

  /* ---- flat paddle tail (behind, off to the right) ---- */
  const tail =
    S.ellipse(bodyCx + bodyRx + 46, bodyCy + 84, 108, 54, 'sandDeep', { outlined: true }) +
    S.stroke(
      `M ${bodyCx + bodyRx - 20} ${bodyCy + 66} L ${bodyCx + bodyRx + 130} ${bodyCy + 102}
       M ${bodyCx + bodyRx + 4} ${bodyCy + 116} L ${bodyCx + bodyRx + 120} ${bodyCy + 60}
       M ${bodyCx + bodyRx + 30} ${bodyCy + 46} L ${bodyCx + bodyRx + 96} ${bodyCy + 126}`,
      'outline', 6, { alpha: 0.45 });

  /* ---- legs ---- */
  const leg = (x) =>
    S.rrect(x - 26, bodyCy + bodyRy - 56, 52, FY - (bodyCy + bodyRy - 56), 24, 'sandDeep', { outlined: true });
  const legs = leg(FX - 54) + leg(FX + 54);

  /* ---- body + belly ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'sandDeep', { outlined: true }) +
    S.ellipse(bodyCx, bodyCy + 30, bodyRx * 0.6, bodyRy * 0.64, 'creamDeep');

  /* ---- arms (raised when happy) ---- */
  function arm(side, up) {
    const a = ((up ? 138 : 20) * Math.PI) / 180;
    const sx = bodyCx + side * (bodyRx - 16), sy = bodyCy - 36;
    const ex = sx + side * Math.sin(a) * 88, ey = sy + Math.cos(a) * 88;
    return (
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('outline')}" stroke-width="44" stroke-linecap="round"/>` +
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('sandDeep')}" stroke-width="28" stroke-linecap="round"/>` +
      S.circle(ex, ey, 24, 'creamDeep', { outlined: true, sw: 8 })
    );
  }
  const arms = arm(-1, p.happy) + arm(1, p.happy);

  /* ---- small round ears ---- */
  const ears =
    S.circle(FX - 96, headCy - 104, 34, 'sandDeep', { outlined: true }) +
    S.circle(FX - 96, headCy - 104, 16, 'creamDeep') +
    S.circle(FX + 96, headCy - 104, 34, 'sandDeep', { outlined: true }) +
    S.circle(FX + 96, headCy - 104, 16, 'creamDeep');

  /* ---- head ---- */
  const head =
    S.ellipse(FX, headCy, headR + 10, headR, 'sandDeep', { outlined: true }) +
    /* muzzle */
    S.ellipse(FX, headCy + 62, 78, 54, 'creamDeep');

  /* ---- face ---- */
  const eyeY = headCy - 14;
  const eyes = p.happy
    ? S.eyeArc(FX - 56, eyeY, 20) + S.eyeArc(FX + 56, eyeY, 20)
    : S.eyeDot(FX - 56, eyeY, 19) + S.eyeDot(FX + 56, eyeY, 19);
  const nose = S.ellipse(FX, headCy + 30, 20, 14, 'inkSoft');
  /* the signature big front teeth */
  const teeth =
    S.rrect(FX - 26, headCy + 52, 26, 42, 8, 'cream', { outlined: true, sw: 7 }) +
    S.rrect(FX + 0, headCy + 52, 26, 42, 8, 'cream', { outlined: true, sw: 7 });
  const mouth = p.happy
    ? S.stroke(`M ${FX - 40} ${headCy + 48} Q ${FX} ${headCy + 74} ${FX + 40} ${headCy + 48}`, 'inkSoft', 9)
    : S.stroke(`M ${FX - 28} ${headCy + 50} Q ${FX} ${headCy + 62} ${FX + 28} ${headCy + 50}`, 'inkSoft', 8);
  const blushes = S.blush(FX - 98, headCy + 34, 18) + S.blush(FX + 98, headCy + 34, 18);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, arms, ears, head, blushes, eyes, mouth, teeth, nose]
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
