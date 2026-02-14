/**
 * Part 1: Blog Database Slug Completeness Audit
 *
 * Connects to the production database, fetches all published blog posts,
 * and checks every locale's slug for completeness and correctness.
 *
 * Issue types detected:
 *   MISSING          - translation exists (title+content) but slug is falsy
 *   ENGLISH_FALLBACK - non-English locale's slug === post.slug (primary/English)
 *   WRONG_LANGUAGE   - slug words match a different language more than expected
 *   DUPLICATE        - same slug used by multiple locales or different posts
 *
 * Usage (run from frontend directory on server):
 *   cd /opt/lessoncraftstudio/frontend
 *   NODE_PATH=./node_modules node ../scripts/audit-blog-slug-completeness.js
 *
 * Output: ../docs/audit-results/blog-slug-completeness.json
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

// =====================================================================
// SLUG-SPECIFIC LANGUAGE PROFILES
// =====================================================================
// Slugs are ASCII, hyphenated, transliterated. These word lists contain
// distinctive words that appear in slugs for each language. Words shared
// across many languages (e.g. "pdf", "app") are excluded.
//
// Borrowed from audit-blog-languages.js LANG_PROFILES but adapted for
// slugs: accented chars are transliterated (ae, oe, ue, etc.)

const SLUG_LANG_PROFILES = {
  en: [
    'the', 'and', 'for', 'with', 'your', 'from', 'that', 'this',
    'worksheets', 'worksheet', 'teacher', 'teachers', 'student', 'students',
    'learning', 'classroom', 'skills', 'education', 'practice', 'children',
    'activities', 'printable', 'download', 'free', 'grade', 'lesson',
    'complete', 'guide', 'using', 'create', 'custom', 'best',
    'how', 'why', 'what', 'tips', 'ideas', 'fun',
    'reading', 'writing', 'math', 'counting', 'addition', 'subtraction',
    'multiplication', 'division', 'shapes', 'colors', 'alphabet',
    'kindergarten', 'preschool', 'elementary', 'school',
    'tracing', 'coloring', 'matching', 'sorting',
  ],
  de: [
    'und', 'fuer', 'mit', 'von', 'das', 'die', 'der', 'den', 'ein', 'eine',
    'arbeitsblaetter', 'arbeitsblatt', 'schueler', 'schuelerinnen',
    'lehrer', 'unterricht', 'mathematik', 'lernen', 'kinder',
    'uebungen', 'grundschule', 'klasse', 'aufgaben',
    'vollstaendiger', 'leitfaden', 'erstellen', 'besten',
    'rechnen', 'zahlen', 'buchstaben', 'lesen', 'schreiben',
    'malen', 'vorschule', 'schule', 'kindergarten',
    'kostenlos', 'druckbare', 'ideen', 'tipps',
    'nachspuren', 'zuordnen', 'sortieren', 'formen', 'farben',
  ],
  fr: [
    'les', 'des', 'pour', 'avec', 'dans', 'sur', 'une',
    'fiches', 'exercices', 'eleves', 'enseignants',
    'apprentissage', 'mathematiques', 'enfants', 'classe',
    'activites', 'telecharger', 'gratuit',
    'complet', 'creer', 'meilleurs',
    'lecture', 'ecriture', 'nombres', 'addition', 'soustraction',
    'multiplication', 'formes', 'couleurs',
    'maternelle', 'primaire', 'ecole',
    'tracage', 'coloriage', 'correspondance', 'tri',
    'lettres', 'comptage', 'jeux',
  ],
  es: [
    'los', 'las', 'para', 'con', 'del', 'una',
    'hojas', 'trabajo', 'alumnos', 'estudiantes', 'profesores',
    'aprendizaje', 'matematicas', 'ninos', 'ejercicios',
    'actividades', 'descargar', 'gratuito',
    'completa', 'guia', 'crear', 'mejores',
    'lectura', 'escritura', 'numeros', 'suma', 'resta',
    'multiplicacion', 'formas', 'colores',
    'preescolar', 'primaria', 'escuela',
    'trazado', 'colorear', 'clasificacion',
    'letras', 'conteo', 'juegos',
  ],
  pt: [
    'dos', 'das', 'para', 'com', 'uma',
    'fichas', 'trabalho', 'alunos', 'professores',
    'aprendizagem', 'matematica', 'criancas', 'exercicios',
    'ensino', 'atividades', 'baixar',
    'completo', 'guia', 'criar', 'melhores',
    'leitura', 'escrita', 'numeros', 'adicao', 'subtracao',
    'multiplicacao', 'formas', 'cores',
    'pre-escolar', 'primaria', 'escola',
    'tracado', 'colorir', 'classificacao',
    'letras', 'contagem', 'jogos',
  ],
  it: [
    'gli', 'dei', 'delle', 'nel', 'nella', 'dei', 'con', 'una',
    'schede', 'lavoro', 'alunni', 'insegnanti',
    'apprendimento', 'matematica', 'bambini', 'esercizi',
    'lezione', 'attivita', 'scaricare', 'gratuito',
    'completa', 'creare', 'migliori',
    'lettura', 'scrittura', 'numeri', 'addizione', 'sottrazione',
    'moltiplicazione', 'forme', 'colori',
    'prescolare', 'primaria', 'scuola',
    'tracciamento', 'colorare', 'abbinamento', 'ordinamento',
    'lettere', 'conteggio', 'giochi',
  ],
  nl: [
    'het', 'een', 'van', 'voor', 'met', 'bij', 'naar',
    'werkbladen', 'werkblad', 'leerlingen', 'leraren',
    'onderwijs', 'leren', 'wiskunde', 'kinderen', 'oefeningen',
    'activiteiten', 'downloaden', 'gratis',
    'volledige', 'gids', 'maken', 'beste',
    'lezen', 'schrijven', 'getallen', 'optellen', 'aftrekken',
    'vermenigvuldigen', 'vormen', 'kleuren',
    'kleuterschool', 'basisschool', 'school',
    'overtrekken', 'kleuren', 'sorteren',
    'letters', 'tellen', 'spelletjes',
  ],
  sv: [
    'och', 'foer', 'for', 'med', 'till', 'fraan', 'att',
    'arbetsblad', 'elever', 'laerare', 'undervisning',
    'laerande', 'matematik', 'barn', 'oevningar',
    'aktiviteter', 'ladda', 'gratis',
    'komplett', 'guide', 'skapa', 'baesta',
    'laesning', 'skrivning', 'siffror', 'addition', 'subtraktion',
    'multiplikation', 'former', 'faerger',
    'foerskola', 'grundskola', 'skola',
    'spaarning', 'faerglaegga', 'matchning', 'sortering',
    'bokstaever', 'raekning', 'spel',
  ],
  da: [
    'og', 'for', 'til', 'med', 'fra', 'denne',
    'arbejdsark', 'elever', 'laerere', 'undervisning',
    'laering', 'matematik', 'boern', 'opgaver',
    'aktiviteter', 'downloade', 'gratis',
    'komplet', 'bedste', 'opret',
    'laesning', 'skrivning', 'tal', 'addition', 'subtraktion',
    'multiplikation', 'former', 'farver',
    'boernehave', 'grundskole', 'skole',
    'sporing', 'farvelaegning', 'matchning', 'sortering',
    'bogstaver', 'taelling', 'spil',
  ],
  no: [
    'og', 'for', 'til', 'med', 'fra', 'denne',
    'arbeidsark', 'elever', 'laerere', 'undervisning',
    'laering', 'matematikk', 'barn', 'oppgaver',
    'aktiviteter', 'laste', 'gratis',
    'komplett', 'beste', 'lage',
    'lesing', 'skriving', 'tall', 'addisjon', 'subtraksjon',
    'multiplikasjon', 'former', 'farger',
    'barnehage', 'grunnskole', 'skole',
    'sporing', 'fargelegging', 'matching', 'sortering',
    'bokstaver', 'telling', 'spill',
  ],
  fi: [
    'ja', 'tai', 'kun', 'jos',
    'tehtavat', 'tehtava', 'oppilaat', 'oppilaiden',
    'opettajat', 'opettajille', 'opetus', 'oppiminen',
    'matematiikka', 'lapset', 'harjoitukset',
    'tyolehtia', 'tyolehti', 'koulutus',
    'toimintaa', 'lataa', 'ilmainen',
    'taydellinen', 'opas', 'luoda', 'parhaat',
    'lukeminen', 'kirjoittaminen', 'numerot', 'yhteenlasku', 'vahennyslasku',
    'kertolasku', 'muodot', 'varit',
    'esikoulu', 'peruskoulu', 'koulu',
    'jaljentaminen', 'varitys', 'lajittelu',
    'kirjaimet', 'laskeminen', 'pelit',
  ],
};

// =====================================================================
// PRECOMPUTE SLUG-WORD-TO-LANGUAGES MAP
// =====================================================================

const slugWordToLangs = new Map();
for (const [lang, words] of Object.entries(SLUG_LANG_PROFILES)) {
  for (const word of words) {
    const normalized = word.toLowerCase();
    if (!slugWordToLangs.has(normalized)) {
      slugWordToLangs.set(normalized, []);
    }
    const list = slugWordToLangs.get(normalized);
    if (!list.includes(lang)) list.push(lang);
  }
}

// =====================================================================
// SLUG LANGUAGE DETECTION
// =====================================================================

/**
 * Extract words from a hyphenated slug
 */
