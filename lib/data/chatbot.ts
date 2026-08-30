import {
  CERTIFICATION_DETAIL,
  COMMERCIAL_TERMS,
  PRODUCT_LINES,
  PROCESS_STAGES,
  SERVICE_CAPABILITIES,
  VERIFIED,
} from '@/lib/data/company'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/lib/data/gallery'

/* ===========================================================================
   CHAT ASSISTANT KNOWLEDGE BASE
   ---------------------------------------------------------------------------
   Every answer below is assembled from lib/data/company.ts - the repository's
   single source of truth - or from the client-approved homepage copy. Nothing
   here may state a shipping time, a port, an MOQ, a lead time, a price or a
   contact channel, because none of those is verified anywhere in this
   repository. Unverifiable questions get an honest routing answer that hands
   the visitor to /contact instead of a plausible invention.
   =========================================================================== */

export interface ChatSuggestion {
  label: string
  /** The query sent when this chip is tapped. */
  query: string
}

export interface ChatAction {
  text: string
  href: string
}

/** A compact specification card rendered inside a bot message. */
export interface ChatCard {
  code: string
  title: string
  rows: { label: string; value: string }[]
  href?: string
}

export interface ChatIntent {
  id: string
  /** Keywords scored against the visitor's message; weight = match count. */
  keywords: string[]
  /** Receives the visitor's message so discovery intents can react to it. */
  answer: (message?: string) => string
  /** Optional product / specification cards attached to the answer. */
  cards?: ChatCard[]
  suggestions?: ChatSuggestion[]
  action?: ChatAction
}

const lineList = PRODUCT_LINES.map((p) => `${p.title} (${p.code})`).join(', ')

/** One card per product line, built from verified attributes only. */
const PRODUCT_CARDS: ChatCard[] = PRODUCT_LINES.map((p) => ({
  code: p.code,
  title: p.title,
  rows: p.verifiedAttributes.map((a) => ({ label: a.label, value: a.value })),
  href: `/products#${p.id}`,
}))

const SPEC_CARD: ChatCard = {
  code: 'SPEC',
  title: 'Order-specific specification',
  rows: [
    { label: 'Denier range', value: VERIFIED.denierRange },
    { label: 'Cut length', value: 'Set per order' },
    { label: 'Crimp & finish', value: 'To your process' },
    { label: 'Data sheets', value: 'Not yet published' },
  ],
  href: '/contact',
}

const CERT_CARDS: ChatCard[] = CERTIFICATION_DETAIL.map((c) => ({
  code: c.code,
  title: c.name,
  rows: [{ label: 'Scope', value: c.scope }],
  href: '/quality',
}))

const COMPARE_CARDS: ChatCard[] = ['psf-regenerated', 'psf-virgin'].map((id) => {
  const p = PRODUCT_LINES.find((l) => l.id === id)!
  return {
    code: p.code,
    title: p.title,
    rows: p.verifiedAttributes.map((a) => ({ label: a.label, value: a.value })),
    href: `/products#${p.id}`,
  }
})

/* The whole-company briefing behind the "More about us" button: the published
   record in three cards - who the company is, what it manufactures, and the
   standing commercial terms. Every value is read from company.ts. */
const OVERVIEW_CARDS: ChatCard[] = [
  {
    code: 'PROFILE',
    title: VERIFIED.legalName,
    rows: [
      { label: 'Established', value: `${VERIFIED.established} · ${VERIFIED.country}` },
      { label: 'Years in business', value: VERIFIED.yearsInBusiness },
      { label: 'Annual capacity', value: VERIFIED.annualCapacity },
      { label: 'Customers served', value: VERIFIED.customers },
      { label: 'Workforce', value: VERIFIED.workforce },
      { label: 'Registrations', value: VERIFIED.certificationCount },
    ],
    href: '/company',
  },
  {
    code: 'SCOPE',
    title: 'What we manufacture',
    rows: [
      ...PRODUCT_LINES.map((p) => ({ label: p.code, value: p.title })),
      { label: 'Denier range', value: VERIFIED.denierRange },
    ],
    href: '/products',
  },
  {
    code: 'TERMS',
    title: 'Standing commercial terms',
    rows: COMMERCIAL_TERMS.map((t) => ({ label: t.label, value: t.value })),
    href: '/contact',
  },
]

