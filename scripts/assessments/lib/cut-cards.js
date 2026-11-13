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

const NO_ANSWER = 'a card carries no answer in its markup, and the type draws no key for it';
const DIFFICULTY = 2;                       // the core level of a type; a lesson that hands out another level as its page for everyone passes it (o.difficulty)

/** Finds the tasks of a worksheet page (runs in the page). A page of cards: the .ws-card of its .ws-cardgrid. Any other
 *  page: the largest group of three or more children of one element that are alike (the same tag and class) — the rows
 *  of a page of sentences, the small cards of a page of pictures. "alone": nothing else on the page takes room (a word
 *  bank, a story, a legend), so a task can stand without its page. */
const FIND = `window.__tcFind = function () {
  const body = document.querySelector('[data-lcs-body]');
  const tall = (e) => e.getBoundingClientRect().height;
  let container = null, units = null, legacy = false;
  const grid = document.querySelector('.ws-cardgrid');
  if (grid && [...grid.children].some((c) => c.classList.contains('ws-card'))) {
    container = grid; units = [...grid.children].filter((c) => c.classList.contains('ws-card')); legacy = grid.parentElement === body;
  } else {
    let best = null;
    for (const el of body.querySelectorAll('*')) {
      if (el.closest('svg')) continue;
      const kids = [...el.children].filter((c) => tall(c) > 30);
      if (kids.length < 3) continue;
      const sig = (c) => c.tagName + '.' + (typeof c.className === 'string' ? c.className : '');
      const groups = {}; for (const c of kids) (groups[sig(c)] = groups[sig(c)] || []).push(c);
      const top = Object.values(groups).sort((x, y) => y.length - x.length)[0];
      if (top.length < 3) continue;
      const area = top.reduce((k, c) => { const b = c.getBoundingClientRect(); return k + b.width * b.height; }, 0);
      if (!best || area > best.area) best = { el, top, area };
    }
    if (!best) return null;
    container = best.el; units = best.top;
  }
  let alone = true; const chain = [];
  for (let e = container; e && e !== body; e = e.parentElement) { chain.unshift(e); if ([...e.parentElement.children].some((c) => c !== e && c.tagName !== 'STYLE' && tall(c) > 4)) alone = false; }
  if (!legacy && [...container.children].some((c) => !units.includes(c) && c.tagName !== 'STYLE' && tall(c) > 4)) alone = false;
  // a task cut out of its page keeps the classes of what it stood in (their boxes are let go: display:contents)
  const open = legacy ? '' : chain.map((e) => { const a = [...e.attributes].filter((x) => x.name !== 'style' && x.name !== 'id').map((x) => x.name + '="' + x.value.replace(/"/g, '&quot;') + '"').join(' '); return '<' + e.tagName.toLowerCase() + ' ' + a + ' data-tc-wrap style="' + (e.getAttribute('style') || '').replace(/"/g, '&quot;') + ';display:contents">'; }).join('');
  const close = legacy ? '' : chain.slice().reverse().map((e) => '</' + e.tagName.toLowerCase() + '>').join('');
  // the number a task prints for its place on the page (the badge of a row): the check numbers its boxes itself
  if (!legacy) units.forEach((u, i) => { for (const e of u.querySelectorAll('*')) { if (!e.children.length && (e.textContent || '').trim() === String(i + 1) && e.getBoundingClientRect().width < 44 && (e.hasAttribute('data-lcs-badge') || /badge/.test(typeof e.className === 'string' ? e.className : ''))) { e.setAttribute('data-tc-badge', ''); break; } } });
  units.forEach((u) => u.setAttribute('data-tc-unit', ''));
  const styles = [...body.querySelectorAll('style')].map((x) => x.outerHTML);
  return { body, container, units, legacy, alone, open, close, styles };
};`;

