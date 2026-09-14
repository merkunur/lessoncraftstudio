/**
 * K-323 — All About Me (nt20-C; family key `all-about-me`, K, W.K.2 + SL.K.5).
 * Design: docs/worksheet-gen/b3-designs/K-323-all-about-me.md §2/§5.
 *
 * A framed poster the child takes home: a full-width name banner (a writing
 * lane, glyphH 40), a 300 px portrait frame with photo corners, an age lane
 * with ONE open numeral box inside the literal (`I am [ ] years old`), a
 * family drawing box and three favourite windows (heading + draw zone).
 * Every field is a LABELLED EMPTY SLOT; nothing printed answers anything;
 * drawing comes before writing. NOT the G2-318 fact table (a G2 register).
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the base draws NO pictures
 * (draw only — the picture pools are F1/F3/F4, Phase 2); the enumerator emits
 * one instance per (type, difficulty, locale). No unit axis in this batch.
 * The base is SEEDLESS: build() never touches the rng, so every seed renders
 * byte-identical (the gate's sweep asserts it).
 *
 * Every printed string is a whole panel literal from data/b3/all-about-me.js
 * (lib/b3-common.js bank — a missing locale block THROWS, never an en
 * fallback); a literal that is missing, carries a `{` slot or a digit is a
 * REFUSAL, never padded. Never image-vocabulary.js at render.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (favourites /
 * sentenceLane / box / portrait / glyphH …), never on the level index:
 *   d1  name · age · portrait · family (glyphH 48, banner 96, portrait 330 —
 *       the frame STRETCHES down the row, see the build record)
 *   d2  + three favourite windows (animal · food · colour)          (ships)
 *   d3  + a toy window (4 x 160) + a `school` sentence lane; portrait 288
 *
 * Chrome budget (README ruling): body 722 with 3-line title + 3-line
 * instruction; the K-319 build measured 700 under a 4-line fi title. Rows
 * `<banner>px <portrait>px minmax(<favMin>px,1fr) [84px]`, gap 12: d2 stack
 * 84 + 12 + 300 + 12 + 220 = 628, d3 84 + 12 + 288 + 12 + 196 + 12 + 84 = 688;
 * the slack opens in the favourites row (inside the draw zones), never in
 * the lanes or the portrait.
 *
 * Answer hiding + stamps: structural only — one empty [data-lcs-name] lane,
 * one empty [data-lcs-age] box (K-320's blankNumeralBox: `data-lcs-answer=""`,
 * never `answerBox`, whose missing answer prints "undefined"), N empty
 * [data-lcs-drawbox], the headings as bank literals (the gate cross-checks
 * them in node), no digit, no <img>, no `{` in the body. `data-lcs-face` is
 * NOT stamped (the base stays byte-identical when the faces land).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { profileCard } = require('../../templates/components-b3.js');
const C3 = require('../../templates/components-b3.js');
const { fileUri } = require('../../lib/b2-common.js');
const resolve = require('../../image-cache/resolve.js');
const { COLOR_WORDS } = require('../../data/color-words.js');

/*
 * PHASE 2 (2026-09-14) — the ADDITIVE `layout` knob (design §3; the faces are
 * rows in tools/b3var-rows/all-about-me.js that set it in the difficulty
 * config; the base's three configs carry no `layout`, so the base path is
 * byte-identical — tools/b3-baseline.js is the proof). Stamped on the root as
 * data-lcs-layout ONLY when declared (never data-lcs-face — the base's verify
 * fails that stamp). Every face reads the same bank; a missing literal / `{`
 * slot / digit REFUSES (never padded); the picture seed is the locale-neutral
 * ALL_ABOUT_ME_PICTURES (required lazily — data/ is gitignored, and a
 * require at load time would take down loadAllTypes() in a checkout without
 * the bank; the base only fails at build).
 *   'favourites' F1 K-342 — CHOOSE one of six pictured options per category
 *      and COPY its word: categories / perRow / tile / tileH / pic / tileGap /
 *      copyW / favRowMin. Labels = bank.optionWords[vocabKey] (colours:
 *      COLOR_WORDS[loc]); an option without a label drops, a category under
 *      perRow drops, fewer than 2 categories REFUSES. rng.sample per row.
 *   'family'     F2 K-343 — REPRESENT a self-known count on an EMPTY ten-frame
 *      and write the numeral: frames / cell / box / drawH / frameMin. Seedless.
 *   'face'       F3 K-344 — LABEL the printed face from a word bank (the one
 *      verifiable face: bank ids <=> lane ids): parts / icon / laneW / laneH /
 *      bankPx / drawMin. The bank order is rng.shuffle'd.
 *   'ican'       F4 K-345 — READ a repeated "I can" frame and TICK it (open):
 *      cards / tick / pic / textW / literalPx / rowMin / laneH. rng.sample of
 *      the actions that carry a `can` literal; `refuse:['ican']` or fewer than
 *      `cards` literals REFUSES.
 *   'name'       F5 K-346 — WRITE the name one letter per box, COUNT, name
 *      the FIRST letter, COMPARE with a friend: boxes / box / boxGap / cardH /
 *      countBoxW / countBoxH. Seedless.
 */

const BANK = 'all-about-me';
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const FACE_LABEL_CAP = 96;     // px at Nunito 800 16 — the F1 tile label ceiling (design §3 F1; the gate measures it)
const K_FLOOR = 56;         // tokens.density.K.minElement — an element the child marks or writes in
const BODY_W = 675;
const PAIR_GAP = 15;
const BANNER_LABEL_CAP = 191;   // 643 inner − 12 − 440 lane (design §2; fi `Minun nimeni on` 156.6 at 20)

