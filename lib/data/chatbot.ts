import {
  CERTIFICATION_DETAIL,
  COMMERCIAL_TERMS,
  ORG_TREE_DATA,
  PRODUCT_LINES,
  PROCESS_STAGES,
  SERVICE_CAPABILITIES,
  VERIFIED,
  type OrgNode,
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
  /** `group: 'contact'` marks the handler rows, ruled off from the specs above. */
  rows: { label: string; value: string; group?: 'contact' }[]
  href?: string
  /** A direct dial, rendered as a tappable action on the card. */
  tel?: string
  /** A mailbox, rendered the same way. */
  mail?: string
  /** A person, not a product: the title is a name, so it keeps its own casing. */
  kind?: 'desk'
}

export interface ChatIntent {
  id: string
  /** Keywords scored against the visitor's message; weight = match count. */
  keywords: string[]
  /** Receives the visitor's message so discovery intents can react to it. */
  answer: (message?: string) => string
  /**
   * Optional product / specification cards attached to the answer. A function
   * receives the visitor's message, so an intent can show the one desk or line
   * that was actually asked about instead of the whole list.
   */
  cards?: ChatCard[] | ((message?: string) => ChatCard[])
  suggestions?: ChatSuggestion[]
  action?: ChatAction
}

/** Resolve an intent's cards for one message, whether static or derived. */
export function intentCards(intent: ChatIntent | null, message: string): ChatCard[] | undefined {
  if (!intent?.cards) return undefined
  return typeof intent.cards === 'function' ? intent.cards(message) : intent.cards
}

const lineList = PRODUCT_LINES.map((p) => `${p.title} (${p.code})`).join(', ')

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

export const GREETING_ANSWER = `I am the Gulf Fiber assistant. Ask about our product lines, the ${VERIFIED.denierRange} denier range, certifications, the production sequence or commercial terms.`

/* ===========================================================================
   CONTACT DIRECTORY & PRODUCT → SALES DESK ROUTING
   ---------------------------------------------------------------------------
   Every name, role and direct line below is read from ORG_TREE_DATA - the same
   record the company page publishes - so there is no second copy of anyone's
   number to keep in step. SALES_DESKS is the only new fact: which desk owns
   which product line. It is stated once here and drives every contact answer,
   so an enquiry about wadding reaches the person who actually handles wadding
   instead of a general mailbox.

   The general channels are the ones the site's own enquiry emails already send
   from; nothing here invents a channel that is not in use.
   =========================================================================== */

export const GENERAL_CONTACT = {
  mailbox: 'gulffiber@gmail.com',
  line: '+92 52 111 505 505',
  /** Digits only, for a tel: href. */
  lineDial: '+9252111505505',
} as const

/** Which commercial desk owns which PRODUCT_LINES entries. */
const SALES_DESKS: { orgId: string; lineIds: string[] }[] = [
  { orgId: 'org-sales-staple', lineIds: ['psf-regenerated', 'psf-virgin'] },
  { orgId: 'org-sales-wadding', lineIds: ['wadding', 'interlining'] },
  { orgId: 'org-sales-felts', lineIds: ['felt'] },
]

const orgMember = (id: string): OrgNode | undefined => ORG_TREE_DATA.find((n) => n.id === id)

/** The desk that owns a product line, with the lines it covers. */
const deskForLine = (lineId: string) => {
  const desk = SALES_DESKS.find((d) => d.lineIds.includes(lineId))
  const person = desk ? orgMember(desk.orgId) : undefined
  return desk && person ? { person, lineIds: desk.lineIds } : null
}

const lineTitle = (id: string) => PRODUCT_LINES.find((p) => p.id === id)?.title ?? id

/** Strip a printed number down to something a tel: href accepts. */
const dial = (n: string) => n.replace(/[^\d+]/g, '')

const deskCard = (person: OrgNode, lineIds: string[]): ChatCard => ({
  code: person.department,
  title: person.name,
  kind: 'desk',
  rows: [
    { label: 'Role', value: person.role },
    { label: 'Handles', value: lineIds.map(lineTitle).join(' · ') },
    ...(person.contact ? [{ label: 'Direct line', value: person.contact }] : []),
  ],
  tel: person.contact ? dial(person.contact) : undefined,
})

