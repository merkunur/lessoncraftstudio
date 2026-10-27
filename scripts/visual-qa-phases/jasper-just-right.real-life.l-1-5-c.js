/* =====================================================================
   visual-qa phase driver — jasper-just-right / real-life (L.1.5.c)
   #133 of the one-by-one rebuild: THE WHAT-FOR TAGS (what-for-tags-activity).

     open      — the day's windows with their empty hooks, the bag of
                 things with their tags folded shut, Go.
     picked    — every hook filled, two of them wrong. ⭐ Nothing is graded
                 yet: no tag open, no hint, no hop.
     missed    — Go: the right things lock, the wrong ones are back in the
                 bag with their tags flipped open, the hint.
     resolved  — every thing on its moment + Go: the success line; 0.5 s
                 later the shell's Next.

   ⚠ THINGS AND HOOKS ARE REACHED BY INDEX (data-k="thing-<j>",
     data-k="hook-<h>"; the right ones are read from the model), NEVER BY
     LABEL. The driver plays level 1 (the default).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'WhatForTagsActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const right = (page) => page.evaluate((g) => window[g].st.rd.right, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function hang(page, j, h) {
  if (!(await tap(page, '[data-k="thing-' + j + '"]'))) throw new Error('thing ' + j + ' absent');
  if (!(await tap(page, '[data-k="hook-' + h + '"]'))) throw new Error('hook ' + h + ' absent');
}
async function fillSwapped(page) { const r = await right(page); await hang(page, r[1], 0); await hang(page, r[0], 1); await hang(page, r[2], 2); await hang(page, r[3], 3); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page); await fillSwapped(page);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ open: !!document.querySelector('.wt-tag.is-open'), hop: !!document.querySelector('.is-hop, .is-glow'), note: document.querySelector('.wt-note').textContent.trim() }));
        if (st.open || st.hop || st.note) throw new Error('a tag, a hint or a hop before Go — the board is grading a choice');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page); await fillSwapped(page);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Go absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.wt-note').classList.contains('is-hint') && !!document.querySelector('.wt-note').textContent.trim(), open: document.querySelectorAll('.wt-things .wt-tag.is-open').length, locked: document.querySelectorAll('.wt-hook.is-in').length }));
        if (!st.hint) throw new Error('no hint after a wrong thing');
        if (st.open !== 2 || st.locked !== 2) throw new Error('the wrong things did not come back with their tags open / the right ones did not lock');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const r = await right(page); for (let h = 0; h < 4; h++) await hang(page, r[h], h);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Go absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.wt-note').classList.contains('is-ok'), in: document.querySelectorAll('.wt-hook.is-in').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || st.in !== 4) throw new Error('no success line / not every hook locked');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
