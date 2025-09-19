'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  Shield,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'agent' | 'supervisor';
  department: string;
  status: 'active' | 'away' | 'offline';
  avatar?: string;
  joinedAt: string;
  stats: {
    activeTickets: number;
    resolvedToday: number;
    resolvedThisWeek: number;
    resolvedTotal: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    satisfaction: number;
    slaCompliance: number;
  };
  specialties: string[];
  availability: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
}

interface Department {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberCount: number;
}

export default function SupportTeamPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      // Mock data - replace with API call
      const mockTeamMembers: TeamMember[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@lessoncraftstudio.com',
          phone: '+1 234 567 8901',
          role: 'supervisor',
          department: 'Technical Support',
          status: 'active',
          joinedAt: '2023-06-15',
          stats: {
            activeTickets: 12,
            resolvedToday: 5,
            resolvedThisWeek: 23,
            resolvedTotal: 456,
            avgResponseTime: 15,
            avgResolutionTime: 120,
            satisfaction: 4.8,
            slaCompliance: 96
          },
          specialties: ['Technical Issues', 'API Integration', 'Billing'],
          availability: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' }
          }
        },
        {
          id: '2',
          name: 'Mike Wilson',
          email: 'mike@lessoncraftstudio.com',
          phone: '+1 234 567 8902',
          role: 'agent',
          department: 'Customer Success',
          status: 'active',
          joinedAt: '2023-09-20',
          stats: {
            activeTickets: 8,
            resolvedToday: 3,
            resolvedThisWeek: 18,
            resolvedTotal: 234,
            avgResponseTime: 20,
            avgResolutionTime: 150,
            satisfaction: 4.6,
            slaCompliance: 92
          },
          specialties: ['Onboarding', 'Feature Requests', 'Training'],
          availability: {
            monday: { start: '10:00', end: '18:00' },
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: { start: '10:00', end: '18:00' },
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '10:00', end: '18:00' }
          }
        },
        {
          id: '3',
          name: 'Emily Chen',
          email: 'emily@lessoncraftstudio.com',
          role: 'agent',
          department: 'Technical Support',
          status: 'away',
          joinedAt: '2024-01-10',
          stats: {
            activeTickets: 6,
            resolvedToday: 2,
            resolvedThisWeek: 15,
            resolvedTotal: 123,
            avgResponseTime: 25,
            avgResolutionTime: 180,
            satisfaction: 4.5,
            slaCompliance: 88
          },
          specialties: ['Bug Reports', 'Account Issues'],
          availability: {
            monday: { start: '08:00', end: '16:00' },
            tuesday: { start: '08:00', end: '16:00' },
            wednesday: { start: '08:00', end: '16:00' },
            thursday: { start: '08:00', end: '16:00' },
            friday: { start: '08:00', end: '16:00' }
          }
        }
      ];

      const mockDepartments: Department[] = [
        {
          id: '1',
          name: 'Technical Support',
          description: 'Handles technical issues and bug reports',
          leadId: '1',
          memberCount: 5
        },
        {
          id: '2',
          name: 'Customer Success',
          description: 'Focuses on customer onboarding and satisfaction',
          leadId: '2',
          memberCount: 3
        },
        {
          id: '3',
          name: 'Billing Support',
          description: 'Manages billing inquiries and payment issues',
          leadId: '1',
          memberCount: 2
        }
      ];

      setTeamMembers(mockTeamMembers);
      setDepartments(mockDepartments);
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast.error('Failed to load team data');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'away': return 'bg-yellow-100 text-yellow-700';
      case 'offline': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'supervisor': return 'bg-blue-100 text-blue-700';
      case 'agent': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-7 w-7" />
              Support Team
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your support team members and departments
            </p>
          </div>
          <button
            onClick={() => setShowAddMember(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Now</p>
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold">
                {Math.round(teamMembers.reduce((sum, m) => sum + m.stats.avgResponseTime, 0) / teamMembers.length)}m
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Satisfaction</p>
              <p className="text-2xl font-bold">
                {(teamMembers.reduce((sum, m) => sum + m.stats.satisfaction, 0) / teamMembers.length).toFixed(1)}
              </p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
            <option value="agent">Agent</option>
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Team Members Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.department}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Status and Role */}
                <div className="flex gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(member.role)}`}>
                    {member.role}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">Active Tickets</p>
                    <p className="text-lg font-semibold">{member.stats.activeTickets}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">Resolved Today</p>
                    <p className="text-lg font-semibold">{member.stats.resolvedToday}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">Response Time</p>
                    <p className="text-lg font-semibold">{member.stats.avgResponseTime}m</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">Satisfaction</p>
                    <p className="text-lg font-semibold">{member.stats.satisfaction}</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-2 border text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Department Overview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map(dept => {
            const lead = teamMembers.find(m => m.id === dept.leadId);
            return (
              <div key={dept.id} className="bg-white rounded-lg border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
                  </div>
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Lead:</span>
                    <span className="font-medium">{lead?.name || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Members:</span>
                    <span className="font-medium">{dept.memberCount}</span>
                  </div>
                </div>
                <button className="mt-4 w-full px-3 py-2 border text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  Manage Department
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}