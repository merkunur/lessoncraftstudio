import {
  FileItem,
  FileUpload,
  UploadChunk,
  StorageProvider,
  ImageOptimization,
  FileSearch,
  StorageQuota,
  FileMetadata,
  CDNConfiguration,
  ShareLink,
  FileOperation
} from '@/types/file-management';

// File size formatting
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get file extension
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot + 1).toLowerCase();
}

// Get MIME type from extension
export function getMimeType(filename: string): string {
  const ext = getFileExtension(filename);
  
  const mimeTypes: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogv': 'video/ogg',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'm4a': 'audio/mp4',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Text
    'txt': 'text/plain',
    'csv': 'text/csv',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'xml': 'application/xml',
    
    // Archives
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip'
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

// Get file type category
export function getFileCategory(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('text/')) return 'text';
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'spreadsheet';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'presentation';
  if (mimeType.includes('zip') || mimeType.includes('compressed') || mimeType.includes('tar')) return 'archive';
  return 'file';
}

// Calculate upload speed
export function calculateUploadSpeed(
  bytesUploaded: number,
  startTime: number
): number {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  if (elapsedSeconds === 0) return 0;
  return Math.round(bytesUploaded / elapsedSeconds);
}

// Calculate remaining time
export function calculateRemainingTime(
  totalBytes: number,
  uploadedBytes: number,
  speed: number
): number {
  if (speed === 0) return Infinity;
  const remainingBytes = totalBytes - uploadedBytes;
  return Math.round(remainingBytes / speed);
}

