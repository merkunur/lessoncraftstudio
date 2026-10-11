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
 * slot(name, h, box = {w, h}, ink) → { keep:[x,y,r], target:[x,y], mouth:[x,y], feet:[x,y] }
 * The drawing's INK box (h tall; its width from the drawing's own ink box, `ink` = an ink-boxes.json entry) sits against
 * the corner with a small inset, wholly inside the box; the keep disc covers that ink box; the mouth sits just outside the
 * ink box on the ray toward the box centre; the target sits a little further in (the nearest station becomes the mouth
 * station, and the mouth corridor stays short).
 * 2026-10-11: the old footprint was a SQUARE of side h centred on the feet — a polar bear, an igloo or a dump truck is twice
 * as wide as tall, so the drawing ran off the frame and past its keep disc (where the oracle's stand exemption would have
 * hidden a covered corridor). Without `ink` the square is kept (a drawing with no ink box yet).
 */
function slot(name, h, box, ink) {
  const c = CORNER[name]; if (!c) throw new Error('hm-slots: unknown slot ' + name);
  const inset = 6;
  const S = ink ? h / ink.h : 0;
  const hw = ink ? ink.w * S / 2 : h * 0.52, hh = ink ? h / 2 : h * 0.52;
  const cx = c[0] === 0 ? inset + hw : c[0] === 1 ? box.w - inset - hw : box.w / 2;
  const cy = c[1] === 0 ? inset + hh : c[1] === 1 ? box.h - inset - hh : box.h / 2;
  const tx = box.w / 2 - cx, ty = box.h / 2 - cy, L = Math.hypot(tx, ty) || 1, ux = tx / L, uy = ty / L;
  // distance from the ink centre to the ink box edge along (ux, uy)
  const edge = Math.min(Math.abs(ux) > 1e-6 ? hw / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-6 ? hh / Math.abs(uy) : Infinity);
  const mouth = [cx + ux * (edge + 14), cy + uy * (edge + 14)];
  // feet: the ink bottom, at the drawing's own foot x (standing() puts ink left at fx − (foot − l)·S)
  const fx = ink ? (cx - hw) + (ink.foot - ink.l) * S : cx;
  return {
    keep: [+cx.toFixed(1), +cy.toFixed(1), +(ink ? Math.hypot(hw, hh) + 10 : hh + 16).toFixed(1)],
    target: [+(cx + ux * (edge + 60)).toFixed(1), +(cy + uy * (edge + 60)).toFixed(1)],
    mouth: [+mouth[0].toFixed(1), +mouth[1].toFixed(1)],
    feet: [+fx.toFixed(1), +(cy + hh).toFixed(1)],
  };
}

let INK = null;
/** the drawing's ink box (data/hm/ink-boxes.json), or null when it has none */
function inkOf(src) {
  if (!INK) { try { INK = require('../data/hm/ink-boxes.json'); } catch (e) { INK = {}; } }
  return INK[src] || null;
}

/** apply the slots to a scene spec: fills maze.start / goal / startMouth / goalMouth / keep and hero.at / goal.at */
function withSlots(sc) {
  if (!sc.slots) return sc;
  const box = sc.maze.box;
  const s = slot(sc.slots[0], sc.hero.h, box, inkOf(sc.hero.src)), g = slot(sc.slots[1], sc.goal.h, box, inkOf(sc.goal.src));
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

module.exports = { slot, withSlots, inkOf, CORNER };
