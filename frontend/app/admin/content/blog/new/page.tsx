'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Search,
  FileText,
  Download,
  Plus,
  Check,
  AlertCircle,
  Languages,
  Upload,
  Tag,
  Trash2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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

interface BlogContent {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  publishDate: string;
  lastModified: string;
  category: string;
  language: string;
}


export default function NewBlogPost() {
  const [currentLang, setCurrentLang] = useState('en');
  const [category, setCategory] = useState('worksheet-tips');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'samples'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sharedPDFs, setSharedPDFs] = useState<any[]>([]);

  // Store content for each language
  const [translations, setTranslations] = useState<Record<string, BlogContent>>(
    LANGUAGES.reduce((acc, lang) => ({
      ...acc,
      [lang.code]: {
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        ogImage: '',
        canonicalUrl: '',
        publishDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        category: category,
        language: lang.code
      }
    }), {})
  );

  // Get current language content
  const currentContent = translations[currentLang];

  const updateTranslation = (field: keyof BlogContent, value: any) => {
    setTranslations(prev => ({
      ...prev,
      [currentLang]: {
        ...prev[currentLang],
        [field]: value,
        lastModified: new Date().toISOString().split('T')[0],
        category: category // Always keep category in sync
      }
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50); // Keep URLs reasonable
  };

  const handleTitleChange = (value: string) => {
    updateTranslation('title', value);

    // Auto-generate slug from title (only for current language)
    if (!currentContent.slug || currentContent.slug === '') {
      const slug = generateSlug(value);
      updateTranslation('slug', slug);

      // Auto-generate canonical URL
      const baseUrl = 'https://lessoncraftstudio.com';
      updateTranslation('canonicalUrl', `${baseUrl}/${currentLang}/blog/${slug}`);
    }

    // Auto-generate meta title if empty
    if (!currentContent.metaTitle) {
      updateTranslation('metaTitle', value.slice(0, 60));
    }
  };

  const handleKeywordInput = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k);
    updateTranslation('keywords', keywords);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const tempPDFs = Array.from(files).map(file => ({
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      file: file,
      isTemp: true
    }));

    setSharedPDFs([...sharedPDFs, ...tempPDFs]);
    toast.success(`${files.length} PDF(s) selected for upload`);

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePDF = (index: number) => {
    setSharedPDFs(sharedPDFs.filter((_, i) => i !== index));
  };


  const getSEOScore = () => {
    const content = currentContent;
    let score = 0;

    // Title checks (20 points)
    if (content.title) score += 10;
    if (content.title.length >= 30 && content.title.length <= 60) score += 10;

    // Meta title (15 points)
    if (content.metaTitle) score += 7;
    if (content.metaTitle.length >= 30 && content.metaTitle.length <= 60) score += 8;

    // Meta description (15 points)
    if (content.metaDescription) score += 7;
    if (content.metaDescription.length >= 120 && content.metaDescription.length <= 160) score += 8;

    // Keywords (10 points)
    if (content.keywords.length >= 3) score += 5;
    if (content.keywords.length >= 5) score += 5;

    // Content (20 points)
    if (content.content.length >= 300) score += 10;
    if (content.content.length >= 1000) score += 10;

    // Slug (10 points)
    if (content.slug) score += 10;

    // Open Graph Image (10 points)
    if (content.ogImage) score += 10;

    return score;
  };

  const getSEOColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTranslationStatus = (langCode: string) => {
    const content = translations[langCode];
    if (content.title && content.content) return 'complete';
    if (content.title || content.content) return 'partial';
    return 'empty';
  };

  const getTranslationProgress = () => {
    const completed = LANGUAGES.filter(lang => {
      const content = translations[lang.code];
      return content.title && content.content && content.metaTitle && content.metaDescription;
    }).length;
    return Math.round((completed / LANGUAGES.length) * 100);
  };

  const generateHTMLFile = (lang: string, content: BlogContent) => {
    // Generate static HTML file content
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.metaTitle || content.title}</title>
  <meta name="description" content="${content.metaDescription}">
  <meta name="keywords" content="${content.keywords.join(', ')}">
  <link rel="canonical" href="${content.canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="${content.metaTitle || content.title}">
  <meta property="og:description" content="${content.metaDescription}">
  <meta property="og:image" content="${content.ogImage}">
  <meta property="og:type" content="article">
  <meta property="article:published_time" content="${content.publishDate}">
  <meta property="article:modified_time" content="${content.lastModified}">

  <!-- Hreflang tags for all languages -->
  ${LANGUAGES.map(l =>
    `<link rel="alternate" hreflang="${l.code}" href="https://lessoncraftstudio.com/${l.code}/blog/${content.slug}">`
  ).join('\n  ')}

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${content.title}",
    "description": "${content.metaDescription}",
    "datePublished": "${content.publishDate}",
    "dateModified": "${content.lastModified}",
    "author": {
      "@type": "Organization",
      "name": "LessonCraftStudio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lessoncraftstudio.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${content.canonicalUrl}"
    },
    "image": "${content.ogImage}",
    "articleSection": "${content.category}",
    "inLanguage": "${lang}",
    "keywords": "${content.keywords.join(', ')}"
  }
  </script>

  <!-- Preconnect to optimize loading -->
  <link rel="preconnect" href="https://lessoncraftstudio.com">
  <link rel="dns-prefetch" href="https://lessoncraftstudio.com">
