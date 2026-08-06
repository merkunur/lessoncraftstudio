#!/usr/bin/env node
/**
 * Deep Cross-Locale Redirect Audit
 *
 * Analyzes the blog cross-locale redirect configuration against the DB slug dump.
 * Checks for:
 *   1. Config vs DB nativeLocale mismatches
 *   2. Missing slugs (in DB but not in config)
 *   3. Extra slugs (in config but not in DB)
 *   4. Language detection mismatches (slug language != nativeLocale)
 *
 * Usage: node scripts/deep-redirect-audit.js
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 1. Load data sources
// ---------------------------------------------------------------------------

const configPath = path.resolve(__dirname, '..', 'frontend', 'config', 'blog-cross-locale-redirects.js');
const dbDumpPath = path.resolve(__dirname, 'db-slugs-dump.json');

console.log('='.repeat(80));
console.log('DEEP CROSS-LOCALE REDIRECT AUDIT');
console.log('='.repeat(80));
console.log();
console.log(`Config file: ${configPath}`);
console.log(`DB dump:     ${dbDumpPath}`);
console.log();

// Load the config (CommonJS module)
const { crossLocaleSlugs } = require(configPath);
console.log(`Config entries loaded: ${crossLocaleSlugs.length}`);

// Load the DB dump
const dbPosts = JSON.parse(fs.readFileSync(dbDumpPath, 'utf-8'));
console.log(`DB posts loaded:      ${dbPosts.length}`);

// Count total DB slugs
let totalDbSlugs = 0;
for (const post of dbPosts) {
  totalDbSlugs += Object.keys(post.localeSlugs).length;
}
console.log(`Total DB slugs:       ${totalDbSlugs}`);
console.log();

// ---------------------------------------------------------------------------
// 2. Build lookup maps
// ---------------------------------------------------------------------------

// Config map: slug -> { nativeLocale, wrongLocales }
const configMap = new Map();
const configDuplicates = [];
for (const entry of crossLocaleSlugs) {
  if (configMap.has(entry.slug)) {
    configDuplicates.push({
      slug: entry.slug,
      existing: configMap.get(entry.slug).nativeLocale,
      duplicate: entry.nativeLocale,
    });
  }
  configMap.set(entry.slug, {
    nativeLocale: entry.nativeLocale,
    wrongLocales: entry.wrongLocales,
  });
}

// DB map: slug -> { locale, postId, enTitle, primarySlug }
const dbSlugMap = new Map();
const dbDuplicates = [];
for (const post of dbPosts) {
  for (const [locale, slug] of Object.entries(post.localeSlugs)) {
    if (dbSlugMap.has(slug)) {
      dbDuplicates.push({
        slug,
        existingPost: dbSlugMap.get(slug).enTitle,
        existingLocale: dbSlugMap.get(slug).locale,
        duplicatePost: post.enTitle,
        duplicateLocale: locale,
      });
    }
    dbSlugMap.set(slug, {
      locale,
      postId: post.id,
      enTitle: post.enTitle,
      primarySlug: post.primarySlug,
    });
  }
}

// Reverse map: for each post, collect all its slugs by locale
const postSlugsById = new Map();
for (const post of dbPosts) {
  postSlugsById.set(post.id, {
    enTitle: post.enTitle,
    primarySlug: post.primarySlug,
    localeSlugs: post.localeSlugs,
  });
}

// ---------------------------------------------------------------------------
// 3. Cross-check: Config vs DB mismatches
// ---------------------------------------------------------------------------

const mismatches = [];       // Config nativeLocale != DB locale
const configNotInDb = [];    // In config but not in DB
const configCorrect = [];    // Config matches DB

for (const entry of crossLocaleSlugs) {
  const dbInfo = dbSlugMap.get(entry.slug);
  if (!dbInfo) {
    configNotInDb.push({
      slug: entry.slug,
      configLocale: entry.nativeLocale,
    });
  } else if (dbInfo.locale !== entry.nativeLocale) {
    mismatches.push({
      slug: entry.slug,
      configLocale: entry.nativeLocale,
      dbLocale: dbInfo.locale,
      postTitle: dbInfo.enTitle,
      postId: dbInfo.postId,
    });
  } else {
    configCorrect.push(entry.slug);
  }
}

// ---------------------------------------------------------------------------
// 4. Cross-check: DB slugs missing from config
// ---------------------------------------------------------------------------

const missingFromConfig = []; // In DB but not in config

for (const post of dbPosts) {
  for (const [locale, slug] of Object.entries(post.localeSlugs)) {
    if (!configMap.has(slug)) {
      missingFromConfig.push({
        slug,
        locale,
        postTitle: post.enTitle,
        postId: post.id,
        primarySlug: post.primarySlug,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Language Detection
// ---------------------------------------------------------------------------

// Language marker words (appearing in URL slugs after transliteration)
const languageMarkers = {
  en: [
    'worksheet', 'worksheets', 'generators', 'generator', 'teachers', 'teacher',
    'guide', 'complete', 'learning', 'classroom', 'students', 'education',
    'educational', 'activities', 'activity', 'strategies', 'strategy',
    'elementary', 'school', 'teaching', 'skills', 'practice', 'printable',
    'curriculum', 'assessment', 'reading', 'writing', 'math', 'every',
    'how', 'why', 'your', 'our', 'the', 'with', 'that', 'this', 'from',
    'into', 'build', 'create', 'custom', 'editable', 'based', 'when',
    'needs', 'beyond', 'through', 'brain', 'child', 'children',
  ],
  de: [
    'fuer', 'und', 'der', 'die', 'das', 'arbeitsblatt', 'arbeitsblaetter',
    'grundschule', 'schueler', 'foerdern', 'generatoren', 'editierbare',
    'unterricht', 'lernen', 'kinder', 'klasse', 'mathematik', 'mathe',
    'lesen', 'schreiben', 'uebungen', 'komplette', 'anleitung',
    'warum', 'unsere', 'wenn', 'alle', 'mit', 'erstellen', 'ueber',
    'strategien', 'bildung', 'schule', 'lehrer', 'eltern', 'raetsel',
    'im', 'zur', 'zum', 'von', 'den', 'dem', 'ein', 'eine',
    'faechern', 'fachunterricht', 'praxis', 'lehrkraefte',
    'tipps', 'ideen', 'kostenvergleich', 'bewertung',
    'arbeitsblattgeneratoren', 'binnendifferenzierung',
  ],
  fr: [
    'pour', 'les', 'des', 'une', 'fiches', 'pedagogiques', 'generateurs',
    'enseignants', 'apprentissage', 'exercices', 'scolaire', 'eleves',
    'mathematiques', 'lecture', 'ecriture', 'comment', 'creer',
    'complet', 'personnalisees', 'primaire', 'enfants', 'classe',
    'strategies', 'activites', 'pratique', 'guide', 'ecole',
    'avec', 'dans', 'qui', 'sur', 'par', 'est', 'sont',
    'lapprentissage', 'defficacite', 'dexercices', 'denfants',
    'pedagogique', 'modifiables', 'differenciee',
    'anxiete', 'quand', 'minutes', 'pourquoi', 'entre',
  ],
  es: [
    'para', 'los', 'las', 'fichas', 'educativas', 'generadores',
    'primaria', 'maestro', 'maestros', 'docentes', 'alumnos',
    'matematicas', 'lectura', 'escritura', 'como', 'crear',
    'completa', 'personalizadas', 'ninos', 'escuela', 'clase',
    'estrategias', 'actividades', 'practica', 'guia', 'del',
    'con', 'que', 'por', 'todo', 'cada', 'son', 'una',
    'aprendizaje', 'educacion', 'ensenar', 'editables',
    'ansiedad', 'cuando', 'minutos', 'reduce', 'mejora',
    'instruccion', 'diferenciada', 'aula', 'alumnado',
  ],
  pt: [
    'para', 'atividades', 'professores', 'geradores', 'ensino',
    'como', 'criar', 'completo', 'fichas', 'educacao',
    'criancas', 'escola', 'sala', 'matematica', 'leitura',
    'escrita', 'estrategias', 'aprendizagem', 'fundamental',
    'com', 'que', 'por', 'dos', 'das', 'uma', 'nos',
    'pedagogica', 'editaveis', 'diferenciacao', 'desenvolvimento',
    'atraves', 'reduzir', 'ansiedade', 'integrar', 'alunos',
    'bem', 'estar', 'saude', 'mental', 'infantil',
  ],
  it: [
    'per', 'schede', 'didattiche', 'generatori', 'elementare',
    'bambini', 'scuola', 'primaria', 'insegnanti', 'matematica',
    'lettura', 'scrittura', 'come', 'creare', 'completa',
    'personalizzate', 'classe', 'strategie', 'attivita', 'guida',
    'con', 'che', 'del', 'dei', 'delle', 'alla', 'nel',
    'modificabili', 'differenziazione', 'apprendimento',
    'quando', 'minuti', 'perche', 'ogni', 'tutti',
    'operative', 'didattica', 'educazione', 'alunni',
  ],
  nl: [
    'voor', 'werkblad', 'werkbladen', 'basisschool', 'leerlingen',
    'onderwijs', 'generatoren', 'bewerkbare', 'leerkracht',
    'leren', 'kinderen', 'klas', 'wiskunde', 'rekenen', 'lezen',
    'schrijven', 'strategieen', 'activiteiten', 'handleiding',
    'met', 'van', 'het', 'een', 'dat', 'die', 'zijn', 'naar',
    'gedifferentieerd', 'rekenangst', 'vakken', 'platforms',
    'vergelijken', 'iedere', 'compleet', 'versterken', 'heen',
    'thuisonderwijs', 'ouders', 'geestelijke', 'gezondheid',
  ],
  sv: [
    'foer', 'och', 'arbetsblad', 'arbetsbladsgeneratorer', 'laerare',
    'grundskola', 'grundskolan', 'redigerbara', 'eleverna',
    'laerande', 'barn', 'klass', 'matematik', 'laesning',
    'skrivning', 'strategier', 'aktiviteter', 'komplett',
    'med', 'som', 'att', 'den', 'det', 'saa', 'alla', 'till',
    'differentierad', 'undervisning', 'matteaangest',
    'daerfoer', 'anvaender', 'vaara', 'integrerar',
    'hemundervisning', 'foeraeldrar', 'haelsa', 'vaelmaaende',
    'paa', 'aemnen', 'skapa', 'klassrummet',
  ],
  no: [
    'for', 'og', 'oppgave', 'oppgavegeneratorer', 'laerer',
    'barneskole', 'barneskolen', 'redigerbare', 'elevene',
    'laering', 'barn', 'klasse', 'matematikk', 'lesing',
    'skriving', 'strategier', 'aktiviteter', 'komplett',
    'med', 'som', 'til', 'den', 'det', 'alle', 'slik',
    'tilpasset', 'opplaering', 'matteangst', 'arbeidsark',
    'hvorfor', 'bruker', 'vaare', 'integrerer',
    'hjemmeundervisning', 'foreldre', 'helse', 'utvikling',
    'paa', 'tvers', 'fag', 'hjelper', 'stoette',
  ],
  da: [
    'for', 'og', 'opgave', 'opgavegeneratorer', 'laerer',
    'folkeskole', 'folkeskolen', 'redigerbare', 'eleverne',
    'laering', 'boern', 'klasse', 'matematik', 'laesning',
    'skrivning', 'strategier', 'aktiviteter', 'komplet',
    'med', 'som', 'til', 'den', 'det', 'alle', 'saadan',
    'differentieret', 'undervisning', 'arbejdsark',
    'hvorfor', 'bruger', 'vores', 'integrerer',
    'hjemmeundervisning', 'sundhed', 'trivsel',
    'paa', 'tvaers', 'fag', 'virker', 'stoette',
    'naar', 'moeder', 'generatorer',
  ],
  fi: [
    'tehtaevae', 'tehtaevaet', 'opettajille', 'oppiminen', 'generaattorit',
    'generaattoria', 'tehtaevaegeneraattorit', 'tehtaevaegeneraattoria',
    'muokattavat', 'muokattavaa', 'alakoulun', 'opettajalle',
    'oppimiseen', 'lapset', 'luokka', 'matematiikka', 'lukeminen',
    'kirjoittaminen', 'strategiat', 'taeydellinen', 'opas',
    'kanssa', 'joka', 'kun', 'kaikki', 'miten', 'miksi',
    'eriyttaeminen', 'kaeytaennoessae', 'laskuahdistuksen',
    'kotiopetuksen', 'mielenterveys', 'tunnetaidot',
    'oppiaineiden', 'integrointi', 'harjoitusta', 'avulla',
    'vaelillae', 'kehittaeminen', 'tuki', 'taitoja',
  ],
};

/**
 * Score a slug against all language marker sets.
 * Returns { scores: { en: N, de: N, ... }, detected: 'xx', maxScore: N }
 */
