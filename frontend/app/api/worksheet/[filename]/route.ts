import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  
  // Security check - prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  
  // Ensure it's an HTML file
  if (!filename.endsWith('.html')) {
    return NextResponse.json({ error: 'Only HTML files are allowed' }, { status: 400 });
  }
  
  const filePath = path.join(process.cwd(), 'public', 'worksheet-generators', filename);
  
  try {
    const htmlContent = await fs.promises.readFile(filePath, 'utf-8');
    
    // Return the HTML content with proper headers
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Worksheet generator not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error loading worksheet generator' }, { status: 500 });
  }
}