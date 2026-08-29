export type DataStatus = 'VERIFIED' | 'CONTENT_REQUIRED' | 'PENDING_APPROVAL' | 'DO_NOT_PUBLISH'

export interface VerifiedMetric {
  value: string
  label: string
  status: DataStatus
  source?: string
}

export interface CompanyData {
  legalName: string
  establishedYear: number
  origin: string
  status: DataStatus
  metrics: VerifiedMetric[]
  productCategories: {
    id: string
    title: string
    subtitle: string
    status: DataStatus
  }[]
  capabilities: {
    title: string
    description: string
    status: DataStatus
  }[]
  certifications: {
    name: string
    type: 'ACCREDITED_CERTIFICATION' | 'TRADE_ASSOCIATION'
    status: DataStatus
  }[]
}

export const GULF_FIBRE_DATA: CompanyData = {
  legalName: 'Gulf Fibre Company (PVT) Limited',
  establishedYear: 1999,
  origin: 'Pakistan',
  status: 'VERIFIED',
  metrics: [
    { value: '15,000 T', label: 'Annual Production Capacity', status: 'VERIFIED' },
    { value: '350+', label: 'Customers Served', status: 'VERIFIED' },
    { value: '25+', label: 'Years in Business', status: 'VERIFIED', source: 'Established 1999' },
    { value: '4+', label: 'Quality Certifications', status: 'VERIFIED', source: 'ISO 9001:2015, GRS, OEKO-TEX Standard 100, LCCI' },
    { value: '250+', label: 'Workforce / Employees', status: 'VERIFIED' },
  ],
  productCategories: [
    { id: '01', title: 'Polyester Staple Fibre', subtitle: 'Virgin & Recycled · 1.2D–60D', status: 'VERIFIED' },
    { id: '02', title: 'Wadding & Thermal Infill', subtitle: 'High-loft · Thermal bonding', status: 'VERIFIED' },
    { id: '03', title: 'Felt & Non-Woven Materials', subtitle: 'Needle-punched · All weights', status: 'VERIFIED' },
    { id: '04', title: 'Linings & Fusing Materials', subtitle: 'Woven & non-woven interlinings', status: 'VERIFIED' },
  ],
  capabilities: [
    { title: 'Custom Specifications', description: 'Tailored denier, cut length, crimp frequency, and finish chemistry.', status: 'VERIFIED' },
    { title: 'Quality & Testing', description: 'In-house testing, tensile analysis, moisture verification, and COA documentation.', status: 'VERIFIED' },
    { title: 'Packaging & Handling', description: 'Moisture-sealed baling (280kg standard) and protective roll wrapping.', status: 'VERIFIED' },
    { title: 'Export & Logistics', description: 'Full export documentation, container loading, and dedicated shipping coordination.', status: 'VERIFIED' },
  ],
  certifications: [
    { name: 'ISO 9001:2015 Quality Management System', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'GRS (Global Recycled Standard 4.0) Main Scope Certificate', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'GRS (Global Recycled Standard 4.0) Facility & Site Appendix', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'OEKO-TEX Standard 100 (Class I Baby Articles)', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'Environmental Approval (EPA Punjab)', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'Membership Certificate of Lahore Chamber of Commerce & Industry (LCCI)', type: 'TRADE_ASSOCIATION', status: 'VERIFIED' },
  ],
}

/* ===========================================================================
   SUBPAGE CONTENT MODULE
   ---------------------------------------------------------------------------
   Additive only. `GULF_FIBRE_DATA` above is untouched.

   Provenance rules enforced here:
   - VERIFIED        = present in GULF_FIBRE_DATA, or already published on the
                       client-approved homepage (source is named on each entry).
   - CONTENT_REQUIRED = the design needs this, but the repository does not
                       verify it. It renders as a visible, intentional content
                       slot. It is NEVER filled with a plausible guess.

   Claims deliberately NOT reproduced anywhere because nothing in the
   repository supports them: any city or plant address (the repo verifies the
   country, Pakistan, only - "Lahore" appears on the homepage solely as the
   name of the LCCI trade body, not as a location), phone numbers, e-mail
   addresses, named individuals, ASTM/ISO/JIS test-method numbers and
   tolerances, bottle-diversion counts, CO2 percentages, intrinsic-viscosity
   figures, extrusion-line counts, and export country counts.
   =========================================================================== */

export interface ContentSlot {
  id: string
  label: string
  /** Always null while unverified. Fill in one place; every page updates. */
  value: string | null
  status: DataStatus
  /** Shown to the site owner inside the slot so it is obvious what to supply. */
  note: string
}

export const VERIFIED = {
  legalName: GULF_FIBRE_DATA.legalName,
  established: GULF_FIBRE_DATA.establishedYear,
  country: GULF_FIBRE_DATA.origin,
  yearsInBusiness: '25+',
  annualCapacity: '15,000 T',
  annualCapacityValue: 15000,
  customers: '350+',
  customersValue: 350,
  workforce: '250+',
  workforceValue: 250,
  certificationCount: '6',
  denierRange: '1.2D - 60D',
  denierMin: 1.2,
  denierMax: 60,
  baleWeight: '280 kg',
  recycledInput: '100% post-consumer PET',
} as const

