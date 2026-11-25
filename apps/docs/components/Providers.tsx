'use client';

import { SutraProvider, ToastProvider } from '@sutra-ui/react';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SutraProvider>
      <ToastProvider>{children}</ToastProvider>
    </SutraProvider>
  );
}
