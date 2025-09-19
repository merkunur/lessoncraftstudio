# Step 31: Performance Monitoring - Test Guide

## Overview
This step implements comprehensive performance monitoring including Real User Monitoring (RUM), Application Performance Monitoring (APM), Web Vitals tracking, synthetic monitoring, load testing, and performance optimization recommendations.

## Components Created

### 1. Performance Types
- `types/performance.ts`: Complete type definitions
- Web Vitals and RUM types
- APM and tracing types
- Load testing and synthetic monitoring
- Performance reports and recommendations
- Budget tracking types

### 2. Performance Utilities
- `lib/performance-utils.ts`: Analysis functions
- Web Vitals rating system
- Apdex score calculation
- Percentile calculations
- Issue detection algorithms
- Recommendation generation

### 3. Performance Dashboard
- `app/admin/performance/page.tsx`: Main monitoring interface
- 10-tab comprehensive dashboard
- Real-time metrics display
- Interactive charts and graphs
- Issue detection and alerts
- Optimization recommendations

### 4. API Endpoints
- RUM data collection
- Web Vitals tracking
- APM metrics
- Synthetic monitoring
- Load test results
- Performance reports

## Testing Instructions

### Prerequisites
1. Admin access required
2. Performance data populated
3. Monitoring enabled
4. Metrics collection active

### Test 1: Dashboard Load
1. Navigate to /admin/performance
2. Verify displays:
   - Performance score and grade
   - Apdex score
   - Active issues count
   - Recommendations
   - Page views
   - Average load time
3. All metrics load properly

### Test 2: Auto-refresh
1. Enable auto-refresh
2. Observe spinner animation
3. Data updates every 30 seconds
4. No UI flicker
5. Toggle off stops refresh

### Test 3: Manual Refresh
1. Click Refresh Now
2. Loading spinner appears
3. Data updates
4. Timestamp changes
5. Smooth transition

### Test 4: Overview Tab
1. Default tab is Overview
2. Shows:
   - Critical issues alert
   - Web Vitals summary
   - Top recommendations
   - P50/P75/P95 metrics
   - Good/Needs Work/Poor percentages
3. All data renders correctly

### Test 5: Critical Issues
1. View critical issues section
2. Red alert box appears
3. Shows:
   - Issue description
   - Impact statement
   - Affected users count
4. Proper severity indicators

### Test 6: Web Vitals Summary
1. View Web Vitals cards
2. Each vital shows:
   - Percentile values
   - Performance distribution
   - Color-coded bars
3. Hover for details

### Test 7: RUM Tab
1. Click Real User Monitoring
2. Shows:
   - Device distribution chart
   - Browser distribution
   - Recent sessions table
   - Session details
3. Percentages calculate correctly

### Test 8: Device Distribution
1. View device breakdown
2. Shows desktop/mobile/tablet
3. Percentage bars accurate
4. Colors consistent
5. Total equals 100%

### Test 9: Recent Sessions
1. View sessions table
2. Shows:
   - Session ID (truncated)
   - User ID or Anonymous
   - Device and browser
   - Duration or Active
   - Error count badge
3. Hover for full details

### Test 10: APM Tab
1. Click Application Performance
2. Shows service metrics
3. Database stats
4. Cache performance
5. Dependency graph

### Test 11: Web Vitals Tab
1. Click Web Vitals tab
2. Shows all Core Web Vitals:
   - FCP, LCP, FID
   - CLS, TTFB, INP
3. Each with distribution
4. Performance bars

### Test 12: Vital Distribution
1. View any vital card
2. Shows:
   - Good percentage (green)
   - Needs improvement (yellow)
   - Poor (red)
3. Visual bar chart
4. Percentages add to 100%

### Test 13: Error Tracking Tab
1. Click Error Tracking
2. Summary cards show:
   - Total errors
   - Error rate
   - Affected users
   - Critical count
3. Recent errors table

### Test 14: Error Details
1. View error in table
2. Shows:
   - Error message
   - Type and level
   - File location
   - Timestamp
   - Count if grouped
3. Truncated with tooltip

### Test 15: Error Severity
1. Check error badges
2. Fatal errors: red
3. Errors: orange
4. Warnings: yellow
5. Consistent styling

### Test 16: Synthetic Monitoring Tab
1. Click Synthetic Monitoring
2. Shows monitors list
3. Each monitor shows:
   - Name and URL
   - Frequency
   - Locations
   - Last run status
4. Enable/disable toggle

### Test 17: Monitor Details
1. View monitor card
2. Shows:
   - Assertions configured
   - Alert settings
   - Last run results
   - Response time
3. Success/failure indicators

### Test 18: Monitor History
1. View monitor history
2. Shows recent runs
3. Status for each
4. Response times
5. Failure reasons

### Test 19: Load Testing Tab
1. Click Load Testing
2. Shows test results
3. Each test shows:
   - Scenario name
   - Virtual users
   - Duration
   - Success rate
4. Detailed metrics

### Test 20: Load Test Charts
1. View test details
2. Charts display:
   - Response time over time
   - Throughput graph
   - Error rate
   - Virtual users ramp
3. Interactive tooltips

### Test 21: Performance Budgets Tab
1. Click Performance Budgets
2. Shows budget status
3. Each budget shows:
   - Current vs target
   - Percentage used
   - Status indicator
