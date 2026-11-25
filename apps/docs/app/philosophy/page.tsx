import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Philosophy' };

const principles = [
  {
    number: '01',
    title: 'Pigment, not a poster',
    body: 'Ivory is the wall. Ink does the reading. Antique gold is a line, the way a frame is a line. Oxblood and emerald appear once, the way a miniature uses kumkum or peacock. Saturated fills made the previous version feel like a costume. A gallery uses the same pigments and almost none of the area.',
  },
  {
    number: '02',
    title: 'Type has two jobs',
    body: 'Fraunces carries the title of the room. It is an OFL serif with a slow, cut contrast, closer to a caption beside a painting than to a festival banner. Inter does the work of the tool: labels, amounts, errors. Noto Sans Devanagari sits in the same stack so Hindi is not a fallback that looks like an accident. Body line height stays at 1.5 so Devanagari does not collide.',
  },
  {
    number: '03',
    title: 'A motif is an edge',
    body: 'Kalamkari and block-print survive here as hairline repeats, not as illustrations behind the paragraph. They belong in a margin or a plate. If a pattern touches a sentence, it is too strong. The tokens are optional on purpose.',
  },
  {
    number: '04',
    title: 'Motion arrives',
    body: 'The ease is slow and does not bounce. A rule draws itself. An ink stroke completes. Pages wipe with a clip, then settle. None of this is required to understand the tool. Under reduced motion the durations are zero and the animations are removed, so the finished state is simply there.',
  },
  {
    number: '05',
    title: 'India is in the measure',
    body: 'Lakh and crore grouping, an INR mode, and Hindi labels for the controls are the cultural content that changes a calculation. Colour cannot do that work. A salary of 18,00,000 should look like eighteen lakh before it looks like a celebration.',
  },
  {
    number: '06',
    title: 'Access is the frame',
    body: 'Every text colour in the light, dark, and high-contrast themes is checked against WCAG AA. Gold is dark enough to be a border and, where it is text, darker still. Focus is a ring, not a glow. Keyboard order is the order of the page. The frame is what makes the picture hang straight.',
  },
];

export default function PhilosophyPage() {
  return (
    <article className="docs-philosophy">
      <header className="docs-chapter">
        <p className="docs-kicker">Principles</p>
        <h1 className="docs-reveal">Why it is held back.</h1>
        <div className="docs-rule" aria-hidden="true" />
        <p className="docs-lede">
          Sutra is for calculators, converters, and generators. The art is the restraint: an Indian
          material used the way a museum label uses it.
        </p>
      </header>
      <ol className="docs-principles">
        {principles.map((item) => (
          <li key={item.number}>
            <span>{item.number}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
