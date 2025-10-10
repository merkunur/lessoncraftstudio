import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { withCors } from '@/lib/cors';

const prisma = new PrismaClient();

/**
 * GET /api/admin/images/update
 * Retrieves all image themes and their associated images from database
 */
async function getHandler(request: NextRequest) {
  try {
    // Get type from query params (images, borders, backgrounds, train, worksheet)
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'images';

    type ThemeWithImages = Prisma.ImageThemeGetPayload<{
      include: { images: true }
    }>;
    let themes: ThemeWithImages[];

    try {
      // Try to fetch themes with their images from database
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
      // If database is not available, return empty data structure
      console.warn('Database not available, using empty data:', dbError);
      themes = [];
    }

    // Transform database format to content manager format
    const metadata = {
      themes: themes.map(theme => ({
        id: theme.name,
        name: theme.name,
        dbId: theme.id, // Include database UUID for delete/edit operations
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
        })),
      })),
      lastUpdated: new Date().toISOString(),
      version: '2.0.0',
    };

    return NextResponse.json(metadata);
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
async function postHandler(request: NextRequest) {
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

        // Create a Set of filenames that should remain
        const incomingFilenames = new Set(themeData.images.map((img: any) => img.filename));

        // Delete images that are no longer in the incoming array
        for (const existingImage of existingImages) {
          if (!incomingFilenames.has(existingImage.filename)) {
            await prisma.imageLibraryItem.delete({
              where: { id: existingImage.id },
            });
            console.log(`Deleted image: ${existingImage.filename} from theme ${theme.name}`);
          }
        }

        // Update remaining images
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
async function deleteHandler(request: NextRequest) {
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

// Export wrapped handlers with CORS support
export const GET = withCors(getHandler);
export const POST = withCors(postHandler);
export const DELETE = withCors(deleteHandler);

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