import { prisma } from './prisma';

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
          readTime: `${Math.ceil((translation.content?.length || 0) / 1000)} min read`,
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
