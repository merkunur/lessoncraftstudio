#!/usr/bin/env node
/* =====================================================================
   verify-picture-word-wall.js — THE GATE for Picture Word Wall.
   MEASURED invariants (fix the data, never the gate):

     1. SoT BYTE-EQUALITY — every card's baked `s`/`p` is byte-identical
        to IMAGE_VOCABULARY[key][locale][0|1], ×11 locales. The index is
        a derived artifact; this is its drift net (§10.4 read-from-SoT).
     2. THE TREE NET — every card in the `tree` theme has a key ending
        `-tree`. tree/apple@2x.webp is an apple TREE; a naive join hits
        vocab `apple` → "der Apfel" and a "does it resolve?" check
        PASSES it. Only this assert catches the silent wrong word.
     3. NO B&W — no theme key matching /_bw(_\d+)?$/ in any index. (The
        documented §20.5 localized-marker rule leaks 7 of 50; we filter
        on the key.)
     4. THE "der Rot" NET — no card flagged `na` may ever compose an
        article, in ANY locale; and no `na` card carries a gender code.
        colors/emotions/activities are adjectives/gerunds whose genders
        were fabricated for Find-and-Count (red→["Rot","Rot","m"]).
     5. ARTICLE TABLE COMPLETENESS — every locale present; every gender
        code that actually occurs in that locale's index has an article
        (the sv/da `n`=COMMON net — §A.13.58 per-locale gender
        authority; a missing code would silently drop the article).
     6. PRINT-SPEECH MATCHED — compose() is the single source for both
        display and speech; the plural article resolves for every
        gendered locale; no composed string has a double space or a
        leading/trailing space.
     7. IMAGE PATHS — every card's file exists on disk at @2x.
     8. IDENTICAL PLURALS are flagged `sp` exactly when s === p (they
        are the LESSON — the card says so — not a defect to hide).
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const NO_ARTICLE_THEMES = ['colors', 'emotions', 'activities'];
const errors = [];
const E = (m) => errors.push(m);

function loadVocab() {
  const src = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  const sb = { window: {} };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(src + '\n;globalThis.__V = IMAGE_VOCABULARY;', sb);
  return sb.__V;
}
function loadTool() {
  const sb = { window: {} };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'picture-word-wall.js'), 'utf8'), sb);
  return sb.PictureWordWall || sb.window.PictureWordWall;
}

let vocab, tool;
try { vocab = loadVocab(); tool = loadTool(); }
catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
if (!tool || !tool.PWW_ARTICLES) { console.log('FAIL  PWW_ARTICLES not found'); process.exit(1); }

let cards = 0, byteAsserts = 0, composeAsserts = 0;
const seenGenders = {};
const fileChecked = {};

for (const loc of LOCALES) {
  const f = path.join(REPO, 'mini tools', `pww-index-${loc}.json`);
  if (!fs.existsSync(f)) { E(`index missing: pww-index-${loc}.json`); continue; }
  let idx;
  try { idx = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${loc}: index parse: ${e.message}`); continue; }
  seenGenders[loc] = {};

  /* ---- 5a. the article table exists for this locale ---- */
  const A = tool.PWW_ARTICLES[loc];
  if (!A) { E(`PWW_ARTICLES.${loc} missing`); continue; }
  if (!A.form || ['definite', 'indefinite', 'none'].indexOf(A.form) < 0) E(`${loc}: bad form "${A.form}"`);

  for (const t of idx.themes) {
    /* ---- 3. no B&W ---- */
    if (/_bw(_\d+)?$/.test(t.k)) E(`${loc}: B&W theme "${t.k}" in the index`);
    if (!t.n) E(`${loc}: theme ${t.k} has no localized name`);
    const isNoArt = NO_ARTICLE_THEMES.indexOf(t.k) >= 0;

    for (const c of t.c) {
      cards++;
      /* ---- 1. SoT byte-equality ---- */
      const e = vocab[c.k] && vocab[c.k][loc];
      if (!e) { E(`${loc}: ${t.k}/${c.k} not in the vocabulary`); continue; }
      if (c.s !== e[0]) E(`SoT ${loc} ${c.k}: s="${c.s}" ≠ vocab "${e[0]}"`);
      if (c.p !== e[1]) E(`SoT ${loc} ${c.k}: p="${c.p}" ≠ vocab "${e[1]}"`);
      byteAsserts += 2;

      /* ---- 2. the tree net ---- */
      if (t.k === 'tree' && !/-tree$/.test(c.k)) E(`TREE ${loc}: "${c.k}" does not end -tree (file ${c.f} — the naive join gives the FRUIT)`);

      /* ---- 4. the "der Rot" net ---- */
      if (isNoArt) {
        if (!c.na) E(`NA ${loc}: ${t.k}/${c.k} is in a non-noun theme but lacks na:1`);
        if (c.g) E(`NA ${loc}: ${t.k}/${c.k} carries a fabricated gender "${c.g}"`);
      }
      if (c.na) {
        const s1 = tool.compose(loc, c, false);
        const s2 = tool.compose(loc, c, true);
        if (s1 !== c.s) E(`NA ${loc}: ${c.k} composed an article: "${s1}"`);
        if (s2 !== c.p) E(`NA ${loc}: ${c.k} composed a plural article: "${s2}"`);
        if (tool.railFor(loc, c, false)) E(`NA ${loc}: ${c.k} got a gender rail`);
        composeAsserts += 2;
      }

      /* ---- 8. identical plurals flagged exactly ---- */
      const same = e[0] === e[1];
      if (same && !c.sp) E(`SP ${loc}: ${c.k} s===p but no sp flag`);
      if (!same && c.sp) E(`SP ${loc}: ${c.k} sp flag but s!=="p"`);

      /* ---- 5b. record the gender codes that actually occur ---- */
      if (c.g) seenGenders[loc][c.g] = (seenGenders[loc][c.g] || 0) + 1;

      /* ---- 4b. THE GOLD PLURAL RAIL — the moat's best moment.
         Singular rails by gender; the PLURAL always takes the 4th
         (gold) rail, so the child SEES that plural erases gender
         (der Hund teal → die Hunde gold). ---- */
      if (c.g && !c.na) {
        const rS = tool.railFor(loc, c, false);
        const rP = tool.railFor(loc, c, true);
        if (rS !== c.g) E(`RAIL ${loc} ${c.k}: singular rail "${rS}" ≠ gender "${c.g}"`);
        if (rP !== 'plural') E(`RAIL ${loc} ${c.k}: plural rail "${rP}" ≠ "plural" (the gold rail — plural must erase gender)`);
        composeAsserts += 2;
      }

      /* ---- 6. compose hygiene ---- */
      const disp = tool.compose(loc, c, false);
      const dispP = tool.compose(loc, c, true);
      for (const [s, lbl] of [[disp, 'sing'], [dispP, 'plur']]) {
        if (!s || !s.trim()) E(`COMPOSE ${loc} ${c.k} ${lbl}: empty`);
        else if (s !== s.trim() || /\s\s/.test(s)) E(`COMPOSE ${loc} ${c.k} ${lbl}: bad spacing "${s}"`);
        composeAsserts++;
      }

      /* ---- 7. the image exists (once per theme/file) ---- */
      const fk = t.k + '/' + c.f;
      if (!fileChecked[fk]) {
        fileChecked[fk] = true;
        const p = path.join(REPO, 'image-library-webp', 'themes', t.d, c.f + '@2x.webp');
        if (!fs.existsSync(p)) E(`IMG ${t.k}/${c.f}: missing at ${t.d}/${c.f}@2x.webp`);
      }
    }
  }
}

