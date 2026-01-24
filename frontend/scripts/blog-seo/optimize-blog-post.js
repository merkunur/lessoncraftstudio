/**
 * Blog Post SEO Optimizer
 *
 * This script optimizes individual blog post translations with strategic keyword placement.
 * Each translation will have:
 * - 7 universal keywords (10+ occurrences each)
 * - 10 local keywords (10+ occurrences each)
 * - 20+ keywords in headings
 * - Optimized metaTitle (55-60 chars)
 * - Optimized metaDescription (155-160 chars)
 * - focusKeyword set
 */

const { PrismaClient } = require('@prisma/client');
const {
  getUniversalKeywords,
  getLocalKeywords,
  getMetaTemplates,
  MINIMUM_KEYWORD_COUNT,
  META_TITLE_MIN,
  META_TITLE_MAX,
  META_DESC_MIN,
  META_DESC_MAX
} = require('./config/keywords');

const prisma = new PrismaClient();

/**
 * Count occurrences of a keyword in content (case-insensitive)
 */
function countKeyword(content, keyword) {
  if (!content || !keyword) return 0;
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Extract topic from blog post title
 */
function extractTopic(title) {
  // Remove common words to get the main topic
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'how', 'why', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'your', 'our', 'their', 'its', 'free', 'worksheet', 'worksheets', 'printable', 'printables', 'kids', 'children'];

  const words = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopWords.includes(word) && word.length > 2);

  return words.slice(0, 3).join(' ') || title.split(' ').slice(0, 2).join(' ');
}

/**
 * Generate optimized meta title
 */
function generateMetaTitle(title, lang, topic) {
  const templates = getMetaTemplates(lang);
  let metaTitle = templates.titleTemplate.replace('{topic}', topic);

  // Ensure title is within 55-60 characters
  if (metaTitle.length > META_TITLE_MAX) {
    // Truncate and add ellipsis
    const suffix = ' - LessonCraftStudio';
    const maxTopicLength = META_TITLE_MAX - suffix.length - 10;
    const shortTopic = topic.substring(0, maxTopicLength);
    metaTitle = `${shortTopic}... ${suffix}`;
  }

  if (metaTitle.length < META_TITLE_MIN) {
    // Pad with additional descriptive words
    const padWords = {
      en: 'Free Printable',
      de: 'Kostenlos Druckbar',
      fr: 'Gratuit Imprimable',
      es: 'Gratis Imprimible',
      pt: 'Grátis Imprimível',
      it: 'Gratuito Stampabile',
      nl: 'Gratis Printbaar',
      sv: 'Gratis Utskrivbar',
      da: 'Gratis Printbar',
      no: 'Gratis Utskriftbar',
      fi: 'Ilmainen Tulostettava'
    };
    metaTitle = `${padWords[lang] || padWords.en} ${metaTitle}`;
  }

  return metaTitle.substring(0, META_TITLE_MAX);
}

/**
 * Generate optimized meta description
 */
function generateMetaDescription(title, lang, topic, existingDesc) {
  const templates = getMetaTemplates(lang);
  let metaDesc = templates.descriptionTemplate.replace(/{topic}/g, topic);

  // Ensure description is within 155-160 characters
  if (metaDesc.length > META_DESC_MAX) {
    metaDesc = metaDesc.substring(0, META_DESC_MAX - 3) + '...';
  }

  if (metaDesc.length < META_DESC_MIN) {
    // Extend with existing description content
    if (existingDesc) {
      const cleanExisting = existingDesc.replace(/<[^>]*>/g, '').substring(0, 50);
      metaDesc = `${metaDesc} ${cleanExisting}`;
    }
  }

  // Final trim to ensure we're within bounds
  return metaDesc.substring(0, META_DESC_MAX);
}

/**
 * Inject keywords into content naturally
 * This function adds keywords to paragraphs, lists, and creates new sections if needed
 */
