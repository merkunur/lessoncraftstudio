import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: Permission[];
  isCustom: boolean;
  priority: number;
}

interface RoleAssignment {
  userId: string;
  teamId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: string;
  expiresAt?: string;
}

// Define all available permissions
const allPermissions: Permission[] = [
  // Team Management
  { id: 'team.view', name: 'View Team', resource: 'team', action: 'view', description: 'View team information and members' },
  { id: 'team.edit', name: 'Edit Team', resource: 'team', action: 'edit', description: 'Edit team settings and information' },
  { id: 'team.delete', name: 'Delete Team', resource: 'team', action: 'delete', description: 'Delete the team permanently' },

  // Member Management
  { id: 'members.view', name: 'View Members', resource: 'members', action: 'view', description: 'View team member list' },
  { id: 'members.invite', name: 'Invite Members', resource: 'members', action: 'invite', description: 'Send invitations to new members' },
  { id: 'members.remove', name: 'Remove Members', resource: 'members', action: 'remove', description: 'Remove members from team' },
  { id: 'members.roles', name: 'Manage Roles', resource: 'members', action: 'roles', description: 'Assign and change member roles' },

  // Resource Management
  { id: 'resources.view', name: 'View Resources', resource: 'resources', action: 'view', description: 'View shared resources' },
  { id: 'resources.create', name: 'Create Resources', resource: 'resources', action: 'create', description: 'Create new resources' },
  { id: 'resources.edit', name: 'Edit Resources', resource: 'resources', action: 'edit', description: 'Edit existing resources' },
  { id: 'resources.delete', name: 'Delete Resources', resource: 'resources', action: 'delete', description: 'Delete resources' },
  { id: 'resources.share', name: 'Share Resources', resource: 'resources', action: 'share', description: 'Share resources with team' },

  // Worksheet Management
  { id: 'worksheets.view', name: 'View Worksheets', resource: 'worksheets', action: 'view', description: 'View team worksheets' },
  { id: 'worksheets.create', name: 'Create Worksheets', resource: 'worksheets', action: 'create', description: 'Create new worksheets' },
  { id: 'worksheets.edit', name: 'Edit Worksheets', resource: 'worksheets', action: 'edit', description: 'Edit team worksheets' },
  { id: 'worksheets.delete', name: 'Delete Worksheets', resource: 'worksheets', action: 'delete', description: 'Delete worksheets' },
  { id: 'worksheets.export', name: 'Export Worksheets', resource: 'worksheets', action: 'export', description: 'Export worksheets' },

  // Settings Management
  { id: 'settings.view', name: 'View Settings', resource: 'settings', action: 'view', description: 'View team settings' },
  { id: 'settings.edit', name: 'Edit Settings', resource: 'settings', action: 'edit', description: 'Modify team settings' },
  { id: 'settings.billing', name: 'Manage Billing', resource: 'settings', action: 'billing', description: 'Manage subscription and billing' },

  // Analytics
  { id: 'analytics.view', name: 'View Analytics', resource: 'analytics', action: 'view', description: 'View team analytics and reports' },
  { id: 'analytics.export', name: 'Export Analytics', resource: 'analytics', action: 'export', description: 'Export analytics data' }
];

// Define default roles
const defaultRoles: Role[] = [
  {
    id: 'owner',
    name: 'owner',
    displayName: 'Owner',
    description: 'Full control over the team',
    permissions: allPermissions,
    isCustom: false,
    priority: 100
  },
  {
    id: 'admin',
    name: 'admin',
    displayName: 'Administrator',
    description: 'Can manage team settings and members',
    permissions: allPermissions.filter(p => !p.id.includes('delete') && !p.id.includes('billing')),
    isCustom: false,
    priority: 80
  },
  {
    id: 'editor',
    name: 'editor',
    displayName: 'Editor',
    description: 'Can create and edit resources',
    permissions: allPermissions.filter(p =>
      p.resource === 'resources' ||
      p.resource === 'worksheets' ||
      p.action === 'view'
    ),
    isCustom: false,
    priority: 60
  },
  {
    id: 'member',
    name: 'member',
    displayName: 'Member',
    description: 'Can view and create personal resources',
    permissions: allPermissions.filter(p =>
      p.action === 'view' ||
      (p.resource === 'worksheets' && p.action === 'create')
    ),
    isCustom: false,
    priority: 40
  },
  {
    id: 'viewer',
    name: 'viewer',
    displayName: 'Viewer',
    description: 'Can only view team content',
    permissions: allPermissions.filter(p => p.action === 'view'),
    isCustom: false,
    priority: 20
  }
];

