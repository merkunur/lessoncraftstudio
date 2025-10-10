'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Plus,
  Search,
  Filter,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Play,
  Pause,
  StopCircle,
  Copy,
  Trash2,
  MoreVertical,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  templateId: string;
  templateName: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  type: 'immediate' | 'scheduled' | 'automated' | 'drip';
  audienceSize: number;
  audienceSegment?: string;
  scheduledFor?: string;
  sentAt?: string;
  completedAt?: string;
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
    complained: number;
  };
  performance: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
    bounceRate: number;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CampaignSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
}

export default function EmailCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [segments, setSegments] = useState<CampaignSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('created');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Mock data - replace with API call
      const mockCampaigns: EmailCampaign[] = [
        {
          id: '1',
          name: 'Black Friday Sale 2024',
          subject: '🎁 Black Friday: Save 50% on All Plans!',
          templateId: 'tpl_1',
          templateName: 'Promotional Template',
          status: 'sent',
          type: 'immediate',
          audienceSize: 15234,
          audienceSegment: 'All Active Users',
          sentAt: '2024-11-24T09:00:00Z',
          completedAt: '2024-11-24T09:45:00Z',
          stats: {
            sent: 15234,
            delivered: 14876,
            opened: 10234,
            clicked: 3456,
            unsubscribed: 45,
            bounced: 358,
            complained: 5
          },
          performance: {
            deliveryRate: 97.7,
            openRate: 68.8,
            clickRate: 23.2,
            unsubscribeRate: 0.3,
            bounceRate: 2.3
          },
          createdBy: 'Sarah Johnson',
          createdAt: '2024-11-20T10:00:00Z',
          updatedAt: '2024-11-24T09:45:00Z'
        },
        {
          id: '2',
          name: 'Welcome Series - Email 1',
          subject: 'Welcome to LessonCraftStudio, {{firstName}}!',
          templateId: 'tpl_2',
          templateName: 'Welcome Template',
          status: 'sending',
          type: 'automated',
          audienceSize: 456,
          audienceSegment: 'New Users (Last 7 Days)',
          sentAt: '2024-11-28T00:00:00Z',
          stats: {
            sent: 234,
            delivered: 228,
            opened: 189,
            clicked: 98,
            unsubscribed: 2,
            bounced: 6,
            complained: 0
          },
          performance: {
            deliveryRate: 97.4,
            openRate: 82.9,
            clickRate: 43.0,
            unsubscribeRate: 0.9,
            bounceRate: 2.6
          },
          createdBy: 'Mike Wilson',
          createdAt: '2024-11-01T14:00:00Z',
          updatedAt: '2024-11-28T14:00:00Z'
        },
        {
          id: '3',
          name: 'December Newsletter',
          subject: 'December Updates: New Features & Tips',
          templateId: 'tpl_3',
          templateName: 'Newsletter Template',
          status: 'scheduled',
          type: 'scheduled',
          audienceSize: 12456,
          audienceSegment: 'Newsletter Subscribers',
          scheduledFor: '2024-12-01T10:00:00Z',
          stats: {
            sent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            unsubscribed: 0,
            bounced: 0,
            complained: 0
          },
          performance: {
            deliveryRate: 0,
            openRate: 0,
            clickRate: 0,
            unsubscribeRate: 0,
            bounceRate: 0
          },
          createdBy: 'Emily Chen',
          createdAt: '2024-11-25T16:00:00Z',
          updatedAt: '2024-11-25T16:00:00Z'
        },
        {
          id: '4',
          name: 'Re-engagement Campaign',
          subject: 'We miss you! Here\'s what you\'ve been missing...',
          templateId: 'tpl_4',
          templateName: 'Re-engagement Template',
          status: 'draft',
          type: 'immediate',
          audienceSize: 3456,
          audienceSegment: 'Inactive Users (60+ Days)',
          stats: {
            sent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            unsubscribed: 0,
            bounced: 0,
            complained: 0
          },
          performance: {
            deliveryRate: 0,
            openRate: 0,
            clickRate: 0,
            unsubscribeRate: 0,
            bounceRate: 0
          },
          createdBy: 'Sarah Johnson',
          createdAt: '2024-11-28T11:00:00Z',
          updatedAt: '2024-11-28T11:00:00Z'
        },
        {
          id: '5',
          name: 'Feature Update - Math Tools',
          subject: 'New: Advanced Math Worksheet Tools',
          templateId: 'tpl_5',
          templateName: 'Product Update Template',
          status: 'paused',
          type: 'immediate',
          audienceSize: 8956,
          audienceSegment: 'Pro Users',
          sentAt: '2024-11-27T14:00:00Z',
          stats: {
            sent: 4567,
            delivered: 4456,
            opened: 2234,
            clicked: 567,
            unsubscribed: 12,
            bounced: 111,
            complained: 2
          },
          performance: {
            deliveryRate: 97.6,
            openRate: 50.1,
            clickRate: 12.7,
            unsubscribeRate: 0.3,
            bounceRate: 2.4
          },
          createdBy: 'Mike Wilson',
          createdAt: '2024-11-27T10:00:00Z',
          updatedAt: '2024-11-27T15:30:00Z'
        }
      ];

      const mockSegments: CampaignSegment[] = [
        {
          id: '1',
          name: 'All Active Users',
          description: 'Users who have been active in the last 30 days',
          size: 15234,
          conditions: [
            { field: 'last_active', operator: 'within', value: '30 days' },
            { field: 'status', operator: 'equals', value: 'active' }
          ]
        },
        {
          id: '2',
          name: 'Newsletter Subscribers',
          description: 'Users opted-in to newsletter',
          size: 12456,
          conditions: [
            { field: 'preferences.newsletter', operator: 'equals', value: true }
          ]
        },
        {
          id: '3',
          name: 'Pro Users',
          description: 'Users on Pro plan',
          size: 8956,
          conditions: [
            { field: 'subscription.plan', operator: 'equals', value: 'pro' }
          ]
        }
      ];

      setCampaigns(mockCampaigns);
      setSegments(mockSegments);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    const matchesType = selectedType === 'all' || campaign.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'sent':
        return new Date(b.sentAt || b.scheduledFor || b.createdAt).getTime() - 
               new Date(a.sentAt || a.scheduledFor || a.createdAt).getTime();
      case 'performance':
        return b.performance.openRate - a.performance.openRate;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700';
      case 'sending': return 'bg-blue-100 text-blue-700';
      case 'scheduled': return 'bg-purple-100 text-purple-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'sending': return <Send className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'draft': return <AlertCircle className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleDuplicate = async (campaign: EmailCampaign) => {
    try {
      toast.success(`Duplicated "${campaign.name}"`);
      // In production, duplicate via API
    } catch (error) {
      toast.error('Failed to duplicate campaign');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        setCampaigns(campaigns.filter(c => c.id !== id));
        toast.success('Campaign deleted');
      } catch (error) {
        toast.error('Failed to delete campaign');
      }
    }
  };

  const handlePause = async (campaign: EmailCampaign) => {
    try {
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, status: 'paused' } : c
      ));
      toast.success('Campaign paused');
    } catch (error) {
      toast.error('Failed to pause campaign');
    }
  };

  const handleResume = async (campaign: EmailCampaign) => {
    try {
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, status: 'sending' } : c
      ));
      toast.success('Campaign resumed');
    } catch (error) {
      toast.error('Failed to resume campaign');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="h-7 w-7" />
              Email Campaigns
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage email marketing campaigns
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/communications/campaigns/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold">
                {campaigns.filter(c => ['sending', 'scheduled'].includes(c.status)).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Currently running</p>
            </div>
            <Send className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold">
                {campaigns.reduce((sum, c) => sum + c.stats.sent, 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <Mail className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Open Rate</p>
              <p className="text-2xl font-bold">
                {campaigns.filter(c => c.stats.sent > 0).length > 0 ?
                  (campaigns.filter(c => c.stats.sent > 0)
                    .reduce((sum, c) => sum + c.performance.openRate, 0) / 
                    campaigns.filter(c => c.stats.sent > 0).length).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">All campaigns</p>
            </div>
            <Eye className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Click Rate</p>
              <p className="text-2xl font-bold">
                {campaigns.filter(c => c.stats.sent > 0).length > 0 ?
                  (campaigns.filter(c => c.stats.sent > 0)
                    .reduce((sum, c) => sum + c.performance.clickRate, 0) / 
                    campaigns.filter(c => c.stats.sent > 0).length).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">All campaigns</p>
            </div>
            <MousePointer className="h-8 w-8 text-orange-500" />
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
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sending">Sending</option>
            <option value="sent">Sent</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="immediate">Immediate</option>
            <option value="scheduled">Scheduled</option>
            <option value="automated">Automated</option>
            <option value="drip">Drip</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created">Recently Created</option>
            <option value="sent">Recently Sent</option>
            <option value="performance">Best Performance</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Campaign Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        {campaign.status}
                      </span>
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                        {campaign.type}
                      </span>
                    </div>

                    {/* Subject Line */}
                    <p className="text-sm text-gray-600 mb-3">{campaign.subject}</p>

                    {/* Campaign Info */}
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {campaign.audienceSize.toLocaleString()} recipients
                      </span>
                      <span>{campaign.audienceSegment}</span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {campaign.templateName}
                      </span>
                      {campaign.sentAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Sent {new Date(campaign.sentAt).toLocaleDateString()}
                        </span>
                      )}
                      {campaign.scheduledFor && campaign.status === 'scheduled' && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Scheduled for {new Date(campaign.scheduledFor).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Performance Metrics */}
                    {campaign.stats.sent > 0 && (
                      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="font-semibold">{campaign.stats.sent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Delivered</p>
                          <p className="font-semibold">
                            {campaign.stats.delivered.toLocaleString()}
                            <span className="text-xs text-gray-500 ml-1">({campaign.performance.deliveryRate}%)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Opened</p>
                          <p className="font-semibold">
                            {campaign.stats.opened.toLocaleString()}
                            <span className="text-xs text-gray-500 ml-1">({campaign.performance.openRate}%)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicked</p>
                          <p className="font-semibold">
                            {campaign.stats.clicked.toLocaleString()}
                            <span className="text-xs text-gray-500 ml-1">({campaign.performance.clickRate}%)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Unsubscribed</p>
                          <p className="font-semibold">
                            {campaign.stats.unsubscribed}
                            <span className="text-xs text-gray-500 ml-1">({campaign.performance.unsubscribeRate}%)</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bounced</p>
                          <p className="font-semibold">
                            {campaign.stats.bounced}
                            <span className="text-xs text-gray-500 ml-1">({campaign.performance.bounceRate}%)</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {campaign.status === 'sending' && (
                      <button
                        onClick={() => handlePause(campaign)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                    )}
                    {campaign.status === 'paused' && (
                      <button
                        onClick={() => handleResume(campaign)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                    {campaign.status === 'draft' && (
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        Send
                      </button>
                    )}
                    <button
                      onClick={() => router.push(`/admin/communications/campaigns/${campaign.id}`)}
                      className="px-3 py-1 border text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                    >
                      View
                    </button>
                    <div className="relative">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedCampaigns.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No campaigns found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or create a new campaign</p>
        </div>
      )}
    </div>
  );
}