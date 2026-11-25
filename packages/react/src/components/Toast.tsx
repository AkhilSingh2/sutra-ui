import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { useSutra } from '../provider';

export type ToastInput = {
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
};

type ToastItem = ToastInput & { id: string };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { messages } = useSutra();
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, number>());
  const seed = useId();
  const count = useRef(0);

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      count.current += 1;
      const id = `${seed}-${count.current}`;
      setItems((current) => [...current, { ...input, id }]);
      const timer = window.setTimeout(() => dismiss(id), 5000);
      timers.current.set(id, timer);
    },
    [dismiss, seed],
  );

  useEffect(() => {
    const active = timers.current;
    return () => {
      for (const timer of active.values()) window.clearTimeout(timer);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="sutra-toaster">
        <div className="sutra-toaster-polite" aria-live="polite" aria-relevant="additions">
          {items
            .filter((item) => item.tone !== 'danger')
            .map((item) => (
              <ToastView key={item.id} item={item} onDismiss={() => dismiss(item.id)} dismissLabel={messages.dismiss} />
            ))}
        </div>
        <div className="sutra-toaster-assertive" aria-live="assertive" aria-relevant="additions">
          {items
            .filter((item) => item.tone === 'danger')
            .map((item) => (
              <ToastView key={item.id} item={item} onDismiss={() => dismiss(item.id)} dismissLabel={messages.dismiss} />
            ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function ToastView({
  item,
  onDismiss,
  dismissLabel,
}: {
  item: ToastItem;
  onDismiss: () => void;
  dismissLabel: string;
}) {
  return (
    <div className={cx('sutra-toast', `sutra-toast--${item.tone ?? 'info'}`)} role="status">
      <div className="sutra-toast-copy">
        <p className="sutra-toast-title">{item.title}</p>
        {item.description ? <p className="sutra-toast-body">{item.description}</p> : null}
      </div>
      <button type="button" className="sutra-toast-close" aria-label={dismissLabel} onClick={onDismiss}>
        ×
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast must be used inside ToastProvider.');
  return value;
}
