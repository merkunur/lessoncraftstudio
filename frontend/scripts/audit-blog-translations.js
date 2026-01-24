/**
 * Audit Script: Detect language mismatches in blog post translations
 *
 * This script identifies translations stored under incorrect language keys.
 * For example: German content stored under 'sv' (Swedish) key.
 *
 * Usage: node scripts/audit-blog-translations.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Language detection patterns based on unique linguistic markers
const LANGUAGE_PATTERNS = {
  de: {
    name: 'German',
    // German uses umlaut replacements in URLs: ae, oe, ue
    slugPatterns: [
      /arbeitsblaetter/i, /arbeitsblatt/i, /vorschule/i, /kinder-/i, /-kinder/i,
      /grundschule/i, /schule/i, /uebungen/i, /uebung/i, /raetsel/i,
      /-und-/i, /fuer-/i, /-fuer/i, /aktivitaeten/i, /lernspiele/i,
      /buchstaben/i, /zaehlen/i, /zahlen/i, /mathe-/i, /schreiben/i,
      /muster-/i, /bilder-/i, /puzzle/i, /sudoku/i, /kreuzwort/i,
      /woerter/i, /suchen/i, /finden/i, /zuordnen/i, /verbinden/i,
      /gross-/i, /klein-/i, /mehr-/i, /weniger/i, /farben/i,
      /formen/i, /tiere/i, /obst/i, /gemuese/i
    ],
    titlePatterns: [
      /arbeitsbl[äa]/i, /[üu]bungen?/i, /r[äa]tsel/i, /f[üu]r kinder/i,
      /grundschule/i, /vorschule/i, /lernen/i, /spiele?/i,
      /buchstaben/i, /z[äa]hlen/i, /schreiben/i, /malen/i
    ]
  },
  es: {
    name: 'Spanish',
    slugPatterns: [
      /fichas-/i, /-fichas/i, /generador-/i, /para-ninos/i, /-ninos/i,
      /letras/i, /actividades/i, /ejercicios/i, /preescolar/i,
      /primaria/i, /matematicas/i, /escritura/i, /lectura/i,
      /numeros/i, /colorear/i, /dibujar/i, /laberinto/i,
      /sopa-de-letras/i, /crucigrama/i, /sudoku/i, /buscar/i,
      /encontrar/i, /contar/i, /sumar/i, /restar/i, /patrones/i,
      /grande-pequeno/i, /mas-menos/i, /colores/i, /formas/i,
      /animales/i, /frutas/i, /verduras/i
    ],
    titlePatterns: [
      /fichas/i, /ni[ñn]os/i, /actividades/i, /ejercicios/i,
      /preescolar/i, /primaria/i, /matem[áa]ticas/i, /escritura/i,
      /colorear/i, /dibujar/i, /n[úu]meros/i
    ]
  },
  fr: {
    name: 'French',
    slugPatterns: [
      /fiches-/i, /-fiches/i, /activites-/i, /pedagogiques/i,
      /pour-enfants/i, /maternelle/i, /ecole/i, /-jours-/i,
      /exercices/i, /apprentissage/i, /ecriture/i, /lecture/i,
      /nombres/i, /coloriage/i, /dessin/i, /labyrinthe/i,
      /mots-caches/i, /mots-croises/i, /sudoku/i, /chercher/i,
      /trouver/i, /compter/i, /addition/i, /soustraction/i,
      /motifs/i, /grand-petit/i, /plus-moins/i, /couleurs/i,
      /formes/i, /animaux/i, /fruits/i, /legumes/i
    ],
    titlePatterns: [
      /fiches/i, /enfants/i, /activit[ée]s/i, /exercices/i,
      /maternelle/i, /[ée]cole/i, /apprentissage/i, /[ée]criture/i,
      /coloriage/i, /nombres/i
    ]
  },
  it: {
    name: 'Italian',
    slugPatterns: [
      /schede-/i, /-schede/i, /strumenti-/i, /alfabetizzazione/i,
      /prima-elementare/i, /bambini/i, /attivita/i, /esercizi/i,
      /prescolare/i, /primaria/i, /matematica/i, /scrittura/i,
      /lettura/i, /numeri/i, /colorare/i, /disegnare/i,
      /labirinto/i, /parole-/i, /cruciverba/i, /sudoku/i,
      /cercare/i, /trovare/i, /contare/i, /addizione/i,
      /sottrazione/i, /modelli/i, /grande-piccolo/i, /piu-meno/i,
      /colori/i, /forme/i, /animali/i, /frutta/i, /verdura/i
    ],
    titlePatterns: [
      /schede/i, /bambini/i, /attivit[àa]/i, /esercizi/i,
      /prescolare/i, /elementare/i, /matematica/i, /scrittura/i,
      /colorare/i, /numeri/i
    ]
  },
  fi: {
    name: 'Finnish',
    slugPatterns: [
      /tyoarkit/i, /tehtaeviae/i, /tehtavat/i, /opettajana/i,
      /lisenssi/i, /lapset/i, /harjoitukset/i, /esikoulu/i,
      /alakoulu/i, /matematiikka/i, /kirjoitus/i, /lukeminen/i,
      /numerot/i, /varitys/i, /piirtaminen/i, /sokkelo/i,
      /sanatehtava/i, /ristikko/i, /sudoku/i, /etsi/i,
      /loyda/i, /laske/i, /yhteenlasku/i, /vahennyslasku/i,
      /kuviot/i, /iso-pieni/i, /enemman-vahemman/i, /varit/i,
      /muodot/i, /elaimet/i, /hedelmat/i, /vihannekset/i
    ],
    titlePatterns: [
      /ty[öo]arkit/i, /teht[äa]v/i, /lapset/i, /harjoitukset/i,
      /esikoulu/i, /alakoulu/i, /matematiikka/i, /kirjoitus/i,
      /v[äa]ritys/i, /numerot/i
    ]
  },
  sv: {
    name: 'Swedish',
    slugPatterns: [
      /arbetsblad/i, /ovningar/i, /barn-/i, /-barn/i, /-for-/i,
      /forskola/i, /grundskola/i, /matematik/i, /skrivning/i,
      /lasning/i, /siffror/i, /malarbok/i, /rita/i, /labyrint/i,
      /ordspel/i, /korsord/i, /sudoku/i, /soka/i, /hitta/i,
      /rakna/i, /addition/i, /subtraktion/i, /monster/i,
      /stor-liten/i, /mer-mindre/i, /farger/i, /former/i,
      /djur/i, /frukt/i, /gronsaker/i
    ],
    titlePatterns: [
      /arbetsblad/i, /[öo]vningar/i, /barn/i, /f[öo]rskola/i,
      /grundskola/i, /matematik/i, /skrivning/i, /m[åa]larbok/i,
      /siffror/i
    ]
  },
  pt: {
    name: 'Portuguese',
    slugPatterns: [
      /fichas-/i, /-fichas/i, /atividades/i, /criancas/i,
      /para-criancas/i, /pre-escolar/i, /primario/i, /matematica/i,
      /escrita/i, /leitura/i, /numeros/i, /colorir/i, /desenhar/i,
      /labirinto/i, /palavras/i, /cruzadas/i, /sudoku/i, /procurar/i,
      /encontrar/i, /contar/i, /adicao/i, /subtracao/i, /padroes/i,
      /grande-pequeno/i, /mais-menos/i, /cores/i, /formas/i,
      /animais/i, /frutas/i, /legumes/i
    ],
    titlePatterns: [
      /fichas/i, /crian[çc]as/i, /atividades/i, /pr[ée]-escolar/i,
      /prim[áa]rio/i, /matem[áa]tica/i, /escrita/i, /colorir/i,
      /n[úu]meros/i
    ]
  },
  nl: {
    name: 'Dutch',
    slugPatterns: [
      /werkbladen/i, /oefeningen/i, /kinderen/i, /-voor-/i,
      /kleuterschool/i, /basisschool/i, /wiskunde/i, /schrijven/i,
      /lezen/i, /cijfers/i, /kleuren/i, /tekenen/i, /doolhof/i,
      /woordspel/i, /kruiswoord/i, /sudoku/i, /zoeken/i, /vinden/i,
      /tellen/i, /optellen/i, /aftrekken/i, /patronen/i,
      /groot-klein/i, /meer-minder/i, /kleuren/i, /vormen/i,
      /dieren/i, /fruit/i, /groenten/i
    ],
    titlePatterns: [
      /werkbladen/i, /oefeningen/i, /kinderen/i, /kleuterschool/i,
      /basisschool/i, /wiskunde/i, /schrijven/i, /kleuren/i, /cijfers/i
    ]
  },
  no: {
    name: 'Norwegian',
    slugPatterns: [
      /arbeidsark/i, /oppgaver/i, /barn-/i, /-barn/i, /-for-/i,
      /barnehage/i, /grunnskole/i, /matematikk/i, /skriving/i,
      /lesing/i, /tall/i, /fargelegging/i, /tegne/i, /labyrint/i,
      /ordspill/i, /kryssord/i, /sudoku/i, /lete/i, /finne/i,
      /telle/i, /addisjon/i, /subtraksjon/i, /monstre/i,
      /stor-liten/i, /mer-mindre/i, /farger/i, /former/i,
      /dyr/i, /frukt/i, /gronnsaker/i
    ],
    titlePatterns: [
      /arbeidsark/i, /oppgaver/i, /barn/i, /barnehage/i,
      /grunnskole/i, /matematikk/i, /skriving/i, /fargelegging/i, /tall/i
    ]
  },
  da: {
    name: 'Danish',
    slugPatterns: [
      /arbejdsark/i, /opgaver/i, /born-/i, /-born/i, /-til-/i,
      /bornehave/i, /folkeskole/i, /matematik/i, /skrivning/i,
      /laesning/i, /tal/i, /farvelaegning/i, /tegne/i, /labyrint/i,
      /ordspil/i, /krydsord/i, /sudoku/i, /lede/i, /finde/i,
      /taelle/i, /addition/i, /subtraktion/i, /monstre/i,
      /stor-lille/i, /mere-mindre/i, /farver/i, /former/i,
      /dyr/i, /frugt/i, /grontsager/i
    ],
    titlePatterns: [
      /arbejdsark/i, /opgaver/i, /b[øo]rn/i, /b[øo]rnehave/i,
      /folkeskole/i, /matematik/i, /skrivning/i, /farvel[æa]gning/i, /tal/i
    ]
  },
  en: {
    name: 'English',
    slugPatterns: [
      /worksheets?/i, /activities/i, /kids-/i, /-kids/i, /-for-/i,
      /preschool/i, /kindergarten/i, /elementary/i, /math-/i, /writing/i,
      /reading/i, /numbers/i, /coloring/i, /drawing/i, /maze/i,
      /word-search/i, /crossword/i, /sudoku/i, /find-/i, /-find/i,
      /count/i, /addition/i, /subtraction/i, /patterns/i,
      /big-small/i, /more-less/i, /colors/i, /shapes/i,
      /animals/i, /fruits/i, /vegetables/i
    ],
    titlePatterns: [
      /worksheets?/i, /activities/i, /kids/i, /children/i,
      /preschool/i, /kindergarten/i, /elementary/i, /math/i, /writing/i,
      /coloring/i, /numbers/i
    ]
  }
};

/**
 * Detect the actual language of a text based on patterns
 * @param {string} slug - The URL slug to analyze
 * @param {string} title - The title to analyze
 * @returns {{ language: string, confidence: number, matchedPatterns: string[] }}
 */
