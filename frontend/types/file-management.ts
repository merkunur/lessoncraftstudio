// File Management System type definitions

export interface FileItem {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  type: 'file' | 'folder';
  mimeType?: string;
  extension?: string;
  size: number;
  path: string;
  parentId?: string;
  url?: string;
  cdnUrl?: string;
  thumbnailUrl?: string;
  metadata?: FileMetadata;
  permissions: FilePermissions;
  tags?: string[];
  starred?: boolean;
  trashed?: boolean;
  trashedAt?: string;
  version: number;
  versions?: FileVersion[];
  checksum?: string;
  encryptionStatus?: 'none' | 'at-rest' | 'in-transit' | 'both';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  accessedAt?: string;
  downloadCount?: number;
  viewCount?: number;
}

export interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number; // For videos/audio in seconds
  format?: string;
  colorSpace?: string;
  bitRate?: number;
  frameRate?: number;
  channels?: number; // Audio channels
  sampleRate?: number;
  codec?: string;
  artist?: string;
  album?: string;
  title?: string;
  year?: number;
  genre?: string;
  camera?: {
    make?: string;
    model?: string;
    lens?: string;
    focalLength?: number;
    aperture?: number;
    iso?: number;
    shutterSpeed?: string;
  };
  location?: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    placeName?: string;
  };
  document?: {
    pageCount?: number;
    wordCount?: number;
    author?: string;
    subject?: string;
    keywords?: string[];
    language?: string;
  };
}

export interface FilePermissions {
  owner: string;
  public: boolean;
  inherit: boolean;
  permissions: {
    read: string[]; // User/group IDs
    write: string[];
    delete: string[];
    share: string[];
    download: string[];
  };
  shareLinks?: ShareLink[];
  expiresAt?: string;
}

export interface ShareLink {
  id: string;
  url: string;
  shortUrl?: string;
  type: 'view' | 'download' | 'upload' | 'edit';
  password?: string;
  expiresAt?: string;
  maxDownloads?: number;
  downloadCount?: number;
  createdAt: string;
  createdBy: string;
  lastAccessedAt?: string;
  accessLog?: ShareAccess[];
}

export interface ShareAccess {
  timestamp: string;
  ip: string;
  userAgent: string;
  location?: {
    country?: string;
    city?: string;
  };
  action: 'view' | 'download';
}

export interface FileVersion {
  id: string;
  version: number;
  size: number;
  checksum: string;
  url?: string;
  changes?: string;
  createdAt: string;
  createdBy: string;
  restored?: boolean;
  restoredAt?: string;
  restoredBy?: string;
}

export interface FileUpload {
  id: string;
  fileId?: string;
  name: string;
  size: number;
  mimeType: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  speed?: number; // bytes per second
  remainingTime?: number; // seconds
  chunks?: UploadChunk[];
  error?: string;
  retryCount?: number;
  startedAt: string;
  completedAt?: string;
  resumable: boolean;
  uploadUrl?: string;
  sessionId?: string;
}

export interface UploadChunk {
  index: number;
  size: number;
  offset: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  progress: number;
  etag?: string;
  retryCount?: number;
}

