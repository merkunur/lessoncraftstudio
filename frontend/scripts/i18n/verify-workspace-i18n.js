#!/usr/bin/env node
/**
 * verify-workspace-i18n.js — end-to-end check of the workspace/collections message layer.
 *
 * The leak report proves no string is byte-identical to English. That is necessary and not
 * sufficient: a string can differ from English and still be broken (malformed ICU, a lost
 * placeholder, a plural that throws at count=2, a namespace the component cannot reach).
 * So this renders every key through next-intl's OWN createTranslator — the same API
 * WorkspaceClient/CollectionsListClient call — for every locale, at several counts.
 *
 * It also runs an English-residue heuristic. That one REPORTS, it does not gate: a shared
 * token between English and a translation is often correct (PDF, ZIP, link, deck), and a
 * word-overlap threshold is exactly the kind of invented number that condemns good prose.
 *
 * Usage: node scripts/i18n/verify-workspace-i18n.js
 */
const fs = require('fs');
const path = require('path');
const { createTranslator } = require('next-intl');
const { parse } = require('@formatjs/icu-messageformat-parser');

const MESSAGES_DIR = path.join(__dirname, '..', '..', 'messages');
const NAMESPACES = ['workspace', 'collections', 'bulk', 'share'];
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// next-intl resolves plural rules through Intl; `no` is bokmål -> `nb` for Intl purposes.
const INTL_LOCALE = { no: 'nb' };

// Every argument any string in these namespaces takes. Passing a superset is safe and means
// one render call exercises whatever the key actually needs.
const ARGS = (n) => ({
  count: n,
  max: 25,
  name: 'Vår',
  title: 'Élise',
  deckTitle: 'Élise',
  collectionName: 'Élise',
  from: 1,
  to: 24,
  total: 240,
});

function flatten(obj, prefix = '') {
  const out = {};
  for (const k of Object.keys(obj || {})) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (v && typeof v === 'object') Object.assign(out, flatten(v, key));
  }
  return out;
}

/**
 * The set of literal prose words in a message — ICU argument names, selector keywords and
 * plural categories excluded, because they are syntax and are identical in every language.
 */
function proseWords(message) {
  const out = new Set();
  const walk = (nodes) => {
    for (const n of nodes || []) {
      if (n.type === 0 && typeof n.value === 'string') {
        for (const w of n.value.toLowerCase().match(/[a-zà-ÿ]{5,}/g) || []) out.add(w);
      }
      if (n.options) for (const k of Object.keys(n.options)) walk(n.options[k].value);
      if (n.children) walk(n.children);
    }
  };
  try {
    walk(parse(message));
  } catch {
    return out; // a malformed message is already a hard failure above
  }
  return out;
}

function main() {
  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf8'));
  let failures = 0;
  let rendered = 0;
  const residue = [];

  for (const locale of LOCALES) {
    const messages = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8'));
    for (const ns of NAMESPACES) {
      const t = createTranslator({
        locale: INTL_LOCALE[locale] || locale,
        messages,
        namespace: ns,
        onError: () => {}, // we assert on the returned value instead
      });
      const keys = Object.keys(flatten(en[ns]));
      for (const key of keys) {
        // Counts chosen to hit every plural category any of these languages has:
        // 0 (fr/pt singular, Finnish partitive-plural via negation), 1, 2, 7, 21 (ru-style
        // few/many are absent here but 21 catches an accidental =1-only string).
        for (const n of [0, 1, 2, 7, 21]) {
          let out;
          try {
            out = t(key, ARGS(n));
          } catch (e) {
            console.error(`[FAIL] ${locale}.${ns}.${key} @count=${n}: threw ${e.message}`);
            failures++;
            break;
          }
          // next-intl returns the bare key path when it cannot resolve or format a message.
          if (out === `${ns}.${key}` || out === key) {
            console.error(`[FAIL] ${locale}.${ns}.${key} @count=${n}: unresolved (rendered as its own key)`);
            failures++;
            break;
          }
          if (typeof out !== 'string' || out.trim() === '') {
            console.error(`[FAIL] ${locale}.${ns}.${key} @count=${n}: empty render`);
            failures++;
            break;
          }
          // An un-substituted argument means the translation kept a brace the data never fills.
          const leftover = out.match(/\{[a-zA-Z][a-zA-Z0-9]*\}/);
          if (leftover) {
            console.error(`[FAIL] ${locale}.${ns}.${key} @count=${n}: un-substituted ${leftover[0]} in "${out}"`);
            failures++;
            break;
          }
          rendered++;
        }

        // Residue heuristic — reported, never gated. See docblock.
        //
        // It compares PROSE ONLY. The first version compared raw strings and so counted
        // `count`, `plural`, `other` and `collectionName` as shared English words — it
        // flagged every plural in every locale and measured ICU syntax rather than
        // language. Literal text nodes come from the parser instead.
        if (locale !== 'en') {
          const src = proseWords(flatten(en[ns])[key]);
          if (src.size >= 3) {
            const got = proseWords(flatten(messages[ns] || {})[key] || '');
            const shared = [...src].filter((w) => got.has(w));
            if (shared.length / src.size >= 0.6) {
              residue.push(`${locale}.${ns}.${key}: shares ${shared.length}/${src.size} prose words with EN [${shared.join(', ')}]`);
            }
          }
        }
      }
    }
  }

  console.log(`Rendered ${rendered} message formats across ${LOCALES.length} locales × ${NAMESPACES.length} namespaces.`);
  if (residue.length) {
    console.log(`\nEnglish-residue candidates (REPORT ONLY, review by eye — shared tokens are often correct):`);
    residue.forEach((r) => console.log(`  ${r}`));
  } else {
    console.log('\nEnglish-residue heuristic: no candidates.');
  }
  if (failures) {
    console.error(`\n${failures} FAILURE(S).`);
    process.exit(1);
  }
  console.log('\nAll renders clean.');
}

main();
