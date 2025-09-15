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

async function getExistingFiles() {
  const response = await fetch(`${DIRECTUS_URL}/files?limit=500&fields=filename_download`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files from Directus');
  }

  const data = await response.json();
  return new Set(data.data.map(f => f.filename_download.toLowerCase()));
}

async function uploadFolderImages(folderPath, folderName) {
  if (!fs.existsSync(folderPath)) {
    console.log(`  ⚠️ Folder not found: ${folderPath}`);
    return 0;
  }

  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(png|jpg|jpeg|gif|svg)$/i.test(f));

  console.log(`📁 Processing ${folderName} (${files.length} files)...`);

  let uploaded = 0;
  const existingFiles = await getExistingFiles();

  for (const file of files) {
    if (existingFiles.has(file.toLowerCase())) {
      console.log(`  ⏭️ Skipping ${file} - already exists`);
      continue;
    }

    const filePath = path.join(folderPath, file);
    const fileId = await uploadImageToDirectus(filePath, file);
    if (fileId) uploaded++;
  }

  return uploaded;
}

async function main() {
  console.log('🚀 Starting upload of special collection images...');

  let totalUploaded = 0;

  // Upload border images
  console.log('\n📌 BORDERS:');
  const bordersPath = path.join(__dirname, '..', 'public', 'images', 'borders');
  if (fs.existsSync(bordersPath)) {
    const borderStyles = fs.readdirSync(bordersPath, { withFileTypes: true })
      .filter(d => d.isDirectory());

    for (const style of borderStyles) {
      const stylePath = path.join(bordersPath, style.name);
      totalUploaded += await uploadFolderImages(stylePath, `borders/${style.name}`);
    }
  }

  // Upload background images
  console.log('\n🎨 BACKGROUNDS:');
  const backgroundsPath = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
  if (fs.existsSync(backgroundsPath)) {
    const themes = fs.readdirSync(backgroundsPath, { withFileTypes: true })
      .filter(d => d.isDirectory());

    for (const theme of themes) {
      const themePath = path.join(backgroundsPath, theme.name);
      totalUploaded += await uploadFolderImages(themePath, `backgrounds/${theme.name}`);
    }
  }

  // Upload train templates
  console.log('\n🚂 TRAIN TEMPLATES:');
  const trainPath = path.join(__dirname, '..', 'public', 'images', 'template', 'train');
  totalUploaded += await uploadFolderImages(trainPath, 'template/train');

  // Upload worksheet templates
  console.log('\n📄 WORKSHEET TEMPLATES:');
  const worksheetPath = path.join(__dirname, '..', 'public', 'images', 'template', 'worksheet');
  totalUploaded += await uploadFolderImages(worksheetPath, 'template/worksheet');

  console.log(`\n✅ Upload complete! Uploaded ${totalUploaded} new files.`);
  console.log('Now run: node scripts/populate-special-collections.js');
}

main().catch(console.error);