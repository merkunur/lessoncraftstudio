# Step 23: Collaboration Features - Test Guide

## Overview
This step implements comprehensive team collaboration features including workspace creation, member management, role-based permissions, and shared resource management for collaborative educational content creation.

## Components Created

### 1. Team Workspace Interface
- `app/admin/teams/page.tsx`: Main teams dashboard
- Three-tab interface (My Teams, Invitations, Discover)
- Team cards with statistics
- Create team modal
- Team search and filtering

### 2. Team Management API
- `app/api/admin/teams/route.ts`: Team CRUD operations
- Team creation with settings
- Member management
- Activity logging
- Subscription tracking

### 3. Member Invitation System
- `app/api/admin/teams/invitations/route.ts`: Invitation management
- Single and batch invitations
- Expiration handling
- Accept/decline/cancel actions
- Invitation statistics

### 4. Role-Based Permissions
- `app/api/admin/teams/permissions/route.ts`: Permission system
- Five default roles (Owner, Admin, Editor, Member, Viewer)
- Custom role creation
- Permission assignment
- Resource-based access control

### 5. Shared Resources Management
- `app/api/admin/teams/resources/route.ts`: Resource sharing
- File/worksheet/template sharing
- Folder organization
- Activity tracking
- Collaborative editing

## Testing Instructions

### Prerequisites
1. Admin user must be logged in
2. Sample teams created
3. Multiple test users available

### Test 1: Team Dashboard Display
1. Navigate to `/admin/teams`
2. Verify display of:
   - Team cards with cover images
   - Member count
   - Resource count
   - Active members
   - Last activity
   - Subscription badge

### Test 2: Create New Team
1. Click "Create Team" button
2. Fill in:
   - Team name
   - Description
   - Team type (Education/Business/Personal/Nonprofit)
   - Visibility (Private/Public/Invite-only)
3. Click "Create Team"
4. Verify team appears in list

### Test 3: Team Search
1. Type in search box
2. Verify:
   - Real-time filtering
   - Matches team names
   - Matches descriptions
   - Clear button works

### Test 4: My Teams Tab
1. Ensure "My Teams" tab active
2. Verify shows only:
   - Teams you own
   - Teams you're member of
3. Click team card
4. Should navigate to team workspace

### Test 5: Invitations Tab
1. Click "Invitations" tab
2. View pending invitations:
   - Team name
   - Inviter name
   - Role offered
   - Message (if any)
   - Expiration date
3. Test "Accept" button
4. Test "Decline" button

### Test 6: Discover Tab
1. Click "Discover" tab
2. View public teams:
   - Only public teams shown
   - Join button available
   - Member/resource counts

### Test 7: Send Invitation
1. In team workspace
2. Click "Invite Members"
3. Enter:
   - Email address
   - Select role
   - Optional message
4. Send invitation
5. Verify success message

### Test 8: Batch Invitations
1. Click "Invite Multiple"
2. Enter multiple emails (comma-separated)
3. Select default role
4. Send all
5. Verify batch processing

### Test 9: Accept Invitation
1. As invited user
2. Go to Invitations tab
3. Click "Accept"
4. Verify:
   - Added to team
   - Invitation removed
   - Team appears in My Teams

### Test 10: Role Management
1. In team settings
2. View member list
3. Click role dropdown
4. Change member role:
   - Owner → Admin
   - Admin → Editor
   - Editor → Member
   - Member → Viewer
5. Verify permissions update

### Test 11: Create Custom Role
1. Go to Roles section
2. Click "Create Role"
3. Enter:
   - Role name
   - Display name
   - Description
   - Select permissions
4. Save role
5. Assign to member

### Test 12: Permission Testing
Test each role's abilities:
- **Owner**: Full control
- **Admin**: Manage team, no delete
- **Editor**: Create/edit resources
- **Member**: View and create personal
- **Viewer**: View only

### Test 13: Share Resource
1. In team workspace
2. Click "Share Resource"
3. Select:
   - Resource type
   - File/worksheet
   - Permissions
   - Tags
4. Share
5. Verify appears in team resources

### Test 14: Resource Organization
1. Create folder structure:
   - Root folder
   - Subfolders
   - Move resources
2. Test drag-and-drop
3. Verify path updates

