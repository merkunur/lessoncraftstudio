/**
 * Deep linguistic check: look for language-specific word patterns in slugs
 * to detect cross-language contamination between similar languages.
 *
 * Checks:
 * - Norwegian vs Danish vs Swedish word patterns in slugs
 * - German vs Dutch word patterns
 * - Spanish vs Portuguese word patterns
 * - Any locale with slugs containing strong markers of a different language
 */
const db = require('./db-slugs-dump.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// Strong language markers that appear in SLUGS (lowercase, no accents)
// These are words/fragments that strongly indicate a specific language
const markers = {
  // Norwegian-specific (vs Danish/Swedish)
  no: [
    'oppgave', 'oppgavegenerator', 'laerer', 'barneskole', 'opplaering',
    'undervisningsopplegg', 'tilpasset', 'laering', 'elevene', 'hvordan',
    'grunnleggende', 'foerdigheter', 'utvikling', 'matematikk',
    'skriving', 'lesing', 'forbedre', 'styrke'
  ],
  // Danish-specific (vs Norwegian/Swedish)
  da: [
    'opgave', 'opgavegenerator', 'laerer', 'folkeskole', 'undervisning',
    'arbejdsark', 'eleverne', 'udvikling', 'faerdigheder', 'forbedre',
    'styrke', 'laesning', 'skrivning', 'grundlaeggende',
    'klasse', 'boern', 'forstaa'
  ],
  // Swedish-specific (vs Norwegian/Danish)
  sv: [
    'arbetsblad', 'uppgift', 'laerare', 'grundskola', 'undervisning',
    'eleverna', 'utveckling', 'faerdigheter', 'foerbaettra',
    'laesning', 'skrivning', 'grundlaeggande', 'arskurs',
    'utbildning', 'verktyg'
  ],
  // German-specific
  de: [
    'arbeitsblatt', 'arbeitsblaetter', 'grundschule', 'klasse', 'schueler',
    'foerdern', 'unterricht', 'lehrkraefte', 'uebungen', 'fuer',
    'kinder', 'mathematik', 'schreiben', 'lesen', 'lernen'
  ],
  // Dutch-specific
  nl: [
    'werkblad', 'werkbladen', 'basisschool', 'leerlingen', 'onderwijs',
    'oefeningen', 'leerkrachten', 'groep', 'ontwikkeling', 'activiteiten',
    'kinderen', 'rekenen', 'schrijven', 'lezen'
  ],
  // Spanish-specific (vs Portuguese)
  es: [
    'fichas', 'educativas', 'generadores', 'primaria', 'grado',
    'ninos', 'aprendizaje', 'ensenanza', 'actividades', 'maestros',
    'herramientas', 'estrategias', 'habilidades', 'desarrollo'
  ],
  // Portuguese-specific (vs Spanish)
  pt: [
    'atividades', 'professores', 'geradores', 'ensino', 'aprendizagem',
    'criancas', 'desenvolvimento', 'habilidades', 'estrategias',
    'ferramentas', 'educacao', 'alunos', 'escola'
  ],
  // Italian-specific
  it: [
    'schede', 'didattiche', 'generatori', 'elementare', 'bambini',
    'apprendimento', 'insegnanti', 'sviluppo', 'attivita', 'esercizi',
    'matematica', 'scrittura', 'lettura', 'competenze'
  ],
  // French-specific
  fr: [
    'fiches', 'pedagogiques', 'generateurs', 'eleves', 'apprentissage',
    'enseignement', 'activites', 'competences', 'developpement',
    'mathematiques', 'ecriture', 'lecture', 'maternelle'
  ],
  // Finnish-specific
  fi: [
    'tehtaevae', 'generaattorit', 'opettajille', 'oppimateriaali',
    'oppiminen', 'kehitys', 'harjoitukset', 'matematiikka',
    'kirjoittaminen', 'lukeminen', 'taidot', 'koulu',
    'luokka', 'lapset', 'kaeytaennoessae', 'oppilaiden'
  ]
};

function scoreSlugForLocale(slug, locale) {
  const words = slug.split('-');
  const localeMarkers = markers[locale] || [];
  let score = 0;
  for (const word of words) {
    for (const marker of localeMarkers) {
      if (word === marker || word.includes(marker) || marker.includes(word)) {
        score++;
        break;
      }
    }
  }
  return score;
}

// For each post, check each locale's slug against ALL language markers
const suspiciousSlugs = [];

for (const post of db) {
  for (const locale of ALL_LOCALES) {
    if (locale === 'en') continue; // English slugs are different

    const slug = post.localeSlugs[locale];
    if (!slug) continue;

    // Score this slug for its declared locale
    const ownScore = scoreSlugForLocale(slug, locale);

    // Score this slug for all other locales
    let bestOtherLocale = null;
    let bestOtherScore = 0;

    for (const otherLocale of ALL_LOCALES) {
      if (otherLocale === locale || otherLocale === 'en') continue;
      const otherScore = scoreSlugForLocale(slug, otherLocale);
      if (otherScore > bestOtherScore) {
        bestOtherScore = otherScore;
        bestOtherLocale = otherLocale;
      }
    }

    // Flag if slug scores HIGHER for a different locale than its own
    if (bestOtherScore > ownScore && bestOtherScore >= 2) {
      suspiciousSlugs.push({
        post: post.primarySlug,
        locale,
        slug,
        ownScore,
        bestOtherLocale,
        bestOtherScore
      });
    }
  }
}

console.log(`Suspicious slugs (scores higher for different locale): ${suspiciousSlugs.length}\n`);

// Group by locale
const byLocale = {};
for (const s of suspiciousSlugs) {
  byLocale[s.locale] = byLocale[s.locale] || [];
  byLocale[s.locale].push(s);
}

for (const [locale, items] of Object.entries(byLocale).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`\n=== ${locale} (${items.length} suspicious) ===`);
  for (const item of items.slice(0, 10)) {
    console.log(`  "${item.slug}"`);
    console.log(`    own(${item.locale}): ${item.ownScore}, best(${item.bestOtherLocale}): ${item.bestOtherScore}`);
  }
}

