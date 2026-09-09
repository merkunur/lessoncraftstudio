/* =====================================================================
   visual-qa phase driver — affix (L.2.4.b, Marigolds ordmaskin)

   Three screens, of which the sweep had only ever seen the first:

     open      — the brass machine with the built word (apply) or the root +
                 an empty cog slot (which), and three answer controls below:
                 stacked meaning cards in an `apply` round, cog buttons in a
                 `which` round. Two structurally different boards.
     feedback  — after a WRONG tap. The tapped control gains `.dim`
                 (opacity .4) and is permanently unpickable for the round,
                 and `.af-line-msg.miss` renders the corrective nudge. This
                 is the state a child who has just failed actually sees, and
                 nothing had ever photographed it.
     resolved  — the correct control is tapped: Marigold switches to her
                 happy pose, the win line replaces the nudge, and the shell's
                 Check appears (hidden behind `.marigold-resolved` until then).

   ⚠ Controls are reached BY RENDERED POSITION, never by matching their text.
   `_renderOptions` walks the shuffled `this._choiceOrder`, so the Nth button
   on screen is `options[_choiceOrder[N]]` — and reaching for a control by its
   English text is exactly how a probe silently drives the wrong element in a
   non-English locale (this driver runs in sv as well as en).

   Not `terminal`: the answer cards stay on screen after resolving, so the
   harness's control measurements remain meaningful in the resolved phase.
   ===================================================================== */
'use strict';

const G = 'AffixActivity';

/* the rendered index of the correct control, and of a wrong one, read off the
   live model — works identically for both round shapes */
const positions = (page) => page.evaluate((g) => {
  const t = window[g];
  if (!t || !t._round || !t._choiceOrder) return null;
  const r = t._round, opts = r.options || [];
  const correctOpt = r.cog === 'which'
    ? opts.indexOf(r.affix)
    : opts.findIndex((o) => o.affix === r.affix);
  if (correctOpt < 0) return null;
  const wrongOpt = r.cog === 'which'
    ? opts.findIndex((a) => a !== r.affix)
    : opts.findIndex((o) => o.affix !== r.affix);
  const at = (optIndex) => t._choiceOrder.indexOf(optIndex);
  return { cog: r.cog, correct: at(correctOpt), wrong: at(wrongOpt), n: opts.length };
}, G);

async function tapAt(page, pos) {
  const ok = await page.evaluate((i) => {
    const b = document.querySelectorAll('.af-cand')[i];
    if (!b) return false;
    b.click();
    return true;
  }, pos);
  if (!ok) throw new Error('no .af-cand at rendered position ' + pos);
  await new Promise((r) => setTimeout(r, 140));
}

module.exports = {
  steps: [
    {
      name: 'feedback',
      async drive(page) {
        const p = await positions(page);
        if (!p) throw new Error('could not read the round off window.' + G);
        if (p.wrong < 0) throw new Error('the round offers no wrong control to tap');
        await tapAt(page, p.wrong);

        const line = await page.evaluate(() => {
          const el = document.querySelector('.af-line-msg');
          return el ? el.textContent.trim() : '';
        });
        if (!line) throw new Error('a wrong tap produced no nudge line');
        const missy = await page.evaluate(() => !!document.querySelector('.af-line-msg.miss'));
        if (!missy) throw new Error('a wrong tap did not render the .miss state');
        const dimmed = await page.evaluate(() => document.querySelectorAll('.af-cand.dim').length);
        if (dimmed < 1) throw new Error('a wrong tap did not dim the tapped control');
        const solved = await page.evaluate((g) => !!(window[g] && window[g]._resolved), G);
        if (solved) throw new Error('a wrong control resolved the round');
        return true;
      },
    },
    {
      name: 'resolved',
      async drive(page) {
        const p = await positions(page);
        if (!p) throw new Error('could not read the round off window.' + G);
        await tapAt(page, p.correct);

        const solved = await page.evaluate((g) => !!(window[g] && window[g]._resolved), G);
        if (!solved) throw new Error('tapping the correct control did not resolve the round');
        const revealed = await page.evaluate(() => {
          const c = document.querySelector('.lcs-activity-check');
          if (!c) return false;
          return getComputedStyle(c).display !== 'none' && c.offsetParent !== null;
        });
        if (!revealed) throw new Error('the shell Check did not appear after resolving');
        return true;
      },
    },
  ],
};
