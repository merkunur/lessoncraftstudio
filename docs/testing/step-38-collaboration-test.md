# Step 38: Collaboration - Test Guide

## Overview
This step implements a comprehensive real-time collaboration system including workspaces, teams, document sharing, comments, mentions, presence tracking, video calls, whiteboards, and task management.

## Components Created

### 1. Collaboration Types
- `types/collaboration.ts`: Complete collaboration system types
- Workspace management and permissions
- Real-time session tracking
- Comments and mentions
- Activity feeds and presence
- Video calls and whiteboards
- Task management

### 2. Collaboration Utilities
- `lib/collaboration-utils.ts`: Real-time collaboration functions
- Permission checking and role management
- Document synchronization (OT)
- Presence calculation
- Activity tracking
- Cursor and selection management
- Task progress calculation

### 3. Collaboration Hub
- `app/collaboration/page.tsx`: Collaboration management UI
- Workspace overview with presence
- Document management
- Team member interface
- Task board with drag-and-drop
- Activity feed
- Real-time updates via WebSocket

## Testing Instructions

### Prerequisites
1. User logged in
2. WebSocket server running
3. At least one workspace created
4. Multiple browser sessions for testing

### Test 1: Workspace Creation
1. Navigate to /collaboration
2. Click "New Workspace"
3. Enter workspace details
4. Select workspace type
5. Configure settings
6. Create workspace

### Test 2: Workspace Overview
1. View workspace tab
2. Shows workspace name
3. Member count displayed
4. Active members shown
5. Settings accessible

### Test 3: Member Invitation
1. Click "Invite Members"
2. Enter email addresses
3. Select role for invitees
4. Add optional message
5. Send invitations

### Test 4: Member Roles
1. View team members
2. Roles displayed:
   - Owner
   - Admin
   - Editor
   - Viewer
   - Commenter
   - Guest
3. Change member role
4. Permissions update

### Test 5: Permission System
1. Test owner permissions
2. Test admin capabilities
3. Test editor access
4. Test viewer restrictions
5. Test guest limitations

### Test 6: Real-time Presence
1. Open multiple sessions
2. See online members
3. Status indicators:
   - Online (green)
   - Away (yellow)
   - Offline (gray)
4. Updates in real-time

### Test 7: Cursor Tracking
1. Open shared document
2. Multiple users edit
3. See other cursors
4. Cursor colors unique
5. Names on cursors

### Test 8: Selection Highlighting
1. Select text in document
2. Others see selection
3. Selection color matches user
4. Multiple selections shown
5. Overlaps handled

### Test 9: Document Creation
1. Click "New Document"
2. Select document type
3. Enter title
4. Document created
5. Opens for editing

### Test 10: Document Sharing
1. Open document
2. Click share button
3. Add collaborators
4. Set permissions:
   - Edit
   - Comment
   - View
5. Share link generated

### Test 11: Collaborative Editing
1. Multiple users edit
2. Changes sync instantly
3. No conflicts
4. Operational Transform works
5. History preserved

### Test 12: Comments System
1. Select text/element
2. Add comment
3. Comment appears
4. Thread created
5. Others can reply

### Test 13: Mentions
1. Type @ in comment
2. User list appears
3. Select user
4. Mention created
5. User notified

### Test 14: Comment Threads
1. View comment threads
2. Reply to comments
3. Resolve threads
4. Reopen if needed
5. Thread history shown

### Test 15: Reactions
1. React to comments
2. Emoji picker shown
3. Multiple reactions
4. Reaction count
5. Remove reaction

### Test 16: Activity Feed
1. View activity tab
2. Recent activities listed
3. Activity types:
   - Created
   - Updated
   - Commented
   - Shared
   - Completed
4. Timestamps shown
5. Auto-updates

### Test 17: Activity Filtering
1. Filter by type
2. Filter by user
3. Filter by date
4. Search activities
5. Clear filters

### Test 18: Task Creation
1. Click "New Task"
2. Enter task details
3. Set priority
4. Assign to member
5. Set due date

### Test 19: Task Board
1. View task board
2. Columns shown:
   - Todo
   - In Progress
   - Review
   - Done
3. Drag tasks between
4. Updates save

### Test 20: Task Assignment
1. Assign task to user
2. Multiple assignees
3. User notified
4. Shows in their list
5. Can reassign

### Test 21: Task Dependencies
1. Link related tasks
2. Set dependencies
3. Block/unblock logic
4. Dependency graph
5. Critical path shown

### Test 22: Video Calls
1. Start video call
2. Invite participants
3. Join with camera/mic
4. Screen sharing
5. Recording option

### Test 23: Video Controls
1. Mute/unmute audio
2. Enable/disable video
3. Screen share toggle
4. Participant list
5. Chat during call

### Test 24: Whiteboard
1. Open whiteboard
2. Drawing tools:
   - Pen
   - Shapes
   - Text
   - Sticky notes
3. Multiple users draw
4. Real-time sync

### Test 25: Whiteboard Collaboration
1. See other cursors
2. Simultaneous drawing
3. No conflicts
4. Undo/redo works
5. Save whiteboard

### Test 26: Version Control
1. Document versions saved
2. View version history
3. Compare versions
4. Restore old version
5. Version metadata

### Test 27: Document Locking
1. Lock document section
2. Others can't edit locked
3. Lock expires
4. Force unlock (admin)
5. Lock indicators shown

