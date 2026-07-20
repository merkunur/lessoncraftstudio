#!/usr/bin/env node
/**
 * harvest-demand.js — DEMAND-FIRST Google-autocomplete harvest.
 *
 * Companion to harvest-suggest.js, which is INVENTORY-LED: every one of its seeds
 * is derived from our own taxonomy (`TAXONOMY.axes['exercise-type']`, `.theme`,
 * `.subjects`). That means it can only ever discover demand for things we already
 * built, and a zero-result for anything else is not evidence of absence — it was
 * simply never probed. That bias is the likely root cause of known mismatches such
 * as 152 `grid-match` decks against ~zero measured demand, and of `morning work`,
 * `sight words`, `number bonds`, `letter a` and `bundle` never appearing in the
 * corpus at all.
 *
 * This script seeds from what K-3 teachers and parents actually SEARCH — skill
 * vocabulary, classroom-context vocabulary, enumerated instances (per letter, per
 * number) and pack/bundle intent — independent of what the catalogue contains.
 *
 * NON-DESTRUCTIVE. Writes to docs/SEO/harvests/demand/<locale>.json. The existing
 * docs/SEO/harvests/<locale>.json files are read for comparison but never modified,
 * so the inventory-led corpus stays intact for diffing.
 *
 * Output adds a `newVsInventory` block quantifying how much demand the
 * inventory-led harvest missed — that number is the justification for this script.
 *
 * Usage:
 *   node scripts/seo-research/harvest-demand.js --locale=en [--delay=180] [--limit=N]
 *   node scripts/seo-research/harvest-demand.js --all
 *   node scripts/seo-research/harvest-demand.js --locale=en --dry-run   # print seeds, fetch nothing
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const INVENTORY_DIR = path.join(ROOT, 'docs', 'SEO', 'harvests');
const TAXONOMY_THEMES = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));

// hl = suggestion language, gl = market. Registers per CLAUDE.md §6:
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

/**
 * Demand-first seed lexicon.
 *
 * `skills`    — pedagogical skill names as searched, NOT as our axes name them.
 *               Self-anchoring: "sight words", "tiokamrater" are unambiguous alone.
 * `contexts`  — classroom / situation vocabulary (morning work, centers, sub plans…).
 * `audience`  — market-switching qualifiers. `esl` and its equivalents return a
 *               SERP with zero shared domains, i.e. a genuinely different market.
 * `anchors`   — REQUIRED domain anchors crossed with `contexts` and `audience`.
 *               Those two classes are ambiguous when probed bare: "morning work"
 *               autocompletes to "morning workout routine", and "esl" to "eslöv"
 *               (a Swedish town) and "eslint". Anchoring to the domain noun is what
 *               makes them usable, so `contexts`/`audience` are NEVER probed bare.
 * `enumerate` — templates for per-instance pages; `{L}` expands over `letters`,
 *               `{N}` over `numbers`. Enumerated instances are a confirmed
 *               SERP-splitting axis in English; NOT in Swedish (see `enumerate: []`).
 * `packs`     — bundle / pack intent.
 * `letters` / `numbers` — expansion domains for `enumerate`.
 *
 * Locales marked RESEARCH-PENDING carry a conservative starter set only; they are
 * filled in from the in-flight native modifier research before the real run.
 */
