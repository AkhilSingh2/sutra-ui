import { useSutra } from '../provider';

export function LanguageToggle() {
  const { locale, setLocale, messages } = useSutra();
  return (
    <div className="sutra-segment" role="group" aria-label={messages.language}>
      <button type="button" lang="en" aria-pressed={locale === 'en'} aria-label={messages.english} onClick={() => setLocale('en')}>
        EN
      </button>
      <button type="button" lang="hi" aria-pressed={locale === 'hi'} aria-label={messages.hindi} onClick={() => setLocale('hi')}>
        हिं
      </button>
    </div>
  );
}
