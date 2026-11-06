#!/usr/bin/env node
/**
 * list-landing-urls.js — every maker landing URL, one per line, from the compiled copy (the same source the route reads).
 *
 *   node scripts/makers/landing/list-landing-urls.js                 print the URLs
 *   node scripts/makers/landing/list-landing-urls.js --hubs          add the eleven hubs
 *   node scripts/makers/landing/list-landing-urls.js --indexnow      submit them to IndexNow in batches of 500
 *
 * A count other than the catalogue's pairs stops the run: a short list would quietly leave pages out.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DIR = path.join(ROOT, 'frontend', 'content', 'maker-landings');
const ORIGIN = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const EXPECTED = 647;

const urls = [];
for (const loc of LOCALES) {
  const copy = JSON.parse(fs.readFileSync(path.join(DIR, `copy.${loc}.json`), 'utf8'));
  for (const id of Object.keys(copy)) urls.push(`${ORIGIN}/${loc}/worksheet-makers/${copy[id].slug}`);
}
if (urls.length !== EXPECTED) {
  console.error(`Expected ${EXPECTED} landings, found ${urls.length}.`);
  process.exit(1);
}
if (new Set(urls).size !== urls.length) {
  console.error('Two landings share a URL.');
  process.exit(1);
}
if (process.argv.includes('--hubs') || process.argv.includes('--indexnow')) {
  for (const loc of LOCALES) urls.push(`${ORIGIN}/${loc}/worksheet-makers`);
}

if (process.argv.includes('--indexnow')) {
  const script = path.join(ROOT, 'scripts', 'indexnow-submit.js');
  for (let i = 0; i < urls.length; i += 500) {
    process.stdout.write(execFileSync(process.execPath, [script, ...urls.slice(i, i + 500)], { encoding: 'utf8' }));
  }
} else {
  console.log(urls.join('\n'));
}
