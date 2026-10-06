/**
 * K-288 — Articles (nt20-B; `articles`, K, readiness — REBUILT per locale).
 * Six picture cards; under each a row of identical white chips carrying the
 * locale's articles in a FIXED canonical order (der · die · das). The child
 * says the noun with its article and circles the chip. No writing at K.
 *   de der/die/das (+ optional colour dots) · nl de/het · fr le/la (d3 un/une)
 *   es el/la · pt o/a · it il/la (d3 il/lo/la/l') · sv en/ett · da en/et ·
 *   no en/et · en a/an (vowel SOUND, with an exceptions table)
 *   fi (no articles) = yksikkö / monikko: one picture → the singular chip,
 *   three pictures → the plural chip — the same slot structure, a genuine
 *   Finnish K noun-form staple.
 * The chip key comes from the vocab gender; `keyFor → null` refuses a noun.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { articleChips } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri, countable } = require('../../lib/b2-common.js');
const { ARTICLES } = require('../../data/b2/articles.js');
const { LABELS } = require('../../data/b2/labels.js');

/** Answer key: a teal ring around the correct chip (the only visual difference on the key). */
function ringCorrect(html) {
  return html.replace(/<span class="ws-achip" style="([^"]*)"([^>]*data-lcs-correct="1")/g,
    (m, st, rest) => `<span class="ws-achip" style="${st};outline:4px solid #146B5E;outline-offset:3px"${rest}`);
}