export const GREETING_ANSWER = `I am the Gulf Fibre assistant. Ask about our product lines, the ${VERIFIED.denierRange} denier range, certifications, the production sequence or commercial terms.`

/* ---------------------------------------------------------------------------
   QUICK-ACTION CHIPS
   ---------------------------------------------------------------------------
   Short, scannable button labels ("Products", "Certifications") paired with the
   full question that is actually sent to matchIntent. Defined once and reused
   everywhere - page openings, intent follow-ups and the fallback - so the chip
   wording stays consistent across the whole conversation. Each query is chosen
   to resolve to the intended intent under the scoring in matchIntent below.
   --------------------------------------------------------------------------- */
export const CHIP = {
  products: { label: 'Products', query: 'What is your product range?' },
  compare: { label: 'Compare lines', query: 'Compare the difference between the fibre lines' },
  specs: { label: 'Denier & specs', query: 'What denier range and specifications do you offer?' },
  bedding: { label: 'Fibre for bedding', query: 'What product should I use for bedding?' },
  recommend: { label: 'Recommend a fibre', query: 'Which product do you recommend for my application?' },
  certifications: { label: 'Certifications', query: 'What certifications do you hold?' },
  quality: { label: 'Quality control', query: 'How do you control quality?' },
  process: { label: 'How it is made', query: 'How is the fibre made?' },
  capacity: { label: 'Capacity', query: 'What is your annual production capacity?' },
  company: { label: 'The company', query: 'Who are you?' },
  recycled: { label: 'Recycled content', query: 'How is recycled content verified?' },
  shipping: { label: 'Packing & shipping', query: 'How is material packed and shipped?' },
  terms: { label: 'Commercial terms', query: 'What are your commercial terms?' },
  samples: { label: 'Samples', query: 'Can I request samples?' },
  quote: { label: 'Get a quote', query: 'How do I request a quote?' },
  gallery: { label: 'Gallery', query: 'Show me the gallery' },
  more: { label: 'More about us', query: 'Give me a full company overview' },
} satisfies Record<string, ChatSuggestion>

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: 'products',
    keywords: [
      'product', 'products', 'catalogue', 'catalog', 'range', 'fibre', 'fiber',
      'psf', 'staple', 'wadding', 'felt', 'nonwoven', 'non-woven', 'non woven',
      'interlining', 'lining', 'fusing', 'wadding', 'infill', 'material', 'materials',
      'what do you make', 'what do you sell', 'offer',
    ],
    answer: () =>
      `We manufacture five verified product lines: ${lineList}. The staple fibre range spans ${VERIFIED.denierRange}, from fine-count spinning to ultra-coarse industrial batting. Tap a card for the line's verified attributes.`,
    cards: PRODUCT_CARDS,
    suggestions: [CHIP.compare, CHIP.specs, CHIP.certifications, CHIP.quote],
    action: { text: 'Browse the product pages', href: '/products' },
  },
  {
    id: 'specs',
    keywords: [
      'denier', 'd', 'count', 'cut length', 'length', 'crimp', 'luster', 'lustre',
      'spec', 'specification', 'tenacity', 'elongation', 'grade', 'technical',
      'data sheet', 'tds', 'micron',
    ],
    answer: () =>
      `The verified denier spectrum is ${VERIFIED.denierRange}. Cut length, crimp frequency, finish and mechanical properties are set by the order rather than published from a standing table - per-grade technical data sheets are not yet in our published record, so send your specification and we will answer against it directly.`,
    cards: [SPEC_CARD],
    suggestions: [CHIP.products, CHIP.compare, CHIP.samples, CHIP.quote],
    action: { text: 'See the product lines', href: '/products' },
  },
  {
    id: 'compare',
    keywords: [
      'compare', 'comparison', 'difference', 'differences', 'versus', ' vs ',
      'which product', 'which one', 'better', 'recycled or prime',
      'regenerated or prime',
    ],
    answer: () =>
      'The comparison the record supports is recycled versus prime staple fibre: both span the full 1.2D-60D range and both run the same four-stage sequence - they differ in feedstock and in what you can claim downstream. GRS chain of custody applies to the regenerated line; prime-polymer processing behaviour and colour consistency are why the prime line is specified. Deeper comparisons between specific grades are order questions, so they go to the enquiry desk rather than being improvised here.',
    cards: COMPARE_CARDS,
    suggestions: [CHIP.recycled, CHIP.specs, CHIP.recommend, CHIP.quote],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
  {
    id: 'samples',
    keywords: [
      'sample', 'samples', 'swatch', 'swatches', 'cone', 'lab', 'test',
      'trial', 'prototype',
    ],
    answer: () =>
      'Sample and swatch requests are handled through the same route as quotations: the enquiry form on the contact page. Send your denier, cut length and destination there and the request reaches the desk that can act on it.',
    suggestions: [CHIP.specs, CHIP.products, CHIP.certifications, CHIP.quote],
    action: { text: 'Request a sample', href: '/contact' },
  },
  {
    id: 'certifications',
    keywords: [
      'cert', 'certs', 'certificate', 'certification', 'iso', 'grs', 'oeko',
      'oeko-tex', 'standard 100', 'lcci', 'audit', 'compliance', 'accredited',
    ],
    answer: () =>
      `Five official registrations and environmental approvals are held: ${CERTIFICATION_DETAIL.map((c) => c.code).join(', ')}. ISO 9001:2015 governs process control and export quality, GRS 4.0 verifies recycled content and chain of custody, OEKO-TEX Standard 100 covers harmful-substance testing (Class I baby articles), EPA Punjab grants operational environmental approval for PET recycling, and LCCI is our registered trade-body membership.`,
    cards: CERT_CARDS,
    suggestions: [CHIP.recycled, CHIP.quality, CHIP.samples, CHIP.quote],
    action: { text: 'See quality and compliance', href: '/quality' },
  },
  {
    id: 'sustainability',
    keywords: [
      'recycl', 'grs', 'pet', 'bottle', 'green', 'sustain', 'environment',
      'eco', 'carbon', 'circular', 'post-consumer', 'closed loop',
    ],
    answer: () =>
      `Regenerated staple fibre is produced from ${VERIFIED.recycledInput}, tracked under Global Recycled Standard chain of custody - so a recycled-content claim on your product can be substantiated on ours. The transformation runs through the same four production stages as the rest of the line.`,
    suggestions: [CHIP.certifications, CHIP.process, CHIP.compare, CHIP.quote],
    action: { text: 'See the sustainability page', href: '/sustainability' },
  },
  {
    id: 'capacity',
    keywords: [
      'capacity', 'tonnage', 'tons', 'tonnes', 'how much', 'production',
      'output', 'volume', 'per year', 'annually', 'annual', '15,000', '15000',
    ],
    answer: () =>
      `Annual production capacity is ${VERIFIED.annualCapacity}. For context: ${VERIFIED.customers} customers served, a workforce of ${VERIFIED.workforce}, and ${VERIFIED.yearsInBusiness} in business since ${VERIFIED.established}.`,
    suggestions: [CHIP.company, CHIP.process, CHIP.products, CHIP.quote],
    action: { text: 'See the company page', href: '/company' },
  },
  {
    id: 'company',
    keywords: [
      'who are you', 'company', 'about', 'history', 'established', 'founded',
      'gulf fibre', 'employees', 'workforce', 'people', 'customers', 'clients',
      'where are you', 'location', 'pakistan',
    ],
    answer: () =>
      `${VERIFIED.legalName} has manufactured polyester fibre in ${VERIFIED.country} since ${VERIFIED.established} - ${VERIFIED.yearsInBusiness} in business, ${VERIFIED.annualCapacity} of annual capacity, ${VERIFIED.customers} customers served and a workforce of ${VERIFIED.workforce}.`,
    suggestions: [CHIP.products, CHIP.certifications, CHIP.capacity, CHIP.gallery],
    action: { text: 'See the company page', href: '/company' },
  },
  {
    id: 'process',
    keywords: [
      'how', 'made', 'make', 'process', 'production', 'extrusion', 'spinneret',
      'melt', 'crimping', 'cutting', 'baling', 'flake', 'sorting', 'quenching',
      'manufacturing', 'line',
    ],
    answer: () =>
      `Production runs in four stages: ${PROCESS_STAGES.map((s) => s.title.toLowerCase()).join('; ')}. The full sequence is published on the homepage and the services page.`,
    suggestions: [CHIP.quality, CHIP.shipping, CHIP.capacity, CHIP.recycled],
    action: { text: 'See the services page', href: '/services' },
  },
  {
    id: 'quality',
    keywords: [
      'quality', 'qa', 'control', 'test', 'testing', 'lab', 'coa', 'analysis',
      'verify', 'verified', 'tolerance', 'inspection',
    ],
    answer: () =>
      'Verification sits where the outcome is still recoverable: incoming feedstock control before the melt, tensile analysis at the fibre, moisture verification before baling, and a Certificate of Analysis per consignment so the receiving mill can reconcile delivered material against the agreed specification.',
    suggestions: [CHIP.certifications, CHIP.samples, CHIP.specs, CHIP.quote],
    action: { text: 'See quality and compliance', href: '/quality' },
  },
  {
    id: 'packing',
    keywords: [
      'pack', 'packing', 'packaging', 'bale', 'bales', '280', 'wrap',
      'roll', 'pallet', 'ship', 'shipping', 'shipment', 'export', 'logistics',
      'container', 'port', 'freight', 'delivery',
    ],
    answer: () =>
      `Packing and export are handled in-house: ${COMMERCIAL_TERMS.map((t) => `${t.label.toLowerCase()} - ${t.value.toLowerCase()}`).join('; ')}. Specific transit times, ports and Incoterms are agreed per order rather than published here - the enquiry desk will confirm them against your destination.`,
    suggestions: [CHIP.terms, CHIP.quote, CHIP.products, CHIP.quality],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
  {
    id: 'quote',
    keywords: [
      'quote', 'quotation', 'price', 'pricing', 'cost', 'rfq', 'order',
      'buy', 'purchase', 'moq', 'minimum', 'lead time', 'contact', 'email',
      'phone', 'call', 'reach', 'enquiry', 'inquiry',
    ],
    answer: () =>
      `Quotations run through the enquiry form on the contact page. Denier, cut length, volume and destination are enough for a firm answer on feasibility - and if we are not the right plant for your count, we will say so rather than quote for the sake of it.`,
    suggestions: [CHIP.specs, CHIP.shipping, CHIP.terms, CHIP.samples],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
  {
    id: 'terms',
    keywords: [
      'terms', 'conditions', 'incoterm', 'fob', 'cif', 'fob', 'payment',
      'commercial',
    ],
    answer: () =>
      `Published commercial terms: ${COMMERCIAL_TERMS.map((t) => `${t.label} - ${t.value}`).join('; ')}. Incoterms, payment terms and destination-specific arrangements are confirmed per order through the enquiry desk.`,
    suggestions: [CHIP.shipping, CHIP.quote, CHIP.products, CHIP.capacity],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
  {
    id: 'recommend',
    keywords: [
      'which product', 'what product', 'recommend', 'recommendation', 'suggest',
      'suitable for', 'right fibre', 'right fiber', 'right product', 'best product',
      'need fibre for', 'need fiber for', 'use for', 'used for',
      'bedding', 'quilt', 'quilts', 'duvet', 'pillow', 'pillows', 'mattress',
      'furniture', 'upholstery', 'upholstered', 'sofa', 'cushion', 'insulation',
      'apparel', 'outerwear', 'jacket', 'spinning', 'yarn', 'automotive',
      'acoustic', 'sound', 'filtration', 'filter', 'geotextile', 'tailoring',
      'garment', 'interlining', 'fusing', 'bag', 'luggage', 'what should i use',
    ],
    answer: (message = '') => {
      /* Match the visitor's words against the verified application list of
         each line - the recommendation is only ever a line whose published
         appliedIn actually covers the use case. */
      const text = message.toLowerCase()
      const APPLICATION_HINTS: { words: string[]; lineIds: string[] }[] = [
        { words: ['quilt', 'duvet', 'pillow', 'bedding', 'mattress', 'comforter'], lineIds: ['wadding'] },
        { words: ['furniture', 'upholster', 'sofa', 'cushion'], lineIds: ['wadding'] },
        { words: ['insulat', 'apparel', 'outerwear', 'jacket'], lineIds: ['wadding'] },
        { words: ['spinning', 'yarn', 'mill', 'ring'], lineIds: ['psf-regenerated', 'psf-virgin'] },
        { words: ['automotive', 'acoustic', 'sound', 'vehicle', 'headliner'], lineIds: ['felt'] },
        { words: ['filtration', 'filter'], lineIds: ['felt'] },
        { words: ['tailor', 'collar', 'waistband', 'formalwear', 'garment'], lineIds: ['interlining'] },
        { words: ['bag', 'case', 'luggage'], lineIds: ['interlining'] },
        { words: ['recycled', 'sustainable', 'grs'], lineIds: ['psf-regenerated'] },
      ]
      const matched = new Set<string>()
      for (const hint of APPLICATION_HINTS) {
        if (hint.words.some((w) => text.includes(w))) hint.lineIds.forEach((id) => matched.add(id))
      }

      if (matched.size > 0) {
        const lines = PRODUCT_LINES.filter((p) => matched.has(p.id))
        return `Based on the published record, ${lines
          .map((p) => `the ${p.title} (${p.code}) - applied in ${p.appliedIn.map((a) => a.toLowerCase()).join(', ')}`)
          .join('; and ')}. Order-specific suitability still depends on your specification - the enquiry desk confirms it against your process.`
      }
      return `Tell me the application and I will point at the right line. From the published record: ${PRODUCT_LINES.map(
        (p) => `${p.title} (${p.code}) is applied in ${p.appliedIn.map((a) => a.toLowerCase()).join(', ')}`
      ).join('; ')}.`
    },
    cards: PRODUCT_CARDS,
    suggestions: [CHIP.compare, CHIP.specs, CHIP.samples, CHIP.quote],
    action: { text: 'See the product lines', href: '/products' },
  },
  {
    id: 'gallery',
    keywords: [
      'gallery', 'photo', 'photos', 'photograph', 'photographs', 'picture',
      'pictures', 'image', 'images', 'archive', 'factory tour', 'see the plant',
      'see the factory', 'show me the', 'visual',
    ],
    answer: () =>
      `The visual archive holds ${GALLERY_ITEMS.length} entries across ${GALLERY_CATEGORIES.length - 1} categories - ${GALLERY_CATEGORIES.slice(1)
        .map((c) => c.label.toLowerCase())
        .join(', ')}. It shows only photographs that exist in the company record; where one is outstanding, the frame says so rather than standing in a stock image.`,
    cards: [
      {
        code: 'ARCHIVE',
        title: 'The visual archive',
        rows: GALLERY_CATEGORIES.slice(1).map((c) => ({
          label: c.label,
          value: `${GALLERY_ITEMS.filter((i) => i.category === c.id).length} entries`,
        })),
        href: '/gallery',
      },
    ],
    suggestions: [CHIP.products, CHIP.company, CHIP.process, CHIP.quote],
    action: { text: 'Open the archive', href: '/gallery' },
  },
  {
    id: 'overview',
    keywords: [
      'other', 'others', 'other options', 'anything else', 'what else',
      'overview', 'company overview', 'full company', 'whole company',
      'company profile', 'company record', 'general information',
      'more about the company', 'more information about the company',
      'tell me everything', 'everything about', 'introduce yourself',
      'company introduction', 'brief me', 'full picture', 'at a glance',
    ],
    answer: () =>
      `${VERIFIED.legalName} has manufactured polyester fibre in ${VERIFIED.country} since ${VERIFIED.established} - ${VERIFIED.yearsInBusiness} years in business, ${VERIFIED.annualCapacity} of annual capacity, ${VERIFIED.customers} customers served and a workforce of ${VERIFIED.workforce}. ${PRODUCT_LINES.length} product lines run across the ${VERIFIED.denierRange} denier range through four production stages - ${PROCESS_STAGES.map(
        (s) => s.title.toLowerCase()
      ).join('; ')} - with ${VERIFIED.certificationCount} registrations covering quality management, recycled content and harmful-substance testing. In-house capability covers ${SERVICE_CAPABILITIES.map(
        (c) => c.title.toLowerCase()
      ).join(', ')}. The three cards below are the published record; pick a button for any part of it in detail.`,
    cards: OVERVIEW_CARDS,
    suggestions: [CHIP.products, CHIP.process, CHIP.certifications, CHIP.recycled, CHIP.gallery, CHIP.quote],
    action: { text: 'See the company page', href: '/company' },
  },
  {
    id: 'greeting',
    keywords: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'salam', 'assalam', 'yo', 'greetings',
    ],
    answer: () =>
      'Hello. Ask about product lines, the denier range, certifications, the production sequence, capacity or commercial terms - everything I answer comes from the company record.',
    suggestions: [CHIP.products, CHIP.certifications, CHIP.process, CHIP.quote],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'shukriya', 'great', 'perfect', 'ok', 'okay'],
    answer: () =>
      'Glad to help. If you want a firm answer on your own specification, the enquiry form is the fastest route to the desk that can give it.',
    suggestions: [CHIP.quote, CHIP.products],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
]

export const FALLBACK_ANSWER =
  'That one is outside the published company record, so I will not guess. Product lines, the 1.2D - 60D denier range, certifications, capacity, the production sequence and commercial terms I can answer - anything else goes to the enquiry desk.'

export const FALLBACK_SUGGESTIONS: ChatSuggestion[] = [
  CHIP.products,
  CHIP.certifications,
  CHIP.process,
  CHIP.more,
  CHIP.quote,
]

export const FALLBACK_ACTION: ChatAction = { text: 'Open the enquiry form', href: '/contact' }

/** Starter chips shown in the empty conversation state. */
export const STARTER_SUGGESTIONS: ChatSuggestion[] = [
  CHIP.products,
  CHIP.certifications,
  CHIP.process,
  CHIP.recommend,
  CHIP.more,
  CHIP.quote,
]

/**
 * Score every intent against the message and return the best match.
 * Scoring: number of keyword hits, longer keywords break ties (a phrase match
 * like "cut length" says more than a bare "d"). Single-letter and very short
 * keywords are ignored unless nothing longer matched, to stop "d" (denier)
 * hijacking ordinary words.
 */
export function matchIntent(message: string): ChatIntent | null {
  const text = ` ${message.toLowerCase().replace(/[^\p{L}\p{N}\s.,-]/gu, ' ')} `
  let best: ChatIntent | null = null
  let bestScore = 0

  for (const intent of CHAT_INTENTS) {
    let score = 0
    for (const kw of intent.keywords) {
      if (text.includes(` ${kw} `) || text.includes(`${kw} `) || text.includes(` ${kw}`) || text.trim() === kw) {
        score += kw.includes(' ') ? kw.length : Math.min(kw.length, 4)
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }

  if (bestScore <= 0) return null
  // A bare short keyword ("d", "ok") only wins if it is the entire message.
  if (bestScore <= 4 && text.trim().length > 5) {
    const longEnough = best?.keywords.some(
      (kw) => kw.length > 4 && text.includes(kw)
    )
    if (!longEnough) return null
  }
  return best
}

/* ===========================================================================
   PAGE-AWARE OPENINGS
   ---------------------------------------------------------------------------
   The assistant is mounted per page (app/page.tsx and PageShell), so it opens
   fresh on every route. Each route gets its own opening line and a set of
   starter chips relevant to what the visitor is looking at; the landing page
   keeps the general, company-wide opening. Every chip query below maps to an
   existing intent above, so the answers stay inside the verified record - there
   is nothing new to keep in sync when the knowledge base changes.
   =========================================================================== */

export interface PageContext {
  /** Short topic label shown in the panel header, e.g. "Products". */
  topic: string
  /** The launcher tooltip for this route - one short line. */
  nudge: string
  /** The assistant's opening line: compact, factual, no more than two sentences. */
  greeting: string
  /** Quick-action buttons shown beneath the opening line. */
  suggestions: ChatSuggestion[]
}

const galleryCategoryCount = GALLERY_CATEGORIES.length - 1
const stageList = PROCESS_STAGES.map((s) => s.title.toLowerCase()).join(' → ')
const certCodes = CERTIFICATION_DETAIL.map((c) => c.code).join(', ')

/** Route -> page-aware opening. '/' is the general fallback. */
export const PAGE_CONTEXTS: Record<string, PageContext> = {
  '/': {
    topic: 'General enquiries',
    nudge: 'Questions about Gulf Fibre? Ask me.',
    greeting: GREETING_ANSWER,
    suggestions: STARTER_SUGGESTIONS,
  },
  '/products': {
    topic: 'Products',
    greeting: `Five verified lines — staple fibre, hollow fibre, wadding, felt and interlinings — across the ${VERIFIED.denierRange} denier range. Ask about any line, or how they compare.`,
    nudge: 'Need help choosing a fibre line?',
    suggestions: [CHIP.compare, CHIP.specs, CHIP.recommend, CHIP.samples, CHIP.more, CHIP.quote],
  },
  '/services': {
    topic: 'Process & services',
    nudge: 'Ask about the production sequence.',
    greeting: `Production runs in four stages: ${stageList}. Ask about any stage, quality control, or packing and export.`,
    suggestions: [CHIP.process, CHIP.quality, CHIP.shipping, CHIP.capacity, CHIP.more, CHIP.quote],
  },
  '/company': {
    topic: 'The company',
    nudge: 'Ask about the company record.',
    greeting: `${VERIFIED.legalName} — polyester fibre in ${VERIFIED.country} since ${VERIFIED.established}. ${VERIFIED.annualCapacity} annual capacity, ${VERIFIED.customers} customers, a workforce of ${VERIFIED.workforce}.`,
    suggestions: [CHIP.capacity, CHIP.products, CHIP.certifications, CHIP.gallery, CHIP.more, CHIP.quote],
  },
  '/sustainability': {
    topic: 'Sustainability',
    nudge: 'Ask how recycled content is verified.',
    greeting: `Regenerated fibre is produced from ${VERIFIED.recycledInput}, tracked under Global Recycled Standard chain of custody — so your recycled-content claim can be substantiated on ours.`,
    suggestions: [CHIP.recycled, CHIP.certifications, CHIP.compare, CHIP.products, CHIP.more, CHIP.quote],
  },
  '/quality': {
    topic: 'Quality & compliance',
    nudge: 'Ask about certifications and testing.',
    greeting: `Registrations held: ${certCodes}. Verification runs at incoming feedstock, at the fibre and before baling, with a Certificate of Analysis per consignment.`,
    suggestions: [CHIP.certifications, CHIP.quality, CHIP.samples, CHIP.recycled, CHIP.more, CHIP.quote],
  },
  '/gallery': {
    topic: 'Visual archive',
    nudge: 'Ask about the plant or the process.',
    greeting: `${GALLERY_ITEMS.length} photographs across ${galleryCategoryCount} categories, all from the company record. Ask about the plant, the process or the product lines.`,
    suggestions: [CHIP.process, CHIP.products, CHIP.company, CHIP.certifications, CHIP.more, CHIP.quote],
  },
  '/contact': {
    topic: 'Enquiries',
    nudge: 'Not sure what to send? Ask me first.',
    greeting: 'Denier, cut length, volume and destination are enough for a firm answer on feasibility. Ask me anything before you send the form.',
    suggestions: [CHIP.quote, CHIP.specs, CHIP.samples, CHIP.shipping, CHIP.terms, CHIP.more],
  },
}

/** Page-aware opening for a route, falling back to the landing page. */
export function pageContext(pathname: string | null): PageContext {
  if (!pathname) return PAGE_CONTEXTS['/']
  return PAGE_CONTEXTS[pathname] ?? PAGE_CONTEXTS['/']
}
