# Gulf Fibre Company — Complete Website Architecture, Technical Reference & Developer Guide

> **Document Purpose**: Definitive technical architecture, complete directory structure, page-by-page operational mechanics, 3D/animation specifications, and single source of truth for AI agents and developers working on the Gulf Fibre web application.

---

## ⚠️ CRITICAL DIRECTIVE: HOMEPAGE IS COMPLETE & FROZEN

> [!IMPORTANT]
> **THE HOMEPAGE (`/`, `app/page.tsx`, and all 16 components under `components/sections/`) IS 100% COMPLETE, CLIENT-APPROVED, AND FROZEN.**
>
> **RULES FOR ALL AGENTS & DEVELOPERS:**
> 1. **DO NOT MAKE AUTOMATIC MODIFICATIONS TO THE HOMEPAGE.**
> 2. Do not rewrite, refactor, remove, or restyle any section of the homepage unless explicitly requested.
> 3. Preserve all verified business metrics, animations, typography tokens, and visual assets.
> 4. All six subpages (`/products`, `/services`, `/sustainability`, `/quality`, `/company`, `/contact`) are fully implemented and integrated with the shared subpage design grammar and 3D system.

---

## 1. Complete Project Directory Structure

```
gulf-fibre/
├── app/                                    # Next.js App Router (16.3.3)
│   ├── company/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # 10-chapter corporate documentary page
│   ├── contact/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # RFQ form, inquiry routing & 3D bundle visual
│   ├── products/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # 5-line editorial catalog, route ladders & 3D scenes
│   ├── gallery/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # Visual archive: 7-category filter grid & lightbox
│   ├── quality/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # Testing protocols, control points & ISO viewer
│   ├── services/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # Capabilities index, 3D extrusion & 7-step journey
│   ├── sustainability/
│   │   ├── layout.tsx                      # Metadata & subpage.css loader
│   │   └── page.tsx                        # GRS loop, 3D circular transformation & bale calculator
│   ├── favicon.ico                         # Favicon
│   ├── globals.css                         # Global CSS custom properties, resets & tokens
│   ├── layout.tsx                          # Root layout (Header, Lenis, ThemeProvider, Footer)
│   └── page.tsx                            # Homepage entry point (16 curated sections)
├── components/
│   ├── chat/
│   │   └── ChatAssistant.tsx               # Enterprise AI assistant widget & quick cards
│   ├── company/
│   │   └── CompanyVideoScrollStory.tsx     # On-demand company documentary player
│   ├── layout/
│   │   ├── FloatingActions.tsx             # Floating chat assistant & scroll-top wrapper
│   │   ├── Footer.tsx                      # Multi-column global footer with quicklinks
│   │   ├── Header.tsx                      # Glassmorphic header with animated anchor indicator
│   │   ├── LenisProvider.tsx               # Ultra-smooth Lenis scroll synchronization
│   │   ├── SearchModal.tsx                 # Ctrl+K spotlight fuzzy search modal
│   │   └── ThemeProvider.tsx               # Light/Dark glassmorphic theme state manager
│   ├── sections/                           # 16 Homepage-exclusive sections (FROZEN)
│   │   ├── AboutStats.tsx                  # Secondary statistical proofs & GSAP counter
│   │   ├── AdvantagesSection.tsx           # Competitive manufacturing advantages
│   │   ├── BlogSection.tsx                 # Technical textile whitepapers & insights
│   │   ├── ConsultationCTA.tsx             # Primary proforma & sample consultation CTA
│   │   ├── ContactStrip.tsx                # Quick sales contact ribbon & direct channels
│   │   ├── FabricMarquee.tsx               # Infinite textile terminology ticker
│   │   ├── HeroSection.tsx                 # Full-viewport hero, count-ups & ISO 9001 seal
│   │   ├── ProcessSection.tsx              # 4-stage extrusion & refining walkthrough
│   │   ├── ProductCollection.tsx           # 4 primary product divisions
│   │   ├── QualitySection.tsx              # Laboratory testing protocol preview
│   │   ├── QualityStory.tsx                # Heritage narrative & optical purity screening
│   │   ├── ServicesSection.tsx             # Custom extrusion & specification services
│   │   ├── StatsBar.tsx                    # Full-width 5-metric sapphire ribbon
│   │   ├── SustainabilitySection.tsx       # Closed-loop PET recycling showcase
│   │   ├── TestimonialsSection.tsx         # Verified industrial client reviews
│   │   └── TrustBanner.tsx                 # Accredited certifications ribbon
│   ├── subpages/                           # Shared subpage design system & primitives
│   │   ├── CertificationGallery.tsx        # Certificate gallery cards + accessible lightbox
│   │   ├── JourneyChapter.tsx              # Sticky marker 7-step customer journey ladder
│   │   ├── PageHero.tsx                    # Shared editorial subpage hero with serif accents
│   │   ├── PageShell.tsx                   # Subpage token wrapper & scroll-reset controller
│   │   ├── PeopleChapter.tsx               # Director feature, founder & management cards
│   │   ├── Primitives.tsx                  # SectionHead, SpecRows, DataSlot, Provenance, etc.
│   │   ├── ProcessScrollChapter.tsx        # Tall pinned 3D sequence (Process & Circular)
│   │   ├── ScrollProductScene.tsx          # Scroll-scrubbed 3D material behavior viewer
│   │   ├── TimelineChapter.tsx             # Scroll-illuminated company history timeline
│   │   └── useSectionReveal.ts             # Intersection & GSAP scroll-reveal hook
│   └── three/                              # Parametric WebGL 3D Engine
│       ├── MaterialCanvas.tsx              # Lazy-loaded WebGL canvas with image fallback
│       └── materialScene.ts                # InstancedMesh single draw-call 3D geometries
├── lib/
│   ├── data/
│   │   ├── chatbot.ts                      # Intent scoring rules, keywords & verified answers
│   │   ├── company.ts                      # Single source of truth (metrics, specs, certs)
│   │   └── gallery.ts                      # Visual archive: 7 categories, 19 entries, asset slots
│   ├── animations.ts                       # Shared GSAP helpers (fadeUp, lineReveal, counter)
│   ├── fonts.ts                            # Google font definitions (JetBrains Mono for specs)
│   └── subpage-motion.ts                   # Additive motion helpers for subpages
├── public/
│   ├── images/                             # Real photography & certified emblems
│   │   ├── collection-rolls.jpg            # Finished rolls of wadding/nonwoven
│   │   ├── hero-loom.jpg                   # Industrial textile loom on factory floor
│   │   ├── iso-9001-seal-v2.png            # Official blue circular ISO 9001 seal
│   │   ├── process-fibre.jpg               # Extrusion line & crimping machinery
│   │   ├── quality-lab.jpg                 # Tensile testing & laboratory instruments
│   │   ├── specialist-avatar.jpg           # Technical specialist avatar
│   │   ├── sustainability-cotton.jpg       # Raw recycled polyester fibre flakes
│   │   └── workshop-factory.jpg            # Gulf Fibre manufacturing plant floor
│   ├── videos/
│   │   └── company-story.mp4               # High-definition company documentary film
│   └── gulf-fibre-logo.png                 # Official brand logo
├── styles/
│   ├── chat.css                            # Scoped styling for ChatAssistant widget
│   └── subpage.css                         # Scoped styling (.sp-root) for all subpages
├── eslint.config.mjs                       # Flat ESLint configuration
├── next.config.ts                          # Next.js optimization & remote patterns
├── package.json                            # Scripts & dependency definitions
├── tsconfig.json                           # Strict TypeScript configuration
└── README.md                               # Project quick-start & overview
```

