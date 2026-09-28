/**
 * G2-274 — Fix the Sentence (nt20-B; `capitals-punctuation`, G2, L.1.2.b +
 * L.2.2 — Satzanfang groß, Punkt am Ende / majuscule et point). Five
 * "broken" sentences — no capital, no end mark, the name (and in German
 * every noun) in lowercase — each over a school-line ruling. The child plays
 * editor and rewrites it correctly. A checklist banner (A · Aa · .?!) says
 * what to look for without a paragraph. The corruption is a pure function
 * (lib/sentence-bank.js corrupt) that verify() re-derives inline.
 * d1: 4 lanes, capital + period · d2: 5 lanes, + names · d3: 5 lanes, the
 * end mark must be chosen (? and .; ! only for `exclaimStrict` frames).
 */
'use strict';
const { rulingBlock, fixChecklist } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, fileUri, countable } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const SB = require('../../lib/sentence-bank.js');
const { makeRng } = require('../../lib/rng.js');
const { textWidthEm } = require('../../primitives/bankword-width.js');

/**
 * The frames copy `variant` of one (type, level, locale) prints. Every copy walks the SAME seeded order
 * of the pool, re-derives what copies 1..variant-1 took, and takes UNUSED frames first — within the
 * level's quotas (needQ questions, needCaps name frames, no names at all when needCaps is 0). Only
 * when the unused frames of a class run out does a copy reuse one. Deterministic; null if the quotas
 * cannot be met from the pool.
 */
function allocateFrames(pool, d, typeId, difficulty, loc, variant) {
  const need = d.joinPairs ? d.lanes * 2 : d.lanes;
  const order = makeRng(`alloc|${typeId}|${difficulty}|${loc}`).shuffle(pool.slice().sort((a, b) => (a.id < b.id ? -1 : 1)));
  const isQ = (f) => SB.endMark(f.text) === '?';
  const hasName = (f) => /\{name\}/.test(f.text);
  const allowed = (f) => (d.needCaps === 0 ? !hasName(f) : true);
  const used = new Set();
  let pick = null;
  for (let c = 1; c <= variant; c++) {
    const take = [];
    const prefer = (pred, n) => {
      const cands = order.filter((f) => pred(f) && allowed(f) && !take.includes(f));
      const fresh = cands.filter((f) => !used.has(f.id)), old = cands.filter((f) => used.has(f.id));
      for (const f of fresh.concat(old)) { if (n <= 0) break; take.push(f); n--; }
    };
    prefer(isQ, d.needQ || 0);
    prefer((f) => hasName(f) && !isQ(f), Math.max(0, (d.needCaps || 0) - take.filter(hasName).length));
    prefer(() => true, need - take.length);
    if (take.length < need) return null;
    take.forEach((f) => used.add(f.id));
    pick = take;
  }
  return pick;
}

/** Would the frame, filled with a long noun and name, fit one line of the broken-sentence pill? */
function fitsPill(text, d) {
  // the pill shows the BROKEN sentence: lowercase, no marks — measure exactly that (letters + spaces)
  const probe = text.replace(/\{noun\}/g, 'wwwwwwwwwwww').replace(/\{name\}/g, 'wwwwwwww').toLowerCase().replace(/[^\p{L}\s]/gu, '').replace(/\s+/g, ' ').trim();
  const pillInner = 660 - d.icon - 12 - 28 - 28 - 4;
  return textWidthEm(probe) * d.font <= pillInner;
}

/** Estimated Nunito width (em) of any text: measured advances, 0.35 em for a character the table lacks. */
function widthEmAny(t) {
  let w = 0;
  for (const ch of String(t)) { try { w += textWidthEm(ch); } catch (e) { w += 0.35; } }
  return w;
}
/**
 * Answer key: a sentence printed on a writing line keeps the writing size (seated: x-height = the dashed band)
 * and, when it would run past the line's end (measured: 94 of 260 fr/de/fi/es keys), is fitted by WIDTH only
 * (textLength). Shrinking the font-size (the first fix) lifted the x-height off the dashed midline — the
 * alignment defect the operator reported twice (2026-09-21 starters, 2026-09-28 keys); qa/key-text-measure.js.
 */
function fitStarters(html, lineW) {
  return html.replace(/<text([^>]*?)font-size="([\d.]+)"([^>]*data-lcs-starter="1"[^>]*)>([^<]*)<\/text>/g, (m, a, px, b, txt) => {
    const plain = txt.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const room = lineW - 16;
    if (widthEmAny(plain) * +px <= room) return m;
    return `<text${a}font-size="${px}"${b} textLength="${room}" lengthAdjust="spacingAndGlyphs">${txt}</text>`;
  });
}

