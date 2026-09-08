/* =====================================================================
   visual-qa phase driver — hoppers-number-line (2.MD.B.6)
   ---------------------------------------------------------------------
   This activity has THREE screens and the sweep had only ever seen the first:

     open   — the story + a bare number line + direction/size controls
     dial   — start+dir+size set: the hop SPAN and the landing LILY appear on the
              line, the story and controls collapse to a recap, and a 0-9 KEYPAD
              plus the "Hoppa! 🐸" commit button render. None of this had ever
              been photographed at any width.
     solved — the win screen (.hnl-done). Also never photographed.

   Steps are COARSE on purpose. Each one must change the rendered control set, or
   the harness fails it as a no-op (#39). Tapping a tick alone does NOT change the
   control set — same 11 tick hits, same 2 direction buttons, same 3 size chips —
   so a per-tap step would fail a CORRECT tool. Set the whole model in one step.

   The model is read from the tool rather than assumed, so 'solved' commits the
   ACTUAL landing and the win screen is real rather than a forced class toggle.
   ===================================================================== */
'use strict';

const G = 'HoppersNumberLineActivity';

/* click the nth match, re-querying every time — each tap re-renders and stales handles */
async function clickNth(page, sel, n) {
  const els = await page.$$(sel);
  if (!els[n]) throw new Error('no ' + sel + '[' + n + '] (found ' + els.length + ')');
  await els[n].click();
  await new Promise(r => setTimeout(r, 90));
}

module.exports = {
  /* The tick hit areas sit on ONE shared axis, so the flat 44px answer-card floor is the
     wrong instrument: 11 ticks across a 320px card is 29px edge-to-edge before any margin,
     and RAISING them to 44 makes the real defect — adjacent targets overlapping, so a tap
     near a boundary selects the wrong start — strictly worse. Measured for overlap instead. */
  axisControls: {
    selector: '.hnl-tickhit',
    why: '11 number-line ticks share one axis; the pitch, not a flat floor, bounds the width',
  },
  steps: [
    {
      name: 'dial',
      /* set start + direction + size -> the DIAL screen (span, lily, recap, keypad, Hoppa) */
      async drive(page) {
        const plan = await page.evaluate((g) => {
          const t = window[g];
          if (!t || !t.round || !t.snap) return null;
          const ticks = t.snap.ticks || [];
          const startIdx = ticks.indexOf(t.round.start);
          const sizeIdx = (t._chips || []).indexOf(t.round.size);
          return { startIdx, sizeIdx, dirIdx: t.round.dir === 'back' ? 1 : 0 };
        }, G);
        if (!plan) throw new Error('could not read the round off window.' + G);
        if (plan.startIdx < 0) throw new Error('the round start is not one of the ticks');
        if (plan.sizeIdx < 0) throw new Error('the round size is not one of the offered chips');

        await clickNth(page, '.hnl-tickhit', plan.startIdx);
        await clickNth(page, '.hnl-dir', plan.dirIdx);
        await clickNth(page, '.hnl-size', plan.sizeIdx);

        /* assert we actually arrived — the keypad only exists in the DIAL phase */
        const keys = await page.$$('.hnl-key');
        if (!keys.length) throw new Error('no keypad after setting start+dir+size — the DIAL phase was not reached');
        return true;
      },
    },
    {
      name: 'solved',
      /* the win screen carries no TOOL control by design — the child advances with the
         shell's own Check/Next. Asserted here, explicitly, rather than by loosening a gate. */
      terminal: true,
      /* type the true landing and commit -> the win screen */
      async drive(page) {
        const land = await page.evaluate((g) => {
          const t = window[g];
          if (!t || !t.round || !window.NumberlineJumpCore) return null;
          return window.NumberlineJumpCore.landing(t.round);
        }, G);
        if (land == null) throw new Error('could not compute the landing');

        for (const ch of String(land)) {
          const d = Number(ch);
          await clickNth(page, '.hnl-key', d === 0 ? 9 : d - 1);
        }
        const hop = await page.$('.hnl-hop');
        if (!hop) throw new Error('no commit button in the DIAL phase');
        if (await page.evaluate(el => el.disabled, hop)) throw new Error('the commit button is still disabled after dialling ' + land);
        await hop.click();
        await new Promise(r => setTimeout(r, 220));

        const solved = await page.evaluate((g) => !!(window[g] && window[g].solved), G);
        if (!solved) throw new Error('committed the true landing ' + land + ' and the tool did not mark it solved');
        return true;
      },
    },
  ],
};
