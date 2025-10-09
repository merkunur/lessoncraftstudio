'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ImageItem {
  id: string;
  filename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  translations: Record<string, string>;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface Theme {
  id: string;
  name: string;
  displayNames: Record<string, string>;
  type: string;
  sortOrder: number;
  images: ImageItem[];
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
];

const CONTENT_TYPES = [
  { id: 'images', label: 'Images', icon: '🖼️' },
  { id: 'borders', label: 'Borders', icon: '🎨' },
  { id: 'backgrounds', label: 'Backgrounds', icon: '🌈' },
  { id: 'train', label: 'Train Templates', icon: '🚂' },
  { id: 'worksheet', label: 'Worksheet Templates', icon: '📄' },
];

export default function ImageLibraryPage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedType, setSelectedType] = useState('images');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showNewThemeModal, setShowNewThemeModal] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);

  // Fetch themes
  useEffect(() => {
    fetchThemes();
  }, [selectedType]);

  const fetchThemes = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken') || 'dev-bypass';

      const response = await fetch(`/api/admin/images/themes?type=${selectedType}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        // Skip auth redirect in development
        console.warn('Auth failed, continuing anyway for development');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch themes');
      }

      const data = await response.json();
      setThemes(data.themes);

      // Update selected theme if it exists in new data, or select first
      if (selectedTheme) {
        const updatedTheme = data.themes.find((t: Theme) => t.id === selectedTheme.id);
        setSelectedTheme(updatedTheme || (data.themes.length > 0 ? data.themes[0] : null));
      } else if (data.themes.length > 0) {
        setSelectedTheme(data.themes[0]);
      }
    } catch (error) {
      console.error('Failed to fetch themes:', error);
      setError('Failed to load themes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedTheme) return;

    try {
      setUploading(true);
      const token = localStorage.getItem('accessToken') || 'dev-bypass';

      const formData = new FormData();
      formData.append('themeId', selectedTheme.id);

      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      // Refresh themes
      await fetchThemes();

      alert(`Successfully uploaded ${data.images.length} images`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImages = async (imageIds: string[]) => {
    if (!confirm(`Delete ${imageIds.length} images?`)) return;

    try {
      const token = localStorage.getItem('accessToken') || 'dev-bypass';

      const response = await fetch('/api/admin/images/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete', imageIds }),
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setSelectedImages(new Set());
      await fetchThemes();
      alert('Images deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete images');
    }
  };

  const handleDeleteTheme = async (themeId: string) => {
    const theme = themes.find((t: Theme) => t.id === themeId);
    if (!theme) return;

    if (theme.images.length > 0) {
      alert('Cannot delete theme with images. Please delete all images first.');
      return;
    }

    if (!confirm(`Delete theme "${theme.displayNames.en}"?`)) return;

    try {
      const token = localStorage.getItem('accessToken') || 'dev-bypass';

      const response = await fetch(`/api/admin/images/themes/${themeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setSelectedTheme(null);
      await fetchThemes();
      alert('Theme deleted successfully');
    } catch (error) {
      console.error('Delete theme error:', error);
      alert('Failed to delete theme');
    }
  };

  const handleUpdateTranslations = async (imageId: string, translations: Record<string, string>) => {
    try {
      const token = localStorage.getItem('accessToken') || 'dev-bypass';

      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translations }),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      await fetchThemes();
      setEditingImage(null);
      alert('Translations updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update translations');
    }
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    setSelectedImages(newSelection);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Image Library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              📚 Image Library Manager
            </h1>
            <button
              onClick={() => router.push('/en/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Content Type Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {CONTENT_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.id);
                  setSelectedTheme(null);
                }}
                className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  selectedType === type.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Sidebar - Themes */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => setShowNewThemeModal(true)}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              + New Theme
            </button>
          </div>
          <div className="space-y-1 px-2">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedTheme?.id === theme.id
                    ? 'bg-indigo-100 text-indigo-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{theme.displayNames[selectedLanguage] || theme.name}</div>
                <div className="text-sm text-gray-500">{theme.images.length} images</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedTheme ? (
            <>
              {/* Toolbar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTheme.displayNames[selectedLanguage] || selectedTheme.name}
                  </h2>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDeleteTheme(selectedTheme.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete theme (requires no images)"
                  >
                    🗑️ Delete Theme
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedImages.size > 0 && (
                    <button
                      onClick={() => handleDeleteImages(Array.from(selectedImages))}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Selected ({selectedImages.size})
                    </button>
                  )}
                  <label className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer">
                    {uploading ? 'Uploading...' : '+ Upload Images'}
                    <input
                      type="file"
                      multiple
                      accept="image/svg+xml,image/png,image/jpeg,image/webp"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {selectedTheme.images.map(image => (
                  <div
                    key={image.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
                  >
                    <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-4">
                      <img
                        src={image.filePath}
                        alt={image.translations[selectedLanguage] || image.filename}
                        className="max-w-full max-h-full object-contain"
                      />
                      <input
                        type="checkbox"
                        checked={selectedImages.has(image.id)}
                        onChange={() => toggleImageSelection(image.id)}
                        className="absolute top-2 left-2 h-5 w-5 rounded border-gray-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {image.translations[selectedLanguage] || image.filename}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(image.fileSize / 1024).toFixed(1)} KB
                        {image.width && image.height && ` • ${image.width}×${image.height}`}
                      </p>
                      <button
                        onClick={() => setEditingImage(image)}
                        className="mt-2 w-full px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
                      >
                        Edit Translations
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a theme to view images</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Translations Modal */}
      {editingImage && (
        <TranslationModal
          image={editingImage}
          languages={LANGUAGES}
          onSave={(translations) => handleUpdateTranslations(editingImage.id, translations)}
          onClose={() => setEditingImage(null)}
        />
      )}

      {/* New Theme Modal */}
      {showNewThemeModal && (
        <NewThemeModal
          languages={LANGUAGES}
          contentType={selectedType}
          onClose={() => setShowNewThemeModal(false)}
          onSave={async (themeName, displayNames) => {
            try {
              const token = localStorage.getItem('accessToken') || 'dev-bypass';

              const response = await fetch('/api/admin/images/themes', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: themeName,
                  displayNames,
                  type: selectedType,
                }),
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create theme');
              }

              setShowNewThemeModal(false);
              await fetchThemes();
              alert('Theme created successfully!');
            } catch (error) {
              console.error('Create theme error:', error);
              alert(`Failed to create theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          }}
        />
      )}
    </div>
  );
}

// Translation Modal Component
function TranslationModal({
  image,
  languages,
  onSave,
  onClose,
}: {
  image: ImageItem;
  languages: typeof LANGUAGES;
  onSave: (translations: Record<string, string>) => void;
  onClose: () => void;
}) {
  const [translations, setTranslations] = useState(image.translations || {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Edit Translations</h3>
          <p className="text-sm text-gray-500 mt-1">{image.filename}</p>
        </div>
        <div className="p-6 space-y-4">
          {languages.map(lang => (
            <div key={lang.code}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang.flag} {lang.name}
              </label>
              <input
                type="text"
                value={translations[lang.code] || ''}
                onChange={(e) => setTranslations({ ...translations, [lang.code]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter ${lang.name} translation...`}
              />
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(translations)}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Save Translations
          </button>
        </div>
      </div>
    </div>
  );
}

// New Theme Modal Component
function NewThemeModal({
  languages,
  contentType,
  onClose,
  onSave,
}: {
  languages: typeof LANGUAGES;
  contentType: string;
  onClose: () => void;
  onSave: (themeName: string, displayNames: Record<string, string>) => void;
}) {
  const [themeName, setThemeName] = useState('');
  const [displayNames, setDisplayNames] = useState<Record<string, string>>({});

  const handleSave = () => {
    if (!themeName.trim()) {
      alert('Theme name is required');
      return;
    }

    // Check if all languages have translations
    const missingLanguages = languages.filter(lang => !displayNames[lang.code]?.trim());
    if (missingLanguages.length > 0) {
      alert(`Please provide translations for: ${missingLanguages.map(l => l.name).join(', ')}`);
      return;
    }

    onSave(themeName, displayNames);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Create New Theme</h3>
          <p className="text-sm text-gray-500 mt-1">Content Type: {contentType}</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme Name (Internal ID)
            </label>
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., animals, fruits, vehicles"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Display Names (All Languages)</h4>
            <div className="space-y-3">
              {languages.map(lang => (
                <div key={lang.code}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang.flag} {lang.name}
                  </label>
                  <input
                    type="text"
                    value={displayNames[lang.code] || ''}
                    onChange={(e) => setDisplayNames({ ...displayNames, [lang.code]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Theme name in ${lang.name}...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Create Theme
          </button>
        </div>
      </div>
    </div>
  );
}
