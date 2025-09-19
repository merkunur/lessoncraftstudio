import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import crypto from 'crypto';

interface TeamInvitation {
  id: string;
  teamId: string;
  teamName: string;
  email: string;
  role: 'admin' | 'editor' | 'member' | 'viewer';
  invitedBy: string;
  invitedByName: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
  token: string;
  message?: string;
  acceptedAt?: string;
  acceptedBy?: string;
  metadata?: {
    resent?: boolean;
    resentAt?: string;
    reminderSent?: boolean;
    reminderSentAt?: string;
  };
}

interface InviteBatchRequest {
  teamId: string;
  invitations: Array<{
    email: string;
    role: TeamInvitation['role'];
    message?: string;
  }>;
}

// Mock invitations storage
const invitations = new Map<string, TeamInvitation[]>([
  ['user_1', [
    {
      id: 'inv_1',
      teamId: 'team_4',
      teamName: 'History Teachers Network',
      email: 'john.doe@example.com',
      role: 'editor',
      invitedBy: 'user_3',
      invitedByName: 'Sarah Wilson',
      invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      token: crypto.randomBytes(32).toString('hex'),
      message: 'Would love to have you join our history resources team!'
    }
  ]]
]);

const teamInvitations = new Map<string, TeamInvitation[]>();

class InvitationService {
  generateInviteToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async createInvitation(
    teamId: string,
    teamName: string,
    invitedBy: string,
    invitedByName: string,
    data: {
      email: string;
      role: TeamInvitation['role'];
      message?: string;
      expiresInDays?: number;
    }
  ): Promise<TeamInvitation> {
    const invitation: TeamInvitation = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teamId,
      teamName,
      email: data.email.toLowerCase(),
      role: data.role,
      invitedBy,
      invitedByName,
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (data.expiresInDays || 7) * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      token: this.generateInviteToken(),
      message: data.message
    };

    // Add to user's invitations
    const userInvitations = invitations.get(data.email) || [];
    userInvitations.push(invitation);
    invitations.set(data.email, userInvitations);

    // Add to team's invitations
    const teamInvs = teamInvitations.get(teamId) || [];
    teamInvs.push(invitation);
    teamInvitations.set(teamId, teamInvs);

    // In production, send email here
    await this.sendInvitationEmail(invitation);

    return invitation;
  }

  async createBatchInvitations(
    teamId: string,
    teamName: string,
    invitedBy: string,
    invitedByName: string,
    invitationRequests: Array<{
      email: string;
      role: TeamInvitation['role'];
      message?: string;
    }>
  ): Promise<TeamInvitation[]> {
    const createdInvitations: TeamInvitation[] = [];

    for (const request of invitationRequests) {
      try {
        const invitation = await this.createInvitation(
          teamId,
          teamName,
          invitedBy,
          invitedByName,
          request
        );
        createdInvitations.push(invitation);
      } catch (error) {
        console.error(`Failed to create invitation for ${request.email}:`, error);
      }
    }

    return createdInvitations;
  }

  async getUserInvitations(email: string): Promise<TeamInvitation[]> {
    const userInvitations = invitations.get(email) || [];

    // Filter out expired invitations
    const now = new Date();
    return userInvitations.filter(inv => {
      if (inv.status !== 'pending') return true;
      return new Date(inv.expiresAt) > now;
    });
  }

  async getTeamInvitations(teamId: string): Promise<TeamInvitation[]> {
    return teamInvitations.get(teamId) || [];
  }

  async acceptInvitation(invitationId: string, userId: string): Promise<boolean> {
    // Find invitation across all users
    for (const [email, userInvitations] of invitations.entries()) {
      const invitation = userInvitations.find(inv => inv.id === invitationId);
      if (invitation) {
        if (invitation.status !== 'pending') {
          throw new Error('Invitation is no longer pending');
        }

        if (new Date(invitation.expiresAt) < new Date()) {
          invitation.status = 'expired';
          throw new Error('Invitation has expired');
        }

        invitation.status = 'accepted';
        invitation.acceptedAt = new Date().toISOString();
        invitation.acceptedBy = userId;

        // Add user to team (would be done through team service in production)
        await this.addUserToTeam(invitation.teamId, userId, invitation.role);

        return true;
      }
    }

    return false;
  }

  async declineInvitation(invitationId: string): Promise<boolean> {
    for (const [email, userInvitations] of invitations.entries()) {
      const invitation = userInvitations.find(inv => inv.id === invitationId);
      if (invitation) {
        if (invitation.status !== 'pending') {
          throw new Error('Invitation is no longer pending');
        }

        invitation.status = 'declined';
        return true;
      }
    }

    return false;
  }

  async cancelInvitation(invitationId: string, cancelledBy: string): Promise<boolean> {
    for (const [email, userInvitations] of invitations.entries()) {
      const invitation = userInvitations.find(inv => inv.id === invitationId);
      if (invitation) {
        if (invitation.invitedBy !== cancelledBy) {
          throw new Error('Only the inviter can cancel the invitation');
        }

        if (invitation.status !== 'pending') {
          throw new Error('Can only cancel pending invitations');
        }

        invitation.status = 'cancelled';
        return true;
      }
    }

    return false;
  }

  async resendInvitation(invitationId: string): Promise<TeamInvitation | null> {
    for (const [email, userInvitations] of invitations.entries()) {
      const invitation = userInvitations.find(inv => inv.id === invitationId);
      if (invitation) {
        if (invitation.status !== 'pending') {
          throw new Error('Can only resend pending invitations');
        }

        // Update expiration date
        invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        invitation.metadata = {
          ...invitation.metadata,
          resent: true,
          resentAt: new Date().toISOString()
        };

        // Resend email
        await this.sendInvitationEmail(invitation);

        return invitation;
      }
    }

    return null;
  }

  private async sendInvitationEmail(invitation: TeamInvitation): Promise<void> {
    // In production, integrate with email service
    console.log(`Sending invitation email to ${invitation.email} for team ${invitation.teamName}`);
  }

  private async addUserToTeam(teamId: string, userId: string, role: string): Promise<void> {
    // In production, integrate with team service
    console.log(`Adding user ${userId} to team ${teamId} with role ${role}`);
  }

  async getInvitationStats(teamId: string): Promise<{
    total: number;
    pending: number;
    accepted: number;
    declined: number;
    expired: number;
    acceptanceRate: number;
  }> {
    const teamInvs = teamInvitations.get(teamId) || [];

    const stats = {
      total: teamInvs.length,
      pending: teamInvs.filter(inv => inv.status === 'pending').length,
      accepted: teamInvs.filter(inv => inv.status === 'accepted').length,
      declined: teamInvs.filter(inv => inv.status === 'declined').length,
      expired: teamInvs.filter(inv => inv.status === 'expired').length,
      acceptanceRate: 0
    };

    const responded = stats.accepted + stats.declined;
    if (responded > 0) {
      stats.acceptanceRate = (stats.accepted / responded) * 100;
    }

    return stats;
  }
}

