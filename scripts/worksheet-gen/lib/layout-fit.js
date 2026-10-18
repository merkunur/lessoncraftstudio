/**
 * layout-fit.js — a QA retry knob for a variation type whose base reads its sizes from `this.difficulty`.
 *
 * withLayoutFit(spec, base, field, step) returns { qaRetries, build } to spread into the variation:
 *  - qaRetries: NEW pages only (never the published level 2, copy 1) get two retries, { layoutFit: 1 } then { layoutFit: 2 };
 *  - build: with the knob at 0 it is base.build exactly (a page that passes is byte-unchanged); with a knob it builds through
 *    a copy of the type whose `field` on that level is `step * knob` smaller. The copy is built with the knob cleared, so a
 *    base that re-enters this.build for its screen / answer key does not shrink twice.
 * Added 2026-10-18 (es-MX): the longer Mexican wording ran a few answer keys 2-19 px into the footer band.
 */
'use strict';
// field may be one size (field, step) or several at once ({ rowH: 8, picSingle: 12 }); a negative step grows a size
function withLayoutFit(base, field, step) {
  const steps = typeof field === 'object' ? field : { [field]: step };
  return {
    qaRetries(it) { return Number(it.difficulty) === 2 && (it.variant || 1) === 1 ? [] : [{ layoutFit: 1 }, { layoutFit: 2 }]; },
    build(args, ctx) {
      const fit = (ctx && ctx.layoutFit) || 0;
      if (!fit) return base.build.call(this, args, ctx);
      const lv = this.difficulty[args.difficulty];
      // a positive step shrinks the field; a negative one grows it (a bottom padding that starts at 0)
      const tight = { ...lv };
      for (const [f, st] of Object.entries(steps)) tight[f] = Math.max(0, (lv[f] || 0) - st * fit);
      const self = { ...this, difficulty: { ...this.difficulty, [args.difficulty]: tight } };
      self.build = (a, c) => base.build.call(self, a, c);
      return base.build.call(self, args, { ...ctx, layoutFit: 0 });
    },
  };
}
module.exports = { withLayoutFit };