// Also: specifically check Norwegian vs Danish slug patterns
console.log('\n\n=== NORWEGIAN vs DANISH SPECIFIC CHECK ===');
console.log('Looking for "opgave" (Danish) in Norwegian slugs and "oppgave" (Norwegian) in Danish slugs:\n');

for (const post of db) {
  const noSlug = post.localeSlugs.no || '';
  const daSlug = post.localeSlugs.da || '';

  // Danish word in Norwegian slug?
  if (noSlug.includes('opgave') && !noSlug.includes('oppgave')) {
    console.log(`  NO has Danish "opgave": ${noSlug}`);
  }
  if (noSlug.includes('arbejds')) {
    console.log(`  NO has Danish "arbejds": ${noSlug}`);
  }

  // Norwegian word in Danish slug?
  if (daSlug.includes('oppgave')) {
    console.log(`  DA has Norwegian "oppgave": ${daSlug}`);
  }
  if (daSlug.includes('laering') && !daSlug.includes('laering')) {
    // This is tricky since both languages can use similar words
  }
}

// Swedish vs Norwegian check
console.log('\n=== SWEDISH vs NORWEGIAN CHECK ===');
for (const post of db) {
  const svSlug = post.localeSlugs.sv || '';
  const noSlug = post.localeSlugs.no || '';

  // Norwegian-specific words in Swedish slug?
  if (svSlug.includes('oppgave')) {
    console.log(`  SV has Norwegian "oppgave": ${svSlug}`);
  }

  // Swedish-specific words in Norwegian slug?
  if (noSlug.includes('arbetsblad')) {
    console.log(`  NO has Swedish "arbetsblad": ${noSlug}`);
  }
  if (noSlug.includes('uppgift')) {
    console.log(`  NO has Swedish "uppgift": ${noSlug}`);
  }
}

// German vs Dutch check
console.log('\n=== GERMAN vs DUTCH CHECK ===');
for (const post of db) {
  const deSlug = post.localeSlugs.de || '';
  const nlSlug = post.localeSlugs.nl || '';

  if (nlSlug.includes('arbeitsblatt') || nlSlug.includes('arbeitsblaetter')) {
    console.log(`  NL has German "arbeitsblatt": ${nlSlug}`);
  }
  if (deSlug.includes('werkblad') || deSlug.includes('werkbladen')) {
    console.log(`  DE has Dutch "werkblad": ${deSlug}`);
  }
}

// Spanish vs Portuguese check
console.log('\n=== SPANISH vs PORTUGUESE CHECK ===');
for (const post of db) {
  const esSlug = post.localeSlugs.es || '';
  const ptSlug = post.localeSlugs.pt || '';

  if (esSlug.includes('atividades') || esSlug.includes('professores')) {
    console.log(`  ES has Portuguese pattern: ${esSlug}`);
  }
  if (ptSlug.includes('fichas') || ptSlug.includes('ninos') || ptSlug.includes('primaria')) {
    console.log(`  PT has Spanish pattern: ${ptSlug}`);
  }
}
