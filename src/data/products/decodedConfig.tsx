import type { ProductPageConfig } from '../../components/product/ProductPage'
import { Tooltip } from '../../components/Tooltip'
import { DecodedLogoInline, DecodedWord } from '../../components/product/DecodedBrand'

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

/* "Book a call" - decodED's own Microsoft Bookings page (Linzie, 15 Nov 2026).
   ProductPage opens http(s) CTAs in a new tab. */
const BOOK_A_CALL_URL =
  'https://bookings.cloud.microsoft/book/decodED1@thenza.co.uk/?ismsaljsauthenabled'

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

  /* Matched to the decodED app itself (Linzie, 15 Nov 2026: the cream was too
     strong; "make it match decodED"): an off-white page, the app's own light
     warm grey (#F5F4F1) for the showcase surface, and the logo's green
     (#235546) and orange (#E28F2C). */
  palette: {
    canvas: '#FBFBF9',
    cream: '#F5F4F1',
    accent: '#235546',
    accentLight: '#E28F2C',
    canvasElevated: 'rgba(35, 85, 70, 0.04)',
    stepVerbColour: '#E28F2C',
  },

  /* Hero: the app's own landing line, so the web page and the app say the
     same thing on first contact. "Find your school" sits right at the start
     (Linzie, 14 Nov 2026). */
  hero: {
    microLabel: 'CLIMATE ACTION IN EDUCATION',
    name: 'decodED',
    logoSrc: '/assets/logos/decoded-logo.svg',
    tagline: 'Find your school. Start its climate action plan.',
    oneLiner: (
      <>
        decodED builds a 3D digital twin of your site from public data,
        in under a minute. From there the whole school can see its carbon, its
        climate risks and its nature, build its climate action plan together,
        and take it into the classroom. Free to explore.
      </>
    ),
    ctaLabel: 'Find your school',
    ctaHref: APP_URL,
    secondaryCtaLabel: 'Book a call',
    secondaryCtaHref: BOOK_A_CALL_URL,
    /* Fresh 1600x1000 captures of the live app on Finham Park (14 Nov 2026). */
    screens: [
      {
        src: '/images/products/decoded/decoded-01-twin.png',
        shortLabel: 'Digital twin',
        alt: 'decodED digital twin of Finham Park School in 3D, with one building selected and its details open',
      },
      {
        src: '/images/products/decoded/decoded-02-carbon.png',
        shortLabel: 'To 2050',
        alt: "decodED chart of Finham Park School's emissions to 2050 against the science-based pathway",
      },
      {
        src: '/images/products/decoded/decoded-03-plan.png',
        shortLabel: 'Plan board',
        alt: "decodED plan board with Finham Park School's climate actions under Planned, Doing and Done",
      },
      {
        src: '/images/products/decoded/decoded-04-story.png',
        shortLabel: 'Our story',
        alt: 'decodED Our story: Finham Park School on a globe, from the classroom to the planet',
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
        <DecodedWord /> answers the first
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
    /* "decodED" in this headline is drawn as the logo (Linzie, 15 Nov 2026). */
    logoWord: { word: 'decodED', node: <DecodedLogoInline /> },
  },

  /* Six steps in the order of a first visit to the app (Linzie, 15 Nov 2026:
     the sixth, the school's story in the classroom, added). Clips:
     docs/videos-decoded-README.md. */
  steps: [
    {
      number: '01',
      headlinePrefix: 'Your school, ',
      highlightedVerb: 'built',
      headlineSuffix: ' in 3D.',
      body: (
        <>
          Search for your school by name and decodED builds its digital
          twin from public records: building footprints, LiDAR heights, energy
          certificates, flood and climate data. In under a minute the site rises
          from the map, ready to explore building by building.
        </>
      ),
      video: {
        mp4: `${VIDEO_BASE}/01-twin-built.mp4?v=4`,
        webm: `${VIDEO_BASE}/01-twin-built.webm?v=4`,
        poster: `${VIDEO_BASE}/01-twin-built-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: 'Finham Park typed into the search. The map flies to the school and its site is built in 3D, sped up.',
      },
    },
    {
      number: '02',
      headlinePrefix: 'Your carbon, ',
      highlightedVerb: 'counted',
      headlineSuffix: '.',
      body: (
        <>
          decodED estimates the school's footprint from its energy
          certificates, spending and travel, then shows where it comes from and
          where it is heading to 2050. Swap any estimate for the school's own
          readings and every figure follows.
        </>
      ),
      video: {
        mp4: `${VIDEO_BASE}/02-carbon-counted.mp4?v=4`,
        webm: `${VIDEO_BASE}/02-carbon-counted.webm?v=4`,
        poster: `${VIDEO_BASE}/02-carbon-counted-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: "Finham Primary School's carbon: the emissions table, a flow chart of where its emissions come from, and its path to 2050.",
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
        mp4: `${VIDEO_BASE}/03-risks-mapped.mp4?v=4`,
        webm: `${VIDEO_BASE}/03-risks-mapped.webm?v=4`,
        poster: `${VIDEO_BASE}/03-risks-mapped-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: 'Eton College: surface water from heavy rain switched on and off over the site in 3D, then on the map around it the Thames floodplain switched on and off, covering almost the whole site.',
      },
    },
    {
      number: '04',
      headlinePrefix: 'Your nature, ',
      highlightedVerb: 'found',
      headlineSuffix: '.',
      body:
        'See the habitats on the school site, and the nature reserves and species records in and around it. Add sightings and surveys, find where a hedge, a pond or more trees would make the biggest difference, and connect the site to the nature beyond its fence.',
      video: {
        mp4: `${VIDEO_BASE}/04-nature-found.mp4?v=4`,
        webm: `${VIDEO_BASE}/04-nature-found.webm?v=4`,
        poster: `${VIDEO_BASE}/04-nature-found-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: 'A school site in 2D with a 1 km ring, nature records popping up as dots, then the ring widening and more appearing.',
      },
    },
    {
      number: '05',
      headlinePrefix: 'Your plan, ',
      highlightedVerb: 'made',
      headlineSuffix: '.',
      body:
        'Choose targets for carbon, climate and nature, see where to start, and give each action an owner and a date. Follow it as a list, a board or a timeline, with everyone who has a part in it.',
      video: {
        mp4: `${VIDEO_BASE}/05-plan-made.mp4?v=4`,
        webm: `${VIDEO_BASE}/05-plan-made.webm?v=4`,
        poster: `${VIDEO_BASE}/05-plan-made-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: "A school's climate action plan: its targets, an area's actions, then every action as a list, a board and a timeline, and the people behind it.",
      },
    },
    {
      number: '06',
      headlinePrefix: 'Your story, ',
      highlightedVerb: 'told',
      headlineSuffix: '.',
      body:
        "Take the school's climate action into the classroom: its story from the planet down to its own buildings, lessons built on the school's own figures, and a pupil travel survey.",
      video: {
        mp4: `${VIDEO_BASE}/06-story-classroom.mp4?v=4`,
        webm: `${VIDEO_BASE}/06-story-classroom.webm?v=4`,
        poster: `${VIDEO_BASE}/06-story-classroom-poster.jpg?v=4`,
        alwaysPlay: true,
        alt: "The school's story: the Earth turning as the world's renewables grow, the UK at night, then down through Coventry to the school's buildings.",
      },
    },
  ],

  /* Three steps in (Linzie, 15 Nov 2026): explore for free, build the plan
     with Pro for a small price, then take it further in partnership with
     NZA alongside the school's sustainability lead. Only the lowest price is
     shown ("starting from £500 per school"); it matches the app's own table
     (nza-decoded public/help.html, ex VAT). */
  goingFurther: {
    microLabel: 'THREE STEPS IN',
    headline: 'Start free. Plan with Pro. Go further with NZA.',
    intro: (
      <p>
        Anyone can explore their school with decodED for free. decodED Pro is a
        small yearly price that opens the full tool to build and run the climate action plan with the whole school. And when
        the plan needs more, NZA works in partnership with the school,
        alongside its sustainability lead.
      </p>
    ),
    cards: [
      {
        title: 'Explore for free',
        tag: 'Free',
        body: (
          <p>
            Find your school and explore its digital twin, its carbon footprint
            and where it is heading to 2050. Nothing to pay and no account
            needed.
          </p>
        ),
      },
      {
        title: 'Build your climate action plan with Pro',
        tag: 'From £500 per school',
        body: (
          <p>
            Add the school's own figures, open every lens in full, and build the
            plan with targets, owners, dates and lessons. One price per school,
            set by pupil numbers, with as many people as you like.
          </p>
        ),
      },
      {
        title: 'Take it further with NZA',
        tag: 'Partnership',
        featured: true,
        body: (
          <p>
            NZA's decarbonisation, climate and biodiversity specialists work
            alongside your sustainability lead and estates team: meters and
            sensors on the same twin, detailed assessments and real engineering.
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
