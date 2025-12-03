import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    // Get the project root directory
    const projectRoot = process.cwd()
    const brandsDir = path.join(projectRoot, 'brands')

    // Check if brands directory exists
    try {
      await fs.access(brandsDir)
    } catch (error) {
      return {
        brands: [],
        error: 'Brands directory not found'
      }
    }

    // Read the brands directory
    const items = await fs.readdir(brandsDir, { withFileTypes: true })

    // Filter for directories only
    const brandDirs = items
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    // Filter for directories that contain config.ts
    const validBrands = await Promise.all(
      brandDirs.filter(async (brand) => {
        const configPath = path.join(brandsDir, brand, 'config.ts')
        try {
          await fs.access(configPath)
          return true
        } catch {
          return false
        }
      })
    )

    return {
      brands: validBrands.sort(), // Sort alphabetically
      count: validBrands.length
    }

  } catch (error) {
    console.error('Error discovering brands:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to discover brands'
    })
  }
})