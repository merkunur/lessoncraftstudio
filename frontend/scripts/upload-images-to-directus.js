const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const http = require('http');

const DIRECTUS_URL = 'http://localhost:8055';
const API_TOKEN = 'static-api-token-for-sync';

async function uploadImageToDirectus(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), fileName);

    const options = {
      method: 'POST',
      hostname: 'localhost',
      port: 8055,
      path: '/files',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        ...form.getHeaders()
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            console.log(`✅ Uploaded: ${fileName} -> ${result.data.id}`);
            resolve(result.data.id);
          } catch (e) {
            console.error(`❌ Failed to parse response for ${fileName}`);
            resolve(null);
          }
        } else {
          console.error(`❌ Failed to upload ${fileName}: ${res.statusCode}`);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error uploading ${fileName}:`, error.message);
      resolve(null);
    });

    form.pipe(req);
  });
}

async function updateImageAssetWithFile(imageAssetId, fileId) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/image_assets/${imageAssetId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_file: fileId
      })
    });

    if (response.ok) {
      console.log(`✅ Updated image_asset ${imageAssetId} with file ${fileId}`);
      return true;
    } else {
      console.error(`❌ Failed to update image_asset ${imageAssetId}: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating image_asset ${imageAssetId}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting image upload to Directus...');

  // Get all image assets from database
  const response = await fetch(`${DIRECTUS_URL}/items/image_assets?limit=500&fields=*,theme_id.*`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch image assets');
    return;
  }

  const data = await response.json();
  const imageAssets = data.data;

  console.log(`Found ${imageAssets.length} image assets in database`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const asset of imageAssets) {
    // Check if file actually exists in Directus
    if (asset.image_file) {
      // Try to fetch the file to see if it really exists
      const checkResponse = await fetch(`${DIRECTUS_URL}/assets/${asset.image_file}`, {
        method: 'HEAD',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (checkResponse.ok) {
        console.log(`⏭️ Skipping ${asset.file_name} - file exists in Directus`);
        skipped++;
        continue;
      } else {
        console.log(`⚠️ ${asset.file_name} has phantom file ID ${asset.image_file} - will re-upload`);
      }
    }

    // Construct file path
    const themeName = asset.theme_id?.folder_name || asset.theme_id?.name || 'animals';
    const fileName = themeName === 'icons' ? asset.file_name.replace(/ /g, '_') : asset.file_name;
    const extension = themeName === 'icons' ? '.svg' : '.png';
    const fullFileName = `${fileName}${extension}`;
    const filePath = path.join(__dirname, '..', 'public', 'images', themeName, fullFileName);

    // Check if file exists on filesystem
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      failed++;
      continue;
    }

    // Upload to Directus
    console.log(`📤 Uploading ${fullFileName} from ${themeName}...`);
    const fileId = await uploadImageToDirectus(filePath, fullFileName);

    if (fileId) {
      // Update image_asset with file ID
      await updateImageAssetWithFile(asset.id, fileId);
      uploaded++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Upload Summary:');
  console.log(`✅ Uploaded: ${uploaded}`);
  console.log(`⏭️ Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadImageToDirectus, updateImageAssetWithFile };