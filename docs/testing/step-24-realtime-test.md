# Step 24: Real-time Features - Test Guide

## Overview
This step implements comprehensive real-time features including WebSocket connections, live notifications, presence indicators, collaborative editing, and team chat functionality for seamless real-time interaction.

## Components Created

### 1. WebSocket Server Setup
- `app/api/websocket/route.ts`: WebSocket connection management
- Client connection handling
- Room/channel management
- Message broadcasting
- Presence tracking
- Activity monitoring

### 2. Real-time Notifications
- `components/realtime/NotificationCenter.tsx`: Notification center UI
- Desktop notifications support
- Sound alerts
- Priority-based display
- Category filtering
- Read/unread tracking

### 3. Presence Indicators
- `components/realtime/PresenceIndicator.tsx`: User presence display
- Online/away/busy/offline status
- Last seen tracking
- Activity indicators
- Cursor position sharing
- Compact and detailed views

### 4. Live Collaboration
- `components/realtime/LiveCollaboration.tsx`: Collaborative editing
- Real-time cursor tracking
- Selection highlighting
- Document locking
- Change history
- Auto-save functionality
- Typing indicators

### 5. Team Chat
- `components/realtime/TeamChat.tsx`: Real-time messaging
- Channel management
- Direct messages
- File attachments
- Message reactions
- Reply threading
- Typing indicators

## Testing Instructions

### Prerequisites
1. User must be logged in
2. WebSocket server running (mock or real)
3. Browser notifications permission granted
4. Multiple browser windows for multi-user testing

### Test 1: WebSocket Connection
1. Open developer console
2. Check for connection message
3. Verify:
   - Connection established
   - Connection ID received
   - Heartbeat active
   - Auto-reconnect on disconnect

### Test 2: Notification Bell
1. Click notification bell icon
2. Panel should display:
   - Unread count badge
   - Notification list
   - Filters (All/Unread/Urgent)
   - Mark all as read button
   - Clear all button
3. Sound toggle works
4. Categories filter properly

### Test 3: Receive Notification
1. Trigger new notification
2. Verify:
   - Bell badge updates
   - Sound plays (if enabled)
   - Toast appears for high priority
   - Desktop notification (if enabled)
3. Click notification
4. Should navigate to action URL

### Test 4: Notification Actions
1. Mark individual as read
2. Mark all as read
3. Delete notification
4. Clear all notifications
5. Toggle sound on/off
6. Verify persistence

### Test 5: Presence Display
1. View presence indicator
2. Shows:
   - Online users count
   - User avatars with status
   - Activity (Editing/Viewing)
   - Connection status icon
3. Hover for tooltip
4. Last seen time for offline

### Test 6: Status Changes
1. Change user status:
   - Online → Away
   - Away → Busy
   - Busy → Offline
2. Verify:
   - Status color updates
   - Broadcast to others
   - Presence list updates

### Test 7: Live Collaboration Setup
1. Open document for editing
2. Verify:
   - Collaboration header shows
   - Active users displayed
   - Lock/unlock button
   - Save button
   - History toggle

### Test 8: Collaborative Cursors
1. Two users open same document
2. Move cursor
3. Verify:
   - Cursor position shared
   - Color-coded cursors
   - Name labels
   - Smooth movement

### Test 9: Text Selection
1. Select text in document
2. Other users should see:
   - Highlighted selection
   - User's color
   - Selection range

### Test 10: Document Locking
1. Click lock button
2. Verify:
   - Document locked indicator
   - Other users can't edit
   - Lock owner shown
   - Unlock only by owner

### Test 11: Auto-save
1. Make changes to document
2. Wait 2 seconds
3. Verify:
   - "Unsaved changes" indicator
   - "Saving..." spinner
   - "Changes saved" message
4. Check persistence

### Test 12: Change History
1. Click history button
2. Panel shows:
   - List of changes
   - User who made change
   - Timestamp
   - Change type
3. Chronological order

