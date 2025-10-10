import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  query: string;
  filters: any[];
  sort: string;
  type?: string;
  dateRange?: string;
  isPublic: boolean;
  isPinned: boolean;
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock database - in production, use real database
const savedSearches: SavedSearch[] = [
  {
    id: '1',
    userId: 'user_1',
    name: 'Active Premium Users',
    query: 'premium users',
    filters: [
      { field: 'metadata.status', operator: 'equals', value: 'active' },
      { field: 'metadata.plan', operator: 'equals', value: 'premium' }
    ],
    sort: 'newest',
    type: 'user',
    dateRange: 'month',
    isPublic: false,
    isPinned: true,
    usageCount: 45,
    lastUsed: '2024-11-28T10:00:00Z',
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2024-11-28T10:00:00Z'
  },
  {
    id: '2',
    userId: 'user_1',
    name: 'Recent Math Worksheets',
    query: 'math worksheet',
    filters: [
      { field: 'type', operator: 'equals', value: 'worksheet' },
      { field: 'metadata.subject', operator: 'equals', value: 'math' }
    ],
    sort: 'newest',
    type: 'worksheet',
    dateRange: 'week',
    isPublic: true,
    isPinned: false,
    usageCount: 23,
    lastUsed: '2024-11-27T15:00:00Z',
    createdAt: '2024-11-20T12:00:00Z',
    updatedAt: '2024-11-27T15:00:00Z'
  },
  {
    id: '3',
    userId: 'user_1',
    name: 'Open Support Tickets',
    query: 'ticket',
    filters: [
      { field: 'type', operator: 'equals', value: 'ticket' },
      { field: 'metadata.status', operator: 'equals', value: 'open' },
      { field: 'metadata.priority', operator: 'in', value: ['high', 'urgent'] }
    ],
    sort: 'newest',
    type: 'ticket',
    dateRange: 'all',
    isPublic: false,
    isPinned: true,
    usageCount: 67,
    lastUsed: '2024-11-28T14:00:00Z',
    createdAt: '2024-11-25T08:00:00Z',
    updatedAt: '2024-11-28T14:00:00Z'
  }
];

// GET /api/admin/search/saved - Get user's saved searches
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const includePublic = searchParams.get('includePublic') === 'true';
    const sortBy = searchParams.get('sortBy') || 'lastUsed';

    // Get user's saved searches
    let userSearches = savedSearches.filter(
      s => s.userId === user.id || (includePublic && s.isPublic)
    );

    // Sort searches
    userSearches.sort((a, b) => {
      switch (sortBy) {
        case 'lastUsed':
          return new Date(b.lastUsed || b.createdAt).getTime() - 
                 new Date(a.lastUsed || a.createdAt).getTime();
        case 'usageCount':
          return b.usageCount - a.usageCount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    // Move pinned searches to top
    const pinnedSearches = userSearches.filter(s => s.isPinned);
    const unpinnedSearches = userSearches.filter(s => !s.isPinned);
    userSearches = [...pinnedSearches, ...unpinnedSearches];

    return NextResponse.json({
      searches: userSearches,
      total: userSearches.length
    });
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved searches' },
      { status: 500 }
    );
  }
}

// POST /api/admin/search/saved - Create a new saved search
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.query) {
      return NextResponse.json(
        { error: 'Name and query are required' },
        { status: 400 }
      );
    }

    // Create new saved search
    const newSearch: SavedSearch = {
      id: String(savedSearches.length + 1),
      userId: user.id || 'user_1',
      name: data.name,
      query: data.query,
      filters: data.filters || [],
      sort: data.sort || 'relevance',
      type: data.type,
      dateRange: data.dateRange,
      isPublic: data.isPublic || false,
      isPinned: data.isPinned || false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    savedSearches.push(newSearch);

    return NextResponse.json(newSearch, { status: 201 });
  } catch (error) {
    console.error('Error creating saved search:', error);
    return NextResponse.json(
      { error: 'Failed to create saved search' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/search/saved/[id] - Update a saved search
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      );
    }

    // Find and update search
    const searchIndex = savedSearches.findIndex(
      s => s.id === id && s.userId === user.id
    );

    if (searchIndex === -1) {
      return NextResponse.json(
        { error: 'Saved search not found' },
        { status: 404 }
      );
    }

    // Update search
    savedSearches[searchIndex] = {
      ...savedSearches[searchIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Update usage count if executing search
    if (data.execute) {
      savedSearches[searchIndex].usageCount++;
      savedSearches[searchIndex].lastUsed = new Date().toISOString();
    }

    return NextResponse.json(savedSearches[searchIndex]);
  } catch (error) {
    console.error('Error updating saved search:', error);
    return NextResponse.json(
      { error: 'Failed to update saved search' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/search/saved/[id] - Delete a saved search
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      );
    }

    // Find search index
    const searchIndex = savedSearches.findIndex(
      s => s.id === id && s.userId === user.id
    );

    if (searchIndex === -1) {
      return NextResponse.json(
        { error: 'Saved search not found' },
        { status: 404 }
      );
    }

    // Remove search
    savedSearches.splice(searchIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting saved search:', error);
    return NextResponse.json(
      { error: 'Failed to delete saved search' },
      { status: 500 }
    );
  }
}