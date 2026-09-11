import type { ProductPageConfig } from '../../components/product/ProductPage'

const CLIENT_LOGO_BASE = '/assets/clients'
const VIDEO_BASE = '/videos/nzai'

/**
 * NZ:AI product page config - "from process to proof" restructure
 * (nzai-showcase brief, Sept 2026).
 *
 * The page used to explain a three-stage process (Decode -> Build ->
 * Partner). That arc now lives on the landing page's screen 2, told
 * more briefly. This page's job is to PROVE NZA can build things, so
 * the steps slot now carries FOUR showcase items - each backed by a
 * short square video of a real tool. The page stops explaining and
 * starts showing.
 *
 *   - Hero:      "Intelligence you own." + a 17-word one-liner that
 *                sets up the showcase.
 *   - Manifesto: headline "Climate action is an *inside* job."
 *                unchanged; body now hands into the four tools.
 *   - Steps:     four video showcase items, ordered to widen the frame
 *                (one document -> one dataset -> one estate -> many
 *                years). Verbs render in NZ:AI teal via `.step-verb`.
 *   - Voice:     first-person "we" stays sanctioned on /nz-ai.
 *   - AI:        the copy now carries zero substantive AI mentions
 *                (brand name NZ:AI aside) - the tools demonstrate the
 *                capability rather than claiming it.
 *
 * The shared product-page TEMPLATE is unchanged. Video support is a new
 * visual type in ProductStepsSection (ProductStepVideo); PABLO/decodED
 * keep their SVG illustrations. Placeholder footage lives in
 * public/videos/nzai/ - see docs/videos-nzai-README.md for the real
 * recording spec.
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
    /* microLabel updated per v9: NZ:AI now stands for Net Zero
       Advisory and Intelligence (not "intelligence platform"). The
       expanded form sits in the mono eyebrow above the logo. */
    microLabel: 'NET ZERO ADVISORY + INTELLIGENCE',
    name: 'NZ:AI',
    logoSrc: '/assets/logos/nzai-logo.svg',
    /* Hero tagline (nzai-showcase brief Part 3). Renders in the
       template's DM Serif italic tagline treatment. */
    tagline: 'Intelligence you own.',
    /* Hero one-liner (nzai-showcase brief Part 3) - 17 words, replacing
       the v9 58-word paragraph. Sets up the showcase ("Here's what that
       looks like.") that the four items below deliver. */
    oneLiner:
      "Carbon and climate intelligence, built for your organisation and owned by it. Here's what that looks like.",
    ctaLabel: 'Get in touch',
    ctaHref: 'mailto:chrisscott@thenza.co.uk?subject=NZ%3AAI%20-%20Get%20in%20touch',
    /* Existing screens retained - v9 notes the existing platform
       screenshots are fine for launch and a morphing-chart hero
       animation is nice-to-have for later. */
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
      "Real progress on net zero comes from the people inside your organisation — the ones with the relationships, the knowledge, and the context to act. They need the data in front of them, in a form they can use. NZ:AI puts it there. These are four of the tools we've built.",
    accentColor: 'nzai',
  },

  letsShow: {
    /* nzai-showcase brief Part 3: "Let's show you what [Request Demo]
       we've built" - the page now SHOWS built tools rather than
       explaining how the process works. */
    leadingText: "Let's show you what",
    pillLabel: 'Request Demo',
    pillHref: '/contact?product=nzai',
    trailingText: "we've built",
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

  /* v9 CLOSING CTA - "Let's work out if it's the right fit."
     Closer microLabel dropped (matches PABLO's June 2026 redesign -
     the eyebrow felt redundant once headline + subhead carried the
     credibility weight).

     Closer switched from a flat clientLogos row to PABLO's
     click-to-expand caseStudies format. Three real engagements
     anchor v9's partnership claim with concrete examples - EOC's
     SBTi-aligned interventions playground, RWGC's emissions
     visualisation for members + GEO certification, and Molson's
     supply-chain embodied + operational lifecycle tool. One card
     open at a time (the template's single-expand state handles
     that automatically). */
  closer: {
    headline: "Let's work out if it's the right fit.",
    subhead:
      "Half an hour. We'll understand where you are, what you have, and what you are trying to achieve. From there, we'll work out together whether a Decode sprint is the right next step - or whether something else suits your situation better.",
    caseStudies: [
      {
        id: 'eckersley-ocallaghan',
        logoSrc: `${CLIENT_LOGO_BASE}/eckersley-ocallaghan.svg`,
        alt: "Eckersley O'Callaghan",
        companyName: "Eckersley O'Callaghan",
        body:
          "We've helped map out their carbon emissions across their nine global offices and built an interactive decarbonisation strategy that lets them play with interventions and test what happens under different scenarios, fully aligned to SBTi.",
      },
      {
        id: 'royal-wimbledon',
        /* Use the -2 variant which includes the wordmark alongside the
           crest, matching the convention PABLO uses on the same row -
           the case-studies row then reads consistently across the
           three products. */
        logoSrc: `${CLIENT_LOGO_BASE}/royal-wimbledon-golf-club-2.svg`,
        alt: 'Royal Wimbledon Golf Club',
        companyName: 'Royal Wimbledon Golf Club',
        body:
          "We're building a platform for them to visualise their energy use and emissions and show that to their members. As they put it, it will help them with their GEO certification - a tool to really manage their emissions well.",
      },
      {
        id: 'molson-group',
        logoSrc: `${CLIENT_LOGO_BASE}/molson-group.svg`,
        alt: 'Molson Group',
        companyName: 'Molson Group',
        body:
          "Molson is one of the UK's biggest construction equipment dealers. We're helping them understand their supply chain emissions through a tool that lets them see their entire product portfolio - down to the individual digger - and the embodied carbon and operational lifecycle emissions associated with each.",
      },
    ],
    ctaLabel: 'Get in touch',
    ctaHref: 'mailto:chrisscott@thenza.co.uk?subject=NZ%3AAI%20-%20Get%20in%20touch',
  },
}