/** Every product desk, in the order the lines are published. */
const DESK_CARDS: ChatCard[] = SALES_DESKS.flatMap((d) => {
  const person = orgMember(d.orgId)
  return person ? [deskCard(person, d.lineIds)] : []
})

/* Export and shipping sits outside the product desks, so it is named separately
   rather than folded into one of them. */
const EXPORT_CARD: ChatCard[] = (() => {
  const person = orgMember('org-export-manager')
  if (!person) return []
  return [
    {
      code: person.department,
      title: person.name,
      kind: 'desk',
      rows: [
        { label: 'Role', value: person.role },
        { label: 'Handles', value: 'Export consignments, documentation and customs clearance' },
        ...(person.contact ? [{ label: 'Direct line', value: person.contact }] : []),
      ],
      tel: person.contact ? dial(person.contact) : undefined,
    },
  ]
})()

const GENERAL_CARD: ChatCard = {
  code: 'ENQUIRY DESK',
  title: 'General enquiries',
  kind: 'desk',
  rows: [
    { label: 'Email', value: GENERAL_CONTACT.mailbox },
    { label: 'Telephone', value: GENERAL_CONTACT.line },
    { label: 'Written enquiry', value: 'Enquiry form on the contact page' },
  ],
  tel: GENERAL_CONTACT.lineDial,
  mail: GENERAL_CONTACT.mailbox,
}

/** The whole directory: product desks, then export, then the general channels. */
const CONTACT_CARDS: ChatCard[] = [...DESK_CARDS, ...EXPORT_CARD, GENERAL_CARD]

/* ---------------------------------------------------------------------------
   PRODUCT CARDS
   ---------------------------------------------------------------------------
   Built here, below the desks, because every product card closes with the person
   who handles that line: ask about staple fibre and Ehsan Afzal's direct dial
   arrives under the specification, so the answer and the way to act on it are
   never two separate lookups.
   --------------------------------------------------------------------------- */

const productCard = (lineId: string): ChatCard => {
  const p = PRODUCT_LINES.find((l) => l.id === lineId)!
  const desk = deskForLine(lineId)
  return {
    code: p.code,
    title: p.title,
    rows: [
      ...p.verifiedAttributes.map((a) => ({ label: a.label, value: a.value })),
      ...(desk
        ? [
            { label: 'Handled by', value: desk.person.name, group: 'contact' as const },
            ...(desk.person.contact
              ? [{ label: 'Direct line', value: desk.person.contact, group: 'contact' as const }]
              : []),
          ]
        : []),
    ],
    href: `/products#${p.id}`,
    tel: desk?.person.contact ? dial(desk.person.contact) : undefined,
  }
}

/** One card per product line: verified attributes, then the desk that owns it. */
const PRODUCT_CARDS: ChatCard[] = PRODUCT_LINES.map((p) => productCard(p.id))

const COMPARE_CARDS: ChatCard[] = ['psf-regenerated', 'psf-virgin'].map(productCard)

/* ---------------------------------------------------------------------------
   WHICH LINE IS THE VISITOR ASKING ABOUT
   ---------------------------------------------------------------------------
   Two passes: the material itself (the line's own name, code and trade words),
   then the application it is used for. Both feed the contact routing and the
   recommendation intent, so "who handles wadding" and "who do I call about
   quilts" land on the same desk.
   --------------------------------------------------------------------------- */

/** Application words → the lines whose published appliedIn covers them. */
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

/** Material words → the line named. Codes and titles are read from the record. */
const MATERIAL_HINTS: { words: string[]; lineIds: string[] }[] = [
  { words: ['staple', 'psf-r', 'regenerated staple'], lineIds: ['psf-regenerated'] },
  { words: ['hollow', 'conjugate', 'siliconi', 'psf-h', 'infill'], lineIds: ['psf-virgin'] },
  { words: ['wadding', 'wad ', 'padding', 'high-loft', 'high loft'], lineIds: ['wadding'] },
  { words: ['felt', 'needle', 'nonwoven', 'non-woven', 'non woven', 'geotextile'], lineIds: ['felt'] },
  { words: ['interlining', 'lining', 'fusible', 'fusing', 'fusion paper', 'stitch bond', 'stitch-bond'], lineIds: ['interlining'] },
]

