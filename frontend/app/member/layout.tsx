import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Portal - LessonCraftStudio',
  description: 'Access your purchased worksheet generators',
  robots: { index: false, follow: false },
};

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