function injectKeywordsIntoContent(content, lang) {
  if (!content) return { content: '', keywordCounts: {} };

  const universalKeywords = getUniversalKeywords(lang);
  const localKeywords = getLocalKeywords(lang);
  const allKeywords = [...universalKeywords, ...localKeywords];

  let enhancedContent = content;
  const keywordCounts = {};

  // Initialize counts
  allKeywords.forEach(kw => {
    keywordCounts[kw] = countKeyword(enhancedContent, kw);
  });

  // Get keywords that need more occurrences
  const keywordsNeedingBoost = allKeywords.filter(kw =>
    keywordCounts[kw] < MINIMUM_KEYWORD_COUNT
  );

  if (keywordsNeedingBoost.length === 0) {
    return { content: enhancedContent, keywordCounts };
  }

  // Create additional content sections with keywords
  const additionalSections = generateKeywordRichSections(keywordsNeedingBoost, lang, keywordCounts);

  // Insert additional sections before the closing tags or at the end
  if (additionalSections) {
    // Find a good insertion point (before last few paragraphs)
    const lastPIndex = enhancedContent.lastIndexOf('</p>');
    if (lastPIndex > enhancedContent.length / 2) {
      enhancedContent = enhancedContent.slice(0, lastPIndex) +
        additionalSections +
        enhancedContent.slice(lastPIndex);
    } else {
      enhancedContent += additionalSections;
    }
  }

  // Recount keywords after injection
  allKeywords.forEach(kw => {
    keywordCounts[kw] = countKeyword(enhancedContent, kw);
  });

  return { content: enhancedContent, keywordCounts };
}

/**
 * Generate keyword-rich sections to meet the minimum occurrence requirements
 */
function generateKeywordRichSections(keywords, lang, currentCounts) {
  if (keywords.length === 0) return '';

  const sections = [];
  const sectionTemplates = getSectionTemplates(lang);

  // Group keywords by how many more occurrences they need
  const keywordsToBoost = keywords.map(kw => ({
    keyword: kw,
    needed: MINIMUM_KEYWORD_COUNT - (currentCounts[kw] || 0)
  })).filter(k => k.needed > 0);

  // Generate content sections that incorporate multiple keywords
  let remainingKeywords = [...keywordsToBoost];

  while (remainingKeywords.length > 0) {
    // Take up to 5 keywords per section
    const batchKeywords = remainingKeywords.slice(0, 5);
    remainingKeywords = remainingKeywords.slice(5);

    // Generate a section with these keywords
    const section = generateSection(batchKeywords, lang, sectionTemplates);
    sections.push(section);

    // Update the needed counts
    batchKeywords.forEach(kw => {
      const used = countKeyword(section, kw.keyword);
      kw.needed -= used;
    });

    // Add back keywords that still need more occurrences
    batchKeywords.filter(kw => kw.needed > 0).forEach(kw => {
      remainingKeywords.push(kw);
    });
  }

  return sections.join('\n');
}

/**
 * Generate a content section incorporating specific keywords
 */
function generateSection(keywordsToInclude, lang, templates) {
  const keywords = keywordsToInclude.map(k => k.keyword);

  // Select appropriate template based on keywords
  let section = '';

  // Create a heading with the first keyword
  const headingKeyword = keywords[0];
  const heading = templates.headings[Math.floor(Math.random() * templates.headings.length)]
    .replace('{keyword}', headingKeyword);

  section += `<h3>${heading}</h3>\n`;

  // Create paragraphs with keywords
  keywords.forEach((kw, index) => {
    const para = templates.paragraphs[index % templates.paragraphs.length]
      .replace(/{keyword}/g, kw);
    section += `<p>${para}</p>\n`;

    // Add the keyword more times in list format
    if (keywordsToInclude[index] && keywordsToInclude[index].needed > 3) {
      const listItems = templates.listItems
        .slice(0, Math.min(3, keywordsToInclude[index].needed - 3))
        .map(item => item.replace(/{keyword}/g, kw));
      section += `<ul>\n${listItems.map(li => `  <li>${li}</li>`).join('\n')}\n</ul>\n`;
    }
  });

  return section;
}

