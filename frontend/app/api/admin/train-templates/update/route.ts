import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getHandler(request: NextRequest, userId: string) {
  try {
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error reading train templates metadata:', error);
    return NextResponse.json({ error: 'Failed to load train templates metadata' }, { status: 500 });
  }
}

async function postHandler(request: NextRequest, userId: string) {
  try {
    const data = await request.json();
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');

    // Validate structure
    if (!data.themes || !Array.isArray(data.themes)) {
      return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
    }

    // Update lastUpdated
    data.lastUpdated = new Date().toISOString();

    fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: 'Train templates metadata updated successfully' });
  } catch (error) {
    console.error('Error updating train templates metadata:', error);
    return NextResponse.json({ error: 'Failed to update train templates metadata' }, { status: 500 });
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
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json(
        { error: 'Train templates metadata not found' },
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