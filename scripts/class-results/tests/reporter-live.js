#!/usr/bin/env node
/**
 * The class reporter against REAL published decks.
 *
 * Opens live deck pages in a browser with `#lcs=<token>`, swaps in the LOCAL working copies of lcs-meter.js and
 * lcs-class.js (scripts/class-results/web/), and answers the two API calls itself — nothing is written to the
 * site and the site's analytics script is blocked. Then it plays each page and compares what the reporter
 * sent with what actually happened:
 *
 *   tap-choice screens  the robot picks the answers itself (W wrong on purpose, from the page's own answer list),
 *                       so right/total and the per-answer marks are known INDEPENDENTLY of what the page shows;
 *   every other screen  the robot presses Check and compares the report with the ticks and crosses the page drew
 *                       (counted here by their own selectors), or records honestly that the page exposes no marks.
 *
 * It also checks class mode (page furniture hidden), the token on the play check, the one big button
 * (size, not on top of the page's own buttons, where it leads) at phone and desktop widths, and that a page
 * opened WITHOUT a token requests no reporter and sends nothing.
 *
 *   node scripts/class-results/tests/reporter-live.js [--only=<slug-part>] [--poison]
 *
 * --poison: proves the check can fail — it runs one deck with a reporter that adds one to "right".
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const QA = require(path.join(REPO, 'scripts', 'lib', 'qa-header.js')).headers();
const WEB = path.join(REPO, 'scripts', 'class-results', 'web');
const HOST = 'https://www.lessoncraftstudio.com';
const TOKEN = 'abcdefghijkmnpqrstuv';
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
const POISON = process.argv.includes('--poison');

/* one live deck per screen kind (catalogue read 2026-11-11) */
const DECKS = [
  ['number-lines', 'number-lines-easy-g1116-10'], ['telling-time', 'telling-time-easy-g1148-2'], ['number-walls', 'number-walls-easy-g1246-10'],
  ['number-words', 'number-words-easy-g1210-10'], ['find-the-differences', 'find-the-differences-easy-g1412-2'], ['maze-puzzles', 'maze-puzzles-easy-g1420-2'],
  ['color-by-number', 'color-by-number-easy-k393-10-forestrabbit'], ['logic-puzzles', 'logic-puzzles-easy-farm-animals-g1349'], ['cloze', 'cloze-easy-g1350-6'],
  ['money', 'money-accessories-g2276-13'], ['fractions', 'fractions-christmas-b-w-g2233-6'], ['graphing-data', 'graphing-data-animals-g1142-2'],
  ['ordinal-numbers', 'ordinal-numbers-4th-of-july-g1315-3'], ['capitals-punctuation', 'capitals-punctuation-4th-of-july-g2282-5'],
  ['app:addition', 'addition-find-addend-4th-of-july'], ['app:chart-count', 'chart-count'], ['app:crossword', 'crossword'], ['app:find-and-count', 'find-and-count'],
  ['app:grid-match', 'grid-match'], ['app:matching', 'matching-letter'], ['app:more-less', 'more-less'], ['app:pattern-train', 'pattern-train'],
  ['app:picture-sort', 'picture-sort'], ['app:sudoku', 'sudoku'], ['app:word-scramble', 'word-scramble'], ['app:wordsearch', 'wordsearch'],
];

let fails = 0;
const rows = [];
function fail(deck, msg) { fails++; console.log('FAIL  ' + deck + ': ' + msg); }

async function open(browser, slug, { token = true, width = 1024, replyNext = false } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: width < 500 ? 740 : 800, deviceScaleFactor: 1 });
  const seen = { meterBody: null, reports: [], classJs: 0 };
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const u = req.url();
    if (/lcs-insights\.js|\/api\/send|umami/i.test(u)) return req.abort();
    if (u.includes('/worksheet-generators/js/lcs-meter.js')) return req.respond({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(path.join(WEB, 'lcs-meter.js'), 'utf8') });
    if (u.includes('/worksheet-generators/js/lcs-class.js')) {
      seen.classJs++;
      let body = fs.readFileSync(path.join(WEB, 'lcs-class.js'), 'utf8');
      if (POISON) body = body.replace('var o = { right: s.right, total: s.total };', 'var o = { right: Math.min(s.total, s.right + 1), total: s.total };').replace("if (list.length) return { right: sum, total: list.length, items: list };", "if (list.length) return { right: Math.min(list.length, sum + 1), total: list.length };");
      return req.respond({ status: 200, contentType: 'application/javascript', body });
    }
    if (u.includes('/api/quota/check-and-increment')) { seen.meterBody = req.postData(); return req.respond({ status: 200, contentType: 'application/json', body: '{"allowed":true,"remaining":"unlimited"}' }); }
    if (u.includes('/api/class/report')) {
      seen.reports.push(JSON.parse(req.postData() || '{}'));
      const reply = replyNext ? { next: '/en/decks/' + slug + '/#lcs=bbbbbbbbbbbbbbbbbbbb', back: '/c/abcdefghij' } : { done: true, back: '/c/abcdefghij' };
      return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(reply) });
    }
    if (u.startsWith(HOST)) return req.continue({ headers: Object.assign({}, req.headers(), QA) });
    return req.continue();
  });
  await page.goto(HOST + '/en/decks/' + slug + '/' + (token ? '#lcs=' + TOKEN : ''), { waitUntil: 'networkidle2', timeout: 60000 });
  return { page, seen };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** the ticks and crosses the page drew, counted by this test's own selectors (never the reporter's function) */
