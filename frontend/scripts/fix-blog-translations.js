/**
 * Fix Script: Correct language mismatches in blog post translations
 *
 * This script remaps translations that are stored under incorrect language keys.
 * It handles language detection with special care for similar languages.
 *
 * Usage:
 *   node scripts/fix-blog-translations.js --dry-run   # Preview changes
 *   node scripts/fix-blog-translations.js --apply     # Apply fixes
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--apply');
const VERBOSE = args.includes('--verbose');

// Similar language pairs where detection is unreliable
const SIMILAR_PAIRS = new Set([
  'no-da', 'da-no',  // Norwegian and Danish are very similar
  'sv-no', 'no-sv',  // Swedish and Norwegian share many words
  'sv-da', 'da-sv',  // Swedish and Danish share many words
  'pt-es', 'es-pt',  // Portuguese and Spanish are similar
]);

// Language detection with unique markers - more specific patterns
const UNIQUE_MARKERS = {
  de: {
    name: 'German',
    // German has VERY unique patterns
    strongPatterns: [
      /arbeitsblaetter/i, /vorschule/i, /grundschule/i, /uebungen/i,
      /raetsel/i, /aktivitaeten/i, /fuer-kinder/i, /lernspiele/i,
      /buchstaben/i, /zaehlen/i, /feinmotorik/i, /arbeitsblatt/i,
      /schreiben/i, /-und-/i, /mathe-/i, /malen/i, /ausmalen/i,
      /wort-/i, /woerter/i, /suchen/i, /finden/i, /gross-/i, /klein-/i,
      /mehr-/i, /weniger/i, /muster-/i, /bilder-/i, /form-/i, /farb-/i,
      /kreuzwort/i, /kryptogramm/i, /schattenbilder/i, /praepositionen/i
    ]
  },
  es: {
    name: 'Spanish',
    strongPatterns: [
      /fichas-de-/i, /para-ninos/i, /generador-de-/i, /sopa-de-letras/i,
      /actividades-de-/i, /preescolar/i, /primaria/i, /ejercicios/i,
      /colorear/i, /numeros/i, /letras/i, /matematicas/i, /laberinto/i,
      /crucigrama/i, /contar/i, /sumar/i, /restar/i, /patrones/i,
      /grande-pequeno/i, /mas-menos/i, /sombras/i, /preposi/i
    ]
  },
  fr: {
    name: 'French',
    strongPatterns: [
      /fiches-de-/i, /pour-enfants/i, /maternelle/i, /activites-/i,
      /pedagogiques/i, /exercices/i, /jours-d/i, /ecole/i,
      /coloriage/i, /nombres/i, /lettres/i, /maths/i, /labyrinthe/i,
      /mots-caches/i, /mots-croises/i, /compter/i, /addition/i,
      /soustraction/i, /motifs/i, /grand-petit/i, /plus-moins/i
    ]
  },
  it: {
    name: 'Italian',
    strongPatterns: [
      /schede-di-/i, /per-bambini/i, /prima-elementare/i, /attivita-/i,
      /prescolare/i, /esercizi/i, /alfabetizzazione/i, /strumenti/i,
      /colorare/i, /numeri/i, /lettere/i, /matematica/i, /labirinto/i,
      /parole-crociate/i, /cruciverba/i, /contare/i, /addizione/i,
      /sottrazione/i, /modelli/i, /grande-piccolo/i, /piu-meno/i
    ]
  },
  fi: {
    name: 'Finnish',
    strongPatterns: [
      /tyoarkit/i, /tehtaev/i, /opettajana/i, /harjoitukset/i,
      /esikoulu/i, /alakoulu/i, /matematiikka/i, /kirjoitus/i,
      /varitys/i, /numerot/i, /kirjaimet/i, /laske/i, /sokkelo/i,
      /sanaristikko/i, /yhteenlasku/i, /vahennyslasku/i, /kuviot/i,
      /iso-pieni/i, /enemman-/i, /vahemman/i, /lapset/i, /lisenssi/i
    ]
  },
  sv: {
    name: 'Swedish',
    strongPatterns: [
      /arbetsblad-/i, /ovningar-/i, /forskola/i, /grundskola/i,
      /matematik/i, /skrivning/i, /malarbok/i, /siffror/i,
      /bokstaver/i, /rakna/i, /labyrint/i, /korsord/i,
      /addition/i, /subtraktion/i, /monster-/i, /stor-liten/i,
      /mer-mindre/i, /farger/i, /former/i
    ]
  },
  pt: {
    name: 'Portuguese',
    strongPatterns: [
      /fichas-de-/i, /para-criancas/i, /pre-escolar/i, /atividades-/i,
      /primario/i, /exercicios/i, /colorir/i, /numeros/i,
      /letras/i, /matematica/i, /labirinto/i, /caca-palavras/i,
      /palavras-cruzadas/i, /contar/i, /adicao/i, /subtracao/i,
      /padroes/i, /grande-pequeno/i, /mais-menos/i, /geradores?-de/i
    ]
  },
  nl: {
    name: 'Dutch',
    strongPatterns: [
      /werkbladen-/i, /oefeningen-/i, /kinderen/i, /kleuterschool/i,
      /basisschool/i, /wiskunde/i, /schrijven/i, /kleuren/i,
      /cijfers/i, /letters/i, /tellen/i, /doolhof/i, /woordzoeker/i,
      /kruiswoord/i, /optellen/i, /aftrekken/i, /patronen/i,
      /groot-klein/i, /meer-minder/i, /vormen/i
    ]
  },
  no: {
    name: 'Norwegian',
    strongPatterns: [
      /arbeidsark-/i, /oppgaver-/i, /barnehage/i, /grunnskole/i,
      /matematikk/i, /skriving/i, /fargelegging/i, /tall/i,
      /bokstaver/i, /labyrint/i, /kryssord/i, /addisjon/i,
      /subtraksjon/i, /monstre/i, /stor-liten/i, /mer-mindre/i
    ]
  },
  da: {
    name: 'Danish',
    strongPatterns: [
      /arbejdsark-/i, /opgaver-/i, /bornehave/i, /folkeskole/i,
      /matematik/i, /skrivning/i, /farvelaegning/i, /taelle/i,
      /bogstaver/i, /labyrint/i, /krydsord/i, /addition/i,
      /subtraktion/i, /monstre/i, /stor-lille/i, /mere-mindre/i
    ]
  },
  en: {
    name: 'English',
    strongPatterns: [
      /worksheets?-/i, /for-kids/i, /preschool/i, /kindergarten/i,
      /elementary/i, /activities/i, /exercises/i, /coloring/i,
      /numbers/i, /letters/i, /counting/i, /maze/i, /word-search/i,
      /crossword/i, /addition/i, /subtraction/i, /patterns/i,
      /big-small/i, /more-less/i, /shapes/i, /colors/i
    ]
  }
};

/**
 * Detect language with high confidence using unique markers
 */
