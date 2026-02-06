import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Breadcrumb from '@/components/Breadcrumb';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import RelatedProducts from '@/components/blog/RelatedProducts';
import type { SupportedLocale } from '@/config/product-page-slugs';

// Enable ISR - revalidate every 30 minutes
export const revalidate = 1800;

const POSTS_PER_PAGE = 12;

// Valid category IDs
const VALID_CATEGORIES = [
  'teaching-resources',
  'worksheet-tips',
  'educational-activities',
  'learning-strategies',
  'curriculum-guides',
  'parent-resources',
  'seasonal-content'
];

// Category translations for display and SEO
const CATEGORY_TRANSLATIONS: Record<string, Record<string, { name: string; description: string }>> = {
  'teaching-resources': {
    en: { name: 'Teaching Resources', description: 'Expert teaching strategies, classroom management tips, and educational resources for teachers.' },
    de: { name: 'Unterrichtsmaterialien', description: 'Expertentipps für den Unterricht, Klassenführung und Bildungsressourcen für Lehrer.' },
    fr: { name: 'Ressources Pédagogiques', description: 'Stratégies d\'enseignement expertes, conseils de gestion de classe et ressources éducatives.' },
    es: { name: 'Recursos Didácticos', description: 'Estrategias de enseñanza expertas, consejos de gestión de aula y recursos educativos.' },
    pt: { name: 'Recursos de Ensino', description: 'Estratégias de ensino especializadas, dicas de gestão de sala de aula e recursos educacionais.' },
    it: { name: 'Risorse Didattiche', description: 'Strategie di insegnamento esperte, consigli per la gestione della classe e risorse educative.' },
    nl: { name: 'Onderwijsmiddelen', description: 'Deskundige onderwijsstrategieën, tips voor klasbeheer en educatieve bronnen voor leraren.' },
    sv: { name: 'Undervisningsresurser', description: 'Expertstrategier för undervisning, tips för klassrumsledning och utbildningsresurser.' },
    da: { name: 'Undervisningsressourcer', description: 'Ekspertstrategier for undervisning, tips til klasseledelse og uddannelsesressourcer.' },
    no: { name: 'Undervisningsressurser', description: 'Ekspertstrategier for undervisning, tips for klasseledelse og utdanningsressurser.' },
    fi: { name: 'Opetusresurssit', description: 'Asiantuntijastrategioita opetukseen, luokanhallintavinkkejä ja koulutusresursseja.' }
  },
  'worksheet-tips': {
    en: { name: 'Worksheet Tips', description: 'Design tips and best practices for creating effective educational worksheets.' },
    de: { name: 'Arbeitsblatt-Tipps', description: 'Designtipps und bewährte Methoden für die Erstellung effektiver Arbeitsblätter.' },
    fr: { name: 'Conseils sur les Fiches', description: 'Conseils de conception et meilleures pratiques pour créer des fiches efficaces.' },
    es: { name: 'Consejos de Fichas', description: 'Consejos de diseño y mejores prácticas para crear fichas educativas efectivas.' },
    pt: { name: 'Dicas de Planilhas', description: 'Dicas de design e melhores práticas para criar planilhas educacionais eficazes.' },
    it: { name: 'Suggerimenti per Schede', description: 'Consigli di design e best practice per creare schede educative efficaci.' },
    nl: { name: 'Werkblad Tips', description: 'Ontwerptips en best practices voor het maken van effectieve werkbladen.' },
    sv: { name: 'Arbetsbladstips', description: 'Designtips och bästa praxis för att skapa effektiva arbetsblad.' },
    da: { name: 'Arbejdsark Tips', description: 'Designtips og bedste praksis for at skabe effektive arbejdsark.' },
    no: { name: 'Arbeidsark Tips', description: 'Designtips og beste praksis for å lage effektive arbeidsark.' },
    fi: { name: 'Työarkkivinkit', description: 'Suunnitteluvinkkejä ja parhaita käytäntöjä tehokkaiden työarkkien luomiseen.' }
  },
  'educational-activities': {
    en: { name: 'Educational Activities', description: 'Fun and engaging learning activities for children of all ages.' },
    de: { name: 'Bildungsaktivitäten', description: 'Unterhaltsame und ansprechende Lernaktivitäten für Kinder jeden Alters.' },
    fr: { name: 'Activités Éducatives', description: 'Activités d\'apprentissage amusantes et engageantes pour enfants de tous âges.' },
    es: { name: 'Actividades Educativas', description: 'Actividades de aprendizaje divertidas y atractivas para niños de todas las edades.' },
    pt: { name: 'Atividades Educacionais', description: 'Atividades de aprendizagem divertidas e envolventes para crianças de todas as idades.' },
    it: { name: 'Attività Educative', description: 'Attività di apprendimento divertenti e coinvolgenti per bambini di tutte le età.' },
    nl: { name: 'Educatieve Activiteiten', description: 'Leuke en boeiende leeractiviteiten voor kinderen van alle leeftijden.' },
    sv: { name: 'Utbildningsaktiviteter', description: 'Roliga och engagerande läraktiviteter för barn i alla åldrar.' },
    da: { name: 'Uddannelsesaktiviteter', description: 'Sjove og engagerende læringsaktiviteter til børn i alle aldre.' },
    no: { name: 'Utdanningsaktiviteter', description: 'Morsomme og engasjerende læringsaktiviteter for barn i alle aldre.' },
    fi: { name: 'Koulutustoimintaa', description: 'Hauskoja ja mukaansatempaavia oppimisaktiviteetteja kaiken ikäisille lapsille.' }
  },
  'learning-strategies': {
    en: { name: 'Learning Strategies', description: 'Evidence-based learning techniques and study strategies for better outcomes.' },
    de: { name: 'Lernstrategien', description: 'Evidenzbasierte Lerntechniken und Studienstrategien für bessere Ergebnisse.' },
    fr: { name: 'Stratégies d\'Apprentissage', description: 'Techniques d\'apprentissage et stratégies d\'étude basées sur des preuves.' },
    es: { name: 'Estrategias de Aprendizaje', description: 'Técnicas de aprendizaje basadas en evidencia y estrategias de estudio.' },
    pt: { name: 'Estratégias de Aprendizagem', description: 'Técnicas de aprendizagem baseadas em evidências e estratégias de estudo.' },
    it: { name: 'Strategie di Apprendimento', description: 'Tecniche di apprendimento basate su evidenze e strategie di studio.' },
    nl: { name: 'Leerstrategieën', description: 'Evidentiegerichte leertechnieken en studiestrategieën voor betere resultaten.' },
    sv: { name: 'Inlärningsstrategier', description: 'Evidensbaserade inlärningstekniker och studiestrategier för bättre resultat.' },
    da: { name: 'Læringsstrategier', description: 'Evidensbaserede læringsteknikker og studiestrategier for bedre resultater.' },
    no: { name: 'Læringsstrategier', description: 'Evidensbaserte læringsteknikker og studiestrategier for bedre resultater.' },
    fi: { name: 'Oppimisstrategiat', description: 'Näyttöön perustuvat oppimistekniikat ja opiskelustrategiat parempiin tuloksiin.' }
  },
  'curriculum-guides': {
    en: { name: 'Curriculum Guides', description: 'Comprehensive curriculum guides and lesson planning resources.' },
    de: { name: 'Lehrplan-Leitfäden', description: 'Umfassende Lehrplanleitfäden und Unterrichtsplanungsressourcen.' },
    fr: { name: 'Guides du Programme', description: 'Guides de programme complets et ressources de planification de cours.' },
    es: { name: 'Guías del Currículo', description: 'Guías completas del currículo y recursos de planificación de lecciones.' },
    pt: { name: 'Guias de Currículo', description: 'Guias de currículo abrangentes e recursos de planejamento de aulas.' },
    it: { name: 'Guide del Curriculum', description: 'Guide complete del curriculum e risorse per la pianificazione delle lezioni.' },
    nl: { name: 'Curriculumgidsen', description: 'Uitgebreide curriculumgidsen en bronnen voor lesplanning.' },
    sv: { name: 'Läroplansguider', description: 'Omfattande läroplansguider och resurser för lektionsplanering.' },
    da: { name: 'Læseplansguider', description: 'Omfattende læseplansguider og ressourcer til lektionsplanlægning.' },
    no: { name: 'Læreplansveiledninger', description: 'Omfattende læreplansveiledninger og ressurser for leksjonsplanlegging.' },
    fi: { name: 'Opetussuunnitelmaoppaat', description: 'Kattavat opetussuunnitelmaoppaat ja oppituntisuunnitteluresurssit.' }
  },
  'parent-resources': {
    en: { name: 'Parent Resources', description: 'Guides and tips for parents supporting children\'s education at home.' },
    de: { name: 'Elternressourcen', description: 'Leitfäden und Tipps für Eltern zur Unterstützung der Bildung zu Hause.' },
    fr: { name: 'Ressources pour Parents', description: 'Guides et conseils pour les parents soutenant l\'éducation des enfants à la maison.' },
    es: { name: 'Recursos para Padres', description: 'Guías y consejos para padres que apoyan la educación de sus hijos en casa.' },
    pt: { name: 'Recursos para Pais', description: 'Guias e dicas para pais que apoiam a educação dos filhos em casa.' },
    it: { name: 'Risorse per Genitori', description: 'Guide e consigli per i genitori che supportano l\'istruzione dei bambini a casa.' },
    nl: { name: 'Ouderhulpmiddelen', description: 'Gidsen en tips voor ouders die de educatie van kinderen thuis ondersteunen.' },
    sv: { name: 'Föräldraresurser', description: 'Guider och tips för föräldrar som stödjer barns utbildning hemma.' },
    da: { name: 'Forældreressourcer', description: 'Guider og tips til forældre, der støtter børns uddannelse derhjemme.' },
    no: { name: 'Foreldreressurser', description: 'Guider og tips for foreldre som støtter barns utdanning hjemme.' },
    fi: { name: 'Vanhempien Resurssit', description: 'Oppaita ja vinkkejä vanhemmille, jotka tukevat lasten koulutusta kotona.' }
  },
  'seasonal-content': {
    en: { name: 'Seasonal Content', description: 'Holiday-themed activities and seasonal educational resources.' },
    de: { name: 'Saisonale Inhalte', description: 'Feiertagsthemen-Aktivitäten und saisonale Bildungsressourcen.' },
    fr: { name: 'Contenu Saisonnier', description: 'Activités thématiques de vacances et ressources éducatives saisonnières.' },
    es: { name: 'Contenido Estacional', description: 'Actividades temáticas de festividades y recursos educativos estacionales.' },
    pt: { name: 'Conteúdo Sazonal', description: 'Atividades temáticas de feriados e recursos educacionais sazonais.' },
    it: { name: 'Contenuti Stagionali', description: 'Attività a tema festivo e risorse educative stagionali.' },
    nl: { name: 'Seizoensinhoud', description: 'Vakantie-thema activiteiten en seizoensgebonden educatieve bronnen.' },
    sv: { name: 'Säsongsinnehåll', description: 'Helgtema-aktiviteter och säsongsbetonade utbildningsresurser.' },
    da: { name: 'Sæsonindhold', description: 'Ferietema-aktiviteter og sæsonbestemte uddannelsesressourcer.' },
    no: { name: 'Sesonginnhold', description: 'Ferietema-aktiviteter og sesongbaserte utdanningsressurser.' },
    fi: { name: 'Kauden Sisältö', description: 'Juhla-aiheisia aktiviteetteja ja kausiluonteisia koulutusresursseja.' }
  }
};

