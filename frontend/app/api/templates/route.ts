import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Get the true source directory (not standalone)
function getSourceRoot(): string {
  const cwd = process.cwd();
  if (cwd.endsWith('.next/standalone') || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '../..');
  }
  return cwd;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appType = searchParams.get('appType');
  const locale = searchParams.get('locale') || 'en';

  try {
    // Determine which templates to fetch based on app type
    if (appType === 'alphabet-train' || appType === 'pattern-train') {
      // Get train templates from local JSON
      const metadataPath = path.join(getSourceRoot(), 'public', 'data', 'train-templates-metadata.json');

      if (!fs.existsSync(metadataPath)) {
        return NextResponse.json([]);
      }

      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

      // Extract all images from all themes
      const templates = metadata.themes?.flatMap((theme: any) => {
        if (!theme.images || !Array.isArray(theme.images)) {
          return [];
        }
        return theme.images.map((img: any) => ({
          path: img.path,
          url: img.path,
          name: img.translations?.[locale] || img.translations?.['en'] || img.displayName || img.filename
        }));
      }) || [];

      console.log(`Train templates for ${appType}, locale=${locale}:`, templates.length);
      return NextResponse.json(templates);

    } else if (appType === 'prepositions') {
      // Get worksheet templates from database
      const prisma = new PrismaClient();

      try {
        type ThemeWithImages = Prisma.ImageThemeGetPayload<{
          include: { images: true }
        }>;

        const themes: ThemeWithImages[] = await prisma.imageTheme.findMany({
          where: { type: 'worksheet' },
          include: {
            images: {
              orderBy: { sortOrder: 'asc' },
            },
          },
          orderBy: { sortOrder: 'asc' },
        });

        const templates: any[] = [];

        for (const themeRecord of themes) {
          const themeTranslations = themeRecord.displayNames as Record<string, string> || {};
          const themeName = themeTranslations[locale] || themeTranslations['en'] || themeRecord.name;

          for (const image of themeRecord.images) {
            const translations = image.translations as Record<string, string> || {};
            const displayName = translations[locale] || translations['en'] || image.filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '');

            templates.push({
              path: image.filePath,
              url: image.filePath,
              name: displayName,
              displayName: displayName,
              theme: themeRecord.name,
              themeName: themeName,
            });
          }
        }

        console.log(`Worksheet templates for ${appType}, locale=${locale}: ${templates.length} templates from ${themes.length} themes`);
        await prisma.$disconnect();
        return NextResponse.json({ templates });

      } catch (dbError) {
        console.warn('Database not available for worksheet templates:', dbError);
        await prisma.$disconnect();
        return NextResponse.json({ templates: [] });
      }
    }

    // If no specific app type, return empty array
    return NextResponse.json([]);

    /* Legacy fallback code (keeping for reference)
    if (templates.length === 0) {
      const templatePath = path.join(process.cwd(), 'public', 'images', 'template');
      
      if (fs.existsSync(templatePath)) {
        const files = fs.readdirSync(templatePath)
          .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));
        
        const fileSystemTemplates = files.map(file => {
          const name = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
          let type = 'general';
          
          // Infer app type from filename
          if (name.includes('code') || name.includes('addition')) {
            type = 'code-addition';
          } else if (name.includes('math')) {
            type = 'math-worksheet';
          } else if (name.includes('word') && name.includes('search')) {
            type = 'word-search';
          } else if (name.includes('whiteboard')) {
            type = 'whiteboard';
          }
          
          if (appType && type !== appType) return null;
          
          return {
            name: name,
            url: `/images/template/${file}`,
            path: `/images/template/${file}`,
            appType: type,
            description: `Template for ${type}`,
            config: null
          };
        }).filter(Boolean);
        
        return NextResponse.json(fileSystemTemplates);
      }
    }

    // Map Directus URLs to local paths (unreachable code - commented out)
    const mappedTemplates = templates.map(template => ({
      ...template,
      path: template.url?.startsWith('/assets/')
        ? `/images/template/${template.name}.png`
        : template.url
    }));

    return NextResponse.json(mappedTemplates);
    */
    
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}