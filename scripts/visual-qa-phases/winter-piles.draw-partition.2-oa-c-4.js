/* =====================================================================
   visual-qa phase driver — winter-piles / draw-partition (2.OA.C.4)
   #140 of the one-by-one rebuild: THE SNOW-LID STACK (winter-piles-activity).

     open      — Level 1: the acorn tray (a fix round arrives with its
                 twigs), the library acorn, the empty stump with the
                 squirrel, the question and box, the keys and Check.
     missed    — a wrong cut stacked and checked: the lid slides off, the
                 extra rows stick out coral, the pile sizes beside the
                 layers, the hint.
     helped    — a second Check: a dotted twig where each right cut goes.
     resolved  — the right cuts, the right number: the lid lies flat, the
                 success line; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("gap-1", "stack", "key-4", "check"),
     NEVER BY LABEL. The driver plays the default (Level 1).
   ⚠ A two-row tray has no wrong cut — its miss is a wrong number.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'SnowStackActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const info = (page) => page.evaluate((g) => { const s = window[g].st, C = window.SnowStackCore; return { r: s.rd.r, cuts: s.cuts.slice(), right: C.rightCuts(s.level, s.rd), ans: C.answer(s.level, s.rd), preset: !!s.rd.preset }; }, G);
async function setCuts(page, want) { const i = await info(page); for (const g of i.cuts) if (want.indexOf(g) < 0) await tap(page, '[data-k="gap-' + g + '"]'); const j = await info(page); for (const g of want) if (j.cuts.indexOf(g) < 0) await tap(page, '[data-k="gap-' + g + '"]'); }
async function miss(page) {
  const i = await info(page);
  if (!i.preset && i.r > 2) await tap(page, '[data-k="gap-1"]');
  if (i.r === 2) { await setCuts(page, i.right); await tap(page, '[data-k="key-' + (i.ans === 9 ? 8 : i.ans + 1) + '"]'); }
  await tap(page, '[data-k="check"]');
}

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page); await miss(page);
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.ws-note').classList.contains('is-hint'), misses: window.SnowStackActivity.st.misses }));
        if (!st.hint || st.misses !== 1) throw new Error('a wrong cut did not give a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); await miss(page); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ help: window.SnowStackActivity.st.help, r: window.SnowStackActivity.st.rd.r, ghosts: document.querySelectorAll('.ws-ghost').length, lit: document.querySelectorAll('.ws-dotnum').length }));
        if (!st.help || (st.r > 2 ? !st.ghosts : !st.lit)) throw new Error('miss 2 did not show the dotted twigs (or the counted pile)');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const i = await info(page); await setCuts(page, i.right); await tap(page, '[data-k="stack"]'); await tap(page, '[data-k="key-' + i.ans + '"]'); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.ws-note').classList.contains('is-ok'), flat: !!document.querySelector('.ws-lid.is-flat'), celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.flat) throw new Error('no success line on a flat lid');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
