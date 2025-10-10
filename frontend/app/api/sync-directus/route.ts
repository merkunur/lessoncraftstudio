import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_INTERNAL_URL || 'http://lcs-directus:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Manual sync triggered...');
    
    // Use ImageLibraryManager to force sync
    const success = await imageLibraryManager.forceSync();
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Sync completed successfully',
        status: imageLibraryManager.getSyncStatus()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Sync failed but cached data is available',
        status: imageLibraryManager.getSyncStatus()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sync failed',
        status: imageLibraryManager.getSyncStatus()
      },
      { status: 500 }
    );
  }
}

// Legacy POST implementation (kept for reference)
async function POST_LEGACY(request: NextRequest) {
  try {
    console.log('🔄 Manual sync triggered (legacy)...');
    
    // Authenticate with Directus
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with Directus');
    }

    const authData = await authResponse.json();
    const token = authData.data.access_token;
    const headers = { 'Authorization': `Bearer ${token}` };

    // Get all active themes
    const themesResponse = await fetch(
      `${DIRECTUS_URL}/items/image_themes?filter[is_active][_eq]=true&sort=sort_order`,
      { headers }
    );

    if (!themesResponse.ok) {
      throw new Error('Failed to fetch themes');
    }

    const themesData = await themesResponse.json();
    const themes = themesData.data;
    
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    let syncedThemes = 0;
    let syncedImages = 0;

    // Process each theme
    for (const theme of themes) {
      const themePath = path.join(imagesDir, theme.folder_name);
      
      // Create theme folder if it doesn't exist
      if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath, { recursive: true });
        syncedThemes++;
        console.log(`✅ Created folder: ${theme.folder_name}`);
      }

      // Get images for this theme
      const imagesResponse = await fetch(
        `${DIRECTUS_URL}/items/worksheet_images?filter[theme_id][_eq]=${theme.id}&filter[status][_eq]=active&fields=*,image_file.*`,
        { headers }
      );

      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        const images = imagesData.data;
        
        // Create translations file for this theme
        const translations: Record<string, any> = {};
        const themeTranslations = {
          folder_name: theme.folder_name,
          name: theme.name || {},
          images: {} as Record<string, any>
        };

        for (const image of images) {
          if (!image.image_file?.id) continue;

          // Ensure filename has extension
          let fileName = image.file_name;
          if (!fileName.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
            const ext = image.image_file.filename_download?.match(/\.(png|jpg|jpeg|gif|svg)$/i)?.[0] || '.png';
            fileName = fileName + ext;
          }
          
          // Store translations for this image
          const imageKey = fileName.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
          themeTranslations.images[imageKey] = image.name || {};

          const targetPath = path.join(themePath, fileName);

          // Download only if doesn't exist
          const needsDownload = !fs.existsSync(targetPath);

          if (needsDownload) {
            try {
              // Download image
              const imageResponse = await fetch(
                `${DIRECTUS_URL}/assets/${image.image_file.id}`,
                { headers }
              );

              if (imageResponse.ok) {
                const buffer = await imageResponse.arrayBuffer();
                fs.writeFileSync(targetPath, Buffer.from(buffer));
                syncedImages++;

                // Update filename in Directus if needed
                if (image.file_name !== fileName) {
                  await fetch(
                    `${DIRECTUS_URL}/items/worksheet_images/${image.id}`,
                    {
                      method: 'PATCH',
                      headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ file_name: fileName })
                    }
                  );
                }
              }
            } catch (error) {
              console.error(`Failed to sync ${fileName}`);
            }
          }
        }
        
        // Save translations file for this theme
        const translationsPath = path.join(themePath, 'translations.json');
        fs.writeFileSync(translationsPath, JSON.stringify(themeTranslations, null, 2));
        console.log(`✅ Saved translations for ${theme.folder_name}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedThemes} new themes and ${syncedImages} new images`,
      themes: themes.length,
      syncedThemes,
      syncedImages
    });

  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sync failed',
        hint: 'Make sure Directus is running and accessible'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET(request: NextRequest) {
  try {
    // Get sync status from ImageLibraryManager
    const status = imageLibraryManager.getSyncStatus();
    const themes = imageLibraryManager.getThemes('en');
    
    return NextResponse.json({
      ...status,
      themesAvailable: themes.length,
      syncEndpoint: '/api/sync-directus (POST to trigger sync)',
      autoSyncEnabled: true,
      syncInterval: 60000 // 60 seconds
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Cannot get sync status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}