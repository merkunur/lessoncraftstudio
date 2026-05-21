"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Activity iframe wrapper that auto-resizes to its content via postMessage.
 *
 * The mini-tools shell broadcasts `{type: 'lcs-activity-resize', height}`
 * after every task transition. This component listens, sets the iframe
 * height, and lets the surrounding card flex-fit. Closes the "tall card,
 * short content" gap for choice-board activities while still giving
 * ten-frame activities the full 540px they need.
 *
 * Default initial height (before first message arrives) is 420px — a
 * reasonable middle-ground that avoids both "tall flash then collapse"
 * and "tiny flash then expand" on first paint.
 */

const INITIAL_HEIGHT = 420;
const MIN_HEIGHT = 320;
const MAX_HEIGHT_CSS = "min(calc(100vh - 200px), 640px)";

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
    <div
      className="rounded-3xl overflow-hidden shadow-xl"
      style={{
        backgroundColor: "#FBF3E4",
        width: "100%",
        height: `${height}px`,
        maxHeight: MAX_HEIGHT_CSS,
        minHeight: `${MIN_HEIGHT}px`,
        transition: "height .25s ease",
      }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        allow="fullscreen; autoplay"
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          display: "block",
        }}
      />
    </div>
  );
}
