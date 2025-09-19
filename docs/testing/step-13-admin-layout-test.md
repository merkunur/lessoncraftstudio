# Step 13: Admin Layout & Navigation - Test Guide

## Overview
This step implements the admin dashboard layout with comprehensive navigation, route protection, and system overview.

## Components Created

### 1. Admin Layout Component
- `components/admin/admin-layout.tsx`: Main admin wrapper
- Collapsible sidebar navigation
- Top bar with search and notifications
- Quick stats display
- Mobile responsive design

### 2. Admin Authentication
- `lib/admin-auth.ts`: Admin route protection
- `requireAdmin()`: Check admin privileges
- `withAdminAuth()`: HOC for API routes

### 3. Admin Dashboard
- `app/admin/page.tsx`: Main dashboard view
- Statistics cards
- Recent activity feed
- Top users table
- Quick actions grid

### 4. Admin APIs
- `/api/admin/notifications`: System alerts and notifications

## Testing Instructions

### Prerequisites
1. Add `isAdmin` field to a test user:
```sql
-- In your database
UPDATE users SET is_admin = true WHERE email = 'admin@example.com';
```

2. Start development server:
```bash
cd frontend
npm run dev
```

### Test 1: Admin Access Control
1. Sign in as regular user
2. Try to access `/admin`
3. Verify:
   - Redirected to `/dashboard`
   - Error toast appears
   - No admin content visible

4. Sign in as admin user
5. Access `/admin`
6. Verify:
   - Admin dashboard loads
   - Sidebar navigation visible
   - Stats displayed

### Test 2: Navigation Structure
1. Click through each main menu item:
   - Dashboard
   - Users (expandable)
   - Subscriptions (expandable)
   - Content (expandable)
   - Worksheets (expandable)
   - Analytics (expandable)
   - Support (expandable)
   - Email (expandable)
   - Settings (expandable)

2. Verify:
   - Submenus expand/collapse
   - Active state highlights current page
   - Icons display correctly
   - Smooth transitions

### Test 3: Mobile Responsiveness
1. View on mobile (375px width)
2. Verify:
   - Hamburger menu appears
   - Sidebar hidden by default
   - Tap hamburger to open sidebar
   - Backdrop appears when sidebar open
   - Tap backdrop closes sidebar

### Test 4: Search Functionality
1. Type in search bar
2. Press Enter
3. Verify:
   - Redirects to `/admin/search?q=query`
   - Search query preserved in URL
   - (Search results page to be implemented)

### Test 5: Dashboard Stats
1. View main dashboard
2. Verify stat cards display:
   - Total Users with growth %
   - Monthly Revenue (MRR)
   - Active Subscriptions
   - Worksheets Today
3. Click each stat card
4. Verify navigation to detailed view

### Test 6: Recent Activity Feed
1. Check recent activity section
2. Verify displays:
   - Activity icons (colored by type)
   - Activity descriptions
   - Timestamps
   - "View all" link

### Test 7: Top Users Table
1. Check top users section
2. Verify displays:
   - User name and email
   - Worksheet count
   - Subscription tier badge
   - Hover effects on rows

### Test 8: Quick Actions
1. View quick actions grid
2. Click each action:
   - New Blog Post → `/admin/content/blog/new`
   - Add User → `/admin/users/new`
   - Email Campaign → `/admin/email/campaigns/new`
   - View Analytics → `/admin/analytics`
3. Verify navigation works

### Test 9: Notifications System
```bash
# Test notifications API
curl http://localhost:3000/api/admin/notifications \
  -H "Cookie: session-token=ADMIN_TOKEN"

# Response should include:
# {
#   "notifications": [...],
#   "systemAlerts": [...],
#   "totalUnread": 0
# }
```

### Test 10: Admin API Protection
```bash
# Test without auth
curl http://localhost:3000/api/admin/notifications
# Should return 401

# Test with non-admin user
curl http://localhost:3000/api/admin/notifications \
  -H "Cookie: session-token=USER_TOKEN"
# Should return 403
```

## Navigation Menu Structure

```
├── Dashboard
├── Users
│   ├── All Users
│   ├── Subscribers
│   ├── User Activity
│   └── Permissions
├── Subscriptions
│   ├── Overview
│   ├── Payments
│   ├── Plans
│   └── Invoices
├── Content
│   ├── Blog Posts
│   ├── Categories
│   ├── Tags
│   ├── Comments
│   └── Media
├── Worksheets
│   ├── Generators
│   ├── Templates
│   ├── Usage Stats
│   └── Samples
├── Analytics
│   ├── Overview
│   ├── Revenue
│   ├── Usage
│   └── Conversion
├── Support
│   ├── Tickets
│   ├── FAQ
│   └── Feedback
├── Email
│   ├── Templates
│   ├── Campaigns
│   └── Logs
└── Settings
    ├── General
    ├── Security
    ├── API Keys
    └── Webhooks
```

## Visual Tests

### Desktop View (1920x1080)
1. Sidebar width: 256px (16rem)
2. Main content area fills remaining space
3. Top bar height: 64px (4rem)
4. Stat cards in 4-column grid

### Tablet View (768px)
1. Sidebar becomes toggleable
2. Stat cards in 2-column grid
3. Activity and users sections stack

### Mobile View (375px)
1. Sidebar hidden by default
2. Hamburger menu visible
3. Stat cards in single column
4. All sections stack vertically

## Accessibility Tests

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Enter/Space activate buttons
   - Escape closes mobile menu

2. **Screen Reader**
   - Proper heading hierarchy
   - Descriptive link text
   - ARIA labels on icons

3. **Color Contrast**
   - Text meets WCAG AA standards
   - Focus indicators visible
   - Status colors distinguishable

## Performance Benchmarks

- Initial load: < 2 seconds
- Navigation transitions: < 100ms
- Search response: < 200ms
- Stats loading: < 500ms
- Sidebar toggle: Instant

## Success Criteria
✅ Admin authentication works
✅ Non-admins cannot access admin area
✅ Sidebar navigation functional
✅ Mobile responsive design
✅ Dashboard stats display
✅ Recent activity shows
✅ Top users table populated
✅ Quick actions navigate correctly
✅ Search bar functional
✅ Notifications API protected

## Common Issues & Solutions

### Issue: "Admin access required" error
- Ensure user has `isAdmin: true` in database
- Check authentication token is valid
- Verify admin middleware is working

### Issue: Sidebar won't open on mobile
- Check JavaScript console for errors
- Verify state management working
- Ensure click handlers attached

### Issue: Stats not loading
- Check API endpoints responding
- Verify data fetching logic
- Look for network errors

### Issue: Navigation not highlighting
- Check pathname matching logic
- Verify current page detection
- Ensure CSS classes applied

## Security Considerations

1. **Route Protection**
   - All admin routes check `isAdmin` flag
   - API endpoints use `withAdminAuth`
   - Sensitive data filtered

2. **Data Access**
   - Admin can view all user data
   - Audit logs for admin actions
   - Rate limiting on admin APIs

3. **Session Management**
   - Admin sessions expire after inactivity
   - Force re-authentication for sensitive actions
   - IP validation for admin accounts

## Next Steps
Step 14 will implement User Management Interface with:
- User list with search and filters
- User detail views
- Edit user capabilities
- Bulk user operations