// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'HMI - Personal Portfolio',
      link: [
        { rel: 'icon', type: 'image/png', href: '/HMI%20Favicon.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/HMI%20Favicon.png' },
      ],
    },
  },
})
