'use client';

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Modal portal — renders children at document.body level so the modal becomes
// a body-direct child sibling to <Navigation>, <main>, and <Footer>. This
// escapes the per-body-child stacking context the global rule below imposes:
//
//   body > * { position: relative; z-index: 1; }   (frontend/app/globals.css)
//
// That rule (in place to stack body content above the body::before paper-grain
// pseudo at z=0) confines every modal to its parent's z=1 layer. A modal at
// `fixed inset-0 z-[100]` mounted inside <main> never paints above sibling
// body children at z=1 (Footer comes after <main> in DOM and wins paint
// order). Portaling the modal to document.body makes it body's last child
// → paints last → covers Footer correctly.
//
// SSR-safe: createPortal is only invoked after the first effect runs, so the
// SSR pass renders nothing and avoids hydration mismatch.

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
