#!/usr/bin/env node
/* =====================================================================
   verify-letter-tiles-data.js — build-gate for the Letter Tiles tool's
   per-locale data files (mini tools/letter-tiles-<locale>.json).

   MEASURED invariants (fix the data, never the gate):
     1. locale matches filename; nonwordTTS boolean; comboAudit ≥ 40 chars
     2. tray: unique g's; kind ∈ vowel|consonant|digraph; single letters
        length 1, digraphs length ≥ 2; ≥ 3 vowels + ≥ 8 consonants
     3. anchors: word non-empty; noun ∈ IMAGE_VOCABULARY; themeDir
        manifest-verified (harvest across activity manifests + shipped
        bank/deck files — ERROR if pair contradicts the verified set,
        WARN if never seen); position initial|final|medial;
        - position 'initial' → anchor.word starts with tile.g
          (case-insensitive), and for consonant/digraph tiles the next
          letter after g must be in the locale's VOWEL SET (no cluster
          onsets — the S-Stern trap), vowel set = tray vowel g's + the
          file's optional extraVowels list
        - position 'final' → anchor.word ends with tile.g
        - position 'medial' → anchor.word contains tile.g (not at start)
     4. extraWords: keys lowercase, every character buildable from the
        tray's single-letter g's (accent-exact); values {} or
        {noun,themeDir,flags}; flagged nouns verified like anchors
     5. neverSpeak: array of lowercase strings
   Usage: node scripts/verify-letter-tiles-data.js [--locales=en,de]
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

function harvestNounThemePairs() {
  const pairs = {};
  const add = (noun, dir) => { (pairs[noun] = pairs[noun] || new Set()).add(dir); };
  /* NOTE: letter-tiles files are deliberately EXCLUDED — including them
     would make every anchor pair self-verifying (circular). Only pairs
     proven by activity manifests + the shipped bank/deck files count. */
  const files = fs.readdirSync(TOOLS_DIR).filter(f =>
    f.endsWith('-activities.json') ||
    /^sound-boxes-bank-[a-z]{2}\.json$/.test(f) ||
    /^blending-board-deck-[a-z]{2}\.json$/.test(f));
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