/* ---- 5c. every OCCURRING gender code has an article ---- */
for (const loc of LOCALES) {
  const A = tool.PWW_ARTICLES[loc];
  if (!A || !seenGenders[loc]) continue;
  const codes = Object.keys(seenGenders[loc]);
  if (A.form === 'none') {
    if (codes.length) E(`${loc}: form:none but ${codes.length} gender codes occur (${codes})`);
    continue;
  }
  if (!codes.length) { E(`${loc}: form:${A.form} but no gender codes occur`); continue; }
  for (const g of codes) {
    if (!A.by[g]) E(`ARTICLE ${loc}: gender code "${g}" occurs ${seenGenders[loc][g]}× but has no article (the sv/da n=COMMON net)`);
  }
  /* the plural article must resolve for every gendered locale */
  if (A.plural === undefined) E(`ARTICLE ${loc}: no plural article`);
}

/* ---- the de nominative sanity anchors (the dative landmine) ---- */
const anchors = [['cat', 'die Katze', 'die Katzen'], ['dog', 'der Hund', 'die Hunde'], ['horse', 'das Pferd', 'die Pferde']];
for (const [k, wantS, wantP] of anchors) {
  const e = vocab[k] && vocab[k].de;
  if (!e) continue;
  const card = { k: k, s: e[0], p: e[1], g: e[2] };
  const gotS = tool.compose('de', card, false);
  const gotP = tool.compose('de', card, true);
  if (gotS !== wantS) E(`DE ANCHOR ${k}: "${gotS}" ≠ "${wantS}" (dative table leak?)`);
  if (gotP !== wantP) E(`DE ANCHOR ${k} plural: "${gotP}" ≠ "${wantP}"`);
}
/* sv: gender n = COMMON (en-word), t = neuter (ett) — never "ett katt" */
const svAnchors = [['cat', 'en katt'], ['house', 'ett hus']];
for (const [k, want] of svAnchors) {
  const e = vocab[k] && vocab[k].sv;
  if (!e) continue;
  const got = tool.compose('sv', { k: k, s: e[0], p: e[1], g: e[2] }, false);
  if (got.toLowerCase() !== want) E(`SV ANCHOR ${k}: "${got}" ≠ "${want}" (n=COMMON, t=neuter)`);
}

/* ---- 9. strings ×11 + placeholders + no "Common Core" ---- */
const S = tool.strings || {};
if (!Object.keys(S).length) E('strings missing');
for (const key of Object.keys(S)) {
  for (const loc of LOCALES) {
    const v = S[key][loc];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${loc}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${loc}: mentions Common Core`);
  }
}
for (const loc of LOCALES) {
  for (const [k, ph] of [['whisperFind', '{word}'], ['whisperFound', '{word}'], ['samePluralSpeak', '{word}'], ['pageAria', '{n}'], ['pageAria', '{t}']]) {
    if (S[k] && S[k][loc] && !S[k][loc].includes(ph)) E(`${k}.${loc}: ${ph} missing`);
  }
}

console.log(`${errors.length ? 'FAIL' : 'PASS'}  picture-word-wall gate  (${cards} cards, ${byteAsserts} SoT, ${composeAsserts} compose asserts, ${errors.length} errors)`);
for (const e of errors.slice(0, 20)) console.log('   ERROR ' + e);
if (errors.length > 20) console.log(`   … +${errors.length - 20} more`);
process.exit(errors.length ? 1 : 0);
