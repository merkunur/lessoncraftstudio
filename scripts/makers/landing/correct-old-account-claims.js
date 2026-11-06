#!/usr/bin/env node
/**
 * correct-old-account-claims.js — the 363 old maker landings said "no login" and "no account", which stopped being true when
 * the new makers launched: a free account is needed to make worksheets. Operator 2026-11-06: correct the wording in all 11
 * languages, page text and descriptions. Only the account claim goes; what is still true stays ("nothing to install").
 * Titles, slugs and names are never touched: only the fields in FIELDS.
 *
 *   node scripts/makers/landing/correct-old-account-claims.js [--dry-run] [--locales=de,fi]
 *
 * Each rule is a whole clause, longest first, so a bare word such as es "cuenta" (counts) or fr "compte" can never match.
 * Run it once; a second run changes nothing. Afterwards: gates/landings.js --freeze (the operator's change to the baseline).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', '..', 'frontend', 'messages', 'maker-content');
const DRY = process.argv.includes('--dry-run');
const arg = process.argv.find((a) => a.startsWith('--locales='));
const FIELDS = new Set(['metaDescription', 'about', 'tagline', 'howToUse', 'modes']);

const RULES = {
  en: [
    [/There is no account to create and nothing to install/g, 'There is nothing to install'],
    [/with nothing to install and no account to create/g, 'with nothing to install'],
    [/never asks for a login or an install/g, 'never asks for an install'],
    [/with no (?:login|account|sign-in)(?: (?:required|needed))? and nothing to (install|download)/g, 'with nothing to $1'],
    [/with no (?:login|account|sign-in)(?: (?:required|needed))? (?:and no|or) install/g, 'with nothing to install'],
    [/ with no (?:login|account|sign-in)(?: (?:required|needed))?/g, ''],
    [/\bno login, /g, ''],
    [/, no login/g, ''],
  ],
  de: [
    [/ – ganz ohne Anmeldung/g, ''],
    [/– ohne Login, /g, '– '],
    [/benötigt weder Anmeldung noch Installation/g, 'benötigt keine Installation'],
    [/verlangt nie einen Login oder eine Installation/g, 'verlangt nie eine Installation'],
    [/ganz ohne Anmeldung und ohne Download/g, 'ganz ohne Download'],
    [/ohne Installation und ohne Anmeldung/g, 'ohne Installation'],
    [/ohne (?:nötiges Konto|nötigen Login|Anmeldung|Konto|Login) und ohne (Installation|Download)/g, 'ohne $1'],
    [/ohne (?:Anmeldung|Login) oder Installation/g, 'ohne Installation'],
    [/Kostenlos und ohne Anmeldung/g, 'Kostenlos'],
    [/ (?:ganz )?ohne (?:nötiges Konto|Anmeldung|Konto|Login)/g, ''],
    [/Kein Login, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/\bkein Login, /g, ''],
    [/, kein Login/g, ''],
  ],
  fr: [
    [/ Sans inscription\./g, ''],
    [/ — sans inscription, /g, ' — '],
    [/sans rien installer ni aucun compte à créer/g, 'sans rien installer'],
    [/Il n'y a aucun compte à créer ni rien à installer/g, "Il n'y a rien à installer"],
    [/ne demande jamais de connexion ni d'installation/g, "ne demande jamais d'installation"],
    [/sans (?:compte|connexion|inscription) ni (installation|téléchargement)/g, 'sans $1'],
    [/sans compte et gratuitement/g, 'gratuitement'],
    [/Sans inscription, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/,? sans (?:compte requis|compte|connexion|inscription)/g, ''],
  ],
  es: [
    [/Sin registro, 11 idiomas/g, '11 idiomas'],
    [/sin necesidad de (?:cuenta|registro) y sin nada que instalar/g, 'sin nada que instalar'],
    [/sin (?:cuenta|registro) y sin nada que (instalar|descargar)/g, 'sin nada que $1'],
    [/sin (?:cuenta|registro) (?:ni|y sin) instalación/g, 'sin instalación'],
    [/(no requiere|no necesita|nunca pide) registro ni instalación/g, '$1 instalación'],
    [/sin necesidad de crear una cuenta y en cualquiera/g, 'en cualquiera'],
    [/sin iniciar sesión y en 11 idiomas/g, 'en 11 idiomas'],
    [/11 idiomas y sin necesidad de (?:cuenta|iniciar sesión)/g, '11 idiomas'],
    [/sin necesidad de cuenta y con más de/g, 'con más de'],
    [/Sin registro, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/,? sin (?:registro|cuenta)\b/g, ''],
  ],
  pt: [
    [/Sem cadastro, 11 idiomas/g, '11 idiomas'],
    [/sem conta e sem nada para instalar/g, 'sem nada para instalar'],
    [/sem nada para instalar e sem conta para criar/g, 'sem nada para instalar'],
    [/Não há conta para criar nem nada para instalar/g, 'Não há nada para instalar'],
    [/sem login ou instalação/g, 'sem instalação'],
    [/nunca pede login nem instalação/g, 'nunca pede instalação'],
    [/sem (?:conta|login) e é totalmente grátis/g, 'e é totalmente grátis'],
    [/sem (?:conta|login) e totalmente grátis/g, 'e totalmente grátis'],
    [/Sem cadastro, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/,? sem (?:cadastro|conta|login)\b/g, ''],
  ],
  it: [
    [/ Senza registrazione\./g, ''],
    [/non chiede mai un accesso né un'installazione/g, "non chiede mai un'installazione"],
    [/senza (?:account|accesso|registrazione|login) e senza (nulla da installare|nulla da scaricare|installazione)/g, 'senza $1'],
    [/Senza login né installazione/g, 'Senza installazione'],
    [/senza (?:accesso|login) né installazione/g, 'senza installazione'],
    [/senza nulla da installare e senza (?:creare un )?account/g, 'senza nulla da installare'],
    [/senza download e senza (?:creare un account|registrazione)/g, 'senza download'],
    [/senza installazioni e senza account/g, 'senza installazioni'],
    [/senza (?:bisogno di account|accesso) e con oltre/g, 'con oltre'],
    [/,? niente account da creare/g, ''],
    [/Senza registrazione, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/,? senza (?:bisogno di account|registrazione|account|accesso|login)\b/g, ''],
  ],
  nl: [
    [/vraagt nooit om inloggen of iets te installeren/g, 'vraagt nooit om iets te installeren'],
    [/vraagt geen account of installatie/g, 'vraagt geen installatie'],
    [/zonder account of installatie/g, 'zonder installatie'],
    [/zonder (?:account|inloggen) en zonder (iets te installeren|installeren|downloaden|iets te downloaden of te installeren)/g, 'zonder $1'],
    [/zonder inloggen of (iets te installeren|installeren)/g, 'zonder $1'],
    [/(simpel|Snel) en zonder inloggen/g, '$1'],
    [/Geen account, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/ — zonder (?:inloggen|account), /g, ' — '],
    [/,? zonder (?:inloggen|account)\b/g, ''],
  ],
  sv: [
    [/ Ingen inloggning\./g, ''],
    [/Ingen inloggning, 11 språk/g, '11 språk'],
    [/inget konto och inget program behöver laddas ner/g, 'inget program behöver laddas ner'],
    [/ber aldrig om inloggning eller installation/g, 'ber aldrig om installation'],
    [/utan att (?:ett konto behövs|inloggning krävs) och utan något att installera/g, 'utan något att installera'],
    [/utan konto och utan att något behöver installeras/g, 'utan att något behöver installeras'],
    [/utan (?:konto|inloggning) och utan (något att installera|något att ladda ner|installation)/g, 'utan $1'],
    [/utan inloggning eller installation/g, 'utan installation'],
    [/utan konto eller nedladdning/g, 'utan nedladdning'],
    [/ — ingen inloggning, /g, ' — '],
    [/Ingen inloggning, (\p{L})/gu, (m, c) => c.toUpperCase()],
    [/\bingen inloggning, /g, ''],
    [/, ingen inloggning/g, ''],
    [/,? utan (?:att ett konto behövs|konto|inloggning)\b/g, ''],
  ],
  da: [
    [/Der er ingen konto at oprette og intet at installere/g, 'Der er intet at installere'],
    [/beder aldrig om login eller installation/g, 'beder aldrig om installation'],
    [/uden noget at installere og uden konto/g, 'uden noget at installere'],
    [/uden (?:konto|login) og uden noget at (installere|downloade)/g, 'uden noget at $1'],
    [/uden login eller installation/g, 'uden installation'],
    [/uden login og helt gratis/g, 'helt gratis'],
    [/,? uden (?:login|konto)\b/g, ''],
  ],
  no: [
    [/Det er ingen konto å opprette og ingenting å installere/g, 'Det er ingenting å installere'],
    [/spør aldri om innlogging eller installering/g, 'spør aldri om installering'],
    [/uten å installere noe og uten konto/g, 'uten å installere noe'],
    [/uten at det trengs konto og uten å installere noe/g, 'uten å installere noe'],
    [/uten (?:konto|innlogging) og uten å (installere|laste ned) noe/g, 'uten å $1 noe'],
    [/uten innlogging (?:eller|og uten) installering/g, 'uten installering'],
    [/uten konto og uten installering/g, 'uten installering'],
    [/ — uten innlogging, /g, ' — '],
    [/,? uten (?:at det trengs konto|innlogging|konto)\b/g, ''],
  ],
  fi: [
    [/eikä mitään tarvitse asentaa eikä tiliä tarvitse luoda/g, 'eikä mitään tarvitse asentaa'],
    [/Tiliä ei tarvitse luoda eikä mitään asentaa/g, 'Mitään ei tarvitse asentaa'],
    [/ilman tiliä eikä mitään tarvitse asentaa/g, 'eikä mitään tarvitse asentaa'],
    [/ilman tarvetta tilille tai asennukselle/g, 'ilman asennusta'],
    [/ilman asennusta ja ilman tiliä/g, 'ilman asennusta'],
    [/ilman (?:tiliä|kirjautumista) ja ilman (asennusta|lataamista)/g, 'ilman $1'],
    [/ilman kirjautumista tai asennusta/g, 'ilman asennusta'],
    [/eikä se vaadi kirjautumista tai (asennusta|lataamista)/g, 'eikä se vaadi $1'],
    [/eikä koskaan pyydä kirjautumista tai asennusta/g, 'eikä koskaan pyydä asennusta'],
    [/\bei kirjautumista, /g, ''],
    [/, ei kirjautumista/g, ''],
    [/,? ilman (?:kirjautumista|tiliä)(?![\p{L}])/gu, ''],
  ],
};

function fix(text, rules) {
  let out = text;
  for (const [re, to] of rules) out = out.replace(re, to);
  // a clause removed at the end of a sentence or list leaves its comma behind
  return out.replace(/,\./g, '.').replace(/,,/g, ',');
}
function walk(v, rules, seen) {
  if (typeof v === 'string') {
    const out = fix(v, rules);
    if (out !== v) seen.push([v, out]);
    return out;
  }
  if (Array.isArray(v)) return v.map((x) => walk(x, rules, seen));
  if (v && typeof v === 'object') { for (const k of Object.keys(v)) v[k] = walk(v[k], rules, seen); }
  return v;
}

const only = arg ? arg.slice('--locales='.length).split(',') : Object.keys(RULES);
for (const loc of only) {
  const file = path.join(DIR, `${loc}.json`);
  const raw = fs.readFileSync(file, 'utf8');
  const j = JSON.parse(raw);
  const seen = [];
  for (const id of Object.keys(j)) {
    const m = j[id];
    if (!m || typeof m !== 'object' || id === 'labels') continue;
    for (const f of Object.keys(m)) if (FIELDS.has(f)) m[f] = walk(m[f], RULES[loc], seen);
  }
  console.log(`${loc}: ${seen.length} strings changed`);
  if (process.argv.includes('--show')) for (const [a, b] of seen) console.log(`  - ${a}\n  + ${b}`);
  if (!DRY && seen.length) fs.writeFileSync(file, JSON.stringify(j, null, 2) + (raw.endsWith('\n') ? '\n' : ''));
}
