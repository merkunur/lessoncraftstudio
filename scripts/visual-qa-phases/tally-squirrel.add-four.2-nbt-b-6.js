/* =====================================================================
   visual-qa phase driver — tally-squirrel / add four (2.NBT.B.6)
   #144 of the one-by-one rebuild: THE ACORN SIEVE (acorn-sieve-activity).

     open      — the baskets with their numbers, the sieve under the cloth
                 (the default), Tally and the jar, the three windows, the
                 keypad and Check.
     missed    — every basket tipped, the loose window one off and checked:
                 the cloth gone, the sieve shaken, the cups counting in
                 tens, the hint.
     helped    — a second miss: the two sums under the sieve and the tray,
                 the cups window pencilled.
     resolved  — the right windows: the full grooves rolled into cups,
                 Tally hops; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("tub-0", "win-cups", "key-4",
     "check"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'AcornSieveActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, worked out from its own baskets */
const oracle = (page) => page.evaluate((g) => { const st = window[g].st, n = st.tubs.map((t) => t.n); return { face: st.face, n: n.length, tens: n.reduce((a, x) => a + Math.floor(x / 10), 0), ones: n.reduce((a, x) => a + x % 10, 0) }; }, G);
async function typeIn(page, w, v) { if (!(await tap(page, 'win-' + w))) throw new Error('no window ' + w); for (const d of String(v)) if (!(await tap(page, 'key-' + d))) throw new Error('could not type ' + d); }
async function fill(page, o, ones) {
  for (let i = 0; i < o.n; i++) if (!(await tap(page, 'tub-' + i))) throw new Error('could not tip basket ' + i);
  if (o.face !== 'small') { await typeIn(page, 'cups', o.tens); await typeIn(page, 'loose', ones); }
  await typeIn(page, 'all', o.tens * 10 + o.ones);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.as-note'); return { verdict: !!t.verdict, help: t.help, done: t.done, covered: t.covered, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok') }; }, G);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page); const o = await oracle(page); await fill(page, o, o.ones + 1); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.verdict || s.help || !s.hint || s.covered) throw new Error('a wrong window did not lift the cloth and give the first hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); const o = await oracle(page); await fill(page, o, o.ones + 1); await tap(page, 'check');
        await tap(page, 'win-loose'); await tap(page, 'key-del'); await tap(page, 'key-del'); await typeIn(page, 'loose', o.ones + 2); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page), sums = await page.evaluate(() => document.querySelector('.as-onesline').textContent.length);
        if (!s.help || !sums) throw new Error('a second miss did not split the baskets into their sums');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const o = await oracle(page); await fill(page, o, o.ones); await tap(page, 'check');
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
