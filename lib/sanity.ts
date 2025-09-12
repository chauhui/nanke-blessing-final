///// lib/sanity.ts
import { createClient, type ClientConfig, type QueryParams } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? ''
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
}

const baseClient = createClient(config)

// ---- 互相容匯出（維持原用法）----
export const sanityClient = baseClient
export const client = baseClient
export const sanity = baseClient
export default baseClient

const builder = imageUrlBuilder(baseClient)
export const urlFor = (source: any) => builder.image(source)

// ---- 正確型別的 fetch 包裝，避免 overload 編譯錯誤 ----
export function fetchQuery<T>(query: string): Promise<T>
export function fetchQuery<T>(query: string, params: QueryParams): Promise<T>
export async function fetchQuery<T>(query: string, params?: QueryParams): Promise<T> {
  try {
    return params
      ? await baseClient.fetch<T>(query, params)
      : await baseClient.fetch<T>(query)
  } catch (err) {
    console.error('[sanity] fetch error:', err)
    throw err
  }
}
