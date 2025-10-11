import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { withAdmin } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

async function postHandler(request: NextRequest, userId: string) {
  try {
    const metadata = await request.json();

    // Validate the metadata structure
    if (!metadata.themes || !Array.isArray(metadata.themes)) {
      return NextResponse.json(
        { error: 'Invalid metadata structure' },
        { status: 400 }
      );
    }

    // Write to the borders metadata file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'borders-metadata.json');

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
      message: 'Borders metadata updated successfully'
    });
  } catch (error) {
    console.error('Error updating borders metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update borders metadata' },
      { status: 500 }
    );
  }
}

async function getHandler(request: NextRequest, userId: string) {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'borders-metadata.json');

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
    console.error('Error reading borders metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read borders metadata' },
      { status: 500 }
    );
  }
}

async function deleteHandler(request: NextRequest, userId: string) {
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
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'borders-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json(
        { error: 'Borders metadata not found' },
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

// Export handlers with admin authentication
export const GET = async (request: NextRequest) => withAdmin(request, getHandler);
export const POST = async (request: NextRequest) => withAdmin(request, postHandler);
export const DELETE = async (request: NextRequest) => withAdmin(request, deleteHandler);