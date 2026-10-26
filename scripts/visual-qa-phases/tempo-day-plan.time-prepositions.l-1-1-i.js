/* =====================================================================
   visual-qa phase driver — tempo-day-plan / time-prepositions (L.1.1.i)
   #127 of the one-by-one rebuild: THE EVENT TUNNEL (event-tunnel-activity).

     open      — the sentence with its gap, the day road with the tunnel and
                 its event picture, the action card on its stretch, the
                 lantern at the morning end, three phrases.
     picked    — a WRONG phrase in the gap: the strip reads it. ⭐ Nothing is
                 graded yet — no lit stretch, no glow, no hint.
     missed    — the wrong phrase + Check: the lantern lights the stretch
                 that phrase means, the hint says the card is not there.
     resolved  — the right phrase + Check: the lantern lights the card's
                 stretch, the card glows, the success line; 0.5 s later the
                 shell's Next.

   ⚠ PHRASES ARE REACHED BY STRETCH (data-k="word-<b|d|a>"), NEVER BY WORD.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'EventTunnelActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const info = (page) => page.evaluate((g) => {
  const t = window[g], rd = t && t.st && t.st.rd;
  if (!rd || rd.kind !== 'name') return null;
  return { right: rd.stretch, wrong: rd.rack.filter((w) => w !== rd.stretch)[0] };
}, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a phrase round on window.' + G);
        if (!(await tap(page, '[data-k="word-' + r.wrong + '"]'))) throw new Error('phrase ' + r.wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({
          inGap: !!document.querySelector('[data-k="gap"]'), lit: document.querySelectorAll('.et-zone.is-lit').length,
          glow: document.querySelectorAll('.et-word.is-glow,.et-zone.is-glow').length, note: document.querySelector('.et-note').textContent.trim()
        }));
        if (!st.inGap) throw new Error('the phrase did not go into the gap');
        if (st.lit) throw new Error('a stretch is lit before Check — the board is grading a choice');
        if (st.glow) throw new Error('something glows before Check');
        if (st.note) throw new Error('a hint before Check: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a phrase round on window.' + G);
        if (!(await tap(page, '[data-k="word-' + r.wrong + '"]'))) throw new Error('phrase ' + r.wrong + ' absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate((w) => ({
          hint: document.querySelector('.et-note').classList.contains('is-hint') && !!document.querySelector('.et-note').textContent.trim(),
          lit: !!document.querySelector('.et-zone.z-' + w + '.is-lit'), inGap: !!document.querySelector('[data-k="gap"]')
        }), r.wrong);
        if (!st.hint) throw new Error('no hint after a wrong phrase');
        if (!st.lit) throw new Error('the lantern did not light the wrong phrase\'s stretch');
        if (!st.inGap) throw new Error('the wrong phrase left the gap — the child has nothing to re-read');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await info(page); if (!r) throw new Error('not a phrase round on window.' + G);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        if (!(await tap(page, '[data-k="word-' + r.right + '"]'))) throw new Error('the right phrase absent');
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('Check absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate((w) => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.et-note').classList.contains('is-ok'), lit: !!document.querySelector('.et-zone.z-' + w + '.is-lit .et-act.is-ok'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        }, r.right);
        if (!st.ok) throw new Error('no success line');
        if (!st.lit) throw new Error('the card does not glow in the lit stretch');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
