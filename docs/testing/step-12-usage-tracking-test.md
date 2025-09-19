# Step 12: Usage Tracking System - Test Guide

## Overview
This step implements comprehensive usage tracking and quota enforcement to manage subscription limits and track user activity.

## Components Created

### 1. Database Schema
- Enhanced `WorksheetUsage` model with action tracking
- New `UsageQuota` model for monthly limits
- Indexes for efficient querying

### 2. Usage Tracking Service
- `lib/usage-tracking.ts`: Core tracking logic
- Quota checking functions
- Usage statistics aggregation
- Monthly quota management

### 3. API Endpoints

#### Access Control
- `POST /api/usage/check-access`: Check generator/download access
- `GET /api/usage/check-access`: List available generators

#### Analytics
- `GET /api/usage/analytics`: Get usage statistics
- `POST /api/usage/analytics`: Track usage events

#### Quota Management
- `GET /api/usage/quota`: Get current quota status
- `POST /api/usage/quota`: Admin quota management
- `DELETE /api/usage/quota`: Clear usage history

## Database Migration

1. Generate Prisma client:
```bash
cd frontend
npm run prisma:generate
```

2. Run migrations:
```bash
npm run prisma:migrate
```

## Testing Instructions

### Test 1: Check Generator Access
```bash
# Check if user can access a generator
curl -X POST http://localhost:3000/api/usage/check-access \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"type": "generator", "appName": "wordsearch"}'

# Response for FREE user:
# {
#   "allowed": true,
#   "currentUsage": 3,
#   "limit": 5,
#   "remaining": 2,
#   "userTier": "FREE"
# }

# Try premium generator as FREE user:
curl -X POST http://localhost:3000/api/usage/check-access \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"type": "generator", "appName": "algebra"}'

# Response:
# {
#   "allowed": false,
#   "reason": "This worksheet generator requires a Core or Full subscription.",
#   "userTier": "FREE",
#   "upgradeUrl": "/pricing"
# }
```

### Test 2: Check Download Quota
```bash
curl -X POST http://localhost:3000/api/usage/check-access \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"type": "download"}'

# Response for FREE user:
# {
#   "allowed": true,
#   "currentUsage": 3,
#   "limit": 10,
#   "remaining": 7,
#   "userTier": "FREE"
# }
```

### Test 3: Track Usage Event
```bash
# Track worksheet generation
curl -X POST http://localhost:3000/api/usage/analytics \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{
    "appName": "wordsearch",
    "action": "generate",
    "outputFormat": "pdf",
    "configuration": {"difficulty": "easy", "words": 10}
  }'

# Track download
curl -X POST http://localhost:3000/api/usage/analytics \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{
    "appName": "wordsearch",
    "action": "download",
    "outputFormat": "pdf"
  }'
```

### Test 4: Get Usage Analytics
```bash
# Current month stats
curl http://localhost:3000/api/usage/analytics?period=current \
  -H "Cookie: session-token=YOUR_TOKEN"

# Last 3 months
curl http://localhost:3000/api/usage/analytics?period=last \
  -H "Cookie: session-token=YOUR_TOKEN"

# Year stats
curl http://localhost:3000/api/usage/analytics?period=year \
  -H "Cookie: session-token=YOUR_TOKEN"
```

### Test 5: Get Quota Status
```bash
curl http://localhost:3000/api/usage/quota \
  -H "Cookie: session-token=YOUR_TOKEN"

# Response:
# {
#   "authenticated": true,
#   "tier": "FREE",
#   "quotas": {
#     "downloads": {
#       "used": 3,
#       "limit": 10,
#       "remaining": 7,
#       "percentage": 30,
#       "unlimited": false
#     },
#     "generators": {
#       "used": 3,
#       "limit": 5,
#       "remaining": 2,
#       "percentage": 60,
#       "unlimited": false,
#       "list": ["wordsearch", "addition", "coloring"]
#     },
#     "worksheets": {
#       "generated": 15,
#       "unlimited": true
#     }
#   },
#   "period": {
#     "year": 2024,
#     "month": 12,
#     "daysRemaining": 12
#   }
# }
```

