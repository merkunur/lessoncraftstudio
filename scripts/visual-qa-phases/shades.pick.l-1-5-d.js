/* =====================================================================
   visual-qa phase driver — shades / pick (L.1.5.d)
   #134 of the one-by-one rebuild: THE STOVE KNOB (stove-knob-activity).

     open      — the pot, the flame, the knob with its empty clicks, the
                 shelf of words, Turn it up.
     picked    — every click holds a word, two swapped. ⭐ Nothing is
                 graded yet: no jump, no hint, the soup still plain.
     missed    — Turn it up: the soup jumps at the two swapped words and
                 shows the misplaced one, the hint names it.
     resolved  — the right order + Turn it up: the success line; 0.5 s
                 later the shell's Next.

   ⚠ WORDS AND CLICKS ARE REACHED BY INDEX (data-k="tile-<j>",
     data-k="win-<w>"; the ranks are read from the model), NEVER BY LABEL.
     The driver plays level 1 (the default).
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'StoveKnobActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const ranks = (page) => page.evaluate((g) => window[g].st.rd.tiles.map((t) => t.rank), G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function put(page, j, w) {
  if (!(await tap(page, '[data-k="tile-' + j + '"]'))) throw new Error('word ' + j + ' absent');
  if (!(await tap(page, '[data-k="win-' + w + '"]'))) throw new Error('click ' + w + ' absent');
}
async function fill(page, swapped) {
  const r = await ranks(page), n = r.length, at = (k) => r.indexOf(k);
  for (let c = 0; c < n; c++) { let k = c + 1; if (swapped && c === 0) k = n; else if (swapped && c === n - 1) k = 1; await put(page, at(k), c); }
}
const soup = (page) => page.evaluate(() => { const e = document.querySelector('.sk-soup > ellipse'); return e ? e.getAttribute('fill') : ''; });

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page); const plain = await soup(page); await fill(page, true);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ jump: !!document.querySelector('.is-jump'), note: document.querySelector('.sk-note').textContent.trim() }));
        if (st.jump || st.note) throw new Error('a jump or a hint before Turn it up — the board is grading a choice');
        if ((await soup(page)) !== plain) throw new Error('the soup shows the words before Turn it up (soup colours are "only when I turn it up")');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page); await fill(page, true);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Turn it up absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.sk-note').classList.contains('is-hint'), jumps: document.querySelectorAll('.sk-win.is-jump').length }));
        if (!st.hint) throw new Error('no hint after a wrong order');
        if (st.jumps !== 2) throw new Error('the soup did not jump at exactly the two swapped words');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await fill(page, false);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Turn it up absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.sk-note').classList.contains('is-ok'), in: document.querySelectorAll('.sk-win.is-in').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || st.in < 3) throw new Error('no success line / the clicks are not lit');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
