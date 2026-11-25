import { useId, type ReactNode } from 'react';
import { useSutra } from '../provider';
import { Footer } from './Footer';
import { Header, type NavItem } from './Header';

export type Crumb = { label: string; href?: string };
export type RelatedTool = { href: string; title: string; description?: string };

export function ToolLayout({
  title,
  description,
  breadcrumb = [],
  related = [],
  header,
  footer,
  nav,
  children,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  related?: RelatedTool[];
  header?: ReactNode;
  footer?: ReactNode;
  nav?: NavItem[];
  children: ReactNode;
}) {
  const { messages } = useSutra();
  const relatedTitleId = useId();
  return (
    <div className="sutra-tool">
      <a className="sutra-skip" href="#sutra-main">
        {messages.skip}
      </a>
      {header ?? <Header nav={nav} />}
      <main id="sutra-main" className="sutra-main">
        {breadcrumb.length > 0 ? (
          <nav aria-label={messages.breadcrumb}>
            <ol className="sutra-breadcrumb">
              {breadcrumb.map((crumb, index) => {
                const last = index === breadcrumb.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`}>
                    {crumb.href && !last ? <a href={crumb.href}>{crumb.label}</a> : <span aria-current={last ? 'page' : undefined}>{crumb.label}</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <header className="sutra-tool-intro">
          <div className="sutra-thread" aria-hidden="true" />
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </header>
        <div className="sutra-tool-body">{children}</div>
        {related.length > 0 ? (
          <aside className="sutra-related" aria-labelledby={relatedTitleId}>
            <h2 id={relatedTitleId}>{messages.related}</h2>
            <ul>
              {related.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href}>
                    <span className="sutra-related-title">{tool.title}</span>
                    {tool.description ? <span className="sutra-related-copy">{tool.description}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </main>
      {footer ?? <Footer />}
    </div>
  );
}
