#!/usr/bin/env node
/**
 * harvest-maker-landings.js — Google-autocomplete demand harvest for the worksheet MAKER landings
 * (/<loc>/worksheet-makers/<slug>), so their titles are born keyword-correct (CLAUDE.md §22.4).
 *
 * Seeds per maker and locale: the maker's native name split into its topic parts, crossed with that locale's maker
 * nouns ("worksheet generator", "Arbeitsblatt erstellen", …) in both word orders, plus the bare topic with the
 * locale's worksheet noun. Same public endpoint and per-market hl/gl as harvest-candidates.js (es = MX, pt = BR).
 *
 *   node scripts/seo-research/harvest-maker-landings.js [--locales=en,de] [--delay=160]
 *
 * Output: docs/SEO/maker-landing-demand/harvest.<loc>.json   { <maker>: { <seed>: [suggestions…] } }
 * NON-DESTRUCTIVE: writes only there. A locale already harvested is skipped unless --force.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'maker-landing-demand');

const MARKETS = {
  en: { hl: 'en', gl: 'us' }, de: { hl: 'de', gl: 'de' }, fr: { hl: 'fr', gl: 'fr' }, es: { hl: 'es', gl: 'mx' },
  pt: { hl: 'pt', gl: 'br' }, it: { hl: 'it', gl: 'it' }, nl: { hl: 'nl', gl: 'nl' }, sv: { hl: 'sv', gl: 'se' },
  da: { hl: 'da', gl: 'dk' }, no: { hl: 'no', gl: 'no' }, fi: { hl: 'fi', gl: 'fi' },
};

// what a teacher types to MAKE a sheet (after = "<topic> <word>", before = "<word> <topic>"), and the plain sheet noun
const HEADS = {
  en: { after: ['worksheet maker', 'worksheet generator', 'worksheets'], before: ['make', 'create'] },
  de: { after: ['arbeitsblatt erstellen', 'arbeitsblatt generator', 'arbeitsblätter'], before: ['arbeitsblatt'] },
  fr: { after: ['générateur', 'fiche à imprimer'], before: ['générateur de', 'fiche', 'créer fiche'] },
  es: { after: ['generador', 'fichas', 'hojas de trabajo'], before: ['generador de', 'crear fichas de'] },
  pt: { after: ['gerador', 'atividades'], before: ['gerador de', 'criar atividades de', 'atividades de'] },
  it: { after: ['generatore', 'schede'], before: ['generatore di', 'schede', 'creare schede'] },
  nl: { after: ['werkblad maken', 'werkbladen', 'generator'], before: ['werkblad'] },
  sv: { after: ['arbetsblad', 'skapa arbetsblad', 'generator'], before: ['arbetsblad', 'skapa'] },
  da: { after: ['opgaver', 'arbejdsark', 'generator'], before: ['lav', 'opgaver'] },
  no: { after: ['oppgaver', 'arbeidsark', 'generator'], before: ['lag', 'oppgaver'] },
  fi: { after: ['tehtävät', 'tehtäviä', 'generaattori', 'tulostettava'], before: ['tee'] },
};

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const FORCE = process.argv.includes('--force');
const DELAY = Number(arg('delay', '160'));
const LOCALES = (arg('locales', Object.keys(MARKETS).join(','))).split(',');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (e) { reject(e); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

/** "Number Bonds & Fact Families" → ["number bonds", "fact families"]; split on & / and-words / commas */
function topicParts(name) {
  return name.toLowerCase()
    .split(/\s*(?:&|,|\/|\band\b|\bund\b|\bet\b|\by\b|\be\b|\ben\b|\boch\b|\bog\b|\bja\b)\s*/)
    .map((s) => s.trim()).filter((s) => s.length > 2);
}

async function harvest(locale) {
  const file = path.join(OUT, `harvest.${locale}.json`);
  if (fs.existsSync(file) && !FORCE) { console.log(`[${locale}] already harvested`); return; }
  const market = MARKETS[locale];
  const names = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'messages', 'makers', `${locale}.json`), 'utf8')).makers;
  const heads = HEADS[locale];
  const result = {};
  let requests = 0, errors = 0;
  for (const [maker, name] of Object.entries(names)) {
    result[maker] = {};
    for (const part of topicParts(name)) {
      const seeds = new Set([...heads.after.map((h) => `${part} ${h}`), ...heads.before.map((h) => `${h} ${part}`)]);
      for (const seed of seeds) {
        const url = 'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8'
          + `&hl=${market.hl}&gl=${market.gl}&q=${encodeURIComponent(seed)}`;
        try {
          const json = await fetchJson(url);
          const list = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
          if (list.length) result[maker][seed] = list;
        } catch (e) {
          errors += 1;
          if (errors > 40) { console.error(`[${locale}] too many errors, stopping`); break; }
          await sleep(1500);
        }
        requests += 1;
        await sleep(DELAY);
      }
    }
  }
  fs.writeFileSync(file, JSON.stringify(result, null, 1));
  console.log(`[${locale}] ${requests} requests, ${errors} errors`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const l of LOCALES) await harvest(l);
})().catch((e) => { console.error(e); process.exit(1); });
