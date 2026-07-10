/* =====================================================================
   shelly.js — Shelly the hermit crab, wsv-1 companion (debut:
   shellys-seashells). 512×640 source canvas, feet at (256,620); poses
   neutral/happy + idle ×6, no clips (her joy reads in the pose swap —
   every clip would need a fallbackPose anyway).

   Look per cast-bible: coral/orange body, big friendly eyes on short
   stalks, a rounded cream-and-sand spiral shell she carries.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;

/* params: { happy:boolean, squash, lift } */
function render(p) {
  p = Object.assign({ happy: false, squash: 0, lift: 0 }, p);

  const bodyCx = FX - 58, bodyCy = 512, bodyRx = 96, bodyRy = 74;
  const shellCx = FX + 78, shellCy = 420, shellR = 128;

  /* ---- the shell home (behind the body): flat spiral, one shade step ---- */
  const spiralTurn = (r, sw) =>
    S.stroke(`M ${shellCx + r} ${shellCy} A ${r} ${r} 0 1 1 ${shellCx - r} ${shellCy} A ${r * 0.92} ${r * 0.92} 0 0 1 ${shellCx + r * 0.84} ${shellCy + r * 0.1}`, 'sandDeep', sw);
  const shell =
    S.circle(shellCx, shellCy, shellR, 'sand', { outlined: true }) +
    /* flat shade: lower-right crescent inside the rim */
    S.pathShape(
      `M ${shellCx + shellR * 0.98} ${shellCy + shellR * 0.2}
       A ${shellR} ${shellR} 0 0 1 ${shellCx - shellR * 0.2} ${shellCy + shellR * 0.98}
       A ${shellR * 1.25} ${shellR * 1.25} 0 0 0 ${shellCx + shellR * 0.98} ${shellCy + shellR * 0.2} Z`,
      'sandDeep', { alpha: 0.55 }) +
    spiralTurn(shellR * 0.66, 10) +
    spiralTurn(shellR * 0.38, 9) +
    S.circle(shellCx, shellCy, shellR * 0.14, 'sandDeep') +
    /* cream highlight arc, upper-left */
    S.stroke(`M ${shellCx - shellR * 0.72} ${shellCy - shellR * 0.4} A ${shellR * 0.86} ${shellR * 0.86} 0 0 1 ${shellCx - shellR * 0.05} ${shellCy - shellR * 0.84}`, 'cream', 16, { alpha: 0.9 });

  /* ---- little legs (three per side, under the body) ---- */
  const legsArr = [];
  for (let i = 0; i < 3; i++) {
    const lx = bodyCx - 58 + i * 42;
    legsArr.push(S.stroke(`M ${lx} ${bodyCy + bodyRy - 24} Q ${lx - 12} ${FY - 20} ${lx - 18} ${FY}`, 'outline', 24));
    legsArr.push(S.stroke(`M ${lx} ${bodyCy + bodyRy - 24} Q ${lx - 12} ${FY - 20} ${lx - 18} ${FY}`, 'orangeDeep', 13));
  }
  const legs = legsArr.join('');

  /* ---- body ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'coral', { outlined: true }) +
    S.ellipse(bodyCx - 8, bodyCy + 22, bodyRx * 0.56, bodyRy * 0.44, 'orange', { alpha: 0.65 });

  /* ---- claws: pac-man pincers (a wedge notch opening outward-up) ---- */
  function claw(side, up) {
    const sx = bodyCx + side * (bodyRx - 24), sy = bodyCy - 16;
    const ex = sx + side * (up ? 20 : 34), ey = (up ? sy - 86 : sy - 44) - 6;
    const r = 32;
    /* pincer = circle with a wedge cut: arc from mouth-edge A around to mouth-edge B */
    const mouthDir = up ? -60 : (side > 0 ? -35 : 215);   /* degrees; opening direction */
    const half = 26;                                       /* wedge half-angle */
    const rad = (d) => (d * Math.PI) / 180;
    const ax = ex + Math.cos(rad(mouthDir - half)) * r, ay = ey + Math.sin(rad(mouthDir - half)) * r;
    const bx = ex + Math.cos(rad(mouthDir + half)) * r, by = ey + Math.sin(rad(mouthDir + half)) * r;
    return (
      S.stroke(`M ${sx} ${sy} L ${ex} ${ey + 10}`, 'outline', 40) +
      S.stroke(`M ${sx} ${sy} L ${ex} ${ey + 10}`, 'orangeDeep', 25) +
      S.pathShape(`M ${ex} ${ey} L ${ax} ${ay} A ${r} ${r} 0 1 1 ${bx} ${by} Z`, 'coral', { outlined: true, sw: 8 })
    );
  }
  const claws = claw(-1, p.happy) + claw(1, p.happy);

  /* ---- eye stalks + big eyes ---- */
  function eyeStalk(offX, up) {
    const bx = bodyCx + offX, by = bodyCy - bodyRy + 18;
    const tx = bx + 6, ty = by - (up ? 118 : 102);
    const eye = p.happy
      ? S.circle(tx, ty - 18, 27, 'white', { outlined: true, sw: 8 }) + S.eyeArc(tx, ty - 18, 13)
      : S.circle(tx, ty - 18, 27, 'white', { outlined: true, sw: 8 }) + S.eyeDot(tx, ty - 18, 12);
    return (
      S.stroke(`M ${bx} ${by} Q ${bx + 2} ${ty + 30} ${tx} ${ty}`, 'outline', 30) +
      S.stroke(`M ${bx} ${by} Q ${bx + 2} ${ty + 30} ${tx} ${ty}`, 'coral', 17) +
      eye
    );
  }
  const eyes = eyeStalk(-42, p.happy) + eyeStalk(30, p.happy);

  /* ---- tiny mouth + blush ---- */
  const mouth = p.happy
    ? S.stroke(`M ${bodyCx - 22} ${bodyCy - 20} Q ${bodyCx - 6} ${bodyCy + 2} ${bodyCx + 10} ${bodyCy - 20}`, 'inkSoft', 9)
    : S.stroke(`M ${bodyCx - 16} ${bodyCy - 16} Q ${bodyCx - 6} ${bodyCy - 6} ${bodyCx + 4} ${bodyCy - 16}`, 'inkSoft', 8);
  const blushes = S.blush(bodyCx - 54, bodyCy - 26, 15) + S.blush(bodyCx + 42, bodyCy - 26, 15);

  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [shell, legs, body, claws, eyes, blushes, mouth]
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