/** Product line ids the message points at, material first then application. */
function detectLineIds(message: string): string[] {
  const text = ` ${message.toLowerCase()} `
  const found = new Set<string>()
  for (const group of [MATERIAL_HINTS, APPLICATION_HINTS]) {
    for (const hint of group) {
      if (hint.words.some((w) => text.includes(w))) hint.lineIds.forEach((id) => found.add(id))
    }
  }
  /* The published codes are unambiguous, so match them directly too. */
  for (const p of PRODUCT_LINES) {
    if (text.includes(p.code.toLowerCase())) found.add(p.id)
  }
  return PRODUCT_LINES.filter((p) => found.has(p.id)).map((p) => p.id)
}

/** The desks owning these lines, each named once even if it owns several. */
function desksForLines(lineIds: string[]) {
  const seen = new Map<string, { person: OrgNode; lineIds: string[]; asked: string[] }>()
  for (const id of lineIds) {
    const desk = deskForLine(id)
    if (!desk) continue
    const entry = seen.get(desk.person.id)
    if (entry) entry.asked.push(id)
    else seen.set(desk.person.id, { person: desk.person, lineIds: desk.lineIds, asked: [id] })
  }
  return [...seen.values()]
}

/** "Ehsan Afzal (Technical Sales Lead - ...) on +92 ..." for one desk. */
const deskSentence = (person: OrgNode) =>
  `${person.name} (${person.role})${person.contact ? ` on ${person.contact}` : ''}`

/** "Ehsan Afzal for staple and hollow fibre; ..." across every product desk. */
const DESK_SUMMARY = DESK_CARDS.map((c, i) => {
  const person = orgMember(SALES_DESKS[i].orgId)!
  return `${person.name} for ${person.department.toLowerCase()}`
}).join('; ')


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
  contacts: { label: 'Contacts', query: 'Contact details for your sales desks' },
  whoHandles: { label: 'Who handles my line', query: 'Who handles my product line?' },
  more: { label: 'More about us', query: 'Give me a full company overview' },
} satisfies Record<string, ChatSuggestion>