4. Over/warning/under states

### Test 22: Budget Status
1. Check budget cards
2. Over budget: red
3. Warning (>90%): yellow
4. Under budget: green
5. Progress bars accurate

### Test 23: Recommendations Tab
1. Click Recommendations
2. List of optimizations
3. Each shows:
   - Title and description
   - Priority badge
   - Effort indicator
   - Expected impact
   - Implementation steps
4. Sorted by priority

### Test 24: Recommendation Details
1. View recommendation card
2. Shows:
   - Full description
   - Impact statement
   - Metric improvement
   - Step-by-step guide
3. Priority and effort badges

### Test 25: Reports Tab
1. Click Reports tab
2. Shows latest report
3. Summary metrics
4. Trend charts
5. Export options

### Test 26: Trend Analysis
1. View trend charts
2. Shows:
   - Direction arrow
   - Percentage change
   - Time series data
3. Up/down/stable indicators

### Test 27: Issue Detection
1. Generate poor performance
2. Issues auto-detected
3. Appear in issues list
4. Severity calculated
5. Notifications if enabled

### Test 28: Filtering
1. Filter by time period
2. Filter by metric type
3. Filter by device
4. Results update
5. Charts refresh

### Test 29: Export Data
1. Click export button
2. Format options appear
3. Select CSV/JSON
4. File downloads
5. Data complete and valid

### Test 30: Mobile Responsive
1. View on mobile device
2. Tabs scroll horizontally
3. Cards stack vertically
4. Tables scrollable
5. Charts resize properly

## Advanced Testing

### Test 31: Real-time Updates
1. Open in multiple tabs
2. Generate performance data
3. Both tabs update
4. Metrics sync
5. No conflicts

### Test 32: Historical Data
1. Select date range
2. Historical data loads
3. Charts update
4. Comparisons work
5. Trends calculate

### Test 33: Alerting
1. Configure alert thresholds
2. Trigger poor performance
3. Alert fires
4. Notification sent
5. Alert logged

### Test 34: Drill-down
1. Click on metric
2. Detailed view opens
3. Shows breakdown
4. Time series data
5. Related metrics

### Test 35: Custom Metrics
1. Send custom metric
2. Appears in dashboard
3. Graphed correctly
4. Included in reports
5. Alerts work

## API Testing

### Get RUM Data
```bash
curl /api/performance/rum
```

### Get Web Vitals
```bash
curl /api/performance/web-vitals?period=24h
```

### Get APM Metrics
```bash
curl /api/performance/apm
```

### Record Web Vital
```bash
curl -X POST /api/performance/web-vitals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "LCP",
    "value": 2456,
    "rating": "good",
    "url": "/worksheets",
    "deviceType": "desktop"
  }'
```

### Get Load Test Results
```bash
curl /api/performance/load-tests
```

### Start Load Test
```bash
curl -X POST /api/performance/load-tests \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "Peak Traffic",
    "virtualUsers": 500,
    "duration": 600000,
    "rampUpTime": 60000
  }'
```

## Performance Benchmarks
1. Dashboard load: < 2 seconds
2. Data refresh: < 500ms
3. Chart render: < 200ms
4. Tab switch: < 100ms
5. Export generation: < 3 seconds
6. Real-time update: < 1 second
7. Historical query: < 2 seconds
8. Alert detection: < 5 seconds

## Success Criteria
✅ All metrics display accurately
✅ Real-time updates work
✅ Issues auto-detected
✅ Recommendations generated
✅ Charts interactive
✅ Exports complete
✅ Mobile responsive
✅ Alerts fire correctly
✅ Historical data accessible
✅ Performance targets met

## Common Issues & Solutions

### Issue: Metrics not updating
- Check data collection enabled
- Verify API endpoints
- Review browser console
- Check network requests

### Issue: Charts not rendering
- Verify data format
- Check chart library loaded
- Review console errors
- Test with sample data

### Issue: Slow dashboard load
- Check data volume
- Review query performance
- Enable pagination
- Implement caching

### Issue: Incorrect calculations
- Verify formulas
- Check data types
- Review edge cases
- Test with known values

### Issue: Missing recommendations
- Check thresholds
- Verify detection logic
- Review data quality
- Test rule engine

## Best Practices
1. Monitor continuously
2. Set realistic budgets
3. Act on recommendations
4. Track improvements
5. Regular load testing
6. Synthetic monitoring for critical paths
7. Alert on degradation
8. Review reports weekly

## Performance Optimization
1. Cache metrics data
2. Aggregate in background
3. Use time-series database
4. Implement sampling
5. Compress historical data
6. Lazy load charts
7. Progressive enhancement
8. WebSocket for real-time

## Web Vitals Targets
1. **FCP**: < 1.8s (good)
2. **LCP**: < 2.5s (good)
3. **FID**: < 100ms (good)
4. **CLS**: < 0.1 (good)
5. **TTFB**: < 800ms (good)
6. **INP**: < 200ms (good)

## Next Steps
Step 32 will implement Security & Compliance with:
- Security scanning and vulnerability detection
- Compliance reporting (GDPR, COPPA)
- Audit logging
- Access control monitoring
- Data encryption verification

## Notes
- Performance monitoring is critical for user experience
- Set up alerts for critical metrics
- Regular reviews prevent degradation
- Act on recommendations promptly
- Correlate with user feedback