'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Settings,
  Search,
  UserPlus,
  Shield,
  FolderOpen,
  Activity,
  MoreVertical,
  Edit3,
  Trash2,
  LogOut,
  Crown,
  Star,
  Lock,
  Unlock,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  FileText,
  Share2,
  Globe,
  Eye,
  Copy,
  ExternalLink,
  UserCheck,
  UserX,
  Building,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

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
  memberCount: number;
  resourceCount: number;
  createdAt: string;
  updatedAt: string;
  settings: {
    allowMemberInvites: boolean;
    requireApproval: boolean;
    autoApproveEducators: boolean;
    defaultRole: 'viewer' | 'member' | 'editor';
    resourceSharing: 'none' | 'view' | 'edit' | 'full';
    activityTracking: boolean;
    emailNotifications: boolean;
  };
  subscription: {
    plan: 'free' | 'team' | 'enterprise';
    seats: number;
    usedSeats: number;
    validUntil?: string;
  };
  stats: {
    totalWorksheets: number;
    totalDownloads: number;
    activeMembers: number;
    storageUsed: number;
    lastActivity: string;
  };
}

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  lastActive?: string;
  permissions: string[];
  contribution: {
    worksheetsCreated: number;
    filesShared: number;
    commentsAdded: number;
  };
}

interface Invitation {
  id: string;
  teamId: string;
  teamName: string;
  email: string;
  role: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  message?: string;
}

