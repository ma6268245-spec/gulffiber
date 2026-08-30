import type { DataStatus } from '@/lib/data/company'

/* ===========================================================================
   GALLERY ARCHIVE (/gallery)
   ---------------------------------------------------------------------------
   The visual archive of Gulf Fibre - factory, materials, manufacturing,
   products, quality, people and sustainability. Every item with an `image`
   points at a real photograph in /public/images; items whose image is null
   render as labelled placeholder frames so the client can drop the real
   photograph in later without restructuring the page.

   Provenance rules as everywhere else: `image: null` + CONTENT_REQUIRED means
   the asset does not exist in this repository yet. Nothing is faked - no
   stock photography, no generated "employees", no invented events.
   =========================================================================== */

export type GalleryCategoryId =
  | 'factory'
  | 'materials'
  | 'manufacturing'
  | 'products'
  | 'quality'
  | 'people'
  | 'sustainability'

export const GALLERY_CATEGORIES: { id: GalleryCategoryId | 'all'; label: string; blurb: string }[] = [
  { id: 'all', label: 'The Archive', blurb: 'Everything the record holds, and the frames waiting to be filled.' },
  { id: 'factory', label: 'Factory', blurb: 'The plant environment Gulf Fibre manufactures in.' },
  { id: 'materials', label: 'Materials', blurb: 'Fibre, felt, wadding, nonwoven and woven materials.' },
  { id: 'manufacturing', label: 'Manufacturing', blurb: 'Extrusion, fibre formation, finishing and packaging.' },
  { id: 'products', label: 'Products', blurb: 'Finished material - rolls, bales and goods ready to ship.' },
  { id: 'quality', label: 'Quality', blurb: 'Laboratory, testing, inspection and certificates.' },
  { id: 'people', label: 'People', blurb: 'Director, founders, management and team - awaiting approved portraits.' },
  { id: 'sustainability', label: 'Sustainability', blurb: 'Recycled feedstock and the GRS material journey.' },
]

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategoryId
  /** Path in /public, or null while the photograph is outstanding. */
  image: string | null
  description: string
  /** Only set when a real photograph exists; describes what is actually shown. */
  alt: string
  tags: string[]
  /** Verified year, if any. Never invented. */
  year?: string
  relatedProduct?: string
  relatedPage?: string
  status: DataStatus
}

