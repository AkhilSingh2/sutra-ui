import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { messages, type Locale, type Messages } from './messages';
import { themeInitScript } from './theme-script';

export type Theme = 'light' | 'dark' | 'high-contrast' | 'system';
export { themeInitScript };

type SutraContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
};

const SutraContext = createContext<SutraContextValue | null>(null);

function readTheme(): Theme | null {
  const stored = localStorage.getItem('sutra-theme');
  if (stored === 'light' || stored === 'dark' || stored === 'high-contrast' || stored === 'system') {
    return stored;
  }
  return null;
}

function readLocale(): Locale | null {
  const stored = localStorage.getItem('sutra-locale');
  return stored === 'hi' || stored === 'en' ? stored : null;
}

export function SutraProvider({
  children,
  defaultTheme = 'system',
  defaultLocale = 'en',
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultLocale?: Locale;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const storedTheme = readTheme();
    const storedLocale = readLocale();
    if (storedTheme) setTheme(storedTheme);
    if (storedLocale) setLocale(storedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sutra-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === 'hi' ? 'hi' : 'en';
    localStorage.setItem('sutra-locale', locale);
  }, [locale]);

  const value = useMemo<SutraContextValue>(
    () => ({ theme, setTheme, locale, setLocale, messages: messages[locale] }),
    [theme, locale],
  );

  return <SutraContext.Provider value={value}>{children}</SutraContext.Provider>;
}

export function useSutra(): SutraContextValue {
  const value = useContext(SutraContext);
  if (!value) {
    throw new Error('Sutra components must be rendered inside SutraProvider.');
  }
  return value;
}
