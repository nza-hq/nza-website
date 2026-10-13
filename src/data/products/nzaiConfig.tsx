import type { ProductPageConfig } from '../../components/product/ProductPage'

const VIDEO_BASE = '/videos/nzai'

/**
 * NZ:AI product page config - Rev C copy + five-step showcase re-plan
 * (brief R03 part 1, 13 Oct 2026).
 *
 * Rev C positioning: energy, carbon and climate intelligence (the "what")
 * that organisations build around themselves (the "how"), run as their
 * extended sustainability function (the "why"). The five showcase steps
 * answer a single visitor question: what questions can an organisation
 * ask? Filenames change from the old EOC-era names to function names
 * (energy-map, carbon-traced, risk-mapped, options-tested, ask-your-data).
 * Case studies are held pending client sign-off. Page stays "coming soon".
 *
 * First-person "we" is sanctioned on /nz-ai per CLAUDE.md.
 * AI is mentioned in exactly two places: manifesto paragraph six and step 05.
 */
export const nzaiConfig: ProductPageConfig = {
  slug: 'nzai',
  contextClass: 'context-nzai',
  isLight: false,

  palette: {
    canvas: '#0A1628',
    cream: '#FAF5EB',
    accent: '#0F9888',
    accentLight: '#5FDDC4',
    canvasElevated: 'rgba(95, 221, 196, 0.06)',
    /* Step verb colour swapped from coral (#F75A55) to NZ:AI's teal
       per Chris's "no italic, theme colour on the verbs" direction.
       The deeper teal #0F9888 reads cleanly against the cream steps
       section without needing the light variant. */
    stepVerbColour: '#0F9888',
  },

  hero: {
    microLabel: 'NET ZERO ADVISORY + INTELLIGENCE',
    name: 'NZ:AI',
    logoSrc: '/assets/logos/nzai-logo.svg',
    tagline: 'Expertise you can act on. Intelligence you own.',
    oneLiner:
      'Energy, carbon and climate intelligence, built around your organisation and run as your extended sustainability function.',
    ctaLabel: 'Book a discovery call',
    ctaHref: '/contact?product=nzai',
    screens: [
      {
        src: '/images/products/nzai/nzai-map.png',
        shortLabel: 'Inventory map',
        alt: 'NZ:AI global emissions inventory with world map',
      },
      {
        src: '/images/products/nzai/nzai-waterfall.png',
        shortLabel: 'Strategy view',
        alt: 'NZ:AI strategy interventions waterfall chart',
      },
      {
        src: '/images/products/nzai/nzai-data-quality.png',
        shortLabel: 'Data quality',
        alt: 'NZ:AI data quality explainer with journey chart',
      },
      {
        src: '/images/products/nzai/nzai-trajectory.png',
        shortLabel: 'Trajectory',
        alt: 'NZ:AI trajectory chart with milestones',
      },
    ],
  },

  /* SECTION 2 - Manifesto (replaces the v9 bridge / transition slot
     per the manifestos brief Movement 2). v9's "Three stages. One
     relationship." was lighter-weight in the old transition spot;
     the manifesto now carries the full "why" beat at viewport scale.
     Italic emphasis on "inside" per Movement 2's locked emphasis
     list (Chunk 3 of the manifestos brief). */
  manifesto: {
    microLabel: 'WHY NZ:AI',
    headline: (
      <>
        Climate action is an <em>inside</em> job.
      </>
    ),
    body:
      "Real progress on net zero comes from the people inside your organisation - the ones with the relationships, the knowledge, and the context to act. They need the data in front of them, in a form they can use. NZ:AI puts it there. These are four of the tools we've built.",
    accentColor: 'nzai',
  },

  letsShow: {
    leadingText: "Let's show you",
    pillLabel: 'Request Demo',
    pillHref: '/contact?product=nzai',
    trailingText: 'what we build',
  },

  /* FOUR SHOWCASE ITEMS - each backed by a short square video of a real
     tool (nzai-showcase brief Part 4). Replaces the old Decode/Build/
     Partner process stages (that arc now lives on the landing page's
     screen 2). Ordered to widen the frame at each step - one document ->
     one dataset -> one estate -> many years. Verbs sit in the
     highlightedVerb slot and render in NZ:AI teal via `.step-verb`.
     Videos are placeholders until real footage lands at the same paths;
     see docs/videos-nzai-README.md. */
  steps: [
    {
      number: '01',
      headlinePrefix: 'Your report, ',
      highlightedVerb: 'alive',
      headlineSuffix: '.',
      body:
        'Most carbon reports are read once and filed. This one runs on live data, responds to the questions you ask it, and updates as the year goes on. When the board needs a document, it still prints to one.',
      video: {
        mp4: `${VIDEO_BASE}/01-living-reports.mp4`,
        webm: `${VIDEO_BASE}/01-living-reports.webm`,
        poster: `${VIDEO_BASE}/01-living-reports-poster.jpg`,
        alt: 'An interactive carbon report responding to input changes and exporting to PDF',
      },
    },
    {
      number: '02',
      headlinePrefix: 'Every tonne, ',
      highlightedVerb: 'traced',
      headlineSuffix: '.',
      body:
        'A full Scope 1, 2 and 3 inventory you can interrogate rather than read. Follow an emission from a headline figure down to the individual supplier behind it, and watch the picture change as your data improves.',
      video: {
        mp4: `${VIDEO_BASE}/02-carbon-inventory.mp4`,
        webm: `${VIDEO_BASE}/02-carbon-inventory.webm`,
        poster: `${VIDEO_BASE}/02-carbon-inventory-poster.jpg`,
        alt: 'A carbon inventory morphing from bar chart to Sankey diagram and drilling to supplier level',
      },
    },
    {
      number: '03',
      headlinePrefix: 'Your whole estate, ',
      highlightedVerb: 'in one place',
      headlineSuffix: '.',
      body:
        'Energy, water, waste, carbon and climate risk for every site you run, in a single view. Start with the portfolio, end up inside a single room - and everything your team knows about that room sits alongside it.',
      video: {
        mp4: `${VIDEO_BASE}/03-estate-intelligence.mp4`,
        webm: `${VIDEO_BASE}/03-estate-intelligence.webm`,
        poster: `${VIDEO_BASE}/03-estate-intelligence-poster.jpg`,
        alt: "A map zooming from a national portfolio view into a single building's interior spaces",
      },
    },
    {
      number: '04',
      headlinePrefix: 'Progress you ',
      highlightedVerb: 'can see',
      headlineSuffix: '.',
      body:
        'Year-on-year performance against the frameworks you report into, with the actions that drive it assigned to the people responsible. The tool holds the record, so improvement is something you manage rather than reconstruct.',
      video: {
        mp4: `${VIDEO_BASE}/04-performance-tracking.mp4`,
        webm: `${VIDEO_BASE}/04-performance-tracking.webm`,
        poster: `${VIDEO_BASE}/04-performance-tracking-poster.jpg`,
        alt: 'Performance scores climbing year on year with actions assigned to team members',
      },
    },
  ],

  closer: {
    headline: 'Start with a conversation.',
    subhead:
      'Every partnership starts with a discovery call and a working session with your team. From there, we build what is needed first and keep building as your ambition grows.',
    ctaLabel: 'Book a discovery call',
    ctaHref: '/contact?product=nzai',
  },
}
