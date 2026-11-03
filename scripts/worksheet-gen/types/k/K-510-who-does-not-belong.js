/**
 * K-510 — Who Does Not Belong? (Sorting maker 2026-11-02, NEW-TEMPLATES §24 T3): labelled groups of pictures; in each
 * group one picture does not belong to the group its label names, and the child circles it (L.K.5.a categories — the
 * label makes the rule explicit, where "which one is different" K-043 leaves it unsaid).
 *
 * Every group and its intruder come from the reviewed sorting lists the maker already uses (data/literacy/category-vocab
 * Animals · Fruits · Vehicles; data/science/can-fly-vs-cannot; data/science/food-groups): the members are items of the
 * group's own bin, the intruder an item of ANOTHER bin of the same list — a reviewed "not this group", never an
 * arguable one. An item retired in the page's language is never drawn. The intruder's place is the group's shuffle.
 * Slots: every member is a slot of its group (g<k>: any picture of that group's own list), the odd one a slot of the
 * list's other groups (x<k>); a choice already on the page is refused (one picture in two groups).
 * Levels: 1 three groups (animals / fruits / vehicles), four pictures each · 2 three groups (+ things that can fly),
 * five pictures each · 3 the four food groups, four pictures each (near categories: a vegetable among fruits).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const CAT = require('../../data/literacy/category-vocab.json');
const FLY = require('../../data/science/can-fly-vs-cannot.json');
const FOOD = require('../../data/science/food-groups.json');
const D = {
  1: { groups: [[CAT, 'Animals'], [CAT, 'Fruits'], [CAT, 'Vehicles']], pick: 3, members: 3 },
  2: { groups: [[CAT, 'Animals'], [CAT, 'Fruits'], [CAT, 'Vehicles'], [FLY, 'canfly']], pick: 3, members: 4 },
  3: { groups: [[FOOD, 'fruits'], [FOOD, 'vegetables'], [FOOD, 'grains'], [FOOD, 'protein']], pick: 4, members: 3 },
};
const retiredIn = (it, L) => it.retired === true || (Array.isArray(it.retired) && it.retired.includes(L));

module.exports = {
  id: 'K-510',
  slug: 'who-does-not-belong',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sorting-categories',
  themeAxis: { applicable: false },
  difficulty: { 1: { pick: 3 }, 2: { pick: 3 }, 3: { pick: 4 } },
  i18n: {
    en: {
      title: 'Which One Does Not Belong?',
      instruction: 'Read the name of each group. Circle the one picture that does not belong in that group.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const live = (data, bin) => Object.values(data.items).filter((it) => it.bin === bin && !retiredIn(it, L));
    const groups = rng.sample(d.groups.filter(([data, bin]) => live(data, bin).length >= d.members && data.bins.some((b) => b.key !== bin && live(data, b.key).length)), d.pick);
    if (groups.length < d.pick) throw new Error(`K-510: fewer than ${d.pick} groups in ${L}`);
    // every group's members first (each group needs all of its own), then one intruder per group from what is left
    const used = new Set();
    const memberSets = groups.map(([data, bin]) => {
      const m = rng.sample(live(data, bin).filter((it) => !used.has(it.noun)), d.members);
      if (m.length < d.members) throw new Error(`K-510: the group ${bin} has only ${m.length} pictures left in ${L}`);
      m.forEach((it) => used.add(it.noun));
      return m;
    });
    const othersOf = (data, bin) => data.bins.filter((b) => b.key !== bin).flatMap((b) => live(data, b.key));
    const intruders = groups.map(([data, bin]) => {
      const others = othersOf(data, bin).filter((it) => !used.has(it.noun));
      if (!others.length) throw new Error(`K-510: nothing left to put in the group ${bin} in ${L}`);
      const it = rng.pick(others); used.add(it.noun); return it;
    });
    // the teacher's swaps (maker only), group by group; a picture already on the page is refused
    const taken = new Set();
    groups.forEach(([data, bin], gi) => {
      const apply = (c) => [slot.anyPictures(c, memberSets[gi], live(data, bin), 'g' + gi), slot.anyPictures(c, [intruders[gi]], othersOf(data, bin), 'x' + gi)[0]];
      let [m, x] = apply(ctx);
      const nouns = m.map((it) => it.noun).concat([x.noun]);
      const others = new Set(memberSets.flat().concat(intruders).filter((it, k, a) => !memberSets[gi].includes(it) && it !== intruders[gi]).map((it) => it.noun));
      if (new Set(nouns).size !== nouns.length || nouns.some((n) => taken.has(n) || others.has(n))) {
        const ov = { ...((ctx && ctx.overrides) || {}) }; delete ov['g' + gi]; delete ov['x' + gi];
        [m, x] = apply(ctx && { ...ctx, overrides: ov });
        // marked AFTER the draw again (apply writes a fresh record of the role)
        if (ctx && ctx.overrides && (ctx.overrides['g' + gi] || ctx.overrides['x' + gi])) { slot.refuse(ctx, 'g' + gi); slot.refuse(ctx, 'x' + gi); }
      }
      memberSets[gi] = m.map((it) => ({ ...it, bin })); intruders[gi] = x;
      m.concat([x]).forEach((it) => taken.add(it.noun));
    });
    const px = d.members > 3 ? 82 : 92;
    const rows = groups.map(([data, bin], gi) => {
      const label = data.bins.find((b) => b.key === bin).label[L];
      if (!label) throw new Error(`K-510: no ${L} name for the group ${bin}`);
      const members = memberSets[gi], intruder = intruders[gi];
      const items = rng.shuffle(members.map((it, i) => ({ it, odd: false, role: 'g' + gi, i })).concat([{ it: intruder, odd: true, role: 'x' + gi, i: 0 }]));
      const chips = items.map(({ it, odd, role, i }) => `<span class="ws-pattern-chip" data-lcs-pick="1" data-lcs-label="${it.noun}"${odd ? ' data-lcs-correct="1"' : ''} data-lcs-item-bin="${it.bin}"${slot.attr(ctx, role, i)} style="width:${px + 16}px;height:${px + 16}px"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${px}px;height:${px}px"></span>`).join('');
      return `<div class="ws-card-stage" data-lcs-group="${gi + 1}" data-lcs-group-bin="${bin}" style="flex-direction:column;align-items:center;gap:8px;padding:10px 12px">` +
        `<div style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.teal}">${label}</div><div style="display:flex;gap:12px;justify-content:center">${chips}</div></div>`;
    });
    const { cardGrid } = require('../../templates/layouts/card-grid.js');
    return { bodyHtml: cardGrid({ cards: rows, cols: 1, rows: rows.length, numbered: false }), meta: { groups: groups.map(([, b]) => b) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const groups = [...document.querySelectorAll('[data-lcs-group]')];
      if (groups.length < 3) fails.push(`${groups.length} groups`);
      const seen = new Set();
      groups.forEach((g, i) => {
        const chips = [...g.querySelectorAll('[data-lcs-pick]')], odd = chips.filter((c) => c.hasAttribute('data-lcs-correct'));
        if (chips.length !== +(groups[0].querySelectorAll('[data-lcs-pick]').length)) fails.push(`group ${i + 1}: ${chips.length} pictures, the first group has ${groups[0].querySelectorAll('[data-lcs-pick]').length}`);
        if (chips.length < 4) fails.push(`group ${i + 1}: only ${chips.length} pictures`);
        if (odd.length !== 1) fails.push(`group ${i + 1}: ${odd.length} pictures do not belong`);
        chips.forEach((c) => { const inBin = c.dataset.lcsItemBin === g.dataset.lcsGroupBin; if (inBin === c.hasAttribute('data-lcs-correct')) fails.push(`group ${i + 1}: ${c.dataset.lcsLabel} is marked wrongly`); const k = c.dataset.lcsLabel; if (seen.has(k)) fails.push(`${k} twice on the page`); seen.add(k); });
        chips.forEach((c) => { const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`group ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