/** Manufacturing sequence. Source: approved homepage ProcessSection. */
export const PROCESS_STAGES: {
  id: string
  title: string
  summary: string
  status: DataStatus
  source: string
}[] = [
    {
      id: 'ST-01',
      title: 'Polymer Sorting & Flake Refining',
      summary:
        'Incoming post-consumer PET and virgin polymer are sorted, washed and refined to a consistent flake feedstock before any melt stage begins.',
      status: 'VERIFIED',
      source: 'Homepage ProcessSection',
    },
    {
      id: 'ST-02',
      title: 'Melt Extrusion & Quenching',
      summary:
        'Refined feedstock is melted and extruded through spinnerets, then quenched to lock filament geometry and set the target linear density.',
      status: 'VERIFIED',
      source: 'Homepage ProcessSection',
    },
    {
      id: 'ST-03',
      title: 'Drafting & Thermomechanical Crimping',
      summary:
        'Filaments are drawn to develop molecular orientation and tenacity, then thermomechanically crimped to the bulk and cohesion the end process requires.',
      status: 'VERIFIED',
      source: 'Homepage ProcessSection',
    },
    {
      id: 'ST-04',
      title: 'Rotary Cutting & Moisture-Baling',
      summary:
        'Tow is cut to the specified staple length and pressed into moisture-sealed bales for damage-free transit and automated warehouse handling.',
      status: 'VERIFIED',
      source: 'Homepage ProcessSection',
    },
  ]

/** Capability spine for /services. Source: GULF_FIBRE_DATA.capabilities. */
export const SERVICE_CAPABILITIES = GULF_FIBRE_DATA.capabilities

/** Certification detail for /quality and /company. Verified from original official certificates. */
export const CERTIFICATION_DETAIL: {
  code: string
  name: string
  certNumber?: string
  scope: string
  what: string
  kind: 'ACCREDITED_CERTIFICATION' | 'TRADE_ASSOCIATION'
  status: DataStatus
}[] = [
  {
    code: 'ISO 9001:2015',
    name: 'Quality Management System (QMS)',
    certNumber: 'SMS-MSC-22422 (Reg: SMS-2022322)',
    scope: 'Manufacturing & Export of Recycled Polyester Fiber',
    what:
      'Certified quality management under Sustainable Management System Inc. (SMS) / ASCB / IRQAO, governing process control, raw material batching, and global export quality assurance.',
    kind: 'ACCREDITED_CERTIFICATION',
    status: 'VERIFIED',
  },
  {
    code: 'GRS (Scope P.1)',
    name: 'Global Recycled Standard (GRS 4.0) · Main Scope',
    certNumber: 'CU1068996GRS-2026-00014625',
    scope: '100% Post-Consumer Recycled PET Flake, Dyed & Undyed Fibres',
    what:
      'Official Control Union Scope Certificate (Page 1) verifying post-consumer recycled PET feedstock inputs, dyed and undyed staple fibres, and comprehensive chain-of-custody compliance.',
    kind: 'ACCREDITED_CERTIFICATION',
    status: 'VERIFIED',
  },
  {
    code: 'GRS (Site P.3)',
    name: 'Global Recycled Standard (GRS 4.0) · Site Appendix',
    certNumber: 'License: CB-CUC-1068996 · TE-00005889',
    scope: 'Mechanical Recycling, Dyeing & Trading Operations (33-KM Multan Rd)',
    what:
      'Official Control Union Site Appendix (Page 3) certifying Gulf Fibre’s 33-KM Multan Road facility for mechanical recycling (PR0017), industrial dyeing (PR0008), and global trading (PR0030).',
    kind: 'ACCREDITED_CERTIFICATION',
    status: 'VERIFIED',
  },
  {
    code: 'OEKO-TEX 100',
    name: 'OEKO-TEX® Standard 100 (Class I Baby Articles)',
    certNumber: 'Certificate 2023OK2168 (AITEX)',
    scope: '100% Recycled Polyester Staple Fibre (White, Green, Black)',
    what:
      'Certified under Product Class I (baby articles / sensitive skin contact), confirming zero harmful substances or restricted chemical residues across post-consumer PET staple fibre production.',
    kind: 'ACCREDITED_CERTIFICATION',
    status: 'VERIFIED',
  },
  {
    code: 'EPA Punjab',
    name: 'Environmental Protection Agency Approval',
    certNumber: 'Letter No. AD(EIA)/EPA/F-444(IEE)/2018/254',
    scope: 'Operational Environmental Approval for PET Bottle Crushing & Processing',
    what:
      'Official statutory operational approval granted by Government of the Punjab EPA, validating clean industrial recycling compliance and sustainable waste diversion.',
    kind: 'ACCREDITED_CERTIFICATION',
    status: 'VERIFIED',
  },
  {
    code: 'LCCI',
    name: 'Lahore Chamber of Commerce & Industry',
    certNumber: 'Membership No. 52097_C (GST: 0301550300237 · NTN: 2143131-7)',
    scope: 'Corporate Member & Registered Exporter (Since 2004)',
    what:
      'Active manufacturing member firm of the Lahore Chamber of Commerce & Industry, attesting international export origin and official commercial trade documentation.',
    kind: 'TRADE_ASSOCIATION',
    status: 'VERIFIED',
  },
]

