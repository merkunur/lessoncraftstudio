/* =====================================================================
   visual-qa phase driver — match-pairs / three ways to show a number (2.NBT.A.3)
   #142 of the one-by-one rebuild: THE TWIN TUBES (twin-tubes-activity).

     open      — the deck (numerals, number names, expanded forms) and the
                 twin stand, empty.
     missed    — a numeral against another number's expanded form: the
                 uneven tubes ringed, the digits beside them, the hint.
     helped    — a second miss: each part written over its tube.
     paired    — a numeral with its word: the frost melts, the pair on the
                 shelf.
     resolved  — all three numbers clipped into triples: the round line;
                 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("n0", "w1", "e2", "pair-0",
     "cradle-1"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'TwinTubesActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.k); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
const tapAll = async (page, ks) => { for (const k of ks) if (!(await tap(page, k))) throw new Error('could not tap ' + k); };
const state = (page) => page.evaluate((g) => { const t = window[g].st, n = document.querySelector('.tt-note'); return { last: t.last && t.last.result, help: t.help, done: t.done, found: Object.keys(t.found).length, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok') }; }, G);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page); await tapAll(page, ['n0', 'e1']);
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (s.last !== 'uneven' || !s.hint || s.help) throw new Error('two different numbers did not give a hint');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page); await tapAll(page, ['n0', 'e1', 'cradle-1', 'e2']);
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page), split = await page.evaluate(() => document.querySelectorAll('.tt-split').length);
        if (!s.help || split !== 2) throw new Error('a second miss did not write the parts over the tubes');
        return true;
      }
    },
    {
      name: 'paired',
      async drive(page) {
        await reset(page); await tapAll(page, ['n0', 'w0']);
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page), shelf = await page.evaluate(() => document.querySelectorAll('[data-k="pair-0"]').length);
        if (s.last !== 'pair' || shelf !== 1) throw new Error('a numeral and its word did not clip into a pair');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        for (const key of [0, 1, 2]) await tapAll(page, ['n' + key, 'w' + key, 'pair-' + key, 'e' + key]);
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
