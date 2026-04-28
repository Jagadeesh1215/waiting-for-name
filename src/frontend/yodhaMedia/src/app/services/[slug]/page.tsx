import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'
import { services } from '@/lib/services-data'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="service_detail.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">
              Our Services
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{service.icon}</span>
              <h1 className="text-4xl sm:text-5xl font-bold font-display">{service.title}</h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl">{service.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Features + Process */}
      <section className="bg-[var(--background)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold font-display text-[#2d1b69] dark:text-white mb-6">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#d4a017] shrink-0 mt-0.5" />
                  <span className="text-[var(--foreground)]">{f}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl font-bold font-display text-[#2d1b69] dark:text-white mb-6">
              Our Process
            </h2>
            <div className="space-y-4">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  data-ocid={`service_detail.process.step_${step.step}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center shrink-0">
                    <span className="text-[#d4a017] font-bold text-sm font-mono">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d1b69] dark:text-white">{step.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--muted)]/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-2xl font-bold font-display text-[#2d1b69] dark:text-white">
              Key Benefits
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b) => (
              <StaggerItem key={b}>
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                  <CheckCircle2 className="h-8 w-8 text-[#d4a017] mx-auto mb-3" />
                  <p className="font-semibold text-[#2d1b69] dark:text-white text-sm">{b}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[var(--background)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-2xl font-bold font-display text-[#2d1b69] dark:text-white">
              Industries We Serve
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {service.industries.map((ind) => (
              <span
                key={ind}
                className="px-5 py-2.5 rounded-full border border-[#2d1b69]/30 bg-[#2d1b69]/10 text-[#2d1b69] dark:text-[#d4a017] font-medium text-sm"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20" data-ocid="service_detail.cta.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Ready to get started with {service.title}?
            </h2>
            <p className="text-gray-300 mb-8">
              Let&apos;s talk about how we can grow your business with our {service.title} service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" asChild data-ocid="service_detail.cta.primary_button">
                <Link href="/#cta">
                  Get Free Consultation <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  )
}
