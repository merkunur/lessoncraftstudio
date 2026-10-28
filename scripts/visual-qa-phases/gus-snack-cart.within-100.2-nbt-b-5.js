/* =====================================================================
   visual-qa phase driver — gus-snack-cart / within 100 (2.NBT.B.5)
   #143 of the one-by-one rebuild: THE ROUND-TRIP CART (round-trip-activity).

     open      — the story card (snack picture + sentence), the equation
                 card, the number road with the cart parked on its flag,
                 the keypad and Check.
     missed    — the story's answer + 1 typed and checked: the cart comes
                 back off its flag, the gap bracketed, the written line.
     helped    — a second miss: the story's hops replayed to a ghost cart.
     resolved  — the right answer: the cart home, the loop stripe; 0.5 s
                 later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("key-4", "check"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'RoundTripActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's answer, worked out on the core's own stops */
const answer = (page) => page.evaluate((g) => { const st = window[g].st, s = window.RoundTripCore.stops(st.rd); return { mode: st.mode, stops: s, start: st.rd.start, step: st.rd.steps[0] }; }, G);
async function typeAll(page, nums) { for (const n of nums) for (const d of String(n)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
async function roundFirst(page, a) {
  if (a.mode !== 'round') return;
  const C = (n) => Math.floor((n + 5) / 10) * 10;
  await tap(page, 'post-' + C(a.start)); await tap(page, 'post-' + C(a.step));
  await typeAll(page, [C(a.start) + C(a.step)]); await tap(page, 'box-answer');
}
const wrongOf = (a) => a.stops.map((v, i) => i === a.stops.length - 1 ? (v === 99 ? 98 : v + 1) : v);
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.rt-note'); return { trip: !!t.trip, fail: t.trip ? t.trip.fail : null, help: t.help, done: t.done, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok') }; }, G);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page); const a = await answer(page); await roundFirst(page, a); await typeAll(page, wrongOf(a)); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.trip || s.fail < 0 || !s.hint || s.help) throw new Error('a wrong answer did not leave the cart off its flag with a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); const a = await answer(page); await roundFirst(page, a); await typeAll(page, wrongOf(a)); await tap(page, 'check');
        await tap(page, 'key-del'); await tap(page, 'key-del'); const w = wrongOf(a), last = w[w.length - 1]; await typeAll(page, [last === 98 ? 97 : last + 1]); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page), ghost = await page.evaluate(() => document.querySelectorAll('.rt-cart.is-ghost').length);
        if (!s.help || ghost !== 1) throw new Error('a second miss did not replay the story to a ghost cart');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const a = await answer(page); await roundFirst(page, a); await typeAll(page, a.stops); await tap(page, 'check');
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
