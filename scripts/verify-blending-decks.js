#!/usr/bin/env node
/* =====================================================================
   verify-blending-decks.js — build-gate for the Blending Board tool's
   per-locale deck files (mini tools/blending-board-deck-<locale>.json).

   MEASURED invariants (fix the data, never the gate):
     1. locale matches filename; ≥1 free deck; unique deck ids
     2. columns: 2–4 (WARN >3 — v1 decks are 2–3); per-column cards
        non-empty, unique surfaces; card = "g" | {g, sounds:2..3}
        (sounds only on multi-char cards — the dotted-seam clusters)
     3. scope covers every card (surface in scope, or every letter of it)
     4. every `real` key is EXACTLY composable: one card per column, in
        order, concatenating to the key (DP over columns)
     5. real entries with noun: noun ∈ IMAGE_VOCABULARY and themeDir
        manifest-verified (same harvest as verify-sound-boxes-bank)
     6. chains: every word real AND non-sensitive; consecutive words
        have decompositions differing in EXACTLY one column
     7. type:"syllable" decks carry NO real map, NO chains, NO badges
        (mouths only — the fr/de/fi syllable drills)
     8. comboAudit attestation present (the native agent's profanity/
        anatomy/alcohol sweep of the FULL combo space)
     9. nonwordTTS boolean present on word decks

   Usage: node scripts/verify-blending-decks.js [--locales=en,de]
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');

function loadImageVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  return new Function(src + '; return IMAGE_VOCABULARY;')();
}

/* noun → Set(themeDir) harvested from every activity manifest + the
   sound-boxes banks (proven-rendering ground truth). */
function harvestNounThemePairs() {
  const pairs = {};
  const add = (noun, dir) => { (pairs[noun] = pairs[noun] || new Set()).add(dir); };
  const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('-activities.json') || /^sound-boxes-bank-[a-z]{2}\.json$/.test(f));
  for (const f of files) {
    let txt;
    try { txt = fs.readFileSync(path.join(TOOLS_DIR, f), 'utf8'); } catch (_) { continue; }
    let m;
    const re = /"noun"\s*:\s*"([^"]+)"\s*,\s*"themeDir"\s*:\s*"([^"]+)"/g;
    while ((m = re.exec(txt))) add(m[1], m[2]);
    const re2 = /"themeDir"\s*:\s*"([^"]+)"\s*,\s*"noun"\s*:\s*"([^"]+)"/g;
    while ((m = re2.exec(txt))) add(m[2], m[1]);
  }
  return pairs;
}

const surface = (card) => (typeof card === 'string' ? card : card.g);

/* All decompositions of `word` into one card-surface per column (in order). */
function decompose(word, columns) {
  const out = [];
  (function walk(pos, ci, picked) {
    if (ci === columns.length) {
      if (pos === word.length) out.push(picked.slice());
      return;
    }
    for (const card of columns[ci].cards) {
      const g = surface(card).toLowerCase();
      if (word.startsWith(g, pos)) {
        picked.push(g);
        walk(pos + g.length, ci + 1, picked);
        picked.pop();
      }
    }
  })(0, 0, []);
  return out;
}

function diffOneColumn(word1, word2, columns) {
  const d1 = decompose(word1, columns), d2 = decompose(word2, columns);
  for (const a of d1) for (const b of d2) {
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
    if (diff === 1) return true;
  }
  return false;
}

