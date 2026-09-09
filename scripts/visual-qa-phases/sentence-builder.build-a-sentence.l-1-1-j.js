/* =====================================================================
   visual-qa phase driver — sentence-builder (L.1.1.j)

   Three screens, of which the sweep had only ever seen the first:

     open      — the subject picture, four empty slots, the scrambled palette
     wrong     — every slot filled in a NON-canonical order and Check pressed:
                 the `hintOrder` nudge renders and NOTHING locks or dims (this
                 activity sets `readOnly` only on success, and used tiles get
                 `visibility:hidden` rather than a dim class). This is the state
                 a failing child actually sees, and nothing had photographed it.
     resolved  — the canonical order, locked, Wiggles in the happy pose, and the
                 built sentence read aloud.

   ⚠ Tiles are reached BY MODEL INDEX, never by matching their text: the palette
   is `_tiles`, a per-seed scramble, and reaching for a control by its English
   word is exactly how a probe silently drives the wrong element in a non-English
   locale (this driver runs in sv as well as en). Slots fill left-to-right via
   `_firstEmpty()`, so tapping tiles in the intended order is what builds it.

   Not `terminal`: the slots and palette remain on screen after resolving, so the
   harness's control measurements stay meaningful in the resolved phase.
   ===================================================================== */
'use strict';

const G = 'SentenceBuilderActivity';

/* click the palette tile holding the word we want next, skipping already-used ones */
async function tapWord(page, word) {
  const ok = await page.evaluate((g, w) => {
    const t = window[g];
    const i = t._tiles.findIndex((x, k) => x === w && !t._used[k]);
    if (i < 0) return false;
    const nodes = document.querySelectorAll('.snt-tile');
    if (!nodes[i]) return false;
    nodes[i].click();
    return true;
  }, G, word);
  if (!ok) throw new Error('no unused palette tile for "' + word + '"');
  await new Promise((r) => setTimeout(r, 90));
}

async function clearAll(page) {
  await page.evaluate(() => {
    const slots = [...document.querySelectorAll('.snt-slot')];
    for (let i = slots.length - 1; i >= 0; i--) slots[i].click();
  });
  await new Promise((r) => setTimeout(r, 120));
}

/* ⚠⚠ THE WRONG-ANSWER FEEDBACK IS TRANSIENT, AND THE SWEEP IS NOT.
   `lcs-shell.js:893` clears the hint and the coral `tryagain` state 1800 ms after
   Check. The harness drives a phase ONCE at 412px and then sweeps six viewports in
   sequence (visual-qa-activity.js:471-484), so the later widths — 1024 and 1366 —
   were being measured AND photographed after the state had timed out. Measured: at
   +200 ms and +1500 ms every width shows the coral prompt rgb(242,120,75) and the
   full hint; at +2600 ms the hint is empty and the prompt is back to teal.

   That made two things wrong at once. The desktop screenshots showed no feedback at
   all — a visual critic reading them reported, reasonably, that wrong answers say
   nothing on a desktop — and, worse, THE TALLEST STATE OF THIS PHASE WAS NEVER
   MEASURED AT DESKTOP, because the hint is an extra line of text. Which widths won
   the race depended on how fast the machine ran, so the gate was flaky in a
   direction that always favoured passing.

   `freezeFeedback` drops only the long timers scheduled BY the check handler, for
   the duration of that synchronous click, and restores setTimeout immediately. It
   does not weaken anything: it makes every viewport measure the state WITH the hint,
   which is strictly taller than the one the sweep used to see. */
async function pressCheck(page, freezeFeedback) {
  const ok = await page.evaluate((freeze) => {
    const c = document.querySelector('.lcs-activity-check');
    if (!c || c.offsetParent === null) return false;
    if (!freeze) { c.click(); return true; }
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) { return ms >= 1000 ? 0 : real.apply(window, arguments); };
    try { c.click(); } finally { window.setTimeout = real; }
    return true;
  }, !!freezeFeedback);
  if (!ok) throw new Error('the shell Check button was not clickable');
  await new Promise((r) => setTimeout(r, 200));
}

const model = (page) => page.evaluate((g) => {
  const t = window[g];
  if (!t || !t._canonical || !t._canonical.length) return null;
  return { canonical: t._canonical.slice(), tiles: t._tiles.slice() };
}, G);

module.exports = {
  steps: [
    {
      name: 'wrong',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        /* a deliberately wrong order that is still a full fill: reverse it.
           reverse != canonical for every round, because the first tile carries
           the capital and the last carries the period. */
        const order = m.canonical.slice().reverse();
        for (const w of order) await tapWord(page, w);

        const filled = await page.evaluate((g) => window[g]._slots.every((x) => x != null), G);
        if (!filled) throw new Error('not every slot was filled before Check');
        await pressCheck(page, true);   /* hold the nudge open for the whole sweep */

        const solved = await page.evaluate((g) => !!window[g].readOnly, G);
        if (solved) throw new Error('a reversed order resolved the round');
        const hint = await page.evaluate(() => {
          const h = document.querySelector('.lcs-activity-prompt-hint');
          return h ? h.textContent.trim() : '';
        });
        if (!hint) throw new Error('a wrong order produced no hint');
        return true;
      },
    },
    {
      name: 'resolved',
      async drive(page) {
        const m = await model(page);
        if (!m) throw new Error('could not read the round off window.' + G);
        await clearAll(page);
        const empty = await page.evaluate((g) => window[g]._slots.every((x) => x == null), G);
        if (!empty) throw new Error('tapping the slots did not return every tile to the palette');

        for (const w of m.canonical) await tapWord(page, w);
        await pressCheck(page);

        const solved = await page.evaluate((g) => !!window[g].readOnly, G);
        if (!solved) throw new Error('the canonical order did not resolve the round');
        return true;
      },
    },
  ],
};