module.exports = {
  id: 'K-288',
  slug: 'circle-the-article',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'articles',
  // B&W allowed (Level Set 2026-09-28): line art is fine for naming (ladder verdict)
  themeAxis: { applicable: true, minNouns: 8, excludeBw: false },
  // the geometry the faces spread from (K-306 = FOUR, K-307 + G1-292 = EIGHT)
  FOUR: { cards: 4, cols: 2, rows: 2, pic: 150, chipW: 96, chipH: 56, chipFont: 28 },
  SIX: { cards: 6, cols: 2, rows: 3, pic: 118, chipW: 84, chipH: 48, chipFont: 24 },
  EIGHT: { cards: 8, cols: 2, rows: 4, pic: 88, chipW: 76, chipH: 44, chipFont: 22, level3: true },
  // Level Set 2026-09-28 — a level must change what the child DOES:
  // L1 the noun is PRINTED under each picture (read it, don't guess the name) · L2 published ·
  // L3 only where a harder article SET exists (it: il / lo / la / l'); elsewhere more cards are no level.
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, pic: 118, chipW: 84, chipH: 48, chipFont: 24, showWord: true },
    2: { cards: 6, cols: 2, rows: 3, pic: 118, chipW: 84, chipH: 48, chipFont: 24 },
    3: { cards: 8, cols: 2, rows: 4, pic: 88, chipW: 76, chipH: 44, chipFont: 22, level3: true, onlyLocales: ['it'] },
  },
  i18n: {
    en: {
      title: 'A or An?',
      instruction: 'Say the picture word out loud. Circle the word that goes in front of it.',
    },
  },

  // Level Set 2026-09-28 — the screen version: one choice per item (tap the article button).
  // screenHeight: the screen page is taller than paper (one row per card; render-instance crops).
  interactive: {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-chip]', answerAttr: 'data-lcs-key', labelAttr: 'data-lcs-vocab',
    metaAttrs: ['data-lcs-vocab', 'data-lcs-count'], instructionKey: 'tapChoice', screenHeight: 1500,
    /**
     * The robot gate's INDEPENDENT truth: for each item the correct OPTION LABEL, recomputed from
     * its vocabulary entry (gender) and picture count with the locale's article rules — never read
     * from the page's answer marks. Returns the option index per item.
     */
    oracle: (items, loc, ctx) => {
      const A = ARTICLES[loc];
      const byKey = new Map(entriesFor(ctx.theme, loc).map((e) => [e.vocabKey, e]));
      // a BORROWED noun (new pages top a scarce article up from other themes of the same kind) is looked up in those
      // themes — still from the vocabulary, never from the page's marks
      const borrowed = (key) => {
        const M = require('../../image-cache/resolve.js').manifest();
        const bw = !!(M.themes[ctx.theme] && M.themes[ctx.theme].bw);
        for (const t of Object.keys(M.themes).sort()) {
          if (t === ctx.theme || !!M.themes[t].bw !== bw) continue;
          let es; try { es = entriesFor(t, loc); } catch (err) { continue; }
          const hit = es.find((x) => x.vocabKey === key);
          if (hit) return hit;
        }
        return null;
      };
      const level = ctx.level3 ? 3 : ctx.difficulty;
      const chips = (ctx.level3 && A.chipsD3) ? A.chipsD3 : A.chips;
      return items.map((it) => {
        const e = byKey.get(it.meta['data-lcs-vocab']) || borrowed(it.meta['data-lcs-vocab']);
        if (!e) throw new Error('oracle: no vocab entry ' + it.meta['data-lcs-vocab']);
        const count = +it.meta['data-lcs-count'] || 1;
        const k = A.keyFor({ ...e, key: e.vocabKey }, { level, count });
        if (A.mode === 'form') return count > 1 ? 1 : 0;   // options are always [singular, plural] / [one, many]
        const idx = it.options.indexOf(chips[k]);
        if (idx < 0) throw new Error('oracle: correct article "' + chips[k] + '" is not among the options ' + it.options.join('/'));
        return idx;
      });
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    // the printed noun (L1) takes a line of the card: the picture gives it the room (measured: the
    // 8-card page and the fr/pt 6-card page overflowed the paper by 15-60 px at full picture size)
    const d0 = this.difficulty[difficulty];
    const d = d0 && d0.showWord ? { ...d0, pic: Math.round(d0.pic * (d0.cards >= 8 ? 0.6 : 0.72)) } : d0;
    const rng = ctx.rng;
    const screen = !!(ctx && ctx.interactive), isKey = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const A = ARTICLES[loc];
    if (!A) throw new Error(`K-288: no article contract for locale ${loc}`);
    if (A.refuse) throw new Error(`K-288: locale ${loc} refuses this type`);
    if (d.onlyLocales && !d.onlyLocales.includes(loc)) throw new Error(`K-288: level ${difficulty} exists only for ${d.onlyLocales.join(', ')} (a harder article set); ${loc} refuses it`);
    // fi picks singular vs plural: a printed word or a picture beside the word gives the answer away
    if ((d.showWord || d.sortPictures) && A.mode === 'form') throw new Error(`K-288: ${loc} refuses the support level (it would print the answer)`);
    const level = d.level3 ? 3 : difficulty;
    let chips = (d.level3 && A.chipsD3) ? A.chipsD3 : A.chips;
    const refuse = new Set((A.refuseKeys || []).map((k) => String(k).toLowerCase()));
    let pool = distinctByWord(entriesFor(theme, loc).filter(countable).filter((e) => !refuse.has(String(e.vocabKey).toLowerCase())), (e) => e.singular.toLocaleLowerCase(loc));
    // fi form mode: each card shows 1 or 3 pictures; chips = [singular, plural]
    const isForm = A.mode === 'form';
    // BORROWED NOUNS (operator ruling 2026-10-06, guessability audit): a theme with too few nouns of one article ("an",
    // "ett", "et", "het" — en/sv/no/da/nl themes hold 1-2) made "always tap the common article" score 75-85%. A NEW page
    // tops that article up from OTHER themes of the same kind (colour from colour, black-and-white from black-and-white,
    // never mixed), only as many as the balance needs; each borrowed picture is drawn from its own theme folder. The
    // published page (level 2, copy 1) never borrows (its draws are unchanged).
    const isPublished = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!isPublished && !isForm) {
      const keyOf = (e) => A.keyFor({ ...e, key: e.vocabKey }, { level, count: 1 });
      const hist = {};
      pool.forEach((e) => { const k = keyOf(e); if (k != null) hist[k] = (hist[k] || 0) + 1; });
      const want = Math.max(1, Math.floor(d.cards / chips.length));
      const short = chips.map((_, k) => k).filter((k) => (hist[k] || 0) < want);
      if (short.length) {
        const M = require('../../image-cache/resolve.js').manifest();
        const bwOf = (t) => !!(M.themes[t] && M.themes[t].bw);
        const others = Object.keys(M.themes).filter((t) => t !== theme && bwOf(t) === bwOf(theme)).sort();
        const have = new Set(pool.map((e) => e.singular.toLocaleLowerCase(loc)));
        for (const k of short) {
          const extra = [];
          for (const t of others) {
            let es; try { es = entriesFor(t, loc); } catch (e) { continue; }
            for (const e of es.filter(countable)) {
              const w = e.singular.toLocaleLowerCase(loc);
              if (refuse.has(String(e.vocabKey).toLowerCase()) || have.has(w) || keyOf(e) !== k) continue;
              extra.push({ ...e, _theme: t }); have.add(w);
            }
          }
          pool = pool.concat(rng.shuffle(extra).slice(0, want - (hist[k] || 0)));
        }
      }
    }
    let cardsData = null, guard = 0, relaxed = false;
    while (!cardsData && guard++ < 400) {
      if (guard === 201) relaxed = true; // a theme short of one gender (sv animals: few ett-nouns) still ships with ≥ 1 of it
      const sample = rng.sample(pool, Math.min(pool.length, d.cards * 3));
      const cand = [];
      for (const e of sample) {
        const count = isForm ? rng.pick([1, 3]) : 1;
        const key = A.keyFor({ ...e, key: e.vocabKey }, { level, count });
        if (key == null) continue;
        cand.push({ e, key, count });
        if (cand.length === d.cards) break;
      }
      if (cand.length < d.cards) continue;
      // mix floor: every chip that appears as a key ≥ 2 (d2/d3), ≥ 1 (d1); and ≥ 2 distinct keys
      const hist = {};
      cand.forEach((c) => { hist[c.key] = (hist[c.key] || 0) + 1; });
      const keys = Object.keys(hist);
      const floor = (difficulty === 1 || relaxed) ? 1 : 2;
      const nChips = isForm ? 2 : chips.length;
      // … and on a NEW page a ceiling too (2026-10-06 guessability audit: "a" was right on ~75% of cards — tap "a" every
      // time and score): at most half the cards per article with two chips, an even share + 1 with three or four. The
      // published page (level 2, copy 1) keeps its draws; a theme that cannot balance relaxes after 200 tries as before.
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      // the ceiling loosens one card at a time (tries 1-200 strict, 201-300 +1), never straight to "anything goes"
      const ceil = (nChips <= 2 ? Math.ceil(d.cards / 2) : Math.ceil(d.cards / nChips) + 1) + (guard > 200 ? 1 : 0);
      const okMix = keys.length >= Math.min(2, nChips) && keys.every((k) => hist[k] >= floor) &&
        (nChips <= 2 || keys.length >= 2) && (published || guard > 300 || keys.every((k) => hist[k] <= ceil));
      if (!okMix) continue;
      cardsData = rng.shuffle(cand);
      // a NEW page never in a tapping rhythm (a, an, a, an …)
      if (!isPublished) { const { tappingRhythm } = require('../../lib/answer-slots.js'); for (let g = 0; g < 50 && tappingRhythm(cardsData.map((c) => c.key), isForm ? 2 : chips.length); g++) cardsData = rng.shuffle(cand); }
      // the FIRST card shows the page's own theme (a borrowed picture first would read as the deck's theme downstream)
      if (cardsData[0].e._theme) { const j = cardsData.findIndex((c) => !c.e._theme); if (j > 0) [cardsData[0], cardsData[j]] = [cardsData[j], cardsData[0]]; }
    }
    if (!cardsData) throw new Error(`K-288: theme ${theme}/${loc} cannot satisfy the gender mix at d${difficulty}`);
    const cards = cardsData.map(({ e, key, count }) => {
      const chipLabels = isForm ? A.chipsFor({ ...e, singular: displayWord(e.singular, loc), plural: displayWord(e.plural, loc) }) : chips;
      const pics = Array.from({ length: count }, (_, k) => {
        const rot = (rng.next() * 8 - 4).toFixed(1);
        const sz = count > 1 ? Math.round(d.pic * 0.62) : d.pic;
        return `<img class="ws-icon" src="${fileUri(e._theme || theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${sz}px;height:${sz}px;transform:rotate(${rot}deg)">`;
      }).join('');
      const word = d.showWord ? `<span style="font-family:'Nunito';font-weight:800;font-size:${Math.round(d.chipFont * 0.95)}px;color:#3A3530" data-lcs-shown-word>${displayWord(e.singular, loc)}</span>` : '';
      let chipHtml = articleChips({ chips: chipLabels, correctIndex: key, w: isForm ? 120 : (chips.length === 4 ? 66 : d.chipW), h: d.chipH, fontPx: isForm ? 18 : (chips.length === 4 ? 20 : d.chipFont), dots: A.chipDots });
      if (isKey) chipHtml = ringCorrect(chipHtml);
      if (screen) {
        // screen: ONE card per row — the picture (+ printed word) left, BIG article buttons right,
        // so a button stays >= 44 px on a phone even with four articles (render-instance crops)
        const n = chipLabels.length, bw = Math.floor((440 - (n - 1) * 12) / n);
        const bigChips = articleChips({ chips: chipLabels, correctIndex: key, w: bw, h: 104, fontPx: isForm ? 26 : 38, dots: A.chipDots });
        return `<div style="display:flex;align-items:center;gap:14px;width:660px;height:128px;padding:0 8px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px" data-lcs-item data-lcs-vocab="${e.vocabKey}" data-lcs-key="${key}" data-lcs-count="${count}">` +
          `<div style="width:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">${pics.replace(/width:(\d+)px;height:(\d+)px/g, (m0, a) => `width:${Math.min(+a, count > 1 ? 56 : 92)}px;height:${Math.min(+a, count > 1 ? 56 : 92)}px`)}${word}</div>` +
          `<div style="flex:1;display:flex;justify-content:center">${bigChips.replace('class="ws-achips"', 'class="ws-achips" style="gap:12px;flex-wrap:nowrap"')}</div></div>`;
      }
      return `<div class="ws-card-stage" style="flex-direction:column;gap:6px" data-lcs-item data-lcs-vocab="${e.vocabKey}" data-lcs-key="${key}" data-lcs-count="${count}">` +
        `<div style="display:flex;gap:6px;align-items:center;justify-content:center;flex:1">${pics}</div>` +
        word + chipHtml +
        `</div>`;
    });
    // sortWords: a SECOND layout. Instead of one noun against all the articles,
    // the child gets all the nouns against the same categories at once — and it
    // is READ, not named, because there is no picture to lean on. That is a
    // different act from every sibling, and it is why this face takes a G1 id:
    // reading printed words and copying them is not a Vorschule job.
    // ⚠ Finnish has no articles (mode 'form'), so its columns are the shipped
    // yksikko/monikko labels and its chips are word FORMS — the same sorting act
    // on the grammatical contrast that locale actually has.
    if (d.sortWords) {
      // ⚠ Drop a column this locale's pool can NEVER fill. The sort layout heads
      // every chip as a bin, and Italian at level 3 heads four (il/lo/la/l') —
      // but `lo` needs an s+consonant / z / gn / ps onset, and the picture
      // vocabulary has at most ONE such noun in any theme (fruits, animals and
      // vehicles have none). A child then faces a labelled column that cannot
      // receive a word, on a page whose whole task is putting every word under a
      // heading. Measured from the POOL rather than the deal, so the bin set is
      // stable across renders of the same (theme, locale). Same defect the German
      // der/die/das page had on `fruits`, where the fix was a theme change; here
      // no theme exists, so the column goes.
      const reachable = new Set(pool.map((e) => { try { return A.keyFor(e, { level }); } catch (x) { return null; } })
        .filter((k) => k !== null && k !== undefined));
      // ⚠ fi (mode 'form') has no article list — its two bins are one / many — and reading
      // `chips` there threw, so the fi sort face could not be generated at all (2026-09-28)
      const keptIdx = isForm ? [0, 1] : chips.map((_, i) => i).filter((i) => reachable.has(i));
      const dropped = isForm ? 0 : chips.length - keptIdx.length;
      if (dropped && keptIdx.length < 2) {
        throw new Error(`K-288: ${theme}/${loc} leaves only ${keptIdx.length} fillable bin(s)`);
      }
      const remap = new Map(keptIdx.map((orig, now) => [orig, now]));
      if (dropped) {
        chips = keptIdx.map((i) => chips[i]);
        cardsData = cardsData.map((c) => ({ ...c, key: remap.has(c.key) ? remap.get(c.key) : c.key }));
      }
      const binLabels = isForm
        ? [(LABELS[loc] && LABELS[loc].singularPlural || {}).one || 'one',
           (LABELS[loc] && LABELS[loc].singularPlural || {}).many || 'many']
        : chips;
      const wordOf = ({ e, count }) => (isForm ? displayWord(count > 1 ? e.plural : e.singular, loc) : displayWord(e.singular, loc));
      const keyOf = ({ key, count }) => (isForm ? (count > 1 ? 1 : 0) : key);
      if (screen) {
        // screen: the bins cannot be written into, so each word becomes a row with the bin
        // headings as BIG buttons — the same decision (which article goes with this READ word)
        const n = binLabels.length, bw = Math.floor((460 - (n - 1) * 12) / n);
        const rows = cardsData.map((c) => {
          const w = wordOf(c), k = keyOf(c);
          const opts = binLabels.map((label, i) => `<span class="ws-achip" style="width:${bw}px;height:104px;font-size:${label.length > 8 ? 22 : 32}px" data-lcs-chip="${i}" data-lcs-label="${label}"${i === k ? ' data-lcs-correct="1"' : ''}>${label}</span>`).join('');
          return `<div style="display:flex;align-items:center;gap:14px;width:660px;height:124px;padding:0 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px" data-lcs-item data-lcs-vocab="${c.e.vocabKey}" data-lcs-key="${k}" data-lcs-count="${c.count}" data-lcs-word="${w}">` +
            `<div style="width:170px;text-align:center;font-family:'Nunito';font-weight:800;font-size:${[...w].length > 9 ? 22 : 30}px;overflow-wrap:anywhere;color:#3A3530">${w}</div>` +
            `<div class="ws-achips" style="flex:1;gap:12px;justify-content:center;flex-wrap:nowrap">${opts}</div></div>`;
        });
        return {
          bodyHtml: `<div data-lcs-mode="${A.mode}" data-lcs-layout="choice" style="flex:1;display:flex;flex-direction:column;gap:12px;align-items:center;padding-top:10px" data-ws-content>${rows.join('')}</div>`,
          meta: { keys: cardsData.map((c) => c.key) },
        };
      }
      const wordChips = cardsData.map((c) => {
        const w = wordOf(c), k = keyOf(c);
        // L1 reading support: the word's own small picture beside it
        const pic = d.sortPictures ? `<img class="ws-icon" src="${fileUri(c.e._theme || theme, c.e.noun)}" alt="" style="width:34px;height:34px;margin-right:6px">` : '';
        return `<span class="ws-tile ws-tile--word" style="height:44px;font-size:20px" data-lcs-sortword="${w}" data-lcs-key="${k}">${pic}${w}</span>`;
      }).join('');
      const binW = Math.floor(640 / binLabels.length) - 12;
      // Rule as many lines as the HARDEST bin actually needs, never a fixed five.
      // The chip count is a config knob (`cards`) and the mix guard only floors
      // each key at 2, so an 8-chip two-bin page can legitimately deal 6 words to
      // one bin and leave the child two words with nowhere to write them. Count
      // the deal, then fit the spacing to the bin so more lines cannot overflow.
      const perBin = binLabels.map((_, i) => cardsData.filter(({ e, key, count }) =>
        (isForm ? (count > 1 ? 1 : 0) : key) === i).length);
      const lineCount = Math.max(5, ...perBin);
      const gapY = Math.min(58, Math.floor(330 / (lineCount + 0.5)));
      const bins = binLabels.map((label, idx) => {
        const lines = [];
        for (let i = 1; i <= lineCount; i++) lines.push(`<line x1="8" y1="${i * gapY}" x2="${binW - 14}" y2="${i * gapY}" stroke="#C8BFAE" stroke-width="1.5" stroke-dasharray="3 5"/>`);
        // answer key: the bin's words written in grey on its lines
        if (isKey) cardsData.filter((c) => keyOf(c) === idx).forEach((c, j) => lines.push(`<text x="14" y="${(j + 1) * gapY - 6}" font-family="Nunito" font-weight="700" font-size="20" fill="#8A8580">${wordOf(c)}</text>`));
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-sortbin="${idx}">` +
          `<span class="ws-pill" style="font-size:20px;padding:2px 18px" data-lcs-sorthead="${idx}">${label}</span>` +
          `<div class="ws-bin" style="width:${binW}px;height:350px;max-width:${binW}px;padding:0"><svg width="${binW - 6}" height="345" viewBox="0 0 ${binW - 6} 345" aria-hidden="true">${lines.join('')}</svg></div></div>`;
      }).join('');
      return {
        bodyHtml: `<div data-lcs-mode="${A.mode}" data-lcs-layout="sort" style="flex:1;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:flex-start;padding-top:6px" data-ws-content>` +
          `<div class="ws-card" style="width:660px;padding:10px 12px;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px">${wordChips}</div>` +
          `<div style="display:flex;gap:12px;justify-content:center">${bins}</div></div>`,
        meta: { keys: cardsData.map((c) => c.key) },
      };
    }
    if (screen) {
      return {
        bodyHtml: `<div data-lcs-mode="${A.mode}" data-lcs-layout="choice" style="flex:1;display:flex;flex-direction:column;gap:12px;align-items:center;padding-top:10px" data-ws-content>${cards.join('')}</div>`,
        meta: { keys: cardsData.map((c) => c.key) },
      };
    }
    return {
      bodyHtml: `<div data-lcs-mode="${A.mode}" style="flex:1;display:flex;flex-direction:column">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
      meta: { keys: cardsData.map((c) => c.key) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      // ⚠ The whole body below asserts the per-card chip-row layout: it hard-requires
      // [data-lcs-item] cards, each with its own [data-lcs-chip] row and exactly one
      // marked correct. The sort layout has NONE of that — no cards, no per-word
      // chips, one shared set of column headings — so every assertion would fire on
      // a correct page. It gets its own contract instead, and returns early.
      const sortRoot = document.querySelector('[data-lcs-layout="sort"]');
      if (sortRoot) {
        const words = [...document.querySelectorAll('[data-lcs-sortword]')];
        const bins = [...document.querySelectorAll('[data-lcs-sortbin]')];
        const heads = [...document.querySelectorAll('[data-lcs-sorthead]')].map((h) => h.textContent.trim());
        if (words.length < 6) fails.push(`only ${words.length} word chips`);
        if (bins.length < 2) fails.push(`only ${bins.length} bins`);
        if (heads.length !== bins.length) fails.push(`${heads.length} headings for ${bins.length} bins`);
        if (new Set(heads).size !== heads.length || heads.some((h) => !h)) fails.push('bin headings missing or duplicated');
        const keys = words.map((w) => +w.dataset.lcsKey);
        if (keys.some((k) => !Number.isInteger(k) || k < 0 || k >= bins.length)) fails.push('a word points at no bin');
        if (new Set(keys).size < 2) fails.push('every word belongs to the same bin');
        const texts = words.map((w) => w.textContent.trim());
        if (texts.some((t) => !t)) fails.push('empty word chip');
        if (new Set(texts).size !== texts.length) fails.push('duplicate word chip');
        // the answer must not be printed: no chip may carry its own heading
        if (texts.some((t) => heads.includes(t))) fails.push('a word chip repeats a bin heading');
        // Every word the page deals must have a line to be written on. The bin
        // ruling was a hardcoded five while `cards` is a config knob, so an
        // 8-chip page could deal 6 words to one bin and strand two of them.
        bins.forEach((bin, i) => {
          const need = keys.filter((k) => k === i).length;
          const ruled = bin.querySelectorAll('line').length;
          if (ruled < need) fails.push(`bin ${i}: ${need} words but only ${ruled} ruled lines`);
        });
        return fails;
      }
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (items.length < 4) fails.push(`only ${items.length} cards`);
      const mode = document.querySelector('[data-lcs-mode]').dataset.lcsMode;
      let firstOrder = null;
      const hist = {};
      const seen = new Set();
      items.forEach((it, i) => {
        if (seen.has(it.dataset.lcsVocab)) fails.push(`card ${i + 1}: duplicate noun`);
        seen.add(it.dataset.lcsVocab);
        const chips = [...it.querySelectorAll('[data-lcs-chip]')];
        const correct = chips.filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct chips`);
        if (correct[0] && correct[0].dataset.lcsChip !== it.dataset.lcsKey) fails.push(`card ${i + 1}: correct chip != key`);
        const labels = chips.map((c) => c.dataset.lcsLabel);
        if (new Set(labels).size !== labels.length) fails.push(`card ${i + 1}: duplicate chip labels`);
        if (mode === 'article') {
          const order = labels.join('|');
          if (firstOrder == null) firstOrder = order;
          else if (order !== firstOrder) fails.push(`card ${i + 1}: chip order differs (position leak)`);
          // chips must be visually identical apart from the data-driven dot
          const styles = new Set(chips.map((c) => c.getAttribute('style')));
          if (styles.size !== 1) fails.push(`card ${i + 1}: chips styled differently`);
        } else {
          const n = +it.dataset.lcsCount;
          if (it.querySelectorAll('img').length !== n) fails.push(`card ${i + 1}: picture count != ${n}`);
          if ((n === 1 ? '0' : '1') !== it.dataset.lcsKey) fails.push(`card ${i + 1}: form key does not follow the picture count`);
        }
        hist[it.dataset.lcsKey] = (hist[it.dataset.lcsKey] || 0) + 1;
        // the article/form never appears as text outside the chips
        const outside = [...it.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (outside) fails.push(`card ${i + 1}: stray text "${outside}"`);
        for (const img of it.querySelectorAll('img')) if (!img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: broken picture`);
      });
      const keys = Object.keys(hist);
      if (keys.length < 2) fails.push('only one chip is ever correct (no discrimination)');
      if (items.length >= 6 && keys.some((k) => hist[k] < 1)) fails.push('a chip key never appears');
      return fails;
    });
  },
};
