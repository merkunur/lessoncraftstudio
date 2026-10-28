/* =====================================================================
   visual-qa phase driver — place-value / hundreds, tens and ones (2.NBT.A.1).
   #149 of the one-by-one rebuild: THE CAPPED MAT (capped-mat-activity).

     open      — the order ticket, the mat (three columns, dashed cap seats,
                 + / − under each column), Check.
     built     — a wrong build checked once: the caps drop and read the
                 build, the differing column glows, the hint.
     helped    — a second miss: dashed outlines show how many blocks the
                 differing column needs.
     folded    — the Read job (307): caps on the hundreds and ones, the
                 empty tens column left bare → it folds shut, the hint
                 quotes "37".
     tray      — the Match job: a wrong tray chosen → its caps, the
                 differing blocks glow.
     resolved  — the right build: the caps drop, the lid closes, the ticket
                 goes green; 0.5 s later the shell's Next.

   ⚠ CONTROLS ARE REACHED BY data-k ("add-h", "seat-t", "cap-7", "tray-1",
     "check"), NEVER BY LABEL. ⚠ FAST is set so a photographed state is the
     settled one. Read / Match steps switch the job in the settings and put
     it back, so the forced Build round of the next step is untouched.
   ===================================================================== */
'use strict';

const G = 'CappedMatActivity';

async function useJob(page, job, k) {
  await page.evaluate((g, job, k) => {
    const t = window[g]; t.FAST = true;
    t.api.settings.job = job; t.api.settings.blocks = 'tidy';
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, job, k == null ? null : k);
  await new Promise((r) => setTimeout(r, 120));
}
async function back(page, k) { await useJob(page, 'build', k); }
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
/* the round's oracle, from the round's own number */
const target = (page) => page.evaluate((g) => { const n = window[g].st.round.n; return { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10, n: n }; }, G);
async function build(page, d) {
  for (const p of ['h', 't', 'o']) for (let i = 0; i < d[p]; i++) if (!(await tap(page, 'add-' + p))) throw new Error('could not add a block to ' + p);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st, n = document.querySelector('.cm-note');
  return { verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok'),
    ghosts: document.querySelectorAll('.cm-col .is-ghost').length, glow: document.querySelectorAll('.cm-col.is-glow').length, note: n.textContent, trayCaps: document.querySelectorAll('.cm-traycaps').length };
}, G);

module.exports = {
  steps: [
    {
      name: 'built',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__cmK = window[g].st.k), G); /* the forced Build round, kept for the later steps */ await back(page, k);
        const d = await target(page); await build(page, Object.assign({}, d, { t: d.t === 9 ? 8 : d.t + 1 }));
        await tap(page, 'check'); await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (s.verdict !== 'wrongBuild' || s.help || !s.hint || s.glow !== 1) throw new Error('a wrong build did not drop the caps and light its column');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__cmK); await back(page, k);
        const d = await target(page), wrong = Object.assign({}, d, { t: d.t === 9 ? 7 : d.t + 1 });
        await build(page, wrong); await tap(page, 'check');
        await tap(page, 'rem-o'); await tap(page, 'add-o'); await tap(page, 'check');
        await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (!s.help || !s.hint || s.verdict !== 'wrongBuild') throw new Error('a second miss did not bring the outlines');
        return true;
      }
    },
    {
      name: 'folded',
      async drive(page) {
        const k = await page.evaluate(() => window.__cmK);
        await useJob(page, 'read', 2);
        await tap(page, 'seat-h'); await tap(page, 'cap-3'); await tap(page, 'seat-o'); await tap(page, 'cap-7');
        await tap(page, 'check'); await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (s.verdict !== 'zeroFold' || s.note.indexOf('37') < 0) throw new Error('a bare empty column did not fold 307 into 37');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'tray',
      async drive(page) {
        const k = await page.evaluate(() => window.__cmK);
        await useJob(page, 'match', 0);
        await tap(page, 'tray-1'); await tap(page, 'check'); await new Promise((x) => setTimeout(x, 200));
        const s = await state(page);
        if (s.verdict !== 'wrongTray' || s.trayCaps !== 1) throw new Error('a wrong tray did not show its caps');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__cmK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const d = await target(page); await build(page, d); await tap(page, 'check');
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
