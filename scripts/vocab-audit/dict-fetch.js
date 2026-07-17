#!/usr/bin/env node
/* =====================================================================
   dict-fetch.js — put the REAL dictionary in front of a reviewer.

   WHY THIS EXISTS. The operator, 2026-07-17: "even by just googling I can
   easily get the right plural form of any word but you fail again and
   again." He is right, and the reason the previous rounds failed is
   embarrassing: reviewers were told "never invent a citation; if uncertain,
   HOLD", so they wrote "I cannot verify SAOL from memory" and held — 51
   plural + 52 gender HOLDs on Swedish alone. Honest, and useless.

   The obvious fix — "just look it up" — does not work either, because
   MOST OF THE AUTHORITIES CANNOT BE FETCHED (measured 2026-07-17):

     svenska.se (SAOL/SO)  200 but a 21 KB SPA SHELL, zero entry markup
     ordnet.dk (DDO)       202 bot-challenge, empty body
     vandale.nl            503 to curl — and the free dictionary is
                           DISCONTINUED ("Het gratis onlinewoordenboek is
                           gestopt"), so every past brief cited a dead
                           authority
     duden.de              200, full markup  ✔ plain fetch is fine
     naob.no               200, full markup  ✔

   A reviewer told to "cite SAOL" against a JavaScript shell will either
   hold (useless) or hallucinate (worse). So this tool renders the SPA in a
   real browser. Measured, working:

     sv  svenska.se  ->  "gard·in [-i´n] substantiv ~en ~er / gardin
                          gardinen gardiner"   <- the actual SAOL entry
     da  ordnet.dk   ->  renders; the bot-wall does not survive a browser
     it  treccani    ->  renders
     fr  larousse    ->  "rideau n.m."  <- gender straight out of the entry
     pt  priberam    ->  renders
     fi  kielitoimistonsanakirja -> renders (hash-routed SPA)

   USAGE
     node scripts/vocab-audit/dict-fetch.js --locale=sv --word=gardin
     node scripts/vocab-audit/dict-fetch.js --locale=de --word=Vorhang --json
     node scripts/vocab-audit/dict-fetch.js --probe      (check every source)

   It prints the rendered entry text. It NEVER interprets it — the native
   reads it and rules. This tool removes the excuse, not the judgement.
   READ-ONLY. Writes nothing.
   ===================================================================== */
'use strict';

/* mode: 'fetch' = plain HTTP is enough; 'render' = needs a real browser.
   `wait` is extra settle time for SPAs that paint after networkidle.
   `note` records what a reviewer must know about the source's trust. */
const SOURCES = {
  de: [{ name: 'Duden', mode: 'fetch', url: (w) => 'https://www.duden.de/rechtschreibung/' + encodeURIComponent(w),
         note: 'THE authority for German. Read "Genus" + "Pluralform".' }],
  no: [{ name: 'NAOB', mode: 'fetch', url: (w) => 'https://naob.no/ordbok/' + encodeURIComponent(w),
         note: 'Authority for bokmål.' }],
  sv: [{ name: 'SAOL/SO (svenska.se)', mode: 'render', wait: 1500, url: (w) => 'https://svenska.se/tre/?sok=' + encodeURIComponent(w),
         note: 'THE authority. "~en ~er" = utrum (n) + plural -er; "~et ~" = neutrum (t) + zero plural. NOTE n=EN-ord(common), t=ETT-ord(neuter).' }],
  da: [{ name: 'DDO (ordnet.dk)', mode: 'render', wait: 1500, url: (w) => 'https://ordnet.dk/ddo/ordbog?query=' + encodeURIComponent(w),
         note: 'THE authority. Read "bøjning". n=fælleskøn(common), t=intetkøn(neuter).' }],
  it: [{ name: 'Treccani', mode: 'render', wait: 1500, url: (w) => 'https://www.treccani.it/vocabolario/' + encodeURIComponent(w) + '/',
         note: 'Read "s. m." / "s. f.".' }],
  fr: [{ name: 'Larousse', mode: 'render', wait: 1200, url: (w) => 'https://www.larousse.fr/dictionnaires/francais/' + encodeURIComponent(w),
         note: 'Entry prints "n.m." / "n.f." directly.' }],
  pt: [{ name: 'Priberam', mode: 'render', wait: 1500, url: (w) => 'https://dicionario.priberam.org/' + encodeURIComponent(w),
         note: 'BR register is canonical here (§6: pt = Brazilian Portuguese).' }],
  fi: [{ name: 'Kielitoimiston sanakirja', mode: 'render', wait: 2500, url: (w) => 'https://www.kielitoimistonsanakirja.fi/#/' + encodeURIComponent(w),
         note: 'Hash-routed SPA — needs the longer settle. Finnish has NO gender.' }],
  en: [{ name: 'Merriam-Webster', mode: 'render', wait: 1200, url: (w) => 'https://www.merriam-webster.com/dictionary/' + encodeURIComponent(w),
         note: 'English has no gender. Watch the ZERO-PLURALS (fish/sheep/deer/angelfish) — they are countable and OTHER languages do inflect them.' }],

  /* ⚠ UNRESOLVED — surfaced, not papered over. Both need a source decision
     before the nl/es waves run; do not let a reviewer silently fall back to
     a blog or a bare search snippet. */
  nl: [{ name: 'woordenlijst.org (Groene Boekje — OFFICIAL)', mode: 'render', wait: 2500, url: (w) => 'https://woordenlijst.org/zoeken/?q=' + encodeURIComponent(w),
         note: '⚠ SELECTOR UNVERIFIED. Van Dale free is DISCONTINUED, so every earlier nl brief cited a dead authority. The Groene Boekje is the official list for spelling+gender+plural and is the right replacement — but this probe is not yet proven. VERIFY BEFORE THE nl WAVE.' }],
  es: [{ name: 'RAE (dle.rae.es)', mode: 'render', wait: 3000, url: (w) => 'https://dle.rae.es/' + encodeURIComponent(w),
         note: '⚠ RENDERS BUT THE ENTRY DID NOT PARSE in the probe — 2957 chars, no "f."/"m." marker found. Needs a selector/wait fix. VERIFY BEFORE THE es WAVE.' }],
};

