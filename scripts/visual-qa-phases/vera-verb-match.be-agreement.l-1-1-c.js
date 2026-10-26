/* =====================================================================
   visual-qa phase driver — vera-verb-match / be-agreement (L.1.1.c)
   #123 of the one-by-one rebuild: THE VERB GATES (verb-gates-activity).
   (The previous driver drove the retired vera-verb-match-activity.js; it
   is in git.)

     open      — the sentence with its gap, the subject's house, the empty
                 gateway in the hedge, the garden, the rack of gates.
     picked    — a WRONG gate hung in the gateway: its word stands in the gap.
                 ⭐ Nothing is graded yet — no crowd walks, no gate glows, no
                 hint: a choice is not a verdict.
     missed    — the wrong gate + Check: the crowd walks out and is stopped
                 (sitting behind the turnstile, waiting at the double gate,
                 bouncing off the star door), the hint line names why, the
                 wrong word stays in the gap so the child can re-read it.
     resolved  — the right gate + Check: everyone in the garden, the word in
                 teal, the success line; 0.5 s later the shell's Next.

   ⚠ GATES ARE REACHED BY SHAPE (data-k="gate-<shape>"), NEVER BY WORD — the
   words change per locale and, in sv/da/no and levels 4–5, per round.
   ⚠ FAST is set so a photographed state is the settled one, not a frame of
   the walk.
   ===================================================================== */
'use strict';

const G = 'VerbGatesActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], rd = t && t.st && t.st.rd;
  if (!rd) return null;
  return { right: rd.right, wrong: rd.gates.filter((x) => x.shape !== rd.right).map((x) => x.shape)[0], word: (rd.gates.find((x) => x.shape === rd.right) || {}).w, n: (rd.crowd.star ? 1 : 0) + rd.crowd.n };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('could not read the round off window.' + G);
        if (!(await tap(page, '[data-k="gate-' + r.wrong + '"]'))) throw new Error('gate ' + r.wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          hung: !!document.querySelector('.vg-hung'), word: (document.querySelector('.vg-hw') || {}).textContent || '',
          walked: document.querySelectorAll('.vg-m').length, glow: document.querySelectorAll('.vg-gate.is-glow').length,
          note: document.querySelector('.vg-note').textContent.trim()
        }));
        if (!st.hung || !st.word) throw new Error('the gate did not hang / its word is not in the gap');
        if (st.walked) throw new Error('the crowd walked before Check — the board is grading a choice');
        if (st.glow) throw new Error('a gate glows before Check');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('could not read the round off window.' + G);
        if (!(await tap(page, '[data-k="gate-' + r.wrong + '"]'))) throw new Error('gate ' + r.wrong + ' absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({
          note: document.querySelector('.vg-note').textContent.trim(), hint: document.querySelector('.vg-note').classList.contains('is-hint'),
          shown: document.querySelectorAll('.vg-m').length, home: document.querySelectorAll('.vg-queue .vg-m').length, word: (document.querySelector('.vg-hw') || {}).textContent || ''
        }));
        if (!st.note || !st.hint) throw new Error('no hint after a wrong gate');
        if (st.shown !== r.n) throw new Error('the crowd is not on the path: ' + st.shown + ' of ' + r.n);
        if (!st.home) throw new Error('a wrong gate let everyone through');
        if (!st.word || st.word === r.word) throw new Error('the gap does not keep the wrong word');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('could not read the round off window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        if (!(await tap(page, '[data-k="gate-' + r.right + '"]'))) throw new Error('the right gate absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.vg-note').classList.contains('is-ok'), garden: document.querySelectorAll('.vg-arrived .vg-m').length, home: document.querySelectorAll('.vg-queue .vg-m').length,
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null), teal: !!document.querySelector('.vg-hw.is-ok') };
        });
        if (!st.ok || !st.teal) throw new Error('no success line / the word is not marked right');
        if (st.garden !== r.n || st.home) throw new Error('not everyone is in the garden: ' + st.garden + ' of ' + r.n);
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