function slugWords(slug) {
  if (!slug) return [];
  return slug.toLowerCase().split(/-+/).filter(w => w.length > 1);
}

/**
 * Score slug words against all language profiles.
 * Uses 1/N weighted scoring (same as audit-blog-languages.js).
 * Returns top language and confidence.
 */
function scoreSlugLanguage(slug) {
  const words = slugWords(slug);
  if (words.length === 0) return { topLang: null, confidence: 'none', scores: {} };

  const scores = {};
  for (const lang of ALL_LOCALES) scores[lang] = 0;

  let matchedWords = 0;
  for (const word of words) {
    const langs = slugWordToLangs.get(word);
    if (langs) {
      matchedWords++;
      const weight = 1 / langs.length;
      for (const lang of langs) {
        scores[lang] += weight;
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topLang = sorted[0][0];
  const topScore = sorted[0][1];
  const secondScore = sorted[1] ? sorted[1][1] : 0;

  // Confidence: need at least 2 matched words and clear winner
  let confidence = 'low';
  if (matchedWords >= 2 && topScore > 1.5 && (secondScore === 0 || topScore / secondScore > 1.5)) {
    confidence = 'high';
  } else if (matchedWords >= 1 && topScore > 0.8 && (secondScore === 0 || topScore / secondScore > 1.2)) {
    confidence = 'medium';
  }

  return {
    topLang,
    topScore: Math.round(topScore * 100) / 100,
    confidence,
    matchedWords,
    totalWords: words.length,
    scores,
  };
}

// =====================================================================
// MAIN AUDIT
// =====================================================================

async function main() {
  console.log('=== BLOG SLUG COMPLETENESS AUDIT ===');
  console.log(`Date: ${new Date().toISOString()}\n`);

  // Query all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Found ${posts.length} published posts`);
  console.log(`Checking ${posts.length * ALL_LOCALES.length} locale slots\n`);

  const issues = [];
  const perLocale = {};
  for (const locale of ALL_LOCALES) {
    perLocale[locale] = { ok: 0, MISSING: 0, ENGLISH_FALLBACK: 0, WRONG_LANGUAGE: 0, DUPLICATE: 0 };
  }

  // Track slugs for DUPLICATE detection
  // Key: `${locale}:${slug}` -> array of post IDs using that slug
  const slugUsage = new Map();

  // First pass: collect all slugs and detect MISSING / ENGLISH_FALLBACK / WRONG_LANGUAGE
  for (const post of posts) {
    const translations = post.translations;
    if (!translations || typeof translations !== 'object') continue;

    for (const locale of ALL_LOCALES) {
      const trans = translations[locale];
      const hasTitle = !!(trans && trans.title && trans.title.trim());
      const hasContent = !!(trans && trans.content && trans.content.trim());
      const slug = trans ? trans.slug : null;
      const slugValue = slug && typeof slug === 'string' && slug.trim() ? slug.trim() : null;

      // Check MISSING: has translation content but no slug
      if (hasTitle && !slugValue) {
        perLocale[locale].MISSING++;
        issues.push({
          postId: post.id,
          postSlug: post.slug,
          postEnTitle: translations.en?.title || 'NO EN TITLE',
          locale,
          issueType: 'MISSING',
          currentSlug: null,
          hasTitle,
          hasContent,
          suggestion: hasTitle ? 'generate from title' : 'needs translation first',
        });
        continue;
      }

      if (!slugValue) {
        // No translation at all for this locale - not an issue (expected for some)
        continue;
      }

      // Track for duplicate detection
      const dupeKey = `${locale}:${slugValue}`;
      if (!slugUsage.has(dupeKey)) slugUsage.set(dupeKey, []);
      slugUsage.get(dupeKey).push(post.id);

      // Check ENGLISH_FALLBACK: non-English locale has same slug as primary English slug
      if (locale !== 'en' && slugValue === post.slug) {
        perLocale[locale].ENGLISH_FALLBACK++;
        issues.push({
          postId: post.id,
          postSlug: post.slug,
          postEnTitle: translations.en?.title || 'NO EN TITLE',
          locale,
          issueType: 'ENGLISH_FALLBACK',
          currentSlug: slugValue,
          hasTitle,
          hasContent,
          suggestion: hasTitle ? 'generate from localized title' : 'needs localized title first',
        });
        continue;
      }

      // Check WRONG_LANGUAGE: slug words match a different language
      // Only flag if English scores SIGNIFICANTLY higher than the expected locale.
      // This avoids false positives from shared words (e.g. "for" in Norwegian/Danish).
      if (locale !== 'en') {
        const langResult = scoreSlugLanguage(slugValue);
        const enScore = langResult.scores.en || 0;
        const localeScore = langResult.scores[locale] || 0;
        // Flag only if: English is top, has meaningful score, AND expected locale
        // scores much lower (less than half). This catches genuine English slugs
        // but ignores shared words that inflate English's score slightly.
        if (
          langResult.topLang === 'en' &&
          enScore >= 1.5 &&
          (localeScore === 0 || enScore / localeScore > 2.0)
        ) {
          perLocale[locale].WRONG_LANGUAGE++;
          issues.push({
            postId: post.id,
            postSlug: post.slug,
            postEnTitle: translations.en?.title || 'NO EN TITLE',
            locale,
            issueType: 'WRONG_LANGUAGE',
            currentSlug: slugValue,
            detectedLang: langResult.topLang,
            confidence: langResult.confidence,
            langScore: langResult.topScore,
            matchedWords: langResult.matchedWords,
            totalWords: langResult.totalWords,
            hasTitle,
            hasContent,
            suggestion: hasTitle ? 'generate from localized title' : 'needs localized title first',
          });
          continue;
        }
      }

      // Also check English slug for wrong language (less common but possible)
      // Skip this - English is the default, unlikely to have wrong language

      // If we got here, slug looks OK
      perLocale[locale].ok++;
    }
  }

  // Second pass: detect DUPLICATE slugs (same slug in same locale across different posts)
  for (const [dupeKey, postIds] of slugUsage.entries()) {
    if (postIds.length > 1) {
      const [locale, slugValue] = [dupeKey.split(':')[0], dupeKey.substring(dupeKey.indexOf(':') + 1)];
      for (const postId of postIds) {
        const post = posts.find(p => p.id === postId);
        if (!post) continue;
        perLocale[locale].DUPLICATE++;
        issues.push({
          postId: post.id,
          postSlug: post.slug,
          postEnTitle: post.translations?.en?.title || 'NO EN TITLE',
          locale,
          issueType: 'DUPLICATE',
          currentSlug: slugValue,
          duplicateWith: postIds.filter(id => id !== postId),
          hasTitle: !!(post.translations?.[locale]?.title),
          hasContent: !!(post.translations?.[locale]?.content),
          suggestion: 'deduplicate - append distinguishing suffix',
        });
      }
    }
  }

  // Also check for same slug appearing under multiple locales of the SAME post
  for (const post of posts) {
    const translations = post.translations;
    if (!translations || typeof translations !== 'object') continue;

    const slugToLocales = new Map();
    for (const locale of ALL_LOCALES) {
      const slug = translations[locale]?.slug;
      if (slug && typeof slug === 'string' && slug.trim()) {
        const val = slug.trim();
        if (!slugToLocales.has(val)) slugToLocales.set(val, []);
        slugToLocales.get(val).push(locale);
      }
    }

    for (const [slugVal, locales] of slugToLocales.entries()) {
      if (locales.length > 1) {
        // Skip if one of them is 'en' and the others are already flagged as ENGLISH_FALLBACK
        const nonEnLocales = locales.filter(l => l !== 'en');
        for (const locale of nonEnLocales) {
          // Only add if not already flagged as ENGLISH_FALLBACK for this exact scenario
          const alreadyFlagged = issues.some(
            i => i.postId === post.id && i.locale === locale &&
                 (i.issueType === 'ENGLISH_FALLBACK' || i.issueType === 'DUPLICATE')
          );
          if (!alreadyFlagged) {
            perLocale[locale].DUPLICATE++;
            issues.push({
              postId: post.id,
              postSlug: post.slug,
              postEnTitle: post.translations?.en?.title || 'NO EN TITLE',
              locale,
              issueType: 'DUPLICATE',
              currentSlug: slugVal,
              duplicateWithLocales: locales.filter(l => l !== locale),
              hasTitle: !!(translations[locale]?.title),
              hasContent: !!(translations[locale]?.content),
              suggestion: 'locale shares slug with other locales of same post',
            });
          }
        }
      }
    }
  }

  // Build summary
  const issueCounts = { MISSING: 0, ENGLISH_FALLBACK: 0, WRONG_LANGUAGE: 0, DUPLICATE: 0 };
  for (const issue of issues) {
    issueCounts[issue.issueType]++;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalPosts: posts.length,
      totalLocaleSlots: posts.length * ALL_LOCALES.length,
      issues: issueCounts,
      totalIssues: issues.length,
      perLocale,
    },
    issues,
  };

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'blog-slug-completeness.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');

  // Console summary
  console.log('=== SUMMARY ===');
  console.log(`Total posts:         ${posts.length}`);
  console.log(`Total locale slots:  ${posts.length * ALL_LOCALES.length}`);
  console.log(`Total issues:        ${issues.length}`);
  console.log('');
  console.log('Issues by type:');
  for (const [type, count] of Object.entries(issueCounts)) {
    console.log(`  ${type}: ${count}`);
  }

  console.log('\nPer-locale breakdown:');
  console.log('Locale  | OK   | MISS | EN_FB | WRONG | DUPE');
  console.log('--------|------|------|-------|-------|-----');
  for (const locale of ALL_LOCALES) {
    const lc = perLocale[locale];
    console.log(
      `  ${locale.padEnd(5)} | ${String(lc.ok).padStart(4)} | ${String(lc.MISSING).padStart(4)} | ${String(lc.ENGLISH_FALLBACK).padStart(5)} | ${String(lc.WRONG_LANGUAGE).padStart(5)} | ${String(lc.DUPLICATE).padStart(4)}`
    );
  }

  // Show sample issues
  for (const type of ['MISSING', 'ENGLISH_FALLBACK', 'WRONG_LANGUAGE', 'DUPLICATE']) {
    const typeIssues = issues.filter(i => i.issueType === type);
    if (typeIssues.length > 0) {
      console.log(`\n=== SAMPLE ${type} ISSUES (first 5) ===`);
      for (const issue of typeIssues.slice(0, 5)) {
        if (type === 'MISSING') {
          console.log(`  [${issue.locale}] ${issue.postSlug} - has title: ${issue.hasTitle}, has content: ${issue.hasContent}`);
        } else if (type === 'ENGLISH_FALLBACK') {
          console.log(`  [${issue.locale}] ${issue.postSlug} -> slug "${issue.currentSlug}" = English slug`);
        } else if (type === 'WRONG_LANGUAGE') {
          console.log(`  [${issue.locale}] ${issue.postSlug} -> slug "${issue.currentSlug}" detected as ${issue.detectedLang} (${issue.confidence}, score=${issue.langScore})`);
        } else if (type === 'DUPLICATE') {
          const dupeInfo = issue.duplicateWith
            ? `shared with posts: ${issue.duplicateWith.join(', ').substring(0, 60)}`
            : `shared with locales: ${(issue.duplicateWithLocales || []).join(', ')}`;
          console.log(`  [${issue.locale}] ${issue.postSlug} -> slug "${issue.currentSlug}" ${dupeInfo}`);
        }
      }
    }
  }

  console.log(`\nReport written to: ${outputPath}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error('Audit failed:', e);
  prisma.$disconnect();
  process.exit(1);
});