### Test 6: List Available Generators
```bash
curl http://localhost:3000/api/usage/check-access \
  -H "Cookie: session-token=YOUR_TOKEN"

# Response shows generators by tier
```

### Test 7: Quota Enforcement
1. As a FREE user, make 10 download requests
2. The 11th download should be blocked:
```bash
# After exceeding quota
curl -X POST http://localhost:3000/api/usage/analytics \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"appName": "wordsearch", "action": "download", "outputFormat": "pdf"}'

# Response:
# {
#   "tracked": true,
#   "allowed": false,
#   "reason": "Monthly download limit reached. Please upgrade your plan for more downloads.",
#   "quotaStatus": {
#     "allowed": false,
#     "currentUsage": 10,
#     "limit": 10,
#     "remaining": 0
#   }
# }
```

### Test 8: Admin Quota Management
```bash
# Reset user's quota (admin only)
curl -X POST http://localhost:3000/api/usage/quota \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=ADMIN_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "action": "reset"
  }'

# Grant additional quota
curl -X POST http://localhost:3000/api/usage/quota \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=ADMIN_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "action": "grant",
    "downloads": 5,
    "generators": 2
  }'
```

## Subscription Tier Limits

### FREE Tier
- **Downloads**: 10/month
- **Generators**: 5 (addition, subtraction, coloring, matching, wordsearch)
- **Worksheets**: Unlimited generation

### CORE Tier ($9.99)
- **Downloads**: Unlimited
- **Generators**: 20 (includes math, language, logic games)
- **Worksheets**: Unlimited generation

### FULL Tier ($19.99)
- **Downloads**: Unlimited
- **Generators**: All 33+ generators
- **Worksheets**: Unlimited generation

## Testing Scenarios

### Scenario 1: Free User Journey
1. Sign up as new user (FREE tier)
2. Try to access "algebra" generator - should be blocked
3. Access "wordsearch" generator - should work
4. Generate 5 worksheets
5. Download 10 worksheets
6. Try 11th download - should be blocked
7. Check quota status - shows limits reached

### Scenario 2: Upgrade Flow
1. Start as FREE user with exhausted quotas
2. Upgrade to CORE tier
3. Check quota status - limits should update
4. Download should now work (unlimited)
5. Access "crossword" generator - should work
6. Try "algebra" generator - still blocked (FULL only)

### Scenario 3: Month Rollover
1. Use quotas in current month
2. Simulate month change (update system date or database)
3. Check quota status - should reset
4. Previous month's usage should be preserved
5. New month starts with fresh quotas

## Database Queries

```sql
-- Check user's current month quota
SELECT * FROM usage_quotas 
WHERE user_id = 'USER_ID' 
AND year = 2024 AND month = 12;

-- Get user's usage for current month
SELECT COUNT(*), action FROM worksheet_usage 
WHERE user_id = 'USER_ID' 
AND created_at >= '2024-12-01' 
GROUP BY action;

-- Find users exceeding quotas
SELECT * FROM usage_quotas 
WHERE downloads_used >= downloads_limit 
AND downloads_limit != -1;
```

## Success Criteria
✅ Generator access control by tier works
✅ Download quotas enforced correctly
✅ Usage events tracked in database
✅ Analytics API returns accurate statistics
✅ Quota status displays correctly
✅ Monthly quotas reset automatically
✅ Admin can manage user quotas
✅ Tier upgrades update limits immediately
✅ Historical usage preserved
✅ Performance acceptable (<100ms response)

## Common Issues & Solutions

### Issue: Quota not resetting
- Check if new month record created
- Verify year/month calculation
- Ensure timezone handling correct

### Issue: Generator access incorrect
- Verify generator name normalization
- Check tier mapping in code
- Ensure user tier loaded correctly

### Issue: Downloads still working after limit
- Check if quota enforcement middleware active
- Verify countedInQuota flag set
- Ensure quota incremented on download

## Performance Considerations

1. **Caching**: Consider caching quota status for 5 minutes
2. **Batch Updates**: Group multiple usage events
3. **Indexes**: Ensure database indexes on userId, createdAt
4. **Cleanup**: Archive old usage data monthly

## Next Steps
Step 13 will implement the Admin Layout & Navigation for managing users, content, and monitoring usage across the platform.