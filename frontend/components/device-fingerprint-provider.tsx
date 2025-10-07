'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { getDeviceFingerprint } from '@/lib/device-fingerprint-client';

interface DeviceFingerprintContextType {
  deviceId: string | null;
  isLoading: boolean;
  error: Error | null;
}

const DeviceFingerprintContext = createContext<DeviceFingerprintContextType>({
  deviceId: null,
  isLoading: true,
  error: null,
});

/**
 * Hook to access device fingerprint from any component
 */
export function useDeviceFingerprint() {
  const context = useContext(DeviceFingerprintContext);
  if (!context) {
    throw new Error('useDeviceFingerprint must be used within DeviceFingerprintProvider');
  }
  return context;
}

/**
 * Provider component that loads device fingerprint on mount
 * Place this high in your component tree (e.g., in RootLayout)
 */
export function DeviceFingerprintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFingerprint() {
      try {
        // Check if already loaded in localStorage
        const cachedId = localStorage.getItem('deviceId');
        if (cachedId) {
          setDeviceId(cachedId);
          setIsLoading(false);
          // Still generate in background to verify/update
          getDeviceFingerprint().then(id => {
            if (id !== cachedId) {
              setDeviceId(id);
              localStorage.setItem('deviceId', id);
            }
          });
          return;
        }

        // Generate new fingerprint
        const id = await getDeviceFingerprint();
        setDeviceId(id);
        // Store in localStorage for immediate access
        localStorage.setItem('deviceId', id);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load device fingerprint:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    }

    loadFingerprint();
  }, []);

  return (
    <DeviceFingerprintContext.Provider value={{ deviceId, isLoading, error }}>
      {children}
    </DeviceFingerprintContext.Provider>
  );
}
