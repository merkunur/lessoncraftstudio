'use client';

/**
 * Quota-exceeded modal per the free-tier 2/day cap commission.
 *
 * Triggers when a quota-gated action (Play / PDF / app-gen download) returns
 * HTTP 402 from /api/quota/*. Display copy: "Daily limit reached" + subscribe
 * CTA + dismiss. Dismissal persists for the current UTC day via the
 * lcs_quota_modal_dismissed_<yyyy-mm-dd> cookie so the teacher isn't nagged
 * repeatedly within a single day.
 *
 * Usage:
 *   const { showQuotaModal, QuotaModalElement } = useQuotaModal();
 *   ...
 *   if (response.status === 402) showQuotaModal(response);
 *   return <>... {QuotaModalElement} </>;
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface QuotaExceededDetail {
  used?: number;
  remaining?: number | 'unlimited';
  resetAt?: string;
  cap?: number;
  subscribeUrl?: string;
}

interface QuotaExceededModalProps {
  open: boolean;
  detail?: QuotaExceededDetail;
  onDismiss: () => void;
}

export function QuotaExceededModal({
  open,
  detail,
  onDismiss,
}: QuotaExceededModalProps) {
  const t = useTranslations('homepage.quota');
  const locale = useLocale();

  if (!open) return null;

  const subscribeHref = `/${locale}#subscription`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4"
      onClick={onDismiss}
    >
      <div
        className="bg-cream-50 rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        <h2
          id="quota-modal-title"
          className="font-display font-semibold text-2xl text-ink-900 mb-3"
        >
          {t('exceededTitle')}
        </h2>
        <p className="text-base text-ink-600 leading-relaxed mb-6">
          {t('exceededBody')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={subscribeHref}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-medium rounded-lg transition-colors"
            onClick={onDismiss}
          >
            {t('subscribeCta')}
          </a>
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-cream-200 hover:bg-cream-300 text-ink-700 font-medium rounded-lg transition-colors"
          >
            {t('dismissCta')}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook that manages the modal open-state + dismissal cookie.
 * Renders nothing by default; call showQuotaModal(detail) to open it.
 */
export function useQuotaModal() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<QuotaExceededDetail | undefined>();

  const showQuotaModal = useCallback((d?: QuotaExceededDetail) => {
    setDetail(d);
    setOpen(true);
  }, []);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const QuotaModalElement = (
    <QuotaExceededModal open={open} detail={detail} onDismiss={onDismiss} />
  );

  return { showQuotaModal, QuotaModalElement };
}