const DEMAND = {
  en: {
    skills: [
      'sight words', 'cvc words', 'word families', 'blends and digraphs', 'rhyming words',
      'beginning sounds', 'ending sounds', 'middle sounds', 'syllables', 'letter recognition',
      'number recognition', 'number bonds', 'missing addend', 'counting to 20', 'skip counting',
      'addition to 10', 'addition to 20', 'subtraction to 10', 'place value', 'tens and ones',
      'telling time', 'measurement', '2d shapes', '3d shapes', 'patterns', 'sorting', 'graphing',
      'tracing letters', 'tracing numbers', 'handwriting practice', 'fine motor', 'scissor skills',
      'hidden objects', 'missing parts', 'secret code math',
    ],
    contexts: [
      'morning work', 'literacy centers', 'math centers', 'small group activities',
      'homeschool', 'sub plans', 'back to school', 'summer review', 'busy work', 'no prep',
    ],
    audience: ['esl', 'special education', 'speech therapy', 'autism'],
    anchors: ['worksheets', 'kindergarten'],
    crossAnchors: ['math', 'counting', 'addition', 'letters', 'alphabet'],
    enumerate: ['letter {L} worksheets', 'number {N} worksheets', 'letter {L} activities'],
    packs: ['worksheet bundle', 'printable pack', 'activity pack', 'worksheet packet'],
    letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    numbers: Array.from({ length: 20 }, (_, i) => String(i + 1)),
  },
  de: {
    skills: [
      'silben', 'anlaute', 'reimwörter', 'buchstaben erkennen', 'lesen lernen', 'schreiben lernen',
      'zahlenraum bis 10', 'zahlenraum bis 20', 'zahlzerlegung', 'verliebte zahlen',
      'zahlen schreiben', 'mengen erfassen', 'uhrzeit lernen', 'geometrische formen',
      'muster fortsetzen', 'schwungübungen', 'feinmotorik', 'konzentration',
    ],
    contexts: ['freiarbeit', 'stationenlernen', 'wochenplan', 'hausaufgaben', 'vertretungsstunde', 'lernwerkstatt'],
    audience: ['daz', 'daf', 'förderschule', 'inklusion'],
    anchors: ['arbeitsblätter', 'grundschule'],
    crossAnchors: ['mathe', 'zählen', 'rechnen', 'buchstaben', 'silben'],
    enumerate: ['buchstabe {L} arbeitsblatt', 'zahl {N} arbeitsblatt'],
    packs: ['arbeitsblätter paket', 'übungsheft', 'lernpaket'],
    letters: 'abcdefghijklmnopqrstuvwxyzäöü'.split(''),
    numbers: Array.from({ length: 20 }, (_, i) => String(i + 1)),
  },
  nl: {
    skills: [
      'letters leren', 'klanken', 'rijmwoorden', 'lettergrepen', 'beginklank', 'mkm woorden',
      'getalbegrip', 'splitsen tot 10', 'sommen tot 10', 'sommen tot 20', 'tellen tot 20',
      'klokkijken', 'meten', 'vormen', 'patronen', 'schrijfpatronen', 'fijne motoriek',
      'letterkennis', 'auditieve synthese', 'auditieve analyse', 'hakken en plakken',
      'woordrijtjes', 'flitswoorden', 'erbij sommen', 'eraf sommen', 'getallenlijn',
      'cijfers schrijven', 'ruimtelijke oriëntatie', 'visuele discriminatie',
      // Veilig Leren Lezen structural axis — native, absent from any English-designed
      // taxonomy. The full method runs to kern 12, not 6.
      'kern 1', 'kern 2', 'kern 3', 'kern 4', 'kern 5', 'kern 6',
      'kern 7', 'kern 8', 'kern 9', 'kern 10', 'kern 11', 'kern 12',
      // Flanders is a separate lexicon, not a dialect — these are the only forms
      // that reach it (gl=be returns byte-identical results to gl=nl).
      'werkblaadjes', 'kleuterklas', 'leerjaar 1', 'leerjaar 2',
    ],
    contexts: ['zelfstandig werken', 'weektaak', 'huiswerk', 'hoeken', 'extra oefenen'],
    audience: ['nt2', 'dyslexie', 'speciaal onderwijs'],
    anchors: ['werkbladen', 'groep 3'],
    crossAnchors: ['rekenen', 'tellen', 'letters', 'lezen'],
    // Flanders is a separate lexicon, not a dialect — reachable only via these forms
    enumerate: ['letter {L} werkblad', 'werkblaadjes leerjaar {N}'],
    packs: ['werkbladen pakket', 'oefenboekje'],
    letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    numbers: ['1', '2', '3', '4', '5', '6'],
  },
  sv: {
    skills: [
      'bokstäver', 'ljuda', 'rimord', 'stavelser', 'första ljudet', 'läsförståelse',
      'taluppfattning', 'tiokamrater', 'addition upp till 10', 'subtraktion upp till 10',
      'räkna till 20', 'klockan', 'mätning', 'geometriska former', 'mönster', 'finmotorik',
      'bokstavsljud', 'ljudning', 'ordbilder', 'läsförståelse åk 1', 'skrivstil',
      'talraden', 'tiotal och ental', 'subtraktion upp till 20', 'talkamrater',
      'positionssystemet', 'klockan hel och halv', 'symmetri',
      'sortera och klassificera', 'öga-hand-koordination',
    ],
    contexts: ['eget arbete', 'läxa', 'stationer', 'extra träning'],
    audience: ['sva', 'svenska som andraspråk', 'särskola'],
    anchors: ['arbetsblad', 'förskoleklass'],
    crossAnchors: ['matte', 'räkna', 'bokstäver'],
    // Per-letter pages do NOT split the SERP in Swedish — the opposite of English.
    enumerate: [],
    packs: ['arbetsblad paket', 'övningshäfte'],
    letters: [],
    numbers: [],
  },

  // ---- RESEARCH-PENDING: conservative starter sets, replaced from the in-flight
  //      native modifier study before the production run. Do not treat a zero
  //      result from these as evidence of absence (that is the exact mistake this
  //      script exists to correct).
  es: { skills: ['silabario', 'sílabas ma me mi mo mu', 'caligrafía', 'pauta montessori', 'cuadrícula', 'lectoescritura primer grado', 'lectoescritura', 'sílabas', 'conciencia fonológica', 'sumas hasta 10', 'restas hasta 10', 'grafomotricidad', 'la hora', 'figuras geométricas'], contexts: ['tarea', 'rincones', 'refuerzo'], audience: ['necesidades especiales'], anchors: ['fichas', 'preescolar'], crossAnchors: ['matemáticas', 'contar', 'sumas', 'letras'], enumerate: ['letra {L} fichas'], packs: ['cuadernillo'], letters: 'abcdefghijklmnopqrstuvwxyz'.split(''), numbers: [] },
  fr: {
    skills: [
      // native structural axes: the school year is officially split into périodes
      // by zones de vacances, and "coloriage magique" is a parallel genre with
      // 0/10 SERP overlap against plain worksheet queries — the cleanest split found.
      'coloriage magique', 'période 1', 'période 2', 'période 3', 'période 4', 'période 5',
      'graphème', 'phonème', 'sons complexes', 'avec corrigé',
      'phonologie', 'syllabes', 'graphisme', 'écriture cursive', 'lecture cp',
      'confusion b d', 'mots outils', 'dictée muette', 'alphabet majuscule',
      'additions jusqu’à 10', 'compléments à 10', 'décomposition des nombres',
      'soustractions jusqu’à 10', 'les nombres jusqu’à 20', 'numération cp', 'dénombrement',
      'lire l’heure', 'formes géométriques', 'suites logiques', 'discrimination visuelle',
      'repérage dans l’espace', 'motricité fine', 'découpage collage',
    ],
    contexts: ['ateliers', 'devoirs', 'remédiation', 'rituels', 'plan de travail'],
    audience: ['fle', 'dys', 'ulis'],
    anchors: ['fiches', 'maternelle'],
    crossAnchors: ['maths', 'compter', 'additions', 'lettres'],
    enumerate: ['lettre {L} fiche'],
    packs: ['cahier d’exercices', 'fichier'],
    letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    numbers: [],
  },
  it: {
    skills: [
      // "suoni difficili" is a native ladder with ~25 coordinates and no English
      // analogue; corsivo/stampatello is a 4-value script axis.
      'suoni difficili', 'gn gli', 'sce sci', 'cia cio ciu', 'que qui quo', 'cqu',
      'mp mb', 'doppie', 'apostrofo', 'accento',
      'corsivo', 'stampatello', 'pregrafismo', 'sillabe', 'sillabe piane',
      'lettura sillabica', 'prelettura', 'discriminazione visiva',
      'addizioni entro il 10', 'sottrazioni entro il 10', 'numeri fino a 20',
      'decine e unità', 'linea dei numeri', 'confronto di numeri', 'seriazione',
      'orologio', 'forme geometriche', 'ritmi e sequenze',
      'attenzione e concentrazione', 'coordinazione oculo-manuale',
    ],
    contexts: ['compiti', 'laboratorio', 'recupero', 'compiti delle vacanze'],
    audience: ['dsa', 'italiano l2', 'bes'],
    anchors: ['schede didattiche', 'prima elementare'],
    crossAnchors: ['matematica', 'contare', 'addizioni', 'lettere'],
    enumerate: ['lettera {L} schede'],
    packs: ['quaderno operativo', 'schedario'],
    letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    numbers: [],
  },
  pt: { skills: ['pré-silábico', 'silábico', 'silábico-alfabético', 'alfabético', 'psicogênese', 'sondagem de escrita', 'alfabetização', 'sílabas', 'consciência fonológica', 'adição até 10', 'numerais até 20', 'traçado', 'horas', 'formas geométricas'], contexts: ['tarefa de casa', 'reforço', 'sondagem'], audience: ['educação especial'], anchors: ['atividades', 'educação infantil'], crossAnchors: ['matemática', 'contar', 'adição', 'letras'], enumerate: ['letra {L} atividades'], packs: ['apostila'], letters: 'abcdefghijklmnopqrstuvwxyz'.split(''), numbers: [] },
  da: {
    skills: [
      // 'de 120 ord' is the canonical Danish sight-word list; 'sværhedsgrader' is a
      // difficulty axis running PARALLEL to grade; 'bevægelse' worksheets are
      // curriculum-mandated. Danish is also NOT portal-owned — 13+ free sites rank.
      'de 120 ord', 'sværhedsgrader', 'bevægelse',
      'bogstaver', 'bogstavlyde', 'lydering', 'lydrette ord', 'ordbilleder',
      'rim', 'stavelser', 'læseraketten', 'begyndende læsning',
      'tal til 20', 'tallinje', 'plus til 10', 'tiervenner', 'plus og minus',
      'titalssystemet', 'klokken', 'klokken hel og halv',
      'geometriske former', 'spejling', 'sortering', 'finmotorik', 'mønstre',
    ],
    contexts: ['lektier', 'stationer', 'ekstra træning', 'vikartimer'],
    audience: ['dsa', 'specialundervisning'],
    anchors: ['opgaver', 'børnehaveklasse'],
    crossAnchors: ['matematik', 'tælle', 'bogstaver'],
    // Danish COMPOUNDS the theme into the noun — "julematematik", never
    // "matematik med jul". A spaced {theme} {anchor} probe structurally cannot
    // find Danish theme demand, so single-word themes are also probed joined.
    crossCompound: true,
    enumerate: [],
    packs: ['opgavehæfte'],
    letters: [],
    numbers: [],
  },
  no: {
    skills: [
      'de 120 ordene', 'lesebestilling',
      'bokstaver', 'bokstavlyder', 'lydering', 'lydrette ord', 'ordbilder',
      'rim', 'stavelser', 'begynnende lesing',
      'tall til 20', 'tallinje', 'pluss til 10', 'tiervenner', 'pluss og minus til 20',
      'tiere og enere', 'klokka', 'klokka hel og halv',
      'geometriske former', 'speiling', 'sortering', 'finmotorikk', 'mønster',
      'øye-hånd-koordinasjon',
    ],
    contexts: ['lekser', 'stasjoner', 'ekstra trening', 'vikartimer'],
    audience: ['norsk som andrespråk', 'spesialundervisning'],
    anchors: ['oppgaver', '1. trinn'],
    crossAnchors: ['matte', 'telle', 'bokstaver'],
    crossCompound: true, // Norwegian compounds like Danish (juleoppgaver)
    enumerate: [],
    packs: ['oppgavehefte'],
    letters: [],
    numbers: [],
  },
  fi: {
    skills: [
      // 'tavutetut tehtävät' — worksheets whose own instruction text is
      // pre-syllabified as a reading accommodation. A RENDERING VARIANT of every
      // worksheet rather than a topic; no English equivalent exists.
      'tavutetut tehtävät', 'tavutettu teksti',
      'kirjaimet', 'kirjainten tunnistus', 'äänteet', 'äännetietoisuus',
      'tavutus', 'riimit', 'sanahahmot', 'alkava lukutaito',
      'luvut 20 asti', 'lukujono', 'yhteenlasku 10 asti', 'kymmenylitys',
      'kymmenjärjestelmä', 'kellonajat', 'geometriset muodot',
      'sarjoittaminen', 'hienomotoriikka', 'silmä-käsi-koordinaatio',
      'esiopetuksen tehtävät', 'alkuopetus',
    ],
    contexts: ['läksyt', 'pistetyöskentely', 'lisäharjoitus', 'sijaisen tunti'],
    audience: ['s2', 'erityisopetus'],
    anchors: ['tehtäviä', 'esiopetus'],
    crossAnchors: ['matematiikka', 'laskeminen', 'kirjaimet'],
    crossCompound: true, // Finnish compounds too (joulutehtäviä)
    enumerate: [],
    packs: ['tehtävävihko'],
    letters: [],
    numbers: [],
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

/**
 * Theme names from the taxonomy, localized, minus the black-and-white variants
 * (a print-format flag, not a search entity). Using the taxonomy here is NOT the
 * inventory-led mistake: we are not assuming these themes have demand, we are
 * probing to find out — and a theme that comes back empty is a real finding.
 */
function themeNames(locale) {
  const themes = (TAXONOMY_THEMES && TAXONOMY_THEMES.axes && TAXONOMY_THEMES.axes.theme) || {};
  const out = [];
  for (const key of Object.keys(themes)) {
    if (key.endsWith('_bw')) continue;
    let n = themes[key] && themes[key].name && themes[key].name[locale];
    if (!n) continue;
    // §20.5: trailing numbers on theme names are asset-library bookkeeping
    // ("Birds 2"), never a search entity — strip before probing.
    n = String(n).toLowerCase().replace(/\s+\d+$/, '').trim();
    if (n) out.push(n);
  }
  return [...new Set(out)];
}

/**
 * Autocomplete reinterprets ambiguous seeds: "accessories math" returns
 * "mathews accessories" (an archery brand) and "4th of july addition" returns
 * "4th of july edition". A suggestion only counts as evidence for a seed if it
 * actually contains every token of that seed.
 */
/**
 * Education-context signals, per locale. Needed because COMPOUND cross probes are
 * ambiguous in exactly the languages that compound: Norwegian `matte` means both
 * "maths" and "mat/rug", so `strandmatte` returns "strandmatte bambus" (a beach
 * mat) and `campingmatte` returns "campingmatte aufblasbar". A compound
 * suggestion therefore only counts as demand if something else in it is a school
 * signal — "julmatte åk 1" and "påskematematik 1 klasse" survive, the rugs do not.
 *
 * Spaced cross probes do not need this: their seed already contains the skill
 * anchor as a separate token, and the all-tokens-present rule filters them.
 */
const EDU_SIGNALS = {
  en: ['worksheet', 'worksheets', 'kindergarten', 'preschool', 'grade', 'printable', 'free', 'pdf', 'activities'],
  de: ['arbeitsblatt', 'arbeitsblätter', 'klasse', 'grundschule', 'vorschule', 'kostenlos', 'ausdrucken', 'übungen'],
  nl: ['werkblad', 'werkbladen', 'groep', 'kleuters', 'gratis', 'printen', 'oefenen', 'leerjaar'],
  sv: ['åk', 'årskurs', 'klass', 'förskoleklass', 'förskola', 'gratis', 'arbetsblad', 'skriva', 'ut', 'elever'],
  da: ['klasse', 'indskoling', 'mellemtrin', 'børnehaveklasse', 'gratis', 'opgaver', 'opgaveark', 'print', 'elever', 'undervisning'],
  no: ['trinn', 'klasse', 'barnehage', 'gratis', 'oppgaver', 'arbeidsark', 'utskrift', 'elever', 'undervisning'],
  fi: ['luokka', 'luokan', 'luokalle', 'esiopetus', 'tehtäviä', 'tehtävät', 'tulostettava', 'ilmainen', 'oppilaat'],
  es: ['ficha', 'fichas', 'preescolar', 'primaria', 'grado', 'imprimir', 'gratis', 'pdf'],
  fr: ['fiche', 'fiches', 'maternelle', 'cp', 'ce1', 'imprimer', 'gratuit', 'exercices'],
  it: ['schede', 'scheda', 'classe', 'elementare', 'infanzia', 'stampare', 'gratis', 'esercizi'],
  pt: ['atividades', 'atividade', 'ano', 'infantil', 'imprimir', 'grátis', 'pdf', 'exercícios'],
};

function isCompoundSeed(seed) {
  return !/\s/.test(String(seed).trim());
}

function hasEduSignal(locale, seed, suggestion) {
  const sig = EDU_SIGNALS[locale] || [];
  const seedToks = new Set(String(seed).toLowerCase().split(/\s+/));
  const toks = String(suggestion).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean);
  return toks.some((t) => !seedToks.has(t) && sig.includes(t));
}

function suggestionMatchesSeed(seed, suggestion) {
  const st = new Set(
    String(suggestion).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean),
  );
  const seedToks = String(seed).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean);
  return seedToks.every((t) => st.has(t));
}

