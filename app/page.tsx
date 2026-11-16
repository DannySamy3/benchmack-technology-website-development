import { Hero } from '@/components/home/hero'
import { HomeCta } from '@/components/home/home-cta'
import { ProcessOverview } from '@/components/home/process-overview'
import { SelectedWork } from '@/components/home/selected-work'
import { ServicesOverview } from '@/components/home/services-overview'
import { TechnologyOverview } from '@/components/home/technology-overview'
import { Testimonials } from '@/components/home/testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <SelectedWork />
      <TechnologyOverview />
      <ProcessOverview />
      <Testimonials />
      <HomeCta />
    </>
  )
}