export const GALLERY_ITEMS: GalleryItem[] = [
  /* ── Factory ─────────────────────────────────────────────────────────── */
  {
    id: 'g-factory-floor',
    title: 'The production floor',
    category: 'factory',
    image: '/images/workshop-factory.jpg',
    alt: 'Production floor at the Gulf Fibre plant',
    description:
      'The plant environment material is manufactured in - the same floor every consignment ships from, verified in-house before dispatch.',
    tags: ['plant', 'floor'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-loom',
    title: 'Machinery in operation',
    category: 'factory',
    image: '/images/hero-loom.jpg',
    alt: 'Textile machinery running Gulf Fibre material',
    description: 'Conversion machinery running Gulf Fibre material - the industrial context behind every product line.',
    tags: ['machinery', 'loom'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-wide',
    title: 'Plant wide shot',
    category: 'factory',
    image: null,
    alt: '',
    description: 'A wide establishing photograph of the plant belongs here. Supply the shot and the frame becomes it.',
    tags: ['plant', 'wide'],
    status: 'CONTENT_REQUIRED',
  },

  /* ── Materials ───────────────────────────────────────────────────────── */
  {
    id: 'g-material-fibre',
    title: 'Polyester staple fibre',
    category: 'materials',
    image: '/images/sustainability-cotton.jpg',
    alt: 'Regenerated polyester staple fibre produced by Gulf Fibre',
    description:
      'Staple fibre across the 1.2D - 60D range - the material every other line is built from, from fine-count spinning to industrial batting.',
    tags: ['psf', 'fibre', 'regenerated'],
    relatedProduct: 'psf-regenerated',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-material-wadding',
    title: 'High-loft wadding',
    category: 'materials',
    image: null,
    alt: '',
    description: 'A close material shot of the high-loft thermally bonded wadding. No photograph of this line exists in the repository yet.',
    tags: ['wadding', 'high-loft'],
    relatedProduct: 'wadding',
    relatedPage: '/products',
    status: 'CONTENT_REQUIRED',
  },
  {
    id: 'g-material-felt',
    title: 'Needle-punched felt',
    category: 'materials',
    image: null,
    alt: '',
    description: 'A cross-section or surface shot of the needle-punched felt line - awaiting a production photograph.',
    tags: ['felt', 'nonwoven'],
    relatedProduct: 'felt',
    relatedPage: '/products',
    status: 'CONTENT_REQUIRED',
  },
  {
    id: 'g-material-interlining',
    title: 'Interlining materials',
    category: 'materials',
    image: null,
    alt: '',
    description: 'Woven and non-woven interlining goods. The line is verified; its photograph is not yet in the archive.',
    tags: ['interlining', 'woven'],
    relatedProduct: 'interlining',
    relatedPage: '/products',
    status: 'CONTENT_REQUIRED',
  },

  /* ── Manufacturing ───────────────────────────────────────────────────── */
  {
    id: 'g-mfg-extrusion',
    title: 'Extrusion line',
    category: 'manufacturing',
    image: '/images/process-fibre.jpg',
    alt: 'Polyester fibre extrusion and crimping machinery',
    description:
      'Stage two of the published sequence: melt extrusion through spinnerets, then drafting and thermomechanical crimping.',
    tags: ['extrusion', 'spinneret', 'crimping'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-baling',
    title: 'Cutting and baling',
    category: 'manufacturing',
    image: null,
    alt: '',
    description: 'Rotary cutting and moisture-sealed 200–300 kg baling - the final production stage, awaiting its photograph.',
    tags: ['cutting', 'baling'],
    relatedPage: '/services',
    status: 'CONTENT_REQUIRED',
  },

  /* ── Products ────────────────────────────────────────────────────────── */
  {
    id: 'g-product-rolls',
    title: 'Finished rolls',
    category: 'products',
    image: '/images/collection-rolls.jpg',
    alt: 'Rolls of finished Gulf Fibre material in the warehouse',
    description:
      'Finished material in protective roll wrapping - how wadding, felt and interlining goods leave the floor.',
    tags: ['rolls', 'packing'],
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-product-bales',
    title: 'Standard bales',
    category: 'products',
    image: null,
    alt: '',
    description: 'The 200–300 kg moisture-sealed standard bale. Supply the photograph and it anchors this category.',
    tags: ['bales', 'export-bales'],
    relatedPage: '/products',
    status: 'CONTENT_REQUIRED',
  },

  /* ── Quality & Certifications ───────────────────────────────────────── */
  {
    id: 'g-quality-lab',
    title: 'Laboratory inspection',
    category: 'quality',
    image: '/images/quality-lab.jpg',
    alt: 'Fibre being inspected under laboratory conditions at Gulf Fibre',
    description:
      'Verification sits where the outcome is recoverable: incoming feedstock, tensile analysis, moisture verification, COA per consignment.',
    tags: ['lab', 'testing', 'coa'],
    relatedPage: '/quality',
    status: 'VERIFIED',
  },
  {
    id: 'g-quality-iso',
    title: 'ISO 9001:2015 Certificate',
    category: 'quality',
    image: '/images/certificates/iso-9001-2015-certificate.jpg',
    alt: 'ISO 9001:2015 Quality Management Systems Registration Certificate',
    description: 'Certified under Sustainable Management System Inc. (SMS-MSC-22422) for the manufacturing & export of recycled polyester fiber.',
    tags: ['iso', 'certificate', 'qms'],
    relatedPage: '/quality',
    status: 'VERIFIED',
  },
  {
    id: 'g-quality-grs',
    title: 'Global Recycled Standard (GRS 4.0)',
    category: 'quality',
    image: '/images/certificates/grs-scope-certificate-page1.jpg',
    alt: 'GRS 4.0 Scope Certificate by Control Union Certifications',
    description: 'Control Union Scope Certificate CU1068996GRS verifying 100% post-consumer recycled PET flake and chain of custody.',
    tags: ['grs', 'recycled', 'certificate'],
    relatedPage: '/sustainability',
    status: 'VERIFIED',
  },
  {
    id: 'g-quality-oeko',
    title: 'OEKO-TEX® Standard 100',
    category: 'quality',
    image: '/images/certificates/oeko-tex-standard-100-certificate.jpg',
    alt: 'OEKO-TEX Standard 100 Certificate by AITEX',
    description: 'Product Class I (Baby Articles) certification confirming zero harmful substances across recycled polyester staple fibres.',
    tags: ['oeko-tex', 'skin-safe', 'certificate'],
    relatedPage: '/quality',
    status: 'VERIFIED',
  },
  {
    id: 'g-quality-epa',
    title: 'EPA Punjab Environmental Approval',
    category: 'quality',
    image: '/images/certificates/epa-punjab-environmental-approval.jpg',
    alt: 'Government of Punjab EPA Environmental Approval Letter',
    description: 'Statutory environmental approval from EPA Punjab for PET bottle crushing and recycling plant operations.',
    tags: ['epa', 'environmental', 'compliance'],
    relatedPage: '/sustainability',
    status: 'VERIFIED',
  },
  {
    id: 'g-quality-lcci',
    title: 'LCCI Membership Certificate',
    category: 'quality',
    image: '/images/certificates/lcci-membership-certificate.jpg',
    alt: 'The Lahore Chamber of Commerce & Industry Membership Certificate',
    description: 'Registered corporate member firm (No. 52097_C) since 2004, attesting trade and export origin documentation.',
    tags: ['lcci', 'trade', 'chamber'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },

  /* ── People ──────────────────────────────────────────────────────────── */
  {
    id: 'g-people-director',
    title: 'Muhammad Iftikhar · Founder & Director',
    category: 'people',
    image: '/images/team/muhammad-iftikhar.jpg',
    alt: 'Muhammad Iftikhar - Founder and Director of Gulf Fibre Company',
    description:
      'Guiding Gulf Fibre since 1999 with an unwavering commitment to precision manufacturing, sustainability, and industrial scale.',
    tags: ['director', 'founder', 'leadership'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-people-founders',
    title: 'Iftikhar Ali · Co-founder & Operational Director',
    category: 'people',
    image: '/images/team/iftikhar-ali.jpg',
    alt: 'Iftikhar Ali - Co-founder and Operational Director',
    description: 'Co-founding director overseeing operational discipline, raw material integrity, and plant quality assurance across production lines.',
    tags: ['cofounder', 'operations', 'leadership'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-people-team',
    title: 'The team',
    category: 'people',
    image: null,
    alt: '',
    description: 'The 250+ workforce behind the specification. Team photography awaits approval.',
    tags: ['team', 'workforce'],
    relatedPage: '/company',
    status: 'CONTENT_REQUIRED',
  },

  /* ── Sustainability ──────────────────────────────────────────────────── */
  {
    id: 'g-sus-feedstock',
    title: 'Post-consumer feedstock',
    category: 'sustainability',
    image: null,
    alt: '',
    description: 'The 100% post-consumer PET input that starts the GRS-certified route - awaiting its photograph.',
    tags: ['pet', 'feedstock'],
    relatedPage: '/sustainability',
    status: 'CONTENT_REQUIRED',
  },
  {
    id: 'g-sus-fibre',
    title: 'From flake to fibre',
    category: 'sustainability',
    image: '/images/process-fibre.jpg',
    alt: 'Regenerated fibre produced from post-consumer PET',
    description:
      'The regeneration stage: refined flake becomes staple fibre on the same line as the rest of the range, under GRS chain of custody.',
    tags: ['regeneration', 'grs'],
    relatedPage: '/sustainability',
    status: 'VERIFIED',
  },
]

/** Filter chips derived from the categories that actually have items. */
export const ACTIVE_CATEGORIES = GALLERY_CATEGORIES.filter(
  (c) => c.id === 'all' || GALLERY_ITEMS.some((i) => i.category === c.id)
)
