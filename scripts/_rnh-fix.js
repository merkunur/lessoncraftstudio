/* one-shot: the art panel's audit findings on TOOL #52. Six live
   defects, every one of them green in a 908-assertion gate. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'rounding-hill.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => { if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60)); s = s.split(a).join(b); };

/* ---- A1 ⚠⚠ a state that contradicts the model's own law, two presses
   in. setTilt had no branch for FLIPPING an already-set rule, so
   tilt:-1 could sit next to rest:50 while settleOf said 40. Swept by
   the panel: 132 states, 4 violations. */
sub("      if (s.phase === 'teeter' && dir !== 0) { n.phase = 'settled'; n.rest = dir > 0 ? s.hi : s.lo; }",
  "      if (s.phase === 'teeter' && dir !== 0) { n.phase = 'settled'; n.rest = dir > 0 ? s.hi : s.lo; }\n" +
  "      /* ⚠⚠ AND FLIPPING AN ALREADY-SET RULE MUST MOVE THE STONE WITH\n" +
  "         IT. Without this branch the apparatus could hold tilt:-1 while\n" +
  "         the stone rested in the HIGH dip — a stored answer contradicting\n" +
  "         the law that produced it, reachable in two presses, and invisible\n" +
  "         to 908 assertions because the gate asked settleOf (the law) and\n" +
  "         never the stored rest. Oracle and subject were the same\n" +
  "         expression, which is #51's defect verbatim. */\n" +
  "      if (s.phase === 'settled' && dir !== 0 && this.onRidge(s, s.at)) { n.rest = dir > 0 ? s.hi : s.lo; }");

/* ---- the drawing constants, so the ground and the stone are ONE
   expression instead of two that agree by coincidence -------------- */
sub("    T_SETTLE: 620,",
  "    /* ⚠⚠ THE GROUND AND THE STONE SHARE THESE. The stone was placed by\n" +
  "       `h * 63% + 6px` while the ground was drawn at `250 - h * 190` in a\n" +
  "       300-tall viewBox — two expressions, a fixed px inside a percentage\n" +
  "       layout, and 63 against the true 63.33 agreeing by coincidence. It\n" +
  "       shipped the stone BURIED to 61% of its diameter. Measured by the\n" +
  "       art panel; #43's two-circles defect in a third dress. */\n" +
  "    VB_H: 300,\n" +
  "    G_BASE: 250,               /* the y of a dip, in viewBox units */\n" +
  "    G_RISE: 190,               /* how much higher the ridge is */\n\n" +
  "    T_SETTLE: 620,");

/* ---- the roll must accelerate ------------------------------------ */
sub("    T_ARRIVE: 340,",
  "    T_ARRIVE: 340,\n" +
  "    /* ⚠ A STONE ACCELERATES. The house ease is an ease-OUT, right for a\n" +
  "       UI element arriving and wrong for something falling, so the fall\n" +
  "       — and only the fall — uses an ease-IN. */\n" +
  "    E_ROLL: 'cubic-bezier(.55,.02,.6,1)',\n" +
  "    /* ⚠⚠ NOT THROUGH _dur(). The class must see the ridge lean and THEN\n" +
  "       the stone go, or the rule and its consequence read as one physical\n" +
  "       event and the tool has taught that the ground decided. */\n" +
  "    T_BEAT: 700,");

/* ---- the ground helper, used by BOTH the path and the stone ------- */
sub("    frac: function (st, v) {",
  "    /* ⭐ ONE EXPRESSION FOR WHERE THE GROUND IS. The path samples it and\n" +
  "       the stone sits on it, so a stone can never be drawn under the\n" +
  "       hillside it is standing on. Returns the viewBox y. */\n" +
  "    groundY: function (st, v) {\n" +
  "      return GEO.G_BASE - this.heightAt(st, v) * GEO.G_RISE;\n" +
  "    },\n" +
  "    /* the same line as a fraction UP FROM THE BOTTOM of the arena */\n" +
  "    groundUp: function (st, v) {\n" +
  "      return (GEO.VB_H - this.groundY(st, v)) / GEO.VB_H;\n" +
  "    },\n\n" +
  "    frac: function (st, v) {");

/* ---- the painter uses them --------------------------------------- */
sub("        pts.push((i / N * 1000).toFixed(1) + ',' + (250 - this.heightAt(s, v) * 190).toFixed(1));",
  "        pts.push((i / N * 1000).toFixed(1) + ',' + this.groundY(s, v).toFixed(1));");
sub("      this._ground.setAttribute('d', 'M0,300 L' + pts.join(' L') + ' L1000,300 Z');",
  "      this._ground.setAttribute('d', 'M0,' + GEO.VB_H + ' L' + pts.join(' L') + ' L1000,' + GEO.VB_H + ' Z');");
sub("      this._stone.style.bottom = 'calc(' + (this.heightAt(s, shown) * 63) + '% + var(--rnh-lift))';",
  "      /* ⚠ SITS ON the ground line, from the same function that drew it */\n" +
  "      this._stone.style.bottom = (this.groundUp(s, shown) * 100).toFixed(2) + '%';\n" +
  "      this._stone.style.transitionTimingFunction =\n" +
  "        (s.phase === 'settled' ? GEO.E_ROLL : 'cubic-bezier(.34,.06,.2,1)');");

fs.writeFileSync(P, s);
console.log('model + geometry fixes applied');
