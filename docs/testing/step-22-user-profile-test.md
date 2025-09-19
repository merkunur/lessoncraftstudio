# Step 22: User Profile and Settings - Test Guide

## Overview
This step implements a comprehensive user profile system with customization options, security settings, activity tracking, and API key management for developers.

## Components Created

### 1. User Profile Interface
- `app/admin/profile/page.tsx`: Main profile management page
- Cover image and avatar customization
- Profile information editing
- Social links management
- Achievement display system
- Quick statistics overview

### 2. Profile Settings API
- `app/api/admin/profile/route.ts`: Profile CRUD operations
- Profile data validation
- Avatar upload handling
- Social links management
- Preference updates

### 3. Security Settings
- `app/api/admin/profile/security/route.ts`: Security management
- Two-factor authentication (2FA)
- Password change functionality
- Session management
- Login history tracking
- Backup codes generation

### 4. Activity History
- `app/api/admin/profile/activity/route.ts`: Activity tracking
- Event logging system
- Activity statistics
- Export functionality (CSV/JSON)
- Search and filtering

### 5. API Key Management
- `app/api/admin/profile/api-keys/route.ts`: Developer API keys
- Key generation and rotation
- Permission management
- Rate limiting configuration
- Usage statistics tracking

## Testing Instructions

### Prerequisites
1. Admin user must be logged in
2. Development server running
3. Profile data initialized

### Test 1: Profile Display
1. Navigate to `/admin/profile`
2. Verify display of:
   - Cover image
   - Avatar image
   - Display name and username
   - Bio text
   - Location and organization
   - Join date
   - Quick stats (worksheets, students, downloads, storage)

### Test 2: Edit Profile Mode
1. Click "Edit Profile" button
2. Verify editable fields:
   - Display name
   - Bio (textarea)
   - All form fields become editable
3. Make changes
4. Click "Save"
5. Verify changes persist

### Test 3: Avatar Upload
1. Enter edit mode
2. Click camera icon on avatar
3. Select image file
4. Verify:
   - Upload progress indicator
   - Avatar updates after upload
   - Success toast message

### Test 4: Profile Details Tab
1. Ensure "Profile Details" tab is active
2. Test editing:
   - First/Last name
   - Phone number
   - Job title
   - Department
3. Verify email shows verified badge

### Test 5: Social Links
1. In profile details, find social links section
2. Add/edit:
   - Twitter username
   - LinkedIn username
   - GitHub username
   - Personal website
3. Save and verify persistence

### Test 6: Achievements Display
1. Scroll to achievements section
2. Verify display of:
   - Achievement icons
   - Names and descriptions
   - Unlock dates
   - Grid layout

### Test 7: Preferences Tab
1. Click "Preferences" tab
2. Test general preferences:
   - Theme selection (Light/Dark/System)
   - Language selection
   - Timezone selection
   - Date format selection

### Test 8: Notification Preferences
1. In Preferences tab
2. Toggle checkboxes for:
   - Email notifications
   - Push notifications
   - Weekly report
   - Activity digest
   - Marketing emails
3. Verify toggles save state

### Test 9: Privacy Settings
1. In Preferences tab
2. Test privacy toggles:
   - Public profile
   - Show email
   - Show phone
3. Verify settings apply

### Test 10: Security Tab
1. Click "Security" tab
2. Verify display of:
   - Security status (green if 2FA enabled)
   - Password change button
   - Last password change date

### Test 11: Two-Factor Authentication
1. In Security tab
2. Click "Configure 2FA"
3. Test enabling process:
   - Method selection
   - Verification code entry
   - Backup codes display
4. Verify 2FA status updates

### Test 12: Active Sessions
1. In Security tab
2. View active sessions list:
   - Current session marked
   - Device/browser info
   - Location
   - Last active time
3. Test "Revoke" on non-current session

### Test 13: Password Change
1. Click "Change Password"
2. Enter:
   - Current password
   - New password (test validation)
   - Confirm password
3. Verify password requirements:
   - Min 8 characters
   - Uppercase, lowercase, number, special char

### Test 14: Activity Tab
1. Click "Activity" tab
2. Verify activity list shows:
   - Event icons
   - Descriptions
   - Timestamps
   - Metadata

