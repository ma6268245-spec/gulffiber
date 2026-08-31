import type { DataStatus } from '@/lib/data/company'

/* ===========================================================================
   GALLERY ARCHIVE (/gallery)
   ---------------------------------------------------------------------------
   The visual archive of Gulf Fibre - factory, manufacturing, products,
   and sustainability. Every entry maps directly to an authentic photograph
   from the /public/images/Gallery directory.
   =========================================================================== */

export type GalleryCategoryId =
  | 'factory'
  | 'manufacturing'
  | 'products'
  | 'sustainability'

export const GALLERY_CATEGORIES: { id: GalleryCategoryId | 'all'; label: string; blurb: string }[] = [
  { id: 'all', label: 'All Photos', blurb: 'Complete visual archive of Gulf Fibre plant facilities, machinery, and products.' },
  { id: 'factory', label: 'Factory & Plant', blurb: 'Plant facilities, administrative buildings, aerial campus views, and logistics.' },
  { id: 'manufacturing', label: 'Manufacturing', blurb: 'Extrusion spinnerets, drawing stands, crimpers, needle looms, and slitter rewinders.' },
  { id: 'products', label: 'Products', blurb: 'Staple fibres, conjugated hollow fibres, thermal wadding, felt rolls, interlinings, and fusion paper.' },
  { id: 'sustainability', label: 'Sustainability', blurb: 'Rooftop solar energy generation arrays and clean green plant operations.' },
]

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategoryId
  /** Path in /public */
  image: string | null
  description: string
  alt: string
  tags: string[]
  year?: string
  relatedProduct?: string
  relatedPage?: string
  status: DataStatus
}