function checkFile(locale, vocab, pairs) {
  const file = path.join(TOOLS_DIR, `blending-board-deck-${locale}.json`);
  const errors = [], warns = [];
  if (!fs.existsSync(file)) { errors.push(`missing file ${file}`); return { errors, warns, decks: 0 }; }
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { errors.push(`JSON parse: ${e.message}`); return { errors, warns, decks: 0 }; }

  if (data.locale !== locale) errors.push(`locale field "${data.locale}" != filename "${locale}"`);
  if (!Array.isArray(data.decks) || !data.decks.length) { errors.push('decks[] missing/empty'); return { errors, warns, decks: 0 }; }
  if (!data.decks.some(d => d.free)) errors.push('no free deck (need ≥1)');
  const ids = new Set();

  for (const deck of data.decks) {
    const tag = `[${locale}:${deck.id || '?'}]`;
    if (!deck.id || ids.has(deck.id)) errors.push(`${tag} missing/duplicate deck id`);
    ids.add(deck.id);
    if (!deck.label) errors.push(`${tag} missing label`);
    if (deck.type !== 'word' && deck.type !== 'syllable') errors.push(`${tag} type must be word|syllable`);
    if (typeof deck.comboAudit !== 'string' || deck.comboAudit.length < 20)
      errors.push(`${tag} comboAudit attestation missing/too short`);

    /* columns */
    if (!Array.isArray(deck.columns) || deck.columns.length < 2 || deck.columns.length > 4) {
      errors.push(`${tag} columns must be 2–4`); continue;
    }
    if (deck.columns.length > 3) warns.push(`${tag} 4-column deck (v1 ships 2–3 only)`);
    let colOk = true;
    for (const col of deck.columns) {
      if (!col.role) errors.push(`${tag} column missing role`);
      if (!Array.isArray(col.cards) || !col.cards.length) { errors.push(`${tag} column ${col.role}: no cards`); colOk = false; continue; }
      const seen = new Set();
      for (const card of col.cards) {
        const g = surface(card);
        if (!g || typeof g !== 'string') { errors.push(`${tag} ${col.role}: bad card ${JSON.stringify(card)}`); colOk = false; continue; }
        if (seen.has(g)) errors.push(`${tag} ${col.role}: duplicate card "${g}"`);
        seen.add(g);
        if (typeof card === 'object') {
          if (!(Number.isInteger(card.sounds) && card.sounds >= 2 && card.sounds <= 3))
            errors.push(`${tag} ${col.role}: card "${g}" sounds must be 2–3`);
          if (g.length < 2) errors.push(`${tag} ${col.role}: seamed card "${g}" must be multi-char`);
        }
        /* 3: scope coverage */
        const scope = deck.scope || [];
        if (!(scope.includes(g) || [...g].every(ch => scope.includes(ch))))
          errors.push(`${tag} scope does not cover card "${g}"`);
      }
    }
    if (!colOk) continue;

    /* 7: syllable decks — mouths only */
    if (deck.type === 'syllable') {
      if (deck.real && Object.keys(deck.real).length) errors.push(`${tag} syllable deck must carry NO real map`);
      if (deck.chains && deck.chains.length) errors.push(`${tag} syllable deck must carry NO chains`);
      continue;
    }

    if (typeof deck.nonwordTTS !== 'boolean') errors.push(`${tag} word deck missing nonwordTTS boolean`);

    /* 4+5: real map */
    const real = deck.real || {};
    for (const key of Object.keys(real)) {
      if (!decompose(key.toLowerCase(), deck.columns).length)
        errors.push(`${tag} real word "${key}" is NOT composable from the columns`);
      const e = real[key];
      if (e && e.noun) {
        if (!vocab[e.noun]) errors.push(`${tag} "${key}": noun "${e.noun}" not in IMAGE_VOCABULARY`);
        if (!e.themeDir) errors.push(`${tag} "${key}": noun without themeDir`);
        else if (pairs[e.noun] && !pairs[e.noun].has(e.themeDir))
          errors.push(`${tag} "${key}": themeDir "${e.themeDir}" not manifest-verified for "${e.noun}" (verified: ${[...pairs[e.noun]].join(', ')})`);
        else if (!pairs[e.noun])
          warns.push(`${tag} "${key}": noun/themeDir "${e.noun}"/"${e.themeDir}" unseen in manifests — verify the image exists`);
      }
    }

    /* 6: chains */
    const isSensitive = (w) => real[w] && Array.isArray(real[w].flags) && real[w].flags.includes('sensitive');
    for (const chain of deck.chains || []) {
      if (!Array.isArray(chain) || chain.length < 2) { errors.push(`${tag} chain too short`); continue; }
      for (const w of chain) {
        if (!real[w]) errors.push(`${tag} chain word "${w}" not in real map`);
        else if (isSensitive(w)) errors.push(`${tag} chain contains sensitive word "${w}"`);
      }
      for (let i = 0; i + 1 < chain.length; i++) {
        if (real[chain[i]] && real[chain[i + 1]] && !diffOneColumn(chain[i].toLowerCase(), chain[i + 1].toLowerCase(), deck.columns))
          errors.push(`${tag} chain step "${chain[i]}"→"${chain[i + 1]}" does not change exactly one column`);
      }
    }
  }
  return { errors, warns, decks: data.decks.length };
}

/* ---- main ---- */
const arg = process.argv.find(a => a.startsWith('--locales='));
const ALL = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];
const locales = arg ? arg.split('=')[1].split(',') : ALL.filter(l => fs.existsSync(path.join(TOOLS_DIR, `blending-board-deck-${l}.json`)));

const vocab = loadImageVocabulary();
const pairs = harvestNounThemePairs();
let failed = false;
for (const L of locales) {
  const { errors, warns, decks } = checkFile(L, vocab, pairs);
  const status = errors.length ? 'FAIL' : 'PASS';
  if (errors.length) failed = true;
  console.log(`${status}  ${L}  (${decks} decks, ${errors.length} errors, ${warns.length} warns)`);
  for (const e of errors) console.log(`   ERROR ${e}`);
  for (const w of warns) console.log(`   warn  ${w}`);
}
process.exit(failed ? 1 : 0);
