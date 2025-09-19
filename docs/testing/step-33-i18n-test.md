# Step 33: Internationalization (i18n) - Test Guide

## Overview
This step implements comprehensive internationalization features including multi-language support, translation management, locale detection, currency/number/date formatting, RTL support, and a complete translation editor interface.

## Components Created

### 1. i18n Types
- `types/i18n.ts`: Complete i18n type definitions
- Locale and translation types
- Translation projects and tasks
- Quality assurance types
- Import/export configurations
- Glossary and plural rules

### 2. i18n Utilities
- `lib/i18n-utils.ts`: Localization functions
- Locale detection and matching
- Translation interpolation
- Date/time/number formatting
- Plural form handling
- RTL support detection
- Quality validation

### 3. Translation Management UI
- `app/admin/translations/page.tsx`: Translation management interface
- 9-tab comprehensive dashboard
- Translation editor
- Project management
- Quality control
- Import/export tools

### 4. API Endpoints
- Locale management
- Translation CRUD
- Import/export handlers
- Quality checks
- Statistics

## Testing Instructions

### Prerequisites
1. Admin access required
2. Multiple locales configured
3. Translation data populated
4. Source locale defined

### Test 1: Dashboard Load
1. Navigate to /admin/translations
2. Verify displays:
   - Total locales count
   - Translation keys count
   - Active projects
   - Pending tasks
3. Current locale shown

### Test 2: Locale Display
1. View locale selector
2. Shows flag emoji
3. Native name displayed
4. Locale code visible
5. Direction indicated

### Test 3: Overview Tab
1. Default tab is Overview
2. Statistics cards show
3. Progress bars for each locale
4. Completeness percentages
5. Quality issues summary

### Test 4: Translation Progress
1. View locale progress bars
2. Color coding:
   - Green: 90%+ complete
   - Yellow: 70-89%
   - Red: <70%
3. Key counts accurate
4. Contributors shown

### Test 5: Translations Tab
1. Click Translations tab
2. Table displays:
   - Translation keys
   - Source text
   - Target translations
   - Status badges
3. Search works

### Test 6: Search Translations
1. Enter search term
2. Filters by key or value
3. Results update live
4. Highlighting works
5. Clear search resets

### Test 7: Filter by Namespace
1. Select namespace
2. Only matching keys show
3. "All Namespaces" option
4. Count updates
5. Persists on refresh

### Test 8: Filter by Status
1. Select status filter
2. Options:
   - Draft
   - Review
   - Approved
   - Published
3. Filters correctly

### Test 9: Edit Translation
1. Click on translation
2. Edit mode opens
3. Textarea appears
4. Save/cancel buttons
5. Changes persist

### Test 10: Placeholder Detection
1. View translation with placeholders
2. Shows placeholder list
3. Format: {{name}} or {name}
4. Validation on save
5. Warning if missing

### Test 11: RTL Support
1. Select Arabic/Hebrew locale
2. Text direction changes
3. Editor shows RTL
4. Preview in RTL
5. Layout adjusts

### Test 12: Editor Tab
1. Click Editor tab
2. Side-by-side view
3. Source on left
4. Target on right
5. Live preview below

### Test 13: Batch Translation
1. Select multiple keys
2. Batch actions appear
3. Can approve all
4. Can mark for review
5. Progress updates

### Test 14: Projects Tab
1. Click Projects tab
2. Project list shows
3. Progress percentages
4. Team members
5. Deadlines visible

### Test 15: Create Project
1. Click New Project
2. Form appears:
   - Name
   - Target locales
   - Deadline
   - Team assignment
3. Creates successfully

### Test 16: Tasks Tab
1. Click Tasks tab
2. Task list shows:
   - Type and priority
   - Assigned to
   - Due date
   - Progress
3. Filter options

### Test 17: Task Assignment
1. Create new task
2. Select translator
3. Set deadline
4. Add notes
5. Email notification sent

### Test 18: Glossary Tab
1. Click Glossary tab
2. Terms list shows
3. Translations per locale
4. Context provided
5. Search works

### Test 19: Add Glossary Term
1. Click Add Term
2. Enter term
3. Add translations
4. Set context
5. Case sensitivity option

### Test 20: Quality Tab
1. Click Quality tab
2. Issues list shows:
   - Missing translations
   - Length issues
   - Placeholder errors
   - Consistency problems
3. Severity indicators

### Test 21: Auto-fix Issues
1. View fixable issue
2. Auto-fix button shown
3. Click to fix
4. Issue resolved
5. History logged

### Test 22: Import Translations
1. Click Import/Export tab
2. Select file format:
   - JSON
   - CSV
   - XLIFF
   - PO
3. Upload file
4. Preview changes
5. Import successful

### Test 23: Export Translations
1. Select export format
2. Choose locales
3. Select namespaces
4. Include metadata option
5. Download file

### Test 24: Machine Translation
1. Select untranslated key
2. Machine translate button
3. Suggestion appears
4. Can accept/reject
5. Marked as machine translated

### Test 25: Translation Memory
1. Similar translations suggested
2. Percentage match shown
3. Can apply suggestion
4. History tracked
5. Improves over time

