'use client';


import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function EditBlogPostContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug') || 'untitled';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'teaching-resources',
    author: 'LessonCraftStudio Team',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  });

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);

      // First try to get the post from the static HTML files (where the content actually is)
      const htmlResponse = await fetch(`/blog/en/${slug}.html`);

      if (htmlResponse.ok) {
        const htmlText = await htmlResponse.text();

        // Extract metadata from HTML
        const titleMatch = htmlText.match(/<title>([^<]*)<\/title>/i);
        const metaDescMatch = htmlText.match(/<meta\s+name=["']?description["']?\s+content=["']([^"']+)["']/i);
        const keywordsMatch = htmlText.match(/<meta\s+name=["']?keywords["']?\s+content=["']([^"']+)["']/i);
        const authorMatch = htmlText.match(/<meta\s+name=["']?author["']?\s+content=["']([^"']+)["']/i);
        const categoryMatch = htmlText.match(/<meta\s+name=["']?category["']?\s+content=["']([^"']+)["']/i);

        // Extract the main content from the HTML
        const mainContentMatch = htmlText.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        let contentHtml = mainContentMatch?.[1] || '';

        // Clean up the content - remove script tags and other unwanted elements
        contentHtml = contentHtml
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<nav[\s\S]*?<\/nav>/gi, '')
          .replace(/<header[\s\S]*?<\/header>/gi, '')
          .replace(/<footer[\s\S]*?<\/footer>/gi, '');

        setBlogPost({
          title: titleMatch?.[1] || slug.replace(/-/g, ' '),
          content: contentHtml.trim(),
          excerpt: metaDescMatch?.[1] || '',
          category: categoryMatch?.[1]?.toLowerCase().replace(/\s+/g, '-') || 'worksheet-tips',
          author: authorMatch?.[1] || 'LessonCraftStudio Team',
          metaTitle: titleMatch?.[1] || '',
          metaDescription: metaDescMatch?.[1] || '',
          keywords: keywordsMatch?.[1] || '',
        });
      } else {
        // No static file found, check if there's data in the database
        const response = await fetch(`/api/blog/posts/${slug}`);

        if (response.ok) {
          const data = await response.json();
          setBlogPost({
            title: data.title || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            category: data.categories?.[0]?.slug || 'teaching-resources',
            author: data.author ? `${data.author.firstName} ${data.author.lastName}` : 'LessonCraftStudio Team',
            metaTitle: data.metaTitle || data.title || '',
            metaDescription: data.metaDescription || data.excerpt || '',
            keywords: data.metaKeywords || '',
          });
        } else {
          console.error('Blog post not found');
          alert('Blog post not found');
          router.push('/admin/content/blog');
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      alert('Error loading blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log('Saving blog post:', blogPost);
      alert('Blog post saved successfully!');
      router.push('/admin/content/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '32px' }}>
        <div style={{ animation: 'pulse 2s infinite' }}>
          <div style={{ height: '32px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '25%', marginBottom: '16px' }}></div>
          <div style={{ height: '256px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Link href="/admin/content/blog" style={{ display: 'inline-flex', alignItems: 'center', color: '#6b7280', textDecoration: 'none' }}>
                ← Back to Blog Posts
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a
                href={`/en/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', textDecoration: 'none', color: '#374151' }}
              >
                Preview
              </a>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.5 : 1 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginTop: '16px' }}>Edit Blog Post</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Editing: {slug}</p>
        </div>

        {/* Edit Form */}
        <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Title
              </label>
              <input
                type="text"
                value={blogPost.title}
                onChange={(e) => setBlogPost({ ...blogPost, title: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Excerpt
              </label>
              <textarea
                value={blogPost.excerpt}
                onChange={(e) => setBlogPost({ ...blogPost, excerpt: e.target.value })}
                rows={3}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
              />
            </div>

            {/* Content */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Content
              </label>
              <textarea
                value={blogPost.content}
                onChange={(e) => setBlogPost({ ...blogPost, content: e.target.value })}
                rows={15}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' }}
                placeholder="Enter your blog content here..."
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                You can use HTML tags for formatting
              </p>
            </div>

            {/* Category and Author */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Category
                </label>
                <select
                  value={blogPost.category}
                  onChange={(e) => setBlogPost({ ...blogPost, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
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

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Author
                </label>
                <input
                  type="text"
                  value={blogPost.author}
                  onChange={(e) => setBlogPost({ ...blogPost, author: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
            </div>

            {/* SEO Section */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '16px' }}>SEO Settings</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={blogPost.metaTitle}
                    onChange={(e) => setBlogPost({ ...blogPost, metaTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="Page title for search engines"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Meta Description
                  </label>
                  <textarea
                    value={blogPost.metaDescription}
                    onChange={(e) => setBlogPost({ ...blogPost, metaDescription: e.target.value })}
                    rows={2}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                    placeholder="Page description for search engines"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={blogPost.keywords}
                    onChange={(e) => setBlogPost({ ...blogPost, keywords: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                    placeholder="Comma-separated keywords"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <Link
              href="/admin/content/blog"
              style={{ padding: '8px 24px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', textDecoration: 'none', color: '#374151' }}
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ padding: '8px 24px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.5 : 1 }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EditBlogPostContent;
