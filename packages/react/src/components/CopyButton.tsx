import { useState } from 'react';
import { CheckIcon, CopyIcon } from '../icons';
import { useSutra } from '../provider';
import { Button } from './Button';

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const { messages } = useSutra();
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? messages.copied : (label ?? messages.copy)}
      <span className="sutra-sr" aria-live="polite">
        {copied ? messages.copied : ''}
      </span>
    </Button>
  );
}
