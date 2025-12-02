import type { SectionConfig } from '../../tokens/types'

export const useSections = () => {
  /**
   * Sort sections by order and filter visible ones
   */
  const sortSections = (sections: SectionConfig[]): SectionConfig[] => {
    return [...sections]
      .filter(section => section.visible)
      .sort((a, b) => a.order - b.order)
  }

  /**
   * Get section by type
   */
  const getSectionsByType = (sections: SectionConfig[], type: SectionConfig['type']): SectionConfig[] => {
    return sections.filter(section => section.type === type && section.visible)
  }

  /**
   * Get section by ID
   */
  const getSectionById = (sections: SectionConfig[], id: string): SectionConfig | undefined => {
    return sections.find(section => section.id === id)
  }

  /**
   * Toggle section visibility
   */
  const toggleSectionVisibility = (sections: SectionConfig[], sectionId: string): SectionConfig[] => {
    return sections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    )
  }

  /**
   * Reorder sections
   */
  const reorderSections = (sections: SectionConfig[], sectionIds: string[]): SectionConfig[] => {
    const sectionMap = new Map(sections.map(section => [section.id, section]))

    return sectionIds.map((id, index) => {
      const section = sectionMap.get(id)
      if (section) {
        return { ...section, order: index + 1 }
      }
      return null
    }).filter(Boolean) as SectionConfig[]
  }

  /**
   * Add new section
   */
  const addSection = (sections: SectionConfig[], newSection: SectionConfig): SectionConfig[] => {
    return [...sections, newSection]
  }

  /**
   * Remove section
   */
  const removeSection = (sections: SectionConfig[], sectionId: string): SectionConfig[] => {
    return sections.filter(section => section.id !== sectionId)
  }

  /**
   * Update section content
   */
  const updateSectionContent = (
    sections: SectionConfig[],
    sectionId: string,
    content: Record<string, any>
  ): SectionConfig[] => {
    return sections.map(section =>
      section.id === sectionId
        ? { ...section, content: { ...section.content, ...content } }
        : section
    )
  }

  /**
   * Get next order number for new section
   */
  const getNextOrder = (sections: SectionConfig[]): number => {
    const maxOrder = Math.max(...sections.map(section => section.order), 0)
    return maxOrder + 1
  }

  return {
    sortSections,
    getSectionsByType,
    getSectionById,
    toggleSectionVisibility,
    reorderSections,
    addSection,
    removeSection,
    updateSectionContent,
    getNextOrder
  }
}