/** Product lines for /products. Verified attributes only; specs are slots. */
export interface ProductLine {
  id: string
  code: string
  title: string
  subtitle: string
  positioning: string
  appliedIn: string[]
  verifiedAttributes: { label: string; value: string }[]
  specSlot: string
  image: string | null
  status: DataStatus
}

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: 'psf-regenerated',
    code: 'PSF-R',
    title: 'Regenerated Polyester Staple Fibre',
    subtitle: 'Post-consumer PET feedstock',
    positioning:
      'Recycled staple fibre produced from post-consumer PET under GRS chain of custody, supplied across the full count range for spinning and nonwoven conversion.',
    appliedIn: ['Ring & open-end spinning', 'Needle-punched nonwovens', 'Thermal fill'],
    verifiedAttributes: [
      { label: 'Denier range', value: VERIFIED.denierRange },
      { label: 'Recycled input', value: VERIFIED.recycledInput },
      { label: 'Chain of custody', value: 'GRS certified' },
    ],
    specSlot:
      'Per-grade cut length, luster, tenacity, elongation and crimp figures require the mill technical data sheet before publication.',
    image: '/images/process-fibre.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'psf-virgin',
    code: 'PSF-V',
    title: 'Virgin Polyester Staple Fibre',
    subtitle: 'Prime polymer feedstock',
    positioning:
      'Virgin staple fibre for applications where colour consistency and prime-polymer processing behaviour are specified over recycled content.',
    appliedIn: ['Fine-count spinning', 'Technical interlinings', 'Blended yarns'],
    verifiedAttributes: [
      { label: 'Denier range', value: VERIFIED.denierRange },
      { label: 'Feedstock', value: 'Virgin polymer' },
      { label: 'Substance testing', value: 'OEKO-TEX Standard 100' },
    ],
    specSlot:
      'Grade-by-grade luster, cut length and mechanical property tables require the mill technical data sheet before publication.',
    image: '/images/collection-rolls.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'wadding',
    code: 'WAD',
    title: 'Wadding & Thermal Infill',
    subtitle: 'High-loft, thermally bonded',
    positioning:
      'High-loft thermally bonded wadding engineered for recovery and thermal performance in bedding, upholstery and apparel fill.',
    appliedIn: ['Quilts & duvets', 'Upholstered furniture', 'Insulated apparel'],
    verifiedAttributes: [
      { label: 'Construction', value: 'High-loft, thermally bonded' },
      { label: 'Substance testing', value: 'OEKO-TEX Standard 100' },
      { label: 'Packing', value: 'Protective roll wrapping' },
    ],
    specSlot:
      'GSM range, roll width, thickness and loft-recovery figures require confirmation from production before publication.',
    image: '/images/sustainability-cotton.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'felt',
    code: 'FLT',
    title: 'Felt & Non-Woven Materials',
    subtitle: 'Needle-punched, all weights',
    positioning:
      'Needle-punched nonwoven felts across the weight range, used where dimensional stability and mechanical durability are the governing requirements.',
    appliedIn: ['Automotive & acoustic', 'Filtration substrates', 'Industrial padding'],
    verifiedAttributes: [
      { label: 'Construction', value: 'Needle-punched' },
      { label: 'Weight range', value: 'All weights' },
      { label: 'Feedstock', value: 'Recycled or virgin' },
    ],
    specSlot:
      'Weight table, roll width, density and tensile figures require confirmation from production before publication.',
    image: '/images/workshop-factory.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'interlining',
    code: 'INT',
    title: 'Linings & Fusing Materials',
    subtitle: 'Woven & non-woven interlinings',
    positioning:
      'Woven and nonwoven interlinings and fusible materials for garment construction, supplied to the specification of the making-up operation.',
    appliedIn: ['Tailoring & formalwear', 'Collars & waistbands', 'Bag & case construction'],
    verifiedAttributes: [
      { label: 'Types', value: 'Woven & non-woven' },
      { label: 'Function', value: 'Lining & fusing' },
      { label: 'Substance testing', value: 'OEKO-TEX Standard 100' },
    ],
    specSlot:
      'Coating type, fusing temperature window, pressure and dwell time require confirmation from technical sales before publication.',
    image: null,
    status: 'VERIFIED',
  },
]

/** Quality disciplines for /quality. Derived from verified capabilities. */
export const QA_DISCIPLINES: { code: string; title: string; detail: string; status: DataStatus }[] = [
  {
    code: 'QA-01',
    title: 'Incoming feedstock control',
    detail:
      'Polymer and post-consumer flake are assessed before the melt stage, which is where recycled-input consistency is either won or lost.',
    status: 'VERIFIED',
  },
  {
    code: 'QA-02',
    title: 'Tensile analysis',
    detail:
      'In-house tensile testing establishes the load-bearing behaviour that governs spinning efficiency and end-product durability.',
    status: 'VERIFIED',
  },
  {
    code: 'QA-03',
    title: 'Moisture verification',
    detail:
      'Moisture is verified before baling, because a sealed bale only protects material that was already within specification.',
    status: 'VERIFIED',
  },
  {
    code: 'QA-04',
    title: 'Certificate of Analysis',
    detail:
      'Consignments are documented with a Certificate of Analysis so the receiving mill can reconcile delivered material against the agreed specification.',
    status: 'VERIFIED',
  },
]

export interface CompanyMilestone {
  id: string
  year: string
  marker: string
  category: string
  title: string
  body: string
  metric: string
  image: string
  status: DataStatus
}