### Test 28: Workspace Settings
1. Access settings
2. Configure:
   - Default role
   - Guest access
   - Retention policy
   - Time zone
   - Language
3. Save settings
4. Changes apply

### Test 29: Team Management
1. View all members
2. Member details:
   - Name
   - Email
   - Role
   - Last active
   - Status
3. Bulk actions
4. Export member list

### Test 30: Workspace Limits
1. Check current usage
2. Limits displayed:
   - Members
   - Storage
   - Projects
   - Files
3. Upgrade prompts
4. Usage warnings

### Test 31: Notifications
1. Real-time notifications
2. Notification types:
   - Mentions
   - Comments
   - Task assignments
   - Invitations
3. Mark as read
4. Notification settings

### Test 32: Search
1. Search workspace
2. Search filters:
   - Documents
   - Comments
   - Tasks
   - Members
3. Results highlighted
4. Quick navigation

### Test 33: Mobile Experience
1. Responsive design
2. Touch gestures work
3. Mobile-optimized UI
4. Core features available
5. Performance good

### Test 34: Offline Support
1. Work offline
2. Local changes saved
3. Sync when online
4. Conflict resolution
5. Offline indicators

### Test 35: Export/Import
1. Export workspace
2. Export documents
3. Export format options
4. Import from backup
5. Data integrity maintained

### Test 36: Analytics
1. Collaboration metrics
2. Activity statistics
3. Member engagement
4. Document analytics
5. Export reports

### Test 37: Integration
1. Calendar integration
2. Email notifications
3. Slack/Teams webhooks
4. API access
5. Third-party apps

### Test 38: Security
1. End-to-end encryption
2. Access logs
3. Two-factor auth
4. Session management
5. Data encryption at rest

### Test 39: Performance
1. Fast document loading
2. Smooth real-time sync
3. Quick search results
4. Responsive UI
5. Handles many users

### Test 40: Accessibility
1. Keyboard navigation
2. Screen reader support
3. High contrast mode
4. Focus indicators
5. ARIA labels

## Performance Testing

### WebSocket Connection
```bash
# Test WebSocket connection
curl -i -N -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" \
  -H "Sec-WebSocket-Key: test" \
  http://localhost:3000/api/collaboration/ws
```

### Load Testing
```bash
# Simulate multiple users
for i in {1..10}; do
  curl -X POST /api/collaboration/join \
    -H "Content-Type: application/json" \
    -d '{"workspaceId": "ws_123", "userId": "user_'$i'"}' &
done
```

### Document Sync
```bash
# Send document change
curl -X POST /api/collaboration/sync \
  -H "Content-Type: application/json" \
  -d '{
    "documentId": "doc_123",
    "changes": [{"op": "insert", "position": 0, "text": "Hello"}]
  }'
```

## Performance Benchmarks
1. WebSocket latency: < 50ms
2. Document sync: < 100ms
3. Cursor updates: < 30ms
4. Comment post: < 200ms
5. Task update: < 150ms
6. Search results: < 300ms
7. Video call setup: < 2s
8. Whiteboard sync: < 100ms
9. Presence update: < 50ms
10. Activity feed: < 200ms

## Success Criteria
✅ Real-time collaboration works smoothly
✅ No data loss during concurrent edits
✅ Permissions enforced correctly
✅ Presence tracking accurate
✅ Comments and mentions functional
✅ Tasks manageable
✅ Video calls stable
✅ Whiteboard responsive
✅ Mobile experience good
✅ Performance targets met

## Common Issues & Solutions

### Issue: WebSocket disconnections
- Check firewall/proxy settings
- Verify WebSocket server running
- Review connection timeout settings
- Implement reconnection logic
- Monitor network stability

### Issue: Sync conflicts
- Verify OT algorithm implementation
- Check timestamp synchronization
- Review conflict resolution logic
- Test with network delays
- Monitor operation order

### Issue: Cursor positions wrong
- Check coordinate calculations
- Verify canvas/document dimensions
- Review scroll position handling
- Test with different screen sizes
- Monitor transformation matrix

### Issue: Permissions not enforced
- Review permission checking logic
- Verify role hierarchy
- Check API authorization
- Test edge cases
- Monitor permission changes

### Issue: Performance degradation
- Optimize WebSocket messages
- Implement message batching
- Add debouncing/throttling
- Review database queries
- Monitor memory usage

## Best Practices
1. Keep WebSocket messages small
2. Batch related operations
3. Implement proper error handling
4. Use optimistic UI updates
5. Cache frequently accessed data
6. Implement proper cleanup
7. Test with realistic scenarios
8. Monitor real-time metrics

## Collaboration Patterns
1. **Operational Transform**: For text collaboration
2. **CRDT**: For eventual consistency
3. **Locking**: For exclusive access
4. **Presence**: For awareness
5. **Permissions**: For access control
6. **Versioning**: For history
7. **Commenting**: For discussion
8. **Tasks**: For coordination

## Next Steps
Step 39 will implement Admin Dashboard with:
- System metrics and monitoring
- User management
- Content moderation
- Settings configuration
- Analytics and reporting

## Notes
- Real-time collaboration is complex
- WebSocket reliability crucial
- Conflict resolution essential
- Performance impacts UX significantly
- Security and permissions critical