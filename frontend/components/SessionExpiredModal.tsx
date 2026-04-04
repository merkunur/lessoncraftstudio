'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TRANSLATIONS: Record<string, { title: string; body: string; button: string }> = {
  en: {
    title: 'Session Active on Another Device',
    body: 'Your account is currently being used on another device. Only one device can be active at a time. To continue on this device, sign in again.',
    button: 'Sign In Again',
  },
  de: {
    title: 'Sitzung auf einem anderen Gerät aktiv',
    body: 'Ihr Konto wird derzeit auf einem anderen Gerät verwendet. Es kann nur ein Gerät gleichzeitig aktiv sein. Um auf diesem Gerät fortzufahren, melden Sie sich erneut an.',
    button: 'Erneut anmelden',
  },
  fr: {
    title: 'Session active sur un autre appareil',
    body: 'Votre compte est actuellement utilis\u00e9 sur un autre appareil. Un seul appareil peut \u00eatre actif \u00e0 la fois. Pour continuer sur cet appareil, reconnectez-vous.',
    button: 'Se reconnecter',
  },
  es: {
    title: 'Sesi\u00f3n activa en otro dispositivo',
    body: 'Su cuenta est\u00e1 siendo utilizada en otro dispositivo. Solo un dispositivo puede estar activo a la vez. Para continuar en este dispositivo, inicie sesi\u00f3n nuevamente.',
    button: 'Iniciar sesi\u00f3n',
  },
  pt: {
    title: 'Sess\u00e3o ativa em outro dispositivo',
    body: 'Sua conta est\u00e1 sendo usada em outro dispositivo. Apenas um dispositivo pode estar ativo por vez. Para continuar neste dispositivo, fa\u00e7a login novamente.',
    button: 'Entrar novamente',
  },
  it: {
    title: 'Sessione attiva su un altro dispositivo',
    body: 'Il tuo account \u00e8 attualmente in uso su un altro dispositivo. Solo un dispositivo pu\u00f2 essere attivo alla volta. Per continuare su questo dispositivo, accedi nuovamente.',
    button: 'Accedi di nuovo',
  },
  nl: {
    title: 'Sessie actief op een ander apparaat',
    body: 'Uw account wordt momenteel gebruikt op een ander apparaat. Er kan slechts \u00e9\u00e9n apparaat tegelijk actief zijn. Om door te gaan op dit apparaat, log opnieuw in.',
    button: 'Opnieuw inloggen',
  },
  sv: {
    title: 'Session aktiv p\u00e5 en annan enhet',
    body: 'Ditt konto anv\u00e4nds f\u00f6r n\u00e4rvarande p\u00e5 en annan enhet. Endast en enhet kan vara aktiv \u00e5t g\u00e5ngen. Logga in igen f\u00f6r att forts\u00e4tta p\u00e5 den h\u00e4r enheten.',
    button: 'Logga in igen',
  },
  da: {
    title: 'Session aktiv p\u00e5 en anden enhed',
    body: 'Din konto bruges i \u00f8jeblikket p\u00e5 en anden enhed. Kun \u00e9n enhed kan v\u00e6re aktiv ad gangen. Log ind igen for at forts\u00e6tte p\u00e5 denne enhed.',
    button: 'Log ind igen',
  },
  no: {
    title: '\u00d8kt aktiv p\u00e5 en annen enhet',
    body: 'Kontoen din brukes for \u00f8yeblikket p\u00e5 en annen enhet. Bare \u00e9n enhet kan v\u00e6re aktiv om gangen. Logg inn igjen for \u00e5 fortsette p\u00e5 denne enheten.',
    button: 'Logg inn igjen',
  },
  fi: {
    title: 'Istunto aktiivinen toisella laitteella',
    body: 'Tili\u00e4si k\u00e4ytet\u00e4\u00e4n parhaillaan toisella laitteella. Vain yksi laite voi olla aktiivinen kerrallaan. Kirjaudu sis\u00e4\u00e4n uudelleen jatkaaksesi t\u00e4ll\u00e4 laitteella.',
    button: 'Kirjaudu uudelleen',
  },
};

export default function SessionExpiredModal() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('session-expired', handler);
    return () => window.removeEventListener('session-expired', handler);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '440px', width: '90%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 12px', lineHeight: '1.3' }}>
          {t.title}
        </h2>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.6', margin: '0 0 28px' }}>
          {t.body}
        </p>
        <a href="/member" style={{ display: 'inline-block', padding: '14px 32px', fontSize: '16px', fontWeight: 600, color: '#fff', backgroundColor: '#3B82F6', borderRadius: '10px', textDecoration: 'none' }}>
          {t.button}
        </a>
      </div>
    </div>
  );
}
