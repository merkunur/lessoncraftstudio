#!/usr/bin/env node
/**
 * harvest-suggest.js — per-locale Google-autocomplete long-tail keyword harvest.
 *
 * Queries the public suggest endpoint (client=firefox) with per-market hl/gl,
 * seeded from topics-taxonomy.json (exercise types, themes, educational levels,
 * subjects) crossed with a per-locale demand lexicon (worksheet nouns, free/print
 * qualifiers, grade terms, online terms) plus alphabet expansion on the core nouns.
 *
 * Output: docs/SEO/harvests/<locale>.json  (UTF-8, committed as research evidence)
 *   { locale, market, generatedAt, requestCount, seeds: {...}, suggestions: {seed: [..]},
 *     unique: [ ... all distinct suggestion strings ... ] }
 *
 * Usage:
 *   node scripts/seo-research/harvest-suggest.js --locale=de [--out=docs/SEO/harvests] [--delay=180] [--limit=N]
 *   node scripts/seo-research/harvest-suggest.js --all
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const TAXONOMY = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));

// hl = interface/suggestion language, gl = market. Registers per CLAUDE.md §6:
// es = Mexican Spanish, pt = Brazilian Portuguese, no = bokmål.
const MARKETS = {
  en: { hl: 'en', gl: 'us' },
  de: { hl: 'de', gl: 'de' },
  fr: { hl: 'fr', gl: 'fr' },
  es: { hl: 'es', gl: 'mx' },
  pt: { hl: 'pt', gl: 'br' },
  it: { hl: 'it', gl: 'it' },
  nl: { hl: 'nl', gl: 'nl' },
  sv: { hl: 'sv', gl: 'se' },
  da: { hl: 'da', gl: 'dk' },
  no: { hl: 'no', gl: 'no' },
  fi: { hl: 'fi', gl: 'fi' },
};

// Per-locale demand lexicon. Core worksheet nouns get alphabet expansion;
// qualifiers/grade/online terms cross with taxonomy names.
// Sources: locked rekey patterns (scripts/seo-landing/rekey-*-titles.js),
// demand-map-{de,es,fr,nl}.md, hub title patterns (subject-hub.ts LOCALE_TEMPLATES).
const LEXICON = {
  en: {
    nouns: ['worksheets', 'printable worksheets', 'worksheets for kindergarten', 'worksheets for kids'],
    qualifiers: ['worksheets', 'worksheets free', 'worksheets printable', 'worksheets pdf', 'printable', 'free printable'],
    grades: ['preschool', 'kindergarten', 'first grade', '1st grade', '2nd grade'],
    gradeSeeds: ['worksheets for', 'free worksheets for', 'math worksheets for'],
    online: ['online games for', 'online practice', 'interactive worksheets'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  },
  de: {
    nouns: ['arbeitsblätter', 'übungsblätter', 'arbeitsblätter kostenlos', 'arbeitsblätter zum ausdrucken'],
    qualifiers: ['arbeitsblätter', 'arbeitsblätter kostenlos', 'arbeitsblatt', 'übungen', 'zum ausdrucken'],
    grades: ['vorschule', 'kindergarten', 'klasse 1', 'klasse 2', '1. klasse', '2. klasse'],
    gradeSeeds: ['arbeitsblätter mathe', 'arbeitsblätter deutsch', 'übungen mathe'],
    online: ['online übungen', 'übungen online', 'lernspiele online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzäöü'.split(''),
  },
  fr: {
    nouns: ['fiches à imprimer', 'fiches maternelle', 'exercices à imprimer', 'fiches d’exercices'],
    qualifiers: ['fiche', 'exercices', 'à imprimer', 'exercices pdf', 'gratuit'],
    grades: ['maternelle', 'grande section', 'cp', 'ce1', 'ce2'],
    gradeSeeds: ['exercices maths', 'fiches maternelle', 'exercices français'],
    online: ['exercices en ligne', 'jeux éducatifs en ligne'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzéè'.split(''),
  },
  es: {
    nouns: ['fichas para imprimir', 'actividades para imprimir', 'ejercicios para imprimir', 'hojas de trabajo'],
    qualifiers: ['fichas', 'actividades', 'ejercicios', 'para imprimir', 'para niños', 'pdf'],
    grades: ['preescolar', 'kínder', 'primer grado', 'segundo grado', 'primaria'],
    gradeSeeds: ['ejercicios de matemáticas', 'actividades para', 'fichas de'],
    online: ['juegos en línea', 'ejercicios interactivos', 'actividades en línea'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzñ'.split(''),
  },
  pt: {
    nouns: ['atividades para imprimir', 'atividades de alfabetização', 'atividades educativas', 'exercícios para imprimir'],
    qualifiers: ['atividades', 'atividades para imprimir', 'exercícios', 'para imprimir', 'grátis', 'pdf'],
    grades: ['educação infantil', 'pré-escola', '1º ano', '2º ano', 'anos iniciais'],
    gradeSeeds: ['atividades de matemática', 'atividades de português', 'exercícios de'],
    online: ['jogos online', 'atividades online', 'exercícios online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzçã'.split(''),
  },
  it: {
    nouns: ['schede didattiche', 'schede da stampare', 'esercizi da stampare', 'schede didattiche da stampare'],
    qualifiers: ['schede', 'schede didattiche', 'esercizi', 'da stampare', 'gratis', 'pdf'],
    grades: ['scuola dell’infanzia', 'classe prima', 'classe seconda', 'prima elementare'],
    gradeSeeds: ['schede di matematica', 'esercizi di matematica', 'schede di italiano'],
    online: ['esercizi online', 'giochi didattici online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  },
  nl: {
    nouns: ['werkbladen', 'werkbladen printen', 'oefenbladen', 'werkbladen gratis'],
    qualifiers: ['werkbladen', 'werkblad', 'oefenen', 'printen', 'gratis', 'pdf'],
    grades: ['kleuters', 'groep 1', 'groep 2', 'groep 3', 'groep 4'],
    gradeSeeds: ['werkbladen rekenen', 'werkbladen taal', 'oefenen met'],
    online: ['online oefenen', 'educatieve spelletjes online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  },
  sv: {
    nouns: ['arbetsblad', 'arbetsblad att skriva ut', 'övningsblad', 'arbetsblad gratis'],
    qualifiers: ['arbetsblad', 'övningar', 'skriva ut', 'gratis', 'pdf'],
    grades: ['förskola', 'förskoleklass', 'åk 1', 'åk 2', 'årskurs 1'],
    gradeSeeds: ['matteuppgifter', 'arbetsblad matematik', 'övningar svenska'],
    online: ['matte online', 'övningar online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzåäö'.split(''),
  },
  da: {
    nouns: ['opgaver til print', 'opgaveark', 'gratis opgaver', 'opgaver til børn'],
    qualifiers: ['opgaver', 'opgaveark', 'til print', 'gratis', 'pdf'],
    grades: ['børnehave', 'børnehaveklasse', '0. klasse', '1. klasse', '2. klasse'],
    gradeSeeds: ['matematikopgaver', 'danskopgaver', 'opgaver til'],
    online: ['opgaver online', 'matematik online'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzæøå'.split(''),
  },
  no: {
    nouns: ['oppgaver til utskrift', 'arbeidsark', 'gratis oppgaver', 'oppgaver for barn'],
    qualifiers: ['oppgaver', 'arbeidsark', 'til utskrift', 'gratis', 'pdf'],
    grades: ['barnehage', 'skolestartere', '1. trinn', '2. trinn'],
    gradeSeeds: ['matteoppgaver', 'norskoppgaver', 'oppgaver for'],
    online: ['oppgaver på nett', 'matte på nett'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzæøå'.split(''),
  },
  fi: {
    nouns: ['tulostettavat tehtävät', 'tehtäviä lapsille', 'tulostettavia tehtäviä', 'tehtävämonisteet'],
    qualifiers: ['tehtäviä', 'tehtävät', 'tulostettava', 'ilmaiseksi', 'pdf'],
    grades: ['esiopetus', 'eskari', '1. luokka', '2. luokka', 'alkuopetus'],
    gradeSeeds: ['matematiikan tehtävät', 'äidinkielen tehtävät', 'tehtäviä'],
    online: ['tehtäviä netissä', 'oppimispelit netissä'],
    alphabet: 'abcdefghijklmnopqrstuvwxyzäö'.split(''),
  },
};

function argVal(name, dflt) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : dflt;
}
const hasFlag = (name) => process.argv.includes(`--${name}`);

function suggestUrl(market, q) {
  return (
    'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8' +
    `&hl=${market.hl}&gl=${market.gl}&q=${encodeURIComponent(q)}`
  );
}

function fetchJson(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: timeoutMs, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function buildSeeds(locale) {
  const lex = LEXICON[locale];
  const seeds = { core: [], types: [], typeGrade: [], themes: [], subjects: [], online: [], alphabet: [] };
  const name = (entry) => (entry && entry.name && entry.name[locale] ? String(entry.name[locale]).toLowerCase() : null);

  // 1. Core worksheet nouns, bare + alphabet expansion on the FIRST two nouns.
  for (const n of lex.nouns) seeds.core.push(n);
  for (const n of lex.nouns.slice(0, 2)) for (const ch of lex.alphabet) seeds.alphabet.push(`${n} ${ch}`);

  // 2. Exercise types × top qualifiers (bare type, type+main noun, type+print qualifier).
  const types = TAXONOMY.axes['exercise-type'];
  for (const key of Object.keys(types)) {
    const n = name(types[key]);
    if (!n) continue;
    seeds.types.push(n);
    seeds.types.push(`${n} ${lex.qualifiers[0]}`);
    if (lex.qualifiers[3]) seeds.types.push(`${n} ${lex.qualifiers[3]}`);
  }

  // 3. Exercise type × grade (the dominant class).
  for (const key of Object.keys(types)) {
    const n = name(types[key]);
    if (!n) continue;
    for (const g of lex.grades) seeds.typeGrade.push(`${n} ${g}`);
  }

  // 4. Themes × main noun (seasonal + evergreen theme demand).
  const themes = TAXONOMY.axes.theme;
  for (const key of Object.keys(themes)) {
    const n = name(themes[key]);
    if (!n) continue;
    // skip BW variants (localized end-markers per §20.5) — not a search surface
    if (/\b(bw|sw|bn|mv|nb|zw|sh|pb|sv)$/i.test(n) && key.endsWith('_bw')) continue;
    seeds.themes.push(`${n} ${lex.qualifiers[0]}`);
  }

  // 5. Subject × grade seeds + subject-noun expansions.
  const subjects = TAXONOMY.subjects || {};
  for (const key of Object.keys(subjects)) {
    const n = name(subjects[key]);
    if (!n) continue;
    for (const g of lex.grades) seeds.subjects.push(`${n} ${g} ${lex.qualifiers[0]}`);
  }
  for (const gs of lex.gradeSeeds) for (const g of lex.grades) seeds.subjects.push(`${gs} ${g}`);

  // 6. Online/interactive class.
  for (const o of lex.online) {
    seeds.online.push(o);
    for (const g of lex.grades.slice(0, 3)) seeds.online.push(`${o} ${g}`);
  }

  return seeds;
}

async function harvestLocale(locale, opts) {
  const market = MARKETS[locale];
  const seedsByClass = buildSeeds(locale);
  const flat = [];
  for (const [cls, arr] of Object.entries(seedsByClass)) for (const s of arr) flat.push({ cls, seed: s });
  const limited = opts.limit ? flat.slice(0, opts.limit) : flat;

  console.log(`[${locale}] ${limited.length} seed requests (market ${market.hl}/${market.gl})`);
  const suggestions = {};
  const errors = [];
  let done = 0;
  for (const { cls, seed } of limited) {
    try {
      const json = await fetchJson(suggestUrl(market, seed));
      const list = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
      if (list.length) suggestions[seed] = { cls, s: list };
    } catch (e) {
      errors.push({ seed, err: String(e.message || e) });
      if (errors.length > 40) {
        console.error(`[${locale}] too many errors — aborting locale (likely rate-limited)`);
        break;
      }
      await sleep(1500); // back off on error
    }
    done += 1;
    if (done % 100 === 0) console.log(`[${locale}] ${done}/${limited.length}`);
    await sleep(opts.delay);
  }

  const unique = new Set();
  for (const v of Object.values(suggestions)) for (const s of v.s) unique.add(s.toLowerCase());

  const out = {
    locale,
    market,
    generatedAt: new Date().toISOString(),
    requestCount: done,
    seedCounts: Object.fromEntries(Object.entries(seedsByClass).map(([k, v]) => [k, v.length])),
    errorCount: errors.length,
    errors: errors.slice(0, 20),
    suggestions,
    unique: [...unique].sort(),
  };
  const outDir = opts.outDir;
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${locale}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1), 'utf8');
  console.log(`[${locale}] wrote ${file} — ${unique.size} unique suggestions from ${Object.keys(suggestions).length} productive seeds (${errors.length} errors)`);
  return out;
}

(async () => {
  const outDir = path.resolve(ROOT, argVal('out', path.join('docs', 'SEO', 'harvests')));
  const delay = Number(argVal('delay', '180'));
  const limit = Number(argVal('limit', '0')) || 0;
  const locales = hasFlag('all') ? Object.keys(MARKETS) : [argVal('locale', null)].filter(Boolean);
  if (!locales.length) {
    console.error('Usage: node harvest-suggest.js --locale=<loc> | --all  [--delay=180] [--limit=N] [--out=dir]');
    process.exit(1);
  }
  for (const loc of locales) {
    if (!MARKETS[loc] || !LEXICON[loc]) {
      console.error(`Unknown locale ${loc}`);
      continue;
    }
    await harvestLocale(loc, { outDir, delay, limit });
  }
})();