// Mock storage for custom roles and assignments
const customRoles = new Map<string, Role[]>();
const roleAssignments = new Map<string, RoleAssignment[]>();

class PermissionService {
  getAllPermissions(): Permission[] {
    return allPermissions;
  }

  getDefaultRoles(): Role[] {
    return defaultRoles;
  }

  getTeamRoles(teamId: string): Role[] {
    const custom = customRoles.get(teamId) || [];
    return [...defaultRoles, ...custom].sort((a, b) => b.priority - a.priority);
  }

  async createCustomRole(
    teamId: string,
    data: {
      name: string;
      displayName: string;
      description: string;
      permissions: string[];
      priority?: number;
    }
  ): Promise<Role> {
    const teamCustomRoles = customRoles.get(teamId) || [];

    // Check if role name already exists
    if (teamCustomRoles.some(r => r.name === data.name)) {
      throw new Error('Role name already exists');
    }

    const selectedPermissions = allPermissions.filter(p =>
      data.permissions.includes(p.id)
    );

    const newRole: Role = {
      id: `role_${Date.now()}`,
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      permissions: selectedPermissions,
      isCustom: true,
      priority: data.priority || 30
    };

    teamCustomRoles.push(newRole);
    customRoles.set(teamId, teamCustomRoles);

    return newRole;
  }

  async updateCustomRole(
    teamId: string,
    roleId: string,
    updates: Partial<Role>
  ): Promise<Role | null> {
    const teamCustomRoles = customRoles.get(teamId) || [];
    const roleIndex = teamCustomRoles.findIndex(r => r.id === roleId);

    if (roleIndex === -1) return null;

    const updatedRole = {
      ...teamCustomRoles[roleIndex],
      ...updates,
      id: teamCustomRoles[roleIndex].id,
      isCustom: true
    };

    teamCustomRoles[roleIndex] = updatedRole;
    customRoles.set(teamId, teamCustomRoles);

    return updatedRole;
  }

  async deleteCustomRole(teamId: string, roleId: string): Promise<boolean> {
    const teamCustomRoles = customRoles.get(teamId) || [];
    const filtered = teamCustomRoles.filter(r => r.id !== roleId);

    if (filtered.length === teamCustomRoles.length) return false;

    customRoles.set(teamId, filtered);

    // Remove any assignments using this role
    const assignments = roleAssignments.get(teamId) || [];
    roleAssignments.set(
      teamId,
      assignments.filter(a => a.roleId !== roleId)
    );

    return true;
  }

  async assignRole(
    teamId: string,
    userId: string,
    roleId: string,
    assignedBy: string,
    expiresAt?: string
  ): Promise<RoleAssignment> {
    const teamAssignments = roleAssignments.get(teamId) || [];

    // Remove existing assignment for this user
    const filtered = teamAssignments.filter(a => a.userId !== userId);

    const newAssignment: RoleAssignment = {
      userId,
      teamId,
      roleId,
      assignedBy,
      assignedAt: new Date().toISOString(),
      expiresAt
    };

    filtered.push(newAssignment);
    roleAssignments.set(teamId, filtered);

    return newAssignment;
  }

