import { applyBrandTheme } from './applyTokens'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Apply brand tokens when the app starts
  const route = useRoute()
  const brandId = route.params.brand as string

  if (brandId) {
    try {
      // Load brand configuration
      const { config: brandConfig } = await useBrand(brandId)

      // Apply brand tokens to the document
      if (brandConfig?.theme) {
        // Apply the brand theme directly using token engine
        const { tokenEngine } = await import('../../tokens/engine')
        tokenEngine.applyTokens(brandConfig.theme, brandConfig.id)
      } else {
        console.warn('No theme found for brand:', brandConfig)
      }
    } catch (error) {
      console.error('Failed to apply brand tokens:', error)
    }
  }

  // Watch for route changes to apply new brand tokens
  nuxtApp.hook('page:start', async () => {
    const currentBrandId = useRoute().params.brand as string

    if (currentBrandId && currentBrandId !== brandId) {
      try {
        const { config: brandConfig } = await useBrand(currentBrandId)

        if (brandConfig?.theme) {
          const { tokenEngine } = await import('../../tokens/engine')
          tokenEngine.applyTokens(brandConfig.theme, brandConfig.id)
        } else {
          console.warn('No theme found for brand (route change):', brandConfig)
        }
      } catch (error) {
        console.error('Failed to switch brand tokens:', error)
      }
    }
  })
})