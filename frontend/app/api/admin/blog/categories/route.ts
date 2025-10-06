import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

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

// GET /api/admin/blog/categories - Get all categories with translations
export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Read categories from JSON file
    const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const data: CategoriesData = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to read categories:', error);

    // Return default categories if file doesn't exist
    const defaultCategories: CategoriesData = {
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

    return NextResponse.json(defaultCategories);
  }
}

// POST /api/admin/blog/categories - Add new category
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const body = await request.json();
    const { id, translations } = body;

    if (!id || !translations) {
      return NextResponse.json(
        { error: 'Category ID and translations are required' },
        { status: 400 }
      );
    }

    // Validate ID format (lowercase, numbers, hyphens only)
    if (!/^[a-z0-9-]+$/.test(id)) {
      return NextResponse.json(
        { error: 'Category ID must be lowercase letters, numbers, and hyphens only' },
        { status: 400 }
      );
    }

    // Validate translations object has required languages
    const requiredLanguages = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
    const missingLanguages = requiredLanguages.filter(lang => !translations[lang]);
    if (missingLanguages.length > 0) {
      return NextResponse.json(
        { error: `Missing translations for: ${missingLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Read existing categories
    let data: CategoriesData;
    try {
      const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist, create new
      data = { categories: [], lastUpdated: new Date().toISOString() };
    }

    // Check if category already exists
    if (data.categories.some(cat => cat.id === id)) {
      return NextResponse.json(
        { error: 'Category with this ID already exists' },
        { status: 400 }
      );
    }

    // Add new category
    data.categories.push({ id, translations });
    data.lastUpdated = new Date().toISOString();

    // Ensure directory exists
    await fs.mkdir(path.dirname(CATEGORIES_FILE_PATH), { recursive: true });

    // Write back to file
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ category: { id, translations }, message: 'Category added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to add category:', error);
    return NextResponse.json(
      { error: 'Failed to add category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/categories - Update category
export async function PUT(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const body = await request.json();
    const { id, translations } = body;

    if (!id || !translations) {
      return NextResponse.json(
        { error: 'Category ID and translations are required' },
        { status: 400 }
      );
    }

    // Read existing categories
    const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const data: CategoriesData = JSON.parse(fileContent);

    // Find category index
    const categoryIndex = data.categories.findIndex(cat => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Update category
    data.categories[categoryIndex].translations = translations;
    data.lastUpdated = new Date().toISOString();

    // Write back to file
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ category: data.categories[categoryIndex], message: 'Category updated successfully' });
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/categories?id=category-id - Delete category
export async function DELETE(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Read existing categories
    const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const data: CategoriesData = JSON.parse(fileContent);

    // Find category
    const categoryIndex = data.categories.findIndex(cat => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if any blog posts use this category
    const { prisma } = require('@/lib/prisma');
    const postsWithCategory = await prisma.blogPost.count({
      where: { category: id }
    });

    if (postsWithCategory > 0) {
      return NextResponse.json(
        { error: `Cannot delete category: ${postsWithCategory} blog post(s) are using this category` },
        { status: 400 }
      );
    }

    // Remove category
    data.categories.splice(categoryIndex, 1);
    data.lastUpdated = new Date().toISOString();

    // Write back to file
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