</head>
<body>
  <article data-language="${lang}" data-category="${content.category}">
    <h1>${content.title}</h1>
    <div class="content">${content.content}</div>

    ${sharedPDFs.length > 0 ? `
    <!-- Sample worksheets section -->
    <section class="sample-worksheets" data-category="${content.category}">
      <h2>${lang === 'en' ? 'Download Free Sample Worksheets' :
        lang === 'de' ? 'Kostenlose Arbeitsblätter herunterladen' :
        lang === 'fr' ? 'Télécharger des feuilles de travail gratuites' :
        lang === 'es' ? 'Descargar hojas de trabajo gratuitas' :
        lang === 'sv' ? 'Ladda ner gratis arbetsblad' :
        'Download Free Sample Worksheets'}</h2>
      ${sharedPDFs.map((w: any) => `
        <div class="worksheet-download">
          <h3>${w.fileName}</h3>
          <a href="/blog/samples/${content.slug}/${w.fileName}" download class="download-btn" data-worksheet="${w.fileName}">
            <span>Download PDF</span>
            <span class="file-size">(${w.fileSize})</span>
          </a>
        </div>
      `).join('')}
    </section>` : ''}
  </article>

  <!-- Minimal JS for tracking downloads -->
  <script>
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'download', {
            'event_category': 'worksheet',
            'event_label': this.dataset.worksheet
          });
        }
      });
    });
  </script>
</body>
</html>`;
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add blog metadata
      formData.append('translations', JSON.stringify(translations));
      formData.append('category', category);

      // Add PDF files
      sharedPDFs.forEach((worksheet: any, index: number) => {
        if (worksheet.file) {
          formData.append(`worksheet_${index}`, worksheet.file);
          formData.append(`worksheet_${index}_meta`, JSON.stringify({
            fileName: worksheet.fileName,
            fileSize: worksheet.fileSize
          }));
        }
      });

      // Generate HTML files for each language
      LANGUAGES.forEach(lang => {
        const content = translations[lang.code];
        if (content.title && content.content) {
          const htmlContent = generateHTMLFile(lang.code, content);
          const blob = new Blob([htmlContent], { type: 'text/html' });
          formData.append(`html_${lang.code}`, blob, `${content.slug}.html`);
        }
      });

      // In production, this would save to server
      // await fetch('/api/blog/save', { method: 'POST', body: formData });

      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Blog post saved as draft');
    } catch (error) {
      toast.error('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    const currentContent = translations[currentLang];
    if (!currentContent.title || !currentContent.content) {
      toast.error('Please add title and content before previewing');
      return;
    }

    // Generate preview HTML
    const previewHtml = `
