import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

// PATCH /api/admin/users/permissions/roles/[id] - Update role
export const PATCH = withAdmin(async (
  request: NextRequest,
  user: any,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: roleId } = await context.params;
    const body = await request.json();
    const { name, slug, description, permissions } = body;

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

    // Prevent editing system roles
    if (role.isSystem) {
      return NextResponse.json(
        { error: 'Cannot edit system roles' },
        { status: 403 }
      );
    }

    // If name or slug is being updated, check for conflicts
    if (name || slug) {
      const existing = await prisma.role.findFirst({
        where: {
          AND: [
            { id: { not: roleId } },
            {
              OR: [
                name ? { name } : {},
                slug ? { slug: slug.toLowerCase() } : {},
              ].filter((obj) => Object.keys(obj).length > 0),
            },
          ],
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: 'Role with this name or slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update role
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        ...(name && { name }),
        ...(slug && { slug: slug.toLowerCase() }),
        ...(description !== undefined && { description }),
        ...(permissions && { permissions }),
      },
    });

    return NextResponse.json({
      message: 'Role updated successfully',
      role: updatedRole,
    });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    );
  }
});

// DELETE /api/admin/users/permissions/roles/[id] - Delete role
export const DELETE = withAdmin(async (
  request: NextRequest,
  user: any,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: roleId } = await context.params;

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        _count: {
          select: {
            userRoles: true,
          },
        },
      },
    });

    if (!role) {
      return NextResponse.json(
        { error: 'Role not found' },
        { status: 404 }
      );
    }

    // Prevent deleting system roles
    if (role.isSystem) {
      return NextResponse.json(
        { error: 'Cannot delete system roles' },
        { status: 403 }
      );
    }

    // Check if role is assigned to any users
    if (role._count.userRoles > 0) {
      return NextResponse.json(
        { error: `Cannot delete role assigned to ${role._count.userRoles} user(s)` },
        { status: 409 }
      );
    }

    // Delete role
    await prisma.role.delete({
      where: { id: roleId },
    });

    return NextResponse.json({
      message: 'Role deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    );
  }
});
