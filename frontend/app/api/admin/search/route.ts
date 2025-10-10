import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

interface SearchFilter {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'between' | 'in' | 'not';
  value: any;
}

interface SearchRequest {
  query: string;
  type?: string;
  filters?: SearchFilter[];
  sort?: string;
  dateRange?: string;
  page?: number;
  limit?: number;
  fields?: string[];
}

interface SearchResult {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  metadata: Record<string, any>;
  relevance: number;
  highlights: string[];
  _source?: any;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pages: number;
  took: number;
  aggregations?: Record<string, any>;
}

// Mock search index - in production, use Elasticsearch or similar
class SearchService {
  private index: any[] = [
    // Users
    {
      id: 'user_1',
      type: 'user',
      title: 'John Doe',
      description: 'john.doe@example.com',
      content: 'John Doe john.doe@example.com premium user active educator',
      metadata: {
        email: 'john.doe@example.com',
        role: 'user',
        plan: 'premium',
        status: 'active',
        created: '2024-01-15T10:00:00Z',
        updated: '2024-11-28T14:30:00Z',
        tags: ['premium', 'educator'],
        worksheets_created: 45,
        last_login: '2024-11-28T10:00:00Z'
      }
    },
    {
      id: 'user_2',
      type: 'user',
      title: 'Jane Smith',
      description: 'jane.smith@example.com',
      content: 'Jane Smith jane.smith@example.com free user active parent',
      metadata: {
        email: 'jane.smith@example.com',
        role: 'user',
        plan: 'free',
        status: 'active',
        created: '2024-02-20T11:00:00Z',
        updated: '2024-11-27T09:00:00Z',
        tags: ['free', 'parent'],
        worksheets_created: 12,
        last_login: '2024-11-27T08:30:00Z'
      }
    },
    // Worksheets
    {
      id: 'worksheet_1',
      type: 'worksheet',
      title: 'Math Addition Worksheet - Grade 2',
      description: 'Interactive addition practice with visual aids',
      content: 'math addition worksheet grade 2 elementary practice problems',
      metadata: {
        subject: 'math',
        grade: '2',
        difficulty: 'easy',
        downloads: 1234,
        rating: 4.5,
        created: '2024-11-20T09:00:00Z',
        updated: '2024-11-25T15:00:00Z',
        author: 'Sarah Johnson',
        tags: ['math', 'addition', 'grade-2', 'elementary']
      }
    },
    {
      id: 'worksheet_2',
      type: 'worksheet',
      title: 'Science: Solar System Quiz',
      description: 'Test your knowledge about planets and space',
      content: 'science solar system quiz planets space astronomy grade 5',
      metadata: {
        subject: 'science',
        grade: '5',
        difficulty: 'medium',
        downloads: 856,
        rating: 4.8,
        created: '2024-11-15T14:00:00Z',
        updated: '2024-11-15T14:00:00Z',
        author: 'Mike Wilson',
        tags: ['science', 'space', 'solar-system', 'grade-5']
      }
    },
    // Blog Posts
    {
      id: 'blog_1',
      type: 'blog',
      title: 'How to Create Engaging Math Worksheets',
      description: 'Tips and tricks for making math fun for students',
      content: 'create engaging math worksheets tips tricks education teaching',
      metadata: {
        author: 'Emily Chen',
        category: 'tutorials',
        views: 5432,
        likes: 234,
        comments: 45,
        status: 'published',
        created: '2024-11-10T10:00:00Z',
        updated: '2024-11-10T10:00:00Z',
        tags: ['tutorial', 'math', 'education', 'tips']
      }
    },
    // Emails
    {
      id: 'email_1',
      type: 'email',
      title: 'Welcome Email Template',
      description: 'Automated welcome email for new users',
      content: 'welcome email template new users onboarding',
      metadata: {
        template_type: 'transactional',
        sends: 3456,
        opens: 2834,
        clicks: 1234,
        status: 'active',
        created: '2024-10-01T12:00:00Z',
        updated: '2024-11-15T16:00:00Z',
        tags: ['template', 'welcome', 'onboarding']
      }
    },
    // Support Tickets
    {
      id: 'ticket_1234',
      type: 'ticket',
      title: 'TKT-1234: Cannot download PDF',
      description: 'User reporting issue with PDF generation',
      content: 'support ticket pdf download issue bug report',
      metadata: {
        ticket_number: 'TKT-1234',
        customer: 'john.doe@example.com',
        priority: 'high',
        status: 'open',
        assignee: 'Sarah Johnson',
        created: '2024-11-28T08:00:00Z',
        updated: '2024-11-28T14:00:00Z',
        tags: ['bug', 'pdf', 'download', 'high-priority']
      }
    },
    // Subscriptions
    {
      id: 'sub_1',
      type: 'subscription',
      title: 'Premium Plan - John Doe',
      description: 'Monthly premium subscription',
      content: 'premium subscription monthly plan john doe',
      metadata: {
        user: 'john.doe@example.com',
        plan: 'premium',
        interval: 'monthly',
        amount: 19.99,
        status: 'active',
        created: '2024-01-15T10:00:00Z',
        updated: '2024-11-15T10:00:00Z',
        next_billing: '2024-12-15T10:00:00Z',
        tags: ['premium', 'monthly', 'active']
      }
    }
  ];