/**
 * Every localized exercise-type NAME, probed bare and with the locale's domain
 * anchor. This is the decisive experiment for "does anyone search what we call
 * this?" — and it is recorded with empties (deadSeeds), so a name that comes back
 * silent is distinguishable from one that was never asked about.
 *
 * harvest-suggest.js cannot answer this: it only stores seeds that RETURNED
 * something, so its silence is ambiguous. That ambiguity is exactly what made
 * Dutch "Aftrekken" look unsearched when the truth is that Google suppresses the
 * term (slang sense) while real demand thrives under "aftreksommen"/"minsommen".
 */
function typeNameSeeds(locale, anchors) {
  const types = (TAXONOMY_THEMES && TAXONOMY_THEMES.axes && TAXONOMY_THEMES.axes['exercise-type']) || {};
  const out = [];
  for (const key of Object.keys(types)) {
    const n = types[key] && types[key].name && types[key].name[locale];
    if (!n) continue;
    const name = String(n).toLowerCase().trim();
    out.push(name);
    if (anchors && anchors[0]) out.push(`${name} ${anchors[0]}`);
  }
  return [...new Set(out)];
}

function buildDemandSeeds(locale) {
  const d = DEMAND[locale];
  const seeds = { skill: [], context: [], audience: [], enumerated: [], pack: [], cross: [], typeName: [] };
  seeds.typeName = typeNameSeeds(locale, d.anchors);

  // theme x skill-anchor — the combination the research found splits the SERP
  // hardest (0/10 result overlap between themes) and which NEITHER existing
  // harvest ever probed. Without this class there is no evidence whether
  // "dinosaur addition worksheets" is a real query or an invention.
  if (d.crossAnchors && d.crossAnchors.length) {
    for (const th of themeNames(locale)) {
      for (const a of d.crossAnchors) {
        seeds.cross.push(`${th} ${a}`);
        // Scandinavian and Finnish compound the theme INTO the noun
        // ("julematematik", never "matematik med jul"), so the spaced probe above
        // structurally cannot find their theme demand. Only single-word themes
        // compound cleanly, so multi-word themes are left to the spaced form.
        if (d.crossCompound && !/\s/.test(th) && !/\s/.test(a)) seeds.cross.push(`${th}${a}`);
      }
    }
  }
  for (const s of d.skills) seeds.skill.push(s);
  // contexts/audience are ambiguous bare ("morning work" -> "morning workout";
  // "esl" -> "eslöv", "eslint") — always cross them with a domain anchor.
  const anchors = d.anchors && d.anchors.length ? d.anchors : [];
  for (const c of d.contexts) for (const a of anchors) seeds.context.push(`${c} ${a}`);
  for (const au of d.audience) for (const a of anchors) seeds.audience.push(`${au} ${a}`);
  for (const p of d.packs) seeds.pack.push(p);
  for (const tpl of d.enumerate) {
    if (tpl.includes('{L}')) for (const ch of d.letters) seeds.enumerated.push(tpl.replace('{L}', ch));
    if (tpl.includes('{N}')) for (const n of d.numbers) seeds.enumerated.push(tpl.replace('{N}', n));
  }
  return seeds;
}