export default function TeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-teams' | 'invitations' | 'discover'>('my-teams');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    fetchTeams();
    fetchInvitations();
  }, []);

  const fetchTeams = async () => {
    try {
      // Mock teams data
      const mockTeams: Team[] = [
        {
          id: 'team_1',
          name: 'Math Department',
          description: 'Collaborative workspace for math teachers to share and create educational resources',
          slug: 'math-dept',
          avatar: 'https://i.pravatar.cc/150?img=10',
          coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
          type: 'education',
          visibility: 'private',
          ownerId: 'user_1',
          ownerName: 'John Doe',
          memberCount: 12,
          resourceCount: 156,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-11-28T15:00:00Z',
          settings: {
            allowMemberInvites: true,
            requireApproval: false,
            autoApproveEducators: true,
            defaultRole: 'member',
            resourceSharing: 'edit',
            activityTracking: true,
            emailNotifications: true
          },
          subscription: {
            plan: 'team',
            seats: 20,
            usedSeats: 12,
            validUntil: '2024-12-31T23:59:59Z'
          },
          stats: {
            totalWorksheets: 234,
            totalDownloads: 1567,
            activeMembers: 8,
            storageUsed: 2.3 * 1024 * 1024 * 1024,
            lastActivity: '2024-11-28T14:30:00Z'
          }
        },
        {
          id: 'team_2',
          name: 'Elementary Science',
          description: 'Resources and worksheets for K-5 science education',
          slug: 'elem-science',
          avatar: 'https://i.pravatar.cc/150?img=11',
          type: 'education',
          visibility: 'public',
          ownerId: 'user_2',
          ownerName: 'Jane Smith',
          memberCount: 25,
          resourceCount: 312,
          createdAt: '2024-03-20T09:00:00Z',
          updatedAt: '2024-11-27T10:00:00Z',
          settings: {
            allowMemberInvites: false,
            requireApproval: true,
            autoApproveEducators: false,
            defaultRole: 'viewer',
            resourceSharing: 'view',
            activityTracking: true,
            emailNotifications: false
          },
          subscription: {
            plan: 'free',
            seats: 5,
            usedSeats: 5
          },
          stats: {
            totalWorksheets: 456,
            totalDownloads: 3421,
            activeMembers: 15,
            storageUsed: 4.5 * 1024 * 1024 * 1024,
            lastActivity: '2024-11-28T09:15:00Z'
          }
        },
        {
          id: 'team_3',
          name: 'Parent Resource Group',
          description: 'Homeschooling parents sharing educational materials',
          slug: 'parent-resources',
          avatar: 'https://i.pravatar.cc/150?img=12',
          type: 'personal',
          visibility: 'invite-only',
          ownerId: 'user_1',
          ownerName: 'John Doe',
          memberCount: 8,
          resourceCount: 67,
          createdAt: '2024-06-01T12:00:00Z',
          updatedAt: '2024-11-25T18:00:00Z',
          settings: {
            allowMemberInvites: true,
            requireApproval: true,
            autoApproveEducators: false,
            defaultRole: 'member',
            resourceSharing: 'full',
            activityTracking: false,
            emailNotifications: true
          },
          subscription: {
            plan: 'free',
            seats: 10,
            usedSeats: 8
          },
          stats: {
            totalWorksheets: 89,
            totalDownloads: 234,
            activeMembers: 6,
            storageUsed: 0.8 * 1024 * 1024 * 1024,
            lastActivity: '2024-11-26T20:00:00Z'
          }
        }
      ];

      setTeams(mockTeams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async () => {
    try {
      // Mock invitations
      const mockInvitations: Invitation[] = [
        {
          id: 'inv_1',
          teamId: 'team_4',
          teamName: 'History Teachers Network',
          email: 'john.doe@example.com',
          role: 'editor',
          invitedBy: 'Sarah Wilson',
          invitedAt: '2024-11-26T10:00:00Z',
          expiresAt: '2024-12-03T10:00:00Z',
          status: 'pending',
          message: 'Would love to have you join our history resources team!'
        },
        {
          id: 'inv_2',
          teamId: 'team_5',
          teamName: 'STEM Educators',
          email: 'john.doe@example.com',
          role: 'member',
          invitedBy: 'Mike Johnson',
          invitedAt: '2024-11-24T14:00:00Z',
          expiresAt: '2024-12-01T14:00:00Z',
          status: 'pending'
        }
      ];

      setInvitations(mockInvitations);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleCreateTeam = () => {
    setShowCreateModal(true);
  };

  const handleJoinTeam = (teamId: string) => {
    router.push(`/admin/teams/${teamId}`);
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Invitation accepted! Joining team...');
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    } catch (error) {
      toast.error('Failed to accept invitation');
    }
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Invitation declined');
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    } catch (error) {
      toast.error('Failed to decline invitation');
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4" />;
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'editor':
        return <Edit3 className="w-4 h-4" />;
      case 'member':
        return <Users className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'business':
        return <Briefcase className="w-5 h-5" />;
      case 'nonprofit':
        return <Building className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teams & Collaboration</h1>
              <p className="text-gray-600 mt-1">Manage your teams and collaborative workspaces</p>
            </div>
            <button
              onClick={handleCreateTeam}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Team
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b -mb-px">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('my-teams')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'my-teams'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Teams ({teams.length})
              </button>
              <button
                onClick={() => setActiveTab('invitations')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === 'invitations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Invitations
                {invitations.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                    {invitations.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'discover'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Discover Teams
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* My Teams Tab */}
        {activeTab === 'my-teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map(team => (
              <div
                key={team.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleJoinTeam(team.id)}
              >
                {/* Team Header */}
                <div className="relative h-32">
                  {team.coverImage ? (
                    <img
                      src={team.coverImage}
                      alt={team.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg" />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg" />
                  <div className="absolute top-4 left-4">
                    <img
                      src={team.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=random`}
                      alt={team.name}
                      className="w-16 h-16 rounded-lg border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {getVisibilityIcon(team.visibility)}
                    {getTypeIcon(team.type)}
                  </div>
                </div>

                {/* Team Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold">{team.memberCount}</p>
                      <p className="text-xs text-gray-600">Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{team.resourceCount}</p>
                      <p className="text-xs text-gray-600">Resources</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{team.stats.activeMembers}</p>
                      <p className="text-xs text-gray-600">Active</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{team.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {new Date(team.stats.lastActivity).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Subscription Badge */}
                  {team.subscription.plan !== 'free' && (
                    <div className="mt-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded">
                        {team.subscription.plan.toUpperCase()} PLAN
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredTeams.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams yet</h3>
                <p className="text-gray-600 mb-4">Create your first team to start collaborating</p>
                <button
                  onClick={handleCreateTeam}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Team
                </button>
              </div>
            )}
          </div>
        )}

        {/* Invitations Tab */}
        {activeTab === 'invitations' && (
          <div className="space-y-4">
            {invitations.map(invitation => (
              <div key={invitation.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{invitation.teamName}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {invitation.role}
                      </span>
                    </div>
                    {invitation.message && (
                      <p className="text-gray-600 mb-3">{invitation.message}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <UserPlus className="w-4 h-4" />
                        Invited by {invitation.invitedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(invitation.invitedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineInvitation(invitation.id)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {invitations.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending invitations</h3>
                <p className="text-gray-600">You'll see team invitations here when you receive them</p>
              </div>
            )}
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Public Teams */}
            {teams
              .filter(team => team.visibility === 'public')
              .map(team => (
                <div
                  key={team.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img
                        src={team.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}`}
                        alt={team.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Public
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {team.memberCount} members
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {team.resourceCount} resources
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Join Team
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Create New Team</h2>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Math Department"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your team's purpose..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Type
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="education">Education</option>
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                      <option value="nonprofit">Nonprofit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="invite-only">Invite Only</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Team created successfully!');
                  setShowCreateModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}