import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Supported locales
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Translations for the Free Sample Worksheets section
const WORKSHEET_TRANSLATIONS: Record<string, { title: string; subtitle: string; downloadText: string; freeText: string; descriptionText: string }> = {
  en: {
    title: 'Free Sample Worksheets',
    subtitle: 'Premium educational resources designed by experts to accelerate learning and inspire students',
    downloadText: 'Download Now',
    freeText: 'Free',
    descriptionText: 'Premium educational worksheet designed to enhance learning through engaging exercises and activities'
  },
  de: {
    title: 'Kostenlose Beispiel-Arbeitsblätter',
    subtitle: 'Premium-Bildungsressourcen, entwickelt von Experten, um das Lernen zu beschleunigen und Schüler zu inspirieren',
    downloadText: 'Jetzt herunterladen',
    freeText: 'Kostenlos',
    descriptionText: 'Premium-Bildungsarbeitsblatt zur Verbesserung des Lernens durch ansprechende Übungen und Aktivitäten'
  },
  fr: {
    title: 'Feuilles de travail échantillons gratuites',
    subtitle: 'Ressources éducatives premium conçues par des experts pour accélérer l\'apprentissage et inspirer les étudiants',
    downloadText: 'Télécharger maintenant',
    freeText: 'Gratuit',
    descriptionText: 'Feuille de travail éducative premium conçue pour améliorer l\'apprentissage grâce à des exercices et activités engageants'
  },
  es: {
    title: 'Hojas de trabajo de muestra gratuitas',
    subtitle: 'Recursos educativos premium diseñados por expertos para acelerar el aprendizaje e inspirar a los estudiantes',
    downloadText: 'Descargar ahora',
    freeText: 'Gratis',
    descriptionText: 'Hoja de trabajo educativa premium diseñada para mejorar el aprendizaje a través de ejercicios y actividades atractivos'
  },
  pt: {
    title: 'Planilhas de amostra grátis',
    subtitle: 'Recursos educacionais premium projetados por especialistas para acelerar o aprendizado e inspirar os alunos',
    downloadText: 'Baixar agora',
    freeText: 'Grátis',
    descriptionText: 'Planilha educacional premium projetada para aprimorar o aprendizado por meio de exercícios e atividades envolventes'
  },
  it: {
    title: 'Fogli di lavoro campione gratuiti',
    subtitle: 'Risorse educative premium progettate da esperti per accelerare l\'apprendimento e ispirare gli studenti',
    downloadText: 'Scarica ora',
    freeText: 'Gratuito',
    descriptionText: 'Foglio di lavoro educativo premium progettato per migliorare l\'apprendimento attraverso esercizi e attività coinvolgenti'
  },
  nl: {
    title: 'Gratis voorbeeldwerkbladen',
    subtitle: 'Premium educatieve bronnen ontworpen door experts om leren te versnellen en studenten te inspireren',
    downloadText: 'Download nu',
    freeText: 'Gratis',
    descriptionText: 'Premium educatief werkblad ontworpen om het leren te verbeteren door middel van boeiende oefeningen en activiteiten'
  },
  sv: {
    title: 'Gratis exempelarbetsblad',
    subtitle: 'Premium utbildningsresurser designade av experter för att påskynda lärande och inspirera studenter',
    downloadText: 'Ladda ner nu',
    freeText: 'Gratis',
    descriptionText: 'Premium utbildningsarbetsblad designat för att förbättra lärande genom engagerande övningar och aktiviteter'
  },
  da: {
    title: 'Gratis eksempel arbejdsark',
    subtitle: 'Premium uddannelsesressourcer designet af eksperter for at fremskynde læring og inspirere studerende',
    downloadText: 'Download nu',
    freeText: 'Gratis',
    descriptionText: 'Premium uddannelsesarbejdsark designet til at forbedre læring gennem engagerende øvelser og aktiviteter'
  },
  no: {
    title: 'Gratis eksempel arbeidsark',
    subtitle: 'Premium utdanningsressurser designet av eksperter for å akselerere læring og inspirere studenter',
    downloadText: 'Last ned nå',
    freeText: 'Gratis',
    descriptionText: 'Premium utdanningsarbeidsark designet for å forbedre læring gjennom engasjerende øvelser og aktiviteter'
  },
  fi: {
    title: 'Ilmaiset esimerkkitehtävät',
    subtitle: 'Asiantuntijoiden suunnittelemat premium-opetusresurssit oppimisen nopeuttamiseksi ja oppilaiden inspiroimiseksi',
    downloadText: 'Lataa nyt',
    freeText: 'Ilmainen',
    descriptionText: 'Premium-opetustehtävä, joka on suunniteltu parantamaan oppimista kiinnostavien harjoitusten ja aktiviteettien avulla'
  }
};

