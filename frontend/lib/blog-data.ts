import { prisma } from './prisma';

/**
 * Calculate reading time based on word count
 * Standard reading speed: 200 words per minute
 * @param htmlContent - HTML content of the blog post
 * @returns Reading time in minutes (minimum 1)
 */
function calculateReadingTime(htmlContent: string): number {
  // Strip HTML tags to get plain text
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  // Count words (split by whitespace, filter empty strings)
  const wordCount = textContent.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0).length;
  // Standard reading speed is 200 WPM, minimum 1 minute
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Blog post metadata interface (matches BlogPageClient)
export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage?: string | null;
  hasSampleWorksheets?: boolean;
}

// Category interface
export interface BlogCategory {
  id: string;
  label: string;
}

// Default categories with translations (fallback)
const DEFAULT_CATEGORIES = [
  {
    id: 'teaching-resources',
    translations: {
      en: 'Teaching Resources', de: 'Unterrichtsmaterialien', fr: 'Ressources pédagogiques',
      es: 'Recursos didácticos', pt: 'Recursos de ensino', it: 'Risorse didattiche',
      nl: 'Onderwijsmiddelen', sv: 'Undervisningsresurser', da: 'Undervisningsressourcer',
      no: 'Undervisningsressurser', fi: 'Opetusresurssit'
    }
  },
  {
    id: 'worksheet-tips',
    translations: {
      en: 'Worksheet Tips', de: 'Arbeitsblatt-Tipps', fr: 'Conseils sur les fiches',
      es: 'Consejos de hojas de trabajo', pt: 'Dicas de planilhas', it: 'Suggerimenti per fogli di lavoro',
      nl: 'Werkblad tips', sv: 'Arbetsbladstips', da: 'Arbejdsarkstips',
      no: 'Arbeidsarktips', fi: 'Työarkkivinkkejä'
    }
  },
  {
    id: 'educational-activities',
    translations: {
      en: 'Educational Activities', de: 'Bildungsaktivitäten', fr: 'Activités éducatives',
      es: 'Actividades educativas', pt: 'Atividades educacionais', it: 'Attività educative',
      nl: 'Educatieve activiteiten', sv: 'Utbildningsaktiviteter', da: 'Uddannelsesaktiviteter',
      no: 'Utdanningsaktiviteter', fi: 'Koulutustoimintaa'
    }
  },
  {
    id: 'learning-strategies',
    translations: {
      en: 'Learning Strategies', de: 'Lernstrategien', fr: "Stratégies d'apprentissage",
      es: 'Estrategias de aprendizaje', pt: 'Estratégias de aprendizagem', it: 'Strategie di apprendimento',
      nl: 'Leerstrategieën', sv: 'Inlärningsstrategier', da: 'Læringsstrategier',
      no: 'Læringsstrategier', fi: 'Oppimisstrategiat'
    }
  },
  {
    id: 'curriculum-guides',
    translations: {
      en: 'Curriculum Guides', de: 'Lehrplan-Leitfäden', fr: 'Guides du programme',
      es: 'Guías del currículo', pt: 'Guias de currículo', it: 'Guide del curriculum',
      nl: 'Curriculumgidsen', sv: 'Läroplansguider', da: 'Læseplansguider',
      no: 'Læreplansveiledninger', fi: 'Opetussuunnitelmaoppaat'
    }
  },
  {
    id: 'parent-resources',
    translations: {
      en: 'Parent Resources', de: 'Elternressourcen', fr: 'Ressources pour les parents',
      es: 'Recursos para padres', pt: 'Recursos para pais', it: 'Risorse per i genitori',
      nl: 'Ouderhulpmiddelen', sv: 'Föräldraresurser', da: 'Forældreressourcer',
      no: 'Foreldreressurser', fi: 'Vanhempien resurssit'
    }
  },
  {
    id: 'seasonal-content',
    translations: {
      en: 'Seasonal Content', de: 'Saisonale Inhalte', fr: 'Contenu saisonnier',
      es: 'Contenido estacional', pt: 'Conteúdo sazonal', it: 'Contenuti stagionali',
      nl: 'Seizoensgebonden inhoud', sv: 'Säsongsinnehåll', da: 'Sæsonindhold',
      no: 'Sesonginnhold', fi: 'Kauden sisältö'
    }
  }
];