function detectLanguage(slug) {
  const tokens = slug.split('-');
  const scores = {};
  let maxScore = 0;
  let detected = null;

  for (const [locale, markers] of Object.entries(languageMarkers)) {
    let score = 0;
    for (const token of tokens) {
      if (markers.includes(token)) {
        score++;
      }
    }
    // Also check for 2-token combinations (bigrams) in the slug
    for (let i = 0; i < tokens.length - 1; i++) {
      const bigram = tokens[i] + tokens[i + 1];
      if (markers.includes(bigram)) {
        score += 2; // Bigrams are worth more
      }
    }
    scores[locale] = score;
    if (score > maxScore) {
      maxScore = score;
      detected = locale;
    }
  }

  // Handle ties: if multiple languages tied, collect them
  const tiedLocales = [];
  for (const [locale, score] of Object.entries(scores)) {
    if (score === maxScore && maxScore > 0) {
      tiedLocales.push(locale);
    }
  }

  return { scores, detected, maxScore, tiedLocales };
}

// Run language detection on all config entries
const langMismatches = [];
const langUncertain = [];  // Score too low to be confident
const MIN_CONFIDENCE_SCORE = 2; // Need at least 2 marker matches

for (const entry of crossLocaleSlugs) {
  const result = detectLanguage(entry.slug);

  if (result.maxScore < MIN_CONFIDENCE_SCORE) {
    langUncertain.push({
      slug: entry.slug,
      nativeLocale: entry.nativeLocale,
      maxScore: result.maxScore,
      detected: result.detected,
      tiedLocales: result.tiedLocales,
    });
    continue;
  }

  // If the nativeLocale is among the tied top scores, it's fine
  if (result.tiedLocales.includes(entry.nativeLocale)) {
    continue;
  }

  // The detected language does not match the configured nativeLocale
  if (result.detected !== entry.nativeLocale) {
    // Get the score for the configured locale
    const configLocaleScore = result.scores[entry.nativeLocale] || 0;
    langMismatches.push({
      slug: entry.slug,
      nativeLocale: entry.nativeLocale,
      detectedLocale: result.detected,
      detectedScore: result.maxScore,
      nativeScore: configLocaleScore,
      scoreDiff: result.maxScore - configLocaleScore,
      tiedLocales: result.tiedLocales,
      allScores: result.scores,
    });
  }
}

