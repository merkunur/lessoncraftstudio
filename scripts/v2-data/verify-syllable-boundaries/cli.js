#!/usr/bin/env node
/* =====================================================================
   PHONICS SAFETY-VERIFICATION PIPELINE — CLI ORCHESTRATOR
   ---------------------------------------------------------------------
   Usage:
     node cli.js --locale <code>           # run gate on one locale
     node cli.js --locales sv,fi           # run gate on multiple
     node cli.js --all                     # run on all 11 locales
     node cli.js --preflight               # run kaikki coverage probe

   Per the approved safety verdicts. Reads image-vocabulary.js (READ-ONLY)
   and vocabulary-phonics.json (READ-ONLY). Writes only to output/.
   ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const gate = require('./gate');
const hyphenation = require('./sources/hyphenation');
const ruleSyllabifier = require('./sources/rule-syllabifier');
const vocabPhonics = require('./sources/vocab-phonics-cross-check');
const nst = require('./sources/nst');
const kaikkiWiktionary = require('./sources/kaikki-wiktionary');
const imageVocab = require('./sources/image-vocabulary-loader');
const danishQuarantine = require('./da-quarantine');

const OUTPUT_DIR = path.join(__dirname, 'output');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const CHUNK_TABLES = {};
['de','nl','sv','no'].forEach(loc => {
  const p = path.join(__dirname, 'chunk-tables', loc + '-chunks.json');
  if (fs.existsSync(p)) CHUNK_TABLES[loc] = JSON.parse(fs.readFileSync(p, 'utf-8'));
});

/* Locales with NST pronunciation lexicon support */
const NST_LOCALES = new Set(['sv','no','da']);
/* Locales for which Wiktionary IPA is queried.
   NOTE: Finnish Wiktionary entries use the {{fi-pronunciation}} template
   (which auto-generates IPA from spelling) instead of the direct {{IPA|fi|}}
   template. We don't query FI Wiktionary because (a) the IPA isn't directly
   present in the wikitext, and (b) if we resolved the template we'd just be
   re-deriving from spelling — not an independent source. FI's gate uses
   T + R + S = 3 sources, which is the design intent for the GREEN locale. */
const WIKTIONARY_LOCALES = new Set(['de','nl','sv','no','da']);
/* Min sources that must agree per locale group */
const MIN_AGREED = {
  default: 3,
  sv: 3,
  no: 3,
  da: 3,
  de: 3,
  nl: 3,
  fi: 3
};

/* Build the source-set per locale per word */
async function evaluateWord(key, word, locale, opts) {
  const inputs = {};

  // T — TeX hyphenation via hyphen npm
  inputs.T = hyphenation.syllabify(word, locale);

  // R — rule-based syllabifier (if available for locale)
  inputs.R = ruleSyllabifier.syllabify(word, locale);

  // S — vocabulary-phonics.json syl cross-check
  inputs.S = vocabPhonics.getSyllableCount(key, locale);

  // N — NST lexicon for sv/no/da. Pass as syllable COUNT, not split
  // (NST split is phonetic SAMPA; orthographic chunks come from T/R).
  if (NST_LOCALES.has(locale) && opts.nstReduced) {
    const entry = nst.lookup(word, opts.nstReduced);
    if (entry) {
      inputs.N = entry.sylCount; // count, not split
      inputs.nstSampa = entry.sampa;
      inputs.nstSylSplitPhonetic = entry.sylSplit; // preserve for output decoration
    }
  }

  // W — Wiktionary IPA via en.wiktionary.org
  if (WIKTIONARY_LOCALES.has(locale) && !opts.skipWiktionary) {
    const lookup = await kaikkiWiktionary.lookup(word, locale, { delayMs: 80 });
    inputs.W = lookup.sylCount;
    inputs.wiktionaryIpa = lookup.ipa;
  }

  // C — chunk table for de/nl/sv/no
  if (CHUNK_TABLES[locale]) inputs.C = CHUNK_TABLES[locale];

  // Q — Danish quarantine regex (da only). Requires IPA — prefer NST SAMPA.
  if (locale === 'da') {
    const ipaForCheck = inputs.nstSampa || inputs.wiktionaryIpa;
    if (ipaForCheck) {
      const qResult = danishQuarantine.checkDanishQuarantine(word, ipaForCheck);
      // For DA: flagged words go to policy-managed status, not hard quarantine.
      // The gate sees this as a "policy_managed" decoration on PASS verdicts.
      inputs.daPolicyManaged = qResult.flagged;
      inputs.daQuarantineReasons = qResult.reasons;
      // Do NOT set inputs.Q here — that would trigger hard quarantine in the gate.
      // The policy doc handles these words; they still PASS the gate.
    }
  }

  // Drop inputs that aren't part of the gate's evaluator (decoration only)
  const gateInputs = {
    T: inputs.T, R: inputs.R, N: inputs.N, W: inputs.W, S: inputs.S,
    C: inputs.C
  };
  const verdict = gate.evaluate(gateInputs, { locale, minSourcesAgreed: MIN_AGREED[locale] || MIN_AGREED.default });

  // Decorate with NST + Wiktionary IPA + Danish policy flags
  if (inputs.nstSampa) verdict.nst_sampa = inputs.nstSampa;
  if (inputs.wiktionaryIpa) verdict.wiktionary_ipa = inputs.wiktionaryIpa;
  if (inputs.daPolicyManaged) {
    verdict.policy_managed = true;
    verdict.policy_managed_reasons = inputs.daQuarantineReasons;
  }
  return verdict;
}

