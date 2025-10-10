import { NextRequest, NextResponse } from 'next/server';
import { UserImpersonation } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// POST /api/admin/tools/impersonate - Start user impersonation
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // In production, create impersonation session
    const impersonation: UserImpersonation = {
      id: `imp_${Date.now()}`,
      adminId: 'admin_123',
      adminEmail: 'admin@lessoncraft.com',
      targetUserId: userId,
      targetUserEmail: `user${userId}@example.com`,
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      reason: 'Customer support',
      permissions: ['read', 'write'],
      actionsLogged: true,
      active: true
    };

    // Set impersonation cookie/session
    const response = NextResponse.json(impersonation);
    response.cookies.set('impersonation', impersonation.id, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Failed to start impersonation:', error);
    return NextResponse.json(
      { error: 'Failed to start impersonation' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/tools/impersonate - End impersonation
export async function DELETE(request: NextRequest) {
  try {
    // Clear impersonation cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('impersonation');

    return response;
  } catch (error) {
    console.error('Failed to end impersonation:', error);
    return NextResponse.json(
      { error: 'Failed to end impersonation' },
      { status: 500 }
    );
  }
}