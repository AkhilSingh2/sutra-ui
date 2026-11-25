'use client';

import {
  Alert,
  ComparisonTable,
  CopyButton,
  DownloadButton,
  Faq,
  Footer,
  Header,
  LanguageToggle,
  NumberInput,
  ResultPanel,
  Select,
  Slider,
  ThemeSwitcher,
  Toggle,
  ToolLayout,
  formatIndianNumber,
  useSutra,
} from '@sutra-ui/react';
import { useMemo, useState } from 'react';
import { href } from '../lib/href';

function inr(value: number) {
  return formatIndianNumber(value, { mode: 'currency', decimals: 0 });
}

function illustrate(ctc: number, regime: 'old' | 'new', standard: boolean, section80c: number) {
  const standardDeduction = standard ? (regime === 'new' ? 75000 : 50000) : 0;
  const chapter = regime === 'old' ? section80c : 0;
  const taxable = Math.max(0, ctc - standardDeduction - chapter);
  const threshold = regime === 'new' ? 700000 : 500000;
  const rate = regime === 'new' ? 0.1 : 0.2;
  const base = Math.round(Math.max(0, taxable - threshold) * rate);
  const cess = Math.round(base * 0.04);
  return { taxable, standardDeduction, chapter, base, cess, total: base + cess };
}