### Test 15: Resource Activity
1. Open shared resource
2. Check activity log:
   - Created event
   - View events
   - Edit events
   - Download events
3. Verify user tracking

### Test 16: Resource Permissions
1. Test view permission
2. Test edit permission:
   - Can modify
   - Version increments
3. Test delete permission:
   - Only admin/owner
4. Test share permission

### Test 17: Team Settings
1. Go to team settings
2. Test toggles:
   - Allow member invites
   - Require approval
   - Auto-approve educators
   - Activity tracking
   - Email notifications
3. Verify settings save

### Test 18: Team Statistics
1. View team dashboard
2. Check statistics:
   - Total worksheets
   - Total downloads
   - Active members (24h)
   - Storage used
3. Verify accuracy

### Test 19: Activity Feed
1. View team activity
2. Should show:
   - Member joins
   - Resource shares
   - Settings changes
   - Invitations sent
3. Verify chronological order

### Test 20: Leave Team
1. As non-owner member
2. Go to team settings
3. Click "Leave Team"
4. Confirm
5. Verify:
   - Removed from team
   - Team removed from list

## API Testing

### Create Team
```bash
curl -X POST /api/admin/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Science Teachers",
    "description": "Collaborative science resources",
    "type": "education",
    "visibility": "private"
  }'
```

### Send Invitation
```bash
curl -X POST /api/admin/teams/invitations \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_1",
    "teamName": "Math Department",
    "email": "teacher@school.edu",
    "role": "editor",
    "message": "Join our team!"
  }'
```

### Assign Role
```bash
curl -X PUT /api/admin/teams/permissions/assign \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_1",
    "userId": "user_2",
    "roleId": "admin"
  }'
```

### Share Resource
```bash
curl -X POST /api/admin/teams/resources \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_1",
    "type": "worksheet",
    "name": "Algebra Practice",
    "worksheetId": "ws_123",
    "tags": ["math", "algebra"]
  }'
```

## Advanced Features

### Test 21: Subscription Limits
1. Check team plan:
   - Free: 5 members max
   - Team: 20 members
   - Enterprise: Unlimited
2. Try exceeding limit
3. Verify upgrade prompt

### Test 22: Public Team Discovery
1. Set team to public
2. Log out
3. Browse discover page
4. Verify:
   - Team visible
   - Limited info shown
   - Join requires login

### Test 23: Resource Versioning
1. Edit shared resource
2. Check version history:
   - Version number increments
   - Edit timestamp
   - Editor name
3. Compare versions

### Test 24: Collaborative Editing
1. Two users open same resource
2. User 1 edits
3. User 2 sees lock indicator
4. After save, lock released
5. User 2 can edit

### Test 25: Team Export
1. Go to team settings
2. Click "Export Team Data"
3. Select format:
   - CSV (members, resources)
   - JSON (full data)
4. Download file
5. Verify completeness

## Performance Benchmarks
1. Team list load: < 1 second
2. Member invitation: < 2 seconds
3. Resource sharing: < 1 second
4. Permission check: < 100ms
5. Activity feed: < 500ms

## Success Criteria
✅ Teams create successfully
✅ Invitations send and receive
✅ Roles assign correctly
✅ Permissions enforce properly
✅ Resources share seamlessly
✅ Activity tracks accurately
✅ Search and filter work
✅ No permission bypasses
✅ Performance targets met
✅ No console errors

## Common Issues & Solutions

### Issue: Invitation not received
- Check email address
- Verify not in spam
- Check expiration date
- Resend invitation

### Issue: Cannot edit resource
- Check role permissions
- Verify not locked
- Check team membership
- Review resource permissions

### Issue: Team not visible
- Check visibility setting
- Verify membership
- Check search filters
- Clear browser cache

### Issue: Permission denied
- Verify role assignment
- Check resource ownership
- Review team settings
- Contact team admin

## Collaboration Best Practices
1. Use descriptive team names
2. Set clear team guidelines
3. Organize resources in folders
4. Regular permission audits
5. Use tags for easy discovery
6. Monitor team activity
7. Regular member cleanup

## Next Steps
Step 24 will implement Real-time Features with:
- WebSocket connections
- Live collaboration
- Real-time notifications
- Presence indicators
- Chat functionality