// Sort lang mismatches by score difference (most suspicious first)
langMismatches.sort((a, b) => b.scoreDiff - a.scoreDiff);

// ---------------------------------------------------------------------------
// 6. wrongLocales validation
// ---------------------------------------------------------------------------

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const wrongLocaleIssues = [];
for (const entry of crossLocaleSlugs) {
  const expectedWrong = ALL_LOCALES.filter(l => l !== entry.nativeLocale).sort();
  const actualWrong = [...entry.wrongLocales].sort();

  if (JSON.stringify(expectedWrong) !== JSON.stringify(actualWrong)) {
    wrongLocaleIssues.push({
      slug: entry.slug,
      nativeLocale: entry.nativeLocale,
      expected: expectedWrong,
      actual: actualWrong,
      missing: expectedWrong.filter(l => !actualWrong.includes(l)),
      extra: actualWrong.filter(l => !expectedWrong.includes(l)),
    });
  }
}

// ---------------------------------------------------------------------------
// 7. Per-locale summary
// ---------------------------------------------------------------------------

const localeSummary = {};
for (const locale of ALL_LOCALES) {
  localeSummary[locale] = { configCount: 0, dbCount: 0, mismatches: 0, missing: 0, langMismatch: 0 };
}

for (const entry of crossLocaleSlugs) {
  if (localeSummary[entry.nativeLocale]) {
    localeSummary[entry.nativeLocale].configCount++;
  }
}

