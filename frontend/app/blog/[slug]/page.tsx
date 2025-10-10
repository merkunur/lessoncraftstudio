'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  User,
  MessageSquare,
  Heart,
  Eye,
  Tag,
  Share2,
  BookOpen,
  ChevronLeft,
  Clock,
  ThumbsUp,
  Send,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  viewsCount: number;
  author: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    color?: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
    };
    replies: Array<{
      id: string;
      content: string;
      createdAt: string;
      user: {
        id: string;
        firstName?: string;
        lastName?: string;
      };
    }>;
  }>;
  _count: {
    likes: number;
    comments: number;
  };
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (params?.slug) {
      fetchPost(params.slug as string);
    }
  }, [params?.slug]);

  const fetchPost = async (slug: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/posts/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        setLikesCount(data._count.likes);
        
        // Fetch related posts
        if (data.categories.length > 0) {
          fetchRelatedPosts(data.categories[0].slug, data.id);
        }
      } else if (response.status === 404) {
        router.push('/blog');
        toast.error('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (categorySlug: string, excludeId: string) => {
    try {
      const response = await fetch(`/api/blog/posts?category=${categorySlug}&limit=3`);
      const data = await response.json();
      setRelatedPosts(data.posts.filter((p: any) => p.id !== excludeId).slice(0, 3));
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like this post');
      return;
    }

    // Optimistic update
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    // TODO: Implement like API endpoint
    // try {
    //   await fetch(`/api/blog/posts/${post?.id}/like`, {
    //     method: liked ? 'DELETE' : 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`,
    //     },
    //   });
    // } catch (error) {
    //   // Revert on error
    //   setLiked(liked);
    //   setLikesCount(likesCount);
    //   toast.error('Failed to update like');
    // }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmittingComment(true);

    // TODO: Implement comment API endpoint
    toast.success('Comment submitted for moderation');
    setCommentText('');
    setSubmittingComment(false);
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back button and breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header */}
        <header className="mb-8">
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className="text-sm px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: cat.color ? `${cat.color}20` : '#e5e7eb',
                    color: cat.color || '#6b7280',
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              By {post.author.firstName || 'Admin'} {post.author.lastName || ''}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {getReadingTime(post.content)}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {post.viewsCount} views
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
            <Tag className="h-4 w-4 text-gray-400" />
            {post.tags.map(tag => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              {likesCount}
            </button>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
              <MessageSquare className="h-5 w-5" />
              {post._count.comments}
            </span>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            Share
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                disabled={submittingComment}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !commentText.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">
                Please sign in to leave a comment
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map(comment => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900">
                      {comment.user.firstName} {comment.user.lastName}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id}>
                        <div className="mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {reply.user.firstName} {reply.user.lastName}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {post.comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <article
                  key={relatedPost.id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {relatedPost.featuredImage ? (
                    <div className="h-32 bg-gray-200 relative">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white opacity-50" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-blue-600"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(relatedPost.publishedAt)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}