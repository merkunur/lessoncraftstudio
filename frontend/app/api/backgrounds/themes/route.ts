import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const backgroundsDir = path.join(process.cwd(), 'public', 'images', 'backgrounds');
  
  try {
    // Check if backgrounds directory exists
    if (!fs.existsSync(backgroundsDir)) {
      return NextResponse.json([]);
    }
    
    const files = await fs.promises.readdir(backgroundsDir, { withFileTypes: true });
    const themes = files
      .filter(file => file.isDirectory())
      .map(file => file.name);
    
    return NextResponse.json(themes);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: 'Error reading backgrounds directory' }, { status: 500 });
  }
}