  getUserPermissions(teamId: string, userId: string): Permission[] {
    const teamAssignments = roleAssignments.get(teamId) || [];
    const userAssignment = teamAssignments.find(a => a.userId === userId);

    if (!userAssignment) {
      // Default to viewer permissions
      return defaultRoles.find(r => r.id === 'viewer')?.permissions || [];
    }

    // Check if assignment has expired
    if (userAssignment.expiresAt && new Date(userAssignment.expiresAt) < new Date()) {
      return defaultRoles.find(r => r.id === 'viewer')?.permissions || [];
    }

    // Find role and return permissions
    const allRoles = this.getTeamRoles(teamId);
    const role = allRoles.find(r => r.id === userAssignment.roleId);

    return role?.permissions || [];
  }

  hasPermission(
    teamId: string,
    userId: string,
    resource: string,
    action: string
  ): boolean {
    const permissions = this.getUserPermissions(teamId, userId);
    return permissions.some(p => p.resource === resource && p.action === action);
  }

  checkPermissions(
    teamId: string,
    userId: string,
    requiredPermissions: string[]
  ): boolean {
    const userPermissions = this.getUserPermissions(teamId, userId);
    const userPermissionIds = userPermissions.map(p => p.id);

    return requiredPermissions.every(required =>
      userPermissionIds.includes(required)
    );
  }
}

const permissionService = new PermissionService();

// GET /api/admin/teams/permissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    // Get all available permissions
    if (type === 'all') {
      return NextResponse.json({
        permissions: permissionService.getAllPermissions()
      });
    }

    // Get default roles
    if (type === 'roles') {
      return NextResponse.json({
        roles: permissionService.getDefaultRoles()
      });
    }

    // Get team-specific roles
    if (teamId && !userId) {
      const roles = permissionService.getTeamRoles(teamId);
      return NextResponse.json({
        roles,
        total: roles.length
      });
    }

    // Get user permissions for a team
    if (teamId && userId) {
      const permissions = permissionService.getUserPermissions(teamId, userId);
      return NextResponse.json({
        permissions,
        total: permissions.length
      });
    }

    return NextResponse.json(
      { error: 'Invalid request parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/teams/permissions/roles
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.teamId || !data.name || !data.displayName || !data.permissions) {
      return NextResponse.json(
        { error: 'Team ID, name, display name, and permissions are required' },
        { status: 400 }
      );
    }

    // Check permissions to create roles
    const userId = session.user.id || 'user_1';
    if (!permissionService.hasPermission(data.teamId, userId, 'members', 'roles')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create roles' },
        { status: 403 }
      );
    }

    const newRole = await permissionService.createCustomRole(data.teamId, {
      name: data.name,
      displayName: data.displayName,
      description: data.description || '',
      permissions: data.permissions,
      priority: data.priority
    });

    return NextResponse.json({
      role: newRole,
      message: 'Custom role created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create role' },
      { status: 400 }
    );
  }
}

// PUT /api/admin/teams/permissions/assign
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.teamId || !data.userId || !data.roleId) {
      return NextResponse.json(
        { error: 'Team ID, user ID, and role ID are required' },
        { status: 400 }
      );
    }

    // Check permissions to assign roles
    const assignerId = session.user.id || 'user_1';
    if (!permissionService.hasPermission(data.teamId, assignerId, 'members', 'roles')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to assign roles' },
        { status: 403 }
      );
    }

    const assignment = await permissionService.assignRole(
      data.teamId,
      data.userId,
      data.roleId,
      assignerId,
      data.expiresAt
    );

    return NextResponse.json({
      assignment,
      message: 'Role assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning role:', error);
    return NextResponse.json(
      { error: 'Failed to assign role' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/teams/permissions/roles
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const roleId = searchParams.get('roleId');

    if (!teamId || !roleId) {
      return NextResponse.json(
        { error: 'Team ID and role ID are required' },
        { status: 400 }
      );
    }

    // Check permissions to delete roles
    const userId = session.user.id || 'user_1';
    if (!permissionService.hasPermission(teamId, userId, 'members', 'roles')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete roles' },
        { status: 403 }
      );
    }

    const success = await permissionService.deleteCustomRole(teamId, roleId);

    if (!success) {
      return NextResponse.json(
        { error: 'Role not found or cannot be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    );
  }
}