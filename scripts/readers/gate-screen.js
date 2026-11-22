#!/usr/bin/env node
/**
 * scripts/readers/gate-screen.js — plays the SCREEN version of reader decks (kind 'page-turn', 2026-11-22) in a browser.
 *
 *   node scripts/readers/gate-screen.js --dir=<folder of unpacked decks> [--shots=<folder>] [--poison]
 *
 * A deck folder holds deck.html + manifest.json (+ printable.pdf ...), as a worksheet-gen ZIP unpacks. The oracle is the
 * BOOK (scripts/readers/books.<loc>.js, by the manifest's unit), never the page itself. Per deck:
 *   S1 the page is a page-turn screen: no Check button, no answer-key link, no answer-key file, a celebration, the meter tag
 *   S2 opening: the cover picture of the paper page is hidden, the book shows its cover with the book's title, Back is off
 *   S3 every page in order: the text of page k is the book's page k, line for line (or, for a page of ONE sentence, on one
 *      line); a picture reader shows its picture on
 *      every page, a decodable book shows none (its cover is a drawn book); the page number is printed
 *   S4 at 320 / 360 / 412 / 768 / 1024 / 1366 px: no sideways scroll, every line inside the card, type at least 19 px
 *      (24 px from 768 px), every picture loaded, every button at least 44 px
 *   S5 the last page: Next gone, "The end" there; it opens the celebration (no stars; a decodable book asks for a retell,
 *      a picture reader does not; "Read it again" first); "Read it again" goes back to the cover
 *   S6 the arrow keys and a swipe turn the page
 *   S7 from 768 px up, at a laptop height of 768 px, the buttons stand inside the window without scrolling
 * --poison breaks a copy eight ways (the paper cover left showing, two pages swapped, "The end" dead, type not fitted to the
 * page, a Check button, a missing picture, a retell on a picture reader, two sentences joined on one line)
 * and requires each copy to fail.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require(path.join(__dirname, '..', '..', 'node_modules', 'puppeteer'));

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const DIR = args.dir;
if (!DIR) { console.error('usage: gate-screen.js --dir=<folder of unpacked decks> [--shots=<folder>] [--poison]'); process.exit(2); }
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const norm = (t) => String(t).split('|').map((x) => x.trim()).join(' | ');

function bookFor(man) {
  const loc = (man.language || 'en').slice(0, 2);
  const books = require(path.join(__dirname, 'books.' + loc + '.js'));
  const b = books.find((x) => x.id === man.unit);
  if (!b) throw new Error('no book "' + man.unit + '" in books.' + loc + '.js');
  return b;
}

function staticChecks(dir, html, man) {
  const f = [];
  if (!man.interactive || man.interactive.kind !== 'page-turn') f.push('S1 the manifest is not a page-turn screen');
  if (man.assets && man.assets.answer_key_pdf) f.push('S1 the manifest names an answer key');
  if (fs.existsSync(path.join(dir, 'answer-key.pdf'))) f.push('S1 the deck carries an answer key');
  if (/id="lcs-check"/.test(html)) f.push('S1 the page has a Check button');
  if (/__ANSWER_KEY_URL__/.test(html)) f.push('S1 the page links an answer key');
  if (!/id="lcs-celebration"/.test(html)) f.push('S1 no celebration');
  if (!/id="lcs-meter-js"/.test(html)) f.push('S1 no meter tag');
  return f;
}

async function play(browser, file, book, width, shots) {
  const f = [];
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.setViewport({ width, height: width >= 768 ? 768 : 760 });
  await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise((r) => setTimeout(r, 150));
  const total = book.pages.length + 1;
  const open = await page.evaluate(() => {
    const img = document.getElementById('lcs-worksheet-img'), book = document.getElementById('lcs-book');
    const t = book && book.querySelector('.lcs-book-title');
    return { imgHidden: !!img && img.getClientRects().length === 0, bookShown: !!(book && !book.hidden && book.getClientRects().length), title: t ? t.textContent : null,
      backOff: !!document.getElementById('lcs-book-back').disabled, dots: document.querySelectorAll('#lcs-book-dots i').length };
  });
  if (!open.imgHidden || !open.bookShown) f.push('S2 the book does not replace the paper picture');
  if (open.title !== book.title) f.push('S2 the cover reads "' + open.title + '", the book is "' + book.title + '"');
  if (!open.backOff) f.push('S2 Back is on at the cover');
  if (open.dots !== total) f.push('S2 ' + open.dots + ' dots for ' + total + ' pages');
  const minType = width >= 768 ? 24 : 19;
  for (let k = 0; k < total; k++) {
    const m = await page.evaluate(() => {
      const card = document.getElementById('lcs-book'), R = card.getBoundingClientRect();
      const spans = [...card.querySelectorAll('.lcs-book-text span')];
      const out = spans.filter((s) => { const r = s.getBoundingClientRect(); return r.left < R.left + 2 || r.right > R.right - 2 || r.bottom > R.bottom - 2; }).map((s) => s.textContent);
      const imgs = [...card.querySelectorAll('img')];
      const txt = card.querySelector('.lcs-book-text');
      const btns = [...document.querySelectorAll('.lcs-book-controls button')].filter((b) => !b.hidden).map((b) => { const r = b.getBoundingClientRect(); return { id: b.id, w: r.width, h: r.height, bottom: r.bottom }; });
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lines: spans.map((s) => s.textContent), out, font: txt ? parseFloat(getComputedStyle(txt).fontSize) : null,
        imgs: imgs.length, broken: imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).length,
        icon: !!card.querySelector('svg.lcs-book-icon'), no: (card.querySelector('.lcs-book-no') || {}).textContent || null,
        btns, vh: window.innerHeight, cardH: R.height,
      };
    });
    const where = 'page ' + (k + 1) + ' @' + width;
    if (m.overflow > 0) f.push('S4 ' + where + ': the page scrolls sideways by ' + m.overflow + ' px');
    if (m.out.length) f.push('S4 ' + where + ': a line leaves the card: ' + m.out[0]);
    if (m.broken) f.push('S4 ' + where + ': ' + m.broken + ' picture(s) did not load');
    for (const b of m.btns) if (b.w < 44 || b.h < 44) f.push('S4 ' + where + ': the button ' + b.id + ' is ' + Math.round(b.w) + 'x' + Math.round(b.h));
    if (width >= 768 && m.btns.some((b) => b.bottom > m.vh)) f.push('S7 ' + where + ': the buttons are below the window (' + Math.round(Math.max(...m.btns.map((b) => b.bottom))) + ' > ' + m.vh + ')');
    if (k === 0) {
      if (book.series === 'first' && (!m.icon || m.imgs)) f.push('S3 the cover of a decodable book is not the drawn book');
      if (book.series !== 'first' && m.imgs !== 1) f.push('S3 the cover of a picture reader shows ' + m.imgs + ' pictures');
    } else {
      const want = norm(book.pages[k - 1]);
      const plain = want.split(' | ').join(' '), oneSentence = (plain.match(/[.!?](?=\s|$)/g) || []).length === 1;
      const okLines = m.lines.join(' | ') === want || (oneSentence && m.lines.length === 1 && m.lines[0] === plain);
      if (!okLines) f.push('S3 ' + where + ' reads "' + m.lines.join(' | ') + '", the book "' + want + '"');
      if (m.font != null && m.font < minType) f.push('S4 ' + where + ': the type is ' + m.font.toFixed(1) + ' px');
      if (book.series === 'first' && m.imgs) f.push('S3 ' + where + ': a decodable page shows a picture');
      if (book.series !== 'first' && m.imgs !== 1) f.push('S3 ' + where + ': ' + m.imgs + ' pictures');
      if (m.no !== String(k + 1)) f.push('S3 ' + where + ': the page number reads ' + m.no);
    }
    if (shots && (width === 360 || width === 1024)) await (await page.$('.lcs-book-stage')).screenshot({ path: path.join(shots, book.id + '-' + width + '-p' + (k + 1) + '.png') });
    if (k < total - 1) await page.click('#lcs-book-next');
    await new Promise((r) => setTimeout(r, 320));   // the page fades in over 260 ms: measure and photograph it settled
  }
  const last = await page.evaluate(() => ({ next: document.getElementById('lcs-book-next').hidden, end: !document.getElementById('lcs-book-end').hidden }));
  if (!last.next || !last.end) f.push('S5 @' + width + ' the last page does not offer "The end" alone');
  await page.click('#lcs-book-end');
  const cele = await page.evaluate(() => { const c = document.getElementById('lcs-celebration'); return !!c && !c.hidden && c.getClientRects().length > 0; });
  if (!cele) f.push('S5 @' + width + ' "The end" does not open the celebration');
  if (cele) {
    const card = await page.evaluate(() => ({ stars: !!document.querySelector('#lcs-celebration .lcs-cele-stars'), retell: (() => { const r = document.getElementById('lcs-cele-retell'); return !!r && !r.hidden && r.getClientRects().length > 0; })(),
      first: (document.querySelector('#lcs-celebration .lcs-btn') || {}).id || null }));
    if (card.stars) f.push('S5 @' + width + ' the celebration shows stars');
    if (card.retell !== (book.series === 'first')) f.push('S5 @' + width + ' the retell line is ' + (card.retell ? 'shown' : 'missing') + ' on a ' + book.series + ' book');
    if (card.first !== 'lcs-cele-close') f.push('S5 @' + width + ' "Read it again" is not the first button');
    await page.click('#lcs-cele-close');
    const back = await page.evaluate(() => ({ cel: document.getElementById('lcs-celebration').hidden, t: (document.querySelector('#lcs-book .lcs-book-title') || {}).textContent || null }));
    if (!back.cel || back.t !== book.title) f.push('S5 @' + width + ' "Read it again" does not go back to the cover');
  }
  const status = () => page.evaluate(() => document.getElementById('lcs-book-status').textContent);
  await page.keyboard.press('ArrowRight');
  const s1 = await status();
  await page.keyboard.press('ArrowLeft');
  const s0 = await status();
  if (!/\b2\b/.test(s1) || !/\b1\b/.test(s0)) f.push('S6 @' + width + ' the arrow keys do not turn the page ("' + s1 + '", "' + s0 + '")');
  const box = await (await page.$('#lcs-book')).boundingBox();
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 4 });
  await page.mouse.up();
  const s2 = await status();
  if (!/\b2\b/.test(s2)) f.push('S6 @' + width + ' a swipe does not turn the page ("' + s2 + '")');
  if (errs.length) f.push('page error @' + width + ': ' + errs[0]);
  await page.close();
  return f;
}

async function gateDeck(browser, dir, shots, htmlOverride) {
  const man = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const book = bookFor(man);
  let file = path.join(dir, 'deck.html');
  const html = htmlOverride != null ? htmlOverride : fs.readFileSync(file, 'utf8');
  if (htmlOverride != null) { file = path.join(os.tmpdir(), 'gate-screen-' + process.pid + '-' + Math.random().toString(36).slice(2) + '.html'); fs.writeFileSync(file, htmlOverride); }
  const fails = staticChecks(dir, html, man);
  try { for (const w of WIDTHS) fails.push(...(await play(browser, file, book, w, shots))); }
  catch (e) { fails.push('crash: ' + e.message.split('\n')[0]); }
  if (htmlOverride != null) fs.unlinkSync(file);
  return { book, fails };
}

function mutateBundle(html, fn) {
  return html.replace(/window\.DECK_BUNDLE=(\{.*?\});<\/script>/s, (_, j) => 'window.DECK_BUNDLE=' + JSON.stringify(fn(JSON.parse(j))).replace(/</g, '\\u003c') + ';</script>');
}

(async () => {
  const decks = fs.readdirSync(DIR).map((d) => path.join(DIR, d)).filter((d) => fs.existsSync(path.join(d, 'deck.html')) && fs.existsSync(path.join(d, 'manifest.json')));
  if (!decks.length) { console.error('[gate-screen] no decks in ' + DIR); process.exit(2); }
  if (args.shots) fs.mkdirSync(args.shots, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  let bad = 0;
  try {
    if (args.poison) {
      const pick = (series) => decks.find((d) => bookFor(JSON.parse(fs.readFileSync(path.join(d, 'manifest.json'), 'utf8'))).series === series);
      const pic = pick('theme') || decks[0], any = pick('first') || decks[0];
      // a book with a page of two sentences (the join poison needs one to join wrongly)
      const two = decks.find((d) => bookFor(JSON.parse(fs.readFileSync(path.join(d, 'manifest.json'), 'utf8'))).pages.some((p) => (p.split('|').join(' ').match(/[.!?](?=\s|$)/g) || []).length > 1));
      if (!two) throw new Error('--poison needs a book with a page of two sentences among the decks');
      const read = (d) => fs.readFileSync(path.join(d, 'deck.html'), 'utf8');
      const cases = [
        ['the paper cover left showing', any, read(any).replace('.lcs-book-stage .lcs-worksheet__img[hidden]{display:none !important}', '.lcs-book-stage .lcs-worksheet__img[hidden]{display:block}')],
        ['two pages swapped', any, mutateBundle(read(any), (B) => { const p = B.ctx.book.pages; [p[0], p[1]] = [p[1], p[0]]; return B; })],
        ['"The end" dead', any, read(any).replace('end.addEventListener("click",finish);', '')],
        ['type not fitted', any, read(any).replace('return w>room?Math.floor(mx*room/w):mx', 'return mx').replace('text(p.lines,p.pic?46:60)', 'text(p.lines,p.pic?90:90)')],
        ['a Check button', any, read(any).replace('<div class="lcs-controls lcs-book-controls">', '<div class="lcs-controls lcs-book-controls"><button type="button" id="lcs-check">Check</button>')],
        ['a missing picture', pic, mutateBundle(read(pic), (B) => { B.ctx.book.pages[1].pic = null; return B; })],
        ['a retell on a picture reader', pic, mutateBundle(read(pic), (B) => { B.ctx.book.retell = true; return B; }).replace('id="lcs-cele-retell" hidden>', 'id="lcs-cele-retell">')],
        ['two sentences joined on one line', two, read(two).replace('.length===1?"1":"0"', '.length>=1?"1":"0"').replace('if(s1>=s*0.9&&s1>=30)', 'if(true)')],
      ];
      let caught = 0;
      for (const [name, d, html] of cases) {
        const r = await gateDeck(browser, d, null, html);
        if (r.fails.length) caught++; else console.log('  POISON NOT CAUGHT: ' + name);
        console.log('  poison "' + name + '": ' + (r.fails.length ? 'caught (' + r.fails[0].slice(0, 90) + ')' : 'MISSED'));
      }
      console.log('[gate-screen --poison] ' + caught + '/' + cases.length + ' caught');
      if (caught !== cases.length) bad++;
    } else {
      for (const d of decks) {
        const r = await gateDeck(browser, d, args.shots || null);
        if (r.fails.length) { bad++; console.log('FAIL ' + r.book.id + ' (' + r.fails.length + ')'); r.fails.slice(0, 12).forEach((x) => console.log('   ' + x)); }
        else console.log('PASS ' + r.book.id);
      }
      console.log('[gate-screen] ' + (decks.length - bad) + '/' + decks.length + ' books play');
    }
  } finally { await browser.close(); }
  process.exit(bad ? 1 : 0);
})();
