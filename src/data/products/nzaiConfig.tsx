import type { ProductPageConfig } from '../../components/product/ProductPage'

const VIDEO_BASE = '/videos/nzai'

/**
 * NZ:AI product page config - copy deck Rev E (brief R07, 19 Oct 2026).
 *
 * Message: NZ:AI turns what an organisation knows (its data and its people)
 * into intelligence it can act on. Each step body sets the scene for a
 * newcomer, says what NZA does with the client's team, then what the client
 * can act on. The five clips are examples of that method.
 * Filenames are unchanged from R03. Case studies are held pending client
 * sign-off. Page stays "coming soon".
 *
 * First-person "we" is sanctioned on /nz-ai per CLAUDE.md.
 * AI is mentioned in exactly one place: step 05.
 */
export const nzaiConfig: ProductPageConfig = {
  slug: 'nzai',
  contextClass: 'context-nzai',
  isLight: false,

  palette: {
    canvas: '#0A1628',
    /* NZ:AI showcase surface: a soft, barely-warm off-white - not the cold grey
       it had (Chris: too cold) and not the landing's cream (too warm). The card
       sits on it in the same tone (see product-page.css) so there's no offset. */
    cream: '#F7F6F3',
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
    tagline: 'A new kind of advisory service.',
    oneLiner:
      'Specialist energy, carbon and climate expertise, combined with software built on your own data. Advice you can act on, and intelligence that stays with you.',
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
    body:
      'What is really driving your energy costs? What should you do with your carbon data? How will a changing climate affect your sites? None of these can be answered from the outside. The answers depend on how your organisation works, and much of that knowledge sits with your people. So NZ:AI works from the inside: we embed with your team, bring what you know into one connected record, and build the tools to act on it.',
    accentColor: 'nzai',
  },

  letsShow: {
    leadingText: "Let's show you",
    /* Empty = no Request Demo pill on the showcase frame. The top nav's
       "Get in touch" already carries conversion, so the pill doubled up
       (Chris). ProductStepsSection skips the pill when the label is blank. */
    pillLabel: '',
    pillHref: '/contact?product=nzai',
    trailingText: 'what we build',
  },

  steps: [
    {
      number: '01',
      headlinePrefix: 'Your energy, ',
      highlightedVerb: 'decoded',
      headlineSuffix: '.',
      body:
        'Most organisations see their energy as one meter and one bill. We help you put the right meters and sensors in place and bring it all into one record, so you can see what drives your demand and costs, and what to change.',
      video: {
        mp4: `${VIDEO_BASE}/01-energy-map.mp4`,
        webm: `${VIDEO_BASE}/01-energy-map.webm`,
        poster: `${VIDEO_BASE}/01-energy-map-poster.jpg`,
        alt: 'A site energy network drawn as a flow diagram, from the incoming supply through substations to buildings, then one building\'s half-hourly profile with out-of-hours use shaded.',
      },
    },
    {
      number: '02',
      headlinePrefix: 'Carbon data you can ',
      highlightedVerb: 'act on',
      headlineSuffix: '.',
      body:
        'A carbon footprint is usually a single number in a report. We build yours as a record you can explore, down to any site, vehicle or supplier, with the spend, commitments and data quality behind it, so you know where to act.',
      video: {
        /* ?v bump busts the CDN/browser cache when the clip is re-recorded at
           the same filename (the table-hold re-record; Chris saw the old one) */
        mp4: `${VIDEO_BASE}/02-carbon-traced.mp4?v=2`,
        webm: `${VIDEO_BASE}/02-carbon-traced.webm?v=2`,
        poster: `${VIDEO_BASE}/02-carbon-traced-poster.jpg?v=2`,
        alt: 'A carbon inventory table opening into bars by scope, category and supplier, ending on one supplier\'s card showing its spend, target status and data quality.',
      },
    },
    {
      number: '03',
      headlinePrefix: 'Climate risk, made ',
      highlightedVerb: 'local',
      headlineSuffix: '.',
      body:
        'Climate change will affect every organisation differently. We work with your team to understand the risks to your sites, people, services and supply chain, combining future climate data with what you know, so you can plan how to adapt.',
      video: {
        mp4: `${VIDEO_BASE}/03-risk-mapped.mp4`,
        webm: `${VIDEO_BASE}/03-risk-mapped.webm`,
        poster: `${VIDEO_BASE}/03-risk-mapped-poster.jpg`,
        alt: 'A site plan beside a climate risk chart. As the decades pass the risk rises, then the buildings nearest the woodland light up for wildfire, with notes from the site team, beside a projection of high fire-danger days to 2080.',
      },
    },
    {
      number: '04',
      headlinePrefix: 'Every option, ',
      highlightedVerb: 'tested',
      headlineSuffix: '.',
      body:
        'There is no single route to net zero. We model your emissions pathway with your team, so you can test each measure, adjust it and see straight away which levers make the biggest difference.',
      video: {
        mp4: `${VIDEO_BASE}/04-options-tested.mp4`,
        webm: `${VIDEO_BASE}/04-options-tested.webm`,
        poster: `${VIDEO_BASE}/04-options-tested-poster.jpg`,
        alt: 'A carbon trajectory chart where four measures are switched on and adjusted one by one, bending the plan line down from red to green until it meets the net zero pathway.',
      },
    },
    {
      number: '05',
      headlinePrefix: 'Put your data to ',
      highlightedVerb: 'work',
      headlineSuffix: '.',
      body:
        'Most of what an organisation knows sits in spreadsheets, inboxes and people\'s heads. We bring it into one record you can ask questions of in plain English, or open up to your own AI.',
      video: {
        mp4: `${VIDEO_BASE}/05-ask-your-data.mp4`,
        webm: `${VIDEO_BASE}/05-ask-your-data.webm`,
        poster: `${VIDEO_BASE}/05-ask-your-data-poster.jpg`,
        alt: 'A plain-English question typed over an estate map, with the buildings that have floor plans and a meter highlighted and a small chart beside each',
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
