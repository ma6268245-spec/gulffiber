import {
  CERTIFICATION_DETAIL,
  COMMERCIAL_TERMS,
  PRODUCT_LINES,
  PROCESS_STAGES,
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

export const GREETING_ANSWER = `Hello. I am the Gulf Fibre assistant. I can answer from the company's published record - product lines, the ${VERIFIED.denierRange} denier range, certifications, the production sequence and commercial terms. What do you need?`

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
    suggestions: [
      { label: 'Compare recycled vs virgin fibre', query: 'Compare recycled and virgin staple fibre' },
      { label: 'Tell me about certifications', query: 'What certifications do you hold?' },
    ],
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
    suggestions: [
      { label: 'Send a specification', query: 'How do I request a quote?' },
      { label: 'See the product lines', query: 'What products do you make?' },
    ],
    action: { text: 'See the product lines', href: '/products' },
  },
  {
    id: 'compare',
    keywords: [
      'compare', 'comparison', 'difference', 'differences', 'versus', ' vs ',
      'which product', 'which one', 'better', 'recycled or virgin',
      'regenerated or virgin',
    ],
    answer: () =>
      'The comparison the record supports is recycled versus virgin staple fibre: both span the full 1.2D-60D range and both run the same four-stage sequence - they differ in feedstock and in what you can claim downstream. GRS chain of custody applies to the regenerated line; prime-polymer processing behaviour and colour consistency are why the virgin line is specified. Deeper comparisons between specific grades are order questions, so they go to the enquiry desk rather than being improvised here.',
    cards: COMPARE_CARDS,
    suggestions: [
      { label: 'How is recycled content verified?', query: 'How is recycled content verified?' },
      { label: 'Open the enquiry form', query: 'How do I request a quote?' },
    ],
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
    suggestions: [
      { label: 'Open the enquiry form', query: 'How do I request a quote?' },
      { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
    ],
    action: { text: 'Request a sample', href: '/contact' },
  },
  {
    id: 'certifications',
    keywords: [
      'cert', 'certs', 'certificate', 'certification', 'iso', 'grs', 'oeko',
      'oeko-tex', 'standard 100', 'lcci', 'audit', 'compliance', 'accredited',
    ],
    answer: () =>
      `Four registrations are held: ${CERTIFICATION_DETAIL.map((c) => c.code).join(', ')}. ISO 9001:2015 governs process control and traceability, GRS verifies recycled content and chain of custody, OEKO-TEX Standard 100 covers harmful-substance testing, and LCCI is a trade-body membership. Certificate documents are supplied against request through the contact desk.`,
    cards: CERT_CARDS,
    suggestions: [
      { label: 'How is recycled content verified?', query: 'How is recycled content verified?' },
      { label: 'How do you control quality?', query: 'How do you control quality?' },
    ],
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
    suggestions: [
      { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
      { label: 'How is the fibre made?', query: 'How is the fibre made?' },
    ],
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
    suggestions: [
      { label: 'Tell me about the company', query: 'Who are you?' },
      { label: 'How is the fibre made?', query: 'How is the fibre made?' },
    ],
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
    suggestions: [
      { label: 'What products do you make?', query: 'What products do you make?' },
      { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
    ],
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
    suggestions: [
      { label: 'How is quality controlled?', query: 'How do you control quality?' },
      { label: 'How does material ship?', query: 'How is material packed and shipped?' },
    ],
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
    suggestions: [
      { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
      { label: 'Request a sample', query: 'Can I request samples?' },
    ],
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
    suggestions: [
      { label: 'Open the enquiry form', query: 'How do I request a quote?' },
      { label: 'What are your commercial terms?', query: 'What are your commercial terms?' },
    ],
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
    suggestions: [
      { label: 'What products do you make?', query: 'What products do you make?' },
      { label: 'How is material packed and shipped?', query: 'How is material packed and shipped?' },
    ],
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
    suggestions: [
      { label: 'Open the enquiry form', query: 'How do I request a quote?' },
      { label: 'What products do you make?', query: 'What products do you make?' },
    ],
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
    suggestions: [
      { label: 'Compare recycled vs virgin PSF', query: 'Compare recycled and virgin PSF' },
      { label: 'Open the enquiry form', query: 'How do I request a quote?' },
    ],
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
    suggestions: [
      { label: 'What products do you make?', query: 'What products do you make?' },
      { label: 'Tell me about the company', query: 'Who are you?' },
    ],
    action: { text: 'Open the archive', href: '/gallery' },
  },
  {
    id: 'greeting',
    keywords: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'salam', 'assalam', 'yo', 'greetings',
    ],
    answer: () =>
      'Hello. Ask me about product lines, the denier range, certifications, the production sequence, capacity or commercial terms - everything I answer comes from the company record.',
    suggestions: [
      { label: 'What products do you make?', query: 'What products do you make?' },
      { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
      { label: 'How do I request a quote?', query: 'How do I request a quote?' },
    ],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'shukriya', 'great', 'perfect', 'ok', 'okay'],
    answer: () =>
      'Glad to help. If you want a firm answer on your own specification, the enquiry form is the fastest route to the desk that can give it.',
    suggestions: [{ label: 'Open the enquiry form', query: 'How do I request a quote?' }],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
]

export const FALLBACK_ANSWER =
  'That one is outside the published company record, so I will not guess. Product lines, the 1.2D - 60D denier range, certifications, capacity, the production sequence and commercial terms I can answer - anything else goes to the enquiry desk.'

export const FALLBACK_SUGGESTIONS: ChatSuggestion[] = [
  { label: 'What products do you make?', query: 'What products do you make?' },
  { label: 'What certifications do you hold?', query: 'What certifications do you hold?' },
  { label: 'Open the enquiry form', query: 'How do I request a quote?' },
]

export const FALLBACK_ACTION: ChatAction = { text: 'Open the enquiry form', href: '/contact' }

/** Starter chips shown in the empty conversation state. */
export const STARTER_SUGGESTIONS: ChatSuggestion[] = [
  { label: 'What products do you make?', query: 'What products do you make?' },
  { label: 'Which fibre for bedding?', query: 'What product should I use for bedding?' },
  { label: 'Show me the archive', query: 'Show me the gallery' },
  { label: 'How do I request a quote?', query: 'How do I request a quote?' },
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
