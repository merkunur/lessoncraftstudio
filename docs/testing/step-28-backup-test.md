# Step 28: Backup and Recovery - Test Guide

## Overview
This step implements comprehensive backup and recovery features including automated backups, point-in-time recovery, data export/import, disaster recovery planning, and backup health monitoring.

## Components Created

### 1. Backup Types and Utilities
- `types/backup.ts`: Complete type definitions
- Backup, RestoreOperation, DataExport types
- DisasterRecovery and BackupHealth types
- Retention policies and schedules

### 2. Backup Utility Functions
- `lib/backup-utils.ts`: Helper functions
- Backup size calculations
- Next backup time computation
- Retention policy checking
- Recovery metrics (RTO/RPO)
- Backup health assessment

### 3. Backup Management Page
- `app/admin/backup/page.tsx`: Main backup interface
- Overview dashboard with health status
- Backup list management
- Schedule configuration
- Restore operations
- Export/import tools
- Disaster recovery planning

### 4. API Endpoints
- Backup list and health monitoring
- Schedule management
- Manual backup creation
- Restore operations
- Data export in multiple formats

## Testing Instructions

### Prerequisites
1. User must be logged in as admin
2. Database populated with sample data
3. Storage permissions configured
4. Cloud storage credentials (for production)

### Test 1: Backup Dashboard Load
1. Navigate to /admin/backup
2. Verify displays:
   - Health status indicator
   - RTO/RPO metrics
   - Storage usage
   - Recent backups
3. All tabs load correctly

### Test 2: Health Status Display
1. Check health indicator color:
   - Green = healthy
   - Yellow = warning
   - Red = critical
2. View storage usage bar
3. Check issue alerts
4. Verify metrics accuracy

### Test 3: Create Full Backup
1. Click "Full Backup" button
2. Confirm creation dialog
3. Progress indicator shows
4. Status updates to "in_progress"
5. Backup appears in list

### Test 4: Create Incremental Backup
1. Click "Incremental" button
2. Faster than full backup
3. Smaller size shown
4. Links to parent backup
5. Verify completion

### Test 5: Backup List View
1. Click Backups tab
2. Table displays:
   - Name with timestamp
   - Type (full/incremental/differential)
   - Status with color coding
   - Size formatted
   - Creation date
   - Location icon (cloud/local)
3. Sorting works

### Test 6: Backup Details
1. Click settings icon on backup
2. Details modal shows:
   - Full metadata
   - Encryption status
   - Verification results
   - Checksum
   - Retention period
3. Close modal

### Test 7: Verify Backup Integrity
1. Find verified backup
2. Green checkmark shown
3. Click to view verification
4. Shows:
   - Checksum match
   - Integrity status
   - Restorable flag

### Test 8: Download Backup
1. Click download icon
2. Browser download starts
3. File size matches display
4. Can open/extract file
5. Contents valid

### Test 9: Schedule List
1. Click Schedules tab
2. Shows active schedules:
   - Name and status
   - Type and frequency
   - Next run time
   - Last run time
   - Retention policy
3. Enable/disable toggle works

### Test 10: Create Schedule
1. Click "Add Schedule"
2. Form opens with:
   - Name field
   - Backup type selection
   - Frequency options
   - Time picker
   - Retention settings
3. Save schedule

### Test 11: Schedule Frequency
1. Set to hourly
2. Next run = +1 hour
3. Change to daily
4. Time picker appears
5. Set specific time

### Test 12: Retention Policy
1. Configure retention:
   - Daily: 7 days
   - Weekly: 4 weeks
   - Monthly: 6 months
   - Yearly: 2 years
2. Calculate storage needs
3. Warning if excessive

### Test 13: Restore Operation
1. Click restore icon on backup
2. Confirmation dialog:
   - Warning about overwrite
   - Environment selection
   - Options checkboxes
3. Start restore
4. Progress bar shows

### Test 14: Restore Progress
1. View active restore
2. Shows current step:
   - Preparing
   - Downloading
   - Extracting
   - Restoring
   - Completing
3. Progress percentage

### Test 15: Restore Options
1. Select restore options:
   - Database only
   - Files only
   - Configuration
   - Skip verification
2. Test restore mode
3. Custom path option

### Test 16: Point-in-Time Recovery
1. Select backup with timestamp
2. Choose restore point
3. Specify exact time
4. Preview affected data
5. Execute recovery

### Test 17: Export JSON
1. Click Export/Import tab
2. Click JSON button
3. Select data types:
   - Users
   - Worksheets
   - Templates
   - Media
4. Download starts

### Test 18: Export CSV
1. Click CSV button
2. Table selection dialog
3. Choose columns
4. Set delimiter
5. File downloads

### Test 19: Export SQL
1. Click SQL button
2. Database dump options:
   - Schema only
   - Data only
   - Schema + data
3. Include indexes
4. SQL file downloads

### Test 20: Export XML
1. Click XML button
2. Structured export
3. Includes metadata
4. Valid XML format
5. Can be reimported

### Test 21: Export ZIP
1. Click ZIP button
2. All formats included
3. Compression applied
4. Password protection option
5. Archive downloads

### Test 22: Import Data
1. Drag file to upload area
2. Or click to browse
3. File validation:
   - Format check
   - Size limit
   - Structure validation
4. Preview shown

