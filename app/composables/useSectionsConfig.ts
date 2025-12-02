import type { SectionConfig } from '../../tokens/types'

// Deep merge function for objects
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key] as any)
    } else {
      result[key] = source[key] as any
    }
  }

  return result
}

/**
 * Load sections configuration with brand-specific overrides
 */
export const useSectionsConfig = async (brandId: string): Promise<SectionConfig[]> => {
  try {
    // Load shared sections configuration
    const sharedResponse = await import('../../shared/sections.json')
    const sharedSections = sharedResponse.default.defaultSections

    // Try to load brand-specific overrides
    let brandOverrides = null
    try {
      const brandResponse = await import(`../../brands/${brandId}/sections.json`)
      brandOverrides = brandResponse.default.overrides
    } catch (error) {
      // No brand-specific overrides found, use shared config only
      console.log(`No sections overrides found for brand "${brandId}"`)
    }

    // Create a map of shared sections by ID for easy lookup
    const sectionsMap = new Map<string, SectionConfig>()
    sharedSections.forEach((section: SectionConfig) => {
      sectionsMap.set(section.id, section)
    })

    // Apply brand overrides
    if (brandOverrides) {
      for (const sectionId in brandOverrides) {
        const sharedSection = sectionsMap.get(sectionId)
        if (sharedSection) {
          // Deep merge the shared section with brand overrides
          const mergedSection = deepMerge(sharedSection, brandOverrides[sectionId])
          sectionsMap.set(sectionId, mergedSection)
        }
      }
    }

    // Convert back to array, filter by visibility, and sort by order
    const finalSections = Array.from(sectionsMap.values())
      .filter(section => section.visible !== false)
      .sort((a, b) => a.order - b.order)

    console.log(`Final sections for brand "${brandId}":`, finalSections.map(s => ({
      id: s.id,
      order: s.order,
      visible: s.visible,
      hasOverride: !!brandOverrides?.[s.id]
    })))

    return finalSections

  } catch (error) {
    console.error(`Failed to load sections configuration for brand "${brandId}":`, error)
    // Return fallback empty sections array
    return []
  }
}