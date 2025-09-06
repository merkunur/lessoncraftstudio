/***********************************
 * server.js (Unified for all applications)
 ***********************************/
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

// Enable CORS for all origins
app.use(cors());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// --- GENERAL IMAGE & THEME API ---

// IMPORTANT: These endpoints should proxy to Strapi CMS for image management
// For now, keeping local file system as fallback during migration

// Endpoint for themes - should fetch from Strapi ImageTheme content type
app.get('/api/themes', async (req, res) => {
  try {
    // Try to fetch from Strapi first
    const strapiUrl = process.env.STRAPI_URL || 'http://strapi:1337';
    const response = await fetch(`${strapiUrl}/api/image-themes?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      const themes = data.data.map(theme => theme.attributes.themeKey);
      return res.json(themes);
    }
  } catch (error) {
    console.error('Failed to fetch themes from Strapi:', error);
  }
  
  // Fallback to local file system
  const imagesDir = path.join(__dirname, 'public', 'images');
  fs.readdir(imagesDir, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json({ error: 'Error reading images directory' });
    
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template'];
    
    const themes = files
      .filter(file => file.isDirectory() && !excludedFolders.includes(file.name))
      .map(file => file.name);
      
    res.json(themes);
  });
});

// NEW Endpoint for updated apps: Recursively finds all theme folders.
app.get('/api/themes/nested', (req, res) => {
    const imagesBaseDir = path.join(__dirname, 'public', 'images');
    const excludedFolders = new Set(['borders', 'backgrounds', 'drawing lines', 'template']);
    let themePaths = [];

    function findThemeFolders(directory, currentPath = '') {
        try {
            const files = fs.readdirSync(directory, { withFileTypes: true });
            let hasImages = false;

            for (const file of files) {
                if (!file.isDirectory() && /\.(png|jpe?g|gif|svg)$/i.test(file.name)) {
                    hasImages = true;
                    break;
                }
            }

            if (hasImages && currentPath !== '') {
                 themePaths.push(currentPath.replace(/\\/g, '/'));
            }

            for (const file of files) {
                if (file.isDirectory()) {
                    if (currentPath === '' && excludedFolders.has(file.name)) {
                        continue;
                    }
                    const newPath = path.join(currentPath, file.name);
                    findThemeFolders(path.join(directory, file.name), newPath);
                }
            }
        } catch (err) {
            console.error(`Could not read directory: ${directory}`, err);
        }
    }

    try {
        findThemeFolders(imagesBaseDir);
        themePaths.sort();
        res.json(themePaths);
    } catch (err) {
        res.status(500).json({ error: 'Error scanning for nested themes' });
    }
});


// MODIFIED Endpoint: List images from a theme OR search all themes
app.get('/api/images', async (req, res) => {
    const { theme, search } = req.query;
    
    // Try to fetch from Strapi first
    try {
        const strapiUrl = process.env.STRAPI_URL || 'http://strapi:1337';
        let query = '?populate=file,themes';
        
        if (theme) {
            query += `&filters[themes][themeKey][$eq]=${theme}`;
        }
        if (search) {
            query += `&filters[displayName][$containsi]=${search}`;
        }
        
        const response = await fetch(`${strapiUrl}/api/image-assets${query}`);
        
        if (response.ok) {
            const data = await response.json();
            const images = data.data.map(asset => ({
                word: asset.attributes.displayName,
                path: asset.attributes.file?.data?.attributes?.url || ''
            }));
            return res.json(images);
        }
    } catch (error) {
        console.error('Failed to fetch images from Strapi:', error);
    }

    // Fallback to local file system
    if (search) {
        const imagesBaseDir = path.join(__dirname, 'public', 'images');
        const excludedFolders = new Set(['borders', 'backgrounds', 'drawing lines', 'template']);
        const results = [];
        const searchQuery = search.toLowerCase();

        function findMatchingImages(directory, currentPath = '') {
            try {
                const files = fs.readdirSync(directory, { withFileTypes: true });

                for (const file of files) {
                    const fullPath = path.join(directory, file.name);
                    const newRelativePath = path.join(currentPath, file.name).replace(/\\/g, '/');

                    if (file.isDirectory()) {
                        if (currentPath === '' && excludedFolders.has(file.name)) {
                            continue;
                        }
                        findMatchingImages(fullPath, newRelativePath);
                    } else if (/\.(png|jpe?g|gif|svg)$/i.test(file.name)) {
                        const word = path.basename(file.name, path.extname(file.name)).toLowerCase();
                        if (word.includes(searchQuery)) {
                            results.push({
                                word: word.replace(/[-_]/g, ' '),
                                path: `/images/${newRelativePath}`
                            });
                        }
                    }
                }
            } catch (err) {
                console.error(`Could not read directory: ${directory}`, err);
            }
        }
        
        findMatchingImages(imagesBaseDir);
        return res.json(results);
    }

    if (!theme || theme.includes('..') || theme === 'all') {
        return res.json([]);
    }

    const folderPath = path.join(__dirname, 'public', 'images', theme);
    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(500).json({ error: `Error reading images folder: ${theme}` });

        const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
        const images = imageFiles.map(f => ({
            word: path.basename(f, path.extname(f)).replace(/[-_]/g, ' '),
            path: path.join('/images', theme, f).replace(/\\/g, '/')
        }));
        res.json(images);
    });
});


// --- BORDERS API ---

app.get('/api/borders/themes', (req, res) => {
  const bordersDir = path.join(__dirname, 'public', 'images', 'borders');
  fs.readdir(bordersDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') return res.json([]);
      return res.status(500).json({ error: 'Error reading borders directory' });
    }
    const themes = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    res.json(themes);
  });
});

app.get('/api/borders/images', (req, res) => {
  const theme = req.query.theme;
  if (!theme || theme.includes('..')) {
    return res.status(400).json({ error: 'A valid border theme is required' });
  }

  const folderPath = path.join(__dirname, 'public', 'images', 'borders', theme);
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') return res.status(404).json({ error: 'Border theme not found' });
      return res.status(500).json({ error: 'Error reading border theme folder' });
    }
    
    const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
    const images = imageFiles.map(f => ({
      name: path.basename(f, path.extname(f)),
      path: path.join('/images/borders', theme, f).replace(/\\/g, '/')
    }));
    res.json(images);
  });
});

// --- BACKGROUNDS API ---

app.get('/api/backgrounds/themes', (req, res) => {
  const backgroundsDir = path.join(__dirname, 'public', 'images', 'backgrounds');
  fs.readdir(backgroundsDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') return res.json([]);
      return res.status(500).json({ error: 'Error reading backgrounds directory' });
    }
    const themes = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    res.json(themes);
  });
});

app.get('/api/backgrounds/images', (req, res) => {
  const theme = req.query.theme;
  if (!theme || theme.includes('..')) {
    return res.status(400).json({ error: 'A valid background theme is required' });
  }

  const folderPath = path.join(__dirname, 'public', 'images', 'backgrounds', theme);
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') return res.status(404).json({ error: 'Background theme not found' });
      return res.status(500).json({ error: 'Error reading background theme folder' });
    }
    
    const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
    const images = imageFiles.map(f => ({
      name: path.basename(f, path.extname(f)),
      path: path.join('/images/backgrounds', theme, f).replace(/\\/g, '/')
    }));
    res.json(images);
  });
});


// --- APP-SPECIFIC APIs ---

// Endpoint for the "Drawing Lines" app
app.get('/api/templates', (req, res) => {
  const templatesDir = path.join(__dirname, 'public', 'images', 'drawing lines');
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
        if (err.code === 'ENOENT') return res.json([]);
        return res.status(500).json({ error: 'Unable to scan templates folder' });
    }
    const pngFiles = files.filter(file => /\.png$/i.test(file));
    const templates = pngFiles.map(file => path.basename(file, '.png'));
    res.json(templates);
  });
});

// NEW endpoint for the "Pattern Train" app
app.get('/api/train-templates', (req, res) => {
  const templatesDir = path.join(__dirname, 'public', 'images', 'template');
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
        if (err.code === 'ENOENT') return res.json([]); // If folder doesn't exist, return empty array
        return res.status(500).json({ error: 'Unable to scan train templates folder' });
    }
    const imageFiles = files.filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file));
    const templates = imageFiles.map(file => ({
        name: path.basename(file, path.extname(file)),
        path: `/images/template/${file}`
    }));
    res.json(templates);
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
