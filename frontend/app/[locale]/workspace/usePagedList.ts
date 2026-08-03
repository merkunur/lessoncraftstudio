'use client';

import { useEffect, useState, useMemo } from 'react';

export interface PagedList<T> {
  page: number;
  pageCount: number;
  pageItems: T[];
  total: number;
  /** 1-based inclusive display range, for "Showing {from}–{to} of {total}". */
  from: number;
  to: number;
  setPage: (page: number) => void;
}

/**
 * Client-side pagination over an in-memory list.
 *
 * Two reset rules, deliberately handled differently:
 *
 *  (a) Search/sort changed → jump back to page 1. Driven by an explicit
 *      `resetKey` from the caller rather than inferred from `items.length`,
 *      because a filter can legitimately leave the length unchanged.
 *
 *  (b) The list shrank under the current page — e.g. deleting the last row on
 *      page 5. This is CLAMPED DURING RENDER and only reconciled into state
 *      afterwards. Clamping in the effect alone would paint one frame of an
 *      empty page first. Landing on the new last page (4) rather than page 1 is
 *      the correct outcome: the teacher stays where they were working.
 */
export function usePagedList<T>(
  items: T[],
  pageSize: number,
  resetKey: string
): PagedList<T> {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);

  // Reconcile state after rendering off safePage, so no empty page is painted.
  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  const pageItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize]
  );

  return {
    page: safePage,
    pageCount,
    pageItems,
    total,
    from: total === 0 ? 0 : (safePage - 1) * pageSize + 1,
    to: Math.min(safePage * pageSize, total),
    setPage,
  };
}