async function cutCards(page, o) {
  const { type, strings, locale, seed, outDir } = o;
  if (!strings || !strings.instruction || /\{[A-Za-z_]+\}/.test(strings.instruction + (strings.title || ''))) return { refused: 'its strings hold a token' };   // a type with tokens of its own is not cut
  const themed = !!(type.themeAxis && type.themeAxis.applicable);
  const attempt = async (variant) => {
  let built = null, usedTheme = null;
  for (const theme of themed ? [o.theme, 'animals'] : [null]) {
    try { built = await type.build({ theme, difficulty: o.difficulty || DIFFICULTY, locale, unit: null }, { rng: makeRng(seed + '|' + type.id), variant }); usedTheme = theme; break; } catch (e) { built = null; }
  }
  if (!built) return { refused: 'it does not build without a unit' };
  const html = buildPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: built.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' });
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, '_cut-' + type.id + '.html');
  fs.writeFileSync(file, html, 'utf8');
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: FIND });
  const cut = await page.evaluate(() => {
    const found = window.__tcFind();
    if (!found) return null;
    // the page must be its tasks and nothing else: a task that leans on something beside them (a word bank, a number
    // line above the cards, a story) cannot stand alone
    if (!found.alone) return { alone: false };
    const grid = found.container, legacy = found.legacy;
    const tops = found.units.map((u) => Math.round(u.getBoundingClientRect().top));
    const cols = getComputedStyle(grid).display === 'grid' ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : tops.filter((t) => Math.abs(t - tops[0]) <= 2).length;
    const cards = found.units.map((c) => {
      const r = c.getBoundingClientRect();
      const kind = [], nums = [], given = [];
      (function walk(n) {
        for (const ch of n.childNodes) {
          if (ch.nodeType === 3) { const t = ch.textContent.trim(); if (t) { kind.push(t.replace(/\d+/g, 'n').replace(/\p{L}+/gu, 'w')); for (const m of t.match(/\d+/g) || []) { nums.push(Number(m)); given.push(Number(m)); } } continue; }
          if (ch.nodeType !== 1 || ch.classList.contains('ws-card-badge') || ch.hasAttribute('data-tc-badge')) continue;
          // a group of pictures is a number of the task too (3 camels + 1 camel + 4 camels is the fact 1, 3, 4, 8)
          if (ch.dataset && /^\d+$/.test(ch.dataset.lcsGroup || '')) { nums.push(Number(ch.dataset.lcsGroup)); given.push(Number(ch.dataset.lcsGroup)); }
          if (ch.dataset && ch.dataset.lcsAnswer !== undefined) { kind.push('?'); for (const m of String(ch.dataset.lcsAnswer).match(/\d+/g) || []) nums.push(Number(m)); if (!ch.children.length) continue; }
          walk(ch);
        }
      })(c);
      const answers = (!legacy && c.dataset.lcsAnswer !== undefined ? [c] : []).concat([...c.querySelectorAll('[data-lcs-answer]')]).map((e) => e.dataset.lcsAnswer).filter((a) => legacy || a !== '');   // (an empty answer is a box only the key fills)
      const correct = [...c.querySelectorAll('[data-lcs-correct]')].filter((e) => legacy || !/^(0|false)$/.test(e.dataset.lcsCorrect || ''));
      const imgs = [...new Set([...c.querySelectorAll('img')].map((i) => (i.getAttribute('src') || '').split('/').slice(-2).join('/')))].sort();
      const first = correct[0];
      const choice = correct.map((e) => (e.textContent || '').trim() || e.dataset.lcsChoice || e.dataset.lcsSym || ((e.querySelector('img') || e).getAttribute('src') || '').split('/').slice(-2).join('/') || 'option ' + [...e.parentElement.children].indexOf(e));
      const sorted = nums.slice().sort((a, b) => a - b);
      // what the card shows, as a fingerprint: its markup without its number on the page
      const shownAs = c.innerHTML.replace(/<span class="ws-card-badge">[^<]*<\/span>/, '').replace(/\s+/g, ' ');
      // (a row: what it says, whatever its place on the page — the same sentence in row 2 and in row 5 is one task)
      const says = (() => { const k = c.cloneNode(true); for (const e of k.querySelectorAll('[data-tc-badge]')) e.remove(); return (k.textContent || '').trim().replace(/\s+/g, ' '); })();
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
        html: found.open + c.outerHTML + found.close, plainHtml: c.innerHTML.replace(/\s+/g, ' '), w: Math.round(r.width), h: Math.round(r.height),
        answers: answers.length + correct.length, ans: answers.concat(choice).join('|'),
        pos: first ? [...first.parentElement.children].indexOf(first) : null,
        kind: kind.join(' ').replace(/\s+/g, ' '), nums: sorted, given, mag: sorted.length ? sorted[sorted.length - 1] : 0,
        // two or more numbers are a fact (4 + 1 = 5 is 1 + 4 = 5); a card with one number or none is the same task
        // only when it shows the same thing (two shapes with four sides are two tasks)
        // … and a card that prints ONE number and asks about it (9: odd or even? 20: which word?) is the task of that number
        // (the DIFFERENT numbers: a fact-family house prints 7, 3 and 4 a dozen times and is still the fact 3, 4, 7,
        // the same one as "7 − 4 = ?" two parts further down)
        key: legacy ? (sorted.length >= 2 ? 'n:' + [...new Set(sorted)].join(',') : given.length === 1 ? 'n:' + given[0] : 'v:' + look)
          : /\p{L}{2}/u.test(says) ? 't:' + says + '|' + imgs.join(',') : imgs.length ? 'p:' + imgs.join(',') : 'v:' + look,
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
    const els = found.units;
    const pics = (c) => [...c.querySelectorAll('img,svg')].map((e) => { const b = e.getBoundingClientRect(); return Math.round(b.width) + 'x' + Math.round(b.height); }).join(',');
    const before = els.map(pics);
    grid.style.cssText += ';flex:0 0 auto !important;height:auto !important;grid-template-rows:none !important;grid-auto-rows:max-content !important;align-content:start !important;align-items:start !important';
    if (!legacy) for (const c of els) c.style.cssText += ';flex:0 0 auto !important;height:auto !important;min-height:0 !important';
    els.forEach((c, i) => { const r = c.getBoundingClientRect(); cards[i].nh = pics(c) === before[i] && r.height > 20 ? Math.min(cards[i].h, Math.ceil(r.height)) : cards[i].h; });
    return { alone: true, cols, cards, styles: found.styles, legacy };
  });
  fs.unlinkSync(file);
  if (!cut) return { refused: 'no tasks found on the page (no cards, no three rows alike)' };
  if (!cut.alone) return { refused: 'something stands beside the cards (a bank, a line, a legend)' };
  if (cut.cards.length < 2) return { refused: 'fewer than two cards' };

  // ---- the type's OWN answer key (Part 7.2) ----
  // Many types draw their key themselves when asked (ctx.answerKey: a ring round the right picture, a sample of the
  // colouring, a badge on the missing piece). The same page is built again from the same seed in that mode: its cards
  // are the key cards of the check, and a card the child circles or colours gets its answer from what the key marks.
  let keyCards = null, keyStyles = [];
  try {
    const builtKey = await type.build({ theme: usedTheme, difficulty: o.difficulty || DIFFICULTY, locale, unit: null }, { rng: makeRng(seed + '|' + type.id), variant, answerKey: true });
    fs.writeFileSync(file, buildPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: builtKey.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' }), 'utf8');
    await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ content: FIND });
    const got = await page.evaluate((pageStyles) => {
      const MARK = '[data-lcs-correct],[data-lcs-key-ring],[data-lcs-key-badge],[data-lcs-key-sample]';
      const found = window.__tcFind();
      if (!found) return null;
      // the style sheets only the key page has: what their rules select is what the key marks
      const own = [...found.body.querySelectorAll('style')].filter((x) => !pageStyles.includes(x.outerHTML));
      const ruled = new Set(), placed = new Set(), keyStyles = [];
      for (const st of own) for (const rule of (st.sheet ? [...st.sheet.cssRules] : [])) {
        if (!rule.selectorText) continue;
        // a rule that names a card by its place ([data-lcs-card="2"] …) cannot travel: a check numbers its boxes anew.
        // Any other rule travels with its part as it is (it may draw the answer itself: ::after{content:attr(…)}).
        // … and so does a rule that names a card by its ORDER on the page ([data-lcs-row]:nth-child(2) …): carried along,
        // the rules of eight pages rang every option of a cut row (review sv.review-1: all four shapes ringed). A rule
        // that counts INSIDE a card (… > [data-lcs-choice]:nth-child(3)) names no place and travels.
        const byOrder = (sel) => sel.split(',').some((part) => { const re = /:nth-(?:last-)?(?:child|of-type)\([^)]*\)/g; let m; while ((m = re.exec(part))) { try { for (const e of document.querySelectorAll(part.slice(0, m.index + m[0].length))) if (found.units.some((u) => u === e || e.contains(u))) return true; } catch (err) { /* a selector this page cannot read */ } } return false; });
        const place = /\[data-lcs-(card|row|item|box|n|idx|pos)="?\d+"?\]/.test(rule.selectorText) || byOrder(rule.selectorText);
        if (!place) keyStyles.push(rule.selectorText + '{' + rule.style.cssText + '}');
        const plainSel = rule.selectorText.replace(/::?(after|before)/g, '');
        try { for (const e of document.querySelectorAll(plainSel)) { ruled.add(e); if (place) placed.add(e); } } catch (e) { /* a selector this page cannot read */ }
      }
      // … and the mark goes ONTO what they select: such rules name a card by its place on its page ([data-lcs-card="2"] …),
      // and a check takes cards of several pages and numbers them anew, so the rules themselves cannot be carried along
      for (const e of placed) e.setAttribute('data-tc-correct', '');
      const cardsOut = (() => {
      return found.units.map((c) => {
        let marks = [...c.querySelectorAll(MARK)].filter((e) => found.legacy || !/^(0|false)$/.test(e.dataset.lcsCorrect || ''));
        if (!marks.length) marks = [...c.querySelectorAll('*')].filter((e) => ruled.has(e));
        const say = (e) => (e.textContent || '').trim() || e.dataset.lcsLabel || e.dataset.lcsChip || e.dataset.lcsDigit || e.dataset.lcsChoice || e.dataset.lcsSym || ((e.querySelector('img') || e).getAttribute('src') || '').split('/').slice(-2).join('/') || 'mark ' + [...e.parentElement.children].indexOf(e);
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
        // an answer the key mode WRITES (the letter a picture begins with): read where the page mode has none
        const written = [...c.querySelectorAll('[data-lcs-answer]')].map((e) => e.dataset.lcsAnswer).filter((a) => a !== '');
        // an answer box without room (hidden on paper, shown only on screen): the key of a check could not write into it
        const blind = [...c.querySelectorAll('[data-lcs-answer]')].filter((e) => { if (e.namespaceURI === 'http://www.w3.org/2000/svg' || (e.textContent || '').trim() || e.dataset.lcsAnswer === '') return false; const b = e.getBoundingClientRect(); return !(b.width > 6 && b.height > 6); }).length;
        return { html: found.open + c.outerHTML + found.close, marks: marks.length, says: marks.map(say).join('|'), pos: marks[0] ? [...marks[0].parentElement.children].indexOf(marks[0]) : null, ask, twins, written, blind, plainHtml: c.innerHTML.replace(/\s+/g, ' ') };
      });
      })();
      return { cards: cardsOut, keyStyles };
    }, cut.styles || []);
    keyCards = got ? got.cards : null; keyStyles = got ? got.keyStyles : [];
    fs.unlinkSync(file);
  } catch (e) { keyCards = null; try { fs.unlinkSync(file); } catch (e2) { /* gone */ } }
  if (keyCards && keyCards.length === cut.cards.length) {
    cut.cards.forEach((c, i) => {
      const k = keyCards[i];
      c.keyHtml = k.html;
      if (!c.answers && k.marks) { c.answers = k.marks; c.ans = k.marks + ':' + k.says; c.pos = k.pos; c.ask = k.ask; c.twins = k.twins; }
      if (!cut.legacy && k.blind) c.blind = true;
      if (!c.answers && k.written.length) { c.answers = k.written.length; c.ans = k.written.join('|'); }
      // … and a key that DRAWS its answer without a mark the cutter knows (a ring by a style, a word written in): the
      // card has an answer when its key card is not its page card
      if (!c.answers && !cut.legacy && k.plainHtml !== c.plainHtml) { c.answers = 1; let h = 5381; for (let j = 0; j < k.plainHtml.length; j++) h = ((h << 5) + h + k.plainHtml.charCodeAt(j)) >>> 0; c.ans = 'key:' + h.toString(16); }
    });
  }
  if (cut.cards.some((c) => !c.answers)) return { refused: NO_ANSWER };
  if (cut.cards.some((c) => c.blind)) return { refused: 'its key cannot show an answer (an answer box without room on paper)' };
  if (!cut.legacy) for (const c of cut.cards) {
    const parts = String(c.ans).split('|');
    if (parts.every((a) => /^\d+$/.test(a))) continue;                       // a count stays a number task
    c.kind = (c.pos != null ? 'choose' : 'write') + ' ' + c.answers; c.nums = []; c.given = []; c.mag = 0;
    c.len = c.pos != null ? 0 : parts.join('').replace(/[^\p{L}]/gu, '').length;
  }
  for (const c of cut.cards) delete c.plainHtml;
  return { cols: cut.cols, cards: cut.cards, styles: cut.styles || [], keyStyles, instruction: strings.instruction, title: strings.printTitle || strings.title };
  };
  // Copy 1 at the core level is the PUBLISHED page; several types build it without their key mode (the published page
  // is kept byte for byte). Their copy 2 is the same page of other words WITH its key: taken when copy 1 has no answers.
  let r = await attempt(1);
  if (r.refused === NO_ANSWER && type.interactive) { const r2 = await attempt(2); if (!r2.refused) r = r2; }
  return r;
}

module.exports = { cutCards, DIFFICULTY };
