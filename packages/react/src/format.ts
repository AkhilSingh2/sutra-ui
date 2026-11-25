export type NumberLocale = 'en-IN' | 'hi-IN';
export type NumberingSystem = 'latn' | 'deva';
export type NumberMode = 'number' | 'currency';

const DEVANAGARI = '०१२३४५६७८९';

export type FormatIndianOptions = {
  mode?: NumberMode;
  locale?: NumberLocale;
  decimals?: number;
  numberingSystem?: NumberingSystem;
};

export function normalizeIndianDigits(input: string): string {
  return input.replace(/[०-९]/g, (digit) => String(DEVANAGARI.indexOf(digit)));
}

export function parseIndianNumber(input: string): number | null {
  const cleaned = normalizeIndianDigits(input)
    .replace(/[₹,\s]/g, '')
    .replace(/[^\d.-]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

export function formatIndianNumber(value: number, options: FormatIndianOptions = {}): string {
  const mode = options.mode ?? 'number';
  const decimals = options.decimals ?? (mode === 'currency' ? 2 : 0);
  return new Intl.NumberFormat(`${options.locale ?? 'en-IN'}-u-nu-${options.numberingSystem ?? 'latn'}`, {
    style: mode === 'currency' ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatLakhCrore(
  value: number,
  locale: 'en' | 'hi' = 'en',
): string | null {
  const abs = Math.abs(value);
  const words = locale === 'hi' ? { lakh: 'लाख', crore: 'करोड़' } : { lakh: 'lakh', crore: 'crore' };
  const scale = abs >= 1_00_00_000 ? { divisor: 1_00_00_000, word: words.crore } : abs >= 1_00_000 ? { divisor: 1_00_000, word: words.lakh } : null;
  if (!scale) return null;
  const amount = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(abs / scale.divisor);
  return `${value < 0 ? '-' : ''}${amount} ${scale.word}`;
}