/**
 * Get localized section templates
 */
function getSectionTemplates(lang) {
  const templates = {
    en: {
      headings: [
        'Why {keyword} Matter for Learning',
        'Benefits of Using {keyword}',
        'How to Get the Most from {keyword}',
        'Tips for Using {keyword} Effectively'
      ],
      paragraphs: [
        '{keyword} are essential tools for early childhood education. Teachers and parents rely on {keyword} to reinforce important concepts.',
        'When you use {keyword}, children can practice skills in a fun, engaging way. Our {keyword} are designed by educators.',
        'The best {keyword} combine learning with creativity. Download our {keyword} today and see the difference.',
        'Looking for quality {keyword}? Our collection of {keyword} covers all major subjects and skill levels.'
      ],
      listItems: [
        '{keyword} for beginners and advanced learners',
        'Printable {keyword} ready for immediate use',
        'Professional {keyword} created by teachers'
      ]
    },
    de: {
      headings: [
        'Warum {keyword} wichtig für das Lernen sind',
        'Vorteile von {keyword}',
        'So nutzen Sie {keyword} optimal',
        'Tipps für effektives Lernen mit {keyword}'
      ],
      paragraphs: [
        '{keyword} sind wichtige Werkzeuge für die frühkindliche Bildung. Lehrer und Eltern verlassen sich auf {keyword}.',
        'Mit {keyword} können Kinder Fähigkeiten auf spielerische Weise üben. Unsere {keyword} wurden von Pädagogen entwickelt.',
        'Die besten {keyword} verbinden Lernen mit Kreativität. Laden Sie unsere {keyword} noch heute herunter.',
        'Suchen Sie hochwertige {keyword}? Unsere Sammlung von {keyword} deckt alle wichtigen Themen ab.'
      ],
      listItems: [
        '{keyword} für Anfänger und Fortgeschrittene',
        'Druckbare {keyword} sofort einsatzbereit',
        'Professionelle {keyword} von Lehrern erstellt'
      ]
    },
    fr: {
      headings: [
        'Pourquoi les {keyword} sont importantes pour l\'apprentissage',
        'Avantages des {keyword}',
        'Comment tirer le meilleur parti des {keyword}',
        'Conseils pour utiliser les {keyword} efficacement'
      ],
      paragraphs: [
        'Les {keyword} sont des outils essentiels pour l\'éducation de la petite enfance. Les enseignants et les parents comptent sur les {keyword}.',
        'Avec les {keyword}, les enfants peuvent pratiquer de manière ludique. Nos {keyword} sont conçues par des éducateurs.',
        'Les meilleures {keyword} combinent apprentissage et créativité. Téléchargez nos {keyword} aujourd\'hui.',
        'Vous cherchez des {keyword} de qualité? Notre collection de {keyword} couvre tous les sujets importants.'
      ],
      listItems: [
        '{keyword} pour débutants et avancés',
        '{keyword} imprimables prêtes à l\'emploi',
        '{keyword} professionnelles créées par des enseignants'
      ]
    },
    es: {
      headings: [
        'Por qué las {keyword} son importantes para el aprendizaje',
        'Beneficios de usar {keyword}',
        'Cómo aprovechar al máximo las {keyword}',
        'Consejos para usar {keyword} de manera efectiva'
      ],
      paragraphs: [
        'Las {keyword} son herramientas esenciales para la educación infantil. Los maestros y padres confían en las {keyword}.',
        'Con las {keyword}, los niños pueden practicar de manera divertida. Nuestras {keyword} fueron diseñadas por educadores.',
        'Las mejores {keyword} combinan aprendizaje con creatividad. Descarga nuestras {keyword} hoy.',
        '¿Buscas {keyword} de calidad? Nuestra colección de {keyword} cubre todos los temas importantes.'
      ],
      listItems: [
        '{keyword} para principiantes y avanzados',
        '{keyword} imprimibles listas para usar',
        '{keyword} profesionales creadas por maestros'
      ]
    },
    pt: {
      headings: [
        'Por que as {keyword} são importantes para o aprendizado',
        'Benefícios das {keyword}',
        'Como aproveitar ao máximo as {keyword}',
        'Dicas para usar {keyword} de forma eficaz'
      ],
      paragraphs: [
        'As {keyword} são ferramentas essenciais para a educação infantil. Professores e pais confiam nas {keyword}.',
        'Com as {keyword}, as crianças podem praticar de forma divertida. Nossas {keyword} foram desenvolvidas por educadores.',
        'As melhores {keyword} combinam aprendizado com criatividade. Baixe nossas {keyword} hoje.',
        'Procurando {keyword} de qualidade? Nossa coleção de {keyword} cobre todos os assuntos importantes.'
      ],
      listItems: [
        '{keyword} para iniciantes e avançados',
        '{keyword} imprimíveis prontas para usar',
        '{keyword} profissionais criadas por professores'
      ]
    },
    it: {
      headings: [
        'Perché le {keyword} sono importanti per l\'apprendimento',
        'Vantaggi delle {keyword}',
        'Come ottenere il massimo dalle {keyword}',
        'Consigli per usare le {keyword} in modo efficace'
      ],
      paragraphs: [
        'Le {keyword} sono strumenti essenziali per l\'educazione della prima infanzia. Insegnanti e genitori si affidano alle {keyword}.',
        'Con le {keyword}, i bambini possono esercitarsi in modo divertente. Le nostre {keyword} sono progettate da educatori.',
        'Le migliori {keyword} combinano apprendimento e creatività. Scarica le nostre {keyword} oggi.',
        'Cerchi {keyword} di qualità? La nostra collezione di {keyword} copre tutti gli argomenti importanti.'
      ],
      listItems: [
        '{keyword} per principianti e avanzati',
        '{keyword} stampabili pronte all\'uso',
        '{keyword} professionali create da insegnanti'
      ]
    },
    nl: {
      headings: [
        'Waarom {keyword} belangrijk zijn voor het leren',
        'Voordelen van {keyword}',
        'Hoe haal je het meeste uit {keyword}',
        'Tips voor effectief gebruik van {keyword}'
      ],
      paragraphs: [
        '{keyword} zijn essentiële hulpmiddelen voor het basisonderwijs. Leraren en ouders vertrouwen op {keyword}.',
        'Met {keyword} kunnen kinderen op een leuke manier oefenen. Onze {keyword} zijn ontworpen door docenten.',
        'De beste {keyword} combineren leren met creativiteit. Download onze {keyword} vandaag nog.',
        'Op zoek naar kwaliteit {keyword}? Onze collectie {keyword} behandelt alle belangrijke onderwerpen.'
      ],
      listItems: [
        '{keyword} voor beginners en gevorderden',
        'Printbare {keyword} direct klaar voor gebruik',
        'Professionele {keyword} gemaakt door leraren'
      ]
    },
    sv: {
      headings: [
        'Varför {keyword} är viktiga för lärande',
        'Fördelar med {keyword}',
        'Så får du ut mest av {keyword}',
        'Tips för effektiv användning av {keyword}'
      ],
      paragraphs: [
        '{keyword} är viktiga verktyg för förskoleundervisning. Lärare och föräldrar förlitar sig på {keyword}.',
        'Med {keyword} kan barn öva på ett roligt sätt. Våra {keyword} är utformade av pedagoger.',
        'De bästa {keyword} kombinerar lärande med kreativitet. Ladda ner våra {keyword} idag.',
        'Letar du efter kvalitets {keyword}? Vår samling av {keyword} täcker alla viktiga ämnen.'
      ],
      listItems: [
        '{keyword} för nybörjare och avancerade',
        'Utskrivbara {keyword} redo att använda',
        'Professionella {keyword} skapade av lärare'
      ]
    },
    da: {
      headings: [
        'Hvorfor {keyword} er vigtige for læring',
        'Fordele ved {keyword}',
        'Sådan får du mest ud af {keyword}',
        'Tips til effektiv brug af {keyword}'
      ],
      paragraphs: [
        '{keyword} er vigtige værktøjer til førskoleundervisning. Lærere og forældre stoler på {keyword}.',
        'Med {keyword} kan børn øve sig på en sjov måde. Vores {keyword} er designet af pædagoger.',
        'De bedste {keyword} kombinerer læring med kreativitet. Download vores {keyword} i dag.',
        'Leder du efter kvalitets {keyword}? Vores samling af {keyword} dækker alle vigtige emner.'
      ],
      listItems: [
        '{keyword} til begyndere og øvede',
        'Printbare {keyword} klar til brug',
        'Professionelle {keyword} lavet af lærere'
      ]
    },
    no: {
      headings: [
        'Hvorfor {keyword} er viktige for læring',
        'Fordeler med {keyword}',
        'Slik får du mest ut av {keyword}',
        'Tips for effektiv bruk av {keyword}'
      ],
      paragraphs: [
        '{keyword} er viktige verktøy for førskoleopplæring. Lærere og foreldre stoler på {keyword}.',
        'Med {keyword} kan barn øve på en morsom måte. Våre {keyword} er designet av pedagoger.',
        'De beste {keyword} kombinerer læring med kreativitet. Last ned våre {keyword} i dag.',
        'Leter du etter kvalitets {keyword}? Vår samling av {keyword} dekker alle viktige emner.'
      ],
      listItems: [
        '{keyword} for nybegynnere og viderekomne',
        'Utskrivbare {keyword} klare til bruk',
        'Profesjonelle {keyword} laget av lærere'
      ]
    },
    fi: {
      headings: [
        'Miksi {keyword} ovat tärkeitä oppimiselle',
        '{keyword} edut',
        'Näin saat parhaan hyödyn {keyword}',
        'Vinkkejä {keyword} tehokkaaseen käyttöön'
      ],
      paragraphs: [
        '{keyword} ovat tärkeitä työkaluja varhaiskasvatuksessa. Opettajat ja vanhemmat luottavat {keyword}.',
        '{keyword} avulla lapset voivat harjoitella hauskalla tavalla. Meidän {keyword} on suunniteltu pedagogien toimesta.',
        'Parhaat {keyword} yhdistävät oppimisen ja luovuuden. Lataa meidän {keyword} tänään.',
        'Etsitkö laadukkaita {keyword}? Meidän kokoelma {keyword} kattaa kaikki tärkeät aiheet.'
      ],
      listItems: [
        '{keyword} aloittelijoille ja edistyneille',
        'Tulostettavat {keyword} valmiina käyttöön',
        'Ammattimaisia {keyword} opettajien tekemiä'
      ]
    }
  };

  return templates[lang] || templates.en;
}