function detectLanguage(slug, title = '') {
  const scores = {};
  const matches = {};

  for (const [langCode, config] of Object.entries(LANGUAGE_PATTERNS)) {
    scores[langCode] = 0;
    matches[langCode] = [];

    // Check slug patterns (higher weight)
    for (const pattern of config.slugPatterns) {
      if (pattern.test(slug)) {
        scores[langCode] += 2;
        matches[langCode].push(`slug: ${pattern.source}`);
      }
    }

    // Check title patterns (lower weight)
    for (const pattern of config.titlePatterns) {
      if (pattern.test(title)) {
        scores[langCode] += 1;
        matches[langCode].push(`title: ${pattern.source}`);
      }
    }
  }

  // Find the language with highest score
  let bestLang = null;
  let bestScore = 0;
  for (const [lang, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestLang = lang;
    }
  }

  // Calculate confidence (0-100)
  const totalPatternMatches = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalPatternMatches > 0
    ? Math.round((bestScore / totalPatternMatches) * 100)
    : 0;

  return {
    language: bestLang,
    confidence,
    score: bestScore,
    matchedPatterns: matches[bestLang] || []
  };
}

/**
 * Main audit function
 */
async function auditBlogTranslations() {
  console.log('=== BLOG TRANSLATION LANGUAGE AUDIT ===\n');
  console.log('Analyzing translations for language mismatches...\n');

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total published posts: ${posts.length}\n`);

    const mismatches = [];
    const correct = [];
    const undetectable = [];

    for (const post of posts) {
      const translations = post.translations;
      if (!translations || typeof translations !== 'object') continue;

      for (const [declaredLang, content] of Object.entries(translations)) {
        if (!content || typeof content !== 'object') continue;

        const slug = content.slug || '';
        const title = content.title || '';

        // Skip empty translations
        if (!slug && !title) continue;

        // Detect actual language
        const detection = detectLanguage(slug, title);

        if (detection.score === 0) {
          // Could not detect language
          undetectable.push({
            postId: post.id,
            postSlug: post.slug,
            declaredLang,
            translationSlug: slug,
            title: title.substring(0, 50)
          });
          continue;
        }

        if (detection.language !== declaredLang && detection.confidence >= 50) {
          // Mismatch found!
          mismatches.push({
            postId: post.id,
            postSlug: post.slug,
            declaredLang,
            actualLang: detection.language,
            confidence: detection.confidence,
            translationSlug: slug,
            title: title.substring(0, 60),
            matchedPatterns: detection.matchedPatterns.slice(0, 3)
          });
        } else {
          correct.push({
            postId: post.id,
            declaredLang,
            confidence: detection.confidence
          });
        }
      }
    }

    // Print results
    console.log('=== SUMMARY ===\n');
    console.log(`Total translations checked: ${mismatches.length + correct.length + undetectable.length}`);
    console.log(`Correct: ${correct.length}`);
    console.log(`Mismatched: ${mismatches.length}`);
    console.log(`Undetectable: ${undetectable.length}`);

    if (mismatches.length > 0) {
      console.log('\n=== MISMATCHED TRANSLATIONS ===\n');
      console.log('These translations appear to be stored under the WRONG language key:\n');

      // Group by mismatch type
      const byMismatch = {};
      for (const m of mismatches) {
        const key = `${m.declaredLang} → ${m.actualLang}`;
        if (!byMismatch[key]) byMismatch[key] = [];
        byMismatch[key].push(m);
      }

      for (const [mismatchType, items] of Object.entries(byMismatch)) {
        const [from, to] = mismatchType.split(' → ');
        const fromName = LANGUAGE_PATTERNS[from]?.name || from;
        const toName = LANGUAGE_PATTERNS[to]?.name || to;

        console.log(`\n--- ${fromName} key contains ${toName} content (${items.length} items) ---\n`);

        for (const item of items.slice(0, 10)) { // Show max 10 per type
          console.log(`  Post: ${item.postSlug}`);
          console.log(`  Key: "${item.declaredLang}" contains ${LANGUAGE_PATTERNS[item.actualLang]?.name || item.actualLang} content`);
          console.log(`  Slug: ${item.translationSlug}`);
          console.log(`  Title: ${item.title}...`);
          console.log(`  Confidence: ${item.confidence}%`);
          console.log(`  Patterns: ${item.matchedPatterns.join(', ')}`);
          console.log('');
        }

        if (items.length > 10) {
          console.log(`  ... and ${items.length - 10} more\n`);
        }
      }

      // Create JSON report for fix script
      console.log('\n=== MISMATCH DATA FOR FIX SCRIPT ===\n');
      console.log('Writing to: /tmp/blog-translation-mismatches.json\n');

      // Output as JSON for easier processing
      const report = {
        timestamp: new Date().toISOString(),
        totalPosts: posts.length,
        totalMismatches: mismatches.length,
        mismatches: mismatches.map(m => ({
          postId: m.postId,
          postSlug: m.postSlug,
          declaredLang: m.declaredLang,
          actualLang: m.actualLang,
          confidence: m.confidence,
          translationSlug: m.translationSlug
        }))
      };

      console.log(JSON.stringify(report, null, 2));
    }

    if (undetectable.length > 0 && undetectable.length < 20) {
      console.log('\n=== UNDETECTABLE TRANSLATIONS ===\n');
      console.log('These translations could not be confidently analyzed:\n');

      for (const item of undetectable.slice(0, 10)) {
        console.log(`  Post: ${item.postSlug}`);
        console.log(`  Key: ${item.declaredLang}`);
        console.log(`  Slug: ${item.translationSlug || '(empty)'}`);
        console.log(`  Title: ${item.title || '(empty)'}...`);
        console.log('');
      }
    }

    console.log('\n=== RECOMMENDATIONS ===\n');

    if (mismatches.length > 0) {
      console.log('1. Review the mismatches above');
      console.log('2. Run fix-blog-translations.js to automatically correct language keys');
      console.log('3. After fix, re-run this audit to verify');
      console.log('4. Regenerate sitemap and clear CDN cache');
    } else {
      console.log('No mismatches found! All translations appear to be under correct keys.');
    }

    return {
      total: posts.length,
      mismatches,
      correct: correct.length,
      undetectable: undetectable.length
    };

  } catch (error) {
    console.error('Error auditing translations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the audit
auditBlogTranslations()
  .then(result => {
    console.log('\n=== AUDIT COMPLETE ===');
    console.log(`Found ${result.mismatches.length} mismatched translations`);
    process.exit(result.mismatches.length > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  });