---

## 2. How Every Page Works

### 1. Homepage (`/` — `app/page.tsx`)
* **Role**: Primary corporate presentation with 16 sequential sections.
* **Sections**:
  1. `HeroSection`: High-impact typography (`PIONEERS OF REGENERATED Polyester Fiber in Pakistan`), 4 animated count-up metrics, right-side image with floating ISO 9001 transparent badge.
  2. `FabricMarquee`: Seamless horizontal text ticker displaying key technical terms.
  3. `ProductCollection`: Grid showcasing 4 core product categories.
  4. `ContactStrip`: Immediate sales and technical contact details.
  5. `ServicesSection`: Custom batching, denier modification, and technical finishing.
  6. `QualitySection`: Laboratory testing protocols and COA verification.
  7. `StatsBar`: Full-width sapphire ribbon featuring 5 large metrics.
  8. `QualityStory`: Heritage story with automated consistency controls.
  9. `ProcessSection`: 4-stage engineering walkthrough from flake to baling.
  10. `AdvantagesSection`: Industrial advantages (scale, logistics, port proximity).
  11. `AboutStats`: Secondary statistical proof points.
  12. `TestimonialsSection`: Verified feedback from spinning and nonwoven partners.
  13. `SustainabilitySection`: Closed-loop PET recycling showcase.
  14. `TrustBanner`: ISO 9001, GRS, OEKO-TEX, and LCCI credentials.
  15. `BlogSection`: Technical whitepapers and market reports.
  16. `ConsultationCTA`: Primary inquiry and sample request form.

