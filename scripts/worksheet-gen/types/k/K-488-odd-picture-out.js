/**
 * K-488 — Which Picture Is Different? (Find the Differences maker 2026-11-02, NEW-TEMPLATES §29 T1): three or four
 * copies of one scene; ONE copy carries one change, and the child circles that picture. Comparing many copies at once
 * is the step past the two-picture pages (look across, hold one picture in mind, check it against each of the others).
 *
 * The change is one gated candidate of the scene (lib/fd-compose.js pickOps, n = 1), and the page's own raster diff
 * proves it: the other copies are pixel-identical, the odd one differs from them in exactly one visible place. The odd
 * picture's position comes from the copy's rng (a uniform draw, so no place is the usual answer).
 * Levels: 1 three pictures, a BIG change (something gone, new or swapped) · 2 four pictures, gone / new / swapped /
 * bigger or smaller / flipped · 3 four pictures, every kind incl. a moved drawing or a changed detail, smaller floors.
 */
'use strict';
const F = require('../../lib/fd-faces.js');

const D = {
  // pw 320 (two columns + 15 px) · the numeral above each picture: 2 × (40 + 299) + 18 = 696 of the 733 px a long
  // title + key suffix leaves (330 ran 16 px past the footer on a 3-line key title, fr / es 2026-11-02)
  1: { panels: 3, pw: 320, ops: { kinds: ['remove', 'add', 'swap'], ring: 64, area: 2600 } },
  2: { panels: 4, pw: 320, ops: { kinds: ['remove', 'add', 'swap', 'scale', 'mirror'], ring: 56, area: 1800 } },
  3: { panels: 4, pw: 320, ops: { kinds: F.LINE_ALL, ring: 40, area: 900, move: 80 } },
};

/** the page's one change: a gated candidate of the scene, its kind drawn first (fd-faces pickSpread) */
const compose = (scene, d, rng) => ({ scene, r: F.pickSpread(scene, { n: 1, ...d.ops }, d.pw, rng) });

module.exports = {
  id: 'K-488',
  slug: 'which-picture-is-different',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Which Picture Is Different?',
      instruction: 'All the pictures are the same except one. Circle the picture that is different.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    // a teacher's longer title gives the pictures back their px (fitsChrome; the copy's change is composed at the print size)
    const extra = (ctx && ctx.chromeExtra) || 0;
    const pw = extra ? Math.floor(d.pw * Math.max(0.7, 1 - extra / 700)) : d.pw, ph = Math.round(pw * F.H / F.W);
    const got = F.sceneFor('K-488', difficulty, ctx, (scene) => compose(scene, d, rng));
    const odd = rng.int(0, d.panels - 1);
    const cell = (i) => {
      const isOdd = i === odd;
      const svg = F.panel(got.scene, isOdd ? got.r.ops : [], { width: pw, clipId: `fdo${i}`, attrs: ` data-lcs-fd-panel="${i + 1}"`, ...(key && isOdd ? { rings: got.r.rings } : {}) });
      // the picture is the option (the key layer rings [data-lcs-correct]: border-radius inline, so the ring follows the frame)
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 ${pw}px">${F.numberDisc(i + 1)}` +
        `<div data-lcs-choice="1" data-lcs-label="${i + 1}"${isOdd ? ' data-lcs-correct=""' : ''} style="position:relative;width:${pw}px;height:${ph}px;border-radius:20px">${svg}</div></div>`;
    };
    const cells = Array.from({ length: d.panels }, (_, i) => cell(i));
    // rows of two (three pictures: one on top, centred, then two)
    const rows = d.panels === 3 ? [[cells[0]], [cells[1], cells[2]]] : [[cells[0], cells[1]], [cells[2], cells[3]]];
    const body = `<div data-ws-content${require('../../lib/fl-art.js').tap(ctx)} data-lcs-fd-face="odd" data-lcs-fd-unit="${got.id}" data-lcs-fd-odd="${odd + 1}"${key ? ' data-lcs-fd-key="1"' : ''} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">` +
      rows.map((r) => `<div style="display:flex;gap:15px;justify-content:center;width:675px">${r.join('')}</div>`).join('') + `</div>`;
    return { bodyHtml: body, meta: { unit: got.id, odd: odd + 1, op: got.r.ops.map((c) => c.kind).join(',') } };
  },

  /** the pin tool's test (tools/build-fd-face-pins.js) */
  pinFits(scene, level) { return F.fits('K-488', level, scene, (s, rng) => compose(s, D[level], rng)); },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const cells = [...document.querySelectorAll('[data-lcs-choice]')];
      return { n: cells.length, odd: cells.map((c, i) => (c.hasAttribute('data-lcs-correct') ? i + 1 : 0)).filter(Boolean) };
    });
    if (info.n < 3) fails.push(`${info.n} pictures to choose from`);
    if (info.odd.length !== 1) return fails.concat([`${info.odd.length} pictures marked as the different one`]);
    const odd = info.odd[0], ref = odd === 1 ? 2 : 1;
    const sel = (i) => `svg[data-lcs-fd-panel="${i}"]`;
    for (let i = 1; i <= info.n; i++) {
      if (i === ref) continue;
      const r = await F.changes(page, sel(ref), sel(i));
      if (r.error) { fails.push(`picture ${i}: ${r.error}`); continue; }
      if (i === odd && r.comps.length !== 1) fails.push(`the different picture shows ${r.comps.length} visible changes (1 expected)`);
      if (i !== odd && r.comps.length) fails.push(`picture ${i} differs from picture ${ref} in ${r.comps.length} places (the same expected)`);
    }
    return fails.concat(await F.pageChecks(page));
  },
};
