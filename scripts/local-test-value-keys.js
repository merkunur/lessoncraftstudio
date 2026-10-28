#!/usr/bin/env node
/* =====================================================================
   local-test-value-keys.js — ACTIVITY #150, The Value-Key Adding Machine
   ("Expanded Form", 2.NBT.A.3), in a real browser with real pointer taps
   and real drags, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale — wide (1024):
     · make 247: Check with no key → a note, no miss; a column holds one
       key; 274 → the drums read 274, the tens and ones glow, the tape
       prints, hintMakeLook; miss 2 → three pockets, "4 tens = 40",
       hintMakeWorthT; the right keys → the tape 200 / + 40 / + 7 / = 247,
       the blocks in the tray, "247 = 200 + 40 + 7" 0.5 s later with Next;
     · make 305: a 50 → drums 355, the ticket's 0 glows, hintZero; lift
       it → "305 = 300 + 5" (the crank pulled with a real drag);
     · make 500: one key → "5 hundreds = 500";
     · read 238: 258 → the tray crosses the two extra rods, hintReadLook;
       miss 2 → the tens blocks are numbered, hintReadCount;
     · worth 472: two keys → a note; the face-value 7 → the tray shows the
       bright digit's blocks with "?" beside the key's 7, hintWorthLook;
       miss 2 → the tens column glows, hintWorthColT; 70 → the worth line;
     · which set 34: nothing fed → a note; set 2 dragged onto the machine
       → its keys press themselves, 36, hintSetLookO; miss 2 → every set
       shows its value; set 1 → the set line.
   Narrow (360): tabs + pad; 305 pressed through the tabs, the crank
   dragged sideways, the tape one line; which set shows tabs only.
   Then each state reached ONCE per locale by real taps and resized
   through 320…1366 (no sideways scroll, nothing outside the card,
   controls ≥ 44 px, Check above the fold at rest, the hint near the work).
   Usage: node scripts/local-test-value-keys.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/value-keys-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('value-keys-activity.js', 'ValueKeysActivity', { ValueKeysCore: C });
const sp = H.sp, wait = H.wait;
const ID = 'place-value.expanded-form.2-nbt-a-3';
const word = (loc, p, n) => n + ' ' + T(loc, (p === 'h' ? 'wH' : p === 't' ? 'wT' : 'wO') + (n === 0 ? '0' : n === 1 ? '1' : 'n'));

(async () => {
  const L = await H.local({ html: 'value-keys-activity.html', id: ID, global: 'ValueKeysActivity', ready: '.vk-wrap' });
  const { is } = L.C;
  const force = (page, job, numbers, k) => page.evaluate((job, numbers, k) => {
    const a = window.ValueKeysActivity; a.api.settings.job = job; a.api.settings.numbers = numbers; a._pool = null; a._ensurePool(); a._start(k); a._render2(); window.scrollTo(0, 0);
    return a.st.k === k && a.st.job === job;
  }, job, numbers, k).then((ok) => { if (!ok) throw new Error('force ' + job + k); });
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.ValueKeysActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.vk-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const drums = (page) => page.evaluate(() => [...document.querySelectorAll('.vk-drum')].map((d) => d.textContent).join(''));
  const tape = (page) => page.evaluate(() => [...document.querySelectorAll('.vk-tl')].map((d) => d.textContent));
  const press = async (page, p, d, what) => { if (await page.$('[data-k="tab-' + p + '"]:not([disabled])')) await L.click(page, 'tab-' + p, what); return L.click(page, 'key-' + p + d, what); };
  const keysDown = (page) => page.evaluate(() => [...document.querySelectorAll('.vk-key.is-down')].map((b) => b.getAttribute('data-k')).sort().join());

  async function wide(loc) {
    const { page, errs } = await L.open(1024, loc);
    /* ---- make 247 ---- */
    await force(page, 'make', 'three', 1);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskMake', { n: 247 })), loc + ' make: the task line names 247');
    await L.click(page, 'check', loc + ' empty');
    let s = await st(page), n = await note(page);
    is(s.misses === 0 && sp(n.text) === sp(T(loc, 'hintNoKey')) && !n.hint, loc + ' make: no key is a note, not a miss');
    await press(page, 'h', 3, loc); await press(page, 'h', 2, loc);
    is(await keysDown(page) === 'key-h2', loc + ' make: a column holds one key (200 replaced 300)');
    await press(page, 't', 7, loc); await press(page, 'o', 4, loc);
    await L.click(page, 'check', loc + ' miss 1');
    s = await st(page); n = await note(page);
    is(s.misses === 1 && !s.help && await drums(page) === '274', loc + ' make: 274 → the drums read 274');
    is(n.hint && sp(n.text) === sp(T(loc, 'hintMakeLook', { sum: 274 })), loc + ' make: hintMakeLook');
    is((await page.$$('.vk-tdig.is-glow')).length === 2, loc + ' make: the ticket\'s tens and ones glow');
    is((await tape(page)).join('|') === '200|+ 70|+ 4|= 274', loc + ' make: the tape prints 200 / + 70 / + 4 / = 274');
    await L.click(page, 'check', loc + ' miss 2');
    s = await st(page); n = await note(page);
    is(s.help && (await page.$$('.vk-pocket')).length === 3 && sp(await page.$eval('.vk-plabel', (e) => e.textContent)) === sp(T(loc, 'okOne', { word: word(loc, 't', 4), n: 40 })), loc + ' make: miss 2 opens the ticket, "4 tens = 40"');
    is(sp(n.text) === sp(T(loc, 'hintMakeWorthT', { d: 4, value: 40 })), loc + ' make: hintMakeWorthT');
    await press(page, 't', 4, loc); await press(page, 'o', 7, loc);
    is(!(await note(page)).text, loc + ' make: a new press takes the hint away');
    await page.evaluate(() => { window.ValueKeysActivity.OK_MS = 500; });
    await L.click(page, 'check', loc + ' right');
    s = await st(page);
    is(s.done && (await tape(page)).join('|') === '200|+ 40|+ 7|= 247' && !!(await page.$('.vk-tray.is-full')), loc + ' make: 247 → the tape and the blocks in the tray');
    const nb = await L.nextShown(page); await wait(900);
    is(!nb && await L.nextShown(page), loc + ' make: Next 0.5 s after the result');
    is(sp(await L.bubble(page)) === sp(T(loc, 'okExp', { n: 247, expanded: '200 + 40 + 7' })), loc + ' make: "247 = 200 + 40 + 7"');
    await page.evaluate(() => { window.ValueKeysActivity.OK_MS = 600000; });
    /* ---- make 305: the zero place, the crank dragged ---- */
    await force(page, 'make', 'three', 2);
    await press(page, 'h', 3, loc); await press(page, 't', 5, loc); await press(page, 'o', 5, loc);
    await L.drag(page, '[data-k="crank"]', { dy: 120 }, loc + ' crank drag');
    s = await st(page); n = await note(page);
    is(s.verdict && s.verdict.kind === 'zeroPressed' && await drums(page) === '355', loc + ' 305: the dragged crank adds 355');
    is(sp(n.text) === sp(T(loc, 'hintZero', { zero: word(loc, 't', 0) })) && (await page.$$('.vk-tdig.is-glow')).length === 1, loc + ' 305: hintZero, the ticket\'s 0 glows');
    await press(page, 't', 5, loc);
    is(await keysDown(page) === 'key-h3,key-o5', loc + ' 305: pressing 50 again lifts it');
    await page.evaluate(() => { window.ValueKeysActivity.OK_MS = 300; });
    await L.click(page, 'crank', loc + ' crank tap'); await wait(700);
    is((await st(page)).done && sp(await L.bubble(page)) === sp(T(loc, 'okExp', { n: 305, expanded: '300 + 5' })), loc + ' 305: a tapped crank, "305 = 300 + 5"');
    /* ---- make 500: one part ---- */
    await force(page, 'make', 'three', 4);
    await press(page, 'h', 5, loc); await L.click(page, 'check', loc + ' 500'); await wait(700);
    is(sp(await L.bubble(page)) === sp(T(loc, 'okOne', { word: word(loc, 'h', 5), n: 500 })), loc + ' 500: "5 hundreds = 500"');
    await page.evaluate(() => { window.ValueKeysActivity.OK_MS = 600000; });
    /* ---- read 238 ---- */
    await force(page, 'read', 'three', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'qRead')), loc + ' read: the question');
    await press(page, 'h', 2, loc); await press(page, 't', 5, loc); await press(page, 'o', 8, loc);
    await L.click(page, 'check', loc + ' read 1');
    n = await note(page);
    is(sp(n.text) === sp(T(loc, 'hintReadLook', { sum: 258 })) && (await page.$$('.vk-tray .vk-rod.is-extra')).length === 2, loc + ' read: 258 → the tray crosses the two extra rods');
    await L.click(page, 'check', loc + ' read 2');
    is(sp((await note(page)).text) === sp(T(loc, 'hintReadCount')) && (await page.$$('.vk-shown .vk-numdot')).length === 3, loc + ' read: miss 2 numbers the three rods');
    await press(page, 't', 3, loc); await L.click(page, 'check', loc + ' read 3');
    is((await st(page)).done, loc + ' read: 238 solved');
    /* ---- worth 472 ---- */
    await force(page, 'worth', 'three', 0);
    await press(page, 't', 7, loc); await press(page, 'o', 7, loc); await L.click(page, 'check', loc + ' two keys');
    s = await st(page);
    is(s.misses === 0 && sp((await note(page)).text) === sp(T(loc, 'hintOneKey')), loc + ' worth: two keys is a note');
    await press(page, 't', 7, loc); await L.click(page, 'check', loc + ' face');
    n = await note(page);
    is(sp(n.text) === sp(T(loc, 'hintWorthLook', { v: 7 })), loc + ' worth: the face-value 7 → hintWorthLook');
    is(await page.$$eval('.vk-tray b', (b) => b.map((x) => x.textContent).join()) === '?,7', loc + ' worth: the tray hides the answer as "?" beside the key\'s 7');
    await L.click(page, 'check', loc + ' worth 2');
    is(sp((await note(page)).text) === sp(T(loc, 'hintWorthColT')) && !!(await page.$('.vk-col-t.is-glow')), loc + ' worth: miss 2 lights the tens column');
    await press(page, 'o', 7, loc); await press(page, 't', 7, loc); await L.click(page, 'check', loc + ' worth right');
    is((await st(page)).done && sp(await L.prompt(page)).length > 0, loc + ' worth: 70 solves it');
    /* ---- which set 34 ---- */
    await force(page, 'set', 'two', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'qSet', { n: 34 })), loc + ' set: the question');
    await L.click(page, 'check', loc + ' set empty');
    is(sp((await note(page)).text) === sp(T(loc, 'hintPickSet')) && (await st(page)).misses === 0, loc + ' set: nothing fed is a note');
    is(await page.$$eval('.vk-key', (b) => b.every((x) => x.disabled)), loc + ' set: the child presses no keys');
    await L.drag(page, '[data-k="set-1"]', '.vk-bank', loc + ' set drag');
    s = await st(page);
    is(s.fed === 1 && await keysDown(page) === 'key-o6,key-t3', loc + ' set: the dragged set presses its own keys (36)');
    await L.click(page, 'check', loc + ' set 1');
    is(sp((await note(page)).text) === sp(T(loc, 'hintSetLookO', { sum: 36 })), loc + ' set: hintSetLookO');
    await L.click(page, 'check', loc + ' set 2');
    is(await page.$$eval('.vk-setv', (e) => e.map((x) => x.textContent).join()) === '34,36,44' && sp((await note(page)).text) === sp(T(loc, 'hintSetFind', { n: 34 })), loc + ' set: miss 2 shows every set\'s value');
    await L.click(page, 'set-0', loc + ' set right'); await L.click(page, 'check', loc + ' set ok');
    is((await st(page)).done && !!(await page.$('.vk-set.is-right')), loc + ' set: 34 solved');
    L.C.is(errs.length === 0, loc + ' wide: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  async function narrow(loc) {
    const { page, errs } = await L.open(360, loc);
    await force(page, 'make', 'three', 2);
    is((await page.$$('.vk-tab')).length === 3 && (await page.$$('.vk-pad .vk-key')).length === 9, loc + ' narrow: three tabs and a 3 × 3 pad');
    await press(page, 'h', 3, loc); await press(page, 'o', 5, loc);
    is(await page.$eval('[data-k="tab-h"]', (e) => e.textContent.trim()) === '300', loc + ' narrow: the hundreds tab shows 300');
    await L.drag(page, '[data-k="crank"]', { dx: 90 }, loc + ' narrow crank');
    is((await st(page)).done && sp((await tape(page)).join()) === '300 + 5 = 305', loc + ' narrow: the sideways crank, one tape line');
    await force(page, 'set', 'two', 3);
    is((await page.$$('.vk-pad')).length === 0 && await page.$$eval('.vk-tab', (b) => b.every((x) => x.disabled)), loc + ' narrow set: tabs only, the machine presses');
    L.C.is(errs.length === 0, loc + ' narrow: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const STATES = [
    ['make-rest', async (page) => { await force(page, 'make', 'three', 6); }, { rest: true }],
    ['make-help', async (page) => { await force(page, 'make', 'three', 1); await press(page, 'h', 2); await press(page, 't', 7); await press(page, 'o', 4); await L.click(page, 'check', 'h1'); await L.click(page, 'check', 'h2'); }, { miss: true }],
    ['zero', async (page) => { await force(page, 'make', 'three', 2); await press(page, 'h', 3); await press(page, 't', 5); await press(page, 'o', 5); await L.click(page, 'check', 'z'); }, { miss: true }],
    ['read-miss', async (page) => { await force(page, 'read', 'three', 7); await press(page, 'h', 9); await press(page, 't', 4); await press(page, 'o', 5); await L.click(page, 'check', 'r1'); await L.click(page, 'check', 'r2'); }, { miss: true }],
    ['worth-miss', async (page) => { await force(page, 'worth', 'three', 1); await press(page, 'o', 7); await L.click(page, 'check', 'w1'); }, { miss: true }],
    ['set-help', async (page) => { await force(page, 'set', 'two', 3); await L.click(page, 'set-0', 's'); await L.click(page, 'check', 's1'); await L.click(page, 'check', 's2'); }, { miss: true }],
    ['two-rest', async (page) => { await force(page, 'make', 'two', 0); }, { rest: true }],
    ['solved', async (page) => { await force(page, 'make', 'three', 8); await press(page, 'h', 9); await press(page, 't', 7); await press(page, 'o', 4); await L.click(page, 'check', 'win'); }, {}]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await wide(loc); await narrow(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-value-keys'));
})().catch((e) => { console.error(e); process.exit(1); });
