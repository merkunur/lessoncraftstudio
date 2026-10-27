/* =====================================================================
   visual-qa phase driver — array / build-array (2.OA.C.4)
   #138 of the one-by-one rebuild: THE SKEWER PLATE (skewer-plate-activity).

     open      — the plate of fruit, every row on its skewer, the skewer
                 pot, the empty rack, the keys and Check.
     missed    — every skewer lifted into the rack, each box right, the
                 total typed as rows + columns: one row and one column of
                 outlines glow, the hint.
     helped    — another wrong total: running totals at each skewer.
     resolved  — the right total: the success line; 0.5 s later the
                 shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("skew-0", "box-0", "key-4", "total",
     "check"), NEVER BY LABEL. The driver plays the default (Count, up to
     5 × 5).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'SkewerPlateActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const info = (page) => page.evaluate((g) => { const s = window[g].st; return { r: s.r, c: s.c }; }, G);
async function typeIn(page, box, v) { await tap(page, '[data-k="' + box + '"]'); for (const d of String(v)) await tap(page, '[data-k="key-' + d + '"]'); }
async function liftAll(page) { const i = await info(page); for (let k = 0; k < i.r; k++) await tap(page, '[data-k="skew-' + k + '"]'); for (let k = 0; k < i.r; k++) await typeIn(page, 'box-' + k, i.c); return i; }
async function clearTotal(page) { await tap(page, '[data-k="total"]'); for (let k = 0; k < 3; k++) await tap(page, '[data-k="key-del"]'); }

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const i = await liftAll(page); await typeIn(page, 'total', i.r + i.c); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.sp-note').classList.contains('is-hint'), edge: document.querySelectorAll('.is-edge').length }));
        if (!st.hint || !st.edge) throw new Error('rows + columns did not light a row and a column with a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page);
        const i = await liftAll(page); await typeIn(page, 'total', i.r + i.c); await tap(page, '[data-k="check"]');
        await clearTotal(page); await typeIn(page, 'total', i.r * i.c + 1); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ run: document.querySelectorAll('.sp-run').length }));
        if (!st.run) throw new Error('miss 2 did not show the running totals');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const i = await liftAll(page); await typeIn(page, 'total', i.r * i.c); await tap(page, '[data-k="check"]');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.sp-note').classList.contains('is-ok'), celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok) throw new Error('no success line');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
