'use client';

import { useCallback, useEffect, useState } from 'react';

/* ---------------------------------------------------------------- types -- */

/**
 * Structural subset of the auth context's User — that interface is not
 * exported, and these are the only fields the workspace reads. Declared here
 * rather than in WorkspaceClient so the gate component and the shell don't
 * import each other.
 */
export interface AuthUser {
  subscription?: {
    status: string;
    currentPeriodEnd: string;
    lsSubscriptionId?: string | null;
  };
}

export interface HostedRow {
  id: string;
  linkId: string;
  appId: string;
  title: string;
  locale: string;
  viewCount: number;
  updatedAt: string;
  url: string;
  qrUrl: string;
}

export interface ShareRow {
  id: string;
  linkId: string;
  activityId: string;
  title: string;
  locale: string;
  viewCount: number;
  updatedAt: string;
  url: string;
  qrUrl: string;
  activitySlug: string | null;
}

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  deckCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Deck.title is a Json locale map in the schema, but some rows hold a bare
 *  string — every consumer must handle both. See deckTitleFor(). */
export type DeckTitle = Record<string, string> | string;

export interface FavoriteRow {
  deckId: string;
  slug: string;
  language: string;
  title: DeckTitle;
  favoritedAt: string;
  url: string;
}

export type Activity =
  | {
      type: 'collected';
      when: string;
      deckTitle: DeckTitle;
      deckLanguage: string;
      deckSlug: string;
      collectionId: string;
      collectionName: string;
    }
  | { type: 'modified'; when: string; collectionId: string; collectionName: string }
  | {
      type: 'shared';
      when: string;
      deckTitle: DeckTitle;
      deckLanguage: string;
      deckSlug: string;
    };

/** Resolve a Deck.title Json map (or bare string) to display text. */
export function deckTitleFor(title: DeckTitle, locale: string): string {
  if (typeof title === 'string') return title;
  return title?.[locale] ?? title?.en ?? '';
}

/* ---------------------------------------------------------------- slices -- */

export type SliceStatus = 'loading' | 'ready' | 'error' | 'gated';

export interface Slice<T> {
  status: SliceStatus;
  data: T | null;
  reload: () => void;
}

interface HostedPayload {
  worksheets: HostedRow[];
  quota: { count: number; maxCount: number; totalBytes: number; maxTotalBytes: number };
}
interface SharePayload {
  shares: ShareRow[];
  limit: { count: number; maxCount: number };
}
interface CollectionsPayload {
  collections: CollectionSummary[];
}
interface FavoritesPayload {
  favorites: FavoriteRow[];
}
interface RecentPayload {
  recentActivity: Activity[];
}

export interface WorkspaceData {
  worksheets: Slice<HostedPayload>;
  activities: Slice<SharePayload>;
  collections: Slice<CollectionsPayload>;
  favorites: Slice<FavoritesPayload>;
  recent: Slice<RecentPayload>;
}

function authHeaders(): HeadersInit {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  return { Authorization: `Bearer ${token ?? ''}` };
}

/**
 * One slice per endpoint, each with its own independent status.
 *
 * The independence is the point. The previous WorkspaceClient wrapped ALL five
 * sections in `{payload !== null && (...)}` keyed off /api/workspace, so a 500
 * there blanked four sections that never depended on it. Now a failing endpoint
 * degrades only its own section.
 *
 * 401/403 maps to `gated` rather than `error`: hosted worksheets and shared
 * activities are Teacher-plan surfaces, so a 403 there is an expected state, not
 * a failure to report.
 */
function useSlice<T>(url: string, enabled: boolean): Slice<T> {
  const [status, setStatus] = useState<SliceStatus>('loading');
  const [data, setData] = useState<T | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    (async () => {
      setStatus((s) => (s === 'ready' ? s : 'loading'));
      try {
        const res = await fetch(url, { headers: authHeaders() });
        if (cancelled) return;
        if (res.status === 401 || res.status === 403) {
          setStatus('gated');
          return;
        }
        if (!res.ok) {
          setStatus('error');
          return;
        }
        setData((await res.json()) as T);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, enabled, nonce]);

  return { status, data, reload };
}

/**
 * `enabled` is a safety net, not the primary guard: this hook is only ever
 * mounted inside WorkspaceShell, which renders past the auth + subscription
 * gates. Hooks cannot be called conditionally, so keeping the gates in a parent
 * component is what actually prevents a signed-out visitor firing five 403s.
 */
export function useWorkspaceData(enabled: boolean): WorkspaceData {
  return {
    // Teacher-plan surfaces.
    worksheets: useSlice<HostedPayload>('/api/worksheets/hosted', enabled),
    activities: useSlice<SharePayload>('/api/activities/share', enabled),
    // NOT /api/workspace — that caps collections at COLLECTIONS_DISPLAY_LIMIT = 5,
    // which client-side pagination could never page past. /api/collections is
    // already unbounded and returns the identical row shape.
    collections: useSlice<CollectionsPayload>('/api/collections', enabled),
    // Free-tier surface (requireAuthenticatedUser, not requireActiveSubscriber).
    favorites: useSlice<FavoritesPayload>('/api/favorites', enabled),
    // Recent activity only — server-capped at RECENT_LIMIT = 10, so it is a feed,
    // not a paginated tab.
    recent: useSlice<RecentPayload>('/api/workspace', enabled),
  };
}
