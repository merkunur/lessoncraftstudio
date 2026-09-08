/* =====================================================================
   visual-qa phase driver — plural (L.2.1.b)
   ---------------------------------------------------------------------
   Three screens, of which the sweep had only ever seen the first:

     open     — the singular + three chips + the Hear-it button
     nudged   — after a wrong tap: that chip is permanently dimmed and the warm
                nudge line renders under Måna. The nudge is the longest string in
                the activity and the one most likely to wrap badly.
     resolved — the singular is REPLACED by the "fot → fötter" reveal, the win
                line renders, and the shell's Check appears (it is hidden behind
                .pearl-resolved until then). Never photographed at any width.

   Not terminal: the chips are still rendered after a resolve, so the control
   floor still applies to them.
   ===================================================================== */
'use strict';

const G = 'PluralActivity';

async function tap(page, str) {
  const ok = await page.evaluate((s) => {
    const b = [...document.querySelectorAll('.pl-cand')].find(x => x.getAttribute('data-str') === s);
    if (!b) return false;
    b.click();
    return true;
  }, str);
  if (!ok) throw new Error('no chip with data-str="' + str + '"');
  await new Promise(r => setTimeout(r, 120));
}

const model = (page) => page.evaluate((g) => {
  const t = window[g], C = window.PluralCore;
  if (!t || !t._round || !C) return null;
  const correct = C.derivePlural(t._round);
  return { correct, wrong: C.chipStrings(t._round).filter(s => s !== correct) };
}, G);

module.exports = {
  steps: [
    {
      name: 'nudged',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        /* the +s chip — the error the activity is built around */
        await tap(page, m.wrong[0]);
        const dim = await page.$$('.pl-cand.dim');
        if (!dim.length) throw new Error('a wrong tap left no dimmed chip — the nudge state was not reached');
        return true;
      },
    },
    {
      name: 'resolved',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        await tap(page, m.correct);
        const done = await page.evaluate((g) => !!(window[g] && window[g]._resolved), G);
        if (!done) throw new Error('tapping the correct plural did not resolve the round');
        const reveal = await page.$('.pl-reveal .pl-plural');
        if (!reveal) throw new Error('resolved, but the singular → plural reveal did not render');
        return true;
      },
    },
  ],
};
