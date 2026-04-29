import type { Metadata } from 'next'
import { SERVICE_PAGES, getServiceBySlug } from '@/lib/services-data'
import { ServiceDetailClient } from './ServiceDetailClient'

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service | YodhaMedia' }
  return {
    title: service.meta.title,
    description: service.meta.description,
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  return <ServiceDetailClient slug={slug} />
}
