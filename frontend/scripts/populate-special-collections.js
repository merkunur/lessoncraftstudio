const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = 'http://localhost:8055';
const API_TOKEN = 'static-api-token-for-sync';

// Map of border/background folders to their collection IDs
const BORDER_STYLES = {
  'spring': 1,
  'math': 2
};

const BACKGROUND_THEMES = {
  'summer': 1,
  'winter': 2
};

const TRAIN_TEMPLATE_THEMES = {
  'train': 1
};

const WORKSHEET_TEMPLATE_THEMES = {
  'worksheet': 1
};

async function getExistingFiles() {
  // Get all files from Directus
  const response = await fetch(`${DIRECTUS_URL}/files?limit=500`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files from Directus');
  }

  const data = await response.json();

  // Create a map of filename to file ID
  const fileMap = new Map();
  for (const file of data.data) {
    // Store both with and without extension
    const nameWithExt = file.filename_download;
    const nameWithoutExt = nameWithExt.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
    fileMap.set(nameWithExt.toLowerCase(), file.id);
    fileMap.set(nameWithoutExt.toLowerCase(), file.id);
  }

  return fileMap;
}

async function createRecord(collection, data) {
  const response = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const result = await response.json();
    return result.data;
  } else {
    console.error(`Failed to create record in ${collection}:`, await response.text());
    return null;
  }
}

async function populateBorders(fileMap) {
  console.log('\n📌 Populating Border Images...');

  const bordersPath = path.join(__dirname, '..', 'public', 'images', 'borders');
  if (!fs.existsSync(bordersPath)) {
    console.log('No borders folder found');
    return;
  }

  for (const [styleName, styleId] of Object.entries(BORDER_STYLES)) {
    const stylePath = path.join(bordersPath, styleName);
    if (!fs.existsSync(stylePath)) continue;

    const files = fs.readdirSync(stylePath)
      .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));

    console.log(`\nProcessing ${styleName} borders (${files.length} files)...`);

    for (const file of files) {
      const baseName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
      const fileId = fileMap.get(file.toLowerCase()) || fileMap.get(baseName.toLowerCase());

      if (!fileId) {
        console.log(`  ⚠️ No Directus file found for ${file}`);
        continue;
      }

      const record = await createRecord('border_images', {
        file_name: baseName,
        style_id: styleId,
        image_file: fileId,
        translations: {
          en: baseName,
          de: baseName,
          fr: baseName,
          es: baseName
        },
        status: 'active'
      });

      if (record) {
        console.log(`  ✅ Created border: ${baseName}`);
      }
    }
  }
}

async function populateBackgrounds(fileMap) {
  console.log('\n🎨 Populating Background Images...');

  const backgroundsPath = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
  if (!fs.existsSync(backgroundsPath)) {
    console.log('No backgrounds folder found');
    return;
  }

  for (const [themeName, themeId] of Object.entries(BACKGROUND_THEMES)) {
    const themePath = path.join(backgroundsPath, themeName);
    if (!fs.existsSync(themePath)) continue;

    const files = fs.readdirSync(themePath)
      .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));

    console.log(`\nProcessing ${themeName} backgrounds (${files.length} files)...`);

    for (const file of files) {
      const baseName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
      const fileId = fileMap.get(file.toLowerCase()) || fileMap.get(baseName.toLowerCase());

      if (!fileId) {
        console.log(`  ⚠️ No Directus file found for ${file}`);
        continue;
      }

      const record = await createRecord('background_images', {
        file_name: baseName,
        theme_id: themeId,
        image_file: fileId,
        translations: {
          en: baseName,
          de: baseName,
          fr: baseName,
          es: baseName
        },
        status: 'active'
      });

      if (record) {
        console.log(`  ✅ Created background: ${baseName}`);
      }
    }
  }
}

async function populateTrainTemplates(fileMap) {
  console.log('\n🚂 Populating Train Template Images...');

  const templatesPath = path.join(__dirname, '..', 'public', 'images', 'template', 'train');
  if (!fs.existsSync(templatesPath)) {
    console.log('No train templates folder found');
    return;
  }

  const files = fs.readdirSync(templatesPath)
    .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));

  console.log(`Processing train templates (${files.length} files)...`);

  for (const file of files) {
    const baseName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
    const fileId = fileMap.get(file.toLowerCase()) || fileMap.get(baseName.toLowerCase());

    if (!fileId) {
      console.log(`  ⚠️ No Directus file found for ${file}`);
      continue;
    }

    const record = await createRecord('train_template_images', {
      file_name: baseName,
      theme_id: 1, // Default train theme
      image_file: fileId,
      translations: {
        en: baseName,
        de: baseName,
        fr: baseName,
        es: baseName
      },
      status: 'active'
    });

    if (record) {
      console.log(`  ✅ Created train template: ${baseName}`);
    }
  }
}

async function populateWorksheetTemplates(fileMap) {
  console.log('\n📄 Populating Worksheet Template Images...');

  const templatesPath = path.join(__dirname, '..', 'public', 'images', 'template', 'worksheet');
  if (!fs.existsSync(templatesPath)) {
    console.log('No worksheet templates folder found');
    return;
  }

  const files = fs.readdirSync(templatesPath)
    .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));

  console.log(`Processing worksheet templates (${files.length} files)...`);

  for (const file of files) {
    const baseName = file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
    const fileId = fileMap.get(file.toLowerCase()) || fileMap.get(baseName.toLowerCase());

    if (!fileId) {
      console.log(`  ⚠️ No Directus file found for ${file}`);
      continue;
    }

    const record = await createRecord('worksheet_template_images', {
      file_name: baseName,
      theme_id: 1, // Default worksheet theme
      image_file: fileId,
      translations: {
        en: baseName,
        de: baseName,
        fr: baseName,
        es: baseName
      },
      status: 'active'
    });

    if (record) {
      console.log(`  ✅ Created worksheet template: ${baseName}`);
    }
  }
}

async function checkExistingRecords() {
  console.log('\n📊 Checking existing records...');

  const collections = [
    'border_images',
    'background_images',
    'train_template_images',
    'worksheet_template_images'
  ];

  for (const collection of collections) {
    const response = await fetch(`${DIRECTUS_URL}/items/${collection}?limit=1&meta=total_count`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`${collection}: ${data.meta.total_count} records`);
    }
  }
}

async function main() {
  console.log('🚀 Starting special collections population...');
  console.log('This will create the missing database records for borders, backgrounds, and templates.');

  try {
    // First check what we have
    await checkExistingRecords();

    // Get all existing files from Directus
    console.log('\n📂 Loading Directus files...');
    const fileMap = await getExistingFiles();
    console.log(`Found ${fileMap.size} files in Directus`);

    // Populate each collection
    await populateBorders(fileMap);
    await populateBackgrounds(fileMap);
    await populateTrainTemplates(fileMap);
    await populateWorksheetTemplates(fileMap);

    // Final check
    console.log('\n✅ Population complete! Final counts:');
    await checkExistingRecords();

    console.log('\n🎉 Done! The dynamic system should now be fully functional.');
    console.log('The apps will sync these new records within 60 seconds.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
main().catch(console.error);