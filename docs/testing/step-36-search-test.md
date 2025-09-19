# Step 36: Search and Discovery - Test Guide

## Overview
This step implements a comprehensive search and discovery system including full-text search, faceted filtering, search analytics, AI recommendations, and personalized search experiences.

## Components Created

### 1. Search Types
- `types/search.ts`: Complete search system type definitions
- Query and filter types
- Facets and aggregations
- Search analytics and metrics
- Recommendations and personalization
- A/B testing configurations

### 2. Search Utilities
- `lib/search-utils.ts`: Search processing functions
- Query parsing and optimization
- Filter and facet handling
- Result ranking and scoring
- Snippet extraction and highlighting
- Spell correction and suggestions
- Personalized recommendations

### 3. Search Interface
- `app/search/page.tsx`: Search and discovery UI
- Advanced search with autocomplete
- Faceted filtering sidebar
- Grid and list view modes
- Search history and saved searches
- Related searches and suggestions

## Testing Instructions

### Prerequisites
1. Search index configured
2. Sample content indexed
3. User session active
4. Analytics enabled

### Test 1: Basic Search
1. Navigate to /search
2. Enter search query
3. Press Enter or click Search
4. Results displayed
5. Result count shown

### Test 2: Autocomplete
1. Type in search box
2. Suggestions appear
3. Shows query suggestions
4. Shows result previews
5. Click suggestion works

### Test 3: Search Types
1. Select search type:
   - All
   - Worksheets
   - Templates
   - Images
   - Help
2. Results filtered by type

### Test 4: Advanced Search
1. Click Advanced button
2. Options panel opens
3. Toggle settings:
   - Fuzzy matching
   - Include synonyms
   - Highlight results
4. Search applies options

### Test 5: Query Operators
1. Test phrase search: "exact phrase"
2. Test exclusion: -exclude
3. Test field search: title:keyword
4. Test wildcard: test*
5. Operators work correctly

### Test 6: Search Results
1. Results show title
2. Description snippet
3. Category/type badge
4. Last updated date
5. Relevance score

### Test 7: Result Highlighting
1. Search terms highlighted
2. In title if matched
3. In description snippet
4. Multiple terms highlighted
5. HTML preserved

### Test 8: Snippet Extraction
1. Shows context around match
2. Ellipsis for truncation
3. Best match shown
4. Appropriate length
5. Word boundaries respected

### Test 9: Faceted Filtering
1. Facets sidebar shown
2. Categories listed
3. Document counts shown
4. Checkboxes work
5. Multiple selections

### Test 10: Filter Application
1. Select filter
2. Results update
3. Count changes
4. Filter badge shown
5. Clear filter works

### Test 11: Multiple Filters
1. Apply multiple filters
2. AND logic applied
3. Results narrowed
4. Clear all option
5. Individual removal

### Test 12: Sort Options
1. Sort dropdown shown
2. Options:
   - Relevance
   - Date (newest)
   - Popularity
3. Results reorder
4. Maintains filters

### Test 13: View Modes
1. List view default
2. Grid view option
3. Toggle switches view
4. Layout appropriate
5. Information preserved

### Test 14: Pagination
1. Results paginated
2. Load more button
3. Incremental loading
4. Scroll position maintained
5. No duplicates

### Test 15: Zero Results
1. Search with no matches
2. "No results" message
3. Spell check suggestion
4. Alternative searches
5. Clear messaging

### Test 16: Spell Correction
1. Misspell query
2. "Did you mean" shown
3. Click correction
4. Search re-runs
5. Results improve

### Test 17: Related Searches
1. View search results
2. Related searches shown
3. Based on content
4. Click to search
5. Relevant suggestions

### Test 18: Search History
1. Recent searches saved
2. Shows on homepage
3. Click to repeat
4. Timestamp shown
5. Limited to recent

### Test 19: Save Search
1. Perform search
2. Click Save Search
3. Name the search
4. Add description
5. Saved successfully

### Test 20: Saved Searches
1. View saved searches
2. Listed with names
3. Click to run
4. Edit option
5. Delete option

### Test 21: Search Alerts
1. Click Create Alert
2. Configure alert:
   - Frequency
   - Conditions
   - Channels
3. Alert created
4. Notifications work

### Test 22: Alert Conditions
1. New results alert
2. Threshold alert
3. Change detection
4. Anomaly detection
5. Custom conditions

### Test 23: Search Analytics
1. View analytics dashboard
2. Shows metrics:
   - Total searches
   - Click-through rate
   - Zero results rate
   - Popular queries
3. Time series charts

### Test 24: Top Queries
1. Most searched terms
2. Search volume
3. Success rate
4. Click positions
5. Trends shown

