import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/tools/feature-flags/[id]/toggle - Toggle feature flag
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In production, toggle the flag in database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: `Feature flag ${id} toggled`
    });
  } catch (error) {
    console.error('Failed to toggle feature flag:', error);
    return NextResponse.json(
      { error: 'Failed to toggle feature flag' },
      { status: 500 }
    );
  }
}