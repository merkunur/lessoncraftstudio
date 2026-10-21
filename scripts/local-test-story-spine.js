#!/usr/bin/env node
/* =====================================================================
   local-test-story-spine.js — the interaction gate for ACTIVITY #65, the
   book that cracks and mends (Dot's Story Spine, RL.K.3, 11 locales).
   Real pointer at 704, every story of every task, every locale:
     Name the parts — the stud with no tabs asks (no miss); a tab DRAGGED
     and the others tapped onto the wrong pages; the book reads and stops
     at the first wrong tab with that tab's hint, the pages back on the
     table with their tabs (miss 1); miss 2 shows the part's faint mark
     on the real page; the right tabs → the pennant, the crack sealed by
     the bandage, the ribbon (a starter over each page's own sentence),
     the shell celebrates, the book stands on the shelf.
     Find the trouble — empty asks; the calm page lies flat; the different
     trouble cracks and the bandage does not stay; miss 2 the story's own
     hint, the right candidate glows and the fix page's thing is ringed;
     the right page reads through.
     Find the fix — the something-else page, the nothing-changed page
     (miss 2 the story's own hint, the glow), the right page.
     Match the sentences — empty asks; two wrong strips, their key words
     underlined (miss 1); miss 2 the page flashes; all right wins.
   Once per locale: Words hidden hides the captions; the keyboard (a page,
   then a number); the shelf opens a finished book. The width sweep (all
   locales at 320 / 704 / 1366, en at 320–1366), each task at rest,
   picked, miss 2 and won: no sideways scroll, every control ≥ 44 inside
   the card, text ≥ 14, every picture ≥ 96 (≥ 64 on a phone), the stud
   above the fold.
   Usage: node scripts/local-test-story-spine.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'story-spine.role.rl-k-3';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '065-story-book', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'story-spine-book-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, StorySpineBookCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'story-spine-activity.js'), 'utf8') + '\n;this.__A = StorySpineActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/story-spine-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.StorySpineActivity && window.StorySpineActivity.st && document.querySelector('.ssb-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.StorySpineActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.StorySpineActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, table: s.table, slots: s.slots, tabs: s.tabs, tray: s.tray, caps: s.caps, sel: s.sel, misses: s.misses, help: s.help, done: s.done, last: s.last, open: s.open })); });
  const note = (page) => page.evaluate(() => document.querySelector('.ssb-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  const card = (id) => `.ssb-table [data-page="${id}"]`, trayTab = (role) => `.ssb-tray [data-tab="${role}"]`, slot = (i) => `[data-slot="${i}"]`, cap = (i) => `[data-cap="${i}"]`;
  async function force(page, task, story, words) {
    await page.evaluate((task, story, words) => { const a = window.StorySpineActivity; a.api.settings.task = task; a.api.settings.words = words || 'shown'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.story === story); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, task, story, words);
    await wait(60);
  }
  async function read(page) { await tap(page, '[data-k="check"]'); await page.waitForFunction(() => !window.StorySpineActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, loc, r) {
    await page.evaluate(() => { window.StorySpineActivity.OK_MS = 0; });
    await read(page); await page.waitForFunction(() => !window.StorySpineActivity._busy, { timeout: 15000 }).catch(() => {});
    const s = await state(page);
    const m = await page.evaluate(() => ({ rib: [...document.querySelectorAll('.ssb-rtab')].map(t => [t.querySelector('.ssb-starter').textContent, t.querySelector('.ssb-rcap').textContent]), pen: !!document.querySelector('[data-slot="0"] .ssb-pennant:not(.is-tip)'), sealed: !!document.querySelector('[data-slot="1"] .ssb-crack.is-sealed') && !!document.querySelector('[data-slot="1"] .ssb-band'), teal: !!document.querySelector('[data-slot="1"] .is-ring-teal'), shelf: [...document.querySelectorAll('.ssb-spine')].map(x => x.getAttribute('data-spine')) }));
    const lab = C.retell(r).map(x => [x.starter, x.caption]);
    is(s.done && s.slots.join() === r.pages.map(p => p.id).join() && JSON.stringify(m.rib) === JSON.stringify(lab), `${id}: reads through — the book binds 1 2 3, the ribbon reads ${lab.map(x => x[0]).join(' / ')}`);
    is(m.pen && m.sealed && m.teal, `${id}: the pennant stands, the bandage seals the crack, the thing's ring is teal`);
    is(m.shelf.includes(r.story), `${id}: the book stands on the shelf`);
    is(await celebrated(page), `${id}: the shell celebrates`);
    const b = await bubble(page); is(b && b.includes(T(loc, 'okWin')), `${id}: the success text («${b}»)`);
    await page.evaluate(() => { window.StorySpineActivity.OK_MS = 60000; });
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.StorySpineActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'task:name,trouble,fix,match | words:shown,hidden', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    /* Name the parts */
    for (const r of C.rounds(loc, 'name')) {
      const id = `${loc} name ${r.story}`, ids = r.pages.map(p => p.id);
      await force(page, 'name', r.story);
      let s = await state(page);
      is(s.table.slice().sort().join() === ids.slice().sort().join() && s.table.join() !== ids.join() && s.tray.length === 3 && await page.evaluate(() => document.querySelectorAll('.ssb-tray .ssb-tab').length === 3 && !document.querySelector('.ssb-book .ssb-card')), `${id}: three loose pages (not in story order), three tabs, the book empty`);
      await read(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintTabs'), `${id}: the stud with no tabs asks, no miss`);
      /* START right, TROUBLE on the fix page, FIX on the trouble page */
      await drag(page, trayTab('start'), card(ids[0])); s = await state(page); is(s.tabs[ids[0]] === 'start', `${id}: a tab dragged onto a page`);
      await tap(page, trayTab('trouble')); await tap(page, card(ids[2]));
      await tap(page, trayTab('fix')); await tap(page, card(ids[1]));
      await read(page); s = await state(page);
      is(s.misses === 1 && s.last.role === 'trouble' && (await note(page)) === T(loc, 'hintTrouble') && await page.evaluate(() => !document.querySelector('.ssb-book .ssb-card') && document.querySelectorAll('.ssb-table .ssb-loose.has-tab').length === 3), `${id}: the reading stops at the trouble tab, the pages back on the table with their tabs (miss 1)`);
      await read(page); s = await state(page);
      is(s.misses === 2 && await page.evaluate((p) => !!document.querySelector(`.ssb-table [data-page="${p}"] .ssb-ghostmark.ssb-mark-trouble`), ids[1]), `${id}: miss 2 — the real trouble page shows the faint crack mark`);
      await tap(page, `${card(ids[2])} .ssb-tab`); await tap(page, card(ids[1]));
      s = await state(page); is(s.tabs[ids[1]] === 'trouble' && s.tabs[ids[2]] === 'fix', `${id}: the tabs swap by tap`);
      await win(page, id, loc, r);
    }
    /* Find the trouble */
    for (const r of C.rounds(loc, 'trouble')) {
      const id = `${loc} trouble ${r.story}`, [right, calm, other] = r.cands.map(p => p.id);
      await force(page, 'trouble', r.story);
      let s = await state(page);
      is(s.slots[0] === r.pages[0].id && s.slots[1] === null && s.slots[2] === r.pages[2].id && s.table.slice().sort().join() === [right, calm, other].sort().join(), `${id}: start and fix bound, the middle empty, three candidates`);
      await read(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${id}: empty asks, no miss`);
      await drag(page, card(calm), slot(1)); s = await state(page); is(s.slots[1] === calm, `${id}: a page dragged into the middle`);
      await read(page); s = await state(page);
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintCalm') && await page.evaluate(() => !!document.querySelector('[data-slot="1"] .ssb-flat') && !document.querySelector('[data-slot="1"] .ssb-crack')), `${id}: the calm page lies flat, no crack (miss 1)`);
      await tap(page, card(other)); await tap(page, slot(1)); await read(page); s = await state(page);
      is(s.misses === 2 && (await note(page)) === C.DATA.TEXT[loc].tt[r.story] && await page.evaluate((g) => !!document.querySelector('[data-slot="1"] .ssb-crack') && !!document.querySelector(`.ssb-table [data-page="${g}"] .is-glow`) && !!document.querySelector('[data-slot="2"] .is-ring-teal'), right), `${id}: the different trouble cracks but stays open; miss 2 — the story's hint, the right page glows, the fix page's thing ringed`);
      await tap(page, card(right)); await tap(page, slot(1));
      await win(page, id, loc, r);
    }
    /* Find the fix */
    for (const r of C.rounds(loc, 'fix')) {
      const id = `${loc} fix ${r.story}`, [right, other, same] = r.cands.map(p => p.id);
      await force(page, 'fix', r.story);
      await tap(page, card(other)); await tap(page, slot(2)); await read(page); let s = await state(page);
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintElse') && await page.evaluate(() => !!document.querySelector('[data-slot="1"] .ssb-crack:not(.is-sealed)')), `${id}: the something-else page — the crack stays open, its hint (miss 1)`);
      await tap(page, card(same)); await tap(page, slot(2)); await read(page); s = await state(page);
      is(s.misses === 2 && (await note(page)) === C.DATA.TEXT[loc].tb[r.story] && await page.evaluate((g) => !!document.querySelector('[data-slot="2"] .ssb-idle') && !!document.querySelector(`.ssb-table [data-page="${g}"] .is-glow`), right), `${id}: the nothing-changed page sends nothing; miss 2 — the story's hint, the right page glows`);
      await tap(page, card(right)); await tap(page, slot(2));
      await win(page, id, loc, r);
    }
    /* Match the sentences */
    for (const r of C.rounds(loc, 'match')) {
      const id = `${loc} match ${r.story}`, ids = r.pages.map(p => p.id);
      await force(page, 'match', r.story);
      let s = await state(page);
      is(s.table.every((x, i) => x !== ids[i]) && await page.evaluate(() => document.querySelectorAll('.ssb-strip').length === 3 && document.querySelectorAll('.ssb-capslot').length === 3), `${id}: three strips (none under its own picture), three sentence places`);
      await read(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintStrips'), `${id}: empty asks, no miss`);
      await drag(page, card(ids[1]), cap(0)); s = await state(page); is(s.caps[0] === ids[1], `${id}: a strip dragged under page 1`);
      await tap(page, card(ids[0])); await tap(page, cap(1)); await tap(page, card(ids[2])); await tap(page, cap(2));
      await read(page); s = await state(page);
      const kws = await page.evaluate(() => [...document.querySelectorAll('.ssb-capslot .ssb-kw')].map(k => k.textContent));
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintRead') && kws.length === 2 && kws.includes(C.keyWord(loc, r.story, 1)) && kws.includes(C.keyWord(loc, r.story, 0)), `${id}: two wrong strips, their key words underlined (${kws})`);
      await read(page); is(await page.evaluate(() => !!document.querySelector('[data-slot="1"].is-flash')), `${id}: miss 2 — the page the first wrong strip belongs to flashes`);
      await tap(page, cap(0)); await tap(page, cap(1));
      await win(page, id, loc, r);
    }
    /* words hidden, the keyboard, the shelf */
    {
      const r = C.rounds(loc, 'trouble')[3]; await force(page, 'trouble', r.story, 'hidden');
      is(await page.evaluate(() => [...document.querySelectorAll('.ssb-cap')].every(c => getComputedStyle(c).display === 'none') && document.querySelectorAll('.ssb-table .ssb-card').length === 3), `${loc}: Words hidden — no captions, the pages stay`);
      await force(page, 'trouble', r.story, 'shown');
      const s0 = await state(page); await page.focus(card(s0.table[0])); await page.keyboard.press('Enter'); await page.keyboard.press('2'); await wait(30);
      is((await state(page)).slots[1] === s0.table[0], `${loc}: keyboard — a page, then 2, goes into the middle`);
      const shelved = await page.evaluate(() => window.StorySpineActivity._shelf.length);
      await page.evaluate(() => { window.StorySpineActivity.FAST = false; });
      await tap(page, '[data-k="shelf"]');
      is(shelved > 0 && await page.evaluate(() => document.querySelector('.ssb-book').classList.contains('is-preview') && !!document.querySelector('.ssb-spine.is-open')), `${loc}: the shelf opens a finished book (${shelved} on the shelf)`);
      await wait(2400); is(await page.evaluate(() => !document.querySelector('.ssb-book').classList.contains('is-preview')), `${loc}: the finished book closes again`);
      await page.evaluate(() => { window.StorySpineActivity.FAST = true; });
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const task of C.TASKS) {
      const len = (r) => C.allPages(r).reduce((x, p) => x + p.caption.length, 0);
      const r = C.rounds(loc, task).slice().sort((a, b) => len(b) - len(a))[0];
      await force(page, task, r.story);
      for (const phase of ['rest', 'picked', 'miss2', 'won']) {
        await page.evaluate((phase) => {
          const A = window.StorySpineActivity, K = window.StorySpineBookCore, st0 = A.st, r = st0.r, ids = r.pages.map(p => p.id);
          const st = K.newState(r, { table: st0.table.slice(), tabs: st0.tray.slice() });
          if (phase === 'picked') { if (st.task === 'name') K.pickTab(st, st.tray[0]); else K.pick(st, st.table[0]) || K.pickStrip(st, st.table[0]); }
          if (phase === 'miss2') {
            if (st.task === 'name') { [['start', 0], ['trouble', 2], ['fix', 1]].forEach(([ro, i]) => { K.pickTab(st, ro); K.putTab(st, ids[i]); }); }
            else if (st.task === 'match') { [ids[1], ids[0], ids[2]].forEach((id, i) => { K.pickStrip(st, id); K.putStrip(st, i); }); }
            else { K.pick(st, r.cands[1].id); K.put(st); }
            K.read(st); K.read(st);
          }
          if (phase === 'won') { st.slots = ids.slice(); st.table = st.table.map(() => null); st.tray = []; st.done = true; st.caps = ids.slice(); }
          A.st = st; A._busy = false; A._view = phase === 'won' ? { marks: [{ pennant: 'ok' }, { crack: 'sealed', ring: 'teal', band: 'sealed' }, {}] } : {}; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${task} ${r.story} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.ssb-slot.is-open,.ssb-loose,.ssb-trayslot,.ssb-tab,.ssb-strip,.ssb-capslot,.ssb-stud:not([hidden]),.ssb-shelf,.ssb-rtab')].filter(vis);
          const txt = [...document.querySelectorAll('.ssb-note,.ssb-studlabel,.ssb-tabword,.ssb-strip,.ssb-capslot,.ssb-cap,.ssb-starter,.ssb-rcap,.ssb-num')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.lcs-app img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.ssb-stud:not([hidden])');
          const over = [...document.querySelectorAll('.ssb-cap,.ssb-strip,.ssb-capslot,.ssb-tabword,.ssb-rcap')].filter(vis).filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent.slice(0, 20));
          return {
            side: de.scrollWidth - de.clientWidth, over,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length && !m.over.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card, no text spilling (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')}, over ${m.over.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)})`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: the stud above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${task}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-story-spine: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