const pageMarks = () => {
  const q = (s) => document.querySelectorAll(s).length;
  return {
    stateRight: q('#lcs-app [data-state="right"]'), stateWrong: q('#lcs-app [data-state="wrong"]'),
    clsRight: [...document.querySelectorAll('#lcs-app *')].filter((e) => typeof e.className === 'string' && /--correct(\s|$)/.test(e.className)).length,
    clsWrong: [...document.querySelectorAll('#lcs-app *')].filter((e) => typeof e.className === 'string' && /--wrong(\s|$)/.test(e.className)).length,
    progress: (document.getElementById('lcs-progress') || {}).textContent || '',
    summary: (document.getElementById('lcs-summary') || {}).textContent || '',
    // the app-generated pages draw a green tick or a red cross per answer: counted here by the icon's own colour
    iconRight: q('#lcs-app svg.lcs-mark__icon[stroke="#4CAF50"]'), iconWrong: q('#lcs-app svg.lcs-mark__icon[stroke="#E53935"]'),
    checkHidden: !!(document.getElementById('lcs-check') || {}).hidden,
    celebrating: (() => { const c = document.getElementById('lcs-celebration'); return !!c && !c.hidden && c.getClientRects().length > 0; })(),
  };
};

async function runDeck(browser, label, slug) {
  const { page, seen } = await open(browser, slug);
  const row = { deck: label, kind: '', signal: '', result: '' };
  try {
    const info = await page.evaluate(() => ({
      on: !!window.__lcsClass, mode: document.body.classList.contains('lcs-class-mode'),
      chrome: ['lcs-site-chrome', 'lcs-site-footer', 'lcs-share', 'lcs-embed', 'lcs-deck-actions', 'lcs-deck-ladder', 'lcs-maker-ribbon'].filter((id) => { const e = document.getElementById(id); return e && getComputedStyle(e).display !== 'none'; }),
      links: [...document.querySelectorAll('.lcs-end-deck, .lcs-deckend-suggestions, .lcs-teaching')].filter((e) => getComputedStyle(e).display !== 'none').length,
      kind: (window.DECK_BUNDLE && window.DECK_BUNDLE.kind) || null, hasCheck: !!document.getElementById('lcs-check'), watching: window.__lcsClass && window.__lcsClass.watching,
      sheet: (() => { const w = document.getElementById('lcs-stage') || document.getElementById('lcs-worksheet'); return w ? Math.round(w.getBoundingClientRect().height) : 0; })(),
      checkShown: (() => { const c = document.getElementById('lcs-check'); return !c || (!c.hidden && c.getClientRects().length > 0); })(),
      // every link a child could still tap that leaves this page (a visible <a> with a real address)
      outLinks: [...document.querySelectorAll('a[href]')].filter((a) => a.id !== 'lcs-class-go' && a.getClientRects().length > 0 && getComputedStyle(a).visibility !== 'hidden' && !/^(#|javascript:)/.test(a.getAttribute('href') || '#')).map((a) => (a.id || a.className || a.textContent.trim().slice(0, 20)) + '→' + a.getAttribute('href').slice(0, 50)),
    }));
    if (!info.checkShown) fail(label, 'class mode HID the worksheet\'s own Check button');
    if (info.outLinks.length) fail(label, 'class mode left ' + info.outLinks.length + ' link(s) a child can leave by: ' + info.outLinks.slice(0, 3).join(' | '));
    row.kind = info.kind || (info.hasCheck ? 'app' : 'app, no Check button');
    if (!info.on) fail(label, 'the reporter did not start');
    if (!info.mode || info.chrome.length || info.links) fail(label, 'class mode left page furniture visible: ' + info.chrome.join(',') + (info.links ? ' +' + info.links + ' link blocks' : ''));
    if (info.sheet < 120) fail(label, 'the worksheet itself is not visible in class mode (height ' + info.sheet + ')');
    if (!seen.meterBody || JSON.parse(seen.meterBody).classToken !== TOKEN) fail(label, 'the play check did not carry the class token');
    if (seen.reports.length) fail(label, 'a report was sent before any Check');

    let expect = null;
    if (info.kind === 'tap-choice') {
      // the robot's own ground truth: W wrong answers chosen from the page's answer list
      expect = await page.evaluate(() => {
        const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')];
        let k = 0; const items = []; const W = Math.min(2, B.items.length - 1);
        B.items.forEach((it, i) => { const n = it.options.length; const wrong = i < W; const j = wrong ? (B.answers[i] + 1) % n : B.answers[i]; opts[k + j].click(); k += n; items.push(wrong ? 0 : 1); });
        return { right: B.items.length - W, total: B.items.length, items };
      });
      row.signal = 'robot answers';
    } else {
      // give every box something to grade: text inputs (the app decks), then the worksheet screens' own
      // write boxes through their on-screen pad (tap the box, tap the first key)
      const inputs = await page.$$('#lcs-app input');
      let typed = 0;
      for (const i of inputs) { try { const ok = await i.evaluate((e) => !e.readOnly && !e.disabled && !/checkbox|radio|hidden|button/.test(e.type) && e.getClientRects().length > 0); if (!ok) continue; await i.focus(); await page.keyboard.type('1'); typed++; } catch (e) { /* not reachable: skip */ } }
      if (typed) row.signal = 'robot typed';
      if (process.env.DEBUG_REPORTER) console.log(label, 'inputs', inputs.length, 'typed', typed, JSON.stringify(await page.evaluate(() => { const c = document.getElementById('lcs-check'); return c && { hidden: c.hidden, disabled: c.disabled, vis: c.getClientRects().length > 0 }; })));
      const boxes = await page.$$('#lcs-overlay .lcs-wr');
      for (const b of boxes) { try { await b.click(); const k = await page.$('#lcs-pad .lcs-key:not([hidden])'); if (k) await k.click(); } catch (e) { /* a box under the pad: skip */ } }
      if (boxes.length) row.signal = 'robot typed';
    }
    let canCheck = await page.evaluate(() => { const c = document.getElementById('lcs-check'); return !!c && !c.hidden && !c.disabled && c.getClientRects().length > 0; });
    if (!canCheck && info.hasCheck) {
      // screens that grade whatever is marked (tap every difference, colour, tick a grid, draw a way) keep Check
      // disabled until the first mark; press it anyway: a Check with nothing marked is a real, gradeable state
      const forced = await page.evaluate(() => { const c = document.getElementById('lcs-check'); if (!c || c.hidden || c.getClientRects().length === 0) return false; c.disabled = false; c.click(); return !!c.hidden; });
      if (forced) { row.signal = 'Check with nothing marked'; canCheck = 'done'; }
    }
    if (!canCheck) {
      // not driven: say what the page's own code would give the reporter to read (a static read, not a played one)
      const st = await page.evaluate(() => { const src = [...document.scripts].map((x) => x.textContent || '').join(' '); return { hides: src.indexOf('heckBtn.hidden=true') >= 0 || src.indexOf('chk.hidden=true') >= 0, marks: src.indexOf('--correct') >= 0 && src.indexOf('--wrong') >= 0, state: src.indexOf('data-state') >= 0, cele: !!document.getElementById('lcs-celebration') }; });
      row.signal = 'page code, not played';
      row.result = (info.hasCheck ? 'NOT PLAYED (needs a drag or a drawn answer). ' : 'no Check button. ') + 'Its code ' + (st.hides ? 'hides Check after grading' : 'does NOT hide Check') + ', ' + (st.marks || st.state ? 'draws readable marks' : 'draws NO readable marks') + (st.cele ? ', has a celebration' : '');
      if (info.kind === 'tap-choice') fail(label, 'Check stayed disabled after the robot answered everything');
      rows.push(row); await page.close(); return;
    }
    if (canCheck !== 'done') await page.evaluate(() => document.getElementById('lcs-check').click());
    await sleep(700);
    const pm = await page.evaluate(pageMarks);
    const rep = seen.reports[0];
    if (!rep) { fail(label, 'Check was pressed and nothing was reported'); rows.push(row); await page.close(); return; }
    if (rep.token !== TOKEN) fail(label, 'the report carries the wrong token');
    const sumNums = (pm.summary.match(/\d+/g) || []).map(Number);
    const drew = pm.stateRight + pm.stateWrong ? { right: pm.stateRight, total: pm.stateRight + pm.stateWrong, how: 'data-state marks' }
      : pm.iconRight + pm.iconWrong ? { right: pm.iconRight, total: pm.iconRight + pm.iconWrong, how: 'tick and cross icons' }
      : sumNums.length === 2 ? { right: Math.min(...sumNums), total: Math.max(...sumNums), how: 'the page\'s summary line' }
      : null;
    const nums = (pm.progress.match(/\d+/g) || []).map(Number);
    if (expect) {
      if (rep.right !== expect.right || rep.total !== expect.total) fail(label, `reported ${rep.right}/${rep.total}, the robot answered ${expect.right}/${expect.total}`);
      if (JSON.stringify(rep.items) !== JSON.stringify(expect.items)) fail(label, `per-answer marks ${JSON.stringify(rep.items)} differ from the robot's ${JSON.stringify(expect.items)}`);
      row.result = `${rep.right}/${rep.total} = the robot's own answers; per-answer marks match`;
    } else if (rep.total != null) {
      row.signal = drew ? drew.how : 'the page\'s own score line';
      if (drew && (rep.right !== drew.right || rep.total !== drew.total) && !(nums.length >= 2 && rep.right === nums[0] && rep.total === nums[1])) fail(label, `reported ${rep.right}/${rep.total}, the page drew ${drew.right}/${drew.total} (score line "${pm.progress}")`);
      if (!drew && !(nums.length >= 2 && rep.right === Math.min(...nums.slice(0, 2)) && rep.total === Math.max(...nums.slice(0, 2)))) fail(label, `reported ${rep.right}/${rep.total} but the page shows "${pm.progress}" and no marks`);
      row.result = `${rep.right}/${rep.total} = what the page shows` + (rep.items ? '; per-answer marks sent' : '; no per-answer marks');
    } else {
      row.signal = 'none readable';
      if (drew) fail(label, `the page drew ${drew.right}/${drew.total} but the report has no marks`);
      row.result = 'Check pressed, no marks on the page: reported finished=' + rep.finished;
    }
    if (rep.finished === true && rep.total != null && rep.right !== rep.total) fail(label, 'reported finished with wrong answers');

    // the one button — measured with the page scrolled to its very end, the worst case: nothing can scroll
    // further, so whatever the button covers there stays covered
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await sleep(250);
    const go = await page.evaluate(() => { const a = document.getElementById('lcs-class-go'); if (!a) return null; const r = a.getBoundingClientRect(); const hit = (id) => { const e = document.getElementById(id); if (!e || e.hidden || e.getClientRects().length === 0) return false; const b = e.getBoundingClientRect(); return !(b.right <= r.left || b.left >= r.right || b.bottom <= r.top || b.top >= r.bottom); }; return { w: r.width, h: r.height, href: a.getAttribute('href'), kind: a.getAttribute('data-kind'), label: a.getAttribute('aria-label'), inView: r.right <= innerWidth && r.bottom <= innerHeight && r.left >= 0, covers: ['lcs-check', 'lcs-reset', 'lcs-cele-close', 'lcs-progress', 'lcs-summary'].filter(hit), text: a.textContent.trim() }; });
    if (!go) fail(label, 'no button appeared after the report');
    else {
      if (go.w < 56 || go.h < 56) fail(label, `the button is ${Math.round(go.w)}x${Math.round(go.h)}, under 56 px`);
      if (go.href !== '/c/abcdefghij' || go.kind !== 'back') fail(label, 'the button does not lead back to the class page: ' + go.href);
      if (!go.inView) fail(label, 'the button is outside the screen');
      if (go.covers.length) fail(label, 'the button covers the page\'s own ' + go.covers.join(', '));
      if (go.text) fail(label, 'the button shows text (it must be a picture): "' + go.text + '"');
      if (!go.label) fail(label, 'the button has no label for a screen reader');
    }
    // a second Check (after Try again) is sent as well: the server keeps the first as the result
    const again = await page.evaluate(() => { const r = document.getElementById('lcs-reset'); if (!r || r.hidden || r.getClientRects().length === 0) return false; r.click(); return true; });
    if (again && info.kind === 'tap-choice') {
      await page.evaluate(() => { const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')]; let k = 0; B.items.forEach((it) => { opts[k + B.answers[k >= 0 ? B.items.indexOf(it) : 0]].click(); k += it.options.length; }); document.getElementById('lcs-check').click(); });
      await sleep(900);
      const second = seen.reports[1];
      if (!second) fail(label, 'the second Check was not reported');
      else if (second.right !== second.total || second.finished !== true) fail(label, `the all-right second Check was reported as ${second.right}/${second.total} finished=${second.finished}`);
    }
  } catch (e) { fail(label, 'the robot crashed: ' + e.message.split('\n')[0]); }
  rows.push(row);
  await page.close();
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const only = arg('only');
  const list = POISON ? DECKS.filter((d) => d[0] === 'number-lines' || d[0] === 'app:addition') : DECKS.filter((d) => !only || d[1].includes(only) || d[0].includes(only));
  for (const [label, slug] of list) await runDeck(browser, label, slug);

  if (!POISON && !only) {
    // without a token: no reporter, no report, no class mode
    const { page, seen } = await open(browser, 'number-lines-easy-g1116-10', { token: false });
    const st = await page.evaluate(() => ({ on: !!window.__lcsClass, mode: document.body.classList.contains('lcs-class-mode'), chrome: !!document.getElementById('lcs-site-chrome') && getComputedStyle(document.getElementById('lcs-site-chrome')).display !== 'none' }));
    if (st.on || st.mode || seen.classJs || !st.chrome) fail('no token', `a page opened without a token changed: reporter=${st.on} classMode=${st.mode} requestedReporter=${seen.classJs} headerVisible=${st.chrome}`);
    if (seen.meterBody && JSON.parse(seen.meterBody).classToken) fail('no token', 'the play check carried a class token');
    await page.evaluate(() => { const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')]; let k = 0; B.items.forEach((it, i) => { opts[k + B.answers[i]].click(); k += it.options.length; }); document.getElementById('lcs-check').click(); });
    await sleep(600);
    if (seen.reports.length) fail('no token', 'a page opened without a token sent a report');
    await page.close();

    // a Level Set continues: the button is "next" and goes to the next page; at phone width it still fits
    for (const width of [360, 1024]) {
      const o = await open(browser, 'number-lines-easy-g1116-10', { width, replyNext: true });
      await o.page.evaluate(() => { const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')]; let k = 0; B.items.forEach((it, i) => { opts[k + B.answers[i]].click(); k += it.options.length; }); document.getElementById('lcs-check').click(); });
      await sleep(1100);
      await o.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await sleep(250);
      const go = await o.page.evaluate(() => { const a = document.getElementById('lcs-class-go'); if (!a) return null; const r = a.getBoundingClientRect(); const hit = (id) => { const e = document.getElementById(id); if (!e || e.hidden || e.getClientRects().length === 0) return false; const b = e.getBoundingClientRect(); return !(b.right <= r.left || b.left >= r.right || b.bottom <= r.top || b.top >= r.bottom); }; return { kind: a.getAttribute('data-kind'), href: a.getAttribute('href'), w: r.width, inView: r.right <= innerWidth && r.bottom <= innerHeight && r.left >= 0, covers: ['lcs-check', 'lcs-reset', 'lcs-cele-close', 'lcs-progress', 'lcs-summary'].filter(hit) }; });
      if (!go || go.kind !== 'next' || !/#lcs=b{20}$/.test(go.href)) fail('next @' + width, 'the next-page button is missing or wrong: ' + JSON.stringify(go));
      else {
        if (go.w < 56 || !go.inView) fail('next @' + width, 'the next-page button is too small or off screen');
        if (go.covers.length) fail('next @' + width, 'the next-page button covers the page\'s own ' + go.covers.join(', '));
        await o.page.screenshot({ path: path.join(REPO, 'out', 'class-results', '_tests', 'reporter-next-' + width + '.png') });
      }
      await o.page.close();
    }
  }
  await browser.close();
  const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
  console.log('\n' + pad('deck', 26) + pad('screen', 24) + pad('read from', 24) + 'result');
  for (const r of rows) console.log(pad(r.deck, 26) + pad(r.kind, 24) + pad(r.signal, 24) + r.result);
  if (POISON) { console.log(fails ? `\npoison: the check FAILED ${fails} time(s), as it must` : '\npoison: the check did NOT fail — it proves nothing'); process.exit(fails ? 0 : 1); }
  console.log(fails ? `\n${fails} FAILURE(S)` : `\nreporter-live: ${rows.length} decks, no failures`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
