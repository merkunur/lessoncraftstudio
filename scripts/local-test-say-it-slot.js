#!/usr/bin/env node
/* =====================================================================
   local-test-say-it-slot.js — ACTIVITY #165, The Say-It Slot ("Count Out
   the Money", 2.MD.C.8), in a real browser with real taps and drags, in
   all 11 locales (8 currency families). Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · level 1, a ✱ round: the slot with no coin → hintPick; a coin picked
       up leaves the counter alone (no running total); dropped unturned →
       hintIdle, no miss; a wrong count by real wheel taps → the coin spat
       back, the said number on a slip, the wheels back; again → miss 2 with
       the count-on steps, the wheels back after; the wheels clack at the pin
       → hintPinStop; a too-big coin → hintPin; a real DRAG into the slot
       with the right count → swallowed; biggest-first by real taps to the
       price → the success line names the child's own chain, the parade,
       Next 0.5 s;
     · smallest-first in a ✱ round → stranded, the lever bobs, the lever
       gives back the last coin; the ring tips everything out;
     · level 2: a longer exact set → hintFewer1, again → hintFewer2 + a
       ringed coin; level 3 top-up: the wheels start at Pip's coins and
       cannot go lower; topped up → okTop; compare: no coin before a pick,
       the wrong tray picked, both trays counted → two slips + hintCompare,
       then the right tray → success;
     · endless coins: one pile per coin, never used up; en coins carry no
       numeral; the keyboard (Enter on a coin, the wheels, the slot).
   Then each state reached ONCE per locale and resized through 320…1366,
   with the box and the cloth above the fold at rest.
   Usage: node scripts/local-test-say-it-slot.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/say-it-slot-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T: T0 } = H.strings('say-it-slot-activity.js', 'SayItSlotActivity', { SayItSlotCore: C });
/* as the activity's _t: da «13 kr.» closes its own sentence (never «kr..») */
const T = (loc, k, a) => T0(loc, k, a).replace(/kr\.\./g, 'kr.');
const G = 'SayItSlotActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'say-it-slot-activity.html', id: 'money.count-out.2-md-c-8', global: G, ready: '.si-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  /* wait until the activity's own repaint timers (flap, slip, shiver) have run: a click must never race a repaint */
  const settle = (page) => page.waitForFunction((g) => { const a = window[g]; return a.st.done || !a._timers.length; }, { timeout: 3000 }, G).catch(() => {});
  const _click = L.click; L.click = async (page, k, what) => { await settle(page); return _click(page, k, what); };
  const _drag = L.drag; L.drag = async (page, a, b, what) => { await settle(page); return _drag(page, a, b, what); };
  const go = async (page, level, k, mode, side) => { await page.evaluate((g, level, k, mode, side) => { const a = window[g]; a.api.settings.level = level; a.api.settings.coins = mode || 'purse'; a._pool = null; a._ensurePool(); a._start(k); if (side != null) a.st.side = side; a._render2(); }, G, level, k, mode, side); await H.wait(40); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const money = (page, v) => page.evaluate((g, v) => window[g]._money(v), G, v);
  /* turn the wheels to n by real taps: hundreds/tens first, then ones */
  const setCounter = async (page, n) => {
    for (let guard = 0; guard < 60; guard++) {
      const s = await S(page), d = n - s.counter; if (!d) return true;
      const p = Math.abs(d) >= 100 && C.digits(s) === 3 ? 2 : Math.abs(d) >= 10 ? 1 : 0;
      if (!await L.click(page, (d > 0 ? 'up-' : 'down-') + p, 'wheel')) return false;
      if ((await S(page)).counter === s.counter) return false;
    }
    return false;
  };
  const cloth = async (page, where) => (await S(page)).coins.filter((c) => c.at === (where || 'cloth'));
  const dropBy = async (page, id, n) => { await setCounter(page, n); await L.click(page, 'coin-' + id, 'coin'); await L.click(page, 'slot', 'slot'); await H.wait(120); };
  const dragTo = async (page, id) => L.drag(page, '[data-k="coin-' + id + '"]', '[data-k="slot"]', 'drag coin');

  for (const loc of LOCS) {
    const tag = '[' + loc + ']', fam = C.famOf(loc), star = C.rounds(fam, '1').findIndex((r, i) => i === 1 || i === 3);
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- level 1, round 4 (a ✱ round in every family) ---- */
    await go(page, '1', 3); let s = await S(page), r = s.round;
    await L.click(page, 'slot', 'slot');
    is(sp(await note(page)) === sp(T(loc, 'hintPick')), tag + ' the slot with no coin → hintPick');
    const bigC = (await cloth(page)).filter((c) => c.v <= r.price).sort((a, b) => b.v - a.v)[0];
    await L.click(page, 'coin-' + bigC.id, 'pick up');
    is((await S(page)).counter === 0 && await page.evaluate(() => document.querySelector('.si-box').getAttribute('data-counter')) === '0', tag + ' a coin picked up leaves the counter at 0 (no running total)');
    await L.click(page, 'slot', 'slot'); s = await S(page);
    is(sp(await note(page)) === sp(T(loc, 'hintIdle')) && s.missTotal === 0 && s.box.length === 0, tag + ' dropped with the counter unturned → hintIdle, no miss');
    const wrong = bigC.v + 1 <= r.price ? bigC.v + 1 : bigC.v - 1;
    await setCounter(page, wrong); await L.click(page, 'slot', 'slot'); s = await S(page); await H.wait(20);
    is(s.missTotal === 1 && s.counter === 0 && s.box.length === 0 && s.coins.find((c) => c.id === bigC.id).at === 'cloth', tag + ' a wrong count (' + wrong + ') → the coin flips back, the wheels roll back');
    is(await page.evaluate(() => { const e = document.querySelector('.si-saidslip'); return e ? e.getAttribute('data-said') : null; }) === String(wrong), tag + ' the said number flutters out on a slip');
    is(sp(await note(page)) === sp(T(loc, 'hintMiss1', { in: await money(page, 0) })), tag + ' miss 1 → hintMiss1'); await H.wait(350);
    await setCounter(page, wrong); await L.click(page, 'slot', 'slot'); s = await S(page);
    const steps = await Promise.all(C.steps(0, bigC.v).map((x) => money(page, x)));
    is(s.missTotal === 2 && sp(await note(page)) === sp(T(loc, 'hintMiss2', { in: await money(page, 0), steps: steps.join(', ') })), tag + ' miss 2 on the same coin → the count-on ' + steps.join(' '));
    await H.wait(400);
    is((await S(page)).counter === 0 && await page.evaluate(() => [...document.querySelectorAll('.si-digit')].every((d) => d.textContent === '0')), tag + ' after the count-on the wheels are back on 0');
    /* the pin: tens up past the price */
    for (let i = 0; i < 20 && (await S(page)).counter + 10 <= r.price; i++) await L.click(page, 'up-' + (C.digits(s) === 3 && r.price - (await S(page)).counter >= 100 ? 2 : 1), 'tens up');
    const atPin = (await S(page)).counter; await L.click(page, 'up-1', 'tens up at the pin');
    is((await S(page)).counter === atPin && sp(await note(page)) === sp(T(loc, 'hintPinStop', { price: await money(page, r.price) })), tag + ' the wheels clack at the pin (' + r.price + ') → hintPinStop');
    /* biggest-first to the price: the first coin by a real DRAG, the rest by taps */
    await setCounter(page, bigC.v); await dragTo(page, bigC.id); s = await S(page);
    is(s.box.length === 1 && s.counter === bigC.v && await page.evaluate(() => document.querySelector('[data-qa="glass"]').getAttribute('data-n')) === '1', tag + ' a real drag into the slot with the right count → swallowed into the glass');
    /* a too-big coin */
    const tooBig = (await cloth(page)).find((c) => s.counter + c.v > r.price);
    if (tooBig) { await L.click(page, 'coin-' + tooBig.id, 'too big'); await L.click(page, 'slot', 'slot'); is(sp(await note(page)) === sp(T(loc, 'hintPin', { price: await money(page, r.price) })) && (await S(page)).missTotal === 2, tag + ' a coin past the price → hintPin, not a miss'); }
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    for (let g = 0; g < 12 && !(await S(page)).done; g++) { s = await S(page); const gap = r.price - s.counter; const c = (await cloth(page)).filter((x) => x.v <= gap).sort((a, b) => b.v - a.v)[0]; if (!c) break; await dropBy(page, c.id, s.counter + c.v); }
    await H.wait(900); s = await S(page);
    const chain = (await Promise.all(s.said.map((x) => money(page, x)))).join(', ');
    is(s.done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okCount', { chain, price: await money(page, r.price) }))) >= 0, tag + ' biggest-first → the success line with the child\'s chain ' + chain);
    is(await page.evaluate(() => { const p = document.querySelector('.si-parade'); return p ? p.getAttribute('data-chain') : ''; }) === s.said.join(','), tag + ' the parade replays the count');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- smallest-first in the same ✱ round: stranded, the lever, the ring ---- */
    await go(page, '1', 3); r = (await S(page)).round; let strandedSeen = false;
    for (let g = 0; g < 12 && !strandedSeen; g++) { s = await S(page); const gap = r.price - s.counter; const c = (await cloth(page)).filter((x) => x.v <= gap).sort((a, b) => a.v - b.v)[0]; if (!c) break; await dropBy(page, c.id, s.counter + c.v); strandedSeen = (await S(page)).stranded > 0; }
    s = await S(page);
    is(strandedSeen && sp(await note(page)) === sp(T(loc, 'hintStranded', { gap: await money(page, r.price - s.counter) })) && await page.evaluate(() => !!document.querySelector('.si-lever.is-bob')), tag + ' smallest-first → stranded, the lever bobs');
    const lastId = s.box[s.box.length - 1], before = s.counter, lastV = s.coins.find((c) => c.id === lastId).v;
    await L.click(page, 'lever', 'lever'); s = await S(page);
    is(!s.box.includes(lastId) && s.counter === before - lastV && s.coins.find((c) => c.id === lastId).at === 'cloth', tag + ' the lever gives back the last coin in');
    await L.click(page, 'tip', 'ring'); s = await S(page);
    is(s.box.length === 0 && s.counter === 0, tag + ' the ring tips every coin out');
    /* ---- level 2: a longer exact set ---- */
    await go(page, '2', 0); r = (await S(page)).round;
    const ways = C.ways(r.price, r.purse).sort((a, b) => b.length - a.length), longer = ways[0];
    for (const v of longer) { s = await S(page); const c = (await cloth(page)).find((x) => x.v === v); await dropBy(page, c.id, s.counter + v); }
    is(!(await S(page)).done && sp(await note(page)) === sp(T(loc, 'hintFewer1', { price: await money(page, r.price) })), tag + ' fewest: ' + longer.join('+') + ' → hintFewer1');
    await L.click(page, 'lever', 'lever'); s = await S(page);
    { const c = (await cloth(page)).find((x) => x.v === longer[longer.length - 1]); await dropBy(page, c.id, s.counter + c.v); }
    is(sp(await note(page)) === sp(T(loc, 'hintFewer2')) && await page.evaluate(() => !!document.querySelector('.si-coin.is-ring')), tag + ' fewest again → hintFewer2 and a ringed coin');
    /* ---- level 3 top-up ---- */
    await go(page, '3', 0); s = await S(page); r = s.round; const pre = C.sum(r.pre);
    is(s.counter === pre && await page.evaluate(() => document.querySelector('[data-qa="glass"]').getAttribute('data-n')) === String(r.pre.length), tag + ' top-up: Pip\'s ' + pre + ' already in, the wheels on it');
    await L.click(page, 'down-0', 'down');
    is((await S(page)).counter === pre && sp(await note(page)) === sp(T(loc, 'hintFloor', { in: await money(page, pre) })), tag + ' the wheels cannot go below the box → hintFloor');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    for (let g = 0; g < 10 && !(await S(page)).done; g++) { s = await S(page); const gap = r.price - s.counter; const c = (await cloth(page)).filter((x) => x.v <= gap).sort((a, b) => b.v - a.v)[0]; if (!c) break; await dropBy(page, c.id, s.counter + c.v); }
    await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okTop', { in: await money(page, pre), added: await money(page, r.price - pre), price: await money(page, r.price) }))) >= 0, tag + ' topped up → okTop');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- level 3 compare: R7 (fewer coins win), the wrong pick first ---- */
    await go(page, '3', 6, 'purse', 0); r = (await S(page)).round;
    const right = C.answer(r), wrongT = right === 'a' ? 'b' : 'a';
    const firstA = (await cloth(page, 'tray-a'))[0];
    await L.click(page, 'coin-' + firstA.id, 'coin before a pick');
    is(sp(await note(page)) === sp(T(loc, 'hintPickFirst')), tag + ' compare: a coin before a pick → hintPickFirst');
    await L.click(page, 'tray-' + wrongT, 'pick the tray with more coins');
    is((await S(page)).pick === wrongT && sp(await L.prompt(page)) === sp(T(loc, 'pCompare2')), tag + ' compare: picked, the prompt says to count each tray');
    for (const t of ['a', 'b']) for (const c of await cloth(page, 'tray-' + t)) { s = await S(page); await dropBy(page, c.id, s.counter + c.v); }
    s = await S(page);
    const ca = await Promise.all([Math.max(C.sum(r.a), C.sum(r.b)), Math.min(C.sum(r.a), C.sum(r.b))].map((x) => money(page, x)));
    is(s.slips.a === C.sum(r.a) && s.slips.b === C.sum(r.b) && await page.evaluate(() => document.querySelectorAll('.si-slip').length) === 2, tag + ' compare: both trays counted, two slips printed');
    is(!s.done && s.compareMiss && sp(await note(page)) === sp(T(loc, 'hintCompare', { big: ca[0], small: ca[1] })) && await page.evaluate(() => !!document.querySelector('.si-tray.is-glow')), tag + ' compare: the wrong pick → hintCompare, the right tray glows');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'tray-' + right, 'the right tray'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okCompare', { big: ca[0], small: ca[1] }))) >= 0, tag + ' compare: the tray with more money → success');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- endless coins, en faces, keyboard ---- */
    await go(page, '1', 0, 'endless'); s = await S(page);
    is((await cloth(page, 'supply')).length === C.kinds(fam).length, tag + ' endless: one pile per coin');
    { const c = (await cloth(page, 'supply')).filter((x) => x.v < s.round.price).sort((a, b) => b.v - a.v)[0]; await dropBy(page, c.id, c.v); s = await S(page); is(s.box.length === 1 && (await cloth(page, 'supply')).length === C.kinds(fam).length, tag + ' endless: a pile is never used up'); }
    is(await page.evaluate(() => document.querySelectorAll('.si-cloth .si-coinsvg text').length) === C.kinds(fam).length, tag + ' coin faces: the worth numerals (the US coins too)');
    await go(page, '1', 0); s = await S(page);
    { const c = (await cloth(page)).filter((x) => x.v < s.round.price).sort((a, b) => b.v - a.v)[0];
      await page.focus('[data-k="coin-' + c.id + '"]'); await page.keyboard.press('Enter');
      for (let i = 0; i < Math.floor(c.v / 10); i++) { await page.focus('[data-k="up-1"]'); await page.keyboard.press('Enter'); }
      for (let i = 0; i < c.v % 10; i++) { await page.focus('[data-k="up-0"]'); await page.keyboard.press('Enter'); }
      await page.focus('[data-k="slot"]'); await page.keyboard.press('Enter');
      is((await S(page)).box.length === 1, tag + ' the keyboard: Enter on a coin, the wheels, the slot'); }
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.SayItSlotCore), G, src);
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    const DROP = 'function d(v){var c=C.where(a.st,"cloth").find(function(x){return x.v===v;});a.st.counter=C.inBox(a.st)+v;a._drop(c.id);}';
    const fold = async (pg, w, name) => { const m = await pg.evaluate(() => { const els = [...document.querySelectorAll('.si-box, .si-cloth .si-coin')]; return { low: Math.max(...els.map((e) => e.getBoundingClientRect().bottom + window.scrollY)), vh: window.innerHeight }; }); is(m.low <= m.vh, loc + ' ' + name + ' @' + w + ': the box and every coin above the fold (' + Math.round(m.low) + ' / ' + m.vh + ')'); };
    const sweep = async (name, reach, foldCheck) => {
      const { page: pg, errs: e2 } = await L.open(WIDTHS[WIDTHS.length - 1], loc);
      await ready(pg); await reach(pg); await H.wait(60);
      for (const w of WIDTHS) { await pg.setViewport({ width: w, height: H.VH(w) }); await H.wait(120); await pg.evaluate(() => window.scrollTo(0, 0)); await L.measure(pg, w, loc + ' ' + name, {}); if (foldCheck) await fold(pg, w, name); }
      is(e2.length === 0, loc + ' ' + name + ': no console errors ' + e2.slice(0, 3).join(' | '));
      await pg.close();
    };
    for (const k of [0, 5, 6]) await sweep('L1 R' + (k + 1) + ' rest', async (pg) => { await go(pg, '1', k); }, true);
    await sweep('L1 miss', async (pg) => { await go(pg, '1', 7); await ev(pg, 'var c=C.where(a.st,"cloth")[0];a.st.counter=c.v+1>a.st.round.price?c.v-1:c.v+1;a._drop(c.id);'); });
    await sweep('L1 done', async (pg) => { await go(pg, '1', 6); await ev(pg, DROP + 'var r=a.st.round;C.desc(r.purse).forEach(function(v){if(!a.st.done&&C.inBox(a.st)+v<=r.price&&C.where(a.st,"cloth").some(function(x){return x.v===v;}))d(v);});'); });
    await sweep('L2 rest', async (pg) => { await go(pg, '2', 7); }, true);
    await sweep('L3 top rest', async (pg) => { await go(pg, '3', 4); }, true);
    await sweep('L3 compare miss', async (pg) => { await go(pg, '3', 6, 'purse', 1); await ev(pg, 'var r=a.st.round,w=C.answer(r)==="a"?"b":"a";C.pickTray(a.st,w);["a","b"].forEach(function(t){C.where(a.st,"tray-"+t).forEach(function(c){a.st.counter=C.inBox(a.st)+c.v;a._drop(c.id);});});'); }, true);
    await sweep('endless rest', async (pg) => { await go(pg, '1', 2, 'endless'); }, true);
  }
  await L.close();
  process.exit(L.C.report('local-test-say-it-slot'));
})().catch((e) => { console.error(e); process.exit(1); });
