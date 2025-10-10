import { Suspense } from 'react';
import AdminDashboard from './client';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  );
}
