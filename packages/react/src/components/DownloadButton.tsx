import type { ReactNode } from 'react';
import { DownloadIcon } from '../icons';
import { useSutra } from '../provider';
import { Button } from './Button';

export function DownloadButton({
  filename,
  content,
  mime = 'text/plain',
  children,
}: {
  filename: string;
  content: string | Blob;
  mime?: string;
  children?: ReactNode;
}) {
  const { messages } = useSutra();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      }}
    >
      <DownloadIcon />
      {children ?? messages.download}
    </Button>
  );
}