/* Always-available cross-check. NOT the authority — a second opinion.
   Two independent Wiktionary editions agreeing is real evidence; one alone
   is not. This is what the sv reviewer fell back to when SAOL 404'd on it,
   and it was the honest call given the block. */
const CROSSCHECK = (loc, w) => ([
  { name: loc + '.wiktionary', url: 'https://' + loc + '.wiktionary.org/wiki/' + encodeURIComponent(w) },
  { name: 'en.wiktionary', url: 'https://en.wiktionary.org/wiki/' + encodeURIComponent(w) },
]);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function viaFetch(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'de,en;q=0.8' } });
  const html = await res.text();
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
  return { status: res.status, text };
}

async function viaRender(url, wait) {
  let puppeteer;
  try { puppeteer = require('puppeteer'); }
  catch (e) { return { status: 0, text: '', err: 'puppeteer unavailable: ' + e.message }; }
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    const p = await b.newPage();
    await p.setUserAgent(UA);
    const r = await p.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    if (wait) await new Promise((res) => setTimeout(res, wait));
    const text = await p.evaluate(() => document.body.innerText);
    return { status: r ? r.status() : 0, text: String(text || '').replace(/\n{3,}/g, '\n\n').trim() };
  } catch (e) { return { status: 0, text: '', err: e.message }; }
  finally { await b.close(); }
}

async function get(src, word) {
  const url = src.url(word);
  const r = src.mode === 'render' ? await viaRender(url, src.wait) : await viaFetch(url);
  return { name: src.name, url, note: src.note || '', status: r.status, err: r.err || null, text: r.text || '' };
}

async function probe() {
  const W = { de: 'Vorhang', no: 'gardin', sv: 'gardin', da: 'gardin', it: 'tenda', fr: 'rideau', pt: 'cortina', fi: 'verho', en: 'curtain', nl: 'gordijn', es: 'cortina' };
  console.log('probing every configured source (a source that cannot be read is a source a reviewer will hallucinate):\n');
  for (const loc of Object.keys(SOURCES)) {
    const r = await get(SOURCES[loc][0], W[loc]);
    const ok = r.text.length > 400 && new RegExp(W[loc], 'i').test(r.text);
    console.log('  ' + loc.padEnd(3) + (ok ? '✅' : '❌') + ' ' + r.name.padEnd(40) + String(r.text.length).padStart(6) + ' chars' + (r.err ? '  ' + r.err.slice(0, 40) : ''));
    if (/⚠/.test(r.note)) console.log('        ' + r.note.split('.')[0] + '.');
  }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--probe')) return probe();
  const g = (n) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.slice(n.length + 3) : null; };
  const loc = g('locale'), word = g('word');
  if (!loc || !word) { console.error('usage: --locale=<xx> --word=<w> [--json] [--crosscheck]  |  --probe'); process.exit(1); }
  if (!SOURCES[loc]) { console.error('FAIL: no source configured for "' + loc + '"'); process.exit(1); }

  const out = [];
  for (const src of SOURCES[loc]) out.push(await get(src, word));
  if (argv.includes('--crosscheck')) {
    for (const c of CROSSCHECK(loc, word)) {
      const r = await viaFetch(c.url);
      out.push({ name: c.name, url: c.url, note: 'CROSS-CHECK ONLY — not the authority.', status: r.status, text: r.text });
    }
  }
  if (argv.includes('--json')) { console.log(JSON.stringify({ locale: loc, word, sources: out }, null, 1)); return; }
  for (const r of out) {
    console.log('\n===== ' + r.name + '  [' + r.status + ']');
    console.log('URL: ' + r.url);
    if (r.note) console.log('NOTE: ' + r.note);
    if (r.err) { console.log('ERROR: ' + r.err); continue; }
    if (!r.text) { console.log('(empty — treat as NOT consulted; do not cite it)'); continue; }
    console.log('-----');
    console.log(r.text.slice(0, 2200));
  }
}
main();
