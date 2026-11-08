// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'HMI Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Professional portfolio of Hafizh Muhammad Irfansyah - IT Programmer, UI/UX Designer & Web Developer based in Surabaya. Experienced in Vue.js, Laravel, React.js, Django, and Modern UI/UX.',
        },
        {
          name: 'keywords',
          content:
            'Hafizh Muhammad Irfansyah, IT Programmer, Web Developer Surabaya, UI/UX Designer, Frontend Developer, Vue.js, Laravel, React.js, Django, Nuxt.js, Portfolio Developer',
        },
        { name: 'author', content: 'Hafizh Muhammad Irfansyah' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'HMI Portfolio' },
        {
          property: 'og:description',
          content:
            'Professional portfolio of Hafizh Muhammad Irfansyah - IT Programmer, UI/UX Designer & Web Developer. Explore featured web projects, work experience, and verified certifications.',
        },
        { property: 'og:image', content: '/foto-utama.png' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'HMI Portfolio' },
        {
          name: 'twitter:description',
          content:
            'Professional portfolio of Hafizh Muhammad Irfansyah - IT Programmer, UI/UX Designer & Web Developer.',
        },
        { name: 'twitter:image', content: '/foto-utama.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/HMI%20Favicon.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/HMI%20Favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
      ],
      script: [
        { src: 'https://cdn.tailwindcss.com' },
        {
          innerHTML: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
                  },
                  colors: {
                    purple: {
                      50: '#eef2ff',
                      100: '#e0e7ff',
                      200: '#c7d2fe',
                      300: '#a5b4fc',
                      400: '#818cf8',
                      500: '#6366f1',
                      600: '#415FFF',
                      700: '#324ecc',
                      800: '#273da3',
                      900: '#1e2f7d',
                      950: '#141d52',
                    },
                    brand: {
                      50: '#eef2ff',
                      100: '#e0e7ff',
                      200: '#c7d2fe',
                      300: '#a5b4fc',
                      400: '#818cf8',
                      500: '#6366f1',
                      600: '#415FFF',
                      700: '#324ecc',
                      800: '#273da3',
                      900: '#1e2f7d',
                      950: '#141d52',
                    }
                  }
                }
              }
            }
          `,
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Hafizh Muhammad Irfansyah',
            jobTitle: 'IT Programmer, UI/UX Designer & Web Developer',
            alumniOf: 'Universitas Telkom Surabaya',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Surabaya',
              addressCountry: 'Indonesia',
            },
            sameAs: [
              'https://linkedin.com/in/hfizh-irfansyah',
              'https://github.com/hfizhirfan',
            ],
            knowsAbout: [
              'Web Development',
              'UI/UX Design',
              'Graphic Design',
              'Vue.js',
              'React.js',
              'Laravel',
              'Django',
              'Nuxt.js',
              'Tailwind CSS',
            ],
          }),
        },
      ],
    },
  },
})
