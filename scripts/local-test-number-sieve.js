/* =====================================================================
   local-test-number-sieve.js — the browser DoD for TOOL #36
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-number-sieve.js [--shot]

   What Node cannot prove. The model gate proves the arithmetic; this
   proves the FIELD ON SCREEN is that arithmetic, that the marker really
   cannot be moved once the cards start turning, and that the whole thing
   fits a projector and a phone.

     L1 ⭐ DOM FIDELITY  the lit cells ARE the model's survivors, at every
                        step of every free board
     L2 ⭐ COMMITTED     a real pointer cannot move the marker once the
                        first card has turned
     L3 ⭐ ANOTHER ORDER shuffling and re-running lands on an identical
                        field — invention 2, measured on the render
     L4    NO LEAK       nothing on screen says the number before the last
                        card is turned
     L5    THE SWEEP     320-1366, two tap floors, text >=14px, no page
                        overflow, every cell inside its grid box, FITS at
                        desktop, zero console errors
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5503;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'number-sieve', 'qa');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* the SAME model object the DOM is checked against — never a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'number-sieve.js'), 'utf8') + '\n;this.__T = NumberSieve;', sandbox);
const T = sandbox.__T;
const LIB = JSON.parse(fs.readFileSync(path.join(MINI, 'number-sieve-boards.json'), 'utf8'));

let PASS = 0, FAIL = 0;
const is = (cond, msg) => { if (cond) { PASS++; console.log('  ok   ' + msg); } else { FAIL++; console.error('  FAIL ' + msg); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, o) {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(o && o.premium
        ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
        : { user: { subscriptionTier: 'free' }, subscription: null })
    })
    : r.continue()));
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!(o && o.premium));
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const open = async (page, lang, w, h) => {
  await page.setViewport({ width: w || 1024, height: h || 900 });
  await page.goto(`http://127.0.0.1:${PORT}/number-sieve.html?lang=${lang || 'en'}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.nsv-wrap', { timeout: 9000 });
  await page.waitForSelector('.nsv-card', { timeout: 9000 });
  await wait(250);
};

/* read the field off the page — never assume what is on it */
const readField = (p) => p.evaluate(() => {
  const cells = Array.from(document.querySelectorAll('.nsv-cell'));
  return {
    lit: cells.filter((c) => !c.classList.contains('nsv-out')).map((c) => Number(c.getAttribute('data-n'))),
    total: cells.length,
    marked: cells.filter((c) => c.classList.contains('nsv-marked')).map((c) => Number(c.getAttribute('data-n'))),
    cards: document.querySelectorAll('.nsv-card:not(.nsv-spare)').length,
    spares: document.querySelectorAll('.nsv-spare').length,
    up: document.querySelectorAll('.nsv-card.nsv-up').length
  };
});
const turnNext = (p) => p.evaluate(() => {
  const b = document.querySelector('.nsv-card.nsv-next');
  if (!b) return false;
  b.click();
  return true;
});

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  try {
    /* ---------- L1 ⭐ DOM FIDELITY ----------
       ⚠ DRIVEN THROUGH THE BUILDER, ON KNOWN TARGETS. The first cut
       stepped the library and worked out which board was on the mat from
       its card count and field size — which is not a unique key, so it
       compared the wrong board and reported a defect that was the
       harness's. The builder path is deterministic and the harness knows
       exactly what it asked for. It also exercises the free builder,
       which is the path most teachers will actually use. */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en');
      const CASES = [[20, 7], [20, 13], [100, 37], [120, 84]];
      let steps = 0, worst = null;
      for (const [field, target] of CASES) {
        await page.evaluate((f) => {
          const chips = Array.from(document.querySelectorAll('.nsv-seg .nsv-segbtn'));
          const idx = { 20: 0, 100: 1, 120: 2 }[f];
          if (chips[idx]) chips[idx].click();
        }, field);
        await wait(200);
        await page.evaluate(() => {
          const b = document.querySelector('[data-fk="chip:deal"]');
          if (b) b.click();                        /* "New cards" arms the pick */
        });
        await wait(150);
        await page.evaluate((n) => {
          const c = document.querySelector('.nsv-cell[data-n="' + n + '"]');
          if (c) c.click();
        }, target);
        await wait(250);

        const clues = T.buildFor(field, target, T.AIM_CARDS, { minPen: T.MIN_PENULTIMATE, cleanTens: true })
          || T.buildFor(field, target, T.AIM_CARDS, { cleanTens: true })
          || T.buildFor(field, target);
        const st = { field: field, clues: clues, turned: clues.length, target: target, markers: [], spares: [], chosen: -1, emblems: [], committed: false };
        const shown = await readField(page);
        const expectCards = shown.spares === 3 ? clues.length - 1 : clues.length;
        if (shown.cards !== expectCards || shown.total !== field) {
          worst = `1-${field}/${target}: the tool dealt ${shown.cards} cards plus ${shown.spares} candidates on a ${shown.total} field, the model says ${clues.length} clues on ${field}`;
          break;
        }
        for (let k = 0; k <= clues.length; k++) {
          const dom = await readField(page);
          const model = T.survivorsAfter(st, k);
          const a = dom.lit.slice().sort((x, y) => x - y).join(',');
          const b = model.slice().sort((x, y) => x - y).join(',');
          if (a !== b) { worst = `1-${field}/${target} step ${k}: DOM [${dom.lit.slice(0, 8)}] vs model [${model.slice(0, 8)}]`; break; }
          steps++;
          if (k < clues.length) {
            const turned = await turnNext(page);
            if (!turned) {
              /* the deck is out of face-down cards: the closing move is
                 the three candidates, and the one that closes is the
                 one whose residue is a single number */
              const ok = await page.evaluate(() => {
                const T = window.NumberSieve;
                if (!T || !T.st.spares || T.st.spares.length !== 3) return false;
                const i = T.closingSpare(T.st);
                const els = document.querySelectorAll('.nsv-spare');
                if (i < 0 || !els[i]) return false;
                els[i].click();
                return true;
              });
              if (!ok) break;
            }
            await wait(200);
          }
        }
        if (worst) break;
      }
      is(!worst && steps >= 16, `⭐ L1 the lit cells ARE the model's survivors at every step (${steps} steps across ${CASES.length} built boards)${worst ? ' — ' + worst : ''}`);
      await page.close();
    }

    /* ---------- L2 ⭐ THE MARKER IS COMMITTED ---------- */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en');
      const box = await page.evaluate(() => {
        const c = document.querySelector('.nsv-cell[data-n="3"]');
        const r = c.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      });
      await page.mouse.click(box.x, box.y);
      await wait(180);
      let f = await readField(page);
      is(f.marked.length === 1 && f.marked[0] === 3, `L2a a real pointer parks the marker on 3 (got [${f.marked}])`);
      await turnNext(page);
      await wait(220);
      const box2 = await page.evaluate(() => {
        const c = document.querySelector('.nsv-cell[data-n="9"]');
        const r = c.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      });
      await page.mouse.click(box2.x, box2.y);
      await wait(180);
      f = await readField(page);
      is(f.marked.length === 1 && f.marked[0] === 3, `⭐ L2b the marker cannot be moved once a card has turned (still on [${f.marked}])`);
      await page.close();
    }

    /* ---------- L3 ⭐ ANOTHER ORDER, SAME FIELD ---------- */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en');
      const runAll = async () => {
        for (let i = 0; i < 12; i++) { const ok = await turnNext(page); if (!ok) break; await wait(120); }
        return (await readField(page)).lit.slice().sort((a, b) => a - b).join(',');
      };
      const first = await runAll();
      await page.evaluate(() => {
        const chips = Array.from(document.querySelectorAll('.nsv-foot [data-fk]'));
        if (chips[0]) chips[0].click();   /* shuffle is the first foot chip when present */
      });
      await wait(220);
      const midway = await readField(page);
      is(midway.up === 0, `L3a shuffling turns the whole deck face-down again (${midway.up} face-up)`);
      const second = await runAll();
      is(first === second && first.length > 0, `⭐ L3b a different order lands on an identical field ([${first}] vs [${second}])`);
      await page.close();
    }

    /* ---------- L4 NO LEAK ---------- */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en');
      const shown = await readField(page);
      const board = LIB.boards.filter((b) => b.free).find((b) => b.clues.length === shown.cards && b.range === shown.total);
      let leaked = null;
      if (board) {
        for (let k = 0; k < board.clues.length; k++) {
          const txt = await page.evaluate(() => document.querySelector('.nsv-wrap').innerText);
          const lit = (await readField(page)).lit;
          /* the target is allowed to be ON the field as one of many lit
             cells; what must not happen is the tool SAYING it */
          const said = new RegExp('(^|[^0-9])' + board.target + '([^0-9]|$)').test(
            txt.split('\n').filter((l) => !/^\d+$/.test(l.trim())).join(' ')
          );
          if (said) { leaked = `at step ${k}`; break; }
          if (lit.length === 1) { leaked = `the field was down to one at step ${k}, before the last card`; break; }
          await turnNext(page);
          await wait(140);
        }
      }
      is(!leaked, `L4 nothing says the number before the last card is turned${leaked ? ' — ' + leaked : ''}`);
      await page.close();
    }

    /* ---------- L6 ⭐ "NEW CARDS" REALLY PRODUCES NEW CARDS ----------
       The assertion that should have existed. `audit-tool-control-liveness`
       passed this chip while it dealt nothing, because setting a flag and
       re-rendering IS a DOM change — so the check has to be that the
       WORLD THE LABEL PROMISES changed, not that any world did. */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en');
      /* turn two cards so the board is visibly mid-run */
      await turnNext(page); await wait(200);
      await turnNext(page); await wait(200);
      const mid = await readField(page);
      is(mid.up === 2, `L6a two cards are face up before the press (${mid.up})`);
      const clickNew = () => page.evaluate(() => {
        const b = document.querySelector('[data-fk="chip:deal"]');
        if (b) b.click();
      });
      await clickNew();
      await wait(350);
      const after = await readField(page);
      is(after.up === 0 && after.lit.length === after.total,
        `⭐ L6b pressing "New cards" deals a fresh board — ${mid.up} face-up and ${mid.lit.length}/${mid.total} lit became ${after.up} face-up and ${after.lit.length}/${after.total} lit`);
      /* and pressing it again lands on a DIFFERENT board, not the same one */
      const deckOf = () => page.evaluate(() => Array.from(document.querySelectorAll('.nsv-card:not(.nsv-spare)')).length);
      const a = await deckOf();
      let differed = false;
      for (let i = 0; i < 4 && !differed; i++) {
        await clickNew(); await wait(300);
        /* drive the whole deck and read which number is left standing */
        for (let k = 0; k < 8; k++) { if (!(await turnNext(page))) break; await wait(110); }
        const left = (await readField(page)).lit.join(',');
        if (i === 0) { page.__first = left; } else if (left !== page.__first) differed = true;
      }
      is(differed, 'L6c repeated presses land on different boards, not the same one over again');
      void a;
      await page.close();
    }

    /* ---------- L7 the one instruction is above the field, and on screen ---------- */
    {
      for (const [w, h] of [[360, 740], [1024, 900]]) {
        const page = await newPage(browser, { premium: false });
        await open(page, 'en', w, h);
        await page.evaluate(() => {
          const c = Array.from(document.querySelectorAll('.nsv-bar [data-fk]'));
          if (c[3]) c[3].click();
        });
        await wait(300);
        const geo = await page.evaluate(() => {
          const hint = document.querySelector('.nsv-hint');
          const field = document.querySelector('.nsv-field');
          if (!hint || !field) return null;
          const hr = hint.getBoundingClientRect(), fr = field.getBoundingClientRect();
          return { hintTop: Math.round(hr.top), hintBottom: Math.round(hr.bottom), fieldTop: Math.round(fr.top), vh: window.innerHeight, text: hint.textContent.trim() };
        });
        is(geo && geo.hintBottom <= geo.fieldTop + 1, `${w}px: the hint sits ABOVE the field (${geo && geo.hintBottom} <= ${geo && geo.fieldTop})`);
        is(geo && geo.hintTop >= 0 && geo.hintBottom <= geo.vh, `${w}px: the armed hint is on screen (${geo && geo.hintTop}-${geo && geo.hintBottom} in ${geo && geo.vh})`);
        is(geo && geo.text.length > 0, `${w}px: the armed hint actually says something ("${geo && geo.text}")`);
        await page.close();
      }
    }

    /* ---------- L5 THE SWEEP ---------- */
    {
      const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900],
  /* the three tier FLOORS -- the widest board each tier draws against the
     SHORTEST viewport that draws it, which is where a cap fails if it is
     going to. Plus the two real classroom boards. */
  [1400, 880], [1800, 1000], [1920, 1080], [2400, 1150], [2560, 1440]];
      const MIN_TAP = 44, MIN_CELL = 34;
      for (const [w, h] of VIEWPORTS) {
        const page = await newPage(browser, { premium: false });
        await open(page, 'de', w, h);
        /* the 1-120 field is the densest state this tool has */
        await page.evaluate(() => {
          const chips = Array.from(document.querySelectorAll('.nsv-seg .nsv-segbtn'));
          if (chips[2]) chips[2].click();
        });
        await wait(250);
        const geo = await page.evaluate(() => {
          const ctrls = Array.from(document.querySelectorAll('.nsv-chip, .nsv-segbtn, .nsv-fam, .nsv-card')).filter((e) => e.getBoundingClientRect().width > 0);
          const cells = Array.from(document.querySelectorAll('.nsv-cell'));
          const grid = document.querySelector('.nsv-field');
          /* ⚠ per-child right-edge containment. aspect-ratio + a cell
             min-height over-inflates the track and pushes the last column
             outside the grid box while scrollWidth stays clean, so an
             overflow check alone is structurally blind to it. */
          let outside = 0;
          if (grid) {
            const gr = grid.getBoundingClientRect();
            cells.forEach((c) => {
              const r = c.getBoundingClientRect();
              if (r.right > gr.right + 1 || r.left < gr.left - 1) outside++;
            });
          }
          const texts = Array.from(document.querySelectorAll('.nsv-wrap *'))
            .filter((e) => Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim()))
            .map((e) => parseFloat(getComputedStyle(e).fontSize));
          const lowest = ctrls.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
          /* ⚠ PROVE reachability below desktop rather than assuming it —
             and drive every scroll candidate, because the shell sizes
             html/body to the viewport, so once a tool opts into
             body{overflow-y:auto} the BODY is the scroller and
             window.scrollTo never moves. */
          const low = ctrls.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom ? e : bb), null);
          let took = null, afterBottom = null, afterTop = null;
          if (low) {
            for (let el = low; el; el = el.parentElement) {
              const before = el.scrollTop;
              el.scrollTop = before + 4000;
              if (el.scrollTop > before + 1) { took = el.tagName + '.' + (el.className || ''); break; }
              el.scrollTop = before;
            }
            const r = low.getBoundingClientRect();
            afterBottom = Math.round(r.bottom); afterTop = Math.round(r.top);
          }
          return {
            took, afterBottom, afterTop,
            ctrl: Math.min.apply(null, ctrls.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)).concat([999])),
            cell: Math.min.apply(null, cells.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)).concat([999])),
            outside,
            pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            text: Math.min.apply(null, texts.concat([99])),
            lowest, vh: window.innerHeight, cells: cells.length
          };
        });
        is(geo.cells === 120, `${w}px: the densest field really is on screen (${geo.cells} cells)`);
        is(geo.ctrl >= MIN_TAP - 0.5, `${w}px: every control >= ${MIN_TAP}px (${geo.ctrl.toFixed(1)})`);
        is(geo.cell >= MIN_CELL - 0.5, `${w}px: every field cell >= ${MIN_CELL}px (${geo.cell.toFixed(1)})`);
        is(geo.outside === 0, `${w}px: every cell sits inside its grid box (${geo.outside} outside)`);
        is(geo.pageOverflow <= 1, `${w}px: the PAGE never scrolls sideways (${geo.pageOverflow}px) — the field scrolls in its own box`);
        is(geo.text >= 14, `${w}px: every text node >= 14px (${geo.text})`);
        if (w >= 768) {
          is(geo.lowest <= geo.vh + 1, `${w}px: FITS at desktop (lowest control ${Math.round(geo.lowest)} <= ${geo.vh})`);
        } else {
          const fits = geo.lowest <= geo.vh + 8;
          const reachable = fits || (geo.took !== null && geo.afterBottom <= geo.vh + 8 && geo.afterTop >= 0);
          is(reachable, `${w}px: fits (${Math.round(geo.lowest)}) or PROVEN reachable — scrolled ${geo.took || 'nothing'}, then visible ${geo.afterTop}-${geo.afterBottom}`);
        }
        is(page._errs.length === 0, `${w}px: zero console errors${page._errs.length ? ' — ' + page._errs[0] : ''}`);
        if (SHOT && [360, 768, 1024].indexOf(w) > -1) {
          fs.mkdirSync(SHOT_DIR, { recursive: true });
          await page.screenshot({ path: path.join(SHOT_DIR, `nsv-${w}.png`), fullPage: true });
        }
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions, 0 failed`);
  process.exit(FAIL ? 1 : 0);
})();
