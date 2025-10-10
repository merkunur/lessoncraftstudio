import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

interface SharedResource {
  id: string;
  teamId: string;
  type: 'worksheet' | 'file' | 'folder' | 'template' | 'link';
  name: string;
  description?: string;
  url?: string;
  fileId?: string;
  worksheetId?: string;
  parentId?: string;
  path: string;
  mimeType?: string;
  size?: number;
  thumbnailUrl?: string;
  sharedBy: string;
  sharedByName: string;
  sharedAt: string;
  lastModified: string;
  permissions: {
    view: string[];
    edit: string[];
    delete: string[];
    share: string[];
  };
  tags: string[];
  metadata: {
    downloads: number;
    views: number;
    edits: number;
    lastViewed?: string;
    lastEdited?: string;
    version: number;
    isLocked: boolean;
    lockedBy?: string;
    lockedAt?: string;
  };
  collaborators: Array<{
    userId: string;
    name: string;
    avatar?: string;
    lastAccess?: string;
    permission: 'view' | 'edit' | 'admin';
  }>;
}

interface ResourceFolder {
  id: string;
  teamId: string;
  name: string;
  parentId?: string;
  path: string;
  createdBy: string;
  createdAt: string;
  resourceCount: number;
  subfolderCount: number;
}

interface ResourceActivity {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  action: 'created' | 'viewed' | 'edited' | 'shared' | 'downloaded' | 'deleted' | 'restored';
  details?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Mock storage
const teamResources = new Map<string, SharedResource[]>();
const resourceFolders = new Map<string, ResourceFolder[]>();
const resourceActivities = new Map<string, ResourceActivity[]>();

// Initialize with sample data
teamResources.set('team_1', [
  {
    id: 'resource_1',
    teamId: 'team_1',
    type: 'worksheet',
    name: 'Addition Practice - Grade 2',
    description: 'Basic addition problems for second graders',
    worksheetId: 'ws_123',
    parentId: null,
    path: '/worksheets',
    thumbnailUrl: 'https://example.com/thumb1.png',
    sharedBy: 'user_1',
    sharedByName: 'John Doe',
    sharedAt: '2024-11-20T10:00:00Z',
    lastModified: '2024-11-25T14:00:00Z',
    permissions: {
      view: ['all'],
      edit: ['owner', 'admin', 'editor'],
      delete: ['owner', 'admin'],
      share: ['owner', 'admin', 'editor']
    },
    tags: ['math', 'addition', 'grade-2'],
    metadata: {
      downloads: 45,
      views: 234,
      edits: 12,
      lastViewed: '2024-11-28T10:00:00Z',
      lastEdited: '2024-11-25T14:00:00Z',
      version: 3,
      isLocked: false
    },
    collaborators: [
      {
        userId: 'user_1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastAccess: '2024-11-28T10:00:00Z',
        permission: 'admin'
      }
    ]
  },
  {
    id: 'resource_2',
    teamId: 'team_1',
    type: 'file',
    name: 'Science Curriculum Guide.pdf',
    description: 'Complete curriculum guide for elementary science',
    fileId: 'file_456',
    parentId: 'folder_1',
    path: '/documents/guides',
    mimeType: 'application/pdf',
    size: 2456789,
    sharedBy: 'user_2',
    sharedByName: 'Jane Smith',
    sharedAt: '2024-11-15T09:00:00Z',
    lastModified: '2024-11-15T09:00:00Z',
    permissions: {
      view: ['all'],
      edit: ['owner', 'admin'],
      delete: ['owner'],
      share: ['owner', 'admin']
    },
    tags: ['science', 'curriculum', 'guide'],
    metadata: {
      downloads: 23,
      views: 156,
      edits: 2,
      lastViewed: '2024-11-27T16:00:00Z',
      version: 1,
      isLocked: false
    },
    collaborators: []
  }
]);

class ResourceService {
  async shareResource(
    teamId: string,
    userId: string,
    userName: string,
    data: {
      type: SharedResource['type'];
      name: string;
      description?: string;
      url?: string;
      fileId?: string;
      worksheetId?: string;
      parentId?: string;
      tags?: string[];
    }
  ): Promise<SharedResource> {
    const resource: SharedResource = {
      id: `resource_${Date.now()}`,
      teamId,
      type: data.type,
      name: data.name,
      description: data.description,
      url: data.url,
      fileId: data.fileId,
      worksheetId: data.worksheetId,
      parentId: data.parentId,
      path: this.getResourcePath(teamId, data.parentId),
      sharedBy: userId,
      sharedByName: userName,
      sharedAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      permissions: {
        view: ['all'],
        edit: ['owner', 'admin', 'editor'],
        delete: ['owner', 'admin'],
        share: ['owner', 'admin', 'editor']
      },
      tags: data.tags || [],
      metadata: {
        downloads: 0,
        views: 0,
        edits: 0,
        version: 1,
        isLocked: false
      },
      collaborators: [
        {
          userId,
          name: userName,
          permission: 'admin',
          lastAccess: new Date().toISOString()
        }
      ]
    };

    const resources = teamResources.get(teamId) || [];
    resources.push(resource);
    teamResources.set(teamId, resources);

    // Log activity
    this.logActivity(resource.id, userId, userName, 'created', `Shared ${data.type}: ${data.name}`);

    return resource;
  }

