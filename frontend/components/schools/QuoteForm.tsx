'use client';
/* The quote request of the "For schools" page. It posts to /api/schools/quote, which saves the request as a support
 * ticket and mails it to the operator. Nothing is kept in the browser. The field a person never sees ("website") is
 * the trap for form robots: the route answers them as if it had worked and does nothing. */
import { FormEvent, useState } from 'react';

type Ui = Record<string, string>;
type State = 'idle' | 'sending' | 'sent' | 'failed' | 'tooMany' | 'invalid';

export default function QuoteForm({ ui, locale, email, limits }: {
  ui: Ui;
  locale: string;
  email: string;
  limits: { name: number; school: number; email: number; place: number; message: number; teachersMax: number };
}) {
  const [state, setState] = useState<State>('idle');
  const say = (key: string) => (ui[key] || '').replace('{email}', email);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = {
      locale,
      name: String(f.get('name') || '').trim(),
      school: String(f.get('school') || '').trim(),
      email: String(f.get('email') || '').trim(),
      place: String(f.get('place') || '').trim(),
      teachers: Number(f.get('teachers') || 0),
      message: String(f.get('message') || '').trim(),
      website: String(f.get('website') || ''),
    };
    setState('sending');
    try {
      const res = await fetch('/api/schools/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) setState('sent');
      else if (res.status === 429) setState('tooMany');
      else if (res.status === 400) setState('invalid');
      else setState('failed');
    } catch {
      setState('failed');
    }
  }

  if (state === 'sent') return <p className="sc-sent" role="status">{ui.sent}</p>;

  return (
    <form className="sc-form" onSubmit={submit} noValidate={false}>
      <label className="sc-field">
        <span>{ui.fieldName}</span>
        <input name="name" type="text" required maxLength={limits.name} autoComplete="name" />
      </label>
      <label className="sc-field">
        <span>{ui.fieldSchool}</span>
        <input name="school" type="text" required maxLength={limits.school} autoComplete="organization" />
      </label>
      <label className="sc-field">
        <span>{ui.fieldEmail}</span>
        <input name="email" type="email" required maxLength={limits.email} autoComplete="email" inputMode="email" />
      </label>
      <label className="sc-field">
        <span>{ui.fieldPlace}</span>
        <input name="place" type="text" maxLength={limits.place} autoComplete="address-level1" />
      </label>
      <label className="sc-field sc-field-short">
        <span>{ui.fieldTeachers}</span>
        <input name="teachers" type="number" required min={1} max={limits.teachersMax} step={1} inputMode="numeric" />
      </label>
      <label className="sc-field sc-field-wide">
        <span>{ui.fieldMessage}</span>
        <textarea name="message" rows={4} maxLength={limits.message} />
      </label>
      <label className="sc-trap" aria-hidden="true">
        <span>{ui.fieldWebsite}</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="sc-send">
        <button type="submit" className="sc-button" disabled={state === 'sending'}>{state === 'sending' ? ui.sending : ui.send}</button>
        <p className="sc-form-privacy">{ui.formPrivacy}</p>
      </div>
      {state === 'failed' || state === 'tooMany' || state === 'invalid' ? <p className="sc-error" role="alert">{say(state)}</p> : null}
    </form>
  );
}
