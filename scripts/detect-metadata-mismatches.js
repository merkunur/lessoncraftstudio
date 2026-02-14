/**
 * Detect language mismatches in blog post translations
 *
 * Checks every published blog post's translations to find cases where
 * the title/metaDescription language doesn't match the locale key.
 * e.g., Swedish title stored under translations.fr
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node ../scripts/detect-metadata-mismatches.js
 */

const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '../frontend/node_modules/@prisma/client'));

const prisma = new PrismaClient();
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Language-specific marker words (high-confidence indicators)
// Each list contains words that strongly indicate a specific language
const LANGUAGE_MARKERS = {
  en: ['the', 'and', 'for', 'with', 'your', 'how', 'worksheets', 'learning', 'children', 'guide', 'complete', 'educational', 'activities', 'printable', 'teaching', 'skills', 'practice', 'students', 'classroom', 'preschool'],
  de: ['und', 'die', 'der', 'das', 'den', 'ein', 'eine', 'mit', 'von', 'ist', 'sind', 'werden', 'haben', 'nicht', 'auch', 'kann', 'nach', 'wird', 'nur', 'noch', 'aber', 'oder', 'wenn', 'wie', 'kinder', 'lernen', 'schule', 'aufgaben', 'arbeitsbl'],
  fr: ['les', 'des', 'une', 'pour', 'dans', 'avec', 'qui', 'que', 'sur', 'est', 'sont', 'par', 'plus', 'peut', 'ses', 'mais', 'aux', 'cette', 'tout', 'leur', 'entre', 'aussi', 'nous', 'enfants', 'apprentissage', 'fiches', 'exercices', 'scolaire', 'complet'],
  es: ['los', 'las', 'una', 'del', 'para', 'con', 'que', 'por', 'como', 'pero', 'sus', 'son', 'esta', 'tiene', 'puede', 'desde', 'todo', 'hay', 'fue', 'fichas', 'hojas', 'aprendizaje', 'completa', 'actividades', 'ejercicios'],
  pt: ['uma', 'dos', 'das', 'para', 'com', 'que', 'por', 'como', 'mas', 'seus', 'sua', 'tem', 'pode', 'mais', 'este', 'esta', 'todo', 'fichas', 'folhas', 'aprendizagem', 'completo', 'atividades'],
  it: ['gli', 'dei', 'una', 'per', 'con', 'che', 'sono', 'dal', 'del', 'dalla', 'nella', 'alla', 'questo', 'questa', 'anche', 'come', 'tutto', 'suo', 'sua', 'molto', 'schede', 'didattiche', 'apprendimento', 'completa', 'bambini'],
  nl: ['het', 'een', 'van', 'dat', 'met', 'zijn', 'voor', 'niet', 'ook', 'dit', 'maar', 'wel', 'nog', 'bij', 'kan', 'haar', 'hun', 'deze', 'wordt', 'werkbladen', 'leren', 'kinderen', 'compleet', 'oefeningen'],
  sv: ['och', 'att', 'det', 'som', 'den', 'har', 'med', 'kan', 'inte', 'vara', 'till', 'alla', 'sin', 'sitt', 'sina', 'hade', 'blev', 'ska', 'hur', 'arbetsblad', 'komplett', 'aktiviteter', 'pedagogiska', 'barnen'],
  da: ['og', 'det', 'som', 'den', 'har', 'med', 'kan', 'ikke', 'til', 'alle', 'sin', 'sit', 'sine', 'blev', 'skal', 'hvad', 'hvor', 'arbejdsark', 'komplet', 'aktiviteter', 'undervisning', 'opgaver'],
  no: ['og', 'det', 'som', 'den', 'har', 'med', 'kan', 'ikke', 'til', 'alle', 'sin', 'sitt', 'sine', 'ble', 'skal', 'hva', 'hvor', 'arbeidsark', 'komplett', 'aktiviteter', 'undervisning', 'oppgaver'],
  fi: ['ja', 'on', 'ei', 'se', 'oli', 'ovat', 'voi', 'kun', 'kanssa', 'mutta', 'ovat', 'niin', 'kuin', 'olla', 'ovat', 'tama', 'ihan', 'myos', 'seka', 'tehtavat', 'oppiminen', 'lapset', 'harjoitukset', 'tyoarkit'],
};