function literal(labels, pathStr, loc) {
  const v = pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), labels);
  if (typeof v !== 'string' || !v.trim()) throw new Error(`K-323: ${loc} has no literal labels.${pathStr} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`K-323: ${loc} labels.${pathStr} carries a slot "${v}" (whole literals only)`);
  if (/\d/.test(v)) throw new Error(`K-323: ${loc} labels.${pathStr} prints a digit "${v}"`);
  return v;
}

module.exports = {
  id: 'K-323',
  slug: 'all-about-me',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'all-about-me',
  themeAxis: { applicable: false },
  difficulty: {
    1: { favourites: null, sentenceLane: null, glyphH: 48, bannerH: 96, laneW: 440, portrait: 330, portraitStretch: true, ageH: 96, box: 72, familyMin: 222, favW: 0, favH: 0, favMin: 0, labelPx: 20, headingPx: 18, rows: '96px minmax(330px,1fr)' },
    2: { favourites: ['animal', 'food', 'color'], sentenceLane: null, glyphH: 40, bannerH: 84, laneW: 440, portrait: 300, portraitStretch: false, ageH: 84, box: 64, familyMin: 204, favW: 217, favH: 220, favMin: 220, labelPx: 20, headingPx: 18, rows: '84px 300px minmax(220px,1fr)' },
    3: { favourites: ['animal', 'food', 'color', 'toy'], sentenceLane: 'school', sentenceLaneW: 400, glyphH: 40, bannerH: 84, laneW: 440, portrait: 288, portraitStretch: false, ageH: 84, box: 64, familyMin: 192, favW: 160, favH: 220, favMin: 196, labelPx: 20, headingPx: 18, rows: '84px 288px minmax(196px,1fr) 84px' },
  },
  i18n: {
    en: {
      title: 'All About Me',
      instruction: 'Write your name and your age, draw yourself and your family, then draw your three favorite things.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error('K-323: no difficulty config');
    const loc = (locale || 'en').slice(0, 2);
    const L = bankLoc && bankLoc.labels;
    if (!L) throw new Error(`K-323: ${loc} bank has no labels block (refuse)`);
    if (d.layout) return this._buildFace(bankLoc, d, loc, ctx || {});   // Phase 2 faces; the base path below is untouched
    // guards on the RESOLVED config
    if (d.box < K_FLOOR) throw new Error(`K-323: numeral box ${d.box} < the K floor ${K_FLOOR}`);
    if (d.glyphH < 32) throw new Error(`K-323: glyphH ${d.glyphH} < 32 (a K writing lane)`);
    if (d.bannerH - 20 < d.glyphH + 8) throw new Error(`K-323: banner ${d.bannerH} cannot hold a glyphH ${d.glyphH} lane`);
    if (d.ageH - 20 < d.box) throw new Error(`K-323: age lane ${d.ageH} cannot hold a ${d.box} box`);
    if (d.portrait < 240) throw new Error(`K-323: portrait ${d.portrait} < 240 (a crayon-sized frame)`);
    const colW = BODY_W - d.portrait - PAIR_GAP;
    if (colW < 249 + 36) throw new Error(`K-323: age column ${colW} cannot hold the widest age row 249 + padding`);
    if (d.favourites) {
      if (d.favourites.length < 2) throw new Error('K-323: a favourites row needs >= 2 windows');
      if (new Set(d.favourites).size !== d.favourites.length) throw new Error('K-323: a favourite category repeats');
      const rowW = d.favourites.length * d.favW + (d.favourites.length - 1) * 12;
      if (rowW > BODY_W + 1) throw new Error(`K-323: favourites row ${rowW} > body ${BODY_W}`);
      if (d.favW - 28 < 120) throw new Error(`K-323: favourite window ${d.favW} leaves a heading column < 120`);
      if (!(d.favMin >= 4 + 46 + 20 + 100 && d.favMin <= d.favH)) throw new Error(`K-323: favourites row floor ${d.favMin} outside [170, ${d.favH}]`);
    }
    const age = L.age || {};
    const glue = age.glue === true;
    const post = literal(L, 'age.post', loc);
    if (glue && !/^-/.test(post)) throw new Error(`K-323: ${loc} age.glue is true but age.post "${post}" does not start with "-"`);
    if (!glue && age.glue !== false) throw new Error(`K-323: ${loc} age.glue must be true or false`);

    const favourites = d.favourites
      ? d.favourites.map((key) => ({ key, heading: literal(L, 'favHeading.' + key, loc), w: d.favW, h: d.favH, minH: d.favMin, headingPx: d.headingPx }))
      : null;
    const sentence = d.sentenceLane
      ? { key: d.sentenceLane, label: literal(L, d.sentenceLane, loc), laneW: d.sentenceLaneW || 400, glyphH: d.glyphH }
      : null;

    const bodyHtml = profileCard({
      rows: d.rows,
      banner: { label: literal(L, 'nameIs', loc), laneW: d.laneW, glyphH: d.glyphH, h: d.bannerH, labelPx: d.labelPx },
      portrait: { size: d.portrait, stretch: !!d.portraitStretch, label: literal(L, 'thisIsMe', loc) },
      age: { pre: literal(L, 'age.pre', loc), post, glue, box: d.box, h: d.ageH, labelPx: d.labelPx },
      family: { label: literal(L, 'family', loc), h: d.familyMin },
      favourites,
      sentence,
      stamps: `data-lcs-locale="${loc}" data-lcs-label-px="${d.labelPx}" data-lcs-heading-px="${d.headingPx}" data-lcs-glyph-h="${d.glyphH}" data-lcs-banner-cap="${BANNER_LABEL_CAP}"`,
    });
    return { bodyHtml, meta: { favourites: d.favourites || [], sentence: d.sentenceLane || null, portrait: d.portrait, box: d.box, glyphH: d.glyphH } };
  },

  /* ------------------------------------------------------------ Phase 2 faces */
  /** The locale-neutral picture seed (lazy: data/ is gitignored). */
  _pictures() {
    const mod = require('../../data/b3/all-about-me.js');
    if (!mod.ALL_ABOUT_ME_PICTURES) throw new Error('K-323: data/b3/all-about-me.js has no ALL_ABOUT_ME_PICTURES seed');
    return mod.ALL_ABOUT_ME_PICTURES;
  },
  _root(loc, layout, stamps, style, inner) {
    return `<div data-ws-content data-lcs-type="all-about-me" data-lcs-layout="${layout}" data-lcs-locale="${loc}" ${stamps} style="flex:1;min-height:0;${style}">${inner}</div>`;
  },

  _buildFace(bank, d, loc, ctx) {
    if (!ctx.rng && d.layout !== 'family' && d.layout !== 'name') throw new Error(`K-323 ${d.layout}: no rng in ctx (a seeded face)`);
    if (d.glyphH != null && d.glyphH < 32) throw new Error(`K-323 ${d.layout}: glyphH ${d.glyphH} < 32 (a K writing lane)`);
    switch (d.layout) {
      case 'favourites': return this._buildFavourites(bank, d, loc, ctx);
      case 'family': return this._buildFamily(bank, d, loc, ctx);
      case 'face': return this._buildFaceLabels(bank, d, loc, ctx);
      case 'ican': return this._buildICan(bank, d, loc, ctx);
      case 'name': return this._buildName(bank, d, loc, ctx);
      default: throw new Error(`K-323: unknown layout "${d.layout}"`);
    }
  },

  /** F1 — My Favorite Things: six pictured options per category + an empty copy lane. */
  _buildFavourites(bank, d, loc, ctx) {
    const L = bank.labels, rng = ctx.rng, P = this._pictures();
    const perRow = d.perRow, tile = d.tile, tileH = d.tileH, pic = d.pic, gap = d.tileGap, copyW = d.copyW;
    if (!(perRow >= 4 && perRow <= 6)) throw new Error(`K-323 favourites: perRow ${perRow} outside 4..6`);
    if (pic < K_FLOOR) throw new Error(`K-323 favourites: pic ${pic} < the K floor ${K_FLOOR}`);
    if (tile < pic + 4 || tileH < pic + 26) throw new Error(`K-323 favourites: tile ${tile}x${tileH} cannot hold a ${pic} picture over a 20 px label`);
    const rowW = perRow * tile + (perRow - 1) * gap;
    if (rowW > 639) throw new Error(`K-323 favourites: tile row ${rowW} > the lane inner 639`);
    if (40 + 8 + copyW > 639) throw new Error(`K-323 favourites: copy row ${48 + copyW} > the lane inner 639`);
    if (!(d.favRowMin >= 24 + tileH + 64 + 20 + 12)) throw new Error(`K-323 favourites: row floor ${d.favRowMin} cannot hold heading + tiles + lane`);
    if (!Array.isArray(d.categories) || d.categories.length < 2) throw new Error('K-323 favourites: categories must list >= 2 category ids');
    const m = resolve.manifest();
    const words = bank.optionWords || {};
    const usedKeys = new Set();
    const rows = [];
    for (const cat of d.categories) {
      const c = (P.categories || []).find((x) => x.id === cat);
      if (!c) throw new Error(`K-323 favourites: no picture category "${cat}" in the seed`);
      const heading = literal(L, 'favHeading.' + cat, loc);
      // every option that resolves AND carries a label in this locale; the label is a whole literal (no slot, no digit)
      const live = [];
      for (const o of c.options || []) {
        if (o.color != null) {
          const w = COLOR_WORDS[loc] && COLOR_WORDS[loc][o.color];
          if (typeof w !== 'string' || !w.trim() || w.includes('{') || /\d/.test(w)) continue;
          live.push({ key: 'color:' + o.color, color: o.color, label: w });
          continue;
        }
        if (BW_MARKER.test(String(o.theme))) throw new Error(`K-323 favourites: option ${o.theme}/${o.noun} comes from a B&W directory`);
        const n = m.themes[o.theme] && m.themes[o.theme].nouns[o.noun];
        const key = n && n.vocabKey;
        if (!key) throw new Error(`K-323 favourites: option ${o.theme}/${o.noun} has no vocabKey`);
        const w = words[key];
        if (typeof w !== 'string' || !w.trim()) continue;      // unlabelled in this locale: the option drops (never a vocab fallback)
        if (w.includes('{') || /\d/.test(w)) throw new Error(`K-323 favourites: ${loc} optionWords.${key} "${w}" is not a whole literal`);
        if (usedKeys.has(key)) continue;                        // a vocabKey shows once on the page
        live.push({ key, src: fileUri(o.theme, o.noun), label: w });
      }
      if (live.length < perRow) continue;                       // the category drops (design §3 F1 refusal)
      const chosen = rng.sample(live, perRow);
      chosen.forEach((o) => usedKeys.add(o.key));
      rows.push({ cat, heading, options: chosen });
    }
    if (rows.length < 2) throw new Error(`K-323 favourites: ${loc} keeps ${rows.length} category with >= ${perRow} labelled options (< 2: refuse)`);
    const inner = rows.map((r) => C3.aboutMeFavouriteRow({ category: r.cat, heading: r.heading, options: r.options, glyphH: d.glyphH, laneW: copyW, minH: d.favRowMin, headingPx: d.headingPx, tile, tileH, pic, gap })).join('');
    const bodyHtml = this._root(loc, 'favourites',
      `data-lcs-rows="${rows.length}" data-lcs-per="${perRow}" data-lcs-pic="${pic}" data-lcs-tile="${tile}" data-lcs-label-cap="${FACE_LABEL_CAP}" data-lcs-heading-px="${d.headingPx}" data-lcs-glyph-h="${d.glyphH}"`,
      `display:grid;grid-template-rows:repeat(${rows.length},minmax(${d.favRowMin}px,1fr));gap:12px`, inner);
    return { bodyHtml, meta: { categories: rows.map((r) => r.cat), options: rows.map((r) => r.options.map((o) => o.key)) } };
  },

  /** F2 — All About My Family: a family drawing box + four empty ten-frames with a numeral box each. */
  _buildFamily(bank, d, loc) {
    const L = bank.labels;
    if (d.cell < K_FLOOR) throw new Error(`K-323 family: ten-frame cell ${d.cell} < the K floor ${K_FLOOR}`);
    if (d.box < K_FLOOR) throw new Error(`K-323 family: numeral box ${d.box} < the K floor ${K_FLOOR}`);
    if (5 * d.cell + 3 > 302) throw new Error(`K-323 family: a ${d.cell} ten-frame is wider than the card inner 302`);
    if (!(d.frameMin >= 28 + 56 + 8 + 2 * d.cell + 3)) throw new Error(`K-323 family: row floor ${d.frameMin} cannot hold a heading row + a ${d.cell} ten-frame`);
    if (!(d.drawH >= 150)) throw new Error(`K-323 family: draw box ${d.drawH} < 150`);
    if (!Array.isArray(d.frames) || d.frames.length < 2 || d.frames.length > 4) throw new Error('K-323 family: frames must list 2..4 count ids');
    if (new Set(d.frames).size !== d.frames.length) throw new Error('K-323 family: a count id repeats');
    const cards = d.frames.map((key) => ({ key, heading: literal(L, 'countHeads.' + key, loc) }));
    for (const c of cards) if (!/:$/.test(c.heading.trim())) throw new Error(`K-323 family: ${loc} countHeads.${c.key} "${c.heading}" must end with ":"`);
    const inner = C3.aboutMeDrawBox({ w: BODY_W, h: d.drawH, label: literal(L, 'familyDraw', loc), key: 'family', labelKey: 'familyDraw' }) +
      C3.aboutMeFamilyFrames({ cards, cell: d.cell, box: d.box, minRow: d.frameMin, headingPx: d.headingPx });
    const bodyHtml = this._root(loc, 'family', `data-lcs-frames-n="${cards.length}" data-lcs-frame-keys="${cards.map((c) => c.key).join(',')}" data-lcs-cell="${d.cell}" data-lcs-box="${d.box}" data-lcs-heading-px="${d.headingPx}"`,
      'display:flex;flex-direction:column;gap:12px', inner);
    return { bodyHtml, meta: { frames: d.frames } };
  },

  /** F3 — This Is Me: Label the Face — the one verifiable face (bank ids <=> lane ids). */
  _buildFaceLabels(bank, d, loc, ctx) {
    const L = bank.labels, rng = ctx.rng, P = this._pictures();
    const parts = d.parts;
    if (!Array.isArray(parts) || parts.length < 3 || parts.length > 7) throw new Error('K-323 face: parts must list 3..7 anchor ids');
    if (new Set(parts).size !== parts.length) throw new Error('K-323 face: a part repeats');
    if (d.icon < 200) throw new Error(`K-323 face: icon ${d.icon} < 200`);
    if (d.laneW < 150 || d.laneH < K_FLOOR) throw new Error(`K-323 face: lane ${d.laneW}x${d.laneH} under the floor (150 x ${K_FLOOR})`);
    if (2 * d.laneW + 14 + d.icon > BODY_W) throw new Error(`K-323 face: lanes + icon ${2 * d.laneW + 14 + d.icon} > the body ${BODY_W}`);
    if (!(d.drawMin >= 150)) throw new Error(`K-323 face: draw box floor ${d.drawMin} < 150`);
    const face = P.face || {};
    if (BW_MARKER.test(String(face.theme))) throw new Error('K-323 face: the face picture is in a B&W directory');
    const anchors = face.anchors || {};
    for (const id of parts) {
      const a = anchors[id];
      if (!(a && a.x > 0 && a.x < 1 && a.y > 0 && a.y < 1 && (a.side === 'L' || a.side === 'R'))) throw new Error(`K-323 face: no anchor for "${id}"`);
    }
    const perSide = { L: 0, R: 0 };
    parts.forEach((id) => { perSide[anchors[id].side]++; });
    const H = 360;
    for (const s of ['L', 'R']) if (perSide[s] * (d.laneH + 20) - 20 > H) throw new Error(`K-323 face: ${perSide[s]} lanes on side ${s} do not fit ${H} px`);
    const fw = bank.faceWords || {};
    const words = parts.map((id) => {
      const w = fw[id];
      if (typeof w !== 'string' || !w.trim()) throw new Error(`K-323 face: ${loc} has no faceWords.${id} (refuse, never pad)`);
      if (w.includes('{') || /\d/.test(w)) throw new Error(`K-323 face: ${loc} faceWords.${id} "${w}" is not a whole literal`);
      return { id, word: w };
    });
    const seen = new Set();
    for (const w of words) { const k = w.word.toLocaleLowerCase(loc); if (seen.has(k)) throw new Error(`K-323 face: two parts print the same word "${w.word}" in ${loc}`); seen.add(k); }
    const bankOrder = rng.shuffle(words);
    const src = fileUri(face.theme, face.noun);
    const inner = C3.aboutMeFaceBank({ words: bankOrder, wordPx: d.bankPx }) +
      C3.aboutMeFaceLabels({ src, icon: d.icon, anchors, ids: parts, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, w: 674, h: H }) +
      C3.aboutMeDrawBox({ w: BODY_W, h: d.drawMin, label: literal(L, 'drawFace', loc), key: 'face', labelKey: 'drawFace', flex: true });
    const anchorJson = JSON.stringify(Object.fromEntries(Object.entries(anchors).map(([k, a]) => [k, { x: a.x, y: a.y, side: a.side }])));
    const bodyHtml = this._root(loc, 'face', `data-lcs-parts="${parts.join(',')}" data-lcs-anchors='${anchorJson.replace(/'/g, '&#39;')}' data-lcs-icon="${d.icon}" data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" data-lcs-draw-min="${d.drawMin}"`,
      'display:flex;flex-direction:column;gap:12px', inner);
    return { bodyHtml, meta: { parts, bank: bankOrder.map((w) => w.id) } };
  },

  /** F4 — I Can: eight "I can …" frames with a tick box and a picture cue + one "I want to learn" lane (open-ended). */
  _buildICan(bank, d, loc, ctx) {
    const L = bank.labels, rng = ctx.rng, P = this._pictures();
    if (!(d.cards >= 6 && d.cards <= 8 && d.cards % 2 === 0)) throw new Error(`K-323 ican: cards ${d.cards} outside {6, 8}`);
    if (d.tick < K_FLOOR || d.pic < K_FLOOR) throw new Error(`K-323 ican: tick ${d.tick} / pic ${d.pic} under the K floor ${K_FLOOR}`);
    if (d.tick + 10 + d.pic + 10 + d.textW > 302) throw new Error(`K-323 ican: row ${d.tick + 20 + d.pic + d.textW} > the card inner 302`);
    if (!(d.rowMin >= 28 + Math.max(d.tick, d.pic))) throw new Error(`K-323 ican: row floor ${d.rowMin} cannot hold the picture`);
    if (!(d.laneH >= 20 + 24 + 6 + 64)) throw new Error(`K-323 ican: lane ${d.laneH} cannot hold the literal + a 64 px ruling row`);
    if ((bank.refuse || []).includes('ican')) throw new Error(`K-323 ican: ${loc} refuses the face (bank.refuse)`);
    const can = bank.can || {};
    const live = [];
    for (const a of P.actions || []) {
      const s = can[a.id];
      if (typeof s !== 'string' || !s.trim()) continue;         // no literal for this action in this locale → the action drops
      if (s.includes('{') || /\d/.test(s)) throw new Error(`K-323 ican: ${loc} can.${a.id} "${s}" is not a whole literal`);
      if ([...s].length > 34) throw new Error(`K-323 ican: ${loc} can.${a.id} "${s}" > 34 chars`);
      if (!a.cue || BW_MARKER.test(String(a.cue.theme))) throw new Error(`K-323 ican: action ${a.id} cue is in a B&W directory`);
      live.push({ id: a.id, literal: s, src: fileUri(a.cue.theme, a.cue.noun) });
    }
    if (live.length < d.cards) throw new Error(`K-323 ican: ${loc} authors ${live.length} can literals < ${d.cards} (refuse, never a vocab fallback)`);
    const chosen = rng.sample(live, d.cards);
    const cards = chosen.map((a) => C3.aboutMeCanRow({ id: a.id, src: a.src, literal: a.literal, tick: d.tick, pic: d.pic, textW: d.textW, literalPx: d.literalPx }));
    const inner = C3.aboutMeCanGrid({ cards, minRow: d.rowMin }) + C3.aboutMeWantLane({ label: literal(L, 'wantLearn', loc), glyphH: d.glyphH, h: d.laneH });
    const bodyHtml = this._root(loc, 'ican', `data-lcs-cards="${d.cards}" data-lcs-tick="${d.tick}" data-lcs-pic="${d.pic}" data-lcs-text-w="${d.textW}" data-lcs-literal-px="${d.literalPx}"`,
      'display:flex;flex-direction:column;gap:12px', inner);
    return { bodyHtml, meta: { actions: chosen.map((a) => a.id) } };
  },

  /** F5 — My Name: write / count / first letter / a friend's name / who has more. */
  _buildName(bank, d, loc) {
    const L = bank.labels;
    if (d.box < K_FLOOR || d.countBoxW < K_FLOOR || d.countBoxH < K_FLOOR) throw new Error(`K-323 name: a box under the K floor ${K_FLOOR}`);
    if (!(d.boxes >= 8 && d.boxes <= 12)) throw new Error(`K-323 name: boxes ${d.boxes} outside 8..12`);
    const boxesW = d.boxes * d.box + (d.boxes - 1) * d.boxGap + 2;
    if (boxesW > 639) throw new Error(`K-323 name: ${d.boxes} boxes of ${d.box} (${boxesW}) > the lane inner 639`);
    if (!(d.cardH >= 28 + d.countBoxH)) throw new Error(`K-323 name: card ${d.cardH} cannot hold a ${d.countBoxH} box`);
    const items = [{ key: 'me', label: literal(L, 'whoHasMore.me', loc) }, { key: 'friend', label: literal(L, 'whoHasMore.friend', loc) }];
    if (items[0].label.toLocaleLowerCase(loc) === items[1].label.toLocaleLowerCase(loc)) throw new Error(`K-323 name: ${loc} pills print the same word`);
    const inner =
      C3.aboutMeNameLane({ who: 'me', label: literal(L, 'myName', loc), labelKey: 'myName', hint: literal(L, 'oneLetterPerBox', loc), glyphH: d.glyphH }) +
      C3.aboutMeNameBoxes({ who: 'me', n: d.boxes, box: d.box, gap: d.boxGap }) +
      C3.aboutMeCountCards({ cards: [
        { key: 'lettersCount', heading: literal(L, 'lettersCount', loc), attr: 'data-lcs-count="me"' },
        { key: 'firstLetter', heading: literal(L, 'firstLetter', loc), attr: 'data-lcs-first="me"' },
      ], boxW: d.countBoxW, boxH: d.countBoxH, h: d.cardH }) +
      C3.aboutMeNameLane({ who: 'friend', label: literal(L, 'friendName', loc), labelKey: 'friendName', glyphH: d.glyphH }) +
      C3.aboutMeNameBoxes({ who: 'friend', n: d.boxes, box: d.box, gap: d.boxGap }) +
      C3.aboutMeCompareLane({ question: literal(L, 'whoHasMore.question', loc), items });
    const bodyHtml = this._root(loc, 'name', `data-lcs-boxes="${d.boxes}" data-lcs-box="${d.box}" data-lcs-count-box="${d.countBoxW}x${d.countBoxH}" data-lcs-glyph-h="${d.glyphH}"`,
      'display:flex;flex-direction:column;justify-content:space-between;gap:12px', inner);
    return { bodyHtml, meta: { boxes: d.boxes } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="all-about-me"]');
      if (!root) return ['no all-about-me root'];
      const body = document.querySelector('[data-lcs-body]');
      const K = 56;
      const rect = (el) => el.getBoundingClientRect();
      const text = (root.textContent || '');

      /* ================================================== Phase 2 faces (data-lcs-layout) */
      const layout = root.dataset.lcsLayout;
      if (layout) {
        const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
        const br = rect(body);
        const foot = document.querySelector('.ws-foot'), footTop = foot ? rect(foot).top : Infinity;
        const inBody = (el, what) => { const r = rect(el); if (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.top < br.top - 0.6 || r.bottom > footTop + 0.6) fails.push(`${what} leaves the body column`); };
        const pic = (im, what, floor) => {
          if (!im) { fails.push(`${what}: no picture`); return null; }
          if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
          if (im.getAttribute('alt')) fails.push(`${what}: alt text names the picture`);
          const parts = decodeURIComponent(im.src).split('/');
          const dir = parts.slice(-2, -1)[0] || '';
          if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
          const r = rect(im);
          if (Math.min(r.width, r.height) < floor - 0.6) fails.push(`${what}: picture ${Math.round(Math.min(r.width, r.height))} px < ${floor}`);
          return { dir, noun: parts.pop().replace(/@3x\.webp$/, '') };
        };
        const emptyBox = (b, what, floor) => {
          if (!b) { fails.push(`${what}: no box`); return; }
          if (!b.classList.contains('ws-blankbox')) fails.push(`${what}: not a .ws-blankbox`);
          if (b.textContent.trim() || b.children.length) fails.push(`${what}: the box is not empty`);
          if (b.getAttribute('data-lcs-answer') !== '') fails.push(`${what}: an answer value "${b.getAttribute('data-lcs-answer')}" is stamped on an open box`);
          const r = rect(b);
          if (Math.min(r.width, r.height) < floor - 0.6) fails.push(`${what}: box ${Math.round(r.width)}×${Math.round(r.height)} < ${floor}`);
        };
        const emptyLane = (ln, what, floor) => {
          if (!ln) { fails.push(`${what}: no lane`); return; }
          if (ln.textContent.trim()) fails.push(`${what}: the lane prints "${ln.textContent.trim().slice(0, 16)}"`);
          if (!ln.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push(`${what}: no writing row`);
          if (ln.querySelector('text')) fails.push(`${what}: SVG text on the lane (a model word)`);
          if (rect(ln).height < floor - 0.6) fails.push(`${what}: lane ${Math.round(rect(ln).height)} px < ${floor}`);
        };
        const heading2 = (h, what, lh) => {
          if (!h || !h.textContent.trim()) { fails.push(`${what}: no heading`); return; }
          if (h.textContent.includes('{')) fails.push(`${what}: heading carries a slot`);
          if (rect(h).height > 2 * lh + 0.6) fails.push(`${what}: heading "${h.textContent.trim()}" runs ${Math.round(rect(h).height)} px (> 2 lines)`);
          if (h.scrollWidth > h.clientWidth + 0.6) fails.push(`${what}: heading "${h.textContent.trim()}" is clipped`);
        };
        if (text.includes('{')) fails.push('a `{` slot is printed in the body');
        root.querySelectorAll('[data-lcs-answer]').forEach((el) => { if (el.getAttribute('data-lcs-answer') !== '') fails.push(`an answer value "${el.getAttribute('data-lcs-answer')}" is stamped on an open box`); });
        if (root.querySelector('.ws-answerbox')) fails.push('an answerBox (.ws-answerbox) on an open page');
        if (root.hasAttribute('data-lcs-face')) fails.push('data-lcs-face is stamped on the root');
        // every printed literal whole (no clipping, >= 14 px)
        root.querySelectorAll('[data-lcs-label-key]').forEach((l) => {
          if (!l.textContent.trim()) fails.push(`label ${l.dataset.lcsLabelKey} is empty`);
          if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`label ${l.dataset.lcsLabelKey} "${l.textContent.trim()}" is clipped (${l.scrollWidth} > ${l.clientWidth})`);
          if (parseFloat(getComputedStyle(l).fontSize) < 14) fails.push(`label ${l.dataset.lcsLabelKey} under 14 px`);
        });

        /* ---------------- F1 favourites ---------------- */
        if (layout === 'favourites') {
          if (/\d/.test(text)) fails.push('a digit is printed in the body');
          const rows = [...root.querySelectorAll('[data-lcs-favrow]')];
          const per = +root.dataset.lcsPer, cap = +root.dataset.lcsLabelCap, picFloor = +root.dataset.lcsPic;
          if (rows.length !== +root.dataset.lcsRows) fails.push(`${rows.length} rows ≠ stamp ${root.dataset.lcsRows}`);
          if (rows.length < 2) fails.push(`${rows.length} category rows < 2`);
          const keys = new Set(), cats = new Set();
          rows.forEach((row, i) => {
            const cat = row.dataset.lcsFavrow, what = `row ${i + 1} (${cat})`;
            if (cats.has(cat)) fails.push(`${what}: category repeats`); cats.add(cat);
            heading2(row.querySelector('[data-lcs-heading]'), what, 24);
            const rr = rect(row), inner = rr.width - 36;
            const tiles = [...row.querySelectorAll('[data-lcs-opt]')];
            if (tiles.length !== per) fails.push(`${what}: ${tiles.length} option tiles ≠ ${per}`);
            const strip = row.querySelector('[data-lcs-options]');
            if (strip && strip.scrollWidth > inner + 0.6) fails.push(`${what}: the tile row ${strip.scrollWidth} px > the lane inner ${Math.round(inner)}`);
            if (strip && (rect(strip).right > rr.right - 18 + 0.6)) fails.push(`${what}: the tile row leaves the lane`);
            tiles.forEach((t, k) => {
              const key = t.dataset.lcsOpt, w = `${what} tile ${k + 1}`;
              if (keys.has(key)) fails.push(`${w}: option "${key}" already on the page`); keys.add(key);
              const tr = rect(t);
              if (Math.min(tr.width, tr.height) < K - 0.6) fails.push(`${w}: tile ${Math.round(tr.width)}×${Math.round(tr.height)} < ${K}`);
              const im = t.querySelector('img'), sw = t.querySelector('[data-lcs-swatch]');
              if (key.startsWith('color:')) { if (!sw) fails.push(`${w}: colour tile without a swatch`); else if (Math.min(rect(sw).width, rect(sw).height) < picFloor - 0.6) fails.push(`${w}: swatch < ${picFloor}`); if (im) fails.push(`${w}: a picture on a colour tile`); }
              else { const p = pic(im, w, picFloor); if (p && sw) fails.push(`${w}: both a picture and a swatch`); }
              const l = t.querySelector('[data-lcs-opt-label]');
              if (!l || !l.textContent.trim()) fails.push(`${w}: no label`);
              else {
                if (l.scrollWidth > cap + 0.6) fails.push(`${w}: label "${l.textContent.trim()}" ${l.scrollWidth} px > the ${cap} px tile ceiling`);
                if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`${w}: label "${l.textContent.trim()}" clipped`);
                if (rect(l).right > tr.right + 0.6 || rect(l).left < tr.left - 0.6) fails.push(`${w}: label leaves the tile`);
              }
              if (t.matches('[data-lcs-correct], [data-lcs-ring]') || t.querySelector('[data-lcs-correct], [data-lcs-ring], .ws-ring')) fails.push(`${w}: a tile is marked`);
              if (tr.top < rr.top - 0.6 || tr.bottom > rr.bottom + 0.6) fails.push(`${w}: tile outside its lane`);
            });
            if (!row.querySelector('[data-lcs-copy-arrow]')) fails.push(`${what}: no copy arrow`);
            emptyLane(row.querySelector('[data-lcs-copy-lane]'), `${what} copy lane`, K);
            inBody(row, what);
          });
          // no two rows overlap
          for (let i = 1; i < rows.length; i++) if (rect(rows[i]).top < rect(rows[i - 1]).bottom - 0.6) fails.push(`row ${i + 1} overlaps row ${i}`);
          return fails;
        }

        /* ---------------- F2 family ---------------- */
        if (layout === 'family') {
          const badges = [...root.querySelectorAll('.ws-card-badge')].map((b) => b.textContent).join('');
          let stripped = text; for (const ch of badges) stripped = stripped.replace(ch, '');
          if (/\d/.test(stripped)) fails.push('a digit is printed in the body (outside the card badges)');
          const draw = root.querySelector('[data-lcs-drawbox="family"]');
          if (!draw) fails.push('no family drawing box');
          else {
            const own = [...draw.querySelectorAll('[data-lcs-label-key]')].map((l) => l.textContent).join('');
            if (draw.textContent.replace(own, '').trim() || draw.querySelector('img, svg')) fails.push('the family drawing box is not empty');
            if (!draw.querySelector('[data-lcs-label-key="familyDraw"]')) fails.push('the family drawing box has no familyDraw caption');
            const r = rect(draw); if (r.height < 150 || r.width < 600) fails.push(`family drawing box ${Math.round(r.width)}×${Math.round(r.height)} under 600×150`);
            inBody(draw, 'the drawing box');
          }
          const frames = [...root.querySelectorAll('[data-lcs-frame]')];
          const want = (root.dataset.lcsFrameKeys || '').split(',');
          if (frames.length !== +root.dataset.lcsFramesN) fails.push(`${frames.length} frames ≠ stamp ${root.dataset.lcsFramesN}`);
          if (frames.map((f) => f.dataset.lcsFrame).join() !== want.join()) fails.push(`frame keys ${frames.map((f) => f.dataset.lcsFrame).join()} ≠ stamp ${want.join()}`);
          const cell = +root.dataset.lcsCell, box = +root.dataset.lcsBox;
          frames.forEach((f, i) => {
            const key = f.dataset.lcsFrame, what = `frame ${i + 1} (${key})`;
            heading2(f.querySelector('[data-lcs-heading]'), what, 20);
            if (!f.querySelector(`[data-lcs-label-key="count-${key}"]`)) fails.push(`${what}: heading key ≠ count-${key}`);
            const h = f.querySelector('[data-lcs-heading]'); if (h && !/:\s*$/.test(h.textContent)) fails.push(`${what}: heading "${h.textContent.trim()}" does not end with ":"`);
            const cb = f.querySelector('[data-lcs-count]'); emptyBox(cb, `${what} count box`, Math.max(K, box));
            const tfs = f.querySelectorAll('svg[data-lcs-prim="ten-frame"]');
            if (tfs.length !== 1) fails.push(`${what}: ${tfs.length} ten-frames`);
            else {
              const tf = tfs[0];
              if (tf.getAttribute('data-lcs-a') !== '0' || tf.getAttribute('data-lcs-b') !== '0') fails.push(`${what}: ten-frame stamps a=${tf.getAttribute('data-lcs-a')} b=${tf.getAttribute('data-lcs-b')} (want 0/0)`);
              const n = tf.querySelectorAll('[data-lcs-counter]').length; if (n) fails.push(`${what}: ${n} counters printed on the ten-frame (the child fills it)`);
              const r = rect(tf); if (r.width < 5 * cell + 3 - 0.6 || (r.width - 3) / 5 < K - 0.6) fails.push(`${what}: ten-frame cell ${((r.width - 3) / 5).toFixed(1)} < ${Math.max(K, cell)}`);
              const fr = rect(f); if (r.left < fr.left - 0.6 || r.right > fr.right + 0.6 || r.bottom > fr.bottom + 0.6) fails.push(`${what}: ten-frame leaves its card`);
            }
            if (f.querySelector('img')) fails.push(`${what}: a picture on a count card`);
            inBody(f, what);
          });
          for (let i = 0; i < frames.length; i++) for (let j = i + 1; j < frames.length; j++) {
            const a = rect(frames[i]), b = rect(frames[j]);
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.6 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.6) fails.push(`frames ${i + 1} and ${j + 1} overlap`);
          }
          if (draw && frames.length && rect(frames[0]).top < rect(draw).bottom - 0.6) fails.push('the frames overlap the drawing box');
          return fails;
        }

        /* ---------------- F3 face (verifiable) ---------------- */
        if (layout === 'face') {
          if (/\d/.test(text)) fails.push('a digit is printed in the body');
          const parts = (root.dataset.lcsParts || '').split(',');
          let anchors = {}; try { anchors = JSON.parse(root.dataset.lcsAnchors || '{}'); } catch (e) { fails.push('anchor stamp is not JSON'); }
          const bankWords = [...root.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')];
          const lanes = [...root.querySelectorAll('[data-lcs-label]')];
          const bankIds = bankWords.map((w) => w.dataset.lcsBank).sort(), laneIds = lanes.map((l) => l.dataset.lcsLabel).sort();
          if (bankIds.join() !== laneIds.join()) fails.push(`bank ids [${bankIds.join()}] ≠ lane ids [${laneIds.join()}] (no bijection)`);
          if (laneIds.join() !== parts.slice().sort().join()) fails.push(`lane ids [${laneIds.join()}] ≠ the stamped parts [${parts.slice().sort().join()}]`);
          if (new Set(bankIds).size !== bankIds.length) fails.push('a bank id repeats');
          const texts = bankWords.map((w) => w.textContent.trim().toLocaleLowerCase(lang()));
          function lang() { return (document.documentElement.lang || 'en').slice(0, 2); }
          if (new Set(texts).size !== texts.length) fails.push('two bank words print the same text');
          bankWords.forEach((w, i) => { if (!w.textContent.trim()) fails.push(`bank word ${i + 1} is empty`); if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`bank word "${w.textContent.trim()}" is clipped`); });
          const fig = root.querySelector('[data-lcs-facelabels]');
          const im = fig && fig.querySelector('img[data-lcs-face-pic]');
          const p = pic(im, 'the face', +root.dataset.lcsIcon || 200);
          const ir = im ? rect(im) : null;
          const laneH = +root.dataset.lcsLaneH, laneW = +root.dataset.lcsLaneW;
          lanes.forEach((ln) => {
            const what = `lane ${ln.dataset.lcsLabel}`;
            emptyLane(ln, what, Math.max(K, laneH));
            const r = rect(ln);
            if (Math.abs(r.width - laneW) > 1) fails.push(`${what}: ${Math.round(r.width)} wide ≠ ${laneW}`);
            if (ir && Math.min(r.right, ir.right) - Math.max(r.left, ir.left) > 0.6 && Math.min(r.bottom, ir.bottom) - Math.max(r.top, ir.top) > 0.6) fails.push(`${what} overlaps the face picture`);
            if (!ln.classList.contains('ws-blankbox')) fails.push(`${what}: not a .ws-blankbox`);
          });
          for (let i = 0; i < lanes.length; i++) for (let j = i + 1; j < lanes.length; j++) {
            const a = rect(lanes[i]), b = rect(lanes[j]);
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.6 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > -10 + 0.6) fails.push(`lanes ${lanes[i].dataset.lcsLabel} and ${lanes[j].dataset.lcsLabel} are closer than 10 px`);
          }
          // the pointers: one per lane, anchor inside the picture ON its feature, lane end on the lane's near edge midpoint
          const overlay = fig && fig.querySelector('svg[data-lcs-pointers]');
          const ptrs = overlay ? [...overlay.querySelectorAll('line[data-lcs-pointer]')] : [];
          if (ptrs.length !== lanes.length) fails.push(`${ptrs.length} pointers ≠ ${lanes.length} lanes`);
          const or = overlay ? rect(overlay) : { left: 0, top: 0 };
          const seg = ptrs.map((l) => ({ id: l.dataset.lcsPointer, ax: or.left + +l.dataset.lcsAx, ay: or.top + +l.dataset.lcsAy, lx: or.left + +l.dataset.lcsLx, ly: or.top + +l.dataset.lcsLy }));
          const distPS = (px, py, s) => { const dx = s.lx - s.ax, dy = s.ly - s.ay; const t = Math.max(0, Math.min(1, ((px - s.ax) * dx + (py - s.ay) * dy) / (dx * dx + dy * dy))); return Math.hypot(px - (s.ax + t * dx), py - (s.ay + t * dy)); };
          const cross = (a, b) => { const d = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x); const A = { x: a.ax, y: a.ay }, B = { x: a.lx, y: a.ly }, C = { x: b.ax, y: b.ay }, D = { x: b.lx, y: b.ly }; return d(A, B, C) * d(A, B, D) < 0 && d(C, D, A) * d(C, D, B) < 0; };
          // every anchor of the table (used or not) + the mirror of every side-specific one (the face is symmetric: the OTHER eye / ear / brow)
          const discs = [];
          if (ir) for (const [id, a] of Object.entries(anchors)) {
            discs.push({ id, x: ir.left + a.x * ir.width, y: ir.top + a.y * ir.height });
            if (Math.abs(a.x - 0.5) > 0.05) discs.push({ id: id + '-mirror', x: ir.left + (1 - a.x) * ir.width, y: ir.top + a.y * ir.height });
          }
          seg.forEach((s) => {
            const what = `pointer ${s.id}`;
            if (!ir) return;
            if (s.ax < ir.left || s.ax > ir.right || s.ay < ir.top || s.ay > ir.bottom) fails.push(`${what}: anchor end outside the picture`);
            const a = anchors[s.id];
            if (a && Math.hypot(s.ax - (ir.left + a.x * ir.width), s.ay - (ir.top + a.y * ir.height)) > 1.5) fails.push(`${what}: anchor dot is off its table position`);
            const ln = lanes.find((l) => l.dataset.lcsLabel === s.id);
            if (!ln) fails.push(`${what}: no lane`);
            else {
              const r = rect(ln), side = ln.dataset.lcsSide;
              const ex = side === 'L' ? r.right : r.left, ey = (r.top + r.bottom) / 2;
              if (Math.hypot(s.lx - ex, s.ly - ey) > 1.5) fails.push(`${what}: lane end sits ${Math.round(Math.hypot(s.lx - ex, s.ly - ey))} px off the lane's near-edge midpoint`);
            }
            for (const dsc of discs) {
              if (dsc.id === s.id) continue;
              const d = distPS(dsc.x, dsc.y, s);
              if (d < 16) fails.push(`${what} crosses the ${dsc.id} disc (${d.toFixed(1)} px < 16)`);
            }
            for (const w of bankWords) { const wr = rect(w); const nx = Math.max(wr.left, Math.min(s.lx, wr.right)), ny = Math.max(wr.top, Math.min(s.ly, wr.bottom)); if (Math.hypot(s.lx - nx, s.ly - ny) < 20) fails.push(`${what}: a bank word within 20 px of its lane end`); }
          });
          for (let i = 0; i < seg.length; i++) for (let j = i + 1; j < seg.length; j++) if (cross(seg[i], seg[j])) fails.push(`pointers ${seg[i].id} and ${seg[j].id} cross`);
          if (ptrs.some((l) => l.closest('svg') && l.closest('svg').getAttribute('aria-hidden') !== 'true')) fails.push('the pointer overlay is not aria-hidden');
          const draw = root.querySelector('[data-lcs-drawbox="face"]');
          if (!draw) fails.push('no draw-your-face box');
          else {
            const own = [...draw.querySelectorAll('[data-lcs-label-key]')].map((l) => l.textContent).join('');
            if (draw.textContent.replace(own, '').trim() || draw.querySelector('img, svg')) fails.push('the draw-your-face box is not empty');
            if (rect(draw).height < +root.dataset.lcsDrawMin - 0.6) fails.push(`draw-your-face box ${Math.round(rect(draw).height)} < ${root.dataset.lcsDrawMin}`);
            if (fig && rect(draw).top < rect(fig).bottom - 0.6) fails.push('the draw box overlaps the figure');
            inBody(draw, 'the draw box');
          }
          if (fig) inBody(fig, 'the figure');
          if (p && p.noun !== 'face') fails.push(`the picture is "${p.noun}", not the face`);
          return fails;
        }

        /* ---------------- F4 I can (open-ended: structure only) ---------------- */
        if (layout === 'ican') {
          if (/\d/.test(text)) fails.push('a digit is printed in the body');
          const cards = [...root.querySelectorAll('[data-lcs-action]')];
          if (cards.length !== +root.dataset.lcsCards) fails.push(`${cards.length} cards ≠ stamp ${root.dataset.lcsCards}`);
          if (cards.length < 6) fails.push(`${cards.length} cards < 6`);
          const ids = cards.map((c) => c.dataset.lcsAction), lits = [];
          if (new Set(ids).size !== ids.length) fails.push('an action appears on two cards');
          const tick = +root.dataset.lcsTick, picF = +root.dataset.lcsPic, textW = +root.dataset.lcsTextW, lpx = +root.dataset.lcsLiteralPx;
          cards.forEach((c, i) => {
            const id = c.dataset.lcsAction, what = `card ${i + 1} (${id})`;
            emptyBox(c.querySelector('[data-lcs-tick]'), `${what} tick`, Math.max(K, tick));
            pic(c.querySelector('img[data-lcs-cue]'), `${what} cue`, Math.max(K, picF));
            const l = c.querySelector('[data-lcs-can]');
            if (!l || !l.textContent.trim()) { fails.push(`${what}: no literal`); return; }
            lits.push(l.textContent.trim().toLocaleLowerCase());
            if (l.textContent.includes('{')) fails.push(`${what}: the literal carries a slot`);
            const lr = rect(l), lh = parseFloat(getComputedStyle(l).lineHeight);
            if (lr.height > 2 * lh + 0.6) fails.push(`${what}: literal "${l.textContent.trim()}" runs ${Math.round(lr.height / lh)} lines (> 2) — REFUSE the literal, never shrink the font`);
            if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`${what}: a word of "${l.textContent.trim()}" is wider than the ${textW} px column`);
            if (parseFloat(getComputedStyle(l).fontSize) !== lpx) fails.push(`${what}: literal at ${getComputedStyle(l).fontSize} ≠ ${lpx}px`);
            const cr = rect(c);
            [c.querySelector('[data-lcs-tick]'), c.querySelector('img'), l].forEach((el) => { if (el) { const r = rect(el); if (r.left < cr.left - 0.6 || r.right > cr.right + 0.6 || r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6) fails.push(`${what}: content leaves the card`); } });
            if (c.querySelector('.ws-card-badge')) fails.push(`${what}: a numeral badge on an I-can card`);
            inBody(c, what);
          });
          if (new Set(lits).size !== lits.length) fails.push('two cards print the same literal');
          for (let i = 0; i < cards.length; i++) for (let j = i + 1; j < cards.length; j++) {
            const a = rect(cards[i]), b = rect(cards[j]);
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.6 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.6) fails.push(`cards ${i + 1} and ${j + 1} overlap`);
          }
          const lane = root.querySelector('[data-lcs-wantlearn]');
          if (!lane) fails.push('no want-to-learn lane');
          else {
            if (!lane.querySelector('[data-lcs-label-key="wantLearn"]')) fails.push('want-to-learn lane: no literal');
            const rows = lane.querySelectorAll('[data-lcs-ruling-row]');
            if (rows.length !== 1) fails.push(`want-to-learn lane: ${rows.length} ruling rows, want 1`);
            rows.forEach((r) => { if (r.querySelector('text')) fails.push('want-to-learn lane: a starter is printed on the row'); if (rect(r).height < K - 0.6) fails.push('want-to-learn row under the K floor'); });
            if (cards.length && rect(lane).top < Math.max(...cards.map((c) => rect(c).bottom)) - 0.6) fails.push('the want-to-learn lane overlaps the cards');
            inBody(lane, 'the want-to-learn lane');
          }
          return fails;
        }

        /* ---------------- F5 my name (structured count; structure only) ---------------- */
        if (layout === 'name') {
          if (/\d/.test(text)) fails.push('a digit is printed in the body');
          const n = +root.dataset.lcsBoxes, box = +root.dataset.lcsBox;
          for (const who of ['me', 'friend']) {
            const row = root.querySelector(`[data-lcs-namerow="${who}"]`);
            if (!row) { fails.push(`no ${who} name row`); continue; }
            emptyLane(row.querySelector(`[data-lcs-namelane="${who}"]`), `${who} name lane`, K);
            if (!row.querySelector('[data-lcs-heading]')) fails.push(`${who} name row: no literal`);
            const bl = root.querySelector(`[data-lcs-nameboxes="${who}"]`);
            if (!bl) { fails.push(`no ${who} letter boxes`); continue; }
            const svg = bl.querySelector('svg[data-lcs-letterboxes]');
            if (!svg) fails.push(`${who}: no letterBoxes primitive`);
            else {
              if (+svg.getAttribute('data-lcs-letterboxes') !== n) fails.push(`${who}: ${svg.getAttribute('data-lcs-letterboxes')} boxes ≠ ${n}`);
              const rects = svg.querySelectorAll('rect');
              if (rects.length !== n) fails.push(`${who}: ${rects.length} box rects ≠ ${n}`);
              rects.forEach((r) => { const rr = rect(r); if (Math.min(rr.width, rr.height) < Math.max(K, box) - 0.6) fails.push(`${who}: a letter box ${Math.round(rr.width)} < ${Math.max(K, box)}`); });
              if (svg.querySelector('text')) fails.push(`${who}: a model letter in the boxes`);
              const sr = rect(svg), lr = rect(bl); if (sr.left < lr.left - 0.6 || sr.right > lr.right + 0.6) fails.push(`${who}: the boxes leave their lane`);
            }
            inBody(row, `${who} name row`); inBody(bl, `${who} letter boxes`);
          }
          if (root.querySelector('[data-lcs-namerow="me"] [data-lcs-label-key="oneLetterPerBox"]') == null) fails.push('the one-letter-per-box hint is not on the my-name row');
          if (root.querySelectorAll('[data-lcs-label-key="oneLetterPerBox"]').length !== 1) fails.push('the one-letter-per-box hint must print exactly once');
          emptyBox(root.querySelector('[data-lcs-count="me"]'), 'letters-count box', K);
          emptyBox(root.querySelector('[data-lcs-first="me"]'), 'first-letter box', K);
          root.querySelectorAll('[data-lcs-countcard]').forEach((c) => { heading2(c.querySelector('[data-lcs-heading]'), `card ${c.dataset.lcsCountcard}`, 20); inBody(c, `card ${c.dataset.lcsCountcard}`); });
          const cmp = root.querySelector('[data-lcs-compare]');
          if (!cmp) fails.push('no compare lane');
          else {
            const pills = [...cmp.querySelectorAll('[data-lcs-pill]')];
            if (pills.map((p) => p.dataset.lcsPill).join() !== 'me,friend') fails.push(`pills ${pills.map((p) => p.dataset.lcsPill).join()} ≠ me,friend (fixed order)`);
            pills.forEach((p) => { if (!p.textContent.trim()) fails.push('an empty pill'); if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`pill "${p.textContent.trim()}" clipped`); if (rect(p).height < 40) fails.push('a pill under 40 px'); });
            if (pills.length === 2 && pills[0].textContent.trim().toLocaleLowerCase() === pills[1].textContent.trim().toLocaleLowerCase()) fails.push('the two pills print the same word');
            if (!cmp.querySelector('[data-lcs-label-key="whoHasMore.question"]')) fails.push('compare lane: no question literal');
            inBody(cmp, 'the compare lane');
          }
          // the stack in order, nothing overlapping
          const stack = [...root.children];
          for (let i = 1; i < stack.length; i++) if (rect(stack[i]).top < rect(stack[i - 1]).bottom - 0.6) fails.push(`block ${i + 1} overlaps block ${i}`);
          return fails;
        }
        fails.push(`unknown layout "${layout}"`);
        return fails;
      }
      /* ================================================== the base */
      // 1. nothing printed answers anything: no digit, no picture, no slot, no answer value
      if (/\d/.test(text)) fails.push('a digit is printed in the body');
      if (text.includes('{')) fails.push('a `{` slot is printed in the body');
      if (root.querySelector('img')) fails.push('the base prints a picture (draw only)');
      root.querySelectorAll('[data-lcs-answer]').forEach((el) => {
        if (el.getAttribute('data-lcs-answer') !== '') fails.push(`an answer value "${el.getAttribute('data-lcs-answer')}" is stamped on an open box`);
      });
      if (root.querySelector('.ws-answerbox')) fails.push('an answerBox (.ws-answerbox, grid dashes) on an open page');
      if (root.hasAttribute('data-lcs-face')) fails.push('data-lcs-face is stamped on the base');
      // 2. the name lane: exactly one, empty, a writing row inside, at least the K floor high
      const names = root.querySelectorAll('[data-lcs-name]');
      if (names.length !== 1) fails.push(`${names.length} name lanes, want 1`);
      names.forEach((n) => {
        if (n.textContent.trim()) fails.push(`the name lane prints "${n.textContent.trim().slice(0, 16)}"`);
        if (!n.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push('the name lane has no writing row');
        if (n.querySelector('text')) fails.push('the name lane carries SVG text (a model word)');
        if (rect(n).height < K) fails.push(`name lane ${Math.round(rect(n).height)} px < the K floor ${K}`);
        if (Math.abs(rect(n).width - (+n.dataset.lcsLaneW)) > 1) fails.push(`name lane width ${Math.round(rect(n).width)} ≠ stamp ${n.dataset.lcsLaneW}`);
      });
      // 3. the age box: exactly one, empty, >= the K floor on both sides, inside the age lane
      const ages = root.querySelectorAll('[data-lcs-age]');
      if (ages.length !== 1) fails.push(`${ages.length} age boxes, want 1`);
      ages.forEach((a) => {
        if (a.textContent.trim()) fails.push('the age box is not empty');
        if (!a.classList.contains('ws-blankbox')) fails.push('the age box is not a .ws-blankbox');
        const r = rect(a);
        if (Math.min(r.width, r.height) < K) fails.push(`age box ${Math.round(r.width)}×${Math.round(r.height)} < the K floor ${K}`);
        if (Math.abs(r.width - (+root.dataset.lcsBox)) > 1) fails.push(`age box ${Math.round(r.width)} ≠ config ${root.dataset.lcsBox}`);
        const lane = a.closest('[data-lcs-agelane]');
        if (!lane) fails.push('the age box is not inside the age lane');
        else {
          const lr = rect(lane);
          const inner = lr.width - 36;   // inline padding 8 16 + border 2
          const pre = lane.querySelector('[data-lcs-label-key="agePre"]'), post = lane.querySelector('[data-lcs-label-key="agePost"]');
          if (!pre || !pre.textContent.trim()) fails.push('age lane: no pre literal');
          if (!post || !post.textContent.trim()) fails.push('age lane: no post literal');
          const kids = [...lane.children];
          const rowW = kids.reduce((s, k) => s + rect(k).width, 0);
          if (rowW > inner + 0.6) fails.push(`age row ${Math.round(rowW)} px wider than the lane inner ${Math.round(inner)}`);
          const glue = lane.dataset.lcsGlue === '1';
          if (glue !== (root.dataset.lcsGlue === '1')) fails.push('glue stamp disagrees between lane and root');
          if (post) {
            const gap = rect(post).left - rect(a).right;
            if (glue && gap > 0.6) fails.push(`glue: the suffix sits ${Math.round(gap)} px off the box`);
            if (!glue && gap < 9) fails.push(`the post literal sits ${Math.round(gap)} px from the box (want 10)`);
            if (glue && !/^-/.test(post.textContent.trim())) fails.push('glue without a leading hyphen on the suffix');
          }
          if (pre && rect(pre).right > rect(a).left) fails.push('the pre literal overlaps the age box');
        }
      });
      // 4. drawing zones: the stamped count, every one empty (no picture, no text but its own label)
      const boxes = [...root.querySelectorAll('[data-lcs-drawbox]')];
      const want = +root.dataset.lcsDrawboxes;
      if (boxes.length !== want) fails.push(`${boxes.length} drawing zones, stamp ${want}`);
      const keys = boxes.map((b) => b.dataset.lcsDrawbox);
      if (new Set(keys).size !== keys.length) fails.push('a drawing-zone key repeats');
      for (const k of ['portrait', 'family']) if (!keys.includes(k)) fails.push(`no ${k} drawing zone`);
      boxes.forEach((b) => {
        const own = [...b.querySelectorAll('[data-lcs-label-key]')].map((l) => l.textContent).join('');
        const rest = b.textContent.replace(own, '').trim();
        if (rest) fails.push(`drawing zone ${b.dataset.lcsDrawbox} prints "${rest.slice(0, 16)}"`);
        if (b.querySelector('img, text')) fails.push(`drawing zone ${b.dataset.lcsDrawbox} carries a picture or SVG text`);
        const r = rect(b);
        if (r.width < 100 || r.height < 100) fails.push(`drawing zone ${b.dataset.lcsDrawbox} ${Math.round(r.width)}×${Math.round(r.height)} < 100`);
      });
      // 5. favourites: N windows === stamp, keys distinct, each heading a non-empty literal on <= 2 lines inside its band
      const favN = +root.dataset.lcsFavouriteN;
      const wins = [...root.querySelectorAll('[data-lcs-favourite]')];
      if (wins.length !== favN) fails.push(`${wins.length} favourite windows, stamp ${favN}`);
      const favKeys = wins.map((w) => w.dataset.lcsFavourite);
      if (new Set(favKeys).size !== favKeys.length) fails.push('a favourite category repeats');
      const hpx = +root.dataset.lcsHeadingPx;
      wins.forEach((w) => {
        const h = w.querySelector('[data-lcs-heading]');
        if (!h || !h.textContent.trim()) { fails.push(`favourite ${w.dataset.lcsFavourite}: no heading`); return; }
        const hr = rect(h);
        if (hr.height > 2 * 20 + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: heading "${h.textContent.trim()}" runs ${Math.round(hr.height)} px (> 2 lines)`);
        if (parseFloat(getComputedStyle(h).fontSize) !== hpx) fails.push(`favourite ${w.dataset.lcsFavourite}: heading ${getComputedStyle(h).fontSize} ≠ ${hpx}px`);
        const band = h.parentElement, br = rect(band);
        if (hr.right > br.right + 0.6 || hr.left < br.left - 0.6 || hr.bottom > br.bottom + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: heading leaves its band`);
        if (h.scrollWidth > h.clientWidth + 0.6) fails.push(`favourite ${w.dataset.lcsFavourite}: a heading word is clipped`);
        if (!keys.includes('fav-' + w.dataset.lcsFavourite)) fails.push(`favourite ${w.dataset.lcsFavourite}: no draw zone`);
        const wr = rect(w);
        if (wr.width < 120) fails.push(`favourite ${w.dataset.lcsFavourite}: window ${Math.round(wr.width)} < 120`);
      });
      // 6. every literal is printed whole (no clipping) at its configured size
      const lpx = +root.dataset.lcsLabelPx, cap = +root.dataset.lcsBannerCap;
      root.querySelectorAll('[data-lcs-label-key]').forEach((l) => {
        if (l.scrollWidth > l.clientWidth + 0.6) fails.push(`label ${l.dataset.lcsLabelKey} "${l.textContent.trim()}" is clipped (${l.scrollWidth} > ${l.clientWidth})`);
        if (!l.textContent.trim()) fails.push(`label ${l.dataset.lcsLabelKey} is empty`);
        const fs = parseFloat(getComputedStyle(l).fontSize);
        if (fs < 14) fails.push(`label ${l.dataset.lcsLabelKey} at ${fs}px < 14`);
      });
      const nameIs = root.querySelector('[data-lcs-label-key="nameIs"]');
      if (nameIs) {
        if (parseFloat(getComputedStyle(nameIs).fontSize) !== lpx) fails.push(`banner label ${getComputedStyle(nameIs).fontSize} ≠ ${lpx}px`);
        if (nameIs.scrollWidth > cap + 0.6) fails.push(`banner label "${nameIs.textContent.trim()}" ${nameIs.scrollWidth} px > cap ${cap}`);
      }
      // 7. the sentence lane (d3): stamped key ⇔ one empty lane with a writing row
      const sKey = root.dataset.lcsSentenceKey || '';
      const lanes = [...root.querySelectorAll('[data-lcs-sentence]')];
      if (sKey && lanes.length !== 1) fails.push(`sentence lane ${sKey} stamped but ${lanes.length} lanes rendered`);
      if (!sKey && lanes.length) fails.push('a sentence lane without a stamp');
      lanes.forEach((ln) => {
        const w = ln.querySelector('[data-lcs-lane]');
        if (!w || w.textContent.trim() || !w.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push('sentence lane: no empty writing row');
        if (!ln.querySelector('[data-lcs-label-key]') || !ln.querySelector('[data-lcs-label-key]').textContent.trim()) fails.push('sentence lane: no literal');
      });
      // 8. everything inside the body column; the portrait is square unless stretched
      const br = rect(body);
      root.querySelectorAll('[data-lcs-banner],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox],[data-lcs-favourite],[data-lcs-sentence]').forEach((el) => {
        const r = rect(el);
        if (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.top < br.top - 0.6 || r.bottom > br.bottom + 0.6) fails.push(`<${el.tagName.toLowerCase()} ${Object.keys(el.dataset)[0]}> leaves the body column`);
      });
      // 9. no two frames overlap (a squeezed row must never spill into the row below)
      const frames = [...root.querySelectorAll('[data-lcs-banner],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox="family"],[data-lcs-favourite],[data-lcs-sentence]')].map((el) => ({ el, r: rect(el) }));
      for (let i = 0; i < frames.length; i++) for (let j = i + 1; j < frames.length; j++) {
        const a = frames[i].r, b = frames[j].r;
        if (frames[i].el.contains(frames[j].el) || frames[j].el.contains(frames[i].el)) continue;
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 0.6 && oy > 0.6) fails.push(`frames overlap: ${Object.keys(frames[i].el.dataset)[0]} and ${Object.keys(frames[j].el.dataset)[0]} by ${Math.round(oy)} px`);
      }
      // 9b. every frame stays inside its own grid row (a squeezed row must not eat the gap to the row below)
      root.querySelectorAll('[data-lcs-favourite],[data-lcs-portrait],[data-lcs-agelane],[data-lcs-drawbox="family"]').forEach((el) => {
        const row = el.closest('[data-lcs-favourites],[data-lcs-pair]');
        if (!row) { fails.push(`${Object.keys(el.dataset)[0]} sits outside a grid row`); return; }
        const r = rect(el), rr = rect(row);
        if (r.bottom > rr.bottom + 0.6 || r.top < rr.top - 0.6) fails.push(`${Object.keys(el.dataset)[0]} ${el.dataset.lcsFavourite || ''} spills ${Math.round(Math.max(r.bottom - rr.bottom, rr.top - r.top))} px outside its row`);
      });
      const portrait = root.querySelector('[data-lcs-portrait]');
      if (portrait) {
        const pr = rect(portrait), size = +root.dataset.lcsPortraitSize;
        if (Math.abs(pr.width - size) > 1) fails.push(`portrait ${Math.round(pr.width)} wide ≠ ${size}`);
        if (portrait.dataset.lcsStretch !== '1' && Math.abs(pr.height - size) > 1) fails.push(`portrait ${Math.round(pr.height)} high ≠ ${size}`);
        if (pr.height < size - 0.6) fails.push(`portrait ${Math.round(pr.height)} high < ${size}`);
        const corners = portrait.querySelectorAll('[data-lcs-corner]');
        if (corners.length !== 4) fails.push(`portrait has ${corners.length} photo corners, want 4`);
        const zone = portrait.querySelector('[data-lcs-drawbox="portrait"]');
        if (zone) {
          const zr = rect(zone);
          corners.forEach((c) => { const cr = rect(c); if (cr.left < zr.left - 0.6 || cr.right > zr.right + 0.6 || cr.top < zr.top - 0.6 || cr.bottom > zr.bottom + 0.6) fails.push('a photo corner sits off the portrait zone'); });
          if (corners.length === 4) {
            const ys = [...corners].map((c) => rect(c).top);
            if (Math.max(...ys) - Math.min(...ys) < zr.height - 30) fails.push('the photo corners do not reach the bottom edge of the zone');
          }
        }
      }
      return fails;
    });
  },
};
