'use client';

import { useState } from 'react';

interface BillingToggleProps {
  monthlyLabel: string;
  yearlyLabel: string;
  yearlyDiscount: string;
  onToggle?: (isYearly: boolean) => void;
}

export default function BillingToggle({
  monthlyLabel,
  yearlyLabel,
  yearlyDiscount,
  onToggle
}: BillingToggleProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (yearly: boolean) => {
    setIsYearly(yearly);
    onToggle?.(yearly);
  };

  return (
    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleToggle(false)}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          !isYearly
            ? 'bg-white shadow-sm text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {monthlyLabel}
      </button>
      <button
        onClick={() => handleToggle(true)}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          isYearly
            ? 'bg-white shadow-sm text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {yearlyLabel} <span className="text-green-600 text-sm ml-1">({yearlyDiscount})</span>
      </button>
    </div>
  );
}