// Breadcrumb labels
const BREADCRUMB_LABELS: Record<string, { blog: string; categories: string }> = {
  en: { blog: 'Blog', categories: 'Categories' },
  de: { blog: 'Blog', categories: 'Kategorien' },
  fr: { blog: 'Blog', categories: 'Catégories' },
  es: { blog: 'Blog', categories: 'Categorías' },
  pt: { blog: 'Blog', categories: 'Categorias' },
  it: { blog: 'Blog', categories: 'Categorie' },
  nl: { blog: 'Blog', categories: 'Categorieën' },
  sv: { blog: 'Blogg', categories: 'Kategorier' },
  da: { blog: 'Blog', categories: 'Kategorier' },
  no: { blog: 'Blogg', categories: 'Kategorier' },
  fi: { blog: 'Blogi', categories: 'Kategoriat' }
};

interface CategoryPageProps {
  params: {
    locale: string;
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

// Generate static params for all category/locale combinations
export async function generateStaticParams() {
  const locales = [...SUPPORTED_LOCALES];
  const params = [];

  for (const locale of locales) {
    for (const category of VALID_CATEGORIES) {
      params.push({ locale, category });
    }
  }

  return params;
}

// Fetch posts for a category
async function getCategoryPosts(category: string, locale: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        category: category
      },
      select: {
        id: true,
        slug: true,
        translations: true,
        category: true,
        featuredImage: true,
        createdAt: true,
        _count: {
          select: { pdfs: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Filter posts that have translations for this locale
    return posts.filter(post => {
      const translations = post.translations as any;
      const translation = translations[locale];
      return translation && translation.title && translation.content;
    }).map(post => {
      const translations = post.translations as any;
      const translation = translations[locale];
      return {
        id: post.id,
        slug: translation.slug || post.slug,
        title: translation.title,
        excerpt: translation.excerpt || '',
        author: translation.author || 'LessonCraftStudio Team',
        date: post.createdAt.toISOString().split('T')[0],
        category: post.category,
        featuredImage: translation.featuredImage || post.featuredImage,
        hasSampleWorksheets: post._count.pdfs > 0
      };
    });
  } catch (error) {
    console.error(`Error fetching category posts for ${category}:`, error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = params;
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false }
    };
  }

  const categoryMeta = CATEGORY_TRANSLATIONS[category]?.[locale] || CATEGORY_TRANSLATIONS[category]?.['en'];
  if (!categoryMeta) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false }
    };
  }

  // Fetch posts to calculate total pages
  const posts = await getCategoryPosts(category, locale);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Build canonical URL
  const canonicalUrl = currentPage === 1
    ? `${baseUrl}/${locale}/blog/category/${category}`
    : `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage}`;

  // Build title with page number for pages > 1
  const pageTitle = currentPage > 1
    ? `${categoryMeta.name} - Page ${currentPage} | LessonCraftStudio`
    : `${categoryMeta.name} | Educational Blog | LessonCraftStudio`;

  // Build pagination links
  const otherLinks: Record<string, string> = {};
  if (currentPage > 1) {
    otherLinks.prev = currentPage === 2
      ? `${baseUrl}/${locale}/blog/category/${category}`
      : `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage - 1}`;
  }
  if (currentPage < totalPages) {
    otherLinks.next = `${baseUrl}/${locale}/blog/category/${category}?page=${currentPage + 1}`;
  }

  // Generate hreflang alternates
  const locales = [...SUPPORTED_LOCALES];
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/category/${category}${currentPage > 1 ? `?page=${currentPage}` : ''}`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/blog/category/${category}${currentPage > 1 ? `?page=${currentPage}` : ''}`;

  return {
    title: pageTitle,
    description: categoryMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: categoryMeta.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale
    },
    other: otherLinks
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = params;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Validate category
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const categoryMeta = CATEGORY_TRANSLATIONS[category]?.[locale] || CATEGORY_TRANSLATIONS[category]?.['en'];
  if (!categoryMeta) {
    notFound();
  }

  // Fetch posts
  let allPosts: Awaited<ReturnType<typeof getCategoryPosts>>;
  try {
    allPosts = await getCategoryPosts(category, locale);
  } catch (err) {
    console.error(`Category page error (category=${category}, locale=${locale}):`, err);
    allPosts = [];
  }
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Paginate
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Breadcrumb labels
  const breadcrumbLabel = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS['en'];

  // CollectionPage schema for SEO
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryMeta.name,
    "description": categoryMeta.description,
    "url": `${baseUrl}/${locale}/blog/category/${category}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": categoryMeta.name
    },
    "inLanguage": locale,
    "numberOfItems": allPosts.length,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumb
        locale={locale}
        items={[
          { label: breadcrumbLabel.blog, href: `/${locale}/blog` },
          { label: categoryMeta.name }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryMeta.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {categoryMeta.description}
            </p>
            <p className="mt-4 text-white/70">
              {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 py-12">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.date}</span>
                        {post.hasSampleWorksheets && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            PDF Samples
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
              <Link
                href={`/${locale}/blog`}
                className="mt-4 inline-block text-primary hover:underline"
              >
                View all articles
              </Link>
            </div>
          )}

          {/* Related Products Section - SEO Internal Linking */}
          {posts.length > 0 && (
            <div className="mt-12">
              <RelatedProducts
                locale={locale as SupportedLocale}
                category={category}
                keywords={[]}
                limit={4}
              />
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2
                    ? `/${locale}/blog/category/${category}`
                    : `/${locale}/blog/category/${category}?page=${currentPage - 1}`
                  }
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Previous
                </Link>
              )}

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/${locale}/blog/category/${category}?page=${currentPage + 1}`}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* Back to Blog Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/blog`}
              className="text-primary hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
