/* =====================================================================
   visual-qa phase driver — tense (L.1.1.e)
   ---------------------------------------------------------------------
   Three screens, of which the sweep had only ever seen the first:

     open      — the sentence, three lit/unlit time windows, three form chips
     feedback  — after a non-resolving tap. Which feedback depends on the round,
                 and BOTH are real states worth photographing:
                   · a plain wrong form  → the chip dims and a corrective nudge
                     renders in the .miss colour;
                   · on a round carrying `alsoOk` (the Swedish future rounds,
                     where plain presens is also correct Swedish) → an AFFIRMING
                     line renders, the chip is NOT dimmed, and the round does not
                     resolve. This is the new response class and nothing had ever
                     photographed it.
     resolved  — the correct form lights and the shell's Check appears (hidden
                 behind .juniper-resolved until then).

   The step prefers the `alsoOk` chip when the round has one, so the affirming
   screen is captured on every round that can produce it, and falls back to an
   ordinary wrong chip otherwise. Either way the screen changes, so the harness's
   no-op check stays meaningful.
   ===================================================================== */
'use strict';

const G = 'TenseActivity';

async function tapTense(page, tense) {
  const ok = await page.evaluate((t) => {
    const b = [...document.querySelectorAll('.tn-cand')].find(x => x.getAttribute('data-tense') === t);
    if (!b) return false;
    b.click();
    return true;
  }, tense);
  if (!ok) throw new Error('no chip with data-tense="' + tense + '"');
  await new Promise(r => setTimeout(r, 140));
}

const model = (page) => page.evaluate((g) => {
  const t = window[g];
  if (!t || !t._round || !window.TenseCore) return null;
  const r = t._round;
  const answer = r.time;
  const alsoOk = (r.alsoOk || []).filter(x => x !== answer);
  const other = window.TenseCore.TENSES.filter(x => x !== answer && alsoOk.indexOf(x) < 0);
  return { answer, alsoOk, other };
}, G);

module.exports = {
  steps: [
    {
      name: 'feedback',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        const pick = m.alsoOk[0] || m.other[0];
        if (!pick) throw new Error('the round offers no non-answer chip to tap');
        await tapTense(page, pick);
        const line = await page.evaluate(() => {
          const el = document.querySelector('.tn-line-msg');
          return el ? el.textContent.trim() : '';
        });
        if (!line) throw new Error('a non-resolving tap produced no feedback line');
        const solved = await page.evaluate((g) => !!(window[g] && window[g]._resolved), G);
        if (solved) throw new Error('a non-answer chip resolved the round');
        return true;
      },
    },
    {
      name: 'resolved',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        await tapTense(page, m.answer);
        const solved = await page.evaluate((g) => !!(window[g] && window[g]._resolved), G);
        if (!solved) throw new Error('tapping the time-matching form did not resolve the round');
        return true;
      },
    },
  ],
};