### Test 13: Chat Channels
1. Open team chat
2. View channel list:
   - Public channels (#)
   - Private channels (🔒)
   - Direct messages
   - Unread counts
3. Search channels
4. Click to select

### Test 14: Send Message
1. Type message
2. Press Enter or click Send
3. Verify:
   - Message appears
   - Status indicators (sent/delivered/read)
   - Timestamp shown
4. Multi-line with Shift+Enter

### Test 15: Message Features
1. Hover over message
2. Action buttons appear:
   - Add reaction
   - Reply
   - Edit (own messages)
   - Delete (own messages)
3. Test each action

### Test 16: File Attachments
1. Click paperclip icon
2. Select file
3. Verify:
   - File uploads
   - Progress indicator
   - Preview (images)
   - Download button

### Test 17: Reactions
1. Click emoji on message
2. Select reaction
3. Verify:
   - Reaction added
   - Counter increments
   - Multiple users can react
   - Click again to remove

### Test 18: Reply Thread
1. Click Reply on message
2. Reply indicator shows
3. Type reply
4. Send
5. Verify threaded display

### Test 19: Typing Indicators
1. User 1 starts typing
2. User 2 sees:
   - "User 1 is typing..."
   - Animated dots
3. Stops after pause
4. Multiple users typing

### Test 20: Direct Messages
1. Select user for DM
2. Opens private channel
3. Send message
4. Only visible to recipient
5. Unread count updates

## Advanced Testing

### Test 21: Connection Recovery
1. Disable network
2. Wait for disconnect
3. Re-enable network
4. Verify:
   - Auto-reconnect
   - Queued messages sent
   - State synchronized

### Test 22: Performance
1. Open multiple documents
2. Many users connected
3. Monitor:
   - CPU usage
   - Memory usage
   - Network traffic
   - Smooth updates

### Test 23: Conflict Resolution
1. Two users edit same text
2. Verify:
   - Changes merged
   - No data loss
   - Consistent state

### Test 24: Notification Preferences
1. Configure preferences:
   - Sound on/off
   - Desktop on/off
   - Categories enabled/disabled
2. Test each setting
3. Verify persistence

### Test 25: Mobile Responsiveness
1. Open on mobile device
2. Test:
   - Touch interactions
   - Swipe gestures
   - Notification display
   - Chat interface
   - Presence indicators

## API Testing

### WebSocket Connection
```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'user_token'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};
```

### Send Notification
```bash
curl -X POST /api/websocket \
  -H "Content-Type: application/json" \
  -d '{
    "type": "notification",
    "targetUserId": "user_2",
    "title": "New Message",
    "message": "You have a new message",
    "priority": "high"
  }'
```

### Update Presence
```bash
curl -X POST /api/websocket \
  -H "Content-Type: application/json" \
  -d '{
    "type": "presence",
    "status": "away"
  }'
```

### Send Chat Message
```bash
curl -X POST /api/websocket \
  -H "Content-Type: application/json" \
  -d '{
    "type": "chat",
    "teamId": "team_1",
    "content": "Hello team!",
    "messageType": "text"
  }'
```

## Performance Benchmarks
1. WebSocket latency: < 50ms
2. Notification delivery: < 100ms
3. Cursor update rate: 60 FPS
4. Message send time: < 200ms
5. Presence update: < 100ms
6. Auto-save trigger: 2 seconds
7. Reconnection time: < 5 seconds

## Success Criteria
✅ WebSocket connects reliably
✅ Notifications deliver instantly
✅ Presence updates in real-time
✅ Cursors track smoothly
✅ Messages send/receive properly
✅ Reactions work correctly
✅ Auto-save functions
✅ History tracks changes
✅ Typing indicators show
✅ No message loss

## Common Issues & Solutions

### Issue: WebSocket disconnects frequently
- Check network stability
- Verify server configuration
- Review heartbeat settings
- Check firewall rules

### Issue: Notifications not appearing
- Check browser permissions
- Verify notification preferences
- Check sound file loading
- Review priority settings

### Issue: Cursors laggy
- Reduce update frequency
- Check network latency
- Optimize rendering
- Limit concurrent users

### Issue: Messages not syncing
- Check WebSocket connection
- Verify message queue
- Review conflict resolution
- Check server logs

### Issue: Presence not updating
- Check status broadcast
- Verify user tracking
- Review timeout settings
- Check presence service

## Real-time Best Practices
1. Implement heartbeat for connection health
2. Use message queuing for offline support
3. Implement conflict resolution
4. Optimize update frequency
5. Handle reconnection gracefully
6. Implement rate limiting
7. Use efficient data formats
8. Cache frequently accessed data

## Security Considerations
1. Authenticate WebSocket connections
2. Validate all incoming messages
3. Implement rate limiting
4. Sanitize user inputs
5. Use secure WebSocket (WSS)
6. Implement access control
7. Audit real-time events

## Next Steps
Step 25 will implement Payment Integration with:
- Stripe payment processing
- Subscription management
- Invoice generation
- Payment history
- Billing portal