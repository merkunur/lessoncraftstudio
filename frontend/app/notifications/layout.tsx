import type { Metadata } from 'next';

// Server layout — noindex the /notifications tree. The page is 'use client'
// and cannot export `metadata` itself; a server layout is the only correct
// mechanism. Do NOT "simplify" this away.
// (SEO remediation 2026-05-30: was returning 200 + index,follow.)
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
