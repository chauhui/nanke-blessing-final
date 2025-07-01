// lib/sanity.client.ts
import { createClient, SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 先從環境變數讀取 projectId & dataset，優先使用前端可見的 NEXT_PUBLIC_ 前綴，
// 若不存在再去讀純後端的 SANITY_ 變數
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET       || process.env.SANITY_DATASET

if (!projectId) {
  throw new Error('Missing Sanity projectId. Please set SANITY_PROJECT_ID (and/or NEXT_PUBLIC_SANITY_PROJECT_ID) in your env.')
}
if (!dataset) {
  throw new Error('Missing Sanity dataset. Please set SANITY_DATASET (and/or NEXT_PUBLIC_SANITY_DATASET) in your env.')
}

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03', // 全專案統一版本
  useCdn: true,             // 公開內容用 CDN
  // 前端請勿放 token
})

// 初始化圖片 URL 構建器
const builder = imageUrlBuilder(client)

type ImageSource = {
  _type: string
  asset: { _ref: string; _type: string }
}

/** 返回可用於 <img src="..."> 的 URL */
export function urlFor(source: ImageSource) {
  return builder.image(source)
}

/** 取得優化過的圖片 URL */
export function getOptimizedImage(
  source: ImageSource,
  width: number = 1200,
  height: number = 675,
  quality: number = 75
): string {
  return (
    builder
      .image(source)
      .width(width)
      .height(height)
      .quality(quality)
      .fit('crop')
      .auto('format')
      .url() || ''
  )
}

/** 前端僅能查公開內容（不可查會員等私有資料） */
export async function fetchQuery<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Error executing Sanity query:', error)
    throw error
  }
}
