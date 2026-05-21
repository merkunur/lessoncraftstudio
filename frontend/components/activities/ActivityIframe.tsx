"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Activity iframe wrapper that auto-resizes to its content via postMessage.
 *
 * The mini-tools shell broadcasts `{type: 'lcs-activity-resize', height}`
 * after every task transition. This component listens and sets the iframe
 * height. The wrapper is VISUALLY INVISIBLE — no background, no radius, no
 * shadow — because the activity card itself (Direction A `.lcs-app.activity`
 * inside the iframe) provides all the visible chrome. A wrapping styled
 * container around it would create a double-card nesting effect.
 *
 * Default initial height (before first message arrives) is 420px — a
 * reasonable middle-ground that avoids both "tall flash then collapse"
 * and "tiny flash then expand" on first paint.
 */

const INITIAL_HEIGHT = 420;
const MIN_HEIGHT = 320;

export function ActivityIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [height, setHeight] = useState<number>(INITIAL_HEIGHT);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (!ev.data || typeof ev.data !== "object") return;
      if (ev.data.type !== "lcs-activity-resize") return;
      // Only accept messages from our own iframe to avoid noise.
      if (iframeRef.current && ev.source !== iframeRef.current.contentWindow) return;
      const h = Number(ev.data.height);
      if (!isFinite(h) || h < MIN_HEIGHT) return;
      setHeight(Math.max(MIN_HEIGHT, Math.round(h)));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      loading="lazy"
      allow="fullscreen; autoplay"
      scrolling="no"
      style={{
        width: "100%",
        height: `${height}px`,
        minHeight: `${MIN_HEIGHT}px`,
        border: 0,
        display: "block",
        background: "transparent",
        transition: "height .25s ease",
      }}
    />
  );
}
