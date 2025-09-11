// lib/sanity.ts
import {createClient, type ClientConfig} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? ''
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

if (!projectId || !dataset) {
  // 直接用空字串初始化，避免 throw 讓整站掛；錯誤交由 fetch 時記錄
  console.warn('[sanity] projectId/dataset missing. Check env.')
}

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,              // 公開內容用 CDN
  perspective: 'published',  // 明確取 published
}

const baseClient = createClient(config)

// ---- 互相容匯出（避免既有程式壞掉） ----
export const sanityClient = baseClient
export const client = baseClient
export const sanity = baseClient
export default baseClient

// 圖片
const builder = imageUrlBuilder(baseClient)
export const urlFor = (source: any) => builder.image(source)

// 包一層 fetch，方便共用
export const fetchQuery = async <T>(
  query: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    return await baseClient.fetch<T>(query, params)
  } catch (err) {
    console.error('[sanity] fetch error:', err)
    throw err
  }
}
