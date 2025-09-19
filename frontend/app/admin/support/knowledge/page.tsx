'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Folder,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  Hash,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  subcategory?: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'internal' | 'private';
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views: number;
  helpful: number;
  notHelpful: number;
  relatedArticles: string[];
  attachments?: string[];
  searchKeywords: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
  subcategories?: {
    id: string;
    name: string;
    articleCount: number;
  }[];
}

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVisibility, setSelectedVisibility] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchKnowledgeData();
  }, []);

  const fetchKnowledgeData = async () => {
    try {
      // Mock data - replace with API call
      const mockArticles: KnowledgeArticle[] = [
        {
          id: '1',
          title: 'Getting Started with LessonCraftStudio',
          slug: 'getting-started',
          content: 'Complete guide to getting started...',
          excerpt: 'Learn how to create your first worksheet with our step-by-step guide.',
          category: 'Getting Started',
          tags: ['beginner', 'tutorial', 'quickstart'],
          status: 'published',
          visibility: 'public',
          author: { id: '1', name: 'Sarah Johnson' },
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-11-25T14:30:00Z',
          publishedAt: '2024-01-16T09:00:00Z',
          views: 15234,
          helpful: 1456,
          notHelpful: 23,
          relatedArticles: ['2', '3'],
          searchKeywords: ['start', 'begin', 'first worksheet']
        },
        {
          id: '2',
          title: 'Advanced Worksheet Customization',
          slug: 'advanced-customization',
          content: 'Deep dive into customization options...',
          excerpt: 'Explore advanced features for customizing your worksheets.',
          category: 'Features',
          subcategory: 'Customization',
          tags: ['advanced', 'customization', 'features'],
          status: 'published',
          visibility: 'public',
          author: { id: '2', name: 'Mike Wilson' },
          createdAt: '2024-02-20T11:00:00Z',
          updatedAt: '2024-11-20T16:00:00Z',
          publishedAt: '2024-02-21T10:00:00Z',
          views: 8976,
          helpful: 876,
          notHelpful: 15,
          relatedArticles: ['1', '4'],
          searchKeywords: ['customize', 'advanced', 'templates']
        },
        {
          id: '3',
          title: 'Troubleshooting PDF Downloads',
          slug: 'troubleshoot-pdf',
          content: 'Common issues and solutions for PDF downloads...',
          excerpt: 'Fix common PDF download issues with these solutions.',
          category: 'Troubleshooting',
          tags: ['pdf', 'download', 'issues'],
          status: 'published',
          visibility: 'public',
          author: { id: '1', name: 'Sarah Johnson' },
          createdAt: '2024-03-10T09:00:00Z',
          updatedAt: '2024-11-15T10:00:00Z',
          publishedAt: '2024-03-10T09:30:00Z',
          views: 5432,
          helpful: 423,
          notHelpful: 8,
          relatedArticles: ['5'],
          searchKeywords: ['pdf', 'download', 'error', 'problem']
        },
        {
          id: '4',
          title: 'Internal: Support Escalation Process',
          slug: 'escalation-process',
          content: 'How to properly escalate support tickets...',
          excerpt: 'Guidelines for escalating support tickets to higher tiers.',
          category: 'Internal Docs',
          tags: ['internal', 'process', 'escalation'],
          status: 'published',
          visibility: 'internal',
          author: { id: '1', name: 'Sarah Johnson' },
          createdAt: '2024-04-05T14:00:00Z',
          updatedAt: '2024-10-30T11:00:00Z',
          publishedAt: '2024-04-05T14:30:00Z',
          views: 234,
          helpful: 45,
          notHelpful: 2,
          relatedArticles: [],
          searchKeywords: ['escalate', 'tier 2', 'supervisor']
        }
      ];

      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Getting Started',
          slug: 'getting-started',
          description: 'Essential guides for new users',
          icon: 'rocket',
          articleCount: 12,
          subcategories: [
            { id: '1-1', name: 'First Steps', articleCount: 5 },
            { id: '1-2', name: 'Account Setup', articleCount: 7 }
          ]
        },
        {
          id: '2',
          name: 'Features',
          slug: 'features',
          description: 'Detailed feature documentation',
          icon: 'star',
          articleCount: 45,
          subcategories: [
            { id: '2-1', name: 'Worksheets', articleCount: 20 },
            { id: '2-2', name: 'Customization', articleCount: 15 },
            { id: '2-3', name: 'Export Options', articleCount: 10 }
          ]
        },
        {
          id: '3',
          name: 'Troubleshooting',
          slug: 'troubleshooting',
          description: 'Solutions to common problems',
          icon: 'wrench',
          articleCount: 23
        },
        {
          id: '4',
          name: 'Internal Docs',
          slug: 'internal',
          description: 'Internal team documentation',
          icon: 'shield',
          articleCount: 8
        }
      ];

      setArticles(mockArticles);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching knowledge data:', error);
      toast.error('Failed to load knowledge base');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    const matchesVisibility = selectedVisibility === 'all' || article.visibility === selectedVisibility;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'views':
        return b.views - a.views;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Eye className="h-4 w-4 text-green-600" />;
      case 'internal': return <Users className="h-4 w-4 text-blue-600" />;
      case 'private': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-7 w-7" />
              Knowledge Base
            </h1>
            <p className="text-gray-600 mt-1">
              Manage help articles and documentation
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/support/knowledge/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Article
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold">{articles.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                {articles.filter(a => a.status === 'published').length} published
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">
                {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Helpful Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (articles.reduce((sum, a) => sum + a.helpful, 0) /
                    (articles.reduce((sum, a) => sum + a.helpful + a.notHelpful, 0) || 1)) * 100
                )}%
              </p>
              <p className="text-xs text-gray-500 mt-1">User feedback</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold">{categories.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                {categories.reduce((sum, c) => sum + c.articleCount, 0)} articles
              </p>
            </div>
            <Folder className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`p-3 rounded-lg border text-left hover:bg-gray-50 transition-colors ${
                selectedCategory === category.name ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-500">{category.articleCount}</span>
              </div>
              <p className="text-xs text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search articles..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="private">Private</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="updated">Recently Updated</option>
            <option value="views">Most Viewed</option>
            <option value="helpful">Most Helpful</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedArticles.map(article => (
            <div key={article.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        <button onClick={() => router.push(`/admin/support/knowledge/${article.id}`)}>
                          {article.title}
                        </button>
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                      {getVisibilityIcon(article.visibility)}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <Folder className="inline h-3 w-3 mr-1" />
                        {article.category}
                        {article.subcategory && ` / ${article.subcategory}`}
                      </span>
                      <span className="text-gray-500">
                        <Eye className="inline h-3 w-3 mr-1" />
                        {article.views.toLocaleString()} views
                      </span>
                      <span className="text-gray-500">
                        <Star className="inline h-3 w-3 mr-1" />
                        {article.helpful} helpful
                      </span>
                      <span className="text-gray-500">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Updated {new Date(article.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      {article.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/admin/support/knowledge/${article.id}/edit`)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedArticles.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No articles found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or create a new article</p>
        </div>
      )}
    </div>
  );
}