// Generate static HTML file for a blog post
async function generateStaticHTML(data: any, locale: string, allLanguages: Record<string, any> = {}): Promise<string> {
  const {
    title,
    content,
    metaTitle,
    metaDescription,
    keywords,
    category,
    author,
    date,
    readTime,
    sampleWorksheets = [],
    slug
  } = data;

  // Generate hreflang links using language-specific slugs (Bug 4 fix)
  // Only include languages that have actual translations with title AND content
  const hreflangLinks = LOCALES
    .filter(lang => allLanguages[lang]?.title && allLanguages[lang]?.content)
    .map(lang => {
      const langSlug = allLanguages[lang]?.slug || slug;
      return `  <link rel="alternate" hreflang="${lang}" href="https://lessoncraftstudio.com/${lang}/blog/${langSlug}" />`;
    }).join('\n');

  // Add x-default pointing to English (or primary slug if no English)
  const defaultSlug = allLanguages['en']?.slug || slug;
  const xDefaultLink = allLanguages['en']?.title && allLanguages['en']?.content
    ? `  <link rel="alternate" hreflang="x-default" href="https://lessoncraftstudio.com/en/blog/${defaultSlug}" />`
    : `  <link rel="alternate" hreflang="x-default" href="https://lessoncraftstudio.com/en/blog/${slug}" />`;
  const allHreflangLinks = hreflangLinks + (hreflangLinks ? '\n' : '') + xDefaultLink;

  // Fetch PDFs for this language from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      pdfs: {
        where: { language: locale }, // Filter by language
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  const pdfsToShow = post?.pdfs || [];

  // Get PDF section translations from post data or fall back to defaults
  const pdfTitle = data.pdfSectionTitle || (WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en']).title;
  const pdfSubtitle = data.pdfSectionDescription || (WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en']).subtitle;
  const translations = WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en'];

  // Get custom PDF label translations (new fields from blog content manager)
  const pdfFreeLabel = data.pdfFreeLabel || translations.freeText;
  const pdfPremiumLabel = data.pdfPremiumLabel || 'Premium';
  const pdfDownloadButton = data.pdfDownloadButton || translations.downloadText;

  // Generate sample worksheet download section if PDFs exist
  const worksheetSection = pdfsToShow.length > 0 ? `
    <section class="sample-worksheets" id="sample-worksheets">
      <div class="worksheets-container">
        <div class="section-header">
          <h2 class="section-title">${pdfTitle}</h2>
          <p class="section-subtitle">${pdfSubtitle}</p>
        </div>

        <div class="worksheet-grid">
          ${pdfsToShow.map((pdf: any, index: number) => {
            // Use title and description from database (language-specific)
            const displayTitle = pdf.title;
            const displayDescription = pdf.description;
            const thumbnail = pdf.thumbnail || '/blog/thumbnails/default-pdf.svg';
            const fileSize = `${(pdf.fileSize / 1024).toFixed(1)} KB`;
            const filePath = pdf.filePath;

            return `
          <div class="worksheet-card">
            <div class="card-thumbnail">
              ${thumbnail && thumbnail !== '/blog/thumbnails/default-pdf.svg' ?
                `<img src="${thumbnail}" alt="${displayTitle} preview" loading="lazy" />` :
                `<div class="default-pdf-icon">
                  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                    <rect width="80" height="100" rx="8" fill="url(#pdf-gradient-${index})"/>
                    <text x="40" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">PDF</text>
                  </svg>
                  <defs>
                    <linearGradient id="pdf-gradient-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </div>`
              }
              <div class="card-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6" stroke="white" stroke-width="2"/>
                </svg>
                PDF
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">${displayTitle}</h3>
              <p class="card-description">${displayDescription}</p>
              <div class="card-meta">
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  ${fileSize}
                </span>
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  ${pdf.price === 'Free' ? pdfFreeLabel : pdfPremiumLabel}
                </span>
              </div>
            </div>
            <a href="${filePath}"
               download="${pdf.filename}"
               class="download-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2v13m0 0l-4-4m4 4l4-4"/>
                <path d="M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2h-2"/>
                <path d="M5 19a2 2 0 01-2-2v-5a2 2 0 012-2h2"/>
              </svg>
              <span>${pdfDownloadButton}</span>
              <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </a>
          </div>`;
          }).join('')}
        </div>
      </div>
    </section>
  ` : '';

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metaTitle || title}</title>
  <meta name="description" content="${metaDescription || title}">
  <meta name="keywords" content="${keywords || ''}">
  <meta name="author" content="${author}">
  <meta name="date" content="${date}">
  <meta name="category" content="${category}">
  <meta name="readTime" content="${readTime}">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://lessoncraftstudio.com/${locale}/blog/${data.slug || slug}" />

  <!-- Hreflang tags for all languages -->
${allHreflangLinks}

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${metaTitle || title}">
  <meta property="og:description" content="${metaDescription || title}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://lessoncraftstudio.com/${locale}/blog/${slug}">
  <meta property="og:site_name" content="LessonCraftStudio">
  <meta property="og:locale" content="${locale}">

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaTitle || title}">
  <meta name="twitter:description" content="${metaDescription || title}">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "description": "${metaDescription || title}",
    "author": {
      "@type": "Person",
      "name": "${author}"
    },
    "datePublished": "${date}",
    "dateModified": "${date}",
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": "https://lessoncraftstudio.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://lessoncraftstudio.com/${locale}/blog/${slug}"
    }
  }
  </script>

  <!-- Styles -->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 0;
      text-align: center;
      margin-bottom: 40px;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
    }

    .meta {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      opacity: 0.9;
      font-size: 0.95em;
    }

    .meta span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    article {
      padding: 40px 0;
      font-size: 1.1em;
      line-height: 1.8;
    }

    article h2 {
      margin: 30px 0 20px;
      color: #2d3748;
    }

    article h3 {
      margin: 25px 0 15px;
      color: #4a5568;
    }

    article p {
      margin-bottom: 20px;
    }

    article ul, article ol {
      margin: 20px 0;
      padding-left: 30px;
    }

    article li {
      margin-bottom: 10px;
    }

    article img {
      max-width: 100%;
      height: auto;
      margin: 20px 0;
      border-radius: 8px;
    }

    /* Ultra-Modern Professional Worksheet Download Section - 2024 Design Standards */
    .sample-worksheets {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 80px 0;
      margin: 60px 0;
      position: relative;
      overflow: visible;
      border-top: 2px solid #e2e8f0;
      border-bottom: 2px solid #e2e8f0;
    }

    .sample-worksheets::before {
      content: '';
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
      border-radius: 2px;
    }

    .worksheets-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
      position: relative;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 900;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
      position: relative;
      display: inline-block;
    }

    .section-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.8;
      font-weight: 400;
      letter-spacing: -0.01em;
    }

    .worksheet-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 40px;
      padding: 0;
    }

    .worksheet-card {
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
    }

    .worksheet-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .worksheet-card:hover {
      transform: translateY(-12px) scale(1.02);
      border-color: transparent;
      box-shadow:
        0 30px 60px -15px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(99, 102, 241, 0.1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.9);
    }

    .worksheet-card:hover::before {
      opacity: 1;
    }

    .card-thumbnail {
      position: relative;
      width: 100%;
      height: 280px;
      background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .card-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 20px;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .worksheet-card:hover .card-thumbnail img {
      transform: scale(1.1) rotate(2deg);
    }

    .card-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .card-content {
      padding: 32px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background: white;
    }

    .card-title {
      font-size: 1.5rem;
      color: #111827;
      margin-bottom: 12px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    .card-description {
      font-size: 1rem;
      color: #6b7280;
      margin-bottom: 24px;
      line-height: 1.7;
      flex-grow: 1;
    }

    .card-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 28px;
      padding: 20px;
      background: linear-gradient(135deg, #f9fafb, #f3f4f6);
      border-radius: 16px;
      margin-left: -8px;
      margin-right: -8px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      color: #4b5563;
      font-weight: 500;
    }

    .meta-item svg {
      width: 18px;
      height: 18px;
      stroke: #6366f1;
      stroke-width: 2.5;
    }

    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
      color: white;
      padding: 18px 32px;
      text-decoration: none;
      border-radius: 16px;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      border: none;
      width: calc(100% - 48px);
      margin: 0 24px 24px;
      position: relative;
      overflow: hidden;
      letter-spacing: -0.01em;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }

    .download-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.5s ease;
    }

    .download-btn:hover {
      transform: translateY(-3px);
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      box-shadow:
        0 20px 40px rgba(99, 102, 241, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .download-btn:hover::before {
      left: 100%;
    }

    .download-btn svg {
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .download-btn:hover svg {
      transform: translateY(3px) scale(1.2);
      animation: bounce 0.5s ease;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(3px) scale(1.2); }
      50% { transform: translateY(-2px) scale(1.2); }
    }

    .default-pdf-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 40px;
    }

    .download-btn .arrow-icon {
      margin-left: auto;
      transition: transform 0.3s ease;
    }

    .download-btn:hover .arrow-icon {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .worksheet-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .section-title {
        font-size: 2rem;
      }

      .card-thumbnail {
        height: 200px;
      }

      .worksheet-card {
        border-radius: 20px;
      }
    }

    footer {
      background: #2d3748;
      color: white;
      text-align: center;
      padding: 40px 0;
      margin-top: 0;
    }

    footer a {
      color: #a0aec0;
      text-decoration: none;
    }

    footer a:hover {
      color: white;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2em;
      }

      .meta {
        font-size: 0.9em;
      }

      article {
        font-size: 1em;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>${title}</h1>
      <div class="meta">
        <span>📝 ${category}</span>
        <span>👤 ${author}</span>
        <span>📅 ${date}</span>
        <span>⏱️ ${readTime}</span>
      </div>
    </div>
  </header>

  <main>
    <div class="container">
      <article>
        ${content}
      </article>
    </div>

    ${worksheetSection}
  </main>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
      <p><a href="https://lessoncraftstudio.com">Create Your Own Worksheets</a></p>
    </div>
  </footer>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, languages } = body;

    if (!slug || !languages) {
      return NextResponse.json(
        { error: 'Missing required fields: slug and languages' },
        { status: 400 }
      );
    }

    const publishedUrls: string[] = [];

    // Generate and save HTML files for each language
    for (const [locale, data] of Object.entries(languages)) {
      if (!data || typeof data !== 'object') continue;

      // Skip languages without actual content
      const blogData = data as any;
      if (!blogData.title || !blogData.content) {
        console.log(`Skipping ${locale} - no title or content`);
        continue;
      }

      // Generate the HTML content (pass all languages for hreflang generation)
      const html = await generateStaticHTML({ ...data, slug }, locale, languages as Record<string, any>);

      // Create directory if it doesn't exist
      const blogDir = path.join(process.cwd(), 'public', 'blog', locale);
      await fs.mkdir(blogDir, { recursive: true });

      // Write the HTML file
      const filePath = path.join(blogDir, `${slug}.html`);
      await fs.writeFile(filePath, html, 'utf-8');

      publishedUrls.push(`/${locale}/blog/${slug}`);

      // PDFs are now stored in the shared /blog/pdfs/[slug]/ directory
      // No need to create separate samples directories
    }

    // Invalidate cache (use localhost for internal call to avoid SSL issues)
    try {
      await fetch(`http://localhost:3000/api/blog/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'invalidate-cache' })
      });
    } catch (error) {
      console.log('Cache invalidation failed (non-critical):', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post published successfully',
      publishedUrls,
      slug
    });

  } catch (error) {
    console.error('Error publishing blog post:', error);
    return NextResponse.json(
      {
        error: 'Failed to publish blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}