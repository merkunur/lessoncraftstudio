'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Image as ImageIcon, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BrandingSettings() {
  const [currentLogo, setCurrentLogo] = useState('/logo-lcs.png');
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 2MB' });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewLogo(reader.result as string);
      setMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setMessage({ type: 'error', text: 'Please select a file to upload' });
      return;
    }

    setIsUploading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('logo', fileInputRef.current.files[0]);

    try {
      const response = await fetch('/api/admin/branding/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Update logo with cache-busting parameter
      setCurrentLogo(data.logoUrl);
      setPreviewLogo(null);
      setMessage({ type: 'success', text: 'Logo updated successfully! The change may take a moment to reflect across all pages.' });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Force refresh the logo image
      window.location.reload();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to upload logo. Please try again.'
      });
      console.error('Logo upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelPreview = () => {
    setPreviewLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                Admin
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/admin/settings" className="text-gray-500 hover:text-gray-700">
                Settings
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Branding</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Branding Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your platform's visual identity and branding elements
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Logo Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Platform Logo</h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload a logo that represents your brand. Recommended dimensions: 200x50px
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Logo */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Current Logo</h3>
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src={currentLogo}
                      alt="Current Logo"
                      width={200}
                      height={50}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  This logo appears in the navigation bar and login pages
                </p>
              </div>

              {/* Upload New Logo */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Upload New Logo</h3>

                {previewLogo ? (
                  <div>
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center relative">
                      <button
                        onClick={cancelPreview}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:shadow-lg"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                      <div className="relative">
                        <img
                          src={previewLogo}
                          alt="Preview Logo"
                          className="max-w-full h-auto max-h-[50px]"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Logo
                          </>
                        )}
                      </button>
                      <button
                        onClick={cancelPreview}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="logo-upload"
                      className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border-2 border-dashed border-gray-300"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-3" />
                      <span className="text-sm font-medium text-gray-700">
                        Click to upload logo
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG, or SVG up to 2MB
                      </span>
                      <input
                        ref={fileInputRef}
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-xs font-medium text-blue-900 mb-1">Recommendations:</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Use a transparent background for better appearance</li>
                    <li>• Ensure text is readable at small sizes</li>
                    <li>• Maintain aspect ratio around 4:1 for best results</li>
                    <li>• SVG format recommended for scalability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Branding Options */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Additional Branding</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Favicon */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Favicon</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Small icon that appears in browser tabs
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Change Favicon
              </button>
            </div>

            {/* Brand Colors */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Brand Colors</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Primary and secondary colors used throughout the platform
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Customize Colors
              </button>
            </div>

            {/* Email Templates */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Templates</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Customize the look of system emails
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Edit Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}