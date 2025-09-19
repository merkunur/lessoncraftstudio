# Step 39: Admin Dashboard - Test Guide

## Overview
This step implements a comprehensive admin dashboard with system metrics monitoring, user management, content moderation, security controls, analytics, and audit logging.

## Components Created

### 1. Admin Types
- `types/admin.ts`: Complete admin system types
- User management and permissions
- System metrics and monitoring
- Content moderation
- Audit logging
- Analytics and reporting
- Backup and maintenance

### 2. Admin Utilities
- `lib/admin-utils.ts`: Admin management functions
- Permission checking and role hierarchy
- System health calculation
- Content scoring and moderation
- Metric formatting
- Report generation
- Audit log sanitization

### 3. Admin Dashboard
- `app/admin/dashboard/page.tsx`: Enhanced admin interface
- System health monitoring
- Real-time metrics display
- User and content management
- Security center
- Audit logs
- Auto-refresh capability

## Testing Instructions

### Prerequisites
1. Admin user logged in
2. Super admin or admin role
3. API endpoints configured
4. Monitoring services running

### Test 1: Dashboard Access
1. Navigate to /admin/dashboard
2. Login required
3. Role check performed
4. Dashboard loads
5. All tabs visible

### Test 2: System Health Overview
1. View overview tab
2. Health score displayed
3. Status indicator:
   - Green: Healthy (80-100)
   - Yellow: Degraded (50-79)
   - Red: Critical (0-49)
4. Issues listed
5. Real-time updates

### Test 3: Auto-Refresh
1. Enable auto-refresh
2. Select interval:
   - 10 seconds
   - 30 seconds
   - 1 minute
   - 5 minutes
3. Data updates automatically
4. Spinner indicates refresh
5. Can disable anytime

### Test 4: System Metrics Display
1. Click Metrics tab
2. CPU metrics shown:
   - Usage percentage
   - Cores and threads
   - Load average
   - Process count
3. Visual progress bars
4. Color-coded by severity

### Test 5: Memory Monitoring
1. View memory section
2. RAM usage shown
3. Swap usage displayed
4. Free memory indicated
5. Percentage calculated

### Test 6: Disk Usage
1. Check disk metrics
2. Total/used/free space
3. IOPS displayed
4. Throughput shown
5. Warning if >85% full

### Test 7: Network Statistics
1. View network metrics
2. Bytes in/out
3. Packets transferred
4. Error count
5. Latency measured

### Test 8: Database Performance
1. Check database section
2. Active connections
3. Query statistics
4. Slow queries flagged
5. Replication lag shown

### Test 9: Cache Performance
1. View cache metrics
2. Hit rate percentage
3. Hits vs misses
4. Memory usage
5. Key count

### Test 10: Queue Status
1. Check queue metrics
2. Pending jobs
3. Processing count
4. Failed jobs
5. Average time

### Test 11: Error Tracking
1. View error metrics
2. Total error count
3. Errors by type
4. Critical vs warnings
5. Error rate per minute

### Test 12: User Management Tab
1. Click Users tab
2. User list displayed
3. Search/filter options
4. Role indicators
5. Status badges

### Test 13: User Details
1. Click on user
2. Profile displayed
3. Permissions shown
4. Activity metrics
5. Action buttons

### Test 14: User Actions
1. Edit user role
2. Change permissions
3. Suspend account
4. Reset password
5. Delete user

### Test 15: Permission System
1. Role hierarchy enforced
2. Cannot modify higher role
3. Permission inheritance
4. Custom permissions
5. Time-limited permissions

### Test 16: Content Moderation Tab
1. Click Content tab
2. Content list shown
3. Filter by status
4. Flag indicators
5. Report count

### Test 17: Content Scoring
1. Risk score calculated
2. Reasons listed
3. Color-coded severity:
   - Low: Green
   - Medium: Yellow
   - High: Orange
   - Critical: Red
4. Auto-flagging works

### Test 18: Moderation Actions
1. Review content
2. Approve/reject
3. Flag/unflag
4. Quarantine option
5. Delete permanently

### Test 19: Content Reports
1. View user reports
2. Report categories
3. Evidence attached
4. Review workflow
5. Resolution tracking

### Test 20: Security Center Tab
1. Click Security tab
2. Security overview
3. Recent threats
4. Access attempts
5. Active sessions

### Test 21: Security Alerts
1. View notifications
2. Severity levels:
   - Info: Blue
   - Warning: Yellow
   - Error: Red
   - Critical: Red pulse
3. Action buttons
4. Acknowledge alerts

### Test 22: Audit Logs Tab
1. Click Logs tab
2. Activity list
3. Filter options:
   - User
   - Action
   - Resource
   - Date range
4. Details expandable

### Test 23: Audit Log Details
1. Click log entry
2. Full details shown
3. Changes tracked
4. IP address logged
5. User agent recorded

### Test 24: Sensitive Data Handling
1. Passwords redacted
2. Tokens hidden
3. Keys masked
4. Credit cards obscured
5. Audit-safe display

### Test 25: System Configuration
1. Access settings
2. Configuration categories
3. Edit values
4. Validation rules
5. Save changes