/**
 * Optimize a single blog post translation
 */
async function optimizeBlogPost(postId, lang, dryRun = false) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId }
    });

    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }

    const translations = post.translations;
    const translation = translations[lang];

    if (!translation) {
      console.log(`No ${lang} translation for post: ${post.slug}`);
      return { success: false, reason: 'no_translation' };
    }

    console.log(`\nOptimizing: ${post.slug} (${lang})`);

    // Extract topic from title
    const topic = extractTopic(translation.title || '');

    // Inject keywords into content
    const { content: enhancedContent, keywordCounts } = injectKeywordsIntoContent(
      translation.content,
      lang
    );

    // Generate optimized metadata
    const metaTitle = generateMetaTitle(translation.title, lang, topic);
    const metaDescription = generateMetaDescription(
      translation.title,
      lang,
      topic,
      translation.metaDescription
    );

    // Generate focus keyword
    const templates = getMetaTemplates(lang);
    const focusKeyword = templates.focusKeywordTemplate.replace('{topic}', topic.toLowerCase());

    // Prepare updated translation
    const updatedTranslation = {
      ...translation,
      content: enhancedContent,
      metaTitle,
      metaDescription,
      focusKeyword
    };

    // Prepare updated translations object
    const updatedTranslations = {
      ...translations,
      [lang]: updatedTranslation
    };

    // Log results
    console.log(`  Topic: ${topic}`);
    console.log(`  metaTitle: ${metaTitle} (${metaTitle.length} chars)`);
    console.log(`  metaDescription: ${metaDescription.substring(0, 50)}... (${metaDescription.length} chars)`);
    console.log(`  focusKeyword: ${focusKeyword}`);

    // Log keyword counts
    const universalKeywords = getUniversalKeywords(lang);
    const localKeywords = getLocalKeywords(lang);

    console.log(`  Universal Keywords:`);
    universalKeywords.forEach(kw => {
      const count = keywordCounts[kw] || 0;
      const status = count >= MINIMUM_KEYWORD_COUNT ? 'OK' : 'LOW';
      console.log(`    - ${kw}: ${count} [${status}]`);
    });

    console.log(`  Local Keywords:`);
    localKeywords.forEach(kw => {
      const count = keywordCounts[kw] || 0;
      const status = count >= MINIMUM_KEYWORD_COUNT ? 'OK' : 'LOW';
      console.log(`    - ${kw}: ${count} [${status}]`);
    });

    if (!dryRun) {
      // Update the database
      await prisma.blogPost.update({
        where: { id: postId },
        data: {
          translations: updatedTranslations
        }
      });
      console.log(`  Saved to database.`);
    } else {
      console.log(`  [DRY RUN] Would save to database.`);
    }

    return {
      success: true,
      postId,
      slug: post.slug,
      lang,
      keywordCounts,
      metaTitle,
      metaDescription,
      focusKeyword
    };

  } catch (error) {
    console.error(`Error optimizing post ${postId} (${lang}):`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get all blog posts
 */
async function getAllBlogPosts() {
  return prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'asc' }
  });
}