// Format duration
export function formatDuration(seconds: number): string {
  if (seconds === Infinity) return 'Unknown';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Create chunks for resumable upload
export function createUploadChunks(
  fileSize: number,
  chunkSize: number = 5 * 1024 * 1024 // 5MB default
): UploadChunk[] {
  const chunks: UploadChunk[] = [];
  let offset = 0;
  let index = 0;
  
  while (offset < fileSize) {
    const size = Math.min(chunkSize, fileSize - offset);
    chunks.push({
      index,
      size,
      offset,
      status: 'pending',
      progress: 0
    });
    offset += size;
    index++;
  }
  
  return chunks;
}

// Generate checksum (simplified - use crypto library in production)
export async function generateChecksum(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Validate file
export function validateFile(
  file: File,
  restrictions?: {
    maxSize?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
    blockedMimeTypes?: string[];
    blockedExtensions?: string[];
  }
): { valid: boolean; error?: string } {
  if (!restrictions) return { valid: true };
  
  // Check size
  if (restrictions.maxSize && file.size > restrictions.maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${formatFileSize(restrictions.maxSize)}`
    };
  }
  
  // Check MIME type
  if (restrictions.allowedMimeTypes && !restrictions.allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`
    };
  }
  
  if (restrictions.blockedMimeTypes && restrictions.blockedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is blocked`
    };
  }
  
  // Check extension
  const ext = getFileExtension(file.name);
  
  if (restrictions.allowedExtensions && !restrictions.allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension .${ext} is not allowed`
    };
  }
  
  if (restrictions.blockedExtensions && restrictions.blockedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension .${ext} is blocked`
    };
  }
  
  return { valid: true };
}

// Build file path
export function buildFilePath(parentPath: string, fileName: string): string {
  if (!parentPath || parentPath === '/') {
    return `/${fileName}`;
  }
  return `${parentPath}/${fileName}`.replace(/\/+/g, '/');
}

// Parse file path
export function parseFilePath(path: string): {
  directory: string;
  filename: string;
  basename: string;
  extension: string;
} {
  const normalizedPath = path.replace(/\\/g, '/');
  const lastSlash = normalizedPath.lastIndexOf('/');
  
  const directory = lastSlash === -1 ? '' : normalizedPath.substring(0, lastSlash);
  const filename = lastSlash === -1 ? normalizedPath : normalizedPath.substring(lastSlash + 1);
  
  const lastDot = filename.lastIndexOf('.');
  const basename = lastDot === -1 ? filename : filename.substring(0, lastDot);
  const extension = lastDot === -1 ? '' : filename.substring(lastDot + 1);
  
  return { directory, filename, basename, extension };
}

// Calculate storage usage percentage
export function calculateStorageUsage(quota: StorageQuota): number {
  if (quota.totalStorage === 0) return 0;
  return Math.round((quota.usedStorage / quota.totalStorage) * 100);
}

// Get storage status
export function getStorageStatus(quota: StorageQuota): 'good' | 'warning' | 'critical' | 'full' {
  const usage = calculateStorageUsage(quota);
  
  if (usage >= 100) return 'full';
  if (usage >= 95) return 'critical';
  if (usage >= 80) return 'warning';
  return 'good';
}

// Generate share link
export function generateShareLink(
  fileId: string,
  type: ShareLink['type'] = 'view',
  expiresInDays?: number
): ShareLink {
  const id = `share_${Date.now()}`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const link: ShareLink = {
    id,
    url: `${baseUrl}/share/${id}`,
    shortUrl: `${baseUrl}/s/${id.substring(0, 8)}`,
    type,
    createdAt: new Date().toISOString(),
    createdBy: 'current_user',
    downloadCount: 0
  };
  
  if (expiresInDays) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiresInDays);
    link.expiresAt = expiryDate.toISOString();
  }
  
  return link;
}

// Extract image metadata
export async function extractImageMetadata(file: File): Promise<Partial<FileMetadata>> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height,
        format: file.type.split('/')[1]
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({});
    };
    
    img.src = url;
  });
}

// Extract video metadata
export async function extractVideoMetadata(file: File): Promise<Partial<FileMetadata>> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: Math.round(video.duration),
        format: file.type.split('/')[1]
      });
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({});
    };
    
    video.src = url;
  });
}

// Calculate image optimization savings
export function calculateOptimizationSavings(
  originalSize: number,
  optimizedSize: number
): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
}

// Get optimal image dimensions
export function getOptimalImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  maintainAspectRatio: boolean = true
): { width: number; height: number } {
  if (!maintainAspectRatio) {
    return {
      width: Math.min(originalWidth, maxWidth),
      height: Math.min(originalHeight, maxHeight)
    };
  }
  
  const aspectRatio = originalWidth / originalHeight;
  
  let width = originalWidth;
  let height = originalHeight;
  
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

// Build CDN URL
export function buildCDNUrl(
  baseUrl: string,
  filePath: string,
  transformations?: Record<string, any>
): string {
  const url = new URL(`${baseUrl}${filePath}`);
  
  if (transformations) {
    Object.entries(transformations).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }
  
  return url.toString();
}

// Determine if file should be cached
export function shouldCacheFile(mimeType: string, size: number): boolean {
  // Don't cache large files (> 10MB)
  if (size > 10 * 1024 * 1024) return false;
  
  // Cache static assets
  const cacheableMimeTypes = [
    'image/',
    'text/css',
    'application/javascript',
    'application/json',
    'font/',
    'application/pdf'
  ];
  
  return cacheableMimeTypes.some(type => mimeType.includes(type));
}

// Get cache TTL based on file type
export function getCacheTTL(mimeType: string): number {
  const ttlMap: Record<string, number> = {
    'image/': 86400 * 30, // 30 days
    'text/css': 86400 * 7, // 7 days
    'application/javascript': 86400 * 7, // 7 days
    'font/': 86400 * 365, // 1 year
    'application/pdf': 86400, // 1 day
    'text/html': 3600, // 1 hour
    'application/json': 300 // 5 minutes
  };
  
  for (const [type, ttl] of Object.entries(ttlMap)) {
    if (mimeType.includes(type)) return ttl;
  }
  
  return 3600; // Default 1 hour
}

// Search files
export function searchFiles(
  files: FileItem[],
  search: FileSearch
): FileItem[] {
  let results = [...files];
  
  // Text search
  if (search.query) {
    const query = search.query.toLowerCase();
    results = results.filter(file => 
      file.name.toLowerCase().includes(query) ||
      file.displayName?.toLowerCase().includes(query) ||
      file.description?.toLowerCase().includes(query)
    );
  }
  
  // Type filter
  if (search.type) {
    results = results.filter(file => file.type === search.type);
  }
  
  // MIME type filter
  if (search.mimeTypes?.length) {
    results = results.filter(file => 
      search.mimeTypes!.includes(file.mimeType || '')
    );
  }
  
  // Extension filter
  if (search.extensions?.length) {
    results = results.filter(file => 
      search.extensions!.includes(file.extension || '')
    );
  }
  
  // Tag filter
  if (search.tags?.length) {
    results = results.filter(file => 
      search.tags!.some(tag => file.tags?.includes(tag))
    );
  }
  
  // Size filter
  if (search.minSize !== undefined) {
    results = results.filter(file => file.size >= search.minSize!);
  }
  
  if (search.maxSize !== undefined) {
    results = results.filter(file => file.size <= search.maxSize!);
  }
  
  // Date filters
  if (search.createdAfter) {
    results = results.filter(file => 
      new Date(file.createdAt) >= new Date(search.createdAfter!)
    );
  }
  
  if (search.createdBefore) {
    results = results.filter(file => 
      new Date(file.createdAt) <= new Date(search.createdBefore!)
    );
  }
  
  // Owner filter
  if (search.owner) {
    results = results.filter(file => file.createdBy === search.owner);
  }
  
  // Parent filter
  if (search.parentId !== undefined) {
    if (search.includeSubfolders) {
      // Would need recursive logic here
    } else {
      results = results.filter(file => file.parentId === search.parentId);
    }
  }
  
  // Trash filter
  if (!search.includeTrashed) {
    results = results.filter(file => !file.trashed);
  }
  
  // Sorting
  const sortBy = search.sortBy || 'name';
  const sortOrder = search.sortOrder || 'asc';
  
  results.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'updated':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case 'type':
        comparison = (a.mimeType || '').localeCompare(b.mimeType || '');
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Pagination
  if (search.offset !== undefined || search.limit !== undefined) {
    const offset = search.offset || 0;
    const limit = search.limit || results.length;
    results = results.slice(offset, offset + limit);
  }
  
  return results;
}

// Get provider health status
export function getProviderStatus(
  provider: StorageProvider
): 'healthy' | 'degraded' | 'down' {
  if (provider.status === 'error') return 'down';
  if (provider.status === 'inactive') return 'down';
  
  if (provider.usage && provider.limits?.maxStorageSize) {
    const usagePercent = (provider.usage.storageUsed / provider.limits.maxStorageSize) * 100;
    if (usagePercent > 95) return 'degraded';
  }
  
  return 'healthy';
}