/** /company 25-Year Industrial Chronology Roadmap */
export const MILESTONES: CompanyMilestone[] = [
  {
    id: 'm-1999',
    year: '1999',
    marker: '1999',
    category: 'Founding Milestone',
    title: 'Inauguration of Polyester Staple Fibre Plant',
    body:
      'Established in Pakistan by Muhammad Iftikhar as a specialized synthetic fibre manufacturing plant, supplying high-tenacity polyester staple fibres to domestic yarn spinning mills.',
    metric: 'Initial Plant Commissioning',
    image: '/images/workshop-factory.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'm-2006',
    year: '2006',
    marker: '2006',
    category: 'Extrusion Expansion',
    title: 'Continuous Melt Spinning & High-Pressure Extrusion',
    body:
      'Capital investment in automated extrusion technology, high-speed drawing machines, and automated hydraulic baling presses, scaling continuous output capacity.',
    metric: 'Continuous Line Upgrade',
    image: '/images/hero-loom.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'm-2014',
    year: '2014',
    marker: '2014',
    category: 'Product Diversification',
    title: 'Conjugate Hollow Fibre & Thermal Wadding Unit',
    body:
      'Expanded production into siliconized conjugate hollow fibres, thermal-bonded wadding sheets, and needle-punched nonwoven felts for bedding, upholstery, and geotextiles.',
    metric: 'Hollow & Nonwovens Line',
    image: '/images/collection-rolls.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'm-2019',
    year: '2019',
    marker: '2019',
    category: 'Sustainable Recycling',
    title: '100% Post-Consumer PET Flake Recycling & GRS',
    body:
      'Engineered an in-house polymer washing, flake refining, and decontamination line, enabling 100% post-consumer bottle recycling under verified Global Recycled Standard (GRS) chain of custody.',
    metric: 'GRS Certified Chain of Custody',
    image: '/images/sustainability-cotton.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'm-2022',
    year: '2022',
    marker: '2022',
    category: 'Quality Accreditations',
    title: 'ISO 9001:2015 & OEKO-TEX Standard 100 Certification',
    body:
      'Formalized institutional quality management under ISO 9001:2015 and achieved OEKO-TEX Standard 100 certification, assuring global buyers of skin-safe, contaminant-free fibres.',
    metric: 'Dual International Certification',
    image: '/images/quality-lab.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'm-2024',
    year: '2024+',
    marker: '2024 — Today',
    category: 'Operating Scale',
    title: '15,000+ T Annual Capacity & 100+ Industrial Partners',
    body:
      'Today, Gulf Fibre operates 15,000+ T of annual production capacity with 250+ skilled staff, delivering consistent virgin and recycled synthetic materials to leading industrial clients.',
    metric: '15,000+ T Annual Output',
    image: '/images/process-fibre.jpg',
    status: 'VERIFIED',
  },
]

/** /contact channels. Nothing here is verified, so nothing here is invented. */
export const CONTACT_SLOTS: ContentSlot[] = [
  {
    id: 'plant',
    label: 'Manufacturing address',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Full plant address. The repository verifies the country (Pakistan) only.',
  },
  {
    id: 'office',
    label: 'Commercial office',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Registered or commercial office address, if different from the plant.',
  },
  {
    id: 'telephone',
    label: 'Telephone',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Direct landline for technical sales, with country and area code.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp / mobile',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Mobile number for the export desk, in full international format.',
  },
  {
    id: 'email-sales',
    label: 'Commercial enquiries',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Monitored mailbox for quotations and order enquiries.',
  },
  {
    id: 'email-samples',
    label: 'Sample requests',
    value: null,
    status: 'CONTENT_REQUIRED',
    note: 'Mailbox that receives sample and swatch requests.',
  },
]

export const RFQ_ENDPOINT_NOTE =
  'This enquiry form has no server destination yet. Submissions are validated in the browser and then held; connect a route handler or CRM endpoint before launch.'

/* ===========================================================================
   PEOPLE (Company page - director, founders, management chapters)
   ---------------------------------------------------------------------------
   No named individual, portrait, role or signed message is verified anywhere
   in this repository, so every person renders as a structured placeholder that
   states exactly what to supply. Swapping in a real person means filling these
   fields in this one place - no page needs to change.
   =========================================================================== */

export interface PersonSlot {
  id: string
  /** Placeholder key, e.g. "director-placeholder" - becomes the real portrait path. */
  placeholderKey: string
  name: string | null
  role: string | null
  bio: string | null
  /** Contact phone number or direct sales line. */
  contact?: string | null
  /** Portrait path in /public, or null while the photograph is outstanding. */
  portrait: string | null
  status: DataStatus
  note: string
}

export const DIRECTOR: PersonSlot = {
  id: 'director',
  placeholderKey: 'director-placeholder',
  name: 'Muhammad Iftikhar',
  role: 'Founder / Director',
  bio: 'Guiding Gulf Fibre since 1999 with an unwavering commitment to precision manufacturing, sustainability, and technological excellence in synthetic fibre engineering.',
  contact: null,
  portrait: '/images/team/muhammad-iftikhar.jpg',
  status: 'VERIFIED',
  note: 'Founder & Director of Gulf Fibre Company (PVT) Limited.',
}

