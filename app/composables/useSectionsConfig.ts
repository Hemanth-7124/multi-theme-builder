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
    const sharedResponse = await import('../shared/sections.json')
    const sharedSections = sharedResponse.default.defaultSections

    // Try to load brand-specific overrides
    let brandOverrides = null
    try {
      const brandResponse = await import(`../../brands/${brandId}/sections.json`)
      brandOverrides = brandResponse.default.overrides
    } catch (error) {
      // No brand-specific overrides found, use shared config only
      // Continue with shared config only
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

    // Filter sections based on the 5 visibility rules
    const visibleSections = Array.from(sectionsMap.values()).filter(section => {
      const defaultSection = sharedSections.find(s => s.id === section.id)
      const brandSection = brandOverrides?.[section.id]

      // Rule 5: If section exists in default config but not in brand config, do NOT show
      if (!brandSection) {
        return false
      }

      // Rule 4: If brandSection.visible === true AND defaultSection.visible === false, do NOT show
      if (brandSection.visible === true && defaultSection.visible === false) {
        return false
      }

      // Rule 2: If brandSection.visible === false and defaultSection.visible === true, do NOT show
      if (brandSection.visible === false && defaultSection.visible === true) {
        return false
      }

      // Rule 3: If both brandSection.visible === false AND defaultSection.visible === false, do NOT show
      if (brandSection.visible === false && defaultSection.visible === false) {
        return false
      }

      // Rule 1: If both configs define the section AND brandSection.visible === true AND defaultSection.visible === true, show
      return brandSection.visible === true && defaultSection.visible === true
    })

    // Sort visible sections by order
    const finalSections = visibleSections.sort((a, b) => a.order - b.order)

    return finalSections

  } catch (error) {
    console.error(`Failed to load sections configuration for brand "${brandId}":`, error)
    // Return fallback empty sections array
    return []
  }
}