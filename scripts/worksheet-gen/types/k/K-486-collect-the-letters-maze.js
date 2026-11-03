/**
 * K-486 — Collect the Letters (Mazes maker 2026-11-02, NEW-TEMPLATES §28 T3): literacy inside a maze. The way from the
 * start to the picture passes letters; taken in order they spell the picture's name, which the child writes in the
 * boxes at the end. Decoy letters sit in the dead ends (a wrong turn collects a letter that is not in the word).
 *
 * A perfect grid maze (lib/maze.js: exactly one way), so the letters on the way are fixed by construction; the word is
 * the picture's own name in the page's language (the reviewed picture words: freshKeep, letters only, the level's
 * length; German nouns keep their capital). Levels: 1 a 5 × 5 maze, words of 3–4 letters, 3 decoys · 2 a 6 × 6 maze,
 * 4–5 letters, 5 decoys · 3 a 7 × 7 maze, 5–7 letters, 7 decoys.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { generateMaze } = require('../../lib/maze.js');
const { wayBetween, frameWithOpenings, wallLines } = require('../../lib/maze-ways.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const slot = require('../../lib/slot.js');

const D = {
  // sized to the body: start arrow 40 + maze n·cell + picture 1.25·cell ≤ 670 px across
  1: { n: 5, letters: [3, 4], decoys: 3, cell: 94 },
  2: { n: 6, letters: [4, 5], decoys: 5, cell: 82 },
  3: { n: 7, letters: [5, 7], decoys: 7, cell: 72 },
};
const ALPHA = { en: 'abcdefghijklmnopqrstuvwxyz', de: 'abcdefghijklmnopqrstuvwxyzäöüß', fr: 'abcdefghijklmnopqrstuvwxyz', es: 'abcdefghijklmnñopqrstuvwxyz', pt: 'abcdefghijklmnopqrstuvwxyz', it: 'abcdefghilmnopqrstuvz', nl: 'abcdefghijklmnopqrstuvwxyz', sv: 'abcdefghijklmnopqrstuvwxyzåäö', da: 'abcdefghijklmnopqrstuvwxyzæøå', no: 'abcdefghijklmnopqrstuvwxyzæøå', fi: 'abcdefghijklmnopqrstuvwxyzåäö' };

module.exports = {
  id: 'K-486',
  slug: 'collect-the-letters-maze',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'mazes',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: D,
  i18n: {
    en: {
      title: 'Collect the Letters Maze',
      instruction: 'Draw the way to the picture. Collect the letters on your way, then write the word in the boxes.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, loc = String(locale || 'en').slice(0, 2), key = !!(ctx && ctx.answerKey);
    let pool = entriesFor(theme, loc).filter((e) => freshKeep(theme, e, loc)).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length >= d.letters[0] && [...e.word].length <= d.letters[1]);
    pool = distinctByWord(pool, (e) => e.word.toLocaleLowerCase(loc));
    if (!pool.length) throw new Error(`K-486: theme ${theme}/${loc} has no picture word of ${d.letters.join('-')} letters`);
    // the goal picture is the page's slot (the teacher may pick another of the theme's pictures that fits the level)
    const pickNoun = slot.pictures(ctx, [rng.pick(pool)], pool, theme, 'pic')[0];
    const goal = pool.find((e) => e.noun === pickNoun.noun) || pool[0];
    const letters = [...goal.word];
    let maze = null;
    for (let t = 0; t < 300 && !maze; t++) {
      const { walls } = generateMaze({ cols: d.n, rows: d.n, rng });
      const way = wayBetween(walls, d.n, d.n, [0, 0], [d.n - 1, d.n - 1]);
      if (way.length < letters.length * 2) continue;
      // the letters spread along the way (never on the start cell), the last one a cell before the goal or on it
      const at = letters.map((_, i) => Math.round(1 + i * (way.length - 2) / Math.max(1, letters.length - 1)));
      const onWay = new Set(way.map((p) => p.join(',')));
      const off = [];
      for (let y = 0; y < d.n; y++) for (let x = 0; x < d.n; x++) if (!onWay.has(x + ',' + y)) off.push([x, y]);
      if (off.length < d.decoys) continue;
      maze = { walls, way, at, off };
    }
    if (!maze) throw new Error('K-486: no maze long enough for the word');
    // decoys: letters NOT in the word (a wrong turn never collects a letter the word needs), in dead-end cells
    const abc = [...(ALPHA[loc] || ALPHA.en)].filter((ch) => !letters.map((l) => l.toLocaleLowerCase(loc)).includes(ch));
    const decoyCells = rng.sample(maze.off, d.decoys);
    const c = d.cell, W = d.n * c;
    const stone = (p, ch, attrs) => `<g ${attrs}><circle cx="${(p[0] + 0.5) * c}" cy="${(p[1] + 0.5) * c}" r="${(c * 0.34).toFixed(1)}" fill="#FFFFFF" stroke="${tokens.color.coral}" stroke-width="2.5"/><text x="${(p[0] + 0.5) * c}" y="${((p[1] + 0.5) * c + c * 0.15).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="${Math.round(c * 0.42)}" fill="${tokens.color.ink}">${ch}</text></g>`;
    const wayStones = letters.map((ch, i) => stone(maze.way[maze.at[i]], ch, `data-lcs-word-letter="${i + 1}"`)).join('');
    const decoyLetters = rng.sample(abc, d.decoys);   // all different (two of one decoy would look like a clue)
    const decoys = decoyCells.map((p, i) => stone(p, decoyLetters[i], 'data-lcs-decoy-letter="1"')).join('');
    const pts = maze.way.map((p) => `${(p[0] + 0.5) * c},${(p[1] + 0.5) * c}`).join(' ');
    const keyLine = key ? `<polyline points="${pts}" fill="none" stroke="${tokens.color.coral}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.55" data-lcs-key-sample="way"/>` : '';
    const open = [{ side: 'left', at: 0 }, { side: 'right', at: d.n - 1 }];
    const arrow = `<path d="M -30 ${0.5 * c - 10} L -10 ${0.5 * c} L -30 ${0.5 * c + 10} Z" fill="${tokens.color.coral}"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W + 40}" height="${W + 8}" viewBox="-34 -4 ${W + 40} ${W + 8}" role="img" aria-label="maze" data-lcs-prim="maze" data-lcs-cols="${d.n}" data-lcs-rows="${d.n}" data-lcs-way="${maze.way.map((p) => p.join(',')).join(' ')}">${keyLine}${frameWithOpenings(d.n, d.n, c, open)}${wallLines(maze.walls, c)}${wayStones}${decoys}${arrow}</svg>`;
    const picPx = Math.round(c * 1.25);
    const pic = `<img class="ws-icon" src="${fileUri(theme, goal.noun)}" alt="" data-lcs-noun="${goal.vocabKey}"${slot.attr(ctx, 'pic', 0)} style="position:absolute;left:${W + 40 + 4}px;top:${(d.n - 0.5) * c + 4 - picPx / 2}px;width:${picPx}px;height:${picPx}px">`;
    const boxW = Math.min(56, Math.floor(520 / letters.length) - 8);
    const boxes = letters.map((ch, i) => `<span class="ws-answerbox" data-lcs-answer="${ch}" data-lcs-word-box="${i + 1}" style="display:inline-block;width:${boxW}px;height:${boxW + 8}px;border:2.5px solid ${tokens.color.teal};border-radius:8px;background:#FFFFFF;font-size:${Math.round(boxW * 0.62)}px;line-height:${boxW + 4}px;text-align:center"></span>`).join('');
    const body = `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px">` +
      `<div style="position:relative;width:${W + 40 + picPx + 8}px;height:${W + 8}px">${svg}${pic}</div>` +
      `<div data-lcs-word="${letters.length}" style="display:flex;gap:8px">${boxes}</div></div>`;
    return { bodyHtml: body, meta: { word: goal.word } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('svg[data-lcs-way]');
      if (!svg) return ['no maze'];
      const way = svg.dataset.lcsWay.split(' ');
      const cols = +svg.dataset.lcsCols, rows = +svg.dataset.lcsRows;
      // the drawn walls make exactly one way between the corners: a perfect maze has slots − (cells − 1) walls
      const walls = svg.querySelectorAll('[data-lcs-wall]').length, slots = cols * (rows - 1) + rows * (cols - 1);
      if (walls !== slots - (cols * rows - 1)) fails.push(`the maze has ${walls} walls (a maze with one way has ${slots - (cols * rows - 1)})`);
      const letters = [...svg.querySelectorAll('[data-lcs-word-letter]')].sort((a, b) => +a.dataset.lcsWordLetter - +b.dataset.lcsWordLetter);
      const boxes = [...document.querySelectorAll('[data-lcs-word-box]')];
      if (!letters.length || letters.length !== boxes.length) fails.push(`${letters.length} letters on the way for ${boxes.length} boxes`);
      const word = letters.map((g) => g.textContent).join('');
      if (boxes.map((b) => b.dataset.lcsAnswer).join('') !== word) fails.push('the boxes do not spell the letters on the way');
      boxes.forEach((b) => { if (b.textContent.trim()) fails.push('a letter printed in a box'); });
      // the letters sit on cells of the way, in its order (cell px = the drawn width / cols)
      const c = (svg.viewBox.baseVal.width - 40) / cols;
      const idx = letters.map((g) => { const ci = g.querySelector('circle'); return way.indexOf(Math.floor(+ci.getAttribute('cx') / c) + ',' + Math.floor(+ci.getAttribute('cy') / c)); });
      if (idx.some((i) => i < 0)) fails.push('a word letter is off the way');
      if (idx.some((v, i) => i && v <= idx[i - 1])) fails.push('the word letters are not in the order of the way');
      const decoys = [...svg.querySelectorAll('[data-lcs-decoy-letter]')].map((g) => g.textContent.toLowerCase());
      for (const ch of decoys) if (word.toLowerCase().includes(ch)) fails.push(`a decoy letter "${ch}" is in the word`);
      if (!document.querySelector('img[data-lcs-noun]')) fails.push('no goal picture');
      return fails;
    });
  },
};
