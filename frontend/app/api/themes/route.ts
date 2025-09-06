import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const files = await fs.promises.readdir(imagesDir, { withFileTypes: true });
    
    const excludedFolders = ['borders', 'backgrounds', 'drawing lines', 'template'];
    
    const themes = files
      .filter(file => file.isDirectory() && !excludedFolders.includes(file.name))
      .map(file => file.name);
    
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading images directory' }, { status: 500 });
  }
}