/* =====================================================================
   visual-qa phase driver — Pearl's Opinion Page (RI.2.8).
   #175 of the one-by-one rebuild: THE SIGN THAT STANDS ON ITS REASONS
   (pearl-opinion-page-activity).

     open     — Pearl's point on the sign, three cards, an empty socket.
     copy     — the restatement slid under and the tide sent: a second copy
                of the sign on top, soaked, the shared words glowing, the hint.
     helped   — then the off-topic card: a lonely post, and the "because"
                panel (every card behind the point).
     two      — Level 2 with the bridge on: a reason under the wrong sign
                and the off-topic card under the other — the leaning post.
     legs     — Level 3: one reason, the sign tilts.
     resolved — Level 1: the reason → the sign lifts dry, the success line, Next.

   ⚠ STATES ARE SET THROUGH THE ACTIVITY'S OWN HAND (the core's place, the
     activity's _tide) — the same calls a tap on a card and the tide button make.
   ===================================================================== */
'use strict';

const G = 'PearlOpinionPageActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/* back to the round under test, at a level and bridge setting */
async function back(page, k, level, bridge) {
  await page.evaluate((g, k, level, bridge) => { const t = window[g]; t.FAST = true; t.api.settings.level = level; t.api.settings.bridge = bridge; t._ensurePool(); t._start(k, 0, 0); t._render2(); }, G, k, level, bridge);
  await wait(150);
}
const state = (page) => page.evaluate((g) => { const t = window[g].st; return { misses: t.misses, help: t.help, done: t.done }; }, G);
/* slide the card of a role under the sign (Level 2: under a given socket) and send the tide */
const put = (page, role, sock) => page.evaluate((g, role, sock) => { const t = window[g], c = t.st.round.cards.find((x) => x.role === role); window.ReasonSignCore.place(t.st, c.id, sock); t._tide(); }, G, role, sock);
const keyOf = (page) => page.evaluate((g) => (window.__psK = window[g]._order ? window[g]._order[0] : 0), G);

module.exports = {
  steps: [
    {
      name: 'copy',
      async drive(page) {
        const k = await keyOf(page); await back(page, k, 'one', 'off');
        await put(page, 'restate'); await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the restatement was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k, 'one', 'off') };
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__psK); await back(page, k, 'one', 'off');
        await put(page, 'restate'); await put(page, 'off'); await wait(150);
        const s = await state(page);
        if (!s.help) throw new Error('a second miss turned no help on (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k, 'one', 'off') };
      }
    },
    {
      name: 'two',
      async drive(page) {
        const k = await page.evaluate(() => window.__psK); await back(page, k, 'two', 'on');
        await page.evaluate((g) => { const t = window[g], C = window.ReasonSignCore, cs = t.st.round.cards; C.place(t.st, cs.find((c) => c.role === 'reason' && c.point === t.st.round.signs[1]).id, 0); C.place(t.st, cs.find((c) => c.role === 'off').id, 1); t._tide(); }, G);
        await wait(150);
        const s = await state(page);
        if (s.misses !== 1) throw new Error('the crossed Level 2 placement was not a miss (' + JSON.stringify(s) + ')');
        return { restore: async () => back(page, k, 'one', 'off') };
      }
    },
    {
      name: 'legs',
      async drive(page) {
        const k = await page.evaluate(() => window.__psK); await back(page, k, 'legs', 'off');
        await put(page, 'reason'); await wait(150);
        const tilt = await page.evaluate(() => !!document.querySelector('.ps-site.is-tilt'));
        if (!tilt) throw new Error('one reason did not tilt the sign');
        return { restore: async () => back(page, k, 'one', 'off') };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__psK); await back(page, k, 'one', 'off');
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await put(page, 'reason');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done) throw new Error('the reason did not solve the round');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
