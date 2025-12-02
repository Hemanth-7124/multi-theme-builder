export default defineNuxtConfig({
   ssr: false,
  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  experimental: {
    payloadExtraction: false
  }
})
