///// lib/sanity.client.ts
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

// ---- 互相容匯出 ----
export const sanityClient = baseClient
export const client = baseClient
export const sanity = baseClient
export default baseClient

const builder = imageUrlBuilder(baseClient)
export const urlFor = (source: any) => builder.image(source)

// ---- 型別正確的 fetch 包裝（避免 overload 衝突）----
export function fetchQuery<T>(query: string): Promise<T>
export function fetchQuery<T>(query: string, params: QueryParams): Promise<T>
export function fetchQuery<T>(query: string, params?: QueryParams): Promise<T> {
  return params
    ? baseClient.fetch<T>(query, params)
    : baseClient.fetch<T>(query)
}
