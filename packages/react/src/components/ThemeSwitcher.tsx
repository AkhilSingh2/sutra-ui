import { useSutra, type Theme } from '../provider';

const options: Theme[] = ['light', 'dark', 'high-contrast', 'system'];

export function ThemeSwitcher() {
  const { theme, setTheme, messages } = useSutra();
  const labels: Record<Theme, string> = {
    light: messages.light,
    dark: messages.dark,
    'high-contrast': messages.contrast,
    system: messages.system,
  };
  return (
    <div className="sutra-segment" role="group" aria-label={messages.theme}>
      {options.map((option) => (
        <button key={option} type="button" aria-pressed={theme === option} onClick={() => setTheme(option)}>
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
