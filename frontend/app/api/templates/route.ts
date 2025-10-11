import { NextRequest, NextResponse } from 'next/server';
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
      // Get worksheet templates directly from filesystem
      const templatesDir = path.join(getSourceRoot(), 'public', 'images', 'worksheet-templates');

      if (!fs.existsSync(templatesDir)) {
        console.log(`Worksheet templates directory not found: ${templatesDir}`);
        return NextResponse.json({ templates: [] });
      }

      // Read all theme directories
      const themeDirs = fs.readdirSync(templatesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      // Collect all templates from all themes
      const templates: any[] = [];

      for (const themeName of themeDirs) {
        const themeDir = path.join(templatesDir, themeName);

        try {
          const files = fs.readdirSync(themeDir);
          const imageFiles = files.filter(file => /\.(png|jpe?g|gif|svg|webp)$/i.test(file));

          imageFiles.forEach(file => {
            const fileName = path.basename(file, path.extname(file));
            // Clean up the filename by removing timestamp-random suffix pattern
            const cleanName = fileName.replace(/-\d{13}-[a-z0-9]{6}$/i, '');
            const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).replace(/[-_]/g, ' ');

            templates.push({
              path: `/images/worksheet-templates/${themeName}/${file}`,
              url: `/images/worksheet-templates/${themeName}/${file}`,
              name: displayName,
              displayName: displayName,
              theme: themeName
            });
          });
        } catch (err) {
          console.error(`Error reading worksheet template theme ${themeName}:`, err);
        }
      }

      console.log(`Worksheet templates for ${appType}, locale=${locale}: ${templates.length} templates from ${themeDirs.length} themes`);
      return NextResponse.json({ templates });
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