'use client';

import React, { useState, useEffect } from 'react';

interface Translation {
  title: string;
  description: string;
}

interface PDFMetadata {
  translations: {
    [locale: string]: Translation;
  };
}

interface PDFTranslationEditorProps {
  fileName: string;
  slug: string;
  onClose: () => void;
}

const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'no', name: 'Norsk' },
  { code: 'fi', name: 'Suomi' }
];

export default function PDFTranslationEditor({ fileName, slug, onClose }: PDFTranslationEditorProps) {
  const [metadata, setMetadata] = useState<PDFMetadata>({
    translations: LOCALES.reduce((acc, locale) => ({
      ...acc,
      [locale.code]: { title: '', description: '' }
    }), {})
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState('en');

  useEffect(() => {
    // Load existing metadata
    fetchMetadata();
  }, [fileName, slug]);

  const fetchMetadata = async () => {
    try {
      const response = await fetch(`/api/blog/pdf-metadata?slug=${slug}&fileName=${fileName}`);
      if (response.ok) {
        const data = await response.json();
        setMetadata(data);
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/blog/pdf-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          fileName,
          metadata
        })
      });

      if (response.ok) {
        alert('Translations saved successfully!');
        onClose();
      } else {
        alert('Failed to save translations');
      }
    } catch (error) {
      console.error('Error saving metadata:', error);
      alert('Error saving translations');
    } finally {
      setSaving(false);
    }
  };

  const updateTranslation = (locale: string, field: 'title' | 'description', value: string) => {
    setMetadata(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [locale]: {
          ...prev.translations[locale],
          [field]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit PDF Translations</h2>
          <p className="text-sm text-gray-600 mt-1">File: {fileName}</p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Language tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b">
            {LOCALES.map(locale => (
              <button
                key={locale.code}
                onClick={() => setActiveLocale(locale.code)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeLocale === locale.code
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {locale.name}
              </button>
            ))}
          </div>

          {/* Translation fields for active locale */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title ({LOCALES.find(l => l.code === activeLocale)?.name})
              </label>
              <input
                type="text"
                value={metadata.translations[activeLocale]?.title || ''}
                onChange={(e) => updateTranslation(activeLocale, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter title in ${LOCALES.find(l => l.code === activeLocale)?.name}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description ({LOCALES.find(l => l.code === activeLocale)?.name})
              </label>
              <textarea
                value={metadata.translations[activeLocale]?.description || ''}
                onChange={(e) => updateTranslation(activeLocale, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder={`Enter description in ${LOCALES.find(l => l.code === activeLocale)?.name}`}
              />
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold">
                  {metadata.translations[activeLocale]?.title || `[No title for ${activeLocale}]`}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {metadata.translations[activeLocale]?.description || `[No description for ${activeLocale}]`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Translations'}
          </button>
        </div>
      </div>
    </div>
  );
}