  async getTeamResources(
    teamId: string,
    options: {
      type?: string;
      parentId?: string;
      tags?: string[];
      search?: string;
      sortBy?: 'name' | 'date' | 'downloads' | 'views';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ resources: SharedResource[]; total: number }> {
    let resources = teamResources.get(teamId) || [];

    // Apply filters
    if (options.type) {
      resources = resources.filter(r => r.type === options.type);
    }

    if (options.parentId !== undefined) {
      resources = resources.filter(r => r.parentId === options.parentId);
    }

    if (options.tags && options.tags.length > 0) {
      resources = resources.filter(r =>
        options.tags!.some(tag => r.tags.includes(tag))
      );
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      resources = resources.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description?.toLowerCase().includes(searchLower) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    const sortBy = options.sortBy || 'date';
    resources.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
          return b.metadata.downloads - a.metadata.downloads;
        case 'views':
          return b.metadata.views - a.metadata.views;
        case 'date':
        default:
          return new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime();
      }
    });

    // Paginate
    const total = resources.length;
    const offset = options.offset || 0;
    const limit = options.limit || 50;
    resources = resources.slice(offset, offset + limit);

    return { resources, total };
  }

  async getResource(resourceId: string): Promise<SharedResource | null> {
    for (const resources of teamResources.values()) {
      const resource = resources.find(r => r.id === resourceId);
      if (resource) return resource;
    }
    return null;
  }

  async updateResource(
    resourceId: string,
    userId: string,
    updates: Partial<SharedResource>
  ): Promise<SharedResource | null> {
    for (const [teamId, resources] of teamResources.entries()) {
      const index = resources.findIndex(r => r.id === resourceId);
      if (index !== -1) {
        const resource = resources[index];

        // Check permissions
        if (!this.canEdit(resource, userId)) {
          throw new Error('Insufficient permissions to edit resource');
        }

        // Update resource
        const updatedResource = {
          ...resource,
          ...updates,
          id: resource.id,
          teamId: resource.teamId,
          lastModified: new Date().toISOString()
        };

        // Update version
        updatedResource.metadata.version = resource.metadata.version + 1;
        updatedResource.metadata.edits = resource.metadata.edits + 1;
        updatedResource.metadata.lastEdited = new Date().toISOString();

        resources[index] = updatedResource;
        teamResources.set(teamId, resources);

        // Log activity
        this.logActivity(resourceId, userId, 'User', 'edited', 'Updated resource');

        return updatedResource;
      }
    }
    return null;
  }

  async deleteResource(resourceId: string, userId: string): Promise<boolean> {
    for (const [teamId, resources] of teamResources.entries()) {
      const index = resources.findIndex(r => r.id === resourceId);
      if (index !== -1) {
        const resource = resources[index];

        // Check permissions
        if (!this.canDelete(resource, userId)) {
          throw new Error('Insufficient permissions to delete resource');
        }

        resources.splice(index, 1);
        teamResources.set(teamId, resources);

        // Log activity
        this.logActivity(resourceId, userId, 'User', 'deleted', `Deleted ${resource.name}`);

        return true;
      }
    }
    return false;
  }

  async createFolder(
    teamId: string,
    userId: string,
    data: {
      name: string;
      parentId?: string;
    }
  ): Promise<ResourceFolder> {
    const folder: ResourceFolder = {
      id: `folder_${Date.now()}`,
      teamId,
      name: data.name,
      parentId: data.parentId,
      path: this.getFolderPath(teamId, data.parentId),
      createdBy: userId,
      createdAt: new Date().toISOString(),
      resourceCount: 0,
      subfolderCount: 0
    };

    const folders = resourceFolders.get(teamId) || [];
    folders.push(folder);
    resourceFolders.set(teamId, folders);

    return folder;
  }

