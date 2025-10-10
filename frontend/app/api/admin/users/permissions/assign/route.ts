import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

// POST /api/admin/users/permissions/assign - Assign role to user
export const POST = withAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { userId, roleId, action = 'assign' } = body;

    // Validation
    if (!userId || !roleId) {
      return NextResponse.json(
        { error: 'userId and roleId are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return NextResponse.json(
        { error: 'Role not found' },
        { status: 404 }
      );
    }

    if (action === 'assign') {
      // Check if role is already assigned
      const existing = await prisma.userRole.findUnique({
        where: {
          userId_roleId: {
            userId,
            roleId,
          },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: 'Role already assigned to this user' },
          { status: 409 }
        );
      }

      // Assign role
      await prisma.userRole.create({
        data: {
          userId,
          roleId,
        },
      });

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId,
          action: 'role_assigned',
          details: `Role "${role.name}" assigned`,
          metadata: { roleId, roleName: role.name },
        },
      });

      return NextResponse.json({
        message: 'Role assigned successfully',
      });
    } else if (action === 'revoke') {
      // Revoke role
      const deleted = await prisma.userRole.deleteMany({
        where: {
          userId,
          roleId,
        },
      });

      if (deleted.count === 0) {
        return NextResponse.json(
          { error: 'Role not assigned to this user' },
          { status: 404 }
        );
      }

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId,
          action: 'role_revoked',
          details: `Role "${role.name}" revoked`,
          metadata: { roleId, roleName: role.name },
        },
      });

      return NextResponse.json({
        message: 'Role revoked successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "assign" or "revoke"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error managing role assignment:', error);
    return NextResponse.json(
      { error: 'Failed to manage role assignment' },
      { status: 500 }
    );
  }
});