/** Unique suggestion strings already present in the inventory-led harvest. */
function loadInventoryUnique(locale) {
  const f = path.join(INVENTORY_DIR, `${locale}.json`);
  if (!fs.existsSync(f)) return new Set();
  try {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    return new Set((j.unique || []).map((s) => String(s).toLowerCase()));
  } catch {
    return new Set();
  }
}

async function harvestLocale(locale, opts) {
  const market = MARKETS[locale];
  const seedsByClass = buildDemandSeeds(locale);
  const flat = [];
  for (const [cls, arr] of Object.entries(seedsByClass)) for (const s of arr) flat.push({ cls, seed: s });
  const limited = opts.limit ? flat.slice(0, opts.limit) : flat;

  if (opts.dryRun) {
    console.log(`[${locale}] DRY RUN — ${limited.length} demand seeds (market ${market.hl}/${market.gl})`);
    for (const [cls, arr] of Object.entries(seedsByClass)) {
      console.log(`  ${cls.padEnd(11)} ${String(arr.length).padStart(4)}  e.g. ${arr.slice(0, 3).join(' | ')}`);
    }
    return null;
  }

  console.log(`[${locale}] ${limited.length} demand-seed requests (market ${market.hl}/${market.gl})`);
  const suggestions = {};
  const errors = [];
  let done = 0;
  for (const { cls, seed } of limited) {
    try {
      const json = await fetchJson(suggestUrl(market, seed));
      let list = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
      // `cross` seeds combine two independent words, so autocomplete frequently
      // reinterprets them into an unrelated entity. Keep only suggestions that
      // genuinely contain the seed — otherwise a dead combination looks alive.
      if (cls === 'cross') {
        list = list.filter((s) => suggestionMatchesSeed(seed, s));
        // compound seeds are ambiguous in compounding languages (no 'matte' =
        // maths AND rug) -> require an explicit school signal.
        if (isCompoundSeed(seed)) list = list.filter((s) => hasEduSignal(locale, seed, s));
      }
      // An EMPTY result is a finding, not a failure — record it so a dead term is
      // distinguishable from a term that was never probed.
      suggestions[seed] = { cls, s: list };
    } catch (e) {
      errors.push({ seed, err: String(e.message || e) });
      if (errors.length > 40) {
        console.error(`[${locale}] too many errors — aborting locale (likely rate-limited)`);
        break;
      }
      await sleep(1500);
    }
    done += 1;
    if (done % 50 === 0) console.log(`[${locale}] ${done}/${limited.length}`);
    await sleep(opts.delay);
  }

  const unique = new Set();
  for (const v of Object.values(suggestions)) for (const s of v.s) unique.add(s.toLowerCase());

  const inventory = loadInventoryUnique(locale);
  const novel = [...unique].filter((s) => !inventory.has(s)).sort();
  const deadSeeds = Object.entries(suggestions).filter(([, v]) => v.s.length === 0).map(([k]) => k);

  const out = {
    locale,
    market,
    generatedAt: new Date().toISOString(),
    method: 'demand-first seeds (skill / context / audience / enumerated / pack) — NOT taxonomy-derived',
    requestCount: done,
    seedCounts: Object.fromEntries(Object.entries(seedsByClass).map(([k, v]) => [k, v.length])),
    errorCount: errors.length,
    errors: errors.slice(0, 20),
    newVsInventory: {
      inventoryUnique: inventory.size,
      demandUnique: unique.size,
      novel: novel.length,
      novelShare: unique.size ? Number((novel.length / unique.size).toFixed(3)) : 0,
    },
    deadSeeds,
    suggestions,
    unique: [...unique].sort(),
    novel,
  };

  const outDir = opts.outDir;
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${locale}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1), 'utf8');
  console.log(
    `[${locale}] wrote ${file} — ${unique.size} unique, ${novel.length} NOVEL vs inventory harvest ` +
    `(${Math.round(100 * out.newVsInventory.novelShare)}%), ${deadSeeds.length} dead seeds, ${errors.length} errors`,
  );
  return out;
}

