/* =====================================================================
   visual-qa phase driver — cleo-packing-list / series-commas (L.1.2.b)
   #129 of the one-by-one rebuild: THE DIVIDER CASE (divider-case-activity).

     open      — the list over the empty case, a socket in every gap.
     picked    — a comma after the lead and the first comma missing: the
                 commas and their walls are in. ⭐ Nothing is graded yet —
                 no pictures, no pocket colours, no hint.
     missed    — Pack: every thing drops into its pocket, the left pocket
                 is empty (hatched), two things are squashed, the hint.
     resolved  — the right commas + Pack: one thing in every pocket, the
                 lid shuts, the success line; 0.5 s later the shell's Next.

   ⚠ GAPS ARE REACHED BY INDEX (data-k="gap-<n>"), NEVER BY WORD.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'DividerCaseActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], C = window.DividerCaseCore, st = t && t.st;
  if (!st || st.rd.kind !== 'place') return null;
  const n = C.items(st).length, R = C.required(st.loc, n);
  return { right: R, wrong: R.filter((x) => x !== 1).concat([0]) };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function lay(page, gaps) { for (const g of gaps) if (!(await tap(page, '[data-k="gap-' + g + '"]'))) throw new Error('gap ' + g + ' absent'); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a level-1 round on window.' + G);
        await lay(page, r.wrong);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          on: document.querySelectorAll('.dc-gap.is-on').length, pics: document.querySelectorAll('.dc-pic').length,
          graded: document.querySelectorAll('.dc-h.p-ok,.dc-h.p-empty,.dc-h.p-squash').length, note: document.querySelector('.dc-note').textContent.trim()
        }));
        if (st.on !== r.wrong.length) throw new Error('the commas did not go into the gaps');
        if (st.pics || st.graded) throw new Error('the case is packed before Pack — the board is grading a choice');
        if (st.note) throw new Error('a hint before Pack: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a level-1 round on window.' + G);
        await lay(page, r.wrong);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Pack absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          hint: document.querySelector('.dc-note').classList.contains('is-hint') && !!document.querySelector('.dc-note').textContent.trim(),
          pics: document.querySelectorAll('.dc-pic').length, empty: document.querySelectorAll('.dc-h.p-empty').length, squash: document.querySelectorAll('.dc-thing.is-squash').length
        }));
        if (!st.hint) throw new Error('no hint after wrong commas');
        if (!st.pics || !st.empty || st.squash !== 2) throw new Error('the packing does not show the empty pocket and the squash');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a level-1 round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await lay(page, r.right);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Pack absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.dc-note').classList.contains('is-ok'), shut: !!document.querySelector('.dc-case.is-shut'), bad: document.querySelectorAll('.dc-h.p-empty,.dc-h.p-squash').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok) throw new Error('no success line');
        if (!st.shut || st.bad) throw new Error('the lid did not shut over one thing per pocket');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
