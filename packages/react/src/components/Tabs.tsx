import { createContext, useContext, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type TabsContextValue = {
  value: string;
  select: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const value = useContext(TabsContext);
  if (!value) throw new Error('Tabs components must be rendered inside Tabs.');
  return value;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const selected = value ?? uncontrolled;
  const select = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value: selected, select, baseId }}>
      <div className="sutra-tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { select } = useTabs();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    const tab = tabs[next];
    const nextValue = tab?.dataset.value;
    if (!nextValue || !tab) return;
    select(nextValue);
    tab.focus();
  };

  return (
    <div ref={ref} role="tablist" aria-label={label} aria-orientation="horizontal" className="sutra-tablist" onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const tabs = useTabs();
  const selected = tabs.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${tabs.baseId}-tab-${value}`}
      className="sutra-tab"
      aria-selected={selected}
      aria-controls={`${tabs.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      onClick={() => tabs.select(value)}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const tabs = useTabs();
  const selected = tabs.value === value;
  return (
    <div
      role="tabpanel"
      id={`${tabs.baseId}-panel-${value}`}
      aria-labelledby={`${tabs.baseId}-tab-${value}`}
      className="sutra-tabpanel"
      hidden={!selected}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
