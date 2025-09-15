# Content Management Strategy - LessonCraftStudio

## 🎯 Unified Content Management Approach

### Primary Principle
**Use the right tool for the right job** - Both Directus and Custom Manager serve different purposes and should coexist.

---

## 📋 When to Use Each System

### Use Custom Content Manager For:
✅ **Daily Operations**
- Uploading new images
- Batch editing translations
- Assigning themes to images
- Quick preview and testing
- Bulk operations (assign themes, delete, etc.)
- Non-technical staff tasks

**Access**: http://localhost:3000/worksheet-generators/admin-dashboard.html

### Use Directus Admin For:
✅ **System Administration**
- Creating new themes/categories
- Database schema changes
- User permission management
- API token management
- System monitoring
- Database backups
- Advanced queries

**Access**: http://localhost:8055/admin
- Email: admin@example.com
- Password: lcsadmin123!

---

## 🔄 Recommended Workflow

### For Adding New Content:

1. **Create Theme/Category** (Directus)
   - Login to Directus
   - Create new theme in `image_themes`
   - Set translations and metadata

2. **Upload Images** (Custom Manager)
   - Use bulk upload feature
   - Auto-assigns to themes
   - Easier preview interface

3. **Edit Metadata** (Custom Manager)
   - Update translations
   - Assign tags
   - Set app-specific flags

4. **Test in Apps** (Frontend)
   - Open any worksheet app
   - Verify images appear
   - Check translations work

### For System Changes:

1. **Schema Updates** (Directus)
   - Add new fields
   - Create relationships
   - Set permissions

2. **API Updates** (Code)
   - Update V2 API if needed
   - Modify WorksheetBase class
   - Test thoroughly

3. **UI Updates** (Custom Manager)
   - Add new form fields
   - Update batch operations
   - Test workflow

---

## 🚀 Improvements to Implement

### Phase 1: Cache Management (Immediate)
```javascript
// Add to Custom Content Manager
function clearAppCaches() {
  // Send cache clear signal to all apps
  fetch('/api/cache/clear', { method: 'POST' });
  localStorage.setItem('cache_cleared', Date.now());
}

// Add "Clear App Caches" button to admin dashboard
```

### Phase 2: Real-time Sync (Week 1)
```javascript
// WebSocket for instant updates
const ws = new WebSocket('ws://localhost:3001/content-updates');
ws.on('content-changed', (data) => {
  // Invalidate specific cache entries
  cacheManager.invalidate(data.collection, data.id);
});
```

### Phase 3: Role-Based Access (Week 2)
```javascript
// Different access levels for custom manager
const roles = {
  admin: ['*'], // All operations
  editor: ['create', 'update', 'read'],
  viewer: ['read']
};
```

### Phase 4: Audit Trail (Week 3)
```sql
-- Track all changes
CREATE TABLE content_audit (
  id UUID PRIMARY KEY,
  user_id UUID,
  action VARCHAR(50),
  collection VARCHAR(100),
  item_id UUID,
  changes JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔧 Technical Integration Points

### 1. Shared Authentication
```javascript
// Use same JWT tokens for both systems
const authToken = await getDirectusToken();
customManager.setAuth(authToken);
```

### 2. Unified API Layer
```javascript
// All content operations go through V2 API
class ContentAPI {
  async create(collection, data) {
    return fetch(`/api/v2/${collection}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async update(collection, id, data) {
    return fetch(`/api/v2/${collection}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}
```

### 3. Consistent Data Model
```typescript
interface ImageAsset {
  // Same structure used everywhere
  id: string;
  file_name: string;
  image_file: string;
  theme_id: string;
  translations: Record<string, string>;
  tags: string[];
  app_specific: string[];
  status: 'active' | 'inactive';
}
```

---

## 📊 Monitoring & Maintenance

### Daily Checks
- [ ] Verify image upload pipeline
- [ ] Check sync status
- [ ] Monitor API response times
- [ ] Review error logs

### Weekly Tasks
- [ ] Backup Directus database
- [ ] Clear old cache entries
- [ ] Review unused images
- [ ] Update translations

### Monthly Tasks
- [ ] Audit user permissions
- [ ] Analyze usage patterns
- [ ] Optimize slow queries
- [ ] Archive old content

---

## 🎨 Best Practices

### DO's ✅
1. **Always use API** - Never modify database directly
2. **Test in staging** - Before production changes
3. **Batch operations** - For bulk updates
4. **Regular backups** - Before major changes
5. **Document changes** - In change log

### DON'Ts ❌
1. **Don't mix systems** - Use one tool per task
2. **Don't skip validation** - Always validate inputs
3. **Don't ignore errors** - Log and handle all errors
4. **Don't hardcode IDs** - Use dynamic lookups
5. **Don't bypass cache** - Respect TTL settings

---

## 🔄 Migration Path

### Current State
- Custom manager at v1.0
- Directus at v10.8
- Apps using mixed APIs

### Target State (End of Month)
- Custom manager v2.0 with V2 API
- Directus remains backend
- All apps on V2 API
- Real-time sync enabled
- Full audit trail

### Migration Steps
1. Week 1: Update custom manager to V2 API
2. Week 2: Migrate all apps to WorksheetBase
3. Week 3: Implement real-time sync
4. Week 4: Add audit trail and monitoring

---

## 🚨 Troubleshooting Guide

### Issue: Changes not showing in apps
**Solution**:
1. Clear browser cache
2. Wait 5 minutes (cache TTL)
3. Check API response
4. Verify Directus sync

### Issue: Upload fails in custom manager
**Solution**:
1. Check file size (max 10MB)
2. Verify file type (PNG, JPG, SVG)
3. Check Directus storage
4. Review error logs

### Issue: Translations not working
**Solution**:
1. Verify locale parameter
2. Check translation field structure
3. Ensure locale is supported
4. Clear translation cache

### Issue: Performance degradation
**Solution**:
1. Check database indexes
2. Review query complexity
3. Increase cache TTL
4. Implement pagination

---

## 📝 Quick Reference

### URLs
- **Custom Manager**: http://localhost:3000/worksheet-generators/admin-dashboard.html
- **Directus Admin**: http://localhost:8055/admin
- **V2 API Docs**: http://localhost:3000/api/docs
- **Test Page**: http://localhost:3000/worksheet-generators/alphabet-train-v2.html

### API Endpoints
- **Images**: `/api/images/v2`
- **Borders**: `/api/borders/images`
- **Backgrounds**: `/api/backgrounds/images`
- **Templates**: `/api/train-templates`
- **Batch**: `/api/images/v2/batch`

### Key Files
- **V2 API**: `frontend/app/api/images/v2/route.ts`
- **WorksheetBase**: `frontend/public/worksheet-generators/js/worksheet-base.js`
- **Custom Manager**: `frontend/public/worksheet-generators/admin-dashboard.html`
- **Image Manager**: `frontend/lib/image-library-manager.ts`

---

*This strategy ensures both content management systems work in harmony while maintaining data integrity and system performance.*