'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  Tag,
  Folder,
  Image,
  Link2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  FileText,
  Search,
  Settings,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Dynamic import for rich text editor to avoid SSR issues
const RichTextEditor = dynamic(
  () => import('@/components/admin/rich-text-editor'),
  { ssr: false }
);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishedAt: string | null;
  scheduledAt: string | null;
  categoryId: string | null;
  tagIds: string[];
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  allowComments: boolean;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const isNew = postId === 'new';

  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    publishedAt: null,
    scheduledAt: null,
    categoryId: null,
    tagIds: [],
    featuredImage: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    allowComments: true,
    featured: false,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSeoSettings, setShowSeoSettings] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNew) {
      fetchPost();
    }
    fetchCategories();
    fetchTags();
  }, [postId]);

  useEffect(() => {
    // Calculate word count and read time
    const text = post.content.replace(/<[^>]*>/g, ''); // Strip HTML
    const words = text.trim().split(/\s+/).length;
    setWordCount(words);
    setReadTime(Math.ceil(words / 200)); // Average 200 words per minute
  }, [post.content]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/posts/${postId}`);
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Post not found');
          router.push('/admin/content/blog');
          return;
        }
        throw new Error('Failed to fetch post');
      }

      const data = await response.json();
      setPost(data);
      setSelectedTags(data.tagIds);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/blog/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/admin/blog/tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (status?: 'draft' | 'published') => {
    if (!post.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setSaving(true);
    try {
      const method = isNew ? 'POST' : 'PATCH';
      const url = isNew
        ? '/api/admin/blog/posts'
        : `/api/admin/blog/posts/${postId}`;

      const postData = {
        ...post,
        status: status || post.status,
        tagIds: selectedTags,
        slug: post.slug || generateSlug(post.title),
        publishedAt: status === 'published' && !post.publishedAt
          ? new Date().toISOString()
          : post.publishedAt,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Failed to save post');

      const savedPost = await response.json();

      if (status === 'published') {
        toast.success('Post published successfully');
      } else {
        toast.success(isNew ? 'Post created successfully' : 'Post saved successfully');
      }

      if (isNew) {
        router.push(`/admin/content/blog/${savedPost.id}/edit`);
      } else {
        setPost(savedPost);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleSchedule = async () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select date and time');
      return;
    }

    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();

    setSaving(true);
    try {
      await handleSave('draft');

      const response = await fetch(`/api/admin/blog/posts/${postId}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduledAt }),
      });

      if (!response.ok) throw new Error('Failed to schedule post');

      toast.success('Post scheduled successfully');
      setShowScheduleModal(false);
      fetchPost();
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast.error('Failed to schedule post');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'blog');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      setPost({ ...post, featuredImage: url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin/content/blog"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to posts
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {isNew ? 'Create New Post' : 'Edit Post'}
              </h1>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSeoSettings(!showSeoSettings)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                SEO Settings
              </button>

              {!isNew && post.status === 'published' && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </a>
              )}

              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>

              <button
                onClick={() => setShowScheduleModal(true)}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </button>

              <button
                onClick={() => handleSave('published')}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
            <span>
              <FileText className="h-4 w-4 inline mr-1" />
              {wordCount} words
            </span>
            <span>
              <Clock className="h-4 w-4 inline mr-1" />
              {readTime} min read
            </span>
            {post.status && (
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                post.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : post.status === 'scheduled'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {post.status}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Column */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter post title..."
                />
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /blog/
                  </span>
                  <input
                    type="text"
                    id="slug"
                    value={post.slug}
                    onChange={(e) => setPost({ ...post, slug: e.target.value })}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setPost({ ...post, slug: generateSlug(post.title) });
                      }
                    }}
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="auto-generated-from-title"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the post..."
                />
              </div>

              {/* Content Editor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <RichTextEditor
                  content={post.content}
                  onChange={(content) => setPost({ ...post, content })}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Featured Image */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
              {post.featuredImage ? (
                <div className="relative">
                  <img
                    src={post.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setPost({ ...post, featuredImage: null })}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
                >
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Category */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
              <select
                value={post.categoryId || ''}
                onChange={(e) => setPost({ ...post, categoryId: e.target.value || null })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={post.allowComments}
                    onChange={(e) => setPost({ ...post, allowComments: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Allow comments</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={post.featured}
                    onChange={(e) => setPost({ ...post, featured: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured post</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings Modal */}
        {showSeoSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
                <button
                  onClick={() => setShowSeoSettings(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={post.seoTitle || ''}
                    onChange={(e) => setPost({ ...post, seoTitle: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={post.title || 'Page title for search engines'}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(post.seoTitle || post.title || '').length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Description
                  </label>
                  <textarea
                    value={post.seoDescription || ''}
                    onChange={(e) => setPost({ ...post, seoDescription: e.target.value })}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={post.excerpt || 'Description for search engines'}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(post.seoDescription || post.excerpt || '').length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={post.seoKeywords || ''}
                    onChange={(e) => setPost({ ...post, seoKeywords: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowSeoSettings(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Schedule Post</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedule}
                  disabled={!scheduleDate || !scheduleTime || saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}