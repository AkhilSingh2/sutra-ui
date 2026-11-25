import { useState, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  Alert,
  Button,
  ComparisonTable,
  CopyButton,
  Faq,
  LanguageToggle,
  NumberInput,
  ResultPanel,
  Select,
  Slider,
  SutraProvider,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  ThemeSwitcher,
  Toggle,
  ToolLayout,
  Tooltip,
  formatIndianNumber,
  formatLakhCrore,
  parseIndianNumber,
} from './index';

function renderSutra(ui: ReactNode) {
  return render(
    <SutraProvider defaultTheme="light" defaultLocale="en">
      {ui}
    </SutraProvider>,
  );
}

async function expectAccessible(node: HTMLElement) {
  const results = await axe(node, {
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  });
  expect(results).toHaveNoViolations();
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = 'en';
  document.documentElement.setAttribute('data-theme', 'light');
});

describe('Indian number formatting', () => {
  it('groups by lakh and crore and parses both scripts', () => {
    expect(formatIndianNumber(1234567, { decimals: 0 })).toBe('12,34,567');
    expect(formatIndianNumber(10000000, { decimals: 0 })).toBe('1,00,00,000');
    expect(formatIndianNumber(1800000, { mode: 'currency', decimals: 0 })).toContain('18,00,000');
    expect(formatIndianNumber(1800000, { mode: 'currency', decimals: 0 })).toContain('₹');
    expect(formatLakhCrore(1800000, 'en')).toBe('18 lakh');
    expect(formatLakhCrore(10000000, 'hi')).toBe('1 करोड़');
    expect(parseIndianNumber('₹12,34,567')).toBe(1234567);
    expect(parseIndianNumber('१२,३४,५६७')).toBe(1234567);
    expect(parseIndianNumber('')).toBeNull();
  });
});

describe('components', () => {
  it('renders a named button that passes axe', async () => {
    const { container } = renderSutra(<Button>Calculate</Button>);
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeEnabled();
    await expectAccessible(container);
  });

  it('formats a currency input and reports the lakh scale', async () => {
    function Example() {
      const [value, setValue] = useState<number | null>(1234567);
      return <NumberInput label="Annual CTC" mode="currency" decimals={0} value={value} onValueChange={setValue} />;
    }
    const { container } = renderSutra(<Example />);
    const field = screen.getByRole('textbox', { name: /Annual CTC/ });
    expect(field).toHaveValue('12,34,567');
    expect(screen.getByText('₹')).toBeInTheDocument();
    expect(screen.getByText(/12.35 lakh/)).toBeInTheDocument();
    const user = userEvent.setup();
    await user.clear(field);
    await user.type(field, '10000000');
    await user.tab();
    expect(field).toHaveValue('1,00,00,000');
    expect(screen.getByText(/1 crore/)).toBeInTheDocument();
    await expectAccessible(container);
  });

  it('exposes a select, toggle, and slider to assistive tech', async () => {
    const { container } = renderSutra(
      <div>
        <Select
          label="Regime"
          value="new"
          onChange={() => undefined}
          options={[
            { value: 'old', label: 'Old regime' },
            { value: 'new', label: 'New regime' },
          ]}
        />
        <Toggle label="Standard deduction" checked onCheckedChange={() => undefined} />
        <Slider label="Section 80C" min={0} max={150000} step={1000} value={50000} onValueChange={() => undefined} />
      </div>,
    );
    expect(screen.getByRole('combobox', { name: 'Regime' })).toHaveValue('new');
    expect(screen.getByRole('switch', { name: 'Standard deduction' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('slider', { name: 'Section 80C' })).toHaveValue('50000');
    await expectAccessible(container);
  });

  it('moves tabs with the arrow keys', async () => {
    const user = userEvent.setup();
    renderSutra(
      <Tabs defaultValue="old">
        <TabList label="Regimes">
          <Tab value="old">Old</Tab>
          <Tab value="new">New</Tab>
        </TabList>
        <TabPanel value="old">Old panel</TabPanel>
        <TabPanel value="new">New panel</TabPanel>
      </Tabs>,
    );
    screen.getByRole('tab', { name: 'Old' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'New' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'New' })).toBeVisible();
  });

  it('emits FAQPage JSON-LD and expands an answer', async () => {
    const user = userEvent.setup();
    const { container } = renderSutra(
      <Faq
        title="Questions"
        items={[{ question: 'What is cess?', answer: 'A levy added to income tax in this demo.' }]}
      />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.textContent ?? '{}') as { '@type': string; mainEntity: { name: string }[] };
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity[0].name).toBe('What is cess?');
    const trigger = screen.getByRole('button', { name: 'What is cess?' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expectAccessible(container);
  });

  it('shows a tooltip from the keyboard and closes it with Escape', async () => {
    const user = userEvent.setup();
    renderSutra(
      <Tooltip content="Grouped as lakh and crore">
        <button type="button">Help</button>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Grouped as lakh and crore');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('copies text and builds a comparison table', async () => {
    const user = userEvent.setup();
    const { container } = renderSutra(
      <div>
        <CopyButton value="₹1,06,600" />
        <ResultPanel
          label="Tax payable"
          value="₹1,06,600"
          breakdown={[{ label: 'Cess', value: '₹4,100' }]}
        />
        <ComparisonTable
          caption="Illustrative regimes"
          highlight="new"
          columns={[
            { key: 'old', header: 'Old' },
            { key: 'new', header: 'New' },
          ]}
          rows={[{ label: 'Tax', values: { old: '₹2,60,000', new: '₹1,06,600' } }]}
        />
        <Alert tone="warning" title="Illustrative only">
          These figures are a layout demo, not tax advice.
        </Alert>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    await expect(navigator.clipboard.readText()).resolves.toBe('₹1,06,600');
    expect(await screen.findByRole('button', { name: /Copied/ })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Illustrative regimes' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('not tax advice');
    await expectAccessible(container);
  });

  it('switches theme and language', async () => {
    const user = userEvent.setup();
    const { container } = renderSutra(
      <div>
        <ThemeSwitcher />
        <LanguageToggle />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Dark' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await user.click(screen.getByRole('button', { name: 'Hindi' }));
    expect(document.documentElement).toHaveAttribute('lang', 'hi');
    expect(screen.getByRole('button', { name: 'गहरा' })).toHaveAttribute('aria-pressed', 'true');
    await expectAccessible(container);
  });

  it('renders the tool shell with breadcrumb and related tools', async () => {
    const { container } = renderSutra(
      <ToolLayout
        title="Income tax"
        description="A sample calculator shell."
        breadcrumb={[{ href: '/', label: 'Home' }, { label: 'Income tax' }]}
        related={[{ href: '/cgpa', title: 'CGPA calculator', description: 'Convert marks to CGPA.' }]}
      >
        <p>Tool body</p>
      </ToolLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Income tax' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CGPA calculator/ })).toHaveAttribute('href', '/cgpa');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
