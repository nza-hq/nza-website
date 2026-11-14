import type { ProductPageConfig } from '../../components/product/ProductPage'
import { Tooltip } from '../../components/Tooltip'

/* DfE Sustainability and Climate Change Strategy (2022) source URL +
   tooltip summary for the inline "climate action plan" link in the
   decodED manifesto. */
const DFE_STRATEGY_URL =
  'https://www.gov.uk/government/publications/sustainability-and-climate-change-strategy'
const DFE_TOOLTIP_BODY =
  'DfE Sustainability and Climate Change Strategy (2022). By 2025, all education settings nominate a sustainability lead and publish a climate action plan covering decarbonisation, adaptation, biodiversity, and climate education and green careers.'

/* "Find your school" opens the decodED app itself. Interim address: which
   public address the button lands on is still to be decided (Linzie, 14 Nov
   2026: "get everything else built and then decide"). Change it here only -
   the hero and the closer both read this constant. */
const APP_URL = 'https://decoded.netzeroadvisory.uk'

/* "Book a call" - the site's contact route, tagged with the product. */
const BOOK_A_CALL_URL = '/contact?product=decoded'

const VIDEO_BASE = '/videos/decoded'

/**
 * decodED product page config - rewritten to the NZ:AI format from the plan
 * Linzie agreed on 14 Nov 2026 (doc "decodED web page: plan").
 *
 * The page follows a first visit to the app: find a school, the twin is built
 * from public data, then the three lenses (Carbon, Climate, Nature) and the
 * plan. Every clip is recorded from the real app on Finham Park School,
 * Coventry (URN 136963), so the five steps tell one school's story.
 *
 * No first-person "we" (site rule; only /nz-ai is exempt). "decodED" is the
 * name's one spelling throughout.
 */
