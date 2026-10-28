/* =====================================================================
   visual-qa phase driver — comet-kangaroo / tens & hundreds (2.NBT.B.8).
   #148 of the one-by-one rebuild: THE GLASS STACK (glass-stack-activity).

     open      — Comet beside the task card, the frosted sheet with the
                 start square cleared and ringed, the spine of ten sheet
                 edges, the answer box, the keypad.
     flagged   — a wrong number checked once: Comet on the landing, the
                 flag where the child's number lives, the connector, the
                 lit axis and the digit chips, the hint.
     helped    — a second miss: Comet back on the start, the move pad.
     resolved  — the right answer: the box goes green, Comet hops; 0.5 s
                 later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("key-4", "box-2", "check"), NEVER
     BY LABEL. ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'GlassStackActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, worked out from the round's own numbers */
const oracle = (page) => page.evaluate((g) => {
  const r = window[g].st.round, STEP = { R: 1, L: -1, D: 10, U: -10, DIVE: 100, RISE: -100 };
  if (r.kind === 'leap') return { n: r.a + r.leap };
  if (r.kind === 'follow') return { n: r.chips.reduce((n, c) => n + STEP[c], r.a) };
  if (r.kind === 'mystery') return { n: r.a + STEP[r.ca] };
  const d = Math.floor(r.b / 10) - Math.floor(r.a / 10), rr = r.b % 10 - r.a % 10;
  return { far: true, d: d, r: rr };
}, G);
async function typeIn(page, v) { while (await page.evaluate((g) => window[g].st.typed, G)) if (!(await tap(page, 'key-del'))) break; for (const d of String(v)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
async function typeFar(page, d, r) {
  for (const [box, v, key] of [['box-1', d, 'typed'], ['box-2', r, 'typed2']]) {
    if (!(await tap(page, box))) throw new Error('could not pick ' + box);
    if (await page.evaluate((g, k) => window[g].st[k], G, key)) await tap(page, 'key-del');
    if (!(await tap(page, 'key-' + v))) throw new Error('could not type ' + v);
  }
}
async function answer(page, o, bump) {
  if (o.far) await typeFar(page, o.d + (bump ? 1 : 0), o.r); else await typeIn(page, o.n + (bump || 0));
  await tap(page, 'check');
}
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.gk-note'); return { verdict: !!t.verdict, help: t.help, done: t.done, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok'), moves: document.querySelectorAll('.gk-move').length }; }, G);

module.exports = {
  steps: [
    {
      name: 'flagged',
      async drive(page) {
        await reset(page); const o = await oracle(page);
        await answer(page, o, 10);
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.verdict || s.help || !s.hint) throw new Error('a first miss did not plant the flag with its hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); const o = await oracle(page);
        await answer(page, o, 10); await answer(page, o, 1);
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.help || !s.hint || s.moves !== 6) throw new Error('a second miss did not bring the move pad and the hint');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const o = await oracle(page); await answer(page, o, 0);
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
