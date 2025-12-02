// Design Token Type Definitions
export interface ColorTokens {
  'color-primary': string
  'color-primary-hover': string
  'color-primary-active': string
  'color-secondary': string
  'color-secondary-hover': string
  'color-accent': string
  'color-accent-hover': string
  'color-background': string
  'color-surface': string
  'color-surface-hover': string
  'color-surface-active': string
  'color-text-primary': string
  'color-text-secondary': string
  'color-text-muted': string
  'color-text-inverse': string
  'color-border': string
  'color-border-hover': string
  'color-error': string
  'color-warning': string
  'color-success': string
  'color-info': string
}

export interface TypographyTokens {
  'font-family-sans': string
  'font-family-serif': string
  'font-family-mono': string
  'font-size-xs': string
  'font-size-sm': string
  'font-size-base': string
  'font-size-lg': string
  'font-size-xl': string
  'font-size-2xl': string
  'font-size-3xl': string
  'font-size-4xl': string
  'font-size-5xl': string
  'font-size-6xl': string
  'font-size-7xl': string
  'font-size-8xl': string
  'font-weight-light': string
  'font-weight-normal': string
  'font-weight-medium': string
  'font-weight-semibold': string
  'font-weight-bold': string
  'font-weight-extrabold': string
  'line-height-tight': string
  'line-height-normal': string
  'line-height-relaxed': string
  'letter-spacing-tight': string
  'letter-spacing-normal': string
  'letter-spacing-wide': string
}

export interface SpacingTokens {
  'spacing-0': string
  'spacing-1': string
  'spacing-2': string
  'spacing-3': string
  'spacing-4': string
  'spacing-5': string
  'spacing-6': string
  'spacing-7': string
  'spacing-8': string
  'spacing-9': string
  'spacing-10': string
  'spacing-11': string
  'spacing-12': string
  'spacing-14': string
  'spacing-16': string
  'spacing-20': string
  'spacing-24': string
  'spacing-28': string
  'spacing-32': string
  'spacing-36': string
  'spacing-40': string
  'spacing-44': string
  'spacing-48': string
  'spacing-52': string
  'spacing-56': string
  'spacing-60': string
  'spacing-64': string
  'spacing-72': string
  'spacing-80': string
  'spacing-96': string
}

export interface BorderRadiusTokens {
  'radius-none': string
  'radius-xs': string
  'radius-sm': string
  'radius-md': string
  'radius-lg': string
  'radius-xl': string
  'radius-2xl': string
  'radius-3xl': string
  'radius-full': string
}

export interface ShadowTokens {
  'shadow-xs': string
  'shadow-sm': string
  'shadow-md': string
  'shadow-lg': string
  'shadow-xl': string
  'shadow-2xl': string
  'shadow-inner': string
  'shadow-none': string
}

export interface DesignTokens {
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  borderRadius: BorderRadiusTokens
  shadows: ShadowTokens
}

// Flatten all tokens into key-value pairs for CSS variables
export type FlattenedTokens = {
  [K in keyof DesignTokens as DesignTokens[K] extends Record<string, string>
    ? `${string & K}-${string & keyof DesignTokens[K]}`
    : never]: string
}

export interface BrandAssets {
  logo: string
  favicon: string
  hero?: string
  icons?: Record<string, string>
  images?: Record<string, string>
}

export interface BrandTheme {
  layout: 'default' | 'modern' | 'minimal' | 'bold'
  assets: BrandAssets
  tokens: {
    colors: ColorTokens
    typography: TypographyTokens
    spacing: SpacingTokens
    borderRadius: BorderRadiusTokens
    shadows: ShadowTokens
  }
}

export interface BrandConfig {
  id: string
  name: string
  description: string
  theme: BrandTheme
  navigation: Array<{
    label: string
    href: string
  }>
  cta: {
    primary: string
    secondary: string
  }
}

// Component-specific token interfaces for targeted styling
export interface ButtonTokens {
  'button-primary-bg': string
  'button-primary-text': string
  'button-primary-border': string
  'button-primary-hover-bg': string
  'button-primary-padding': string
  'button-primary-radius': string
  'button-primary-font-size': string
  'button-primary-font-weight': string
  'button-primary-shadow': string

  'button-secondary-bg': string
  'button-secondary-text': string
  'button-secondary-border': string
  'button-secondary-hover-bg': string
  'button-secondary-hover-text': string
  'button-secondary-padding': string
  'button-secondary-radius': string
  'button-secondary-font-size': string
  'button-secondary-font-weight': string
}

export interface CardTokens {
  'card-bg': string
  'card-border': string
  'card-radius': string
  'card-padding': string
  'card-shadow': string
  'card-hover-shadow': string
  'card-hover-transform': string
}

export interface NavigationTokens {
  'nav-bg': string
  'nav-border': string
  'nav-height': string
  'nav-logo-size': string
  'nav-link-color': string
  'nav-link-hover-color': string
  'nav-link-weight': string
  'nav-link-spacing': string
}

export interface HeaderTokens extends NavigationTokens {
  'header-backdrop': boolean
  'header-sticky': boolean
}

export interface FooterTokens {
  'footer-bg': string
  'footer-border': string
  'footer-padding': string
  'footer-text-color': string
  'footer-link-color': string
}

export interface SectionConfig {
  id: string
  type: 'hero' | 'features' | 'cta' | 'footer' | 'faq' | 'about' | 'services' | 'testimonials' | 'highlights' | 'partners'
  visible: boolean
  order: number
  content: Record<string, any>
  styles?: {
    [key: string]: string
  }
}