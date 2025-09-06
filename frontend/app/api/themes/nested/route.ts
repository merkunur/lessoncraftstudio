import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template'];
    
    // Recursively find all directories that contain images
    async function findImageDirs(dir: string, relativePath: string = ''): Promise<string[]> {
      const results: string[] = [];
      
      try {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });
        
        // Check if this directory contains any images
        const hasImages = entries.some(entry => 
          !entry.isDirectory() && /\.(png|jpe?g|gif|svg)$/i.test(entry.name)
        );
        
        // If it has images, add this path
        if (hasImages && relativePath) {
          results.push(relativePath);
        }
        
        // Recursively check subdirectories
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const newPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
            const subDirPath = path.join(dir, entry.name);
            const subResults = await findImageDirs(subDirPath, newPath);
            results.push(...subResults);
          }
        }
      } catch (err) {
        // Ignore errors reading directories
      }
      
      return results;
    }
    
    // Get all theme directories
    const allThemes: string[] = [];
    const topLevelDirs = await fs.promises.readdir(imagesDir, { withFileTypes: true });
    
    for (const dir of topLevelDirs) {
      if (dir.isDirectory() && !excludedFolders.includes(dir.name)) {
        const dirPath = path.join(imagesDir, dir.name);
        const themes = await findImageDirs(dirPath, dir.name);
        
        // Also add the top-level directory if it's not already included
        if (!themes.includes(dir.name)) {
          allThemes.push(dir.name);
        }
        allThemes.push(...themes);
      }
    }
    
    return NextResponse.json(allThemes);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading themes directory' }, { status: 500 });
  }
}