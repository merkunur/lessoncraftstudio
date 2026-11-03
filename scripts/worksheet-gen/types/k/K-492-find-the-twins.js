/**
 * K-492 — Which Two Are the Same? (Find the Differences maker 2026-11-02, NEW-TEMPLATES §29 T5): four or five copies of
 * one scene; two are exactly alike, every other copy carries its OWN single change, and the child circles the two that
 * are the same. Each wrong copy differs from the twins in one place and from every other copy in two, so the only way
 * to the answer is to compare (no copy stands out as "the odd one").
 *
 * The changes are gated candidates of the scene (lib/fd-compose.js via fd-faces pickSpread: different kinds where the
 * scene allows), one per wrong copy; the page's raster diff proves the twins identical and every other copy one
 * visible change away. The twins' places come from the copy's rng.
 * Levels: 1 four pictures (two pairs of rows), BIG changes · 2 five smaller pictures, big changes · 3 five pictures,
 * smaller changes and a flipped drawing among the kinds.
 */
'use strict';
const F = require('../../lib/fd-faces.js');

const D = {
  // 1: two columns of 330 px, the numeral above · 2-3: two columns of 243 px, the numeral beside (three rows fill the body)
  1: { panels: 4, pw: 320, ops: { kinds: ['remove', 'add', 'swap'], ring: 64, area: 2600 } },
  2: { panels: 5, pw: 243, ops: { kinds: ['remove', 'add', 'swap', 'scale'], ring: 72, area: 3200 } },
  3: { panels: 5, pw: 243, ops: { kinds: ['remove', 'add', 'swap', 'scale', 'mirror'], ring: 56, area: 2200 } },
};

/** one change per wrong copy: gated candidates of the scene, of different kinds where it allows (fd-faces pickSpread) */
const compose = (scene, d, rng) => ({ scene, r: F.pickSpread(scene, { n: d.panels - 2, ...d.ops }, d.pw, rng) });

module.exports = {
  id: 'K-492',
  slug: 'which-two-pictures-are-the-same',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Which Two Pictures Are the Same?',
      instruction: 'Two of the pictures are exactly the same. Find them and circle both.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    // a teacher's longer title gives the pictures back their px (fitsChrome; the changes are composed at the print size)
    const extra = (ctx && ctx.chromeExtra) || 0;
    // level 1's four pictures are drawn at 310 px (composed at 320): a key title that wraps (fr, es) still clears the footer
    const pw0 = d.pw >= 300 ? 310 : d.pw;
    const pw = extra ? Math.floor(pw0 * Math.max(0.7, 1 - extra / 700)) : pw0, ph = Math.round(pw * F.H / F.W);
    const got = F.sceneFor('K-492', difficulty, ctx, (scene) => compose(scene, d, rng));
    const twins = rng.sample(Array.from({ length: d.panels }, (_, i) => i), 2).sort((a, b) => a - b);
    // the wrong copies take the changes in a shuffled order (the change on copy 1 is not always the composer's first)
    const order = rng.shuffle(got.r.ops.map((_, i) => i));
    let w = 0;
    const opOf = Array.from({ length: d.panels }, (_, i) => (twins.includes(i) ? null : order[w++]));
    const above = d.pw >= 300;
    const cell = (i) => {
      const j = opOf[i];
      const svg = F.panel(got.scene, j == null ? [] : [got.r.ops[j]], { width: pw, clipId: `fdt${i}`, attrs: ` data-lcs-fd-panel="${i + 1}"`, ...(key && j != null ? { rings: [got.r.rings[j]] } : {}) });
      const pic = `<div data-lcs-pick="1" data-lcs-label="${i + 1}"${j == null ? ' data-lcs-correct=""' : ''} style="position:relative;width:${pw}px;height:${ph}px;border-radius:20px;flex:0 0 ${pw}px">${svg}</div>`;
      return above ? `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${F.numberDisc(i + 1)}${pic}</div>`
        : `<div style="display:flex;align-items:flex-start;gap:6px">${F.numberDisc(i + 1)}${pic}</div>`;
    };
    const cells = Array.from({ length: d.panels }, (_, i) => cell(i));
    const rows = [];
    for (let i = 0; i < cells.length; i += 2) rows.push(cells.slice(i, i + 2));
    const body = `<div data-ws-content data-lcs-fd-face="twins" data-lcs-fd-unit="${got.id}" data-lcs-fd-twins="${twins.map((t) => t + 1).join(',')}"${key ? ' data-lcs-fd-key="1"' : ''} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${above ? 18 : 14}px">` +
      rows.map((r) => `<div style="display:flex;gap:${above ? 15 : 22}px;justify-content:center;width:675px">${r.join('')}</div>`).join('') + `</div>`;
    return { bodyHtml: body, meta: { unit: got.id, twins: twins.map((t) => t + 1).join(','), ops: got.r.ops.map((c) => c.kind).join(',') } };
  },

  /** the pin tool's test (tools/build-fd-face-pins.js) */
  pinFits(scene, level) { return F.fits('K-492', level, scene, (s, rng) => compose(s, D[level], rng)); },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const cells = [...document.querySelectorAll('[data-lcs-pick]')];
      return { n: cells.length, twins: cells.map((c, i) => (c.hasAttribute('data-lcs-correct') ? i + 1 : 0)).filter(Boolean) };
    });
    if (info.n < 4) fails.push(`${info.n} pictures to choose from`);
    if (info.twins.length !== 2) return fails.concat([`${info.twins.length} pictures marked as the twins (2 expected)`]);
    const sel = (i) => `svg[data-lcs-fd-panel="${i}"]`;
    const [a, b] = info.twins;
    const t = await F.changes(page, sel(a), sel(b));
    if (t.error) fails.push(`twins: ${t.error}`); else if (t.comps.length) fails.push(`the twins differ in ${t.comps.length} places`);
    const others = Array.from({ length: info.n }, (_, i) => i + 1).filter((i) => i !== a && i !== b);
    for (const i of others) {
      const r = await F.changes(page, sel(a), sel(i));
      if (r.error) { fails.push(`picture ${i}: ${r.error}`); continue; }
      if (r.comps.length !== 1) fails.push(`picture ${i} differs from the twins in ${r.comps.length} places (1 expected)`);
    }
    for (let x = 0; x < others.length; x++) for (let y = x + 1; y < others.length; y++) {
      const r = await F.changes(page, sel(others[x]), sel(others[y]));
      if (!r.error && !r.comps.length) fails.push(`pictures ${others[x]} and ${others[y]} are also the same`);
    }
    return fails.concat(await F.pageChecks(page));
  },
};
