'use client';

// Controlled checkbox overlaid on a deck card while bulk-mode is active.
// State is owned by the parent (via selectedDeckIds Set); the component just
// renders the visual + emits onToggle.

interface DeckCardCheckboxProps {
  selected: boolean;
  onToggle: () => void;
  ariaLabel: string;
}

export default function DeckCardCheckbox({
  selected,
  onToggle,
  ariaLabel,
}: DeckCardCheckboxProps) {
  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`absolute top-2 left-2 z-10 h-7 w-7 rounded-md flex items-center justify-center transition shadow-sm ${
        selected
          ? 'bg-leaf-600 border border-leaf-700 text-cream-50'
          : 'bg-cream-50/95 border border-cream-300 text-transparent hover:border-leaf-600'
      }`}
    >
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}
