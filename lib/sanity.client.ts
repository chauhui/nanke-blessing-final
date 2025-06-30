// lib/sanity.client.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// **注意**：因為這份程式會在瀏覽器端執行，env 變數必須使用 NEXT_PUBLIC_ 前綴
export const client = createClient({
  projectId:   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,  // 從 NEXT_PUBLIC_ 前綴的 env 讀取
  dataset:     process.env.NEXT_PUBLIC_SANITY_DATASET   as string,  // 從 NEXT_PUBLIC_ 前綴的 env 讀取
  apiVersion: '2023-05-03',    // 建議全專案統一版本
  useCdn: true,                // 公開內容用 CDN
  // 請勿加 token
})

// 初始化圖片 URL 構建器
const builder = imageUrlBuilder(client)

type ImageSource = {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
}

// 返回可用於 <img src="…"> 的 URL
export function urlFor(source: ImageSource) {
  return builder.image(source)
}

// 取得優化過的圖片 URL
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

// 前端僅能查公開內容（不可查會員等私有資料）
export async function fetchQuery<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}
