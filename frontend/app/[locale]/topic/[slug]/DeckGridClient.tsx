'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import AddToCollectionButton from '@/components/catalog/AddToCollectionButton';
import ShareDeckButton from '@/components/catalog/ShareDeckButton';
import BulkSelectModeToggle from '@/components/catalog/BulkSelectModeToggle';
import DeckCardCheckbox from '@/components/catalog/DeckCardCheckbox';
import BulkSelectToolbar, { BulkAction } from '@/components/catalog/BulkSelectToolbar';
import BulkAddToCollectionPicker from '@/components/catalog/BulkAddToCollectionPicker';
import ShareLinkResultModal, { ShareLinkResult } from '@/components/catalog/ShareLinkResultModal';
import { useQuotaModal } from '@/components/quota/QuotaExceededModal';

// Tool 5A — client wrapper extraction from the topic page's inline grid.
// Owns bulk-mode state + selection state + per-card affordances. Per §17.4
// SEO doctrine, the parent server component still SSRs the page chrome,
// header, hreflang, and the schema.org JSON-LD. Only the deck grid + bulk
// affordances become client. Per Q-r: in-page selection only — selection
// clears on navigation away.

export interface TopicDeckCardData {
  id: string;
  slug: string;
  language: string;
  title: string;
  href: string;
  thumbnailUrl: string;
  pdfUrl: string;
  answerKeyUrl: string | null;
}

interface DeckGridClientProps {
  decks: TopicDeckCardData[];
  labels: {
    playLink: string;
    pdfLink: string;
    answerKeyLink: string;
  };
}