/**
 * Fetch blog posts for a specific locale (server-side)
 * This is used by the blog listing page for ISR
 */
export async function getBlogPostsForLocale(locale: string): Promise<BlogPostMetadata[]> {
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: {
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const posts: BlogPostMetadata[] = dbPosts
      .filter(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        return translation && translation.title && translation.content;
      })
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];

        return {
          slug: translation.slug || post.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          author: translation.author || 'LessonCraftStudio Team',
          date: post.createdAt.toISOString().split('T')[0],
          category: post.category || 'teaching-resources',
          readTime: `${calculateReadingTime(translation.content || '')} min read`,
          featuredImage: translation.featuredImage || post.featuredImage,
          hasSampleWorksheets: post._count.pdfs > 0
        };
      });

    return posts;
  } catch (error) {
    console.error(`Error fetching blog posts for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get blog categories for a specific locale (server-side)
 */
export function getBlogCategoriesForLocale(locale: string): BlogCategory[] {
  return DEFAULT_CATEGORIES.map(cat => ({
    id: cat.id,
    label: cat.translations[locale as keyof typeof cat.translations] || cat.translations.en
  }));
}

/**
 * Blog post summary for product page linking
 */
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
}

/**
 * Fetch related blog posts for a product page (server-side)
 * Matches blog posts by keywords that are relevant to the app
 *
 * @param appKeywords - Keywords associated with the app/product
 * @param locale - Target locale
 * @param limit - Maximum number of posts to return (default: 3)
 * @returns Array of blog post summaries
 */
export async function getRelatedBlogPostsForProduct(
  appKeywords: string[],
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  try {
    // If no keywords provided, return empty
    if (!appKeywords || appKeywords.length === 0) {
      return [];
    }

    // Fetch published blog posts that have any of the app keywords
    const dbPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        keywords: { hasSome: appKeywords }
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2 // Fetch extra to account for filtering
    });

    const posts: BlogPostSummary[] = dbPosts
      .filter(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        // Only include posts with translations for this locale
        return translation && translation.title && translation.content;
      })
      .slice(0, limit)
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        const categoryData = DEFAULT_CATEGORIES.find(c => c.id === post.category);
        const categoryLabel = categoryData
          ? categoryData.translations[locale as keyof typeof categoryData.translations] || categoryData.translations.en
          : post.category || 'Teaching Resources';

        return {
          slug: translation.slug || post.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          featuredImage: translation.featuredImage || post.featuredImage,
          category: categoryLabel
        };
      });

    // If not enough posts from keyword match, get recent posts as fallback
    if (posts.length < limit) {
      const existingSlugs = posts.map(p => p.slug);
      const fallbackPosts = await prisma.blogPost.findMany({
        where: {
          status: 'published',
          slug: { notIn: existingSlugs.length > 0 ? existingSlugs : ['_none_'] }
        },
        orderBy: { createdAt: 'desc' },
        take: limit - posts.length
      });

      for (const post of fallbackPosts) {
        const translations = post.translations as any;
        const translation = translations[locale];
        if (translation && translation.title && translation.content) {
          const categoryData = DEFAULT_CATEGORIES.find(c => c.id === post.category);
          const categoryLabel = categoryData
            ? categoryData.translations[locale as keyof typeof categoryData.translations] || categoryData.translations.en
            : post.category || 'Teaching Resources';

          posts.push({
            slug: translation.slug || post.slug,
            title: translation.title || post.slug,
            excerpt: translation.excerpt || '',
            featuredImage: translation.featuredImage || post.featuredImage,
            category: categoryLabel
          });
        }

        if (posts.length >= limit) break;
      }
    }

    return posts;
  } catch (error) {
    console.error(`Error fetching related blog posts for product:`, error);
    return [];
  }
}
