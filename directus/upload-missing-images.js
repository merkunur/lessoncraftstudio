const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

const DIRECTUS_URL = 'http://localhost:8055';
const API_TOKEN = 'static-api-token-for-sync';

async function uploadMissingImages() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Get all image assets without linked files
    const assetsResult = await client.query(`
      SELECT ia.id, ia.file_name, ia.theme_id, it.folder_name 
      FROM image_assets ia
      LEFT JOIN image_themes it ON ia.theme_id = it.id
      WHERE ia.image_file IS NULL
    `);

    console.log(`Found ${assetsResult.rows.length} image assets without linked files`);

    let uploadedCount = 0;
    let failedCount = 0;
    const failedFiles = [];

    for (const asset of assetsResult.rows) {
      const themePath = path.join(__dirname, '..', 'frontend', 'public', 'images', asset.folder_name || 'animals');
      
      // Try different extensions
      const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.PNG', '.JPG'];
      let filePath = null;
      let foundExtension = null;
      
      for (const ext of extensions) {
        const testPath = path.join(themePath, asset.file_name + ext);
        if (fs.existsSync(testPath)) {
          filePath = testPath;
          foundExtension = ext;
          break;
        }
      }

      if (!filePath) {
        console.log(`❌ File not found: ${asset.folder_name}/${asset.file_name}`);
        failedCount++;
        failedFiles.push(`${asset.folder_name}/${asset.file_name}`);
        continue;
      }

      try {
        // Upload file to Directus
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('title', asset.file_name);
        form.append('folder', '8bb4a8ce-3c6d-4b6f-b3c3-17c66e3f0e6b'); // Main image library folder

        const response = await fetch(`${DIRECTUS_URL}/files`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            ...form.getHeaders()
          },
          body: form
        });

        if (!response.ok) {
          const error = await response.text();
          console.log(`❌ Failed to upload ${asset.file_name}: ${error}`);
          failedCount++;
          failedFiles.push(`${asset.folder_name}/${asset.file_name}`);
          continue;
        }

        const fileData = await response.json();
        const fileId = fileData.data.id;

        // Update image_asset with the file ID
        await client.query(
          'UPDATE image_assets SET image_file = $1 WHERE id = $2',
          [fileId, asset.id]
        );

        console.log(`✅ Uploaded and linked: ${asset.folder_name}/${asset.file_name}${foundExtension}`);
        uploadedCount++;

      } catch (error) {
        console.log(`❌ Error uploading ${asset.file_name}: ${error.message}`);
        failedCount++;
        failedFiles.push(`${asset.folder_name}/${asset.file_name}`);
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} images`);
    console.log(`❌ Failed: ${failedCount} images`);
    
    if (failedFiles.length > 0) {
      console.log(`\nFailed files:`);
      failedFiles.forEach(file => console.log(`  - ${file}`));
    }

    // Verify final state
    const finalCheck = await client.query(`
      SELECT 
        COUNT(*) FILTER (WHERE image_file IS NOT NULL) as linked,
        COUNT(*) FILTER (WHERE image_file IS NULL) as unlinked,
        COUNT(*) as total
      FROM image_assets
    `);

    const stats = finalCheck.rows[0];
    console.log(`\n📈 Final Status:`);
    console.log(`Total images: ${stats.total}`);
    console.log(`Linked to files: ${stats.linked} (${Math.round(stats.linked/stats.total*100)}%)`);
    console.log(`Not linked: ${stats.unlinked}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

uploadMissingImages();