let _lsFrames = null;
/** The Level Set fix frames (native-authored ×11, 2026-09-28); lazy — data/ is gitignored. */
function levelSetFrames() {
  if (!_lsFrames) {
    const f = require('path').join(__dirname, '..', '..', 'data', 'b2', 'fix-frames-levelset.json');
    _lsFrames = require('fs').existsSync(f) ? JSON.parse(require('fs').readFileSync(f, 'utf8')) : {};
  }
  return _lsFrames;
}

/**
 * The answers of one lane, from its CANONICAL sentence(s) alone: the words as the child sees them
 * (lowercase, no marks, no ¿¡), whether each starts with a capital, and the mark after it.
 */
function fixAnswers(canonical) {
  return SB.tokenize(canonical).map((tok) => {
    const t = tok.replace(/\u00a0/g, ' ');
    const mark = (t.match(/([.?!…])\s*$/) || [])[1] || '';
    const word = t.replace(/^[¿¡]+/, '').replace(/\s*[.?!…]+$/, '');
    const first = [...word][0] || '';
    return { word, cap: first !== first.toLowerCase() && first === first.toUpperCase(), mark: mark === '…' ? '' : mark };
  });
}

module.exports = {
  fixAnswers,
  id: 'G2-274',
  slug: 'fix-the-sentence',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'capitals-punctuation',
  // B&W allowed (Level Set 2026-09-28): the icons are decoration (ladder verdict)
  themeAxis: { applicable: true, minNouns: 5, excludeBw: false },
  difficulty: {
    1: { lanes: 4, needCaps: 0, ends: ['.'], font: 18, rulH: 66, glyphH: 28, icon: 56, chips: ['capital', 'end'] },
    2: { lanes: 5, needCaps: 3, ends: ['.'], font: 16, rulH: 60, glyphH: 26, icon: 44, chips: ['capital', 'name', 'end'] },
    3: { lanes: 5, needCaps: 3, ends: ['.', '?', '!'], needQ: 2, font: 16, rulH: 60, glyphH: 26, icon: 44, chips: ['capital', 'name', 'end'] },
  },
  i18n: {
    en: {
      title: 'Fix the Sentence',
      instruction: 'Each sentence has lost its capital letter and its end mark. Write it again correctly on the line.',
    },
  },

  // Level Set 2026-09-28 — the screen version: pick a tool (Aa or a mark), tap a word.
  // The lanes are LIVE HTML under a cropped header (render-instance `lanes` mode): word buttons
  // must stay >= 44 px on a phone, which a scaled page image cannot give.
  interactive: {
    kind: 'tap-edit', item: '[data-lcs-item]', lanes: true, instructionKey: 'tapFix', screenHeight: 0,
    /**
     * The robot gate's INDEPENDENT truth, recomputed from the canonical sentence alone (never the
     * bundle's answer map): per word, whether it starts with a capital and which mark follows it.
     */
    oracle: (items) => items.map((it) => fixAnswers(it.meta['data-lcs-canonical'])),
  },

  build({ theme, difficulty, locale }, ctx) {
    const rng = ctx.rng;
    const screen = !!(ctx && ctx.interactive), isKey = !!(ctx && ctx.answerKey);
    const variant = (ctx && ctx.variant) || 1;
    // Level Set: fr's three-line title leaves no room for five 60 px writing lines (measured: the page
    // reached 954 against the footer band at 921 — the published fr level-2 page already does). New
    // copies with five lanes in fr get 52 px lines; the published page is left exactly as it is.
    const d0 = this.difficulty[difficulty];
    const d = !(difficulty === 2 && variant === 1) && (locale || 'en').slice(0, 2) === 'fr' && d0.lanes >= 5 && !d0.joinPairs
      ? { ...d0, rulH: d0.rulH - 8 } : d0;
    const loc = (locale || 'en').slice(0, 2);
    const bank = SENTENCES[loc];
    if (!bank) throw new Error(`G2-274: no sentence bank for ${loc}`);
    // Level Set: new copies draw only nouns every noun-form table of the bank covers (fi partitive …) —
    // one uncovered noun used to fail the whole page. The published page keeps its original draw.
    const tables = Object.values(bank.nounForms || {});
    const entries = entriesFor(theme, loc).filter(countable)
      .filter((e) => (difficulty === 2 && variant === 1) || tables.every((t) => t[e.vocabKey]));
    // Level Set 2026-09-28: 20 more native-authored fix frames per locale (data/b2/fix-frames-levelset.json)
    // so that copies print NEW sentences. The PUBLISHED coordinate (level 2, copy 1) keeps the original
    // bank — its page stays byte-identical; every other level/copy draws from both.
    const published = difficulty === 2 && variant === 1;
    const extra = published ? [] : (levelSetFrames()[loc] || []);
    const pool = bank.frames.concat(extra).filter((f) => f.kind === 'simple' && (f.uses || []).includes('fix'))
      .filter((f) => { const end = SB.endMark(f.text); if (!d.ends.includes(end)) return false; if (end === '!' && !f.exclaimStrict) return false; return true; })
      // ⚠ A question the child must MARK has to be recognisable as a question
      // once its mark is stripped. English/Germanic/Nordic questions invert
      // ("Is this your …", "Siehst du …") and Finnish carries -ko, so the word
      // order itself is the cue; a WH-word is a cue in any language. But a
      // Romance yes/no question has STATEMENT word order — "Você gosta de maçãs"
      // is a perfectly good sentence — so once the "?" is removed there is
      // nothing left to decide from and the page has no solution. Those frames
      // carry `qUncued: true` in the bank and are refused wherever the page asks
      // the child to supply the mark. Measured: all 4 pt question frames and 1 of
      // 4 es are uncued; en/de/nl/fr/it/sv/da/no/fi are clean.
      .filter((f) => !(d.needQ && f.qUncued && SB.endMark(f.text) === '?'))
      // Level Set: a new copy never takes a frame whose sentence cannot fit ONE line of the pill
      // (measured with a long noun and name; fr frames overflowed 5-lane pages). Published page unchanged.
      .filter((f) => published || fitsPill(f.text, d));
    // choose frames: ≥ needCaps with a {name} (a capital inside), ≥ needQ questions at d3
    let frames = null, guard = 0;
    while (!frames && guard++ < 200) {
      // joinPairs needs TWO distinct frames per lane: the broken pill holds two
      // sentences run together, and the child must decide where the first one
      // ENDS before capitalising anything. That is a different noticing from
      // restoring a mark you can see is missing, and it is the run-on lesson
      // teachers print as its own sheet.
      const need = d.joinPairs ? d.lanes * 2 : d.lanes;
      // Level Set: the copies of one level SHARE OUT the bank (allocateFrames) so they print different
      // sentences — measured before: 172 copy pairs shared 5 sentences with independent draws. The
      // published page (level 2, copy 1) keeps its original random draw.
      let cand;
      if (!published && guard === 1) {
        const a = allocateFrames(pool, d, this.id, difficulty, loc, variant);
        cand = a ? rng.shuffle(a) : [];
      } else {
        cand = rng.shuffle(pool.slice()).slice(0, need);
      }
      if (cand.length < need) break;
      const withName = cand.filter((f) => /\{name\}/.test(f.text)).length;
      const qs = cand.filter((f) => SB.endMark(f.text) === '?').length;
      if (withName < d.needCaps) continue;
      if (d.needQ && qs < d.needQ) continue;
      // Keyed on the CONFIG, not the difficulty index. A page whose checklist has
      // no Names chip must not print a name, and `needCaps === 0` is exactly the
      // config that omits that chip. Keying on `difficulty === 1` let a variation
      // that re-points the d1 config at d2 slip through: G2-281 shipped
      // "anna has a big fox" under a two-chip banner that never mentions names.
      // The nt20-B-VAR convention replicates one config across d1/d2/d3, so any
      // future face inherits the hole unless the guard reads the config.
      if (d.needCaps === 0 && cand.some((f) => /\{name\}/.test(f.text))) continue;
      frames = cand;
    }
    if (!frames) throw new Error(`G2-274: bank ${loc} cannot satisfy d${difficulty} (fix frames: ${pool.length})`);
    const nouns = rng.sample(entries, d.lanes);
    // In joinPairs mode `frames` holds 2 per lane, so walk it in pairs.
    const laneFrames = d.joinPairs
      ? Array.from({ length: d.lanes }, (_, i) => [frames[i * 2], frames[i * 2 + 1]])
      : frames.map((f) => [f]);
    const canonList = [];   // the content identity of the page (render-instance asserts print = screen = key)
    const lanes = laneFrames.map((pair, i) => {
      const frame = pair[0];
      const e = nouns[i];
      const mode = bank.nounCase === 'keep' ? 'keep' : 'lower';
      const nounText = SB.resolveNoun(bank, frame, { ...e, singular: displayWord(e.singular, loc, mode), plural: displayWord(e.plural, loc, mode) }, loc);
      const name = rng.sample(bank.names, 2); // array: a second {name} gets the second name
      const one = SB.fillFrame(frame.text, { name, noun: nounText, n: '', color: '' });
      // ⚠ RESOLVE THE NOUN PER FRAME. `resolveNoun` keys on `frame.noun` (sg/pl),
      // and reusing the first frame's resolution for the second produced an
      // UNGRAMMATICAL model answer whenever the pair disagreed in number —
      // measured on shipped seeds: es "Cada frambuesas tiene su lugar",
      // "Mateo tiene dos kiwi", de "Lina malt Kamele fuer Mia",
      // it "Lorenzo cerca tre cammelli". On the one page whose whole subject is
      // writing a sentence correctly. Found by the Spanish panel.
      const nounText2 = pair[1] ? SB.resolveNoun(bank, pair[1], { ...e, singular: displayWord(e.singular, loc, mode), plural: displayWord(e.plural, loc, mode) }, loc) : null;
      const two = pair[1] ? SB.fillFrame(pair[1].text, { name: rng.sample(bank.names, 2), noun: nounText2, n: '', color: '' }) : null;
      const canonical = two ? one + ' ' + two : one;
      canonList.push(canonical);
      // ⚠ A GLOBAL mark strip, not the trailing-only one. SB.corrupt removes the
      // final mark; here the mark BETWEEN the two sentences is exactly what the
      // child has to restore, so it must go too. verify() re-derives the same
      // way under the same flag.
      // ⚠ The opening sign must be stripped GLOBALLY too, not just at position 0.
      // A Spanish question in SECOND position kept its inverted mark —
      // "diego dibuja su ciruela para martin ¿quien tiene mi ciruela" — which
      // marks exactly where the second sentence begins, i.e. gives away the whole
      // task, and an opening sign with no closing one is not Spanish anyway.
      const strip = (t) => t.replace(/[¿¡]/g, '').replace(/[.?!…]/g, '').replace(/\s+/g, ' ').trim().toLocaleLowerCase(loc);
      // markSplit (L1 support): a slash shows WHERE the first sentence ends; the child still
      // supplies the mark and the capital
      const broken = two
        ? (d.markSplit ? strip(one) + ' / ' + strip(two) : strip(canonical))
        : SB.corrupt(canonical, loc);
      const laneAttrs = `data-lcs-item data-lcs-frame="${pair.map((f) => f.id).join('+')}"${d.joinPairs ? ' data-lcs-multi="1"' : ''}${d.markSplit && two ? ' data-lcs-split="1"' : ''} data-lcs-canonical="${canonical.replace(/"/g, '&quot;')}" data-lcs-end="${SB.endMark(canonical)}"`;
      if (screen) {
        // screen: the lane is carried as DATA (words, answers, icon); the runtime draws it live
        return `<div ${laneAttrs} data-lcs-broken-text="${broken.replace(/"/g, '&quot;')}" data-lcs-icon="${fileUri(theme, e.noun)}" style="display:none"></div>`;
      }
      const keyStarters = isKey ? (two ? { 0: one, 1: two } : { 0: canonical }) : {};
      return `<div class="ws-lane" style="display:grid;grid-template-columns:${d.icon}px 1fr;gap:12px;align-items:center;padding:10px 14px" ${laneAttrs}>` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.icon}px;height:${d.icon}px">` +
        `<div style="display:flex;flex-direction:column;gap:6px;min-width:0">` +
        `<div style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:5px 14px;font-family:'Nunito';font-weight:700;font-size:${d.font}px;color:#3A3530" data-lcs-broken>${broken}</div>` +
        // ⚠ TWO sentences need TWO lines. The run-on faces ask the child to write
        // the pair out as two separate sentences and got a SINGLE rule — my
        // `rulH: 80` made that one line taller, which is not the same thing and is
        // exactly the kind of near-miss that reads as fixed. Found by the French
        // panel reading the page rather than the config.
        fitStarters(rulingBlock({ rows: d.joinPairs ? 2 : 1, w: 660 - d.icon - 12 - 28, h: d.rulH, glyphH: d.glyphH, starters: keyStarters }), 660 - d.icon - 12 - 28) + `</div></div>`;
    });
    // Keyed on the CONFIG, not the difficulty index -- the same hole as the
    // name guard above, in the one line that guard did not cover. G2-281
    // re-points the d1 config but overrides `ends: ['.','?']` with `needQ: 1`,
    // so at least one sentence needs a question mark while the banner showed a
    // bare '.', telling the child to look for the wrong thing. Byte-identical
    // for every shipped base coordinate (d1 and d2 are ['.'], d3 is ['.','?','!']),
    // so b2-baseline reports 0 drift; only G2-281 changes, and it changes to
    // the truth. Found by the Norwegian panel reading the source, not a gate.
    const glyphs = { capital: 'A', name: 'Aa', end: d.ends.join('') };
    // hideChips (L3 of G2-282): no checklist — the child must remember what to check
    const chips = d.hideChips ? '' : fixChecklist({ chips: d.chips.map((k) => ({ key: k, glyph: glyphs[k], label: bank.fixLabels[k] })) });
    if (screen) {
      return {
        bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:10px" data-ws-content data-lcs-marks="${d.ends.join('')}"${d.hideChips ? ' data-lcs-nochips="1"' : ''}>${chips}${lanes.join('')}</div>`,
        meta: { canonical: canonList },
      };
    }
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:10px;justify-content:space-evenly" data-ws-content${d.hideChips ? ' data-lcs-nochips="1"' : ''}>${chips}${lanes.join('')}</div>`,
      meta: { canonical: canonList },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const corrupt = (s) => s.trim().replace(/^[¿¡]+\s*/, '').replace(/[\s  ]*[.?!…]+$/, '').toLocaleLowerCase(lang);
      // Two corruptions, and the second is the whole point of the run-on face: the
      // mark BETWEEN the two sentences must go too, so the child has to find where
      // the first one ends. The trailing-only form would leave that period visible
      // and the assertion below would fail a correct page.
      const corruptAll = (s) => s.replace(/[¿¡]/g, '').replace(/[.?!…]/g, '').replace(/\s+/g, ' ').trim().toLocaleLowerCase(lang);
      const lanes = [...document.querySelectorAll('[data-lcs-item]')];
      // Floor of 3, not 4. The name-free variant cannot reach four lanes in every
      // language: measured, the fix frames that carry no name number 10 in en but
      // only 5 in pt and it, and no 4-lane name-free configuration builds in all
      // eleven. No shipped coordinate has fewer than four lanes, so relaxing the
      // floor changes nothing that exists (b2-baseline: 0 drift).
      if (lanes.length < 3) fails.push(`only ${lanes.length} lanes`);
      const frames = new Set(), canon = new Set();
      const ends = [];
      lanes.forEach((lane, i) => {
        const c = lane.dataset.lcsCanonical, b = lane.querySelector('[data-lcs-broken]');
        if (frames.has(lane.dataset.lcsFrame)) fails.push(`lane ${i + 1}: frame repeated`);
        frames.add(lane.dataset.lcsFrame);
        if (canon.has(c)) fails.push(`lane ${i + 1}: sentence repeated`);
        canon.add(c);
        if (!b) { fails.push(`lane ${i + 1}: no broken pill`); return; }
        const multi = !!lane.dataset.lcsMulti;
        const split = !!lane.dataset.lcsSplit;
        const want = multi ? (split ? corruptAll(c.replace(/([.?!])\s+(?=\S)/, '$1 \u0001 ')).replace('\u0001', '/') : corruptAll(c)) : corrupt(c);
        // fr typography adds WORD JOINERS inside inverted questions ("vois-⁠tu") in text nodes only
        if (b.textContent.replace(/⁠/g, '').trim() !== want) fails.push(`lane ${i + 1}: broken text is not corrupt(canonical)`);
        if (b.textContent.trim() === c.trim()) fails.push(`lane ${i + 1}: nothing to fix`);
        if (!/^[¿¡]?\p{Lu}/u.test(c)) fails.push(`lane ${i + 1}: canonical does not start with a capital`);
        if (!/[.?!]$/.test(c)) fails.push(`lane ${i + 1}: canonical has no end mark`);
        // A run-on lane must genuinely contain TWO sentences to rejoin.
        if (multi && (c.match(/[.?!]/g) || []).length < 2) fails.push(`lane ${i + 1}: run-on lane has only one sentence`);
        if (/[.?!¿¡]/.test(b.textContent) || /\p{Lu}/u.test(b.textContent)) fails.push(`lane ${i + 1}: broken text still has a capital or mark`);
        if (/\{/.test(c)) fails.push(`lane ${i + 1}: unfilled slot`);
        ends.push(lane.dataset.lcsEnd);
        if (!lane.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`lane ${i + 1}: no ruling`);
        const vis = [...lane.querySelectorAll('*')].map((n) => n.textContent.trim());
        if (vis.some((v) => v === c.trim())) fails.push(`lane ${i + 1}: canonical printed`);
      });
      const chips = document.querySelectorAll('[data-lcs-fixchip]');
      if (chips.length < 2 && !document.querySelector('[data-lcs-nochips]')) fails.push('checklist missing');
      return fails;
    });
  },
};
