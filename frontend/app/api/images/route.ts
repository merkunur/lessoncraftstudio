import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const search = searchParams.get('search');
  
  const imagesBaseDir = path.join(process.cwd(), 'public', 'images');
  
  if (search) {
    const excludedFolders = new Set(['borders', 'backgrounds', 'drawing lines', 'template']);
    const results: any[] = [];
    const searchQuery = search.toLowerCase();
    
    async function findMatchingImages(directory: string, currentPath = '') {
      try {
        const files = await fs.promises.readdir(directory, { withFileTypes: true });
        
        for (const file of files) {
          const fullPath = path.join(directory, file.name);
          const newRelativePath = path.join(currentPath, file.name).replace(/\\/g, '/');
          
          if (file.isDirectory()) {
            if (currentPath === '' && excludedFolders.has(file.name)) {
              continue;
            }
            await findMatchingImages(fullPath, newRelativePath);
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
    
    await findMatchingImages(imagesBaseDir);
    return NextResponse.json(results);
  }
  
  if (!theme || theme.includes('..') || theme === 'all') {
    return NextResponse.json([]);
  }
  
  // Support nested theme paths like "alphabetsvg/cursive"
  const folderPath = path.join(imagesBaseDir, ...theme.split('/'));
  
  try {
    const files = await fs.promises.readdir(folderPath);
    const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
    const images = imageFiles.map(f => ({
      word: path.basename(f, path.extname(f)).replace(/[-_]/g, ' '),
      path: `/images/${theme}/${f}`
    }));
    
    return NextResponse.json(images);
  } catch (err) {
    return NextResponse.json({ error: `Error reading images folder: ${theme}` }, { status: 500 });
  }
}