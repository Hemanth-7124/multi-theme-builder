export default defineNuxtRouteMiddleware(async (to, from) => {
  const brandParam = to.params.brand as string

  // If there's no brand parameter, this middleware shouldn't run
  if (!brandParam) {
    return
  }

  // Validate brand parameter format
  if (brandParam.includes('.svg') || brandParam.includes('/') || brandParam.includes('\\') || brandParam.includes('..')) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid brand parameter format: "${brandParam}"`
    })
  }

  // Dynamically validate brand parameter
  try {
    const { useBrandExists } = await import('../composables/useBrand')
    const brandExists = await useBrandExists(brandParam)

    if (!brandExists) {
      // Get list of available brands for error message
      const { useDiscoverBrands } = await import('../composables/useBrand')
      const availableBrands = await useDiscoverBrands()

      throw createError({
        statusCode: 404,
        statusMessage: `Brand "${brandParam}" not found. Available brands: ${availableBrands.join(', ') || 'None'}`
      })
    }
  } catch (error) {
    // If brand validation fails, show 404
    throw createError({
      statusCode: 404,
      statusMessage: `Brand "${brandParam}" not found or configuration is invalid.`
    })
  }

  // Set brand in runtime config for access throughout app
  const config = useRuntimeConfig()
  config.app.brand = brandParam

  // Apply brand tokens when brand changes
  if (process.client && from.params.brand !== brandParam) {
    const { applyBrandTheme } = await import('~/plugins/applyTokens')

    try {
      // Load brand configuration dynamically
      const { useBrand } = await import('../composables/useBrand')
      const { config: brandConfig } = await useBrand(brandParam)

      if (brandConfig?.theme?.tokens) {
        // Apply brand-specific theme tokens
        applyBrandTheme(brandConfig.theme.tokens, brandParam)
      }
    } catch (error) {
      console.error(`Failed to apply tokens for brand "${brandParam}":`, error)
    }
  }
})