export const CHAT_INTENTS: ChatIntent[] = [
  {
    /* Placed first so that when a message names both a contact and a product
       ("contact for felt"), the tie resolves to the desk answer - which names
       the product anyway - rather than to the general product list. */
    id: 'contacts',
    keywords: [
      'contact', 'contacts', 'contact details', 'contact detail', 'contact number',
      'contact info', 'contact information', 'contact for', 'contact person',
      'phone', 'phone number', 'mobile number', 'telephone', 'direct line',
      'email', 'e-mail', 'email address', 'mailbox',
      'who handles', 'who deals', 'who is handling', 'who looks after',
      'who to contact', 'whom to contact', 'who do i contact', 'who should i',
      'who do i', 'who can i', 'person handling',
      'should i contact', 'get in touch', 'in touch', 'speak to', 'speak with',
      'talk to', 'sales team', 'sales contact', 'salesperson', 'representative',
      'reach you', 'reach out', 'directory', 'dealing with',
    ],
    answer: (message = '') => {
      const desks = desksForLines(detectLineIds(message))

      /* A named line gets one person, not a directory. */
      if (desks.length === 1) {
        const { person, lineIds, asked } = desks[0]
        const alsoCovers = lineIds.filter((id) => !asked.includes(id))
        return `${asked.map(lineTitle).join(' and ')} is handled by ${deskSentence(person)}.${
          alsoCovers.length > 0
            ? ` The same desk also covers ${alsoCovers.map(lineTitle).join(' and ')}.`
            : ''
        } Tap the card below to dial that desk directly, or send the enquiry form and it reaches the same person in writing.`
      }

      if (desks.length > 1) {
        return `Those lines sit with ${desks.length} desks: ${desks
          .map((d) => `${d.asked.map(lineTitle).join(' and ')} with ${deskSentence(d.person)}`)
          .join('; and ')}. Tap a card to dial the desk you need.`
      }

      /* Nothing named, so publish the directory and invite a line. */
      return `Direct desks, from the published company record: ${DESK_SUMMARY}. Export consignments, documentation and customs clearance go to ${
        orgMember('org-export-manager')?.name ?? 'the export desk'
      }. General enquiries reach ${GENERAL_CONTACT.mailbox} or ${GENERAL_CONTACT.line}. Name your product line and I will point you at the one desk that handles it.`
    },
    cards: (message = '') => {
      const desks = desksForLines(detectLineIds(message))
      if (desks.length === 0) return CONTACT_CARDS
      return [...desks.map((d) => deskCard(d.person, d.lineIds)), GENERAL_CARD]
    },
    suggestions: [CHIP.whoHandles, CHIP.products, CHIP.samples, CHIP.quote],
    action: { text: 'Open the enquiry form', href: '/contact' },
  },
  {
    id: 'products',
    keywords: [
      'product', 'products', 'catalogue', 'catalog', 'range', 'fibre', 'fiber',
      'psf', 'staple', 'wadding', 'felt', 'nonwoven', 'non-woven', 'non woven',
      'interlining', 'lining', 'fusing', 'wadding', 'infill', 'material', 'materials',
      'what do you make', 'what do you sell', 'offer',
    ],
    answer: (message = '') => {
      const desks = desksForLines(detectLineIds(message))
      /* When one line is named, close with the desk that handles it. */
      const routing =
        desks.length === 1
          ? ` ${desks[0].asked.map(lineTitle).join(' and ')} is handled by ${deskSentence(desks[0].person)}.`
          : ''
      return `We manufacture five verified product lines: ${lineList}. The staple fibre range spans ${VERIFIED.denierRange}, from fine-count spinning to ultra-coarse industrial batting.${routing} Tap a card for the line's verified attributes.`
    },
    cards: (message = '') => {
      const lineIds = detectLineIds(message)
      const named = PRODUCT_CARDS.filter((c) => lineIds.some((id) => c.href === `/products#${id}`))
      return named.length > 0 ? named : PRODUCT_CARDS
    },
    suggestions: [CHIP.compare, CHIP.specs, CHIP.contacts, CHIP.quote],
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
      'gulf fiber', 'employees', 'workforce', 'people', 'customers', 'clients',
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
      'buy', 'purchase', 'moq', 'minimum', 'lead time', 'enquiry', 'inquiry',
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
      const matched = new Set<string>()
      for (const hint of APPLICATION_HINTS) {
        if (hint.words.some((w) => text.includes(w))) hint.lineIds.forEach((id) => matched.add(id))
      }

      if (matched.size > 0) {
        const lines = PRODUCT_LINES.filter((p) => matched.has(p.id))
        /* Name the desk that owns the recommendation, so the visitor leaves
           with a person to call rather than a line to look up. */
        const desks = desksForLines([...matched])
        const routing =
          desks.length === 1
            ? ` That line is handled by ${deskSentence(desks[0].person)}.`
            : desks.length > 1
              ? ` Those lines are handled by ${desks
                  .map((d) => deskSentence(d.person))
                  .join('; and ')}.`
              : ''
        return `Based on the published record, ${lines
          .map((p) => `the ${p.title} (${p.code}) - applied in ${p.appliedIn.map((a) => a.toLowerCase()).join(', ')}`)
          .join('; and ')}.${routing} Order-specific suitability still depends on your specification - the enquiry desk confirms it against your process.`
      }
      return `Tell me the application and I will point at the right line. From the published record: ${PRODUCT_LINES.map(
        (p) => `${p.title} (${p.code}) is applied in ${p.appliedIn.map((a) => a.toLowerCase()).join(', ')}`
      ).join('; ')}.`
    },
    /* When the application resolves to specific lines, show those lines - each
       card already closes with the desk that handles it; otherwise the whole
       range. */
    cards: (message = '') => {
      const lineIds = detectLineIds(message)
      const named = PRODUCT_CARDS.filter((c) => lineIds.some((id) => c.href === `/products#${id}`))
      return named.length > 0 ? named : PRODUCT_CARDS
    },
    suggestions: [CHIP.compare, CHIP.specs, CHIP.contacts, CHIP.quote],
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
  CHIP.contacts,
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
  CHIP.contacts,
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
    nudge: 'Questions about Gulf Fiber? Ask me.',
    greeting: GREETING_ANSWER,
    suggestions: STARTER_SUGGESTIONS,
  },
  '/products': {
    topic: 'Products',
    greeting: `Five verified lines — staple fibre, hollow fibre, wadding, felt and interlinings — across the ${VERIFIED.denierRange} denier range. Ask about any line, or how they compare.`,
    nudge: 'Need help choosing a fibre line?',
    suggestions: [CHIP.compare, CHIP.specs, CHIP.recommend, CHIP.samples, CHIP.contacts, CHIP.quote],
  },
  '/services': {
    topic: 'Process & services',
    nudge: 'Ask about the production sequence.',
    greeting: `Production runs in four stages: ${stageList}. Ask about any stage, quality control, or packing and export.`,
    suggestions: [CHIP.process, CHIP.quality, CHIP.shipping, CHIP.capacity, CHIP.contacts, CHIP.quote],
  },
  '/company': {
    topic: 'The company',
    nudge: 'Ask about the company record.',
    greeting: `${VERIFIED.legalName} — polyester fibre in ${VERIFIED.country} since ${VERIFIED.established}. ${VERIFIED.annualCapacity} annual capacity, ${VERIFIED.customers} customers, a workforce of ${VERIFIED.workforce}.`,
    suggestions: [CHIP.contacts, CHIP.capacity, CHIP.products, CHIP.certifications, CHIP.gallery, CHIP.quote],
  },
  '/sustainability': {
    topic: 'Sustainability',
    nudge: 'Ask how recycled content is verified.',
    greeting: `Regenerated fibre is produced from ${VERIFIED.recycledInput}, tracked under Global Recycled Standard chain of custody — so your recycled-content claim can be substantiated on ours.`,
    suggestions: [CHIP.recycled, CHIP.certifications, CHIP.compare, CHIP.products, CHIP.contacts, CHIP.quote],
  },
  '/quality': {
    topic: 'Quality & compliance',
    nudge: 'Ask about certifications and testing.',
    greeting: `Registrations held: ${certCodes}. Verification runs at incoming feedstock, at the fibre and before baling, with a Certificate of Analysis per consignment.`,
    suggestions: [CHIP.certifications, CHIP.quality, CHIP.samples, CHIP.recycled, CHIP.contacts, CHIP.quote],
  },
  '/gallery': {
    topic: 'Visual archive',
    nudge: 'Ask about the plant or the process.',
    greeting: `${GALLERY_ITEMS.length} photographs across ${galleryCategoryCount} categories, all from the company record. Ask about the plant, the process or the product lines.`,
    suggestions: [CHIP.process, CHIP.products, CHIP.company, CHIP.certifications, CHIP.contacts, CHIP.quote],
  },
  '/contact': {
    topic: 'Enquiries',
    nudge: 'Not sure what to send? Ask me first.',
    greeting: 'Denier, cut length, volume and destination are enough for a firm answer on feasibility. Ask me anything before you send the form — including which desk handles your line.',
    suggestions: [CHIP.contacts, CHIP.quote, CHIP.specs, CHIP.samples, CHIP.shipping, CHIP.terms],
  },
}

/** Page-aware opening for a route, falling back to the landing page. */
export function pageContext(pathname: string | null): PageContext {
  if (!pathname) return PAGE_CONTEXTS['/']
  return PAGE_CONTEXTS[pathname] ?? PAGE_CONTEXTS['/']
}
