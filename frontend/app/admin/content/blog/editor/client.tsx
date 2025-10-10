'use client';


import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Globe,
  Eye,
  Plus,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' }
];

interface Translation {
  locale: string;
  title: string;
  content: string;
  excerpt: string;
  exists: boolean;
}

function BlogEditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug') || 'untitled';

  const [currentLocale, setCurrentLocale] = useState('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [translations, setTranslations] = useState<Record<string, Translation>>({});
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'teaching-resources',
    author: 'LessonCraftStudio Team',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadAllTranslations();
  }, [slug]);

  const loadAllTranslations = async () => {
    setLoading(true);
    const loadedTranslations: Record<string, Translation> = {};

    for (const lang of LANGUAGES) {
      try {
        const response = await fetch(`/blog/${lang.code}/${slug}.html`);

        if (response.ok) {
          const htmlText = await response.text();

          // Extract content from HTML
          const titleMatch = htmlText.match(/<title>([^<]*)<\/title>/i);
          const metaDescMatch = htmlText.match(/<meta\s+name=["']?description["']?\s+content=["']([^"']+)["']/i);
          const articleMatch = htmlText.match(/<article>([\s\S]*?)<\/article>/i);

          loadedTranslations[lang.code] = {
            locale: lang.code,
            title: titleMatch?.[1] || '',
            excerpt: metaDescMatch?.[1] || '',
            content: articleMatch?.[1]?.trim() || '',
            exists: true
          };
        } else {
          loadedTranslations[lang.code] = {
            locale: lang.code,
            title: '',
            excerpt: '',
            content: '',
            exists: false
          };
        }
      } catch (error) {
        console.error(`Error loading ${lang.code} translation:`, error);
        loadedTranslations[lang.code] = {
          locale: lang.code,
          title: '',
          excerpt: '',
          content: '',
          exists: false
        };
      }
    }

    setTranslations(loadedTranslations);

    // Load the current locale's data into the form
    if (loadedTranslations[currentLocale]) {
      const current = loadedTranslations[currentLocale];
      setBlogPost(prev => ({
        ...prev,
        title: current.title,
        content: current.content,
        excerpt: current.excerpt,
        metaTitle: current.title,
        metaDescription: current.excerpt
      }));
    }

    setLoading(false);
  };

  const switchLocale = (locale: string) => {
    // Save current locale's data before switching
    setTranslations(prev => ({
      ...prev,
      [currentLocale]: {
        locale: currentLocale,
        title: blogPost.title,
        content: blogPost.content,
        excerpt: blogPost.excerpt,
        exists: true
      }
    }));

    // Switch to new locale
    setCurrentLocale(locale);

    // Load new locale's data
    const translation = translations[locale];
    if (translation) {
      setBlogPost(prev => ({
        ...prev,
        title: translation.title,
        content: translation.content,
        excerpt: translation.excerpt,
        metaTitle: translation.title,
        metaDescription: translation.excerpt
      }));
    } else {
      // Clear form for new translation
      setBlogPost(prev => ({
        ...prev,
        title: '',
        content: '',
        excerpt: '',
        metaTitle: '',
        metaDescription: ''
      }));
    }
  };

  const copyFromLanguage = (fromLocale: string) => {
    const source = translations[fromLocale];
    if (source && source.exists) {
      setBlogPost(prev => ({
        ...prev,
        title: source.title,
        content: source.content,
        excerpt: source.excerpt,
        metaTitle: source.title,
        metaDescription: source.excerpt
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSaved(false);

      // Save current locale's data
      const response = await fetch('/api/blog/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          locale: currentLocale,
          content: blogPost.content,
          metadata: {
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            category: blogPost.category,
            author: blogPost.author,
            metaTitle: blogPost.metaTitle || blogPost.title,
            metaDescription: blogPost.metaDescription || blogPost.excerpt,
            keywords: blogPost.keywords,
            date: blogPost.date
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      // Update translations cache
      setTranslations(prev => ({
        ...prev,
        [currentLocale]: {
          locale: currentLocale,
          title: blogPost.title,
          content: blogPost.content,
          excerpt: blogPost.excerpt,
          exists: true
        }
      }));

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError('Failed to save blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/content/blog"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog Posts
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href={`/${currentLocale}/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </a>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>Saving...</>
                ) : saved ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-sm text-gray-600 mt-1">Editing: {slug}</p>
        </div>

        {/* Language Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                    ${currentLocale === lang.code
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                  {translations[lang.code]?.exists && (
                    <span className="ml-2 text-green-500">●</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Copy from language helper */}
          {!translations[currentLocale]?.exists && (
            <div className="p-4 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-blue-700 mr-4">
                  No content for {LANGUAGES.find(l => l.code === currentLocale)?.name} yet.
                  Copy from:
                </span>
                {LANGUAGES.filter(l => l.code !== currentLocale && translations[l.code]?.exists).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => copyFromLanguage(lang.code)}
                    className="ml-2 px-3 py-1 bg-white border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50"
                  >
                    <Copy className="h-3 w-3 inline mr-1" />
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={blogPost.title}
                onChange={(e) => setBlogPost({ ...blogPost, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={blogPost.excerpt}
                onChange={(e) => setBlogPost({ ...blogPost, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (HTML)
              </label>
              <textarea
                value={blogPost.content}
                onChange={(e) => setBlogPost({ ...blogPost, content: e.target.value })}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your blog content here... (HTML is supported)"
              />
              <p className="mt-2 text-sm text-gray-600">
                You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.)
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={blogPost.category}
                  onChange={(e) => setBlogPost({ ...blogPost, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="worksheet-tips">Worksheet Tips</option>
                  <option value="teaching-resources">Teaching Resources</option>
                  <option value="educational-activities">Educational Activities</option>
                  <option value="learning-strategies">Learning Strategies</option>
                  <option value="curriculum-guides">Curriculum Guides</option>
                  <option value="parent-resources">Parent Resources</option>
                  <option value="seasonal-content">Seasonal Content</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={blogPost.author}
                  onChange={(e) => setBlogPost({ ...blogPost, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={blogPost.metaTitle}
                    onChange={(e) => setBlogPost({ ...blogPost, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave empty to use main title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={blogPost.metaDescription}
                    onChange={(e) => setBlogPost({ ...blogPost, metaDescription: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave empty to use excerpt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={blogPost.keywords}
                    onChange={(e) => setBlogPost({ ...blogPost, keywords: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Comma-separated keywords"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin/content/blog"
              className="px-6 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default BlogEditorContent;
