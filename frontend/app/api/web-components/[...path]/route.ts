import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const componentPath = pathSegments.join('/');
  
  // Security check - prevent directory traversal
  if (componentPath.includes('..')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }
  
  const filePath = path.join(process.cwd(), 'public', 'web-components', componentPath);
  
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    
    // Determine content type based on file extension
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    
    if (ext === '.js' || ext === '.mjs') {
      contentType = 'application/javascript';
    } else if (ext === '.css') {
      contentType = 'text/css';
    } else if (ext === '.json') {
      contentType = 'application/json';
    }
    
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving web component:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}