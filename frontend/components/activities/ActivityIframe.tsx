"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { meterAction } from "@/lib/client-meter";
import { isCareSurface } from "@/lib/care-surfaces";
import signupWall from "@/content/play-wall/ui.json";
import verifyUi from "@/content/verify-email/ui.json";

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
 *
 * ACCOUNT (operator ruling 2026-11-12): an activity or a classroom tool needs a free account to play. The frame
 * tells the meter what it is (surface "activity" | "tool"); an anonymous visitor gets "signup_required" and sees
 * the sign-up panel (content/play-wall/ui.json, 11 languages) where the frame would be. Nothing is loaded before the
 * answer arrives, so the activity never flashes and then disappears. Not asked for an account: a care surface, and
 * the ONE sample on the homepage (prop `sample`), which a visitor opens with a click and which is the proof of the
 * product on the page that sells it. The 10 plays a day of a free account are the same counter as before.
 * An account whose e-mail is not confirmed gets "verify_required": a panel that sends it to its account page, where
 * the confirmation link can be sent again (content/verify-email/ui.json).
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

export function ActivityIframe({
  src,
  title,
  toolKey,
  sample,
}: {
  src: string;
  title: string;
  /** the homepage sample: metered as a play like before, and not asked for an account */
  sample?: boolean;
  /**
   * ⭐ The tool key, when this iframe is a TOOL rather than an activity.
   * Care surfaces (`lib/care-surfaces.ts`) are never metered: a
   * communication board must not be able to show a newly arrived child
   * "you've used your free plays for today" on the surface they use to
   * ask for the toilet. Absent for activities, which are metered as
   * before.
   * ⚠ The KEY, never the localised slug — the slug differs per locale
   * (`say-it-board`, `sanomistaulu`, …) and matching on it would exempt
   * English and meter Finnish.
   */
  toolKey?: string;
}) {
  const locale = useLocale();
  const [height, setHeight] = useState<number>(INITIAL_HEIGHT);
  const exempt = isCareSurface(toolKey);
  const [gate, setGate] = useState<"pending" | "open" | "blocked" | "signup" | "verify">(exempt ? "open" : "pending");
  const surface = sample ? "sample" : toolKey ? "tool" : "activity";
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // A care surface is not metered at all — we do not even count the play,
    // because a counted play is a play that can later be refused.
    if (exempt) return;
    let cancelled = false;
    meterAction("play", surface).then(({ proceed, detail }) => {
      if (!cancelled) setGate(proceed ? "open" : detail?.reason === "signup_required" ? "signup" : detail?.reason === "verify_required" ? "verify" : "blocked");
    });
    return () => {
      cancelled = true;
    };
  }, [exempt, surface]);

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

  if (gate === "verify") {
    const all = verifyUi as Record<string, { panelTitle: string; panelBody: string; panelCta: string }>;
    const c = all[locale] || all.en;
    const remember = () => { try { window.sessionStorage.setItem("lcs-return", window.location.pathname); } catch { /* not kept */ } };
    return (
      <div
        data-play-verify=""
        style={{ minHeight: MIN_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}
      >
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ fontFamily: "'Baloo 2', system-ui, sans-serif", color: "#146B5E", fontSize: "1.4rem", lineHeight: 1.25, marginBottom: 8 }}>{c.panelTitle}</h2>
          <p style={{ color: "#3D4F49", marginBottom: 16 }}>{c.panelBody}</p>
          <a
            href={`/${locale}/workspace?verify=1`}
            onClick={remember}
            style={{ display: "inline-flex", alignItems: "center", minHeight: 48, background: "#F2784B", color: "#2A1206", padding: "10px 24px", borderRadius: 999, fontWeight: 700, textDecoration: "none" }}
          >
            {c.panelCta}
          </a>
        </div>
      </div>
    );
  }

  if (gate === "signup") {
    const all = signupWall as Record<string, { title: string; body: string; cta: string; signIn: string }>;
    const c = all[locale] || all.en;
    // after the account is made the first page offers the way back here (components/my-teaching, RETURN_KEY)
    const remember = () => { try { window.sessionStorage.setItem("lcs-return", window.location.pathname); } catch { /* not kept */ } };
    return (
      <div
        data-play-signup=""
        style={{ minHeight: MIN_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}
      >
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ fontFamily: "'Baloo 2', system-ui, sans-serif", color: "#146B5E", fontSize: "1.4rem", lineHeight: 1.25, marginBottom: 8 }}>{c.title}</h2>
          <p style={{ color: "#3D4F49", marginBottom: 16 }}>{c.body}</p>
          <a
            href={`/${locale}/auth/signup?from=play`}
            onClick={remember}
            style={{ display: "inline-flex", alignItems: "center", minHeight: 48, background: "#F2784B", color: "#2A1206", padding: "10px 24px", borderRadius: 999, fontWeight: 700, textDecoration: "none" }}
          >
            {c.cta}
          </a>
          <p style={{ marginTop: 8 }}>
            <a
              href={`/${locale}/auth/signin?from=play`}
              onClick={remember}
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44, color: "#0F5A4F", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              {c.signIn}
            </a>
          </p>
        </div>
      </div>
    );
  }

  // An activity or a tool waits for the answer: most visitors have no account, and for them a frame that loads and
  // then gives way to the panel would be the normal case. The box keeps the height, so nothing below moves.
  if (gate === "pending" && !sample) {
    return <div data-play-pending="" aria-busy="true" style={{ width: "100%", height: INITIAL_HEIGHT, minHeight: MIN_HEIGHT }} />;
  }

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

  // 'open' renders the iframe; so does 'pending' for the homepage sample (the common case there is allowed). The
  // meter has already counted the play. When metering is OFF, the gate resolves 'open' at once.
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