export const decodedConfig: ProductPageConfig = {
  slug: 'decoded',
  contextClass: 'context-decoded',
  isLight: true,

  palette: {
    canvas: '#F3EFE3',
    cream: '#FAF5EB',
    /* Body / large type uses deep green; the orange accent drives verb
       highlights + CTAs. */
    accent: '#0F5D43',
    accentLight: '#E8743C',
    canvasElevated: 'rgba(15, 93, 67, 0.04)',
    stepVerbColour: '#E8743C',
  },

  /* Hero: the app's own landing line, so the web page and the app say the
     same thing on first contact. "Find your school" sits right at the start
     (Linzie, 14 Nov 2026). */
  hero: {
    microLabel: 'CLIMATE ACTION IN EDUCATION',
    name: 'decodED',
    logoSrc: '/assets/logos/decoded-logo.svg',
    tagline: 'Find your school. Start its climate action plan.',
    oneLiner:
      'decodED builds a 3D digital twin of your site from public data, in under a minute. From there the whole school can see its carbon, its climate risks and its nature, build its climate action plan together, and take it into the classroom. Free to explore.',
    ctaLabel: 'Find your school',
    ctaHref: APP_URL,
    secondaryCtaLabel: 'Book a call',
    secondaryCtaHref: BOOK_A_CALL_URL,
    screens: [
      {
        src: '/images/products/decoded/decoded-map.png',
        shortLabel: 'Site loaded',
        alt: 'decodED with a school found, showing its site on the map',
      },
      {
        src: '/images/products/decoded/decoded-map-2.png',
        shortLabel: '3D buildings',
        alt: 'decodED digital twin of a school, its buildings in 3D',
      },
      {
        src: '/images/products/decoded/decoded-dashboard.png',
        shortLabel: 'Dashboard',
        alt: 'decodED showing climate risk, nature and key figures for a school',
      },
      {
        src: '/images/products/decoded/decoded-dashboard-2.png',
        shortLabel: 'Detail view',
        alt: 'decodED detail view with figures broken down',
      },
    ],
  },

  /* Manifesto: headline kept; body rewritten as one paragraph in the NZ:AI
     shape (the questions, the problem, what decodED does). The italic
     emphasis renders in decodED orange (.manifesto-block--decoded em). */
  manifesto: {
    microLabel: 'WHY DECODED',
    headline: (
      <>
        Good data, in the <em>right hands</em>.
      </>
    ),
    body: (
      <p>
        Every school in England is expected to have a{' '}
        <Tooltip
          label="climate action plan"
          body={DFE_TOOLTIP_BODY}
          footerHref={DFE_STRATEGY_URL}
          footerText="Read on gov.uk"
        />
        , covering carbon, a changing climate, nature, and climate education
        and green careers. Most have one person carrying it. Where do they
        start? What does the school already know? Who else can help?{' '}
        <span className="manifesto-brand">decodED</span> answers the first
        question in under a minute, with a digital twin built from public data.
        Then it puts the figures in the hands of everyone with a part to play,
        from the estates team to teachers, pupils and parents, so the plan
        belongs to the whole school.
      </p>
    ),
    accentColor: 'decoded',
  },

  letsShow: {
    leadingText: "Let's show you how",
    /* Empty = no pill on the showcase frame, as on /nz-ai: the hero and the
       closer already carry "Find your school". */
    pillLabel: '',
    pillHref: APP_URL,
    trailingText: 'decodED works',
  },

  /* Five steps, one per lens, in the order of a first visit to the app.
     Clips: docs/videos-decoded-README.md. */
  steps: [
    {
      number: '01',
      headlinePrefix: 'Your school, ',
      highlightedVerb: 'built',
      headlineSuffix: ' in 3D.',
      body:
        'Search for your school by name and decodED builds its digital twin from public records: building footprints, LiDAR heights, energy certificates, flood and climate data. In under a minute the site rises from the map, ready to explore building by building.',
      video: {
        mp4: `${VIDEO_BASE}/01-twin-built.mp4`,
        webm: `${VIDEO_BASE}/01-twin-built.webm`,
        poster: `${VIDEO_BASE}/01-twin-built-poster.jpg`,
        alt: 'A school name typed into a search box. The map flies to the school, its site is revealed and its buildings rise in 3D.',
      },
    },
    {
      number: '02',
      headlinePrefix: 'Your carbon, ',
      highlightedVerb: 'counted',
      headlineSuffix: '.',
      body:
        "decodED estimates the school's footprint from its energy certificates, spending and travel, then shows where it comes from and where it is heading to 2050. Swap any estimate for the school's own readings and every figure follows.",
      video: {
        mp4: `${VIDEO_BASE}/02-carbon-counted.mp4`,
        webm: `${VIDEO_BASE}/02-carbon-counted.webm`,
        poster: `${VIDEO_BASE}/02-carbon-counted-poster.jpg`,
        alt: "The school's carbon footprint broken down by topic, then a chart of where its emissions are heading to 2050.",
      },
    },
    {
      number: '03',
      headlinePrefix: 'Your climate risks, ',
      highlightedVerb: 'mapped',
      headlineSuffix: '.',
      body:
        "Flooding, heat, drought and storms, shown on the school's own site, now and as the climate changes. Add what staff already know, from the playground that floods to the classroom that overheats, and it becomes a climate risk assessment.",
      video: {
        mp4: `${VIDEO_BASE}/03-risks-mapped.mp4`,
        webm: `${VIDEO_BASE}/03-risks-mapped.webm`,
        poster: `${VIDEO_BASE}/03-risks-mapped-poster.jpg`,
        alt: "Flood risk shown in blue over the school's site and the roads around it.",
      },
    },
    {
      number: '04',
      headlinePrefix: 'Your nature, ',
      highlightedVerb: 'found',
      headlineSuffix: '.',
      body:
        'See the habitats on the school site, and the nature reserves and species records nearby. Add sightings and surveys, and find where a hedge, a pond or more trees would make the biggest difference.',
      video: {
        mp4: `${VIDEO_BASE}/04-nature-found.mp4`,
        webm: `${VIDEO_BASE}/04-nature-found.webm`,
        poster: `${VIDEO_BASE}/04-nature-found-poster.jpg`,
        alt: "Habitats painted over the school's site in greens, then the view pulls out to the nature around it.",
      },
    },
    {
      number: '05',
      headlinePrefix: 'Your plan, ',
      highlightedVerb: 'shared',
      headlineSuffix: '.',
      body:
        "Choose targets, see where to start, and give each action an owner and a date. Then take it into the classroom: lessons built on the school's own figures, a pupil travel survey, and the school's story from its site out to the planet.",
      video: {
        mp4: `${VIDEO_BASE}/05-plan-shared.mp4`,
        webm: `${VIDEO_BASE}/05-plan-shared.webm`,
        poster: `${VIDEO_BASE}/05-plan-shared-poster.jpg`,
        alt: "The school's climate action plan: its targets and where to start, with actions laid out by owner and date.",
      },
    },
  ],

  /* "Going further with NZA": free to explore, Pro priced per school by
     pupil numbers, and NZA's specialists. Prices match the app's own
     pricing table (nza-decoded public/help.html, ex VAT). Only the lowest
     price is shown: "starting from £500 per school" (Linzie, 14 Nov 2026). */
  goingFurther: {
    microLabel: 'GOING FURTHER WITH NZA',
    headline: 'Explore for free. Take it further with decodED Pro.',
    intro:
      'Anyone can find a school and explore its twin for free. decodED Pro opens everything else: the school\'s own figures, every lens in full, the plan and the classroom, for everyone at the school.',
    cards: [
      {
        title: 'Priced to be within reach',
        body: (
          <p>
            One price per school, set by pupil numbers and kept as low as
            possible, starting from £500 per school. As many people at the
            school as you like, at no extra cost.
          </p>
        ),
      },
      {
        title: 'A twin that keeps growing',
        body: (
          <p>
            Add meters and sensors to the same twin, and live data takes the
            place of estimates. The model becomes a tool the school uses every
            week: warmer classrooms in January, cooler ones in June, and waste
            found before the invoice does.
          </p>
        ),
      },
      {
        title: 'Specialist expertise',
        body: (
          <p>
            NZA's decarbonisation, climate and biodiversity specialists work
            alongside your sustainability lead, estates team, teachers and
            pupils. Detailed assessments and real engineering, when the plan
            needs more than the tool.
          </p>
        ),
      },
    ],
    ctaText: 'Book a call to find out more',
    ctaHref: BOOK_A_CALL_URL,
  },

  /* Closer: once someone has read the page, they can find their school or
     book a call (Linzie, 14 Nov 2026). */
  closer: {
    headline:
      'Built for everyone in education, from nurseries to universities, who wants to understand their site, plan for the future and act on what matters.',
    subhead: 'Climate action, decoded.',
    ctaLabel: 'Find your school',
    ctaHref: APP_URL,
    secondaryCtaLabel: 'Book a call',
    secondaryCtaHref: BOOK_A_CALL_URL,
  },
}
