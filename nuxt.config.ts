export default defineNuxtConfig({
  ssr: true,

  modules: [
   
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    preset: 'netlify'
  },

  css: [
    '~/assets/css/main.css'
  ]
})
