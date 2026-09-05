export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  accentColor: string
  tags: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  employmentType: string
  period: string
  description: string
  techStack: string[]
  type: 'experience' | 'project'
  featured?: boolean
}

export interface AchievementItem {
  id: string
  title: string
  issuer: string
  issuerLogo?: string
  date: string
  type: 'award' | 'certification'
  credentialUrl?: string
  certificateImage?: string
  badgeText: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  label: string
}

export const heroData = {
  greeting: 'Hello, there',
  name: 'Hafizh Muhammad Irfansyah',
  role: 'IT Programmer, UI/UX Designer & Web Developer',
  shortDescription:
    'Information Systems graduate from Telkom University Surabaya with hands-on experience in user interface design and web application development using JavaScript, Vue.js, and PHP (Laravel). Recognized as an analytical, creative, and highly motivated professional dedicated to building impactful digital solutions.',
  portraitImage: '/foto-utama.png',
  portraitAlt: 'Hafizh Muhammad Irfansyah',
  cvIndo: '/CV_Hafizh Muhammad Irfansyah.pdf',
  cvEnglish: '/CV_Hafizh Muhammad Irfansyah English.pdf',
  portfolioPdf: '/Portfolio HMI.pdf',
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/hfizh-irfansyah',
      icon: 'linkedin',
      label: 'LinkedIn Profile',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/hfizhirfan',
      icon: 'github',
      label: 'GitHub Repository',
    },
  ],
  stats: [
    { value: '3+', label: 'Years of Design & Web Experience' },
    { value: '10+', label: 'Featured Projects & Systems' },
    { value: '6+', label: 'Professional Certifications' },
  ],
}

export const aboutData = {
  eyebrow: 'About Me',
  title: 'Bridging Visual Aesthetics with Robust Digital System Architecture',
  fullName: 'Hafizh Muhammad Irfansyah',
  description:
    'Designer and Web Developer skilled in graphic design, crafting intuitive user interfaces, and building interactive web applications. Experienced in turning ideas into functional and aesthetically pleasing digital solutions, with a strong background working in dynamic and agile creative teams.',
  extendedDescription:
    'As an Information Systems graduate from Telkom University Surabaya, I specialize in bridging the gap between engaging user experiences (UI/UX) and powerful back-end logic—from wireframing and interactive prototypes to enterprise-grade production systems.',
  image: '/foto about me.png',
  location: 'Surabaya, East Java, Indonesia',
  status: 'Available for Opportunities',
}

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Front-end & Full-stack Development',
    description:
      'Building responsive web interfaces and full-stack systems. Experienced in taking projects from initial MVP to production scale using Vue.js, React.js, Nuxt.js, Laravel, Django, MySQL, and PostgreSQL.',
    icon: 'terminal',
    accentColor: 'from-violet-500 to-indigo-600',
    tags: ['Vue.js', 'React.js', 'Nuxt.js', 'Laravel', 'Django', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'User Interface & Experience Research',
    description:
      'Designing user interfaces for mobile and desktop platforms, identifying core user problems, crafting wireframes, building high-fidelity prototypes, and conducting usability testing using Figma and Human-Centered Design principles.',
    icon: 'design_services',
    accentColor: 'from-cyan-500 to-blue-600',
    tags: ['Figma', 'Human-Centered Design', 'Wireframing', 'Prototyping', 'Usability Testing'],
  },
  {
    id: 'graphic-video',
    title: 'Graphic Design & Video',
    subtitle: 'Visual Identity & Motion Content',
    description:
      'Producing high-impact promotional materials (brochures, banners), corporate profile videos, and interactive marketing media using Adobe Photoshop, Premiere Pro, After Effects, and CorelDraw.',
    icon: 'movie_edit',
    accentColor: 'from-amber-500 to-rose-600',
    tags: ['Adobe Photoshop', 'Premiere Pro', 'After Effects', 'CorelDraw', 'Visual Branding'],
  },
]