// Characters strongly associated with specific languages (when found in titles)
const CHAR_PATTERNS = {
  sv: /[a-z]*[^a-z\u00e4\u00f6\u00fc\u00df]*\b(och|att|det|som|den|arbetsblad|pedagogisk|komplett|aktivitet)\b/i,
  da: /\b(og|det|som|den|arbejdsark|komplet|opgaver|undervisning)\b/i,
  no: /\b(og|det|som|den|arbeidsark|komplett|oppgaver|undervisning)\b/i,
  fi: /\b(ja|on|ei|ovat|kanssa|mutta|tehtavat|oppiminen|tyoarkit)\b/i,
};

/**
 * Detect the most likely language of a text string
 * Returns { language, confidence, scores }
 */
function detectLanguage(text) {
  if (!text || text.length < 10) return { language: 'unknown', confidence: 0, scores: {} };

  const lower = text.toLowerCase();
  // Split on word boundaries, keeping only actual words
  const words = lower.split(/[\s\-\u2013\u2014:;,.!?()\[\]{}'"\/\\|]+/).filter(w => w.length > 1);

  const scores = {};

  for (const [lang, markers] of Object.entries(LANGUAGE_MARKERS)) {
    let score = 0;
    for (const marker of markers) {
      // Check if the marker appears as a word in the text
      if (words.includes(marker)) {
        score++;
      }
    }
    scores[lang] = score;
  }

  // Find the best match
  let bestLang = 'unknown';
  let bestScore = 0;
  let secondBest = 0;

  for (const [lang, score] of Object.entries(scores)) {
    if (score > bestScore) {
      secondBest = bestScore;
      bestLang = lang;
      bestScore = score;
    } else if (score > secondBest) {
      secondBest = score;
    }
  }

  // Confidence is how much better the best match is vs second best
  const confidence = bestScore > 0 ? (bestScore - secondBest) / bestScore : 0;

  return { language: bestLang, confidence, scores, bestScore };
}

/**
 * Check if a Scandinavian language is confused for another
 * (sv/da/no share many words, so we look at distinctive differences)
 */
function disambiguateScandinavian(text, detectedLang) {
  if (!['sv', 'da', 'no'].includes(detectedLang)) return detectedLang;

  const lower = text.toLowerCase();

  // Swedish-specific patterns
  const svPatterns = /\b(och|att|inte|alla|arbetsblad|pedagogisk|skola|barn)\b/i;
  // Danish-specific patterns
  const daPatterns = /\b(ikke|alle|arbejdsark|undervisning|skole|b\u00f8rn)\b/i;
  // Norwegian-specific patterns
  const noPatterns = /\b(ikke|alle|arbeidsark|undervisning|skole|barn)\b/i;

  const svScore = (lower.match(svPatterns) || []).length;
  const daScore = (lower.match(daPatterns) || []).length;
  const noScore = (lower.match(noPatterns) || []).length;

  if (svScore > daScore && svScore > noScore) return 'sv';
  if (daScore > svScore && daScore > noScore) return 'da';
  if (noScore > svScore && noScore > daScore) return 'no';

  return detectedLang;
}

async function main() {
  console.log('=== Blog Post Language Mismatch Detector ===\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
      updatedAt: true,
    },
    orderBy: { slug: 'asc' },
  });

  console.log(`Found ${posts.length} published blog posts\n`);

  const mismatches = [];
  let totalChecked = 0;
  let totalSkipped = 0;

  for (const post of posts) {
    const translations = post.translations;
    if (!translations || typeof translations !== 'object') continue;

    for (const locale of LOCALES) {
      const trans = translations[locale];
      if (!trans) continue;

      const title = trans.title || '';
      const metaTitle = trans.metaTitle || '';
      const metaDescription = trans.metaDescription || '';
      const slug = trans.slug || '';

      // Use the longest text for better detection
      const textToCheck = [title, metaTitle, metaDescription].sort((a, b) => b.length - a.length)[0];

      if (!textToCheck || textToCheck.length < 15) {
        totalSkipped++;
        continue;
      }

      totalChecked++;

      // Detect language of the title
      const titleDetection = detectLanguage(title);
      // Also check metaDescription for more confidence
      const descDetection = detectLanguage(metaDescription);

      // Use title detection as primary, description as confirmation
      let detectedLang = titleDetection.language;
      if (titleDetection.bestScore < 2 && descDetection.bestScore > titleDetection.bestScore) {
        detectedLang = descDetection.language;
      }

      // Disambiguate Scandinavian if needed
      detectedLang = disambiguateScandinavian(title + ' ' + metaDescription, detectedLang);

      // Check for mismatch
      if (detectedLang !== 'unknown' && detectedLang !== locale) {
        // Skip low-confidence detections
        if (titleDetection.bestScore < 2 && descDetection.bestScore < 2) continue;

        // Scandinavian languages share many words - require higher confidence
        const scandinavian = ['sv', 'da', 'no'];
        if (scandinavian.includes(locale) && scandinavian.includes(detectedLang)) {
          if (titleDetection.bestScore < 4 && descDetection.bestScore < 4) continue;
        }

        mismatches.push({
          postSlug: post.slug,
          postId: post.id,
          locale,
          expectedLanguage: locale,
          detectedLanguage: detectedLang,
          titleConfidence: titleDetection.confidence,
          titleScore: titleDetection.bestScore,
          title: title.substring(0, 100),
          metaDescription: metaDescription.substring(0, 100),
          slug,
        });
      }
    }
  }

  // Report results
  console.log(`Checked: ${totalChecked} translations (${totalSkipped} skipped due to short text)\n`);

  if (mismatches.length === 0) {
    console.log('\u2705 No language mismatches detected!\n');
    console.log('All translations appear to be in their correct locale language.');
  } else {
    console.log(`\u26a0\ufe0f  Found ${mismatches.length} potential language mismatches:\n`);

    // Group by severity
    const highConf = mismatches.filter(m => m.titleScore >= 4);
    const medConf = mismatches.filter(m => m.titleScore >= 2 && m.titleScore < 4);

    if (highConf.length > 0) {
      console.log(`--- HIGH CONFIDENCE MISMATCHES (${highConf.length}) ---\n`);
      for (const m of highConf) {
        console.log(`  Post: ${m.postSlug}`);
        console.log(`  Locale key: ${m.locale} (expected ${m.expectedLanguage})`);
        console.log(`  Detected: ${m.detectedLanguage} (score: ${m.titleScore})`);
        console.log(`  Title: "${m.title}"`);
        console.log(`  Slug: ${m.slug}`);
        console.log('');
      }
    }

    if (medConf.length > 0) {
      console.log(`--- MEDIUM CONFIDENCE MISMATCHES (${medConf.length}) ---\n`);
      for (const m of medConf) {
        console.log(`  Post: ${m.postSlug}`);
        console.log(`  Locale key: ${m.locale} (expected ${m.expectedLanguage})`);
        console.log(`  Detected: ${m.detectedLanguage} (score: ${m.titleScore})`);
        console.log(`  Title: "${m.title}"`);
        console.log('');
      }
    }

    // Output as JSON for potential automated fixing
    const fs = require('fs');
    const outputPath = path.join(__dirname, 'metadata-mismatches.json');
    fs.writeFileSync(outputPath, JSON.stringify(mismatches, null, 2));
    console.log(`\nFull results saved to: ${outputPath}`);

    // Generate SQL hints
    if (highConf.length > 0) {
      console.log('\n--- SUGGESTED ACTIONS ---\n');
      console.log('For each mismatch, verify manually then run:');
      console.log('');
      for (const m of highConf) {
        console.log(`-- Post "${m.postSlug}" locale "${m.locale}" has ${m.detectedLanguage} content`);
        console.log(`-- Verify: SELECT translations->'${m.locale}'->'title' FROM blog_posts WHERE slug = '${m.postSlug}';`);
        console.log(`-- If confirmed wrong, update via content manager or Prisma script`);
        console.log('');
      }
    }
  }

  // Also check for duplicate titles across locales (copy-paste errors)
  console.log('\n=== Duplicate Title Check ===\n');
  let dupCount = 0;
  for (const post of posts) {
    const translations = post.translations;
    if (!translations) continue;

    const titleToLocales = {};
    for (const locale of LOCALES) {
      const trans = translations[locale];
      if (!trans || !trans.title) continue;
      const title = trans.title.trim();
      if (!titleToLocales[title]) titleToLocales[title] = [];
      titleToLocales[title].push(locale);
    }

    for (const [title, locales] of Object.entries(titleToLocales)) {
      if (locales.length > 1) {
        // Only flag if one of the locales is NOT English (same English title in en+other is suspicious)
        const hasNonEn = locales.some(l => l !== 'en');
        const hasEn = locales.includes('en');
        if (hasNonEn) {
          dupCount++;
          console.log(`  Post: ${post.slug}`);
          console.log(`  Same title in: ${locales.join(', ')}`);
          console.log(`  Title: "${title.substring(0, 80)}"`);
          console.log('');
        }
      }
    }
  }

  if (dupCount === 0) {
    console.log('\u2705 No duplicate titles across locales.\n');
  } else {
    console.log(`Found ${dupCount} posts with duplicate titles across locales.\n`);
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error('Error:', e);
  await prisma.$disconnect();
  process.exit(1);
});
