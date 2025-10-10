import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const diagnostic: any = {
      timestamp: new Date().toISOString(),
      database: {},
      filesystem: {}
    };

    // Check database
    const themes = await prisma.imageTheme.findMany({
      where: { type: 'images' },
      include: {
        images: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    diagnostic.database.themesCount = themes.length;
    diagnostic.database.themes = themes.map(t => ({
      name: t.name,
      imageCount: t.images.length,
      latestImages: t.images.map(img => ({
        filename: img.filename,
        filePath: img.filePath,
        createdAt: img.createdAt
      }))
    }));

    // Check filesystem
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const libraryDir = path.join(imagesDir, 'library');

    diagnostic.filesystem.imagesDir = fs.existsSync(imagesDir);
    diagnostic.filesystem.libraryDir = fs.existsSync(libraryDir);

    // Check specific theme folders
    const themeFolders = ['animals', 'food', 'furniture'];
    diagnostic.filesystem.themeFolders = {};

    for (const folder of themeFolders) {
      const themePath = path.join(imagesDir, folder);
      const libraryThemePath = path.join(libraryDir, folder);

      diagnostic.filesystem.themeFolders[folder] = {
        exists: fs.existsSync(themePath),
        libraryExists: fs.existsSync(libraryThemePath),
        filesInRoot: fs.existsSync(themePath) ? fs.readdirSync(themePath).filter(f => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f)).slice(0, 5) : [],
        filesInLibrary: fs.existsSync(libraryThemePath) ? fs.readdirSync(libraryThemePath).filter(f => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f)).slice(0, 5) : []
      };
    }

    return NextResponse.json(diagnostic, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
