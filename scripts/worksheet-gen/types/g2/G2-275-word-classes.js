/**
 * G2-275 — Word Classes: Nouns, Verbs, Adjectives (nt20-B; `word-classes`,
 * G2, L.1.1.b/e · L.2.1.e — Wortarten / nature des mots / ordklasser).
 * Twelve word chips float at the top like fridge magnets (nouns carry a
 * small picture at d1/d2); below, three open sorting bins with an icon lid
 * (picture frame = noun, running figure = verb, paint splash = adjective)
 * and the locale's school term. The child copies every word into its bin.
 * Verbs/adjectives come from the per-locale list; nouns from the vocab.
 * d1 9 chips · d2 12 · d3 15, nouns WITHOUT pictures + a homograph guard.
 */
'use strict';
const { classIcons } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { WORD_CLASSES } = require('../../data/b2/word-classes.js');
const LS_REFUSED_THEMES = new Set(['emotions', 'colors', 'activities', 'weather', 'space']);
// Native review 2026-10-02: per-locale NOUNS a child reads just as well as a verb or an adjective when printed without
// their picture ("flag", "grill"; de lower-case "taube", "schaufel"), nouns too obscure for the age ("dimetrodon"),
// abstract "liberty", and lower-cased proper names ("rudolph"; de/fr/pt "halloween")
const LS_AMBIGUOUS = {
  en: ["water", "wave", "ice", "shovel", "cooler", "grill", "flag", "cross", "square", "oval", "whisk", "microwave", "hammer", "comb", "stamp", "nail", "dress", "sled", "coat", "dimetrodon", "mosasaurus", "allosaurus", "heptagon", "hornbill", "ottoman", "scallop", "liberty"],
  de: ["immergrün", "pfeife", "spritze", "schwamm", "taube", "schaufel", "carnotaurus", "akelei", "zustellung", "freiheit", "rudolph", "halloween"],
  es: ["cómoda", "entrega", "regalo", "cosecha", "plesiosaurio", "ictiosaurio", "iguanodonte", "dimetrodonte", "aguileña", "ranúnculo", "áster", "forsitia", "otomana", "puerro", "muérdago", "rodolfo", "libertad"],
  fr: ["carré", "violette", "jumelles", "pince", "gomme", "balance", "calao", "ancolie", "phlox", "zinnia", "canneberge", "conifère", "lamantin", "liberté", "halloween"],
  it: ["letto", "raccolto", "mento", "riccio", "impermeabile", "ovale", "culla", "maiasaura", "capasanta", "muffola", "porridge", "libertà"],
  pt: ["saia", "olho", "cômoda", "balança", "entrega", "torta", "violeta", "cobra", "gerbo", "tentilhão", "calêndula", "miosótis", "áster", "glicínia", "flox", "mitene", "maiassaura", "deinonico", "plesiossauro", "iguanodonte", "halloween", "liberdade", "sincelo"],
  nl: ["bij", "sla", "schop", "kleed", "plas", "vis", "raap", "wieg", "carnotaurus", "maiasaura", "blauweregen", "akelei", "drieblad", "squash", "bezorging", "vrijheid"],
  sv: ["blomma", "flagga", "lås", "vintergröna", "tiger", "maiasaura", "dimetrodon", "persimon", "sjuhörning", "blåregn", "skalare", "frihet"],
  da: ["lærer", "pakke", "fløjte", "bølge", "ske", "sand", "regn", "stol", "brød", "akeleje", "floks", "asters", "syvkant", "paletkniv", "oviraptor", "iguanodon", "frihed"],
  no: ["huske", "pakke", "lim", "pipe", "sprøyte", "fløyte", "tromme", "stige", "bølge", "hylle", "carnotaurus", "oviraptor", "iguanodon", "kardinal", "akeleie", "sjøku", "zinnia", "sykehusklær", "rudolf", "frihet"],
  fi: ["keksi", "ikivihreä", "carnotaurus", "dimetrodon", "mosasaurus", "maiasaura", "allosaurus", "rinkilät", "viiriäinen", "suunnikas", "toimitus", "vapaus"],
};
// ... and verbs / adjectives of the bank that are just as often a noun (es "dulce" = candy, nl "bakken" = the bins
// themselves, da "høj" = a hill): never on a new page; a PUBLISHED page that drew one swaps it (below)
const LS_BANK_DROP = {
  en: ["round"],
  es: ["dulce", "dormilón"],
  fr: ["minuscule", "rond"],
  it: ["dolce", "viola", "minuscolo"],
  pt: ["doce"],
  nl: ["bakken"],
  sv: ["hög"],
  da: ["høj"],
  no: ["høy", "stille"],
};
let _wcs = null;
const WCS = () => (_wcs = _wcs || require('../../lib/word-classes-screen.js'));

