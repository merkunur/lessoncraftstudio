import type { Metadata } from 'next';

// Server layout — noindex the entire /admin tree. The admin pages are
// 'use client' and therefore cannot export `metadata` themselves; a server
// layout is the only correct mechanism. Do NOT "simplify" this away.
// (SEO remediation 2026-05-30: /admin was returning 200 + index,follow.)
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
