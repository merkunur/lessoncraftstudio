/* =====================================================================
   visual-qa phase driver — place-value-regroup / add compose hundred
   (2.NBT.B.7). #145 of the one-by-one rebuild: THE SQUARE VICE
   (square-vice-activity).

     open      — the three columns with both numbers' blocks, Tuck's vice
                 open over its square gauge, the digit boxes, the keypad.
     short     — nine rods on the bed and a crank: the bare stripe, the
                 soft note.
     missed    — the round traded in the vice, a wrong total checked
                 twice: the pencil digits, the written sum, the hint.
     resolved  — the right total: the boxes go green, Tuck hops; 0.5 s
                 later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("bay-T", "crank", "key-4",
     "check"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'SquareViceActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, worked out from the columns themselves */
const oracle = (page) => page.evaluate((g) => { const st = window[g].st, d = (n, v) => Math.floor(n / v) % 10, o = d(st.a, 1) + d(st.b, 1), co = o >= 10 ? 1 : 0, t = d(st.a, 10) + d(st.b, 10) + co; return { tot: st.a + st.b, O: co, T: t >= 10 ? 1 : 0, tens: st.bays.T.length }; }, G);
async function lockAll(page, o) {
  for (const c of ['O', 'T']) if (o[c]) { for (let i = 0; i < 10; i++) if (!(await tap(page, 'bay-' + c))) throw new Error('could not load ' + c); if (!(await tap(page, 'crank'))) throw new Error('could not crank ' + c); }
}
async function typeIn(page, v) { while (await tap(page, 'key-del')) { if (!(await page.evaluate((g) => window[g].st.typed, G))) break; } for (const d of String(v)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.sv-note'); return { verdict: !!t.verdict, help: t.help, done: t.done, bed: t.bed.pieces.length, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok'), text: n.textContent }; }, G);

module.exports = {
  steps: [
    {
      name: 'short',
      async drive(page) {
        await reset(page); const o = await oracle(page);
        const n = Math.min(9, o.tens); if (n < 1) throw new Error('no tens to stack');
        for (let i = 0; i < n; i++) if (!(await tap(page, 'bay-T'))) throw new Error('could not load a rod');
        if (!(await tap(page, 'crank'))) throw new Error('could not crank');
        await new Promise((x) => setTimeout(x, 150));
        const s = await state(page);
        if (s.bed !== n || !s.text) throw new Error('a short stack did not stay on the bed with its note');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page); const o = await oracle(page); await lockAll(page, o);
        await typeIn(page, o.tot + 10); await tap(page, 'check'); await typeIn(page, o.tot + 1); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.verdict || !s.help || !s.hint) throw new Error('a second miss did not bring the pencil digits and the hint');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const o = await oracle(page); await lockAll(page, o); await typeIn(page, o.tot); await tap(page, 'check');
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
