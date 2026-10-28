/* =====================================================================
   visual-qa phase driver — place-value-regroup / subtract decompose
   hundred (2.NBT.B.7). #146 of the one-by-one rebuild: THE NESTED CRATES
   (nested-crates-activity).

     open      — the three shelves (crates, no boxes, a few cubes), Tuck at
                 the hatch with the empty order slip, the digit boxes, the
                 keypad.
     opened    — a crate opened into ten boxes and a box into ten cubes;
                 the pack outline under the tens shelf.
     missed    — the slip filled, a wrong answer checked twice: the pencil
                 digit, the written subtraction with its marks, the hint.
     resolved  — the right answer: the boxes go green, the slip is sent,
                 Tuck hops; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("shelf-H", "slip-O", "key-4",
     "check"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'NestedCratesActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, worked out from the numbers themselves */
const oracle = (page) => page.evaluate((g) => { const st = window[g].st, d = (n, v) => Math.floor(n / v) % 10; return { ans: st.a - st.b, H: d(st.b, 100), T: d(st.b, 10), O: d(st.b, 1) }; }, G);
async function openBoth(page) { if (!(await tap(page, 'shelf-H'))) throw new Error('could not open a crate'); if (!(await tap(page, 'shelf-T'))) throw new Error('could not open a box'); }
async function fill(page, o) { for (const c of ['H', 'T', 'O']) for (let i = 0; i < o[c]; i++) if (!(await tap(page, 'slip-' + c))) throw new Error('could not fill ' + c); }
async function typeIn(page, v) { while (await page.evaluate((g) => window[g].st.typed, G)) if (!(await tap(page, 'key-del'))) break; for (const d of String(v)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.nc-note'); return { verdict: !!t.verdict, help: t.help, done: t.done, T: t.shelves.T, O: t.shelves.O, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok') }; }, G);

module.exports = {
  steps: [
    {
      name: 'opened',
      async drive(page) {
        await reset(page); await openBoth(page);
        await new Promise((x) => setTimeout(x, 150));
        const s = await state(page);
        if (s.T !== 9 || s.O < 10) throw new Error('a crate and a box did not open into boxes and cubes');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page); const o = await oracle(page); await openBoth(page); await fill(page, o);
        await typeIn(page, o.ans + 10); await tap(page, 'check'); await typeIn(page, o.ans + 1); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.verdict || !s.help || !s.hint) throw new Error('a second miss did not bring the pencil digit and the hint');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const o = await oracle(page); await openBoth(page); await fill(page, o); await typeIn(page, o.ans); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 900));
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || !s.ok) throw new Error('the round did not finish with its line');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
