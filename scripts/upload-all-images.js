const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = '2f796de5b60ca765429063d5dc01953dfd13fdbd8380ef22024d5d736a5d43e052fc880b7a66ead618f592589778ddc239d4338266b6970942064622d87d5967de00a411ec2db2f7d24103dc3f0b3c66d8b67f35b80e09964c3d8d2ced06737e64b0c4f6680fb3f7d4ae6cb9785effb2f3c75f4ddda1035570deaa494fa9339d';

async function uploadAllImages() {
  const worksheetGeneratorsPath = path.join(__dirname, '..', 'worksheet generators', 'images');
  
  console.log('🖼️  Starting comprehensive image upload...\n');
  
  // Get all theme folders
  const themeFolders = fs.readdirSync(worksheetGeneratorsPath)
    .filter(item => {
      const itemPath = path.join(worksheetGeneratorsPath, item);
      return fs.statSync(itemPath).isDirectory();
    });
  
  console.log(`Found ${themeFolders.length} theme folders to process:\n`);
  
  let totalImages = 0;
  let successfulUploads = 0;
  let failedUploads = 0;
  
  // Get theme IDs from Strapi first
  const themesResponse = await axios.get(
    `${STRAPI_URL}/api/image-themes`,
    {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    }
  );
  
  const themes = {};
  themesResponse.data.data.forEach(theme => {
    themes[theme.attributes.themeKey] = theme.id;
  });
  
  // Process each theme folder
  for (const themeFolder of themeFolders) {
    const themePath = path.join(worksheetGeneratorsPath, themeFolder);
    const themeKey = themeFolder.toLowerCase().replace(/\s+/g, '-');
    
    console.log(`\n📁 Processing theme: ${themeFolder}`);
    console.log('=' .repeat(50));
    
    // Get all image files in the folder
    const imageFiles = fs.readdirSync(themePath)
      .filter(file => /\.(png|jpg|jpeg|gif|svg|bmp)$/i.test(file));
    
    console.log(`Found ${imageFiles.length} images in ${themeFolder}`);
    
    // Upload each image
    for (const imageFile of imageFiles) {
      try {
        const filePath = path.join(themePath, imageFile);
        const fileStats = fs.statSync(filePath);
        
        // Skip very large files (over 10MB)
        if (fileStats.size > 10 * 1024 * 1024) {
          console.log(`⚠️  Skipping ${imageFile} (file too large: ${(fileStats.size / 1024 / 1024).toFixed(2)}MB)`);
          continue;
        }
        
        // Create form data for file upload
        const form = new FormData();
        form.append('files', fs.createReadStream(filePath), imageFile);
        
        // Upload file to Strapi
        const uploadResponse = await axios.post(
          `${STRAPI_URL}/api/upload`,
          form,
          {
            headers: {
              ...form.getHeaders(),
              'Authorization': `Bearer ${API_TOKEN}`
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
          }
        );
        
        const uploadedFile = uploadResponse.data[0];
        
        // Create Image Asset entry
        const baseName = path.basename(imageFile, path.extname(imageFile));
        const fileKey = `${themeKey}_${baseName}`.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        
        // Link to theme if it exists
        const themeIds = themes[themeKey] ? [themes[themeKey]] : [];
        
        const imageAssetData = {
          data: {
            fileKey: fileKey,
            displayName: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            file: uploadedFile.id,
            themes: themeIds,
            isPremium: false
          }
        };
        
        await axios.post(
          `${STRAPI_URL}/api/image-assets`,
          imageAssetData,
          {
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        successfulUploads++;
        totalImages++;
        process.stdout.write(`\r✅ Uploaded: ${successfulUploads}/${totalImages} images`);
        
      } catch (error) {
        failedUploads++;
        totalImages++;
        console.log(`\n❌ Failed to upload ${themeFolder}/${imageFile}: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }
  
  console.log('\n\n' + '=' .repeat(60));
  console.log('📊 UPLOAD COMPLETE - SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Successfully uploaded: ${successfulUploads} images`);
  console.log(`❌ Failed uploads: ${failedUploads} images`);
  console.log(`📁 Total processed: ${totalImages} images`);
  console.log(`📂 Themes processed: ${themeFolders.length}`);
  console.log('\nAll images are now available in Strapi Media Library!');
}

// Run the upload
uploadAllImages().catch(console.error);