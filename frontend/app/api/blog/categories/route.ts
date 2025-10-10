import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CATEGORIES_FILE_PATH = path.join(
  process.cwd(),
  'public',
  'data',
  'blog-categories.json'
);

interface CategoryTranslation {
  id: string;
  translations: {
    en: string;
    de: string;
    fr: string;
    es: string;
    pt: string;
    it: string;
    nl: string;
    sv: string;
    da: string;
    no: string;
    fi: string;
  };
}

interface CategoriesData {
  categories: CategoryTranslation[];
  lastUpdated: string;
}

const DEFAULT_CATEGORIES: CategoriesData = {
  categories: [
    {
      id: 'teaching-resources',
      translations: {
        en: 'Teaching Resources',
        de: 'Unterrichtsmaterialien',
        fr: 'Ressources pédagogiques',
        es: 'Recursos didácticos',
        pt: 'Recursos de ensino',
        it: 'Risorse didattiche',
        nl: 'Onderwijsmiddelen',
        sv: 'Undervisningsresurser',
        da: 'Undervisningsressourcer',
        no: 'Undervisningsressurser',
        fi: 'Opetusresurssit'
      }
    },
    {
      id: 'worksheet-tips',
      translations: {
        en: 'Worksheet Tips',
        de: 'Arbeitsblatt-Tipps',
        fr: 'Conseils sur les fiches',
        es: 'Consejos de hojas de trabajo',
        pt: 'Dicas de planilhas',
        it: 'Suggerimenti per fogli di lavoro',
        nl: 'Werkblad tips',
        sv: 'Arbetsbladstips',
        da: 'Arbejdsarkstips',
        no: 'Arbeidsarktips',
        fi: 'Työarkkivinkkejä'
      }
    },
    {
      id: 'educational-activities',
      translations: {
        en: 'Educational Activities',
        de: 'Bildungsaktivitäten',
        fr: 'Activités éducatives',
        es: 'Actividades educativas',
        pt: 'Atividades educacionais',
        it: 'Attività educative',
        nl: 'Educatieve activiteiten',
        sv: 'Utbildningsaktiviteter',
        da: 'Uddannelsesaktiviteter',
        no: 'Utdanningsaktiviteter',
        fi: 'Koulutustoimintaa'
      }
    },
    {
      id: 'learning-strategies',
      translations: {
        en: 'Learning Strategies',
        de: 'Lernstrategien',
        fr: 'Stratégies d\'apprentissage',
        es: 'Estrategias de aprendizaje',
        pt: 'Estratégias de aprendizagem',
        it: 'Strategie di apprendimento',
        nl: 'Leerstrategieën',
        sv: 'Inlärningsstrategier',
        da: 'Læringsstrategier',
        no: 'Læringsstrategier',
        fi: 'Oppimisstrategiat'
      }
    },
    {
      id: 'curriculum-guides',
      translations: {
        en: 'Curriculum Guides',
        de: 'Lehrplan-Leitfäden',
        fr: 'Guides du programme',
        es: 'Guías del currículo',
        pt: 'Guias de currículo',
        it: 'Guide del curriculum',
        nl: 'Curriculumgidsen',
        sv: 'Läroplansguider',
        da: 'Læseplansguider',
        no: 'Læreplansveiledninger',
        fi: 'Opetussuunnitelmaoppaat'
      }
    },
    {
      id: 'parent-resources',
      translations: {
        en: 'Parent Resources',
        de: 'Elternressourcen',
        fr: 'Ressources pour les parents',
        es: 'Recursos para padres',
        pt: 'Recursos para pais',
        it: 'Risorse per i genitori',
        nl: 'Ouderhulpmiddelen',
        sv: 'Föräldraresurser',
        da: 'Forældreressourcer',
        no: 'Foreldreressurser',
        fi: 'Vanhempien resurssit'
      }
    },
    {
      id: 'seasonal-content',
      translations: {
        en: 'Seasonal Content',
        de: 'Saisonale Inhalte',
        fr: 'Contenu saisonnier',
        es: 'Contenido estacional',
        pt: 'Conteúdo sazonal',
        it: 'Contenuti stagionali',
        nl: 'Seizoensgebonden inhoud',
        sv: 'Säsongsinnehåll',
        da: 'Sæsonindhold',
        no: 'Sesonginnhold',
        fi: 'Kauden sisältö'
      }
    }
  ],
  lastUpdated: new Date().toISOString()
};

// GET /api/blog/categories?locale=en - Get categories for a specific locale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const locale = searchParams.get('locale') || 'en';

    // Read categories from JSON file
    let data: CategoriesData;
    try {
      const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // Return default categories if file doesn't exist
      data = DEFAULT_CATEGORIES;
    }

    // Transform to locale-specific format
    const categories = data.categories.map(cat => ({
      id: cat.id,
      label: cat.translations[locale as keyof typeof cat.translations] || cat.translations.en
    }));

    return NextResponse.json({
      categories,
      locale,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', categories: [] },
      { status: 500 }
    );
  }
}