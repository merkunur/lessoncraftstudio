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
 *   key          what makes two cards THE SAME TASK: the same numbers (in any order: 4 and 1 is 1 and 4), or for a
 *                card without numbers the same pictures
 *   plain        false for a number a check should not lean on when another card exists (a two-digit number with
 *                two equal digits: swapping tens and ones goes unnoticed)
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
  let built = null;
  for (const theme of themed ? [o.theme, 'animals'] : [null]) {
    try { built = await type.build({ theme, difficulty: DIFFICULTY, locale, unit: null }, { rng: makeRng(seed + '|' + type.id), variant: 1 }); break; } catch (e) { built = null; }
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
      const kind = [], nums = [];
      (function walk(n) {
        for (const ch of n.childNodes) {
          if (ch.nodeType === 3) { const t = ch.textContent.trim(); if (t) { kind.push(t.replace(/\d+/g, 'n').replace(/\p{L}+/gu, 'w')); for (const m of t.match(/\d+/g) || []) nums.push(Number(m)); } continue; }
          if (ch.nodeType !== 1 || ch.classList.contains('ws-card-badge')) continue;
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
      return {
        html: c.outerHTML, w: Math.round(r.width), h: Math.round(r.height),
        answers: answers.length + correct.length, ans: answers.concat(choice).join('|'),
        pos: first ? [...first.parentElement.children].indexOf(first) : null,
        kind: kind.join(' ').replace(/\s+/g, ' '), nums: sorted, mag: sorted.length ? sorted[sorted.length - 1] : 0,
        // two or more numbers are a fact (4 + 1 = 5 is 1 + 4 = 5); a card with one number or none is the same task
        // only when it shows the same thing (two shapes with four sides are two tasks)
        key: sorted.length >= 2 ? 'n:' + sorted.join(',') : 'v:' + look,
        look,
        plain: !answers.some((a) => /^(\d)\1$/.test(String(a))),
      };
    });
    return { alone: true, cols, cards };
  });
  fs.unlinkSync(file);
  if (!cut) return { refused: 'no card grid on the page' };
  if (!cut.alone) return { refused: 'something stands beside the cards (a bank, a line, a legend)' };
  if (cut.cards.length < 2) return { refused: 'fewer than two cards' };
  if (cut.cards.some((c) => !c.answers)) return { refused: 'a card carries no answer in its markup' };
  return { cols: cut.cols, cards: cut.cards, instruction: strings.instruction, title: strings.printTitle || strings.title };
}

module.exports = { cutCards, DIFFICULTY };
