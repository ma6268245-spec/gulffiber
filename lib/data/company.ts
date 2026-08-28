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
    { value: '350+', label: 'Customers Served', status: 'VERIFIED' },
    { value: '25+', label: 'Years in Business', status: 'VERIFIED', source: 'Established 1999' },
    { value: '4+', label: 'Quality Certifications', status: 'VERIFIED', source: 'GRS, ISO 9001, OEKO-TEX, PTEA' },
  ],
  productCategories: [
    { id: '01', title: 'Polyester Staple Fibre', subtitle: 'Virgin & Recycled · 1.2D–15D', status: 'VERIFIED' },
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
    { name: 'GRS (Global Recycled Standard)', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'ISO 9001:2015', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'OEKO-TEX Standard 100', type: 'ACCREDITED_CERTIFICATION', status: 'VERIFIED' },
    { name: 'Pakistan Textile Exporters Association (PTEA)', type: 'TRADE_ASSOCIATION', status: 'VERIFIED' },
  ],
}
