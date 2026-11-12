/**
 * Cuts the cards of a worksheet type for a check (Daily Teaching System, Part 7; design: docs/daily-teaching-system/
 * PART-7-DESIGN.md).
 *
 * A card of a check is a card of the worksheet the lesson hands out: built by the type's own generator at its core
 * level with a seed of the check's own, rendered in the worksheet shell, and taken out of the page with the size it
 * has there. Nothing is drawn or computed here; the answer a card carries is the one its generator wrote into the
 * markup (data-lcs-answer, data-lcs-correct).
 *
 *   cutCards(page, { type, strings, locale, seed, theme, outDir }) →
 *     { refused: why }                      the type is not built of cards that carry their answers
 *     { cols, cards: [card], instruction, title }
 *
 * What is known of a card, so that a check can choose its cards (build-checks.js):
 *   html, w, h   the card as it stands on its worksheet
 *   answers      how many answers it carries
 *   ans          the answers themselves (a section does not ask for the same answer twice)
 *   pos          where the right option of a choice card sits among its options (null: the child writes)
 *   kind         the shape of the task with every number replaced by n and every word by w: "n + ? = n" is not
 *                "n + n = ?" (the signs stay: a plus task is not a minus task)
 *   nums, mag    the numbers the card shows or asks for, and the largest of them (its size)
 *   given        the numbers the card PRINTS, in the order it prints them (the fraction of "1/4 of the pictures")
 *   key          what makes two cards THE SAME TASK: the same numbers in any order (4 and 1 is 1 and 4: a FACT,
 *                key "n:…"); the one number a card prints and asks about; else the same look (two shapes with four
 *                sides are two tasks)
 *   plain        false for a number a check should not lean on when another card exists (a two-digit number with
 *                two equal digits: swapping tens and ones goes unnoticed)
 *   ask          of a choice card: a fingerprint of the card without its options (what it asks); null when the card
 *                is nothing but its options
 *   twins        a choice card that shows one picture twice among its options
 *   nh           the height of the card without the stretch of its worksheet page (h when its pictures need the stretch)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const WG = path.join(__dirname, '..', '..', 'worksheet-gen');
const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));

const DIFFICULTY = 2;                       // the core level of every type: the level of the worksheet the lesson hands out

async function cutCards(page, o) {
  const { type, strings, locale, seed, outDir } = o;
  if (!strings || !strings.instruction || /\{[A-Za-z_]+\}/.test(strings.instruction + (strings.title || ''))) return { refused: 'its strings hold a token' };   // a type with tokens of its own is not cut
  const themed = !!(type.themeAxis && type.themeAxis.applicable);
  let built = null, usedTheme = null;
  for (const theme of themed ? [o.theme, 'animals'] : [null]) {
    try { built = await type.build({ theme, difficulty: DIFFICULTY, locale, unit: null }, { rng: makeRng(seed + '|' + type.id), variant: 1 }); usedTheme = theme; break; } catch (e) { built = null; }
  }
  if (!built) return { refused: 'it does not build without a unit' };
  if (!/class="ws-card"/.test(built.bodyHtml)) return { refused: 'its page is not built of cards' };
  const html = buildPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: built.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' });
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, '_cut-' + type.id + '.html');
  fs.writeFileSync(file, html, 'utf8');
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const cut = await page.evaluate(() => {
    const grid = document.querySelector('.ws-cardgrid');
    if (!grid) return null;
    // the page must be ONE grid of cards and nothing else: a card that leans on something beside the grid (a word
    // bank, a number line above the cards) cannot stand alone
    const body = document.querySelector('[data-lcs-body]');
    if ([...body.children].some((c) => c !== grid && c.getBoundingClientRect().height > 4)) return { alone: false };
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const cards = [...grid.children].filter((c) => c.classList.contains('ws-card')).map((c) => {
      const r = c.getBoundingClientRect();
      const kind = [], nums = [], given = [];
      (function walk(n) {
        for (const ch of n.childNodes) {
          if (ch.nodeType === 3) { const t = ch.textContent.trim(); if (t) { kind.push(t.replace(/\d+/g, 'n').replace(/\p{L}+/gu, 'w')); for (const m of t.match(/\d+/g) || []) { nums.push(Number(m)); given.push(Number(m)); } } continue; }
          if (ch.nodeType !== 1 || ch.classList.contains('ws-card-badge')) continue;
          // a group of pictures is a number of the task too (3 camels + 1 camel + 4 camels is the fact 1, 3, 4, 8)
          if (ch.dataset && /^\d+$/.test(ch.dataset.lcsGroup || '')) { nums.push(Number(ch.dataset.lcsGroup)); given.push(Number(ch.dataset.lcsGroup)); }
          if (ch.dataset && ch.dataset.lcsAnswer !== undefined) { kind.push('?'); for (const m of String(ch.dataset.lcsAnswer).match(/\d+/g) || []) nums.push(Number(m)); if (!ch.children.length) continue; }
          walk(ch);
        }
      })(c);
      const answers = [...c.querySelectorAll('[data-lcs-answer]')].map((e) => e.dataset.lcsAnswer);
      const correct = [...c.querySelectorAll('[data-lcs-correct]')];
      const imgs = [...new Set([...c.querySelectorAll('img')].map((i) => (i.getAttribute('src') || '').split('/').slice(-2).join('/')))].sort();
      const first = correct[0];
      const choice = correct.map((e) => (e.textContent || '').trim() || e.dataset.lcsChoice || e.dataset.lcsSym || ((e.querySelector('img') || e).getAttribute('src') || '').split('/').slice(-2).join('/') || 'option ' + [...e.parentElement.children].indexOf(e));
      const sorted = nums.slice().sort((a, b) => a - b);
      // what the card shows, as a fingerprint: its markup without its number on the page
      const shownAs = c.innerHTML.replace(/<span class="ws-card-badge">[^<]*<\/span>/, '').replace(/\s+/g, ' ');
      let hash = 5381; for (let i = 0; i < shownAs.length; i++) hash = ((hash << 5) + hash + shownAs.charCodeAt(i)) >>> 0;
      const look = hash.toString(16) + '.' + shownAs.length;
      // a choice card: what it ASKS is the card without its options (the clock, the rectangle to match); two cards
      // that ask the same thing with other options are one task. And a card whose options hold the same picture
      // twice is a weak task (two identical halved circles to circle).
      let ask = null, twins = false;
      if (first && first.parentElement && first.parentElement !== c) {
        const opts = [...first.parentElement.children].map((e) => e.innerHTML.replace(/\s+/g, ' '));
        twins = opts.some((o, i) => /<(svg|img)/.test(o) && opts.indexOf(o) !== i);
        const copy = c.cloneNode(true);
        const badge = copy.querySelector('.ws-card-badge'); if (badge) badge.remove();
        const mark = copy.querySelector('[data-lcs-correct]'); if (mark && mark.parentElement) mark.parentElement.remove();
        const rest = copy.innerHTML.replace(/\s+/g, ' ');
        if (/<(svg|img)/.test(rest) || copy.textContent.trim()) { let h2 = 5381; for (let i = 0; i < rest.length; i++) h2 = ((h2 << 5) + h2 + rest.charCodeAt(i)) >>> 0; ask = h2.toString(16) + '.' + rest.length; }
      }
      return {
        ask, twins,
        html: c.outerHTML, w: Math.round(r.width), h: Math.round(r.height),
        answers: answers.length + correct.length, ans: answers.concat(choice).join('|'),
        pos: first ? [...first.parentElement.children].indexOf(first) : null,
        kind: kind.join(' ').replace(/\s+/g, ' '), nums: sorted, given, mag: sorted.length ? sorted[sorted.length - 1] : 0,
        // two or more numbers are a fact (4 + 1 = 5 is 1 + 4 = 5); a card with one number or none is the same task
        // only when it shows the same thing (two shapes with four sides are two tasks)
        // … and a card that prints ONE number and asks about it (9: odd or even? 20: which word?) is the task of that number
        // (the DIFFERENT numbers: a fact-family house prints 7, 3 and 4 a dozen times and is still the fact 3, 4, 7,
        // the same one as "7 − 4 = ?" two parts further down)
        key: sorted.length >= 2 ? 'n:' + [...new Set(sorted)].join(',') : given.length === 1 ? 'n:' + given[0] : 'v:' + look,
        // an ordering task whose things already stand in order (the answers read 1, 2, 3): a child who numbers from
        // left to right is right without comparing
        inOrder: answers.length >= 3 && answers.every((a, i) => String(a) === String(i + 1)),
        look,
        plain: !answers.some((a) => /^(\d)\1$/.test(String(a))),
      };
    });
    // how tall a card is WITHOUT the stretch of its worksheet page (a page of four cards stretches each to a quarter of
    // the page; in a check that is blank paper). The grid is let go and each card measured again; a card whose
    // pictures change their size when let go keeps the height it has on the page.
    const els = [...grid.children].filter((c) => c.classList.contains('ws-card'));
    const pics = (c) => [...c.querySelectorAll('img,svg')].map((e) => { const b = e.getBoundingClientRect(); return Math.round(b.width) + 'x' + Math.round(b.height); }).join(',');
    const before = els.map(pics);
    grid.style.cssText += ';flex:0 0 auto !important;height:auto !important;grid-template-rows:none !important;grid-auto-rows:max-content !important;align-content:start !important;align-items:start !important';
    els.forEach((c, i) => { const r = c.getBoundingClientRect(); cards[i].nh = pics(c) === before[i] && r.height > 20 ? Math.min(cards[i].h, Math.ceil(r.height)) : cards[i].h; });
    return { alone: true, cols, cards };
  });
  fs.unlinkSync(file);
  if (!cut) return { refused: 'no card grid on the page' };
  if (!cut.alone) return { refused: 'something stands beside the cards (a bank, a line, a legend)' };
  if (cut.cards.length < 2) return { refused: 'fewer than two cards' };

  // ---- the type's OWN answer key (Part 7.2) ----
  // Many types draw their key themselves when asked (ctx.answerKey: a ring round the right picture, a sample of the
  // colouring, a badge on the missing piece). The same page is built again from the same seed in that mode: its cards
  // are the key cards of the check, and a card the child circles or colours gets its answer from what the key marks.
  let keyCards = null;
  try {
    const builtKey = await type.build({ theme: usedTheme, difficulty: DIFFICULTY, locale, unit: null }, { rng: makeRng(seed + '|' + type.id), variant: 1, answerKey: true });
    fs.writeFileSync(file, buildPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: builtKey.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' }), 'utf8');
    await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    keyCards = await page.evaluate(() => {
      const MARK = '[data-lcs-correct],[data-lcs-key-ring],[data-lcs-key-badge],[data-lcs-key-sample]';
      return [...document.querySelectorAll('.ws-cardgrid > .ws-card')].map((c) => {
        const marks = [...c.querySelectorAll(MARK)];
        const say = (e) => (e.textContent || '').trim() || e.dataset.lcsChoice || e.dataset.lcsSym || ((e.querySelector('img') || e).getAttribute('src') || '').split('/').slice(-2).join('/') || 'mark ' + [...e.parentElement.children].indexOf(e);
        // what the card asks and whether an option stands twice, as in the page of the child (see there)
        let ask = null, twins = false;
        if (marks[0] && marks[0].parentElement && marks[0].parentElement !== c) {
          const strip = (h) => h.replace(/<[^>]*data-lcs-key-[^>]*>[\s\S]*?<\/[a-z]+>/g, '').replace(/\s+/g, ' ');
          const opts = [...marks[0].parentElement.children].filter((e) => !e.matches('[data-lcs-key-ring],[data-lcs-key-badge]')).map((e) => strip(e.innerHTML));
          twins = opts.some((o, i) => /<(svg|img)/.test(o) && opts.indexOf(o) !== i);
          const copy = c.cloneNode(true);
          const badge = copy.querySelector('.ws-card-badge'); if (badge) badge.remove();
          const mark = copy.querySelector(MARK); if (mark && mark.parentElement && mark.parentElement !== copy) mark.parentElement.remove();
          const rest = copy.innerHTML.replace(/\s+/g, ' ');
          if (/<(svg|img)/.test(rest) || copy.textContent.trim()) { let h2 = 5381; for (let i = 0; i < rest.length; i++) h2 = ((h2 << 5) + h2 + rest.charCodeAt(i)) >>> 0; ask = h2.toString(16) + '.' + rest.length; }
        }
        return { html: c.outerHTML, marks: marks.length, says: marks.map(say).join('|'), pos: marks[0] ? [...marks[0].parentElement.children].indexOf(marks[0]) : null, ask, twins };
      });
    });
    fs.unlinkSync(file);
  } catch (e) { keyCards = null; try { fs.unlinkSync(file); } catch (e2) { /* gone */ } }
  if (keyCards && keyCards.length === cut.cards.length) {
    cut.cards.forEach((c, i) => {
      const k = keyCards[i];
      c.keyHtml = k.html;
      if (!c.answers && k.marks) { c.answers = k.marks; c.ans = k.marks + ':' + k.says; c.pos = k.pos; c.ask = k.ask; c.twins = k.twins; }
    });
  }
  if (cut.cards.some((c) => !c.answers)) return { refused: 'a card carries no answer in its markup, and the type draws no key for it' };
  return { cols: cut.cols, cards: cut.cards, instruction: strings.instruction, title: strings.printTitle || strings.title };
}

module.exports = { cutCards, DIFFICULTY };
