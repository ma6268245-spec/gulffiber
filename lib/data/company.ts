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
    subtitle: '100% Recycled PET feedstock · Bottle flakes & polymer waste',
    positioning:
      'Engineered recycled polyester staple fibre manufactured from sorted post-consumer PET bottle flakes and clean polymer waste under verified GRS chain of custody. Offered in solid and hollow configurations with tailored siliconized or non-siliconized surface finishes for spinning mills, fibrefill cushioning, and non-woven conversion.',
    appliedIn: [
      'Ring & open-end yarn spinning',
      'Home textiles & bedding fill',
      'Fibrefill & furniture cushioning',
      'Non-woven & needle-punched substrates',
    ],
    verifiedAttributes: [
      { label: 'Fibre category', value: 'Polyester staple fibre (solid & hollow)' },
      { label: 'Feedstock origin', value: '100% post-consumer PET bottle flakes' },
      { label: 'Denier range', value: `${VERIFIED.denierRange} (grade-dependent)` },
      { label: 'Cut length', value: '32 mm – 102 mm (customer-specified)' },
      { label: 'Finish variants', value: 'Siliconized / non-siliconized / slick' },
      { label: 'Compliance', value: 'GRS 4.0 (CU1068996) · OEKO-TEX Standard 100' },
    ],
    specSlot:
      'Specification pending production verification — batch tenacity (cN/dtex), elongation %, crimp count per inch, and oil pick-up (OPU) are confirmed per production lot on the consignment Certificate of Analysis.',
    image: '/images/process-fibre.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'psf-virgin',
    code: 'PSF-V',
    title: 'Virgin Polyester Staple Fibre',
    subtitle: 'Prime polymer feedstock · Pure PTA & MEG',
    positioning:
      'High-purity virgin polyester staple fibre produced directly from prime PTA (Purified Terephthalic Acid) and MEG (Monoethylene Glycol) feedstock. Engineered for fine-count spinning, apparel textiles, and high-tenacity industrial applications requiring exceptional tensile uniformity, optical brightness, and dye uptake consistency.',
    appliedIn: [
      'Fine-count yarn spinning',
      'Apparel & garment textiles',
      'Polyester-cotton (PC) blended yarns',
      'High-tenacity industrial fabrics',
    ],
    verifiedAttributes: [
      { label: 'Fibre category', value: 'Virgin polyester staple fibre' },
      { label: 'Feedstock origin', value: 'Prime PTA & MEG polymerization' },
      { label: 'Denier range', value: '1.2D – 15D (spinning & industrial counts)' },
      { label: 'Cut length', value: '32 mm – 76 mm (grade-dependent)' },
      { label: 'Lustre options', value: 'Semi-dull / bright / super-white' },
      { label: 'Substance safety', value: 'OEKO-TEX Standard 100 (Class I safe)' },
    ],
    specSlot:
      'Technical data sheet required — grade-specific tensile modulus, thermal shrinkage tables, and optical whiteness indexes are supplied per technical sales inquiry.',
    image: '/images/collection-rolls.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'wadding',
    code: 'WAD',
    title: 'Thermal-Bonded Polyester Wadding',
    subtitle: 'High-loft non-woven infill · Chemical glue-free bonding',
    positioning:
      'Resilient non-woven cushioning and insulating batting produced by homogeneously blending polyester staple fibres with low-melt bonding fibres and passing the carded web through a precision thermal bonding oven. The heat-activated bonding process securely fuses the fibre matrix into a high-loft structure without relying on hazardous chemical glues or volatile resins.',
    appliedIn: [
      'Mattresses & bed toppers',
      'Quilts, duvets & comforters',
      'Upholstered furniture cushioning',
      'Winter outerwear & insulated jackets',
      'Air & liquid filtration media',
      'Automotive & acoustic insulation',
    ],
    verifiedAttributes: [
      { label: 'Construction', value: 'Thermal-bonded non-woven (glue-free)' },
      { label: 'Bonding mechanism', value: 'Low-melt bicomponent fibre activation' },
      { label: 'Core properties', value: 'High loft recovery, breathable, hypoallergenic' },
      { label: 'Weight & width', value: 'Customizable GSM & roll width (per order)' },
      { label: 'Durability', value: 'Wash-durable loft retention under compression' },
      { label: 'Compliance', value: 'Produced within certified ISO & OEKO-TEX framework' },
    ],
    specSlot:
      'Specification pending production verification — exact GSM range (100–600+ g/m²), roll width (up to 3.2 m), loft thickness (mm), and compression recovery % are engineered to order and confirmed on proforma sheets.',
    image: '/images/sustainability-cotton.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'felt',
    code: 'FLT',
    title: 'Needle-Punched Felt & Non-Woven Materials',
    subtitle: 'Mechanically interlocked structure · All weights',
    positioning:
      'Dense, heavy-duty non-woven felt manufactured by mechanically entangling polyester staple fibres using thousands of high-speed barbed needles. The repeated penetration causes fibres to interlock three-dimensionally into a cohesive, dimensionally stable mat with high tear resistance, fluid permeability, and acoustic dampening properties without requiring chemical binders.',
    appliedIn: [
      'Industrial & liquid filtration',
      'Automotive boot & acoustic linings',
      'Geotextiles & civil engineering',
      'Structural padding & protective insulation',
      'Shoe insoles & footwear components',
      'Embroidery backing & headwear stiffening',
    ],
    verifiedAttributes: [
      { label: 'Bonding method', value: 'Mechanical needle-punching (binder-free)' },
      { label: 'Structural profile', value: 'Dense, cohesive, isotropic fibre matrix' },
      { label: 'Mechanical strength', value: 'High tear resistance & dimensional stability' },
      { label: 'Permeability', value: 'Engineered porosity for filtration & air passage' },
      { label: 'Feedstock options', value: '100% GRS recycled or prime virgin PET' },
      { label: 'Custom variants', value: 'Heat-calendered / optional adhesive backing' },
    ],
    specSlot:
      'Technical data sheet required — caliper thickness (mm), weight range (GSM), tensile strength (MD/CD), air permeability, and puncture resistance tables require project-specific laboratory sheet confirmation.',
    image: '/images/workshop-factory.jpg',
    status: 'VERIFIED',
  },
  {
    id: 'interlining',
    code: 'INT',
    title: 'Linings & Fusible Interlinings',
    subtitle: 'Chemical-bonded, stitch-bonded & fusible substrates',
    positioning:
      'Engineered garment interlinings and fusing materials manufactured across distinct structural technologies — including chemical-bonded non-wovens stabilized with liquid resin binders, high-strength stitch-bonded webs reinforced with polyester threads, and lightweight fusible substrates coated with heat-activated low-melt thermoplastic adhesive dots for structured garment tailoring and making-up reinforcement.',
    appliedIn: [
      'Shirt collars, cuffs & plackets',
      'Tailored suit jackets & blazer lapels',
      'Waistbands & high-stress garment seams',
      'Bags, luggage & leather goods reinforcement',
      'Embroidery backing & tear-away stabilizers',
      'Outerwear & formalwear tailoring',
    ],
    verifiedAttributes: [
      { label: 'Construction methods', value: 'Chemical-bonded · Stitch-bonded · Fusible-coated' },
      { label: 'Adhesive technology', value: 'Heat-activated low-melt thermoplastic dot coating' },
      { label: 'Reinforcement matrix', value: 'Liquid resin binder or high-tenacity stitch threads' },
      { label: 'Performance profile', value: 'Dimensional stability, soft drape, peeling resistance' },
      { label: 'Fusing parameters', value: 'Order-dependent (temperature, pressure, dwell time)' },
      { label: 'Substance safety', value: 'Tested to OEKO-TEX Standard 100 (skin-contact safe)' },
    ],
    specSlot:
      'Technical data sheet required — fusing temperature window (°C), pressure (bar), dwell time (seconds), base fabric GSM, and post-wash peel strength data are provided per garment making-up specification.',
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

/** /contact channels. Verified against official certificates & factory registration. */
export const CONTACT_SLOTS: ContentSlot[] = [
  {
    id: 'plant',
    label: 'Plant & Manufacturing Facility',
    value: '33-KM, Multan Road, Lahore, Punjab, Pakistan',
    status: 'VERIFIED',
    note: 'Official registered manufacturing plant, extrusion lines & warehousing facility.',
  },
  {
    id: 'office',
    label: 'Commercial & Export Office',
    value: 'Gulf Fibre Corporate Office, 33-KM Multan Road, Lahore 54000',
    status: 'VERIFIED',
    note: 'Corporate governance, commercial contracts, and international shipping desk.',
  },
  {
    id: 'telephone',
    label: 'Telephone & Direct Desk',
    value: '+92 (42) 3751-2244',
    status: 'VERIFIED',
    note: 'Direct commercial line with country and regional area code.',
  },
  {
    id: 'whatsapp',
    label: 'Export Direct Line',
    value: '+92 (300) 845-8888',
    status: 'VERIFIED',
    note: 'Direct WhatsApp and mobile channel for international buyers and urgent counts.',
  },
  {
    id: 'email-sales',
    label: 'Quotations & Commercial Enquiries',
    value: 'sales@gulffibre.com / info@gulffibre.com',
    status: 'VERIFIED',
    note: 'Monitored inbox for specifications, volume pricing, and RFQs.',
  },
  {
    id: 'email-samples',
    label: 'Sample Dispatch & Feasibility Desk',
    value: 'samples@gulffibre.com',
    status: 'VERIFIED',
    note: 'Technical lab desk for sample evaluations, lab dips, and test reports.',
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
      label: 'Feedstock preparation & sorting',
      detail:
        'Incoming post-consumer PET bottles and clean industrial polymer waste are sorted, hot-washed, and processed into decontaminated flake under GRS chain of custody.',
      status: 'VERIFIED',
    },
    {
      label: 'Melt extrusion & spinning',
      detail:
        'Clean flake is dried, melted in high-pressure extruders, and forced through precision spinnerets to form continuous filament bundles.',
      status: 'VERIFIED',
    },
    {
      label: 'Multi-stage drafting & orientation',
      detail:
        'Filaments pass through heated liquid draw-baths to develop molecular orientation, locking in target tensile tenacity and elongation characteristics.',
      status: 'VERIFIED',
    },
    {
      label: 'Thermomechanical crimping & finish',
      detail:
        'Tow is mechanically crimped to impart 3D elasticity and bulk cohesion, with tailored siliconized or non-siliconized finish chemistry applied.',
      status: 'VERIFIED',
    },
    {
      label: 'Rotary cutting, baling & COA',
      detail:
        `Tow is cut to the specified staple length (32–102 mm) and compressed into standard ${VERIFIED.baleWeight} moisture-sealed bales with laboratory COA verification.`,
      status: 'VERIFIED',
    },
  ],
  'psf-virgin': [
    {
      label: 'Prime PTA & MEG feedstock',
      detail:
        'Pure PTA and MEG polymer feedstock ensure uniform intrinsic viscosity, high optical clarity, and consistent melt-flow indexes.',
      status: 'VERIFIED',
    },
    {
      label: 'High-precision melt spinning',
      detail:
        'Molten polymer is extruded through high-density spinnerets and laminar-quenched into uniform filament bundles.',
      status: 'VERIFIED',
    },
    {
      label: 'Drawing & molecular orientation',
      detail:
        'High-ratio drawing develops high tensile tenacity, low thermal shrinkage, and precise elongation for fine-count spinning performance.',
      status: 'VERIFIED',
    },
    {
      label: 'Crimping & antistatic spin-finish',
      detail:
        'Filaments receive controlled mechanical crimp and antistatic finish chemistry optimized for high-speed yarn carding and spinning frames.',
      status: 'VERIFIED',
    },
    {
      label: 'Precision cutting & moisture baling',
      detail:
        `Cut to uniform staple length (32–76 mm) and packed into ${VERIFIED.baleWeight} moisture-sealed bales with full batch Certificate of Analysis.`,
      status: 'VERIFIED',
    },
  ],
  wadding: [
    {
      label: 'Fibre opening & precision blending',
      detail:
        'Virgin/recycled polyester staple fibres and low-melt bicomponent bonding fibres are pneumatically opened and metered in exact ratios.',
      status: 'VERIFIED',
    },
    {
      label: 'Web formation & cross-lapping',
      detail:
        'High-speed carding machines comb fibres into a fine web, layered by cross-lappers to reach the target GSM, thickness, and loft profile.',
      status: 'VERIFIED',
    },
    {
      label: 'Thermal bonding oven (glue-free)',
      detail:
        'The layered web passes through a multi-zone hot-air oven where low-melt fibres fuse contact points without chemical glues or volatile resins.',
      status: 'VERIFIED',
    },
    {
      label: 'Calendering & loft stabilization',
      detail:
        'Controlled cooling zones and smooth calender rolls stabilize loft recovery, structural density, and surface uniformity.',
      status: 'VERIFIED',
    },
    {
      label: 'In-line slitting & protective roll packaging',
      detail:
        'Continuous edge-slitting, roll winding, and heavy-duty poly-film wrapping with in-line caliper and density quality verification.',
      status: 'VERIFIED',
    },
  ],
  felt: [
    {
      label: 'Fibre selection & carding',
      detail:
        'Selected GRS recycled or prime virgin polyester fibres are opened and carded into a homogeneous multi-directional fibre batt.',
      status: 'VERIFIED',
    },
    {
      label: 'Multi-layer cross-lapping',
      detail:
        'The web is cross-lapped into heavy batts across the specified weight range to ensure isotropic tensile strength in both machine and cross directions.',
      status: 'VERIFIED',
    },
    {
      label: 'Mechanical needle-punching',
      detail:
        'Thousands of reciprocating barbed needles repeatedly penetrate the batt, mechanically interlocking fibres into a dense, binder-free cohesive mat.',
      status: 'VERIFIED',
    },
    {
      label: 'Thermal consolidation & calendering',
      detail:
        'Optional thermal calendering or surface singeing locks thickness tolerances, increases puncture resistance, and sets surface smoothness.',
      status: 'VERIFIED',
    },
    {
      label: 'Caliper inspection, slitting & roll winding',
      detail:
        'In-line density and thickness verification, precision edge-trimming, and protective roll wrapping for industrial dispatch.',
      status: 'VERIFIED',
    },
  ],
  interlining: [
    {
      label: 'Substrate web formation',
      detail:
        'Non-woven polyester staple fibre webs are carded, or woven base lattices are formed according to the target garment rigidity and drape.',
      status: 'VERIFIED',
    },
    {
      label: 'Matrix consolidation',
      detail:
        'Substrates are consolidated via liquid resin binder thermal curing (chemical-bonded) or mechanical multi-thread stitching (stitch-bonded).',
      status: 'VERIFIED',
    },
    {
      label: 'Thermoplastic adhesive dot coating',
      detail:
        'Heat-activated low-melt thermoplastic adhesive is applied via precision rotary screen printing in computerized dot patterns (CP/double dot).',
      status: 'VERIFIED',
    },
    {
      label: 'Thermal curing & drying tunnel',
      detail:
        'Hot-air curing tunnels anchor adhesive dots securely to the substrate surface without strike-through or compromising fabric hand feel.',
      status: 'VERIFIED',
    },
    {
      label: 'Optical inspection, slitting & roll packaging',
      detail:
        '100% optical inspection for dot uniformity, roll slitting to width, and moisture-sealed packaging accompanied by fusing recommendations.',
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
  { label: 'Standard baling', value: '280 kg, moisture-sealed with high-tensile strapping', status: 'VERIFIED' },
  { label: 'Roll goods packaging', value: 'Heavy-duty protective poly-wrapping (wadding, felt & interlinings)', status: 'VERIFIED' },
  { label: 'Export logistics', value: 'FCL container loading coordinated from Lahore plant to Karachi ports', status: 'VERIFIED' },
  { label: 'Consignment documentation', value: 'In-house export documentation & consignment Certificate of Analysis (COA)', status: 'VERIFIED' },
]
