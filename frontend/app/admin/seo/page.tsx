'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  Link,
  Share2,
  Settings,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Code,
  FileText,
  Image,
  Hash,
  Target,
  BarChart2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import {
  PageSEO,
  MetaTags,
  SEOAnalysis,
  SchemaMarkup,
  SocialMediaPost,
  MarketingCampaign,
  UTMParameters
} from '@/types/seo';
import {
  analyzeSEO,
  generateMetaTags,
  generateSchemaMarkup,
  generateUTMUrl,
  generateCanonicalUrl,
  calculateKeywordDensity
} from '@/lib/seo-utils';
import toast from 'react-hot-toast';

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageSEO | null>(null);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMetaEditor, setShowMetaEditor] = useState(false);
  const [showSchemaEditor, setShowSchemaEditor] = useState(false);
  const [showUTMBuilder, setShowUTMBuilder] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    try {
      setLoading(true);

      const [pagesRes, campaignsRes, socialRes] = await Promise.all([
        fetch('/api/admin/seo/pages'),
        fetch('/api/admin/marketing/campaigns'),
        fetch('/api/admin/marketing/social')
      ]);

      if (pagesRes.ok) {
        const data = await pagesRes.json();
        setPages(data);
      }

      if (campaignsRes.ok) {
        const data = await campaignsRes.json();
        setCampaigns(data);
      }

      if (socialRes.ok) {
        const data = await socialRes.json();
        setSocialPosts(data);
      }
    } catch (error) {
      console.error('Failed to load SEO data:', error);
      toast.error('Failed to load SEO data');
    } finally {
      setLoading(false);
    }
  };

  const analyzePage = async (page: PageSEO) => {
    setSelectedPage(page);

    // Mock analysis for demonstration
    const mockAnalysis = analyzeSEO({
      title: page.metaTags.title,
      description: page.metaTags.description,
      content: 'Sample content for analysis...',
      images: [{ alt: 'Test image', src: '/test.jpg' }],
      headings: ['h1: Main Heading', 'h2: Subheading'],
      url: page.url
    });

    setAnalysis(mockAnalysis);
  };

  const handleGenerateSitemap = async () => {
    try {
      const response = await fetch('/api/admin/seo/sitemap', {
        method: 'POST'
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Sitemap generated successfully');
      }
    } catch (error) {
      toast.error('Failed to generate sitemap');
    }
  };

  const handleGenerateRobots = async () => {
    try {
      const response = await fetch('/api/admin/seo/robots', {
        method: 'POST'
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Robots.txt generated successfully');
      }
    } catch (error) {
      toast.error('Failed to generate robots.txt');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
    toast.success('Copied to clipboard');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* SEO Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Overall SEO Score</span>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">82</div>
          <div className="text-sm text-green-600">+5 from last week</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Indexed Pages</span>
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">234</div>
          <div className="text-sm text-gray-600">of 256 total</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Critical Issues</span>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-red-600">3</div>
          <div className="text-sm text-gray-600">Needs attention</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Backlinks</span>
            <Link className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">1,234</div>
          <div className="text-sm text-green-600">+45 new</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleGenerateSitemap}
            className="p-4 border rounded-lg hover:bg-gray-50 text-left"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Generate Sitemap</h4>
            <p className="text-sm text-gray-600 mt-1">Create XML sitemap for search engines</p>
          </button>

          <button
            onClick={handleGenerateRobots}
            className="p-4 border rounded-lg hover:bg-gray-50 text-left"
          >
            <Settings className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Update Robots.txt</h4>
            <p className="text-sm text-gray-600 mt-1">Configure crawler access rules</p>
          </button>

          <button
            onClick={() => setShowSchemaEditor(true)}
            className="p-4 border rounded-lg hover:bg-gray-50 text-left"
          >
            <Code className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Schema Markup</h4>
            <p className="text-sm text-gray-600 mt-1">Add structured data to pages</p>
          </button>
        </div>
      </div>

      {/* Recent Issues */}
      {analysis && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent SEO Issues</h3>
          <div className="space-y-3">
            {analysis.issues.slice(0, 5).map(issue => (
              <div key={issue.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <AlertCircle className={`w-5 h-5 mt-0.5 ${
                  issue.severity === 'critical' ? 'text-red-600' :
                  issue.severity === 'high' ? 'text-orange-600' :
                  issue.severity === 'medium' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{issue.title}</span>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      issue.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      issue.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                  <p className="text-sm text-blue-600 mt-1">{issue.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Page SEO Management</h2>
        <button
          onClick={() => setShowMetaEditor(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Page
        </button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{page.url}</div>
                    <div className="text-xs text-gray-500">{page.lastModified}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {page.metaTags.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-sm font-medium ${
                      page.score && page.score >= 80 ? 'text-green-600' :
                      page.score && page.score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {page.score || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {page.indexable ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Indexed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Not Indexed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => analyzePage(page)}
                      className="p-1 text-blue-600 hover:text-blue-700"
                      title="Analyze"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPage(page);
                        setShowMetaEditor(true);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-700"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-600 hover:text-gray-700"
                      title="View Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analysis Results */}
      {analysis && selectedPage && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Analysis: {selectedPage.url}
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              analysis.score >= 80 ? 'bg-green-100 text-green-700' :
              analysis.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              Score: {analysis.score}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Issues ({analysis.issues.length})</h4>
              <div className="space-y-2">
                {analysis.issues.map(issue => (
                  <div key={issue.id} className="text-sm">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      issue.severity === 'critical' ? 'bg-red-500' :
                      issue.severity === 'high' ? 'bg-orange-500' :
                      issue.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    {issue.title}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Warnings ({analysis.warnings.length})</h4>
              <div className="space-y-2">
                {analysis.warnings.map(warning => (
                  <div key={warning.id} className="text-sm text-gray-600">
                    {warning.message}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Passed Checks</h4>
              <div className="space-y-2">
                {analysis.passedChecks.map((check, index) => (
                  <div key={index} className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {check}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      {/* UTM Builder */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">UTM Link Builder</h3>
        <UTMBuilder />
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.filter(c => c.status === 'active').map(campaign => (
            <div key={campaign.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
              {campaign.performance && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Impressions:</span>
                    <span className="ml-1 font-medium">{campaign.performance.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Clicks:</span>
                    <span className="ml-1 font-medium">{campaign.performance.clicks.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversions:</span>
                    <span className="ml-1 font-medium">{campaign.performance.conversions}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">ROI:</span>
                    <span className="ml-1 font-medium text-green-600">
                      {campaign.performance.roi.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Schedule */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Schedule</h3>
        <div className="space-y-3">
          {socialPosts.filter(p => p.status === 'scheduled').map(post => (
            <div key={post.id} className="flex items-center gap-4 p-3 border rounded">
              <div className={`p-2 rounded ${
                post.platform === 'facebook' ? 'bg-blue-100 text-blue-600' :
                post.platform === 'twitter' ? 'bg-sky-100 text-sky-600' :
                post.platform === 'instagram' ? 'bg-pink-100 text-pink-600' :
                post.platform === 'linkedin' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                <Share2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{post.platform}</div>
                <div className="text-sm text-gray-600 truncate">{post.content}</div>
              </div>
              <div className="text-sm text-gray-500">
                {post.scheduledAt && new Date(post.scheduledAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO & Marketing Tools</h1>
        <p className="text-gray-600">Optimize your content for search engines and manage marketing campaigns</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart2 },
            { id: 'pages', label: 'Page SEO', icon: FileText },
            { id: 'marketing', label: 'Marketing', icon: Target },
            { id: 'social', label: 'Social Media', icon: Share2 },
            { id: 'tools', label: 'Tools', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'pages' && renderPages()}
      {activeTab === 'marketing' && renderMarketing()}
    </div>
  );
}

// UTM Builder Component
function UTMBuilder() {
  const [url, setUrl] = useState('');
  const [utm, setUtm] = useState<UTMParameters>({
    source: '',
    medium: '',
    campaign: ''
  });
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerate = () => {
    if (!url || !utm.source || !utm.medium) {
      toast.error('URL, source, and medium are required');
      return;
    }

    const fullUrl = generateUTMUrl(url, utm);
    setGeneratedUrl(fullUrl);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL *
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://example.com/page"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Source *
          </label>
          <input
            type="text"
            value={utm.source}
            onChange={(e) => setUtm({ ...utm, source: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="google, facebook, newsletter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Medium *
          </label>
          <input
            type="text"
            value={utm.medium}
            onChange={(e) => setUtm({ ...utm, medium: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="cpc, email, social"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            value={utm.campaign || ''}
            onChange={(e) => setUtm({ ...utm, campaign: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="spring_sale, launch_2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Term
          </label>
          <input
            type="text"
            value={utm.term || ''}
            onChange={(e) => setUtm({ ...utm, term: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="keyword for paid search"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Content
          </label>
          <input
            type="text"
            value={utm.content || ''}
            onChange={(e) => setUtm({ ...utm, content: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="banner, textlink"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate URL
      </button>

      {generatedUrl && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Generated URL:</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl);
                toast.success('Copied to clipboard');
              }}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <div className="text-sm text-gray-900 break-all">{generatedUrl}</div>
        </div>
      )}
    </div>
  );
}