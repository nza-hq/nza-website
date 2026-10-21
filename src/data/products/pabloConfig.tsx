import type { ProductPageConfig } from '../../components/product/ProductPage'

const CLIENT_LOGO_BASE = '/assets/clients'

export const pabloConfig: ProductPageConfig = {
  slug: 'pablo',
  contextClass: 'context-pablo',
  isLight: false,

  palette: {
    canvas: '#1F0F2E',
    cream: '#FAF5EB',
    /* Swapped from pale violet (#B79CFF / #7A74FF) to the brand coral
       per Chris - the pale purple wasn't sitting right on the aubergine.
       Coral on aubergine reads as a confident NZA-family identity. */
    accent: '#DC4844',
    accentLight: '#F75A55',
    canvasElevated: 'rgba(247, 90, 85, 0.05)',
    stepVerbColour: '#F75A55',
  },

  hero: {
    microLabel: 'SOFTWARE',
    name: 'PABLO',
    logoSrc: '/assets/logos/pablo-logo.svg',
    /* Tagline updated per Chris - was "Half-hourly intelligence. Real
       impact." Now a punchier promise that frames PABLO as the answer
       to "energy is confusing." */
    tagline: 'Make energy make sense',
    oneLiner:
      'Your electricity bill is more complex than you think. PABLO breaks it down - and shows you what to do about it.',
    /* CTA updated per nza-pablo-page-brief.md Change 3 - "Get in
       Touch" -> "Book a demo" on every PABLO-page CTA (hero + closer).
       The site-wide nav CTA stays "GET IN TOUCH". */
    ctaLabel: 'Book a demo',
    ctaHref: 'mailto:info@netzeroadvisory.uk?subject=PABLO%20-%20Book%20a%20demo',
    screens: [
      {
        /* Real PABLO home / site workspace screen. */
        src: '/images/products/pablo/pablo-home.png',
        shortLabel: 'Site workspace',
        alt: 'PABLO site workspace showing the home view with map, project panels and financial overview',
      },
      {
        /* Real PABLO energy flows screen. */
        src: '/images/products/pablo/pablo-flow.png',
        shortLabel: 'Energy flows',
        alt: 'PABLO energy flows view',
      },
      {
        /* Real PABLO financial case screen. */
        src: '/images/products/pablo/pablo-financial.png',
        shortLabel: 'Financial case',
        alt: 'PABLO financial case showing the payback curve and savings breakdown',
      },
      {
        /* Real PABLO optimisation screen - bonus 4th panel since the
           BrowserFrame supports any number of cycles. */
        src: '/images/products/pablo/pablo-optimise.png',
        shortLabel: 'Optimisation',
        alt: 'PABLO optimisation view',
      },
    ],
  },

  /* SECTION 2 - Manifesto (full-viewport "why" takeover, replaces the
     old `transition` two-liner per the manifestos brief Movement 2).
     Italic emphasis on "Where" per Movement 2's locked emphasis
     list (Chunk 3 of the manifestos brief). */
  manifesto: {
    microLabel: 'WHY PABLO',
    headline: (
      <>
        <em>Where</em> the energy market, the grid, and your building meet.
      </>
    ),
    body:
      'Commercial electricity is one of the most complex purchases an organisation makes - dynamic markets, more than a dozen separate charges, regulation that keeps moving. PABLO sits at the intersection where the market, the grid, and what happens behind the meter overlap. It turns that complexity into clarity - and gives you the confidence to invest in solar, storage, electrification, and the energy transition.',
    accentColor: 'pablo',
  },

  letsShow: {
    leadingText: "Let's show you how",
    pillLabel: 'Request Demo',
    pillHref: '/contact?product=pablo',
    trailingText: 'PABLO works',
  },

  /* Five "how it works" sections per nza-pablo-page-brief.md Change 1.
     Copy is LOCKED - do not paraphrase. Section verbs (breaks down /
     models / separates / test / builds) are the coral-highlighted
     words in each headline; the prefix + suffix render in cream
     around them. Icons are interim placeholders - per the brief, real
     illustrations will be supplied as SVG exports in a follow-up. */
  /* Step headlines split into prefix / highlightedVerb / suffix so the
     verb word renders in PABLO's coral via the template's `.step-verb`
     class (driven by `palette.stepVerbColour` above). Verb-only colour,
     no italic. Per Chris's feedback after Chunk 2 of the manifestos
     brief - on-screen text is identical to the previous `headline`
     single-string form; only the colour highlight is new. Bodies are
     unchanged. */
  steps: [
    {
      number: '01',
      iconName: 'ti-receipt',
      headlinePrefix: '',
      highlightedVerb: 'Rebuild',
      headlineSuffix: " your bill",
      body:
        "All PABLO needs is your load data and a copy of your bill. From those two inputs it rebuilds your bill from first principles - wholesale, network charges, levies, and what your supplier adds on top - so you can see exactly what you're paying for, and exactly where the savings are.",
      illustrationConcept: 'bill-decomposition',
    },
    {
      number: '02',
      iconName: 'ti-activity',
      headline: "Your load shape",
      headlinePrefix: '',
      highlightedVerb: '',
      headlineSuffix: '',
      body:
        "It's not just how much electricity you use - it's when. The same unit costs more at five on a winter evening than at three in the morning, because the market, the network and the levies all charge more when demand is high. PABLO lays those prices over your usage, so you can see which hours are quietly costing you the most.",
      illustrationConcept: 'demand-profile-half-hourly',
    },
    {
      number: '03',
      iconName: 'ti-currency-pound',
      headline: "Your grid connection",
      headlinePrefix: '',
      highlightedVerb: '',
      headlineSuffix: '',
      body:
        "Every site has an agreed limit on how much power it can draw from the grid, and you pay for that limit whether you use it or not. Most sites never get close. PABLO shows your agreed capacity against what you actually draw, what the unused headroom costs you, and where your demand is heading - so you can right-size your connection with confidence.",
      illustrationConcept: 'charges-stack',
    },
    {
      number: '04',
      iconName: 'ti-flask',
      headlinePrefix: '',
      highlightedVerb: 'Optimise',
      headlineSuffix: " your energy strategy",
      body:
        "Once you understand the true cost of your electricity, you can start to optimise against it. Solar, storage, load shifting, peak shaving, capacity reduction, flexibility services - PABLO models them against your real building and shows you how they work together, so you can find the solution that's right for you.",
      illustrationConcept: 'options-sandbox',
    },
    {
      number: '05',
      iconName: 'ti-chart-bar',
      headlinePrefix: '',
      highlightedVerb: 'Understand',
      headlineSuffix: " the value over time",
      body:
        "An energy strategy plays out over decades, and almost everything in it moves - energy prices, network charges, equipment that wears and gets replaced. PABLO builds the whole-life picture: what business as usual really costs, what each option saves, and how that changes as the world around it does. Test the assumptions, see how the case responds, and move forward with confidence.",
      illustrationConcept: 'investment-case-stack',
    },
  ],

  /* Closer restructured per nza-pablo-page-brief.md Change 2:
     - microLabel omitted (the old "WHO'S USING PABLO" pink eyebrow
       is dropped entirely)
     - subhead replaced with the combined audience + value line that
       used to sit at the bottom of the page sign-off
     - clientLogos -> caseStudies: 3 expandable cards (Hartpury / IVG
       / RWGC), Molson dropped per the brief
     - ctaLabel "Get in touch" -> "Book a demo" */
  closer: {
    headline: 'Real estates. Real savings.',
    subhead:
      'Built for energy consultants, sustainability advisors, and building owners who need to understand the true cost of electricity - and the real value of the solutions. PABLO turns complexity into clear, costed action.',
    caseStudies: [
      {
        id: 'hartpury',
        logoSrc: `${CLIENT_LOGO_BASE}/hartpury-university.svg`,
        alt: 'Hartpury University',
        companyName: 'Hartpury University',
        body:
          "PABLO was used to analyse Hartpury's site load and optimise their grid connection - saving over GBP250,000 a year in network charges and rising, while enabling them to move forward with their electrification strategy with confidence.",
      },
      {
        id: 'inspired-villages',
        logoSrc: `${CLIENT_LOGO_BASE}/inspired-villages.svg`,
        alt: 'Inspired Villages',
        companyName: 'Inspired Villages',
        body:
          "PABLO is being used to model IVG's entire portfolio - providing clarity on their energy spend and developing a microgrid strategy that delivers energy resilience, supports IVG's net zero ambitions, and benefits residents directly.",
      },
      {
        id: 'royal-wimbledon',
        /* Swapped to the -2 variant Chris added which includes the
           wordmark alongside the crest, so the case-studies row
           reads consistently (all three logos now include their
           company name and we no longer need to render the name
           separately beneath each). */
        logoSrc: `${CLIENT_LOGO_BASE}/royal-wimbledon-golf-club-2.svg`,
        alt: 'Royal Wimbledon Golf Club',
        companyName: 'Royal Wimbledon Golf Club',
        body:
          "PABLO is being used to make sense of RWGC's electricity spend, find them a better tariff, and now model a solar canopy and battery system to help power one of the oldest golf clubs in England.",
      },
    ],
    ctaLabel: 'Book a demo',
    ctaHref: 'mailto:info@netzeroadvisory.uk?subject=PABLO%20-%20Book%20a%20demo',
  },
}
