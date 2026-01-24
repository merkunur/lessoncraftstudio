/**
 * Search for cross-language-family mismatches
 * These are the clearest errors: e.g., German content in Swedish key
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Language families
const GERMANIC = ['en', 'de', 'nl', 'sv', 'no', 'da'];
const ROMANCE = ['es', 'pt', 'fr', 'it'];
const URALIC = ['fi'];

// Unique patterns for each language that DON'T appear in related languages
const UNIQUE_PATTERNS = {
  de: {
    name: 'German',
    family: 'germanic',
    patterns: [
      // German umlaut replacements - very unique
      'vorschule', 'feinmotorik', 'aktivitaeten', 'arbeitsblaetter',
      'uebungen', 'raetsel', 'grundschule', 'zaehlen', 'buchstaben',
      'lernspiele', 'mathe-', 'schreib', 'malen', 'ausmalen',
      'woerter', 'kreuzwort', 'kryptogramm', 'schattenbilder',
      'praepositionen', 'fuer-kinder', 'gross-klein', 'mehr-weniger',
      'muster-zug', 'bilder-bingo', 'was-passt-nicht', 'fehlende-',
      '-und-', 'algorithmus', 'kollisionsfrei'
    ]
  },
  es: {
    name: 'Spanish',
    family: 'romance',
    patterns: [
      // Unique Spanish patterns
      'generador-de-', 'sopa-de-letras', 'para-ninos', 'preescolar',
      'ejercicios', 'colorear', 'laberinto', 'crucigrama',
      'contar', 'sumar', 'restar', 'grande-pequeno', 'mas-menos',
      'actividades-de-', 'hojas-de-', 'matematicas'
    ]
  },
  fr: {
    name: 'French',
    family: 'romance',
    patterns: [
      // Unique French patterns
      'jours-d', 'ecole', 'maternelle', 'pedagogiques',
      'coloriage', 'labyrinthe', 'mots-caches', 'mots-croises',
      'compter', 'grand-petit', 'plus-moins', 'pour-enfants',
      'fiches-pedagogiques', 'activites-', '-enfants'
    ]
  },
  it: {
    name: 'Italian',
    family: 'romance',
    patterns: [
      // Unique Italian patterns
      'alfabetizzazione', 'prima-elementare', 'strumenti',
      'prescolare', 'colorare', 'labirinto', 'cruciverba',
      'contare', 'grande-piccolo', 'piu-meno', 'per-bambini',
      'schede-didattiche', 'esercizi'
    ]
  },
  fi: {
    name: 'Finnish',
    family: 'uralic',
    patterns: [
      // Very unique Finnish patterns (ae, oe combinations)
      'tehtaev', 'tyoarkit', 'opettajana', 'harjoitukset',
      'esikoulu', 'alakoulu', 'matematiikka', 'varitys',
      'sokkelo', 'sanaristikko', 'yhteenlasku', 'vahennyslasku',
      'iso-pieni', 'enemman-vahemman', 'kaupallinen', 'lisenssi',
      'lapset', 'kuviot'
    ]
  },
  sv: {
    name: 'Swedish',
    family: 'germanic',
    patterns: [
      'arbetsblad', 'ovningar', 'forskola', 'grundskola',
      'malarbok', 'siffror', 'bokstaver', 'rakna',
      'labyrint', 'korsord', 'monster-', 'stor-liten',
      'mer-mindre', 'farger', 'former'
    ]
  },
  no: {
    name: 'Norwegian',
    family: 'germanic',
    patterns: [
      'arbeidsark', 'oppgaver', 'barnehage', 'grunnskole',
      'fargelegging', 'bokstaver', 'monstre', 'stor-liten',
      'mer-mindre', 'addisjon', 'subtraksjon'
    ]
  },
  da: {
    name: 'Danish',
    family: 'germanic',
    patterns: [
      'arbejdsark', 'opgaver', 'bornehave', 'folkeskole',
      'farvelaegning', 'bogstaver', 'stor-lille', 'mere-mindre',
      'krydsord', 'taelle'
    ]
  }
};

async function search() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  console.log('Searching for cross-family language mismatches...\n');
  console.log('These are clear errors where content from one language family');
  console.log('is stored under a key from a different language family.\n');

  const mismatches = [];

  for (const post of posts) {
    const trans = post.translations;
    if (!trans) continue;

    for (const [declaredLang, content] of Object.entries(trans)) {
      const slug = content?.slug || '';
      const title = content?.title || '';

      if (!slug) continue;

      const text = `${slug} ${title}`.toLowerCase();

      // Find which language patterns match
      for (const [actualLang, config] of Object.entries(UNIQUE_PATTERNS)) {
        if (actualLang === declaredLang) continue; // Skip if already correct

        // Check if patterns match
        const matchedPatterns = [];
        for (const pattern of config.patterns) {
          if (text.includes(pattern.toLowerCase())) {
            matchedPatterns.push(pattern);
          }
        }

        // Only report if multiple patterns match (more confident)
        if (matchedPatterns.length >= 2) {
          // Check if this is a cross-family mismatch
          const declaredFamily = GERMANIC.includes(declaredLang) ? 'germanic' :
            ROMANCE.includes(declaredLang) ? 'romance' :
            URALIC.includes(declaredLang) ? 'uralic' : 'unknown';

          const isCrossFamily = declaredFamily !== config.family;

          if (isCrossFamily) {
            mismatches.push({
              postSlug: post.slug,
              postId: post.id,
              declaredKey: declaredLang,
              detectedLang: actualLang,
              detectedLangName: config.name,
              translationSlug: slug,
              title: title.substring(0, 60),
              matchedPatterns: matchedPatterns.slice(0, 5),
              crossFamily: true
            });
          }
        }
      }
    }
  }

  // Sort by confidence (more patterns = more confident)
  mismatches.sort((a, b) => b.matchedPatterns.length - a.matchedPatterns.length);

  // Print results
  console.log(`Found ${mismatches.length} cross-family mismatches:\n`);

  // Group by type
  const byType = {};
  for (const m of mismatches) {
    const key = `${m.declaredKey} → ${m.detectedLang}`;
    if (!byType[key]) byType[key] = [];
    byType[key].push(m);
  }

  for (const [type, items] of Object.entries(byType)) {
    const [from, to] = type.split(' → ');
    const toName = UNIQUE_PATTERNS[to]?.name || to;
    console.log(`\n=== "${from}" key contains ${toName} content (${items.length} items) ===\n`);
    for (const item of items) {
      console.log(`Post: ${item.postSlug}`);
      console.log(`  Slug: ${item.translationSlug}`);
      console.log(`  Title: ${item.title}...`);
      console.log(`  Matched: ${item.matchedPatterns.join(', ')}`);
      console.log();
    }
  }

  // Output JSON for fix script
  if (mismatches.length > 0) {
    console.log('\n=== FIX DATA (JSON) ===\n');
    console.log(JSON.stringify(mismatches, null, 2));
  }

  await prisma.$disconnect();
}

search().catch(e => {
  console.error(e);
  process.exit(1);
});
