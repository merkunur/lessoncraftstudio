#!/usr/bin/env node
/* =====================================================================
   verify-sound-boxes-bank.js — build-gate for the Sound Boxes tool's
   per-locale word banks (mini tools/sound-boxes-bank-<locale>.json).

   MEASURED invariants (never loosen a threshold — fix the data):
     1. reassembly: join(boxes) + splitDigraph tail + silentTail === display
        (case-insensitive; split-digraph token "a_e" contributes "a" in
        place and "e" appended after the last box; max ONE per word)
     2. box count 2–5
     3. every multi-char box is in the locale's legal-grapheme whitelist
     4. digraph-split detector: two ADJACENT single-char boxes must not
        form a known digraph of that locale (["s","h"] adjacent = the
        "fish as 4 boxes" credibility-death class)
     5. noun exists in IMAGE_VOCABULARY; if the noun appears in any
        activity manifest's noun→themeDir pairs, themeDir must MATCH
        (manifest pairs are proven-rendering ground truth)
     6. stage of every word exists in stages[]; ≥1 stage is free;
        stage ids unique; word ids unique
     7. syllables[] non-empty; locale field matches filename

   Usage: node scripts/verify-sound-boxes-bank.js [--locales=en,de]
   Exit 1 on any ERROR. WARNs (noun not seen in any manifest) don't fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');

/* Per-locale legal multi-char graphemes (boxes longer than 1 char must be
   listed here). Conservative K-3 inventories; extend deliberately. */
const GRAPHEMES = {
  en: ['sh','ch','th','wh','ck','ng','ph','ee','oo','oa','ai','ay','ea','ie','ow','ou','oi','oy','aw','au','ew','ue','ar','or','er','ur','ir','igh','a_e','i_e','o_e','u_e','e_e','ll','ss','ff','zz','gg','tt','dd','nn','mm','bb','pp'],
  de: ['sch','ch','ck','ei','ie','au','eu','äu','ll','ss','ff','tt','nn','mm','pp','rr','tz','ng','sp','st','qu','ah','eh','ih','oh','uh','aa','ee','oo'],
  fr: ['ch','ou','oi','on','an','en','in','un','ai','ei','au','eau','eu','oeu','gn','ph','ll','ss','tt','nn','mm','rr','pp','qu','é','è','ê'],
  es: ['ch','ll','rr','qu','gu','ñ'],
  pt: ['ch','lh','nh','rr','ss','qu','gu','ão','ãe','õe'],
  it: ['ch','gh','gn','gl','sc','ci','gi','ll','tt','ss','nn','mm','rr','pp','cc','bb','zz','ff','gg','dd'],
  /* nl: NO 'sch' — Dutch sch = s + ch = TWO klanken (opposite of German);
     a single sch box is always wrong and must be structurally rejected. */
  nl: ['aa','ee','oo','uu','oe','ie','ij','ei','ui','eu','ou','au','ch','ng','nk'],
  sv: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','ck','ng','sj','skj','stj','kj','tj','hj','lj','dj','gj'],
  da: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sk','sj','hj','aa'],
  no: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sj','skj','kj','gj','hj','øy','ei','au'],
  fi: ['kk','pp','tt','ss','ll','nn','mm','rr','aa','ee','ii','oo','uu','yy','ää','öö','ng','nk']
};

/* Digraphs that must NEVER appear as two adjacent single-letter boxes. */
const SPLIT_TRAPS = {
  en: ['sh','ch','th','ck','ng','wh','ph'],
  de: ['sc','ch','ck','ei','ie','au','eu'],          /* sc catches s|c|h → sch splits */
  fr: ['ch','ou','oi','gn','an','on','in'],
  es: ['ch','ll','rr','qu'],
  pt: ['ch','lh','nh','rr'],
  it: ['ch','gh','gn','gl','sc'],
  nl: ['oe','ie','ij','ei','ui','eu','ou','au','ch','ng','aa','ee','oo','uu'],
  sv: ['ng','sj','kj','tj','ck'],
  da: ['ng','sj','aa'],
  no: ['ng','sj','kj','ei','au','øy'],
  fi: ['ng','nk']
};

function loadImageVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  return new Function(src + '; return IMAGE_VOCABULARY;')();
}

/* Ground-truth noun→themeDir pairs harvested from every activity manifest
   (proven to render on the live image tree). */
