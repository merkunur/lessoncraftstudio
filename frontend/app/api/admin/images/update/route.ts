import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { withCors } from '@/lib/cors';
import { withAdmin } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * GET /api/admin/images/update
 * Retrieves image themes with pagination support
 * Query params:
 *   - type: images|borders|backgrounds|train|worksheet (default: images)
 *   - themeId: Load images only for this theme (optional, returns theme list if not specified)
 *   - page: Page number for images (default: 1)
 *   - limit: Images per page (default: 100, max: 500)
 */
async function getHandler(request: NextRequest, userId: string) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'images';
    const themeId = searchParams.get('themeId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500); // Max 500 per page

    try {
      // If themeId is provided, return paginated images for that theme only
      if (themeId) {
        const theme = await prisma.imageTheme.findFirst({
          where: {
            name: themeId,
            type: type,
          },
        });

        if (!theme) {
          return NextResponse.json(
            { error: 'Theme not found' },
            { status: 404 }
          );
        }

        // Get total count for pagination
        const totalImages = await prisma.imageLibraryItem.count({
          where: { themeId: theme.id },
        });

        // Get paginated images
        const images = await prisma.imageLibraryItem.findMany({
          where: { themeId: theme.id },
          orderBy: { sortOrder: 'asc' },
          skip: (page - 1) * limit,
          take: limit,
        });

        return NextResponse.json({
          theme: {
            id: theme.name,
            name: theme.name,
            dbId: theme.id,
            displayNames: theme.displayNames as Record<string, string>,
            active: true,
            sortOrder: theme.sortOrder,
          },
          images: images.map(img => ({
            filename: img.filename,
            path: img.filePath,
            displayName: (img.translations as any)?.en || img.filename,
            translations: img.translations as Record<string, string>,
            fileSize: img.fileSize,
            mimeType: img.mimeType,
            width: img.width,
            height: img.height,
          })),
          pagination: {
            page,
            limit,
            total: totalImages,
            totalPages: Math.ceil(totalImages / limit),
            hasMore: page * limit < totalImages,
          },
        });
      }

      // Otherwise, return theme list with image counts only (no image data)
      const themes = await prisma.imageTheme.findMany({
        where: { type: type },
        orderBy: { sortOrder: 'asc' },
      });

      // Get image counts for each theme efficiently
      const themesWithCounts = await Promise.all(
        themes.map(async (theme) => {
          const imageCount = await prisma.imageLibraryItem.count({
            where: { themeId: theme.id },
          });

          return {
            id: theme.name,
            name: theme.name,
            dbId: theme.id,
            displayNames: theme.displayNames as Record<string, string>,
            active: true,
            sortOrder: theme.sortOrder,
            imageCount: imageCount, // Return count instead of full image array
            images: [], // Empty array - images loaded on-demand via themeId param
          };
        })
      );

      return NextResponse.json({
        themes: themesWithCounts,
        lastUpdated: new Date().toISOString(),
        version: '3.0.0', // Version bump for pagination support
      });
    } catch (dbError) {
      console.warn('Database not available, using empty data:', dbError);
      return NextResponse.json({
        themes: [],
        lastUpdated: new Date().toISOString(),
        version: '3.0.0',
      });
    }
  } catch (error) {
    console.error('Error reading images metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read images metadata', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/images/update
 * Updates image metadata (translations, display names) in database
 * This does NOT handle file uploads - use /api/admin/images/upload for that
 */
async function postHandler(request: NextRequest, userId: string) {
  try {
    const body = await request.json();

    // Validate the metadata structure
    if (!body.themes || !Array.isArray(body.themes)) {
      return NextResponse.json(
        { error: 'Invalid metadata structure' },
        { status: 400 }
      );
    }

    const type = body.type || 'images';

    // Check if database is available
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.warn('Database not available for saving');
      return NextResponse.json({
        success: true,
        message: 'Database not available - changes not saved (development mode)',
        warning: 'Start PostgreSQL database to persist changes',
      });
    }

    // Process each theme and collect results
    const updatedThemes = [];

    for (const themeData of body.themes) {
      // Find or create theme
      let theme = await prisma.imageTheme.findFirst({
        where: {
          name: themeData.name || themeData.id,
          type: type,
        },
      });

      if (!theme) {
        // Create new theme
        const displayNames = themeData.displayNames || { en: themeData.name || themeData.id };
        const createData = {
          name: themeData.name || themeData.id,
          displayNames: displayNames as any,
          type: type,
          sortOrder: themeData.sortOrder || 0,
        };

        console.log('Creating theme with data:', JSON.stringify(createData, null, 2));

        theme = await prisma.imageTheme.create({
          data: createData,
        });
      } else {
        // Update existing theme
        const displayNames = themeData.displayNames || theme.displayNames;
        theme = await prisma.imageTheme.update({
          where: { id: theme.id },
          data: {
            displayNames: displayNames as any,
            sortOrder: themeData.sortOrder ?? theme.sortOrder,
          },
        });
      }

      // Add theme to results with dbId
      updatedThemes.push({
        name: theme.name,
        dbId: theme.id,
      });

      // Update images for this theme (translations only - not files)
      if (themeData.images && Array.isArray(themeData.images)) {
        // Get all existing images for this theme
        const existingImages = await prisma.imageLibraryItem.findMany({
          where: {
            themeId: theme.id,
          },
        });

        // Update images (translations only - DO NOT delete images from database)
        // Images should only be deleted via explicit DELETE endpoint calls
        for (const imgData of themeData.images) {
          // Find image by filename in this theme
          const existingImage = await prisma.imageLibraryItem.findFirst({
            where: {
              themeId: theme.id,
              filename: imgData.filename,
            },
          });

          if (existingImage) {
            // Update translations and display name
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
      message: 'Images metadata updated successfully in database',
      themes: updatedThemes, // Return themes with dbIds
    });
  } catch (error) {
    console.error('Error updating images metadata:', error);
    console.error('Error details:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { error: 'Failed to update images metadata', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/images/update
 * Deletes a theme or specific images
 */
async function deleteHandler(request: NextRequest, userId: string) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get('themeId');
    const imageId = searchParams.get('imageId');

    if (imageId) {
      // Delete specific image
      await prisma.imageLibraryItem.delete({
        where: { id: imageId },
      });

      return NextResponse.json({
        success: true,
        message: 'Image deleted successfully',
      });
    } else if (themeId) {
      // Delete theme (cascade will delete all images)
      await prisma.imageTheme.delete({
        where: { id: themeId },
      });

      return NextResponse.json({
        success: true,
        message: 'Theme deleted successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Either themeId or imageId is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error deleting:', error);
    return NextResponse.json(
      { error: 'Failed to delete', details: error instanceof Error ? error.message : 'Unknown error' },
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