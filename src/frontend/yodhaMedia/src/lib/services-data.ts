export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: string
  color: string
  features: string[]
  process: { step: number; title: string; desc: string }[]
  benefits: string[]
  industries: string[]
}

export const services: Service[] = [
  {
    slug: 'seo-search',
    title: 'SEO & Search',
    shortDesc: 'Dominate search rankings and drive organic traffic that converts.',
    description:
      'Our data-driven SEO strategies help healthcare providers and businesses climb to the top of search results, bringing in patients and clients who are actively looking for your services.',
    icon: '🔍',
    color: '#2d1b69',
    features: [
      'Local SEO optimization',
      'Google Business Profile management',
      'Technical SEO audits',
      'Keyword research & strategy',
      'Link building campaigns',
      'Content optimization',
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Comprehensive SEO audit of your current presence' },
      { step: 2, title: 'Strategy', desc: 'Custom keyword and content strategy development' },
      { step: 3, title: 'Optimize', desc: 'On-page and technical optimizations' },
      { step: 4, title: 'Build', desc: 'Authority building through quality link acquisition' },
    ],
    benefits: ['Higher organic rankings', 'More qualified traffic', 'Long-term ROI', 'Brand visibility'],
    industries: ['Hospitals', 'Clinics', 'Diagnostic Centers', 'Pharmacies'],
  },
  {
    slug: 'social-media',
    title: 'Social Media',
    shortDesc: 'Build authentic connections and grow your brand across all platforms.',
    description:
      'From Instagram health tips to LinkedIn thought leadership, we craft social media strategies that position you as the go-to authority in your field.',
    icon: '📱',
    color: '#4a2d9e',
    features: [
      'Platform strategy & setup',
      'Content calendar creation',
      'Graphic & video production',
      'Community management',
      'Paid social campaigns',
      'Influencer partnerships',
    ],
    process: [
      { step: 1, title: 'Discover', desc: 'Understand your audience and competitive landscape' },
      { step: 2, title: 'Create', desc: 'Develop branded content that resonates' },
      { step: 3, title: 'Publish', desc: 'Strategic posting at optimal times' },
      { step: 4, title: 'Engage', desc: 'Active community management and growth' },
    ],
    benefits: ['Brand awareness', 'Patient trust building', 'Community growth', 'Referral traffic'],
    industries: ['Doctors', 'Wellness Brands', 'Health Tech', 'Modern Businesses'],
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    shortDesc: 'Educate, engage, and convert with authoritative content.',
    description:
      'We create medically accurate, engaging content that builds trust with patients and positions your practice as the leading authority in your specialty.',
    icon: '✍️',
    color: '#d4a017',
    features: [
      'Blog writing & management',
      'Medical article creation',
      'Video script writing',
      'Email newsletters',
      'Case study development',
      'Whitepaper production',
    ],
    process: [
      { step: 1, title: 'Research', desc: 'Topic research and content gap analysis' },
      { step: 2, title: 'Create', desc: 'Expert content creation and review' },
      { step: 3, title: 'Optimize', desc: 'SEO optimization for maximum reach' },
      { step: 4, title: 'Distribute', desc: 'Multi-channel content distribution' },
    ],
    benefits: ['Thought leadership', 'Organic traffic', 'Patient education', 'Lead generation'],
    industries: ['All Healthcare', 'Medical Devices', 'Pharma', 'Health Insurance'],
  },
  {
    slug: 'brand-strategy',
    title: 'Brand Strategy',
    shortDesc: 'Build a brand identity that commands trust and recognition.',
    description:
      'Your brand is your promise to patients and clients. We help you define, refine, and communicate your unique value in a crowded market.',
    icon: '🎨',
    color: '#1a0f3d',
    features: [
      'Brand identity development',
      'Logo & visual design',
      'Brand guidelines',
      'Messaging frameworks',
      'Website design & development',
      'Marketing collateral',
    ],
    process: [
      { step: 1, title: 'Discovery', desc: 'Deep dive into your values and vision' },
      { step: 2, title: 'Strategy', desc: 'Positioning and differentiation strategy' },
      { step: 3, title: 'Design', desc: 'Visual identity creation and refinement' },
      { step: 4, title: 'Launch', desc: 'Brand rollout across all touchpoints' },
    ],
    benefits: ['Professional credibility', 'Consistent identity', 'Patient confidence', 'Premium positioning'],
    industries: ['New Practices', 'Rebranding', 'Hospital Groups', 'Health Startups'],
  },
  {
    slug: 'analytics',
    title: 'Analytics & Insights',
    shortDesc: 'Data-driven decisions that maximize your marketing ROI.',
    description:
      'We transform complex marketing data into clear insights and actionable strategies that continuously improve your results.',
    icon: '📊',
    color: '#a07810',
    features: [
      'Google Analytics 4 setup',
      'Custom dashboard creation',
      'Conversion tracking',
      'ROI reporting',
      'Competitor analysis',
      'Monthly strategy reviews',
    ],
    process: [
      { step: 1, title: 'Setup', desc: 'Tracking and measurement infrastructure' },
      { step: 2, title: 'Collect', desc: 'Data collection and quality assurance' },
      { step: 3, title: 'Analyze', desc: 'Deep analysis and insight extraction' },
      { step: 4, title: 'Optimize', desc: 'Continuous improvement based on data' },
    ],
    benefits: ['Clear ROI visibility', 'Informed decisions', 'Budget optimization', 'Growth insights'],
    industries: ['All Sectors', 'Multi-Location', 'Enterprise Health', 'Growth-Stage Businesses'],
  },
  {
    slug: 'healthcare-marketing',
    title: 'Healthcare Marketing',
    shortDesc: 'Specialized marketing built for the unique needs of healthcare.',
    description:
      'Healthcare marketing requires specialized knowledge of regulations, patient psychology, and trust-building. We are your dedicated healthcare marketing partner.',
    icon: '🏥',
    color: '#4a2d9e',
    features: [
      'HIPAA-compliant marketing',
      'Patient acquisition campaigns',
      'Reputation management',
      'Online review strategy',
      'Telemedicine marketing',
      'Specialty practice marketing',
    ],
    process: [
      { step: 1, title: 'Assess', desc: 'Healthcare marketing audit and opportunity mapping' },
      { step: 2, title: 'Comply', desc: 'Ensure all marketing meets regulatory requirements' },
      { step: 3, title: 'Execute', desc: 'Multi-channel patient acquisition campaigns' },
      { step: 4, title: 'Retain', desc: 'Patient retention and loyalty programs' },
    ],
    benefits: ['Patient growth', 'Reputation enhancement', 'Regulatory compliance', 'Practice growth'],
    industries: ['Hospitals', 'Specialty Clinics', 'Diagnostic Centers', 'Nursing Homes'],
  },
]