function detectLanguage(slug, title = '') {
  const text = `${slug} ${title}`.toLowerCase();
  const scores = {};

  for (const [lang, config] of Object.entries(UNIQUE_MARKERS)) {
    scores[lang] = 0;
    for (const pattern of config.strongPatterns) {
      if (pattern.test(text)) {
        scores[lang] += 10; // Each strong pattern match is worth 10 points
      }
    }
  }

  // Find best match
  let best = null;
  let bestScore = 0;
  let secondBestScore = 0;

  for (const [lang, score] of Object.entries(scores)) {
    if (score > bestScore) {
      secondBestScore = bestScore;
      bestScore = score;
      best = lang;
    } else if (score > secondBestScore) {
      secondBestScore = score;
    }
  }

  // Confidence is higher when there's a clear winner
  const confidence = bestScore > 0 && secondBestScore === 0 ? 100 :
    bestScore > 0 ? Math.round(((bestScore - secondBestScore) / bestScore) * 100) : 0;

  return { language: best, score: bestScore, confidence };
}

/**
 * Check if a correction should be applied
 */
function shouldFix(declaredLang, detectedLang, confidence, slug) {
  // Don't fix if no detection
  if (!detectedLang || confidence < 40) return false;

  // Don't fix similar language pairs
  const pair = `${declaredLang}-${detectedLang}`;
  if (SIMILAR_PAIRS.has(pair)) {
    if (VERBOSE) {
      console.log(`  Skipping similar pair: ${pair} for ${slug}`);
    }
    return false;
  }

  // Don't fix English with low confidence (English words appear in many languages)
  if (detectedLang === 'en' && confidence < 60) return false;

  // Fix clear language family mismatches
  // Germanic: en, de, nl, sv, no, da
  // Romance: es, pt, fr, it
  // Uralic: fi

  const germanic = new Set(['en', 'de', 'nl', 'sv', 'no', 'da']);
  const romance = new Set(['es', 'pt', 'fr', 'it']);

  const declaredFamily = germanic.has(declaredLang) ? 'germanic' :
    romance.has(declaredLang) ? 'romance' : 'other';
  const detectedFamily = germanic.has(detectedLang) ? 'germanic' :
    romance.has(detectedLang) ? 'romance' : 'other';

  // Cross-family mismatch = very likely a real error
  if (declaredFamily !== detectedFamily) {
    return true;
  }

  // Same family but different languages with high confidence
  if (confidence >= 70) {
    return true;
  }

  return false;
}

/**
 * Main fix function
 */
