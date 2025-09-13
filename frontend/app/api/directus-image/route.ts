import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://lcs-directus:8055';
const API_TOKEN = 'static-api-token-for-sync';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('id');
  
  if (!fileId) {
    return NextResponse.json({ error: 'File ID required' }, { status: 400 });
  }
  
  try {
    // Fetch the image from Directus with authentication
    const response = await fetch(
      `${DIRECTUS_URL}/assets/${fileId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    );
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    // Get the content type
    const contentType = response.headers.get('content-type') || 'image/png';
    
    // Stream the image back
    const imageBuffer = await response.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Error fetching image from Directus:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}