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

  manifesto: {
    microLabel: 'WHY NZ:AI',
    headline: (
      <>
        The tools to act, <em>built</em> around you.
      </>
    ),
    body: (
      <>
        <p>
          Energy costs, carbon and climate risk are hard to see and harder to act on. Most
          organisations don't know where to start. NZ:AI changes that.
        </p>
        <p>
          <strong>Decode.</strong> We learn how your organisation works and gather what it
          already knows.
        </p>
        <p>
          <strong>Build.</strong> We create bespoke software around your data: maps, models
          and live dashboards that show where you stand, what it costs and what to do next.
        </p>
        <p>
          <strong>Embed.</strong> We work alongside your people, so they can lead the change
          themselves.
        </p>
        <p>
          Software like this was once only affordable for the largest organisations. Now it
          can be built for yours.
        </p>
        <p>
          And because everything sits in one structured record, you can ask it questions in
          plain English, or point your own AI at it.
        </p>
      </>
    ),
    accentColor: 'nzai',
  },

  letsShow: {
    leadingText: "Let's show you",
    pillLabel: 'Request Demo',
    pillHref: '/contact?product=nzai',
    trailingText: 'what we build',
  },

  steps: [
    {
      number: '01',
      headlinePrefix: 'Where your energy ',
      highlightedVerb: 'goes',
      headlineSuffix: '.',
      body:
        'Most organisations can\'t say what feeds what, or what it costs. Here every supply, building and meter sits on one map, with the cost behind each a click away.',
      video: {
        mp4: `${VIDEO_BASE}/01-energy-map.mp4`,
        webm: `${VIDEO_BASE}/01-energy-map.webm`,
        poster: `${VIDEO_BASE}/01-energy-map-poster.jpg`,
        alt: 'A site map where selecting a supply point highlights the buildings it serves and opens a monthly cost chart',
      },
    },
    {
      number: '02',
      headlinePrefix: 'Every tonne, ',
      highlightedVerb: 'traced',
      headlineSuffix: '.',
      body:
        'Follow emissions from the total for the whole organisation down to one site, one supplier and the spend behind it, and see where the biggest reductions lie.',
      video: {
        mp4: `${VIDEO_BASE}/02-carbon-traced.mp4`,
        webm: `${VIDEO_BASE}/02-carbon-traced.webm`,
        poster: `${VIDEO_BASE}/02-carbon-traced-poster.jpg`,
        alt: 'A carbon inventory moving from bar chart to donut to Sankey, then drilling down to a single supplier',
      },
    },
    {
      number: '03',
      headlinePrefix: 'Risk, ',
      highlightedVerb: 'mapped',
      headlineSuffix: '.',
      body:
        'The people who know a site best record what they see: past flooding, exposed trees, loose items. Each building gets a clear rating and a place on the risk register.',
      video: {
        mp4: `${VIDEO_BASE}/03-risk-mapped.mp4`,
        webm: `${VIDEO_BASE}/03-risk-mapped.webm`,
        poster: `${VIDEO_BASE}/03-risk-mapped-poster.jpg`,
        alt: 'A site map where recorded observations give each building a red, amber or green climate risk rating',
      },
    },
    {
      number: '04',
      headlinePrefix: 'Every option, ',
      highlightedVerb: 'tested',
      headlineSuffix: '.',
      body:
        'Switch measures on, adjust their scale and watch the path to net zero respond. The chosen measures become actions, each with an owner.',
      video: {
        mp4: `${VIDEO_BASE}/04-options-tested.mp4`,
        webm: `${VIDEO_BASE}/04-options-tested.webm`,
        poster: `${VIDEO_BASE}/04-options-tested-poster.jpg`,
        alt: 'A net zero trajectory bending down to its target as measures are switched on, then listed as actions with owners',
      },
    },
    {
      number: '05',
      headlinePrefix: 'Ask, and it ',
      highlightedVerb: 'answers',
      headlineSuffix: '.',
      body:
        'Ask a question in plain English, such as which buildings have both meter and occupancy data, and the answer appears on the map from your own record. Your own AI can read it too.',
      video: {
        mp4: `${VIDEO_BASE}/05-ask-your-data.mp4`,
        webm: `${VIDEO_BASE}/05-ask-your-data.webm`,
        poster: `${VIDEO_BASE}/05-ask-your-data-poster.jpg`,
        alt: 'A plain-English question typed over an estate map, with the matching buildings highlighted and a small chart beside each',
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