function checkFile(locale, vocab, pairs) {
  const file = path.join(TOOLS_DIR, `letter-tiles-${locale}.json`);
  const errors = [], warns = [];
  if (!fs.existsSync(file)) { errors.push(`missing file ${file}`); return { errors, warns, tiles: 0, words: 0 }; }
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { errors.push(`JSON parse: ${e.message}`); return { errors, warns, tiles: 0, words: 0 }; }

  if (data.locale !== locale) errors.push(`locale "${data.locale}" != filename "${locale}"`);
  if (typeof data.nonwordTTS !== 'boolean') errors.push('nonwordTTS boolean missing');
  if (typeof data.comboAudit !== 'string' || data.comboAudit.length < 40) errors.push('comboAudit attestation missing/too short');

  const tray = data.tray || [];
  const seen = new Set();
  let vowels = 0, consonants = 0;
  const singleLetters = new Set();
  const vowelSet = new Set(data.extraVowels || []);
  for (const t of tray) {
    if (!t.g || seen.has(t.g)) errors.push(`tray: missing/duplicate g "${t.g}"`);
    seen.add(t.g);
    if (!['vowel', 'consonant', 'digraph'].includes(t.kind)) errors.push(`tray "${t.g}": bad kind "${t.kind}"`);
    if (t.kind === 'digraph' && t.g.length < 2) errors.push(`tray "${t.g}": digraph must be multi-char`);
    if (t.kind !== 'digraph' && t.g.length !== 1) errors.push(`tray "${t.g}": ${t.kind} must be single-char`);
    if (t.kind === 'vowel') { vowels++; vowelSet.add(t.g.toLowerCase()); }
    /* vowel-VALUED digraphs (de ei/au/eu, nl ij, …): flag `vowel:true` —
       they join the vowel set and skip the cluster-onset anchor check */
    if (t.kind === 'digraph' && t.vowel === true) vowelSet.add(t.g.toLowerCase());
    if (t.kind === 'consonant') consonants++;
    if (t.g.length === 1) singleLetters.add(t.g.toLowerCase());
  }
  if (vowels < 3) errors.push(`only ${vowels} vowel tiles (need ≥3)`);
  if (consonants < 8) errors.push(`only ${consonants} consonant tiles (need ≥8)`);

  /* anchors */
  for (const t of tray) {
    if (!t.anchor) continue;
    const a = t.anchor, tag = `anchor[${t.g}]`;
    const g = t.g.toLowerCase();
    const w = String(a.word || '').toLowerCase();
    if (!w) { errors.push(`${tag}: empty word`); continue; }
    if (!['initial', 'final', 'medial'].includes(a.position)) errors.push(`${tag}: bad position "${a.position}"`);
    if (a.position === 'initial') {
      if (!w.startsWith(g)) errors.push(`${tag}: "${a.word}" does not start with "${t.g}"`);
      else if (t.kind !== 'vowel' && t.vowel !== true) {
        const next = w.slice(g.length, g.length + 2);
        /* the letter right after the grapheme must begin with a vowel */
        if (!next || ![...vowelSet].some(v => next.startsWith(v)))
          errors.push(`${tag}: cluster onset — "${a.word}" has no vowel right after "${t.g}"`);
      }
    } else if (a.position === 'final') {
      if (!w.endsWith(g)) errors.push(`${tag}: "${a.word}" does not end with "${t.g}"`);
    } else if (a.position === 'medial') {
      if (!w.includes(g) || w.startsWith(g)) errors.push(`${tag}: "${a.word}" must contain "${t.g}" non-initially`);
    }
    if (!a.noun || !vocab[a.noun]) errors.push(`${tag}: noun "${a.noun}" not in IMAGE_VOCABULARY`);
    else if (!a.themeDir) errors.push(`${tag}: missing themeDir`);
    else if (pairs[a.noun] && !pairs[a.noun].has(a.themeDir))
      errors.push(`${tag}: themeDir "${a.themeDir}" contradicts verified set (${[...pairs[a.noun]].join(', ')})`);
    else if (!pairs[a.noun])
      warns.push(`${tag}: pair "${a.noun}"/"${a.themeDir}" unseen in manifests — verify the image exists live`);
  }

  /* extraWords */
  const words = data.extraWords || {};
  for (const key of Object.keys(words)) {
    const tag = `extraWords["${key}"]`;
    if (key !== key.toLowerCase()) errors.push(`${tag}: must be lowercase`);
    for (const ch of key) {
      if (!singleLetters.has(ch)) { errors.push(`${tag}: letter "${ch}" not in the tray`); break; }
    }
    const e = words[key];
    if (e && e.noun) {
      if (!vocab[e.noun]) errors.push(`${tag}: noun "${e.noun}" not in IMAGE_VOCABULARY`);
      else if (e.themeDir && pairs[e.noun] && !pairs[e.noun].has(e.themeDir))
        errors.push(`${tag}: themeDir contradicts verified set`);
    }
  }

  if (data.neverSpeak && (!Array.isArray(data.neverSpeak) || data.neverSpeak.some(s => typeof s !== 'string' || s !== s.toLowerCase())))
    errors.push('neverSpeak must be an array of lowercase strings');

  return { errors, warns, tiles: tray.length, words: Object.keys(words).length };
}

/* ---- main ---- */
const arg = process.argv.find(a => a.startsWith('--locales='));
const ALL = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];
const locales = arg ? arg.split('=')[1].split(',') : ALL.filter(l => fs.existsSync(path.join(TOOLS_DIR, `letter-tiles-${l}.json`)));

const vocab = loadImageVocabulary();
const pairs = harvestNounThemePairs();
let failed = false;
for (const L of locales) {
  const { errors, warns, tiles, words } = checkFile(L, vocab, pairs);
  const status = errors.length ? 'FAIL' : 'PASS';
  if (errors.length) failed = true;
  console.log(`${status}  ${L}  (${tiles} tiles, ${words} extraWords, ${errors.length} errors, ${warns.length} warns)`);
  for (const e of errors) console.log(`   ERROR ${e}`);
  for (const w of warns) console.log(`   warn  ${w}`);
}
process.exit(failed ? 1 : 0);
