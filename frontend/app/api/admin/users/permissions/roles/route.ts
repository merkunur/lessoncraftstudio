import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/users/permissions/roles - List all roles
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: {
            userRoles: true,
          },
        },
      },
      orderBy: [
        { isSystem: 'desc' }, // System roles first
        { name: 'asc' },
      ],
    });

    return NextResponse.json({
      roles: roles.map((role) => ({
        ...role,
        userCount: role._count.userRoles,
      })),
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
});

// POST /api/admin/users/permissions/roles - Create new role
export const POST = withAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, slug, description, permissions } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(permissions)) {
      return NextResponse.json(
        { error: 'Permissions must be an array' },
        { status: 400 }
      );
    }

    // Check if role with same name or slug exists
    const existing = await prisma.role.findFirst({
      where: {
        OR: [
          { name },
          { slug },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Role with this name or slug already exists' },
        { status: 409 }
      );
    }

    // Create role
    const role = await prisma.role.create({
      data: {
        name,
        slug: slug.toLowerCase(),
        description,
        permissions,
        isSystem: false,
      },
    });

    return NextResponse.json({
      message: 'Role created successfully',
      role,
    });
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    );
  }
});
