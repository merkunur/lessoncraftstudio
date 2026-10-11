/**
 * hm-slots.js — derive a scene's mouth geometry from its SLOT names (b8 Handmade Mazes).
 *
 * A face names where its hero starts and where its goal waits (design B §2.6: BL BC BR L R TL TC TR, no two faces
 * sharing a generator + mouth pair). From the slot and the drawing's height this derives, in maze-box coordinates:
 *   keep    — a keep-out disc the maze's stations avoid (the drawing stands there);
 *   target  — the point whose nearest station becomes the route's mouth station;
 *   mouth   — where the start disc / goal flag sits (the corridor's outer end, at the drawing's edge);
 *   feet    — where the drawing stands (its ink bottom centre).
 * A scene may override any of them (a tall goal tree whose crown rises into the scenery band).
 */
'use strict';

const CORNER = {
  TL: [0, 0], TC: [0.5, 0], TR: [1, 0], L: [0, 0.5], R: [1, 0.5], BL: [0, 1], BC: [0.5, 1], BR: [1, 1],
};

/**
 * slot(name, h, box = {w, h}) → { keep:[x,y,r], target:[x,y], mouth:[x,y], feet:[x,y] }
 * The drawing's square footprint (side ≈ h) sits against the corner with a small inset; the mouth sits on the
 * footprint's edge facing the box centre; the target sits a little further in (the nearest station becomes the mouth
 * station, and the mouth corridor stays short).
 */
function slot(name, h, box) {
  const c = CORNER[name]; if (!c) throw new Error('hm-slots: unknown slot ' + name);
  const half = h * 0.52, inset = 6;
  const cx = c[0] === 0 ? inset + half : c[0] === 1 ? box.w - inset - half : box.w / 2;
  const cy = c[1] === 0 ? inset + half : c[1] === 1 ? box.h - inset - half : box.h / 2;
  const tx = box.w / 2 - cx, ty = box.h / 2 - cy, L = Math.hypot(tx, ty) || 1, ux = tx / L, uy = ty / L;
  const mouth = [cx + ux * (half + 14), cy + uy * (half + 14)];
  return {
    keep: [+cx.toFixed(1), +cy.toFixed(1), +(half + 16).toFixed(1)],
    target: [+(cx + ux * (half + 60)).toFixed(1), +(cy + uy * (half + 60)).toFixed(1)],
    mouth: [+mouth[0].toFixed(1), +mouth[1].toFixed(1)],
    feet: [+cx.toFixed(1), +(cy + h / 2).toFixed(1)],
  };
}

/** apply the slots to a scene spec: fills maze.start / goal / startMouth / goalMouth / keep and hero.at / goal.at */
function withSlots(sc) {
  if (!sc.slots) return sc;
  const box = sc.maze.box;
  const s = slot(sc.slots[0], sc.hero.h, box), g = slot(sc.slots[1], sc.goal.h, box);
  const o = sc.slotOverrides || {};
  const keep = [o.startKeep || s.keep, o.goalKeep || g.keep].concat(sc.extraKeep || []);
  return {
    ...sc,
    keep,
    maze: { ...sc.maze, keep, start: o.startTarget || s.target, goal: o.goalTarget || g.target, startMouth: o.startMouth || s.mouth, goalMouth: o.goalMouth || g.mouth },
    hero: { ...sc.hero, at: o.heroAt || sc.hero.at || s.feet },
    goal: { ...sc.goal, at: o.goalAt || sc.goal.at || g.feet },
  };
}

module.exports = { slot, withSlots, CORNER };