async function runLocale(locale, opts) {
  opts = opts || {};
  console.error(`\n=== Running pipeline for locale: ${locale} ===`);
  const entries = imageVocab.entriesByLocale(locale);
  console.error(`Loaded ${entries.length} (key, word) pairs from image-vocabulary.js`);

  // For NST locales: ensure reduced cache
  let nstReduced = null;
  if (NST_LOCALES.has(locale) && !opts.skipNst) {
    const wordSet = new Set(entries.map(e => e.word.toLowerCase()));
    try {
      nstReduced = await nst.ensureReduced(locale, wordSet);
      console.error(`NST reduced cache: ${nstReduced.count} entries`);
    } catch (e) {
      console.error(`NST setup failed: ${e.message}`);
      console.error('Continuing without NST source for this locale.');
    }
  }

  const approved = [];
  const quarantined = [];
  let i = 0;
  for (const { key, word } of entries) {
    i++;
    if (i % 50 === 0) process.stderr.write(`  ${i}/${entries.length}\n`);
    try {
      const verdict = await evaluateWord(key, word, locale, { nstReduced, skipWiktionary: opts.skipWiktionary });
      if (verdict.verdict === 'PASS') {
        approved.push({
          key, word,
          split: verdict.syllables,
          count: verdict.count,
          chunks: verdict.chunks,
          sources_agreed: verdict.sources_agreed,
          total_agreed: verdict.total_agreed,
          ...(verdict.policy_managed ? { policy_managed: true, policy_managed_reasons: verdict.policy_managed_reasons } : {}),
          ...(verdict.nst_sampa ? { nst_sampa: verdict.nst_sampa } : {}),
          ...(verdict.wiktionary_ipa ? { wiktionary_ipa: verdict.wiktionary_ipa } : {})
        });
      } else {
        quarantined.push({ locale, key, word, ...verdict });
      }
    } catch (e) {
      quarantined.push({ locale, key, word, verdict: 'QUARANTINE', reason: 'pipeline_error', error: e.message });
    }
  }

  const out = {
    locale,
    generated_at: new Date().toISOString(),
    gate_version: '1.0',
    source_stack: [
      'TeX-hyphenation-via-hyphen-npm',
      'rule-based-phonotactic-syllabifier',
      NST_LOCALES.has(locale) ? 'NST-' + locale + '-pronunciation-lexicon' : null,
      WIKTIONARY_LOCALES.has(locale) ? 'Wiktionary-IPA-via-kaikki' : null,
      'vocabulary-phonics-syl-cross-check',
      CHUNK_TABLES[locale] ? 'curriculum-chunk-table-' + locale : null,
      locale === 'da' ? 'da-quarantine-regex' : null
    ].filter(Boolean),
    count_approved: approved.length,
    count_quarantined: quarantined.length,
    entries: approved
  };
  const outPath = path.join(OUTPUT_DIR, `approved-words-${locale}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.error(`Approved ${approved.length}/${entries.length} → ${outPath}`);
  return { approved: approved.length, quarantined };
}

async function main() {
  const args = process.argv.slice(2);
  let locales = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--locale' && args[i + 1]) { locales.push(args[i + 1]); i++; }
    else if (args[i] === '--locales' && args[i + 1]) { locales.push(...args[i + 1].split(',')); i++; }
    else if (args[i] === '--all') {
      locales = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
    }
  }
  if (locales.length === 0) {
    console.error('Usage: node cli.js --locale <code> | --locales <a,b,c> | --all');
    process.exit(1);
  }

  const allQuarantined = [];
  const summary = { generated_at: new Date().toISOString(), by_locale: {} };
  for (const loc of locales) {
    try {
      const r = await runLocale(loc, {});
      summary.by_locale[loc] = { approved: r.approved, quarantined: r.quarantined.length };
      allQuarantined.push(...r.quarantined);
    } catch (e) {
      console.error(`Locale ${loc} failed: ${e.message}`);
      summary.by_locale[loc] = { error: e.message };
    }
  }
  // Write aggregated quarantine report
  const quarantinePath = path.join(OUTPUT_DIR, 'quarantine-report.json');
  fs.writeFileSync(quarantinePath, JSON.stringify({
    generated_at: new Date().toISOString(),
    total_quarantined: allQuarantined.length,
    summary: summary.by_locale,
    entries: allQuarantined
  }, null, 2));
  console.error(`\nQuarantine report: ${allQuarantined.length} entries → ${quarantinePath}`);
  console.error('Summary:', JSON.stringify(summary.by_locale, null, 2));
}

if (require.main === module) {
  main().catch(e => { console.error(e); process.exit(1); });
}
module.exports = { runLocale, evaluateWord };
