import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

interface Team {
  id: string;
  name: string;
  description: string;
  slug: string;
  avatar?: string;
  coverImage?: string;
  type: 'education' | 'business' | 'personal' | 'nonprofit';
  visibility: 'private' | 'public' | 'invite-only';
  ownerId: string;
  ownerName: string;
  members: TeamMember[];
  settings: TeamSettings;
  subscription: TeamSubscription;
  resources: SharedResource[];
  activity: ActivityLog[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  permissions: string[];
  joinedAt: string;
  lastActive?: string;
  contribution: {
    worksheetsCreated: number;
    filesShared: number;
    commentsAdded: number;
  };
}

interface TeamSettings {
  allowMemberInvites: boolean;
  requireApproval: boolean;
  autoApproveEducators: boolean;
  defaultRole: 'viewer' | 'member' | 'editor';
  resourceSharing: 'none' | 'view' | 'edit' | 'full';
  activityTracking: boolean;
  emailNotifications: boolean;
  maxMembers?: number;
  allowGuests: boolean;
}

interface TeamSubscription {
  plan: 'free' | 'team' | 'enterprise';
  seats: number;
  usedSeats: number;
  validUntil?: string;
  features: string[];
}

interface SharedResource {
  id: string;
  teamId: string;
  type: 'worksheet' | 'file' | 'folder' | 'template';
  name: string;
  description?: string;
  url?: string;
  sharedBy: string;
  sharedAt: string;
  permissions: 'view' | 'edit' | 'admin';
  tags: string[];
  downloads: number;
}

interface ActivityLog {
  id: string;
  teamId: string;
  userId: string;
  userName: string;
  action: string;
  details?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Mock data storage
const teams = new Map<string, Team>([
  ['team_1', {
    id: 'team_1',
    name: 'Math Department',
    description: 'Collaborative workspace for math teachers',
    slug: 'math-dept',
    avatar: 'https://i.pravatar.cc/150?img=10',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    type: 'education',
    visibility: 'private',
    ownerId: 'user_1',
    ownerName: 'John Doe',
    members: [
      {
        id: 'member_1',
        userId: 'user_1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'owner',
        status: 'active',
        permissions: ['all'],
        joinedAt: '2024-01-15T10:00:00Z',
        lastActive: new Date().toISOString(),
        contribution: {
          worksheetsCreated: 45,
          filesShared: 23,
          commentsAdded: 156
        }
      },
      {
        id: 'member_2',
        userId: 'user_2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        status: 'active',
        permissions: ['manage_members', 'manage_resources', 'edit_settings'],
        joinedAt: '2024-01-20T10:00:00Z',
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        contribution: {
          worksheetsCreated: 32,
          filesShared: 18,
          commentsAdded: 89
        }
      }
    ],
    settings: {
      allowMemberInvites: true,
      requireApproval: false,
      autoApproveEducators: true,
      defaultRole: 'member',
      resourceSharing: 'edit',
      activityTracking: true,
      emailNotifications: true,
      maxMembers: 20,
      allowGuests: false
    },
    subscription: {
      plan: 'team',
      seats: 20,
      usedSeats: 12,
      validUntil: '2024-12-31T23:59:59Z',
      features: ['unlimited_resources', 'advanced_permissions', 'priority_support']
    },
    resources: [],
    activity: [],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: new Date().toISOString()
  }]
]);

class TeamService {
  async createTeam(
    userId: string,
    data: {
      name: string;
      description: string;
      type: Team['type'];
      visibility: Team['visibility'];
      settings?: Partial<TeamSettings>;
    }
  ): Promise<Team> {
    const teamId = `team_${Date.now()}`;
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');

    const newTeam: Team = {
      id: teamId,
      name: data.name,
      description: data.description,
      slug,
      type: data.type,
      visibility: data.visibility,
      ownerId: userId,
      ownerName: 'Current User', // Would fetch from user service
      members: [
        {
          id: `member_${Date.now()}`,
          userId,
          name: 'Current User',
          email: 'user@example.com',
          role: 'owner',
          status: 'active',
          permissions: ['all'],
          joinedAt: new Date().toISOString(),
          contribution: {
            worksheetsCreated: 0,
            filesShared: 0,
            commentsAdded: 0
          }
        }
      ],
      settings: {
        allowMemberInvites: true,
        requireApproval: false,
        autoApproveEducators: false,
        defaultRole: 'member',
        resourceSharing: 'view',
        activityTracking: true,
        emailNotifications: true,
        allowGuests: false,
        ...data.settings
      },
      subscription: {
        plan: 'free',
        seats: 5,
        usedSeats: 1,
        features: ['basic_resources', 'basic_permissions']
      },
      resources: [],
      activity: [
        {
          id: `activity_${Date.now()}`,
          teamId,
          userId,
          userName: 'Current User',
          action: 'created_team',
          details: `Created team "${data.name}"`,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    teams.set(teamId, newTeam);
    return newTeam;
  }

  async getTeams(userId: string): Promise<Team[]> {
    const userTeams: Team[] = [];

    teams.forEach(team => {
      const isMember = team.members.some(m => m.userId === userId);
      if (isMember || team.visibility === 'public') {
        userTeams.push(team);
      }
    });

    return userTeams;
  }

  async getTeam(teamId: string, userId: string): Promise<Team | null> {
    const team = teams.get(teamId);
    if (!team) return null;

    const isMember = team.members.some(m => m.userId === userId);
    if (!isMember && team.visibility === 'private') {
      return null;
    }

    return team;
  }

  async updateTeam(
    teamId: string,
    userId: string,
    updates: Partial<Team>
  ): Promise<Team | null> {
    const team = teams.get(teamId);
    if (!team) return null;

    // Check permissions
    const member = team.members.find(m => m.userId === userId);
    if (!member || !['owner', 'admin'].includes(member.role)) {
      throw new Error('Insufficient permissions');
    }

    const updatedTeam = {
      ...team,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    teams.set(teamId, updatedTeam);

    // Log activity
    this.logActivity(teamId, userId, 'updated_team', 'Updated team settings');

    return updatedTeam;
  }

  async deleteTeam(teamId: string, userId: string): Promise<boolean> {
    const team = teams.get(teamId);
    if (!team) return false;

    // Only owner can delete
    if (team.ownerId !== userId) {
      throw new Error('Only team owner can delete the team');
    }

    teams.delete(teamId);
    return true;
  }

  private logActivity(
    teamId: string,
    userId: string,
    action: string,
    details?: string,
    metadata?: Record<string, any>
  ) {
    const team = teams.get(teamId);
    if (!team) return;

    const activity: ActivityLog = {
      id: `activity_${Date.now()}`,
      teamId,
      userId,
      userName: 'User', // Would fetch from user service
      action,
      details,
      timestamp: new Date().toISOString(),
      metadata
    };

    team.activity.unshift(activity);

    // Keep only last 100 activities
    if (team.activity.length > 100) {
      team.activity = team.activity.slice(0, 100);
    }
  }

  async getTeamStats(teamId: string): Promise<{
    totalWorksheets: number;
    totalDownloads: number;
    activeMembers: number;
    storageUsed: number;
    lastActivity: string;
  }> {
    const team = teams.get(teamId);
    if (!team) throw new Error('Team not found');

    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const activeMembers = team.members.filter(m => {
      if (!m.lastActive) return false;
      return new Date(m.lastActive) > dayAgo;
    }).length;

    return {
      totalWorksheets: team.members.reduce((sum, m) => sum + m.contribution.worksheetsCreated, 0),
      totalDownloads: team.resources.reduce((sum, r) => sum + r.downloads, 0),
      activeMembers,
      storageUsed: Math.random() * 5 * 1024 * 1024 * 1024, // Mock storage
      lastActivity: team.activity[0]?.timestamp || team.createdAt
    };
  }
}

const teamService = new TeamService();

// GET /api/admin/teams
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const includeStats = searchParams.get('includeStats') === 'true';

    const userId = session.user.id || 'user_1';

    if (teamId) {
      const team = await teamService.getTeam(teamId, userId);
      if (!team) {
        return NextResponse.json(
          { error: 'Team not found or access denied' },
          { status: 404 }
        );
      }

      const response: any = { team };

      if (includeStats) {
        response.stats = await teamService.getTeamStats(teamId);
      }

      return NextResponse.json(response);
    }

    const userTeams = await teamService.getTeams(userId);

    // Add stats for each team if requested
    const teamsWithStats = includeStats
      ? await Promise.all(
          userTeams.map(async team => ({
            ...team,
            stats: await teamService.getTeamStats(team.id)
          }))
        )
      : userTeams;

    return NextResponse.json({
      teams: teamsWithStats,
      total: teamsWithStats.length
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

// POST /api/admin/teams
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.type || !data.visibility) {
      return NextResponse.json(
        { error: 'Name, type, and visibility are required' },
        { status: 400 }
      );
    }

    // Check name length
    if (data.name.length > 50) {
      return NextResponse.json(
        { error: 'Team name must be 50 characters or less' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const newTeam = await teamService.createTeam(userId, data);

    return NextResponse.json({
      team: newTeam,
      message: 'Team created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/teams/[id]
export async function PUT(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { teamId, ...updates } = data;

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const updatedTeam = await teamService.updateTeam(teamId, userId, updates);

    if (!updatedTeam) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      team: updatedTeam,
      message: 'Team updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating team:', error);

    if (error.message === 'Insufficient permissions') {
      return NextResponse.json(
        { error: 'You do not have permission to update this team' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update team' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/teams/[id]
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const success = await teamService.deleteTeam(teamId, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting team:', error);

    if (error.message === 'Only team owner can delete the team') {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete team' },
      { status: 500 }
    );
  }
}