# Step 29: Admin Tools - Test Guide

## Overview
This step implements comprehensive admin tools including system diagnostics, user impersonation, debug console, feature flags, A/B testing framework, and configuration management.

## Components Created

### 1. Admin Tools Types
- `types/admin-tools.ts`: Complete type definitions
- System diagnostics and performance metrics
- Feature flags and A/B testing types
- Configuration management types
- Security and audit types

### 2. Utility Functions
- `lib/admin-tools-utils.ts`: Helper functions
- System health calculations
- Feature flag evaluation
- A/B test significance testing
- Configuration validation
- Performance metrics formatting

### 3. Admin Tools Dashboard
- `app/admin/tools/page.tsx`: Main admin interface
- System diagnostics display
- User impersonation controls
- Debug console terminal
- Feature flags management
- A/B testing dashboard
- Configuration editor
- Queue and job monitoring
- Security monitoring

### 4. API Endpoints
- System diagnostics monitoring
- Feature flag management
- A/B test configuration
- Configuration updates
- Command execution
- User impersonation
- Maintenance mode control

## Testing Instructions

### Prerequisites
1. User must be logged in as admin
2. Admin permissions configured
3. System monitoring enabled
4. Test users available for impersonation

### Test 1: Admin Dashboard Load
1. Navigate to /admin/tools
2. Verify displays:
   - System health score
   - Resource usage meters
   - Service status list
   - Tab navigation
3. All tabs accessible

### Test 2: System Health Score
1. View health score percentage
2. Check status color:
   - 90-100%: Green (Excellent)
   - 75-89%: Blue (Good)
   - 60-74%: Yellow (Fair)
   - 40-59%: Orange (Poor)
   - 0-39%: Red (Critical)
3. Factors affect score

### Test 3: Resource Monitoring
1. Check CPU usage meter
2. View memory usage:
   - Used vs total
   - Percentage bar
3. Disk usage display
4. Real-time updates (5 sec)

### Test 4: Performance Metrics
1. View response times:
   - Average
   - Median
   - P95
   - P99
2. Throughput metrics:
   - Requests/second
   - Bytes/second
3. Error rate percentage

### Test 5: Service Status
1. View all services
2. Status indicators:
   - Green: Running
   - Yellow: Degraded
   - Red: Stopped
   - Gray: Unknown
3. Uptime display
4. Health check results

### Test 6: User Impersonation
1. Click Impersonation tab
2. Enter user ID/email
3. Click Start Impersonation
4. Warning dialog appears
5. Redirects as user
6. Actions logged

### Test 7: End Impersonation
1. While impersonating
2. Admin bar visible
3. Click End Session
4. Returns to admin view
5. Session logged

### Test 8: Debug Console
1. Click Debug Console tab
2. Terminal interface shows
3. Type 'help'
4. Command list displays
5. Execute commands

### Test 9: Console Commands
1. Test each command:
   - cache:clear
   - logs:tail 100
   - db:status
   - queue:stats
   - config:list
   - system:info
2. Output displayed
3. History preserved

### Test 10: Debug Options
1. Enable verbose logging
2. API request logging
3. SQL query logging
4. Performance tracing
5. Changes take effect

### Test 11: Feature Flags List
1. Click Feature Flags tab
2. All flags display:
   - Name and key
   - Status badge
   - Type indicator
   - Description
3. Toggle switches work

### Test 12: Toggle Feature Flag
1. Click toggle button
2. Status changes:
   - Enabled → Disabled
   - Disabled → Enabled
3. UI updates immediately
4. Change persists

### Test 13: Percentage Rollout
1. Find percentage flag
2. Shows rollout %
3. Edit percentage
4. Preview affected users
5. Save changes

### Test 14: Feature Variants
1. Find variant flag
2. Shows variants:
   - Name
   - Value
   - Weight %
3. Total = 100%
4. Edit weights

### Test 15: Schedule Features
1. Find scheduled flag
2. Shows date range:
   - Start date
   - End date
   - Timezone
3. Currently active?
4. Edit schedule

### Test 16: A/B Tests List
1. Click A/B Tests tab
2. Active tests show:
   - Name and hypothesis
   - Status badge
   - Variant performance
   - Statistical significance
3. Control buttons work

### Test 17: A/B Test Results
1. View completed test
2. Results display:
   - Winner variant
   - Confidence level
   - Improvement %
   - Sample size
3. Statistical significance

### Test 18: Create A/B Test
1. Click Create Test
2. Form fields:
   - Name
   - Hypothesis
   - Variants
   - Metrics
   - Traffic allocation
3. Save test

### Test 19: Pause/Resume Test
1. Find running test
2. Click pause button
3. Status → paused
4. Click play button
5. Status → running

### Test 20: Configuration List
1. Click Configuration tab
2. All configs show:
   - Key path
   - Current value
   - Type badge
   - Environment
3. Filter by environment

### Test 21: Edit Configuration
1. Click config item
2. Edit form opens:
   - Current value
   - Validation rules
   - Description
3. Modify value
4. Validation runs
5. Save changes

