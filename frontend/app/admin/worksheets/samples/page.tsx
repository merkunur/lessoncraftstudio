'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Edit,
  Trash2,
  Eye,
  Download,
  Star,
  Search,
  Filter,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface Sample {
  id: string;
  appName: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  fileUrl: string;
  category: string | null;
  difficulty: string | null;
  ageRange: string | null;
  featured: boolean;
  sortOrder: number;
  viewsCount: number;
  downloadsCount: number;
  createdAt: string;
}

export default function SamplesPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [appFilter, setAppFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    title: '',
    description: '',
    category: '',
    difficulty: '',
    ageRange: '',
    featured: false,
  });

  useEffect(() => {
    fetchSamples();
  }, [appFilter, difficultyFilter]);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(appFilter && { app: appFilter }),
        ...(difficultyFilter && { difficulty: difficultyFilter }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(`/api/admin/worksheets/samples?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch samples');

      const data = await response.json();
      setSamples(data.samples);
    } catch (error) {
      toast.error('Failed to load samples');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sample?')) return;

    try {
      const response = await fetch(`/api/admin/worksheets/samples/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete sample');

      toast.success('Sample deleted successfully');
      fetchSamples();
    } catch (error) {
      toast.error('Failed to delete sample');
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/worksheets/samples/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (!response.ok) throw new Error('Failed to update sample');

      toast.success('Sample updated');
      fetchSamples();
    } catch (error) {
      toast.error('Failed to update sample');
    }
  };

  const getDifficultyBadge = (difficulty: string | null) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    const badges: Record<string, string> = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
    };
    return badges[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sample Worksheets</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage sample worksheets displayed on the website
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Sample
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search samples..."
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                App
              </label>
              <select
                value={appFilter}
                onChange={(e) => setAppFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Apps</option>
                <option value="word-search">Word Search</option>
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
                <option value="handwriting">Handwriting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={fetchSamples}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Samples Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : samples.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No samples found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200">
                  {sample.thumbnailUrl ? (
                    <img
                      src={sample.thumbnailUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {sample.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-2">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {sample.title}
                    </h3>
                  </div>

                  {sample.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {sample.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {sample.appName}
                    </span>
                    {sample.difficulty && (
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyBadge(sample.difficulty)}`}>
                        {sample.difficulty}
                      </span>
                    )}
                    {sample.ageRange && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        Ages {sample.ageRange}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {sample.viewsCount}
                    </span>
                    <span className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      {sample.downloadsCount}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleToggleFeatured(sample.id, sample.featured)}
                      className={`p-2 rounded text-sm ${
                        sample.featured
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      } hover:bg-opacity-80`}
                      title="Toggle Featured"
                    >
                      <Star className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => {
                        // Edit functionality
                        toast.info('Edit functionality coming soon');
                      }}
                      className="p-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    >
                      <Edit className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(sample.id)}
                      className="p-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Upload Sample Worksheet</h2>
              </div>

              <form className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App Name *
                  </label>
                  <select
                    value={formData.appName}
                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select app</option>
                    <option value="word-search">Word Search</option>
                    <option value="addition">Addition</option>
                    <option value="subtraction">Subtraction</option>
                    <option value="multiplication">Multiplication</option>
                    <option value="division">Division</option>
                    <option value="handwriting">Handwriting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age Range
                    </label>
                    <input
                      type="text"
                      value={formData.ageRange}
                      onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                      placeholder="e.g., 6-8"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Worksheet File (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured sample</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    Upload Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
