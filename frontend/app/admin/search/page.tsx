'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  Clock,
  Star,
  TrendingUp,
  FileText,
  Users,
  Mail,
  DollarSign,
  Image,
  Calendar,
  Tag,
  ChevronRight,
  ChevronDown,
  Settings,
  Save,
  Trash2,
  ExternalLink,
  Database,
  BarChart3,
  Hash
} from 'lucide-react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

interface SearchResult {
  id: string;
  type: 'user' | 'worksheet' | 'blog' | 'email' | 'subscription' | 'ticket' | 'file';
  title: string;
  description: string;
  url: string;
  icon: any;
  metadata: {
    created: string;
    updated: string;
    author?: string;
    status?: string;
    tags?: string[];
  };
  relevance: number;
  highlights: string[];
}

interface SearchFilter {
  id: string;
  name: string;
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'between' | 'in';
  value: any;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilter[];
  sort: string;
  createdAt: string;
  usageCount: number;
}

interface SearchAnalytics {
  popularSearches: Array<{ term: string; count: number }>;
  recentSearches: Array<{ term: string; timestamp: string }>;
  searchVolume: Array<{ date: string; searches: number }>;
  avgResultsPerSearch: number;
  clickThroughRate: number;
}

const contentTypes = [
  { id: 'all', name: 'All Content', icon: Database, color: 'text-gray-600' },
  { id: 'user', name: 'Users', icon: Users, color: 'text-blue-600' },
  { id: 'worksheet', name: 'Worksheets', icon: FileText, color: 'text-green-600' },
  { id: 'blog', name: 'Blog Posts', icon: FileText, color: 'text-purple-600' },
  { id: 'email', name: 'Emails', icon: Mail, color: 'text-orange-600' },
  { id: 'subscription', name: 'Subscriptions', icon: DollarSign, color: 'text-yellow-600' },
  { id: 'ticket', name: 'Support Tickets', icon: Hash, color: 'text-red-600' },
  { id: 'file', name: 'Files', icon: Image, color: 'text-indigo-600' }
];

