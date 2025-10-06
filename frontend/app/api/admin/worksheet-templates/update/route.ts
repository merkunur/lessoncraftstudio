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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get('themeId');

    if (!themeId) {
      return NextResponse.json(
        { error: 'themeId is required' },
        { status: 400 }
      );
    }

    // Read current metadata
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'worksheet-templates-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json(
        { error: 'Worksheet templates metadata not found' },
        { status: 404 }
      );
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    // Find and remove theme
    const themeIndex = metadata.themes.findIndex((t: any) => t.id === themeId || t.name === themeId);

    if (themeIndex === -1) {
      return NextResponse.json(
        { error: `Theme '${themeId}' not found` },
        { status: 404 }
      );
    }

    // Remove theme
    metadata.themes.splice(themeIndex, 1);

    // Save updated metadata
    metadata.lastUpdated = new Date().toISOString();
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Theme deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json(
      { error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}