export default function DeckGridClient({
  decks,
  labels,
}: DeckGridClientProps) {
  const t = useTranslations('bulk');
  const { showQuotaModal, QuotaModalElement } = useQuotaModal();

  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDeckIds, setSelectedDeckIds] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [shareResults, setShareResults] = useState<{
    results: ShareLinkResult[];
    skippedCount: number;
  } | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Quota-gated click handler for the Play link. POSTs to
  // /api/quota/check-and-increment; on 200 (allowed) navigates to the deck
  // page; on 402 (blocked) shows the QuotaExceededModal without navigation.
  // Unified quota-gated click handler. POSTs to check-and-increment;
  // on 200 (allowed) navigates/opens the target URL; on 402 (blocked)
  // shows the QuotaExceededModal without navigation.
  // `target='self'` uses window.location.href; 'blank' uses window.open
  // with noopener (for PDF / answer-key download in a new tab).
  const handleQuotaGatedClick = useCallback(
    async (
      e: React.MouseEvent<HTMLAnchorElement>,
      url: string,
      action: 'play' | 'pdf' | 'answer-key',
      deckId: string,
      target: 'self' | 'blank' = 'self'
    ) => {
      e.preventDefault();
      const openUrl = () => {
        if (target === 'blank') {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = url;
        }
      };
      try {
        const res = await fetch('/api/quota/check-and-increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, deckId }),
        });
        if (res.status === 402) {
          const body = await res.json().catch(() => ({}));
          showQuotaModal(body);
          return;
        }
        // 200 or fail-open — proceed
        openUrl();
      } catch (err) {
        // Network failure — fail open
        console.warn('quota check failed; proceeding', err);
        openUrl();
      }
    },
    [showQuotaModal]
  );

  // Backwards-compatible alias for Play clicks (same shape as before).
  const handlePlayClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, deckHref: string, deckId: string) =>
      handleQuotaGatedClick(e, deckHref, 'play', deckId, 'self'),
    [handleQuotaGatedClick]
  );

  const flashConfirmation = useCallback((msg: string) => {
    setConfirmation(msg);
    setTimeout(() => setConfirmation(null), 2500);
  }, []);

  function toggleBulkMode() {
    if (bulkMode) {
      setSelectedDeckIds(new Set());
    }
    setBulkMode(b => !b);
  }

  function toggleDeckSelection(deckId: string) {
    setSelectedDeckIds(prev => {
      const next = new Set(prev);
      if (next.has(deckId)) next.delete(deckId);
      else next.add(deckId);
      return next;
    });
  }

  function clearSelection() {
    setSelectedDeckIds(new Set());
    setBulkMode(false);
  }

  async function handleAction(action: BulkAction) {
    if (action === 'addToCollection') {
      setPickerOpen(true);
      return;
    }
    if (action === 'shareLinks') {
      const ids = Array.from(selectedDeckIds);
      setBusy(true);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('/api/play-links/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
          body: JSON.stringify({ deckIds: ids }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const titleByDeckId = new Map(decks.map(d => [d.id, d.title]));
        const results: ShareLinkResult[] = data.playLinks.map(
          (p: { deckId: string; linkId: string; url: string; existing: boolean }) => ({
            deckId: p.deckId,
            deckTitle: titleByDeckId.get(p.deckId) ?? p.deckId,
            url: p.url,
            existing: p.existing,
          })
        );
        setShareResults({
          results,
          skippedCount: Array.isArray(data.skipped) ? data.skipped.length : 0,
        });
      } catch {
        flashConfirmation(t('errorGeneric'));
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <BulkSelectModeToggle active={bulkMode} onToggle={toggleBulkMode} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map(deck => {
          const selected = selectedDeckIds.has(deck.id);
          const interactive = bulkMode;
          return (
            <li
              key={deck.id}
              className={`relative border rounded-lg overflow-hidden bg-white shadow-sm transition ${
                interactive && selected
                  ? 'border-leaf-600 ring-2 ring-leaf-600'
                  : 'border-cream-300 hover:shadow-md'
              }`}
            >
              {bulkMode && (
                <DeckCardCheckbox
                  selected={selected}
                  onToggle={() => toggleDeckSelection(deck.id)}
                  ariaLabel={t('checkboxAria', { title: deck.title })}
                />
              )}

              {bulkMode ? (
                <button
                  type="button"
                  onClick={() => toggleDeckSelection(deck.id)}
                  className="block w-full text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deck.thumbnailUrl}
                    alt={deck.title}
                    width={480}
                    height={620}
                    loading="lazy"
                    className="w-full h-auto bg-cream-50"
                  />
                </button>
              ) : (
                <a href={deck.href} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deck.thumbnailUrl}
                    alt={deck.title}
                    width={480}
                    height={620}
                    loading="lazy"
                    className="w-full h-auto bg-cream-50"
                  />
                </a>
              )}

              <div className="p-4">
                <h2 className="font-display text-base font-semibold text-ink-900 mb-2 line-clamp-2">
                  {bulkMode ? (
                    <button
                      type="button"
                      onClick={() => toggleDeckSelection(deck.id)}
                      className="text-left hover:text-leaf-700"
                    >
                      {deck.title}
                    </button>
                  ) : (
                    <a
                      href={deck.href}
                      onClick={e => handlePlayClick(e, deck.href, deck.id)}
                      className="hover:text-leaf-700"
                    >
                      {deck.title}
                    </a>
                  )}
                </h2>
                {!bulkMode && (
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <a
                      href={deck.href}
                      onClick={e => handlePlayClick(e, deck.href, deck.id)}
                      className="text-leaf-700 font-semibold hover:underline"
                    >
                      {labels.playLink}
                    </a>
                    <span className="text-ink-300" aria-hidden="true">·</span>
                    <a
                      href={`/api/quota/pdf/${deck.id}`}
                      onClick={e =>
                        handleQuotaGatedClick(e, deck.pdfUrl, 'pdf', deck.id, 'blank')
                      }
                      className="text-ink-600 hover:text-ink-900"
                      target="_blank"
                      rel="noopener"
                    >
                      {labels.pdfLink}
                    </a>
                    {deck.answerKeyUrl && (
                      <>
                        <span className="text-ink-300" aria-hidden="true">·</span>
                        <a
                          href={`/api/quota/answer-key/${deck.id}`}
                          onClick={e =>
                            handleQuotaGatedClick(
                              e,
                              deck.answerKeyUrl!,
                              'answer-key',
                              deck.id,
                              'blank'
                            )
                          }
                          className="text-ink-600 hover:text-ink-900"
                          target="_blank"
                          rel="noopener"
                        >
                          {labels.answerKeyLink}
                        </a>
                      </>
                    )}
                    <AddToCollectionButton deckId={deck.id} />
                    <ShareDeckButton deckId={deck.id} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <BulkSelectToolbar
        count={selectedDeckIds.size}
        actions={['addToCollection', 'shareLinks']}
        busy={busy}
        onAction={handleAction}
        onCancel={clearSelection}
      />

      <BulkAddToCollectionPicker
        open={pickerOpen}
        deckIds={Array.from(selectedDeckIds)}
        onClose={() => setPickerOpen(false)}
        onSuccess={result => {
          setPickerOpen(false);
          flashConfirmation(
            t('addedConfirmation', {
              count: result.added,
              collectionName: result.collectionName,
            })
          );
          clearSelection();
        }}
      />

      {shareResults && (
        <ShareLinkResultModal
          results={shareResults.results}
          skippedCount={shareResults.skippedCount}
          onClose={() => {
            setShareResults(null);
            clearSelection();
          }}
        />
      )}

      {confirmation && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-md bg-ink-900 text-cream-50 text-sm shadow-lg"
        >
          {confirmation}
        </div>
      )}
      {QuotaModalElement}
    </>
  );
}
