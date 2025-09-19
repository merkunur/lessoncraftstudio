'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  Send,
  Code,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Zap,
  Users,
  ShoppingBag,
  UserPlus,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'transactional' | 'marketing' | 'system';
  type: string;
  status: 'active' | 'draft' | 'archived';
  htmlContent: string;
  textContent: string;
  variables: string[];
  tags: string[];
  sentCount: number;
  openRate: number;
  clickRate: number;
  lastModified: string;
  lastSent?: string;
  createdBy: string;
  previewImage?: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  icon: any;
  templates: string[];
  description: string;
}

export default function EmailTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const categories: TemplateCategory[] = [
    {
      id: 'welcome',
      name: 'Welcome',
      icon: UserPlus,
      templates: ['welcome-email', 'onboarding-series'],
      description: 'New user welcome and onboarding emails'
    },
    {
      id: 'transaction',
      name: 'Transactions',
      icon: CreditCard,
      templates: ['payment-success', 'payment-failed', 'invoice'],
      description: 'Payment and billing notifications'
    },
    {
      id: 'account',
      name: 'Account',
      icon: Users,
      templates: ['password-reset', 'email-verification', 'account-update'],
      description: 'Account management and security'
    },
    {
      id: 'worksheet',
      name: 'Worksheets',
      icon: FileText,
      templates: ['worksheet-created', 'worksheet-shared', 'worksheet-reminder'],
      description: 'Worksheet activity notifications'
    },
    {
      id: 'support',
      name: 'Support',
      icon: HelpCircle,
      templates: ['ticket-created', 'ticket-reply', 'ticket-resolved'],
      description: 'Support ticket communications'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Zap,
      templates: ['newsletter', 'product-update', 'promotion'],
      description: 'Marketing campaigns and updates'
    }
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      // Mock data - replace with API call
      const mockTemplates: EmailTemplate[] = [
        {
          id: '1',
          name: 'Welcome Email',
          subject: 'Welcome to LessonCraftStudio, {{firstName}}!',
          category: 'transactional',
          type: 'welcome-email',
          status: 'active',
          htmlContent: '<html>...</html>',
          textContent: 'Welcome to LessonCraftStudio...',
          variables: ['firstName', 'email', 'activationLink'],
          tags: ['welcome', 'onboarding', 'new-user'],
          sentCount: 1234,
          openRate: 78.5,
          clickRate: 45.2,
          lastModified: '2024-11-25T10:00:00Z',
          lastSent: '2024-11-28T14:30:00Z',
          createdBy: 'Sarah Johnson'
        },
        {
          id: '2',
          name: 'Payment Success',
          subject: 'Payment Confirmed - Thank you!',
          category: 'transactional',
          type: 'payment-success',
          status: 'active',
          htmlContent: '<html>...</html>',
          textContent: 'Your payment has been processed...',
          variables: ['customerName', 'amount', 'invoiceNumber', 'date'],
          tags: ['payment', 'billing', 'confirmation'],
          sentCount: 856,
          openRate: 92.3,
          clickRate: 23.1,
          lastModified: '2024-11-20T09:00:00Z',
          lastSent: '2024-11-28T12:00:00Z',
          createdBy: 'Mike Wilson'
        },
        {
          id: '3',
          name: 'Password Reset',
          subject: 'Reset Your Password',
          category: 'system',
          type: 'password-reset',
          status: 'active',
          htmlContent: '<html>...</html>',
          textContent: 'You requested a password reset...',
          variables: ['userName', 'resetLink', 'expiryTime'],
          tags: ['security', 'account', 'password'],
          sentCount: 432,
          openRate: 85.7,
          clickRate: 62.4,
          lastModified: '2024-11-15T11:00:00Z',
          lastSent: '2024-11-28T08:00:00Z',
          createdBy: 'Sarah Johnson'
        },
        {
          id: '4',
          name: 'Monthly Newsletter',
          subject: '{{month}} Updates from LessonCraftStudio',
          category: 'marketing',
          type: 'newsletter',
          status: 'draft',
          htmlContent: '<html>...</html>',
          textContent: 'Here\'s what\'s new this month...',
          variables: ['month', 'userName', 'featuredWorksheets'],
          tags: ['newsletter', 'updates', 'marketing'],
          sentCount: 0,
          openRate: 0,
          clickRate: 0,
          lastModified: '2024-11-28T16:00:00Z',
          createdBy: 'Emily Chen'
        },
        {
          id: '5',
          name: 'Worksheet Created',
          subject: 'Your worksheet "{{worksheetName}}" is ready!',
          category: 'transactional',
          type: 'worksheet-created',
          status: 'active',
          htmlContent: '<html>...</html>',
          textContent: 'Your worksheet has been created...',
          variables: ['userName', 'worksheetName', 'worksheetLink', 'thumbnailUrl'],
          tags: ['worksheet', 'notification', 'activity'],
          sentCount: 3456,
          openRate: 67.8,
          clickRate: 52.3,
          lastModified: '2024-11-10T14:00:00Z',
          lastSent: '2024-11-28T15:45:00Z',
          createdBy: 'Mike Wilson'
        }
      ];

      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load email templates');
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.type.includes(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transactional': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'marketing': return <Users className="h-4 w-4 text-purple-500" />;
      case 'system': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleDuplicate = async (template: EmailTemplate) => {
    try {
      toast.success(`Duplicated "${template.name}"`);
      // In production, create a copy via API
    } catch (error) {
      toast.error('Failed to duplicate template');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        setTemplates(templates.filter(t => t.id !== id));
        toast.success('Template deleted');
      } catch (error) {
        toast.error('Failed to delete template');
      }
    }
  };

  const handleTestSend = async (template: EmailTemplate) => {
    const testEmail = prompt('Enter email address for test:');
    if (testEmail) {
      try {
        // In production, send test email via API
        toast.success(`Test email sent to ${testEmail}`);
      } catch (error) {
        toast.error('Failed to send test email');
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="h-7 w-7" />
              Email Templates
            </h1>
            <p className="text-gray-600 mt-1">
              Manage transactional and marketing email templates
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/communications/email-templates/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Template
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold">{templates.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                {templates.filter(t => t.status === 'active').length} active
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Sent</p>
              <p className="text-2xl font-bold">
                {templates.reduce((sum, t) => sum + t.sentCount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Send className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Open Rate</p>
              <p className="text-2xl font-bold">
                {templates.length > 0 ? 
                  (templates.reduce((sum, t) => sum + t.openRate, 0) / templates.length).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">All templates</p>
            </div>
            <Eye className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Click Rate</p>
              <p className="text-2xl font-bold">
                {templates.length > 0 ?
                  (templates.reduce((sum, t) => sum + t.clickRate, 0) / templates.length).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">All templates</p>
            </div>
            <Zap className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border text-center hover:bg-gray-50 transition-colors ${
                  selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <Icon className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">{category.name}</p>
                <p className="text-xs text-gray-500">
                  {templates.filter(t => category.templates.includes(t.type)).length} templates
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search templates..."
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
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              {/* Template Preview Image */}
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mail className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  {getCategoryIcon(template.category)}
                </div>
              </div>

              <div className="p-4">
                {/* Template Info */}
                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3 truncate">{template.subject}</p>

                {/* Variables */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.variables.slice(0, 3).map((variable, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                  {template.variables.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{template.variables.length - 3} more
                    </span>
                  )}
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Sent</p>
                    <p className="font-semibold text-sm">{template.sentCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Open</p>
                    <p className="font-semibold text-sm">{template.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Click</p>
                    <p className="font-semibold text-sm">{template.clickRate}%</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(template.lastModified).toLocaleDateString()}
                  </span>
                  {template.lastSent && (
                    <span className="flex items-center">
                      <Send className="h-3 w-3 mr-1" />
                      Last sent {new Date(template.lastSent).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/communications/email-templates/${template.id}/edit`)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowPreview(true);
                    }}
                    className="px-3 py-2 border text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <div className="relative">
                    <button className="px-3 py-2 border text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No templates found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or create a new template</p>
        </div>
      )}
    </div>
  );
}