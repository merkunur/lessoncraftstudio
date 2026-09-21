#!/usr/bin/env node
/**
 * harvest-candidates.js — SEEDED Google-autocomplete harvest for CANDIDATE worksheet
 * genres that the catalogue does not carry yet.
 *
 * Why it exists: harvest-suggest.js is INVENTORY-led (seeds = taxonomy keys) and
 * harvest-demand.js seeds from a fixed lexicon, so a NOVEL genre head (e.g. "Lückentext",
 * "tangram", "Mülltrennung") was never probed — a zero in those files is not evidence of
 * absence (measured 2026-09-21 for the nt10-D selection: 0 hits for every candidate head
 * in docs/SEO/harvests/de.json and en.json). This script takes an explicit per-locale
 * seed file and crosses every head with the locale's worksheet noun, print qualifier and
 * grade words, using the same public suggest endpoint and per-market hl/gl as
 * harvest-suggest.js (es = MX, pt = BR, no = bokmål).
 *
 * NON-DESTRUCTIVE: writes only to --out (default docs/worksheet-gen/b4-designs/_records/).
 *
 * Usage:
 *   node scripts/seo-research/harvest-candidates.js --seeds=<file.json> --locale=de [--delay=180] [--limit=N] [--out=dir]
 *   node scripts/seo-research/harvest-candidates.js --seeds=<file.json> --all
 *   node scripts/seo-research/harvest-candidates.js --seeds=<file.json> --locale=de --dry-run   # print seeds, fetch nothing
 *
 * Output per locale: <out>/harvest-candidates.<locale>.json
 *   { locale, market, generatedAt, requestCount, errorCount,
 *     perCandidate: { <candidate>: { heads:[..], requests:N, productiveSeeds:N, unique:N, suggestions:[..] } },
 *     suggestions: { <seed>: { candidate, s:[..] } } }
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');

const MARKETS = {
  en: { hl: 'en', gl: 'us' }, de: { hl: 'de', gl: 'de' }, fr: { hl: 'fr', gl: 'fr' }, es: { hl: 'es', gl: 'mx' },
  pt: { hl: 'pt', gl: 'br' }, it: { hl: 'it', gl: 'it' }, nl: { hl: 'nl', gl: 'nl' }, sv: { hl: 'sv', gl: 'se' },
  da: { hl: 'da', gl: 'dk' }, no: { hl: 'no', gl: 'no' }, fi: { hl: 'fi', gl: 'fi' },
};

// The cross terms per locale: worksheet noun, print qualifier, grade words (same lexicon family as
// harvest-suggest.js; kept short so a 13-candidate seed file stays under ~150 requests per locale).
const CROSS = {
  en: { noun: 'worksheets', print: 'printable', grades: ['kindergarten', '1st grade', '2nd grade', '3rd grade'] },
  de: { noun: 'arbeitsblatt', print: 'zum ausdrucken', grades: ['grundschule', 'klasse 1', 'klasse 2', 'klasse 3'] },
  fr: { noun: 'fiche', print: 'à imprimer', grades: ['maternelle', 'cp', 'ce1', 'ce2'] },
  es: { noun: 'ficha', print: 'para imprimir', grades: ['preescolar', 'primer grado', 'segundo grado', 'primaria'] },
  pt: { noun: 'atividade', print: 'para imprimir', grades: ['educação infantil', '1º ano', '2º ano', '3º ano'] },
  it: { noun: 'scheda didattica', print: 'da stampare', grades: ['scuola primaria', 'classe prima', 'classe seconda', 'classe terza'] },
  nl: { noun: 'werkblad', print: 'printen', grades: ['kleuters', 'groep 3', 'groep 4', 'groep 5'] },
  sv: { noun: 'arbetsblad', print: 'skriva ut', grades: ['förskoleklass', 'åk 1', 'åk 2', 'åk 3'] },
  da: { noun: 'opgaver', print: 'til print', grades: ['børnehaveklasse', '1. klasse', '2. klasse', '3. klasse'] },
  no: { noun: 'oppgaver', print: 'til utskrift', grades: ['1. trinn', '2. trinn', '3. trinn', '4. trinn'] },
  fi: { noun: 'tehtäviä', print: 'tulostettava', grades: ['esikoulu', '1. luokka', '2. luokka', '3. luokka'] },
};

function argVal(name, dflt) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : dflt;
}
const hasFlag = (name) => process.argv.includes(`--${name}`);

function suggestUrl(market, q) {
  return 'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8' +
    `&hl=${market.hl}&gl=${market.gl}&q=${encodeURIComponent(q)}`;
}

function fetchJson(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: timeoutMs, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (e) { reject(e); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function buildSeeds(locale, seedFile) {
  const cross = CROSS[locale];
  const heads = seedFile.heads[locale];
  if (!heads) throw new Error(`seed file has no heads for ${locale}`);
  const out = [];
  for (const candidate of seedFile.candidates) {
    const hs = heads[candidate] || [];
    if (!hs.length) throw new Error(`seed file: ${locale}/${candidate} has no heads`);
    for (const h of hs) {
      const set = new Set([h, `${h} ${cross.noun}`, `${h} ${cross.print}`, ...cross.grades.map((g) => `${h} ${g}`)]);
      for (const s of set) out.push({ candidate, head: h, seed: s });
    }
  }
  return out;
}

async function harvestLocale(locale, seedFile, opts) {
  const market = MARKETS[locale];
  const seeds = buildSeeds(locale, seedFile);
  const limited = opts.limit ? seeds.slice(0, opts.limit) : seeds;
  if (opts.dryRun) {
    console.log(`[${locale}] ${limited.length} seeds (dry-run):`);
    for (const s of limited) console.log(`  ${s.candidate}\t${s.seed}`);
    return null;
  }
  console.log(`[${locale}] ${limited.length} seed requests (market ${market.hl}/${market.gl})`);
  const suggestions = {};
  const errors = [];
  let done = 0;
  for (const { candidate, seed } of limited) {
    try {
      const json = await fetchJson(suggestUrl(market, seed));
      const list = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
      if (list.length) suggestions[seed] = { candidate, s: list };
    } catch (e) {
      errors.push({ seed, err: String(e.message || e) });
      if (errors.length > 40) { console.error(`[${locale}] too many errors — aborting locale (likely rate-limited)`); break; }
      await sleep(1500);
    }
    done += 1;
    if (done % 50 === 0) console.log(`[${locale}] ${done}/${limited.length}`);
    await sleep(opts.delay);
  }
  const perCandidate = {};
  for (const candidate of seedFile.candidates) {
    const mine = limited.filter((x) => x.candidate === candidate);
    const uniq = new Set();
    let productive = 0;
    for (const { seed } of mine) {
      const v = suggestions[seed];
      if (!v) continue;
      productive += 1;
      for (const s of v.s) uniq.add(String(s).toLowerCase());
    }
    perCandidate[candidate] = {
      heads: seedFile.heads[locale][candidate], requests: mine.length, productiveSeeds: productive,
      unique: uniq.size, suggestions: [...uniq].sort(),
    };
  }
  const out = {
    locale, market, generatedAt: new Date().toISOString(), seedFile: path.relative(ROOT, opts.seedPath).replace(/\\/g, '/'),
    requestCount: done, errorCount: errors.length, errors: errors.slice(0, 20), perCandidate, suggestions,
  };
  fs.mkdirSync(opts.outDir, { recursive: true });
  const file = path.join(opts.outDir, `harvest-candidates.${locale}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1), 'utf8');
  const summary = seedFile.candidates.map((c) => `${c}=${perCandidate[c].unique}`).join(' ');
  console.log(`[${locale}] wrote ${path.relative(ROOT, file)} — ${summary} (${errors.length} errors)`);
  return out;
}

(async () => {
  const seedPath = path.resolve(ROOT, argVal('seeds', 'docs/worksheet-gen/b4-designs/_records/candidate-seeds.json'));
  const outDir = path.resolve(ROOT, argVal('out', path.dirname(path.relative(ROOT, seedPath))));
  const delay = Number(argVal('delay', '180'));
  const limit = Number(argVal('limit', '0')) || 0;
  const dryRun = hasFlag('dry-run');
  const locales = hasFlag('all') ? Object.keys(MARKETS) : [argVal('locale', null)].filter(Boolean);
  if (!locales.length || !fs.existsSync(seedPath)) {
    console.error('Usage: node harvest-candidates.js --seeds=<file.json> (--locale=<loc> | --all) [--delay=180] [--limit=N] [--out=dir] [--dry-run]');
    process.exit(1);
  }
  const seedFile = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  for (const loc of locales) {
    if (!MARKETS[loc] || !CROSS[loc]) { console.error(`Unknown locale ${loc}`); continue; }
    await harvestLocale(loc, seedFile, { outDir, delay, limit, dryRun, seedPath });
  }
})();
