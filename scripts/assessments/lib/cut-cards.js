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
 *     { cols, cards: [{ html, w, h, sig, answers }], instruction, title }
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
      const marks = [...c.querySelectorAll('*')].flatMap((e) => Object.entries(e.dataset).filter(([k]) => k.startsWith('lcs')).map(([k, v]) => k + '=' + v));
      return { html: c.outerHTML, w: Math.round(r.width), h: Math.round(r.height), answers: c.querySelectorAll('[data-lcs-answer],[data-lcs-correct]').length, pos: (() => { const e = c.querySelector('[data-lcs-correct]'); return e ? [...e.parentElement.children].indexOf(e) : null; })(), ans: [...c.querySelectorAll('[data-lcs-answer]')].map((e) => e.dataset.lcsAnswer).concat([...c.querySelectorAll('[data-lcs-correct]')].map((e) => (e.textContent || '').trim() || e.dataset.lcsChoice || e.dataset.lcsSym || ((e.querySelector('img') || e).getAttribute('src') || '').split('/').slice(-2).join('/') || 'option ' + [...e.parentElement.children].indexOf(e))).join('|'), sig: (c.innerText || '').replace(/\s+/g, ' ').trim() + ' # ' + marks.join(' ') + ' # ' + [...c.querySelectorAll('img')].map((i) => (i.getAttribute('src') || '').split('/').slice(-2).join('/')).join(' ') };
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
