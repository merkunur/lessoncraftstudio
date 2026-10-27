/* =====================================================================
   visual-qa phase driver — numberbond / story-problem (2.OA.A.1)
   #136 of the one-by-one rebuild: THE REPLAY TRACK (replay-track-activity).

     open      — the story card with its number chips and picture, the
                 empty answer box, Replay, the measuring track with the
                 told flags, the keypad.
     missed    — the told numbers added and replayed: a bar misses its
                 flag, the gap is shaded, the miss line.
     helped    — the same number replayed again: the right story is
                 replayed backwards as ghosts and the place of the number
                 is outlined — ⭐ never a numeral in the help.
     resolved  — the right number replayed: every flag hit, the bond and
                 the equation, the success line; 0.5 s later the shell's
                 Next.

   ⚠ KEYS ARE REACHED BY data-k ("key-4", "replay"), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'ReplayTrackActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
const typeNum = async (page, n) => { for (const d of String(n)) if (!(await tap(page, '[data-k="key-' + d + '"]'))) throw new Error('key ' + d + ' absent'); };
const nums = (page) => page.evaluate((g) => { const t = window[g], C = window.ReplayTrackCore, a = C.answer(t.st.rd), s = t.st.rd.told.reduce((x, y) => x + y, 0); return { ans: a, wrong: s === a ? a + 1 : s }; }, G);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const n = await nums(page); await typeNum(page, n.wrong); await tap(page, '[data-k="replay"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.rt-note').classList.contains('is-hint'), gap: !!document.querySelector('.rt-gap'), miss: !!document.querySelector('.rt-flag.is-miss') }));
        if (!st.hint || !st.gap || !st.miss) throw new Error('no hint / no gap / no missed flag after a wrong number');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        await reset(page);
        const n = await nums(page); await typeNum(page, n.wrong); await tap(page, '[data-k="replay"]'); await tap(page, '[data-k="replay"]');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ region: !!document.querySelector('.rt-region'), numeral: document.querySelectorAll('.rt-help text').length }));
        if (!st.region) throw new Error('miss 2 did not outline the place of the number');
        if (st.numeral) throw new Error('the help prints a numeral — it would give the answer away');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const n = await nums(page); await typeNum(page, n.ans); await tap(page, '[data-k="replay"]');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.rt-note').classList.contains('is-ok'), eq: !!document.querySelector('.rt-eq'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.eq) throw new Error('no success line / no equation');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