/**
 * Get blog posts in a range
 */
async function getBlogPostsInRange(start, end) {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'asc' },
    skip: start - 1,
    take: end - start + 1
  });
  return posts;
}

module.exports = {
  optimizeBlogPost,
  getAllBlogPosts,
  getBlogPostsInRange,
  countKeyword,
  extractTopic,
  generateMetaTitle,
  generateMetaDescription,
  injectKeywordsIntoContent,
  prisma
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Blog Post SEO Optimizer

Usage:
  node optimize-blog-post.js --post=<postId> --lang=<lang> [--dry-run]

Options:
  --post    Blog post ID to optimize
  --lang    Language code (en, de, fr, es, pt, it, nl, sv, da, no, fi)
  --dry-run Show what would be done without making changes

Examples:
  node optimize-blog-post.js --post=abc123 --lang=en
  node optimize-blog-post.js --post=abc123 --lang=de --dry-run
`);
    process.exit(0);
  }

  const postArg = args.find(a => a.startsWith('--post='));
  const langArg = args.find(a => a.startsWith('--lang='));
  const dryRun = args.includes('--dry-run');

  if (!postArg || !langArg) {
    console.error('Error: --post and --lang arguments are required');
    process.exit(1);
  }

  const postId = postArg.split('=')[1];
  const lang = langArg.split('=')[1];

  optimizeBlogPost(postId, lang, dryRun)
    .then(result => {
      console.log('\nResult:', JSON.stringify(result, null, 2));
      process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
      console.error('Fatal error:', err);
      process.exit(1);
    })
    .finally(() => {
      prisma.$disconnect();
    });
}
