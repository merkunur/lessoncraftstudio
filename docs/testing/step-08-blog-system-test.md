# Step 8: Blog System Foundation - Test Guide

## Overview
This step implements the blog system with database models, API endpoints, listing page, and post viewer.

## Components Created

### 1. Database Models
- BlogPost: Main blog post model with SEO fields
- BlogCategory: Categories for organizing posts
- BlogTag: Tags for content discovery
- BlogComment: Comment system with nested replies
- BlogLike: Like/favorite functionality

### 2. API Endpoints

#### Blog Posts API
- `GET /api/blog/posts` - List posts with pagination, search, filters
- `POST /api/blog/posts` - Create new post (admin only)
- `GET /api/blog/posts/[slug]` - Get single post with comments
- `PUT /api/blog/posts/[slug]` - Update post (admin only)
- `DELETE /api/blog/posts/[slug]` - Delete post (admin only)

#### Categories API
- `GET /api/blog/categories` - List all categories with post counts
- `POST /api/blog/categories` - Create category (admin only)

#### Tags API
- `GET /api/blog/tags` - List all tags with post counts
- `POST /api/blog/tags` - Create tag (admin only)

### 3. Frontend Pages

#### Blog Listing Page (`/blog`)
- Grid layout with 3 columns on desktop
- Search functionality
- Category and tag filtering
- Featured posts filter
- Pagination
- Post stats (views, comments, likes)

#### Blog Post Page (`/blog/[slug]`)
- Full post content display
- Featured image support
- Author attribution
- Reading time calculation
- View counter
- Like/unlike functionality
- Comment system with replies
- Related posts section
- Social sharing

## Testing Instructions

### Prerequisites
1. Ensure database is migrated:
```bash
cd frontend
npm run prisma:generate
npm run prisma:migrate
```

2. Start the development server:
```bash
npm run dev
```

### Test 1: Blog Listing Page
1. Navigate to http://localhost:3000/blog
2. Verify:
   - Page loads without errors
   - Shows "No articles found" message (no posts yet)
   - Search bar is visible
   - Category and Tag dropdowns are present
   - "Featured only" checkbox works

### Test 2: Create Test Data (Manual)
Since we don't have an admin interface yet, you can create test data using Prisma Studio:

1. Open Prisma Studio:
```bash
npm run prisma:studio
```

2. Create a test user if not exists

3. Create test categories:
   - Name: "Teaching Tips", Slug: "teaching-tips", Color: "#3B82F6"
   - Name: "Resources", Slug: "resources", Color: "#10B981"

4. Create test tags:
   - Name: "Elementary", Slug: "elementary"
   - Name: "Math", Slug: "math"
   - Name: "Reading", Slug: "reading"

5. Create test blog posts with:
   - Title, slug, excerpt, content
   - Set status to "published"
   - Set publishedAt to current date
   - Link to categories and tags
   - Set authorId to test user

### Test 3: Blog Post Features
1. Click on a blog post from the listing
2. Verify:
   - Post content displays correctly
   - Author name shows
   - Published date is formatted
   - View count increases on refresh
   - Categories and tags are clickable
   - Back to Blog link works

### Test 4: Interactive Features
1. **Like functionality:**
   - Click the heart icon
   - Count should update (requires auth for persistence)

2. **Comments:**
   - Shows "Sign in to comment" if not authenticated
   - Comment form appears if authenticated
   - Comments display with user names and dates

3. **Sharing:**
   - Click Share button
   - Should trigger native share or copy link

### Test 5: Search and Filters
1. On blog listing page:
   - Type in search box - filters posts in real-time
   - Select a category - shows only posts in that category
   - Select a tag - shows only posts with that tag
   - Check "Featured only" - shows only featured posts
   - Click "Clear all" - resets all filters

### Test 6: Pagination
1. If you have more than 9 posts:
   - Pagination controls appear
   - Page numbers work correctly
   - Previous/Next buttons are disabled appropriately

### Test 7: Related Posts
1. On a blog post page:
   - Scroll to bottom
   - Related posts section shows up to 3 posts
   - Posts are from same category
   - Current post is excluded

## API Testing with curl

### Get all posts:
```bash
curl http://localhost:3000/api/blog/posts
```

### Get posts with filters:
```bash
curl "http://localhost:3000/api/blog/posts?category=teaching-tips&limit=5"
```

### Get single post:
```bash
curl http://localhost:3000/api/blog/posts/your-post-slug
```

### Get categories:
```bash
curl http://localhost:3000/api/blog/categories
```

### Get tags:
```bash
curl http://localhost:3000/api/blog/tags
```

## Success Criteria
✅ Blog listing page loads and displays posts
✅ Individual blog posts are viewable
✅ Search functionality works
✅ Category and tag filtering works
✅ View counts increment
✅ Like buttons respond to clicks
✅ Comment section displays
✅ Share functionality triggers
✅ Related posts appear
✅ All API endpoints return proper JSON
✅ No console errors in browser

## Known Limitations (To be addressed in future steps)
- Admin interface for creating/editing posts not yet implemented
- Like persistence requires authentication (Step 4)
- Comment submission requires authentication
- No image upload for featured images yet
- Rich text editor for content not implemented
- SEO meta tags not yet rendered

## Next Steps
Step 9 will implement the Payment System Foundation with Stripe integration for subscription management.