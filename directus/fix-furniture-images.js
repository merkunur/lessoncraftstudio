// Fix furniture images by adding proper extensions
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@lessoncraftstudio.com';
const ADMIN_PASSWORD = 'admin123!';

async function fixFurnitureImages() {
  try {
    console.log('Fixing furniture theme images...\n');
    
    // Authenticate
    const authResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const { access_token } = authResponse.data.data;
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    
    // Get furniture theme images from Directus
    const imagesResponse = await axios.get(
      `${DIRECTUS_URL}/items/worksheet_images?filter[theme_id][folder_name][_eq]=furniture&fields=*,image_file.*`, 
      { headers }
    );
    
    const images = imagesResponse.data.data;
    console.log(`Found ${images.length} furniture images in Directus\n`);
    
    const furnitureDir = path.join(process.cwd(), '..', 'frontend', 'public', 'images', 'furniture');
    
    // Delete old files without extensions
    const oldFiles = fs.readdirSync(furnitureDir);
    for (const file of oldFiles) {
      if (file !== '.placeholder' && !file.includes('.')) {
        const oldPath = path.join(furnitureDir, file);
        fs.unlinkSync(oldPath);
        console.log(`Deleted old file: ${file}`);
      }
    }
    
    // Download images with proper extensions
    console.log('\nDownloading images with correct extensions...');
    
    for (const image of images) {
      if (image.image_file) {
        // Get the proper filename with extension
        const originalFilename = image.image_file.filename_download || image.file_name;
        let filename = image.file_name;
        
        // Ensure filename has an extension
        if (!filename.includes('.')) {
          // Try to get extension from original filename or default to .png
          const ext = originalFilename.includes('.') 
            ? originalFilename.substring(originalFilename.lastIndexOf('.'))
            : '.png';
          filename = filename + ext;
        }
        
        const targetPath = path.join(furnitureDir, filename);
        
        try {
          // Download the image from Directus
          const imageUrl = `${DIRECTUS_URL}/assets/${image.image_file.id}`;
          const imageResponse = await axios.get(imageUrl, {
            headers,
            responseType: 'arraybuffer'
          });
          
          // Save to filesystem with proper extension
          fs.writeFileSync(targetPath, imageResponse.data);
          console.log(`✅ Downloaded: ${filename}`);
          
          // Update the file_name in Directus if needed
          if (image.file_name !== filename) {
            await axios.patch(
              `${DIRECTUS_URL}/items/worksheet_images/${image.id}`,
              { file_name: filename },
              { headers }
            );
            console.log(`   Updated filename in Directus to: ${filename}`);
          }
        } catch (error) {
          console.log(`❌ Failed to download: ${filename}`);
        }
      }
    }
    
    // Also add image name translations for furniture items
    console.log('\nAdding furniture image translations...');
    
    const furnitureTranslations = {
      'chair': {
        en: 'Chair', de: 'Stuhl', fr: 'Chaise', es: 'Silla',
        pt: 'Cadeira', it: 'Sedia', nl: 'Stoel', sv: 'Stol',
        da: 'Stol', no: 'Stol', fi: 'Tuoli'
      },
      'table': {
        en: 'Table', de: 'Tisch', fr: 'Table', es: 'Mesa',
        pt: 'Mesa', it: 'Tavolo', nl: 'Tafel', sv: 'Bord',
        da: 'Bord', no: 'Bord', fi: 'Pöytä'
      },
      'armchair': {
        en: 'Armchair', de: 'Sessel', fr: 'Fauteuil', es: 'Sillón',
        pt: 'Poltrona', it: 'Poltrona', nl: 'Fauteuil', sv: 'Fåtölj',
        da: 'Lænestol', no: 'Lenestol', fi: 'Nojatuoli'
      },
      'desk': {
        en: 'Desk', de: 'Schreibtisch', fr: 'Bureau', es: 'Escritorio',
        pt: 'Escrivaninha', it: 'Scrivania', nl: 'Bureau', sv: 'Skrivbord',
        da: 'Skrivebord', no: 'Skrivebord', fi: 'Kirjoituspöytä'
      },
      'dresser': {
        en: 'Dresser', de: 'Kommode', fr: 'Commode', es: 'Cómoda',
        pt: 'Cômoda', it: 'Cassettiera', nl: 'Ladekast', sv: 'Byrå',
        da: 'Kommode', no: 'Kommode', fi: 'Lipasto'
      },
      'cupboard': {
        en: 'Cupboard', de: 'Schrank', fr: 'Placard', es: 'Armario',
        pt: 'Armário', it: 'Armadio', nl: 'Kast', sv: 'Skåp',
        da: 'Skab', no: 'Skap', fi: 'Kaappi'
      },
      'bookshelf': {
        en: 'Bookshelf', de: 'Bücherregal', fr: 'Bibliothèque', es: 'Estantería',
        pt: 'Estante', it: 'Libreria', nl: 'Boekenkast', sv: 'Bokhylla',
        da: 'Bogreol', no: 'Bokhylle', fi: 'Kirjahylly'
      }
    };
    
    // Update translations in Directus
    for (const image of images) {
      const baseName = image.file_name.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '').toLowerCase();
      if (furnitureTranslations[baseName]) {
        try {
          await axios.patch(
            `${DIRECTUS_URL}/items/worksheet_images/${image.id}`,
            { name: furnitureTranslations[baseName] },
            { headers }
          );
          console.log(`✅ Updated translations for: ${baseName}`);
        } catch (error) {
          console.log(`❌ Failed to update translations for: ${baseName}`);
        }
      }
    }
    
    console.log('\n✅ Furniture images fixed!');
    console.log('\nNow your furniture theme should work properly:');
    console.log('1. Images have proper extensions (.png)');
    console.log('2. Translations are set for all languages');
    console.log('3. Refresh any worksheet app to see the changes');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

fixFurnitureImages();