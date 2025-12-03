export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxt/icon',
   
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    preset: 'netlify'
  },

  css: [
    '~/assets/css/main.css'
  ]
})