for (const post of dbPosts) {
  for (const [locale] of Object.entries(post.localeSlugs)) {
    if (localeSummary[locale]) {
      localeSummary[locale].dbCount++;
    }
  }
}

for (const m of mismatches) {
  if (localeSummary[m.configLocale]) localeSummary[m.configLocale].mismatches++;
}

for (const m of missingFromConfig) {
  if (localeSummary[m.locale]) localeSummary[m.locale].missing++;
}

for (const m of langMismatches) {
  if (localeSummary[m.nativeLocale]) localeSummary[m.nativeLocale].langMismatch++;
}

// ---------------------------------------------------------------------------
// 8. Print Report
// ---------------------------------------------------------------------------

console.log('='.repeat(80));
console.log('AUDIT RESULTS');
console.log('='.repeat(80));
console.log();

// --- Summary ---
console.log('--- SUMMARY ---');
console.log(`Config entries:              ${crossLocaleSlugs.length}`);
console.log(`DB slugs (expected):         ${totalDbSlugs}`);
console.log(`Difference:                  ${totalDbSlugs - crossLocaleSlugs.length} slugs`);
console.log();
console.log(`Config vs DB correct:        ${configCorrect.length}`);
console.log(`Config vs DB mismatches:     ${mismatches.length}`);
console.log(`Config not in DB:            ${configNotInDb.length}`);
console.log(`DB slugs missing from config:${missingFromConfig.length}`);
console.log(`Config duplicates:           ${configDuplicates.length}`);
console.log(`DB slug collisions:          ${dbDuplicates.length}`);
console.log(`wrongLocales array issues:   ${wrongLocaleIssues.length}`);
console.log();
console.log(`Language detection mismatches:${langMismatches.length}`);
console.log(`Language uncertain (low score):${langUncertain.length}`);
console.log();

