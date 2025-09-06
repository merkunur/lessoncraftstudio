import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const bordersDir = path.join(process.cwd(), 'public', 'images', 'borders');
  
  try {
    const files = await fs.promises.readdir(bordersDir, { withFileTypes: true });
    const themes = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    
    return NextResponse.json(themes);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: 'Error reading borders directory' }, { status: 500 });
  }
}