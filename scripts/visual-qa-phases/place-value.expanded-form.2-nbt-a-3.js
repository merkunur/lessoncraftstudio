/* =====================================================================
   visual-qa phase driver — place-value / expanded form (2.NBT.A.3).
   #150 of the one-by-one rebuild: THE VALUE-KEY ADDING MACHINE
   (value-keys-activity).

     open      — the ticket, the machine (a bank of value keys, or place
                 tabs + one 3 × 3 pad on a narrow stage), drums, crank, Check.
     missed    — the keys pressed one ten too many: the drums show the
                 machine's sum, the differing place glows, the tape prints.
     helped    — a second miss: the ticket opens into pockets, "4 tens = 40".
     zero      — 305 made with a 50: the zero hint, the ticket's 0 glows.
     readmiss  — the Read job: one key wrong → the tray lines up the keys'
                 blocks, extra blocks crossed / missing ones as outlines.
     worthmiss — the Worth job: the face-value key → the tray compares.
     setfind   — Which set?: two misses → every set shows its value.
     resolved  — the right keys: the tape, the blocks in the tray, the
                 celebration and Next 0.5 s later.

   ⚠ CONTROLS ARE REACHED BY data-k ("tab-t", "key-t4", "set-1", "check"),
     NEVER BY LABEL. On a narrow stage a key exists only on its own tab's
     pad, so press() selects the tab first. FAST is set.
   ===================================================================== */
'use strict';

const G = 'ValueKeysActivity';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function useJob(page, job, numbers, k) {
  await page.evaluate((g, job, numbers, k) => {
    const t = window[g]; t.FAST = true;
    t.api.settings.job = job; t.api.settings.numbers = numbers;
    t._pool = null; t._ensurePool(); t._start(k == null ? (t.st ? t.st.k : 0) : k); t._render2();
  }, G, job, numbers, k == null ? null : k);
  await wait(120);
}
const back = (page, k) => useJob(page, 'make', 'three', k);
const tap = (page, k) => page.evaluate((s) => { const b = document.querySelector('[data-k="' + s + '"]'); if (!b || b.disabled) return false; b.click(); return true; }, k);
async function press(page, p, d) {
  await tap(page, 'tab-' + p); /* only on a narrow stage */
  if (!(await tap(page, 'key-' + p + d))) throw new Error('could not press ' + p + d);
}
async function pressNumber(page, n, places) {
  const d = { h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 };
  for (const p of places === 2 ? ['t', 'o'] : ['h', 't', 'o']) if (d[p]) await press(page, p, d[p]);
}
const state = (page) => page.evaluate((g) => {
  const t = window[g].st, n = document.querySelector('.vk-note');
  return { n: t.round.n, k: t.k, verdict: t.verdict ? t.verdict.kind : null, help: t.help, done: t.done, note: n.textContent, hint: n.classList.contains('is-hint'),
    glow: document.querySelectorAll('.vk-tdig.is-glow').length, pockets: document.querySelectorAll('.vk-pocket').length, tray: document.querySelectorAll('.vk-tray.is-full').length,
    setv: document.querySelectorAll('.vk-setv').length, tape: document.querySelectorAll('.vk-tl').length };
}, G);

module.exports = {
  steps: [
    {
      name: 'missed',
      async drive(page) {
        const k = await page.evaluate((g) => (window.__vkK = window[g].st.k), G); await back(page, k);
        const s0 = await state(page), d = Math.floor(s0.n / 10) % 10;
        await pressNumber(page, s0.n, 3);
        await press(page, 't', d === 9 ? 8 : d + 1); /* one ten too many (or one too few for 9) */
        await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (!(s.verdict === 'wrongMake' || s.verdict === 'zeroPressed') || s.help || !s.hint || s.glow < 1 || s.tape < 1) throw new Error('a wrong make did not light its place and print the tape');
        return true;
      }
    },
    {
      name: 'helped',
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK);
        await useJob(page, 'make', 'three', 1); /* 247 */
        await press(page, 'h', 2); await press(page, 't', 7); await press(page, 'o', 4);
        await tap(page, 'check'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (!s.help || s.pockets < 3 || s.verdict !== 'wrongMake') throw new Error('a second miss did not open the ticket into pockets');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'zero',
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK);
        await useJob(page, 'make', 'three', 2); /* 305 */
        await press(page, 'h', 3); await press(page, 't', 5); await press(page, 'o', 5);
        await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'zeroPressed' || s.glow !== 1) throw new Error('a key in the zero place did not bring the zero hint');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'readmiss',
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK);
        await useJob(page, 'read', 'three', 0); /* 238 */
        await press(page, 'h', 2); await press(page, 't', 5); await press(page, 'o', 8);
        await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'wrongRead' || s.tray !== 1) throw new Error('a read miss did not line the keys\' blocks up in the tray');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'worthmiss',
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK);
        await useJob(page, 'worth', 'three', 0); /* 472, the 7 */
        await press(page, 'o', 7); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'wrongWorth' || s.tray !== 1) throw new Error('a face-value key did not bring the comparison');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'setfind',
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK);
        await useJob(page, 'set', 'two', 0); /* 34: sets 34 / 36 / 44 */
        await tap(page, 'set-1'); await tap(page, 'check'); await tap(page, 'check'); await wait(200);
        const s = await state(page);
        if (s.verdict !== 'wrongSet' || !s.help || s.setv !== 3) throw new Error('two set misses did not show every set\'s value');
        return { restore: async () => back(page, k) };
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        const k = await page.evaluate(() => window.__vkK); await back(page, k);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        const s0 = await state(page); await pressNumber(page, s0.n, 3); await tap(page, 'check');
        await wait(900);
        const s = await state(page), sh = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!s.done || s.tray !== 1) throw new Error('the round did not finish with its blocks in the tray');
        if (!sh.celebrated || !sh.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
