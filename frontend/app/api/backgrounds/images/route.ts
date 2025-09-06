import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  
  if (!theme || theme.includes('..')) {
    return NextResponse.json({ error: 'A valid background theme is required' }, { status: 400 });
  }
  
  const folderPath = path.join(process.cwd(), 'public', 'images', 'backgrounds', theme);
  
  try {
    const files = await fs.promises.readdir(folderPath);
    const imageFiles = files.filter(f => /\.(png|jpe?g|gif|svg)$/i.test(f));
    const images = imageFiles.map(f => ({
      name: path.basename(f, path.extname(f)),
      path: `/images/backgrounds/${theme}/${f}`
    }));
    
    return NextResponse.json(images);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Background theme not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error reading background theme folder' }, { status: 500 });
  }
}