/**
 * Re-apply the cross-class suggestion filter to an already-harvested file and
 * recompute the derived fields. Lets a filter fix be applied without re-fetching
 * thousands of queries.
 */
function refilterLocale(locale, outDir) {
  const file = path.join(outDir, `${locale}.json`);
  if (!fs.existsSync(file)) {
    console.log(`[${locale}] no harvest file — skipped`);
    return;
  }
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  let dropped = 0;
  for (const [seed, v] of Object.entries(j.suggestions || {})) {
    if (v.cls !== 'cross') continue;
    const before = v.s.length;
    v.s = v.s.filter((s) => suggestionMatchesSeed(seed, s));
    if (isCompoundSeed(seed)) v.s = v.s.filter((s) => hasEduSignal(locale, seed, s));
    dropped += before - v.s.length;
  }
  const unique = new Set();
  for (const v of Object.values(j.suggestions || {})) for (const s of v.s) unique.add(String(s).toLowerCase());
  const inventory = loadInventoryUnique(locale);
  j.unique = [...unique].sort();
  j.novel = j.unique.filter((s) => !inventory.has(s));
  j.deadSeeds = Object.entries(j.suggestions || {}).filter(([, v]) => v.s.length === 0).map(([k]) => k);
  j.newVsInventory = {
    inventoryUnique: inventory.size,
    demandUnique: unique.size,
    novel: j.novel.length,
    novelShare: unique.size ? Number((j.novel.length / unique.size).toFixed(3)) : 0,
  };
  j.refilteredAt = new Date().toISOString();
  fs.writeFileSync(file, JSON.stringify(j, null, 1), 'utf8');
  console.log(`[${locale}] refiltered — dropped ${dropped} mismatched cross suggestions | ${unique.size} unique | ${j.deadSeeds.length} dead seeds`);
}

(async () => {
  const outDir = path.resolve(ROOT, argVal('out', path.join('docs', 'SEO', 'harvests', 'demand')));
  const delay = Number(argVal('delay', '180'));
  const limit = Number(argVal('limit', '0')) || 0;
  const dryRun = hasFlag('dry-run');
  const locales = hasFlag('all') ? Object.keys(MARKETS) : [argVal('locale', null)].filter(Boolean);
  if (!locales.length) {
    console.error('Usage: node harvest-demand.js --locale=<loc> | --all  [--delay=180] [--limit=N] [--dry-run] [--refilter]');
    process.exit(1);
  }
  if (hasFlag('refilter')) {
    for (const loc of locales) refilterLocale(loc, outDir);
    return;
  }
  for (const loc of locales) {
    if (!MARKETS[loc] || !DEMAND[loc]) {
      console.error(`Unknown locale ${loc}`);
      continue;
    }
    await harvestLocale(loc, { outDir, delay, limit, dryRun });
  }
})();