module.exports = {
  id: 'G2-275',
  slug: 'word-classes-sort',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'word-classes',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { per: 3, pics: true, tiers: [1], font: 20, lines: 4, binH: 400 },
    2: { per: 4, pics: true, tiers: [1, 2], font: 17, lines: 5, binH: 400 },
    3: { per: 5, pics: false, tiers: [1, 2, 3], font: 16, lines: 6, binH: 380 },
  },
  i18n: {
    en: {
      title: 'Nouns, Verbs, and Adjectives',
      instruction: 'Read every word. Is it a noun (naming word), a verb (doing word), or an adjective (describing word)? Write it in the right bin.',
    },
  },

  // Level Set 2026-10-02: the screen version of new pages (each face declares its own)
  get interactive() { return WCS().interactiveFor('sort'); },
  /** Level Set copies: what makes two pages of one level different (build-waves measures the overlap of these). */
  levelSetWords(m) { return (m.chips || []).map((c) => c.word); },

  build({ theme, difficulty, locale }, ctx) {
    // the published page (level 2, copy 1) is untouched; every Level Set page also stamps its chips in the meta
    const fresh = !(Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1);
    if (fresh && this.interactive && ctx && (ctx.interactive || ctx.answerKey)) {
      // the screen and the key are built from the SAME draws as the printed page (render-instance asserts the meta)
      const built = this._build({ theme, difficulty, locale }, { ...ctx, interactive: false, answerKey: false }, true);
      return WCS().screenOrKey(built, ctx, (locale || 'en').slice(0, 2), theme);
    }
    return this._build({ theme, difficulty, locale }, ctx, fresh);
  },

  _build({ theme, difficulty, locale }, ctx, fresh) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const W = WORD_CLASSES[loc];
    if (!W) throw new Error(`G2-275: no word-class bank for ${loc}`);
    const caseMode = d.pics ? (W.chipCase || 'keep') : (W.chipCaseD3 || W.chipCase || 'lower');
    const exclude = new Set((W.nounExclude || []).map((s) => s.toLowerCase()));
    const vb = new Set(W.verbs.map((v) => v.w.toLowerCase())), ab = new Set(W.adjectives.map((a) => a.w.toLowerCase()));
    let nouns = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc, caseMode) })), (e) => e.word.toLowerCase())
      .filter((e) => /^[\p{L}]+$/u.test(e.word) && [...e.word].length <= 12)
      .filter((e) => !exclude.has(e.word.toLowerCase()) && !vb.has(e.word.toLowerCase()) && !ab.has(e.word.toLowerCase()));
    // Level Set 2026-10-02 (new pages only — the published pages draw toys / animals / fruits / vehicles): a theme whose
    // pictured words are not nouns (emotions, colours, activities, weather adjectives) or are proper names a lower-case chip
    // would misspell (space: mars, venus) is refused; so is any -ing word ("sledding") and "us"; and the review's
    // per-locale list of words that are just as often a verb or an adjective (a picture-less chip would have two bins)
    if (fresh) {
      if (LS_REFUSED_THEMES.has(String(theme).toLowerCase())) throw new Error(`G2-275: theme ${theme} is not a noun theme (Level Set) — REFUSED`);
      const amb = new Set(((LS_AMBIGUOUS[loc]) || []).map((s) => s.toLowerCase()));
      nouns = nouns.filter((e) => !/ing$/.test(e.noun) && e.noun !== 'us' && !amb.has(e.word.toLowerCase()));
    }
    if (nouns.length < d.per) throw new Error(`G2-275: theme ${theme}/${loc} has ${nouns.length} usable nouns < ${d.per}`);
    const pickN = rng.sample(nouns, d.per);
    const tierOk = (x) => d.tiers.includes(x.tier || 1);
    // a bank verb / adjective that is ALSO a noun of this theme (no "fly" = an airplane on a vehicles page, "kort" = a card on a
    // toys page) has two bins: never on a new page; a published page that drew one swaps it (below)
    const themeNouns = new Set(entriesFor(theme, loc).map((e) => displayWord(e.singular, loc, 'lower').toLowerCase()));
    const drop = new Set([...(LS_BANK_DROP[loc] || []), ...[...W.verbs, ...W.adjectives].map((x) => x.w.toLowerCase()).filter((w) => themeNouns.has(w))]);
    const keep = (x) => !fresh || !drop.has(x.w.toLowerCase());
    const verbs = rng.sample(W.verbs.filter(tierOk).filter(keep), d.per), adjs = rng.sample(W.adjectives.filter(tierOk).filter(keep), d.per);
    // a PUBLISHED page that drew a flagged word (review 2026-10-02: fr "rond", it "minuscolo", sv "persimon", da "høj",
    // no "høy") takes the first unused clean word of the same class instead — no extra draw, so only those pages change
    if (!fresh) {
      const amb = new Set(LS_AMBIGUOUS[loc] || []);
      const swap = (picked, pool, bad, key) => picked.forEach((x, i) => {
        if (!bad(x)) return;
        const r = pool.find((y) => !bad(y) && !picked.some((z) => key(z) === key(y)));
        if (!r) throw new Error(`G2-275: no clean replacement for "${key(x)}" in ${theme}/${loc}`);
        picked[i] = r;
      });
      swap(pickN, nouns, (e) => amb.has(e.word.toLowerCase()), (e) => e.word.toLowerCase());
      swap(verbs, W.verbs.filter(tierOk), (v) => drop.has(v.w.toLowerCase()), (v) => v.w.toLowerCase());
      swap(adjs, W.adjectives.filter(tierOk), (a) => drop.has(a.w.toLowerCase()), (a) => a.w.toLowerCase());
    }
    if (verbs.length < d.per || adjs.length < d.per) throw new Error(`G2-275: bank ${loc} short of verbs/adjectives at d${difficulty}`);
    // `classes` narrows the sort. A three-way sort against an adjective bin is a
    // harder discrimination than a two-way one, and the two-way noun/verb sort is
    // where the sequence STARTS (L.1.1.b names nouns and verbs; adjectives arrive
    // at L.1.1.f) — all three shipped faces are three-bin, so the entry rung was
    // missing. ⚠ The RNG is still consumed identically on the default path: verbs
    // and adjectives are sampled above regardless, and only what reaches the chip
    // list and the bin row changes.
    const classes = d.classes || ['noun', 'verb', 'adj'];
    const chips = rng.shuffle([
      ...pickN.map((e) => ({ cls: 'noun', word: e.word, noun: e.noun, src: d.pics ? fileUri(theme, e.noun) : null })),
      ...verbs.map((v) => ({ cls: 'verb', word: v.w })),
      ...adjs.map((a) => ({ cls: 'adj', word: a.w })),
    ].filter((c) => classes.includes(c.cls)));
    // Level Set level 1 (`examples`): one WORKED EXAMPLE per bin — a word of that class, never one of the chips, printed
    // grey on the bin's first line. Drawn after every other draw, so the rest of the page is the page it would be without it.
    const examples = {};
    if (d.examples) {
      const onPage = new Set(chips.map((c) => c.word.toLowerCase()));
      const pools = { noun: nouns.filter((e) => !onPage.has(e.word.toLowerCase())).map((e) => e.word), verb: W.verbs.filter(tierOk).map((v) => v.w).filter((w) => !onPage.has(w.toLowerCase())), adj: W.adjectives.filter(tierOk).map((a) => a.w).filter((w) => !onPage.has(w.toLowerCase())) };
      for (const c of classes) { const p = pools[c]; if (!p.length) throw new Error(`G2-275: no worked example for ${c} in ${theme}/${loc}`); examples[c] = p[Math.floor(rng.next() * p.length)]; }
    }
    const chipHtml = chips.map((c) =>
      `<span class="ws-tile ws-tile--word" style="height:44px;font-size:${d.font}px" data-lcs-word="${c.word}" data-lcs-class="${c.cls}">` +
      (c.src ? `<img class="ws-icon" src="${c.src}" alt="" style="width:28px;height:28px">` : '') + `${c.word}</span>`).join('');
    const bin = (cls) => {
      const lines = [];
      for (let i = 1; i <= d.lines; i++) lines.push(`<line x1="8" y1="${i * (d.binH - 10) / (d.lines + 1)}" x2="186" y2="${i * (d.binH - 10) / (d.lines + 1)}" stroke="#C8BFAE" stroke-width="1.5" stroke-dasharray="3 5"/>`);
      if (examples[cls]) lines.push(`<text x="97" y="${(d.binH - 10) / (d.lines + 1) - 5}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="${d.font}" fill="#8A8276" data-lcs-example="${cls}">${examples[cls]}</text>`);
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-binwrap="${cls}">` +
        `<span style="width:56px;height:56px;border-radius:50%;background:#FFFFFF;border:2.5px solid #146B5E;display:flex;align-items:center;justify-content:center;flex:0 0 auto" data-lcs-lid="${cls}">${classIcons[cls]()}</span>` +
        `<div class="ws-bin" style="width:200px;height:${d.binH}px;max-width:200px;padding:0" data-lcs-bin="${cls}"><svg width="194" height="${d.binH - 10}" viewBox="0 0 194 ${d.binH - 10}" aria-hidden="true">${lines.join('')}</svg></div>` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#146B5E" data-lcs-term="${cls}">${W.terms[cls]}</span></div>`;
    };
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:24px;padding-top:4px" data-ws-content>` +
        `<div style="flex:0 0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;padding:6px 0" data-lcs-chips>${chipHtml}</div>` +
        `<div style="flex:0 0 auto;display:flex;justify-content:${classes.length > 2 ? 'space-between' : 'center'};${classes.length > 2 ? '' : 'gap:40px;'}padding:0 10px"${d.classes ? ` data-lcs-classes="${classes.join(',')}"` : ''}>${classes.map(bin).join('')}</div></div>`,
      // Level Set pages stamp their chips (the screen, the key and the copy builder read them); the published meta stays {}
      meta: fresh ? { chips: chips.map((c) => ({ word: c.word, cls: c.cls, ...(c.src ? { noun: c.noun } : {}) })), classes, lines: d.lines, binH: d.binH, font: d.font, ...(d.examples ? { examples } : {}) } : {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      // Hoisted: the class-count assertion below needs it, and it runs first.
      const row = document.querySelector('[data-lcs-classes]');
      const wantBins = row ? row.dataset.lcsClasses.split(',') : ['adj', 'noun', 'verb'];
      const chips = [...document.querySelectorAll('[data-lcs-word][data-lcs-class]')];
      const counts = { noun: 0, verb: 0, adj: 0 };
      const words = new Set();
      chips.forEach((c) => {
        counts[c.dataset.lcsClass] = (counts[c.dataset.lcsClass] || 0) + 1;
        const w = c.dataset.lcsWord.toLowerCase();
        if (words.has(w)) fails.push(`word "${w}" appears twice`);
        words.add(w);
        if (c.textContent.trim() !== c.dataset.lcsWord) fails.push(`chip text != word for "${w}"`);
      });
      // Equal counts ACROSS THE DECLARED CLASSES, not across a fixed three.
      // The original asserted counts.adj too, so a two-bin page failed with
      // adj: 0 — a correct page reported as a defect.
      const want = wantBins.map((c) => counts[c] || 0);
      if (!(want.every((v) => v === want[0]) && want[0] >= 3)) fails.push(`class counts ${JSON.stringify(counts)} over ${wantBins}`);
      const withImg = chips.filter((c) => c.querySelector('img'));
      const nounChips = chips.filter((c) => c.dataset.lcsClass === 'noun');
      if (withImg.length && withImg.length !== nounChips.length) fails.push('pictures on non-noun chips or missing on nouns');
      if (withImg.some((c) => c.dataset.lcsClass !== 'noun')) fails.push('picture on a non-noun chip');
      const bins = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
      // Was hardcoded to the three-bin page and would have failed a correct
      // two-bin one. The declaration is stamped only when a face narrows the set,
      // so the default assertion is unchanged.
      if (bins.slice().sort().join() !== wantBins.slice().sort().join()) fails.push(`bins ${bins}, want ${wantBins}`);
      const chipClasses = new Set([...document.querySelectorAll('[data-lcs-class]')].map((c) => c.dataset.lcsClass));
      chipClasses.forEach((c) => { if (!wantBins.includes(c)) fails.push(`chip class ${c} has no bin`); });
      // Level Set level 1: a worked example (grey, first line) in a bin is a word of that bin's class and never a chip
      document.querySelectorAll('[data-lcs-example]').forEach((x) => { if (!x.closest(`[data-lcs-bin="${x.dataset.lcsExample}"]`)) fails.push('a worked example outside its bin'); if (words.has(x.textContent.trim().toLowerCase())) fails.push(`worked example "${x.textContent}" is also a chip`); });
      const terms = [...document.querySelectorAll('[data-lcs-term]')].map((t) => t.textContent.trim());
      if (terms.length !== wantBins.length || new Set(terms).size !== wantBins.length || terms.some((t) => !t)) fails.push(`bin terms missing/duplicate (${terms.length} of ${wantBins.length})`);
      // no chip word equals a bin term
      terms.forEach((t) => { if (words.has(t.toLowerCase())) fails.push(`chip equals term "${t}"`); });
      return fails;
    });
  },
};