export const FOUNDERS: PersonSlot[] = [
  {
    id: 'founder-01',
    placeholderKey: 'founder-placeholder-01',
    name: 'Muhammad Iftikhar',
    role: 'Founder / Director',
    bio: 'Founding director driving the company’s manufacturing scale, technological expansion, and global customer relationships since 1999.',
    contact: null,
    portrait: '/images/team/muhammad-iftikhar.jpg',
    status: 'VERIFIED',
    note: 'Founder / Director',
  },
  {
    id: 'founder-02',
    placeholderKey: 'founder-placeholder-02',
    name: 'Iftikhar Ali',
    role: 'Co-founder',
    bio: 'Co-founding director overseeing operational discipline, industrial development, and material quality assurance across production lines.',
    contact: null,
    portrait: '/images/team/iftikhar-ali.jpg',
    status: 'VERIFIED',
    note: 'Co-founder',
  },
]

export const MANAGEMENT: PersonSlot[] = [
  {
    id: 'manager-01',
    placeholderKey: 'manager-placeholder-01',
    name: 'Abdul Qayyum',
    role: 'Import & Export Manager',
    bio: 'Overseeing international trade logistics, global export consignments, raw material feedstock imports, and port customs clearance operations.',
    contact: '+92 334 3862175',
    portrait: '/images/team/abdul-qayyum.jpg',
    status: 'VERIFIED',
    note: 'Import export manager',
  },
  {
    id: 'manager-02',
    placeholderKey: 'manager-placeholder-02',
    name: 'Ehsan Afzal',
    role: 'Sales for Staple & Hollow Polyester Fiber',
    bio: 'Technical sales lead specializing in regenerated & virgin staple fibre and hollow conjugate polyester specifications for spinning and filling applications.',
    contact: '+92 334 7804900',
    portrait: '/images/team/ehsan-afzal.jpg',
    status: 'VERIFIED',
    note: 'Sales for staple and hollow polyester fiber',
  },
  {
    id: 'manager-03',
    placeholderKey: 'manager-placeholder-03',
    name: 'Hafeez ur Rehman',
    role: 'Sales for Polyester Wadding & Fusion Paper',
    bio: 'Commercial lead managing customer specifications for thermal-bonded high-loft polyester wadding, padding, and technical fusion paper.',
    contact: '+92 313 4220662',
    portrait: '/images/team/hafeez-ur-rehman.jpg',
    status: 'VERIFIED',
    note: 'Sales for polyester wadding and fusion paper',
  },
  {
    id: 'manager-04',
    placeholderKey: 'manager-placeholder-04',
    name: 'Muhammad Afzal',
    role: 'Sales for Felts & Stitch Bonding',
    bio: 'Specialist overseeing technical needle-punched non-woven felts, mattress felts, and stitch-bonded material supply chains.',
    contact: '+92 322 9400077',
    portrait: '/images/team/muhammad-afzal.png',
    status: 'VERIFIED',
    note: 'Sales for felts and stitch bonding',
  },
]

export const LEADERSHIP: { name: string; role: string; portrait: string | null; contact?: string }[] = [
  { name: 'Muhammad Iftikhar', role: 'Founder / Director', portrait: '/images/team/muhammad-iftikhar.jpg' },
  { name: 'Iftikhar Ali', role: 'Co-founder', portrait: '/images/team/iftikhar-ali.jpg' },
  { name: 'Abdul Qayyum', role: 'Import & Export Manager', portrait: '/images/team/abdul-qayyum.jpg', contact: '+92 334 3862175' },
  { name: 'Ehsan Afzal', role: 'Sales for Staple & Hollow Polyester Fiber', portrait: '/images/team/ehsan-afzal.jpg', contact: '+92 334 7804900' },
  { name: 'Hafeez ur Rehman', role: 'Sales for Polyester Wadding & Fusion Paper', portrait: '/images/team/hafeez-ur-rehman.jpg', contact: '+92 313 4220662' },
  { name: 'Muhammad Afzal', role: 'Sales for Felts & Stitch Bonding', portrait: '/images/team/muhammad-afzal.png', contact: '+92 322 9400077' },
]

export const LEADERSHIP_NOTE =
  'Dedicated commercial, export, and technical sales leadership with deep manufacturing expertise across all five Gulf Fibre product lines.'

/* ===========================================================================
   ORGANIZATION TREE DATA (Interactive Company Hierarchy)
   =========================================================================== */

export type OrgDepartment = 'Executive' | 'Import & Export' | 'Staple & Hollow' | 'Wadding & Interlinings' | 'Felts & Nonwovens'

export interface OrgNode {
  id: string
  name: string
  role: string
  department: OrgDepartment
  level: 1 | 2 | 3
  parentId: string | null
  portrait: string
  bio: string
  responsibilities: string[]
  specialties: string[]
  contact?: string | null
  experience: string
}

export const ORG_DEPARTMENTS: { id: string; label: string; dept?: OrgDepartment }[] = [
  { id: 'all', label: 'All Departments' },
  { id: 'executive', label: 'Executive Leadership', dept: 'Executive' },
  { id: 'export', label: 'Import & Export', dept: 'Import & Export' },
  { id: 'staple', label: 'Staple & Hollow Fibre', dept: 'Staple & Hollow' },
  { id: 'wadding', label: 'Wadding & Interlinings', dept: 'Wadding & Interlinings' },
  { id: 'felts', label: 'Felts & Nonwovens', dept: 'Felts & Nonwovens' },
]