### Test 26: Config Validation
1. Required fields checked
2. Min/max enforced
3. Pattern matching
4. Enum values
5. Error messages clear

### Test 27: Analytics Reports
1. View reports section
2. Report types:
   - Users
   - Engagement
   - Revenue
   - Performance
3. Date range selection
4. Export options

### Test 28: Report Generation
1. Select parameters
2. Generate report
3. View results
4. Charts displayed
5. Download CSV/PDF

### Test 29: Trend Analysis
1. Compare periods
2. Growth indicators
3. Trend arrows:
   - Up: Green
   - Down: Red
   - Stable: Gray
4. Percentage changes

### Test 30: Backup Management
1. View backup config
2. Schedule settings
3. Destination config
4. Retention policy
5. Run manual backup

### Test 31: Backup Monitoring
1. Check backup status
2. Last run time
3. Next scheduled
4. Size estimates
5. Failure alerts

### Test 32: Maintenance Windows
1. View scheduled maintenance
2. Create new window
3. Set affected services
4. Configure notifications
5. Status tracking

### Test 33: Maintenance Alerts
1. Upcoming warnings
2. In-progress status
3. Service impact shown
4. User notifications
5. Completion tracking

### Test 34: Dashboard Stats
1. Overview cards accurate
2. Real-time updates
3. Trend indicators
4. Click to drill down
5. Tooltips helpful

### Test 35: Performance
1. Page loads quickly
2. Metrics update smoothly
3. Charts responsive
4. No lag on refresh
5. Handles large datasets

### Test 36: Mobile Responsiveness
1. Responsive layout
2. Touch-friendly
3. Readable on small screens
4. Navigation works
5. Core features accessible

### Test 37: Notifications
1. Bell icon shows count
2. Click opens dropdown
3. Mark as read
4. Clear all option
5. Links to details

### Test 38: Search Functionality
1. Global search box
2. Search across:
   - Users
   - Content
   - Logs
   - Settings
3. Results highlighted
4. Quick navigation

### Test 39: Export Functions
1. Export users list
2. Export audit logs
3. Export metrics
4. Format options:
   - CSV
   - JSON
   - PDF
5. Download works

### Test 40: Accessibility
1. Keyboard navigation
2. Screen reader support
3. ARIA labels
4. Focus indicators
5. High contrast mode

## Performance Testing

### Load Metrics Endpoint
```bash
# Get system metrics
curl -X GET /api/admin/metrics \
  -H "Authorization: Bearer <admin_token>"
```

### Stress Test Dashboard
```bash
# Simulate concurrent admin users
for i in {1..10}; do
  curl -X GET /api/admin/dashboard \
    -H "Authorization: Bearer <token_$i>" &
done
```

### Audit Log Query
```bash
# Query audit logs with filters
curl -X GET "/api/admin/audit?user=admin&action=update&limit=100" \
  -H "Authorization: Bearer <admin_token>"
```

## Performance Benchmarks
1. Dashboard load: < 500ms
2. Metrics refresh: < 200ms
3. User list load: < 300ms
4. Content moderation: < 400ms
5. Audit log query: < 500ms
6. Report generation: < 2s
7. Config save: < 200ms
8. Search results: < 300ms
9. Export generation: < 3s
10. Chart rendering: < 100ms

## Success Criteria
✅ System health accurately displayed
✅ All metrics update in real-time
✅ Permission system enforced
✅ Content moderation effective
✅ Audit logging comprehensive
✅ Reports generate correctly
✅ Backup system functional
✅ Maintenance windows tracked
✅ Mobile experience good
✅ Performance targets met

## Common Issues & Solutions

### Issue: Metrics not updating
- Check API endpoints
- Verify monitoring service
- Review permissions
- Check network connectivity
- Clear browser cache

### Issue: Permission denied
- Verify user role
- Check permission configuration
- Review role hierarchy
- Ensure token valid
- Check API authorization

### Issue: Slow dashboard load
- Optimize database queries
- Implement caching
- Reduce metric frequency
- Paginate large lists
- Use lazy loading

### Issue: Audit logs missing
- Check logging service
- Verify write permissions
- Review retention policy
- Check disk space
- Monitor queue backlog

### Issue: Reports failing
- Check data availability
- Verify date ranges
- Review memory limits
- Check export permissions
- Monitor generation queue

## Best Practices
1. Regular metric monitoring
2. Proactive alert response
3. Scheduled maintenance windows
4. Regular backup verification
5. Audit log review
6. Permission minimization
7. Content moderation queue
8. Performance optimization

## Security Considerations
1. **Access Control**: Enforce role-based permissions
2. **Audit Trail**: Log all admin actions
3. **Data Protection**: Encrypt sensitive data
4. **Session Management**: Timeout idle sessions
5. **IP Whitelisting**: Restrict admin access
6. **2FA Required**: Enforce for admin accounts
7. **Rate Limiting**: Prevent abuse
8. **Security Headers**: Implement all headers

## Next Steps
Step 40 will implement Testing & QA with:
- Automated testing framework
- Unit and integration tests
- E2E testing
- Performance testing
- Security testing

## Notes
- Admin dashboard is critical infrastructure
- Real-time monitoring essential
- Security must be top priority
- Performance impacts all users
- Regular maintenance required