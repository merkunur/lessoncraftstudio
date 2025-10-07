'use client';

import { DeviceFingerprintProvider } from '@/components/device-fingerprint-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from 'react-hot-toast';

/**
 * Client-side providers wrapper
 * Includes auth context and device fingerprint
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DeviceFingerprintProvider>
        <Toaster position="top-right" />
        {children}
      </DeviceFingerprintProvider>
    </AuthProvider>
  );
}