  async trackActivity(
    resourceId: string,
    userId: string,
    userName: string,
    action: 'viewed' | 'downloaded'
  ): Promise<void> {
    const resource = await this.getResource(resourceId);
    if (!resource) return;

    // Update metadata
    if (action === 'viewed') {
      resource.metadata.views++;
      resource.metadata.lastViewed = new Date().toISOString();
    } else if (action === 'downloaded') {
      resource.metadata.downloads++;
    }

    // Log activity
    this.logActivity(resourceId, userId, userName, action);
  }

  private getResourcePath(teamId: string, parentId?: string): string {
    if (!parentId) return '/';

    const folders = resourceFolders.get(teamId) || [];
    const folder = folders.find(f => f.id === parentId);
    return folder ? `${folder.path}/${folder.name}` : '/';
  }

  private getFolderPath(teamId: string, parentId?: string): string {
    if (!parentId) return '/';

    const folders = resourceFolders.get(teamId) || [];
    const folder = folders.find(f => f.id === parentId);
    return folder ? `${folder.path}/${folder.name}` : '/';
  }

  private canEdit(resource: SharedResource, userId: string): boolean {
    // Simplified permission check
    return resource.sharedBy === userId ||
           resource.collaborators.some(c => c.userId === userId && ['edit', 'admin'].includes(c.permission));
  }

  private canDelete(resource: SharedResource, userId: string): boolean {
    return resource.sharedBy === userId ||
           resource.collaborators.some(c => c.userId === userId && c.permission === 'admin');
  }

  private logActivity(
    resourceId: string,
    userId: string,
    userName: string,
    action: ResourceActivity['action'],
    details?: string,
    metadata?: Record<string, any>
  ) {
    const activity: ResourceActivity = {
      id: `activity_${Date.now()}`,
      resourceId,
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString(),
      metadata
    };

    const activities = resourceActivities.get(resourceId) || [];
    activities.unshift(activity);

    // Keep only last 50 activities per resource
    if (activities.length > 50) {
      activities.splice(50);
    }

    resourceActivities.set(resourceId, activities);
  }

  async getResourceActivity(resourceId: string, limit: number = 20): Promise<ResourceActivity[]> {
    const activities = resourceActivities.get(resourceId) || [];
    return activities.slice(0, limit);
  }
}

const resourceService = new ResourceService();

// GET /api/admin/teams/resources
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const resourceId = searchParams.get('resourceId');
    const type = searchParams.get('type');
    const parentId = searchParams.get('parentId');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') as any;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get single resource
    if (resourceId) {
      const resource = await resourceService.getResource(resourceId);
      if (!resource) {
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: 404 }
        );
      }

      const activity = await resourceService.getResourceActivity(resourceId);

      return NextResponse.json({
        resource,
        activity
      });
    }

    // Get team resources
    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const tags = searchParams.getAll('tags');
    const result = await resourceService.getTeamResources(teamId, {
      type,
      parentId,
      tags,
      search,
      sortBy,
      limit,
      offset
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

// POST /api/admin/teams/resources
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.teamId || !data.type || !data.name) {
      return NextResponse.json(
        { error: 'Team ID, type, and name are required' },
        { status: 400 }
      );
    }

    const userId = user.id || 'user_1';
    const userName = user.name || 'Current User';

    // Create folder
    if (data.type === 'folder') {
      const folder = await resourceService.createFolder(data.teamId, userId, {
        name: data.name,
        parentId: data.parentId
      });

      return NextResponse.json({
        folder,
        message: 'Folder created successfully'
      }, { status: 201 });
    }

    // Share resource
    const resource = await resourceService.shareResource(
      data.teamId,
      userId,
      userName,
      data
    );

    return NextResponse.json({
      resource,
      message: 'Resource shared successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/teams/resources/[id]
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { resourceId, ...updates } = data;

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    const userId = user.id || 'user_1';
    const updatedResource = await resourceService.updateResource(
      resourceId,
      userId,
      updates
    );

    if (!updatedResource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      resource: updatedResource,
      message: 'Resource updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating resource:', error);

    if (error.message?.includes('permissions')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/teams/resources/[id]
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const resourceId = searchParams.get('resourceId');

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    const userId = user.id || 'user_1';
    const success = await resourceService.deleteResource(resourceId, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting resource:', error);

    if (error.message?.includes('permissions')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}