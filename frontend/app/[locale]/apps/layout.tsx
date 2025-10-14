import { Navigation } from '@/components/layout/Navigation';

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