### Test 22: Secret Values
1. Find secret config
2. Value masked (***)
3. Click reveal button
4. Enter admin password
5. Value shows briefly

### Test 23: Config History
1. View config item
2. History tab shows:
   - Previous values
   - Changed by
   - Timestamp
   - Reason
3. Can revert

### Test 24: Queue Metrics
1. Click Queue & Jobs tab
2. Metrics display:
   - Pending count
   - Active count
   - Completed count
   - Failed count
   - Throughput
   - Average wait

### Test 25: Queue Jobs List
1. View job list
2. Each job shows:
   - Name and queue
   - Status badge
   - Priority
   - Attempts
   - Created time
3. Can retry failed

### Test 26: Cron Jobs
1. View scheduled jobs
2. Each shows:
   - Name
   - Schedule expression
   - Next run time
   - Last run time
   - Status
3. Can run manually

### Test 27: Toggle Cron Job
1. Find enabled job
2. Click pause button
3. Job disabled
4. Click play button
5. Job re-enabled

### Test 28: Security Events
1. Click Security tab
2. Recent events show:
   - Type and severity
   - Description
   - IP address
   - Timestamp
3. Color coded by severity

### Test 29: Audit Summary
1. View audit panel
2. Shows counts:
   - Admin actions
   - Config changes
   - Failed auth attempts
   - Active sessions
3. Updated real-time

### Test 30: Maintenance Mode
1. Find maintenance toggle
2. Click Enable
3. Warning dialog
4. Site shows maintenance
5. Admin can still access
6. Click Disable to restore

## Advanced Testing

### Test 31: Bulk Flag Updates
1. Select multiple flags
2. Bulk actions menu:
   - Enable all
   - Disable all
   - Delete selected
3. Confirm action
4. All update together

### Test 32: Export Configurations
1. Click export button
2. Format options:
   - JSON
   - ENV file
   - YAML
3. Download starts
4. File valid format

### Test 33: Import Configurations
1. Click import button
2. Select file
3. Preview changes
4. Validation runs
5. Apply changes

### Test 34: Command Autocomplete
1. In debug console
2. Start typing command
3. Suggestions appear
4. Tab to complete
5. Parameters suggested

### Test 35: Performance Profiling
1. Enable profiling
2. Execute actions
3. View flame graph
4. Identify bottlenecks
5. Export profile data

## API Testing

### Get Diagnostics
```bash
curl /api/admin/tools/diagnostics
```

### Toggle Feature Flag
```bash
curl -X POST /api/admin/tools/feature-flags/flag_1/toggle
```

### Execute Command
```bash
curl -X POST /api/admin/tools/execute \
  -H "Content-Type: application/json" \
  -d '{"command": "cache:clear"}'
```

### Start Impersonation
```bash
curl -X POST /api/admin/tools/impersonate \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123"}'
```

### Update Configuration
```bash
curl -X PUT /api/admin/tools/configurations/config_1 \
  -H "Content-Type: application/json" \
  -d '{
    "value": "new_value",
    "reason": "Performance optimization"
  }'
```

## Performance Benchmarks
1. Dashboard load: < 500ms
2. Diagnostics update: < 200ms
3. Command execution: < 100ms
4. Flag toggle: < 50ms
5. Config update: < 100ms
6. Impersonation start: < 500ms
7. A/B test calculation: < 200ms
8. Queue metrics: < 150ms

## Success Criteria
✅ System diagnostics accurate
✅ Impersonation works safely
✅ Debug console functional
✅ Feature flags toggle correctly
✅ A/B tests calculate significance
✅ Configurations validate properly
✅ Queue monitoring real-time
✅ Security events logged
✅ Maintenance mode works
✅ All APIs responsive

## Common Issues & Solutions

### Issue: Health score incorrect
- Check metric calculations
- Verify threshold values
- Review service status
- Update calculation logic

### Issue: Impersonation fails
- Check user permissions
- Verify user exists
- Review session handling
- Check cookie settings

### Issue: Console command errors
- Verify command syntax
- Check permissions
- Review command handler
- Test in isolation

### Issue: Feature flag not working
- Check evaluation logic
- Verify user attributes
- Test targeting rules
- Review cache

### Issue: A/B test no significance
- Increase sample size
- Check calculation
- Verify metrics
- Review duration

## Security Best Practices
1. Audit all admin actions
2. Require MFA for admin
3. Limit impersonation time
4. Log all commands
5. Encrypt sensitive configs
6. Rate limit API calls
7. Monitor suspicious activity
8. Regular permission review

## Admin Best Practices
1. Test in staging first
2. Document all changes
3. Use feature flags for rollout
4. Monitor after changes
5. Have rollback plan
6. Communicate maintenance
7. Review logs regularly
8. Keep tools updated

## Debugging Tips
1. Use verbose logging
2. Check browser console
3. Monitor network tab
4. Review server logs
5. Test edge cases
6. Verify permissions
7. Check rate limits
8. Use profiling tools

## Next Steps
Step 30 will implement Help System with:
- Interactive tutorials
- Context-sensitive help
- Video guides
- Documentation search
- FAQ system
- Support ticket integration