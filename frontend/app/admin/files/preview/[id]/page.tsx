'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Edit3,
  FileText,
  Image,
  Video,
  Music,
  File,
  Code,
  Archive,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  Copy,
  ExternalLink,
  Star,
  Flag,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FileDetails {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    pages?: number;
    format?: string;
    colorSpace?: string;
    bitrate?: number;
    encoding?: string;
    author?: string;
    title?: string;
    createdDate?: string;
    modifiedDate?: string;
  };
  versions: Array<{
    id: string;
    version: number;
    size: number;
    uploadedAt: string;
    uploadedBy: string;
    comment?: string;
  }>;
  tags: string[];
  sharedWith: string[];
  publicUrl?: string;
  downloadCount: number;
  viewCount: number;
  lastViewed?: string;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
}

export default function FilePreview() {
  const params = useParams();
  const router = useRouter();
  const [file, setFile] = useState<FileDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<number>(0);

  useEffect(() => {
    fetchFileDetails();
  }, [params.id]);

  const fetchFileDetails = async () => {
    try {
      // Mock file details
      const mockFile: FileDetails = {
        id: params.id as string,
        name: 'Sample Document.pdf',
        mimeType: 'application/pdf',
        size: 2456789,
        url: 'https://example.com/files/sample.pdf',
        metadata: {
          pages: 24,
          format: 'PDF',
          author: 'John Doe',
          title: 'Annual Report 2024',
          createdDate: '2024-01-15',
          modifiedDate: '2024-11-28'
        },
        versions: [
          {
            id: '1',
            version: 3,
            size: 2456789,
            uploadedAt: '2024-11-28T10:00:00Z',
            uploadedBy: 'John Doe',
            comment: 'Final version with corrections'
          },
          {
            id: '2',
            version: 2,
            size: 2356789,
            uploadedAt: '2024-11-25T14:00:00Z',
            uploadedBy: 'Jane Smith',
            comment: 'Updated charts'
          },
          {
            id: '3',
            version: 1,
            size: 2256789,
            uploadedAt: '2024-11-20T09:00:00Z',
            uploadedBy: 'John Doe',
            comment: 'Initial upload'
          }
        ],
        tags: ['report', 'annual', '2024', 'finance'],
        sharedWith: ['user_2', 'user_3'],
        publicUrl: 'https://share.example.com/abc123',
        downloadCount: 45,
        viewCount: 234,
        lastViewed: '2024-11-28T15:00:00Z',
        createdAt: '2024-11-20T09:00:00Z',
        updatedAt: '2024-11-28T10:00:00Z',
        uploadedBy: 'John Doe'
      };

      setFile(mockFile);
    } catch (error) {
      console.error('Error fetching file:', error);
      toast.error('Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    toast.success('Downloading file...');
    // Implement download
  };

  const handleShare = () => {
    if (file?.publicUrl) {
      navigator.clipboard.writeText(file.publicUrl);
      toast.success('Share link copied to clipboard');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-8 h-8" />;
    if (mimeType.startsWith('video/')) return <Video className="w-8 h-8" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-8 h-8" />;
    if (mimeType === 'application/pdf') return <FileText className="w-8 h-8" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-8 h-8" />;
    if (mimeType.includes('code') || mimeType.includes('json')) return <Code className="w-8 h-8" />;
    return <File className="w-8 h-8" />;
  };

  const renderPreview = () => {
    if (!file) return null;

    if (file.mimeType.startsWith('image/')) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <img
            src={file.url}
            alt={file.name}
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease'
            }}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }

    if (file.mimeType === 'application/pdf') {
      return (
        <div className="h-full bg-gray-100 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
              <div className="text-center">
                {getFileIcon(file.mimeType)}
                <h3 className="mt-4 text-lg font-semibold">{file.name}</h3>
                <p className="text-gray-600 mt-2">
                  PDF Document • {file.metadata.pages} pages
                </p>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={handleDownload}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Download to View
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Open in Browser
                  </button>
                </div>
              </div>
            </div>
          </div>
          {file.metadata.pages && file.metadata.pages > 1 && (
            <div className="p-4 bg-white border-t flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm">
                Page {currentPage} of {file.metadata.pages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(file.metadata.pages!, currentPage + 1))}
                disabled={currentPage === file.metadata.pages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      );
    }

    if (file.mimeType.startsWith('video/')) {
      return (
        <div className="flex items-center justify-center h-full bg-black">
          <video
            controls
            className="max-w-full max-h-full"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <source src={file.url} type={file.mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (file.mimeType.startsWith('audio/')) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Music className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <audio controls className="w-full">
              <source src={file.url} type={file.mimeType} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      );
    }

    // Default preview for unsupported types
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          {getFileIcon(file.mimeType)}
          <h3 className="mt-4 text-lg font-semibold">{file.name}</h3>
          <p className="text-gray-600 mt-2">
            Preview not available for this file type
          </p>
          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Download File
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            {file && getFileIcon(file.mimeType)}
            <div>
              <h1 className="text-lg font-semibold">{file?.name}</h1>
              <p className="text-sm text-gray-600">
                {formatFileSize(file?.size || 0)} • {file?.metadata.format || file?.mimeType}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600 w-12 text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Print"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-lg transition-colors ${
              showInfo ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="File Info"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 overflow-auto">
          {renderPreview()}
        </div>

        {/* Info Panel */}
        {showInfo && file && (
          <div className="w-80 bg-white border-l overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* File Info */}
              <div>
                <h3 className="font-semibold mb-3">File Information</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Size:</dt>
                    <dd>{formatFileSize(file.size)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Type:</dt>
                    <dd>{file.metadata.format || file.mimeType}</dd>
                  </div>
                  {file.metadata.width && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions:</dt>
                      <dd>{file.metadata.width} × {file.metadata.height}px</dd>
                    </div>
                  )}
                  {file.metadata.pages && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Pages:</dt>
                      <dd>{file.metadata.pages}</dd>
                    </div>
                  )}
                  {file.metadata.duration && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Duration:</dt>
                      <dd>{Math.floor(file.metadata.duration / 60)}:{(file.metadata.duration % 60).toString().padStart(2, '0')}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Uploaded:</dt>
                    <dd>{new Date(file.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">By:</dt>
                    <dd>{file.uploadedBy}</dd>
                  </div>
                </dl>
              </div>

              {/* Versions */}
              <div>
                <h3 className="font-semibold mb-3">Version History</h3>
                <div className="space-y-2">
                  {file.versions.map((version, index) => (
                    <div
                      key={version.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedVersion === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedVersion(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">Version {version.version}</p>
                          <p className="text-xs text-gray-600 mt-1">{version.comment}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(version.size)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(version.uploadedAt).toLocaleDateString()} by {version.uploadedBy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {file.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-1 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-gray-400">
                    + Add Tag
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="font-semibold mb-3">Statistics</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Views:</dt>
                    <dd>{file.viewCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Downloads:</dt>
                    <dd>{file.downloadCount}</dd>
                  </div>
                  {file.lastViewed && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Last Viewed:</dt>
                      <dd>{new Date(file.lastViewed).toLocaleDateString()}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Actions */}
              <div>
                <h3 className="font-semibold mb-3">Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                    <Edit3 className="w-4 h-4" /> Rename
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                    <Copy className="w-4 h-4" /> Make a Copy
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Open Original
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                    <Star className="w-4 h-4" /> Add to Favorites
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                    <Flag className="w-4 h-4" /> Report Issue
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}