### Test 23: Import Validation
1. Upload file
2. Validation runs:
   - Schema matching
   - Data type checking
   - Constraint validation
3. Errors highlighted
4. Fix suggestions shown

### Test 24: Import Mapping
1. After validation
2. Field mapping UI:
   - Source fields
   - Target fields
   - Transformation options
3. Preview mappings
4. Confirm import

### Test 25: Import Progress
1. Import starts
2. Progress shows:
   - Records processed
   - Success count
   - Error count
   - Skip count
3. Can pause/resume

### Test 26: Disaster Recovery Tab
1. Click Disaster Recovery
2. Shows DR status:
   - Plan configured
   - RTO/RPO objectives
   - Test results
   - Failover readiness
3. Warning alerts

### Test 27: DR Test
1. Click "Initiate Failover Test"
2. Test type selection:
   - Tabletop
   - Partial
   - Full simulation
3. Test runs
4. Results recorded

### Test 28: Configure DR Plan
1. Click "Configure DR Plan"
2. Form opens:
   - Recovery procedures
   - Contact list
   - Resource requirements
   - Priority order
3. Save plan

### Test 29: Recovery Metrics
1. View metrics panel
2. RTO calculation:
   - Based on backup size
   - Network speed
   - Restore complexity
3. RPO shows data loss window
4. Recommendations shown

### Test 30: Storage Management
1. View storage usage
2. Breakdown by:
   - Backup type
   - Age
   - Location
3. Cleanup suggestions
4. Archive old backups

## Advanced Testing

### Test 31: Automated Cleanup
1. Configure retention policy
2. Run cleanup job
3. Old backups marked
4. Confirmation required
5. Space reclaimed

### Test 32: Backup Encryption
1. Enable encryption
2. Select algorithm:
   - AES-256
   - RSA-2048
   - ChaCha20
3. Key management
4. Verify encrypted

### Test 33: Cloud Storage
1. Configure cloud provider:
   - AWS S3
   - Azure Blob
   - Google Cloud
2. Test connection
3. Upload backup
4. Verify in console

### Test 34: Backup Compression
1. Enable compression
2. Select type:
   - gzip
   - bzip2
   - 7z
3. Compare sizes
4. Test decompression

### Test 35: Notification Setup
1. Configure notifications:
   - Email on success
   - SMS on failure
   - Slack webhook
2. Test each channel
3. Verify delivery

## API Testing

### Get Backup List
```bash
curl /api/admin/backup/list
```

### Create Manual Backup
```bash
curl -X POST /api/admin/backup/create \
  -H "Content-Type: application/json" \
  -d '{"type": "full"}'
```

### Start Restore
```bash
curl -X POST /api/admin/backup/restore \
  -H "Content-Type: application/json" \
  -d '{
    "backupId": "backup_1",
    "options": {
      "restoreDatabase": true,
      "restoreFiles": false
    }
  }'
```

### Export Data
```bash
curl -X POST /api/admin/backup/export \
  -H "Content-Type: application/json" \
  -d '{
    "format": "json",
    "includeData": {
      "users": true,
      "worksheets": true
    }
  }'
```

### Get Schedules
```bash
curl /api/admin/backup/schedules
```

## Performance Benchmarks
1. Dashboard load: < 1 second
2. Backup list (100 items): < 500ms
3. Full backup (1GB): < 5 minutes
4. Incremental backup: < 1 minute
5. Restore (1GB): < 10 minutes
6. Export (JSON, 10MB): < 2 seconds
7. Import validation: < 3 seconds
8. Health check: < 200ms

## Success Criteria
✅ Backup dashboard functional
✅ Manual backups work
✅ Schedules execute on time
✅ Restore operations complete
✅ Data exports in all formats
✅ Import with validation
✅ Health monitoring accurate
✅ DR planning tools work
✅ Retention policies enforced
✅ Notifications delivered

## Common Issues & Solutions

### Issue: Backup fails to start
- Check storage permissions
- Verify disk space available
- Review error logs
- Test connection to storage

### Issue: Restore takes too long
- Check network bandwidth
- Verify no locks on database
- Consider incremental restore
- Optimize indexes first

### Issue: Export file corrupted
- Verify export completed
- Check encoding settings
- Test with smaller dataset
- Review memory limits

### Issue: Import validation fails
- Check data format
- Verify schema compatibility
- Review constraint violations
- Fix data types

### Issue: Schedule doesn't run
- Verify cron service running
- Check schedule enabled
- Review time zone settings
- Test manual execution

## Backup Best Practices
1. Test restores regularly
2. Verify backup integrity
3. Keep offsite copies
4. Document procedures
5. Monitor health metrics
6. Rotate encryption keys
7. Archive old backups
8. Maintain 3-2-1 rule

## Recovery Best Practices
1. Practice DR procedures
2. Keep contacts updated
3. Test failover quarterly
4. Document dependencies
5. Verify restore points
6. Monitor RTO/RPO
7. Update runbooks
8. Train team members

## Security Considerations
1. Encrypt sensitive backups
2. Secure storage access
3. Audit restore operations
4. Limit admin permissions
5. Use secure transport
6. Rotate credentials
7. Monitor access logs
8. Implement MFA

## Next Steps
Step 29 will implement Admin Tools with:
- User impersonation
- System diagnostics
- Debug console
- Feature flags
- A/B testing framework
- Configuration management