---

### 2. Products Page (`/products` — `app/products/page.tsx`)
* **Role**: Comprehensive technical catalog and engineering showcase covering all 5 manufacturing divisions.
* **Component Architecture & Section Hierarchy**:
  1. **Hero Header (`PageHero`)**:
     - *Eyebrow*: `Product Portfolio` with star glyph.
     - *Headline*: `Five lines, one specification discipline` (with Cormorant serif accent).
     - *Background*: HD loop `/videos/product-hero.mp4` with glassmorphic dark overlay.
     - *Verified Stat Badges*: Denier range (`1.2D – 60D`), Annual capacity (`15,000 T`), Product lines (`5`), Customers served (`350+`).
     - *Call to Action*: Direct link to `/contact` for quotation submission.
  2. **Section 01 · Editorial Collection Index (`The Collection`)**:
     - Numbered 2-digit index rows (`01` to `05`) with smooth anchor navigation (`#psf-regenerated`, `#psf-virgin`, `#wadding`, `#felt`, `#interlining`).
     - Displays line code, full title, subtitle, and chevron indicator.
  3. **Section 02 · Line-by-Line Deep Dives (5 Distinct Divisions)**:
     - **Specification Aside (`.sp-deep__aside`)**: Line code badge, H2 title, positioning lede, verified technical attributes table (`SpecRows`), application chips (`p.appliedIn`), and direct inquiry button with provenance badge.
     - **Interactive 3D Material Scene (`ScrollProductScene`)**: Scroll-scrubbed parametric WebGL visual demonstrating unique line behavior:
       - `psf-regenerated` & `psf-virgin`: `bundle` (opens baled fibre bundle and crimped cross-section).
       - `wadding`: `loft` (thermal-bonded loft expansion and elasticity recovery).
       - `felt`: `felt` (loose fibre interlocking into needle-punched mat).
       - `interlining`: `weave` (warp and weft lattice locking into woven/fusible sheet).
     - **Production Photo & Technical Sheet**: High-definition factory imagery and spec parameters.
     - **Manufacturing Route Ladder (`.sp-route`)**: Step-by-step station journey (`PRODUCT_ROUTES`) detailing exact machinery and quality checkpoints per line.
  4. **Section 03 · Pinned 3D Manufacturing Chapter (`ProcessScrollChapter`)**:
     - 380vh dark scroll-pinned chapter that animates the 4 extrusion stages in real-time WebGL (Sorting → Extrusion → Drawing/Crimping → Baling).
  5. **Section 04 · Inside The Plant Factory Showcase (`CompanyVideoScrollStory`)**:
     - Dual video player showcasing real factory operations and high-precision spinning line machinery with independent audio/play toggles.
  6. **Section 05 · Commercial Supply & Logistics Terms (`sp-dark`)**:
     - Standard 280 kg moisture-sealed baling, container stuffing coordination, and in-house COA export documentation.
  7. **Section 06 · Commercial Close**:
     - High-impact closing statement (`Tell us the count. We will quote the bale.`) and quotation CTA.

---

### 3. Services Page (`/services` — `app/services/page.tsx`)
* **Role**: Custom manufacturing capabilities, toll processing, and order lifecycle.
* **Interactive Features**:
  - **Capabilities Grid**: Custom denier selection, optical color matching, cut-length modification, and packaging options.
  - **Extrusion 3D Scene**: Real-time simulation of spinneret filament extrusion.
  - **7-Step Customer Journey (`JourneyChapter`)**: Sticky big-number progress rail paired with 7 milestone cards walking from initial spec review to export delivery.
  - **Production Sequence & Packing**: Container loadout standards, palletizing, and moisture-barrier bailing.