### Test 26: Locale Settings
1. Click Settings tab
2. Configure:
   - Date format
   - Time format
   - Number format
   - Currency
3. Preview changes
4. Save settings

### Test 27: Plural Forms
1. View plural key
2. Forms shown:
   - Zero
   - One
   - Few
   - Many
   - Other
3. Examples provided

### Test 28: Date Formatting
1. Test date display
2. Format per locale:
   - US: MM/DD/YYYY
   - EU: DD/MM/YYYY
   - ISO: YYYY-MM-DD
3. Relative times work

### Test 29: Number Formatting
1. Test number display
2. Decimal separator
3. Thousand separator
4. Grouping works
5. Locale-specific

### Test 30: Currency Formatting
1. Test currency display
2. Symbol position
3. Decimal places
4. Negative format
5. Conversion rates

## Advanced Testing

### Test 31: Fallback Locale
1. Missing translation
2. Falls back to default
3. Then to key
4. Logged for fixing
5. User sees content

### Test 32: Context Switching
1. Same key, different contexts
2. Context-specific translations
3. Proper selection
4. Examples:
   - Formal/informal
   - Gender-specific

### Test 33: Version Control
1. Translation history
2. Show changes
3. Revert option
4. Blame view
5. Conflict resolution

### Test 34: Collaboration
1. Multiple translators
2. Real-time updates
3. Locking mechanism
4. Comments/notes
5. Notifications

### Test 35: Performance
1. Large translation sets
2. Lazy loading
3. Caching works
4. Search optimized
5. Fast switching

## API Testing

### Get Locales
```bash
curl /api/i18n/locales
```

### Get Translations
```bash
curl "/api/i18n/translations?locale=es-ES&namespace=common"
```

### Update Translation
```bash
curl -X PUT /api/i18n/translations/trans_123 \
  -H "Content-Type: application/json" \
  -d '{
    "value": "Hola Mundo",
    "status": "approved"
  }'
```

### Import Translations
```bash
curl -X POST /api/i18n/import \
  -F "file=@translations.json" \
  -F "format=json" \
  -F "locale=fr-FR"
```

### Export Translations
```bash
curl -X POST /api/i18n/export \
  -H "Content-Type: application/json" \
  -d '{
    "format": "json",
    "locales": ["es-ES", "fr-FR"],
    "namespaces": ["common", "dashboard"]
  }'
```

## Formatting Examples

### Date Formatting
```javascript
// US: 12/25/2024
// UK: 25/12/2024
// ISO: 2024-12-25
// Japan: 2024年12月25日
```

### Number Formatting
```javascript
// US: 1,234,567.89
// Germany: 1.234.567,89
// France: 1 234 567,89
// India: 12,34,567.89
```

### Currency Formatting
```javascript
// US: $1,234.56
// UK: £1,234.56
// EU: 1.234,56 €
// Japan: ¥1,235
```

## Performance Benchmarks
1. Locale switch: < 100ms
2. Translation load: < 500ms
3. Search response: < 200ms
4. Import processing: < 5 seconds
5. Export generation: < 3 seconds
6. Quality check: < 2 seconds
7. Save translation: < 300ms
8. Format operation: < 10ms

## Success Criteria
✅ All locales load correctly
✅ Translations display properly
✅ RTL languages work
✅ Formatting is locale-specific
✅ Search and filters work
✅ Import/export functional
✅ Quality checks run
✅ Collaboration features work
✅ Performance targets met
✅ Fallbacks work correctly

## Common Issues & Solutions

### Issue: Translations not loading
- Check locale code format
- Verify namespace exists
- Check API response
- Review console errors

### Issue: RTL layout broken
- Check direction attribute
- Verify CSS supports RTL
- Test text alignment
- Check form inputs

### Issue: Placeholders not replaced
- Verify placeholder format
- Check parameter passing
- Review interpolation
- Test edge cases

### Issue: Wrong date/number format
- Check locale settings
- Verify Intl support
- Review format patterns
- Test browser compatibility

### Issue: Import fails
- Check file format
- Verify encoding (UTF-8)
- Review data structure
- Check for conflicts

## Best Practices
1. Always provide context for translators
2. Use consistent key naming
3. Avoid hardcoded strings
4. Test with real translations
5. Consider text expansion (German ~30% longer)
6. Use placeholder for dynamic content
7. Implement proper fallbacks
8. Regular quality checks

## Locale Considerations
1. **Text Expansion**: German/Russian ~30% longer
2. **Character Sets**: Chinese/Japanese/Arabic special handling
3. **Reading Direction**: Arabic/Hebrew RTL
4. **Date Formats**: US vs EU vs ISO
5. **Number Formats**: Decimal/thousand separators
6. **Currency**: Symbol position and format
7. **Pluralization**: Language-specific rules
8. **Formality**: Languages with formal/informal forms

## Next Steps
Step 34 will implement Email System with:
- Template management
- Email campaigns
- Transactional emails
- Email tracking
- Bounce handling

## Notes
- Good i18n is invisible to users
- Always test with native speakers
- Consider cultural differences
- Maintain translation consistency
- Document context for translators