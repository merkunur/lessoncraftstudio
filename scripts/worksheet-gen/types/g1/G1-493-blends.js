/**
 * G1-493 — Blends (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T2; RF.1.3 consonant blends): pictures whose
 * name starts with two consonants the child HEARS one after the other (fr-og, st-ar — two letters, two sounds; a
 * digraph is two letters, one sound, and has its own family). The bank is data/literacy/blends.json
 * (tools/build-blend-bank.js): each language's own blends (es "sílabas trabadas", de Konsonantenhäufungen incl. Sp / St,
 * Nordic s-clusters), a vowel after the pair, every picture opened, every name a child gives it; fi has no native
 * initial blends and is refused.
 * Level 1: circle the blend — three blend chips, two other blends of the language's list (one sharing a letter with the
 * right one where it can); level 2: write the two letters before the rest of the printed word (__og); level 3: write
 * the two letters from the picture alone. A page spreads its cards over the blends (never one blend for most cards).
 * Every chip is a tap target (level 1) / every box an answer box holding its letter (levels 2-3).
 * Levels: 1 six cards · 2 eight cards · 3 eight cards (pt six: its level-3 pool cannot balance eight).
 */
'use strict';
const B = require('../../data/literacy/blends.json');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { cards: 6, task: 'circle', px: 96 },
  2: { cards: 8, task: 'word', px: 76 },
  3: { cards: 8, task: 'write', px: 76 },
};
// Level 3 shows the PICTURE ALONE, so the picture must give the word by itself: these pictures a child names with another
// word (other first letters) are left out there — contact sheets of the whole level-3 pool, review 2026-11-16. Levels 1 and
// 2 print the word and keep them. en: bracelet (a plain bangle: "ring"), brush ("paintbrush"), croissant ("bread", "roll"),
// crib ("bed"), flute (a wooden pipe: "recorder"), flower (a sunflower), glass ("cup"), globe ("earth", "world"), planet
// (Saturn), pliers ("scissors"), sloth ("monkey"), snorkel ("goggles", "mask"), sponge ("cheese"), stamp (the lighthouse on
// it), stool ("chair"), stove ("oven"), stocking ("sock"), swan ("duck"), swimsuit ("bathing suit"). The same pictures in the
// other languages, where the other name starts with other letters: de Flöte ("Blockflöte"); es brocha ("pincel"), flor
// ("girasol"), planeta ("Saturno"); fr bracelet ("bague", "anneau"); it bradipo ("scimmia"), spugna ("formaggio"); nl fluit
// ("blokfluit"), bloem ("zonnebloem"), spons ("kaas"), kruk ("stoel"); sv flöjt ("blockflöjt"), snorkel ("cyklop"); da
// fløjte ("blokfløjte"), blomst ("solsikke"), snorkel ("dykkermaske"); no fløyte ("blokkfløyte"), blomst ("solsikke"), krakk
// ("stol"), snorkel ("dykkermaske"); pt preguiça ("macaco").
// Then each language's OWN level-3 pool, on contact sheets with its words (second pass 2026-11-16): de Flagge ("Fahne"),
// Krug ("Kanne"); es brazo ("mano"), brújula (reads as a clock: "reloj"), florero (an empty vase: "jarrón"), fregadero (a
// bathroom basin is a "lavabo"); fr bras ("main"), crêpe (a thick stacked pancake: "pancake"); it braccio ("mano"),
// tricheco ("foca"); nl specht ("vogel"), stier ("koe"); sv spis (a fireplace: "öppen spis", "eldstad"), stuga ("hus"),
// stekspade (the silicone tool is a "slickepott"); da grankogle ("kogle"), krus ("kop"), krukke (a glass jar: "glas"),
// spætte ("fugl"); no krukke ("glass"). A native review of all ten languages (third pass, 2026-11-16) confirmed these and
// added: en sweater (a Christmas sweater), dragonfly ("fly"); de Brotdose, Kranz, Brot (a white sandwich loaf: "Toast");
// it spiaggia ("il mare"), spatola; nl broek ("korte broek"), krans ("kerstkrans"), sla, spatel ("pannenlikker"); sv
// flingor, grind ("port"), krans ("julkrans"), sparris; da krans, skovl ("spade" — sp is a Danish blend too), skov
// ("træer"), brød ("franskbrød"); no krans ("julekrans"), brød ("loff"). Ruled kept: de Klebeband, es frambuesa, frasco,
// fr bretelles, croissant, it brocca, bretelle, pt trenó, trompete, nl blender, bretels, slot, spek, stift, sv gryta,
// kratta, stekpanna, brevlåda, da blomkål, no blender.
const NAMED_OTHERWISE = {
  en: ['accessories/bracelet', 'around the house/brush', 'bakery/croissant', 'furniture/crib', 'music/flute', 'easter/flower', 'kitchen tools/glass', 'classroom/globe', 'space/planet', 'tools/pliers', 'zoo animals/sloth', 'beach/snorkel', 'kitchen tools/sponge', 'post office/stamp', 'furniture/stool', 'around the house/stove', 'christmas/stocking', 'Things That Fly/swan', 'beach/swimsuit', 'clothing/sweater', 'Things That Fly/dragonfly'],
  de: ['music/flute', '4th of July/flag', 'kitchen tools/jug', 'classroom/lunchbox'],
  es: ['around the house/brush', 'easter/flower', 'space/planet', 'body parts/arm', 'camping/compass', 'around the house/vase'],
  fr: ['accessories/bracelet', 'body parts/arm'],
  it: ['zoo animals/sloth', 'kitchen tools/sponge', 'body parts/arm', 'winter/walrus', 'summer/beach'],
  pt: ['zoo animals/sloth'],
  nl: ['music/flute', 'easter/flower', 'kitchen tools/sponge', 'furniture/stool', 'animals/woodpecker', 'farm animals/bull', 'clothing/pants', 'At the Supermarket/lettuce'],
  sv: ['music/flute', 'beach/snorkel', 'camping/cabin', 'At the Supermarket/cereal', 'around the house/gate', 'vegetables/asparagus'],
  da: ['music/flute', 'easter/flower', 'beach/snorkel', 'camping/pinecone', 'kitchen tools/mug', 'kitchen tools/jar', 'animals/woodpecker', 'around the house/shovel', 'camping/forest'],
  no: ['music/flute', 'easter/flower', 'furniture/stool', 'beach/snorkel', 'kitchen tools/jar'],
};
// in EVERY language whose bank holds them (their word begins one of its blends): the wreath (a Kranz / krans a child calls
// Türkranz, kerstkrans, julkrans, julekrans), the white sandwich loaf ("Toast", "franskbrød", "loff") and the silicone
// spatula (a scraper: "pannenlikker", "slickepott") leave level 3 — native review 2026-11-16
const NAMED_OTHERWISE_ALL = ['christmas/wreath', 'At the Supermarket/bread', 'kitchen tools/spatula'];
// a picture whose bank word is not its name, at every level: post office/stamp is a POSTAGE stamp, and nl stempel, sv
// stämpel, da / no stempel name a rubber stamp (a postage stamp is postzegel, frimärke, frimærke, frimerke); nl "step" is a
// kick scooter and the picture is a motor scooter ("scooter"); sv "stövlar" are tall boots and the picture shows lace-up
// boots ("kängor"); es "fregadero" is a kitchen sink and the picture a pedestal basin ("lavabo"); fr "crêpe" is thin and the
// picture a thick pancake stack; sv "spis" for an open fireplace ("öppen spis") — native review 2026-11-16
const WRONG_WORD = { nl: ['post office/stamp', 'toys/scooter'], sv: ['post office/stamp', 'camping/boots', 'around the house/fireplace'], da: ['post office/stamp'], no: ['post office/stamp'], es: ['around the house/sink'], fr: ['breakfast/pancake'] };
// a picture whose name a first grader does not know, at every level (a US K-3 reading teacher, review en-1119-lit,
// 2026-11-19): en pliers (said "scissors", "cutters", "tool" — a child who does not know the word cannot hear its blend).
// verify() keeps its own copy (NOT_KNOWN_SPEC).
const NOT_KNOWN = { en: ['tools/pliers'] };
const NOT_KNOWN_SPEC = { en: ['tools/pliers'] };
const leftOut = (L, task) => new Set([...(WRONG_WORD[L] || []), ...(NOT_KNOWN[L] || []), ...(task === 'write' ? [...(NAMED_OTHERWISE[L] || []), ...NAMED_OTHERWISE_ALL] : [])]);
const picKey = (src) => { const m = /\/themes(?:-512)?\/([^/]+)\/([^/?#@]+)(?:@\dx)?\.(?:webp|png)/.exec(src || ''); return m ? decodeURIComponent(m[1]) + '/' + decodeURIComponent(m[2]) : null; };

module.exports = {
  id: 'G1-493',
  slug: 'blends',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'digraphs',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Blends', instruction: 'Say the name of each picture. Write the two letters it starts with.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = B.items[L], blends = B.blends[L];
    if (!items || !blends || blends.length < 2) throw new Error(`G1-493: no ${L} blends (refused in this language)`);
    // round robin over the blends: a page never asks one blend for most of its cards. A left-out picture is dropped AFTER
    // its blend is registered, so the blend order (and every page that never drew it) stays as it was.
    const skip = leftOut(L, d.task);
    const groups = new Map();
    for (const it of rng.shuffle(items.slice())) { if (!groups.has(it.blend)) groups.set(it.blend, []); if (!skip.has(it.theme + '/' + it.noun)) groups.get(it.blend).push(it); }
    const order = rng.shuffle([...groups.keys()]), picks = [];
    for (let r = 0; picks.length < d.cards; r++) {
      let took = false;
      for (const b of order) { const it = groups.get(b)[r]; if (it && picks.length < d.cards) { picks.push(it); took = true; } }
      if (!took) break;
    }
    // level 3 where the pool cannot spread its 8 cards over the blends (no blend on more than half of them: pt, whose 8
    // pictures are 3 pr + 5 tr once preguiça is left out) draws fewer — the largest EVEN count from 6 that the round robin
    // balances, so the two-column grid stays full, with the pictures drawn as large as level 1's six. Fewer than 6: refused.
    let n = d.cards;
    if (d.task === 'write') {
      const unbalanced = (k) => { const c = {}; for (const it of picks.slice(0, k)) c[it.blend] = (c[it.blend] || 0) + 1; return Math.max(0, ...Object.values(c)) > Math.ceil(k / 2); };
      n = Math.min(n, picks.length - (picks.length % 2));
      while (n >= 6 && unbalanced(n)) n -= 2;
      if (n < 6) throw new Error(`G1-493: ${L} level 3 cannot spread 6 pictures over its blends (refused)`);
      picks.length = n;
    }
    if (picks.length < n) throw new Error(`G1-493: ${L} has ${picks.length} blend pictures (< ${n})`);
    const px = n < d.cards ? D[1].px : d.px;
    // a teacher's pictures (maker): one role per blend on the page — another picture of THAT blend (the card keeps its answer)
    const KS = slot.byKind(ctx, rng.shuffle(picks), (it) => it.blend, (b) => groups.get(b) || [], { multi: true, prefix: 'b' });
    const cards = KS.items;
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (ch) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${ch}"` : ''} style="display:inline-flex;width:46px;height:52px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const wordText = (s) => `<span style="font:700 34px/1 'Baloo 2',cursive;color:${T.ink};letter-spacing:1px">${s}</span>`;
    const html = cards.map((it, ci) => {
      const chars = [...it.word], head = chars.slice(0, 2), rest = chars.slice(2).join('');
      let row;
      if (d.task === 'circle') {
        // the two other chips: blends of the language, one sharing a letter with the right one where it can
        const others = (B.table[L] || blends).filter((b) => b !== it.blend);
        const near = rng.shuffle(others.filter((b) => b[0] === it.blend[0] || b[1] === it.blend[1]));
        const far = rng.shuffle(others.filter((b) => !near.includes(b)));
        const opts = rng.shuffle([it.blend, ...[...near.slice(0, 1), ...far, ...near.slice(1)].slice(0, 2)]);
        row = `<div class="ws-choices" style="gap:14px">` + opts.map((b) => `<span class="ws-chip" data-lcs-blend-chip="${b}"${mark && b === it.blend ? ' data-lcs-correct="1"' : ''} style="min-width:64px;height:54px;padding:0 10px;font:700 30px/1 'Baloo 2',cursive;color:${T.ink}">${b}</span>`).join('') + `</div>`;
      } else {
        row = `<div style="display:flex;align-items:center;gap:6px">${box(head[0])}${box(head[1])}${d.task === 'word' ? `<span style="width:4px"></span>${wordText(rest)}` : ''}</div>`;
      }
      return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:6px" data-ws-content data-lcs-blend="${it.blend}"${KS.tap(ci)} data-lcs-word="${it.word}">` +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${px}px;height:${px}px">${row}</div>`;
    });
    return {
      bodyHtml: cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }),
      meta: { task: d.task, words: cards.map((it) => `${it.word} (${it.blend})`) },
    };
  },

  async verify(page) {
    const got = await page.evaluate(() => ({
      lang: document.documentElement.lang || 'en',
      // each card's picture, and whether it is a level-3 card: two answer boxes and nothing printed beside them
      cards: [...document.querySelectorAll('[data-lcs-blend]')].map((c) => ({
        src: (c.querySelector('img') || {}).getAttribute ? c.querySelector('img').getAttribute('src') : '',
        alone: c.querySelectorAll('.ws-answerbox').length === 2 && !c.querySelector('[data-lcs-blend-chip]') && ![...c.querySelectorAll('span')].some((s) => !s.classList.contains('ws-answerbox') && s.textContent.trim()),
      })),
    }));
    const L = A.loc2(got.lang), extra = [];
    got.cards.forEach((c, i) => {
      const k = picKey(c.src);
      if (k && (WRONG_WORD[L] || []).includes(k)) extra.push(`card ${i + 1}: ${k} carries a word that is not its name in ${L}`);
      if (k && (NOT_KNOWN_SPEC[L] || []).includes(k)) extra.push(`card ${i + 1}: ${k} carries a word a first grader does not know in ${L}`);
      if (k && c.alone && ((NAMED_OTHERWISE[L] || []).includes(k) || NAMED_OTHERWISE_ALL.includes(k))) extra.push(`card ${i + 1}: ${k} alone does not give its word (level 3)`);
    });
    return extra.concat(await page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-blend]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsWord);
      if (new Set(words).size !== words.length) fails.push('a word twice');
      const blends = cards.map((c) => c.dataset.lcsBlend), most = Math.max(...blends.map((b) => blends.filter((x) => x === b).length));
      if (most > Math.ceil(cards.length / 2)) fails.push(`one blend on ${most} of ${cards.length} cards`);
      cards.forEach((c, i) => {
        if (c.dataset.lcsWord.slice(0, 2).toLowerCase() !== c.dataset.lcsBlend) fails.push(`card ${i + 1}: ${c.dataset.lcsWord} does not start with ${c.dataset.lcsBlend}`);
        const chips = [...c.querySelectorAll('[data-lcs-blend-chip]')];
        if (chips.length && (chips.length !== 3 || !chips.some((x) => x.dataset.lcsBlendChip === c.dataset.lcsBlend))) fails.push(`card ${i + 1}: the chips miss the blend`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
        const R = c.getBoundingClientRect();
        c.querySelectorAll('span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.left < R.left - 1 || r.right > R.right + 1)) fails.push(`card ${i + 1}: the row leaves the card`); });
      });
      return [...new Set(fails)];
    }));
  },
};
