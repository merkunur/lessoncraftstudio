# Step 37: Notifications - Test Guide

## Overview
This step implements a comprehensive notification system including push notifications, email notifications, in-app notifications, SMS notifications, and user preference management.

## Components Created

### 1. Notification Types
- `types/notifications.ts`: Complete notification system types
- Notification and channel types
- Preferences and templates
- Queue and scheduling
- Topics and subscriptions
- Rules and automation

### 2. Notification Utilities
- `lib/notification-utils.ts`: Notification processing functions
- Browser notification support
- Push subscription handling
- Notification formatting and grouping
- Preference filtering
- Sound playback
- Recurrence calculation

### 3. Notification Center
- `app/notifications/page.tsx`: Notification management UI
- Inbox with filtering and sorting
- Preference management
- Template configuration
- Analytics dashboard
- Real-time updates via WebSocket

## Testing Instructions

### Prerequisites
1. User logged in
2. Browser with notification support
3. Service worker registered
4. WebSocket server running

### Test 1: Notification Center
1. Navigate to /notifications
2. Shows notification list
3. Unread count displayed
4. Tabs available:
   - Inbox
   - Preferences
   - Templates
   - Analytics

### Test 2: Notification Display
1. View notifications in inbox
2. Shows title and message
3. Icon displayed
4. Time shown (relative)
5. Priority badge

### Test 3: Unread Indicators
1. Unread notifications highlighted
2. Blue background for unread
3. Dot indicator shown
4. Count in header
5. Updates on read

### Test 4: Mark as Read
1. Click notification
2. Marked as read
3. Background changes
4. Count updates
5. Persists on refresh

### Test 5: Bulk Selection
1. Checkbox for each
2. Select multiple
3. Selection count shown
4. Bulk actions appear
5. Clear selection works

### Test 6: Bulk Actions
1. Select notifications
2. Mark all as read
3. Delete selected
4. Actions execute
5. UI updates

### Test 7: Filter Options
1. Filter dropdown shown
2. Options:
   - All
   - Unread
   - By category
3. Results filtered
4. Count updates

### Test 8: Sort Options
1. Sort dropdown shown
2. Options:
   - Date
   - Priority
   - Type
   - Unread first
3. Order changes

### Test 9: Group Options
1. Group dropdown shown
2. Options:
   - None
   - By type
   - By category
   - By date
3. Groups displayed

### Test 10: Notification Actions
1. Action buttons shown
2. Primary/danger styles
3. Click opens URL
4. Event tracked
5. Button states

### Test 11: Priority Display
1. Priority badge shown
2. Color coding:
   - Urgent: Red
   - High: Orange
   - Medium: Yellow
   - Low: Gray
3. Sort by priority

### Test 12: Browser Permissions
1. Permission request shown
2. Grant/deny options
3. Status displayed
4. Re-request option
5. Falls back gracefully

### Test 13: Push Notifications
1. Enable push option
2. Subscribe to push
3. Subscription saved
4. Test notification
5. Arrives on device

### Test 14: Push Notification Display
1. Title shown
2. Body text
3. Icon displayed
4. Actions available
5. Click opens app

### Test 15: Email Notifications
1. Email channel enabled
2. Email sent
3. Template used
4. Variables replaced
5. Tracking works

### Test 16: SMS Notifications
1. SMS channel enabled
2. Phone number set
3. Message sent
4. Character limit
5. Delivery confirmed

### Test 17: In-App Notifications
1. Real-time delivery
2. Toast/banner shown
3. Sound plays
4. Auto-dismiss option
5. Click to view

### Test 18: WebSocket Connection
1. Connection established
2. Real-time updates
3. Reconnection on drop
4. Message received
5. UI updates live

### Test 19: Channel Preferences
1. View preferences tab
2. Channels listed
3. Toggle on/off
4. Configure each
5. Save preferences

### Test 20: Category Preferences
1. Categories listed
2. Enable/disable
3. Per-category channels
4. Priority filtering
5. Frequency settings

### Test 21: Quiet Hours
1. Enable quiet hours
2. Set start/end time
3. Select days
4. Exceptions for urgent
5. Timezone handling

### Test 22: Frequency Limits
1. Set max per hour
2. Set max per day
3. Limits enforced
4. Batching option
5. Similar grouping

### Test 23: Notification Sound
1. Sound enabled
2. Different sounds per type
3. Volume control
4. Mute option
5. Custom sounds

### Test 24: Template Management
1. View templates tab
2. Template list
3. Create template
4. Edit template
5. Variables shown

### Test 25: Template Variables
1. Define variables
2. Types supported
3. Default values
4. Required marking
5. Preview with data

### Test 26: Notification Scheduling
1. Schedule notification
2. Set date/time
3. Recurrence options
4. Cancel scheduled
5. Edit schedule

