'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * Client component that scales a 1000x1000px HTML visual to fit its container width.
 * Uses ResizeObserver for responsive scaling.
 */
export function VisualScaler({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setScale(w / 1000);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-xl shadow-lg"
      style={{ aspectRatio: '1' }}
    >
      <div
        style={{
          width: '1000px',
          height: '1000px',
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          opacity: scale > 0 ? 1 : 0,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
