import { HeroSection } from '@/components/sections/HeroSection'
import { FabricMarquee } from '@/components/sections/FabricMarquee'
import { ProductCollection } from '@/components/sections/ProductCollection'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { QualitySection } from '@/components/sections/QualitySection'
import { StatsBar } from '@/components/sections/StatsBar'
import { QualityStory } from '@/components/sections/QualityStory'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { AdvantagesSection } from '@/components/sections/AdvantagesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ConsultationCTA } from '@/components/sections/ConsultationCTA'
import { TrustBanner } from '@/components/sections/TrustBanner'
import { SustainabilitySection } from '@/components/sections/SustainabilitySection'
import { AboutStats } from '@/components/sections/AboutStats'
import { FloatingActions } from '@/components/layout/FloatingActions'

export default function Home() {
  return (
    <>
      {/* 01. Hero & Metrics */}
      <HeroSection />

      {/* 02. What We Supply Marquee */}
      <FabricMarquee />

      {/* 03. Product Collection */}
      <ProductCollection />

      {/* 04. Technical Sales Strip */}
      <ContactStrip />

      {/* 05. Services & Capabilities */}
      <ServicesSection />

      {/* 06. Quality & Testing */}
      <QualitySection />

      {/* 07. Company Scale & Reach */}
      <StatsBar />

      {/* 08. Company & Manufacturing Story */}
      <QualityStory />

      {/* 09. Manufacturing Process */}
      <ProcessSection />

      {/* 10. Applications */}
      <AdvantagesSection />

      {/* 11. Sustainability */}
      <SustainabilitySection />

      {/* 12. Certifications & Trust */}
      <TrustBanner />

      {/* 13. Technical Insights */}
      <BlogSection />

      {/* 14. Final RFQ CTA */}
      <ConsultationCTA />

      {/* Global Utilities */}
      <FloatingActions />
    </>
  )
}