// --- Config vs DB Mismatches ---
if (mismatches.length > 0) {
  console.log('='.repeat(80));
  console.log('CONFIG vs DB MISMATCHES (nativeLocale in config != locale in DB)');
  console.log('='.repeat(80));
  console.log();
  for (const m of mismatches) {
    console.log(`  MISMATCH: "${m.slug}"`);
    console.log(`    Config says: ${m.configLocale}`);
    console.log(`    DB says:     ${m.dbLocale}`);
    console.log(`    Post:        ${m.postTitle}`);
    console.log(`    Post ID:     ${m.postId}`);
    console.log();
  }
} else {
  console.log('CONFIG vs DB MISMATCHES: None found (all config nativeLocales match DB)');
  console.log();
}

// --- Config entries not in DB ---
if (configNotInDb.length > 0) {
  console.log('='.repeat(80));
  console.log('CONFIG ENTRIES NOT FOUND IN DB (orphaned config entries)');
  console.log('='.repeat(80));
  console.log();
  for (const e of configNotInDb) {
    console.log(`  ORPHANED: "${e.slug}" (config locale: ${e.configLocale})`);
  }
  console.log();
} else {
  console.log('CONFIG ENTRIES NOT IN DB: None (all config slugs exist in DB)');
  console.log();
}

// --- DB slugs missing from config ---
if (missingFromConfig.length > 0) {
  console.log('='.repeat(80));
  console.log('DB SLUGS MISSING FROM CONFIG (no redirect protection!)');
  console.log('='.repeat(80));
  console.log();
  for (const m of missingFromConfig) {
    console.log(`  MISSING: "${m.slug}"`);
    console.log(`    Locale:       ${m.locale}`);
    console.log(`    Post:         ${m.postTitle}`);
    console.log(`    Primary slug: ${m.primarySlug}`);
    console.log(`    Post ID:      ${m.postId}`);
    console.log();

    // Show what URLs are unprotected
    const wrongLocales = ALL_LOCALES.filter(l => l !== m.locale);
    console.log(`    UNPROTECTED URLs (will serve wrong-language content):`);
    for (const wl of wrongLocales) {
      console.log(`      /${wl}/blog/${m.slug}  -->  should redirect to /${m.locale}/blog/${m.slug}`);
    }
    console.log();
  }
} else {
  console.log('DB SLUGS MISSING FROM CONFIG: None (all DB slugs have redirect protection)');
  console.log();
}

