const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';
const APPS_SOURCE_DIR = 'C:/Users/rkgen/Pictures/FINAL APPS READY TO UPLOAD';

// Image theme categories
const THEME_HIERARCHY = {
  'animals': ['farm', 'wild', 'sea', 'pets', 'insects', 'birds'],
  'food': ['fruits', 'vegetables', 'meals', 'desserts', 'beverages', 'snacks'],
  'alphabet': ['letters', 'uppercase', 'lowercase'],
  'general': ['household', 'toys', 'school', 'nature', 'transportation'],
  'backgrounds': [],
  'borders': [],
  'templates': ['alphabet-train', 'pattern-train', 'prepositions'],
  'drawing-lines': [],
  'alphabetsvg': ['cursive', 'print']
};

async function createTheme(themeKey, displayName, parentThemeId = null) {
  const themeData = {
    data: {
      themeKey,
      displayName,
      parentTheme: parentThemeId,
      description: `${displayName} theme for worksheet generation`,
      sortOrder: 0
    }
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/image-themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : ''
      },
      body: JSON.stringify(themeData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`  ✅ Created theme: ${displayName}`);
      return result.data.id;
    } else {
      console.log(`  ⚠️ Failed to create theme: ${displayName}`);
      return null;
    }
  } catch (error) {
    console.log(`  ❌ Error creating theme ${displayName}: ${error.message}`);
    return null;
  }
}

async function uploadImageToStrapi(filePath, assetType = 'regular') {
  try {
    const formData = new FormData();
    const fileBuffer = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    
    formData.append('files', fileBuffer, fileName);

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : ''
      },
      body: formData
    });

    if (response.ok) {
      const [uploadedFile] = await response.json();
      return uploadedFile.id;
    }
    return null;
  } catch (error) {
    console.log(`    ❌ Failed to upload ${path.basename(filePath)}: ${error.message}`);
    return null;
  }
}

async function createImageAsset(fileId, fileKey, displayName, themeId, assetType = 'regular', svgStyle = null) {
  const assetData = {
    data: {
      fileKey,
      displayName,
      file: fileId,
      assetType,
      themes: themeId ? [themeId] : [],
      isPremium: false,
      metadata: {},
      svgStyle: svgStyle
    }
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : ''
      },
      body: JSON.stringify(assetData)
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(`    ❌ Failed to create asset ${displayName}: ${error.message}`);
    return false;
  }
}

async function migrateImagesFromApp(appFolder) {
  console.log(`\n📁 Processing images from: ${appFolder}`);
  
  const appPath = path.join(APPS_SOURCE_DIR, appFolder, 'public', 'images');
  const exists = await fs.access(appPath).then(() => true).catch(() => false);
  
  if (!exists) {
    console.log(`  ⚠️ No images folder found`);
    return;
  }

  const imageDirs = await fs.readdir(appPath, { withFileTypes: true });
  
  for (const dir of imageDirs) {
    if (!dir.isDirectory()) continue;
    
    const dirName = dir.name.toLowerCase();
    const dirPath = path.join(appPath, dir.name);
    
    // Determine asset type
    let assetType = 'regular';
    if (dirName === 'backgrounds') assetType = 'background';
    else if (dirName === 'borders') assetType = 'border';
    else if (dirName === 'template' || dirName === 'templates') assetType = 'template';
    else if (dirName === 'drawing lines') assetType = 'drawing-line';
    else if (dirName.includes('svg')) assetType = 'alphabet-svg';
    
    console.log(`  📂 ${dir.name} (${assetType})`);
    
    // Create or find theme
    let themeId = null;
    // You would need to implement theme lookup/creation logic here
    
    // Process images in this directory
    const files = await fs.readdir(dirPath);
    let uploadCount = 0;
    
    for (const file of files) {
      if (!/\.(png|jpg|jpeg|gif|svg)$/i.test(file)) continue;
      
      const filePath = path.join(dirPath, file);
      const fileKey = `${appFolder}_${dirName}_${path.basename(file, path.extname(file))}`.toLowerCase().replace(/\s+/g, '_');
      const displayName = path.basename(file, path.extname(file))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      
      // Upload file
      const fileId = await uploadImageToStrapi(filePath, assetType);
      
      if (fileId) {
        // Create asset
        const created = await createImageAsset(fileId, fileKey, displayName, themeId, assetType);
        if (created) uploadCount++;
      }
      
      // Log progress every 10 files
      if (uploadCount % 10 === 0 && uploadCount > 0) {
        console.log(`    📤 Uploaded ${uploadCount} files...`);
      }
    }
    
    console.log(`    ✅ Total uploaded: ${uploadCount} files`);
  }
}

async function migrateAllImages() {
  console.log('🚀 Starting Image Library Migration...\n');
  
  // First, create all themes
  console.log('📚 Creating theme hierarchy...');
  const themeIds = {};
  
  for (const [parentKey, children] of Object.entries(THEME_HIERARCHY)) {
    const parentName = parentKey.charAt(0).toUpperCase() + parentKey.slice(1);
    const parentId = await createTheme(parentKey, parentName);
    themeIds[parentKey] = parentId;
    
    for (const childKey of children) {
      const childName = childKey.charAt(0).toUpperCase() + childKey.slice(1);
      const childId = await createTheme(`${parentKey}-${childKey}`, childName, parentId);
      themeIds[`${parentKey}-${childKey}`] = childId;
    }
  }
  
  // Get list of app folders
  const appFolders = await fs.readdir(APPS_SOURCE_DIR, { withFileTypes: true });
  const folders = appFolders.filter(f => f.isDirectory()).map(f => f.name);
  
  console.log(`\n📱 Found ${folders.length} app folders to process`);
  
  // Process only the first app as an example (to avoid overwhelming the system)
  // In production, you'd process all or batch them
  const appsToProcess = folders.slice(0, 3); // Process first 3 apps as example
  
  for (const folder of appsToProcess) {
    await migrateImagesFromApp(folder);
  }
  
  console.log('\n========================================');
  console.log('📊 Migration Summary:');
  console.log(`   📁 Processed ${appsToProcess.length} app folders`);
  console.log(`   🎨 Created ${Object.keys(themeIds).length} themes`);
  console.log('========================================\n');
  console.log('💡 To process all apps, modify the appsToProcess variable in the script');
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateAllImages().catch(console.error);
}

module.exports = { migrateAllImages, createTheme, uploadImageToStrapi, createImageAsset };