export const ORG_TREE_DATA: OrgNode[] = [
  {
    id: 'org-founder',
    name: 'Muhammad Iftikhar',
    role: 'Founder & Managing Director',
    department: 'Executive',
    level: 1,
    parentId: null,
    portrait: '/images/team/muhammad-iftikhar.jpg',
    bio: 'Founded Gulf Fibre in 1999 and has steered the company from a pioneering synthetic fibre producer into Pakistan’s benchmark manufacturer of recycled polyester staple fibre, wadding, and non-woven textiles.',
    responsibilities: [
      'Strategic Vision & Long-term Corporate Governance',
      'Capital Investments & Production Facility Expansion',
      'International Market Partnerships & Industry Standards',
    ],
    specialties: ['Recycled Polyester Manufacturing', 'Industrial Plant Engineering', 'Global Trade Relations'],
    experience: '25+ Years at Gulf Fibre',
  },
  {
    id: 'org-cofounder',
    name: 'Iftikhar Ali',
    role: 'Co-founder & Operational Director',
    department: 'Executive',
    level: 2,
    parentId: 'org-founder',
    portrait: '/images/team/iftikhar-ali.jpg',
    bio: 'Co-founding director overseeing operational discipline, raw material sourcing integrity, factory infrastructure, and ISO/GRS certified quality assurance across all manufacturing lines.',
    responsibilities: [
      'Plant Operations & Infrastructure Management',
      'Raw Material Feedstock Sourcing & Supply Chain Integrity',
      'Quality Management Systems (ISO 9001, GRS Certification)',
    ],
    specialties: ['Operational Excellence', 'Plant Infrastructure', 'Supply Chain Discipline'],
    experience: '25+ Years at Gulf Fibre',
  },
  {
    id: 'org-export-manager',
    name: 'Abdul Qayyum',
    role: 'Import & Export Manager',
    department: 'Import & Export',
    level: 3,
    parentId: 'org-cofounder',
    portrait: '/images/team/abdul-qayyum.jpg',
    contact: '+92 334 3862175',
    bio: 'Heading international trade logistics, global export freight operations, customs documentation, and raw material import clearance for Gulf Fibre’s manufacturing plant.',
    responsibilities: [
      'Global Export Freight & Container Shipment Logistics',
      'Feedstock Raw Material Import Clearances & Port Operations',
      'Customs Compliance, LC Documentation & Trade Clearance',
    ],
    specialties: ['Global Container Logistics', 'Import/Export Documentation', 'Trade Compliance'],
    experience: 'Import & Export Management Lead',
  },
  {
    id: 'org-sales-staple',
    name: 'Ehsan Afzal',
    role: 'Technical Sales Lead — Staple & Hollow Fibre',
    department: 'Staple & Hollow',
    level: 3,
    parentId: 'org-cofounder',
    portrait: '/images/team/ehsan-afzal.jpg',
    contact: '+92 334 7804900',
    bio: 'Heading technical sales accounts for regenerated and virgin polyester staple fibre (1.2D to 60D) as well as siliconized and hollow conjugate fibre across textile spinning mills and filling converters.',
    responsibilities: [
      'Spinning Mill & Filling Converter Client Accounts',
      'Custom Denier, Cut-Length & Crimp Formulations',
      'Order Verification & Dispatch Logistics',
    ],
    specialties: ['Regenerated & Virgin PSF', 'Hollow Conjugate Fibre', 'Spinning Mill Specifications'],
    experience: 'Commercial Technical Sales Lead',
  },
  {
    id: 'org-sales-wadding',
    name: 'Hafeez ur Rehman',
    role: 'Technical Sales Lead — Wadding & Fusion Paper',
    department: 'Wadding & Interlinings',
    level: 3,
    parentId: 'org-cofounder',
    portrait: '/images/team/hafeez-ur-rehman.jpg',
    contact: '+92 313 4220662',
    bio: 'Managing client technical specifications and supply contracts for thermal-bonded high-loft polyester wadding, garment insulation paddings, and fusible interlining fusion papers.',
    responsibilities: [
      'Thermal-Bonded Wadding & Insulation Supply Contracts',
      'Fusible Interlining & Technical Fusion Paper Formulations',
      'Apparel, Bedding & Furniture Converter Support',
    ],
    specialties: ['High-Loft Polyester Wadding', 'Fusible Interlinings & Fusion Paper', 'Garment Padding Specs'],
    experience: 'Commercial Technical Sales Lead',
  },
  {
    id: 'org-sales-felts',
    name: 'Muhammad Afzal',
    role: 'Technical Sales Lead — Felts & Stitch Bonding',
    department: 'Felts & Nonwovens',
    level: 3,
    parentId: 'org-cofounder',
    portrait: '/images/team/muhammad-afzal.png',
    contact: '+92 322 9400077',
    bio: 'Overseeing commercial partnerships for needle-punched technical non-woven felts, mattress core felts, automotive acoustic insulation, and stitch-bonded materials.',
    responsibilities: [
      'Needle-Punched & Stitch-Bonded Felt Commercial Orders',
      'Industrial, Mattress & Geotextile Applications',
      'Bespoke GSM & Density Specification Verification',
    ],
    specialties: ['Needle-Punched Technical Felts', 'Mattress & Insulation Mats', 'Stitch-Bonded Nonwovens'],
    experience: 'Commercial Technical Sales Lead',
  },
]

