#!/usr/bin/env node
/**
 * apply-workspace-i18n.js — merge the native panels' patches into the message files.
 *
 * A patch is a flat map of dotted keys -> the native string, produced by one native
 * panel per locale. This script is the only thing that writes to messages/*.json, and it
 * refuses a patch rather than half-applying it. Refusal conditions:
 *
 *   1. a key that does not exist in en.json (a patch may repair, never invent)
 *   2. an ICU argument present in the English that is missing from the translation,
 *      or a translation that no longer parses as ICU
 *   3. a value byte-identical to the English one, unless allowlisted for a stated reason
 *   4. a value that is not a non-empty string
 *
 * Placeholder comparison uses the real ICU parser, not a regex: a regex over `{` also
 * matches the prose inside a plural branch (`{No decks}` -> `{No`) and reports a
 * placeholder loss that never happened.
 *
 * Usage:
 *   node scripts/i18n/apply-workspace-i18n.js --patch-dir <dir> [--locales a,b] [--apply]
 * Without --apply it reports what it would do and writes nothing.
 */
const fs = require('fs');
const path = require('path');
const { parse } = require('@formatjs/icu-messageformat-parser');

const MESSAGES_DIR = path.join(__dirname, '..', '..', 'messages');
const ALL_LOCALES = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Values that are legitimately identical to English. Each entry names WHY — sorted by what
 * the word means in that language, never by whether it makes the run go green.
 */
const IDENTICAL_OK = [
  { locale: 'fr', key: 'workspace.tabs.collections', why: '"Collections" is the French word; its tab-strip siblings are bare nouns.' },
  { locale: 'de', key: 'workspace.dialog.nameLabel', why: '"Name" is the German word.' },
  { locale: 'de', key: 'collections.create.nameLabel', why: '"Name" is the German word.' },
];

function arg(node, out) {
  // Collect every ICU argument name reachable from a parsed AST.
  if (Array.isArray(node)) return node.forEach((n) => arg(n, out));
  if (!node || typeof node !== 'object') return;
  if (node.value && node.type !== 0 /* not literal text */) out.add(node.value);
  if (node.options) for (const k of Object.keys(node.options)) arg(node.options[k].value, out);
  if (node.children) arg(node.children, out);
}

function icuArgs(message) {
  const out = new Set();
  arg(parse(message), out); // throws on malformed ICU — that is the point
  return out;
}

function getIn(obj, dotted) {
  return dotted.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
}

function setIn(obj, dotted, value) {
  const parts = dotted.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
  cur[parts[parts.length - 1]] = value;
}

function main() {
  const args = process.argv.slice(2);
  const patchDir = args[args.indexOf('--patch-dir') + 1];
  const apply = args.includes('--apply');
  const only = args.includes('--locales') ? args[args.indexOf('--locales') + 1].split(',') : ALL_LOCALES;
  if (!patchDir || args.indexOf('--patch-dir') === -1) {
    console.error('usage: apply-workspace-i18n.js --patch-dir <dir> [--locales a,b] [--apply]');
    process.exit(2);
  }

  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf8'));
  let hadError = false;
  let appliedTotal = 0;

  for (const locale of only) {
    const patchPath = path.join(patchDir, `${locale}.json`);
    if (!fs.existsSync(patchPath)) {
      console.error(`[FAIL] ${locale}: no patch at ${patchPath}`);
      hadError = true;
      continue;
    }
    const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
    const targetPath = path.join(MESSAGES_DIR, `${locale}.json`);
    const original = fs.readFileSync(targetPath, 'utf8');
    // Preserve the file's own line endings. Rewriting them turns a one-string edit into a
    // whole-file diff, and on this repo (core.autocrlf=true) a stray `git checkout` is
    // enough to leave one message file on CRLF while its siblings are LF.
    const eol = original.includes('\r\n') ? '\r\n' : '\n';
    const target = JSON.parse(original);
    const problems = [];

    for (const key of Object.keys(patch)) {
      const source = getIn(en, key);
      const value = patch[key];

      if (typeof source !== 'string') {
        problems.push(`${key}: not a string key in en.json (a patch may repair, never invent)`);
        continue;
      }
      if (typeof value !== 'string' || value.trim() === '') {
        problems.push(`${key}: empty or non-string translation`);
        continue;
      }
      if (getIn(target, key) === undefined) {
        problems.push(`${key}: key path absent from ${locale}.json`);
        continue;
      }

      let srcArgs;
      let dstArgs;
      try {
        srcArgs = icuArgs(source);
      } catch (e) {
        problems.push(`${key}: EN source itself is not valid ICU (${e.message})`);
        continue;
      }
      try {
        dstArgs = icuArgs(value);
      } catch (e) {
        problems.push(`${key}: translation is not valid ICU (${e.message})`);
        continue;
      }
      const lost = [...srcArgs].filter((a) => !dstArgs.has(a));
      if (lost.length) {
        problems.push(`${key}: lost ICU argument(s) {${lost.join('}, {')}}`);
        continue;
      }

      if (value === source) {
        const ok = IDENTICAL_OK.find((e) => e.locale === locale && e.key === key);
        if (!ok) {
          problems.push(`${key}: still byte-identical to English`);
          continue;
        }
      }
    }

    if (problems.length) {
      console.error(`[FAIL] ${locale}: ${problems.length} problem(s), patch NOT applied`);
      problems.forEach((p) => console.error(`         ${p}`));
      hadError = true;
      continue;
    }

    let changed = 0;
    for (const key of Object.keys(patch)) {
      if (getIn(target, key) !== patch[key]) {
        setIn(target, key, patch[key]);
        changed++;
      }
    }
    appliedTotal += changed;
    console.log(`[ ok ] ${locale}: ${Object.keys(patch).length} validated, ${changed} changed${apply ? '' : ' (dry-run)'}`);

    if (apply && changed) {
      // Two-space indent + trailing newline, matching every messages/*.json on disk.
      const body = JSON.stringify(target, null, 2) + '\n';
      fs.writeFileSync(targetPath, eol === '\r\n' ? body.replace(/\n/g, '\r\n') : body, 'utf8');
    }
  }

  console.log(`\n${apply ? 'Applied' : 'Would apply'} ${appliedTotal} strings across ${only.length} locales.`);
  if (hadError) process.exit(1);
}

main();
