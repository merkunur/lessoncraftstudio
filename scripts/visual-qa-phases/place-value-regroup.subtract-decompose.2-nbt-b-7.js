/* =====================================================================
   visual-qa phase driver — place-value-regroup / subtract decompose
   (2.NBT.B.7). #147 of the one-by-one rebuild: THE TAKE-AWAY SCOOP
   (takeaway-scoop-activity).

     open      — the shelves with the top number, the scoop with its cups
                 (some lit, some dark), Tuck and his bowl, the digit boxes,
                 the keypad.
     refused   — a lift with empty cups: the cups blink, the soft note.
     missed    — snapped, lifted, a wrong answer checked twice: the run of
                 counting labels, the written subtraction, the hint.
     resolved  — the right answer: the boxes go green, Tuck hops; 0.5 s
                 later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("scoop", "shelf-T", "key-4",
     "check"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'TakeawayScoopActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, worked out from the numbers themselves */
const oracle = (page) => page.evaluate((g) => {
  const st = window[g].st, d = (n, v) => Math.floor(n / v) % 10, snaps = []; let t = d(st.a, 10);
  if (d(st.a, 1) < d(st.b, 1)) { snaps.push('T'); t--; } if (t < d(st.b, 10)) snaps.push('H');
  return { ans: st.a - st.b, snaps: snaps };
}, G);
async function solve(page, o) { for (const c of o.snaps) if (!(await tap(page, 'shelf-' + c))) throw new Error('could not snap ' + c); if (!(await tap(page, 'scoop'))) throw new Error('could not lift'); }
async function typeIn(page, v) { while (await page.evaluate((g) => window[g].st.typed, G)) if (!(await tap(page, 'key-del'))) break; for (const d of String(v)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.tk-note'); return { verdict: !!t.verdict, help: t.help, done: t.done, used: t.scoop.used, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok'), text: n.textContent }; }, G);

module.exports = {
  steps: [
    {
      name: 'refused',
      async drive(page) {
        await reset(page); const o = await oracle(page);
        await tap(page, 'scoop');
        await new Promise((x) => setTimeout(x, 150));
        const s = await state(page);
        /* a warm-up round lifts at once: that is its lesson, and still a fine photograph */
        if (o.snaps.length && (s.used || !s.text)) throw new Error('a lift with empty cups was not refused with its note');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page); const o = await oracle(page); await solve(page, o);
        await typeIn(page, o.ans + 10); await tap(page, 'check'); await typeIn(page, o.ans + 1); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.verdict || !s.help || !s.hint) throw new Error('a second miss did not bring the count-on run and the hint');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const o = await oracle(page); await solve(page, o); await typeIn(page, o.ans); await tap(page, 'check');
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
