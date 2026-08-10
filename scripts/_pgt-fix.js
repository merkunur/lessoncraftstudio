/* the native panel's findings on TOOL #53. Ten defects, each driven in
   node, and the first is the string I added THIS SESSION to fix a lie. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'pair-gate.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => { if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 55)); s = s.split(a).join(b); };

/* ---- 1. ⭐⭐ THE FIX WAS ITSELF FALSE. "Two left-behinds only ever make
   a full rank when the archway takes two" is refuted in 237 reachable
   states: at k=3 a 1 and a 2 fill it (98 states), at k=4 seventy-five,
   at k=5 sixty-four. And those are exactly the states where THIS branch
   fires, so a class at three abreast could hear "only when the archway
   takes two" and then watch it happen one parade later. */
sub("      saidSillShort: { en: '{a} and {b} on the sill make {c} — and {c} still does not fill a rank of {k}. Two left-behinds only ever make a full rank when the archway takes two.' },",
  "      saidSillShort: { en: '{a} and {b} on the sill make {c} — and {c} still does not fill a rank of {k}, so they wait too. At two abreast two left-behinds always make a rank; at wider archways only sometimes.' },");

/* ---- 7. `saidStand` was announced with s=0: "0 left standing, because
   12 does not fill a rank of 2", which contradicts itself — 12 fills
   ranks of two perfectly. */
sub("      saidClear: { en: 'All {n} went through, in {r} ranks of {k}. Nobody was left standing.' },",
  "      saidClear: { en: 'All {n} went through, in {r} ranks of {k}. Nobody was left standing.' },\n" +
  "      /* ⚠ pressing on after a parade that CLEARED used to announce\n" +
  "         saidStand with s=0 — \"0 left standing, because 12 does not fill\n" +
  "         a rank of 2\" — which contradicts itself, since 12 fills ranks of\n" +
  "         two perfectly. */\n" +
  "      saidAllThrough: { en: 'Everybody is already through. Start a new parade.' },");

/* ---- 3. `saidNoSill` named the ONE refusal that cannot happen
   (a+b===0 is unreachable — bringSecond already guarantees a>0), while
   the two a child CAN cause went unnamed. */
sub("      saidNoSill: { en: 'The sill only takes those left standing, and there are none.' },",
  "      /* ⚠ the old text named `a+b===0`, which is reachable in ZERO\n" +
  "         states because bringSecond already guarantees somebody is\n" +
  "         standing. These two are the refusals a child can actually\n" +
  "         cause. */\n" +
  "      saidNoSecond: { en: 'Bring the second parade first — the sill is for two lots of left-behinds.' },\n" +
  "      saidOnSill: { en: 'They are already on the sill.' },");

/* ---- 4. `saidBusy` promised something about width, but its only call
   site is a second press on a prediction button. */
sub("      saidBusy: { en: 'The archway is in use. Start a new parade to change how many go abreast.' },",
  "      saidBusy: { en: 'The class has already said what it thinks. Call them forward and find out.' },");

/* ---- 6. `setSize` was authored, has no setting, and is referenced
   nowhere. */
sub("      setSize: { en: 'How many are marching' },\n", "");

/* ---- 8. `ariaStand` said "an empty place", singular, while the seats
   drawn are k - s: two, three or four of them at wider archways. */
sub("      ariaStand: { en: '{n} left standing, with an empty place beside them' },",
  "      ariaStand: { en: '{n} left standing, with {e} empty places beside them' },");

/* ---- 5. ⚠ `setWidth` IS DEAD CODE — zero call sites — so the
   docblock's proudest guard never ran. The real width path is the
   settings chip, which calls reset() and wipes the parade, so the
   invariant is enforced by construction rather than by that function.
   Deleting it rather than leaving a guard that looks shipped. */
sub("    /* ⚠ THE WIDTH CANNOT CHANGE MID-PARADE. Reflowing marchers who have\n" +
    "       already gone through as pairs into ranks of three would be a lie\n" +
    "       about what happened. */\n" +
    "    setWidth: function (st, k) {\n" +
    "      var s = this._st(st);\n" +
    "      if (!(k >= GEO.MIN_N && k <= GEO.MAX_N)) return null;\n" +
    "      if (k === s.k) return null;\n" +
    "      if (s.ranks > 0 || s.pred !== null) return null;\n" +
    "      return { k: k, total: s.total, ranks: 0, pred: null, second: null, onSill: 0 };\n" +
    "    },\n\n",
  "    /* ⚠⚠ THERE IS NO setWidth, AND THAT IS THE FIX. One shipped here\n" +
  "       with the docblock's proudest guard in it — \"the width cannot\n" +
  "       change mid-parade, reflowing marchers who already went through as\n" +
  "       pairs into ranks of three would be a lie about what happened\" —\n" +
  "       and it had ZERO CALL SITES, so the invariant it announced was\n" +
  "       never in force. The real width path is the settings chip, which\n" +
  "       goes through onSettings() -> reset() and starts a fresh parade, so\n" +
  "       a part-marched parade can never be re-flowed: the guarantee is\n" +
  "       structural, not conditional. A guard that looks shipped and never\n" +
  "       runs is worse than no guard, because the docblock cites it. */\n\n");

/* ---- the call sites for the corrected announcements ---------------- */
sub("      if (!next) { this._refuse(this.st.pred === null ? 'bar' : 'stand'); return; }",
  "      if (!next) {\n" +
  "        this._refuse(this.st.pred === null ? 'bar'\n" +
  "          : (this.standing(this.st) === 0 ? 'clear' : 'stand'));\n" +
  "        return;\n" +
  "      }");
sub("      var next = this.toSill(null);\n      if (!next) { this._refuse('sill'); return; }",
  "      var next = this.toSill(null);\n" +
  "      if (!next) { this._refuse(this.st.onSill > 0 ? 'onsill' : 'nosecond'); return; }");
sub("      if (why === 'sill') { api.announce(api.t('saidNoSill')); return; }",
  "      if (why === 'nosecond') { api.announce(api.t('saidNoSecond')); return; }\n" +
  "      if (why === 'onsill') { api.announce(api.t('saidOnSill')); return; }\n" +
  "      if (why === 'clear') { api.announce(api.t('saidAllThrough')); return; }");
sub("        ? this._fmt(api.t('ariaStand'), { n: this.standing(s) })",
  "        ? this._fmt(api.t('ariaStand'), { n: this.standing(s), e: s.k - this.standing(s) })");

/* ---- 9. the sheet emits an ARCH, not a strip --------------------- */
sub("Cut out the marchers and the archway strip.", "Cut out the marchers and the archway.");

fs.writeFileSync(P, s);
console.log('ten locale-panel defects fixed');