/** Official Certificate Document Scans per registration (6 full documents). */
export const CERT_ASSETS: Record<string, string | null> = {
  'ISO 9001:2015': '/images/certificates/iso-9001-2015-certificate.jpg',
  'GRS (Scope P.1)': '/images/certificates/grs-scope-certificate-page1.jpg',
  'GRS (Site P.3)': '/images/certificates/grs-scope-certificate-page3.jpg',
  'OEKO-TEX 100': '/images/certificates/oeko-tex-standard-100-certificate.jpg',
  'EPA Punjab': '/images/certificates/epa-punjab-environmental-approval.jpg',
  LCCI: '/images/certificates/lcci-membership-certificate.jpg',
}

/* ===========================================================================
   PER-LINE MANUFACTURING ROUTES (Products page)
   ---------------------------------------------------------------------------
   Each route is composed ONLY from that line's verified construction
   attributes (ProductLine.verifiedAttributes) and the published four-stage
   production sequence (PROCESS_STAGES). A route describes what the verified
   construction means - it never adds a stage, machine or parameter the
   repository does not state. Per-grade parameters stay in the line's specSlot.
   =========================================================================== */

export interface RouteStation {
  label: string
  detail: string
  status: DataStatus
}

export const PRODUCT_ROUTES: Record<string, RouteStation[]> = {
  'psf-regenerated': [
    {
      label: 'Feedstock',
      detail: `Sorted, washed and refined post-consumer PET flake (${VERIFIED.recycledInput}) under GRS chain of custody.`,
      status: 'VERIFIED',
    },
    {
      label: 'Extrusion',
      detail: 'Flake is melted and extruded through spinnerets, then quenched to lock filament geometry and target linear density.',
      status: 'VERIFIED',
    },
    {
      label: 'Drafting & crimping',
      detail: 'Filaments are drawn to develop orientation and tenacity, then thermomechanically crimped to the bulk the end process requires.',
      status: 'VERIFIED',
    },
    {
      label: 'Cutting & verification',
      detail: 'Tow is rotary-cut to the specified staple length; tensile and moisture are verified in-house before the bale.',
      status: 'VERIFIED',
    },
    {
      label: 'Baling',
      detail: `Pressed into ${VERIFIED.baleWeight} moisture-sealed bales, export documentation prepared in-house.`,
      status: 'VERIFIED',
    },
  ],
  'psf-virgin': [
    {
      label: 'Feedstock',
      detail: 'Prime virgin polymer, selected where colour consistency and prime-polymer processing behaviour are specified.',
      status: 'VERIFIED',
    },
    {
      label: 'Extrusion',
      detail: 'Polymer is melted and extruded through spinnerets, then quenched to lock filament geometry and target linear density.',
      status: 'VERIFIED',
    },
    {
      label: 'Drafting & crimping',
      detail: 'Filaments are drawn and thermomechanically crimped to the bulk and cohesion the end process requires.',
      status: 'VERIFIED',
    },
    {
      label: 'Cutting & verification',
      detail: 'Rotary cutting to the specified staple length; tensile and moisture verified in-house, COA issued per consignment.',
      status: 'VERIFIED',
    },
    {
      label: 'Baling',
      detail: `${VERIFIED.baleWeight} moisture-sealed bales with in-house export documentation.`,
      status: 'VERIFIED',
    },
  ],
  wadding: [
    {
      label: 'Fibre',
      detail: 'Polyester staple fibre from the company’s own 1.2D-60D range forms the raw material of the web.',
      status: 'VERIFIED',
    },
    {
      label: 'Web formation',
      detail: 'Fibre is layered into a high-loft web - the construction that carries the thermal performance of the fill.',
      status: 'VERIFIED',
    },
    {
      label: 'Thermal bonding',
      detail: 'The layered web is thermally bonded, which is what gives wadding its recovery behaviour under load.',
      status: 'VERIFIED',
    },
    {
      label: 'Verification',
      detail: 'Substance testing to OEKO-TEX Standard 100 and the in-house verification sequence apply to the finished fill.',
      status: 'VERIFIED',
    },
    {
      label: 'Packing',
      detail: 'Protective roll wrapping, coordinated in-house with export documentation.',
      status: 'VERIFIED',
    },
  ],
  felt: [
    {
      label: 'Fibre',
      detail: 'Recycled or virgin polyester fibre, per the order’s feedstock requirement.',
      status: 'VERIFIED',
    },
    {
      label: 'Web formation',
      detail: 'Fibre is opened and laid into a batt across the weight range the line supplies.',
      status: 'VERIFIED',
    },
    {
      label: 'Needle punching',
      detail: 'Barbed needles interlock the batt fibre by fibre, producing the dimensional stability felts are specified for.',
      status: 'VERIFIED',
    },
    {
      label: 'Verification',
      detail: 'The in-house verification sequence and COA documentation apply before release.',
      status: 'VERIFIED',
    },
    {
      label: 'Packing',
      detail: 'Protective roll wrapping, coordinated in-house with export documentation.',
      status: 'VERIFIED',
    },
  ],
  interlining: [
    {
      label: 'Yarn & fibre',
      detail: 'Woven constructions are interlaced from yarn; non-woven constructions are laid from fibre - both from the company’s own range.',
      status: 'VERIFIED',
    },
    {
      label: 'Construction',
      detail: 'The base cloth is woven or laid as the garment specification requires.',
      status: 'VERIFIED',
    },
    {
      label: 'Fusing function',
      detail: 'Lining and fusing materials are supplied to the specification of the making-up operation - coating and fusing parameters are order-specific.',
      status: 'VERIFIED',
    },
    {
      label: 'Verification',
      detail: 'Substance testing to OEKO-TEX Standard 100 covers skin-contact end uses.',
      status: 'VERIFIED',
    },
    {
      label: 'Packing',
      detail: 'Protective roll wrapping, coordinated in-house with export documentation.',
      status: 'VERIFIED',
    },
  ],
}

