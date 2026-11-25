import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/noto-sans-devanagari/400.css';
import '@fontsource/noto-sans-devanagari/500.css';
import '@fontsource/noto-sans-devanagari/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@sutra-ui/react/styles.css';
import './docs.css';
import { themeInitScript } from '@sutra-ui/react/theme-script';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DocsShell } from '../components/DocsShell';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: { default: 'Sutra UI', template: '%s · Sutra UI' },
  description: 'An editorial design system for India-first tools. Gallery restraint, jewel pigments, accessible type.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Providers>
          <DocsShell>{children}</DocsShell>
        </Providers>
      </body>
    </html>
  );
}
