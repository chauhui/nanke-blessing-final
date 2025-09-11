// lib/sanity.client.ts
import {createClient, type ClientConfig} from '@sanity/client'
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

export const fetchQuery = async <T>(
  query: string,
  params?: Record<string, any>
): Promise<T> => baseClient.fetch<T>(query, params)