const invitationService = new InvitationService();

// GET /api/admin/teams/invitations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const stats = searchParams.get('stats') === 'true';

    if (teamId) {
      // Get team invitations
      const teamInvitations = await invitationService.getTeamInvitations(teamId);

      const response: any = {
        invitations: teamInvitations,
        total: teamInvitations.length
      };

      if (stats) {
        response.stats = await invitationService.getInvitationStats(teamId);
      }

      return NextResponse.json(response);
    }

    // Get user's invitations
    const userEmail = session.user.email || 'john.doe@example.com';
    const userInvitations = await invitationService.getUserInvitations(userEmail);

    return NextResponse.json({
      invitations: userInvitations,
      total: userInvitations.length
    });
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invitations' },
      { status: 500 }
    );
  }
}

// POST /api/admin/teams/invitations
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.teamId || !data.teamName) {
      return NextResponse.json(
        { error: 'Team ID and name are required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const userName = session.user.name || 'Current User';

    // Check if batch invitation
    if (data.invitations && Array.isArray(data.invitations)) {
      const batchRequest = data as InviteBatchRequest;

      // Validate emails
      for (const inv of batchRequest.invitations) {
        if (!inv.email || !inv.email.includes('@')) {
          return NextResponse.json(
            { error: `Invalid email: ${inv.email}` },
            { status: 400 }
          );
        }
      }

      const createdInvitations = await invitationService.createBatchInvitations(
        batchRequest.teamId,
        data.teamName,
        userId,
        userName,
        batchRequest.invitations
      );

      return NextResponse.json({
        invitations: createdInvitations,
        message: `${createdInvitations.length} invitations sent successfully`
      }, { status: 201 });
    }

    // Single invitation
    if (!data.email || !data.role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      );
    }

    if (!data.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const invitation = await invitationService.createInvitation(
      data.teamId,
      data.teamName,
      userId,
      userName,
      {
        email: data.email,
        role: data.role,
        message: data.message,
        expiresInDays: data.expiresInDays
      }
    );

    return NextResponse.json({
      invitation,
      message: 'Invitation sent successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/teams/invitations/[id]
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { invitationId, action } = data;

    if (!invitationId || !action) {
      return NextResponse.json(
        { error: 'Invitation ID and action are required' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    let success = false;
    let message = '';

    switch (action) {
      case 'accept':
        success = await invitationService.acceptInvitation(invitationId, userId);
        message = 'Invitation accepted successfully';
        break;

      case 'decline':
        success = await invitationService.declineInvitation(invitationId);
        message = 'Invitation declined';
        break;

      case 'cancel':
        success = await invitationService.cancelInvitation(invitationId, userId);
        message = 'Invitation cancelled';
        break;

      case 'resend':
        const resent = await invitationService.resendInvitation(invitationId);
        success = resent !== null;
        message = 'Invitation resent successfully';
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to process invitation' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success, message });
  } catch (error: any) {
    console.error('Error processing invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process invitation' },
      { status: 400 }
    );
  }
}