// --- Config duplicates ---
if (configDuplicates.length > 0) {
  console.log('='.repeat(80));
  console.log('CONFIG DUPLICATE SLUGS');
  console.log('='.repeat(80));
  console.log();
  for (const d of configDuplicates) {
    console.log(`  DUPLICATE: "${d.slug}"`);
    console.log(`    First entry locale:  ${d.existing}`);
    console.log(`    Duplicate locale:    ${d.duplicate}`);
  }
  console.log();
}

// --- DB slug collisions ---
if (dbDuplicates.length > 0) {
  console.log('='.repeat(80));
  console.log('DB SLUG COLLISIONS (same slug used by multiple posts)');
  console.log('='.repeat(80));
  console.log();
  for (const d of dbDuplicates) {
    console.log(`  COLLISION: "${d.slug}"`);
    console.log(`    Post 1: "${d.existingPost}" (${d.existingLocale})`);
    console.log(`    Post 2: "${d.duplicatePost}" (${d.duplicateLocale})`);
  }
  console.log();
}

// --- wrongLocales array issues ---
if (wrongLocaleIssues.length > 0) {
  console.log('='.repeat(80));
  console.log('WRONG LOCALES ARRAY ISSUES');
  console.log('='.repeat(80));
  console.log();
  for (const w of wrongLocaleIssues) {
    console.log(`  ISSUE: "${w.slug}" (nativeLocale: ${w.nativeLocale})`);
    if (w.missing.length > 0) console.log(`    Missing from wrongLocales: ${w.missing.join(', ')}`);
    if (w.extra.length > 0)   console.log(`    Extra in wrongLocales:     ${w.extra.join(', ')}`);
  }
  console.log();
}

// --- Language Detection Mismatches ---
if (langMismatches.length > 0) {
  console.log('='.repeat(80));
  console.log(`LANGUAGE DETECTION MISMATCHES (${langMismatches.length} found)`);
  console.log('Slug language markers suggest a DIFFERENT language than nativeLocale');
  console.log('Sorted by confidence (highest score difference first)');
  console.log('='.repeat(80));
  console.log();

  // Group by severity
  const highSeverity = langMismatches.filter(m => m.scoreDiff >= 3);
  const medSeverity = langMismatches.filter(m => m.scoreDiff === 2);
  const lowSeverity = langMismatches.filter(m => m.scoreDiff <= 1);

  if (highSeverity.length > 0) {
    console.log(`  --- HIGH SEVERITY (score diff >= 3): ${highSeverity.length} ---`);
    console.log();
    for (const m of highSeverity) {
      console.log(`  SUSPECT: "${m.slug}"`);
      console.log(`    Config nativeLocale:  ${m.nativeLocale} (score: ${m.nativeScore})`);
      console.log(`    Detected language:    ${m.detectedLocale} (score: ${m.detectedScore})`);
      console.log(`    Score difference:     ${m.scoreDiff}`);
      if (m.tiedLocales.length > 1) {
        console.log(`    Tied languages:       ${m.tiedLocales.join(', ')}`);
      }
      // Show top 3 scores
      const sortedScores = Object.entries(m.allScores)
        .sort((a, b) => b[1] - a[1])
        .filter(([, s]) => s > 0)
        .slice(0, 5);
      console.log(`    Top scores:           ${sortedScores.map(([l, s]) => `${l}=${s}`).join(', ')}`);
      console.log();
    }
  }

  if (medSeverity.length > 0) {
    console.log(`  --- MEDIUM SEVERITY (score diff = 2): ${medSeverity.length} ---`);
    console.log();
    for (const m of medSeverity) {
      console.log(`  POSSIBLE: "${m.slug}"`);
      console.log(`    Config: ${m.nativeLocale} (${m.nativeScore}) vs Detected: ${m.detectedLocale} (${m.detectedScore})`);
      const sortedScores = Object.entries(m.allScores)
        .sort((a, b) => b[1] - a[1])
        .filter(([, s]) => s > 0)
        .slice(0, 4);
      console.log(`    Top scores: ${sortedScores.map(([l, s]) => `${l}=${s}`).join(', ')}`);
      console.log();
    }
  }

  if (lowSeverity.length > 0) {
    console.log(`  --- LOW SEVERITY (score diff <= 1): ${lowSeverity.length} ---`);
    console.log();
    for (const m of lowSeverity) {
      console.log(`  MINOR: "${m.slug}"`);
      console.log(`    Config: ${m.nativeLocale} (${m.nativeScore}) vs Detected: ${m.detectedLocale} (${m.detectedScore})`);
      console.log();
    }
  }
} else {
  console.log('LANGUAGE DETECTION MISMATCHES: None found');
  console.log();
}