export default function GlobalSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateRange, setDateRange] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setResults([]);
      }
    }, 300),
    [selectedType, filters, sortBy, dateRange]
  );

  useEffect(() => {
    fetchSavedSearches();
    fetchAnalytics();
  }, []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      // Mock search results - replace with API call
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'user',
          title: 'John Doe',
          description: 'john.doe@example.com • Active user since Jan 2024',
          url: '/admin/users/1',
          icon: Users,
          metadata: {
            created: '2024-01-15',
            updated: '2024-11-28',
            status: 'active',
            tags: ['premium', 'educator']
          },
          relevance: 95,
          highlights: ['Matches user name', 'Premium subscriber']
        },
        {
          id: '2',
          type: 'worksheet',
          title: 'Math Addition Worksheet - Grade 2',
          description: 'Interactive addition practice with visual aids',
          url: '/admin/content/worksheets/2',
          icon: FileText,
          metadata: {
            created: '2024-11-20',
            updated: '2024-11-25',
            author: 'Sarah Johnson',
            tags: ['math', 'grade-2', 'addition']
          },
          relevance: 88,
          highlights: ['Popular worksheet', '1,234 downloads']
        },
        {
          id: '3',
          type: 'blog',
          title: 'How to Create Engaging Math Worksheets',
          description: 'Tips and tricks for making math fun for students',
          url: '/admin/content/blog/3',
          icon: FileText,
          metadata: {
            created: '2024-11-10',
            updated: '2024-11-10',
            author: 'Emily Chen',
            status: 'published',
            tags: ['tutorial', 'math', 'education']
          },
          relevance: 82,
          highlights: ['High engagement', '5,432 views']
        },
        {
          id: '4',
          type: 'email',
          title: 'Welcome Email Template',
          description: 'Automated welcome email for new users',
          url: '/admin/communications/email-templates/4',
          icon: Mail,
          metadata: {
            created: '2024-10-01',
            updated: '2024-11-15',
            status: 'active',
            tags: ['template', 'onboarding']
          },
          relevance: 75,
          highlights: ['82% open rate', 'Active template']
        },
        {
          id: '5',
          type: 'ticket',
          title: 'TKT-1234: Cannot download PDF',
          description: 'User reporting issue with PDF generation',
          url: '/admin/support/tickets/1234',
          icon: Hash,
          metadata: {
            created: '2024-11-28',
            updated: '2024-11-28',
            status: 'open',
            tags: ['bug', 'pdf', 'high-priority']
          },
          relevance: 70,
          highlights: ['High priority', 'Needs resolution']
        }
      ];

      // Filter by content type
      let filteredResults = mockResults;
      if (selectedType !== 'all') {
        filteredResults = filteredResults.filter(r => r.type === selectedType);
      }

      // Apply additional filters
      filters.forEach(filter => {
        filteredResults = applyFilter(filteredResults, filter);
      });

      // Sort results
      filteredResults = sortResults(filteredResults, sortBy);

      setResults(filteredResults);

      // Track search
      trackSearch(searchQuery, filteredResults.length);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (results: SearchResult[], filter: SearchFilter): SearchResult[] => {
    return results.filter(result => {
      const value = getNestedValue(result, filter.field);
      switch (filter.operator) {
        case 'equals':
          return value === filter.value;
        case 'contains':
          return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
        case 'startsWith':
          return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
        case 'gt':
          return value > filter.value;
        case 'lt':
          return value < filter.value;
        case 'between':
          return value >= filter.value[0] && value <= filter.value[1];
        case 'in':
          return filter.value.includes(value);
        default:
          return true;
      }
    });
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const sortResults = (results: SearchResult[], sort: string): SearchResult[] => {
    const sorted = [...results];
    switch (sort) {
      case 'relevance':
        return sorted.sort((a, b) => b.relevance - a.relevance);
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
        );
      case 'oldest':
        return sorted.sort((a, b) => 
          new Date(a.metadata.created).getTime() - new Date(b.metadata.created).getTime()
        );
      case 'updated':
        return sorted.sort((a, b) => 
          new Date(b.metadata.updated).getTime() - new Date(a.metadata.updated).getTime()
        );
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const fetchSavedSearches = async () => {
    try {
      // Mock data - replace with API call
      const mockSavedSearches: SavedSearch[] = [
        {
          id: '1',
          name: 'Active Premium Users',
          query: 'premium users',
          filters: [
            { id: '1', name: 'Status', field: 'metadata.status', operator: 'equals', value: 'active', type: 'select' },
            { id: '2', name: 'Plan', field: 'metadata.tags', operator: 'contains', value: 'premium', type: 'text' }
          ],
          sort: 'newest',
          createdAt: '2024-11-15',
          usageCount: 45
        },
        {
          id: '2',
          name: 'Recent Math Worksheets',
          query: 'math worksheet',
          filters: [
            { id: '3', name: 'Type', field: 'type', operator: 'equals', value: 'worksheet', type: 'select' },
            { id: '4', name: 'Tag', field: 'metadata.tags', operator: 'contains', value: 'math', type: 'text' }
          ],
          sort: 'newest',
          createdAt: '2024-11-20',
          usageCount: 23
        },
        {
          id: '3',
          name: 'Open Support Tickets',
          query: 'ticket',
          filters: [
            { id: '5', name: 'Type', field: 'type', operator: 'equals', value: 'ticket', type: 'select' },
            { id: '6', name: 'Status', field: 'metadata.status', operator: 'equals', value: 'open', type: 'select' }
          ],
          sort: 'newest',
          createdAt: '2024-11-25',
          usageCount: 67
        }
      ];
      setSavedSearches(mockSavedSearches);
    } catch (error) {
      console.error('Error fetching saved searches:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Mock data - replace with API call
      const mockAnalytics: SearchAnalytics = {
        popularSearches: [
          { term: 'math worksheet', count: 234 },
          { term: 'user email', count: 189 },
          { term: 'subscription', count: 156 },
          { term: 'grade 2', count: 145 },
          { term: 'template', count: 123 }
        ],
        recentSearches: [
          { term: 'john doe', timestamp: '2024-11-28T15:30:00Z' },
          { term: 'math addition', timestamp: '2024-11-28T15:25:00Z' },
          { term: 'support ticket', timestamp: '2024-11-28T15:20:00Z' },
          { term: 'email template', timestamp: '2024-11-28T15:15:00Z' }
        ],
        searchVolume: [
          { date: '11/22', searches: 145 },
          { date: '11/23', searches: 189 },
          { date: '11/24', searches: 123 },
          { date: '11/25', searches: 234 },
          { date: '11/26', searches: 198 },
          { date: '11/27', searches: 212 },
          { date: '11/28', searches: 178 }
        ],
        avgResultsPerSearch: 12.5,
        clickThroughRate: 68.4
      };
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const trackSearch = async (searchQuery: string, resultCount: number) => {
    // Track search query for analytics
    console.log('Search tracked:', { query: searchQuery, results: resultCount, timestamp: new Date() });
  };

  const saveSearch = async () => {
    const name = prompt('Name this search:');
    if (!name) return;

    try {
      const newSavedSearch: SavedSearch = {
        id: String(savedSearches.length + 1),
        name,
        query,
        filters,
        sort: sortBy,
        createdAt: new Date().toISOString(),
        usageCount: 0
      };
      setSavedSearches([...savedSearches, newSavedSearch]);
      toast.success('Search saved');
    } catch (error) {
      toast.error('Failed to save search');
    }
  };

  const loadSavedSearch = (search: SavedSearch) => {
    setQuery(search.query);
    setFilters(search.filters);
    setSortBy(search.sort);
    setShowSavedSearches(false);
    toast.success(`Loaded "${search.name}"`);
  };

  const addFilter = () => {
    const newFilter: SearchFilter = {
      id: String(filters.length + 1),
      name: 'New Filter',
      field: 'metadata.status',
      operator: 'equals',
      value: '',
      type: 'text'
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, updates: Partial<SearchFilter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const exportResults = () => {
    const data = results.map(r => ({
      title: r.title,
      type: r.type,
      description: r.description,
      created: r.metadata.created,
      updated: r.metadata.updated,
      url: r.url
    }));
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-results-${new Date().toISOString()}.csv`;
    a.click();
    
    toast.success('Results exported');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="h-7 w-7" />
          Global Search
        </h1>
        <p className="text-gray-600 mt-1">
          Search across all content and data in the system
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users, worksheets, emails, tickets, and more..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border rounded-lg flex items-center gap-2 ${
              showFilters ? 'bg-blue-50 border-blue-500 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Filter className="h-5 w-5" />
            Filters
            {filters.length > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {filters.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowSavedSearches(!showSavedSearches)}
            className="px-4 py-3 border rounded-lg hover:bg-gray-50"
          >
            <Star className="h-5 w-5" />
          </button>
        </div>

        {/* Content Type Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {contentTypes.map(type => {
            const Icon = type.icon;
            const isActive = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {type.name}
                {isActive && results.length > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-700 text-white text-xs rounded-full">
                    {results.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Advanced Filters</h3>
            <div className="flex gap-2">
              <button
                onClick={addFilter}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Filter
              </button>
              <button
                onClick={() => setFilters([])}
                className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50"
              >
                Clear All
              </button>
            </div>
          </div>

          {filters.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No filters applied. Click "Add Filter" to refine your search.
            </p>
          ) : (
            <div className="space-y-3">
              {filters.map(filter => (
                <div key={filter.id} className="flex gap-3 items-center">
                  <select
                    value={filter.field}
                    onChange={(e) => updateFilter(filter.id, { field: e.target.value })}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="type">Type</option>
                    <option value="metadata.status">Status</option>
                    <option value="metadata.author">Author</option>
                    <option value="metadata.tags">Tags</option>
                    <option value="metadata.created">Created Date</option>
                  </select>

                  <select
                    value={filter.operator}
                    onChange={(e) => updateFilter(filter.id, { operator: e.target.value as any })}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts with</option>
                    <option value="endsWith">Ends with</option>
                  </select>

                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sort and Date Range */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {showSavedSearches && (
        <div className="bg-white rounded-lg border p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Saved Searches</h3>
          <div className="space-y-2">
            {savedSearches.map(search => (
              <button
                key={search.id}
                onClick={() => loadSavedSearch(search)}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{search.name}</p>
                    <p className="text-sm text-gray-600">
                      "{search.query}" • {search.filters.length} filters • Used {search.usageCount} times
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
          {savedSearches.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No saved searches yet
            </p>
          )}
        </div>
      )}

      {/* Results Section */}
      <div className="flex gap-6">
        {/* Results List */}
        <div className="flex-1">
          {/* Results Header */}
          {results.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Found <span className="font-semibold">{results.length}</span> results
                {query && (
                  <span> for "<span className="font-semibold">{query}</span>"</span>
                )}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={saveSearch}
                  className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save Search
                </button>
                <button
                  onClick={exportResults}
                  className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map(result => {
                const Icon = result.icon;
                const typeConfig = contentTypes.find(t => t.id === result.type);
                
                return (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(result.url)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-gray-50 ${typeConfig?.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {result.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="px-2 py-1 bg-gray-100 rounded">
                                {result.type}
                              </span>
                              <span>
                                <Calendar className="inline h-3 w-3 mr-1" />
                                {new Date(result.metadata.created).toLocaleDateString()}
                              </span>
                              {result.metadata.author && (
                                <span>
                                  <Users className="inline h-3 w-3 mr-1" />
                                  {result.metadata.author}
                                </span>
                              )}
                              {result.metadata.status && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                  {result.metadata.status}
                                </span>
                              )}
                            </div>
                            {result.metadata.tags && result.metadata.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {result.metadata.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {result.highlights.length > 0 && (
                              <div className="mt-2 text-xs text-green-600">
                                {result.highlights.map((highlight, idx) => (
                                  <span key={idx} className="mr-3">• {highlight}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {result.relevance}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {!loading && query && results.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No results found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !query && (
            <div className="bg-white rounded-lg border p-8">
              <h3 className="font-semibold text-gray-900 mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {analytics?.popularSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(search.term)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    {search.term}
                    <span className="ml-2 text-gray-500">({search.count})</span>
                  </button>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Recent Searches</h3>
              <div className="space-y-2">
                {analytics?.recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(search.term)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <span className="text-sm">{search.term}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(search.timestamp).toLocaleTimeString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Analytics Sidebar */}
        {showAdvanced && analytics && (
          <div className="w-80">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Search Analytics</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Search Volume</p>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-between p-2">
                    {analytics.searchVolume.map((day, idx) => (
                      <div key={idx} className="flex-1 mx-0.5">
                        <div
                          className="bg-blue-500 rounded-t"
                          style={{
                            height: `${(day.searches / Math.max(...analytics.searchVolume.map(d => d.searches))) * 100}%`
                          }}
                        ></div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {day.date.split('/')[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Avg Results</p>
                    <p className="text-2xl font-bold">{analytics.avgResultsPerSearch}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Click Rate</p>
                    <p className="text-2xl font-bold">{analytics.clickThroughRate}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Top Search Terms</p>
                  <div className="space-y-2">
                    {analytics.popularSearches.slice(0, 5).map((search, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm">{search.term}</span>
                        <span className="text-xs text-gray-500">{search.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <BarChart3 className="h-5 w-5" />
      </button>
    </div>
  );
}