export function PreviewTool() {
  const { locale } = useSutra();
  const hi = locale === 'hi';
  const [ctc, setCtc] = useState<number | null>(1800000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [standard, setStandard] = useState(true);
  const [section80c, setSection80c] = useState(150000);
  const salary = ctc ?? 0;
  const current = useMemo(() => illustrate(salary, regime, standard, section80c), [salary, regime, standard, section80c]);
  const old = useMemo(() => illustrate(salary, 'old', standard, section80c), [salary, standard, section80c]);
  const next = useMemo(() => illustrate(salary, 'new', standard, section80c), [salary, standard, section80c]);
  const summary = `${hi ? 'देय कर' : 'Tax payable'}: ${inr(current.total)}`;

  return (
    <ToolLayout
      title={hi ? 'आयकर कैलकुलेटर' : 'Income tax calculator'}
      description={
        hi
          ? 'यह उदाहरण केवल लेआउट के लिए है। यह कर सलाह नहीं है।'
          : 'A sample tool shell with Indian grouping. Illustrative rates only, not tax advice.'
      }
      breadcrumb={[
        { href: href('/'), label: hi ? 'होम' : 'Home' },
        { href: href('/preview'), label: hi ? 'कैलकुलेटर' : 'Calculators' },
        { label: hi ? 'आयकर' : 'Income tax' },
      ]}
      related={[
        { href: href('/components#number-input'), title: hi ? 'सीजीपीए कैलकुलेटर' : 'CGPA calculator', description: hi ? 'अंकों को सीजीपीए में बदलें।' : 'Convert marks into CGPA.' },
        { href: href('/components#comparison-table'), title: hi ? 'यूपीआई बाँट' : 'UPI split', description: hi ? 'एक बिल को बाँटकर देखें।' : 'Split a bill across people.' },
      ]}
      header={
        <Header
          title="Sutra"
          href={href('/')}
          nav={[
            { href: href('/foundations'), label: hi ? 'टोकन' : 'Tokens' },
            { href: href('/components'), label: hi ? 'घटक' : 'Components' },
            { href: href('/preview'), label: hi ? 'उदाहरण' : 'Preview' },
          ]}
        >
          <LanguageToggle />
          <ThemeSwitcher />
        </Header>
      }
      footer={
        <Footer
          note={hi ? 'डेमो आँकड़े। कर सलाह नहीं।' : 'Demo figures. Not tax advice.'}
          links={[
            { href: href('/'), label: hi ? 'दस्तावेज़' : 'Documentation' },
            { href: 'https://github.com/AkhilSingh2/sutra-ui', label: 'GitHub' },
          ]}
        />
      }
    >
      <div className="preview-grid">
        <form className="docs-form" onSubmit={(event) => event.preventDefault()}>
          <NumberInput
            label={hi ? 'वार्षिक सीटीसी' : 'Annual CTC'}
            mode="currency"
            decimals={0}
            value={ctc}
            onValueChange={setCtc}
          />
          <Select
            label={hi ? 'कर व्यवस्था' : 'Tax regime'}
            value={regime}
            onChange={(event) => setRegime(event.target.value as 'old' | 'new')}
            options={[
              { value: 'old', label: hi ? 'पुरानी व्यवस्था' : 'Old regime' },
              { value: 'new', label: hi ? 'नई व्यवस्था' : 'New regime' },
            ]}
          />
          <Toggle
            label={hi ? 'मानक कटौती जोड़ें' : 'Apply standard deduction'}
            checked={standard}
            onCheckedChange={setStandard}
          />
          <Slider
            label={hi ? 'धारा 80C' : 'Section 80C'}
            min={0}
            max={150000}
            step={5000}
            value={section80c}
            onValueChange={setSection80c}
            hint={hi ? 'इस डेमो में केवल पुरानी व्यवस्था पर लागू।' : 'Applied to the old regime only in this demo.'}
            formatValue={inr}
          />
          <div className="docs-row">
            <CopyButton value={summary} />
            <DownloadButton filename="income-tax-demo.txt" content={summary} />
          </div>
        </form>
        <ResultPanel
          label={hi ? 'देय कर' : 'Tax payable'}
          value={inr(current.total)}
          tone="primary"
          caption={hi ? 'उदाहरण दरें, कर सलाह नहीं।' : 'Illustrative rates, not tax advice.'}
          breakdown={[
            { label: hi ? 'कर योग्य आय' : 'Taxable income', value: inr(current.taxable) },
            { label: hi ? 'आयकर' : 'Income tax', value: inr(current.base) },
            { label: hi ? 'उपकर' : 'Cess', value: inr(current.cess) },
          ]}
        />
      </div>
      <ComparisonTable
        caption={hi ? 'पुरानी और नई व्यवस्था की तुलना' : 'Old and new regime comparison'}
        highlight={regime}
        columns={[
          { key: 'old', header: hi ? 'पुरानी' : 'Old regime' },
          { key: 'new', header: hi ? 'नई' : 'New regime' },
        ]}
        rows={[
          { label: hi ? 'कर योग्य आय' : 'Taxable income', values: { old: inr(old.taxable), new: inr(next.taxable) } },
          { label: hi ? 'देय कर' : 'Tax payable', values: { old: inr(old.total), new: inr(next.total) } },
        ]}
      />
      <Alert tone="info" title={hi ? 'यह एक डेमो है' : 'This is a layout demo'}>
        {hi
          ? 'दरें वास्तविक आयकर स्लैब नहीं हैं। Sutra UI गणना का इंजन नहीं है।'
          : 'The rates are not real income-tax slabs. Sutra UI is the interface, not a tax engine.'}
      </Alert>
      <Faq
        title={hi ? 'सवाल' : 'Questions'}
        items={
          hi
            ? [
                { question: 'क्या यह असली कर गणना है?', answer: 'नहीं। आँकड़े केवल घटकों को दिखाने के लिए हैं।' },
                { question: 'संख्या कैसे समूहीकृत होती है?', answer: 'भारतीय प्रणाली में 1,00,000 एक लाख है और 1,00,00,000 एक करोड़।' },
              ]
            : [
                { question: 'Is this a real tax calculation?', answer: 'No. The figures exist so the components have realistic content.' },
                { question: 'How are numbers grouped?', answer: 'Indian grouping: 1,00,000 is one lakh and 1,00,00,000 is one crore.' },
              ]
        }
      />
    </ToolLayout>
  );
}
