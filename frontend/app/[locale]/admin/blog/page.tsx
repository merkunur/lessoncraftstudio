'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPDF {
  id: string;
  title: string;
  description: string;
  filename: string;
  filePath: string;
  fileSize: number;
  thumbnail: string | null;
  price: string;
  downloads: number;
  sortOrder: number;
}

interface BlogPost {
  id: string;
  slug: string;
  translations: Record<string, {
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
  }>;
  category: string;
  keywords: string[];
  featuredImage: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  viewsCount: number;
  pdfs: BlogPDF[];
  createdAt: string;
  updatedAt: string;
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
];

const CATEGORIES = [
  'teaching-resources',
  'worksheet-tips',
  'educational-activities',
  'learning-strategies',
  'curriculum-guides',
  'parent-resources',
  'seasonal-content',
];

export default function BlogManagerPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [editingContent, setEditingContent] = useState(false);
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/en/auth/signin');
        return;
      }

      const response = await fetch('/api/admin/blog/posts', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        router.push('/en/auth/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      alert('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (slug: string, title: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      // Create translations object with title for all languages
      const translations: any = {};
      LANGUAGES.forEach(lang => {
        translations[lang.code] = {
          title: lang.code === 'en' ? title : `${title} (${lang.name})`,
          excerpt: '',
          content: '',
          metaTitle: '',
          metaDescription: '',
        };
      });

      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          translations,
          category: 'worksheet-tips',
          keywords: [],
          status: 'draft',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      setShowNewPostModal(false);
      await fetchPosts();
      setSelectedPost(data.post);
      alert('Post created successfully');
    } catch (error) {
      console.error('Create post error:', error);
      alert('Failed to create post');
    }
  };

  const handleUpdatePost = async (updates: Partial<BlogPost>) => {
    if (!selectedPost) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/admin/blog/posts/${selectedPost.slug}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const data = await response.json();
      setSelectedPost(data.post);
      await fetchPosts();
      alert('Post updated successfully');
    } catch (error) {
      console.error('Update post error:', error);
      alert('Failed to update post');
    }
  };

  const handlePublish = async () => {
    if (!selectedPost) return;
    await handleUpdatePost({ status: 'published' });
  };

  const handleUploadPDF = async (formData: FormData) => {
    if (!selectedPost) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/admin/blog/posts/${selectedPost.slug}/pdfs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      await fetchPosts();
      const updatedPost = posts.find(p => p.id === selectedPost.id);
      if (updatedPost) setSelectedPost(updatedPost);
      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Upload PDF error:', error);
      alert('Failed to upload PDF');
    }
  };

  const handleFeaturedImageUpload = async (file: File) => {
    if (!selectedPost) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.url;

      // Update post with new featured image
      await handleUpdatePost({ featuredImage: imageUrl });
      setSelectedPost({ ...selectedPost, featuredImage: imageUrl });

      alert('Featured image uploaded successfully');
    } catch (error) {
      console.error('Upload featured image error:', error);
      alert('Failed to upload featured image');
    }
  };

  const handleFeaturedImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFeatured(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFeaturedImageUpload(file);
    } else {
      alert('Please drop an image file');
    }
  };

  const handleFeaturedImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFeaturedImageUpload(file);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Blog Manager...</p>
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
              📝 Blog Content Manager
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

      <div className="flex h-[calc(100vh-100px)]">
        {/* Sidebar - Posts List */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => setShowNewPostModal(true)}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              + New Blog Post
            </button>
          </div>
          <div className="space-y-1 px-2">
            {posts.map(post => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedPost?.id === post.id
                    ? 'bg-indigo-100 text-indigo-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium truncate">
                  {post.translations[selectedLanguage]?.title || post.slug}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-between mt-1">
                  <span className={`px-2 py-1 rounded text-xs ${
                    post.status === 'published' ? 'bg-green-100 text-green-700' :
                    post.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status}
                  </span>
                  <span>{post.pdfs.length} PDFs</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedPost ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Post Header */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedPost.translations[selectedLanguage]?.title || selectedPost.slug}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Slug: {selectedPost.slug}</p>
                  </div>
                  <div className="flex items-center space-x-2">
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
                    {selectedPost.status === 'draft' && (
                      <button
                        onClick={handlePublish}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={selectedPost.category}
                      onChange={(e) => handleUpdatePost({ category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status: <span className="font-bold text-indigo-600">{selectedPost.status}</span>
                    </label>
                    <p className="text-sm text-gray-500">Views: {selectedPost.viewsCount}</p>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image (Blog Post Thumbnail)
                  </label>

                  {/* Drag and Drop Area */}
                  <div
                    onDrop={handleFeaturedImageDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingFeatured(true);
                    }}
                    onDragLeave={() => setIsDraggingFeatured(false)}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDraggingFeatured
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 bg-gray-50 hover:border-indigo-400'
                    }`}
                  >
                    {selectedPost.featuredImage ? (
                      <div className="space-y-3">
                        <img
                          src={selectedPost.featuredImage}
                          alt="Featured"
                          className="max-h-48 mx-auto object-contain rounded-lg border-2 border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = '';
                            e.currentTarget.alt = 'Invalid image URL';
                          }}
                        />
                        <div className="flex gap-2 justify-center">
                          <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors">
                            Change Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFeaturedImageSelect}
                              className="hidden"
                            />
                          </label>
                          <button
                            onClick={() => handleUpdatePost({ featuredImage: null })}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="mt-4">
                          <label className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Drop an image here or click to upload
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFeaturedImageSelect}
                              className="hidden"
                            />
                          </label>
                          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional URL Input */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Or enter image URL:</p>
                    <input
                      type="text"
                      value={selectedPost.featuredImage || ''}
                      onChange={(e) => setSelectedPost({ ...selectedPost, featuredImage: e.target.value })}
                      onBlur={() => handleUpdatePost({ featuredImage: selectedPost.featuredImage })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    💡 This image will appear in the blog list and related articles sections
                  </p>
                </div>

                {/* Content Editor */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={selectedPost.translations[selectedLanguage]?.title || ''}
                      onChange={(e) => {
                        const newTranslations = { ...selectedPost.translations };
                        newTranslations[selectedLanguage] = {
                          ...newTranslations[selectedLanguage],
                          title: e.target.value,
                        };
                        setSelectedPost({ ...selectedPost, translations: newTranslations });
                      }}
                      onBlur={() => handleUpdatePost({ translations: selectedPost.translations })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea
                      value={selectedPost.translations[selectedLanguage]?.excerpt || ''}
                      onChange={(e) => {
                        const newTranslations = { ...selectedPost.translations };
                        newTranslations[selectedLanguage] = {
                          ...newTranslations[selectedLanguage],
                          excerpt: e.target.value,
                        };
                        setSelectedPost({ ...selectedPost, translations: newTranslations });
                      }}
                      onBlur={() => handleUpdatePost({ translations: selectedPost.translations })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label>
                    <textarea
                      value={selectedPost.translations[selectedLanguage]?.content || ''}
                      onChange={(e) => {
                        const newTranslations = { ...selectedPost.translations };
                        newTranslations[selectedLanguage] = {
                          ...newTranslations[selectedLanguage],
                          content: e.target.value,
                        };
                        setSelectedPost({ ...selectedPost, translations: newTranslations });
                      }}
                      onBlur={() => handleUpdatePost({ translations: selectedPost.translations })}
                      rows={15}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                      placeholder="Enter HTML content..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={selectedPost.translations[selectedLanguage]?.metaTitle || ''}
                        onChange={(e) => {
                          const newTranslations = { ...selectedPost.translations };
                          newTranslations[selectedLanguage] = {
                            ...newTranslations[selectedLanguage],
                            metaTitle: e.target.value,
                          };
                          setSelectedPost({ ...selectedPost, translations: newTranslations });
                        }}
                        onBlur={() => handleUpdatePost({ translations: selectedPost.translations })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                      <input
                        type="text"
                        value={selectedPost.translations[selectedLanguage]?.metaDescription || ''}
                        onChange={(e) => {
                          const newTranslations = { ...selectedPost.translations };
                          newTranslations[selectedLanguage] = {
                            ...newTranslations[selectedLanguage],
                            metaDescription: e.target.value,
                          };
                          setSelectedPost({ ...selectedPost, translations: newTranslations });
                        }}
                        onBlur={() => handleUpdatePost({ translations: selectedPost.translations })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PDFs Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📄 PDF Worksheets</h3>
                <PDFUploadForm onUpload={handleUploadPDF} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {selectedPost.pdfs.map(pdf => (
                    <PDFCard key={pdf.id} pdf={pdf} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a post to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <NewPostModal
          onClose={() => setShowNewPostModal(false)}
          onCreate={handleCreatePost}
        />
      )}
    </div>
  );
}

// New Post Modal Component
function NewPostModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (slug: string, title: string) => void;
}) {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!slug || !title) {
      alert('Slug and title are required');
      return;
    }
    onCreate(slug, title);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Blog Post</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="math-worksheet-tips"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Math Worksheet Tips"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

// PDF Upload Form Component
function PDFUploadForm({ onUpload }: { onUpload: (formData: FormData) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('Free');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!pdfFile || !title) {
      alert('PDF file and title are required');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    onUpload(formData);

    // Reset form
    setTitle('');
    setDescription('');
    setPrice('Free');
    setPdfFile(null);
    setThumbnailFile(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="font-medium text-gray-900 mb-3">Upload New PDF</h4>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Price (e.g., Free or $5.99)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <div>
          <label className="block text-xs text-gray-600 mb-1">PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
      >
        Upload PDF
      </button>
    </div>
  );
}

// PDF Card Component
function PDFCard({ pdf }: { pdf: BlogPDF }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        {pdf.thumbnail ? (
          <img src={pdf.thumbnail} alt={pdf.title} className="w-16 h-16 object-cover rounded" />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl">
            📄
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{pdf.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-2">{pdf.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {(pdf.fileSize / 1024).toFixed(1)} KB • {pdf.downloads} downloads
            </span>
            <span className="text-sm font-medium text-indigo-600">{pdf.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