<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentContent.metaTitle || currentContent.title}</title>
  <meta name="description" content="${currentContent.metaDescription}">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .meta { color: #666; margin: 20px 0; }
    .content { line-height: 1.6; }
    .samples { background: #f5f5f5; padding: 20px; margin-top: 30px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>${currentContent.title}</h1>
  <div class="meta">
    <span>Category: ${category}</span> |
    <span>Language: ${currentLang.toUpperCase()}</span> |
    <span>SEO Score: ${getSEOScore()}%</span>
  </div>
  <div class="content">${currentContent.content}</div>
  ${sharedPDFs.length > 0 ? `
  <div class="samples">
    <h2>Sample Worksheets</h2>
    ${sharedPDFs.map((w: any) => `
      <div>
        <strong>${w.fileName}</strong>
        ${w.fileName ? `<span>File: ${w.fileName} (${w.fileSize})</span>` : '<span>No file uploaded</span>'}
      </div>
    `).join('')}
  </div>` : ''}
</body>
</html>`;

    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(previewHtml);
      previewWindow.document.close();
    }
  };

  const handlePublish = async () => {
    setSaving(true);

    const seoScore = getSEOScore();
    if (seoScore < 60) {
      toast.error('Please improve SEO score to at least 60% before publishing');
      setSaving(false);
      return;
    }

    try {
      const completedLanguages = LANGUAGES.filter(l => translations[l.code].title && translations[l.code].content);

      if (completedLanguages.length === 0) {
        toast.error('Please complete at least one language version');
        setSaving(false);
        return;
      }

      // Generate slug from title if not set
      let slug = '';
      // Try to get slug from any completed language, prioritizing English
      for (const lang of ['en', ...completedLanguages.map(l => l.code)]) {
        if (translations[lang] && translations[lang].slug) {
          slug = translations[lang].slug;
          break;
        }
        if (translations[lang] && translations[lang].title) {
          slug = generateSlug(translations[lang].title);
          break;
        }
      }

      if (!slug) {
        slug = `blog-post-${Date.now()}`;
      }

      // Prepare data for each language
      const languages: Record<string, any> = {};
      for (const lang of completedLanguages) {
        const content = translations[lang.code];
        languages[lang.code] = {
          title: content.title,
          content: content.content,
          excerpt: content.excerpt,
          metaTitle: content.metaTitle || content.title,
          metaDescription: content.metaDescription || content.excerpt,
          keywords: content.keywords.join(','),
          category: category,
          author: 'LessonCraftStudio Team',
          date: new Date().toISOString().split('T')[0],
          readTime: `${Math.ceil((content.content || '').split(' ').length / 200)} min read`
        };
      }

      console.log('Publishing with slug:', slug);
      console.log('Languages data:', languages);

      // Publish to static files
      const response = await fetch('/api/blog/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: slug,
          languages
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to publish' }));
        throw new Error(error.error || 'Failed to publish blog post');
      }

      const result = await response.json();
      console.log('Publish result:', result);

      // Upload PDF files if any
      if (sharedPDFs.length > 0 && sharedPDFs.some(pdf => pdf.isTemp)) {
        const formData = new FormData();
        formData.append('slug', slug);
        sharedPDFs.forEach(pdf => {
          if (pdf.isTemp && pdf.file) {
            formData.append('pdfs', pdf.file);
          }
        });
        // Upload PDFs to the shared directory
        const uploadResponse = await fetch('/api/blog/upload-pdf', {
          method: 'POST',
          body: formData
        });

        if (!uploadResponse.ok) {
          console.error('Failed to upload PDF samples');
        }
      }

      // Invalidate cache
      await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'invalidate-cache' })
      });

      toast.success(`Blog post published in ${completedLanguages.length} languages! SEO Score: ${seoScore}%`);

      // Redirect to blog listing
      setTimeout(() => {
        window.location.href = '/admin/content/blog';
      }, 2000);
    } catch (error) {
      toast.error('Failed to publish blog post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Multi-Language Blog Post</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create SEO-optimized static HTML blog posts with sample worksheet PDFs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Translation Progress */}
              <div className="text-sm">
                <div className="flex items-center">
                  <Languages className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Completed Languages:</span>
                  <span className="ml-2 font-semibold">
                    {LANGUAGES.filter(l => translations[l.code].title && translations[l.code].content).length}/{LANGUAGES.length}
                  </span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getTranslationProgress()}%` }}
                  />
                </div>
              </div>

              {/* SEO Score */}
              <div className="text-sm">
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">SEO Score:</span>
                  <span className={`ml-2 font-semibold ${getSEOColor(getSEOScore())}`}>
                    {getSEOScore()}%
                  </span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      getSEOScore() >= 80 ? 'bg-green-600' :
                      getSEOScore() >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${getSEOScore()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-8">
          {/* Language Selector */}
          <div className="w-64">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Language Version</h3>
              <div className="space-y-2">
                {LANGUAGES.map((lang) => {
                  const status = getTranslationStatus(lang.code);
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setCurrentLang(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                        currentLang === lang.code
                          ? 'bg-blue-50 border border-blue-500'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </div>
                      {status === 'complete' && <Check className="h-4 w-4 text-green-500" />}
                      {status === 'partial' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-500 border-t pt-3">
                Add your translated HTML content for each language version manually
              </p>
            </div>

            {/* Category Selection */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  // Update all translations with new category
                  Object.keys(translations).forEach(lang => {
                    setTranslations(prev => ({
                      ...prev,
                      [lang]: { ...prev[lang], category: e.target.value }
                    }));
                  });
                }}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2 border"
              >
                <option value="worksheet-tips">Worksheet Tips</option>
                <option value="teaching-resources">Teaching Resources</option>
                <option value="educational-activities">Educational Activities</option>
                <option value="learning-strategies">Learning Strategies</option>
                <option value="curriculum-guides">Curriculum Guides</option>
                <option value="parent-resources">Parent Resources</option>
                <option value="seasonal">Seasonal Content</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                This category applies to all language versions
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    type="button"
                    onClick={() => setActiveTab('content')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'content'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FileText className="inline h-4 w-4 mr-2" />
                    Content
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('seo')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'seo'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Search className="inline h-4 w-4 mr-2" />
                    SEO & Metadata
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('samples')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'samples'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Download className="inline h-4 w-4 mr-2" />
                    Sample Worksheets ({sharedPDFs.length})
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Blog Title ({currentLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={currentContent.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder={`Enter title in ${LANGUAGES.find(l => l.code === currentLang)?.name}...`}
                      />
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                        URL Slug (same for all languages)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          /{currentLang}/blog/
                        </span>
                        <input
                          type="text"
                          id="slug"
                          value={currentContent.slug}
                          onChange={(e) => {
                            const newSlug = e.target.value;
                            // Update slug for all languages (they should be the same)
                            Object.keys(translations).forEach(lang => {
                              setTranslations(prev => ({
                                ...prev,
                                [lang]: { ...prev[lang], slug: newSlug }
                              }));
                            });
                          }}
                          className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                        Excerpt / Summary
                      </label>
                      <textarea
                        id="excerpt"
                        rows={3}
                        value={currentContent.excerpt}
                        onChange={(e) => updateTranslation('excerpt', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder="Brief summary that appears in blog listings..."
                      />
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Blog Content (HTML)
                      </label>
                      <textarea
                        id="content"
                        rows={15}
                        value={currentContent.content}
                        onChange={(e) => updateTranslation('content', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border font-mono text-sm"
                        placeholder="Paste your translated HTML content here..."
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Word count: {currentContent.content.split(/\s+/).filter(w => w).length} words
                        {currentContent.content.length < 300 &&
                          <span className="text-red-500 ml-2">• Need at least 300 characters for good SEO</span>
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-blue-900 mb-2">SEO Requirements</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className={currentContent.metaTitle && currentContent.metaTitle.length >= 30 && currentContent.metaTitle.length <= 60 ? 'line-through' : ''}>
                          ✓ Meta title: 30-60 characters
                        </li>
                        <li className={currentContent.metaDescription && currentContent.metaDescription.length >= 120 && currentContent.metaDescription.length <= 160 ? 'line-through' : ''}>
                          ✓ Meta description: 120-160 characters
                        </li>
                        <li className={currentContent.keywords.length >= 3 ? 'line-through' : ''}>
                          ✓ At least 3 keywords
                        </li>
                        <li className={currentContent.content.length >= 300 ? 'line-through' : ''}>
                          ✓ Content minimum 300 characters
                        </li>
                        <li className={currentContent.slug ? 'line-through' : ''}>
                          ✓ URL slug defined
                        </li>
                      </ul>
                    </div>

                    <div>
                      <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                        Meta Title ({currentContent.metaTitle?.length || 0}/60)
                      </label>
                      <input
                        type="text"
                        id="metaTitle"
                        value={currentContent.metaTitle}
                        onChange={(e) => updateTranslation('metaTitle', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder="Title that appears in search results..."
                        maxLength={60}
                      />
                    </div>

                    <div>
                      <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                        Meta Description ({currentContent.metaDescription?.length || 0}/160)
                      </label>
                      <textarea
                        id="metaDescription"
                        rows={3}
                        value={currentContent.metaDescription}
                        onChange={(e) => updateTranslation('metaDescription', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder="Description that appears in search results..."
                        maxLength={160}
                      />
                    </div>

                    <div>
                      <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        id="keywords"
                        value={currentContent.keywords.join(', ')}
                        onChange={(e) => handleKeywordInput(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder="worksheet, education, teaching, math, science..."
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentContent.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">
                        Open Graph Image URL (1200x630px recommended)
                      </label>
                      <input
                        type="text"
                        id="ogImage"
                        value={currentContent.ogImage}
                        onChange={(e) => updateTranslation('ogImage', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                        placeholder="https://lessoncraftstudio.com/images/blog/..."
                      />
                    </div>

                    <div>
                      <label htmlFor="canonical" className="block text-sm font-medium text-gray-700">
                        Canonical URL (auto-generated)
                      </label>
                      <input
                        type="text"
                        id="canonical"
                        value={currentContent.canonicalUrl}
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md bg-gray-50 px-3 py-2 border text-gray-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sample Worksheets Tab */}
                {activeTab === 'samples' && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-green-900 mb-2">PDF Worksheet Samples (Shared Across Languages)</h3>
                      <p className="text-sm text-green-700">
                        Upload PDF worksheets once and they'll be available for download in all language versions.
                        PDFs will be stored in <code>/blog/pdfs/[slug]/</code> for fast static serving.
                      </p>
                    </div>

                    {/* Show selected PDFs */}
                    {sharedPDFs.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selected PDFs (will be uploaded when you publish)
                        </label>
                        {sharedPDFs.map((pdf, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium">{pdf.fileName}</span>
                              <span className="text-xs text-gray-500 ml-2">({pdf.fileSize})</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePDF(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload new PDFs */}
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Select PDF Files to Upload
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        Maximum file size: 5MB per PDF. Supported format: PDF only.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePreview}
                    type="button"
                    className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview HTML
                  </button>
                  <span className="text-xs text-gray-500">
                    Files will be saved to: /public/blog/{currentLang}/{currentContent.slug}.html
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={saving || getSEOScore() < 60}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Publish Static HTML
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}