### Test 25: Search Performance
1. Response time shown
2. Under 200ms target
3. Timeout handling
4. Error recovery
5. Cache indicators

### Test 26: Personalization
1. Results personalized
2. Based on history
3. User preferences
4. Click behavior
5. Improves over time

### Test 27: Recommendations
1. Recommended items shown
2. Based on search
3. User behavior
4. Collaborative filtering
5. Diverse results

### Test 28: Search Intent
1. Detects intent:
   - Browse
   - Find specific
   - Compare
   - Learn
   - Troubleshoot
2. Adjusts results

### Test 29: Contextual Search
1. Location aware
2. Device specific
3. Time sensitive
4. Session context
5. User role based

### Test 30: Search Filters UI
1. Filter pills shown
2. Active filters visible
3. Remove individual
4. Filter count badge
5. Responsive layout

### Test 31: Advanced Filters
1. Date range filter
2. Size filter
3. Author filter
4. Status filter
5. Custom attributes

### Test 32: Search Export
1. Export results option
2. Formats:
   - CSV
   - JSON
   - PDF
3. Includes metadata
4. Respects filters

### Test 33: Search API
1. API endpoint works
2. Authentication required
3. Rate limiting
4. Response format
5. Error handling

### Test 34: Multi-language
1. Search in any language
2. Results in user language
3. Translated facets
4. Localized sorting
5. RTL support

### Test 35: Synonyms
1. Synonym expansion works
2. Related terms found
3. Configurable synonyms
4. Domain-specific
5. User feedback

### Test 36: Search Indexing
1. New content indexed
2. Real-time updates
3. Batch indexing
4. Index statistics
5. Reindex option

### Test 37: A/B Testing
1. Test variants active
2. Random assignment
3. Metrics tracked
4. Statistical significance
5. Winner selection

### Test 38: Voice Search
1. Voice input option
2. Speech recognition
3. Query transcription
4. Confirmation step
5. Results shown

### Test 39: Visual Search
1. Upload image
2. Similar images found
3. Visual similarity
4. Metadata matching
5. Combined search

### Test 40: Search Sharing
1. Share search results
2. Generate link
3. Include filters
4. Preserve view
5. Social sharing

## Performance Testing

### Search Query
```bash
# Basic search
curl -X POST /api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "worksheet", "type": "all"}'

# Filtered search
curl -X POST /api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "math",
    "filters": [{"field": "category", "value": "education"}]
  }'
```

### Autocomplete
```bash
curl "/api/search/autocomplete?q=work&type=all"
```

### Analytics
```bash
curl "/api/search/analytics?period=week"
```

## Performance Benchmarks
1. Search response: < 200ms
2. Autocomplete: < 100ms
3. Facet calculation: < 50ms
4. Highlighting: < 10ms
5. Index update: < 1 second
6. Recommendation: < 300ms
7. Analytics query: < 500ms
8. Export generation: < 5 seconds

## Success Criteria
✅ Search returns relevant results
✅ Filters narrow results
✅ Autocomplete suggests accurately
✅ Highlighting works correctly
✅ Facets calculate properly
✅ History tracks searches
✅ Saved searches persist
✅ Analytics provide insights
✅ Recommendations are relevant
✅ Performance targets met

## Common Issues & Solutions

### Issue: Slow search response
- Check index optimization
- Review query complexity
- Enable caching
- Optimize facet queries

### Issue: Poor relevance
- Tune scoring algorithm
- Adjust field boosts
- Improve synonyms
- Check analyzer config

### Issue: Autocomplete not working
- Check index settings
- Verify ngram tokenizer
- Review min characters
- Check debounce timing

### Issue: Facets incorrect
- Verify field mapping
- Check aggregation query
- Review data types
- Update index mapping

### Issue: Highlighting broken
- Check highlighter config
- Verify field storage
- Review HTML escaping
- Check fragment size

## Best Practices
1. Use appropriate analyzers for content
2. Implement query suggestion logging
3. Cache frequent searches
4. Monitor zero-result queries
5. A/B test ranking changes
6. Provide search tips
7. Track click-through rates
8. Optimize for mobile search

## Search Optimization
1. **Query Understanding**: Parse user intent
2. **Synonym Expansion**: Include related terms
3. **Stemming**: Match word variations
4. **Fuzzy Matching**: Handle typos
5. **Boosting**: Prioritize important fields
6. **Personalization**: User-specific ranking
7. **Learning to Rank**: ML-based scoring
8. **Query Rewriting**: Improve query automatically

## Next Steps
Step 37 will implement Notifications with:
- Push notifications
- Email notifications
- In-app notifications
- SMS notifications
- Notification preferences

## Notes
- Search is critical for content discovery
- Relevance tuning is ongoing process
- User feedback improves search quality
- Analytics drive search improvements
- Performance impacts user experience