### Test 27: Recurrence Rules
1. Once
2. Daily
3. Weekly
4. Monthly
5. Custom rules

### Test 28: Topics/Subscriptions
1. View topics
2. Subscribe/unsubscribe
3. Topic notifications
4. Mute topic
5. Topic preferences

### Test 29: Notification Rules
1. Create rule
2. Set trigger
3. Add conditions
4. Define actions
5. Enable/disable

### Test 30: Rule Triggers
1. Event-based
2. Schedule-based
3. Threshold-based
4. Webhook-based
5. Manual trigger

### Test 31: Analytics Dashboard
1. View analytics tab
2. Total notifications
3. Delivery rates
4. Engagement rates
5. Channel breakdown

### Test 32: Engagement Metrics
1. Read rate
2. Click rate
3. Dismiss rate
4. Response time
5. Channel preference

### Test 33: Performance Metrics
1. Delivery time
2. Queue length
3. Failed deliveries
4. Retry attempts
5. Cost tracking

### Test 34: Notification Export
1. Export notifications
2. Date range
3. Format options
4. Include metadata
5. Download file

### Test 35: Notification Search
1. Search box
2. Search by text
3. Filter results
4. Highlight matches
5. Clear search

### Test 36: Notification Groups
1. Similar grouped
2. Expand/collapse
3. Group count
4. Group actions
5. Summary shown

### Test 37: Delivery Status
1. Status tracking
2. Sent/delivered
3. Failed with reason
4. Retry attempts
5. Manual retry

### Test 38: Multi-language
1. Notifications localized
2. Correct language
3. RTL support
4. Date formatting
5. Number formatting

### Test 39: Accessibility
1. Screen reader support
2. Keyboard navigation
3. Focus indicators
4. ARIA labels
5. High contrast

### Test 40: Mobile Experience
1. Responsive design
2. Touch gestures
3. Swipe actions
4. Mobile notifications
5. App integration

## Performance Testing

### Send Notification
```bash
# Send in-app notification
curl -X POST /api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "type": "info",
    "title": "Test Notification",
    "message": "This is a test"
  }'
```

### Push Subscription
```bash
# Subscribe to push
curl -X POST /api/notifications/push/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://fcm.googleapis.com/...",
    "keys": {...}
  }'
```

### Update Preferences
```bash
# Update preferences
curl -X PUT /api/notifications/preferences \
  -H "Content-Type: application/json" \
  -d '{
    "channels": [{"type": "email", "enabled": true}]
  }'
```

## Performance Benchmarks
1. Notification delivery: < 100ms
2. Push notification: < 500ms
3. Email sending: < 2 seconds
4. SMS delivery: < 3 seconds
5. WebSocket latency: < 50ms
6. Preference save: < 200ms
7. Bulk operations: < 1 second
8. Analytics query: < 500ms

## Success Criteria
✅ Notifications deliver reliably
✅ All channels work
✅ Preferences respected
✅ Real-time updates work
✅ Quiet hours enforced
✅ Frequency limits work
✅ Templates render correctly
✅ Analytics accurate
✅ Mobile notifications work
✅ Performance targets met

## Common Issues & Solutions

### Issue: Push notifications not working
- Check browser support
- Verify HTTPS
- Check service worker
- Review permissions
- Test VAPID keys

### Issue: Notifications not real-time
- Check WebSocket connection
- Verify server running
- Review firewall rules
- Check authentication
- Monitor connection drops

### Issue: Email notifications delayed
- Check email queue
- Review provider limits
- Verify templates
- Check spam filters
- Monitor bounces

### Issue: SMS not delivered
- Verify phone number
- Check country support
- Review character limit
- Check provider status
- Monitor costs

### Issue: Preferences not saving
- Check API response
- Verify data format
- Review validation
- Check permissions
- Clear cache

## Best Practices
1. Request permission thoughtfully
2. Provide clear opt-out options
3. Respect quiet hours
4. Group similar notifications
5. Use appropriate channels
6. Test delivery rates
7. Monitor engagement
8. Handle failures gracefully

## Notification Strategy
1. **Prioritization**: Use priority levels appropriately
2. **Timing**: Send at optimal times
3. **Frequency**: Avoid notification fatigue
4. **Relevance**: Personalize content
5. **Channels**: Use right channel for message
6. **Testing**: A/B test messages
7. **Feedback**: Allow user preferences
8. **Analytics**: Track and optimize

## Next Steps
Step 38 will implement Collaboration with:
- Real-time collaboration
- Comments and mentions
- Shared workspaces
- Team management
- Activity feeds

## Notes
- Notifications drive engagement
- User control is critical
- Performance impacts experience
- Delivery reliability essential
- Privacy compliance required