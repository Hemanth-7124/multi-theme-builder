export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@netlify/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    preset: 'netlify'
  },

  css: [
    '~/assets/css/main.css'
  ]
})
