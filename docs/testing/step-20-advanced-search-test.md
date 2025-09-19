# Step 20: Advanced Search and Filters - Test Guide

## Overview
This step implements a comprehensive global search system with advanced filtering, saved searches, search analytics, and multi-content type support for searching across all platform data.

## Components Created

### 1. Global Search Interface
- `app/admin/search/page.tsx`: Main search interface
- Multi-content type search (Users, Worksheets, Blogs, Emails, Tickets, Files)
- Real-time search with debouncing
- Advanced filter builder
- Saved searches management
- Search analytics sidebar

### 2. Search API
- `app/api/admin/search/route.ts`: Main search endpoint
- Advanced filtering with multiple operators
- Relevance scoring
- Aggregations and facets
- Pagination support
- Field selection

### 3. Saved Searches
- `app/api/admin/search/saved/route.ts`: Saved search management
- Personal and public searches
- Pinned searches
- Usage tracking
- Search sharing

### 4. Search Analytics
- `app/api/admin/search/analytics/route.ts`: Analytics tracking
- Search volume tracking
- Popular searches
- Zero-result queries
- User behavior analysis
- Click-through rate tracking

## Testing Instructions

### Prerequisites
1. Admin user must be logged in
2. Sample data available across all content types
3. Search index populated

### Test 1: Basic Search
1. Navigate to `/admin/search`
2. Type in search box:
   - Test "math" - should find worksheets and blogs
   - Test "john" - should find users
   - Test "ticket" - should find support tickets

3. Verify real-time results:
   - Results appear after 300ms delay
   - Loading indicator shows
   - Result count displayed

### Test 2: Content Type Tabs
1. Click content type tabs:
   - All Content (shows everything)
   - Users (filters to users only)
   - Worksheets (filters to worksheets)
   - Blog Posts
   - Emails
   - Subscriptions
   - Support Tickets
   - Files

2. Verify:
   - Tab shows active state (blue)
   - Result count in tab badge
   - Results filtered correctly

### Test 3: Search Results Display
1. Each result should show:
   - Content type icon and color
   - Title (clickable)
   - Description
   - Metadata (date, author, status)
   - Tags if applicable
   - Relevance percentage
   - Highlights

2. Click on result:
   - Navigates to item detail page
   - URL correct for content type

### Test 4: Advanced Filters
1. Click "Filters" button
2. Add filter:
   - Select field (Type, Status, Author, Tags, Date)
   - Select operator (Equals, Contains, Starts with, Ends with)
   - Enter value

3. Test multiple filters:
   - Add 2-3 filters
   - Verify AND logic applied
   - Check filter count badge

4. Clear filters:
   - "Clear All" button works
   - Individual filter removal (X button)

### Test 5: Sort Options
1. In filters panel, test sort by:
   - Relevance (default)
   - Newest First
   - Oldest First
   - Recently Updated
   - Alphabetical

2. Verify:
   - Results reorder correctly
   - Sort persists during search

### Test 6: Date Range Filter
1. Select date range:
   - All Time
   - Today
   - Last 7 Days
   - Last 30 Days
   - Last Year

2. Verify:
   - Results filtered by creation date
   - Count updates

### Test 7: Saved Searches
1. Perform a search with filters
2. Click "Save Search" button
3. Enter name when prompted
4. Verify saved search created

5. Click star icon to view saved searches:
   - List shows saved searches
   - Shows query, filters, usage count
   - Click to load saved search

### Test 8: Load Saved Search
1. From saved searches panel:
   - Click on saved search
   - Query loads in search box
   - Filters applied
   - Results show
   - Success toast message

### Test 9: Popular Searches
1. With empty search box:
   - Popular searches display
   - Shows search term and count
   - Click to execute search

2. Recent searches:
   - Shows below popular
   - Timestamp displayed
   - Click to repeat search

### Test 10: Search Analytics (Admin)
1. Click analytics button (bottom right)
2. Analytics sidebar shows:
   - Search volume chart (7 days)
   - Average results per search
   - Click-through rate
   - Top search terms with counts

### Test 11: Export Results
1. After searching, click "Export" button
2. Verify:
   - CSV file downloads
   - Contains result data
   - Proper formatting

### Test 12: No Results State
1. Search for nonsense text
2. Verify:
   - "No results found" message
   - Suggestion to adjust filters
   - Search icon displayed

### Test 13: Search Performance
1. Type quickly in search box
2. Verify:
   - Debouncing works (300ms delay)
   - No excessive API calls
   - Smooth typing experience

### Test 14: Filter Operators
1. Test each operator:
   - **Equals**: Exact match
   - **Contains**: Partial match
   - **Starts with**: Beginning match
   - **Ends with**: Ending match

2. Complex filters:
   - Multiple filters together
   - Different field types

### Test 15: API Testing
1. Test search API:
   ```
   POST /api/admin/search
   Body: {
     query: "math",
     type: "worksheet",
     filters: [],
     sort: "newest"
   }
   ```

2. Test saved search API:
   ```
   GET /api/admin/search/saved
   POST /api/admin/search/saved
   ```

3. Test analytics API:
   ```
   GET /api/admin/search/analytics?timeRange=7d
   ```

## Advanced Features

### Test 16: Relevance Scoring
1. Search for common term
2. Verify relevance percentages:
   - Title matches score higher (40%)
   - Description matches (30%)
   - Content matches (20%)
   - Metadata matches (10%)

### Test 17: Aggregations
1. After search, check aggregations:
   - Type counts
   - Status distribution
   - Top tags
   - Results properly categorized

### Test 18: Search Suggestions
1. Type partial query
2. Test autocomplete API:
   ```
   GET /api/admin/search/suggest?q=ma
   ```
3. Verify suggestions relevant

### Test 19: User Behavior Tracking
1. Perform several searches
2. Check analytics shows:
   - Search count increases
   - Query logged
   - Time tracked
   - Refinements detected

### Test 20: Zero-Result Queries
1. Search for non-existent terms
2. In analytics, verify:
   - Zero-result queries tracked
   - Listed separately
   - Count tracked

## Visual Tests

### Search Interface
- Clean, focused design
- Clear visual hierarchy
- Responsive layout
- Smooth animations

### Result Cards
- Consistent styling
- Clear type indicators
- Readable metadata
- Hover effects

### Filter Builder
- Intuitive controls
- Clear operators
- Visual feedback
- Easy removal

## Performance Benchmarks
1. Search response: < 500ms
2. Debounce delay: 300ms
3. Result rendering: < 200ms
4. Export generation: < 1 second
5. Analytics load: < 1 second

## Success Criteria
✅ Search returns relevant results
✅ All content types searchable
✅ Filters work correctly
✅ Saved searches persist
✅ Analytics track searches
✅ Export functionality works
✅ Performance meets benchmarks
✅ No console errors
✅ Responsive design works
✅ Keyboard navigation supported

## Common Issues & Solutions

### Issue: Search not returning results
- Check query syntax
- Verify index populated
- Check filter conflicts
- Review API response

### Issue: Filters not applying
- Ensure operator matches field type
- Check filter value format
- Verify field exists
- Clear and reapply

### Issue: Saved searches not loading
- Check user permissions
- Verify search still valid
- Clear browser cache
- Re-save search

### Issue: Analytics not updating
- Check tracking enabled
- Verify API calls
- Review time range
- Refresh analytics

## Search Tips
1. Use quotes for exact phrases
2. Combine multiple filters
3. Save frequently used searches
4. Use content type tabs to narrow
5. Check analytics for popular terms

## Next Steps
Step 21 will implement File Management System with:
- File upload and storage
- Image optimization
- Document preview
- File versioning
- CDN integration