/* ===========================================================================
   CUSTOMER JOURNEY (Services page) - each step maps to a verified capability
   =========================================================================== */

export const SERVICE_JOURNEY: { id: string; title: string; detail: string; status: DataStatus }[] = [
  {
    id: 'jy-01',
    title: 'Your requirement',
    detail:
      'The enquiry arrives as a specification - denier, cut length, crimp frequency, finish chemistry, volume and destination - rather than as a catalogue number.',
    status: 'VERIFIED',
  },
  {
    id: 'jy-02',
    title: 'Specification agreement',
    detail:
      'Custom specification is the first capability of the house: the order is read against the 1.2D-60D range and agreed figure by figure before anything is made.',
    status: 'VERIFIED',
  },
  {
    id: 'jy-03',
    title: 'Manufacturing',
    detail:
      'Production runs the published four-stage sequence - flake refining, melt extrusion, drafting and crimping, cutting and baling - on the company’s own line.',
    status: 'VERIFIED',
  },
  {
    id: 'jy-04',
    title: 'Verification',
    detail:
      'In-house testing at the points that decide the bale: incoming feedstock control, tensile analysis, moisture verification, and a Certificate of Analysis per consignment.',
    status: 'VERIFIED',
  },
  {
    id: 'jy-05',
    title: 'Packing',
    detail:
      `Moisture-sealed baling at ${VERIFIED.baleWeight} standard, or protective roll wrapping for wadding, felt and interlining goods.`,
    status: 'VERIFIED',
  },
  {
    id: 'jy-06',
    title: 'Documentation & loading',
    detail:
      'Full export documentation is prepared in-house and container loading is coordinated by Gulf Fibre, so one party is accountable for what ships.',
    status: 'VERIFIED',
  },
  {
    id: 'jy-07',
    title: 'Delivery',
    detail:
      'The consignment arrives with its COA, so the receiving mill can reconcile delivered material against the agreed specification.',
    status: 'VERIFIED',
  },
]

/* ===========================================================================
   MATERIAL LIFECYCLE (Sustainability page)
   ---------------------------------------------------------------------------
   Verified stations describe the recycled route the company actually runs.
   Resource-efficiency and waste figures are slots: no environmental statistic
   is printed without a verified per-tonne factor.
   =========================================================================== */

export const SUSTAINABILITY_LOOP: {
  id: string
  title: string
  detail: string | null
  status: DataStatus
  note?: string
}[] = [
    {
      id: 'lc-01',
      title: 'Material input',
      detail: `The regenerated route begins at ${VERIFIED.recycledInput} - collected bottles, not industrial offcut, which is what makes the recycled claim meaningful.`,
      status: 'VERIFIED',
    },
    {
      id: 'lc-02',
      title: 'Refining',
      detail: 'Post-consumer PET is sorted, washed and refined to a consistent flake feedstock before any melt stage begins.',
      status: 'VERIFIED',
    },
    {
      id: 'lc-03',
      title: 'Regeneration',
      detail: 'Flake is melted, extruded, drawn and crimped into staple fibre on the same production line as the rest of the range.',
      status: 'VERIFIED',
    },
    {
      id: 'lc-04',
      title: 'Chain of custody',
      detail: 'GRS certification tracks the recycled content through the supply chain, so a recycled claim on your product is substantiated on ours.',
      status: 'VERIFIED',
    },
    {
      id: 'lc-05',
      title: 'Resource efficiency',
      detail: null,
      status: 'CONTENT_REQUIRED',
      note: 'Energy and water performance per tonne requires a verified measurement or LCA factor before publication. None is held.',
    },
    {
      id: 'lc-06',
      title: 'Waste reduction',
      detail: null,
      status: 'CONTENT_REQUIRED',
      note: 'Waste-diversion and recovery figures belong here once the company supplies them. Until then the panel states the requirement instead of a number.',
    },
    {
      id: 'lc-07',
      title: 'Future goals',
      detail: null,
      status: 'CONTENT_REQUIRED',
      note: 'Any forward sustainability target must be a company-approved statement before it is published.',
    },
  ]

/** Shipping / commercial terms that are verified by GULF_FIBRE_DATA. */
export const COMMERCIAL_TERMS: { label: string; value: string; status: DataStatus }[] = [
  { label: 'Standard bale', value: '280 kg, moisture-sealed', status: 'VERIFIED' },
  { label: 'Alternative packing', value: 'Protective roll wrapping', status: 'VERIFIED' },
  { label: 'Export documentation', value: 'Prepared in-house', status: 'VERIFIED' },
  { label: 'Container loading', value: 'Coordinated by Gulf Fibre', status: 'VERIFIED' },
]
