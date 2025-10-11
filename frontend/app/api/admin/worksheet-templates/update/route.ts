import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { withCors } from '@/lib/cors';
import { withAdmin } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * GET /api/admin/worksheet-templates/update
 * Retrieves all worksheet template themes and their associated images from database
 */
async function getHandler(request: NextRequest, userId: string) {
  try {
    const type = 'worksheet';

    type ThemeWithImages = Prisma.ImageThemeGetPayload<{
      include: { images: true }
    }>;
    let themes: ThemeWithImages[];

    try {
      themes = await prisma.imageTheme.findMany({
        where: {
          type: type,
        },
        include: {
          images: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      });
    } catch (dbError) {
      console.warn('Database not available, using empty data:', dbError);
      themes = [];
    }

    const metadata = {
      themes: themes.map(theme => ({
        id: theme.name,
        name: theme.name,
        dbId: theme.id,
        displayNames: theme.displayNames as Record<string, string>,
        active: true,
        sortOrder: theme.sortOrder,
        images: theme.images.map(img => ({
          filename: img.filename,
          path: img.filePath,
          displayName: (img.translations as any)?.en || img.filename,
          translations: img.translations as Record<string, string>,
          fileSize: img.fileSize,
          mimeType: img.mimeType,
          width: img.width,
          height: img.height,
          sortOrder: img.sortOrder,
        })),
      })),
      lastUpdated: new Date().toISOString(),
      version: '2.0.0',
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error reading worksheet templates metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read worksheet templates metadata', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/worksheet-templates/update
 * Updates worksheet template metadata (translations, display names) in database
 */
async function postHandler(request: NextRequest, userId: string) {
  try {
    const body = await request.json();

    if (!body.themes || !Array.isArray(body.themes)) {
      return NextResponse.json(
        { error: 'Invalid metadata structure' },
        { status: 400 }
      );
    }

    const type = 'worksheet';

    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.warn('Database not available for saving');
      return NextResponse.json({
        success: true,
        message: 'Database not available - changes not saved',
        warning: 'Start PostgreSQL database to persist changes',
      });
    }

    const updatedThemes = [];

    for (const themeData of body.themes) {
      let theme = await prisma.imageTheme.findFirst({
        where: {
          name: themeData.name || themeData.id,
          type: type,
        },
      });

      if (!theme) {
        const displayNames = themeData.displayNames || { en: themeData.name || themeData.id };
        theme = await prisma.imageTheme.create({
          data: {
            name: themeData.name || themeData.id,
            displayNames: displayNames as any,
            type: type,
            sortOrder: themeData.sortOrder || 0,
          },
        });
      } else {
        const displayNames = themeData.displayNames || theme.displayNames;
        theme = await prisma.imageTheme.update({
          where: { id: theme.id },
          data: {
            displayNames: displayNames as any,
            sortOrder: themeData.sortOrder ?? theme.sortOrder,
          },
        });
      }

      updatedThemes.push({
        name: theme.name,
        dbId: theme.id,
      });

      if (themeData.images && Array.isArray(themeData.images)) {
        const existingImages = await prisma.imageLibraryItem.findMany({
          where: {
            themeId: theme.id,
          },
        });

        const incomingFilenames = new Set(themeData.images.map((img: any) => img.filename));

        for (const existingImage of existingImages) {
          if (!incomingFilenames.has(existingImage.filename)) {
            await prisma.imageLibraryItem.delete({
              where: { id: existingImage.id },
            });
          }
        }

        for (const imgData of themeData.images) {
          const existingImage = await prisma.imageLibraryItem.findFirst({
            where: {
              themeId: theme.id,
              filename: imgData.filename,
            },
          });

          if (existingImage) {
            const translations = imgData.translations || existingImage.translations;
            await prisma.imageLibraryItem.update({
              where: { id: existingImage.id },
              data: {
                translations: translations as any,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Worksheet templates metadata updated successfully in database',
      themes: updatedThemes,
    });
  } catch (error) {
    console.error('Error updating worksheet templates metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update worksheet templates metadata', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/worksheet-templates/update
 * Deletes a worksheet template theme
 */
async function deleteHandler(request: NextRequest, userId: string) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get('themeId');

    if (!themeId) {
      return NextResponse.json(
        { error: 'themeId is required' },
        { status: 400 }
      );
    }

    await prisma.imageTheme.delete({
      where: { id: themeId },
    });

    return NextResponse.json({
      success: true,
      message: 'Theme deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json(
      { error: 'Failed to delete theme', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Export wrapped handlers with CORS and Admin authentication
export const GET = withCors(async (request: NextRequest) => withAdmin(request, getHandler));
export const POST = withCors(async (request: NextRequest) => withAdmin(request, postHandler));
export const DELETE = withCors(async (request: NextRequest) => withAdmin(request, deleteHandler));

// Handle OPTIONS preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
