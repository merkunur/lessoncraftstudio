'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SearchQuery,
  SearchResponse,
  SearchFilter,
  FacetBucket,
  SearchHistory,
  SavedSearch,
  SearchAlert,
  SearchAnalytics,
  AutocompleteSuggestion
} from '@/types/search';
import {
  buildSearchQuery,
  parseSearchQuery,
  applyFilters,
  buildFilterFromFacet,
  highlightTerms,
  extractSnippet,
  generateSuggestions,
  buildAutocompleteSuggestions,
  calculateFacetStats,
  generateRelatedSearches,
  detectSearchIntent
} from '@/lib/search-utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'worksheets' | 'templates' | 'images' | 'help'>('all');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchAlerts, setSearchAlerts] = useState<SearchAlert[]>([]);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'popularity'>('relevance');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    loadSearchData();
    searchInputRef.current?.focus();
  }, []);

  async function loadSearchData() {
    try {
      const [historyRes, savedRes, alertsRes] = await Promise.all([
        fetch('/api/search/history'),
        fetch('/api/search/saved'),
        fetch('/api/search/alerts')
      ]);

      if (historyRes.ok) setSearchHistory(await historyRes.json());
      if (savedRes.ok) setSavedSearches(await savedRes.json());
      if (alertsRes.ok) setSearchAlerts(await alertsRes.json());
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  }

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const searchRequest = buildSearchQuery(q, {
        type: searchType,
        filters,
        sort: [
          sortBy === 'date' ? { field: 'createdAt', order: 'desc' } :
          sortBy === 'popularity' ? { field: 'viewCount', order: 'desc' } :
          { field: '_score', order: 'desc' }
        ],
        options: {
          fuzzy: true,
          synonyms: true,
          highlight: true,
          highlightFields: ['title', 'description', 'content']
        }
      });

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchRequest)
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);

        // Save to history
        const historyItem: SearchHistory = {
          id: `history_${Date.now()}`,
          userId: 'current_user',
          query: q,
          filters,
          resultsCount: data.total,
          searchDuration: data.performance.took,
          timestamp: new Date().toISOString(),
          successful: true
        };
        setSearchHistory(prev => [historyItem, ...prev.slice(0, 99)]);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, [query, searchType, filters, sortBy]);

  const handleAutocomplete = useCallback(async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search/autocomplete?q=${encodeURIComponent(value)}&type=${searchType}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Autocomplete failed:', error);
      }
    }, 200);
  }, [searchType]);

  const handleFilterToggle = (field: string, value: any) => {
    setFilters(prev => {
      const existing = prev.findIndex(f => f.field === field && f.value === value);
      if (existing >= 0) {
        return prev.filter((_, i) => i !== existing);
      } else {
        return [...prev, buildFilterFromFacet(field, value)];
      }
    });
  };

  const saveSearch = async (name: string, description?: string) => {
    const saved: SavedSearch = {
      id: `saved_${Date.now()}`,
      userId: 'current_user',
      name,
      description,
      query: buildSearchQuery(query, { type: searchType, filters }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/search/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saved)
      });

      if (response.ok) {
        setSavedSearches(prev => [saved, ...prev]);
        setShowSaveModal(false);
      }
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  };

  const renderSearchBar = () => (
    <div className="relative">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleAutocomplete(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              } else if (e.key === 'Escape') {
                setShowSuggestions(false);
              }
            }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search worksheets, templates, images, and more..."
            className="w-full px-4 py-3 pr-12 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
            disabled={isSearching}
          >
            {isSearching ? '⏳' : '🔍'}
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion.text);
                    setShowSuggestions(false);
                    handleSearch(suggestion.text);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {suggestion.type === 'query' && <span>🔍</span>}
                    {suggestion.type === 'result' && <span>📄</span>}
                    {suggestion.type === 'category' && <span>📁</span>}
                    <div>
                      <p className="font-medium">{suggestion.text}</p>
                      {suggestion.payload?.description && (
                        <p className="text-sm text-gray-500">{suggestion.payload.description}</p>
                      )}
                    </div>
                  </div>
                  {suggestion.payload?.category && (
                    <span className="text-sm text-gray-400">{suggestion.payload.category}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as any)}
          className="px-4 py-3 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="worksheets">Worksheets</option>
          <option value="templates">Templates</option>
          <option value="images">Images</option>
          <option value="help">Help</option>
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-3 border rounded-lg hover:bg-gray-50"
        >
          ⚙️ Advanced
        </button>

        <button
          onClick={() => handleSearch()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={isSearching || !query.trim()}
        >
          Search
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-3">Advanced Options</h3>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Fuzzy matching</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Include synonyms</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Highlight results</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );

  const renderFilters = () => {
    if (!results?.facets || results.facets.length === 0) return null;

    return (
      <div className="w-64 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Filters</h3>
          {filters.length > 0 && (
            <button
              onClick={() => setFilters([])}
              className="text-sm text-blue-500 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {results.facets.map(facet => (
          <div key={facet.field} className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">
              {facet.field.charAt(0).toUpperCase() + facet.field.slice(1)}
            </h4>
            <div className="space-y-1">
              {facet.buckets.slice(0, 5).map(bucket => {
                const isSelected = filters.some(
                  f => f.field === facet.field && f.value === bucket.key
                );
                return (
                  <label
                    key={bucket.key}
                    className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFilterToggle(facet.field, bucket.key)}
                      className="rounded"
                    />
                    <span className="flex-1">{bucket.label || bucket.key}</span>
                    <span className="text-sm text-gray-400">({bucket.docCount})</span>
                  </label>
                );
              })}
              {facet.buckets.length > 5 && (
                <button className="text-sm text-blue-500 hover:underline">
                  Show {facet.buckets.length - 5} more
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;

    if (results.total === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No results found for "{query}"</p>
          {results.spellcheck && (
            <p className="mb-4">
              Did you mean:{' '}
              <button
                onClick={() => {
                  setQuery(results.spellcheck.suggestion);
                  handleSearch(results.spellcheck.suggestion);
                }}
                className="text-blue-500 hover:underline"
              >
                {results.spellcheck.suggestion}
              </button>
              ?
            </p>
          )}
          {results.suggestions && results.suggestions.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Try these searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {results.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion.text);
                      handleSearch(suggestion.text);
                    }}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {results.total.toLocaleString()} results found
            {results.performance.took && ` (${results.performance.took}ms)`}
          </p>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded px-3 py-1"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
            </select>

            <div className="flex items-center gap-1 border rounded">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
              >
                ☰
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : ''}`}
              >
                ⊞
              </button>
            </div>

            <button
              onClick={() => setShowSaveModal(true)}
              className="text-blue-500 hover:underline"
            >
              💾 Save Search
            </button>

            <button
              onClick={() => setShowAlertModal(true)}
              className="text-blue-500 hover:underline"
            >
              🔔 Create Alert
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {results.results.map(result => (
              <div key={result.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer mb-1">
                      {result.highlights?.title ? (
                        <span dangerouslySetInnerHTML={{ __html: result.highlights.title[0] }} />
                      ) : (
                        result.source.title || result.source.name
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {result.highlights?.description ? (
                        <span dangerouslySetInnerHTML={{ __html: result.highlights.description[0] }} />
                      ) : (
                        extractSnippet(result.source.description || result.source.content || '', [query])
                      )}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{result.type}</span>
                      {result.source.category && <span>• {result.source.category}</span>}
                      {result.source.updatedAt && (
                        <span>• Updated {new Date(result.source.updatedAt).toLocaleDateString()}</span>
                      )}
                      <span className="text-green-600">Score: {result.score.toFixed(2)}</span>
                    </div>
                  </div>
                  {result.source.thumbnail && (
                    <img
                      src={result.source.thumbnail}
                      alt=""
                      className="w-24 h-24 object-cover rounded ml-4"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.results.map(result => (
              <div key={result.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                {result.source.thumbnail && (
                  <img
                    src={result.source.thumbnail}
                    alt=""
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                  {result.source.title || result.source.name}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {result.source.description}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>{result.type}</span>
                  <span>{result.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {results.pagination.hasNext && (
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Load More
            </button>
          </div>
        )}

        {results.relatedSearches && results.relatedSearches.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-3">Related Searches</h3>
            <div className="flex flex-wrap gap-2">
              {results.relatedSearches.map((related, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(related);
                    handleSearch(related);
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {related}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Search & Discovery</h1>

        {renderSearchBar()}

        <div className="flex gap-6">
          {results && renderFilters()}
          <div className="flex-1">
            {renderResults()}
          </div>
        </div>

        {savedSearches.length > 0 && !results && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Saved Searches</h3>
            <div className="grid grid-cols-3 gap-4">
              {savedSearches.slice(0, 6).map(saved => (
                <button
                  key={saved.id}
                  onClick={() => {
                    setQuery(saved.query.query);
                    setSearchType(saved.query.type || 'all');
                    setFilters(saved.query.filters || []);
                    handleSearch(saved.query.query);
                  }}
                  className="bg-white border rounded-lg p-3 text-left hover:shadow"
                >
                  <p className="font-medium">{saved.name}</p>
                  <p className="text-sm text-gray-500">{saved.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {searchHistory.length > 0 && !results && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.slice(0, 10).map(history => (
                <button
                  key={history.id}
                  onClick={() => {
                    setQuery(history.query);
                    handleSearch(history.query);
                  }}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  {history.query}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}