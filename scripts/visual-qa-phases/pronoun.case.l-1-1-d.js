/* =====================================================================
   visual-qa phase driver — pronoun (L.1.1.d)

   Three screens, of which the sweep had only ever seen the first — in ANY
   locale. All 27 renders on disk before this driver were English, phase `open`:

     open      — the sentence with its blank, Sigge/Hattie, Hear-it, two chips
     miss      — the WRONG chip tapped: the role-keyed nudge renders in
                 `.pn-line-msg.miss`, the tapped chip goes `.dim`, and the shell's
                 Check button is STILL hidden (it only appears on resolve). This
                 is the state a child who guesses actually sees, and nothing had
                 ever photographed it.
     resolved  — the correct chip tapped: `.pn-blank.filled` carries the answer,
                 the win note replaces the nudge, the mascot switches pose, and
                 the shell's Check button APPEARS — a layout change at every
                 width that no gate had ever measured.

   ⚠ CHIPS ARE REACHED BY MODEL INDEX, NEVER BY TEXT. `_beginRound` shuffles
   `_chipOrder` (its own comment: "position ≠ answer"), so index 0 is not the
   answer and matching on a word would drive the wrong element the moment this
   runs in a locale whose forms differ — which is the point of the sweep.

   ⚠ AND NO TIMER FREEZE HERE. The sibling sentence-builder driver has to freeze
   a 1800ms shell timeout because its hint is transient. This activity contains
   NO setTimeout at all and paints its own `.pn-line-msg`, so the miss state
   persists for the whole sweep. Measured, not assumed — carrying the sibling's
   freeze across would have added machinery that solves nothing here.

   Not `terminal`: the sentence and both chips stay on screen after resolving,
   so the harness's control measurements remain meaningful in the resolved phase.
   ===================================================================== */
'use strict';

const G = 'PronounActivity';

/* The correct form, read from the MODEL. Localized pools store it; the English
   pool derives it from the protected core's CASE_TABLE. */
const correctOf = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t._round;
  if (!r) return null;
  const lang = new URLSearchParams(location.search).get('lang') || 'en';
  if (r[lang] && r[lang].correct) return r[lang].correct;
  return (window.PronounCore && window.PronounCore.deriveCorrect) ? window.PronounCore.deriveCorrect(r) : null;
}, G);

/* Tap the chip at a given DOM index, having first checked it is live. */
async function tapChipIndex(page, i) {
  const ok = await page.evaluate((idx) => {
    const nodes = document.querySelectorAll('.pn-cand');
    if (!nodes[idx]) return false;
    if (nodes[idx].classList.contains('dim')) return false;
    nodes[idx].click();
    return true;
  }, i);
  if (!ok) throw new Error('chip index ' + i + ' was absent or already dimmed');
  await new Promise((r) => setTimeout(r, 160));
}

/* Which rendered chip is the wrong one / the right one. */
const chipIndexOf = (page, want) => page.evaluate((w) => {
  const nodes = [...document.querySelectorAll('.pn-cand')].map((n) => n.getAttribute('data-str'));
  return nodes.indexOf(w);
}, want);

module.exports = {
  steps: [
    {
      name: 'miss',
      async drive(page) {
        const correct = await correctOf(page);
        if (!correct) throw new Error('could not read the correct form off window.' + G);
        const chips = await page.evaluate(() => [...document.querySelectorAll('.pn-cand')].map((n) => n.getAttribute('data-str')));
        if (chips.length !== 2) throw new Error('expected exactly 2 chips, saw ' + chips.length);
        const wrong = chips.find((c) => c !== correct);
        if (!wrong) throw new Error('both chips carry the correct form "' + correct + '"');

        await tapChipIndex(page, await chipIndexOf(page, wrong));

        const state = await page.evaluate((g) => {
          const msg = document.querySelector('.pn-line-msg');
          const app = document.querySelector('.lcs-app');
          const chk = document.querySelector('.lcs-activity-check');
          return {
            resolved: !!window[g].readOnly || !!window[g]._resolved,
            nudge: msg ? msg.textContent.trim() : '',
            isMiss: !!(msg && msg.classList.contains('miss')),
            dimmed: [...document.querySelectorAll('.pn-cand')].filter((n) => n.classList.contains('dim')).length,
            checkShown: !!(chk && chk.offsetParent !== null),
            resolvedClass: !!(app && app.classList.contains('hattie-resolved')),
          };
        }, G);

        if (state.resolved) throw new Error('the WRONG chip resolved the round');
        if (!state.nudge) throw new Error('a wrong chip produced no nudge');
        if (!state.isMiss) throw new Error('the nudge did not take the .miss styling');
        if (state.dimmed !== 1) throw new Error('expected exactly 1 dimmed chip, saw ' + state.dimmed);
        if (state.checkShown || state.resolvedClass) throw new Error('the shell Check button is visible before the round resolved');
        return true;
      },
    },
    {
      name: 'resolved',
      async drive(page) {
        /* ⚠ RE-FORCE THE ROUND FIRST, so this photographs a CLEAN first-time resolve.
           `dim` is applied only to a chip the child actually TRIED, so running this step
           straight after `miss` left a dimmed chip sitting on the finished screen — and a
           critic reading those frames reasonably reported that the dim meant two different
           things. It does not: that was this driver's sequence, not the activity. */
        await page.evaluate((g) => { const t = window[g]; t._beginRound(t._round); t.render(); }, G);
        await new Promise((r) => setTimeout(r, 120));
        const dimmed = await page.evaluate(() => document.querySelectorAll('.pn-cand.dim').length);
        if (dimmed) throw new Error('the round did not reset before the clean resolve');

        const correct = await correctOf(page);
        if (!correct) throw new Error('could not read the correct form off window.' + G);
        const i = await chipIndexOf(page, correct);
        if (i < 0) throw new Error('the correct chip "' + correct + '" is not on screen');
        await tapChipIndex(page, i);

        const state = await page.evaluate((g) => {
          const blank = document.querySelector('.pn-blank');
          const chk = document.querySelector('.lcs-activity-check');
          return {
            resolved: !!window[g]._resolved,
            filled: !!(blank && blank.classList.contains('filled')),
            blankText: blank ? blank.textContent.trim() : '',
            checkShown: !!(chk && chk.offsetParent !== null),
          };
        }, G);

        if (!state.resolved) throw new Error('the correct chip did not resolve the round');
        if (!state.filled) throw new Error('the blank did not fill');
        if (state.blankText !== correct) throw new Error('the blank shows "' + state.blankText + '", expected "' + correct + '"');
        if (!state.checkShown) throw new Error('the shell Check button did not appear after resolving');
        return true;
      },
    },
  ],
};
