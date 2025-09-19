import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface FileVersion {
  id: string;
  fileId: string;
  version: number;
  name: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  metadata: {
    width?: number;
    height?: number;
    format?: string;
    checksum?: string;
  };
  uploadedBy: string;
  uploadedAt: string;
  comment?: string;
  tags?: string[];
  isLatest: boolean;
  isDraft: boolean;
}

interface VersionComparisonResult {
  fileId: string;
  versions: {
    version1: FileVersion;
    version2: FileVersion;
  };
  differences: {
    sizeChange: number;
    sizeChangePercent: number;
    metadataChanges: Record<string, { old: any; new: any }>;
    addedTags: string[];
    removedTags: string[];
    timeElapsed: number;
  };
}

// Mock version storage
const fileVersions: Map<string, FileVersion[]> = new Map([
  ['file_1', [
    {
      id: 'v1',
      fileId: 'file_1',
      version: 3,
      name: 'document_v3.pdf',
      size: 2456789,
      url: 'https://cdn.example.com/versions/file_1_v3.pdf',
      metadata: {
        format: 'PDF',
        checksum: 'abc123def456'
      },
      uploadedBy: 'user_1',
      uploadedAt: '2024-11-28T10:00:00Z',
      comment: 'Final version with corrections',
      tags: ['final', 'approved'],
      isLatest: true,
      isDraft: false
    },
    {
      id: 'v2',
      fileId: 'file_1',
      version: 2,
      name: 'document_v2.pdf',
      size: 2356789,
      url: 'https://cdn.example.com/versions/file_1_v2.pdf',
      metadata: {
        format: 'PDF',
        checksum: 'def456ghi789'
      },
      uploadedBy: 'user_2',
      uploadedAt: '2024-11-25T14:00:00Z',
      comment: 'Updated charts and graphs',
      tags: ['review'],
      isLatest: false,
      isDraft: false
    },
    {
      id: 'v3',
      fileId: 'file_1',
      version: 1,
      name: 'document_v1.pdf',
      size: 2256789,
      url: 'https://cdn.example.com/versions/file_1_v1.pdf',
      metadata: {
        format: 'PDF',
        checksum: 'ghi789jkl012'
      },
      uploadedBy: 'user_1',
      uploadedAt: '2024-11-20T09:00:00Z',
      comment: 'Initial upload',
      tags: ['draft'],
      isLatest: false,
      isDraft: false
    }
  ]]
]);

class VersioningService {
  async createVersion(
    fileId: string,
    file: File,
    options: {
      comment?: string;
      tags?: string[];
      isDraft?: boolean;
      makeLatest?: boolean;
    } = {}
  ): Promise<FileVersion> {
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingVersions = fileVersions.get(fileId) || [];
    const maxVersion = Math.max(0, ...existingVersions.map(v => v.version));

    // Mark previous latest as not latest if making this latest
    if (options.makeLatest) {
      existingVersions.forEach(v => v.isLatest = false);
    }

    const newVersion: FileVersion = {
      id: `v${existingVersions.length + 1}`,
      fileId,
      version: maxVersion + 1,
      name: file.name,
      size: file.size,
      url: `https://cdn.example.com/versions/${fileId}_v${maxVersion + 1}.${file.name.split('.').pop()}`,
      thumbnailUrl: file.type.startsWith('image/')
        ? `https://cdn.example.com/thumbnails/${fileId}_v${maxVersion + 1}_thumb.jpg`
        : undefined,
      metadata: {
        format: file.type,
        checksum: Math.random().toString(36).substring(7)
      },
      uploadedBy: 'user_1', // Would come from session
      uploadedAt: new Date().toISOString(),
      comment: options.comment,
      tags: options.tags,
      isLatest: options.makeLatest !== false,
      isDraft: options.isDraft || false
    };

    existingVersions.unshift(newVersion);
    fileVersions.set(fileId, existingVersions);

    return newVersion;
  }

  async getVersions(fileId: string): Promise<FileVersion[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return fileVersions.get(fileId) || [];
  }

  async getVersion(fileId: string, versionNumber: number): Promise<FileVersion | null> {
    const versions = await this.getVersions(fileId);
    return versions.find(v => v.version === versionNumber) || null;
  }

  async promoteVersion(fileId: string, versionNumber: number): Promise<FileVersion | null> {
    const versions = await this.getVersions(fileId);
    const targetVersion = versions.find(v => v.version === versionNumber);

    if (!targetVersion) return null;

    // Mark all as not latest
    versions.forEach(v => v.isLatest = false);
    // Mark target as latest
    targetVersion.isLatest = true;

    fileVersions.set(fileId, versions);
    return targetVersion;
  }