// --- Low-confidence entries ---
if (langUncertain.length > 0) {
  console.log('='.repeat(80));
  console.log(`LOW-CONFIDENCE LANGUAGE DETECTION (${langUncertain.length} slugs, score < ${MIN_CONFIDENCE_SCORE})`);
  console.log('These slugs have too few language markers to reliably detect language');
  console.log('='.repeat(80));
  console.log();
  // Just show count by locale, not individual entries
  const uncertainByLocale = {};
  for (const u of langUncertain) {
    uncertainByLocale[u.nativeLocale] = (uncertainByLocale[u.nativeLocale] || 0) + 1;
  }
  for (const [locale, count] of Object.entries(uncertainByLocale).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${locale}: ${count} slugs with low confidence`);
  }
  console.log();
  // Show individual entries if there are few
  if (langUncertain.length <= 20) {
    for (const u of langUncertain) {
      console.log(`  "${u.slug}" (native: ${u.nativeLocale}, best: ${u.detected || 'none'}, score: ${u.maxScore})`);
    }
    console.log();
  }
}

// --- Per-locale summary ---
console.log('='.repeat(80));
console.log('PER-LOCALE SUMMARY');
console.log('='.repeat(80));
console.log();
console.log(
  'Locale'.padEnd(8) +
  'Config'.padStart(8) +
  'DB'.padStart(6) +
  'Match'.padStart(8) +
  'Mismatch'.padStart(10) +
  'Missing'.padStart(9) +
  'LangFlag'.padStart(10)
);
console.log('-'.repeat(51));

let totalConfig = 0, totalDb = 0, totalMismatch = 0, totalMissing = 0, totalLangFlag = 0;
for (const locale of ALL_LOCALES) {
  const s = localeSummary[locale];
  const matchCount = s.configCount - s.mismatches;
  console.log(
    locale.padEnd(8) +
    String(s.configCount).padStart(8) +
    String(s.dbCount).padStart(6) +
    String(matchCount).padStart(8) +
    String(s.mismatches).padStart(10) +
    String(s.missing).padStart(9) +
    String(s.langMismatch).padStart(10)
  );
  totalConfig += s.configCount;
  totalDb += s.dbCount;
  totalMismatch += s.mismatches;
  totalMissing += s.missing;
  totalLangFlag += s.langMismatch;
}
console.log('-'.repeat(51));
console.log(
  'TOTAL'.padEnd(8) +
  String(totalConfig).padStart(8) +
  String(totalDb).padStart(6) +
  String(totalConfig - totalMismatch).padStart(8) +
  String(totalMismatch).padStart(10) +
  String(totalMissing).padStart(9) +
  String(totalLangFlag).padStart(10)
);
console.log();

// --- Final verdict ---
console.log('='.repeat(80));
console.log('FINAL VERDICT');
console.log('='.repeat(80));
console.log();

const criticalIssues = mismatches.length + missingFromConfig.length + configDuplicates.length + dbDuplicates.length;
const warningIssues = wrongLocaleIssues.length + langMismatches.filter(m => m.scoreDiff >= 3).length;
const infoIssues = langMismatches.filter(m => m.scoreDiff < 3).length + langUncertain.length;

if (criticalIssues === 0 && warningIssues === 0) {
  console.log('STATUS: PASS');
  console.log('No critical or warning-level issues found.');
} else if (criticalIssues === 0) {
  console.log('STATUS: PASS WITH WARNINGS');
  console.log(`${warningIssues} warning-level issues found.`);
} else {
  console.log('STATUS: FAIL');
  console.log(`${criticalIssues} critical issues found!`);
  if (warningIssues > 0) console.log(`${warningIssues} warning-level issues found.`);
}
if (infoIssues > 0) {
  console.log(`${infoIssues} informational items.`);
}
console.log();

// Exit with appropriate code
process.exit(criticalIssues > 0 ? 1 : 0);
