'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';

// Subscriber-only "Select" / "Done" toggle that flips a parent-owned bulk-mode
// boolean. Render NOTHING for non-subscribers per Q-q Option I — the bulk
// affordance is itself a tier-gated feature.

interface BulkSelectModeToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function BulkSelectModeToggle({
  active,
  onToggle,
}: BulkSelectModeToggleProps) {
  const t = useTranslations('bulk');
  const { user, loading: authLoading } = useAuth();

  if (authLoading) return null;
  if (!user) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="px-3 py-1.5 text-sm font-medium rounded-md border border-cream-300 bg-cream-50 text-ink-700 hover:bg-cream-200 transition"
    >
      {active ? t('toggleDone') : t('toggleSelect')}
    </button>
  );
}
