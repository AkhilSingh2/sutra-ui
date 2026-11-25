'use client';

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  ComparisonTable,
  CopyButton,
  DownloadButton,
  Faq,
  Input,
  NumberInput,
  ResultPanel,
  Select,
  Slider,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Toggle,
  Tooltip,
  useToast,
} from '@sutra-ui/react';
import { useState, type ReactNode } from 'react';

export function ComponentDocs() {
  const [salary, setSalary] = useState<number | null>(1800000);
  const [regime, setRegime] = useState('new');
  const [deduction, setDeduction] = useState(true);
  const [section, setSection] = useState(150000);
  const [tab, setTab] = useState('old');
  const { toast } = useToast();

  return (
    <div className="docs-stack">
      <Section
        id="button"
        title="Button"
        summary="One primary action per view. Secondary and ghost carry the quieter choices. Danger is reserved for destructive steps."
        do={<div className="docs-row"><Button>Calculate</Button><Button variant="secondary">Reset</Button></div>}
        dont={<div className="docs-row"><Button>Calculate</Button><Button>Save</Button><Button>Share</Button></div>}
        doText="Pair one primary button with a secondary alternative."
        dontText="Don't give every action the same weight."
      />
      <Section
        id="input"
        title="Input"
        summary="Always show the label. Hints and errors are tied to the field with aria-describedby."
        do={<Input label="City" hint="Used for HRA classification." placeholder="Pune" />}
        dont={<Input label="City" error="Choose a city to continue." />}
        doText="Keep the hint visible until there is an error."
        dontText="Don't rely on colour alone. The error is also announced."
      />
      <Section
        id="number-input"
        title="NumberInput"
        summary="Indian grouping is applied when the field blurs. Currency mode shows the rupee prefix and a lakh or crore reading."
        do={<NumberInput label="Annual CTC" mode="currency" decimals={0} value={salary} onValueChange={setSalary} />}
        dont={<input className="docs-bad-input" aria-label="Annual CTC without grouping" defaultValue="1800000" />}
        doText="Use currency mode for rupee amounts."
        dontText="Don't leave a salary as an ungrouped string."
      />
      <Section
        id="select"
        title="Select"
        summary="A native select, so the open menu stays the platform control on phones."
        do={
          <Select
            label="Tax regime"
            value={regime}
            onChange={(event) => setRegime(event.target.value)}
            options={[
              { value: 'old', label: 'Old regime' },
              { value: 'new', label: 'New regime' },
            ]}
          />
        }
        dont={<Select label="Tax regime" value="" onChange={() => undefined} placeholder="Pick one" options={[{ value: 'new', label: 'New regime' }]} />}
        doText="Give every option a real label."
        dontText="Don't use the placeholder as the only explanation of the field."
      />
      <Section
        id="toggle"
        title="Toggle"
        summary="A switch for an immediate on or off choice, with the label beside it."
        do={<Toggle label="Apply standard deduction" checked={deduction} onCheckedChange={setDeduction} />}
        dont={<Toggle label="Yes" checked={false} onCheckedChange={() => undefined} />}
        doText="Name the setting, not the state."
        dontText="Don't label a switch with only Yes or No."
      />
      <Section
        id="slider"
        title="Slider"
        summary="The value is written out as text, not only as a thumb position."
        do={
          <Slider
            label="Section 80C"
            min={0}
            max={150000}
            step={5000}
            value={section}
            onValueChange={setSection}
            formatValue={(value) =>
              new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
            }
          />
        }
        dont={<Slider label="Amount" min={0} max={100} value={40} onValueChange={() => undefined} />}
        doText="Format the output in rupees when the value is money."
        dontText="Don't leave a money slider as a bare percentage."
      />
      <Section
        id="tabs"
        title="Tabs"
        summary="Arrow keys move between tabs. The selected tab owns the panel."
        do={
          <Tabs value={tab} onValueChange={setTab}>
            <TabList label="Example regimes">
              <Tab value="old">Old</Tab>
              <Tab value="new">New</Tab>
            </TabList>
            <TabPanel value="old">Old regime notes.</TabPanel>
            <TabPanel value="new">New regime notes.</TabPanel>
          </Tabs>
        }
        dont={<p>Don't hide the other regime behind a hover-only menu.</p>}
        doText="Keep both choices visible."
        dontText="Don't make comparison depend on a pointer."
      />
      <section className="docs-section" id="card">
        <h2>Card, result, and comparison</h2>
        <p>The result panel is the signature: a thread, a large figure, and a breakdown. Tables name the comparison in a caption.</p>
        <div className="preview-grid">
          <Card>
            <CardHeader>
              <CardTitle>Sample return</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="docs-row">
                <Badge tone="primary">New regime</Badge>
                <Badge tone="success">Within demo</Badge>
                <Badge tone="warning">Not advice</Badge>
              </div>
            </CardBody>
            <CardFooter>
              <CopyButton value="₹1,06,600" />
              <DownloadButton filename="sutra-demo.txt" content="Illustrative tax ₹1,06,600">
                Download
              </DownloadButton>
            </CardFooter>
          </Card>
          <ResultPanel
            label="Tax payable"
            value="₹1,06,600"
            tone="primary"
            caption="Illustrative figure for the layout."
            breakdown={[
              { label: 'Income tax', value: '₹1,02,500' },
              { label: 'Cess', value: '₹4,100' },
            ]}
          />
        </div>
        <ComparisonTable
          caption="Illustrative old and new regime"
          highlight="new"
          columns={[
            { key: 'old', header: 'Old regime' },
            { key: 'new', header: 'New regime' },
          ]}
          rows={[
            { label: 'Tax', values: { old: '₹2,28,800', new: '₹1,06,600' } },
            { label: 'Cess', values: { old: '₹8,800', new: '₹4,100' } },
          ]}
        />
      </section>
      <Section
        id="feedback"
        title="Alert, toast, tooltip"
        summary="Warnings and errors use a role so the message is announced. Tooltips open from the keyboard."
        do={
          <div className="docs-form">
            <Alert tone="warning" title="Illustrative only">
              Demo rates are not a tax computation.
            </Alert>
            <div className="docs-row">
              <Tooltip content="Copies the figure, including the rupee sign.">
                <Button variant="secondary" onClick={() => toast({ title: 'Saved in this session', tone: 'success' })}>
                  Show a toast
                </Button>
              </Tooltip>
            </div>
          </div>
        }
        dont={<p style={{ color: 'var(--sutra-color-fg-danger)', margin: 0 }}>Something went wrong</p>}
        doText="Put the status in an alert or a toast."
        dontText="Don't report an error as red text with no role."
      />
      <section className="docs-section" id="faq">
        <h2>Accordion and FAQ</h2>
        <p>Faq renders an accordion and a FAQPage JSON-LD script for pages that want rich results.</p>
        <Faq
          title="About this demo"
          items={[
            {
              question: 'Does this calculate real income tax?',
              answer: 'No. The figures on this site are illustrative so the components have realistic content.',
            },
            {
              question: 'How are numbers grouped?',
              answer: 'NumberInput uses Indian grouping: 1,00,000 is one lakh and 1,00,00,000 is one crore.',
            },
          ]}
        />
      </section>
    </div>
  );
}

function Section({
  id,
  title,
  summary,
  do: good,
  dont,
  doText,
  dontText,
}: {
  id: string;
  title: string;
  summary: string;
  do: ReactNode;
  dont: ReactNode;
  doText: string;
  dontText: string;
}) {
  return (
    <section className="docs-section" id={id}>
      <h2>{title}</h2>
      <p>{summary}</p>
      <div className="docs-guidance">
        <figure className="docs-do">
          <figcaption>Do</figcaption>
          {good}
          <p>{doText}</p>
        </figure>
        <figure className="docs-dont">
          <figcaption>Don&apos;t</figcaption>
          {dont}
          <p>{dontText}</p>
        </figure>
      </div>
    </section>
  );
}
