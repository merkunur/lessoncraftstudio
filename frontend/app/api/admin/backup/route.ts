import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '@/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

/**
 * GET /api/admin/backup
 * Export all image library data as JSON backup
 */
export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Get all themes with images
    const themes = await prisma.imageTheme.findMany({
      include: {
        images: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    const backup = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: adminCheck.email || 'unknown',
      themes: themes.map(theme => ({
        id: theme.id,
        name: theme.name,
        displayNames: theme.displayNames,
        type: theme.type,
        sortOrder: theme.sortOrder,
        images: theme.images.map(img => ({
          id: img.id,
          filename: img.filename,
          filePath: img.filePath,
          fileSize: img.fileSize,
          mimeType: img.mimeType,
          width: img.width,
          height: img.height,
          translations: img.translations,
          sortOrder: img.sortOrder,
        })),
      })),
      statistics: {
        totalThemes: themes.length,
        totalImages: themes.reduce((sum, t) => sum + t.images.length, 0),
        byType: themes.reduce((acc, t) => {
          acc[t.type] = (acc[t.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      },
    };

    // Generate filename with timestamp
    const filename = `lessoncraftstudio-backup-${new Date().toISOString().split('T')[0]}.json`;

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/backup
 * Restore image library data from JSON backup
 */
export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const backup = await request.json();

    // Validate backup structure
    if (!backup.themes || !Array.isArray(backup.themes)) {
      return NextResponse.json(
        { error: 'Invalid backup file structure' },
        { status: 400 }
      );
    }

    // Statistics
    let themesCreated = 0;
    let themesUpdated = 0;
    let imagesCreated = 0;
    const errors: string[] = [];

    // Process each theme
    for (const themeData of backup.themes) {
      try {
        // Check if theme exists
        const existingTheme = await prisma.imageTheme.findFirst({
          where: {
            name: themeData.name,
            type: themeData.type || 'images',
          },
        });

        let theme;
        if (existingTheme) {
          // Update existing theme
          theme = await prisma.imageTheme.update({
            where: { id: existingTheme.id },
            data: {
              displayNames: themeData.displayNames || existingTheme.displayNames,
              sortOrder: themeData.sortOrder ?? existingTheme.sortOrder,
            },
          });
          themesUpdated++;
        } else {
          // Create new theme
          theme = await prisma.imageTheme.create({
            data: {
              name: themeData.name,
              displayNames: themeData.displayNames || { en: themeData.name },
              type: themeData.type || 'images',
              sortOrder: themeData.sortOrder || 0,
            },
          });
          themesCreated++;
        }

        // Process images for this theme (only if they don't exist)
        if (themeData.images && Array.isArray(themeData.images)) {
          for (const imgData of themeData.images) {
            try {
              // Check if image already exists
              const existingImage = await prisma.imageLibraryItem.findFirst({
                where: {
                  themeId: theme.id,
                  filename: imgData.filename,
                },
              });

              if (!existingImage && imgData.filePath) {
                // Only create if file exists on disk
                const filePath = path.join(process.cwd(), 'public', imgData.filePath);
                try {
                  await fs.access(filePath);

                  // Create image record
                  await prisma.imageLibraryItem.create({
                    data: {
                      themeId: theme.id,
                      filename: imgData.filename,
                      filePath: imgData.filePath,
                      fileSize: imgData.fileSize || 0,
                      mimeType: imgData.mimeType || 'image/png',
                      width: imgData.width,
                      height: imgData.height,
                      translations: imgData.translations || {},
                      sortOrder: imgData.sortOrder || 0,
                    },
                  });
                  imagesCreated++;
                } catch (fileError) {
                  errors.push(`File not found: ${imgData.filePath}`);
                }
              }
            } catch (imgError) {
              errors.push(`Failed to restore image ${imgData.filename}: ${imgError instanceof Error ? imgError.message : 'Unknown error'}`);
            }
          }
        }
      } catch (themeError) {
        errors.push(`Failed to restore theme ${themeData.name}: ${themeError instanceof Error ? themeError.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Backup restored successfully',
      statistics: {
        themesCreated,
        themesUpdated,
        imagesCreated,
        errors: errors.length > 0 ? errors : undefined,
      },
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json(
      { error: 'Failed to restore backup', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
