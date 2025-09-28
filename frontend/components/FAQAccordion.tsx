'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  // Fallback to English if no items provided
  const faqData = items || [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Both Core Bundle and Full Access plans come with a 7-day free trial. No credit card required to start."
    },
    {
      question: "What's the POD commercial license?",
      answer: "The Print-on-Demand (POD) commercial license allows you to sell worksheets you create on platforms like Teachers Pay Teachers, Etsy, or your own website."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Absolutely! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="font-semibold text-gray-900 pr-4">
              {item.question}
            </h3>
            <svg
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            id={`faq-answer-${index}`}
            className={`transition-all duration-200 ease-in-out ${
              openIndex === index
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}