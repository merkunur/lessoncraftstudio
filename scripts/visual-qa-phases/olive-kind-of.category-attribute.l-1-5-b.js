/* =====================================================================
   visual-qa phase driver — olive-kind-of / category-attribute (L.1.5.b)
   #132 of the one-by-one rebuild: THE CLIMBING TREE (climbing-tree-activity).

     open      — the tree with its perches, the nest with the picture and
                 its clue.
     picked    — the picture climbed to a wrong branch. ⭐ Nothing is graded
                 yet: the leaf reads that sentence, no hint, no glow.
     missed    — Check: the branch cannot hold it, the picture is back at
                 the roots, the hint.
     resolved  — the right branch + Check: the gold leaf, the success line;
                 0.5 s later the shell's Next.

   ⚠ BRANCHES ARE REACHED BY INDEX (data-k="branch-<n>"; the right one is
     read from the model), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'ClimbingTreeActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const right = (page) => page.evaluate((g) => window[g].st.rd.right, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function branch(page, i) { if (!(await tap(page, '[data-k="branch-' + i + '"]'))) throw new Error('branch ' + i + ' absent'); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await right(page); await branch(page, r === 0 ? 1 : 0);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ leaf: !!document.querySelector('.ct-leaf:not(.is-gold)'), glow: !!document.querySelector('.is-glow'), note: document.querySelector('.ct-note').textContent.trim() }));
        if (!st.leaf) throw new Error('the leaf does not read the climb');
        if (st.glow || st.note) throw new Error('a hint before Check — the board is grading a choice');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await right(page); await branch(page, r === 0 ? 1 : 0);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.ct-note').classList.contains('is-hint') && !!document.querySelector('.ct-note').textContent.trim(), home: !!document.querySelector('[data-k="newcomer"]') }));
        if (!st.hint) throw new Error('no hint after a wrong branch');
        if (!st.home) throw new Error('the picture did not slide back to the roots');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await branch(page, await right(page));
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.ct-note').classList.contains('is-ok'), gold: !!document.querySelector('.ct-leaf.is-gold'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.gold) throw new Error('no success line / the leaf is not gold');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
