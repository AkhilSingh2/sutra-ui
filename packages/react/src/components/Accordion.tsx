import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { ChevronIcon } from '../icons';

type AccordionContextValue = {
  open: string[];
  toggle: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  type = 'single',
  defaultValue = [],
  children,
}: {
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultValue);
  const toggle = (value: string) => {
    setOpen((current) => {
      const isOpen = current.includes(value);
      if (type === 'single') return isOpen ? [] : [value];
      return isOpen ? current.filter((item) => item !== value) : [...current, value];
    });
  };
  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className="sutra-accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: ReactNode;
}) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be rendered inside Accordion.');
  const baseId = useId();
  const isOpen = context.open.includes(value);
  return (
    <div className={cx('sutra-accordion-item', isOpen && 'sutra-accordion-item--open')}>
      <h3 className="sutra-accordion-heading">
        <button
          type="button"
          id={`${baseId}-button`}
          className="sutra-accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={`${baseId}-panel`}
          onClick={() => context.toggle(value)}
        >
          <span>{title}</span>
          <ChevronIcon />
        </button>
      </h3>
      <div
        id={`${baseId}-panel`}
        role="region"
        aria-labelledby={`${baseId}-button`}
        className="sutra-accordion-panel"
        data-open={isOpen ? 'true' : 'false'}
        inert={!isOpen}
      >
        <div className="sutra-accordion-panel-inner">{children}</div>
      </div>
    </div>
  );
}

export type FaqItem = { question: string; answer: string };

export function Faq({ items, title }: { items: FaqItem[]; title?: string }) {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }).replace(/</g, '\\u003c');

  return (
    <section className="sutra-faq">
      {title ? <h2 className="sutra-faq-title">{title}</h2> : null}
      <Accordion type="single">
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
    </section>
  );
}