  async compareVersions(
    fileId: string,
    version1: number,
    version2: number
  ): Promise<VersionComparisonResult | null> {
    const versions = await this.getVersions(fileId);
    const v1 = versions.find(v => v.version === version1);
    const v2 = versions.find(v => v.version === version2);

    if (!v1 || !v2) return null;

    const metadataChanges: Record<string, { old: any; new: any }> = {};

    // Compare metadata
    Object.keys({ ...v1.metadata, ...v2.metadata }).forEach(key => {
      if (v1.metadata[key as keyof typeof v1.metadata] !== v2.metadata[key as keyof typeof v2.metadata]) {
        metadataChanges[key] = {
          old: v1.metadata[key as keyof typeof v1.metadata],
          new: v2.metadata[key as keyof typeof v2.metadata]
        };
      }
    });

    // Compare tags
    const v1Tags = v1.tags || [];
    const v2Tags = v2.tags || [];
    const addedTags = v2Tags.filter(tag => !v1Tags.includes(tag));
    const removedTags = v1Tags.filter(tag => !v2Tags.includes(tag));

    // Calculate time elapsed
    const timeElapsed = new Date(v2.uploadedAt).getTime() - new Date(v1.uploadedAt).getTime();

    return {
      fileId,
      versions: {
        version1: v1,
        version2: v2
      },
      differences: {
        sizeChange: v2.size - v1.size,
        sizeChangePercent: ((v2.size - v1.size) / v1.size) * 100,
        metadataChanges,
        addedTags,
        removedTags,
        timeElapsed
      }
    };
  }

  async deleteVersion(fileId: string, versionNumber: number): Promise<boolean> {
    const versions = await this.getVersions(fileId);
    const versionIndex = versions.findIndex(v => v.version === versionNumber);

    if (versionIndex === -1) return false;

    // Don't delete if it's the only version or the latest
    if (versions.length === 1 || versions[versionIndex].isLatest) {
      return false;
    }

    versions.splice(versionIndex, 1);
    fileVersions.set(fileId, versions);
    return true;
  }

  async restoreVersion(fileId: string, versionNumber: number): Promise<FileVersion | null> {
    const versions = await this.getVersions(fileId);
    const targetVersion = versions.find(v => v.version === versionNumber);

    if (!targetVersion) return null;

    // Create a new version based on the target version
    const maxVersion = Math.max(...versions.map(v => v.version));
    const restoredVersion: FileVersion = {
      ...targetVersion,
      id: `v${versions.length + 1}`,
      version: maxVersion + 1,
      uploadedAt: new Date().toISOString(),
      comment: `Restored from version ${versionNumber}`,
      isLatest: true
    };

    // Mark all others as not latest
    versions.forEach(v => v.isLatest = false);
    versions.unshift(restoredVersion);
    fileVersions.set(fileId, versions);

    return restoredVersion;
  }
}

const versioningService = new VersioningService();

// GET /api/admin/files/versions?fileId=xxx
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('fileId');
    const versionNumber = searchParams.get('version');

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    if (versionNumber) {
      const version = await versioningService.getVersion(fileId, parseInt(versionNumber));
      if (!version) {
        return NextResponse.json(
          { error: 'Version not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(version);
    }

    const versions = await versioningService.getVersions(fileId);
    return NextResponse.json({
      fileId,
      versions,
      total: versions.length,
      latestVersion: versions.find(v => v.isLatest)
    });

  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/files/versions
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const fileId = formData.get('fileId') as string;
    const file = formData.get('file') as File;
    const comment = formData.get('comment') as string | null;
    const tags = formData.get('tags') as string | null;
    const isDraft = formData.get('isDraft') === 'true';
    const makeLatest = formData.get('makeLatest') !== 'false';

    if (!fileId || !file) {
      return NextResponse.json(
        { error: 'File ID and file are required' },
        { status: 400 }
      );
    }

    const newVersion = await versioningService.createVersion(fileId, file, {
      comment: comment || undefined,
      tags: tags ? tags.split(',') : undefined,
      isDraft,
      makeLatest
    });

    return NextResponse.json({
      version: newVersion,
      message: `Version ${newVersion.version} created successfully`
    });

  } catch (error) {
    console.error('Error creating version:', error);
    return NextResponse.json(
      { error: 'Failed to create version' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/files/versions/promote
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { fileId, version, action } = data;

    if (!fileId || !version) {
      return NextResponse.json(
        { error: 'File ID and version are required' },
        { status: 400 }
      );
    }

    let result;
    switch (action) {
      case 'promote':
        result = await versioningService.promoteVersion(fileId, version);
        break;
      case 'restore':
        result = await versioningService.restoreVersion(fileId, version);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      version: result,
      message: `Version ${action === 'promote' ? 'promoted' : 'restored'} successfully`
    });

  } catch (error) {
    console.error('Error updating version:', error);
    return NextResponse.json(
      { error: 'Failed to update version' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/files/versions
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('fileId');
    const version = searchParams.get('version');

    if (!fileId || !version) {
      return NextResponse.json(
        { error: 'File ID and version are required' },
        { status: 400 }
      );
    }

    const success = await versioningService.deleteVersion(fileId, parseInt(version));

    if (!success) {
      return NextResponse.json(
        { error: 'Cannot delete this version (may be the only or latest version)' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Version ${version} deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting version:', error);
    return NextResponse.json(
      { error: 'Failed to delete version' },
      { status: 500 }
    );
  }
}