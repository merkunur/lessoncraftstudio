'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';

export default function UploadPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({ type: null, message: '' });
  const [uploadedPages, setUploadedPages] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const languages = [
    { code: 'en', name: '🇬🇧 English' },
    { code: 'de', name: '🇩🇪 German (Deutsch)' },
    { code: 'fr', name: '🇫🇷 French (Français)' },
    { code: 'es', name: '🇪🇸 Spanish (Español)' },
    { code: 'it', name: '🇮🇹 Italian (Italiano)' },
    { code: 'pt', name: '🇵🇹 Portuguese (Português)' },
    { code: 'nl', name: '🇳🇱 Dutch (Nederlands)' },
    { code: 'sv', name: '🇸🇪 Swedish (Svenska)' },
    { code: 'da', name: '🇩🇰 Danish (Dansk)' },
    { code: 'no', name: '🇳🇴 Norwegian (Norsk)' },
    { code: 'fi', name: '🇫🇮 Finnish (Suomi)' },
  ];

  useEffect(() => {
    loadUploadedPages();
  }, [selectedLanguage]);

  const handleFile = async (file: File) => {
    setUploadStatus({ type: null, message: '' });

    if (!file.name.endsWith('.html')) {
      setUploadStatus({ type: 'error', message: 'Please upload an HTML file' });
      return;
    }

    setUploadStatus({ type: 'info', message: 'Uploading your page...' });

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const pageName = file.name.replace('.html', '').toLowerCase().replace(/[^a-z0-9]/g, '');

      try {
        const response = await fetch('/api/save-page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            language: selectedLanguage,
            pageName: pageName,
            content: content
          })
        });

        if (response.ok) {
          const data = await response.json();
          setUploadStatus({
            type: 'success',
            message: `✅ Page uploaded successfully! Available at: ${data.url}`
          });
          loadUploadedPages();
        } else {
          setUploadStatus({ type: 'error', message: 'Failed to upload page' });
        }
      } catch (error) {
        setUploadStatus({ type: 'error', message: 'An error occurred while uploading' });
      }
    };
    reader.readAsText(file);
  };

  const loadUploadedPages = async () => {
    try {
      const response = await fetch(`/api/save-page?language=${selectedLanguage}`);
      if (response.ok) {
        const data = await response.json();
        setUploadedPages(data.pages || []);
      }
    } catch (error) {
      console.error('Failed to load pages:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            📤 Simple Page Upload
          </h1>

          {/* Step 1: Language Selection */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
              Select Language
            </h2>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          {/* Step 2: Upload */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
              Upload HTML File
            </h2>
            <div
              className={`border-3 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-100'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="text-6xl mb-4">📁</div>
              <div className="text-xl font-medium mb-2">Drop your HTML file here</div>
              <div className="text-gray-500">or click to browse</div>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Choose File
              </button>
              <input
                id="file-input"
                type="file"
                accept=".html"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleFile(files[0]);
                  }
                }}
              />
            </div>
          </div>

          {/* Status Message */}
          {uploadStatus.type && (
            <div className={`mb-8 p-4 rounded-lg ${
              uploadStatus.type === 'success' ? 'bg-green-100 text-green-800' :
              uploadStatus.type === 'error' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {uploadStatus.message}
            </div>
          )}

          {/* Uploaded Pages */}
          <div className="p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">📄 Uploaded Pages</h2>
            {uploadedPages.length > 0 ? (
              <div className="space-y-3">
                {uploadedPages.map((page, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                    <div>
                      <div className="font-medium">{page.name}</div>
                      <div className="text-sm text-gray-500">{selectedLanguage.toUpperCase()}</div>
                    </div>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No pages uploaded yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}