export interface StorageProvider {
  id: string;
  name: string;
  type: 'local' | 's3' | 'azure' | 'gcs' | 'cloudinary' | 'custom';
  status: 'active' | 'inactive' | 'error';
  isDefault: boolean;
  configuration: {
    endpoint?: string;
    region?: string;
    bucket?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    containerName?: string;
    accountName?: string;
    accountKey?: string;
    projectId?: string;
    privateKey?: string;
    cloudName?: string;
    apiKey?: string;
    apiSecret?: string;
    basePath?: string;
    cdnUrl?: string;
    customHeaders?: Record<string, string>;
  };
  features: {
    versioning: boolean;
    encryption: boolean;
    compression: boolean;
    streaming: boolean;
    directUpload: boolean;
    signedUrls: boolean;
    cors: boolean;
  };
  limits?: {
    maxFileSize?: number;
    maxStorageSize?: number;
    allowedMimeTypes?: string[];
    blockedMimeTypes?: string[];
    maxVersions?: number;
    retentionDays?: number;
  };
  usage?: {
    storageUsed: number;
    bandwidthUsed: number;
    fileCount: number;
    requestCount: number;
  };
  costs?: {
    storageCostPerGB?: number;
    bandwidthCostPerGB?: number;
    requestCostPer1000?: number;
    currentMonthCost?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CDNConfiguration {
  id: string;
  name: string;
  provider: 'cloudflare' | 'fastly' | 'cloudfront' | 'akamai' | 'custom';
  status: 'active' | 'inactive' | 'error';
  isDefault: boolean;
  endpoints: CDNEndpoint[];
  configuration: {
    apiKey?: string;
    apiSecret?: string;
    accountId?: string;
    zoneId?: string;
    distributionId?: string;
    pullZone?: string;
    customDomain?: string;
  };
  caching: {
    defaultTTL: number; // seconds
    maxTTL: number;
    browserTTL: number;
    queryStringHandling: 'ignore' | 'include' | 'exclude';
    compressionEnabled: boolean;
    gzipEnabled: boolean;
    brotliEnabled: boolean;
  };
  security: {
    hotlinkProtection: boolean;
    tokenAuthentication: boolean;
    geoBlocking?: {
      enabled: boolean;
      allowedCountries?: string[];
      blockedCountries?: string[];
    };
    ddosProtection: boolean;
    wafEnabled: boolean;
  };
  optimization: {
    imageOptimization: boolean;
    autoWebP: boolean;
    lazyLoading: boolean;
    minification: boolean;
    http2Push: boolean;
  };
  analytics?: {
    requests: number;
    bandwidth: number;
    cacheHitRate: number;
    uniqueVisitors: number;
    topFiles: Array<{ path: string; requests: number; bandwidth: number }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CDNEndpoint {
  id: string;
  url: string;
  type: 'origin' | 'edge';
  region?: string;
  status: 'active' | 'inactive';
  health?: 'healthy' | 'degraded' | 'unhealthy';
  latency?: number; // milliseconds
}

export interface ImageOptimization {
  id: string;
  originalFileId: string;
  optimizedFileId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalSize: number;
  optimizedSize: number;
  savings: number; // percentage
  format: 'jpeg' | 'png' | 'webp' | 'avif' | 'svg';
  quality?: number; // 1-100
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  transformations?: ImageTransformation[];
  metadata?: {
    stripped: boolean;
    colorProfile?: string;
    orientation?: number;
  };
  createdAt: string;
  processedAt?: string;
  processingTime?: number; // milliseconds
}

export interface ImageTransformation {
  type: 'resize' | 'crop' | 'rotate' | 'flip' | 'blur' | 'sharpen' | 'grayscale' | 'watermark';
  parameters: Record<string, any>;
}

export interface FileOperation {
  id: string;
  type: 'copy' | 'move' | 'rename' | 'delete' | 'restore' | 'compress' | 'extract' | 'convert' | 'merge' | 'split';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  source: string[];
  destination?: string;
  options?: Record<string, any>;
  progress?: number;
  result?: {
    filesProcessed?: number;
    totalFiles?: number;
    bytesProcessed?: number;
    totalBytes?: number;
    outputFiles?: string[];
    errors?: string[];
  };
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export interface StorageQuota {
  id: string;
  userId?: string;
  organizationId?: string;
  type: 'user' | 'organization' | 'global';
  totalStorage: number; // bytes
  usedStorage: number;
  availableStorage: number;
  fileCount: number;
  maxFileSize: number;
  maxFiles?: number;
  quotaResets?: 'never' | 'daily' | 'weekly' | 'monthly';
  resetDate?: string;
  warnings: {
    at80Percent: boolean;
    at90Percent: boolean;
    at95Percent: boolean;
  };
  restrictions?: {
    allowedMimeTypes?: string[];
    blockedMimeTypes?: string[];
    allowedExtensions?: string[];
    blockedExtensions?: string[];
  };
  bandwidth?: {
    totalBandwidth: number;
    usedBandwidth: number;
    resetPeriod: 'daily' | 'weekly' | 'monthly';
    lastReset: string;
  };
}

export interface FileSearch {
  query?: string;
  type?: 'file' | 'folder';
  mimeTypes?: string[];
  extensions?: string[];
  tags?: string[];
  minSize?: number;
  maxSize?: number;
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  owner?: string;
  parentId?: string;
  includeSubfolders?: boolean;
  includeTrashed?: boolean;
  sortBy?: 'name' | 'size' | 'created' | 'updated' | 'type';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface FileBatch {
  id: string;
  operations: BatchOperation[];
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
  progress: number;
  successCount: number;
  failureCount: number;
  totalCount: number;
  startedAt: string;
  completedAt?: string;
  results?: BatchResult[];
}

export interface BatchOperation {
  id: string;
  type: 'delete' | 'move' | 'copy' | 'tag' | 'permission' | 'metadata';
  fileIds: string[];
  parameters?: Record<string, any>;
}

export interface BatchResult {
  operationId: string;
  fileId: string;
  success: boolean;
  error?: string;
}

export interface FileActivity {
  id: string;
  fileId: string;
  fileName: string;
  action: 'created' | 'viewed' | 'downloaded' | 'edited' | 'moved' | 'renamed' | 'deleted' | 'restored' | 'shared' | 'unshared' | 'tagged' | 'commented';
  userId: string;
  userName: string;
  userEmail: string;
  details?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}

export interface FileComment {
  id: string;
  fileId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  mentions?: string[];
  attachments?: string[];
  resolved?: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  replies?: FileComment[];
  createdAt: string;
  updatedAt: string;
  editedAt?: string;
}

export interface FileTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  mimeType: string;
  extension: string;
  thumbnailUrl?: string;
  templateUrl: string;
  size: number;
  variables?: TemplateVariable[];
  tags?: string[];
  usageCount: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'image' | 'color';
  defaultValue?: any;
  required: boolean;
  description?: string;
}

export interface FileWorkflow {
  id: string;
  name: string;
  description?: string;
  trigger: 'upload' | 'update' | 'tag' | 'schedule' | 'manual';
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
  enabled: boolean;
  lastRun?: string;
  runCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowCondition {
  type: 'mime_type' | 'size' | 'extension' | 'tag' | 'path' | 'metadata';
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than';
  value: any;
}

export interface WorkflowAction {
  type: 'optimize' | 'convert' | 'resize' | 'watermark' | 'move' | 'copy' | 'tag' | 'notify' | 'webhook';
  parameters: Record<string, any>;
  onSuccess?: WorkflowAction;
  onFailure?: WorkflowAction;
}