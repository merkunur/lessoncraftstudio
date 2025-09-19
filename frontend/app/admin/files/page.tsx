'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Folder,
  File,
  Upload,
  Download,
  Trash2,
  Edit,
  Eye,
  Share2,
  Copy,
  Move,
  Search,
  Filter,
  Grid,
  List,
  Image,
  FileText,
  Film,
  Music,
  Archive,
  MoreVertical,
  ChevronRight,
  Home,
  Clock,
  Star,
  HardDrive,
  Cloud,
  Lock,
  Unlock,
  RefreshCw,
  Info,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size: number;
  path: string;
  parentId?: string;
  url?: string;
  thumbnailUrl?: string;
  created: string;
  modified: string;
  createdBy: string;
  modifiedBy: string;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    share: boolean;
  };
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    pages?: number;
    format?: string;
    compression?: string;
  };
  tags: string[];
  starred: boolean;
  shared: boolean;
  sharedWith?: string[];
  versions?: number;
  currentVersion?: number;
}

interface StorageInfo {
  used: number;
  total: number;
  fileCount: number;
  folderCount: number;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

const getFileIcon = (mimeType?: string, type?: string) => {
  if (type === 'folder') return Folder;
  if (!mimeType) return File;
  
  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.startsWith('video/')) return Film;
  if (mimeType.startsWith('audio/')) return Music;
  if (mimeType.includes('pdf')) return FileText;
  if (mimeType.includes('zip') || mimeType.includes('rar')) return Archive;
  
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function FileManagementPage() {
  const router = useRouter();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showFileInfo, setShowFileInfo] = useState<FileItem | null>(null);
  const [showShareDialog, setShowShareDialog] = useState<FileItem | null>(null);
  const [renameFile, setRenameFile] = useState<FileItem | null>(null);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    fetchFiles();
    fetchStorageInfo();
  }, [currentPath]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API call
      const mockFiles: FileItem[] = [
        {
          id: '1',
          name: 'Documents',
          type: 'folder',
          size: 0,
          path: '/Documents',
          created: '2024-01-15T10:00:00Z',
          modified: '2024-11-28T14:00:00Z',
          createdBy: 'John Doe',
          modifiedBy: 'John Doe',
          permissions: { read: true, write: true, delete: true, share: true },
          tags: ['important'],
          starred: true,
          shared: false,
          metadata: {}
        },
        {
          id: '2',
          name: 'Images',
          type: 'folder',
          size: 0,
          path: '/Images',
          created: '2024-01-15T10:00:00Z',
          modified: '2024-11-25T09:00:00Z',
          createdBy: 'John Doe',
          modifiedBy: 'Sarah Johnson',
          permissions: { read: true, write: true, delete: true, share: true },
          tags: ['media'],
          starred: false,
          shared: true,
          sharedWith: ['user2', 'user3'],
          metadata: {}
        },
        {
          id: '3',
          name: 'worksheet-template.pdf',
          type: 'file',
          mimeType: 'application/pdf',
          size: 2456789,
          path: '/worksheet-template.pdf',
          url: '/files/worksheet-template.pdf',
          thumbnailUrl: '/thumbnails/worksheet-template.jpg',
          created: '2024-11-20T08:00:00Z',
          modified: '2024-11-20T08:00:00Z',
          createdBy: 'Mike Wilson',
          modifiedBy: 'Mike Wilson',
          permissions: { read: true, write: false, delete: false, share: true },
          metadata: { pages: 5, format: 'A4' },
          tags: ['template', 'worksheet'],
          starred: false,
          shared: false,
          versions: 3,
          currentVersion: 3
        },
        {
          id: '4',
          name: 'banner-image.png',
          type: 'file',
          mimeType: 'image/png',
          size: 1234567,
          path: '/banner-image.png',
          url: '/files/banner-image.png',
          thumbnailUrl: '/thumbnails/banner-image.png',
          created: '2024-11-15T14:00:00Z',
          modified: '2024-11-18T10:00:00Z',
          createdBy: 'Emily Chen',
          modifiedBy: 'Emily Chen',
          permissions: { read: true, write: true, delete: true, share: true },
          metadata: { width: 1920, height: 1080, format: 'PNG' },
          tags: ['image', 'banner', 'marketing'],
          starred: true,
          shared: false,
          versions: 2,
          currentVersion: 2
        },
        {
          id: '5',
          name: 'tutorial-video.mp4',
          type: 'file',
          mimeType: 'video/mp4',
          size: 45678901,
          path: '/tutorial-video.mp4',
          url: '/files/tutorial-video.mp4',
          thumbnailUrl: '/thumbnails/tutorial-video.jpg',
          created: '2024-11-10T16:00:00Z',
          modified: '2024-11-10T16:00:00Z',
          createdBy: 'Sarah Johnson',
          modifiedBy: 'Sarah Johnson',
          permissions: { read: true, write: false, delete: false, share: true },
          metadata: { width: 1280, height: 720, duration: 300, format: 'MP4' },
          tags: ['video', 'tutorial', 'education'],
          starred: false,
          shared: true,
          sharedWith: ['public'],
          versions: 1,
          currentVersion: 1
        },
        {
          id: '6',
          name: 'data-export.csv',
          type: 'file',
          mimeType: 'text/csv',
          size: 567890,
          path: '/data-export.csv',
          url: '/files/data-export.csv',
          created: '2024-11-28T09:00:00Z',
          modified: '2024-11-28T09:00:00Z',
          createdBy: 'System',
          modifiedBy: 'System',
          permissions: { read: true, write: false, delete: true, share: false },
          metadata: { format: 'CSV' },
          tags: ['data', 'export'],
          starred: false,
          shared: false,
          versions: 1,
          currentVersion: 1
        }
      ];

      // Filter based on current path
      const pathStr = currentPath.join('/');
      const filteredFiles = mockFiles.filter(file => {
        if (pathStr === 'root') {
          return !file.parentId;
        }
        return file.parentId === pathStr;
      });

      setFiles(filteredFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const fetchStorageInfo = async () => {
    try {
      // Mock data - replace with API call
      const mockStorageInfo: StorageInfo = {
        used: 256789012,
        total: 1073741824, // 1GB
        fileCount: 234,
        folderCount: 45
      };
      setStorageInfo(mockStorageInfo);
    } catch (error) {
      console.error('Error fetching storage info:', error);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileUpload = async (files: File[]) => {
    setShowUploadPanel(true);
    
    const newUploads: UploadProgress[] = files.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload process
    for (let i = 0; i < newUploads.length; i++) {
      const upload = newUploads[i];
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploads(prev => prev.map(u => 
          u.file === upload.file 
            ? { ...u, progress, status: progress === 100 ? 'processing' : 'uploading' }
            : u
        ));
      }

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploads(prev => prev.map(u => 
        u.file === upload.file 
          ? { ...u, status: 'complete' }
          : u
      ));

      toast.success(`${upload.file.name} uploaded successfully`);
    }

    // Refresh files list
    fetchFiles();
  };

  const handleFileSelect = (fileId: string, multiSelect: boolean = false) => {
    if (multiSelect) {
      setSelectedFiles(prev => 
        prev.includes(fileId) 
          ? prev.filter(id => id !== fileId)
          : [...prev, fileId]
      );
    } else {
      setSelectedFiles([fileId]);
    }
  };

  const handleFileOpen = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(prev => [...prev, file.name]);
      setSelectedFiles([]);
    } else {
      // Open file preview
      setShowFileInfo(file);
    }
  };

  const handleDelete = async (fileIds: string[]) => {
    if (!confirm(`Delete ${fileIds.length} item(s)?`)) return;

    try {
      // In production, call API to delete files
      setFiles(prev => prev.filter(f => !fileIds.includes(f.id)));
      setSelectedFiles([]);
      toast.success(`${fileIds.length} item(s) deleted`);
    } catch (error) {
      toast.error('Failed to delete files');
    }
  };

  const handleRename = async () => {
    if (!renameFile || !newFileName) return;

    try {
      // In production, call API to rename file
      setFiles(prev => prev.map(f => 
        f.id === renameFile.id 
          ? { ...f, name: newFileName, modified: new Date().toISOString() }
          : f
      ));
      setRenameFile(null);
      setNewFileName('');
      toast.success('File renamed');
    } catch (error) {
      toast.error('Failed to rename file');
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      // In production, get download URL from API
      const link = document.createElement('a');
      link.href = file.url || '#';
      link.download = file.name;
      link.click();
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      toast.error('Failed to download file');
    }
  };

  const handleShare = async (file: FileItem, shareWith: string[]) => {
    try {
      // In production, call API to share file
      setFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { ...f, shared: true, sharedWith: shareWith }
          : f
      ));
      setShowShareDialog(null);
      toast.success('File shared successfully');
    } catch (error) {
      toast.error('Failed to share file');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || 
      (filterType === 'folders' && file.type === 'folder') ||
      (filterType === 'images' && file.mimeType?.startsWith('image/')) ||
      (filterType === 'documents' && file.mimeType?.includes('pdf')) ||
      (filterType === 'videos' && file.mimeType?.startsWith('video/'));
    
    return matchesSearch && matchesType;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    // Folders first
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.size - a.size;
      case 'modified':
        return new Date(b.modified).getTime() - new Date(a.modified).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">File Manager</h2>
          
          {/* Upload Button */}
          <label className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer mb-4">
            <Upload className="h-4 w-4" />
            Upload Files
            <input
              type="file"
              multiple
              onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
              className="hidden"
            />
          </label>

          {/* Navigation */}
          <div className="space-y-1">
            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Home className="h-4 w-4" />
              All Files
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Star className="h-4 w-4" />
              Starred
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Shared
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Trash
            </button>
          </div>
        </div>

        {/* Storage Info */}
        {storageInfo && (
          <div className="mt-auto p-4 border-t">
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-medium">
                  {Math.round((storageInfo.used / storageInfo.total) * 100)}%
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {formatFileSize(storageInfo.used)} of {formatFileSize(storageInfo.total)} used
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {storageInfo.fileCount} files, {storageInfo.folderCount} folders
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPath(['root'])}
                className="text-gray-600 hover:text-gray-900"
              >
                Root
              </button>
              {currentPath.slice(1).map((path, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <button
                    onClick={() => setCurrentPath(currentPath.slice(0, index + 2))}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {path}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {selectedFiles.length > 0 && (
                <>
                  <button
                    onClick={() => handleDownload(files.find(f => f.id === selectedFiles[0])!)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setShowShareDialog(files.find(f => f.id === selectedFiles[0])!)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFiles)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                </>
              )}
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Files</option>
                <option value="folders">Folders</option>
                <option value="images">Images</option>
                <option value="documents">Documents</option>
                <option value="videos">Videos</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Modified</option>
              </select>

              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* File Area */}
        <div
          className={`flex-1 p-6 overflow-auto ${
            dragActive ? 'bg-blue-50 border-2 border-dashed border-blue-400' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : sortedFiles.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No files found</p>
              <p className="text-sm text-gray-500 mt-1">Upload files or create folders to get started</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedFiles.map(file => {
                const Icon = getFileIcon(file.mimeType, file.type);
                const isSelected = selectedFiles.includes(file.id);
                
                return (
                  <div
                    key={file.id}
                    className={`relative group cursor-pointer ${
                      isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileSelect(file.id, e.ctrlKey || e.metaKey);
                    }}
                    onDoubleClick={() => handleFileOpen(file)}
                  >
                    <div className="p-4 hover:bg-gray-50 rounded-lg">
                      <div className="relative">
                        {file.type === 'file' && file.thumbnailUrl ? (
                          <img
                            src={file.thumbnailUrl}
                            alt={file.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                        ) : (
                          <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-2">
                            <Icon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        {file.shared && (
                          <div className="absolute top-1 right-1 p-1 bg-white rounded-full shadow">
                            <Share2 className="h-3 w-3 text-blue-600" />
                          </div>
                        )}
                        {file.starred && (
                          <div className="absolute top-1 left-1 p-1 bg-white rounded-full shadow">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.type === 'folder' 
                          ? 'Folder'
                          : formatFileSize(file.size)
                        }
                      </p>
                    </div>

                    {/* Context Menu */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFileInfo(file);
                        }}
                        className="p-1 bg-white rounded shadow hover:bg-gray-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Size</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Modified</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Modified By</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedFiles.map(file => {
                  const Icon = getFileIcon(file.mimeType, file.type);
                  const isSelected = selectedFiles.includes(file.id);
                  
                  return (
                    <tr
                      key={file.id}
                      className={`border-b hover:bg-gray-50 cursor-pointer ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                      onClick={(e) => {
                        handleFileSelect(file.id, e.ctrlKey || e.metaKey);
                      }}
                      onDoubleClick={() => handleFileOpen(file)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            {file.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {file.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {file.type === 'folder' ? '-' : formatFileSize(file.size)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(file.modified).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {file.modifiedBy}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {file.shared && <Share2 className="h-4 w-4 text-blue-600" />}
                          {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowFileInfo(file);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Drag Overlay */}
          {dragActive && (
            <div className="fixed inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center pointer-events-none z-50">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <Upload className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900">Drop files here to upload</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress Panel */}
      {showUploadPanel && uploads.length > 0 && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Uploads ({uploads.length})</h3>
            <button
              onClick={() => setShowUploadPanel(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-64 overflow-auto">
            {uploads.map((upload, idx) => (
              <div key={idx} className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {upload.file.name}
                  </p>
                  {upload.status === 'complete' && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                  {upload.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      upload.status === 'error' ? 'bg-red-600' :
                      upload.status === 'complete' ? 'bg-green-600' :
                      'bg-blue-600'
                    }`}
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {upload.status === 'uploading' && `Uploading... ${upload.progress}%`}
                  {upload.status === 'processing' && 'Processing...'}
                  {upload.status === 'complete' && 'Complete'}
                  {upload.status === 'error' && upload.error}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Info Modal */}
      {showFileInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">File Information</h3>
              <button
                onClick={() => setShowFileInfo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Preview */}
              {showFileInfo.type === 'file' && showFileInfo.thumbnailUrl && (
                <div className="mb-6">
                  <img
                    src={showFileInfo.thumbnailUrl}
                    alt={showFileInfo.name}
                    className="w-full max-h-64 object-contain rounded-lg bg-gray-100"
                  />
                </div>
              )}

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{showFileInfo.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <p className="text-gray-900">
                      {showFileInfo.type === 'folder' ? 'Folder' : showFileInfo.mimeType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <p className="text-gray-900">
                      {showFileInfo.type === 'folder' ? '-' : formatFileSize(showFileInfo.size)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-gray-900">
                      {new Date(showFileInfo.created).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modified</label>
                    <p className="text-gray-900">
                      {new Date(showFileInfo.modified).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                    <p className="text-gray-900">{showFileInfo.createdBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modified By</label>
                    <p className="text-gray-900">{showFileInfo.modifiedBy}</p>
                  </div>
                </div>

                {showFileInfo.metadata && Object.keys(showFileInfo.metadata).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metadata</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {Object.entries(showFileInfo.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1">
                          <span className="text-sm text-gray-600 capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-sm text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showFileInfo.tags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {showFileInfo.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDownload(showFileInfo)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      setRenameFile(showFileInfo);
                      setNewFileName(showFileInfo.name);
                      setShowFileInfo(null);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      setShowShareDialog(showFileInfo);
                      setShowFileInfo(null);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={() => {
                      handleDelete([showFileInfo.id]);
                      setShowFileInfo(null);
                    }}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}