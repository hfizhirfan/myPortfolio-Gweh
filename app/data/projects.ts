export type Project = {
  slug: string
  title: string
  description: string
  detail: string
  type: string
  accent: string
  image: string
  technologies: string[]
  liveUrl: string
}

export const projects: Project[] = [
  {
    slug: 'roti-alit',
    title: 'Roti Alit',
    description:
      'A responsive e-commerce storefront concept for a local bakery, focused on product browsing, clear visual hierarchy, and mobile-friendly ordering flow.',
    detail:
      'Roti Alit presents bakery products with a clean catalog experience, warm visual direction, and simple paths for customers to discover items quickly. The interface balances product imagery, readable content, and compact sections for repeated browsing.',
    type: 'E-Commerce - Website',
    accent: '#22b8b2',
    image: '/roti%20alit.png',
    technologies: ['Vue', 'UI Design', 'Responsive'],
    liveUrl: '#',
  },
  {
    slug: 'mooc-unocos',
    title: 'MOOC Unocos',
    description:
      'An online learning platform interface for course discovery, structured learning progress, and a focused student dashboard.',
    detail:
      'MOOC Unocos was designed around learning clarity: course modules, progress visibility, and predictable navigation. The design prioritizes calm spacing, direct actions, and a dashboard that helps students continue learning without friction.',
    type: 'Education Platform - UI/UX Design',
    accent: '#3f5cff',
    image: '/unocos.png',
    technologies: ['Figma', 'UX Flow', 'Dashboard'],
    liveUrl: '#',
  },
  {
    slug: 'kampung-bebek',
    title: 'Kampung Bebek',
    description:
      'A community profile website that introduces local identity, highlights activities, and communicates information through a friendly editorial layout.',
    detail:
      'Kampung Bebek combines community storytelling with practical website structure. The project emphasizes approachable visuals, content sections that are easy to scan, and responsive presentation for public-facing information.',
    type: 'Community Profile - Website',
    accent: '#e5a33b',
    image: '/kampung%20bebek.png',
    technologies: ['HTML', 'CSS', 'Content'],
    liveUrl: '#',
  },
]
