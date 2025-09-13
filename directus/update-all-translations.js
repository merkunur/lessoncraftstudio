const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');

// Import translations from the frontend
const translations = require('../frontend/app/api/multilingual-images/translations.js');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin';

async function getAuthToken() {
  const loginResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    })
  });
  
  const result = await loginResponse.json();
  console.log('Login response:', result);
  
  if (result.errors) {
    throw new Error(`Login failed: ${result.errors[0].message}`);
  }
  
  return result.data?.access_token;
}

async function updateAllTranslations() {
  try {
    const token = await getAuthToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Get all themes
    console.log('Fetching all themes...');
    const themesResponse = await fetch(`${DIRECTUS_URL}/items/image_themes`, {
      headers
    });
    const { data: themes } = await themesResponse.json();
    console.log(`Found ${themes.length} themes`);

    // Update theme translations
    for (const theme of themes) {
      const folderName = theme.folder_name.toLowerCase().replace(/[- _]/g, '');
      
      // Check if we have translations for this theme
      if (translations.themeTranslations && translations.themeTranslations[folderName]) {
        console.log(`Updating translations for theme: ${theme.folder_name}`);
        
        await fetch(`${DIRECTUS_URL}/items/image_themes/${theme.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            translations: translations.themeTranslations[folderName]
          })
        });
      } else {
        console.log(`No translations found for theme: ${theme.folder_name}`);
      }
    }

    // Get all images
    console.log('\nFetching all images...');
    const imagesResponse = await fetch(`${DIRECTUS_URL}/items/image_assets?limit=500`, {
      headers
    });
    const { data: images } = await imagesResponse.json();
    console.log(`Found ${images.length} images`);

    // Update image translations
    let updatedCount = 0;
    let notFoundCount = 0;
    
    for (const image of images) {
      // Extract base name without extension
      const baseName = image.file_name.toLowerCase()
        .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
        .replace(/[- _]/g, '');
      
      // Check if we have translations for this image
      if (translations.imageTranslations && translations.imageTranslations[baseName]) {
        console.log(`Updating translations for image: ${image.file_name} -> ${baseName}`);
        
        await fetch(`${DIRECTUS_URL}/items/image_assets/${image.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            translations: translations.imageTranslations[baseName]
          })
        });
        updatedCount++;
      } else {
        // Try partial matches
        let found = false;
        if (translations.imageTranslations) {
          for (const [key, trans] of Object.entries(translations.imageTranslations)) {
            if (baseName.includes(key) || key.includes(baseName)) {
              console.log(`Updating translations for image (partial match): ${image.file_name} -> ${key}`);
              
              await fetch(`${DIRECTUS_URL}/items/image_assets/${image.id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                  translations: trans
                })
              });
              updatedCount++;
              found = true;
              break;
            }
          }
        }
        
        if (!found) {
          console.log(`No translations found for image: ${image.file_name}`);
          notFoundCount++;
          
          // Create default translations based on file name
          const defaultName = image.file_name
            .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          const defaultTranslations = {
            'en': defaultName,
            'de': defaultName,
            'fr': defaultName,
            'es': defaultName,
            'pt': defaultName,
            'it': defaultName,
            'nl': defaultName,
            'sv': defaultName,
            'da': defaultName,
            'no': defaultName,
            'fi': defaultName
          };
          
          await fetch(`${DIRECTUS_URL}/items/image_assets/${image.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              translations: defaultTranslations
            })
          });
        }
      }
    }

    console.log('\n=== Translation Update Complete ==="');
    console.log(`Updated ${updatedCount} images with translations`);
    console.log(`Created default translations for ${notFoundCount} images`);
    console.log(`Total images processed: ${images.length}`);

  } catch (error) {
    console.error('Error updating translations:', error);
  }
}

// Run the update
updateAllTranslations();