'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type NavState = 'idle' | 'loading' | 'completing';

/**
 * Global navigation progress bar.
 * Shows a thin gold bar at the top of the viewport during route transitions.
 * Intercepts internal <a> clicks (start) and watches usePathname() changes (end).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<NavState>('idle');
  const safetyTimer = useRef<ReturnType<typeof setTimeout>>();
  const completeTimer = useRef<ReturnType<typeof setTimeout>>();
  const prevPath = useRef(pathname);

  // Navigation complete: pathname changed
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;

      if (safetyTimer.current) {
        clearTimeout(safetyTimer.current);
        safetyTimer.current = undefined;
      }

      setState('completing');
      completeTimer.current = setTimeout(() => setState('idle'), 500);
    }

    return () => {
      if (completeTimer.current) clearTimeout(completeTimer.current);
    };
  }, [pathname]);

  // Intercept clicks on internal links
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;

      const href = a.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        a.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) return;

      // Skip same-page navigation
      if (href === window.location.pathname) return;

      setState('loading');

      // Safety timeout: hide after 8s even if navigation stalls
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => setState('idle'), 8000);
    }

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      if (completeTimer.current) clearTimeout(completeTimer.current);
    };
  }, []);

  if (state === 'idle') return null;

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 99999,
        }}
      >
        <div
          className={
            state === 'loading'
              ? 'nav-progress-loading'
              : 'nav-progress-completing'
          }
        />
      </div>
      <style>{`
        .nav-progress-loading {
          height: 100%;
          background: linear-gradient(90deg, #D6AC47, #E8C65A, #D6AC47);
          box-shadow: 0 0 8px rgba(214, 172, 71, 0.5);
          animation: npLoad 4s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }
        .nav-progress-completing {
          height: 100%;
          background: linear-gradient(90deg, #D6AC47, #E8C65A, #D6AC47);
          box-shadow: 0 0 8px rgba(214, 172, 71, 0.5);
          animation: npComplete 0.3s ease-out forwards;
        }
        @keyframes npLoad {
          0% { width: 0%; }
          10% { width: 20%; }
          30% { width: 45%; }
          50% { width: 60%; }
          70% { width: 72%; }
          100% { width: 85%; }
        }
        @keyframes npComplete {
          0% { width: 85%; opacity: 1; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
      `}</style>
    </>
  );
}
