/* the native locale panel's findings on TOOL #52 — the ones that need
   CODE, not strings. Each was driven in node by the panel. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'rounding-hill.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => { if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60)); s = s.split(a).join(b); };

/* ---- 4. THE DISPATCH BUG. `_move` always passed 'low'/'high', but
   move() also returns null when the stone is AT REST — so pressing a
   nudge on a settled 47 announced "The ground stops at 40", which is
   both false and about the wrong thing. Strings cannot repair this. */
sub("      this._btn.lb.addEventListener('click', function () { self._move(self.move(null, -self.bigStep()), 'low'); });\n" +
    "      this._btn.l1.addEventListener('click', function () { self._move(self.move(null, -self.step()), 'low'); });\n" +
    "      this._btn.r1.addEventListener('click', function () { self._move(self.move(null, self.step()), 'high'); });\n" +
    "      this._btn.rb.addEventListener('click', function () { self._move(self.move(null, self.bigStep()), 'high'); });",
  "      /* ⚠ THE REASON IS COMPUTED, NOT ASSUMED. Passing 'low'/'high'\n" +
  "         unconditionally announced an EDGE for every refusal, including\n" +
  "         the commonest one — nudging a stone that has already settled —\n" +
  "         so a resting 47 was told \"the ground stops at 40\". A refusal\n" +
  "         must name what actually stopped it. */\n" +
  "      var why = function (d) { return self.st.phase !== 'held' ? 'rest' : (d < 0 ? 'low' : 'high'); };\n" +
  "      this._btn.lb.addEventListener('click', function () { self._move(self.move(null, -self.bigStep()), why(-1)); });\n" +
  "      this._btn.l1.addEventListener('click', function () { self._move(self.move(null, -self.step()), why(-1)); });\n" +
  "      this._btn.r1.addEventListener('click', function () { self._move(self.move(null, self.step()), why(1)); });\n" +
  "      this._btn.rb.addEventListener('click', function () { self._move(self.move(null, self.bigStep()), why(1)); });");

/* ---- 2 + 3. `saidAlready` told a TEETERING stone it "is already at
   rest" — the press a child is most likely to make, at the tool's
   central moment, answered with its exact opposite — and it also fired
   for a no-op tilt press, where it is about the wrong object. */


sub("      var next = this.release(null);\n      if (!next) { this._refuse('rest'); return; }",
  "      var next = this.release(null);\n      if (!next) { this._refuse(this.st.phase === 'teeter' ? 'teeter' : 'rest'); return; }");
sub("      if (why === 'low') { api.announce(this._fmt(api.t('saidEdge'), { n: s.lo })); return; }\n      if (why === 'high') { api.announce(this._fmt(api.t('saidEdge'), { n: s.hi })); return; }\n      api.announce(api.t('saidAlready'));",
  "      if (why === 'low') { api.announce(this._fmt(api.t('saidEdge'), { n: s.lo })); return; }\n" +
  "      if (why === 'high') { api.announce(this._fmt(api.t('saidEdge'), { n: s.hi })); return; }\n" +
  "      /* ⚠ letting go of a stone that is ALREADY teetering is the press a\n" +
  "         child makes most, because the apparatus has visibly stopped — and\n" +
  "         it was answered with \"already at rest\", the exact opposite of\n" +
  "         what is on screen, at the one moment the tool is about. */\n" +
  "      if (why === 'teeter') { api.announce(this._fmt(api.t('saidTeeter'), { n: s.at })); return; }\n" +
  "      /* ⚠ and a no-op press on the ridge control is about the RIDGE, not\n" +
  "         about the stone. */\n" +
  "      if (why === 'tilt') { api.announce(api.t(s.tilt === 0 ? 'saidAlreadyLevel' : 'saidAlreadySet')); return; }\n" +
  "      api.announce(api.t('saidAlready'));");

/* ---- 6. `saidTiltClear` promised the stone would teeter, but clearing
   re-teeters ONLY if the stone is on the ridge; with a settled 47 on
   screen it announced a consequence the class could see not happening. */
sub("      api.announce(dir === 0\n        ? api.t('saidTiltClear')\n        : this._fmt(api.t('saidTiltSet'), { d: dir > 0 ? next.hi : next.lo }));",
  "      api.announce(dir === 0\n" +
  "        ? api.t(this.onRidge(next, next.at) ? 'saidTiltClear' : 'saidTiltClearOff')\n" +
  "        : this._fmt(api.t('saidTiltSet'), { d: dir > 0 ? next.hi : next.lo }));");

/* ---- the hundreds ground could not reach its own ridge: _deal picked
   any integer while step() is 10 there, so from 437 the ridge at 450 was
   UNREACHABLE by any sequence of presses. */
sub("    _deal: function () {\n      var s = this.st, r = this.ridge(s), v;",
  "    /* ⚠ EVERY DEALT STONE MUST BE ON THE MOVE GRID. On the hundreds\n" +
  "       ground the nudge is 10 but the deal picked any integer, so from\n" +
  "       437 the ridge at 450 could not be reached by ANY sequence of\n" +
  "       presses — the tool's one lesson, unreachable, in half its\n" +
  "       configurations. Found by a native panel driving the model. */\n" +
  "    _snap: function (v) {\n" +
  "      var st = this.step(), s = this.st;\n" +
  "      return s.lo + Math.round((v - s.lo) / st) * st;\n" +
  "    },\n\n" +
  "    _deal: function () {\n      var s = this.st, r = this.ridge(s), v;");
sub("      var next = this.again(s, v);\n      if (next) this.st = next;",
  "      var next = this.again(s, this._snap(v));\n      if (next) this.st = next;");

/* ---- `ariaGround` was authored in eleven locales and referenced
   nowhere: the SVG got no label at all. */
sub("      this._ground.setAttribute('class', 'rnh-ground');",
  "      this._ground.setAttribute('class', 'rnh-ground');\n" +
  "      /* ⚠ this was a DEAD STRING — authored in eleven locales and never\n" +
  "         referenced, so the ground itself had no accessible name. */\n" +
  "      svg.setAttribute('role', 'img');\n" +
  "      this._svgEl = svg;");

sub("      this._marks[0].textContent = String(s.lo);",
  "      if (this._svgEl) this._svgEl.setAttribute('aria-label', api.t('ariaGround'));\n" +
  "      this._marks[0].textContent = String(s.lo);");

/* ---- `ariaStone` said "at {n}" while _paint DRAWS the stone at s.rest,
   so a 47 resting in the 50 dip announced "at 47" for a thing sitting
   somewhere else. */
sub("      this._stone.setAttribute('aria-label', this._fmt(api.t('ariaStone'), { n: s.at }));",
  "      /* ⚠ it announced s.at while the stone is DRAWN at s.rest — a 47\n" +
  "         resting in the 50 dip said \"at 47\". The label now describes\n" +
  "         where the thing actually is, which is what a label is for. */\n" +
  "      this._stone.setAttribute('aria-label', this._fmt(\n" +
  "        api.t(s.phase === 'settled' ? 'ariaStoneRest' : 'ariaStone'),\n" +
  "        { n: s.at, d: s.rest }));");

fs.writeFileSync(P, s);
console.log('locale-panel code fixes applied');
