import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const metadata = await request.json();

    // Validate the metadata structure
    if (!metadata.themes || !Array.isArray(metadata.themes)) {
      return NextResponse.json(
        { error: 'Invalid metadata structure' },
        { status: 400 }
      );
    }

    // Write to the backgrounds metadata file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'backgrounds-metadata.json');

    // Ensure directory exists
    const dataDir = path.dirname(metadataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Add last updated timestamp
    metadata.lastUpdated = new Date().toISOString();
    metadata.version = metadata.version || '1.0.0';

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Backgrounds metadata updated successfully'
    });
  } catch (error) {
    console.error('Error updating backgrounds metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update backgrounds metadata' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'backgrounds-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json({
        themes: [],
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      });
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error reading backgrounds metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read backgrounds metadata' },
      { status: 500 }
    );
  }
}