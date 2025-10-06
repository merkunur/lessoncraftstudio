import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Image Library API Route - Database-First with Filesystem Fallback
 *
 * This route serves images with translations from:
 * 1. PRIMARY: PostgreSQL database (managed via content manager)
 * 2. FALLBACK: Filesystem translations.json files (legacy)
 *
 * It supports:
 * - Theme-based filtering (?theme=animals)
 * - Search functionality (?search=cat)
 * - Multi-language translations (?locale=sv)
 * - Pagination
 */

// Folders to exclude from image themes
const EXCLUDED_FOLDERS = [
  'borders',
  'backgrounds',
  'drawing lines',
  'template',
  'alphabetsvg',
  'background',
  'Miscellaneous',
  'ali',
  'train_templates',
  'worksheet_templates',
  'icons',
  'cute' // subdirectory
];

/**
 * Load translations from a translations.json file
 */
function loadTranslations(themePath: string): any | null {
  const translationsPath = path.join(themePath, 'translations.json');
  if (fs.existsSync(translationsPath)) {
    try {
      const content = fs.readFileSync(translationsPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Failed to parse translations for ${themePath}:`, error);
    }
  }
  return null;
}

/**
 * Get translated name for an image
 */
function getImageName(fileName: string, translations: any, locale: string): string {
  // Remove file extension to get the key
  const imageKey = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();

  // Check translations
  if (translations?.images?.[imageKey]) {
    return translations.images[imageKey][locale] ||
           translations.images[imageKey]['en'] ||
           fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').replace(/[-_]/g, ' ');
  }

  // Fallback: format filename nicely
  return fileName
    .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all images from a specific theme folder
 */
function getImagesFromTheme(themeName: string, locale: string): any[] {
  const themePath = path.join(process.cwd(), 'public', 'images', themeName);

  if (!fs.existsSync(themePath)) {
    return [];
  }

  // Load translations
  const translations = loadTranslations(themePath);

  // Get all image files
  const files = fs.readdirSync(themePath, { withFileTypes: true });
  const imageExtensions = /\.(png|jpg|jpeg|gif|svg)$/i;

  return files
    .filter(file => {
      // Only include files (not directories) that match image extensions
      return file.isFile() &&
             imageExtensions.test(file.name) &&
             file.name !== 'translations.json';
    })
    .map(file => {
      const imageName = getImageName(file.name, translations, locale);

      return {
        path: `/images/${themeName}/${file.name}`,
        url: `/images/${themeName}/${file.name}`,
        name: imageName,
        word: imageName,
        theme: themeName
      };
    });
}

/**
 * Get all available theme folders
 */
function getAllThemes(): string[] {
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  const files = fs.readdirSync(imagesDir, { withFileTypes: true });

  return files
    .filter(file => file.isDirectory() && !EXCLUDED_FOLDERS.includes(file.name))
    .map(file => file.name);
}

/**
 * Load images from database (primary source)
 */
async function getImagesFromDatabase(themeName: string | null, locale: string): Promise<any[]> {
  try {
    const whereClause: any = { type: 'images' };
    if (themeName && themeName !== 'all') {
      whereClause.name = themeName;
    }

    const themes = await prisma.imageTheme.findMany({
      where: whereClause,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    const allImages: any[] = [];

    for (const theme of themes) {
      for (const image of theme.images) {
        const translations = image.translations as Record<string, string> || {};
        const imageName = translations[locale] || translations['en'] || image.filename.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');

        allImages.push({
          path: image.filePath,
          url: image.filePath,
          name: imageName,
          word: imageName,
          theme: theme.name
        });
      }
    }

    return allImages;
  } catch (error) {
    console.warn('Database unavailable, falling back to filesystem:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  const locale = searchParams.get('locale') || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    let allImages: any[] = [];

    // Try database first (primary source)
    allImages = await getImagesFromDatabase(theme, locale);

    // If database returned no images, fall back to filesystem
    if (allImages.length === 0) {
      if (!theme || theme === 'all') {
        // Get images from ALL themes
        const themes = getAllThemes();

        for (const themeName of themes) {
          const themeImages = getImagesFromTheme(themeName, locale);
          allImages.push(...themeImages);
        }
      } else {
        // Get images from specific theme
        allImages = getImagesFromTheme(theme, locale);
      }
    }

    // Apply search filter if provided
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      allImages = allImages.filter(img =>
        img.name.toLowerCase().includes(searchLower) ||
        img.word.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedImages = allImages.slice(startIndex, endIndex);

    return NextResponse.json({
      images: paginatedImages,
      pagination: {
        page,
        limit,
        total: allImages.length,
        totalPages: Math.ceil(allImages.length / limit),
        hasMore: endIndex < allImages.length
      }
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch images',
        images: [],
        pagination: {
          page: 1,
          limit,
          total: 0,
          totalPages: 0,
          hasMore: false
        }
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }
    );
  }
}
