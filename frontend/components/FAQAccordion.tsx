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
      question: "Is it really free to try?",
      answer: "Yes! All 33 generators are free to try with full feature access. Your downloads will include a small watermark. No signup, no credit card, no time limit."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We use Lemon Squeezy for secure payments, which supports all major credit cards (Visa, MasterCard, American Express), PayPal, and more."
    },
    {
      question: "What does the commercial license include?",
      answer: "Full commercial rights to sell the printables you create on Etsy, Amazon KDP, Gumroad, your own website, or any other platform. No attribution required, no royalties, no limits on sales volume."
    },
    {
      question: "What is the difference between individual and bundle?",
      answer: "An individual license covers one specific generator for $49. A bundle covers all generators in a category (4-7 apps) for $149, saving up to 70% compared to buying individually."
    },
    {
      question: "How do I access my purchased apps?",
      answer: "After purchase, sign in at lessoncraftstudio.com/member with the same email you used to buy. Your apps will be unlocked automatically with no watermark."
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