---

### 4. Sustainability Page (`/sustainability` — `app/sustainability/page.tsx`)
* **Role**: Circular economy proof, GRS chain-of-custody, and resource stewardship.
* **Interactive Features**:
  - **GRS Chain-of-Custody**: Explainer on post-consumer PET collection and optical sorting.
  - **3D Circular Transformation**: Parametric scene transitioning from plastic flakes to high-tenacity filament.
  - **Pinned Lifecycle Chapter (`ProcessScrollChapter variant="circular"`)**: Scroll-linked 3D simulation of closed-loop recycling.
  - **Volume Planner Calculator**: Verified interactive calculator converting customer requirement tonnage into exact 280 kg bale counts.
  - **Honest Data Slots**: Labelled placeholders for unverified environmental figures awaiting laboratory auditing.

---

### 5. Quality & Compliance Page (`/quality` — `app/quality/page.tsx`)
* **Role**: Accredited standards, testing methods, and batch traceability.
* **Interactive Features**:
  - **Registration Cards**: Direct breakdown of ISO 9001:2015, GRS, OEKO-TEX Standard 100, and LCCI.
  - **Cross-Section 3D Verification**: Parametric geometric wedge displaying filament uniformity.
  - **Testing Protocols**: Tensile strength (Instron), crimp frequency, cut length distribution, and moisture content analysis.
  - **Certificate of Analysis (COA) Viewer**: Breakdown of batch reports shipped with every container.

---

### 6. Company & Heritage Page (`/company` — `app/company/page.tsx`)
* **Role**: 10-chapter documentary chronicling 25+ years of Pakistani industrial leadership.
* **Interactive Features**:
  - **Documentary Hero & Verified Stats**: High-impact introduction with verified production scale.
  - **Scroll-Lit Timeline (`TimelineChapter`)**: Vertical progress rail illuminating milestone years as the user scrolls.
  - **Executive Chapters (`PeopleChapter`)**: Managing Director feature with quote block, founder recognition, and management team placeholders.
  - **Certification Gallery (`CertificationGallery`)**: High-resolution certificate inspection cards with interactive modal lightbox (Escape/focus accessible).
  - **Company Film**: Full-resolution manufacturing tour.

---

### 7. Gallery — The Visual Archive (`/gallery` — `app/gallery/page.tsx`)
* **Role**: The visual archive of what the company actually looks like — factory, materials, manufacturing, products, quality, people and sustainability.
* **Data Architecture** (`lib/data/gallery.ts`):
  - `GalleryItem { id, title, category, image, description, alt, tags, year?, relatedProduct?, relatedPage?, status }` — the client swaps assets by filling one entry; no restructuring needed.
  - 19 entries across 7 categories; items with `image: null` render as labelled placeholder frames (`CONTENT_REQUIRED`), never stock imagery.
* **Interactive Features**:
  - **Category Filtering**: `sp-gfilter` chips with live counts (aria-pressed).
  - **Editorial Grid**: `GalleryGrid.tsx` masonry tiles with scrim, category and title overlay.
  - **Lightbox**: Full keyboard navigation (Escape closes, arrow keys browse), focus management (Close focused on open, focus returns to originating tile), metadata panel (category, year, description, tags, Provenance, related-page link), prev/next arrows, position counter.
  - **"Growing The Archive"**: Dark band explaining the 3-step supply process for new photographs.
* **Integration**: Exposed in Header/Desktop+Mobile nav, Footer quicklinks, global search (Ctrl/Cmd+K — archive entries are searchable), and chatbot ("gallery" intent with archive card).

---

### 8. Contact & Quotation Page (`/contact` — `app/contact/page.tsx`)
* **Role**: Multi-path commercial inquiry and Request for Quotation (RFQ) desk.
* **Interactive Features**:
  - **5 Inquiry Paths**: Quotation, Sample Request, Technical Inquiry, Product Question, General Desk (dynamically adapts form prompts).
  - **Validated RFQ Form**: Validates Company, Name, Email, Phone, Country, Denier, and Expected Volume.
  - **3D Fibre Bundle Visual**: Interactive ambient filament scene.
  - **Verified Channel Slots**: Clear contact placeholders for verified email and direct lines.

