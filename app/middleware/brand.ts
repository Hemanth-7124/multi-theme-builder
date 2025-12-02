export default defineNuxtRouteMiddleware(async (to, from) => {
  const brandParam = to.params.brand as string

  // If there's no brand parameter, this middleware shouldn't run
  if (!brandParam) {
    return
  }

  // List of allowed brands
  const allowedBrands = ['chitti', 'uptor', 'pmc']

  // Validate brand parameter
  if (!allowedBrands.includes(brandParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Brand "${brandParam}" not found. Available brands: ${allowedBrands.join(', ')}`
    })
  }

  // Set brand in runtime config for access throughout app
  const config = useRuntimeConfig()
  config.app.brand = brandParam

  // Apply brand tokens when brand changes
  if (process.client && from.params.brand !== brandParam) {
    const { applyBrandTheme } = await import('~/plugins/applyTokens')

    try {
      // Load brand configuration using explicit imports
      let brandConfig

      switch (brandParam) {
        case 'chitti':
          brandConfig = await import('../../brands/chitti/config.ts')
          break
        case 'uptor':
          brandConfig = await import('../../brands/uptor/config.ts')
          break
        case 'pmc':
          brandConfig = await import('../../brands/pmc/config.ts')
          break
        default:
          console.warn(`Unknown brand: ${brandParam}`)
          return
      }

      if (brandConfig.default?.tokens) {
        // Apply brand-specific theme tokens
        applyBrandTheme(brandConfig.default.tokens, brandParam)
      }
    } catch (error) {
      console.error(`Failed to apply tokens for brand "${brandParam}":`, error)
    }
  }
})