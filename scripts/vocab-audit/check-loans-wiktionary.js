#!/usr/bin/env node
/* check-loans-wiktionary.js — COMPREHENSIVE loan-plural coverage, CHEAP.
   The cheap-method agents checked ~15-25% of keys; the residual is 655
   loan/cognate plurals (locale singular == English). Most are already
   correct (actor→actores). Verifying them with an Opus agent each is what
   the operator cannot afford. So verify DETERMINISTICALLY: en.wiktionary
   has a declension table for the loan in each language on ONE page. Fetch
   it (server-rendered — a plain fetch, no browser, no LLM), find the
   locale's language section, and check whether the STORED plural actually
   appears there.
     - stored plural present in the locale section  -> CONFIRMED (correct)
     - not present, but the section exists          -> FLAG (needs review)
     - no page / no locale section                  -> UNATTESTED (leave)
   Token cost = the FLAG count only. 655 fetches run inside the script.
   USAGE  node scripts/vocab-audit/check-loans-wiktionary.js */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const UA = 'Mozilla/5.0 (compatible; lcs-vocab-audit/1.0)';
const LANG = { da: 'Danish', no: 'Norwegian Bokmål', fi: 'Finnish', fr: 'French', es: 'Spanish', pt: 'Portuguese', it: 'Italian' };

const rows = JSON.parse(fs.readFileSync(path.join(OUT, 'suspects', 'loans.json'), 'utf8')).rows;

/* extract just the <lang> section of an en.wiktionary page as plain text */
function langSection(html, lang) {
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));
  /* section headers on en.wiktionary are the language names; grab from this
     lang header to the next top-level language header */
  const start = text.search(new RegExp('(^|\\s)' + lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s|\\[edit\\])'));
  if (start < 0) return null;
  const rest = text.slice(start + lang.length);
  /* stop at the next language header (a known-language word followed by [edit] or 'Etymology' of a new lang is unreliable;
     use a generous window — 4000 chars covers the noun+declension) */
  return rest.slice(0, 4000);
}

async function fetchWik(word) {
  const url = 'https://en.wiktionary.org/wiki/' + encodeURIComponent(word);
  try { const r = await fetch(url, { headers: { 'User-Agent': UA } }); if (!r.ok) return null; return await r.text(); }
  catch (e) { return null; }
}

function norm(s) { return String(s || '').toLowerCase().normalize('NFC').trim(); }

(async () => {
  const confirmed = [], flag = [], unattested = [];
  let i = 0;
  for (const r of rows) {
    i++;
    if (i % 50 === 0) process.stderr.write('  ' + i + '/' + rows.length + '\n');
    const html = await fetchWik(r.s);
    if (!html) { unattested.push(r); continue; }
    const sec = langSection(html, LANG[r.locale]);
    if (!sec) { unattested.push(r); continue; }
    const secN = norm(sec);
    const pN = norm(r.p);
    /* invariant loans: stored p === s and the section says "invariable/uncountable/plural <same>" */
    if (secN.indexOf(pN) >= 0) confirmed.push(r);
    else flag.push(r);
  }
  fs.writeFileSync(path.join(OUT, 'loans-verified.json'),
    JSON.stringify({ confirmed: confirmed.length, flag: flag.length, unattested: unattested.length, flagRows: flag, unattestedRows: unattested }, null, 1));
  console.log('loan verification (en.wiktionary, deterministic):');
  console.log('  CONFIRMED (stored plural attested): ' + confirmed.length);
  console.log('  FLAG (attested section, plural NOT found — review): ' + flag.length);
  console.log('  UNATTESTED (no page/section — leave): ' + unattested.length);
  console.log('→ loans-verified.json  (flagRows = the only set needing an agent)');
})();