---

## 3. Global Infrastructure & Systems

### 1. Parametric 3D Engine (`components/three/`)
* **Core Philosophy**: Zero heavy 3D models (.gltf/.obj). Everything is built mathematically using Three.js `InstancedMesh` in a single draw call.
* **Variants**:
  - `bundle`: Opens filaments to reveal crimped cross-sections.
  - `extrusion`: Simulates molten polymer drawing through spinnerets.
  - `circular`: Visualizes bottle flakes turning into pure fibre.
  - `loft`: Demonstrates wadding layers expanding in volume.
  - `felt`: Simulates loose fibres locking under needle punching.
  - `weave`: Warp and weft threads interlacing into technical lining.
  - `process`: 4-state anchor transformation from polymer to finished bale.
* **Performance Guardrails**:
  - `MaterialCanvas.tsx` dynamically imports Three.js only when entering viewport (IntersectionObserver).
  - WebGL is automatically disabled on devices `< 768px` or when `prefers-reduced-motion` is enabled, seamlessly rendering real Next.js `<Image />` photography instead.

---

### 2. Smooth Scrolling (`LenisProvider.tsx`)
* Integrated via `@studio-freight/lenis` linked to GSAP `ticker`.
* Synchronizes `ScrollTrigger.update()` on every frame for buttery-smooth 60Hz, 120Hz (ProMotion), and 144Hz displays.
* Modals and chatbot incorporate `data-lenis-prevent` to allow independent mouse wheel scrolling without page jumping.

---

### 3. Theme System & Styling Tokens (`app/globals.css` & `ThemeProvider.tsx`)
* **Light / Dark Dual Theme**: State is managed in `ThemeProvider.tsx` and persisted in `localStorage`.
* **CSS Custom Properties**:
  - Light: `--ivory: #F6F8FC`, `--burg-primary: #0A4BB8`, `--ink: #0A1128`, `--glass-card-bg: rgba(255, 255, 255, 0.85)`
  - Dark: `--ivory: #060D1A`, `--burg-primary: #1D78FF`, `--ink: #F8FAFC`, `--glass-card-bg: rgba(11, 23, 46, 0.85)`
* **Typography**:
  - Headings: `Inter` (900 uppercase) paired with `Cormorant Garamond` (600 italic accents).
  - Engineering Specs: `JetBrains Mono` for denier tables and batch markings.

---

### 4. AI Chat Assistant (`components/chat/ChatAssistant.tsx`)
* **Knowledge Source**: `lib/data/chatbot.ts` strictly referencing verified facts in `lib/data/company.ts`.
* **Features**:
  - Intent scoring matching ~15 customer inquiry categories.
  - Interactive `ChatCard` components linking directly to specific product sections.
  - Keyboard accessible, ARIA live region announcements, and rating feedback.

---

## 4. Single Source of Truth (`lib/data/company.ts`)

| Metric | Verified Value | Scope / Notes |
| :--- | :--- | :--- |
| **Legal Name** | `Gulf Fibre Company (PVT) Limited` | Incorporated in Pakistan |
| **Established** | `1999` | **25+ Years in Business** |
| **Annual Capacity** | **`15,000 MT`** | 15,000 Metric Tons / Year |
| **Customers Served**| **`350+`** | Spinning, wadding, nonwoven |
| **Workforce** | **`250+`** | Engineers, technicians, QA |
| **Denier Range** | **`1.2D to 60D`** | Micro-denier to heavy industrial |
| **Bale Weight** | **`280 kg`** | Standard moisture-barrier bale |
| **Certifications** | **`4+`** | ISO 9001:2015, GRS, OEKO-TEX, LCCI |

---

## 5. Verification & Build Status

* **TypeScript Compilation**: `100% clean` (0 errors).
* **ESLint Verification**: `100% clean` (0 errors, 0 warnings).
* **Next.js Production Build**: All 10 routes prerendered statically (`○ Static`).
