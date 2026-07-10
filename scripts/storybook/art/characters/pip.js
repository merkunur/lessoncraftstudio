/* =====================================================================
   pip.js — Pip the fox, FINAL wsv-1 art (the platform's guide).

   Same atlas contract as the placeholder era (512×640 source canvas, feet
   at 256,620; pose_neutral/talk/happy/point + idle ×6 + clip_celebrate ×24)
   so the redraw drops into any story with zero story.json changes.

   Design per docs/storybook/visual-style-standard.md: flat fills, one
   `outline` stroke, oversized head (~42% of height), big friendly eyes,
   rounded geometry, cream belly/muzzle, cheek fluff, cream-tipped tail.
   Rig is parametric — poses/idle/clips are re-poses, never redraws.
   ===================================================================== */
'use strict';
const S = require('../style-lib.js');

const W = 512, H = 640;
const FX = 256, FY = 620;          /* feet anchor */

/* params: { mouth:'closed'|'smile'|'open', eyes:'open'|'smile',
             armL, armR (deg up from hanging), squash, lift, blush } */
function render(p) {
  p = Object.assign({ mouth: 'closed', eyes: 'open', armL: 12, armR: 12, squash: 0, lift: 0, blush: true }, p);

  const bodyCx = FX, bodyCy = 468, bodyRx = 104, bodyRy = 122;
  const headCy = 258, headRx = 148, headRy = 134;

  /* ---- tail (behind everything): S-curve with a cream tip ---- */
  const tail = [
    S.pathShape(
      `M ${bodyCx + bodyRx - 30} ${bodyCy + 66}
       C ${bodyCx + bodyRx + 118} ${bodyCy + 66} ${bodyCx + bodyRx + 132} ${bodyCy - 118} ${bodyCx + bodyRx + 44} ${bodyCy - 128}
       C ${bodyCx + bodyRx + 96} ${bodyCy - 66} ${bodyCx + bodyRx + 60} ${bodyCy + 8} ${bodyCx + bodyRx - 34} ${bodyCy + 10} Z`,
      'orange', { outlined: true }),
    S.pathShape(
      `M ${bodyCx + bodyRx + 44} ${bodyCy - 128}
       C ${bodyCx + bodyRx + 100} ${bodyCy - 78} ${bodyCx + bodyRx + 84} ${bodyCy - 38} ${bodyCx + bodyRx + 52} ${bodyCy - 34}
       C ${bodyCx + bodyRx + 76} ${bodyCy - 66} ${bodyCx + bodyRx + 68} ${bodyCy - 96} ${bodyCx + bodyRx + 44} ${bodyCy - 128} Z`,
      'cream'),
  ].join('');

  /* ---- legs: rounded stubs to the feet line ---- */
  const leg = (x) =>
    S.rrect(x - 25, bodyCy + bodyRy - 58, 50, FY - (bodyCy + bodyRy - 58), 24, 'orangeDeep', { outlined: true });
  const legs = leg(FX - 52) + leg(FX + 52);

  /* ---- body + belly ---- */
  const body =
    S.ellipse(bodyCx, bodyCy, bodyRx, bodyRy, 'orange', { outlined: true }) +
    S.ellipse(bodyCx, bodyCy + 34, bodyRx * 0.6, bodyRy * 0.62, 'cream');

  /* ---- arms: outline capsule + inner fill + mitten paw ---- */
  function arm(deg, side) {
    /* deg = rotation from hanging-straight-down, opening outward-up:
       0 = down, 90 = horizontal out, 140 = raised up-out */
    const a = (deg * Math.PI) / 180;
    const sx = bodyCx + side * (bodyRx - 16), sy = bodyCy - 34;
    const ex = sx + side * Math.sin(a) * 92, ey = sy + Math.cos(a) * 92;
    return (
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('outline')}" stroke-width="46" stroke-linecap="round"/>` +
      `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${S.token('orangeDeep')}" stroke-width="30" stroke-linecap="round"/>` +
      S.circle(ex, ey, 25, 'orange', { outlined: true, sw: 8 })
    );
  }
  const arms = arm(p.armL, -1) + arm(p.armR, 1);

  /* ---- ears (base under the head outline) ---- */
  const ear = (side) => {
    const bx = FX + side * 96, by = headCy - 92;
    const tx = FX + side * 152, ty = headCy - 208;
    return (
      S.pathShape(`M ${bx - side * 44} ${by} Q ${tx} ${ty - 18} ${tx + side * 6} ${ty + 26} Q ${bx + side * 52} ${by - 30} ${bx + side * 30} ${by + 26} Z`, 'orange', { outlined: true }) +
      S.pathShape(`M ${bx + side * 2} ${by - 12} Q ${tx - side * 6} ${ty + 16} ${tx - side * 10} ${ty + 42} Q ${bx + side * 26} ${by - 20} ${bx + side * 2} ${by - 12} Z`, 'creamDeep')
    );
  };
  const ears = ear(-1) + ear(1);

  /* ---- head: rounded with cheek fluff ---- */
  const head =
    S.pathShape(
      `M ${FX - headRx} ${headCy + 6}
       C ${FX - headRx - 4} ${headCy - 92} ${FX - 92} ${headCy - headRy} ${FX} ${headCy - headRy}
       C ${FX + 92} ${headCy - headRy} ${FX + headRx + 4} ${headCy - 92} ${FX + headRx} ${headCy + 6}
       C ${FX + headRx - 4} ${headCy + 52} ${FX + 112} ${headCy + 84} ${FX + 62} ${headCy + 104}
       L ${FX + 74} ${headCy + 64} L ${FX + 30} ${headCy + 96}
       C ${FX + 12} ${headCy + 102} ${FX - 12} ${headCy + 102} ${FX - 30} ${headCy + 96}
       L ${FX - 74} ${headCy + 64} L ${FX - 62} ${headCy + 104}
       C ${FX - 112} ${headCy + 84} ${FX - headRx + 4} ${headCy + 52} ${FX - headRx} ${headCy + 6} Z`,
      'orange', { outlined: true }) +
    /* muzzle mask */
    S.ellipse(FX, headCy + 58, 84, 60, 'cream');

  /* ---- face ---- */
  const eyeY = headCy - 8;
  const eyes = p.eyes === 'smile'
    ? S.eyeArc(FX - 62, eyeY, 22) + S.eyeArc(FX + 62, eyeY, 22)
    : S.eyeDot(FX - 62, eyeY, 21) + S.eyeDot(FX + 62, eyeY, 21);
  const nose = S.pathShape(`M ${FX - 16} ${headCy + 34} Q ${FX} ${headCy + 26} ${FX + 16} ${headCy + 34} Q ${FX} ${headCy + 58} ${FX - 16} ${headCy + 34} Z`, 'inkSoft');
  let mouth;
  if (p.mouth === 'open') {
    mouth = S.pathShape(`M ${FX - 26} ${headCy + 70} Q ${FX} ${headCy + 108} ${FX + 26} ${headCy + 70} Q ${FX} ${headCy + 82} ${FX - 26} ${headCy + 70} Z`, 'inkSoft') +
      S.pathShape(`M ${FX - 14} ${headCy + 84} Q ${FX} ${headCy + 100} ${FX + 14} ${headCy + 84} Q ${FX} ${headCy + 92} ${FX - 14} ${headCy + 84} Z`, 'coral');
  } else if (p.mouth === 'smile') {
    mouth = S.stroke(`M ${FX - 30} ${headCy + 66} Q ${FX} ${headCy + 94} ${FX + 30} ${headCy + 66}`, 'inkSoft', 10);
  } else {
    mouth = S.stroke(`M ${FX - 18} ${headCy + 70} Q ${FX} ${headCy + 82} ${FX + 18} ${headCy + 70}`, 'inkSoft', 9);
  }
  const blushes = p.blush ? S.blush(FX - 108, headCy + 44, 20) + S.blush(FX + 108, headCy + 44, 20) : '';

  /* squash-stretch + lift about the feet anchor */
  const sx = 1 + p.squash * 0.6, sy = 1 - p.squash;
  const rig = S.group(
    `transform="translate(0 ${-p.lift}) translate(${FX} ${FY}) scale(${sx} ${sy}) translate(${-FX} ${-FY})"`,
    [tail, legs, body, arms, ears, head, blushes, eyes, nose, mouth]
  );
  return S.doc(W, H, [rig]);
}

/* the atlas frame spec (style-lib standardPoseSet consumes this) */
const spec = {
  poses: {
    neutral: { mouth: 'closed', eyes: 'open', armL: 16, armR: 16 },
    talk: { mouth: 'open', eyes: 'open', armL: 16, armR: 74 },
    happy: { mouth: 'smile', eyes: 'smile', armL: 142, armR: 142 },
    point: { mouth: 'smile', eyes: 'open', armL: 14, armR: 112 },
  },
  idle: (i, n) => ({ mouth: 'closed', eyes: 'open', armL: 16, armR: 16, squash: Math.sin((i / n) * Math.PI * 2) * 0.02 }),
  clips: {
    celebrate: (i, n) => {
      const t = i / (n - 1);
      const lift = Math.max(0, Math.sin(t * Math.PI * 2) * 88);
      const up = lift > 18;
      return {
        mouth: up ? 'open' : 'smile', eyes: 'smile',
        armL: up ? 148 : 28, armR: up ? 148 : 28,
        lift, squash: lift > 0 ? -0.03 : 0.035,
      };
    },
  },
};

module.exports = { render, spec, W, H };
