import { Metadata } from 'next';
import DashboardLayoutClient from './DashboardLayoutClient';

// SEO: Prevent dashboard pages from being indexed
// Dashboard contains user-specific content that shouldn't be in search results
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}