function harvestNounThemePairs() {
  /* noun → Set of every themeDir it has been rendered from (a noun can
     legitimately live in several themes on the image tree). */
  const pairs = {};
  const add = (noun, dir) => { (pairs[noun] = pairs[noun] || new Set()).add(dir); };
  for (const f of fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('-activities.json'))) {
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

function reassemble(word) {
  let out = '', tail = '', splits = 0;
  for (const box of word.boxes) {
    const m = /^(.+)_(.+)$/.exec(box);
    if (m) { splits++; out += m[1]; tail += m[2]; }
    else out += box;
  }
  return { text: out + tail + (word.silentTail || ''), splits };
}

function checkBank(locale, vocab, pairs) {
  const file = path.join(TOOLS_DIR, `sound-boxes-bank-${locale}.json`);
  const errors = [], warns = [];
  if (!fs.existsSync(file)) { errors.push(`missing file ${file}`); return { errors, warns, count: 0 }; }
  let bank;
  try { bank = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { errors.push(`JSON parse: ${e.message}`); return { errors, warns, count: 0 }; }

  if (bank.locale !== locale) errors.push(`locale field "${bank.locale}" != filename locale "${locale}"`);
  if (!Array.isArray(bank.stages) || !bank.stages.length) errors.push('stages[] missing/empty');
  const stageIds = new Set();
  const syllableStages = new Set();   /* stages whose boxes are SYLLABLE chunks
                                         (es/pt/it/fi syllable-first pedagogy):
                                         whitelist + digraph checks don't apply */
  let freeCount = 0;
  for (const s of bank.stages || []) {
    if (!s.id || !s.label) errors.push(`stage missing id/label: ${JSON.stringify(s)}`);
    if (stageIds.has(s.id)) errors.push(`duplicate stage id ${s.id}`);
    stageIds.add(s.id);
    if (s.type === 'syllables') syllableStages.add(s.id);
    if (s.free) freeCount++;
  }
  if (freeCount < 1) errors.push('no free stage (need ≥1)');

  const legal = new Set(GRAPHEMES[locale] || []);
  const traps = SPLIT_TRAPS[locale] || [];
  const wordIds = new Set();

  for (const w of bank.words || []) {
    const tag = `[${locale}:${w.id || w.display}]`;
    if (!w.id) errors.push(`${tag} missing id`);
    else if (wordIds.has(w.id)) errors.push(`${tag} duplicate word id`);
    wordIds.add(w.id);
    if (!w.display) { errors.push(`${tag} missing display`); continue; }
    if (!Array.isArray(w.boxes) || w.boxes.length < 2 || w.boxes.length > 5)
      errors.push(`${tag} box count ${w.boxes ? w.boxes.length : 0} (need 2–5)`);
    if (!Array.isArray(w.syllables) || !w.syllables.length) errors.push(`${tag} syllables[] missing`);
    if (!stageIds.has(w.stage)) errors.push(`${tag} unknown stage "${w.stage}"`);

    /* 1: reassembly */
    const r = reassemble(w);
    if (r.splits > 1) errors.push(`${tag} more than one split-digraph box`);
    if (r.text.toLowerCase() !== String(w.display).toLowerCase())
      errors.push(`${tag} reassembly "${r.text}" != display "${w.display}"`);

    /* 3+4 apply only to PHONEME stages — a syllable-stage box is a whole
       syllable ("pa","to"), not a grapheme. */
    if (!syllableStages.has(w.stage)) {
      /* 3: whitelist for multi-char boxes */
      for (const box of w.boxes || []) {
        if (box.length > 1 && !legal.has(box.toLowerCase()))
          errors.push(`${tag} box "${box}" not in ${locale} legal-grapheme whitelist`);
      }
      /* 4: adjacent single-letter digraph split */
      for (let i = 0; i + 1 < (w.boxes || []).length; i++) {
        const a = w.boxes[i], b = w.boxes[i + 1];
        if (a.length === 1 && b.length === 1 && traps.includes((a + b).toLowerCase()))
          errors.push(`${tag} adjacent boxes "${a}","${b}" split the digraph "${a}${b}"`);
      }
    }

    /* 5: image resolution */
    if (!w.noun) { warns.push(`${tag} no noun (no image — allowed only for custom-style entries)`); }
    else {
      if (!vocab[w.noun]) errors.push(`${tag} noun "${w.noun}" not in IMAGE_VOCABULARY`);
      if (!w.themeDir) errors.push(`${tag} missing themeDir`);
      else if (pairs[w.noun] && !pairs[w.noun].has(w.themeDir))
        errors.push(`${tag} themeDir "${w.themeDir}" not manifest-verified for "${w.noun}" (verified: ${[...pairs[w.noun]].join(', ')})`);
      else if (!pairs[w.noun])
        warns.push(`${tag} noun/themeDir "${w.noun}"/"${w.themeDir}" not seen in any manifest — verify the image exists on the server`);
    }
  }
  return { errors, warns, count: (bank.words || []).length };
}

/* ---- main ---- */
const arg = process.argv.find(a => a.startsWith('--locales='));
const ALL = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];
const locales = arg ? arg.split('=')[1].split(',') : ALL.filter(l => fs.existsSync(path.join(TOOLS_DIR, `sound-boxes-bank-${l}.json`)));

const vocab = loadImageVocabulary();
const pairs = harvestNounThemePairs();
let failed = false;
for (const L of locales) {
  const { errors, warns, count } = checkBank(L, vocab, pairs);
  const status = errors.length ? 'FAIL' : 'PASS';
  if (errors.length) failed = true;
  console.log(`${status}  ${L}  (${count} words, ${errors.length} errors, ${warns.length} warns)`);
  for (const e of errors) console.log(`   ERROR ${e}`);
  for (const w of warns) console.log(`   warn  ${w}`);
}
process.exit(failed ? 1 : 0);