export const GALLERY_ITEMS: GalleryItem[] = [
  /* ── Factory & Plant ─────────────────────────────────────────────────── */
  {
    id: 'g-factory-compound',
    title: 'Plant Complex & Factory Compound',
    category: 'factory',
    image: '/images/Gallery/1.jpeg',
    alt: 'Gulf Fibre industrial plant complex and factory buildings',
    description:
      'Exterior view of the Gulf Fibre manufacturing facility in Faisalabad, showing the production sheds and processing infrastructure.',
    tags: ['plant', 'compound', 'facility', 'industrial'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-tower',
    title: 'Extrusion Tower & Feedstock Facility',
    category: 'factory',
    image: '/images/Gallery/2.jpeg',
    alt: 'Main factory extrusion tower and feedstock processing facility',
    description:
      'The multi-tier vertical extrusion tower and feedstock warehouse where raw post-consumer PET enters the production sequence.',
    tags: ['tower', 'extrusion', 'facility', 'feedstock'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-aerial',
    title: 'Aerial View of Plant Campus',
    category: 'factory',
    image: '/images/Gallery/14.jpeg',
    alt: 'Elevated view of Gulf Fibre factory campus, yards and logistics',
    description:
      'Overhead perspective of the plant compound showing production halls, material staging yards, logistics fleet and solar arrays.',
    tags: ['aerial', 'campus', 'logistics', 'overview'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-gate',
    title: 'Corporate Entrance & Main Gate',
    category: 'factory',
    image: '/images/Gallery/16.jpeg',
    alt: 'Gulf Fiber Company (Pvt) Ltd corporate entrance and plant gate',
    description:
      'Main gate and official entrance of Gulf Fiber Company (PVT) Limited on 32-KM Sheikhupura Road, Faisalabad.',
    tags: ['entrance', 'gate', 'corporate', 'landmark'],
    relatedPage: '/contact',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-grounds',
    title: 'Plant Grounds & Transport Logistics',
    category: 'factory',
    image: '/images/Gallery/17.jpeg',
    alt: 'Factory vehicle parking and material transport grounds',
    description:
      'Covered transport and logistics facilities within the factory premises for swift consignment dispatches and operations support.',
    tags: ['grounds', 'logistics', 'transport', 'facility'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-factory-admin',
    title: 'Administration & Management Block',
    category: 'factory',
    image: '/images/Gallery/18.jpeg',
    alt: 'Administration and executive office building at the plant',
    description:
      'The on-site executive administrative office block housing plant engineering, quality compliance and operations management.',
    tags: ['admin', 'office', 'management', 'facility'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },

  /* ── Manufacturing & Machinery ────────────────────────────────────────── */
  {
    id: 'g-mfg-spooling',
    title: 'Precision Filament Spooling & Beaming',
    category: 'manufacturing',
    image: '/images/Gallery/3.jpeg',
    alt: 'High-precision yarn spooling and beaming equipment',
    description:
      'Multi-drum winding and beaming unit maintaining uniform tension across thousands of continuous synthetic filaments.',
    tags: ['spooling', 'beaming', 'winding', 'filaments'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-warping',
    title: 'Parallel Thread Warping Machine',
    category: 'manufacturing',
    image: '/images/Gallery/4.jpeg',
    alt: 'Precision yarn thread warping and alignment machinery',
    description:
      'Parallel warp thread distribution system ensuring zero entanglement and strict tension control prior to downstream bonding.',
    tags: ['warping', 'alignment', 'threads', 'tension'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-felt-line',
    title: 'Needle-Punched Felt Production Line',
    category: 'manufacturing',
    image: '/images/Gallery/5.jpeg',
    alt: 'Heavy industrial needle-punching line for technical felt',
    description:
      'Automated needle-loom batt consolidator transforming cross-lapped carded webs into high-density technical felts.',
    tags: ['needle-punch', 'felt', 'machinery', 'nonwoven'],
    relatedProduct: 'felt',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-tow-cutter',
    title: 'Tow Drawing & Rotary Cutter Unit',
    category: 'manufacturing',
    image: '/images/Gallery/6.jpeg',
    alt: 'Continuous tow drawing, crimping and rotary cutting unit',
    description:
      'High-speed rotary cutter converting continuous crimped tow bands into precision cut lengths (32mm to 102mm) before baling.',
    tags: ['cutting', 'crimping', 'staple-fibre', 'baling'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-drafting-stands',
    title: 'Continuous Drafting & Drawing Stands',
    category: 'manufacturing',
    image: '/images/Gallery/7.jpeg',
    alt: 'Multi-roll drawing stands and heat setting rolls',
    description:
      'Multi-stage draw roll godets orienting molecular polymer chains under precise temperature zones for maximum tensile strength.',
    tags: ['drafting', 'drawing', 'godets', 'tenacity'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-hydro-thermal',
    title: 'Hydro-Thermal Stretching & Steam Annealing',
    category: 'manufacturing',
    image: '/images/Gallery/8.jpeg',
    alt: 'Steam heat-setting and hydro-thermal tow drawing line',
    description:
      'Controlled steam relaxation and thermal annealing line eliminating internal stresses and fixing three-dimensional crimp.',
    tags: ['steam', 'heat-setting', 'annealing', 'crimp'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-drive-conveyor',
    title: 'Extrusion Drive System & Conveyor',
    category: 'manufacturing',
    image: '/images/Gallery/9.jpeg',
    alt: 'Heavy motor drives and extrusion line conveyor system',
    description:
      'Synchronized variable-frequency drive motors and thermal transport conveyor regulating throughput across the melt sequence.',
    tags: ['drive', 'motors', 'conveyor', 'extrusion'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-spinneret-line',
    title: 'Multi-Spinneret Extrusion & Quench Line',
    category: 'manufacturing',
    image: '/images/Gallery/10.jpeg',
    alt: 'Multi-position spinneret extrusion and water quenching line',
    description:
      'Multi-position spinning manifold delivering metered molten polymer into water-quenched filament tows with uniform denier.',
    tags: ['spinneret', 'quenching', 'extrusion', 'filaments'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-spinneret-pack',
    title: 'High-Temperature Spinneret Extrusion Pack',
    category: 'manufacturing',
    image: '/images/Gallery/12.jpeg',
    alt: 'Illuminated circular spinneret plate extruding molten polyester filaments',
    description:
      'Close-up of molten polyester micro-filaments emerging under pressure through micro-metered spinneret orifices.',
    tags: ['spinneret', 'micro-filaments', 'polymer', 'extrusion'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-extruder-line',
    title: 'Heavy Industrial Melt Extruder Line',
    category: 'manufacturing',
    image: '/images/Gallery/13.jpeg',
    alt: 'Industrial heavy melt extruder and thermocontrol drives',
    description:
      'Multi-zone temperature controlled screw extruders liquefying recycled PET flakes with filtration and degassing systems.',
    tags: ['extruder', 'melt', 'thermal-zones', 'screw'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-tow-coilers',
    title: 'Tow Can Coilers & Accumulators',
    category: 'manufacturing',
    image: '/images/Gallery/19.jpeg',
    alt: 'Fibre tow collection cans receiving continuous filament bands',
    description:
      'Rotating collection cans collecting quenched undrawn tow bands for tensionless buffering before combined drafting.',
    tags: ['coilers', 'cans', 'tow-buffer', 'spinning'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-crimper-conveyor',
    title: 'Mechanical Stuffer Box Crimper',
    category: 'manufacturing',
    image: '/images/Gallery/20.jpeg',
    alt: 'Mechanical stuffer-box crimper and tow discharge conveyor',
    description:
      'Positive-nip mechanical stuffer-box crimper imparting high-resilience 3D crimp geometry across the heavy tow band.',
    tags: ['crimper', 'stuffer-box', 'elasticity', 'texturizing'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-stitch-line',
    title: 'Stitch-Bonding & Interlining Machinery',
    category: 'manufacturing',
    image: '/images/Gallery/21.jpeg',
    alt: 'Stitch-bonding warp machine inserting yarn into fibrous batt',
    description:
      'Multi-bar warp stitch-bonding machine reinforcing nonwoven batt structures for high-performance apparel interlinings.',
    tags: ['stitch-bonding', 'interlining', 'warp', 'textiles'],
    relatedProduct: 'interlining',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-floor-overview',
    title: 'Main Production Floor & Drawing Line',
    category: 'manufacturing',
    image: '/images/Gallery/22.jpeg',
    alt: 'Wide panorama of staple fibre manufacturing floor and draw line',
    description:
      'Full operational view of the primary fibre production hall, showcasing continuous draw stands, can arrays, and ventilation systems.',
    tags: ['floor', 'production-line', 'hall', 'capacity'],
    relatedPage: '/company',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-slitter-rewinder',
    title: 'High-Precision Slitter Rewinder Unit',
    category: 'manufacturing',
    image: '/images/Gallery/23.jpeg',
    alt: 'Industrial slitter rewinder machine for nonwoven fabric rolls',
    description:
      'Automated PLC-controlled slitter rewinder delivering custom roll widths, edge trimming, and tight roll tension for wadding and felt.',
    tags: ['slitter', 'rewinder', 'rolls', 'converting'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },
  {
    id: 'g-mfg-needle-loom',
    title: 'High-Speed Needle-Punching Web Loom',
    category: 'manufacturing',
    image: '/images/Gallery/24.jpeg',
    alt: 'High-speed industrial needle-punching board and bonding zone',
    description:
      'Heavy-duty reciprocal needle board mechanically interlocking fibres at thousands of penetrations per square centimetre.',
    tags: ['needle-loom', 'bonding', 'mechanical', 'felt'],
    relatedPage: '/services',
    status: 'VERIFIED',
  },

  /* ── Products & Materials ─────────────────────────────────────────────── */
  {
    id: 'g-mat-filament-strands',
    title: 'Continuous Polyester Filament Tow',
    category: 'products',
    image: '/images/Gallery/11.jpeg',
    alt: 'Hand inspection of extruded fine polyester filament strands',
    description:
      'Tactile quality verification of fine filament tows immediately after spinneret discharge to confirm denier uniformity.',
    tags: ['filaments', 'inspection', 'denier', 'tow', 'products'],
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-mat-hollow-fiber',
    title: 'Conjugated Hollow Siliconized Fiber',
    category: 'products',
    image: '/images/Gallery/Hollow FIber.jpeg',
    alt: 'Conjugate hollow siliconized polyester staple fibre cluster',
    description:
      'High-resilience 3D crimp hollow fiber with siliconized surface finish for superior loft, recovery, and thermal insulation.',
    tags: ['hollow-fiber', 'siliconized', 'hcs', 'loft', 'products'],
    relatedProduct: 'psf-virgin',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-mat-staple-fiber',
    title: 'Dope-Dyed Polyester Staple Fiber',
    category: 'products',
    image: '/images/Gallery/Staple Fiber.jpeg',
    alt: 'Vibrant blue dope-dyed polyester staple fiber sample',
    description:
      'Precision dope-dyed staple fiber with permanent colorfastness across 1.2D to 60D denier specifications for spinning and nonwovens.',
    tags: ['staple-fiber', 'dope-dyed', 'colorfast', 'psf', 'products'],
    relatedProduct: 'psf-regenerated',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-prod-fusion-paper',
    title: 'Fusible Interlining & Fusion Paper Roll',
    category: 'products',
    image: '/images/Gallery/Fusion Paper.jpeg',
    alt: 'Roll of white fusible interlining fusion paper',
    description:
      'Evenly coated thermo-fusible paper roll engineered for uniform garment bonding, collar stabilization, and tailoring support.',
    tags: ['fusion-paper', 'interlining', 'garment', 'fusible', 'products'],
    relatedProduct: 'interlining',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-prod-stitch-interlining',
    title: 'Stitch-Bound Interlining Textiles',
    category: 'products',
    image: '/images/Gallery/Stitch Bound Interlining.jpeg',
    alt: 'Stacked stitch-bound interlining fabrics in multiple color grades',
    description:
      'Woven-look stitch-bonded reinforcement fabrics in black, white, and navy for suit chest pieces, waistbands, and outerwear.',
    tags: ['stitch-bound', 'interlining', 'apparel', 'textiles', 'products'],
    relatedProduct: 'interlining',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-prod-wadding',
    title: 'Thermally Bonded Polyester Wadding',
    category: 'products',
    image: '/images/Gallery/Thermal-Bonded Polyester Wadding.jpeg',
    alt: 'High-loft white thermal-bonded polyester wadding batting sheet',
    description:
      'Low-melt fiber bonded batting sheet offering exceptional thermal retention, hypo-allergenic softness, and wash durability.',
    tags: ['wadding', 'thermal-bonded', 'bedding', 'batting', 'products'],
    relatedProduct: 'wadding',
    relatedPage: '/products',
    status: 'VERIFIED',
  },
  {
    id: 'g-prod-felt-rolls',
    title: 'Needle-Punched Non-Woven Felt Rolls',
    category: 'products',
    image: '/images/Gallery/non woven felt.jpeg',
    alt: 'Industrial heavy rolls of grey needle-punched non-woven felt',
    description:
      'Heavyweight technical felt rolls manufactured for automotive interior trim, carpet underlay, geo-textiles, and acoustic damping.',
    tags: ['felt', 'non-woven', 'technical', 'automotive', 'products'],
    relatedProduct: 'felt',
    relatedPage: '/products',
    status: 'VERIFIED',
  },

  /* ── Sustainability ──────────────────────────────────────────────────── */
  {
    id: 'g-sus-solar-array',
    title: 'Factory Rooftop Solar Energy Installation',
    category: 'sustainability',
    image: '/images/Gallery/15.jpeg',
    alt: 'Rooftop solar photovoltaic panels covering factory sheds',
    description:
      'Industrial photovoltaic solar installation powering manufacturing lines with clean, renewable energy to minimize the plant carbon footprint.',
    tags: ['solar', 'photovoltaic', 'clean-energy', 'green-plant'],
    relatedPage: '/sustainability',
    status: 'VERIFIED',
  },
]

/** Filter chips derived from the categories that actually have items. */
export const ACTIVE_CATEGORIES = GALLERY_CATEGORIES.filter(
  (c) => c.id === 'all' || GALLERY_ITEMS.some((i) => i.category === c.id)
)
