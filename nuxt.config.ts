export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  nitro: {
    preset: 'netlify' // 👈 💥 REQUIRED
  },

  experimental: {
    payloadExtraction: false
  }
})