export const experiencesAndProjects: ExperienceItem[] = [
  // --- Work Experiences ---
  {
    id: 'exp-1',
    role: 'IT Programmer',
    company: 'PT. Media Bersama Sukses',
    employmentType: 'Contract',
    period: 'Nov 2025 - Present',
    description:
      'Developing and maintaining interactive web applications, integrating modern front-end components, and managing enterprise digital content.',
    techStack: ['Vue.js', 'React.js', 'WordPress', 'HTML5', 'CSS3', 'JavaScript'],
    type: 'experience',
    featured: true,
  },
  {
    id: 'exp-2',
    role: 'Front-end Web Developer',
    company: 'PT. Mitra Tekno Persada',
    employmentType: 'Internship',
    period: 'Jun 2024 - Aug 2024',
    description:
      'Built component-based user interface modules using Vue.js while ensuring design consistency, cross-browser compatibility, and mobile responsiveness.',
    techStack: ['Vue.js', 'REST API', 'JavaScript', 'Tailwind CSS'],
    type: 'experience',
  },
  {
    id: 'exp-3',
    role: 'Graphic Designer & Layout',
    company: 'CV. Vio Indonesia',
    employmentType: 'Contract',
    period: 'Jul 2019 - Sep 2021',
    description:
      'Designed promotional print and digital visual assets, product packaging layouts, brand guidebooks, and corporate branding identity materials.',
    techStack: ['CorelDraw', 'Adobe Photoshop', 'Print Production', 'Layouting'],
    type: 'experience',
  },

  // --- Featured Projects ---
  {
    id: 'proj-1',
    role: 'Full-stack Developer',
    company: 'Browsbyveron',
    employmentType: 'Beauty Studio Web',
    period: 'Jun 2026 - Present',
    description:
      'Continuously develop and customize additional features for a beauty studio website from the MVP phase, utilizing a Vue.js frontend and Django backend to accommodate dynamic client requirements.',
    techStack: ['Vue.js', 'Django', 'REST API', 'Tailwind CSS', 'PostgreSQL'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-2',
    role: 'WordPress Developer',
    company: 'PT. Pancar Cahaya Terang Landing Page',
    employmentType: 'Company Profile',
    period: 'Jun 2026 - Jul 2026',
    description:
      "Built a company profile landing page website using WordPress to strengthen the client's digital business visibility.",
    techStack: ['WordPress', 'Elementor', 'PHP', 'HTML5', 'CSS3'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-3',
    role: 'Full-stack Developer',
    company: 'Warehouse Management System',
    employmentType: 'Enterprise System',
    period: 'Mar 2026 - Apr 2026',
    description:
      'Designed the initial architecture (MVP) for the digitalization of a warehouse recording system, migrating from a manual Excel format to a web application using Nuxt.js, Laravel, and PostgreSQL.',
    techStack: ['Nuxt.js', 'Laravel', 'PostgreSQL', 'Pinia', 'Tailwind CSS'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-4',
    role: 'Front-end Developer',
    company: 'Otopark (Automatic Parking System)',
    employmentType: 'IoT & Automation',
    period: 'Jan 2026 - Mar 2026',
    description:
      'Developed an automatic parking system using React.js for the monitoring interface and Django for the admin dashboard, and integrated Raspberry Pi hardware for gate control automation.',
    techStack: ['React.js', 'Django', 'Raspberry Pi', 'Tailwind CSS', 'WebSockets'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-5',
    role: 'Front-end Developer',
    company: 'HiviPlay',
    employmentType: 'Sports Highlights App',
    period: 'Nov 2025 - Dec 2025',
    description:
      'Contributed to the development of a sports match highlight recording application using Vue.js, integrated with a Django backend system.',
    techStack: ['Vue.js', 'Django', 'REST API', 'JavaScript', 'CSS3'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-6',
    role: 'Full-stack Developer',
    company: 'Employee Attendance Website',
    employmentType: 'HR & Attendance System',
    period: 'Jun 2025',
    description:
      'Developed an employee attendance system website using Laravel and MySQL to streamline attendance tracking and manage employee data efficiently.',
    techStack: ['Laravel', 'MySQL', 'Blade', 'Bootstrap', 'PHP'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-7',
    role: 'Front-end Developer',
    company: 'Roti Alit Website',
    employmentType: 'E-Commerce Storefront',
    period: 'Mar 2025',
    description:
      'Developed an e-commerce website using Laravel, MySQL, and Docker to support product sales, as an extension of a university assignment project.',
    techStack: ['Laravel', 'MySQL', 'Docker', 'Vue.js', 'Tailwind CSS'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-8',
    role: 'UI/UX Designer',
    company: 'MOOC Unocos (Final Year Project Research)',
    employmentType: 'Education Platform Research',
    period: 'Oct 2024 - Dec 2024',
    description:
      'Designed the user interface and user experience for a MOOC platform using the IDEO Human-Centered Design method, utilizing Figma and Adobe Photoshop for supporting assets, as part of a final year thesis project.',
    techStack: ['Figma', 'Human-Centered Design', 'UI/UX Research', 'Adobe Photoshop', 'Wireframing'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-9',
    role: 'Front-end Developer',
    company: 'Kampungbebek.com',
    employmentType: 'Community Profile',
    period: 'May 2024 - Jul 2024',
    description:
      'Developed a website using Laravel and MySQL as part of a community service program in Kampung Bebek, Kebonsari, Sidoarjo Regency.',
    techStack: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript', 'PHP'],
    type: 'project',
    featured: true,
  },
  {
    id: 'proj-10',
    role: 'Video Editor',
    company: 'UKM CODER Profile Video',
    employmentType: 'Profile Video & Motion',
    period: 'Jul 2022 - Aug 2022',
    description:
      'Edited a profile video using Adobe Premiere Pro and Adobe After Effects to deliver engaging and dynamic visual transitions.',
    techStack: ['Adobe Premiere Pro', 'Adobe After Effects', 'Video Production', 'Motion Graphics'],
    type: 'project',
    featured: true,
  },
]

export const achievementsData: AchievementItem[] = [
  {
    id: 'achieve-1',
    title: '3rd Place Winner - Satu Data Data Visualization Infographic Competition',
    issuer: 'Airlangga University',
    date: 'Nov 2023',
    type: 'award',
    badgeText: '3rd Place Winner',
    certificateImage: '/SatuData - OLO.jpg',
  },
  {
    id: 'cert-1',
    title: 'HR050 - Business Processes in Human Capital Management',
    issuer: 'SAP',
    issuerLogo: '/sap_logo.jpg',
    date: '2023',
    type: 'certification',
    badgeText: 'Enterprise System',
    credentialUrl: 'http://check.upp-sap.com:88/validasi%20sertifikat/hasil%20query.php?id=30303030303130303739303030313136&view=View',
  },
  {
    id: 'cert-2',
    title: 'BC400 - Introduction to the ABAP Workbench',
    issuer: 'SAP',
    issuerLogo: '/sap_logo.jpg',
    date: '2024',
    type: 'certification',
    badgeText: 'Enterprise Development',
    credentialUrl: 'http://check.upp-sap.com:88/validasi%20sertifikat/hasil%20query.php?id=30303030303130383833303030313031&view=View',
  },
  {
    id: 'cert-3',
    title: 'MongoDB PHP Developer Path',
    issuer: 'MongoDB',
    issuerLogo: '/mongodbinc_logo.jpg',
    date: '2025',
    type: 'certification',
    badgeText: 'Database Certification',
    credentialUrl: 'https://learn.mongodb.com/c/KbEanYgFS8e5dsAXIo9-DA',
  },
  {
    id: 'cert-4',
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    issuerLogo: '/anthropicresearch_logo.jpg',
    date: '2026',
    type: 'certification',
    badgeText: 'AI & API Integration',
    credentialUrl: 'https://verify.skilljar.com/c/64nmpfo2i2u5',
  },
  {
    id: 'cert-5',
    title: 'Prompt Engineering untuk Software Developer',
    issuer: 'Dicoding Indonesia',
    issuerLogo: '/dicoding_logo.jpg',
    date: '2026',
    type: 'certification',
    badgeText: 'AI in Software Engineering',
    credentialUrl: 'https://www.dicoding.com/certificates/N9ZO2KE2RPG5',
  },
  {
    id: 'cert-6',
    title: 'Agile Project Management',
    issuer: 'Google',
    issuerLogo: '/google_logo.jpg',
    date: '2026',
    type: 'certification',
    badgeText: 'Project Management',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/OC8I3407CII6',
  },
]

export const contactData = {
  eyebrow: "Let's Connect",
  title: 'Ready to Collaborate and Bring Your Digital Vision to Life',
  description:
    'Feel free to reach out if you have any questions, collaboration opportunities, or simply want to connect.',
  email: 'hafizh.irfansyah41@gmail.com',
  phone: '+62 878 5284 3203',
  whatsappUrl: 'https://wa.me/6287852843203',
  location: 'Surabaya, East Java, Indonesia',
}