async function fixBlogTranslations() {
  console.log('=== BLOG TRANSLATION FIX ===\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'APPLY CHANGES'}\n`);

  if (!DRY_RUN) {
    console.log('WARNING: This will modify the database!');
    console.log('A backup will be created in /tmp/blog-translations-backup.json\n');
  }

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total published posts: ${posts.length}\n`);

    // Backup original data
    if (!DRY_RUN) {
      const backup = posts.map(p => ({
        id: p.id,
        slug: p.slug,
        translations: p.translations
      }));
      fs.writeFileSync('/tmp/blog-translations-backup.json', JSON.stringify(backup, null, 2));
      console.log('Backup saved to /tmp/blog-translations-backup.json\n');
    }

    const fixes = [];
    const skipped = [];

    for (const post of posts) {
      const translations = post.translations;
      if (!translations || typeof translations !== 'object') continue;

      const postFixes = [];

      for (const [declaredLang, content] of Object.entries(translations)) {
        if (!content || typeof content !== 'object') continue;

        const slug = content.slug || '';
        const title = content.title || '';

        if (!slug && !title) continue;

        const detection = detectLanguage(slug, title);

        if (detection.language &&
            detection.language !== declaredLang &&
            shouldFix(declaredLang, detection.language, detection.confidence, slug)) {
          postFixes.push({
            from: declaredLang,
            to: detection.language,
            confidence: detection.confidence,
            slug,
            content
          });
        }
      }

      if (postFixes.length > 0) {
        fixes.push({
          postId: post.id,
          postSlug: post.slug,
          originalTranslations: { ...translations },
          fixes: postFixes
        });
      }
    }

    // Print summary
    console.log('=== FIXES TO APPLY ===\n');
    console.log(`Total posts with fixes: ${fixes.length}`);
    console.log(`Total translation fixes: ${fixes.reduce((sum, f) => sum + f.fixes.length, 0)}\n`);

    // Group by fix type
    const byType = {};
    for (const fix of fixes) {
      for (const f of fix.fixes) {
        const key = `${f.from} → ${f.to}`;
        if (!byType[key]) byType[key] = [];
        byType[key].push({ ...f, postSlug: fix.postSlug });
      }
    }

    for (const [type, items] of Object.entries(byType)) {
      const [from, to] = type.split(' → ');
      console.log(`\n--- ${UNIQUE_MARKERS[from]?.name || from} → ${UNIQUE_MARKERS[to]?.name || to} (${items.length}) ---\n`);

      for (const item of items.slice(0, 5)) {
        console.log(`  Post: ${item.postSlug}`);
        console.log(`  Slug: ${item.slug}`);
        console.log(`  Confidence: ${item.confidence}%`);
        console.log('');
      }
      if (items.length > 5) {
        console.log(`  ... and ${items.length - 5} more\n`);
      }
    }

    // Apply fixes
    if (!DRY_RUN && fixes.length > 0) {
      console.log('\n=== APPLYING FIXES ===\n');

      let successCount = 0;
      let errorCount = 0;

      for (const fix of fixes) {
        try {
          // Build new translations object
          const newTranslations = { ...fix.originalTranslations };

          for (const f of fix.fixes) {
            // Move content from wrong key to correct key
            // If correct key already has content, we skip to avoid data loss
            if (newTranslations[f.to] && newTranslations[f.to].slug) {
              console.log(`  Skipping ${fix.postSlug}: ${f.to} already has content`);
              continue;
            }

            // Move the content
            newTranslations[f.to] = f.content;
            delete newTranslations[f.from];
          }

          // Update database
          await prisma.blogPost.update({
            where: { id: fix.postId },
            data: { translations: newTranslations }
          });

          successCount++;
          console.log(`  Fixed: ${fix.postSlug}`);

        } catch (error) {
          errorCount++;
          console.error(`  Error fixing ${fix.postSlug}:`, error.message);
        }
      }

      console.log(`\nCompleted: ${successCount} fixed, ${errorCount} errors`);
    }

    // Final summary
    console.log('\n=== SUMMARY ===\n');

    if (DRY_RUN) {
      console.log('DRY RUN complete. No changes were made.');
      console.log(`\nTo apply these ${fixes.reduce((sum, f) => sum + f.fixes.length, 0)} fixes, run:`);
      console.log('  node scripts/fix-blog-translations.js --apply\n');
    } else {
      console.log('Fixes applied successfully!');
      console.log('\nNext steps:');
      console.log('1. Run the audit again to verify: node scripts/audit-blog-translations.js');
      console.log('2. Regenerate sitemap: curl -X POST https://www.lessoncraftstudio.com/api/sitemap/regenerate');
      console.log('3. Clear CDN cache if applicable');
    }

    return {
      totalPosts: posts.length,
      totalFixes: fixes.reduce((sum, f) => sum + f.fixes.length, 0),
      fixes
    };

  } catch (error) {
    console.error('Error fixing translations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run
fixBlogTranslations()
  .then(result => {
    console.log('\n=== FIX SCRIPT COMPLETE ===');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fix script failed:', error);
    process.exit(1);
  });
