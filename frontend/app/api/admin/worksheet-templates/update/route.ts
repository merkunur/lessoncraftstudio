import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'worksheet-templates-metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error reading worksheet templates metadata:', error);
    return NextResponse.json({ error: 'Failed to load worksheet templates metadata' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'worksheet-templates-metadata.json');

    // Validate structure
    if (!data.themes || !Array.isArray(data.themes)) {
      return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
    }

    // Update lastUpdated
    data.lastUpdated = new Date().toISOString();

    fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: 'Worksheet templates metadata updated successfully' });
  } catch (error) {
    console.error('Error updating worksheet templates metadata:', error);
    return NextResponse.json({ error: 'Failed to update worksheet templates metadata' }, { status: 500 });
  }
}