### Test 15: Activity Filtering
1. In Activity tab
2. Test filters:
   - Type filter
   - Category filter
   - Date range
   - Search box
3. Verify results update

### Test 16: Activity Export
1. Click "Export" button
2. Select format:
   - CSV
   - JSON
3. Verify file downloads

### Test 17: API Keys Tab
1. Click "API Keys" tab
2. View existing keys:
   - Name
   - Masked key preview
   - Permissions
   - Rate limits
   - Status

### Test 18: Create API Key
1. Click "Create New Key"
2. Enter:
   - Key name
   - Select permissions
   - Rate limit
   - Expiration (optional)
   - IP whitelist (optional)
3. Verify:
   - Full key shown once
   - Copy button works
   - Key added to list

### Test 19: API Key Actions
1. For existing key, test:
   - Revoke (marks as revoked)
   - Rotate (generates new key)
   - Delete (permanent removal)
2. Verify confirmations required

### Test 20: API Key Usage Stats
1. Click on API key
2. View usage statistics:
   - Request count
   - Error rate
   - Response times
   - Endpoint breakdown
   - Daily/weekly charts

## API Testing

### Profile Update
```bash
curl -X PUT /api/admin/profile \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "bio": "Updated bio text",
    "preferences": {
      "theme": "dark"
    }
  }'
```

### Security Settings
```bash
# Enable 2FA
curl -X POST /api/admin/profile/security/2fa/enable \
  -d '{"method": "authenticator", "verificationCode": "123456"}'

# Change password
curl -X PATCH /api/admin/profile/security/password \
  -d '{"currentPassword": "old", "newPassword": "NewPass123!"}'
```

### Activity Export
```bash
curl -X POST /api/admin/profile/activity/export \
  -d '{"format": "csv"}'
```

### API Key Management
```bash
# Create key
curl -X POST /api/admin/profile/api-keys \
  -d '{
    "name": "Test Key",
    "permissions": ["read:worksheets"],
    "rateLimit": 100
  }'

# Revoke key
curl -X PUT /api/admin/profile/api-keys \
  -d '{"action": "revoke", "keyId": "key_1"}'
```

## Advanced Features

### Test 21: Account Security Actions
1. Test "Sign out all devices"
2. Verify current session retained
3. Other sessions terminated

### Test 22: Account Deletion
1. Click "Delete Account" (red button)
2. Verify confirmation required
3. Cancel to prevent deletion

### Test 23: Responsive Design
1. Test on mobile viewport
2. Verify:
   - Tabs stack vertically
   - Forms remain usable
   - Avatar upload works
   - Tables scroll horizontally

### Test 24: Data Validation
1. Test invalid inputs:
   - Bio > 500 characters
   - Invalid website URL
   - Weak password
   - Invalid email format
2. Verify error messages

### Test 25: Performance
1. Profile load: < 1 second
2. Tab switches: Instant
3. Save operations: < 2 seconds
4. Activity load: < 500ms
5. Export generation: < 3 seconds

## Success Criteria
✅ Profile displays correctly
✅ Edit mode works smoothly
✅ Avatar upload successful
✅ Preferences save properly
✅ Security settings functional
✅ 2FA can be enabled/disabled
✅ Sessions manageable
✅ Activity history tracks events
✅ API keys create/revoke works
✅ All validations enforce
✅ No console errors

## Common Issues & Solutions

### Issue: Avatar upload fails
- Check file size (max 5MB)
- Verify image format (JPG, PNG, GIF)
- Check network connection
- Review console for errors

### Issue: Changes don't save
- Verify in edit mode
- Check validation errors
- Ensure "Save" clicked
- Check network tab

### Issue: 2FA not working
- Verify code is current
- Check time sync
- Try backup codes
- Regenerate QR code

### Issue: API key not generating
- Check key limit (max 10)
- Verify permissions selected
- Check name uniqueness
- Review validation errors

## Security Best Practices
1. Use strong, unique passwords
2. Enable 2FA for added security
3. Regularly review active sessions
4. Rotate API keys periodically
5. Set appropriate rate limits
6. Use IP whitelisting for production keys
7. Monitor API key usage

## Next Steps
Step 23 will implement Collaboration Features with:
- Team workspace creation
- Member invitation system
- Role-based permissions
- Shared resources
- Real-time collaboration