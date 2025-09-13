const { Client } = require('pg');
const path = require('path');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'lcsuser',
  password: 'lcspass123!',
  database: 'lessoncraftstudio'
});

async function linkImagesToFiles() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Get all image assets that don't have a linked file
    const assetsResult = await client.query(`
      SELECT id, file_name, theme_id 
      FROM image_assets 
      WHERE image_file IS NULL
    `);

    console.log(`Found ${assetsResult.rows.length} image assets without linked files`);

    // Get all files from directus_files
    const filesResult = await client.query(`
      SELECT id, filename_download, title 
      FROM directus_files
    `);

    // Create a map of filename to file ID
    const fileMap = new Map();
    filesResult.rows.forEach(file => {
      // Extract base name without extension
      const baseName = file.filename_download.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
      fileMap.set(baseName.toLowerCase(), file.id);
      
      // Also map by title if available
      if (file.title) {
        fileMap.set(file.title.toLowerCase(), file.id);
      }
    });

    console.log(`Found ${fileMap.size} unique files in directus_files`);

    let linkedCount = 0;
    let notFoundCount = 0;
    const notFoundFiles = [];

    // Link each image asset to its corresponding file
    for (const asset of assetsResult.rows) {
      const searchKey = asset.file_name.toLowerCase();
      const fileId = fileMap.get(searchKey);
      
      if (fileId) {
        await client.query(
          'UPDATE image_assets SET image_file = $1 WHERE id = $2',
          [fileId, asset.id]
        );
        linkedCount++;
      } else {
        notFoundCount++;
        notFoundFiles.push(asset.file_name);
      }
    }

    console.log(`\n✅ Successfully linked ${linkedCount} images to files`);
    
    if (notFoundCount > 0) {
      console.log(`⚠️ Could not find files for ${notFoundCount} images:`);
      console.log(notFoundFiles.slice(0, 10).join(', '));
      if (notFoundFiles.length > 10) {
        console.log(`... and ${notFoundFiles.length - 10} more`);
      }
    }

    // Show some examples of linked images
    const examplesResult = await client.query(`
      SELECT 
        ia.file_name,
        ia.image_file,
        df.filename_download,
        df.filename_disk
      FROM image_assets ia
      LEFT JOIN directus_files df ON ia.image_file = df.id
      WHERE ia.image_file IS NOT NULL
      LIMIT 5
    `);

    console.log('\nExample linked images:');
    examplesResult.rows.forEach(row => {
      console.log(`  ${row.file_name} -> ${row.filename_download} (${row.image_file})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

linkImagesToFiles();