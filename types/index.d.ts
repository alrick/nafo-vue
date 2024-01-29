import { INFORMATION_TYPES } from "@/types/constants"

declare module 'nuxt/schema' {
  interface AppConfigInput {
    title: string
    description: string
    mandant: {
      name: string
      url: string
    }
    copyright: string
    item: ItemConfig
    collection: CollectionConfig
  }
}

interface CollectionConfig {
  name: string
  limit: number
  noResults: string
  item: CollectionItemConfig
  sorters: any
  filters: any
}

export interface CollectionItemConfig extends ItemConfig {
  dates: DateConfig[]
}

export interface ItemConfig {
  id_criteria: string
  title_criteria: string
  subtitle_criteria: string
  dates?: DateConfig[]
  images?: ImageConfig[]
  informations?: InformationConfig[]
}

export interface DateConfig {
  criteria: string
}

export interface ImageConfig {
  criteria: string
  title?: string
  description_criteria?: string
}

export interface InformationConfig {
  type: typeof INFORMATION_TYPES[number]
  title?: string
  criteria?: string[]
  emptyDisplay?: boolean
  suffix?: string
}

// It is always important to ensure you import/export something when augmenting a type
export {}