  async search(request: SearchRequest): Promise<SearchResponse> {
    const startTime = Date.now();
    
    // Filter by content type
    let results = this.index;
    if (request.type && request.type !== 'all') {
      results = results.filter(item => item.type === request.type);
    }

    // Text search
    if (request.query) {
      const query = request.query.toLowerCase();
      results = results.filter(item => {
        const searchableContent = [
          item.title,
          item.description,
          item.content,
          JSON.stringify(item.metadata)
        ].join(' ').toLowerCase();
        
        return searchableContent.includes(query);
      });

      // Calculate relevance
      results = results.map(item => {
        const titleMatch = item.title.toLowerCase().includes(query) ? 40 : 0;
        const descMatch = item.description.toLowerCase().includes(query) ? 30 : 0;
        const contentMatch = item.content.toLowerCase().includes(query) ? 20 : 0;
        const metaMatch = JSON.stringify(item.metadata).toLowerCase().includes(query) ? 10 : 0;
        
        const relevance = titleMatch + descMatch + contentMatch + metaMatch;
        
        return { ...item, relevance };
      });
    } else {
      results = results.map(item => ({ ...item, relevance: 100 }));
    }

    // Apply filters
    if (request.filters && request.filters.length > 0) {
      request.filters.forEach(filter => {
        results = this.applyFilter(results, filter);
      });
    }

    // Apply date range
    if (request.dateRange && request.dateRange !== 'all') {
      results = this.applyDateRange(results, request.dateRange);
    }

    // Sort results
    results = this.sortResults(results, request.sort || 'relevance');

    // Format results
    const formattedResults: SearchResult[] = results.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      url: this.getItemUrl(item),
      metadata: item.metadata,
      relevance: item.relevance || 0,
      highlights: this.generateHighlights(item, request.query),
      _source: request.fields ? this.selectFields(item, request.fields) : undefined
    }));

    // Pagination
    const page = request.page || 1;
    const limit = request.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = formattedResults.slice(startIndex, endIndex);

    // Aggregations
    const aggregations = this.generateAggregations(formattedResults);

    return {
      results: paginatedResults,
      total: formattedResults.length,
      page,
      pages: Math.ceil(formattedResults.length / limit),
      took: Date.now() - startTime,
      aggregations
    };
  }

  private applyFilter(results: any[], filter: SearchFilter): any[] {
    return results.filter(item => {
      const value = this.getNestedValue(item, filter.field);
      
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
          return Array.isArray(filter.value) && filter.value.includes(value);
        case 'not':
          return value !== filter.value;
        default:
          return true;
      }
    });
  }

  private applyDateRange(results: any[], range: string): any[] {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return results;
    }

    return results.filter(item => {
      const itemDate = new Date(item.metadata.created || item.metadata.updated);
      return itemDate >= startDate;
    });
  }

  private sortResults(results: any[], sort: string): any[] {
    const sorted = [...results];
    
    switch (sort) {
      case 'relevance':
        return sorted.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.metadata.created || 0).getTime() - new Date(a.metadata.created || 0).getTime()
        );
      case 'oldest':
        return sorted.sort((a, b) => 
          new Date(a.metadata.created || 0).getTime() - new Date(b.metadata.created || 0).getTime()
        );
      case 'updated':
        return sorted.sort((a, b) => 
          new Date(b.metadata.updated || 0).getTime() - new Date(a.metadata.updated || 0).getTime()
        );
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private getItemUrl(item: any): string {
    const urlMap: Record<string, string> = {
      user: '/admin/users/',
      worksheet: '/admin/content/worksheets/',
      blog: '/admin/content/blog/',
      email: '/admin/communications/email-templates/',
      ticket: '/admin/support/tickets/',
      subscription: '/admin/subscriptions/',
      file: '/admin/files/'
    };

    const baseUrl = urlMap[item.type] || '/admin/';
    const id = item.id.split('_').pop();
    return `${baseUrl}${id}`;
  }

  private generateHighlights(item: any, query?: string): string[] {
    const highlights: string[] = [];
    
    if (item.metadata.status) {
      highlights.push(`Status: ${item.metadata.status}`);
    }
    
    if (item.metadata.downloads) {
      highlights.push(`${item.metadata.downloads.toLocaleString()} downloads`);
    }
    
    if (item.metadata.views) {
      highlights.push(`${item.metadata.views.toLocaleString()} views`);
    }
    
    if (item.metadata.rating) {
      highlights.push(`Rating: ${item.metadata.rating}/5`);
    }
    
    if (item.metadata.priority) {
      highlights.push(`Priority: ${item.metadata.priority}`);
    }

    return highlights.slice(0, 3);
  }

  private selectFields(item: any, fields: string[]): any {
    const result: any = {};
    fields.forEach(field => {
      const value = this.getNestedValue(item, field);
      if (value !== undefined) {
        this.setNestedValue(result, field, value);
      }
    });
    return result;
  }

  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  private generateAggregations(results: any[]): Record<string, any> {
    const aggregations: Record<string, any> = {};

    // Type aggregation
    aggregations.types = {};
    results.forEach(item => {
      if (!aggregations.types[item.type]) {
        aggregations.types[item.type] = 0;
      }
      aggregations.types[item.type]++;
    });

    // Status aggregation
    aggregations.statuses = {};
    results.forEach(item => {
      if (item.metadata.status) {
        if (!aggregations.statuses[item.metadata.status]) {
          aggregations.statuses[item.metadata.status] = 0;
        }
        aggregations.statuses[item.metadata.status]++;
      }
    });

    // Tag aggregation
    aggregations.tags = {};
    results.forEach(item => {
      if (item.metadata.tags && Array.isArray(item.metadata.tags)) {
        item.metadata.tags.forEach((tag: string) => {
          if (!aggregations.tags[tag]) {
            aggregations.tags[tag] = 0;
          }
          aggregations.tags[tag]++;
        });
      }
    });

    // Sort tags by count and take top 10
    aggregations.topTags = Object.entries(aggregations.tags)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return aggregations;
  }

  async suggest(query: string): Promise<string[]> {
    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();

    this.index.forEach(item => {
      // Add title suggestions
      if (item.title.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.title);
      }

      // Add tag suggestions
      if (item.metadata.tags) {
        item.metadata.tags.forEach((tag: string) => {
          if (tag.toLowerCase().includes(lowerQuery)) {
            suggestions.add(tag);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 10);
  }

  async trackSearch(query: string, userId: string, resultCount: number): Promise<void> {
    // Log search for analytics
    console.log('Search tracked:', {
      query,
      userId,
      resultCount,
      timestamp: new Date().toISOString()
    });
    // In production, save to database for analytics
  }
}

const searchService = new SearchService();

// POST /api/admin/search
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchRequest: SearchRequest = await request.json();
    
    // Perform search
    const results = await searchService.search(searchRequest);
    
    // Track search for analytics
    if (searchRequest.query) {
      await searchService.trackSearch(
        searchRequest.query,
        user.id || 'anonymous',
        results.total
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

// GET /api/admin/search/suggest?q=query
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = await searchService.suggest(query);
    
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Suggest error:', error);
    return NextResponse.json(
      { error: 'Suggestions failed' },
      { status: 500 }
    );
  }
}