"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { meterAction } from "@/lib/client-meter";

/**
 * Activity iframe wrapper that auto-resizes to its content via postMessage.
 *
 * The mini-tools shell broadcasts `{type: 'lcs-activity-resize', height}`
 * after every task transition. This component listens and sets the iframe
 * height. The wrapper is VISUALLY INVISIBLE — the activity card inside the
 * iframe provides all the chrome.
 *
 * METERING (2026-07-12): interactive play is metered (10/day free). On mount
 * we meter 'play' before rendering the iframe; blocked → a wall panel (the
 * activity PAGE prose above stays fully served + indexable, so SEO is
 * untouched; crawlers bypass the meter server-side). Off until the flip.
 */

const INITIAL_HEIGHT = 420;
const MIN_HEIGHT = 320;

const WALL_COPY: Record<string, { title: string; body: string; cta: string }> = {
  en: { title: "You've used your free plays for today", body: "Come back tomorrow, or unlock unlimited play with a Teacher plan.", cta: "See the Teacher plan" },
  de: { title: "Deine kostenlosen Runden für heute sind aufgebraucht", body: "Komm morgen wieder – oder schalte mit dem Lehrkraft-Abo unbegrenztes Spielen frei.", cta: "Zum Lehrkraft-Abo" },
  fr: { title: "Vous avez utilisé vos essais gratuits du jour", body: "Revenez demain, ou débloquez le jeu illimité avec l'abonnement Enseignant.", cta: "Voir l'abonnement Enseignant" },
  es: { title: "Has usado tus jugadas gratis de hoy", body: "Vuelve mañana, o desbloquea juego ilimitado con el plan Docente.", cta: "Ver el plan Docente" },
  pt: { title: "Você usou suas jogadas gratuitas de hoje", body: "Volte amanhã, ou libere jogo ilimitado com o plano Professor.", cta: "Ver o plano Professor" },
  it: { title: "Hai usato le tue prove gratuite di oggi", body: "Torna domani, o sblocca il gioco illimitato con il piano Insegnante.", cta: "Vedi il piano Insegnante" },
  nl: { title: "Je hebt je gratis speelbeurten van vandaag gebruikt", body: "Kom morgen terug, of ontgrendel onbeperkt spelen met het Leerkracht-abonnement.", cta: "Bekijk het Leerkracht-abonnement" },
  sv: { title: "Du har använt dagens gratisomgångar", body: "Kom tillbaka i morgon, eller lås upp obegränsat spel med Lärarplanen.", cta: "Se Lärarplanen" },
  da: { title: "Du har brugt dagens gratis spil", body: "Kom tilbage i morgen, eller lås op for ubegrænset spil med Lærerplanen.", cta: "Se Lærerplanen" },
  no: { title: "Du har brukt dagens gratisrunder", body: "Kom tilbake i morgen, eller lås opp ubegrenset spill med Lærerplanen.", cta: "Se Lærerplanen" },
  fi: { title: "Olet käyttänyt tämän päivän ilmaiset pelikerrat", body: "Palaa huomenna, tai avaa rajaton pelaaminen Opettaja-tilauksella.", cta: "Katso Opettaja-tilaus" },
};

export function ActivityIframe({ src, title }: { src: string; title: string }) {
  const locale = useLocale();
  const [height, setHeight] = useState<number>(INITIAL_HEIGHT);
  const [gate, setGate] = useState<"pending" | "open" | "blocked">("pending");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    meterAction("play").then(({ proceed }) => {
      if (!cancelled) setGate(proceed ? "open" : "blocked");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (!ev.data || typeof ev.data !== "object") return;
      if (ev.data.type !== "lcs-activity-resize") return;
      if (iframeRef.current && ev.source !== iframeRef.current.contentWindow) return;
      const h = Number(ev.data.height);
      if (!isFinite(h) || h < MIN_HEIGHT) return;
      setHeight(Math.max(MIN_HEIGHT, Math.round(h)));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (gate === "blocked") {
    const c = WALL_COPY[locale] || WALL_COPY.en;
    return (
      <div
        style={{ minHeight: MIN_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}
      >
        <div style={{ maxWidth: 440 }}>
          <h2 style={{ fontFamily: "'Baloo 2', system-ui, sans-serif", color: "#146B5E", fontSize: "1.4rem", marginBottom: 8 }}>{c.title}</h2>
          <p style={{ color: "#4b5563", marginBottom: 16 }}>{c.body}</p>
          <a
            href={`/${locale}/pricing?from=wall`}
            style={{ display: "inline-block", background: "#F2784B", color: "#fff", padding: "10px 20px", borderRadius: 999, fontWeight: 700, textDecoration: "none" }}
          >
            {c.cta}
          </a>
        </div>
      </div>
    );
  }

  // 'pending' and 'open' both render the iframe (optimistic — the common case
  // is allowed; pending keeps layout stable and avoids a play-then-wall flash
  // being the norm). The iframe src loads regardless; the meter has already
  // counted the play. When metering is OFF, gate resolves 'open' instantly.
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
