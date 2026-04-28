import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'
import { services } from '@/lib/services-data'

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="services.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">What We Offer</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Full-Service Digital Marketing for Healthcare
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From SEO to social media, from content to branding — every service you need to grow
              your practice or business in one place.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[var(--background)] py-20" data-ocid="services.grid.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[#d4a017]/40 hover:shadow-xl transition-all duration-300"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <span className="text-4xl mb-5 block">{service.icon}</span>
                  <h3 className="text-xl font-bold font-display text-[#2d1b69] dark:text-white mb-3 group-hover:text-[#d4a017] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017] mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm text-[#d4a017] font-semibold">
                    Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20" data-ocid="services.cta.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Not sure which service is right for you?
            </h2>
            <p className="text-gray-300 mb-8">
              Book a free consultation and our team will recommend the best strategy for your goals.
            </p>
            <Button variant="hero" asChild data-ocid="services.cta.primary_button">
              <Link href="/#cta">
                Get Free Consultation <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  )
}
